'use client'

import { DeleteOutlined } from '@ant-design/icons'
import { AutoComplete, Button, Checkbox, Form, Input, Popover, Radio, Select, Spin } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import useSWR from 'swr'

import Markdown from '@components/Markdown/Markdown'
import type {
  MemberFormContent,
  MemberFormField,
  MemberPlanSlug,
  MemberSelectOption,
  MembershipData,
  RepositoryOption,
} from '@features/member/types'
import {
  REPOSITORIES_FORMAP_URL,
  fetchRepositoriesFormap,
} from '@services/membership'
import { useMembershipStore } from '@stores/membership'
import { useMembershipPriceStore } from '@stores/membership-price'
import { patchNumberComma } from '@utils/patchStats'

import styles from './form.module.css'

type MemberFormValues = {
  organisationName: string
  organisationType: string
  repositories: Array<number | string | undefined>
  noRepositories: boolean
  contactName: string
  roleInOrganisation: string
  email: string
  typesContracts?: string
  invoicingFrequency?: string
  additionalInfo?: string
  approveTermsConditions: boolean
}

type MemberFormProps = {
  form: MemberFormContent
  planName: MemberPlanSlug
}

const ANNUAL_ROLLING_ID = 'Annual rolling'

const toSelectOptions = (options: MemberSelectOption[] = []) =>
  options.map((option) => ({
    value: option.id,
    label: option.name,
  }))

const resolveContractDiscount = (
  field: MemberFormField | undefined,
  typesContracts: string,
): number => {
  const option = field?.options?.find((item) => item.id === typesContracts)
  return typeof option?.value === 'number' && Number.isInteger(option.value) ? option.value : 0
}

const applyDiscount = (price: number, discount: number): number => {
  if (discount <= 0) {
    return price
  }

  return price - (price * discount) / 100
}

const stripHtml = (value: string): string => value.replace(/<[^>]+>/g, '')

const InlineMarkdown = ({ children }: { children: string }) => (
  <ReactMarkdown
    components={{
      p: ({ children: paragraphChildren }) => <>{paragraphChildren}</>,
    }}
    rehypePlugins={[rehypeRaw]}
  >
    {children}
  </ReactMarkdown>
)

