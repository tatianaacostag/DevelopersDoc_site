---
title: "Airlines and Travel Agencies - Colombia"
date: 2024-11-26T12:15:57-05:00
description: >
  This document explains how airlines and travel agencies in Colombia can use the WebCheckout integration for secure and efficient payment processing. If you have an API integration, refer to [Payments API for airlines and travel agencies](https://developers.payulatam.com/latam/en/docs/integrations/api-integration/payments-api-colombia.html#process-payments-as-an-airline-or-travel-agency).
weight: 50
tags: ["subtopic"]
---

## Considerations:

* Available exclusively in Colombia for transactions in COP currency.
* Enables payment processing through the TSP/Gateway model.
* Requires IATA codes registration with the acquirers.
* Supports credit or debit card payments, including Amex, Diners, Mastercard, and Visa.
* Supports funds dispersion, allowing travel agencies and airlines to receive their payments within the same transaction.
* Requires one-step processing: the system transfers the funds from the customer’s account to your acquiring bank as soon as payment is authorized.

## Integration Features:

This integration streamlines the payment process for airlines and travel agencies in Colombia by allowing them to submit essential information with each transaction for accurate identification and distribution of funds. Additionally, submitting specific transaction details may qualify you for a 4 x 1000 tax exemption (confirm with your acquirer bank).

| **Feature** | **Airlines** | **Travel Agencies** |
|-|-|-|
| **Fee Inclusion** | Airlines can submit their airline ID, along with airport fares and other associated taxes. | Travel agencies can submit their transaction fees along with airline fees, airport fares, administrative fees, and other charges. |
| **Identification** | Acquirers can identify the airline specifically through the airline ID for targeted distribution. | Enables the acquirer to identify both the travel agency and the airline for accurate funds distribution. |
| **4 x 1000 Tax Exemption Eligibility** | Airlines in Colombia may qualify if they provide their airline ID and relevant fee information. | Travel agencies in Colombia may qualify if they provide comprehensive transaction details.|

{{% alert title="Note" color="info"%}}

Check with your acquiring bank whether your business meets the requirements for the 4 x 1000 tax exemption. Eligibility depends on the information provided in each transaction and current regulations.

{{% /alert %}}

## Integration Steps 

1. Retrieve the list of available airlines.
2. Create the WebCheckout form, including the airline code and airport fares and taxes.

### 1) Retrieve the List of Available Airlines

To integrate with PayU, both airlines and travel agencies need to retrieve the list of valid airline codes for payment collection and include them in the WebCheckout. You can achieve this by querying the PayU system to obtain a list of available airlines and their corresponding codes. The endpoint for retrieving airline codes is the same for both types of merchants, although the specific use may differ:
  
- **Airlines**:
  - Retrieve and submit their own codes to enable accurate identification and potential tax benefits.
  - By providing the airline code, they ensure streamlined transactions for their fees and associated charges.

- **Travel Agencies**:
  - Retrieve the airline code associated with each payment to ensure correct allocation of fees and taxes.
  - This integration helps identify the airline involved in the transaction for proper funds distribution.  

#### Steps to Retrieve the List

1. Use the following endpoints based on your environment:

- **Sandbox**: `https://sandbox.api.payulatam.com/payments-api/rest/v4.3/payments/airline`
- **Production**: `https://api.payulatam.com/payments-api/rest/v4.3/payments/airline`

2. Include the following query parameter in your request:

| **Query Parameter** | **Description** |
|-|-|
| `accountID` | The unique identifier that PayU Latam assigned to your merchant account. |

3. Include the following header parameter for authentication:

| **Header Parameter** | **Description** |
|-|-|
| `Authorization` | Authentication header value for performing a valid `get` request. |

**Example of JavaScript code to generate the authentication header:**

```javascript
var contentToSign = "pRRXKOl8ikMmt9u" + ":" + "4Vj8eK4rloUd272L48hsrarnUA";
var base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(contentToSign));
var authenticationHeader = "Basic " + base64.toString();
```

{{% alert title="Note" color="info"%}}

Airline codes are typically stable but may change occasionally. We recommend querying the API periodically to ensure accuracy.

{{% /alert %}}

#### Response Example:

The response will be a JSON or XML payload containing an array of airlines with their respective codes and descriptions.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

```JSON
{
  "airlines": [
    {
      "code": "81",
      "description": "AVIA MARKETING LTDA NAL Nacional"
    },
    .
    .
    .
    {
      "code": "65",
      "description": "OCEANAIR LINHAS AEREAS S.A Nacional"
    }
  ]
}
```
<br>

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

```XML
<com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlinesListResponse>
 <airlines>
 <com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 <code>80</code>
 <description>AVIATUR S.A. BOG Internacional</description>
 </com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 .
 .
 .
 <com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 <code>87</code>
 <description>LAN AIRLINES Nacional</description>
 </com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 </airlines>
</com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlinesListResponse>
```

{{< /tab >}}

{{< /tabs >}}

### 2) Create the WebCheckout Form 
 
This step involves redirecting your customers to PayU's secure payment page where they can choose their preferred payment method and complete the purchase. To achieve this, simply add the retrieved airline code from the previous step, along with any airport fees and taxes, as hidden fields within your payment form.

#### Payment Form for Airlines

Include the specific parameters for airlines in addition to the standard parameters for the <a href="https://developers.payulatam.com/latam/en/docs/integrations/webcheckout-integration/payment-form.html" target="_blank">payment form</a>.

| Field | Type | Size | Description | Example |
|---|---|---|---|---|
| airline | Alphanumeric | 4 | Airline code | 29 |
| amount | Number | 10.2 | Total amount of the transaction. It can contain two decimal digits. Example 10000.00 or 10000. | 119000 |
| tax | Number | 10.2 | VAT value of the transaction. In Colombia, if VAT is not specified, the system automatically applies a 19% rate. This value can include two decimal places, such as 19000.00. If the product or service is exempt from VAT, set this value to 0. | 19000 |
| taxReturnBase | Number | 10.2 | Base value to calculate the VAT. If the product or service is VAT exempt, assign 0 to this variable. | 100000 |
| additionalValue | Number | 10.2 | Airport fares and other taxes. | 25000 |

##### WebCheckout Form Example

Below, an example of the WebCheckout form:

```HTML
<form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
 <input name="merchantId" type="hidden" value="508029">
 <input name="accountId" type="hidden" value="513128">
 <input name="description" type="hidden" value="Flight 12345">
 <input name="referenceCode" type="hidden" value="PNR-123">
 <input name="airline" type="hidden" value="29" >
 <input name="amount" type="hidden" value="119000">
 <input name="tax" type="hidden" value="19000">
 <input name="taxReturnBase" type="hidden" value="100000">
 <input name="additionalValue" type="hidden" value="25000">
 <input name="currency" type="hidden" value="COP" >
 <input name="algorithmSignature" type="hidden" value="SHA256">
 <input name="signature" type="hidden" value="b94d73892255c4f53af4282e3a5b6551526a922f1fcf1412fafa6bdf8bbe32f0">
 <input name="buyerEmail" type="hidden" value="pruebas@payulatam.com">
 <input name="responseUrl" type="hidden" value="http://www.mysite.com/response-page">
 <input name="confirmationUrl" type="hidden" value="http://www.mysite.com/confirmation-page">
 <input name="test" type="hidden" value="0">
 <input name="Submit" type="submit" value="Send">
</form>
 ```

 #### Payment Form for Travel Agencies

Include the specific parameters for travel agencies in addition to the standard parameters for the <a href="https://developers.payulatam.com/latam/en/docs/integrations/webcheckout-integration/payment-form.html" target="_blank">payment form</a>.

| Field | Type | Size | Description | Example |
|---|---|---|---|---|
| airline | Alphanumeric | 4 | Airline code | 29 |
| amount | Number | 10.2 | Total amount of the transaction. It can contain two decimal digits. | 119000 |
| tax | Number | 10.2 | VAT value of the transaction. In Colombia, if VAT is not specified, the system automatically applies a 19% rate. This value can include two decimal places, such as 19000.00. If the product or service is exempt from VAT, set this value to 0. | 19000 |
| taxReturnBase | Number | 10.2 | Base value to calculate the VAT. If the product or service is VAT exempt, assign 0 to this variable. | 100000 |
| additionalValue | Number | 10.2 | Airline airport fares and other taxes. | 25000 |
| administrativeFee | Number | 10.2 | Amount of the travel agency administrative fee. | 5950 |
| taxAdministrativeFee | Number | 10.2 | Amount of the travel agency administrative fee tax. | 950 |
| taxAdministrativeFeeReturnBase | Number | 10.2 | Base value to calculate the tax of the administrative fee. | 5000 |

##### WebCheckout Form Example

Below, an example of the WebCheckout form:

```HTML
<form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
 <input name="merchantId" type="hidden" value="508029">
 <input name="accountId" type="hidden" value="513128">
 <input name="description" type="hidden" value="Flight 12345">
 <input name="referenceCode" type="hidden" value="PNR-123">
 <input name="airline" type="hidden" value="29" >
 <input name="amount" type="hidden" value="119000">
 <input name="tax" type="hidden" value="19000">
 <input name="taxReturnBase" type="hidden" value="100000">
 <input name="additionalValue" type="hidden" value="25000">
 <input name="administrativeFee" type="hidden" value="5950">
 <input name="taxAdministrativeFee" type="hidden" value="950">
 <input name="taxAdministrativeFeeReturnBase" type="hidden" value="5000">
 <input name="currency" type="hidden" value="COP" >
 <input name="algorithmSignature" type="hidden" value="SHA256">
 <input name="signature" type="hidden" value="b94d73892255c4f53af4282e3a5b6551526a922f1fcf1412fafa6bdf8bbe32f0">
 <input name="buyerEmail" type="hidden" value="pruebas@payulatam.com">
 <input name="responseUrl" type="hidden" value="http://www.mysite.com/response-page">
 <input name="confirmationUrl" type="hidden" value="http://www.mysite.com/confirmation-page">
 <input name="test" type="hidden" value="0">
 <input name="Submit" type="submit" value="Send">
</form>
 ```
