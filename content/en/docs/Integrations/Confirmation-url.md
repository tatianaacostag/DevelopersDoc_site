---
title: "Confirmation URL"
linkTitle: "Confirmation URL"
date: 2026-01-29T12:15:57-05:00
description: >
  The Confirmation URL is a server-to-server webhook that automates the synchronization of transaction results with your internal systems.  
weight: 50
---

PayU uses this URL to send an asynchronous HTTP POST request directly to your server once a transaction reaches a final state (Approved, Rejected, or Declined). Because this process occurs in the background, it remains invisible to the customer. Therefore, while the Response URL handles the customer-facing experience, the Confirmation URL manages the backend communication between PayU and your server.

## Implementation Guidelines

* **Automatic Updates:** Use this mechanism to trigger automated workflows, such as updating databases, adjusting inventory levels, and finalizing order statuses.

* **Retry Handling:** PayU generates a unique confirmation for every transaction attempt. If a payer retries a payment, your system will receive a notification for each individual result, regardless of the outcome.
 
* **Format Requirements:** Since this URL serves purely for data transmission, your endpoint must not return HTML code or visual elements.

* **Server-Side Logic:** You must implement server-side logic in your preferred programming language to capture, parse, and process the variables transmitted by PayU.

{{% alert title="Note" color="info"%}} 

While implementing the Confirmation URL is optional, we highly recommend it to ensure your system maintains an accurate and real-time record of all transaction outcomes. 

{{% /alert %}}

## Integration Methods

Depending on your integration type, use the following parameters to define your webhook endpoint:

| Integration Type | Parameter Path | Implementation Example |
| :--- | :--- | :--- |
| **WebCheckout** | `confirmationUrl` | `<input name="confirmationUrl" type="hidden" value="https://yoursite.com/confirm">` |
| **API Integration** | `transaction.order.notifyUrl` | `"order": { "notifyUrl": "https://yoursite.com/confirm", ... }` |

## Considerations

* **Public Accessibility:** The URL must be public. Avoid localhosts or internal intranets.

* **Disable Authentication:** Ensure the endpoint does not require Basic Auth or any security measures that would block PayU's automated POST request.

* **SSL/TLS Certificates:** If you are using HTTPS for your Confirmation URL, you must employ a valid SSL/TLS certificate. Do not use elliptic curve security certificates or those with the `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA` encryption suite for your Confirmation URL.

* **Content Type:** our server must be configured to process data in `x-www-form-urlencoded` format.

* **Final Transaction Status Reporting:** PayU will only trigger the Confirmation URL once a transaction reaches a final status (e.g., approved, rejected, or expired). You will not receive reports for transactions that are still in progress (waiting for payment or analysis).

* **No HTML Output:** Since this is a system-to-system call, your script should process the logic and return a standard HTTP 200 OK status without rendering HTML code. 

## Whitelist of IP Addresses for PayU Servers

To ensure that your server receives requests and notifications from PayU Latam, it is necessary to whitelist our IP addresses. This is especially important if your server is protected by a firewall. All webhook requests and communication from PayU servers will originate from the IP addresses listed below.

**Production Environment**

* 34.233.144.154
* 184.73.94.138
* 52.73.124.136

**Sandbox Environment**

* 54.158.171.129

## POST Parameters

PayU transmits a wide array of parameters to your server.

### Important Considerations

* **Dynamic Payloads:** PayU adjusts the payload dynamically based on the payment method used. For example, PayU sends `cc_number`, `cc_holder`, and `cardType` for credit card transactions but excludes them for cash payments or bank transfers.

* **Error Handling:** Your integration must handle optional or missing keys to avoid script errors when specific variables are absent from the POST request.

* **Configurable Variables:** To include extended data—such as `cardType`, `transaction_type`, `bank_reference_code`, `payment_method_id`, `expiration_date`, or `adminFee`—please contact your PayU representative. These parameters are not sent by default and must be enabled specifically for your account.

