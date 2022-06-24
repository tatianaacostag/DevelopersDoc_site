---
title: "3DS Authentication"
date: 2021-12-07T10:25:17-05:00
description: >
  3DS (Three-Domain Secure) lets you perform an intuitive and consumer-friendly authentication process. 3DS adds additional security layers to reduce the fraud avoiding the unauthorized usage of credit cards. 
weight: 20
---

## What is 3DS?
3DS (Three-Domain Secure) is a messaging protocol that enables the issuers to authenticate their cardholders during the online shops. This authentication is performed before the transaction is authorized and follows the next flow.

![](/assets/3DS/3DS_whatis_en.png)

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
3DS Authentication, available for Brazil and Colombia, is provided via API under two modalities:

* _**Pass Through**_: if you have your own 3DS Authentication service, you can send us the authentication response in the payment request. Under this modality, you are responsible for the integration with an _**MPI**_ or a _**3DS Server**_.<br>The _**Pass Through**_ is intended for merchants integrated via API to **PayU Latam** Platform. For more information, contact your sales representative.

* _**2-calls Authentication flow**_: if you want to authenticate the transaction using PayU, you can integrate through **PayU Hub**<sup>\*</sup> using the [Authentication Service](https://developers.paymentsos.com/docs/threed-d-secure-authentication-service.html) that operates in two calls flow, one call for authentication and other for authorization.
  - To _authenticate_, you must connect to the PayU Hub, where you will get the authentication response.
  - To _authorize_, you can chose to go through **PayU Latam** or **PayU Hub**.

  <br>The _**2-calls Authentication flow**_ is intended for merchants with the following characteristics:
    - Merchants integrated via API to **PayU Latam** Platform (directly not through partners).
    - Merchants integrated to the **PayU Hub** processing in Latam countries. <img src="/assets/Brasil.png" width="2%"/><img src="/assets/Colombia.png" width="2%"/>
    - Large merchants that want to control their authentication flow and want to decide which transactions to authenticate.
    - Merchants with high-tech resources to make the API integration.

<sup>\*</sup>**PayU Hub**, is the solution for borderless Payments. With a single API integration, you can process local payments in 18 markets.

{{% alert title="Note" color="info"%}}
3DS Authentication is supported for Visa & MasterCard.
{{% /alert %}}

When using the 3DS Authentication solution, take into account the following:

* The authentication service is independent from the authorization service.
* The authorization must include the authentication response.

### Benefits of our solution
When using the Authentication Service featured by **PayU Hub** (2-calls Authentication flow), you have the following benefits.

* PayU is connected to a 3DS server (MPI), you don't need to do it by your own. Less providers & contracts!
* You control and decide when to authenticate a transaction.
* No additional costs<sup>\*</sup>. Authentication is a service for free!.
* If you migrate to the HUB, you can have additional benefits of a global solution.

<sup>\*</sup> _The acquirers may charge an authentication cost, if so, this cost will be transferred to you._

### How to integrate 3DS?
3DS Authentication is a service available under demand, contact your Key Account Manager to sign the Terms & conditions to enable it.<br>Depending on the scenario you choose to use the 3DS Authentication, the integration procedure varies.

#### Pass Through
When you are integrated with an _**MPI**_ or a _**3DS Server**_, you just need to send us the authentication response in the payment request. Refer to your processing country to see an example of how to send the parameters returned in the response:

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Brazil.md#considerations" >}}'><img src="/assets/Brasil.png" width="10%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Colombia.md#considerations" >}}'><img src="/assets/Colombia.png" width="10%"/></a>
  </div>
</div>
<br>

#### 2-calls Authentication flow
To integrate with our Authentication service, follow the next steps:

1. To get started, open an account on the **PayU Hub**.<br>Click [here](https://control.paymentsos.com/signup) to create one.

2. Update your integration code. Ask your developers to update their integration code to connect through the **PayU Hub**.

3. Test your integration and go live!

Everything else remains the same!.

* Keep your current offer. You can still offering your current payment methods either from **PayU Latam** or from **PayU Hub**.
* New On boarding process? Hell no! You're already with us, so there's nothing else we need.
* Payments are still handled by the local platforms, so we will make sure that the same data is available for you.
