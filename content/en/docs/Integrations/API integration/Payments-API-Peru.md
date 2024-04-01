---
title: "Payments API - Peru"
linkTitle: "Payments API - Peru"
date: 2021-05-03T15:48:08-05:00
description: >
  Payments API Peru lets your shop process different transaction types with multiple payment methods.
weight: 20
tags: ["subtopic"]
---
<script src="/js/searchcodes.js"></script>

To integrate with Peru's Payment API, direct your requests to the following URLs based on your environment:

{{% alert title="URLs" color="info"%}}
* Test: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Production: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Available methods
Payments API includes the following methods:

* [Submit transactions using credit or debit cards]({{< ref "Payments-API-Peru.md#submit-transactions-using-credit-or-debit-cards" >}})
* [Submit transactions using Yape]({{< ref "Payments-API-Peru.md#submit-transactions-using-yape" >}})
* [Submit transactions using cash]({{< ref "Payments-API-Peru.md#submit-transactions-using-cash" >}})
* [Available payment methods query]({{< ref "Payments-API-Peru.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-API-Peru.md#ping" >}})

{{% alert title="Note" color="info"%}}
To confirm the status of a transaction, you can use one of the following options:
* Navigate to the the URL set in the `transaction.notifyUrl` variable or the _**Confirmation URL**_ option located in the PayU Module in _**Settings**_ > _**Technical configuration**_.
* Use the [Queries API or SDK]({{< ref "Queries.md" >}}).
{{% /alert %}}

## Submit transactions using credit or debit cards
This method lets you process the payments performed by your customers using credit or debit cards. For Peru, you can perform the two-step flows (**Authorization**, **Capture**), and one-step flows (**Charge**). For more information, refer to [Payment flows]({{< ref "payments.md#payment-flows" >}}).

### Parameters for request and response

<details>
<summary>Request</summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Show mandatory fields only</label>
<br>
<div class="variables"></div>

 | Field name | Format | Size | Description | Mandatory |
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
| transaction > creditCardTokenId |  |  | Include this parameter when the transaction is done using a tokenized card replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}) | No |
| transaction > creditCard | Object |  | Credit card information. If you process using debit card, do not send this parameter.<br>This object and its parameters are mandatory when the payment is performed using not tokenized credit card. | No |
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
| transaction > payer | Object |  | Payer information. | No |
| transaction > payer > emailAddress | Alphanumeric | Max:255 | Payer e-mail address. | No |
| transaction > payer > merchantPayerId | Alphanumeric | Max:100 | Identifier of the payer in your system. | No |
| transaction > payer > fullName | Alphanumeric | Max:150 | Name of the payer which must meet the name sent in the parameter `transaction.creditCard.name` for credit card payments. | No |
| transaction > payer > billingAddress | Object |  | Billing address. | Yes |
| transaction > payer > billingAddress > street1 | Alphanumeric | Max:100 | Billing Address Line 1. | No |
| transaction > payer > billingAddress > street2 | Alphanumeric | Max:100 | Billing Address Line 2. | No |
| transaction > payer > billingAddress > city | Alphanumeric | Max:50 | Billing address city. | No |
| transaction > payer > billingAddress > state | Alphanumeric | Max:40 | Billing address state. | Yes |
| transaction > payer > billingAddress > country | Alphanumeric | 2 | Billing address country in format ISO 3166 Alpha-2. | No |
| transaction > payer > billingAddress > postalCode | Alphanumeric | Max:20 | Billing address zip code. | No |
| transaction > payer > billingAddress > phone | Alphanumeric | Max:20 | Billing address phone number. | No |
| transaction > payer > birthdate | Alphanumeric | Max:10 | Buyer's date of birth. | No |
| transaction > payer > contactPhone | Alphanumeric | Max:20 | Buyer's phone number. | No |
| transaction > payer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. | No |
| transaction > payer > dniType | Alphanumeric | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Yes |
| transaction > type | Alphanumeric | 32 | Set this value according to the transaction you want:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` for one-step flows.</li></ul> | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid Credit or Debit card Payment Method. [See the available Payment Methods for Peru]({{< ref "select-your-payment-method.html#Peru" >}}). | Yes |
| transaction > paymentCountry | Alphanumeric | 2 | Set `PE` for Peru. | Yes |
| transaction > deviceSessionId | Alphanumeric | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | No |
| transaction > ipAddress | Alphanumeric | Max:39 | IP address of the device where the customer performs the transaction. | No |
| transaction > cookie | Alphanumeric | Max:255 | Cookie stored by the device where the customer performs the transaction. | No |
| transaction > userAgent | Alphanumeric | Max:1024 | The User agent of the browser where the customer performs the transaction. | No |
| transaction > extraParameters | Object |  | Additional parameters or data associated with the request. The maximum size of each _extraParameters_ name is 64 characters.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | No |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
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

</details>

#### Considerations
* For payments with credit card tokens, include the parameters `transaction.creditCardTokenId` and `transaction.creditCard.securityCode` (if you process with security code) replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}).
* By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative. After this feature is enabled for you, send in the request the variable `creditCard.processWithoutCvv2` as true and remove the variable `creditCard.securityCode`.
* In Peru, you can select 0 or 2 to 36 installments when paying with credit card. If you select one (1) installment, PayU sends zero (0) as default value.

### Authorization
Use this method to perform the **Authorization** step of a two-step flow. In this step, you authorize the payment but the amount is not debited until you [capture]({{< ref "payments-api-peru.md#capture" >}}) the funds.

The following are the request and response bodies for this transaction type.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Example of a request:
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
         "accountId": "512323",
         "referenceCode": "PRODUCT_TEST_2021-06-21T16:39:10.965Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "af24b22ad0aa0b14dbe3c21a07d9558c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 100,
               "currency": "PEN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Isabel La Católica 103-La Victoria",
               "street2": "5555487",
               "city": "Lima",
               "state": "Lima y Callao",
               "country": "PE",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "5555487",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
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
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "125544",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
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
      "paymentCountry": "PE",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": true
}
```
<br>

