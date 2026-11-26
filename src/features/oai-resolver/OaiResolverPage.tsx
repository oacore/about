'use client'

import { Layout, Section } from '@core/core-ui'
import { Col, Row, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

import StepFlow from '@components/StepFlow'
import { OAI_RESOLVER_LOGO } from '@features/oai-resolver/constants'
import type { OaiResolverPageData } from '@features/oai-resolver/types'

import OaiResolverForm from './OaiResolverForm'

import styles from './oai-resolver.module.css'

const { Title, Paragraph } = Typography

type OaiResolverPageProps = {
  data: OaiResolverPageData
}

const OaiResolverPage = ({ data }: OaiResolverPageProps) => {
  const blocks = data.sections?.blocks ?? []

  return (
    <Layout>
      <Section className={styles.resolveSection} id="set-oai-resolve">
        <Row align="middle" gutter={[32, 32]}>
          <Col lg={14} md={24} xs={24}>
            <div className={styles.formBlock}>
              <Image
                alt="OAI resolver logo"
                className={styles.logo}
                height={82}
                priority
                src={data.resolve?.logo ?? OAI_RESOLVER_LOGO}
                unoptimized
                width={191}
              />

              <div className={styles.oaiResolveForm}>
                {data.resolve?.title ? (
                  <Title className={styles.formTitle} level={1}>
                    {data.resolve.title}
                  </Title>
                ) : null}
                <OaiResolverForm />
              </div>
            </div>
          </Col>

          {data.resolve?.picture ? (
            <Col className={styles.imageCol} lg={10} md={24} xs={24}>
              <Image
                alt={data.resolve.title ?? 'OAI resolver illustration'}
                className={styles.heroImage}
                height={466}
                priority
                src={data.resolve.picture}
                width={466}
              />
            </Col>
          ) : null}
        </Row>
      </Section>

      {blocks.length ? (
        <Section className={styles.sections} id="sections">
          <StepFlow
            steps={blocks.map((block) => ({
              key: block.id ?? block.description,
              description: block.description,
            }))}
          />
        </Section>
      ) : null}

      <Section id="oai-doc">
        <Paragraph className={styles.documentation}>
          To find out more see{' '}
          <Link href="https://core.ac.uk/documentation/oai-resolver" rel="noopener noreferrer" target="_blank">
            documentation.
          </Link>
        </Paragraph>
      </Section>
    </Layout>
  )
}

export default OaiResolverPage
