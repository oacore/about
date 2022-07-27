import React from 'react'

import styles from './community.module.scss'

import { Page, Button } from 'components'
import page from 'data/community/home.yml'
import { Layout, Hero, Section } from 'design-v2/components'
// TODO: Fix temporal text-center class usage
const CommunityPage = () => (
  <Page title={page.title} description={page.description}>
    <Layout className={styles.container}>
      <Hero
        id={page.header.id}
        image={page.header.image}
        title={page.title}
        description={page.description}
        caption={page.header.caption}
      />
      <Section className={styles.group}>
        {page.actions.map((action) => (
          <Button
            key={action.title}
            href={action.url}
            className={styles.button}
          >
            {action.title}
          </Button>
        ))}
      </Section>
    </Layout>
  </Page>
)
export default CommunityPage
