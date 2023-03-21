import React from 'react'

import styles from './styles.module.scss'
import VerifyRegisteredTemplate from './starting/verify-registered'
import OrganisationsFeeTemplate from './starting/organisations_fee'

import { Layout, Section } from 'design-v2/components'

export const TYPE_HAS_ACCOUNT = 'repository_has_dashboard_account'
export const TYPE_HAS_EMAIL =
  'repository_does_not_have_dashboard_account_but_have_email'
export const TYPE_DONT_HAVE_ACCOUNT_AND_EMAIL =
  'repository_does_not_have_dashboard_account_and_does_not_have_email'

const PaymentSuccessPageTemplate = ({
  textData,
  emailAdministrator,
  typeRepository,
}) => (
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
            {item.id === typeRepository &&
              TYPE_HAS_ACCOUNT === typeRepository && (
                <VerifyRegisteredTemplate
                  item={item}
                  emailAdministrator={emailAdministrator}
                />
              )}
            {item.id === typeRepository &&
              TYPE_HAS_EMAIL === typeRepository && (
                <OrganisationsFeeTemplate
                  item={item}
                  emailAdministrator={emailAdministrator}
                />
              )}
            {item.id === typeRepository &&
              TYPE_DONT_HAVE_ACCOUNT_AND_EMAIL === typeRepository && (
                <OrganisationsFeeTemplate
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
