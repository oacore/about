export type ConfirmRegistrationButton = {
  text: string
  link: string
}

export type ConfirmRegistrationProduct = {
  picture: string
  title: string
  info: string
  button: ConfirmRegistrationButton
}

/** Shape returned by `getSections('registration')` (`registration/confirm_registration.yml`). */
export type ConfirmRegistrationContent = {
  title?: string
  description?: string
  keywords?: string | string[]
  api?: ConfirmRegistrationProduct
  dataset?: ConfirmRegistrationProduct
}
