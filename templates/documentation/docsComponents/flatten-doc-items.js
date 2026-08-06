const flattenDocItems = (items = []) =>
  items
    .flatMap((node) => [node, ...flattenDocItems(node.children ?? [])])
    .filter(({ id }) => id)
    .map((node) => ({ ...node, id: node.id.replace(/^#/, '') }))

export default flattenDocItems
