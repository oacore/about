'use client'

import { BankOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { useRegistrationStore } from '@stores/registration'

import styles from './styles.module.css'

import type { AccountType } from '@features/registration/types'

const PROFILES: Array<{ value: AccountType; label: string; icon: ReactNode }> = [
  { value: 'institution', label: 'academic', icon: <BankOutlined /> },
  { value: 'enterprise', label: 'non-academic', icon: <ShopOutlined /> },
  { value: 'personal', label: 'personal', icon: <UserOutlined /> },
]

const joinClasses = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(' ')

const ProfileSelect = () => {
  const pathname = usePathname()
  const { data, setData } = useRegistrationStore()
  const { accountType } = data
  const shouldHidePersonal = pathname.includes('dataset') && !pathname.includes('api')
  const profiles = shouldHidePersonal
    ? PROFILES.filter((profile) => profile.value !== 'personal')
    : PROFILES

  const handleSelectProfile = (value: AccountType) => {
    setData({ accountType: value })
  }

  return (
    <fieldset className={styles.profiles}>
      <legend className={styles.profilesTitle}>Profile</legend>
      <div className={styles.profilesItems}>
        {profiles.map(({ value, label, icon }) => {
          const isActive = accountType === value

          return (
            <button
              aria-pressed={isActive}
              className={joinClasses(styles.profilesItem, isActive && styles.profilesItemActive)}
              key={value}
              onClick={() => handleSelectProfile(value)}
              type="button"
            >
              <span className={styles.profilesItemText}>
                {icon}
                <span>{label}</span>
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default ProfileSelect
