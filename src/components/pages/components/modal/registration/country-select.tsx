'use client'

import { Select } from 'antd'

import type { Country } from '@features/registration/types'

type CountrySelectProps = {
  countries: Country[]
  id?: string
  value?: string
  onChange?: (value: string) => void
}

const CountrySelect = ({ countries, id, value, onChange }: CountrySelectProps) => (
  <Select
    aria-label="Country"
    id={id}
    onChange={onChange}
    optionFilterProp="label"
    options={countries.map((country) => ({
      value: country.code,
      label: country.name,
    }))}
    placeholder="e.g. United Kingdom"
    showSearch
    value={value}
  />
)

export default CountrySelect
