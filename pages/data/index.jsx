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
      <div className={styles.sectionBanner}>
        <div className={styles.headerText}>
          <h1>{datasetData.headline}</h1>
          <Markdown>{datasetData.tagline}</Markdown>
        </div>
        <div className={styles.sectionService}>
          <div className={styles.sectionItem}>
            <div className={styles.header}>
              <img
                className={styles.titlePicture}
                src={datasetData.guideline.picture}
                alt={datasetData.guideline.title}
              />
              <span className={styles.serviceTitle}>
                {datasetData.guideline.title}
              </span>
            </div>
            <div>
              <Markdown className={styles.serviceDescription}>
                {datasetData.guideline.description}
              </Markdown>
              <div className={styles.btnPlacement}>
                <Button
                  variant="outlined"
                  href={datasetData.guideline.action.url}
                  target="_blank"
                >
                  {datasetData.guideline.action.title}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {datasetData.sections.map(
        ({ title, content, link, image, data, stats, subTitle }) => (
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
              {content && (
                <Markdown>
                  {patchStats(content, datasetData.statistics)}
                </Markdown>
              )}
              {stats && (
                <div className={styles.statWrapper}>
                  <ul className={styles.statList}>
                    {stats.map((item, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <li className={styles.statListItems} key={index}>
                        <div>
                          <Markdown className={styles.statCount}>
                            {patchStats(item.title, datasetData.statistics)}
                          </Markdown>
                          {item.description}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <span className={styles.subTitle}>{subTitle}</span>
                </div>
              )}
              {link && (
                <Button outline href={link?.url} color="primary">
                  {link?.caption}
                </Button>
              )}
            </div>
          </HighlightSection>
        )
      )}
      <Markdown>{datasetData.disclaimer}</Markdown>
    </Layout>
  </Page>
)
export default DataPage
