type StatisticsMap = Record<string, string | number | undefined>

/** Deterministic compact formatting — avoids Node vs browser Intl hydration mismatches. */
export const formatCompactNumber = (value: number): string => {
  const abs = Math.abs(value)

  if (abs >= 1_000_000_000) {
    return `${Math.round(value / 1_000_000_000)}B`
  }

  if (abs >= 1_000_000) {
    return `${Math.round(value / 1_000_000)}M`
  }

  if (abs >= 1_000) {
    return `${Math.round(value / 1_000)}K`
  }

  return String(value)
}

const formatStatisticValue = (value: string | number): string => {
  if (typeof value !== 'number') {
    return value
  }

  return formatCompactNumber(value)
}

export const patchStats = (
  count: string | number | undefined,
  statistics?: StatisticsMap,
): string => {
  if (count == null || count === '') {
    return ''
  }

  const countText = String(count)

  if (!statistics || !/\{\{\w+\}\}/.test(countText)) {
    return countText
  }

  return countText.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = statistics[key]
    return value != null ? formatStatisticValue(value) : `{{${key}}}`
  })
}

export const formatNumberWithComma = (value: number): string =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const SIGNIFICANT_NUMBER_FORMAT = new Intl.NumberFormat('en-GB', { maximumSignificantDigits: 3 })

export const patchNumberComma = (
  text: string | number | undefined,
  statistics?: StatisticsMap,
): string => {
  if (!statistics) {
    return patchStats(text, statistics)
  }

  const formatted: StatisticsMap = {}

  // Same as the old site: grouped thousands, rounded to 3 significant digits (2549.15 -> "2,550")
  Object.entries(statistics).forEach(([key, value]) => {
    formatted[key] = typeof value === 'number' ? SIGNIFICANT_NUMBER_FORMAT.format(value) : value
  })

  return patchStats(text, formatted)
}