<details>

<summary><b>Parameters</b></summary>

<br>

<div class="variables"></div>

| Field | Type | Size | Description |
|---|---|---|---|
| `merchant_id` | Numeric | 12 | Your Merchant ID within PayU's system. This can be found in your account creation email. |
| `state_pol` | Alphanumeric | 32 | Status of the transaction within PayU's system. [See transaction statuses]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-url" >}}). |
| `risk` | Decimal | — | Risk score associated with the transaction, ranging from 0 to 1. A higher value indicates greater risk. Format: `###.00`. |
| `response_code_pol` | Alphanumeric | 255 | PayU's internal response code for the transaction. [See response codes]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-url" >}}). |
| `reference_sale` | Alphanumeric | 255 | Your unique reference for the sale or order. This must be distinct for every transaction sent to PayU. |
| `reference_pol` | Alphanumeric | 255 | Unique reference or transaction number generated by PayU. |
| `sign` | Alphanumeric | 255 | Digital signature generated by PayU for this specific transaction, used for data integrity validation. |
| `extra1` | Alphanumeric | 255 | Custom field for additional purchase information. |
| `extra2` | Alphanumeric | 255 | Custom field for additional purchase information. |
| `payment_method` | Numeric | — | Internal PayU identifier for the payment method used in the transaction. [See payment method codes]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| `payment_method_type` | Numeric | — | General type of payment method used (e.g., credit card, bank transfer). |
| `installments_number` | Numeric | — | Number of installments chosen by the buyer for credit card payments. |
| `value` | Numeric | 14.2 | Total transaction amount, which can include up to two decimal places (e.g., 10000.00 or 10000). |
| `tax` | Numeric | 14.2 | VAT amount for the transaction. This field accepts up to two decimal places (e.g., 19000.00). Use 0 if no VAT applies. <p><b>Note:</b> For transactions in Colombia, if a zero value is sent, PayU will automatically apply the standard 19% VAT. |
| `additional_value` | Numeric | 14.2 | An additional value that is not part of the commission calculation. |
| `transaction_date` | Date | — | Date and time when the transaction occurred (YYYY-MM-DD HH:mm:ss). |
| `currency` | Alphanumeric | 3 | Currency code in which the payment was made. [See accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). |
| `email_buyer` | Alphanumeric | 255 | Buyer's email address, used for transaction result notifications. It is recommended to validate this email if it was provided through a form. |
| `cus` | Alphanumeric | 64 | Unique Tracking Code (Código Único de Seguimiento). This serves as the specific payment reference within the bank for all transactions processed in Colombia. |
| `pse_bank` | Alphanumeric | 255 | Name of the bank used for PSE payments. |
| `test` | Boolean | — | Flag indicating whether the transaction was a test (true) or a live transaction (false). |
| `description` | Alphanumeric | 255 | Description of the items or services purchased in the sale. |
| `billing_address` | Alphanumeric | 255 | Buyer's billing address. |
| `shipping_address` | Alphanumeric | 50 | Delivery address for the merchandise. |
| `phone` | Alphanumeric | 20 | Buyer's residential phone number. |
| `office_phone` | Alphanumeric | 20 | Buyer's daytime phone number. |
| `account_number_ach` | Alphanumeric | 36 | Identifier for ACH transactions. |
| `account_type_ach` | Alphanumeric | 36 | Type of account used for ACH transactions. |
| `administrative_fee` | Decimal | — | Value of the administrative fee associated with the transaction. |
| `administrative_fee_base`| Decimal | — | Base value used to calculate the administrative fee. |
| `administrative_fee_tax`| Decimal | — | Tax amount applied to the administrative fee. |
| `airline_code` | Alphanumeric | 4 | Code of the airline, if applicable. |
| `attempts` | Numeric | — | Number of times PayU attempted to send the confirmation to your server. |
| `authorization_code` | Alphanumeric | 12 | Authorization code provided by the issuing bank for the sale. |
| `bank_id` | Alphanumeric | 255 | Identifier of the bank involved in the transaction. |
| `billing_city` | Alphanumeric | 255 | Buyer's billing city. |
| `billing_country` | Alphanumeric | 2 | ISO 3166-1 alpha-2 code of the country associated with the billing address (e.g., CO, US). |
| `commision_pol` | Decimal | — | Commission amount charged by PayU. |
| `commision_pol_currency`| Alphanumeric | 3 | Currency code for the commission amount. |
| `customer_number` | Numeric | — | Identifier for the customer, if provided. |
| `date` | Date | — | Date and time of the operation (YYYY-MM-DD HH:mm:ss). |
| `error_code_bank` | Alphanumeric | 255 | Error code returned by the bank, if any. |
| `error_message_bank` | Alphanumeric | 255 | Error message returned by the bank, if any. |
| `exchange_rate` | Decimal | — | Exchange rate used for the transaction, if applicable. |
| `ip` | Alphanumeric | 39 | IP address from which the buyer initiated the transaction. |
| `nickname_buyer` | Alphanumeric | 150 | Short identifier or nickname for the buyer, if available. |
| `nickname_seller` | Alphanumeric | 150 | Short identifier or nickname for the seller (your business), if available. |
| `payment_method_id` | Numeric | — | Another identifier for the payment method used. [See payment method codes]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| `payment_request_state`| Alphanumeric | 32 | Current state of the payment request within PayU's system. |
| `pse_reference1` | Alphanumeric | 255 | Custom reference field 1 for PSE payments (Colombia only). |
| `pse_reference2` | Alphanumeric | 255 | Custom reference field 2 for PSE payments (Colombia only). |
| `pse_reference3` | Alphanumeric | 255 | Custom reference field 3 for PSE payments (Colombia only). |
| `response_message_pol`| Alphanumeric | 255 | PayU's human-readable response message for the transaction. [See response messages]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-url" >}}). |
| `shipping_city` | Alphanumeric | 50 | City where the merchandise is to be delivered. |
| `shipping_country` | Alphanumeric | 2 | ISO 3166-1 alpha-2 code of the country where the merchandise is to be delivered (e.g., CO, US). |
| `transaction_bank_id` | Alphanumeric | 255 | Unique identifier assigned to the transaction by the bank. |
| `transaction_id` | Alphanumeric | 36 | PayU's unique identifier for this specific transaction attempt. |
| `payment_method_name` | Alphanumeric | 255 | Name of the payment method used (e.g., VISA, MASTERCARD, PSE). |
| `cc_holder` | Alphanumeric | 150 | Name of the cardholder as it appears on the credit card. |
| `cc_number` | Alphanumeric | — | Masked credit card number used for the transaction (e.g., `************0004`). |
| `cardType` | Alphanumeric | — | Brand or type of the card (e.g., VISA, MASTERCARD). |
| `franchise` | Alphanumeric | — | Franchise associated with the credit card (e.g., VISA). |

