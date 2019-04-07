import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title }
    }
  }
}: {
  data: {
    allMarkdownRemark: {
      group: Array<{
        fieldValue: string
        totalCount: number
      }>
    }
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}) => (
    <div>
      <Helmet title={title} />
      <div>
        <h1>Tags</h1>
        <ul>
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${tag.fieldValue.split(' ').join('-')}/`}>
                {tag.fieldValue} ({tag.totalCount})
          </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
