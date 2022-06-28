const colors = require('tailwindcss/colors')
module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
      extend: {},
      colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ...colors
    },
      fontFamily: {
        'WorkSans': ['WorkSans'],
        'Bitter': ['Bitter']
      }
    },
    plugins: [
      require('@tailwindcss/forms'), // import tailwind forms
   ],
  }