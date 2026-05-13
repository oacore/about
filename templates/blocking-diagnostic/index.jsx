import React, { useState } from 'react'
import { ProgressSpinner } from '@oacore/design/lib/elements'

import DiagnosticHeader from './components/diagnostic-header'
import DiagnosticResults from './components/diagnostic-results'
import DiagnosticRepositoryForm from './components/diagnostic-repository-form'
import mapHealthCheckPayload from './map-health-check'
import styles from './styles.module.scss'

import { postDataProviderHealthCheck } from 'api/services'
import { useInput } from 'hooks'
import { Layout, Section } from 'design-v2/components'

const BlockingDiagnosticPageTemplate = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [result, setResult] = useState(null)

  const {
    value: repositoryUrl,
    element: repositoryUrlFieldId,
    bind: bindRepositoryUrl,
  } = useInput('', data.form.repositoryUrl.inputId)

  const handleSubmit = async (event) => {
    event.preventDefault()
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
      const { data: payload } = await postDataProviderHealthCheck({
        base_url: trimmed,
      })
      setResult(payload)
    } catch (error) {
      const message =
        error?.data?.message ??
        error?.data?.error ??
        error?.message ??
        data.errors.generic
      setErrorMessage(
        typeof message === 'string' ? message : data.errors.generic
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout className={styles.blockingLayout}>
      <Section className={styles.section} caption={data.section.caption}>
        <DiagnosticHeader {...data.header} />
        <DiagnosticRepositoryForm
          formId={data.form.id}
          onSubmit={handleSubmit}
          repositoryUrl={repositoryUrl}
          repositoryUrlFieldId={repositoryUrlFieldId}
          bindRepositoryUrl={bindRepositoryUrl}
          repositoryUrlLabel={data.form.repositoryUrl.label}
          repositoryUrlPlaceholder={data.form.repositoryUrl.placeholder}
          submitLabel={
            isSubmitting ? data.form.submittingLabel : data.form.submitLabel
          }
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
        />
        {isSubmitting ? (
          <div className={styles.resultsBody} role="status" aria-live="polite">
            <div className={styles.spinWrapper}>
              <ProgressSpinner className={styles.spinner} />
              <div className={styles.spinText}>
                <p>Running diagnostic checks...</p>
                <span>This may take approximately 10 seconds.</span>
              </div>
            </div>
          </div>
        ) : null}
        {result != null && (
          <output className={styles.result} aria-live="polite">
            <DiagnosticResults
              resultsConfig={data.results}
              checks={data.checks}
              checksConfig={data.checks.item ?? data.checks}
              states={mapHealthCheckPayload(result)}
            />
          </output>
        )}
      </Section>
    </Layout>
  )
}

export default BlockingDiagnosticPageTemplate
