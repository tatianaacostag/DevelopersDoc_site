---
title: "Tokenization API"
linkTitle: "Tokenization API"
date: 2021-06-24T10:31:30-05:00
description: >
  Tokenization API allows you to safely store the data of your customers' credit cards through the creation of a token. This token lets you make regular charges or implement the 1 Click payment feature, following PCI DSS (Payment Card Industry Data Security Standard) security standards to handle credit card data.
weight: 40
tags: ["subtopic"]
---

Tokenization feature is available under customized commercial agreements. For more information, contact your sales representative.

To integrate with Tokenization API, target your request to the following URLs according to your environment.

{{% alert title="URL" color="info"%}}
* Test: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Production: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Available methods
Tokenization API includes methods to register and remove tokens, and methods to query tokens.

For registration a removal of tokens:
* [Individual credit card registration]({{< ref "Tokenization-API.md#individual-credit-card-registration" >}})
* [Massive credit card registration]({{< ref "Tokenization-API.md#massive-credit-card-registration" >}})
* [Individual token removal]({{< ref "Tokenization-API.md#individual-token-removal" >}})
* [Massive token removal]({{< ref "Tokenization-API.md#massive-token-removal" >}})
* [Query tokens]({{< ref "Tokenization-API.md#query-tokens" >}})

{{% alert title="Note" color="info"%}}
To query tokens, you need to target your request to the following URLs according to your environment.
* Test: ```https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi```
* Production: ```https://api.payulatam.com/reports-api/4.0/service.cgi```
{{% /alert %}}

## Individual credit card registration
Using this feature, you can register the information of a customer's credit card and get a token. 

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `CREATE_TOKEN`. | Yes |
| merchant |  |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| creditCardToken |  |  | Information of the credit card to be tokenized. | Yes |
| creditCardToken > payerId | Alphanumeric | | Internal id of the credit card holder. | Yes |
| creditCardToken > name | Alphanumeric | Min:1 Max:255 | Holder's name displayed in the credit card. | Yes |
| creditCardToken > identificationNumber | Alphanumeric | Max:20 | Identification number of the credit card holder. | Yes |
| creditCardToken > paymentMethod | Alphanumeric | 32 | Select a valid Credit card Payment Method. [See the available Payment Methods]({{< ref "select-your-payment-method.html" >}}). | Yes |
| creditCardToken > number | Alphanumeric | Min:13 Max:20 | Credit card number. | Yes |
| creditCardToken > expirationDate | Alphanumeric | 7 | Credit card expiration date. Format `YYYY/MM`. | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| creditCardToken |  |  | Information of the Tokenized credit card. |
| creditCardToken > creditCardTokenId | Alphanumeric | | Token generated through the information of the credit card. |
| creditCardToken > name | Alphanumeric | Min:1 Max:255 | Holder's name displayed in the credit card as sent in the request. |
| creditCardToken > payerId | Alphanumeric | | Internal id of the credit card holder as sent in the request. |
| creditCardToken > identificationNumber | Alphanumeric | Max:20 | Identification number of the credit card holder as sent in the request. |
| creditCardToken > paymentMethod | Alphanumeric | 32 | Franchise of the tokenized credit card as sent in the request. |
| creditCardToken > maskedNumber | Alphanumeric | Min:13 Max:20 | Masked credit card number. The masked used displays the first six digits and the last four digits of the credit card. |

</details>

### Api call
The following are the bodies of the request and response of this method.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
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

Response body:
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

Request body:
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

Response body:
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

## Massive credit card registration
Using this feature, you can register the information of several credit cards stored in a _**.csv**_ file and get a token per each card. 

### Considerations
* Each record of the file must have the following structure and order separated by commas:
    - Payer ID
    - Full name
    - Credit card number
    - Expiration date
    - Franchise
    - Identification number
* The file must not have header.
* The file must be codifies using UTF-8. You need to implement a functionality to codify the content and send the codified string in the `contentFile` parameter.
* The file cannot have more than 10.000 records.<br><br>![PrintScreen](/assets/massiveTokenization.jpeg) 

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `CREATE_BATCH_TOKENS`. | Yes |
| merchant |  |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| contentFile | Alphanumeric |  | Codified string in Base64 with the information of the credit cards as explained before. | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| id |  |  | Identification of the procedure. |

