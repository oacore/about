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
    {children}
  </NextHead>
)

export default Head