Example of a response:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400443216,
        "transactionId": "eebf01c3-7531-4952-a8e8-647a9eebac95",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "000",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "77821",
        "authorizationCode": "170921",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado y completado con exito",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624275552379,
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

Example of a request:
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
         <accountId>512323</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-21T16:39:10.965Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>af24b22ad0aa0b14dbe3c21a07d9558c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>100</value>
                  <currency>PEN</currency>
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
               <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>
               <city>Lima</city>
               <state>Lima y Callao</state>
               <country>PE</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>
            <city>Lima</city>
            <state>Lima y Callao</state>
            <country>PE</country>
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
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>
            <city>Lima</city>
            <state>Lima y Callao</state>
            <country>PE</country>
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
      <paymentCountry>PE</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>

```
<br>

Example of a response:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400443244</orderId>
        <transactionId>62cb2c6a-a9d5-4438-a767-7be501f0973d</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>000</paymentNetworkResponseCode>
        <trazabilityCode>77821</trazabilityCode>
        <authorizationCode>170921</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Aprobado y completado con exito</responseMessage>
        <operationDate>2021-06-21T06:47:21</operationDate>
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
<!--
#### Zero Authorization
Zero Authorization allows you to validate a card without performing any charge or capture operation. Through this option, you can send an _Authorization_ request as explained before with `TX_VALUE` equals to 0 and you will receive the result of the card validation.

{{% alert title="Important" color="info"%}}
* Make sure your shop can create transactions with `TX_VALUE` equals to 0.
* This feature is not enabled by default, contact your sales representative to request it.
* _Zero Authorization_ is available for VISA and Mastercard cards only. For other franchises, send the transaction value greater than or equals to 1 PEN.
{{% /alert %}}

##### Benefits
Using _Zero Authorization_, you can have the following benefits:

* Free trial periods
* Increase trust and loyalty
* Increase your subscriber base
* Update credit card information
* Add several cards to an account
* Lower refunds
-->

### Capture
Use this method to perform the **Capture** step of a two-step flow. In this step, you capture the funds previously [Authorized]({{< ref "payments-api-peru.md#authorization" >}}) to transfer them to your PayU account.

#### Considerations
Take into account the following considerations for capture.
* You can perform partial captures over an authorized amount. To do this, you need to send in the request the parameter `transaction.order.TX_VALUE` with its value (as sent during the Authorization).
* For partial captures, the minimum value to capture can be 10% lower than the amount authorized.
* For partial captures, the payment networks release the no captured value at 2-10 days for local cards and 28 days for foreign cards.

The following are the request and response bodies for this transaction type.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Example of a request:
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
         "id": "1400443216"
      },
      "type": "CAPTURE",
      "parentTransactionId": "eebf01c3-7531-4952-a8e8-647a9eebac95"
   },
   "test": false
}
```
<br>

Example of a response:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400443382,
        "transactionId": "e82d47b3-72cf-42f0-ae30-3eeb42575cc7",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "10140044338210c",
        "authorizationCode": "APPROVED",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624279912864,
        "referenceQuestionnaire": null,
        "additionalInfo": null
    }
}

