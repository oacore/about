'use client'

import { Layout, Section } from '@core/core-ui'
import { useEffect } from 'react'

import FooterSection from '@components/FooterSection'
import Markdown from '@components/Markdown/Markdown'
import MemberForm from '@features/member/form/MemberForm'
import type { MemberPageData } from '@features/member/types'
import { useMembershipStore } from '@stores/membership'
import { useMembershipPriceStore } from '@stores/membership-price'
import { patchStats } from '@utils/patchStats'

import styles from './styles.module.css'

type MemberPageProps = {
  data: MemberPageData
}

const MemberPage = ({ data }: MemberPageProps) => {
  const { form, box, additionalInfo, discountInfo, title, caption, planName } = data
  const reset = useMembershipStore((state) => state.reset)
  const setData = useMembershipStore((state) => state.setData)
  const resetPrice = useMembershipPriceStore((state) => state.reset)

  useEffect(() => {
    reset()
    resetPrice()
    setData({ planName })
  }, [planName, reset, resetPrice, setData])

  const isStartingPlan = planName === 'starting'

  return (
    <Layout className={styles.container}>
      <Markdown className={styles.title}>{patchStats(title, { planName })}</Markdown>
      <Markdown className={styles.caption}>{caption}</Markdown>
      <Section className={styles.formSection} id={form.id}>
        <MemberForm form={form} planName={planName} />
      </Section>
      {!isStartingPlan ? (
        <Section>
          <p className={styles.additionalInfo}>
            <span>{additionalInfo.icon}</span>
            {additionalInfo.text}
          </p>
          <p className={styles.additionalInfo}>
            <span>{discountInfo.icon}</span>
            {discountInfo.text}
          </p>
        </Section>
      ) : null}
      <FooterSection action={{ href: box.action.url, text: box.action.active }} content={box.description} />
    </Layout>
  )
}

export default MemberPage
