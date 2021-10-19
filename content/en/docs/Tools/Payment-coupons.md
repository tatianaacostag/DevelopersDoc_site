---
title: "Payment Coupons"
linkTitle: "Payment Coupons"
date: 2021-04-07T09:27:50-05:00
Description: >
  Through the _Cash charges_ module, you can generate payment coupons with the necessary information to let your clients make cash payments as many times as they need in the available payment points.
weight: 70
---

This solution is useful for businesses who need to receive payments on a regular basis such as paying memberships, courses, memberships or catalog and telesales, and more.

You can receive payments without any technical knowledge. You just need to send an e-mail where your client can download the coupon and makes the respective payment.

{{% alert title="Note" color="info"%}}

LOS CUPONES Payment coupons are available for Argentina using _**RAPIPAGO**_ and _**PAGOFACIL**_, and for Colombia using _**BALOTO**_ and _**EFECTY**_.

{{% /alert %}}  

## How Payment coupons work?
The Payment coupon follows a simple flow to let your clients regular cash payments as many times as they need:

1. **Configure the Payment coupon through the PayU module**.<br>You only need to provide how many payments per client you want to receive, decide if the payment amount is fixed or your client decides the amount, decide the payment deadline, and the payment reference.

2. **Decide the delivery of the coupon**<br>Decide if you want to deliver the coupons by e-mail, by generating PDF, by payment references or collection cards (Available only for Argentina). 

3. **Use the Payment coupons**<br>When your clients receive the coupon, they can make the payment using any of the available cash payment offices in their countries.<br>Every time a client pays using the coupon, you receive a confirmation message and the amount of the purchase<sup>*</sup> is transferred to your PayU account, where you can transfer it to your bank account.

<sup>*</sup>_The value transferred corresponds to the amount paid by your client minus the PayU fee._

## Creating payment coupons
According to your business needs, you can configure the options to receive payments using coupons. Follow the next procedure to create Payment coupons and delivery them to your clients.

1. Log in to [PayU.com](payu.com) and click the login option located at the top of the page. Alternatively, you can log in to https://merchants.payulatam.com/.

2. Expand the **Sell with PayU** option and then, select **Cash Payment**.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons.png)

3. Configure the following information:

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_01.png)

* **How many payments do you expect to receive for each client?**: select how many times a client can use the coupon. Select _Unique_ if you want to let your client pay once. Otherwise, select _Multiple_ for several payments while the coupon is available. The default value is _Multiple_.

* **Will you charge a specific amount?**: select the payment amount of the coupon. If you select _No_, your client decides the value to pay at the payment office. The default value is _No_.

* **Payment deadline**: decide whether the payment coupon expires in a given date. The date specified is fixed, it is not supported to provide a specific day of the month or other custom configuration. If you select _No_, the coupon will not have a due date. The default value is _No_.

* **Do you want to define the payment reference?**: if you select _Yes_ you need to provide the payment references for the coupon. Otherwise, PayU defines and sets an automatic reference. The default value is _No_. 

## Sharing the Payment coupon
After you have configured the Payment coupons, decide how you want to deliver them to your client.<br>You have available the following options:

### Send via e-mail 
This option lets you send the Payment coupon via e-mail. The clients receive the e-mail and print the coupon to let them pay in cash in the available offices.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_02.png)

To add the clients one by one, provide the following information:

* Email: e-mail of the client who receives the coupon.
* Payer name: name of the client.
* Payment description: description of the payment.
* Amount: this field is available when you define the amount payed by your client and takes the defined value.
* Expiration date: this field is available when you define an expiration date of the coupon.
* Payment reference: this field is available when you define that you want to set your own payment reference for the coupon.

Click _**Add**_ button to save the clients data and add an extra client if required.

To add multiple clients, click **Add multiple payers from one file** and download the sample file by clicking **Download format**.

The Excel file downloaded is by default in Spanish and each row corresponds to a client. Provide the information of the example and upload it to the PayU module.

Regardless of the option selected, click **Continue**.

A new window appears showing the resume of the emails to be sent.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_03.png)

If you want to edit the information of the issuer and the e-mail, click Edit link displayed in the top right corner of each section.

