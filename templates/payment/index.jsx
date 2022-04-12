import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Form, TextField } from '@oacore/design/lib/elements/forms'
import { toJS } from 'mobx'
import { Button } from '@oacore/design/lib/elements'
import classNames from '@oacore/design/lib/utils/class-names'

import styles from './styles.module.scss'
import Select from './form/select'

import { observe, useStore } from 'store'
import { Layout, Section } from 'design-v2/components'

const PaymentPageTemplate = observe(({ textData }) => {
  const { membership, dataProviders } = useStore()

  const initRepositorySelect = textData.form.fields.find(
    (field) => field.type === 'async-select'
  )
  if (dataProviders.data) initRepositorySelect.options = [...dataProviders.data]

  const initialValues = textData.form.fields.reduce(
    (o, key) => Object.assign(o, { [key.id]: '' }),
    {}
  )

  const [formValues, setFormValues] = useState(initialValues)
  const [repositoryInputsList, setRepositoryInputsList] = useState([
    initRepositorySelect,
  ])

  useEffect(() => {
    dataProviders.fetchData()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formValues)
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

  const onCreateNewInput = () => {
    setRepositoryInputsList([
      ...repositoryInputsList,
      {
        ...initRepositorySelect,
        ['name' && 'id']: `${initRepositorySelect.id}-${
          repositoryInputsList.length + 1
        }`,
      },
    ])
  }

  return (
    <Layout>
      <Form
        id={textData.form.id}
        className={styles.form}
        onSubmit={handleSubmit}
      >
        {textData.form.fields.map((field) => {
          if (field.type === 'input') {
            return (
              <TextField
                id={field.id}
                value={formValues[field.id]}
                placeholder={field.placeholder}
                name={field.id}
                label={field.label}
                required
                onChange={handleInputChange}
              />
            )
          }
          if (field.type === 'select') {
            return (
              <Select
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
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                type="button"
                className={classNames.use(styles.buttonPlus, {
                  [styles.hidden]:
                    repositoryInputsList.length ===
                    textData.form.maxRepositoriesCount,
                })}
                onClick={onCreateNewInput}
              />
            )
          }

          return repositoryInputsList.map((input) => (
            <Select
              id={input.id}
              placeholder={input.placeholder}
              label={input.label}
              type={input.type}
              options={input.options}
              prependIcon="#magnify"
              loading={dataProviders.isLoading}
              setFormValue={handleSelectChange}
              caption={field.caption}
            />
          ))
        })}

        <button type="submit">SUBMIT</button>
        {/* {repositoryInputsList.length !== textData.form.maxRepositoriesCount && (
          <div className={styles.buttonPlus} onClick={onCreateNewInput} />
        )} */}
      </Form>
    </Layout>
  )
})

export default PaymentPageTemplate
