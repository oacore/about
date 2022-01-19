import dataset from 'data/registration.yml'
import { useStore } from 'store'

const findText = (element) => {
  const { registration } = useStore()
  const { sections } = dataset

  const text = sections.find(
    ({ id }) =>
      id === `${registration.data.productType}-${registration.data.accountType}`
  )[element]

  return text || null
}

export default findText
