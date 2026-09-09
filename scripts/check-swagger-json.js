#!/usr/bin/env node

const fs = require('fs')
const http = require('http')
const https = require('https')
const path = require('path')

const DEFAULT_URL = 'https://api.core.ac.uk/swagger-v3.json'
const DEFAULT_OUTPUT = path.join(__dirname, '..', 'data', 'swagger-v3.json')

const args = process.argv.slice(2)

const getOption = (name, fallback) => {
  const prefix = `${name}=`
  const inline = args.find((arg) => arg.startsWith(prefix))

  if (inline != null) return inline.slice(prefix.length)

  const index = args.indexOf(name)
  if (index !== -1 && args[index + 1] != null) return args[index + 1]

  return fallback
}

const url = getOption('--url', DEFAULT_URL)
const output = path.resolve(getOption('--output', DEFAULT_OUTPUT))
const checkOnly = args.includes('--check-only')

const requestJson = (targetUrl, redirectCount = 0) =>
  new Promise((resolve, reject) => {
    const client = targetUrl.startsWith('https:') ? https : http

    const request = client.get(
      targetUrl,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'oacore-about-swagger-check/1.0',
        },
        timeout: 15000,
      },
      (response) => {
        const { statusCode, headers } = response

        if (
          statusCode >= 300 &&
          statusCode < 400 &&
          headers.location != null
        ) {
          response.resume()

          if (redirectCount >= 5) {
            reject(new Error('Too many redirects'))
            return
          }

          const redirectedUrl = new URL(headers.location, targetUrl).toString()
          resolve(requestJson(redirectedUrl, redirectCount + 1))
          return
        }

        let body = ''

        response.setEncoding('utf8')
        response.on('data', (chunk) => {
          body += chunk
        })
        response.on('end', () => {
          resolve({
            body,
            headers,
            statusCode,
          })
        })
      }
    )

    request.on('timeout', () => {
      request.destroy(new Error('Request timed out'))
    })

    request.on('error', reject)
  })

const main = async () => {
  const response = await requestJson(url)
  const contentType = response.headers['content-type'] || ''

  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new Error(`Expected 2xx response, got HTTP ${response.statusCode}`)
  }

  if (!contentType.includes('application/json')) {
    throw new Error(`Expected JSON content type, got "${contentType}"`)
  }

  let parsed

  try {
    parsed = JSON.parse(response.body)
  } catch (error) {
    throw new Error(`Response is not valid JSON: ${error.message}`)
  }

  if (typeof parsed !== 'object' || parsed == null) {
    throw new Error('Expected JSON document to be an object')
  }

  if (parsed.openapi == null && parsed.swagger == null) {
    throw new Error('JSON does not look like an OpenAPI/Swagger document')
  }

  if (!checkOnly) {
    fs.mkdirSync(path.dirname(output), { recursive: true })
    fs.writeFileSync(output, `${JSON.stringify(parsed, null, 2)}\n`)
  }

  const message = checkOnly
    ? `Swagger JSON exists at ${url}`
    : `Swagger JSON downloaded to ${output}`

  console.log(message)
}

main().catch((error) => {
  console.error(`Swagger JSON check failed: ${error.message}`)
  process.exitCode = 1
})
