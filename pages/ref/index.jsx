import { Button } from '@oacore/design/lib/elements'
import React, { useRef } from 'react'
import { Card } from 'reactstrap'
import { classNames } from '@oacore/design/lib/utils'

import { getSections } from '../../hooks/retriveContent'
import styles from '../about/about.module.scss'
import Markdown from '../../components/markdown'
import ref from '../../public/images/ref.svg'
import { Content, Section } from '../../components'
import { Layout } from '../../design-v2/components'
import coreLogo from '../../public/images/core-logo-circle.svg'

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
  papersLength,
  paper,
  content,
  content2,
  subContent,
  subContent2,
  subHeader,
  subHeaderContent,
  images,
  items,
  subTitle,
  caption,
  ...cardProps
}) => {
  const isSectionContent =
    content ||
    content2 ||
    subContent ||
    subContent2 ||
    subHeaderContent ||
    subHeader ||
    items ||
    images

  if (isSectionContent) {
    return (
      <Card {...cardProps}>
        {title && (
          <div
            className={classNames.use(styles.cardTitle, {
              [styles.cardTitleColumn]: papersLength,
            })}
          >
            <span key="title" className={styles.referenceTitle}>
              {title}
            </span>
          </div>
        )}
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
            <div className={styles.subWrapper}>
              {subHeader && (
                <div className={styles.cardSubHeader}>
                  <Markdown>{subHeader}</Markdown>
                </div>
              )}
              {subHeaderContent && (
                <div className={styles.cardSubContent}>
                  <Markdown>{subHeaderContent}</Markdown>
                </div>
              )}
            </div>
            {content && (
              <div className={styles.cardContent}>
                <Markdown>{content}</Markdown>
              </div>
            )}
            {subContent && (
              <div className={styles.cardSubContent}>
                <Markdown>{subContent}</Markdown>
              </div>
            )}
            {subContent2 && <span>And:</span>}
            {images && images.length > 0 && (
              <div className={styles.cardImages}>
                {images.map((image, index) => (
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    src={image.item}
                    alt={`${title || 'Section'} image ${index + 1}`}
                    className={styles.cardImage}
                  />
                ))}
              </div>
            )}
            {items && items.length > 0 && (
              <div className={styles.cardItems}>
                {items.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index} className={styles.cardItem}>
                    {item.title && (
                      <div className={styles.cardItemTitle}>
                        <Markdown>{item.title}</Markdown>
                      </div>
                    )}
                    {item.description && (
                      <div className={styles.cardItemDescription}>
                        <Markdown>{item.description}</Markdown>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {subContent2 && (
              <div className={styles.cardSubContent}>
                <Markdown>{subContent2}</Markdown>
              </div>
            )}
            {content2 && (
              <div className={styles.cardContent}>
                <Markdown>{content2}</Markdown>
              </div>
            )}
          </div>
        </div>
      </Card>
    )
  }

  // Original paper card structure
  return (
    <Card {...cardProps}>
      <div
        className={classNames.use(styles.cardTitle, {
          [styles.cardTitleColumn]: papersLength,
        })}
      >
        <span key="title" className={styles.referenceTitle}>
          {title}
        </span>
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
      </div>
    </Card>
  )
}

const ResearchOutputsSection = ({
  id,
  title,
  papers,
  subTitle,
  caption,
  // New section data structure
  content,
  content2,
  subContent,
  subContent2,
  subHeaderContent,
  subHeader,
  images,
  items,
  ...restProps
}) => {
  const hasSectionContent =
    content ||
    content2 ||
    subContent ||
    subContent2 ||
    subHeaderContent ||
    subHeader ||
    items ||
    images
  const hasPapers = papers && papers.length > 0

  return (
    <Section id={id} {...restProps} className={styles.researchSection}>
      <Content className={styles.researchItem}>
        {title && (
          <div
            className={classNames.use(
              styles.togglePanelTitle,
              styles.togglePanelAlign
            )}
          >
            {title}
          </div>
        )}
        {subTitle && (
          <div className={styles.togglePanelSubTitle}>{subTitle}</div>
        )}
        {hasSectionContent && (
          <div className={styles.toggleContent}>
            <ResearchPaperCard
              id={id}
              content={content}
              content2={content2}
              subContent={subContent}
              subContent2={subContent2}
              subHeader={subHeader}
              subHeaderContent={subHeaderContent}
              images={images}
              items={items}
              subTitle={subTitle}
              caption={caption}
              papersLength
              className="mb-3"
            />
          </div>
        )}
        {hasPapers && (
          <div className={styles.toggleContent}>
            {papers.map((paper) => (
              <div
                key={paper.id}
                className={classNames.use(styles.toggleItem, {
                  [styles.toggleItemSmall]: papers.length > 1,
                })}
              >
                <ResearchPaperCard
                  paper={paper}
                  papersLength={papers.length > 1}
                  paperId={id}
                  className="mb-3"
                  {...paper}
                />
              </div>
            ))}
          </div>
        )}
      </Content>
    </Section>
  )
}

export async function getStaticProps({ previewData }) {
  // eslint-disable-next-line no-shadow
  const ref = previewData?.ref
  const page = await getSections('ref', { ref })

  return {
    props: {
      page,
    },
  }
}

const RefOutputsPage = ({ page }) => {
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

  return (
    <Layout>
      <Section className={styles.header}>
        <div className={styles.innerWrapper}>
          <h1 className={styles.title}>{page.header.header.title}</h1>
          <Markdown className={styles.description}>
            {page.header.header.description}
          </Markdown>
        </div>
        <div className={styles.sectionWrapper}>
          <img src={ref} alt="ref" />
          <ul className={styles.redirectWrapper}>
            {page.header.header.links?.content?.map((item) => (
              <li className={styles.redirectLink} key={item.href}>
                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <a onClick={() => handleScroll(item.href)}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      {page.header.header.actions && (
        <div className={styles.redirections}>
          <div
            className={classNames.use(
              styles.redirectButtonWrapper,
              styles.redirectButtonWrapperLeft
            )}
          >
            <Markdown className={styles.redirectLinks}>
              {page.header.header.actions.left.text}
            </Markdown>
            <Button
              className={styles.redirectButton}
              tag="a"
              variant="outlined"
              href={page.header.header.actions.left.action.link}
              target={
                page.header.header.actions.left.action.link?.startsWith('http')
                  ? '_blank'
                  : undefined
              }
            >
              {page.header.header.actions.left.action.title}
            </Button>
          </div>
          <div
            className={classNames.use(
              styles.redirectButtonWrapper,
              styles.redirectButtonWrapperRight
            )}
          >
            <Markdown className={styles.redirectLinks}>
              {page.header.header.actions.right.text}
            </Markdown>
            <Button
              className={styles.redirectButton}
              tag="a"
              variant="contained"
              href={page.header.header.actions.right.action.link}
              target={
                page.header.header.actions.right.action.link?.startsWith('http')
                  ? '_blank'
                  : undefined
              }
            >
              {page.header.header.actions.right.action.title}
            </Button>
          </div>
        </div>
      )}
      {page.sections.sections?.map((section, index) => (
        <ResearchOutputsSection
          key={section.id}
          index={index}
          id={section.id}
          caption={section.caption || section.title}
          title={section.title}
          subTitle={section.subTitle}
          papers={section.papers}
          content={section.content}
          content2={section.content2}
          subContent={section.subContent}
          subContent2={section.subContent2}
          subHeader={section.subHeader}
          subHeaderContent={section.subHeaderContent}
          images={section.images}
          items={section.items}
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

export default RefOutputsPage
