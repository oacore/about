'use client'

import { Col, Row } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

import Markdown from '@components/Markdown/Markdown'

import styles from './StepFlow.module.css'

export type StepFlowItem = {
  key: string
  /** Markdown (inline HTML allowed, e.g. `<b>` / `<a>` in the OAI resolver content). */
  description: string
  title?: string
  /** Small icon shown before the title. */
  icon?: string
}

export type StepFlowProps = {
  steps: StepFlowItem[]
  className?: string
}

const StepFlow = ({ steps, className }: StepFlowProps) => {
  if (!steps.length) {
    return null
  }

  return (
    <Row align="stretch" className={classNames(styles.flow, className)} gutter={[32, 32]}>
      {steps.map((step) => (
        <Col className={styles.col} key={step.key} lg={6} md={12} xs={24}>
          <div className={styles.step}>
            {step.title || step.icon ? (
              <div className={styles.heading}>
                {step.icon ? <Image alt="" height={28} src={step.icon} unoptimized width={28} /> : null}
                {step.title ? <span>{step.title}</span> : null}
              </div>
            ) : null}
            <Markdown className={styles.description}>{step.description}</Markdown>
            <span aria-hidden className={styles.arrow} />
          </div>
        </Col>
      ))}
    </Row>
  )
}

export default StepFlow
