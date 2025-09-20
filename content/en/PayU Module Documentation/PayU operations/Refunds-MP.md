---
title: "Refunds"
linkTitle: "Refunds"
date: 2021-09-03T16:41:53-05:00
type: docs
Description: >
  Learn how to make refunds from a paid sale from the PayU module. A refund is made when you voluntarily decide to return the amount paid by your customer.
weight: 20
---

{{% alert title="Note" color="info"%}}

If you perform a refund through this panel, this is only updated in the PayU Module. If you need to control and record the refunds in your refund system, you should use the [Refunds API]({{< ref "refunds.md" >}}).

{{% /alert %}}

## What is a Refund?

A refund is the action to voluntary return the money paid by a customer when any of the following situations happen:
* The product or service delivered does not met the expectations of the customer and they returned it.
* The product is out of stock, anf the merchant is not able to deliver the product to the client.

## Refund Procedure

Refunds are subject to review and approval of our team. The procedure to request refunds is explained below:

1. When a refund is requested by your customer, you need to request it using the PayU module. You just need to identify the order and provide a reason for refund.

2. Once you send the request, PayU reviews it and this is approved or rejected in **one** to **three** business days.

### Refund States

A refund can be in one of the following three states:

* **In Return**: the request has been sent to PayU for approval and it is under approval.
* **Approved**: the request has been approved by a PayU’s customer service agent.
* **Declined**: the request does not meet the policies defined by PayU and was rejected by an agent.

## Permission Required

To have access to this module, you need to have a profile with the following permission enabled:
* _Refunds and Chargebacks_ > _List Refunds_
* _Refunds and Chargebacks_ > _Manage Refunds_<br>This permission allows you to perform refunds.	

Refer to [Profiles and Permissions]({{< ref"Profile-and-permissions-management.md" >}}) for more information.

## Considerations per Country

Before requesting a refund, take into account the following country-specific considerations.

### Argentina

- Request a refund **at least 10 minutes after approval** and up to **357 days** after the transaction.
- Do not include decimal amounts in refunds.
- You can request more than one partial refund for payments made through **AMEX, Mastercard, Naranja, or Visa**.
- Once approved, PayU transfers the funds to the payer within **30 working days**.

### Brazil

- Request a refund **at least 10 minutes after approval**.
- For transactions made with **PIX**, request refunds up to **87 days** after the transaction.
- For card transactions, request refunds up to **172 days** after the transaction.
- You can request more than one partial refund for payments made through **AMEX, Elo, Mastercard, PIX, or Visa**.
- Once approved, refunds for **PIX transactions** are processed **immediately**.
- Once approved, refunds for **other payment methods** take up to **15 working days**.

### Chile

- Request a refund **at least 10 minutes after approval** and up to **327 days** after the transaction.
- Refunds are also available for transactions processed through [WebPay Plus or Redcompra]({{< ref "Payments-API-chile.md#submit-transactions-using-debit-and-prepaid-cards" >}}).
- For **prepaid card transactions not processed by WebPay Plus**:
  - If you request a refund within the **first hour**, the financial network may approve or reject it.
  - If you request a refund **after the first hour**, the financial network automatically rejects it.
- If the financial network rejects a refund, PayU displays the corresponding [error code]({{< ref "Response-codes-and-variables.md#response-codes-for-transactions" >}}).
- Do not include decimal amounts in refunds.
- Once approved, the payer receives the funds within **8 to 20 working days**.
- You can submit partial refunds for transactions with **installments**; PayU receives them online but processes them manually due to acquirer restrictions.
- Follow minimum refund amounts required by the acquiring network:
  - More than **10 CLP** for transactions processed by **TRANSBANK**.
  - More than **50 CLP** for transactions processed by **KLAP**.
- You can request more than one partial refund for payments made through **AMEX, Mastercard, or Visa**.

### Colombia

