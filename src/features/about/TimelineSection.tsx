'use client'

import { Modal } from 'antd'
import Image from 'next/image'
import { useState } from 'react'

import { Section } from '@components/layout'
import timeline from './assets/timeline.png'

import styles from './styles.module.css'

const TimelineSection = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }

    event.preventDefault()
    setIsOpen(true)
  }

  return (
    <Section className={styles.timelineSection} id="timeline">
      <button
        aria-label="Open CORE 15-year timeline"
        className={styles.timelineButton}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        type="button"
      >
        <Image
          alt="CORE 15-year milestone roadmap"
          className={styles.timelineImg}
          height={1486}
          src={timeline}
          width={4632}
        />
      </button>
      <Modal
        className={styles.timelineModal}
        footer={null}
        onCancel={handleClose}
        open={isOpen}
        title="CORE 15-year milestone roadmap"
        width="95vw"
      >
        <Image
          alt="CORE 15-year milestone roadmap"
          className={styles.timelineModalImg}
          height={1486}
          src={timeline}
          width={4632}
        />
      </Modal>
    </Section>
  )
}

export default TimelineSection
