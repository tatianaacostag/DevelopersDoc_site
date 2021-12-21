---
title: "Response Codes and Variables"
linkTitle: "Response Codes and Variables"
date: 2021-04-06T15:33:35-05:00
description:
  In this section, you find relevant data used during the integration process, such as the variable tables, languages, and currencies admitted in the PayU’s platform.
weight: 50
---
<script src="/js/searchcodes.js"></script>

<input type="text" id="searchBox" placeholder=" Search for names, codes or description..." onkeyup="findTables()" >
<button onclick="document.getElementById('searchBox').value = '';findTables()" class="btn-green">Clear</button>

## Response codes for transactions

| Response code | Description |
|-|-|
| `ERROR` | General error. |
| `APPROVED` | The transaction was approved. |
| `ANTIFRAUD_REJECTED` | The transaction was rejected by the anti-fraud system. |
| `BANK_FRAUD_REJECTED` | The transaction was rejected due to suspected fraud at the financial institution. |
| `PAYMENT_NETWORK_REJECTED` | The financial network rejected the transaction. |
| `ENTITY_DECLINED` | The transaction was declined by the bank or financial network because of an error. |
| `INTERNAL_PAYMENT_PROVIDER_ERROR` | An error has occurred in the system trying to process the payment. |
| `INACTIVE_PAYMENT_PROVIDER` | The payment provider was not active. |
| `DIGITAL_CERTIFICATE_NOT_FOUND` | The financial network reported an authentication error. |
| `INVALID_EXPIRATION_DATE_OR_SECURITY_CODE` | The security code or expiration date was invalid. |
| `INVALID_RESPONSE_PARTIAL_APPROVAL` | Invalid response type. The entity response is a partial approval and should be automatically canceled by the system. |
| `INSUFFICIENT_FUNDS` | The account had insufficient funds. |
| `CREDIT_CARD_NOT_AUTHORIZED _FOR_INTERNET_TRANSACTIONS` | The credit card was not authorized for internet transactions. |
| `INVALID_TRANSACTION` | The financial network reported that the transaction was invalid. |
| `INVALID_CARD` | The card is invalid. |
| `EXPIRED_CARD` | The card has expired. |
| `RESTRICTED_CARD` | The card has a restriction. |
| `CONTACT_THE_ENTITY` | You should contact the bank. |
| `REPEAT_TRANSACTION` | You must repeat the transaction. |
| `ENTITY_MESSAGING_ERROR` | The financial network reported a communication error with the bank. |
| `BANK_UNREACHABLE` | The bank was not available. |
| `EXCEEDED_AMOUNT` | The transaction exceeds the amount set by the bank. |
| `NOT_ACCEPTED_TRANSACTION` | The transaction was not accepted by the bank for some reason. |
| `ERROR_CONVERTING_TRANSACTION_AMOUNTS` | An error occurred converting the amounts to the payment currency. |
| `EXPIRED_TRANSACTION` | The transaction expired. |
| `PENDING_TRANSACTION_REVIEW` | The transaction was stopped and must be revised, this can occur because of security filters. |
| `PENDING_TRANSACTION_CONFIRMATION`| The transaction is subject to confirmation. |
| `PENDING_TRANSACTION_TRANSMISSION` | The transaction is subject to be transmitted to the financial network. This usually applies to transactions with cash payment means. |
| `PAYMENT_NETWORK_BAD_RESPONSE` | The message returned by the financial network is inconsistent. |
| `PAYMENT_NETWORK_NO_CONNECTION` | Could not connect to the financial network. |
| `PAYMENT_NETWORK_NO_RESPONSE` | Financial Network did not respond. |
| `FIX_NOT_REQUIRED` | Transactions clinic: internal handling code. |
| `AUTOMATICALLY_FIXED_AND_SUCCESS_REVERSAL` | Transactions clinic: internal handling code. Query API. |
| `AUTOMATICALLY_FIXED_AND_UNSUCCESS_REVERSAL` | Transactions clinic: internal handling code. Query API. |
| `AUTOMATIC_FIXED_NOT_SUPPORTED` | Transactions clinic: internal handling code. Query API. |
| `NOT_FIXED_FOR_ERROR_STATE` | Transactions clinic: internal handling code. Query API. |
| `ERROR_FIXING_AND_REVERSING` | Transactions clinic: internal handling code. Query API. |
| `ERROR_FIXING_INCOMPLETE_DATA` | Transactions clinic: internal handling code. Query API. |

