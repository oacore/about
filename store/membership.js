import { makeObservable, observable, action } from 'mobx'
import Router from 'next/router'

import { createMembershipPayment } from '../api/services'
import routes from '../core.routes.yml'

class Membership {
  data = {
    price: 0,
    priceCalculated: 0,
    planName: '',
    size: '',
    transactionToken: '',
    transactionDescription: '',
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
    const { pathname } = Router
    try {
      await createMembershipPayment(this.data)
      this.reset()
      Router.push({
        pathname: pathname + routes.payment.children.success,
      })
    } catch (error) {
      Router.push({
        pathname: pathname + routes.payment.children.error,
      })
      console.error(error)
    }
  }

  reset() {
    this.data = {
      price: 0,
      priceCalculated: 0,
      planName: '',
    }
  }
}

export default Membership
