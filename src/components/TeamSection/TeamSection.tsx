'use client'

import { Section } from '@core/core-ui'
import { Col, Row } from 'antd'
import type { ReactNode } from 'react'

import TeamMember, { type TeamMemberProps } from '@components/team-member'

import styles from './TeamSection.module.css'

export type TeamSectionMember = Omit<TeamMemberProps, 'className'> & { key: string }

export type TeamSectionProps = {
  id: string
  title?: string
  members: TeamSectionMember[]
  /** Make all cards in a row the same height */
  equalHeight?: boolean
  /** An extra card at the end of the grid (e.g. "join us") */
  extraCard?: TeamMemberProps
  /** Extra content after the grid (e.g. past members) */
  children?: ReactNode
}

/** Section title with a grid of people cards (about team and ambassadors pages). */
const TeamSection = ({ id, title, members, equalHeight, extraCard, children }: TeamSectionProps) => {
  if (!title && !members.length && !extraCard && !children) {
    return null
  }

  const cardClassName = equalHeight ? styles.card : undefined

  return (
    <Section id={id}>
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      {members.length || extraCard ? (
        <Row gutter={[24, 24]} role="list">
          {members.map(({ key, ...member }) => (
            <Col key={key} lg={6} md={8} role="listitem" sm={12} xs={24}>
              <TeamMember className={cardClassName} {...member} />
            </Col>
          ))}
          {extraCard ? (
            <Col lg={6} md={8} role="listitem" sm={12} xs={24}>
              <TeamMember className={cardClassName} {...extraCard} />
            </Col>
          ) : null}
        </Row>
      ) : null}
      {children}
    </Section>
  )
}

export default TeamSection
