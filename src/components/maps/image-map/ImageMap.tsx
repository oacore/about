'use client'

import classNames from 'classnames'
import { Children, cloneElement, isValidElement, type CSSProperties, type ReactNode } from 'react'

import type { PinPosition } from '../pins/types'

import styles from './image-map.module.css'

const MAP_CENTER_X = 49
const MAP_CENTER_Y = 57.5
const MAP_SIZE_MODIFIER_X = 120 / (2 * Math.PI)
const MAP_SIZE_MODIFIER_Y = -110 / Math.PI

type GeoCoordinates = {
  x: number
  y: number
}

export type ImageMapProps = {
  children?: ReactNode
  className?: string
}

const geo2coords = (latitude: number | string, longitude: number | string): GeoCoordinates => {
  const latDeg = Number.parseFloat(String(latitude))
  const lonDeg = Number.parseFloat(String(longitude))

  const x =
    MAP_CENTER_X +
    ((lonDeg * Math.PI) / 120) * Math.sqrt(1 / 3 - (latDeg / 180) ** 2) * MAP_SIZE_MODIFIER_X
  const y = MAP_CENTER_Y + ((latDeg * Math.PI) / 180) * MAP_SIZE_MODIFIER_Y

  return { x, y }
}

const ImageMap = ({ children, className }: ImageMapProps) => (
  <div className={classNames(styles.imageMap, className)}>
    {Children.map(children, (child) => {
      if (!isValidElement<PinPosition & { style?: CSSProperties }>(child)) {
        return child
      }

      const { latitude, longitude, style } = child.props

      if (latitude == null || longitude == null) {
        return child
      }

      const { x, y } = geo2coords(latitude, longitude)

      return cloneElement(child, {
        style: {
          '--pin-top': `${y}%`,
          '--pin-left': `${x}%`,
          ...style,
        } as CSSProperties,
      })
    })}
  </div>
)

export default ImageMap
