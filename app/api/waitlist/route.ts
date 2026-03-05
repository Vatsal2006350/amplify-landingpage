import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 })
    }

    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const trimmed = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const endpoint = `${supabaseUrl}/rest/v1/waitlist`

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ email: trimmed }),
    })

    if (res.ok) {
      return NextResponse.json({ message: "You're on the waitlist!" })
    }

    const body = await res.text()
    let parsed: { message?: string; code?: string } | null = null
    try { parsed = JSON.parse(body) } catch {}

    if (res.status === 409 || parsed?.code === '23505') {
      return NextResponse.json({ message: "You're already on the list!" })
    }

    return NextResponse.json(
      { error: `Supabase ${res.status}: ${body.slice(0, 200)}` },
      { status: 500 },
    )
  } catch (e: unknown) {
    const err = e as Error & { cause?: Error }
    const detail = err.cause?.message || err.message || 'Unknown'
    return NextResponse.json({ error: `Fetch error: ${detail}` }, { status: 500 })
  }
}
