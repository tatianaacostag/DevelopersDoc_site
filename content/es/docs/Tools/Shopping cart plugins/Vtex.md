---
title: "VTEX"
linkTitle: "VTEX"
date: 2021-05-25T10:30:35-05:00
description:
  Esta guía explica cómo integrar PayU con tu sitio web VTEX. 
weight: 1
tags: ["subtopic"]
---

VTEX es una plataforma de comercio digital empresarial que te permite crear rápidamente una tienda en línea con funcionalidades integradas. Para más información, visita el <a href="https://vtex.com" target="_blank">sitio web oficial de VTEX</a>.

## Requisitos previos {#prerequisites}

* Una <a href="https://developers.payulatam.com/latam/es/docs/getting-started/create-an-account.html" target="_blank">cuenta activa de PayU Latam</a>.
* Una <a href="https://control.paymentsos.com/signup" target="_blank">cuenta activa de PayU Enterprise (PaymentsOS)</a> en modo de producción/en vivo. Para más detalles sobre cómo habilitarla, consulta [Activación de tu cuenta PayU Enterprise](#activating-your-payu-enterprise-account-live-mode).
* Una cuenta de VTEX con los permisos y derechos suficientes para acceder al panel administrativo de VTEX. Esta cuenta debe tener autenticación de dos factores habilitada.

## Disponibilidad por País y Métodos de Pago {#availability-by-country-and-payment-methods}

La siguiente tabla muestra la disponibilidad de VTEX por país y los métodos de pago admitidos:

| País | Tarjetas de Crédito | Pagos en Efectivo | Otros Métodos |
|-|-|-|-|
| <img src="/assets/Argentina.png" width="20px"/> &nbsp;Argentina &nbsp; | Tarjetas de crédito | Pagos en efectivo | - |
| <img src="/assets/Brasil.png" width="20px"/> &nbsp;Brasil | AMEX, MasterCard, Visa, Google Pay | Boleto Bancário | - |
| <img src="/assets/Colombia.png" width="20px"/> &nbsp;Colombia &nbsp; | AMEX, Codensa, Diners, MasterCard, Visa, Google Pay | Efecty, Su Red, referencia bancaria | PSE, Nequi |
| <img src="/assets/Chile.png" width="20px"/> &nbsp;Chile | Tarjetas de crédito | Pagos en efectivo | - |
| <img src="/assets/Mexico.png" width="20px"/> &nbsp;México | Tarjetas de crédito | Pagos en efectivo | SPEI |
| <img src="/assets/Peru.png" width="20px"/> &nbsp;Perú | AMEX, MasterCard, Visa | - | Yape |

## Activación de tu Cuenta PayU Enterprise (Modo Live) {#activating-your-payu-enterprise-account-live-mode}

Por defecto, las cuentas nuevas se configuran en modo de prueba. Para habilitar las transacciones en vivo, contacta a tu gerente de cuenta y envía una solicitud con los siguientes detalles:

* **Merchant ID:** Localiza el Merchant ID de tu cuenta LATAM en el <a href="https://developers.payulatam.com/latam/es/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html#merchant-and-account-ids" target="_blank">Panel de Gestión de PayU</a>.
* **Account ID:** Encuentra tu Account ID en el panel de control de PayU Enterprise haciendo clic en tu nombre de usuario en la esquina superior derecha.
<br>

![PrintScreen](/assets/VTEX/vtex01es.png)

## Configuración de tu Cuenta PayU Enterprise {#configuring-your-payu-enterprise-account}

Para configurar los métodos de pago en VTEX y procesarlos a través de nuestra pasarela, sigue los pasos a continuación. La configuración consta de dos etapas. Antes de continuar, asegúrate de haber cumplido con los requisitos previos mencionados anteriormente.

### 1. Configuración Inicial {#1-initial-setup}

PayU Enterprise opera a través de PaymentsOS, que actúa como middleware entre PayU Latam y VTEX. El primer paso es configurar los siguientes componentes dentro de tu cuenta PayU Enterprise:

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

3. En Postman, haz clic en **Import** junto al nombre de tu espacio de trabajo y selecciona el archivo JSON descargado.

4. Haz clic en **Import** para finalizar el proceso.

5. Ejecuta los métodos de la colección en el orden indicado. Primero, selecciona el método `POST` llamado `1. Login` y navega a la pestaña **Body**.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_01.png)

6. Ingresa el correo electrónico y contraseña de tu cuenta PayU Enterprise, luego haz clic en **Send**. Si el inicio de sesión es exitoso, los datos de autenticación se establecerán para el siguiente método.

7. Haz clic en el método `GET` `2. Retrieve PayU Latam ID`.

8. En la esquina superior derecha, haz clic en el ícono de ojo para ubicar el parámetro `env`. Luego, haz clic en el ícono de lápiz y configúralo en `test` para el entorno de pruebas o en `live` para producción.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_02.png)

9. Haz clic en **Send** para continuar.

10. Luego, configura el _proveedor_, el cual almacena tus credenciales de procesamiento de pagos. Selecciona el método `POST` `3. Create Provider Configuration` y navega a la pestaña **Body**. 

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_03.png)

Completa los siguientes datos:

