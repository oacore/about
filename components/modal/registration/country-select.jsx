import React from 'react'
import { Select } from '@oacore/design/lib'

import styles from './styles.module.scss'

import countriesData from 'data/countries.yml'

const { countries } = countriesData

const CountrySelect = ({ onChange }) => {
  const [suggestions, setSuggestions] = React.useState(countries)
  const [value, setValue] = React.useState('')

  const handleOnInput = (data) => {
    if (data.value && !data.id) {
      setSuggestions(
        countries.filter((obj) =>
          Object.values(obj).some((item) =>
            item.toLowerCase().includes(data.value.toLowerCase())
          )
        )
      )
    }
    setValue(data.value)
  }

  return (
    <Select
      id="country-select"
      label="Country"
      onInput={handleOnInput}
      onChange={onChange}
      value={value}
      className={styles.select}
      clearButton={false}
      placeholder="e.g United kingdom"
      required
    >
      {suggestions.map(({ name, code }) => (
        <Select.Option key={code} value={name} id={code}>
          {name}
        </Select.Option>
      ))}
    </Select>
  )
}

export default CountrySelect