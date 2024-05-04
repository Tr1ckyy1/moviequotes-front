/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        screen: '100dvh'
      },
      colors: {
        'red-main': '#E31221',
        'blue-main': '#0D6EFD',
        'modal-bg': '#222030',
        'red-toast': '#F04349'
      },
      keyframes: {
        progress: {
          '100%': { right: '100%' }
        }
      }
    }
  },
  plugins: [require('tailwind-scrollbar')]
}
