---
title: "Push Payments"
linkTitle: "Push Payments"
date: 2021-07-16T11:32:55-05:00
description: >
  This feature allows you to create multiple and secure payments for third parties (users, merchants, providers, customers, etc.) using the funds you have in your PayU Account.
weight: 70
---

Push Payments is available under demand, and its activation depends on a security and risk analysis. For more information or requesting this service, contact your Sales Representative.

{{% alert title="Note" color="info"%}}
Currently, Push Payment is available in Colombia, Argentina, and Mexico.
{{% /alert %}}

## How do Push Payments work?
Through Push payments, you can request many payouts to many users easily. You only need to provide the amount to pay along with the information of each third party (such as name, identification, bank information, etc.), and PayU transfers the requested amount after validations.

<img src="/assets/PushPayments/PushPayments.png" style="display: block;margin-left: auto;margin-right: auto;"/>

Let’s explain Push payments using an example. A merchant offers products and services available for delivery; this merchant uses PayU as their payment platform and has an account where they collect the money paid from their customers. This merchant has many couriers to whom, they pay a fixed amount per delivery they made.

Each week, the merchant pays the amount earned to each courier. To do this, they can use push payments to pay directly from their PayU account instead of managing the payouts on their own, in which case, the merchants must transfer the money to their accounts or use funds from other sources.

To request the pay, the merchant sends the list of third parties they want to pay along with the amount of each one, PayU validates these third parties and schedules the payout. Once the payouts are processed (approved or denied) you and the third parties receive a notification about the status.

The amount of each payout plus the processing fee is deducted from your account. Contact your sales representative to know the processing fee to use this service.


### Push payment status
As with every transaction in PayU, a push payment moves between the following states:

* **REQUEST_BY_THE_MERCHANT**: this is the initial state of the transaction, once you send the list of third parties to be paid, the transaction takes this status.
* **IN_VALIDATION**: due to PayU policies, each payment may be subject to validation. This state indicates that your request must be reviewed under our internal policies. If the validation fails, the payment which didn't meet the policies is rejected.
* **IN_PAYU_PROCESS**: this state indicates that PayU has started the process payment.
* **AWAITING_BANK_SENT**: this state indicates that PayU has started the transfer of the amount to the third party.
* **IN_BANKING_PROCESS**: this state indicates that the payment is being processed in the third party's bank account.
* **CONFIRMED_BY_THE_BANK**: this state indicates that the third party has received the transferred amount.
* **REJECTED**: this state indicates that the transaction has been rejected either by PayU (due to policy breach) or the Bank (due to errors in the bank information).

The following diagram illustrates the status changing:

<img src="/assets/PushPayments/PushPaymentsSteps.png" width="60%" style="display: block;margin-left: auto;margin-right: auto;"/>

### Transaction validation
Every payment request is validated to verify that the person who will receive the money is not included in restricted lists. This validation may take up to 24 hours which may delay the payment procedure.

When a person must be verified, PayU checks first in the validation cache, so a person is only validated once during the cache frame.

If a person does not approve the validation, the payout is not performed and you are notified if you have configured the notifications of validation results.

## Considerations
Take into account the following considerations:

* Push payment allows local payouts only. The merchant may be international (under security and risk analysis) but they can only request local payouts using the funds collected in the processing country.<br>For example, if the merchant _ABC_ processes in Colombia and Peru, they can request payouts to third parties in Colombia using the funds collected in Colombia; they cannot request payouts to third parties in Peru using the funds collected in Colombia.
* The merchant must prove the relationship between them and their third parties to guarantee that the transaction is legit.
* For Gambling commerces, Push payments cannot be used to make refunds. Therefore, it is necessary to guarantee that the commerce is paying a prize.

## Transaction processing
Push payments uses ACH (**A**utomated **C**learing **H**ouse) transfers to send the payouts to the beneficiaries, this means that the transactions are processed in batch during the day. The time when the transaction will be processed is explained in the following table:

| *IN_BANKING_PROCESS* state time | ACH process time | Estimated time of response        |
|-----------------------------------|------------------|-----------------------------------|
| 05:31 p.m. - 07:20 a.m.           | 9:00 a.m.        | 7:55 p.m.                         |
| 07:21 a.m. - 09:45 a.m.           | 11:30 a.m.       | 10:40 a.m.<br>*Next working day*. |
| 09:46 a.m. - 12:30 p.m.           | 2:00 p.m.        | 1:45 p.m.<br>*Next working day*.  |
| 12:31 p.m. - 02:50 p.m.           | 4:00 p.m.        | 4:40 p.m.<br>*Next working day*.  |
| 02:59 p.m. - 04:20 p.m.           | 6:00 p.m.        | 6:20 p.m.<br>*Next working day*.  |

*Transactions that reaches **IN_BANKING_PROCESS** state after 4:20 p.m. will be processed in the next working day.*

{{% alert title="Note" color="info"%}}

Payout requests may not be in **IN_BANKING_PROCESS** state after you sent them, and depending on the validation of the beneficiary, it may take up to *24* hours.

{{% /alert %}}

## Notifications
When using Push Payments, you can create a WebHook to configure notifications on status changes. It is recommended to configure the WebHook before sending the Push Payment request when configuring notifications.

You can configure a WebHook for one of the following events:
* **Transfer creation**: sends a notification when a payout request is created.
* **Transfer update**: sends a notification when an update is requested for an existing payout.
* **Validation result**: sends a notification when the validation is completed with its result.

## What's next?
The integration with this feature fo is performed using [API integrations]({{< ref "#" >}}).