---
title: "Payments API - Panama"
linkTitle: "Payments API - Panama"
date: 2021-05-03T15:48:08-05:00
description: >
  Payments API Panama lets your shop process different transaction types with multiple payment methods.
weight: 20
tags: ["subtopic"]
---

To integrate with Payments API Panama, target your request to the following URLs according to your environment.

{{% alert title="URL" color="info"%}}
* Test: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Production: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Available methods
Payments API includes the following methods:

* [Submit transaction with credit card]({{< ref "Payments-API-Panama.md#submit-transaction-with-credit-cards" >}})
* [Available payment methods query]({{< ref "Payments-API-Panama.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-API-Panama.md#ping" >}})

{{% alert title="Note" color="info"%}}
To confirm the status of a transaction, you can use one of the following options:
* Navigate to the the URL set in the `transaction.notifyUrl` variable or the _**Confirmation URL**_ option located in the PayU Module in _**Settings**_ > _**Technical configuration**_.
* Use the [Queries API or SDK]({{< ref "Queries.md" >}}).
{{% /alert %}}

## Submit transaction with credit cards
This method lets you process the payments performed by your customers using credit cards. For Panama, you can perform one-step flows (**Charge**). For more information, refer to [Payment flows]({{< ref "payments.md#payment-flows" >}}).

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
| transaction > order > additionalValues > TX_VALUE > value | Number | 19, 2 | Specifies the amount of the transaction. This amount cannot include decimals. | Yes |
| transaction > order > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Yes |
| transaction > order > additionalValues > TX_TAX | Alphanumeric | 64 | Amount of the Value Added Tax (VAT). | Yes |
| transaction > order > additionalValues > TX_TAX > value | Number | 19, 2 | Specifies the amount of the VAT.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alphanumeric | 64 | Base value to calculate the VAT.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Number | 19, 2 | Specifies the base amount of the transaction. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > creditCardTokenId |  |  | Include this parameter when the transaction is done using a tokenized card replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}) | Yes |
| transaction > creditCard |  |  | Credit card information. This object and its parameters are mandatory when the payment is performed using not tokenized credit card. | No |
| transaction > creditCard > number | Alphanumeric | Min:13 Max:20 | Credit card number. | No |
| transaction > creditCard > securityCode | Alphanumeric | Min:1 Max:4 | Credit card security code (CVC2, CVV2, CID). | No |
| transaction > creditCard > expirationDate | Alphanumeric | 7 | Credit card expiration date. Format `YYYY/MM`. | No |
| transaction > creditCard > name | Alphanumeric | Min:1 Max:255 | Holder's name displayed in the credit card. | No |
| transaction > creditCard > processWithoutCvv2 | Boolean | Max:255 | Allows you to process transactions without including the credit card security code. Your commerce requires PayU's authorization before using this feature. | No |
| transaction > payer |  |  | Payer information. | Yes |
| transaction > payer > emailAddress | Alphanumeric | Max:255 | Payer e-mail address. | Yes |
| transaction > payer > merchantPayerId | Alphanumeric | Max:100 | Identifier of the payer in your system. | No |
| transaction > payer > fullName | Alphanumeric | Max:150 | Name of the payer which must meet the name sent in the parameter > creditCard > name for credit card payments. | Yes |
| transaction > payer > billingAddress |  |  | Billing address. | Yes |
| transaction > payer > billingAddress > street1 | Alphanumeric | Max:100 | Billing Address Line 1. | Yes |
| transaction > payer > billingAddress > street2 | Alphanumeric | Max:100 | Billing Address Line 2. | No |
| transaction > payer > billingAddress > city | Alphanumeric | Max:50 | Billing address city. | Yes |
| transaction > payer > billingAddress > state | Alphanumeric | Max:40 | Billing address state. | No |
| transaction > payer > billingAddress > country | Alphanumeric | 2 | Billing address country in format ISO 3166 Alpha-2. | Yes |
| transaction > payer > billingAddress > postalCode | Alphanumeric | Max:20 | Billing address zip code. | No |
| transaction > payer > billingAddress > phone | Alphanumeric | Max:20 | Billing address phone number. | No |
| transaction > payer > birthdate | Alphanumeric | Max:10 | Buyer's date of birth. | No |
| transaction > payer > contactPhone | Alphanumeric | Max:20 | Buyer's phone number. | Yes |
| transaction > payer > dniNumber | Alphanumeric | Max:20 | Identification number of the buyer. | Yes |
| transaction > payer > dniType | Alphanumeric | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Yes |
| transaction > type | Alphanumeric | 32 | Set this value according to the transaction. For Panama, set `AUTHORIZATION_AND_CAPTURE` | Yes |
| transaction > paymentMethod | Alphanumeric | 32 | Select a valid Credit card Payment Method. [See the available Payment Methods for Panama]({{< ref "select-your-payment-method.html#panama" >}}). | Yes |
| transaction > paymentCountry | Alphanumeric | 2 | Set `PA` for Panama. | Yes |
| transaction > deviceSessionId | Alphanumeric | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Yes |
| transaction > ipAddress | Alphanumeric | Max:39 | IP address of the device where the customer performs the transaction. | Yes |
| transaction > cookie | Alphanumeric | Max:255 | Cookie stored by the device where the customer performs the transaction. | Yes |
| transaction > userAgent | Alphanumeric | Max:1024 | The User agent of the browser where the customer performs the transaction. | Yes |
| transaction > extraParameters |  |  | Additional parameters or data associated with the request. The maximum size of each _extraParameters_ name is 64 characters.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | No |

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
* For payments with credit card tokens, include the parameters `transaction.creditCardTokenId` and `transaction.creditCard.securityCode` replacing the information of the credit card (if you process with security code). For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}).
* By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative. After this feature is enabled for you, send in the request the variable `creditCard.processWithoutCvv2` as true and remove the variable `creditCard.securityCode`.

