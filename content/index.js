import { basename, extname } from 'path'

import yaml from 'js-yaml'
import extractFrontMatter from 'front-matter'
import { Octokit } from '@octokit/rest'
import camelize from 'camelize'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

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
  // Polyfilling because of atob being missing in Node.js < 16
  // and also marked as legacy 🤔
  //
  // Prioritising Buffer over atob because of errors in Node 16 while testing.
  //
  // See more:
  // - https://nodejs.org/api/all.html#globals_atob_data
  // - https://stackoverflow.com/questions/23097928/node-js-throws-btoa-is-not-defined-error
  const content =
    typeof Buffer != 'undefined'
      ? Buffer.from(githubFile.content, 'base64').toString()
      : atob(githubFile.content)

  // Returning array to make it consistent with directory processing result.
  // It simplifies processing data in batch.
  return [[githubFile.path, content]]
}

const processDirectory = (githubDirectory) => {
  // Directory URLs are not supported yet. It's quite a question how to fit
  // directories and recursive processing into current system
  const fileUrls = githubDirectory
    .filter(({ type }) => type === 'file')
    .map(({ download_url: url }) => url)

  return Promise.all(fileUrls.map((url) => octokit.request(url)))
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
      // Due to CMS preference of having `---` before and after actual content
      // we load multiple documents safely but take into account only
      // the first one
      const [data] = yaml.loadAll(content)
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

  if (strategy === 'object') {
    return processedEntries.length === 1
      ? {
          [targetKey]: processedEntries[0][0],
          // Dangerously expects that the value is an object
          ...processedEntries[0][1],
        }
      : camelize(Object.fromEntries(processedEntries))
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
