---
title: "Disputes Webhook"
linkTitle: "Disputes Webhook"
date: 2024-11-25T08:34:58-05:00
description: >
  This document explains the purpose of the disputes webhook and the structure of the notifications and data sent.
weight: 70
tags: ["subtopic"]
---

## What is the Disputes Webhook?

PayU provides merchants with a webhook notification system to streamline the handling of disputes. This webhook acts as a communication channel between PayU and the merchant, delivering real-time notifications whenever a dispute is raised or updated for a transaction, including their status, reason, and other relevant data. This facilitates a timely response to disputes and allows merchants to efficiently manage their cases.

{{% alert title="Note" color="info" %}}

To learn how to configure the URL for receiving dispute notifications, visit the <a href="https://developers.payulatam.com/latam/en/payu-module-documentation/payu-operations/disputes-mp.html" target="_blank">Disputes section</a>.

{{% /alert %}}

## Webhook Payload Parameters

| **Field** | **Description** |
|---|---|
| **properties > state**         | State of the dispute. Possible values: `DOCUMENTS_NOT_PRESENTED`, `EXPIRED`, `LOST`, `NOTIFIED`, `ON_PAYMENT_NETWORK_REVIEW`, `ON_REVIEW`, `REFUNDED`, `WON`. Refer to [Dispute States](https://developers.payulatam.com/latam/en/docs/tools/disputes.html#dispute-states). |
| **properties > reopenDate**    | Reopen date of the transaction in epoch format, if applicable. |
| **properties > maxDeliveryDate** | Maximum delivery date in epoch format. |
| **properties > reference**     | Merchant reference used to identify the order. |
| **properties > creationDate**  | Creation date of the transaction in epoch format. |
| **properties > isFrozen**      | Indicates if the transaction is frozen. |
| **properties > comment**       | Additional comments regarding the dispute. |
| **properties > origin**        | Origin of the dispute. Possible values: `PAP`, `BANK`. |
| **properties > deliveryDate**  | Delivery date of the dispute, if applicable. |
| **properties > fee**           | Fee associated with the dispute. |
| **properties > currency**      | Currency of the transaction. |
| **properties > reason**        | Reason for the dispute or the state of the transaction. Possible values: `UNFREEZE_FUNDS`, `PRODUCT_UNACCEPTABLE`, `UNRECOGNIZED_PAYMENT`, `NOT_REPORTED_BY_ENTITY`, `PRODUCT_NOT_DELIVERED`, `DUPLICATED`, `FRAUD`, `AMOUNT_DOES_NOT_CORRESPOND`. |
| **properties > buyerIpAddress** | Buyer's IP address. |
| **properties > isAnalyzed**    | Indicates if the transaction has been analyzed. Possible values: `true`, `false`. |
| **properties > value**         | Value of the transaction in the transaction's currency. |
| **properties > notificationDate** | Notification date of the transaction in epoch timestamp format. |
| **id**                         | Unique identifier of the dispute. |
| **transactionId**              | Unique identifier of the purchase transaction. |
| **orderId**                    | Unique identifier of the order. |
| **lease**                      | Lease or lock date of the dispute in epoch format. |
| **valueInOriginalCurrency**    | Value of the transaction in its original currency. |
| **originalCurrency**           | Original currency of the transaction. |
| **fee**                        | Fee associated with the dispute. |
| **antifraudGuarantee**         | Indicates if an antifraud guarantee is applied. |
| **reason**                     | Reason for the dispute. Same possible values as the `properties > reason` field. |
| **evidenceSentToNetwork**      | Indicates if evidence has been sent to the network. |
| **notificationDate**           | Notification date of the dispute in epoch format. |
| **maxDeliveryDate**            | Maximum delivery date in epoch format. |
| **deliveryDate**               | Delivery date of the dispute, if applicable. |
| **reference**                  | Merchant reference to identify the order. |
| **creationDate**               | Creation date of the dispute in epoch format. |
| **frozen**                     | Indicates if the transaction amount is frozen in PayU's available balance. Possible values: `true`, `false`. |
| **wonBank**                    | Indicates if the bank won the dispute. Possible values: `true`, `false`. |
| **analyzed**                   | Indicates if the dispute has been analyzed. Possible values: `true`, `false`. |
| **reopenDate**                 | Reopen date of the dispute in epoch timestamp format, if applicable. |
| **origin**                     | Origin of the dispute. Possible values: `BANK`. |
| **buyerIpAddress**             | Buyer's IP address. |
| **currency**                   | Currency of the dispute. |
| **comment**                    | Additional comments about the dispute. |
| **state**                      | Current state of the dispute. Same possible values as the `properties > state` field. |
| **value**                      | Transaction value in the applicable currency. |
| **childProperties**            | Additional properties of the dispute, if applicable. |

## Payload Examples

Below are examples of the payloads PayU sends to the webhook URL configured by the merchant in the Administration Panel.

### `NOTIFIED` Payload Example

```JSON
{
  "properties": {
    "state": "NOTIFIED",
    "reopenDate": null,
    "maxDeliveryDate": 1645564263486,
    "reference": "Test PayU: CO Lady 2022-2-8 16:10:8",
    "creationDate": 1644354663461,
    "isFrozen": true,
    "comment": "",
    "origin": "BANK",
    "deliveryDate": null,
    "fee": 0,
    "currency": "COP",
    "reason": "FRAUD",
    "buyerIpAddress": null,
    "isAnalyzed": false,
    "value": 2000,
    "notificationDate": 1644354663461
  },
  "id": "8fc5faf9-9fcf-4bf1-878a-bf7691187909",
  "transactionId": "4387b27f-8970-4418-9b74-6515ec89febd",
  "orderId": 1403033521,
  "lease": 1644355263920,
  "valueInOriginalCurrency": 2000,
  "originalCurrency": "COP",
  "antifraudGuarantee": null,
  "reason": "FRAUD",
  "evidenceSentToNetwork": null,
  "notificationDate": 1644354663461,
  "maxDeliveryDate": 1645564263486,
  "deliveryDate": null,
  "fee": 0,
  "frozen": true,
  "creationDate": 1644354663461,
  "reference": "Test PayU: CO Lady 2022-2-8 16:10:8",
  "origin": "BANK",
  "reopenDate": null,
  "analyzed": false,
  "wonBank": null,
  "buyerIpAddress": null,
  "currency": "COP",
  "comment": "",
  "state": "NOTIFIED",
  "value": 2000,
  "childProperties": null
}
```

### `LOST` Payload Example

```JSON
{
  "properties": {
    "state": "LOST",
    "reopenDate": null,
    "maxDeliveryDate": 1631735892386,
    "reference": "PayU_Auth_Capt_undefined_2021-9-1T14:57:27",
    "creationDate": 1630526292368,
    "isFrozen": false,
    "comment": null,
    "origin": "BANK",
    "deliveryDate": null,
    "fee": 0,
    "currency": "COP",
    "reason": "AMOUNT_DOES_NOT_CORRESPOND",
    "buyerIpAddress": "127.0.0.1",
    "isAnalyzed": false,
    "value": 30000,
    "notificationDate": 1630526292368
  },
  "id": "64d13669-bd0e-4655-be91-25d44979f467",
  "transactionId": "1420d700-1586-43a8-88a5-76a339c97ec0",
  "orderId": 1400887092,
  "lease": 1630526892469,
  "valueInOriginalCurrency": 30000,
  "originalCurrency": "COP",
  "fee": 0,
  "antifraudGuarantee": null,
  "reason": "AMOUNT_DOES_NOT_CORRESPOND",
  "evidenceSentToNetwork": null,
  "notificationDate": 1630526292368,
  "maxDeliveryDate": 1631735892386,
  "deliveryDate": null,
  "reference": "PayU_Auth_Capt_undefined_2021-9-1T14:57:27",
  "creationDate": 1630526292368,
  "frozen": false,
  "wonBank": null,
  "analyzed": false,
  "reopenDate": null,
  "origin": "BANK",
  "buyerIpAddress": "127.0.0.1",
  "currency": "COP",
  "comment": null,
  "state": "LOST",
  "value": 30000,
  "childProperties": null
}
```

### `WON` Payload Example

```JSON
{
  "properties": {
    "state": "WON",
    "reopenDate": null,
    "maxDeliveryDate": 1645564263486,
    "reference": "Test PayU: CO Lady 2022-2-8 16:10:8",
    "isWonByBank": true,
    "creationDate": 1644354663461,
    "isFrozen": false,
    "comment": "",
    "origin": "BANK",
    "deliveryDate": null,
    "fee": 0,
    "currency": "COP",
    "reason": "FRAUD",
    "buyerIpAddress": null,
    "isAnalyzed": false,
    "value": 2000,
    "notificationDate": 1644354663461
  },
  "id": "8fc5faf9-9fcf-4bf1-878a-bf7691187909",
  "transactionId": "4387b27f-8970-4418-9b74-6515ec89febd",
  "orderId": 1403033521,
  "lease": 1644355483727,
  "valueInOriginalCurrency": 2000,
  "originalCurrency": "COP",
  "antifraudGuarantee": null,
  "reason": "FRAUD",
  "evidenceSentToNetwork": null,
  "notificationDate": 1644354663461,
  "maxDeliveryDate": 1645564263486,
  "deliveryDate": null,
  "fee": 0,
  "frozen": false,
  "creationDate": 1644354663461,
  "reference": "Test PayU: CO Lady 2022-2-8 16:10:8",
  "origin": "BANK",
  "reopenDate": null,
  "analyzed": false,
  "wonBank": true,
  "buyerIpAddress": null,
  "currency": "COP",
  "comment": "",
  "state": "WON",
  "value": 2000,
  "childProperties": null
}
```