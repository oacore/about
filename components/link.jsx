import React from 'react'
import NextLink from 'next/link'

import Router from '../router'

/* eslint-disable jsx-a11y/anchor-is-valid */

const Link = ({ href, children, ...restProps }) => {
  if (href == null) return children

  let pathname = href && href.pathname != null ? href.pathname : href
  // FIXME: Temporarely skip block routes
  // TODO: Configure dynamic routing via NextJS config
  pathname = Router.resolve(pathname)
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
