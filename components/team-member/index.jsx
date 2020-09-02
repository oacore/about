import React from 'react'
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
} from 'reactstrap'

import styles from './team-member.module.scss'

const TeamMember = ({
  className = '',
  children,
  name,
  role,
  picture,
  description,
  ...restProps
}) => (
  <Card className={`${styles.teamMember} ${className}`} {...restProps}>
    <div className={styles.teamMemberPicture}>
      {picture && <CardImg src={picture} alt={`${name}'s photo`} />}
    </div>
    <CardBody>
      <CardTitle className={`h5 ${styles.teamMemberName}`}>{name}</CardTitle>
      {role && (
        <CardSubtitle className={styles.teamMemberRole}>{role}</CardSubtitle>
      )}
      {description && <CardText>{description}</CardText>}
      {children}
    </CardBody>
  </Card>
)

export default TeamMember
