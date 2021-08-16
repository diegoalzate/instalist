const colors = require('tailwindcss/colors')
module.exports = {
   purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
      colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
    }
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'), // import tailwind forms
   ],
  }