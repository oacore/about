'use client'

import ImageMap from '@components/maps/image-map'
import { ImagePin, NumberPin } from '@components/maps/pins'
import unknownSilhouette from '@components/team-member/man.svg'
import type { AmbassadorMember, AmbassadorRegion } from '@features/ambassadors/types'
import { PEOPLE_SECTION_ID } from '@features/ambassadors/constants'

import styles from './styles.module.css'

type AmbassadorsMapProps = {
  members: AmbassadorMember[]
  regions: AmbassadorRegion[]
}

const AmbassadorsMap = ({ members, regions }: AmbassadorsMapProps) => (
  <div className={styles.mapWrap}>
    <ImageMap>
      {members.map((member) => (
        <ImagePin
          key={member.id}
          alt={`${member.name}'s photo`}
          href={`#${member.id}`}
          latitude={member.location.latitude}
          longitude={member.location.longitude}
          src={member.picture ?? unknownSilhouette}
          title={`${member.name}, ${member.country}`}
        />
      ))}
      {regions.map((region) => (
        <NumberPin
          key={region.id}
          href={`#${PEOPLE_SECTION_ID}`}
          latitude={region.location.latitude}
          longitude={region.location.longitude}
          name="people"
          title={`${region.name}, ${region.quantity} people`}
          value={region.quantity}
        />
      ))}
    </ImageMap>
  </div>
)

export default AmbassadorsMap
