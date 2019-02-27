export const processTemplate = (template, context) =>
  template.replace(/\{\{\w+\}\}/g, replacement => {
    const key = replacement.substr(2, replacement.length - 4)
    if (Object.prototype.hasOwnProperty.call(context, key)) return context[key]
    return replacement
  })

export const patchStats = (text, statistics) => {
  const context = {}
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(statistics))
    context[key] = value.toLocaleString('en-GB')
  return processTemplate(text, context)
}
