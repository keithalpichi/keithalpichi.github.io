import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import { FlexContainer } from '../components'

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
      <Helmet title='Keith Alpichi | Tags' />
      <FlexContainer direction='column'>
        <h1 style={{ textAlign: 'center' }}>Tags</h1>
        <ul>
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${tag.fieldValue.split(' ').join('-')}/`}>
                {tag.fieldValue} ({tag.totalCount})
          </Link>
            </li>
          ))}
        </ul>
      </FlexContainer>
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