```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example of a request:
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
         <id>1400443382</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>10ccdb41-3fa8-4961-b6c0-88d74f737d4e</parentTransactionId>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Example of a response:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400443382</orderId>
        <transactionId>e82d47b3-72cf-42f0-ae30-3eeb42575cc7</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>10140044338210c</trazabilityCode>
        <authorizationCode>APPROVED</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>APPROVED</responseMessage>
        <operationDate>2021-06-21T07:51:52</operationDate>
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

Example of a request:
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
         "accountId": "512323",
         "referenceCode": "PRODUCT_TEST_2021-06-21T16:39:10.965Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "af24b22ad0aa0b14dbe3c21a07d9558c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 100,
               "currency": "PEN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Isabel La Católica 103-La Victoria",
               "street2": "5555487",
               "city": "Lima",
               "state": "Lima y Callao",
               "country": "PE",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "5555487",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
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
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "125544",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
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
      "paymentCountry": "PE",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": true
}
```
<br>

Example of a response:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400443595,
        "transactionId": "acd8a1c6-fb44-497f-8fa5-de6136be4562",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "000",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "77821",
        "authorizationCode": "170921",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado y completado con exito",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624286793995,
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

Example of a request:
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
         <accountId>512323</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-21T16:39:10.965Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>af24b22ad0aa0b14dbe3c21a07d9558c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>100</value>
                  <currency>PEN</currency>
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
               <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>
               <city>Lima</city>
               <state>Lima y Callao</state>
               <country>PE</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>
            <city>Lima</city>
            <state>Lima y Callao</state>
            <country>PE</country>
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
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>
            <city>Lima</city>
            <state>Lima y Callao</state>
            <country>PE</country>
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
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>VISA</paymentMethod>
      <paymentCountry>PE</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>


