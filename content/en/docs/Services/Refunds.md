---
title: "Voids and Refunds"
linkTitle: "Void and Refunds"
date: 2021-03-26T15:09:39-05:00
description: >
  This feature allows you to request the cancellation or the refund of the transactions authorized or charged. You can create the refund request using the _Refund_ or _Void_ method according to the status of the transaction.
weight: 60
---

## Understanding concepts
Before moving on, let's explain the following concepts:
* *Void*: this operation reverses a previously authorized transaction.

* *Refund*: this operation requests the reversal of a previously captured transaction. Refunds can be requested by the total or the partial amount. A buyer may request a refund when they are not satisfied with the purchase, the purchase has multiple charges, or the buyer did not receive the product or service.

### Void
The `VOID` method cancels a previously authorized transaction. Void is automatic procedure, as soon as you send the `VOID` request, it does not follow any approval flow, and the transaction is not charged to the card holder.

{{% alert title="Note" color="info"%}}
`VOID` method is not available in Colombia and Panama.
{{% /alert%}}

### Refund
A refund is requested when a shop decides to voluntarily return the money spent by the shopper due to dissatisfaction reasons or when the shop does not have enough stock of the product purchased. The `REFUND` method request the reversal of a previously captured transaction.

Unlike the `VOID` method, this method requires an approval. The refund procedure is explained below:

1. When a refund is requested by your customer, you need to request it using the [PayU module]({{< ref "Refunds-MP.md">}}) or our integrations. The request requires the _Order Id_, and a refund reason.

2. Once you send the request, PayU reviews the request and approves or rejects it in one to three business days.

The `REFUND` has three states:

- `UNRESOLVED`: the request has been sent to PayU for approval. At this point, no transaction has been added to the order and when you consult it using the [Queries service]({{< ref "queries" >}} "Query Service"), the response only shows the transaction of the payment approval.
- `APPROVED`: the request has been approved by a PayU's customer service agent. At this point the order has changed its state to `REFUNDED` state and PayU adds an approved `REFUND` transaction to the order.
- `DECLINED`: the request does not meet the policies defined by PayU and was rejected. When the refund is declined, PayU adds a declined `REFUND` transaction to the order.

For more information about authorized and captured transactions, refer to [Payments]({{< ref "payments#payment-flows" >}}).

## Considerations
Before using either _VOID_ or _REFUND_ feature, take into account the following considerations:

* _Refund_ or _Void_ method are only available for transactions made with a credit card. If the request refers to a different payment means such as cash payment means, bank transfer; the request is declined by PayU.
* PayU only creates one application for each refund request, if a request is repeatedly posted for the same transaction, PayU indicates that the request is already registered.
* PayU only accepts refund requests of captured transactions.
* You can retry the refund request if this was previously declined.
* Once you make the request, the transaction amount becomes part of the Frozen Balance of your PayU account until it is processed. 
  - If your refund request is `APPROVED`, the amount is refunded to the card holder. 
  - If your refund request is `DECLINED`, the amount is released from the Frozen Balance and returns to the available Balance of your PayU account.
* Once the refund is approved, this will be reflected in the payer's credit card when the bank make it effective.
* To check the status of your refund request using the [Queries service]({{< ref "queries" >}} "Query Service") available for that purpose.

## What's next?
According to the processing country, some special conditions may apply to be able to execute voids or refunds. These conditions are explained in the selected integration type.

The integration with this feature can be performed using one of our integration types:

* [For API integrations, refer to this topic]({{< ref "Refunds-API.md" >}})
* [For SDK integrations, refer to this topic]({{< ref "RefundsSDK.md" >}})