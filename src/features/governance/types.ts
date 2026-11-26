export type GovernanceConnection = {
  title?: string
  description?: string
}

export type GovernanceConnectionsDocument = {
  connections?: GovernanceConnection[]
  connectionsImage?: string
}

export type GovernanceHeaderInner = {
  id?: string
  title?: string
  description?: string
  caption?: string
  image?: string
}

export type GovernanceHeaderDocument = {
  header?: GovernanceHeaderInner
}

export type GovernanceFeature = {
  title?: string
  caption?: string
  url?: string
  variant?: 'contained' | 'outlined' | 'text'
  target?: string
}

export type GovernanceServicesDocument = {
  features?: GovernanceFeature[]
}

/** Shape returned by `getSections('governance')` (matches oacore/content `governance/` bundle). */
export type GovernancePageData = {
  header?: GovernanceHeaderDocument
  connections?: GovernanceConnectionsDocument
  services?: GovernanceServicesDocument
}

export type AdvisoryMember = {
  name: string
  role: string
  image?: string
  organisation: string
  country: string
  contribution: string
}

export type AdvisoryTable = {
  title?: string
  data?: AdvisoryMember[]
}

export type AdvisoryDocument = {
  table?: AdvisoryTable
}

export type AdvisoryMeta = {
  title?: string
  tagline?: string
}

/** Shape returned by `getSections('advisory')` (matches oacore/content `advisory/` bundle). */
export type AdvisoryPageData = {
  meta?: AdvisoryMeta
  header?: GovernanceHeaderDocument
  advisory?: AdvisoryDocument
}

export type SupportersNavLink = {
  href: string
  link: string
}

export type SupportersCardDescription = {
  title: string
  content: string
}

export type SupportersHowItWorksService = {
  title: string
  description: string
  image?: string
}

export type SupportersMaterialCard = {
  key: string
  image?: string
  title?: string
  action: {
    caption: string
    url: string
    target?: string
  }
}

export type SupportersDocument = {
  items?: {
    headerLink?: SupportersNavLink[]
    header?: GovernanceHeaderInner
    title?: string
    description?: string
    tagline?: string
    actions?: GovernanceFeature[]
    ourPrinciples?: {
      title?: string
      cardsDescription?: SupportersCardDescription[]
    }
    principles?: {
      image?: string
      description?: string
    }
    howItWorks?: {
      title?: string
      services?: SupportersHowItWorksService[]
    }
    supporters?: {
      title?: string
    }
  }
}

export type CommunityNewslettersDocument = {
  materials?: {
    title?: string
    cards?: SupportersMaterialCard[]
  }
}

/** Shape returned by `getSections('board-supporters')`. */
export type SupportersPageData = {
  meta?: AdvisoryMeta
  supporters?: SupportersDocument
  communityNewsletters?: CommunityNewslettersDocument
}

export type ResearchHeaderDocument = {
  id?: string
  title?: string
  citation?: string
  author?: string
}

export type ResearchJoinCardsDocument = {
  id?: string
  firstCardTitle?: string
  firstCardDescription?: string
  secondCardTitle?: string
  secondCardDescription?: string
  thirdCardTitle?: string
  thirdCardDescription?: string
}

export type ResearchMissionDocument = {
  id?: string
  description?: string
}

export type ResearchJoinUsDocument = {
  id?: string
  title?: string
  description?: string
  contact?: string
  actionLabel?: string
}

/** Shape returned by `getSections('community')` (matches oacore/content `community/` bundle). */
export type ResearchPageData = {
  header?: ResearchHeaderDocument
  joinCards?: ResearchJoinCardsDocument
  mission?: ResearchMissionDocument
  joinUs?: ResearchJoinUsDocument
}
