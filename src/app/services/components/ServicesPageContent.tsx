'use client'

import type { ServiceSection } from '../types'

import FeaturesSection from './FeaturesSection'

import styles from '../page.module.css'

type ServicesPageContentProps = {
  sections: ServiceSection[]
}

const ServicesPageContent = ({ sections }: ServicesPageContentProps) => (
  <div className={styles.wrapper}>
    {sections.map((section) => (
      <FeaturesSection key={section.id} {...section} />
    ))}
  </div>
)

export default ServicesPageContent
