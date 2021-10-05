---
title: "Payouts"
linkTitle: "Payouts"
date: 2021-07-16T11:32:55-05:00
description: >
  This feature allows you to create multiple and secure third party payouts (users, merchants, providers, customers, etc.) using the funds you have in your PayU Account.
weight: 70
draft: true
---

{{% alert title="Important" color="warning"%}}
PayU offers the Payouts service as an integration via API. It is not supported to register Payouts nor Third parties using the PayU module. Currently, Payouts is available in Colombia.
{{% /alert %}}

Payouts is an integration service available under demand, and its activation depends on a security and risk analysis. For more information or requesting this service, contact your Sales Representative.

## How do Payouts work?
Through Payouts, you can request many payments to many users easily. You only need to provide the amount to pay along with the information of each third party (such as name, identification, bank information, etc.), and PayU transfers the requested amount after validations.

<img src="/assets/PushPayments/PushPayments.png" width="70%" style="display: block;margin-left: auto;margin-right: auto;"/>

Let’s explain Payouts using an example. A merchant offers products and services available for delivery; this merchant uses PayU as their online payment platform and has an account where they collect the money paid from their customers. This merchant has many couriers to whom, they pay a fixed amount per delivery they made.

Each week, the merchant pays the amount earned to each courier. To do this, they can use Payouts to pay directly from their PayU account instead of managing the payments on their own, in which case, the merchants must transfer the money to their accounts or use funds from other sources.

To request the pay, the merchant sends the list of third parties they want to pay along with the amount of each one, PayU validates these third parties and schedules the payout.

The amount of each payout plus the processing fee is deducted from your account. Contact your sales representative to know the processing fee to use this service.

### Payout states
Payouts are performed in two main steps: the first step is when you request the payment to a third party. The second one is when the request has been approved and moves to the transfer of the funds.

The transactional procedure of Payouts has the following states.

* **AWAITING SANCTION SCREENING**: this state indicates that the third party to whom the payment will be made is subject to validation of restricted lists and further PayU policies related to risk analysis. If a third party does not pass this validation, the payment is automatically rejected.
* **AWAITING FOR SENT**: if the third party passes the validation or is not subject to it, this state indicates that the request is ready to be processed. In this state, the communication with the service has not been performed.
* **SENT TO CREATE**: this state indicates that the communication with the service has been completed and the Payout request is in creation process.
* **CREATED**: this state indicates that the request has been created and has become into a payout. When the request becomes a payout, it moves between the states explained in [Payout states]({{< ref "payouts.md#payout-states" >}}). The next state depends on the result of the payout process.
* **REJECTED**: this state indicates that the request has been rejected. A request can be rejected when:
  - The validation of the third party fails.
  - The creation of the payout was failed.
  - You request the cancellation of the Payout request and it has been approved. 
* **PROCESSING COMPLETED**: this state indicates that the Payout process has been completed.
* **AWAITING TO CANCEL**: this state indicates that you have requested the cancellation of a Payout request. Take into account that you can request the cancellation of a Payout request when this is not in Banking process.<br>In this state, the communication with the service has not been performed.
* **SENT FOR CANCELLATION**: this state indicates that the communication with the service has been completed and the Payout request is in cancellation process.
* **CANCELLATION FAILED**: this state indicates that the request of cancellation cannot be executed due to PayU policies or because the request is not being processed by PayU.

The following diagram illustrates the state changes:

<img src="/assets/PushPayments/PushPaymentsStates.png" width="80%" style="display: block;margin-left: auto;margin-right: auto;"/>

#### Payment order states
Once the Payout has been approved, it is transformed into a payment order. The following are the states of a payment order.

* **REQUEST_BY_THE_MERCHANT**: this is the initial state of the transaction, once you send the list of third parties to be paid and the third parties are approved, the transaction takes this state.
* **IN_VALIDATION**: due to PayU policies, each payment may be subject to validation. This state indicates that your request must be reviewed under our internal policies. If the validation fails, the payment which didn't meet the policies is rejected.
* **IN_PAYU_PROCESS**: this state indicates that PayU has started the process payment.
* **AWAITING_BANK_SENT**: this state indicates that PayU has started the transfer of the amount to the third party.
* **IN_BANKING_PROCESS**: this state indicates that the payment is being processed in the third party's bank account. At this point you cannot cancel the request nor update it.
* **CONFIRMED_BY_THE_BANK**: this state indicates that the third party has received the transferred amount.
* **REJECTED**: this state indicates that the transaction has been rejected either by PayU (due to policy breach) or the Bank (due to errors in the bank information).

