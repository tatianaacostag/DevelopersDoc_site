---
title: "PayU-Handled 3DS Authentication"
linkTitle: "PayU-Handled 3DS Authentication"
date: 2024-07-01T11:32:55-05:00
description: >
  PayU-handled 3DS authentication prevents the need for you to manage the 3DS integration process. PayU takes care of everything, from communicating with the issuing bank to handling the authentication flow.  
weight: 21
tags: ["subtopic"]
---

To enable 3DS authentication, contact your PayU representative or technical support. Once enabled, include the `req3DSAuthentication` parameter in your payment requests using PayU's Payments API.

## Considerations

* 3DS authentication with PayU Latam is only available in **Argentina**, **Brazil**, **Colombia**, **Mexico**, and **Peru**.
* When using 3DS authentication in API integrations, setting a `RESPONSE_URL` is **mandatory**. If not provided, the transaction will return an error.
* If you use a <a href="https://developers.payulatam.com/latam/en/docs/integrations/webcheckout-integration.html" target="_blank">WebCheckout integration</a>, contact your PayU representative or technical support to confirm whether 3DS authentication is available for your transactions. 
* **Supported networks:** Visa and Mastercard.

## The `req3DSAuthentication` Parameter

This parameter enables you to specify whether a transaction requires 3DS authentication. The parameter supports the following values:

* `"true"`: Enforces 3DS authentication for the transaction.
* `"false"`: Disables 3DS authentication for the transaction.

**If your request doesn't include `req3DSAuthentication`**, PayU's risk engine will determine whether the transaction requires 3DS authentication based on its risk assessment.

### Parameters for 3DS Authentication 

The table below outlines the key parameters associated with 3DS authentication. For a complete list of parameters applicable to credit or debit card transactions, refer to the <a href="https://developers.payulatam.com/latam/en/docs/integrations/api-integration.html" target="_blank">Payments API documentation</a> for your country. 

| Field Name | Format | Size | Description |
|-|-|-|-|
| `transaction > req3DSAuthentication` | Boolean | 4-5 characters | Specifies whether 3DS authentication is enforced (`true` or `false`). If omitted, PayU's risk engine decides whether authentication is required. |
| `transaction > order > notifyUrl` | Alphanumeric | Up to 255 characters | Webhook URL that your integration uses to receive the final transaction status (e.g., approved or rejected) from PayU. For a detailed list of possible statuses, refer to the <a href="https://developers.payulatam.com/latam/en/docs/getting-started/response-codes-and-variables.html#response-codes-sent-to-the-confirmation-page" target="_blank">response codes documentation</a>. |
| `transaction > extraParameters > RESPONSE_URL` | Alphanumeric | Up to 255 characters | URL where the user is redirected after completing the 3DS authentication, typically a page on the merchant’s website. **For API integrations, this parameter is mandatory**. If not provided, the transaction may fail because PayU cannot redirect the user after the authentication challenge. For a detailed list of possible statuses, refer to the <a href="https://developers.payulatam.com/latam/en/docs/getting-started/response-codes-and-variables.html#response-codes-sent-to-the-response-page" target="_blank">response codes documentation</a>. |


### Request Example

In the following request example, `req3DSAuthentication` is set to `true` to require 3DS authentication:

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

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