```
<br>

Example of a response:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400443759</orderId>
        <transactionId>d7af220a-d427-486f-b35d-c363e12430e2</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>000</paymentNetworkResponseCode>
        <trazabilityCode>77821</trazabilityCode>
        <authorizationCode>170921</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Aprobado y completado con exito</responseMessage>
        <operationDate>2021-06-21T10:49:30</operationDate>
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

## Submit transactions using Yape

### Description
Yape is a mobile application created by the BCP (Banco de Crédito del Perú) that offers a digital wallet. The application allows users to make online purchases, pay for services, top-up, withdraw funds, and send or receive money quickly and securely. Access to this digital wallet does not require a bank account; only the payer's cell phone number is needed.

#### Features and benefits
Enabling payments through Yape in your business provides valuable benefits to you and your customers:

* **More sales:** Attract new customers and increase sales thanks to the millions of customers who have Yape.
* **More convenience:** Customers can make quick and easy purchases using their mobile phones.
* **More security:** Ensure secure and reliable transactions with the backing of BCP.

### Payment process with Yape

#### Prerequisites
To conduct payments, the end user needs 2 components:
* Mobile phone number
* OTP (One-Time Password)

#### User Experience
A purchase through Yape can follow the flow described below:

1. The user accesses the shopping website or application and selects the product they want to purchase. The website offers the user the option to pay through Yape and requests their mobile phone number and an approval code, for example:

<img src="/assets/Payments/Yape01ES.png" alt="PrintScreen" width="250">
<p></p>

2. The user accesses the Yape application to obtain the approval code, for example:

<img src="/assets/Payments/Yape02ES.png" alt="PrintScreen" width="250">
<p></p>

3. The user enters the approval code and easily completes the payment, for example:

<img src="/assets/Payments/Yape03EN.png" alt="PrintScreen" width="500">
<p></p>

### Parameters for request and response

<details>
<summary>Request</summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Mostrar solo campos obligatorios</label>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|:---:|
| language | Alphanumeric| 2 | Language used in the request, used for error messages. | Yes |
| command | Alphanumeric| Max:32 | Set SUBMIT_TRANSACTION. | Yes |
| test (JSON) isTest (XML) | Boolean | | Set true if the request is in test mode, otherwise set false. | Yes |
| merchant | Object | | Authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32  | Password provided by PayU. | Yes       |
| transaction | Object | | Transaction data. | Yes |
| transaction > order | Object | | Order data. | Yes |
| transaction > order > accountId | Number | | Your account identifier. | Yes |
| transaction > order > referenceCode | Alphanumeric | Min:1 Max:255 | Order identifier in your system. | Yes |
| transaction > order > description | Alphanumeric | Min:1 Max:255 | Order description. | Yes |
| transaction > order > language | Alphanumeric | 2 | Language used in emails sent to buyer and seller. | Yes |
| transaction > order > notifyUrl | Alphanumeric| Max:2048| Order confirmation URL. | No |
| transaction > order > partnerId | Alphanumeric| Max:255 | Partner ID in PayU. | No |
| transaction > order > signature | Alphanumeric| Max:255 | Form-associated signature. | Yes |
| transaction > order > shippingAddress | Object | | Shipping address. | No |
| transaction > order > shippingAddress > street1 | Alphanumeric | Max:100 | Address Line 1. | No |
| transaction > order > shippingAddress > street2 | Alphanumeric | Max:100 | Address Line 2. | No |
| transaction > order > shippingAddress > city | Alphanumeric | Max:50  | City of the address. | No |
| transaction > order > shippingAddress > state | Alphanumeric | Max:40  | State of the address. | No |
| transaction > order > shippingAddress > country | Alphanumeric | 2 | Country of the address. | No |
| transaction > order > shippingAddress > postalCode | Alphanumeric | Max:8 | Postal code of the address. | No |
| transaction > order > shippingAddress > phone | Alphanumeric | Max:11 | Phone number associated with the address. | No |
| transaction > order > buyer | Object | | Information about the buyer. | Yes |
| transaction > order > buyer > merchantBuyerId | Alphanumeric| Max:100 | Buyer's ID in your system. | No |
| transaction > order > buyer > fullName | Alphanumeric| Max:150 | Buyer's full name. | Yes |
| transaction > order > buyer > emailAddress | Alphanumeric| Max:255 | Buyer's email address. | Yes |
| transaction > order > buyer > contactPhone | Alphanumeric| Max:20  | Buyer's phone number. | Yes |
| transaction > order > buyer > dniNumber | Alphanumeric| Max:20  | Buyer's identification number. | Yes |
| transaction > order > buyer > shippingAddress | Alphanumeric| | Buyer's shipping address. | Yes |
| transaction > order > buyer > shippingAddress > street1 | Alphanumeric | Max:150 | Buyer's shipping address Line 1. | Yes |
| transaction > order > buyer > shippingAddress > city | Alphanumeric | Max:50  | City of buyer's shipping address. | Yes |
| transaction > order > buyer > shippingAddress > state | Alphanumeric | Max:40 | State of buyer's shipping address. | Yes |
| transaction > order > buyer > shippingAddress > country | Alphanumeric | 2 | Country of buyer's shipping address in ISO 3166 alpha-2 format. | Yes |
| transaction > order > buyer > shippingAddress > postalCode | Number | Max:20  | Postal code of buyer's shipping address. | Yes |
| transaction > order > buyer > shippingAddress > phone | Number | Max:20 | Phone number of buyer's shipping address. | Yes |
| transaction > order > additionalValues | Object | 64 | Order amount and its associated values. | Yes |
| transaction > order > additionalValues > TX_VALUE | Alphanumeric| 64 | Transaction amount. | Yes |
| transaction > order > additionalValues > TX_VALUE > value | Number | 12, 2  | Specifies the transaction amount. | Yes |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO code of the currency. | No |
| transaction > order > additionalValues > TX_TAX | Alphanumeric| 64 | Value of the Value Added Tax (VAT). | Yes |
| transaction > order > additionalValues > TX_TAX > value | Number | 12, 2  | Specifies the VAT amount. | No |
| transaction > order > additionalValues > TX_TAX > currency | Alphanumeric | 3 | ISO code of the currency. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alphanumeric | 64 | Base value for calculating VAT. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Number | 12, 2 | Specifies the transaction base amount. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alphanumeric | 3 | ISO code of the currency. Consult accepted currencies. | No |
| transaction > extraParameters > OTP | Alphanumeric| 6 | Code generated in the Yape application needed to approve a Yape transaction (One Time Password). | |
| transaction > payer | Payer Information. | | Information about the payer. | Yes |
| transaction > payer > emailAddress | Alphanumeric| Max:255| Payer's email address. | Yes |
| transaction > payer > merchantPayerId | Alphanumeric| Max:100| Payer's identifier in your system. | No |
| transaction > payer > fullName | Alphanumeric| Max:150| Payer's full name. | Yes |
| transaction > payer > billingAddress | Billing Address. | | Payer's billing address. | Yes       |
| transaction > payer > billingAddress > street1 | Alphanumeric| Max:100 | Line 1 of the billing address. | Yes |
| transaction > payer > billingAddress > street2 | Alphanumeric| Max:100 | Line 2 of the billing address. | No |
| transaction > payer > billingAddress > city | Alphanumeric| Max:50 | City of the billing address. | Yes |
| transaction > payer > billingAddress > state | Alphanumeric| Max:40  | State of the billing address. | No |
| transaction > payer > billingAddress > country | Alphanumeric| 2 | Country of the billing address in ISO 3166 Alpha-2 format. | Yes |
| transaction > payer > billingAddress > postalCode| Alphanumeric| Max:20  | Postal code of the billing address. | No |
| transaction > payer > billingAddress > phone | Alphanumeric| Max:20  | Phone number of the billing address. | No |
| transaction > payer > birthdate | Alphanumeric| Max:10  | Payer's date of birth. | No |
| transaction > payer > contactPhone | Alphanumeric| Max:20  | Payer's phone number. This is the number to be used for Yape payment.| Yes |
| transaction > payer > dniNumber | Alphanumeric| Max:20  | Payer's identification number. | Yes |
| transaction > payer > dniType | Alphanumeric| 2 | Payer's identification type. Consult document types. | No |
| transaction > type | Alphanumeric| 32 | Set this value according to the transaction. For Colombia, set AUTHORIZATION_AND_CAPTURE. | Yes |
| transaction > paymentMethod | Alphanumeric| 32 | Set YAPE for Yape Payment Method. | Yes |
| transaction > paymentCountry | Alphanumeric| 2 | Set PE for Peru. | Yes |
| transaction > deviceSessionId | Alphanumeric| Max:255 | Device session identifier where the customer performs the transaction. | Yes |
| transaction > ipAddress | Alphanumeric| Max:39  | IP address of the device where the customer performs the transaction. | Yes |
| transaction > cookie | Alphanumeric| Max:255 | Cookie stored by the device where the customer performs the transaction. | Yes |
| transaction > userAgent | Alphanumeric| Max:1024| User agent of the browser where the customer performs the transaction. | Yes |

</details>

<details>
<summary> Response </summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description |
|---|---|---|---|
| code | Alphanumeric | | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse | Object | | The response data. |
| transactionResponse > orderId | Number | | The generated or existing order Id in PayU. |
| transactionResponse > transactionId | Alphanumeric | 36 | The identifier of the transaction in PayU. |
| transactionResponse > state | Alphanumeric| Max:32 | The status of the transaction. |
| transactionResponse > responseCode | Alphanumeric| Max:64 | The response code associated with the status. |
| transactionResponse > pendingReason | Alphanumeric | Max:64 | The pending reason of the transaction |
| transactionResponse > paymentNetworkResponseCode | Alphanumeric| Max:255  | The response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alphanumeric | Max:255  | The error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alphanumeric | Max:32 | The traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alphanumeric | Max:12 | The authorization code returned by the financial network. |
| transactionResponse > responseMessage | Alphanumeric | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date | | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters | Object | | Additional parameters or data associated with the response. In JSON, the extraParameters parameter follows this structure: "extraParameters": { "BANK_REFERENCED_CODE": "CREDIT"}In XML, the extraParameters parameter follows this structure: <extraParameters> <entry> <string>BANK_REFERENCED_CODE</string> <string>CREDIT</string> </entry></extraParameters> |
| transactionResponse > additionalInfo | Object | | Additional information associated with the response. This object follows the same structure than transactionResponse.extraParameters. |

</details>

### API call
The following are the request and response bodies for this payment method.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Example of a request:
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
      "accountId": "512323",
      "referenceCode": "PRODUCT_TEST_2021-06-21T16:39:10.965Z",
      "description": "Payment test description",
      "language": "es",
      "signature": "af24b22ad0aa0b14dbe3c21a07d9558c",
      "notifyUrl": "http://www.payu.com/notify",
      "additionalValues": {
        "TX_VALUE": {
          "value": 100,
          "currency": "PEN"
        }
      },
      "buyer": {
        "merchantBuyerId": "1",
        "fullName": "First name and second buyer  name",
        "emailAddress": "buyer_test@test.com",
        "contactPhone": "7563126",
        "dniNumber": "123456789",
        "shippingAddress": {
          "street1": "Av. Isabel La Católica 103-La Victoria",
          "street2": "5555487",
          "city": "Lima",
          "state": "Lima y Callao",
          "country": "PE",
          "postalCode": "000000",
          "phone": "7563126"
        }
      },
      "shippingAddress": {
        "street1": "Av. Isabel La Católica 103-La Victoria",
        "street2": "5555487",
        "city": "Lima",
        "state": "Lima y Callao",
        "country": "PE",
        "postalCode": "0000000",
        "phone": "7563126"
      }
    },
    "extraParameters": {
      "OTP": "557454"
    },    
    "payer": {
      "merchantPayerId": "1",
      "fullName": "First name and second payer name",
      "emailAddress": "payer_test@test.com",
      "contactPhone": "969929157",
      "dniNumber": "5415668464654",
      "billingAddress": {
        "street1": "Av. Isabel La Católica 103-La Victoria",
        "street2": "125544",
        "city": "Lima",
        "state": "Lima y Callao",
        "country": "PE",
        "postalCode": "000000",
        "phone": "7563126"
      }
    },
    "type": "AUTHORIZATION_AND_CAPTURE",
    "paymentMethod": "YAPE",
    "expirationDate": "2021-06-22T19:51:20.302",
    "paymentCountry": "PE",
    "ipAddress": "127.0.0.1"
  },
  "test": true
}
```
<br>

