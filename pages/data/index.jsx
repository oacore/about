import React from 'react'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'

import { Page, Button, Markdown, HighlightSection } from 'components'
import { patchStats } from 'components/utils'
import datasetData from 'data/data.yml'
import { Layout } from 'design-v2/components'

// TODO: Fix temporal text-center class usage
const DataPage = () => (
  <Page
    title={datasetData.title}
    description={datasetData.description}
    keywords={datasetData.keywords}
  >
    <Layout>
      <div className={styles.headerText}>
        <h1>{datasetData.headline}</h1>
        <Markdown>{datasetData.tagline}</Markdown>
      </div>

      {datasetData.sections.map(({ title, content, link, image, data }) => (
        <HighlightSection image={image} action={link?.url} key={title}>
          <div
            className={classNames.use({
              [styles.centering]: data,
            })}
          >
            <h3
              className={classNames.use({
                [styles.textCenter]: data,
              })}
            >
              <Markdown>{patchStats(title, datasetData.statistics)}</Markdown>
            </h3>
            {data && (
              <div className={styles.dataItemWrapper}>
                {data.map((item) => (
                  <div className={styles.dataItem}>
                    <img src={item.image} alt={item.type} />
                    <a className={styles.itemLink} href={item.link}>
                      {item.type}
                    </a>
                  </div>
                ))}
              </div>
            )}
            <Markdown>{patchStats(content, datasetData.statistics)}</Markdown>
            {link && (
              <Button outline href={link?.url} color="primary">
                {link?.caption}
              </Button>
            )}
          </div>
        </HighlightSection>
      ))}
      <Markdown>{datasetData.disclaimer}</Markdown>
    </Layout>
  </Page>
)
export default DataPage
