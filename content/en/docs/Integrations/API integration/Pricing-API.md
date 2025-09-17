---
title: "Pricing API"
linkTitle: "Pricing API"
date: 2025-06-29T12:38:41-05:00
description: >
    The Pricing API lets you query all available financing options and associated costs for your transactions. This includes the pricing configuration of your PayU virtual account, such as standard installments, interest-free installments, and other features relevant to your customers.
weight: 50
tags: ["subtopic"]
---

## Pricing Options

The Pricing API allows you to retrieve financing options available for a given transaction, including standard installment plans and interest-free promotions. Each option specifies the applicable payment methods, eligible banks (if any), the days of the week it is available, and the validity period of any promotional program.

The table below shows where each type of installment option is available across PayU Latam countries. For more details, see the [Interest-Free Installments](https://developers.payulatam.com/latam/en/docs/services/promotions.html) documentation.

<table style="width: 60%; min-width: 300px; border-collapse: collapse;">
  <tr>
    <th style="width: 40%; text-align: left;">Installment Type</th>
    <th colspan="2" style="width: 60%; text-align: left;">Available Countries</th> 
  </tr>
  <tr>
    <td><strong>Standard Installments</strong></td>
    <td style="width: 30%;" >
      <img src="/assets/Argentina.png" width="15px"/> &nbsp;Argentina<br>
      <img src="/assets/Brasil.png" width="15px"/> &nbsp;Brazil<br>
      <img src="/assets/Chile.png" width="15px"/> &nbsp;Chile<br>      
    </td>
    <td style="width: 70%;" >
      <img src="/assets/Colombia.png" width="15px"/> &nbsp;Colombia<br>
      <img src="/assets/Mexico.png" width="15px"/> &nbsp;Mexico<br>      
      <img src="/assets/Peru.png" width="15px"/> &nbsp;Peru
    </td>
  </tr>  
  <tr>
    <td><strong>General Interest-Free Installments (MSI)</strong></td>
    <td style="width: 30%;" >
      <img src="/assets/Argentina.png" width="15px"/> &nbsp;Argentina
    </td>  
    <td style="width: 70%;" >      
      <img src="/assets/Mexico.png" width="15px"/> &nbsp;Mexico
    </td>
  </tr>
  <tr>
    <td><strong>Specific Interest-Free Installments</strong></td>
    <td style="width: 30%;" >
      <img src="/assets/Argentina.png" width="15px"/> &nbsp;Argentina<br>
      <img src="/assets/Colombia.png" width="15px"/> &nbsp;Colombia
    </td>  
    <td style="width: 70%;" >    
      <img src="/assets/Mexico.png" width="15px"/> &nbsp;Mexico<br>
      <img src="/assets/Peru.png" width="15px"/> &nbsp;Peru
    </td>
  </tr>  
</table>

{{% alert title="Note" color="info"%}}

To enable an interest-free installment plan according to your agreements with local issuers, contact your PayU sales representative.

{{% /alert %}}

The following diagram illustrates the full process, from querying the Pricing API to transaction approval:

{{< promotions/pricingApi >}}

## Querying the Available Pricing Options

To retrieve the pricing information, send a `GET` request to the appropriate URL based on the environment.

{{% alert title="API Endpoints" color="info"%}}

* Test: ```GET https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing```
* Production: ```GET https://api.payulatam.com/payments-api/rest/v4.9/pricing```

{{% /alert %}}

As this is a RESTful service, we strongly recommend against strict schema validation. Avoiding schema validation ensures seamless integration, minimizing changes when updates are made to the Web Service.

### Authentication for Requests

To authenticate API requests, you must use an HMAC-based mechanism. You need your `MerchantPublicKey`, which can be found in your PayU Management Panel under **_Settings_** > **_Technical Configuration_** > **_Public Key_**.

{{% alert title="Note" color="info"%}}

To test in the sandbox environment, use the credentials listed in the [Test Your Solution](https://developers.payulatam.com/latam/en/docs/getting-started/test-your-solution.html) documentation.

{{% /alert %}}

![PrintScreen](/assets/Promotions/PublicKey.png)

#### Configuring the Authentication

Include the `Authorization` and `Date` headers in your request. The `Authorization` header follows this structure:

```java
"Hmac" + " " + MerchantPublicKey + ":" + Signature
```

<br>

Where ```Signature``` is created as follows:

```java
Signature = Base64(HMAC-SHA256(MerchantApiKey,ContentToSign)) 
```

<br>

And ```ContentToSign``` corresponds to:

```java
HTTP-Verb + "\n" + "\n" + "\n" +
Date + "\n" +
URI
```

{{% alert title="Note" color="info"%}}

It is mandatory to include the three line breaks (```\n```) after the ```HTTP-Verb```.

{{% /alert %}}

#### Example: Generating the Authentication Header

The following example shows how to create the Authentication header using the following test values:

**ContentToSign**:
```java
GET 

Fri, 28 Apr 2017 18:32:01 GMT
/payments-api/rest/v4.9/pricing
```

<br>

**MerchantApiKey**:
```java
4Vj8eK4rloUd272L48hsrarnUA
```

<br>

**MerchantPublicKey**:
```java
PKaC6H4cEDJD919n705L544kSU
```

<br>

Encrypt `ContentToSign` using `MerchantApiKey` as the passphrase. Then, concatenate the result with `MerchantPublicKey` as shown below:

**Authorization**
```java
Hmac PKaC6H4cEDJD919n705L544kSU:sIxh54sANfKaxO0ugX6QwhPmZRS+TGy8gmdCwr3kjP0= 
```

<br>

To prevent replay attacks, include the `Date` header formatted as follows:

**Date**
```java
Mon, 11 May 2015 21:14:41 GMT
```

<br>

If REST client restrictions prevent using `Date`, you may alternatively send `x-hmac-date` using the same format:

**x-hmac-date**
```java
Mon, 11 May 2015 21:14:41 GMT
```

### Parameters for Request and Response

This section describes the parameters used in the API request and the fields returned in the response.

The request parameters define the input values required to retrieve pricing, promotions, and tax details. The response parameters outline the structure and meaning of the data returned, including transaction amounts, payment method fees, installment breakdowns, promotions, and applicable taxes.

<details>

<summary>Request Parameters</summary>

<br>

<div class="variables"></div>

| Parameter | Description | Mandatory |
|-|-|:-:|
| `accountId` | Unique identifier of your account. | Yes |
| `currency` | Currency associated with your account. | No |
| `amount` | Total amount of the purchase. Used to calculate the fees shown in the response. Does not filter promotions by amount. | Yes |
| `paymentMethod` | Optional parameter to filter promotions by payment method. For more information about available methods, see the [Select your Payment Method](https://developers.payulatam.com/latam/en/docs/getting-started/select-your-payment-method.html) documentation. | No |
| `tax` | Amount of tax included in the transaction. Applicable only in Argentina and Colombia. | No |
| `taxReturnBase` | Base value used to calculate the tax. Applicable only in Argentina and Colombia. | No |

</details>

<details>

<summary>Response Parameters</summary>

<br>

<div class="variables"></div>

| Field Name | Type | Description |
|------------|------|-------------|
| `amount` | Object | Details of the transaction amount. |
| `amount` > `value` | Number | Total value of the transaction. |
| `amount` > `tax` | Number | Amount of tax included in the transaction. |
| `amount` > `purchaseValue` | Number | Purchase value before taxes. |
| `amount` > `adminFeeValue` | Number | Administrative fee amount included in the transaction. |
| `amount` > `adminFeeTax` | Number | Tax amount applied to the administrative fee. |
| `amount` > `adminFeeTaxableBase` | Number | Taxable base used to calculate taxes on the administrative fee. |
| `amount` > `currency` | String | Currency code of the original transaction. |
| `amount` > `taxableBase` | Number | Value of the transaction used as the tax base. |
| `convertedAmount` | Object | Contains the transaction amount converted to another currency (if applicable). |
| `convertedAmount` > `value` | Number | Converted total transaction amount. |
| `convertedAmount` > `tax` | Number | Converted tax amount. |
| `convertedAmount` > `purchaseValue` | Number | Converted purchase value before taxes. |
| `convertedAmount` > `adminFeeValue` | Number | Converted administrative fee value. |
| `convertedAmount` > `adminFeeTaxableBase` | Number | Converted taxable base for calculating administrative fee taxes. |
| `convertedAmount` > `currency` | String | Currency code of the converted amount. |
| `convertedAmount` > `taxableBase` | Number | Converted value used as the tax base. |
| `paymentMethodFee` | List | Breakdown of costs incurred by the merchant based on the payment method. |
| `paymentMethodFee` > `paymentMethod` | String | Name of the payment method. |
| `paymentMethodFee` > `pricingFees` | Object | Contains pricing details by payment method and installment range. |
| `paymentMethodFee` > `pricingFees` > `installments` | String | Number of installments, either a single value (e.g., `1`) or, in applicable countries, a range (e.g., `1-36`). |
| `paymentMethodFee` > `pricingFees` > `pricing` | Object | Contains pricing details for the transaction. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` | Object | Breakdown of interest and fees charged to the payer. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` > `commission` | Number | Total commission amount (including taxes) charged to the payer. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` > `interests` | Number | Total interest amount (including taxes) charged to the payer. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` > `total` | Number | Total amount to be paid by the payer, including interest and fees. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` | Object | Breakdown of interest and fees charged to the merchant. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` > `commission` | Number | Total commission amount (including taxes) charged to the merchant. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` > `interests` | Number | Total interest amount (including taxes) charged to the merchant. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` > `total` | Number | Total cost incurred by the merchant, including interest and fees. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `totalValue` | Number | Total value of the transaction including interest and fees. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `totalIncomeTransaction` | Number | Total income generated by the transaction. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `additionalInfo` | Object | Includes financial information such as the Annual Effective Rate (TEA) and Total Financial Cost (CFT). Applies only to Argentina. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `additionalInfo` > `cft` | Number | Total Financial Cost (CFT) applied to the transaction. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `additionalInfo` > `tea` | Number | Annual Effective Rate (TEA) applied to the transaction. |
| `paymentMethodFee` > `pricingFees` > `promos` | Array | List of available promotions applicable to the pricing configuration. |
| `paymentMethodFee` > `pricingFees` > `promos` > `id` | Integer | Unique promotion ID in the PayU system. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` | Object | Contains pricing details for the specific promotion. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` | Object | Breakdown of interest and fees for the payer under the promotion. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` > `commission` | Number | Commission charged to the payer under the promotion. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` > `interests` | Number | Interest charged to the payer under the promotion. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` > `total` | Number | Total amount to be paid by the payer, including commissions and interest, under the promotion. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` | Object | Breakdown of interest and fees for the merchant under the promotion. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` > `commission` | Number | Commission charged to the merchant under the promotion. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` > `interests` | Number | Interest charged to the merchant under the promotion. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` > `total` | Number | Total cost for the merchant, including commissions and interest, under the promotion. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `totalValue` | Number | Total transaction value including commissions and interest under the promotion. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `totalIncomeTransaction` | Number | Total income generated by the transaction under the promotion. |
| `paymentMethodFee` > `pricingFees` > `promos` > `priority` | Number | Promotion priority level within the pricing configuration. |
| `promotions` | Object | Contains details about the applied promotion (if applicable). |
| `promotions` > `id` | Integer | Unique promotion ID in the PayU system. |
| `promotions` > `title` | String | Promotion title (maximum 50 characters). |
| `promotions` > `termsAndConditions` | String | Terms and conditions applicable to the promotion (maximum 250 characters). |
| `promotions` > `paymentMethod` | String | Payment method associated with the promotion. |
| `promotions` > `subFranchise` | String | Sub-brand or sub-franchise associated with the promotion. If `subFranchise` is not provided, the promotion is not tied to a local card (such as Naranja), but instead applies to an international brand (e.g., Mastercard), as defined by `paymentMethodMain`. |
| `promotions` > `banksNames` | List | List of banks where the promotion applies. If `banksNames` is not provided, the promotion applies to the entire payment method, with `paymentMethodMain` taking precedence. |
| `promotions` > `paymentMethodMain` | String | Main payment method associated with the promotion. |
| `promotions` > `iin` | List | List of eligible card IIN/BIN numbers for the promotion. |
| `promotions` > `iins` | List | List of eligible card IIN/BIN numbers for the promotion. If `iins` is not provided, the promotion is available for all cards under the payment method specified in `paymentMethodMain`. |
| `promotions` > `days` | List | Days of the week the promotion is available. |
| `promotions` > `startDate` | DateTime | Promotion start date and time. |
| `promotions` > `endDate` | DateTime | Promotion end date and time. |
| `promotions` > `priority` | Number | Promotion priority level. |
| `promotions` > `type` | String | Type of promotion. Possible values:<br><br>**PRICING** – The promotion is automatically applied based on configured pricing rules. For example, in Mexico, if interest-free installments are configured, the merchant only needs to send the number of installments in `transaction > extraParameters > INSTALLMENTS_NUMBER`. The system will automatically apply the interest-free condition without requiring a promotion ID.<br><br>**MSI** – Requires the merchant to explicitly send both the promotion ID and number of installments. This applies when the promotion must match a specific combination of payment method, installments, and promotion ID. To apply this type, the following fields must be sent:<br>- `transaction > extraParameters > INSTALLMENTS_NUMBER`<br>- `transaction > extraParameters > PROMOTION_ID`<br><br>**Note:** If the promotion ID is not sent when required, the transaction will be processed without the promotion, using the default pricing configuration for the selected installment option. |
| `paymentTaxesDetails` | Object | Contains details of applied taxes (structure depends on the tax service response). |
| `taxesServiceFailed` | Boolean | Indicates whether the tax calculation service failed. |

</details>

### API Call

To retrieve available pricing options, send a `GET` request using the following format:

```JAVASCRIPT
GET
https://{env-api}.payulatam.com/payments-api/rest/v4.9/pricing?accountId={accountId}&currency={currency}&amount={amount}&paymentMethod={paymentMethod}
Accept: application/json
Content-Type: application/json
Authorization: Hmac PKaC6H4cEDJD919n705L544kSU:sIxh54sANfKaxO0ugX6QwhPmZRS+TGy8gmdCwr3kjP0=
Date: Fri, 16 May 2025 14:37:05 GMT
```

<br>

 The `{env-api}` variable should be set as follows:
- `sandbox.api` for testing
- `api` for production

The `paymentMethod` parameter is optional and can be used to filter promotions by a specific payment method. The `tax` and `taxReturnBase` parameters are also optional but are only applicable in Argentina and Colombia.

**Request Example for Argentina:**

```JAVA
https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing?accountId=512322&currency=ARS&amount=110524.91&tax=19182.01&taxReturnBase=91342.90
```
<br>

**Request Example for Colombia:**

```JAVA
https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing?accountId=512321&currency=COP&amount=11601.71&tax=1769.75&taxReturnBase=9831.96
```
<br>

**Request Example for Mexico:**

```JAVA
https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing?accountId=512324&currency=MXN&amount=15662.37
```
<br>

**Request Example for Peru:**

```JAVA
https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing?accountId=516634&currency=PEN&amount=2897.78
```

<br>

**Response Example:**

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
{
    "amount": {
        "value": 1000.00,
        "tax": 0,
        "purchaseValue": 1000.00,
        "currency": "ARS"
    },
    "convertedAmount": {
        "value": 1000.00,
        "tax": 0.00,
        "purchaseValue": 1000.00,
        "currency": "ARS"
    },
    "promotions": [
        {
            "id": 49,
            "title": "Promotion_ID AMEX",
            "termsAndConditions": "SI",
            "paymentMethodMain": "AMEX",
            "startDate": "2018-08-16 18:48:00",
            "endDate": "2090-08-16 18:48:00",
            "days": [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY"
            ],
            "priority": 10,
            "type": "MSI"
        },
        {
            "id": 45,
            "title": "Promotion Test - Master",
            "termsAndConditions": "Terminos y condiciones",
            "paymentMethodMain": "MASTERCARD",
            "startDate": "2018-06-26 17:06:00",
            "endDate": "2030-06-26 17:06:00",
            "days": [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY"
            ],
            "priority": 10,
            "type": "MSI"
        }
    ],
    "paymentMethodFee": [
        {
            "paymentMethod": "DINERS",
            "pricingFees": [
                {
                    "installments": "1",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 0.00,
                            "total": 0.00
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1000.00,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "0%",
                            "tea": "0%"
                        }
                    }
                },
                {
                    "installments": "3",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 171.29,
                            "total": 171.29
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1171.29,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "162%",
                            "tea": "123.28%"
                        }
                    }
                },
                {
                    "installments": "6",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 230.01,
                            "total": 230.01
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1230.01,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "107%",
                            "tea": "83.97%"
                        }
                    }
                },
                {
                    "installments": "9",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 340.05,
                            "total": 340.05
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1340.04,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "108%",
                            "tea": "85.03%"
                        }
                    }
                },
                {
                    "installments": "12",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 490.01,
                            "total": 490.01
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1490.02,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "119%",
                            "tea": "93.68%"
                        }
                    }
                },
                {
                    "installments": "18",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 641.38,
                            "total": 641.38
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1641.39,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "97%",
                            "tea": "77.91%"
                        }
                    }
                },
                {
                    "installments": "24",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 822.72,
                            "total": 822.72
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1822.72,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "90%",
                            "tea": "72.47%"
                        }
                    }
                }
            ]
        },
        {
            "paymentMethod": "AMEX",
            "pricingFees": [
                {
                    "installments": "1",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 0.00,
                            "total": 0.00
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1000.00,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "0%",
                            "tea": "0%"
                        }
                    },
                    "promos": [
                        {
                            "id": 49,
                            "pricing": {
                                "payerDetail": {
                                    "commission": 0.00,
                                    "interests": 0.00,
                                    "total": 0.00
                                },
                                "merchantDetail": {
                                    "commission": 1044.65,
                                    "interests": 0.00,
                                    "total": 1044.65
                                },
                                "totalValue": 1000.00,
                                "totalIncomeTransaction": -44.65,
                                "additionalInfo": {
                                    "cft": "0%",
                                    "tea": "0%"
                                }
                            },
                            "priority": 10
                        }
                    ]
                },
                {
                    "installments": "3",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 171.29,
                            "total": 171.29
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1171.29,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "162%",
                            "tea": "123.28%"
                        }
                    }
                },
                {
                    "installments": "6",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 230.01,
                            "total": 230.01
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1230.01,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "107%",
                            "tea": "83.97%"
                        }
                    }
                },
                {
                    "installments": "9",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 340.05,
                            "total": 340.05
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1340.04,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "108%",
                            "tea": "85.03%"
                        }
                    }
                },
                {
                    "installments": "12",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 490.01,
                            "total": 490.01
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1490.02,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "119%",
                            "tea": "93.68%"
                        }
                    }
                },
                {
                    "installments": "18",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 641.38,
                            "total": 641.38
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1641.39,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "97%",
                            "tea": "77.91%"
                        }
                    }
                },
                {
                    "installments": "24",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 822.72,
                            "total": 822.72
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1822.72,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "90%",
                            "tea": "72.47%"
                        }
                    }
                }
            ]
        }
    ],
    "paymentTaxesDetails": [],
    "taxesServiceFailed": true
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```XML
<consultPriceListResponse xmlns:atom="http://www.w3.org/2005/Atom" xmlns:ns3="http://wadl.dev.java.net/2009/02">
    <amount>
        <value>1000.00</value>
        <tax>0</tax>
        <purchaseValue>1000.00</purchaseValue>
        <currency>ARS</currency>
    </amount>
    <convertedAmount>
        <value>1000.00</value>
        <tax>0.00</tax>
        <purchaseValue>1000.00</purchaseValue>
        <currency>ARS</currency>
    </convertedAmount>
    <promotions>
        <promotion id="49" title="Promotion_ID AMEX">
            <priority>10</priority>
            <type>MSI</type>
            <paymentMethod>AMEX</paymentMethod>
            <termsAndConditions>SI</termsAndConditions>
            <startDate>2018-08-16 18:48:00</startDate>
            <endDate>2090-08-16 18:48:00</endDate>
            <days>
                <day>MONDAY</day>
                <day>TUESDAY</day>
                <day>WEDNESDAY</day>
                <day>THURSDAY</day>
                <day>FRIDAY</day>
                <day>SATURDAY</day>
                <day>SUNDAY</day>
            </days>
        </promotion>
        <promotion id="45" title="Promotion Test - Master">
            <priority>10</priority>
            <type>MSI</type>
            <paymentMethod>MASTERCARD</paymentMethod>
            <termsAndConditions>Terminos y condiciones</termsAndConditions>
            <startDate>2018-06-26 17:06:00</startDate>
            <endDate>2030-06-26 17:06:00</endDate>
            <days>
                <day>MONDAY</day>
                <day>TUESDAY</day>
                <day>WEDNESDAY</day>
                <day>THURSDAY</day>
                <day>FRIDAY</day>
                <day>SATURDAY</day>
                <day>SUNDAY</day>
            </days>
        </promotion>
    </promotions>
    <paymentMethodFee>
        <paymentMethodFeeDetail paymentMethod="DINERS">
            <pricingFees>
                <fee installments="1">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>0.00</interests>
                            <total>0.00</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1000.00</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>0%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>0%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="3">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>171.29</interests>
                            <total>171.29</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1171.29</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>162%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>123.28%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="6">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>230.01</interests>
                            <total>230.01</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1230.01</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>107%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>83.97%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="9">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>340.05</interests>
                            <total>340.05</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1340.04</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>108%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>85.03%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="12">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>490.01</interests>
                            <total>490.01</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1490.02</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>119%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>93.68%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="18">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>641.38</interests>
                            <total>641.38</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1641.39</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>97%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>77.91%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="24">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>822.72</interests>
                            <total>822.72</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1822.72</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>90%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>72.47%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
            </pricingFees>
        </paymentMethodFeeDetail>
        <paymentMethodFeeDetail paymentMethod="AMEX">
            <pricingFees>
                <fee installments="1">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>0.00</interests>
                            <total>0.00</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1000.00</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>0%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>0%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                    <promos>
                        <promo id="49">
                            <priority>10</priority>
                            <pricing>
                                <payerDetail>
                                    <commission>0.00</commission>
                                    <interests>0.00</interests>
                                    <total>0.00</total>
                                </payerDetail>
                                <merchantDetail>
                                    <commission>1044.65</commission>
                                    <interests>0.00</interests>
                                    <total>1044.65</total>
                                </merchantDetail>
                                <totalValue>1000.00</totalValue>
                                <totalIncomeTransaction>-44.65</totalIncomeTransaction>
                                <additionalInfo>
                                    <entry>
                                        <key>cft</key>
                                        <value>0%</value>
                                    </entry>
                                    <entry>
                                        <key>tea</key>
                                        <value>0%</value>
                                    </entry>
                                </additionalInfo>
                            </pricing>
                        </promo>
                    </promos>
                </fee>
                <fee installments="3">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>171.29</interests>
                            <total>171.29</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1171.29</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>162%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>123.28%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="6">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>230.01</interests>
                            <total>230.01</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1230.01</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>107%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>83.97%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="9">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>340.05</interests>
                            <total>340.05</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1340.04</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>108%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>85.03%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="12">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>490.01</interests>
                            <total>490.01</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1490.02</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>119%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>93.68%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="18">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>641.38</interests>
                            <total>641.38</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1641.39</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>97%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>77.91%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="24">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>822.72</interests>
                            <total>822.72</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1822.72</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>90%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>72.47%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
            </pricingFees>
        </paymentMethodFeeDetail>
    </paymentMethodFee>
    <paymentTaxesDetails/>
    <taxesServiceFailed>true</taxesServiceFailed>
</consultPriceListResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Processing Transactions with Installments

This section explains how to use and apply the different installment plans.

{{% alert title="Note" color="info"%}}

Consider that the Pricing API only provides information about available installment options, to create and submit transactions, use the Payments API of the corresponding country:

* [Argentina]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}}) | [Brazil]({{< ref "Payments-API-Brazil.md#submit-transactions-using-credit-cards" >}}) | [Chile]({{< ref "Payments-API-Chile.md#submit-transactions-using-credit-debit-or-prepaid-cards" >}}) | [Colombia]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}) | [Mexico]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}})
| [Peru]({{< ref "Payments-API-Peru.md#submit-transactions-using-credit-or-debit-cards" >}})

