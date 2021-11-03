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
* [Submit transaction with bank transfer]({{< ref "Payments-API-Brazil.md#submit-transaction-with-bank-transfer" >}})
* [Available payment methods query]({{< ref "Payments-API-Brazil.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-API-Brazil.md#ping" >}})

{{% alert title="Note" color="info"%}}
To confirm the status of a transaction, you can use one of the following options:
* Navigate to the the URL set in the `transaction.notifyUrl` variable or the _**Confirmation URL**_ option located in the PayU Module in _**Settings**_ > _**Technical configuration**_.
* Use the [Queries API or SDK]({{< ref "Queries.md" >}}).
{{% /alert %}}

## Submit transaction with credit cards
This method lets you process the payments performed by your customers using credit cards. For Brazil, you can perform the two-step flows (**Authorization**, **Capture**), and one-step flows (**Charge**). For more information, refer to [Payment flows]({{< ref "payments.md#payment-flows" >}}).

### Adding Payment Facilitators
Merchants can be considered as Payment Processor by franchises and the Central Bank. A payment processor is a legal entity that has money from sub-merchants. In the case of merchant bankruptcy and tax management, the Brazilian Central Bank wants to know the business's beneficiary.

To include the information of the sub-merchant, you need to include it in the request of the **Authorization**, and **Charge** flows using the `submerchant` object.

#### What is a Payment Facilitator?
A payment facilitator is a company that offers an alternative to contracting with a traditional payment organization by assuming responsibility for the flow of funds in a buyer-seller relationship.

Many merchants are choosing to work with payment facilitators because the payment facilitator possesses and manages the master account, thus assuming a risk. Merchants also choose a payment facilitator due the simplicity of setting up an account, typically occurring through a short application and underwriting evaluation.

#### What information is required?
You need to send the following information:

* Sub-merchant's internal identification (optional)
* Sub-merchant's Name (optional)
* Sub-merchant's ID Number (mandatory) _*Individuals or Legal Entities_
* Sub-merchant's Address (optional)
* Sub-merchant's State (mandatory)
* Sub-merchant's Postal Code (mandatory)
* Sub-merchant's Country (mandatory)

Find the description of these fields in the [Variables]({{< ref "#variables-for-request-and-response" >}}) section.

### Using tokenized cards
PayU supports payments with your tokenized card to let you make payments on a regular bases with a card stored in a token. A credit card token substitutes the sensitive information of a credit card and allows you to safely store it following PCI DSS (Payment Card Industry Data Security Standard) security standards.

PayU can process payments with the following services:

* **PayU Tokenization**.<br>We provide our own service to tokenize your credit cards enabled under request. This service lets you tokenize the information of your customers' credit cards (regardless of their franchise) using our API or SDK integration.<br>For more information, refer to [PayU Tokenization]({{< ref "Tokenization.md" >}}).