| Parámetro | Descripción |
|---|---|
| name | Ingresa un nombre para la configuración del proveedor. |
| description | Proporciona una descripción opcional. |
| configuration_data.apiLogin | Nombre de usuario o login proporcionado por PayU. [¿Cómo obtengo mi API Login?]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| configuration_data.apiKey | Clave única de tu comercio. [¿Cómo obtengo mi API Key?]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| configuration_data.accountId | ID de la cuenta de PayU basado en tu país de operación. |
| configuration_data.merchantId | Tu ID de comercio en PayU Latam. |
| configuration_data.paymentCountry | País de procesamiento en formato ISO 3166 Alpha-3. |
| configuration_data.partnerID | Identificador de PayU. Ingresa `ZOOZ_VTEX_V2`. |
| configuration_data.cashRedirect | Establece `true` para asegurar el flujo adecuado de órdenes con pagos en efectivo en VTEX. |

{{% alert title="Nota" color="info"%}}

El parámetro `provider_id` se asigna automáticamente en la respuesta del método `2. Retrieve PayU Latam ID`. No modifiques este valor.

{{% /alert %}}  

11. Configura una _unidad de negocio_, la cual vincula la configuración del proveedor con las credenciales de la API de PayU Enterprise para procesar transacciones. Selecciona el método `POST` `4. Create Business Unit` y navegando a la pestaña **Body**. 

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_04.png)

Completa los siguientes datos:

| Parámetro | Descripción |
|---|---|
| id | Identificador de la unidad de negocio (en minúsculas y sin espacios). **Este valor no se puede cambiar más tarde, así que asegúrate de que sea preciso.** |
| description | Descripción opcional. |

{{% alert title="Nota" color="info"%}}

El parámetro `default_processor` se asigna automáticamente en la respuesta del método `3. Create Provider Configuration`. No modifiques este valor.

{{% /alert %}}  
 
12. Crea el Webhook, el cual recibe las notificaciones de VTEX cuando una transacción cambia de estado. Selecciona el método `POST` `5. Create Webhook` y navega a la pestaña **Body**.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_05.png)

Configura el parámetro `endpoint` según tu entorno:
* Pruebas: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Producción: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

Deja todos los demás parámetros con sus valores predeterminados.

En este punto, tu cuenta PayU Enterprise con PaymentsOS está configurada. El siguiente paso es [Configurar el Proveedor en VTEX]({{< ref "#2-configuring-the-vtex-provider" >}}).

#### Configuración de la Cuenta Usando el Panel de PayU Enterprise {#configuring-the-account-using-payu-enterprise-dashboard}

Sigue estos pasos para configurar tu cuenta utilizando el panel de PayU Enterprise.

1. **Crear la Configuración del Proveedor**

Un _proveedor_ almacena tus credenciales de procesamiento de pagos. Sigue estos pasos para configurar uno:

<span style="color: #A6C307; font-weight: bold;">1.1</span> En el panel de control de PayU Enterprise, navega a **Configurations** > **Providers**.

![PrintScreen](/assets/VTEX/vtex02.png)

<span style="color: #A6C307; font-weight: bold;">1.2</span> Haz clic en el módulo correspondiente al país o división que estás configurando.

<span style="color: #A6C307; font-weight: bold;">1.3</span> Completa los siguientes campos:

| Campo | Descripción |
|---|---|
| Configuration Name | Ingresa un nombre para la configuración del proveedor. |
| Description | Proporciona una descripción opcional. |
| apiLogin | Nombre de usuario o login proporcionado por PayU. [¿Cómo obtengo mi API Login?]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| apiKey| Clave única de tu comercio. [¿Cómo obtengo mi API Key?]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| accountId | ID de la cuenta de PayU basado en tu país de operación. |
| merchantId | Tu ID de comercio en PayU Latam. |
| paymentCountry | País de procesamiento en formato ISO 3166 Alpha-3. |
| cashRedirect | Selecciona `true` para asegurar el flujo correcto de órdenes con pagos en efectivo en VTEX.<br> **Nota:** Esta configuración es esencial para los comercios que procesan pagos en efectivo con VTEX. |

<span style="color: #A6C307; font-weight: bold;">1.4</span> Haz clic en **Create**.

<img src="/assets/VTEX/vtex03.png" alt="PrintScreen" style="width: 450px; height: auto;">
<br>

2. **Crear la Unidad de Negocio**

Una _unidad de negocio_ vincula la configuración del proveedor con las credenciales de la API de PayU Enterprise para procesar transacciones. Sigue estos pasos:

<span style="color: #A6C307; font-weight: bold;">2.1</span> En el panel de control, ve a **Configurations** > **Business Units**.

<img src="/assets/VTEX/vtex04.png" alt="PrintScreen" style="width: 400px; height: auto;">
<br>

<span style="color: #A6C307; font-weight: bold;">2.2</span> Haz clic en **Create Business Unit** e ingresa:
<br>

| Campo | Descripción |
|---|---|
| Business Unit Name | Debe estar en minúsculas y no contener espacios. **Este valor no se puede cambiar más tarde, así que asegúrate de que sea preciso.** |
| Description | Descripción opcional. |

<span style="color: #A6C307; font-weight: bold;">2.3</span> En la sección **Choose a Default Provider for This Business Unit**, selecciona la **Provider Configuration** creada en el Paso 1. Luego, haz clic en **Create**.

