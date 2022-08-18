import React, { useRef, useState } from 'react'
import { Button } from '@oacore/design/lib/elements'
import { useOutsideClick } from '@oacore/design/lib/hooks'

import styles from './styles.module.scss'
import DetailsTable from './details-table'

import { Markdown } from 'components'
import { Layout, Section } from 'design-v2/components'

const DetailsBox = ({ title, description }) => {
  const [open, setOpen] = useState(false)
  const boxRef = useRef(null)

  const toggleClick = (e) => {
    e.preventDefault()
    setOpen(!open)
  }

  const onClose = () => setOpen(false)

  useOutsideClick(boxRef, onClose)

  return (
    <details
      {...(open ? { open: true } : {})}
      className={styles.box}
      ref={boxRef}
    >
      <summary className={styles.title} onClick={toggleClick}>
        <Markdown>{title}</Markdown>
      </summary>
      <Markdown
        onClick={(e) => e.stopPropagation()}
        className={styles.description}
      >
        {description}
      </Markdown>
    </details>
  )
}

const Card = ({ plan }) => (
  <article className={styles.plan} key={plan.title}>
    <div className={styles.planHeader}>
      <h5>{plan.title}</h5>
      {plan.caption && (
        <span className={styles.planHeaderCaption}>{plan.caption}</span>
      )}
    </div>
    <div className={styles.divider} />
    <div className={styles.planContent}>
      {plan.box && (
        <div className={styles.planBox}>
          <Markdown className={styles.planBoxTitle}>{plan.box.title}</Markdown>
          <Markdown className={styles.planBoxCaption} tag="span">
            {plan.box.caption}
          </Markdown>
        </div>
      )}
      <ul className={styles.planAdvantages}>
        {plan.advantages.map((advantage) => (
          <li key={advantage.title}>
            <DetailsBox
              title={advantage.title}
              description={advantage.description}
            />
          </li>
        ))}
      </ul>
      <div className={styles.planContentButton}>
        <Button variant="contained" href={plan.action.url}>
          {plan.action.title}
        </Button>
      </div>
    </div>
  </article>
)

const MembershipPageTemplate = ({ data }) => (
  <Layout>
    <Section id="metadata" className={styles.header}>
      <div>
        <h2 className={styles.title}>
          {data.header.title}
          {data.header.extra && (
            <span className={styles.extraText}>{data.header.extra}</span>
          )}
        </h2>

        <Markdown className={styles.description}>
          {data.header.description}
        </Markdown>
        <div className={styles.buttonGroup}>
          {data.header.actions.map((action) => (
            <Button
              href={action.url}
              variant={action.variant}
              key={action.caption}
              download={action.download}
            >
              {action.caption}
            </Button>
          ))}
        </div>
      </div>
      <div className={styles.logoContainer}>
        <img src={data.header.logo} alt="logo" />
      </div>
    </Section>
    <Section id="plans" className={styles.plans}>
      <h4>{data.plans.title}</h4>
      <div className={styles.plansWrapper}>
        {data.plans.cards.map((plan) => (
          <Card key={plan.title} plan={plan} />
        ))}
      </div>
    </Section>
    <DetailsTable
      data={{
        box: data.box,
        comparisonTable: data.comparisonTable,
      }}
    />
    <Section id="support">
      <h4>{data.support.title}</h4>
      <Markdown className={styles.supportText}>
        {data.support.description}
      </Markdown>
      <div className={styles.cards}>
        {data.support.cards.map((card) => (
          <div key={card.title} className={styles.card}>
            <img src={card.img} alt={card.title} className={styles.cardImage} />
            <h5 className={styles.cardTitle}>{card.title}</h5>
            <p className={styles.cardCaption}>{card.caption}</p>
          </div>
        ))}
        <div className={styles.cardMembers}>
          <h5 className={styles.cardMembersTitle}>
            {data.support.members.title}
          </h5>
          {data.support.members.children.map((member) => (
            <div className={styles.logoContainer} key={member.name}>
              <span>
                <img src={`/images/logos/${member.logo}`} alt={member.name} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  </Layout>
)
export default MembershipPageTemplate
