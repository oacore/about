'use client'

import styles from './Section.module.css'

export type SectionProps = {
  children: React.ReactNode
  className?: string
} & Omit<React.ComponentProps<'section'>, 'children' | 'className'>

const Section = ({ className, children, ...restProps }: SectionProps) => (
  <section
    className={[styles.container, className?.trim()].filter(Boolean).join(' ')}
    {...restProps}
  >
    {children}
  </section>
)

export default Section
