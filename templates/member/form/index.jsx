import React, { useEffect, useRef, useState } from 'react'
import { Form, TextField } from '@oacore/design/lib/elements/forms'
import classNames from '@oacore/design/lib/utils/class-names'
import { Button } from '@oacore/design/lib/elements'
import { useOutsideClick } from '@oacore/design/lib/hooks'
import Parser from 'html-react-parser'

import styles from './styles.module.scss'
import Select from './select'

import { patchNumberComma } from 'components/utils'
import { ListBox } from 'design-v2/components'
import { observe, useStore } from 'store'
import { Markdown } from 'components'
import { Checkbox, Radiobutton } from 'components/checkbox'

const PaymentDefailsForm = observe(({ form }) => {
  const { membership, membershipPrice, dataProviders } = useStore()

  const helpBoxRef = useRef(null)
  const { planName } = membership.data

  useEffect(() => {
    dataProviders.fetchData()
  }, [])

  const initRepositorySelect = form.fields.find(
    (field) => field.type === 'async-select'
  )

  if (dataProviders.data) initRepositorySelect.options = [...dataProviders.data]

  const initialValues = form.fields.reduce((acc, elem) => {
    if (elem.id) acc[elem.id] = ''
    return acc
  }, {})

  const [formValues, setFormValues] = useState(initialValues)
  const [repositoryInputsList, setRepositoryInputsList] = useState([
    initRepositorySelect,
  ])
  const [visibleHelpBox, setVisibleHelpBox] = useState(false)
  const [isRepositoriesSelected, setRepositoriesSelected] = useState(false)
  const [isTermsConditions, setIsTermsConditions] = useState(false)
  const [radioButtonsState, setRadioButtonsState] = useState([])
  const [typeContractsAnnual, setTypeContractAnnual] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !isRepositoriesSelected &&
      (!formValues.repository || formValues.repository.length === 0)
    ) {
      const selectRepo = e.target['select-repository'].parentNode
      selectRepo.classList.add(styles.error)
      return
    }

    if (!isTermsConditions) return

    // Make array from repos id's
    const repository = Object.values(
      Object.keys(formValues)
        .filter((k) => k.indexOf('repository') === 0)
        .reduce((newData, k) => {
          newData[k] = formValues[k]
          return newData
        }, {})
    )

    Object.keys(formValues).forEach((key) => {
      if (/repository-[0-9]/gm.test(key)) delete formValues[key]
    })

    formValues.planName = planName
    formValues.invoicingFrequency = radioButtonsState.invoicingFrequency
    formValues.approveTermsConditions = 1
    formValues.noRepositories = isRepositoriesSelected ? 1 : 0
    formValues.discount = membershipPrice.data.discount
    formValues.price = membershipPrice.data.price
    formValues.priceCalculated = membershipPrice.data.priceCalculated

    const selectRepo = e.target['select-repository']
    formValues.repoName = selectRepo.value

    membership.setData({
      ...formValues,
      repository,
    })

    await membership.submit()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const fetchPrice = async () => {
    await membershipPrice.fetchPrice()
  }

  const calculatePrice = () => {
    const { price } = membershipPrice.data
    const discountRow = membershipPrice.data.typesContracts

    if (price > 1 && discountRow) {
      const typesContracts = form.fields.find(
        (field) => field.id === 'typesContracts'
      )
      const option = typesContracts.options.find(
        (field) => field.id === discountRow
      )

      const discount = option.value
      if (Number.isInteger(option.value)) {
        membershipPrice.data.priceCalculated = price - (price * discount) / 100
        membershipPrice.data.discount = discount
      } else membershipPrice.data.priceCalculated = price
    }
  }

  // Check for changing select
  const handleSelectChange = (name, value, oldValue) => {
    if (name.includes('repository') && oldValue) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in dataProviders.data) {
        if (
          // eslint-disable-next-line no-prototype-builtins
          !dataProviders.data.hasOwnProperty(key) ||
          !dataProviders.data[key].id
        )
          // eslint-disable-next-line no-continue
          continue
        if (dataProviders.data[key].name === oldValue) {
          membershipPrice.data.repository =
            membershipPrice.data.repository.filter(
              (item) => item !== dataProviders.data[key].id
            )
          break
        }
      }
    }

    setFormValues({
      ...formValues,
      [name]: value,
    })

    if (planName !== 'starting') {
      if (name.includes('typesContracts')) {
        if (value === 'Annual rolling') setTypeContractAnnual(true)
        else setTypeContractAnnual(false)
      }

      if (name.includes('repository')) {
        membershipPrice.data.repository.push(value)
        membershipPrice.data.planName = planName
        fetchPrice()
      }

      if (name.includes('typesContracts'))
        membershipPrice.data.typesContracts = value

      calculatePrice()
    }
  }

  const toggleHelpBox = () => {
    setVisibleHelpBox(!visibleHelpBox)
  }

  const closeHelpBox = () => {
    setVisibleHelpBox(false)
  }

  useOutsideClick(helpBoxRef, closeHelpBox)

  const onCreateNewInput = () => {
    setRepositoryInputsList([
      ...repositoryInputsList,
      {
        ...initRepositorySelect,
        ['name' && 'id']: `${initRepositorySelect.id}-${
          repositoryInputsList.length + 2
        }`,
      },
    ])
  }

  const onDeleteInput = (id) => {
    const list = repositoryInputsList.filter((input) => input.id !== id)
    const { [id]: _tmp, ...rest } = formValues

    setRepositoryInputsList(list)
    setFormValues(rest)

    // Update priceCalculated
    const repository = []
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(rest))
      if (key.includes('repository')) repository.push(value)

    membershipPrice.data.repository = repository
    fetchPrice()
  }

  return (
    <Form id={form.id} className={styles.form} onSubmit={handleSubmit}>
      {form.fields.map((field) => {
        if (field.type === 'input') {
          return (
            <div key={field.id}>
              {field.optional && (
                <span className={styles.inputAppend}>{field.appendText}</span>
              )}
              <TextField
                className={classNames.use(styles.input, {
                  [styles.filled]: formValues[field.id] !== '',
                })}
                id={field.id}
                value={formValues[field.id]}
                placeholder={field.placeholder}
                name={field.id}
                label={field.label}
                required={!field.optional}
                onChange={handleInputChange}
              />
              {field.appendTextBottom && (
                <span className={styles.inputAppendBottom}>
                  {field.appendTextBottom}
                </span>
              )}
            </div>
          )
        }
        if (field.type === 'checkbox') {
          if (planName === 'starting' && field.id === 'noRepositories')
            return <div key={field.id} />
          return (
            <div key={field.id}>
              <Checkbox
                id={field.id}
                labelText={Parser(field.label)}
                setCheckbox={
                  field.id === 'approveTermsConditions'
                    ? setIsTermsConditions
                    : setRepositoriesSelected
                }
                className={styles.paymentLink}
              />
            </div>
          )
        }
        if (field.type === 'radio') {
          if (planName === 'starting' || typeContractsAnnual)
            return <div key={field.id} />
          return (
            <div key={field.id}>
              <Radiobutton
                id={field.id}
                labelText={Parser(field.label)}
                setRadioButtonsState={setRadioButtonsState}
                options={field.options}
              />
            </div>
          )
        }
        if (field.type === 'select') {
          if (planName === 'starting' && field.id === 'typesContracts')
            return <div key={field.id} />
          return (
            <Select
              key={field.id}
              id={field.id}
              placeholder={field.placeholder}
              label={field.label}
              type={field.type}
              options={field.options}
              prependIcon="#magnify"
              loading={dataProviders.isLoading}
              setFormValue={handleSelectChange}
            />
          )
        }

        if (field.type === 'button') {
          if (planName === 'starting' && field.id === 'addRepositories')
            return <div key={field.id} />
          return (
            <div key={field.label}>
              <button
                aria-label="create-new-input"
                type="button"
                className={classNames.use(styles.buttonPlus, {
                  [styles.hidden]:
                    repositoryInputsList.length === form.maxRepositoriesCount,
                })}
                onClick={onCreateNewInput}
              />
              <span className={styles.buttonPlusCaption}>{field.caption}</span>
            </div>
          )
        }
        if (field.type === 'caption') {
          if (planName !== 'starting') return <div key={field.id} />
          return (
            <div className={styles.help} key={field.label} ref={helpBoxRef}>
              <button
                type="button"
                className={styles.helpButton}
                onClick={toggleHelpBox}
              >
                {field.label}
              </button>
              {visibleHelpBox && (
                <ListBox className={styles.helpBox} list={field.options} />
              )}
            </div>
          )
        }

        return repositoryInputsList.map((input) => (
          <Select
            key={input.id}
            id={input.id}
            placeholder={input.placeholder}
            label={input.label}
            type={input.type}
            options={input.options}
            loading={dataProviders.isLoading}
            inputLimit={3}
            setFormValue={handleSelectChange}
            onDelete={input.id !== initRepositorySelect.id && onDeleteInput}
            required={!input.optional ?? true}
          />
        ))
      })}
      <div className={styles.box}>
        {planName === 'starting' ? (
          ''
        ) : (
          <Markdown className={styles.price}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {isRepositoriesSelected
              ? patchNumberComma(
                  form.errorPriceCalculation,
                  membershipPrice.data
                )
              : // eslint-disable-next-line no-nested-ternary
              membershipPrice.data.priceCalculated <= 1
              ? membershipPrice.data.priceCalculated === 0
                ? 'Annual fee: N/A'
                : patchNumberComma(
                    form.errorPriceCalculation,
                    membershipPrice.data
                  )
              : patchNumberComma(form.priceCalculated, membershipPrice.data)}
          </Markdown>
        )}
        <Button
          type="submit"
          variant="contained"
          className={isTermsConditions ? '' : styles.buttonUnActive}
        >
          {form.action.caption}
        </Button>
      </div>
    </Form>
  )
})

export default PaymentDefailsForm
