---
title: "Queries"
linkTitle: "Queries"
date: 2021-03-29T08:15:19-05:00
description: >
  Queries API lets you check the status of the transactions generated from placed orders.
weight: 20
draft: true
---

To integrate with Queries SDK, target the requests to the following URLs:

{{< tabs tabTotal="2" tabID="1" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}

```Java
PayU.paymentsUrl = “https://api.payulatam.com/payments-api/”;
PayU.reportsUrl = “https://api.payulatam.com/reports-api/”;
```

{{< /tab >}}

{{< tab tabNum="2" >}}

```PHP
Environment::setPaymentsCustomUrl(“https://api.payulatam.com/payments-api/4.0/service.cgi”);
Environment::setReportsCustomUrl(“https://api.payulatam.com/reports-api/4.0/service.cgi”);
Environment::setSubscriptionsCustomUrl(“https://api.payulatam.com/payments-api/rest/v4.9/”);
```

{{< /tab >}}
{{< /tabs >}}
