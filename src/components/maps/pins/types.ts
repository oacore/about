import type { CSSProperties, ReactNode } from 'react'

export type PinPosition = {
  latitude?: number | string
  longitude?: number | string
}

export type PinProps = PinPosition & {
  children?: ReactNode
  className?: string
  href?: string
  title?: string
  style?: CSSProperties
}
