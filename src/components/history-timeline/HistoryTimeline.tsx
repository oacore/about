'use client'

import { Section } from '@core/core-ui'
import classNames from 'classnames'

import Markdown from '@components/Markdown/Markdown'
import HistoryMilestone from '@components/history-milestone'
import type { HistoryMilestone as HistoryMilestoneData } from '@features/history/types'

import styles from './styles.module.css'

type HistoryTimelineProps = {
  intro?: string
  milestones: HistoryMilestoneData[]
  className?: string
}

const HistoryTimeline = ({ intro, milestones, className }: HistoryTimelineProps) => (
  <Section aria-label="CORE history" className={classNames(styles.timeline, className)}>
    {intro ? (
      <div className={styles.intro} id="now">
        <Markdown>{intro}</Markdown>
      </div>
    ) : null}
    {milestones.map((milestone, index) => (
      <HistoryMilestone
        data={milestone}
        id={milestone.id}
        isLast={index === milestones.length - 1}
        key={milestone.id}
      />
    ))}
  </Section>
)

export default HistoryTimeline
