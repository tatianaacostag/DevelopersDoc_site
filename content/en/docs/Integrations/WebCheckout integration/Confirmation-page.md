---
title: "Confirmation Page"
linkTitle: "Confirmation Page"
date: 2021-03-29T12:15:57-05:00
description: >
  The confirmation page facilitates system-to-system communication, allowing you to receive transaction results and update your inventories, orders, or databases.
weight: 30
tags: ["subtopic"]
---

This page, invisible to customers, receives data via HTTP POST. Notably, if a payer attempts payment retries, a confirmation is generated for each transaction, regardless of whether it's approved or rejected.

As this page is intended solely for system updates and is not customer-facing, it should not contain any HTML code. While its implementation is optional, it is highly recommended for ensuring your system accurately reflects transaction outcomes. 

Upon completion of a transaction (whether approved, rejected, or canceled), our platform transmits relevant variables to your confirmation page URL using the HTTP POST method, requiring you to implement server-side logic to capture and process this data according to your chosen programming language.

## Considerations

* **Disable Authentication:** If your site employs basic access authentication or similar security measures, ensure these are disabled for the confirmation page URL to allow access from PayU.
* **Public IP Address:** The IP address associated with your confirmation page URL must be public. Avoid using URLs accessible only from an intranet or localhost.
* **Valid HTTPS Certificate:** If you are using HTTPS for your confirmation page, you must employ a valid SSL/TLS certificate.
* **Content Type:** The confirmation page must be configured to handle data in `x-www-form-urlencoded` format.
* **Avoid Specific Security Configurations:** Do not use elliptic curve security certificates or those with the `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA` encryption suite for your confirmation page.
* **Final Transaction Status Reporting:** PayU will only trigger the confirmation page once a transaction reaches a final status (e.g., approved, rejected, or expired). You will not receive reports for transactions that are still in progress (waiting for payment or analysis).
 
## Whitelist of IP Addresses for PayU Servers

To ensure that your server receives requests and notifications from PayU Latam, it is necessary to whitelist our IP addresses. This is especially important if your server is protected by a firewall. All webhook requests and communication from PayU servers will originate from the IP addresses listed below.

**Production Environment**

* 34.233.144.154
* 184.73.94.138
* 52.73.124.136

**Sandbox Environment**

* 54.158.171.129

## Parameters

The confirmation page transmits the following parameters via HTTP POST to your server:

<details>

<summary>Parameters</summary>

<br>

<div class="variables"></div>

