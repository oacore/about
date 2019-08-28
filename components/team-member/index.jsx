import React from 'react'
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
} from 'reactstrap'

import './team-member.scss'

const TeamMember = ({
  className = '',
  name,
  role,
  picture,
  description,
  ...restProps
}) => (
  <Card className={`team-member ${className}`} {...restProps}>
    <div className="team-member-picture">
      <CardImg src={picture} alt={`${name}'s photo`} />
    </div>
    <CardBody>
      <CardTitle className="h5 team-member-name">{name}</CardTitle>
      <CardSubtitle className="team-member-role">{role}</CardSubtitle>
      <CardText>{description}</CardText>
    </CardBody>
  </Card>
)

export default TeamMember
