import { makeObservable, observable, action } from 'mobx'

import { getMembershipPrice } from '../api/services'

class MembershipPrice {
  data = {
    repository: [],
    planName: '',
    price: 0,
    priceCalculated: 0,
    discount: 0,
  }

  isLoadingPrice = false

  constructor() {
    makeObservable(this, {
      data: observable,
      isLoadingPrice: observable,
      setIsLoadingPrice: action,
      setData: action,
      fetchPrice: action,
    })
  }

  setData(data) {
    Object.assign(this.data, data)
  }

  setIsLoadingPrice(boolean) {
    this.isLoadingPrice = boolean
  }

  async fetchPrice() {
    this.setIsLoadingPrice(false)
    try {
      // Uniq repository id's
      this.data.repository = [...new Set(this.data.repository)]

      const { data } = await getMembershipPrice(this.data)
      if (data.price && data.price > 0 && Number.isInteger(data.price)) {
        this.data.price = data.price
        this.data.priceCalculated = data.price
        this.setIsLoadingPrice(true)
      }
    } catch (error) {
      this.data.priceCalculated = -1
      console.error(error)
    } finally {
      this.setIsLoadingPrice(false)
    }
  }
}

export default MembershipPrice
