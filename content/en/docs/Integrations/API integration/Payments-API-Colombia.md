---
title: "Payments API - Colombia"
linkTitle: "Payments API - Colombia"
date: 2021-05-03T15:48:08-05:00
description: >
  The Payments API for Colombia enables seamless integration of PayU's payment processing capabilities into your online shopping platform. With this API, merchants can offer different payment methods via credit or debit cards, mobile wallets, cash, and bank transfers.  
weight: 20
tags: ["subtopic"]
---

<script src="/js/searchcodes.js"></script>

This guide shows how to leverage these services to enhance your customers' payment experience by providing flexible and secure payment options tailored to the local market.

{{% alert title="Note" color="info"%}}

To integrate with the Payments API, direct your requests to the following URLs based on the corresponding environment:
* Test: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Production: ```https://api.payulatam.com/payments-api/4.0/service.cgi```

{{% /alert %}}

## Available Methods

Payments API includes the following methods:

* [Submit Transactions Using Credit or Debit Cards]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}})
* [Submit Transactions Using Nequi]({{< ref "Payments-API-Colombia.md#submit-transactions-using-nequi" >}})
* [Submit Transactions Using Cash or Bank Reference]({{< ref "Payments-API-Colombia.md#submit-transactions-using-cash-or-bank-reference" >}})
* [Submit Transactions Using Bank Transfer (PSE)]({{< ref "Payments-API-Colombia.md#submit-transactions-using-bank-transfer-pse" >}})
* [Submit Transactions Using Bancolombia Button]({{< ref "#submit-transactions-using-bancolombia-button" >}})
* [Submit Transactions Using Google Pay]({{< ref "Payments-API-Colombia.md#submit-transactions-using-google-pay" >}})
* [Process Payments as an Airline or Travel Agency]({{< ref "#process-payments-as-an-airline-or-travel-agency" >}}) 
* [Banks List - PSE]({{< ref "Payments-API-Colombia.md#banks-list---pse" >}})
* [Available Payment Methods Query]({{< ref "Payments-API-Colombia.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-API-Colombia.md#ping" >}})

{{% alert title="Note" color="info"%}}

To confirm the status of a transaction, you can use one of the following options:
* Navigate to the the URL set in the `transaction.notifyUrl` variable or the _**Confirmation URL**_ option located in the Management Panel in _**Settings**_ > _**Technical configuration**_.
* Use the [Queries API or SDK]({{< ref "Queries.md" >}}).

{{% /alert %}}

## Submit Transactions Using Credit or Debit Cards

This method allows you to process the payments that your customers conduct using credit or debit cards. For Colombia, you can perform one-step flows (**Charge**). For more information, refer to [Payment flows]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Note" color="info"%}}

Two-step flow is available under request, contact your sales representative.

{{% /alert %}}

### Parameters for Request and Response

<details>
<summary>Request</summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Show mandatory fields only</label>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|-|-|-|-|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `SUBMIT_TRANSACTION`. | Yes |
| test (JSON)<hr>isTest (XML) | Boolean | | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| merchant | Object | | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| transaction | Object | | This object has the transaction data. | Yes |
| transaction > order | Object | | This object has the order data. | Yes |
| transaction > order > accountId | Number | | Identifier of your account. | Yes |
| transaction > order > referenceCode | Alphanumeric | Min:1 Max:255 | Represents the identifier of the order in your system. | Yes |
| transaction > order > description | Alphanumeric | Min:1 Max:255 | Description of the order. | Yes |
| transaction > order > language | Alphanumeric | 2 | Language used in emails sent to the buyer and the seller. | Yes |
| transaction > order > notifyUrl | Alphanumeric | Max:2048 | Confirmation URL of the order. | No |
| transaction > order > partnerId | Alphanumeric | Max:255 | Partner ID in PayU. | No |
| transaction > order > signature | Alphanumeric | Max:255 | The signature associated to the form. For more information refer [Authentication signature]({{< ref "integrations.html#authentication-signature" >}}). | Yes |
| transaction > order > shippingAddress | Object | | Shipping address. | No |
| transaction > order > shippingAddress > street1 | Alphanumeric | Max:100 | Address Line 1. | No |
| transaction > order > shippingAddress > street2 | Alphanumeric | Max:100 | Address Line 2. | No |
| transaction > order > shippingAddress > city | Alphanumeric | Max:50 | Address city. | No |
| transaction > order > shippingAddress > state | Alphanumeric | Max:40 | Address State. | No |
| transaction > order > shippingAddress > country | Alphanumeric | 2 | Address country. | No |
| transaction > order > shippingAddress > postalCode | Alphanumeric | Max:8 | Address Zip code. | No |
| transaction > order > shippingAddress > phone | Alphanumeric | Max:11 | Phone number associated to the address. | No |
| transaction > order > buyer | Object | | Buyer information. | Yes |
| transaction > order > buyer > merchantBuyerId | Alphanumeric | Max:100 | Buyer ID in your system. | No |
| transaction > order > buyer > fullName | Alphanumeric | Max:150 | Full name of the buyer. | Yes |
| transaction > order > buyer > emailAddress | Alphanumeric | Max:255 | E-mail of the buyer. | Yes |
| transaction > order > buyer > contactPhone | Alphanumeric | Max:20 | Phone number of the buyer. | Yes |
| transaction > order > buyer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. | Yes |
| transaction > order > buyer > shippingAddress | Alphanumeric | | Shipping address of the buyer. | Yes |
| transaction > order > buyer > shippingAddress > street1 | Alphanumeric | Max:150 | Buyer's shipping address Line 1. | Yes |
| transaction > order > buyer > shippingAddress > city | Alphanumeric | Max:50 | Buyer's shipping address city. | Yes |
| transaction > order > buyer > shippingAddress > state | Alphanumeric | Max:40 | Buyer's shipping address state. | Yes |
| transaction > order > buyer > shippingAddress > country | Alphanumeric | 2 | Buyer's shipping address country in format ISO 3166 alpha-2. | Yes |
| transaction > order > buyer > shippingAddress > postalCode | Number | Max:20 | Buyer's shipping address zip code. | Yes |
| transaction > order > buyer > shippingAddress > phone | Number | Max:20 | Buyer's shipping address phone number. | Yes |
| transaction > order > additionalValues > | Object | 64 | Amount of the order and its associated values. | Yes |
| transaction > order > additionalValues > TX_VALUE | Alphanumeric | 64 | Amount of the transaction. | Yes |
| transaction > order > additionalValues > TX_VALUE > value | Number | 12, 2 | Specifies the amount of the transaction. This amount cannot include decimals. | Yes |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX | Alphanumeric | 64 | Amount of the Value Added Tax (IVA - Impuesto al Valor Agregado). | Yes |
| transaction > order > additionalValues > TX_TAX > value | Number | 12, 2 | Specifies the amount of the IVA.<br>If this parameter is not set, PayU applies the current tax value (19%).<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits. | No |
| transaction > order > additionalValues > TX_TAX > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alphanumeric | 64 | Base value to calculate the IVA.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Number | 12, 2 | Specifies the base amount of the transaction. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > creditCardTokenId | Alphanumeric | | Include this parameter when the transaction is done using a tokenized card; moreover, it is mandatory to also send the parameter `transaction.creditCard.expirationDate`.<br>For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}). | No |
| transaction > creditCard | Object | | Credit card information. This object and its parameters are mandatory when the payment is performed using not tokenized credit card. | No |
| transaction > creditCard | Object | | Credit card information. If you process using debit card, do not send this parameter.<br>This object and its parameters are mandatory when the payment is performed using not tokenized credit card. | No |
| transaction > creditCard > number | Alphanumeric | Min:13 Max:20 | Credit card number. | No |
| transaction > creditCard > securityCode | Alphanumeric | Min:1 Max:4 | Credit card security code (CVC2, CVV2, CID). | No |
| transaction > creditCard > expirationDate | Alphanumeric | 7 | Credit card expiration date. Format `YYYY/MM`. | No |
| transaction > creditCard > name | Alphanumeric | Min:1 Max:255 | Holder's name displayed in the credit card. | No |
| transaction > creditCard > processWithoutCvv2 | Boolean | Max:255 | Allows you to process transactions without including the credit card security code. Your commerce requires PayU's authorization before using this feature. | No |
| transaction > debitCard | Object | | Debit card information. This object and its parameters are mandatory when the payment is performed using debit card. | No |
| transaction > debitCard > number | Alphanumeric | Min:13 Max:20 | Debit card number. | No |
| transaction > debitCard > securityCode | Alphanumeric | Min:1 Max:4 | Debit card security code (CVC2, CVV2, CID). | No |
| transaction > debitCard > expirationDate | Alphanumeric | 7 | Debit card expiration date. Format `YYYY/MM`. | No |
| transaction > debitCard > name | Alphanumeric | Min:1 Max:255 | Holder's name displayed in the debit card. | No |
| transaction > payer | Object | | Payer information. | Yes |
| transaction > payer > emailAddress | Alphanumeric | Max:255 | Payer e-mail address. | Yes |
| transaction > payer > merchantPayerId | Alphanumeric | Max:100 | Identifier of the payer in your system. | No |
| transaction > payer > fullName | Alphanumeric | Max:150 | Name of the payer which must meet the name sent in the parameter `transaction.creditCard.name`. | Yes |
| transaction > payer > billingAddress | Object | | Billing address. | Yes |
| transaction > payer > billingAddress > street1 | Alphanumeric | Max:100 | Billing Address Line 1. | Yes |
| transaction > payer > billingAddress > street2 | Alphanumeric | Max:100 | Billing Address Line 2. | No |
| transaction > payer > billingAddress > city | Alphanumeric | Max:50 | Billing address city. | Yes |
| transaction > payer > billingAddress > state | Alphanumeric | Max:40 | Billing address state. | No |
| transaction > payer > billingAddress > country | Alphanumeric | 2 | Billing address country in format ISO 3166 Alpha-2. | Yes |
| transaction > payer > billingAddress > postalCode | Alphanumeric | Max:20 | Billing address zip code. | No |
| transaction > payer > billingAddress > phone | Alphanumeric | Max:20 | Billing address phone number. | No |
| transaction > payer > birthdate | Alphanumeric | Max:10 | Payer's date of birth. | No |
| transaction > payer > contactPhone | Alphanumeric | Max:20 | Payer's phone number. | Yes |
| transaction > payer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. | Yes |
| transaction > payer > dniType | Alphanumeric | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alphanumeric | 32 | Set this value according to the transaction. For Colombia, set `AUTHORIZATION_AND_CAPTURE` | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid Credit card Payment Method. [See the available Payment Methods for Colombia]({{< ref "select-your-payment-method.html#colombia" >}}). | Yes |
| transaction > paymentCountry | Alphanumeric | 2 | Set `CO` for Colombia. | Yes |
| transaction > deviceSessionId | Alphanumeric | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Yes |
| transaction > ipAddress | Alphanumeric | Max:39 | IP address of the device where the customer performs the transaction. | Yes |
| transaction > cookie | Alphanumeric | Max:255 | Cookie stored by the device where the customer performs the transaction. | Yes |
| transaction > userAgent | Alphanumeric | Max:1024 | The User agent of the browser where the customer performs the transaction. | Yes |
| transaction > extraParameters | Object | | Additional parameters or data associated with the request. The maximum size of each _extraParameters_ name is 64 characters.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | No |
| transaction > threeDomainSecure | Object | | This object contains the information of 3DS 2.0. | No |
| transaction > threeDomainSecure > embedded | Boolean | | Set `true` if you want to use and embedded MPI for the Authorization process. By default, this value is set as `false`. | No |
| transaction > threeDomainSecure > eci | Number | Max:2 | Electronic Commerce Indicator.<br>Value returned by the directory servers showing the authentication attempt.<br>This parameter is mandatory when `transaction.threeDomainSecure.embedded` is `false` and `transaction.threeDomainSecure.xid` has been set. | No |
| transaction > threeDomainSecure > cavv | Alphanumeric | Max:28 | Cardholder Authentication Verification Value.<br>Code of the cryptogram used in the transaction authentication in Base64.<br>Depending on the specific ECI codes established by the process network, this value may be optional. | No |
| transaction > threeDomainSecure > xid | Alphanumeric | Max:28 | Transaction ID sent by the MPI in Base64.<br>This parameter is mandatory when `transaction.threeDomainSecure.embedded` is `false` and `transaction.threeDomainSecure.eci` has been set. | No |
| transaction > threeDomainSecure > directoryServerTransactionId | Alphanumeric | Max:36 | Transaction ID generated by the directory server during the authentication. | No |
| transaction > digitalWallet | Object |  | Include this parameter when the transaction is done using a Digital Wallet. *When sending this object, all its parameters are mandatory. | No |
| transaction > digitalWallet > type | Alphanumeric | ---- | Set this value according to the digital wallet that you are processing: GOOGLE_PAY | Yes* |
| transaction > digitalWallet > message | Alphanumeric | ---- | Include the information of the Google Pay Token that Google will return to you for each transaction. For more information consult [here](#payu-definitions-for-the-api-integration-of-the-payment-method). | Yes* |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric | | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse | Object | | The response data. |
| transactionResponse > orderId | Number | | The generated or existing order Id in PayU. |
| transactionResponse > transactionId | Alphanumeric | 36 | The identifier of the transaction in PayU. |
| transactionResponse > state | Alphanumeric | Max:32 | The status of the transaction. |
| transactionResponse > responseCode | Alphanumeric | Max:64 | The response code associated with the status. |
| transactionResponse > paymentNetworkResponseCode | Alphanumeric | Max:255 | The response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alphanumeric | Max:255 | The error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alphanumeric | Max:32 | The traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alphanumeric | Max:12 | The authorization code returned by the financial network. |
| transactionResponse > responseMessage | Alphanumeric | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date | | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters | Object |  | Additional parameters or data associated with the response. <br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo | Object | | Additional information associated with the response. This object follows the same structure than `transactionResponse.extraParameters`. |

</details>

#### Considerations

* For payments with credit card tokens, include the parameters `transaction.creditCardTokenId` and `transaction.creditCard.securityCode` (if you process with security code) replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}).
* By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative. After this feature is enabled for you, send in the request the variable `creditCard.processWithoutCvv2` as true and remove the variable `creditCard.securityCode`.
* The variable `transaction.threeDomainSecure` does not replace the card information nor any of the mandatory fields of the transaction. This object is additional and not mandatory.
* The variable `transaction.threeDomainSecure` corresponds to a _passthrough_ scenario where the commerce performs the authentication by their own.
* For Crédito Fácil Codensa card, the number of installments supported are 1 to 12, 18, 24, 36 and 48.
* For Crédito Fácil Codensa card, the payer can choose any of the following document types for the variable `transaction.payer.dniType`:

| ISO | Description |
|:-:|-|
| CC | Citizenship card. |
| CE | Foreign citizenship card. |
| NIT | Tax identification number (Companies). |
| TI | Identity Card. |
| PP | Passport. |
| IDC | Customer´s unique identifier, in the case of unique customer / utility consumer ID's. |
| CEL | When identified by the mobile line. |
| RC | Birth certificate. |
| DE | Foreign identification document. |

### API Call {#api-call}

