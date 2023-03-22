import { makeObservable, observable, action } from 'mobx'
import Router from 'next/router'

import { createMembershipRegistrationPayment } from '../api/services'
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

  typeRepositoryList = ['has_account', 'has_email', 'anonymous']

  constructor() {
    makeObservable(this, {
      data: observable,
      typeRepositoryList: observable,
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
      const { email } = this.data
      const { data } = await createMembershipRegistrationPayment(this.data)
      const { typeRepository } = data

      if (this.typeRepositoryList.includes(typeRepository)) {
        this.reset()
        Router.push({
          pathname:
            routes.membershipRequestStatus.pattern +
            routes.membershipRequestStatus.children.success,
          search: `?typeRepository=${typeRepository}&email=${email}`,
        })
      } else {
        console.error('typeRepository', typeRepository)
        Router.push({
          pathname:
            routes.membershipRequestStatus.pattern +
            routes.membershipRequestStatus.children.error,
        })
      }
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
