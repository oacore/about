import React, { useEffect } from 'react'

import styles from './styles.module.scss'

const Radiobutton = ({ id, labelText, options, setRadioButtonsState }) => {
  const handleRadioButton = (value) => {
    const states = {
      [id]: value,
    }
    setRadioButtonsState(states)
  }

  useEffect(() => {
    handleRadioButton(options[0].id)
  }, [])

  return (
    <div key={labelText}>
      <div>{labelText}:</div>
      {options.map((field) => (
        <div key={field.value} className="form-check">
          <input
            className="form-check-input "
            type="radio"
            name={id}
            id={field.id}
            onChange={() => handleRadioButton(field.id)}
          />
          <label className={styles.radioLabel} htmlFor={field.id}>
            {field.value}
          </label>
        </div>
      ))}
    </div>
  )
}

export default Radiobutton