Finally, click **Send email**. Each client receive an e-mail with the coupon.

### Print the coupons
This option lets you generate coupons in PDF format.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_04.png)

To add the clients one by one, provide the following information:

* Payer name: name of the client.
* Payment description: description of the payment.
* Amount: this field is available when you define the amount payed by your client and takes the defined value.
* Expiration date: this field is available when you define an expiration date of the coupon.
* Payment reference: this field is available when you define that you want to set your own payment reference for the coupon.

Click _**Add**_ button to save the clients data and add an extra client if required.

To add multiple clients, click **Add multiple payers from one file** and download the sample file by clicking **Download format**.

The Excel file downloaded is by default in Spanish and each row corresponds to a client. Provide the information of the example and upload it to the PayU module.

Regardless of the option selected, click **Continue**.

A new window appears showing the resume of the PDF to be generated.

<img src="/assets/PaymentCoupons/PaymentCoupons_05.png" alt="PrintScreen" width="60%"/><br>

If you want to edit the information of the issuer, click _**Edit**_ link displayed in the top right corner of the issuer section section.

Finally, click **Generate coupons in PDF**. A PDF file is downloaded, each page has the coupon generated per each client.

### Generate Payment references
This option lets you generate an Excel file with the coupons requested.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_06.png)

To add the clients one by one, provide the following information:

* Payer name: name of the client.
* Payment description: description of the payment.
* Amount: this field is available when you define the amount payed by your client and takes the defined value.
* Expiration date: this field is available when you define an expiration date of the coupon.
* Payment reference: this field is available when you define that you want to set your own payment reference for the coupon.

Click _**Add**_ button to save the clients data and add an extra client if required.

To add multiple clients, click **Add multiple payers from one file** and download the sample file by clicking **Download format**.

The Excel file downloaded is by default in Spanish and each row corresponds to a client. Provide the information of the example and upload it to the PayU module.

Regardless of the option selected, click **Generate references in Excel**.

The download starts immediately. Furthermore, a new window appears showing the number of references generated. In this window, you can also send the Excel file to whoever you need.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_07.png)

### Create collection cards
This option lets you generate cards with the information required to let your clients to be able to make cash payments at the available payment points every time they need to.

This option is available when you don't set a fixed payment amount nor a payment deadline.

{{% alert title="Note" color="info"%}}

<img src="/assets/Argentina.png" width="25px"/> **Available only for Argentina.**

{{% /alert %}}  

Collection cards are plastic cards associated to your PayU account; they have a bar code and you can include a reference code printed on them.

Once your cards have been generated, deliver them to your customers and they can pay the amount in cash they wish and without any expiration date.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_08.png)

To request the cards, you need to provide the following information:

* Design of your collection cards: choose a predefined or custom design for your cards. Custom cards are available from 1000 cards.
* How many cards do you want to request?: select the number of cards you want to generate according to the design you choose.
* Delivery address: Click _**Edit**_ at the top right corner of this panel to provide the address where you want to receive the cards.
* Payment summary: we calculate the cost of your order depending on the quantity of cards requested and the design you choose.

{{% alert title="Note" color="warning"%}}

This order will be debited from your PayU account and you must have an available balance.

{{% /alert %}} 

Click _**Request cards**_ to continue. A confirmation window appears to let you validate the information of your request.

<img src="/assets/PaymentCoupons/PaymentCoupons_09.png" alt="PrintScreen" width="60%"/>

## Consult the created coupons
When you have created coupons or collection cards, you can consult their information to see the received payments, enable, disable, or download the coupon or card.

1. In the PayU Module, expand the **Sell with PayU option** and then, select **My tools**.

<img src="/assets/PaymentCoupons/PaymentCoupons_10.png" alt="PrintScreen" width="60%"/><br>

2. Select either _**Collection by cash**_ or _**Collection cards**_  tab according to your needs.

3. You can use the Advanced filter option to find a specific set of coupons.

<img src="/assets/PaymentCoupons/PaymentCoupons_11.png" alt="PrintScreen" width="60%"/><br>

4. Each coupon present the options to disable/enable or download the coupon. Once the coupon is disabled, it cannot receive more payments.<br>Find these options in the three dot menu in the _**status**_ column.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_12.png)

