---
title: "PayU-handled 3DS authentication"
linkTitle: "PayU-handled 3DS authentication"
date: 2021-07-16T11:32:55-05:00
description: >
  PayU-Handled 3DS Authentication removes the need for you to manage the 3DS integration process. PayU takes care of everything, from communicating with the issuing bank to handling the authentication flow.
weight: 22
tags: ["subtopic"]
---

## How to use PayU 3DS Authentication

To use 3DS Authentication, merchants must be registered to this service with PayU. Once registered, you can include a new parameter called `req3DSAuthentication` in your payment requests via PayU's Payments API.

### The `req3DSAuthentication` parameter

This parameter allows you to control whether 3DS authentication is required for each transaction. It accepts two values:

* `"true"`: Enforces 3DS authentication for the transaction.
* `"false"`: Disables 3DS authentication for the transaction.

**If `req3DSAuthentication` is not included,** PayU will decide whether to perform 3DS authentication based on its own risk assessment.

#### Request body:
In the request example below, the `req3DSAuthentication` is set `true`:

```JSON
{
    "language": "es",
    "command": "SUBMIT_TRANSACTION",
    "merchant": {
        "apiLogin": "X",
        "apiKey": "X"
    },
    "transaction": {
        "order": {
            "accountId": "1",
            "referenceCode": "payment_test_00000001",
            "description": "payment test",
            "language": "es",
            "notifyUrl": "http://www.tes.com/confirmation",
            "additionalValues": {
                "TX_VALUE": {
                    "value": 20000,
                    "currency": "COP"
                }
            },
            "buyer": {
                "merchantBuyerId": "1",
                "fullName": "Test",
                "emailAddress": "buyer_test@test.com",
                "contactPhone": "(11)756312633",
                "dniNumber": "X",
                "cnpj": "X",
                "shippingAddress": {
                    "street1": "calle 100",
                    "street2": "5555487",
                    "city": "Sao paulo",
                    "state": "SP",
                    "country": "CO",
                    "postalCode": "01019-030",
                    "phone": "(11)756312633"
                }
            }
        },
        "payer": {
            "merchantPayerId": "1",
            "fullName": "First name and second payer name",
            "emailAddress": "payer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "5415668464654",
            "billingAddress": {
                "street1": "Av. Isabel La Católica 103-La Victoria",
                "street2": "125544",
                "city": "Lima",
                "state": "Lima y Callao",
                "country": "PE",
                "postalCode": "000000",
                "phone": "7563126"
            }
        },
        "creditCard": {
            "number": "X",
            "securityCode": "X",
            "expirationDate": "X",
            "name": "APPROVED"
        },
        "extraParameters": {
            "INSTALLMENTS_NUMBER": 1
        },
        "req3DSAuthentication": "true",
        "type": "AUTHORIZATION_AND_CAPTURE",
        "paymentMethod": "VISA",
        "ipAddress": "127.0.0.1",
        "integrationMethod": "STANDARD_HTML_v4_0",
        "source": "WEB"
    },
    "test": false
}
```

## Transaction response and authentication flow

Upon sending a payment request, you will receive a response with a `"PENDING"` state for the transaction. This response will also include a field within `extraParameters` called `THREEDS_AUTH_REDIRECT_URL`.

* **`THREEDS_AUTH_REDIRECT_URL`:** This URL should be used to redirect the payer to complete the 3DS authentication process. The authentication process might involve challenges like entering a one-time password (OTP) received on their phone.

### Response

In the response example below, the merchant redirects the payer to `https://merch-prod.payu.com`:

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1427471957,
        "transactionId": "53dc40a4-ef00-4637-9578-941421f6fd7e",
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
        "operationDate": 1712909903010,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "THREEDS_AUTH_REDIRECT_URL": "https://merch-prod.payu.com/threeds/?authenticationId=6c38fbd4-e643-49e6-be75-1okhfe02a71"
        },
        "additionalInfo": {
            "paymentNetwork": "CREDIBANCO_V2",
            "rejectionType": null,
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": "CREDIT",
            "transactionType": "AUTHORIZATION_AND_CAPTURE"
        }
    }
}
```

## After authentication

Once the payer completes the 3DS authentication (if required), PayU will be notified. The transaction will then be:

* **Completed:** If the authentication is successful.
* **Declined:** If the authentication fails.

### Redirection after authentication

Following the payer's redirection from the `THREEDS_AUTH_REDIRECT_URL`, they will be directed to:

* **PayU Checkout transaction status page:** By default, this is the behavior if the merchant hasn't specified a custom return URL.
* **Merchant's custom return URL:** If provided, the payer will be redirected to the merchant's designated page after authentication.

