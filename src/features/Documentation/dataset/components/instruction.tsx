'use client'

import { Typography } from 'antd'

import Markdown from '@components/Markdown/Markdown'
import { Section } from '@components/layout'
import type { DatasetInstruction as DatasetInstructionData } from '@features/Documentation/dataset/types'

import styles from '../styles.module.css'

const { Title } = Typography

type DatasetInstructionProps = {
  instruction?: DatasetInstructionData
}

const DatasetInstruction = ({ instruction }: DatasetInstructionProps) => {
  if (!instruction) {
    return null
  }

  return (
    <Section className={styles.instruction} id={instruction.id}>
      {instruction.title ? (
        <Title className={styles.instructionTitle} level={4}>
          {instruction.title}
        </Title>
      ) : null}
      <div className={styles.instructionContent}>
        <Markdown className={styles.recommended}>{instruction.recommended}</Markdown>
        {instruction.reminder ? (
          <div className={styles.instructionReminder}>
            {instruction.reminder.title ? <Title level={5}>{instruction.reminder.title}</Title> : null}
            <Markdown className={styles.instructionReminderText}>{instruction.reminder.description}</Markdown>
          </div>
        ) : null}
      </div>
    </Section>
  )
}

export default DatasetInstruction
