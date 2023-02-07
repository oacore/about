import React from 'react'
import { Button } from '@oacore/design/lib/elements'

import styles from './styles.module.scss'
import { Layout, Section } from '../../design-v2/components'
import { Markdown } from '../../components'

const TermsPageTemplate = ({ data }) => (
  <Layout>
    <Section id="metadata" className={styles.header}>
      <div>
        <h2 className={styles.title}>{data.header.title}</h2>
        <Markdown className={styles.description}>
          {data.header.description}
        </Markdown>
        <div className={styles.buttonGroup}>
          {data.header.actions.map((action) => (
            <Button
              href={action.url}
              target={action.target}
              variant={action.variant}
              key={action.caption}
              download={action.download}
            >
              {action.caption}
            </Button>
          ))}
        </div>
      </div>
    </Section>
    <div className={styles.contentWrapper}>
      <div className={styles.contentItem}>
        {data.main[0].mainItems.map((mainItem) => (
          <div className={styles.item}>
            <h2 className={styles.mainTitle}>{mainItem.title}</h2>
            <Markdown>{mainItem.content}</Markdown>
          </div>
        ))}
      </div>
      <div className={styles.contentItem}>
        {data.main[1].mainItems.map((mainItem) => (
          <div className={styles.item}>
            <h2 className={styles.mainTitle}>{mainItem.title}</h2>
            <Markdown>{mainItem.content}</Markdown>
          </div>
        ))}
      </div>
    </div>
    <div className={styles.additionalItem} id="disclaimer">
      <h2 className={styles.mainTitle}>{data.additional.title}</h2>
      <Markdown>{data.additional.content}</Markdown>
    </div>
  </Layout>
)
export default TermsPageTemplate
