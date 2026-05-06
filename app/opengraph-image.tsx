import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const runtime = 'nodejs'
export const alt = 'Amplify | AI Product Manager for E-Commerce'
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
          alignItems: 'center',
          justifyContent: 'center',
          background: '#080808',
          gap: 32,
        }}
      >
        <img
          src={logoBase64}
          width={180}
          height={180}
          style={{ borderRadius: 24 }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: '#C5F135',
              letterSpacing: '-0.02em',
            }}
          >
            Amplify
          </div>
          <div
            style={{
              fontSize: 26,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.02em',
            }}
          >
            AI Product Manager for E-Commerce
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
