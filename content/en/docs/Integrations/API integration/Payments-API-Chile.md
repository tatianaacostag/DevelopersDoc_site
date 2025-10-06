---
title: "Payments API - Chile"
linkTitle: "Payments API - Chile"
date: 2021-05-03T15:48:08-05:00
description: >
  The Payments API for Chile allows you to efficiently integrate PayU's payment processing capabilities with your online shopping platform. Through this API, businesses can offer their customers a wide variety of payment methods, such as credit, debit, or prepaid cards; bank transfers via Khipu; or debit or prepaid cards through WebPay Plus.
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

* [Submit Transactions Using Credit, Debit or Prepaid Cards]({{< ref "Payments-API-Chile.md#submit-transactions-using-credit-debit-or-prepaid-cards" >}})
* [Submit Transactions Using Khipu]({{< ref "Payments-API-Chile.md#submit-transactions-using-khipu" >}})
* [Submit Transactions Using Debit and Prepaid Cards Through WebPay Plus]({{< ref "Payments-API-Chile.md#submit-transactions-using-debit-and-prepaid-cards-through-webpay-plus" >}})
* [Include Passenger Name Record Information]({{< ref "#include-passenger-name-record-information-optional" >}})
* [Available Payment Methods Query]({{< ref "Payments-API-Chile.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-API-Chile.md#ping" >}})

{{% alert title="Note" color="info"%}}

To confirm the status of a transaction, you can use one of the following options:
* Monitor the URL specified in the `transaction.notifyUrl` parameter.
* Check the **Confirmation URL** configured in the PayU Management Panel under **Settings** > **Technical configuration**.
* Use the [Queries API or SDK]({{< ref "Queries.md" >}}).

{{% /alert %}}

## Submit Transactions Using Credit, Debit or Prepaid Cards {#submit-transactions-using-credit-debit-or-prepaid-cards}

This method lets you process payments that your customers conduct using credit, debit or prepaid cards. For Chile, you can implement the two-step flow (**Authorization**, **Capture**), or the one-step flow (**Charge**). For more information, refer to [Payment Flows]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Note" color="info"%}}

