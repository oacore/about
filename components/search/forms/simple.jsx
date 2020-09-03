import React, { useRef } from 'react'
import { Select } from '@oacore/design'

import styles from './styles.module.css'

const options = [
  { id: 1, icon: '#magnify', value: 'Option A' },
  { id: 2, icon: '#magnify', value: 'Option B' },
  { id: 3, icon: '#magnify', value: 'Option C' },
  { id: 4, icon: '#magnify', value: 'Option D' },
  { id: 5, icon: '#magnify', value: 'Option E' },
]

const SearchAutocompletion = ({ formRef, ...passProps }) => {
  const [suggestions, setSuggestions] = React.useState(options)
  const [value, setValue] = React.useState('')

  const handleOnChange = data => {
    if (data.value === '') return
    formRef.current.submit()
  }

  const handleOnInput = data => {
    // if id doesn't exists it means user type own text
    // and didn't use suggestion
    if (!data.id) {
      setSuggestions(
        options.slice(0, Math.max(0, options.length - data.value.length))
      )
    }

    setValue(data.value)
  }

  return (
    <Select
      id="search-select"
      value={value}
      onChange={handleOnChange}
      onInput={handleOnInput}
      prependIcon="#magnify"
      className={styles.searchBox}
      clearButtonClassName={styles.clearButton}
      selectMenuClassName={styles.selectMenu}
      changeOnBlur={false}
      {...passProps}
    >
      {suggestions.map(el => (
        <Select.Option
          key={el.id}
          id={el.id}
          value={el.value}
          icon={el.icon}
          className={styles.option}
        >
          {el.value}
        </Select.Option>
      ))}
      {value !== '' && (
        <Select.Option
          key={6}
          id={6}
          value={value}
          icon="#magnify"
          className={`${styles.option} ${styles.lastOption}`}
        >
          {`All results for "${value}"`}
        </Select.Option>
      )}
    </Select>
  )
}

const SearchForm = ({
  action,
  method,
  onSubmit,
  id = 'search-form',
  ...fieldProps
}) => {
  const ref = useRef(null)
  return (
    <form ref={ref} id={id} action={action} method={method} onSubmit={onSubmit}>
      <SearchAutocompletion id={`${id}-field`} {...fieldProps} formRef={ref} />
    </form>
  )
}

export default SearchForm
