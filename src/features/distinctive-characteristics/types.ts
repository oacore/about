export type DistinctiveCharacteristic = {
  title?: string
  description?: string
}

export type DistinctiveCharacteristicsSection = {
  title?: string
  description?: string
  characteristics?: DistinctiveCharacteristic[]
}

export type DistinctiveCharacteristicsPosiItem = {
  item?: string
}

export type DistinctiveCharacteristicsPosi = {
  title?: string
  subTitle?: string
  description?: DistinctiveCharacteristicsPosiItem[]
}

/** Shape returned by `getSections('distinctive-characteristics')`. */
export type DistinctiveCharacteristicsPageData = {
  title?: string
  description?: string
  intro?: string
  sections?: DistinctiveCharacteristicsSection[]
  posi?: DistinctiveCharacteristicsPosi
}
