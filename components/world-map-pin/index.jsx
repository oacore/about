import React from 'react'

import './world-map-pin.scss'

const Pin = ({ latitude, longitude, picture }) => {
  const x = 50 + (parseFloat(longitude) / 360) * 100
  const y = 50 + (parseFloat(latitude) / 180) * -100
  // const x = 48.8 + (parseFloat(longitude) / 360) * 100
  // const y = 56 + (parseFloat(latitude) / 180) * -100

  return (
    <div className="pin" style={{ top: `${y}%`, left: `${x}%` }}>
      <img src={picture} alt="pin" />
    </div>
  )
}

export default Pin
