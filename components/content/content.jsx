import React, { Fragment } from 'react'
import Markdown from 'react-markdown'
import Link from '../link'

/* eslint-disable jsx-a11y/anchor-is-valid */

// We pass additional link because Markdown component does not render
// pure text but renders own TextRenderer componet instead
const MarkdownLink = ({ href, title, children }) => {
  const [pathname, hash] = href.split('#')
  return (
    <Link href={{ pathname, hash: hash && `#${hash}` }}>
      <a title={title}>{children}</a>
    </Link>
  )
}

const markdownConfig = {
  escapeHtml: false,

  renderers: {
    blockquote: ({ children }) => (
      <blockquote className="blockquote">{children}</blockquote>
    ),

    table: ({ children }) => (
      <table className="table table-hover">{children}</table>
    ),

    link: MarkdownLink,
    linkReference: MarkdownLink,
  },
}

const Content = ({ children, markdown = false }) => {
  if (markdown) {
    return (
      <Markdown className="content" {...markdownConfig}>
        {children}
      </Markdown>
    )
  }

  return <Fragment>{children}</Fragment>
}

export default Content
