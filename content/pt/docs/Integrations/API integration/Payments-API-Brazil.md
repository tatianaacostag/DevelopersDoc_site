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
* Teste: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Produção: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Available methods
Payments API includes the following methods:

* [Submit transaction with credit card]({{< ref "Payments-API-Brazil.md#submit-transaction-with-credit-cards" >}})
* [Submit transaction with PIX]({{< ref "Payments-API-Brazil.md#submit-transaction-with-pix" >}})
* [Submit transaction with cash]({{< ref "Payments-API-Brazil.md#submit-transaction-with-cash" >}})
* [Submit transaction with bank transfer]({{< ref "Payments-API-Brazil.md#submit-transaction-with-bank-transfer" >}})
* [Available payment methods query]({{< ref "Payments-API-Brazil.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-API-Brazil.md#ping" >}})

{{% alert title="Observação" color="info"%}}
To confirm the status of a transaction, você pode usar one of the following options:
* Navigate to the the URL set in the `transaction.notifyUrl` variable or the _**Confirmation URL**_ option located in the Módulo PayU in _**Settings**_ > _**Technical configuration**_.
* Use the [Consultas API or SDK]({{< ref "Queries.md" >}}).
{{% /alert %}}

## Submit transaction with credit cards
This method lets you process the payments performed by your customers using credit cards. For Brazil, you can perform the two-step flows (**Autorização**, **Captura**), and one-step flows (**Cobrança**). For more information, refer to [Payment flows]({{< ref "payments.md#payment-flows" >}}).

### Adding Payment Facilitators
Merchants can be considered as Payment Processor by franchises and the Central Bank. A payment processor is a legal entity that has money from sub-merchants. In the case of merchant bankruptcy and tax management, the Brazilian Central Bank wants to know the business's beneficiary.

To include the information of the sub-merchant, you need to include it in the request of the **Autorização**, and **Cobrança** flows using the `submerchant` object.

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