Two-step flow is available upon request. Contact your sales representative for more information.

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
| transaction > order > additionalValues > TX_VALUE > value | Number | 12, 2 | Specifies the amount of the transaction. This amount cannot include decimals. | Yes |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Yes |
| transaction > order > additionalValues > TX_TAX | Alphanumeric | 64 | Amount of the Value Added Tax (VAT). | Yes |
| transaction > order > additionalValues > TX_TAX > value | Number | 12, 2 | Specifies the amount of the VAT.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alphanumeric | 64 | Base value to calculate the VAT.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits. | No |
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
| transaction > payer | Object |  | Payer information. | Yes |
| transaction > payer > emailAddress | Alphanumeric | Max:255 | Payer e-mail address. | Yes |
| transaction > payer > merchantPayerId | Alphanumeric | Max:100 | Identifier of the payer in your system. | No |
| transaction > payer > fullName | Alphanumeric | Max:150 | Name of the payer which must meet the name sent in the parameter `transaction.creditCard.name` for credit card payments. | Yes |
| transaction > payer > billingAddress | Object |  | Billing address. | Yes |
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
| transaction > type | Alphanumeric | 32 | Set this value according to the transaction you want:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` for one-step flows.</li></ul> | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid Credit or Debit card Payment Method. [See the available Payment Methods for Chile]({{< ref "select-your-payment-method.html#Chile" >}}). | Yes |
| transaction > paymentCountry | Alphanumeric | 2 | Set `CL` for Chile. | Yes |
| transaction > deviceSessionId | Alphanumeric | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Yes |
| transaction > ipAddress | Alphanumeric | Max:39 | IP address of the device where the customer performs the transaction. | Yes |
| transaction > cookie | Alphanumeric | Max:255 | Cookie stored by the device where the customer performs the transaction. | Yes |
| transaction > userAgent | Alphanumeric | Max:1024 | The User agent of the browser where the customer performs the transaction. | Yes |
| transaction > extraParameters | Object |  | Additional parameters or data associated with the request. The maximum size of each _extraParameters_ name is 64 characters.<li>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<li>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | No |

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
| transactionResponse > extraParameters | Object |  | Additional parameters or data associated with the response. <li>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<li>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Considerations

* **Credit Card Tokens:** When using credit card tokens for payments, include the following parameters:
  * `transaction.creditCardTokenId:` The identifier of the stored credit card token.
  * `transaction.creditCard.securityCode` (Optional): The card's security code (CVV), if required by your processing configuration. For more details on creating and using tokens, refer to the [Tokenization API]({{< ref "Tokenization-API.md" >}}).
* **Currency:** Transactions must be submitted in Chilean Pesos (CLP) using whole numbers only. **Decimal values are not accepted**.
* **Two-Step Flow (Authorization & Capture):**
  * To enable this functionality, please contact your PayU sales representative.
  * Currently supported only for single-installment payments. The integration will automatically reject transactions with multiple installments. 
* **Security Code (CVV):**
  * By default, processing credit card transactions without the CVV is disabled.
  * To enable CVV-less processing, contact your PayU sales representative. Once enabled, set the `creditCard.processWithoutCvv2` parameter to `true` and omit the `creditCard.securityCode` parameter in your request.

### Authorization

Use this method to perform the **Authorization** step of a two-step flow. In this step, you authorize the payment but the amount is not debited until you [capture]({{< ref "payments-api-chile.md#capture" >}}) the funds.

#### Request and Response Examples

Below are examples of request and response bodies in JSON and XML formats.

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
         "accountId": "512325",
         "referenceCode": "PRODUCT_TEST_2021-06-25T16:33:48.512Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "77d72fb91eb43f9b15fb300d5f173da3",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 10000,
               "currency": "CLP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
               "street2": "5555487",
               "city": "RM",
               "state": "Talagante",
               "country": "CL",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "5555487",
            "city": "RM",
            "state": "Talagante",
            "country": "CL",
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
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "125544",
            "city": "RM",
            "state": "Talagante",
            "country": "CL",
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
      "paymentCountry": "CL",
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
        "orderId": 1400455722,
        "transactionId": "49cb24d9-eda6-43de-aad9-a17ffa9e5fb8",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "195569",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "49cb24d9-eda6-43de-aad9-a17ffa9e5fb8",
        "authorizationCode": "195569",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Approved transaction",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624616739664,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "TRANSBANK_DIRECT_TOKEN": "01ab3984007f3010d2adb6c02d104f85b8268ccf4b95da4b56f3abdb339e1c52"
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
         <accountId>512325</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-25T16:33:48.512ZZ</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>77d72fb91eb43f9b15fb300d5f173da3</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>10000</value>
                  <currency>CLP</currency>
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
               <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
               <street2>5555487</street2>
               <city>RM</city>
               <state>Talagante</state>
               <country>CL</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
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
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
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
      <paymentCountry>CL</paymentCountry>
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
        <orderId>1400455931</orderId>
        <transactionId>56f77e02-447a-4c98-a04b-9a8f3f92f3e7</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>363838</paymentNetworkResponseCode>
        <trazabilityCode>56f77e02-447a-4c98-a04b-9a8f3f92f3e7</trazabilityCode>
        <authorizationCode>363838</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Approved transaction</responseMessage>
        <operationDate>2021-06-25T06:33:55</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>TRANSBANK_DIRECT_TOKEN</string>
                <string>01ab79a6030063a6b4039a64a8cf7de471d7ad02390c118fbd7d66cfd1af9864</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

### Capture

Use this method to perform the **Capture** step in a two-step payment flow. In this step, you capture funds that were previously [authorized]({{< ref "payments-api-chile.md#authorization" >}}) to transfer them to your PayU account.

#### Considerations

Keep the following in mind when using the Capture method:
* Merchants must capture approved transactions within 7 days. After this period, the system will automatically void the transaction.
* Only the parameters shown in the request body are required to initiate a Capture. Ensure the order and transaction IDs correspond to an active authorization.
* The integration supports partial captures. For more information, see the [Partial Capture]({{< ref "#partial-capture" >}}) section.
* Merchants cannot capture an amount greater than what was originally authorized. 
* Captures are only allowed for transactions with a single installment.

#### Request and Response Examples

Below are examples of request and response bodies in JSON and XML formats.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}

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
        "orderId": 1400455931,
        "transactionId": "da91c0ec-632b-44e3-883d-b85821390519",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "da91c0ec-632b-44e3-883d-b85821390519",
        "authorizationCode": "169018",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Approved transaction",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624629865424,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "TRANSBANK_DIRECT_TOKEN": "01ab5a10f3c1bdd401ac86d7c21e4347a7b848171fad7830157abcaac0373c7e"
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
         <id>1400456250</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>ead41073-a03a-45aa-9e83-23d4b03197f0</parentTransactionId>
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
        <orderId>1400456250</orderId>
        <transactionId>9c4d12c4-277d-4936-9d15-735e21dd5a19</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>0</paymentNetworkResponseCode>
        <trazabilityCode>9c4d12c4-277d-4936-9d15-735e21dd5a19</trazabilityCode>
        <authorizationCode>698999</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Approved transaction</responseMessage>
        <operationDate>2021-06-25T09:08:16</operationDate>
        <extraParameters>
            <entry>
                <string>TRANSBANK_DIRECT_TOKEN</string>
                <string>01ab6ddef1f9350f7b970d33b9766db9b0d52c6b9cb353618ddc8cd58d076b59</string>
            </entry>
        </extraParameters>
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
* The minimum amount for partial capture is 50 CLP. 

#### Request and Response Examples

Below are examples of request and response bodies in JSON and XML formats.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}

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
                "value": 50,
                "currency": "CLP"
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
        <value>50</value>
        <currency>CLP</currency>
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

#### Request and Response Examples

Below are examples of request and response bodies in JSON and XML formats.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}

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
         "accountId": "512325",
         "referenceCode": "PRODUCT_TEST_2021-06-15T20:35:48.975Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "75ae7a887dfd759894c57eb1bc5a4288",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 10000,
               "currency": "CLP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
               "street2": "5555487",
               "city": "RM",
               "state": "Talagante",
               "country": "CL",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "5555487",
            "city": "RM",
            "state": "Talagante",
            "country": "CL",
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
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "125544",
            "city": "RM",
            "state": "Talagante",
            "country": "CL",
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
      "paymentCountry": "CL",
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
        "orderId": 1400431556,
        "transactionId": "14aed0cc-95cb-4b04-b4dd-0c7f8c3296e8",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "456505",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "14aed0cc-95cb-4b04-b4dd-0c7f8c3296e8",
        "authorizationCode": "456505",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Approved transaction",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1623834912248,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "TRANSBANK_DIRECT_TOKEN": "01ab306b62cd0ce17d462501b121ed6cac3794375054b80a51c01bad4ec51550"
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
         <accountId>512325</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-15T20:35:48.975Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>75ae7a887dfd759894c57eb1bc5a4288</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>10000</value>
                  <currency>CLP</currency>
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
               <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
               <street2>5555487</street2>
               <city>RM</city>
               <state>Talagante</state>
               <country>CL</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
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
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
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
      <paymentCountry>CL</paymentCountry>
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
        <orderId>1400431549</orderId>
        <transactionId>937ed9fe-72d3-44e2-b1b8-e38e9f8e08a4</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>185495</paymentNetworkResponseCode>
        <trazabilityCode>937ed9fe-72d3-44e2-b1b8-e38e9f8e08a4</trazabilityCode>
        <authorizationCode>185495</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Approved transaction</responseMessage>
        <operationDate>2021-06-16T04:13:51</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>TRANSBANK_DIRECT_TOKEN</string>
                <string>01abc29e7b32bbf011cdd2a1e9961c5d6bd068220f4b506b06c66e15de1acfd2</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Submit Transactions Using Khipu

Khipu is a payment solution that allows businesses in Chile to accept payments directly from their customers' bank accounts, without the need for credit or debit cards.

**Benefits for Your Business:**

* **Increase Your Sales:** Khipu offers a smooth and simple payment experience, which translates into a higher conversion rate and more sales.
* **Expand Your Reach:** Reach a wider audience by accepting payments from all banks in Chile, including customers who do not have a credit or debit card.
* **Improve Security:** Khipu employs encryption and authentication technologies to protect your customers' information and promote secure transactions.

### Khipu Payment Process

To integrate Khipu into your e-commerce platform, you can create a payment form and generate a user experience following the flow below:

1. **Payment Selection:** The customer chooses Khipu as the payment method in your checkout:

<img src="/assets/Payments/KHIPU_EN_01.png" alt="PrintScreen" width="250">

<p></p>

2. **Bank Selection:** The customer selects their preferred bank.

<img src="/assets/Payments/KHIPU_EN_02.png" alt="PrintScreen" width="250">

<p></p>

3. **Secure Authentication:** The customer enters their bank credentials on Khipu's secure platform.

<img src="/assets/Payments/KHIPU_EN_03.png" alt="PrintScreen" width="500">

<p></p>

4. **Payment Confirmation:** The customer receives an immediate transaction confirmation.

<img src="/assets/Payments/KHIPU_EN_04.png" alt="PrintScreen" width="250">

<p></p>

5. **Support and Receipt:** The system sends a detailed receipt to the customer's email address.

<img src="/assets/Payments/KHIPU_EN_05.png" alt="PrintScreen" width="250">

<p></p>

{{% alert title="Note" color="info"%}}

To perform tests in the Khipu banking environment, you can use the following credentials:
* **RUT:** `6238038-1`
* **Password:** `1234`

{{% /alert %}}

### Parameters for Request and Response

<details>

<summary>Request</summary>

<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Show mandatory fields only</label>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|---|---|---|---|---|
| language | Alphanumeric | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max:32 | Set `SUBMIT_TRANSACTION`. | Yes |
| merchant | Object |  | This object has the authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min:12 Max:32 | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min:6 Max:32 | Password provided by PayU. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| transaction | Object | | This object has the transaction data. | Yes |
| transaction > order | Object | | This object has the order data. | Yes |
| transaction > order > accountId | Number | | Identifier of your account. | Yes |
| transaction > order > referenceCode | Alphanumeric | Min:1 Max:255 | Represents the order identifier in your system. | Yes |
| transaction > order > description | Alphanumeric | Min:1 Max:255 | Order description. | Yes |
| transaction > order > language | Alphanumeric | 2 | Language used in buyer and seller emails. | Yes |
| transaction > order > notifyUrl | Alphanumeric | Max:2048 | Order confirmation URL. | No |
| transaction > order > partnerId | Alphanumeric | Max:255 | Partner ID in PayU. | No |
| transaction > order > signature | Alphanumeric | Max:255 | Signature associated to the form. For more information refer to [Authentication signature]({{< ref "integrations.html#authentication-signature" >}}). | Yes |
| transaction > order > additionalValues | Object | 64 | Order amount or its associated values. | Yes |
| transaction > order > additionalValues > TX_VALUE | Alphanumeric | 64 | Transaction amount. | Yes |
| transaction > order > additionalValues > TX_VALUE > value | Number | 12,2 | Specifies the transaction amount. This amount cannot include decimals. | Yes |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO currency code. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Yes |
| transaction > order > buyer | Object | | Buyer information. | Yes |
| transaction > order > buyer > merchantBuyerId | Alphanumeric | Max:100 | Buyer ID in your system. | No |
| transaction > order > buyer > fullName | Alphanumeric | Max:150 | Buyer's full name. | Yes |
| transaction > order > buyer > emailAddress | Alphanumeric | Max:255 | Buyer's email address. | Yes |
| transaction > order > buyer > contactPhone | Alphanumeric | Max:20 | Buyer's phone number. | Yes |
| transaction > order > buyer > dniNumber | Alphanumeric | Max:20 | Buyer's identification number. | Yes |
| transaction > order > buyer > shippingAddress | Object | | Buyer's shipping address. | Yes |
| transaction > order > buyer > shippingAddress > street1 | Alphanumeric | Max:150 | Line 1 of the buyer's shipping address. | Yes |
| transaction > order > buyer > shippingAddress > city | Alphanumeric | Max:50 | City of the buyer's shipping address. | Yes |
| transaction > order > buyer > shippingAddress > state | Alphanumeric | Max:40 | State of the buyer's shipping address. | Yes |
| transaction > order > buyer > shippingAddress > country | Alphanumeric | 2 | Buyer's shipping address country in ISO 3166 alpha-2 format. | Yes |
| transaction > order > buyer > shippingAddress > postalCode | Number | Max:20 | Buyer's shipping address postal code. | Yes |
| transaction > order > buyer > shippingAddress > phone | Number | Max:20 | Buyer's shipping address phone number. | Yes |
| transaction > order > shippingAddress | Object | | Shipping address. | No |
| transaction > order > shippingAddress > street1 | Alphanumeric | Max:100 | Address line 1. | No |
| transaction > order > shippingAddress > street2 | Alphanumeric | Max:100 | Address line 2. | No |
| transaction > order > shippingAddress > city | Alphanumeric | Max:50 | Address city. | No |
| transaction > order > shippingAddress > state | Alphanumeric | Max:40 | Address state. | No |
| transaction > order > shippingAddress > country | Alphanumeric | 2 | Address country. | No |
| transaction > order > shippingAddress > postalCode | Alphanumeric | Max:8 | Address postal code. | No |
| transaction > order > shippingAddress > phone | Alphanumeric | Max:11 | Phone number associated with the address. | No |
| transaction > payer | Object | | Payer information. | Yes |
| transaction > payer > emailAddress | Alphanumeric | 255 | Payer's email address. | Yes |
| transaction > payer > merchantPayerId | Alphanumeric | 100 | Payer identifier in your system. | No |
| transaction > payer > fullName | Alphanumeric | 150 | Payer's full name. | Yes |
| transaction > payer > billingAddress | Object | | Billing address. | Yes |
| transaction > payer > billingAddress > street1 | Alphanumeric | 100 | Billing address line 1. | Yes |
| transaction > payer > billingAddress > street2 | Alphanumeric | 100 | Billing address line 2. | No |
| transaction > payer > billingAddress > city | Alphanumeric | 50 | Billing address city. | Yes |
| transaction > payer > billingAddress > state | Alphanumeric | 40 | Billing address state. | No |
| transaction > payer > billingAddress > country | Alphanumeric | 2 | Billing address country in ISO 3166 Alpha-2 format. | Yes |
| transaction > payer > billingAddress > postalCode | Alphanumeric | 20 | Billing address postal code. | No |
| transaction > payer > billingAddress > phone | Alphanumeric | 20 | Billing address phone number. | No |
| transaction > payer > birthdate | Alphanumeric | 10 | Payer's birthdate. | No |
| transaction > payer > contactPhone | Alphanumeric | 20 | Payer's phone number. | Yes |
| transaction > payer > dniNumber | Alphanumeric | 20 | Buyer's identification number. | Yes |
| transaction > payer > dniType | Alphanumeric | 2 | Buyer's identification type. [See document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Yes |
| transaction > extraParameters | Object | | Additional parameters or data associated with the request. For Khipu bank transfer payments, this includes: the response page of your commerce (required), the bank code (required), and the bank name (optional). <li> In JSON, the `extraParameters` parameter is set as: `"extraParameters": {"RESPONSE_URL": "http://www.payu.com/response", "FINANCIAL_INSTITUTION_CODE": "Bawdf", "FINANCIAL_INSTITUTION_NAME": "DemoBank" }` </li> <li> In XML, the `extraParameters` parameter is set as: `<extraParameters> <entry> <string>RESPONSE_URL</string> <string>http://www.payu.com/response</string> </entry> <entry> <string>FINANCIAL_INSTITUTION_CODE</string> <string>Bawdf</string> </entry> <entry> <string>FINANCIAL_INSTITUTION_NAME</string> <string>DemoBank</string> </entry> </extraParameters>` </li> | Yes |
| transaction > type | Alphanumeric | 32 | As these payments are made on the Khipu website, the only available transaction is `AUTHORIZATION_AND_CAPTURE` | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid payment method for bank transfer. [See available payment methods for Chile]({{< ref "payments-api-chile.html#available-payment-methods-query" >}}). | Yes |
| transaction > paymentCountry | Alphanumeric | 2 | Set to `CL` for Chile. | Yes |
| transaction > deviceSessionId | Alphanumeric | 255 | Session identifier of the device where the customer makes the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Yes |
| transaction > ipAddress | Alphanumeric | 39 | IP address of the device where the customer makes the transaction. | Yes |
| transaction > cookie | Alphanumeric | 255 | Cookie stored by the device where the customer makes the transaction. | Yes |
| transaction > userAgent | Alphanumeric | 1024 | The user agent of the browser where the customer conducts the transaction. | Yes |
| test (JSON) <hr>isTest (XML) | Boolean | | Set to `true` if the request is in test mode. Otherwise, set to `false`. | Yes |