The following are the examples of the request and response of this payment method.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request Example:
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
         "accountId": "512321",
         "referenceCode": "PRODUCT_TEST_2021-06-23T19:59:43.229Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "1d6c33aed575c4974ad5c0be7c6a1c87",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 65000,
               "currency": "COP"
            },
            "TX_TAX": {
               "value": 10378,
               "currency": "COP"
            },
            "TX_TAX_RETURN_BASE": {
               "value": 54622,
               "currency": "COP"
            }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Cr 23 No. 53-50",
               "street2": "5555487",
               "city": "Bogotá",
               "state": "Bogotá D.C.",
               "country": "CO",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "5555487",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
            "postalCode": "0000000",
            "phone": "7563126"
         }
      },
      "payer": {
         "merchantPayerId": "1",
         "fullName": "First name and second payer name",
         "emailAddress": "payer_test@test.com",
         "contactPhone": "7563126",
         "dniNumber": "5415668464654",
         "billingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "125544",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "creditCard": {
         "number": "4037997623271984",
         "securityCode": "321",
         "expirationDate": "2030/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "VISA",
      "paymentCountry": "CO",
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
   "test": true
}
```
<br>

Response Example:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400449660,
        "transactionId": "aa2f50b2-62a8-42de-b3be-c6fe08ec712f",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "81",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "CRED - 666039677",
        "authorizationCode": "123238",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Approved by the merchant",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624461913704,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT"
        },
        "additionalInfo": {
            "paymentNetwork": "CREDIBANCO",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": "CREDIT",
            "transactionType": "AUTHORIZATION_AND_CAPTURE"
        }
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request Example:
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
         <accountId>512321</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-23T19:59:43.229Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>1d6c33aed575c4974ad5c0be7c6a1c87</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>65000</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX</string>
               <additionalValue>
                  <value>10378</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX_RETURN_BASE</string>
               <additionalValue>
                  <value>54622</value>
                  <currency>COP</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>123456789</dniNumber>
            <shippingAddress>
               <street1>Cr 23 No. 53-50</street1>
               <street2>5555487</street2>
               <city>Bogotá</city>
               <state>Bogotá D.C.</state>
               <country>CO</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
            <postalCode>0000000</postalCode>
            <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <merchantPayerId>1</merchantPayerId>
         <fullName>First name and second payer name</fullName>
         <emailAddress>payer_test@test.com</emailAddress>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <billingAddress>
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <creditCard>
         <number>4037997623271984</number>
         <securityCode>321</securityCode>
         <expirationDate>2030/12</expirationDate>
         <name>APPROVED</name>
      </creditCard>
      <extraParameters>
         <entry>
            <string>INSTALLMENTS_NUMBER</string>
            <string>1</string>
         </entry>
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>VISA</paymentMethod>
      <paymentCountry>CO</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
      <threeDomainSecure>
         <embedded>false</embedded>
         <eci>01</eci>
         <cavv>AOvG5rV058/iAAWhssPUAAADFA==</cavv>
         <xid>Nmp3VFdWMlEwZ05pWGN3SGo4TDA=</xid>
         <directoryServerTransactionId>00000-70000b-5cc9-0000-000000000cb</directoryServerTransactionId>
      </threeDomainSecure>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Response Example:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400449666</orderId>
        <transactionId>c29d0543-810d-48c4-bd3e-163e935c2173</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>79</paymentNetworkResponseCode>
        <trazabilityCode>CRED - 666116683</trazabilityCode>
        <authorizationCode>787517</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Approved administrative transaction</responseMessage>
        <operationDate>2021-06-23T10:26:28</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>CREDIBANCO</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <cardType>CREDIT</cardType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Submit Transactions Using Nequi

Nequi is a comprehensive platform of financial services that operates through a digital wallet available to millions of users via a mobile application. With Nequi, you can make payments, transfers, top-ups, and withdrawals quickly and securely, all from your personal device.

In addition to being a convenient tool for individual users, Nequi is also an innovative payment solution for businesses. By accepting payments with Nequi, your business can enjoy a series of significant advantages:

* **Increase in sales:** By offering Nequi as a payment option, your business can attract new customers who prefer digital transactions. This can translate into increased sales and greater customer loyalty.

* **Greater convenience:** By allowing your customers to pay with Nequi, you are providing a more versatile and faster shopping experience. Customers can make instant payments using their mobile phones, without the need for cash or physical cards.

* **Greater security:** Nequi offers a secure and reliable payment environment, backed by Bancolombia, one of Colombia's largest and most trusted financial institutions. This provides peace of mind to both merchants and customers, as transactions are conducted securely and protected.

### Payment Process with Nequi

The payment flow with Nequi is designed to be simple and agile for the user. The process includes 4 steps:

1. **Selection of payment method:** The customer, at the time of making the purchase, chooses Nequi as their preferred payment method among the available options.

2. **Generation of push notification:** Automatically, the system generates a push notification that is sent to the customer's Nequi mobile application.

3. **Acceptance of notification:** The customer receives the notification in their Nequi application and proceeds to accept it to confirm the transaction.

4. **Entry of Nequi PIN:** To complete the operation, the customer enters their personal Nequi PIN to authenticate and authorize the payment.

### User Experience

This section outlines the necessary elements for an optimal user experience when using Nequi as a payment method:

1. Request the buyer's name and email address, for example:

<img src="/assets/Payments/NEQUI_EN_01.png" alt="PrintScreen" width="420">
<p></p>

2. Present Nequi as a payment method and request the phone number associated with the Nequi account, for example:

<img src="/assets/Payments/NEQUI_EN_02.png" alt="PrintScreen" width="420">
<p></p>

3. Provide a detailed summary of the payment. 

{{% alert title="Note" color="info"%}}

The image below is an example of PayU's summary page, you can leverage this page by redirecting users to the URL provided in the `URL_PAYMENT_RECEIPT_HTML` field from the API response, or you can design your own receipt by fetching the data from the corresponding response fields. For more information, refer to the [Parameters for Request and Response]({{< ref "#parameters-for-request-and-response-1" >}}) section.

{{% /alert %}}

<img src="/assets/Payments/NEQUI_EN_03.png" alt="PrintScreen" width="500">
<p></p>

4. Outline the steps to follow to facilitate the payment process for the buyer. PayU's summary page already includes these instructions, but if you are creating a customized page, we recommend displaying the steps to complete the process through Nequi. For example:

<img src="/assets/Payments/NEQUI_EN_04.png" alt="PrintScreen" width="420">
<p></p>

### Parameters for Request and Response {#parameters-for-request-and-response-1}

<details>
<summary>Request</summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Show mandatory fields only</label>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|-|-|-|-|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display generated error messages. [Check supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set to `SUBMIT_TRANSACTION`. | Yes |
| test (JSON)<hr>isTest (XML) | Boolean | | Set to `true` if the request is in test mode. Otherwise, set to `false`. | Yes |
| merchant | Object | | This object contains authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | Username or login provided by PayU. | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. | Yes |
| transaction | Object | | This object contains transaction data. | Yes |
| transaction > order | Object | | This object contains order data. | Yes |
| transaction > order > accountId | Number | | Your account identifier. | Yes |
| transaction > order > referenceCode | Alphanumeric | Min:1 Max:255 | Represents the order identifier in your system. | Yes |
| transaction > order > description | Alphanumeric | Min:1 Max:255 | Description of the order. | Yes |
| transaction > order > language | Alphanumeric | 2 | Language used in emails sent to the buyer and seller. | Yes |
| transaction > order > notifyUrl | Alphanumeric | Max:2048 | Order confirmation URL. | No |
| transaction > order > partnerId | Alphanumeric | Max:255 | PayU partner ID. | No |
| transaction > order > signature | Alphanumeric | Max:255 | Form associated signature. For more information, see [Authentication Signature]({{< ref "integrations.html#authentication-signature" >}}). | Yes |
| transaction > order > shippingAddress | Object | | Shipping address. | No |
| transaction > order > shippingAddress > street1 | Alphanumeric | Max:100 | Address line 1. | No |
| transaction > order > shippingAddress > street2 | Alphanumeric | Max:100 | Address line 2. | No |
| transaction > order > shippingAddress > city | Alphanumeric | Max:50 | City of the address. | No |
| transaction > order > shippingAddress > state | Alphanumeric | Max:40 | State of the address. | No |
| transaction > order > shippingAddress > country | Alphanumeric | 2 | Country of the address. | No |
| transaction > order > shippingAddress > postalCode | Alphanumeric | Max:8 | Postal code of the address. | No |
| transaction > order > shippingAddress > phone | Alphanumeric | Max:11 | Phone number associated with the address. | No |
| transaction > order > buyer | Object | | Buyer information. | Yes |
| transaction > order > buyer > merchantBuyerId | Alphanumeric | Max:100 | Buyer ID in your system. | No |
| transaction > order > buyer > fullName | Alphanumeric | Max:150 | Buyer's full name. | Yes |
| transaction > order > buyer > emailAddress | Alphanumeric | Max:255 | Buyer's email address. | Yes |
| transaction > order > buyer > contactPhone | Alphanumeric | Max:20 | Buyer's phone number. | Yes |
| transaction > order > buyer > dniNumber | Alphanumeric | Max:20 | Buyer's identification number. | Yes |
| transaction > order > buyer > shippingAddress | Object | | Buyer's shipping address. | Yes |
| transaction > order > buyer > shippingAddress > street1 | Alphanumeric | Max:150 | Buyer's shipping address line 1. | Yes |
| transaction > order > buyer > shippingAddress > city | Alphanumeric | Max:50 | Buyer's shipping address city. | Yes |
| transaction > order > buyer > shippingAddress > state | Alphanumeric | Max:40 | Buyer's shipping address state. | Yes |
| transaction > order > buyer > shippingAddress > country | Alphanumeric | 2 | Buyer's shipping address country in ISO 3166 alpha-2 format. | Yes |
| transaction > order > buyer > shippingAddress > postalCode | Number | Max:20 | Buyer's shipping address postal code. | Yes |
| transaction > order > buyer > shippingAddress > phone | Number | Max:20 | Buyer's shipping address phone number. | Yes |
| transaction > order > additionalValues | Alphanumeric | 64 | Order amount and associated values. | Yes |
| transaction > order > additionalValues > TX_VALUE | Alphanumeric | 64 | Transaction amount. | Yes |
| transaction > order > additionalValues > TX_VALUE > value | Number | 12, 2 | Specifies the transaction amount. This amount cannot include decimals. | Yes |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO currency code. [Check accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX | Alphanumeric | 64 | Value-added tax (VAT) amount. | Yes |
| transaction > order > additionalValues > TX_TAX > value | Number | 12, 2 | Specifies the VAT amount. If this parameter is not configured, PayU applies the current tax value (19%). If the amount has no VAT, send 0. This value can have two decimal digits. | No |
| transaction > order > additionalValues > TX_TAX > currency | Alphanumeric | 3 | ISO currency code. [Check accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alphanumeric | 64 | Base value for calculating VAT. If the amount has no VAT, send 0. This value can have two decimal digits. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Number | 12, 2 | Specifies the transaction base amount. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alphanumeric | 3 | ISO currency code. [Check accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > payer | Object | | Payer information. | Yes |
| transaction > payer > emailAddress | Alphanumeric | Max:255 | Payer's email address. | Yes |
| transaction > payer > merchantPayerId | Alphanumeric | Max:100 | Payer's identifier in your system. | No |
| transaction > payer > fullName | Alphanumeric | Max:150 | Payer's name. | Yes |
| transaction > payer > billingAddress | Object | | Billing address. | Yes |
| transaction > payer > billingAddress > street1 | Alphanumeric | Max:100 | Billing address line 1. | Yes |
| transaction > payer > billingAddress > street2 | Alphanumeric | Max:100 | Billing address line 2. | No |
| transaction > payer > billingAddress > city | Alphanumeric | Max:50 | Billing address city. | Yes |
| transaction > payer > billingAddress > state | Alphanumeric | Max:40 | Billing address state. | No |
| transaction > payer > billingAddress > country | Alphanumeric | 2 | Billing address country in ISO 3166 alpha-2 format. | Yes |
| transaction > payer > billingAddress > postalCode | Alphanumeric | Max:20 | Billing address postal code. | No |
| transaction > payer > billingAddress > phone | Alphanumeric | Max:20 | Billing address phone number. | No |
| transaction > payer > birthdate | Alphanumeric | Max:10 | Payer's date of birth. | No |
| transaction > payer > contactPhone | Alphanumeric | Max:20 | Payer's phone number. This is the number to be used for payment in Nequi. | Yes |
| transaction > payer > dniNumber | Alphanumeric | Max:20 | Payer's identification number. | Yes |
| transaction > payer > dniType | Alphanumeric | 2 | Buyer's identification type. [Check document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alphanumeric | 32 | Assign this value according to the transaction. For Colombia, assign `AUTHORIZATION_AND_CAPTURE`. | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Set `NEQUI` for Nequi Payment Method. | Yes |
| transaction > paymentCountry | Alphanumeric | 2 | Set `CO` for Colombia. | Yes |
| transaction > deviceSessionId | Alphanumeric | Max:255 | Device session identifier where the client performs the transaction. For more information, see [this section]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Yes |
| transaction > ipAddress | Alphanumeric | Max:39 | IP address of the device where the client performs the transaction. | Yes |
| transaction > cookie | Alphanumeric | Max:255 | Cookie stored by the device where the client performs the transaction. | Yes |
| transaction > userAgent | Alphanumeric | Max:1024 | Browser user agent where the client performs the transaction. | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric | | Transaction response code. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | Error message associated when the response code is `ERROR`. |
| transactionResponse | Object | | Response data. |
| transactionResponse > orderId | Number | | Order identifier generated or existing in PayU. |
| transactionResponse > transactionId | Alphanumeric | 36 | Transaction identifier in PayU. |
| transactionResponse > state | Alphanumeric | Max:32 | Transaction state. |
| transactionResponse > responseCode | Alphanumeric | Max:64 | Response code associated with the state. |
| transactionResponse > pendingReason | Alphanumeric | Max:64 | Pending reason of the transaction. |
| transactionResponse > paymentNetworkResponseCode | Alphanumeric | Max:255 | Response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alphanumeric | Max:255 | Error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alphanumeric | Max:32 | Trazability code returned by the financial network. |
| transactionResponse > authorizationCode | Alphanumeric | Max:12 | Authorization code returned by the financial network. |
| transactionResponse > responseMessage | Alphanumeric | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date | | Creation date of the response in the PayU system. |
| transactionResponse > extraParameters | Object | | Additional parameters or data associated with the response. <li>In JSON, the `extraParameters` parameter follows this structure: `"extraParameters": { "URL_PAYMENT_RECEIPT_HTML": "https:payu.checkout.com"}`<li>In XML, the `extraParameters` parameter follows this structure: `<extraParameters> <entry>  <string>URL_PAYMENT_RECEIPT_HTML</string>  <string>https:payu.checkout.com</string> </entry></extraParameters>` <br>**Note:** Consider that you can leverage this URL to redirect the user to a PayU page with a summary of the purchase, as seen in [User Experience]({{< ref "#user-experience" >}}). |
| transactionResponse > additionalInfo | Object | | Additional information associated with the response. This object follows the same structure as `transactionResponse.extraParameters`. |

</details>

### API Call {#api-call-1}

The following are the request and response bodies for this payment method:

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request Example:
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
         "accountId": "512321",
         "referenceCode": "PRODUCT_TEST_2024-01-18T19:59:43.229Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "1d6c33aed575c4974ad5c0be7c6a1c87",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 65000,
               "currency": "COP"
            },
            "TX_TAX": {
               "value": 10378,
               "currency": "COP"
            },
            "TX_TAX_RETURN_BASE": {
               "value": 54622,
               "currency": "COP"
            }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "57 3007777777",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Cr 23 No. 53-50",
               "street2": "5555487",
               "city": "Bogotá",
               "state": "Bogotá D.C.",
               "country": "CO",
               "postalCode": "000000",
               "phone": "57 3007777777"
            }
         },
         "shippingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "5555487",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
            "postalCode": "0000000",
            "phone": "7563126"
         }
      },
      "payer": {
         "merchantPayerId": "1",
         "fullName": "First name and second payer name",
         "emailAddress": "payer_test@test.com",
         "contactPhone": "57 3007777777",
         "dniNumber": "5415668464654",
         "billingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "125544",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
            "postalCode": "000000",
            "phone": "57 3007777777"
         }
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "NEQUI",
      "paymentCountry": "CO",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": false
}

```
<br>

Response Example:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 2151135729,
        "transactionId": "fe667b48-e685-40b3-8863-9a0cd8257860",
        "state": "PENDING",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "3ba38ac9-3d68-48ef-bf86-b6c121404162",
        "authorizationCode": null,
        "pendingReason": "AWAITING_PAYMENT_IN_ENTITY",
        "responseCode": "PENDING_PAYMENT_IN_ENTITY",
        "errorCode": null,
        "responseMessage": "SUCCESS",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1705670262058,
        "referenceQuestionnaire": null,
        "extraParameters": null,
        "additionalInfo": null
    }
}

```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request Example:
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
      <accountId>512321</accountId>
      <referenceCode>PRODUCT_TEST_2024-01-18T19:59:43.229Z</referenceCode>
      <description>Payment test description</description>
      <language>es</language>
      <signature>1d6c33aed575c4974ad5c0be7c6a1c87</signature>
      <notifyUrl>http://www.payu.com/notify</notifyUrl>
      <additionalValues>
        <entry>
          <string>TX_VALUE</string>
          <additionalValue>
            <value>65000</value>
            <currency>COP</currency>
          </additionalValue>
          <string>TX_TAX</string>
          <additionalValue>
            <value>10378</value>
            <currency>COP</currency>
          </additionalValue>
          <string>TX_TAX_RETURN_BASE</string>
          <additionalValue>
            <value>54622</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
      </additionalValues>
      <buyer>
        <merchantBuyerId>1</merchantBuyerId>
        <fullName>First name and second buyer name</fullName>
        <emailAddress>buyer_test@test.com</emailAddress>
        <contactPhone>57 3007777777</contactPhone>
        <dniNumber>123456789</dniNumber>
        <shippingAddress>
          <street1>Cr 23 No. 53-50</street1>
          <street2>5555487</street2>
          <city>Bogotá</city>
          <state>Bogotá D.C.</state>
          <country>CO</country>
          <postalCode>000000</postalCode>
          <phone>57 3007777777</phone>
        </shippingAddress>
      </buyer>
      <shippingAddress>
        <street1>Cr 23 No. 53-50</street1>
        <street2>5555487</street2>
        <city>Bogot√°</city>
        <state>Bogot√° D.C.</state>
        <country>CO</country>
        <postalCode>0000000</postalCode>
        <phone>7563126</phone>
      </shippingAddress>
    </order>
    <payer>
      <merchantPayerId>1</merchantPayerId>
      <fullName>First name and second payer name</fullName>
      <emailAddress>payer_test@test.com</emailAddress>
      <contactPhone>57 3007777777</contactPhone>
      <dniNumber>5415668464654</dniNumber>
      <billingAddress>
        <street1>Cr 23 No. 53-50</street1>
        <street2>125544</street2>
        <city>Bogotá</city>
        <state>Bogotá D.C.</state>
        <country>CO</country>
        <postalCode>000000</postalCode>
        <phone>57 3007777777</phone>
      </billingAddress>
    </payer>
    <type>AUTHORIZATION_AND_CAPTURE</type>
    <paymentMethod>NEQUI</paymentMethod>
    <paymentCountry>CO</paymentCountry>
    <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
    <ipAddress>127.0.0.1</ipAddress>
    <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
    <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
  </transaction>
  <isTest>false</isTest>
</request>
```
<br>

