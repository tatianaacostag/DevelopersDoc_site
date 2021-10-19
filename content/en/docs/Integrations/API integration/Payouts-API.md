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

{{% alert title="Note" color="warning"%}}

Service URL displayed here are not in sandbox or production environment yet. If you need to know when they will be available, contact your sales representative.

{{% /alert %}}

## Configuring the authentication
To use the methods to manage Payouts or WebHooks exposed by the Payouts service, you must include the `Authorization` and `PublicKey` headers:

* To configure the `Authorization` header, call the [authentication method]({{< ref "Payouts-API.md#authentication" >}}) provided by the Payouts service. <br>Example:

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
* [Create or update a WebHook]({{< ref "Payouts-API.md#create-or-update-a-webhook" >}})
* [Delete a WebHook]({{< ref "Payouts-API.md#delete-a-webhook" >}})
* [Query WebHooks]({{< ref "Payouts-API.md#query-webhooks" >}})

## Authentication
The first step regardless of the method you want to request is to authenticate your account using the credentials provided by PayU.

The _authentication_ method logs in the merchant returning the JWT Token generated to use the services exposed by Payouts. This token is available during 10 minutes after its creation.

### API Call
To authenticate, send the request as follows:

```JAVA
POST
https://{env-api}.payulatam.com/push-payment/v1.0/authenticate?apiKey={apiKey}&apiLogin={apiLogin}
```
<br>

 The value for the variable `{env-api}` displayed above is `sandbox-web` for testing and `web` for production mode.

| Parameter     | Description                                                              | Mandatory |
|---------------|--------------------------------------------------------------------------|:---------:|
| apiKey        | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |    Yes    |
| apiLogin      | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |    Yes    |

#### Response example

