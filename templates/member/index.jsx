import React from 'react'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'
import PaymentDefailsForm from './form'

import { Layout, Section, TextBox } from 'design-v2/components'
import { useStore, observe } from 'store'
import { patchStats } from 'components/utils'
import { Markdown } from 'components'

const PaymentPageTemplate = observe(({ textData, planName }) => {
  const { form, box, additionalInfo, discountInfo, title, caption } = textData

  const { membership } = useStore()

  return (
    <Layout className={styles.container}>
      <Markdown className={styles.title}>
        {patchStats(title, membership.data)}
      </Markdown>
      <Markdown
        className={classNames.use(styles.caption).join(styles.textCenter)}
      >
        {caption}
      </Markdown>
      <Section id={form.id} className={styles.formSection}>
        <PaymentDefailsForm form={form} />
      </Section>
      <Section>
        {planName !== 'starting' && (
          <p className={styles.additionalInfo}>
            <span>{additionalInfo.icon}</span>
            {additionalInfo.text}
          </p>
        )}
        {planName !== 'starting' && (
          <p className={styles.additionalInfo}>
            <span>{discountInfo.icon}</span>
            {discountInfo.text}
          </p>
        )}
        <TextBox
          className={styles.box}
          description={box.description}
          buttonCaption={box.action.active}
          buttonUrl={box.action.url}
        />
      </Section>
    </Layout>
  )
})

export default PaymentPageTemplate
