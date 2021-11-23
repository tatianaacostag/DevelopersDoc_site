---
title: "Payments API - Peru"
linkTitle: "Payments API - Peru"
date: 2021-05-03T15:48:08-05:00
description: >
  Payments API Peru lets your shop process different transaction types with multiple payment methods.
weight: 20
tags: ["subtopic"]
---

To integrate with Payments API Peru, target your request to the following URLs according to your environment.

{{% alert title="URL" color="info"%}}
* Teste: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Produção: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Available methods
Payments API includes the following methods:

* [Submit transaction with credit ou debit cards]({{< ref "Payments-API-Peru.md#submit-transaction-with-credit-or-debit-cards" >}})
* [Submit transaction with cash]({{< ref "Payments-API-Peru.md#submit-transaction-with-cash" >}})
* [Available payment methods query]({{< ref "Payments-API-Peru.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-API-Peru.md#ping" >}})

{{% alert title="Observação" color="info"%}}
To confirm the status of a transaction, você pode usar one of the following options:
* Navigate to the the URL set in the `transaction.notifyUrl` variable ou the _**Confirmation URL**_ option located in the Módulo PayU in _**Settings**_ > _**Technical configuration**_.
* Use the [Consultas API ou SDK]({{< ref "Queries.md" >}}).
{{% /alert %}}

## Submit transaction with credit ou debit cards
This method lets you process the payments performed by your customers using credit ou debit cards. For Peru, you can perform the two-step flows (**Autorização**, **Captura**), and one-step flows (**Cobrança**). For more information, refer to [Payment flows]({{< ref "payments.md#payment-flows" >}}).

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
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Valor of the Value Added Tax (VAT). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Número | 19, 2 | Specifies the amount of the VAT.  | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para cálculo do VAT.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits.  | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Número | 19, 2 | Specifies the base amount of the transaction. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > creditCardTokenId |  |  | Include this parameter when the transaction is done using a tokenized card replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}) | Não |
| transaction > creditCard |  |  | Credit card information. If you process using debit card, do not send this parameter.<br>This object and its parameters are mandatory when the payment is performed using not tokenized credit card. | Não |
| transaction > creditCard > number | Alfanumérico | Min:13 Max:20 | Credit card number. | Não |
| transaction > creditCard > securityCode | Alfanumérico | Min:1 Max:4 | Credit card security code (CVC2, CVV2, CID). | Não |
| transaction > creditCard > expirationDate | Alfanumérico | 7 | Credit card expiration date. Formato `YYYY/MM`. | Não |
| transaction > creditCard > name | Alfanumérico | Min:1 Max:255 | Holder's name displayed in the credit card. | Não |
| transaction > creditCard > processWithoutCvv2 | Boolean | Max:255 | Allows you to process transactions without including the credit card security code. Your commerce requires PayU's authorization before using this feature. | Não |
| transaction > debitCard |  |  | Debit card information. This object and its parameters are mandatory when the payment is performed using debit card. | Não |
| transaction > debitCard > number | Alfanumérico | Min:13 Max:20 | Debit card number. | Não |
| transaction > debitCard > securityCode | Alfanumérico | Min:1 Max:4 | Debit card security code (CVC2, CVV2, CID). | Não |
| transaction > debitCard > expirationDate | Alfanumérico | 7 | Debit card expiration date. Formato `YYYY/MM`. | Não |
| transaction > debitCard > name | Alfanumérico | Min:1 Max:255 | Holder's name displayed in the debit card. | Não |
| transaction > payer |  |  | Payer information. | Não |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Payer e-mail address. | Não |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identifier of the payer in your system. | Não |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nome of the payer which must meet the name sent in the parameter `transaction.creditCard.name` for credit card payments. | Não |
| transaction > payer > billingAddress |  |  | Billing address. | Sim |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Billing Address Line 1. | Não |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Billing Address Line 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Billing address city. | Não |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Billing address state. | Sim |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | Billing address country in format ISO 3166 Alpha-2. | Não |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Billing address zip code. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Billing address phone number. | Não |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Buyer's date of birth. | Não |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Buyer's phone number. | Não |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. | Não |
| transaction > payer > dniType | Alfanumérico | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sim |
| transaction > type | Alfanumérico | 32 | Set this value according to the transaction you want:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` for one-step flows.</li></ul> | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Select a valid Credit ou Debit card Método de pagamento. [See the available Payment Methods for Peru]({{< ref "select-your-payment-method.html#Peru" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Defina `PE` for Peru. | Sim |
| transaction > deviceSessionId | Alfanumérico | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Max:39 | IP address of the device where the customer performs the transaction. | Sim |
| transaction > cookie | Alfanumérico | Max:255 | Cookie stored by the device where the customer performs the transaction. | Sim |
| transaction > userAgent | Alfanumérico | Max:1024 | The User agent of the browser where the customer performs the transaction. | Sim |
| transaction > extraParameters |  |  | Additional parameters ou data associated with the request. The maximum size of each _extraParameters_ name is 64 characters.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | Não |

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

</details>

#### Observações {#considerations}
* For payments with credit card tokens, include the parameters `transaction.creditCardTokenId` e `transaction.creditCard.securityCode` (if you process with security code) replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}).
* By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative. After this feature is enabled for you, send in the request the variable `creditCard.processWithoutCvv2` as true and remove the variable `creditCard.securityCode`.
* In Peru, you can select 0 ou 2 to 36 installments when paying with credit card. If you select one (1) installment, PayU sends zero (0) as default value.

### Autorização
Use this method to perform the **Autorização** step of a two-step flow. In this step, you authorize the payment but the amount is not debited until you [capture]({{< ref "payments-api-peru.md#capture" >}}) the funds.

The following are the request and response bodies for this transaction type.

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

Response body:
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

Response body:
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

### Captura
Use this method to perform the **Captura** step of a two-step flow. In this step, you capture the funds previously [Authorized]({{< ref "payments-api-peru.md#authorization" >}}) to transfer them to your PayU account.

#### Observações {#considerations}
Leve em conta as seguintes informações for capture.
* You can perform partial captures over an authorized amount. To do this, you need to send in the request the parameter `transaction.order.additionalValues.TX_VALUE` with its value (as sent during the Autorização) and defina `PARTIAL_CAPTURE` for `transaction.type`.
* For partial captures, the minimum value to capture can be 10% lower than the amount authorized.
* For partial captures, the payment networks release the no captured value at 2-10 days for local cards and 28 days for foreign cards.

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
         "id": "1400443216"
      },
      "type": "CAPTURE",
      "parentTransactionId": "eebf01c3-7531-4952-a8e8-647a9eebac95"
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
         <id>1400443382</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>10ccdb41-3fa8-4961-b6c0-88d74f737d4e</parentTransactionId>
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

### Cobrança
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

Response body:
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

Response body:
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

## Submit transaction with cash
This method lets you process the payments in cash of your customers. To integrate with cash transactions, you must redirect the customer to the URL found in the response of the method; your customer sees a payment receipt like this.

<img src="/assets/Payments/CashReceiptPE.png" alt="PrintScreen" width="50%">

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
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Valor of the Value Added Tax (VAT). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Número | 19, 2 | Specifies the amount of the VAT.  | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para cálculo do VAT.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits.  | Não |
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
| transaction > type | Alfanumérico | 32 | As cash payments are performed in physical offices, the only available transaction type is `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Select a valid Método de pagamento in cash. [See the available Payment Methods for Peru]({{< ref "select-your-payment-method.html#Peru" >}}). |
| transaction > paymentCountry | Alfanumérico | 2 | Defina `PE` for Peru. | Sim |
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

