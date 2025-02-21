import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-plus-jakarta)'],
      },
      colors: {
        // Deep, rich purples
        mystic: {
          950: '#1a0f2e',
          900: '#2d1757',
          800: '#3d1f75',
          700: '#4c2889',
          600: '#5c31a3',
          500: '#6d3bbd',
          400: '#8f63d2',
          300: '#b08ce0',
          200: '#d2bfed',
          100: '#eee7f7',
        },
        // Warm gold accents
        gold: {
          950: '#2e2104',
          900: '#574009',
          800: '#7d5c0c',
          700: '#a37a10',
          600: '#c99813',
          500: '#f0b616',
          400: '#f4c644',
          300: '#f7d573',
          200: '#fae4a1',
          100: '#fcf2d0',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config;