* **MasterCard Digital Enablement Service - MDES**.<br>Tokenization service provided by Mastercard. This service lets you tokenize the Primary Account Number of the MasterCard credit cards to let you use them to make regular payments of build one-click payments features.<br>For more information, refer to [MasterCard Digital Enablement Service (MDES)](https://developer.mastercard.com/mdes-digital-enablement/documentation/).

* **Visa Token Service - VTS**.<br>Tokenization service provided by Visa. This service lets you store the sensitive information of the Visa credit cards in a token to let you use them to make regular payments of build one-click payments features.<br>For more information, refer to [Visa Token Service (VTS)](https://usa.visa.com/products/visa-token-service.html).

#### Pay with PayU tokens
For payments with PayU credit card tokens, include the parameter `transaction.creditCardTokenId` replacing the information of the credit card. The following example shows the body of the request in a high level for a one-step flow, the details of the request are not provided.

{{% alert title="Note" color="info"%}}
To process without CVV is necessary to send the parameter `creditCard.processWithoutCvv2` as true in the payment request and remove the parameter `creditCard.securityCode`.<br>
By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative.
{{% /alert%}}

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}
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

#### Pay with MDES or VTS tokens
If you are tokenizing your customer's credit cards using MDES or VTS, you can configure the information of the token in the parameter `transaction.networkToken` replacing the information of the credit card and send the parameter `creditCard.processWithoutCvv2` as true.<br>By default, processing credit cards without security code is not enabled, contact your Sales representative to enable it.

The following example shows the body of the request in a high level for a one-step flow, the details of the request are not provided.

{{< tabs tabTotal="2" tabID="10" tabName1="JSON" tabName2="XML" >}}
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

Find the description of the object `transaction.networkToken` and its parameters in the [Variables]({{< ref "#variables-for-request-and-response" >}}) section.

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `SUBMIT_TRANSACTION`. | Yes |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| merchant |  |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| transaction |  |  | This object has the transaction data. | Yes |
| transaction > order |  |  | This object has the order data. | Yes |
| transaction > order > accountId | Number |  | Identifier of your account. | Yes |
| transaction > order > referenceCode | Alphanumeric | Min:1 Max:255 | Represents the identifier of the order in your system. | Yes |
| transaction > order > description | Alphanumeric | Min:1 Max:255 | Description of the order. | Yes |
| transaction > order > language | Alphanumeric | 2 | Language used in emails sent to the buyer and the seller. | Yes |
| transaction > order > notifyUrl | Alphanumeric | Max:2048 | Confirmation URL of the order. | No |
| transaction > order > partnerId | Alphanumeric | Max:255 | Partner ID in PayU. | No |
| transaction > order > signature | Alphanumeric | Max:255 | The signature associated to the form. For more information refer [Authentication signature]({{< ref "integrations.html#authentication-signature" >}}). | Yes |
| transaction > order > shippingAddress |  |  | Shipping address. | No |
| transaction > order > shippingAddress > street1 | Alphanumeric | Max:100 | Address Line 1. | No |
| transaction > order > shippingAddress > street2 | Alphanumeric | Max:100 | Address Line 2. | No |
| transaction > order > shippingAddress > city | Alphanumeric | Max:50 | Address city. | No |
| transaction > order > shippingAddress > state | Alphanumeric | Max:40 | Address State. For Brazil, only send two characters, For example, set `SP` for São Paulo. | No |
| transaction > order > shippingAddress > country | Alphanumeric | 2 | Address country. | No |
| transaction > order > shippingAddress > postalCode | Alphanumeric | Max:8 | Address Zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | No |
| transaction > order > shippingAddress > phone | Alphanumeric | Max:11 | Phone number associated to the address. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | No |
| transaction > order > buyer |  |  | Buyer information. | Yes |
| transaction > order > buyer > merchantBuyerId | Alphanumeric | Max:100 | Buyer ID in your system. | No |
| transaction > order > buyer > fullName | Alphanumeric | Max:150 | Full name of the buyer. | Yes |
| transaction > order > buyer > emailAddress | Alphanumeric | Max:255 | E-mail of the buyer. | Yes | Yes |
| transaction > order > buyer > contactPhone | Alphanumeric | Max:20 | Phone number of the buyer. | Yes |
| transaction > order > buyer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. You must use an algorithm to validate the CPF and must be set using the format `XXX.XXX.XXX-XX`. Example: `811.807.405-64`. | Yes |
| transaction > order > buyer > cnpj | Alphanumeric | Max:14 | Identification number of the buyer (For Legal person in Brazil). You must use an algorithm to validate the CNPJ and must be set using the format `XXXXXXXXXXXXXX`. Example: `32593371000110`. | Yes |
| transaction > order > buyer > shippingAddress | Alphanumeric |  | Shipping address of the buyer. | Yes |
| transaction > order > buyer > shippingAddress > street1 | Alphanumeric | Max:150 | Buyer's shipping address Line 1. | Yes |
| transaction > order > buyer > shippingAddress > city | Alphanumeric | Max:50 | Buyer's shipping address city. | Yes |
| transaction > order > buyer > shippingAddress > state | Alphanumeric | Max:40 | Buyer's shipping address state. For Brazil, only send two characters, For example, set `SP` for São Paulo. | Yes |
| transaction > order > buyer > shippingAddress > country | Alphanumeric | 2 | Buyer's shipping address country in format ISO 3166 alpha-2. | Yes |
| transaction > order > buyer > shippingAddress > postalCode | Number | Max:20 | Buyer's shipping address zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | Yes |
| transaction > order > buyer > shippingAddress > phone | Number | Max:20 | Buyer's shipping address phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Yes |
| transaction > order > additionalValues > |  | 64 | Amount of the order or its associated values. | Yes |
| transaction > order > additionalValues > TX_VALUE | Alphanumeric | 64 | Amount of the transaction. | Yes |
| transaction > order > additionalValues > TX_VALUE > value | Number | 19, 2 | Specifies the amount of the transaction, this value may have two decimal digits (Ex. `10000.00` or `10000`). | Yes |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Yes |
| transaction > order > additionalValues > TX_TAX | Alphanumeric | 64 | Amount of the Value Added Tax (VAT). | Yes |
| transaction > order > additionalValues > TX_TAX > value | Number | 19, 2 | Specifies the amount of the VAT.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alphanumeric | 64 | Base value to calculate the VAT.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Number | 19, 2 | Specifies the base amount of the transaction. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > submerchant |  |  | Information of the sub-merchant. If you don't send this parameter, PayU configures your merchant as sub-merchant. | No |
| transaction > order > submerchant > id | Alphanumeric | Max:15 | Internal ID of the sub-merchant if you use one to identify it. | No |
| transaction > order > submerchant > fullName | Alphanumeric | Max:150 | Full name of the sub-merchant. | No |
| transaction > order > submerchant > address |  |  | Sub-merchant address. The fields `state`, `country`, and `postalCode`are mandatory when sending this object. | No |
| transaction > order > submerchant > address > street1 | Alphanumeric | Max:100 | Address Line 1. | No |
| transaction > order > submerchant > address > street2 | Alphanumeric | Max:100 | Address Line 2. | No |
| transaction > order > submerchant > address > street3 | Alphanumeric | Max:100 | Address Line 3. | No |
| transaction > order > submerchant > address > city | Alphanumeric | Max:50 | Address city. | No |
| transaction > order > submerchant > address > state | Alphanumeric | Max:40 | Address State. For Brazil, only send two characters, For example, set `SP` for São Paulo. | Yes |
| transaction > order > submerchant > address > country | Alphanumeric | 2 | Address country. | Yes |
| transaction > order > submerchant > address > postalCode | Alphanumeric | Max:8 | Address Zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | Yes |
| transaction > order > submerchant > address > phone | Alphanumeric | Max:11 | Phone number associated to the address. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | No |
| transaction > order > submerchant > identification | Alphanumeric | Max:14 | Identification number of the buyer (For Legal person in Brazil). You must use an algorithm to validate the CNPJ and must be set using the format `XXXXXXXXXXXXXX`. Example: `32593371000110`. | No |
| transaction > order > submerchant > identificationType | Alphanumeric | Max:4 | Identification type of the sub-merchant. The possible values are `cnpj` or `cpf`. | No |
| transaction > creditCardTokenId |  |  | Include this parameter when the transaction is done using a tokenized card using the PayU Tokenization; moreover, it is mandatory to also send the parameter `transaction.creditCard.expirationDate`.<br>For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}). | No |
| transaction > creditCard |  |  | Credit card information. This object and its parameters are mandatory when the payment is performed using not tokenized credit card. | No |
| transaction > creditCard > number | Alphanumeric | Min:13 Max:20 | Credit card number. | No |
| transaction > creditCard > securityCode | Alphanumeric | Min:1 Max:4 | Credit card security code (CVC2, CVV2, CID). | No |
| transaction > creditCard > expirationDate | Alphanumeric | 7 | Credit card expiration date. Format `YYYY/MM`. This parameter is mandatory when the payment is performed using a tokenized credit card. | No |
| transaction > creditCard > name | Alphanumeric | Min:1 Max:255 | Holder's name displayed in the credit card. | No |
| transaction > creditCard > processWithoutCvv2 | Boolean | Max:255 | Allows you to process transactions without including the credit card security code. Your commerce requires PayU's authorization before using this feature. | No |
| transaction > payer |  |  | Payer information. | No |
| transaction > payer > emailAddress | Alphanumeric | Max:255 | Payer e-mail address. | No |
| transaction > payer > merchantPayerId | Alphanumeric | Max:100 | Identifier of the payer in your system. | No |
| transaction > payer > fullName | Alphanumeric | Max:150 | Name of the payer which must meet the name sent in the parameter `transaction.creditCard.name` for credit card payments. | No |
| transaction > payer > billingAddress |  |  | Billing address. | No |
| transaction > payer > billingAddress > street1 | Alphanumeric | Max:100 | Billing Address Line 1. | No |
| transaction > payer > billingAddress > street2 | Alphanumeric | Max:100 | Billing Address Line 2. | No |
| transaction > payer > billingAddress > city | Alphanumeric | Max:50 | Billing address city. | No |
| transaction > payer > billingAddress > state | Alphanumeric | Max:40 | Billing address state. For Brazil, only send two characters, For example, set `SP` for São Paulo. | No |
| transaction > payer > billingAddress > country | Alphanumeric | 2 | Billing address country in format ISO 3166 Alpha-2. | No |
| transaction > payer > billingAddress > postalCode | Alphanumeric | Max:20 | Billing address zip code. For Brazil, use the format `XXXXX-XXX` or ´. Example: `09210-710` or `09210710`. | No |
| transaction > payer > billingAddress > phone | Alphanumeric | Max:20 | Billing address phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | No |
| transaction > payer > birthdate | Alphanumeric | Max:10 | Payer's date of birth. | No |
| transaction > payer > contactPhone | Alphanumeric | Max:20 | Payer's phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | No |
| transaction > payer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. You must use an algorithm to validate the CPF and must be set using the format `XXX.XXX.XXX-XX`. Example: `811.807.405-64`. | No |
| transaction > payer > cnpj | Alphanumeric | Max:14 | Identification number of the buyer (For Legal person in Brazil). You must use an algorithm to validate the CNPJ and must be set using the format `XXXXXXXXXXXXXX`. Example: `32593371000110`. | No |
| transaction > payer > dniType | Alphanumeric | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > networkToken |  |  | Information of the token. Include this parameter when the transaction is done using a tokenized card using the VTS or MDES Tokenization. For more information, refer to [Pay with MDES or VTS tokens]({{< ref "#pay-with-mdes-or-vts-tokens" >}}). <br><sup>\*</sup>When sending this object, all its parameters are mandatory.| No |
| transaction > networkToken > tokenPan | Alphanumeric | Max:32 | Token number generated either by MDES or VTS. | Yes<sup>\*</sup> |
| transaction > networkToken > cryptogram | Alphanumeric | Max:28 | Unique key generated by MDES or VTS to decrypt the information of the credit card. | Yes<sup>\*</sup> |
| transaction > networkToken > expiry | Alphanumeric | 7 | Expiration date of the token. Format `YYYY/MM`. | Yes<sup>\*</sup> |
| transaction > type | Alphanumeric | 32 | Set this value according to the transaction you want:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` for one-step flows.</li></ul> | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid Credit card Payment Method. [See the available Payment Methods for Brazil]({{< ref "select-your-payment-method.html#Brazil" >}}). | Yes |
| transaction > paymentCountry | Alphanumeric | 2 | Set `BR` for Brazil. | Yes |
| transaction > deviceSessionId | Alphanumeric | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Yes |
| transaction > ipAddress | Alphanumeric | Max:39 | IP address of the device where the customer performs the transaction. | Yes |
| transaction > cookie | Alphanumeric | Max:255 | Cookie stored by the device where the customer performs the transaction. | Yes |
| transaction > userAgent | Alphanumeric | Max:1024 | The User agent of the browser where the customer performs the transaction. | Yes |
| transaction > extraParameters |  |  | Additional parameters or data associated with the request. The maximum size of each _extraParameters_ name is 64 characters.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | No |
| transaction > termsAndConditionsAcepted | Boolean | | PayU terms and conditions that the payers must accept. *This parameter is only mandatory if your Brazilian PayU account is associated to a foreign bank account. | No* |
| transaction > threeDomainSecure |  |  | This object contains the information of 3DS 2.0. | No |
| transaction > threeDomainSecure > embedded | Boolean |  | Set `true` if you want to use and embedded MPI for the Authorization process. By default, this value is set as `false`. | No |
| transaction > threeDomainSecure > eci | Number | Max:2 | Electronic Commerce Indicator.<br>Value returned by the directory servers showing the authentication attempt.<br>This parameter is mandatory when `transaction.threeDomainSecure.embedded` is `false` and `transaction.threeDomainSecure.xid` has been set. | No |
| transaction > threeDomainSecure > cavv | Alphanumeric | Max:28 | Cardholder Authentication Verification Value.<br>Code of the cryptogram used in the transaction authentication in Base64.<br>Depending on the specific ECI codes established by the process network, this value may be optional. | No |
| transaction > threeDomainSecure > xid | Alphanumeric | Max:28 | Transaction ID sent by the MPI in Base64.<br>This parameter is mandatory when `transaction.threeDomainSecure.embedded` is `false` and `transaction.threeDomainSecure.eci` has been set. | No |
| transaction > threeDomainSecure > directoryServerTransactionId | Alphanumeric | Max:36 | Transaction ID generated by the Directory Server during the Authentication. | No |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse |  |  | The response data. |
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
| transactionResponse > extraParameters |  |  | Additional parameters or data associated with the response. <br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Considerations
* If your commerce does not have a local entity, it is mandatory to send either the CPF (parameter `transaction.[payer|buyer].dniNumber`) or the CNPJ (parameter `transaction.[payer|buyer].cnpj`) when using [Authorization]({{< ref "payments-api-brazil.md#authorization" >}}) or [Charge]({{< ref "payments-api-brazil.md#charge" >}}).
* If you don't send any information for the sub-merchants, PayU configures your merchant as sub-merchant.
* For payments with credit card tokens generated by PayU, include the parameters `transaction.creditCardTokenId` and `transaction.creditCard.securityCode` (if you process with security code) replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}).
* For payments with credit card tokens generated using MDES or VTS, include the object `transaction.networkToken` and its parameters.
* By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative. After this feature is enabled for you, send in the request the variable `creditCard.processWithoutCvv2` as true and remove the variable `creditCard.securityCode`.<br>Having this feature enable is mandatory when using credit card tokens generated using MDES or VTS.
* The extra parameter `CIELO_TID` identifies the transaction, this parameter is needed when you want to process voids.
* The variable `transaction.threeDomainSecure` does not replace the card information nor any of the mandatory fields of the transaction. This object is additional and not mandatory.
* The variable `transaction.threeDomainSecure` corresponds to a _Pass Through_ scenario where the commerce performs the authentication by their own.

### Authorization
Use this method to perform the **Authorization** step of a two-step flow. In this step, you authorize the payment but the amount is not debited until you [capture]({{< ref "payments-api-brazil.md#capture" >}}) the funds.<br>The following are the request and response bodies for this transaction type.

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
         "submerchant": {
            "fullName": "ROBSON BATISTA DE OLIVEIRA",
            "address": {
               "street1": "Rua Alsácia",
               "street2": null,
               "street3": null,
               "city": "São Paulo",
               "state": "SP",
               "country": "BR",
               "postalCode": "04630010",
               "phone": null
            },
            "identification": "17126661851",
            "identificationType": "CNPJ"
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
               "phone": "(11)756312633"
            }
         },
         "shippingAddress": {
            "street1": "Quadra QNP 34 Conjunto G 780",
            "street2": "5555487",
            "city": "Manaos",
            "state": "SP",
            "country": "BR",
            "postalCode": "10012545",
            "phone": "(11)756312633"
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
<request>
   <language>es</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <accountId>512327</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-17T19:11:57.179Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>fbc089272288edc52c332395d9566f4c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>BRL</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <submerchant>
            <address>
               <city>São Paulo</city>
               <country>BR</country>
               <postalCode>04630010</postalCode>
               <state>SP</state>
               <street1>Rua Alsácia</street1>
            </address>
            <fullName>ROBSON BATISTA DE OLIVEIRA</fullName>
            <identification>17126661851</identification>
            <identificationType>cnpj</identificationType>
         </submerchant>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>811.807.405-64</dniNumber>
            <cnpj>32593371000110</cnpj>
            <shippingAddress>
               <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>
               <city>Manaos</city>
               <state>SP</state>
               <country>BR</country>
               <postalCode>10012545</postalCode>
               <phone>(11)756312633</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Quadra QNP 34 Conjunto G 780</street1>
            <street2>5555487</street2>
            <city>Manaos</city>
            <state>SP</state>
            <country>BR</country>
            <postalCode>0000000</postalCode>
            <phone>(11)756312633</phone>
         </shippingAddress>
      </order>
      <creditCard>
         <number>5253203387684619</number>
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
      <paymentMethod>MASTERCARD</paymentMethod>
      <paymentCountry>BR</paymentCountry>
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
Use this method to perform the **Capture** step of a two-step flow. In this step, you capture the funds previously [Authorized]({{< ref "payments-api-brazil.md#authorization" >}}) to transfer them to your PayU account.

#### Considerations
Take into account the following considerations for capture.
* The maximum time to capture an approved transaction is seven (7) days. After this time, the transaction is cancelled.
* Only the parameters displayed in the request body are mandatory to invoke a Capture transaction. Recall that the order and transaction ids must meet with a currently authorized transaction.

The following are the request and response bodies for this transaction type.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
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
         "id": "1400434770"
      },
      "type": "CAPTURE",
      "parentTransactionId": "79de715b-fe77-401e-8b18-241820afb375"
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
        "transactionId": "2e753a5e-0eba-4a4c-9778-6880b5f16605",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "6",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "282856",
        "authorizationCode": "BR-456",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624029247864,
        "referenceQuestionnaire": null,
        "extraParameters": {
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
<request>
   <language>es</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <id>1400436982</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>2cb57976-31d1-4563-b014-8047bd1b2b2a</parentTransactionId>
   </transaction>
   <isTest>false</isTest>
</request>

```
<br>

