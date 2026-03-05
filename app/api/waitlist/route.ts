import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }

    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const trimmed = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
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
    let parsed: { code?: string } | null = null
    try { parsed = JSON.parse(body) } catch {}

    if (res.status === 409 || parsed?.code === '23505') {
      return NextResponse.json({ message: "You're already on the list!" })
    }

    console.error('Supabase error:', res.status, body)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  } catch (e) {
    console.error('Waitlist error:', e)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
