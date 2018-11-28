import React from 'react'
import PropTypes from 'prop-types'

// NOTE: Import all logo-images here
// TODO: Import pure logo symbol
// TODO: Use SVG
import logoPath from './images/core-logo.png'

const Logo = ({ display = 'full', className, ...args }) => {
  const finalClassName = `logo logo-${display} ${className || ''}`

  if (display === 'text') return <span className={finalClassName}>CORE</span>

  return <img src={logoPath} alt="CORE" className={finalClassName} {...args} />
}

Logo.propTypes = {
  display: PropTypes.oneOf(['full', 'icon', 'text']),
}

Logo.defaultProps = {
  display: 'full',
}

export default Logo
