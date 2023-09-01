import React from 'react'

import ModalForm from './form'
import ModalConditions from './conditions'
import ModalExit from './exit'
import ModalSuccess from './success'
import ModalError from './error'

import { observe, useStore } from 'store'

const RegistrationModals = observe(() => {
  const { registration } = useStore()
  const { responseData } = registration

  return (
    <>
      {registration?.isModalFormActive && (
        <ModalForm emailFill={registration.data.email} />
      )}
      {registration?.isModalConditionsActive && <ModalConditions />}
      {registration?.isModalExitActive && <ModalExit />}
      {registration?.isModalSuccessActive && (
        <ModalSuccess responseData={responseData} />
      )}
      {registration?.isModalErrorActive && <ModalError />}
    </>
  )
})

export default RegistrationModals
