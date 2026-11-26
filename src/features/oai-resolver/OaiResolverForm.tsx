'use client'

import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Typography } from 'antd'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCallback, useMemo, useState, type FormEvent, type KeyboardEvent } from 'react'

import {
  OAI_IDENTIFIER_EXAMPLE,
  OAI_IDENTIFIER_PATTERN,
  OAI_RESOLVE_API_BASE,
} from '@features/oai-resolver/constants'

import styles from './oai-resolver.module.css'

const { Text } = Typography

const validateIdentifier = (value: string): boolean => OAI_IDENTIFIER_PATTERN.test(value.trim())


const decodeSegment = (value?: string): string => {
  if (!value) return ''

  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

const OaiResolverForm = () => {
  const params = useParams<{ slug?: string[] }>()
  const slug = params?.slug

  const isRouteError = slug?.[0] === 'error'
  const initialIdentifier = decodeSegment(slug?.[1])

  const [identifier, setIdentifier] = useState(
    validateIdentifier(initialIdentifier) ? initialIdentifier : '',
  )
  const [isFormatInvalid, setIsFormatInvalid] = useState(false)

  const handleExampleClick = useCallback(() => {
    setIdentifier(OAI_IDENTIFIER_EXAMPLE)
    setIsFormatInvalid(false)
  }, [])

  const handleExampleKeyDown = useCallback((event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }

    event.preventDefault()
    handleExampleClick()
  }, [handleExampleClick])

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedIdentifier = identifier.trim()

    if (!validateIdentifier(trimmedIdentifier)) {
      setIsFormatInvalid(true)
      return
    }

    setIsFormatInvalid(false)
    event.currentTarget.action = `${OAI_RESOLVE_API_BASE}/${trimmedIdentifier}`
    event.currentTarget.submit()
  }, [identifier])

  const helperContent = useMemo(() => {
    if (isFormatInvalid) {
      return (
        <>
          The OAI format is wrong.{' '}
          <Link href="https://core.ac.uk/faq#oai-about" rel="noopener noreferrer" target="_blank">
            Here
          </Link>{' '}
          you can check all requirements.
        </>
      )
    }

    if (isRouteError) {
      return (
        <>
          <span>
            We can not find this OAI identifier.
            <br />
          </span>
          <span>
            If you believe that this OAI identifier is registered with a repository, check the
            reasons why this might be the case in our{' '}
            <Link href="https://core.ac.uk/faq#oai-about" rel="noopener noreferrer" target="_blank">
              FAQ
            </Link>
            .
          </span>
        </>
      )
    }

    return (
      <>
        Example:{' '}
        <span
          aria-label={`Use example OAI identifier ${OAI_IDENTIFIER_EXAMPLE}`}
          className={styles.helperLink}
          onClick={handleExampleClick}
          onKeyDown={handleExampleKeyDown}
          role="button"
          tabIndex={0}
        >
          {OAI_IDENTIFIER_EXAMPLE}
        </span>
      </>
    )
  }, [handleExampleClick, handleExampleKeyDown, isFormatInvalid, isRouteError])

  return (
    <form
      aria-label="OAI identifier resolver form"
      className={styles.oaiForm}
      id="oai-resolve-form"
      method="GET"
      onSubmit={handleSubmit}
    >
      <Input
        aria-label="OAI identifier"
        className={styles.input}
        id="oai-identifier"
        onChange={(event) => {
          setIdentifier(event.target.value)
          setIsFormatInvalid(false)
        }}
        placeholder="Insert an OAI identifier"
        prefix={<SearchOutlined aria-hidden />}
        size="large"
        status={isFormatInvalid ? 'error' : undefined}
        value={identifier}
      />

      <Text className={styles.helper}>
        {helperContent}
      </Text>

      <div className={styles.submitSection}>
        <Button htmlType="submit" type="primary">
          Resolve
        </Button>
      </div>
    </form>
  )
}

export default OaiResolverForm
