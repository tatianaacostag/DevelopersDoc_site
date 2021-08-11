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
* [Request payout]({{< ref "Payouts-API.md#request-payout" >}})
* [Update payout request]({{< ref "Payouts-API.md#update-payout-request" >}})
* [Cancel payout request]({{< ref "Payouts-API.md#cancel-payout-request" >}})
* [Create a WebHook]({{< ref "Payouts-API.md#create-a-webhook" >}})
* [Delete a WebHook]({{< ref "Payouts-API.md#delete-a-webhook" >}})
* [Query WebHooks]({{< ref "Payouts-API.md#query-webhooks" >}})

## Authentication
The first step regardless of the method you want to request is to authenticate your account using the credentials provided by PayU.

The _authentication_ method logs in the merchant returning the JWT Token generated to use the services exposed by Payouts. This token is available during 10 minutes after its creation.

### API Call
To authenticate, send the request as follows:

```JAVA
POST
https://{env-api}.payulatam.com/v1.0/authenticate?apiKey={apiKey}&apiLogin={apiLogin}
```
<br>

 The value for the variable `{env-api}` displayed above is `sandbox-transfers` for testing and `transfers` for production mode.

| Parameter     | Description                                                              | Mandatory |
|---------------|--------------------------------------------------------------------------|:---------:|
| apiKey        | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |    Yes    |
| apiLogin      | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |    Yes    |

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

## Request payout
This method lets you create one or multiple Payouts request for third parties which can be new or existing. As soon as you create the request, this moves along the [available states]({{< ref "payouts.html#payout-states" >}}) for Payouts.

{{% alert title="Note" color="info"%}}

You need to include two headers to use this method, refer to [Configuring authentication]({{< ref "Payouts-API.md#configuring-the-authentication" >}}) for more information. Furthermore, you need to know your Merchant and account ID, you can get this information in your PayU Module.

{{% /alert %}}

### API Call
To create a Payout request, use the following URL:

```JAVA
POST
https://{env-api}.payulatam.com/v1.0/supplier-transfers/{merchantId}/{accountId}
```
<br>

 The value for the variable `{env-api}` displayed above is `sandbox-transfers` for testing and `transfers` for production mode.

| Parameter     | Description                                                           | Mandatory |
|---------------|-----------------------------------------------------------------------|:---------:|
| merchantId    | Merchant’s ID number in PayU’s system.                                |    Yes    |
| accountId     | ID of the user account for each country associated with the merchant. |    Yes    |

Both parameters can be found in your PayU module.

### Variables for request and response

<details>
<summary>Request parameters</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| transfer > value | Numeric | | Amount to be transfer from yor funds. The currency of this amount is the one configured in your PayU account | Yes |
| transfer > bankAccount | | | This object has the information of the bank account of the third party that will receive the payment.<br>The third party can be existing or new. | Yes |
| transfer > bankAccount > id | Alphanumeric | 36 | Identifier of the Bank account of the third-party.<br>Send this parameter when you want to request a Payout for an existing third party. | No | 
| transfer > bankAccount > supplierType | Alphanumeric | Min:11 Max:16 | Relationship type between you and your third party. You can choose one of the following values: <ul style="margin-bottom: initial;"><li>`SUBMERCHANT`: select this relation if the third party is a related merchant.</li><li>`RELATED_PROVIDER`: select this relation if the third party is a provider</li><li>`RELATED_THIRD_PARTY`: select this type if the third party is a customer, an employee, or any user of your services.</li></ul><br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfer > bankAccount > accountNumber | Alphanumeric | 15 | Bank account number of the third party.<br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfer > bankAccount > bankCode | Numeric | 2 | Set `CC` for Current account and `CA` for Saving account.<br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfer > bankAccount > country | Alphanumeric | 2 | Country of the bank account in format ISO 3166 Alpha-2.<br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfer > bankAccount > documentNumber | Alphanumeric | | Identification number of the third party.<br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfer > bankAccount > documentType | Alphanumeric | 2 | Identification type of the third party. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}).<br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfer > bankAccount > expeditionDate | Alphanumeric | 10 | Expedition date of the identity document of the third party. Format `YYYY/MM/DD`<br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfer > bankAccount > fullName | Alphanumeric |  | Full name of the third party.<br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfer > bankAccount > birthDate | Alphanumeric | 10 | Birth date of the third party. Format `YYYY/MM/DD`<br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfer > bankAccount > state| Alphanumeric |  | State of the Bank account. Set `ACTIVE` when you are creating a new third party. | No |
| transfer > bankAccount > merchantId | Numeric | | Internal identifier in your system of the third party. | No |
| transfer > description | Alphanumeric | | Additional information of the payout. | No |
<!--additionalData-->

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| totalSuccessful | Numeric |  | Number of payouts successfully created. |
| totalFailed | Numeric |  |  | Number of payments that could not be created. |
| failedItems | List |  | List of items that failed during processing. |
| successfulItems | List |  | List of items that were successfully processed. This list includes the Payout ID and the Third party Id when you create a new one. |