- Request a refund **at least 10 minutes after approval** and up to **357 days** after the transaction.
- The minimum refund amount is **100 COP**.
- If you do not submit the refund request on the same day as the transaction capture (**before 9 PM UTC-5**), PayU processes it manually instead of attempting it online.
- Once approved, the payer receives the funds within **30 working days**.
- Request only **one partial refund per order**. If the customer asks for an additional refund, process it outside of PayU (e.g., through a gift card, discount, or bank transfer). You can also use our [Payouts API](https://developers.payulatam.com/latam/en/docs/integrations/api-integration/payouts-api.html) to send the amount directly from your PayU account balance. This option is only available under the aggregator model and requires requesting the customer’s bank account details each time. This is especially useful for Alternative Payment Methods such as **Efecty** or **PSE**.
- Partial refunds for international credit cards are **not available**. 
- Partial refunds (only one per order) are available for payments made through **AMEX, Codensa, Diners, Mastercard, or Visa**.

### Mexico

- Request a refund **at least 10 minutes after approval**.
- For most transactions, request refunds up to **175 days** after the transaction.
- For transactions processed by **Bancomer**, request refunds up to **40 days** after the transaction.
- Once approved, the payer receives the funds within **30 working days**.
- Do not include decimal amounts in refunds.
- You can request more than one partial refund for payments made through **AMEX, Mastercard, or Visa**.

### Panama

- Request a refund **at least 10 minutes after approval** and up to **357 days** after the transaction.
- Once approved, the payer receives the funds within **8 working days**.

### Peru

- Request a refund **at least 10 minutes after approval** and up to **357 days** after the transaction.
- Request partial refunds only for transactions **without installments** (including single-installment transactions).
- For **Visanet transactions**, send partial refunds **at least one day after the transaction**.
- The minimum refund amount is **1 USD or 1 PEN**.
- You can request more than one partial refund for payments made through **AMEX, Diners, Mastercard (credit or debit), or Visa (credit or debit)**.
- Once approved, the payer receives the funds within **15 to 25 working days**.

### Refund Timelines and Policies by Country

{{< overview/refunds >}}
<sup>*</sup>_Depends on the network._

## How to Request a Refund?

To request a refund, the transaction must be approved and without any pending dispute process. Follow the next steps to request it.

1. Log into your PayU account. In the left menu, expand the _**Transactions**_ menu and select _**Sales Report**_.

![PrintScreen](/assets/Refunds/Refunds_en_04.png)

2. The [Sales Report]({{< ref "Sales-report.md" >}}) opens. Locate the transaction you want to refund and click it.

![PrintScreen](/assets/Refunds/Refunds_en_05.png)

3. The transaction details appear at the right of the screen, Click the _**Refund**_ button at the end of the panel.

<img src="/assets/Refunds/Refunds_en_06.png" alt="PrintScreen" width="50%"/><br>

4. If you need to request a partial refund, check the option _**Partial refund**_ and provide the requested value.

<img src="/assets/Refunds/Refunds_en_08.png" alt="PrintScreen" width="50%"/><br>

5. Provide the reason to request the refund (partial or total) and click _**Refund**_.

<img src="/assets/Refunds/Refunds_en_07.png" alt="PrintScreen" width="50%"/><br>

6. The summary of the request appears. While PayU process the refund, the amount of the refund is frozen in your account. If the request is approved, the amount refunded is returned to the customer through the payment method used.

<img src="/assets/Refunds/Refunds_en_09.png" alt="PrintScreen" width="50%"/><br>

7. Once the request has been approved, the status appears in the sale.

<img src="/assets/Refunds/Refunds_en_10.png" alt="PrintScreen" width="50%"/><br>

## Getting the Refund Confirmation

When the refund has been approved, you can generate a receipt or send the confirmation to the payer. To do this, follow the instructions depending on the operation you want to perform.

### Generate the Refund Receipt

To generate the refund receipt, locate the refunded sale and click the printer button located at the top right corner of the transaction details panel.

<img src="/assets/Refunds/Refunds_en_11.png" alt="PrintScreen" width="50%"/><br>

The print options of your browser opens, here you may physically print it or save it in PDF. The following image corresponds to the print options of Google Chrome.

![PrintScreen](/assets/Refunds/Refunds_en_12.png)

{{% alert title="Warning" color="warning"%}}
The _Save to PDF_ option depends on your browser. If your browser does not support this feature, you can only print it using a printer.
{{% /alert %}}

### Send the Refund Confirmation to the Payer

Along with the print feature, you can also send a confirmation email to payer informing the result of the refund. This option is located in the _**Actions**_ section in the bottom of the transaction details panel.

<img src="/assets/Refunds/Refunds_en_13.png" alt="PrintScreen" width="50%"/><br>

Once you click this button, the payer receives an email with the details of the refund.

<img src="/assets/Refunds/Refunds_en_14.png" alt="PrintScreen" width="50%"/><br>

{{% alert title="Note" color="info"%}}
You can enable the automatic send of the refund confirmation to the payer. To know more details about this option, contact your Sales representative.
{{% /alert %}}