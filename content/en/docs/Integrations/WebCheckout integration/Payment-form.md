---
title: "Payment Form"
linkTitle: "Payment Form"
date: 2021-03-29T12:15:27-05:00
description: >
  In this section, you'll learn how to submit transaction data to the PayU payment gateway using an HTML form.
weight: 10
tags: ["subtopic"]
---
<script src="/js/searchcodes.js"></script>

This guide explains how to build a form with the required fields and send the data to our system via the HTTP POST method.

## Considerations

* Ensure you have the correct `merchantId`, `accountId`, and `apiKey`.
* Use a unique payment reference for each transaction.
* Avoid including spaces in parameter values.
* Limit decimal values to two places.
* Exclude special characters from the `referenceCode` parameter.

## Parameters

You can include the following parameters in the payment form.

<details>

<summary>Parameters</summary>

<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Show mandatory fields only</label>

<br>

<div class="variables"></div>

| Field | Type | Size | Description | Mandatory |
|-|-|-|-|:-:|
| `lng` | Alphanumeric | 3 | Language for the payment gateway. <br>[See supported languages]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | No |
| `merchantId` | Number | 12 | Unique ID number assigned to your shop in PayU's system. You can find this number in the account creation email. | Yes |
| `accountId` | Number | 6 | ID associated with the user account in each country. It determines the available payment methods for the corresponding country. | Yes |
| `algorithmSignature` | Alphanumeric | 255 | Hashing algorithm used to create the digital signature (`signature` field). Available options: `MD5`, `SHA`, `SHA256`, or `HMAC-SHA256`. | No |
| `signature` | Alphanumeric | 255 | Digital signature for the transaction. Refer to [Signature for payment form]({{< ref "payment-form.md#signature-for-payment-form" >}}) for instructions. | Yes |
| `sourceUrl` | Alphanumeric | 255 | Source URL where the merchant's payment button is located. | No |
| `responseUrl` | Alphanumeric | 255 | URL for the response page. | No |
| `confirmationUrl` | Alphanumeric | 255 | URL for the confirmation page. | No |
| `expirationDate` | Alphanumeric | 19 | Expiration date for Cash payments in the format `YYYY-MM-DD HH:mm:ss`. Must be within the allowed range for cash payments (15 days for Argentina, 7 days for others). | - |
| `paymentMethods` | Alphanumeric | 255 | List of payment methods enabled for the transaction. <br>This list must be separated by comma and without blanks, for example: `VISA,MASTERCARD`.<br> You can include installments using hyphens, for example: `VISA-1-3,MASTERCARD-3-5-9`. <br>[See the available Payment Methods for your country in the column `paymentMethod parameter`]({{< ref "select-your-payment-method.html" >}}). | No |
| `selectedPaymentMethod` | Alphanumeric | 255 | Preselected payment method when the user accesses the payment link. | No |
| `paymentMethodsDescription` | Alphanumeric | 255 | Description of the accepted payment methods and Bins for the transaction. | No |
| `iin` | Alphanumeric | 2048 | List of Bins admitted during the payment process, separated by commas. _Only merchants validating signatures can use this parameter._ | No |
| `pseBanks` | Alphanumeric | 255 | List of bank codes enabled for payments through PSE. | No |
| `partnerId` | Alphanumeric | 255 | Optional field to specify the partner's name (e.g., ZOOZ). | No |
| `template` | Alphanumeric | 255 | Template to be used for the payment page. | No |
| `extra1` | Alphanumeric | 255 | Additional field to send extra information about the purchase. | No |
| `extra2` | Alphanumeric | 255 | Additional field to send extra information about the purchase. | No |
| `extra3` | Alphanumeric | 255 | Additional field to send extra information about the purchase. | No |
| `extra4` | Alphanumeric | 255 | Additional field to send extra information about the purchase. | No |
| `displayShippingInformation` | Number | 1 | Set to `1` to request shipping information, or `0` to disable it. | No |
| `additionalDeliveryDays` | Number | 5 | Additional days for order delivery, which will appear in the API query response as `result.payload.transactions.extraParameters.ADDITIONAL_DELIVERY_DAYS`. | No |
| `displayBuyerComments` | Number | 1 | Set to `1` to enable buyer comments, or `0` to disable it. This appears in the API response as `result.payload.transactions.extraParameters.DISPLAY_BUYER_COMMENTS`. | No |
| `buyerCommentsLabel` | Alphanumeric | 255 | Label for buyer comments, appearing in the API response as `result.payload.transactions.extraParameters.BUYER_COMMENTS_LABEL`. | No |
| `isCashOnDeliveryApply` | Number | 1 | Set to `1` to enable cash on delivery for the transaction, or `0` to disable it. | No |
| `test` | Number | 1 | Indicates whether the transaction is in test mode (`1`) or production mode (`0`). | No |
| `description` | Alphanumeric | 255 | Description of the sale. | Yes |
| `referenceCode` | Alphanumeric | 255 | Unique reference for the sale or order. It must be unique for each transaction sent to the system, typically used for tracking requests. | Yes |
| `amount` | Number | 10 | Total amount for the transaction, which can include two decimal digits. E.g., 10000.00 or 10000. | Yes |
| `tax` | Number | 10.2 | VAT value for the transaction. In Colombia, if no VAT is provided, the system applies 19% automatically. If VAT is exempt, set to `0`. | Yes |
| `taxReturnBase` | Number | 10.2 | Base value used to calculate the VAT. If the product is VAT exempt, set to `0`. | Yes |
| `administrativeFee` | Number | 10.2 | Administrative fee for the transaction. | No |
| `taxAdministrativeFee` | Number | 10.2 | Tax applied to the administrative fee. | No |
| `taxAdministrativeFeeReturnBase` | Number | 10.2 | Dase value for calculating the tax of the administrative fee. | No |
| `discount` | Number | 10.2 | Discount applied to the sale. | No |
| `currency` | Alphanumeric | 3 | Currency used for the payment. In colombia, reconciliations are done in Colombian pesos at the representative rate of the day. <br>[See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Yes |
| `airline` | Alphanumeric | 4 | Airline code for airline transactions. | No |
| `additionalValue` | Number | 10.2 | Any additional value added to the sale. | No |
| `payerFullName` | Alphanumeric | 50 | Payer's full name, used to fill out the credit card form. | Yes |
| `payerEmail` | Alphanumeric | 255 | Email address of the payer. | Yes |
| `payerOfficePhone` | Alphanumeric | Max. 20 | Workplace phone number of the payer. | No |
| `payerPhone` | Alphanumeric | Max. 20 | Phone number of the payer. | Yes |
| `payerMobilePhone` | Alphanumeric | Max. 20 | Mobile phone number of the payer. | No |
| `payerDocumentType` | Alphanumeric | 25 | Type of identification document used by the payer. Examples: `CC`, `DNI`. `NIT`, `Passport`. | Yes |
| `payerDocument` | Alphanumeric | 25 | Payer's identification number, used to fill out the credit card form. | Yes |
| `billingCountry` | Alphanumeric | 2 | ISO country code for the billing address. | No |
| `payerState` | Alphanumeric | N/A | Payer's billing state in ISO 3166 code (e.g., SP for São Paulo, AR-C for Buenos Aires). | No |
| `billingCity` | Alphanumeric | 50 | City associated with the billing address. | No |
| `billingAddress` | Alphanumeric | 255 | Billing address for the transaction. | No |
| `billingAddress2` | Alphanumeric | 255 | Secondary address line for the payer's billing address. | No |
| `billingAddress3` | Alphanumeric | 255 | Tertiary address line for the payer's billing address. | No |
| `zipCode` | Alphanumeric | 20 | Postal code for the billing or shipping address. | No |
| `buyerFullName` | Alphanumeric | 150 | Full name of the buyer. | Yes |
| `buyerEmail` | Alphanumeric | 255 | Buyer's email address, used for transaction notifications. | Yes |
| `buyerDocumentType` | Alphanumeric | 25 | Type of identification document used by the buyer. Examples: Examples: `CC`, `DNI`. `NIT`, `Passport`. | Yes |
| `buyerDocument` | Alphanumeric | 25 | Buyer's identification number. | Yes |
| `officeTelephone` | Alphanumeric | Max. 20 | Buyer's daytime phone number. | No |
| `telephone` | Alphanumeric | Max. 20 | Buyer's residence phone number. | Yes |
| `mobilePhone` | Alphanumeric | Max. 20 | Buyer's cell phone number, used to fill out the credit card form and as the contact phone. | No |
| `shippingCountry` | Alphanumeric | 2 | ISO country code for the shipping address. <br><sup>*</sup>Mandatory if the shop ships the product. <br>[See processing countries]({{< ref "response-codes-and-variables.html#processing-countries" >}}). | Yes* |
| `shippingState` | Alphanumeric | N/A | Buyer's shipping state in ISO 3166 code (e.g., SP for São Paulo, AR-C for Buenos Aires). | No |
| `shippingCity` | Alphanumeric | 50 | City to which the merchant will deliver the product or service. <br><sup>*</sup>Mandatory if the shop ships the product. | Yes* |
| `shippingAddress` | Alphanumeric | 255 | Address to which the merchant will deliver the product or service. <br><sup>*</sup>Mandatory if the shop ships the product. | Yes* |
| `shippingAddress2` | Alphanumeric | 255 | Secondary address line for the buyer's shipping address. | No |
| `shippingAddress3` | Alphanumeric | 255 | Tertiary address line for the buyer's shipping address. | No |
| `payerShippingPostalCode` | Alphanumeric | N/A | Buyer's shipping postal code. | No |

</details>

### Parameters Considerations

* The `tax` parameter represents VAT, applicable in certain countries, while `taxReturnBase` is the base amount to calculate the VAT. If your product is tax-exempt, set both variables to `0` (`tax=0`, `taxReturnBase=0`).
* When some products are taxed, while others are not, calculate and set values as shown in the table below to ensure accurate submission to the payment platform.

#### VAT Calculation Example:

| Product | `taxReturnBase` | `tax`      | Amount  |
|---------|---------------|--------------|---------|
| A       | 84.033        | 15.966 (19%) | 100.000 |
| B       | 181.818       | 18.181 (10%) | 200.000 |
| C       | 0             | 0 (0%)       | 150.000 |
| Total   | 268.851       | 34.147       | 450.000 |

{{% alert title="Important" color="warning"%}}

The sum of `tax` + `taxReturnBase` must not exceed the total value of each product.

{{% /alert %}}

* For businesses in Colombia registered under the _Régimen Común_, if `tax` is not provided, PayU automatically calculates it at 19%. For businesses under the _Régimen Simplificado_, if `tax` is not specified, PayU assigns a value of zero (0).

## HTML Fields Example

The following is an example of the mandatory fields for a payment form in HTML format, pointing the request to the sandbox environment (test mode).

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
Test: https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/
Production: https://checkout.payulatam.com/ppp-web-gateway-payu/
```

## Payment Form Example

This dynamic payment form example is designed for testing in our sandbox environment. It offers a glimpse into the potential fields and features you can incorporate into your own payment forms. Below is an overview of its key features:

* **Transaction Signature Generation:** The form calculates a signature string using the PayU LATAM API key, merchant ID, and various user inputs such as payment method and bank information. This signature is hashed using a specified algorithm (MD5, SHA, SHA256, or HMAC-SHA256) to ensure secure transactions. For more details, refer to [Signature for payment form]({{< ref "Payment-form.md#signature-for-payment-form" >}})

* **Dynamic Form Population:** Based on the selected country and account, the form populates various fields such as document types, billing information (e.g., city, state, zip code), and payer information. This allows the form to adjust for region-specific data requirements (e.g., CPF for Brazil or CUIT for Argentina).

* **Visibility Management:** Several functions are included to dynamically show or hide fields based on the type of account selected. This is particularly useful for handling specific cases like PSE banks in Colombia or additional fields for airlines and travel agencies.

* **Shipping Information Handling:** The form allows the user to either use the billing information as the shipping address or specify separate shipping details. If the user doesn't select an alternate shipping option, the billing information is used by default.

* **Event Listeners and Form Submission:** The page can use event listeners to update form fields when certain input values (e.g., account ID) change and ensures the form submission process respects user input, with fallback options in place (e.g., using billing info if no shipping option is selected).

<div>
{{< paymentform/webcheckout_en >}}
</div>

<br>
<br>

## Signature for Payment Form

Use a signature to validate each payment and guarantee its authenticity. The integration builds the signature by encrypting a string with one of the supported algorithms: `MD5`, `SHA1`, `SHA256`, `HMAC-SHA256`.

Construct the string in the following format:

```HTML
apiKey~merchantId~referenceCode~amount~currency
```

{{% alert title="Note" color="info"%}}

If your payment form includes the parameters `paymentMethods`, `iin`, or `pseBanks`, append them in this exact order:

```HTML
apiKey~merchantId~referenceCode~amount~currency~paymentMethods~iin~pseBanks
```

{{% /alert %}}

For example, given the following data:

```HTML
apiKey: 4Vj8eK4rloUd272L48hsrarnUA
merchantId: 508029
referenceCode: TestPayU
amount: 20000
currency: COP
```

<br>

The base string to encrypt for the signature is:

```HTML
4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU~20000~COP
```

<p>

* Encrypted using `MD5`:

    ```HTML
    7ee7cf808ce6a39b17481c54f2c57acc
    ```

<p>

* Encrypted using `SHA1`:

    ```HTML
    fa890d3f94e12b5cdb62e8771453b99b78e7ccdc
    ```

<p>

* Encrypted using `SHA256`:

    ```HTML
    af3899a22336b79db46006491d15813158826f944599bf3bf601e2327f898022
    ```

<p>

* Encrypted using `HMAC-SHA256` (using the `apiKey` as the secret key):
    
    ```HTML
    eaf61598d5593b366086c9a00aa5746ccad1a6e9b209a1a242fce224202b2b36
    ```

<p>

* Encrypted using `HMAC-SHA256` (using a custom secret key, in this example: `secret123`):

    ```HTML
    9b269405c01c725fcc5d1667a2e1166a810fd34b5a5ac82295d0f59fddf1c472
    ```

{{% alert title="Note" color="info"%}}

When encrypting using HMAC-SHA256, you have the option to use your `apiKey` as the secret key or provide a specific secret key. Regardless of your choice, ensure that the `apiKey` is the first parameter in the base string used for generating the signature:

```HTML
apiKey~merchantId~referenceCode~amount~currency
```

{{% /alert %}}

### Generate a Signature

Use this generator to create a signature with any of the available encryption methods.

<div>
{{< paymentform/signaturegenerator_en >}}
</div>
