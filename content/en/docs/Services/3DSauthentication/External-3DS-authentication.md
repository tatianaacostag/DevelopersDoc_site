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
* 3DS authentication for PayU Latam is only available for **Argentina**, **Brazil**, **Colombia**, and **Peru**.
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

## Country-Specific Documentation
For detailed instructions on including authentication response parameters in your request, refer to the documentation for your processing country:

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Argentina.md#considerations" >}}'><img src="/assets/Argentina.png" width="20%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Brazil.md#considerations" >}}'><img src="/assets/Brasil.png" width="20%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Colombia.md#considerations" >}}'><img src="/assets/Colombia.png" width="20%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Peru.md#considerations" >}}'><img src="/assets/Peru.png" width="20%"/></a>
  </div>
</div>
<br>
