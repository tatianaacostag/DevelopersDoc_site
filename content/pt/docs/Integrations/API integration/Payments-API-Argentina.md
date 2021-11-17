---
title: "Payments API - Argentina"
linkTitle: "Payments API - Argentina"
date: 2021-05-03T15:48:08-05:00
description: >
  Payments API Argentina lets your shop process different transaction types with multiple payment methods.
weight: 20
tags: ["subtopic"]
---

To integrate with Payments API Argentina, target your request to the following URLs according to your environment.

{{% alert title="URL" color="info"%}}
* Teste: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Produção: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Available methods
Payments API includes the following methods:

* [Submit transaction with credit or debit card]({{< ref "Payments-API-Argentina.md#submit-transaction-with-credit-or-debit-card" >}})
* [Submit transaction with cash]({{< ref "Payments-API-Argentina.md#submit-transaction-with-cash" >}})
* [Available payment methods query]({{< ref "Payments-API-Argentina.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-API-Argentina.md#ping" >}})

{{% alert title="Observação" color="info"%}}
To confirm the status of a transaction, você pode usar one of the following options:
* Navigate to the the URL set in the `transaction.notifyUrl` variable or the _**Confirmation URL**_ option located in the Módulo PayU in _**Settings**_ > _**Technical configuration**_.
* Use the [Consultas API or SDK]({{< ref "Queries.md" >}}).
{{% /alert %}}

