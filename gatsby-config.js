require('ts-node').register()

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
    'gatsby-plugin-linaria',
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data/articles`,
        name: 'blog',
      }
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: 'https://keithalpichi.us3.list-manage.com/subscribe/post?u=86a92de350dc376ce41d81a70&amp;id=a69f50ee6c',
      },
    },
  ]
}