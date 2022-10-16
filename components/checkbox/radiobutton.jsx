import React, {useEffect} from 'react'

import styles from './styles.module.scss'

const Radiobutton = ({id, labelText, options, setRadioButtonsState, className = null}) => {
  const handleRadioButton = (id, value, setRadioButtonsState) => {
    const states = {
      [id]: value
    }
    setRadioButtonsState(states);
  }

  useEffect(() => {
    handleRadioButton(id, options[0].id, setRadioButtonsState)
  }, []);

  return (
    <div key={labelText}>
      <div>{labelText}:</div>
      {options.map((field) => {
        return (
          <div className="form-check">
            <input className="form-check-input " type="radio" name={id} id={field.id}
                   onChange={() => handleRadioButton(id, field.id, setRadioButtonsState)}
            />
            <label className={styles.radioLabel} htmlFor={field.id}>
              {field.value}
            </label>
          </div>
        )
      })}
    </div>
  )
}

export default Radiobutton
