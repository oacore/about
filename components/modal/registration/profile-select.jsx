import React from 'react'
import { Card, Icon } from '@oacore/design/lib'
import classNames from '@oacore/design/lib/utils/class-names'

import styles from './styles.module.scss'

import { useStore, observe } from 'store'

const PROFILES = [
  {
    id: 1,
    label: 'personal',
    value: 'personal',
    iconSrc: '#account',
  },
  {
    id: 2,
    label: 'academic',
    value: 'institution',
    iconSrc: '#office-building',
  },
  {
    id: 3,
    label: 'non-academic',
    value: 'enterprise',
    iconSrc: '#domain',
  },
]

const ProfileSelect = observe(() => {
  const { registration } = useStore()
  return (
    <fieldset className={styles.profiles}>
      <legend className={styles.profilesTitle}>Profile</legend>
      <div className={styles.profilesItems}>
        {PROFILES.map(({ value, label, id, iconSrc }) => (
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