</details>

<details>

<summary>Response</summary>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description |
|---|---|---|---|
| code | Alphanumeric | | Transaction response code. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max: 2048 | Error message associated when the response code is `ERROR`. |
| transactionResponse | Object | | Response data. |
| transactionResponse > orderId | Number | | Order ID generated or existing in PayU. |
| transactionResponse > transactionId | Alphanumeric | 36 | Transaction identifier in PayU. |
| transactionResponse > state | Alphanumeric | Max: 32 | Transaction state. Since the user makes the payment at a physical office, the state for a successful transaction is `PENDING`. |
| transactionResponse > paymentNetworkResponseCode | Alphanumeric | Max: 255 | Response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alphanumeric | Max: 255 | Error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alphanumeric | Max: 32 | Traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alphanumeric | Max: 12 | Authorization code returned by the financial network. |
| transactionResponse > pendingReason | Alphanumeric | Max: 21 | Reason code associated with the state. As mentioned in `transactionResponse > state`, the transaction is awaiting payment. |
| transactionResponse > responseCode | Alphanumeric | Max: 64 | Response code associated with the state. In this case, for successful transactions, it is `PENDING_TRANSACTION_CONFIRMATION`. |
| transactionResponse > responseMessage | Alphanumeric | Max: 2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date | | Date the response was created in the PayU system. |
| transactionResponse > extraParameters | Object | | Additional parameters or data associated with the response. The `BANK_URL` is the URL you should use to redirect your payer to Khipu. <li>In JSON, the `extraParameters` parameter follows this structure: `"extraParameters": { "BANK_URL": "xxxx" }` <li>In XML, the `extraParameters` parameter follows this structure: `<extraParameters> <entry> <string>BANK_URL</string> <string>xxxx</string> </entry> </extraParameters>` |

