import { makeObservable, observable } from 'mobx'

import DataProviders from './data-providers'
import Membership from './membership'
import Registration from './registration'

class Root {
  registration = new Registration()

  membership = new Membership()

  dataProviders = new DataProviders()

  constructor() {
    makeObservable(this, {
      registration: observable,
      membership: observable,
      dataProviders: observable,
    })
  }
}

export default Root
