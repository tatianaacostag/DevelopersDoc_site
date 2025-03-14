---
title: "VTEX"
linkTitle: "VTEX"
date: 2021-05-25T10:30:35-05:00
description:
  Esta guía explica cómo integrar PayU con tu sitio web VTEX. 
weight: 1
tags: ["subtopic"]
---

VTEX es una plataforma de comercio digital empresarial que te permite crear rápidamente una tienda en línea con funcionalidades integradas. Para más información, visita el sitio web oficial de <a href="https://vtex.com" target="_blank">VTEX</a>.

## Requisitos previos {#prerequisites}

* Una cuenta activa de PayU Latam.
* Una cuenta activa de PayU Enterprise (PaymentsOS). Si no tienes una cuenta, haz clic <a href="https://control.paymentsos.com/signup" target="_blank">aquí</a> para crear una. La cuenta debe estar configurada en modo producción/en vivo. Para más detalles sobre cómo habilitarla, consulta [Activación de tu cuenta PayU Enterprise](#activating-your-payu-enterprise-account-live-mode).
* Una cuenta de VTEX con los permisos y derechos suficientes para acceder al panel administrativo de VTEX. Esta cuenta debe tener autenticación de dos factores habilitada.

## Disponibilidad por País y Métodos de Pago {#availability-by-country-and-payment-methods}

La siguiente tabla muestra la disponibilidad de VTEX por país y los métodos de pago admitidos:

| País | Tarjetas de Crédito | Pagos en Efectivo | Otros Métodos |
|-|-|-|-|
| <img src="/assets/Argentina.png" width="20px"/> &nbsp;Argentina &nbsp; | Tarjetas de crédito | Pagos en efectivo | - |
| <img src="/assets/Brasil.png" width="20px"/> &nbsp;Brasil | AMEX, MasterCard, Visa | Boleto Bancário | - |
| <img src="/assets/Colombia.png" width="20px"/> &nbsp;Colombia &nbsp; | AMEX, Codensa, Diners, MasterCard, Visa | Efecty, Su Red, referencia bancaria | PSE |
| <img src="/assets/Chile.png" width="20px"/> &nbsp;Chile | Tarjetas de crédito | Pagos en efectivo | - |
| <img src="/assets/Mexico.png" width="20px"/> &nbsp;México | Tarjetas de crédito | Pagos en efectivo | SPEI |
| <img src="/assets/Peru.png" width="20px"/> &nbsp;Perú | AMEX, MasterCard, Visa | - | - |

## Activación de tu Cuenta PayU Enterprise (Modo Live) {#activating-your-payu-enterprise-account-live-mode}

Por defecto, las cuentas recién creadas están configuradas en modo de prueba. Para activar tu cuenta y procesar transacciones en vivo, contacta a tu gerente de cuenta y envía una solicitud.

**Tu solicitud debe incluir la siguiente información:**

* **Merchant ID:** Ubica el Merchant ID de tu cuenta LATAM. Para más detalles sobre cómo encontrarlo, consulta la <a href="https://developers.payulatam.com/latam/es/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html#merchant-and-account-ids" target="_blank">documentación del Panel de Gestión de PayU</a>.
* **Account ID:** Puedes encontrar tu Account ID en el panel de control de PayU Enterprise, como se muestra en la imagen a continuación:
<br>

![PrintScreen](/assets/VTEX/vtex01es.png)

## Configuración de tu Cuenta PayU Enterprise {#configuring-your-payu-enterprise-account}

Para configurar los métodos de pago en VTEX y procesarlos a través de nuestra pasarela, sigue los pasos a continuación. La configuración consta de dos etapas. Antes de continuar, asegúrate de haber cumplido con los requisitos previos mencionados anteriormente.

### 1. Configuración Inicial {#1-initial-setup}

La integración de PayU Latam con VTEX se realiza a través de PaymentsOS como middleware. El primer paso es configurar los siguientes componentes dentro de tu cuenta PayU Enterprise:

* Configuración del proveedor
* Unidad de negocio
* Webhook

Puedes configurar estos componentes utilizando uno de los siguientes métodos:
* [Configurar la cuenta usando Postman]({{< ref "#configuring-the-account-using-postman" >}}).
* [Configurar la cuenta manualmente a través del panel de PayU Enterprise]({{< ref "#configuring-the-account-manually-using-payu-enterprise-dashboard" >}}).

#### Configuración de la Cuenta Usando Postman {#configuring-the-account-using-postman}

Sigue estos pasos para configurar tu cuenta utilizando Postman:

1. Haz clic en el botón a continuación para importar nuestra colección de Postman (si el botón no funciona, actualiza la página).

{{< postman/postman_vtex2024 >}}
<br>

2. Después de importar la colección, configura las variables globales. Descarga el archivo de variables globales <a href="/assets/globals/VTEX Hub.postman_globals.json" download>aquí</a>.

3. En Postman, haz clic en _**Import**_ junto al nombre de tu espacio de trabajo y selecciona el archivo JSON descargado.

4. Haz clic en _**Import**_ para finalizar el proceso.

5. Ejecuta los métodos de la colección en el orden indicado. Primero, selecciona el método `POST` llamado `1. Login` y navega a la pestaña _**Body**_.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_01.png)

