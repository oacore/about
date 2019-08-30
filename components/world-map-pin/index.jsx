import React from 'react'

import './world-map-pin.scss'

const Pin = ({
  latitude,
  longitude,
  picture,
  style,
  tag: Tag = 'div',
  ...restProps
}) => {
  const mapWidth = 65 // percents for full imaginary map
  const mapHeight = 113 // percents for full imaginary map
  const x = 49 + (parseFloat(longitude) / 360) * mapWidth
  const y = mapHeight / 2 + (parseFloat(latitude) / 180) * (-1 * mapHeight)
  // const x = 48.8 + (parseFloat(longitude) / 360) * 100
  // const y = 56 + (parseFloat(latitude) / 180) * -100

  return (
    <Tag
      className="pin"
      style={{ ...style, top: `${y}%`, left: `${x}%` }}
      {...restProps}
    >
      <img src={picture} alt="pin" />
    </Tag>
  )
}

export default Pin