{{% /alert %}}

### Installment Types

The table below summarizes the available installment types, their required parameters, and who covers the interest.

| Installment Type | Applicable Countries | Required Parameters | Who Covers the Interest? | Notes |
| --- | --- | --- | --- | --- |
| **Standard Installments** | Argentina, Brazil, Chile, Colombia, Mexico, Peru | `INSTALLMENTS_NUMBER` | Payer | Default installment plan with interest. |
| **General Interest-Free Installments (MSI)** | Argentina, Mexico | `INSTALLMENTS_NUMBER` | Merchant | Must be enabled in your PayU account. No promotion ID required. In Mexico, the promotion ID 9999 is not required. |
| **Specific Interest-Free Installments** | Argentina, Colombia, Mexico, Peru | `PROMOTION_ID` + `INSTALLMENTS_NUMBER` | Merchant | Linked to a specific promotion or agreement. |

**Considerations:**

* Confirm that interest-free or MSI plans are enabled in your PayU account to ensure the system applies them correctly.
* If you send only `INSTALLMENTS_NUMBER` without an active General Interest-Free Installments plan, the system applies standard installments and charges interest to the payer.

### Displaying Eligible Installments at Checkout

When displaying available installment options during checkout, validate eligibility using the following rules:

1. Match the card's BIN with the values in `promotions[].iin`.
2. If no BINs are specified, check whether the user’s bank matches any in `promotions[].banksNames`.
3. If no banks are specified, fall back to the payment method (card brand) defined in `paymentMethodFee[].paymentMethod`.

