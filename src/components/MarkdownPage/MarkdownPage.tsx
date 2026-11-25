import Markdown from '@components/Markdown/Markdown'
import Layout from '@components/layout/Layout'
import ServiceMainWrapper from '@components/ServiceMainWrapper'
import type { MarkdownPageData } from '@/lib/content/markdownPage'

import styles from './MarkdownPage.module.css'

export type MarkdownPageProps = {
  data: MarkdownPageData
}

const MarkdownPage = ({ data }: MarkdownPageProps) => (
  <Layout>
    <h1 className={styles.title}>{data.headline ?? data.title}</h1>
    {data.lead ? <p className={styles.lead}>{data.lead}</p> : null}
    <div className={styles.content}>
      <Markdown>{data.body}</Markdown>
    </div>
    {data.services?.length ? <ServiceMainWrapper services={data.services} /> : null}
  </Layout>
)

export default MarkdownPage
