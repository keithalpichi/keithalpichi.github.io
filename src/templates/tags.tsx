import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Main from '../layouts'

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
  
  const posts = edges.map(({ node }) => node.frontmatter)

  return (
    <Main>
      <h1 style={{ textAlign: 'center' }}>{tagHeader}</h1>
      <ul>
        {posts.map(({ title, path }) => {
          return (
            <li key={path}>
              <Link to={path}>{title}</Link>
            </li>
          )
        })}
      </ul>
      <p>Click <Link to='/tags'>here</Link> to view all tags instead.</p>
    </Main>
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
