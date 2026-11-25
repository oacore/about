export type HomeSlide = {
  title: string
  image: string
  label: string
  action: string
  actionLabel?: string
  description?: string
  statisticAction?: string
  statisticActionLabel?: string
}

export type HomeFeature = {
  title: string
  description: string
  picture: string
  status?: string
  url?: string
  titleUrl?: string
}

export type HomeJoinItem = {
  caption: string
  url: string
  picture: string
}

export type HomeAction = {
  title: string
  url: string
}

export type HomeSpotlight = {
  image: string
  title: string
  description: string
  action: HomeAction
}

export type HomeAudience = {
  title: string
  description: string
  logo: string
  content: string
  author: string
  extraText?: string
}

export type HomeService = {
  title: string
  subtitle: string
  imgUrl: string
  action: string
}

export type HomeUserLogo = {
  img: string
  alt: string
  full?: boolean
  background?: boolean
}

export type HomeUserGroup = {
  id: string
  title: string
  testimonial: {
    id?: string
    content: string
    author: {
      name: string
      role?: string
      picture?: string
    }
  }
  logos: HomeUserLogo[]
  action: {
    caption: string
    url: string
  }
}

export type HomePageData = {
  title: string
  description: string
  keywords?: string
  searchPlaceholder: string
  posiImage: string
  slides: HomeSlide[]
  features: {
    title?: string
    hidden: boolean
    items: HomeFeature[]
  }
  join: {
    title: string
    subTitle?: string
    subPart?: string
    items: HomeJoinItem[]
  }
  oai: HomeSpotlight
  testimonials: {
    title: string
    subtitle?: string
    actionLabel: string
    action: string
    items: HomeAudience[]
  }
  characteristics: {
    title: string
    description: string
    action: string
    href: string
    image: string
  }
  services: {
    title: string
    actionLabel: string
    action: string
    items: HomeService[]
  }
  ref: HomeSpotlight
  users: HomeUserGroup[]
}