## Response codes sent to the response page

<div class="variables"></div>

| lap Transaction State | transaction State | pol Transaction State | lapResponseCode | pol Response Code | Description |
|-|-|-|-|-|-|
| APPROVED | 4 (Approved) | 4 (Approved) | APPROVED | 1 | Transaction approved |
| DECLINED | 6 (Declined) | 6 (Rejected) | PAYMENT_NETWORK_REJECTED | 4 | Transaction rejected by payment network |
|  |  |  | ENTITY_DECLINED | 5 | Transaction has been declined by the bank |
|  |  |  | INSUFFICIENT_FUNDS | 6 | Insufficient funds |
|  |  |  | INVALID_CARD | 7 | Invalid Card |
|  |  |  | CONTACT_THE_ENTITY | 8 | Please contact your financial entity |
|  |  |  | BANK_ACCOUNT_ACTIVATION _ERROR | 8 | Automatic debit not allowed |
|  |  |  | BANK_ACCOUNT_NOT_AUTHORIZED _FOR_AUTOMATIC_DEBIT | 8 | Automatic debit not allowed |
|  |  |  | INVALID_AGENCY_BANK_ACCOUNT | 8 | Automatic debit not allowed |
|  |  |  | INVALID_BANK_ACCOUNT | 8 | Automatic debit not allowed |
|  |  |  | INVALID_BANK | 8 | Automatic debit not allowed |
|  |  |  | EXPIRED_CARD | 9 | Expired card |
|  |  |  | RESTRICTED_CARD | 10 | Restricted card |
|  |  |  | INVALID_EXPIRATION_DATE_OR _SECURITY_CODE | 12 | Date of expiration or security code is invalid |
|  |  |  | REPEAT_TRANSACTION | 13 | Retry the transaction |
|  |  |  | INVALID_TRANSACTION | 14 | Transaction invalid |
|  |  |  | EXCEEDED_AMOUNT | 17 | Value exceeds maximum allowed by this entity |
|  |  |  | ABANDONED_TRANSACTION | 19 | Transaction abandoned by the payer |
|  |  |  | CREDIT_CARD_NOT_AUTHORIZED_FOR _INTERNET_TRANSACTIONS | 22 | Card is not authorized for internet purchases |
|  |  |  | ANTIFRAUD_REJECTED | 23 | Transaction has been rejected by the anti-fraud module |
|  |  |  | BANK_FRAUD_REJECTED | 23 | The transaction was rejected due to suspected fraud at the financial institution |
|  |  |  | DIGITAL_CERTIFICATE_ NOT_FOUND | 9995 | Digital certificate not found |
|  |  |  | BANK_UNREACHABLE | 9996 | Error trying to communicate with the bank |
|  |  |  | ENTITY_MESSAGING _ERROR | 9997 | Error communicating with the financial institution |
|  |  |  | NOT_ACCEPTED_ TRANSACTION | 9998 | Transaction not permitted to cardholder |
|  |  |  | INTERNAL_PAYMENT _PROVIDER_ERROR | 9999 | Internal error |
|  |  |  | INACTIVE_PAYMENT_ PROVIDER | 9999 | Internal error |
| ERROR | 104 (Error) | 6 (Rejected) | ERROR | 9999 | Internal error |
|  |  |  | ERROR_CONVERTING_TRANSACTION _AMOUNTS | 9999 | Internal error |
|  |  |  | BANK_ACCOUNT_ACTIVATION_ERROR | 9999 | Internal error |
|  |  |  | FIX_NOT_REQUIRED | 9999 | Internal error |
|  |  |  | AUTOMATICALLY_FIXED_AND_SUCCESS _REVERSAL | 9999 | Internal error |
|  |  |  | AUTOMATICALLY_FIXED _AND_UNSUCCESS _REVERSAL | 9999 | Internal error |
|  |  |  | AUTOMATIC_FIXED_ NOT_SUPPORTED | 9999 | Internal error |
|  |  |  | NOT_FIXED_FOR_ ERROR_STATE | 9999 | Internal error |
|  |  |  | ERROR_FIXING_AND _REVERSING | 9999 | Internal error |
|  |  |  | ERROR_FIXING_ INCOMPLETE_DATA | 9999 | Internal error |
|  |  |  | PAYMENT_NETWORK_ BAD_RESPONSE | 9999 | Internal error |
|  |  |  | PAYMENT_NETWORK_ NO_CONNECTION | 9996 | Unable to communicate with the financial institution |
|  |  |  | PAYMENT_NETWORK_ NO_RESPONSE | 9996 | No response from the financial institution |
| EXPIRED | 5 (Expired) | 5 (Expired) | EXPIRED_TRANSACTION | 20 | Transaction expired |
| PENDING | 7 (Pending) | 7 (Pending) | PENDING_TRANSACTION_ REVIEW | 15 | Transaction is pending approval |
|  |  | 14 (Pending) | PENDING_TRANSACTION_ CONFIRMATION | 25 | Receipt of payment generated. Pending payment |
|  |  | 7 (Pending) | PENDING_TRANSACTION_ TRANSMISSION | 9998 | Not permitted transaction |
|  |  | 14 (Pending) | PENDING_PAYMENT_IN_ENTITY | 25 | Receipt of payment generated. Pending payment |
|  |  | 15 (Pending) | PENDING_PAYMENT_IN_BANK | 26 | Receipt of payment generated. Pending payment |
|  |  | 10 (Pending) | PENDING_SENT_TO_FINANCIAL _ENTITY | 29 |   |
|  |  | 12 (Pending) | PENDING_AWAITING_PSE _CONFIRMATION | 9994 | Pending confirmation from PSE |
|  |  | 18 (Pending) | PENDING_NOTIFYING_ENTITY | 25 | Receipt of payment generated. Pending payment |

