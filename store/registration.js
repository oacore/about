import { makeObservable, observable, action } from 'mobx'

import { registerKey } from '../api/services'

class Registration {
  data = {
    firstName: '',
    lastName: '',
    organisation: '',
    country: '',
    //  TODO temp remove
    // accountType: 'personal',
    accountType: 'institution',
    email: '',
    productType: '',
    agreeNewsletter: false,
  }

  isModalFormActive = false

  isModalConditionsActive = false

  isModalSuccessActive = false

  isModalExitActive = false

  isModalErrorActive = false

  isLoading = false

  responseData = null

  error = null

  constructor() {
    makeObservable(this, {
      data: observable,
      isModalFormActive: observable,
      isModalConditionsActive: observable,
      isModalSuccessActive: observable,
      isModalExitActive: observable,
      isModalErrorActive: observable,
      isLoading: observable,
      error: observable,
      setData: action,
      setIsModalFormActive: action,
      setIsModalConditionsActive: action,
      setIsModalSuccessActive: action,
      setIsModalExitActive: action,
      setIsModalErrorActive: action,
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

  setIsModalErrorActive(boolean) {
    this.isModalErrorActive = boolean
  }

  setIsLoading(boolean) {
    this.isLoading = boolean
  }

  async registerSubmit() {
    this.setIsLoading(true)
    try {
      const response = await registerKey(this.data)
      if (response.status === 200) {
        this.responseData = response.data
        this.setIsModalSuccessActive(true)
      }
    } catch (error) {
      this.setIsModalErrorActive(true)
    } finally {
      this.setIsLoading(false)
    }
  }

  reset() {
    this.data = {
      firstName: '',
      lastName: '',
      organisation: '',
      country: '',
      //  TODO temp remove
      // accountType: 'personal',
      accountType: 'institution',
      email: '',
      productType: '',
      agreeNewsletter: false,
    }
    this.isModalFormActive = false
    this.isModalConditionsActive = false
    this.isModalSuccessActive = false
    this.isModalExitActive = false
    this.isModalErrorActive = false
    this.isLoading = false
    this.error = null
  }
}

export default Registration
