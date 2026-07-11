import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#F4F1EA', raised: '#FBF9F4', shade: '#ECE8DE' },
        ink: {
          DEFAULT: '#141311',
          muted: 'rgba(20,19,17,0.64)',
          faint: 'rgba(20,19,17,0.40)',
        },
        ledger: { DEFAULT: '#D8D3C8', strong: '#B8B2A4' },
        safety: '#1D7A6D',
        stamp: '#C8321E',
        dk: {
          DEFAULT: '#141311',
          raised: '#1C1A17',
          text: '#F4F1EA',
          muted: 'rgba(244,241,234,0.60)',
          rule: 'rgba(244,241,234,0.16)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: { label: '0.08em' },
      borderRadius: { doc: '2px' },
    },
  },
  plugins: [],
}
export default config
