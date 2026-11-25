'use client'

import BecomeMemberSection from '@components/BecomeMemberSection'
import Header from '@components/Header/Header'
import HowItWorksSection from '@components/HowItWorksSection'
import { PdfUpload } from '@components/PdfUpload'
import { Layout, Section } from '@components/layout'
import type { DataAvailabilityPageData } from '@features/data-availability/types'
import { usePdfUpload } from '@hooks/usePdfUpload'

import styles from './styles.module.css'

type DataAvailabilityPageProps = {
  data: DataAvailabilityPageData
}

const DataAvailabilityPage = ({ data }: DataAvailabilityPageProps) => {
  const { uploadResult, loading, handleResetResults, handleUploadPdf } = usePdfUpload({
    variant: 'data-availability',
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
          variant="data-availability"
        />
      </Section>

      {howItWorks ? (
        <HowItWorksSection className={styles.howItWorks} data={howItWorks} id="purpose" />
      ) : null}

      {becomeMember ? (
        <BecomeMemberSection className={styles.serviceSection} data={becomeMember} />
      ) : null}
    </Layout>
  )
}

export default DataAvailabilityPage
