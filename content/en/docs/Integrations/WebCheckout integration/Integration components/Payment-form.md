---
title: "Payment Form"
linkTitle: "Payment Form"
date: 2021-03-29T12:15:27-05:00
description: >
  With this HTML form, you can send the transaction request to our payment gateway along with the purchase information. Send the request using the HTTP POST method.

weight: 10
tags: ["subtopic"]
---

In this topic, you find how to send data from one transaction to the PayU payment gateway. To do so, You must generate an HTML form with the transaction data using the HTTP POST method and pointing it to our system.

{{% alert title="Considerations" color="info"%}}
* Make sure you have the right ```merchantId```, ```accountId```, and ```apiKey```
* Use a different payment reference per payment
* Do not include spaces in parameter values
* Do not include values with more than two decimal places
* Do not include special characters in the ```referenceCode```parameter
{{% /alert %}}
