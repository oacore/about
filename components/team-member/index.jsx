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
import { ReadMore } from '../../design-v2/components/testimonial'

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
      {description && description.length > 110 ? (
        <ReadMore renderBreak textMaxLength={110}>
          {description}
        </ReadMore>
      ) : (
        <CardText>{description}</CardText>
      )}
      {children}
    </CardBody>
  </Card>
)

export default TeamMember
