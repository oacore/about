'use client'

import { Layout, Section } from '@core/core-ui'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import OrganisationsFee from '@features/member/starting/OrganisationsFee'
import VerifyAnonymous from '@features/member/starting/VerifyAnonymous'
import VerifyRegistered from '@features/member/starting/VerifyRegistered'
import {
  TYPE_REPO_ANONYMOUS,
  TYPE_REPO_HAS_ACCOUNT,
  TYPE_REPO_HAS_EMAIL,
} from '@features/member/types'
import type {
  MemberSuccessContent,
  MembershipData,
  SubmitStartingPayload,
} from '@features/member/types'
import { useMembershipStore } from '@stores/membership'

import styles from './styles.module.css'

type MemberSuccessPageProps = {
  textData: MemberSuccessContent
}

const MemberSuccessPage = ({ textData }: MemberSuccessPageProps) => {
  const setData = useMembershipStore((state) => state.setData)
  const createMembershipPayment = useMembershipStore((state) => state.createMembershipPayment)
  // Snapshot of the request taken once after hydration. createMembershipPayment() resets the
  // store on success, so reading live state would unmount the block and lose "Request sent".
  const [membership, setMembership] = useState<MembershipData | null>(null)

  useEffect(() => {
    const finishHydration = () => {
      setMembership((current) => current ?? useMembershipStore.getState().data)
    }

    const unsubscribe = useMembershipStore.persist.onFinishHydration(finishHydration)
    void useMembershipStore.persist.rehydrate()

    if (useMembershipStore.persist.hasHydrated()) {
      finishHydration()
    }

    return unsubscribe
  }, [])

  const handleSubmitStarting = ({ evt, roleInOrganisation }: SubmitStartingPayload) => {
    evt.preventDefault()

    if (roleInOrganisation) {
      setData({ roleInOrganisation })
    }

    void createMembershipPayment()
  }

  return (
    <Layout className={styles.success}>
      <Section>
        <h2 className={styles.statusTitle}>{textData.title}</h2>
        <p className={styles.description}>{textData.description}</p>
        <Image
          alt={textData.title}
          className={styles.image}
          height={275}
          src={textData.image.url}
          unoptimized
          width={275}
        />
        {membership &&
        textData.requestStatus.hasAccount &&
        membership.typeRepository === TYPE_REPO_HAS_ACCOUNT ? (
          <VerifyRegistered
            emailAdministrator={membership.emailDashboard}
            item={textData.requestStatus.hasAccount}
            onSubmitStarting={handleSubmitStarting}
            repoName={membership.repoName}
          />
        ) : null}
        {membership &&
        textData.requestStatus.hasEmail &&
        membership.typeRepository === TYPE_REPO_HAS_EMAIL ? (
          <OrganisationsFee
            emailAdministrator={membership.emailDashboard}
            item={textData.requestStatus.hasEmail}
            onSubmitStarting={handleSubmitStarting}
          />
        ) : null}
        {membership &&
        textData.requestStatus.anonymous &&
        membership.typeRepository === TYPE_REPO_ANONYMOUS ? (
          <VerifyAnonymous
            item={textData.requestStatus.anonymous}
            onSubmitStarting={handleSubmitStarting}
          />
        ) : null}
      </Section>
    </Layout>
  )
}

export default MemberSuccessPage