Response body:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400436982</orderId>
        <transactionId>78d4c328-7157-4b50-9fa9-12e019e7df58</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>6</paymentNetworkResponseCode>
        <trazabilityCode>282856</trazabilityCode>
        <authorizationCode>BR-456</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <operationDate>2021-06-18T10:19:01</operationDate>
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

### Charge
Use this method to perform a one-step flow, namely a charge. In this step, both steps of the two-step flow are combined in a single transaction and the funds are transferred from the customers account to your PayU account once they have been approved:

The following are the request and response bodies for this transaction type.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
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
         "submerchant": {
            "fullName": "ROBSON BATISTA DE OLIVEIRA",
            "address": {
               "street1": "Rua Alsácia",
               "street2": null,
               "street3": null,
               "city": "São Paulo",
               "state": "SP",
               "country": "BR",
               "postalCode": "04630010",
               "phone": null
            },
            "identification": "17126661851",
            "identificationType": "CNPJ"
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
               "phone": "(11)756312633"
            }
         },
         "shippingAddress": {
            "street1": "Quadra QNP 34 Conjunto G 780",
            "street2": "5555487",
            "city": "Manaos",
            "state": "SP",
            "country": "BR",
            "postalCode": "10012545",
            "phone": "(11)756312633"
         }
      },
      "creditCard": {
         "number": "5178151142107990",
         "securityCode": "777",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
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
         <accountId>512327</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-17T19:11:57.179Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>fbc089272288edc52c332395d9566f4c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>BRL</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <submerchant>
            <address>
               <city>São Paulo</city>
               <country>BR</country>
               <postalCode>04630010</postalCode>
               <state>SP</state>
               <street1>Rua Alsácia</street1>
            </address>
            <fullName>ROBSON BATISTA DE OLIVEIRA</fullName>
            <identification>17126661851</identification>
            <identificationType>cnpj</identificationType>
         </submerchant>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>811.807.405-64</dniNumber>
            <cnpj>32593371000110</cnpj>
            <shippingAddress>
               <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>
               <city>Manaos</city>
               <state>SP</state>
               <country>BR</country>
               <postalCode>10012545</postalCode>
               <phone>(11)756312633</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Quadra QNP 34 Conjunto G 780</street1>
            <street2>5555487</street2>
            <city>Manaos</city>
            <state>SP</state>
            <country>BR</country>
            <postalCode>0000000</postalCode>
            <phone>(11)756312633</phone>
         </shippingAddress>
      </order>
      <creditCard>
         <number>5178151142107990</number>
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
      <paymentMethod>MASTERCARD</paymentMethod>
      <paymentCountry>BR</paymentCountry>
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

Response body:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400437005</orderId>
        <transactionId>5d3cea31-c5e5-4105-9359-984edcaede37</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>6</paymentNetworkResponseCode>
        <trazabilityCode>282856</trazabilityCode>
        <authorizationCode>MOCK-CIELO-1624047952405</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <operationDate>2021-06-18T10:25:52</operationDate>
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

## Submit transaction with cash
This method lets you process the payments in cash of your customers. To integrate with cash transactions, you must redirect the customer to the URL found in the response of the method; your customer sees a payment receipt like this.

<img src="/assets/Payments/CashReceiptBR.png" alt="PrintScreen" width="50%">

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `SUBMIT_TRANSACTION`. | Yes |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| merchant |  |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| transaction |  |  | This object has the transaction data. | Yes |
| transaction > order |  |  | This object has the order data. | Yes |
| transaction > order > accountId | Number |  | Identifier of your account. | Yes |
| transaction > order > referenceCode | Alphanumeric | Min:1 Max:255 | Represents the identifier of the order in your system. | Yes |
| transaction > order > description | Alphanumeric | Min:1 Max:255 | Description of the order. | Yes |
| transaction > order > language | Alphanumeric | 2 | Language used in emails sent to the buyer and the seller. | Yes |
| transaction > order > notifyUrl | Alphanumeric | Max:2048 | Confirmation URL of the order. | Yes |
| transaction > order > partnerId | Alphanumeric | Max:255 | Partner ID in PayU. | Yes |
| transaction > order > signature | Alphanumeric | Max:255 | The signature associated to the form. For more information refer [Authentication signature]({{< ref "integrations.html#authentication-signature" >}}). | Yes |
| transaction > order > shippingAddress |  |  | Shipping address. | No |
| transaction > order > shippingAddress > street1 | Alphanumeric | Max:100 | Address Line 1. | No |
| transaction > order > shippingAddress > street2 | Alphanumeric | Max:100 | Address Line 2. | No |
| transaction > order > shippingAddress > city | Alphanumeric | Max:50 | Address city. | No |
| transaction > order > shippingAddress > state | Alphanumeric | Max:40 | Address State. For Brazil, only send two characters, For example, set `SP` for São Paulo. | No |
| transaction > order > shippingAddress > country | Alphanumeric | 2 | Address country. | No |
| transaction > order > shippingAddress > postalCode | Alphanumeric | Max:8 | Address Zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | No |
| transaction > order > shippingAddress > phone | Alphanumeric | Max:11 | Phone number associated to the address. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | No |
| transaction > order > buyer |  |  | Buyer information. | Yes |
| transaction > order > buyer > merchantBuyerId | Alphanumeric | Max:100 | Buyer ID in your system. | No |
| transaction > order > buyer > fullName | Alphanumeric | Max:150 | Full name of the buyer. | Yes |
| transaction > order > buyer > emailAddress | Alphanumeric | Max:255 | E-mail of the buyer. | Yes |
| transaction > order > buyer > contactPhone | Alphanumeric | Max:20 | Phone number of the buyer. | Yes |
| transaction > order > buyer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. You must use an algorithm to validate the CPF and must be set using the format `XXX.XXX.XXX-XX`. Example: `811.807.405-64`. | Yes |
| transaction > order > buyer > cnpj | Alphanumeric | Max:14 | Identification number of the buyer (For Legal person in Brazil). You must use an algorithm to validate the CNPJ and must be set using the format `XXXXXXXXXXXXXX`. Example: `32593371000110`. | Yes |
| transaction > order > buyer > shippingAddress | Alphanumeric |  | Shipping address of the buyer. | Yes |
| transaction > order > buyer > shippingAddress > street1 | Alphanumeric | Max:150 | Buyer's shipping address Line 1. |  Yes |
| transaction > order > buyer > shippingAddress > city | Alphanumeric | Max:50 | Buyer's shipping address city. | Yes |
| transaction > order > buyer > shippingAddress > state | Alphanumeric | Max:40 | Buyer's shipping address state. For Brazil, only send two characters, For example, set `SP` for São Paulo. | Yes |
| transaction > order > buyer > shippingAddress > country | Alphanumeric | 2 | Buyer's shipping address country in format ISO 3166 alpha-2. | Yes |
| transaction > order > buyer > shippingAddress > postalCode | Number | Max:20 | Buyer's shipping address zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | Yes |
| transaction > order > buyer > shippingAddress > phone | Number | Max:20 | Buyer's shipping address phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Yes |
| transaction > order > additionalValues > |  | 64 | Amount of the order or its associated values. | Yes |
| transaction > order > additionalValues > TX_VALUE | Alphanumeric | 64 | Amount of the transaction. | Yes |
| transaction > order > additionalValues > TX_VALUE > value | Number | 19, 2 | Specifies the amount of the transaction, this value may have two decimal digits (Ex. `10000.00` or `10000`). | Yes |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Yes |
| transaction > order > additionalValues > TX_TAX | Alphanumeric | 64 | Amount of the Value Added Tax (VAT). | Yes |
| transaction > order > additionalValues > TX_TAX > value | Number | 19, 2 | Specifies the amount of the VAT.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alphanumeric | 64 | Base value to calculate the VAT.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Number | 19, 2 | Specifies the base amount of the transaction. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > payer |  |  | Payer information. This information is optional. | No |
| transaction > payer > emailAddress | Alphanumeric | Max:255 | Payer e-mail address. | No |
| transaction > payer > merchantPayerId | Alphanumeric | Max:100 | Identifier of the payer in your system. | No |
| transaction > payer > fullName | Alphanumeric | Max:150 | Name of the payer. | No |
| transaction > payer > billingAddress |  |  | Billing address. | No |
| transaction > payer > billingAddress > street1 | Alphanumeric | Max:100 | Billing Address Line 1. | No |
| transaction > payer > billingAddress > street2 | Alphanumeric | Max:100 | Billing Address Line 2. | No |
| transaction > payer > billingAddress > city | Alphanumeric | Max:50 | Billing address city. | No |
| transaction > payer > billingAddress > state | Alphanumeric | Max:40 | Billing address state. For Brazil, only send two characters, For example, set `SP` for São Paulo. | No |
| transaction > payer > billingAddress > country | Alphanumeric | 2 | Billing address country in format ISO 3166 Alpha-2. | No |
| transaction > payer > billingAddress > postalCode | Alphanumeric | Max:20 | Billing address zip code. For Brazil, use the format `XXXXX-XXX` or ´. Example: `09210-710` or `09210710`. | No |
| transaction > payer > billingAddress > phone | Alphanumeric | Max:20 | Billing address phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | No |
| transaction > payer > birthdate | Alphanumeric | Max:10 | Payer's date of birth. | No |
| transaction > payer > contactPhone | Alphanumeric | Max:20 | Payer's phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | No |
| transaction > payer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. You must use an algorithm to validate the CPF and must be set using the format `XXX.XXX.XXX-XX`. Example: `811.807.405-64`. | No |
| transaction > payer > cnpj | Alphanumeric | Max:14 | Identification number of the buyer (For Legal person in Brazil). You must use an algorithm to validate the CNPJ and must be set using the format `XXXXXXXXXXXXXX`. Example: `32593371000110`. | No |
| transaction > payer > dniType | Alphanumeric | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alphanumeric | 32 | As Bank transfers payments are performed in the bank's webpage, the only available transaction type is `AUTHORIZATION_AND_CAPTURE` | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid Payment Method in cash. [See the available Payment Methods for Brazil]({{< ref "select-your-payment-method.html#Brazil" >}}). | Yes |
| transaction > paymentCountry | Alphanumeric | 2 | Set `BR` for Brazil. | Yes |
| transaction > expirationDate | Alphanumeric | 23 | Maximum date and time that the payer has to make the payment. Format `YYYY-MM-DDTHH:MM:SS`, for example `2021-06-12T16:07:11.586`. | No |
| transaction > ipAddress | Alphanumeric | Max:39 | IP address of the device where the customer performs the transaction. | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse |  |  | The response data. |
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
| transactionResponse > extraParameters |  |  | Additional parameters or data associated with the response.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"REFERENCE": "74794"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>REFERENCE</string>`<br>&emsp;&emsp;`<int>74794</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Considerations
* If your commerce does not have a local entity, it is mandatory to send either the CPF (parameter `transaction.[payer|buyer].dniNumber`) or the CNPJ (parameter `transaction.[payer|buyer].cnpj`).
* The parameter `transaction.expirationDate` is not mandatory. If you don't send this parameter, its default value is seven (7) days after the current date.<br>If you send a date later than the default number of days, PayU will ignore this value and the expiration will be set as default.
* The payment is reflected in the next business day.
* The parameter `transactionResponse.extraParameters` has the following parameters related to the transaction:
   - **URL_PAYMENT_RECEIPT_HTML**: payment receipt in HTML format. This is where you need to redirect the payment when the payer selects cash payment. 
   - **URL_BOLETO_BANCARIO**: payment receipt in printable format.
   - **EXPIRATION_DATE**: maximum term for the payer to perform the payment.
   - **BAR_CODE**: barcode which lets the payer perform the payment. 

### API call
The following are the bodies of the request and response of this payment method.

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
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
               "phone": "(11)756312633"
            }
         },
         "shippingAddress": {
            "street1": "Quadra QNP 34 Conjunto G 780",
            "street2": "5555487",
            "city": "Manaos",
            "state": "SP",
            "country": "BR",
            "postalCode": "10012545",
            "phone": "(11)756312633"
         }
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "BOLETO_BANCARIO",
      "expirationDate": "2021-06-19T21:57:12.559",
      "paymentCountry": "BR",
      "ipAddress": "127.0.0.1"
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
    "orderId": 43626780,
    "transactionId": "63091676-673d-46bf-a283-54e686ba0238",
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
    "extraParameters": {
      "URL_PAYMENT_RECEIPT_HTML": "https://gateway.payulatam.com/ppp-web-gateway/bl.zul?transactionId=63091676-673d-46bf-a283-54e686ba0238&orderId=43626780&signature=647b061ddef2a25fd19cb362860e1d21ef59e16a",
      "EXPIRATION_DATE": 1399507200000,
      "URL_BOLETO_BANCARIO": "https://gateway.payulatam.com/ppp-web-gateway/bl.zul?transactionId=63091676-673d-46bf-a283-54e686ba0238&orderId=43626780&signature=647b061ddef2a25fd19cb362860e1d21ef59e16a",
      "BAR_CODE": "34191.75389 38894.912930 81898.480009 9 60560000010000"
    }
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
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <accountId>512327</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-17T19:11:57.179Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>fbc089272288edc52c332395d9566f4c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>BRL</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>811.807.405-64</dniNumber>
            <cnpj>32593371000110</cnpj>
            <shippingAddress>
               <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>
               <city>Manaos</city>
               <state>SP</state>
               <country>BR</country>
               <postalCode>10012545</postalCode>
               <phone>(11)756312633</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Quadra QNP 34 Conjunto G 780</street1>
            <street2>5555487</street2>
            <city>Manaos</city>
            <state>SP</state>
            <country>BR</country>
            <postalCode>0000000</postalCode>
            <phone>(11)756312633</phone>
         </shippingAddress>
      </order>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>BOLETO_BANCARIO</paymentMethod>
      <expirationDate>2021-06-19T21:57:12.559</expirationDate>
      <paymentCountry>BR</paymentCountry>
      <ipAddress>127.0.0.1</ipAddress>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Response body:
```XML
<paymentResponse>
   <code>SUCCESS</code>
   <transactionResponse>
      <orderId>43625300</orderId>
      <transactionId>89ff03a7-9f86-4193-a25d-94b758c135bb</transactionId>
      <state>PENDING</state>
      <pendingReason>AWAITING_NOTIFICATION</pendingReason>
      <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
      <extraParameters>
         <entry>
            <string>URL_PAYMENT_RECEIPT_HTML</string>
            <string>https://gateway.payulatam.com/ppp-web-gateway/bl.zul?transactionId=89ff03a7-9f86-4193-a25d-94b758c135bb&orderId=43625300&signature=e9e89a2cd8d9d2d79d637eac84debae9012584de</string>
         </entry>
         <entry>
            <string>EXPIRATION_DATE</string>
            <date>2014-05-08T00:00:00</date>
         </entry>
         <entry>
            <string>URL_BOLETO_BANCARIO</string>
            <string>https://gateway.payulatam.com/ppp-web-gateway/bl.zul?transactionId=89ff03a7-9f86-4193-a25d-94b758c135bb&orderId=43625300&signature=e9e89a2cd8d9d2d79d637eac84debae9012584de</string>
         </entry>
         <entry>
            <string>BAR_CODE</string>
            <string>34191.75389 38894.752930 81898.480009 3 60570000010000</string>
         </entry>
      </extraParameters>
   </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Submit transaction with bank transfer
This method lets you process the bank transfer payments of your customers. When using this payment method, the payer performs a bank transfer from their bank account issued in ITAU.<br>
To integrate with these transactions, you must redirect the customer to the URL found in the response of the method.

<img src="/assets/Payments/BankTransferReceiptBR.png" alt="PrintScreen" width="50%">

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `SUBMIT_TRANSACTION`. | Yes |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| merchant |  |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| transaction |  |  | This object has the transaction data. | Yes |
| transaction > order |  |  | This object has the order data. | Yes |
| transaction > order > accountId | Number |  | Identifier of your account. | Yes |
| transaction > order > referenceCode | Alphanumeric | Min:1 Max:255 | Represents the identifier of the order in your system. | Yes |
| transaction > order > description | Alphanumeric | Min:1 Max:255 | Description of the order. | Yes |
| transaction > order > language | Alphanumeric | 2 | Language used in emails sent to the buyer and the seller. | Yes |
| transaction > order > notifyUrl | Alphanumeric | Max:2048 | Confirmation URL of the order. | No|
| transaction > order > partnerId | Alphanumeric | Max:255 | Partner ID in PayU. | No |
| transaction > order > signature | Alphanumeric | Max:255 | The signature associated to the form. For more information refer [Authentication signature]({{< ref "integrations.html#authentication-signature" >}}). | Yes |
| transaction > order > shippingAddress |  |  | Shipping address. | No |
| transaction > order > shippingAddress > street1 | Alphanumeric | Max:100 | Address Line 1. | No |
| transaction > order > shippingAddress > street2 | Alphanumeric | Max:100 | Address Line 2. | No |
| transaction > order > shippingAddress > city | Alphanumeric | Max:50 | Address city. | No |
| transaction > order > shippingAddress > state | Alphanumeric | Max:40 | Address State. | No |
| transaction > order > shippingAddress > country | Alphanumeric | 2 | Address country. | No |
| transaction > order > shippingAddress > postalCode | Alphanumeric | Max:8 | Address Zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | No |
| transaction > order > shippingAddress > phone | Alphanumeric | Max:11 | Phone number associated to the address. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | No |
| transaction > order > buyer |  |  | Buyer information. | Yes |
| transaction > order > buyer > merchantBuyerId | Alphanumeric | Max:100 | Buyer ID in your system. | No |
| transaction > order > buyer > fullName | Alphanumeric | Max:150 | Full name of the buyer. | Yes |
| transaction > order > buyer > emailAddress | Alphanumeric | Max:255 | E-mail of the buyer. | Yes |
| transaction > order > buyer > contactPhone | Alphanumeric | Max:20 | Phone number of the buyer. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Yes |
| transaction > order > buyer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. You must use an algorithm to validate the CPF and must be set using the format `XXX.XXX.XXX-XX`. Example: `811.807.405-64`. | Yes |
| transaction > order > buyer > cnpj | Alphanumeric | Max:14 | Identification number of the buyer (For Legal person in Brazil). You must use an algorithm to validate the CNPJ and must be set using the format `XXXXXXXXXXXXXX`. Example: `32593371000110`. | Yes |
| transaction > order > buyer > shippingAddress | Alphanumeric |  | Shipping address of the buyer. | Yes |
| transaction > order > buyer > shippingAddress > street1 | Alphanumeric | Max:150 | Buyer's shipping address Line 1. | Yes |
| transaction > order > buyer > shippingAddress > city | Alphanumeric | Max:50 | Buyer's shipping address city. | Yes |
| transaction > order > buyer > shippingAddress > state | Alphanumeric | Max:40 | Buyer's shipping address state. | Yes |
| transaction > order > buyer > shippingAddress > country | Alphanumeric | 2 | Buyer's shipping address country in format ISO 3166 alpha-2. | Yes |
| transaction > order > buyer > shippingAddress > postalCode | Number | Max:20 | Buyer's shipping address zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | Yes |
| transaction > order > buyer > shippingAddress > phone | Number | Max:20 | Buyer's shipping address phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Yes |
| transaction > order > additionalValues > |  | 64 | Amount of the order or its associated values. | Yes |
| transaction > order > additionalValues > TX_VALUE | Alphanumeric | 64 | Amount of the transaction. | Yes |
| transaction > order > additionalValues > TX_VALUE > value | Number | 19, 2 | Specifies the amount of the transaction, this value may have two decimal digits (Ex. `10000.00` or `10000`). | Yes |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Yes |
| transaction > order > additionalValues > TX_TAX | Alphanumeric | 64 | Amount of the Value Added Tax (VAT). | Yes |
| transaction > order > additionalValues > TX_TAX > value | Number | 19, 2 | Specifies the amount of the VAT.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alphanumeric | 64 | Base value to calculate the VAT.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Number | 19, 2 | Specifies the base amount of the transaction. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > payer |  |  | Payer information. | No |
| transaction > payer > emailAddress | Alphanumeric | Max:255 | Payer e-mail address. | No |
| transaction > payer > merchantPayerId | Alphanumeric | Max:100 | Identifier of the payer in your system. | No |
| transaction > payer > fullName | Alphanumeric | Max:150 | Name of the payer. | No |
| transaction > payer > billingAddress |  |  | Billing address. | No |
| transaction > payer > billingAddress > street1 | Alphanumeric | Max:100 | Billing Address Line 1. | No |
| transaction > payer > billingAddress > street2 | Alphanumeric | Max:100 | Billing Address Line 2. | No |
| transaction > payer > billingAddress > city | Alphanumeric | Max:50 | Billing address city. | No |
| transaction > payer > billingAddress > state | Alphanumeric | Max:40 | Billing address state. | No |
| transaction > payer > billingAddress > country | Alphanumeric | 2 | Billing address country in format ISO 3166 Alpha-2. | No |
| transaction > payer > billingAddress > postalCode | Alphanumeric | Max:20 | Billing address zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | No |
| transaction > payer > billingAddress > phone | Alphanumeric | Max:20 | Billing address phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | No |
| transaction > payer > birthdate | Alphanumeric | Max:10 | Payer's date of birth. Format `YYYY-MM-DD`. | No |
| transaction > payer > contactPhone | Alphanumeric | Max:20 | Payer's phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | No |
| transaction > payer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. You must use an algorithm to validate the CPF and must be set using the format `XXX.XXX.XXX-XX`. Example: `811.807.405-64`. | No |
| transaction > payer > dniType | Alphanumeric | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alphanumeric | 32 | As cash payments are performed in physical offices, the only available transaction type is `AUTHORIZATION_AND_CAPTURE` | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid Payment Method in Bank transfer. [See the available Payment Methods for Brazil]({{< ref "select-your-payment-method.html#Brazil" >}}). | Yes |
| transaction > paymentCountry | Alphanumeric | 2 | Set `BR` for Brazil. | Yes |
| transaction > deviceSessionId | Alphanumeric | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Yes |
| transaction > ipAddress | Alphanumeric | Max:39 | IP address of the device where the customer performs the transaction. | Yes |
| transaction > cookie | Alphanumeric | Max:255 | Cookie stored by the device where the customer performs the transaction. | Yes |
| transaction > userAgent | Alphanumeric | Max:1024 | The User agent of the browser where the customer performs the transaction. | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse |  |  | The response data. |
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
| transactionResponse > extraParameters |  |  | Additional parameters or data associated with the response.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"BANK_URL": "https://gateway.payulatam.com/ppp-web-gateway/payment-redirect.zul?prid=1181964158Ya5b4bd5e7c6e4ebY4085cd2deb967f2"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_URL</string>`<br>&emsp;&emsp;`<string>https://gateway.payulatam.com/ppp-web-gateway/payment-redirect.zul?prid=1181964158Ya5b4bd5e7c6e4ebY4085cd2deb967f2</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo |  |  | Additional information associated with the response. This object follows the same structure than `transactionResponse.extraParameters`. |

</details>

#### Considerations
* If your commerce does not have a local entity, it is mandatory to send either the CPF (parameter `transaction.[payer|buyer].dniNumber`) or the CNPJ (parameter `transaction.[payer|buyer].cnpj`).
* The parameter `transaction.expirationDate` is not mandatory. If you don't send this parameter, its default value is four (4) day after the current date.<br>If you send a date later than the default number of days, PayU will ignore this value and the expiration will be set as default.
* When the payer selects this payment method, PayU creates an order in _in progress_ state and a transaction in `PENDING` state.
* In the response body, you can find the receipt generated by PayU and the expiration date.

### API call
The following are the bodies of the request and response of this payment method.

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
         "accountId": "512327",
         "referenceCode": "PRODUCT_TEST_2021-06-17T19:11:57.179Z",
         "description": "payment test",
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
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "ITAU",
      "expirationDate": "2021-06-23T22:30:21.231",
      "paymentCountry": "BR",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
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
        "orderId": 1181965590,
        "transactionId": "bd273cec-d2f2-4f00-a125-c705c82b5605",
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
            "BANK_URL": "https://gateway.payulatam.com/ppp-web-gateway/payment-redirect.zul?prid=1181965590Ybd273cecd2f24f0Y88337fa73366de5",
            "EXPIRATION_DATE": 1626207065416
        },
        "additionalInfo": {
            "paymentNetwork": "ITAU_SHOPLINE",
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
         <accountId>512327</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-17T19:11:57.179Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>fbc089272288edc52c332395d9566f4c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>BRL</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <contactPhone>7563126</contactPhone>
            <dniNumber>811.807.405-64</dniNumber>
            <cnpj>32593371000110</cnpj>
            <emailAddress>buyer_test@test.com</emailAddress>
            <fullName>First name and second buyer name</fullName>
            <merchantBuyerId>1</merchantBuyerId>
            <shippingAddress>
               <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>            
               <city>Manaos</city>
               <state>SP</state>               
               <country>BR</country>
               <postalCode>10012545</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>            
               <city>Manaos</city>
               <state>SP</state>               
               <country>BR</country>
                <postalCode>10012545</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>ITAU</paymentMethod>
      <expirationDate>2021-06-23T22:30:21.231</expirationDate>
      <paymentCountry>BR</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Response body:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1181965893</orderId>
        <transactionId>8397992b-3717-49c5-92ee-345a65ff13cf</transactionId>
        <state>PENDING</state>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <extraParameters>
            <entry>
                <string>BANK_URL</string>
                <string>https://gateway.payulatam.com/ppp-web-gateway/payment-redirect.zul?prid=1181965893Y8397992b371749cY7ad19f758dd04bc</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-07-13T15:14:00</date>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>ITAU_SHOPLINE</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Available payment methods query
This method returns a list of the payment methods available in all countries.

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|-|-|-|-|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `GET_PAYMENT_METHODS`. | Yes |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| merchant |  |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| paymentMethods |  |  | List of the payment methods. |
| paymentMethods > paymentMethodComplete |  |  | This object has the information of a payment method. |
| paymentMethods > paymentMethodComplete > id | Numeric |  | Payment method identifier. |
| paymentMethods > paymentMethodComplete > description | Alphanumeric | Max:32 | Payment method name. |
| paymentMethods > paymentMethodComplete > country | Alphanumeric | 2 | ISO code of the Payment method country. |

</details>

### API call
The following are the bodies of the request and response of this method. For the sake of the example, the response here shows two payment methods. 

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
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

| Field name | Format | Size | Description | Mandatory | 
|-|-|-|-|:-:|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `PING`. | Yes |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | Yes |
| merchant |  |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. |
| error | Alphanumeric | Max:2048 | The error message associated if an error ocurred. |
| transactionResponse | transactionResponse | Max:2048 | The response of the PING method if an error ocurred. |
</details>

### Api call
The following are the bodies of the request and response of this method.

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}
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