Response Example:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>2151135729</orderId>
        <transactionId>fe667b48-e685-40b3-8863-9a0cd8257860</transactionId>
        <state>PENDING</state>
        <paymentNetworkResponseCode>0</paymentNetworkResponseCode>
        <trazabilityCode>3ba38ac9-3d68-48ef-bf86-b6c121404162</trazabilityCode>
        <pendingReason>AWAITING_PAYMENT_IN_ENTITY</pendingReason>
        <responseCode>PENDING_PAYMENT_IN_ENTITY</responseCode>
        <responseMessage>SUCCESS</responseMessage>
        <operationDate>2024-01-19T08:17:42</operationDate>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

#### Supported Phone Number Formats

When using API integrations, transactions may fail when the system receives user phone numbers that:

1. Contain whitespace.
2. Are not separated from the country code.
3. Contain more or less than 10 digits (excluding the country code).

 Currently, the integration does not provide a mechanism to automatically correct the format of the phone number that the user enters. The table below shows examples of phone number formats and their compatibility with the integration:

| Phone Number Format Example | Compatibility | Details |
| - | - | - |
| 57 3007777777 | Compatible format | The country code (57) is separated from the mobile number. |
| 3007777777 | Compatible format | The mobile number has no spaces and is 10 digits long. |
| 573007777777 | Incompatible format | The mobile number and the country code (57) are not separated. |
| 57 300 7777777 | Incompatible format | The mobile number has spaces. |

**Recommendations**

To prevent errors caused by incompatible phone number formats, we recommend implementing the following features in the user experience:

1. Implement an interface that automatically creates separator spaces in the mobile number as the user enters it, making the number easier to read and reducing the likelihood of manual entry errors. Ensure that these spaces are visible at the interface level while configuring your system to remove them at the backend level.

* Interface example:

<img src="/assets/Payments/Nequi05EN.png" alt="PrintScreen" width="600">
<p></p>

2. Configure error messages to display when a user enters a phone number with less than 10 digits or more than 10 digits (excluding the country code, which is +57 for Colombia).

* **A)** Example of an interface displaying automatically generated spaces when the user has entered fewer than 10 digits:

<img src="/assets/Payments/Nequi06EN.png" alt="PrintScreen" width="600">
<p></p>

* **B)** Example of an interface without spaces when the user has entered more than 10 digits:

<img src="/assets/Payments/Nequi07EN.png" alt="PrintScreen" width="600">

#### Sandbox Environment Testing

To test Nequi transactions in the PayU Sandbox environment, use the following data:

| Phone number | Authorization behavior | Query behavior <br>(Approximately 5 minutes after authorization) |
|-|-|-|
| 3006666666 | Transaction rejected - Client not found on database | N/A |
| 3007777777 | Transaction pending | Transaction approved |
| 3007777776 | Transaction pending | Transaction declined |
| 3007777775 | Transaction pending | Transaction pending |
| 3007777774 | Transaction pending | Transaction failed |
| 3007777772 | Transaction pending | Transaction expired |

You can check the transaction status through the [Queries API]({{< ref "queries-api.html" >}}).

## Submit Transactions Using Cash or Bank Reference

This method allows you to process customer payments in cash or through a bank reference. To integrate this payment method, redirect the customer to the URL provided in the method's response. Your customer will then see a payment receipt as shown below.

#### Payments in Cash

<img src="/assets/Payments/CashReceiptCO.png" alt="PrintScreen" width="75%">

#### Payments with Bank Reference

<img src="/assets/Payments/BankReferenceReceiptCO.png" alt="PrintScreen" width="75%">

### Parameters for Request and Response {#parameters-for-request-and-response-2}

<details>
<summary>Request</summary>
<label for="table3" class="showMandatory"><input type="checkbox" id="table3" name="table3" value="true" onchange="showMandatory(this)"> Show mandatory fields only</label>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|-|-|-|-|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `SUBMIT_TRANSACTION`. | Yes |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| merchant | Object | | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| transaction | Object | | This object has the transaction data. | Yes |
| transaction > order | Object | | This object has the order data. | Yes |
| transaction > order > accountId | Number | | Identifier of your account. | Yes |
| transaction > order > referenceCode | Alphanumeric | Min:1 Max:255 | Represents the identifier of the order in your system. | Yes |
| transaction > order > description | Alphanumeric | Min:1 Max:255 | Description of the order. | Yes |
| transaction > order > language | Alphanumeric | 2 | Language used in emails sent to the buyer and the seller. | Yes |
| transaction > order > notifyUrl | Alphanumeric | Max:2048 | Confirmation URL of the order. | No |
| transaction > order > partnerId | Alphanumeric | Max:255 | Partner ID in PayU. | No |
| transaction > order > signature | Alphanumeric | Max:255 | The signature associated to the form. For more information refer [Authentication signature]({{< ref "integrations.html#authentication-signature" >}}). | Yes |
| transaction > order > shippingAddress | Object | | Shipping address. | No |
| transaction > order > shippingAddress > street1 | Alphanumeric | Max:100 | Address Line 1. | No |
| transaction > order > shippingAddress > street2 | Alphanumeric | Max:100 | Address Line 2. | No |
| transaction > order > shippingAddress > city | Alphanumeric | Max:50 | Address city. | No |
| transaction > order > shippingAddress > state | Alphanumeric | Max:40 | Address State. | No |
| transaction > order > shippingAddress > country | Alphanumeric | 2 | Address country. | No |
| transaction > order > shippingAddress > postalCode | Alphanumeric | Max:8 | Address Zip code. | No |
| transaction > order > shippingAddress > phone | Alphanumeric | Max:11 | Phone number associated to the address. | No |
| transaction > order > buyer | Object | | Buyer information. | Yes |
| transaction > order > buyer > merchantBuyerId | Alphanumeric | Max:100 | Buyer ID in your system. | No |
| transaction > order > buyer > fullName | Alphanumeric | Max:150 | Full name of the buyer. | Yes |
| transaction > order > buyer > emailAddress | Alphanumeric | Max:255 | E-mail of the buyer. | Yes |
| transaction > order > buyer > contactPhone | Alphanumeric | Max:20 | Phone number of the buyer. | Yes |
| transaction > order > buyer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. | Yes |
| transaction > order > buyer > shippingAddress | Alphanumeric | | Shipping address of the buyer. | Yes |
| transaction > order > buyer > shippingAddress > street1 | Alphanumeric | Max:150 | Buyer's shipping address Line 1. | Yes |
| transaction > order > buyer > shippingAddress > city | Alphanumeric | Max:50 | Buyer's shipping address city. | Yes | 
| transaction > order > buyer > shippingAddress > state | Alphanumeric | Max:40 | Buyer's shipping address state. | Yes |
| transaction > order > buyer > shippingAddress > country | Alphanumeric | 2 | Buyer's shipping address country in format ISO 3166 alpha-2. | Yes |
| transaction > order > buyer > shippingAddress > postalCode | Number | Max:20 | Buyer's shipping address zip code. | Yes |
| transaction > order > buyer > shippingAddress > phone | Number | Max:20 | Buyer's shipping address phone number. | Yes |
| transaction > order > additionalValues > | Object | 64 | Amount of the order or its associated values. | Yes |
| transaction > order > additionalValues > TX_VALUE | Alphanumeric | 64 | Amount of the transaction. | Yes |
| transaction > order > additionalValues > TX_VALUE > value | Number | 12, 2 | Specifies the amount of the transaction. This amount cannot include decimals. | Yes |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Yes |
| transaction > order > additionalValues > TX_TAX | Alphanumeric | 64 | Amount of the Value Added Tax (IVA - Impuesto al Valor Agregado). | Yes |
| transaction > order > additionalValues > TX_TAX > value | Number | 12, 2 | Specifies the amount of the IVA.<br>If this parameter is not set, PayU applies the current tax value (19%).<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alphanumeric | 64 | Base value to calculate the IVA.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Number | 12, 2 | Specifies the base amount of the transaction. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > payer | Object | | Payer information. | Yes |
| transaction > payer > emailAddress | Alphanumeric | Max:255 | Payer e-mail address. | Yes |
| transaction > payer > merchantPayerId | Alphanumeric | Max:100 | Identifier of the payer in your system. | No |
| transaction > payer > fullName | Alphanumeric | Max:150 | Name of the payer. | Yes |
| transaction > payer > billingAddress | Object | | Billing address. | Yes |
| transaction > payer > billingAddress > street1 | Alphanumeric | Max:100 | Billing Address Line 1. | Yes |
| transaction > payer > billingAddress > street2 | Alphanumeric | Max:100 | Billing Address Line 2. | No |
| transaction > payer > billingAddress > city | Alphanumeric | Max:50 | Billing address city. | Yes |
| transaction > payer > billingAddress > state | Alphanumeric | Max:40 | Billing address state. | Yes |
| transaction > payer > billingAddress > country | Alphanumeric | 2 | Billing address country in format ISO 3166 Alpha-2. | Yes |
| transaction > payer > billingAddress > postalCode | Alphanumeric | Max:20 | Billing address zip code. | No |
| transaction > payer > billingAddress > phone | Alphanumeric | Max:20 | Billing address phone number. | No |
| transaction > payer > birthdate | Alphanumeric | Max:10 | Payer's date of birth. | No |
| transaction > payer > contactPhone | Alphanumeric | Max:20 | Payer's phone number. | Yes |
| transaction > payer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. | Yes |
| transaction > payer > dniType | Alphanumeric | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alphanumeric | 32 | As cash and Bank reference payments are performed in physical offices, la única transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid Payment Method in cash or Bank Reference. [See the available Payment Methods for Colombia]({{< ref "select-your-payment-method.html#colombia" >}}). | Yes |
| transaction > paymentCountry | Alphanumeric | 2 | Set `CO` for Colombia. | Yes |
| transaction > expirationDate | Alphanumeric | 23 | Maximum date and time that the payer has to make the payment. Format `YYYY-MM-DDTHH:MM:SS`, for example `2021-06-12T16:07:11.586`. | No |
| transaction > ipAddress | Alphanumeric | Max:39 | IP address of the device where the customer performs the transaction. | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric | | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse | Object | | The response data. |
| transactionResponse > orderId | Number | | The generated or existing order Id in PayU. |
| transactionResponse > transactionId | Alphanumeric | 36 | The identifier of the transaction in PayU. |
| transactionResponse > state | Alphanumeric | Max:32 | The status of the transaction. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alphanumeric | Max:255 | The response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alphanumeric | Max:255 | The error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alphanumeric | Max:32 | The traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alphanumeric | Max:12 | The authorization code returned by the financial network. |
| transactionResponse > pendingReason | Alphanumeric | Max:21 | The reason code associated with the status, as mentioned in `transactionResponse > state`, the transaction is waiting for the payment. |
| transactionResponse > responseCode | Alphanumeric | Max:64 | The response code associated with the status. In this case, for successful transactions is `PENDING_TRANSACTION_CONFIRMATION`. |
| transactionResponse > responseMessage | Alphanumeric | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date | | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters | Object | | Additional parameters or data associated with the response.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"REFERENCE": "74794"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>REFERENCE</string>`<br>&emsp;&emsp;`<int>74794</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo | Object |  | Additional information associated with the response. This object follows the same structure than `transactionResponse.extraParameters`. |

</details>

#### Considerations

* The parameter `transaction.expirationDate` is not mandatory. If you don't send this parameter, its default value is seven (7) days after the current date.<br>If you send a date later than the default number of days, PayU will ignore this value and the expiration will be set as default.
* For <!--`BALOTO` and -->`EFECTY`, the confirmation of the payment takes 15 minutes. For `BANK_REFERENCED` and `OTHERS_CASH` (Su Red), the confirmation is online.
* The minimum and maximum values for <!--`BALOTO`, -->`EFECTY`, and `OTHERS_CASH` (Su Red) are:
   - `EFECTY` > Min: $20.000 COP - Max: $6.000.000 COP
   - `OTHERS_CASH` (Su Red) > Min: $1.000 COP - Max: $4.000.000 COP<!-- - `BALOTO` > Min: $3.000 COP - Max: $1.000.000 COP-->
* The parameter `transactionResponse.extraParameters` has the following parameters related to the transaction:
   - **EXPIRATION_DATE**: maximum term for the payer to perform the payment.   
   - **REFERENCE**: internal payment reference generated by PayU.
   - **URL_PAYMENT_RECEIPT_HTML**: payment receipt in HTML format. This is where you need to redirect the payment when the payer selects cash payment. 
   - **URL_PAYMENT_RECEIPT_PDF**: payment receipt in PDF format.
   - **BANCO_BOGOTA_SERVICE_CODE**: payment code for Banco de Bogotá. Available when using `BANK_REFERENCED`.
   - **BANK_REFERENCED_NAME**: Reference name for Bancolombia. Available when using `BANK_REFERENCED`.
   - **BANCOLOMBIA_SERVICE_CODE**: payment code for Bancolombia. Available when using `BANK_REFERENCED`.

### API Call {#api-call-2}

