import React from 'react'
import { Modal, Button } from '@oacore/design/lib'

import styles from './styles.module.scss'

const ModalConditions = ({
  repositoryName,
  onSubmitConditions,
  onCloseConditions,
}) => (
  <Modal hideManually aria-label="conditions-modal">
    <h6>Sending request</h6>
    <main>
      <p>
        We are now going to send an email to the repository manager of{' '}
        {repositoryName}. They will receive your personal information including
        including name and email to decide whether to approve your request.
      </p>
      <p>Do you wish to proceed?</p>
    </main>
    <footer className={styles.footer}>
      <Button variant="contained" onClick={onSubmitConditions}>
        Yes
      </Button>
      <Button variant="text" onClick={onCloseConditions}>
        No
      </Button>
    </footer>
  </Modal>
)

export default ModalConditions
