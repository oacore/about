'use client'

import { Layout, SectionNavLinks } from '@core/core-ui'
import classNames from 'classnames'
import Image from 'next/image'
import bsdtag from '@/assets/icons/bsdtag.svg'
import FooterSection from '@components/FooterSection'
import Header from '@components/Header/Header'
import Markdown from '@components/Markdown/Markdown'
import RedirectAction from '@components/RedirectAction'
import type { ResearchOutputsPageData } from '@features/research-outputs/types'

import ResearchOutputsSection from './ResearchOutputsSection'

import styles from './styles.module.css'

type ResearchOutputsPageProps = {
  data: ResearchOutputsPageData
}

const ResearchOutputsPage = ({ data }: ResearchOutputsPageProps) => {
  const header = data.header?.header
  const sections = data.sections?.sections ?? []
  const footer = data.footer

  const navLinks = header?.links ? (
    <div className={styles.sectionWrapper}>
      <SectionNavLinks
        ariaLabel="Research outputs page sections"
        links={header.links.content ?? []}
      />
      <RedirectAction
        action={header.links.moreAction ? { ...header.links.moreAction, target: '_blank' } : undefined}
        text={header.links.more}
      />
    </div>
  ) : undefined

  return (
    <Layout>
      {header ? (
        <Header
          className={classNames(styles.header, styles.headerStyleWrapper)}
          contentClassName={styles.innerWrapper}
          descriptionNode={
            <>
              <Markdown className={styles.description}>{header.description}</Markdown>
              <Image
                alt="BSDTAG"
                className={styles.headerImage}
                height={48}
                priority
                src={bsdtag}
                width={115}
              />
            </>
          }
          hideButtons
          id={header.id}
          navLinks={navLinks}
          navLinksClassName={styles.navLinksWrap}
          title={header.title}
          titleClassName={styles.title}
        />
      ) : null}

      {sections.map((section) => (
        <ResearchOutputsSection key={section.id} {...section} />
      ))}

      <FooterSection action={footer?.action} content={footer?.footer} />
    </Layout>
  )
}

export default ResearchOutputsPage