</details>

## POST Request Example for the Confirmation URL

The following example shows how our system sends parameters to your Confirmation URL using an HTTP POST request:

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

## Implementation Example (PHP)

This script captures the POST data sent by PayU (compatible with both WebCheckout and API notifications):

```PHP
<?php
/**
 * PayU Confirmation URL / notifyUrl Listener
 * Signature algorithm: MD5
 *
 * This endpoint receives server-to-server notifications from PayU.
 * It must be publicly accessible and return HTTP 200 on success.
 */

// -----------------------------------------------------------------------------
// 1. Configuration
// -----------------------------------------------------------------------------

// Store securely (environment variable recommended)
$apiKey = 'YOUR_API_KEY_HERE';

// -----------------------------------------------------------------------------
// 2. Capture incoming data
//    - WebCheckout sends application/x-www-form-urlencoded
//    - API notifyUrl may send application/json
// -----------------------------------------------------------------------------

$data = $_POST;

if (empty($data)) {
    $rawBody = file_get_contents('php://input');
    $decoded = json_decode($rawBody, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}

// -----------------------------------------------------------------------------
// 3. Extract required parameters (from Confirmation URL payload)
// -----------------------------------------------------------------------------

$merchantId     = $data['merchant_id']     ?? '';
$referenceSale  = $data['reference_sale']  ?? '';
$value          = $data['value']            ?? '';
$currency       = $data['currency']         ?? '';
$statePol       = $data['state_pol']        ?? '';
$receivedSign   = $data['sign']             ?? '';

// -----------------------------------------------------------------------------
// 4. Format value for signature (NO floats)
//    Rule:
//    - If second decimal is 0 → 1 decimal (150.00 → 150.0)
//    - Otherwise → 2 decimals (150.25 → 150.25)
// -----------------------------------------------------------------------------

$parts = explode('.', $value);

if (!isset($parts[1])) {
    $formattedValue = $parts[0] . '.0';
} elseif (strlen($parts[1]) > 1 && $parts[1][1] !== '0') {
    $formattedValue = $parts[0] . '.' . substr($parts[1], 0, 2);
} else {
    $formattedValue = $parts[0] . '.' . $parts[1][0];
}

// -----------------------------------------------------------------------------
// 5. Generate and validate signature (MD5)
// -----------------------------------------------------------------------------

$signatureString = implode('~', [
    $apiKey,
    $merchantId,
    $referenceSale,
    $formattedValue,
    $currency,
    $statePol
]);

$calculatedSign = md5($signatureString);

if (!hash_equals(strtolower($receivedSign), strtolower($calculatedSign))) {
    // Invalid signature — do NOT process the transaction
    http_response_code(403);
    echo 'Invalid signature';
    exit;
}

// -----------------------------------------------------------------------------
// 6. Signature valid — process transaction
// -----------------------------------------------------------------------------

switch ($statePol) {
    case '4':
        // APPROVED
        // ✔ Mark order as paid
        // ✔ Trigger fulfillment
        break;

    case '6':
        // REJECTED
        // ✔ Mark order as rejected
        break;

    case '5':
        // EXPIRED
        // ✔ Mark order as expired
        break;

    default:
        // Other states (optional handling)
        break;
}

// -----------------------------------------------------------------------------
// 7. Respond to PayU
// -----------------------------------------------------------------------------

http_response_code(200);
echo 'OK';

```

