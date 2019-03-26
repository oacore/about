---
title: CORE Publisher Connector documentation
---

The **CORE Publisher Connector** is a software providing seamless access to
Gold and Hybrid Gold Open Access articles aggregated from non-standard systems
of major publishers. CORE now harvests from several publishers using the
Publisher connector engine, which offers a unique way of accessing scientific
content from scholarly publishers. Data is exposed via the ResourceSync
protocol.

ResourceSync is a protocol that overcomes the limitations of the OAI-PMH
protocol; goes further than just metadata exchange, enables sharing of any
kind of resource and offers advanced synchronization mechanisms over the web.

CORE is one of the first to deploy ResourceSync for distributing large amounts
of scholarly literature that scales to millions of items and is capable of
real-time updates. In our deployment of ResourceSync, we utilise the generic
notion of a resource in the protocol and share more than one representation,
i.e. each record contains both metadata and full text.

You can access the content offered by the publisher connector in [CORE's
ResourceSync endpoint](http://publisher-connector.core.ac.uk/resourcesync/).
