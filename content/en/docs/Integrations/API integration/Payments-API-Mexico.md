---
title: "Payments API - Mexico"
linkTitle: "Payments API - Mexico"
date: 2021-05-03T15:48:08-05:00
description: >
  The Payments API for Mexico allows you to efficiently integrate PayU's payment processing features into your online shopping platform. Through this API, businesses can offer their customers a wide variety of payment methods, including cash, credit cards, debit cards, bank transfers, and bank reference.
weight: 20
tags: ["subtopic"]
---

<script src="/js/searchcodes.js"></script>

This guide shows you how to leverage these services to enhance your customers' payment experience by providing flexible and secure payment options tailored to the local market.

{{% alert title="Note" color="info"%}}

To integrate the Payments API, direct your requests to the following URLs according to the corresponding environment:
* Testing: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Production: ```https://api.payulatam.com/payments-api/4.0/service.cgi```

{{% /alert %}}

## Available Methods

Payments API includes the following methods:

* [Submit Transactions Using Credit or Debit Cards]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}})
* [Submit Transactions Using Cash]({{< ref "Payments-API-Mexico.md#submit-transactions-using-cash" >}})
* [Submit Transactions Using Bank Transfer]({{< ref "Payments-API-Mexico.md#submit-transactions-using-bank-transfer" >}})
* [Submit Transactions Using Bank Reference]({{< ref "Payments-API-Mexico.md#submit-transactions-using-bank-reference" >}})
* [Available Payment Methods Query]({{< ref "Payments-API-Mexico.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-API-Mexico.md#ping" >}})

{{% alert title="Note" color="info"%}}

To confirm the status of a transaction, you can use one of the following options:
* Navigate to the the URL set in the `transaction.notifyUrl` variable or the _**Confirmation URL**_ option located in the PayU Module in _**Settings**_ > _**Technical configuration**_.
* Use the [Queries API or SDK]({{< ref "Queries.md" >}}).

{{% /alert %}}

## Submit Transactions Using Credit or Debit Cards

This method lets you process the payments performed by your customers using credit or debit cards. For Mexico, you can perform the two-step flows (**Authorization**, **Capture**), and one-step flows (**Charge**). For more information, refer to [Payment flows]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Note" color="info"%}}
Two-step flows are only supported for Mastercard and Visa.
{{% /alert %}}

### Parameters for Request and Response

