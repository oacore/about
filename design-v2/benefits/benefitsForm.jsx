import React, { useState, useEffect } from 'react'
import { Button, Modal, TextField } from '@oacore/design/lib'

import styles from './styles.module.scss'
import generateFormMessage from '../../templates/data-providers/utils/generate-form-message'
import { useInput } from '../../hooks'
import fetchDataProviderAdd from '../../api/data-providers'
import BenefitsStep from './benefitsSecondStep'

import benefitsData from 'data/benefits.yml'

export async function checkDataProviders({ params }) {
  const { uri, email, setIsDataProviderAddActive, setDataProvidersResponse } =
    params

  try {
    const result = await fetchDataProviderAdd({ uri, email })
    // eslint-disable-next-line no-console
    console.log(`fetchDataProviderAdd
    => ${JSON.stringify(result)}`) // Debug
    setIsDataProviderAddActive(true)
    setDataProvidersResponse(result)
  } catch (errorWithDataProvider) {
    setIsDataProviderAddActive(true)
    setDataProvidersResponse({
      error: errorWithDataProvider,
      existingDataProviders: [],
    })
    return {
      props: {
        error: errorWithDataProvider,
      },
      notFound: true,
    }
  }
  return true
}

const BenefitsForm = React.forwardRef(({ onSubmit, setModalActive }, ref) => {
  const [isIsDataProviderAddActive, setIsDataProviderAddActive] =
    useState(false)
  const [dataProvidersResponse, setDataProvidersResponse] = useState([])
  const [modalContent, setModalContent] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const {
    value: uri,
    element: elemDataProviderUrl,
    bind: bindDataProviderUrl,
  } = useInput('', 'data-provider-url')

  const {
    value: email,
    element: elemEmail,
    bind: bindEmail,
  } = useInput('', 'email')

  const onCloseModal = () => {
    setModalActive(false)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (onSubmit) await onSubmit(event)
  }

  const message = generateFormMessage({ dataProvidersResponse })

  useEffect(() => {
    if (dataProvidersResponse?.error?.status === 500) {
      setFormSubmitted(true)
      setModalContent(
        <BenefitsStep
          subTitle={benefitsData.secondStep.issue.subTitle}
          description={benefitsData.secondStep.issue.description}
          setModalContent={setModalContent}
          setFormSubmitted={setFormSubmitted}
          onCloseModal={onCloseModal}
        />
      )
    } else if (dataProvidersResponse?.error?.status === 409) {
      setFormSubmitted(true)
      setModalContent(
        <BenefitsStep
          subTitle={benefitsData.secondStep.member.subTitle}
          description={benefitsData.secondStep.member.description}
          setModalContent={setModalContent}
          setFormSubmitted={setFormSubmitted}
          onCloseModal={onCloseModal}
        />
      )
    } else if (dataProvidersResponse?.error?.status === 200) {
      setFormSubmitted(true)
      setModalContent(
        <BenefitsStep
          subTitle={benefitsData.secondStep.newMember.subTitle}
          description={benefitsData.secondStep.newMember.description}
          setModalContent={setModalContent}
          setFormSubmitted={setFormSubmitted}
          onCloseModal={onCloseModal}
        />
      )
    }
  }, [dataProvidersResponse?.error?.status])

  return (
    <>
      {formSubmitted ? null : (
        <Modal
          aria-label="Registration-form-modal"
          hideManually
          className={styles.modalForm}
        >
          <h6>New data provider registration</h6>
          <form ref={ref} onSubmit={handleSubmit}>
            <TextField
              className={styles.oaiUrl}
              id={elemDataProviderUrl}
              type="url"
              name={elemDataProviderUrl}
              label="OAI base URL"
              placeholder="For example, http://example.com/cgi/oai2"
              value={uri}
              helper={isIsDataProviderAddActive && message.helper}
              variant={
                (isIsDataProviderAddActive && message.variant) || 'normal'
              }
              statusIcon
              required
              {...bindDataProviderUrl}
            />
            <span className={styles.subDesc}>{benefitsData.join.subOai}</span>
            <TextField
              id={elemEmail}
              name={elemEmail}
              value={email}
              label="Email"
              placeholder="e.g. john.doe@ac.uk"
              type="email"
              required
              className={styles.textField}
              {...bindEmail}
            />
            <div className={styles.buttonGroup}>
              <Button variant="text" onClick={onCloseModal}>
                cancel
              </Button>
              <Button
                className={styles.buttonCustom}
                type="submit"
                variant="contained"
                onClick={() => {
                  checkDataProviders({
                    params: {
                      uri,
                      email,
                      setIsDataProviderAddActive,
                      setDataProvidersResponse,
                    },
                  })
                }}
              >
                Submit
              </Button>
            </div>
          </form>
        </Modal>
      )}
      {modalContent}
    </>
  )
})

export default BenefitsForm