import React from 'react'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'
import { Layout, Section } from '../../design-v2/components'
import { Markdown } from '../../components'

const TermsPageTemplate = ({ data }) => (
  <Layout>
    <Section id="termsPage" className={styles.header}>
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
        {data.main.map((mainItem) => (
          <div key={mainItem.title} className={styles.item}>
            <h2
              className={classNames.use(styles.mainTitle, {
                [styles.subTitle]: mainItem.subtitle,
              })}
            >
              {mainItem.title}
            </h2>
            <Markdown>{mainItem.content}</Markdown>
          </div>
        ))}
      </div>
    </div>
  </Layout>
)
export default TermsPageTemplate
