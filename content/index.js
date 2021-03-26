import { basename, extname } from 'path'

import yaml from 'js-yaml'
import extractFrontMatter from 'front-matter'
import { Octokit } from '@octokit/rest'
import camelize from 'camelize'

const octokit = new Octokit()

const repo = {
  owner: 'oacore',
  repo: 'content',
}

const parseId = (fileName) => basename(fileName, extname(fileName))
const parseFormat = (fileName) =>
  ({
    md: 'markdown',
    markdown: 'markdown',
    yml: 'yaml',
    yaml: 'yaml',
  }[extname(fileName).slice(1)])

const processFile = (githubFile) => {
  const content = atob(githubFile.content)

  // Returning array to make it consistent with directory processing result.
  // It simplifies processing data in batch.
  return [[githubFile.path, content]]
}

const processDirectory = (githubDirectory) => {
  const urls = githubDirectory.map(({ download_url: url }) => url)

  return Promise.all(urls.map((url) => octokit.request(url)))
    .then((responses) => responses.map(({ data }) => data))
    .then((rawFiles) =>
      rawFiles.map((content, i) => [githubDirectory[i].path, content])
    )
}

const parseData = (entries) =>
  entries.map(([fileName, content]) => {
    const format = parseFormat(fileName)
    const id = parseId(fileName)

    if (format === 'yaml') {
      const data = yaml.load(content)
      return [id, data]
    }

    if (format === 'markdown') {
      const rawData = extractFrontMatter(content)
      const data = {
        ...rawData.attributes,
        body: rawData.body,
      }
      return [id, data]
    }

    // Returning plain text or possible binary if could not parse
    return [id, content]
  })

const transformData = (
  entries,
  { strategy = 'auto', key: targetKey = 'id' } = {}
) => {
  const processedEntries = entries.map(([key, value]) => [
    key,
    typeof value == 'object' ? camelize(value) : value,
  ])

  if (strategy === 'auto') {
    const autoEntries = processedEntries.map(([key, value]) => ({
      [targetKey]: key,
      ...value,
    }))

    return autoEntries.length === 1 ? autoEntries[0] : autoEntries
  }

  return processedEntries
}

const retrieveContent = (path, { ref, transform = 'auto', key } = {}) =>
  octokit.repos
    .getContent({ ...repo, path, ref })
    .then(({ data }) =>
      Array.isArray(data) ? processDirectory(data) : processFile(data)
    )
    .then(parseData)
    .then((dataEntries) =>
      transformData(dataEntries, { strategy: transform, key })
    )

export default retrieveContent
