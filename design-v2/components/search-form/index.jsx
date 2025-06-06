import { useRouter } from 'next/router'
import React from 'react'
import { Button, Select } from '@oacore/design/lib'
import LogRocket from 'logrocket'

import styles from './styles.module.scss'

import { patchStats } from 'components/utils'
import page from 'data/home.yml'

const SearchForm = ({ setSearchValue, searchValue }) => {
  const router = useRouter()

  const handleInput = (e) => {
    setSearchValue(e.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    LogRocket.track('search-submitted', { query: searchValue })
    router.push(`search?q=${searchValue}`)
  }

  const handleOnChange = () => {
    router.push(`search?q=${searchValue}`)
  }

  const handleButtonClick = () => {
    LogRocket.track('search-button-clicked', { query: searchValue })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Select
        id="search-input"
        variant="pure"
        label={patchStats(page.searchPlaceholder, page.statistics)}
        value={searchValue}
        prependIcon="#magnify"
        changeOnBlur={false}
        onInput={handleInput}
        className={styles.select}
        onChange={handleOnChange}
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
      <Button variant="contained" type="submit" onClick={handleButtonClick}>
        Search
      </Button>
    </form>
  )
}

export default SearchForm
