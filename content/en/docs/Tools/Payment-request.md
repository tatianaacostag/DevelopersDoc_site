---
title: "Payment Request"
linkTitle: "Payment Request"
date: 2021-04-07T09:26:46-05:00
Description: >
  With payment requests generated from your PayU module, you can charge to your customers without having a website. To receive payments with this solution, all you need is an active account in PayU.
weight: 10
---

You can choose to receive a total payment or send your customers a detailed description of the sale. You can send your payment request via email or generate a link to share it in chat rooms or social networks. Once your customer receives it, they can make the payment through our secure payment system.

With the Payment Request, you have the following benefits:
* Sell online regardless if you don't have a website using email, social networks or, message exchange platforms.
* Offer several payment methods.
* Discriminate the payments you receive so you can know who pays what and when.

## How does the Payment request work?
The Payment request follows a simple flow to let your customers buy your products or services using the secure PayU platform:

1. Generate the Payment request through the PayU module. For a basic payment request, you only need to provide what you want to sell, its price, and decide whether your payment includes taxes or an expiration date. If you want to include additional information such as shipping, payment reference, comments, and more, you can create a Custom payment request.

2. Once the link has been generated, you can share it with your customers either by email, posting the link on social networks, or including this link in your website (if you have one).

3. When your customers use the link, they are redirected to the PayU's checkout page, where they can pay using any of the [available payment methods]({{< ref "Select-your-payment-method.md" >}}).

4. Every time a customer pays using the link, you receive a confirmation message and the amount of the purchase<sup>*</sup> is transferred to your PayU account, where you can transfer it to your bank account.

<sup>*</sup>_The value transferred corresponds to the amount paid by your customer minus the PayU fee._

## Creating payment requests
According to your business needs, you can create  two types of Payment requests: Basic and Custom.

A _Basic Payment Request_ lets you create a link just by providing the product's name and price; furthermore, you can decide whether you need to include taxes or whether the link may expire in the future. The _Custom Payment Request_ is a payment link with extra information such as shipping information, payment reference, response pages, comments or narrow down the available payment methods.

### Create a Basic Payment Request
Follow the next procedure to create a Basic Payment Request and share it with your customers.

1. Log in to [PayU.com](payu.com) and click the login option located at the top of the page. Alternatively, you can log in to https://merchants.payulatam.com/.

2. Expand the **Sell with PayU option** and then, select **Sell on the internet**.

![PrintScreen](/assets/PaymentRequest/PaymentRequest_01.png)

3. Provide the following information:

![PrintScreen](/assets/PaymentRequest/PaymentRequest_02.png)

* **What are you going to sell?**: description of the product you want to sell using this payment request.
* **What is the price?**: provide the amount of the product and select the currency.

  ![PrintScreen](/assets/PaymentRequest/PaymentRequest_03.png)

* **Do you charge tax?**: choose if the product price includes taxes. If so, select the percentage or fixed amount of the taxes.

  ![PrintScreen](/assets/PaymentRequest/PaymentRequest_04.png)

* **Payment deadline**: choose if the Payment request expires in a given time. If so, select the date and time when the Payment request expires.

  ![PrintScreen](/assets/PaymentRequest/PaymentRequest_05.png)

4. Click **Generate Link**.

  ### Create a Custom Payment Request
  Follow the next procedure to create a Basic Payment Request and share it with your customers.

  1. Follow steps 1 to 3 of the [Create a Basic Payment Request]({{< ref "#create-a-basic-payment-request" >}}) procedure.

  2. Click **I want to customize my link** option. The advanced options appears where you can provide the following information

  ![PrintScreen](/assets/PaymentRequest/PaymentRequest_08.png)

  * **Do you ship your products**: this option lets you select whether the shipping information of the product is included in the link. When selecting **YES**, you can set a fixed shipping amount, and select if the customer must provide the shipping address.

  ![PrintScreen](/assets/PaymentRequest/PaymentRequest_09.png)

  * **Payment reference**: this option lets you decide if you want to set a specific Payment reference for the link.

  ![PrintScreen](/assets/PaymentRequest/PaymentRequest_12.png)

  * **Transaction redirects**: in this option you can set the URLs of the customized response pages you have when a transaction is approved, declined or pending. These fields are not mandatory and if you don't set a URL, the transaction is redirected to the default PayU's response pages.  

  ![PrintScreen](/assets/PaymentRequest/PaymentRequest_10.png)

  * **Buyer comments**: this option allows the buyer to add comments related to the purchase. The field where the buyer can add comments can be set in English, Spanish or Portuguese.<br>
  For example, you can configure this field to let the customer specify a particular description of the product.

  ![PrintScreen](/assets/PaymentRequest/PaymentRequest_11.png)

  * **Select the available payment methods**: this option lets you include or exclude the available payment methods according to your country. For example, if you only want to receive payments through credit cards.<br>
  By default, all the available payment methods of your country are selected.

  ![PrintScreen](/assets/PaymentRequest/PaymentRequest_13.png)

