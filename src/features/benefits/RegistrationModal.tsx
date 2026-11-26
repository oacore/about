'use client'

import { MODAL_WIDTH, ModalShell } from '@core/core-ui'
import { Button, Form, Input } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

import floating from '@components/FloatingField/FloatingField.module.css'
import Markdown from '@components/Markdown/Markdown'
import type { BenefitsSecondStep } from '@features/benefits/types'
import {
  buildExistsDescription,
  classifyFailure,
  classifySuccess,
  type RegistrationOutcome,
} from '@features/benefits/registration'
import { prepareBenefitsMarkdown } from '@features/benefits/utils'
import { addDataProvider } from '@services/dataProviders'

import styles from './styles.module.css'

type RegistrationValues = {
  uri: string
  email: string
}

type RegistrationModalProps = {
  open: boolean
  subOai?: string
  secondStep?: BenefitsSecondStep
  onClose: () => void
}

const CREATED_TITLE = 'Thank you for registering a new data provider'
const EXISTS_TITLE = 'This data provider already exists'
const ISSUE_TITLE = 'OAI is not found'

const RegistrationModal = ({ open, subOai, secondStep, onClose }: RegistrationModalProps) => {
  const [antForm] = Form.useForm<RegistrationValues>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [outcome, setOutcome] = useState<RegistrationOutcome | null>(null)

  const handleCloseForm = () => {
    if (isSubmitting) {
      return
    }

    onClose()
  }

  const handleCloseResult = () => {
    setOutcome(null)
    onClose()
  }

  const handleFinish = async (values: RegistrationValues) => {
    setIsSubmitting(true)

    try {
      const payload = await addDataProvider({
        uri: values.uri.trim(),
        email: values.email.trim(),
      })
      setOutcome(classifySuccess(payload))
    } catch (error) {
      setOutcome(classifyFailure(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const created = secondStep?.newMember
  const existsTitle = secondStep?.member?.subTitle ?? EXISTS_TITLE
  const issue = secondStep?.issue

  const resultTitle =
    outcome?.kind === 'created'
      ? created?.subTitle ?? CREATED_TITLE
      : outcome?.kind === 'exists'
        ? existsTitle
        : issue?.subTitle ?? ISSUE_TITLE

  const resultDescription =
    outcome?.kind === 'created'
      ? prepareBenefitsMarkdown(created?.description)
      : outcome?.kind === 'exists'
        ? buildExistsDescription(outcome.providerId)
        : prepareBenefitsMarkdown(issue?.description)

  const resultPicture = outcome?.kind === 'created' ? created?.picture : undefined

  return (
    <>
      <ModalShell
        ariaLabel="Registration form"
        onCancel={handleCloseForm}
        open={open && outcome == null}
        title={secondStep?.title ?? 'New data provider registration'}
        width={MODAL_WIDTH.form}
      >
        <Form
          form={antForm}
          layout="vertical"
          onFinish={handleFinish}
          preserve={false}
          requiredMark={false}
        >
          <Form.Item
            className={classNames(floating.outlined, styles.registrationField)}
            label="OAI base URL"
            name="uri"
            rules={[
              { required: true, whitespace: true, message: 'Enter an OAI base URL' },
              {
                type: 'url',
                message: 'Enter a valid URL, including http:// or https://',
              },
            ]}
          >
            <Input
              autoComplete="url"
              placeholder="For example, http://example.com/cgi/oai2"
              type="url"
            />
          </Form.Item>
          {subOai ? <p className={styles.registrationHint}>{subOai}</p> : null}
          <Form.Item
            className={classNames(floating.outlined, styles.registrationField)}
            label="Email"
            name="email"
            rules={[
              { required: true, whitespace: true, message: 'Enter an email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input autoComplete="email" placeholder="e.g. john.doe@ac.uk" type="email" />
          </Form.Item>
          <div className={styles.registrationButtons}>
            <Button disabled={isSubmitting} onClick={handleCloseForm} type="text">
              cancel
            </Button>
            <Button htmlType="submit" loading={isSubmitting} type="primary">
              submit
            </Button>
          </div>
        </Form>
      </ModalShell>

      <ModalShell
        ariaLabel="Registration result"
        onCancel={handleCloseResult}
        open={outcome != null}
        title={resultTitle}
        titleClassName={styles.resultTitle}
        width={MODAL_WIDTH.result}
      >
        {resultPicture ? (
          <div className={styles.resultImage}>
            <Image
              alt=""
              className={styles.resultPicture}
              height={215}
              src={resultPicture}
              unoptimized
              width={270}
            />
          </div>
        ) : null}
        {resultDescription ? (
          <Markdown className={styles.resultDescription}>{resultDescription}</Markdown>
        ) : null}
        <div className={styles.resultButtons}>
          <Button color="primary" onClick={handleCloseResult} variant="outlined">
            close
          </Button>
        </div>
      </ModalShell>
    </>
  )
}

export default RegistrationModal
