import { cache } from 'react'

import { getSections } from 'content'

import type { ConfirmRegistrationContent } from '@features/confirm-registration/types'

export const loadConfirmRegistrationPage = cache(async () => {
  const page = await getSections('registration')

  return page as ConfirmRegistrationContent
})
