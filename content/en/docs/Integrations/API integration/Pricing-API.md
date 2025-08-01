---
title: "Pricing API"
linkTitle: "Pricing API"
date: 2025-06-29T12:38:41-05:00
description: >
    The Pricing API allows you to query all available financing options and associated costs for your transactions. This includes the pricing configuration of your PayU virtual account, such as standard installments, [Interest-Free Installments](https://developers.payulatam.com/latam/en/docs/services/promotions.html) plans, and other features relevant to your customers.
weight: 50
tags: ["subtopic"]
---

## Pricing Options

Each pricing option, whether it is a standard plan or a promotion with Interest-Free Installments, includes the applicable payment methods, the days of the week when it is available, the list of participating banks (if applicable), as well as the start and end dates of the promotions.

The following table shows the countries where standard installments, Specific Interest-Free Installments, and General Interest-Free Installments (MSI) are available. For more information, see the [Interest-Free Installments](https://developers.payulatam.com/latam/en/docs/services/promotions.html) document.

<table style="width: 65%; min-width: 300px; border-collapse: collapse;">
    <tr>
        <th style="width: 20%; text-align: left;">Country</th>
        <th style="width: 15%; text-align: center;">Standard Installments</th>
        <th style="width: 15%; text-align: center;">Specific Interest-Free Installments (Promotions)</th>
        <th style="width: 15%; text-align: center;">General Interest-Free Installments (MSI)</th>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Argentina.png" width="25px"/> &nbsp;Argentina</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Brasil.png" width="25px"/> &nbsp;Brazil</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Chile.png" width="25px"/> &nbsp;Chile</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Colombia.png" width="25px"/> &nbsp;Colombia</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Mexico.png" width="25px"/> &nbsp;Mexico</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Panama.png" width="25px"/> &nbsp;Panama</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Peru.png" width="25px"/> &nbsp;Peru</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
</table>

{{% alert title="Note" color="info"%}}

To configure Interest-Free Installments according to your agreements with issuing banks, contact your sales representative.

{{% /alert %}}

The following diagram shows the complete flow, from querying the Pricing API to transaction approval:

{{< promotions/pricingApi >}}

### Authentication for Requests

To authenticate API requests, you must use an HMAC-based mechanism. You need your `MerchantPublicKey`, which can be found in your PayU Management Panel under **_Settings_** > **_Technical Configuration_** > **_Public Key_**.

![PrintScreen](/assets/Promotions/PublicKey.png)

### Configuring the Authentication

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

### Querying the Available Interest-Free Installments Plans

To retrieve the Interest-Free Installment plans, send a `GET` request to the appropriate URL based on the environment.

{{% alert title="API Endpoints" color="info"%}}

* Test: ```GET https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing```
* Production: ```GET https://api.payulatam.com/payments-api/rest/v4.9/pricing```

{{% /alert %}}

As this is a RESTful service, we strongly recommend against strict schema validation. Avoiding schema validation ensures seamless integration, minimizing changes when updates are made to the Web Service.

#### Parameters for Request and Response

<details>

<summary>Request Parameters</summary>

<br>

<div class="variables"></div>

| Parameter | Description | Mandatory |
|-|-|:-:|
| `accountId` | Unique identifier of your account. | Yes |
| `currency` | Currency associated with your account. | No |
| `amount` | Total amount of the purchase. | Yes |
| `paymentMethod` | Optional parameter to filter promotions by payment method. | No |
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
| `promotions` > `subFranchise` | String | Sub-brand or sub-franchise associated with the promotion. |
| `promotions` > `banksNames` | List | List of banks where the promotion applies. |
| `promotions` > `paymentMethodMain` | String | Main payment method associated with the promotion. |
| `promotions` > `iin` | List | List of eligible card IIN/BIN numbers for the promotion. |
| `promotions` > `days` | List | Days of the week the promotion is available. |
| `promotions` > `startDate` | DateTime | Promotion start date and time. |
| `promotions` > `endDate` | DateTime | Promotion end date and time. |
| `promotions` > `priority` | Number | Promotion priority level. |
| `promotions` > `type` | String | Type of promotion. Possible values:<br><br>**PRICING** – The promotion is automatically applied based on configured pricing rules. For example, in Mexico, if interest-free installments are configured, the merchant only needs to send the number of installments in `transaction > extraParameters > INSTALLMENTS_NUMBER`. The system will automatically apply the interest-free condition without requiring a promotion ID.<br><br>**MSI** – Requires the merchant to explicitly send both the promotion ID and number of installments. This applies when the promotion must match a specific combination of payment method, installments, and promotion ID. To apply this type, the following fields must be sent:<br>- `transaction > extraParameters > INSTALLMENTS_NUMBER`<br>- `transaction > extraParameters > PROMOTION_ID`<br><br>**Note:** If the promotion ID is not sent when required, the transaction will be processed without the promotion, using the default pricing configuration for the selected installment option. |
| `paymentTaxesDetails` | Object | Contains details of applied taxes (structure depends on the tax service response). |
| `taxesServiceFailed` | Boolean | Indicates whether the tax calculation service failed. |

</details>

#### API Call

To retrieve available promotions, send a `GET` request using the following format:

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

### Executing a Transaction with Interest-Free Installments

Once you have selected an Interest-Free Installments plan, include the `PROMOTION_ID` and the `INSTALLMENTS_NUMBER` as extra parameters in your request:

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
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

For more details on including these extra parameters, refer to the corresponding Payments API documentation for your country:

* [Argentina]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}}) 
* [Colombia]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}) 
* [Mexico]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}})
* [Peru]({{< ref "Payments-API-Peru.md#submit-transactions-using-credit-or-debit-cards" >}}) 

{{% /alert %}}

## MSI - Interest-Free Months

In Mexico, General Interest-Free Installments are commonly known as **Meses sin Intereses (MSI)**. This option allows you to offer fixed payment plans (3, 6, 9, 12, or 18 months) without interest, without the need to reference a promotion ID.

### Considerations

* Supported installment options: 3, 6, 9, 12, or 18 months.
* Minimum purchase amounts required for MSI:
    - 3 months → $300 MXN
    - 6 months → $600 MXN
    - 9 months → $900 MXN
    - 12 months → $1200 MXN
    - 18 months → $1800 MXN
* MSI is available with the following banks: BANAMEX, BANCO REGIONAL DE MONTERREY S.A, BANCOPPEL, BANCO AZTECA, SCOTIABANK, HSBC, INBURSA, BANCA MIFEL SA, BANCO MULTIVA, BAJIO, CI BANCO, Afirme, Banregio, Banjercito, Banorte, Famsa, Invex, Premium Card Liverpool, Santander, and Bancomer.
* When using the promotion always display the phrase **MESES SIN INTERESES** during the payment process. For standard installments (no promotional installments), use **PAGOS DIFERIDOS**.

{{% alert title="Note" color="info"%}}

To enable MSI plans in your account, contact your sales representative.

{{% /alert %}}

### MSI Request Parameters

To apply MSI, include the number of months in the `extraParameters` field:

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

For additional details on using MSI, refer to the [Payments API for Mexico]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}}).