import React, { useEffect } from 'react'
import { Select as DesignSelect } from '@oacore/design/lib/modules'
import { toJS } from 'mobx'
import { Button, ProgressSpinner } from '@oacore/design/lib/elements'

import useSelect from './hooks/use-select'
import styles from '../styles.module.scss'

const Select = ({
  id,
  placeholder,
  label,
  type,
  options,
  loading,
  setFormValue,
  caption,
}) => {
  const { value, handleOnInput, handleOnChange, suggestions, setSuggestions } =
    useSelect(type, '', options)

  // For async values
  useEffect(() => {
    setSuggestions(options)
  }, [options])

  const items = suggestions.slice(0, 10)

  const handleSelectChange = (option) => {
    handleOnChange(option)
    setFormValue(id, option.value)
  }

  // console.log(suggestions)
  return (
    <div className={styles.selectContainer}>
      <DesignSelect
        className={styles.select}
        id={id}
        value={value}
        label={label}
        onChange={(option) => handleSelectChange(option)}
        onInput={handleOnInput}
        placeholder={placeholder}
        required
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
              icon={el.icon}
            >
              {el.name}
            </DesignSelect.Option>
          ))
        )}
      </DesignSelect>
      {caption && (
        <span type="button" className={styles.buttonHelp}>
          {caption.title}
        </span>
      )}
    </div>
  )
}

export default Select
