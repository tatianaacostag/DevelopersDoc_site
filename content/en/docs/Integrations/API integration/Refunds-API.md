---
title: "Voids and Refunds API"
linkTitle: "Voids and Refunds API"
date: 2021-06-25T09:24:50-05:00
description: >
  This feature allows you to request the cancellation or the refund of the transactions authorized or charged. You can create the refund request using the _Refund_ or _Void_ method according to the status of the transaction. 
weight: 50
tags: ["subtopic"]
---

To integrate with Voids and Refunds API, target your request to the following URLs according to your environment.

{{% alert title="URL" color="info"%}}
* Test: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Production: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

If you need to understand the concepts and read further considerations of Voids and Refunds, refer to [this article]({{< ref "Refunds.md" >}}).

## Considerations per country
Before using Voids and Refunds API, take into account the following considerations.

### Argentina
* The maximum time to send a void is 14 days. If no void or capture is sent after this time, the transaction is auto-voided.
* The minimum time to send a refund is 10 minutes after the approval and the maximum is 357 days.
* Refunds with decimals are not supported.
* When a refund is approved, the payer gets the money back in maximum 30 working days.

### Brazil
* The maximum time to send a void is seven (7) days. If no void or capture is sent after this time, the transaction is cancelled.
* The minimum time to send a refund is 10 minutes after the approval and the maximum is:
   - 87 days for transactions with PIX.
   - 172 days for card transactions.
* The integration supports multiple partial refunds for PIX.
* When a refund is approved for transactions with PIX, the payer gets the money immediately. Otherwise, they get the money back in maximum 15 working days.

### Chile
* Due to network restrictions, void can be authorized within the first three hours after the authorization. If the void is not accepted or no capture is sent after seven (7) days, the transaction is auto-voided.
* The minimum time to send a refund is 10 minutes after the approval and the maximum is 327 days. If the transaction was processed by KLAP, the maximum time is 172 days.
* Refunds are available for transactions processed through [WebPay Plus or Redcompra]({{< ref "Payments-API-chile.md#submit-transactions-using-debit-and-prepaid-cards" >}}).
* For transactions prepaid cards not processed by WebPay Plus, Refunds requested during the first hour after their charge can be approved or rejected by the financial network. After the first hour, all the refund for transactions with prepaid cards are rejected.
* If the refund is rejected, PayU shows the [error code]({{< ref "Response-codes-and-variables.md#response-codes-for-transactions" >}}) generated by the network.
* Refunds with decimals are not supported.
* When a refund is approved, the payer gets the money back in 8 to 20 working days.
* Partial refunds for transactions using installments are received online but PayU processes them manually due to acquirer restrictions.
* The minimum amount to send a refund is 10 CLP.

### Colombia
* Voids are not supported.
* The minimum time to send a refund is 10 minutes after the approval and the maximum is 357 days.
* Minimum amount to send the refund is 100 COP.
* If refund is not sent the same day in which the transaction was captured (before 9 pm UTC-5) the refund goes immediately to a manual process without sending the online attempt.
* When a refund is approved, the payer gets the money back in maximum 30 working days.
* Partial refunds are not available for international credit cards.

### Mexico
* The minimum time to send a void is 10 minutes after the authorization and the maximum is 30 days. If the transaction was made with American Express, the maximum time is seven (7) days. If no void or capture is sent after this time, the transaction is auto-voided.
* The minimum time to send a refund is 10 minutes after the approval and the maximum is 175 days. If the transaction was processed by Bancomer, the maximum time is 40 days.
* When a refund is approved, the payer gets the money back in 30 working days.
* Refunds with decimals are not supported.

### Panama
* Voids are not supported.
* The minimum time to send a refund is 10 minutes after the approval and the maximum is 357 days.
* When a refund is approved, the payer gets the money back in maximum 8 working days.

### Peru
* The maximum days to void an authorization are: 
    - Visa: 21 days. If no void or capture is sent after this time, the transaction is auto-captured.
    - Mastercard: 28 days. If no void or capture is sent after this time, the transaction is auto-captured.
    - American Express: 30 days. If no void or capture is sent after this time, the transaction is auto-voided.
    - Diners: 11 days. If no void or capture is sent after this time, the transaction is auto-voided.
* The minimum time to send a refund is 10 minutes after the approval and the maximum is 357 days.
* Partial refunds are supported for transactions without installments. Recall that transactions with one installment are considered as without installments.
* Partial refunds with visanet must be sent after one day.
* When a refund is approved, the payer gets the money back in 15 to 25 working days.
* Minimum amount to send the Refund is 1 USD or 1 PEN.

