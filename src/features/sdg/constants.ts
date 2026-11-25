import all from '@features/sdg/assets/icons/allSdg.svg'
import belowWater from '@features/sdg/assets/icons/belowWater.svg'
import climate from '@features/sdg/assets/icons/climate.svg'
import communities from '@features/sdg/assets/icons/communities.svg'
import economic from '@features/sdg/assets/icons/economic.svg'
import education from '@features/sdg/assets/icons/education.svg'
import energy from '@features/sdg/assets/icons/energy.svg'
import genderEquality from '@features/sdg/assets/icons/genderEquality.svg'
import goal from '@features/sdg/assets/icons/goal.svg'
import health from '@features/sdg/assets/icons/health.svg'
import hunger from '@features/sdg/assets/icons/hunger.svg'
import infrastructure from '@features/sdg/assets/icons/infrastructure.svg'
import inequalitie from '@features/sdg/assets/icons/inequalitie.svg'
import land from '@features/sdg/assets/icons/land.svg'
import peace from '@features/sdg/assets/icons/peace.svg'
import poverty from '@features/sdg/assets/icons/poverty.svg'
import production from '@features/sdg/assets/icons/production.svg'
import water from '@features/sdg/assets/icons/water.svg'

import type { SdgType } from '@components/PdfUpload/types'

export const SDG_TYPES: SdgType[] = [
  { id: 'all', title: 'All', icon: all, color: '#B75400' },
  { id: 'SDG01', title: 'No Poverty', icon: poverty, color: '#E5243B' },
  { id: 'SDG02', title: 'Zero Hunger', icon: hunger, color: '#DDA63A' },
  { id: 'SDG03', title: 'Good Health and Well-being', icon: health, color: '#4C9F38' },
  { id: 'SDG04', title: 'Quality Education', icon: education, color: '#C5192D' },
  { id: 'SDG05', title: 'Gender Equality', icon: genderEquality, color: '#FF3A21' },
  { id: 'SDG06', title: 'Clean Water and Sanitation', icon: water, color: '#26BDE2' },
  { id: 'SDG07', title: 'Affordable and Clean Energy', icon: energy, color: '#FCC30B' },
  { id: 'SDG08', title: 'Decent Work and Economic Growth', icon: economic, color: '#A21942' },
  {
    id: 'SDG09',
    title: 'Industry, Innovation and Infrastructure',
    icon: infrastructure,
    color: '#FD6925',
  },
  { id: 'SDG10', title: 'Reduced Inequality', icon: inequalitie, color: '#DD1367' },
  {
    id: 'SDG11',
    title: 'Sustainable Cities and Communities',
    icon: communities,
    color: '#FD9D24',
  },
  {
    id: 'SDG12',
    title: 'Responsible Consumption and Production',
    icon: production,
    color: '#BF8B2E',
  },
  { id: 'SDG13', title: 'Climate Action', icon: climate, color: '#3F7E44' },
  { id: 'SDG14', title: 'Life Below Water', icon: belowWater, color: '#0A97D9' },
  { id: 'SDG15', title: 'Life on Land', icon: land, color: '#56C02B' },
  {
    id: 'SDG16',
    title: 'Peace, Justice and Strong Institutions',
    icon: peace,
    color: '#00689D',
  },
  { id: 'SDG17', title: 'Partnerships for the Goals', icon: goal, color: '#19486A' },
]