<img src="/assets/VTEX/vtex05.png" alt="PrintScreen" style="width: 700px; height: auto;">
<br>

3. **Crear el Webhook**

El webhook recibe notificaciones de VTEX cuando el estado de una transacción cambia. Sigue estos pasos:

<span style="color: #A6C307; font-weight: bold;">3.1</span> En el panel de control, navega a **Configurations** > **Webhooks**.

<img src="/assets/VTEX/vtex06.png" alt="PrintScreen" style="width: 400px; height: auto;">
<br>

<span style="color: #A6C307; font-weight: bold;">3.2</span> Haz clic en **Create a Webhook Endpoint** e ingresa la URL correspondiente a tu entorno:

* Pruebas: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Producción: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

<span style="color: #A6C307; font-weight: bold;">3.3</span> En la tabla **Payment Event Alerts**, activa el control deslizante **Update** para **Authorization** y **Charge**. Luego, en el campo **Associated Business Units**, ingresa la **Business Unit** creada en el paso anterior. Finalmente, haz clic en **Create**.

<img src="/assets/VTEX/vtex07.png" alt="PrintScreen" style="width: 600px; height: auto;">
<br>

En este punto, tu cuenta PayU Enterprise con PaymentsOS está completamente configurada. El siguiente paso es [configurar el proveedor en VTEX]({{< ref "#2-configuring-the-vtex-provider" >}}).

### 2. Configuración del Proveedor en VTEX {#2-configuring-the-vtex-provider}

Una vez que hayas configurado tu cuenta de PayU Enterprise, el siguiente paso es configurar el proveedor de VTEX para cada método de pago. Para continuar, debes tener una cuenta de usuario válida para acceder al administrador de VTEX.

#### Crear un Nuevo Proveedor

{{% alert title="Nota" color="info"%}}