## Void
The `VOID` method cancels a previously authorized transaction. Void is automatic procedure, as soon as you send the `VOID` request, it does not follow any approval flow, and the transaction is not charged to the card holder.

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
| transaction > order > id | Number |  | Identifier of the order to be voided. | Yes |
| transaction > type | Alphanumeric | 32 | Set `VOID` to perform a void of an authorized transaction.</li></ul> | Yes |
| transaction > reason | Alphanumeric |  | Provide the reason to void an authorized transaction. | No |
| transaction > parentTransactionId | Alphanumeric | 36 | Identifier of the transaction to be voided. | Yes |

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
| transactionResponse > paymentNetworkResponseCode | Alphanumeric | Max:255 | The response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alphanumeric | Max:255 | The error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alphanumeric | Max:32 | The traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alphanumeric | Max:12 | The authorization code returned by the financial network. |
| transactionResponse > responseCode | Alphanumeric | Max:64 | The response code associated with the status. |
| transactionResponse > responseMessage | Alphanumeric | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date |  | Creation date of the response in the PayU´s system. |

</details>

### API Call
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
         "id": "1400462414"
      },
      "type": "VOID",
      "reason": "Reason for requesting the void of the transaction",
      "parentTransactionId": "c8ec8737-7645-4756-a991-6e60a99eb4d9"
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
        "orderId": 1400462414,
        "transactionId": "57546e0a-8275-48e3-af11-7d3dc7420bfe",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "49263990",
        "authorizationCode": "NPS-011111",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "APROBADA - Autorizada",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624880273010,
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
         <id>1400462466</id>
      </order>
      <type>VOID</type>
      <parentTransactionId>50876ad6-46f2-4c8d-bb91-2f028b56ccb8</parentTransactionId>
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
        <orderId>1400462466</orderId>
        <transactionId>5fbb1ab0-3d2e-448f-a0be-b0bcfb5501ae</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>0</paymentNetworkResponseCode>
        <trazabilityCode>49263990</trazabilityCode>
        <authorizationCode>NPS-011111</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>APROBADA - Autorizada</responseMessage>
        <operationDate>2021-06-28T06:57:44</operationDate>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Refunds
A refund is requested when a shop decides to voluntarily return the money spent by the shopper due to dissatisfaction reasons or when the shop does not have enough stock of the product purchased. The `REFUND` method request the reversal of a previously captured transaction.

Refunds can be requested by the total or the partial amount (`PARTIAL REFUND`).

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
| transaction > additionalValues > |  | 64 | Amount of the partial refund. This parameter and its values are mandatory when you want to perform a partial refund | No |
| transaction > additionalValues > TX_VALUE | Alphanumeric | 64 | Amount of the transaction. Mandatory for partial refunds | No |
| transaction > additionalValues > TX_VALUE > value | Number | 19 | Specifies the amount of the transaction. Mandatory for partial refunds | No |
| transaction > additionalValues > TX_VALUE > currency | Alphanumeric | 3 | ISO code of the currency. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). Mandatory for partial refunds | No |
| transaction > order |  |  | This object has the order data. | Yes |
| transaction > order > id | Number |  | Identifier of the order to be refunded. | Yes |
| transaction > type | Alphanumeric | 32 | Set this value according to the transaction you want:<br><ul style="margin-bottom: initial;"><li>`REFUND`</li><li>`PARTIAL_REFUND` for partial refunds (if supported).</li></ul> | Yes |
| transaction > reason | Alphanumeric |  | Provide the reason to refund an authorized transaction. | No |
| transaction > parentTransactionId | Alphanumeric | 36 | Identifier of the transaction to be refunded. | Yes |

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
| transactionResponse > paymentNetworkResponseCode | Alphanumeric | Max:255 | The response code returned by the financial network. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alphanumeric | Max:255 | The error message returned by the financial network. |
| transactionResponse > trazabilityCode | Alphanumeric | Max:32 | The traceability code returned by the financial network. |
| transactionResponse > authorizationCode | Alphanumeric | Max:12 | The authorization code returned by the financial network. |
| transactionResponse > responseCode | Alphanumeric | Max:64 | The response code associated with the status. |
| transactionResponse > responseMessage | Alphanumeric | Max:2048 | Message associated with the response code. |
| transactionResponse > operationDate | Date |  | Creation date of the response in the PayU´s system. |

</details>

