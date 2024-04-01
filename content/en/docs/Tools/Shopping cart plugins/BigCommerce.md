---
title: "BigCommerce"
linkTitle: "BigCommerce"
date: 2023-04-27T10:30:35-05:00
description:
  This guide outlines the steps to integrate PayU with your BigCommerce website. 
weight: 11
tags: ["subtopic"]
---

**Contents**
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installing the extension](#installing-the-extension)
- [Utilizing the extension](#utilizing-the-extension)
    - [Payment methods configuration](#payment-methods-configuration)
    - [Order management and refunds](#order-management-and-refunds)
- [Testing the integration](#testing-the-integration)
- [Support](#support)

## Introduction
BigCommerce is a digital commerce platform that enables you to swiftly establish an online store equipped with ready-to-use functionalities. For further details, check out the [official BigCommerce webpage](https://www.bigcommerce.com/press/).

## Prerequisites
To carry out the integration, you need:
* A PayU Latam account
* A BigCommerce account

## Installing the extension 
1. Navigate to the BigCommerce Marketplace, click on **My Apps**, find the PayU extension, and click on **Install**:

<img src="/assets/BigCommerce/Bigcommerce1.png" alt="PrintScreen" width="700">
<p></p>

2.	Tick the checkbox and click **Confirm** to proceed with the installation:

<img src="/assets/BigCommerce/Bigcommerce2.png" alt="PrintScreen" width="700">
<p></p>

3. After installation, the app interface will appear as follows:

<img src="/assets/BigCommerce/Bigcommerce3.png" alt="PrintScreen" width="700">
<br></br>

## Utilizing the extension
### Payment methods configuration
Customize the payment methods displayed on your website during checkout. Refer to our [available payment methods]({{< ref "Select-your-payment-method.md" >}}).

1. Upon installation, select **Enable PayU Latam** to integrate the app with your BigCommerce store.

<img src="/assets/BigCommerce/Bigcommerce4.png" alt="PrintScreen" width="700">
<p></p>

2. Personalize the title for the card payment option (e.g., *Pay by Card*). This title will be visible to users on the checkout page.  

<img src="/assets/BigCommerce/Bigcommerce5.png" alt="PrintScreen" width="700">
<p></p>

3. Choose the display format for available card payment options during checkout. You can choose one of the following options:  

*	Displaying *Powered by PayU Latam* and logo on the payment form.
*	Displaying credit card logos on the checkout page.

<img src="/assets/BigCommerce/Bigcommerce6.png" alt="PrintScreen" width="700">

{{% alert title="Important" color="warning"%}}
To enable alternative payment methods (cash and bank transfers), select **Enable Web Checkout (APM)**.
{{% /alert %}}

4. Add a provider for a specific PayU Latam country, to do this, click on **Add Provider**. You can enable or disable each provider by using the option in the **Status** column, and you can update their credentials by clicking the **Edit** button. 

<img src="/assets/BigCommerce/Bigcommerce7.png" alt="PrintScreen" width="700">
<p></p>

Additionally, choose **Test** or **Live** mode for each provider in the **Onboard Setup**.

<img src="/assets/BigCommerce/Bigcommerce8.png" alt="PrintScreen" width="700">
<p></p>

**Mandatory fields for adding a new provider:**
| Parameter | Description |
|---|---|
| Select Payu Latam country | Choose the country you want to configure. |
| API Login | User or login that PayU provides you. [How do I get my API Login](https://developers.payulatam.com/latam/en/docs/integrations.html#api-key-and-api-login) |
| API Key | Unique key of your commerce. [How do I get my API Key](https://developers.payulatam.com/latam/en/docs/integrations.html#api-key-and-api-login) |
| Public Key| Unique key of your commerce. [How do I get my Public Key](https://developers.payulatam.com/latam/en/docs/integrations.html#api-key-and-api-login) |
| Account ID | ID of the PayU account for the selected country. |
| Merchant ID | ID of your commerce in PayU Latam. |
<p></p>

5. Select the transaction flow: 

* For one-step flow, select **Capture on order placed**.
* For two-step flow, select **Capture on Shipment**.

<img src="/assets/BigCommerce/Bigcommerce9.png" alt="PrintScreen" width="700">
<p></p>

Refer to the [Payments flow](https://developers.payulatam.com/latam/en/docs/services/payments.html#payment-flows) document to learn more about the options.

{{% alert title="Important" color="warning"%}}
The option of processing in more than one step only applies to card payments (subject to [availability](https://developers.payulatam.com/latam/en/docs/services/payments.html#payment-flows) in each country). Transactions with other payment methods require authorization and capture in a single step.
{{% /alert %}}

{{% alert title="Note" color="info"%}}
Multi-store options will be visible below the payment options section:

<img src="/assets/BigCommerce/Bigcommerce10.png" alt="PrintScreen" width="700">
{{% /alert %}} 

### Order management and refunds

1. To manage the orders, click the **Order Dashboard** button at the upper right corner.

<img src="/assets/BigCommerce/Bigcommerce11.png" alt="PrintScreen" width="700">
<p></p>

2. The Order Dashboard grid displays payment statuses for each order:

<img src="/assets/BigCommerce/Bigcommerce12.png" alt="PrintScreen" width="500">
<p></p>

3. To process a refund, click the **Refund** button in the **Actions** column.

<img src="/assets/BigCommerce/Bigcommerce13.png" alt="PrintScreen" width="500">

{{% alert title="Important" color="warning"%}}
* Refunds are only available for card transactions.
* Refer to the [refunds document](https://developers.payulatam.com/latam/en/payu-module-documentation/payu-operations/refunds-mp.html) for details by country.
{{% /alert %}}

## Testing the integration 
Before starting real transactions, it's recommended to test your integration. Ensure you've added a provider with test credentials in your BigCommerce Configuration.

1. Log in to your store, select a product for testing, and proceed to checkout. Ensure the shipping country matches the destination:

<img src="/assets/BigCommerce/Bigcommerce14.png" alt="PrintScreen" width="400">
<p></p>

2. Select the desired payment method:  

* **A) Card:** Enter card details and click **Pay By Card**.

<img src="/assets/BigCommerce/Bigcommerce15.png" alt="PrintScreen" width="400">

{{% alert title="Note" color="info"%}}
You can customize the card payment option title as seen in [Payments methods configuration](#payment_methods_configuration).
{{% /alert %}} 

* **B) Pay by Web Checkout:** For other methods, select **Pay by Web Checkout** and complete the payment.

<img src="/assets/BigCommerce/Bigcommerce16.png" alt="PrintScreen" width="400">
<p></p>

3. Upon approval, verify the purchase in:

* BigCommerce Order Dashboard: **PayU Latam > Order Dashboard**

<img src="/assets/BigCommerce/Bigcommerce11.png" alt="PrintScreen" width="700">
<p></p>

* PayU Module: **Sales Report module**.

<img src="/assets/BigCommerce/Bigcommerce17.png" alt="PrintScreen" width="700">
<p></p>

## Support:
For technical issues or queries regarding this extension, contact our support team at **tecnico.co@payu.com** or visit [our website](https://colombia.payu.com/contactanos/). When emailing, include extension details in the subject and a summary of the issue in the body.
