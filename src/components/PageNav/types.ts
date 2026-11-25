export type PageNavLink = {
  href: string
  title: string
}

export type PageNavSourceLink = {
  href?: string
  id?: string
  title?: string
  link?: string
  caption?: string
}

export type PageNavVariant = 'primary' | 'muted'

export type PageNavProps = {
  links?: PageNavSourceLink[]
  ariaLabel: string
  className?: string
  variant?: PageNavVariant
}
