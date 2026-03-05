import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error(`Missing env: URL=${!!url}, KEY=${!!key}`)
  }
  return createClient(url, key)
}

export const dynamic = 'force-dynamic'

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

    const supabase = getSupabase()
    const { error } = await supabase
      .from('waitlist')
      .insert({ email: trimmed })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ message: "You're already on the list!" }, { status: 200 })
      }
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: `Insert failed: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json({ message: "You're on the waitlist!" }, { status: 200 })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
