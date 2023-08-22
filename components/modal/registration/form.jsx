import React from 'react'
import { Modal, Form, TextField, Button } from '@oacore/design/lib'

import styles from './styles.module.scss'
import ProfileSelect from './profile-select'
import CountrySelect from './country-select'
import useSelect from '../../../hooks/use-select'
import useInput from '../hooks/use-input'
import Markdown from '../../markdown'
import findText from './helpers/findText'
import text from '../../../data/registration.yml'

import { useStore, observe } from 'store'

const ModalForm = observe((emailFill) => {
  const {
    value: firstName,
    bind: bindFirstName,
    element: elemFirstName,
  } = useInput('firstName')

  const {
    value: lastName,
    bind: bindLastName,
    element: elemLastName,
  } = useInput('lastName')

  const {
    value: description,
    bind: bindDescription,
    element: elemLastDescription,
  } = useInput('description')

  const {
    value: organisationName,
    bind: bindOrganisationName,
    element: elemOrganisationName,
  } = useInput('organisationName')

  const {
    value: libraryEmail,
    element: elemLibraryEmail,
    bind: bindLibraryEmail,
  } = useInput('', 'email')

  const { value: countryName, onChange: countryOnChange } =
    useSelect('countryName')

  const { registration } = useStore()

  const onCloseModal = () => {
    registration.reset()
  }

  const onHandleSubmit = (evt) => {
    evt.preventDefault()

    if (description.trim().split(/\s+/).length > 150) return

    if (organisationName)
      registration.setData({ organisation: organisationName })

    if (libraryEmail) registration.setData({ libraryEmail })

    if (firstName && lastName && countryName.id && description) {
      registration.setData({
        firstName,
        lastName,
        country: countryName.id,
        description,
      })
      registration.setIsModalFormActive(false)
      registration.setIsModalConditionsActive(true)
    }
  }

  return (
    <Modal
      aria-label="Registration-form-modal"
      hideManually
      className={styles.modalForm}
    >
      <h6>Tell us about yourself</h6>
      <ProfileSelect />
      <div className={styles.modalFormText}>
        <Markdown>{findText('text')}</Markdown>
      </div>
      <div className={styles.modalFormTextBordered}>
        <Markdown>{findText('box')}</Markdown>
      </div>
      <Form onSubmit={onHandleSubmit}>
        <div className={styles.inputGroup}>
          <TextField
            id={elemFirstName}
            name={elemFirstName}
            label="First name"
            placeholder="e.g. John"
            className={styles.inputGroupItem}
            required
            {...bindFirstName}
          />
          <TextField
            id={elemLastName}
            name={elemLastName}
            label="Last name"
            placeholder="e.g.Doe"
            className={styles.inputGroupItem}
            required
            {...bindLastName}
          />
        </div>
        <TextField
          id={emailFill}
          name={emailFill}
          label="Email [prefiled email]"
          placeholder="john.doe@mail.com"
          required
          defaultValue={emailFill.emailFill}
        />
        {registration.data.accountType !== 'personal' && (
          <>
            <TextField
              id={elemOrganisationName}
              name={elemOrganisationName}
              label={
                registration.data.accountType === 'non-academic'
                  ? 'Organization name'
                  : 'Institution name'
              }
              placeholder="Full name of your institution, e.g ‘The Open University’"
              className={styles.modalFormInputOrg}
              {...bindOrganisationName}
              required
            />
            <div className={styles.institutionSubtitle}>
              The supplied email address must correspond to the institution that
              you select.{' '}
            </div>
          </>
        )}
        {registration.data.accountType === 'academic' && (
          <div className={styles.typeMainWrapper}>
            <div className={styles.typeWrapper}>
              <div className={styles.titleWrapper}>
                <span className={styles.title}>
                  {text.membershipType.title}
                </span>
              </div>
              <Markdown className={styles.typeText}>
                {text.membershipType.typeText}
              </Markdown>
            </div>
          </div>
        )}
        {registration.data.accountType === 'academic' && (
          <TextField
            id={elemLibraryEmail}
            name={elemLibraryEmail}
            label="Could you please provide us with the email for your library contact?"
            placeholder="john.doe@mail.com"
            required
            defaultValue={emailFill.emailFill}
            {...bindLibraryEmail}
          />
        )}
        <CountrySelect onChange={countryOnChange} />
        <div>
          <TextField
            id={elemLastDescription}
            name={elemLastDescription}
            label="Describe the use case in which you would like to use CORE data"
            placeholder="Text..."
            required
            value={description}
            {...bindDescription}
          />
          {description.trim().split(/\s+/).length > 150 && (
            <div style={{ color: 'red' }}>
              Word count exceeds the limit (150 words)
            </div>
          )}
          <span className={styles.wordCount}>Max 150 words.</span>
        </div>
        <div className={styles.buttonGroup}>
          <Button variant="text" onClick={onCloseModal}>
            cancel
          </Button>
          <Button type="submit" variant="contained">
            continue
          </Button>
        </div>
      </Form>
    </Modal>
  )
})

export default ModalForm
