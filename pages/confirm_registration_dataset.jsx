import React from 'react'
import { Col, Row } from 'reactstrap'

import styles from './confirm_registration.module.scss'

import { Page, Section } from 'components'
import registrationData from 'data/confirm_registration.yml'

const confirmRegistrationDataset = () => (
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
            src={registrationData.dataset.picture}
            alt={registrationData.dataset.title}
            className={styles.image}
          />
          <div className={styles.title}>{registrationData.dataset.title}</div>
          <div className={styles.text}>{registrationData.dataset.info}</div>
          <a
            title={registrationData.dataset.button.text}
            className={styles.buttonCustom}
            href={registrationData.dataset.button.link}
          >
            {registrationData.dataset.button.text}
          </a>
        </Col>
      </Row>
    </Section>
  </Page>
)

export default confirmRegistrationDataset
