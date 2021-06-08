import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import Link from './link'

/* eslint-disable jsx-a11y/anchor-is-valid */

// We pass additional link because Markdown component does not render
// pure text but renders own TextRenderer componet instead
const MarkdownLink = ({ href, title, children }) => (
  <Link href={href} passHref>
    <a title={title}>{children}</a>
  </Link>
)

const MarkdownImage = ({ src, alt, className = '', ...restProps }) => (
  <img
    className={`img-fluid ${className}`}
    src={src}
    alt={alt}
    {...restProps}
  />
)

const markdownConfig = {
  components: {
    a: MarkdownLink,
    img: MarkdownImage,

    blockquote: ({ children, ...restProps }) => (
      <blockquote className="blockquote" {...restProps}>
        {children}
      </blockquote>
    ),

    table: ({ children, ...restProps }) => (
      <table className="table table-hover" {...restProps}>
        {children}
      </table>
    ),
  },

  rehypePlygins: [rehypeRaw],
}

const Markdown = ({ children, tag, ...markdownProps }) => (
  <ReactMarkdown {...markdownConfig} {...markdownProps} root={tag}>
    {children}
  </ReactMarkdown>
)

export default Markdown
