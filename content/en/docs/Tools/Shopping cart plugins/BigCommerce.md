---
title: "BigCommerce"
linkTitle: "BigCommerce"
date: 2023-04-27T10:30:35-05:00
description:
  This guide offers detailed instructions for integrating PayU with your BigCommerce store, enabling seamless payment solutions. 
weight: 11
tags: ["subtopic"]
---

BigCommerce is a robust e-commerce platform designed to help you set up and manage an online store quickly, offering a range of ready-to-use features for a seamless experience. For more information, visit the <a href="https://www.bigcommerce.com/press" target="_blank">official BigCommerce website</a>.

## Prerequisites

Before starting the integration, make sure you have the following:
* A PayU Latam account
* A BigCommerce account

## Installing the Extension

1. Go to the BigCommerce Marketplace, select **My Apps**, locate the PayU extension, and click **Install** to begin the installation.

<img src="/assets/BigCommerce/Bigcommerce1.png" alt="PrintScreen" width="700">
<p></p>

2. Tick the checkbox and click **Confirm** to proceed with the installation.

<img src="/assets/BigCommerce/Bigcommerce2.png" alt="PrintScreen" width="700">
<p></p>

3. After installation, the app interface will appear as follows.

<img src="/assets/BigCommerce/Bigcommerce3.png" alt="PrintScreen" width="700">

## Payment Methods Configuration

Configure and customize payment methods for your checkout page. Refer to our <a href="https://developers.payulatam.com/latam/en/docs/getting-started/select-your-payment-method.html" target="_blank">available payment methods</a>.

1. After installation, toggle the **Enable PayU Latam** slider to integrate the app with your BigCommerce store.

<img src="/assets/BigCommerce/Bigcommerce4.png" alt="PrintScreen" width="700">
<p></p>

2. Personalize the title for the card payment option (e.g., *Pay by Card*). This title will be visible to users on the checkout page.  

<img src="/assets/BigCommerce/Bigcommerce5.png" alt="PrintScreen" width="700">
<p></p>

3. Choose the display format for available card payment options during checkout:
   - Display *Powered by PayU Latam* and the logo on the payment form.
   - Display credit card logos on the checkout page.

<img src="/assets/BigCommerce/Bigcommerce6.png" alt="PrintScreen" width="700">

{{% alert title="Important" color="warning"%}}

To enable alternative payment methods (cash and bank transfers), select **Enable Web Checkout (APM)**.

{{% /alert %}}

4. Add a provider for a specific PayU Latam country by clicking **Add Provider**. Enable or disable each provider using the button on the **Status** column, and update their credentials using the **Edit** button. 

<img src="/assets/BigCommerce/Bigcommerce7.png" alt="PrintScreen" width="700">
<p></p>

Additionally, choose **Test** or **Live** mode for each provider in the **Onboard Setup**.

<img src="/assets/BigCommerce/Bigcommerce8.png" alt="PrintScreen" width="700">
<p></p>

**Mandatory Fields for Adding a New Provider:**

| Parameter | Description |
|---|---|
| Select Payu Latam country | Choose the country you want to configure. |
| API Login | User or login that PayU provides you. <a href="https://developers.payulatam.com/latam/en/docs/integrations.html#api-key-and-api-login" target="_blank">How do I get my API Login</a>. |
| API Key | Unique key that PayU assigned to your store. <a href="https://developers.payulatam.com/latam/en/docs/integrations.html#api-key-and-api-login" target="_blank">How do I get my API Key</a>. |
| Public Key| Unique key that PayU assigned to your store. <a href="https://developers.payulatam.com/latam/en/docs/integrations.html#api-key-and-api-login" target="_blank">How do I get my Public Key</a>. |
| Account ID | ID of the PayU account for the selected country. |
| Merchant ID | ID of your commerce in PayU Latam. |
<p></p>

5. Select the transaction flow:
   - To enable a one-step flow, select **Capture on Order Placed**.
   - To enable a two-step flow, select **Capture on Shipment**.

<img src="/assets/BigCommerce/Bigcommerce9.png" alt="PrintScreen" width="700">
<p></p>

{{% alert title="Important" color="warning"%}}

* The two-step flow applies only to card payments (subject to availability in each country), other payment methods require authorization and capture in a single step. Refer to the <a href="https://developers.payulatam.com/latam/en/docs/services/payments.html#payment-flows" target="_blank">Payments flow documentation</a> for more details.
* Multi-store options will appear below the payment options section.
<img src="/assets/BigCommerce/Bigcommerce10.png" alt="PrintScreen" width="700">

{{% /alert %}}

## Order Management and Refunds

1. To manage the orders, click the **Order Dashboard** button in the upper-right corner.

<img src="/assets/BigCommerce/Bigcommerce11.png" alt="PrintScreen" width="700">
<p></p>

2. The Order Dashboard provides an overview of payment statuses for all orders.

<img src="/assets/BigCommerce/Bigcommerce12.png" alt="PrintScreen" width="500">
<p></p>

3. To process a refund, click the **Refund** button in the **Actions** column.

<img src="/assets/BigCommerce/Bigcommerce13.png" alt="PrintScreen" width="500">

{{% alert title="Important" color="warning"%}}

* Refunds are available only for card transactions.
* Refer to the <a href="https://developers.payulatam.com/latam/en/payu-module-documentation/payu-operations/refunds-mp.html" target="_blank">refunds document</a> for country-specific details.

{{% /alert %}}

## Testing the Integration

Test your integration with test credentials before initiating live transactions.

1. Log in to your store, select a product for testing, and proceed to checkout. Ensure the shipping country matches the destination.

<img src="/assets/BigCommerce/Bigcommerce14.png" alt="PrintScreen" width="400">
<p></p>

2. Select the desired payment method. 

- **Card:** Enter card details and click **Pay By Card**.

<img src="/assets/BigCommerce/Bigcommerce15.png" alt="PrintScreen" width="400">

{{% alert title="Note" color="info"%}}

You can customize the card payment option title as explained in [Payments Methods Configuration](#payment-methods-configuration).

{{% /alert %}} 

- **Pay by Web Checkout:** For other methods, select **Pay by Web Checkout** and complete the payment.

<img src="/assets/BigCommerce/Bigcommerce16.png" alt="PrintScreen" width="400">
<p></p>

3. Upon approval, verify the purchase in:

- **BigCommerce Order Dashboard:** Navigate to **PayU Latam > Order Dashboard**.

<img src="/assets/BigCommerce/Bigcommerce11.png" alt="PrintScreen" width="700">
<p></p>

- **PayU Management Panel:** View in the **Sales Report module**.

<img src="/assets/BigCommerce/Bigcommerce17.png" alt="PrintScreen" width="700">
<p></p>

## Support

For technical issues or queries regarding this extension, contact our support team at **tecnico.co@payu.com** or visit <a href="https://colombia.payu.com/en/contact-us//" target="_blank">our website</a>.  When contacting support, include the extension details in the email subject line and provide a concise summary of the issue in the body.
