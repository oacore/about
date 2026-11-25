'use client'

import classNames from 'classnames'
import type { ReactNode } from 'react'

import Header from '@components/Header/Header'
import { Layout } from '@components/layout'
import Markdown from '@components/Markdown/Markdown'
import SectionNavLinks from '@components/SectionNavLinks'
import type { LegalPageData } from '@features/legal/types'

import styles from './LegalPage.module.css'

export type LegalPageProps = {
  data: LegalPageData
  id: string
  navAriaLabel: string
  /** Takes precedence over `data.header.description` (Header renders one or the other). */
  descriptionNode?: ReactNode
}

const LegalPage = ({ data, id, navAriaLabel, descriptionNode }: LegalPageProps) => {
  const navLinks = data.links?.content?.length ? (
    <SectionNavLinks ariaLabel={navAriaLabel} links={data.links.content} listStyle="decimal" />
  ) : undefined

  return (
    <Layout>
      <Header
        className={styles.header}
        description={data.header?.description}
        descriptionNode={descriptionNode}
        hideButtons
        id={id}
        navLinks={navLinks}
        navLinksClassName={styles.sectionWrapper}
        spacing
        title={data.header?.title}
      />

      <div className={styles.contentWrapper}>
        <div className={styles.contentItem}>
          {data.main?.map((mainItem) => (
            <div className={styles.item} id={mainItem.id} key={mainItem.id ?? mainItem.title}>
              <h2 className={classNames(styles.mainTitle, Boolean(mainItem.subtitle) && styles.subTitle)}>
                {mainItem.title}
              </h2>
              <Markdown className={styles.description}>{mainItem.content}</Markdown>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default LegalPage