| Field | Type | Size   | Description |
|---|---|---|---|
| `merchant_id`         | Numeric      | 12     | Your Merchant ID within PayU's system. This can be found in your account creation email. |
| `state_pol`           | Alphanumeric | 32     | Status of the transaction within PayU's system. [See transaction statuses]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-page" >}}). |
| `risk`                | Decimal      | —      | Risk score associated with the transaction, ranging from 0 to 1. A higher value indicates greater risk. Format: `###.00`. |
| `response_code_pol`   | Alphanumeric | 255    | PayU's internal response code for the transaction. [See response codes]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-page" >}}).                                                                                             |
| `reference_sale`      | Alphanumeric | 255    | Your unique reference for the sale or order. This must be distinct for every transaction sent to PayU. |
| `reference_pol`       | Alphanumeric | 255    | Unique reference or transaction number generated by PayU. |
| `sign`                | Alphanumeric | 255    | Digital signature generated by PayU for this specific transaction, used for data integrity validation. |
| `extra1`              | Alphanumeric | 255    | Additional field to send supplementary information about the purchase. |
| `extra2`              | Alphanumeric | 255    | Additional field to send supplementary information about the purchase. |
| `payment_method`      | Numeric      | —      | Internal PayU identifier for the payment method used in the transaction. [See payment method codes]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| `payment_method_type` | Numeric      | —      | General type of payment method used (e.g., credit card, bank transfer). |
| `installments_number` | Numeric      | —      | Number of installments chosen by the buyer for credit card payments. |
| `value`               | Numeric      | 14.2   | Total transaction amount, which can include up to two decimal places (e.g., 10000.00 or 10000). |
| `tax`                 | Numeric      | 14.2   | VAT amount for the transaction. This field accepts up to two decimal places (e.g., 19000.00). Use 0 if no VAT applies. <p><b>Note:</b> For transactions in Colombia, if a zero value is sent, PayU will automatically apply the standard 19% VAT. |
| `additional_value`    | Numeric      | 14.2   | An additional value that is not part of the commission calculation. |
| `transaction_date`    | Date         | —      | Date and time when the transaction occurred (YYYY-MM-DD HH:mm:ss). |
| `currency`            | Alphanumeric | 3      | Currency code in which the payment was made. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). |
| `email_buyer`         | Alphanumeric | 255    | Buyer's email address, used for transaction result notifications. It is recommended to validate this email if it was provided through a form. |
| `cus`                 | Alphanumeric | 64     | Unique Tracking Code, a payment reference within the bank, applicable only to PSE (electronic funds transfer in Colombia) payments. |
| `pse_bank`            | Alphanumeric | 255    | Name of the bank used for PSE payments. |
| `test`                | Boolean      | —      | Flag indicating whether the transaction was a test (true) or a live transaction (false). |
| `description`         | Alphanumeric | 255    | Description of the items or services purchased in the sale. |
| `billing_address`     | Alphanumeric | 255    | Buyer's billing address. |
| `shipping_address`    | Alphanumeric | 50     | Delivery address for the merchandise. |
| `phone`               | Alphanumeric | 20     | Buyer's residential phone number. |
| `office_phone`        | Alphanumeric | 20     | Buyer's daytime phone number. |
| `account_number_ach`  | Alphanumeric | 36     | Identifier for ACH transactions. |
| `account_type_ach`    | Alphanumeric | 36     | The type of account used for ACH transactions. |
| `administrative_fee`  | Decimal      | —      | The value of the administrative fee associated with the transaction. |
| `administrative_fee_base`| Decimal      | —      | The base value used to calculate the administrative fee. |
| `administrative_fee_tax`| Decimal      | —      | The tax amount applied to the administrative fee. |
| `airline_code`        | Alphanumeric | 4      | The code of the airline, if applicable. |
| `attempts`            | Numeric      | —      | The number of times PayU attempted to send the confirmation to your server. |
| `authorization_code`  | Alphanumeric | 12     | The authorization code provided by the issuing bank for the sale. |
| `bank_id`             | Alphanumeric | 255    | The identifier of the bank involved in the transaction. |
| `billing_city`        | Alphanumeric | 255    | The buyer's billing city. |
| `billing_country`     | Alphanumeric | 2      | The ISO 3166-1 alpha-2 code of the country associated with the billing address (e.g., CO, US). |
| `commision_pol`       | Decimal      | —      | The commission amount charged by PayU. |
| `commision_pol_currency`| Alphanumeric | 3      | The currency code for the commission amount. |
| `customer_number`     | Numeric      | —      | An identifier for the customer, if provided. |
| `date`                | Date         | —      | The date and time of the operation (YYYY-MM-DD HH:mm:ss). |
| `error_code_bank`     | Alphanumeric | 255    | The error code returned by the bank, if any. |
| `error_message_bank`  | Alphanumeric | 255    | The error message returned by the bank, if any. |
| `exchange_rate`       | Decimal      | —      | The exchange rate used for the transaction, if applicable. |
| `ip`                  | Alphanumeric | 39     | The IP address from which the buyer initiated the transaction. |
| `nickname_buyer`      | Alphanumeric | 150    | A short identifier or nickname for the buyer, if available. |
| `nickname_seller`     | Alphanumeric | 150    | A short identifier or nickname for the seller (your business), if available. |
| `payment_method_id`   | Numeric      | —      | Another identifier for the payment method used. [See payment method codes]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| `payment_request_state`| Alphanumeric | 32     | The current state of the payment request within PayU's system. |
| `pse_reference1`      | Alphanumeric | 255    | Additional reference information for PSE payments. |
| `pse_reference2`      | Alphanumeric | 255    | Further additional reference information for PSE payments. |
| `pse_reference3`      | Alphanumeric | 255    | Yet more additional reference information for PSE payments. |
| `response_message_pol`| Alphanumeric | 255    | PayU's human-readable response message for the transaction. [See response messages]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-page" >}}).                                                                                    |
| `shipping_city`       | Alphanumeric | 50     | The city where the merchandise is to be delivered. |
| `shipping_country`    | Alphanumeric | 2      | The ISO 3166-1 alpha-2 code of the country where the merchandise is to be delivered (e.g., CO, US). |
| `transaction_bank_id` | Alphanumeric | 255    | The unique identifier assigned to the transaction by the bank. |
| `transaction_id`      | Alphanumeric | 36     | PayU's unique identifier for this specific transaction attempt. |
| `payment_method_name` | Alfa Numeric | 255    | The name of the payment method used (e.g., VISA, MASTERCARD, PSE). |

</details>

## POST Request Example for the Confirmation Page

The following example shows how our system sends parameters to your confirmation page using an HTTP POST request:

```HTML
response_code_pol=5
phone=
additional_value=0.00
test=1
transaction_date=2015-05-27 13:07:35
cc_number=************0004
cc_holder=test_buyer
error_code_bank=
billing_country=CO
bank_referenced_name=
description=test_payu_01
administrative_fee_tax=0.00
value=100.00
administrative_fee=0.00
payment_method_type=2
office_phone=
email_buyer=test@payulatam.com
response_message_pol=ENTITY_DECLINED
error_message_bank=
shipping_city=
transaction_id=f5e668f1-7ecc-4b83-a4d1-0aaa68260862
sign=e1b0939bbdc99ea84387bee9b90e4f5c
tax=0.00
payment_method=10
billing_address=cll 93
payment_method_name=VISA
pse_bank=
state_pol=6
date=2015.05.27 01:07:35
nickname_buyer=
reference_pol=7069375
currency=USD
risk=1.0
shipping_address=
bank_id=10
payment_request_state=R
customer_number=
administrative_fee_base=0.00
attempts=1
merchant_id=508029
exchange_rate=2541.15
shipping_country=
installments_number=1
franchise=VISA
payment_method_id=2
extra1=
extra2=
antifraudMerchantId=
extra3=
nickname_seller=
ip=190.242.116.98
airline_code=
billing_city=Bogota
pse_reference1=
reference_sale=2015-05-27 13:04:37
pse_reference3=
pse_reference2=
```

## Signature Validation

Signature validation ensures the integrity of the data received on your confirmation page. You must generate the signature using the parameters that PayU provided and compare it with the `sign` parameter sent in the HTTP POST request.

### Important Considerations

* If the second decimal of the `value` is zero, format the `new_value` using **one decimal place** (e.g., `150.00` → `150.0`).
* If the second decimal is **not** zero, retain two decimal places in the `new_value` (e.g., `150.25` → `150.25`).
* Always use the values from the confirmation page (`merchant_id`, `reference_sale`, `value`, `currency`, and `state_pol`) to generate the signature. **Do not** use values from your own database.
* Store your API key securely.
* Construct the signature string in the following format:

<p>

    apiKey~merchant_id~reference_sale~new_value~currency~state_pol

### Signature Examples

The following examples illustrate how to generate a signature, in this case, using HMAC-SHA256. 

#### Signature with One Decimal

Use this example when the second decimal of the `value` is `0`. In this case, format the value with only one decimal place.

| **Item** | **Value** |
|-----------|----------|
| String Parameters | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchant_id: 508029` <br> `reference_sale: PayUTest01` <br> `value: 150.00` <br> `currency: USD` <br> `state_pol: 4` |
| Input String (formatted) | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.0~USD~4` |
| Secret Key (only applicable to HMAC-SHA256)   | `test123` |
| Generated `sign` | `65fb2b3452572784e23e7d6480359fd2507c54dd285ca3c4dceffb8764cfb66f` |

#### Signature with Two Decimals

Use the following example when the second decimal of the `value` **is not** `0`. Format the value with two decimal places.

| **Item** | **Value** |
|----------|-----------|
| String Parameters | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchant_id: 508029` <br> `reference_sale: PayUTest01` <br> `value: 150.25` <br> `currency: USD` <br> `state_pol: 4` |
| Input String (formatted)   | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.25~USD~4` |
| Secret Key (only applicable to HMAC-SHA256)   | `test123` |
| Generated `sign` | `7770a7933b90570a078fcacce1790eb13079cdf8f8a6e900b79f4f5eb96b8024` |

### Validate Your Signature

Use this generator to create a signature with any of the available encryption methods. This functionality assists you in verifying the `sign` value that PayU sends to your confirmation page.

<div>
{{< confirmationpage/signaturegen_conf_en >}}
</div>

## Payment Retries

When a transaction is rejected, the payer has the option to retry the payment using the same or a different payment method. Keep in mind that for each attempt, PayU sends a request to the confirmation page with the corresponding transaction status.

Each of these requests uses the same payment reference (`reference_sale`) and order identifier (`reference_pol`), but includes a different transaction identifier (`transaction_id`). As a result, you may receive multiple calls to the confirmation page for the same sale.

Below is an example showing a rejected attempt followed by an approved retry:

````
reference_sale=2015-05-27 13:04:37
reference_pol=7069375
transaction_id=f5e668f1-7ecc-4b83-a4d1-0aaa68260862
state_pol=6

reference_sale=2015-05-27 13:04:37
reference_pol=7069375
transaction_id=01cfdce8-68d5-4a4c-aabf-d89370a0b92f
state_pol=4
````

{{% alert title="Note" color="info"%}}

If any of the confirmation page requests indicate that a payment reference (`reference_sale`) has been approved, you can be certain that no further reports will be sent for that same reference.

{{% /alert %}}