</details>

{{% alert title="Note" color="info"%}}

To simulate specific test outcomes (`OK`, `ERROR`, `WARNING`, `CONTINUE`), refer to the [Khipu Test Cases Documentation](https://docs.khipu.com/en/payment-solutions/instant-payments/khipu-client-test-cases).

{{% /alert %}}

### Request and Response Examples

Below are examples of request and response bodies in JSON and XML formats.

{{% alert title="Note" color="info"%}}

For testing, you can use:
* `"FINANCIAL_INSTITUTION_CODE": "Bawdf"`
* `"FINANCIAL_INSTITUTION_NAME": "DemoBank"`

{{% /alert %}}

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}

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
            "accountId": "512325",
            "referenceCode": "PRODUCT_TEST_2024-03-13T19:59:43.229Z",
            "description": "Payment test description",
            "language": "es",
            "signature": "1d6c33aed575c4974ad5c0be7c6a1c87",
            "notifyUrl": "http://www.payu.com/notify",
            "additionalValues": {
                "TX_VALUE": {
                    "value": 10000,
                    "currency": "CLP"
                }
            },
            "buyer": {
                "merchantBuyerId": "1",
                "fullName": "First name and second buyer name",
                "emailAddress": "buyer_test@test.com",
                "contactPhone": "7563126",
                "dniNumber": "123456789",
                "shippingAddress": {
                   "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
                   "street2": "5555487",
                   "city": "RM",
                   "state": "Talagante",
                   "country": "CL",
                   "postalCode": "000000",
                   "phone": "7563126"
                }
             },
             "shippingAddress": {
                "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
                "street2": "5555487",
                "city": "RM",
                "state": "Talagante",
                "country": "CL",
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
                "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
                "street2": "125544",
                "city": "RM",
                "state": "Talagante",
                "country": "CL",
                "postalCode": "000000",
                "phone": "7563126"
            }
        },
        "extraParameters": {
            "FINANCIAL_INSTITUTION_CODE": "Bawdf",
            "FINANCIAL_INSTITUTION_NAME": "DemoBank",
            "RESPONSE_URL": "http://www.payu.com/response"
        },
        "type": "AUTHORIZATION_AND_CAPTURE",
        "paymentMethod": "KHIPU",
        "paymentCountry": "CL",
        "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
        "ipAddress": "127.0.0.1",
        "cookie": "cookie_52278879710130",
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
        "orderId": 1400021721,
        "transactionId": "b5c1ef12-7f6b-4f00-9c43-6e801bf525ad",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "gsizttwrygpd",
        "authorizationCode": null,
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1710329617633,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_URL": "https://app.khipu.com/payment/simplified/gsizttwrygpd"
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
			<accountId>512325</accountId>
			<referenceCode>PRODUCT_TEST_2024-03-13T19:59:43.229Z</referenceCode>
			<description>Payment test description</description>
			<language>es</language>
			<signature>1d6c33aed575c4974ad5c0be7c6a1c87</signature>
			<notifyUrl>http://www.payu.com/notify</notifyUrl>
			<additionalValues>
                <string>TX_VALUE</string>
				<additionalValue>
					<value>10000</value>
					<currency>CLP</currency>
				</additionalValue>
			</additionalValues>
			<buyer>
				<merchantBuyerId>1</merchantBuyerId>
				<fullName>First name and second buyer name</fullName>
				<emailAddress>buyer_test@test.com</emailAddress>
				<contactPhone>7563126</contactPhone>
				<dniNumber>123456789</dniNumber>
				<shippingAddress>
					<street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
					<street2>5555487</street2>
					<city>RM</city>
					<state>Talagante</state>
					<country>CL</country>
					<postalCode>000000</postalCode>
					<phone>7563126</phone>
				</shippingAddress>
			</buyer>
			<shippingAddress>
				<street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
				<street2>5555487</street2>
				<city>RM</city>
				<state>Talagante</state>
				<country>CL</country>
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
				<street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
				<street2>125544</street2>
				<city>RM</city>
				<state>Talagante</state>
				<country>CL</country>
				<postalCode>000000</postalCode>
				<phone>7563126</phone>
			</billingAddress>
		</payer>
		<extraParameters>
            <entry>
                <string>FINANCIAL_INSTITUTION_CODE</string>
                <string>Bawdf</string>
            </entry>
            <entry>
                <string>FINANCIAL_INSTITUTION_NAME</string>
                <string>DemoBank</string>
            </entry>
            <entry>
                <string>RESPONSE_URL</string>
                <string>http://www.payu.com/response</string>
            </entry>
		</extraParameters>
		<type>AUTHORIZATION_AND_CAPTURE</type>
		<paymentMethod>KHIPU</paymentMethod>
		<paymentCountry>CL</paymentCountry>
		<deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
		<ipAddress>127.0.0.1</ipAddress>
		<cookie>cookie_52278879710130</cookie>
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
	<error />
	<transactionResponse>
		<orderId>1400021721</orderId>
		<transactionId>b5c1ef12-7f6b-4f00-9c43-6e801bf525ad</transactionId>
		<state>PENDING</state>
		<trazabilityCode>gsizttwrygpd</trazabilityCode>
		<authorizationCode />
		<pendingReason>AWAITING_NOTIFICATION</pendingReason>
		<responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
		<operationDate>1710329617633</operationDate>
		<referenceQuestionnaire />
		<extraParameters>
			<entry>
				<string>BANK_URL</string>
				<string>https://app.khipu.com/payment/simplified/gsizttwrygpd</string>
			</entry>
		</extraParameters>
	</transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