The following are the bodies of the request and response of this payment method.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request Example:
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
         "accountId": "512321",
         "referenceCode": "PRODUCT_TEST_2021-06-23T19:59:43.229Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "1d6c33aed575c4974ad5c0be7c6a1c87",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 65000,
               "currency": "COP"
         },
            "TX_TAX": {
               "value": 10378,
               "currency": "COP"
         },
            "TX_TAX_RETURN_BASE": {
               "value": 54622,
               "currency": "COP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Cr 23 No. 53-50",
               "street2": "5555487",
               "city": "Bogotá",
               "state": "Bogotá D.C.",
               "country": "CO",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "5555487",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
            "postalCode": "0000000",
            "phone": "7563126"
         }
      },
      "payer": {
         "merchantPayerId": "1",
         "fullName": "First name and second payer name",
         "emailAddress": "payer_test@test.com",
         "contactPhone": "7563126",
         "dniNumber": "5415668464654",
         "billingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "125544",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "EFECTY",
      "expirationDate": "2021-06-24T20:58:35.804",
      "paymentCountry": "CO",
      "ipAddress": "127.0.0.1"
   },
   "test": false
}
```
<br>

Response Example:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400449740,
        "transactionId": "f3531b6a-3e30-4a8b-8a69-d4a5bd2a3377",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "f3531b6a-3e30-4a8b-8a69-d4a5bd2a3377",
        "authorizationCode": null,
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624463917065,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "EXPIRATION_DATE": 1624568315804,
            "REFERENCE": 1400449740,
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=1400449740Yf3531b6a3e304a8Y30f3f7b4598eb19",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app/v2?vid=1400449740Yf3531b6a3e304a8Y30f3f7b4598eb19"
        },
        "additionalInfo": {
            "paymentNetwork": "EFECTY",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": null,
            "transactionType": "AUTHORIZATION_AND_CAPTURE"
        }
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request Example:
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
         <accountId>512321</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-23T19:59:43.229Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>1d6c33aed575c4974ad5c0be7c6a1c87</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>65000</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX</string>
               <additionalValue>
                  <value>10378</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX_RETURN_BASE</string>
               <additionalValue>
                  <value>54622</value>
                  <currency>COP</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>123456789</dniNumber>
            <shippingAddress>
               <street1>Cr 23 No. 53-50</street1>
               <street2>5555487</street2>
               <city>Bogotá</city>
               <state>Bogotá D.C.</state>
               <country>CO</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
            <postalCode>0000000</postalCode>
            <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <merchantPayerId>1</merchantPayerId>
         <fullName>First name and second payer name</fullName>
         <emailAddress>payer_test@test.com</emailAddress>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <billingAddress>
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>EFECTY</paymentMethod>
      <expirationDate>2021-06-24T20:58:35.804</expirationDate>
      <paymentCountry>CO</paymentCountry>
      <ipAddress>127.0.0.1</ipAddress>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Response Example:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400449797</orderId>
        <transactionId>0b41f4d0-4486-4acf-ab5e-d757e35d994d</transactionId>
        <state>PENDING</state>
        <trazabilityCode>0b41f4d0-4486-4acf-ab5e-d757e35d994d</trazabilityCode>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <operationDate>2021-06-23T11:20:03</operationDate>
        <extraParameters>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-30T23:59:59</date>
            </entry>
            <entry>
                <string>REFERENCE</string>
                <int>1400449797</int>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=1400449797Y0b41f4d044864acY3e5f14fc8ef00e8</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app/v2?vid=1400449797Y0b41f4d044864acY3e5f14fc8ef00e8</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>EFECTY</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Submit Transactions Using Bank Transfer (PSE)

This method lets you process the bank transfer payments of your customers. In Colombia, bank transfers are made through PSE, to perform an integration with this payment method, you need to create a Payment form following these steps:

1. Include a PSE button making clear that your customer will use _Proveedor de Servicios Electrónicos PSE_.
* You can use the following names in Spanish:
    - Débito desde cuenta corriente/ahorros
    - Débito bancario PSE
    - PSE
* Do not use any of the following names:
    - Transferencia bancaria
    - Débito de cuenta
    - Tarjeta débito

2. Query the available bank list to show them to the payer. To query the bank list, refer to [this method]({{< ref "Payments-API-Colombia.md#bank-list---pse" >}}).<br>You must update the the bank list in your system once a day.

3. Show the list of banks as displayed below:

<img src="/assets/Payments/PSEBankList_EN.png" alt="PrintScreen" width="50%"><br>

When the payer selects a bank, you must send the parameter `pseCode` of the selection in the extra parameter `FINANCIAL_INSTITUTION_CODE` in the request.

4. Show a list to let the payer choose whether they are a _Natural_ (N) or _Legal_ (J) person. Depending on what the payer choose, you must send the value in the extra parameter `USER_TYPE` in the request. The list must be displayed as follows:

<img src="/assets/Payments/PSEPersonList_EN.png" alt="PrintScreen" width="50%"><br>

{{% alert title="Note" color="info"%}}

This field is not mandatory for _PSE Avanza_.

{{% /alert %}}

5. Show a list to let the payer choose their identification type. You must send the ISO code of the value selected in the extra parameter `PSE_REFERENCE2` in the request. The list must be displayed as follows:

<img src="/assets/Payments/PSEDocType_EN.png" alt="PrintScreen" width="50%"><br>

The list of available documents is:

| ISO | Description |
|:-:|-|
| CC | Citizenship card. |
| CE | Foreign citizenship card. |
| NIT | Tax identification number (Companies). |
| TI | Identity Card. |
| PP | Passport. |
| RC | Birth certificate. |
| DE | Foreign identification document. |

6. You must send the payer identification number in the extra parameter `PSE_REFERENCE3` in the request.

### Parameters for Request and Response {#parameters-for-request-and-response-3}

<details>
<summary>Request</summary>
<label for="table4" class="showMandatory"><input type="checkbox" id="table4" name="table4" value="true" onchange="showMandatory(this)"> Show mandatory fields only</label>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|-|-|-|-|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `SUBMIT_TRANSACTION`. | Yes |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| merchant | Object | | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| transaction | Object | | This object has the transaction data. | Yes |
| transaction > order | Object | | This object has the order data. | Yes |
| transaction > order > accountId | Number | | Identifier of your account. | Yes |
| transaction > order > referenceCode | Alphanumeric | Min:1 Max:255 | Represents the identifier of the order in your system. | Yes |
| transaction > order > description | Alphanumeric | Min:1 Max:255 | Description of the order. | Yes |
| transaction > order > language | Alphanumeric | 2 | Language used in emails sent to the buyer and the seller. | Yes |
| transaction > order > notifyUrl | Alphanumeric | Max:2048 | Confirmation URL of the order. | No|
| transaction > order > partnerId | Alphanumeric | Max:255 | Partner ID in PayU. | No |
| transaction > order > signature | Alphanumeric | Max:255 | The signature associated to the form. For more information refer [Authentication signature]({{< ref "integrations.html#authentication-signature" >}}). | Yes |
| transaction > order > shippingAddress | Object | | Shipping address. | No |
| transaction > order > shippingAddress > street1 | Alphanumeric | Max:100 | Address Line 1. | No |
| transaction > order > shippingAddress > street2 | Alphanumeric | Max:100 | Address Line 2. | No |
| transaction > order > shippingAddress > city | Alphanumeric | Max:50 | Address city. | No |
| transaction > order > shippingAddress > state | Alphanumeric | Max:40 | Address State. | No |
| transaction > order > shippingAddress > country | Alphanumeric | 2 | Address country. | No |
| transaction > order > shippingAddress > postalCode | Alphanumeric | Max:8 | Address Zip code. | No |
| transaction > order > shippingAddress > phone | Alphanumeric | Max:11 | Phone number associated to the address. | No |
| transaction > order > buyer | Object | | Buyer information. | Yes |
| transaction > order > buyer > merchantBuyerId | Alphanumeric | Max:100 | Buyer ID in your system. | No |
| transaction > order > buyer > fullName | Alphanumeric | Max:150 | Full name of the buyer. | Yes |
| transaction > order > buyer > emailAddress | Alphanumeric | Max:255 | E-mail of the buyer. | Yes |
| transaction > order > buyer > contactPhone | Alphanumeric | Max:20 | Phone number of the buyer. | Yes |
| transaction > order > buyer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. | Yes |
| transaction > order > buyer > shippingAddress | Alphanumeric |  | Shipping address of the buyer. | Yes |
| transaction > order > buyer > shippingAddress > street1 | Alphanumeric | Max:150 | Buyer's shipping address Line 1. | Yes |
| transaction > order > buyer > shippingAddress > city | Alphanumeric | Max:50 | Buyer's shipping address city. | Yes |
| transaction > order > buyer > shippingAddress > state | Alphanumeric | Max:40 | Buyer's shipping address state. | Yes |
| transaction > order > buyer > shippingAddress > country | Alphanumeric | 2 | Buyer's shipping address country in format ISO 3166 alpha-2. | Yes |
| transaction > order > buyer > shippingAddress > postalCode | Number | Max:20 | Buyer's shipping address zip code. | Yes |
| transaction > order > buyer > shippingAddress > phone | Number | Max:20 | Buyer's shipping address phone number. | Yes |
| transaction > order > additionalValues > | Object | 64 | Amount of the order or its associated values. | Yes |
| transaction > order > additionalValues > TX_VALUE | Alphanumeric | 64 | Amount of the transaction. | Yes |
| transaction > order > additionalValues > TX_VALUE > value | Number | 12, 2 | Specifies the amount of the transaction. This amount cannot include decimals. | Yes |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Yes |
| transaction > payer | Object | | Payer information. | Yes |
| transaction > payer > emailAddress | Alphanumeric | Max:255 | Payer e-mail address. | Yes |
| transaction > payer > merchantPayerId | Alphanumeric | Max:100 | Identifier of the payer in your system. | No |
| transaction > payer > fullName | Alphanumeric | Max:150 | Name of the payer. | Yes |
| transaction > payer > billingAddress | Object | | Billing address. | Yes |
| transaction > payer > billingAddress > street1 | Alphanumeric | Max:100 | Billing Address Line 1. | Yes |
| transaction > payer > billingAddress > street2 | Alphanumeric | Max:100 | Billing Address Line 2. | No |
| transaction > payer > billingAddress > city | Alphanumeric | Max:50 | Billing address city. | Yes |
| transaction > payer > billingAddress > state | Alphanumeric | Max:40 | Billing address state. | No |
| transaction > payer > billingAddress > country | Alphanumeric | 2 | Billing address country in format ISO 3166 Alpha-2. | Yes |
| transaction > payer > billingAddress > postalCode | Alphanumeric | Max:20 | Billing address zip code. | No |
| transaction > payer > billingAddress > phone | Alphanumeric | Max:20 | Billing address phone number. | No |
| transaction > payer > birthdate | Alphanumeric | Max:10 | Payer's date of birth. | No |
| transaction > payer > contactPhone | Alphanumeric | Max:20 | Payer's phone number. | Yes |
| transaction > payer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. | Yes |
| transaction > payer > dniType | Alphanumeric | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Yes |
| transaction > type | Alphanumeric | 32 | As these payments are performed in PSE webpage, la única transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid Payment Method in bank transfer. [See the available Payment Methods for Colombia]({{< ref "select-your-payment-method.html#colombia" >}}). | Yes |
| transaction > paymentCountry | Alphanumeric | 2 | Set `CO` for Colombia. | Yes |
| transaction > deviceSessionId | Alphanumeric | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Yes |
| transaction > ipAddress | Alphanumeric | Max:39 | IP address of the device where the customer performs the transaction. | Yes |
| transaction > cookie | Alphanumeric | Max:255 | Cookie stored by the device where the customer performs the transaction. | Yes |
| transaction > userAgent | Alphanumeric | Max:1024 | The User agent of the browser where the customer performs the transaction. | Yes |
| transaction > extraParameters | Object | | Additional parameters or data associated with the request. <br>For bank transfer payments, this is the response page of your commerce.<br>In JSON, the _extraParameters_ parameter is set as: <br>`"extraParameters": {`<br>&emsp;`"PSE_REFERENCE3": "123456789"`<br>`}`<br><br>In XML, the _extraParameters_ parameter is set as: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>PSE_REFERENCE3</string>`<br>&emsp;&emsp;`<string>123456789</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` | No |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric | | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse | Object | | The response data. |
| transactionResponse > orderId | Number | | The generated or existing order Id in PayU. |
| transactionResponse > transactionId | Alphanumeric | 36 | The identifier of the transaction in PayU. |
| transactionResponse > state | Alphanumeric | Max:32 | The status of the transaction. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alphanumeric | Max:255 | The response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alphanumeric | Max:255 | The error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alphanumeric | Max:32 | The traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alphanumeric | Max:12 | The authorization code returned by the financial network. |
| transactionResponse > pendingReason | Alphanumeric | Max:21 | The reason code associated with the status, as mentioned in `transactionResponse > state`, the transaction is waiting for the payment. |
| transactionResponse > responseCode | Alphanumeric | Max:64 | The response code associated with the status. In this case, for successful transactions is `PENDING_TRANSACTION_CONFIRMATION`. |
| transactionResponse > responseMessage | Alphanumeric | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date | | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters | Object | | Additional parameters or data associated with the response.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"BANK_URL": "xxxx"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_URL</string>`<br>&emsp;&emsp;`<string>xxxx</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Considerations

* To test PSE bank transfers in the PayU Sandbox environment, see the [PSE Test Guide (PDF)](/assets/pse-test-guide-v5.pdf).
* All the payment process values must be formatted in thousands (i.e., 1,200.00 or 1,200) without exception.
* If the payment request is successful, the transaction has state `PENDING` and responseCode `PENDING_TRANSACTION_CONFIRMATION`; this is because the payer is redirected to the selected bank to complete the payment; you must redirect the payer to the URL returned in the extra parameter `BANK_URL`.
* The URL returned in the extra parameter `BANK_URL` is configured in the PayU Module and must show the following information:<br><br>![PrintScreen](/assets/Payments/PSEresponse-en.png)<br>Parameters starting with $ symbol are sent via `GET`.
* Once the client clicks the Pay button, this must be disabled to avoid sending a new request over the same payment.
* It is recommended to display a wait message while your customer is redirected.
* Do not show the bank site in containers (frames, panel, iframes, etc). The payment process must be fluid. Furthermore, avoid opening the bank site in a new tab nor a new browser window. If you need to use a new tab or window, block the origin page to avoid sending a new request over the same payment.
* You must add in the response page the options to retry the payment, finish the transaction and print the receipt.
* The status displayed in the response page can be any of the following:

| polTransactionState | polResponseCode | State |
|-|-|-|
| 4 | 1 | Approved transaction |
| 6 | 5 | Failed transaction |
| 6 | 4 | Rejected transaction |
| 12 or 14 | 9994 or 25 | Pending transaction, please check if the debit was made in the bank. |

### API Call {#api-call-3}

