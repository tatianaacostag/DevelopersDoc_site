---
title: "VTEX"
linkTitle: "VTEX"
date: 2021-05-25T10:30:35-05:00
description:
  This guide explains how to integrate PayU with your VTEX website. 
weight: 1
tags: ["subtopic"]
---

VTEX is an enterprise digital commerce platform that enables you to quickly create an online store with built-in capabilities. For more information, visit the official <a href="https://vtex.com" target="_blank">VTEX website</a>

## Prerequisites

Before integrating PayU with VTEX, ensure you have the following:

* An active <a href="https://developers.payulatam.com/latam/en/docs/getting-started/create-an-account.html" target="_blank">PayU Latam account</a>. 
* An active <a href="https://control.paymentsos.com/signup" target="_blank">PayU Enterprise (PaymentsOS) account</a> in production/live mode. For details on how to enable live mode, refer to [Activating Your PayU Enterprise Account](#activating-your-payu-enterprise-account-live-mode).
* A VTEX account with sufficient rights and permissions to access the VTEX administrative panel. This account must have two-factor authentication enabled.

## Availability by Country and Payment Methods

The table below outlines VTEX’s availability by country and the supported payment methods:

| Country | Credit Cards | Cash Payments | Other Methods |
|-|-|-|-|
| <img src="/assets/Argentina.png" width="20px"/> &nbsp;Argentina &nbsp; | Credit cards | Cash payments | - |
| <img src="/assets/Brasil.png" width="20px"/> &nbsp;Brazil | AMEX, MasterCard, Visa | Boleto Bancário | - |
| <img src="/assets/Colombia.png" width="20px"/> &nbsp;Colombia &nbsp; | AMEX, Codensa, Diners, MasterCard, Visa | Efecty, Su Red, bank reference | PSE |
| <img src="/assets/Chile.png" width="20px"/> &nbsp;Chile | Credit cards | Cash payments | - |
| <img src="/assets/Mexico.png" width="20px"/> &nbsp;Mexico | Credit cards | Cash payments | SPEI |
| <img src="/assets/Peru.png" width="20px"/> &nbsp;Peru | AMEX, MasterCard, Visa | - | - |

## Activating Your PayU Enterprise Account (Live Mode)

By default, new accounts are set to test mode. To enable live transactions, contact your account manager and submit a request with the following details:

* **Merchant ID:** Locate your LATAM account’s Merchant ID in the <a href="https://developers.payulatam.com/latam/en/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html#merchant-and-account-ids" target="_blank">PayU Management Panel</a>.
* **Account ID:** Find your Account ID in the PayU Enterprise control panel by clicking your username in the upper-right corner.
<br>

![PrintScreen](/assets/VTEX/vtex01.png)

## Configuring Your PayU Enterprise Account

To configure payment methods in VTEX for processing through our gateway, follow the steps below. The configuration consists of two stages. Before proceeding, ensure that you have met the prerequisites listed above.

### 1. Initial Setup

PayU Enterprise operates through PaymentsOS, which acts as middleware between PayU Latam and VTEX. The first step is to configure the following components within your PayU Enterprise account:

* Provider configuration
* Business unit
* Webhook

You can configure these components using one of the following methods:
* [Configuring the account using Postman]({{< ref "#configuring-the-account-using-postman" >}}).
* [Configuring the account manually using PayU Enterprise dashboard]({{< ref "#configuring-the-account-manually-using-payu-enterprise-dashboard" >}}).

#### Configuring the Account Using Postman

Follow these steps to configure your account using Postman:

1. Click the button below to import our Postman collection (refresh the page if the button does not work).

{{< postman/postman_vtex2024 >}}
<br>

2. After importing the collection, set the global variables. Download the globals file <a href="/assets/globals/VTEX Hub.postman_globals.json" download>here</a>.

3. In Postman, click **Import** next to your workspace name and select the downloaded JSON file.

4. Click **Import** to finalize the process.

5. Run the collection methods in the displayed order. First, select the `POST` method called `1. Login`, then navigate to the **Body** tab.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_01.png)

6. Enter the email and password for your PayU Enterprise account, then click **Send**. If the login is successful, the authentication data will be set for the next method.

