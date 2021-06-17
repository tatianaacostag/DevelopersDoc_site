---
title: "Payments API - Brazil"
linkTitle: "Payments API - Brazil"
date: 2021-05-03T15:48:08-05:00
description: >
  Payments API Brazil lets your shop process different transaction types with multiple payment methods.
weight: 20
tags: ["subtopic"]
---

To integrate with Payments API Brazil, target your request to the following URLs according to your environment.

{{% alert title="URL" color="info"%}}
* Test: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Production: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Available methods
Payments API includes the following methods:

* [Submit transaction with credit card]({{< ref "Payments-API-Brazil.md#submit-transaction-with-credit-cards" >}})
* [Submit transaction with cash]({{< ref "Payments-API-Brazil.md#submit-transaction-with-cash" >}})
* [Available payment methods query]({{< ref "Payments-API-Brazil.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-API-Brazil.md#ping" >}})


## Submit transaction with credit cards
This method lets you process the payments performed by your customers using credit cards. For Brazil, you can perform the transactions **Authorization**, **Capture**, and **Authorization and Capture**.

### Variables for request and response

<details open>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|---|---|---|---|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "responde-codes-and-variables.html#supported-languages" >}}). |
| command | Alphanumeric | Max: 32 | Set `SUBMIT_TRANSACTION`. |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | 
| merchant |  |  | This object has the authentication data. |
| merchant > apiLogin | Alphanumeric | Min: 12 Max: 32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| merchant > apiKey | Alphanumeric | Min: 6 Max: 32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| transaction |  |  | This object has the transaction data. |
| transaction > order |  |  | This object has the order data. |
| transaction > order > accountId | Number |  | Identifier of your account. |
| transaction > order > referenceCode | Alphanumeric | Min: 1 Max: 255 | Represents the identifier of the order in your system. |
| transaction > order > description | Alphanumeric | Min: 1 Max: 255 | Description of the order. |
| transaction > order > language | Alphanumeric | 2 | Language used in emails sent to the buyer and the seller. |
| transaction > order > notifyUrl | Alphanumeric | Max: 2048 | Confirmation URL of the order. |
| transaction > order > partnerId | Alphanumeric | Max: 255 | Partner ID in PayU. |
| transaction > order > signature | Alphanumeric | Max: 255 | The signature associated to the form. For more information refer [Authentication signature]({{< ref "integrations.html#authentication-signature" >}}). |
| transaction > order > shippingAddress |  |  | Shipping address. |
| transaction > order > shippingAddress > street1 | Alphanumeric | Max: 100 | Address Line 1. |
| transaction > order > shippingAddress > street2 | Alphanumeric | Max: 100 | Address Line 2. |
| transaction > order > shippingAddress > city | Alphanumeric | Max: 50 | Address city. |
| transaction > order > shippingAddress > state | Alphanumeric | Max: 40 | Address State. For Brazil, only send two characters, For example, set `SP` for São Paulo. |
| transaction > order > shippingAddress > country | Alphanumeric | 2 | Address country. |
| transaction > order > shippingAddress > postalCode | Alphanumeric | Max: 8 | Address Zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. |
| transaction > order > shippingAddress > phone | Alphanumeric | Max: 11 | Phone number associated to the address. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. |
| transaction > order > buyer |  |  | Buyer information. |
| transaction > order > buyer > merchantBuyerId | Alphanumeric | Max: 100 | Buyer ID in your system. |
| transaction > order > buyer > fullName | Alphanumeric | Max: 150 | Full name of the buyer. |
| transaction > order > buyer > emailAddress | Alphanumeric | Max: 255 | E-mail of the buyer. |
| transaction > order > buyer > contactPhone | Alphanumeric | Max: 20 | Phone number of the buyer. |
| transaction > order > buyer > dniNumber | Alphanumeric | Max: 20 | Identification number of the buyer. You must use an algorithm to validate the CPF and must be set using the format `XXX.XXX.XXX-XX`. Example: `811.807.405-64` |
| transaction > order > buyer > cnpj | Alphanumeric | Max: 14 | Identification number of the buyer (For Legal person in Brazil). You must use an algorithm to validate the CNPJ and must be set using the format `XXXXXXXXXXXXXX`. Example: `32593371000110`. |
| transaction > order > buyer > shippingAddress | Alphanumeric |  | Shipping address of the buyer. |
| transaction > order > buyer > shippingAddress > street1 | Alphanumeric | Max: 150 | Buyer's shipping address Line 1. | 
| transaction > order > buyer > shippingAddress > city | Alphanumeric | Max: 50 | Buyer's shipping address city. | 
| transaction > order > buyer > shippingAddress > state | Alphanumeric | Max: 40 | Buyer's shipping address state. For Brazil, only send two characters, For example, set `SP` for São Paulo. |
| transaction > order > buyer > shippingAddress > country | Alphanumeric | 2 | Buyer's shipping address country in format ISO 3166 alpha-2. |
| transaction > order > buyer > shippingAddress > postalCode | Number | Max: 20 | Buyer's shipping address zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. |
| transaction > order > buyer > shippingAddress > phone | Number | Max: 20 | Buyer's shipping address phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. |
| transaction > order > additionalValues > |  | 64 | Amount of the order or its associated values. |
| transaction > order > additionalValues > TX_VALUE | Alphanumeric | 64 | Amount of the transaction. |
| transaction > order > additionalValues > TX_VALUE > value | Number | 19, 2 | Specifies the amount of the transaction, this value may have two decimal digits (Ex. `10000.00` or `10000`). |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "responde-codes-and-variables.html#accepted-currencies" >}}). |
| transaction > creditCardTokenId |  |  | Include this parameter when the transaction is done using a tokenized card replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization.md" >}}) |
| transaction > creditCard |  |  | Credit card information. If you process using debit card, do not send this parameter|
| transaction > creditCard > number | Alphanumeric | Min: 13 Max: 20 | Credit card number. |
| transaction > creditCard > securityCode | Alphanumeric | Min: 1 Max: 4 | Credit card security code (CVC2, CVV2, CID). |
| transaction > creditCard > expirationDate | Alphanumeric | 7 | Credit card expiration date. Format `YYYY/MM`. |
| transaction > creditCard > name | Alphanumeric | Min: 1 Max: 255 | Holder's name displayed in the credit card. |
| transaction > creditCard > processWithoutCvv2 | Boolean | Max: 255 | Allows you to process transactions without including the credit card security code. Your commerce requires PayU's authorization before using this feature. |
| transaction > payer |  |  | Payer information. This information is optional. |
| transaction > payer > emailAddress | Alphanumeric | Max: 255 | Payer e-mail address. |
| transaction > payer > merchantPayerId | Alphanumeric | Max: 100 | Identifier of the payer in your system. |
| transaction > payer > fullName | Alphanumeric | Max: 150 | Name of the payer which must meet the name sent in the parameter > creditCard > name for credit card payments. |
| transaction > payer > billingAddress |  |  | Billing address. |
| transaction > payer > billingAddress > street1 | Alphanumeric | Max: 100 | Billing Address Line 1. |
| transaction > payer > billingAddress > street2 | Alphanumeric | Max: 100 | Billing Address Line 2. |
| transaction > payer > billingAddress > city | Alphanumeric | Max: 50 | Billing address city. |
| transaction > payer > billingAddress > state | Alphanumeric | Max: 40 | Billing address state. For Brazil, only send two characters, For example, set `SP` for São Paulo. |
| transaction > payer > billingAddress > country | Alphanumeric | 2 | Billing address country in format ISO 3166 Alpha-2. |
| transaction > payer > billingAddress > postalCode | Alphanumeric | Max: 20 | Billing address zip code. For Brazil, use the format `XXXXX-XXX` or ´. Example: 09210-710 or 09210710. |
| transaction > payer > billingAddress > phone | Alphanumeric | Max: 20 | Billing address phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. |
| transaction > payer > birthdate | Alphanumeric | Max: 10 |Buyer's date of birth. |
| transaction > payer > contactPhone | Alphanumeric | Max: 20 | Buyer's phone number. |
| transaction > payer > dniNumber | Alphanumeric | Max: 20 | Identification number of the buyer. |
| transaction > payer > dniType | Alphanumeric | 2 | Identification type of the buyer. [See Document types]({{< ref "responde-codes-and-variables.html#document-types" >}}). |
| transaction > type | Alphanumeric | 32 | Set this value according to the transaction you want: `AUTHORIZATION`, `CAPTURE`, or `AUTHORIZATION_AND_CAPTURE` |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid Credit or Debit card Payment Method. [See the available Payment Methods for Brazil]({{< ref "select-your-payment-method.html#img-srcassetsbrazilpng-width25px-brazil" >}}). |
| transaction > paymentCountry | Alphanumeric | 2 | Set `BR` for Brazil. |
| transaction > deviceSessionId | Alphanumeric | Max: 255 | Session identifier of the device where the customer performs the transaction. For mor information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). |
| transaction > ipAddress | Alphanumeric | Max: 39 | IP address of the device where the customer performs the transaction. |
| transaction > cookie | Alphanumeric | Max: 255 | Cookie stored by the device where the customer performs the transaction. |
| transaction > userAgent | Alphanumeric | Max: 1024 | The User agent of the browser where the customer performs the transaction. |
| transaction > extraParameters |  |  | Additional parameters or data associated with the request. The maximum size of each _extraParameters_ name is 64 characters.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  |
| transaction > termsAndConditionsAcepted | Boolean | | PayU terms and conditions that the payers must accept. This parameter is only mandatory if your Brazilian PayU account is associated to a foreign bank account. |
| transaction > threeDomainSecure |  |  | This object contains the information of 3DS 2.0. |
| transaction > threeDomainSecure > embedded | Boolean |  | Set `true` if you want to use and embedded MPI for the Authorization process. By default, this value is set as `false`. |
| transaction > threeDomainSecure > eci | Number | Max: 2 | Eletronic Commerce Indicator.<br>Value returned by the directory servers showing the authentication attempt.<br>This parameter is mandatory when `transaction.threeDomainSecure.embedded` is `false` and `transaction.threeDomainSecure.xid` has been set. |
| transaction > threeDomainSecure > cavv | Alphanumeric | Max: 28 | Cardholder Authentication Verification Value.<br>Code of the cryptogram used in the transaction authentication in Base64.<br>Depending on the specific ECI codes established by the process network, this value may be optional. |
| transaction > threeDomainSecure > xid | Alphanumeric | Max: 28 | Transaction ID sent by the MPI in Base64.<br>This parameter is mandatory when `transaction.threeDomainSecure.embedded` is `false` and `transaction.threeDomainSecure.eci` has been set. |
| transaction > threeDomainSecure > directoryServerTransactionId | Alphanumeric | Max: 36 | Transaction ID generated by the Directory Server during the Authentication. |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max: 2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse |  |  | The response data. |
| transactionResponse > orderId | Number |  | The generated or existing order Id in PayU. |
| transactionResponse > transactionId | Alphanumeric | 36 | The identifier of the transaction in PayU. |
| transactionResponse > state | Alphanumeric | Max: 32 | The status of the transaction. |
| transactionResponse > responseCode | Alphanumeric | Max: 64 | The response code associated with the status. |
| transactionResponse > paymentNetworkResponseCode | Alphanumeric | Max: 255 | The response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alphanumeric | Max: 255 | The error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alphanumeric | Max: 32 | The traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alphanumeric | Max: 12 | The authorization code returned by the financial network. |
| transactionResponse > responseMessage | Alphanumeric | Max: 2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date |  | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters |  |  | Additional parameters or data associated with the response. <br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Considerations
* For payments with credit card tokens, include the parameter `transaction.creditCardTokenId` replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization.md" >}}).
* By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative. After this feature is enabled for you, send in the request the variable `creditCard.processWithoutCvv2` as true and remove the variable `creditCard.securityCode`.
* The extra parameter `CIELO_TID` identifies the transaction, this parameter is needed when you want to process voids.

