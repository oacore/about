import React from 'react'
import { Modal, Form, TextField, Button } from '@oacore/design/lib'

import styles from './styles.module.scss'
import ProfileSelect from './profile-select'
import useInput from '../hooks/use-input'
import CountrySelect from './country-select'
import useSelect from '../hooks/use-select'

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

        {(registration.data.accountType === 'enterprise' ||
          registration.data.accountType === 'institution') && (
          <TextField
            id="organization_name"
            label="Organization name"
            placeholder="e.g. CORE"
            className={styles.formInput}
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
