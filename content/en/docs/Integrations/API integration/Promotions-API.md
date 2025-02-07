---
title: "Promotions API"
linkTitle: "Promotions API"
date: 2021-06-29T12:38:41-05:00
description: >
    The Promotions API allows you to retrieve available promotions, including their associated costs, characteristics, and other relevant details for your customers.
weight: 50
tags: ["subtopic"]
---

The Promotions API is available in the following countries:

<table style="width: 50%; min-width: 300px; border-collapse: collapse;">
    <tr>
        <th style="width: 40%; text-align: left;">Country</th>
        <th style="width: 30%; text-align: center;">Promotions</th>
        <th style="width: 30%; text-align: center;">Interest-Free Months (MSI)</th>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Argentina.png" width="25px"/> &nbsp;Argentina</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Colombia.png" width="25px"/> &nbsp;Colombia</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Mexico.png" width="25px"/> &nbsp;Mexico</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Peru.png" width="25px"/> &nbsp;Peru</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
</table>

{{% alert title="Note" color="info"%}}

To configure Installments and Promotions based on your agreements with banking entities, contact your sales representative.

{{% /alert %}}

## Promotions

The Promotions feature allows you to query active promotions via API, retrieve their details, and present them to customers.

A promotion includes the applicable payment methods, eligible days of the week, a list of participating banks, and the start and end dates for validity.

### Authentication for Promotions

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

### Querying Available Promotions

To retrieve promotions, send a `GET` request to the appropriate URL based on the environment.

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
| accountId | Unique identifier of your account. | Yes |
| currency | Currency associated with your account. | No |
| amount | Total amount of the purchase. | Yes |
| paymentMethod | Optional parameter to filter promotions by payment method. | No |

</details>

<details>
<summary>Response Parameters</summary>
<br>
<div class="variables"></div>

| Field Name | Type | Size | Description |
|-|-|-|-|
| promotion > id | Integer |  | Unique identifier of the promotion in the PayU platform. |
| promotion > title | String | 50 | Title of the promotion. |
| promotion > termsAndConditions | String | 250 | Terms and conditions applicable to the promotion. |
| promotion > paymentMethod | String |  | Name of the payment method available for the promotion. |
| promotion > subFranchise | String |  | Name of the sub-brand/sub-franchise of the payment method. |
| promotion > banks | List |  | List of banks where the promotion applies. |
| promotion > iins | List |  | List of bank IIN/BIN numbers where the promotion applies. |
| promotion > days | List |  | List of days on which the promotion applies. |
| promotion > startDate | Datetime |  | Start date of the promotion. |
| promotion > endDate | Datetime |  | End date of the promotion. |
| paymentMethodFee | List |  | Description of costs assumed by the merchant based on the payment method. |
| paymentMethodFee > paymentMethodFeeDetail.paymentMethod | String |  | Name of the payment method. |
| paymentMethodFeeDetail > pricingFees | Object |  | Contains pricing details for payment methods and installment plans. |
| paymentMethodFeeDetail > pricingFees > fee > installments | String |  | Single installment (1) or a range of installments (1-36 for applicable countries). |
| paymentMethodFeeDetail > pricingFees > fee > pricing | Object |  | Default pricing values for the transaction. |
| paymentMethodFeeDetail > pricingFees > fee > pricing > payerDetail | Object |  | Breakdown of interest and fees applied to the payer. |
| paymentMethodFeeDetail > pricingFees > fee > pricing > payerDetail > commission | Decimal |  | Total fees, including applicable taxes, charged to the payer. |
| paymentMethodFeeDetail > pricingFees > fee > pricing > payerDetail > interests | Decimal |  | Total interest, including applicable taxes, charged to the payer. |
| paymentMethodFeeDetail > pricingFees > fee > pricing > payerDetail > total | Decimal |  | Total amount the payer needs to pay, including fees and interest. |
| paymentMethodFeeDetail > pricingFees > fee > pricing > merchantDetail | Object |  | Breakdown of interest and fees applied to the merchant. |
| paymentMethodFeeDetail > pricingFees > fee > pricing > merchantDetail > commission | Decimal |  | Total fees, including applicable taxes, charged to the merchant. |
| paymentMethodFeeDetail > pricingFees > fee > pricing > merchantDetail > interests | Decimal |  | Total interest, including applicable taxes, charged to the merchant. |
| paymentMethodFeeDetail > pricingFees > fee > pricing > merchantDetail > total | Decimal |  | Total amount the merchant needs to pay due to fees and interest. |
| paymentMethodFeeDetail > pricingFees > fee > pricing > totalValue | Decimal |  | Total payment value, including fees and interest. |
| paymentMethodFeeDetail > pricingFees > fee > pricing > totalIncomeTransaction | Decimal |  | Total income generated from the transaction. |
| paymentMethodFeeDetail > pricingFees > fee > pricing > additionalInfo | Object |  | Includes information on the Annual Effective Interest Rate (TEA) and Total Financial Cost (CFT). Available for Argentina. |
| paymentMethodFeeDetail > pricingFees > fee > pricing > additionalInfo > cft | Decimal |  | Total Financial Cost (CFT) applied. |
| paymentMethodFeeDetail > pricingFees > fee > pricing > additionalInfo > tea | Decimal |  | Annual Effective Interest Rate (TEA) applied. |  

</details>

#### API Call

To retrieve available promotions, send a `GET` request using the following format:

```JAVA
GET
https://{env-api}.payulatam.com/payments-api/rest/v4.9/pricing?accountId={accountId}&currency={currency}&amount={amount}&paymentMethod={paymentMethod}
```
<br>

 The `{env-api}` variable should be set as follows:
- `sandbox.api` for testing
- `api` for production

The `paymentMethod` parameter is optional and can be used to filter promotions by a specific payment method.

**Request Example:**

```JAVA
GET https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing?accountId=512322&currency=ARS&amount=1000
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

### Executing a Transaction with Promotions

Once you have selected a promotion, include the `PROMOTION_ID` and the `INSTALLMENTS_NUMBER` as extra parameters in your request:

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

## Months Without Interest (MSI - Meses Sin Intereses){#msi}

For accounts in Mexico, you can offer customers the option to pay in a set number of interest-free installments. To enable this feature, contact your sales representative.

### Considerations

* Supported installment options: 3, 6, 9, 12, or 18 months.
* Minimum purchase amounts required for MSI:
    - 3 months → $300 MXN
    - 6 months → $600 MXN
    - 9 months → $900 MXN
    - 12 months → $1200 MXN
    - 18 months → $1800 MXN
* MSI is available with the following banks: BANAMEX, BANCO REGIONAL DE MONTERREY S.A, BANCOPPEL, BANCO AZTECA, SCOTIABANK, HSBC, INBURSA, BANCA MIFEL SA, BANCO MULTIVA, BAJIO, CI BANCO, Afirme, Banregio, Banjercito, Banorte, Famsa, Invex, Premium Card Liverpool, Santander, and Bancomer.
* When using MSI, always display the phrase **"PAGOS DIFERIDOS"** during the payment process.

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