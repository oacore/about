import React, { useState } from 'react'
import { Button } from '@oacore/design/lib/elements'

import { Layout, Section } from '../../design-v2/components'
import styles from './styles.module.scss'
import { Markdown } from '../../components'
import FileUpload from '../../components/pdf-upload'

const RightsRetentionPageTemplate = ({ data }) => {
  const [uloadResult, setUploadResult] = useState('')
  const [rrsPdfLoading, setRrsPdfLoading] = useState(false)
  const uploadPdf = async (file) => {
    setRrsPdfLoading(true)
    try {
      const url = new URL(
        '/internal/data-providers/rights-retention-upload-file',
        process.env.API_URL
      )
      const fd = new FormData()
      fd.set('file', file)

      const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        body: fd,
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const result = await response.json()
      setUploadResult(result)
    } catch (error) {
      console.error(error)
    } finally {
      setRrsPdfLoading(false)
    }
  }

  return (
    <Layout className={styles.sponsorshipMainWrapper}>
      <Section id="header" className={styles.header}>
        <div className={styles.cardWrapper}>
          <span className={styles.demo}>{data.header.subTitle}</span>
          <h2 className={styles.title}>{data.header.title}</h2>
          <Markdown className={styles.description}>
            {data.header.description}
          </Markdown>
        </div>
      </Section>
      <FileUpload
        rrsPdfLoading={rrsPdfLoading}
        uploadPdf={uploadPdf}
        uploadResults={uloadResult}
      />
      <Section id="purpose" className={styles.howItWorks}>
        <div className={styles.imageWrapper}>
          <img src={data.purpose?.image} alt={data.howItWorks?.title} />
        </div>
        <article className={styles.content}>
          <h3>{data.purpose?.title}</h3>
          <Markdown>{data.purpose?.description}</Markdown>
        </article>
      </Section>
      <Section id="member">
        <div className={styles.serviceWrapper}>
          <div className={styles.mainTitleWrapper}>
            <h3 className={styles.title}>{data.becomeMember?.title}</h3>
            <Button
              href={data.becomeMember?.action.url}
              target="_blank"
              variant="contained"
            >
              {data.becomeMember?.action.title}
            </Button>
          </div>
          <div className={styles.service}>
            <div className={styles.headerWrapper}>
              <img
                className={styles.titlePicture}
                src={data.becomeMember.services[0].picture}
                alt={data.becomeMember.services[0].title}
              />
              <span className={styles.serviceTitle}>
                {data.becomeMember.services[0].title}
              </span>
            </div>
            <div>
              <Markdown className={styles.serviceDescription}>
                {data.becomeMember.services[0].description}
              </Markdown>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  )
}

export default RightsRetentionPageTemplate