3. Click **Generate Link**. 

## Sharing the Payment request
After you have configured and generated the Payment request, a confirmation page appears where you can perform the following actions:

  * **_Share on social media with a link_**: using this option, you can copy the recently generated link, post an update on Facebook, publishing a tweet on Twitter or send it to several email addresses.

  ![PrintScreen](/assets/PaymentRequest/PaymentRequest_06.png) 

  {{% alert title="Note" color="info"%}}

  When selecting Facebook or Twitter, you will be prompted to provide the credentials of the account where you want to publish the link.

  {{% /alert %}}  

  * **_Publish a button in my webpage_**: if you have a webpage and you want to include the generated link, PayU lets you create a button which you can added somewhere in your page. You can use any of the preloaded images provided by PayU or upload one using the _Custom image_ option.<br>
  Then, click _Copy HTML_ to copy the button code in your clipboard.

  ![PrintScreen](/assets/PaymentRequest/PaymentRequest_07.png)

## Creating multiple Payment requests
The PayU module allows you to create multiple payment request at one time so you can easily include several products in your shop. Links created using these features can only be sent via Email.

To create multiple payment links, expand the **Sell with PayU option** and then, select **Sell on the internet**. Then, select the option **Create multiple payment links**.

To create multiple payment links at once, you just need to upload a _.csv_ file with all the information of each product you want to sell. You can download an example of how PayU expects the information by clicking **Download format**.

![PrintScreen](/assets/PaymentRequest/PaymentRequest_13.png)

The Excel file downloaded is by default in Spanish and each row corresponds to a link. The following table explains each column in it. Recall that the columns marked with asterisk are mandatory and if you leave empty a column, this property is not included in the link.

| Name                        | Column | Description                                                                            |
|-----------------------------|--------|----------------------------------------------------------------------------------------|
| Buyer's email               | A      | The email address to which the Payment link will be sent.                              |
| What are you going to sell? | B      | Name or description of the product you want to sell.                                   |
| What does the product cost? | C      | Price of the product you offer.                                                        |
| Currency                    | D      | Currency of the product's amount.<br>Possible values: COP, USD, PEN, ARS, BRL, and MXN |
| Tax type                    | E      | Let's you define if you include taxes in your product.<ul style="margin-bottom: initial;"><li>Set ```Fijo``` to add a fixed value.</li><li>Set ```Porcentaje``` to add a percentage value.</li></ul>                    |
| Tax value                   | F      | Value of the tax according to the tax type specified.                                  |
| Due date                    | G      | Set the due date of the link using the format ```dd/MM/yy HH:mm```.                    |
| Redirect on success         | H      | Set the URL to which you customers will be redirected when the transaction is successful.                                                                                                                     |
| Redirect on failure         | I      | Set the URL to which you customers will be redirected when the transaction fails.      |
| Redirect on pending         | J      | Set the URL to which you customers will be redirected when the transaction is pending. |
| Ask for shipping address    | K      | Set ```Si``` to request delivery address to the payer. Otherwise, set ```No``` or leave it empty.                                                                                                                       |
| Shipping value              | L      | Set a fixed value for shipping in the same currency of the product price.              |
| Let payers add comments     | M      | Set ```Si``` to let the payers add comments. Otherwise, set ```No``` or leave it empty.|
| Label for payer's comments (ES)| N   | Set the label for the payer's comments field in Spanish.                               |
| Label for payer's comments (EN)| O   | Set the label for the payer's comments field in English.                               |
| Label for payer's comments (PT)| P   | Set the label for the payer's comments field in Portuguese.                            |
| Extra 1                     | Q      | Set any additional string data to be included in the link. This column cannot exceed 120 characters.                                                                                                                 |
| Extra 2                     | R      | Set any additional string data to be included in the link. This column cannot exceed 120 characters.                                                                                                                 |
| Select payment methods.     | S      | <ul style="margin-bottom: initial;"><li>If you leave this column empty, all the payment methods active for the account will be included.</li><li>To include some payment methods, set the payment methods separated by commas.<br>Example: ```LENDING,VISA,BANK_REFERENCED,AMEX```.<br>Furthermore, you can define what installments to submit for credit card, to do this, enter the payment methods and indicate the installments you want to be available separated by hyphens.<br>Example: ```VISA-1-2-3,AMEX```.</li></ul> |

{{% alert title="Note" color="info"%}}

You can create up to 1000 links per file.

{{% /alert %}}  

Once you have completed the Excel file, upload it to the PayU Module and click **Send payment links**.