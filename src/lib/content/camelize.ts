const camelCaseKey = (key: string): string =>
  key.replace(/[-_]+(.)?/g, (_, char: string | undefined) => (char ? char.toUpperCase() : ''))

/** Deep camelCase for object keys (oacore CMS YAML style). */
export const deepCamelize = (value: unknown): unknown => {
  if (value === null || value === undefined) {
    return value
  }
  if (typeof value !== 'object') {
    return value
  }
  if (value instanceof Date) {
    return value
  }
  if (Array.isArray(value)) {
    return value.map(deepCamelize)
  }
  return Object.fromEntries(
    Object.entries(value).map(([entryKey, entryValue]) => [
      camelCaseKey(entryKey),
      deepCamelize(entryValue),
    ]),
  )
}
