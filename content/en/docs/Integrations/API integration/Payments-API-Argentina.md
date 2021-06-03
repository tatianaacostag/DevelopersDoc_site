---
title: "Payments API - Argentina"
linkTitle: "Payments API - Argentina"
date: 2021-05-03T15:48:08-05:00
description: >
  Payments API Argentina lets your shop process different transaction types with multiple payment methods.
weight: 20
tags: ["subtopic"]
---

To integrate with Payments API Argentina, target your request to the following URLs according to your environment.

{{% alert title="URL" color="info"%}}
* Test: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Production: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Available methods
Payments API includes the following methods:

* [Submit transaction with credit card]({{< ref "Payments-API-Argentina.md#submit-transaction-with-credit-cards" >}})
* [Submit transaction with cash]({{< ref "Payments-API-Argentina.md#submit-transaction-with-cash" >}})
* [Active payment methods query]({{< ref "Payments-API-Argentina.md#active-payment-methods-query" >}})
* [Ping]({{< ref "Payments-API-Argentina.md#ping" >}})


## Submit transaction with credit cards
This method lets you process the payments performed by your customers using credit cards. For Argentina, you can perform the transactions Authorization, Capture, and Authorization and Capture.

### Autorization
Use this method to perform the authorization of a transaction. The following are the request and response examples for this transaction type.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request example:
```JSON

```
<br>

Response example:
```JSON

```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request example:
```XML
```
<br>

Response example:
```XML
```
{{< /tab >}}
{{< /tabs >}}
<br>

### Capture
Use this method to perform the capture of a transaction. The following are the request and response examples for this transaction type.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request example:
```JSON

```
<br>

Response example:
```JSON

```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request example:
```XML
```
<br>

Response example:
```XML
```
{{< /tab >}}
{{< /tabs >}}
<br>

### Authorization and Capture
Use this method to perform the autorization and capture in one step of a transaction. The following are the request and response examples for this transaction type.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request example:
```JSON

```
<br>

Response example:
```JSON

```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request example:
```XML
```
<br>

Response example:
```XML
```
{{< /tab >}}
{{< /tabs >}}
<br>

## Submit transaction with cash

## Active payment methods query

## Ping

