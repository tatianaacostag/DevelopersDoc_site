---
title: "VirtueMart"
linkTitle: "VirtueMart"
date: 2021-05-26T08:39:05-05:00
description:
  This article shows you the procedure to enable PayU on your VirtueMart website.
weight: 40
tags: ["subtopic"]
---

## Prerequisites
* You need an active account in PayU Latam.
* For VirtueMart version 2 or higher:
  * Having the PayU's VirtueMart plugin downloaded and stored in an accessible location. Click [here](http://developers.payulatam.com/plugins/plugin-joomla-virtuemart2.6.7.zip) to download it.
  * Having VirtueMart version 2 or higher installed.
  * Your VirtueMart website must be installed on [Joomla!®](https://joomla.org/) 2.5 or higher with MySQL 5.1 or higher.
* For VirtueMart version 3.0.6:
  * Having the PayU's VirtueMart plugin downloaded and stored in an accessible location. Click [here](http://developers.payulatam.com/plugins/plugin-joomla-virtuemart3.0.6.zip) to download it. 
  * Having VirtueMart version 3.0.6 installed.
  * Your VirtueMart website must be installed on [Joomla!®](https://joomla.org/) versions 3.3.6, 2.5.28 or 2.5.27.

## Plugin for VirtueMart 2 or higher
Follow the next procedure to install and configure the plugin on your website.

### Installation

1. Open the _Joomla!® Administrator Console_ and select the _**Extension Manager**_ option located in the _**Extension**_ menu.

![PrintScreen](/assets/VirtueMart/VirtueMart_01.jpg)

2. In the _**Upload Package File**_ section, click _**Browse**_ and locate the _.zip_ file of the PayU plugin downloaded.

![PrintScreen](/assets/VirtueMart/VirtueMart_02.jpg)

3. Once the installation procedure completes, a message appears to inform that the installation was successful.

![PrintScreen](/assets/VirtueMart/VirtueMart_03.jpg)

### Configuration
1. Expand the option _**Shop**_ in the _**VirtueMart**_ menu and select _**Payment methods**_. Then, click _**New**_ at the top right of the screen.

![PrintScreen](/assets/VirtueMart/VirtueMart_04.jpg)

2. In the _**Payment Method Information**_ tab, set _Payulatam_ as _**Payment Name**_ and select ```PayuLatam``` in the _**Payment Method**_ field.

![PrintScreen](/assets/VirtueMart/VirtueMart_05.jpg)

3. Go to the _**Configuration**_ tab and provide the information of your account and your API key. 

![PrintScreen](/assets/VirtueMart/VirtueMart_06.jpg)

Furthermore, provide the connection URL to the gateway and the configuration variables explained in the [Configuration variables]({{< ref "#configuration-variables" >}}) section.

The URLs for test and production environments are:
* Test: ```https://sandbox.gateway.payulatam.com/ppp-web-gateway```
* Production: ```https://gateway.payulatam.com/ppp-web-gateway/```

4. Finally, click _**Save**_ or _**Save & Close**_ button. At this point, your customers can pay with PayU Latam using the VirtueMart shopping cart. 

## Plugin for VirtueMart 3.0.6
Follow the next procedure to install and configure the plugin on your website.

### Installation

1. Open the _Joomla!® Administrator Console_ and select the option _**Extension Manager**_ inside the _**Extensions**_ menu.

![PrintScreen](/assets/VirtueMart/VirtueMart3_02.jpg)

2. In the _**Extension package file**_ field, choose the previously downloaded _.zip_ file. 

![PrintScreen](/assets/VirtueMart/VirtueMart3_03.jpg)

3. Once the _.zip_ file is loaded, click _**Upload & Install**_.

![PrintScreen](/assets/VirtueMart/VirtueMart3_05.jpg)

4. Once the installation procedure completes, a message appears to inform that the installation was successful.

![PrintScreen](/assets/VirtueMart/VirtueMart3_06.jpg)

### Configuration
1. In the left menu, click _**Manage**_. Find and enable the ```PayuLatam``` plugin.

![PrintScreen](/assets/VirtueMart/VirtueMart3_07.jpg)

A message appears informing that you have enabled the plugin. Furthermore, the icon changes to a check mark.

![PrintScreen](/assets/VirtueMart/VirtueMart3_08.jpg)

2. Open the _**Components**_ menu and expand the _**Virtuemart**_ option. Then, select _**Payment Methods**_.

![PrintScreen](/assets/VirtueMart/VirtueMart3_09.jpg)

3. In the opened window, click _**New**_ to create a payment method using the ```PayuLatam``` plugin.

![PrintScreen](/assets/VirtueMart/VirtueMart3_10.jpg)

4. In the _**Payment Method Information**_ tab, set _Payulatam_ as _**Payment Name**_ and select ```PayuLatam``` in the _**Payment Method**_ field.

![PrintScreen](/assets/VirtueMart/VirtueMart3_11.jpg)

5. Go to the _**Configuration**_ tab and provide the information of your account and your API key. 

![PrintScreen](/assets/VirtueMart/VirtueMart3_13.jpg)

Furthermore, provide the connection URL to the gateway and the configuration variables explained in the [Configuration variables]({{< ref "#configuration-variables" >}}) section.

The URLs for test and production environments are:
* Test: ```https://sandbox.gateway.payulatam.com/ppp-web-gateway```
* Production: ```https://gateway.payulatam.com/ppp-web-gateway/```

6. Finally, click _**Save**_ or _**Save & Close**_ button. At this point, your customers can pay with PayU Latam using the VirtueMart shopping cart. 

## Configuration variables
Regardless of the VirtueMart version you use, set and configure the following variables in your plugin:

| Field                                | Value                                                                                 |
|--------------------------------------|---------------------------------------------------------------------------------------|
| Logo                                 | Logo displayed for the **PayuLatam** payment method.                                  |
| Test URL                             | Gateway URL for test: ```https://sandbox.gateway.payulatam.com/ppp-web-gateway```.    |
| Production URL                       | Gateway URL for production: ```https://gateway.payulatam.com/ppp-web-gateway```.      |
| Test Mode                            | Select **Yes** if you want to make transactions in the test environment. When you enable this option, VirtueMart uses the URL configured in the **Test URL** variable                                            |
| Merchant ID                          | ID of your commerce in PayU Latam.                                                    |
| Account ID                           | ID of the PayU account according to the country where you want to sell.               |
| API Key                              | Unique key of your commerce, you can find this key in the PayU module.                |
| Section **ORDER STATUS PARAMS**<br><ul style="margin-bottom: initial;"><li>Approved Transactions</li><li>Pending Transactions</li><li>Declined Transactions</li></ul> | Defines the order state in VirtueMart according to the transaction state returned by PayU. We suggest to keep the default states; nevertheless, you can configure them according to your business needs.            |
| Currency                             | Set USD. Also, you can configure the currency of the Account ID country.              |
| Minimum Value / Maximum value        | The total value of an order must be within this range in to activate the **PayuLatam** payment method.                                                                                                  |
| Tax                                  | To use this option, configure the corresponding VirtueMart rule to the associated tax. For example, IVA for Colombia.                                                                                                 |