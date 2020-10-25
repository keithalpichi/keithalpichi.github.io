const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["./src/**/*.html", "./src/**/*.tsx"],
  },
  theme: {
    extend: {
      colors: {
        cream: '#FDF7EC',
        nude: '#FAEFDC',
        navy: '#2F4A72',
        teal: '#88C4C8',
        mustard: '#F7C257',
        dijon: '#E5BD64',
        burnt: '#DC885D',
        wasabi: '#9CA97D'
      },
      fontFamily: {
        bebas: ['Bebas Neue', 'Roboto', ...defaultTheme.fontFamily.sans],
        sans: [
          'Roboto',
          ...defaultTheme.fontFamily.sans,
        ]
      }
    },
  },
  variants: {},
  plugins: [],
}
