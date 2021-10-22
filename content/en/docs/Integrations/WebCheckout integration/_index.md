---
title: "WebCheckout integration"
linkTitle: "WebCheckout integration"
date: 2021-03-29T11:52:52-05:00
description: >
  WebCheckout integration lets your customers select the items they want to purchase in your shop and perform the payment in our Payment gateway (WebCheckout).
weight: 10
tags: ["parenttopic"]
---

![WebCheckout integration](/assets/Checkout1-en.png)

You can include your company logo in our payment gateway, sending it via HTTP POST method.

{{% alert title="Note" color="info"%}}
The person in charge of integrating your shop with our Payment gateway (WebCheckout) must have strong knowledge in integration with dynamic programming languages such as PHP or Java.
{{% /alert %}}

## How does the WebCheckout integration work?
The procedure to let your shoppers pay using PayU services is simple.

1. Your customer navigates your site and selects the products or services they want to purchase. Your system updates the purchase amount and sends to our system the payment form with the purchase information.<br>Your system must send this information via `HTTP POST`.

![WebCheckout integration](/assets/paso1-en.jpeg)

2. For the payment process, your customer is redirected to our Checkout where they can select the payment method.<br>PayU supports many payment methods that fits to your customers' needs according to the country where you process the purchase, [see the available Payment Methods]({{< ref "select-your-payment-method.html" >}}).

![WebCheckout integration](/assets/paso2-en.jpeg)

3. PayU processes the transaction and shows the result in our response page.

![WebCheckout integration](/assets/paso3-en.jpeg)

4. When you customer back to your page after the payment process, PayU redirects them to you Response page and sends the transaction results via `HTTP GET`. You need to process the response and show its information to your customer.

![WebCheckout integration](/assets/paso4-en.jpeg)

5. In parallel, PayU notifies the status of the transaction to the confirmation page via `HTTP POST`. Furthermore, PayU notifies to you and your customer the result of the transaction via e-mail.

![WebCheckout integration](/assets/paso5-en.jpeg)

## Considerations
* The coding of your page must be `UTF-8`.
* The WebCheckout page should not be included in an iframe.
* Do not mask the URL during the checkout process.
* Do not use security certificates elliptic curve or those who have the suite of encryption `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA` on your confirmation page.

## Integration components
Refer to the following sections to learn how to integrate using WebCheckout integration.