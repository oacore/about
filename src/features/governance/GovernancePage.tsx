'use client'

import { Button } from 'antd'
import Image from 'next/image'
import { Fragment } from 'react'

import Header from '@components/Header/Header'
import Markdown from '@components/Markdown/Markdown'
import { Layout, Section } from '@components/layout'
import type { GovernancePageData } from '@features/governance/types'

import styles from './styles.module.css'

type GovernancePageProps = {
  data: GovernancePageData
}

const GovernancePage = ({ data }: GovernancePageProps) => {
  const header = data.header?.header
  const connections = data.connections?.connections ?? []
  const connectionsImage = data.connections?.connectionsImage
  const features = data.services?.features ?? []

  return (
    <Layout>
      {header ? (
        <Header
          borderBottom
          description={header.description}
          id={header.id}
          image={header.image}
          logoAlt={header.title}
          title={header.title}
        />
      ) : null}

      <Section className={styles.header}>
        {connectionsImage ? (
          <div className={styles.logoWrap}>
            <Image
              alt="Governance structure diagram"
              className={styles.logo}
              height={600}
              src={connectionsImage}
              width={800}
            />
          </div>
        ) : null}
        <div className={styles.content}>
          {connections.map((item) => (
            <Fragment key={item.title}>
              {item.title ? <h5 className={styles.governanceType}>{item.title}</h5> : null}
              {item.description ? <Markdown>{item.description}</Markdown> : null}
            </Fragment>
          ))}
        </div>
      </Section>

      {features.length ? (
        <Section className={styles.group}>
          {features.map((action) =>
            action.title && action.url ? (
              <Button
                type={'primary'}
                key={action.title}
                className={styles.boardButton}
                href={action.url}
              >
                {action.title}
              </Button>
            ) : null,
          )}
        </Section>
      ) : null}
    </Layout>
  )
}

export default GovernancePage