Example of a response:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 2151156450,
        "transactionId": "70149315-677f-4bc0-9f59-a1de47ef4f7e",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "437",
        "authorizationCode": "160105",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado y completado con exito",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1706024870610,
        "referenceQuestionnaire": null,
        "extraParameters": null,
        "additionalInfo": null
    }
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example of a request:
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
         <accountId>512323</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-21T16:39:10.965Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>af24b22ad0aa0b14dbe3c21a07d9558c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>100</value>
                  <currency>PEN</currency>
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
               <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>            
               <city>Lima</city>
               <state>Lima y Callao</state>               
               <country>PE</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>            
               <city>Lima</city>
               <state>Lima y Callao</state>               
               <country>PE</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <extraParameters>
         <OTP>557454</OTP>
      </extraParameters>
      <payer>
         <billingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>            
            <city>Lima</city>
            <state>Lima y Callao</state>               
            <country>PE</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
         <contactPhone>969929157</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <emailAddress>payer_test@test.com</emailAddress>
         <fullName>First name and second payer name</fullName>
         <merchantPayerId>1</merchantPayerId>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>YAPE</paymentMethod>
      <expirationDate>2021-06-16T16:07:11</expirationDate>
      <paymentCountry>PE</paymentCountry>
      <ipAddress>127.0.0.1</ipAddress>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Example of a response:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>2151156450</orderId>
        <transactionId>70149315-677f-4bc0-9f59-a1de47ef4f7e</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>437</trazabilityCode>
        <responseCode>APPROVED</responseCode>
        <authorizationCode>160105</authorizationCode>        
        <responseMessage>Aprobado y completado con exito</responseMessage>
        <operationDate>2024-01-19T08:17:42</operationDate>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Considerations