<details>
<summary>Request</summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Show mandatory fields only</label>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `SUBMIT_TRANSACTION`. | Yes |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| merchant | Object |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| transaction | Object |  | This object has the transaction data. | Yes |
| transaction > order | Object |  | This object has the order data. | Yes |
| transaction > order > accountId | Number |  | Identifier of your account. | Yes |
| transaction > order > referenceCode | Alphanumeric | Min:1 Max:255 | Represents the identifier of the order in your system. | Yes |
| transaction > order > description | Alphanumeric | Min:1 Max:255 | Description of the order. | Yes |
| transaction > order > language | Alphanumeric | 2 | Language used in emails sent to the buyer and the seller. | Yes |
| transaction > order > notifyUrl | Alphanumeric | Max:2048 | Confirmation URL of the order. | No |
| transaction > order > partnerId | Alphanumeric | Max:255 | Partner ID in PayU. | No |
| transaction > order > signature | Alphanumeric | Max:255 | The signature associated to the form. For more information refer [Authentication signature]({{< ref "integrations.html#authentication-signature" >}}). | Yes |
| transaction > order > shippingAddress | Object |  | Shipping address. | No |
| transaction > order > shippingAddress > street1 | Alphanumeric | Max:100 | Address Line 1. | No |
| transaction > order > shippingAddress > street2 | Alphanumeric | Max:100 | Address Line 2. | No |
| transaction > order > shippingAddress > city | Alphanumeric | Max:50 | Address city. | No |
| transaction > order > shippingAddress > state | Alphanumeric | Max:40 | Address State. | No |
| transaction > order > shippingAddress > country | Alphanumeric | 2 | Address country. | No |
| transaction > order > shippingAddress > postalCode | Alphanumeric | Max:8 | Address Zip code. | No |
| transaction > order > shippingAddress > phone | Alphanumeric | Max:11 | Phone number associated to the address. | No |
| transaction > order > buyer | Object |  | Buyer information. | Yes |
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
| transaction > order > additionalValues > TX_VALUE > value | Number | 12, 2 | Specifies the amount of the transaction, this value may have two decimal digits (Ex. `10000.00` or `10000`). | Yes |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Yes |
| transaction > order > additionalValues > TX_TAX | Alphanumeric | 64 | Amount of the Value Added Tax (VAT). | Yes |
| transaction > order > additionalValues > TX_TAX > value | Number | 12, 2 | Specifies the amount of the VAT.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alphanumeric | 64 | Base value to calculate the VAT.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Number | 12, 2 | Specifies the base amount of the transaction. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > creditCardTokenId | Alphanumeric |  | Include this parameter when the transaction is done using a tokenized card replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}) | No |
| transaction > creditCard | Object |  | Credit card information. This object and its parameters are mandatory when the payment is performed using not tokenized credit card. | No |
| transaction > creditCard > number | Alphanumeric | Min:13 Max:20 | Credit card number. | No |
| transaction > creditCard > securityCode | Alphanumeric | Min:1 Max:4 | Credit card security code (CVC2, CVV2, CID). | No |
| transaction > creditCard > expirationDate | Alphanumeric | 7 | Credit card expiration date. Format `YYYY/MM`. | No |
| transaction > creditCard > name | Alphanumeric | Min:1 Max:255 | Holder's name displayed in the credit card. | No |
| transaction > creditCard > processWithoutCvv2 | Boolean | Max:255 | Allows you to process transactions without including the credit card security code. Your commerce requires PayU's authorization before using this feature. | No |
| transaction > debitCard | Object |  | Debit card information. This object and its parameters are mandatory when the payment is performed using debit card. | No |
| transaction > debitCard > number | Alphanumeric | Min:13 Max:20 | Debit card number. | No |
| transaction > debitCard > securityCode | Alphanumeric | Min:1 Max:4 | Debit card security code (CVC2, CVV2, CID). | No |
| transaction > debitCard > expirationDate | Alphanumeric | 7 | Debit card expiration date. Format `YYYY/MM`. | No |
| transaction > debitCard > name | Alphanumeric | Min:1 Max:255 | Holder's name displayed in the debit card. | No |
| transaction > payer | Object |  | Payer information. Due to Tax regulations, it is mandatory to send the parameters `payer.billingAddress.postalCode` and `payer.birthdate`. | Yes |
| transaction > payer > emailAddress | Alphanumeric | Max:255 | Payer e-mail address. | No |
| transaction > payer > merchantPayerId | Alphanumeric | Max:100 | Identifier of the payer in your system. | No |
| transaction > payer > fullName | Alphanumeric | Max:150 | Name of the payer which must meet the name sent in the parameter `transaction.creditCard.name` for credit card payments. | No |
| transaction > payer > billingAddress | Object |  | Billing address. | Yes |
| transaction > payer > billingAddress > street1 | Alphanumeric | Max:100 | Billing Address Line 1. | No |
| transaction > payer > billingAddress > street2 | Alphanumeric | Max:100 | Billing Address Line 2. | No |
| transaction > payer > billingAddress > city | Alphanumeric | Max:50 | Billing address city. | No |
| transaction > payer > billingAddress > state | Alphanumeric | Max:40 | Billing address state. | Yes |
| transaction > payer > billingAddress > country | Alphanumeric | 2 | Billing address country in format ISO 3166 Alpha-2. | No |
| transaction > payer > billingAddress > postalCode | Alphanumeric | Max:20 | Billing address zip code. | Yes |
| transaction > payer > billingAddress > phone | Alphanumeric | Max:20 | Billing address phone number. | No |
| transaction > payer > birthdate | Alphanumeric | Max:10 | Payer's date of birth. Format `YYYY-MM-DD`. | Yes |
| transaction > payer > contactPhone | Alphanumeric | Max:20 | Payer's phone number. | No |
| transaction > payer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. | No |
| transaction > payer > dniType | Alphanumeric | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Yes |
| transaction > type | Alphanumeric | 32 | Set this value according to the transaction you want:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` for one-step flows.</li></ul> | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid Credit or Debit card Payment Method. [See the available Payment Methods for Mexico]({{< ref "select-your-payment-method.html#mexico" >}}). | Yes |
| transaction > paymentCountry | Alphanumeric | 2 | Set `MX` for Mexico. | Yes |
| transaction > deviceSessionId | Alphanumeric | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Yes |
| transaction > ipAddress | Alphanumeric | Max:39 | IP address of the device where the customer performs the transaction. | Yes |
| transaction > cookie | Alphanumeric | Max:255 | Cookie stored by the device where the customer performs the transaction. | Yes |
| transaction > userAgent | Alphanumeric | Max:1024 | The User agent of the browser where the customer performs the transaction. | Yes |
| transaction > extraParameters | Object |  | Additional parameters or data associated with the request. The maximum size of each _extraParameters_ name is 64 characters.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | No |
| transaction > extraParameters > EXTRA1 | Alphanumeric | Max:255 | Additional field to send extra information about the purchase. | No |
| transaction > extraParameters > EXTRA2 | Alphanumeric | Max:255 | Additional field to send extra information about the purchase. | No |
| transaction > extraParameters > EXTRA3 | Alphanumeric | Max:255 | Additional field to send extra information about the purchase. | No |
| transaction > threeDomainSecure | Object | | This object contains the information of 3DS 2.0. | No |
| transaction > threeDomainSecure > embedded | Boolean | | Set `true` if you want to use and embedded MPI for the Authorization process. By default, this value is set as `false`. | No |
| transaction > threeDomainSecure > eci | Number | Max:2 | Electronic Commerce Indicator.<br>Value returned by the directory servers showing the authentication attempt.<br>This parameter is mandatory when `transaction.threeDomainSecure.embedded` is `false` and `transaction.threeDomainSecure.xid` has been set. | No |
| transaction > threeDomainSecure > cavv | Alphanumeric | Max:28 | Cardholder Authentication Verification Value.<br>Code of the cryptogram used in the transaction authentication in Base64.<br>Depending on the specific ECI codes established by the process network, this value may be optional. | No |
| transaction > threeDomainSecure > xid | Alphanumeric | Max:28 | Transaction ID sent by the MPI in Base64.<br>This parameter is mandatory when `transaction.threeDomainSecure.embedded` is `false` and `transaction.threeDomainSecure.eci` has been set. | No |
| transaction > threeDomainSecure > directoryServerTransactionId | Alphanumeric | Max:36 | Transaction ID generated by the directory server during the authentication. | No |
<!--| transaction > monthsWithoutInterest |  |  | Information when paying the purchase using Months Without Interests.<br>This parameter is mandatory when you want to use [Months Without Interests (Meses Sin Intereses - MSI) feature]({{< ref "Promotions.md#months-without-interest-msi---meses-sin-intereses" >}}). | No |
| transaction > monthsWithoutInterest > months | Number | Max:2 | Number of Months Without Interests for the purchase. The available values are 3, 6, 9, or 12.<br>This parameter is mandatory when you want to use [Months Without Interests (Meses Sin Intereses - MSI) feature]({{< ref "Promotions.md#months-without-interest-msi---meses-sin-intereses" >}}). | No |
| transaction > monthsWithoutInterest > bank | Alphanumeric | Max:255 | Issuing bank of the credit card used to pay the purchase using Months Without Interests.<br>This parameter is mandatory when you want to use [Months Without Interests (Meses Sin Intereses - MSI) feature]({{< ref "Promotions.md#months-without-interest-msi---meses-sin-intereses" >}}). | No |-->

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse | Object |  | The response data. |
| transactionResponse > orderId | Number |  | The generated or existing order Id in PayU. |
| transactionResponse > transactionId | Alphanumeric | 36 | The identifier of the transaction in PayU. |
| transactionResponse > state | Alphanumeric | Max:32 | The status of the transaction. |
| transactionResponse > responseCode | Alphanumeric | Max:64 | The response code associated with the status. |
| transactionResponse > paymentNetworkResponseCode | Alphanumeric | Max:255 | The response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alphanumeric | Max:255 | The error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alphanumeric | Max:32 | The traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alphanumeric | Max:12 | The authorization code returned by the financial network. |
| transactionResponse > responseMessage | Alphanumeric | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date |  | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters | Object |  | Additional parameters or data associated with the response. <br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo | Object |  | Additional information associated with the response. This object follows the same structure than `transactionResponse.extraParameters`. |

</details>

#### Considerations

* Two-step flows are only available for Mastercard and Visa.
* For payments with Promotions, send the extra parameters `INSTALLMENTS_NUMBER` and `PROMOTION_ID` with the number of installments selected and the Id of the promotion. Refer to [Promotions API]({{< ref "Promotions.md" >}}) for more information.
* For payments with Months Without Interests (Meses Sin Intereses - MSI), send the extra parameter `INSTALLMENTS_NUMBER` with the number of months. Refer to [MSI]({{< ref "Promotions.md#months-without-interests-msi---meses-sin-intereses" >}}) for more information.
* The available banks for MSI are: BANAMEX, BANCO REGIONAL DE MONTERREY S.A, BANCOPPEL, BANCO AZTECA, SCOTIABANK, HSBC, INBURSA, BANCA MIFEL SA, BANCO MULTIVA, BAJIO, CI BANCO, Afirme, Banregio, Banjercito, Banorte, Famsa, Invex, Premium Card Liverpool, Santander, and Bancomer.
* When using MSI, promotions or apply installments, always display the phrase **"PAGOS DIFERIDOS"** during the payment process.
* When installments applied (fees assumed by the payer), display the original amount of the transaction, the total amount after the fees, the number of installments, and the amount per installment including the extra fee.
* Promotions feature is only available for [one-step flows]({{< ref "Payments.md#payment-flows" >}}).
* For payments with credit card tokens, include the parameters `transaction.creditCardTokenId` and `transaction.creditCard.securityCode` (if you process with security code) replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}).
* By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative. After this feature is enabled for you, send in the request the variable `creditCard.processWithoutCvv2` as true and remove the variable `creditCard.securityCode`.
* The variable `transaction.threeDomainSecure` does not replace the card information nor any of the mandatory fields of the transaction. This object is additional and not mandatory.
* The variable `transaction.threeDomainSecure` corresponds to a _passthrough_ scenario where the commerce performs the authentication by their own.

### Authorization

Use this method to perform the **Authorization** step of a two-step flow using Mastercard or Visa. In this step, you authorize the payment but the amount is not debited until you [capture]({{< ref "payments-api-mexico.md#capture" >}}) the funds.<br>The following are the request and response bodies for this transaction type.

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
         "accountId": "512324",
         "referenceCode": "PRODUCT_TEST_2021-06-22T17:33:42.775Z",
         "description": "payment test",
         "language": "es",
         "signature": "6fd48e7150c652833866799a3fbf87bb",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "MXN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Domingo Diez 1589",
               "street2": "5555487",
               "city": "Cuernavaca",
               "state": "Morelos",
               "country": "MX",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "5555487",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
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
         "birthdate": "1994-06-21",
         "billingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "125544",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "creditCard": {
         "number": "4097440000000004",
         "securityCode": "321",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION",
      "paymentMethod": "VISA",
      "paymentCountry": "MX",
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
        "orderId": 1400446409,
        "transactionId": "596ccd26-41a3-40b0-a241-262b3331aedc",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "458250371149",
        "authorizationCode": "MOCK-BTE-1624383236617",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624365236861,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "EXPIRATION_DATE": 1624987980000,
            "PAYMENT_WAY_ID": "4"
        },
        "additionalInfo": {
            "paymentNetwork": "BANORTE",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": "CREDIT",
            "transactionType": "AUTHORIZATION"
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
         <accountId>512324</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-22T17:33:42.775Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>6fd48e7150c652833866799a3fbf87bb</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>MXN</currency>
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
               <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>
               <city>Cuernavaca</city>
               <state>Morelos</state>
               <country>MX</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>
            <city>Cuernavaca</city>
            <state>Morelos</state>
            <country>MX</country>
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
         <birthdate>1994-06-21</birthdate>
         <billingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>
            <city>Cuernavaca</city>
            <state>Morelos</state>
            <country>MX</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <creditCard>
         <number>4097440000000004</number>
         <securityCode>777</securityCode>
         <expirationDate>2022/12</expirationDate>
         <name>APPROVED</name>
      </creditCard>
      <extraParameters>
         <entry>
            <string>INSTALLMENTS_NUMBER</string>
            <string>1</string>
         </entry>
      </extraParameters>
      <type>AUTHORIZATION</type>
      <paymentMethod>VISA</paymentMethod>
      <paymentCountry>MX</paymentCountry>
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
        <orderId>1400446580</orderId>
        <transactionId>f03be7ef-e82a-41e3-9a3c-5451c4d8ab99</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>458250371149</trazabilityCode>
        <authorizationCode>MOCK-BTE-1624389497244</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Aprobado</responseMessage>
        <operationDate>2021-06-22T09:18:17</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-29T14:18:00</date>
            </entry>
            <entry>
                <string>PAYMENT_WAY_ID</string>
                <string>4</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>BANORTE</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <cardType>CREDIT</cardType>
            <transactionType>AUTHORIZATION</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

### Capture

Use this method to perform the **Capture** step of a two-step flow for Mastercard and Visa. In this step, you capture the funds previously [Authorized]({{< ref "payments-api-mexico.md#authorization" >}}) to transfer them to your PayU account.

#### Considerations

Take into account the following considerations for capture.
* The maximum time to capture an approved transaction is 30 days. After this time, the transaction is auto voided.
* Only the parameters displayed in the request body are mandatory to invoke a Capture transaction. Recall that the order and transaction ids must meet with a currently authorized transaction.
* You can perform partial captures on an authorized amount. For more information, see the [Partial Capture]({{< ref "#partial-capture" >}}) section.

The following are the request and response bodies for this transaction type.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request Example:
```JSON
{
   "language": "es",
   "command": "SUBMIT_TRANSACTION",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "transaction": {
      "order": {
         "id": "1400446409"
      },
      "type": "CAPTURE",
      "parentTransactionId": "596ccd26-41a3-40b0-a241-262b3331aedc"
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
        "orderId": 1400446409,
        "transactionId": "434312fd-90c6-48e0-9c73-dd3c2bb40d27",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "458250371149",
        "authorizationCode": "MOCK-BTE-1624389983478",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624371983901,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "PAYMENT_WAY_ID": "4"
        },
        "additionalInfo": {
            "paymentNetwork": "BANORTE",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": null,
            "transactionType": "CAPTURE"
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
         <id>1400446409</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>596ccd26-41a3-40b0-a241-262b3331aedc</parentTransactionId>
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
        <orderId>1400446580</orderId>
        <transactionId>febf383f-add7-4986-82a2-941f0f4e9b45</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>458250371149</trazabilityCode>
        <authorizationCode>MOCK-BTE-1624390154273</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Aprobado</responseMessage>
        <operationDate>2021-06-22T09:29:14</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>PAYMENT_WAY_ID</string>
                <string>4</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>BANORTE</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

### Partial Capture

A partial capture is an operation that allows you to request the disbursement of an amount less than what was previously authorized in a transaction.

This means that if your integration initially authorized a payment of $100, you can perform a partial capture for $60, and release the remaining $40, which the integration will not be able to capture later.

#### Considerations

* The total amount captured cannot exceed the originally authorized amount.
* Each payment processor and each country may have rules or restrictions regarding the amount you can capture partially.
* You must specify the value you wish to partially capture in the `value` field, within the `TX_VALUE` parameter, as shown in the example below.

The following are examples of the request and response bodies for this type of transaction.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request Example:
```JSON
{
    "language": "es",
    "command": "SUBMIT_TRANSACTION",
    "merchant": {
        "apiLogin": "pRRXKOl8ikMmt9u",
        "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
    },
    "transaction": {
        "order": {
            "id": "2152525133"
        },
        "additionalValues": {
            "TX_VALUE": {
                "value": 500,
                "currency": "MXN"
            }
        },
        "type": "CAPTURE",
        "parentTransactionId": "4b6adba7-e43b-45f8-88a6-d290755d6c04"
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
        "orderId": 2152543423,
        "transactionId": "6f523681-1587-4a2d-8a15-605d27f89c26",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "6f523681-1587-4a2d-8a15-605d27f89c26",
        "authorizationCode": "NPS-011111",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "APROBADA - Autorizada",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1723724052207,
        "referenceQuestionnaire": null,
        "extraParameters": null,
        "additionalInfo": {
            "paymentNetwork": "NPS_AR",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": null,
            "transactionType": "CAPTURE"
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
    <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
    <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
  </merchant>
  <transaction>
    <order>
      <id>2152525133</id>
    </order>
    <additionalValues>
      <TX_VALUE>
        <value>500</value>
        <currency>MXN</currency>
      </TX_VALUE>
    </additionalValues>
    <type>CAPTURE</type>
    <parentTransactionId>4b6adba7-e43b-45f8-88a6-d290755d6c04</parentTransactionId>
  </transaction>
  <test>false</test>
</request>

```
<br>

Response Example:
```XML
<response>
  <code>SUCCESS</code>
  <error />
  <transactionResponse>
    <orderId>2152543423</orderId>
    <transactionId>6f523681-1587-4a2d-8a15-605d27f89c26</transactionId>
    <state>APPROVED</state>
    <paymentNetworkResponseCode>0</paymentNetworkResponseCode>
    <paymentNetworkResponseErrorMessage />
    <trazabilityCode>6f523681-1587-4a2d-8a15-605d27f89c26</trazabilityCode>
    <authorizationCode>NPS-011111</authorizationCode>
    <pendingReason />
    <responseCode>APPROVED</responseCode>
    <errorCode />
    <responseMessage>APROBADA - Autorizada</responseMessage>
    <transactionDate />
    <transactionTime />
    <operationDate>1723724052207</operationDate>
    <referenceQuestionnaire />
    <extraParameters />
    <additionalInfo>
      <paymentNetwork>NPS_AR</paymentNetwork>
      <rejectionType>NONE</rejectionType>
      <responseNetworkMessage />
      <travelAgencyAuthorizationCode />
      <cardType />
      <transactionType>CAPTURE</transactionType>
    </additionalInfo>
  </transactionResponse>
</response>

```

{{< /tab >}}
{{< /tabs >}}

### Charge

Use this method to perform a one-step flow, namely a charge. In this step, both steps of the two-step flow are combined in a single transaction and the funds are transferred from the customers account to your PayU account once they have been approved:

The following are the request and response bodies for this transaction type.

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
         "accountId": "512324",
         "referenceCode": "PRODUCT_TEST_2021-06-22T17:33:42.775Z",
         "description": "payment test",
         "language": "es",
         "signature": "6fd48e7150c652833866799a3fbf87bb",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "MXN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Domingo Diez 1589",
               "street2": "5555487",
               "city": "Cuernavaca",
               "state": "Morelos",
               "country": "MX",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "5555487",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
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
         "birthdate": "1994-06-21",
         "billingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "125544",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "creditCard": {
         "number": "4097440000000004",
         "securityCode": "321",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "VISA",
      "paymentCountry": "MX",
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
        "orderId": 1400446667,
        "transactionId": "868e169b-1857-4c52-a80d-e4b6d228a74f",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "458250371149",
        "authorizationCode": "MOCK-BTE-1624391396880",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624373397257,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "PAYMENT_WAY_ID": "4"
        },
        "additionalInfo": {
            "paymentNetwork": "BANORTE",
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
         <accountId>512324</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-22T17:33:42.775Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>6fd48e7150c652833866799a3fbf87bb</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>MXN</currency>
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
               <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>
               <city>Cuernavaca</city>
               <state>Morelos</state>
               <country>MX</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>
            <city>Cuernavaca</city>
            <state>Morelos</state>
            <country>MX</country>
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
         <birthdate>1994-06-21</birthdate>
         <billingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>
            <city>Cuernavaca</city>
            <state>Morelos</state>
            <country>MX</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <creditCard>
         <number>4850110000000000</number>
         <securityCode>777</securityCode>
         <expirationDate>2022/12</expirationDate>
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
      <paymentCountry>MX</paymentCountry>
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
        <orderId>1400446670</orderId>
        <transactionId>a32da7ad-fb55-41ff-863d-ee49361334cb</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>458250371149</trazabilityCode>
        <authorizationCode>MOCK-BTE-1624391456868</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Aprobado</responseMessage>
        <operationDate>2021-06-22T09:50:57</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>PAYMENT_WAY_ID</string>
                <string>4</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>BANORTE</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <cardType>CREDIT</cardType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Submit Transactions Using Cash

This method lets you process the payments in cash of your customers. To integrate with cash transactions, you must redirect the customer to the URL found in the response of the method; your customer sees a payment receipt like this.

<img src="/assets/Payments/CashReceiptMX.png" alt="PrintScreen" width="50%">

### Parameters for Request and Response

<details>
<summary>Request</summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Show mandatory fields only</label>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `SUBMIT_TRANSACTION`. | Yes |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| merchant | Object |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| transaction | Object |  | This object has the transaction data. | Yes |
| transaction > order | Object |  | This object has the order data. | Yes |
| transaction > order > accountId | Number |  | Identifier of your account. | Yes |
| transaction > order > referenceCode | Alphanumeric | Min:1 Max:255 | Represents the identifier of the order in your system. | Yes |
| transaction > order > description | Alphanumeric | Min:1 Max:255 | Description of the order. | Yes |
| transaction > order > language | Alphanumeric | 2 | Language used in emails sent to the buyer and the seller. | Yes |
| transaction > order > notifyUrl | Alphanumeric | Max:2048 | Confirmation URL of the order. | No |
| transaction > order > partnerId | Alphanumeric | Max:255 | Partner ID in PayU. | No |
| transaction > order > signature | Alphanumeric | Max:255 | The signature associated to the form. For more information refer [Authentication signature]({{< ref "integrations.html#authentication-signature" >}}). | Yes |
| transaction > order > shippingAddress | Object |  | Shipping address. | No |
| transaction > order > shippingAddress > street1 | Alphanumeric | Max:100 | Address Line 1. | No |
| transaction > order > shippingAddress > street2 | Alphanumeric | Max:100 | Address Line 2. | No |
| transaction > order > shippingAddress > city | Alphanumeric | Max:50 | Address city. | No |
| transaction > order > shippingAddress > state | Alphanumeric | Max:40 | Address State. | No |
| transaction > order > shippingAddress > country | Alphanumeric | 2 | Address country. | No |
| transaction > order > shippingAddress > postalCode | Alphanumeric | Max:8 | Address Zip code. | No |
| transaction > order > shippingAddress > phone | Alphanumeric | Max:11 | Phone number associated to the address. | No |
| transaction > order > buyer | Object |  | Buyer information. | Yes |
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
| transaction > order > additionalValues > TX_VALUE > value | Number | 12, 2 | Specifies the amount of the transaction, this value may have two decimal digits (Ex. `10000.00` or `10000`). | Yes |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Yes |
| transaction > order > additionalValues > TX_TAX | Alphanumeric | 64 | Amount of the Value Added Tax (VAT). | Yes |
| transaction > order > additionalValues > TX_TAX > value | Number | 12, 2 | Specifies the amount of the VAT.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alphanumeric | 64 | Base value to calculate the VAT.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Number | 12, 2 | Specifies the base amount of the transaction. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > payer | Object |  | Payer information. | Yes |
| transaction > payer > emailAddress | Alphanumeric | Max:255 | Payer e-mail address. | Yes |
| transaction > payer > merchantPayerId | Alphanumeric | Max:100 | Identifier of the payer in your system. | No |
| transaction > payer > fullName | Alphanumeric | Max:150 | Name of the payer. | Yes |
| transaction > payer > billingAddress | Object |  | Billing address. | Yes |
| transaction > payer > billingAddress > street1 | Alphanumeric | Max:100 | Billing Address Line 1. | Yes |
| transaction > payer > billingAddress > street2 | Alphanumeric | Max:100 | Billing Address Line 2. | No |
| transaction > payer > billingAddress > city | Alphanumeric | Max:50 | Billing address city. | Yes |
| transaction > payer > billingAddress > state | Alphanumeric | Max:40 | Billing address state. | Yes |
| transaction > payer > billingAddress > country | Alphanumeric | 2 | Billing address country in format ISO 3166 Alpha-2. | Yes |
| transaction > payer > billingAddress > postalCode | Alphanumeric | Max:20 | Billing address zip code. | Yes |
| transaction > payer > billingAddress > phone | Alphanumeric | Max:20 | Billing address phone number. | No |
| transaction > payer > birthdate | Alphanumeric | Max:10 | Payer's date of birth. Format `YYYY-MM-DD`. | Yes |
| transaction > payer > contactPhone | Alphanumeric | Max:20 | Payer's phone number. | Yes |
| transaction > payer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. | Yes |
| transaction > payer > dniType | Alphanumeric | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alphanumeric | 32 | As cash payments are performed in physical offices, the only available transaction type is `AUTHORIZATION_AND_CAPTURE` | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid Payment Method in cash. [See the available Payment Methods for Mexico]({{< ref "select-your-payment-method.html#mexico" >}}). | Yes |
| transaction > paymentCountry | Alphanumeric | 2 | Set `MX` for Mexico. | Yes |
| transaction > expirationDate | Alphanumeric | 23 | Maximum date and time that the payer has to make the payment. Format `YYYY-MM-DDTHH:MM:SS`, for example `2021-06-12T16:07:11.586`. | No |
| transaction > ipAddress | Alphanumeric | Max:39 | IP address of the device where the customer performs the transaction. | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse | Object |  | The response data. |
| transactionResponse > orderId | Number |  | The generated or existing order Id in PayU. |
| transactionResponse > transactionId | Alphanumeric | 36 | The identifier of the transaction in PayU. |
| transactionResponse > state | Alphanumeric | Max:32 | The status of the transaction. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alphanumeric | Max:255 | The response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alphanumeric | Max:255 | The error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alphanumeric | Max:32 | The traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alphanumeric | Max:12 | The authorization code returned by the financial network. |
| transactionResponse > pendingReason | Alphanumeric | Max:21 | The reason code associated with the status, as mentioned in `transactionResponse > state`, the transaction is waiting for the payment. |
| transactionResponse > responseCode | Alphanumeric | Max:64 | The response code associated with the status. In this case, for successful transactions is `PENDING_TRANSACTION_CONFIRMATION`. |
| transactionResponse > responseMessage | Alphanumeric | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date |  | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters | Object |  | Additional parameters or data associated with the response.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"REFERENCE": "74794"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>REFERENCE</string>`<br>&emsp;&emsp;`<int>74794</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo | Object |  | Additional information associated with the response. This object follows the same structure than `transactionResponse.extraParameters`. |

</details>

#### Considerations

* The parameter `transaction.expirationDate` is not mandatory. If you don't send this parameter, its default value is seven (7) days after the current date.<br>If you send a date later than the default number of days, PayU will ignore this value and the expiration will be set as default.
* When the payment method is `OXXO`, the confirmation of the payment will be one day after the payment. For other cash payment methods, the confirmation is online.
* The parameter `transactionResponse.extraParameters` has the following parameters related to the transaction:
   - **BANK_REFERENCED_CODE**: payment type.
   - **EXPIRATION_DATE**: maximum term for the payer to perform the payment.
   - **BAR_CODE**: barcode which lets the payer perform the payment.
   - **REFERENCE**: internal payment reference generated by PayU. 
   - **URL_PAYMENT_RECEIPT_HTML**: payment receipt in HTML format. This is where you need to redirect the payment when the payer selects cash payment. 
   - **URL_PAYMENT_RECEIPT_PDF**: payment receipt in PDF format.
   - **PAYMENT_WAY_ID**: network payment of the payment type.

### API Call

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
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
      "apiLogin": "pRRXKOl8ikMmt9u"
   },
   "transaction": {
      "order": {
         "accountId": "512324",
         "referenceCode": "PRODUCT_TEST_2021-06-22T17:33:42.775Z",
         "description": "payment test",
         "language": "es",
         "signature": "6fd48e7150c652833866799a3fbf87bb",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "MXN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Domingo Diez 1589",
               "street2": "5555487",
               "city": "Cuernavaca",
               "state": "Morelos",
               "country": "MX",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "5555487",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
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
         "birthdate": "1994-06-21",
         "billingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "125544",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
	  "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "SEVEN_ELEVEN",
      "expirationDate": "2021-06-23T21:02:14.593",
      "paymentCountry": "MX",
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
        "orderId": 857806658,
        "transactionId": "c7b15feb-e8e6-4330-a04b-2a4c0cc2b776",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": null,
        "authorizationCode": null,
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": null,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CASH",
            "EXPIRATION_DATE": 1624482134593,
            "BAR_CODE": "00012345678900008578066580000000100000202106238",
            "REFERENCE": 857806658,
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857806658Yc7b15febe8e6433Y2568534adcdf6da",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857806658Yc7b15febe8e6433Y2568534adcdf6da",
            "PAYMENT_WAY_ID": "1"
        },
        "additionalInfo": {
            "paymentNetwork": "SEVEN_ELEVEN",
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
         <accountId>512324</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-22T17:33:42.775Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>6fd48e7150c652833866799a3fbf87bb</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>MXN</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <contactPhone>7563126</contactPhone>
            <dniNumber>123456789</dniNumber>
            <emailAddress>buyer_test@test.com</emailAddress>
            <fullName>First name and second buyer name</fullName>
            <merchantBuyerId>1</merchantBuyerId>
            <shippingAddress>
               <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <billingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>            
            <city>Cuernavaca</city>
            <state>Morelos</state>               
            <country>MX</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
         <birthdate>1994-06-21</birthdate>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <emailAddress>payer_test@test.com</emailAddress>
         <fullName>First name and second payer name</fullName>
         <merchantPayerId>1</merchantPayerId>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>SEVEN_ELEVEN</paymentMethod>
      <expirationDate>2021-06-23T21:02:14.593</expirationDate>
      <paymentCountry>MX</paymentCountry>
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
        <orderId>857806714</orderId>
        <transactionId>194e0320-2711-49d6-9d58-493dd0a59694</transactionId>
        <state>PENDING</state>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CASH</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-23T16:23:05</date>
            </entry>
            <entry>
                <string>BAR_CODE</string>
                <string>00012345678900008578067140000000100000202106230</string>
            </entry>
            <entry>
                <string>REFERENCE</string>
                <int>857806714</int>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857806714Y194e0320271149dY36e0ad0392e7f5f</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857806714Y194e0320271149dY36e0ad0392e7f5f</string>
            </entry>
            <entry>
                <string>PAYMENT_WAY_ID</string>
                <string>1</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>SEVEN_ELEVEN</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Submit Transactions Using Bank Transfer

This method lets you process the bank transfer payments of your customers. When using this payment method, the payer performs a bank transfer from their bank account to a PayU's CLABE account.<br>
To integrate with these transactions, you must redirect the customer to the URL found in the response of the method.

<img src="/assets/Payments/BankTransferReceiptMX.png" alt="PrintScreen" width="50%">

### Parameters for Request and Response

<details>
<summary>Request</summary>
<label for="table3" class="showMandatory"><input type="checkbox" id="table3" name="table3" value="true" onchange="showMandatory(this)"> Show mandatory fields only</label>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `SUBMIT_TRANSACTION`. | Yes |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| merchant | Object |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| transaction | Object |  | This object has the transaction data. | Yes |
| transaction > order | Object |  | This object has the order data. | Yes |
| transaction > order > accountId | Number |  | Identifier of your account. | Yes |
| transaction > order > referenceCode | Alphanumeric | Min:1 Max:255 | Represents the identifier of the order in your system. | Yes |
| transaction > order > description | Alphanumeric | Min:1 Max:255 | Description of the order. | Yes |
| transaction > order > language | Alphanumeric | 2 | Language used in emails sent to the buyer and the seller. | Yes |
| transaction > order > notifyUrl | Alphanumeric | Max:2048 | Confirmation URL of the order. | No|
| transaction > order > partnerId | Alphanumeric | Max:255 | Partner ID in PayU. | No |
| transaction > order > signature | Alphanumeric | Max:255 | The signature associated to the form. For more information refer [Authentication signature]({{< ref "integrations.html#authentication-signature" >}}). | Yes |
| transaction > order > shippingAddress | Object |  | Shipping address. | No |
| transaction > order > shippingAddress > street1 | Alphanumeric | Max:100 | Address Line 1. | No |
| transaction > order > shippingAddress > street2 | Alphanumeric | Max:100 | Address Line 2. | No |
| transaction > order > shippingAddress > city | Alphanumeric | Max:50 | Address city. | No |
| transaction > order > shippingAddress > state | Alphanumeric | Max:40 | Address State. | No |
| transaction > order > shippingAddress > country | Alphanumeric | 2 | Address country. | No |
| transaction > order > shippingAddress > postalCode | Alphanumeric | Max:8 | Address Zip code. | No |
| transaction > order > shippingAddress > phone | Alphanumeric | Max:11 | Phone number associated to the address. | No |
| transaction > order > buyer | Object |  | Buyer information. | Yes |
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
| transaction > order > additionalValues > TX_VALUE > value | Number | 12, 2 | Specifies the amount of the transaction, this value may have two decimal digits (Ex. `10000.00` or `10000`). | Yes |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Yes |
| transaction > order > additionalValues > TX_TAX | Alphanumeric | 64 | Amount of the Value Added Tax (VAT). | Yes |
| transaction > order > additionalValues > TX_TAX > value | Number | 12, 2 | Specifies the amount of the VAT.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alphanumeric | 64 | Base value to calculate the VAT.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Number | 12, 2 | Specifies the base amount of the transaction. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > payer | Object |  | Payer information. | Yes |
| transaction > payer > emailAddress | Alphanumeric | Max:255 | Payer e-mail address. | Yes |
| transaction > payer > merchantPayerId | Alphanumeric | Max:100 | Identifier of the payer in your system. | No |
| transaction > payer > fullName | Alphanumeric | Max:150 | Name of the payer. | Yes |
| transaction > payer > billingAddress | Object |  | Billing address. | Yes |
| transaction > payer > billingAddress > street1 | Alphanumeric | Max:100 | Billing Address Line 1. | Yes |
| transaction > payer > billingAddress > street2 | Alphanumeric | Max:100 | Billing Address Line 2. | No |
| transaction > payer > billingAddress > city | Alphanumeric | Max:50 | Billing address city. | Yes |
| transaction > payer > billingAddress > state | Alphanumeric | Max:40 | Billing address state. | No |
| transaction > payer > billingAddress > country | Alphanumeric | 2 | Billing address country in format ISO 3166 Alpha-2. | Yes |
| transaction > payer > billingAddress > postalCode | Alphanumeric | Max:20 | Billing address zip code. | Yes |
| transaction > payer > billingAddress > phone | Alphanumeric | Max:20 | Billing address phone number. | No |
| transaction > payer > birthdate | Alphanumeric | Max:10 | Payer's date of birth. Format `YYYY-MM-DD`. | Yes |
| transaction > payer > contactPhone | Alphanumeric | Max:20 | Payer's phone number. | Yes |
| transaction > payer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. | Yes |
| transaction > payer > dniType | Alphanumeric | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alphanumeric | 32 | As cash payments are performed in physical offices, the only available transaction type is `AUTHORIZATION_AND_CAPTURE` | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid Payment Method in Bank transfer. [See the available Payment Methods for Mexico]({{< ref "select-your-payment-method.html#mexico" >}}). | Yes |
| transaction > paymentCountry | Alphanumeric | 2 | Set `MX` for Mexico. | Yes |
| transaction > deviceSessionId | Alphanumeric | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Yes |
| transaction > ipAddress | Alphanumeric | Max:39 | IP address of the device where the customer performs the transaction. | Yes |
| transaction > cookie | Alphanumeric | Max:255 | Cookie stored by the device where the customer performs the transaction. | Yes |
| transaction > userAgent | Alphanumeric | Max:1024 | The User agent of the browser where the customer performs the transaction. | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse | Object |  | The response data. |
| transactionResponse > orderId | Number |  | The generated or existing order Id in PayU. |
| transactionResponse > transactionId | Alphanumeric | 36 | The identifier of the transaction in PayU. |
| transactionResponse > state | Alphanumeric | Max:32 | The status of the transaction. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alphanumeric | Max:255 | The response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alphanumeric | Max:255 | The error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alphanumeric | Max:32 | The traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alphanumeric | Max:12 | The authorization code returned by the financial network. |
| transactionResponse > pendingReason | Alphanumeric | Max:21 | The reason code associated with the status, as mentioned in `transactionResponse > state`, the transaction is waiting for the payment. |
| transactionResponse > responseCode | Alphanumeric | Max:64 | The response code associated with the status. In this case, for successful transactions is `PENDING_PAYMENT_IN_ENTITY`. |
| transactionResponse > responseMessage | Alphanumeric | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date |  | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters | Object |  | Additional parameters or data associated with the response.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"SPEI_CLABE_ACCOUNT_NUMBER": "646180132800000009"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>SPEI_CLABE_ACCOUNT_NUMBER</string>`<br>&emsp;&emsp;`<string>646180132800000009</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo | Object |  | Additional information associated with the response. This object follows the same structure than `transactionResponse.extraParameters`. |

</details>

#### Considerations

* The parameter `transaction.expirationDate` is not mandatory. If you don't send this parameter, its default value is seven (7) days after the current date.<br>If you send a date later than the default number of days, PayU will ignore this value and the expiration will be set as default.
* When the payer selects this payment method, PayU creates an order in _in progress_ state and a transaction in `PENDING` state.
* To perform the payment, the payer must log in the virtual branch of their bank (The bank must appear in the list of SPEI available banks). <br>First, the payer must register the PayU CLABE account in their bank branch. Once the PayU CLABE account is enabled to perform transfers, the payer must provide the reference returned by PayU in the parameter `trazabilityCode` and the amount as returned by PayU in their virtual branch.
* In the response body, you can find the needed variables to generate the payment receipt (voucher) and the URL of the receipt generated by PayU in HTML and PDF format. If you want to generate the voucher, use the following variables:
  - **trazabilityCode**: unique identifier of maximum 7 digits long; corresponds to the payment reference that the payer must provide in the virtual branch. It is mandatory to enter the same value in the reference field of the bank branch so the payment can be successful.
  - **value**: the payer must enter as transfer amount the same value informed in the request, so the payment can be successful.
  - **SPEI_CLABE_ACCOUNT_NUMBER**: is the PayU's interbank CLABE, namely, the account where the amount will be transferred. The payer must register this CLABE as beneficiary in their bank branch before performing the transfer.
  - **SPEI_BANK_NAME**: name associated with the PayU CLABE account. The beneficiary account is associated with the STP bank and it's always the same bank for PayU.

### API Call

The following are the bodies of the request and response of this payment method.

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
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
         "accountId": "512324",
         "referenceCode": "PRODUCT_TEST_2021-06-22T17:33:42.775Z",
         "description": "payment test",
         "language": "es",
         "signature": "6fd48e7150c652833866799a3fbf87bb",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "MXN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Domingo Diez 1589",
               "street2": "5555487",
               "city": "Cuernavaca",
               "state": "Morelos",
               "country": "MX",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "5555487",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
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
         "birthdate": "1994-06-21",
         "billingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "125544",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "SPEI",
      "expirationDate": "2021-06-23T22:30:21.231",
      "paymentCountry": "MX",
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
        "orderId": 1400447116,
        "transactionId": "16d49526-8d29-4bec-8c56-478491ddb327",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "25914",
        "authorizationCode": null,
        "pendingReason": "AWAITING_PAYMENT_IN_ENTITY",
        "responseCode": "PENDING_PAYMENT_IN_ENTITY",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624383022721,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "ELECTRONIC_PAYMENT",
            "EXPIRATION_DATE": "2021-06-23 23:59:59",
            "SPEI_BANK_NAME": "STP",
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=1400447116Y16d495268d294beY2063d953fc5dab2",
            "SPEI_CLABE_ACCOUNT_NUMBER": "646180132800000009",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app/V2?vid=1400447116Y16d495268d294beY2063d953fc5dab2",
            "PAYMENT_WAY_ID": "3"
        },
        "additionalInfo": {
            "paymentNetwork": "STP",
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
         <accountId>512324</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-22T17:33:42.775Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>6fd48e7150c652833866799a3fbf87bb</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>MXN</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <contactPhone>7563126</contactPhone>
            <dniNumber>123456789</dniNumber>
            <emailAddress>buyer_test@test.com</emailAddress>
            <fullName>First name and second buyer name</fullName>
            <merchantBuyerId>1</merchantBuyerId>
            <shippingAddress>
               <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <billingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>            
            <city>Cuernavaca</city>
            <state>Morelos</state>               
            <country>MX</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
         <birthdate>1994-06-21</birthdate>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <emailAddress>payer_test@test.com</emailAddress>
         <fullName>First name and second payer name</fullName>
         <merchantPayerId>1</merchantPayerId>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>SPEI</paymentMethod>
      <expirationDate>2021-06-23T22:30:21.231</expirationDate>
      <paymentCountry>MX</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e</deviceSessionId>
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
        <orderId>1400447132</orderId>
        <transactionId>62a8e1e4-3787-494b-93ca-a8ddb658a754</transactionId>
        <state>PENDING</state>
        <trazabilityCode>25915</trazabilityCode>
        <pendingReason>AWAITING_PAYMENT_IN_ENTITY</pendingReason>
        <responseCode>PENDING_PAYMENT_IN_ENTITY</responseCode>
        <operationDate>2021-06-22T12:39:50</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>ELECTRONIC_PAYMENT</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <string>2021-06-23 23:59:59</string>
            </entry>
            <entry>
                <string>SPEI_BANK_NAME</string>
                <string>STP</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=1400447132Y62a8e1e43787494Yef7e6cd39d91243</string>
            </entry>
            <entry>
                <string>SPEI_CLABE_ACCOUNT_NUMBER</string>
                <string>646180132800000009</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app/V2?vid=1400447132Y62a8e1e43787494Yef7e6cd39d91243</string>
            </entry>
            <entry>
                <string>PAYMENT_WAY_ID</string>
                <string>3</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>STP</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Submit Transactions Using Bank Reference

This method lets you process payments of your customers using bank references. To integrate with these transactions, you must redirect the customer to the URL found in the response of the method.

<img src="/assets/Payments/BankReferenceReceiptMX.png" alt="PrintScreen" width="50%">

### Parameters for Request and Response

<details>
<summary>Request</summary>
<label for="table4" class="showMandatory"><input type="checkbox" id="table4" name="table4" value="true" onchange="showMandatory(this)"> Show mandatory fields only</label>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `SUBMIT_TRANSACTION`. | Yes |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| merchant | Object |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| transaction | Object |  | This object has the transaction data. | Yes |
| transaction > order | Object |  | This object has the order data. | Yes |
| transaction > order > accountId | Number |  | Identifier of your account. | Yes |
| transaction > order > referenceCode | Alphanumeric | Min:1 Max:255 | Represents the identifier of the order in your system. | Yes |
| transaction > order > description | Alphanumeric | Min:1 Max:255 | Description of the order. | Yes |
| transaction > order > language | Alphanumeric | 2 | Language used in emails sent to the buyer and the seller. | Yes |
| transaction > order > notifyUrl | Alphanumeric | Max:2048 | Confirmation URL of the order. | No|
| transaction > order > partnerId | Alphanumeric | Max:255 | Partner ID in PayU. | No |
| transaction > order > signature | Alphanumeric | Max:255 | The signature associated to the form. For more information refer [Authentication signature]({{< ref "integrations.html#authentication-signature" >}}). | Yes |
| transaction > order > shippingAddress | Object |  | Shipping address. | No |
| transaction > order > shippingAddress > street1 | Alphanumeric | Max:100 | Address Line 1. | No |
| transaction > order > shippingAddress > street2 | Alphanumeric | Max:100 | Address Line 2. | No |
| transaction > order > shippingAddress > city | Alphanumeric | Max:50 | Address city. | No |
| transaction > order > shippingAddress > state | Alphanumeric | Max:40 | Address State. | No |
| transaction > order > shippingAddress > country | Alphanumeric | 2 | Address country. | No |
| transaction > order > shippingAddress > postalCode | Alphanumeric | Max:8 | Address Zip code. | No |
| transaction > order > shippingAddress > phone | Alphanumeric | Max:11 | Phone number associated to the address. | No |
| transaction > order > buyer | Object |  | Buyer information. | Yes |
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
| transaction > order > additionalValues > TX_VALUE > value | Number | 12, 2 | Specifies the amount of the transaction, this value may have two decimal digits (Ex. `10000.00` or `10000`). | Yes |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Yes |
| transaction > order > additionalValues > TX_TAX | Alphanumeric | 64 | Amount of the Value Added Tax (VAT). | Yes |
| transaction > order > additionalValues > TX_TAX > value | Number | 12, 2 | Specifies the amount of the VAT.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alphanumeric | 64 | Base value to calculate the VAT.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Number | 12, 2 | Specifies the base amount of the transaction. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > payer | Object |  | Payer information. | Yes |
| transaction > payer > emailAddress | Alphanumeric | Max:255 | Payer e-mail address. | Yes |
| transaction > payer > merchantPayerId | Alphanumeric | Max:100 | Identifier of the payer in your system. | No |
| transaction > payer > fullName | Alphanumeric | Max:150 | Name of the payer. | Yes |
| transaction > payer > billingAddress | Object |  | Billing address. | Yes |
| transaction > payer > billingAddress > street1 | Alphanumeric | Max:100 | Billing Address Line 1. | Yes |
| transaction > payer > billingAddress > street2 | Alphanumeric | Max:100 | Billing Address Line 2. | No |
| transaction > payer > billingAddress > city | Alphanumeric | Max:50 | Billing address city. | Yes |
| transaction > payer > billingAddress > state | Alphanumeric | Max:40 | Billing address state. | No |
| transaction > payer > billingAddress > country | Alphanumeric | 2 | Billing address country in format ISO 3166 Alpha-2. | Yes |
| transaction > payer > billingAddress > postalCode | Alphanumeric | Max:20 | Billing address zip code. | Yes |
| transaction > payer > billingAddress > phone | Alphanumeric | Max:20 | Billing address phone number. | No |
| transaction > payer > birthdate | Alphanumeric | Max:10 | Payer's date of birth. Format `YYYY-MM-DD`. | Yes |
| transaction > payer > contactPhone | Alphanumeric | Max:20 | Payer's phone number. | Yes |
| transaction > payer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. | Yes |
| transaction > payer > dniType | Alphanumeric | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alphanumeric | 32 | As payments with Bank reference are performed in physical offices, the only available transaction type is `AUTHORIZATION_AND_CAPTURE` | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid Bank reference Payment Method. [See the available Payment Methods for Mexico]({{< ref "select-your-payment-method.html#mexico" >}}). | Yes |
| transaction > paymentCountry | Alphanumeric | 2 | Set `MX` for Mexico. | Yes |
| transaction > ipAddress | Alphanumeric | Max:39 | IP address of the device where the customer performs the transaction. | Yes |
</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse | Object |  | The response data. |
| transactionResponse > orderId | Number |  | The generated or existing order Id in PayU. |
| transactionResponse > transactionId | Alphanumeric | 36 | The identifier of the transaction in PayU. |
| transactionResponse > state | Alphanumeric | Max:32 | The status of the transaction. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alphanumeric | Max:255 | The response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alphanumeric | Max:255 | The error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alphanumeric | Max:32 | The traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alphanumeric | Max:12 | The authorization code returned by the financial network. |
| transactionResponse > pendingReason | Alphanumeric | Max:21 | The reason code associated with the status, as mentioned in `transactionResponse > state`, the transaction is waiting for the payment. |
| transactionResponse > responseCode | Alphanumeric | Max:64 | The response code associated with the status. In this case, for successful transactions is `PENDING_PAYMENT_IN_ENTITY`. |
| transactionResponse > responseMessage | Alphanumeric | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date |  | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters | Object |  | Additional parameters or data associated with the response.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"SPEI_CLABE_ACCOUNT_NUMBER": "646180132800000009"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>SPEI_CLABE_ACCOUNT_NUMBER</string>`<br>&emsp;&emsp;`<string>646180132800000009</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo | Object |  | Additional information associated with the response. This object follows the same structure than `transactionResponse.extraParameters`. |

</details>

#### Considerations

* The parameter `transaction.expirationDate` is not mandatory. If you don't send this parameter, its default value is seven (7) days after the current date.<br>If you send a date later than the default number of days, PayU will ignore this value and the expiration will be set as default.
* The parameter `transactionResponse.extraParameters` has the following parameters related to the transaction:
   - **REFERENCE**: internal payment reference generated by PayU.
   - **EXPIRATION_DATE**: maximum term for the payer to perform the payment.
   - **BAR_CODE**: barcode which lets the payer perform the payment. 
   - **URL_PAYMENT_RECEIPT_HTML**: payment receipt in HTML format. This is where you need to redirect the payment when the payer selects bank reference payment. 
   - **URL_PAYMENT_RECEIPT_PDF**: payment receipt in PDF format.

### API Call

The following are the bodies of the request and response of this payment method.

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
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
         "accountId": "512324",
         "referenceCode": "PRODUCT_TEST_2021-06-22T17:33:42.775Z",
         "description": "payment test",
         "language": "es",
         "signature": "6fd48e7150c652833866799a3fbf87bb",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "MXN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Domingo Diez 1589",
               "street2": "5555487",
               "city": "Cuernavaca",
               "state": "Morelos",
               "country": "MX",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "5555487",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
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
         "birthdate": "1994-06-21",
         "billingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "125544",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
	  "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "BANK_REFERENCED",
      "expirationDate": "2021-06-23T22:46:20.551",
      "paymentCountry": "MX",
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
        "orderId": 857807112,
        "transactionId": "6f8b46f4-9c4c-4523-9d80-ab51c684a44d",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": null,
        "authorizationCode": null,
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": null,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "REFERENCE": 857807112,
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857807112Y6f8b46f49c4c452Y6a8c3d9204ae7c3",
            "EXPIRATION_DATE": 1624488380551,
            "BAR_CODE": "85780711227811246",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857807112Y6f8b46f49c4c452Y6a8c3d9204ae7c3"
        },
        "additionalInfo": {
            "paymentNetwork": "BANCOMER",
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
         <accountId>512324</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-22T17:33:42.775Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>6fd48e7150c652833866799a3fbf87bb</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>MXN</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <contactPhone>7563126</contactPhone>
            <dniNumber>123456789</dniNumber>
            <emailAddress>buyer_test@test.com</emailAddress>
            <fullName>First name and second buyer name</fullName>
            <merchantBuyerId>1</merchantBuyerId>
            <shippingAddress>
               <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <billingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>            
            <city>Cuernavaca</city>
            <state>Morelos</state>               
            <country>MX</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
         <birthdate>1994-06-21</birthdate>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <emailAddress>payer_test@test.com</emailAddress>
         <fullName>First name and second payer name</fullName>
         <merchantPayerId>1</merchantPayerId>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>BANK_REFERENCED</paymentMethod>
      <expirationDate>2021-06-23T22:46:20.551</expirationDate>
      <paymentCountry>MX</paymentCountry>
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
        <orderId>857807162</orderId>
        <transactionId>2b7547fd-a6e8-4bcc-8f82-883775d85380</transactionId>
        <state>PENDING</state>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <extraParameters>
            <entry>
                <string>REFERENCE</string>
                <int>857807162</int>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857807162Y2b7547fda6e84bcYa83c5dd72117110</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-23T17:54:58</date>
            </entry>
            <entry>
                <string>BAR_CODE</string>
                <string>85780716227811234</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857807162Y2b7547fda6e84bcYa83c5dd72117110</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>BANCOMER</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Available Payment Methods Query

This method returns a list of the payment methods available in all countries.

### Parameters for Request and Response

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

| Field Name | Format | Size | Description | Mandatory |
|-|-|-|-|:-:|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. | Yes |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. | Yes |
| paymentMethods | Object |  | List of the payment methods. | Yes |
| paymentMethods > paymentMethodComplete | Object |  | This object has the information of a payment method. | Yes |
| paymentMethods > paymentMethodComplete > id | Numeric |  | Payment method identifier. | Yes |
| paymentMethods > paymentMethodComplete > description | Alphanumeric | Max:32 | Payment method name. | Yes |
| paymentMethods > paymentMethodComplete > country | Alphanumeric | 2 | ISO code of the Payment method country. | Yes |

</details>

### API Call

The following are the bodies of the request and response of this method. For the sake of the example, the response here shows two payment methods. 

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}
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
            "id": "299",
            "description": "OTHERS_CASH_MX",
            "country": "MX",
            "enabled": true,
            "reason": null
        },
        {
            "id": "139",
            "description": "AMEX",
            "country": "MX",
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
            <id>299</id>
            <description>OTHERS_CASH_MX</description>
            <country>MX</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>139</id>
            <description>AMEX</description>
            <country>MX</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
    </paymentMethods>
</paymentMethodsResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Ping

The ```PING``` method lets you verify the connection to our platform. 

### Parameters for Request and Response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|-|-|-|-|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `PING`. | Yes |
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
| code | Alphanumeric |  | The response code of the transaction. |
| error | Alphanumeric | Max:2048 | The error message associated if an error ocurred. |
| transactionResponse | Object | Max:2048 | The response of the PING method if an error ocurred. |
</details>

### API Call

The following are the bodies of the request and response of this method.

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}
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

