---
title: "[DRAFT] CORE support for UK HEIs in the REF 2021 Open Access Audit"
---

In June 2019, Research England released [REF Audit Guidance](https://www.ref.ac.uk/media/1164/ref-2019_04-audit-guidance.pdf) 
which states that CORE data will be used in the REF 2021 Open Access Policy Audit. 
Following the issuing of the guidance, a number of institutions approached CORE 
asking what they can do to ensure CORE can accurately collect the required data 
about their outputs. 

The purpose of this document is to provide advice and recommendations to UK HEIs 
with regards to exposing data to CORE through their repositories. In this document, we use the term *repository* to refer to a system that the HEI will use for the purposes of REF 2021 as defined in the Deposit requirements, paragraph 235 of the [Guidance on submissions](https://www.ref.ac.uk/media/1092/ref-2019_01-guidance-on-submissions.pdf). 

### Contents of this document

1. [Key REF 2021 Open Access Policy sections relevant to CORE](#oa-policy)  
2. [What the guidance says about the use of CORE in the audit](#core-audit)  
3. [Recommendations for exposing research outputs’ metadata to CORE in support of the audit](#recommendations)  
4. [How will CORE collect the information?](#collect-info)  
5. [How can CORE help you with making sure your repository is represented well?](#repo-representation)  

<h2 id="oa-policy">Key REF 2021 Open Access Policy sections relevant to CORE</h2>

For the next Research Excellence Framework (REF 2021), a policy has been introduced for open access. 
The policy applies to research outputs satisfying the following two criteria:  

* Outputs published in a journal or in conference proceedings with an ISSN number.  
* Outputs accepted for publication after 1 April 2016.  

The policy stipulates that to be eligible for submission to REF 2021, these
outputs must be deposited in a repository (institutional, subject, or a
repository service) within a specified timeframe. More specifically:  

* Outputs accepted for publication from 1 April 2016 to 31 March 2018 must be
  deposited no later than three months after the **date of publication**.
* Outputs accepted for publication from 1 April 2018 to 31 December 2020 must be
  deposited no later than three months after the **date of acceptance**.  

For more details of the policy please see [REF Guidance on Submissions](https://www.ref.ac.uk/media/1092/ref-2019_01-guidance-on-submissions.pdf), 
paragraphs [233 to 255](https://www.ref.ac.uk/media/1092/ref-2019_01-guidance-on-submissions.pdf#REF_Guidance%20on%20Submissions.indd%3A223%3A62).

<h2 id="core-audit">What the guidance says about the use of CORE in the audit</h2>

In June 2019, Research England released [REF Audit
Guidance](https://www.ref.ac.uk/media/1164/ref-2019_04-audit-guidance.pdf) which
describes how eligibility with the open access policy will be audited. Among
other things, the Audit Guidance specifies that CORE data will be used in the
audit. More specifically, it states:

> 40. We will undertake verification of the dates that outputs became publicly
> available, particularly where they were published early in the REF period or
> are marked as 'pending' publication (for example, by obtaining a letter from
> the publisher). This will include checking the publication year against the
> Crossref database and against Jisc CORE. 

<!-- Markdown blockquote divider -->
> 46. We will assess each HEIs'
> overall compliance with the REF 2021 open access policy by… iv. Using Jisc
> CORE, comparing the **datePublished** and **depositedDate** and identifying
> where the number of days between the two dates is greater than 92.  

<!-- Markdown blockquote divider -->
> 49. Where there is insufficient evidence to demonstrate a robust and
> well-managed process for open access, we will identify a set of outputs from
> each submission made by the HEI, and request further information to verify
> whether they are compliant with the policy, or whether an exception applies.
> Outputs may be selected randomly, or based on information in unpaywall.org or
> Jisc CORE, or a combination of the two. We will select outputs that have been
> returned as compliant with the policy, and/or outputs that have been returned
> with exceptions.



<h2 id="recommendations">
  Recommendations for exposing research outputs’ metadata 
  to CORE in support of the audit
</h2>

The following points list recommendations we make to institutional repositories
to ensure their data is well represented in CORE. While these recommendations
are not mandated by Research England, implementing them will both improve the
quality of the data held by CORE to support the REF Audit as well as increase
the discoverability and visibility of the institutions’ research outputs.  

1. **Make sure that your institutional repository/ies are registered in CORE**: 
We are constantly working towards CORE harvesting all repositories available.
However, as repositories sometimes change their web locations, platforms or
some institutions introduce multiple repositories, we advise institutions to
check that their repositories are registered and listed on the CORE’s data
[providers page](~data-providers). 

2. **Adopt RIOXX as a data format**: One of the key reasons for the development
of the [RIOXX metadata application](http://www.rioxx.net/) profile was to help
institutions achieve compliance with the REF 2021 Open Access Policy. As of
June 2019, more than 70 UK HEIs already support RIOXX. The application profile 
directly supports some of the metadata fields that are important for the audit,
such as *rioxxterms:publication_date*. While CORE can capture the data also from repositories not supporting RIOXX, supporting RIOXX  greatly reduces the complexity of the algorithm through which CORE acquires the data. The below recommendations detail which 
information should be shared in the metadata and how this information should be
exposed in RIOXX. We further provide an example RIOXX metadata record with all
information needed for the REF Audit correctly set.

3. **Add DOIs to records you are planning to submit to REF**: The REF 2021 OA
policy requires outputs to be deposited  within three months of the date of
acceptance, which will in many cases mean pre-publication, i.e. at a point when
the DOI may not yet be known. To ensure the REF research outputs can be
unambiguously matched to the metadata in the repository, we recommend that
institutions ensure that DOIs (or other persistent identifiers such as PubMed
ID, where appropriate) are added to records to be submitted to REF. This should
be done sufficiently in advance of the audit taking place for all outputs where
DOI has been assigned. According to RIOXX, DOI of the resource should be put in
the *rioxxterms:version_of_record* field.

4. **Release deposit dates publicly, so that they are harvestable by CORE**: At
present, record deposit dates are not explicitly exposed by repositories in both
RIOXX nor standard Dublin Core (DC). We are working with the RIOXX team to
encourage explicit sharing of this information in a machine-readable form and
will update this guidance once a solution is agreed. In the meantime, and as
repositories store the deposit date in their  databases, we encourage
repositories to expose the deposit date on each of the research output’s web
page, even when RIOXX is not implemented, and ideally to mark it as “Date
Deposited:”. For example, EPrints repositories typically display the deposit
date on the page of a given record (an example can be seen
[here](http://oro.open.ac.uk/30891/)). This date must be the date of the first
compliant deposit. We rely on the definition of first compliant deposit provided
[here](http://eprintsug.github.io/hefce_oa/#date-of-first-compliant-deposit-fcd).


5. **Ensure that dateAccepted field is used where known**: The date an output
was accepted for publication should be shared in the RIOXX
*dcterms:dateAccepted* field. 

6. **Ensure that all records to be submitted to REF have a full text linked
directly from the dc:identifier**: According to the RIOXX standard, the
*dc:identifier* field **must** contain an HTTP URI which is a link directly 
pointing to the described resource, i.e. to the MS Word, PDF or another version of
the manuscript. This field should be populated for all records your institution
is planning to submit to the REF and should appear exactly once in the record,
so that the availability of the output in the repository can be automatically
checked.

7. **Ensure that your repository OAI-PMH endpoint is operational**: The OAI-PMH
endpoint in your repository enables aggregators to collect data from your
repository. The [Confederation of Open Access Repositories
(COAR)](https://www.coar-repositories.org/) states that the real benefits of
repositories come from interoperability which gives us the ability to exchange
data within a network. This is currently realised by the OAI-PMH protocol. In
the majority of cases, the OAI-PMH endpoint will be correctly working in your
repository by default. To check its operation there are freely available
[validators](http://validator.oaipmh.com/) that ensure the correct response of
the endpoint. However, the validator does not fully ensure that the data from 
the repository could be harvested without issues, which could be a potential
problem, especially for larger repositories. Any repository can register freely
for the [CORE Repository Dashboard](~services/repository-dashboard/) account
which enables the repository to check its harvesting status.  

Below is an example of a RIOXX record with all recommended fields populated:

<pre>
&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;?xml-stylesheet type="text/xsl" href="/rioxx2.xsl"?&gt;
&lt;rioxx&gt;
  xmlns="http://www.rioxx.net/schema/v2.0/rioxx/"
  xmlns:dc="http://purl.org/dc/elements/1.1/" 
  xmlns:dcterms="http://purl.org/dc/terms/" 
  ...
&gt;
  &lt;dc:title&gt;
    Article title
  &lt;/dc:title&gt;
  &lt;rioxxterms:author id="http://orcid.org/0000-1234-5678-9000"&gt;
    Author name
  &lt;/rioxxterms:author&gt;
  &lt;dc:language&gt;
    en
  &lt;/dc:language&gt;
  &lt;dc:publisher&gt;
    Article publisher (In Press)
  &lt;/dc:publisher&gt;
  <b>&lt;dc:identifier&gt;
    http://repository.ac.uk/12345.pdf
  &lt;dc:identifier&gt;
  &lt;dcterms:dateAccepted&gt;
    2019-07-31
  &lt;/dcterms:dateAccepted&gt;
  &lt;rioxxterms:publication_date&gt;
    2019-09-19
  &lt;/rioxxterms:publication_date&gt;
  &lt;rioxxterms:version_of_record&gt;
    http://dx.doi.org/10.1000/abcd.1234.5678
  &lt;/rioxxterms:version_of_record&gt;</b>
  ...
&lt;/rioxx&gt;
</pre>


<h2 id="collect-info">How will CORE collect the information?</h2>

CORE regularly harvests data from repositories. If all the recommendations
described above are followed, then the procedure is straightforward. If any
deviations are present, CORE will try to collect the data in alternative ways. 
These include:

* If RIOXX is not supported, CORE will gather metadata, such as information
  about the identifier and DOIs, using standard DC. 

* If DOIs are not available for some records, CORE will use available metadata
  to match these records against several key databases, including Crossref and
  Microsoft Academic Graph (MAG), to discover the DOIs. 

* If the date of publication is not supplied by the repository or it doesn’t
  have the desired granularity (we prefer ISO 8601 (post–2004 versions) which
  follows the following format: YYYY-MM-DD), CORE will collect the publication
  date from Crossref. Where the publication date is supplied by the repository
  but the date is not the same as in Crossref, the decision as to which one 
  will be used in the audit will be up to the discretion of Research England. 

* As deposit dates are not part of standard DC and not yet part of RIOXX, CORE
  therefore implements the following two methods for collecting them: 

  * Where deposit dates are visible through the web pages in the repository 
    (see Item 4 above), CORE attempts to collect them by scraping them, 
    i.e. extracting the data from the web page of the record, using custom 
    built scrapers for a variety of repository platforms. 

  * Where deposit dates cannot be obtained using scraping, CORE makes
    use of the record’s Datestamp provided in the record’s metadata. This
    is done in the following way. CORE stores the first Datestamp it
    receives for a given record, i.e. the first time CORE harvests the
    record, as the deposit date. Subsequent changes to the Datestamp, which
    could be due to the record’s updates, will not affect the deposit date.
    Due to the frequent harvesting, this provides a close estimation of the
    deposit date.

This describes the method we use to collect data from repositories that
currently do not support RIOXX. We might update this method if we identify a
way of improving it, such as to make the data we collect more accurate.

When on rare occassions the collected data might be incomplete, it will be up to the discretion of Research England perfroming the audit to interpret the data. We believe that if a record present in the repository has not been harvested by CORE or it was not possible to capture some metadata, this should not negatively affect the audit result. To this end, our aim is to support institutions to identify and resolve any issues prior to the audit. 

<h2 id="repo-representation">
  How can CORE help you with making sure your repository is represented well?
</h2>

CORE Repository Dashboard already provides useful information to check that your
repository is being properly harvested. Additionally, we are currently discussing the possibility of further improvements to the CORE Repository Dashboard to be released in the first quarter of 2020, ideally coinciding with the planned launch of the REF submission systems, to provide support for HEIs participating in the REF. We also offer a free 
[CORE Discovery](~services/discovery) repository plugin which can help repositories discover Open Access full text versions of articles for metadata records in repositories which do not have a full text manuscript attached.

To answer further questions, we have also established and maintain an [FAQ
section](~faq#ref-audit) for the purposes of the audit. If you have
any further questions, please [contact](~contact) the CORE team for support and
we will be happy to help.
