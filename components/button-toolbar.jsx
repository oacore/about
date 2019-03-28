import React from 'react'
import { ButtonToolbar as BootstrapButtonToolbar } from 'reactstrap'

const ButtonToolbar = ({
  children,
  align = 'left',
  className = '',
  ...restProps
}) => {
  const classNames = `btn-toolbar-${align} ${className}`
  return (
    <BootstrapButtonToolbar className={classNames} {...restProps}>
      {children}
    </BootstrapButtonToolbar>
  )
}

export default ButtonToolbar
