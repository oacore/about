import { Button } from 'antd'
import type { Metadata } from 'next'

import { Layout, Section } from '@components/layout'

import NotFoundTitle from './NotFoundTitle'

import styles from './not-found.module.css'

const NOT_FOUND_TITLE = 'Page is not found'

export const metadata: Metadata = {
  title: NOT_FOUND_TITLE,
}

const NotFound = () => (
  <Layout>
    <NotFoundTitle title={NOT_FOUND_TITLE} />
    <Section className={styles.notFound}>
      <h1 className={styles.title}>Uh-oh</h1>
      <p>The page you were looking for could not be found.</p>
      <p>To help you find what you are looking for, why not</p>
      <div className={styles.actions}>
        <Button href="/" type="primary">
          Go back to the homepage
        </Button>
        <Button href="/about#contact">Contact us</Button>
      </div>
    </Section>
  </Layout>
)

export default NotFound
