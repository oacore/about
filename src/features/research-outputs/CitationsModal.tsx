'use client'

import { Button, Input, Tabs } from 'antd'
import { useState } from 'react'

import type { PaperCitations } from '@features/research-outputs/types'

import styles from './styles.module.css'

const { TextArea } = Input

const citationTitles = {
  text: 'Full citation',
  bibtex: 'BibTeX',
} as const

type CitationType = keyof typeof citationTitles

type CitationsModalProps = {
  id: string
  citations?: PaperCitations
  className?: string
}

const CitationsModal = ({ id, citations = {}, className }: CitationsModalProps) => {
  const [activeTab, setActiveTab] = useState<CitationType>('text')

  const handleCopyClick = () => {
    const value = citations[activeTab] ?? ''

    if (!value) {
      return
    }

    navigator.clipboard.writeText(value).catch(() => {
      const controlElement = document.getElementById(
        `${id}-${activeTab}-control`,
      ) as HTMLTextAreaElement | null

      controlElement?.select()
      document.execCommand('copy')
    })
  }

  const tabItems = (Object.entries(citationTitles) as Array<[CitationType, string]>).map(
    ([type, tabTitle]) => ({
      key: type,
      label: tabTitle,
      children: (
        <div className={styles.citationTab}>
          <label className={styles.srOnly} htmlFor={`${id}-${type}-control`}>
            {tabTitle} text to copy
          </label>
          <TextArea
            className={styles.citationTabControl}
            id={`${id}-${type}-control`}
            readOnly
            rows={6}
            value={citations[type] ?? ''}
          />
        </div>
      ),
    }),
  )

  return (
    <div aria-label="Cite the work" className={className} id={id}>
      <Tabs
        activeKey={activeTab}
        className={styles.citationTabs}
        items={tabItems}
        onChange={(key) => {
          setActiveTab(key as CitationType)
        }}
      />
      <div className={styles.actionBtn}>
        <Button aria-label="Copy citation to clipboard" onClick={handleCopyClick} type="default">
          Copy to clipboard
        </Button>
      </div>
    </div>
  )
}

export default CitationsModal
