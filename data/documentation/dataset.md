---
title: CORE Dataset
---

## Available datasets by year

### 2018 onwards

**Dataset 2020-03-18**

[Register for Access](/dataset/getdatadump)
   
Full dataset (~400GB, 2.1TB Extracted)

**License:**
All rights reserved. See our [Terms & Conditions](/terms).

**Note:**  
Please read the section "Structure of datasets" below for more information.

**Dataset 2018-03-01**

[Register for Access](/dataset/getdatadump)

Metadata only dataset (beta) (127 GB) - 123M metadata items, 85.6M items with abstract

With full text dataset (beta) (330 GB) - 123M metadata items, 85.6M items with abstract, 9.8M items with fulltext

**License:**
[Open Data Commons Attribution (ODC-By)][license] license.

**Note:**  
For extracting all repositories, you will need up to 509 GB (metadata) or 1.3 TB (full text) of free space on disk. It is possible to extract each repository individually. Please read the section "Structure of datasets" below for more information.

**Deduplication Dataset 2020**

[Register for Access](/dataset/getdatadump)

Dataset created for Deduplication of Scholarly Documents using Locality Sensitive Hashing and Word Embeddings (LREC 2020) (62 MB compressed, 204 MB in total)

**License:**
[Open Data Commons Attribution (ODC-By)][license] license.


**CORE-MAG Mapping 2019-04-01**

[Register for Access](/dataset/getdatadump)

CORE Dataset to Microsoft Academic Graph (MAG) mapping (80MB compressed, 173 MB in total) - 8.9M items

**License:**
[Open Data Commons Attribution (ODC-By)][license] license.


### 2017

**Dataset 2017-11-01**  

[Register for Access](/dataset/getdatadump)

Metadata only dataset (beta) (22.65 GB) - 64 million items

With full text dataset (beta) (157.38 GB) - 8 million items  

**License:**
[Open Data Commons Attribution (ODC-By)][license] license.

Beta notice: while in beta, we cannot guarantee completeness or integrity of the dataset and we appreciate any feedback on the format or data of the dataset. We are aware of an issue where the statistics in the repository object are incorrect or incomplete. We do not use these fields internally and plan on removing them in future releases.  

### Older versions (pre-2017)

These datasets conform to the dataset structure described below as 'Pre-2017'

*   **Dataset 2016-10**  
    [Register for Access](/dataset/getdatadump).  
    Metadata dataset (9.0 GB) - (23.9 million items)  
    Content dataset (102 GB) - (4 million items)  

*   **Dataset 2015-09**  
    [Register for Access](/dataset/getdatadump)  
    Metadata dataset (4.5 GB)  
    Content dataset (30.5 GB)  

