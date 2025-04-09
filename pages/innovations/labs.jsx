import React from 'react'
import { Card, Button } from '@oacore/design/lib/elements'

import styles from './labs.module.scss'
import { getSections } from '../../hooks/retriveContent'

import { Page } from 'components'
import { Layout, Hero } from 'design-v2/components'

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const page = await getSections('coreLabs', { ref })

  return {
    props: {
      page,
    },
  }
}

const FeatureBox = ({ iconSrc, title, description, tag, action }) => (
  <Card variant="pure" className={styles.card}>
    <img src={iconSrc} alt={title} className={styles.cardLogo} />
    <Card.Title className={styles.headerWrapper} tag="h5">
      <span>{title}</span>
      <div className={styles.tag}>{tag}</div>
    </Card.Title>
    <Card.Description className={styles.description}>
      {description}
    </Card.Description>
    <Card.Footer className={styles.cardFooter}>
      <Button
        className={styles.button}
        variant="contained"
        href={action.url}
        tag="a"
      >
        {action.caption}
      </Button>
    </Card.Footer>
  </Card>
)

const LabsPage = ({ page }) => (
  <Page
    title={page.header.header.title}
    description={page.header.header.description}
    // keywords={servicesData.keywords}
    nav
  >
    <Layout>
      <Hero
        image={page.header.header.hero}
        title={page.header.header.title}
        description={page.header.header.description}
        className={styles.labHero}
      />
      <div className={styles.features}>
        {page.services.features &&
          page.services.features.map((feature) => (
            <FeatureBox
              key={feature.id}
              iconSrc={feature.logo}
              title={feature.title}
              description={feature.description}
              recommender={feature.recommender}
              action={feature.action}
              tag={feature.tag}
            />
          ))}
      </div>
    </Layout>
  </Page>
)

export default LabsPage
