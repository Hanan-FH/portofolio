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
          light: '#F7F7F5',
          dark: '#0A0A0C',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#121216',
        },
        primaryText: {
          light: '#111113',
          dark: '#EDEDED',
        },
        secondaryText: {
          light: '#66666E',
          dark: '#888892',
        },
        subtleBorder: {
          light: '#E5E5E7',
          dark: 'rgba(255, 255, 255, 0.06)',
        },
        accent: {
          DEFAULT: '#FF3366',
          light: '#FF3366',
          dark: '#FF3366',
          hover: '#E02456',
        },
        crimson: {
          50: '#FFF0F4',
          100: '#FFE1E9',
          200: '#FFC2D2',
          300: '#FFA3BB',
          400: '#FF668E',
          500: '#FF3366',
          600: '#E02456',
          700: '#BA1742',
          800: '#941033',
          900: '#6E0824',
          950: '#3D0212',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.12em',
      },
      boxShadow: {
        'accent-glow': '0 0 50px rgba(255, 51, 102, 0.15)',
        'accent-glow-strong': '0 0 60px rgba(255, 51, 102, 0.28)',
      }
    },
  },
  plugins: [],
}
