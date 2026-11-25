'use client'

import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useCallback, useState } from 'react'

import Header from '@components/Header/Header'
import { Layout, Section } from '@components/layout'
import mapHealthCheckPayload from '@features/blocking-diagnostic/mapHealthCheck'
import type {
  BlockingDiagnosticPageData,
  DiagnosticCheckStates,
} from '@features/blocking-diagnostic/types'
import {
  postDataProviderHealthCheck,
  resolveHealthCheckErrorMessage,
} from '@services/healthCheck'

import DiagnosticRepositoryForm from './components/DiagnosticRepositoryForm'
import DiagnosticResults from './components/DiagnosticResults'

import styles from './styles.module.css'

type BlockingDiagnosticPageProps = {
  data: BlockingDiagnosticPageData
}

const BlockingDiagnosticPage = ({ data }: BlockingDiagnosticPageProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [result, setResult] = useState<DiagnosticCheckStates | null>(null)

  const handleSubmit = useCallback(
    async (repositoryUrl: string) => {
      const trimmed = repositoryUrl.trim()

      if (!trimmed) {
        setErrorMessage(data.errors.requiredUrl)
        setResult(null)
        return
      }

      setErrorMessage(null)
      setResult(null)
      setIsSubmitting(true)

      try {
        const payload = await postDataProviderHealthCheck(trimmed)
        setResult(mapHealthCheckPayload(payload))
      } catch (error) {
        setErrorMessage(resolveHealthCheckErrorMessage(error, data.errors.generic))
      } finally {
        setIsSubmitting(false)
      }
    },
    [data.errors.generic, data.errors.requiredUrl],
  )

  return (
    <div className={styles.page}>
      <Layout className={styles.blockingLayout}>
        {data.header ? (
          <Header
            demo={data.header.overline}
            description={data.header.description}
            id="header"
            spacing
            title={data.header.title}
          />
        ) : null}

        <Section className={styles.section} id={data.section?.caption ?? 'blocking-diagnostic'}>
          <DiagnosticRepositoryForm
            errorMessage={errorMessage}
            errors={data.errors}
            form={data.form}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />

          {isSubmitting ? (
            <div aria-live="polite" className={styles.resultsBody} role="status">
              <div className={styles.spinWrapper}>
                <Spin indicator={<LoadingOutlined aria-hidden spin />} size="large" />
                <div className={styles.spinText}>
                  <p>Running diagnostic checks...</p>
                  <span>This may take approximately 10 seconds.</span>
                </div>
              </div>
            </div>
          ) : null}

          {result != null ? (
            <output aria-live="polite" className={styles.result}>
              <DiagnosticResults
                checks={data.checks}
                resultsConfig={data.results}
                states={result}
              />
            </output>
          ) : null}
        </Section>
      </Layout>
    </div>
  )
}

export default BlockingDiagnosticPage
