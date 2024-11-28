---
title: "Disputes"
linkTitle: "Disputes"
date: 2021-04-12T08:34:58-05:00
description: >
  Find all the information about the dispute module. This tool found in your PayU module, allows you to manage the dispute processes generated in your PayU account.
weight: 60
tags: ["parenttopic"]
---

## What is a Dispute?
Your buyers can present a claim to their card issuing bank. The bank sends us a dispute notification to determine the validity of the purchase, and we create the dispute in our system. After we create the dispute, we notify you through the PayU Module.

The dispute freezes the total amount of the sale in your PayU account.

![Concepts](/assets/Disputes/Disputes_en.png)

## Why a dispute happens?
A buyer can claim to their card issuer bank reporting that they have not received a product, the product is deficient, or it does not meet the expected characteristics. The buyer also can disclaim the purchase of their credit card invoice.<br>
The reasons for starting a dispute process may vary, some of them are:
* **Fraud**: disputes are classified as fraud when an unauthorized person makes purchases with a credit card. These type of dispute can happen if the card was lost or stolen.
* **Not acknowledging payment**: the brand or shop name which appears in the credit card statement is not recognized by the cardholder.
* **Product not delivered**: the cardholder states that they don't received the product or service covered by the charges made to the credit card.
* **Product not acceptable**: the cardholder claims not to have received the product or service under the expected conditions.
* **Duplicate**: the cardholder indicates that the charge made for the purchase of a product or service was applied more than once to their credit card.
* **Amount does not match**: the charge to the credit card does not match with the value of the purchase.
* **Not reported by the entity**: the bank or processing network initiates a dispute process without a specific reason.

Not all the financial entities use the same mechanisms to notify a dispute; therefore, PayU cannot guarantee that you can always know the reasons of the dispute.

{{% alert title="Attention" color="warning"%}}

* Recall that PayU acts as an intermediary to let your commerce provide evidence in the dispute process between you and the bank entity. PayU has no interference on the result of the dispute, this decision depends on the issuing bank.
* Once a transaction is part of a dispute, the associated amount becomes part of the frozen balance; therefore, you cannot transfer funds from this balance to your bank account until the dispute is resolved.
* Your customers may claim a transaction up to **120 days** after the transaction date for local cards and **180 days** for international cards. These date are defined by the card franchises.

{{% /alert %}} 

## How does the disputes process works in PayU?
The disputes process follows a simple flow:

### 1. Dispute notification
When a bank or a processing network notifies PayU about the start of a dispute process due to a claim of your customer, you can consult all the information related to it in the [Disputes module]({{< ref"Disputes-MP.md" >}}) of the PayU Module.

If you have configured the notification e-mails in your [PayU module]({{< ref "Technical-configuration.md#disputes" >}}), you also receive the dispute information vía e-mail. Furthermore, when you have enabled the _**Automatic notification URL**_, we also send a `POST` notification. This way, you can automate your dispute management processes to minimize the risk of a possible chargeback.

You can configure the URL where we make the notification in the PayU module. Log in to [PayU.com](payu.com) and click the login option located at the top of the page. Alternatively, you can log in to https://merchants.payulatam.com/.

Click _**Settings**_ and then select _**Technical configuration**_.

![PrintScreen](/assets/IntegrationVariables_01.png)

In this window, go to _**Disputes**_ tab and define the dispute notification url and enable the notification box in the _**Automatic notification URL**_ field.

![PrintScreen](/assets/Disputes/Disputes_01.png)

Once you configured this, you automatically receive a POST with all the information of the started dispute process. Furthermore, You also receive a notification POST each time the dispute process has an update, so you can be aware of the progress and completion of this process.

### 2. Query through the PayU module
You can view and manage your dispute processes from your PayU module, in the _**Dispute**_ option inside the _**Transactions**_ menu.

![PrintScreen](/assets/Disputes/Disputes_02.png)

### 3. Provide evidence
It's important to always respond a dispute by providing evidence before the [deadline stipulated by the bank or the processing network]({{< ref"disputes.md#maximum-days-to-provide-evidence" >}}). After the deadline date, you cannot upload the corresponding evidence for a dispute.

To learn how to upload evidence to resolve the dispute, refer to the [PayU module]({{< ref"Disputes-MP.md" >}}).

#### What information can be useful?
* Full information of your customer (full name, identification number, e-mail, shipping address, visible credit card number, etc.)
* Proof of delivery of the product or service signed by the cardholder.
* Bill of sale of the product or service.
* Acceptance letter of the payment signed by the cardholder attaching their identification document.
* Cancellation and refund policy.
* Acceptance of terms and conditions.
* Transactional history of your customer (if any).
* Other supports that validate the purchase.

#### Maximum days to provide evidence
Recall that the maximum days to provide evidence for each country are: 

| Country   | Days to provide evidence  |
|-----------|---------------------------|
| Argentina | 5 working days            |
| Brazil    | 12 working days           |
| Chile     | 5 working days            |
| Colombia  | 2 working days            |
| Mexico    | 12 calendar days          |
| Panama    | 8 working days            |
| Peru      | 6 working days            |

### 4. Final decision on dispute status
Once the evidence is provided, we send the documents to the issuing bank or the network that processed the transaction, which oversees the resolution of the case. The result of dispute can be: won (without chargeback), lost (chargeback) or refunded. In the case of refunds, the shop makes the return to the buyer and the bank does not create the chargeback.

When the bank announces the dispute’s outcome, the case is automatically updated in the administrative module and PayU sends a POST to the configured URL with information of the final result.

## Dispute states
When a dispute is reported, a dispute entity for the associated transaction is created. The dispute status changes according to the step where the dispute is within the course of the process.

| State | Description |
|-|-|
| Notified | When the dispute process begins, you must upload the evidence for the dispute. |
| On Payment Network Review | When the shop provides evidence for a dispute through the PayU module and the dispute is reviewed by the bank or network. |
| Documents not provided | The deadline date to provide evidence has been reached and the commerce did not provide any documentation. |
| Lost | The transaction is reversed from the virtual shopping account and may incur in a chargeback management cost. |
| Won | The dispute process is resolved in favor of the shop, there are no deductions of any kind. |
| Expired | After past 120 days without a response from the bank, the amount is set to available for the merchant. |
| Refunded | This process occurs when the shop authorizes to reverse the operation in self-determination, this prevents the shop from having to pay a chargeback transaction and it is replaced by a refund. |

Below is a diagram illustrating the flow for handling payment disputes:

<div>
{{< disputes/Disputes_EN >}}
</div>

## Anti-fraud tips for your business
Fight against the digital fraud it's our duty!. Take into account the following tips:
1. Be wary of an increase in purchases or service requests higher than expected due to the nature of your business.
2. Be suspicious of purchases made with higher amounts than the average you receive in your commerce.
3. Verify if you have a higher purchase volume form a single client or requested to the same address.