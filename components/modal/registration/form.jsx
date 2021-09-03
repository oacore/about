import React from 'react'
import { Modal, Form, TextField, Button } from '@oacore/design/lib'

import styles from './styles.module.scss'
import ProfileSelect from './profile-select'
import useInput from '../hooks/use-input'
import CountrySelect from './country-select'
import useSelect from '../hooks/use-select'
import Markdown from '../../markdown'
import findText from './helpers/findText'

import { useStore, observe } from 'store'

const ModalForm = observe(() => {
  const { value: firstName, bind: bindFirstName } = useInput('')
  const { value: lastName, bind: bindLastName } = useInput('')
  const { value: organisationName, bind: bindOrganisationName } = useInput('')

  const { value: country, onChange: countryOnChange } = useSelect()

  const { registration } = useStore()

  const onCloseModal = () => {
    registration.reset()
  }

  const onHandleSubmit = (evt) => {
    evt.preventDefault()
    if (firstName && lastName && country)
      registration.setData({ firstName, lastName, country: country.id })

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
            id="first_name"
            label="First name"
            placeholder="e.g. John"
            className={styles.inputGroupItem}
            {...bindFirstName}
            required
          />
          <TextField
            id="last_name"
            label="Last name"
            placeholder="e.g.Doe"
            className={styles.inputGroupItem}
            {...bindLastName}
            required
          />
        </div>
        {registration.data.accountType !== 'personal' && (
          <TextField
            id="organization_name"
            label={
              registration.data.accountType === 'enterprise'
                ? 'Organization name'
                : 'Institution name'
            }
            placeholder="Full name of your institute, e.g ‘The Open University’"
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
