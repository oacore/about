'use client'

import classNames from 'classnames'

import styles from './pins.module.css'
import type { PinProps } from './types'

const Pin = ({
  children,
  className,
  href,
  title,
  style,
  latitude: _latitude,
  longitude: _longitude,
  ...restProps
}: PinProps) => {
  const pinClassName = classNames(styles.pin, className)

  if (href) {
    return (
      <a
        aria-label={title}
        className={pinClassName}
        href={href}
        style={style}
        tabIndex={0}
        title={title}
        {...restProps}
      >
        {children}
      </a>
    )
  }

  return (
    <div aria-label={title} className={pinClassName} style={style} title={title} {...restProps}>
      {children}
    </div>
  )
}

export default Pin
