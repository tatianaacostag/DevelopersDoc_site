---
title: "Voids and Refunds"
linkTitle: "Void and Refunds"
date: 2021-03-26T15:09:39-05:00
description: >
  This feature allows you to request the cancellation or the refund of the transactions paid with credit cards. A buyer may request a refund when they are not satisfied with the purchase, the purchase has multiple charges, or the buyer did not receive the product or service.
weight: 60
---

You can create the refund request using the _Refund_ or _Void_ method. Once you have created the request, a PayU customer service agent validates the information and the justification of the request to approve it and perform the refund, or deny it if it does not meet the requirements.
Additionally, you can check the status of your refund request using the [Queries service]({{< ref "queries" >}} "Query Service") available for that purpose.

## Understanding concepts
Before moving on, let's explain the following concepts:
* *Void*: this operation reverses a previously authorized transaction.

* *Refund*: this operation requests the reversal of a previously captured transaction. Refunds can be requested by the total or the partial amount.

### Void
The ```VOID``` method cancels a previously authorized transaction. The void of an order can be total or partial depending on if the acquirer supports partial voids.

Void is automatic procedure. As soon as you send the ```VOID``` request, it does not follow any approval flow, and the transaction is not charged to the card holder.

{{% alert title="Note" color="info"%}}
```VOID``` method is not available in Colombia and Panama.
{{% /alert%}}

### Refund
A refund is requested when a shop decides to voluntarily return the money spent by the shopper due to dissatisfaction reasons or when the shop does not have enough stock of the product purchased. The ```REFUND``` method request the reversal of a previously captured transaction.

Unlike the ```VOID``` method, this method requires an approval. The refund procedure is explained below:

1. When a refund is requested by your customer, you need to request it using the PayU module or the API or SDK integration. The request requires the _Order Id_, and a refund reason.

2. Once you send the request, PayU reviews the request and approves or rejects it in one to three business days.

The ```REFUND``` has three states:

- ```UNRESOLVED```: the request has been sent to PayU for approval. At this point, no transaction has been added to the order and when you consult it using the [Queries service]({{< ref "queries" >}} "Query Service"), the response only shows the transaction of the payment approval.
- ```APPROVED```:  the request has been approved by a PayU's customer service agent. At this point the order has changed its state to ```CANCELLED``` or ```REFUNDED```state and a PayU adds a ```REFUND``` transaction to the order with approved state.
- ```DECLINED```: the request does not meet the policies defined by PayU and was cancelled by an agent. when the refund is declined, PayU adds a ```REFUND``` transaction to the order with declined state.

For more information about authorized and captured transactions, refer to [Payments]({{< ref "payments#transaction-processing" >}}).

## Considerations
Before using either _VOID_ or _REFUND_ feature, take into account the following considerations:

* _Refund_ or _Void_ method are only available for transactions made with a credit card. If the request refers to a different payment means such as cash payment means, bank transfer; the request is declined by PayU´s customer service agent.
* PayU only creates one application for each refund request, if a request is repeatedly posted for the same transaction, PayU indicates that the request is already registered.
* PayU only accepts refund requests of transactions in the ```Captured``` state.
* You can retry the refund request if this was previously declined.
* Once you make the request, the transaction amount becomes part of the Frozen Balance of your PayU account until it is processed. 
  - If your refund request is ```APPROVED```, the amount is refunded to the card holder. 
  - If your refund request is ```DECLINED```, the amount is released from the Frozen Balance and returns to the available Balance of your PayU account.
* Once the refund is approved, this will be reflected in the payer's credit card when the bank make it effective.

## What's next?
The integration with this feature can be performed using one of our integration types:

* [For API integrations, refer to this topic]({{< ref "Queries-API.md" >}})
* [For SDK integrations, refer to this topic]({{< ref "SDK Integration" >}})