* Payments processed through our gateway will be made on behalf of your business by PayU.
* The maximum amount that payers can process with Yape is 950 soles accumulated per day.
* To check an active code for your transaction, use the [Queries API](https://developers.payulatam.com/latam/en/docs/integrations/api-integration/queries-api.html).
* Yape supports total refunds, partial refunds, and cancellations.
* API integrations containing spaces in the phone number may result in transaction loss. Below are the cases that can be approved or may generate errors:
    * **Approved case 1:** `51` `969929157` → The country code and phone number are separated.
    * **Approved case 2:** `969929157` → There is a single field for the phone number without spaces.
    * **Error case 1:** `51969929157` → The country code and phone number are in the same field.
    * **Error case 2:** `51` `969` `929157` → The phone number is separated by spaces.
    <p></p>

    Therefore, to avoid errors and improve the user experience, we recommend the following:
    1. Use a single field for the phone number that automatically includes the country code, or display two separate fields in the interface: one for the country code and another for the phone number.
    2. Configure the interface to accept a maximum of 9 digits and display a message to the user informing them that the entered phone number must consist of 9 digits.
    3. Configure the interface to avoid spaces or automatically remove them, or display a message to the user instructing them to enter the number without spaces.

### Testing in sandbox environment 
To test Yape transactions in the PayU Sandbox environment, use the following data:

<table border="1"> 
<tr> 
<th colspan="2"><h5>Test Cases</h5></th>
<th colspan="3"><h5>PayU Response</h5></th>  
</tr> 
 
<tr> 
<td><b>transaction > payer > contactPhone</b></td> 
<td><b>transaction > extraParameters > OTP</b></td> 
<td><b>state</b></td> 
<td><b>responseCode</b></td> 
<td><b>responseMessage</b></td> 
</tr>

<tr> 
<td>969929157</td> 
<td>557454</td> 
<td>APPROVED</td> 
<td>APPROVED</td> 
<td>Approved and completed successfully.</td> 
</tr>

<tr> 
<td>969929157</td> 
<td>000000</td> 
<td>DECLINED</td> 
<td>INVALID_TRANSACTION</td> 
<td>Operation denied. Incorrect OTP.</td> 
</tr>

<tr> 
<td>999999999</td> 
<td>284563</td> 
<td>DECLINED</td> 
<td>NOT_ACCEPTED_TRANSACTION</td> 
<td>Operation denied. Inactive account.</td> 
</tr>

<tr> 
<td>993355231</td> 
<td>784592</td> 
<td>DECLINED</td> 
<td>PAYMENT_NETWORK_REJECTED</td> 
<td>Operation denied. Account not allowed.</td> 
</tr>

<tr> 
<td>969929157</td> 
<td>285743</td> 
<td>DECLINED</td> 
<td>EXCEEDED_AMOUNT</td> 
<td>Daily limit exceeded.</td> 
</tr>

<tr> 
<td>991055199</td> 
<td>378458</td> 
<td>DECLINED</td> 
<td>INVALID_TRANSACTION</td> 
<td>Operation denied. Blocked OTP.</td> 
</tr>

<tr> 
<td>995555126</td> 
<td>678452</td> 
<td>DECLINED</td> 
<td>INVALID_TRANSACTION</td> 
<td>Operation denied. Account not associated with the program.</td> 
</tr>

<tr> 
<td>969929158</td> 
<td>528475</td> 
<td>DECLINED</td> 
<td>REPEAT_TRANSACTION</td> 
<td>Error: incorrect Yape code.</td> 
</tr>

<tr> 
<td>969929158</td> 
<td>074854</td> 
<td>DECLINED</td> 
<td>REPEAT_TRANSACTION</td> 
<td>Error: incorrect Yape code.</td> 
</tr>

<tr> 
<td>969929158</td> 
<td>875612</td> 
<td>DECLINED</td> 
<td>NOT_ACCEPTED_TRANSACTION</td> 
<td>Error: incorrect Yape code.</td> 
</tr>

</table>

## Submit transactions using cash
This method lets you process the payments in cash of your customers. To integrate with cash transactions, you must redirect the customer to the URL found in the response of the method; your customer sees a payment receipt like this.

<img src="/assets/Payments/CashReceiptPE.png" alt="PrintScreen" width="50%">

### Variables for request and response

<details>
<summary>Request</summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Show mandatory fields only</label>
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
| transaction > order > shippingAddress > state | Alphanumeric | Max:40 | Address State. | No |
| transaction > order > shippingAddress > country | Alphanumeric | 2 | Address country. | No |
| transaction > order > shippingAddress > postalCode | Alphanumeric | Max:8 | Address Zip code. | No |
| transaction > order > shippingAddress > phone | Alphanumeric | Max:11 | Phone number associated to the address. | No |
| transaction > order > buyer |  |  | Buyer information. | Yes |
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
| transaction > order > additionalValues > |  | 64 | Amount of the order or its associated values. | Yes |
| transaction > order > additionalValues > TX_VALUE | Alphanumeric | 64 | Amount of the transaction. | Yes |
| transaction > order > additionalValues > TX_VALUE > value | Number | 12, 2 | Specifies the amount of the transaction, this value may have two decimal digits (Ex. `10000.00` or `10000`). | Yes |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Yes |
| transaction > order > additionalValues > TX_TAX | Alphanumeric | 64 | Amount of the Value Added Tax (VAT). | Yes |
| transaction > order > additionalValues > TX_TAX > value | Number | 12, 2 | Specifies the amount of the VAT.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alphanumeric | 64 | Base value to calculate the VAT.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Number | 12, 2 | Specifies the base amount of the transaction. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > payer |  |  | Payer information. | Yes |
| transaction > payer > emailAddress | Alphanumeric | Max:255 | Payer e-mail address. | Yes |
| transaction > payer > merchantPayerId | Alphanumeric | Max:100 | Identifier of the payer in your system. | No |
| transaction > payer > fullName | Alphanumeric | Max:150 | Name of the payer. | Yes |
| transaction > payer > billingAddress |  |  | Billing address. | Yes |
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
| transaction > type | Alphanumeric | 32 | As cash payments are performed in physical offices, the only available transaction type is `AUTHORIZATION_AND_CAPTURE` | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid Payment Method in cash. [See the available Payment Methods for Peru]({{< ref "select-your-payment-method.html#Peru" >}}). |
| transaction > paymentCountry | Alphanumeric | 2 | Set `PE` for Peru. | Yes |
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
* The parameter `transaction.expirationDate` is not mandatory. If you don't send this parameter, its default value is seven (7) days after the current date.<br>If you send a date later than the default number of days, PayU will ignore this value and the expiration will be set as default.
* For cash payments, the following parameters are mandatory:
   - `transaction.order.buyer.fullName`
   - `transaction.payer.fullName`
   - `transaction.payer.emailAddress` or `transaction.order.buyer.emailAddress`.
* The parameter `transactionResponse.extraParameters` has the following parameters related to the transaction:
   - **REFERENCE**: internal payment reference generated by PayU.
   - **EXPIRATION_DATE**: maximum term for the payer to perform the payment.
   - **BAR_CODE**: barcode which lets the payer perform the payment. 
   - **URL_PAYMENT_RECEIPT_HTML**: payment receipt in HTML format. This is where you need to redirect the payment when the payer selects cash payment. 
   - **URL_PAYMENT_RECEIPT_PDF**: payment receipt in PDF format.

### API call
The following are the bodies of the request and response of this payment method.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Example of a request:
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
         "accountId": "512323",
         "referenceCode": "PRODUCT_TEST_2021-06-21T16:39:10.965Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "af24b22ad0aa0b14dbe3c21a07d9558c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 100,
               "currency": "PEN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer  name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Isabel La Católica 103-La Victoria",
               "street2": "5555487",
               "city": "Lima",
               "state": "Lima y Callao",
               "country": "PE",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "5555487",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
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
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "125544",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
	  "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "PAGOEFECTIVO",
      "expirationDate": "2021-06-22T19:51:20.302",
      "paymentCountry": "PE",
      "ipAddress": "127.0.0.1"
   },
   "test": true
}
```
<br>

Example of a response:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 857804123,
        "transactionId": "fd685f0a-f5b2-40cf-9527-dcc85febe184",
        "state": "PENDING",
        "paymentNetworkResponseCode": "Se ha Generado el CIP: 00000002592100 .",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "2592100",
        "authorizationCode": "1",
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": null,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "REFERENCE": 857804123,
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857804123Yfd685f0af5b240cYd231ed8660a7c9a",
            "EXPIRATION_DATE": 1624391480302,
            "BAR_CODE": "2592100",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857804123Yfd685f0af5b240cYd231ed8660a7c9a"
        },
        "additionalInfo": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example of a request:
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
         <accountId>512323</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-21T16:39:10.965Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>af24b22ad0aa0b14dbe3c21a07d9558c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>100</value>
                  <currency>PEN</currency>
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
               <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>            
               <city>Lima</city>
               <state>Lima y Callao</state>               
               <country>PE</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>            
               <city>Lima</city>
               <state>Lima y Callao</state>               
               <country>PE</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <billingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>            
            <city>Lima</city>
            <state>Lima y Callao</state>               
            <country>PE</country>
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
      <paymentMethod>PAGOEFECTIVO</paymentMethod>
      <expirationDate>2021-06-16T16:07:11</expirationDate>
      <paymentCountry>PE</paymentCountry>
      <ipAddress>127.0.0.1</ipAddress>
   </transaction>
   <isTest>false</isTest>
</request>

```
<br>

