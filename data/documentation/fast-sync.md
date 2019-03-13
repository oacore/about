---
title: CORE FastSync
---

The CORE FastSync dump implements the approach of the [ResourceSync Framework 
Resource Dump standard](http://www.openarchives.org/rs/1.1/resourcesync#ResourceDump).
The FastSync dump can be downloaded at the following url:  
[`https://core.ac.uk/dumps/resync_dump.tar.xz`](https://core.ac.uk/dumps/resync_dump.tar.xz)
       
Note that this is an extremely large file (&tilde;200GB) and appropriate tools
are necessary for download it. 

1.  To validate a  download compare it with the MD5 Checksum by running:

    ```sh
    md5sum resync_dump.tar.xz
    ```
       
2.  Test  that the output hash is the same as the following:
    
    ```txt
    b83b7574a0a08e2f733a87416ad958ad
    ```
       
3.  Perform the extraction by running:
    
    ```sh
    tar -xf resync_dump.tar.xz -C /target/directory
    ```
       
4.  The previous steps will extract the big archive in multiple smaller files.
    Each archive contains all the resources for a specific CORE data provider
    and a list of CORE’s data providers can be found here. 

    The following command extracts every single archive in the
    appropriate folder. 

    ```sh
    tar xf PROVIDER.tar.xz -C PROVIDER/ && \
    cat PROVIDER/manifest_.xml && \
    sed -e s#/data/core-remote/scripts/resync_dump/tmp-new/PROVIDER/##g PROVIDER/manifest_.xml > PROVIDER/manifest.xml
    ```
       
    Replace _PROVIDER_ with the ID of every single archive.

    _**NB:** The command is more complex than it should normally be, due to
    a minor error in this version of the dataset that requires an additional
    step to create a ResourceSync compliant format._

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
    }
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
  "fullText": "FULL TEXT"
}
```

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
