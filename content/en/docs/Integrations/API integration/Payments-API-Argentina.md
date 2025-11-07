---
title: "Payments API - Argentina"
linkTitle: "Payments API - Argentina"
date: 2021-05-03T15:48:08-05:00
description: >
  The Payments API for Argentina allows you to efficiently integrate PayU's payment processing features into your online shopping platform. Through this API, businesses can offer their customers a wide variety of payment methods, including cash, credit cards, and debit cards.
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

## Available Features

Payments API includes the following features:

* [Submit Transactions Using Credit or Debit Cards]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}})
* [Submit Transactions Using Cash]({{< ref "Payments-API-Argentina.md#submit-transactions-using-cash" >}})
* [Include Passenger Name Record Information]({{< ref "#include-passenger-name-record-information-optional" >}})
* [Available Payment Methods Query]({{< ref "Payments-API-Argentina.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-API-Argentina.md#ping" >}})

{{% alert title="Note" color="info"%}}

To confirm the status of a transaction, you can use one of the following options:
* Navigate to the the URL set in the `transaction.notifyUrl` variable or the _**Confirmation URL**_ option located in the PayU Module in _**Settings**_ > _**Technical configuration**_.
* Use the [Queries API or SDK]({{< ref "Queries.md" >}}).

{{% /alert %}}

## Submit Transactions Using Credit or Debit Cards

This method lets you process the payments performed by your customers using credit or debit cards. For Argentina, you can perform the two-step flows (**Authorization**, **Capture**), and one-step flows (**Charge**). For more information, refer to [Payment flows]({{< ref "payments.md#payment-flows" >}}).

### Using Tokenized Cards

PayU supports payments with your tokenized card, enabling you to make regular payments with a card stored in a token. A credit card token replaces the sensitive information of a credit card, allowing you to store it safely in compliance with PCI DSS (Payment Card Industry Data Security Standard) security standards.

PayU can process payments using the following services:

* **PayU Tokenization**.<br>We offer our own service to tokenize your credit cards upon request. This service allows you to tokenize your customers’ credit card information (regardless of their franchise) using our API or SDK integration. <br><br>For more information, refer to [PayU Tokenization]({{< ref "Tokenization.md" >}}).

