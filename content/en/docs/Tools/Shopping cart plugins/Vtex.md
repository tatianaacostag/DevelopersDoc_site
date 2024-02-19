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
* You need an active account in PaymentsOS. If you don't have an account, click [here](https://control.paymentsos.com/signup) to create one.<br>All the merchants that require to integrate PayU with VTEX **must** have a PaymentsOS account in productive/live mode.
* You require a VTEX account with sufficient rights and permissions to access the VTEX administrative panel. This account must have two-factor authentication enabled.

{{% alert title="Note" color="info"%}}
After the account is created, it will be set to test mode by default. To activate the account in productive/live mode, you must submit a request by contacting your account manager.

Please ensure that your request includes the following information: 
* Merchant ID of your LATAM account (refer to this [link](https://developers.payulatam.com/latam/en/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html#merchant-and-account-ids) for its location).
* PaymentsOS accountID,  which you can find in the PaymentsOS control panel, as follows:

![PrintScreen](/assets/VTEX/VTEX_30.png)
{{% /alert %}}

## Configuration procedure
To configure the payment methods in VTEX that our gateway processes, follow the steps below, which include 2 stages. Before proceeding, ensure you have met the prerequisites mentioned above.

### 1. Configure your PaymentsOS account
Integration of PayU Latam with VTEX occurs via PaymentsOS as a middleware. The initial step involves configuring the following items within PaymentsOS for your account:

* Provider configuration.
* Business unit.
* WebHook.

You can configure the items using one of the following options:
* [Configure the account using Postman]({{< ref "#configure-the-account-using-postman" >}}).
* [Configure the account manually using PaymentsOS dashboard]({{< ref "#configure-the-account-manually-using-paymentsos-dashboard" >}}).

#### Configure the account using Postman
Follow these steps to configure your account using Postman:

1. Click the button below to import our collection in Postman (you may need to refresh the page if the button does not work).

{{< postman/postman_vtex2024 >}}
<br>

2. After you run the collection, you need to set the globals. Download the globals file <a href="/assets/globals/VTEX Hub.postman_globals.json" download>here</a>.

3. In the Postman collection, click _**Import**_ next to your workspace name and locate the json file recently downloaded.

4. When finish, click _**Import**_.

5. It is mandatory to run the collection methods in the order displayed. First, click the `POST` method called `1. Login` and go to _**Body**_ tab.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_01.png)

6. Provide the _**email**_ and _**password**_ of your PaymentsOS account. Then, click _**Send**_.

7. If the login was successful, the authentication data is set for the second method.<br>Click the `GET` method `2. Retrieve PayU Latam ID`.

8. In the top right corner, click the eye icon and locate the `env` parameter. Then, click the pencil icon and set `test` if you are processing in the test environment and `live` otherwise.

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
| configuration_data.partnerID | PayU identifier. Enter `ZOOZ_VTEX_V2` as the value. |
| configuration_data.cashRedirect | Send `True` to ensure proper order flow with cash payment methods in VTEX. <br> **Note:** This configuration is important for all merchants that process cash payments with VTEX. |

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

At this point, your PaymentsOS account has been configured as a middleware, the next step is the [configuration of the VTEX provider]({{< ref "#2-configure-the-vtex-provider" >}}).

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
| Configuration Name | Provide a name to the _**Provider Configuration**_. |
| Description | Provide a meaningful description for the _**Provider Configuration**_.<br>This value is optional. |
| apiLogin | User or login provided by PayU. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| apiKey| Unique key of your commerce. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| accountId | ID of the PayU account according to the country where you want to sell. |
| merchantId | ID of your commerce in PayU Latam. |
| paymentCountry | Processing country in format ISO 3166 Alpha-3. |
| cashRedirect | Select `True` to ensure the correct order flow with cash payment methods in VTEX. <br> **Note:** This configuration is important for all merchants that process cash payments with VTEX. |

Once done, click _**Create**_.

![PrintScreen](/assets/VTEX/VTEX34EN.png)

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

At this point, your PaymentsOS account has been configured as a middleware, the next step is the [configuration of the VTEX provider]({{< ref "#2-configure-the-vtex-provider" >}}).

### 2. Configure the VTEX provider
Once you have configured your PaymentsOS account, the next step is the configuration of the VTEX provider per each payment method. For this step, it is mandatory that you have a valid user to access the VTEX admin.

#### Configure the Gateway affiliation
Before configuring the _**Gateway affiliation**_, make sure you have configured FingerPrint for PayU. To do so, refer to this [article](https://help.vtex.com/en/tutorial/configurar-fingerprint-para-payu).

1. In the VTEX admin, expand the _**Payments**_ menu inside _**Transactions**_ group. Then, select _**Settings**_.

![PrintScreen](/assets/VTEX/VTEX_08.png)

2. Before configuring Payment conditions, you must create an affiliation to our gateway. In the top panel, click _**Gateway affiliations**_.

![PrintScreen](/assets/VTEX/VTEX_09.png)

3. Click the plus icon. Scroll down to _**OTHERS**_ section and locate the _**PayUv2**_ connector.

![PrintScreen](/assets/VTEX/VTEX_10.png)

{{% alert title="Important" color="warning"%}}
Make sure you have selected the _**PayUv2**_ connector, the procedure explained in this guide applies specifically to this connector.
{{% /alert %}}  

4. In the connector configuration, you must install the connector by clicking the _**Install app**_ button. Then, provide the following information for the connector.

![PrintScreen](/assets/VTEX/VTEX33ES.png)

{{% alert title="Note" color="info"%}}
The information of the connector can be obtained either:
* Using the Postman collection.<br>Run the **Retrieve Authentication Keys** method setting the global parameter `env` as `test` or `live` according to your processing environment.
* Using the PaymentsOS dashboard.<br>Go to _**Account**_ > _**Business Units**_ and select the Business unit you create in the [previous]({{< ref "#1-configure-your-paymentsos-account" >}}) step. Recall that you must use the select at the top to choose the processing environment.<br>Some values are hidden by default, click the eye icon to display them.
{{% /alert %}} 

| Field | Description |
|---|---|
| Affiliation name | Name you want to set to identify the _**Gateway affiliation**_. |
| Environment selector | Choose the environment where you want to create the transactions.<br>According to the selection you make here, you must provide the other parameters selecting the same environment in PaymentsOS. |
| Application Key | App ID of the _**Business Unit**_. |
| Application Token | Private API Key of the _**Business Unit**_. |
| Payment capture | Select how you want to perform the settlement (charge) in your affiliation.<br><ul style="margin-bottom: initial;"><li>For one-step flow, select `Automatic capture immediately after payment authorization`.</li><li>For two-step flow, select `Deactivated: Not automatically captured` to execute the settlement once you invoice the order.</li><li>Select `Scheduled: Schedules the automatic capture` to configure a time in hours to automatically capture the order.</li></ul><br>For more information about this parameter, refer to [Custom Auto Capture Feature](https://developers.vtex.com/vtex-rest-api/docs/custom-auto-capture-feature) in the developers documentation.<br>The default value for this option is seven (7) days after the approval. |
| Scheduled time frame in hours for automatic capture | This field appears when selecting `Scheduled: Schedules the automatic capture` as the Payment capture method; select the automatic capture time frame you want to configure according to your own configuration. This value must be integer, thus, no decimals are permitted. |
| Tipo Autorizacion | Choose if your payment transactions are executed in using one-step or two-step flow.<br><ul style="margin-bottom: initial;"><li>For one-step flow, select `Autorizacion y Captura`.</li><li>For two-step flow, select `Pre-Autorizacion`.</li></ul><br>Refer to the following [link]({{< ref "payments.md#payment-flows" >}}) to learn more about the Payment flows. |
| Public Key | Public API Key of the _**Business Unit**_. |
| Idioma | Select the language in which you want the system to issue the orders, the supported languages are:<br><ul style="margin-bottom: initial;"><li>Spanish</li><li>English</li><li>Portuguese</li></ul> |
| Expiración pago (días) | Refers to the number of days you wish to customize for cash payments. <br> **Important:** This value must match the value configured in the payment method in the  _**Promissory note validity**_ field explained in the [Configure cash payment methods]({{< ref "#configure-cash-payment-methods" >}}) section of this documentation. |
| Enable payout split and send payment recipients? | Select `No` for this field. |

Once done, click _**Save**_.

#### Configure Payment methods
Configure the payment methods to be displayed on the website for checkout. [Consult our available Payment methods]({{< ref "Select-your-payment-method.md" >}}).

{{% alert title="Important" color="warning"%}}
* PIX is not available for Brazil using VTEX.
* Changes to payment conditions can take up to 10 minutes to apply to the checkout flow.
{{% /alert %}}

##### Configure credit or debit cards.
According to your [processing country]({{< ref "Select-your-payment-method.md" >}}), you can configure the affiliation you create to use credit or debit cards<sup>*</sup>. Follow the instructions below to add this payment method to your VTEX shop.

<sup>*</sup> _Debit cards usage depends on your processing country._

{{% alert title="Important" color="warning"%}}
Click [here](#configure-co-branded-or-private-labels-cards) if you want to know how to configure Co-branded or Private labels cards 
{{% /alert %}}

1. In the Settings option (_**Transactions**_ > _**Payments**_ > _**Settings**_), select the _**Payment conditions**_ tab and click the plus icon.

![PrintScreen](/assets/VTEX/VTEX_12.png)

2. Select the Payment method you want to include. Payments methods are grouped by their type.<br>For the sake of our example, we select _**American Express**_ in the Credit Card section.

![PrintScreen](/assets/VTEX/VTEX_13.png)

3. Provide the following information.
* **Rule Name (to help you quickly identify)**: provide a meaningful name for the payment condition next to the payment method you selected.
* **Status**: set the status of the payment condition. You can only have **one** active payment condition per payment method.
* **Process with affiliation**: select the gateway affiliation configured before.
* **Prepaid in full or in installments?**: select _**Prepaid in full**_<sup>\*</sup>.

![PrintScreen](/assets/VTEX/VTEX_14.png)

4. Click _**Save**_. When the payment condition has been created, it is listed in the _**Payment conditions**_ tab.

![PrintScreen](/assets/VTEX/VTEX_15.png)

##### Configure Co-branded or Private labels cards.
Co-branded and Private label cards are credit cards issued by an store or brand which can be issued in partnership with a network such as AMEX, VISA, MasterCard, etc. Follow the instructions below to add this payment method to your VTEX shop.

1. In the Settings option (_**Transactions**_ > _**Payments**_ > _**Settings**_), go to _**Custom payments**_ tab.

![PrintScreen](/assets/VTEX/VTEX_26.png)

2. In this tab, you have five (5) available space to configure both Co-branded and Private label cards. In this example, we will set up the Colombian card Codensa which is a Private label card.<br>Click in any of the available boxes in the _**Private labels**_ section.

![PrintScreen](/assets/VTEX/VTEX_27.png)

3. Provide the following data of the card using the case displayed.

* **Name**: `Codensa`.
* **Description**: `Codensa`
* **BIN ranges**: `590712-590712`
* **Acquirer payment code**: `codensa`

{{% alert title="Note" color="info"%}}
For _Co-branded_ cards, you also need to select the card brand.
{{% /alert %}}

<img src="/assets/VTEX/VTEX_28.png" alt="PrintScreen" width="60%"/><br>

The remaining values can be left as default. Use the following values to configure Co-branded and Private label cards.

| Country | Name | Description | BIN ranges | Acquirer payment code |
|:-:|---|---|---|---|
| <img src="/assets/Argentina.png" width="25px"/> | Argencard | Argencard | `501105-532362` | argencard |
| <img src="/assets/Argentina.png" width="25px"/> | Cabal | Cabal | `60423,60400,589657` | cabal |
| <img src="/assets/Argentina.png" width="25px"/> | Cencosud | Cencosud | `603493-603493` | cencosud |
| <img src="/assets/Argentina.png" width="25px"/> | Naranja | Naranja | `589562` | naranja |
| <img src="/assets/Argentina.png" width="25px"/> | Shopping | Shopping | `603488` | shopping |
| <img src="/assets/Colombia.png" width="25px"/> | Codensa | Codensa | `590712-590712` | codensa |

For more information about how to configure [Co-branded](https://help.vtex.com/en/tutorial/configurar-pagamentos-com-cartoes-de-loja-cobranded--jrkLK41IjuquUmyKUi86Q) and [Private label](https://help.vtex.com/en/tutorial/configurar-pagamentos-com-cartoes-de-loja-bandeira-propria--428FgVdSGQUeAOoogkaIw4) cards, refer to the VTEX Help Center.

4. Click _**Save**_. When the custom payment has been created, you are redirected to the option to create a new _**Payment conditions**_. This payment condition is created as explained in [Configure credit or debit cards](#configure-credit-or-debit-cards) section.

##### Configure cash payment methods.
As cash payments require that your customer pays in physical offices, you can configure this payment method in VTEX as promissory notes (Notes payables). 

{{% alert title="Note" color="info"%}}
For _Boleto bancario_ in Brazil, this procedure it is not required, just locate and configure this payment method as a Payment condition.
{{% /alert %}}

When you configure a cash payment method, your customers are redirected to the PayU's checkout so they can download the payment voucher and pay it in the respective physical office. Follow the instructions below to add this payment method to your VTEX shop.

1. In the Settings option (_**Transactions**_ > _**Payments**_ > _**Settings**_), go to _**Custom payments**_ tab.

![PrintScreen](/assets/VTEX/VTEX_26.png)

2. In this tab, you have five (5) available space to configure Cash payments. In this example, we will set up `OXXO`, a Mexican cash payment method.<br>Click in any of the available boxes in the _**Notes payables**_ section.

![PrintScreen](/assets/VTEX/VTEX_29.png)

3. Provide the following data for the cash payment.

* **Name**: In this parameter, you need to use the value displayed [here]({{< ref "select-your-payment-method.html" >}}) in the column `paymentMethod parameter`. For the sake of our example, set `OXXO`.
* **Description**: Provide the description you want to show when the customer selects this payment method. This parameter is optional.
* **Notes payable expiration date**: provide the number of days before the cash payment expires. By default, this value is assigned to 7 days. Keep in mind that, to avoid processing problems, this value must match the value selected in the Payment expiration (days) field that you configured in the VTEX affiliation.

Leave the other parameters with their default values 

4. Click _**Save**_. When the custom payment has been created, you are redirected to the option to create a new _**Payment conditions**_. This payment condition is created as explained in [Configure credit or debit cards](#configure-credit-or-debit-cards) section.

##### Configure PSE
**Prerequisites:**
*	This payment method only applies to merchants that have processing in Colombia.
*	To offer PSE as a payment method, you must first make sure to install the **PSE App developed by VTEX**. If you have not already done so, go to **Account Settings > Applications > App Store** and search for **Banks for PSE**. <br>In case you cannot find the App in the store, you can request its installation from the VTEX team through a ticket at [VTEX Support](https://help.vtex.com/en/support).
* In case you have a VTEX Legacy integration, please note that VTEX must perform an additional configuration for you to set up the payment method. Contact your VTEX agent or request help through [VTEX Support](https://help.vtex.com/en/support).

{{% alert title="Note" color="info"%}} 
You can complement this section review with the information available at VTEX sites: [PSE general information](https://help.vtex.com/en/announcements/pse-medio-de-pago-para-clientes-en-colombia--4T22CHOcEV3Nb2RtkJZOFB), [Setting up payments in VTEX with PSE](https://help.vtex.com/en/tutorial/configurar-pago-con-pse--7dRChubn7TqdEyWrHQEQp6),  [Banks for PSE app](https://apps.vtex.com/vtexlatam-banks-for-pse/p).  
{{% /alert %}}

1. To configure PSE, access the administration panel of your VTEX platform and navigate to **Store Settings > Payments > Settings > Payment Conditions**. Then, proceed as follows:
*	Click on the _+_ button.
*	Under the _Other_ category, locate _PSE_.
*	Fill out the fields displayed on the screen:
    -	Enter a descriptive name for the rule to identify this payment method.
    -	Choose the affiliation configured to process payments with PayUV2 from the _Process with affiliation_ dropdown menu.
    -	Activate the payment condition in the _Status_ field.
    -	Click _Save_ to apply the settings.

<video width="630" height="300" controls>
	<source src="/assets/VTEX/Videos/Video01.mp4" type="video/mp4"> 	
</video>

<br>
</br>

2. Configure the Banks for PSE app with your PayU credentials. To do so, follow these steps:

*	Login to the administration panel of your VTEX platform and access **Apps > Installed apps > Banks for PSE**.
*	Complete the form and click _Save_.

| Field | Description |
|---|---|
| Connector Used to process the PSE: | Select _PayUv2_ from the dropdown list. |
| Application Code | **Business Unit** Private API Key. Remember that this data can be found in the PaymentsOS Control Panel as explained [above](https://developers.payulatam.com/latam/en/docs/tools/shopping-cart-plugins/vtex.html#configure-the-gateway-affiliation). <br> **Note:** This field is equivalent to the _Application Token_ of the VTEX affiliation. |
| Application Key | ID of the **Business Unit application**. Remember that this data can be found in the PaymentsOS Control Panel as explained [above](https://developers.payulatam.com/latam/en/docs/tools/shopping-cart-plugins/vtex.html#configure-the-gateway-affiliation). <br> **Note:** This field is equivalent to the _Application Key_ of the VTEX affiliation. |

* Once you complete the configuration, you can perform transactions in a productive environment with PSE.

![PrintScreen](/assets/VTEX/VTEX_31.png)

{{% alert title="Important" color="warning"%}}
To test PSE (using PSE in Sandbox environment), ensure that your VTEX membership is in test mode and that you have an additional VTEX configuration specific to PSE. For further guidance, please reach out to your implementing agency or [VTEX Support](https://help.vtex.com/en/support). 
{{% /alert %}}

## Testing the integration
Once you have configured the Payment conditions for your payment methods, it is strongly recommended to test your integration before starting to receive real transactions.

**Prerequisites for successful testing:**
*	Make sure your PaymentsOS account is in `TEST` mode.
*	Check that the _**Environment Selector**_ in your _**VTEX Gateway Affiliation**_ is in `TEST` mode.
*	Be sure to use the appropriate credentials for the test environment when you are setting up the _**VTEX Gateway Affiliation**_. Remember that you can find the test credentials [here](https://developers.payulatam.com/latam/en/docs/getting-started/test-your-solution.html). 
*	Remember that once you perform your tests, you must modify the above points with the production information (PaymentsOS account, environment selector in VTEX affiliation, and Credentials configured in VTEX affiliation).

1. In the VTEX admin, click _**VISIT STORE**_ at the top panel.

![PrintScreen](/assets/VTEX/VTEX_16.png)

2. The store configured for your VTEX account opens. Select any product and click purchase.

![PrintScreen](/assets/VTEX/VTEX_17.png)

3. In the shopping cart, click the place order button. 

![PrintScreen](/assets/VTEX/VTEX_18.png)

4. In the payment section, the payment methods appears grouped by their type. Select the one you want to test and enter the test data, find [here]({{< ref "Test-your-solution.md#test-cards" >}}) some test card numbers and information to test status.<br>
Finally, click in Complete purchase

![PrintScreen](/assets/VTEX/VTEX_19.png)

Once the purchase has been approved you can check it in:
* VTEX Admin: _**Payments**_ > _**Transactions**_.

![PrintScreen](/assets/VTEX/VTEX_20.png)

* PaymentsOS dashboard: _**Payments**_ > _**Search**_.<br><br>![PrintScreen](/assets/VTEX/VTEX_21.png)<br>The parameter _**External Transaction ID**_ inside the _**Transaction Activity**_ is the Order ID in PayU.  

* PayU Module: in the [_**Sales Report**_]({{< ref "Sales-report.md" >}}) module.

![PrintScreen](/assets/VTEX/VTEX_22.png)

* [Queries API]({{< ref "Queries.md" >}}) using the parameter _**External Transaction ID**_ as OrderID.

### Testing two-step flows
When you have configured your _**Gateway affiliation**_ to process transactions in two-step flows, the funds authorized in the credit card are not settled until you explicitly request the settlement. To request the settlement, you need to invoice the order.

To invoice an order, locate the transaction in the VTEX Admin (**Payments**_ > _**Transactions**_) and click it. Then, click the _**Order**_ button at the top right corner.

![PrintScreen](/assets/VTEX/VTEX_23.png)

Scroll down to the Package section, and click _**Invoice package**_.

![PrintScreen](/assets/VTEX/VTEX_24.png)

Provide the information of the invoice and click _**Send Invoice**_ at the end of the panel. Once the invoice is sent to the customer, the amount authorized is charged fom the customer's card.

![PrintScreen](/assets/VTEX/VTEX_25.png)

{{% alert title="Note" color="info"%}}
An authorized order can be cancelled using the _**Cancel order**_ button in the Order information. When cancelling the order, PayU send a _void_ transaction which is record both in the Hub and PayU Latam.
{{% /alert %}}