Antes de crear el nuevo proveedor, asegúrate de haber configurado el fingerprint para PayU. Para hacerlo, consulta esta [guía](https://help.vtex.com/en/tutorial/configurar-fingerprint-para-payu).

{{% /alert %}}

1. Inicia sesión en el panel de administración de VTEX y ve a **Configuración de la tienda > Proveedores > Nuevo proveedor**:

![PrintScreen](/assets/VTEX/vtex08es.png)

2. Ubica **PayU** y selecciona **PayUv2**:

![PrintScreen](/assets/VTEX/vtex09es.png)

{{% alert title="Importante" color="warning"%}}

Asegúrate de seleccionar **PayUv2**, ya que esta guía aplica específicamente a esta versión.

{{% /alert %}}  

3. Completa el siguiente formulario:

![PrintScreen](/assets/VTEX/vtex10.png)

{{% alert title="Nota" color="info"%}}

La información del proveedor se puede obtener de dos maneras:
* **Colección de Postman:** Ejecuta el método **Retrieve Authentication Keys**, configurando el parámetro global `env` como `test` o `live`, dependiendo de tu entorno de procesamiento.
* **Panel de PayU Enterprise:** Navega a **Account > Business Units** y selecciona la Unidad de Negocio creada en [Configuración de tu Cuenta PayU Enterprise]({{< ref "#configuring-your-payu-enterprise-account" >}}). Usa el selector en la parte superior para elegir el entorno de procesamiento.<br>Algunos valores están ocultos por defecto; haz clic en el icono de ojo para revelarlos.

{{% /alert %}} 

| Campo | Descripción |
|---|---|
| App key | ID de la aplicación de la **Unidad de Negocio**. |
| App token | Clave API privada de la **Unidad de Negocio**. |
| Name | Nombre utilizado para identificar la **afiliación del Gateway**. |
| Enable test mode | Marca esta casilla para realizar transacciones de prueba. |
| Automatic settlement | Elige cómo capturar (cobrar) los pagos:<br><ul style="margin-bottom: initial;"><li>Para un flujo de una sola etapa, selecciona `Captura automática inmediatamente después de la autorización del pago`.</li><li>Para un flujo de dos etapas, selecciona `Desactivado: No se captura automáticamente` para capturar los pagos al momento de la facturación.</li><li>Para programar la captura automática, selecciona `Programado: Programa la captura automática` y define un plazo en horas.</li></ul><br>Para más detalles, consulta [Funcionalidad de Captura Automática Personalizada](https://developers.vtex.com/vtex-rest-api/docs/custom-auto-capture-feature).<br>El plazo predeterminado para la captura automática es de siete (7) días después de la aprobación. |
| Enable payout split and send payment recipients? | Selecciona `No`. |
| Tipo Autorizacion | Elige entre flujos de pago de una o dos etapas:<br><ul style="margin-bottom: initial;"><li>Para un flujo de una etapa, selecciona `Autorización y Captura`.</li><li>Para un flujo de dos etapas, selecciona `Pre-Autorización`.</li></ul><br>Consulta la sección [Flujos de pago]({{< ref "payments.md#payment-flows" >}}) para más información. |
| Tipo de devolución | Determina cómo se procesa la devolución cuando se inicia una devolución desde VTEX:<br><ul style="margin-bottom: initial;"><li>Selecciona `Automático siempre que sea posible` para solicitar la devolución automáticamente a través de PayU, procesada por el emisor de la tarjeta. Esta opción aplica solo a pagos con tarjeta.</li><li>Selecciona `Manual a cargo del comercio` para procesar la devolución manualmente mediante métodos alternativos (por ejemplo, efectivo, crédito en tienda o cambios de producto).</li></ul><br> |
| Public Key | Clave API pública de la **Unidad de Negocio**. |
| Idioma | Selecciona el idioma para la emisión de pedidos. Idiomas compatibles:<br><ul style="margin-bottom: initial;"><li>Español</li><li>Inglés</li><li>Portugués</li></ul> |
| Expiración pago (días) | Define el período de validez para pagos en efectivo.<br>**Importante:** Este valor debe coincidir con el campo **Validez del pagaré** en la sección [Configuración de métodos de pago en efectivo]({{< ref "#configuring-cash-payment-methods" >}}). |

4. Haz clic en **Guardar** para completar la configuración.

#### Configuración de Capturas en un Flujo de Dos Pasos

Esta sección explica cómo capturar órdenes autorizadas en VTEX V2 usando un flujo de pago en dos pasos (autorización seguida de captura). Incluye una guía paso a paso para capturar el monto total o parcial de una orden.

##### Requisitos Previos

Antes de poder capturar órdenes, asegúrate de que se cumplan las siguientes configuraciones:

* **Configuración de la Cuenta PayU:** Tu cuenta PayU debe estar habilitada para el [procesamiento en dos pasos]({{< ref "payments.md#payment-flows" >}}). Para más información sobre cómo habilitar este flujo de pago, contacta a tu representante de ventas de PayU.
* **Afiliación de Pago en VTEX (PayUv2):** La afiliación del proveedor de pagos PayUv2 en VTEX debe estar configurada para procesamiento en dos pasos, lo cual implica **autorización** seguida de **liquidación** (captura).
    * **Liquidación automática:** Establecida en `Deshabilitado`.
    * **Tipo de autorización:** Establecida en `Pre-Autorización`.

<p>

<img src="/assets/VTEX/vtex30.png" alt="PrintScreen" style="width: 500px;">

<p>

{{% alert title="Nota" color="info"%}}

Si no planeas capturar montos menores o mayores que la autorización original, puedes habilitar la **Liquidación automática** para capturar la orden inmediatamente después de la autorización, o programar la captura definiendo un plazo en horas.

{{% /alert %}}

* **Condición de Pago:** Asegúrate de que la condición de pago relevante esté habilitada con la afiliación PayUv2.

<img src="/assets/VTEX/vtex31.png" alt="PrintScreen" style="width: 400px;">

##### Iniciar una Captura

Una vez que una orden tenga una **autorización aprobada**, sigue estos pasos en tu panel de administración de VTEX:

1.  **Accede a la Orden:** Abre tu panel de administración de VTEX y selecciona la orden autorizada.
2.  **Actualiza el Estado de la Orden:**
    * Si el estado de la orden es "Ventana de cancelación", haz clic en el botón "**Listo para gestionar**" para actualizarlo.
    * Luego, actualiza la orden usando la opción "**Iniciar gestión**".

Después de completar estos pasos, el estado de la orden cambiará a "**En gestión**", lo que indica que está lista para ser capturada. Luego podrás capturar el monto total o un monto modificado (menor o mayor).

##### Capturar el Monto Total

Para capturar el **monto total autorizado**:

1.  Selecciona la opción **Factura** en la orden.

<img src="/assets/VTEX/vtex32.png" alt="PrintScreen" style="width: 650px;">

<br>

2.  Elige **Enviar factura única**.
3.  Ingresa el **número de factura** en la sección de detalles.
4.  Haz clic en **Guardar factura**.

Una vez completado, el proceso de liquidación finalizará y se capturará el monto total autorizado de la orden.

##### Capturar un Monto Menor o Mayor

VTEX ofrece dos métodos para capturar un monto diferente al autorizado originalmente:

**A) Cambiar los Ítems de la Orden**

Este método te permite ajustar los ítems de la orden para reflejar el monto de captura deseado.

1.  Navega a **facturación pendiente** dentro de la orden.

<img src="/assets/VTEX/vtex33.png" alt="PrintScreen" style="width: 500px;">

<br>

2.  Selecciona la opción **Cambiar ítems**.
3.  **Ajusta los Ítems:**
    * Para capturar un **monto menor**, reduce la cantidad de ítems existentes o elimínalos.
    * Para capturar un **monto mayor**, aumenta la cantidad de ítems o agrega nuevos.
4.  **Finaliza la Captura:**
    * Después de modificar los ítems, selecciona la opción **Factura** en la orden.
    * Elige **Enviar factura única**.
    * Ingresa el **número de factura** en los detalles.
    * Haz clic en **Guardar factura**.

Esta acción completará la liquidación y la integración capturará el monto modificado.

**B) Cambiar el Monto Final de la Orden**

Este método permite ajustar directamente el valor total de la orden.

1.  Ve a la orden y selecciona la opción **Cambiar monto final**.

<img src="/assets/VTEX/vtex34.png" alt="PrintScreen" style="width: 350px;">

<br>

2.  **Ajusta el Monto:**
    * Para capturar un **monto menor**, ingresa el valor que deseas descontar del total.
    * Para capturar un **monto mayor**, ingresa el valor con el que deseas aumentar la orden.
