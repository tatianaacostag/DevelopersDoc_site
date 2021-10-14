---
title: "WooCommerce"
linkTitle: "WooCommerce"
date: 2021-05-26T08:40:03-05:00
description:
  This article shows you the procedure to enable PayU on your WooCommerce website.
weight: 50
tags: ["subtopic"]
---

WooCommerce is a WordPress plugin that ease the creation of an integrated online store. To let your **clients** pay with PayU from your website, you need to install the plugin for WooCommerce, which integrates PayU Latam as a valid payment gateway. For more information about WooCommerce, refer to their [official website](https://woocommerce.com/). 

## Prerequisites
* You need an active account in PayU Latam.
* Having installed [WordPress 3.8](https://wordpress.com/en) or higher.
* Having installed WooCommerce 2.0 or higher in the WordPress website.
* Having the PayU's WooCommerce plugin downloaded and stored in an accessible location. Click [here](http://developers.payulatam.com/plugins/woocommerce-payu-latam-2.1.zip) to download it.

## Installation
Follow the next procedure to install the plugin on your website.

1. Log in to your WordPress site as an administrator.

2. In the Dashboard, expand the _**Plugins**_ menu in the left panel and click _**Add New**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_01.jpg)

3. Go to the _**Upload**_ option and choose the _.zip_ file of the WooCommerce plugin downloaded.<br>
Then, click _**Install Now**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_02.jpg)

4. Provide the data of the connection via FTP and click _**Proceed**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_03.jpg)

{{% alert title="Note" color="info"%}}

This step depends on the initial configuration of WordPress. The installation of the plugin is not affected if you don't see this screen.

{{% /alert %}}  

5. Finally, activate the plugin you have installed by clicking the _**Activate Plugin**_ link.

![PrintScreen](/assets/WooCommerce/WooCommerce_04.jpg)

## Configuration
1. Back in the Dashboard, expand the _**WooCommerce**_ menu in the left panel and click _**Settings**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_05.jpg)

2. Go to the _**Checkout**_ tab.

![PrintScreen](/assets/WooCommerce/WooCommerce_06.jpg)

3. Scroll down to _**Payment Gateways**_ table. Then, find _PayU Latam_ and drag and drop to the top of the table.<br>
Click the radio of the _**Default**_ column.

![PrintScreen](/assets/WooCommerce/WooCommerce_07.jpg)

Save the changes. 

4. Click the _PayU Latam_ link at the top of the tab and configure the data of your PayU account.

![PrintScreen](/assets/WooCommerce/WooCommerce_09.jpg)

The following table explains the values:

| Field                     | Value                                                                                      |
|---------------------------|--------------------------------------------------------------------------------------------|
| Enable / Disable          | Mark this checkbox to enable the payment gateway in WooCommerce.                           |
| Title                     | Title displayed for the Payment Method. The default value is _PayU Latam_.                 |
| Merchant ID               | ID of your commerce in PayU Latam                                                          |
| Account ID                | ID of the PayU account according to the country where you want to sell.                    |
| API key                   | Unique key of your commerce, you can find this key in the PayU module.                     |
| Gateway URL               | Gateway URL.<br>For test, you can use https://sandbox.gateway.payulatam.com/ppp-web-gateway and for production https://gateway.payulatam.com/ppp-web-gateway/                                                            |
| Transaction in test mode  | Mark this checkbox to make transactions the test mode.                                     |
| Response page             | URL of the response page.<br>By default, the URL is https://your.domain.com/wp-content/plugins/woocommerce-payu-latam/response.php, you must replace https://your.domain.com with your site's domain.                    |
| Confirmation page         | URL of the confirmation page.<br>By default, the URL is https://your.domain.com/wp-content/plugins/woocommerce-payu-latam/confirmation.php, you must replace https://your.domain.com with your site's domain.                |

5. Finally, click _**Save changes**_ button. At this point, your customers can pay with PayU Latam when they do the checkout in the WooCommerce's shopping cart. 