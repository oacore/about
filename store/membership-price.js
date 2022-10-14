import { makeObservable, observable, action } from 'mobx'

import { getMembershipPrice } from '../api/services'

class MembershipPrice {
  data = {
    repository: [],
    planName: '',
  }

  isLoadingPrice = false

  constructor() {
    makeObservable(this, {
      data: observable,
      isLoadingPrice: observable,
      setData: action,
      fetchData: action,
      reset: action,
    })
  }

  setData(data) {
    Object.assign(this.data, data)
  }

  setIsLoadingPrice(boolean) {
    this.isLoadingPrice = boolean
  }

  async fetchData() {
    this.setIsLoadingPrice(true)

    try {
      const { data }  = await getMembershipPrice(this.data)
      this.setData(data)

      // console.log("getMembershipPrice data")
      // console.log(data)

    } catch (error) {
      console.error(error)
    } finally {
      this.setIsLoadingPrice(false)
    }
  }

}

export default MembershipPrice
