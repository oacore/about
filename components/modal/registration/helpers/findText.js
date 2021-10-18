import dataset from 'data/registration.yml'

const findText = () => {
  const { sections } = dataset

  return sections || null
}

export default findText
