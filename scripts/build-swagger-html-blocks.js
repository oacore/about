#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')

const SWAGGER_PATH = path.join(__dirname, '..', 'data', 'swagger-v4.json')
const OUTPUT_DIR = path.join(__dirname, '..', 'public/api-swagger')
const TAG_OUTPUTS = [
  ['Affiliations', 'api-docs-v4-affiliations.html'],
  ['Authorships', 'api-docs-v4-authorships.html'],
  ['Institutions', 'api-docs-v4-institutions.html'],
]
const HTTP_METHODS = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'options',
  'head',
]

const spec = JSON.parse(fs.readFileSync(SWAGGER_PATH, 'utf8'))

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const escapeCode = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const slugify = (value = '') =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const endpointFilename = (operation) =>
  `${slugify(
    `${operation.method}-${operation.path.replace(/[{}]/g, '')}`
  )}.html`

const formatInline = (value = '') =>
  escapeHtml(value)
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    .replace(/`([^`]+)`/g, '<code>$1</code>')

const formatDescription = (value = '') =>
  String(value)
    .trim()
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    .replace(/`([^`]+)`/g, '<code>$1</code>')

const resolveRef = (schema) => {
  if (!schema || !schema.$ref) return schema

  const parts = schema.$ref.replace(/^#\//, '').split('/')
  return parts.reduce((result, part) => result && result[part], spec)
}

const schemaToType = (schema) => {
  const resolved = resolveRef(schema)
  if (!resolved) return ''
  if (resolved.$ref) return schemaToType(resolveRef(resolved))
  if (resolved.enum)
    return resolved.enum.map((item) => JSON.stringify(item)).join(' | ')
  if (resolved.oneOf) return resolved.oneOf.map(schemaToType).join(' | ')
  if (resolved.anyOf) return resolved.anyOf.map(schemaToType).join(' | ')
  if (resolved.allOf) return resolved.allOf.map(schemaToType).join(' + ')
  if (resolved.type === 'array')
    return `${schemaToType(resolved.items) || 'item'}[]`
  if (resolved.type === 'object' && resolved.additionalProperties) {
    return `object<string, ${
      schemaToType(resolved.additionalProperties) || 'any'
    }>`
  }
  if (resolved.type && resolved.format)
    return `${resolved.type}<${resolved.format}>`
  if (resolved.type) return resolved.type

  return ''
}

const getJsonContent = (content = {}) => {
  const mediaType = content['application/json']
    ? 'application/json'
    : Object.keys(content)[0]

  if (!mediaType) return null

  return {
    mediaType,
    ...content[mediaType],
  }
}

const sampleFromSchema = (schema, seenRefs = new Set(), depth = 0) => {
  if (!schema || depth > 4) return null
  if (schema.example !== undefined) return schema.example
  if (schema.default !== undefined) return schema.default

  if (schema.$ref) {
    if (seenRefs.has(schema.$ref)) return null

    const nextSeenRefs = new Set(seenRefs)
    nextSeenRefs.add(schema.$ref)
    return sampleFromSchema(resolveRef(schema), nextSeenRefs, depth + 1)
  }

  const resolved = resolveRef(schema)
  if (resolved !== schema) return sampleFromSchema(resolved, seenRefs, depth)

  if (schema.oneOf)
    return sampleFromSchema(schema.oneOf[0], seenRefs, depth + 1)
  if (schema.anyOf)
    return sampleFromSchema(schema.anyOf[0], seenRefs, depth + 1)
  if (schema.allOf) {
    return schema.allOf.reduce((result, item) => {
      const sample = sampleFromSchema(item, seenRefs, depth + 1)
      if (
        sample != null &&
        typeof sample === 'object' &&
        !Array.isArray(sample)
      )
        return { ...result, ...sample }
      return result
    }, {})
  }

  if (schema.enum) return schema.enum[0]

  const type = schema.type || (schema.properties ? 'object' : undefined)

  if (type === 'object') {
    return Object.entries(schema.properties || {}).reduce(
      (result, [name, property]) => ({
        ...result,
        [name]: sampleFromSchema(property, seenRefs, depth + 1),
      }),
      {}
    )
  }

  if (type === 'array')
    return [sampleFromSchema(schema.items, seenRefs, depth + 1)]

  if (type === 'integer' || type === 'number') return 0
  if (type === 'boolean') return false
  if (type === 'bool') return null
  if (type === 'string') return 'string'

  return null
}

const getRequestSample = (requestBody) => {
  if (!requestBody) return null

  const jsonContent = getJsonContent(requestBody.content)
  if (!jsonContent) return null

  const example =
    jsonContent.example ||
    (jsonContent.examples &&
      Object.values(jsonContent.examples)[0] &&
      Object.values(jsonContent.examples)[0].value)

  return {
    mediaType: jsonContent.mediaType,
    value:
      example !== undefined
        ? example
        : sampleFromSchema(jsonContent.schema || {}),
  }
}

const getResponseSamples = (responses = {}) =>
  Object.entries(responses).reduce((result, [status, response]) => {
    const jsonContent = getJsonContent(response.content)
    if (!jsonContent) return result

    const example =
      jsonContent.example ||
      (jsonContent.examples &&
        Object.values(jsonContent.examples)[0] &&
        Object.values(jsonContent.examples)[0].value)

    result.push({
      mediaType: jsonContent.mediaType,
      status,
      value:
        example !== undefined
          ? example
          : sampleFromSchema(jsonContent.schema || {}),
    })

    return result
  }, [])

const highlightJson = (value) =>
  escapeCode(JSON.stringify(value, null, 2)).replace(
    /("(?:\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"\s*:|"(?:\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"|true|false|null|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let className = 'json-number'
      const isKey = /:\s*$/.test(match)
      const suffix = isKey ? match.match(/\s*:$/)[0] : ''
      const token = isKey ? match.slice(0, -suffix.length) : match

      if (/^"/.test(token)) className = isKey ? 'json-key' : 'json-string'
      else if (token === 'true' || token === 'false') className = 'json-boolean'
      else if (token === 'null') className = 'json-null'

      return `<span class="${className}">${token}</span>${suffix}`
    }
  )

const renderSampleBlock = (sample) => `
  <div class="sample-block">
    <div class="content-type">
      <strong>Content type</strong>
      <span>${escapeHtml(sample.mediaType)}</span>
    </div>
    <div class="sample-actions" aria-hidden="true">
      <span>Copy</span>
      <span>Expand all</span>
      <span>Collapse all</span>
    </div>
    <pre class="sample-code"><code>${highlightJson(sample.value)}</code></pre>
  </div>`

const renderRequestSamples = (requestBody) => {
  const sample = getRequestSample(requestBody)

  return `
    <section class="sample-section">
      <h4>Request samples</h4>
      <button class="sample-tab" type="button">Payload</button>
      ${
        sample
          ? renderSampleBlock(sample)
          : '<p class="sample-empty">No request body.</p>'
      }
    </section>`
}

const renderResponseSamples = (responses) => {
  const samples = getResponseSamples(responses)

  return `
    <section class="sample-section">
      <h4>Response samples</h4>
      ${
        samples.length > 0
          ? samples
              .map(
                (sample) => `
                  <button class="status-tab" type="button">${escapeHtml(
                    sample.status
                  )}</button>
                  ${renderSampleBlock(sample)}
                `
              )
              .join('')
          : '<p class="sample-empty">No response sample.</p>'
      }
    </section>`
}

const getRequestBodyRows = (requestBody) => {
  if (!requestBody) return []

  const content = requestBody.content || {}
  const jsonContent = content['application/json'] || Object.values(content)[0]
  const schema = resolveRef(jsonContent && jsonContent.schema)

  if (!schema) return []

  const required = new Set(schema.required || [])
  const properties = schema.properties || {}

  if (Object.keys(properties).length === 0) {
    return [
      {
        name: 'body',
        location: 'body',
        type: schemaToType(schema),
        required: Boolean(requestBody.required),
        description: requestBody.description || schema.description || '',
      },
    ]
  }

  return Object.entries(properties).map(([name, property]) => ({
    name,
    location: 'body',
    type: schemaToType(property),
    required: required.has(name),
    description: property.description || '',
    defaultValue: property.default,
    example: property.example,
  }))
}

const getArgumentRows = (operation, inheritedParameters = []) => {
  const parameters = [...inheritedParameters, ...(operation.parameters || [])]
  const parameterRows = parameters.map((parameter) => ({
    name: parameter.name,
    location: parameter.in,
    type: schemaToType(parameter.schema),
    required: Boolean(parameter.required),
    description: parameter.description || '',
    defaultValue: parameter.schema && parameter.schema.default,
    example:
      parameter.example || (parameter.schema && parameter.schema.example),
  }))

  return [...parameterRows, ...getRequestBodyRows(operation.requestBody)]
}

const renderValue = (label, value) => {
  if (value == null) return ''

  return `<span class="meta-item"><strong>${label}:</strong> ${formatInline(
    typeof value === 'string' ? value : JSON.stringify(value)
  )}</span>`
}

const renderArguments = (rows) => {
  if (rows.length === 0) return '<p class="muted">No arguments.</p>'

  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>In</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row) => `
                <tr>
                  <td><code>${escapeHtml(row.name)}</code></td>
                  <td><span class="location">${escapeHtml(
                    row.location
                  )}</span></td>
                  <td>${
                    row.type ? `<code>${escapeHtml(row.type)}</code>` : ''
                  }</td>
                  <td>${row.required ? 'Yes' : 'No'}</td>
                  <td>
                    ${formatInline(row.description)}
                    <span class="field-meta">
                      ${renderValue('Default', row.defaultValue)}
                      ${renderValue('Example', row.example)}
                    </span>
                  </td>
                </tr>
              `
            )
            .join('')}
        </tbody>
      </table>
    </div>`
}

const renderResponses = (responses = {}) => {
  const entries = Object.entries(responses)
  if (entries.length === 0) return ''

  return `
    <details>
      <summary>Responses</summary>
      <div class="responses">
        ${entries
          .map(([status, response]) => {
            const content = response.content || {}
            const mediaTypes = Object.keys(content)
            const schema = mediaTypes
              .map((mediaType) => schemaToType(content[mediaType].schema))
              .filter(Boolean)
              .join(', ')

            return `
              <div class="response-row">
                <code>${escapeHtml(status)}</code>
                <span>${formatInline(response.description || '')}</span>
                ${schema ? `<small>${escapeHtml(schema)}</small>` : ''}
              </div>`
          })
          .join('')}
      </div>
    </details>`
}

const operations = Object.entries(spec.paths || {}).flatMap(
  ([endpointPath, pathItem]) => {
    const inheritedParameters = pathItem.parameters || []

    return HTTP_METHODS.filter((method) => pathItem[method]).map((method) => {
      const operation = pathItem[method]
      return {
        id: operation.operationId || slugify(`${method}-${endpointPath}`),
        method: method.toUpperCase(),
        path: endpointPath,
        tag: (operation.tags && operation.tags[0]) || 'Untagged',
        summary: operation.summary || endpointPath,
        description: operation.description || '',
        arguments: getArgumentRows(operation, inheritedParameters),
        requestBody: operation.requestBody,
        responses: operation.responses,
      }
    })
  }
)

const groups = operations.reduce((result, operation) => {
  if (!result.has(operation.tag)) result.set(operation.tag, [])
  result.get(operation.tag).push(operation)
  return result
}, new Map())

const renderOperation = (operation) => `
              <article class="endpoint" id="${escapeHtml(operation.id)}">
                <header class="endpoint-header">
                  <span class="method method-${operation.method.toLowerCase()}">${
  operation.method
}</span>
                  <code>${escapeHtml(operation.path)}</code>
                  <span class="endpoint-chevron">&#8964;</span>
                </header>
                <h3>${escapeHtml(operation.summary)}</h3>
                <div class="description">${formatDescription(
                  operation.description
                )}</div>
                <h4>Arguments</h4>
                ${renderArguments(operation.arguments)}
                ${renderRequestSamples(operation.requestBody)}
                ${renderResponseSamples(operation.responses)}
                ${renderResponses(operation.responses)}
              </article>
            `

const renderGroup = ([tag, tagOperations]) => `
      <section class="tag-section" id="${slugify(tag)}">
        <h2>${escapeHtml(tag)}</h2>
        ${tagOperations.map(renderOperation).join('')}
      </section>
    `

const renderGroups = (groupEntries) => groupEntries.map(renderGroup).join('')

const renderNav = (groupEntries) =>
  groupEntries
    .map(
      ([tag, tagOperations]) => `
      <li>
        <a href="#${slugify(tag)}">${escapeHtml(tag)}</a>
        <small>${tagOperations.length}</small>
      </li>`
    )
    .join('')

const renderEndpointNav = (operation) => `
      <li>
        <a href="#${escapeHtml(operation.id)}">${escapeHtml(
  operation.method
)} ${escapeHtml(operation.path)}</a>
        <small>${escapeHtml(operation.tag)}</small>
      </li>`

const renderHtml = (pageTitle, nav, renderedGroups) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(pageTitle)} endpoint reference</title>
    <style>
      :root {
        --core-orange: #b75400;
        --ink: #212121;
        --muted: #666;
        --line: #e6e6e6;
        --soft: #f7f7f7;
        --code: #f4f2ef;
        --panel: #414141;
        --panel-dark: #202020;
        --panel-mid: #2c2c2c;
        --panel-line: #585858;
        --panel-text: #f2f2f2;
        --sample-blue: #0276a6;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        color: var(--ink);
        font: 16px/1.5 Arial, Helvetica, sans-serif;
        background: #fff;
      }

      a {
        color: var(--core-orange);
      }

      code,
      pre {
        font-family: "Roboto Mono", "SFMono-Regular", Consolas, monospace;
      }

      pre {
        overflow-x: auto;
        padding: 16px;
        border: 1px solid var(--line);
        background: var(--code);
      }

      code {
        overflow-wrap: anywhere;
      }

      .page {
        display: grid;
        grid-template-columns: 280px minmax(0, 1fr);
        min-height: 100vh;
      }

      .sidebar {
        position: sticky;
        top: 0;
        height: 100vh;
        padding: 24px;
        overflow-y: auto;
        border-right: 1px solid var(--line);
        background: var(--soft);
      }

      .brand {
        display: block;
        width: 128px;
        height: auto;
        margin-bottom: 28px;
      }

      .sidebar h2 {
        margin: 0 0 16px;
        font-size: 18px;
      }

      .sidebar ul {
        padding: 0;
        margin: 0;
        list-style: none;
      }

      .sidebar li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 8px 0;
        border-bottom: 1px solid #ddd;
      }

      .sidebar small {
        color: var(--muted);
      }

      .content {
        width: min(100%, 1120px);
        padding: 40px 32px 80px;
      }

      .intro {
        display: none;
      }

      h1 {
        margin: 0 0 12px;
        font-size: 36px;
        line-height: 1.15;
      }

      h2 {
        margin: 48px 0 20px;
        font-size: 28px;
        line-height: 1.2;
      }

      h3 {
        margin: 16px 0 12px;
        font-size: 22px;
      }

      h4 {
        margin: 24px 0 10px;
        font-size: 16px;
        text-transform: uppercase;
      }

      .endpoint {
        margin: 24px 0 32px;
        padding: 0 0 28px;
        color: var(--panel-text);
        background: var(--panel);
        border: 1px solid #333;
      }

      .endpoint-header {
        display: flex;
        align-items: center;
        gap: 14px;
        max-width: 100%;
        margin: 0;
        padding: 12px 20px;
        background: var(--panel-dark);
        box-shadow: 0 0 0 1px #111;
      }

      .method,
      .location {
        flex: 0 0 auto;
        padding: 2px 8px;
        color: #fff;
        font-size: 13px;
        font-weight: 700;
        border-radius: 2px;
        background: var(--core-orange);
      }

      .method {
        min-width: 54px;
        padding: 5px 10px;
        text-align: center;
        background: var(--sample-blue);
      }

      .method-post {
        background: var(--sample-blue);
      }

      .endpoint-header code {
        color: #fff;
        background: transparent;
      }

      .endpoint-chevron {
        display: none;
      }

      .location {
        color: var(--core-orange);
        background: #fae2d2;
      }

      .endpoint > h3,
      .endpoint > h4,
      .endpoint > .description,
      .endpoint > .table-wrap,
      .endpoint > details,
      .sample-section {
        margin-left: 20px;
        margin-right: 20px;
      }

      .endpoint > h3 {
        color: #fff;
      }

      .description {
        max-width: 880px;
        color: #eee;
      }

      .description a,
      .description .link {
        color: #f4b27b;
        overflow-wrap: anywhere;
      }

      .description b {
        color: #fff;
      }

      .description code,
      td code {
        padding: 1px 4px;
        border-radius: 2px;
      }

      .table-wrap {
        overflow-x: auto;
        border: 1px solid var(--panel-line);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        min-width: 720px;
      }

      th,
      td {
        padding: 12px;
        text-align: left;
        vertical-align: top;
        border-bottom: 1px solid var(--line);
      }

      th {
        color: #fff;
        background: var(--panel-mid);
        font-size: 14px;
      }

      td {
        border-color: var(--panel-line);
      }

      .field-meta,
      .meta-item {
        display: block;
      }

      .field-meta {
        margin-top: 6px;
        color: var(--muted);
        font-size: 13px;
      }

      .muted {
        color: var(--muted);
      }

      details {
        margin-top: 18px;
      }

      summary {
        cursor: pointer;
        font-weight: 700;
      }

      .responses {
        margin-top: 10px;
        border: 1px solid var(--panel-line);
      }

      .response-row {
        display: grid;
        grid-template-columns: 80px minmax(0, 1fr) minmax(0, 220px);
        gap: 12px;
        padding: 10px 12px;
        border-bottom: 1px solid var(--panel-line);
      }

      .response-row:last-child {
        border-bottom: 0;
      }

      .response-row small {
        color: #ccc;
      }

      .sample-section {
        margin-top: 28px;
      }

      .sample-section h4 {
        margin: 0 0 18px;
        color: #fff;
        font-size: 20px;
        line-height: 1.2;
        text-transform: none;
      }

      .sample-tab,
      .status-tab {
        min-width: 98px;
        height: 34px;
        margin: 0 0 6px;
        color: var(--ink);
        font: 700 14px/1 Arial, Helvetica, sans-serif;
        background: #fff;
        border: 1px solid #bdbdbd;
        border-radius: 4px;
      }

      .status-tab {
        color: #4f9a10;
      }

      .sample-block {
        max-width: 920px;
        padding: 20px;
        background: var(--panel-dark);
      }

      .content-type {
        padding: 10px 14px 14px;
        background: var(--panel-mid);
      }

      .content-type strong {
        display: block;
        margin-bottom: 6px;
        color: #bdbdbd;
        font-size: 12px;
      }

      .content-type span {
        color: #fff;
      }

      .sample-actions {
        display: none;
        /*display: flex;*/
        /*justify-content: flex-end;*/
        /*gap: 24px;*/
        /*padding: 18px 0 4px;*/
        /*color: #bdbdbd;*/
      }

      .sample-code {
        min-height: 84px;
        margin: 0;
        padding: 0;
        color: #eee;
        white-space: pre;
        border: 0;
        background: transparent;
      }

      .json-key {
        color: #f5f5f5;
      }

      .json-string {
        color: #7ee08f;
      }

      .json-number {
        color: #72a8ff;
      }

      .json-boolean {
        color: #ff5252;
      }

      .json-null {
        color: #b8758d;
      }

      .sample-empty {
        max-width: 920px;
        margin: 0;
        padding: 16px 20px;
        color: #ccc;
        background: var(--panel-dark);
      }

      @media (max-width: 860px) {
        .page {
          display: block;
        }

        .sidebar {
          position: static;
          height: auto;
          border-right: 0;
          border-bottom: 1px solid var(--line);
        }

        .content {
          padding: 28px 16px 56px;
        }

        h1 {
          font-size: 30px;
        }

        .endpoint-header {
          align-items: flex-start;
          flex-direction: column;
        }

        .response-row {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <aside class="sidebar">
        <img src="images/logo/core-logo-fullsize.png" alt="CORE" class="brand">
        <h2>Endpoints</h2>
        <nav>
          <ul>${nav}</ul>
        </nav>
      </aside>
      <main class="content">
        <section class="intro">
          <h1>${escapeHtml(pageTitle)} endpoint reference</h1>
          <p class="muted">Generated from <code>data/swagger-v4.json</code>. Includes endpoint descriptions and arguments from the OpenAPI specification.</p>
        </section>
        ${renderedGroups}
      </main>
    </div>
  </body>
</html>
`

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

TAG_OUTPUTS.forEach(([tag, filename]) => {
  const tagOperations = groups.get(tag)
  if (!tagOperations) {
    throw new Error(`Swagger tag not found: ${tag}`)
  }

  const outputPath = path.join(OUTPUT_DIR, filename)
  const groupEntries = [[tag, tagOperations]]
  const title = `${spec.info && spec.info.title} ${tag}`

  fs.writeFileSync(
    outputPath,
    renderHtml(title, renderNav(groupEntries), renderGroups(groupEntries))
  )

  console.log(`Swagger HTML documentation written to ${outputPath}`)

  tagOperations.forEach((operation) => {
    const endpointOutputPath = path.join(
      OUTPUT_DIR,
      endpointFilename(operation)
    )
    const endpointTitle = `${spec.info && spec.info.title} ${
      operation.method
    } ${operation.path}`
    const endpointGroupEntries = [[tag, [operation]]]

    fs.writeFileSync(
      endpointOutputPath,
      renderHtml(
        endpointTitle,
        renderEndpointNav(operation),
        renderGroups(endpointGroupEntries)
      )
    )

    console.log(
      `Swagger endpoint HTML documentation written to ${endpointOutputPath}`
    )
  })
})