### List of Available Banks with Khipu

Optionally, with this method, you can get the list of banks available for conducting payments using Khipu:

<details>

<summary>Request</summary>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|---|---|---|---|---|
| language | Alphanumeric | 2 | Language used in the request. This language is used to display the generated error messages. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| command | Alphanumeric | Max: 32 | Set to `GET_BANKS_LIST`. | Yes |
| test (JSON) <hr> isTest (XML) | Boolean | | Set to `true` if the request is in test mode. Otherwise, set to `false`. | Yes |
| merchant | Object | | This object contains authentication data. | Yes |
| merchant > apiLogin | Alphanumeric | Min: 12 Max: 32 | User or login provided by PayU. [How to get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| merchant > apiKey | Alphanumeric | Min: 6 Max: 32 | Password provided by PayU. [How to get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Yes |
| bankListInformation | Object | | This object contains the query information. | Yes |
| bankListInformation > paymentMethod | Alphanumeric | | Set to `KHIPU`. | Yes |
| bankListInformation > paymentCountry | Alphanumeric | | Set to `CL`. | Yes |

</details>

<details>

<summary>Response</summary>

<br>

<div class="variables"></div>

| Field Name            | Format        | Description |
|-----------------------|---------------|-------------|
| code | Alphanumeric | Status code of the transaction response. Possible values are `SUCCESS` or `ERROR`. |
| error | Alphanumeric | Descriptive error message returned when the response `code` is `ERROR`. This field supports a maximum of 2048 characters. |
| banks | Object | List of banks available for processing payments via Khipu. |
| banks > id | Alphanumeric | Unique identifier of the bank. This value must be sent in the extra parameter `FINANCIAL_INSTITUTION_CODE` in the payment request. |
| banks > description | Alphanumeric | Human-readable name or label of the bank. |
| banks > bankCode    | Alphanumeric | Internal unique code assigned to the bank by Khipu. |
| banks > message     | Alphanumeric | Informational message or note related to the bank, such as usage or limitations. |
| banks > minAmount   | Numeric | Minimum transaction amount (in the local currency) supported by the bank. |
| banks > type | Alphanumeric | Type of banking entity. Possible values may include `Person` or `Company`, depending on the integration. |
| banks > parent      | Alphanumeric | Identifier of the parent or primary bank. If a bank offers both Personal and Business sections, the Personal section is considered the parent of the Business one. |

</details>

#### Request and Response Examples

Below are examples of request and response bodies in JSON and XML formats.

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Request Example:**

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
      "paymentMethod": "KHIPU",
      "paymentCountry": "CL"
   }
}
```

<br>

**Response Example:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "banks": [
        {
            "id": "0096yf-1080-4bce-2b2b-hj90904fte2f2",
            "description": "DemoBank",
            "bankCode": "Bawdf",
            "message": "Testing bank for dummy transactions.",
            "minAmount": "200.0",
            "type": "Person",
            "parentId": ""
        },
        {
            "id": "6796tf-5220-tvc4-4b2f-hx33904fte1v8",
            "description": "ABCBank",
            "bankCode": "Qertf",
            "message": "Testing bank for dummy transactions.",
            "minAmount": "460.0",
            "type": "Person",
            "parentId": ""
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
    <command>GET_BANKS_LIST</command>
    <merchant>
        <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <isTest>false</isTest>
    <bankListInformation>
        <paymentMethod>KHIPU</paymentMethod>
        <paymentCountry>CL</paymentCountry>
    </bankListInformation>
</request>

```

