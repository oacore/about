import React, { useRef, useState } from 'react'
import { Card } from 'reactstrap'
import { classNames } from '@oacore/design/lib/utils'
import { Button } from '@oacore/design/lib/elements'

import styles from './about.module.scss'
import bsdtag from '../../public/images/bsdtag.svg'
import coreLogo from '../../public/images/core-logo-circle.svg'
import { Layout } from '../../design-v2/components'
import { getSections } from '../../hooks/retriveContent'

import { Content, Reference, Section } from 'components'
import Markdown from 'components/markdown'
import CitationsModal from 'components/citations-modal'

const ResearchPaperCard = ({
  id,
  paperId,
  type,
  title,
  author,
  year,
  booktitle,
  editor,
  journal,
  volume,
  number,
  description,
  url,
  isCitationsModalOpen,
  activePaper,
  papersLength,
  paper,
  ...cardProps
}) => (
  <Card {...cardProps}>
    <div
      className={classNames.use(styles.cardTitle, {
        [styles.cardTitleColumn]: papersLength,
      })}
    >
      {
        (year && <span key="year">({year})</span>,
        url ? (
          <a key="title" href={url} className={styles.referenceTitle}>
            {title.trim()}
          </a>
        ) : (
          <span key="title" className={styles.referenceTitle}>
            {title}
          </span>
        ))
      }
    </div>
    <div
      className={classNames.use(styles.cardWrapper, {
        [styles.cardWrapperColumn]: papersLength,
      })}
    >
      <div
        className={classNames.use(styles.itemWrapper, {
          [styles.itemWrapperColumn]: papersLength,
        })}
      >
        <div
          className={classNames.use(styles.cardHeader, {
            [styles.cardHeaderColumn]: papersLength,
            [styles.cardHeaderHeight]: paperId === 'ai-ml-papers',
          })}
        >
          <img src={coreLogo} alt="" />
          <Reference
            className="mb-0"
            author={author}
            title={title}
            url={url}
            year={year}
            booktitle={booktitle}
            editor={editor}
            journal={journal}
            volume={volume}
            number={number}
            description={description}
          />
        </div>
        <p
          className={classNames.use(styles.cardInfoDescription, {
            [styles.cardInfoDescriptionColumn]: papersLength,
            [styles.cardWrapperHeight]: paperId === 'ai-ml-papers',
          })}
        >
          {description}
        </p>
      </div>
      <div
        className={classNames.use(styles.urlWrapper, {
          [styles.urlWrapperColumn]: papersLength,
        })}
      >
        <CitationsModal
          id={`${(activePaper && activePaper.id) || 'unknown'}-citaions-modal`}
          citations={paper.citations || {}}
        />
      </div>
    </div>
  </Card>
)

const ResearchOutputsSection = ({
  id,
  title,
  papers,
  onPaperCite,
  isCitationsModalOpen,
  activePaper,
  subTitle,
  ...restProps
}) => (
  <Section id={id} {...restProps} className={styles.researchSection}>
    <Content className={styles.researchItem}>
      <div className={styles.togglePanelTitle}>{title}</div>
      <p className={styles.togglePanelSubTitle}>{subTitle}</p>
      <div className={styles.toggleContent}>
        {papers?.map((paper) => (
          <div
            className={classNames.use(styles.toggleItem, {
              [styles.toggleItemSmall]: papers.length > 1,
            })}
          >
            <ResearchPaperCard
              paper={paper}
              papersLength={papers.length > 1}
              key={paper.id}
              paperId={id}
              className="mb-3"
              isCitationsModalOpen={isCitationsModalOpen}
              activePaper={activePaper}
              {...paper}
            />
          </div>
        ))}
      </div>
    </Content>
  </Section>
)

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const page = await getSections('research-outputs', { ref })

  return {
    props: {
      page,
    },
  }
}

const ResearchOutputsPage = ({ page }) => {
  const [isCitationsModalOpen, setIsCitationsModalOpen] = useState(false)
  const [activePaper, setActivePaper] = useState(true)
  const headerHeight = useRef(50)

  const handleScroll = (id) => {
    const element = document.getElementById(id)
    const offset = headerHeight.current

    if (element) {
      const position = element.offsetTop - offset
      window.scrollTo({
        top: position,
        behavior: 'smooth',
      })
    }
  }

  const toggleCitationsModal = (event, paper) => {
    setIsCitationsModalOpen((prev) => !prev)
    setActivePaper((prev) => paper || prev)
  }

  return (
    <Layout>
      <Section
        className={classNames.use(styles.header, styles.headerStyleWrapper)}
      >
        <div className={styles.innerWrapper}>
          <h1 className={styles.title}>{page.header.header.title}</h1>
          <Markdown className={styles.description}>
            {page.header.header.description}
          </Markdown>
          <img className={styles.headerImage} src={bsdtag} alt="bsdtag" />
        </div>
        <div className={styles.sectionWrapper}>
          <ul className={styles.redirectWrapper}>
            {page.header.header.links?.content?.map((item) => (
              <li className={styles.redirectLink} key={item.href}>
                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <a onClick={() => handleScroll(item.href)}>{item.title}</a>
              </li>
            ))}
          </ul>
          <div className={styles.redirectButtonWrapper}>
            <Markdown className={styles.redirectLinks}>
              {page.header.header.links?.more}
            </Markdown>
            <Button
              className={styles.redirectButton}
              tag="a"
              variant="contained"
              href={page.header.header.links?.moreAction.link}
              target="_blank"
            >
              {page.header.header.links?.moreAction.title}
            </Button>
          </div>
        </div>
      </Section>
      {page.sections.sections?.map((section, index) => (
        <ResearchOutputsSection
          key={section.id}
          index={index}
          id={section.id}
          caption={section.caption || section.title}
          title={section.title}
          subTitle={section.subTitle}
          papers={section.papers}
          onPaperCite={toggleCitationsModal}
          isCitationsModalOpen={isCitationsModalOpen}
          activePaper={activePaper}
        />
      ))}
      <Content className={styles.footerWrapper}>
        <Markdown className={styles.footerText}>{page.footer.footer}</Markdown>
        <Button
          href={page.footer.action.href}
          variant="contained"
          target="_blank"
        >
          {page.footer.action.text}
        </Button>
      </Content>
    </Layout>
  )
}

export default ResearchOutputsPage
