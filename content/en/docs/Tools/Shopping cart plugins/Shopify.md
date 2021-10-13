---
title: "Shopify"
linkTitle: "Shopify"
date: 2021-05-25T10:30:35-05:00
description:
  This article shows you the procedure to enable PayU on your Shopify website. 
weight: 10
tags: ["subtopic"]
---

## Prerequisites
* You need an active account in PayU Latam.
* You need a valid [plan](https://www.shopify.com/pricing) in Shopify. Checkout is not available in Trial plans.

## Order management in Shopify
Take into account the following when managing orders in Shopify:
* **All orders**: are the orders with state _**Approved**_ (fully or partially paid) and _**Pending**_ (while the payer backs to the store after processing the payment in the gateway).
* **Abandoned checkouts**: are payment procedures which meet any of the following criteria:
  1. Uncompleted checkouts.
  2. Checkouts abandoned during the payment process.
  3. Transactions with _**Rejected**_ state.
  4. Transactions with _**Pending**_ state as long as the payer does not return to the store after processing the payment in the gateway:<br>
    <span style="color: #A6C307;font-weight: bold;">4.1.</span> Cash Payments (always return _**Pending**_ state).<br>
    <span style="color: #A6C307;font-weight: bold;">4.2.</span> Credit Card payments that are subject to fraud analysis.

{{% alert title="Note" color="info"%}}
* Shopify **DOES NOT** make any stock reservation or for any of these two cases.
* Shopify creates the order for these two cases when the final state of the transaction is _**Approved**_.
{{% /alert %}}

## Enable PayU as Payment gateway
1. Enter to your _Shopify_ admin site. Click _**Settings**_ and then, select _**Payments**_.
 
![PrintScreen](/assets/Shopify/Shopify_01.png)

2. Go to the _**Third-party providers**_ section and click _**Choose third-party provider**_.

![PrintScreen](/assets/Shopify/Shopify_02.png)

3. In the list, find and click the _PayU Latam_ gateway. 

![PrintScreen](/assets/Shopify/Shopify_03.png)

4. Provide the following information of your PayU account:

![PrintScreen](/assets/Shopify/Shopify_04.png)

* **Account Id (1)**: ID of the PayU account according to the country where you want to sell.
* **Api Key (2)**: Unique key of your commerce, you can get this information in your PayU Module (**_Settings_** > **_Technical configuration_** > **_API Key_**).

![PrintScreen](/assets/Shopify/Shopify_05.png)

5. Finally, click _**Activate PayU Latam**_ button at the bottom of the page.

![PrintScreen](/assets/Shopify/Shopify_06.png)

6. Open the PayU module and go to the _**Configuration**_ options (**_Settings_** > **_Technical configuration_**). Then, disable the validation of unique reference for all states, to avoid issues at the moment of processing your payments.

![PrintScreen](/assets/Shopify/Shopify_07.png)

At this point, your customers can make payments through the PayU Checkout. They are able to pay using payment options including cash, credit cards and bank transfers, depending on the country where you are selling.

## Payment flow in Shopify
When you configure PayU as payment gateway in platform, your customer can pay as explained below.

1. Your customer selects the product or service they want to buy and add it to their shopping cart.

![PrintScreen](/assets/Shopify/Shopify_08.png)

2. In the shopping cart, you customer proceeds to the check out.

![PrintScreen](/assets/Shopify/Shopify_09.png)

3. Once your customer provides their information, they can click _**Complete order**_ to be redirected to PayU Latam to complete the payment.

![PrintScreen](/assets/Shopify/Shopify_10.png)

4. When they are in our payment gateway, they can see the sale description and the available payment methods for your country.

![PrintScreen](/assets/Shopify/Shopify_11.png)