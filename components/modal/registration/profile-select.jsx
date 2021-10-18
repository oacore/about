import React from 'react'
import { Card, Icon } from '@oacore/design/lib'
import classNames from '@oacore/design/lib/utils/class-names'

import styles from './styles.module.scss'

const PROFILES = [
  {
    id: 1,
    label: 'personal',
    iconSrc: '#account',
  },
  {
    id: 2,
    label: 'research',
    iconSrc: '#file-search',
  },
  {
    id: 3,
    label: 'institution',
    iconSrc: '#office-building',
  },
  {
    id: 4,
    label: 'enterprise',
    iconSrc: '#domain',
  },
]

const ProfileSelect = () => (
  <fieldset className={styles.profiles}>
    <legend className={styles.profilesTitle}>What’s your use case?</legend>
    <div className={styles.profilesItems}>
      {PROFILES.map(({ label, id, iconSrc }) => (
        <Card
          variant="outlined"
          className={classNames.use(styles.profilesItem)}
          key={id}
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

export default ProfileSelect
