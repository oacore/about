'use client'

import { Layout, Section } from '@core/core-ui'
import BecomeMemberSection from '@components/BecomeMemberSection'
import Header from '@components/Header/Header'
import HowItWorksSection from '@components/HowItWorksSection'
import { PdfUpload } from '@components/PdfUpload'
import type { RightsRetentionPageData } from '@features/rights-retention/types'
import { usePdfUpload } from '@hooks/usePdfUpload'

import styles from './styles.module.css'

type RightsRetentionPageProps = {
  data: RightsRetentionPageData
}

const RightsRetentionPage = ({ data }: RightsRetentionPageProps) => {
  const { uploadResult, loading, handleResetResults, handleUploadPdf } = usePdfUpload({
    variant: 'rights-retention',
  })

  const header = data.header?.header
  const upload = data.upload?.upload
  const howItWorks = data.howItWorks?.howItWorks
  const becomeMember = data.member?.becomeMember

  return (
    <Layout className={styles.sponsorshipMainWrapper}>
      {header ? (
        <Header
          demo={header.subTitle}
          description={header.description}
          id="header"
          logoAlt={header.title}
          title={header.title}
        />
      ) : null}

      <Section className={styles.uploadSection} id="upload">
        <PdfUpload
          data={upload}
          loading={loading}
          onResetResults={handleResetResults}
          uploadPdf={handleUploadPdf}
          uploadResults={uploadResult}
          variant="rights-retention"
        />
      </Section>

      {howItWorks ? <HowItWorksSection data={howItWorks} id="purpose" /> : null}

      {becomeMember ? <BecomeMemberSection data={becomeMember} /> : null}
    </Layout>
  )
}

export default RightsRetentionPage
