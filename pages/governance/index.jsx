import React from 'react'

import styles from './community.module.scss'

import { Page, Button, Markdown } from 'components'
import page from 'data/community/home.yml'
import { Layout, Hero, Section } from 'design-v2/components'

const GovernancePage = () => (
  <Page title={page.title} description={page.description}>
    <Layout className={styles.container}>
      <Hero
        id={page.header.id}
        image={page.header.image}
        title={page.title}
        description={page.description}
        caption={page.header.caption}
        borderBottom
      />
      <Section className={styles.header}>
        <div>
          <img className={styles.logo} src={page.connectionsImage} alt="logo" />
        </div>
        <div className={styles.content}>
          {page.connections.map((item) => (
            <>
              <h5 className={styles.governanceType}>{item.title}</h5>
              <Markdown>{item.description}</Markdown>
            </>
          ))}
        </div>
      </Section>
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
export default GovernancePage
