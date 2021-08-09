---
title: "Payouts API"
linkTitle: "Payouts API"
date: 2021-08-09T14:58:45-05:00
description: >
  This feature allows you to create multiple and secure payments for third parties (users, merchants, providers, customers, etc.) using the funds you have in your PayU Account.
weight: 60
tags: ["subtopic"]
---

For introductory terms, how to request this service and more information, refer to [Payouts]({{< ref "payouts.html" >}}).

## Configuring the authentication
To use the methods to manage Payouts or WebHooks exposed by the Payouts service, you must include the `Authorization` and `PublicKey` headers:

* To configure the `Authorization` header, concatenate `Bearer`, space, and the response of the [authentication method]({{< ref "Payouts-API.md#authentication" >}}) provided by the Payouts service. <br>Example:

```
Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYyODU0ODE2NywiaWF0IjoxNjI4NTQ4MTY3fQ.jrO3u5ramYKOvoNNb0TNfBuZkbYg1EvPmCDDYXFEO4c 
```
<br>

* To configure the `PublicKey` header, use your Public Key which can be found in the PayU Module (**_Settings_** > **_Technical configuration_** > **_Public Key_**).

![PrintScreen](/assets/Promotions/PublicKey.png)

## Available methods
Payouts API includes the following methods:

* [Authentication]({{< ref "Payouts-API.md#authentication" >}})
* [Create third parties]({{< ref "Payouts-API.md#create-third-parties" >}})
* [Delete a third party]({{< ref "Payouts-API.md#delete-a-third-party" >}})
* [Find a third party]({{< ref "Payouts-API.md#find-a-third-party" >}})
* [Request payout]({{< ref "Payouts-API.md#request-payout" >}})
* [Update payout request]({{< ref "Payouts-API.md#update-payout-request" >}})
* [Cancel payout request]({{< ref "Payouts-API.md#cancel-payout-request" >}})
* [Create a WebHook]({{< ref "Payouts-API.md#create-a-webhook" >}})
* [Delete a WebHook]({{< ref "Payouts-API.md#delete-a-webhook" >}})
* [Query WebHooks]({{< ref "Payouts-API.md#query-webhooks" >}})

## Authentication
The first step regardless of the method you want to request is to authenticate your account using the credentials provided by PayU.

The _authentication_ method logs in the merchant returning the JWT Token generated to use the services exposed by Payouts. This token is available during 10 minutes after its creation.

### Variables for request and response

<details>
<summary>Request parameters</summary>
<br>
<div class="variables"></div>

| Parameter     | Description                                                              | Mandatory |
|---------------|--------------------------------------------------------------------------|:---------:|
| apiKey        | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |    Yes    |
| apiLogin      | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |    Yes    |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| token | Alphanumeric |  | Token generated to use the Payouts methods exposed by the service. |

</details>

### API Call
To authenticate, send the request as follows:

```JAVA
GET
https://{env-api}.payulatam.com/v1.0/authenticate?apiKey={apiKey}&apiLogin={apiLogin}
```
<br>

 The value for the variable `{env-api}` displayed above is `sandbox-transfers` for testing and `transfers` for production mode.

**Response example:**

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYyODU0ODE2NywiaWF0IjoxNjI4NTQ4MTY3fQ.jrO3u5ramYKOvoNNb0TNfBuZkbYg1EvPmCDDYXFEO4c"
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```XML

```
{{< /tab >}}
{{< /tabs >}}
<br>

## Create third parties
Before requesting payouts, you can create the third parties to whom you want to create the payment order. Nevertheless, you can request a Payout sending the information of the third party.

### Variables for request and response

<details>
<summary>Request parameters</summary>
<br>
<div class="variables"></div>

| Parameter     | Description                                                              | Mandatory |
|---------------|--------------------------------------------------------------------------|:---------:|
|       |  |        |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| token | Alphanumeric |  | Token generated to use the Payouts methods exposed by the service. |

</details>


## Delete a third party

## Find a third party

## Request payout

The following are the request and response examples for this operation.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Response example:
```JSON

```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Response example:
```XML

```
{{< /tab >}}
{{< /tabs >}}
<br>

## Update payout request


## Cancel payout request



## Create a WebHook

The following are the request and response examples for this operation.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Response example:
```JSON

```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Response example:
```XML

```
{{< /tab >}}
{{< /tabs >}}
<br>

## Delete a WebHook

The following are the request and response examples for this operation.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Response example:
```JSON

```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Response example:
```XML

```
{{< /tab >}}
{{< /tabs >}}
<br>

## Query WebHooks


### Query webhooks by Id
The following are the request and response examples for this operation.

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Response example:
```JSON

```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Response example:
```XML

```
{{< /tab >}}
{{< /tabs >}}
<br>

### Query webhooks by account
The following are the request and response examples for this operation.

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Response example:
```JSON

```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Response example:
```XML

```
{{< /tab >}}
{{< /tabs >}}
<br>