import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Button, Select } from '@oacore/design/lib'

import styles from './styles.module.scss'

import { patchStats } from 'components/utils'
import page from 'data/home.yml'

const SearchForm = () => {
  const [value, setValue] = useState('')
  const router = useRouter()

  const handleInput = (e) => {
    setValue(e.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`search?q=${value}`)
  }

  const handleOnChange = () => {
    router.push(`search?q=${value}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Select
        id="search-input"
        value={value}
        variant="pure"
        prependIcon="#magnify"
        placeholder={patchStats(page.searchPlaceholder, page.statistics)}
        changeOnBlur={false}
        onInput={handleInput}
        className={styles.select}
        onChange={handleOnChange}
        label=""
      >
        {/* {suggestions.map((el) => (
                  <Select.Option
                    key={el.id}
                    id={el.id}
                    value={el.value}
                    icon={el.icon}
                  >
                    {el.value}
                  </Select.Option>
                ))} */}
      </Select>
      <Button variant="contained" type="submit">
        Search
      </Button>
    </form>
  )
}

export default SearchForm
