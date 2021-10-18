import React from 'react'
import { Select } from '@oacore/design/lib'
import classNames from '@oacore/design/lib/utils/class-names'

import styles from './styles.module.scss'

import countriesData from 'data/countries.yml'

const { countries } = countriesData

const CountrySelect = React.forwardRef(({ onChange }, ref) => {
  const [suggestions, setSuggestions] = React.useState(countries)
  const [value, setValue] = React.useState('')
  const handleOnInput = (data) => {
    if (data.value && !data.id) {
      const result = countries.filter((obj) =>
        Object.values(obj).some((item) =>
          item.toLowerCase().includes(data.value.toLowerCase())
        )
      )

      setSuggestions(result)
    }

    setValue(data.value)
    const foundedCountry = countries.find(
      (item) => item.name.toLowerCase() === data.value.toLowerCase()
    )
    if (foundedCountry)
      onChange({ value: foundedCountry.name, id: foundedCountry.code })
  }

  return (
    <Select
      id="country-select"
      name="country-select"
      label="Country"
      onInput={handleOnInput}
      onChange={onChange}
      value={value}
      ref={ref}
      className={classNames.use(styles.select, {
        [styles.error]: suggestions.length === 0,
      })}
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
})

export default CountrySelect