### Authorization
Use this method to perform the authorization of a transaction. The following are the request and response bodys for this transaction type.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
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
         "accountId": "512327",
         "referenceCode": "PRODUCT_TEST_2021-06-17T19:11:57.179Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "fbc089272288edc52c332395d9566f4c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "BRL"
            }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "811.807.405-64",
            "cnpj": "32593371000110",
            "shippingAddress": {
               "street1": "Quadra QNP 34 Conjunto G 780",
               "street2": "5555487",
               "city": "Manaos",
               "state": "SP",
               "country": "BR",
               "postalCode": "10012545",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Quadra QNP 34 Conjunto G 780",
            "street2": "5555487",
            "city": "Manaos",
            "state": "SP",
            "country": "BR",
            "postalCode": "10012545",
            "phone": "7563126"
         }
      },
      "creditCard": {
         "number": "5253203387684619",
         "securityCode": "777",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION",
      "paymentMethod": "MASTERCARD",
      "paymentCountry": "BR",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0",
      "threeDomainSecure": {
         "embedded": false,
         "eci": "01",
         "cavv": "AOvG5rV058/iAAWhssPUAAADFA==",
         "xid": "Nmp3VFdWMlEwZ05pWGN3SGo4TDA=",
         "directoryServerTransactionId": "00000-70000b-5cc9-0000-000000000cb"
      }
   },
   "test": false
}
```
<br>

Response body:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400434770,
        "transactionId": "79de715b-fe77-401e-8b18-241820afb375",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "282856",
        "authorizationCode": "MOCK-CIELO-1623957118463",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1623939118784,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "CIELO_TID": "1006993069000509C28A"
        },
        "additionalInfo": null
    }
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
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400434942</orderId>
        <transactionId>1af49d5d-464a-4efb-98db-f7875e3c580b</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>282856</trazabilityCode>
        <authorizationCode>MOCK-CIELO-1623962788239</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <operationDate>2021-06-17T10:46:28</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>CIELO_TID</string>
                <string>1006993069000509C28A</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Capture
Use this method to perform the capture of a transaction. The following are the request and response bodies for this transaction type.

Only the parameters displayed in the request body are mandatory to invoke a Capture transaction. Recall that the order and transaction ids must meet with a currently authorized transaction.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
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

### Authorization and Capture
Use this method to perform the authorization and capture in one step of a transaction. The following are the request and response bodies for this transaction type.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
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


## Submit transaction with cash


## Available payment methods query
This method returns a list of the payment methods available in all countries.

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "responde-codes-and-variables.html#supported-languages" >}}). |
| command | Alphanumeric | Max: 32 | Set `GET_PAYMENT_METHODS`. |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | 
| merchant |  |  | This object has the authentication data. |
| merchant > apiLogin | Alphanumeric | Min: 12 Max: 32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| merchant > apiKey | Alphanumeric | Min: 6 Max: 32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max: 2048 | The error message associated when the response code is `ERROR`. |
| paymentMethods |  |  | List of the payment methods. |
| paymentMethods > paymentMethodComplete |  |  | This object has the information of a payment method. |
| paymentMethods > paymentMethodComplete > id | Numeric |  | Payment method identifier. |
| paymentMethods > paymentMethodComplete > description | Alphanumeric | Max: 32 | Payment method name. |
| paymentMethods > paymentMethodComplete > country | Alphanumeric | 2 | ISO code of the Payment method country. |

</details>

### API call
The following are the bodies of the request and response of this method. For the sake of the example, the request and response here show two payment methods. 

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
   "test": false,
   "language": "en",
   "command": "GET_PAYMENT_METHODS",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   }
}
```
<br>