* **MasterCard Digital Enablement Service - MDES**.<br>A tokenization service provided by Mastercard. This service enables you to tokenize the Primary Account Number of MasterCard credit cards, allowing you to use them for regular payments or to build one-click payment features.<br><br>For more information, refer to [MasterCard Digital Enablement Service (MDES)](https://developer.mastercard.com/mdes-digital-enablement/documentation/).

* **Visa Token Service - VTS**.<br>A tokenization service provided by Visa. This service allows you to store the sensitive information of Visa credit cards in a token, enabling you to use them for regular payments or to build one-click payment features.<br><br>For more information, refer to [Visa Token Service (VTS)](https://usa.visa.com/products/visa-token-service.html).

#### Pay with PayU Tokens

To make payments using PayU credit card tokens, include the parameter `transaction.creditCardTokenId` in place of the credit card information. 

The following example shows the body of the request at a high level for a one-step flow. It doesn't include request parameters.

{{% alert title="Note" color="info"%}}

To process a payment without the CVV, you must set the parameter `creditCard.processWithoutCvv2` to `true` in the payment request and omit the parameter `creditCard.securityCode`.<br>
By default, processing credit cards without a security code is not enabled. To enable this feature, please contact your sales representative.

{{% /alert %}}

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
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

#### Pay with MDES or VTS Tokens

If you are tokenizing your customer's credit cards using MDES or VTS, you can configure the token information in the parameter `transaction.networkToken`, replacing the credit card information, and set the parameter `creditCard.processWithoutCvv2` to `true`.

By default, processing credit cards without a security code is not enabled. Please contact your sales representative to enable this feature.

The following example demonstrates the body of the request at a high level for a one-step flow. It doesn't include request parameters.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
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
         "Information of the order":""
      },
      "payer": {
         "Information of the payer":""
      },
      "networkToken": {
          "tokenPan": "4097440000000004",
          "cryptogram": "11223344556677889900112233445566778899",
          "expiry": "2028/01"
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
         <!-- Information of the order -->
      </order>
      <payer>
         <!-- Information of the payer -->
      </payer>
      <networkToken>
         <tokenPan>4097440000000004</tokenPan>
         <cryptogram>11223344556677889900112233445566778899</cryptogram>
         <expiry>2028/01</expiry>
      </networkToken>
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

Find the description of the object `transaction.networkToken` and its parameters in the [Parameters]({{< ref "#parameters-for-request-and-response" >}}) section.

### Parameters for Request and Response

<details>
<summary><b>Request</b></summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Show mandatory fields only</label>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| `language` | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| `command` | Alphanumeric | Max:32 | Set `SUBMIT_TRANSACTION`. | Yes |
| `test` (JSON)<hr>`isTest` (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| `merchant` | Object |  | This object has the authentication data. | Yes |
| `merchant > apiLogin` | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| `merchant > apiKey` | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| `transaction` | Object |  | This object has the transaction data. | Yes |
| `transaction > order` | Object |  | This object has the order data. | Yes |
| `transaction > order > accountId` | Number |  | Identifier of your account. | Yes |
| `transaction > order > referenceCode` | Alphanumeric | Min:1 Max:255 | Represents the identifier of the order in your system. | Yes |
| `transaction > order > description` | Alphanumeric | Min:1 Max:255 | Description of the order. | Yes |
| `transaction > order > language` | Alphanumeric | 2 | Language used in emails sent to the buyer and the seller. | Yes |
| `transaction > order > notifyUrl` | Alphanumeric | Max:2048 | Confirmation URL of the order. | No |
| `transaction > order > partnerId` | Alphanumeric | Max:255 | Partner ID in PayU. | No |
| `transaction > order > signature` | Alphanumeric | Max:255 | The signature associated to the form. For more information refer [Authentication signature]({{< ref "integrations.html#authentication-signature" >}}). | Yes |
| `transaction > order > shippingAddress` | Object |  | Shipping address. | No |
| `transaction > order > shippingAddress > street1` | Alphanumeric | Max:100 | Address Line 1. | No |
| `transaction > order > shippingAddress > street2` | Alphanumeric | Max:100 | Address Line 2. | No |
| `transaction > order > shippingAddress > city` | Alphanumeric | Max:50 | Address city. | No |
| `transaction > order > shippingAddress > state` | Alphanumeric | Max:40 | Address State. | No |
| `transaction > order > shippingAddress > country` | Alphanumeric | 2 | Address country. | No |
| `transaction > order > shippingAddress > postalCode` | Alphanumeric | Max:8 | Address Zip code. | No |
| `transaction > order > shippingAddress > phone` | Alphanumeric | Max:11 | Phone number associated to the address. | No |
| `transaction > order > buyer` | Object |  | Buyer information. | Yes |
| `transaction > order > buyer > merchantBuyerId` | Alphanumeric | Max:100 | Buyer ID in your system. | No |
| `transaction > order > buyer > fullName` | Alphanumeric | Max:150 | Full name of the buyer. | Yes |
| `transaction > order > buyer > emailAddress` | Alphanumeric | Max:255 | E-mail of the buyer. | Yes |
| `transaction > order > buyer > contactPhone` | Alphanumeric | Max:20 | Phone number of the buyer. | Yes |
| `transaction > order > buyer > dniNumber` | Alphanumeric | Max:20 | Identification number of the buyer. | Yes |
| `transaction > order > buyer > shippingAddress` | Alphanumeric |  | Shipping address of the buyer. | Yes |
| `transaction > order > buyer > shippingAddress > street1` | Alphanumeric | Max:150 | Buyer's shipping address Line 1. | Yes |
| `transaction > order > buyer > shippingAddress > city` | Alphanumeric | Max:50 | Buyer's shipping address city. | Yes |
| `transaction > order > buyer > shippingAddress > state` | Alphanumeric | Max:40 | Buyer's shipping address state. | Yes |
| `transaction > order > buyer > shippingAddress > countr` | Alphanumeric | 2 | Buyer's shipping address country in format ISO 3166 alpha-2. | Yes |
| `transaction > order > buyer > shippingAddress > postalCode` | Number | Max:20 | Buyer's shipping address zip code. | Yes |
| `transaction > order > buyer > shippingAddress > phone` | Number | Max:20 | Buyer's shipping address phone number. | Yes |
| `transaction > order > additionalValues` | Object | 64 | Amount of the order or its associated values. | Yes |
| `transaction > order > additionalValues > TX_VALUE` | Alphanumeric | 64 | Amount of the transaction. | Yes |
| `transaction > order > additionalValues > TX_VALUE > value` | Number | 12, 2 | Specifies the amount of the transaction, this value may have two decimal digits (Ex. `10000.00` or `10000`). | Yes |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Yes |
| `transaction > order > additionalValues > TX_TAX` | Alphanumeric | 64 | Amount of the Value Added Tax (VAT). | Yes |
| `transaction > order > additionalValues > TX_TAX > value` | Number | 12, 2 | Specifies the amount of the VAT.  | No |
| `transaction > order > additionalValues > TX_TAX > currency` | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alphanumeric | 64 | Base value to calculate the VAT.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits.  | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Number | 12, 2 | Specifies the base amount of the transaction. | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > creditCardTokenId` | Alphanumeric |  | Include this parameter when the transaction is done using a tokenized card replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}) | No |
| `transaction > creditCard` | Object |  | Credit card information. If you process using debit card, do not send this parameter.<br>This object and its parameters are mandatory when the payment is performed using not tokenized credit card. | No |
| `transaction > creditCard > number` | Alphanumeric | Min:13 Max:20 | Credit card number. | No |
| `transaction > creditCard > securityCode` | Alphanumeric | Min:1 Max:4 | Credit card security code (CVC2, CVV2, CID). | No |
| `transaction > creditCard > expirationDate` | Alphanumeric | 7 | Credit card expiration date. Format `YYYY/MM`. | No |
| `transaction > creditCard > name` | Alphanumeric | Min:1 Max:255 | Holder's name displayed in the credit card. | No |
| `transaction > creditCard > processWithoutCvv2` | Boolean | Max:255 | Allows you to process transactions without including the credit card security code. Your commerce requires PayU's authorization before using this feature. | No |
| `transaction > debitCard` | Object |  | Debit card information. This object and its parameters are mandatory when the payment is performed using debit card. | No |
| `transaction > debitCard > number` | Alphanumeric | Min:13 Max:20 | Debit card number. | No |
| `transaction > debitCard > securityCode` | Alphanumeric | Min:1 Max:4 | Debit card security code (CVC2, CVV2, CID). | No |
| `transaction > debitCard > expirationDate` | Alphanumeric | 7 | Debit card expiration date. Format `YYYY/MM`. | No |
| `transaction > debitCard > name` | Alphanumeric | Min:1 Max:255 | Holder's name displayed in the debit card. | No |
| `transaction > payer` | Object |  | Payer information. For Argentina, to comply with tax regulations and ensure the correct calculation of taxes, you must send the payer’s billing address (`transaction.payer.billingAddress`), document type (`transaction.payer.dniType`), and document number (`transaction.payer.dniNumber`). The absence of this information may prevent the correct application of taxes. | Yes |
| `transaction > payer > emailAddress` | Alphanumeric | Max:255 | Payer e-mail address. | No |
| `transaction > payer > merchantPayerId` | Alphanumeric | Max:100 | Identifier of the payer in your system. | No |
| `transaction > payer > fullName` | Alphanumeric | Max:150 | Name of the payer which must meet the name sent in the parameter `creditCard.name` for credit card payments. | Sí |
| `transaction > payer > billingAddress` | Object |  | For Argentina, sending the full billing address is mandatory to comply with local tax regulations. | Yes |
| `transaction > payer > billingAddress > street1` | Alphanumeric | Max:100 | Billing Address Line 1. Mandatory for Argentina to comply with tax regulations. | Yes |
| `transaction > payer > billingAddress > street2` | Alphanumeric | Max:100 | Billing Address Line 2. | No |
| `transaction > payer > billingAddress > city` | Alphanumeric | Max:50 | Billing address city. Mandatory for Argentina to comply with tax regulations. | Yes |
| `transaction > payer > billingAddress > state` | Alphanumeric | Max:40 | Billing address province. Format [ISO 3166-2 ARG official](https://www.iso.org/obp/ui/#iso:code:3166:AR). For Argentina, this field is mandatory for tax calculation. | Yes |
| `transaction > payer > billingAddress > country` | Alphanumeric | 2 | Billing address country in format ISO 3166 Alpha-2. | Yes |
| `transaction > payer > billingAddress > postalCode` | Alphanumeric | Max:20 | Billing address zip code. | No |
| `transaction > payer > billingAddress > phone` | Alphanumeric | Max:20 | Billing address phone number. | No |
| `transaction > payer > birthdate` | Alphanumeric | Max:10 |Buyer's date of birth. | No |
| `transaction > payer > contactPhone` | Alphanumeric | Max:20 | Buyer's phone number. | No |
| `transaction > payer > dniNumber` | Alphanumeric | Max:20 | Identification number of the payer. For Argentina, this field is mandatory for tax calculation. The number must be valid for the country (e.g., `CUIT`: 27-28033514-8, `CUIL`: 20-12345678-9, `DNI`: 45678901). | Yes |
| `transaction > payer > dniType` | Alphanumeric | 2 | Identification type of the payer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). For Argentina, this field is mandatory for tax calculation. Use `CUIT` or `CUIL` as the document type (other types are accepted but not recommended for tax purposes). | Yes |
| `transaction > networkToken` | Object |  | Information of the token. Include this parameter when the transaction is done using a tokenized card with VTS or MDES Tokenization. For more information, refer to [Pay with MDES or VTS tokens](https://developers.payulatam.com/latam/en/docs/integrations/api-integration/payments-api-brazil.html#pay-with-mdes-or-vts-tokens). *When sending this object, all its parameters are mandatory.  | No |
| `transaction > networkToken > tokenPan` | Alphanumeric | Max: 32 | Token number generated either by MDES or VTS. | Yes* |
| `transaction > networkToken > cryptogram` | Alphanumeric | Max: 28 | Unique key generated by MDES or VTS to decrypt the information of the credit card. | Yes* |
| `transaction > networkToken > expiry` | Alphanumeric | Max: 7 | Expiration date of the token. Format YYYY/MM. | Yes* |
| `transaction > type` | Alphanumeric | 32 | Set this value according to the transaction you want:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` for one-step flows.</li></ul> | Yes |
| `transaction > paymentMethod` | Alphanumeric | 32 | Select a valid Credit or Debit card Payment Method. [See the available Payment Methods for Argentina]({{< ref "select-your-payment-method.html#Argentina" >}}). | Yes |
| `transaction > paymentCountry` | Alphanumeric | 2 | Set `AR` for Argentina. | Yes |
| `transaction > deviceSessionId` | Alphanumeric | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Yes |
| `transaction > ipAddress` | Alphanumeric | Max:39 | IP address of the device where the customer performs the transaction. | Yes |
| `transaction > cookie` | Alphanumeric | Max:255 | Cookie stored by the device where the customer performs the transaction. | Yes |
| `transaction > userAgent` | Alphanumeric | Max:1024 | The User agent of the browser where the customer performs the transaction. | Yes |
| `transaction > extraParameters` | Object |  | Additional parameters or data associated with the request. The maximum size of each _extraParameters_ name is 64 characters.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | No |
| `transaction > threeDomainSecure` | Object |  | This object contains the information of 3DS 2.0. | No |
| `transaction > threeDomainSecure > embedded` | Boolean |  | Set `true` if you want to use and embedded MPI for the Authorization process. By default, this value is set as `false`. | No |
| `transaction > threeDomainSecure > eci` | Number | Max:2 | Electronic Commerce Indicator.<br>Value returned by the directory servers showing the authentication attempt.<br>This parameter is mandatory when `transaction.threeDomainSecure.embedded` is `false` and `transaction.threeDomainSecure.xid` has been set. | No |
| `transaction > threeDomainSecure > cavv` | Alphanumeric | Max:28 | Cardholder Authentication Verification Value.<br>Code of the cryptogram used in the transaction authentication in Base64.<br>Depending on the specific ECI codes established by the process network, this value may be optional. | No |
| `transaction > threeDomainSecure > xid` | Alphanumeric | Max:28 | Transaction ID sent by the MPI in Base64.<br>This parameter is mandatory when `transaction.threeDomainSecure.embedded` is `false` and `transaction.threeDomainSecure.eci` has been set. | No |
| `transaction > threeDomainSecure > directoryServerTransactionId` | Alphanumeric | Max:36 | Transaction ID generated by the Directory Server during the Authentication. | No |

</details>

<details>
<summary><b>Response</b></summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| `code` | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| `error` | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| `transactionResponse` | Object |  | The response data. |
| `transactionResponse > orderId` | Number |  | The generated or existing order Id in PayU. |
| `transactionResponse > transactionId` | Alphanumeric | 36 | The identifier of the transaction in PayU. |
| `transactionResponse > state` | Alphanumeric | Max:32 | The status of the transaction. |
| `transactionResponse > responseCode` | Alphanumeric | Max:64 | The response code associated with the status. |
| `transactionResponse > paymentNetworkResponseCode` | Alphanumeric | Max:255 | The response code returned by the financial network. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alphanumeric | Max:255 | The error message returned by the financial network. |
| `transactionResponse > trazabilityCode` | Alphanumeric | Max:32 | The traceability code returned by the financial network. |
| `transactionResponse > authorizationCode` | Alphanumeric | Max:12 | The authorization code returned by the financial network. |
| `transactionResponse > responseMessage` | Alphanumeric | Max:2048 | Message associated with the response code. |
| `transactionResponse > operationDate` | Date |  | Creation date of the response in the PayU´s system. |
| `transactionResponse > extraParameters` | Object |  | Additional parameters or data associated with the response. <br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Considerations

* For payments with Promotions, send the parameters `INSTALLMENTS_NUMBER` and `PROMOTION_ID` with the number of installments selected and the Id of the promotion. Refer to [Promotions API]({{< ref "Promotions.md" >}}) for more information.
* Promotions feature is only available for [one-step flows]({{< ref "Payments.md#payment-flows" >}}).
* For payments with credit card tokens, include the parameters `transaction.creditCardTokenId` and `transaction.creditCard.securityCode` (if you process with security code) replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}).
* For payments with credit card tokens generated using MDES or VTS, include the object `transaction.networkToken` and its parameters.
* By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative. After this feature is enabled for you, send in the request the variable `creditCard.processWithoutCvv2` as true and remove the variable `creditCard.securityCode`. Having this feature enabled is mandatory when using credit card tokens generated with MDES or VTS.
* When using credit cards, take into account the considerations due to Argentinian regulations for the check out page.
* The variable `transaction.threeDomainSecure` does not replace the card information nor any of the mandatory fields of the transaction. This object is additional and not mandatory.
* The variable `transaction.threeDomainSecure` corresponds to a _passthrough_ scenario where the commerce performs the authentication by their own.

<details>
      <summary><strong>Special consideration for tax regulations</strong></summary>      
      <p>To comply with Argentina’s tax authority regulations and ensure the correct calculation of taxes, it is mandatory to include the following fields in the request:</p>
      <ul>
        <li><strong>Billing address:</strong>(<code>transaction.payer.billingAddress</code>).</li>
        <ul>
        <li><strong>Province:</strong>(<code>transaction.payer.billingAddress.state</code>). Must follow the <a href="https://www.iso.org/obp/ui/#iso:code:3166:AR" target="_blank" rel="noopener noreferrer">ISO 3166-2 ARG official</a></li>
        </ul>      
      <li><strong>Document type:</strong>(<code>transaction.payer.dniType</code>). Use <code>CUIT</code> or <code>CUIL</code> as preferred types (other types are accepted but not recommended for tax purposes).</li>      
      <li><strong>Document number:</strong>(<code>transaction.payer.dniNumber</code>). Must be a valid identification number for Argentina (examples: <code>CUIT</code> <code>27-28033514-8</code>, <code>CUIL</code> <code>20-12345678-9</code>, <code>DNI</code> <code>45678901</code>).</li>
      </ul>     
</details>

<details>
      <summary><strong>Special consideration for Naranja cards</strong></summary>
      <p><strong>Special consideration:</strong> Naranja X Credit Cards (BIN 589562)</p>
      <p>Naranja X Credit Cards have a specific behavior in their OCR (card number) validation process:</p>
      <ul>
        <li><strong>Until April 17, 2023:</strong> Physical cards were issued using the Luhn 11 algorithm for the check digit.</li>
        <li><strong>Currently:</strong> All new cards are issued using the standard Luhn 10 algorithm.</li>
      </ul>
      <p><strong>Current status:</strong></p>
      <ul>
        <li>More than 80% of active physical cards now use Luhn 10.</li>
        <li>A small percentage still operate with Luhn 11, which will gradually phase out as cards are renewed.</li>
        <li>All Naranja X in-app virtual cards already use Luhn 10.</li>
      </ul>
      <p><strong>Recommendations for integrators:</strong></p>
      <ul>        
        <li>Implement dual validation for BIN 589562, supporting both Luhn 10 and Luhn 11 algorithms.</li>
        <li>Alternatively, skip checksum validation for this specific BIN and validate only the BIN number.</li>
      </ul>
      <p>These options help prevent unnecessary declines for valid transactions still using the Luhn 11 algorithm.</p>
    </details>

### Authorization

Use this method to perform the **Authorization** step of a two-step flow. In this step, you authorize the payment but the amount is not debited until you [capture]({{< ref "payments-api-argentina.md#capture" >}}) the funds.<br>The following are the request and response bodies for this transaction type.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
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
         "accountId": "512322",
         "referenceCode": "PRODUCT_TEST_2021-06-10T20:25:15.868Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "1ffceb14a71948fdeaba5aef81b8e511",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "ARS"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av Centenario 837",
               "street2": "5555487",
               "city": "San Isidro",
               "state": "AR-B",
               "country": "AR",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av Centenario 837",
            "street2": "5555487",
            "city": "San Isidro",
            "state": "AR-B",
            "country": "AR",
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
            "street1": "Av Centenario 837",
            "street2": "125544",
            "city": "San Isidro",
            "state": "AR-B",
            "country": "AR",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "creditCard": {
         "number": "4097440000000004",
         "securityCode": "777",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION",
      "paymentMethod": "VISA",
      "paymentCountry": "AR",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": false
}
```
<br>

**Response Example:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400421560,
        "transactionId": "db9d9d7f-b62c-4ed2-a3b9-d146d33bdaf5",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "db9d9d7f-b62c-4ed2-a3b9-d146d33bdaf5",
        "authorizationCode": "NPS-011111",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "APROBADA - Autorizada",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1623338717949,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT"
        },
        "additionalInfo": null
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
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <accountId>512322</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-10T20:48:38.620Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>52b975674c6b1435c81dde6b8e039730</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>ARS</currency>
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
               <street1>Av Centenario 837</street1>
               <street2>5555487</street2>
               <city>San Isidro</city>
               <state>AR-B</state>
               <country>AR</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av Centenario 837</street1>
            <street2>5555487</street2>
            <city>San Isidro</city>
            <state>AR-B</state>
            <country>AR</country>
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
            <street1>Av Centenario 837</street1>
            <street2>5555487</street2>
            <city>San Isidro</city>
            <state>AR-B</state>
            <country>AR</country>
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
      <paymentCountry>AR</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

**Response Example:**
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400421621</orderId>
        <transactionId>dd76e186-e4f1-487c-826b-df4e9b125bfa</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>0</paymentNetworkResponseCode>
        <trazabilityCode>dd76e186-e4f1-487c-826b-df4e9b125bfa</trazabilityCode>
        <authorizationCode>NPS-011111</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>APROBADA - Autorizada</responseMessage>
        <operationDate>2021-06-10T10:48:40</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Capture

Use this method to perform the **Capture** step of a two-step flow. In this step, you capture the funds previously [Authorized]({{< ref "payments-api-argentina.md#authorization" >}}) to transfer them to your PayU account.

#### Considerations

Take into account the following considerations for capture:
* The maximum time to capture an approved transaction is 14 days. After this time, the transaction is auto voided.
* Only the parameters displayed in the request body are mandatory to invoke a Capture transaction. Consider that the order and transaction ids must meet with a currently authorized transaction.
* You can perform partial captures on an authorized amount. For more information, see the [Partial Capture]({{< ref "#partial-capture" >}}) section.

The following are the request and response bodies for this transaction type.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Request Example:**
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
         "id": "1400421560"
      },
      "type": "CAPTURE",
      "parentTransactionId": "db9d9d7f-b62c-4ed2-a3b9-d146d33bdaf5"
   },
   "test": false
}
```
<br>

**Response Example:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400421560,
        "transactionId": "84ace270-d52d-4e85-b4cf-bbe8710db0d5",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "84ace270-d52d-4e85-b4cf-bbe8710db0d5",
        "authorizationCode": "NPS-011111",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "APROBADA - Autorizada",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1623339599368,
        "referenceQuestionnaire": null,
        "extraParameters": null,
        "additionalInfo": null
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
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <id>1400421560</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>db9d9d7f-b62c-4ed2-a3b9-d146d33bdaf5</parentTransactionId>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

**Response Example:**
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400421560</orderId>
        <transactionId>4522f4ac-4ff2-4e91-aa6c-7f2c2bf18d9d</transactionId>
        <state>DECLINED</state>
        <paymentNetworkResponseErrorMessage>El saldo disponible no es suficiente para procesar la transacción.</paymentNetworkResponseErrorMessage>
        <responseCode>INVALID_TRANSACTION</responseCode>
        <operationDate>2021-06-10T10:55:46</operationDate>
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

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Request Example:**
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
                "value": 25,
                "currency": "ARS"
            }
        },
        "type": "CAPTURE",
        "parentTransactionId": "4b6adba7-e43b-45f8-88a6-d290755d6c04"
    },
    "test": false
}
```
<br>

**Response Example:**
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

**Request Example:**
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
        <value>25</value>
        <currency>ARS</currency>
      </TX_VALUE>
    </additionalValues>
    <type>CAPTURE</type>
    <parentTransactionId>4b6adba7-e43b-45f8-88a6-d290755d6c04</parentTransactionId>
  </transaction>
  <test>false</test>
</request>

```
<br>

