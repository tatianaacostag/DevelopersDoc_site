---
title: "Integration settings"
linkTitle: "Integration settings"
date: 2021-11-18T13:40:06-05:00
type: docs
Description: >
   Get the integration settings displayed in the Módulo Administrativo.
weight: 27
nosidetoc: true
---

{{% alert title="Nota" color="warning"%}}
Este artículo ha sido deprecado y no se ofrece a comercios nuevos.
{{% /alert %}}

## Technical information
This section contains the necessary information to perform the technical integration of your website with our transaction platform.

1. You can see this information by accessing the _**Configuration**_ menu and clicking _**Technical Settings**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/tecnica1-en.jpg)

You will find the following technical data:

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/tecnica2-en.jpg)

2. You will be able to charge your logo clicking on the _**search image**_ button.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/tecnica3-en.jpg)
 
## Account settings
In this section, you can configure technical properties belonging to each active account as:
* URL settings for confirmation and response pages.
* Enable the option of sending emails to the buyer and to your store when a sale takes place.
* Define a unique reference number for each sale you make through your website.

You can see this information by accessing the _**Configuration**_, menu and clicking on _**Account Settings**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/configuracion1-en.jpg)

You will find the properties you can set:
* _**Choose the account**_: You must choose the account to activate the particular configuration. Choosing it will display the country which corresponds with that account.
* _**Response URL**_: The page to which the buyer will be direct once the transaction in PayU ends. This page will display the status of the transaction.
* _**Confirmation URL**_: The page to which PayU will send the payment confirmation to your system in order to update inventory and database once the transaction reaches its final state. This page is not mandatory.
* _**Email to the buyer**_: By enabling this option, PayU will send an email from to the buyer confirming if the payment was approved or rejected.
* _**Email to the seller**_: Enabling this option will send an email from PayU to your shop, confirming if the payment was approved or rejected.
* _**Sending confirmation page**_: Enabling this option will send the payment confirmation to the configured confirmation page once the transaction reaches its final state.
* _**Validate unique reference**_: Enabling this option will validate that each payment reference sent to our system is unique. If the checkbox is unmarked, you will be able to send the same reference for all your sales. This function is useful if you want to control subjects like billing, inventories or to identify the orders sent from your store to PayU.
* _**Transaction in test mode**_: When you enable this option, the transactions made through your website or through payment request, will be marked as a test and payment will not be real. You must disable this option when you want to start receiving actual payments.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/activar8-en.jpg)