7. Click the `GET` method `2. Retrieve PayU Latam ID`.

8. In the top-right corner, click the eye icon to locate the `env` parameter. Click the pencil icon and set it to `test` for the test environment or `live` for production.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_02.png)

9. Click **Send** to proceed.

10. Next, configure a _provider_, which stores your payment-processing credentials. Select the `POST` method `3. Create Provider Configuration` and navigate to the **Body** tab. 

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_03.png)

Fill in the following details:

| Parameter | Description |
|---|---|
| name | Enter a name for the provider configuration. |
| description | Provide an optional description. |
| configuration_data.apiLogin | Username or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| configuration_data.apiKey | Unique key of your commerce. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| configuration_data.accountId | PayU account ID based on your operating country. |
| configuration_data.merchantId | Your commerce ID in PayU Latam. |
| configuration_data.paymentCountry | Processing country in ISO 3166 Alpha-3 format. |
| configuration_data.partnerID | PayU identifier. Enter `ZOOZ_VTEX_V2`. |
| configuration_data.cashRedirect | Set to `true` to ensure proper order flow with cash payments in VTEX. |

{{% alert title="Note" color="info"%}}

The `provider_id` parameter is automatically assigned by the response from method `2. Retrieve PayU Latam ID`. Do not modify this value.

{{% /alert %}}  

11. Configure a _business unit_, which links the provider configuration with PayU Enterprise API credentials for processing transactions. Select the `POST` method `4. Create Business Unit`, then navigate to the **Body** tab. 

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_04.png)

Fill in the following details:

| Parameter | Description |
|---|---|
| id | Identifier of the business unit (lowercase, no spaces). **This value cannot be changed later, so ensure accuracy.** |
| description | Optional description. |

{{% alert title="Note" color="info"%}}

 The `default_processor` parameter is automatically assigned by the response from method `3. Create Provider Configuration`. Do not modify this value.

{{% /alert %}}  
 
12. Create the webhook, which receives notifications from VTEX when a transaction changes status. Select the `POST` method `5. Create Webhook`, then navigating to the **Body** tab.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_05.png)

Set the `endpoint` parameter based on your environment:
* Test: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Live: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

Leave all other parameters at their default values.

At this point, your PayU Enterprise account using PaymentsOS is configured. The next step is [Configuring the VTEX Provider]({{< ref "#2-configuring-the-vtex-provider" >}}).

#### Configuring the Account Using PayU Enterprise Dashboard

Follow these steps to configure your account using PayU Enterprise dashboard.

1. **Create the Provider Configuration**

A _provider_ stores your payment-processing credentials. Follow these steps to configure one:

<span style="color: #A6C307; font-weight: bold;">1.1</span> In the PayU Enterprise dashboard, navigate to **Configurations** > **Providers**.

![PrintScreen](/assets/VTEX/vtex02.png)

<span style="color: #A6C307; font-weight: bold;">1.2</span> Click the module corresponding to the country or division you are configuring.

<span style="color: #A6C307; font-weight: bold;">1.3</span> Complete the following fields:

