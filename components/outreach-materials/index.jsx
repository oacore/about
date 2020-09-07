import React, { useState } from 'react'
import {
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardLink,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'

import styles from './outreach-materials.module.scss'

const format2name = (type) =>
  ({
    jpg: 'JPEG',
    jpeg: 'JPEG',
    png: 'PNG',
    pdf: 'PDF',
    gdoc: 'Google Doc',
    gslides: 'Google Slides',
  }[type])

const format2action = (type) =>
  ['gdoc', 'gslides'].includes(type) ? 'Open' : 'Download'

const ResourceLink = ({ id, href, format, className = '', ...restProps }) => {
  const action = format2action(format)
  const name = format2name(format)

  const props = {
    href,
    rel:
      new URL(href, 'http://example.com').host !== 'example.com'
        ? 'noopener'
        : 'opener',
    download: action.toLowerCase() === 'download',
  }

  return (
    <CardLink
      className={`btn btn-outline-primary ${className}`}
      {...props}
      {...restProps}
    >
      {action} {name}
    </CardLink>
  )
}

const ResourceLinkSelector = ({ id, options, label, format, ...restProps }) => {
  const [currentUrl, switchUrl] = useState(options[0].value)

  return (
    <div {...restProps}>
      <FormGroup>
        <Label className="sr-only" htmlFor={`${id}-version`}>
          {label}
        </Label>
        <Input
          id={`${id}-version`}
          className="col-sm"
          type="select"
          name="url"
          value={currentUrl}
          onChange={(event) => {
            switchUrl(event.target.value)
          }}
        >
          {options.map(({ title, value }) => (
            <option key={value} value={value}>
              {title}
            </option>
          ))}
        </Input>
      </FormGroup>
      <ResourceLink
        className="col-sm"
        id={id}
        href={currentUrl}
        format={format}
      />
    </div>
  )
}

const OutreachMaterials = ({
  id,
  className = '',
  name,
  picture,
  format,
  link,
  ...restProps
}) => {
  const attachementType = typeof link == 'string' ? 'single' : 'multi'

  return (
    <Card
      id={id}
      className={`
        ${styles.outreachMaterialsCard}
        ${styles[`outreach-materials-card-${attachementType}`]}
        ${className}
      `}
      {...restProps}
    >
      <div className={styles.outreachMaterialsPicture}>
        {picture && <CardImg src={picture} alt={`${name}'s image`} />}
      </div>

      <CardBody className={styles.outreachMaterialsCardBody}>
        <CardTitle>
          {name}
          {attachementType === 'multi' &&
            ` (${link.options.length} ${link.itemName})`}
        </CardTitle>
        {attachementType === 'multi' ? (
          <ResourceLinkSelector
            id={`${id}-resource`}
            options={link.options}
            label={link.label}
            format={format}
          />
        ) : (
          <ResourceLink
            id={`${id}-resource`}
            className={styles.outreachMaterialsLink}
            href={link}
            format={format}
          />
        )}
      </CardBody>
    </Card>
  )
}

export default OutreachMaterials
