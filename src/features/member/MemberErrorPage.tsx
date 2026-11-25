'use client'

import { Layout } from '@core/core-ui'
import { Button } from 'antd'
import Image from 'next/image'

import Markdown from '@components/Markdown/Markdown'
import type { MemberErrorContent } from '@features/member/types'

import styles from './styles.module.css'

type MemberErrorPageProps = {
  textData: MemberErrorContent
}

const MemberErrorPage = ({ textData }: MemberErrorPageProps) => (
  <Layout>
    <div className={styles.error}>
      <Image
        alt={textData.image.caption ?? textData.image.alt ?? textData.title}
        className={styles.errorImage}
        height={300}
        src={textData.image.url}
        unoptimized
        width={400}
      />
      <h4 className={styles.statusTitle}>{textData.title}</h4>
      <Markdown className={styles.statusDescription}>{textData.description}</Markdown>
      <div className={styles.errorActions}>
        {textData.actions.map((action) => (
          <Button
            href={action.url}
            key={action.caption}
            type={action.variant === 'outlined' ? 'default' : 'primary'}
          >
            {action.caption}
          </Button>
        ))}
      </div>
    </div>
  </Layout>
)

export default MemberErrorPage