</details>

### Api call
The following are the bodies of the request and response of this method.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
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

Response body:
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

Request body:
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

Response body:
```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>b721abbc-a9cf-44c6-99ba-91393de2b5d6</id>
</creditCardTokenBatchResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Individual token removal
Using this feature, you can remove the token previously registered. 

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `REMOVE_TOKEN`. | Yes |
| merchant |  |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| removeCreditCardToken |  |  | Information of token to be removed. | Yes |
| removeCreditCardToken > payerId | Alphanumeric | | Internal id of the credit card holder. | Yes |
| removeCreditCardToken > creditCardTokenId | Alphanumeric | | Token of the credit card to be removed. | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| creditCardToken |  |  | Information of the Token removed. |
| creditCardToken > creditCardTokenId | Alphanumeric | | Token of the credit card as sent in the request. |
| creditCardToken > name | Alphanumeric | Min:1 Max:255 | Holder's name displayed in the credit card. |
| creditCardToken > payerId | Alphanumeric | | Internal id of the credit card holder. |
| creditCardToken > identificationNumber | Alphanumeric | Max:20 | Identification number of the credit card holder. |
| creditCardToken > paymentMethod | Alphanumeric | 32 | Franchise of the tokenized credit card. |
| creditCardToken > maskedNumber | Alphanumeric | Min:13 Max:20 | Masked credit card number. The masked used displays the first six digits and the last four digits of the credit card. |

</details>

### Api call
The following are the bodies of the request and response of this method.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
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

Response body:
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

Request body:
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

Response body:
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

## Massive token removal
Using this feature, you can remove the tokens stored in a _**.csv**_ file. 

### Considerations
* Each record of the file must have the following structure and order separated by commas:
    - Payer ID
    - Token.
* The file must not have header.
* The file must be codifies using UTF-8. You need to implement a functionality to codify the content and send the codified string in the `contentFile` parameter.
* The file cannot have more than 10.000 records.<br><br>![PrintScreen](/assets/massiveDeletion.png) 

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `REMOVE_BATCH_TOKENS`. | Yes |
| merchant |  |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| contentFile | Alphanumeric |  | Codified string in Base64 with the information of the tokens to be removed. | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| id |  |  | Identification of the procedure. |

</details>

### Api call
The following are the bodies of the request and response of this method.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
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

Response body:
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

Request body:
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

Response body:
```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>2562625d-9e4c-450a-b979-031feb033952</id>
</creditCardTokenBatchResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Query tokens
Using this feature, you can get the information of tokenized credit cards, you can perform the query by the token number or by a date range. 

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `GET_TOKENS`. | Yes |
| merchant |  |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| creditCardTokenInformation |  |  | Parameters of the query. | Yes |
| creditCardTokenInformation > creditCardTokenId | Alphanumeric | | Token of the card to consult. This parameter is mandatory when you want to query by Token Id. | No |
| creditCardTokenInformation > startDate | Alphanumeric | 23 | Start date of the query when you want to query by date range. This parameter is mandatory when you want to query by date rage.<br>Format `YYYY-MM-DDTHH:MM:SS`, for example `2021-06-12T16:07:11`. | No |
| creditCardTokenInformation > endDate | Alphanumeric | 23 | End date of the query when you want to query by date range. This parameter is mandatory when you want to query by date rage.<br>Format `YYYY-MM-DDTHH:MM:SS`, for example `2021-06-12T16:07:11`. | No |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| creditCardTokenList |  |  | Information of the Tokenized credit cards. |
| creditCardTokenList > creditCardTokenId | Alphanumeric | | Token generated through the information of the credit card. |
| creditCardTokenList > name | Alphanumeric | Min:1 Max:255 | Holder's name displayed in the credit card as sent in the request. |
| creditCardTokenList > payerId | Alphanumeric | | Internal id of the credit card holder as sent in the request. |
| creditCardTokenList > identificationNumber | Alphanumeric | Max:20 | Identification number of the credit card holder as sent in the request. |
| creditCardTokenList > paymentMethod | Alphanumeric | 32 | Franchise of the tokenized credit card as sent in the request. |
| creditCardTokenList > creationDate | Alphanumeric | 19 | date when the credit card was tokenized. |
| creditCardTokenList > maskedNumber | Alphanumeric | Min:13 Max:20 | Masked credit card number. The masked used displays the first six digits and the last four digits of the credit card. |

