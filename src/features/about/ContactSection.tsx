'use client'

import Collapsed from '@components/Collapsed/Collapsed'
import Markdown from '@components/Markdown/Markdown'
import { Section } from '@components/layout'
import type { AboutContacts } from '@features/about/types'

import styles from './styles.module.css'

type ContactSectionProps = {
  contacts: AboutContacts
}

const ContactSection = ({ contacts }: ContactSectionProps) => {
  if (!contacts.shortTitle && !contacts.cases.length) {
    return null
  }

  return (
    <Section id="contact">
      {contacts.shortTitle ? <h2 className={styles.sectionTitle}>{contacts.shortTitle}</h2> : null}
      {contacts.cases.map((item) => (
        <Collapsed id={item.slug} key={item.slug} title={item.purpose}>
          {item.description ? <Markdown>{item.description}</Markdown> : null}
        </Collapsed>
      ))}
      {contacts.outro ? <Markdown>{contacts.outro}</Markdown> : null}
    </Section>
  )
}

export default ContactSection
