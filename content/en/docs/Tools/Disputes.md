---
title: "Disputes"
linkTitle: "Disputes"
date: 2021-04-12T08:34:58-05:00
description: >
  Using this tool, you can manage the dispute processes generated in your PayU account.
weight: 60
---

## What is a Dispute?
Your buyers can present a claim to its card issuing bank. The bank sends us a dispute notification, and we create the dispute in our system. This dispute froze the total amount of the sale in your PayU account.

## Why a dispute happens?
A buyer can claim to its card issuer bank reporting that they have not received a product, the product is deficient, or it does not meet the expected characteristics. The buyer also can disclaim the purchase of their credit card invoice.<br>
The reasons for starting a dispute process may vary, some of them are:
* **Fraud**: disputes are classified as fraud when an unauthorized person makes purchases with a credit card. These type of dispute can happen if the card was lost or stolen.
* **Not acknowledging payment**: the brand or shop name which appears in the credit card statement is not recognized by the cardholder.
* **Product not delivered**: the cardholder states that they don't received the product or service covered by the charges made to the credit card.
* **Product not acceptable**: the cardholder claims not to have received the product or service under the expected conditions.
* **Duplicate**: the cardholder indicates that the charge made for the purchase of a product or service was applied more than once to his credit card.
* **Amount does not match**: the charge to the credit card does not match with the value of the purchase.
* **Not reported by the entity**: the bank or processing network initiates a dispute process without a specific reason.

{{% alert title="Attention" color="warning"%}}

* Recall that PayU acts as an intermediary to let your commerce provide evidence in the dispute process between you and the bank entity. PayU has no interference on the result of the dispute, this decision depends on the issuing bank.
* Once a transaction is part of a dispute, the associated amount becomes part of the frozen balance; therefore, you cannot transfer funds from this balance to your bank account until the dispute is resolved.

{{% /alert %}} 

## How does the disputes process works in PayU?
The disputes process follows a simple flow:

### 1. Dispute notification
When a bank notifies PayU about a dispute, both you and your customer receives an e-mail notifying the start of the dispute process.

We also send a `POST` with all the information of the dispute to the URL you set in your PayU module. This way, you can automate your dispute management processes to minimize the risk of a possible chargeback.

You can configure the URL where we make the notification in the PayU module. Log in to [PayU.com](payu.com) and click the login option located at the top of the page. Alternatively, you can log in to https://merchants.payulatam.com/.

Click _**Settings**_ and then select _**Technical configuration**_.

![PrintScreen](/assets/IntegrationVariables_01.png)

In this window, go to _**Disputes**_ tab and define the dispute notification url and enable the notification box in the _**Automatic notification URL**_ field.

![PrintScreen](/assets/Disputes/Disputes_01.png)

Once you configured this, you automatically receive a POST with all the information of the started dispute process. Furthermore, You also receive a notification POST each time the dispute process has an update, so you can be aware of the progress and completion of this process.

### 2. Queries through the Administrative module
You can view and manage your dispute processes from your PayU module, in the _**Dispute**_ option inside the _**Transactions**_ menu.

![PrintScreen](/assets/Disputes/Disputes_02.png)

### 3. Provide evidence
It's important to always respond a dispute by providing evidence before the [deadline stipulated by the bank]({{< ref"disputes.md#maximum-days-to-provide-evidence" >}}). After the deadline date, you cannot upload the corresponding evidence for a dispute.

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

| Country   | Days to provide evidences |
|-----------|---------------------------|
| Argentina | 5 working days            |
| Brazil    | 12 working days           |
| Chile     | 5 working days            |
| Colombia  | 2 working days            |
| Mexico    | 12 calendar days          |
| Panama    | 8 working days            |
| Peru      | 6 working days            |

### 4. Final decision on dispute status.
Once the evidence is provided, we send the documents to the issuing bank or the network that processed the transaction, which oversees the resolution of the case. The result of dispute can be: won (without chargeback), lost (chargeback) or refunded. In the case of refunds, the shop makes the return to the buyer and the bank does not create the chargeback.

When the bank announces the dispute’s outcome, the case is automatically updated in the administrative module and PayU sends a POST to the configured URL with information of the final result.

## Dispute states
When a dispute is reported, a dispute entity for the associated transaction is created. The dispute status changes according to the step where the dispute is within the course of the process.

| State | Description |
|-|-|
| Notified | When the dispute process begins, you must upload the evidence for the dispute. |
| On Payment Network Review | When the shop provides evidence for a dispute through the PayU module and the dispute is reviewed by the bank or network. |
| Lost | The transaction is reversed from the virtual shopping account and may incur in a chargeback management cost. |
| Won | The dispute process is resolved in favor of the shop, there are no deductions of any kind. |
| Refunded | This process occurs when the shop authorizes to reverse the operation in self-determination, this prevents the shop from having to pay a chargeback transaction and it is replaced by a refund. |
| Expired | After past 120 days without a response from the bank, the amount is set to available for the merchant. |

{{% alert title="Note" color="info"%}}
If you have activated [Anti-fraud Guarantee]({{< ref"Antifraud-Guarantee.md" >}}), when the chargeback is subject to be covered by the guarantee, PayU assumes the values debited from your account. In this case, the status of this dispute is _Chargeback_ (Lost) _With antifraud guarantee_. 
{{% /alert %}}