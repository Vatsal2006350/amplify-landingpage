import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const GOOGLE_FORM_ID = '1FAIpQLSdkHxWLWgJrjQhE49gx8xJIndFHxOyWyaXlb0QbRfLxF-Bgew'
const EMAIL_ENTRY_ID = 'entry.783000384'

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

    const formData = new URLSearchParams()
    formData.append(EMAIL_ENTRY_ID, trimmed)

    await fetch(`https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    })

    return NextResponse.json({ message: "You're on the waitlist!" })
  } catch (e) {
    console.error('Waitlist error:', e)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