The following diagram illustrates the state changes:

<img src="/assets/PushPayments/PushPaymentsSteps.png" width="60%" style="display: block;margin-left: auto;margin-right: auto;"/>

### Transaction validation
Every Payout request is validated to verify that the person who will receive the money is not included in restricted lists. This validation may take up to 24 hours which may delay the payment procedure.

When a person must be verified, PayU checks first in the validation cache, so a person is only validated once during the cache frame.

If a person does not approve the validation, the Payout is not performed and you are notified if you have configured the notifications of validation results.

## Considerations
Take into account the following considerations:

* Payout is not a service included by default. You must request it and sign an annex to the contract to agree the fee and further conditions. Contact your Key Account Manager to contract this service.
* Merchants are responsible for the integrity and the correctness of the third-party data. PayU does not validate that the data provided by the merchant is complete and correct. Furthermore, the update of data must be requested by the merchants.<br>PayU is not responsible for unsuccessful transactions due to wrong data.
* Payouts allows local payments only. The merchant may be international (under security and risk analysis) but they can only request payouts using the funds collected in the processing country.<br>For example, if the merchant _ABC_ processes in Colombia and Peru, they can request payouts to third parties in Colombia using the funds collected in Colombia; they cannot request payouts to third parties in Peru using the funds collected in Colombia.
* Once the payout is created, it takes the regular flow in PayU. This means that you can see the payout created in your PayU module. 
* The merchant must prove the relationship between them and their third parties to guarantee that the transaction is legit.
<!-- * For Gambling commerces, Payouts cannot be used to make refunds. Therefore, it is necessary to guarantee that the commerce is paying a prize. -->

## Transaction processing
Payouts uses ACH (**A**utomated **C**learing **H**ouse) transfers to send the payouts to the beneficiaries, this means that the transactions are processed in batch during the day. The time when the transaction will be processed is explained in the following table:

| *IN_BANKING_PROCESS* state time   | ACH process time | Estimated time of response        |
|:---------------------------------:|:----------------:|:---------------------------------:|
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
When using Payouts, you can create a WebHook to configure notifications on status changes. It is recommended to configure the WebHook before sending the Payout request when configuring notifications.

You can configure a WebHook for one or more of the following events:
* **Transfer creation**: sends a notification when a payout request is created.
* **Transfer update**: sends a notification when the sanction screening validation rejects the third party.
* **Validation result**: sends a notification when the third party has approved the sanction screening validation and when the transfer has been rejected by the bank.

To learn how to create WebHooks, refer to [this article]({{< ref "payouts-api.md#create-or-update-a-webhook" >}}).

### Variables in the notifications
The following variables are sent to the WebHook when third party has been rejected by the sanction screening validation.

| Variable                  | Format       | Description                                                           |
|---------------------------|--------------|-----------------------------------------------------------------------|
| `pushPaymentId`           | Alphanumeric | Id of the payout created.                                             |
| `creationDate`            | Numeric      | Date when the payout was created.<br>This date is in milliseconds.    |
| `value`                   | Numeric      | Amount requested to be transferred to the third party.                |
| `currency`                | Alphanumeric | Currency of the amount requested.                                     |
| `state`                   | Alphanumeric | Current [Payout state]({{< ref"#payout-states" >}}).                  |
| `status`                  | Alphanumeric | Current [Payment order state]({{< ref"#payment-order-states" >}}).    | 
| `errorCode`               | Alphanumeric | Error generated after the sanction screening validation.              |
| `errorMessage`            | Alphanumeric | Error message generated after the sanction screening validation.      |
| `supplierBankAccountId`   | Alphanumeric | Id of the third party's bank account generated by the payout request. |
| `fullName`                | Alphanumeric | Name of the third party of the payout.                                |
| `documentNumber`          | Numeric      | Document number of the third party of the payout.                     |
| `country`                 | Alphanumeric | Country of the third party of the payout.                             |
| `validationState`         | Alphanumeric | Result of the validation performed by PayU.                           |
| `dateOfTheNextValidation` | Numeric      | Date when the third party will be validated by sanction screening.<br>This date is in milliseconds. |

## What's next?
The integration with this feature fo is performed using [API integrations]({{< ref "payouts-api.html" >}}).