import React from 'react'
import { classNames } from '@oacore/design/lib/utils'

import styles from './history.module.scss'

import {
  Page,
  Section,
  AnniversaryLogo as Logo,
  HistoryTimeline as Timeline,
} from 'components'

// Copy of the `components/hero`
// TODO: Push the copy back to the main component once the page could be
//       released publicly
const Hero = ({
  data: { tagline } = {},
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
    <Logo className={styles.heroLogo} />
    {tagline && <p className={styles.heroTagline}>{tagline}</p>}
    {children}
  </Section>
)

const HistoryPage = ({ data }) => (
  <Page
    title={data.title}
    description={data.description}
    className={styles.page}
  >
    <Hero className={styles['blobs-background']} data={data} />
    <Timeline className={styles.timeline} data={data} />
  </Page>
)

export default HistoryPage
