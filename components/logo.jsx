import React from 'react'

// NOTE: Import all logo-images here
// TODO: Use SVG
import logoPath from './images/core-logo.png'

// TODO: Add more configuration
const Logo = ({ textOnly }) => {
  if (textOnly) return 'CORE'

  return <img src={logoPath} alt="CORE" className="d-block mx-auto" />
}

export default Logo
