---
title: "Payments API - Mexico"
linkTitle: "Payments API - Mexico"
date: 2021-05-03T15:48:08-05:00
description: >
  Payments API Mexico lets your shop process different transaction types with multiple payment methods.
weight: 20
tags: ["subtopic"]
---

To integrate with Payments API Mexico, target your request to the following URLs according to your environment.

{{% alert title="URL" color="info"%}}
* Teste: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Produção: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Available methods
Payments API includes the following methods:

* [Submit transaction with credit ou debit cards]({{< ref "Payments-API-Mexico.md#submit-transaction-with-credit-or-debit-card" >}})
* [Submit transaction with cash]({{< ref "Payments-API-Mexico.md#submit-transaction-with-cash" >}})
* [Submit transaction with bank transfer]({{< ref "Payments-API-Mexico.md#submit-transaction-with-bank-transfer" >}})
* [Submit transaction with bank reference]({{< ref "Payments-API-Mexico.md#submit-transaction-with-bank-reference" >}})
* [Available payment methods query]({{< ref "Payments-API-Mexico.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-API-Mexico.md#ping" >}})

{{% alert title="Observação" color="info"%}}
To confirm the status of a transaction, você pode usar one of the following options:
* Navigate to the the URL set in the `transaction.notifyUrl` variable ou the _**Confirmation URL**_ option located in the Módulo PayU in _**Settings**_ > _**Technical configuration**_.
* Use the [Consultas API ou SDK]({{< ref "Queries.md" >}}).
{{% /alert %}}

