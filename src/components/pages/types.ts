import type { Country, RegistrationCopy } from '@features/registration/types'

export type ServicePageAction = {
  caption?: string
  title?: string
  url: string
  variant?: 'contained' | 'outlined' | 'text'
  target?: string
  download?: boolean
  primary?: boolean
  hint?: string
}

export type ServicePageVideo = {
  src: string
  title: string
  image?: string
}

export type ServicePageProps = {
  id?: string
  keywords?: string
  hideButtons?: boolean
  actionButton?: ServicePageAction
  features?: {
    features: Array<{ title: string; description: string }>
  }
  header?: {
    header: {
      title?: string
      description?: string
      image?: string
      icon?: string
      label?: string
      actions?: ServicePageAction[]
    }
  }
  headerLink?: {
    headerLink: Array<{ href: string; link: string }>
  }
  howItWorks?: {
    howItWorks: {
      title: string
      description: string
      image?: string
      video?: ServicePageVideo
      action?: ServicePageAction | ServicePageAction[]
    }
  }
  howItWorksDescription?: {
    howItWorksDescription: {
      description: string
      main: {
        items: Array<{ title: string; content: string }>
        note?: string
        action: ServicePageAction
      }
    }
  }
  logos?: {
    logos: {
      items: Array<{ img: string; alt?: string; full?: boolean; background?: boolean }>
      action: { caption: string; url: string }
    }
  }
  main?: {
    main: {
      items: Array<{ title: string; content: string }>
      note?: string
      action: ServicePageAction
    }
  }
  meta?: {
    id?: string
    title?: string
    tagline?: string
  }
  moreAboutUs?: {
    institutionBenefit: {
      title: string
      item: Array<{
        title: string
        description: string
        user: string
        position: string
        img: string
        action?: { title: string; url: string }
      }>
    }
  }
  register?: {
    form: {
      title: string
      subtitle: string
      helper?: string
      action: string
      note?: string
    }
  }
  relatedServices?: {
    relatedServices: {
      title: string
      services?: Array<{ title: string; picture: string; url: string }>
    }
  }
  stats?: {
    stats: {
      items: Array<{
        title: string
        count: string | number
        caption: string
        url?: string
        badge?: string
      }>
      action?: ServicePageAction
    }
  }
  statistics?: {
    statistics: Record<string, string | number>
  }
  testimonials?: {
    testimonials: Array<{
      content: string
      author: { name: string; role: string; picture: string }
      action?: ServicePageAction
    }>
  }
  whatIsIncluded?: {
    whatIsIncluded: {
      title: string
      content: string
      list?: Array<{ item: string; video?: ServicePageVideo }>
      action?: { caption: string; url: string }
      image?: string
    }
  }
  additional?: {
    additional: {
      id?: string
      title: string
      content: string
      image: string
      actions: ServicePageAction[]
    }
  }
  benefits?: {
    benefits: {
      title: string
      items: Array<{ title: string; icon: string; description: string }>
    }
  }
  tutorials?: {
    materials: {
      title: string
      cards: Array<{
        key: string
        title: string
        image: string
        video?: ServicePageVideo
        action: { caption: string; url: string; target?: string }
      }>
    }
  }
  certificates?: {
    certificates: Array<{ title: string; description: string; picture: string }>
  }
  applicationProcess?: {
    applicationProcess: {
      title: string
      steps: Array<{ step: string; title: string; description: string }>
    }
  }
  contact?: {
    title: string
    caption: string
    image: string
    action: { caption: string; url: string }
  }
  registrationCopy?: RegistrationCopy
  countries?: Country[]
  turnstileSiteKey?: string
}