The following are the bodies of the request and response of this payment method.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request Example:
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
         "accountId": "512321",
         "referenceCode": "PRODUCT_TEST_2021-06-23T19:59:43.229Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "1d6c33aed575c4974ad5c0be7c6a1c87",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 65000,
               "currency": "COP"
         },
            "TX_TAX": {
               "value": 10378,
               "currency": "COP"
         },
            "TX_TAX_RETURN_BASE": {
               "value": 54622,
               "currency": "COP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Cr 23 No. 53-50",
               "street2": "5555487",
               "city": "Bogotá",
               "state": "Bogotá D.C.",
               "country": "CO",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "5555487",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
            "postalCode": "0000000",
            "phone": "7563126"
         }
      },
      "payer": {
         "merchantPayerId": "1",
         "fullName": "First name and second payer name",
         "emailAddress": "payer_test@test.com",
         "contactPhone": "7563126",
         "dniNumber": "5415668464654",
         "billingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "125544",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "extraParameters": {
         "RESPONSE_URL": "http://www.payu.com/response",
         "PSE_REFERENCE1": "127.0.0.1",
         "FINANCIAL_INSTITUTION_CODE": "1022",
         "USER_TYPE": "N",
         "PSE_REFERENCE2": "CC",
         "PSE_REFERENCE3": "123456789"
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "PSE",
      "paymentCountry": "CO",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": false
}
```
<br>

Response Example:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400449959,
        "transactionId": "4d49e544-e23f-474e-92b1-59357e0e85e8",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "2204682",
        "authorizationCode": null,
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624471332753,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "TRANSACTION_CYCLE": "1",
            "BANK_URL": "https://sandbox.api.payulatam.com/payments-api/pse-caller?enc=aHR0cHM6Ly9yZWdpc3Ryby5kZXNhcnJvbGxvLnBzZS5jb20uY28vUFNFVXNlclJlZ2lzdGVyL1N0YXJ0VHJhbnNhY3Rpb24uYXNweD9lbmM9dG5QY0pITUtsU25tUnBITThmQWJ1NHVWTmt6YW92Q0tWR2g0b0IxbEpkOXNEeGlSU2E5cXl1Uk5TUW5mbkxSdiMjcGF5ZXJfdGVzdEB0ZXN0LmNvbSMjMTIzNDU2Nzg5IyNDQw=="
        },
        "additionalInfo": {
            "paymentNetwork": "PSE",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": null,
            "transactionType": "AUTHORIZATION_AND_CAPTURE"
        }
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request Example:
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
         <accountId>512321</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-23T19:59:43.229Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>1d6c33aed575c4974ad5c0be7c6a1c87</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>65000</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX</string>
               <additionalValue>
                  <value>10378</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX_RETURN_BASE</string>
               <additionalValue>
                  <value>54622</value>
                  <currency>COP</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>123456789</dniNumber>
            <shippingAddress>
               <street1>Cr 23 No. 53-50</street1>
               <street2>5555487</street2>
               <city>Bogotá</city>
               <state>Bogotá D.C.</state>
               <country>CO</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
            <postalCode>0000000</postalCode>
            <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <merchantPayerId>1</merchantPayerId>
         <fullName>First name and second payer name</fullName>
         <emailAddress>payer_test@test.com</emailAddress>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <billingAddress>
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <extraParameters>
         <entry>
            <string>RESPONSE_URL</string>
            <string>http://www.payu.com/response</string>
         </entry>
         <entry>
            <string>PSE_REFERENCE1</string>
            <string>127.0.0.1</string>
         </entry>
         <entry>
            <string>FINANCIAL_INSTITUTION_CODE</string>
            <string>1022</string>
         </entry>
         <entry>
            <string>USER_TYPE</string>
            <string>N</string>
         </entry>
         <entry>
            <string>PSE_REFERENCE2</string>
            <string>CC</string>
         </entry>
         <entry>
            <string>PSE_REFERENCE3</string>
            <string>123456789</string>
         </entry>
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>PSE</paymentMethod>
      <paymentCountry>CO</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Response Example:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400449974</orderId>
        <transactionId>6c99b11b-fe6f-4270-8c9a-dfc35b7c7e34</transactionId>
        <state>PENDING</state>
        <trazabilityCode>2204695</trazabilityCode>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <operationDate>2021-06-23T13:12:14</operationDate>
        <extraParameters>
            <entry>
                <string>TRANSACTION_CYCLE</string>
                <string>1</string>
            </entry>
            <entry>
                <string>BANK_URL</string>
                <string>https://sandbox.api.payulatam.com/payments-api/pse-caller?enc=aHR0cHM6Ly9yZWdpc3Ryby5kZXNhcnJvbGxvLnBzZS5jb20uY28vUFNFVXNlclJlZ2lzdGVyL1N0YXJ0VHJhbnNhY3Rpb24uYXNweD9lbmM9dG5QY0pITUtsU25tUnBITThmQWJ1NHVWTmt6YW92Q0tWR2g0b0IxbEpkJTJmSGhQT0oyU2t4UnRmOEdLTk5tcGNYIyNwYXllcl90ZXN0QHRlc3QuY29tIyMxMjM0NTY3ODkjI0ND</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>PSE</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Submit Transactions Using Bancolombia Button {#submit-transactions-using-bancolombia-button}

The Bancolombia Payments Button is an online payment solution that allows users to perform transactions quickly and securely through their Bancolombia account. This tool is available to millions of users and enables payments to be completed directly from the merchant's website, redirecting the user to a secure platform provided by the bank.

### Benefits of the Bancolombia Button

In addition to being a convenient option for users, the Bancolombia Payments Button represents an innovative alternative for merchants. By integrating this option into your payment platform through PayU, your business can gain the following benefits:

* **Increased sales:** Reach more customers who prefer digital payment methods supported by Bancolombia, contributing to a higher number of completed transactions and improved customer retention.

* **Greater convenience:** Offer a fast and versatile payment experience, allowing users to make payments directly from their bank account without needing physical cards or cash.

* **Enhanced security:** Enable transactions protected by Bancolombia's advanced security systems, one of Colombia's most trusted financial institutions.

Integrating the Bancolombia Payments Button not only improves the shopping experience for your customers but also strengthens your business with a payment method aligned with local market preferences.

### Payment Process with the Bancolombia Button

The payment process is designed to be simple and secure. Follow these steps to complete a transaction:

1. Select the payment method at checkout.

<img src="/assets/Payments/en_botonbancolombia_1.png" alt="PrintScreen" width="650">
<p></p>

2. Accept the terms and conditions and click **_Pay_**.

<img src="/assets/Payments/en_botonbancolombia_2.png" alt="PrintScreen" width="650">
<p></p>

3. The integration will redirect you to Bancolombia's transactional site to complete the payment.

### Parameters for Request and Response {#parameters-for-request-and-response-4}

This API allows managing purchase intentions, obtaining a unique transfer code, and generating the payment experience. The integration needs to consume a REST service from the bank using a **Client Secret** and a **Client ID**, which will be provided to the user via confidential email.

<details>
<summary>Request</summary>
<div class="variables"></div>

| **Field** | **Definition** | **Type** | **Max Length** | **Example** | **Remarks** |
|-|-|-|-|-|-|
| commerceTransferButtonId | Unique identifier of the transfer button. | String | 50 | `"h4ShG3NER1C"` | Provided during the linking process. |
| transferReference | Unique code assigned by the merchant to identify the transaction. | String | 48 | `"reference0123"` | Defined by the merchant. |
| transferDescription | Description of the transfer, associated with the product, service, or invoice. | String | 225 | `"Online purchase"` | |
| transferAmount | Total amount of the transaction to be debited from the paying customer. | Double | 15 | `23450.33` | In testing, the maximum amount is $1,000,000 COP and the minimum is $1,000 COP. |
| commerceUrl | Redirection URL for the customer after completing the transfer. | String | 225 | `"https://gateway.com/payment/route?commerce=onlinepurchase"` | |
| confirmationURL | Confirmation URL used to notify the merchant of the transaction completion. | String | 500 | `"https://espagos-api-dev.cloud.net/callback"` | This functionality is mandatory. |

</details>

### API Call {#api-call-4}

Below are the request and response bodies for this payment method.

Request Example:
```JSON
{
  "data": [
    {
      "commerceTransferButtonId": "h4ShG3NER1C",
      "transferReference": "1002348899557697899",
      "transferDescription": "Online purchase",
      "transferAmount": 3458.33,
      "commerceUrl": "https://gateway.com/payment/route?commerce=onlinepurchase",
      "confirmationURL": "https://espagos-api-dev.cloud.net/callback"
    }
  ]
}
```
<br>

Example of a Response:
```JSON
{
  "meta": {
    "messageId": "269d2d0f-6c87-4515-87f7-e3f11ca976d6",
    "_version": "1.0",
    "_requestDate": "2020-10-19T00:00:24.422Z",
    "_clientRequest": "29fa65a1-0227-40cd-9efc-6beaff247614"
  },
  "data": [
    {
      "header": {
        "type": "Transference",
        "id": "_24iReQwXEI"
      },
      "transferCode": "_24iReQwXEI",
      "redirectURL": "https://sandbox-boton-dev.apps.ambientescb.com/web/transfer-gateway/checkout/_24iReQwXEI"
    }
  ]
}
```

### Technical Conditions

* **Conditions for the `transferReference` field:**
Must have a maximum of 48 numeric characters and must not include special characters.

* **Callback service exposure:**
Implementing the callback is mandatory to receive real-time notifications about the final status of the transaction. The notification URL must be provided by the beneficiary user and will be used to send the final transaction status. The system will attempt up to 3 notifications, with 30-second intervals between each attempt.

#### Callback Response Structure

<details>
<summary>Response</summary>
<div class="variables"></div>

| **Field** | **Definition** | **Type** | **Max. Length** | **Example** |
|-|-|-|-|-|
| transferVoucher | Transaction voucher number. | String | 50 | `"TRGQx8jMgCEG"` |
| transferAmount | Total transaction amount. | Double | 15 | `1000.00` |
| transferStateDescription  | Description of the transaction status result. | String | 225 | `"Invalid account"` |
| sign | Signature used to validate the integrity of the generated request. | String | 128 | `"b6f7bc914b69824df799db0ad7c9bb26"` |
| requestDate | Date and time the order was registered. | DateTime | 23 | `"2020-11-25T09:14:22.697-0500"` |
| transferState | Current transaction status. | String | 20 | `"rejected"`, `"approved"`, `"pending"`    |
| transferDate | Date and time the transaction was approved or rejected. | DateTime | 20 | `"2020-11-10T08:04:54.0000500"` |
| transferCode | Unique identifier of the transfer. | String | 50 | `"_oXsTE8kNo9"` |
| transferReference | Transaction reference code assigned by the merchant. | String | 48 | `"Reference05013418"` |
| commerceTransferButtonId  | Unique identifier of the merchant's transfer button (HASH). | String | 50 | `"h4ShG3NER1C"` |

</details>
<br>

Example of a Response:
```JSON
{
  "data": {
    "commerceTransferButtonId": "hA5hg3NER1c",
    "transferReference": "test201123",
    "transferDescription": "Online purchase",
    "transferAmount": 23458.33,
    "commerceUrl": "https://www.commerce.com",
    "confirmationURL": "https://pagos-api-dev.cloud.net/callback"
  }
}
```

### Technical Conditions for Callback Usage

* **API key for callback:**
Notifications must be authenticated using an API Key, previously provided by the bank.

* **Service exposure:**
The merchant must expose a service capable of receiving the structure described in the callback response.

## Submit Transactions Using Google Pay {#submit-transactions-using-google-pay}

Google Pay is a digital wallet that enables simple and fast card payments, without the need of entering the card data for each payment. The card data is safely stored by Google. This payment method is available for all devices (mobile phones and computers), no matter the operating system and in almost all web browsers.

In case of using Google Pay, the merchants must adhere to the Google Pay APIs [Acceptable Use Policy](https://payments.developers.google.com/terms/aup) and accept the terms that [Google Pay API Terms of Service](https://payments.developers.google.com/terms/sellertos) defines.

{{% alert title="Note" color="info"%}}

The description below applies to provision of this service directly by displaying the Google Pay lightbox at the website of the payment recipient (e-store).

{{% /alert %}}

If you wish to offer this method via PayU Web-Checkout, no additional integration effort is required. Contact your Key Account Manager to make the activation request. If you wish to test the payment method prior to activation, you can follow the instructions [here](#testing-for-merchants-with-web-checkout-integration).

Please note that if your integration with PayU is API, you must change the settings described in this section to process Google Pay transactions: 

* [Perform API integration of the payment method](#api-integration-of-the-payment-method)
* [Test the payment method](#test-the-payment-method)

 ### API Integration of the Payment Method

To integrate the website with the Google Pay wallet, proceed according to the instructions placed at these websites:
* [API documentation](https://developers.google.com/pay/api/web)
* [API integration checklist](https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist)
* [Brand guidelines](https://developers.google.com/pay/api/web/guides/brand-guidelines)

##### PayU Definitions for the API Integration of the Payment Method

Below you will find relevant information that you must consider for your payments to be processed by PayU once the payment method is integrated:

* ###### Request a Payment Token for PayU

Google encrypts the information of the card selected by the payer for secure processing, this is carried out by a payment provider. The ```gateway``` parameter in the script should have the constant value of ```payulatam```, and the ```gatewayMerchantId``` should include your PayU account number according to the example below:

```
const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    'gateway': 'payulatam',
    'gatewayMerchantId': 'YOUR_ACCOUNT_ID '
  }
};
```

* ###### Supported Payment Networks

PayU processes Google Pay payments for Mastercard and Visa cards. To configure your Google script, use these settings:

```
const allowedCardNetworks = ["MASTERCARD", "VISA", "ELECTRON", "MAESTRO"];
const allowedCardAuthMethods = ["PAN_ONLY"];
```

{{% alert title="Note" color="info"%}}

The availability of payment methods depends on your PayU settings.

{{% /alert %}}

Google will return a `PaymentData` object, and the `paymentMethodData.tokenizationData.token` field will contain a securely encrypted Google Pay Token (a string).

Below, a sample of a Google Pay Token:

```
{
  "protocolVersion":"ECv2",
  "signature":"MEUCIG39tbaQPwJe28U+UMsJmxUBUWSkwlOv9Ibohacer+CoAiEA8Wuq3lLUCwLQ06D2kErxaMg3b/oLDFbd2gcFze1zDqU\u003d",
  "intermediateSigningKey":{
    "signedKey": "{\"keyExpiration\":\"1542394027316\",\"keyValue\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE/1+3HBVSbdv+j7NaArdgMyoSAM43yRydzqdg1TxodSzA96Dj4Mc1EiKroxxunavVIvdxGnJeFViTzFvzFRxyCw\\u003d\\u003d\"}",
    "signatures": ["MEYCIQDcXCoB4fYJF3EolxrE2zB+7THZCfKA7cWxSztKceXTCgIhAN/d5eBgx/1A6qKBdH0IS7/aQ7dO4MuEt26OrLCUxZnl"]
  },
  "signedMessage":"{\"tag\":\"TjkIKzIOvCrFvjf7/aeeL8/FZJ3tigaNnerag68hIaw\\u003d\",\"ephemeralPublicKey\":\"BLJoTmxP2z7M2N6JmaN786aJcT/L/OJfuJKQdIXcceuBBZ00sf5nm2+snxAJxeJ4HYFTdNH4MOJrH58GNDJ9lJw\\u003d\",\"encryptedMessage\":\"mleAf23XkKjj\"}"
}
```

 ### Process Google Pay Transactions in PayU

 The primary function of Google Pay as a digital wallet is to store credit cards to facilitate payment processing. With that in mind, for PayU, the transactions processed by Google Pay will have the same credit card logic except for the following particularities:

* If you are processing transactions of your customers with Google Pay, you should configure the information of the wallet in the parameter ```transaction.digitalWallet```.
* Inside the parameter ```transaction.digitalWallet``` use ```GOOGLE_PAY``` in the field ```transaction.digitalWallet.type``` and send the Google Pay Token in the field ```transaction.digitalWallet.message```. 
* Take into account that for Google Pay transactions inside the parameter ```transaction.creditcard```, you should always send a value for ```transaction.creditcard.name```. Other fields of this parameter are not necessary since Google Pay delivers them inside the token. 
* Contact your account manager to make the necessary activations to process without cvv as this payment method requires it.

### Test the Payment Method

This section is designed to guide users through the testing process and familiarization with the Google Pay payment method in PayU.  

**Prerequisites (for API and Web Checkout integrations):**
* Make sure you are logged in your browser with the Gmail account with which you will be testing. 
* Join the Google group in which the test cards for PayU will be available. The group can be found in the following [Google documentation](https://developers.google.com/pay/api/android/guides/resources/test-card-suite).

#### Testing for Merchants with API Integration:

1. Once the changes indicated in the previous sections have been made, use the Token Simulator File to simulate a transaction and obtain a sample of a Google Pay Token. The simulator can be visualized <a href="https://developers.payulatam.com/latam/en/docs/integrations/api-integration/simulator.html" target="_blank">here</a>.

{{% alert title="Note" color="info"%}}

To ensure correct processing, use cards whose name do NOT start with "Test".

{{% /alert %}}

2. Use the information on the sample of the Google Pay Token to fill out the PayU Request. Send it to PayU to get proof of an approved transaction. If you have results that are not approved, please review the documentation from the steps above.

<video width="630" height="300" controls>
    <source src="/assets/GooglePay/API.mp4" type="video/mp4">
</video>

#### Testing for Merchants with Web Checkout Integration:  

Access PayU Latam Web Checkout in a [test environment](https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/test/prueba_pago.jsp) and simulate a transaction. 

{{% alert title="Note" color="info"%}}

* To ensure correct processing, use cards whose name do NOT start with "Test".
* Use the Colombia test credentials for this test. Consult them [here](https://developers.payulatam.com/latam/en/docs/getting-started/test-your-solution.html).

{{% /alert %}}

<video width="630" height="300" controls>
    <source src="/assets/GooglePay/Colombia_WebCheckout.mp4" type="video/mp4">    
</video>

#### API Call {#api-call-5}

The following are the bodies of the request and response of this payment method.

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request Example:
```JSON
{
    "language": "es",
    "command": "SUBMIT_TRANSACTION",
    "merchant": {
        "apiKey": "012345678901",
        "apiLogin": "012345678901"
    },
    "transaction": {
        "order": {
            "accountId": "9",
            "language": "es",
            "description" : "test",
            "signature": "{{payu_signature}}",
            "referenceCode": "{{payu_ref_code}}",
            "additionalValues": {
                "TX_VALUE": {
                    "value": 100,
                    "currency": "ARS"
                }
            }
        },
        "payer": {
            "merchantPayerId": "1",
            "fullName": "First name and second payer name",
            "emailAddress": "payer.name@payu.com",
            "contactPhone": "7563126",
            "dniNumber": "5415668464654",
            "dniType": null
        },
        "creditCard": {
            "name": "Kevin Pelaez"
        },
        "digitalWallet": {
            "type" : "GOOGLE_PAY",
            "message" : "{\"signature\":\"MEUCIQCSsfd63AcUEjNRnpgqEm/B6cm8Fna1ty+HatD4Hqp/bgIgHCtrwKhvO1e5K3vDfE6FxqSaRkP9PHuY63aQ35gV5lk\\u003d\",\"intermediateSigningKey\":{\"signedKey\":\"{\\\"keyValue\\\":\\\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAExtzNORa//EJphgvdpUTsDElAg26mYXxNqs8/UX7DDSDCojJ/2+GCf8CVmClyRM+bukNsYM82pwkjZqOe5AOxUg\\\\u003d\\\\u003d\\\",\\\"keyExpiration\\\":\\\"1695147545256\\\"}\",\"signatures\":[\"MEQCIAxxj2BnQzTyTXLzjJ08JG+s1qdmX1XlOxzFmq1THTJ4AiAe7anOO7l+KZ1nkbGBufXBuQGInFMGR70+I33EyCL5GQ\\u003d\\u003d\"]},\"protocolVersion\":\"ECv2\",\"signedMessage\":\"{\\\"encryptedMessage\\\":\\\"GNKqqZ7bx6btPTkZPjpvi1IHKS79JrdtOI3bRZA6G5936ofXqD/m3f/YpuF4mlADkHIhmBYVq6hzyA0B4M1cjht7BFsQhE5fqA+6PgbPY6eAqaH4PPQGt/3VM9uVxmtcJK6k2JL8N7CCF85vx6s+LASH4wwO3Sk2NIlPB0B2QHdfdrOpwo5r6T3xYJAq6wHqFNrdOLq5NTodDqEaXP3y/kB1eIMrwcz5cPGJAPSmL2RebBofsl5QFJdVUmeXXSS7nQ4aeQpuqCcoI/NqLb5r3bEaq33pbglfv2YyyHK1ERlET3TsTR+rGBcJXv9JLh2ZhdoUJYDkDqP+f+65Fn3/xRppfXbwNCrCnO+DvVsgZTFp7cj69WA6uWBeYM4HejKa1BUpt8TfP132FjaUSnwSlykkJhHK5svQFxf2rpJGFdmz4d06iLREy/N+27pyE9eJeJohO2JJXaVTQgICmVNvGefR4KaNELpxeNAzuhKQsTZBYQY179zveNg4EQqai3CxKIr09G/MwpMufTWEBm2rsk6HqTh1Qz+d72aph3U3bRQVhFj3ZE2ZsIXIc7dwCLGV\\\",\\\"ephemeralPublicKey\\\":\\\"BNgz4XETGJgixJYrYHLXjQrRaZ9i2q2Z2uGTOFNuVY5ZiCFiSJeiP0l+dt+Y0r8I29l5F2Lwd+e8torE3vSMm9g\\\\u003d\\\",\\\"tag\\\":\\\"NUJPbcTwbfWBC3ByHzcwQz/bEsbt80vh1ahXoRY4xAQ\\\\u003d\\\"}\"}"
        },
        "extraParameters": {
            "INSTALLMENTS_NUMBER": 1
        },
        "type": "AUTHORIZATION_AND_CAPTURE",
        "paymentMethod": "MASTERCARD",
        "paymentCountry": "BR"
    },
    "test": false
}
```
<br>

Response Example:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400437001,
        "transactionId": "f0f8c441-43e8-490a-b4f2-c14d2c403175",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "6",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "282856",
        "authorizationCode": "MOCK-CIELO-1624047897817",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624029898077,
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

Request Example:
```XML
<request>
        <language>es</language>
     <command>SUBMIT_TRANSACTION</command>
     <merchant>
         <apiKey>012345678901</apiKey>
         <apiLogin>012345678901</apiLogin>
     </merchant>
     <transaction>
         <order>
             <accountId>9</accountId>
             <language>es</language>
             <description>test</description>
             <signature>{{payu_signature}}</signature>
             <referenceCode>{{payu_ref_code}}</referenceCode>
             <additionalValues>
                 <TX_VALUE>
                     <value>100</value>
                     <currency>ARS</currency>
                 </TX_VALUE>
             </additionalValues>
         </order>
         <payer>
             <merchantPayerId>1</merchantPayerId>
             <fullName>First name and second payer name</fullName>
             <emailAddress>payer.name@payu.com</emailAddress>
             <contactPhone>7563126</contactPhone>
             <dniNumber>5415668464654</dniNumber>
             <dniType></dniType>
         </payer>
         <creditCard>
             <name>Kevin Pelaez</name>
         </creditCard>
         <digitalWallet>
             <type>GOOGLE_PAY</type>
             <message>{"signature":"MEUCIQCSsfd63AcUEjNRnpgqEm/B6cm8Fna1ty+HatD4Hqp/bgIgHCtrwKhvO1e5K3vDfE6FxqSaRkP9PHuY63aQ35gV5lk\u003d","intermediateSigningKey":{"signedKey":"{\"keyValue\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAExtzNORa//EJphgvdpUTsDElAg26mYXxNqs8/UX7DDSDCojJ/2+GCf8CVmClyRM+bukNsYM82pwkjZqOe5AOxUg\\u003d\\u003d\",\"keyExpiration\":\"1695147545256\"}","signatures":["MEQCIAxxj2BnQzTyTXLzjJ08JG+s1qdmX1XlOxzFmq1THTJ4AiAe7anOO7l+KZ1nkbGBufXBuQGInFMGR70+I33EyCL5GQ\u003d\u003d"]},"protocolVersion":"ECv2","signedMessage":"{\"encryptedMessage\":\"GNKqqZ7bx6btPTkZPjpvi1IHKS79JrdtOI3bRZA6G5936ofXqD/m3f/YpuF4mlADkHIhmBYVq6hzyA0B4M1cjht7BFsQhE5fqA+6PgbPY6eAqaH4PPQGt/3VM9uVxmtcJK6k2JL8N7CCF85vx6s+LASH4wwO3Sk2NIlPB0B2QHdfdrOpwo5r6T3xYJAq6wHqFNrdOLq5NTodDqEaXP3y/kB1eIMrwcz5cPGJAPSmL2RebBofsl5QFJdVUmeXXSS7nQ4aeQpuqCcoI/NqLb5r3bEaq33pbglfv2YyyHK1ERlET3TsTR+rGBcJXv9JLh2ZhdoUJYDkDqP+f+65Fn3/xRppfXbwNCrCnO+DvVsgZTFp7cj69WA6uWBeYM4HejKa1BUpt8TfP132FjaUSnwSlykkJhHK5svQFxf2rpJGFdmz4d06iLREy/N+27pyE9eJeJohO2JJXaVTQgICmVNvGefR4KaNELpxeNAzuhKQsTZBYQY179zveNg4EQqai3CxKIr09G/MwpMufTWEBm2rsk6HqTh1Qz+d72aph3U3bRQVhFj3ZE2ZsIXIc7dwCLGV\",\"ephemeralPublicKey\":\"BNgz4XETGJgixJYrYHLXjQrRaZ9i2q2Z2uGTOFNuVY5ZiCFiSJeiP0l+dt+Y0r8I29l5F2Lwd+e8torE3vSMm9g\\u003d\",\"tag\":\"NUJPbcTwbfWBC3ByHzcwQz/bEsbt80vh1ahXoRY4xAQ\\u003d\"}"}</message>
         </digitalWallet>
         <extraParameters>
             <INSTALLMENTS_NUMBER>1</INSTALLMENTS_NUMBER>
         </extraParameters>
         <type>AUTHORIZATION_AND_CAPTURE</type>
         <paymentMethod>MASTERCARD</paymentMethod>
         <paymentCountry>BR</paymentCountry>
     </transaction>
     <test>false</test>
