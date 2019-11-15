import React from 'react'
import NextHead from 'next/head'

const Head = ({ title, description, keywords, children, ...restProps }) => (
  <NextHead {...restProps}>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    {keywords && (
      <meta
        name="keywords"
        content={Array.isArray(keywords) ? keywords.join(', ') : keywords}
      />
    )}

    <link rel="shortcut icon" href="/public/favicon/favicon-32px.png" />
    <link rel="icon" href="/public/favicon/favicon-128px.png" />
    <link rel="icon" href="/public/favicon/favicon.svg" />

    {children}
  </NextHead>
)

export default Head