6. Ingresa tu **correo electrónico** y **contraseña** de tu cuenta PayU Enterprise, luego haz clic en _**Send**_. Si el inicio de sesión es exitoso, los datos de autenticación se establecerán para el siguiente método.

7. Haz clic en el método `GET` `2. Retrieve PayU Latam ID`.

8. En la esquina superior derecha, haz clic en el ícono de ojo para ubicar el parámetro `env`. Luego, haz clic en el ícono de lápiz y configúralo en `test` para el entorno de pruebas o en `live` para producción.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_02.png)

9. Haz clic en _**Send**_ para continuar.

10. Luego, configura el proveedor. Selecciona el método `POST` `3. Create Provider Configuration` y navega a la pestaña _**Body**_. 

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_03.png)

Completa los siguientes datos:

| Parámetro | Descripción |
|---|---|
| name | Nombre de la _**Provider Configuration**_. |
| description | Descripción significativa (opcional). |
| configuration_data.apiLogin | Nombre de usuario o login proporcionado por PayU. [¿Cómo obtengo mi API Login?]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| configuration_data.apiKey | Clave única de tu comercio. [¿Cómo obtengo mi API Key?]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| configuration_data.accountId | ID de la cuenta PayU para el país de destino. |
| configuration_data.merchantId | Merchant ID en PayU Latam. |
| configuration_data.paymentCountry | País de procesamiento en formato ISO 3166 Alpha-3. |
| configuration_data.partnerID | Identificador de PayU. Ingresa `ZOOZ_VTEX_V2`. |
| configuration_data.cashRedirect | Establece `true` para asegurar el flujo adecuado de órdenes con pagos en efectivo en VTEX. |

{{% alert title="Nota" color="info"%}}

El parámetro `provider_id` se asigna automáticamente en la respuesta del método `2. Retrieve PayU Latam ID`. No modifiques este valor.

{{% /alert %}}  

11. Configura la Unidad de Negocio seleccionando el método `POST` `4. Create Business Unit` y navegando a la pestaña _**Body**_. 

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_04.png)

Completa los siguientes datos:

| Parámetro | Descripción |
|---|---|
| id | Identificador de la Unidad de Negocio (en minúsculas y sin espacios). Este valor no se puede cambiar posteriormente. |
| description | Descripción significativa (opcional). |

{{% alert title="Nota" color="info"%}}

El parámetro `default_processor` se asigna automáticamente en la respuesta del método `3. Create Provider Configuration`. No modifiques este valor.

{{% /alert %}}  
 
12. Crea el Webhook seleccionando el método `POST` `5. Create Webhook` y navegando a la pestaña _**Body**_.

{{% alert title="Nota" color="info"%}}

El webhook funciona como la URL de confirmación que recibe notificaciones de VTEX cuando una transacción cambia de estado.

{{% /alert %}}

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_05.png)

Configura el parámetro `endpoint` según tu entorno:
* Pruebas: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Producción: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

Deja todos los demás parámetros con sus valores predeterminados.

En este punto, tu cuenta PayU Enterprise con PaymentsOS está configurada. El siguiente paso es [Configurar el Proveedor en VTEX]({{< ref "#2-configuring-the-vtex-provider" >}}).

#### Configuración Manual de la Cuenta Usando el Panel de PayU Enterprise {#configuring-the-account-manually-using-payu-enterprise-dashboard}

