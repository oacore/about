import React from 'react'
import { Col, Row } from 'reactstrap'

import styles from './confirm_registration.module.scss'

import { Page, Section } from 'components'
import registrationData from 'data/confirm_registration.yml'

const confirmRegistrationApi = () => (
  <Page
    title={registrationData.title}
    description={registrationData.description}
    keywords={registrationData.keywords}
  >
    <Section
      id="confirm_registration"
      caption="confirm_registration"
      className={styles.confirmRegistration}
    >
      <Row>
        <Col md="12">
          <img
            src={registrationData.api.picture}
            alt={registrationData.api.title}
            className={styles.image}
          />
          <div className={styles.title}>{registrationData.api.title}</div>
          <div className={styles.text}>{registrationData.api.info}</div>
          <a
            title={registrationData.api.button.text}
            className={styles.buttonCustom}
            href={registrationData.api.button.link}
          >
            {registrationData.api.button.text}
          </a>
        </Col>
      </Row>
    </Section>
  </Page>
)

export default confirmRegistrationApi
