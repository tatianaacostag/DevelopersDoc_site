---
title: "Disputes"
linkTitle: "Disputes"
date: 2021-11-18T13:40:06-05:00
type: docs
Description: >
   This module is a tool that you can find in the Administrative module to manage dispute processes generated in your PayU account. Find all necessary information and the steps to follow to validate performed charges.
weight: 26
---

{{% alert title="Note" color="warning"%}}
This article has been deprecated and it is not offered for new commerces.
{{% /alert %}}

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/contracargos-en.png)

{{% alert title="Note" color="info"%}}
Once a transaction is part of a dispute, the associated amount becomes part of the frozen balance, therefore you cannot transfer funds from this balance to your bank account until the dispute is resolved.
{{% /alert %}}

## What is a dispute?
A dispute begins when a buyer does not acknowledge to the bank a charge made to his credit card. Once the bank is notified, the formal process begins to determine the validity of the purchase.

## Motives of dispute
There are several reasons that can cause a purchaser to not acknowledge a charge on his credit card. The reasons for starting a dispute process may vary. Some of which have been identified are:
* _**Fraud**_: Disputes are classified as fraud when an unauthorized person made purchases with a credit card. This kind of dispute can happen if the card was lost or stolen.
* _**Not acknowledging payment**_: the brand or shop name which appears in the credit card statement is not recognized by the cardholder.
* _**Product not delivered**_: the cardholder states that he has not received the product or service covered by the charges made to his credit card.
* _**Product not acceptable**_: The cardholder claims not to have received the product or service under the expected conditions.
* Duplicate: The cardholder indicates that the charge made for the purchase of a product or service was applied more than once to his credit card.
* _**Amount does not match**_: The charge to the credit card does not match the value of the purchase.
* _**Not reported by the entity**_: On many occasions the bank or processing network initiates a dispute process without a specific reason.
 
## How does it work?

### 1. Dispute notification
When PayU is notified by the bank that a dispute process has been launched, you automatically will receive an email with the details of that process.

<div style="display: flex;">
  <div style="float: left;width: 50%;">
    <p style="text-align: center">Email that you receive when the dispute begins</p>
    <p><img src="https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/mail-notificacion-es.png" alt="PrintScreen"/></p>
  </div>
  <div style="float: left;width: 50%;">
    <p style="text-align: center">Email that your buyer receives</p>
    <p><img src="https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/mail-notificacioncomprador-en.png" alt="PrintScreen"/></p>
  </div>
</div>
<br>

We also send a POST with all the information of the dispute to any URL you may set on your administrative module. This way you can automate your dispute management processes to minimize the risk of a possible chargeback.

You can set the URL where we will make the notification in the administrative module by clicking on the _**settings**_ menu in the _**account setup**_ option, define the dispute notification url and enabling the notification box.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/disputas1-en.png)

### 2. Queries through the Administrative module
You can view and manage your dispute processes from your administrative module, in the _**Dispute**_ menu.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/disputas2-en.png)

### 3. Provide evidence
It is important to always respond to a dispute by providing evidence before the deadline stipulated by the bank. Following completion of the deadline, it will not be possible to upload the corresponding evidence for a dispute.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/disputas3-en.png)

To upload evidence that allows us to handle the difference with the bank or the processing network, you must click on the dispute, where you will see all the details of the process. You will find the _**Upload evidence**_ button there, select the files you think can be useful to contest the dispute and press the _**save**_ button.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/disputas4-en.png)

To minimize the likelihood that a chargeback is generated, you can provide the following evidence for a dispute to us:

* Proof of delivery of the product and / or service signed by the cardholder.
* Bill of sale of the product or service.
* Payment acceptance letter signed by the cardholder, annexing ID card of the same.
* Other media which validate the purchase.

{{% alert title="Note" color="info"%}}
You must check that the response deadline has not been met, in this case you will not be able to upload evidence.

| Country | Days given to provide evidences |
|---|---|
| Argentina | 5 work days |
| Brazil | 5 work days |
| Chile | 5 work days |
| Colombia | 2 work days |
| Mexico | 5 calendar days |
| Peru | 2 work days |
| Panama | 8 work days |

{{% /alert %}}

### 4. Final decision on dispute status.
Once the evidence is provided, we send the documents to the issuing bank or the network that processed the transaction, which oversees the resolution of the case. The case of dispute can be: won (without chargeback), lost (chargeback) or refund. In the case of refunds, the shop makes the return to the buyer and the bank does not create the chargeback.
When the bank announces the dispute’s outcome, the case is automatically updated in the administrative module and PayU sends a POST to the configured URL with information of the final result.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/mail-resultado-en.png)

## States according to the dispute’s course
When a dispute is reported, a dispute entity for the associated transaction is created.

The dispute status changes according to the point where it is within the course of the process.

States of a dispute:

| State | Description |
|---|---|
| Notified | When a dispute process begins, you must upload the evidence for the dispute. |
| In review | When the shop provides evidence for a dispute through the administrative module and the dispute comes under review by the bank. |
| Lost | The transaction is reversed from the virtual shopping account and may incur in a chargeback management cost. |
| Won | The dispute process is resolved in favor of the shop, there are no deductions of any kind. |
| Refunded | This process occurs when the shop authorizes to reverse the operation in self-determination, this prevents the shop from having to pay a chargeback transaction and it is replaced by a refund. To resolve a dispute as refund you have to request it at disputas@payulatam.com |

{{% alert title="Tips for managing your disputes" color="info"%}}
* If you have the cardholder’s data, the best way to manage a dispute process is contacting her. If the reason for the dispute is simple ignorance, you can ask the cardholder to call her bank to withdraw the complaint and so the dispute process is resolved in your favor, anyway you should provide any evidence you see fit from your administrative module.
* It is very important that the deadline for the answer is not over or you will not be able to upload any evidence, if you do not send the evidence in time, the chances that chargebacks are generated and the money in your PayU account is debited will increase.
* Files loaded in the evidence section should not be larger than 10MB. You can upload files such as .JPG .TIFF .GIF .PNG .PDF .DOC or .PPT.
{{% /alert %}}