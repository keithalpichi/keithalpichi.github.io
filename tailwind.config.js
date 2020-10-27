const defaultTheme = require('tailwindcss/defaultTheme')
const colors = {
  cream: '#FDF7EC',
  nude: '#FAEFDC',
  midnightBlue: '#123346',
  navy: '#19445C',
  ocean: '#246183',
  teal: '#88C4C8',
  mustard: '#F7C257',
  dijon: '#E5BD64',
  burnt: '#DC885D',
  wasabi: '#9CA97D'
}
const colorMap = {
  primary: colors.teal,
  secondary: colors.navy,
  success: colors.wasabi,
  danger: colors.burnt,
  info: colors.mustard
}

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
        ...colors,
        ...colorMap
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
