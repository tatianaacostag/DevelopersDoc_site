---
title: "Payment Form"
linkTitle: "Payment Form"
date: 2021-03-29T12:15:27-05:00
description: >
  With this HTML form, you can send the transaction request to our payment gateway along with the purchase information. Send the request using the HTTP POST method.

weight: 10
tags: ["subtopic"]
---

In this topic, you find how to send data from one transaction to the PayU payment gateway. To do so, You must generate an HTML form with the transaction data using the HTTP POST method and pointing it to our system.

## Considerations
* Make sure you have the right `merchantId`, `accountId`, and `apiKey`.
* Use a different payment reference per payment.
* Do not include spaces in parameter values
* Do not include values with more than two decimal places
* Do not include special characters in the ```referenceCode```parameter

## Variables
The following variables can be included in the Payment form.

<details>
<summary>Variables in the payment form</summary>
<br>
<div class="variables"></div>

| Field | Type | Size | Description | Mandatory |
|-|-|-|-|:-:|
| amount | Number | 14 | Total amount of the transaction. It can contain two decimal digits. Example 10000.00 or 10000. | ✓ |
| merchantId | Number | 12 | ID number of your shop in PayU’s system, you will find this number in the account creation email. | ✓ |
| referenceCode | Alphanumeric | 255 | Reference of the sale or order. It must be unique for each transaction that is sent to the system. Usually, this is a way to identify the requests sent to the payment gateway. | ✓ |
| accountId | Number | 6 | ID of the user account for each country associated with the shop. This variable is used to display the available payment methods for this country. | ✓ |
| description | Alphanumeric | 255 | Sale’s description. | ✓ |
| tax | Number | 14,2 | Value of the VAT of the transaction.<br>In Colombia, if no VAT is sent, the system applies 19% automatically. It can contain two decimal digits, for example 19000.00.<br>If the product or service is VAT exempt, assign `0` to this variable. | ✓ |
| taxReturnBase | Number | 14,2 | Base value to calculate the VAT.<br>If the product or service is VAT exempt, assign `0`to this variable. | ✓ |
| signature | Alphanumeric | 255 | Digital signature created for each transaction. Refer to [Signature for Payment form]({{< ref "payment-form.md#signature-for-payment-form" >}}) to learn how to generate it. | ✓ |
| currency | Alpha numeric | 3 | The respective currency in which the payment is made. The reconciliation process is performed in pesos at the representative rate of the day.<br>[See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | ✓ |
| buyerEmail | Alphanumeric | 255 | Field that contains the buyer’s email to notify the result of the transaction by email. It is recommended to validate if this field has been provided in the form. | ✓ |
| telephone | Alphanumeric | 50 | The buyer’s residence phone. | ✓ |
| buyerFullName | Alphanumeric | 150 | The buyer’s full name. | ✓ |
| test | Number | 1 | Indicates whether the transaction is in test or production mode. Set `1`for test and `0`for production. | — |
| lng | Alphanumeric | 3 | Language in which the payment gateway is wished to be displayed.<br>[See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | — |
| shippingCity | Alphanumeric | 50 | The delivery City of the merchandise<br><sup>*</sup> Mandatory if your shop ships the product. | ✓* |
| shippingCountry | Alphanumeric | 2 | The delivery ISO country code for the merchandise.<br><sup>*</sup> Mandatory if your shop ships the product.<br>[See processing countries]({{< ref "response-codes-and-variables.html#processing-countries" >}}) | ✓* |
| shippingAddress | Alphanumeric | 255 | The delivery address of the merchandise.<br><sup>*</sup> Mandatory if your shop ships the product. | ✓* |
| extra1 | Alphanumeric | 255 | Additional field to send information about the purchase. | — |
| extra2 | Alphanumeric | 255 | Additional field to send information about the purchase. | — |
| extra3 | Alphanumeric | 255 | Additional field to send information about the purchase. For example, internal codes of the products. | — |
| responseUrl | Alphanumeric | 255 | The URL of the response page. | — |
| confirmationUrl | Alphanumeric | 255 | The URL of the confirmation page. | — |
| payerFullName | Alphanumeric | 50 | The payer’s name. This value will be taken to fill out the credit card form. | — |
| payerDocument | Alphanumeric | 25 | The buyer’s identification number. This value will be taken to fill out the credit card form. | — |
| mobilePhone | Alphanumeric | 50 | The buyer’s cell phone number. This value will be taken to fill out the credit card form and will be the contact telephone number. | — |
| billingAddress | Alphanumeric | 255 | The correspondence address. | — |
| officeTelephone | Alphanumeric | 50 | The buyer’s daytime phone. | — |
| algorithmSignature | Alphanumeric | 255 | Encryption algorithm of the digital signature (`signature` field). The three available algorithms are: `MD5`, `SHA` and `SHA256`. | — |
| billingCity | Alphanumeric | 50 | City associated with the billing address. | — |
| zipCode | Alphanumeric | 20 | Postal code. | — |
| billingCountry | Alphanumeric | 2 | The ISO country code associated with the billing address. | — |
| payerEmail | Alphanumeric | 255 | The payer’s email. | — |
| payerPhone | Alphanumeric | 20 | The payer’s phone number. | — |
| payerOfficePhone | Alphanumeric | 20 | The payer’s workplace phone number. | — |
| payerMobilePhone | Alphanumeric | 20 | The payer’s mobile phone number. | — |

</details>

### Considerations in variables
* The `tax` is the VAT that may be used in some countries and the `taxReturnBase` is the base value to calculate the VAT. If your product is tax exempt, assign both variables to `0` (`tax=0`, `taxReturnBase=0`).
* If some elements have the tax and it does not apply to others, you must perform the following calculation to find out how to send the values to the payment platform.

| Product | taxReturnBase | tax          | Amount  |
|---------|---------------|--------------|---------|
| A       | 84.033        | 15.966 (19%) | 100.000 |
| B       | 181.818       | 18.181 (10%) | 200.000 |
| C       | 0             | 0 (0%)       | 150.000 |
| Total   | 268.851       | 34.147       | 450.000 |

{{% alert title="Important" color="warning"%}}
Tax + taxReturnBase cannot be greater than the Total Value of each product.
{{% /alert %}}

* For businesses registered in Colombia that belong to the program _Régimen común_, if you don't send the tax, PayU automatically calculates the tax using 19%. If your business belongs to the program _Régimen simplificado_, if you don't send the tax, PayU automatically assigns the value as zero (0).

## Form example
The following is an example of a basic Payment form using only the mandatory fields and pointing the request to the sandbox environment (test mode).

```HTML
 <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
  <input name="merchantId"      type="hidden"  value="508029"   >
  <input name="accountId"       type="hidden"  value="512321" >
  <input name="description"     type="hidden"  value="Test PAYU"  >
  <input name="referenceCode"   type="hidden"  value="TestPayU" >
  <input name="amount"          type="hidden"  value="20000"   >
  <input name="tax"             type="hidden"  value="3193"  >
  <input name="taxReturnBase"   type="hidden"  value="16806" >
  <input name="currency"        type="hidden"  value="COP" >
  <input name="signature"       type="hidden"  value="7ee7cf808ce6a39b17481c54f2c57acc"  >
  <input name="test"            type="hidden"  value="0" >
  <input name="buyerEmail"      type="hidden"  value="test@test.com" >
  <input name="responseUrl"     type="hidden"  value="http://www.test.com/response" >
  <input name="confirmationUrl" type="hidden"  value="http://www.test.com/confirmation" >
  <input name="Submit"          type="submit"  value="Enviar" >
</form>
```
<br>

If your shop ships the products, you need to include the following values:

```HTML
  <input name="shippingAddress"    type="hidden"  value="calle 93 n 47 - 65"   >
  <input name="shippingCity"       type="hidden"  value="Bogotá" >
  <input name="shippingCountry"    type="hidden"  value="CO"  >
```
<br>

The URL configured in `action` depends on the environment:

```HTML
Test: https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/
Production: https://checkout.payulatam.com/ppp-web-gateway-payu/
```

## Signature for Payment form
The signature is a method to validate payments made through the platform and ensuring its authenticity. It consists of a string encrypted using `MD5`, `SHA1`, or `SHA256`. The string is created as follows:

```HTML
"ApiKey~merchantId~referenceCode~amount~currency".
```
<br>

For example, with the following dat:

```HTML
merchantId: 508029
ApiKey: 4Vj8eK4rloUd272L48hsrarnUA
referenceCode: TestPayU
amount: 20000
currency: COP
accountId: 512326
buyerEmail: test@test.com
```
<br>

The signature is:

```HTML
"4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU~20000~COP"
```
<br>

Encrypted using `MD5`:

```HTML
"7ee7cf808ce6a39b17481c54f2c57acc"
```
<br>

Encrypted using `SHA1`:

```HTML
"fa890d3f94e12b5cdb62e8771453b99b78e7ccdc"
```
<br>

Encrypted using `SHA256`:

```HTML
"af3899a22336b79db46006491d15813158826f944599bf3bf601e2327f898022"
```

### Compare your signature

{{< signaturegenerator/paymentform >}}

This calculator lets you generate the signature using any of the available encryption methods.