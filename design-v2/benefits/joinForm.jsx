import React from 'react'
import { Modal, Button } from '@oacore/design/lib'
import { Input } from 'reactstrap'

import styles from './styles.module.scss'

import benefitsData from 'data/benefits.yml'

const JoinForm = ({ visibleModal, closeModal, setGratitudeModal }) => {
  const handleSubmit = () => {
    setGratitudeModal(true)
    closeModal()
  }

  return (
    visibleModal && (
      <>
        <Modal className={styles.joinModal} hideManually>
          <h6>{benefitsData.joinModal.title}</h6>
          <Input
            placeholder="OAI base URL"
            className={styles.joinInput}
            type="input"
          />
          <span className={styles.joinMessage}>
            {benefitsData.joinModal.oaiMessage}
          </span>
          <Input
            placeholder="Institution running repository or journal"
            className={styles.joinInput}
            type="input"
          />
          <Input
            placeholder="Your name"
            className={styles.joinInput}
            type="input"
          />
          <Input
            placeholder="Institutional email"
            className={styles.joinInput}
            type="input"
          />
          <Input type="select" name="url" className={styles.joinInput}>
            <option>
              I work for this institution and I am requesting inclusion in CORE
            </option>
            <option>I am suggesting this data provider for inclusion.</option>
          </Input>
          <footer className={styles.buttonGroup}>
            <Button variant="text" onClick={closeModal}>
              CANCEL
            </Button>
            <Button variant="contained" onClick={() => handleSubmit()}>
              SUBMIT
            </Button>
          </footer>
        </Modal>
      </>
    )
  )
}

export default JoinForm