</details>

#### Observações {#considerations}
* The parameter `transaction.expirationDate` is not mandatory. If you don't send this parameter, its default value for is seven (7) days after the current date.<br>If you send a date later than the default number of days, PayU will ignore this value and the expiration will be set as default.
* For cash payments, the following parameters are mandatory:
   - `transaction.order.buyer.fullName`
   - `transaction.payer.fullName`
   - `transaction.payer.emailAddress` ou `transaction.order.buyer.emailAddress`.
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

Response body:
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

Response body:
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

| Campo name | Formato | Tamanho | Descrição |
|-|-|-|-|
| language | Alfanumérico | 2 | Language used in the request, this language is used to display the error messages generated. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). |
| command | Alfanumérico | Max:32 | Defina `GET_PAYMENT_METHODS`. |
| test (JSON)<hr>isTest (XML) | Boolean |  | Defina `true` if the request is in test mode. Otherwise, defina `false`. | 
| merchant |  |  | This object has the authentication data. |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) |

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
The following are the bodies of the request and response of this method. For the sake of the example, the response here shows two payment methods. 

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

| Campo name | Formato | Tamanho | Descrição |
|-|-|-|-|
| language | Alfanumérico | 2 | Language used in the request, this language is used to display the error messages generated. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). |
| command | Alfanumérico | Max:32 | Defina `PING`. |
| test (JSON)<hr>isTest (XML) | Boolean |  | Defina `true` if the request is in test mode. Otherwise, defina `false`. | 
| merchant |  |  | This object has the authentication data. |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) |

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