Response body:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "paymentMethods": [
        {
            "id": "177",
            "description": "VISA",
            "country": "BR",
            "enabled": true,
            "reason": null
        },
        {
            "id": "172",
            "description": "MASTERCARD",
            "country": "BR",
            "enabled": true,
            "reason": null
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
   <language>en</language>
   <command>GET_PAYMENT_METHODS</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <isTest>false</isTest>
</request>
```
<br>

Response body:
```XML
<paymentMethodsResponse>
    <code>SUCCESS</code>
    <paymentMethods>
        <paymentMethodComplete>
            <id>177</id>
            <description>VISA</description>
            <country>BR</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>172</id>
            <description>MASTERCARD</description>
            <country>BR</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
    </paymentMethods>
</paymentMethodsResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Ping
The ```PING``` method lets you verify the connection to our platform. 

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "responde-codes-and-variables.html#supported-languages" >}}). |
| command | Alphanumeric | Max: 32 | Set `PING`. |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | 
| merchant |  |  | This object has the authentication data. |
| merchant > apiLogin | Alphanumeric | Min: 12 Max: 32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| merchant > apiKey | Alphanumeric | Min: 6 Max: 32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. |
| error | Alphanumeric | Max: 2048 | The error message associated if an error ocurred. |
| transactionResponse | transactionResponse | Max: 2048 | The response of the PING method if an error ocurred. |
</details>

### Api call
The following are the bodies of the request and response of this method.

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
   "test": false,
   "language": "en",
   "command": "PING",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   }
}
```
<br>

Response body:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": null
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML
<request>
   <language>en</language>
   <command>PING</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <isTest>false</isTest>
</request>
```
<br>

Response body:
```XML
<paymentResponse>
    <code>SUCCESS</code>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

