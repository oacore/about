import React, { useEffect, useRef, useState } from 'react'
import { Form, TextField } from '@oacore/design/lib/elements/forms'
import classNames from '@oacore/design/lib/utils/class-names'
import { Button } from '@oacore/design/lib/elements'
import { useOutsideClick } from '@oacore/design/lib/hooks'

import styles from './styles.module.scss'
import Select from './select'

import { patchStats } from 'components/utils'
import { ListBox } from 'design-v2/components'
import { observe, useStore } from 'store'
import { Markdown } from 'components'

const PaymentDefailsForm = observe(({ form }) => {
  const { membership, dataProviders } = useStore()

  const helpBoxRef = useRef(null)

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

  const handleSubmit = async (e) => {
    e.preventDefault()

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

  const handleSelectChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    })
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
            </div>
          )
        }
        if (field.type === 'select') {
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
            setFormValue={handleSelectChange}
            onDelete={input.id !== initRepositorySelect.id && onDeleteInput}
          />
        ))
      })}
      <div className={styles.box}>
        <Markdown className={styles.price}>
          {patchStats(form.price, membership.data)}
        </Markdown>
        <Button type="submit" variant="contained">
          {form.action.caption}
        </Button>
      </div>
    </Form>
  )
})

export default PaymentDefailsForm