##  Response codes sent to the confirmation page

<div class="variables"></div>

| state_pol | response_message_pol | response_code_pol | Description |
|-|-|-|-|
| 4 (Approved) | APPROVED | 1 | Transaction approved |
| 6 (Declined) | PAYMENT_NETWORK_REJECTED | 4 | Transaction rejected by financial institution |
|  | ENTITY_DECLINED | 5 | Transaction rejected by the bank |
|  | INSUFFICIENT_FUNDS | 6 | Insufficient funds |
|  | INVALID_CARD | 7 | Invalid card |
|  | CONTACT_THE_ENTITY | 8 | Contact the financial institution |
|  | BANK_ACCOUNT_ACTIVATION_ERROR | 8 | Automatic debit is not allowed |
|  | BANK_ACCOUNT_NOT_AUTHORIZED _FOR_AUTOMATIC_DEBIT | 8 | Automatic debit is not allowed |
|  | INVALID_AGENCY_BANK_ACCOUNT | 8 | Automatic debit is not allowed |
|  | INVALID_BANK_ACCOUNT | 8 | Automatic debit is not allowed |
|  | INVALID_BANK | 8 | Automatic debit is not allowed |
|  | EXPIRED_CARD | 9 | Expired card |
|  | RESTRICTED_CARD | 10 | Restricted card |
|  | INVALID_EXPIRATION_DATE_OR _SECURITY_CODE | 12 | Invalid expiration date or security code |
|  | REPEAT_TRANSACTION | 13 | Retry payment |
|  | INVALID_TRANSACTION | 14 | Invalid transaction |
|  | EXCEEDED_AMOUNT | 17 | The value exceeds the maximum allowed by the entity |
|  | ABANDONED_TRANSACTION | 19 | Transaction abandoned by the payer |
|  | CREDIT_CARD_NOT_AUTHORIZED_FOR _INTERNET_TRANSACTIONS | 22 | Card not authorized to buy online |
|  | ANTIFRAUD_REJECTED | 23 | Transaction refused because of suspected fraud |
|  | BANK_FRAUD_REJECTED | 23 | The transaction was rejected due to suspected fraud at the financial institution |
|  | DIGITAL_CERTIFICATE_NOT_FOUND | 9995 | Digital certificate not found |
|  | BANK_UNREACHABLE | 9996 | Error trying to communicate with the bank |
|  | PAYMENT_NETWORK_NO_CONNECTION | 9996 | Unable to communicate with the financial institution |
|  | PAYMENT_NETWORK_NO_RESPONSE | 9996 | No response was received from the financial institution |
|  | ENTITY_MESSAGING_ERROR | 9997 | Error communicating with the financial institution |
|  | NOT_ACCEPTED_TRANSACTION | 9998 | Transaction not permitted |
|  | INTERNAL_PAYMENT_PROVIDER_ERROR | 9999 | Error |
|  | INACTIVE_PAYMENT_PROVIDER | 9999 | Error |
|  | ERROR | 9999 | Error |
|  | ERROR_CONVERTING_TRANSACTION _AMOUNTS | 9999 | Error |
|  | BANK_ACCOUNT_ACTIVATION_ERROR | 9999 | Error |
|  | FIX_NOT_REQUIRED | 9999 | Error |
|  | AUTOMATICALLY_FIXED_AND_SUCCESS _REVERSAL | 9999 | Error |
|  | AUTOMATICALLY_FIXED_AND_UNSUCCESS _REVERSAL | 9999 | Error |
|  | AUTOMATIC_FIXED_NOT_SUPPORTED | 9999 | Error |
|  | NOT_FIXED_FOR_ERROR_STATE | 9999 | Error |
|  | ERROR_FIXING_AND_REVERSING | 9999 | Error |
|  | ERROR_FIXING_INCOMPLETE_DATA | 9999 | Error |
|  | PAYMENT_NETWORK_BAD_RESPONSE | 9999 | Error |
| 5 (Expired) | EXPIRED_TRANSACTION | 20 | Expired transaction |