**Response Example:**
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

Use this method to perform a one-step flow, namely a charge. In this step, both steps of the two-step flow are combined in a single transaction and the funds are transferred from the customers account to your PayU account once they have been approved.

The following are the request and response bodies for this transaction type.

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
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
         "accountId": "512322",
         "referenceCode": "PRODUCT_TEST_2021-06-10T22:29:35.451Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "70f33e263fbcdf18103101dfc86671ab",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "ARS"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av Centenario 837",
               "street2": "5555487",
               "city": "San Isidro",
               "state": "AR-B",
               "country": "AR",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av Centenario 837",
            "street2": "5555487",
            "city": "San Isidro",
            "state": "AR-B",
            "country": "AR",
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
            "street1": "Av Centenario 837",
            "street2": "5555487",
            "city": "San Isidro",
            "state": "AR-B",
            "country": "AR",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "creditCard": {
         "number": "4850110000000000",
         "securityCode": "777",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "VISA",
      "paymentCountry": "AR",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": false
}
```
<br>

**Response Example:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400421870,
        "transactionId": "fc7e5dce-0b69-4865-b7c3-acb0170c1729",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "fc7e5dce-0b69-4865-b7c3-acb0170c1729",
        "authorizationCode": "NPS-011111",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "APROBADA - Autorizada",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1623346177300,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT"
        },
        "additionalInfo": null
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
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <accountId>512322</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-10T20:48:38.620Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>52b975674c6b1435c81dde6b8e039730</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>ARS</currency>
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
               <street1>Av Centenario 837</street1>
               <street2>5555487</street2>
               <city>San Isidro</city>
               <state>AR-B</state>
               <country>AR</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av Centenario 837</street1>
            <street2>5555487</street2>
            <city>San Isidro</city>
            <state>AR-B</state>
            <country>AR</country>
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
            <street1>Av Centenario 837</street1>
            <street2>5555487</street2>
            <city>San Isidro</city>
            <state>AR-B</state>
            <country>AR</country>
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
      <paymentCountry>AR</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>

```
<br>

