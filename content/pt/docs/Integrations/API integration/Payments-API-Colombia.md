---
title: "Payments API - Colombia"
linkTitle: "Payments API - Colombia"
date: 2021-05-03T15:48:08-05:00
description: >
  Payments API Colombia lets your shop process different transaction types with multiple payment methods.
weight: 20
tags: ["subtopic"]
---

To integrate with Payments API Colombia, target your request to the following URLs according to your environment.

{{% alert title="URL" color="info"%}}
* Teste: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Produção: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Available methods
Payments API includes the following methods:

* [Submit transaction with credit card]({{< ref "Payments-API-Colombia.md#submit-transaction-with-credit-cards" >}})
* [Submit transaction with cash ou Bank reference]({{< ref "Payments-API-Colombia.md#submit-transaction-with-cash-or-bank-reference" >}})
* [Submit transaction with bank transfer (PSE)]({{< ref "Payments-API-Colombia.md#submit-transaction-with-bank-transfer-pse" >}})
* [Bank List - PSE]({{< ref "Payments-API-Colombia.md#bank-list---pse" >}})
* [Available payment methods query]({{< ref "Payments-API-Colombia.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-API-Colombia.md#ping" >}})

{{% alert title="Observação" color="info"%}}
To confirm the status of a transaction, você pode usar one of the following options:
* Navigate to the the URL set in the `transaction.notifyUrl` variable ou the _**Confirmation URL**_ option located in the Módulo PayU in _**Settings**_ > _**Technical configuration**_.
* Use the [Consultas API ou SDK]({{< ref "Queries.md" >}}).
{{% /alert %}}

