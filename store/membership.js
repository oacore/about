import { makeObservable, observable, action, toJS } from 'mobx'

import { registerKey } from '../api/services'

class Membership {
  data = {
    price: 0,
    activePlan: '',
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
    console.log(toJS(this.data))
  }

  setIsLoading(boolean) {
    this.isLoading = boolean
  }

  async submit() {
    console.log(data)
  }

  reset() {
    this.data = {
      price: 0,
      activePlan: '',
    }
  }
}

export default Membership
