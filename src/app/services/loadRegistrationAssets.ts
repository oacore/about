import { cache } from 'react'

import { getSections } from 'content'

import type { Country, RegistrationCopy } from '@features/registration/types'

const isRegistrationCopy = (value: unknown): value is RegistrationCopy => {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }

  return Array.isArray((value as RegistrationCopy).sections)
}

const isCountry = (value: unknown): value is Country => {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }

  const country = value as Record<string, unknown>
  return typeof country.name === 'string' && typeof country.code === 'string'
}

export const loadRegistrationAssets = cache(async () => {
  const [registration, countriesFile] = await Promise.all([
    getSections('data/registration.yml'),
    getSections('data/countries.yml'),
  ])

  if (!isRegistrationCopy(registration)) {
    throw new Error('Invalid content payload for "data/registration.yml"')
  }

  const countries = Array.isArray(countriesFile.countries)
    ? countriesFile.countries.filter(isCountry)
    : []

  return {
    registration,
    countries,
  }
})
