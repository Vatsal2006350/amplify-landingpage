import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const runtime = 'nodejs'
export const alt = 'Amplify | AI Workspace for Brand Operators'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'public', 'logo.png'))
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#F4F1EA',
          color: '#141311',
          padding: 56,
        }}
      >
        {/* masthead rules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ height: 3, background: '#141311' }} />
          <div style={{ height: 1, background: '#B8B2A4' }} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 14,
            fontSize: 18,
            letterSpacing: '0.1em',
            color: 'rgba(20,19,17,0.55)',
          }}
        >
          <span>00 / MANIFEST OF GOODS</span>
          <span>MANIFEST NO. AMP-2026-184</span>
        </div>

        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            gap: 48,
            marginTop: 8,
          }}
        >
          <img src={logoBase64} width={148} height={148} style={{ borderRadius: 4 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                fontSize: 96,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#141311',
              }}
            >
              Amplify
            </div>
            <div style={{ fontSize: 30, color: 'rgba(20,19,17,0.64)' }}>
              AI Workspace for Brand Operators
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #B8B2A4',
            paddingTop: 18,
            fontSize: 18,
            letterSpacing: '0.1em',
          }}
        >
          <span style={{ color: 'rgba(20,19,17,0.55)' }}>
            CONTENTS: LISTINGS · DECISIONS · ACTIONS
          </span>
          <span
            style={{
              color: '#C8321E',
              border: '3px solid #C8321E',
              padding: '6px 16px',
              fontWeight: 700,
              transform: 'rotate(-4deg)',
            }}
          >
            APPROVED — HUMAN
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
