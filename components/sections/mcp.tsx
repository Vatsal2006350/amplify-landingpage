'use client'

import { DocHeader } from '../doc/chrome'

const TOOLS: { name: string; detail: string }[] = [
  { name: 'search_catalog', detail: 'find any product across every channel' },
  { name: 'stock_positions', detail: 'live stock by SKU and warehouse' },
  { name: 'warehouse_stock', detail: 'own vs FBA, transfer gaps' },
  { name: 'marketplace_health', detail: 'open listing issues, per channel' },
  { name: 'stock_movements', detail: 'the audit trail behind a number' },
]

/**
 * The MCP section: Amplify as a server other AI agents plug into. Reads run
 * free, writes stay approval-gated — the same guardrails as the product,
 * exposed to Claude, ChatGPT, or a customer's own agent.
 */
export function McpServer() {
  return (
    <section id="mcp" className="scroll-mt-[80px]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24">
        <DocHeader index="06 / OPEN PROTOCOL" meta={['PAGE 7 OF 7', 'VIA: MCP']} />

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            className="type-h2 lg:col-span-7"
            style={{ fontSize: 'clamp(32px, 4vw, 50px)', color: 'var(--ink)' }}
          >
            Run your catalog from <em>any</em> AI agent.
          </h2>
          <p className="text-[15px] leading-[1.7] lg:col-span-5" style={{ color: 'var(--ink-muted)' }}>
            Amplify is an MCP server. Point Claude, ChatGPT, or your own agent at it and they operate
            your catalog and inventory through Amplify — reads are open, every write still waits for
            your approval.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
          {/* Terminal: connect + a real tool call */}
          <div
            className="overflow-hidden rounded-doc lg:col-span-7"
            style={{ border: '1px solid var(--ink)', boxShadow: '4px 4px 0 var(--ink)' }}
          >
            <div
              className="flex items-center gap-2 px-3.5 py-2"
              style={{ borderBottom: '1px solid var(--ledger-strong)', background: 'var(--paper-shade)' }}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--stamp)' }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--ledger-strong)' }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--ledger-strong)' }} />
              <span className="type-mono-label ml-2" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
                agent → app.use-amplify.com/api/mcp
              </span>
            </div>
            <pre
              className="overflow-x-auto px-4 py-4 font-mono leading-6"
              style={{ fontSize: 12.5, color: 'var(--ink)', background: 'var(--paper-raised)', margin: 0 }}
            >
              <span style={{ color: 'var(--ink-faint)' }}># connect once with your Amplify key{'\n'}</span>
              {'claude mcp add amplify \\\n'}
              {'  --url https://app.use-amplify.com/api/mcp \\\n'}
              {'  --header "Authorization: Bearer amp_mcp_…"\n\n'}
              <span style={{ color: 'var(--ink-faint)' }}># then just ask{'\n'}</span>
              <span style={{ color: 'var(--orange)', fontWeight: 700 }}>{'> '}</span>
              {'which SKUs are selling but out of stock at FBA?\n\n'}
              <span style={{ color: 'var(--ink-muted)' }}>{'  amplify.warehouse_stock → 31 transfer gaps\n'}</span>
              <span style={{ color: 'var(--ink-muted)' }}>{'  top: LEJ200 · 4,660 sold/30d · 0 at FBA\n'}</span>
            </pre>
          </div>

          {/* Tool list + guardrail note */}
          <div className="lg:col-span-5">
            <p className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
              TOOLS EXPOSED
            </p>
            <div className="mt-3 space-y-1.5">
              {TOOLS.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-baseline gap-3 rounded-doc px-3 py-2"
                  style={{ border: '1px solid var(--ledger)', background: 'var(--paper-raised)' }}
                >
                  <code className="font-mono" style={{ fontSize: 12, color: 'var(--orange)', fontWeight: 600 }}>
                    {tool.name}
                  </code>
                  <span className="text-[12.5px] leading-snug" style={{ color: 'var(--ink-muted)' }}>
                    {tool.detail}
                  </span>
                </div>
              ))}
            </div>
            <p
              className="mt-4 rounded-doc px-3 py-2.5 text-[12.5px] leading-[1.6]"
              style={{ border: '1px solid var(--ledger-strong)', background: 'var(--paper-shade)', color: 'var(--ink-muted)' }}
            >
              <span style={{ color: 'var(--ink)', fontWeight: 560 }}>Scoped and safe.</span> Each key is
              tied to one workspace, revocable in a click, and read-only by contract — an agent can
              read everything and change nothing without your approval.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
