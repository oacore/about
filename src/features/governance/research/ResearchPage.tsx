'use client'

import { Card, Col, Row } from 'antd'
import Image from 'next/image'
import type { StaticImageData } from 'next/image'

import Markdown from '@components/Markdown/Markdown'
import { Layout, Section } from '@components/layout'
import type { ResearchJoinCardsDocument, ResearchPageData } from '@features/governance/types'

import {
  RESEARCH_HEADER_BANNER,
  RESEARCH_JOIN_CARD_ALTS,
  RESEARCH_JOIN_CARD_ICONS,
} from './constants'
import styles from './research.module.css'

type ResearchPageProps = {
  data: ResearchPageData
}

type JoinCardView = {
  title: string
  description: string
  icon: StaticImageData
  alt: string
}

const JOIN_CARD_FIELDS: Array<{
  titleKey: keyof Pick<
    ResearchJoinCardsDocument,
    'firstCardTitle' | 'secondCardTitle' | 'thirdCardTitle'
  >
  descriptionKey: keyof Pick<
    ResearchJoinCardsDocument,
    'firstCardDescription' | 'secondCardDescription' | 'thirdCardDescription'
  >
}> = [
  { titleKey: 'firstCardTitle', descriptionKey: 'firstCardDescription' },
  { titleKey: 'secondCardTitle', descriptionKey: 'secondCardDescription' },
  { titleKey: 'thirdCardTitle', descriptionKey: 'thirdCardDescription' },
]

const getJoinCards = (joinCards?: ResearchJoinCardsDocument): JoinCardView[] => {
  if (!joinCards) {
    return []
  }

  return JOIN_CARD_FIELDS.flatMap((field, index) => {
    const title = joinCards[field.titleKey]
    const description = joinCards[field.descriptionKey]

    if (!title || !description) {
      return []
    }

    return [
      {
        title,
        description,
        icon: RESEARCH_JOIN_CARD_ICONS[index],
        alt: RESEARCH_JOIN_CARD_ALTS[index],
      },
    ]
  })
}

const ResearchPage = ({ data }: ResearchPageProps) => {
  const header = data.header
  const mission = data.mission
  const joinUs = data.joinUs
  const joinCards = getJoinCards(data.joinCards)

  return (
    <Layout>
      {header ? (
        <Section className={styles.header} id="header">
          <Row align="middle" gutter={[32, 24]}>
            <Col lg={14} md={24} xs={24}>
              <div className={styles.headerText}>
                {header.title ? <h1 className={styles.title}>{header.title}</h1> : null}
                {header.citation ? <p className={styles.citation}>{header.citation}</p> : null}
                {header.author ? (
                  <p className={styles.author}>– {header.author.trim()}</p>
                ) : null}
              </div>
            </Col>
            <Col className={styles.headerBanner} lg={10} md={24} xs={24}>
              <Image
                alt={header.title ?? 'Research Community'}
                className={styles.headerImage}
                height={320}
                priority
                src={RESEARCH_HEADER_BANNER}
                unoptimized
                width={420}
              />
            </Col>
          </Row>
        </Section>
      ) : null}

      {mission?.description ? (
        <Section className={styles.mission} id="mission">
          <Markdown className={styles.missionText}>{mission.description}</Markdown>
        </Section>
      ) : null}

      {joinCards.length ? (
        <Section className={styles.joinSection} id="why-join">
          <h2 className={styles.joinTitle}>Why join</h2>
          <Row gutter={[32, 24]} justify="center">
            {joinCards.map((card) => (
              <Col key={card.title} lg={8} md={12} xs={24}>
                <article>
                  <Card className={styles.joinCard} variant="borderless">
                    <Image
                      alt={card.alt}
                      className={styles.joinCardImage}
                      height={160}
                      src={card.icon}
                      unoptimized
                      width={220}
                    />
                    <h3 className={styles.joinCardTitle}>{card.title}</h3>
                    <p className={styles.joinCardDescription}>{card.description}</p>
                  </Card>
                </article>
              </Col>
            ))}
          </Row>
        </Section>
      ) : null}

      {joinUs ? (
        <Section className={styles.joinFooter} id="join-us">
          {joinUs.title ? <h2 className={styles.title}>{joinUs.title}</h2> : null}
          {joinUs.description ? (
            <Markdown className={styles.joinFooterDescription}>{joinUs.description}</Markdown>
          ) : null}
          {joinUs.contact ? (
            <Markdown className={styles.joinFooterContact}>{joinUs.contact}</Markdown>
          ) : null}
        </Section>
      ) : null}
    </Layout>
  )
}

export default ResearchPage
