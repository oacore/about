import React from 'react'

import styles from './radio.module.scss'

const CustomRadio = ({ id, label, checked, onChange }) => (
  <div className={styles.customRadio}>
    <input
      type="radio"
      id={id}
      checked={checked}
      onChange={onChange}
      className={styles.customRadioInput}
    />
    <label htmlFor={id}>{label}</label>
  </div>
)

export default CustomRadio
