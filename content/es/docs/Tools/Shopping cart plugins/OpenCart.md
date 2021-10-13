---
title: "OpenCart"
linkTitle: "OpenCart"
date: 2021-05-26T08:40:11-05:00
description:
  Este artículo te muestra el procedimiento para habilitar PayU en tu sitio web de OpenCart.
weight: 70
tags: ["subtopic"]
nosidetoc: true
---

OpenCart is a free platform developed in PHP to create online stores. OpenCart provides a professional and reliable base to build an online store. This base uses a wide variety of users such as web developers looking for a user-friendly interface or store owners who want to launch their online business for the first time. OpenCart has many features that give you great control over your store's customization.For more information about WooCommerce, refer to their [official website](https://www.opencart.com/). 

## Prerequisites
The OpenCart plugin is available for version 1.5 and 2.0 and you need to meet the following prerequisites:

* You need an active account in PayU Latam.
* For OpenCart version 1.5:
  * Having the PayU's OpenCart v1.5 plugin downloaded and stored in an accessible location. Click [here](http://developers.payulatam.com/plugins/plugin-opencart.zip) to download it.
  * Having VirtueMart version 1.5.5.1 - 1.5.6.X installed.
* For OpenCart version 2.0:
  * Having the PayU's OpenCart v2.0 plugin downloaded and stored in an accessible location. Click [here](http://developers.payulatam.com/plugins/plugin-opencart-2.0.zip) to download it.
  * Having VirtueMart version 2.0.1.0 or 2.0.1.1 installed.

## Installation and configuration
The procedure to install OpenCart plugin is the same for version 1.5 or 2.0. The only difference is the look and feel of the versions and this is highlighted during this article.<br>
Follow the next procedure to install the plugin on your website.

1. Unzip the plugin file in a location of your choice. Then, using an FTP client, go to the location where you unzipped the plugin.<br>
Then, upload the folders **admin** and **catalog** to the root folder of the OpenCart installation in your server.

![PrintScreen](/assets/OpenCart/OpenCart_01.jpg)

This action add the plugin files to your OpenCart server in the right locations. To validate whether the procedure was correct, search the following files in their corresponding locations.

![PrintScreen](/assets/OpenCart/OpenCart_02.jpg)

2. In the administration console of your OpenCart shop, open the _**Extensions**_ menu and click _**Payments**_.

**OpenCart v1.5**

![PrintScreen](/assets/OpenCart/OpenCart_03.jpg)

**OpenCart v2.0**

![PrintScreen](/assets/OpenCart/OpenCart_04.jpg)

3. In the _**Payment**_ table, find the _PayuLatam_ payment method. Then, click _**Install**_.

**OpenCart v1.5**

![PrintScreen](/assets/OpenCart/OpenCart_05.jpg)

**OpenCart v2.0**

![PrintScreen](/assets/OpenCart/OpenCart_06.jpg)

4. When the plugin has been installed, click _**Edit**_.

**OpenCart v1.5**

![PrintScreen](/assets/OpenCart/OpenCart_07.jpg)

**OpenCart v2.0**

![PrintScreen](/assets/OpenCart/OpenCart_08.jpg)

5. Configure the payment method using the data of your PayU account as follows.

| Field                | Value                                                                                               |
|----------------------|-----------------------------------------------------------------------------------------------------|
| Production Url       | PayU Latam's URL in production https://gateway.payulatam.com/ppp-web-gateway/                       |
| Test Url             | PayU Latam's URL in test https://sandbox.gateway.payulatam.com/ppp-web-gateway                      |
| Test Mode?           | Set **Yes** to make transactions in the test environment and **No** for the production environment. |
| Merchant ID          | ID of your commerce in PayU Latam                                                                   |
| Account ID           | ID of the PayU account according to the country where you want to sell.                             |
| API key              | Unique key of your commerce, you can find this key in the PayU module.                              |
| Approved Transaction | Order status in the OpenCart shop when PayU Latam approves the transaction.                         |
| Pending Transaction  | Order status in the OpenCart shop when the transaction is pending in PayU Latam.                    |
| Declined Transaction | Order status in the OpenCart shop when PayU Latam declines the transaction.                         |
| Status               | Select _**Enable**_ to activate this payment method in OpenCart.                                    |

6. Finally, save the changes. At this point, your customers can pay with PayU Latam when they do the checkout in the OpenCart's shopping cart. 