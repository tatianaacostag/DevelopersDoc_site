---
title: "Technical Configuration"
linkTitle: "Technical Configuration"
date: 2021-08-13T12:19:55-05:00
type: docs
Description: >
  This guide provides essential details for integrating your website using any of the [integration methods](/en/docs/integrations.html) we offer.
weight: 20
tags: ["subtopic"]
---

## Technical Information Overview

No matter which [integration method]({{< ref "integrations" >}}) you choose, certain technical details are required to ensure successful integration. This document outlines the key variables and settings you need to configure.

### Merchant and Account IDs

These identifiers are crucial for authenticating your merchant account with PayU. You can locate them in the left panel of the management site after logging in.

<img src="/assets/Merchant_Ids.png" alt="PrintScreen" width="60%"/>

### API Key and API Login

To find your API key and API login:

1. Log in to your Management Panel.

2.  Navigate to _**Settings**_ and select _**Technical Configuration**_.

![PrintScreen](/assets/IntegrationVariables_01.png)

3. On the right panel, find both, the API key and API Login, necessary to authenticate your transactions during integration.

![PrintScreen](/assets/IntegrationVariables_02.png)

{{% alert title="Warning" color="warning"%}}

Your API key and API login are unique to your PayU account. Ensure that these credentials are kept secure, as their misuse or unauthorized disclosure is your responsibility. 

{{% /alert %}} 

## Configuring Technical Information

You can customize various technical settings for each active account, including:

- URLs for confirmation and response pages.
- Email notifications for buyers and your store.
- Dispute process notifications.
- Selection of test mode or live transactions.

To configure these settings, go to _**Settings**_ > _**Technical Configuration**_.

![PrintScreen](/assets/IntegrationVariables_01.png)

In the _**Technical configuration**_ window, you find two tab according to your needs: _**Payments**_ and _**Disputes**_.

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_01.png)

### Payments

In the _**Payments**_ tab, you can configure the following:

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_02.png)

<div class="variables"></div>

| Parameter | Description |
|---|---|
| Your payments are processed | Choose whether your transactions are processed _In Production_ or _In Test Mode_. Transactions processed in _Test Mode_ are marked as tests and are not real. |
| Response URL | The URL where buyers are redirected after completing a transaction. This page displays the transaction status. |
| Confirmation URL | The URL where PayU sends the payment confirmation to your system. Use this to update inventory or databases when a transaction reaches its final state. This parameter is optional. |
| Control duplicate payments / Only for approved sales | <li><b>Control duplicate payments:</b> If you enable this option, the reference can only be used once, regardless of the transaction outcome (approved, declined, pending).</li> <li><b>Only for approved sales:</b> If you check this box, a reference can only be reused if the previous transaction was declined. If the previous transaction was pending or approved, the reference cannot be reused.</li> <li><b>Control duplicate payments + Only for approved sales:</b> If you enable both features, the reference can only be used once (the rule "Validate unique reference for all statuses" takes precedence).</li> <li><b>Both boxes disabled:</b> The reference can be reused multiple times, regardless of the transaction outcome. Note that having both options disabled may affect reconciliation, as the same reference could appear multiple times with different statuses.</li> <br> <b>Note:</b><br> Retry time: If you need to resend a reference, wait for a response from PayU or at least 60 seconds. |
| Notifications of processed payments | Enable email notifications to be sent to the buyer or your store when a payment is approved or rejected. |

### Disputes

In the _**Disputes**_ tab, you can configure settings related to the [dispute process]({{< ref "Disputes-MP.md" >}}).

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_03.png)

<div class="variables"></div>

| Parameter | Description |
|---|---|
| Notification e-mails | Set the email addresses to be notified when a dispute is initiated. |
| Automatic notification URL | If enabled, set the URL where PayU will send notifications about dispute processes. |

{{% alert title="Note" color="info"%}}

Remember to click the _**Save changes**_ button to apply any updates you make.

{{% /alert %}} 