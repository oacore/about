import React from 'react'
import { Card, Button } from '@oacore/design/lib/elements'

import styles from './labs.module.scss'

import { Page } from 'components'
import { Layout, Hero } from 'design-v2/components'
import retrieveContent from 'content'

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

const setAssetsUrl = (object) => {
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'string' && value.includes('/images'))
      object[key] = ASSETS_BASE_URL + value
    else if (typeof value === 'object') setAssetsUrl(value) // Recursively process nested objects
  })
}

const getSections = async ({ ref } = {}) => {
  const page = await retrieveContent('coreLabs', {
    ref,
    transform: 'object',
  })

  setAssetsUrl(page)

  return page
}

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const page = await getSections({ ref })

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
