'use client'

import { Button, Modal } from 'antd'

import styles from './starting.module.css'

type ConditionsModalProps = {
  repoName: string
  open: boolean
  onSubmitConditions: (evt: { preventDefault: () => void }) => void
  onCloseConditions: () => void
}

const ConditionsModal = ({
  repoName,
  open,
  onSubmitConditions,
  onCloseConditions,
}: ConditionsModalProps) => (
  <Modal
    aria-label="Sending request confirmation"
    footer={
      <div className={styles.footer}>
        <Button onClick={onCloseConditions} type="text">
          No
        </Button>
        <Button onClick={onSubmitConditions} type="primary">
          Yes
        </Button>
      </div>
    }
    onCancel={onCloseConditions}
    open={open}
    title="Sending request"
  >
    <p>
      We are now going to send an email to the repository manager of {repoName}. They will receive
      your personal information including name and email to decide whether to approve your request.
    </p>
    <p>Do you wish to proceed?</p>
  </Modal>
)

export default ConditionsModal