Use the following fields from the Pricing API response to determine eligibility and display the correct installment options:

* `paymentMethodFee[].pricingFees[].installments` → Number of installments available
* `paymentMethodFee[].pricingFees[].promos[].id` → Associated promotion ID
* `promotions[].id, promotions[].iin, promotions[].banksNames` → Promotion eligibility criteria
* `paymentMethodFee[].paymentMethod` → Card brand (e.g., Visa, Mastercard)

By validating this hierarchy, you ensure that users only see installment options that apply to their card.

#### Checkout Examples

##### Example: Standard Installments in Argentina

In this example, the payer covers the interest. Values in `paymentMethodFee[].pricingFees[].pricing.payerDetail` are greater than `0`.

![PrintScreen](/assets/Promotions/promo2.png)

##### Example: General Interest-Free Installments in Argentina

In this example, the merchant covers the interest. Values in `paymentMethodFee[].pricingFees[].pricing.merchantDetail` are greater than `0`.

![PrintScreen](/assets/Promotions/promo3.png)

##### Example: Specific Interest-Free Installments in Argentina

In this example, the merchant covers the interest. Values in `paymentMethodFee[].pricingFees[].promos[].pricing.merchantDetail` are greater than `0`.

![PrintScreen](/assets/Promotions/promo5.png)

