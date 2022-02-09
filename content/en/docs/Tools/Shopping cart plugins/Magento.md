---
title: "Magento"
linkTitle: "Magento"
date: 2021-05-26T08:38:26-05:00
description:
  This article shows you the procedure to enable PayU on your Magento website.
weight: 20
tags: ["subtopic"]
---

## Prerequisites
* You need an active account in PayU Latam.
* Having installed Magento version 1.7.x to 1.9.x.
* Having the PayU's Magento plugin downloaded and stored in an accessible location. Click [here](http://developers.payulatam.com/plugins/Plugin_PayU_Magento-1.3.zip) to download it.
* You need access to the folders where Magento is installed.
* You need access to the Magento Admin Panel.

{{% alert title="Note" color="info"%}}
For Magento version 2.0, follow the assisted guidelines offered by **élOOm** to install and configure PayU in your Magento site. Click [here](https://docs.eloom.tech/es/payment/payu-latam)<sup>\*</sup> for more information or email suporte@eloom.com.br for custom assistance.

<sup>\*</sup>_This guide is available in Spanish and Portuguese_.
{{% /alert %}}  

## Considerations
* Approved payments appear with _Processing_ status in the orders report.
* Once the payment is received correctly, Magento creates an invoice with the associated order.

## Installation
Follow the next procedure to install the plugin on your website.

1. Log in to your Magento admin panel. Then, expand the _**System**_ menu at the top and click _**Cache Management**_.<br>
In the new window, click _**Flush Magento Cache**_.

![PrintScreen](/assets/Magento/Magento_01.png)

2. Unzip the plugin. The plugin folder is called `app` and it has the following structure:

![PrintScreen](/assets/Magento/Magento_02.png)

3. Navigate to ***[PluginFolder]\app\code\local*** and copy the **Gfgrisales** folder into the ***\app\code\local*** folder in the root of the Magento installation folder.<br>
If this structure does not exist in your installation, create it with read and write permissions.

![PrintScreen](/assets/Magento/Magento_03.png)

4. Navigate to ***[PluginFolder]\app\design\frontend\base\default\template*** and copy the **payu** folder into the ***\app\design\frontend\base\default\template*** folder in the root of the Magento installation folder.

![PrintScreen](/assets/Magento/Magento_04.png)

5. Navigate to ***[PluginFolder]\app\etc\modules*** and copy the **Gfgrisales_Payu.xml** file into the ***\app\etc\modules*** folder in the root of the Magento installation folder.

![PrintScreen](/assets/Magento/Magento_05.png)

## Configuration
1. Back in your Magento admin panel, expand the _**System**_ menu and click _**Configuration**_. Then, expand _**Advanced**_ section in the menu displayed on the left panel and click _**Advanced**_ option.<br>
Click _**Disable Modules Output**_ and check that the PayU extension called *Gfgrisales_Payu* is enabled.

![PrintScreen](/assets/Magento/Magento_06.png)

2. In the _**Configuration**_ menu on the left panel, expand _**Sales**_ section in the menu displayed on the left panel and click _**Payment methods**_ option.<br>
Find and expand the _**PayU**_ method and provide the information of your PayU Account.

![PrintScreen](/assets/Magento/Magento_07.png)

* **Merchant ID**: ID of your commerce in PayU Latam.
* **APIKey**: Unique key of your commerce, you can get this information in your PayU Module (**_Settings_** > **_Technical configuration_** > **_API Key_**).
* **Account ID**: ID of the PayU account according to the country where you want to sell.
* **Gateway URL**: Gateway URL.
  * For test, use https://sandbox.gateway.payulatam.com/ppp-web-gateway
  * For production, use https://gateway.payulatam.com/ppp-web-gateway/

{{% alert title="Note" color="info"%}}

For testing purposes, you can use the **Merchant ID**, **APIKey**, and **Account ID** available in [Test Your Solution]({{< ref "Test-your-solution.md" >}}).

Once you are in the credit card payment form, and ensuring that you have the message at the top of the gateway _Transaction in test mode_, you must:

* Enter the text `APPROVED` in the Full Name field if you want the transaction to be approved, `REJECTED` if you want it to be rejected or `PENDING` if you want it to be pending.
* You must enter a valid card number in the Card Number field according to the selected franchise. For this, you can use an online credit card generator.
* All other fields can be random.

{{% /alert %}}  

Once finish, click _**Save Config**_ to apply changes.

At this point, your customers can pay with PayU Latam when they do the checkout in the Magento's shopping cart. 

