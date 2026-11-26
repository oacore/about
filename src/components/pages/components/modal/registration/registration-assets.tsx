'use client'

import { createContext, useContext } from 'react'

import type { Country, RegistrationCopy } from '@features/registration/types'

type RegistrationAssets = {
  copy: RegistrationCopy
  countries: Country[]
  turnstileSiteKey?: string
}

const RegistrationAssetsContext = createContext<RegistrationAssets | null>(null)

export const RegistrationAssetsProvider = RegistrationAssetsContext.Provider

export const useRegistrationAssets = (): RegistrationAssets => {
  const assets = useContext(RegistrationAssetsContext)

  if (!assets) {
    throw new Error('Registration content is missing')
  }

  return assets
}
