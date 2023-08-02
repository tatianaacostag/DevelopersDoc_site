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

{{% alert title="Note" color="info"%}}
3DS Authentication is supported for Visa & MasterCard.
{{% /alert %}}

When using the 3DS Authentication solution, take into account the following:

* The authentication service is independent from the authorization service.
* The authorization must include the authentication response.

### Benefits of our solution
* You control and decide when to authenticate a transaction.
* If you migrate to the HUB, you can have additional benefits of a global solution.

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
