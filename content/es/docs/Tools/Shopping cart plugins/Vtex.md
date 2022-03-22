---
title: "VTEX"
linkTitle: "VTEX"
date: 2021-05-25T10:30:35-05:00
description:
  Este artículo te muestra el procedimiento para habilitar PayU en tu sitio web de VTEX. 
weight: 5
tags: ["subtopic"]
---

VTEX es una plataforma de comercio digital que te permite crear una tienda en línea con funcionalidades listas para utilizar rápidamente. Para más información, consulta la [página oficial de VTEX](https://vtex.com/).

## Prerrequisitos {#prerequisites}
* Necesitas una cuenta activa en PayU Latam.
* Necesitas una cuenta activa en PaymentsOS. Si no tienes una cuenta, haz clic [aquí](https://control.paymentsos.com/signup) para crearla.<br>Todos los comercios que requieran integrar PayU con VTEX **deben** tener una cuenta en PaymentsOS.
* Necesitas una cuenta con suficientes permisos para acceder al admin de VTEX. Esta cuenta debe tener habilitado la autenticación en dos factores.

## Procedimiento de configuración {#configuration-procedure}
El procedimiento para habilitar en VTEX los medios de pago que procesamos en nuestra plataforma se divide en dos pasos. Antes de continuar, asegúrate de cumplir con los prerrequisitos anteriores.

### 1. Configurar tu cuenta de PaymentsOS {#1-configure-your-paymentsos-account}
La integración de PayU Latam con VTEX se realiza utilizando PaymentsOS como middleware. Como primer paso, necesitas configurar en tu cuenta de PaymentsOS los siguientes objetos.

* Una configuración de Proveedor.
* Una Unidad de Negocio.
* Un WebHook.

Puedes configurar estos objetos usando una de las siguientes opciones:
* [Configurar la cuenta utilizando Postman]({{< ref "#configure-the-account-using-postman" >}}).
* [Configurar la cuenta manualmente utilizando el Panel de Control de PaymentsOS]({{< ref "#configure-the-account-manually-using-paymentsos-dashboard" >}}).

#### Configurar la cuenta utilizando Postman {#configure-the-account-using-postman}
Sigue estos pasos para configurar tu cuenta utilizando Postman.

1. Haz clic en el siguiente botón para importar nuestra colección en Postman (puede que necesites refrescar la página si el botón no funciona).

{{< postman/postman_vtex >}}
<br>

2. Luego de ejecutar la colección, necesitas configurar los globales. Descarga el archivo de globales <a href="/static/assets/globals/VTEX%20Hub.postman_globals.json" download>aquí</a>.

3. En la colección de Postman, haz clic en _**Import**_ junto al nombre de tu workspace y localiza el archivo json descargado previamente.

4. Cuando termine, haz click en _**Import**_.

5. Es obligatorio ejecutar los métodos de la colección en el orden mostrado. Primero, haz click en el método `POST` llamado `1. Login` y abre la pestaña _**Body**_.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_01.png)

6. Ingresa el correo electrónico (_**email**_) y la contraseña (_**password**_) de tu cuenta de PaymentsOS. Luego, haz clic ens _**Send**_.

7. Si el inicio de sesión fue correcto, los datos de autenticación son asignados en el segundo método.<br>Haz clic en el método `GET` llamado `2. Retrieve PayU Latam ID`.

8. En la esquina superior derecha, haz clic en el ícono de ojo y localiza el parámetro `env`. Luego, haz clic en el ícono de lápiz e ingresa `test` si estás procesando en el ambiente de pruebas o `live` en caso contrario.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_02.png)

9. Una vez configurado, haz clic en _**Send**_.

10. Haz clic en el método `POST` llamado `3. Create Provider Configuration`, este método crea la _**Configuración de proveedor**_ en PaymentsOS. Luego, ve a la pestaña _**Body**_. 

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_03.png)

Ingresa la siguiente información:

