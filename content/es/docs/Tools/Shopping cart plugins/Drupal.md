---
title: "Drupal"
linkTitle: "Drupal"
date: 2021-05-26T08:38:45-05:00
description:
  Este artículo te muestra el procedimiento para habilitar PayU en tu sitio web de Drupal.
weight: 30
tags: ["subtopic"]
---

## Prerequisites
* You need an active account in PayU Latam.
* Having installed [Drupal Commerce Kickstart 7.xx](https://www.drupal.org/project/commerce_kickstart).
* Having the PayU's Drupal plugin downloaded and stored in an accessible location. Click [here](http://developers.payulatam.com/plugins/commerce_payulatam_1.0.zip) to download it.
* Having access to the Drupal installation folder.
* Having access to the Drupal backend.

## Installation
The process to install the plugin in the Drupal server only requires to unzip the plugin in path ***\sites\all\modules***. The unzipped folder has the following structure:

![PrintScreen](/assets/Drupal/Drupal_01.png)

## Configuration
1. Log in to the Drupal's administration panel. Open the _**Site settings**_ menu and click _**Modules**_ option inside the _**Advanced settings**_ section.

![PrintScreen](/assets/Drupal/Drupal_02.png)

2. Locate and activate the module _**Payment Payulatam**_. YOu can use the search filter to find it easier.<br>
Once finish, click _**Save configuration**_.

![PrintScreen](/assets/Drupal/Drupal_03.png)

3. Back in the Drupal's administration panel. Open the _**Store settings**_ menu and click _**Payment methods**_.<br>
Find _**Payment gateway PayuLatam**_ in the _**Disabled payment method rules**_ list and click _**enable**_.

![PrintScreen](/assets/Drupal/Drupal_04.png)

If the activation was successful, Drupal shows the following message

![PrintScreen](/assets/Drupal/Drupal_05.png)

4. Now, click _**edit**_ link in the recently enabled method.<br>
Then, locate the _**Actions**_ section and click _**edit**_ next to the action _**Enable payment method: PayuLatam**_. Here, configure the plugin using your PayU account.

![PrintScreen](/assets/Drupal/Drupal_06.png)

* **API KEY**: Unique key of your commerce, you can get this information in your PayU Module (**_Settings_** > **_Technical configuration_** > **_API Key_**).
* **Merchant Id**: ID of your commerce in PayU Latam.
* **Account Id**: ID of the PayU account according to the country where you want to sell.
* **Test Enabled**: Set ```No``` if you want to process in the Production environment. Otherwise, set ```Yes```.

Leave the other fields with their pre-configured values.

{{% alert title="Note" color="info"%}}

For testing purposes, you can use the **Merchant ID**, **APIKey**, and **Account ID** available in [Test Your Solution](../../getting-started/test-your-solution.html).

Once you are in the credit card payment form, and ensuring that you have the message at the top of the gateway _Transaction in test mode_, you must:

* Enter the text ```APPROVED``` in the Full Name field if you want the transaction to be approved, ```REJECTED``` if you want it to be rejected or ```PENDING``` if you want it to be pending.
* You must enter a valid card number in the Card Number field according to the selected franchise. For this, you can use an online credit card generator.
* All other fields can be random.

{{% /alert %}}  

At this point, your customers can pay with PayU Latam when they do the checkout in the Drupal's shopping cart. 