**Response Example:**
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400421894</orderId>
        <transactionId>fc588a85-3122-4e4e-b958-a03d48b7438f</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>0</paymentNetworkResponseCode>
        <trazabilityCode>fc588a85-3122-4e4e-b958-a03d48b7438f</trazabilityCode>
        <authorizationCode>NPS-011111</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>APROBADA - Autorizada</responseMessage>
        <operationDate>2021-06-10T12:41:15</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Submit Transactions Using Cash

This method lets you process the payments in cash of your customers. To integrate with cash transactions, you must redirect the customer to the URL found in the response of the method; your customer sees a payment receipt like this.

<img src="/assets/Payments/CashReceiptAR.png" alt="PrintScreen" width="50%">

### Parameters for Request and Response

<details>
<summary><b>Request</b></summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Show mandatory fields only</label>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| `language` | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| `command` | Alphanumeric | Max:32 | Set `SUBMIT_TRANSACTION`. | Yes |
| `test` (JSON)<hr>`isTest` (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| `merchant` | Object |  | This object has the authentication data. | Yes |
| `merchant > apiLogin` | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| `merchant > apiKey` | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| `transaction` | Object |  | This object has the transaction data. | Yes |
| `transaction > order` | Object |  | This object has the order data. | Yes |
| `transaction > order > accountId` | Number |  | Identifier of your account. | Yes |
| `transaction > order > referenceCode` | Alphanumeric | Min:1 Max:255 | Represents the identifier of the order in your system. | Yes |
| `transaction > order > description` | Alphanumeric | Min:1 Max:255 | Description of the order. | Yes |
| `transaction > order > language` | Alphanumeric | 2 | Language used in emails sent to the buyer and the seller. | Yes |
| `transaction > order > notifyUrl` | Alphanumeric | Max:2048 | Confirmation URL of the order. | No |
| `transaction > order > partnerId` | Alphanumeric | Max:255 | Partner ID in PayU. | No |
| `transaction > order > signature` | Alphanumeric | Max:255 | The signature associated to the form. For more information refer [Authentication signature]({{< ref "integrations.html#authentication-signature" >}}). | Yes |
| `transaction > order > shippingAddress` | Object |  | Shipping address. | No |
| `transaction > order > shippingAddress > street1` | Alphanumeric | Max:100 | Address Line 1. | No |
| `transaction > order > shippingAddress > street2` | Alphanumeric | Max:100 | Address Line 2. | No |
| `transaction > order > shippingAddress > city` | Alphanumeric | Max:50 | Address city. | No |
| `transaction > order > shippingAddress > state` | Alphanumeric | Max:40 | Address State. | No |
| `transaction > order > shippingAddress > country` | Alphanumeric | 2 | Address country. | No |
| `transaction > order > shippingAddress > postalCode` | Alphanumeric | Max:8 | Address Zip code. | No |
| `transaction > order > shippingAddress > phone` | Alphanumeric | Max:11 | Phone number associated to the address. | No |
| `transaction > order > buyer` | Object |  | Buyer information. | Yes |
| `transaction > order > buyer > merchantBuyerId` | Alphanumeric | Max:100 | Buyer ID in your system. | No |
| `transaction > order > buyer > fullName` | Alphanumeric | Max:150 | Full name of the buyer. | Yes |
| `transaction > order > buyer > emailAddress` | Alphanumeric | Max:255 | E-mail of the buyer. | Yes |
| `transaction > order > buyer > contactPhone` | Alphanumeric | Max:20 | Phone number of the buyer. | Yes |
| `transaction > order > buyer > dniNumber` | Alphanumeric | Max:20 | Identification number of the buyer. | Yes |
| `transaction > order > buyer > shippingAddress` | Alphanumeric |  | Shipping address of the buyer. | Yes |
| `transaction > order > buyer > shippingAddress > street1` | Alphanumeric | Max:150 | Buyer's shipping address Line 1. | Yes |
| `transaction > order > buyer > shippingAddress > city` | Alphanumeric | Max:50 | Buyer's shipping address city. | Yes | 
| `transaction > order > buyer > shippingAddress > state` | Alphanumeric | Max:40 | Buyer's shipping address state. | Yes |
| `transaction > order > buyer > shippingAddress > country` | Alphanumeric | 2 | Buyer's shipping address country in format ISO 3166 alpha-2. | Yes |
| `transaction > order > buyer > shippingAddress > postalCode` | Number | Max:20 | Buyer's shipping address zip code. | Yes |
| `transaction > order > buyer > shippingAddress > phone` | Number | Max:20 | Buyer's shipping address phone number. | Yes |
| `transaction > order > additionalValues` | Object | 64 | Amount of the order or its associated values. | Yes |
| `transaction > order > additionalValues > TX_VALUE` | Alphanumeric | 64 | Amount of the transaction. | Yes |
| `transaction > order > additionalValues > TX_VALUE > value` | Number | 12, 2 | Specifies the amount of the transaction, this value may have two decimal digits (Ex. `10000.00` or `10000`). | Yes |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Yes |
| `transaction > order > additionalValues > TX_TAX` | Alphanumeric | 64 | Amount of the Value Added Tax (VAT). | Yes |
| `transaction > order > additionalValues > TX_TAX > value` | Number | 12, 2 | Specifies the amount of the VAT.  | No |
| `transaction > order > additionalValues > TX_TAX > currency` | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alphanumeric | 64 | Base value to calculate the VAT.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits.  | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Number | 12, 2 | Specifies the base amount of the transaction. | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > payer` | Objeto |  | Payer information. For Argentina, to comply with tax regulations and ensure the correct calculation of taxes, you must send the payer’s billing address (`transaction.payer.billingAddress`), document type (`transaction.payer.dniType`), and document number (`transaction.payer.dniNumber`). The absence of this information may prevent the correct application of taxes. | Yes |
| `transaction > payer > emailAddress` | Alphanumeric | Max:255 | Payer e-mail address. | Yes |
| `transaction > payer > merchantPayerId` | Alphanumeric | Max:100 | Identifier of the payer in your system. | No |
| `transaction > payer > fullName` | Alphanumeric | Max:150 | Name of the payer. | Yes |
| `transaction > payer > billingAddress` | Object |  | For Argentina, sending the full billing address is mandatory to comply with local tax regulations. | Yes |
| `transaction > payer > billingAddress > street1` | Alphanumeric | Max:100 | Billing Address Line 1. Mandatory for Argentina to comply with tax regulations. | Yes |
| `transaction > payer > billingAddress > street2` | Alphanumeric | Max:100 | Billing Address Line 2. | No |
| `transaction > payer > billingAddress > city` | Alphanumeric | Max:50 | Billing address city. Mandatory for Argentina to comply with tax regulations. | Yes |
| `transaction > payer > billingAddress > state` | Alphanumeric | Max:40 | Billing address province. Format [ISO 3166-2 ARG official](https://www.iso.org/obp/ui/#iso:code:3166:AR). For Argentina, this field is mandatory for tax calculation. | Yes |
| `transaction > payer > billingAddress > country` | Alphanumeric | 2 | Billing address country in format ISO 3166 Alpha-2. | Yes |
| `transaction > payer > billingAddress > postalCode` | Alphanumeric | Max:20 | Billing address zip code. | No |
| `transaction > payer > billingAddress > phone` | Alphanumeric | Max:20 | Billing address phone number. | No |
| `transaction > payer > birthdate` | Alphanumeric | Max:10 | Payer's date of birth. | No |
| `transaction > payer > contactPhone` | Alphanumeric | Max:20 | Payer's phone number. | Yes |
| `transaction > payer > dniNumber` | Alphanumeric | Max:20 | Identification number of the payer. For Argentina, this field is mandatory for tax calculation. The number must be valid for the country (e.g., `CUIT`: 27-28033514-8, `CUIL`: 20-12345678-9, `DNI`: 45678901). | Yes |
| `transaction > payer > dniType` | Alphanumeric | 2 | Identification type of the payer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). For Argentina, this field is mandatory for tax calculation. Use `CUIT` or `CUIL` as the document type (other types are accepted but not recommended for tax purposes). | Yes |
| `transaction > type` | Alphanumeric | 32 | As cash payments are performed in physical offices, the only available transaction type is `AUTHORIZATION_AND_CAPTURE` | Yes |
| `transaction > paymentMethod` | Alphanumeric | 32 | Select a valid Payment Method in cash. [See the available Payment Methods for Argentina]({{< ref "select-your-payment-method.html#Argentina" >}}). | Yes |
| `transaction > paymentCountry` | Alphanumeric | 2 | Set `AR` for Argentina. | Yes |
| `transaction > expirationDate` | Alphanumeric | 23 | Maximum date and time that the payer has to make the payment. Format `YYYY-MM-DDTHH:MM:SS`, for example `2021-06-12T16:07:11.586`. | No |
| `transaction > ipAddress` | Alphanumeric | Max:39 | IP address of the device where the customer performs the transaction. | Yes |

</details>

<details>
<summary><b>Response</b></summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| `code` | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| `error` | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| `transactionResponse` | Object |  | The response data. |
| `transactionResponse > orderId` | Number |  | The generated or existing order Id in PayU. |
| `transactionResponse > transactionId` | Alphanumeric | 36 | The identifier of the transaction in PayU. |
| `transactionResponse > state` | Alphanumeric | Max:32 | The status of the transaction. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| `transactionResponse > paymentNetworkResponseCode` | Alphanumeric | Max:255 | The response code returned by the financial network. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alphanumeric | Max:255 | The error message returned by the financial network. |
| `transactionResponse > trazabilityCode` | Alphanumeric | Max:32 | The traceability code returned by the financial network. |
| `transactionResponse > authorizationCode` | Alphanumeric | Max:12 | The authorization code returned by the financial network. |
| `transactionResponse > pendingReason` | Alphanumeric | Max:21 | The reason code associated with the status, as mentioned in `transactionResponse > state`, the transaction is waiting for the payment. |
| `transactionResponse > responseCode` | Alphanumeric | Max:64 | The response code associated with the status. In this case, for successful transactions is `PENDING_TRANSACTION_CONFIRMATION`. |
| `transactionResponse > responseMessage` | Alphanumeric | Max:2048 | Message associated with the response code. |
| `transactionResponse > operationDate` | Date |  | Creation date of the response in the PayU´s system. |
| `transactionResponse > extraParameters` | Object |  | Additional parameters or data associated with the response.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"REFERENCE": "74794"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>REFERENCE</string>`<br>&emsp;&emsp;`<int>74794</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Considerations

* The parameter `transaction.expirationDate` is not mandatory. If you don't send this parameter, its default value is 15 days after the current date.<br>If you send a date later than the default number of days, PayU will ignore this value and the expiration will be set as default.
* The parameter `transactionResponse.extraParameters` has the following parameters related to the transaction:
   - **REFERENCE**: internal payment reference generated by PayU.
   - **EXPIRATION_DATE**: maximum term for the payer to perform the payment.
   - **BAR_CODE**: barcode which lets the payer perform the payment. 
   - **URL_PAYMENT_RECEIPT_HTML**: payment receipt in HTML format. This is where you need to redirect the payment when the payer selects cash payment. 
   - **URL_PAYMENT_RECEIPT_PDF**: payment receipt in PDF format.

<details>
      <summary><strong>Special consideration for tax regulations</strong></summary>      
      <p>To comply with Argentina’s tax authority regulations and ensure the correct calculation of taxes, it is mandatory to include the following fields in the request:</p>
      <ul>
        <li><strong>Billing address:</strong>(<code>transaction.payer.billingAddress</code>).</li>
        <ul>
        <li><strong>Province:</strong>(<code>transaction.payer.billingAddress.state</code>). Must follow the <a href="https://www.iso.org/obp/ui/#iso:code:3166:AR" target="_blank" rel="noopener noreferrer">ISO 3166-2 ARG official</a></li>
        </ul>      
      <li><strong>Document type:</strong>(<code>transaction.payer.dniType</code>). Use <code>CUIT</code> or <code>CUIL</code> as preferred types (other types are accepted but not recommended for tax purposes).</li>      
      <li><strong>Document number:</strong>(<code>transaction.payer.dniNumber</code>). Must be a valid identification number for Argentina (examples: <code>CUIT</code> <code>27-28033514-8</code>, <code>CUIL</code> <code>20-12345678-9</code>, <code>DNI</code> <code>45678901</code>).</li>
      </ul>     
</details>

### API Call {#api-call}

The following are the bodies of the request and response of this payment method.

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
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
         "accountId": "512322",
         "referenceCode": "PRODUCT_TEST_2021-06-10T20:25:15.868Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "1ffceb14a71948fdeaba5aef81b8e511",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "ARS"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "5415668464654",
            "shippingAddress": {
               "street1": "Av Centenario 837",
               "street2": "5555487",
               "city": "San Isidro",
               "state": "AR-B",
               "country": "AR",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av Centenario 837",
            "street2": "5555487",
            "city": "San Isidro",
            "state": "AR-B",
            "country": "AR",
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
            "street1": "Av Centenario 837",
            "street2": "125544",
            "city": "San Isidro",
            "state": "AR-B",
            "country": "AR",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
	  "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "PAGOFACIL",
      "expirationDate": "2021-06-12T16:07:11",
      "paymentCountry": "AR",
      "ipAddress": "127.0.0.1"
   },
   "test": false
}
```
<br>

**Response Example:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 857787128,
        "transactionId": "702ee8a1-d99c-43cc-a097-167db0d7ff1a",
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
            "REFERENCE": 74794,
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857787128Y702ee8a1d99c43cY5769b4d7b64fa1e",
            "EXPIRATION_DATE": 1623514031586,
            "BAR_CODE": "99580010000074794000000000000000000001206211107000010000083",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857787128Y702ee8a1d99c43cY5769b4d7b64fa1e"
        },
        "additionalInfo": null
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
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <accountId>512322</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-15T14:40:25.549Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>1ffceb14a71948fdeaba5aef81b8e511</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>ARS</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <contactPhone>7563126</contactPhone>
            <dniNumber>5415668464654</dniNumber>
            <emailAddress>buyer_test@test.com</emailAddress>
            <fullName>First name and second buyer name</fullName>
            <merchantBuyerId>1</merchantBuyerId>
            <shippingAddress>
               <street1>Av Centenario 837</street1>
               <street2>5555487</street2>            
               <city>San Isidro</city>
               <state>AR-B</state>               
               <country>AR</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av Centenario 837</street1>
               <street2>5555487</street2>            
               <city>San Isidro</city>
               <state>AR-B</state>               
               <country>AR</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <billingAddress>
            <street1>Av Centenario 837</street1>
            <street2>5555487</street2>            
            <city>San Isidro</city>
            <state>AR-B</state>               
            <country>AR</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <emailAddress>payer_test@test.com</emailAddress>
         <fullName>First name and second payer name</fullName>
         <merchantPayerId>1</merchantPayerId>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>PAGOFACIL</paymentMethod>
      <expirationDate>2021-06-16T16:07:11</expirationDate>
      <paymentCountry>AR</paymentCountry>
      <ipAddress>127.0.0.1</ipAddress>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

