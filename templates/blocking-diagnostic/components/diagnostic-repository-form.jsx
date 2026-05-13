import React from 'react'
import { Card, Form, TextField } from '@oacore/design/lib'
import { Button } from '@oacore/design/lib/elements'

import styles from '../styles.module.scss'

const DiagnosticRepositoryForm = ({
  formId,
  repositoryUrl,
  repositoryUrlFieldId,
  bindRepositoryUrl,
  onSubmit,
  repositoryUrlLabel,
  repositoryUrlPlaceholder,
  submitLabel,
  isSubmitting,
  errorMessage,
}) => (
  <Card variant="outlined" className={styles.card}>
    <Form
      className={styles.cardForm}
      id={formId}
      onSubmit={onSubmit}
      aria-busy={isSubmitting || undefined}
    >
      <div className={styles.formRow}>
        <TextField
          id={repositoryUrlFieldId}
          name={repositoryUrlFieldId}
          value={repositoryUrl}
          label={repositoryUrlLabel}
          placeholder={repositoryUrlPlaceholder}
          type="url"
          className={styles.textfield}
          disabled={isSubmitting}
          required
          {...bindRepositoryUrl}
        />
        <Button
          type="submit"
          variant="contained"
          className={styles.submit}
          disabled={isSubmitting}
        >
          {submitLabel}
        </Button>
      </div>
      {errorMessage ? (
        <p className={styles.errorMessage} role="alert">
          We are experiencing some issues. Please try again later
        </p>
      ) : null}
    </Form>
  </Card>
)

export default DiagnosticRepositoryForm