## Codes of the payment methods
The following codes applies for `payment_method_type` (Confirmation Page), `payment_method_id` (Confirmation Page), and `polPaymentMethodType` (Response Page).

| Code | lapPaymentMethodType<br>(Response Page) | Description         |
|:----:|-----------------------------------------|---------------------|
|   2  | CREDIT_CARD                             | Credit Cards        |
|   4  | PSE                                     | PSE Bank transfers  |
|   5  | ACH                                     | ACH debits          |
|   6  | DEBIT_CARD                              | Debit cards         |
|   7  | CASH                                    | Cash                |
|   8  | REFERENCED                              | Referenced payment  |
|  10  | BANK_REFERENCED                         | Payment in banks    |
|  14  | SPEI                                    | SPEI Bank transfers |

## Commands accepted by the Payments API

| Command               | Description                                              |
|-----------------------|----------------------------------------------------------|
| `PING`                | Used to ping the service.                                |
| `SUBMIT_TRANSACTION`  | Used to send transactions of any kind.                   |
| `GET_PAYMENT_METHODS` | Used to query the shop’s available payment methods.      |
| `GET_BANKS_LIST`      | It is used to obtain the bank list for PSE transactions. |

## Commands accepted by the Query API

| Command                          | Description                                      |
|----------------------------------|--------------------------------------------------|
| `PING`                           | Used to ping the service.                        |
| `ORDER_DETAIL`                   | Used to query an order using its identifier.     |
| `ORDER_DETAIL_BY_REFERENCE_CODE` | Used to query an order using its reference code. |
| `TRANSACTION_RESPONSE_DETAIL`    | Used to check the response of a transaction.     |

## Accepted currencies

| Currency | Description        |
|----------|--------------------|
| `ARS`    | Argentine Peso     |
| `BRL`    | Brazilian Real     |
| `CLP`    | Chilean Peso       |
| `COP`    | Colombian Peso     |
| `MXN`    | Mexican Peso       |
| `PEN`    | Peruvian Nuevo Sol |
| `USD`    | US Dollar          |

## Order status

