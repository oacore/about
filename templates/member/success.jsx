import React from 'react'

import styles from './styles.module.scss'
import VerifyRegisteredTemplate from './starting/verify-registered'

import { Layout, Section } from 'design-v2/components'

const PaymentSuccessPageTemplate = ({ textData, emailAdministrator }) => (
  <Layout className={styles.success}>
    <Section>
      <h2>{textData.title}</h2>
      <p className={styles.description}>{textData.description}</p>
      <img
        className={styles.image}
        src={textData.image.url}
        alt={textData.title}
      />

      {textData.requestStatus &&
        textData.requestStatus.map((item) => (
          <div>
            {item.id === 'verify_registered' && (
              <VerifyRegisteredTemplate
                item={item}
                emailAdministrator={emailAdministrator}
              />
            )}
          </div>
        ))}
    </Section>
  </Layout>
)

export default PaymentSuccessPageTemplate
