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
  // The map coefficients are adapted to the SVG-map image from:
  // https://simplemaps.com/resources/svg-world
  // with a little experimental data modification
  const mapCenterX = 48.75
  const mapCenterY = 55.6
  // const mapCenterX = 48.25
  // const mapCenterY = 56.6
  const mapSizeModifierX = 120 / (2 * Math.PI) // percents from radians
  const mapSizeModifierY = -110 / Math.PI // percents from radians

  const latDeg = parseFloat(latitude)
  const lonDeg = parseFloat(longitude)

  // The map projection is calculated from Kavrayskiy VII projection
  // See more: https://en.wikipedia.org/wiki/Kavrayskiy_VII_projection
  const x =
    mapCenterX +
    ((lonDeg * Math.PI) / 120) *
      Math.sqrt(1 / 3 - (latDeg / 180) ** 2) *
      mapSizeModifierX
  const y = mapCenterY + ((latDeg * Math.PI) / 180) * mapSizeModifierY

  return (
    <Tag
      className="world-map-pin"
      style={{ ...style, top: `${y}%`, left: `${x}%` }}
      {...restProps}
    >
      <img src={picture} alt="pin" />
    </Tag>
  )
}

export default Pin
