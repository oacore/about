import React from 'react'

import ModalForm from './form'
import ModalConditions from './conditions'
import ModalExit from './exit'
import ModalSuccess from './success'
import ModalError from './error'

import { observe, useStore } from 'store'

const RegistrationModals = observe(() => {
  const { registration } = useStore()

  return (
    <>
      {registration.isModalFormActive && <ModalForm />}
      {registration.isModalConditionsActive && <ModalConditions />}
      {registration.isModalExitActive && <ModalExit />}
      {registration.isModalSuccessActive && <ModalSuccess />}
      {registration.isModalErrorActive && <ModalError />}
    </>
  )
})

export default RegistrationModals