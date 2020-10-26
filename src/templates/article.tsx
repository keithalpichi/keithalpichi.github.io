import * as React from 'react'
import { graphql } from 'gatsby'
import { format } from 'date-fns'
// import { colors } from '../styles'
import { TagBadge } from '../components/badges'
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

const TagButtons: React.FunctionComponent<{ tags: string[] }> = ({ tags }) => (
  <div className='tags'>
    {tags.map(t => (
      t.length ? 
        <TagBadge key={t} onClick={() => navigate(`/tags/${t}`)}>{t}</TagBadge> :
        <TagBadge key={t} onClick={() => navigate(`/tags`)}>{`all tags`}</TagBadge>
    ))}
  </div>
)

const Article: React.FunctionComponent<ArticleProps> = ({
  data: { markdownRemark: post }
}) => (
    <div id="main">
      <Helmet title={`Blog | ${post.frontmatter.title}`} />
      <h1 className='mb-0'>{post.frontmatter.title}</h1>
      <p>{format(new Date(post.frontmatter.date), 'EEEE, MMMM do, yyyy')}</p>
      <TagButtons tags={post.frontmatter.tags} />
      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <p>Thank you for reading my article. Make sure to check out some related articles by following one of the tags below.</p>
      <TagButtons tags={['', ...post.frontmatter.tags]} />
    </div>
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
