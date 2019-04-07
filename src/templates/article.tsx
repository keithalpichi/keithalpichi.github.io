import * as React from 'react'
import { graphql } from 'gatsby'
import { format } from 'date-fns'
import { colors } from '../styles'

interface ArticleProps {
  data: {
    markdownRemark: {
      html: string,
      frontmatter: {
        title: string
        date: string
      }
    }
  }
}

const Article: React.SFC<ArticleProps> = ({
  data: { markdownRemark: post }
}) => (
    <React.Fragment>
      <h1 style={{ lineHeight: 1 }}>{post.frontmatter.title}</h1>
      <h3 style={{ color: colors.lightGreen, marginTop: 0 }}>{format(post.frontmatter.date, 'dddd, MMMM Do YYYY')}</h3>
      <div
        style={{
          marginTop: 64
        }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </React.Fragment>
  )

export default Article

export const pageQuery = graphql`
  query ArticleByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`
