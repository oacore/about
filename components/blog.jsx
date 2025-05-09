import React, { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap'

const fetchFeed = (url, options = {}) =>
  fetch(url, options)
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

const PostsList = ({ endpoint, limit = 5 }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchFeed(endpoint)
        setPosts(fetchedPosts)
        setIsLoading(false)
      } catch (fetchError) {
        setError(fetchError)
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [endpoint])

  if (isLoading) return <Spinner color="primary" className="d-block mx-auto" />
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

export default PostsList
