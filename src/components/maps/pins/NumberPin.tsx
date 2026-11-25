'use client'

import Pin from './Pin'
import styles from './pins.module.css'
import type { PinProps } from './types'

export type NumberPinProps = Omit<PinProps, 'children'> & {
  value: number
  name?: string
}

const NumberPin = ({ value, name, className, ...restProps }: NumberPinProps) => (
  <Pin className={className} {...restProps}>
    {value}
    {name ? <span className={styles.visuallyHidden}>{name}</span> : null}
  </Pin>
)

export default NumberPin
