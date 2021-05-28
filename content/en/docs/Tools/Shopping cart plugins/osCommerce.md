---
title: "osCommerce"
linkTitle: "osCommerce"
date: 2021-05-26T08:39:47-05:00
description:
  This article shows you the procedure to enable PayU on your osCommerce website.
weight: 60
tags: ["subtopic"]
---

osCommerce is a platform developed in PHP that ease the creation of an online store. To let your **clients** pay with PayU from your website, you need to install the plugin for osCommerce, which integrates PayU Latam as a valid payment gateway. For more information about osCommerce, refer to their [official website](https://www.oscommerce.com/).

## Prerequisites
* You need an active account in PayU Latam.
* Having installed [osCommerce version 2.3](https://www.oscommerce.com/Products).
* Having the PayU's osCommerce plugin downloaded and stored in an accessible location. Click [here](/assets/plugins/plugin-oscommerce.zip) to download it.

## Installation
Follow the next procedure to install the plugin on your website.

1. Unzip the plugin file in a location of your choice. From now on, we will refer this location to ```[PLUGIN_PATH]```. <br>
In this path, you find the folder ```oscommerce-plugin-1.0```.

![PrintScreen](/assets/oscommerce/oscommerce_01.png)

2. Either using FTP or logging in as an Administrator to the server where osCommerce is installed, include the plugin files in the server as follows:

* In the server path ```/[server]/apache/[publication_path]/oscommerce/catalog```, copy the plugin files ```confirmation_payu.php``` and ```response_payu.php```. These files are located in the path ```[PLUGIN_PATH]\oscommerce-plugin-1.0\oscommerce-payu-latam-1.0\catalog```.

![PrintScreen](/assets/oscommerce/oscommerce_02.png)

* In the server path ```/[server]/apache/[publication_path]/oscommerce/catalog/includes/languages/english/modules/```, copy the plugin file ```‘payu_latam.php``` located in the path ```[PLUGIN_PATH]\oscommerce-plugin-1.0\oscommerce-payu-latam-1.0\catalog\includes\languages\english\modules\payment```.<br><br>
![PrintScreen](/assets/oscommerce/oscommerce_03.png)<br>
  Repeat this step for Spanish and English if you have them installed in your osCommerce website. These files are located in the paths:<br>
  - ES: ```[PLUGIN_PATH]\oscommerce-plugin-1.0\oscommerce-payu-latam-1.0\catalog\includes\languages\espanol\modules\payment```
  - PT: ```[PLUGIN_PATH]\oscommerce-plugin-1.0\oscommerce-payu-latam-1.0\catalog\includes\languages\portugues\modules\payment```
{{% alert title="Note" color="info"%}}

PayU Latam plugin for osCommerce is only available for English, Spanish and Portuguese.

{{% /alert %}}  

* In the server path ```/[server]/apache/[publication_path]/oscommerce/catalog/includes/modules/payment/```, copy the plugin file ```‘payu_latam.php``` located in the path ```[PLUGIN_PATH]\oscommerce-plugin-1.0\oscommerce-payu-latam-1.0\catalog\includes\modules\payment```. This file is not the same file thn the one mentioned before.

![PrintScreen](/assets/oscommerce/oscommerce_04.png)

3. In the osCommerce admin panel, expand the _**Modules**_ menu in the left panel and select _**Payment**_ option.

![PrintScreen](/assets/oscommerce/oscommerce_05.jpg)

4. In the Payment section, click _**Install Module**_ button located at the top right corner.

![PrintScreen](/assets/oscommerce/oscommerce_06.jpg)

5. Find the ```Payu Latam``` plugin and click it. Then, click _**Install Module**_ button in the right panel.

![PrintScreen](/assets/oscommerce/oscommerce_07.jpg)

6. After installing the plugin, the list of installed modules of the ```Payu Latam``` plugin appears in the right panel.

![PrintScreen](/assets/oscommerce/oscommerce_08.jpg)

## Configuration
1. In the Payment section, select the _**Payu Latam**_ payment method and click the _**Edit**_ button in the right panel.

![PrintScreen](/assets/oscommerce/oscommerce_09.jpg)

2. The following configuration form appears:

<img src="/assets/oscommerce/oscommerce_10.jpg" width="30%" alt="PrintScreen"/>
<br>

Configure it using the information of your PayU account as follows:

| Field             | Value                                                                                      |
|-------------------|--------------------------------------------------------------------------------------------|
| Enable / Disable  | Select **True** to enable the osCommerce payment gateway.                                  |
| Merchant ID       | ID of your commerce in PayU Latam                                                          |
| Account ID        | ID of the PayU account according to the country where you want to sell.                    |
| API key           | Unique key of your commerce, you can find this key in the PayU module.                     |
| Gateway URL       | Gateway URL.<br>For test, you can use https://sandbox.gateway.payulatam.com/ppp-web-gateway and for production https://gateway.payulatam.com/ppp-web-gateway/                                                        |
| Transaction Mode  | Select **Test** if you want to process in the Test environment. Otherwise, select **Live**.|
| Response page     | URL of the response page.<br>By default, the URL is http://your.domain.com/yourOscommerceFolder/catalog/response_payu.php, you must replace http://your.domain.com with your site's domain.                              |
| Confirmation page | URL of the confirmation page.<br>By default, the URL is http://your.domain.com/yourOscommerceFolder/catalog/confirmation_payu.php, you must replace http://your.domain.com with your site's domain.                  |

3. Save the changes using the button at the bottom of the panel.

4. Finally, go expand the _**Localization**_ menu and click _**Order Status**_. Verify that the order status were created according to the installed languages (English, Spanish, and Portuguese) in your osCommerce website.

![PrintScreen](/assets/oscommerce/oscommerce_13.jpg)

The valid states are:
* For English: ```Approved```, ```Rejected```, ```Failed```, and ```Pending```.
* For Spanish: ```Aprobada```, ```Rechazada```, ```Fallida```, and ```Pendiente```.
* For Portuguese: ```Aprovado```, ```Recusada```, ```Falha```, and ```Pendente```.

{{% alert title="Note" color="info"%}}

If you don't have any of the languages mentioned before, the states does not appear in the list. If you want to install a language later, you can create these states manually using the same names displayed above. 

{{% /alert %}} 

At this point, your customers can pay with PayU Latam when they do the checkout in the osCommerce's shopping cart. 