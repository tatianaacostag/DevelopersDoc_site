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

## What is a refund?
A refund is the action to voluntary return the money paid by a customer when any of the following situations happen:
* The product or service delivered does not met the expectations of the customer and they returned it.
* The product is out of stock, anf the merchant is not able to deliver the product to the client.

## Refund procedure
Refunds are subject to review and approval of our team. The procedure to request refunds is explained below:

1. When a refund is requested by your customer, you need to request it using the PayU module. You just need to identify the order and provide a reason for refund.

2. Once you send the request, PayU reviews it and this is approved or rejected in **one** to **three** business days.

### Refund states
A refund can be in one of the following three states:

* **In return**: the request has been sent to PayU for approval and it is under approval.
* **Approved**: the request has been approved by a PayU’s customer service agent.
* **Declined**: the request does not meet the policies defined by PayU and was rejected by an agent.

## Permission required
To have access to this module, you need to have a profile with the following permission enabled:

* _Refunds and Chargebacks_ > _List Refunds_
* _Refunds and Chargebacks_ > _Manage Refunds_<br>This permission allows you to perform refunds.	

Refer to [Profiles and Permissions]({{< ref"Profile-and-permissions-management.md" >}}) for more information.

## Considerations per country

Before requesting a refund, take into account the following country-specific considerations.

### Argentina
- Refunds can be requested **at least 10 minutes after approval** and up to **357 days** after the transaction.
- Refunds with decimal amounts are **not supported**.
- Once a refund is approved, the payer receives the funds **within 30 working days**.

### Brazil
- Refunds can be requested **at least 10 minutes after approval** and up to:
  - **87 days** for transactions made with PIX.
  - **172 days** for card transactions.
- Multiple **partial refunds** are supported for PIX transactions.
- Once approved:
  - Refunds for **PIX transactions** are processed **immediately**.
  - Refunds for **other payment methods** take up to **15 working days**.

### Chile
- Refunds can be requested **at least 10 minutes after approval** and up to **327 days**.
- Refunds are available for transactions processed through [WebPay Plus or Redcompra]({{< ref "Payments-API-chile.md#submit-transactions-using-debit-and-prepaid-cards" >}}).
- For **prepaid card transactions not processed by WebPay Plus**:
  - Refunds requested **within the first hour** may be **approved or rejected** by the financial network.
  - Refunds requested **after the first hour** are **automatically rejected**.
- If a refund is rejected, PayU displays the corresponding [error code]({{< ref "Response-codes-and-variables.md#response-codes-for-transactions" >}}).
- Refunds with decimal amounts are **not supported**.
- Once a refund is approved, the payer receives the funds **within 8 to 20 working days**.
- **Partial refunds** for transactions with **installments** are received online but processed manually due to acquirer restrictions.
- The minimum refund amount depends on the acquiring network:
    - **More than 10 CLP** for transactions processed by the **TRANSBANK** network.
    - **More than 50 CLP** for transactions processed by the **KLAP** network.

### Colombia
- Refunds can be requested **at least 10 minutes after approval** and up to **357 days**.
- The minimum refund amount is **100 COP**.
- If a refund request is **not submitted on the same day** as the transaction capture (**before 9 PM UTC-5**), it is **manually processed** instead of being attempted online.
- Once a refund is approved, the payer receives the funds **within 30 working days**.
- **Partial refunds are not available** for international credit cards.

### Mexico
- Refunds can be requested **at least 10 minutes after approval** and up to:
  - **175 days** for most transactions.
  - **40 days** if processed by **Bancomer**.
- Once a refund is approved, the payer receives the funds **within 30 working days**.
- Refunds with decimal amounts are **not supported**.

### Panama
- Refunds can be requested **at least 10 minutes after approval** and up to **357 days**.
- Once a refund is approved, the payer receives the funds **within 8 working days**.

### Peru
- Refunds can be requested **at least 10 minutes after approval** and up to **357 days**.
- **Partial refunds** are supported for transactions **without installments** (including transactions with a single installment).
- **Partial refunds with Visanet** must be sent **at least one day after the transaction**.
- Once a refund is approved, the payer receives the funds **within 15 to 25 working days**.
- The minimum refund amount is **1 USD or 1 PEN**.

### Refund timelines and policies by country

{{< overview/refunds >}}
<sup>*</sup>_Depends on the network._

## How to request a refund?
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

## Getting the refund confirmation
When the refund has been approved, you can generate a receipt or send the confirmation to the payer. To do this, follow the instructions depending on the operation you want to perform.

### Generate the refund receipt
To generate the refund receipt, locate the refunded sale and click the printer button located at the top right corner of the transaction details panel.

<img src="/assets/Refunds/Refunds_en_11.png" alt="PrintScreen" width="50%"/><br>

The print options of your browser opens, here you may physically print it or save it in PDF. The following image corresponds to the print options of Google Chrome.

![PrintScreen](/assets/Refunds/Refunds_en_12.png)

{{% alert title="Warning" color="warning"%}}
The _Save to PDF_ option depends on your browser. If your browser does not support this feature, you can only print it using a printer.
{{% /alert %}}

### Send the refund confirmation to the payer
Along with the print feature, you can also send a confirmation email to payer informing the result of the refund. This option is located in the _**Actions**_ section in the bottom of the transaction details panel.

<img src="/assets/Refunds/Refunds_en_13.png" alt="PrintScreen" width="50%"/><br>

Once you click this button, the payer receives an email with the details of the refund.

<img src="/assets/Refunds/Refunds_en_14.png" alt="PrintScreen" width="50%"/><br>

{{% alert title="Note" color="info"%}}
You can enable the automatic send of the refund confirmation to the payer. To know more details about this option, contact your Sales representative.
{{% /alert %}}