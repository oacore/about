import React from 'react'
import NextLink from 'next/link'

import Router from '../router'

const Link = React.forwardRef(
  ({ href, children: child, passHref = true, ...restProps }, ref) => {
    if (href == null) return child

    const resolvedHref = Router.resolve(href)
    const actualChild =
      typeof child == 'string' ? (
        <a ref={ref} href={resolvedHref}>
          {child}
        </a>
      ) : (
        React.cloneElement(child, passHref ? { href: resolvedHref } : {})
      )
    try {
      // eslint-disable-next-line no-new
      new URL(resolvedHref) // throws if URL is relative
      return actualChild
    } catch (relativeUrlError) {
      return (
        <NextLink href={resolvedHref} {...restProps}>
          {actualChild}
        </NextLink>
      )
    }
  }
)

export default Link