```XML
<request>
    <language>en</language>
    <command>SUBMIT_TRANSACTION</command>
    <merchant>
        <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <transaction>
        <order>
            <language>en</language>
            <signature>8b9abb9dcae76d331e4493a559e8a76a0a9296e6944d460303d5639d9230c485</signature>
            <accountId>512321</accountId>
            <description>PayULatamAPI|Test|CO|COL</description>
            <referenceCode>REFERENCIA_PRUEBA_12345</referenceCode>
            <notifyUrl>https://merchant-mywebhook.com</notifyUrl>
            <buyer>
                <merchantBuyerId>Merchant_Buyer_ID_123</merchantBuyerId>
                <fullName>John Doe</fullName>
                <emailAddress>john.doe@email.com</emailAddress>
                <contactPhone>3155555555</contactPhone>
                <dniType>CC</dniType>
                <dniNumber>123456789</dniNumber>
                <shippingAddress>
                    <country>CO</country>
                    <state>DC</state>
                    <city>Bogotá</city>
                    <postalCode>110111</postalCode>
                    <street1>Calle 100</street1>
                    <street2>Cra 9</street2>
                    <phone>6011234567</phone>
                </shippingAddress>
            </buyer>
            <shippingAddress>
                <country>CO</country>
                <state>DC</state>
                <city>Bogotá</city>
                <postalCode>110111</postalCode>
                <street1>Calle 100</street1>
                <street2>Cra 9</street2>
                <phone>6011234567</phone>
            </shippingAddress>
            <additionalValues>
                <TX_VALUE>
                    <value>100</value>
                    <currency>COP</currency>
                </TX_VALUE>
                <TX_TAX>
                    <value>0</value>
                    <currency>COP</currency>
                </TX_TAX>
                <TX_TAX_RETURN_BASE>
                    <value>0</value>
                    <currency>COP</currency>
                </TX_TAX_RETURN_BASE>
            </additionalValues>
        </order>
        <payer>
            <merchantPayerId>Merchant_Payer_ID_123</merchantPayerId>
            <fullName>John Doe</fullName>
            <emailAddress>john.doe@email.com</emailAddress>
            <contactPhone>3155555555</contactPhone>
            <dniType>CC</dniType>
            <dniNumber>123456789</dniNumber>
            <billingAddress>
                <country>CO</country>
                <state>DC</state>
                <city>Bogotá</city>
                <postalCode>110111</postalCode>
                <street1>Calle 100</street1>
                <street2>Cra 9</street2>
                <phone>6011234567</phone>
            </billingAddress>
        </payer>
        <creditCard>
            <name>APPROVED</name>
            <number>5570898637920584</number>
            <expirationDate>2025/12</expirationDate>
            <securityCode>777</securityCode>
            <processWithoutCvv2>false</processWithoutCvv2>
        </creditCard>
        <extraParameters>
            <INSTALLMENTS_NUMBER>1</INSTALLMENTS_NUMBER>
            <RESPONSE_URL>https://merchant.shoppingresult.com</RESPONSE_URL>
        </extraParameters>
        <type>AUTHORIZATION_AND_CAPTURE</type>
        <paymentMethod>MASTERCARD</paymentMethod>
        <paymentCountry>CO</paymentCountry>
        <ipAddress>45.6.10.241</ipAddress>
        <userAgent>Mozilla/5.0 (Windows; U; Windows NT 6.0) AppleWebKit/531.2.0 (KHTML, like Gecko) Chrome/21.0.885.0 Safari/531.2.0</userAgent>
        <cookie>sefejihsxeai037qhkwa3jex9</cookie>
        <deviceSessionId>cb066830a3dcbdaf7234fd230d1959b0c6b3ae3ad5265490d55802a61738b537</deviceSessionId>
        <integrationMethod>POST_API_v4_0</integrationMethod>
        <req3DSAuthentication>true</req3DSAuthentication>
        <source>WEB</source>
    </transaction>
    <test>false</test>
</request>

```

{{< /tab >}}
{{< /tabs >}}

## Testing the 3DS Authentication

To test the 3DS authentication process, use the dummy values provided in the table below. These values are applicable across the different payment methods available in each country:

