import React, { useState } from 'react'
import { Row, Col } from 'reactstrap'
import classNames from '@oacore/design/lib/utils/class-names'

import Markdown from '../markdown'
import { Button } from '../elements'
import { Section, Content } from '../content'
import Testimonial from '../testimonial'
import styles from './endorsements.module.scss'

const filterOut = (what, from) => from.filter((item) => !what.includes(item))
const toTestimonial = (organization) => ({
  ...organization.testimonial,
  organization,
})

const Logo = ({ logo, name, url, className = '', ...restProps }) => (
  <span
    className={`${styles.testimonialSectionOrganizationsItem} ${className}`}
    title={name}
    {...restProps}
  >
    <img src={`/images/logos/${logo}`} alt={name} />
  </span>
)

const Preview = ({ organizations }) => {
  const quoted = organizations
    .filter(({ testimonial }) => testimonial != null)
    .slice(0, 1)
  const rest = filterOut(quoted, organizations).slice(0, 6)
  const [main] = quoted.map(toTestimonial)

  return (
    <>
      <Testimonial key={main.id} className="card card-body" avatar {...main} />

      <Row className={styles.testimonialSectionOrganizations}>
        {rest.map((org) => (
          <Col xs="6" sm="4" lg="2">
            <Logo key={org.id} {...org} />
          </Col>
        ))}
      </Row>
    </>
  )
}

const List = ({ organizations }) => {
  const quoted = organizations.filter(({ testimonial }) => testimonial != null)
  const rest = filterOut(quoted, organizations)

  return (
    <>
      {quoted.map((organization) => {
        const testimonial = toTestimonial(organization)

        if (testimonial.author.name !== null) {
          return (
            <Testimonial
              key={testimonial.id}
              className="card card-body"
              avatar
              {...testimonial}
            />
          )
        }
        return <> </>
      })}

      <div className={styles.testimonialSectionOrganizations}>
        {rest.map((org) => (
          <Col xs="6" sm="4" lg="2">
            <Logo key={org.id} {...org} />
          </Col>
        ))}
      </div>
    </>
  )
}

const TestimonialsSection = ({
  title,
  items: organizations,
  level = 2,
  className = '',
  ...restProps
}) => {
  // This is a workaround to preserve the correct scroll position when
  // the user clicks on the button.
  //
  // The `iteration` is passed as a key to the toggle-button. If the key does
  // not differ, React does not create new element and the browser keeps
  // the item in the same place. If the key differs, React removes the element
  // and creates a new one, so the button looses focus.
  //
  // We preserve the element if the user collapses the list, so the browser
  // scrolls the page up with the button. If the user expands the list,
  // we change the key so we 'remove' the button and the page expands
  // to the bottom.
  const [iteration, setIteration] = useState(0)
  const expanded = Boolean(iteration % 2)

  const toggle = () => {
    setIteration(iteration + 1)
  }

  const Heading = `h${level}`

  return (
    <Section
      className={classNames.use(styles.testimonialsSection).join(className)}
      {...restProps}
    >
      <Heading>{title}</Heading>
      {!expanded ? (
        <>
          <Preview organizations={organizations} />
          <p className="mb-0">
            <Button key={iteration} outline onClick={toggle}>
              Show all
            </Button>
          </p>
        </>
      ) : (
        <>
          <List organizations={organizations} />
          <p className="mb-0">
            <Button key={iteration + 1} outline onClick={toggle}>
              Collapse
            </Button>
          </p>
        </>
      )}
    </Section>
  )
}

const EndorsementsSection = ({
  id,
  title,
  illustration,
  description,
  subtitle,
  action,
  organizations,
  level = 2,
  ...restProps
}) => {
  const Heading = `h${level}`

  return (
    <div id={id} {...restProps}>
      <div className={styles.testimonialSectionIllustration}>
        <Content className={styles.testimonialSectionIllustrationContent}>
          <Heading>{title}</Heading>
          <Markdown>{description}</Markdown>
          <p className="font-weight-bold">{action.title}</p>
          <Button color="primary" href={action.url}>
            {action.name}
          </Button>
        </Content>

        <div className={styles.testimonialSectionIllustrationContainer}>
          {illustration && (
            <img
              className={styles.testimonialSectionIllustrationImg}
              src={`/images/illustrations/${illustration}`}
              alt=""
              aria-hidden
            />
          )}
        </div>
      </div>

      <TestimonialsSection
        title={subtitle}
        items={organizations}
        level={level + 1}
      />
    </div>
  )
}

export default EndorsementsSection