#### Displaying CFT and TEA in Argentina

According to Resolution E 51/2017 of the Secretaría de Comercio (Argentina), merchants must clearly display financing information when processing credit or debit card transactions with installments.

Specifically, you must:

- Differentiate the cash price from the financing cost in both interest-bearing and interest-free installments.  
- Display the **Total Financial Cost (CFT)** prominently next to the cash price.  
  - Use a highlighted color and a font size at least five times larger than the one used for TEA, the number of installments, and their amount.  
  - The CFT must include interest and applicable taxes (such as VAT).  
- Display the **Annual Effective Rate (TEA)**, which shows the difference between the cash price and the financed price.  
- Avoid using the phrase *“sin interés”* (without interest) or similar wording if the financial cost is incorporated into the product or service price.

This information is available in the API response fields:

- `paymentMethodFee[].pricingFees[].pricing.additionalInfo`  
- `paymentMethodFee[].pricingFees[].promos[].pricing.additionalInfo`

##### Example Display

When showing installment options to customers, include the following elements:

![PrintScreen](/assets/Payments/Installments_en.png)

Where: 

| Number in the screen | Option         | Description                                       |
|:--------------------:|----------------|---------------------------------------------------|
|           1          | Total purchase | Total amount of the purchase without financing.   |
|           2          | Total payment  | Total amount financed of the purchase.            |
|           3          | Installments   | Number of installments and their amount.          |
|           4          | TEA            | The annual effective interest rate (TEA) applied. |
|           5          | CFT            | The total financial cost (CFT).                   |

