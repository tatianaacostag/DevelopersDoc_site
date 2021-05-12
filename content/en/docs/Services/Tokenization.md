---
title: "Tokenization"
linkTitle: "Tokenization"
date: 2021-03-26T09:34:59-05:00
description: >
  Tokenization allows you to safely store the data of your customers' credit cards through the creation of a token. This token lets you make regular charges or implement the _1 Click payment_ feature, following PCI DSS (Payment Card Industry Data Security Standard) security standards to handle credit card data.
weight: 30
---

To use the tokenization feature, you need to enable it in your PayU account. To do so, contact your sales representative:

<div>
  <div style="float: left;width: 50%;">
    <ul>
      <li><img src="/assets/Argentina.png" width="25px"/> <a href="comercios.ar@payu.com">comercios.ar@payu.com</a></li>
      <li><img src="/assets/Brasil.png" width="25px"/> <a href="comercios.br@payu.com">comercios.br@payu.com</a></li>
      <li><img src="/assets/Chile.png" width="25px"/> <a href="comercios.cl@payu.com">comercios.cl@payu.com</a></li>
    </ul>
  </div>
  <div style="float: left;width: 50%;">
    <ul>
      <li><img src="/assets/Colombia.png" width="25px"/> <a href="comercios.co@payu.com">comercios.co@payu.com</a></li>
      <li><img src="/assets/Mexico.png" width="25px"/> <a href="comercios.mx@payu.com">comercios.mx@payu.com</a></li>
      <li><img src="/assets/Peru.png" width="25px"/> <a href="comercios.pe@payu.com">comercios.pe@payu.com</a></li>
    </ul>
  </div>
</div>

## How does Tokenization work?
Tokenization includes two separated processes:

### Generate token
The first process lets you save the information of a credit card. This information is transformed into a token to let you use it later.

![Tokenization](/assets/Tokenization/tokenizacion1-en.png)

### Make charges
After you have the information of a credit card stored in a token, you can use it to perform charges periodically according to your need and your customer does not have to provide the information of their credit cards whenever you require a payment.

![Tokenization](/assets/Tokenization/tokenizacion2-en.png)

Furthermore, the tokenization feature lets you store, remove or charge several credit carts by sending an file coded in Base64.

## What's next?
The integration with this feature can be performed using one of our integration types:

* [For API integrations, refer to this topic]({{< ref "API Integration" >}})
* [For SDK integrations, refer to this topic]({{< ref "SDK Integration" >}})
