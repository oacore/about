import React from 'react'

import styles from './styles.module.scss'
import { Layout, Section } from '../../design-v2/components'
import { Markdown } from '../../components'

const EnvironmentalPageTemplate = ({ data }) => (
  <Layout>
    <Section id="termsPage" className={styles.header}>
      <div className={styles.headerLeft}>
        <h2 className={styles.title}>{data.header.title}</h2>
        <p className={styles.description}>{data.header.description}</p>
      </div>
    </Section>
    <div className={styles.contentItem}>
      {data.main.map((mainItem) => (
        <div id={mainItem.id} key={mainItem.title} className={styles.item}>
          <Markdown>{mainItem.content}</Markdown>
        </div>
      ))}
    </div>
  </Layout>
)
export default EnvironmentalPageTemplate