{{% alert title="Note" color="info"%}}

For interest-free installments, you must still display TEA and CFT, but set their values to **0%**.

{{% /alert %}}

### Identifying Installment Types by Interest Allocation

The table below shows how to identify the installment type based on how the system allocates interest between the payer and the merchant, using fields from the Pricing API response.

<table style="width:100%; border-collapse:collapse;">
  <thead>
    <tr>
      <th style="text-align:left;">Installment Type</th>
      <th style="text-align:center;">Payer Interest</th>
      <th style="text-align:center;">Merchant Interest</th>
      <th style="text-align:left;">Who Assumes the Interest?</th>
      <th style="text-align:left;">Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Standard Installment (No Interest)</strong></td>
      <td style="text-align:left;">
        Values in: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> pricing.payerDetail</code> = <code>0</code><p>
        <br>In Mexico: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.payerDetail</code> = <code>0</code>
      </td>
      <td style="text-align:left;">
        Values in: <br>
        <code>paymentMethodFee[].pricingFees[] <br> .pricing.merchantDetail</code> = <code>0</code><p>
        <br>In Mexico: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.merchantDetail</code> = <code>0</code><p>
      </td>
      <td>Bank (outside PayU's Pricing API)</td>
      <td>Interest-free from PayU's perspective; any fees come directly from the bank.</td>
    </tr>
    <tr>
      <td><strong>Standard Installment (With Interest)</strong></td>
      <td style="text-align:left;">
        Values in: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> pricing.payerDetail</code> > <code>0</code><p>
        <br>In Mexico: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.payerDetail</code> > <code>0</code><p>
      </td>
      <td style="text-align:left;">
        Values in: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> pricing.merchantDetail</code> = <code>0</code><p>
        <br>In Mexico: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.merchantDetail</code> = <code>0</code><p>
      </td>
      <td>Payer</td>
      <td>Merchant does not cover interest.</td>
    </tr>
    <tr>
      <td><strong>General Interest-Free Installments</strong></td>
      <td style="text-align:left;">
        Values in: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> pricing.payerDetail</code> = <code>0</code><p>
        <br>In Mexico: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.payerDetail</code> = <code>0</code>
      </td>
      <td style="text-align:left;">
        Values in: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> pricing.merchantDetail</code> > <code>0</code><p>
        <br>In Mexico: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.merchantDetail</code> > <code>0</code><p>
      </td>
      <td>Merchant</td>
      <td>Applies to the entire payment method or card brand.</td>
    </tr>
  </tbody>
</table>

### Identifying Specific Interest-Free Installments

When you query the Pricing API, you can identify a specific promotional installment if the `promos` array contains a promotion where:

- The **payer** pays **0 interest**.
- The **merchant** covers the full cost (commission or interest is greater than `0`).

This type of promotion may apply to specific banks or BINs tied to a particular card brand.

#### Validating Specific Interest-Free Installments

- Values in `paymentMethodFee[].pricingFees[].promos[].pricing.payerDetail` = `0`
- Values in `paymentMethodFee[].pricingFees[].promos[].pricing.merchantDetail` > `0`

To fully understand a promotion’s conditions, check the `promotions[]` object that matches the promotion ID from:  
- `paymentMethodFee[].pricingFees[].promos[].id`

<table style="width: 60%; min-width: 300px; border-collapse: collapse;">
  <tr>
    <th colspan="2" style="text-align: left;">Key fields in <code>promotions[]</code> to review:</th>
  </tr>
  <tr>
    <td><code>promotions[].id</code></td>
    <td><code>promotions[].banksNames</code></td>
  </tr>
  <tr>
    <td><code>promotions[].title</code></td>
    <td><code>promotions[].iins</code></td>
  </tr>
  <tr>
    <td><code>promotions[].termsAndConditions</code></td>
    <td><code>promotions[].days</code></td>
  </tr>
  <tr>
    <td><code>promotions[].paymentMethod</code></td>
    <td><code>promotions[].startDate</code></td>
  </tr>
  <tr>
    <td><code>promotions[].subFranchise</code></td>
    <td><code>promotions[].endDate</code></td>
  </tr>
  <tr>
    <td><code>promotions[].priority</code></td>
    <td><code>promotions[].type</code></td>
  </tr>
</table>

{{% alert title="Important" color="warning"%}}

When displaying **Specific Interest-Free Installments** at checkout, make sure to show them **only if the BIN, bank, or payment method matches the user’s card**. If you display an ineligible promotion and the user selects it, the transaction will be declined because PayU cannot find a valid authorization route.

{{% /alert %}}

#### Response Example for Specific Interest-Free Installments

The following example illustrates how a response may look when a promotion is tied to specific conditions such as **BIN ranges, banks, card brands, or days of the week**.  

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

```JSON
"promotions": [
  {
    "id": 1218,
    "title": "ABC Bank",
    "termsAndConditions": "6-month interest-free financing for cards with BIN 828076 from ABC Bank. Promotion valid from 08/20/2025 to 08/20/2025. Applies only on weekdays: Tuesday",
    "iin": [
      "828076"
    ],
    "paymentMethodMain": "VISA",
    "startDate": "2025-08-20 00:00:00",
    "endDate": "2025-08-20 23:59:00",
    "days": [
      "TUESDAY"
    ],
    "priority": 10,
    "type": "MSI"
  }
]

```
{{< /tab >}}

{{< tab tabNum="2" >}}

```XML
<promotions>
  <promotion>
    <id>1218</id>
    <title>ABC Bank</title>
    <termsAndConditions>
      6-month interest-free financing for cards with BIN 828076 from ABC Bank. Promotion valid from 08/20/2025 to 08/20/2025. Applies only on weekdays: Tuesday
    </termsAndConditions>
    <iin>
      <value>828076</value>
    </iin>
    <paymentMethodMain>VISA</paymentMethodMain>
    <startDate>2025-08-20 00:00:00</startDate>
    <endDate>2025-08-20 23:59:00</endDate>
    <days>
      <day>TUESDAY</day>
    </days>
    <priority>10</priority>
    <type>MSI</type>
  </promotion>
</promotions>
```
{{< /tab >}}

{{< /tabs >}}

##### Displaying the Terms and Conditions at Checkout

You can use the `termsAndConditions` field to state the details for Specific Interest-Free Installments plans. Below is an example of how to show the payer the conditions at checkout using the response retrieved above:

<img src="/assets/Promotions/promo4.png" style="display: block; margin: 0 auto; width: 550px;">

### Differentiating Standard vs. Specific Interest-Free Installments

When you use the Pricing API, you need to know how the system distinguishes standard installments from promotional ones.

Use the following structure to identify the installment type:

- `paymentMethodFee[].pricingFees[].pricing{}` → Standard installments (no promotion ID)  
- `paymentMethodFee[].pricingFees[].promos[].pricing{}` → Installments linked to a specific `PROMOTION_ID`

**Key Notes**

- The `pricingFees[]` array may include entries with or without a `pricing{}` object.
- The `pricingFees[]` array may include entries with or without a `promos[]` array.
- The `promos[]` array can contain multiple individual promotions.

Depending on which elements are present, you can determine the installment type:

1. **Standard + Promotional:**  
   The installment plan includes both a standard `pricing{}` object and one or more entries in the `promos[]` array.  
   **Example:** A 3-installment Mastercard plan may include a standard pricing option with interest, plus two different interest-free promotions targeting specific BINs.

2. **Standard-Only:**  
   The installment plan includes `pricing{}` but no `promos[]` array.  
   **Example:** A 6-installment Visa plan offers only standard pricing with no available promotions.

3. **Promotional-Only:**  
   The installment plan includes only the `promos[]` array with no `pricing{}` object.  
   **Example:** A 3-installment AMEX plan offers interest-free terms through a promotion that applies to all AMEX cards, with no standard pricing available.

By checking these elements in the API response, you can programmatically decide which promotions to display and how to process each installment correctly.

### Handling Missing Fields in Promotions

In some cases, promotions do not include certain fields. The absence of a field defines how the promotion applies.

| Missing Field | Meaning |
|---------------|---------|
| `promotions[].subFranchise` | The promotion is **not** tied to a local card (e.g., Naranja). Instead, it applies to an international brand (e.g., Mastercard) as defined by `paymentMethodMain`. |
| `promotions[].banksNames` | The promotion applies to **all banks** for the payment method, with `paymentMethodMain` taking priority. |
| `promotions[].iins` | The promotion applies to **all cards** under the payment method specified in `paymentMethodMain`. |

### Processing a Transaction with Standard Installments

To process a transaction using standard installments, specify the number of months in the `extraParameters` field:

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
"extraParameters": {
    "INSTALLMENTS_NUMBER": (number of months)
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
```XML
<extraParameters>
    <entry>
        <string>INSTALLMENTS_NUMBER</string>
        <string>Number of months</string>
    </entry>
</extraParameters>
```
{{< /tab >}}
{{< /tabs >}}
<br>

{{% alert title="Note" color="info"%}}

To create and submit the transactions, use the Payments API of the corresponding country:

* [Argentina]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}}) | [Brazil]({{< ref "Payments-API-Brazil.md#submit-transactions-using-credit-cards" >}}) | [Chile]({{< ref "Payments-API-Chile.md#submit-transactions-using-credit-debit-or-prepaid-cards" >}}) | [Colombia]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}) | [Mexico]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}})
| [Peru]({{< ref "Payments-API-Peru.md#submit-transactions-using-credit-or-debit-cards" >}})

