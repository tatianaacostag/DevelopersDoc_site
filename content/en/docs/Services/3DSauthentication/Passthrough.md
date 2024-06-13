---
title: "3DS authentication with Passthrough"
linkTitle: "Passthrough"
date: 2021-07-16T11:32:55-05:00
description: >
  Leverage your existing 3DS service to enhance payment security with PayU's Passthrough integration.
weight: 25
tags: ["subtopic"]
---

## Leveraging Passthrough
If you have your own 3DS Authentication service, you can integrate it seamlessly with PayU using Passthrough. This approach lets you manage the authentication process directly with your chosen Merchant Plug-in (MPI) or 3DS Server.

{{% alert title="Notes" color="info"%}}
* Passthrough is currently available for API integrations with the PayU Latam platform. Contact your sales representative for details.
* **Currently supported networks:** Visa and Mastercard
{{% /alert %}}

## How Passthrough works

* **Utilize your existing 3DS service:** PayU integrates seamlessly with your preferred provider for a smooth workflow.
* **Handle authentication:** You manage the communication between your platform and the 3DS service.
* **Send response to PayU:** Include the authentication response from your 3DS service within your payment request to PayU.

### Important considerations

* **Independent services:** Your 3DS service operates independently of PayU's authorization service.
* **Combined Data Required:** For successful payment processing, your PayU authorization request must include the authentication response from your 3DS service.

## Country-specific documentation

For detailed instructions on including authentication response parameters in your request, refer to the documentation for your processing country:

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Brazil.md#considerations" >}}'><img src="/assets/Brasil.png" width="10%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Colombia.md#considerations" >}}'><img src="/assets/Colombia.png" width="10%"/></a>
  </div>
</div>
<br>