<table>
  <tr>
    <th></th>
    <th style="text-align: center;">Argentina<br/><img src="/assets/Argentina.png" width="25px"/></th>
    <th style="text-align: center;">Brazil<br/><img src="/assets/Brasil.png" width="25px"/></th>
    <th style="text-align: center;">Colombia<br/><img src="/assets/Colombia.png" width="25px"/></th>
    <th style="text-align: center;">Mexico<br/><img src="/assets/Mexico.png" width="25px"/></th>
    <th style="text-align: center;">Peru<br/><img src="/assets/Peru.png" width="25px"/></th>
  </tr>
  <tr>
    <th>Account ID</th>
    <td style="text-align: center;">516684</td>
    <td style="text-align: center;">516685</td>
    <td style="text-align: center;">516686</td>
    <td style="text-align: center;">516687</td>
    <td style="text-align: center;">516688</td>
  </tr>
  <tr>
    <th>Merchant ID</th>
    <td colspan="5" style="text-align: center;">508029</td>
  </tr>
  <tr>
    <th>API Login</th>
    <td colspan="5" style="text-align: center;">pRRXKOl8ikMmt9u</td>
  </tr>
  <tr>
    <th>API Key</th>
    <td colspan="5" style="text-align: center;">4Vj8eK4rloUd272L48hsrarnUA</td>
  </tr>
  <tr>
    <th>Public Key</th>
    <td colspan="5" style="text-align: center;">PKaC6H4cEDJD919n705L544kSU</td>
  </tr>
</table>

{{% alert title="Note" color="info"%}}

These account IDs are for testing purposes only, do not use them in production environments.

{{% /alert %}}

### Test Cards

You can use the following test cards to replicate different 3DS scenarios in the test environment. **Do not** use these cards in production.

| Brand       | Card Number          | 3DS Scenario                                      |
|-------------|----------------------|---------------------------------------------------|
| Mastercard  | `5521455186577727`   | Card is not registered for 3DS                |
| Mastercard  | `5436062405627681`   | 3DS challenge required                        |
| Mastercard  | `5150030090350186`   | 3DS successful without friction (no challenge required) |
| Mastercard  | `5150030090050182`   | 3DS successful without friction (no challenge required) |
| Visa        | `4012001037141120`   | 3DS challenge required                        |
| Visa        | `4245757666349685`   | 3DS challenge required                        |

#### Test Data for Approved Authorizations

Use the following parameters to simulate approved transactions in the test environment:

* Include **`APPROVED`** in the cardholder name (e.g. `APPROVED`).
* Use **`777`** as the CVV.
* Expiration date: a month less than or equal to `05` (i.e., month < 6) and a year after the current year (for example `05/202_` — replace `_` with the appropriate digit for testing).

#### Test Data for Declined Authorizations

Use the following parameters to simulate declined transactions in the test environment:

* Include **`REJECTED`** in the cardholder name (e.g. `REJECTED`).
* Use **`666`** as the CVV.
* Expiration date: a month greater than or equal to `07` (i.e., month > 6) and a year after the current year (for example `07/202_` — replace `_` with the appropriate digit for testing).

{{% alert title="Note" color="info"%}}

These numbers and conventions are for sandbox testing only. Make sure to use the test `Account ID`, `API Key` and `API Login` provided above when executing transactions.

{{% /alert %}}

## Transaction Response

Upon sending a payment request, you will receive a response with a `"PENDING"` state for the transaction. This response will also include a field within `extraParameters` called `THREEDS_AUTH_REDIRECT_URL`.

* **`THREEDS_AUTH_REDIRECT_URL`:** This URL should be used to redirect the payer to complete the 3DS authentication process. The authentication process might involve challenges like entering a one-time password (OTP) received on their phone.

### Response Example

In the response example below, the merchant redirects the payer to `https://merch-prod.payu.com`:

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

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

## Authentication Flow

The diagram below illustrates the end-to-end process of a transaction using PayU 3DS authentication, highlighting key steps such as request submission, authentication, and response handling.

{{< 3dsAuth/3dsflow >}}

<br>

As shown in the diagram, once the payer completes the 3DS authentication (if required), PayU will receive a notification. The transaction will then be:

* **Completed:** If the authentication is successful.
* **Declined:** If the authentication fails.
