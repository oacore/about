import React from 'react'
import { Card, Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './services.module.scss'

import { Page } from 'components'
import { Layout, Section, Video, Hero } from 'design-v2/components'
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
  const page = await retrieveContent('services', {
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

const FeatureBox = ({ iconSrc, title, description, recommender, action }) => (
  <Card variant="pure" className={styles.card}>
    <img src={iconSrc} alt={title} className={styles.cardLogo} />
    <Card.Title tag="h5">{title}</Card.Title>
    <Card.Description>{description}</Card.Description>
    <Card.Footer className={styles.cardFooter}>
      <span className={styles.cardFooterCaption}>Recommended for:</span>
      <div className={styles.cardRecommender}>
        {recommender.map((item) => (
          <div key={item.title} className={styles.item}>
            {item.title}
          </div>
        ))}
      </div>
      <Button variant="contained" href={action.url} tag="a">
        {action.caption}
      </Button>
    </Card.Footer>
  </Card>
)

const FeaturesSection = ({ id, description, title, video, features }) => {
  const [visibleVideo, setVisibleVideo] = React.useState(false)

  return (
    <Section
      className={classNames.use(styles.sectionContainer, {
        [styles.sectionContainerInline]: features.length === 1,
      })}
      id={id}
    >
      <div className={styles.sectionHeader}>
        {video && (
          <button
            className={styles.sectionVideoImg}
            type="button"
            onClick={() => setVisibleVideo(true)}
          >
            <div className={styles.pulse} />
            <img src="/images/services/video_placeholder.svg" alt="video" />
          </button>
        )}

        <p hidden>{description}</p>
        <h3 className={styles.sectionTitle}>{title}</h3>
        {video && (
          <Video
            visibleModal={visibleVideo}
            closeModal={() => setVisibleVideo(false)}
            video={video}
          />
        )}
      </div>
      <div className={styles.features}>
        {features &&
          features.map((feature) => (
            <FeatureBox
              key={feature.id}
              iconSrc={feature.logo}
              title={feature.title}
              description={feature.description}
              recommender={feature.recommender}
              action={feature.action}
            />
          ))}
      </div>
    </Section>
  )
}

const ServicesPage = ({ page }) => (
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
      />
      <div className={styles.wrapper}>
        {page.services.sections.map((item) => (
          <FeaturesSection
            key={item.id}
            id={item.id}
            description={item.description}
            title={item.title}
            video={item.video}
            features={item.features}
          />
        ))}
      </div>
    </Layout>
  </Page>
)

export default ServicesPage
