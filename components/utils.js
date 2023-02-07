export const processTemplate = (template, context) =>
  template.toString().replace(/\{\{\w+\}\}/g, (replacement) => {
    const key = replacement.substr(2, replacement.length - 4)
    if (Object.prototype.hasOwnProperty.call(context, key)) return context[key]
    return replacement
  })

export const formatNumber = (
  number,
  { locale = 'en-GB', maximumFractionDigits = 2, ...restOptions } = {}
) =>
  new Intl.NumberFormat(locale, {
    maximumFractionDigits,
    ...restOptions,
  }).format(number)

export const patchStats = (text, statistics) => {
  const context = {}
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(statistics)) {
    context[key] =
      typeof value === 'number'
        ? formatNumber(value, {
            notation: 'compact',
            compactDisplay: 'short',
            maximumFractionDigits: 0,
          })
        : value
  }
  return processTemplate(text, context)
}

export const patchNumberComma = (text, statistics) => {
  const context = {}
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(statistics)) {
    context[key] =
      typeof value === 'number'
        ? formatNumber(value, {
            maximumSignificantDigits: 3,
          })
        : value
  }

  return processTemplate(text, context)
}