{{< tabs tabTotal="1" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
{
  "token": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYyODU0ODE2NywiaWF0IjoxNjI4NTQ4MTY3fQ.jrO3u5ramYKOvoNNb0TNfBuZkbYg1EvPmCDDYXFEO4c"
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
```XML

```
{{< /tab >}}-->
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
https://{env-api}.payulatam.com/push-payment/v1.0/supplier-transfers/{merchantId}/{accountId}
```
<br>

 The value for the variable `{env-api}` displayed above is `sandbox-web` for testing and `web` for production mode.

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
| transfers | List | | List of the transfers you want to create. | Yes |
| transfers[n] > value | Numeric | | Amount to be transfer from yor funds. The currency of this amount is the one configured in your PayU account | Yes |
| transfers[n] > bankAccount | | | This object has the information of the bank account of the third party that will receive the payment.<br>The third party can be existing or new. | Yes |
| transfers[n] > bankAccount > id | Alphanumeric | 36 | Identifier of the Bank account of the third-party.<br>Send this parameter when you want to request a Payout for an existing third party. | No | 
| transfers[n] > bankAccount > supplierType | Alphanumeric | Min:11 Max:16 | Relationship type between you and your third party. You can choose one of the following values: <ul style="margin-bottom: initial;"><li>`SUBMERCHANT`: select this relation if the third party is a related merchant.</li><li>`RELATED_PROVIDER`: select this relation if the third party is a provider</li><li>`RELATED_THIRD_PARTY`: select this type if the third party is a customer, an employee, or any user of your services.</li></ul><br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfers[n] > bankAccount > accountNumber | Alphanumeric | Max:17 | Bank account number of the third party.<br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfers[n] > bankAccount > bankCode | Numeric | Min:3 Max:4 | Code of the bank who issued the account of the third party. [See Bank codes]({{< ref "response-codes-and-variables.html#banks-for-payouts" >}}). | No |
| transfers[n] > bankAccount > accountType | Alphanumeric | 2 | Set `CC` for Current account and `CA` for Saving account or `Nequi`<sup>\*</sup>.<br>This parameter is mandatory when you are creating a payout request for a new third party.<br><sup>\*</sup>_Nequi is available in Colombia_. | No |
| transfers[n] > bankAccount > country | Alphanumeric | 2 | Country of the bank account in format ISO 3166 Alpha-2.<br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfers[n] > bankAccount > documentNumber | Numeric | 50 | Identification number of the third party. If the `documentType` is `NIT`, send the check digit.<br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfers[n] > bankAccount > documentType | Alphanumeric | 2 | Identification type of the third party. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}).<br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfers[n] > bankAccount > expeditionDate | Alphanumeric | 10 | Expedition date of the identity document of the third party. Format `YYYY/MM/DD`. For legal person, send any valid date.<br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfers[n] > bankAccount > fullName | Alphanumeric |  | Full name of the third party.<br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfers[n] > bankAccount > birthDate | Alphanumeric | 10 | Birth date of the third party. Format `YYYY/MM/DD`. For legal person, send any valid date.<br>This parameter is mandatory when you are creating a payout request for a new third party. | No |
| transfers[n] > bankAccount > state| Alphanumeric |  | State of the Bank account. Set `ACTIVE` when you are creating a new third party. | No |
| transfers[n] > bankAccount > merchantId | Numeric | | Identifier of your commerce in PayU. | No |
| transfers[n] > description | Alphanumeric | | Additional information of the payout. | No |
<!--additionalData-->

</details>

<details>
<summary>Response parameters</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| totalSuccessful | Numeric |  | Number of payouts successfully created. |
| totalFailed | Numeric |  | Number of payments that could not be created. |
| successfulItems | List |  | List of items that were successfully processed. |
| successfulItems[n] > processingStatus | Alphanumeric | 7 | Status of the Payout request. For successful transactions, the value is ´SUCCESS´ |
| successfulItems[n] > paymentOrderId | Alphanumeric | 36 | Id generated for the payout request. Use this id to either update or cancel the request. |
| successfulItems[n] > value | Numeric | | Amount of the request. |
| successfulItems[n] > bankAccount | | | This object has the information of the bank account that will receive the payment. |
| successfulItems[n] > bankAccount > processingStatus | Alphanumeric | 7 | Bank account registration status. For successful registrations, the value is ´SUCCESS´. |
| successfulItems[n] > bankAccount > id | Alphanumeric | 36 | Identifier of the registered Bank account. |
| successfulItems[n] > bankAccount > supplierType | Alphanumeric | Min:11 Max:16 | Relationship type selected for the third party. |
| successfulItems[n] > bankAccount > accountNumber | Alphanumeric | Max:17 | Bank account number of the third party. |
| successfulItems[n] > bankAccount > bankCode | Numeric | Min:3 Max:4 | Code of the bank who issued the account of the third party. [See Bank codes]({{< ref "response-codes-and-variables.html#banks-for-payouts" >}}). |
| successfulItems[n] > bankAccount > bankName | Alphanumeric |  | Bank name of the third party. |
| successfulItems[n] > bankAccount > accountType | Alphanumeric | 2 | Account type of the of the third party. |
| successfulItems[n] > bankAccount > country | Alphanumeric | 2 | Country of the bank account. |
| successfulItems[n] > bankAccount > documentNumber | Numeric | 50 | Identification number of the third party. |
| successfulItems[n] > bankAccount > documentType | Alphanumeric | 2 | Identification type of the third party. |
| successfulItems[n] > bankAccount > expeditionDate | Alphanumeric | 10 | Expedition date of the identity document of the third party. |
| successfulItems[n] > bankAccount > fullName | Alphanumeric |  | Full name of the third party. |
| successfulItems[n] > bankAccount > birthDate | Alphanumeric | 10 | Birth date of the third party. |
| successfulItems[n] > bankAccount > state| Alphanumeric |  | State of the Bank account. |
| successfulItems[n] > description | Alphanumeric | | Additional information of the payout. |
| failedItems | List |  | List of items that failed during processing. |
| failedItems[n] > processingStatus | Alphanumeric | 7 | Status of the Payout request. For failed transactions, the value is ´FAILED´. |
| failedItems[n] > failureMessages | List | | List of error messages that generated the failure. |
| failedItems[n] > value | Numeric | | Amount of the request. |
| failedItems[n] > bankAccount | | | This object has the information of the bank account that failed. This element has the same parameters than the object `successfulItems[n].bankAccount`. |
| successfulItems[n] > description | Alphanumeric | | Additional information of the payout. |

</details>
<br>

The following request example sends three payouts: 
* The first and the second payout are requested for unregistered third parties. The second one fails because the parameter `bankCode` has an invalid value.
* The third payout is for a registered third party.

{{< tabs tabTotal="1" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
  "transfers": [
    {
      "value": 1500000,
      "bankAccount": {
        "supplierType": "RELATED_THIRD_PARTY",
        "accountNumber": 2198922910000,
        "bankCode": "007",
        "accountType": "CC",
        "country": "CO",
        "documentNumber": 1026304116,
        "documentType": "CC",
        "expeditionDate": "1996-05-17",
        "fullName": "Santiago Romero Pineda",
        "birthDate": "1975-03-07",
        "merchantId": 510608
      },
      "description": "First Payment"
    },
    {
      "value": 2000000,
      "bankAccount": {
        "supplierType": "RELATED_PROVIDER",
        "accountNumber": 2198922910330,
        "bankCode": "8",
        "accountType": "CA",
        "country": "CO",
        "documentNumber": 102688116,
        "documentType": "CC",
        "expeditionDate": "2001-05-17",
        "fullName": "Juan Perez",
        "birthDate": "1985-04-17",
        "merchantId": 510608
      },
      "description": "Payment of supplies"
    },
    {
      "value": 4500000,
      "bankAccount": {
        "id": "e202507e-5551-4b67-be2a-a2a834bf1438"
      },
      "description": "Registered supplier payment"
    }
  ]
}
```
<br>

Response body:
```JSON
{
    "totalSuccessful": 2,
    "totalFailed": 1,
    "successfulItems": [
        {
            "processingStatus": "SUCCESS",
            "paymentOrderId": "7202a9a7-ef51-4202-bd23-e604f9cbb25b",
            "value": 1500000.00,
            "bankAccount": {
                "processingStatus": "SUCCESS",
                "id": "e202507e-5551-4b67-be2a-a2a834bf1438",
                "supplierType": "RELATED_THIRD_PARTY",
                "accountNumber": "2198922910000",
                "bankCode": "007",
                "bankName": "BANCOLOMBIA",
                "accountType": "CC",
                "country": "CO",
                "documentNumber": "1026304116",
                "documentType": "CC",
                "expeditionDate": "1996-05-16T05:00:00.000+00:00",
                "fullName": "Santiago Romero Pineda",
                "birthDate": "1975-03-06T05:00:00.000+00:00",
                "state": "ACTIVE"
            },
            "description": "First Payment"
        },
        {
            "processingStatus": "SUCCESS",
            "paymentOrderId": "32740b81-5ecc-466c-bc09-699e6e5ceefb",
            "value": 4500000.00,
            "bankAccount": {
                "processingStatus": "SUCCESS",
                "id": "8f425a79-3f15-4e64-a1bf-2f7c087587ec",
                "supplierType": "RELATED_THIRD_PARTY",
                "accountNumber": "0200005555",
                "bankCode": "013",
                "bankName": "BBVA COLOMBIA",
                "accountType": "CA",
                "country": "CO",
                "documentNumber": "81856522",
                "documentType": "CC",
                "expeditionDate": "2002-02-17T05:00:00.000+00:00",
                "fullName": "Jorge Gutierrez",
                "birthDate": "1986-02-11T05:00:00.000+00:00",
                "state": "ACTIVE"
            },
            "description": "Registered supplier payment"
        }
    ],
    "failedItems": [
        {
            "processingStatus": "FAILED",
            "failureMessages": [
                "There is no registered bank with code: 8"
            ],
            "value": 2000000,
            "bankAccount": {
                "processingStatus": "FAILED",
                "supplierType": "RELATED_PROVIDER",
                "accountNumber": "2198922910330",
                "bankCode": "8",
                "accountType": "CA",
                "country": "CO",
                "documentNumber": "102688116",
                "documentType": "CC",
                "expeditionDate": "2001-05-17T00:00:00.000+00:00",
                "fullName": "Juan Perez",
                "birthDate": "1985-04-17T00:00:00.000+00:00"
            },
            "description": "Payment of supplies"
        }
    ]
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
<br>

Request body:
```XML

```
<br>

Response body:
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

## Update payout request
This method lets you request the update of the bank information of a third party on a running payout request. For example, this method is useful to change the bank account number of the third party.

You can only request the update of the information of a third party for when the Payout status is in `IN_PAYU_PROCESS` or earlier. Refer to [Payout states]({{< ref "payouts.html#payout-states" >}}) for more information. 

{{% alert title="Note" color="info"%}}

You need to include two headers to use this method, refer to [Configuring authentication]({{< ref "Payouts-API.md#configuring-the-authentication" >}}) for more information. Furthermore, you need to know your Merchant and account ID, you can get this information in your PayU Module.

{{% /alert %}}

### API Call
To update a Payout request, use the following URL:

```JAVA
PUT
https://{env-api}.payulatam.com/push-payment/v1.0/supplier-transfers/bank-account/{merchantId}/{bankAccountId}
```
<br>

Where:
* The value for the variable `{env-api}` is `sandbox-web` for testing and `web` for production mode.
* The value for the variable `{merchantId}` is the identifier of your commerce in PayU.
* The value for the variable `{bankAccountId}` is the third party Id returned by the [Request payout service]({{< ref "Payouts-API.md#request-payout" >}})

### Variables for request

<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| id | Alphanumeric | 36 | Identifier of the Bank account of the third-party. | Yes |
| accountNumber | Alphanumeric | Max:17 | Bank account number of the third party. | Yes |
<!--additionalData-->

The following are the request and response bodies for this method.

{{< tabs tabTotal="1" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
  "id": "1f92a225-9559-4b7f-9739-e6bb27b8b838",
  "accountNumber": 2198922910031
}
```
<br>

Response body:
```JSON
{
    "message": "Update received"
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
<br>

Request body:
```XML

```
<br>

Response body:
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

## Cancel payout request
This method lets you request the cancellation of a payout request. You can only request the cancellation of a Payout when its status is `IN_PAYU_PROCESS` or earlier. Refer to [Payout states]({{< ref "payouts.html#payout-states" >}}) for more information. 

{{% alert title="Note" color="info"%}}

You need to include two headers to use this method, refer to [Configuring authentication]({{< ref "Payouts-API.md#configuring-the-authentication" >}}) for more information. Furthermore, you need to know your Merchant and account ID, you can get this information in your PayU Module.

{{% /alert %}}

### API Call
To cancel a Payout request, use the following URL:

```JAVA
DELETE
https://{env-api}.payulatam.com/push-payment/v1.0/supplier-transfers/{merchantId}/{paymentOrderId}
```
<br>

Where:
* The value for the variable `{env-api}` is `sandbox-web` for testing and `web` for production mode.
* The value for the variable `{merchantId}` is the identifier of your commerce in PayU.
* The value for the variable `{paymentOrderId}` is the Payout id generated when the order was created by the [Request payout service]({{< ref "Payouts-API.md#request-payout" >}})

### Variables for request

<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| comments | Alphanumeric | | Reason to cancel the Payout request. | No |
| pushPaymentId | Alphanumeric | | Payout ID of the request to be cancelled. | No |

The following are the request and response bodies for this method.

{{< tabs tabTotal="1" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
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
    "message": "Cancellation request received"
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
<br>

Request body:
```XML

```
<br>

Response body:
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

## Create or Update a WebHook
This method lets you create or update a WebHook that allows you to configure a URL where PayU notifies states of a Payout via `POST`.

You can configure a WebHook for the following events:
* **Transfer creation**: sends a notification when a payout request is created. To enable these notifications, include the `TRANSFER_CREATION` value in the list parameter `enabledEvents`.
* **Transfer update**: sends a notification when the sanction screening validation rejects the third party. To enable these notifications, include the `TRANSFER_UPDATE` value in the list parameter `enabledEvents`.
* **Validation result**: sends a notification when third party has approved the sanction screening validation and when the transfer has been rejected by the bank, include the `VALIDATION_RESULT` value in the list parameter `enabledEvents`.

[Click here to know the variables in the notifications]({{< ref "payouts.md#variables-in-the-notifications" >}}).

{{% alert title="Note" color="info"%}}

You need to include two headers to use this method, refer to [Configuring authentication]({{< ref "Payouts-API.md#configuring-the-authentication" >}}) for more information. Furthermore, you need to know your Merchant and account ID, you can get this information in your PayU Module.

{{% /alert %}}

### API Call
* To create a WebHook, use:

```JAVA
POST
https://{env-api}.payulatam.com/push-payment/v1.0/webhooks
```
<br>

* To update a WebHook, use:

```JAVA
PUT
https://{env-api}.payulatam.com/push-payment/v1.0/webhooks
```
<br>

Where:
* The value for the variable `{env-api}` is `sandbox-web` for testing and `web` for production mode.

### Variables for request and response

<details>
<summary>Request parameters</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| id | Alphanumeric |  | Id of the WebHook you want to update. This parameter is mandatory when updating a WebHook | No |
| accountId | Numeric | | ID of the user account for each country associated with the merchant. | Yes |
| callbackUrl | Alphanumeric | | URL used to receive the `POST` notifications sent by PayU according to the events selected. This URL must be unique per WebHook. | Yes |
| description | Alphanumeric | | Description of the WebHook you want to create. | Yes |
| enabledEvents | List | Max:3 | List of the events that will launch a notification to the configured URL when they occur. At least one event must be selected.<br>Possibles values are: `TRANSFER_UPDATE`, `TRANSFER_CREATION`, `VALIDATION_RESULT`. | Yes |

</details>

<details>
<summary>Response parameters</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| id | Alphanumeric |  | Id of the WebHook created. |
| created | Date |  | Creation date of the WebHook. Format `YYYY-DD-MM hh:mm:ss`. |
| accountId | Numeric | | ID of the user account for each country associated with the merchant. |
| callbackUrl | Alphanumeric | | URL used that will receive the `POST` notifications according to the events selected. |
| description | Alphanumeric | | Description of the WebHook created. |
| enabledEvents | List | Max:3 | List of the events selected. |
| status | Alphanumeric | 7 | State of the WebHook. By default, the state of the new WebHook is `ENABLED`. |
| processingStatus | Alphanumeric | 7 | State of creation or update of the WebHook. By default, this state is `SUCCESS`. |

</details>

<br>

The following are the request and response bodies for this method.

{{< tabs tabTotal="1" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
  "accountId": 1,
  "callbackUrl": "https://wwww.callbackurltest.com/",
  "description": "Web Hook For Test Swagger",
  "enabledEvents": [
    "TRANSFER_UPDATE",
    "TRANSFER_CREATION",
    "VALIDATION_RESULT"
  ]
}
```
<br>

Response body:
```JSON
{
    "processingStatus": "SUCCESS",
    "id": "256dd74e-9187-4efb-8238-fa29bf8f587a",
    "created": "2021-08-27T21:57:28.874+00:00",
    "accountId": 1,
    "callbackUrl": "https://wwww.callbackurltest.com/",
    "description": "Web Hook For Test Swagger",
    "enabledEvents": [
        "TRANSFER_UPDATE",
        "TRANSFER_CREATION",
        "VALIDATION_RESULT"
    ],
    "status": "ENABLED"
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
<br>

Request body:
```XML

```
<br>

Response body:
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

## Delete a WebHook
This method lets you delete a WebHook previously created. As soon as you delete a WebHook, you stop receiving notifications.

{{% alert title="Note" color="info"%}}

You need to include two headers to use this method, refer to [Configuring authentication]({{< ref "Payouts-API.md#configuring-the-authentication" >}}) for more information. Furthermore, you need to know your Merchant and account ID, you can get this information in your PayU Module.

{{% /alert %}}

### API Call
To delete a WebHook, use the following URL:

```JAVA
DELETE
https://{env-api}.payulatam.com/push-payment/v1.0/webhooks/{id}
```
<br>

Where:
* The value for the variable `{env-api}` is `sandbox-web` for testing and `web` for production mode.
* `{id}` is the id of the WebHook you want to delete.

#### Response example

<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| processingStatus | Alphanumeric | 7 | State of deletion of the WebHook. By default, this state is `SUCCESS`. |
| id | Alphanumeric |  | Id of the WebHook deleted. |
| status | Alphanumeric | 7 | State of the WebHook. By default, the state of the deleted WebHook is `DELETED`. |

{{< tabs tabTotal="1" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
{
    "processingStatus": "SUCCESS",
    "id": "054e0fc5-a025-4a00-b666-95673c11dee1",
    "status": "DELETED"
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

## Query WebHooks
You can consult WebHooks related to your account either by their id or by the account id. Both methods are explained below. 

{{% alert title="Note" color="info"%}}

You need to include two headers to use this method, refer to [Configuring authentication]({{< ref "Payouts-API.md#configuring-the-authentication" >}}) for more information. Furthermore, you need to know your Merchant and account ID, you can get this information in your PayU Module.

{{% /alert %}}

### Query WebHooks by Id
This method lets you consult the information of a specific WebHook using its id. To query a WebHook, use the following URL:

```JAVA
GET
https://{env-api}.payulatam.com/push-payment/v1.0/webhooks/{id}
```
<br>

Where:
* The value for the variable `{env-api}` is `sandbox-web` for testing and `web` for production mode.
* `{id}` is the id of the WebHook you want to consult.

#### Response example

<details>
<summary>Response parameters</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| processingStatus | Alphanumeric | 7 | State of query. By default, this state is `SUCCESS`. |
| id | Alphanumeric |  | Id of the WebHook deleted. |
| created | Date |  | Creation date of the WebHook. Format `YYYY-DD-MM hh:mm:ss`. |
| accountId | Numeric | | ID of the user account for each country associated with the merchant. |
| callbackUrl | Alphanumeric | | URL used that will receive the `POST` notifications according to the events selected. |
| description | Alphanumeric | | Description of the WebHook created. |
| enabledEvents | List | Max:3 | List of the events selected. |
| status | Alphanumeric | 7 | State of the WebHook. By default, the state of the new WebHook is `ENABLED`. |

</details>
<br>

{{< tabs tabTotal="1" tabID="7" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
{
    "processingStatus": "SUCCESS",
    "id": "9628b74d-e2fb-40cc-b137-b156d1401641",
    "created": "2021-08-28T00:52:26.206+00:00",
    "accountId": 515058,
    "callbackUrl": "https://wwww.callbackurltest.com/",
    "description": "Web Hook For Test Swagger",
    "enabledEvents": [
        "TRANSFER_UPDATE",
        "TRANSFER_CREATION",
        "VALIDATION_RESULT"
    ],
    "status": "ENABLED"
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

### Query webhooks by account
This method lets you consult the information of all the WebHooks created in your account. To query the WebHook list, use the following URL:

```JAVA
GET
https://{env-api}.payulatam.com/push-payment/v1.0/webhooks/account/{accountId}
```
<br>

Where:
* The value for the variable `{env-api}` is `sandbox-web` for testing and `web` for production mode.
* `{accountId}` is the id of your account.

#### Response example

<details>
<summary>Response parameters</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| processingStatus | Alphanumeric | 7 | State of query. By default, this state is `SUCCESS`. |
| id | Alphanumeric |  | Id of the WebHook deleted. |
| created | Date |  | Creation date of the WebHook. Format `YYYY-DD-MM hh:mm:ss`. |
| accountId | Numeric | | ID of the user account for each country associated with the merchant. |
| callbackUrl | Alphanumeric | | URL used that will receive the `POST` notifications according to the events selected. |
| description | Alphanumeric | | Description of the WebHook created. |
| enabledEvents | List | Max:3 | List of the events selected. |
| status | Alphanumeric | 7 | State of the WebHook. By default, the state of the new WebHook is `ENABLED`. |

</details>
<br>

{{< tabs tabTotal="1" tabID="8" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
[
    {
        "processingStatus": "SUCCESS",
        "id": "9628b74d-e2fb-40cc-b137-b156d1401641",
        "created": "2021-08-28T00:52:26.206+00:00",
        "accountId": 515058,
        "callbackUrl": "https://wwww.callbackurltest.com.co/",
        "description": "Web Hook For Test Swagger",
        "enabledEvents": [
            "TRANSFER_UPDATE",
            "TRANSFER_CREATION",
            "VALIDATION_RESULT"
        ],
        "status": "ENABLED"
    },
    {
        "processingStatus": "SUCCESS",
        "id": "672497c2-00f8-4787-a396-4024042eaa20",
        "created": "2021-09-15T16:04:49.131+00:00",
        "accountId": 515058,
        "callbackUrl": "https://wwww.callbackurltest.com.co/",
        "description": "Web Hook For Test Swagger",
        "enabledEvents": [
            "TRANSFER_UPDATE",
            "VALIDATION_RESULT"
        ],
        "status": "ENABLED"
    }
]
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
```XML

```
{{< /tab >}}-->
{{< /tabs >}}