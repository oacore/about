'use client'

import { Modal } from 'antd'
import classNames from 'classnames'
import type { ReactNode } from 'react'

import styles from './ModalShell.module.css'

const SHELL_STYLES = {
  content: {
    padding: 16,
    borderRadius: 2,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    maxHeight: '85vh',
    overflowY: 'auto' as const,
  },
  header: {
    marginBottom: 24,
  },
}

export const MODAL_WIDTH = {
  form: 672,
  small: 320,
  medium: 448,
  result: 480,
} as const

export type ModalShellProps = {
  title: ReactNode
  width: number
  onCancel: () => void
  ariaLabel: string
  children: ReactNode
  /** Defaults to true for callers that mount the shell only while it is shown. */
  open?: boolean
  titleClassName?: string
}

/** antd Modal styled like the old @oacore/design modal: plain white box, no close icon. */
const ModalShell = ({
  title,
  width,
  onCancel,
  ariaLabel,
  children,
  open = true,
  titleClassName,
}: ModalShellProps) => (
  <Modal
    aria-label={ariaLabel}
    centered
    closable={false}
    destroyOnHidden
    footer={null}
    maskClosable={false}
    onCancel={onCancel}
    open={open}
    styles={SHELL_STYLES}
    title={<h6 className={classNames(styles.modalTitle, titleClassName)}>{title}</h6>}
    width={width}
  >
    {children}
  </Modal>
)

export default ModalShell
