---
title: "Payments"
linkTitle: "Payments"
date: 2021-03-25T14:28:20-05:00
description: >
  Payments feature lets your shop process different transaction types with multiple payment methods.
weight: 10
---
<script src="/js/banner.js"></script>

<script>
window.onload = function() {
    var bannerText = "<ul class='fa-ul' style='--fa-li-width: 2em;margin-bottom: initial;'><li style='margin-bottom: initial;'><span class='fa-li'><i class='fas fa-exclamation-triangle'></i></span>We inform that PayU S.A. has been notified by IGT – operator for Baloto network – its decision to terminate the contract for the cash collection model given the entry of a new operator, which to date has not provided information on the continuity of this service. Therefore, the payment service through Baloto will stop working since <b>May 25, 2022</b>. It is recommended to disable this service at least seven (7) days before this date. If you need further assistance, contact the technical support team through <a href='mailto:tecnico.co@payu.com'>tecnico.co@payu.com</a>.</li></ul>";

    loadBanner(bannerText);
}

window.onresize = function() {
    refreshBanner();
}
</script>

<style type="text/css" media="screen">
    div#banner { 
        z-index: 999;
        background-color: #DDEEEE; 
        width: 100%;
        margin-top: -1.3rem;
    }
    div#banner-content { 
        margin: 0 auto; 
        padding: 10px; 
    }
</style>

Regardless of the [integration type]({{< ref "integrations" >}}) you choose, PayU provides operations to process your transactions. The following section explains these methods.

## Payment flows
PayU can process the payments using two types of Payment flows: two-step and one-step.

![Payments](/assets/Payments/autorizacionycaptura-en.png)

* In the one-step flow, combines the _**Authorization**_ and _**Capture**_ steps into a single transaction. Funds are transferred from your customer's account to your PayU account when the payment has been authorized. The unique step in this flow is:
  - _**Charge (Authorization and capture)**_: this operation sends the amount of the transaction to validate (Authorization) and if it is approved, the amount is debited from the card immediately (capture). This is the most common method to process transactions.

* In the two-step flow, first you need to authorize and place a hold on the customer's funds. Then, complete the transaction to transfer the authorized funds to your PayU account. The steps in this flow are:
  - _**Authorization**_: this operation is used to verify if the card used to pay is active, has funds, etc. The charge is not completed until a transaction capture is sent. </br>
For Example, when you use a transportation app, after you request the service, the app sends an _Authorization_ to reserve the amount of the trip and verify that your card is valid (active and with enough founds). Nevertheless, the charge is not performed in your card yet.
  - _**Capture**_: this operation terminates a previously authorized transaction, namely, at this point, the account makes a debit to the card.</br>
Back in the transportation app example, once your service has finished, the apps charges the total amount of your trip and terminates the transaction.

{{% alert title="Note" color="info"%}}

Two-step flow is not supported for Panama. For Colombia and Chile, this flow is available under request only, contact your sales representative.

{{% /alert %}}

### Payment methods
The available payment methods used to process transactions are:

* Credit cards.
* Cash or bank payments.
* Bank transfers.

{{% alert title="Note" color="info"%}}

Refer to [this article]({{< ref "Select-your-payment-method.md" >}}) to know the Payment methods available to shoppers per country.

{{% /alert %}}

## What's next?
The integration with this feature depends on the country of your transactions, the operation selected and the payment method.

{{< payments/countries >}}
