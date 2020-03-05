---
title: CORE Dataset
---

## Available datasets by year

### 2018 onwards

**Deduplication Dataset 2020**
[Register for Access](/dataset/getdatadump)

Dataset created for Deduplication of Scholarly Documents using Locality Sensitive Hashing and Word Embeddings (LREC 2020) (62 MB compressed, 204 MB in total)

**CORE-MAG Mapping 2019-04-01**

[Register for Access](/dataset/getdatadump)

CORE Dataset to Microsoft Academic Graph (MAG) mapping (80MB compressed, 173 MB in total) - 8.9M items

**Dataset 2018-03-01**

[Register for Access](/dataset/getdatadump)

Metadata only dataset (beta) (127 GB) - 123M metadata items, 85.6M items with abstract

With full text dataset (beta) (330 GB) - 123M metadata items, 85.6M items with abstract, 9.8M items with fulltext

**Note:**  
For extracting all repositories, you will need up to 509 GB (metadata) or 1.3 TB (full text) of free space on disk. It is possible to extract each repository individually. Please read the section "Structure of datasets" below for more information.

### 2017

**Dataset 2017-11-01**  

[Register for Access](/dataset/getdatadump)

Metadata only dataset (beta) (22.65 GB) - 64 million items

With full text dataset (beta) (157.38 GB) - 8 million items  

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
