---
title: CORE API documentation
---
![CORE API image](images/api-core.png)

CORE harvests, maintains, enriches and makes available metadata and full-text
content (typically a PDF) from many Open Access journals and repositories.
This makes it a useful access point for those who would like to develop
applications making use of this content. To support these activities, CORE is
providing a free API.

If you use CORE in your work, we kindly request you to cite one of our
[publications](research-outputs).

## Documentation

The documentation, along with live examples can be found at
[CORE API v2 Swagger](/docs) page.

You can also view some practical examples using the CORE API in this [TDM
course](https://www.fosteropenscience.eu/node/2263).

## Expected use

We expect the API can be used, for example, to:

- Perform text mining to enrich metadata of Open Access publications or to
  even perform different kinds of semantic analysis of publications.
- Semantically annotate (by means of crowdsourcing, collaborative sharing or
  natural language processing) the publications to drive the emergence of
  nano-publications in certain research fields.
- Link publications to research data.
- Carry out impact and citation analysis in the Open Access domain. Many
  other services that need quick and easy access to the content of research
  publications, etc.

## Where to start

Please [register](/api-keys/register) to receive an API key and start
testing the [live examples](/docs).

A good starting point to start coding with our API is to follow the iPython
notebook available [on Github](https://github.com/oacore/or2016-api-demo).

In collaboration with [rOpenSci](https://ropensci.org) you can find
[_R_ client for the CORE API](https://github.com/ropenscilabs/cored)
in the GitHub repository.

## Quota

We apply a quota to the API to allow fair access and a high response time to
our services. Please [get in touch](contact) if you require accessing
our API at a faster rate.   The quota for each method are listed in the
following tables:

### Global methods

| Method                                | Type    |  Limit                     |
|------------------------------------------------------------------------------|
| `/search`                             | batch   |  1 request  per 10 seconds |
| `/search/{query}`                     | single  |  5 requests per 10 seconds |

### Article methods

| Method                                | Type    | Limit                      |
|------------------------------------------------------------------------------|
| `/articles/get`                       | batch   |  1 request  per 10 seconds |
| `/articles/get/{coreId}`              | single  | 10 requests per 10 seconds |
| `/articles/get/{coreId}/download/pdf` | single  | 10 requests per 10 seconds |
| `/articles/get/{coreId}/history`      | single  | 10 requests per 10 seconds |
| `/articles/search`                    | batch   |  1 request  per 10 seconds |
| `/articles/search/{query}`            | single  | 10 requests per 10 seconds |
| `/articles/similar`                   | single  | 10 requests per 10 seconds |

### Journal methods

| Method                                | Type    |  Limit                     |
|------------------------------------------------------------------------------|
| `/journals/get`                       | batch   |  1 request  per 10 seconds |
| `/journals/get/{issn}`                | single  | 10 requests per 10 seconds |
| `/journals/search`                    | batch   |  2 requests per 10 seconds |
| `/journals/search/{query}`            | single  |  5 requests per 10 seconds |

### Repository methods

| Method                                | Type    |  Limit                     |
|------------------------------------------------------------------------------|
| `/repositories/get`                   | batch   | 1 request   per 10 seconds |
| `/repositories/get/{repositoryId}`    | single  | 10 requests per 10 seconds |
| `/repositories/search`                | batch   | 2 requests  per 10 seconds |
| `/repositories/search/{query}`        | single  | 5 requests  per 10 seconds |

In case you require different limits please [contact us](contact).

## CORE data as Linked Open Data (LOD)

Apart from the CORE API, CORE also provides data as LOD for enthusiasts. The
documentation is available at the [datahub](https://datahub.io/dataset/core).
Please note the data is not synced regularly. We encourage all developers to
use the CORE API v2.
