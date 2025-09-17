---
title: "Voids and Refunds API"
linkTitle: "Voids and Refunds API"
date: 2021-06-25T09:24:50-05:00
description: >
  The Voids and Refunds API allows you to cancel or refund transactions that have been authorized or charged. Depending on the transaction status, you can submit a request using either the `Void` or `Refund` methods. 
weight: 50
tags: ["subtopic"]
---

{{% alert title="Note" color="info"%}}

To integrate with the Voids and Refunds API, direct your requests to the appropriate environment URL:

* Test: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Production: ```https://api.payulatam.com/payments-api/4.0/service.cgi```

{{% /alert %}}

For a deeper understanding of voids and refunds, including key concepts and considerations, refer to [this document]({{< ref "Refunds.md" >}}).

## Considerations per Country

Before using the Voids and Refunds API, keep the following country-specific considerations in mind.

### Argentina

- A void request must be sent within **14 days**; otherwise, the transaction is automatically voided.
- Refunds can be requested **at least 10 minutes after approval** and up to **357 days** after the transaction.
- Refunds with decimal amounts are **not supported**.
- Once a refund is approved, the payer receives the funds **within 30 working days**.

### Brazil

- A void request must be sent within **7 days**; otherwise, the transaction is canceled.
- Refunds can be requested **at least 10 minutes after approval** and up to:
  - **87 days** for transactions made with PIX.
  - **172 days** for card transactions.
- Multiple **partial refunds** are supported for PIX transactions.
- Once approved:
  - Refunds for **PIX transactions** are processed **immediately**.
  - Refunds for **other payment methods** take up to **15 working days**.

### Chile

- Due to network restrictions, a **void request** can only be authorized **within 3 hours after the transaction**. If the void is not accepted or no capture is sent within **7 days**, the transaction is automatically voided.
- Refunds can be requested **at least 10 minutes after approval** and up to **327 days**.  
- Refunds are available for transactions processed through [WebPay Plus or Redcompra]({{< ref "Payments-API-chile.md#submit-transactions-using-debit-and-prepaid-cards" >}}).
- For **prepaid card transactions not processed by WebPay Plus**:
  - Refunds requested **within the first hour** may be **approved or rejected** by the financial network.
  - Refunds requested **after the first hour** are **automatically rejected**.
- If a refund is rejected, PayU displays the corresponding [error code]({{< ref "Response-codes-and-variables.md#response-codes-for-transactions" >}}).
- Refunds with decimal amounts are **not supported**.
- Once a refund is approved, the payer receives the funds **within 8 to 20 working days**.
- **Partial refunds** for transactions with **installments** are received online but processed manually due to acquirer restrictions.
- The minimum refund amount depends on the acquiring network:
    - **More than 10 CLP** for transactions processed by the **TRANSBANK** network.
    - **More than 50 CLP** for transactions processed by the **KLAP** network.

### Colombia