<br>

**Response Example:**

```XML
<bankListResponse>
    <code>SUCCESS</code>
    <error></error>
    <banks>
        <bank>
            <id>0096yf-1080-4bce-2b2b-hj90904fte2f2</id>
            <description>DemoBank</description>
            <bankCode>Bawdf</bankCode>
            <message>Testing bank for dummy transactions.</message>
            <minAmount>200.0</minAmount>
            <type>Person</type>
            <parentId></parentId>
        </bank>
        <bank>
            <id>6796tf-5220-tvc4-4b2f-hx33904fte1v8</id>
            <description>ABCBank</description>
            <bankCode>Qertf</bankCode>
            <message>Testing bank for dummy transactions.</message>
            <minAmount>460.0</minAmount>
            <type>Person</type>
            <parentId></parentId>
        </bank>
    </banks>
</bankListResponse>
```

{{< /tab >}}

{{< /tabs >}}

### Additional Considerations for Khipu Integration

**Transparency in Payments:** Payments processed through the Khipu gateway will appear on the payer's account statement under the name _PayU Chile SA_.

**Amount Limitations:** It is important to note that banks associated with Khipu may set minimum or maximum amount limits per transaction. These limits vary according to each financial institution.

**Refund Policies:** According to Khipu's policies, total, partial, or payment cancellations are not allowed once the transaction has been confirmed and processed.

