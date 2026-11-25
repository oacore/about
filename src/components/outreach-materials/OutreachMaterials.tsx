'use client'

import { Button, Card, Select, Typography } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

import styles from './outreach-materials.module.css'
import {
  downloadFile,
  getFormatAction,
  getFormatLabel,
  resolveHref,
  type OutreachMaterial,
  type OutreachMaterialOption,
} from './types'

const { Title } = Typography

/** Called on every resource link click with the old analytics `action` and `label` */
export type OutreachLinkClickHandler = (link: { action: string; label: string }) => void

export type OutreachMaterialsProps = {
  resource: OutreachMaterial
  onActionClick?: () => void
  onLinkClick?: OutreachLinkClickHandler
  className?: string
}

type ResourceLinkProps = {
  href?: string
  format?: string
  label: string
  onLinkClick?: OutreachLinkClickHandler
}

const ResourceLink = ({ href, format, label, onLinkClick }: ResourceLinkProps) => {
  const resolvedHref = resolveHref(href)
  const action = getFormatAction(format)
  const isDownload = action === 'Download'

  const handleClick = (event: React.MouseEvent) => {
    onLinkClick?.({ action, label })

    if (!isDownload || !resolvedHref) {
      return
    }

    event.preventDefault()
    void downloadFile(resolvedHref)
  }

  if (!resolvedHref) {
    return null
  }

  return (
    <Button
      aria-label={`${action} ${label}`}
      block
      className={styles.outreachMaterialsLink}
      color="primary"
      download={isDownload || undefined}
      href={resolvedHref}
      onClick={handleClick}
      rel="noopener noreferrer"
      target={isDownload ? undefined : '_blank'}
      variant="outlined"
    >
      {`${action} ${getFormatLabel(format)}`.trim()}
    </Button>
  )
}

type ResourceLinkSelectorProps = {
  id: string
  options: OutreachMaterialOption[]
  label?: string
  format?: string
  name: string
  onLinkClick?: OutreachLinkClickHandler
}

const ResourceLinkSelector = ({
  id,
  options,
  label = 'Select the language',
  format,
  name,
  onLinkClick,
}: ResourceLinkSelectorProps) => {
  const [currentUrl, setCurrentUrl] = useState(options[0]?.value)

  const handleChange = (value: string) => {
    setCurrentUrl(value)
  }

  if (!options.length) {
    return null
  }

  return (
    <div className={styles.outreachMaterialsSelector}>
      <label className={styles.visuallyHidden} htmlFor={`${id}-version`}>
        {label}
      </label>
      <Select
        aria-label={label}
        className={styles.outreachMaterialsSelect}
        id={`${id}-version`}
        onChange={handleChange}
        options={options.map((option) => ({ label: option.title, value: option.value }))}
        value={currentUrl}
      />
      <ResourceLink
        format={format}
        href={currentUrl}
        label={`${name} (${options.find((option) => option.value === currentUrl)?.title ?? ''})`}
        onLinkClick={onLinkClick}
      />
    </div>
  )
}

const OutreachMaterials = ({
  resource,
  onActionClick,
  onLinkClick,
  className,
}: OutreachMaterialsProps) => {
  const options = resource.options ?? []
  const title =
    options.length && resource.itemName
      ? `${resource.name} (${options.length} ${resource.itemName})`
      : resource.name

  return (
    <Card className={classNames(styles.outreachMaterialsCard, className)} id={resource.id} variant="borderless">
      <div className={styles.outreachMaterialsPicture}>
        {resource.picture ? (
          <Image
            alt={`${resource.name}'s image`}
            className={styles.outreachMaterialsImage}
            fill
            sizes="(max-width: 768px) 40vw, 15vw"
            src={resource.picture}
            unoptimized
          />
        ) : null}
      </div>
      <div className={styles.outreachMaterialsCardBody}>
        <Title className={styles.outreachMaterialsTitle} level={5}>
          {title}
        </Title>
        {resource.action ? (
          <Button
            aria-label={resource.action}
            block
            className={styles.outreachMaterialsLink}
            color="primary"
            href={resource.actionHref}
            onClick={onActionClick}
            variant="outlined"
          >
            {resource.action}
          </Button>
        ) : options.length ? (
          <ResourceLinkSelector
            format={resource.type}
            id={resource.id}
            label={resource.label}
            name={resource.name}
            onLinkClick={onLinkClick}
            options={options}
          />
        ) : (
          <ResourceLink
            format={resource.type}
            href={resource.url}
            label={resource.name}
            onLinkClick={onLinkClick}
          />
        )}
      </div>
    </Card>
  )
}

export default OutreachMaterials
