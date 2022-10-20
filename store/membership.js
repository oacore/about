import { makeObservable, observable, action } from 'mobx'
import Router from 'next/router'

import { createMembershipPayment } from '../api/services'
import routes from '../core.routes.yml'

class Membership {
  data = {
    price: 0,
    priceCalculated: 0,
    discount: 0,
    planName: '',
    noRepositories: 0,
    size: '',
    transactionToken: 'TOKEN',
    transactionDescription: 'description',
  }

  constructor() {
    makeObservable(this, {
      data: observable,
      reset: action,
      setData: action,
      submit: action,
    })
  }

  setData(data) {
    Object.assign(this.data, data)
  }

  setIsLoading(boolean) {
    this.isLoading = boolean
  }

  async submit() {
    try {
      await createMembershipPayment(this.data)
      this.reset()
      Router.push({
        pathname:
          routes.paymentStatus.pattern + routes.paymentStatus.children.success,
      })
    } catch (error) {
      Router.push({
        pathname:
          routes.paymentStatus.pattern + routes.paymentStatus.children.error,
      })
      console.error(error)
    }
  }

  reset() {
    this.data = {
      price: 0,
      priceCalculated: 0,
      planName: '',
      discount: 0,
    }
  }
}

export default Membership
