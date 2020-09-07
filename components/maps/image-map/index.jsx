import React from 'react'

import styles from './image-map.module.scss'

const geo2coords = (latitude, longitude) => {
  // The map coefficients are adapted to the SVG-map image from:
  // https://simplemaps.com/resources/svg-world
  // with a little experimental data modification
  const mapCenterX = 49
  const mapCenterY = 57.5
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
  <Tag className={`${styles.imageMap} ${className}`} {...restProps}>
    {React.Children.map(children, (child) => {
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
