import React from 'react'

import './image-map.scss'

// WARNING: The final position is not completely correct because
// the function were tested on badly-aligned pins, i.e. calculations
// are made for the top-left corner of the ImagePin
//
// Although, it would work worse if it were fixed 🤔
const geo2coords = (latitude, longitude) => {
  // The map coefficients are adapted to the SVG-map image from:
  // https://simplemaps.com/resources/svg-world
  // with a little experimental data modification
  const mapCenterX = 48.75
  const mapCenterY = 55.6
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

  return { x, y }
}

const ImageMap = ({
  children,
  className = '',
  tag: Tag = 'div',
  ...restProps
}) => (
  <Tag className={`image-map ${className}`} {...restProps}>
    {React.Children.map(children, child => {
      const { latitude, longitude, style, ...childProps } = child.props
      const { x, y } = geo2coords(latitude, longitude)

      if (latitude != null && longitude != null) {
        return React.cloneElement(child, {
          ...childProps,
          style: {
            position: 'absolute',
            top: `${y}%`,
            left: `${x}%`,
            ...style,
          },
        })
      }

      return child
    })}
  </Tag>
)

export default ImageMap