| Parámetro | Descripción |
|---|---|
| name | Ingresa un nombre para la _**Configuración de proveedor**_. |
| description | Ingresa una descripción significativa para la _**Configuración de proveedor**_.<br>Este valor es opcional. |
| configuration_data.apiLogin | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| configuration_data.apiKey | Contraseña entregada por PayU. [  Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| configuration_data.accountId | ID de la cuenta de PayU de acuerdo al país en el que vas a vender. |
| configuration_data.merchantId | ID de tu comercio en PayU Latam. |
| configuration_data.paymentCountry | País de procesamiento en formato ISO 3166 Alpha-3. |

{{% alert title="Nota" color="info"%}}
El parámetro `provider_id` es llenado automáticamente por la respuesta del método `2. Retrieve PayU Latam ID`. No cambies este valor.
{{% /alert %}}  

11. Haz clic en el método `POST` llamado `4. Create Business Unit`, este método crea la _**Unidad de Negocio**_ en PaymentsOS. Luego, ve a la pestaña _**Body**_. 

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_04.png)

Ingresa la siguiente información:

| Parámetro | Descripción |
|---|---|
| id | Identificador de la _**Unidad de Negocio**_. Este id debe estar en minúsculas y sin espacios.<br>_Asegúrate de haber ingresado el valor correcto para el id ya que este valor no se puede actualizar después_. |
| description | Ingresa una descripción significativa para la _**Unidad de Negocio**_.<br>Este valor es opcional. |

{{% alert title="Nota" color="info"%}}
El parámetro `default_processor` es llenado automáticamente por la respuesta del método `3. Create Provider Configuration`. No cambies este valor.
{{% /alert %}}  
 
12. Haz clic en el método `POST` llamado `5. Create Webhook`, este método crea el _**WebHook**_ en PaymentsOS. Este WebHook es la URL de confirmación que recibirá las notificaciones enviadas por VTEX cuando una transacción cambia de estado.<br>Luego, ve a la pestaña _**Body**_.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_05.png)

Asigna en el parámetro `endpoint` los siguientes valores de acuerdo con tu ambiente.
* Test: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Live: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

Deja los demás valores con su valor por defecto.

En este punto, has configurado tu cuenta de PaymentsOS como middleware, el siguiente paso es la [configuración del proveedor de VTEX]({{< ref "#2-configure-the-vtex-provider" >}}).

#### Configurar la cuenta manualmente utilizando el Panel de Control de PaymentsOS {#configure-the-account-manually-using-paymentsos-dashboard}
Sigue estos pasos para configurar tu cuenta utilizando el panel de control de PaymentsOS.

1. Crea la the Configuración de proveedor.<br>
En el panel de control de PaymentsOS dashboard, expande el menú _**Cuenta**_, luego selecciona _**Servicios**_.

![PrintScreen](/assets/VTEX/VTEX_01_es.png)

Utiliza el campo _**Buscar**_ en la sección _**Crea una nueva configuración de proveedor**_ e ingresa _PayU_ para encontrar el proveedor _PayU Latam_.

![PrintScreen](/assets/VTEX/VTEX_02_es.png)

Ingresa la siguiente información para la _**Configuración de proveedor**_:

| Parámetro | Descripción |
|---|---|
| Nombre de Configuración | Ingresa un nombre para la _**Configuración de proveedor**_. |
| Descripción | Ingresa un nombre para la _**Configuración de proveedor**_. |
| apiLogin | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| apiKey| Contraseña entregada por PayU. [  Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| accountId | ID de la cuenta de PayU de acuerdo al país en el que vas a vender. |
| merchantId | ID de tu comercio en PayU Latam. |
| paymentCountry | País de procesamiento en formato ISO 3166 Alpha-3. |

Cuando termines, has clic en _**Crear**_.

![PrintScreen](/assets/VTEX/VTEX_03_es.png)

2. Crea la Unidad de Negocio.<br>
En el panel de control de PaymentsOS dashboard, expande el menú _**Cuenta**_, luego selecciona _**Unidades de Negocio**_.

![PrintScreen](/assets/VTEX/VTEX_04_es.png)

Haz clic en el botón _**Crear una Unidad de Negocio**_ e ingresa la siguiente información:

| Parámetro | Descripción |
|---|---|
| Business Unit Name | Nombre de la _**Unidad de Negocio**_. Este nombre debe estar en minúsculas y sin espacios.<br>_Asegúrate de haber ingresado el valor correcto para el nombre ya que este valor no se puede actualizar después_. |
| Descripción | Ingresa una descripción significativa para la _**Unidad de Negocio**_.<br>Este valor es opcional. |

En la sección _**Selecciona un proveedor por defecto para esta Unidad de Negocio**_, escoge la _**Configuración de proveedor**_ creada en el paso anterior.<br>Cuando termines, haz clic en _**Crear**_.

![PrintScreen](/assets/VTEX/VTEX_05_es.png)

3. Crea el Webhook. Este WebHook es la URL de confirmación que va a recibir las notificaciones enviadas por VTEX cuando una transacción cambia de estado.<br>

De vuelta en el panel de control de PaymentsOS, expande el menú _**Cuenta**_ y selecciona _**Webhooks**_.

![PrintScreen](/assets/VTEX/VTEX_06_es.png)

Haz click en el botón _**Configuración de proveedor**_ e ingresa la URL de acuerdo con tu ambiente:
* Test: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Live: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

En la tabla _**Payment Events Alert**_, activa el evento _**Update**_ para _**Authorization**_ y _**Charge**_. Además, selecciona en el combo _**Associated Business Units**_ la _**Unidad de Negocio**_ creada en el paso anterior.<br>Cuando termines, haz clic en _**Crear **_.

![PrintScreen](/assets/VTEX/VTEX_07_es.png)

En este punto, has configurado tu cuenta de PaymentsOS como middleware, el siguiente paso es la [configuración del proveedor de VTEX]({{< ref "#2-configure-the-vtex-provider" >}}).

### 2. Configurar el proveedor de VTEX {#2-configure-the-vtex-provider}
Una vez hayas configurado tu cuenta de PaymentsOS, el siguiente paso es la configuración del proveedor de VTEX para cada método de pago. Para este paso, es obligatorio que tengas un usuario válido para acceder al admin de VTEX.

#### Configurar la afiliación de Gateway {#configure-the-gateway-affiliation}
Antes de configurar la _**afiliación de Gateway**_, asegurate de haber configurado FingerPrint para PayU. Para esto, consulta este [artículo](https://help.vtex.com/en/tutorial/configurar-fingerprint-para-payu).

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

![PrintScreen](/assets/VTEX/VTEX_11.png)

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
| Payment capture | Select how you want to perform the settlement (charge) in your affiliation.<br><ul style="margin-bottom: initial;"><li>For one-step flow, select `Automatic capture immediately after payment authorization`.</li><li>For two-step flow, select `Deactivated: Not automatically captured` to execute the settlement once you invoice the order.</li></ul><br>For more information about this parameter, refer to [Custom Auto Capture Feature](https://developers.vtex.com/vtex-rest-api/docs/custom-auto-capture-feature) in the developers documentation.<br>The default value for this option is seven (7) days after the approval. |
| Tipo Autorizacion | Choose if your payment transactions are executed in using one-step or two-step flow.<br><ul style="margin-bottom: initial;"><li>For one-step flow, select `Autorizacion y Captura`.</li><li>For two-step flow, select `Pre-Autorizacion`.</li></ul><br>Refer to the following [link]({{< ref "payments.md#payment-flows" >}}) to learn more about the Payment flows. |
| Public Key | Public API Key of the _**Business Unit**_. |
| Enable payout split and send payment recipients? | Select `No` for this field. |

When finish, click _**Save**_.

#### Configure Payment methods
Configure the payment methods to be displayed on the website for checkout. [Consult our available Payment methods]({{< ref "Select-your-payment-method.md" >}}).

{{% alert title="Important" color="warning"%}}
* PSE (Colombian Bank transfer method) is not supported through this version of the connector. If you need to configure this Payment method, refer to the [procedure to install version 1 of the conector](https://help.vtex.com/tutorial/setting-up-payu-gateway--36zWOAFHmwIAoWIEU2Y08q).
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

<sup>\*</sup>_Processing in installments is not yet supported_.

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

* **Name**: In this parameter, you need to use the value displayed [here]({{< ref "integrations.html#api-key-and-api-login" >}}) in the column `paymentMethod parameter`. For the sake of our example, set `OXXO`.
* **Description**: Provide the description you want to show when the customer selects this payment method. This parameter is optional.
* **Notes payable expiration date**: provide the number of days before the cash payment expires. By default, this value is assigned to seven days.

Leave the other parameters with their default values 

4. Click _**Save**_. When the custom payment has been created, you are redirected to the option to create a new _**Payment conditions**_. This payment condition is created as explained in [Configure credit or debit cards](#configure-credit-or-debit-cards) section.

## Testing the integration
Once you have configured the Payment conditions for your payment methods, it is strongly recommended to test your integration before starting to receive real transactions. As a prerequisite, make sure your PaymentsOS account is in `TEST` mode, as well as the _**Environment selector**_ in your _**Gateway affiliation**_.

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