{{% /alert %}}

### Processing a Transaction with General Interest-Free Installments

General Interest-Free Installments plan **do not require a** `PROMOTION_ID`. Once you configure this plan in your PayU account, submit the request with the number of months in the `extraParameters` field:

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
"extraParameters": {
    "INSTALLMENTS_NUMBER": (number of months)
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
```XML
<extraParameters>
    <entry>
        <string>INSTALLMENTS_NUMBER</string>
        <string>Number of months</string>
    </entry>
</extraParameters>
```
{{< /tab >}}
{{< /tabs >}}
<br>

{{% alert title="Note" color="info"%}}

To create and submit the transactions, use the Payments API of the corresponding country:

* [Argentina]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}}) | [Mexico]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}})

{{% /alert %}}

#### Interest-Free Months (MSI) in Mexico

In Mexico, **General Interest-Free Installments** are commonly known as **Meses sin Intereses (MSI)**. This option allows you to offer fixed payment plans (3, 6, 9, 12, or 18 months) without interest.

MSI transactions use the same structure as standard installments by specifying the number of months in the `INSTALLMENTS_NUMBER` field of the `extraParameters` object. Unlike promotional installments, MSI does not require a `PROMOTION_ID`. Valid MSI durations are 3, 6, 9, 12, or 18 months.