| Status        | Description                                                     |
|---------------|-----------------------------------------------------------------|
| `NEW`         | The order was created in the system                             |
| `IN_PROGRESS` | The order is being processed.                                   |
| `AUTHORIZED`  | The last transaction of the order is an approved authorization. |
| `CAPTURED`    | The last transaction of the order is an approved capture.       |
| `CANCELLED`   | The last transaction of the order is an approved cancellation.  |
| `DECLINED`    | The last transaction of the order is declined.                  |
| `REFUNDED`    | The last transaction of the order is an approved refund.        |
| `CHARGEBACK`  | The last transaction of the order is a Chargeback. Namely, corresponds to a lost [Dispute]({{< ref "Disputes.md" >}}).       |

## Transaction states

| State       | Description                                                                                                 |
|-------------|-------------------------------------------------------------------------------------------------------------|
| `APPROVED`  | Approved transaction                                                                                        |
| `DECLINED`  | Rejected transaction                                                                                        |
| `ERROR`     | Error processing the transaction                                                                            |
| `EXPIRED`   | Expired transaction                                                                                         |
| `PENDING`   | Pending transaction or in validation                                                                        |
| `SUBMITTED` | Transaction sent to the financial institution but the processing did not finish.<br>query API. |

## Transaction types

| Type                        | Description                                                |
|-----------------------------|------------------------------------------------------------|
| `AUTHORIZATION`             | Authorization transaction.                                 |
| `AUTHORIZATION_AND_CAPTURE` | Charge transaction, Authorization and capture in one step. |
| `CAPTURE`                   | Capture Transaction.                                       |
| `VOID`                      | Cancellation transaction of an authorization.              |
| `REFUND`                    | Refund transaction or cancellation of a capture.           |

## Processing countries

| Country   | Description |
|-----------|-------------|
| `AR`      | Argentina   |
| `BR`      | Brazil      |
| `CL`      | Chile       |
| `CO`      | Colombia    |
| `MX`      | Mexico      |
| `PA`      | Panama      |
| `PE`      | Peru        |

## Supported Languages

| ISO code 639   | Language   |
|----------------|------------|
| `en`           | English    |
| `es`           | Spanish    |
| `pt`           | Portuguese |

## Document types

| ISO  | Description                                                                         | Country                |
|------|-------------------------------------------------------------------------------------|------------------------|
| CC   | Citizenship card.                                                                   | Colombia               |
| CE   | Foreign citizenship card.                                                           | Colombia, Peru         |
| CEL  | When identified by the mobile line.                                                 | Colombia               |
| CEP  | Electronic Payment Receipt                                                          | Mexico                 |
| CI   | Identity Card.                                                                      | Argentina, Chile       |
| CNPJ | National Register of Legal Entities                                                 | Brazil                 |
| CPF  | Registration of Individuals                                                         | Brazil                 |
| CUIL | Unique Labor Identification Code                                                    | Argentina              |
| CUIT | Single Tax identification                                                           | Argentina              |
| CURP | Unique Population Registry Code                                                     | Mexico                 |
| DE   | Foreing Identifiaction Number                                                       | Peru                   |
| DL   | Driver License                                                                      |                        |
| DNI  | National Identity Document                                                          | Argentina, Peru, Chile |
| DNIE | National Identity Document - Electronical                                           | Argentina, Peru, Chile |
| EIN  | Employer Identification Number                                                      | Peru                   |
| ID   | Identification                                                                      |                        |
| IDC  | Client´s unique identifier, in the case of unique customer / utility consumer ID's. |                        |
| IFE  | Federal Electoral Institute                                                         | Mexico                 |
| LC   | Civic Notebook                                                                      | Argentina              |
| LE   | Book enlistment                                                                     | Argentina              |
| NIF  | Tax identification number                                                           |                        |
| NIT  | Tax identification number                                                           | Colombia               |
| PP   | Passport.                                                                           |                        |
| RC   | Birth certificate.                                                                  | Colombia               |
| RDE  | RDE document type                                                                   |                        |
| RE   | RE document type                                                                    |                        |
| RFC  | Federal taxpayer registry                                                           | Mexico                 |
| RIF  | Tax Information Registry                                                            |                        |
| RM   | Commercial Register                                                                 |                        |
| RMC  | Consular Registration                                                               |                        |
| RNC  | National Taxpayers Registry                                                         |                        |
| RUC  | Unique Taxpayer Registration                                                        | Peru                   |
| RUN  | Unique National Role                                                                | Chile                  |
| RUT  | Unique Tributary Role                                                               | Chile                  |
| SC   | Safe Passage                                                                        |                        |
| SIEM | Mexican Business Information System                                                 | Mexico                 |
| SSN  | Social Security Number                                                              |                        |
| TI   | Identity Card.                                                                      | Colombia               |

