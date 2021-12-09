---
title: "3DS Authentication"
date: 2021-12-07T10:25:17-05:00
description: >
  3DS (Three-Domain Secure) lets you perform an intuitive and consumer-friendly authentication process. 3DS adds additional security layers to reduce the fraud avoiding the unauthorized usage of credit cards. 
weight: 20
---

## What is 3DS?
3DS (Three-Domain Secure) is a messaging protocol that enables the issues to authenticate their cardholders during the online shops. This authentication is performed before authorize the transaction and follows the next flow.

![Concepts](/assets/3DS/3DS_whatis_en.png)

The next infographic explains the authentication flow for 3DS.

{{< 3dsAuth/AuthFlow >}}

## 3DS Benefits
3DS (Three-Domain Secure) adds additional security layers to reduce the fraud avoiding the unauthorized usage of credit cards, protecting you of chargebacks due to fraud transactions. 

Using 3DS, you can have:

* **Higher approval rates, less fraud.**<br>
The exchange of data between merchants and issuers helps to make better authorization decisions and fraud detection. In case of fraud chargebacks, the issuer is the one who has the responsibility with the buyer.

* **Better user experience.**<br>
3DS allows a better integration of the authentication process during the shopping experience of the end user. Reduces the friction with the user in a higher percentage of transactions.

* **Complies with regulations and [EMVCo](https://www.emvco.com/emv-technologies/3d-secure/) standards.**<br>
Supports a strong customer authentication for issuers, acquirers, and payment services in regulated markets.

## 3DS Authentication solution
The authorization can be sent by **PayU Latam** or by **PayU Hub**. You are free to decide and it's not necessary to completely migrate to the **PayU Hub** if you choose **PayU Latam**.

* Through **PayU Latam** using a _Pass Through_ scenario where the commerce performs the authentication by their own. This is available for commerces who processes in [Brazil]({{< ref "Payments-API-Brazil.md" >}}) and [Colombia]({{< ref "Payments-API-Colombia.md" >}}).<br>For more information, contact your sales representative.

* Through **PayU Hub** using the [Authentication Service](https://developers.paymentsos.com/docs/threed-d-secure-authentication-service.html) that operates in two calls flow. To authenticate, you must connect to the PayU Hub, where you will get the authentication response.<br>**PayU Hub**, is the solution for borderless Payments. With a single API integration, you can process local payments in 18 markets.

{{% alert title="Note" color="info"%}}
3DS Authentication is supported for Visa & MasterCard.
{{% /alert %}}

When using the 3DS Authentication solution, take into account the following:

* The authentication service is independent from the authorization service.
* The authorization must include the authentication response.

### Benefits of our solution
Regardless of how you integrate with our 3DS Authentication solution, you have the following benefits.

* PayU is connected to a 3DS server (MPI), you don't need to do it by your own. Less providers & contracts! 
* You control and decide when to authenticate a transaction.
* No additional costs<sup>\*</sup>. Authentication is a service for free!.
* Minimum or none contract adjustments for 3DS service. 
* If you migrate to the HUB, you can have additional benefits of a global solution.

<sup>\*</sup> _The acquirers may charge an authentication cost._

{{% alert title="Note" color="info"%}}
We are working on connecting to multiple 3DS server providers to improve performance and guarantee authentication service always.
{{% /alert %}}

### How to integrate 3DS?
* To integrate using **PayU Latam**, refer to the _Payments API_ of your processing country:

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Brazil.md#considerations" >}}'><img src="/assets/Brasil.png" width="10%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Colombia.md#considerations" >}}'><img src="/assets/Colombia.png" width="10%"/></a>
  </div>
</div>
<br>

* To integrate using **PayU Hub**, follow these steps:

1. To get started, open an account on the **PayU Hub**.<br>Click [here](https://control.paymentsos.com/signup) to create one.

2. Update your integration code. Ask your developers to update their integration code to connect through the PayU Hub.

3. Test your integration and go live!

Everything else remains the same!.

* Keep your current offer. You can still offering your current payment methods either from **PayU Latam** or from **PayU Hub**.
* New On boarding process? Hell no! You're already with us, so there's nothing else we need.
* Payments are still handled by the local platforms, so we will make sure that the same data is available for you. 
