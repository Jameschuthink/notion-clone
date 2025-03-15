/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'notion-black': '#191919',
        'notion-gray': '#787774',
        'notion-brown': '#937264',
        'notion-orange': '#FFA344',
        'notion-yellow': '#FFD93D',
        'notion-green': '#4DAB9A',
        'notion-blue': '#529CCA',
        'notion-purple': '#9A6DD7',
        'notion-pink': '#E255A1',
        'notion-red': '#FF7369'
      }
    },
  },
  plugins: [],
}