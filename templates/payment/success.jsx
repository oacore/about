import React from 'react'
import { Button } from '@oacore/design/lib/elements'

import styles from './styles.module.scss'

import { Layout, Section } from 'design-v2/components'

const PaymentSuccessPageTemplate = ({ textData }) => (
  <Layout className={styles.success}>
    <Section>
      <h2>{textData.title}</h2>
      <p className={styles.description}>{textData.description}</p>
      <img
        className={styles.image}
        src={textData.image.url}
        alt={textData.title}
      />
      <span className={styles.caption}>{textData.image.caption}</span>
      <Button variant="contained" href={textData.button.url}>
        {textData.button.caption}
      </Button>
    </Section>
  </Layout>
)

export default PaymentSuccessPageTemplate
