'use client'

import { Card, Typography } from 'antd'
import classNames from 'classnames'
import Image, { type StaticImageData } from 'next/image'
import type { ReactNode } from 'react'

import styles from './team-member.module.css'

const { Paragraph, Title } = Typography

const getDescriptionSymbol = (expanded: boolean) => (expanded ? 'show less' : 'show more')

export type TeamMemberProps = {
  id?: string
  name: string
  role?: string
  description?: string
  picture?: string | StaticImageData
  className?: string
  children?: ReactNode
}

const TeamMember = ({ id, name, role, description, picture, className, children }: TeamMemberProps) => (
  <Card className={classNames(styles.teamMember, className)} id={id} variant="borderless">
    <div className={styles.teamMemberPicture}>
      {picture ? (
        <Image
          alt={`${name}'s photo`}
          className={styles.teamMemberImage}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          src={picture}
          unoptimized
        />
      ) : null}
    </div>
    <div className={styles.teamMemberBody}>
      <Title className={styles.teamMemberName} level={5}>
        {name}
      </Title>
      {role ? <p className={styles.teamMemberRole}>{role}</p> : null}
      {description ? (
        <Paragraph
          className={styles.teamMemberDescription}
          ellipsis={{ expandable: 'collapsible', rows: 4, symbol: getDescriptionSymbol }}
        >
          {description}
        </Paragraph>
      ) : null}
      {children ? <div className={styles.teamMemberActions}>{children}</div> : null}
    </div>
  </Card>
)

export default TeamMember