## Signature Validation

To ensure the integrity of the data and verify that the notification originated from PayU, you must generate a signature on your server and compare it with the `sign` parameter sent in the HTTP POST request.

### Rounding Rules for Webhooks

The rounding for the `value` field in webhooks follows these specific rules for the signature string:

* If the second decimal of the `value` is zero, format the `new_value` using **one decimal place** (e.g., `150.00` becomes `150.0`).
* If the second decimal is **not** zero, retain two decimal places in the `new_value` (e.g., `150.25` remains `150.25`).

### Signature Format

Always use the values from the Confirmation URL (`merchant_id`, `reference_sale`, `value`, `currency`, and `state_pol`) to generate the signature. **Do not** use values from your own database.

The string to hash is:
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

Use this generator to create a signature with any of the available encryption methods. This functionality assists you in verifying the `sign` value that PayU sends to your Confirmation URL.

<div>
{{< confirmationpage/signaturegen_conf_en >}}
</div>

## Payment Retries

If a transaction is rejected, the payer may retry using a different method. PayU sends a confirmation for each attempt.

* Each attempt shares the same payment reference (`reference_sale`) and order identifier (`reference_pol`).
* Each attempt has a unique transaction identifier (`transaction_id`).

{{% alert title="Note" color="info"%}} 

If you receive an Approved status (state_pol = 4) for a specific reference_sale, your system can safely ignore any subsequent reports for that same reference to prevent duplicate fulfillment. 

{{% /alert %}}

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
