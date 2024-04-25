---
title: "Shopify"
linkTitle: "Shopify"
date: 2021-05-25T10:30:35-05:00
description:
  This guide outlines the steps to enable PayU on your Shopify website. 
weight: 10
tags: ["subtopic"]
---

## Prerequisites
* An active PayU Latam account.
* A valid Shopify plan. Note that Checkout functionality is not available with trial plans. You can explore Shopify's plans and pricing <a href="https://www.shopify.com/pricing" target="_blank">here</a>.

## Order management in Shopify
Take into account the following provisions when managing orders in Shopify:
* **All orders:** Includes orders with the following 2 statuses:
    * **Approved:** Orders that are paid in full or partially.
    * **Pending:** Orders waiting to be completed when the customer returns to the store after processing a payment through the gateway.
* **Abandoned checkouts**: Applies to processes that:
  1. Remained incomplete because the user could not complete the payment or abandoned the shopping site.
  2. Are marked as _Rejected_.
  3. Remain in a _Pending_ state without the customer returning to the shopping site after payment processing through the gateway, this includes:<br>
    <span style="color: #A6C307;font-weight: bold;">3.1.</span> Cash payments.<br>
    <span style="color: #A6C307;font-weight: bold;">3.2.</span> Credit card payments that enter validation due to anti-fraud protection rules.

{{% alert title="Note" color="info"%}}
* Shopify **DOES NOT** reserve inventory for any of the above scenarios. 
* For processes considered as _abandoned checkout_, the system only generates orders once the transaction reaches an _Approved_ status.
{{% /alert %}}

## Setting up PayU as payment gateway
1. Log in to your Shopify account and download the PayU Latam v2 app from the app store by clicking <a href="https://apps.shopify.com/payu-latam-v2?locale=en" target="_blank">here</a> and selecting **Install**.
 
<img src="/assets/Shopify/Shopify01EN.png" alt="PrintScreen" width="700">
<p></p>

2. Select the store where you want to install the app, you'll be redirected to the installation page, click on **Install**.

<img src="/assets/Shopify/Shopify02EN.png" alt="PrintScreen" width="700">
<p></p>

<img src="/assets/Shopify/Shopify03EN.png" alt="PrintScreen" width="700">
<p></p>

3. Choose the desired environment for the app installation—either the Test Environment or the Production Environment. Then, input your Merchant ID and Account ID and select **Save** to confirm. 

<img src="/assets/Shopify/Shopify04EN.png" alt="PrintScreen" width="500">
<p></p>

{{% alert title="Note" color="info"%}}
* Find your production environment credentials by logging into your PayU administrative module, where you can locate the Merchant ID and Account ID in the top left corner of the module.

<img src="/assets/Shopify/Shopify05EN.png" alt="PrintScreen" width="240">
<p></p>

* Find the test environment credentials <a href="https://developers.payulatam.com/latam/en/docs/getting-started/test-your-solution.html" target="_blank">here</a>.
* You can check or change your credentials in your Shopify account settings.   
{{% /alert %}}

{{% alert title="Important" color="warning"%}}
You need an Account ID per store in Shopify.
{{% /alert %}}

4. You will be redirected to the Payments page, to enable the app, click on the **Activate** button located in the bottom right corner.

<img src="/assets/Shopify/Shopify06EN.png" alt="PrintScreen" width="700">
<p></p>

{{% alert title="Important" color="warning"%}}
* For your information, you'll see various payment methods. To proceed, you must select at least one of them, this won't alter the payment methods available in the PayU Web Checkout.
* Test mode: within the same _Payments_ section, you'll find the option to use test mode, allowing you to conduct tests in the Sandbox environment.
* We recommend that you use the test environment in a controlled manner, preferably during off-peak hours, as transactions processed in test mode do not result in real payments and the production environment remains disabled.
* To disable test mode, uncheck the box:

<img src="/assets/Shopify/Shopify07EN.png" alt="PrintScreen" width="700">

{{% /alert %}}

5. Access your <a href="https://developers.payulatam.com/latam/en/payu-module-documentation/getting-started/understanding-the-payu-module.html" target="_blank">PayU Module</a>, navigate to the **Settings** section, and click on **Technical Settings**. Enable the option called **Control duplicate payments (Validate unique reference)** to prevent issues during payment processing. 

<img src="/assets/Shopify/Shopify08EN.png" alt="PrintScreen" width="700">
<p></p>

6. From now on, PayU is set up as your payment processor, enabling you to kickstart your sales. With PayU's Web Checkout, your customers can make purchases using various payment methods including cash, credit cards, and bank transfers, tailored to the country in which you're conducting business.

## Payment flow in Shopify
When you configure PayU as the payment gateway in your platform, your customers can proceed with payments as explained below:

1. Your customer selects the desired product or service and adds it to their shopping cart.

![PrintScreen](/assets/Shopify/Shopify_08.png)

2. In the shopping cart, your customer proceeds to checkout.

![PrintScreen](/assets/Shopify/Shopify_09.png)

3. After providing their information, your customer clicks on **Complete order** to be redirected to PayU Latam for payment completion.

![PrintScreen](/assets/Shopify/Shopify_10.png)

4. Upon reaching our payment gateway, your customer can view the sale description and available payment methods specific to their country.

![PrintScreen](/assets/Shopify/Shopify_11.png)

{{% alert title="Note" color="info"%}}
If you need to issue a full or partial refund, you can manage it directly from your Shopify store admin. For more information, click <a href="https://help.shopify.com/en/manual/orders/refund-cancel-order#refunding-an-order" target="_blank">here</a>.
{{% /alert %}}