- **Voids are not supported**.
- Refunds can be requested **at least 10 minutes after approval** and up to **357 days**.
- The minimum refund amount is **100 COP**.
- If a refund request is **not submitted on the same day** as the transaction capture (**before 9 PM UTC-5**), it is **manually processed** instead of being attempted online.
- Once a refund is approved, the payer receives the funds **within 30 working days**.
- **Only one partial refund is allowed per order**. If a customer requests an additional refund, the merchant must process it outside of PayU, for example through a gift card, discount, or bank transfer. You can also use our [Payouts API](https://developers.payulatam.com/latam/en/docs/integrations/api-integration/payouts-api.html) to send the amount directly from your PayU account balance. This is especially useful for Alternative Payment Methods such as Efecty or PSE. Please note that you will need to request the customer’s bank account details each time. This option is only available under the aggregator model.
- **Partial refunds are not available** for international credit cards.

### Mexico

- A void request must be sent **at least 10 minutes after authorization** and up to **7 days**. If no void or capture is sent within the timeframe, the transaction is automatically voided.
- Refunds can be requested **at least 10 minutes after approval** and up to:
  - **175 days** for most transactions.
  - **40 days** if processed by **Bancomer**.
- Once a refund is approved, the payer receives the funds **within 30 working days**.
- Refunds with decimal amounts are **not supported**.

### Panama

- **Voids are not supported**.
- Refunds can be requested **at least 10 minutes after approval** and up to **357 days**.
- Once a refund is approved, the payer receives the funds **within 8 working days**.

### Peru

- The maximum timeframe to void an authorization depends on the payment network:
  - **Visa**: **21 days** → If no void or capture is sent, the transaction is **auto-captured**.
  - **Mastercard**: **28 days** → If no void or capture is sent, the transaction is **auto-captured**.
  - **American Express**: **30 days** → If no void or capture is sent, the transaction is **auto-voided**.
  - **Diners**: **11 days** → If no void or capture is sent, the transaction is **auto-voided**.
- Refunds can be requested **at least 10 minutes after approval** and up to **357 days**.
- **Partial refunds** are supported for transactions **without installments** (including transactions with a single installment).
- **Partial refunds with Visanet** must be sent **at least one day after the transaction**.
- Once a refund is approved, the payer receives the funds **within 15 to 25 working days**.
- The minimum refund amount is **1 USD or 1 PEN**.

## Void

The `VOID` method cancels a previously authorized transaction. This is an **automatic process**—as soon as the `VOID` request is sent, it does not follow any approval flow, and the transaction is **not charged** to the cardholder.

### Parameters for Request and Response

<details>

<summary>Request</summary>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|------------|---------|------|-------------|:---------:|
| `language` | Alphanumeric | 2 | Language used in the request. This determines the language of error messages. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| `command` | Alphanumeric | Max: 32 | Set to `SUBMIT_TRANSACTION`. | Yes |
| `test` (JSON)<br>`isTest` (XML) | Boolean | — | Set to `true` for test mode; otherwise, `false`. | Yes |
| `merchant` | Object | — | Contains authentication data. | Yes |
| `merchant > apiLogin` | Alphanumeric | Min: 12, Max: 32 | User or login provided by PayU. [How to get API Login]({{< ref "integrations.html#api-key-and-api-login" >}}). | Yes |
| `merchant > apiKey` | Alphanumeric | Min: 6, Max: 32 | Password provided by PayU. [How to get API Key]({{< ref "integrations.html#api-key-and-api-login" >}}). | Yes |
| `transaction` | Object | — | Contains transaction data. | Yes |
| `transaction > order` | Object | — | Contains order details. | Yes |
| `transaction > order > id` | Number | — | ID of the order to be voided. | Yes |
| `transaction > type` | Alphanumeric | 32 | Set to `VOID` to cancel an authorized transaction. | Yes |
| `transaction > reason` | Alphanumeric | — | Reason for voiding the transaction. | No |
| `transaction > parentTransactionId` | Alphanumeric | 36 | ID of the transaction to be voided. | Yes |

</details>

<details>

<summary>Response</summary>

<br>

<div class="variables"></div>

| Field Name | Format | Size | Description |
|------------|---------|------|-------------|
| `code` | Alphanumeric | — | Response code of the transaction. Possible values: `ERROR`, `SUCCESS`. |
| `error` | Alphanumeric | Max: 2048 | Error message when the response code is `ERROR`. |
| `transactionResponse` | Object | — | Contains response details. |
| `transactionResponse > orderId` | Number | — | The generated or existing order ID in PayU. |
| `transactionResponse > transactionId` | Alphanumeric | 36 | PayU transaction ID. |
| `transactionResponse > state` | Alphanumeric | Max: 32 | Status of the transaction. |
| `transactionResponse > paymentNetworkResponseCode` | Alphanumeric | Max: 255 | Response code from the financial network. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alphanumeric | Max: 255 | Error message from the financial network. |
| `transactionResponse > trazabilityCode` | Alphanumeric | Max: 32 | Traceability code from the financial network. |
| `transactionResponse > authorizationCode` | Alphanumeric | Max: 12 | Authorization code from the financial network. |
| `transactionResponse > responseCode` | Alphanumeric | Max: 64 | Response code related to the transaction status. |
| `transactionResponse > responseMessage` | Alphanumeric | Max: 2048 | Message related to the response code. |
| `transactionResponse > operationDate` | Date | — | Date when the response was generated in the PayU system. |

</details>

### API Call

The following examples show the request and response bodies for this transaction type.

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

**Response Example:**

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
         <id>1400462466</id>
      </order>
      <type>VOID</type>
      <parentTransactionId>50876ad6-46f2-4c8d-bb91-2f028b56ccb8</parentTransactionId>
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

A refund is issued when a merchant voluntarily returns the payment to the shopper. This can happen due to **customer dissatisfaction** or when the product is **out of stock**. The `REFUND` method reverses a previously captured transaction.

Refunds can be issued for the **full amount** or as a **partial refund** (`PARTIAL_REFUND`).

### Parameters for Request and Response

<details>
<summary>Request</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description | Mandatory |
|------------|---------|------|-------------|:---------:|
| `language` | Alphanumeric | 2 | Language used in the request. This determines the language of error messages. [See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Yes |
| `command` | Alphanumeric | Max: 32 | Set to `SUBMIT_TRANSACTION`. | Yes |
| `test` (JSON)<br>`isTest` (XML) | Boolean | — | Set to `true` for test mode; otherwise, `false`. | Yes |
| `merchant` | Object | — | Contains authentication data. | Yes |
| `merchant > apiLogin` | Alphanumeric | Min: 12, Max: 32 | User or login provided by PayU. [How to get API Login]({{< ref "integrations.html#api-key-and-api-login" >}}). | Yes |
| `merchant > apiKey` | Alphanumeric | Min: 6, Max: 32 | Password provided by PayU. [How to get API Key]({{< ref "integrations.html#api-key-and-api-login" >}}). | Yes |
| `transaction` | Object | — | Contains transaction data. | Yes |
| `transaction > additionalValues` | Object | — | Specifies the amount for a partial refund. **Required for partial refunds**. | No |
| `transaction > additionalValues > TX_VALUE` | Object | — | Contains the transaction amount details. **Required for partial refunds**. | No |
| `transaction > additionalValues > TX_VALUE > value` | Number | Max: 19 | Amount to be refunded. **Required for partial refunds**. | No |
| `transaction > additionalValues > TX_VALUE > currency` | Alphanumeric | 3 | ISO currency code. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). **Required for partial refunds**. | No |
| `transaction > order` | Object | — | Contains order details. | Yes |
| `transaction > order > id` | Number | — | ID of the order to be refunded. | Yes |
| `transaction > type` | Alphanumeric | 32 | Specifies the type of refund:<br>- `REFUND` for full refunds.<br>- `PARTIAL_REFUND` for partial refunds (if supported). | Yes |
| `transaction > reason` | Alphanumeric | — | Reason for issuing the refund. | No |
| `transaction > parentTransactionId` | Alphanumeric | 36 | ID of the original transaction being refunded. | Yes |

</details>

<details>
<summary>Response</summary>
<br>
<div class="variables"></div>

| Field Name | Format | Size | Description |
|------------|---------|------|-------------|
| `code` | Alphanumeric | — | Response code for the transaction. Possible values: `ERROR`, `SUCCESS`. |
| `error` | Alphanumeric | Max: 2048 | Error message when the response code is `ERROR`. |
| `transactionResponse` | Object | — | Contains response details. |
| `transactionResponse > orderId` | Number | — | The generated or existing order ID in PayU. |
| `transactionResponse > transactionId` | Alphanumeric | 36 | PayU transaction ID. |
| `transactionResponse > state` | Alphanumeric | Max: 32 | Transaction status. |
| `transactionResponse > paymentNetworkResponseCode` | Alphanumeric | Max: 255 | Response code from the financial network. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alphanumeric | Max: 255 | Error message from the financial network. |
| `transactionResponse > trazabilityCode` | Alphanumeric | Max: 32 | Traceability code from the financial network. |
| `transactionResponse > authorizationCode` | Alphanumeric | Max: 12 | Authorization code from the financial network. |
| `transactionResponse > responseCode` | Alphanumeric | Max: 64 | Response code associated with the transaction status. |
| `transactionResponse > responseMessage` | Alphanumeric | Max: 2048 | Message associated with the response code. |
| `transactionResponse > operationDate` | Date | — | Date when the response was generated in the PayU system. |

</details>

### API Call

The following examples show the request and response bodies for this transaction type.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Refund Request Example:**

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

**Partial Refund Request Example:**

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

**Response Example:**

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

**Refund Request Example:**

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

**Partial Refund Request Example:**

```XML
<request>
   <command>SUBMIT_TRANSACTION</command>
   <language>es</language>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <additionalValues>
         <entry>
            <string>TX_VALUE</string>
            <additionalValue>
               <value>950</value>
               <currency>ARS</currency>
            </additionalValue>
         </entry>
      </additionalValues>
      <order>
         <id>1400462690</id>
      </order>
      <parentTransactionId>0486359b-a048-4b6b-9b72-af584e710e64</parentTransactionId>
      <reason>Reason for requesting the refund or cancellation of the transaction</reason>
      <type>PARTIAL_REFUND</type>
   </transaction>
</request>
```

<br>

**Response Example:**

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

### Querying the Refund Status

As mentioned earlier, refund requests go through an approval process where PayU takes between 1 to 3 days to process and either approve or reject the request. You can check the status of a refund using one of the following methods:

#### Checking the Status via the PayU Management Panel

1. Log in to your PayU module account. In the left panel, expand the **Transactions** menu and select **Sales Report**.

   ![PrintScreen](/assets/Refunds/Refunds_en_01.png)

2. Use the **Filter my sales** field to search for the order using the order ID or transaction ID.

   <img src="/assets/Refunds/Refunds_en_02.png" alt="PrintScreen" width="50%"/><br>

3. The **Status** column indicates whether the refund has been approved, rejected or if it is pending.

   ![PrintScreen](/assets/Refunds/Refunds_en_03.png)

#### Checking the Status via the Queries API

You can also check the refund status using the [Queries API]({{< ref "Queries-API.md" >}}). To do so, send a request containing the **order ID**.

When querying an order, the system returns the latest transaction associated with it.

The response can indicate one of three possible statuses:

- **Unresolved Request**: If the refund request is still under review, the order appears with a `CAPTURED` status (`result.payload.status` in the response).  
  - The first transaction type is `AUTHORIZATION_AND_CAPTURE` (`result.transactions.type` in the response).  
  - The first transaction status is `APPROVED` (`result.transactions.transactionResponse.state` in the response).

- **Approved**: If the refund request is approved by a PayU customer service agent, the order appears with a `REFUNDED` status (`result.payload.status` in the response).  
  - The first transaction type is `REFUND` (`result.transactions.type` in the response).  
  - The first transaction status is `APPROVED` (`result.transactions.transactionResponse.state` in the response).

- **Declined**: If the refund request is rejected by a PayU customer service agent, the order appears with a `CAPTURED` status (`result.payload.status` in the response).  
  - The first transaction type is `REFUND` (`result.transactions.type` in the response).  
  - The first transaction status is `DECLINED` (`result.transactions.transactionResponse.state` in the response).
