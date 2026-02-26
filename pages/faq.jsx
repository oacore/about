import React, { useEffect, useRef, useState } from 'react'
import { classNames } from '@oacore/design/lib/utils'
import { useRouter } from 'next/router'

import styles from './index.module.scss'
import retrieveContent from '../content'
import guideIcon from '../public/images/data-provider.svg'

import { Accordion, Button, Content, Markdown, Page, Section } from 'components'

const itemToURL = (id) => {
  const url = new URL(window.location)
  url.hash = id ? `#${id}` : ''
  window.history.replaceState({}, null, url.toString())
}

const FAQsSection = ({
  id,
  title,
  updateDate,
  items = [],
  sections = [],
  caption = title,
  level = 2,
  guideline,
}) => {
  const Heading = `h${level}`
  const [isMounted, setIsMounted] = useState(false)
  const badgesRef = useRef()
  const router = useRouter()
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const badgedItem = React.useMemo(() => items.find((item) => item.badge), [])
  useEffect(() => {
    if (isMounted && router.asPath.split('#')[1]) {
      const element = badgesRef.current
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth',
        })
      }
    }
  }, [isMounted, badgedItem])

  return (
    <div ref={badgedItem ? badgesRef : null}>
      <Section id={id} caption={caption}>
        <div className={styles.faqHeaderWrapper}>
          <Heading>{title}</Heading>
          <span className={styles.faqHeaderDate}>{updateDate}</span>
        </div>
        {guideline && (
          <div className={styles.sectionService}>
            <div className={styles.sectionItem}>
              <div className={styles.header}>
                <img
                  className={styles.titlePicture}
                  src={guideIcon}
                  alt={guideline.title}
                />
                <span className={styles.serviceTitle}>{guideline.title}</span>
              </div>
              <div>
                <Markdown className={styles.serviceDescription}>
                  {guideline.description}
                </Markdown>
                <div className={styles.btnPlacement}>
                  <Button
                    outline
                    color="primary"
                    href={guideline.action.url}
                    target="_blank"
                  >
                    {guideline.action.title}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        <Content>
          <Accordion onToggle={itemToURL}>
            {items.map((item) => (
              <Accordion.Item
                id={item.slug}
                title={item.question}
                key={item.slug}
              >
                <div>
                  {item.answer ? (
                    <Markdown>{item.answer}</Markdown>
                  ) : (
                    <Section className={styles.badgeMainWrapper}>
                      <h2 className={styles.badgeTitle}>
                        {item.badge[0].title}
                      </h2>
                      <div className={styles.badgeContainer}>
                        <div className={styles.badgeDescription}>
                          <Markdown>{item.badge[0].description}</Markdown>
                          <div className={styles.badgeWrapper}>
                            {item.badge[0].images?.map((img) => (
                              <div className={styles.cardWrapper}>
                                <div className={styles.imgWrapper}>
                                  {/* eslint-disable-next-line max-len */}
                                  {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                                  <img
                                    key={img.file}
                                    className={classNames.use(styles.image, {
                                      [styles.badgeImage]: img.source,
                                      [styles.badgeImageHeight]:
                                        img.source?.includes('square'),
                                    })}
                                    src={img.file}
                                    alt="image"
                                  />
                                </div>
                                <div className={styles.textAlignment}>
                                  <span className={styles.text}>
                                    {img.source}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Section>
                  )}
                </div>
              </Accordion.Item>
            ))}
          </Accordion>
        </Content>
        {sections.map((section) => (
          <FAQsSection key={section.title} level={level + 1} {...section} />
        ))}
      </Section>
    </div>
  )
}

const getSections = async ({ ref } = {}) => {
  const content = await retrieveContent('faqs', {
    ref,
    transform: 'object',
  })
  return content
}

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const sections = await getSections({ ref })
  const data = {
    ...sections,
  }

  return {
    props: {
      data,
    },
  }
}

const FAQsPage = ({ data }) => (
  <Page title={data.faqs.title} description={data.faqs.description} nav>
    <h1>{data.faqs.title}</h1>
    {data.faqs.sections.map((section) => (
      <FAQsSection key={section.id} {...section} />
    ))}
  </Page>
)

export default FAQsPage
