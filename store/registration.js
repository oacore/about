import { makeObservable, observable, action } from 'mobx'

import { registerKey } from '../api/services'

class Registration {
  data = {
    accountType: 'personal',
  }

  isModalFormActive = false

  isModalConditionsActive = false

  isModalSuccessActive = false

  isModalExitActive = false

  isLoading = false

  error = null

  constructor() {
    makeObservable(this, {
      data: observable,
      isModalFormActive: observable,
      isModalConditionsActive: observable,
      isModalSuccessActive: observable,
      isModalExitActive: observable,
      isLoading: observable,
      error: observable,
      setData: action,
      setIsModalFormActive: action,
      setIsModalConditionsActive: action,
      setIsModalSuccessActive: action,
      setIsModalExitActive: action,
      setIsLoading: action,
      reset: action,
    })
  }

  setData(data) {
    Object.assign(this.data, data)
  }

  setIsModalFormActive(boolean) {
    this.isModalFormActive = boolean
  }

  setIsModalConditionsActive(boolean) {
    this.isModalConditionsActive = boolean
  }

  setIsModalSuccessActive(boolean) {
    this.isModalSuccessActive = boolean
  }

  setIsModalExitActive(boolean) {
    this.isModalExitActive = boolean
  }

  setIsLoading(boolean) {
    this.setIsLoading = boolean
  }

  async registerSubmit() {
    try {
      const response = await registerKey(this.data)
      if (response.status === 200) this.error = null
    } catch (error) {
      this.error = 'error'
    }
  }

  reset() {
    this.data = { accountType: 'personal' }
    this.isModalFormActive = false
    this.isModalConditionsActive = false
    this.isModalSuccessActive = false
    this.isModalExitActive = false
    this.isLoading = false
    this.error = null
  }
}

export default Registration
