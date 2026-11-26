'use client'

import { Layout, Section, SectionNavLinks } from '@core/core-ui'
import Image from 'next/image'
import FooterSection from '@components/FooterSection'
import Header from '@components/Header/Header'
import RedirectAction from '@components/RedirectAction'
import ServiceMainWrapper from '@components/ServiceMainWrapper'
import type { RefPageData } from '@features/ref/types'
import ref from "../../assets/icons/ref.svg"

import RefContentSection from './RefContentSection'

import styles from './ref.module.css'

type RefPageProps = {
  data: RefPageData
}

const RefPage = ({ data }: RefPageProps) => {
  const header = data.header?.header
  const sections = data.sections?.sections ?? []
  const footer = data.footer

  const navLinks = header?.links?.content?.length ? (
    <div className={styles.sectionWrapper}>
      <Image
        alt="REF guidance"
        className={styles.headerImage}
        height={400}
        priority
        src={ref}
        width={600}
      />
      <SectionNavLinks
        ariaLabel="REF page sections"
        links={header.links.content}
      />
    </div>
  ) : undefined

  const headerActions = header?.actions

  return (
    <Layout>
      {header ? (
        <Header
          className={styles.header}
          contentClassName={styles.innerWrapper}
          description={header.description}
          descriptionClassName={styles.description}
          hideButtons
          id={header.id}
          navLinks={navLinks}
          navLinksClassName={styles.navLinksWrap}
          spacing
          title={header.title}
          titleClassName={styles.title}
        />
      ) : null}

      {headerActions ? (
        <div className={styles.redirections}>
          {headerActions.left ? (
            <RedirectAction
              action={headerActions.left.action}
              buttonType="default"
              className={styles.redirectLeft}
              text={headerActions.left.text}
              variant="split"
            />
          ) : null}
          {headerActions.right ? (
            <RedirectAction
              action={headerActions.right.action}
              className={styles.redirectRight}
              text={headerActions.right.text}
              variant="split"
            />
          ) : null}
        </div>
      ) : null}

      {sections.map((section) => (
        <RefContentSection key={section.id} {...section} />
      ))}

      {data.services?.length ? (
        <Section className={styles.servicesSection} id="services">
          <ServiceMainWrapper services={data.services} />
        </Section>
      ) : null}

      <FooterSection action={footer?.action} content={footer?.footer} variant="filled" />
    </Layout>
  )
}

export default RefPage
