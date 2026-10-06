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
          dark: '#140509',
        },
        primary: {
          light: '#18181B',
          dark: '#FFF1F2',
        },
        secondary: {
          light: '#71717A',
          dark: '#FDA4AF',
        },
        customBorder: {
          light: '#FECDD3',
          dark: '#5C1024',
        },
        accent: {
          light: '#DC2626',
          dark: '#F43F5E',
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
        'reflection-light': '0 25px 50px -12px rgba(220, 38, 38, 0.35), 0 0 25px rgba(225, 29, 72, 0.2)',
        'reflection-dark': '0 30px 60px -12px rgba(244, 63, 94, 0.45), 0 0 35px rgba(244, 63, 94, 0.25)',
      }
    },
  },
  plugins: [],
}