## Submit transaction with credit ou debit card
This method lets you process the payments performed by your customers using credit ou debit cards. For Mexico, you can perform the two-step flows (**Autorização**, **Captura**), and one-step flows (**Cobrança**). For more information, refer to [Payment flows]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Observação" color="info"%}}
Two-step flows are only supported for Mastercard and Visa.
{{% /alert %}}

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
| transaction > creditCard |  |  | Credit card information. This object and its parameters are mandatory when the payment is performed using not tokenized credit card. | Não |
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
| transaction > payer |  |  | Payer information. Due to Tax regulations, it is mandatory to send the parameters `payer.billingAddress.postalCode` e `payer.birthdate`. | Sim |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Payer e-mail address. | Não |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identifier of the payer in your system. | Não |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nome of the payer which must meet the name sent in the parameter `transaction.creditCard.name` for credit card payments. | Não |
| transaction > payer > billingAddress |  |  | Billing address. | Sim |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Billing Address Line 1. | Não |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Billing Address Line 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Billing address city. | Não |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Billing address state. | Sim |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | Billing address country in format ISO 3166 Alpha-2. | Não |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Billing address zip code. | Sim |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Billing address phone number. | Não |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Payer's date of birth. Formato `YYYY-MM-DD`. | Sim |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Payer's phone number. | Não |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. | Não |
| transaction > payer > dniType | Alfanumérico | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sim |
| transaction > type | Alfanumérico | 32 | Set this value according to the transaction you want:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` for one-step flows.</li></ul> | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Select a valid Credit ou Debit card Método de pagamento. [See the available Payment Methods for Mexico]({{< ref "select-your-payment-method.html#mexico" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Defina `MX` for Mexico. | Sim |
| transaction > deviceSessionId | Alfanumérico | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Max:39 | IP address of the device where the customer performs the transaction. | Sim |
| transaction > cookie | Alfanumérico | Max:255 | Cookie stored by the device where the customer performs the transaction. | Sim |
| transaction > userAgent | Alfanumérico | Max:1024 | The User agent of the browser where the customer performs the transaction. | Sim |
| transaction > extraParameters |  |  | Additional parameters ou data associated with the request. The maximum size of each _extraParameters_ name is 64 characters.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | Não |
<!--| transaction > monthsWithoutInterest |  |  | Information when paying the purchase using Months Without Interests.<br>This parameter is mandatory when you want to use [Months Without Interests (Meses Sin Intereses - MSI) feature]({{< ref "Promotions.md#months-without-interest-msi---meses-sin-intereses" >}}). | Não |
| transaction > monthsWithoutInterest > months | Número | Max:2 | Número of Months Without Interests for the purchase. The available values are 3, 6, 9, ou 12.<br>This parameter is mandatory when you want to use [Months Without Interests (Meses Sin Intereses - MSI) feature]({{< ref "Promotions.md#months-without-interest-msi---meses-sin-intereses" >}}). | Não |
| transaction > monthsWithoutInterest > bank | Alfanumérico | Max:255 | Issuing bank of the credit card used to pay the purchase using Months Without Interests.<br>This parameter is mandatory when you want to use [Months Without Interests (Meses Sin Intereses - MSI) feature]({{< ref "Promotions.md#months-without-interest-msi---meses-sin-intereses" >}}). | Não |-->

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
* Two-step flows are only available for Mastercard and Visa.
* For payments with Promotions, send the extra parameters `INSTALLMENTS_NUMBER` e `PROMOTION_ID` with the number of installments selected and the Id of the promotion. Consulte [Promotions API]({{< ref "Promotions.md" >}}) para obter mais informações.
* For payments with Months Without Interests (Meses Sin Intereses - MSI), send the extra parameter `INSTALLMENTS_NUMBER` with the number of months. Consulte [MSI]({{< ref "Promotions.md#months-without-interests-msi---meses-sin-intereses" >}}) para obter mais informações.
* The available banks for MSI are: BANAMEX, BANCO REGIONAL DE MONTERREY S.A, BANCOPPEL, BANCO AZTECA, SCOTIABANK, HSBC, INBURSA, BANCA MIFEL SA, BANCO MULTIVA, BAJIO, CI BANCO, Afirme, Banregio, Banjercito, Banorte, Famsa, Invex, Premium Card Liverpool, Santander, and Bancomer.
* When using MSI, promotions ou apply installments, always display the phrase **"PAGOS DIFERIDOS"** during the payment process.
* When installments applied (fees assumed by the payer), display the original amount of the transaction, the total amount after the fees, the number of installments, and the amount per installment including the extra fee.
* Promotions feature is only available for [one-step flows]({{< ref "Payments.md#payment-flows" >}}).
* For payments with credit card tokens, include the parameters `transaction.creditCardTokenId` e `transaction.creditCard.securityCode` (if you process with security code) replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}).
* By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative. After this feature is enabled for you, send in the request the variable `creditCard.processWithoutCvv2` as true and remove the variable `creditCard.securityCode`.

### Autorização
Use this method to perform the **Autorização** step of a two-step flow using Mastercard ou Visa. In this step, you authorize the payment but the amount is not debited until you [capture]({{< ref "payments-api-mexico.md#capture" >}}) the funds.<br>The following are the request and response bodies for this transaction type.

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

Response body:
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

Response body:
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

### Captura
Use this method to perform the **Captura** step of a two-step flow for Mastercard and Visa. In this step, you capture the funds previously [Authorized]({{< ref "payments-api-mexico.md#authorization" >}}) to transfer them to your PayU account.

#### Observações {#considerations}
Leve em conta as seguintes informações for capture.
* The maximum time to capture an approved transaction is 30 days. After this time, the transaction is auto voided.
* Only the parameters displayed in the request body are mandatory to invoke a Captura transaction. Recall that the order and transaction ids must meet with a currently authorized transaction.
* You can perform partial captures over an authorized amount as long as the partial capture amount does not exceed the authorized amount. To do this, you need to send in the request the parameter `transaction.order.additionalValues.TX_VALUE` with its value (as sent during the Autorização) and defina `PARTIAL_CAPTURE` for `transaction.type`.

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
         "id": "1400446409"
      },
      "type": "CAPTURE",
      "parentTransactionId": "596ccd26-41a3-40b0-a241-262b3331aedc"
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
         <id>1400446409</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>596ccd26-41a3-40b0-a241-262b3331aedc</parentTransactionId>
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

Response body:
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

Response body:
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

## Submit transaction with cash
This method lets you process the payments in cash of your customers. To integrate with cash transactions, you must redirect the customer to the URL found in the response of the method; your customer sees a payment receipt like this.

<img src="/assets/Payments/CashReceiptMX.png" alt="PrintScreen" width="50%">

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
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Billing address zip code. | Sim |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Billing address phone number. | Não |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Payer's date of birth. Formato `YYYY-MM-DD`. | Sim |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Payer's phone number. | Sim |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. | Sim |
| transaction > payer > dniType | Alfanumérico | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > type | Alfanumérico | 32 | As cash payments are performed in physical offices, the only available transaction type is `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Select a valid Método de pagamento in cash. [See the available Payment Methods for Mexico]({{< ref "select-your-payment-method.html#mexico" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Defina `MX` for Mexico. | Sim |
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
* When the payment method is `OXXO`, the confirmation of the payment will be one day after the payment. For other cash payment methods, the confirmation is online.
* The parameter `transactionResponse.extraParameters` has the following parameters related to the transaction:
   - **BANK_REFERENCED_CODE**: payment type.
   - **EXPIRATION_DATE**: maximum term for the payer to perform the payment.
   - **BAR_CODE**: barcode which lets the payer perform the payment.
   - **REFERENCE**: internal payment reference generated by PayU. 
   - **URL_PAYMENT_RECEIPT_HTML**: payment receipt in HTML format. This is where you need to redirect the payment when the payer selects cash payment. 
   - **URL_PAYMENT_RECEIPT_PDF**: payment receipt in PDF format.
   - **PAYMENT_WAY_ID**: network payment of the payment type.

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

Response body:
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

Response body:
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

## Submit transaction with bank transfer
This method lets you process the bank transfer payments of your customers. When using this payment method, the payer performs a bank transfer from their bank account to a PayU's CLABE account.<br>
To integrate with these transactions, you must redirect the customer to the URL found in the response of the method.

<img src="/assets/Payments/BankTransferReceiptMX.png" alt="PrintScreen" width="50%">

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
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Billing address state. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | Billing address country in format ISO 3166 Alpha-2. | Sim |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Billing address zip code. | Sim |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Billing address phone number. | Não |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Payer's date of birth. Formato `YYYY-MM-DD`. | Sim |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Payer's phone number. | Sim |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. | Sim |
| transaction > payer > dniType | Alfanumérico | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > type | Alfanumérico | 32 | As cash payments are performed in physical offices, the only available transaction type is `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Select a valid Método de pagamento in Bank transfer. [See the available Payment Methods for Mexico]({{< ref "select-your-payment-method.html#mexico" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Defina `MX` for Mexico. | Sim |
| transaction > deviceSessionId | Alfanumérico | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Max:39 | IP address of the device where the customer performs the transaction. | Sim |
| transaction > cookie | Alfanumérico | Max:255 | Cookie stored by the device where the customer performs the transaction. | Sim |
| transaction > userAgent | Alfanumérico | Max:1024 | The User agent of the browser where the customer performs the transaction. | Sim |

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
| transactionResponse > responseCode | Alfanumérico | Max:64 | The response code associated with the status. In this case, for successful transactions is `PENDING_PAYMENT_IN_ENTITY`. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date |  | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters |  |  | Additional parameters ou data associated with the response.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"SPEI_CLABE_ACCOUNT_NUMBER": "646180132800000009"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>SPEI_CLABE_ACCOUNT_NUMBER</string>`<br>&emsp;&emsp;`<string>646180132800000009</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo |  |  | Additional information associated with the response. This object follows the same structure than `transactionResponse.extraParameters`. |

</details>

#### Observações {#considerations}
* The parameter `transaction.expirationDate` is not mandatory. If you don't send this parameter, its default value for is seven (7) days after the current date.<br>If you send a date later than the default number of days, PayU will ignore this value and the expiration will be set as default.
* When the payer selects this payment method, PayU creates an order in _in progress_ state and a transaction in `PENDING` state.
* To perform the payment, the payer must log in the virtual branch of their bank (The bank must appear in the list of SPEI available banks). <br>First, the payer must register the PayU CLABE account in their bank branch. Once the PayU CLABE account is enabled to perform transfers, the payer must provide the reference returned by PayU in the parameter `trazabilityCode` and the amount as returned by PayU in their virtual branch.
* In the response body, you can find the needed variables to generate the payment receipt (voucher) and the URL of the receipt generated by PayU in HTML and PDF format. If you want to generate the voucher, use the following variables:
  - **trazabilityCode**: unique identifier of maximum 7 digits long; corresponds to the payment reference that the payer must provide in the virtual branch. It is mandatory to enter the same value in the reference field of the bank branch so the payment can be successful.
  - **value**: the payer must enter as transfer amount the same value informed in the request, so the payment can be successful.
  - **SPEI_CLABE_ACCOUNT_NUMBER**: is the PayU's interbank CLABE, namely, the account where the amount will be transferred. The payer must register this CLABE as beneficiary in their bank branch before performing the transfer.
  - **SPEI_BANK_NAME**: name associated with the PayU CLABE account. The beneficiary account is associated with the STP bank and it's always the same bank for PayU.

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

Response body:
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

Response body:
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

## Submit transaction with bank reference
This method lets you process payments of your customers using bank references. To integrate with these transactions, you must redirect the customer to the URL found in the response of the method.

<img src="/assets/Payments/BankReferenceReceiptMX.png" alt="PrintScreen" width="50%">

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
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Billing address state. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | Billing address country in format ISO 3166 Alpha-2. | Sim |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Billing address zip code. | Sim |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Billing address phone number. | Não |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Payer's date of birth. Formato `YYYY-MM-DD`. | Sim |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Payer's phone number. | Sim |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. | Sim |
| transaction > payer > dniType | Alfanumérico | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > type | Alfanumérico | 32 | As payments with Bank reference are performed in physical offices, the only available transaction type is `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Select a valid Bank reference Método de pagamento. [See the available Payment Methods for Mexico]({{< ref "select-your-payment-method.html#mexico" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Defina `MX` for Mexico. | Sim |
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
| transactionResponse > responseCode | Alfanumérico | Max:64 | The response code associated with the status. In this case, for successful transactions is `PENDING_PAYMENT_IN_ENTITY`. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date |  | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters |  |  | Additional parameters ou data associated with the response.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"SPEI_CLABE_ACCOUNT_NUMBER": "646180132800000009"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>SPEI_CLABE_ACCOUNT_NUMBER</string>`<br>&emsp;&emsp;`<string>646180132800000009</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo |  |  | Additional information associated with the response. This object follows the same structure than `transactionResponse.extraParameters`. |

</details>

#### Observações {#considerations}
* The parameter `transaction.expirationDate` is not mandatory. If you don't send this parameter, its default value for is seven (7) days after the current date.<br>If you send a date later than the default number of days, PayU will ignore this value and the expiration will be set as default.
* The parameter `transactionResponse.extraParameters` has the following parameters related to the transaction:
   - **REFERENCE**: internal payment reference generated by PayU.
   - **EXPIRATION_DATE**: maximum term for the payer to perform the payment.
   - **BAR_CODE**: barcode which lets the payer perform the payment. 
   - **URL_PAYMENT_RECEIPT_HTML**: payment receipt in HTML format. This is where you need to redirect the payment when the payer selects bank reference payment. 
   - **URL_PAYMENT_RECEIPT_PDF**: payment receipt in PDF format.

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

Response body:
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

Response body:
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

| Campo name | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| code | Alfanumérico |  | The response code of the transaction. Possible values are `ERROR` e `SUCCESS`. | Sim |
| error | Alfanumérico | Max:2048 | The error message associated when the response code is `ERROR`. | Sim |
| paymentMethods |  |  | List of the payment methods. | Sim |
| paymentMethods > paymentMethodComplete |  |  | This object has the information of a payment method. | Sim |
| paymentMethods > paymentMethodComplete > id | Numérico |  | Payment method identifier. | Sim |
| paymentMethods > paymentMethodComplete > description | Alfanumérico | Max:32 | Payment method name. | Sim |
| paymentMethods > paymentMethodComplete > country | Alfanumérico | 2 | ISO code of the Payment method country. | Sim |

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