{{% alert title="Observação" color="info"%}}
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
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Address State. For Brazil, only send two characters, Por exemplo, defina `SP` for São Paulo. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | Address country. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Address Zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Phone number associated to the address. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Não |
| transaction > order > buyer |  |  | Buyer information. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Buyer ID in your system. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Full name of the buyer. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | E-mail of the buyer. | Sim | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Phone number of the buyer. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. You must use an algorithm to validate the CPF and must be set using the format `XXX.XXX.XXX-XX`. Example: `811.807.405-64`. | Sim |
| transaction > order > buyer > cnpj | Alfanumérico | Max:14 | Identification number of the buyer (For Legal person in Brazil). You must use an algorithm to validate the CNPJ and must be set using the format `XXXXXXXXXXXXXX`. Example: `32593371000110`. | Sim |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Shipping address of the buyer. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Buyer's shipping address Line 1. | Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Buyer's shipping address city. | Sim |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Buyer's shipping address state. For Brazil, only send two characters, Por exemplo, defina `SP` for São Paulo. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | Buyer's shipping address country in format ISO 3166 alpha-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Number | Max:20 | Buyer's shipping address zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | Sim |
| transaction > order > buyer > shippingAddress > phone | Number | Max:20 | Buyer's shipping address phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Sim |
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
| transaction > order > submerchant |  |  | Information of the sub-merchant. If you don't send this parameter, PayU configures your merchant as sub-merchant. | Não |
| transaction > order > submerchant > id | Alfanumérico | Max:15 | Internal ID of the sub-merchant if you use one to identify it. | Não |
| transaction > order > submerchant > fullName | Alfanumérico | Max:150 | Full name of the sub-merchant. | Não |
| transaction > order > submerchant > address |  |  | Sub-merchant address. The fields `state`, `country`, and `postalCode`are mandatory when sending this object. | Não |
| transaction > order > submerchant > address > street1 | Alfanumérico | Max:100 | Address Line 1. | Não |
| transaction > order > submerchant > address > street2 | Alfanumérico | Max:100 | Address Line 2. | Não |
| transaction > order > submerchant > address > street3 | Alfanumérico | Max:100 | Address Line 3. | Não |
| transaction > order > submerchant > address > city | Alfanumérico | Max:50 | Address city. | Não |
| transaction > order > submerchant > address > state | Alfanumérico | Max:40 | Address State. For Brazil, only send two characters, Por exemplo, defina `SP` for São Paulo. | Sim |
| transaction > order > submerchant > address > country | Alfanumérico | 2 | Address country. | Sim |
| transaction > order > submerchant > address > postalCode | Alfanumérico | Max:8 | Address Zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | Sim |
| transaction > order > submerchant > address > phone | Alfanumérico | Max:11 | Phone number associated to the address. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Não |
| transaction > order > submerchant > identification | Alfanumérico | Max:14 | Identification number of the buyer (For Legal person in Brazil). You must use an algorithm to validate the CNPJ and must be set using the format `XXXXXXXXXXXXXX`. Example: `32593371000110`. | Não |
| transaction > order > submerchant > identificationType | Alfanumérico | Max:4 | Identification type of the sub-merchant. The possible values are `cnpj` or `cpf`. | Não |
| transaction > creditCardTokenId |  |  | Include this parameter when the transaction is done using a tokenized card using the PayU Tokenization; moreover, it is mandatory to also send the parameter `transaction.creditCard.expirationDate`.<br>For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}). | Não |
| transaction > creditCard |  |  | Credit card information. This object and its parameters are mandatory when the payment is performed using not tokenized credit card. | Não |
| transaction > creditCard > number | Alfanumérico | Min:13 Max:20 | Credit card number. | Não |
| transaction > creditCard > securityCode | Alfanumérico | Min:1 Max:4 | Credit card security code (CVC2, CVV2, CID). | Não |
| transaction > creditCard > expirationDate | Alfanumérico | 7 | Credit card expiration date. Formato `YYYY/MM`. This parameter is mandatory when the payment is performed using a tokenized credit card. | Não |
| transaction > creditCard > name | Alfanumérico | Min:1 Max:255 | Holder's name displayed in the credit card. | Não |
| transaction > creditCard > processWithoutCvv2 | Boolean | Max:255 | Allows you to process transactions without including the credit card security code. Your commerce requires PayU's authorization before using this feature. | Não |
| transaction > payer |  |  | Payer information. | Não |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Payer e-mail address. | Não |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identifier of the payer in your system. | Não |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nome of the payer which must meet the name sent in the parameter `transaction.creditCard.name` for credit card payments. | Não |
| transaction > payer > billingAddress |  |  | Billing address. | Não |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Billing Address Line 1. | Não |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Billing Address Line 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Billing address city. | Não |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Billing address state. For Brazil, only send two characters, Por exemplo, defina `SP` for São Paulo. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | Billing address country in format ISO 3166 Alpha-2. | Não |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Billing address zip code. For Brazil, use the format `XXXXX-XXX` or ´. Example: `09210-710` or `09210710`. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Billing address phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Não |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Payer's date of birth. | Não |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Payer's phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Não |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. You must use an algorithm to validate the CPF and must be set using the format `XXX.XXX.XXX-XX`. Example: `811.807.405-64`. | Não |
| transaction > payer > cnpj | Alfanumérico | Max:14 | Identification number of the buyer (For Legal person in Brazil). You must use an algorithm to validate the CNPJ and must be set using the format `XXXXXXXXXXXXXX`. Example: `32593371000110`. | Não |
| transaction > payer > dniType | Alfanumérico | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > networkToken |  |  | Information of the token. Include this parameter when the transaction is done using a tokenized card using the VTS or MDES Tokenization. For more information, refer to [Pay with MDES or VTS tokens]({{< ref "#pay-with-mdes-or-vts-tokens" >}}). <br><sup>\*</sup>When sending this object, all its parameters are mandatory.| Não |
| transaction > networkToken > tokenPan | Alfanumérico | Max:32 | Token number generated either by MDES or VTS. | Sim<sup>\*</sup> |
| transaction > networkToken > cryptogram | Alfanumérico | Max:28 | Unique key generated by MDES or VTS to decrypt the information of the credit card. | Sim<sup>\*</sup> |
| transaction > networkToken > expiry | Alfanumérico | 7 | Expiration date of the token. Formato `YYYY/MM`. | Sim<sup>\*</sup> |
| transaction > type | Alfanumérico | 32 | Set this value according to the transaction you want:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` for one-step flows.</li></ul> | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Select a valid Credit card Método de pagamento. [See the available Payment Methods for Brazil]({{< ref "select-your-payment-method.html#Brazil" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Defina `BR` for Brazil. | Sim |
| transaction > deviceSessionId | Alfanumérico | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Max:39 | IP address of the device where the customer performs the transaction. | Sim |
| transaction > cookie | Alfanumérico | Max:255 | Cookie stored by the device where the customer performs the transaction. | Sim |
| transaction > userAgent | Alfanumérico | Max:1024 | The User agent of the browser where the customer performs the transaction. | Sim |
| transaction > extraParameters |  |  | Additional parameters or data associated with the request. The maximum size of each _extraParameters_ name is 64 characters.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | Não |
| transaction > termsAndConditionsAcepted | Boolean | | PayU terms and conditions that the payers must accept. *This parameter is only mandatory if your Brazilian PayU account is associated to a foreign bank account. | Não* |
| transaction > threeDomainSecure |  |  | This object contains the information of 3DS 2.0. | Não |
| transaction > threeDomainSecure > embedded | Boolean |  | Defina `true` if you want to use and embedded MPI for the Autorização process. By default, this value is set as `false`. | Não |
| transaction > threeDomainSecure > eci | Number | Max:2 | Electronic Commerce Indicator.<br>Value returned by the directory servers showing the authentication attempt.<br>This parameter is mandatory when `transaction.threeDomainSecure.embedded` is `false` and `transaction.threeDomainSecure.xid` has been set. | Não |
| transaction > threeDomainSecure > cavv | Alfanumérico | Max:28 | Cardholder Authentication Verification Value.<br>Code of the cryptogram used in the transaction authentication in Base64.<br>Depending on the specific ECI codes established by the process network, this value may be optional. | Não |
| transaction > threeDomainSecure > xid | Alfanumérico | Max:28 | Transaction ID sent by the MPI in Base64.<br>This parameter is mandatory when `transaction.threeDomainSecure.embedded` is `false` and `transaction.threeDomainSecure.eci` has been set. | Não |
| transaction > threeDomainSecure > directoryServerTransactionId | Alfanumérico | Max:36 | Transaction ID generated by the Directory Server during the Authentication. | Não |

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
* If your commerce does not have a local entity, it is mandatory to send either the CPF (parameter `transaction.[payer|buyer].dniNumber`) or the CNPJ (parameter `transaction.[payer|buyer].cnpj`) when using [Autorização]({{< ref "payments-api-brazil.md#authorization" >}}) or [Cobrança]({{< ref "payments-api-brazil.md#charge" >}}).
* If you don't send any information for the sub-merchants, PayU configures your merchant as sub-merchant.
* For payments with credit card tokens generated by PayU, include the parameters `transaction.creditCardTokenId` and `transaction.creditCard.securityCode` (if you process with security code) replacing the information of the credit card. For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}).
* For payments with credit card tokens generated using MDES or VTS, include the object `transaction.networkToken` and its parameters.
* By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative. After this feature is enabled for you, send in the request the variable `creditCard.processWithoutCvv2` as true and remove the variable `creditCard.securityCode`.<br>Having this feature enable is mandatory when using credit card tokens generated using MDES or VTS.
* The extra parameter `CIELO_TID` identifies the transaction, this parameter is needed when you want to process voids.
* The variable `transaction.threeDomainSecure` does not replace the card information nor any of the mandatory fields of the transaction. This object is additional and not mandatory.
* The variable `transaction.threeDomainSecure` corresponds to a _Pass Through_ scenario where the commerce performs the authentication by their own.

### Autorização
Use this method to perform the **Autorização** step of a two-step flow. In this step, you authorize the payment but the amount is not debited until you [capture]({{< ref "payments-api-brazil.md#capture" >}}) the funds.<br>The following are the request and response bodies for this transaction type.

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

### Captura
Use this method to perform the **Captura** step of a two-step flow. In this step, you capture the funds previously [Authorized]({{< ref "payments-api-brazil.md#authorization" >}}) to transfer them to your PayU account.

#### Observações {#considerations}
Leve em conta as seguintes informações for capture.
* The maximum time to capture an approved transaction is seven (7) days. After this time, the transaction is cancelled.
* Only the parameters displayed in the request body are mandatory to invoke a Captura transaction. Recall that the order and transaction ids must meet with a currently authorized transaction.

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

## Submit transaction with PIX
This method lets you process payments using PIX. To integrate with PIX you need to show in your checkout page a QR code so your customer can read it using their smartphone to perform the payment.

In the end, your customer sees a checkout page like this.

![PrintScreen](/assets/Payments/PixCheckout.png)

### How does PIX work?
PIX is an online transfer method released in November, 2020 by the Brazilian Central Bank (_Banco Central do Brasil_ - BACEN) which allows you make and receive transfers easily regardless of the bank who issued your account.

Unlike other cash and bank transfer methods, PIX allows you to receive transfers immediately without sharing your account number; at any time, on any day. The funds received using this payment method will appear in your PayU account in a matter of seconds. 

Pix has two parts:

* PIX key: unique identifier of a banking or payment account in the Brazilian Banking System. Your key can be generated using any of the following values:
   - Tax ID (CPF or CNPJ).
   - E-mail
   - Phone number
   - Random key

* QR code: this code is read by your customer using their phone and performs the payment.

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
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Address State. For Brazil, only send two characters, Por exemplo, defina `SP` for São Paulo. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | Address country. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Address Zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Phone number associated to the address. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Não |
| transaction > order > buyer |  |  | Buyer information. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Buyer ID in your system. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Full name of the buyer. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | E-mail of the buyer. | Sim | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Phone number of the buyer. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. You must use an algorithm to validate the CPF and must be set using the format `XXX.XXX.XXX-XX`. Example: `811.807.405-64`. | Sim |
| transaction > order > buyer > cnpj | Alfanumérico | Max:14 | Identification number of the buyer (For Legal person in Brazil). You must use an algorithm to validate the CNPJ and must be set using the format `XXXXXXXXXXXXXX`. Example: `32593371000110`. | Sim |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Shipping address of the buyer. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Buyer's shipping address Line 1. | Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Buyer's shipping address city. | Sim |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Buyer's shipping address state. For Brazil, only send two characters, Por exemplo, defina `SP` for São Paulo. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | Buyer's shipping address country in format ISO 3166 alpha-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Number | Max:20 | Buyer's shipping address zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | Sim |
| transaction > order > buyer > shippingAddress > phone | Number | Max:20 | Buyer's shipping address phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Sim |
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
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Payer e-mail address. | Não |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identifier of the payer in your system. | Não |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nome of the payer. | Sim |
| transaction > payer > billingAddress |  |  | Billing address. | Não |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Billing Address Line 1. | Não |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Billing Address Line 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Billing address city. | Não |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Billing address state. For Brazil, only send two characters, Por exemplo, defina `SP` for São Paulo. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | Billing address country in format ISO 3166 Alpha-2. | Não |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Billing address zip code. For Brazil, use the format `XXXXX-XXX` or ´. Example: `09210-710` or `09210710`. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Billing address phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Não |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Payer's date of birth. | Não |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Payer's phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Não |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. You must use an algorithm to validate the CPF and must be set using the format `XXX.XXX.XXX-XX`. Example: `811.807.405-64`. | Não |
| transaction > payer > cnpj | Alfanumérico | Max:14 | Identification number of the buyer (For Legal person in Brazil). You must use an algorithm to validate the CNPJ and must be set using the format `XXXXXXXXXXXXXX`. Example: `32593371000110`. | Não |
| transaction > payer > dniType | Alfanumérico | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > type | Alfanumérico | 32 | As PIX payments are performed using the payer mobile phone, the only available transaction type is `AUTHORIZATION_AND_CAPTURE`. | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Defina `PIX` for this payment method. If you want to see other payment method, refer to [Payment Methods for Brazil]({{< ref "select-your-payment-method.html#Brazil" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Defina `BR` for Brazil. | Sim |
| transaction > deviceSessionId | Alfanumérico | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Max:39 | IP address of the device where the customer performs the transaction. | Sim |
| transaction > extraParameters |  |  | Additional parameters or data associated with the request. The maximum size of each _extraParameters_ name is 64 characters.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"PARAMETER_NAME": "VALUE"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>PARAMETER_NAME</string>`<br>&emsp;&emsp;`<string>VALUE</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`<br>_Set the respective data type_  | Não |

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
| transactionResponse > state | Alfanumérico | Max:32 | The status of the transaction. As the payment is performed by the user in their phone, the state for a successful transaction is `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | The response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | The error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | The traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | The authorization code returned by the financial network. |
| transactionResponse > pendingReason | Alfanumérico | Max:21 | The reason code associated with the status, as mentioned in `transactionResponse > state`, the transaction is waiting for the payment. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | The response code associated with the status. In this case, for successful transactions is `PENDING_PAYMENT_IN_ENTITY`. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date |  | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters |  |  | Additional parameters or data associated with the response.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"EXPIRATION_DATE": "1627488070000"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>EXPIRATION_DATE</string>`<br>&emsp;&emsp;`<int>1627488070000</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Observações {#considerations}
* Payments processed through our gateway will be for PayU on behalf of your commerce.
* If your commerce does not have a local entity, it is mandatory to send either the CPF (parameter `transaction.[payer|buyer].dniNumber`) or the CNPJ (parameter `transaction.[payer|buyer].cnpj`.
* To configure the expiration time of the QR code, contact your sales representative. The maximum time you can request is one day.<br>By default, the expiration time is two (2) hours.
* The minimum amount you can process with PIX is R$ 1.00, the maximum amount depends on your customer and their bank.
* The parameter `transaction.payer.fullName` is mandatory to create the request.
* The QR code and the PIX key used to receive payments is generated by PayU, it is not supported to configure your own QR code nor PIX key. Nevertheless, the total of the transaction minus the commission fee is transferred to your PayU account.
* To query an active code of your transaction, use the [Consultas API]({{< ref "Queries-API.md" >}}).
* The parameter `transactionResponse.extraParameters` has the following parameters related to the transaction:
   - **EXPIRATION_DATE**: deadline to make the payment.
   - **QRCODE_EMV**: code to be pasted in the bank portal to perform the payment. This code is used when the customer cannot read the QR code.
   - **QRCODE_IMAGE_BASE64**: image of the QR code. This is a string codified in Base64.

{{% alert title="Observação" color="info"%}}
It is recommended to display in your Checkout both the image of the QR code (parameter `QRCODE_IMAGE_BASE64` decoded) and the string of the code (parameter `QRCODE_EMV`) to avoid payment desertions.
{{% /alert %}}

### API call
The following are the bodies of the request and response of this payment method.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
   "language": "pt",
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
         "language": "pt",
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
      "payer": {
         "fullName":"Payer Name",
         "emailAddress": "buyer_test@test.com",
         "contactPhone": "55 12345678901",
         "dniType": "CPF",
         "dniNumber": "653.098.319-83"
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "PIX",
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
    "orderId": 120000260,
    "transactionId": "e82ace4c-647b-457d-b4f5-136c921445b6",
    "state": "PENDING",
    "paymentNetworkResponseCode": null,
    "paymentNetworkResponseErrorMessage": null,
    "trazabilityCode": "9c7d3f2d-6c2c-436c-a06d-e6f99271ff3f",
    "authorizationCode": null,
    "pendingReason": "AWAITING_PAYMENT_IN_ENTITY",
    "responseCode": "PENDING_PAYMENT_IN_ENTITY",
    "errorCode": null,
    "responseMessage": null,
    "transactionDate": null,
    "transactionTime": null,
    "operationDate": 1627473671920,
    "referenceQuestionnaire": null,
    "extraParameters": {
      "EXPIRATION_DATE": 1627488070000,
      "QRCODE_EMV": "00020101021126950014BR.GOV.BCB.PIX2573spi.dev.cloud.itau.com.br/documentos/198e49c5-2330-4ad7-9d0b-967c7b5371225204000053039865802BR5923PMD Gotham NegA cios ME6009SAO PAULO62410503***50300017BR.GOV.BCB.BRCODE01051.0.063040866",
      "QRCODE_IMAGE_BASE64": "iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6AQAAAACgl2eQAAADCUlEQVR4Xu2XUW4cIRBE6YvA/W+Ro8BFIPWKsWU5kpWPbOVn8SaZhWep1F1dTNr5ef1q33e+rTdw1xu466+A2VqtXbuP3etMPY9zlrdjwPLnrNm1NceaNXtv426nAOliqw5K+1io3IBhoFyZsWuaE/UfgM1h0xpzTMqUBfRxXZB2ONylhy/Nej0wMe2fi+0Y4KUend1omcZHR7vufgigNMzLEDXFbL63Pj6bFQBkld57MS0KkEWfdhOg3sWAI0mYRUIJMkvGwq5VCJhWtwkwAWoXIcJvjRxw9WnL/YKQWxejPGKAxvZgEHWoBKlhErztmBhgafaMXCtqWKVDJQYc2oNndY5llncEspUDlOFFrXRA23QiUl9jwB7aPvhkoE5UGeQxBlyFLEaXCbrW+XT16wGe9Kcsk25JsH/oWgjw9PbGge+ysdAtgRAhwNm1iW+rXN5pV2oMuEaVTHlXL30iFaySXU+hAsBGpJulzAAclE3geEQGAIzCfcKrFv7VEVna3LAQMIcNyiue7lKSg1ppQ0OcAshPWWT4amNtarb4GgN8qcmwvlAk8qNRtC4GuEVKLn13fKlUUuxepQC+C9NWJ9ZlHRu5iLMUMPGrdhkZLKwLpvQfoXvXhoCDzsZP0beFgagefgkC0yWiVbxqFBmmn/Xh6tcDyxnGtUpskJ/Mb0dpDGBQnSJSJ7NKHYahaR+Fej3wWMSqMI/+Utmkmm6lgCewfICwmyPdHg4BGtRBkHp+m29VqbPyHCCPKL+pFzpJUiZIep9CBQAnOZ+nQwu3TP8bAybjqvJgkyI+DjLF07gQ4M5wXEibvtod5u0RGQDYKhhZFX3ca9hYuRID9GbDidql+kgt/eKCpYMpwGaVIAZGAaKObZyL1BygxTMgMUKXuOEXbQwBFEWaOt4tusQW/eKXQsDic0vE+17njA4SrjFg8n43XCwbZQsdfooCC4eSJJoXJVkRYJ/NSgHEOBIJ8wtYeAzQh0HpCjLop3GDeU4BtEU2kUpXR1YhQqlXDvhxvYG73sBd/wD4Df7+v4eqIoYgAAAAAElFTkSuQmCC"
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
   <language>pt</language>
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
         <language>pt</language>
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
      <payer>
         <contactPhone>55 12345678901</contactPhone>
         <dniNumber>653.098.319-83</dniNumber>
         <dniType>CPF</dniType>
         <emailAddress>buyer_test@test.com</emailAddress>
         <fullName>Payer Name</fullName>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>PIX</paymentMethod>
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
        <trazabilityCode>e0a52a20-6ae2-4970-9b81-47f208bbf40e</trazabilityCode>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <operationDate>2021-10-08T12:14:15</operationDate>
        <extraParameters>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-10-08T18:14:13</date>
            </entry>
            <entry>
                <string>QRCODE_EMV</string>
                <string>00020101021226770014BR.GOV.BCB.PIX2555api.itau/pix/qr/v2/8ccd84ae-0c8d-4f71-8abf-b676a666bf9f5204000053039865802BR5911PAYU BRASIL6009SAO PAULO62070503***6304E404</string>
            </entry>
            <entry>
                <string>QRCODE_IMAGE_BASE64</string>
                <string>iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6AQAAAACgl2eQAAAC0ElEQVR4Xu2XW27cMAxFpY1I+99FlyJtRO45VFIrUyDoR8z+DDEPj3QMMCTvlVOu7+NXeV15iTew4w3seAM7/g0YpdTJ92p1lTpKveY1XUwE2JyT3TnnqF6WFnd4UxowKq/R56qrldZH68uVfIDc+mqktyBb/w/A6vSMXtms0kePxUyAl79t2AVKyWYsJgIxtK/x11S/xs8CH0GOrJEh7+WmkQWMPpjW3aWYFybY8b3/iucBqtLwjn4txsWSIRs13BMB80E2zqrqoUyle08qQFV6zK0UqfpuXiYC5OQu9sXqMmGRW7wJwBykMxCuWdosb6Fcf5JMAJAMFo5e9HFHZtvaXagEYG7n4kDzHMHRi656NCsBcErJLIQLZc56+t2sDECJ+IF1TWNtI7uTfB64LEswJQR8sYV4j24+Dww9nCeLzzpFo0LHeQCIBO8aEtZYQ0KJgJ4pwsB4qpic2rGFaYC9Kj5k9Rk1o2DSIxMgIxdCL2SMlTq+425WBjCqZ5idwkb57ZeLiYBaoVlLH9lDIzcPdT8PRJkUSkiG3OJ4+9KsxwH2PE/YVi+OjeI5DpQEYDgmJQ73poThMNR1NOt5YKqZmFObxMfSQ5RPHsCkVPfYIMsisLwjE2BqL/eKeZmxvZqHeBOAuX8iGZKjT1g5rTqb9TzADu5hTvYo3ItUj2YlAGywHk3D08ltWKuzks8DeNfSwxwUL6NSX9X9PIBtqBpey+cM9snbtTzg2koZrkz/K3OM19ms5wHr08JM9fHqR+vx+J0IOKXTXTanQ4yU0dGVCAwFa5rVR4zlBb/5SAQMc3R6PelXqGee4n0cMKHl814Ixvy63j4yAdKbnufD2iiYj/M1FRjhGaGd4qMO8/qlWUlAjE1MK7BCqldEJqBfUCwa5NV0fpZMGhDNas2xwTlIUU87zDwBiMZooFZIIYsq4UTgu3gDO97Ajjew4weA30GD9ELLE47fAAAAAElFTkSuQmC</string>
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
| transaction > order > notifyUrl | Alfanumérico | Max:2048 | Confirmation URL of the order. | Sim |
| transaction > order > partnerId | Alfanumérico | Max:255 | Partner ID in PayU. | Sim |
| transaction > order > signature | Alfanumérico | Max:255 | The signature associated to the form. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| transaction > order > shippingAddress |  |  | Shipping address. | Não |
| transaction > order > shippingAddress > street1 | Alfanumérico | Max:100 | Address Line 1. | Não |
| transaction > order > shippingAddress > street2 | Alfanumérico | Max:100 | Address Line 2. | Não |
| transaction > order > shippingAddress > city | Alfanumérico | Max:50 | Address city. | Não |
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Address State. For Brazil, only send two characters, Por exemplo, defina `SP` for São Paulo. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | Address country. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Address Zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Phone number associated to the address. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Não |
| transaction > order > buyer |  |  | Buyer information. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Buyer ID in your system. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Full name of the buyer. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | E-mail of the buyer. | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Phone number of the buyer. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. You must use an algorithm to validate the CPF and must be set using the format `XXX.XXX.XXX-XX`. Example: `811.807.405-64`. | Sim |
| transaction > order > buyer > cnpj | Alfanumérico | Max:14 | Identification number of the buyer (For Legal person in Brazil). You must use an algorithm to validate the CNPJ and must be set using the format `XXXXXXXXXXXXXX`. Example: `32593371000110`. | Sim |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Shipping address of the buyer. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Buyer's shipping address Line 1. |  Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Buyer's shipping address city. | Sim |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Buyer's shipping address state. For Brazil, only send two characters, Por exemplo, defina `SP` for São Paulo. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | Buyer's shipping address country in format ISO 3166 alpha-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Number | Max:20 | Buyer's shipping address zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | Sim |
| transaction > order > buyer > shippingAddress > phone | Number | Max:20 | Buyer's shipping address phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Sim |
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
| transaction > payer |  |  | Payer information. This information is optional. | Não |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Payer e-mail address. | Não |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identifier of the payer in your system. | Não |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nome of the payer. | Não |
| transaction > payer > billingAddress |  |  | Billing address. | Não |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Billing Address Line 1. | Não |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Billing Address Line 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Billing address city. | Não |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Billing address state. For Brazil, only send two characters, Por exemplo, defina `SP` for São Paulo. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | Billing address country in format ISO 3166 Alpha-2. | Não |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Billing address zip code. For Brazil, use the format `XXXXX-XXX` or ´. Example: `09210-710` or `09210710`. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Billing address phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Não |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Payer's date of birth. | Não |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Payer's phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Não |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. You must use an algorithm to validate the CPF and must be set using the format `XXX.XXX.XXX-XX`. Example: `811.807.405-64`. | Não |
| transaction > payer > cnpj | Alfanumérico | Max:14 | Identification number of the buyer (For Legal person in Brazil). You must use an algorithm to validate the CNPJ and must be set using the format `XXXXXXXXXXXXXX`. Example: `32593371000110`. | Não |
| transaction > payer > dniType | Alfanumérico | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > type | Alfanumérico | 32 | As Transferências bancárias payments are performed in the bank's webpage, the only available transaction type is `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Select a valid Método de pagamento in cash. [See the available Payment Methods for Brazil]({{< ref "select-your-payment-method.html#Brazil" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Defina `BR` for Brazil. | Sim |
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
| transaction > order > notifyUrl | Alfanumérico | Max:2048 | Confirmation URL of the order. | Não|
| transaction > order > partnerId | Alfanumérico | Max:255 | Partner ID in PayU. | Não |
| transaction > order > signature | Alfanumérico | Max:255 | The signature associated to the form. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| transaction > order > shippingAddress |  |  | Shipping address. | Não |
| transaction > order > shippingAddress > street1 | Alfanumérico | Max:100 | Address Line 1. | Não |
| transaction > order > shippingAddress > street2 | Alfanumérico | Max:100 | Address Line 2. | Não |
| transaction > order > shippingAddress > city | Alfanumérico | Max:50 | Address city. | Não |
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Address State. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | Address country. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Address Zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Phone number associated to the address. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Não |
| transaction > order > buyer |  |  | Buyer information. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Buyer ID in your system. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Full name of the buyer. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | E-mail of the buyer. | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Phone number of the buyer. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. You must use an algorithm to validate the CPF and must be set using the format `XXX.XXX.XXX-XX`. Example: `811.807.405-64`. | Sim |
| transaction > order > buyer > cnpj | Alfanumérico | Max:14 | Identification number of the buyer (For Legal person in Brazil). You must use an algorithm to validate the CNPJ and must be set using the format `XXXXXXXXXXXXXX`. Example: `32593371000110`. | Sim |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Shipping address of the buyer. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Buyer's shipping address Line 1. | Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Buyer's shipping address city. | Sim |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Buyer's shipping address state. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | Buyer's shipping address country in format ISO 3166 alpha-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Number | Max:20 | Buyer's shipping address zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | Sim |
| transaction > order > buyer > shippingAddress > phone | Number | Max:20 | Buyer's shipping address phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Sim |
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
| transaction > payer |  |  | Payer information. | Não |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Payer e-mail address. | Não |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identifier of the payer in your system. | Não |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nome of the payer. | Não |
| transaction > payer > billingAddress |  |  | Billing address. | Não |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Billing Address Line 1. | Não |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Billing Address Line 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Billing address city. | Não |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Billing address state. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | Billing address country in format ISO 3166 Alpha-2. | Não |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Billing address zip code. For Brazil, use the format `XXXXX-XXX` or `XXXXXXXX`. Example: `09210-710` or `09210710`. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Billing address phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Não |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Payer's date of birth. Formato `YYYY-MM-DD`. | Não |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Payer's phone number. For Brazil, use the format `ddd(2)+number(7-9)`. Example: `(11)756312633`. | Não |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Identification number of the buyer. You must use an algorithm to validate the CPF and must be set using the format `XXX.XXX.XXX-XX`. Example: `811.807.405-64`. | Não |
| transaction > payer > dniType | Alfanumérico | 2 | Identification type of the buyer. [See Document types]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > type | Alfanumérico | 32 | As cash payments are performed in physical offices, the only available transaction type is `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Select a valid Método de pagamento in Bank transfer. [See the available Payment Methods for Brazil]({{< ref "select-your-payment-method.html#Brazil" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Defina `BR` for Brazil. | Sim |
| transaction > deviceSessionId | Alfanumérico | Max:255 | Session identifier of the device where the customer performs the transaction. For more information, refer to [this topic]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Max:39 | IP address of the device where the customer performs the transaction. | Sim |
| transaction > cookie | Alfanumérico | Max:255 | Cookie stored by the device where the customer performs the transaction. | Sim |
| transaction > userAgent | Alfanumérico | Max:1024 | The User agent of the browser where the customer performs the transaction. | Sim |

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
| transactionResponse > responseCode | Alfanumérico | Max:64 | The response code associated with the status. In this case, for successful transactions is `PENDING_PAYMENT_IN_ENTITY`. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date |  | Creation date of the response in the PayU´s system. |
| transactionResponse > extraParameters |  |  | Additional parameters or data associated with the response.<br>In JSON, the _extraParameters_ parameter follows this structure: <br>`"extraParameters": {`<br>&emsp;`"BANK_URL": "https://gateway.payulatam.com/ppp-web-gateway/payment-redirect.zul?prid=1181964158Ya5b4bd5e7c6e4ebY4085cd2deb967f2"`<br>`}`<br><br>In XML, the _extraParameters_ parameter follows this structure: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_URL</string>`<br>&emsp;&emsp;`<string>https://gateway.payulatam.com/ppp-web-gateway/payment-redirect.zul?prid=1181964158Ya5b4bd5e7c6e4ebY4085cd2deb967f2</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo |  |  | Additional information associated with the response. This object follows the same structure than `transactionResponse.extraParameters`. |

</details>

#### Observações {#considerations}
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

| Campo name | Formato | Size | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | The response code of the transaction. Possible values are `ERROR` and `SUCCESS`. |
| error | Alfanumérico | Max:2048 | The error message associated when the response code is `ERROR`. |
| paymentMethods |  |  | List of the payment methods. |
| paymentMethods > paymentMethodComplete |  |  | This object has the information of a payment method. |
| paymentMethods > paymentMethodComplete > id | Numérico |  | Payment method identifier. |
| paymentMethods > paymentMethodComplete > description | Alfanumérico | Max:32 | Payment method name. |
| paymentMethods > paymentMethodComplete > country | Alfanumérico | 2 | ISO code of the Payment method country. |

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

