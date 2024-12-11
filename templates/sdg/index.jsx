import React, { useState } from 'react'

import { Layout, Section } from '../../design-v2/components'
import styles from './styles.module.scss'
import { Markdown, Video } from '../../components'
import FileUpload from '../../components/pdf-upload'
import all from '../../public/images/icons/allSdg.svg'
import poverty from '../../public/images/icons/poverty.svg'
import hunger from '../../public/images/icons/hunger.svg'
import health from '../../public/images/icons/health.svg'
import education from '../../public/images/icons/education.svg'
import water from '../../public/images/icons/water.svg'
import energy from '../../public/images/icons/energy.svg'
import economy from '../../public/images/icons/economic.svg'
import infrastructure from '../../public/images/icons/infrastructure.svg'
import inequality from '../../public/images/icons/inequalitie.svg'
import communities from '../../public/images/icons/communities.svg'
import climate from '../../public/images/icons/climate.svg'
import underWater from '../../public/images/icons/belowWater.svg'
import peace from '../../public/images/icons/peace.svg'
import goal from '../../public/images/icons/goal.svg'
import equal from '../../public/images/icons/genderEquality.svg'
import land from '../../public/images/icons/land.svg'
import production from '../../public/images/icons/production.svg'

const sdgTypes = [
  {
    id: 'all',
    title: 'All',
    icon: all,
    color: '#B75400',
  },
  {
    id: 'SDG01',
    title: 'No Poverty',
    icon: poverty,
    color: '#E5243B',
  },
  {
    id: 'SDG02',
    title: 'Zero Hunger',
    icon: hunger,
    color: '#DDA63A',
  },
  {
    id: 'SDG03',
    title: 'Good Health and Well-being',
    icon: health,
    color: '#4C9F38',
  },
  {
    id: 'SDG04',
    title: 'Quality Education',
    icon: education,
    color: '#C5192D',
  },
  {
    id: 'SDG05',
    title: 'Gender Equality',
    icon: equal,
    color: '#FF3A21',
  },
  {
    id: 'SDG06',
    title: 'Clean Water and Sanitation',
    icon: water,
    color: '#26BDE2',
  },
  {
    id: 'SDG07',
    title: 'Affordable and Clean Energy',
    icon: energy,
    color: '#FCC30B',
  },
  {
    id: 'SDG08',
    title: 'Decent Work and Economic Growth',
    icon: economy,
    color: '#A21942',
  },
  {
    id: 'SDG09',
    title: 'Industry, Innovation and Infrastructure',
    icon: infrastructure,
    color: '#FD6925',
  },
  {
    id: 'SDG10',
    title: 'Reduced Inequality',
    icon: inequality,
    color: '#DD1367',
  },
  {
    id: 'SDG11',
    title: 'Sustainable Cities and Communities',
    icon: communities,
    color: '#FD9D24',
  },
  {
    id: 'SDG12',
    title: 'Responsible Consumption and Production',
    icon: production,
    color: '#BF8B2E',
  },
  {
    id: 'SDG13',
    title: 'Climate Action',
    icon: climate,
    color: '#3F7E44',
  },
  {
    id: 'SDG14',
    title: 'Life Below Water',
    icon: underWater,
    color: '#0A97D9',
  },
  {
    id: 'SDG15',
    title: 'Life on Land',
    icon: land,
    color: '#56C02B',
  },
  {
    id: 'SDG16',
    title: 'Peace, Justice and Strong Institutions',
    icon: peace,
    color: '#00689D',
  },
  {
    id: 'SDG17',
    title: 'Partnerships for the Goals',
    icon: goal,
    color: '#19486A',
  },
]

const SdgPageTemplate = ({ data }) => {
  const [uloadResult, setUploadResult] = useState('')
  const [rrsPdfLoading, setRrsPdfLoading] = useState(false)
  const uploadPdf = async (file) => {
    setRrsPdfLoading(true)
    try {
      const url = new URL('/internal/sdg-upload-file', process.env.API_URL)
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
        <div className={styles.imgWrapper}>
          <img className={styles.logo} src={data.header.image} alt="logo" />
        </div>
      </Section>
      <FileUpload
        rrsPdfLoading={rrsPdfLoading}
        uploadPdf={uploadPdf}
        uploadResults={uloadResult}
        sdgTypes={sdgTypes}
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
      <Video
        src="https://www.youtube.com/embed/_r16dXOGdWA"
        title="sdg labels"
        tag="p"
      />
    </Layout>
  )
}

export default SdgPageTemplate