| Field | Description |
|---|---|
| Configuration Name | Enter a name for the provider configuration. |
| Description | Provide an optional description. |
| apiLogin | Username or login provided by PayU. [Get API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| apiKey | Unique key of your commerce. [Get API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| accountId | PayU account ID based on your operating country. |
| merchantId | Your commerce ID in PayU Latam. |
| paymentCountry | The processing country in ISO 3166 Alpha-3 format. |
| cashRedirect | Select `true` to ensure the correct order flow for cash payments in VTEX.<br> **Note:** This configuration is essential for merchants processing cash payments with VTEX. |

<span style="color: #A6C307; font-weight: bold;">1.4</span> Click **Create**.

<img src="/assets/VTEX/vtex03.png" alt="PrintScreen" style="width: 450px; height: auto;">
<br>

2. **Create the Business Unit**

A _business unit_ links the provider configuration with PayU Enterprise API credentials for processing transactions. Follow these steps:

<span style="color: #A6C307; font-weight: bold;">2.1</span> In the dashboard, go to **Configurations** > **Business Units**.

<img src="/assets/VTEX/vtex04.png" alt="PrintScreen" style="width: 400px; height: auto;">
<br>

<span style="color: #A6C307; font-weight: bold;">2.2</span> Click **Create Business Unit** and enter:
<br>

| Field | Description |
|---|---|
| Business Unit Name | Must be lowercase and contain no spaces. **This value cannot be changed later, so ensure accuracy.** |
| Description | Optional description. |

<span style="color: #A6C307; font-weight: bold;">2.3</span>  In the **Choose a Default Provider for This Business Unit** section, select the **Provider Configuration** created in Step 1. Once done, click **Create**.

<img src="/assets/VTEX/vtex05.png" alt="PrintScreen" style="width: 700px; height: auto;">
<br>

3. **Create the Webhook**

The webhook receives notifications from VTEX when a transaction changes status. Follow these steps:

<span style="color: #A6C307; font-weight: bold;">3.1</span> In the dashboard, navigate to **Configurations** > **Webhooks**.

<img src="/assets/VTEX/vtex06.png" alt="PrintScreen" style="width: 400px; height: auto;">
<br>

<span style="color: #A6C307; font-weight: bold;">3.2</span> Click **Create a Webhook Endpoint** and enter the appropriate URL based on your environment:

* Test: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Live: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

<span style="color: #A6C307; font-weight: bold;">3.3</span> In the **Payment Event Alerts** table, enable the **Update** slider for **Authorization** and **Charge**. Then, in the **Associated Business Units** field, enter the **Business Unit** created in the previous step. Finally, click **Create**.

<img src="/assets/VTEX/vtex07.png" alt="PrintScreen" style="width: 600px; height: auto;">
<br>

At this point, your PayU Enterprise account using PaymentsOS is fully configured. The next step is [configuring the VTEX provider]({{< ref "#2-configuring-the-vtex-provider" >}}).

### 2. Configuring the VTEX Provider

Once you have configured your PayU Enterprise account, the next step is to configure the VTEX provider for each payment method. To proceed, you must have a valid user account to access the VTEX admin.

#### Creating a New Provider

{{% alert title="Note" color="info"%}}

Before creating the new provider, make sure you have configured fingerprint for PayU. To do so, refer to this [guide](https://help.vtex.com/en/tutorial/configurar-fingerprint-para-payu).

{{% /alert %}}

1. Log in to the VTEX administration panel and go to **Store Settings > Providers > New Provider**:

![PrintScreen](/assets/VTEX/vtex08.png)

2. Locate **PayU**, and select **PayUv2**:

![PrintScreen](/assets/VTEX/vtex09.png)

{{% alert title="Important" color="warning"%}}

Ensure you select the **PayUv2** connector, as this guide applies specifically to this version.

{{% /alert %}}  

3. In the connector configuration, install the connector by clicking the **Install app** button. Then, complete the following fields:

![PrintScreen](/assets/VTEX/vtex10.png)

{{% alert title="Note" color="info"%}}

Connector information can be obtained from either:
* **Postman collection:** Run the **Retrieve Authentication Keys** method, setting the global parameter `env` to `test` or `live`, depending on your processing environment.
* **PayU Enterprise dashboard:** Navigate to **Account > Business Units**, and select the Business Unit created in [Configuring Your PayU Enterprise Account]({{< ref "#configuring-your-payu-enterprise-account" >}}). Use the selector at the top to choose the processing environment.<br>Some values are hidden by default; click the eye icon to reveal them.

{{% /alert %}} 

| Field | Description |
|---|---|
| Affiliation name | The name used to identify the **Gateway affiliation**. |
| Environment selector | Select the environment for processing transactions.<br>Ensure that all parameters match the selected environment in PayU Enterprise. |
| Application Key | App ID of the **Business Unit**. |
| Application Token | Private API Key of the **Business Unit**. |
| Payment capture | Choose how to settle (charge) payments:<br><ul style="margin-bottom: initial;"><li>For a one-step flow, select `Automatic capture immediately after payment authorization`.</li><li>For a two-step flow, select `Deactivated: Not automatically captured` to settle payments upon invoicing.</li><li>To schedule automatic capture, select `Scheduled: Schedules the automatic capture`, and define a capture timeframe in hours.</li></ul><br>For more details, refer to [Custom Auto Capture Feature](https://developers.vtex.com/vtex-rest-api/docs/custom-auto-capture-feature).<br>The default auto-capture timeframe is seven (7) days after approval. |
| Scheduled time frame in hours for automatic capture | Available when `Scheduled: Schedules the automatic capture` is selected. Define the automatic capture timeframe (integer values only; no decimals allowed). |
| Tipo Autorizacion | Choose between one-step and two-step payment flows:<br><ul style="margin-bottom: initial;"><li>For a one-step flow, select `Autorización y Captura`.</li><li>For a two-step flow, select `Pre-Autorización`.</li></ul><br>Refer to [Payment flows]({{< ref "payments.md#payment-flows" >}}) for more information. |
| Public Key | Public API Key of the **Business Unit**. |
| Idioma | Select the language for order issuance. Supported languages:<br><ul style="margin-bottom: initial;"><li>Spanish</li><li>English</li><li>Portuguese</li></ul> |
| Expiración pago (días) | Defines the validity period for cash payments.<br>**Important:** This value must match the **Promissory note validity** field in the [Configure cash payment methods]({{< ref "#configuring-cash-payment-methods" >}}) section. |
| Enable payout split and send payment recipients? | Select `No`. |

4. Click **Save** to complete the setup.

#### Configuring Payment Methods

Configure the payment methods that will be displayed on the website during checkout. [View the available payment methods]({{< ref "Select-your-payment-method.md" >}}).

{{% alert title="Important" color="warning"%}}

* PIX is not available for Brazil when using VTEX.
* Changes to payment conditions may take up to 10 minutes to reflect in the checkout flow.

{{% /alert %}}

##### Configuring Credit or Debit Cards

Depending on your [processing country]({{< ref "Select-your-payment-method.md" >}}), you can configure the affiliation you created to use credit or debit cards<sup>*</sup>. Follow the steps below to add this payment method to your VTEX store.

<sup>*</sup> _The availability of debit cards depends on your processing country._

{{% alert title="Important" color="warning"%}}

Click [here](#configuring-co-branded-or-private-label-cards) to learn how to configure Co-branded or Private Label cards. 

{{% /alert %}}

1. Log in to the VTEX administration panel and go to **Transactions > Payments > Settings**. 

2. Select the **Payment Conditions** tab and click the plus icon.

![PrintScreen](/assets/VTEX/vtex11.png)

3. Select the payment method you want to add. Payment methods are grouped by type.<br>For this example, we select **American Express** under the **Credit Card** section.

![PrintScreen](/assets/VTEX/vtex12.png)

4. Provide the following details:
* **Rule Name (to help you quickly identify)**: Enter a descriptive name for the payment condition.
* **Status**: Set the payment condition's status. You can have **only one** active payment condition per payment method.
* **Process with affiliation**: Select the previously configured gateway affiliation.
* **Prepaid in full or in installments?**: Select **Prepaid in full**.

![PrintScreen](/assets/VTEX/vtex13.png)

5. Click **Save**. The new payment condition will now be listed in the **Payment Conditions** tab.

![PrintScreen](/assets/VTEX/vtex14.png)

##### Configuring Co-Branded or Private Label Cards

Co-branded and private label cards are credit cards issued by a store or brand, sometimes in partnership with networks like AMEX, VISA, or MasterCard. Follow these steps to add this payment method to your VTEX store.

1. Log in to the VTEX administration panel and go to **Transactions > Payments > Settings**. 

2. Select the **Custom Payments** tab.

![PrintScreen](/assets/VTEX/vtex15.png)

3. The **Custom Payments** tab provides five (5) slots for configuring co-branded and private label cards. In this example, we configure the Colombian card Codensa, which is a private label card.<br>Click any available box in the **Private Labels** section.

![PrintScreen](/assets/VTEX/vtex16.png)

4. Enter the following card details, maintaining the exact formatting:

* **Name**: `Codensa`.
* **Description**: `Codensa`
* **BIN ranges**: `590712-590712`
* **Acquirer payment code**: `codensa`

{{% alert title="Note" color="info"%}}

 For _co-branded_ cards, you must also select the card brand.

{{% /alert %}}

<img src="/assets/VTEX/vtex17.png" alt="PrintScreen" width="700px"/><br>

 Use the table below to configure co-branded and private label cards, you can leave the remaining values with their default input.

| Country | Name | Description | BIN ranges | Acquirer payment code |
|:-:|---|---|---|---|
| <img src="/assets/Argentina.png" width="25px"/> | Argencard | Argencard | `501105-532362` | argencard |
| <img src="/assets/Argentina.png" width="25px"/> | Cabal | Cabal | `60423,60400,589657` | cabal |
| <img src="/assets/Argentina.png" width="25px"/> | Cencosud | Cencosud | `603493-603493` | cencosud |
| <img src="/assets/Argentina.png" width="25px"/> | Naranja | Naranja | `589562` | naranja |
| <img src="/assets/Argentina.png" width="25px"/> | Shopping | Shopping | `603488` | shopping |
| <img src="/assets/Colombia.png" width="25px"/> | Codensa | Codensa | `590712-590712` | codensa |

For more details on configuring [co-branded](https://help.vtex.com/en/tutorial/configurar-pagamentos-com-cartoes-de-loja-cobranded--jrkLK41IjuquUmyKUi86Q) and [private label](https://help.vtex.com/en/tutorial/configurar-pagamentos-com-cartoes-de-loja-bandeira-propria--428FgVdSGQUeAOoogkaIw4) cards, visit the VTEX Help Center.

5. Click **Save**. After creating the custom payment, you will be redirected to the option for creating a **Payment Condition**. Follow the instructions in the [Configuring Credit or Debit Cards](#configuring-credit-or-debit-cards) section to complete this step.

<!--

##### Configuring Google Pay

Google Pay is a digital wallet that enables customers to complete transactions quickly and securely using cards saved in their Google accounts. Integrating Google Pay into your VTEX store via PayU helps enhance the shopping experience, reduce checkout friction, and boost conversion rates.

{{% alert title="Note" color="info"%}}

When customers pay using Google Pay, PayU processes the transaction as a standard credit or debit card payment, depending on the card type. No additional fees apply beyond those already agreed upon.

{{% /alert %}}

**Prerequisites:**

* Ensure Google Pay is active in your PayU account. Contact your PayU account executive or email [tecnico.co@payu.com](mailto:tecnico.co@payu.com) if you have questions about this requirement, mentioning that you are a VTEX merchant requesting Google Pay.
* Card payments must be enabled in your VTEX configuration.
* PayU must be configured as the payment provider for your credit card transactions in your VTEX store.

**Step by Step:**

1. Log in to the VTEX administration panel and go to **Store Settings > Digital Wallets**.

2. Find the Google Pay option and toggle the slider to enable it.

3. When prompted, confirm the activation by clicking **Activate**.

<video width="640" height="480" controls>

<source src="/assets/VTEX/Videos/video02.mp4" >  

</video>

<p>

Once activated, Google Pay will be available as a payment option at your store’s checkout. It may take up to 10 minutes for the payment method to appear.

For more information and best practices, refer to VTEX’s official guide on enabling digital wallets on the  <a href="https://help.vtex.com/en/tracks/digital-wallet-e-wallet" target="_blank">VTEX Help Center</a>.

-->

##### Configuring Cash Payment Methods

Since cash payments require customers to pay at physical locations, you can configure this payment method in VTEX as promissory notes (Notes Payables). 

{{% alert title="Note" color="info"%}}

For _Boleto Bancário_ in Brazil, this procedure is not required. Simply locate and configure this payment method as a payment condition.

{{% /alert %}}

When you configure a cash payment method, customers are redirected to PayU's checkout, where they can download the payment voucher and pay it at the corresponding physical location. Follow the instructions below to add this payment method to your VTEX shop.

**Step by Step:**

1. Log in to the VTEX administration panel and go to **Transactions > Payments > Settings**. 

2. Select the **Custom Payments** tab.

![PrintScreen](/assets/VTEX/vtex15.png)

3. In this tab, you have five (5) available slots to configure cash payment methods. In this example, we will set up OXXO, a Mexican cash payment method.<br>Click any available box in the **Notes Payables** section.

![PrintScreen](/assets/VTEX/vtex18.png)

4. Provide the following information:

* **Name**: Use the value listed [here]({{< ref "select-your-payment-method.html" >}}) in the `paymentMethod parameter` column. For this example, enter `OXXO`.
   * **Description**: Enter a description to display when the customer selects this payment method (optional).
   * **Notes Payable Expiration Date**: Specify the number of days before the cash payment expires. The default is 7 days. Ensure this value matches the **Payment Expiration (days)** setting configured in the VTEX affiliation to prevent processing issues.

Leave the remaining fields with their default values. 

5. Click **Save**. Once the custom payment is created, you will be redirected to set up a new **Payment Condition**. Follow the instructions in the [Configuring Credit or Debit Cards](#configuring-credit-or-debit-cards) section.

##### Configuring PSE

**Prerequisites:**
*	This payment method is only available for merchants processing in Colombia.
* To offer PSE as a payment method, you must install the **PSE App developed by VTEX**. If you haven't done so, go to **Account Settings > Applications > App Store** and search for **Banks for PSE**. <br>If the app is unavailable in the store, you can request its installation from the VTEX team by submitting a ticket at [VTEX Support](https://help.vtex.com/en/support).
* If you are using a VTEX Legacy integration, VTEX must perform an additional configuration before you can set up this payment method. Contact your VTEX representative or request assistance via [VTEX Support](https://help.vtex.com/en/support).

{{% alert title="Note" color="info"%}} 

For additional information, refer to the following VTEX resources:
- [PSE General Information](https://help.vtex.com/en/announcements/pse-medio-de-pago-para-clientes-en-colombia--4T22CHOcEV3Nb2RtkJZOFB)
- [Setting Up PSE Payments in VTEX](https://help.vtex.com/en/tutorial/configurar-pago-con-pse--7dRChubn7TqdEyWrHQEQp6)
- [Banks for PSE App](https://apps.vtex.com/vtexlatam-banks-for-pse/p)  

{{% /alert %}}

**Step by Step:**

1. Log in to the VTEX administration panel and go to **Store Settings > Payments > Settings > Payment Conditions**. Then, follow these steps:

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.1</span> Click the **+** button.

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.2</span> Under the **Other** category, locate **PSE**.

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.3</span> Complete the following fields:

&nbsp;&nbsp;&nbsp; <span style="color: #A6C307; font-weight: bold;">•</span> **Rule Name**: Enter a descriptive name to identify this payment method. <br>
&nbsp;&nbsp;&nbsp; <span style="color: #A6C307; font-weight: bold;">•</span> **Process with Affiliation**: Select the gateway affiliation configured to process payments with PayUV2. <br>
&nbsp;&nbsp;&nbsp; <span style="color: #A6C307; font-weight: bold;">•</span> **Status**: Activate the payment condition.

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.4</span> Click **Save** to apply the settings.

   <video width="630" height="300" controls>
      <source src="/assets/VTEX/Videos/Video01.mp4" type="video/mp4">  
   </video>

<p>

2. Configure the Banks for PSE app with your PayU credentials by following these steps:

&nbsp; <span style="color: #A6C307; font-weight: bold;">2.1</span> Log in to the VTEX administration panel and go to **Apps > Installed Apps > Banks for PSE**.

&nbsp; <span style="color: #A6C307; font-weight: bold;">2.2</span> Complete the form and click **Save**.

| Field | Description |
|---|---|
| **Connector Used to Process the PSE** | Select **PayUv2** from the dropdown list. |
| **Application Code** | Enter the **Business Unit** Private API Key. This information is available in the PayU Enterprise Control Panel, as explained [here](https://developers.payulatam.com/latam/en/docs/tools/shopping-cart-plugins/vtex.html#configure-the-gateway-affiliation). <br> **Note:** This field corresponds to the _Application Token_ of the VTEX affiliation. |
| **Application Key** | Enter the ID of the **Business Unit Application**. This information is available in the PayU Enterprise Control Panel, as explained [here](https://developers.payulatam.com/latam/en/docs/tools/shopping-cart-plugins/vtex.html#configure-the-gateway-affiliation). <br> **Note:** This field corresponds to the _Application Key_ of the VTEX affiliation. |

<img src="/assets/VTEX/vtex19.png" alt="PrintScreen" width="500px"/><br>

* Once the configuration is complete, you can process transactions in a production environment with PSE.

{{% alert title="Important" color="warning"%}}

To test PSE in a sandbox environment, ensure that your VTEX affiliation is in test mode and that you have an additional VTEX configuration specific to PSE. For further guidance, contact your implementation agency or [VTEX Support](https://help.vtex.com/en/support). 

{{% /alert %}}

## Testing the Integration

Once you have configured the payment conditions for your payment methods, it is strongly recommended to test your integration before processing real transactions.

### Prerequisites for Successful Testing:

* Ensure your PayU Enterprise account is in `TEST` mode.
* Verify that the **Environment Selector** in your **VTEX Gateway Affiliation** is set to `TEST` mode.
* Use the appropriate test credentials when setting up the **VTEX Gateway Affiliation**. You can find the test credentials [here](https://developers.payulatam.com/latam/en/docs/getting-started/test-your-solution.html).
* After completing your tests, update the configuration with production information, including your PayU Enterprise account, environment selector in VTEX affiliation, and credentials.

### Steps to Perform a Test Transaction

1. Log in to the VTEX administration panel and click **VISIT STORE** in the top menu.

   ![PrintScreen](/assets/VTEX/vtex20.png)

2. The store configured for your VTEX account opens. Select any product and proceed to purchase.

   ![PrintScreen](/assets/VTEX/vtex21.png)

3. In the shopping cart, click the **Place Order** button.

   ![PrintScreen](/assets/VTEX/vtex22.png)

4. In the payment section, the available payment methods appear grouped by type. Select the one you want to test and enter the test data. You can find test card numbers and relevant information [here]({{< ref "Test-your-solution.md#test-cards" >}}).  
   Finally, click **Complete Purchase**.

   ![PrintScreen](/assets/VTEX/vtex23.png)

### Verifying the Transaction

Once the purchase is approved, you can verify the transaction in the following locations:

* **VTEX Admin**: Navigate to **Payments > Transactions**.

   ![PrintScreen](/assets/VTEX/vtex24.png)

* **PayU Enterprise Dashboard**: Go to **Payments > Search**.

   ![PrintScreen](/assets/VTEX/vtex25.png)  
   
   {{% alert title="Note" color="info"%}}

   The parameter **External Transaction ID** within **Transaction Activity** corresponds to the Order ID in PayU.

   {{%/ alert %}}

* **PayU Management Panel**: Check the transaction in the [**Sales Report**]({{< ref "Sales-report.md" >}}) module.

   ![PrintScreen](/assets/VTEX/vtex26.png)

* **[Queries API]({{< ref "Queries.md" >}})**: Use the **External Transaction ID** as the `OrderID` parameter.

## Testing Two-Step Flows

If your **Gateway Affiliation** is configured to process transactions using a two-step flow, the funds authorized on the credit card are not settled until you explicitly request the settlement. To complete the settlement, you must invoice the order.

### Steps to Invoice an Order

1. Locate the transaction in **VTEX Admin** under **Payments > Transactions**, and click on it.  
   Then, click the **Order** button at the top right corner.

   ![PrintScreen](/assets/VTEX/vtex27.png)

2. Scroll down to the **Package** section and click **Invoice Package**.

   ![PrintScreen](/assets/VTEX/vtex28.png)

3. Enter the invoice details and click **Send Invoice**.  
   Once the invoice is sent to the customer, the authorized amount is charged from the customer's card.

   ![PrintScreen](/assets/VTEX/vtex29.png)

{{% alert title="Note" color="info"%}}

An authorized order can be canceled using the **Cancel Order** button in the order details.  
When an order is canceled, PayU sends a _void_ transaction, which is recorded in both PayU Enterprise and PayU Latam.

{{% /alert %}}
