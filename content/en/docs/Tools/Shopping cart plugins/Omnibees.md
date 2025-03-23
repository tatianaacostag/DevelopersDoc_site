---
title: "Omnibees"
linkTitle: "Omnibees"
date: 2025-03-10T10:30:35-05:00
description:
  This guide explains how to integrate PayU with Omnibees. 
weight: 3
tags: ["subtopic"]
---

Omnibees is a hotel distribution and management platform that provides technology for hotels to manage reservations and optimize revenue across multiple sales channels. For more information, visit the official <a href="https://omnibees.com" target="_blank">Omnibees website</a>.

## Prerequisites

Before integrating PayU with Omnibees, ensure you have the following:

* An active <a href="https://developers.payulatam.com/latam/en/docs/getting-started/create-an-account.html" target="_blank">PayU Latam account</a>.
* An active <a href="https://control.paymentsos.com/signup" target="_blank">PayU Enterprise (PaymentsOS) account</a> in production/live mode (see activation details below).

## Activating Your PayU Enterprise Account (Live Mode)

By default, new accounts are set to test mode. To enable live transactions, contact your account manager and submit a request with the following details:

* **Merchant ID:** Locate your LATAM account’s Merchant ID in the <a href="https://developers.payulatam.com/latam/en/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html#merchant-and-account-ids" target="_blank">PayU Management Panel</a>.
* **Account ID:** Find your Account ID in the PayU Enterprise control panel by clicking your username in the upper-right corner.
<br>

![PrintScreen](/assets/VTEX/vtex01.png)

## Integrating PayU with Omnibees

Integration consists of two main steps:

1. Configuring your PayU Enterprise account
2. Contacting Omnibees to enable the integration

### 1. Configuring Your PayU Enterprise Account

PayU Enterprise operates through PaymentsOS, which acts as middleware between PayU Latam and Omnibees. Configuration includes the following components:

* Provider configuration
* Business unit setup
* Webhook creation

#### 1.1 Configuring a Provider

A _provider_ stores your payment-processing credentials. Follow these steps to configure one:

1. In the PayU Enterprise dashboard, navigate to **Configurations** > **Providers**.

![PrintScreen](/assets/VTEX/vtex02.png)

2. Click the module corresponding to the country or division you are configuring.

3. Complete the following fields:

| Field | Description |
|---|---|
| Configuration Name | Enter a name for the provider configuration. |
| Description | Provide an optional description. |
| apiLogin | Username or login provided by PayU. [Get API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| apiKey | Unique key of your commerce. [Get API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| accountId | PayU account ID based on your operating country. |
| merchantId | Your commerce ID in PayU Latam. |
| paymentCountry | Processing country in ISO 3166 Alpha-3 format. |
| multicapture | Select **None**. |
| cashRedirect | Select **None**. |

{{% alert title="Note" color="info"%}}

If you are using older versions of PayU's Administrative Module, find your account information under **Configurations** > **Technical Information**.

![PrintScreen](/assets/omnibees/omnibees1.png)

{{% /alert %}}

4. Click **Create**.

<img src="/assets/omnibees/omnibees2.png" alt="PrintScreen" style="width: 450px; height: auto;">
<br>

#### 1.2 Creating a Business Unit

A _business unit_ links the provider configuration with PayU Enterprise API credentials for processing transactions. Follow these steps:

1. In the dashboard, go to **Configurations** > **Business Units**.

<img src="/assets/VTEX/vtex04.png" alt="PrintScreen" style="width: 400px; height: auto;">
<br>

2. Click **Create Business Unit** and enter:

| Field | Description |
|---|---|
| Business Unit Name | Must be lowercase and contain no spaces. **This value cannot be changed later, so ensure accuracy.** |
| Description | Optional description. |

3. In the **Choose a Default Provider for This Business Unit** section, select the provider created in Step 1.1, then click **Create**.

<img src="/assets/omnibees/omnibees3.png" alt="PrintScreen" style="width: 700px; height: auto;">
<br>

{{% alert title="Note" color="info"%}}

You can click on the business unit tab to retrieve the following details necessary for Omnibees integration: **App ID**, **Public API key**, and **Private API key**.

<img src="/assets/omnibees/omnibees4.png" alt="PrintScreen" style="width: 450px; height: auto;">

{{% /alert %}}

#### 1.3 Creating a Webhook

The webhook receives notifications from Omnibees when a transaction changes status. Follow these steps:

1. In the dashboard, navigate to **Configurations** > **Webhooks**.

<img src="/assets/VTEX/vtex06.png" alt="PrintScreen" style="width: 400px; height: auto;">
<br>

2. Click **Create a Webhook Endpoint** and enter:

   ```
   https://paymentgateways.omnibees.com/PayUWebhookService.ashx
   ```

3. Enable **Update** and **Create** for the **Charge** event under **Payment Event Alerts**.

4. Assign the webhook to the previously created business unit and select the latest webhook version.

5. Click **Create**.

<img src="/assets/omnibees/omnibees5.png" alt="PrintScreen" style="width: 600px; height: auto;">
<br>

## 2. Contacting Omnibees to Enable the Integration

Once the PayU Enterprise components are configured, email **servicedesk@omnibees.com** to request activation. Include the following details:

* App ID
* Public API key
* Private API key
* Business unit (optional)

## User Management in PayU Enterprise

PayU Enterprise allows role-based user access for business units. For details on managing users and permissions, refer to the <a href="https://developers.paymentsos.com/docs/features/control-center.html#user-management" target="_blank">PayU Enterprise documentation</a>.
