import React from 'react'
import NextLink from 'next/link'
import routes from '../core.routes.yml'

/* eslint-disable jsx-a11y/anchor-is-valid */

const Link = ({ href, children, ...restProps }) => {
  let pathname = (href && href.pathname) || href
  // FIXME: Temporarely skip block routes
  // TODO: Configure dynamic routing via NextJS config
  pathname = typeof routes[pathname] == 'string' ? routes[pathname] : pathname
  const realHref = typeof href == 'string' ? pathname : { ...href, pathname }

  const nextChildren =
    typeof children == 'string' ? <a>{children}</a> : children

  return (
    <NextLink href={realHref} {...restProps}>
      {nextChildren}
    </NextLink>
  )
}

export default Link