Example of a response:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>857804131</orderId>
        <transactionId>185f578b-2247-4a28-85b9-128c7b90c989</transactionId>
        <state>PENDING</state>
        <paymentNetworkResponseCode>Se ha Generado el CIP: 00000002592102 .</paymentNetworkResponseCode>
        <trazabilityCode>2592102</trazabilityCode>
        <authorizationCode>1</authorizationCode>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <extraParameters>
            <entry>
                <string>REFERENCE</string>
                <int>857804131</int>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857804131Y185f578b22474a2Y11601e067841b94</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-28T23:59:59</date>
            </entry>
            <entry>
                <string>BAR_CODE</string>
                <string>2592102</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857804131Y185f578b22474a2Y11601e067841b94</string>
            </entry>
        </extraParameters>
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

| Field name | Format | Size | Description |
|-|-|-|-|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). |
| command | Alphanumeric | Max:32 | Set `GET_PAYMENT_METHODS`. |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | 
| merchant |  |  | This object has the authentication data. |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |

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

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Example of a request:
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

Example of a response:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "paymentMethods": [
        {
            "id": "258",
            "description": "DINERS",
            "country": "PE",
            "enabled": true,
            "reason": null
        },
        {
            "id": "1067",
            "description": "VISA",
            "country": "PE",
            "enabled": true,
            "reason": null
        }
    ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example of a request:
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

Example of a response:
```XML
<paymentMethodsResponse>
    <code>SUCCESS</code>
    <paymentMethods>
        <paymentMethodComplete>
            <id>258</id>
            <description>DINERS</description>
            <country>PE</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>1067</id>
            <description>VISA</description>
            <country>PE</country>
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
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). |
| command | Alphanumeric | Max:32 | Set `PING`. |
| test (JSON)<hr>isTest (XML) | Boolean |  | Set `true` if the request is in test mode. Otherwise, set `false`. | 
| merchant |  |  | This object has the authentication data. |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |

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

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Example of a request:
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

Example of a response:
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

Example of a request:
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

Example of a response:
```XML
<paymentResponse>
    <code>SUCCESS</code>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

