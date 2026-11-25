'use client'

import { Collapse } from 'antd'
import { useState, useSyncExternalStore } from 'react'

import styles from './Collapsed.module.css'

export type CollapsedProps = {
  id: string
  title: string
  children: React.ReactNode
  onChange?: (keys: string | string[]) => void
  defaultOpen?: boolean
  /** Controls the open state from the parent (e.g. an "Expand all" button); `onChange` reports toggles */
  open?: boolean
  /** Render the content while collapsed, so it is in the server HTML */
  forceRender?: boolean
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

const Collapsed = ({
  id,
  title,
  children,
  onChange,
  defaultOpen = false,
  open,
  forceRender,
}: CollapsedProps) => {
  const hashId = useSyncExternalStore(subscribeToHash, getHashSnapshot, getServerHashSnapshot)
  const [activeKeys, setActiveKeys] = useState<string[] | undefined>(undefined)

  const resolvedKeys =
    open !== undefined
      ? open
        ? [id]
        : []
      : (activeKeys ?? (defaultOpen || hashId === id ? [id] : []))

  const handleChange = (keys: string | string[]) => {
    const nextKeys = (Array.isArray(keys) ? keys : [keys]).filter(Boolean)
    setActiveKeys(nextKeys)
    onChange?.(keys)
  }

  return (
    <div className={styles.accordionItem} id={id}>
      <Collapse
        activeKey={resolvedKeys}
        bordered={false}
        className={styles.accordion}
        expandIcon={() => null}
        ghost
        items={[
          {
            key: id,
            label: (
              <span className={styles.accordionTitle}>
                <span className={styles.accordionLink}>{title}</span>
              </span>
            ),
            children,
            forceRender,
          },
        ]}
        onChange={handleChange}
      />
    </div>
  )
}

export default Collapsed
