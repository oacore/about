'use client'

import { Button, Card, Form, Input } from 'antd'
import { useCallback } from 'react'

import type { DiagnosticErrors, DiagnosticForm } from '../types'

import styles from '../styles.module.css'

type FormValues = {
  repositoryUrl: string
}

type DiagnosticRepositoryFormProps = {
  form: DiagnosticForm
  errors: DiagnosticErrors
  isSubmitting: boolean
  errorMessage: string | null
  onSubmit: (repositoryUrl: string) => Promise<void>
}

const DiagnosticRepositoryForm = ({
  form,
  errors,
  isSubmitting,
  errorMessage,
  onSubmit,
}: DiagnosticRepositoryFormProps) => {
  const [antForm] = Form.useForm<FormValues>()

  const handleFinish = useCallback(
    (values: FormValues) => {
      void onSubmit(values.repositoryUrl)
    },
    [onSubmit],
  )

  return (
    <Card className={styles.card} variant="outlined">
      <Form
        aria-busy={isSubmitting || undefined}
        className={styles.cardForm}
        disabled={isSubmitting}
        form={antForm}
        id={form.id}
        layout="vertical"
        onFinish={handleFinish}
      >
        <div className={styles.formRow}>
          <Form.Item
            className={styles.urlField}
            label={form.repositoryUrl.label}
            name="repositoryUrl"
            rules={[{ required: true, whitespace: true, message: errors.requiredUrl }]}
          >
            <Input
              aria-label={form.repositoryUrl.label}
              id={form.repositoryUrl.inputId}
              placeholder={form.repositoryUrl.placeholder}
              size="large"
            />
          </Form.Item>
          <Button
            aria-label={isSubmitting ? form.submittingLabel : form.submitLabel}
            className={styles.submit}
            htmlType="submit"
            loading={isSubmitting}
            size="large"
            type="primary"
          >
            {isSubmitting ? form.submittingLabel : form.submitLabel}
          </Button>
        </div>
        {errorMessage ? (
          <p className={styles.errorMessage} role="alert">
            {errorMessage}
          </p>
        ) : null}
      </Form>
    </Card>
  )
}

export default DiagnosticRepositoryForm
