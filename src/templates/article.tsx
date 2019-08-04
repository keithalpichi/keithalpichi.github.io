import * as React from 'react'
import { graphql } from 'gatsby'
import { format } from 'date-fns'
import { colors } from '../styles'
import { TagButton, FlexContainer } from '../components'
import { navigate } from '@reach/router'
import { Helmet } from 'react-helmet'

interface ArticleProps {
  data: {
    markdownRemark: {
      html: string,
      frontmatter: {
        title: string
        date: string
        tags: string[]
      }
    }
  }
}

const TagButtons: React.SFC<{ tags: string[] }> = ({ tags }) => (
  <React.Fragment>
    {tags.map(t => <TagButton key={t} onClick={() => navigate(`/tags/${t}`)} active>{t}</TagButton>)}
  </React.Fragment>
)

const Article: React.SFC<ArticleProps> = ({
  data: { markdownRemark: post }
}) => (
    <React.Fragment>
      <Helmet title={`Blog | ${post.frontmatter.title}`} />
      <h1 style={{ lineHeight: 1 }}>{post.frontmatter.title}</h1>
      <h3 style={{ color: colors.lightGreen, marginTop: 0 }}>{format(post.frontmatter.date, 'dddd, MMMM Do YYYY')}</h3>
      <FlexContainer direction='row'>
        <TagButtons tags={post.frontmatter.tags} />
      </FlexContainer>
      <div
        style={{
          marginTop: 64
        }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <p>Thank you for reading my article. Make sure to check out some related articles by following one of the tags below.</p>
      <FlexContainer direction='row'>
        <TagButton onClick={() => navigate(`/tags`)} active>{`all tags`}</TagButton>
        <TagButtons tags={post.frontmatter.tags} />
      </FlexContainer>
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
        tags
      }
    }
  }
`
