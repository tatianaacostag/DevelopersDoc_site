---
title: "Tokenization API"
linkTitle: "Tokenization API"
date: 2021-06-24T10:31:30-05:00
description: >
  The Tokenization API enables you to securely store your customers' credit card data by generating a token. This token allows you to process recurring payments or implement the 1-Click payment feature while adhering to PCI DSS (Payment Card Industry Data Security Standard) requirements for handling credit card information.
weight: 40
tags: ["subtopic"]
---

Tokenization feature is available under customized commercial agreements. For more information, contact your sales representative.

{{% alert title="Note" color="info"%}}

To integrate with the Tokenization API, send your requests to the following URLs based on your environment:

* Test: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Production: ```https://api.payulatam.com/payments-api/4.0/service.cgi```

{{% /alert %}}

## Available Methods

The Tokenization API includes methods to register and remove tokens, query them, and process payments using tokenized credit cards.

* [Individual Credit Card Registration]({{< ref "Tokenization-API.md#individual-credit-card-registration" >}})
* [Massive Credit Card Registration]({{< ref "Tokenization-API.md#massive-credit-card-registration" >}})
* [Individual Token Removal]({{< ref "Tokenization-API.md#individual-token-removal" >}})
* [Massive Token Removal]({{< ref "Tokenization-API.md#massive-token-removal" >}})
* [Query Tokens]({{< ref "Tokenization-API.md#query-tokens" >}})
* [Payments Using Tokenization]({{< ref "Tokenization-API.md#payments-using-tokenization" >}})

## Individual Credit Card Registration

This feature allows you to register a customer's credit card information and generate a token.

### Parameters for Request and Response

<details>

<summary>Request</summary>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request. This determines the language of error messages. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set to `CREATE_TOKEN`. | Yes |
| merchant | Object |  | Object containing authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | PayU provides this username or login. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | PayU provides this password. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| creditCardToken | Object |  | Object containing credit card details for tokenization. | Yes |
| creditCardToken > payerId | Alphanumeric | | Internal ID of the credit card holder. | Yes |
| creditCardToken > name | Alphanumeric | Min:1 Max:255 | Name of the cardholder as displayed on the credit card. | Yes |
| creditCardToken > identificationNumber | Alphanumeric | Max:20 | Identification number of the cardholder. | Yes |
| creditCardToken > paymentMethod | Alphanumeric | 32 | Valid credit card payment method. [See the available Payment Methods]({{< ref "select-your-payment-method.html" >}}). | Yes |
| creditCardToken > number | Alphanumeric | Min:13 Max:20 | Credit card number. | Yes |
| creditCardToken > expirationDate | Alphanumeric | 7 | Expiration date in `YYYY/MM` format. | Yes |

</details>

<details>

<summary>Response</summary>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | Transaction response: `ERROR` or `SUCCESS`. |
| error | Alphanumeric | Max:2048 | Error message returned when the transaction code is `ERROR`. |
| creditCardToken | Object |  | Object containing tokenized credit card details. |
| creditCardToken > creditCardTokenId | Alphanumeric | | Token generated from the credit card details. |
| creditCardToken > name | Alphanumeric | Min:1 Max:255 | Cardholder name as sent in the request. |
| creditCardToken > payerId | Alphanumeric | | Internal ID of the cardholder as sent in the request. |
| creditCardToken > identificationNumber | Alphanumeric | Max:20 | Identification number of the cardholder as sent in the request. |
| creditCardToken > paymentMethod | Alphanumeric | 32 | Franchise of the tokenized credit card as sent in the request. |
| creditCardToken > maskedNumber | Alphanumeric | Min:13 Max:20 | Masked credit card number displaying the first six and last four digits. |

</details>

### API Call

The following examples show request and response bodies.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Request Example:**

```JSON
{
   "language": "es",
   "command": "CREATE_TOKEN",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "creditCardToken": {
      "payerId": "10",
      "name": "APPROVED",
      "identificationNumber": "32144457",
      "paymentMethod": "VISA",
      "number": "4037997623271984",
      "expirationDate": "2025/01"
   }
}
```

<br>

