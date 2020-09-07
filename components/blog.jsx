import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap'

class PostsList extends Component {
  static fetchFeed(url, options = {}) {
    return fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error(`Error loading ${url}: ${res.status}`)
        return res.json()
      })
      .then((data) =>
        data.map((item) => ({
          ...item,
          pubDate: new Date(item.pubDate),
        }))
      )
  }

  state = {
    isLoading: true,
    posts: [],
    error: null,
  }

  async componentDidMount() {
    const { endpoint } = this.props
    try {
      const posts = await PostsList.fetchFeed(endpoint)
      this.setState({ posts, isLoading: false })
    } catch (error) {
      this.setState({ error, isLoading: false })
    }
  }

  render() {
    const { limit = 5 } = this.props
    const { isLoading, posts, error } = this.state

    if (isLoading)
      return <Spinner color="primary" className="d-block mx-auto" />
    if (error != null)
      return <div className="alert alert-danger">{error.toString()}</div>

    return (
      <ListGroup tag="div">
        {posts.slice(0, limit).map(({ title, link, pubDate }) => (
          <ListGroupItem key={link}>
            <a href={link} className="d-block">
              {title}
            </a>
            <small className="text-muted">
              {pubDate.toLocaleString('en-GB')}
            </small>
          </ListGroupItem>
        ))}
      </ListGroup>
    )
  }
}

export default PostsList