**Fields to check:**
- `paymentMethodFee[].pricingFees[].promos[9999].pricing.payerDetail` → no interest.
- `paymentMethodFee[].pricingFees[].promos[9999].pricing.merchantDetail` → has interest.
- `promotions[9999].type` = `PRICING`

{{% alert title="Note" color="info"%}}

Because this promotion is of type `PRICING`, PayU does not require including the `9999` promotion ID to create the transaction or authorization.

{{% /alert %}}

Once you configure this plan in your PayU account, submit the request with the number of months in the `extraParameters` field:

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
"extraParameters": {
    "INSTALLMENTS_NUMBER": (number of months)
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
```XML
<extraParameters>
    <entry>
        <string>INSTALLMENTS_NUMBER</string>
        <string>Number of months</string>
    </entry>
</extraParameters>
```
{{< /tab >}}
{{< /tabs >}}
<br>

##### Considerations

* Supported options: 3, 6, 9, 12, or 18 months.
* Minimum purchase amounts:
    - 3 months → $300 MXN
    - 6 months → $600 MXN
    - 9 months → $900 MXN
    - 12 months → $1200 MXN
    - 18 months → $1800 MXN
* MSI is available with the following banks: BANAMEX, BANCO REGIONAL DE MONTERREY S.A, BANCOPPEL, BANCO AZTECA, SCOTIABANK, HSBC, INBURSA, BANCA MIFEL SA, BANCO MULTIVA, BAJIO, CI BANCO, Afirme, Banregio, Banjercito, Banorte, Famsa, Invex, Premium Card Liverpool, Santander, and Bancomer.
* When using the promotion always display the phrase **MESES SIN INTERESES** during the payment process. For standard installments (no promotional installments), use **PAGOS DIFERIDOS**.

{{% alert title="Notes" color="info"%}}

* To enable MSI plans in your account, contact your sales representative.

* For additional details, see the [Payments API for Mexico]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}}).

{{% /alert %}}

#### Identifying General vs. Specific Interest-Free Installments Plans in Mexico

Because the API handles **General Interest-Free Installments** differently in Mexico, you may confuse them with **Specific Interest-Free Installments**. Use the `promotions[].type` field in the API response to distinguish them:

| Installment type | `promotions[].type` | Description | 
|:----------------:|----------------|---------------------------------------------------|
| Specific Interest-Free Installments | `MSI` | The term MSI is common in Mexico, but the API returns `MSI` for all countries offering Specific Interest-Free Installments: Argentina, Colombia, Peru, and Mexico. |
| General Interest-Free Installments **(Mexico)** | `PRICING`   | In Mexico, the API uses `PRICING` for General Interest-Free Installments, even though they are known locally as Meses Sin Intereses (MSI). |

### Processing a Transaction with Specific Interest-Free Installments

When using a Specific Interest-Free Installments plan, include both the `PROMOTION_ID` and `INSTALLMENTS_NUMBER` inside the `extraParameters` object in your request:

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
"extraParameters": {
    "INSTALLMENTS_NUMBER": (number of installments),
    "PROMOTION_ID": (selected promotion ID)
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
```XML
<extraParameters>
    <entry>
        <string>INSTALLMENTS_NUMBER</string>
        <string>Number of installments</string>
    </entry>
    <entry>
        <string>PROMOTION_ID</string>
        <string>Selected promotion ID</string>
    </entry>
</extraParameters>
```
{{< /tab >}}
{{< /tabs >}}
<br>

{{% alert title="Note" color="info"%}}

To create and submit the transactions, use the Payments API of the corresponding country:

* [Argentina]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}}) | [Colombia]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}) | [Mexico]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}})
| [Peru]({{< ref "Payments-API-Peru.md#submit-transactions-using-credit-or-debit-cards" >}})

