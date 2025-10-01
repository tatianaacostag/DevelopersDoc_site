---
title: "Voids and Refunds API"
linkTitle: "Voids and Refunds API"
date: 2021-06-25T09:24:50-05:00
description: >
  The Voids and Refunds API allows you to cancel or refund transactions that have already been authorized or charged. Depending on the transaction status, you can submit a request using either the `VOID` or `REFUND` methods. 
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

Before using the Voids and Refunds API, keep in mind the following country-specific considerations.

<details id="argentina">
<summary><img src="/assets/Argentina.png" width="25px"/> &nbsp; <b>Argentina</b></summary>

| Voids | Refunds |
|-------|---------|
| <ul><li>Send the request within **14 days**; otherwise, the system automatically voids the transaction.</li></ul> | <ul><li>Request a refund **at least 10 minutes after approval** and up to **357 days** after the transaction.</li><li>Do not include decimal amounts in refunds.</li><li>You can request more than one partial refund for payments made through **AMEX, Mastercard, Naranja, or Visa**.</li><li>Once approved, PayU transfers the funds to the payer within **30 working days**.</li></ul> |

</details>

<details id="brazil">
<summary><img src="/assets/Brasil.png" width="25px"/> &nbsp; <b>Brazil</b></summary>

| Voids | Refunds |
|-------|---------|
| <ul><li>Send the request within **7 days**; otherwise, the system automatically voids the transaction.</li></ul> | <ul><li>Request a refund **at least 10 minutes after approval**.</li><li>For transactions made with **PIX**, request refunds up to **87 days** after the transaction.</li><li>For card transactions, request refunds up to **172 days** after the transaction.</li><li>You can request more than one partial refund for payments made through **AMEX, Elo, Mastercard, PIX, or Visa**.</li><li>Once approved, refunds for **PIX transactions** are processed **immediately**.</li><li>Once approved, refunds for **other payment methods** take up to **15 working days**.</li></ul> |

</details>

<details id="chile">
<summary><img src="/assets/Chile.png" width="25px"/> &nbsp; <b>Chile</b></summary>

| Voids | Refunds |
|-------|---------|
| <ul><li>Send the request within **3 hours after the transaction**; otherwise, the network does not authorize the void.</li><li>If the void is not accepted or no capture is sent within **7 days**, the system automatically voids the transaction.</li></ul> | <ul><li>Request a refund **at least 10 minutes after approval** and up to **327 days** after the transaction.</li><li>Refunds are also available for transactions processed through [WebPay Plus or Redcompra]({{< ref "Payments-API-chile.md#submit-transactions-using-debit-and-prepaid-cards" >}}).</li><li>For **prepaid card transactions not processed by WebPay Plus**: <ul><li>If you request a refund within the **first hour**, the financial network may approve or reject it.</li><li>If you request a refund **after the first hour**, the financial network automatically rejects it.</li></ul></li><li>If the financial network rejects a refund, PayU displays the corresponding [error code]({{< ref "Response-codes-and-variables.md#response-codes-for-transactions" >}}).</li><li>Do not include decimal amounts in refunds.</li><li>Once approved, the payer receives the funds within **8 to 20 working days**.</li><li>You can submit partial refunds for transactions with **installments**; PayU receives them online but processes them manually due to acquirer restrictions.</li><li>Follow minimum refund amounts required by the acquiring network: <ul><li>More than **10 CLP** for transactions processed by **TRANSBANK**.</li><li>More than **50 CLP** for transactions processed by **KLAP**.</li></ul></li><li>You can request more than one partial refund for payments made through **AMEX, Mastercard, or Visa**.</li></ul> |

</details>

<details id="colombia">
<summary><img src="/assets/Colombia.png" width="25px"/> &nbsp; <b>Colombia</b></summary>

