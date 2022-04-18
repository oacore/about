import { makeObservable, observable, action } from 'mobx'

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
  }

  setIsLoading(boolean) {
    this.isLoading = boolean
  }

  async submit() {
    const myPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data)
      }, 300)
    })
    return myPromise
  }

  reset() {
    this.data = {
      price: 0,
      activePlan: '',
    }
  }
}

export default Membership
