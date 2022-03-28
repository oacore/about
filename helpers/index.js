const getKeyByValue = (object, value) =>
  Object.keys(object).filter((key) => object[key] === value)

export default getKeyByValue
