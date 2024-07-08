---
title: "3DS authentication"
linkTitle: "3DS authentication"
date: 2024-07-1T11:32:55-05:00
description: >
  This section explains 3DS authentication and how to leverage it for enhanced security in your PayU payment processing.
  <p>
  If you are already familiar with 3DS, check our integration methods:
  <ul>
  <li> <a href="http://developers.payulatam.com/latam/en/docs/services/3dsauthentication/payu-handled-3ds-authentication.html" target="_blank">PayU-handled 3DS authentication: </a>Let PayU manage the authentication process for you. 
  <li><a href="http://developers.payulatam.com/latam/en/docs/services/3dsauthentication/external-3ds-authentication.html" target="_blank">External 3DS authentication: </a>Integrate your existing 3DS service with PayU.  
  <li><a href="https://developers.paymentsos.com/docs/flows-and-operations/three-d-secure-two.html" target="_blank">PaymentsOS 3DS authentication: </a>If you are leveraging PaymentsOS with the PayU Hub.
weight: 20
tags: ["parenttopic"]
---

## What is 3DS?
3DS (Three-Domain Secure) is a security protocol that adds an extra layer of verification during online payments. It works by securely communicating with the cardholder's issuing bank to confirm their identity before authorizing the transaction. This significantly reduces the risk of unauthorized card usage and fraud.

{{% alert title="Note" color="info"%}}
3DS authentication for PayU Latam is only available for **Argentina**, **Brazil**, **Colombia**, and **Peru**.
{{% /alert %}}

The diagram below describes the protocol flow:

![](/assets/3DS/3DS_FLOW_EN.png)

Below, an example of the authentication process:

{{< 3dsAuth/AuthFlow >}}

## Benefits of 3DS Authentication

* **Increased security and reduced fraud:** By verifying cardholder identity, 3DS helps prevent fraudulent transactions. Additionally, in case of a fraudulent chargeback, the liability often shifts to the issuing bank.

* **Improved user experience:** Modern 3DS implementations ensure a smooth authentication process with minimal disruption to the user's shopping experience.

* **Regulatory compliance:** 3DS adheres to <a href="https://www.emvco.com/emv-technologies/3d-secure/" target="_blank">EMVCo</a> standards and regulations in many markets, ensuring compliance for merchants and payment processors.

## Leveraging 3DS with PayU 
PayU Latam offers 2 options to integrate 3DS authentication into your payment processing:

* <a href="http://developers.payulatam.com/latam/en/docs/services/3dsauthentication/payu-handled-3ds-authentication.html" target="_blank">PayU-handled 3DS authentication:</a> If you don't have your own 3DS service, PayU can manage the authentication process on your behalf.

* <a href="http://developers.payulatam.com/latam/en/docs/services/3dsauthentication/external-3ds-authentication.html" target="_blank">External 3DS authentication:</a> This method allows you to leverage your existing 3DS service provider. You'll handle the authentication process and send the response directly to PayU within the payment request.

Choose the option that best suits your existing infrastructure and preferences.

