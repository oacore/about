import React from 'react'
import { classNames } from '@oacore/design/lib/utils'

import { Section } from '../content'
import styles from './hero.module.scss'
import stylesHistory from '../../templates/history/history.module.scss'

// eslint-disable-next-line import/no-cycle
import { AnniversaryLogo as Logo } from 'components'

const HeroSection = ({
  data: { title = 'CORE', tagline = '' } = {},
  className,
  children,
  tag = 'div',
  ...passProps
}) => (
  <Section
    className={classNames
      .use(stylesHistory.blobsBackgroundHomepage)
      .join(className)}
    tag={tag}
    {...passProps}
  >
    <a href="/history" className={stylesHistory.linkLogo}>
      <Logo text={title} className={stylesHistory.heroLogo} tag="h1" />
    </a>
    {tagline && <p className={styles.heroTaglineBorder}>{tagline}</p>}
    {children}
  </Section>
)

export default HeroSection
