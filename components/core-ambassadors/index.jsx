import React from 'react'
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  CardLink,
} from 'reactstrap'

import './core-ambassadors.scss'

const CoreAmbassadors = ({
  className = '',
  name,
  role,
  picture,
  country,
  description,
  button,
  link,
}) => (
  <Card className={`ambassador-member ${className}`}>
    <div className="ambassador-member-picture">
      <CardImg src={picture} alt={`${name}'s photo`} />
    </div>
    <CardBody>
      <CardTitle className="h5 ambassador-member-name">{name}</CardTitle>
      <CardSubtitle className="ambassador-member-role">{role}</CardSubtitle>
      <CardText>{country}</CardText>
      <CardText>{description}</CardText>
      <CardLink className="btn btn-primary w-100" href={link}>
        {button}
      </CardLink>
    </CardBody>
  </Card>
)

export default CoreAmbassadors
