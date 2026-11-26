'use client'

import { Layout, Section } from '@core/core-ui'
import { Button } from 'antd'
import Image from 'next/image'

import type { ConfirmRegistrationProduct } from '@features/confirm-registration/types'
import { getLinkProps, resolveHref } from '@utils/resolveHref'

import styles from './styles.module.css'

type ConfirmRegistrationPageProps = {
  product: ConfirmRegistrationProduct
}

const ConfirmRegistrationPage = ({ product }: ConfirmRegistrationPageProps) => {
  const link = getLinkProps(resolveHref(product.button.link))

  return (
    <Layout>
      <Section className={styles.confirmRegistration} id="confirm-registration">
        <Image
          alt={product.title}
          className={styles.image}
          height={240}
          src={product.picture}
          unoptimized
          width={320}
        />
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.text}>{product.info}</p>
        <Button href={link.href} rel={link.rel} target={link.target} type="primary">
          {product.button.text}
        </Button>
      </Section>
    </Layout>
  )
}

export default ConfirmRegistrationPage
