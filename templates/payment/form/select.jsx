import React, { useEffect } from 'react'
import { Select as DesignSelect } from '@oacore/design/lib/modules'
import { Icon, ProgressSpinner } from '@oacore/design/lib/elements'
import classNames from '@oacore/design/lib/utils/class-names'

import { useSelect } from './hooks'
import styles from './styles.module.scss'

const Select = ({
  id: name,
  placeholder,
  label,
  options,
  loading,
  setFormValue,
  onDelete,
  required = true,
  disabled = false,
}) => {
  const {
    value,
    handleOnInput,
    handleOnChange,
    suggestions,
    setSuggestions,
    isError,
  } = useSelect('', options, false)
  // For async values
  useEffect(() => {
    setSuggestions(options)
  }, [options])

  const items = suggestions.slice(0, 10)

  const handleSelectChange = (option) => {
    handleOnChange(option)
    setFormValue(name, option.id)
  }

  return (
    <div className={styles.selectContainer}>
      <DesignSelect
        className={classNames.use(
          styles.input,
          styles.select,
          isError ? styles.errorSelect : '',
          {
            [styles.filled]: value !== '',
          }
        )}
        id={name}
        value={value}
        label={label}
        onChange={(option) => handleSelectChange(option)}
        onInput={handleOnInput}
        placeholder={placeholder}
        clearButtonClassName={styles.clearButton}
        required={required}
        disabled={disabled}
      >
        {loading ? (
          <DesignSelect.Option className={styles.option} id="loader">
            <ProgressSpinner />
          </DesignSelect.Option>
        ) : (
          items.map((el) => (
            <DesignSelect.Option
              className={styles.option}
              key={el.id}
              id={el.id}
              value={el.name}
              icon={`#${el.icon}`}
              customValue={el.customValue}
            >
              {el.name}
            </DesignSelect.Option>
          ))
        )}
      </DesignSelect>
      {onDelete && (
        <Icon
          src="#close"
          onClick={() => onDelete(name)}
          className={styles.closeIcon}
        />
      )}
    </div>
  )
}

export default Select
