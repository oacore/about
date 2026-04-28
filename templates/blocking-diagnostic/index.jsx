import React, { useState } from 'react'

import DiagnosticHeader from './components/diagnostic-header'
import DiagnosticRepositoryForm from './components/diagnostic-repository-form'
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
    <Layout>
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
        {result != null && (
          <output className={styles.result} aria-live="polite">
            <pre className={styles.resultPre}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </output>
        )}
      </Section>
    </Layout>
  )
}

export default BlockingDiagnosticPageTemplate
