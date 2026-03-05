import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const trimmed = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ email: trimmed }),
      cache: 'no-store',
    })

    if (res.ok) {
      return NextResponse.json({ message: "You're on the waitlist!" })
    }

    if (res.status === 409) {
      return NextResponse.json({ message: "You're already on the list!" })
    }

    const body = await res.json().catch(() => null)
    const msg = body?.message || ''
    if (msg.includes('duplicate') || msg.includes('unique') || (body?.code === '23505')) {
      return NextResponse.json({ message: "You're already on the list!" })
    }

    console.error('Supabase error:', res.status, body)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  } catch (e) {
    console.error('Waitlist error:', e)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
