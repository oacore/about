import React from 'react'
import { Button } from '@oacore/design/lib/elements'

import styles from './styles.module.scss'

import { Markdown, Page } from 'components'
import textData from 'data/membership.yml'
import { Layout, MembershipTable, Section } from 'design-v2/components'

const MembershipPage = () => {
  const [visibleTable, setVisibleTable] = React.useState(true)

  const toggleVisibleTable = React.useCallback(() => {
    setVisibleTable(!visibleTable)
  })

  return (
    <Page
      title={textData.header.title}
      description={textData.header.description}
    >
      <Layout>
        <Section id="metadata" className={styles.header}>
          <div>
            <h1>{textData.header.title}</h1>
            <Markdown className={styles.description}>
              {textData.header.description}
            </Markdown>
            {textData.header.actions.map((action) => (
              <Button
                href={action.url}
                variant={action.variant}
                key={action.caption}
              >
                {action.caption}
              </Button>
            ))}
          </div>
          <div className={styles.logoContainer}>
            <img src={textData.header.logo} alt="logo" />
          </div>
        </Section>
        <Section id="plans" className={styles.plans}>
          <h4>{textData.plans.title}</h4>
          <div className={styles.plansWrapper}>
            {textData.plans.cards.map((plan) => (
              <article className={styles.card} key={plan.title}>
                <div className={styles.cardHeader}>
                  <h5>{plan.title}</h5>
                  {plan.caption && (
                    <span className={styles.cardHeaderCaption}>
                      {plan.caption}
                    </span>
                  )}
                </div>
                <div className={styles.divider} />
                <div className={styles.cardContent}>
                  {plan.box && (
                    <div className={styles.cardBox}>
                      <Markdown className={styles.cardBoxTitle}>
                        {plan.box.title}
                      </Markdown>
                      <Markdown className={styles.cardBoxCaption} tag="span">
                        {plan.box.caption}
                      </Markdown>
                    </div>
                  )}
                  <Markdown className={styles.advantages}>
                    {plan.advantages}
                  </Markdown>
                  <div className={styles.cardContentButton}>
                    <Button variant="contained">{plan.action.title}</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
        <Section id="comparison-table">
          <div className={styles.box}>
            <Markdown className={styles.boxText}>
              {textData.box.description}
            </Markdown>
            <div className={styles.boxButton}>
              <Button variant="outlined" onClick={toggleVisibleTable}>
                {visibleTable
                  ? textData.box.action.active
                  : textData.box.action.default}
              </Button>
            </div>
          </div>
        </Section>
        {visibleTable && (
          <MembershipTable textData={textData.comparisonTable} />
        )}
      </Layout>
    </Page>
  )
}
export default MembershipPage
