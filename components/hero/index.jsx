import React from 'react'

import Logo from '../logo'
import { Section } from '../content'
import styles from './hero.module.scss'

const HeroSection = ({
  children,
  title = 'CORE',
  tagline = '',
  className = '',
  tag = 'div',
  ...restProps
}) => (
  <Section className={`${styles.hero} ${className}`} tag={tag} {...restProps}>
    <Logo text={title} className={styles.heroLogo} tag="h1" />
    {tagline && <p className={styles.heroTagline}>{tagline}</p>}
    {children}
  </Section>
)

export default HeroSection
