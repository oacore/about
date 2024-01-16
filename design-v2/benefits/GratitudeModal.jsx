import React from 'react'
import { Modal, Button } from '@oacore/design/lib'

import styles from './styles.module.scss'
import benefitsData from '../../data/benefits.yml'
import { Markdown } from '../../components'

const GratitudeModal = ({ showGratitudeModal, setGratitudeModal }) =>
  showGratitudeModal && (
    <Modal hideManually className={styles.gratitudeModal}>
      <h6>Thank you for registering a new data provider</h6>
      <div className={styles.bodyWrapper}>
        <div className={styles.imgBlock}>
          <img
            src={benefitsData.join.picture}
            alt={benefitsData.join.title}
            className={styles.image}
          />
        </div>
        <Markdown>{benefitsData.joinModal.description}</Markdown>
      </div>
      <footer className={styles.buttonGroup}>
        <Button variant="text" onClick={() => setGratitudeModal(false)}>
          CLOSE
        </Button>
      </footer>
    </Modal>
  )

export default GratitudeModal
