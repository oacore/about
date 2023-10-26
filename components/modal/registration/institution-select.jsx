import React, { useState } from 'react'
import { TextField } from '@oacore/design'

import styles from './styles.module.scss'

const DropdownInput = ({
  elemOrganisationName,
  bindOrganisationName,
  registration,
  organisationNameSuggestions,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleInputChange = (event) => {
    bindOrganisationName.onChange(event)
    setIsOpen(true)
  }

  const handleOptionClick = (value) => {
    bindOrganisationName.onChange({ target: { value } })
    setIsOpen(false)
  }

  const hasValue = !!bindOrganisationName.value

  return (
    <div className={styles.dropdownInput}>
      <TextField
        id={elemOrganisationName}
        name={elemOrganisationName}
        label={
          registration.data.accountType === 'enterprise'
            ? 'Organization name'
            : 'Institution name'
        }
        placeholder="Full name of your institution, e.g ‘The Open University’"
        className={styles.modalFormInputOrg}
        {...bindOrganisationName}
        required
        onChange={handleInputChange}
      />
      {isOpen && (
        <div
          className={`${styles.dropdownOptions} ${
            !hasValue ? styles.hasValue : ''
          }`}
        >
          {organisationNameSuggestions?.map((suggestion, index) => (
            // eslint-disable-next-line max-len
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div
              /* eslint-disable-next-line react/no-array-index-key */
              key={index}
              className={styles.dropdownOption}
              onClick={() =>
                handleOptionClick(`${suggestion.name}  (${suggestion.id})`)
              }
            >
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropdownInput
