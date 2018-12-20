import React from 'react'
import { Form, InputGroup, InputGroupAddon, Input } from 'reactstrap'

const RepositorySearch = ({
  value,
  label,
  onChange,
  onSubmit,
  id = 'search-form',
  className,
  tag: Tag = Form,
  ...restProps
}) => {
  const fieldId = `${id}-query`
  return (
    <Tag className={className} id={id} onSubmit={onSubmit}>
      <InputGroup>
        <InputGroupAddon addonType="prepend" tag="label" htmlFor={fieldId}>
          {label}
        </InputGroupAddon>
        <Input id={fieldId} value={value} onChange={onChange} {...restProps} />
      </InputGroup>
    </Tag>
  )
}

export default RepositorySearch
