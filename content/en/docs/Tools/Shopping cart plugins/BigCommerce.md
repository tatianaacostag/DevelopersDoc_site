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







3. Choose the way you want the available card payment options to be displayed at the checkout. You can choose between one of the following options:  


*	Show Powered by PayU Latam and logo on payment form

*	Show credit card logo on checkout page


![](/assets/BigCommerce/Imagen6.png)



{{% alert title="Important" color="warning"%}}
If the merchant wants to allow alternative payment methods (cash and bank transfers) select the "Enable Web Checkout (APM)” option.
{{% /alert %}}


![](/assets/BigCommerce/Imagen7.png)










4. Use the 'Add Provider' button to add the provider for a specific PayU Latam country. Each provider can be enabled/disabled from the grid using the respective status button. You can also click ‘Edit’ to update the credentials.


![](/assets/BigCommerce/Imagen8.png)


![](/assets/BigCommerce/Imagen9.png)


{{% alert title="Note" color="info"%}}
To add a new provider, specify the following mandatory fields:

| Parameter | Description |
|---|---|
| Select Payu Latam country | Choose the country you want to configure |
| API Login | User or login provided by PayU. How do I get my API Login |
| API Key | Unique key of your commerce. How do I get my API Key |
| Public Key| Unique key of your commerce. How do I get my Public Key |
| Account ID | ID of the PayU account according to the country where you want to sell. |
| Merchant ID | ID of your commerce in PayU Latam. |

{{% /alert %}} 






5. Choose if your payment transactions are executed in a one-step or two-step flow: 

* For one-step flow, select **Capture on order placed**.

* For two-step flow, select **Capture on Shipment**.




Payment Options:
![](/assets/BigCommerce/Imagen10.png)

Multistore options will be visible below the payment options section:
![](/assets/BigCommerce/Imagen10B.png)







6. To access the Order Dashboard, click the ‘Order Dashboard’ button.

Order Dashboard:
![](/assets/BigCommerce/Imagen11.png)







7. The Order Dashboard grid will show the payment statuses for the order placed.
![](/assets/BigCommerce/Imagen12.png)







8. To process a refund, click the ‘Refund button’ on the Order Dashboard grid item.

Refund:
![](/assets/BigCommerce/Imagen13.png)







9. As an example, if the shipping is to Argentina, then select Argentina from the drop down country options.

Checkout Country Selection:
![](/assets/BigCommerce/Imagen14.png)







10. At the store checkout, customers have the option to select their payment method.

**Checkout Payment Selection:**



•	**Pay By Card:** Specify the card details, then click the ‘Pay By Card’ option.

![](/assets/BigCommerce/Imagen15.png)




•	**Pay By Web Checkout:** 

A. Click the ‘Pay By Web Checkout’ button.

![](/assets/BigCommerce/Imagen16.png)



B. Select the payment method 

![](/assets/BigCommerce/Imagen17.png)



C. Provide the details and click the button below to confirm payment.

![](/assets/BigCommerce/Imagen18.png)





## Support Options:
If you experience a technical issue or have any questions about this extension, please contact our support team on tecnico.co@payu.com or by visiting our website at https://colombia.payu.com/contactanos/. If you choose to email us, please provide details of the extension being used in the subject field and a summary of the issue you’re experiencing in the body copy.