| Voids | Refunds |
|----------|---------|
| <ul><li>Voids are available only when the **2-step flow** is enabled (AUTHORIZATION followed by CAPTURE). In this case, you can cancel an **authorization** before it is captured. This option is supported only for **Visa** and **MasterCard** transactions.</li></ul> | <ul><li>Request a refund **at least 10 minutes after approval** and up to **357 days** after the transaction.</li><li>The minimum refund amount is **100 COP**.</li><li>If you do not submit the refund request on the same day as the transaction capture (**before 9 PM UTC-5**), PayU processes it manually instead of attempting it online.</li><li>Once approved, the payer receives the funds within **15 working days**.</li><li>Request only **one partial refund per order**. If the customer asks for an additional refund, process it outside of PayU (e.g., through a gift card, discount, or bank transfer). You can also use our [Payouts API](https://developers.payulatam.com/latam/en/docs/integrations/api-integration/payouts-api.html) to send the amount directly from your PayU account balance. This option is only available under the aggregator model and requires requesting the customer’s bank account details each time. This is especially useful for Alternative Payment Methods such as **Efecty** or **PSE**.</li><li>Partial refunds for international credit cards are **not available**.</li><li>Partial refunds (only one per order) are available for payments made through **AMEX, Codensa, Diners, Mastercard, or Visa**.</li></ul> |

</details>

<details id="mexico">
<summary><img src="/assets/Mexico.png" width="25px"/> &nbsp; <b>Mexico</b></summary>

| Voids | Refunds |
|-------|---------|
| <ul><li>Send the request **at least 10 minutes after authorization** and up to **7 days**.</li><li>If you do not send a void or capture within this timeframe, the system automatically voids the transaction.</li></ul> | <ul><li>Request a refund **at least 10 minutes after approval**.</li><li>For most transactions, request refunds up to **175 days** after the transaction.</li><li>For transactions processed by **Bancomer**, request refunds up to **40 days** after the transaction.</li><li>Once approved, the payer receives the funds within **30 working days**.</li><li>Do not include decimal amounts in refunds.</li><li>You can request more than one partial refund for payments made through **AMEX, Mastercard, or Visa**.</li></ul> |

</details>

<details id="panama">
<summary><img src="/assets/Panama.png" width="25px"/> &nbsp; <b>Panama</b></summary>

| Voids | Refunds |
|-------|---------|
| <ul><li>The integration does not support voids for transactions in Panama.</li></ul> | <ul><li>Request a refund **at least 10 minutes after approval** and up to **357 days** after the transaction.</li><li>Once approved, the payer receives the funds within **8 working days**.</li></ul> |

</details>

<details id="peru">
<summary><img src="/assets/Peru.png" width="25px"/> &nbsp; <b>Peru</b></summary>

| Voids | Refunds |
|-------|---------|
| <ul><li>Follow the maximum timeframe allowed by each payment network:</li><ul><li>**Visa**: **21 days** → If you do not send a void or capture, the system auto-captures the transaction.</li><li>**Mastercard**: **28 days** → If you do not send a void or capture, the system auto-captures the transaction.</li><li>**American Express**: **30 days** → If you do not send a void or capture, the system auto-voids the transaction.</li><li>**Diners**: **11 days** → If you do not send a void or capture, the system auto-voids the transaction.</li></ul></ul> | <ul><li>Request a refund **at least 10 minutes after approval** and up to **357 days** after the transaction.</li><li>Request partial refunds only for transactions **without installments** (including single-installment transactions).</li><li>For **Visanet transactions**, send partial refunds **at least one day after the transaction**.</li><li>The minimum refund amount is **1 USD or 1 PEN**.</li><li>You can request more than one partial refund for payments made through **AMEX, Diners, Mastercard (credit or debit), or Visa (credit or debit)**.</li><li>Once approved, the payer receives the funds within **15 to 25 working days**.</li></ul> |

</details>

## Void

The `VOID` method cancels a previously authorized transaction. This is an **automatic process**—as soon as the system submits a `VOID` request, it does not follow any approval flow, and the integration will not charge the transaction to the cardholder.

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

As mentioned earlier, refund requests go through an approval process. PayU usually takes 1 to 3 days to review and either approve or reject the request. You can check the refund status using one of the following methods:

#### Checking the Status via the PayU Management Panel

1. Log in to the PayU Management Panel. In the left menu, expand the **Transactions** tab and select **Sales Report**.

   ![PrintScreen](/assets/Refunds/Refunds_en_01.png)

2. Use the **Filter my sales** field to search for the order using the order ID or transaction ID.

   <img src="/assets/Refunds/Refunds_en_02.png" alt="PrintScreen" width="50%"/><br>

3. Check the **Status** column to see whether the refund is approved, rejected, or still pending.

   ![PrintScreen](/assets/Refunds/Refunds_en_03.png)

#### Checking the Status via the Queries API

You can also check the refund status using the [Queries API]({{< ref "Queries-API.md" >}}). To do so, send a request with the **order ID**.

When you query an order, the system returns the most recent transaction associated with it.

The response can indicate one of three statuses:

- **Unresolved Request**: The refund request is still under review. The order shows a `CAPTURED` status (`result.payload.status` in the response).  
  - The first transaction type is `AUTHORIZATION_AND_CAPTURE` (`result.transactions.type` in the response).  
  - The first transaction status is `APPROVED` (`result.transactions.transactionResponse.state` in the response).

- **Approved**: A PayU customer service agent approved the refund request. The order shows a `REFUNDED` status (`result.payload.status` in the response).  
  - The first transaction type is `REFUND` (`result.transactions.type` in the response).  
  - The first transaction status is `APPROVED` (`result.transactions.transactionResponse.state` in the response).

- **Declined**:  A PayU customer service agent rejected the refund request. The order shows a `CAPTURED` status (`result.payload.status` in the response).  
  - The first transaction type is `REFUND` (`result.transactions.type` in the response).  
  - The first transaction status is `DECLINED` (`result.transactions.transactionResponse.state` in the response).

### Handling Pending Refunds with the PayU Cancellations Module

This section will guide you on how to track the final status of a refund that you initiated through the PayU Cancellations Module, especially when you are relying on the Queries API for updates.

#### Manual Cancellations Module and Pending Refund Updates

When you request a refund through the Voids and Refunds API, PayU submits the request to the payment network. If the network rejects the refund, PayU initially returns a `PENDING` status in the `paymentResponse.transactionResponse.state` field.

In this scenario, PayU automatically activates the **Cancellations Module** to retry the refund. This process may involve multiple attempts, each generating a new refund ID, until a final status is reached. This mechanism improves refund success rates and reduces the need for merchants to submit multiple manual attempts.

To confirm whether the refund request submitted through the Voids and Refunds API has reached a final status (`APPROVED` or `DECLINED`), you should:

- Query its status using the [Queries API](https://developers.payulatam.com/latam/en/docs/integrations/api-integration/queries-api.html) (by order ID), or
- Wait for a notification via your configured webhook (`notifyUrl` for API integrations or the [Confirmation Page](https://developers.payulatam.com/latam/en/docs/integrations/webcheckout-integration/confirmation-page.html) for WebCheckout).

{{% alert title="Notes" color="info"%}}

* If you do not want PayU to manage your refunds through the Cancellations Module, contact your account manager to disable this service. In that case, you will always receive the direct network response without PayU retries.
* In many countries, up to 99% of refunds processed via the Cancellations Module are approved. For partial refunds, the approval rate can reach 97%.

{{% /alert %}}

#### Identifying the Final Refund Status in the Queries API

To distinguish between your initial refund request and the attempts generated by the PayU Cancellations Module, use the **order ID** in the Queries API and check the following fields:

- `result > payload > status` – General order status (`REFUNDED` if the full amount was refunded; `CAPTURED` may indicate partial refunds).
- `result > payload > transactions[] > id` – Refund transaction ID.
- `result > payload > transactions[] > type` – Transaction type (`REFUND` or `PARTIAL_REFUND`).
- `result > payload > transactions[] > source` – Source (`EMPTY` = online refunds, `CANCELLATIONS_MODULE` = retries via PayU Cancellations Module).
- `result > payload > transactions[] > transactionResponse > state` – Refund status (`PENDING`, `APPROVED`, `DECLINED`).
- `result > payload > transactions[] > transactionResponse > operationDate` – Date and time when the refund was generated.
- `result > payload > transactions[] > additionalValues > TX_VALUE > value` – Refund amount.
- `result > payload > transactions[] > extraParameters > MANUAL_REFUND` – Indicates how the refund was processed (absent, `TRUE`, or `FALSE`).

##### Rules for Updating Refund Status

Follow these rules when updating your system:

| `MANUAL_REFUND` | Refund status | Meaning | Recommended action |
|---|---|---|---|
| Absent | `PENDING` | Initial refund in process | Do not update |
| Absent | `DECLINED` | Initial request rejected; Cancellations Module activated | Do not update |
| `FALSE` | `APPROVED` | Refund processed automatically by the Cancellations Module | Update status |
| `FALSE` | `DECLINED` | Refund attempt failed via the Cancellations Module | Do not update |
| `TRUE` | `APPROVED` or `DECLINED`| Refund finalized via the Cancellations Module | Update status |

##### Additional Considerations

- If the final status is `DECLINED` after the Cancellations Module operation, you may submit a new refund request via the Refunds API. When doing so, avoid updating based on previous transaction attempts — use `operationDate` and `TX_VALUE` to track the correct refund attempt.  
- Always register **one refund record per API request** in your system, even if the Cancellations Module created multiple transactions.  
- Update your refund record **only when a final status is reached**, following the rules above.

#### Identifying the Final Refund Status via Webhook

PayU also notifies you of the final refund status through your configured **webhook** (`notifyUrl` for API integrations or [Confirmation Page](https://developers.payulatam.com/latam/en/docs/integrations/webcheckout-integration/confirmation-page.html) for WebCheckout).

##### Webhook Logic

- If the refund request status is `APPROVED` or `DECLINED`, PayU immediately sends a webhook notification.  
- If the refund status is initially `PENDING`, no webhook is sent until a final status (`APPROVED` or `DECLINED`) is reached.  

##### Webhook Update Rules

- If the initial status is `PENDING`, **do not update** the refund until you receive the webhook.  
- Once the webhook arrives, update the refund status accordingly (`APPROVED` or `DECLINED`).  
- Use at least the following fields from the payload to identify the refund correctly:  
  - `transaction_type` – Transaction type  
  - `value` – Refund amount  
  - `response_message_pol` – Response message  
  - `transaction_date` – Date and time of the transaction  

##### Webhook Considerations

Unlike the Queries API, the webhook only notifies you once the refund reaches a **final status**. No notifications are sent for intermediate attempts (`PENDING`) or retries within the Cancellations Module.

For this reason, we recommend implementing the webhook if you have not already done so. It allows you to update refund statuses automatically without applying the manual validation rules required for the Queries API.

This behavior applies when the following account settings are enabled:
- **Allow reversal transactions with pending state:** Off  
- **Activate pending response for voids and refunds:** On
