'use client'

import type { ElementType } from 'react'

import styles from './Video.module.css'

export type VideoProps = {
  src: string
  title: string
  className?: string
  tag?: ElementType
}

const joinClasses = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(' ')

const Video = ({ src, title, className, tag: Tag = 'div' }: VideoProps) => (
  <Tag className={joinClasses(styles.embedResponsive, className)}>
    <iframe
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className={styles.embedObject}
      src={src}
      title={title}
    />
  </Tag>
)

export default Video
