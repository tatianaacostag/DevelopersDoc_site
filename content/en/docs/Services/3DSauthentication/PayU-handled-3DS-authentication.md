---
title: "PayU-Handled 3DS Authentication"
linkTitle: "PayU-Handled 3DS Authentication"
date: 2024-07-1T11:32:55-05:00
description: >
  PayU-handled 3DS authentication removes the need for you to manage the 3DS integration process. PayU takes care of everything, from communicating with the issuing bank to handling the authentication flow.  
weight: 21
tags: ["subtopic"]
---

## Using PayU 3DS Authentication

To use 3DS authentication, merchants must be registered to this service with PayU. Once registered, you can include a new parameter called `req3DSAuthentication` in your payment requests via PayU's Payments API.

{{% alert title="Notes" color="info"%}}

* 3DS authentication for PayU Latam is only available for **Argentina**, **Brazil**, **Colombia**, and **Peru**.
* **Currently supported networks:** Visa and Mastercard.

{{% /alert %}}

### The `req3DSAuthentication` Parameter

This parameter allows you to control whether 3DS authentication is required for each transaction. It accepts two values:

* `"true"`: Enforces 3DS authentication for the transaction.
* `"false"`: Disables 3DS authentication for the transaction.

**If `req3DSAuthentication` is not included,** PayU will decide whether to perform 3DS authentication based on its own risk assessment.

#### Request Example

In the request example below, the `req3DSAuthentication` is set `true`:

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
            "THREEDS_AUTH_REDIRECT_URL": "https://secure.payu.com/front/threeds/?authenticationId=a27e4aa7-1a24-48d1-a9a6-03f463e048e4"
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

## After Authentication

Once the payer completes the 3DS authentication (if required), PayU will receive a notification. The transaction will then be:

* **Completed:** If the authentication is successful.
* **Declined:** If the authentication fails.

### Redirection After Authentication

Following the payer's redirection from the `THREEDS_AUTH_REDIRECT_URL`, they will be directed to:

* **PayU Checkout transaction status page:** By default, this is the behavior if the merchant hasn't specified a custom return URL.
* **Merchant's custom return URL:** If provided, the payer will be redirected to the merchant's designated page after authentication.

