'use client'

import { Layout as AntLayout } from 'antd'
import classNames from 'classnames'
import type { ComponentProps, ReactNode } from 'react'

import styles from './Section.module.css'

const { Content } = AntLayout

export type LayoutProps = {
  children: ReactNode
  className?: string
  fullWidth?: boolean
} & Omit<ComponentProps<typeof AntLayout>, 'children' | 'className'>

const Layout = ({ children, className, fullWidth = false, ...restProps }: LayoutProps) => (
  <AntLayout className={classNames(styles.antLayoutRoot, className)} {...restProps}>
    <Content className={classNames(styles.container, fullWidth && styles.fullWidth)}>{children}</Content>
  </AntLayout>
)

export default Layout
