import { Layout } from '@core/core-ui'
import FeatureBox from '@components/FeatureBox'
import Header from '@components/Header/Header'

import type { LabsPageData } from '@features/labs/types'

import styles from './styles.module.css'

type LabsPageProps = {
  data: LabsPageData
}

const LabsPage = ({ data }: LabsPageProps) => {
  const features = data.services.features ?? []

  return (
    <Layout>
      <Header
        className={styles.labHero}
        description={data.header?.header?.description}
        image={data.header?.header?.hero}
        logoAlt={data.header?.header?.title}
        title={data.header?.header?.title}
      />
      <div className={styles.wrapper}>
        <div className={styles.features}>
          {features.map((feature) => (
            <FeatureBox
              key={feature.id}
              action={feature.action}
              description={feature.description}
              iconSrc={feature.logo}
              tag={feature.tag}
              title={feature.title}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default LabsPage