*   **Dataset 2014-06-13** _(used for dataset track of [DL2014](https://wosp.core.ac.uk/dl2014/#dataset))_  
    [Register for Access](/dataset/getdatadump)  
    Metadata dataset (3.7 GB)  
    Content dataset (24 GB)  

*   **Dataset 2013-12-15**  
    [Register for Access](/dataset/getdatadump)  
    Metadata dataset (1.7 GB)  

*   **Dataset 2013-04-12**  
    [Register for Access](/dataset/getdatadump)  
    Metadata dataset (181 MB)  
    Metadata dataset as RDF (835 MB)  

## Structure of datasets

### 2020
The CORE dump implements the approach of the [ResourceSync Framework
Resource Dump standard](http://www.openarchives.org/rs/1.1/resourcesync#ResourceDump).

Note that this is an extremely large file (&Tilde;395GB) and appropriate tools are necessary for downloading it. Once extracted it will use about 2.1TB of filesystem.

1.  Perform the extraction by running:

    ```sh
    tar -xf resync_dump.tar.xz -C /target/directory
    ```

2.  The previous steps will extract the big archive in multiple smaller files.
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

#### Data structure

This is a sample data structure from the Dataset

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
##### Fields description
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


### 2018 onwards

The downloadable tar file contains XZ compressed files of Article Metadata. The XZ compressed file is a file named \[repositoryID\].json.xz. Once decompressed, each line in the text file contains the metadata for 1 article in JSON.

We chose the xz format due to a better compression ratio vs bzip2 or gzip. The downside is the tools are not always installed by default.  
Most Linux distributions have xz available for installation in the default package manager. Mac users can install xz via Brew or MacPorts and there are many other free alternatives. Windows users can use 7-zip. If you have any trouble extracting the files, please contact us.

Please note that each JSON file is _not_ valid JSON however, each line is. Each line is delimited using a Windows formatted newline (\\r\\n).

  
The dump structure has changed to following format:

```json
{
  "doi": str|None,
  "coreId": str|None,
  "oai": str|None
  "identifiers": [str],
  "title": str|None,
  "authors": [str],
  "enrichments": {
    "references": [str],
    "documentType": {
       "type": str|None,
       "confidence": str|None
    }
  },
  "contributors": [str],
  "datePublished": str|None,
  "abstract": str|None,
  "downloadUrl": str|None,
  "fullTextIdentifier": str|None,
  "pdfHashValue": str|None,
  "publisher": str|None,
  "rawRecordXml": str|None
  "journals":[str],
  "language": str|None,
  "relations": [str],
  "year": int|None,
  "topics": [str],
  "subjects": [str],
  "fullText": str|None
}
```

### 2017

An example of a metadata item in the data set is as follows. The full record will have more fields available and all fields in its entirety. New lines and truncated values are only for this example.

```json
{
  "id": "28929927",
  "authors": [
    "Knoth, Petr",
    "Anastasiou, Lucas",
    "Pearce, Samuel"
  ],
  "datePublished": "2014",
  "deleted": "ALLOWED",
  "description": "Usage statistics are frequently used by repositories [Description field truncated for example]",
    "fullText": "Open Research Online\nThe Open University’s repository of research publications\nand other research outputs\nMy repository is being aggregated: a blessing or a\ncurse?\nConference Item\nHow to [full text field truncated for example]"
  "fullTextIdentifier": "http://oro.open.ac.uk/41678/1/OpenRepositories2014_v2.pdf",
  "identifiers": [
    "oai:oro.open.ac.uk:41678",
    null
  ],
  "rawRecordXml": "

`\n    \n    \n      oai:oro.open.ac.uk:41678\n      20[rawRecordXml truncated for example]",
  "repositories": [{
    "id": "86",
    "openDoarId": 0,
    "name": "Open Research Online",
      ...
  }],
  "repositoryDocument": {
    "pdfStatus": 1,
    "textStatus": 1,
    "metadataUpdated": 1498862655000,
    "timestamp": 1479481001000,
    "indexed": 1,
    "deletedStatus": "0",
    "pdfSize": 364107,
    "tdmOnly": false
  },
  "title": "My repository is being aggregated: a blessing or a curse?",
  "downloadUrl": "https://core.ac.uk/download/pdf/28929927.pdf",
  ...
}
``` 
                    

                    

### Pre-2017          

The CORE dataset provides access to both the enriched metadata as well as the full-texts. The data dump consists of two files, the metadata file and the content file. Both files are compressed using tar and gzip.

An example of a metadata item in the data set is as follows:

```json
{
  "identifier": 13291,
  "ep:Repository": 1,
  "dc:type": [
    "Report"
  ],
  "bibo:shortTitle": "Evaluating stillbirths : improving stillbirth data could help make stillbirths a visible public health priority",
  "bibo:AuthorList": [
    "IMMPACT",
    "Population Reference Bureau"
  ],
  "dc:date": "2007-02",
  "bibo:cites": [
    {
      "rawReferenceText": "Cynthia Stanton. Stillbirth Rates: Delivering Estimates",
      "authors": [

      ],
      "bibo:shortTitle": "Stillbirth Rates: Delivering Estimates",
      "doi": "10.1016/S0140-6736(06)68586-3"
    }
  ],
  "bibo:citedBy": [

  ],
  "similarities": [
    {
      "identifier": 29886,
      "sim:weight": 0.333121,
      "sim:AssociationMethod": "similarity_cosine"
    },
    {
      "identifier": 33044,
      "sim:weight": 0.325861,
      "sim:AssociationMethod": "similarity_cosine"
    },
    ...,
    {
      "identifier": 43755,
      "sim:weight": 0.173635,
      "sim:AssociationMethod": "similarity_cosine"
    }
  ]
}
```

## Disclaimer

This dataset has been created from information that was publicly available on 
the Internet. Every effort has been made to ensure this dataset contains 
open access content only. We have included content only from repositories 
and journals that are listed in registries where the condition for inclusion
is the provision of content under an open access compatible license. However, 
as metadata are often inconsistent, license information is often not machine 
readable and, from time to time, repositories leak information that is not 
open access, we cannot take any responsibility for the license of the 
content in the dataset. It is therefore up to the user of this dataset to 
ensure that the way in which they use the dataset does not breach copyright.
The dataset is in no way intended for the purposes of reading the original 
publications, but for machine processing only.

[license]: https://opendatacommons.org/licenses/by/1-0/