</request>
```
<br>

Response Example:
```XML
<paymentResponse>
         <code>SUCCESS</code>
     <error></error>
     <transactionResponse>
         <orderId>1400437001</orderId>
         <transactionId>f0f8c441-43e8-490a-b4f2-c14d2c403175</transactionId>
         <state>APPROVED</state>
         <paymentNetworkResponseCode>6</paymentNetworkResponseCode>
         <paymentNetworkResponseErrorMessage></paymentNetworkResponseErrorMessage>
         <trazabilityCode>282856</trazabilityCode>
         <authorizationCode>MOCK-CIELO-1624047897817</authorizationCode>
         <pendingReason></pendingReason>
         <responseCode>APPROVED</responseCode>
         <errorCode></errorCode>
         <responseMessage></responseMessage>
         <transactionDate></transactionDate>
         <transactionTime></transactionTime>
         <operationDate>1624029898077</operationDate>
         <referenceQuestionnaire></referenceQuestionnaire>
         <extraParameters>
             <BANK_REFERENCED_CODE>CREDIT</BANK_REFERENCED_CODE>
             <CIELO_TID>1006993069000509C28A</CIELO_TID>
         </extraParameters>
         <additionalInfo></additionalInfo>
     </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

<br>

You will find the description of the `transaction.digitalWallet` object and its fields in the section [Parameters](https://developers.payulatam.com/latam/en/docs/integrations/api-integration/payments-api-colombia.html#parameters-for-request-and-response).

## Process Payments as an Airline or Travel Agency

This section is designed to facilitate the integration of PayU services specifically tailored to the needs of airlines and travel agencies in Colombia.

### Considerations:

* Available exclusively in Colombia for transactions in COP currency.
* Enables payment processing through the TSP/Gateway model.
* Requires IATA codes registration with the acquirers.
* Supports credit or debit card payments, including AMEX, DINERS, MASTERCARD, and VISA.
* Supports funds dispersion, allowing travel agencies and airlines to receive their payments within the same transaction.
* Requires one-step processing: the system transfers the funds from the customer’s account to your acquiring bank as soon as payment is authorized.

### Integration Considerations:
This integration enables airlines and travel agencies in Colombia to streamline payment processes, providing essential information with each transaction to support accurate identification and distribution of funds. Additionally, submitting specific transaction details may qualify them for a 4 x 1000 tax exemption (confirm with your acquirer bank).

**Steps for Integration:** 

1. Retrieve the list of available airlines.
2. Submit the transaction through the PayU Payments API.
3. Include Passenger Name Record (PNR) information (optional).

| **Feature** | **Airlines** | **Travel Agencies** |
|-|-|-|
| **Fee Inclusion** | Airlines can submit their airline ID, along with airport fares and other associated taxes. | Travel agencies can submit their transaction fees along with airline fees, airport fares, administrative fees, and other charges. |
| **Identification** | Acquirers can identify the airline specifically through the airline ID for targeted distribution. | Enables the acquirer to identify both the travel agency and the airline for accurate funds distribution. |
| **4 x 1000 Tax Exemption Eligibility** | Colombian airlines may qualify if they provide their airline ID and relevant fee information. | Colombian travel agencies may qualify if they provide comprehensive transaction details.|

{{% alert title="Note" color="info"%}}

Check with your acquiring bank whether your business meets the requirements for the 4 x 1000 tax exemption. Eligibility depends on the information provided in each transaction and current regulations.

{{% /alert %}}

### Retrieve the List of Available Airlines

To integrate with PayU, both travel agencies and airlines need to retrieve the airline codes eligible for payment collection and send them through the Payments API. This can be done by querying the PayU system to obtain the list of available airlines and their respective codes. The endpoint for retrieving airline codes is the same for both types of merchants, though the specific use may differ:
  
- **Airlines**:
  - Airlines retrieve and submit their own codes to enable accurate identification and potential tax benefits.
  - By providing the airline code, they ensure streamlined transactions for their fees and associated charges.

- **Travel Agencies**:
  - Agencies retrieve the airline code associated with each payment to ensure correct allocation of fees and taxes.
  - This integration helps identify the airline involved in the transaction for proper funds distribution.  

To retrieve the list, use the following endpoints based on your environment:

- **Sandbox**: `https://sandbox.api.payulatam.com/payments-api/rest/v4.3/payments/airline`
- **Production**: `https://api.payulatam.com/payments-api/rest/v4.3/payments/airline`

| **Query Parameter** | **Description** |
|-|-|
| `accountID` | Id code that PayU Latam assigned to the account. |

| **Header Parameter** | **Description** |
|-|-|
| `Authorization` | Authentication header value for performing a valid get request. |

Example of JavaScript code to generate the authentication header:

```javascript
var contentToSign = "pRRXKOl8ikMmt9u" + ":" + "4Vj8eK4rloUd272L48hsrarnUA";
var base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(contentToSign));
var authenticationHeader = "Basic " + base64.toString();
```

{{% alert title="Note" color="info"%}}

While it’s unlikely that airline codes will change, there is still a chance. We recommend using the query to store your airline code for use in payments with our Payments API.

{{% /alert %}}

| Query parameter | Description |
|-|-|
| airlines | Array of airlines. | 
| airlines > code | Airline code. |
| airlines > description | Airline description. |

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Response Example:
```JSON
{
  "airlines": [
    {
      "code": "81",
      "description": "AVIA MARKETING LTDA NAL Nacional"
    },
    .
    .
    .
    {
      "code": "65",
      "description": "OCEANAIR LINHAS AEREAS S.A Nacional"
    }
  ]
}
```
<br>

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Response Example:
```XML
<com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlinesListResponse>
 <airlines>
 <com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 <code>80</code>
 <description>AVIATUR S.A. BOG Internacional</description>
 </com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 .
 .
 .
 <com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 <code>87</code>
 <description>LAN AIRLINES Nacional</description>
 </com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 </airlines>
</com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlinesListResponse>
```

{{< /tab >}}

{{< /tabs >}}

### Submit Transactions as an Airline

To complete a successful transaction request, you must include the specific parameters for airlines in addition to the standard parameters for [credit card payments]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}). Optionally, you can also include [PNR data]({{< ref "Payments-API-Colombia.md#include-passenger-name-record-information-optional" >}}). Use the airline code retrieved from the previous endpoint and include any applicable airport fees and taxes.

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| **Field** | **Type** | **Size** | **Description** | **Example** |
|-|-|-|-|-|
| transaction > order > airlineCode | Alphanumeric | 4 | Airline code. | 29 |
| transaction > order > additionalValues > TX_VALUE > value | Number | 12.2 | Total transaction amount. Can contain up to two decimal places. | 119000 |
| transaction > order > additionalValues > TX_TAX > value | Number | 12.2 | VAT value. If unspecified, the system applies a 19% rate by default in Colombia. Use 0 for VAT-exempt items. | 19000 |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Number | 12.2 | Base value for VAT calculation. Set to 0 if the product or service is VAT-exempt. | 100000 |
| transaction > order > additionalValues > TX_ADDITIONAL_VALUE > value | Number | 12.2 | Airport fares and other applicable taxes. | 25000 |

</details>

#### API Call {#api-call-6}

The following are examples of the request for this method.

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request Example:
```JSON
{
  ...
  "transaction": {
    "order": {
      ...
      "airlineCode": "29",
      "additionalValues": {
        "TX_VALUE": {
          "value": 119000,
          "currency": "COP"
        },
        "TX_TAX": {
          "value": 19000,
          "currency": "COP"
        },
        "TX_TAX_RETURN_BASE": {
          "value": 100000,
          "currency": "COP"
        },
        "TX_ADDITIONAL_VALUE": {
          "value": 25000,
          "currency": "COP"
        }
      }
    },
    "creditCard": {
      ...
    },
    "extraParameters": {
      ...
    },
    "pnr": {
      ...
    }
  }
}
```
<br>

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request Example:
```XML
<request>
  ...
  <transaction>
    <order>
      ...
      <airlineCode>29</airlineCode>
      <additionalValues>
        <entry>
          <string>TX_VALUE</string>
          <additionalValue>
            <value>119000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX</string>
          <additionalValue>
            <value>19000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX_RETURN_BASE</string>
          <additionalValue>
            <value>100000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_ADDITIONAL_VALUE</string>
          <additionalValue>
            <value>25000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
      </additionalValues>
    </order>
    <payer>
      ...
    </payer>
    <creditCard>
      ...
    </creditCard>
    <extraParameters>
      ...
    </extraParameters>
    ...
    <pnr>
      ...
    </pnr>
  </transaction>
</request>
```

{{< /tab >}}

{{< /tabs >}}

### Submit Transactions as a Travel Agency

To complete a successful transaction request, you must include the specific parameters for travel agencies in addition to the standard parameters for [credit card payments]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}). Optionally, you can also include [PNR data]({{< ref "Payments-API-Colombia.md#include-passenger-name-record-information-optional" >}}). Use the airline code retrieved from the previous endpoint and include any applicable airport fees and taxes.

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| **Field** | **Type** | **Size** | **Description** | **Example** |
|-|-|-|-|-|
| transaction > order > airlineCode | alphanumeric | 4 | Airline code. | 29 |
| transaction > order > additionalValues > TX_VALUE > value | number | 12.2 | Total amount of the transaction. It can contain two decimal digits (e.g., 10000.00 or 10000). | 119000 |
| transaction > order > additionalValues > TX_TAX > value | number | 12.2 | VAT value of the transaction. If not specified, the system automatically applies a 19% rate in Colombia. If VAT-exempt, set to 0. | 19000 |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | number | 12.2 | Base value to calculate the VAT. If VAT-exempt, assign 0 to this variable. | 100000 |
| transaction > order > additionalValues > TX_ADDITIONAL_VALUE > value | number | 12.2 | Airport fares and other taxes. | 25000 |
| transaction > order > additionalValues > TX_ADMINISTRATIVE_FEE > value | number | 12.2 | Amount of the travel agency administrative fee. | 5950 |
| transaction > order > additionalValues > TX_TAX_ADMINISTRATIVE_FEE > value | number | 12.2 | Amount of the travel agency administrative fee tax. | 950 |
| transaction > order > additionalValues > TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE > value | number | 12.2 | Base value to calculate the travel agency administrative fee tax. | 5000 |

</details>

#### API Call {#api-call-7}

The following are examples of the request for this method.

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request Example:
```JSON
{
  ...
  "transaction": {
    "order": {
      ...
      "airlineCode": "29",
      "additionalValues": {
        "TX_VALUE": {
          "value": 119000,
          "currency": "COP"
        },
        "TX_TAX": {
          "value": 19000,
          "currency": "COP"
        },
        "TX_TAX_RETURN_BASE": {
          "value": 100000,
          "currency": "COP"
        },
        "TX_ADDITIONAL_VALUE": {
          "value": 25000,
          "currency": "COP"
        },
        "TX_ADMINISTRATIVE_FEE": {
          "value": 5950,
          "currency": "COP"
        },
        "TX_TAX_ADMINISTRATIVE_FEE": {
          "value": 950,
          "currency": "COP"
        },
        "TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE": {
          "value": 5000,
          "currency": "COP"
        }
      }
    },
    "creditCard": {
      ...
    },
    "extraParameters": {
      ...
    },
    "pnr": {
      ...
    }
  }
}
```
<br>

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request Example:
```XML
<request>
  ...
  <transaction>
    <order>
      ...
      <airlineCode>29</airlineCode>
      <additionalValues>
        <entry>
          <string>TX_VALUE</string>
          <additionalValue>
            <value>119000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX</string>
          <additionalValue>
            <value>19000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX_RETURN_BASE</string>
          <additionalValue>
            <value>100000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_ADDITIONAL_VALUE</string>
          <additionalValue>
            <value>25000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_ADMINISTRATIVE_FEE</string>
          <additionalValue>
            <value>5950</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX_ADMINISTRATIVE_FEE</string>
          <additionalValue>
            <value>950</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE</string>
          <additionalValue>
            <value>5000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
      </additionalValues>
    </order>
    <payer>
      ...
    </payer>
    <creditCard>
      ...
    </creditCard>
    <extraParameters>
      ...
    </extraParameters>
    ...
    <pnr>
      ...
    </pnr>
  </transaction>
</request>
```

{{< /tab >}}

{{< /tabs >}}

### Include Passenger Name Record Information (Optional)

In addition to the previously provided transaction details, the API allows the inclusion of Passenger Name Record (PNR) data. This feature is particularly valuable when using PayU's anti-fraud tools to enhance transaction risk analysis tailored to your business activities.

