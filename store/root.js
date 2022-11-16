import { makeObservable, observable } from 'mobx'

import DataProviders from './data-providers'
import Membership from './membership'
import MembershipPrice from './membership-price'
import Registration from './registration'

class Root {
  registration = new Registration()

  membership = new Membership()

  membershipPrice = new MembershipPrice()

  dataProviders = new DataProviders()

  constructor() {
    makeObservable(this, {
      registration: observable,
      membership: observable,
      membershipPrice: observable,
      dataProviders: observable,
    })
  }
}

export default Root
