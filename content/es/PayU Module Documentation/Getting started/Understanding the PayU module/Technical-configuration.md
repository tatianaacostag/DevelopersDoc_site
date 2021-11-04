---
title: "Technical Configuration"
linkTitle: "Technical Configuration"
date: 2021-08-13T12:19:55-05:00
type: docs
Description: >
  Find here all the details that help you to integrate your Website using any of the [integrations](/docs/integrations.html) we provide.
weight: 20
tags: ["subtopic"]
---

## Getting Technical information
Regardless of the [integration](/docs/integrations.html) you use, you require the following variables in the request of the methods or in their.

### Merchant y account IDs
These values allows you to authenticate both your merchant y your account when using any of the integrations to use the services we provide.

When you log in your PayU module, both values are accessible in the left panel.

<img src="/assets/Merchant_Ids.png" alt="PrintScreen" width="60%"/>

### API key y API Login
1. In the PayU module, click _**Configuración**_ y then select _**Configuración técnica**_.

![PrintScreen](/assets/IntegrationVariables_01.png)

2. In this window, you find both the API key y API Login which allows you to authenticate you commerce during the integration procedure.

![PrintScreen](/assets/IntegrationVariables_02.png)

{{% alert title="Advertencia" color="warning"%}}

Both keys are unique per commerce in PayU, therefore, you must keep this information secured y their usage or disclosure is under your responsibility. 

{{% /alert %}} 

## Configuring technical information
In this section, you can configure the technical properties of each active account, such as:
* URL settings for confirmation y response pages.
* Enable the send e-mails to the buyer y to your store when a sale takes place.
* Enable notifications for Disputas process.
* Select if your payments are processed in test mode or live.

To configure this information, click _**Configuración**_ y then select _**Configuración técnica**_.

![PrintScreen](/assets/IntegrationVariables_01.png)

In the Configuración técnica window, you can find two tab according to your needs: _**Payments**_ or _**Disputas**_.

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_01.png)

### Payments
In this tab, you can configure the following information.

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_02.png)

<div class="variables"></div>

| Parameter | Descripción |
|---|---|
| Your payments are processed | Select whether your transactions are processed _In Production_ or _In Test mode_. When processing _In Test mode_, the transactions done through your website or through payment requests, are marked as a test y the payment is not real. |
| Response URL | The page to which the buyer is direct once the transaction in PayU ends. This page displays the status of the transaction. |
| Confirmation URL | The page to which PayU sends the payment confirmation to your system. This is useful when you want to update stocks y database once the transaction reaches its final state.<br>This parameter is not mandatory. |
| Control duplicate payments | When enabling this option, We validate that each payment reference sent to our system is unique. Otherwise, you can send the same reference for all your sales. |
| Notifications of processed payments | This option lets you enable the send of an e-mail to the payer or to you when the payment was approved or rejected. |

### Disputas
In this tab, you can configure the following information of the [dispute]({{< ref "Disputes-MP.md" >}}) process.

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_03.png)

<div class="variables"></div>

| Parameter | Descripción |
|---|---|
| Notification e-mails | Set the e-mail addresses to be notified when a dispute process has been started. |
| Automatic notification URL | If you enable this option, you can set the URL to which PayU sends the notification of a dispute process. |

{{% alert title="Nota" color="info"%}}

To apply the changes you made, do not forget to click the _**Save changes**_ button.

{{% /alert %}} 