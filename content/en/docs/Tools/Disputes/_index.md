---
title: "Disputes"
linkTitle: "Disputes"
date: 2021-04-12T08:34:58-05:00
description: >
   This section provides an overview of the disputes mechanism within PayU. 
weight: 60
tags: ["parenttopic"]
---

* For detailed instructions on handling disputes through your PayU account's Management Panel, refer to the <a href="https://developers.payulatam.com/latam/en/payu-module-documentation/payu-operations/disputes-mp.html" target="_blank">Disputes Module</a> documentation. 

* For technical information about the notifications system, refer to the <a href="https://developers.payulatam.com/latam/es/docs/tools/disputes/disputes-webhook.html" target="_blank">Disputes Webhook</a> documentation.

## Overview of Disputes

Disputes arise when buyers file claims with their card-issuing banks regarding transactions. The bank notifies PayU of the dispute, and we create a corresponding record in our system. Afterward, we notify you based on the notification method you chose.

The following diagram illustrates the flow of the disputes process in PayU, outlining each step from notification to resolution.
<br>

{{< disputes/disputes_flow >}}

### Common Reasons for Disputes

Buyers may dispute transactions for various reasons, including non-receipt of goods, defective products, or unauthorized charges. Here are the typical dispute reasons:  

- **Fraud**: Transactions made without authorization, often due to a lost or stolen card.  
- **Unrecognized Payment**: The cardholder does not recognize the merchant’s name on their statement.  
- **Product Not Delivered**: The product or service was not received.  
- **Unsatisfactory Product**: The product or service did not meet expectations.  
- **Duplicate Charges**: The cardholder was charged multiple times for the same transaction.  
- **Amount Mismatch**: The charge does not match the purchase value.  
- **Unspecified**: Disputes initiated by banks without a clear reason.  

{{% alert title="Important" color="warning"%}}

* Notification methods for disputes vary between financial entities, PayU cannot guarantee that entities will always provide reasons.
* PayU acts solely as an intermediary to help merchants submit evidence in disputes. The final decision lies with the issuing bank.
* Disputed amounts are frozen and unavailable for transfer until resolution.
* Buyers may dispute transactions within **120 days** for local cards and **180 days** for international cards.

{{% /alert %}} 

## Managing Disputes with PayU

The disputes process follows a structured flow, which you can manage directly through the Management Panel in your PayU account. For more details, refer to the <a href="https://developers.payulatam.com/latam/en/payu-module-documentation/payu-operations/disputes-mp.html" target="_blank">Disputes Module</a>.

### 1. Dispute Notification

PayU will notify you based on the notification method that you configured in the Disputes module, where you can also check the dispute's details.

### 2. Dispute Details Review

Use the Management Panel to view and manage your ongoing disputes.

### 3. Evidence Submission

Respond to disputes by submitting the required evidence through the Disputes module before the deadline set by the bank or processing network. After the deadline, you won't be able to upload evidence for that dispute.

#### Useful Evidence

- Customer details (name, ID, email, shipping address, card number, etc.).  
- Proof of delivery signed by the cardholder.  
- Sales receipts or invoices.  
- Acceptance of terms, conditions, or payments signed by the cardholder.  
- Refund and cancellation policies.  
- Transactional history.  
- Any other supporting documents. 

#### Deadlines for Submitting Evidence

The maximum days for evidence submission vary by country: 

| Country   | Days to Submit Evidence  |
|-----------|--------------------------|
| Argentina | 5 working days           |
| Brazil    | 12 working days          |
| Chile     | 5 working days           |
| Colombia  | 2 working days           |
| Mexico    | 12 calendar days         |
| Panama    | 8 working days           |
| Peru      | 6 working days           |

### 4. Resolution and Final Decision

Once you submit the evidence, our integration forwards it to the bank or processing network for review. Outcomes may include:  
- **Won**: The banking entity resolves the dispute in your favor, with no deductions.  
- **Lost**: The banking entity issues a chargeback, and associated costs may apply.  
- **Refunded**: You voluntarily refund the buyer.

Your PayU account's Management Panel will update the dispute status based on the resolution and the system will notify you.

## Dispute States

Each dispute follows a series of states throughout the process:

| State                   | Description                                                                 |
|-------------------------|-----------------------------------------------------------------------------|
| **Notified**            | Initial state where evidence must be submitted.                            |
| **Under Review**        | Evidence is being reviewed by the bank or network.                         |
| **No Evidence Provided**| The merchant missed the deadline for submitting evidence.                  |
| **Lost**                | The dispute was resolved in favor of the buyer, resulting in a chargeback. |
| **Won**                 | The dispute was resolved in favor of the merchant.                         |
| **Expired**             | After 120 days without a bank response, funds are released.                |
| **Refunded**            | The merchant authorized a refund, avoiding a chargeback.                   |

Below is a diagram illustrating the dispute resolution process:

<div>
{{< disputes/Disputes_EN >}}
</div>

## Anti-Fraud Tips

Protect your business from fraud by following these tips:
1. Monitor sudden increases in purchase volumes or unusually high transaction amounts.  
2. Watch for multiple purchases from a single customer or to the same address.  
3. Implement strict verification processes for large or unusual transactions.