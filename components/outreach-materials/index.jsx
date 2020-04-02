import React, { useState } from 'react'
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  CardLink,
  FormGroup,
  Label,
  Input,
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

const format2action = type =>
  ['gdoc', 'gslides'].includes(type) ? 'Open' : 'Download'

const ResourceLink = ({ id, url, format }) => {
  const [currentUrl, switchUrl] = useState(
    Array.isArray(url) ? url[0].value : url
  )

  const action = format2action(format)

  const props = {
    href: currentUrl,
    rel:
      new URL(currentUrl, 'http://example.com').host !== 'example.com'
        ? 'noopener'
        : 'opener',
    download: action.toLowerCase() === 'download',
  }

  const urlSelect = Array.isArray(url) && (
    <FormGroup>
      <Label className="sr-only" htmlFor={`${id}-version`}>
        Version
      </Label>
      <Input
        id={`${id}-version`}
        type="select"
        name="url"
        value={currentUrl}
        onChange={event => {
          switchUrl(event.target.value)
        }}
      >
        {url.map(({ title, value }) => (
          <option key={value} value={value}>
            {title}
          </option>
        ))}
      </Input>
    </FormGroup>
  )

  return (
    <>
      {urlSelect}
      <CardLink className="btn btn-outline-primary w-100" {...props}>
        {action} {format2name(format)}
      </CardLink>
    </>
  )
}

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
      {picture && <CardImg src={picture} alt={`${name}'s image`} />}
    </div>

    <CardBody>
      <CardTitle className="p outreach-materials-name">{name}</CardTitle>
      <CardSubtitle className="outreach-materials-role">{role}</CardSubtitle>
      <CardText>{country}</CardText>
      <CardText>{description}</CardText>
      <ResourceLink url={link} format={format} />
    </CardBody>
  </Card>
)

export default OutreachMaterials
