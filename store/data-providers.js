import { makeObservable, observable, action } from 'mobx'

import apiRequest from 'api'

class DataProviders {
  data = null

  isLoading = false

  constructor() {
    makeObservable(this, {
      data: observable,
      isLoading: observable,
      setDataProviders: action,
      setIsLoading: action,
      fetchData: action,
      reset: action,
    })
  }

  setDataProviders(data) {
    this.data = data
  }

  setIsLoading(boolean) {
    this.isLoading = boolean
  }

  async fetchData() {
    this.setIsLoading(true)
    try {
      const { data } = await apiRequest('/repositories/formap')
      this.setDataProviders(data)
    } catch (error) {
      console.error(error)
    } finally {
      this.setIsLoading(false)
    }
  }

  reset() {
    this.data = null
    this.isLoading = false
  }
}

export default DataProviders