Sigue estos pasos para configurar tu cuenta utilizando el panel de PayU Enterprise.

1. **Crear la Configuración del Proveedor**

<span style="color: #A6C307; font-weight: bold;">1.1</span> En el panel de PayU Enterprise, expande el menú _**Configurations**_ y selecciona _**Providers**_.

![PrintScreen](/assets/VTEX/vtex02.png)

<span style="color: #A6C307; font-weight: bold;">1.2</span> Haz clic en el módulo correspondiente al país o división para el cual deseas configurar el proveedor.

Completa los siguientes campos para la _**Provider Configuration**_:

| Campo | Descripción |
|---|---|
| Configuration Name | Ingresa un nombre para la _**Provider Configuration**_. |
| Description | Proporciona una descripción significativa (opcional). |
| apiLogin | El usuario o login proporcionado por PayU. [¿Cómo obtengo mi API Login?]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| apiKey| La clave única de tu comercio. [¿Cómo obtengo mi API Key?]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| accountId | El ID de la cuenta PayU según el país donde operas. |
| merchantId | El ID de tu comercio en PayU Latam. |
| paymentCountry | El país de procesamiento en formato ISO 3166 Alpha-3. |
| cashRedirect | Selecciona `true` para asegurar el flujo correcto de órdenes con pagos en efectivo en VTEX.<br> **Nota:** Esta configuración es esencial para los comercios que procesan pagos en efectivo con VTEX. |

<span style="color: #A6C307; font-weight: bold;">1.3</span> Haz clic en _**Create**_.

<img src="/assets/VTEX/vtex03.png" alt="PrintScreen" style="width: 450px; height: auto;">
<br>

2. **Crear la Unidad de Negocio**

<span style="color: #A6C307; font-weight: bold;">2.1</span> Regresa al panel, expande el menú _**Configurations**_ y selecciona _**Business Units**_.

<img src="/assets/VTEX/vtex04.png" alt="PrintScreen" style="width: 400px; height: auto;">
<br>

<span style="color: #A6C307; font-weight: bold;">2.2</span> Haz clic en _**Create Business Unit**_ y completa los siguientes campos:
<br>

| Campo | Descripción |
|---|---|
| Business Unit Name | Nombre de la _**Business Unit**_. Debe estar en minúsculas y no contener espacios.<br> _Este valor no se puede cambiar posteriormente, así que asegúrate de que sea correcto._ |
| Description | Proporciona una descripción significativa (opcional). |

<span style="color: #A6C307; font-weight: bold;">2.3</span> En la sección _**Choose a Default Provider for This Business Unit**_, selecciona la _**Provider Configuration**_ creada en el Paso 1. Luego, haz clic en _**Create**_.

<img src="/assets/VTEX/vtex05.png" alt="PrintScreen" style="width: 700px; height: auto;">
<br>

3. **Crear el Webhook**

{{% alert title="Nota" color="info"%}}

El webhook funciona como la URL de confirmación que recibe notificaciones de VTEX cuando una transacción cambia de estado.

{{% /alert %}}

<span style="color: #A6C307; font-weight: bold;">3.1</span> Regresa al panel, expande el menú _**Configurations**_ y selecciona _**Webhooks**_.

<img src="/assets/VTEX/vtex06.png" alt="PrintScreen" style="width: 400px; height: auto;">
<br>

<span style="color: #A6C307; font-weight: bold;">3.2</span> Haz clic en _**Create a Webhook Endpoint**_ e ingresa la URL correspondiente a tu entorno:

* Pruebas: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Producción: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

<span style="color: #A6C307; font-weight: bold;">3.3</span> En la tabla _**Payment Event Alerts**_, activa el control deslizante _**Update**_ para _**Authorization**_ y _**Charge**_. Luego, en el campo _**Associated Business Units**_, ingresa la _**Business Unit**_ creada en el paso anterior. Finalmente, haz clic en _**Create**_.

<img src="/assets/VTEX/vtex07.png" alt="PrintScreen" style="width: 600px; height: auto;">
<br>

En este punto, tu cuenta PayU Enterprise con PaymentsOS está completamente configurada. El siguiente paso es [Configurar el Proveedor en VTEX]({{< ref "#2-configuring-the-vtex-provider" >}}).

### 2. Configuración del Proveedor en VTEX {#2-configuring-the-vtex-provider}

