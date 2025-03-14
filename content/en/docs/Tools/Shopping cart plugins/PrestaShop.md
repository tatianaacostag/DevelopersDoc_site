---
title: "PrestaShop"
linkTitle: "PrestaShop"
date: 2025-03-10T10:30:35-05:00
description:
  This guide explains how to integrate PayU with your PrestaShop-based website. 
weight: 9
tags: ["subtopic"]
---

PrestaShop is an open-source e-commerce platform that allows businesses to create and customize online stores with full control over design and functionality. It is self-hosted and highly extensible through modules and themes. For more information, visit the <a href="https://prestashop.com" target="_blank">official PrestaShop website</a>.

## Prerequisites

Before integrating PayU with PrestaShop, ensure you have the following:

* An active <a href="https://developers.payulatam.com/latam/en/docs/getting-started/create-an-account.html" target="_blank">PayU Latam account</a>.
* Your website must be running PrestaShop version 1.4 to 1.6.
* PayU's plugin for PrestaShop, available for download <a href="https://developers.payulatam.com/latam/en/docs/tools/shopping-cart-plugins.html#plugin-files" target="_blank">here</a>.

{{% alert title="Important" color="warning"%}}

PrestaShop version 1.7 and later are not compatible with PayU's plugin.

{{% /alert %}}

## Integrating PayU's Plugin into PrestaShop Modules

To use PayU's services on your PrestaShop site, you must install the PayU plugin as a module. Follow the steps below:

1. Log in to the PrestaShop administration panel.

2. Navigate to **Modules and Services > Modules and Services**.

3. Click **Add a new module** in the upper-right corner.

4. Click **Choose a file**, select the PayU PrestaShop plugin ZIP file from your computer, and then click **Upload this module**.

![PrintScreen](/assets/prestashop/prestashop1.png)

5. The PayU module will now appear in the module list. Click **Install**.

6. In the module list, locate the PayU module and click **Configure**.

7. Complete the required fields, including:

| Field | Description |
|---|---|
| Merchant ID | Your commerce ID in PayU Latam. <a href="https://developers.payulatam.com/latam/en/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html" target="_blank">See my Merchant ID</a>. |
| Account ID | PayU account ID based on your operating country. <a href="https://developers.payulatam.com/latam/en/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html" target="_blank">See my Account ID</a>. |
| API Key | Unique key of your commerce. <a href="https://developers.payulatam.com/latam/en/docs/integrations.html#api-key-and-api-login" target="_blank">See my API Key</a>. |

{{% alert title="Note" color="warning"%}}

Enable the **Test Mode** to perform transactions using dummy data.

{{% /alert %}}

8. Click **Save**.

Now, PayU services are successfully integrated with your PrestaShop site.
