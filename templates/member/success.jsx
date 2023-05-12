import React from 'react'

import styles from './styles.module.scss'
import VerifyRegisteredTemplate from './starting/verify-registered'
import OrganisationsFeeTemplate from './starting/organisations_fee'
import VerifyAnonymousTemplate from './starting/verify_anonymous'

import { Layout, Section } from 'design-v2/components'

export const TYPE_REPO_HAS_ACCOUNT = 'has_account'
export const TYPE_REPO_HAS_EMAIL = 'has_email'
export const TYPE_REPO_ANONYMOUS = 'anonymous'

const PaymentSuccessPageTemplate = ({
  textData,
  membership,
  handleSubmitStarting,
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
        textData.requestStatus.hasAccount &&
        membership.typeRepository === TYPE_REPO_HAS_ACCOUNT && (
          <VerifyRegisteredTemplate
            item={textData.requestStatus.hasAccount}
            repoName={membership.repoName}
            emailAdministrator={membership.emailDashboard}
            handleSubmitStarting={handleSubmitStarting}
          />
        )}

      {textData.requestStatus &&
        textData.requestStatus.hasEmail &&
        membership.typeRepository === TYPE_REPO_HAS_EMAIL && (
          <OrganisationsFeeTemplate
            item={textData.requestStatus.hasEmail}
            emailAdministrator={membership.emailDashboard}
            handleSubmitStarting={handleSubmitStarting}
          />
        )}

      {textData.requestStatus &&
        textData.requestStatus.anonymous &&
        membership.typeRepository === TYPE_REPO_ANONYMOUS && (
          <VerifyAnonymousTemplate
            item={textData.requestStatus.anonymous}
            handleSubmitStarting={handleSubmitStarting}
          />
        )}
    </Section>
  </Layout>
)

export default PaymentSuccessPageTemplate
