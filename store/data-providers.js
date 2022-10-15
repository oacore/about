import { makeObservable, observable, action } from 'mobx'

import apiRequest from 'api'

class DataProviders {
  data = null

  isLoading = false

  isError = false

  constructor() {
    makeObservable(this, {
      data: observable,
      isLoading: observable,
      isError: observable,
      setDataProviders: action,
      setIsLoading: action,
      setIsError: action,
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

  setIsError(boolean) {
    this.isError = boolean
  }

  // fetchData() {
  //   const data =
  //     [{"id":24,"openDoarId":1590,"name":"Cronfa at Swansea University","urlHomepage":"https:\/\/cronfa.swan.ac.uk","dataProviderLocation":{"id":24,"countryCode":"GB","longitude":-4.0628,"latitude":51.608},"email":"iss-research@swansea.ac.uk"},{"id":48,"openDoarId":1275,"name":"Glasgow Theses Service","urlHomepage":"http:\/\/theses.gla.ac.uk","dataProviderLocation":{"id":48,"countryCode":"GB","longitude":-4.2889,"latitude":55.87329},"email":"William.Nixon@glasgow.ac.uk"},{"id":60,"openDoarId":1518,"name":"Language Box","urlHomepage":"http:\/\/languagebox.ac.uk","dataProviderLocation":{"id":60,"countryCode":"GB","longitude":-1.3957,"latitude":50.9342},"email":null}];
  //
  //   this.setDataProviders(data)
  // }

  async fetchData() {
    this.setIsLoading(true)
    try {
      const { data } = await apiRequest('/repositories/formap')
      this.setDataProviders(data)
    } catch (error) {
      this.setIsError(true)
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