## Submit transaction with credit cards
This method lets you process the payments performed by your customers using credit cards. For Colombia, you can perform one-step flows (**Cobrança**). For more information, refer to [Payment flows]({{< ref "payments.md#payment-flows" >}}).

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Language used in the request, this language is used to display the error messages generated. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Max:32 | Defina `SUBMIT_TRANSACTION`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Defina `true` if the request is in test mode. Otherwise, defina `false`. | Sim |
| merchant |  |  | This object has the authentication data. | Sim |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| transaction |  |  | This object has the transaction data. | Sim |
| transaction > order |  |  | This object has the order data. | Sim |
| transaction > order > accountId | Número |  | Identifier of your account. | Sim |
| transaction > order > referenceCode | Alfanumérico | Min:1 Max:255 | Represents the identifier of the order in your system. | Sim |
| transaction > order > description | Alfanumérico | Min:1 Max:255 | Descrição of the order. | Sim |
| transaction > order > language | Alfanumérico | 2 | Language used in emails sent to the buyer and the seller. | Sim |
| transaction > order > notifyUrl | Alfanumérico | Max:2048 | Confirmation URL of the order. | Não |
| transaction > order > partnerId | Alfanumérico | Max:255 | Partner ID in PayU. | Não |
| transaction > order > signature | Alfanumérico | Max:255 | The signature associated to the form. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| transaction > order > shippingAddress |  |  | Shipping address. | Não |
| transaction > order > shippingAddress > street1 | Alfanumérico | Max:100 | Address Line 1. | Não |
| transaction > order > shippingAddress > street2 | Alfanumérico | Max:100 | Address Line 2. | Não |
| transaction > order > shippingAddress > city | Alfanumérico | Max:50 | Address city. | Não |
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Address State. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | Address country. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Address Zip code. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Phone number associated to the address. | Não |
| transaction > order > buyer |  |  | Buyer information. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Buyer ID in your system. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Full name of the buyer. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | E-mail of the buyer. | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Phone number of the buyer. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. | Sim |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Shipping address of the buyer. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Buyer's shipping address Line 1. | Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Buyer's shipping address city. | Sim |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Buyer's shipping address state. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | Buyer's shipping address country in format ISO 3166 alpha-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Número | Max:20 | Buyer's shipping address zip code. | Sim |
| transaction > order > buyer > shippingAddress > phone | Número | Max:20 | Buyer's shipping address phone number. | Sim |
| transaction > order > additionalValues > |  | 64 | Valor of the order and its associated values. | Sim |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Valor of the transaction. | Sim |
| transaction > order > additionalValues > TX_VALUE > value | Número | 19, 2 | Specifies the amount of the transaction. This amount cannot include decimals. | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Valor of the Value Added Tax (IVA - Impuesto al Valor Agregado). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Número | 19, 2 | Specifies the amount of the IVA.<br>If this parameter is not set, PayU applies the current tax value (19%).<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits  | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Base value to calculate the IVA.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits  | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Número | 19, 2 | Specifies the base amount of the transaction. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > creditCardTokenId |  |  | Include this parameter when the transaction is done using a tokenized card; moreover, it is mandatory to also send the parameter `transaction.creditCard.expirationDate`.<br>For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}). | Não |
| transaction > creditCard |  |  | Credit card information. This object and its parameters are mandatory when the payment is performed using not tokenized credit card. | Não |
| transaction > creditCard > number | Alfanumérico | Min:13 Max:20 | Credit card number. | Não |
| transaction > creditCard > securityCode | Alfanumérico | Min:1 Max:4 | Credit card security code (CVC2, CVV2, CID). | Não |
| transaction > creditCard > expirationDate | Alfanumérico | 7 | Credit card expiration date. Formato `YYYY/MM`. This parameter is mandatory when the payment is performed using a tokenized credit card. | Não |
| transaction > creditCard > name | Alfanumérico | Min:1 Max:255 | Holder's name displayed in the credit card. | Não |
| transaction > creditCard > processWithoutCvv2 | Boolean | Max:255 | Allows you to process transactions without including the credit card security code. Your commerce requires PayU's authorization before using this feature. | Não |
| transaction > payer |  |  | Payer information. | Sim |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Payer e-mail address. | Sim |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identifier of the payer in your system. | Não |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nome of the payer which must meet the name sent in the parameter `transaction.creditCard.name`. | Sim |
| transaction > payer > billingAddress |  |  | Billing address. | Sim |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Billing Address Line 1. | Sim |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Billing Address Line 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Billing address city. | Sim |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Billing address state. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | Billing address country in format ISO 3166 Alpha-2. | Sim |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Billing address zip code. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Billing address phone number. | Não |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Payer's date of birth. | Não |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Payer's phone number. | Sim |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. | Sim |
| transaction > payer > dniType | Alfanumérico | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > type | Alfanumérico | 32 | Set this value according to the transaction. For Colombia, defina `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Select a valid Credit card Método de pagamento. [See the available Payment Methods for Colombia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Defina `CO` for Colombia. | Sim |
| transaction > deviceSessionId | Alfanumérico | Max:255 | Session identifier of the device where the customer performs the transaction. For mor information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Max:39 | IP address of the device where the customer performs the transaction. | Sim |
| transaction > cookie | Alfanumérico | Max:255 | Cookie stored by the device where the customer performs the transaction. | Sim |
| transaction > userAgent | Alfanumérico | Max:1024 | The User agent of the browser where the customer performs the transaction. | Sim |
| transaction > extraParameters |  |  | Additional parameters ou data associated with the request. The maximum size of each _extraParameters_ name is 64 characters.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | Não |
| transaction > threeDomainSecure |  |  | This object contains the information of 3DS 2.0. | Não |
| transaction > threeDomainSecure > embedded | Boolean |  | Defina `true` if you want to use and embedded MPI for the Autorização process. By default, this value is set as `false`. | Não |
| transaction > threeDomainSecure > eci | Número | Max:2 | Electronic Commerce Indicator.<br>Value returned by the directory servers showing the authentication attempt.<br>This parameter is mandatory when `transaction.threeDomainSecure.embedded` is `false` e `transaction.threeDomainSecure.xid` has been set. | Não |
| transaction > threeDomainSecure > cavv | Alfanumérico | Max:28 | Cardholder Authentication Verification Value.<br>Code of the cryptogram used in the transaction authentication in Base64.<br>Depending on the specific ECI codes established by the process network, this value may be optional. | Não |
| transaction > threeDomainSecure > xid | Alfanumérico | Max:28 | Transaction ID sent by the MPI in Base64.<br>This parameter is mandatory when `transaction.threeDomainSecure.embedded` is `false` e `transaction.threeDomainSecure.eci` has been set. | Não |
| transaction > threeDomainSecure > directoryServerTransactionId | Alfanumérico | Max:36 | Transaction ID generated by the Directory Server during the Authentication. | Não |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | The response code of the transaction. Possible values are `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Max:2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse |  |  | The response data. |
| transactionResponse > orderId | Número |  | The generated ou existing order Id in PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | The identifier of the transaction in PayU. |
| transactionResponse > state | Alfanumérico | Max:32 | The status of the transaction. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | The response code associated with the status. |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | The response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | The error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | The traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | The authorization code returned by the financial network. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date |  | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters |  |  | Additional parameters ou data associated with the response. <br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo |  |  | Additional information associated with the response. This object follows the same structure than `transactionResponse.extraParameters`. |

