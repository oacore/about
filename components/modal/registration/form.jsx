import React from 'react'
import { Modal, Form, TextField, Button } from '@oacore/design/lib'

import styles from './styles.module.scss'
import ProfileSelect from './profile-select'
import CountrySelect from './country-select'
import useSelect from '../hooks/use-select'
import useInput from '../hooks/use-input'
import Markdown from '../../markdown'
import findText from './helpers/findText'

const ModalForm = () => {
  const { bind: bindFirstName, element: elemFirstName } = useInput('firstName')
  const { bind: bindLastName, element: elemLastName } = useInput('lastName')

  const { onChange: countryOnChange } = useSelect('countryName')

  const onCloseModal = () => {}

  const onHandleSubmit = (evt) => {
    evt.preventDefault()
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
}

export default ModalForm
