import collaborationIcon from './assets/collaboration.svg'
import datasetIcon from './assets/dataset.svg'
import headerBanner from './assets/header.svg'
import shareIcon from './assets/share.svg'

export const RESEARCH_HEADER_BANNER = headerBanner

export const RESEARCH_JOIN_CARD_ICONS = [datasetIcon, shareIcon, collaborationIcon] as const

export const RESEARCH_JOIN_CARD_ALTS = [
  'CORE dataset and API',
  'Share and learn',
  'Collaboration and joint funding',
] as const
