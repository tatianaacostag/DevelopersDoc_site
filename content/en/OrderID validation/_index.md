---
title: "Validation of the OrderId variable"
linkTitle: "Variable OrderId"
date: 2017-01-05
type: docs
description: > 
exclude_search: true
notopicssection: true
---

## Overview
Due to the exponential growth of e-commerce and Online Payments, the size of the identifiers we return from our Payment processor has increased.

Our estimations show that we will soon overcome the barrier of the 10 digits for the parameter `orderId`. This makes us change the current data type of the Number parameter `orderId` to allow more digits in the returning identifiers; thence, the current numeric data type will no be longer supported and this change may affect your integration with our platform.

To avoid issues due to this change, you must validate whether the new returned type matches your current integration. Follow the guidelines in this article to check whether your integration requires an update.

### Frequently Asked Questions

* **How can I check if the data type change affects my integration?**<br>Refer to the [_**Validation procedure**_ section]({{< ref"#validation-procedure" >}}) to learn how to validate according to the integration type you have with us.

* **My integration is through a digital commerce platform (such as VTEX, Shopify, etc). Do I need to implement the change?**<br>No, your digital commerce platform will implement the change silently. Nevertheless, you need to check if you have external connections for reports or queries.

* **What is the data type change?**<br>Nowadays, the Number parameter `orderId` is returned using the `Integer` type; the new data type for this parameter will be `Long`.

* **Is this change mandatory?**<br>If after verifying your integration, you found that the `orderId` is an Integer-type variable, yes. Otherwise, you don't have to change your integration.

* **This change only affects the Payment flow?**<br>No. This change may also impact your reports or queries related to transactions. Be careful when you perform the validation.

* **What if I don't apply this change?**<br>If you don’t apply this change and you oughta do it, you **will not** receive the confirmation of the payment procedure. Furthermore, you **will not** be able to query new transactions since we start to return `orderId` parameter with more than 10 digits. 

* **Can the PayU Support team make this change for me?**<br>No. The way you integrate with our services is up to you. PayU is not responsible for errors due to wrong integrations.

* **Does this change need to be implemented again?**<br>Not shortly. This change in the data type allows us to increase our capacity to generate identifiers, letting us generate up to _**9.223.372.036.854.775.807**_ identifiers.

## Validation procedure
The validation of the `orderId` depends on your integration.

### API Integration
If your shop is integrated via **API** and you use a **typed** language for your integration, you need to validate how you declare the numeric variable `orderId`.

* If the variable `orderId` is `int` or `Integer` type, you must change it to the type `long` or `Long`.
* If you use the Query API and you are mapping the variable `orderId` using `int` or `Integer` type, you must change it to the type `long` or `Long`.
* You must validate with your technical team whether the variable `orderId` is being stored in a database. If so, validate that the column in your database supports `Long-type` values.

### SDK Integration
If you are integrating with our services using the SDK, change the _**.jar**_ file of the current version of our SDK.

<a href="http://developers.payulatam.com/sdk/java/payu-java-sdk-1.4.0.zip" target="_blank" class="payu-btn-green">Download SDK Java 1.4.0</a>

### WebCheckout Integration
If your shop is integrated via **WebCheckout** and you use a **typed** language for your integration, you need to validate how you declare the numeric variable `orderId`.

* If the variable `orderId` used in the confirmation page is defined as `int` or `Integer` type, you must change it to the type `long` or `Long`.
* If you use the Query API and you are mapping the variable `orderId` using `int` or `Integer` type, you must change it to the type `long` or `Long`.
* You must validate with your technical team whether the variable `orderId` is being stored in a database. If so, validate that the column in your database supports `Long-type` values.

## Support
To request support or ask questions related to this change, contact our support team in your country:

<div style="display: flex;">
  <div style="float: left;width: 50%;">
    <ul>
      <li><img src="/assets/Argentina.png" width="25px"/> <a href="tecnico.ar@payu.com">tecnico.ar@payu.com</a></li>
      <li><img src="/assets/Brasil.png" width="25px"/> <a href="tecnico.br@payu.com">tecnico.br@payu.com</a></li>
      <li><img src="/assets/Chile.png" width="25px"/> <a href="tecnico.cl@payu.com">tecnico.cl@payu.com</a></li>
      <li><img src="/assets/Colombia.png" width="25px"/> <a href="tecnico.co@payu.com">tecnico.co@payu.com</a></li>
    </ul>
  </div>
  <div style="float: left;width: 50%;">
    <ul>
      <li><img src="/assets/Mexico.png" width="25px"/> <a href="tecnico.mx@payu.com">tecnico.mx@payu.com</a></li>
      <li><img src="/assets/Panama.png" width="25px"/> <a href="tecnico.pa@payu.com">tecnico.pa@payu.com</a></li>
      <li><img src="/assets/Peru.png" width="25px"/> <a href="tecnico.pe@payu.com">tecnico.pe@payu.com</a></li>
    </ul>
  </div>
</div>