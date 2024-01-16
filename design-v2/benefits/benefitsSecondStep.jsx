import React from 'react'
import { Button, Modal } from '@oacore/design/lib'

import styles from './styles.module.scss'
import { Markdown } from '../../components'

import benefitsData from 'data/benefits.yml'

const BenefitsStep = ({
  subTitle,
  description,
  setModalContent,
  setFormSubmitted,
  onCloseModal,
}) => {
  const test = () => {
    setModalContent(false)
    setFormSubmitted(false)
    onCloseModal()
  }

  return (
    <Modal
      aria-label="Registration-form-modal"
      hideManually
      className={styles.modalStepForm}
    >
      <h5 className={styles.stepHeader}>{subTitle}</h5>
      <div className={styles.stepImage}>
        <img
          src={benefitsData.secondStep.picture}
          alt={benefitsData.secondStep.title}
          className={styles.image}
        />
      </div>
      <Markdown className={styles.stepDescription}>{description}</Markdown>
      <div className={styles.stepButton}>
        <Button onClick={test} color="primary" outline>
          close
        </Button>
      </div>
    </Modal>
  )
}

export default BenefitsStep
