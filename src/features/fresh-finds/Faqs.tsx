'use client'

import { useState, useSyncExternalStore } from 'react'

import Collapsed from '@components/Collapsed/Collapsed'
import { Section } from '@components/layout'
import Markdown from '@components/Markdown/Markdown'

import type { FreshFindsContent } from './types'

import styles from './styles.module.css'

type FaqsProps = {
  faqs: NonNullable<FreshFindsContent['faqs']>
}

const subscribeToHash = (onStoreChange: () => void) => {
  window.addEventListener('hashchange', onStoreChange)
  window.addEventListener('popstate', onStoreChange)

  return () => {
    window.removeEventListener('hashchange', onStoreChange)
    window.removeEventListener('popstate', onStoreChange)
  }
}

const getHashSnapshot = () => window.location.hash.replace(/^#/, '')

const getServerHashSnapshot = () => ''

/**
 * Controlled accordion with an "Expand all / Collapse all" toggle.
 */
const Faqs = ({ faqs }: FaqsProps) => {
  const hashId = useSyncExternalStore(subscribeToHash, getHashSnapshot, getServerHashSnapshot)
  const [userOpenIds, setUserOpenIds] = useState<string[] | null>(null)

  const hashOpenIds = faqs.items.some((item) => item.id === hashId) ? [hashId] : []
  const openIds = userOpenIds ?? hashOpenIds
  const allOpen = faqs.items.length > 0 && openIds.length === faqs.items.length

  const toggle = (id: string) => {
    setUserOpenIds(
      openIds.includes(id) ? openIds.filter((openId) => openId !== id) : [...openIds, id],
    )
  }

  const toggleAll = () => {
    setUserOpenIds(allOpen ? [] : faqs.items.map((item) => item.id))
  }

  return (
    <Section className={styles.anchor} id="faqs">
      <div className={styles.faqHeader}>
        <h3>{faqs.title}</h3>
        <button className={styles.expandAll} onClick={toggleAll} type="button">
          {allOpen ? faqs.collapseLabel : faqs.expandLabel}
        </button>
      </div>
      <div>
        {faqs.items.map((item) => (
          <Collapsed
            // keep answers in the server HTML while collapsed, as the old page did
            forceRender
            id={item.id}
            key={item.id}
            onChange={() => toggle(item.id)}
            open={openIds.includes(item.id)}
            title={item.question}
          >
            <Markdown className={styles.faqAnswer}>{item.answer}</Markdown>
          </Collapsed>
        ))}
      </div>
    </Section>
  )
}

export default Faqs
