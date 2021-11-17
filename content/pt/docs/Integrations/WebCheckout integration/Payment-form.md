---
title: "Payment Form"
linkTitle: "Payment Form"
date: 2021-03-29T12:15:27-05:00
description: >
  With this HTML form, you can send the transaction request to our payment gateway along with the purchase information. Send the request using the HTTP POST method.

weight: 10
tags: ["subtopic"]
---
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/jquery.validate.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/additional-methods.min.js"></script>
<script src="/js/signature-generator/md5.js"></script>
<script src="/js/signature-generator/sha1.js"></script>
<script src="/js/signature-generator/sha256.js"></script>
<script src="/js/signature-generator/signature-generator.js"></script>

In this topic, you find how to send data from one transaction to the PayU payment gateway. To do so, You must generate an HTML form with the transaction data using the HTTP POST method and pointing it to our system.

## Observações {#considerations}
* Make sure you have the right `merchantId`, `accountId`, and `apiKey`.
* Use a different payment reference per payment.
* Do not include spaces in parameter values.
* Do not include values with more than two decimal places.
* Do not include special characters in the `referenceCode` parameter.

## Variables
The following variables can be included in the Payment form.

<details>
<summary>Variables in the payment form</summary>
<br>
<div class="variables"></div>

| Campo | Tipo | Size | Descrição | Mandatory |
|-|-|-|-|:-:|
| merchantId | Number | 12 | ID number of your shop in PayU’s system, you will find this number in the account creation e-mail. | ✓ | 
| referenceCode | Alfanumérico | 255 | Reference of the sale or order. It must be unique for each transaction that is sent to the system. Usually, this is a way to identify the requests sent to the payment gateway. | ✓ | 
| accountId | Number | 6 | ID of the user account for each country associated with the shop. This variable is used to display the available payment methods for this country. | ✓ | 
| description | Alfanumérico | 255 | Sale’s description. | ✓ | 
| currency | Alfanumérico | 3 | The respective currency in which the payment is made. The reconciliation process is performed in Colombian pesos at the representative rate of the day.<br>[Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | ✓ | 
| amount | Number | 14 | Total amount of the transaction. It can contain two decimal digits. Example 10000.00 or 10000. | ✓ | 
| tax | Number | 14,2 | Valor of the VAT of the transaction.<br>In Colombia, if no VAT is sent, the system applies 19% automatically. It can contain two decimal digits, for example 19000.00.<br>If the product or service is VAT exempt, assign `0` to this variable. | ✓ | 
| discount | Number | 14,2 | Discount value applied to the sale. | — | 
| taxReturnBase | Number | 14,2 | Base value to calculate the VAT.<br>If the product or service is VAT exempt, assign `0` to this variable. | ✓ | 
| additionalValue | Number | 14,2 | Additional value of the sale. | — | 
| signature | Alfanumérico | 255 | Digital signature created for each transaction. Consulte [Signature for Payment form]({{< ref "payment-form.md#signature-for-payment-form" >}}) to learn how to generate it. | ✓ | 
| algorithmSignature | Alfanumérico | 255 | Encryption algorithm of the digital signature (`signature` field). The three available algorithms are: `MD5`, `SHA` and `SHA256`. | — | 
| test | Number | 1 | Indicates whether the transaction is in test or production mode. Defina `1` for test and `0` for production. | — | 
| lng | Alfanumérico | 3 | Language in which the payment gateway is wished to be displayed.<br>[See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | — | 
| extra1 | Alfanumérico | 255 | Additional field to send information about the purchase. | — | 
| extra2 | Alfanumérico | 255 | Additional field to send information about the purchase. | — | 
| extra3 | Alfanumérico | 255 | Additional field to send information about the purchase. | — | 
| template | Alfanumérico | 255 | Template for the payment page. | — | 
| responseUrl | Alfanumérico | 255 | The URL da página de resposta. | — | 
| confirmationUrl | Alfanumérico | 255 | The URL da página de resposta. | — | 
| sourceUrl | Alfanumérico | 255 | Source URL of the merchant transactions. This is where the payment button is located. | — | 
| airline | Alfanumérico | 4 | Airline code. | — | 
| billingAddress | Alfanumérico | 255 | The correspondence address. | — | 
| shippingAddress | Alfanumérico | 255 | The delivery address of the merchandise.<br><sup>\*</sup> Mandatory if your shop ships the product. | ✓* | 
| billingCity | Alfanumérico | 50 | City associated with the billing address. | — | 
| shippingCity | Alfanumérico | 50 | The delivery City of the merchandise<br><sup>\*</sup> Mandatory if your shop ships the product. | ✓* | 
| zipCode | Alfanumérico | 20 | Postal code. | — | 
| billingCountry | Alfanumérico | 2 | The ISO country code associated with the billing address. | — | 
| shippingCountry | Alfanumérico | 2 | The delivery ISO country code for the merchandise.<br><sup>\*</sup> Mandatory if your shop ships the product.<br>[See processing countries]({{< ref "response-codes-and-variables.html#processing-countries" >}}). | ✓* | 
| buyerEmail | Alfanumérico | 255 | Campo that contains the buyer’s e-mail to notify the result of the transaction by e-mail. It is recommended to validate if this field has been provided in the form. | ✓ | 
| telephone | Alfanumérico | 50 | The buyer’s residence phone. | ✓ | 
| officeTelephone | Alfanumérico | 50 | The buyer’s daytime phone. | — | 
| mobilePhone | Alfanumérico | 50 | The buyer’s cell phone number. This value will be taken to fill out the credit card form and will be the contact telephone number. | — | 
| buyerFullName | Alfanumérico | 150 | The buyer’s full name. | ✓ | 
| paymentMethods | Alfanumérico | 255 | List of payment methods enabled in the payment process.<br>This list must be separated by comma and without blanks. Por exemplo: `VISA,MASTERCARD`.<br>You can include installments for the payment methods adding them using hyphens. Example: `VISA-1-3,MASTERCARD-3-5-9`.<br>[See the available Payment Methods for your country in the column `Parâmetro paymentMethod`]({{< ref "select-your-payment-method.html" >}}). | — | 
| administrativeFee | Number | 14,2 | Amount of the administrative fee. | — | 
| taxAdministrativeFee | Number | 14,2 | Amount of tax of the administrative fee. | — | 
| taxAdministrativeFeeReturnBase | Number | 14,2 | Base value to calculate the tax of the administrative fee. | — | 
| payerEmail | Alfanumérico | 255 | The payer’s e-mail. | — | 
| payerPhone | Alfanumérico | 20 | The payer’s phone number. | — | 
| payerOfficePhone | Alfanumérico | 20 | The payer’s workplace phone number. | — | 
| payerMobilePhone | Alfanumérico | 20 | The payer’s mobile phone number. | — | 
| expirationDate | Alfanumérico | 19 | Expiration date of the transactions for Dinheiro payments. Formato: `YYYY-MM-DD HH:mm:ss`.<br>This value must be lower than the default number of days for the cash payment (15 days for Argentina and 7 days for the other countries). | - | 
| payerFullName | Alfanumérico | 50 | The payer’s name. This value will be taken to fill out the credit card form. | — | 
| payerDocument | Alfanumérico | 25 | The buyer’s identification number. This value will be taken to fill out the credit card form. | — | 
| payerDocumentType | Alfanumérico | 25 | The buyer’s identification number. This value will be taken to fill out the credit card form. | — | 
| iin | Alfanumérico | 2048 | List of Bins admitted during the payment process (separated by comma).<br>_This parameter can only be used by merchants that validate signature._ | — | 
| paymentMethodsDescription | Alfanumérico | 255 | Descrição of the payment methods and Bins admitted during the payment process. | — | 
| pseBanks | Alfanumérico | 255 | List of bank codes enabled in the payment process through PSE.<br>This list must be separated by comma and without blanks. | — | | merchantId | Number | 12 | ID number of your shop in PayU’s system, you will find this number in the account creation e-mail. | ✓ | 
| referenceCode | Alfanumérico | 255 | Reference of the sale or order. It must be unique for each transaction that is sent to the system. Usually, this is a way to identify the requests sent to the payment gateway. | ✓ | 
| accountId | Number | 6 | ID of the user account for each country associated with the shop. This variable is used to display the available payment methods for this country. | ✓ | 
| description | Alfanumérico | 255 | Sale’s description. | ✓ | 
| currency | Alfanumérico | 3 | The respective currency in which the payment is made. The reconciliation process is performed in Colombian pesos at the representative rate of the day.<br>[Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | ✓ | 
| amount | Number | 14 | Total amount of the transaction. It can contain two decimal digits. Example 10000.00 or 10000. | ✓ | 
| tax | Number | 14,2 | Valor of the VAT of the transaction.<br>In Colombia, if no VAT is sent, the system applies 19% automatically. It can contain two decimal digits, for example 19000.00.<br>If the product or service is VAT exempt, assign `0` to this variable. | ✓ | 
| discount | Number | 14,2 | Discount value applied to the sale. | — | 
| taxReturnBase | Number | 14,2 | Base value to calculate the VAT.<br>If the product or service is VAT exempt, assign `0` to this variable. | ✓ | 
| additionalValue | Number | 14,2 | Additional value of the sale. | — | 
| signature | Alfanumérico | 255 | Digital signature created for each transaction. Consulte [Signature for Payment form]({{< ref "payment-form.md#signature-for-payment-form" >}}) to learn how to generate it. | ✓ | 
| algorithmSignature | Alfanumérico | 255 | Encryption algorithm of the digital signature (`signature` field). The three available algorithms are: `MD5`, `SHA` and `SHA256`. | — | 
| test | Number | 1 | Indicates whether the transaction is in test or production mode. Defina `1` for test and `0` for production. | — | 
| lng | Alfanumérico | 3 | Language in which the payment gateway is wished to be displayed.<br>[See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | — | 
| extra1 | Alfanumérico | 255 | Additional field to send information about the purchase. | — | 
| extra2 | Alfanumérico | 255 | Additional field to send information about the purchase. | — | 
| extra3 | Alfanumérico | 255 | Additional field to send information about the purchase. | — | 
| template | Alfanumérico | 255 | Template for the payment page. | — | 
| responseUrl | Alfanumérico | 255 | The URL da página de resposta. | — | 
| confirmationUrl | Alfanumérico | 255 | The URL da página de resposta. | — | 
| sourceUrl | Alfanumérico | 255 | Source URL of the merchant transactions. This is where the payment button is located. | — | 
| airline | Alfanumérico | 4 | Airline code. | — | 
| billingAddress | Alfanumérico | 255 | The correspondence address. | — | 
| shippingAddress | Alfanumérico | 255 | The delivery address of the merchandise.<br><sup>\*</sup> Mandatory if your shop ships the product. | ✓* | 
| billingCity | Alfanumérico | 50 | City associated with the billing address. | — | 
| shippingCity | Alfanumérico | 50 | The delivery City of the merchandise<br><sup>\*</sup> Mandatory if your shop ships the product. | ✓* | 
| zipCode | Alfanumérico | 20 | Postal code. | — | 
| billingCountry | Alfanumérico | 2 | The ISO country code associated with the billing address. | — | 
| shippingCountry | Alfanumérico | 2 | The delivery ISO country code for the merchandise.<br><sup>\*</sup> Mandatory if your shop ships the product.<br>[See processing countries]({{< ref "response-codes-and-variables.html#processing-countries" >}}). | ✓* | 
| buyerEmail | Alfanumérico | 255 | Campo that contains the buyer’s e-mail to notify the result of the transaction by e-mail. It is recommended to validate if this field has been provided in the form. | ✓ | 
| telephone | Alfanumérico | 50 | The buyer’s residence phone. | ✓ | 
| officeTelephone | Alfanumérico | 50 | The buyer’s daytime phone. | — | 
| mobilePhone | Alfanumérico | 50 | The buyer’s cell phone number. This value will be taken to fill out the credit card form and will be the contact telephone number. | — | 
| buyerFullName | Alfanumérico | 150 | The buyer’s full name. | ✓ | 
| paymentMethods | Alfanumérico | 255 | List of payment methods enabled in the payment process.<br>This list must be separated by comma and without blanks. Por exemplo: `VISA,MASTERCARD`.<br>You can include installments for the payment methods adding them using hyphens. Example: `VISA-1-3,MASTERCARD-3-5-9`.<br>[See the available Payment Methods for your country in the column `Parâmetro paymentMethod`]({{< ref "select-your-payment-method.html" >}}). | — | 
| administrativeFee | Number | 14,2 | Amount of the administrative fee. | — | 
| taxAdministrativeFee | Number | 14,2 | Amount of tax of the administrative fee. | — | 
| taxAdministrativeFeeReturnBase | Number | 14,2 | Base value to calculate the tax of the administrative fee. | — | 
| payerEmail | Alfanumérico | 255 | The payer’s e-mail. | — | 
| payerPhone | Alfanumérico | 20 | The payer’s phone number. | — | 
| payerOfficePhone | Alfanumérico | 20 | The payer’s workplace phone number. | — | 
| payerMobilePhone | Alfanumérico | 20 | The payer’s mobile phone number. | — | 
| expirationDate | Alfanumérico | 19 | Expiration date of the transactions for Dinheiro payments. Formato: `YYYY-MM-DD HH:mm:ss`.<br>This value must be lower than the default number of days for the cash payment (15 days for Argentina and 7 days for the other countries). | - | 
| payerFullName | Alfanumérico | 50 | The payer’s name. This value will be taken to fill out the credit card form. | — | 
| payerDocument | Alfanumérico | 25 | The buyer’s identification number. This value will be taken to fill out the credit card form. | — | 
| payerDocumentType | Alfanumérico | 25 | The buyer’s identification number. This value will be taken to fill out the credit card form. | — | 
| iin | Alfanumérico | 2048 | List of Bins admitted during the payment process (separated by comma).<br>_This parameter can only be used by merchants that validate signature._ | — | 
| paymentMethodsDescription | Alfanumérico | 255 | Descrição of the payment methods and Bins admitted during the payment process. | — | 
| pseBanks | Alfanumérico | 255 | List of bank codes enabled in the payment process through PSE.<br>This list must be separated by comma and without blanks. | — | 
</details>

### Observações {#considerations} in variables
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
  <input name="Submit"          type="submit"  value="Send" >
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
Teste: https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/
Produção: https://checkout.payulatam.com/ppp-web-gateway-payu/
```

## Signature for Payment form
The signature is a method to validate payments made through the platform and ensuring its authenticity. It consists of a string encrypted using `MD5`, `SHA1`, or `SHA256`. The string is created as follows:

```HTML
"ApiKey~merchantId~referenceCode~amount~currency"
```

{{% alert title="Observação" color="info"%}}
If your Payment form includes the variables `paymentMethods`, `iin`, or `pseBanks`, you must concatenate them in such order:

```HTML
"ApiKey~merchantId~referenceCode~amount~currency~paymentMethods~iin~pseBanks"
```
{{% /alert %}}

Por exemplo, with the following data:

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

<!-- Signature generator -->
<div id="blue-box">
<span class="grey-text-13">
<div id = "div_generador" >

<form method="POST" id="signature_form" >
    <table>
        <span class="blue-text-13"><b>Algorithm: &nbsp;</b></span>
        <select id = "signature_algorithm" class="calc_selector form_control">
            <option  value="md5">MD5</option>
            <option  value="sha1">SHA1</option>
            <option  value="sha256">SHA256</option>
        </select>
        <br>
        <br>
        <span class="calc_text">&nbsp;(</span>
        <input class="form_control" type="text"  id ="signature_apikey" name = "signature_apikey" placeholder="ApiKey" maxlength="26"> ~
        <input class="form_control number" type="text"  id ="signature_merchanId" name = "signature_merchanId" placeholder="MerchantId" maxlength="7"> ~
        <input class="form_control" type="text"  id ="signature_referenceCode" name = "signature_referenceCode" placeholder="Reference" maxlength="255"> ~
        <input class="form_control  number" type="text" id ="signature_amount" name = "signature_amount" placeholder="Amount" maxlength="14"> ~
        <select id = "signature_currency" class="calc_selector form_control" >
            <option  value="USD">USD</option>
            <option  value="COP">COP</option>
            <option  value="MXN">MXN</option>
            <option  value="ARS">ARS</option>
            <option  value="PEN">PEN</option>
            <option  value="BRL">BRL</option>
            <option  value="CLP">CLP</option>
        </select>
        <span class="calc_text">)</span>
        <br>
        <br>
        <br>
        <span class="blue-text-13"><b>Result:&nbsp;</b></span><input class="form_control" id ="signature_generated" name = "signature_generated" value = ""  readonly />
    </table>
    <br>
    <table width="50%"  border="0" cellspacing="2" cellpadding="2">
        <input type="button" name="signature_generate" id="signature_generate" value="Generate signature" >
        <input type="button" name="signature_generate_again" id="signature_generate_again" value="Generate new signature" >
    </table>
</form>
</div>
</span>
</div>
<!-- End of signature generator -->

This calculator lets you generate the signature using any of the available encryption methods.