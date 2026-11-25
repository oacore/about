const CORE_STATISTICS_URL = 'https://api.core.ac.uk/internal/statistics'

export type CoreStatistics = Record<string, number>

export const fetchCoreStatistics = async (): Promise<CoreStatistics> => {
  const response = await fetch(CORE_STATISTICS_URL, {
    next: { revalidate: 6 * 60 * 60 },
  })

  if (!response.ok) {
    throw new Error(`Could not fetch CORE statistics: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<CoreStatistics>
}