const MemberForm = ({ form, planName }: MemberFormProps) => {
  const router = useRouter()
  const [antForm] = Form.useForm<MemberFormValues>()
  const setMembershipData = useMembershipStore((state) => state.setData)
  const submitMembership = useMembershipStore((state) => state.submit)
  const membershipPrice = useMembershipPriceStore((state) => state.data)
  const setMembershipPriceData = useMembershipPriceStore((state) => state.setData)
  const fetchPrice = useMembershipPriceStore((state) => state.fetchPrice)
  const clearPrice = useMembershipPriceStore((state) => state.clearPrice)
  const isStartingPlan = planName === 'starting'

  const { data: repositories = [], isLoading: isRepositoriesLoading } = useSWR(
    REPOSITORIES_FORMAP_URL,
    fetchRepositoriesFormap,
  )

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [repositoryFieldCount, setRepositoryFieldCount] = useState(1)

  const noRepositories = Form.useWatch('noRepositories', antForm) ?? false
  const typesContracts = Form.useWatch('typesContracts', antForm)
  const approveTermsConditions = Form.useWatch('approveTermsConditions', antForm) ?? false
  const isAnnualRolling = isStartingPlan || typesContracts === ANNUAL_ROLLING_ID || !typesContracts

  // The repository rule depends on the checkbox. Re-run it when the checkbox changes so an
  // existing "Please select a repository" error is cleared (or shown again) straight away.
  useEffect(() => {
    if (antForm.getFieldError(['repositories', 0]).length > 0) {
      antForm.validateFields([['repositories', 0]]).catch(() => undefined)
    }
  }, [antForm, noRepositories])

  const repositoryOptions = useMemo(
    () =>
      repositories.map((item: RepositoryOption) => ({
        value: item.id,
        label: item.name,
      })),
    [repositories],
  )

  const typesContractsField = form.fields.find((field) => field.id === 'typesContracts')
  const repositoryField = form.fields.find((field) => field.type === 'async-select')

  const calculatePrice = useCallback(
    (nextTypesContracts: string) => {
      const { price } = useMembershipPriceStore.getState().data
      const discount = resolveContractDiscount(typesContractsField, nextTypesContracts)

      if (price > 1 && nextTypesContracts) {
        setMembershipPriceData({
          typesContracts: nextTypesContracts,
          discount,
          priceCalculated: Number.isInteger(discount) && discount > 0 ? applyDiscount(price, discount) : price,
        })
        return
      }

      setMembershipPriceData({
        typesContracts: nextTypesContracts,
        discount,
      })
    },
    [setMembershipPriceData, typesContractsField],
  )

  const handleFetchPrice = useCallback(
    async (repositoryIds: Array<number | string>, nextTypesContracts: string) => {
      if (isStartingPlan) {
        return
      }

      const uniqueIds = [...new Set(repositoryIds.filter(Boolean))]

      setMembershipPriceData({
        repository: uniqueIds,
        planName,
        typesContracts: nextTypesContracts,
      })

      if (uniqueIds.length === 0) {
        // Also cancels a request still in flight, so it can't bring back an old fee.
        clearPrice()
        setMembershipPriceData({
          discount: resolveContractDiscount(typesContractsField, nextTypesContracts),
        })
        return
      }

      await fetchPrice()

      if (useMembershipPriceStore.getState().data.priceCalculated !== -1) {
        calculatePrice(nextTypesContracts)
      }
    },
    [calculatePrice, clearPrice, fetchPrice, isStartingPlan, planName, setMembershipPriceData, typesContractsField],
  )

  const handleRepositoriesChange = useCallback(() => {
    const repositoryIds = (antForm.getFieldValue('repositories') as MemberFormValues['repositories']) ?? []
    void handleFetchPrice(
      repositoryIds.filter((id): id is number | string => id != null && id !== ''),
      antForm.getFieldValue('typesContracts') ?? '',
    )
  }, [antForm, handleFetchPrice])

  const handleTypesContractsChange = useCallback(
    (value: string) => {
      if (value === ANNUAL_ROLLING_ID) {
        antForm.setFieldValue('invoicingFrequency', undefined)
      }

      setMembershipPriceData({ typesContracts: value })
      calculatePrice(value)
    },
    [antForm, calculatePrice, setMembershipPriceData],
  )

  const handleAddRepository = useCallback(() => {
    if (repositoryFieldCount >= form.maxRepositoriesCount) {
      return
    }

    setRepositoryFieldCount((current) => current + 1)
  }, [form.maxRepositoriesCount, repositoryFieldCount])

  const handleRemoveRepository = useCallback(
    (index: number) => {
      const repositoriesValue = [...((antForm.getFieldValue('repositories') as MemberFormValues['repositories']) ?? [])]
      repositoriesValue.splice(index, 1)
      antForm.setFieldValue('repositories', repositoriesValue)
      setRepositoryFieldCount((current) => Math.max(1, current - 1))
      handleRepositoriesChange()
    },
    [antForm, handleRepositoriesChange],
  )

  const handleFinish = useCallback(
    async (values: MemberFormValues) => {
      if (!values.approveTermsConditions) {
        return
      }

      const selectedRepositoryIds = (values.repositories ?? []).filter(
        (id): id is number | string => id != null && id !== '',
      )

      if (!values.noRepositories && selectedRepositoryIds.length === 0) {
        antForm.setFields([
          {
            name: ['repositories', 0],
            errors: ['Please select a repository'],
          },
        ])
        return
      }

      const firstRepository = repositories.find((item) => item.id === selectedRepositoryIds[0])

      const payload: MembershipData = {
        organisationName: values.organisationName,
        organisationType: values.organisationType,
        contactName: values.contactName,
        roleInOrganisation: values.roleInOrganisation,
        email: values.email,
        additionalInfo: values.additionalInfo,
        typesContracts: values.typesContracts,
        invoicingFrequency: values.invoicingFrequency,
        planName,
        repository: selectedRepositoryIds,
        repoName: firstRepository?.name ?? '',
        approveTermsConditions: 1,
        noRepositories: values.noRepositories ? 1 : 0,
        discount: membershipPrice.discount,
        price: membershipPrice.price,
        priceCalculated: membershipPrice.priceCalculated,
        size: '',
        transactionToken: 'TOKEN',
        transactionDescription: 'description',
      }

      setIsSubmitting(true)
      setMembershipData(payload)

      try {
        await submitMembership()
        router.push('/membership-request-status/success')
      } catch {
        router.push('/membership-request-status/error')
      } finally {
        setIsSubmitting(false)
      }
    },
    [antForm, membershipPrice, planName, repositories, router, setMembershipData, submitMembership],
  )

  const priceCopy = useMemo(() => {
    if (isStartingPlan) {
      return ''
    }

    const priceStats = {
      price: membershipPrice.price,
      priceCalculated: membershipPrice.priceCalculated,
      discount: membershipPrice.discount,
      planName: membershipPrice.planName,
    }

    if (noRepositories) {
      return patchNumberComma(form.errorPriceCalculation, priceStats)
    }

    if (membershipPrice.priceCalculated <= 1) {
      if (membershipPrice.priceCalculated === 0) {
        return 'Annual fee: N/A'
      }

      return patchNumberComma(form.errorPriceCalculation, priceStats)
    }

    return patchNumberComma(form.priceCalculated, priceStats)
  }, [form.errorPriceCalculation, form.priceCalculated, isStartingPlan, membershipPrice, noRepositories])

  const renderField = (field: MemberFormField) => {
    if (field.type === 'input' && field.id) {
      return (
        <div className={styles.field} key={field.id}>
          {field.optional && field.appendText ? (
            <span className={styles.inputAppend}>{field.appendText}</span>
          ) : null}
          <Form.Item
            className={styles.outlinedItem}
            label={field.label}
            name={field.id}
            rules={
              field.optional
                ? undefined
                : [{ required: true, whitespace: true, message: `${field.label} is required` }]
            }
          >
            <Input
              aria-label={field.label}
              id={field.id}
              placeholder={field.placeholder}
            />
          </Form.Item>
          {field.appendTextBottom ? (
            <span className={styles.inputAppendBottom}>{field.appendTextBottom}</span>
          ) : null}
        </div>
      )
    }

    if (field.type === 'checkbox' && field.id) {
      if (isStartingPlan && field.id === 'noRepositories') {
        return null
      }

      return (
        <Form.Item
          key={field.id}
          name={field.id}
          valuePropName="checked"
          rules={
            field.id === 'approveTermsConditions'
              ? [
                  {
                    validator: async (_, value) => {
                      if (!value) {
                        throw new Error('Please agree to the terms')
                      }
                    },
                  },
                ]
              : undefined
          }
        >
          <Checkbox aria-label={stripHtml(field.label)} className={styles.paymentLink} id={field.id}>
            <InlineMarkdown>{field.label}</InlineMarkdown>
          </Checkbox>
        </Form.Item>
      )
    }

    if (field.type === 'radio' && field.id) {
      if (isAnnualRolling) {
        return null
      }

      return (
        <Form.Item
          key={field.id}
          label={field.label}
          name={field.id}
          rules={[{ required: true, message: `${field.label} is required` }]}
        >
          <Radio.Group
            aria-label={field.label}
            options={field.options?.map((option) => ({
              label: String(option.value ?? option.name),
              // Backend expects the option id (e.g. 'single-payment'), as in the old site
              value: option.id,
            }))}
          />
        </Form.Item>
      )
    }

    if (field.type === 'select' && field.id) {
      if (isStartingPlan && field.id === 'typesContracts') {
        return null
      }

      if (field.id === 'organisationType') {
        return (
          <Form.Item
            className={styles.outlinedItem}
            key={field.id}
            label={field.label}
            name={field.id}
            rules={[{ required: true, whitespace: true, message: `${field.label} is required` }]}
          >
            <AutoComplete
              aria-label={field.label}
              filterOption={(inputValue, option) =>
                String(option?.label ?? '')
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())
              }
              options={toSelectOptions(field.options)}
              placeholder={field.placeholder}
            />
          </Form.Item>
        )
      }

      return (
        <Form.Item
          className={styles.outlinedItem}
          key={field.id}
          label={field.label}
          name={field.id}
          rules={[{ required: !isStartingPlan, message: `${field.label} is required` }]}
        >
          <Select
            aria-label={field.label}
            onChange={field.id === 'typesContracts' ? handleTypesContractsChange : undefined}
            options={toSelectOptions(field.options)}
            placeholder={field.placeholder}
          />
        </Form.Item>
      )
    }

    if (field.type === 'button') {
      if (isStartingPlan && field.id === 'addRepositories') {
        return null
      }

      return (
        <div className={styles.addRepositories} key={field.id ?? field.label}>
          <button
            aria-label={field.label}
            className={classNames(
              styles.buttonPlus,
              repositoryFieldCount >= form.maxRepositoriesCount && styles.hidden,
            )}
            onClick={handleAddRepository}
            type="button"
          />
          {field.caption ? <span className={styles.buttonPlusCaption}>{field.caption}</span> : null}
        </div>
      )
    }

    if (field.type === 'caption') {
      if (!isStartingPlan) {
        return null
      }

      return (
        <div className={styles.help} key={field.label}>
          <Popover
            content={
              <ul className={styles.helpList}>
                {field.options?.map((option) => (
                  <li key={option.id ?? option.name}>
                    <a href={option.action}>{option.name}</a>
                  </li>
                ))}
              </ul>
            }
            placement="bottomRight"
            trigger="click"
          >
            <button
              aria-label={field.label}
              className={styles.helpButton}
              type="button"
            >
              {field.label}
            </button>
          </Popover>
        </div>
      )
    }

    if (field.type === 'async-select' && repositoryField) {
      return (
        <div className={styles.repositoryList} key={field.id}>
          {Array.from({ length: repositoryFieldCount }, (_, index) => (
            <div className={styles.selectContainer} key={`${field.id}-${index}`}>
              <Form.Item
                className={styles.outlinedItem}
                label={index === 0 ? field.label : `${field.label} ${index + 1}`}
                name={['repositories', index]}
                // Keep a rule even when it isn't required: antd skips validation of fields
                // with no rules, which would leave an old error on screen.
                rules={[
                  { required: index === 0 && !noRepositories, message: 'Please select a repository' },
                ]}
              >
                <Select
                  allowClear
                  aria-label={field.label}
                  filterOption={(inputValue, option) =>
                    String(option?.label ?? '')
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  }
                  loading={isRepositoriesLoading}
                  notFoundContent={isRepositoriesLoading ? <Spin size="small" /> : undefined}
                  onChange={handleRepositoriesChange}
                  options={repositoryOptions}
                  placeholder={field.placeholder}
                  showSearch
                />
              </Form.Item>
              {index > 0 ? (
                <Button
                  aria-label={`Remove ${field.label} ${index + 1}`}
                  className={styles.closeIcon}
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveRepository(index)}
                  type="text"
                />
              ) : null}
            </div>
          ))}
        </div>
      )
    }

    return null
  }

  return (
    <Form
      aria-busy={isSubmitting || undefined}
      className={styles.form}
      colon={false}
      disabled={isSubmitting}
      form={antForm}
      id={form.id}
      initialValues={{ repositories: [undefined], noRepositories: false, approveTermsConditions: false }}
      layout="vertical"
      onFinish={handleFinish}
    >
      {form.fields.map((field) => renderField(field))}
      <div className={styles.box}>
        {priceCopy ? <Markdown className={styles.price}>{priceCopy}</Markdown> : null}
        <Button
          className={classNames(styles.submitButton, !approveTermsConditions && styles.buttonUnActive)}
          disabled={!approveTermsConditions}
          htmlType="submit"
          loading={isSubmitting}
          type="primary"
        >
          {form.action.caption}
        </Button>
      </div>
    </Form>
  )
}

export default MemberForm