### API Call
The following are the request and response bodies for this transaction type.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Refund Request body:
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
         "id": "1400462687"
      },
      "type": "REFUND",
      "reason": "Reason for requesting the refund of the transaction",
      "parentTransactionId": "60e2080d-08b1-4db2-a54f-8bcbe8271662"
   },
   "test": false
}
```
<br>

Partial refund Request body:
```JSON
{  
   "command":"SUBMIT_TRANSACTION",
   "language":"es",
   "merchant":{  
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
      "apiLogin": "pRRXKOl8ikMmt9u"
   },
   "transaction":{  
      "additionalValues":{  
         "TX_VALUE":{  
            "value":"950",
            "currency":"ARS"
         }
      },
      "order":{  
         "id":"1400462690"
      },
      "parentTransactionId":"0486359b-a048-4b6b-9b72-af584e710e64",
      "reason":"Reason for requesting the refund or cancellation of the transaction",
      "type":"PARTIAL_REFUND"
   }
}
```
<br>

Response body:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400462690,
        "transactionId": null,
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": null,
        "authorizationCode": null,
        "pendingReason": "PENDING_REVIEW",
        "responseCode": null,
        "errorCode": null,
        "responseMessage": "1400462690",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": null,
        "referenceQuestionnaire": null,
        "extraParameters": null,
        "additionalInfo": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Refund Request body:
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
         <id>1400462689</id>
      </order>
      <type>REFUND</type>
      <reason>Reason for requesting the refund of the transaction.</reason>
      <parentTransactionId>1d31ea44-0d8f-4e65-93ac-6be4347e5b40</parentTransactionId>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Partial refund Request body:
```XML
<request>
   <language>es</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <additionalValues>
         <entry>
            <string>TX_VALUE</string>
            <additionalValue>
               <value>100</value>
               <currency>ARS</currency>
            </additionalValue>
         </entry>
      </additionalValues>
      <order>
         <id>1400462691</id>
      </order>
      <type>REFUND</type>
      <reason>Reason for requesting the refund of the transaction.</reason>
      <parentTransactionId>976d0411-8d0f-46e7-b5fe-515dad9a41ee</parentTransactionId>
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
        <orderId>1400462691</orderId>
        <transactionId>6cef020a-8006-4744-b7f9-d9a343807297</transactionId>
        <state>PENDING</state>
        <pendingReason>PENDING_REVIEW</pendingReason>
        <responseMessage>1400462690</responseMessage>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Query the refund status
As mentioned before, refund request follows an approval in flow in which, PayU take 1 to 3 days to process the request and approves or rejects the request. If you want to know the status of the refund, you have two options:

#### Check status through the PayU Module
1. Log into you PayU module account. In the left panel, expand the _**Transactions**_ menu and select _**Sales Report**_ option.

![PrintScreen](/assets/Refunds/Refunds_en_01.png)

2. Use the _**Filter my sales**_ field to find the order using the order and the transaction id.

<img src="/assets/Refunds/Refunds_en_02.png" alt="PrintScreen" width="50%"/><br>

3. The Status column show whether the refund has been approved or rejected; if the refund has not been approved, this column shows that the refund has been requested.

![PrintScreen](/assets/Refunds/Refunds_en_03.png)

#### Check status using queries
You can consult the state of the refund by using the [Queries API]({{< ref "Queries-API.md" >}}). In the request of the query, you need to send the order id.

When query an order, the system returns the last transaction associated with the Order.

There are three possible status in the response of your request:
* **Unresolved request**: if the request has not been resolved, the order found in the query appears in `CAPTURED` status (parameter `result.payload.status` in the response), the first transaction type is `AUTHORIZATION_AND_CAPTURE` (parameter `result.transactions.type` in the response) and the first transaction status is `APPROVED` (First parameter `result.transactions.transactionResponse.state` in the response).
* **Approved**: if the refund request is approved by a PayU’s customer service agent, the order found in the query appears in `REFUNDED` status (parameter `result.payload.status` in the response), the first transaction type is `REFUND` (parameter `result.transactions.type` in the response) and the first transaction status is `APPROVED` (First parameter `result.transactions.transactionResponse.state` in the response).
* **Declined**: if the refund request is declined by a PayU’s customer service agent, the order found in the query appears in `CAPTURED` status (parameter `result.payload.status` in the response), the first transaction type is `REFUND` (parameter `result.transactions.type` in the response) and the first transaction status is `DECLINED` (First parameter `result.transactions.transactionResponse.state` in the response).