Una vez que hayas configurado tu cuenta de PayU Enterprise, el siguiente paso es configurar el proveedor de VTEX para cada método de pago. Para continuar, debes tener una cuenta de usuario válida para acceder al administrador de VTEX.

#### Crear un Nuevo Proveedor

{{% alert title="Nota" color="info"%}}

Antes de crear el nuevo proveedor, asegúrate de haber configurado el fingerprint para PayU. Para hacerlo, consulta esta [guía](https://help.vtex.com/en/tutorial/configurar-fingerprint-para-payu).

{{% /alert %}}

1. En el panel izquierdo, selecciona _**Configuración de la tienda > Proveedores > Nuevo proveedor**_:

![PrintScreen](/assets/VTEX/vtex08es.png)

2. Ubica _PayU_ y selecciona _**PayUv2**_:

![PrintScreen](/assets/VTEX/vtex09es.png)

{{% alert title="Importante" color="warning"%}}

Asegúrate de seleccionar el conector _**PayUv2**_, ya que esta guía aplica específicamente a esta versión.

{{% /alert %}}  

3. En la configuración del conector, instala el conector haciendo clic en el botón _**Instalar aplicación**_. Luego, completa los siguientes campos:

![PrintScreen](/assets/VTEX/vtex10.png)

{{% alert title="Nota" color="info"%}}

La información del conector se puede obtener de dos maneras:
* **Colección de Postman:** Ejecuta el método **Retrieve Authentication Keys**, configurando el parámetro global `env` como `test` o `live`, dependiendo de tu entorno de procesamiento.
* **Panel de PayU Enterprise:** Navega a _**Account**_ > _**Business Units**_ y selecciona la Unidad de Negocio creada en [Configuración de tu Cuenta PayU Enterprise]({{< ref "#configuring-your-payu-enterprise-account" >}}). Usa el selector en la parte superior para elegir el entorno de procesamiento.<br>Algunos valores están ocultos por defecto; haz clic en el icono de ojo para revelarlos.

{{% /alert %}} 

| Campo | Descripción |
|---|---|
| Affiliation name | Nombre utilizado para identificar la _**Gateway affiliation**_. |
| Environment selector | Selecciona el entorno para procesar transacciones.<br>Asegúrate de que todos los parámetros coincidan con el entorno seleccionado en PayU Enterprise. |
| Application Key | App ID de la _**Business Unit**_. |
| Application Token | Clave privada de API de la _**Business Unit**_. |
| Payment capture | Elige cómo se liquidarán (cobrarán) los pagos:<br><ul style="margin-bottom: initial;"><li>Para un flujo de un solo paso, selecciona `Automatic capture immediately after payment authorization`.</li><li>Para un flujo de dos pasos, selecciona `Deactivated: Not automatically captured` para liquidar los pagos al momento de la facturación.</li><li>Para programar la captura automática, selecciona `Scheduled: Schedules the automatic capture` y define un tiempo de captura en horas.</li></ul><br>Para más detalles, consulta [Custom Auto Capture Feature](https://developers.vtex.com/vtex-rest-api/docs/custom-auto-capture-feature).<br>El tiempo de captura automática predeterminado es de siete (7) días después de la aprobación. |
| Scheduled time frame in hours for automatic capture | Disponible cuando se selecciona `Scheduled: Schedules the automatic capture`. Define el tiempo de captura automática (solo valores enteros; no se permiten decimales). |
| Tipo Autorizacion | Elige entre flujos de pago de un paso o dos pasos:<br><ul style="margin-bottom: initial;"><li>Para un flujo de un solo paso, selecciona `Autorización y Captura`.</li><li>Para un flujo de dos pasos, selecciona `Pre-Autorización`.</li></ul><br>Consulta [Flujos de pago]({{< ref "payments.md#payment-flows" >}}) para más información. |
| Public Key | Clave pública de API de la _**Business Unit**_. |
| Idioma | Selecciona el idioma para la emisión de órdenes. Idiomas soportados:<br><ul style="margin-bottom: initial;"><li>Español</li><li>Inglés</li><li>Portugués</li></ul> |
| Expiración pago (días) | Define el período de validez para pagos en efectivo.<br>**Importante:** Este valor debe coincidir con el campo _**Promissory note validity**_ en la sección [Configurar métodos de pago en efectivo]({{< ref "#configuring-cash-payment-methods" >}}). |
| Enable payout split and send payment recipients? | Selecciona `No`. |

4. Haz clic en _**Guardar**_ para completar la configuración.

#### Configuración de Métodos de Pago {#configuring-payment-methods}

Configura los métodos de pago que se mostrarán en el sitio web durante el proceso de pago. [Consulta los métodos de pago disponibles]({{< ref "Select-your-payment-method.md" >}}).

{{% alert title="Importante" color="warning"%}}

* PIX no está disponible para Brasil cuando se utiliza VTEX.
* Los cambios en las condiciones de pago pueden tardar hasta 10 minutos en reflejarse en el flujo de pago.

{{% /alert %}}

##### Configuración de Tarjetas de Crédito o Débito {#configuring-credit-or-debit-cards}

Dependiendo de tu [país de procesamiento]({{< ref "Select-your-payment-method.md" >}}), puedes configurar la afiliación que creaste para utilizar tarjetas de crédito o débito<sup>*</sup>. Sigue los pasos a continuación para agregar este método de pago a tu tienda VTEX.

<sup>*</sup> _La disponibilidad de tarjetas de débito depende de tu país de procesamiento._

{{% alert title="Importante" color="warning"%}}

Haz clic [aquí](#configuring-co-branded-or-private-label-cards) para aprender a configurar tarjetas Co-branded o Private Label.

{{% /alert %}}

1. En el panel izquierdo, ve a _**Transacciones**_ > _**Pagos**_ > _**Configuración**_. Selecciona la pestaña _**Condiciones de pago**_ y haz clic en el icono de suma.

![PrintScreen](/assets/VTEX/vtex11es.png)

2. Selecciona el método de pago que deseas agregar. Los métodos de pago están agrupados por tipo.<br>Para este ejemplo, seleccionamos _**American Express**_ en la sección de Tarjeta de Crédito.

![PrintScreen](/assets/VTEX/vtex12es.png)

3. Proporciona los siguientes detalles:
* **Nombre de la regla (para identificarla rápidamente)**: Ingresa un nombre descriptivo para la condición de pago.
* **Status**: Configura el estado de la condición de pago. Solo puedes tener **una** condición de pago activa por método de pago.
* **Procesar con afiliación**: Selecciona la afiliación de gateway previamente configurada.
* **¿Pago al contado o en cuotas?**: Selecciona _**Al contado**_.

![PrintScreen](/assets/VTEX/vtex13es.png)

4. Haz clic en _**Guardar**_. La nueva condición ahora aparecerá en la pestaña _**Condiciones de pago**_.

![PrintScreen](/assets/VTEX/vtex14es.png)

##### Configuración de Tarjetas Co-Branded o Private Label {#configuring-co-branded-or-private-label-cards}

Las tarjetas co-branded y private label son tarjetas de crédito emitidas por una tienda o marca, a veces en asociación con redes como AMEX, VISA o MasterCard. Sigue estos pasos para agregar este método de pago a tu tienda VTEX.

1. En el panel izquierdo, selecciona _**Transacciones**_ > _**Pagos**_ > _**Configuración**_. Selecciona la pestaña _**Pagos personalizados**_.

![PrintScreen](/assets/VTEX/vtex15es.png)

2. La pestaña _Pagos personalizados_ proporciona cinco (5) espacios para configurar tarjetas co-branded y private label. En este ejemplo, configuramos la tarjeta colombiana Codensa, que es una tarjeta private label.<br>Haz clic en cualquier cuadro disponible en la sección _**Tarjeta de tienda (red propia)**_.

![PrintScreen](/assets/VTEX/vtex16es.png)

3. Ingresa los siguientes detalles de la tarjeta, manteniendo el formato exacto:

* **Nombre**: `Codensa`
* **Descripción**: `Codensa`
* **Rangos BIN**: `590712-590712`
* **Código de pago del adquirente**: `codensa`

{{% alert title="Nota" color="info"%}}

 Para tarjetas _co-branded_, también debes seleccionar la marca de la tarjeta.

{{% /alert %}}

<img src="/assets/VTEX/vtex17es.png" alt="PrintScreen" width="700px"/><br>

 Usa la siguiente tabla para configurar tarjetas co-branded y private label. Puedes dejar los demás valores con su configuración predeterminada.

| País | Nombre | Descripción | Rangos BIN | Código de pago del adquirente |
|:-:|---|---|---|---|
| <img src="/assets/Argentina.png" width="25px"/> | Argencard | Argencard | `501105-532362` | argencard |
| <img src="/assets/Argentina.png" width="25px"/> | Cabal | Cabal | `60423,60400,589657` | cabal |
| <img src="/assets/Argentina.png" width="25px"/> | Cencosud | Cencosud | `603493-603493` | cencosud |
| <img src="/assets/Argentina.png" width="25px"/> | Naranja | Naranja | `589562` | naranja |
| <img src="/assets/Argentina.png" width="25px"/> | Shopping | Shopping | `603488` | shopping |
| <img src="/assets/Colombia.png" width="25px"/> | Codensa | Codensa | `590712-590712` | codensa |

Para más detalles sobre la configuración de tarjetas [co-branded](https://help.vtex.com/en/tutorial/configurar-pagamentos-com-cartoes-de-loja-cobranded--jrkLK41IjuquUmyKUi86Q) y [private label](https://help.vtex.com/en/tutorial/configurar-pagamentos-com-cartoes-de-loja-bandeira-propria--428FgVdSGQUeAOoogkaIw4), visita el Centro de Ayuda de VTEX.

4. Haz clic en _**Guardar**_. Después de crear el pago personalizado, serás redirigido a la opción para crear una _**Condición de pago**_. Sigue las instrucciones en la sección [Configuración de Tarjetas de Crédito o Débito](#configuring-credit-or-debit-cards) para completar este paso.

##### Configuración de Métodos de Pago en Efectivo {#configuring-cash-payment-methods}

Dado que los pagos en efectivo requieren que los clientes realicen el pago en ubicaciones físicas, puedes configurar este método de pago en VTEX como notas promisorias (_Notes Payables_).

{{% alert title="Nota" color="info"%}}

Para _Boleto Bancário_ en Brasil, este procedimiento no es necesario. Simplemente localiza y configura este método de pago como una condición de pago.

{{% /alert %}}

Cuando configuras un método de pago en efectivo, los clientes son redirigidos al checkout de PayU, donde pueden descargar el comprobante de pago y realizarlo en la ubicación física correspondiente. Sigue las instrucciones a continuación para agregar este método de pago a tu tienda VTEX.

1. En el panel izquierdo, selecciona _**Transacciones > Pagos > Configuración**_. Selecciona la pestaña _**Pagos personalizados**_.

![PrintScreen](/assets/VTEX/vtex15es.png)

2. En esta pestaña, tienes cinco (5) espacios disponibles para configurar métodos de pago en efectivo. En este ejemplo, configuraremos OXXO, un método de pago en efectivo en México.<br>Haz clic en cualquier cuadro disponible en la sección _**Pagarés**_.

![PrintScreen](/assets/VTEX/vtex18es.png)

3. Proporciona la siguiente información:

* **Nombre**: Usa el valor listado [aquí]({{< ref "select-your-payment-method.html" >}}) en la columna del parámetro `paymentMethod`. Para este ejemplo, ingresa `OXXO`.
   * **Descripción**: Ingresa una descripción que se mostrará cuando el cliente seleccione este método de pago (opcional).
   * **Fecha de vencimiento de la nota promisoria**: Especifica el número de días antes de que expire el pago en efectivo. El valor predeterminado es de 7 días. Asegúrate de que este valor coincida con la configuración _**Expiración pago (días)**_ en la afiliación de VTEX para evitar problemas de procesamiento.

Deja los demás campos con sus valores predeterminados.

4. Haz clic en _**Guardar**_. Una vez creado el pago personalizado, serás redirigido para configurar una nueva _**Condición de pago**_. Sigue las instrucciones en la sección [Configuración de Tarjetas de Crédito o Débito](#configuring-credit-or-debit-cards).

##### Configuración de PSE {#configuring-pse}

**Requisitos previos:**
* Este método de pago solo está disponible para comercios que procesan en Colombia.
* Para ofrecer PSE como método de pago, debes instalar la **aplicación PSE desarrollada por VTEX**. Si aún no lo has hecho, ve a _**Configuración de la cuenta > Apps > App Store**_ y busca _**Banks for PSE**_. <br>Si la aplicación no está disponible en la tienda, puedes solicitar su instalación al equipo de VTEX enviando un ticket en [VTEX Support](https://help.vtex.com/en/support).
* Si utilizas una integración VTEX Legacy, VTEX debe realizar una configuración adicional antes de que puedas configurar este método de pago. Contacta a tu representante de VTEX o solicita asistencia a través de [VTEX Support](https://help.vtex.com/en/support).

{{% alert title="Nota" color="info"%}} 

Para obtener más información, consulta los siguientes recursos de VTEX:
- [Información general sobre PSE](https://help.vtex.com/en/announcements/pse-medio-de-pago-para-clientes-en-colombia--4T22CHOcEV3Nb2RtkJZOFB)
- [Configurar pagos con PSE en VTEX](https://help.vtex.com/en/tutorial/configurar-pago-con-pse--7dRChubn7TqdEyWrHQEQp6)
- [Aplicación Banks for PSE](https://apps.vtex.com/vtexlatam-banks-for-pse/p)  

{{% /alert %}}

1. Para configurar PSE, accede al panel de administración de VTEX y navega a _**Configuración de la tienda > Pagos > Configuración > Condiciones de pago**_. Luego, sigue estos pasos:

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.1</span> Haz clic en el botón _+_.

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.2</span> En la categoría _Otros_, localiza _PSE_.

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.3</span> Completa los siguientes campos:

&nbsp;&nbsp;&nbsp; <span style="color: #A6C307; font-weight: bold;">•</span> **Nombre de la regla**: Ingresa un nombre descriptivo para identificar este método de pago. <br>
&nbsp;&nbsp;&nbsp; <span style="color: #A6C307; font-weight: bold;">•</span> **Procesar con afiliación**: Selecciona la afiliación de gateway configurada para procesar pagos con PayUV2. <br>
&nbsp;&nbsp;&nbsp; <span style="color: #A6C307; font-weight: bold;">•</span> **Estado**: Activa la condición de pago.

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.4</span> Haz clic en _**Guardar**_ para aplicar la configuración.

   <video width="630" height="300" controls>
      <source src="/assets/VTEX/Videos/Video01.mp4" type="video/mp4">  
   </video>

<p>

2. Configura la aplicación Banks for PSE con tus credenciales de PayU siguiendo estos pasos:

&nbsp; <span style="color: #A6C307; font-weight: bold;">2.1</span> Inicia sesión en el panel de administración de VTEX y ve a _**Apps > Apps instaladas > Banks for PSE**_.

&nbsp; <span style="color: #A6C307; font-weight: bold;">2.2</span> Completa el formulario y haz clic en _**Guardar**_.

| Campo | Descripción |
|---|---|
| **Conector utilizado para procesar PSE** | Selecciona _PayUv2_ en la lista desplegable. |
| **Código de aplicación** | Ingresa la clave privada de la **Unidad de negocio** (_Business Unit Private API Key_). Esta información está disponible en el Panel de control de PayU Enterprise, como se explica [aquí](https://developers.payulatam.com/latam/en/docs/tools/shopping-cart-plugins/vtex.html#configure-the-gateway-affiliation). <br> **Nota:** Este campo corresponde al _Application Token_ de la afiliación en VTEX. |
| **Clave de aplicación** | Ingresa el ID de la **Aplicación de la Unidad de negocio** (_Business Unit Application ID_). Esta información está disponible en el Panel de control de PayU Enterprise, como se explica [aquí](https://developers.payulatam.com/latam/en/docs/tools/shopping-cart-plugins/vtex.html#configure-the-gateway-affiliation). <br> **Nota:** Este campo corresponde a la _Application Key_ de la afiliación en VTEX. |

<img src="/assets/VTEX/vtex19.png" alt="PrintScreen" width="500px"/><br>

* Una vez completada la configuración, podrás procesar transacciones en un entorno de producción con PSE.

{{% alert title="Importante" color="warning"%}}

Para probar PSE en un entorno sandbox, asegúrate de que tu afiliación en VTEX esté en modo de prueba y que cuentes con una configuración adicional específica para PSE. Para obtener más orientación, contacta a tu agencia de implementación o a [VTEX Support](https://help.vtex.com/en/support). 

{{% /alert %}}

## Prueba de la Integración {#testing-the-integration}

Una vez que hayas configurado las condiciones de pago para tus métodos de pago, se recomienda encarecidamente probar tu integración antes de procesar transacciones reales.

### Requisitos Previos para una Prueba Exitosa:

* Asegúrate de que tu cuenta de PayU Enterprise esté en modo `TEST`.
* Verifica que el _**Selector de Entorno**_ en tu _**Afiliación de Gateway en VTEX**_ esté configurado en modo `TEST`.
* Usa las credenciales de prueba adecuadas al configurar la _**Afiliación de Gateway en VTEX**_. Puedes encontrar las credenciales de prueba [aquí](https://developers.payulatam.com/latam/en/docs/getting-started/test-your-solution.html).
* Una vez finalizadas las pruebas, actualiza la configuración con la información de producción, incluyendo tu cuenta de PayU Enterprise, el selector de entorno en la afiliación de VTEX y las credenciales.

### Pasos para Realizar una Transacción de Prueba

1. En el panel de administración de VTEX, haz clic en _**Visite la tienda**_ en el menú superior.

   ![PrintScreen](/assets/VTEX/vtex20es.png)

2. Se abrirá la tienda configurada para tu cuenta de VTEX. Selecciona cualquier producto y procede con la compra.

   ![PrintScreen](/assets/VTEX/vtex21.png)

3. En el carrito de compras, haz clic en el botón _**Realizar Pedido**_.

   ![PrintScreen](/assets/VTEX/vtex22.png)

4. En la sección de pago, los métodos de pago disponibles aparecerán agrupados por tipo. Selecciona el que deseas probar e ingresa los datos de prueba. Puedes encontrar los números de tarjeta de prueba y la información relevante [aquí]({{< ref "Test-your-solution.md#test-cards" >}}).  
   Finalmente, haz clic en _**Finalizar Compra**_.

   ![PrintScreen](/assets/VTEX/vtex23.png)

### Verificación de la Transacción

Una vez aprobada la compra, puedes verificar la transacción en los siguientes lugares:

* **Administrador de VTEX**: Selecciona _**Transacciones > Pagos > Transacciones**_.

   ![PrintScreen](/assets/VTEX/vtex24es.png)

* **Panel de control de PayU Enterprise**: Ve a _**Pagos**_ > _**Buscar**_.

   ![PrintScreen](/assets/VTEX/vtex25es.png)  
   
   {{% alert title="Nota" color="info"%}}

   El parámetro _**ID Externo de Transacción**_ dentro de _**Actividad de la Transacción**_ corresponde al ID de la orden en PayU.

   {{%/ alert %}}

* **Panel de gestión de PayU**: Revisa la transacción en el módulo [_**Reporte de Ventas**_]({{< ref "Sales-report.md" >}}).

   ![PrintScreen](/assets/VTEX/vtex26.png)

* **[API de Consultas]({{< ref "Queries.md" >}})**: Usa el _**External Transaction ID**_ como parámetro `OrderID`.

## Prueba de Flujos en Dos Pasos

Si tu _**Afiliación de Gateway**_ está configurada para procesar transacciones mediante un flujo en dos pasos, los fondos autorizados en la tarjeta de crédito no se liquidan hasta que solicites explícitamente la liquidación. Para completar la liquidación, debes facturar el pedido.

### Pasos para Facturar un Pedido

1. Ubica la transacción en el **Administrador de VTEX** en _**Transacciones > Pagos > Transacciones**_ y haz clic en ella.  
   Luego, haz clic en el botón _**Pedido**_ en la esquina superior derecha.

   ![PrintScreen](/assets/VTEX/vtex27es.png)

2. Desplázate hacia abajo hasta la sección _**Paquete**_ y haz clic en _**Facturar paquete**_.

   ![PrintScreen](/assets/VTEX/vtex28es.png)

3. Ingresa los detalles de la factura y haz clic en _**Enviar factura**_.  
   Una vez enviada la factura al cliente, el monto autorizado se cobra en la tarjeta del cliente.

   ![PrintScreen](/assets/VTEX/vtex29es.png)

{{% alert title="Nota" color="info"%}}

Un pedido autorizado puede cancelarse usando el botón _**Cancelar pedido**_ en los detalles del pedido.  
Cuando un pedido se cancela, PayU envía una transacción de _void_, que se registra tanto en el Hub como en PayU Latam.

{{% /alert %}}
