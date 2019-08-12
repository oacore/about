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

import './outreach-materials.scss'

const OutreachMaterials = ({
  className = '',
  name,
  role,
  picture,
  country,
  description,
  button,
  link,
}) => (
  <Card className={`outreach-materials ${className}`}>
    <div className="outreach-materials-picture">
      <CardImg src={picture} alt={`${name}'s photo`} />
    </div>
    <CardBody>
      <CardTitle className="p outreach-materials-name">{name}</CardTitle>
      <CardSubtitle className="outreach-materials-role">{role}</CardSubtitle>
      <CardText>{country}</CardText>
      <CardText>{description}</CardText>
      <CardLink className="btn btn-outline-primary w-100" href={link}>
        {button}
      </CardLink>
    </CardBody>
  </Card>
)

export default OutreachMaterials
