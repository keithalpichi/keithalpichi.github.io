import * as React from 'react'
import { format } from 'date-fns'
import { Link } from 'gatsby'
import { colors } from '../../styles'
import { TagBadge } from '../badges'
import { navigate } from '@reach/router'

interface IndexProps {
  location: {
    search: string
  }
  posts: Array<{
    node: {
      frontmatter: {
        path: string
        title: string
        date: string
        excerpt: string
        tags: string[]
      }
    }
  }>
}

interface IndexState {
  search?: URLSearchParams
}


class Index extends React.Component<IndexProps, IndexState> {
  constructor (props: IndexProps) {
    super(props)
    this.state = {
      search: undefined
    }
  }

  componentDidMount () {
    const { location: { search } } = this.props
    if (search && !this.state.search) {
      this.setState({ search: new URLSearchParams(search) })
    }
  }

  render () {
    const { posts } = this.props
    const { search } = this.state
    const onTagClick = (t: string) => {
      const currentFilters = search ? search.get('filter') : undefined
      const tags = new Set(currentFilters ? currentFilters.split(',') : [])
      if (tags.has(t)) {
        tags.delete(t)
      } else {
        tags.add(t)
      }
      const newFilters = new URLSearchParams()
      const tagsArray: string[] = []
      tags.forEach(t => tagsArray.push(t))
      let newRoute = '/'
      if (tagsArray.length > 0) {
        newFilters.set('filter', tagsArray.join(','))
        newRoute = `/?${newFilters.toString()}`
      }
      this.setState({ search: newFilters })
      return navigate(newRoute)
    }
    const filter = search ? search.get('filter') : undefined
    const filterTags = filter ? new Set(filter.split(',')) : new Set([])
    const allTags: any = posts.reduce((obj, { node: { frontmatter: { tags } } }) => {
      const newObj: any = { ...obj }
      tags.forEach((t: string) => {
        if (filter && filterTags.has(t)) {
          newObj[t] = 'active'
        } else {
          newObj[t] = 'inactive'
        }
      })
      return newObj
    }, {})
    let tagButtons: { status: string, tag: string }[] = []
    for (const tag in allTags) {
      if (!allTags.hasOwnProperty(tag)) {
        continue
      }
      tagButtons.push({ tag, status: allTags[tag] })
    }
    tagButtons.sort((a, b) => a.tag < b.tag ? -1 : 1)
    return (
      <>
        <div className='flex flex-row flex-wrap my-16'>
          {tagButtons.map(t => <TagBadge className="mx-2" key={t.tag} onClick={() => onTagClick(t.tag)} active={t.status === 'active'}>{t.tag}</TagBadge>)}
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-0 lg:gap-x-12 gap-y-16'>
        {posts
          .filter(({ node: { frontmatter: { tags } } }) => filter ? tags.some(t => allTags[t] === 'active') : true)
          .map(({ node: post }) => (
            <div className="p-0 col-span-2 lg:col-span-1" key={post.frontmatter.path}>
              <h3 className='text-gray-600'>{format(new Date(post.frontmatter.date), 'EEEE, MMMM do, yyyy')}</h3>
              <h1 className='leading-none font-bebas text-4xl text-teal'>
                <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
              </h1>
              <p className='mt-4'>{post.frontmatter.excerpt}</p>
            </div>
          ))
        }
        </div>
      </>
    )
  }
}

export default Index
