export type EndorsementAuthor = {
  name: string
  role?: string
  picture?: string
}

export type EndorsementTestimonial = {
  id?: string
  content: string
  author: EndorsementAuthor
}

export type EndorsementOrganization = {
  id?: string
  name: string
  url?: string
  logo?: string
  full?: boolean
  testimonial?: EndorsementTestimonial
}

export type EndorsementAction = {
  title?: string
  name: string
  url: string
}

export type EndorsementSection = {
  id: string
  title: string
  caption?: string
  description?: string
  illustration?: string
  action?: EndorsementAction
  organizations: EndorsementOrganization[]
  testimonialsTitle?: string
}

export type EndorsementsPageData = {
  title?: string
  description?: string
  keywords?: string | string[]
  sections: EndorsementSection[]
}
