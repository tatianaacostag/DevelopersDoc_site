---
title: "Payments"
linkTitle: "Payments"
date: 2021-03-25T14:28:20-05:00
description: >
  Payments feature lets your shop process different transaction types with multiple payment methods.
weight: 10
---

Regardless of the [integration type]({{< ref "integrations" >}}) you choose, PayU provides operations to process your transactions. The following section explains these methods.

## Transaction processing
PayU provides different operations to process your payments:

![Payments](/assets/Payments/autorizacionycaptura-en.png)

* *Authorization*: this operation is used to verify if the credit card used to pay is active, has funds, etc. The transaction is not complete until a transaction capture is sent. </br>
For Example, when you use a transportation app, after you request the service, the app sends an _Authorization_ to reserve the amount of the trip and verify that your card is valid (active and with enough founds). Nevertheless, the charge is not performed in your card yet.
* *Capture*: this operation terminates a previously authorized transaction, namely, at this point, the account makes a debit to the card.</br>
Back in the transportation app example, once your service has finished, the apps charges the total amount of your trip and terminates the transaction.
* *Authorization and capture*: this operation sends the amount of the transactions to validate (Authorization) and if it is approved, the amount is debited from the card immediately (capture). This is the most common method to process transactions.
* *Cancellation*: this operation reverses a previously authorized transaction. (only available for accounts in Brazil).
* *Refund*: this operation reverses a previously captured transaction.

### Payment methods
The available payment methods used to process transactions are:

* Credit cards.
* Cash payments.
* Bank transfers. _Only available for transactions in Colombia_

## What's next?
The integration with this service depends on the country of your transactions, the operation selected and the payment method.

* [For API integrations, refer to this topic]({{< ref "API Integration" >}})
* [For SDK integrations, refer to this topic]({{< ref "SDK Integration" >}})
