'use client'

import { Button, Checkbox, Form, Input } from 'antd'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import floating from '@components/FloatingField/FloatingField.module.css'
import Markdown from '@components/Markdown/Markdown'
import { getSectionText } from '@features/registration/content'
import { useRegistrationStore } from '@stores/registration'

import CountrySelect from './country-select'
import OrganisationInput from './institution-select'
import ModalShell, { MODAL_WIDTH } from '@components/ModalShell'
import ProfileSelect from './profile-select'
import { useRegistrationAssets } from './registration-assets'
import styles from './styles.module.css'
import useOrganisationDomains from '../hooks/use-organisation-domains'
import useUniversityDomains from '../hooks/use-university-domains'
import { validateInstitutionEmail } from './helpers/validateInstitutionEmail'

const { TextArea } = Input

type RegistrationFormValues = {
  firstName: string
  lastName: string
  email: string
  organisation?: string
  country: string
  libraryEmail?: string
  description: string
}

const ModalForm = () => {
  const pathname = usePathname()
  const { copy, countries } = useRegistrationAssets()
  const [form] = Form.useForm<RegistrationFormValues>()
  const { data, setData, setIsModalFormActive, setIsModalConditionsActive, reset } = useRegistrationStore()
  const { accountType, email, productType } = data
  const [conditionsAccepted, setConditionsAccepted] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const description = Form.useWatch('description', form) ?? ''
  const organisationName = Form.useWatch('organisation', form) ?? ''
  const regEmail = Form.useWatch('email', form) ?? email
  const firstName = Form.useWatch('firstName', form) ?? ''
  const lastName = Form.useWatch('lastName', form) ?? ''
  const country = Form.useWatch('country', form)
  const isInstitution = accountType === 'institution'
  const isApi = pathname.includes('api')
  const isDataset = pathname.includes('dataset')
  const organisationDomains = useOrganisationDomains(organisationName, isInstitution)
  const universityDomains = useUniversityDomains(isInstitution)
  const institutionEmailError =
    isInstitution && regEmail
      ? validateInstitutionEmail(regEmail, organisationDomains, universityDomains)
      : ''
  const isUniversityDomainsLoading = isInstitution && universityDomains === null
  const selectedOption = accountType === 'enterprise' ? 'all' : 'few'
  const descriptionLength = description.trim().length
  const hasRequiredFields = Boolean(
    firstName.trim() &&
      lastName.trim() &&
      regEmail.trim() &&
      country &&
      (accountType === 'personal' || organisationName.trim()),
  )
  const isContinueDisabled =
    !hasRequiredFields ||
    descriptionLength < 150 ||
    (accountType === 'personal' && (!conditionsAccepted || !termsAccepted)) ||
    (isInstitution && (Boolean(institutionEmailError) || isUniversityDomainsLoading))

  const handleClose = () => {
    reset()
  }

  const handleConditionsChange = (checked: boolean) => {
    setConditionsAccepted(checked)
  }

  const handleTermsChange = (checked: boolean) => {
    setTermsAccepted(checked)
  }

  const handleSubmit = (values: RegistrationFormValues) => {
    if (values.description.trim().length < 150) {
      return
    }

    if (isInstitution && (institutionEmailError || isUniversityDomainsLoading)) {
      return
    }

    if (accountType === 'personal' && (!conditionsAccepted || !termsAccepted)) {
      return
    }

    setData({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      country: values.country,
      paidAccess: selectedOption === 'all',
      organisation: values.organisation ?? '',
      libraryEmail: values.libraryEmail ?? '',
      description: values.description,
      ...(accountType === 'personal'
        ? {
            dateRequest: new Date().toISOString(),
            termsId: copy.personalConditions.version,
            agreedToNewTerms: true,
          }
        : {}),
    })
    setIsModalFormActive(false)
    setIsModalConditionsActive(true)
  }

  return (
    <ModalShell
      ariaLabel="Registration-form-modal"
      onCancel={handleClose}
      title="Tell us about yourself"
      width={MODAL_WIDTH.form}
    >
      <div className={styles.modalForm}>
        <ProfileSelect />
        {isApi ? (
          <div className={styles.rateWrapper}>
            <Markdown>{getSectionText(copy, productType, accountType, 'rate')}</Markdown>
            <Markdown>{getSectionText(copy, productType, accountType, 'rate2')}</Markdown>
          </div>
        ) : null}
        <div className={styles.modalFormText}>
          <Markdown>{getSectionText(copy, productType, accountType, 'text')}</Markdown>
        </div>
        <div className={styles.modalFormTextBordered}>
          <Markdown>{getSectionText(copy, productType, accountType, 'box')}</Markdown>
        </div>
        {isInstitution ? (
          <div className={styles.typeMainWrapper}>
            <div className={styles.typeWrapper}>
              <div className={styles.titleWrapper}>
                <span className={styles.title}>{copy.membershipType.title}</span>
              </div>
              <Markdown className={styles.typeText}>
                {isApi ? copy.membershipType.typeText : copy.membershipType.typeTextChecked}
              </Markdown>
            </div>
          </div>
        ) : null}
        <Form
          form={form}
          initialValues={{ email }}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          {isDataset ? (
            <div className={styles.radioItemsWrapper}>
              <h6 className={styles.radioItemsTitle}>Included datasets</h6>
              {accountType === 'personal' ? (
                <div className={styles.none}>{copy.options.none}</div>
              ) : (
                <Markdown className={styles.radioDescription}>{copy.options.all.description}</Markdown>
              )}
            </div>
          ) : null}
          {accountType === 'personal' ? (
            <div className={styles.checkboxWrapper} id={copy.personalConditions.version}>
              <Checkbox
                aria-label="Accept personal conditions"
                checked={conditionsAccepted}
                onChange={(event) => handleConditionsChange(event.target.checked)}
              >
                <Markdown>{copy.personalConditions.title}</Markdown>
              </Checkbox>
              <Checkbox
                aria-label="Accept personal terms"
                checked={termsAccepted}
                onChange={(event) => handleTermsChange(event.target.checked)}
              >
                <Markdown>{copy.personalTerms.title}</Markdown>
              </Checkbox>
            </div>
          ) : null}
          <div className={styles.inputGroup}>
            <Form.Item
              className={`${styles.inputGroupItem} ${floating.outlined}`}
              label="First name"
              name="firstName"
              rules={[{ required: true, whitespace: true, message: 'First name is required' }]}
            >
              <Input placeholder="e.g. John" />
            </Form.Item>
            <Form.Item
              className={`${styles.inputGroupItem} ${floating.outlined}`}
              label="Last name"
              name="lastName"
              rules={[{ required: true, whitespace: true, message: 'Last name is required' }]}
            >
              <Input placeholder="e.g. Doe" />
            </Form.Item>
          </div>
          <Form.Item
            className={floating.outlined}
            help={isInstitution && institutionEmailError ? institutionEmailError : undefined}
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Enter a valid email address' },
            ]}
            validateStatus={isInstitution && institutionEmailError ? 'error' : undefined}
          >
            <Input placeholder="john.doe@mail.com" type="email" />
          </Form.Item>
          {accountType === 'enterprise' ? (
            <div className={styles.institutionSubtitle}>
              The supplied email address must correspond to the organization that you select.
            </div>
          ) : null}
          {accountType !== 'personal' ? (
            <>
              <Form.Item
                className={floating.outlined}
                label={accountType === 'enterprise' ? 'Organization name' : 'Institution name'}
                name="organisation"
                rules={[{ required: true, whitespace: true, message: 'Organisation is required' }]}
              >
                <OrganisationInput />
              </Form.Item>
              <p className={styles.subLabel}>
                The supplied email address must correspond to the institution that you select to
                comply with our Terms of Use. Otherwise, your API key may be disabled.
              </p>
            </>
          ) : null}
          <Form.Item
            className={floating.outlined}
            label="Country"
            name="country"
            rules={[{ required: true, message: 'Country is required' }]}
          >
            <CountrySelect countries={countries} />
          </Form.Item>
          {isInstitution ? (
            <Form.Item
              className={floating.outlined}
              label="Could you please provide us with the email for your library contact?"
              name="libraryEmail"
              rules={[{ type: 'email', message: 'Enter a valid email address' }]}
            >
              <Input placeholder="john.doe@mail.com" type="email" />
            </Form.Item>
          ) : null}
          <Form.Item
            className={floating.outlined}
            label="Describe the use case in which you would like to use CORE data"
            name="description"
            rules={[
              { required: true, message: 'Use case is required' },
              {
                validator: (_, value: string) => {
                  if (typeof value === 'string' && value.trim().length >= 150) {
                    return Promise.resolve()
                  }

                  return Promise.reject(
                    new Error(
                      `Please provide at least 150 symbols. Current symbol count: ${String(value ?? '').trim().length}`,
                    ),
                  )
                },
              },
            ]}
          >
            <TextArea placeholder="Text..." rows={4} />
          </Form.Item>
          <span className={styles.wordCount}>Min 150 symbols.</span>
          <div className={styles.buttonGroup}>
            <Button onClick={handleClose} type="text">
              cancel
            </Button>
            <Button disabled={isContinueDisabled} htmlType="submit" type="primary">
              continue
            </Button>
          </div>
        </Form>
      </div>
    </ModalShell>
  )
}

export default ModalForm
