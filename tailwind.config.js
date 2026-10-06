/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,html}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#FAFAFA',
          dark: '#0D0D11',
        },
        primary: {
          light: '#18181B',
          dark: '#F8FAFC',
        },
        secondary: {
          light: '#52525B',
          dark: '#A1A1AA',
        },
        customBorder: {
          light: '#E4E4E7',
          dark: '#27272A',
        },
        accent: {
          light: '#E11D48',
          dark: '#FB7185',
        },
        crimson: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
          950: '#4C0519',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.1em',
      },
      boxShadow: {
        'reflection-light': '0 20px 40px -15px rgba(225, 29, 72, 0.18), 0 0 15px rgba(0, 0, 0, 0.05)',
        'reflection-dark': '0 25px 50px -12px rgba(244, 63, 94, 0.25), 0 0 20px rgba(244, 63, 94, 0.1)',
      }
    },
  },
  plugins: [],
}
