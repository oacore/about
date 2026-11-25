// Header navigation, as in the design system header (@oacore/design modules/header)

export type HeaderLink = { href: string; label: string }

export type HeaderGroup = { id: string; label: string; links: HeaderLink[] }

export type HeaderMenu = {
  id: string
  label: string
  /** Special layouts from the design system styles */
  variant: 'services' | 'support' | 'about'
  groups: HeaderGroup[]
}

export const HEADER_MENUS: HeaderMenu[] = [
  {
    id: 'services',
    label: 'Services',
    variant: 'services',
    groups: [
      {
        id: 'access-to-raw-data',
        label: 'Access to raw data',
        links: [
          { href: '/services/api', label: 'API' },
          { href: '/services/dataset', label: 'Dataset' },
          { href: '/services/fastsync', label: 'FastSync' },
        ],
      },
      {
        id: 'content-discovery',
        label: 'Content discovery',
        links: [
          { href: 'https://core.ac.uk/fresh-finds', label: 'FreshFinds' },
          { href: '/services/recommender', label: 'Recommender' },
          { href: '/services/discovery', label: 'Discovery' },
        ],
      },
      {
        id: 'oai-resolver',
        label: 'OAI identifiers',
        links: [{ href: '/documentation/oai-resolver', label: 'OAI Resolver' }],
      },
      {
        id: 'managing-content',
        label: 'Managing content',
        links: [
          { href: '/services/repository-dashboard', label: 'Dashboard' },
          { href: '/services/fair-certification', label: 'FAIR Certification' },
        ],
      },
      {
        id: 'contracts',
        label: 'Bespoke contracts',
        links: [{ href: '/services/consultancy', label: 'Consultancy services' }],
      },
    ],
  },
  {
    id: 'communities',
    label: 'Support us',
    variant: 'support',
    groups: [
      {
        id: 'membership',
        label: 'Support us',
        links: [
          { href: '/membership', label: 'Membership' },
          { href: '/sponsorship', label: 'Sponsorship' },
          { href: '/governance/research', label: 'Research partnership' },
        ],
      },
    ],
  },
  {
    id: 'about',
    label: 'About',
    variant: 'about',
    groups: [
      {
        id: 'about-us',
        label: 'About',
        links: [
          { href: '/about', label: 'About us' },
          { href: '/about#mission', label: 'Our mission' },
          { href: '/about#team', label: 'Team' },
          { href: '//blog.core.ac.uk', label: 'Blog' },
          { href: '/faq', label: 'FAQs' },
          { href: '/about#contact', label: 'Contact us' },
        ],
      },
      {
        id: 'community',
        label: 'Community governance',
        links: [
          { href: '/governance', label: 'Governance' },
          { href: '/governance/advisory', label: 'Advisory Board' },
          { href: '/governance/supporters', label: 'Board of supporters' },
          { href: '/governance/research', label: 'Research network' },
        ],
      },
      {
        id: 'innovations',
        label: 'Innovations',
        links: [
          { href: '/about/research-outputs', label: 'Our research' },
          { href: '/innovations/labs', label: 'Labs' },
        ],
      },
    ],
  },
]