**Response Example:**
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>857792249</orderId>
        <transactionId>96a2e817-e26a-456b-85d4-28df8c3a584e</transactionId>
        <state>PENDING</state>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <extraParameters>
            <entry>
                <string>REFERENCE</string>
                <int>75017</int>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857792249Y96a2e817e26a456Y47e0b9cb12503f6</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-16T11:07:11</date>
            </entry>
            <entry>
                <string>BAR_CODE</string>
                <string>99580010000075017000000000000000000001606211107000010000082</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857792249Y96a2e817e26a456Y47e0b9cb12503f6</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>

```

{{< /tab >}}
{{< /tabs >}}

## Include Passenger Name Record Information (Optional)

In addition to the previously provided transaction details, the API allows for the optional inclusion of Passenger Name Record (PNR) data. While particularly valuable for airlines and travel agencies, this feature extends its utility to any merchant using PayU's services across Latin American countries, even when not directly processing flight payments. The core benefit of PNR data is to significantly enhance transaction risk analysis through PayU's anti-fraud tools, providing a more comprehensive view of the transaction beyond just payment details.

The following parameters relate to PNR data and are optional. They are available in all Latin American countries where PayU operates. These fields are not sufficient on their own to complete a transaction request but are complementary for specific use cases where knowing details about the passenger and their travel itinerary can aid in fraud detection.

<details>
<summary><b>Request</b></summary>
<br>
<div class="variables"></div>

| **Field** | **Type** | **Size** | **Description** | **Example** |
|-|-|-|-|-|
| `transaction > pnr > id` | Alphanumeric | 32 | Passenger Name Record ID. | `PNR123456` |
| `transaction > pnr > reservationAgent > id` | Alphanumeric | 32 | Reservation agent ID. | `AGENT123` |
| `transaction > pnr > reservationAgent > firstName` | Alphanumeric | 255 | Reservation agent's first name(s). | `John` |
| `transaction > pnr > reservationAgent > lastName` | Alphanumeric   | 255 | Reservation agent's last name(s). | `Doe` |
| `transaction > pnr > reservationAgent > email` | Alphanumeric | 255 | Reservation agent's email address. | `agent@example.com` |
| `transaction > pnr > reservationAgent > officePhoneNumber` | Alphanumeric | 50 | Reservation agent's office phone number.| `+573001234567` |
| `transaction > pnr > reservationOffice > id` | Alphanumeric | 9 | Reservation office ID.| `OFFICE123`|
| `transaction > pnr > reservationOffice > country` | Alphanumeric | 2 | Reservation office country (ISO Code). | `CO` |
| `transaction > pnr > saleOffice > id` | Alphanumeric | 9 | Sale office ID. | `SALEOFF123`                |
| `transaction > pnr > saleOffice > country` | Alphanumeric | 2 | Sale office country (ISO Code). | `US` |
| `transaction > pnr > passengers[] > id` | Alphanumeric | 32 | Passenger ID. | `PASS12345` |
| `transaction > pnr > passengers[] > country` | Alphanumeric | 2 | Passenger country (ISO Code). | `AR`                        |
| `transaction > pnr > passengers[] > level` | Alphanumeric | 32 | Passenger level. | `GOLD`                      |
| `transaction > pnr > passengers[] > firstName` | Alphanumeric | 255 | Passenger first name(s). | `Maria`                     |
| `transaction > pnr > passengers[] > lastName` | Alphanumeric | 255 | Passenger last name(s). | `Gonzalez` |
| `transaction > pnr > passengers[] > documentType` | Number | 2 | Document type. Possible values are:<br>`0` = Not specified<br>`1` = Citizenship card (Cédula de ciudadanía)<br>`2` = Foreign citizenship card (Cédula de extranjería)<br>`3` = Tax identification number (Número de identificación tributaria)<br>`4` = Identity card (Tarjeta de identidad)<br>`5` = Passport (Pasaporte)<br>`6` = Social security number (Tarjeta de seguridad social)<br>`7` = Foreign identification number (Sociedad extranjera sin NIT)<br>`8` = Escrow (Fideicomiso)<br>`9` = Birth certificate (Registro civil)<br>`10` = Diplomatic card (Carnet diplomático) | `5` |
| `transaction > pnr > passengers[] > documentNumber` | Alphanumeric | 50 | Passenger document number. | `P12345678` |
| `transaction > pnr > passengers[] > email` | Alphanumeric | 255 | Passenger email address. | `passenger@example.com` |
| `transaction > pnr > passengers[] > officePhoneNumber` | Alphanumeric | 50 | Passenger office phone number. | `+573008765432`             |
| `transaction > pnr > passengers[] > homePhoneNumber` | Alphanumeric | 50 | Passenger home phone number. | `+573002345678`             |
| `transaction > pnr > passengers[] > mobilePhoneNumber` | Alphanumeric | 50 | Passenger mobile phone number. | `+573001234567` |
| `transaction > pnr > passengers[] > address > country` | Alphanumeric | 2 | Passenger address country (ISO Code). | `BR` |
| `transaction > pnr > passengers[] > address > city` | Alphanumeric | 65 | Passenger address city. | `São Paulo` |
| `transaction > pnr > passengers[] > address > street` | Alphanumeric | 255 | Passenger street address. | `Rua das Flores, 123` |
| `transaction > pnr > itinerary[] > departureDate` | Alphanumeric | 19 | Departure date in UTC format. | `2022-01-01T23:59:59` |
| `transaction > pnr > itinerary[] > arrivalDate` | Alphanumeric | 19 | Arrival date in UTC format. | `2022-01-02T23:59:59` |
| `transaction > pnr > itinerary[] > flightNumber` | Alphanumeric | 12 | Flight number. | `FL1234` |
| `transaction > pnr > itinerary[] > origin` | Alphanumeric | 8 | Origin. | `BOG` |
| `transaction > pnr > itinerary[] > destination` | Alphanumeric | 8 | Destination. | `MIA` |
| `transaction > pnr > itinerary[] > travelClass` | Alphanumeric | 2 | Reservation segment class. | `Y` |
| `transaction > pnr > itinerary[] > ticketType` | Alphanumeric | 50 | Ticket type. | `E-TICKET` |

</details>

{{% alert title="Note" color="info"%}}

When using XML format, itinerary parameters appear under `transaction > pnr > itinerary > segment` with the same structure but adjusted nesting.

{{% /alert %}}

#### API Call {#api-call-1}

The following are examples of the request for this method.

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Request Example:**
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

**Request Example:**
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

## Available Payment Methods Query

This method returns a list of the payment methods available in all countries.

### Parameters for Request and Response

<details>
<summary><b>Request</b></summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory | 
|-|-|-|-|:-:|
| `language` | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| `command` | Alphanumeric | Max:32 | Set `GET_PAYMENT_METHODS`. | Yes |
| `test` (JSON)<hr>`isTest` (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| `merchant` | Object |  | This object has the authentication data. | Yes |
| `merchant > apiLogin` | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| `merchant > apiKey` | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |

</details>

<details>
<summary><b>Response</b></summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|-|-|-|-|:-:|
| `code` | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. | Yes |
| `error` | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. | Yes |
| `paymentMethods` | Object |  | List of the payment methods. | Yes |
| `paymentMethods > paymentMethodComplete` | Object |  | This object has the information of a payment method. | Yes |
| `paymentMethods > paymentMethodComplete > id` | Numeric |  | Payment method identifier. | Yes |
| `paymentMethods > paymentMethodComplete > description` | Alphanumeric | Max:32 | Payment method name. | Yes |
| `paymentMethods > paymentMethodComplete > country` | Alphanumeric | 2 | ISO code of the Payment method country. | Yes |

</details>

### API Call {#api-call-2}

The following are the bodies of the request and response of this method. For the sake of the example, the response here shows two payment methods. 

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Request Example:**
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

**Response Example:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "paymentMethods": [
        {
            "id": "201",
            "description": "ARGENCARD",
            "country": "AR",
            "enabled": true,
            "reason": null
        },
        {
            "id": "212",
            "description": "MASTERCARD",
            "country": "AR",
            "enabled": true,
            "reason": null
        }
    ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Request Example:**
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

**Response Example:**
```XML
<paymentMethodsResponse>
    <code>SUCCESS</code>
    <paymentMethods>
        <paymentMethodComplete>
            <id>201</id>
            <description>ARGENCARD</description>
            <country>AR</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>212</id>
            <description>MASTERCARD</description>
            <country>AR</country>
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
<summary><b>Request</b></summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|-|-|-|-|:-:|
| `language` | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| `command` | Alphanumeric | Max:32 | Set `PING`. | Yes |
| `test` (JSON)<hr>`isTest` (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| `merchant` | Object |  | This object has the authentication data. | Yes |
| `merchant > apiLogin` | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| `merchant > apiKey` | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |

</details>

<details>
<summary><b>Response</b></summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description |
|-|-|-|-|
| `code` | Alphanumeric |  | The response code of the transaction. |
| `error` | Alphanumeric | Max:2048 | The error message associated if an error ocurred. |
| `transactionResponse` | Object | Max:2048 | The response of the PING method if an error ocurred. |
</details>

### API Call {#api-call-3}

The following are the bodies of the request and response of this method.

{{< tabs tabTotal="2" tabID="10" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Request Example:**
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

**Response Example:**
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

**Request Example:**
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

**Response Example:**
```XML
<paymentResponse>
    <code>SUCCESS</code>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}