**Response Example:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "creditCardToken": {
        "creditCardTokenId": "05440005-9111-4d34-aa86-deeb91983d54",
        "name": "APPROVED",
        "payerId": "10",
        "identificationNumber": "32144457",
        "paymentMethod": "VISA",
        "number": null,
        "expirationDate": null,
        "creationDate": null,
        "maskedNumber": "403799******1984",
        "errorDescription": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Request Example:**

```XML
<request>
   <language>es</language>
   <command>CREATE_TOKEN</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <creditCardToken>
      <payerId>10</payerId>
      <name>APPROVED</name>
      <identificationNumber>32144457</identificationNumber>
      <paymentMethod>VISA</paymentMethod>
      <number>4916332769997505</number>
      <expirationDate>2024/01</expirationDate>
   </creditCardToken>
</request>
```

<br>

**Response Example:**

```XML
<creditCardTokenResponse>
    <code>SUCCESS</code>
    <creditCardToken>
        <creditCardTokenId>46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3</creditCardTokenId>
        <name>APPROVED</name>
        <payerId>10</payerId>
        <identificationNumber>32144457</identificationNumber>
        <paymentMethod>VISA</paymentMethod>
        <maskedNumber>491633******7505</maskedNumber>
    </creditCardToken>
</creditCardTokenResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Massive Credit Card Registration

This feature allows you to register multiple credit cards stored in a .csv file and generate a token for each card. 

### Considerations

* Each record in the file must follow the specified structure and order, with fields separated by commas:
    - Payer ID
    - Full name
    - Credit card number
    - Expiration date
    - Franchise
    - Identification number
* The file must not contain a header.
* The file must be encoded using UTF-8. You need to implement a function to encode the content and send the encoded string in the `contentFile` parameter.
* The file cannot contain more than 10,000 records.

<br>

**Example:**

![PrintScreen](/assets/massiveTokenization.jpeg) 

### Parameters for Request and Response

<details>

<summary>Request</summary>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request. This determines the language of error messages. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set to `CREATE_BATCH_TOKENS`. | Yes |
| merchant | Object |  | Object containing authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | PayU provides this username or login. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | PayU provides this password. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| contentFile | Alphanumeric |  | Base64-encoded string containing the credit card information as described above. | Yes |

</details>

<details>

<summary>Response</summary>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | Transaction response: `ERROR` or `SUCCESS`. |
| error | Alphanumeric | Max:2048 | Error message returned when the transaction code is `ERROR`. |
| id | Alphanumeric |  | Identifier for the process. |

</details>

### API Call

The following examples show request and response bodies.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Request Example:**

```JSON
{
   "language": "es",
   "command": "CREATE_BATCH_TOKENS",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "contentFile": "MDAxLE1hcnkgS2VsbGVyLDQwMjQwMDcxMzU0MTI2ODAsMjAyNC8wMSxWSVNBLDEyMzQ1NgowMDIsTWFyayBCcm93biw1MTA0ODQyNTA1ODE2MTcwLDIwMjMvMDUsTUFTVEVSQ0FSRCw3ODkwMTI="
}
```

<br>

**Response Example:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "id": "b721abbc-a9cf-44c6-99ba-91393de2b5d6"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Request Example:**

```XML
<request>
   <language>es</language>
   <command>CREATE_BATCH_TOKENS</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <contentFile>MDAxLE1hcnkgS2VsbGVyLDQwMjQwMDcxMzU0MTI2ODAsMjAyNC8wMSxWSVNBLDEyMzQ1NgowMDIsTWFyayBCcm93biw1MTA0ODQyNTA1ODE2MTcwLDIwMjMvMDUsTUFTVEVSQ0FSRCw3ODkwMTI=</contentFile>
</request>
```

<br>

**Response Example:**

```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>b721abbc-a9cf-44c6-99ba-91393de2b5d6</id>
</creditCardTokenBatchResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Individual Token Removal

This feature allows you to remove a previously registered token. 

### Parameters for Request and Response

<details>

<summary>Request</summary>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request. This determines the language of error messages. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set to `REMOVE_TOKEN`. | Yes |
| merchant | Object |  | Object containing authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | PayU provides this username or login. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | PayU provides this password. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| removeCreditCardToken | Object |  | Information of token to remove. | Yes |
| removeCreditCardToken > payerId | Alphanumeric | | Internal ID of the cardholder as sent in the request. | Yes |
| removeCreditCardToken > creditCardTokenId | Alphanumeric | | Token ID of the credit card to remove. | Yes |

</details>

<details>

<summary>Response</summary>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | Transaction response: `ERROR` or `SUCCESS`. |
| error | Alphanumeric | Max:2048 | Error message returned when the transaction code is `ERROR`. |
| creditCardToken | Object |  | Details of the removed token. |
| creditCardToken > creditCardTokenId | Alphanumeric | | Token ID of the credit card, as sent in the request. |
| creditCardToken > name | Alphanumeric | Min:1 Max:255 | Cardholder name as sent in the request. |
| creditCardToken > payerId | Alphanumeric | | Internal ID of the cardholder as sent in the request. |
| creditCardToken > identificationNumber | Alphanumeric | Max:20 | Identification number of the cardholder as sent in the request. |
| creditCardToken > paymentMethod | Alphanumeric | 32 | Franchise of the tokenized credit card as sent in the request. |
| creditCardToken > maskedNumber | Alphanumeric | Min:13 Max:20 | Masked credit card number displaying the first six and last four digits. |

</details>

### API Call

The following examples show request and response bodies.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Request Example:**

```JSON
{
   "language": "es",
   "command": "REMOVE_TOKEN",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "removeCreditCardToken": {
      "payerId": "10",
      "creditCardTokenId": "46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3"
   }
}
```

<br>

**Response Example:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "creditCardToken": {
        "creditCardTokenId": "46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3",
        "name": "APPROVED",
        "payerId": "10",
        "identificationNumber": "32144457",
        "paymentMethod": "VISA",
        "number": null,
        "expirationDate": null,
        "creationDate": null,
        "maskedNumber": "491633******7505",
        "errorDescription": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Request Example:**

```XML
<request>
   <language>es</language>
   <command>REMOVE_TOKEN</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <removeCreditCardToken>
      <payerId>10</payerId>
      <creditCardTokenId>46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3</creditCardTokenId>4
   </removeCreditCardToken>
</request>
```

<br>

**Response Example:**

```XML
<creditCardTokenResponse>
    <code>SUCCESS</code>
    <creditCardToken>
        <creditCardTokenId>46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3</creditCardTokenId>
        <name>APPROVED</name>
        <payerId>10</payerId>
        <identificationNumber>32144457</identificationNumber>
        <paymentMethod>VISA</paymentMethod>
        <maskedNumber>491633******7505</maskedNumber>
    </creditCardToken>
</creditCardTokenResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Massive Token Removal

This feature allows you to remove tokens stored in a .csv file. 

### Considerations

* Each record in the file must follow this structure and order, separated by commas:
    - Payer ID
    - Token
* The file must not have a header.
* The file must be encoded in UTF-8. You need to implement functionality to encode the content and send the encoded string in the `contentFile` parameter.
* The file cannot contain more than 10,000 records.

<br>

**Example:**

![PrintScreen](/assets/massiveDeletion.png) 

### Parameters for Request and Response

<details>

<summary>Request</summary>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request. This determines the language of error messages. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set to `REMOVE_BATCH_TOKENS`. | Yes |
| merchant | Object |  | Object containing authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | PayU provides this username or login. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | PayU provides this password. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| contentFile | Alphanumeric |  | Base64-encoded string containing the tokens to remove. | Yes |

</details>

<details>

<summary>Response</summary>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | Transaction response: `ERROR` or `SUCCESS`. |
| error | Alphanumeric | Max:2048 | Error message returned when the transaction code is `ERROR`. |
| id | Alphanumeric |  | Identifier for the process. |

</details>

### API Call

The following examples show request and response bodies.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Request Example:**

```JSON
{
   "language": "es",
   "command": "REMOVE_BATCH_TOKENS",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "contentFile": "UGF5ZXJJZDEsYWQ4NGQ2NzEtYjZiOC00YjEyLWFkNTktZmYxZDJhNjQ0M2NhDQpQYXllcklkMiw0ZGYxNjMwYy03MDkyLTRhNjgtODE3MC0yYzI2YzZjOTUyMDg="
}
```

<br>

**Response Example:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "id": "2562625d-9e4c-450a-b979-031feb033952"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Request Example:**

```XML
<request>
   <language>es</language>
   <command>REMOVE_BATCH_TOKENS</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <contentFile>UGF5ZXJJZDEsYWQ4NGQ2NzEtYjZiOC00YjEyLWFkNTktZmYxZDJhNjQ0M2NhDQpQYXllcklkMiw0ZGYxNjMwYy03MDkyLTRhNjgtODE3MC0yYzI2YzZjOTUyMDg=</contentFile>
</request>
```

<br>

**Response Example:**

```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>2562625d-9e4c-450a-b979-031feb033952</id>
</creditCardTokenBatchResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Query Tokens

Using this feature, you can retrieve information about tokenized credit cards. You can query using:

* **Token ID:** Retrieve details of a specific tokenized credit card.
* **Payer ID:** Retrieve all tokenized credit cards associated with a payer.
* **Date range:** Retrieve all tokenized credit cards created within a specific period.

### Parameters for Request and Response

<details>

<summary>Request</summary>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request. This language is used to display error messages. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `GET_TOKENS`. | Yes |
| merchant | Object |  | Object containing authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | PayU provides this username or login. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | PayU provides this password. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| creditCardTokenInformation | Object |  | Parameters of the query. | Yes |
| creditCardTokenInformation > creditCardTokenId | Alphanumeric | | Token ID of the credit card to retrieve. **Mandatory when querying by Token ID.** | No |
| creditCardTokenInformation > payerId | Alphanumeric | | Unique identifier of the payer. **Mandatory when querying by Payer ID.** | No |
| creditCardTokenInformation > startDate | Alphanumeric | 23 | Start date for queries by date range. **Mandatory when querying by date range.** Format: `YYYY-MM-DDTHH:MM:SS`, e.g., `2021-06-12T16:07:11`. | No |
| creditCardTokenInformation > endDate | Alphanumeric | 23 | End date for queries by date range. **Mandatory when querying by date range.** Format: `YYYY-MM-DDTHH:MM:SS`, e.g., `2021-06-12T16:07:11`. | No |

</details>

<details>

<summary>Response</summary>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | Transaction response: `ERROR` or `SUCCESS`. |
| error | Alphanumeric | Max:2048 | Error message returned when the transaction code is `ERROR`. |
| creditCardTokenList | Object |  | List of tokenized credit cards matching the query. |
| creditCardTokenList > creditCardTokenId | Alphanumeric | | Token generated for the credit card. |
| creditCardTokenList > name | Alphanumeric | Min:1 Max:255 | Cardholder’s name as provided in the request. |
| creditCardTokenList > payerId | Alphanumeric | | Unique identifier of the payer. |
| creditCardTokenList > identificationNumber | Alphanumeric | Max:20 | Identification number of the credit card holder. |
| creditCardTokenList > paymentMethod | Alphanumeric | 32 | Credit card franchise (e.g., VISA, AMEX, MASTERCARD). |
| creditCardTokenList > creationDate | Alphanumeric | 19 | Date when the credit card was tokenized. |
| creditCardTokenList > maskedNumber | Alphanumeric | Min:13 Max:20 | Masked credit card number, showing the first six and last four digits. |

</details>

### API Call

The following examples show request and response bodies.

#### Query by Token ID

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Request Example:**

```JSON
{
    "language": "en",
    "command": "GET_TOKENS",
    "merchant": {
        "apiLogin": "pRRXKOl8ikMmt9u",
        "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
    },
    "creditCardTokenInformation": {
        "creditCardTokenId": "ad29f82a-31eb-43e9-8768-081c5f4cbaf0"
    }
}
```

<br>

**Response Example:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "creditCardTokenList": [
        {
            "creditCardTokenId": "ad29f82a-31eb-43e9-8768-081c5f4cbaf0",
            "name": "APPROVED",
            "payerId": "Merchant_Payer_ID_644",
            "identificationNumber": "298928707",
            "paymentMethod": "AMEX",
            "creationDate": "2025-03-14T11:10:13",
            "maskedNumber": "377813*****0001"
        }
    ]
}
```

<br>

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Request Example:**

```XML
<request>
    <language>en</language>
    <command>GET_TOKENS</command>
    <merchant>
        <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <creditCardTokenInformation>
        <creditCardTokenId>ad29f82a-31eb-43e9-8768-081c5f4cbaf0</creditCardTokenId>
    </creditCardTokenInformation>
</request>
```
<br>

**Response Example:**

```XML
<response>
    <code>SUCCESS</code>
    <error></error>
    <creditCardTokenList>
        <creditCardToken>
            <creditCardTokenId>ad29f82a-31eb-43e9-8768-081c5f4cbaf0</creditCardTokenId>
            <name>APPROVED</name>
            <payerId>Merchant_Payer_ID_644</payerId>
            <identificationNumber>298928707</identificationNumber>
            <paymentMethod>AMEX</paymentMethod>
            <creationDate>2025-03-14T11:10:13</creationDate>
            <maskedNumber>377813*****0001</maskedNumber>
        </creditCardToken>
    </creditCardTokenList>
</response>
```

{{< /tab >}}

{{< /tabs >}}

#### Query by Payer ID

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Request Example:**

```JSON
{
    "language": "en",
    "command": "GET_TOKENS",
    "merchant": {
        "apiLogin": "pRRXKOl8ikMmt9u",
        "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
    },
    "creditCardTokenInformation": {
        "payerId": "Merchant_Payer_ID_644"
    }
}
```

<br>

**Response Example:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "creditCardTokenList": [
        {
            "creditCardTokenId": "ad29f82a-31eb-43e9-8768-081c5f4cbaf0",
            "name": "APPROVED",
            "payerId": "Merchant_Payer_ID_644",
            "identificationNumber": "298928707",
            "paymentMethod": "AMEX",
            "creationDate": "2025-03-14T11:10:13",
            "maskedNumber": "377813*****0001"
        },
        {
            "creditCardTokenId": "e84d9ea2-e9df-44c3-98e4-5970e346ac11",
            "name": "APPROVED",
            "payerId": "Merchant_Payer_ID_644",
            "identificationNumber": "3401859948",
            "paymentMethod": "MASTERCARD",
            "creationDate": "2025-03-14T11:24:27",
            "maskedNumber": "547130******0003"
        }
    ]
}
```

<br>

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Request Example:**

```XML
<request>
    <language>en</language>
    <command>GET_TOKENS</command>
    <merchant>
        <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <creditCardTokenInformation>
        <payerId>Merchant_Payer_ID_644</payerId>
    </creditCardTokenInformation>
</request>
```

<br>

**Response Example:**

```XML
<response>
    <code>SUCCESS</code>
    <error/>
    <creditCardTokenList>
        <creditCardToken>
            <creditCardTokenId>ad29f82a-31eb-43e9-8768-081c5f4cbaf0</creditCardTokenId>
            <name>APPROVED</name>
            <payerId>Merchant_Payer_ID_644</payerId>
            <identificationNumber>298928707</identificationNumber>
            <paymentMethod>AMEX</paymentMethod>
            <creationDate>2025-03-14T11:10:13</creationDate>
            <maskedNumber>377813*****0001</maskedNumber>
        </creditCardToken>
        <creditCardToken>
            <creditCardTokenId>e84d9ea2-e9df-44c3-98e4-5970e346ac11</creditCardTokenId>
            <name>APPROVED</name>
            <payerId>Merchant_Payer_ID_644</payerId>
            <identificationNumber>3401859948</identificationNumber>
            <paymentMethod>MASTERCARD</paymentMethod>
            <creationDate>2025-03-14T11:24:27</creationDate>
            <maskedNumber>547130******0003</maskedNumber>
        </creditCardToken>
    </creditCardTokenList>
</response>
```

{{< /tab >}}

{{< /tabs >}}

#### Query by Date Range

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Request Example:**

```JSON
{
   "language": "es",
   "command": "GET_TOKENS",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "creditCardTokenInformation": {
      "startDate": "2021-06-23T12:00:00",
      "endDate": "2021-06-25T12:00:00"
   }
}
```

<br>

**Response Example:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "creditCardTokenList": [
        {
            "creditCardTokenId": "1adc6940-ee7e-48c2-bb96-7d784de74964",
            "name": "APPROVED",
            "payerId": "20263841",
            "identificationNumber": null,
            "paymentMethod": "AMEX",
            "number": null,
            "expirationDate": null,
            "creationDate": "2021-06-23T13:36:36",
            "maskedNumber": "377813*****0001",
            "errorDescription": null
        },
        {
            "creditCardTokenId": "3e5f0d77-0f93-421f-9432-99b6430e845e",
            "name": "Juan Perez",
            "payerId": "158301",
            "identificationNumber": null,
            "paymentMethod": "VISA",
            "number": null,
            "expirationDate": null,
            "creationDate": "2021-06-23T19:03:41",
            "maskedNumber": "424242******4242",
            "errorDescription": null
        },
        {
            "creditCardTokenId": "ead0a090-18dc-41ad-9431-ab342af854a2",
            "name": "LadyM",
            "payerId": "0sS01",
            "identificationNumber": "1234567890",
            "paymentMethod": "AMEX",
            "number": null,
            "expirationDate": null,
            "creationDate": "2021-06-24T11:48:21",
            "maskedNumber": "377813*****0001",
            "errorDescription": null
        }
    ]
}
```
<br>

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Request Example:**

```XML
<request>
   <language>es</language>
   <command>GET_TOKENS</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <creditCardTokenInformation>
      <startDate>2021-06-23T12:00:00</startDate>
      <endDate>2021-06-25T12:00:00</endDate>
   </creditCardTokenInformation>