The following parameters relate to PNR data and are optional. They are available in all Latin American countries where PayU operates. These fields are not sufficient on their own to complete a transaction request but are complementary for specific use cases.

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| **Field** | **Type** | **Size** | **Description** | **Example** |
|-|-|-|-|-|
| transaction > pnr > id | alphanumeric | 32 | Passenger Name Record ID. | `PNR123456` |
| transaction > pnr > reservationAgent > id | alphanumeric | 32 | Reservation agent ID. | `AGENT123` |
| transaction > pnr > reservationAgent > firstName | alphanumeric | 255 | Reservation agent's first name(s). | `John` |
| transaction > pnr > reservationAgent > lastName | alphanumeric   | 255 | Reservation agent's last name(s). | `Doe` |
| transaction > pnr > reservationAgent > email | alphanumeric | 255 | Reservation agent's email address. | `agent@example.com` |
| transaction > pnr > reservationAgent > officePhoneNumber | alphanumeric | 50 | Reservation agent's office phone number.| `+573001234567` |
| transaction > pnr > reservationOffice > id | alphanumeric | 9 | Reservation office ID.| `OFFICE123`|
| transaction > pnr > reservationOffice > country | alphanumeric | 2 | Reservation office country (ISO Code). | `CO` |
| transaction > pnr > saleOffice > id | alphanumeric | 9 | Sale office ID. | `SALEOFF123`                |
| transaction > pnr > saleOffice > country | alphanumeric | 2 | Sale office country (ISO Code). | `US` |
| transaction > pnr > passengers[] > id | alphanumeric | 32 | Passenger ID. | `PASS12345` |
| transaction > pnr > passengers[] > country | alphanumeric | 2 | Passenger country (ISO Code). | `AR`                        |
| transaction > pnr > passengers[] > level | alphanumeric | 32 | Passenger level. | `GOLD`                      |
| transaction > pnr > passengers[] > firstName | alphanumeric | 255 | Passenger first name(s). | `Maria`                     |
| transaction > pnr > passengers[] > lastName | alphanumeric | 255 | Passenger last name(s). | `Gonzalez` |
| transaction > pnr > passengers[] > documentType | number | 2 | Document type (see values below). | `5` |
| transaction > pnr > passengers[] > documentNumber | alphanumeric | 50 | Passenger document number. | `P12345678` |
| transaction > pnr > passengers[] > email | alphanumeric | 255 | Passenger email address. | `passenger@example.com` |
| transaction > pnr > passengers[] > officePhoneNumber | alphanumeric | 50 | Passenger office phone number. | `+573008765432`             |
| transaction > pnr > passengers[] > homePhoneNumber | alphanumeric | 50 | Passenger home phone number. | `+573002345678`             |
| transaction > pnr > passengers[] > mobilePhoneNumber | alphanumeric | 50 | Passenger mobile phone number. | `+573001234567` |
| transaction > pnr > passengers[] > address > country | alphanumeric | 2 | Passenger address country (ISO Code). | `BR` |
| transaction > pnr > passengers[] > address > city | alphanumeric | 65 | Passenger address city. | `São Paulo` |
| transaction > pnr > passengers[] > address > street | alphanumeric | 255 | Passenger street address. | `Rua das Flores, 123` |
| transaction > pnr > itinerary[] > departureDate | alphanumeric | 19 | Departure date in UTC format. | `2022-01-01T23:59:59` |
| transaction > pnr > itinerary[] > arrivalDate | alphanumeric | 19 | Arrival date in UTC format. | `2022-01-02T23:59:59` |
| transaction > pnr > itinerary[] > flightNumber | alphanumeric | 12 | Flight number. | `FL1234` |
| transaction > pnr > itinerary[] > origin | alphanumeric | 8 | Origin. | `BOG` |
| transaction > pnr > itinerary[] > destination | alphanumeric | 8 | Destination. | `MIA` |
| transaction > pnr > itinerary[] > travelClass | alphanumeric | 2 | Reservation segment class. | `Y` |
| transaction > pnr > itinerary[] > ticketType | alphanumeric | 50 | Ticket type. | `E-TICKET` |

</details>

{{% alert title="Note" color="info"%}}

When using XML format, itinerary parameters appear under `transaction > pnr > itinerary > segment` with the same structure but adjusted nesting.

{{% /alert %}}

#### API Call {#api-call-8}

The following are examples of the request for this method.

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request Example:
```JSON
{
  "transaction": {
    "order": {
      ...
    },
    "creditCard": {
      ...
    },
    "extraParameters": {
      ...
    },
    "pnr": {
      "id": "abc123",
      "reservationAgent": {
        "id": "def456",
        "firstName": "CO",
        "lastName": "CO",
        "email": "first.last@example.org",
        "officePhoneNumber": "123456789"
      },
      "reservationOffice": {
        "id": "ghi789",
        "country": "CO"
      },
      "saleOffice": {
        "id": "jkl012",
        "country": "CO"
      },
      "passengers": [
        {
          "id": "mno345",
          "country": "CO",
          "level": "1",
          "firstName": "Firts Name",
          "lastName": "Last Name",
          "documentType": 0,
          "documentNumber": "987654321",
          "email": "first.last@example.com",
          "officePhoneNumber": "234567891",
          "homePhoneNumber": "345678912",
          "mobilePhoneNumber": "456789123",
          "address": {
            "country": "CO",
            "city": "Bogota D.C.",
            "street": "Calle 1 # 2 - 3"
          }
        },
        {
          "id": "mno346",
          "country": "CO",
          "level": "1",
          "firstName": "Firts Name",
          "lastName": "Last Name",
          "documentType": 0,
          "documentNumber": "55545151515",
          "email": "first.last@example.com",
          "officePhoneNumber": "336259",
          "homePhoneNumber": "2156668",
          "mobilePhoneNumber": "3001234123",
          "address": {
            "country": "CO",
            "city": "Bogota D.C.",
            "street": "Calle 3 # 2 - 1"
          }
        }
      ],
      "itinerary": [
        {
          "departureDate": "2022-01-01T23:59:59",
          "arrivalDate": "2025-01-01T23:59:59",
          "flightNumber": "PQR345",
          "origin": "BOGOTA",
          "destination": "MADRID",
          "travelClass": "BU",
          "ticketType": "RT"
        },
        {
          "departureDate": "2022-01-01T23:59:59",
          "arrivalDate": "2025-01-01T23:59:59",
          "flightNumber": "ARF2525",
          "origin": "MADRID",
          "destination": "LONDRES",
          "travelClass": "EC",
          "ticketType": "RT"
        }
      ]
    }
  }
}


```
<br>

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request Example:
```XML
<request>
  ...
  <transaction>
    <order>
      ...
    </order>
    <payer>
      ...
    </payer>
    <creditCard>
      ...
    </creditCard>
    <extraParameters>
      ...
    </extraParameters>
    <pnr>
      <id>abc123</id>
      <reservationAgent>
        <id>def456</id>
        <firstName>First Name</firstName>
        <lastName>Last Name</lastName>
        <email>first.last@example.org</email>
        <officePhoneNumber>123456789</officePhoneNumber>
      </reservationAgent>
      <reservationOffice>
        <id>ghi789</id>
        <country>CO</country>
      </reservationOffice>
      <saleOffice>
        <id>jkl012</id>
        <country>CO</country>
      </saleOffice>
      <passengers>
        <!-- Passenger 1 -->
        <passenger>
          <id>mno345</id>
          <country>CO</country>
          <level>1</level>
          <firstName>First Name</firstName>
          <lastName>Last Name</lastName>
          <documentType>0</documentType>
          <documentNumber>987654321</documentNumber>
          <email>first.last@example.com</email>
          <officePhoneNumber>234567891</officePhoneNumber>
          <homePhoneNumber>345678912</homePhoneNumber>
          <mobilePhoneNumber>456789123</mobilePhoneNumber>
          <address>
            <country>CO</country>
            <city>Bogota D.C.</city>
            <street>Calle 1 # 2 - 3</street>
          </address>
        </passenger>
        <!-- Passenger 2 -->
        <passenger>
          <id>mno346</id>
          <country>CO</country>
          <level>1</level>
          <firstName>First Name</firstName>
          <lastName>Last Name</lastName>
          <documentType>0</documentType>
          <documentNumber>55545151515</documentNumber>
          <email>first.last@example.com</email>
          <officePhoneNumber>336259</officePhoneNumber>
          <homePhoneNumber>2156668</homePhoneNumber>
          <mobilePhoneNumber>3001234123</mobilePhoneNumber>
          <address>
            <country>CO</country>
            <city>Bogota D.C.</city>
            <street>Calle 3 # 2 - 1</street>
          </address>
        </passenger>
      </passengers>
      <itinerary>
        <!-- Flight Journey 1 -->
        <segment>
          <departureDate>2022-01-01T23:59:59</departureDate>
          <arrivalDate>2025-01-01T23:59:59</arrivalDate>
          <flightNumber>PQR345</flightNumber>
          <origin>BOGOTA</origin>
          <destination>MADRID</destination>
          <travelClass>U</travelClass>
        </segment>
        <!-- Flight Journey 2 -->
        <segment>
          <departureDate>2022-01-01T23:59:59</departureDate>
          <arrivalDate>2025-01-01T23:59:59</arrivalDate>
          <flightNumber>ARF2525</flightNumber>
          <origin>MADRID</origin>
          <destination>LONDRES</destination>
          <travelClass>EC</travelClass>
        </segment>
      </itinerary>
    </pnr>
    <isTest>false</isTest>
  </transaction>
</request>

```

{{< /tab >}}

{{< /tabs >}}

## Banks List - PSE

This method returns a list of the banks available for [payments using PSE]({{< ref "Payments-API-Colombia.md#submit-transactions-using-bank-transfer-pse" >}}). 

### Parameters for Request and Response {#parameters-for-request-and-response-4}

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|-|-|-|-|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `GET_BANKS_LIST`. | Yes |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| merchant | Object | | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| bankListInformation | Object | | This object has the information of the query. | Yes |
| bankListInformation > paymentMethod | Alphanumeric | | Set `PSE`. | Yes |
| bankListInformation > paymentCountry | Alphanumeric | | Set `CO`. | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric | | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| banks | Object |  | List of the banks available in PSE. |
| banks > id | Numeric | | Internal bank identifier. |
| banks > description | Alphanumeric | | Bank name to be displayed in the list. |
| banks > pseCode | Alphanumeric | | Code to send in the extra parameter `FINANCIAL_INSTITUTION_CODE` of the payment request. |

</details>

### API Call {#api-call-9}

The following are the examples of the request and response of this method.

