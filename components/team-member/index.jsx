import React from 'react'
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
} from 'reactstrap'

const TeamMember = ({
  className = '',
  children,
  name,
  role,
  picture,
  description,
  ...restProps
}) => (
  <Card className={`team-member ${className}`} {...restProps}>
    <div className="team-member-picture">
      {picture && <CardImg src={picture} alt={`${name}'s photo`} />}
    </div>
    <CardBody>
      <CardTitle className="h5 team-member-name">{name}</CardTitle>
      {role && <CardSubtitle className="team-member-role">{role}</CardSubtitle>}
      {description && <CardText>{description}</CardText>}
      {children}
    </CardBody>
  </Card>
)

export default TeamMember