3.  **Finaliza la Captura:**
    * Después de modificar el monto, selecciona la opción **Factura** en la orden.
    * Elige **Enviar factura única**.
    * Ingresa el **número de factura** en los detalles.
    * Haz clic en **Guardar factura**.

Esto completará la liquidación en VTEX.

##### Comprendiendo las Transacciones en PayU después de la Captura

Así se mostrarán las transacciones en PayU según las acciones de captura que realices:

* **Captura del Monto Total (Sin Ajustes):** Si no ajustaste el valor de la orden, verás dos transacciones en PayU: una **autorización** y una **captura** por el valor total.
* **Captura de un Monto Menor:** Si ajustaste la orden para capturar un monto menor, verás dos transacciones en PayU: una **autorización** y una **captura parcial**.
* **Captura de un Monto Mayor:** Si el monto capturado es mayor, verás cuatro transacciones: la **autorización inicial** y su **captura**, más una **autorización adicional** por el monto excedente y su respectiva **captura**.

#### Configuración de Métodos de Pago {#configuring-payment-methods}

Configura los métodos de pago que se mostrarán en el sitio web durante el proceso de pago. [Consulta los métodos de pago disponibles]({{< ref "Select-your-payment-method.md" >}}).

{{% alert title="Importante" color="warning"%}}

* Los cambios en las condiciones de pago pueden tardar hasta 10 minutos en reflejarse en el flujo de pago.
* PIX no está disponible para Brasil cuando se utiliza VTEX.

{{% /alert %}}

##### Configuración de Tarjetas de Crédito o Débito {#configuring-credit-or-debit-cards}

Dependiendo de tu [país de procesamiento]({{< ref "Select-your-payment-method.md" >}}), puedes configurar la afiliación que creaste para utilizar tarjetas de crédito o débito<sup>*</sup>. Sigue los pasos a continuación para agregar este método de pago a tu tienda VTEX.

<sup>*</sup> _La disponibilidad de tarjetas de débito depende de tu país de procesamiento._

{{% alert title="Importante" color="warning"%}}

