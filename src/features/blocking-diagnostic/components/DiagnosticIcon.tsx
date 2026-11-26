import Image from 'next/image'

import dropdownIcon from '../assets/dropdownArrow.svg'
import errorIcon from '../assets/error.svg'
import infoIcon from '../assets/infoGreen.svg'
import infoWarningIcon from '../assets/infoWarning.svg'
import successIcon from '../assets/success.svg'
import warningRedIcon from '../assets/warningRed.svg'
import warningIcon from '../assets/warningY.svg'

import styles from '../styles.module.css'

export type DiagnosticIconName =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'infoWarning'
  | 'warningRed'
  | 'dropdown'

const ICONS: Record<DiagnosticIconName, typeof successIcon> = {
  success: successIcon,
  error: errorIcon,
  warning: warningIcon,
  info: infoIcon,
  infoWarning: infoWarningIcon,
  warningRed: warningRedIcon,
  dropdown: dropdownIcon,
}

type DiagnosticIconProps = {
  name: DiagnosticIconName
  className?: string
}

const DiagnosticIcon = ({ name, className }: DiagnosticIconProps) => (
  <Image
    alt=""
    aria-hidden
    className={[styles.icon, className].filter(Boolean).join(' ')}
    height={24}
    src={ICONS[name]}
    width={24}
  />
)

export default DiagnosticIcon