## Submit transaction with credit or debit card
This method lets you process the payments performed by your customers using credit or debit cards. For Argentina, you can perform the two-step flows (**Autorização**, **Captura**), and one-step flows (**Cobrança**). For more information, refer to [Payment flows]({{< ref "payments.md#payment-flows" >}}).

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Size | Descrição | Mandatory |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Max:32 | Defina `SUBMIT_TRANSACTION`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Defina `true` if the request is in test mode. Otherwise, defina `false`. | Sim |
| merchant |  |  | This object has the authentication data. | Sim |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| transaction |  |  | This object has the transaction data. | Sim |
| transaction > order |  |  | This object has the order data. | Sim |
| transaction > order > accountId | Number |  | Identifier of your account. | Sim |
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
| transaction > order > buyer > shippingAddress > postalCode | Number | Max:20 | Buyer's shipping address zip code. | Sim |
| transaction > order > buyer > shippingAddress > phone | Number | Max:20 | Buyer's shipping address phone number. | Sim |
| transaction > order > additionalValues > |  | 64 | Amount of the order or its associated values. | Sim |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Amount of the transaction. | Sim |
| transaction > order > additionalValues > TX_VALUE > value | Number | 19, 2 | Specifies the amount of the transaction, this value may have two decimal digits (Ex. `10000.00` or `10000`). | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Amount of the Value Added Tax (VAT). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Number | 19, 2 | Specifies the amount of the VAT.  | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Base value to calculate the VAT.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits.  | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Number | 19, 2 | Specifies the base amount of the transaction. | Não |
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
| transaction > payer |  |  | Payer information. Due to Tax regulations, it is mandatory to send the parameters `payer.billingAddress.state` and `payer.dnitype`. | Sim |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Payer e-mail address. | Não |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identifier of the payer in your system. | Não |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nome of the payer which must meet the name sent in the parameter `creditCard.name` for credit card payments. | Não |
| transaction > payer > billingAddress |  |  | Billing address. | Sim |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Billing Address Line 1. | Não |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Billing Address Line 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Billing address city. | Não |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Billing address state. Formato [ISO 3166-2 ARG official](https://www.iso.org/obp/ui/#iso:code:3166:AR). | Sim |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | Billing address country in format ISO 3166 Alpha-2. | Não |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Billing address zip code. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Billing address phone number. | Não |
| transaction > payer > birthdate | Alfanumérico | Max:10 |Buyer's date of birth. | Não |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Buyer's phone number. | Não |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. | Não |
| transaction > payer > dniType | Alfanumérico | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sim |
| transaction > type | Alfanumérico | 32 | Set this value according to the transaction you want:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` for one-step flows.</li></ul> | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Select a valid Credit or Debit card Método de pagamento. [See the available Payment Methods for Argentina]({{< ref "select-your-payment-method.html#Argentina" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Defina `AR` for Argentina. | Sim |
| transaction > deviceSessionId | Alfanumérico | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Max:39 | IP address of the device where the customer performs the transaction. | Sim |
| transaction > cookie | Alfanumérico | Max:255 | Cookie stored by the device where the customer performs the transaction. | Sim |
| transaction > userAgent | Alfanumérico | Max:1024 | The User agent of the browser where the customer performs the transaction. | Sim |
| transaction > extraParameters |  |  | Additional parameters or data associated with the request. The maximum size of each _extraParameters_ name is 64 characters.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | Não |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Size | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alfanumérico | Max:2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse |  |  | The response data. |
| transactionResponse > orderId | Number |  | The generated or existing order Id in PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | The identifier of the transaction in PayU. |
| transactionResponse > state | Alfanumérico | Max:32 | The status of the transaction. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | The response code associated with the status. |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | The response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | The error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | The traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | The authorization code returned by the financial network. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date |  | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters |  |  | Additional parameters or data associated with the response. <br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Observações {#considerations}
* For payments with Promotions, send the parameters `INSTALLMENTS_NUMBER` and `PROMOTION_ID` with the number of installments selected and the Id of the promotion. Consulte [Promotions API]({{< ref "Promotions.md" >}}) para obter mais informações.
* Promotions feature is only available for [one-step flows]({{< ref "Payments.md#payment-flows" >}}).
* For payments with credit card tokens, include the parameters `transaction.creditCardTokenId` and `transaction.creditCard.securityCode` (if you process with security code) replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}).
* By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative. After this feature is enabled for you, send in the request the variable `creditCard.processWithoutCvv2` as true and remove the variable `creditCard.securityCode`.
* When using credit cards, take into account the considerations due to Argentinian regulations for the check out page.
* Due to Tax regulations, it is mandatory to send the parameters `payer.billingAddress.state` using format [ISO 3166-2 ARG official](https://www.iso.org/obp/ui/#iso:code:3166:AR) and `payer.dnitype`.

### Autorização
Use this method to perform the **Autorização** step of a two-step flow. In this step, you authorize the payment but the amount is not debited until you [capture]({{< ref "payments-api-argentina.md#capture" >}}) the funds.<br>The following are the request and response bodies for this transaction type.

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

Response body:
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

Response body:
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

### Captura
Use this method to perform the **Captura** step of a two-step flow. In this step, you capture the funds previously [Authorized]({{< ref "payments-api-argentina.md#authorization" >}}) to transfer them to your PayU account.

#### Observações {#considerations}
Leve em conta as seguintes informações for capture.
* The maximum time to capture an approved transaction is 14 days. After this time, the transaction is auto voided.
* Only the parameters displayed in the request body are mandatory to invoke a Captura transaction. Recall that the order and transaction ids must meet with a currently authorized transaction.
* You can perform partial captures over an authorized amount. To do this, you need to send in the request the parameter `transaction.order.additionalValues.TX_VALUE` with its value (as sent during the Autorização) and defina `PARTIAL_CAPTURE` for `transaction.type`.

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
         "id": "1400421560"
      },
      "type": "CAPTURE",
      "parentTransactionId": "db9d9d7f-b62c-4ed2-a3b9-d146d33bdaf5"
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
         <id>1400421560</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>db9d9d7f-b62c-4ed2-a3b9-d146d33bdaf5</parentTransactionId>
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

### Cobrança
Use this method to perform a one-step flow, namely a charge. In this step, both steps of the two-step flow are combined in a single transaction and the funds are transferred from the customers account to your PayU account once they have been approved.

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

Response body:
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

Response body:
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

### Installments
When processing transactions with credit cards, you need to show the following aspects to your customer when processing installments:

![PrintScreen](/assets/Payments/Installments_en.png)

Where:

| Number in the screen | Option         | Descrição                                       |
|:--------------------:|----------------|---------------------------------------------------|
|           1          | Total purchase | Total amount of the purchase without financing.   |
|           2          | Total payment  | Total amount financed of the purchase.            |
|           3          | Installments   | Number of installments and their amount.          |
|           4          | TEA            | The annual effective interest rate (TEA) applied. |
|           5          | CFT            | The total financial cost (CFT).                   |

The information of the total financial cost (CFT) must comply with the following directions:

1. Must be located next to the reported variables.

2. Must appear in a prominent color typeface using the same font and size of at least five times bigger than the one used to inform the annual effective interest rate (TEA), the number of installments, and their amount.

According to the current regulations, you cannot use the phrase without interest (in Spanish, "sin interés") or any other similar phrase, when the financial cost of the product or service is transferred to the customer's selling price.

## Submit transaction with cash
This method lets you process the payments in cash of your customers. To integrate with cash transactions, you must redirect the customer to the URL found in the response of the method; your customer sees a payment receipt like this.

<img src="/assets/Payments/CashReceiptAR.png" alt="PrintScreen" width="50%">

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Size | Descrição | Mandatory |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Max:32 | Defina `SUBMIT_TRANSACTION`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Defina `true` if the request is in test mode. Otherwise, defina `false`. | Sim |
| merchant |  |  | This object has the authentication data. | Sim |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| transaction |  |  | This object has the transaction data. | Sim |
| transaction > order |  |  | This object has the order data. | Sim |
| transaction > order > accountId | Number |  | Identifier of your account. | Sim |
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
| transaction > order > buyer > shippingAddress > postalCode | Number | Max:20 | Buyer's shipping address zip code. | Sim |
| transaction > order > buyer > shippingAddress > phone | Number | Max:20 | Buyer's shipping address phone number. | Sim |
| transaction > order > additionalValues > |  | 64 | Amount of the order or its associated values. | Sim |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Amount of the transaction. | Sim |
| transaction > order > additionalValues > TX_VALUE > value | Number | 19, 2 | Specifies the amount of the transaction, this value may have two decimal digits (Ex. `10000.00` or `10000`). | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Amount of the Value Added Tax (VAT). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Number | 19, 2 | Specifies the amount of the VAT.  | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Base value to calculate the VAT.<br>If the amount does not have IVA, send 0.<br>This value may have two decimal digits.  | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Number | 19, 2 | Specifies the base amount of the transaction. | Não |
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
| transaction > paymentMethod | Alfanumérico | 32 | Select a valid Método de pagamento in cash. [See the available Payment Methods for Argentina]({{< ref "select-your-payment-method.html#Argentina" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Defina `AR` for Argentina. | Sim |
| transaction > expirationDate | Alfanumérico | 23 | Maximum date and time that the payer has to make the payment. Formato `YYYY-MM-DDTHH:MM:SS`, for example `2021-06-12T16:07:11.586`. | Não |
| transaction > ipAddress | Alfanumérico | Max:39 | IP address of the device where the customer performs the transaction. | Sim |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Size | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alfanumérico | Max:2048 | The error message associated when the response code is `ERROR`. |
| transactionResponse |  |  | The response data. |
| transactionResponse > orderId | Number |  | The generated or existing order Id in PayU. |
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
| transactionResponse > extraParameters |  |  | Additional parameters or data associated with the response.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"REFERENCE": "74794"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>REFERENCE</string>`<br>&emsp;&emsp;`<int>74794</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Observações {#considerations}
* The parameter `transaction.expirationDate` is not mandatory. If you don't send this parameter, its default value is 15 days after the current date.<br>If you send a date later than the default number of days, PayU will ignore this value and the expiration will be set as default.
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

Response body:
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

Response body:
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

## Available payment methods query
This method returns a list of the payment methods available in all countries.

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Size | Descrição | Mandatory | 
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
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

| Campo name | Formato | Size | Descrição | Mandatory |
|-|-|-|-|:-:|
| code | Alfanumérico |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. | Sim |
| error | Alfanumérico | Max:2048 | The error message associated when the response code is `ERROR`. | Sim |
| paymentMethods |  |  | List of the payment methods. | Sim |
| paymentMethods > paymentMethodComplete |  |  | This object has the information of a payment method. | Sim |
| paymentMethods > paymentMethodComplete > id | Numérico |  | Payment method identifier. | Sim |
| paymentMethods > paymentMethodComplete > description | Alfanumérico | Max:32 | Payment method name. | Sim |
| paymentMethods > paymentMethodComplete > country | Alfanumérico | 2 | ISO code of the Payment method country. | Sim |

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

### Variables for request and response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Campo name | Formato | Size | Descrição | Mandatory |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Language used in the request, this language is used to display the error messages generated. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
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

| Campo name | Formato | Size | Descrição |
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