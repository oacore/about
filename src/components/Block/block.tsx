'use client'

import { Section } from '@core/core-ui'
import { Col, Row } from 'antd'
import classNames from 'classnames'
import type { ReactNode } from 'react'

import styles from './Block.module.css'

export type BlockProps = {
  column1: ReactNode
  column2?: ReactNode
  isAlternate?: boolean
}

const Block = ({ column1, column2, isAlternate = false }: BlockProps) => (
  <Section className={classNames(styles.block, isAlternate && styles.alternate)}>
    <Row gutter={[32, 24]}>
      <Col md={12} xs={24}>
        {column1}
      </Col>
      <Col md={12} xs={24}>
        {column2}
      </Col>
    </Row>
  </Section>
)

export default Block
