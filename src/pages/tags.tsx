import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Main from '../layouts'

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
    <Main>
      <Helmet title='Keith Alpichi | Tags' />
      <div className='flex flex-col'>
        <h1 className='text-center'>Tags</h1>
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
    </Main>
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