</request>
```

<br>

**Response Example:**

```XML
<creditCardTokenListResponse>
    <code>SUCCESS</code>
    <creditCardTokenList>
        <creditCardToken>
            <creditCardTokenId>1adc6940-ee7e-48c2-bb96-7d784de74964</creditCardTokenId>
            <name>APPROVED</name>
            <payerId>20263841</payerId>
            <paymentMethod>AMEX</paymentMethod>
            <creationDate>2021-06-23T13:36:36</creationDate>
            <maskedNumber>377813*****0001</maskedNumber>
        </creditCardToken>
        <creditCardToken>
            <creditCardTokenId>3e5f0d77-0f93-421f-9432-99b6430e845e</creditCardTokenId>
            <name>Juan Perez</name>
            <payerId>158301</payerId>
            <paymentMethod>VISA</paymentMethod>
            <creationDate>2021-06-23T19:03:41</creationDate>
            <maskedNumber>424242******4242</maskedNumber>
        </creditCardToken>
        <creditCardToken>
            <creditCardTokenId>ead0a090-18dc-41ad-9431-ab342af854a2</creditCardTokenId>
            <name>LadyM</name>
            <payerId>0sS01</payerId>
            <identificationNumber>1234567890</identificationNumber>
            <paymentMethod>AMEX</paymentMethod>
            <creationDate>2021-06-24T11:48:21</creationDate>
            <maskedNumber>377813*****0001</maskedNumber>
        </creditCardToken>
    </creditCardTokenList>
</creditCardTokenListResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Payments Using Tokenization

To process payments using credit card tokens, include the `transaction.creditCardTokenId` parameter instead of the full credit card details. The examples below provide a high-level view of a one-step payment request.

{{% alert title="Note" color="info"%}}

To process payments without a CVV, set the `creditCard.processWithoutCvv2` parameter to `true` in the payment request and omit the `creditCard.securityCode` parameter.<br>
By default, processing payments without a CVV is disabled. To enable this feature, contact your sales representative.

{{% /alert%}}

### API Call

The following examples show the request bodies.

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Request Example:**

```JSON
{
   "language": "es",
   "command": "SUBMIT_TRANSACTION",
   "merchant": {
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
      "apiLogin": "pRRXKOl8ikMmt9u"
   },
   "transaction": {
      "order": {
         "Order information":""
      },
      "payer": {
         "Payer information":""
      },
      "creditCardTokenId": "46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3",
      "creditCard": {
         "securityCode": "123"
      },
      "extraParameters": {
         "Additional request parameters":""
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "Card franchise", 
      "paymentCountry": "Processing country",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": true
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Request Example:**

```XML
<request>
   <language>es</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <!-- Order information -->
      </order>
      <payer>
         <!-- Payer information -->
      </payer>
      <creditCardTokenId>46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3</creditCardTokenId>
      <creditCard>
         <securityCode>321</securityCode>
      </creditCard>
      <extraParameters>
         <!-- Additional request parameters -->
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>{Card franchise}</paymentMethod>
      <paymentCountry>{Processing country}</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>

