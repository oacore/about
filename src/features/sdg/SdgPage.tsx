'use client'

import { Layout, Section, Video } from '@core/core-ui'
import Header from '@components/Header/Header'
import HowItWorksSection from '@components/HowItWorksSection'
import { PdfUpload } from '@components/PdfUpload'
import { SDG_TYPES } from '@features/sdg/constants'
import type { SdgPageData } from '@features/sdg/types'
import { usePdfUpload } from '@hooks/usePdfUpload'

import styles from './styles.module.css'

const SDG_VIDEO_SRC = 'https://www.youtube.com/embed/_r16dXOGdWA'
const SDG_VIDEO_TITLE = 'sdg labels'

type SdgPageProps = {
  data: SdgPageData
}

const SdgPage = ({ data }: SdgPageProps) => {
  const { uploadResult, loading, handleResetResults, handleUploadPdf } = usePdfUpload({
    variant: 'sdg',
  })

  const header = data.header?.header
  const upload = data.upload?.upload
  const howItWorks = data.howItWorks?.howItWorks

  return (
    <Layout className={styles.sponsorshipMainWrapper}>
      {header ? (
        <Header
          className={styles.header}
          contentClassName={styles.headerContent}
          demo={header.subTitle}
          description={header.description}
          descriptionClassName={styles.headerDescription}
          id="header"
          image={header.image}
          logoAlt="logo"
          logoWrapClassName={styles.headerLogoWrap}
          title={header.title}
          titleClassName={styles.headerTitle}
        />
      ) : null}

      <Section className={styles.uploadSection} id="upload">
        <PdfUpload
          data={upload}
          loading={loading}
          onResetResults={handleResetResults}
          sdgTypes={SDG_TYPES}
          uploadPdf={handleUploadPdf}
          uploadResults={uploadResult}
          variant="sdg"
        />
      </Section>

      {howItWorks ? (
        <HowItWorksSection className={styles.howItWorks} data={howItWorks} id="purpose" />
      ) : null}

      <Section className={styles.videoSection} id="video">
        <Video src={SDG_VIDEO_SRC} tag="p" title={SDG_VIDEO_TITLE} />
      </Section>
    </Layout>
  )
}

export default SdgPage
