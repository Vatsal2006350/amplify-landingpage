import { NextResponse } from 'next/server'
import { normalizeStoreUrl, fetchAllProducts } from '@/lib/audit/store-fetcher'
import { fetchSingleProduct, detectPlatform, isStoreUrl, isAmazonSearchUrl, fetchAmazonSearchProducts, buildAmazonSearchUrl } from '@/lib/audit/product-fetcher'
import { analyzeListingQuality } from '@/lib/audit/analyzer'
import { isAiAvailable, analyzeProductsWithAi } from '@/lib/audit/ai-analyzer'
import type { Product, AuditIssue } from '@/lib/audit/types'

export const maxDuration = 120

interface ProductAudit {
  title: string
  url: string
  image: string | null
  price: string | null
  vendor: string | null
  qualityScore: number
  issues: AuditIssue[]
  issueCount: { errors: number; warnings: number; info: number }
  aiSummary?: string
}

interface StoreAuditResult {
  storeUrl: string
  storeName: string | null
  productCount: number
  averageScore: number
  scoreDistribution: { good: number; needsWork: number; poor: number }
  topIssues: Array<{ category: string; count: number; percentage: number }>
  products: ProductAudit[]
  mode: 'store' | 'product' | 'brand'
  platform: string
  aiPowered: boolean
}

function auditProduct(product: Product): ProductAudit {
  const { qualityScore, issues } = analyzeListingQuality(product)
  return {
    title: product.title,
    url: product.url || '',
    image: product.images[0] || null,
    price: product.price || null,
    vendor: product.vendor || null,
    qualityScore,
    issues,
    issueCount: {
      errors: issues.filter((i) => i.type === 'error').length,
      warnings: issues.filter((i) => i.type === 'warning').length,
      info: issues.filter((i) => i.type === 'info').length,
    },
  }
}

