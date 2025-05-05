import React from 'react'

import styles from './community.module.scss'
import { getSections } from '../../hooks/retriveContent'

import { Page, Button, Markdown } from 'components'
import { Layout, Hero, Section } from 'design-v2/components'

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const page = await getSections('governance', { ref })

  return {
    props: {
      page,
    },
  }
}

const GovernancePage = ({ page }) => (
  <Page
    title={page.header.header.title}
    description={page.header.header.description}
  >
    <Layout className={styles.container}>
      <Hero
        id={page.header.header.id}
        image={page.header.header.image}
        title={page.header.header.title}
        description={page.header.header.description}
        caption={page.header.header.caption}
        borderBottom
      />
      <Section className={styles.header}>
        <div>
          <img
            className={styles.logo}
            src={page.connections.connectionsImage}
            alt="logo"
          />
        </div>
        <div className={styles.content}>
          {page.connections.connections.map((item) => (
            <>
              <h5 className={styles.governanceType}>{item.title}</h5>
              <Markdown>{item.description}</Markdown>
            </>
          ))}
        </div>
      </Section>
      <Section className={styles.group}>
        {page.services.features.map((action) => (
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
export default GovernancePage
