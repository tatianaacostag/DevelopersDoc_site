---
title: "PayU-Handled 3DS Authentication"
linkTitle: "PayU-Handled 3DS Authentication"
date: 2024-07-1T11:32:55-05:00
description: >
  PayU-handled 3DS authentication prevents the need for you to manage the 3DS integration process. PayU takes care of everything, from communicating with the issuing bank to handling the authentication flow.  
weight: 21
tags: ["subtopic"]
---

## Using PayU 3DS Authentication

To enable 3DS authentication, merchants must be registered to this service with PayU. Once registered, you can add a new parameter called `req3DSAuthentication` in your payment requests via PayU's Payments API.

{{% alert title="Notes" color="info"%}}

* 3DS authentication with PayU Latam is only available for **Argentina**, **Brazil**, **Colombia**, and **Peru**.
* This feature requires an API integration and is not available for Webcheckout integration. 
* **Supported networks:** Visa and Mastercard.

{{% /alert %}}

### The `req3DSAuthentication` Parameter

This parameter allows you to control whether 3DS authentication is required for each transaction. It accepts two values:

* `"true"`: Enforces 3DS authentication for the transaction.
* `"false"`: Disables 3DS authentication for the transaction.

**If `req3DSAuthentication` is not included,** PayU will decide whether to perform 3DS authentication based on its own risk assessment.

#### Request Example

