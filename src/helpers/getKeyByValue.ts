const getKeyByValue = <Value,>(object: Record<string, Value>, value: Value): string[] =>
  Object.keys(object).filter((key) => object[key] === value)

export default getKeyByValue