</details>

#### Observações {#considerations}
* For payments with credit card tokens, include the parameters `transaction.creditCardTokenId` e `transaction.creditCard.securityCode` (if you process with security code) replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}).
* By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative. After this feature is enabled for you, send in the request the variable `creditCard.processWithoutCvv2` as true and remove the variable `creditCard.securityCode`.
* The variable `transaction.threeDomainSecure` does not replace the card information nor any of the mandatory fields of the transaction. This object is additional and not mandatory.
* The variable `transaction.threeDomainSecure` corresponds to a _Pass Through_ scenario where the commerce performs the authentication by their own.
* For Crédito Fácil Codensa card, the number of installments supported are 1 to 12, 18, 24, 36 and 48.
* For Crédito Fácil Codensa card, the payer can choose any of the following document types for the variable `transaction.payer.dniType`:

| ISO | Descrição                                                                           |
|:---:|---------------------------------------------------------------------------------------|
|  CC | Citizenship card.                                                                     |
|  CE | Foreign citizenship card.                                                             |
| NIT | Tax identification number (Companies).                                                |
|  TI | Identity Card.                                                                        |
|  PP | Passport.                                                                             |
| IDC | Customer´s unique identifier, in the case of unique customer / utility consumer ID's. |
| CEL | When identified by the mobile line.                                                   |
|  RC | Birth certificate.                                                                    |
|  DE | Foreign identification document.                                                      |

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
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Response example:
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


## Submit transaction with cash ou Bank reference
This method lets you process the payments of your customers in cash ou using a Bank reference. To integrate with these transactions, you must redirect the customer to the URL found in the response of the method; your customer sees a payment receipt like the followings.

#### Payments in cash
<img src="/assets/Payments/CashReceiptCO.png" alt="PrintScreen" width="75%">