In the request example below, the `req3DSAuthentication` is set `true`:

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request Example:
```JSON
{
    "language": "en",
    "command": "SUBMIT_TRANSACTION",
    "merchant": {
        "apiLogin": "pRRXKOl8ikMmt9u",
        "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
    },
    "transaction": {
        "order": {
            "language": "en",
            "signature": "8b9abb9dcae76d331e4493a559e8a76a0a9296e6944d460303d5639d9230c485",
            "accountId": "512321",
            "description": "PayULatamAPI|Test|CO|COL",
            "referenceCode": "REFERENCIA_PRUEBA_12345",
            "notifyUrl": "https://merchant-mywebhook.com",
            "buyer": {
                "merchantBuyerId": "Merchant_Buyer_ID_123",
                "fullName": "John Doe",
                "emailAddress": "john.doe@email.com",
                "contactPhone": "3155555555",
                "dniType": "CC",
                "dniNumber": "123456789",
                "shippingAddress": {
                    "country": "CO",
                    "state": "DC",
                    "city": "Bogotá",
                    "postalCode": "110111",
                    "street1": "Calle 100",
                    "street2": "Cra 9",
                    "phone": "6011234567"
                }
            },
            "shippingAddress": {
                "country": "CO",
                "state": "DC",
                "city": "Bogotá",
                "postalCode": "110111",
                "street1": "Calle 100",
                "street2": "Cra 9",
                "phone": "6011234567"
            },
            "additionalValues": {
                "TX_VALUE": {
                    "value": "100",
                    "currency": "COP"
                },
                "TX_TAX": {
                    "value": "0",
                    "currency": "COP"
                },
                "TX_TAX_RETURN_BASE": {
                    "value": "0",
                    "currency": "COP"
                }
            }
        },
        "payer": {
            "merchantPayerId": "Merchant_Payer_ID_123",
            "fullName": "John Doe",
            "emailAddress": "john.doe@email.com",
            "contactPhone": "3155555555",
            "dniType": "CC",
            "dniNumber": "123456789",
            "billingAddress": {
                "country": "CO",
                "state": "DC",
                "city": "Bogotá",
                "postalCode": "110111",
                "street1": "Calle 100",
                "street2": "Cra 9",
                "phone": "6011234567"
            }
        },
        "creditCard": {
            "name": "APPROVED",
            "number": "5570898637920584",
            "expirationDate": "2025/12",
            "securityCode": "777",
            "processWithoutCvv2": false
        },
        "extraParameters": {
            "INSTALLMENTS_NUMBER": 1,
            "RESPONSE_URL": "https://merchant.shoppingresult.com"
        },
        "type": "AUTHORIZATION_AND_CAPTURE",
        "paymentMethod": "MASTERCARD",
        "paymentCountry": "CO",
        "ipAddress": "45.6.10.241",
        "userAgent": "Mozilla/5.0 (Windows; U; Windows NT 6.0) AppleWebKit/531.2.0 (KHTML, like Gecko) Chrome/21.0.885.0 Safari/531.2.0",
        "cookie": "sefejihsxeai037qhkwa3jex9",
        "deviceSessionId": "cb066830a3dcbdaf7234fd230d1959b0c6b3ae3ad5265490d55802a61738b537",
        "integrationMethod": "POST_API_v4_0",
        "req3DSAuthentication": "true",
        "source": "WEB"  
    },
    "test": false
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request Example:
```XML
<request>
    <isTest>false</isTest>
    <language>en</language>
    <command>SUBMIT_TRANSACTION</command>
    <merchant>
        <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <transaction>
        <type>AUTHORIZATION_AND_CAPTURE</type>
        <paymentMethod>MASTERCARD</paymentMethod>
        <paymentCountry>CO</paymentCountry>
        <ipAddress>247.123.24.168</ipAddress>
        <userAgent>Mozilla/5.0 (Windows NT 5.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0.7</userAgent>
        <cookie>gp8pv8673fia31cevhcrakbwt</cookie>
        <deviceSessionId>901129f3909f8ca8bdacc67199a29a15edfc3a059b76d7fecf601bb5343847f8</deviceSessionId>
        <req3DSAuthentication>true</req3DSAuthentication>
        <extraParameters>
            <entry>
                <string>INSTALLMENTS_NUMBER</string>
                <string>1</string>
            </entry>
            <entry>
                <string>RESPONSE_URL</string>
                <string>https://www.yoursite.com/response-page</string>
            </entry>
        </extraParameters>
        <order>
            <language>es</language>
            <signature>cfe3eaeb7af1bd6e9e4cb7d50f8f0afb6b9452fc0936d879d1942e78fe8d03f3</signature>
            <accountId>516686</accountId>
            <description>PayULatam|Test|CO|COP|OneStep|WithCVV2|Untokenized</description>
            <referenceCode>Postman|UniqueReference|10/24/2024, 2:09:07 PM</referenceCode>
            <notifyUrl>https://www.yoursite.com/confirmation-page</notifyUrl>
            <additionalValues>
                <entry>
                    <string>TX_VALUE</string>
                    <additionalValue>
                        <value>5629338</value>
                        <currency>COP</currency>
                    </additionalValue>
                    <string>TX_TAX</string>
                    <additionalValue>
                        <value>898802</value>
                        <currency>COP</currency>
                    </additionalValue>
                    <string>TX_TAX_RETURN_BASE</string>
                    <additionalValue>
                        <value>4730536</value>
                        <currency>COP</currency>
                    </additionalValue>
                </entry>
            </additionalValues>
            <buyer>
                <merchantBuyerId>Merchant_Buyer_ID_91</merchantBuyerId>
                <fullName>May Wehner</fullName>
                <emailAddress>Leslie_Armstrong3@example.com</emailAddress>
                <contactPhone>3185555555</contactPhone>
                <dniType>CC</dniType>
                <dniNumber>1337727983</dniNumber>
                <shippingAddress>
                    <country>CO</country>
                    <state>DC</state>
                    <city>Bogotá</city>
                    <postalCode>110111</postalCode>
                    <street1>93357 Damian Ports</street1>
                    <street2>786 Jordyn Spurs</street2>
                    <phone>6016540721</phone>
                </shippingAddress>
            </buyer>
            <shippingAddress>
                <country>CO</country>
                <state>DC</state>
                <city>Bogotá</city>
                <postalCode>110111</postalCode>
                <street1>988 Steve Burg</street1>
                <street2>48419 Schimmel Springs</street2>
                <phone>6016540721</phone>
            </shippingAddress>
        </order>
        <payer>
            <merchantPayerId>Merchant_Payer_ID_80</merchantPayerId>
            <fullName>Marguerite Koss</fullName>
            <emailAddress>Lelia.Trantow@example.org</emailAddress>
            <contactPhone>3155555555</contactPhone>
            <dniType>CC</dniType>
            <dniNumber>9589714725</dniNumber>
            <billingAddress>
                <country>CO</country>
                <state>DC</state>
                <city>Bogotá</city>
                <postalCode>110111</postalCode>
                <street1>46217 Nikolaus Mills</street1>
                <street2>28333 Webster Islands</street2>
                <phone>6016540721</phone>
            </billingAddress>
        </payer>
        <creditCard>
            <name>APPROVED</name>
            <number>5570898637920584</number>
            <expirationDate>2025/02</expirationDate>
            <securityCode>777</securityCode>
        </creditCard>
    </transaction>
</request>

```

{{< /tab >}}
{{< /tabs >}}

## Testing the 3DS Authentication

To test the 3DS authentication process, use the dummy values provided in the table below. These values are applicable across the different payment methods available in each country:

<table>
  <tr>
    <th></th>
    <th><img src="/assets/Argentina.png" width="25px"/> &nbsp;Argentina</th>
    <th><img src="/assets/Brasil.png" width="25px"/> &nbsp;Brazil</th>
    <th><img src="/assets/Colombia.png" width="25px"/> &nbsp;Colombia</th>
    <th><img src="/assets/Peru.png" width="25px"/> &nbsp;Peru</th>
  </tr>
  <tr>
    <th>Account ID</th>
    <td>516684</td>
    <td>516685</td>
    <td>516686</td>
    <td>516688</td>
  </tr>  
  <tr>
    <th>Merchant ID</th>
    <td colspan="4" style="text-align: center;">508029</td>
  </tr>
  <tr>
    <th>API Login</th>
    <td colspan="4" style="text-align: center;">pRRXKOl8ikMmt9u</td>
  </tr>
  <tr>
    <th>API Key</th>
    <td colspan="4" style="text-align: center;">4Vj8eK4rloUd272L48hsrarnUA</td>
  </tr>
  <tr>
    <th>Public Key</th>
    <td colspan="4" style="text-align: center;">PKaC6H4cEDJD919n705L544kSU</td>
  </tr>  
  </tr>
</table>

{{% alert title="Note" color="info"%}}

These account IDs are for testing purposes only, do not use them in production environments.

{{% /alert %}}

## Transaction Response and Authentication Flow

Upon sending a payment request, you will receive a response with a `"PENDING"` state for the transaction. This response will also include a field within `extraParameters` called `THREEDS_AUTH_REDIRECT_URL`.

* **`THREEDS_AUTH_REDIRECT_URL`:** This URL should be used to redirect the payer to complete the 3DS authentication process. The authentication process might involve challenges like entering a one-time password (OTP) received on their phone.

#### Response Example

In the response example below, the merchant redirects the payer to `https://merch-prod.payu.com`:

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Response Example:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 3344440141,
        "transactionId": "968d3f37-25aa-4fc2-86bf-0a2eee091713",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": null,
        "authorizationCode": null,
        "pendingReason": "AWAITING_THREEDS_CALLBACK",
        "responseCode": "PENDING_THREEDS_CALLBACK",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1723749925205,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "THREEDS_AUTH_REDIRECT_URL": "https://merch-prod.payu.com"
        },
        "additionalInfo": {
            "paymentNetwork": "CREDIBANCO_V2",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": "CREDIT",
            "transactionType": "AUTHORIZATION_AND_CAPTURE"
        }
    }
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Response Example:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>2153050798</orderId>
        <transactionId>722480e5-276e-409d-ae9e-376b801ed725</transactionId>
        <state>PENDING</state>
        <pendingReason>AWAITING_THREEDS_CALLBACK</pendingReason>
        <responseCode>PENDING_THREEDS_CALLBACK</responseCode>
        <operationDate>2024-10-24T09:09:10</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>THREEDS_AUTH_REDIRECT_URL</string>
                <string>https://merch-prod.payu.com</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>REDEBAN</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <cardType>CREDIT</cardType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>

```

{{< /tab >}}
{{< /tabs >}}

## After Authentication

Once the payer completes the 3DS authentication (if required), PayU will receive a notification. The transaction will then be:

* **Completed:** If the authentication is successful.
* **Declined:** If the authentication fails.

### Redirection After Authentication

Following the payer's redirection from the `THREEDS_AUTH_REDIRECT_URL`, they will be directed to:

* **PayU Checkout transaction status page:** By default, this is the behavior if the merchant hasn't specified a custom return URL.
* **Merchant's custom return URL:** If provided, the payer will be redirected to the merchant's designated page after authentication.

