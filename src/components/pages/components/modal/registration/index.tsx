'use client'

import { useRegistrationStore } from '@stores/registration'

import ModalConditions from './conditions'
import ModalError from './error'
import ModalExit from './exit'
import ModalForm from './form'
import { RegistrationAssetsProvider } from './registration-assets'
import ModalSuccess from './success'

import type { Country, RegistrationCopy } from '@features/registration/types'

type RegistrationModalsProps = {
  copy: RegistrationCopy
  countries: Country[]
  turnstileSiteKey?: string
}

const RegistrationModals = ({ copy, countries, turnstileSiteKey }: RegistrationModalsProps) => {
  const {
    isModalFormActive,
    isModalConditionsActive,
    isModalExitActive,
    isModalSuccessActive,
    isModalErrorActive,
  } = useRegistrationStore()

  return (
    <RegistrationAssetsProvider value={{ copy, countries, turnstileSiteKey }}>
      {isModalFormActive ? <ModalForm /> : null}
      {isModalConditionsActive ? <ModalConditions /> : null}
      {isModalExitActive ? <ModalExit /> : null}
      {isModalSuccessActive ? <ModalSuccess /> : null}
      {isModalErrorActive ? <ModalError /> : null}
    </RegistrationAssetsProvider>
  )
}

export default RegistrationModals
