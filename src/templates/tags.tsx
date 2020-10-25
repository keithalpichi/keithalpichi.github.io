import * as React from 'react'
import { Link, graphql } from 'gatsby'
// import { FlexContainer } from '../components'

const Tags = ({ pageContext, data }: {
  pageContext: { tag: string }
  data: {
    allMarkdownRemark: {
      totalCount: number
      edges: Array<{
        node: {
          frontmatter: {
            path: string
            title: string
          }
        }
      }>
    }
  }
}) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
    } tagged with "${tag}"`

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { title, path } = node.frontmatter
          return (
            <li key={path}>
              <Link to={path}>{title}</Link>
            </li>
          )
        })}
      </ul>
      <Link to='/tags'>All tags</Link>
    </>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`