</details>

{{% alert title="Note" color="info"%}}

If you want to update the information of a third party when sending the request, send the `transfer.bankAccount.id` along with the information you want to update. Otherwise, you need to use the method to update the [payout request]({{< ref "Payouts-API.md#update-payout-request" >}}).

{{% /alert %}}

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Response example:
```JSON
{
  "transfers": [
    {
      "value": 100000,
      "bankAccount": {
        "supplierType": "RELATED_THIRD_PARTY",
        "accountNumber": 18075486100238,
        "bankCode": 45,
        "accountType": "CC",
        "country": "CO",
        "documentNumber": 1020730722,
        "documentType": "CC",
        "expeditionDate": "1996-05-17",
        "fullName": "Nicolas Contreras",
        "birthDate": "1996-05-17",
        "state": "ACTIVE",
        "merchantId": 358
      },
      "description": "Information of the request"
    }
  ]
}
```
<br>

Response body:
```JSON
{
  "totalSuccessful": 1,
  "totalFailed": 0,
  "failedItems": [],
  "successfulItems": []
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML

```
<br>

Response body:
```XML

```
{{< /tab >}}
{{< /tabs >}}

## Update payout request
This method lets you request the update of the bank information of a third party on a running payout request. For example, this method is useful to change the bank account number when the third party changes their bank account.

You can only request the update of the information of a third party for when the Payout status is in `IN_PAYU_PROCESS` or earlier. Refer to [Payout states]({{< ref "payouts.html#payout-states" >}}) for more information. 

{{% alert title="Note" color="info"%}}

You need to include two headers to use this method, refer to [Configuring authentication]({{< ref "Payouts-API.md#configuring-the-authentication" >}}) for more information. Furthermore, you need to know your Merchant and account ID, you can get this information in your PayU Module.

{{% /alert %}}

### API Call
To create a Payout request, use the following URL:

```JAVA
PUT
https://{env-api}.payulatam.com/v1.0/supplier-transfers/bank-account/{bankAccountId}
```
<br>

Where:
* The value for the variable `{env-api}` is `sandbox-transfers` for testing and `transfers` for production mode.
* The value for the variable `{bankAccountId}` is the third party Id returned by the [Request payout service]({{< ref "Payouts-API.md#request-payout" >}})

### Variables for request and response