```

{{< /tab >}}

{{< /tabs >}}

<br>

For detailed information on processing payments, refer to the respective documentation based on the processing country.

<div style="display: flex; justify-content: space-between; max-width: 600px;">
  <div style="width: 45%;">
      <p><img src="/assets/Argentina.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Argentina.md" >}}">Argentina</a></p>
      <p><img src="/assets/Brasil.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Brazil.md" >}}">Brazil</a></p>
      <p><img src="/assets/Chile.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Chile.md" >}}">Chile</a></p>
      <p><img src="/assets/Colombia.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Colombia.md" >}}">Colombia</a></p>
  </div>
  <div style="width: 45%;">
      <p><img src="/assets/Mexico.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Mexico.md" >}}">Mexico</a></p>
      <p><img src="/assets/Panama.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Panama.md" >}}">Panama</a></p>
      <p><img src="/assets/Peru.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Peru.md" >}}">Peru</a></p>
  </div>
</div>

<br>

### Multiple Payments with Tokenization

This feature allows you to process multiple payments using stored tokens from a .csv file.

### Considerations

* Each record in the file must follow the specified structure and order, with values separated by commas:
    - Account ID – The identifier of your PayU account.
    - Credit card token
    - Credit card security code
    - Number of installments
    - Sale reference
    - Sale description
    - Buyer’s email
    - Currency ISO code – [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}).
    - Total amount (including taxes)
    - Tax value
    - Base value for reimbursement
    - Additional value
    - Email language – Language used in emails sent to the buyer and seller. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}).
* The file must not include a header.
* The file must be encoded in UTF-8. You need to implement a functionality to encode the content and send the encoded string in the `contentFile` parameter.
* The file cannot contain more than 10,000 records.

<br>

**Example:**

![PrintScreen](/assets/massivePaymentTokenization.png) 

### Parameters for Request and Response

<details>

<summary>Request</summary>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request. This determines the language of error messages. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set to `PROCESS_BATCH_TRANSACTIONS_TOKEN`. | Yes |
| merchant | Object |  | Object containing authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | PayU provides this username or login. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | PayU provides this password. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| contentFile | Alphanumeric |  | Base64-encoded string containing credit card information. | Yes |

</details>

<details>

<summary>Response</summary>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | Transaction response: `ERROR` or `SUCCESS`. |
| error | Alphanumeric | Max:2048 | Error message returned when the transaction code is `ERROR`. |
| id | Alphanumeric |  | Identifier for the process. |

</details>

### API Call

The following examples show request and response bodies.

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Request Example:**

```JSON
{
   "language": "es",
   "command": "PROCESS_BATCH_TRANSACTIONS_TOKEN",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "contentFile": "NTAwNTM4LGVhMDIwZTU5LWQ5NWEtNDk1ZC04OTAzLTM0ZTg0M2ZkN2ZlYywxMzIsMSxTYWxlLTA0LFN1YnNjcmlwdGlvbiBmZWUsdXNlcjFAbWFpbC5jb20sQ09QLDEwMDAwLDAsMCwwLGVzCjUwMDUzOCxlYWQwYTA5MC0xOGRjLTQxYWQtOTQzMS1hYjM0MmFmODU0YTIsMTM1LDEsU2FsZS0wNSxTdWJzY3JpcHRpb24gZmVlLHVzZXIyQG1haWwuY29tLENPUCwxMTAwMCwwLDAsMCxlcw=="
}
```

<br>

**Response Example:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "id": "51c72d88-f707-45ca-ad59-4508140833a7"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Request Example:**

```XML
<request>
   <language>es</language>
   <command>PROCESS_BATCH_TRANSACTIONS_TOKEN</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>51c72d88-f707-45ca-ad59-4508140833a7</apiKey>
   </merchant>
   <contentFile>NTAwNTM4LGVhMDIwZTU5LWQ5NWEtNDk1ZC04OTAzLTM0ZTg0M2ZkN2ZlYywxMzIsMSxTYWxlLTA0LFN1YnNjcmlwdGlvbiBmZWUsdXNlcjFAbWFpbC5jb20sQ09QLDEwMDAwLDAsMCwwLGVzCjUwMDUzOCxlYWQwYTA5MC0xOGRjLTQxYWQtOTQzMS1hYjM0MmFmODU0YTIsMTM1LDEsU2FsZS0wNSxTdWJzY3JpcHRpb24gZmVlLHVzZXIyQG1haWwuY29tLENPUCwxMTAwMCwwLDAsMCxlcw=</contentFile>
</request>
```

<br>

**Response Example:**

```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>b721abbc-a9cf-44c6-99ba-91393de2b5d6</id>
</creditCardTokenBatchResponse>
```

{{< /tab >}}

{{< /tabs >}}