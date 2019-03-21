// Central importing of all the CSS
import './bootstrap/bootstrap.scss'

import './layout/layout.scss'
import './content/content.scss'

import './footer/footer.scss'
import './header/header.scss'
import './search-navbar/search-navbar.scss'

import './accordion/accordion.scss'
import './blockquote/blockquote.scss'
import './key-feature/key-feature.scss'
import './logo/logo.scss'
import './pagination/pagination.scss'
import './team-member/team-member.scss'

import './repositories-browser/repositories-browser.scss'
import './repositories-map/repositories-map.scss'

import './highlight-section/highlight-section.scss'
import './hero/hero.scss'

import './switcher/switcher.scss'
import './logos-carousel/logos-carousel.scss'
import './testimonials-carousel/testimonials-carousel.scss'

import './cookies/cookies.scss'

// Base
export * from './elements'
export { default as Markdown } from './markdown'

// Layout
export * from './content'
export { default as Layout } from './layout'

// More complex layout
export { default as Header } from './header'
export { default as SearchNavbar } from './search-navbar'
export { default as Footer } from './footer'

// Elements
export { default as Logo } from './logo'
export { default as Blockquote } from './blockquote'
export { KeyFeature, KeyFeatureList } from './key-feature'
export { default as Testimonial } from './testimonial'
export { default as TeamMember } from './team-member'
export { default as Pagination } from './pagination'
export { default as Search } from './search'

// Complex elements
export { default as Accordion } from './accordion'
export { default as Collapsed } from './collapsed'

// Forms
export * from './cookies'

// Dynamic (carousels, switchers)
export { default as Switcher, SwitcherItem } from './switcher'
export { default as LogosCarousel } from './logos-carousel'
export { default as TestimonialsCarousel } from './testimonials-carousel'

// Dynamic data fetching
export { default as RepositoriesBrowser } from './repositories-browser'
export { default as RepositoriesMap } from './repositories-map'
export { default as RepositoriesSearch } from './repositories-search'
export { default as Blog } from './blog'

// Sections
export { default as Hero } from './hero'
export { default as HighlightSection } from './highlight-section'
