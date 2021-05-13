import React from 'react'
import { classNames } from '@oacore/design/lib/utils'

import Logo from '../logo'
import { Section } from '../content'
import styles from './hero.module.scss'

const HeroSection = ({
  data: { title = 'CORE', tagline = '' } = {},
  className,
  children,
  tag = 'div',
  ...passProps
}) => (
  <Section
    className={classNames.use(styles.hero).join(className)}
    tag={tag}
    {...passProps}
  >
    <Logo text={title} className={styles.heroLogo} tag="h1" />
    {tagline && <p className={styles.heroTagline}>{tagline}</p>}
    {children}
  </Section>
)

export default HeroSection
