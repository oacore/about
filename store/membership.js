import { makeObservable, observable, action } from 'mobx'
import Router from 'next/router'

import { createMembershipPayment } from '../api/services'
import routes from '../core.routes.yml'

class Membership {
  activePlan = ''

  data = {
    price: 0,
    planName: '',
    size: '',
    transactionToken: 'TOKEN_saddsadasdasdasdasdqweqwedasd',
    transactionDescription: 'Test transaction',
  }

  constructor() {
    makeObservable(this, {
      data: observable,
      activePlan: observable,
      reset: action,
      setData: action,
      submit: action,
      setActivePlan: action,
    })
  }

  setData(data) {
    Object.assign(this.data, data)
  }

  setIsLoading(boolean) {
    this.isLoading = boolean
  }

  setActivePlan(plan) {
    this.activePlan = plan
  }

  async submit() {
    const { pathname } = Router
    try {
      await createMembershipPayment(this.data)
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
      planName: '',
    }
  }
}

export default Membership
