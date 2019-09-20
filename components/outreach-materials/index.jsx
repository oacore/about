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

const format2name = type =>
  ({
    jpg: 'JPEG',
    jpeg: 'JPEG',
    png: 'PNG',
    pdf: 'PDF',
    gdoc: 'Google Doc',
    gslides: 'Google Slides',
  }[type])

const OutreachMaterials = ({
  id,
  className = '',
  name,
  role,
  picture,
  country,
  description,
  format,
  link,
  ...restProps
}) => (
  <Card id={id} className={`outreach-materials ${className}`} {...restProps}>
    <div className="outreach-materials-picture">
      <CardImg src={picture} alt={`${name}'s photo`} />
    </div>
    <CardBody>
      <CardTitle className="p outreach-materials-name">{name}</CardTitle>
      <CardSubtitle className="outreach-materials-role">{role}</CardSubtitle>
      <CardText>{country}</CardText>
      <CardText>{description}</CardText>

      {['gdoc', 'gslides'].includes(format) ? (
        <CardLink
          className="btn btn-outline-primary w-100"
          href={link}
          target="_blank"
          rel="noopener"
        >
          Open {format2name(format)}
        </CardLink>
      ) : (
        <CardLink
          className="btn btn-outline-primary w-100"
          href={link}
          download={`core-${id}.${format}`}
        >
          Download {format2name(format)}
        </CardLink>
      )}
    </CardBody>
  </Card>
)

export default OutreachMaterials
