/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        screen: '100dvh'
      },
      colors: {
        main: '#DDCCAA',
        'red-main': '#E31221',
        'blue-main': '#0D6EFD',
        'modal-bg': '#222030',
        'red-toast': '#F04349',
        'dark-main': '#11101A',
        'dark-secondary': '#191725',
        'dark-third': '#24222F',
        'grey-main': '#6C757D',
        'grey-secondary': '#CED4DA',
        'grey-rare': '#EFEFEF4D',
        'profile-green': '#198754'
      },
      borderRadius: {
        llg: '10px'
      },
      fontSize: {
        xxs: ['8px', { lineHeight: '12px' }]
      }
    }
  },
  plugins: []
}
