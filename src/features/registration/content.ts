import type { RegistrationCopy, RegistrationSection } from './types'

export const getRegistrationSection = (
  copy: RegistrationCopy,
  productType: string,
  accountType: string,
): RegistrationSection | undefined =>
  copy.sections.find((section) => section.id === `${productType}-${accountType}`)

export const getSectionText = (
  copy: RegistrationCopy,
  productType: string,
  accountType: string,
  field: keyof RegistrationSection,
): string => {
  const value = getRegistrationSection(copy, productType, accountType)?.[field]
  return typeof value === 'string' ? value : ''
}