### API call
The following are the examples of the request and response of this payment method.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request example:
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
         "accountId": "512326",
         "referenceCode": "PRODUCT_TEST_2021-06-21T21:28:14.962Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "782997f7981288b6ea411709188ff926",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 100,
               "currency": "USD"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Via Jose A. Arango, Juan Diaz",
               "street2": "5555487",
               "city": "Panamá",
               "state": "Panamá",
               "country": "PA",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Via Jose A. Arango, Juan Diaz",
            "street2": "5555487",
            "city": "Panamá",
            "state": "Panamá",
            "country": "PA",
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
            "street1": "Via Jose A. Arango, Juan Diaz",
            "street2": "125544",
            "city": "Panamá",
            "state": "Panamá",
            "country": "PA",
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
      "paymentCountry": "PA",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": true
}
```
<br>

Response example:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 857804178,
        "transactionId": "299f50c4-d7d9-4f24-a4fc-1454ff26d5c4",
        "state": "APPROVED",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "00000000",
        "authorizationCode": "00000000",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624311390098,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "PAYMENT_WAY_ID": "4"
        },
        "additionalInfo": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request example:
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
         <accountId>512326</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-21T21:28:14.962Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>782997f7981288b6ea411709188ff926</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>100</value>
                  <currency>USD</currency>
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
               <street1>Via Jose A. Arango, Juan Diaz</street1>
               <street2>5555487</street2>
               <city>Panamá</city>
               <state>Panamá</state>
               <country>PA</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Via Jose A. Arango, Juan Diaz</street1>
            <street2>5555487</street2>
            <city>Panamá</city>
            <state>Panamá</state>
            <country>PA</country>
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
            <street1>Via Jose A. Arango, Juan Diaz</street1>
            <street2>5555487</street2>
            <city>Panamá</city>
            <state>Panamá</state>
            <country>PA</country>
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
      <paymentCountry>PA</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>true</isTest>
</request>
```
<br>

Response example:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>857804176</orderId>
        <transactionId>69de6de1-9e18-45ae-8429-866bb3b47822</transactionId>
        <state>APPROVED</state>
        <trazabilityCode>00000000</trazabilityCode>
        <authorizationCode>00000000</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <operationDate>2021-06-21T16:35:06</operationDate>
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
The following are the examples of the request and response of this method. For the sake of the example, the request and response here show two payment methods. 

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request example:
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

Response example:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "paymentMethods": [
        {
            "id": "450",
            "description": "VISA",
            "country": "PA",
            "enabled": true,
            "reason": null
        },
        {
            "id": "451",
            "description": "MASTERCARD",
            "country": "PA",
            "enabled": true,
            "reason": null
        }
    ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request example:
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

Response example:
```XML
<paymentMethodsResponse>
    <code>SUCCESS</code>
    <paymentMethods>
        <paymentMethodComplete>
            <id>450</id>
            <description>VISA</description>
            <country>PA</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>451</id>
            <description>MASTERCARD</description>
            <country>PA</country>
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

### API call
The following are the examples of the request and response of this method.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request example:
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

Response example:
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

Request example:
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

Response example:
```XML
<paymentResponse>
    <code>SUCCESS</code>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}