#### Payments with Bank reference
<img src="/assets/Payments/BankReferenceReceiptCO.png" alt="PrintScreen" width="75%">

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Language used in the request, this language is used to display the error messages generated. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Max:32 | Defina `SUBMIT_TRANSACTION`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Defina `true` if the request is in test mode. Otherwise, defina `false`. | Sim |
| merchant |  |  | This object has the authentication data. | Sim |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| transaction |  |  | This object has the transaction data. | Sim |
| transaction > order |  |  | This object has the order data. | Sim |
| transaction > order > accountId | Número |  | Identifier of your account. | Sim |
| transaction > order > referenceCode | Alfanumérico | Min:1 Max:255 | Represents the identifier of the order in your system. | Sim |
| transaction > order > description | Alfanumérico | Min:1 Max:255 | Descrição of the order. | Sim |
| transaction > order > language | Alfanumérico | 2 | Language used in emails sent to the buyer and the seller. | Sim |
| transaction > order > notifyUrl | Alfanumérico | Max:2048 | Confirmation URL of the order. | Não |
| transaction > order > partnerId | Alfanumérico | Max:255 | Partner ID in PayU. | Não |
| transaction > order > signature | Alfanumérico | Max:255 | The signature associated to the form. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| transaction > order > shippingAddress |  |  | Shipping address. | Não |
| transaction > order > shippingAddress > street1 | Alfanumérico | Max:100 | Address Line 1. | Não |
| transaction > order > shippingAddress > street2 | Alfanumérico | Max:100 | Address Line 2. | Não |
| transaction > order > shippingAddress > city | Alfanumérico | Max:50 | Address city. | Não |
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Address State. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | Address country. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Address Zip code. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Phone number associated to the address. | Não |
| transaction > order > buyer |  |  | Buyer information. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Buyer ID in your system. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Full name of the buyer. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | E-mail of the buyer. | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Phone number of the buyer. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. | Sim |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Shipping address of the buyer. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Buyer's shipping address Line 1. | Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Buyer's shipping address city. | Sim | 
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Buyer's shipping address state. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | Buyer's shipping address country in format ISO 3166 alpha-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Número | Max:20 | Buyer's shipping address zip code. | Sim |
| transaction > order > buyer > shippingAddress > phone | Número | Max:20 | Buyer's shipping address phone number. | Sim |
| transaction > order > additionalValues > |  | 64 | Valor of the order ou its associated values. | Sim |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Valor of the transaction. | Sim |
| transaction > order > additionalValues > TX_VALUE > value | Número | 19, 2 | Specifies the amount of the transaction, this value may have two decimal digits (Ex. `10000.00` ou `10000`). | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Valor of the Value Added Tax (IVA - Impuesto al Valor Agregado). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Número | 19, 2 | Specifies the amount of the IVA.<br>If this parameter is not set, PayU applies the current tax value (19%).<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits  | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Base value to calculate the IVA.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits  | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Número | 19, 2 | Specifies the base amount of the transaction. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > payer |  |  | Payer information. | Sim |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Payer e-mail address. | Sim |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identifier of the payer in your system. | Não |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nome of the payer. | Sim |
| transaction > payer > billingAddress |  |  | Billing address. | Sim |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Billing Address Line 1. | Sim |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Billing Address Line 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Billing address city. | Sim |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Billing address state. | Sim |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | Billing address country in format ISO 3166 Alpha-2. | Sim |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Billing address zip code. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Billing address phone number. | Não |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Payer's date of birth. | Não |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Payer's phone number. | Sim |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. | Sim |
| transaction > payer > dniType | Alfanumérico | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > type | Alfanumérico | 32 | As cash and Bank reference payments are performed in physical offices, la única transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Select a valid Método de pagamento in cash ou Referência bancária. [See the available Payment Methods for Colombia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Defina `CO` for Colombia. | Sim |
| transaction > expirationDate | Alfanumérico | 23 | Maximum date and time that the payer has to make the payment. Formato `YYYY-MM-DDTHH:MM:SS`, for example `2021-06-12T16:07:11.586`. | Não |
| transaction > ipAddress | Alfanumérico | Max:39 | IP address of the device where the customer performs the transaction. | Sim |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | The response code of the transaction. Possible values are `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Max:2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse |  |  | The response data. |
| transactionResponse > orderId | Número |  | The generated ou existing order Id in PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | The identifier of the transaction in PayU. |
| transactionResponse > state | Alfanumérico | Max:32 | The status of the transaction. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | The response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | The error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | The traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | The authorization code returned by the financial network. |
| transactionResponse > pendingReason | Alfanumérico | Max:21 | The reason code associated with the status, as mentioned in `transactionResponse > state`, the transaction is waiting for the payment. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | The response code associated with the status. In this case, for successful transactions is `PENDING_TRANSACTION_CONFIRMATION`. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date |  | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters |  |  | Additional parameters ou data associated with the response.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"REFERENCE": "74794"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>REFERENCE</string>`<br>&emsp;&emsp;`<int>74794</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo |  |  | Additional information associated with the response. This object follows the same structure than `transactionResponse.extraParameters`. |

</details>

#### Observações {#considerations}
* The parameter `transaction.expirationDate` is not mandatory. If you don't send this parameter, its default value for is seven (7) days after the current date.<br>If you send a date later than the default number of days, PayU will ignore this value and the expiration will be set as default.
* For `BALOTO` e `EFECTY`, the confirmation of the payment takes 15 minutes. For `BANK_REFERENCED` e `OTHERS_CASH` (Su Red), the confirmation is online.
* The minimum and maximum values for `BALOTO`, `EFECTY` e `OTHERS_CASH` (Su Red) are:
   - `BALOTO` > Min: $3.000 COP - Max: $1.000.000 COP
   - `EFECTY` > Min: $20.000 COP - Max: $6.000.000 COP
   - `OTHERS_CASH` (Su Red) > Min: $1.000 COP - Max: $4.000.000 COP
* The parameter `transactionResponse.extraParameters` has the following parameters related to the transaction:
   - **EXPIRATION_DATE**: maximum term for the payer to perform the payment.   
   - **REFERENCE**: internal payment reference generated by PayU.
   - **URL_PAYMENT_RECEIPT_HTML**: payment receipt in HTML format. This is where you need to redirect the payment when the payer selects cash payment. 
   - **URL_PAYMENT_RECEIPT_PDF**: payment receipt in PDF format.
   - **BANCO_BOGOTA_SERVICE_CODE**: payment code for Banco de Bogotá. Available when using `BANK_REFERENCED`.
   - **BANK_REFERENCED_NAME**: Reference name for Bancolombia. Available when using `BANK_REFERENCED`.
   - **BANCOLOMBIA_SERVICE_CODE**: payment code for Bancolombia. Available when using `BANK_REFERENCED`.

### API call
The following are the bodies of the request and response of this payment method.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
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

Response body:
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

Response body:
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

## Submit transaction with bank transfer (PSE)
This method lets you process the bank transfer payments of your customers. In Colombia, bank transfers are made through PSE, to perform an integration with this payment method, you need to create a Payment form following these steps:

1. Include a PSE button making clear that your customer will use _Proveedor de Servicios Electrónicos PSE_.
* You can use the following names in Spanish:
    - Débito desde cuenta corriente/ahorros
    - Débito bancario PSE
    - PSE
* Do no use any of the following names
    - Transferencia bancaria
    - Débito de cuenta
    - Tarjeta débito

2. Query the available bank list to show them to the payer. To query the bank list, refer to [this method]({{< ref "Payments-API-Colombia.md#bank-list---pse" >}}).<br>You must update the the bank list in your system once a day.

3. Show the list of banks as displayed below:

<img src="/assets/Payments/PSEBankList_EN.png" alt="PrintScreen" width="50%"><br>

When the payer selects a bank, you must send the parameter `pseCode` of the selection in the extra parameter `FINANCIAL_INSTITUTION_CODE` in the request.

4. Show a list to let the payer choose whether they are a _Natural_ (N) ou _Legal_ (J) person. Depending on what the payer choose, you must send the value in the extra parameter `USER_TYPE` in the request. The list must be displayed as follows:

<img src="/assets/Payments/PSEPersonList_EN.png" alt="PrintScreen" width="50%"><br>

5. Show a list to let the payer choose their identification type. You must send the ISO code of the value selected in the extra parameter `PSE_REFERENCE2` in the request. The list must be displayed as follows:

<img src="/assets/Payments/PSEDocType_EN.png" alt="PrintScreen" width="50%"><br>

The list of available documents is:

| ISO | Descrição                                                                         |
|:---:|-------------------------------------------------------------------------------------|
|  CC | Citizenship card.                                                                   |
|  CE | Foreign citizenship card.                                                           |
| NIT | Tax identification number (Companies).                                              |
|  TI | Identity Card.                                                                      |
|  PP | Passport.                                                                           |
| IDC | Customer´s unique identifier, in the case of unique customer / utility consumer ID's. |
| CEL | When identified by the mobile line.                                                 |
|  RC | Birth certificate.                                                                  |
|  DE | Foreign identification document.                                                    |

6. You must send the payer identification number in the extra parameter `PSE_REFERENCE3` in the request.

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Language used in the request, this language is used to display the error messages generated. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Max:32 | Defina `SUBMIT_TRANSACTION`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Defina `true` if the request is in test mode. Otherwise, defina `false`. | Sim |
| merchant |  |  | This object has the authentication data. | Sim |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| transaction |  |  | This object has the transaction data. | Sim |
| transaction > order |  |  | This object has the order data. | Sim |
| transaction > order > accountId | Número |  | Identifier of your account. | Sim |
| transaction > order > referenceCode | Alfanumérico | Min:1 Max:255 | Represents the identifier of the order in your system. | Sim |
| transaction > order > description | Alfanumérico | Min:1 Max:255 | Descrição of the order. | Sim |
| transaction > order > language | Alfanumérico | 2 | Language used in emails sent to the buyer and the seller. | Sim |
| transaction > order > notifyUrl | Alfanumérico | Max:2048 | Confirmation URL of the order. | Não|
| transaction > order > partnerId | Alfanumérico | Max:255 | Partner ID in PayU. | Não |
| transaction > order > signature | Alfanumérico | Max:255 | The signature associated to the form. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| transaction > order > shippingAddress |  |  | Shipping address. | Não |
| transaction > order > shippingAddress > street1 | Alfanumérico | Max:100 | Address Line 1. | Não |
| transaction > order > shippingAddress > street2 | Alfanumérico | Max:100 | Address Line 2. | Não |
| transaction > order > shippingAddress > city | Alfanumérico | Max:50 | Address city. | Não |
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Address State. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | Address country. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Address Zip code. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Phone number associated to the address. | Não |
| transaction > order > buyer |  |  | Buyer information. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Buyer ID in your system. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Full name of the buyer. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | E-mail of the buyer. | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Phone number of the buyer. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. | Sim |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Shipping address of the buyer. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Buyer's shipping address Line 1. | Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Buyer's shipping address city. | Sim |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Buyer's shipping address state. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | Buyer's shipping address country in format ISO 3166 alpha-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Número | Max:20 | Buyer's shipping address zip code. | Sim |
| transaction > order > buyer > shippingAddress > phone | Número | Max:20 | Buyer's shipping address phone number. | Sim |
| transaction > order > additionalValues > |  | 64 | Valor of the order ou its associated values. | Sim |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Valor of the transaction. | Sim |
| transaction > order > additionalValues > TX_VALUE > value | Número | 19, 2 | Specifies the amount of the transaction, this value may have two decimal digits (Ex. `10000.00` ou `10000`). | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| transaction > payer |  |  | Payer information. | Sim |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Payer e-mail address. | Sim |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identifier of the payer in your system. | Não |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nome of the payer. | Sim |
| transaction > payer > billingAddress |  |  | Billing address. | Sim |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Billing Address Line 1. | Sim |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Billing Address Line 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Billing address city. | Sim |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Billing address state. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | Billing address country in format ISO 3166 Alpha-2. | Sim |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Billing address zip code. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Billing address phone number. | Não |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Payer's date of birth. | Não |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Payer's phone number. | Sim |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. | Sim |
| transaction > payer > dniType | Alfanumérico | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > type | Alfanumérico | 32 | As these payments are performed in PSE webpage, la única transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Select a valid Método de pagamento in Bank transfer. [See the available Payment Methods for Colombia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Defina `CO` for Colombia. | Sim |
| transaction > deviceSessionId | Alfanumérico | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Max:39 | IP address of the device where the customer performs the transaction. | Sim |
| transaction > cookie | Alfanumérico | Max:255 | Cookie stored by the device where the customer performs the transaction. | Sim |
| transaction > userAgent | Alfanumérico | Max:1024 | The User agent of the browser where the customer performs the transaction. | Sim |
| transaction > extraParameters |  |  | Additional parameters ou data associated with the request. <br>For Bank transfer payments, this is the response page of your commerce.<br>In JSON, the _extraParameters_ parameter is set as: <br>`"extraParameters": {`<br>&emsp;`"PSE_REFERENCE3": "123456789"`<br>`}`<br><br>In XML, the _extraParameters_ parameter is set as: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>PSE_REFERENCE3</string>`<br>&emsp;&emsp;`<string>123456789</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` | Não |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | The response code of the transaction. Possible values are `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Max:2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse |  |  | The response data. |
| transactionResponse > orderId | Número |  | The generated ou existing order Id in PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | The identifier of the transaction in PayU. |
| transactionResponse > state | Alfanumérico | Max:32 | The status of the transaction. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | The response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | The error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | The traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | The authorization code returned by the financial network. |
| transactionResponse > pendingReason | Alfanumérico | Max:21 | The reason code associated with the status, as mentioned in `transactionResponse > state`, the transaction is waiting for the payment. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | The response code associated with the status. In this case, for successful transactions is `PENDING_TRANSACTION_CONFIRMATION`. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date |  | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters |  |  | Additional parameters ou data associated with the response.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"BANK_URL": "xxxx"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_URL</string>`<br>&emsp;&emsp;`<string>xxxx</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Observações {#considerations}
* To test PSE bank transfers in the PayU Sandbox environment, see the [PSE Test Guide (PDF)](/assets/pse-test-guide-v5.pdf).
* All the payment process values must be formatted in thousands (i.e., 1,200.00 ou 1,200) without exception.
* If the payment request is successful, the transaction has state `PENDING` and responseCode `PENDING_TRANSACTION_CONFIRMATION`; this is because the payer is redirected to the selected bank to complete the payment; you must redirect the payer to the URL returned in the extra parameter `BANK_URL`.
* The URL returned in the extra parameter `BANK_URL` is configured in the Módulo PayU and must show the following information:<br><br>![PrintScreen](/assets/Payments/PSEresponse-en.png)<br>Parameters starting with $ symbol are sent via `GET`.
* Once the client click the Pay button, this must be disabled to avoid sending a new request over the same payment.
* It is recommended to display a wait message while your customer is redirected.
* Do not show the bank site in containers (frames, panel, iframes, etc). The payment process must be fluid. Furthermore, avoid opening the bank site in a new tab nor a new browser window. If you need to use a new tab ou window, block the origin page to avoid sending a new request over the same payment.
* You must add in the response page the options to retry the payment, finish the transaction and print the receipt.
* The status displayed in the response page can be any of the following:

| polTransactionState | polResponseCode | Estado                                                                |
|---------------------|-----------------|----------------------------------------------------------------------|
| 4                   | 1               | Approved transaction                                                 |
| 6                   | 5               | Failed transaction                                                   |
| 6                   | 4               | Rejected transaction                                                 |
| 12 ou 14            | 9994 ou 25      | Pending transaction, please check if the debit was made in the bank. |

### API call
The following are the bodies of the request and response of this payment method.

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

Response body:
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

Response body:
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

## Bank List - PSE
This method returns a list of the banks available for [payments using PSE]({{< ref "Payments-API-Colombia.md#submit-transaction-with-bank-transfer-pse" >}}). 

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Language used in the request, this language is used to display the error messages generated. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Max:32 | Defina `GET_BANKS_LIST`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Defina `true` if the request is in test mode. Otherwise, defina `false`. | Sim |
| merchant |  |  | This object has the authentication data. | Sim |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| bankListInformation |  |  | This object has the information of the query. | Sim |
| bankListInformation > paymentMethod | Alfanumérico | | Defina `PSE`. | Sim |
| bankListInformation > paymentCountry | Alfanumérico | | Defina `CO`. | Sim |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | The response code of the transaction. Possible values are `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Max:2048 | The error message associated when the response code is `ERROR`. |
| banks |  |  | List of the banks available in PSE. |
| banks > id | Numérico |  | Internal bank identifier. |
| banks > description | Alfanumérico |  | Bank name to be displayed in the list. |
| banks > pseCode | Alfanumérico |  | Código to send in the extra parameter `FINANCIAL_INSTITUTION_CODE` of the payment request. |

</details>

### API call
The following are the examples of the request and response of this method.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request example:
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

Response example:
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

Request example:
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

Response example:
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

## Available payment methods query
This method returns a list of the payment methods available in all countries.

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Language used in the request, this language is used to display the error messages generated. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Max:32 | Defina `GET_PAYMENT_METHODS`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Defina `true` if the request is in test mode. Otherwise, defina `false`. | Sim |
| merchant |  |  | This object has the authentication data. | Sim |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | The response code of the transaction. Possible values are `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Max:2048 | The error message associated when the response code is `ERROR`. |
| paymentMethods |  |  | List of the payment methods. |
| paymentMethods > paymentMethodComplete |  |  | This object has the information of a payment method. |
| paymentMethods > paymentMethodComplete > id | Numérico |  | Payment method identifier. |
| paymentMethods > paymentMethodComplete > description | Alfanumérico | Max:32 | Payment method name. |
| paymentMethods > paymentMethodComplete > country | Alfanumérico | 2 | ISO code of the Payment method country. |

</details>

### API call
The following are the examples of the request and response of this method. For the sake of the example, the response here shows two payment methods. 

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
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
            "id": "35",
            "description": "BALOTO",
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
            <id>35</id>
            <description>BALOTO</description>
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

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Language used in the request, this language is used to display the error messages generated. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Max:32 | Defina `PING`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Defina `true` if the request is in test mode. Otherwise, defina `false`. | Sim |
| merchant |  |  | This object has the authentication data. | Sim |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | The response code of the transaction. |
| error | Alfanumérico | Max:2048 | The error message associated if an error ocurred. |
| transactionResponse | transactionResponse | Max:2048 | The response of the PING method if an error ocurred. |
</details>

### API call
The following are the examples of the request and response of this method.

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
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

