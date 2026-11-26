'use client'

import { AutoComplete } from 'antd'
import { useEffect, useRef, useState } from 'react'

import styles from './styles.module.css'

type RorName = {
  types?: string[]
  value?: string
}

type RorOrganisation = {
  id?: string
  names?: RorName[]
}

type OrganisationOption = {
  value: string
  label: string
}

type OrganisationInputProps = {
  id?: string
  value?: string
  onChange?: (value: string) => void
}

const stripSelectedRorId = (value: string): string =>
  value.replace(/\s+\(https:\/\/ror\.org\/[^)]+\)$/, '').trim()

const getRorDisplayName = (organisation: RorOrganisation): string =>
  organisation.names?.find((name) => name.types?.includes('ror_display'))?.value ??
  organisation.names?.[0]?.value ??
  ''

const fetchOrganisations = async (query: string): Promise<OrganisationOption[]> => {
  const response = await fetch(
    `https://api.ror.org/organizations?query=${encodeURIComponent(query)}`,
  )

  if (!response.ok) {
    throw new Error(`ROR API error: ${response.status}`)
  }

  const data = (await response.json()) as { items?: RorOrganisation[] }

  return (data.items ?? []).flatMap((organisation) => {
    const name = getRorDisplayName(organisation)

    if (!organisation.id || !name) {
      return []
    }

    return [
      {
        value: `${name}  (${organisation.id})`,
        label: name,
      },
    ]
  })
}

const OrganisationInput = ({ id, value, onChange }: OrganisationInputProps) => {
  const [options, setOptions] = useState<OrganisationOption[]>([])
  const requestIdRef = useRef(0)

  const query = stripSelectedRorId(value ?? '')

  useEffect(() => {
    if (query.length < 2) {
      return undefined
    }

    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId
    const timeoutId = window.setTimeout(() => {
      fetchOrganisations(query)
        .then((nextOptions) => {
          if (requestIdRef.current === requestId) {
            setOptions(nextOptions)
          }
        })
        .catch(() => {
          if (requestIdRef.current === requestId) {
            setOptions([])
          }
        })
    }, 300)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [query])

  const handleChange = (nextValue: string) => {
    onChange?.(nextValue)
  }

  return (
    <AutoComplete
      aria-label="Organisation name"
      className={styles.inputGroupItem}
      id={id}
      onChange={handleChange}
      options={query.length < 2 ? [] : options}
      placeholder="Full name of your institution, e.g ‘The Open University’"
      value={value}
    />
  )
}

export default OrganisationInput
