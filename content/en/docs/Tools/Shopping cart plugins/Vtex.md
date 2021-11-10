---
title: "VTEX"
linkTitle: "VTEX"
date: 2021-05-25T10:30:35-05:00
description:
  This article shows you the procedure to enable PayU on your VTEX website. 
weight: 5
tags: ["subtopic"]
---

VTEX is an enterprise digital commerce platform that allows you to create an online store with out-of-the-box capabilities fast. For more information, refer to official [VTEX webpage](https://vtex.com/).

## Prerequisites
* You need an active account in PayU Latam.
* You need an active account in PaymentsOS. If you don't have an account, click [here](https://control.paymentsos.com/signup) to create one.<br>All the commerces that require to integrate PayU with VTEX **must** have an account in PaymentsOS.
* You need an account with enough rights and permissions to access the VTEX admin. This account must have enabled the two-factor authentication.

## Configuration procedure
The procedure to enable payment methods in VTEX processed by our gateway is divided in two steps. Before moving on, make sure you have meet the prerequisites above.

### Configure your PaymentsOS account
The integration of PayU Latam with VTEX is performed using PaymentsOS as a middleware. As the first step, you need to configure in PaymentsOS your account the following objects.

* A Provider configuration.
* A Business unit.
* A WebHook.

You can configure these objects using one of the following options.

#### Configure the account using Postman
Follow these steps to configure your account using Postman.

1. Click the button below to import our collection in Postman (you may need to refresh the page if the button does not work for you).

{{< postman/postman_vtex >}}
<br>

2. After you run the collection, you need to set the globals. Download the globals file <a href="/static/assets/globals/VTEX%20Hub.postman_globals.json" download>here</a>.

3. In the Postman collection, click _**Import**_ next to your workspace name and locate the json file recently downloaded.

4. When finish, click _**Import**_.

5. It is mandatory to run the collection methods in the order displayed. First, click the `POST` method called `1. Login` and go to _**Body**_ tab.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_01.png)

6. Provide the _**email**_ and _**password**_ of your PaymentsOS account. Then, click _**Send**_.

7. If the login was successful, the authentication data is set for the second method.<br>Click the `GET` method `2. Retrieve PayU Latam ID`.

8. In the top right corner, click the eye icon and locate the `env` parameter. Then, click the pencil icon and set `test`if you are processing in the test environment and `live` otherwise.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_02.png)

9. Once configured, click _**Send**_.

10. Click the `POST` method `3. Create Provider Configuration`, this method creates the _**Provider Configuration**_ in PaymentsOS. Then, go to _**Body**_ tab. 

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_03.png)

Provide the following information:

| Parameter | Description |
|---|---|
| name | Provide a to the _**Provider Configuration**_. |
| description | Provide a meaningful description for the _**Provider Configuration**_.<br>This value is optional. |
| configuration_data.apiLogin | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| configuration_data.apiKey | Unique key of your commerce. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| configuration_data.accountId | ID of the PayU account according to the country where you want to sell. |
| configuration_data.merchantId | ID of your commerce in PayU Latam. |
| configuration_data.paymentCountry | Processing country in format ISO 3166 Alpha-3. |

{{% alert title="Note" color="info"%}}
The parameter `provider_id` is  automatically set by the response of the method `2. Retrieve PayU Latam ID`. Do not change this value.
{{% /alert %}}  

11. Click the `POST` method `4. Create Business Unit` this method creates the _**Business Unit**_ in PaymentsOS. Then, go to _**Body**_ tab. 

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_04.png)

Provide the following information:

| Parameter | Description |
|---|---|
| id | Identifier of the _**Business Unit**_. This id must be in lowercase and without blank spaces.<br>_Make sure you have provided the correct value for the id as this cannot be updated later_. |
| description | Provide a meaningful description for the _**Business Unit**_.<br>This value is optional. |

{{% alert title="Note" color="info"%}}
The parameter `default_processor` is  automatically set by the response of the method `3. Create Provider Configuration`. Do not change this value.
{{% /alert %}}  
 
12. Click the `POST` method `5. Create Webhook` this method creates the _**WebHook**_ in PaymentsOS. This WebHook is the confirmation URL that will receive the notifications sent by VTEX when a transaction changes its state.<br>Then, go to _**Body**_ tab.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_05.png)

Set the `endpoint` parameter with the following values according to your environment.
* Test: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Live: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

Leave the other parameters with their default value.

At this point, your PaymentsOS account has been configured as a middleware, the next step is the [configuration of the VTEX provider]({{< ref "#configure-the-vtex-provider" >}}).

#### Configure the account manually using PaymentsOS dashboard
Follow these steps to configure your account using PaymentsOS dashboard.

1. Create the Provider configuration.<br>
In the PaymentsOS dashboard, expand the _**Account**_ menu, then select _**Services**_.

![PrintScreen](/assets/VTEX/VTEX_01.png)

Use the _**Search**_ field in the _**Create a new Provider configuration**_ section and enter _PayU_ to find the _PayU Latam_ provider.

![PrintScreen](/assets/VTEX/VTEX_02.png)

Provide the following information for the _**Provider Configuration**_:

| Parameter | Description |
|---|---|
| Configuration Name | Provide a to the _**Provider Configuration**_. |
| Description | Provide a meaningful description for the _**Provider Configuration**_.<br>This value is optional. |
| apiLogin | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| apiKey| Unique key of your commerce. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| accountId | ID of the PayU account according to the country where you want to sell. |
| merchantId | ID of your commerce in PayU Latam. |
| paymentCountry | Processing country in format ISO 3166 Alpha-3. |

When finish, click _**Create**_.

![PrintScreen](/assets/VTEX/VTEX_03.png)

2. Create the Business Unit.<br>
Back in the PaymentsOS dashboard, expand the _**Account**_ menu, then select _**Business Units**_.

![PrintScreen](/assets/VTEX/VTEX_04.png)

Click the _**Create Business Unit**_ button and provide the following information:

| Parameter | Description |
|---|---|
| Business Unit Name | Name of the _**Business Unit**_. This name must be in lowercase and without blank spaces.<br>_Make sure you have provided the correct name as this cannot be updated later_. |
| description | Provide a meaningful description for the _**Business Unit**_.<br>This value is optional. |

In the _**Choose a default Provider for this Business Unit**_ section, select the _**Provider Configuration**_ created in the last step.<br>When finish, click _**Create**_.

![PrintScreen](/assets/VTEX/VTEX_05.png)

3. Create the Webhook. This WebHook is the confirmation URL that will receive the notifications sent by VTEX when a transaction changes its state.<br>

Back in the PaymentsOS dashboard, expand the _**Account**_ menu, then select _**Webhooks**_.

![PrintScreen](/assets/VTEX/VTEX_06.png)

Click the _**Create a Webhook Endpoint**_ button and provide the URL according to your environment:
* Test: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Live: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

In the _**Payment Events Alert**_ table, enable the _**Update**_ event for _**Authorization**_ and _**Charge**_. Furthermore, select in the _**Associated Business Units**_ combo the _**Business Unit**_ created in the last step.<br>When finish, click _**Create**_.

![PrintScreen](/assets/VTEX/VTEX_07.png)

At this point, your PaymentsOS account has been configured as a middleware, the next step is the [configuration of the VTEX provider]({{< ref "#configure-the-vtex-provider" >}}).

## Configure the VTEX provider
