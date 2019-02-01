import React from 'react'
import { Button as ReactstrapButton } from 'reactstrap'
import Link from './link'

const Button = ({ children, href, color = 'primary', ...restProps }) => {
  const button = (
    <ReactstrapButton color={color} {...restProps}>
      {children}
    </ReactstrapButton>
  )

  return href != null ? (
    <Link href={href} passHref>
      {button}
    </Link>
  ) : (
    button
  )
}

export default Button