function buildResult(audits: ProductAudit[], storeUrl: string, storeName: string | null, mode: 'store' | 'product' | 'brand', platform: string, aiPowered = false): StoreAuditResult {
  audits.sort((a, b) => a.qualityScore - b.qualityScore)

  const totalScore = audits.reduce((sum, a) => sum + a.qualityScore, 0)
  const averageScore = audits.length > 0 ? Math.round(totalScore / audits.length) : 0
  const good = audits.filter((a) => a.qualityScore >= 70).length
  const needsWork = audits.filter((a) => a.qualityScore >= 40 && a.qualityScore < 70).length
  const poor = audits.filter((a) => a.qualityScore < 40).length

  const issueCounts: Record<string, number> = {}
  for (const audit of audits) {
    for (const issue of audit.issues) {
      issueCounts[issue.category] = (issueCounts[issue.category] || 0) + 1
    }
  }

  const topIssues = Object.entries(issueCounts)
    .map(([category, count]) => ({
      category,
      count,
      percentage: audits.length > 0 ? Math.round((count / audits.length) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)

  return {
    storeUrl,
    storeName,
    productCount: audits.length,
    averageScore,
    scoreDistribution: { good, needsWork, poor },
    topIssues,
    products: audits,
    mode,
    platform,
    aiPowered,
  }
}

/** Enrich Amazon search-result products by fetching their actual product pages.
 *  Fetches up to `count` pages in parallel to get real descriptions/images. */
async function enrichAmazonProducts(products: Product[], count = 15): Promise<Product[]> {
  const toEnrich = products.slice(0, count)
  const rest = products.slice(count)

  const enriched = await Promise.all(
    toEnrich.map(async (p) => {
      if (!p.url) return p
      try {
        const full = await fetchSingleProduct(p.url)
        if (full.title) return { ...full, source: 'page' as const }
      } catch { /* fall through */ }
      return p
    })
  )

  return [...enriched, ...rest]
}

/** Run AI analysis on enriched products and merge results into audits. */
async function enhanceWithAi(products: Product[], audits: ProductAudit[]): Promise<{ audits: ProductAudit[]; aiPowered: boolean }> {
  if (!isAiAvailable()) return { audits, aiPowered: false }

  try {
    // Only AI-analyze products that have real page data (not search stubs)
    const enrichedIndices: number[] = []
    const enrichedProducts: Product[] = []
    products.forEach((p, i) => {
      if (p.source !== 'search' && p.description && p.description.length > 20) {
        enrichedIndices.push(i)
        enrichedProducts.push(p)
      }
    })

    if (enrichedProducts.length === 0) return { audits, aiPowered: false }

    const aiResults = await analyzeProductsWithAi(enrichedProducts, { maxAiProducts: 20 })

    const enhanced = audits.map((audit, i) => {
      // Find if this product was AI-analyzed
      const enrichedIdx = enrichedIndices.indexOf(i)
      if (enrichedIdx === -1) return audit
      const aiResult = aiResults.get(enrichedIdx)
      if (!aiResult) return audit

      // Merge: use AI score (weighted blend), combine issues, add summary
      const blendedScore = Math.round(audit.qualityScore * 0.3 + aiResult.qualityScore * 0.7)
      const allIssues = [...aiResult.issues, ...audit.issues.filter(ri =>
        !aiResult.issues.some(ai => ai.category === ri.category && ai.message.length > ri.message.length)
      )]

      return {
        ...audit,
        qualityScore: blendedScore,
        issues: allIssues,
        issueCount: {
          errors: allIssues.filter(i => i.type === 'error').length,
          warnings: allIssues.filter(i => i.type === 'warning').length,
          info: allIssues.filter(i => i.type === 'info').length,
        },
        aiSummary: aiResult.summary,
      }
    })

    return { audits: enhanced, aiPowered: true }
  } catch {
    // AI failed — fall back gracefully to rule-based
    return { audits, aiPowered: false }
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { url, brand, marketplace } = body

    // Brand search mode: brand name + marketplace
    if (brand && marketplace) {
      const searchUrl = buildAmazonSearchUrl(brand, marketplace)
      let products: Product[]
      try {
        products = await fetchAmazonSearchProducts(searchUrl, { maxProducts: 200 })
      } catch (fetchError: unknown) {
        const msg = fetchError instanceof Error ? fetchError.message : String(fetchError)
        return NextResponse.json(
          { error: `Could not search for "${brand}" on ${marketplace}: ${msg}` },
          { status: 422 },
        )
      }

      if (products.length === 0) {
        return NextResponse.json(
          { error: `No products found for "${brand}" on ${marketplace}. Try a different brand name or marketplace.` },
          { status: 422 },
        )
      }

      products = await enrichAmazonProducts(products)
      const baseAudits = products.map(auditProduct)
      const { audits, aiPowered } = await enhanceWithAi(products, baseAudits)
      return NextResponse.json(buildResult(audits, searchUrl, brand, 'brand', 'amazon', aiPowered))
    }

    // URL-based modes
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    let fullUrl = url.trim()
    if (!fullUrl.startsWith('http')) fullUrl = 'https://' + fullUrl

    // Amazon search URL (e.g. amazon.ae/s?k=brand)
    if (isAmazonSearchUrl(fullUrl)) {
      let products: Product[]
      try {
        products = await fetchAmazonSearchProducts(fullUrl, { maxProducts: 200 })
      } catch (fetchError: unknown) {
        const msg = fetchError instanceof Error ? fetchError.message : String(fetchError)
        return NextResponse.json(
          { error: `Could not fetch Amazon search results: ${msg}` },
          { status: 422 },
        )
      }

      if (products.length === 0) {
        return NextResponse.json(
          { error: 'No products found in these search results.' },
          { status: 422 },
        )
      }

      products = await enrichAmazonProducts(products)
      const baseAudits = products.map(auditProduct)
      const brandName = products[0]?.vendor || null
      const { audits, aiPowered } = await enhanceWithAi(products, baseAudits)
      return NextResponse.json(buildResult(audits, fullUrl, brandName, 'brand', 'amazon', aiPowered))
    }

    // Shopify store-wide scan
    const storeLevel = isStoreUrl(fullUrl)
    const storeOrigin = normalizeStoreUrl(fullUrl)

    if (storeLevel) {
      let products: Product[]
      try {
        products = await fetchAllProducts(storeOrigin, { maxProducts: 100 })
      } catch (fetchError: unknown) {
        const msg = fetchError instanceof Error ? fetchError.message : String(fetchError)
        return NextResponse.json(
          { error: `Could not fetch products: ${msg}. Make sure this is a Shopify store URL.` },
          { status: 422 },
        )
      }

      if (products.length === 0) {
        return NextResponse.json(
          { error: 'No products found. This might not be a Shopify store, or the product catalog is not publicly accessible. Try pasting a direct product URL instead.' },
          { status: 422 },
        )
      }

      const baseAudits = products.map(auditProduct)
      const storeName = products[0]?.vendor || null
      const { audits, aiPowered } = await enhanceWithAi(products, baseAudits)
      return NextResponse.json(buildResult(audits, storeOrigin, storeName, 'store', 'shopify', aiPowered))
    }

    // Single product URL
    const platform = detectPlatform(fullUrl)
    let product: Product
    try {
      product = await fetchSingleProduct(fullUrl)
    } catch (fetchError: unknown) {
      const msg = fetchError instanceof Error ? fetchError.message : String(fetchError)
      return NextResponse.json(
        { error: `Could not fetch product: ${msg}` },
        { status: 422 },
      )
    }

    if (!product.title) {
      return NextResponse.json(
        { error: 'Could not extract product data from this URL. The page may be JavaScript-rendered or blocking scrapers.' },
        { status: 422 },
      )
    }

    // Amazon product URL with a detected brand → auto-expand to full brand search
    if (platform === 'amazon' && product.vendor) {
      try {
        const amazonOrigin = new URL(fullUrl).origin
        const searchUrl = `${amazonOrigin}/s?k=${encodeURIComponent(product.vendor)}&ref=nb_sb_noss`
        const brandProducts = await fetchAmazonSearchProducts(searchUrl, { maxProducts: 200 })

        if (brandProducts.length > 1) {
          const enriched = await enrichAmazonProducts(brandProducts)
          const baseAudits = enriched.map(auditProduct)
          const { audits, aiPowered } = await enhanceWithAi(enriched, baseAudits)
          return NextResponse.json(buildResult(audits, fullUrl, product.vendor, 'brand', 'amazon', aiPowered))
        }
      } catch {
        // Fall through to single product result if brand search fails
      }
    }

    const baseAudit = auditProduct(product)
    const { audits: finalAudits, aiPowered } = await enhanceWithAi([product], [baseAudit])
    return NextResponse.json(buildResult(finalAudits, fullUrl, product.vendor || null, 'product', platform, aiPowered))
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