{{< tabs tabTotal="2" tabID="10" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request Example:
```JSON
{
   "language": "es",
   "command": "GET_BANKS_LIST",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "test": false,
   "bankListInformation": {
      "paymentMethod": "PSE",
      "paymentCountry": "CO"
   }
}
```
<br>

Response Example:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "banks": [
        {
            "id": "34e6e912-a395-4d31-9599-9baa176c1a61",
            "description": "A continuación seleccione su banco",
            "pseCode": "0"
        },
        {
            "id": "033aec11-e068-4252-8043-237144be9233",
            "description": "BAN.CO",
            "pseCode": "1552"
        },
        {
            "id": "a720cb4c-6549-4932-83be-6d72b3eb0016",
            "description": "BANCAMIA",
            "pseCode": "1059"
        },
        {
            "id": "d9280852-47a5-4e99-94ac-3d7648ba79a3",
            "description": "BANCO AGRARIO",
            "pseCode": "1040"
        },
        {
            "id": "ff216e8a-28ba-4bf6-9935-b94dfdfd96a0",
            "description": "BANCO AGRARIO DESARROLLO",
            "pseCode": "1081"
        },
        {
            "id": "5073154e-efd4-4870-9315-abb926e87519",
            "description": "BANCO AGRARIO QA DEFECTOS",
            "pseCode": "1080"
        },
        {
            "id": "6e61a91d-58bf-46ec-aa09-1f44974dda7e",
            "description": "BANCO CAJA SOCIAL",
            "pseCode": "10322"
        },
        {
            "id": "e062711e-6bbd-4a13-819a-d60084f9c6fa",
            "description": "BANCO CAJA SOCIAL DESARROLLO",
            "pseCode": "1032"
        },
        {
            "id": "a9b5cc17-b0ae-4708-9835-586a0bef95df",
            "description": "BANCO COMERCIAL AVVILLAS S.A.",
            "pseCode": "1052"
        },
        {
            "id": "c5c97dfe-6101-453f-bcd4-691f4b329a3c",
            "description": "BANCO COOMEVA S.A. - BANCOOMEVA",
            "pseCode": "1061"
        },
        {
            "id": "7a2e8d04-e8c8-404b-8e49-d5d37c107a12",
            "description": "BANCO COOPERATIVO COOPCENTRAL",
            "pseCode": "1066"
        },
        {
            "id": "197fe0af-f658-4fe0-ad1b-952e174de549",
            "description": "BANCO CREDIFINANCIERA",
            "pseCode": "1058"
        },
        {
            "id": "b1de44f1-cede-4aca-9d3f-3313d5cc0c63",
            "description": "BANCO DAVIVIENDA",
            "pseCode": "1051"
        },
        {
            "id": "7a10219e-04a7-4c31-b747-54ded27c7f07",
            "description": "BANCO DAVIVIENDA Desarrollo",
            "pseCode": "10512"
        },
        {
            "id": "ed06f40e-a1b9-4e48-8851-bffb4cda0480",
            "description": "BANCO DE BOGOTA",
            "pseCode": "1039"
        },
        {
            "id": "4592a13b-6334-4fba-8402-9d006b599fa8",
            "description": "BANCO DE BOGOTA DESARROLLO 2013",
            "pseCode": "1001"
        },
        {
            "id": "55f59084-cd3b-47d2-a420-6442cdb9e4b1",
            "description": "BANCO DE OCCIDENTE",
            "pseCode": "1023"
        },
        {
            "id": "8e134fca-4fde-44e6-b012-55e8f2d338ca",
            "description": "BANCO FALABELLA",
            "pseCode": "1062"
        },
        {
            "id": "8eb03abf-5608-419b-8d2c-9d90b8ab6b88",
            "description": "BANCO GNB COLOMBIA (ANTES HSBC)",
            "pseCode": "1010"
        },
        {
            "id": "283e0068-749f-43f1-a2e5-340910f41af3",
            "description": "BANCO GNB SUDAMERIS",
            "pseCode": "1012"
        },
        {
            "id": "8b0bf5e7-394d-4f7e-a467-e4d21d04c9fb",
            "description": "BANCO PICHINCHA S.A.",
            "pseCode": "1060"
        },
        {
            "id": "beeb494a-4ce5-41b4-b497-0756f0b6a6d9",
            "description": "BANCO POPULAR",
            "pseCode": "1002"
        },
        {
            "id": "a5a4b740-1644-4627-ae2a-41b13ffc7c5e",
            "description": "BANCO PRODUCTOS POR SEPARADO",
            "pseCode": "1203"
        },
        {
            "id": "47e747ef-c817-4be6-9eff-b6b16f50d001",
            "description": "Banco PSE",
            "pseCode": "1101"
        },
        {
            "id": "589939d7-06d1-4933-a101-8bb29b801d76",
            "description": "BANCO SANTANDER COLOMBIA",
            "pseCode": "1065"
        },
        {
            "id": "fcdaa98e-99ce-4e76-a504-1e053a05e773",
            "description": "BANCO SERFINANZA",
            "pseCode": "1069"
        },
        {
            "id": "201608c6-81de-436f-967a-2ec7c212c100",
            "description": "BANCO TEQUENDAMA",
            "pseCode": "1035"
        },
        {
            "id": "a8f33ba3-0053-464a-afbe-9add7c63fbc3",
            "description": "Banco union Colombia Credito",
            "pseCode": "1004"
        },
        {
            "id": "5dfa1b2c-64bd-4e8c-9fad-585337cfd4ff",
            "description": "BANCO UNION COLOMBIANO",
            "pseCode": "1022"
        },
        {
            "id": "56e306ef-6011-4f41-9640-b98449d6a6be",
            "description": "BANCO UNION COLOMBIANO FD2",
            "pseCode": "1005"
        },
        {
            "id": "bc883c0d-3610-4a88-96ca-2e2baa1dd2e5",
            "description": "Banco Web Service ACH",
            "pseCode": "1055"
        },
        {
            "id": "4e97e580-fc92-47ea-af4f-7b3b3ddffff8",
            "description": "Banco Web Service ACH WSE 3.0",
            "pseCode": "1055"
        },
        {
            "id": "931f6bfb-283e-4721-bb86-4a7484bfd28e",
            "description": "BANCOLOMBIA DATAPOWER",
            "pseCode": "10072"
        },
        {
            "id": "1285de9c-8d47-49f7-b00a-e87882e2a3f9",
            "description": "BANCOLOMBIA DESARROLLO",
            "pseCode": "10071"
        },
        {
            "id": "451f0e5f-5db4-4f55-a1fc-b38e06526e04",
            "description": "BANCOLOMBIA QA",
            "pseCode": "1007"
        },
        {
            "id": "448e00ec-c479-497d-9a35-0dfbbf462f72",
            "description": "BANKA",
            "pseCode": "1077"
        },
        {
            "id": "5f3a7adb-b283-4ca3-bee9-741f1306a03d",
            "description": "BBVA COLOMBIA S.A.",
            "pseCode": "1013"
        },
        {
            "id": "cd4286fa-850a-4b34-96d1-f71d6a79f44a",
            "description": "BBVA DESARROLLO",
            "pseCode": "1513"
        },
        {
            "id": "10e9b7b6-7a5f-4d5b-8d7f-4b2020f43f93",
            "description": "CITIBANK COLOMBIA S.A.",
            "pseCode": "1009"
        },
        {
            "id": "77f0988f-cf45-4931-bbcd-984e07e0fc51",
            "description": "COLTEFINANCIERA",
            "pseCode": "1370"
        },
        {
            "id": "48c81f6a-e0f1-4c1d-ab9b-9915726e3596",
            "description": "CONFIAR COOPERATIVA FINANCIERA",
            "pseCode": "1292"
        },
        {
            "id": "8694df26-5ccd-45c0-b5b7-2b995c47f81a",
            "description": "COOPERATIVA FINANCIERA COTRAFA",
            "pseCode": "1289"
        },
        {
            "id": "1c222feb-2b58-408c-a495-ade06b6825c0",
            "description": "COOPERATIVA FINANCIERA DE ANTIOQUIA",
            "pseCode": "1283"
        },
        {
            "id": "70a18a09-38f2-4f62-aba6-9ad28c30c966",
            "description": "CREDIFIANCIERA",
            "pseCode": "1558"
        },
        {
            "id": "3f8b3126-8aa3-4438-8a6c-1d544184f2d7",
            "description": "DALE",
            "pseCode": "1097"
        },
        {
            "id": "a953078b-5e22-42ea-9301-954558e8f463",
            "description": "DAVIPLATA",
            "pseCode": "1551"
        },
        {
            "id": "2ad780ba-a1e8-4cb9-9150-670429aae092",
            "description": "GIROS Y FINANZAS COMPAÑIA DE FINANCIAMIENTO S.A",
            "pseCode": "1303"
        },
        {
            "id": "c0bfb716-a098-40f6-84b5-1972a4846506",
            "description": "IRIS",
            "pseCode": "1637"
        },
        {
            "id": "7e1efd88-4f88-4e21-a972-28b526b27da5",
            "description": "ITAU",
            "pseCode": "1006"
        },
        {
            "id": "26c9a2df-6b4f-4309-9137-3692d9bb9f82",
            "description": "MOVII S.A",
            "pseCode": "1801"
        },
        {
            "id": "d9b48a70-6068-4116-a345-154381e5d953",
            "description": "NEQUI CERTIFICACION",
            "pseCode": "1508"
        },
        {
            "id": "60199dc5-7d38-49c6-92a5-b839dc0087d2",
            "description": "prueba restriccion",
            "pseCode": "9988"
        },
        {
            "id": "be467299-d90a-407e-86d3-01e30ade1e06",
            "description": "Prueba Steve",
            "pseCode": "121212"
        },
        {
            "id": "201acc05-4c4f-49dc-9be6-3261a6ce4a3c",
            "description": "RAPPIPAY",
            "pseCode": "1151"
        },
        {
            "id": "7602e001-6199-48bc-9ee3-466f8eb2e422",
            "description": "SCOTIABANK COLPATRIA DESARROLLO",
            "pseCode": "1019"
        },
        {
            "id": "9bb638a0-4c3f-41d2-8811-f8cdd29b0db2",
            "description": "SCOTIABANK COLPATRIA UAT",
            "pseCode": "1078"
        },
        {
            "id": "086547b5-313b-42c7-acef-93d0f76b1dd5",
            "description": "SEIVY – GM FINANCIAL",
            "pseCode": "1305"
        }
    ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request Example:
```XML
<request>
    <language>en</language>
    <command>GET_BANKS_LIST</command>
    <merchant>
        apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <isTest>false</isTest>
    <bankListInformation>
        <paymentMethod>PSE</paymentMethod>
        <paymentCountry>CO</paymentCountry>
    </bankListInformation>
</request>
```
<br>

Response Example:
```XML
<bankListResponse>
    <code>SUCCESS</code>
    <banks>
        <bank>
            <id>34e6e912-a395-4d31-9599-9baa176c1a61</id>
            <description>A continuación seleccione su banco</description>
            <pseCode>0</pseCode>
        </bank>
        <bank>
            <id>033aec11-e068-4252-8043-237144be9233</id>
            <description>BAN.CO</description>
            <pseCode>1552</pseCode>
        </bank>
        <bank>
            <id>a720cb4c-6549-4932-83be-6d72b3eb0016</id>
            <description>BANCAMIA</description>
            <pseCode>1059</pseCode>
        </bank>
        <bank>
            <id>d9280852-47a5-4e99-94ac-3d7648ba79a3</id>
            <description>BANCO AGRARIO</description>
            <pseCode>1040</pseCode>
        </bank>
        <bank>
            <id>ff216e8a-28ba-4bf6-9935-b94dfdfd96a0</id>
            <description>BANCO AGRARIO DESARROLLO</description>
            <pseCode>1081</pseCode>
        </bank>
        <bank>
            <id>5073154e-efd4-4870-9315-abb926e87519</id>
            <description>BANCO AGRARIO QA DEFECTOS</description>
            <pseCode>1080</pseCode>
        </bank>
        <bank>
            <id>6e61a91d-58bf-46ec-aa09-1f44974dda7e</id>
            <description>BANCO CAJA SOCIAL</description>
            <pseCode>10322</pseCode>
        </bank>
        <bank>
            <id>e062711e-6bbd-4a13-819a-d60084f9c6fa</id>
            <description>BANCO CAJA SOCIAL DESARROLLO</description>
            <pseCode>1032</pseCode>
        </bank>
        <bank>
            <id>a9b5cc17-b0ae-4708-9835-586a0bef95df</id>
            <description>BANCO COMERCIAL AVVILLAS S.A.</description>
            <pseCode>1052</pseCode>
        </bank>
        <bank>
            <id>c5c97dfe-6101-453f-bcd4-691f4b329a3c</id>
            <description>BANCO COOMEVA S.A. - BANCOOMEVA</description>
            <pseCode>1061</pseCode>
        </bank>
        <bank>
            <id>7a2e8d04-e8c8-404b-8e49-d5d37c107a12</id>
            <description>BANCO COOPERATIVO COOPCENTRAL</description>
            <pseCode>1066</pseCode>
        </bank>
        <bank>
            <id>197fe0af-f658-4fe0-ad1b-952e174de549</id>
            <description>BANCO CREDIFINANCIERA</description>
            <pseCode>1058</pseCode>
        </bank>
        <bank>
            <id>b1de44f1-cede-4aca-9d3f-3313d5cc0c63</id>
            <description>BANCO DAVIVIENDA</description>
            <pseCode>1051</pseCode>
        </bank>
        <bank>
            <id>7a10219e-04a7-4c31-b747-54ded27c7f07</id>
            <description>BANCO DAVIVIENDA Desarrollo</description>
            <pseCode>10512</pseCode>
        </bank>
        <bank>
            <id>ed06f40e-a1b9-4e48-8851-bffb4cda0480</id>
            <description>BANCO DE BOGOTA</description>
            <pseCode>1039</pseCode>
        </bank>
        <bank>
            <id>4592a13b-6334-4fba-8402-9d006b599fa8</id>
            <description>BANCO DE BOGOTA DESARROLLO 2013</description>
            <pseCode>1001</pseCode>
        </bank>
        <bank>
            <id>55f59084-cd3b-47d2-a420-6442cdb9e4b1</id>
            <description>BANCO DE OCCIDENTE</description>
            <pseCode>1023</pseCode>
        </bank>
        <bank>
            <id>8e134fca-4fde-44e6-b012-55e8f2d338ca</id>
            <description>BANCO FALABELLA</description>
            <pseCode>1062</pseCode>
        </bank>
        <bank>
            <id>8eb03abf-5608-419b-8d2c-9d90b8ab6b88</id>
            <description>BANCO GNB COLOMBIA (ANTES HSBC)</description>
            <pseCode>1010</pseCode>
        </bank>
        <bank>
            <id>283e0068-749f-43f1-a2e5-340910f41af3</id>
            <description>BANCO GNB SUDAMERIS</description>
            <pseCode>1012</pseCode>
        </bank>
        <bank>
            <id>8b0bf5e7-394d-4f7e-a467-e4d21d04c9fb</id>
            <description>BANCO PICHINCHA S.A.</description>
            <pseCode>1060</pseCode>
        </bank>
        <bank>
            <id>beeb494a-4ce5-41b4-b497-0756f0b6a6d9</id>
            <description>BANCO POPULAR</description>
            <pseCode>1002</pseCode>
        </bank>
        <bank>
            <id>a5a4b740-1644-4627-ae2a-41b13ffc7c5e</id>
            <description>BANCO PRODUCTOS POR SEPARADO</description>
            <pseCode>1203</pseCode>
        </bank>
        <bank>
            <id>47e747ef-c817-4be6-9eff-b6b16f50d001</id>
            <description>Banco PSE</description>
            <pseCode>1101</pseCode>
        </bank>
        <bank>
            <id>589939d7-06d1-4933-a101-8bb29b801d76</id>
            <description>BANCO SANTANDER COLOMBIA</description>
            <pseCode>1065</pseCode>
        </bank>
        <bank>
            <id>fcdaa98e-99ce-4e76-a504-1e053a05e773</id>
            <description>BANCO SERFINANZA</description>
            <pseCode>1069</pseCode>
        </bank>
        <bank>
            <id>201608c6-81de-436f-967a-2ec7c212c100</id>
            <description>BANCO TEQUENDAMA</description>
            <pseCode>1035</pseCode>
        </bank>
        <bank>
            <id>a8f33ba3-0053-464a-afbe-9add7c63fbc3</id>
            <description>Banco union Colombia Credito</description>
            <pseCode>1004</pseCode>
        </bank>
        <bank>
            <id>5dfa1b2c-64bd-4e8c-9fad-585337cfd4ff</id>
            <description>BANCO UNION COLOMBIANO</description>
            <pseCode>1022</pseCode>
        </bank>
        <bank>
            <id>56e306ef-6011-4f41-9640-b98449d6a6be</id>
            <description>BANCO UNION COLOMBIANO FD2</description>
            <pseCode>1005</pseCode>
        </bank>
        <bank>
            <id>bc883c0d-3610-4a88-96ca-2e2baa1dd2e5</id>
            <description>Banco Web Service ACH</description>
            <pseCode>1055</pseCode>
        </bank>
        <bank>
            <id>4e97e580-fc92-47ea-af4f-7b3b3ddffff8</id>
            <description>Banco Web Service ACH WSE 3.0</description>
            <pseCode>1055</pseCode>
        </bank>
        <bank>
            <id>931f6bfb-283e-4721-bb86-4a7484bfd28e</id>
            <description>BANCOLOMBIA DATAPOWER</description>
            <pseCode>10072</pseCode>
        </bank>
        <bank>
            <id>1285de9c-8d47-49f7-b00a-e87882e2a3f9</id>
            <description>BANCOLOMBIA DESARROLLO</description>
            <pseCode>10071</pseCode>
        </bank>
        <bank>
            <id>451f0e5f-5db4-4f55-a1fc-b38e06526e04</id>
            <description>BANCOLOMBIA QA</description>
            <pseCode>1007</pseCode>
        </bank>
        <bank>
            <id>448e00ec-c479-497d-9a35-0dfbbf462f72</id>
            <description>BANKA</description>
            <pseCode>1077</pseCode>
        </bank>
        <bank>
            <id>5f3a7adb-b283-4ca3-bee9-741f1306a03d</id>
            <description>BBVA COLOMBIA S.A.</description>
            <pseCode>1013</pseCode>
        </bank>
        <bank>
            <id>cd4286fa-850a-4b34-96d1-f71d6a79f44a</id>
            <description>BBVA DESARROLLO</description>
            <pseCode>1513</pseCode>
        </bank>
        <bank>
            <id>10e9b7b6-7a5f-4d5b-8d7f-4b2020f43f93</id>
            <description>CITIBANK COLOMBIA S.A.</description>
            <pseCode>1009</pseCode>
        </bank>
        <bank>
            <id>77f0988f-cf45-4931-bbcd-984e07e0fc51</id>
            <description>COLTEFINANCIERA</description>
            <pseCode>1370</pseCode>
        </bank>
        <bank>
            <id>48c81f6a-e0f1-4c1d-ab9b-9915726e3596</id>
            <description>CONFIAR COOPERATIVA FINANCIERA</description>
            <pseCode>1292</pseCode>
        </bank>
        <bank>
            <id>8694df26-5ccd-45c0-b5b7-2b995c47f81a</id>
            <description>COOPERATIVA FINANCIERA COTRAFA</description>
            <pseCode>1289</pseCode>
        </bank>
        <bank>
            <id>1c222feb-2b58-408c-a495-ade06b6825c0</id>
            <description>COOPERATIVA FINANCIERA DE ANTIOQUIA</description>
            <pseCode>1283</pseCode>
        </bank>
        <bank>
            <id>70a18a09-38f2-4f62-aba6-9ad28c30c966</id>
            <description>CREDIFIANCIERA</description>
            <pseCode>1558</pseCode>
        </bank>
        <bank>
            <id>3f8b3126-8aa3-4438-8a6c-1d544184f2d7</id>
            <description>DALE</description>
            <pseCode>1097</pseCode>
        </bank>
        <bank>
            <id>a953078b-5e22-42ea-9301-954558e8f463</id>
            <description>DAVIPLATA</description>
            <pseCode>1551</pseCode>
        </bank>
        <bank>
            <id>2ad780ba-a1e8-4cb9-9150-670429aae092</id>
            <description>GIROS Y FINANZAS COMPAÑIA DE FINANCIAMIENTO S.A</description>
            <pseCode>1303</pseCode>
        </bank>
        <bank>
            <id>c0bfb716-a098-40f6-84b5-1972a4846506</id>
            <description>IRIS</description>
            <pseCode>1637</pseCode>
        </bank>
        <bank>
            <id>7e1efd88-4f88-4e21-a972-28b526b27da5</id>
            <description>ITAU</description>
            <pseCode>1006</pseCode>
        </bank>
        <bank>
            <id>26c9a2df-6b4f-4309-9137-3692d9bb9f82</id>
            <description>MOVII S.A</description>
            <pseCode>1801</pseCode>
        </bank>
        <bank>
            <id>d9b48a70-6068-4116-a345-154381e5d953</id>
            <description>NEQUI CERTIFICACION</description>
            <pseCode>1508</pseCode>
        </bank>
        <bank>
            <id>60199dc5-7d38-49c6-92a5-b839dc0087d2</id>
            <description>prueba restriccion</description>
            <pseCode>9988</pseCode>
        </bank>
        <bank>
            <id>be467299-d90a-407e-86d3-01e30ade1e06</id>
            <description>Prueba Steve</description>
            <pseCode>121212</pseCode>
        </bank>
        <bank>
            <id>201acc05-4c4f-49dc-9be6-3261a6ce4a3c</id>
            <description>RAPPIPAY</description>
            <pseCode>1151</pseCode>
        </bank>
        <bank>
            <id>7602e001-6199-48bc-9ee3-466f8eb2e422</id>
            <description>SCOTIABANK COLPATRIA DESARROLLO</description>
            <pseCode>1019</pseCode>
        </bank>
        <bank>
            <id>9bb638a0-4c3f-41d2-8811-f8cdd29b0db2</id>
            <description>SCOTIABANK COLPATRIA UAT</description>
            <pseCode>1078</pseCode>
        </bank>
        <bank>
            <id>086547b5-313b-42c7-acef-93d0f76b1dd5</id>
            <description>SEIVY – GM FINANCIAL</description>
            <pseCode>1305</pseCode>
        </bank>
    </banks>
</bankListResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Available Payment Methods Query

This method returns a list of the payment methods available in all countries.

### Parameters for Request and Response {#parameters-for-request-and-response-5}

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|-|-|-|-|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `GET_PAYMENT_METHODS`. | Yes |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| merchant | Object |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric | | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| paymentMethods | Object | | List of the payment methods. |
| paymentMethods > paymentMethodComplete | Object | | This object has the information of a payment method. |
| paymentMethods > paymentMethodComplete > id | Numeric | | Payment method identifier. |
| paymentMethods > paymentMethodComplete > description | Alphanumeric | Max:32 | Payment method name. |
| paymentMethods > paymentMethodComplete > country | Alphanumeric | 2 | ISO code of the Payment method country. |

</details>

### API Call {#api-call-10}

The following are the examples of the request and response of this method. For the sake of the example, the response here shows two payment methods. 

{{< tabs tabTotal="2" tabID="11" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request Example:
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

Response Example:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "paymentMethods": [
        {
            "id": "36",
            "description": "EFECTY",
            "country": "CO",
            "enabled": true,
            "reason": null
        },
        {
            "id": "10",
            "description": "MASTERCARD",
            "country": "co",
            "enabled": true,
            "reason": null
        }
    ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request Example:
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

Response Example:
```XML
<paymentMethodsResponse>
    <code>SUCCESS</code>
    <paymentMethods>
        <paymentMethodComplete>
            <id>36</id>
            <description>EFECTY</description>
            <country>CO</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>10</id>
            <description>MASTERCARD</description>
            <country>CO</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
    </paymentMethods>
</paymentMethodsResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Ping

The ```PING``` method lets you verify the connection to our platform. 

### Parameters For Request and Response {#parameters-for-request-and-response-6}

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|-|-|-|-|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `PING`. | Yes |
| test (JSON)<hr>isTest (XML) | Boolean | | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| merchant | Object | | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric | | The response code of the transaction. |
| error | Alphanumeric | Max:2048 | The error message associated if an error ocurred. |
| transactionResponse | Object | Max:2048 | The response of the PING method if an error ocurred. |
</details>

### API Call {#api-call-11}

The following are the examples of the request and response of this method.

{{< tabs tabTotal="2" tabID="12" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request Example:
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

Response Example:
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

Request Example:
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

Response Example:
```XML
<paymentResponse>
    <code>SUCCESS</code>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}
