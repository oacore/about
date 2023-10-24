import React, { useEffect, useState } from 'react'
import { Modal, Form, TextField, Button, Popover } from '@oacore/design/lib'
import { useRouter } from 'next/router'

import questionInfo from '../../../public/images/logos/questionInfo.svg'
import styles from './styles.module.scss'
import ProfileSelect from './profile-select'
import CountrySelect from './country-select'
import useSelect from '../../../hooks/use-select'
import useInput from '../hooks/use-input'
import Markdown from '../../markdown'
import findText from './helpers/findText'
import text from '../../../data/registration.yml'
import DropdownInput from './institution-select'
import CustomRadio from '../../radio-button'

import { useStore, observe } from 'store'

const ModalForm = observe((emailFill) => {
  const router = useRouter()
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
    value: description,
    bind: bindDescription,
    element: elemLastDescription,
  } = useInput('description')

  const {
    value: organisationName,
    suggestions: organisationNameSuggestions,
    bind: bindOrganisationName,
    element: elemOrganisationName,
  } = useInput('organisationName', true)

  const {
    value: libraryEmail,
    element: elemLibraryEmail,
    bind: bindLibraryEmail,
  } = useInput('libraryEmail')

  const [email, setEmail] = useState(emailFill.emailFill)
  const { registration } = useStore()

  const [selectedOption, setSelectedOption] = useState('')
  const handleRadioSelect = (id) => {
    setSelectedOption(id)
  }

  const { value: countryName, onChange: countryOnChange } =
    useSelect('countryName')

  const onCloseModal = () => {
    registration.reset()
  }

  useEffect(() => {
    setSelectedOption(
      registration.data.accountType === 'enterprise' ? 'all' : 'few'
    )
  }, [registration.data.accountType])

  const onHandleSubmit = (evt) => {
    evt.preventDefault()

    if (description.trim().split(/\s+/).length > 150) return

    if (organisationName)
      registration.setData({ organisation: organisationName })

    if (libraryEmail) registration.setData({ libraryEmail })

    if (description) registration.setData({ description })

    if (firstName && lastName && countryName.id && email) {
      registration.setData({
        firstName,
        lastName,
        country: countryName.id,
        email,
        paidAccess: selectedOption === 'all',
      })
      registration.setIsModalFormActive(false)
      registration.setIsModalConditionsActive(true)
    }
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
        {router.pathname.includes('dataset') && (
          <div className={styles.radioItemsWrapper}>
            <h6 className={styles.radioItemsTitle}>
              Choose the datasets you wish to get access to
            </h6>
            <div className={styles.radioItemsInnerWrapper}>
              <div className={styles.radioItem}>
                <div className={styles.radioTitleWrapper}>
                  <CustomRadio
                    id={text.options.only.id}
                    label={text.options.only.label}
                    checked={selectedOption === text.options.only.id}
                    onChange={() => handleRadioSelect(text.options.only.id)}
                  />
                  <Popover
                    className={styles.popover}
                    placement="top"
                    content={text.options.only.info}
                  >
                    <Button>
                      <img src={questionInfo} alt="questionInfo" />
                    </Button>
                  </Popover>
                </div>
                <Markdown className={styles.radioDescription}>
                  {text.options.only.description}
                </Markdown>
              </div>
              {registration.data.accountType === 'personal' && (
                <div className={styles.none}>{text.options.none}</div>
              )}
              {registration.data.accountType !== 'personal' && (
                <div className={styles.radioItem}>
                  <div className={styles.radioTitleWrapper}>
                    <CustomRadio
                      id={text.options.all.id}
                      label={text.options.all.label}
                      checked={selectedOption === text.options.all.id}
                      onChange={() => handleRadioSelect(text.options.all.id)}
                    />
                    <Popover
                      className={styles.popover}
                      placement="top"
                      content={
                        <Markdown>
                          {registration.data.accountType === 'enterprise'
                            ? text.options.all.info
                            : text.options.all.susInfo}
                        </Markdown>
                      }
                    >
                      <Button>
                        <img src={questionInfo} alt="questionInfo" />
                      </Button>
                    </Popover>
                  </div>
                  <Markdown className={styles.radioDescription}>
                    {text.options.all.description}
                  </Markdown>
                </div>
              )}
            </div>
          </div>
        )}
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
        <>
          <TextField
            id={emailFill.emailFill}
            name={emailFill.emailFill}
            label="Email"
            placeholder="john.doe@mail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={styles.institutionSubtitle}>
            {registration.data.accountType === 'enterprise'
              ? 'The supplied email address must correspond to the organization that you select.'
              : 'The supplied email address must correspond to the institution that you select.'}
          </div>
        </>
        {registration.data.accountType !== 'personal' && (
          <DropdownInput
            elemOrganisationName={elemOrganisationName}
            bindOrganisationName={bindOrganisationName}
            registration={registration}
            organisationNameSuggestions={organisationNameSuggestions}
          />
        )}
        <CountrySelect onChange={countryOnChange} />
        {registration.data.accountType === 'institution' && (
          <div className={styles.typeMainWrapper}>
            <div className={styles.typeWrapper}>
              <div className={styles.titleWrapper}>
                <span className={styles.title}>
                  {text.membershipType.title}
                </span>
              </div>
              <Markdown className={styles.typeText}>
                {router.pathname.includes('api')
                  ? text.membershipType.typeText
                  : text.membershipType.typeTextChecked}
              </Markdown>
            </div>
          </div>
        )}
        {registration.data.accountType === 'institution' && (
          <TextField
            id={elemLibraryEmail}
            name={elemLibraryEmail}
            label="Could you please provide us with the email for your library contact?"
            placeholder="john.doe@mail.com"
            defaultValue={emailFill.emailFill}
            type="email"
            {...bindLibraryEmail}
          />
        )}
        <div>
          <TextField
            className={styles.description}
            id={elemLastDescription}
            name={elemLastDescription}
            label="Describe the use case in which you would like to use CORE data"
            placeholder="Text..."
            type="textarea"
            value={description}
            required
            {...bindDescription}
          />
          {description.trim().split(/\s+/).length > 150 && (
            <div style={{ color: 'red' }}>
              Word count exceeds the limit (150 words)
            </div>
          )}
          <span className={styles.wordCount}>Max 150 words.</span>
        </div>
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
