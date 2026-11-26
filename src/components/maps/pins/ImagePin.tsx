'use client'

import Image, { type StaticImageData } from 'next/image'

import Pin from './Pin'
import styles from './pins.module.css'
import type { PinProps } from './types'

export type ImagePinProps = Omit<PinProps, 'children'> & {
  src: string | StaticImageData
  alt: string
}

const ImagePin = ({ src, alt, className, ...restProps }: ImagePinProps) => (
  <Pin className={className} {...restProps}>
    <span className={styles.pinImage}>
      <Image alt={alt} className={styles.pinPhoto} fill sizes="48px" src={src} unoptimized />
    </span>
  </Pin>
)

export default ImagePin
