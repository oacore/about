import { makeObservable, observable } from 'mobx'

import Registration from './registration'

class Root {
  registration = new Registration()

  constructor() {
    makeObservable(this, {
      registration: observable,
    })
  }
}

export default Root
