const colors = require('tailwindcss/colors')
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];
module.exports = {
   content: ['./pages/**/*.{js,jsx,ts,tsx}', './public/index.html', "./components/**/*.{js,ts,jsx,tsx}", "./containers/**/*.{js,ts,jsx,tsx}"],
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