<details>
<summary>Request parameters</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| id | Alphanumeric | 36 | Identifier of the Bank account of the third-party. | Yes | 
| supplierType | Alphanumeric | Min:11 Max:16 | Relationship type between you and your third party. You can choose one of the following values: <ul style="margin-bottom: initial;"><li>`SUBMERCHANT`: select this relation if the third party is a related merchant.</li><li>`RELATED_PROVIDER`: select this relation if the third party is a provider</li><li>`RELATED_THIRD_PARTY`: select this type if the third party is a customer, an employee, or any user of your services.</li></ul> | No |
| accountNumber | Alphanumeric | 15 | Bank account number of the third party. | No |
| bankCode | Numeric | 2 | Set `CC` for Current account and `CA` for Saving account. | No |
| country | Alphanumeric | 2 | Country of the bank account in format ISO 3166 Alpha-2. | No |
| documentNumber | Alphanumeric | | Identification number of the third party. | No |
| documentType | Alphanumeric | 2 | Identification type of the third party. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| expeditionDate | Alphanumeric | 10 | Expedition date of the identity document of the third party. Format `YYYY/MM/DD` | No |
| fullName | Alphanumeric |  | Full name of the third party. | No |
| birthDate | Alphanumeric | 10 | Birth date of the third party. Format `YYYY/MM/DD` | No |
| merchantId | Numeric | | Internal identifier in your system of the third party. | No |
<!--additionalData-->

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| totalSuccessful | Numeric |  | Number of payouts successfully processed. |
| totalFailed | Numeric |  |  | Number of payments that could not be proccessed. |
| failedItems | List |  | List of items that failed during processing. |
| successfulItems | List |  | List of items that were successfully processed. |

</details>
<br>

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Response example:
```JSON
{
  "id": "1f92a225-9559-4b7f-9739-e6bb27b8b838",
  "accountNumber": 18075486100238,
  "bankCode": 35
}
```
<br>

Response body:
```JSON
{
  "totalSuccessful": 1,
  "totalFailed": 0,
  "failedItems": [],
  "successfulItems": []
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML

```
<br>

Response body:
```XML

```
{{< /tab >}}
{{< /tabs >}}

## Cancel payout request
This method lets you request the cancellation of a payout request. YYou can only request the cancellation of a Payout when its status is `IN_PAYU_PROCESS` or earlier. Refer to [Payout states]({{< ref "payouts.html#payout-states" >}}) for more information. 

{{% alert title="Note" color="info"%}}

You need to include two headers to use this method, refer to [Configuring authentication]({{< ref "Payouts-API.md#configuring-the-authentication" >}}) for more information. Furthermore, you need to know your Merchant and account ID, you can get this information in your PayU Module.

{{% /alert %}}

### API Call
To create a Payout request, use the following URL:

```JAVA
DELETE
https://{env-api}.payulatam.com/v1.0/supplier-transfers/{paymentOrderId}
```
<br>

Where:
* The value for the variable `{env-api}` is `sandbox-transfers` for testing and `transfers` for production mode.
* The value for the variable `{paymentOrderId}` is the Payout id generated when the order was created by the [Request payout service]({{< ref "Payouts-API.md#request-payout" >}})

### Variables for request and response

<details>
<summary>Request parameters</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| comments | Alphanumeric | | Reason to cancel the Payout request. | No |
| pushPaymentId | Alphanumeric | | Payout ID of the request to be cancelled. | No |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| totalSuccessful | Numeric |  | Number of payouts successfully processed. |
| totalFailed | Numeric |  |  | Number of payments that could not be processed. |
| failedItems | List |  | List of items that failed during processing. |
| successfulItems | List |  | List of items that were successfully processed. |

</details>
<br>

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Response example:
```JSON
{
  "comments": "Request cancellation for payout",
  "pushPaymentId": "1f92a225-9559-4b7f-9739-e6bb27b8b838"
}
```
<br>

Response body:
```JSON
{
  "totalSuccessful": 1,
  "totalFailed": 0,
  "failedItems": [],
  "successfulItems": []
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML

```
<br>

Response body:
```XML

```
{{< /tab >}}
{{< /tabs >}}

## Create a WebHook

The following are the request and response examples for this operation.

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Response example:
```JSON

```
<br>

Response body:
```JSON

```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML

```
<br>

Response body:
```XML

```
{{< /tab >}}
{{< /tabs >}}
<br>

## Delete a WebHook

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

## Query WebHooks


### Query webhooks by Id
The following are the request and response examples for this operation.

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
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

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
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