## Banks for Payouts
Send the exact value displayed in the `Code` column in the variable `transfers[n].bankAccount.bankCode`. Refer to [Payouts]({{< ref "Payouts-API.md" >}}) for more information.

### Colombia

| Code      | Bank name                                         |
|-----------|---------------------------------------------------|
| `001`     | BOGOTA                                            |
| `002`     | POPULAR                                           |
| `006`     | ITAU CORPBANCA                                    |
| `007`     | BANCOLOMBIA                                       |
| `009`     | CITIBANK COLOMBIA                                 |
| `012`     | GNB SUDAMERIS                                     |
| `014`     | ITAU                                              |
| `013`     | BBVA                                              |
| `019`     | SCOTIABANK                                        |
| `023`     | BANCO DE OCCIDENTE                                |
| `031`     | BANCOLDEX                                         |
| `032`     | BCSC                                              |
| `040`     | BANCO AGRARIO                                     | 
| `041`     | JPMORGAN                                          |
| `042`     | BNP PARIBAS                                       |
| `047`     | MUNDOMUJER                                        |
| `051`     | DAVIVIENDA                                        |
| `052`     | AV VILLAS                                         |
| `053`     | BANCO WWB                                         |
| `059`     | BANCAMIA                                          |
| `060`     | PICHINCHA                                         |
| `061`     | BANCOOMEVA                                        |
| `062`     | FALABELLA                                         |
| `063`     | FINANDINA                                         |
| `065`     | BCO SANTANDER DE NEGOCIOS                         |
| `066`     | COOPCENTRAL                                       |
| `067`     | COOMPARTIR                                        |
| `069`     | BANCO SERFINANZA                                  |
| `070`     | LULO BANK                                         |
| `071`     | BANCO JP MORGAN COLOMBIA                          |
| `083`     | COMPENSAR                                         |
| `084`     | APORTES EN LINEA (GESTION Y CONTACTO)             |
| `086`     | ASOPAGOS                                          |
| `087`     | FEDECAJAS                                         |
| `088`     | SIMPLE                                            |
| `089`     | ENLACE OPERATIVO                                  |
| `090`     | CORFICOLOMBIANA                                   |
| `121`     | JURISCOOP                                         |
| `151`     | RAPPIPAY                                          |
| `283`     | COOPERATIVA FINANCIERA DE ANTIOQUIA               |
| `289`     | COTRAFA                                           |
| `292`     | CONFIAR COOPERATIVA FINANCIERA                    |
| `370`     | COLTEFINANCIERA S.A. - COMPANIA DE FINANCIAMIENTO |
| `507`     | NEQUI                                             |
| `550`     | DECEVAL                                           |
| `558 `    | CREDIFINANCIERA S.A.                              |
| `683`     | DGCPTN                                            |
| `685`     | DGCPTN-REGALIAS                                   |
| `801`     | MOVII                                             |
| `1062`    | BANCO FALABELLA S.A.                              |
| `1063`    | BANCO FINANDINA S.A.                              |
| `1069`    | BANCO SERFINANZA S.A.                             |
| `1283`    | COOPERATIVA FINANCIERA DE ANTIOQUIA               |
| `1291`    | COOFINEP                                          |
| `1292`    | CONFIAR COOPERATIVA FINANCIERA                    |
| `1303`    | GIROS Y FINANZAS                                  |
| `1637`    | IRIS                                              |
