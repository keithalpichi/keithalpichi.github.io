require('ts-node').register()
const colors = require("./src/styles/colors")

module.exports = {
  siteMetadata: {
    title: 'Keith Alpichi',
    social: {
      github: "https://github.com/keithalpichi/",
      linkedin: "https://www.linkedin.com/in/keithalpichi/",
      stackoverflow: "https://stackoverflow.com/users/5796559/keitha",
      medium: "https://medium.com/@KeithAlpichi",
      twitter: "https://twitter.com/keithalpichi/",
    }
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-layout',
    {
      resolve: `gatsby-plugin-less`,
      options: {
        javascriptEnabled: true,
        modifyVars: {
          // TYPOGRAPHY
          'font-family': "Lato",
          'font-size-base': "16px",

          // COLORS
          // 'info-color': "#898DA0",
          'primary-color': colors.default.black,
          'success-color': colors.default.green,
          'error-color': colors.default.salmon,

          // TEXT COLORS
          'heading-color': colors.default.black,
          'text-color': colors.default.black,
          'link-color': colors.default.green,
          // 'text-color-secondary': "#0A0908",

          // BG COlORS
          'body-background': colors.default.white,
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data/articles`,
        name: 'blog',
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      // options: {
      //   plugins: [
      //     {
      //       resolve: `gatsby-remark-prismjs`,
      //       options: {
      //         classPrefix: "language-",
      //       },
      //     },
      //   ],
      // },
    },
  ]
}