</details>

### Api call
The following are the bodies of the request and response of this method. The following example queries the tokenized cards by date range, if you want to query by using the token Id, just send the parameter `creditCardTokenInformation.creditCardTokenId`.

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
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

Response body:
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

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
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

Response body:
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

## Payments using Tokenization
For payments with credit card tokens, include the parameter `transaction.creditCardTokenId` replacing the information of the credit card. The following example shows the body of the request in a high level for a one-step flow, the details of the request are not provided.

{{% alert title="Note" color="info"%}}
To process without CVV is necessary to send the parameter `creditCard.processWithoutCvv2` as true in the payment request and remove the parameter `creditCard.securityCode`.<br>
By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative.
{{% /alert%}}

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
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
         "Information of the order":""
      },
      "payer": {
         "Information of the payer":""
      },
      "creditCardTokenId": "46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3",
      "creditCard": {
         "securityCode": "123"
      },
      "extraParameters": {
         "Extra parameters of the request":""
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

Request body:
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
         <!-- Information of the order -->
      </order>
      <payer>
         <!-- Information of the payer -->
      </payer>
      <creditCardTokenId>46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3</creditCardTokenId>
      <creditCard>
         <securityCode>321</securityCode>
      </creditCard>
      <extraParameters>
         <!-- Extra parameters of the request -->
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

For specific details about how to perform payments, refer to the respective article according to the processing country.

<div style="display: flex;">
  <div style="float: left;width: 50%;">
      <img src="/assets/Argentina.png" width="25px"/> <a href="{{< ref "Payments-API-Argentina.md" >}}">Argentina</a><br>
      <img src="/assets/Brasil.png" width="25px"/> <a href="{{< ref "Payments-API-Brazil.md" >}}">Brazil</a><br>
      <img src="/assets/Chile.png" width="25px"/> <a href="{{< ref "Payments-API-Chile.md" >}}">Chile</a><br>
      <img src="/assets/Colombia.png" width="25px"/> <a href="{{< ref "Payments-API-Colombia.md" >}}">Colombia</a>
    </ul>
  </div>
  <div style="float: left;width: 50%;">
    <ul>
      <img src="/assets/Mexico.png" width="25px"/> <a href="{{< ref "Payments-API-Mexico.md" >}}">Mexico</a><br>
      <img src="/assets/Panama.png" width="25px"/> <a href="{{< ref "Payments-API-Panama.md" >}}">Panama</a><br>
      <img src="/assets/Peru.png" width="25px"/> <a href="{{< ref "Payments-API-Peru.md" >}}">Peru</a>
    </ul>
  </div>
</div>

<br>

### Multiple payments with tokenization
Using this feature, you can perform payments using several tokens stored in a _**.csv**_ file and get a token per each card. 

### Considerations
* Each record of the file must have the following structure and order separated by commas:
    - Account Id, identifier of your PayU account.
    - Credit card token
    - Credit card security code
    - Number of installments
    - Sale reference
    - Sale description
    - Buyer's e-mail
    - ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}})
    - Total amount including taxes
    - Base value of reimbursement
    - Additional value
    - Language used in emails sent to the buyer and the seller. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}})
* The file must not have header.
* The file must be codifies using UTF-8. You need to implement a functionality to codify the content and send the codified string in the `contentFile` parameter.
* The file cannot have more than 10.000 records.<br><br>![PrintScreen](/assets/massivePaymentTokenization.png) 

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `PROCESS_BATCH_TRANSACTIONS_TOKEN`. | Yes |
| merchant |  |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| contentFile | Alphanumeric |  | Codified string in Base64 with the information of the credit cards as explained before. | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| id |  |  | Identification of the procedure. |

</details>

### Api call
The following are the bodies of the request and response of this method.

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
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

Response body:
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

Request body:
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

Response body:
```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>b721abbc-a9cf-44c6-99ba-91393de2b5d6</id>
</creditCardTokenBatchResponse>
```
{{< /tab >}}
{{< /tabs >}}