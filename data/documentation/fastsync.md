---
title: CORE FastSync documentation
---

The CORE FastSync dump implements the approach of the [ResourceSync Framework
Resource Dump standard](http://www.openarchives.org/rs/1.1/resourcesync#ResourceDump).
The FastSync dump can be downloaded at the following url:
[`https://core.ac.uk/dumps/resync_dump.tar.xz`](https://core.ac.uk/dumps/resync_dump.tar.xz)

Note that this is an extremely large file (&Tilde;395GB) and appropriate tools are necessary for downloading it. Once extracted it will use about 2.1TB of filesystem.

1.  To validate a  download compare it with the MD5 Checksum by running:

    ```sh
    md5sum resync_dump.tar.xz
    ```

2.  Test  that the output hash is the same as the following:

    ```txt
    73efe0336a6e730bae7a34b2c5e21309
    ```

3.  Perform the extraction by running:

    ```sh
    tar -xf resync_dump.tar.xz -C /target/directory
    ```

4.  The previous steps will extract the big archive in multiple smaller files.
    Each archive contains all the resources for a specific CORE data provider
    the full list which you can find at our [data providers](/data-providers)
    page.

    The following command extracts every single archive in the
    appropriate folder.

    ```sh
    #!/bin/bash

    for FILE in `ls -1 tmp/*.tar.xz`;
    do
            PROVIDER="${FILE%.*.*}"
            echo $PROVIDER
            echo $FILE
            mkdir -p output/$PROVIDER
    	tar xf $FILE -C output/$PROVIDER/
    done
    ```

    Replace _PROVIDER_ with the ID of every single archive.



The extracted folder generated in step 4, is a two-level deep
file structure and includes a Manifest named manifest.xml file
in the root, which lists the resources. Below is the format of
a single entry in the manifest which lists the available resources:

```xml
<url>
  <loc>https://core.ac.uk/api-v2/articles/get/132196135</loc>
  <rs:md
    hash="md5:39127e4b3b76fc5a66f3eabee28ab71f"
    length="3759"
    type="application/json"
    path="/182/a2/132196135.json"
  />
</url>
```

The url inside the `<loc></loc>` tags is the ID of the file that can be used
for tracking future updates on the resource. The path attribute is where the
file can be found in the folder structure, and in order to validate the file,
a md5 checksum and the file size are also provided.

## Data structure

This is a sample data structure from the Fast Sync Dump

```json
{
  "doi": DOI,
  "coreId": "228783",
  "oai": OAI_IDENTIFIER,
  "identifiers": [ADDITIONAL IDENTIFIERS],
  "title": "TITLE",
  "authors": ["AUTHOR1", "AUTHOR2"],
  "enrichments": {
    "references": [REFERENCES],
    "documentType": {
      "type": "RESEARCH|THESIS|PRESENTATION",
      "confidence": CONFIDENCE
    },
    "citationCount": COUNT
  },
  "contributors": [CONTRIBUTORS],
  "datePublished": "DATE OR YEAR",
  "abstract": "ABSTRACT",
  "downloadUrl": DOWNLOAD URL IF AVAILABLE,
  "fullTextIdentifier": FULL TEXT ID IF AVAILABLE,
  "pdfHashValue": HASH OF THE PDF IF AVAILABLE,
  "publisher": PUBLISHER,
  "rawRecordXml": "XML RECORD",
  "journals": [JOURNALS],
  "language": {
    "code": "COUNTRY CODE",
    "name": "LANGUAGE NAME",
    "id": ID
  },
  "relations": ["URLs WITH RELATIONS"],
  "year": PUBLICATION YEAR,
  "topics": ["TOPIC1","TOPIC2" ],
  "subjects": ["SUBJECT1", "SUBJECT2"],
  "issn": "ISSN-IDENTIFIER",
  "fullText": "FULL TEXT"
}
```
### Fields description
| Field name   |      Description      |
|----------|:-------------|
| doi |  [Digital Object Identifier](https://www.doi.org). A persistent and unique identifier for the document. This data is collected from the data provider or discovered by enrichment processes by CORE using [Crossref](https://crossref.org) and other DOIs collections.  |
| coreId |  The persistent identifier of a document in the CORE infrastructure. |
| oai |  The identifier of a resource harvested from a repository. It usually contains a static part identifying the data provider and a variable part identifying the single record. It is originated by data provider using the OAI-PMH protocol but if the data provider is not using it, CORE will generate one for the record. |
| identifiers |  A list of identifiers for the document, it might contains urls, PMC IDs, DOI etc. This information is collected from the data provider (`dc.identifier` tag) and enriched by CORE. |
| title |  The title of the document|
| authors |  An array containing the list of authors. |
| enrichments |  This sub-object contains enrichments to the data harvested from the data provider. |
| enrichments.references |  A list of references (other documents) discovered by CORE. |
| enrichments.documentType |  The type of the document. We use a machine learning algorithm to discover the document type, the type has also a confidence associated.  |
| enrichments.citationCount |  The count of papers citing the paper. This information is extracted via [Microsoft Academic Graph](https://www.microsoft.com/en-us/research/project/microsoft-academic-graph/). |
| contributors |  Matches the `dc.contributors` tag in the Dublin Core metadata format. |
| datePublished |  Date of when the document has been published. If the data is not available from the original data provider, CORE will try to discover this using other data sources. |
| abstract |  The abstract of the document |
| downloadUrl |  The url where the full text is available. If the full text is hosted in CORE this will be a CORE url, otherwise it will be a url to a different data source.|
| fullTextIdentifier |  This url is the location where CORE managed to find the hosted full text. |
| pdfHashValue |  An hash value of the pdf, to validate the integrity of a document and test for duplicates and changes.|
| publisher |  Coming from `dc.publisher` |
| rawRecordXml |  left-aligned |
| journals |  Sub object containing metadata about the journal where the record has been publish. |
| language |  Language of the record discovered by CORE. |
| relations |  Coming from `dc.relations` |
| year |  Based on the different dates available for the record, this field contains the year on which this document has been published. It uses only year because data quality is variable and many document don't have detailed informations. |
| topics |  Coming from `dc.topic`.|
| subjects |  Coming from `dc.subject` |
| issn |  The issn of the journal where the article was published on. This information is extracted from the [Crossref](https://crossref.org) data. |
| fullText |  The text extracted from the hosted full text. |





## Keeping the FastSync dump up to date

1.  Clone the rs-aggregator project from Github

    ```sh
    git clone https://github.com/oacore/rs-aggregator.git
    ```

2.  Once cloned, run mvn install from the root of the project.
    The format of the changelist download url is as follows:
    `http://core.ac.uk/resync/changelist/[unix_timestamp_in_ms]/changelist_index.xml`

    The `[unix_timestamp_in_ms]` should match the last time a download
    was performed.

3.  Place the created url in the `cfg/uri-list.txt` file on the first line
    and run the application with:

    ```sh
    java -cp target/rs-aggregator-jar-with-dependencies.jar uk.ac.core.main.COREBatchSyncApp
    ```

This will start the synchronisation process. The updated files will be in the
folder with the path described below and the folder structure is the same
as the one described in the dump above.
`destination/core.ac.uk/resync/changelist/[timestamp]`

## How to customise the synchronisation process
In case you want to have a custom implementation of FastSync the following is the specification of the services.

You can call the following endpoint to retrieve a batch of documents from the CORE dataset.
```
http://core.ac.uk/datadump
```
The endpoint accepts POST requests with a JSON list of CORE urls as parameter. This is an example of a valid request:
```
["https://core.ac.uk/api-v2/articles/get/43083", "https://core.ac.uk/api-v2/articles/get/43088"]
```
The response will be a zip file containing the resources with a manifest created using the [resource dump manifest](http://www.openarchives.org/rs/1.1/resourcesync#ResourceDumpManifest) specifications of ResourceSync.
Additionally, the endpoint accepts also an `exclude` GET parameter to customise the requests and optimise the data transmission. You can exclude any field by paasing them as a comma-separated list. For example:
```
http://core.ac.uk/datadump?exclude=rawRecordXml,fullText
```
Will return a data dump with all the document excluding the fields `rawRecordXml` and `fullText`.

## Suggested mapping for the content in an ElasticSearch index
An [ElasticSearch](https://www.elastic.co/products/elasticsearch) index is not needed for performing FasySync. However, it is an easy way to store and perform analysis on the FastSync dump.
The following is an indicative data mapping that you can use to start your ElasticSearch indexing.
```json
{
  "core_fastsync_articles": {
    "mappings": {
      "article": {
        "properties": {
          "authors": {
            "type": "text",
            "fields": {
              "raw": {
                "type": "keyword"
              }
            },
            "analyzer": "rebuilt_simple"
          },
          "contributors": {
            "type": "keyword"
          },
          "datePublished": {
            "type": "keyword"
          },
          "abstract": {
            "type": "text",
            "term_vector": "yes",
            "analyzer": "rebuilt_simple"
          },
          "enrichments": {
          "type": "nested",
          "properties": {
          "documentType": {
          "type": "keyword"
          },
          "documentTypeConfidence": {"type": "double"}},
          "references":{
                      "type": "nested",
                      "properties": {
                        "authors": {
                          "type": "text",
                          "analyzer": "rebuilt_simple"
                        },
                        "cites": {
                          "type": "text",
                          "analyzer": "rebuilt_simple"
                        },
                        "date": {
                          "type": "date",
                          "format": "strict_date_optional_time||yyyy||yyyy-mm-dd||yyyy-mm"
                        },
                        "doi": {
                          "type": "keyword"
                        },
                        "id": {
                          "type": "long"
                        },
                        "raw": {
                          "type": "text",
                          "analyzer": "rebuilt_simple"
                        },
                        "title": {
                          "type": "text",
                          "analyzer": "rebuilt_simple"
                        }
                      }
                    }
          }
          },
          "downloadUrl": {
            "type": "keyword"
          },
          "fullText": {
            "type": "text",
            "term_vector": "yes",
            "analyzer": "rebuilt_simple"
          },
          "fullTextIdentifier": {
            "type": "keyword"
          },
          "coreId": {
            "type": "long"
          },
          "identifiers": {
            "type": "keyword"
          },
          "journals": {
            "type": "nested",
            "properties": {
              "identifiers": {
                "type": "keyword"
              },
              "title": {
                "type": "text",
                "fields": {
                  "raw": {
                    "type": "keyword"
                  }
                }
              }
            }
          },
          "language": {
            "type": "nested",
            "properties": {
              "code": {
                "type": "keyword"
              },
              "id": {
                "type": "keyword"
              },
              "name": {
                "type": "keyword"
              }
            }
          },
          "oai": {
            "type": "keyword"
          },
          "pdfHashValue": {
            "type": "keyword"
          },
          "datePublished": {
            "type": "long"
          },
          "publisher": {
            "type": "text"
          },
          "rawRecordXml": {
            "type": "keyword"
          },
          "relations": {
            "type": "keyword"
          },
          "subjects": {
            "type": "keyword"
          },
          "title": {
            "type": "text",
            "term_vector": "yes",
            "analyzer": "rebuilt_simple"
          },
          "topics": {
            "type": "keyword"
          },
          "year": {
            "type": "long"
          }
        }
      }
    }
  }
```
