import { makeObservable, observable, action } from 'mobx'
import Router from 'next/router'

import {
  checkMembershipTypeRepository,
  createMembershipPayment,
} from '../api/services'
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
      createMembershipPayment: action,
    })
  }

  setData(data) {
    Object.assign(this.data, data)
  }

  getData() {
    return this.data
  }

  setIsLoading(boolean) {
    this.isLoading = boolean
  }

  async submit() {
    try {
      const { data } = await checkMembershipTypeRepository(this.data)
      Object.assign(this.data, data)

      Router.push({
        pathname:
          routes.membershipRequestStatus.pattern +
          routes.membershipRequestStatus.children.success,
      })
    } catch (error) {
      Router.push({
        pathname:
          routes.membershipRequestStatus.pattern +
          routes.membershipRequestStatus.children.error,
      })
      console.error(error)
    }
  }

  async createMembershipPayment() {
    try {
      await createMembershipPayment(this.data)
      this.reset()
    } catch (error) {
      Router.push({
        pathname:
          routes.membershipRequestStatus.pattern +
          routes.membershipRequestStatus.children.error,
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
