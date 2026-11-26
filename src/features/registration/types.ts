export type AccountType = 'institution' | 'enterprise' | 'personal'

export type ProductType = 'api' | 'dataset' | ''

export type RegistrationData = {
  firstName: string
  lastName: string
  organisation: string
  country: string
  accountType: AccountType
  email: string
  productType: ProductType
  agreeNewsletter: boolean
  dateRequest: string
  termsId: string
  agreedToNewTerms: boolean
  turnstileToken: string
  libraryEmail: string
  description: string
  paidAccess: boolean
}

export type RegistrationResponse = {
  memberStatus?: string
}

export type RegistrationSection = {
  id: string
  text?: string
  box?: string
  rate?: string
  rate2?: string
  modalContent?: string
  typeModalContent?: string
}

export type RegistrationCopy = {
  sections: RegistrationSection[]
  membershipType: {
    title: string
    typeText: string
    typeTextChecked: string
  }
  terms: string
  personalConditions: {
    title: string
    version: string
  }
  personalTerms: {
    title: string
    version: string
  }
  options: {
    all: {
      description: string
      info?: string
      susInfo?: string
    }
    none: string
  }
}

export type Country = {
  name: string
  code: string
}
