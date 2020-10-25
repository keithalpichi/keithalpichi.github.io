const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const articleTemplate = path.resolve("./src/templates/article.tsx");
  const tagTemplate = path.resolve("./src/templates/tags.tsx");
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges { 
          node {
            frontmatter {
              tags
              path
            }
          }
        }
      }
    }
  `
  ).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    /** Create Posts pages */
    posts.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: articleTemplate,
      })
    })

    /** Create Tags pages */
    const tags = posts
      .reduce((obj, edge) => {
        const { tags } = edge.node.frontmatter
        const newObj = Object.assign({}, obj)
        tags.forEach(t => newObj[t] = 1)
        return newObj
      }, {})

    for (const tag in tags) {
      if (!tags.hasOwnProperty(tag)) {
        continue
      }
      const kebabCase = tag.split(" ").join("-")
      createPage({
        path: `/tags/${kebabCase}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      })

    }
  })
}