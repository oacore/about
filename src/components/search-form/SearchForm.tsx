'use client'

import { SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { useId, useState, type FormEvent } from 'react'

import { getSearchUrl } from '@utils/resolveHref'

import styles from './styles.module.css'

export type SearchFormProps = {
  placeholder: string
  value: string
  onValueChange: (value: string) => void
}

const SearchForm = ({ placeholder, value, onValueChange }: SearchFormProps) => {
  const inputId = useId()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const query = value.trim()

    if (!query) {
      return
    }

    setIsLoading(true)
    window.location.assign(getSearchUrl(query))
  }

  const handleChange = (nextValue: string) => {
    onValueChange(nextValue)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <Input
        allowClear
        className={styles.input}
        disabled={isLoading}
        id={inputId}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        prefix={<SearchOutlined aria-hidden />}
        size="large"
        value={value}
      />
      <Button disabled={!value.trim()} htmlType="submit" loading={isLoading} type="primary">
        Search
      </Button>
    </form>
  )
}

export default SearchForm