**Payment Method Availability:** Note that the Khipu payment method is only available for the aggregator model. If your business requires a different payment model, consult your PayU advisor to explore other available solutions.

### Additional Resources

* [Official Khipu logos:](https://docs.khipu.com/portal/en/payment-logos/)

## Submit Transactions Using Debit and Prepaid Cards Through WebPay Plus {#submit-transactions-using-debit-and-prepaid-cards-through-webpay-plus}

This method allows you to process payments using your customers' debit or prepaid cards. To integrate these transactions, you must redirect your customer to the URL included in the response; there, the customer will see a payment page like the one below.

<img src="/assets/Payments/BankTransferReceiptCL.png" alt="PrintScreen" width="50%">

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
| transaction > order > additionalValues > TX_VALUE > value | Number | 12, 2 | Specifies the amount of the transaction. This amount cannot include decimals. | Yes |
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
| transaction > payer > billingAddress > postalCode | Alphanumeric | Max:20 | Billing address zip code. | No |
| transaction > payer > billingAddress > phone | Alphanumeric | Max:20 | Billing address phone number. | No |
| transaction > payer > birthdate | Alphanumeric | Max:10 | Payer's date of birth. | No |
| transaction > payer > contactPhone | Alphanumeric | Max:20 | Payer's phone number. | Yes |
| transaction > payer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. | Yes |
| transaction > payer > dniType | Alphanumeric | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alphanumeric | 32 | As payments are made on the WebPay plus page, the only available transaction type is `AUTHORIZATION_AND_CAPTURE` | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid Payment Method for Debit and prepaid cards. [See the available Payment Methods for Chile]({{< ref "select-your-payment-method.html#Chile" >}}). | Yes |
| transaction > paymentCountry | Alphanumeric | 2 | Set `CL` for Chile. | Yes |
| transaction > deviceSessionId | Alphanumeric | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Yes |
| transaction > ipAddress | Alphanumeric | Max:39 | IP address of the device where the customer performs the transaction. | Yes |
| transaction > cookie | Alphanumeric | Max:255 | Cookie stored by the device where the customer performs the transaction. | Yes |
| transaction > userAgent | Alphanumeric | Max:1024 | The User agent of the browser where the customer performs the transaction. | Yes |
| transaction > extraParameters | Object |  | Additional parameters or data associated with the request. For payments through WebPay plus, this is the response page of your commerce. <li>In JSON, the _extraParameters_ parameter is set as: <br>`"extraParameters": {`<br>&emsp;`"RESPONSE_URL": "http://www.test.com/response"`<br>`}` <li>In XML, the _extraParameters_ parameter is set as: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>RESPONSE_URL</string>`<br>&emsp;&emsp;`http://www.test.com/response`<br>&emsp;`</entry>`<br>`</extraParameters>` | No |

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
| transactionResponse > extraParameters | Object |  | Additional parameters or data associated with the response. <li>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"URL_PAYMENT_REDIRECT": "xxxx"`<br>`}` <li>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>URL_PAYMENT_REDIRECT</string>`<br>&emsp;&emsp;`<string>xxxx</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Considerations

* If you do not include the `RESPONSE_URL` parameter within the `transaction.extraParameters`, the API will retrieve the value from the **Response URL** variable located in your PayU Administration Panel under **Settings** > **Technical configuration**.
* When processing payments via WebPay Plus, you must redirect the customer to the URL obtained by concatenating the `URL_PAYMENT_REDIRECT` extra parameter with the `TRANSBANK_DIRECT_TOKEN` extra parameter, as follows: `<br> URL_PAYMENT_REDIRECT?token_ws=TRANSBANK_DIRECT_TOKEN`.
* Upon a successful payment request, the transaction will have a `PENDING` status and a `PENDING_PAYMENT_IN_ENTITY` `responseCode`. This is because the integration redirects the payer to the selected bank to finalize the payment.
* The response page must contain the following variables, which are transmitted via `GET` method:

    | Variable            | Description                                                     |
    | :------------------ | :-------------------------------------------------------------- |
    | `transactionState`  | Current status of the transaction.                          |
    | `reference_pol`     | Unique reference code for identifying the transaction within PayU. |
    | `TX_VALUE`          | Total amount of the transaction.                            |
    | `authorizationCode` | Authorization code provided for the transaction.            |
    | `processingDate`    | Date on which the integration processed the transaction.|
    | `cc_number`         | Visible digits of the credit card used for the transaction. |

### Request and Response Examples

Below are examples of request and response bodies in JSON and XML formats.

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
         "accountId": "512325",
         "referenceCode": "PRODUCT_TEST_2021-06-15T20:35:48.975Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "75ae7a887dfd759894c57eb1bc5a4288",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 10000,
               "currency": "CLP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer  name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "5415668464654",
            "shippingAddress": {
               "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
               "street2": "5555487",
               "city": "RM",
               "state": "Talagante",
               "country": "CL",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "5555487",
            "city": "RM",
            "state": "Talagante",
            "country": "CL",
            "postalCode": "000000",
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
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
               "street2": "5555487",
               "city": "RM",
               "state": "Talagante",
               "country": "CL",
               "postalCode": "000000",
               "phone": "7563126"
         }
      },
      "extraParameters": {
         "RESPONSE_URL": "http://www.test.com/response"
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "TRANSBANK_DEBIT",
      "paymentCountry": "CL",
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
        "orderId": 1400432466,
        "transactionId": "e2609a58-97d6-4a65-8638-1b03da03cc7a",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "5f0cac61-c023-4fa3-bf27-ff888fa36c3c",
        "authorizationCode": null,
        "pendingReason": "AWAITING_PAYMENT_IN_ENTITY",
        "responseCode": "PENDING_PAYMENT_IN_ENTITY",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1623856942412,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "EXPIRATION_DATE": 1623875847781,
            "URL_PAYMENT_REDIRECT": "https://webpay3gint.transbank.cl/webpayserver/initTransaction",
            "TRANSBANK_DIRECT_TOKEN": "01ab155164939156988ee462d09ed5613b7efd297fe97b099c684ec8599c5cc5"
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
         <accountId>512325</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-15T20:35:48.975Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>75ae7a887dfd759894c57eb1bc5a4288</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>10000</value>
                  <currency>CLP</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>5415668464654</dniNumber>
            <shippingAddress>
               <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
               <street2>5555487</street2>
               <city>RM</city>
               <state>Talagante</state>
               <country>CL</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
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
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <extraParameters>
         <entry>
            <string>RESPONSE_URL</string>
            <string>http://www.test.com/response</string>
         </entry>
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>TRANSBANK_DEBIT</paymentMethod>
      <paymentCountry>CL</paymentCountry>
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
        <orderId>1400432986</orderId>
        <transactionId>71a72319-f143-4359-8cb9-bc44a21d2b25</transactionId>
        <state>PENDING</state>
        <trazabilityCode>a0d9d7d6-000a-4777-af78-e33917a30fd8</trazabilityCode>
        <pendingReason>AWAITING_PAYMENT_IN_ENTITY</pendingReason>
        <responseCode>PENDING_PAYMENT_IN_ENTITY</responseCode>
        <operationDate>2021-06-16T12:22:28</operationDate>
        <extraParameters>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-16T17:42:53</date>
            </entry>
            <entry>
                <string>URL_PAYMENT_REDIRECT</string>
                <string>https://webpay3gint.transbank.cl/webpayserver/initTransaction</string>
            </entry>
            <entry>
                <string>TRANSBANK_DIRECT_TOKEN</string>
                <string>01abbca6da54f4e4ef9eb37fb9cacf72fdcc52797f6a9ca20377bc59eb0d2706</string>
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
| transaction > pnr > passengers[] > documentType | number | 2 | Document type. Possible values are:<br>`0` = Not specified<br>`1` = Citizenship card (Cédula de ciudadanía)<br>`2` = Foreign citizenship card (Cédula de extranjería)<br>`3` = Tax identification number (Número de identificación tributaria)<br>`4` = Identity card (Tarjeta de identidad)<br>`5` = Passport (Pasaporte)<br>`6` = Social security number (Tarjeta de seguridad social)<br>`7` = Foreign identification number (Sociedad extranjera sin NIT)<br>`8` = Escrow (Fideicomiso)<br>`9` = Birth certificate (Registro civil)<br>`10` = Diplomatic card (Carnet diplomático) | `5` |
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

#### API Call {#api-call-9}

The following are examples of the request for this method.

{{< tabs tabTotal="2" tabID="11" tabName1="JSON" tabName2="XML" >}}
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

| Field Name | Format | Size | Description |
|-|-|-|-|
| code | Alphanumeric |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alphanumeric | Max:2048 | The error message associated when the response code is `ERROR`. |
| paymentMethods | Object |  | List of the payment methods. |
| paymentMethods > paymentMethodComplete | Object |  | This object has the information of a payment method. |
| paymentMethods > paymentMethodComplete > id | Numeric |  | Payment method identifier. |
| paymentMethods > paymentMethodComplete > description | Alphanumeric | Max:32 | Payment method name. |
| paymentMethods > paymentMethodComplete > country | Alphanumeric | 2 | ISO code of the Payment method country. |

</details>

### Request and Response Examples

Below are examples of request and response bodies in JSON and XML formats. For illustrative purposes, the response shown includes two payment methods. 

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}

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
            "id": "716",
            "description": "VISA",
            "country": "CL",
            "enabled": true,
            "reason": null
        },
        {
            "id": "712",
            "description": "DINERS",
            "country": "CL",
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
            <id>716</id>
            <description>VISA</description>
            <country>CL</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>712</id>
            <description>DINERS</description>
            <country>CL</country>
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

| Field Name | Format | Size | Description | Mandatory |
|-|-|-|-|:-:|
| code | Alphanumeric |  | The response code of the transaction. | Yes |
| error | Alphanumeric | Max:2048 | The error message associated if an error ocurred. | Yes |
| transactionResponse | Object | Max:2048 | The response of the PING method if an error ocurred. | Yes |

</details>

### Request and Response Examples

Below are examples of request and response bodies in JSON and XML formats.

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}

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
