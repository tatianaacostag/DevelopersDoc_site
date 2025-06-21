---
title: "External 3DS Authentication"
linkTitle: "External 3DS Authentication"
date: 2024-07-01T11:32:55-05:00
description: >
  Leverage your existing 3DS service to enhance payment security with PayU's passthrough integration.
weight: 22
tags: ["subtopic"]
---

## Leveraging an External 3DS Authentication

If you have your own 3DS Authentication service, you can integrate it seamlessly with PayU, this approach is also known as **passthrough** and lets you manage the authentication process directly with your chosen Merchant Plug-in (MPI) or 3DS Server.

{{% alert title="Notes" color="info"%}}

* 3DS authentication for PayU Latam is only available for **Argentina**, **Brazil**, **Colombia**, **Mexico**, and **Peru**.
* This feature requires an API integration and is not available for Webcheckout integration.
* **Supported networks:** Visa and Mastercard

{{% /alert %}}

## How it Works

* **Utilize your existing 3DS service:** PayU integrates seamlessly with your preferred provider for a smooth workflow.
* **Handle authentication:** You manage the communication between your platform and the 3DS service.
* **Send response to PayU:** Include the authentication response from your 3DS service within your payment request to PayU.

### Important Considerations

* **Independent services:** Your 3DS service operates independently of PayU's authorization service.
* **Combined data required:** For successful payment processing, your PayU authorization request must include the authentication response from your 3DS service.

## API Parameters for 3DS Authentication

When you use your own 3DS service with the passthrough method, include the following API fields in your payment request to PayU:

| Field | Type | Length | Description |
|-------|------|--------|-------------|
| `transaction > threeDomainSecure` | Object |  | Provides the information for 3DS 2.0 authentication. |
| `transaction > threeDomainSecure > embedded` | Boolean |  | Set this to `true` to use an embedded MPI for the Authorization process. The default value is `false`. |
| `transaction > threeDomainSecure > eci` | Number | Max: 2 | Represents the Electronic Commerce Indicator.<br>The directory server returns this value to indicate the authentication attempt.<br>This parameter becomes mandatory when you set `transaction.threeDomainSecure.embedded` to `false` and include `transaction.threeDomainSecure.xid`. |
| `transaction > threeDomainSecure > cavv` | Alphanumeric | Max: 28 | Provides the Cardholder Authentication Verification Value.<br>This cryptogram code, in Base64, authenticates the transaction.<br>Depending on the ECI codes from the processing network, this value may be optional. |
| `transaction > threeDomainSecure > xid` | Alphanumeric | Max: 28 | Identifies the transaction using the ID that the MPI returns in Base64.<br>This parameter becomes mandatory when you set `transaction.threeDomainSecure.embedded` to `false` and include `transaction.threeDomainSecure.eci`. |
| `transaction > threeDomainSecure > directoryServerTransactionId` | Alphanumeric | Max: 36 | Identifies the transaction using the ID that the directory server generates during authentication. |

## Request Example

The following JSON example shows how to structure a payment request that includes external 3DS authentication data using the passthrough method:

```json
{
    "language": "en",
    "command": "SUBMIT_TRANSACTION",
    "merchant": {
        "apiLogin": "pRRXKOl8ikMmt9u",
        "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
    },
    "transaction": {
        "type": "AUTHORIZATION_AND_CAPTURE or AUTHORIZATION",
        "paymentMethod": "VISA",
        "paymentCountry": "AR, BR, CO, MX or PE",
        "ipAddress": "170.198.69.98",
        "userAgent": "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:5.3) Gecko/20100101 Firefox/5.3.5",
        "cookie": "9btoljd0qgr6ymppx0iker0o72",
        "deviceSessionId": "867451dba1eda5984f2f67b36b93be3",
        "extraParameters": {
            "INSTALLMENTS_NUMBER": 1
        },
        "creditCard": {
            "name": "APPROVED",
            "number": "5150030090050182",
            "expirationDate": "2028/01",
            "securityCode": "777"
        },
        "threeDomainSecure": {
            "embedded": false,
            "eci": "05",
            "cavv": "MTIzNDU2Nzg5MDA5ODc2XTQzMjE=",
            "xid": "Nmp3VFdWMlEwZ05pWXN3SGo4TDA=",
            "directoryServerTransactionId": "f25084f0-5b16-4c0a-ae5d-b24808a95e9b"
        },
        "payer": {
            ...
            "billingAddress": {...}
        },
        "order": {
            "accountId": "512322",
            ...
            "buyer": {
                ...
                "shippingAddress": {...}
            },
            "shippingAddress": {...},
            "additionalValues": {
                "TX_VALUE": {
                    "value": "10000",
                    "currency": "ARS, BRL, COP, MXN or PEN"
                },
                "TX_TAX": {...},
                "TX_TAX_RETURN_BASE": {...}
            }
        }
    },
    "test": false
}
```

## Country-Specific Documentation

For detailed instructions on including authentication response parameters in your request, refer to the documentation for your processing country:

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Argentina.md#parameters-for-request-and-response" >}}'><img src="/assets/Argentina.png" width="16%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Brazil.md#parameters-for-request-and-response" >}}'><img src="/assets/Brasil.png" width="16%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Colombia.md#parameters-for-request-and-response" >}}'><img src="/assets/Colombia.png" width="16%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Mexico.md#parameters-for-request-and-response" >}}'><img src="/assets/Mexico.png" width="16%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Peru.md#parameters-for-request-and-response" >}}'><img src="/assets/Peru.png" width="16%"/></a>
  </div>
</div>
<br>
