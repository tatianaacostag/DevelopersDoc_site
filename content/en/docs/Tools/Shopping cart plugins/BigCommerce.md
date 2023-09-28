---
title: "BigCommerce"
linkTitle: "BigCommerce"
date: 2023-04-27T10:30:35-05:00
description:
  This article shows you the procedure to enable PayU on your BigCommerce website. 
weight: 11
tags: ["subtopic"]
---

BigCommerce is a digital commerce platform that allows you to quickly create an online store with ready-to-use functionalities. For more information, take a look at the official BigCommerce page: [BigCommerce webpage](https://www.bigcommerce.com/press/).

## Prerequisite
* You need an active account in PayU Latam.
* You need an account with BigCommerce.

## How to install the extension
1. Install the app from the BigCommerce Marketplace by clicking the install button.


![](/assets/BigCommerce/Imagen1.png)







2.	Click the checkbox and click the ‘Confirm’ button to install the app.


![](/assets/BigCommerce/Imagen2.png)







3. The app interface appears as follows:


![](/assets/BigCommerce/Imagen3.png)







## How to use this extension
### Configure Payment Methods
Configure the payment methods to be displayed on the website for checkout. [Consult our available Payment methods]({{< ref "Select-your-payment-method.md" >}}).



1. After installing the application select **Enable PayU Latam** to allow the app in the BigCommerce store.  


![](/assets/BigCommerce/Imagen4.png)





![](/assets/BigCommerce/Imagen4B.png)







2. Select a custom title for the card payment option (e.g., Pay by Card). This title will be visible on the checkout page for your customers.  


![](/assets/BigCommerce/Imagen5.png)







3. Choose the way you want the available card payment options to be displayed at the checkout. You can choose one of the following options:  


*	Show Powered by PayU Latam and logo on payment form

*	Show credit card logo on checkout page



![](/assets/BigCommerce/Imagen7.png)



{{% alert title="Important" color="warning"%}}
If the merchant wants to allow alternative payment methods (cash and bank transfers) select the "Enable Web Checkout (APM)” option.
{{% /alert %}}









4. Use the 'Add Provider' button to add the provider for a specific PayU Latam country. Each provider can be enabled/disabled from the grid using the respective status button. You can also click ‘Edit’ to update the credentials, and remember that in the configuration of your accounts you can choose whether you want to use them in test mode or in a productive environment.


![](/assets/BigCommerce/Imagen8.png)


![](/assets/BigCommerce/Imagen9.png)









To add a new provider, specify the following mandatory fields:
| Parameter | Description |
|---|---|
| Select Payu Latam country | Choose the country you want to configure |
| API Login | User or login provided by PayU. [How do I get my API Login](https://developers.payulatam.com/latam/en/docs/integrations.html#api-key-and-api-login) |
| API Key | Unique key of your commerce. [How do I get my API Key](https://developers.payulatam.com/latam/en/docs/integrations.html#api-key-and-api-login) |
| Public Key| Unique key of your commerce. [How do I get my Public Key](https://developers.payulatam.com/latam/en/docs/integrations.html#api-key-and-api-login) |
| Account ID | ID of the PayU account according to the country where you want to sell. |
| Merchant ID | ID of your commerce in PayU Latam. |














5. Choose if your payment transactions are executed in a one-step or two-step flow: 

* For one-step flow, select **Capture on order placed**.

* For two-step flow, select **Capture on Shipment**.

![](/assets/BigCommerce/Imagen10.png)

Refer to the following [link](https://developers.payulatam.com/latam/en/docs/services/payments.html#payment-flows) to learn more about the Payment flows.

{{% alert title="Important" color="warning"%}}
The option of processing in more than one step only applies to card payments (subject to [availability](https://developers.payulatam.com/latam/en/docs/services/payments.html#payment-flows) in each country). Transactions with other payment methods will perform authorization and capture in a single step.
{{% /alert %}}

{{% alert title="Note" color="info"%}}
Multistore options will be visible below the payment options section.
![](/assets/BigCommerce/Imagen10B.png)
{{% /alert %}} 







### Manage your orders

1. To access the Order Dashboard, click the ‘Order Dashboard’ button.

![](/assets/BigCommerce/Imagen11.png)







2. The Order Dashboard grid will show the payment statuses for the order placed.

![](/assets/BigCommerce/Imagen12.png)







3. To process a refund, click the ‘Refund button’ on the Order Dashboard grid item.

![](/assets/BigCommerce/Imagen13.png)

{{% alert title="Important" color="warning"%}}
* Refunds are only available for transactions paid with card.
* To learn more about the particularities of refunds in each country where PayU operates, click [here](https://developers.payulatam.com/latam/en/payu-module-documentation/payu-operations/refunds-mp.html).
{{% /alert %}}







## Testing the integration 
Once you have configured the payment conditions for your payment methods, it is strongly recommended to test your integration before starting to receive real transactions. As a prerequisite, make sure you add a provider with test credentials in your BigCommerce Configuration.

1. Log in to your store and select the product you wish to purchase for testing. At the moment of finalizing the purchase, fill in the data and keep in mind that the country selected must be the country where the product will be shipped. As an example, if the shipping is to Argentina, then select Argentina from the drop-down country options.

![](/assets/BigCommerce/Imagen14.png)







2. You will then be able to select the desired payment method.  

**Checkout Payment Selection:**

*	**Card:** Specify the card details, then click the ‘Pay By Card’ option.

![](/assets/BigCommerce/Imagen15.png)

{{% alert title="Note" color="info"%}}
Remember you can select a custom title for the card payment option during the configuration of PayU Latam in your BigCommerce account (e.g., you can change “Pay by Card” for “Pay”).
{{% /alert %}} 

* **Pay by Web Checkout:** For other payment methods select the ‘Pay by Web Checkout’ button. Provide the details and confirm payment.

![](/assets/BigCommerce/Imagen16.png)

![](/assets/BigCommerce/Imagen17.png)

![](/assets/BigCommerce/Imagen18.png)






3. Once the purchase has been approved, you can check it in:

* BigCommerce Order Dashboard: **_PayU Latam > Order Dashboard_**

![](/assets/BigCommerce/Imagen6.png)

* PayU Module: In the **_Sales Report module_**.

![](/assets/BigCommerce/Imagen19.png)







## Support Options:
If you experience a technical issue or have any questions about this extension, please contact our support team **tecnico.co@payu.com** or visit our website **https://colombia.payu.com/contactanos/**. If you choose to email us, please provide details of the extension being used in the subject field and a summary of the issue you’re experiencing in the body copy.








