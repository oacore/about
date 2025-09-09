import React from 'react'
import { Card, Icon } from '@oacore/design/lib'
import classNames from '@oacore/design/lib/utils/class-names'
import { useRouter } from 'next/router'

import styles from './styles.module.scss'

import { useStore, observe } from 'store'

const PROFILES = [
  {
    id: 1,
    label: 'academic',
    value: 'institution',
    iconSrc: '#office-building',
  },
  {
    id: 2,
    label: 'non-academic',
    value: 'enterprise',
    iconSrc: '#domain',
  },
  {
    id: 3,
    label: 'personal',
    value: 'personal',
    iconSrc: '#account',
  },
]

const ProfileSelect = observe(() => {
  const router = useRouter()
  const { registration } = useStore()

  // TODO temp remove
  // Filter out 'personal' profile if URL contains 'dataset' but not 'api'
  const shouldHidePersonal =
    router.pathname.includes('dataset') && !router.pathname.includes('api')
  const filteredProfiles = shouldHidePersonal
    ? PROFILES.filter((profile) => profile.value !== 'personal')
    : PROFILES

  return (
    <fieldset className={styles.profiles}>
      <legend className={styles.profilesTitle}>Profile</legend>
      <div className={styles.profilesItems}>
        {filteredProfiles.map(({ value, label, id, iconSrc }) => (
          <Card
            variant="outlined"
            className={classNames.use(styles.profilesItem, {
              [styles.profilesItemActive]:
                registration.data.accountType === value,
            })}
            key={id}
            onClick={() => registration.setData({ accountType: value })}
          >
            <Card.Description className={styles.profilesItemText}>
              <Icon src={iconSrc} />
              <span>{label}</span>
            </Card.Description>
          </Card>
        ))}
      </div>
    </fieldset>
  )
})

export default ProfileSelect