Haz clic [aquí](#configuring-co-branded-or-private-label-cards) para aprender a configurar tarjetas Co-branded o Private Label.

{{% /alert %}}

1. Inicia sesión en el panel de administración de VTEX y ve a **Transacciones > Pagos > Configuración**. 

2. Selecciona la pestaña **Condiciones de pago** y haz clic en el icono de suma.

![PrintScreen](/assets/VTEX/vtex11es.png)

3. Selecciona el método de pago que deseas agregar. Los métodos de pago están agrupados por tipo.<br>Para este ejemplo, seleccionamos **American Express** en la sección de **Tarjeta de Crédito**.

![PrintScreen](/assets/VTEX/vtex12es.png)

4. Proporciona los siguientes detalles:
* **Nombre de la regla (para identificarla rápidamente)**: Ingresa un nombre descriptivo para la condición de pago.
* **Status**: Configura el estado de la condición de pago. Solo puedes tener **una** condición de pago activa por método de pago.
* **Procesar con afiliación**: Selecciona la afiliación de gateway previamente configurada.
* **¿Pago al contado o en cuotas?**: Selecciona **Al contado**.

![PrintScreen](/assets/VTEX/vtex13es.png)

5. Haz clic en **Guardar**. La nueva condición ahora aparecerá en la pestaña **Condiciones de pago**.

![PrintScreen](/assets/VTEX/vtex14es.png)

##### Configuración de Tarjetas Co-Branded o Private Label {#configuring-co-branded-or-private-label-cards}

Las tarjetas co-branded y private label son tarjetas de crédito emitidas por una tienda o marca, a veces en asociación con redes como AMEX, VISA o MasterCard. Sigue estos pasos para agregar este método de pago a tu tienda VTEX.

1. Inicia sesión en el panel de administración de VTEX y ve a **Transacciones > Pagos > Configuración**. 

2. Selecciona la pestaña **Pagos personalizados**.

![PrintScreen](/assets/VTEX/vtex15es.png)

3. La pestaña **Pagos personalizados** proporciona cinco (5) espacios para configurar tarjetas co-branded y private label. En este ejemplo, configuramos la tarjeta colombiana Codensa, que es una tarjeta private label.<br>Haz clic en cualquier cuadro disponible en la sección **Tarjeta de tienda (red propia)**.

![PrintScreen](/assets/VTEX/vtex16es.png)

4. Ingresa los siguientes detalles de la tarjeta, manteniendo el formato exacto:

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

5. Haz clic en **Guardar**. Después de crear el pago personalizado, serás redirigido a la opción para crear una **Condición de pago**. Sigue las instrucciones en la sección [Configuración de Tarjetas de Crédito o Débito](#configuring-credit-or-debit-cards) para completar este paso.

##### Configuración de Google Pay {#configuring-google-pay}

Google Pay es una billetera digital que permite a los clientes completar transacciones de forma rápida y segura utilizando las tarjetas guardadas en sus cuentas de Google. Integrar Google Pay en tu tienda VTEX a través de PayU ayuda a mejorar la experiencia de compra, reducir la fricción en el proceso de pago y aumentar las tasas de conversión.

{{% alert title="Nota" color="info"%}}

Cuando los clientes pagan con Google Pay, PayU procesa la transacción como un pago estándar con tarjeta de crédito o débito, según el tipo de tarjeta. No se aplican tarifas adicionales más allá de las que ya se hayan acordado.

{{% /alert %}}

**Requisitos previos:**

* Asegúrate de que Google Pay esté activo en tu cuenta de PayU. Contacta a tu ejecutivo de cuenta de PayU o envía un correo electrónico a [tecnico.co@payu.com](mailto:tecnico.co@payu.com) si tienes preguntas sobre este requisito, mencionando que eres un comercio de VTEX solicitando Google Pay.
* Los pagos con tarjeta deben estar habilitados en tu configuración de VTEX.
* PayU debe estar configurado como el proveedor de pagos para las transacciones con tarjeta de crédito en tu tienda VTEX.

**Paso a Paso:**

1. Inicia sesión en el panel de administración de VTEX y ve a **Configuración de la tienda > Carteras digitales**.

2. Busca la opción de Google Pay y activa el control deslizante.

3. Cuando se te solicite, confirma la activación haciendo clic en **Activar**.

<video width="640" height="480" controls>

<source src="/assets/VTEX/Videos/video02es.mp4" >  

</video>

<p>

Una vez activado, Google Pay estará disponible como opción de pago en el checkout de tu tienda. Puede tardar hasta 10 minutos en aparecer como método de pago.

Para más información y buenas prácticas, consulta la guía oficial de VTEX sobre cómo habilitar billeteras digitales en el <a href="https://help.vtex.com/en/tracks/digital-wallet-e-wallet" target="_blank">Centro de ayuda de VTEX</a>.

##### Configuración de Métodos de Pago en Efectivo {#configuring-cash-payment-methods}

Dado que los pagos en efectivo requieren que los clientes realicen el pago en ubicaciones físicas, puedes configurar este método de pago en VTEX como notas promisorias (_Notes Payables_).

Cuando configuras un método de pago en efectivo, los clientes son redirigidos al checkout de PayU, donde pueden descargar el comprobante de pago y realizarlo en la ubicación física correspondiente. Sigue las instrucciones a continuación para agregar este método de pago a tu tienda VTEX.

**Consideraciones:**

* Asegúrate de que todos los métodos de pago que deseas configurar estén habilitados en tu cuenta de PayU, y que **sus nombres coincidan exactamente con los registrados en PayU**. Los métodos que no estén habilitados o con nombres incorrectos generarán errores en las transacciones. Si necesitas ayuda para habilitar métodos de pago o billeteras específicas,  
  <a href="https://colombia.support.payu.com/s/?language=es" target="_blank" rel="noopener noreferrer">contáctanos</a>.
* Para **Boleto Bancário** en Brasil, este procedimiento no es necesario. Simplemente localiza y configura este método de pago como una condición de pago.

**Paso a Paso:**

1. Inicia sesión en el panel de administración de VTEX y ve a **Transacciones > Pagos > Configuración**.

2. Selecciona la pestaña **Pagos personalizados**.

![PrintScreen](/assets/VTEX/vtex15es.png)

3. En esta pestaña, tienes cinco (5) espacios disponibles para configurar métodos de pago en efectivo. En este ejemplo, configuraremos OXXO, un método de pago en efectivo en México.<br>Haz clic en cualquier cuadro disponible en la sección **Pagarés**.

![PrintScreen](/assets/VTEX/vtex18es.png)

4. Proporciona la siguiente información:

* **Nombre**: Usa el valor listado [aquí]({{< ref "select-your-payment-method.html" >}}) en la columna del parámetro `paymentMethod`. Para este ejemplo, ingresa `OXXO`.
   * **Descripción**: Ingresa una descripción que se mostrará cuando el cliente seleccione este método de pago (opcional).
   * **Fecha de vencimiento de la nota promisoria**: Especifica el número de días antes de que expire el pago en efectivo. El valor predeterminado es de 7 días. Asegúrate de que este valor coincida con la configuración **Expiración pago (días)** en la afiliación de VTEX para evitar problemas de procesamiento.

Deja los demás campos con sus valores predeterminados.

5. Haz clic en **Guardar**. Una vez creado el pago personalizado, serás redirigido para configurar una nueva **Condición de pago**. Sigue las instrucciones en la sección [Configuración de Tarjetas de Crédito o Débito](#configuring-credit-or-debit-cards).

##### Configuración de Nequi {#configuring-nequi}

Agregar Nequi como método de pago le permite a tu negocio llegar a millones de usuarios que prefieren billeteras digitales, ofreciéndoles una forma de pago más rápida, segura y conveniente. Esto puede ayudarte a incrementar las ventas, fortalecer la lealtad de los clientes y garantizar transacciones seguras.  

Antes de comenzar, asegúrate de que Nequi esté habilitado en tu cuenta de PayU y de que **el nombre del método de pago coincida exactamente con el registrado en PayU**. Cualquier discrepancia o estado inactivo generará errores en las transacciones. Si necesitas ayuda para habilitar Nequi, por favor <a href="https://colombia.support.payu.com/s/?language=es" target="_blank" rel="noopener noreferrer">contáctanos</a>.  

**Paso a paso:**

1. Ingresa al panel de administración de VTEX y dirígete a **Transacciones > Pagos > Configuración**.  

2. Selecciona la pestaña **Condiciones de Pago** y haz clic en el ícono de **más**.  

   ![PrintScreen](/assets/VTEX/vtex11es.png)  

3. Busca **NequiPayu** usando la barra de búsqueda y selecciónalo para abrir la interfaz de configuración.

![PrintScreen](/assets/VTEX/vtex35.png)

4. En la interfaz de configuración:
   - Define **NEQUI** como el nombre de la condición
   - Selecciona el proveedor
   - Habilita el método de pago

![PrintScreen](/assets/VTEX/vtex36es.png)

5. Haz clic en **Guardar**. Verifica que Nequi aparezca en la pestaña **Condiciones de Pago**.  

   ![PrintScreen](/assets/VTEX/vtex37es.png)  

6. Una vez configurado, Nequi estará disponible como opción de pago en el checkout de VTEX. Ten en cuenta que puede tardar hasta **10 minutos** en hacerse visible.  

##### Configuración de Yape {#configuring-yape}

Agregar Yape como método de pago conecta tu negocio con millones de usuarios en Perú que prefieren billeteras digitales, ofreciéndoles una forma de pago simple, segura y conveniente usando solo su número de teléfono. Esto te ayuda a incrementar las ventas, atraer nuevos clientes y ofrecer transacciones respaldadas por el BCP (Banco de Crédito del Perú).  

**Consideraciones:**  

* Asegúrate de que Yape esté habilitado en tu cuenta de PayU y de que **el nombre del método de pago coincida exactamente con el registrado en PayU**. Cualquier discrepancia o estado inactivo generará errores en las transacciones. Si necesitas ayuda para habilitar Yape, por favor <a href="https://colombia.support.payu.com/s/?language=es" target="_blank" rel="noopener noreferrer">contáctanos</a>.  
* Verifica que tu tienda en VTEX esté construida con **VTEX IO** o **FastStore**. Luego, instala la aplicación **Pop-up for Online Payment with Yape** accediendo a la URL de configuración. Reemplaza `{vtexaccount}` en la URL con el nombre de tu cuenta VTEX (es decir, el subdominio que usas para acceder al panel de administración de VTEX):
    `https://{vtexaccount}.myvtex.com/admin/apps/payulatam.yape-payment-app-payuv2@1.3.0/setup`
    <br>**Ejemplo:**
    <br>Si tu cuenta VTEX es `payulatam`, la URL sería:
    <br>`https://payulatam.myvtex.com/admin/apps/payulatam.yape-payment-app-payuv2@1.3.0/setup`

**Paso a paso:**  

1. Ingresa al panel de administración de VTEX y dirígete a **Transacciones > Pagos > Configuración**.  

2. Selecciona la pestaña **Condiciones de Pago** y haz clic en el ícono de **más**.  

   ![PrintScreen](/assets/VTEX/vtex11es.png)  

3. Busca **YapePayu** usando la barra de búsqueda y selecciónalo para abrir la interfaz de configuración.  

   ![PrintScreen](/assets/VTEX/vtex38.png)  

4. En la interfaz de configuración:
   - Define **YAPE** como el nombre de la condición
   - Selecciona el proveedor
   - Habilita el método de pago

   ![PrintScreen](/assets/VTEX/vtex39es.png)  

5. Haz clic en **Guardar**. Verifica que Yape aparezca en la pestaña **Condiciones de Pago**.  

   ![PrintScreen](/assets/VTEX/vtex40es.png)  

6. Una vez configurado, Yape estará disponible como opción de pago en el checkout de VTEX. Ten en cuenta que puede tardar hasta **10 minutos** en hacerse visible.  

##### Configuración de PSE {#configuring-pse}

**Requisitos previos:**
* Este método de pago solo está disponible para comercios que procesan en Colombia.
* Para ofrecer PSE como método de pago, debes instalar la **aplicación PSE desarrollada por VTEX**. Si aún no lo has hecho, ve a **Configuración de la cuenta > Apps > App Store** y busca **Banks for PSE**. <br>Si la aplicación no está disponible en la tienda, puedes solicitar su instalación al equipo de VTEX enviando un ticket en [VTEX Support](https://help.vtex.com/en/support).
* Si utilizas una integración VTEX Legacy, VTEX debe realizar una configuración adicional antes de que puedas configurar este método de pago. Contacta a tu representante de VTEX o solicita asistencia a través de [VTEX Support](https://help.vtex.com/en/support).

{{% alert title="Nota" color="info"%}} 

Para obtener más información, consulta los siguientes recursos de VTEX:
- [Información general sobre PSE](https://help.vtex.com/en/announcements/pse-medio-de-pago-para-clientes-en-colombia--4T22CHOcEV3Nb2RtkJZOFB)
- [Configurar pagos con PSE en VTEX](https://help.vtex.com/en/tutorial/configurar-pago-con-pse--7dRChubn7TqdEyWrHQEQp6)
- [Aplicación Banks for PSE](https://apps.vtex.com/vtexlatam-banks-for-pse/p)  

{{% /alert %}}

**Paso a Paso:**

1. Inicia sesión en el panel de administración de VTEX y ve a **Configuración de la tienda > Pagos > Configuración > Condiciones de pago**. Luego, sigue estos pasos:

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.1</span> Haz clic en el botón **+**.

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.2</span> En la categoría **Otros**, localiza **PSE**.

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.3</span> Completa los siguientes campos:

&nbsp;&nbsp;&nbsp; <span style="color: #A6C307; font-weight: bold;">•</span> **Nombre de la regla**: Ingresa un nombre descriptivo para identificar este método de pago. <br>
&nbsp;&nbsp;&nbsp; <span style="color: #A6C307; font-weight: bold;">•</span> **Procesar con afiliación**: Selecciona la afiliación de gateway configurada para procesar pagos con PayUV2. <br>
&nbsp;&nbsp;&nbsp; <span style="color: #A6C307; font-weight: bold;">•</span> **Estado**: Activa la condición de pago.

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.4</span> Haz clic en **Guardar** para aplicar la configuración.

   <video width="630" height="300" controls>
      <source src="/assets/VTEX/Videos/Video01.mp4" type="video/mp4">  
   </video>

<p>

2. Configura la aplicación Banks for PSE con tus credenciales de PayU siguiendo estos pasos:

&nbsp; <span style="color: #A6C307; font-weight: bold;">2.1</span> Inicia sesión en el panel de administración de VTEX y ve a **Apps > Apps instaladas > Banks for PSE**.

&nbsp; <span style="color: #A6C307; font-weight: bold;">2.2</span> Completa el formulario y haz clic en **Guardar**.

| Campo | Descripción |
|---|---|
| **Conector utilizado para procesar PSE** | Selecciona **PayUv2** en la lista desplegable. |
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
* Verifica que el **Selector de Entorno** en tu **Afiliación de Gateway en VTEX** esté configurado en modo `TEST`.
* Usa las credenciales de prueba adecuadas al configurar la **Afiliación de Gateway en VTEX**. Puedes encontrar las credenciales de prueba [aquí](https://developers.payulatam.com/latam/en/docs/getting-started/test-your-solution.html).
* Una vez finalizadas las pruebas, actualiza la configuración con la información de producción, incluyendo tu cuenta de PayU Enterprise, el selector de entorno en la afiliación de VTEX y las credenciales.

### Pasos para Realizar una Transacción de Prueba

1. Inicia sesión en el panel de administración de VTEX y haz clic en **Visite la tienda** en el menú superior.

   ![PrintScreen](/assets/VTEX/vtex20es.png)

2. Se abrirá la tienda configurada para tu cuenta de VTEX. Selecciona cualquier producto y procede con la compra.

   ![PrintScreen](/assets/VTEX/vtex21.png)

3. En el carrito de compras, haz clic en el botón **Realizar Pedido**.

   ![PrintScreen](/assets/VTEX/vtex22.png)

4. En la sección de pago, los métodos de pago disponibles aparecerán agrupados por tipo. Selecciona el que deseas probar e ingresa los datos de prueba. Puedes encontrar los números de tarjeta de prueba y la información relevante [aquí]({{< ref "Test-your-solution.md#test-cards" >}}).  
   Finalmente, haz clic en **Finalizar Compra**.

   ![PrintScreen](/assets/VTEX/vtex23.png)

### Verificación de la Transacción

Una vez aprobada la compra, puedes verificar la transacción en los siguientes lugares:

* **Administrador de VTEX**: Selecciona **Transacciones > Pagos > Transacciones**.

   ![PrintScreen](/assets/VTEX/vtex24es.png)

* **Panel de control de PayU Enterprise**: Ve a **Pagos > Buscar**.

   ![PrintScreen](/assets/VTEX/vtex25es.png)  
   
   {{% alert title="Nota" color="info"%}}

   El parámetro **ID Externo de Transacción** dentro de **Actividad de la Transacción** corresponde al ID de la orden en PayU.

   {{%/ alert %}}

* **Panel de gestión de PayU**: Revisa la transacción en el módulo [**Reporte de Ventas**]({{< ref "Sales-report.md" >}}).

   ![PrintScreen](/assets/VTEX/vtex26.png)

* **[API de Consultas]({{< ref "Queries.md" >}})**: Usa el **External Transaction ID** como parámetro `OrderID`.

## Prueba de Flujos en Dos Pasos

Si tu **Afiliación de Gateway** está configurada para procesar transacciones mediante un flujo en dos pasos, los fondos autorizados en la tarjeta de crédito no se liquidan hasta que solicites explícitamente la liquidación. Para completar la liquidación, debes facturar el pedido.

### Pasos para Facturar un Pedido

1. Ubica la transacción en el **Administrador de VTEX** en **Transacciones > Pagos > Transacciones** y haz clic en ella.  
   Luego, haz clic en el botón **Pedido** en la esquina superior derecha.

   ![PrintScreen](/assets/VTEX/vtex27es.png)

2. Desplázate hacia abajo hasta la sección **Paquete** y haz clic en **Facturar paquete**.

   ![PrintScreen](/assets/VTEX/vtex28es.png)

3. Ingresa los detalles de la factura y haz clic en **Enviar factura**.  
   Una vez enviada la factura al cliente, el monto autorizado se cobra en la tarjeta del cliente.

   ![PrintScreen](/assets/VTEX/vtex29es.png)

{{% alert title="Nota" color="info"%}}

Un pedido autorizado puede cancelarse usando el botón **Cancelar pedido** en los detalles del pedido.  
Cuando un pedido se cancela, PayU envía una transacción de _void_, que se registra tanto en PayU Enterprise como en PayU Latam.

{{% /alert %}}