{{% /alert %}}

### Processing Transactions with Installments via PayU Enterprise

When integrating **PayU Enterprise** with the **PayU Latam Pricing API**, you may encounter differences in naming conventions, structures, and field mappings.  
To ensure installment plans and promotions are displayed and applied correctly, you need to:

1. **Validate decimal separators** for consistent formatting between the APIs.
2. **Map card vendors** to align naming conventions.
3. **Match promotions** with the correct card or bank details using BINs, bank names, or payment methods.
4. **Optionally:** Support tokenized cards while displaying installment options.
5. **Optionally:** Send data in charge requests for transaction routing in Argentina

The following sections describe these requirements in detail.

#### Formatting Amounts Between PayU Enterprise and PayU Latam

When retrieving amounts from the **PayU Enterprise API**, ensure that decimal formatting is compatible with the **Pricing API**. Format values as follows:

* Use a maximum of two decimal places.
* Remove any unnecessary separators.

**Examples of valid formatting in the Pricing API:**

* Send **$1000** as `1000.00` or `1000`.
* Send **$50.25** as `50.25`.

Also, ensure proper mapping when working with related fields between the two APIs:

- In **PayU Enterprise**:  
  - `order > tax_amount`  
  - `order > sub_total`

<p>

- In **PayU Latam Pricing API**:  
  - `tax`  
  - `taxReturnBase`

{{% alert title="Note" color="info"%}}

The `tax` and `taxReturnBase` parameters are only applicable in **Argentina** and **Colombia**.

{{% /alert %}}

#### Mapping Card Vendors

Card vendors may be named differently in the Pricing API and PayU Enterprise. To ensure installment options display correctly, map vendor values between the two systems.

**Considerations:**
* The **Pricing API** returns the card vendor in the `paymentMethodFee > paymentMethod` field.
* The **PayU Enterprise API** returns the card vendor under the `vendor` field.

The table below provides the mapping between the two sources:

| Pricing API (`paymentMethodFee > paymentMethod`) | PayU Enterprise (`vendor`) | Notes |
| --- | --- | --- |
| `AMEX` | `AMERICAN EXPRESS` | Same brand, different naming convention |
| `ARGENCARD` | `ARGENCARD` | Identical |
| `CABAL` | `CABAL` | Identical |
| `CENCOSUD` | `CENCOSUD CARD` | Same brand, “CARD” suffix in PayU Enterprise |
| `DINERS` | `DINERS CLUB INTERNATIONAL` | Same brand, full name in PayU Enterprise |
| `ELO` | `ELO` | Identical |
| `MASTERCARD` | `MASTERCARD` | Identical |
| `NARANJA` | `NARANJA CARD` | Same brand, “CARD” suffix in PayU Enterprise |
| `VISA` | `VISA` | Identical |

#### Matching a Promotion With the User’s Card

The token issuer name that PayU Enterprise returns may not exactly match the bank name listed in the `promotions[]` array from the Pricing API.  
To ensure accurate matching, it’s recommended to validate promotions using the BIN (IIN) defined in the promotion.

When displaying installment options in checkout for promotion-based installments, follow the validation sequence below:

| Step  | Condition                     | Validation Rule                                                          | API Fields to Check                |
| ----- | ----------------------------- | ------------------------------------------------------------------------ | ----------------------------------- |
| **1** | `promotions[].iin` is present | Match the user’s BIN (IIN) to one of the values in `promotions[].iin`.   | `promotions[].iin`                  |
| **2** | No BINs are specified         | Match the user’s bank to one of the values in `promotions[].banksNames`. | `promotions[].banksNames`           |
| **3** | No banks are specified        | Match the card vendor to the payment method in the promotion.            | `paymentMethodFee[].paymentMethod`  |

#### Optional: Tokenized Cards and Installment Options

When using card tokenization, you can display installment options by following this flow:

1. Request card data from the user
2. Tokenize the card
3. Query the Pricing API
4. Show available installment options

**Example Display 1**

The user enters card details, and the checkout displays available installment options:

![PrintScreen](/assets/Promotions/promo6.png)

**Example Display 2**

The checkout includes two buttons: one for paying in full and another for paying in installments.

![PrintScreen](/assets/Promotions/promo7.png)

{{% alert title="Note" color="info"%}}

Ensure compliance with local regulations in the country where you operate. Your checkout must display any information required by authorities.

{{% /alert %}}

#### Optional: Sending Data in Charge Requests for Transaction Routing (Argentina)

When processing transactions in **Argentina**, include specific fields in the **Charge** request to ensure proper routing through PayU’s decision engine. By sending this data, the system can direct the transaction to the correct account, particularly when handling promotions with interest-free installments.  

##### Required Fields

- **Account ID**: The ID of the account from which you retrieved the promotion using the **Pricing API**.  
- **Installments**: The installment option the user selected during checkout.  
- **Promotion ID**: The ID of the promotion associated with the selected installment option.  

##### Routing Setup

To route transactions correctly:  
1. Configure a new provider using the account that offers **interest-free installments** (this account follows a different settlement model from the standard account).  
2. Create a routing rule in the decision engine as shown in the example image.  

<img src="/assets/Promotions/promo8.png" style="display: block; margin: 0 auto; width: 550px;">

{{% alert title="Note" color="info"%}}

PayU can assist you with setting up the routing rule.

{{% /alert %}}

##### API Field Paths

Use the following API paths when sending data in the **Charge** or **Authorization** request:  

- Installments (user selection):  
  `installments.number_of_installments`  
- Installments (decision engine routing):  
  `additional_details.number_of_installments`  
- Promotion ID (provider-specific):  
  `provider_specific_data.payu_latam.additional_details.promotion_id`  
- Promotion ID (decision engine routing):  
  `additional_details.promotion_id`  
- Account ID (routing by Latam account):  
  `additional_details.account_id`  
