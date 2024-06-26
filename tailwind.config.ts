import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const defaultTheme = require('tailwindcss/defaultTheme')

const colors = require('tailwindcss/colors')

const svgToDataUri = require('mini-svg-data-uri')

const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      animation: {
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        slideIn: 'slideIn 1.2s forwards',
        slideOut: 'slideOut 1.2s forwards',
      },
      keyframes: {
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(-20%)' },
          '100%': {
            transform: 'translateX(0)',
          },
        },
      },
      screens: {
        'below-sm': { max: '480px' },
        'to-sm': { min: '481px' },
      },
    },
  },
  // darkMode: 'class',
  plugins: [
    addVariablesForColors,
    nextui(),
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          'bg-dot-thick': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      )
    },
  ],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ':root': newVars,
  })
}

export default config
