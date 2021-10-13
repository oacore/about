import React from 'react'
import { Modal, Form, TextField, Button } from '@oacore/design/lib'

import styles from './styles.module.scss'
import ProfileSelect from './profile-select'
import CountrySelect from './country-select'
import useSelect from '../hooks/use-select'
import useInput from '../hooks/use-input'
import Markdown from '../../markdown'
import findText from './helpers/findText'

import { useStore, observe } from 'store'

const ModalForm = observe(() => {
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
    value: organisationName,
    bind: bindOrganisationName,
    element: elemOrganisationName,
  } = useInput('organisationName')
  const { value: countryName, onChange: countryOnChange } =
    useSelect('countryName')

  const { registration } = useStore()

  const onCloseModal = () => {
    registration.reset()
  }

  const onHandleSubmit = (evt) => {
    evt.preventDefault()
    if (firstName && lastName && countryName)
      registration.setData({ firstName, lastName, country: countryName.id })

    if (organisationName)
      registration.setData({ organisation: organisationName })
    registration.setIsModalFormActive(false)
    registration.setIsModalConditionsActive(true)
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
        {registration.data.accountType !== 'personal' && (
          <TextField
            id={elemOrganisationName}
            name={elemOrganisationName}
            label={
              registration.data.accountType === 'enterprise'
                ? 'Organization name'
                : 'Institution name'
            }
            placeholder="Full name of your institution, e.g ‘The Open University’"
            className={styles.modalFormInputOrg}
            {...bindOrganisationName}
            required
          />
        )}

        <CountrySelect onChange={countryOnChange} />

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
