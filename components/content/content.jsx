import React, { Fragment } from 'react'
import Markdown from 'react-markdown'

const markdownConfig = {
  escapeHtml: false,

  renderers: {
    blockquote: ({ children }) => (
      <blockquote className="blockquote">{children}</blockquote>
    ),

    table: ({ children }) => (
      <table className="table table-hover">{children}</table>
    ),
  },
}

const Content = ({ children, markdown = false }) => {
  if (markdown) return <Markdown {...markdownConfig}>{children}</Markdown>
  return <Fragment>{children}</Fragment>
}

export default Content
