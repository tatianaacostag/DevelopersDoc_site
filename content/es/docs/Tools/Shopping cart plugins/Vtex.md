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

2. Luego de ejecutar la colección, necesitas configurar los globales. Descarga el archivo de globales <a href="/assets/globals/VTEX Hub.postman_globals.json" download>aquí</a>.

3. En la colección de Postman, haz clic en _**Import**_ junto al nombre de tu workspace y localiza el archivo json descargado previamente.

4. Cuando termine, haz click en _**Import**_.

5. Es obligatorio ejecutar los métodos de la colección en el orden mostrado. Primero, haz click en el método `POST` llamado `1. Login` y abre la pestaña _**Body**_.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_01.png)

6. Ingresa el correo electrónico (_**email**_) y la contraseña (_**password**_) de tu cuenta de PaymentsOS. Luego, haz clic en _**Send**_.

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

1. Crea la Configuración de proveedor.<br>
En el panel de control de PaymentsOS, expande el menú _**Cuenta**_, luego selecciona _**Servicios**_.

![PrintScreen](/assets/VTEX/VTEX_01_es.png)

Utiliza el campo _**Buscar**_ en la sección _**Crea una nueva configuración de proveedor**_ e ingresa _PayU_ para encontrar el proveedor _PayU Latam_.

![PrintScreen](/assets/VTEX/VTEX_02_es.png)

Ingresa la siguiente información para la _**Configuración de proveedor**_:

| Parámetro | Descripción |
|---|---|
| Nombre de Configuración | Ingresa un nombre para la _**Configuración de proveedor**_. |
| Descripción | Ingresa una descripción significativa para la _**Configuración de proveedor**_.<br>Este valor es opcional. |
| apiLogin | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| apiKey| Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
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
| Nombre de la Unidad de negocio | Nombre de la _**Unidad de Negocio**_. Este nombre debe estar en minúsculas y sin espacios.<br>_Asegúrate de haber ingresado el valor correcto para el nombre ya que este valor no se puede actualizar después_. |
| Descripción | Ingresa una descripción significativa para la _**Unidad de Negocio**_.<br>Este valor es opcional. |

En la sección _**Selecciona un proveedor por defecto para esta Unidad de Negocio**_, escoge la _**Configuración de proveedor**_ creada en el paso anterior.<br>Cuando termines, haz clic en _**Crear**_.

![PrintScreen](/assets/VTEX/VTEX_05_es.png)

3. Crea el Webhook. Este WebHook es la URL de confirmación que va a recibir las notificaciones enviadas por VTEX cuando una transacción cambia de estado.<br>

De vuelta en el panel de control de PaymentsOS, expande el menú _**Cuenta**_ y selecciona _**Webhooks**_.

![PrintScreen](/assets/VTEX/VTEX_06_es.png)

Haz click en el botón _**Crear URL de confirmación (Webhook)**_ e ingresa la URL de acuerdo con tu ambiente:
* Test: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Live: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

En la tabla _**Alertas de eventos transaccionales**_, activa el evento _**Update**_ para _**Authorization**_ y _**Charge**_. Además, selecciona en el combo _**Unidades de Negocio Asociadas**_ la _**Unidad de Negocio**_ creada en el paso anterior.<br>Cuando termines, haz clic en _**Crear**_.

![PrintScreen](/assets/VTEX/VTEX_07_es.png)

En este punto, has configurado tu cuenta de PaymentsOS como middleware, el siguiente paso es la [configuración del proveedor de VTEX]({{< ref "#2-configure-the-vtex-provider" >}}).

### 2. Configurar el proveedor de VTEX {#2-configure-the-vtex-provider}
Una vez hayas configurado tu cuenta de PaymentsOS, el siguiente paso es la configuración del proveedor de VTEX para cada método de pago. Para este paso, es obligatorio que tengas un usuario válido para acceder al admin de VTEX.

#### Configurar la afiliación de Gateway {#configure-the-gateway-affiliation}
Antes de configurar la _**afiliación de Gateway**_, asegurate de haber configurado FingerPrint para PayU. Para esto, consulta este [artículo](https://help.vtex.com/es/tutorial/configurar-fingerprint-para-payu).

1. En el admin de VTEX, expande el menú _**Pagos**_ dentro del grupo _**Transacciones**_. Luego, selecciona _**Configuración**_.

![PrintScreen](/assets/VTEX/VTEX_08_es.png)

2. Antes de continuar con las Condiciones de pago, debes crear una afiliación a nuestra pasarela (gateway). En el panel superior, haz clic en _**Afiliaciones de Gateway**_.

![PrintScreen](/assets/VTEX/VTEX_09_es.png)

3. Haz clic en el icono de más. Desplázate a la sección _**OTROS**_ y localiza el conector _**PayUv2**_.

![PrintScreen](/assets/VTEX/VTEX_10_es.png)

{{% alert title="Importante" color="warning"%}}
Asegúrate de seleccionar el conector _**PayUv2**_, el procedimiento explicado en esta guía aplica específicamente a este conector.
{{% /alert %}}  

4. En la configuración del conector, debes instalarlo haciendo clic en el botón _**Instalar app**_. Luego, ingresa la siguiente información.

![PrintScreen](/assets/VTEX/VTEX_11_es.png)

{{% alert title="Nota" color="info"%}}
La información del conector puede ser obtenida a través de lo siguiente:
* Utilizando la colección de Postman.<br>Ejecuta el método **Retrieve Authentication Keys** asignando el parámetro global `env` en `test` o `live` de acuerdo con tu ambiente de procesamiento.
* Utilizando el Panel de Control de PaymentsOS.<br>Ve _**Cuenta**_ > _**Unidades de negocio**_ y selecciona la unidad de negocio que creaste en el paso [anterior]({{< ref "#1-configure-your-paymentsos-account" >}}). Recuerda que debes utilizar el selector en la parte superior para escoger el ambiente de procesamiento.<br>Algunos valores están ocultos por defecto, haz clic en el icono de ojo para mostrarlos.
{{% /alert %}} 

| Campo | Descripción |
|---|---|
| Nombre de afiliación | Nombre que quieres asignar para identificar la _**Afiliación de Gateway**_. |
| Selector de ambiente | Selecciona el ambiente donde quieres crear las transacciones.<br>De acuerdo con la selección que hagas aquí, debes ingresar otros parámetros seleccionando el mismo ambiente en PaymentsOS. |
| Application Key | ID de la aplicación de la _**Unidad de negocio**_. |
| Application Token | Llave de API Privada de la _**Unidad de negocio**_. |
| Captura automática de pago | Selecciona cómo quieres realizar la captura (cobro) en tu afiliación.<br><ul style="margin-bottom: initial;"><li>Para flujos en un paso, selecciona `Inmediatamente: captura automática al autorizar el pago`.</li><li>Para flujos de dos pasos, selecciona `Desactivado: no capturado automáticamente` para ejecutar la captura una vez factures la orden.</li><li>Selecciona `Programado: establece cuándo se realizará la captura automática` para configurar un tiempo en horas para capturar la orden automáticamente.</li></ul><br>Para más información, consulta [Función de captura automática personalizada (en inglés)](https://developers.vtex.com/vtex-rest-api/docs/custom-auto-capture-feature) en la documentación de desarrolladores.<br>EL valor por defecto de esta opción es siete (7) días luego de la aprobación. |
| Periodo de tiempo programado en horas para la captura automática | Este campo aparece cuando seleccionas `Programado: establece cuándo se realizará la captura automática` como el método de captura del pago; selecciona el periodo programado que deseas configurar de acuerdo con tu configuración. Este valor debe ser entero, por lo tanto, no se permiten decimales. |
| Tipo Autorizacion | Selecciona su tus transacciones de pago son ejecutadas en flujos de uno o dos pasos.<br><ul style="margin-bottom: initial;"><li>Para flujos de un paso, selecciona `Autorizacion y Captura`.</li><li>Para flujos de dos pasos, selecciona `Pre-Autorizacion`.</li></ul><br>Consulta el siguiente [enlace]({{< ref "payments.md#payment-flows" >}}) para conocer más de flujos de pago. |
| Public Key | Llave de API Pública de la _**Unidad de negocio**_. |
| ¿Activar split y enviar receptores?  | Selecciona `No` en este campo. |

Cuando termines, haz clic en _**Guardar**_.

#### Configurar medios de pago {#configure-payment-methods}
Configure los métodos de pago que se mostrarán en el sitio web para el pago. [Consulte nuestros métodos de pago disponibles]({{< ref "Select-your-payment-method.md" >}}).

{{% alert title="Importante" color="warning"%}}
* PSE (Método colombiano de transferencia bancaria) no está soportado en esta versión del conector. Si necesitas configurar este método de pago, consulta el [procedimiento para instalar la versión 1 del conector](https://help.vtex.com/es/tutorial/setting-up-payu-gateway--36zWOAFHmwIAoWIEU2Y08q).
* PIX no está disponible en Brasil utilizando VTEX.
* Los cambios en las condiciones de pago pueden tardar hasta 10 minutos en aplicarse al flujo de pago.
{{% /alert %}}

##### Configurar tarjetas débito o crédito {#configure-credit-or-debit-cards}
De acuerdo con tu [país de procesamiento]({{< ref "Select-your-payment-method.md" >}}), puedes configurar la afiliación que creaste para utilizar tarjetas crédito o débito<sup>*</sup>. Sigue estas instrucciones para agregar este medio de pago en tu tienda VTEX.

<sup>*</sup> _El uso de tarjetas de débito depende de tu país de procesamiento._

{{% alert title="Importante" color="warning"%}}
Haz clic [aquí](#configure-co-branded-or-private-labels-cards) si quieres saber cómo configurar tarjetas de marca compartida o privada 
{{% /alert %}}

1. En la opción de Configuración (_**Transacciones**_ > _**Pagos**_ > _**Configuración**_), selecciona la pestaña _**Condiciones de pago**_ y haz clic en el icono más.

![PrintScreen](/assets/VTEX/VTEX_12_es.png)

2. Selecciona el medio de pago que deseas incluir. Los medios de pago están agrupados por su tipo.<br>Para nuestro ejemplo, seleccionamos _**American Express**_ en la sección Tarjeta de Crédito.

![PrintScreen](/assets/VTEX/VTEX_13_es.png)

3. Ingresa la siguiente información.
* **Nombre de la Regla (para ayudar a identificar rápidamente)**: ingresa un nombre significativo para la condición de pago junto al medio de pago que seleccionaste.
* **Status**: selecciona el estado de la condición de pago. Solo puedes tener **una** condición de pago activa por medio de pago.
* **Procesar con afiliación**: select the gateway affiliation configured before.
* **Pago al contado o en cuotas?**: selecciona _**Al contado**_<sup>\*</sup>.

![PrintScreen](/assets/VTEX/VTEX_14_es.png)

4. Haz clic en _**Guardar**_. Cuando hayas creado la condición de pago, esta se lista en la pestaña _**Condiciones de pago**_.

![PrintScreen](/assets/VTEX/VTEX_15_es.png)

##### Configurar tarjetas de marca compartida o privada {#configure-co-branded-or-private-labels-cards}  
Las tarjetas de marca compartida o privada son tarjetas emitidas por una tienda o marca en asocio con una red como AMEX, VISA, MasterCard, etc. Sigue estas instrucciones para agregar este medio de pago en tu tienda VTEX.

1. En la opción de Configuración (_**Transacciones**_ > _**Pagos**_ > _**Configuración**_), ve a la pestaña _**Pagos personalizados**_.

![PrintScreen](/assets/VTEX/VTEX_26_es.png)

2. En esta pestaña, tienes cinco (5) espacios disponibles para configurar tarjetas de marca compartida y privada. En este ejemplo, configuraremos la tarjeta colombiana Codensa que es una tarjeta de marca privada.<br>Haz clic en cualquiera de las casillas disponibles en la sección _**Tarjeta de tienda (red propia)**_.

![PrintScreen](/assets/VTEX/VTEX_27_es.png)

3. Ingresa la siguiente información utilizando las minúsculas y mayúsculas mostradas.

* **Nombre**: `Codensa`.
* **Descripción**: `Codensa`
* **Rangos de BIN**: `590712-590712`
* **Código de pago del adquirente**: `codensa`

{{% alert title="Nota" color="info"%}}
Para tarjetas de _marca compartida_, debes seleccionar la marca de la misma.
{{% /alert %}}

<img src="/assets/VTEX/VTEX_28_es.png" alt="PrintScreen" width="60%"/><br>

Los valores restantes se pueden dejar por defecto. Utiliza los siguientes valores para configurar tarjetas de marca privada y de marca compartida.

| País | Nombre | Descripción | Rangos de BIN | Código de pago del adquirente |
|:-:|---|---|---|---|
| <img src="/assets/Argentina.png" width="25px"/> | Argencard | Argencard | `501105-532362` | argencard |
| <img src="/assets/Argentina.png" width="25px"/> | Cabal | Cabal | `60423,60400,589657` | cabal |
| <img src="/assets/Argentina.png" width="25px"/> | Cencosud | Cencosud | `603493-603493` | cencosud |
| <img src="/assets/Argentina.png" width="25px"/> | Naranja | Naranja | `589562` | naranja |
| <img src="/assets/Argentina.png" width="25px"/> | Shopping | Shopping | `603488` | shopping |
| <img src="/assets/Colombia.png" width="25px"/> | Codensa | Codensa | `590712-590712` | codensa |

Para más información de cómo configurar tarjetas [de marca compartida](https://help.vtex.com/es/tutorial/configurar-pagamentos-com-cartoes-de-loja-cobranded--jrkLK41IjuquUmyKUi86Q) y [de marca privada](https://help.vtex.com/es/tutorial/configurar-pagamentos-com-cartoes-de-loja-bandeira-propria--428FgVdSGQUeAOoogkaIw4), consulta el centro de ayuda de VTEX.

4. Haz clic en _**Guardar**_. Cuando se haya creado el pago personalizado, serás redirigido a la opción para crear una nueva _**Condiciones de pago**_. Esta condición de pago se crea tal y como se explica en la sección [Configurar tarjetas de crédito o débito](#configure-credit-or-debit-cards).

##### Configurar medios de pago en efectivo {#configure-cash-payment-methods}
Como los medios de pago en efectivo requieren que el cliente pague en oficinas físicas, puedes configurar este medio de pago en VTEX como Pagarés. 

{{% alert title="Nota" color="info"%}}
No se requiere este procedimiento para _Boleto bancario_ en Brasil, simplemente configura este medio de pago como una condición de pago.
{{% /alert %}}

Cuando configuras un método de pago en efectivo, tus clientes son redirigidos al checkout de PayU para que descarguen el comprobante de pago y paguen en la oficina física respectiva. Sigue las instrucciones a continuación para agregar este método de pago a su tienda VTEX.

1. En la opción de Configuración (_**Transacciones**_ > _**Pagos**_ > _**Configuración**_), ve a la pestaña _**Pagos personalizados**_.

![PrintScreen](/assets/VTEX/VTEX_26_es.png)

2. En esta pestaña, tienes cinco (5) espacios disponibles para configurar pagos en efectivo. En este ejemplo, configuraremos `OXXO`, un medio de pago en efectivo mexicano.<br>Haz clic en cualquiera de las casillas disponibles en la sección _**Pagarés**_.

![PrintScreen](/assets/VTEX/VTEX_29_es.png)

3. Ingresa la siguiente información para el medio de pago en efectivo.

* **Nombre**: En este parámetro, necesitar utilizar el valor mostrado [aquí]({{< ref "select-your-payment-method.html" >}}) en la columna `Parámetro paymentMethod`. Para este ejemplo, configuramos `OXXO`.
* **Descripción**: Ingresa la descripción que desea mostrar cuando el cliente seleccione este método de pago. Este parámetro es opcional.
* **Validez del pagaré**: ingresa el número de días antes de que venza el pago en efectivo. Por defecto, este valor se asigna a siete días.

Dejas los demás parámetros con sus valores por defecto

4. Haz clic en _**Guardar**_. Cuando se haya creado el pago personalizado, serás redirigido a la opción para crear una nueva _**Condiciones de pago**_. Esta condición de pago se crea tal y como se explica en la sección [Configurar tarjetas de crédito o débito](#configure-credit-or-debit-cards).

## Probar la integración {#testing-the-integration}
Una vez que hayas configurado las Condiciones de pago para tus medios de pago, se recomienda probar la integración antes de comenzar a recibir transacciones reales. Como requisito previo, asegúrate de que tu cuenta de PaymentsOS esté en modo `TEST`, así como el _**Selector de ambiente**_ en tu _**Afiliación de Gateway**_.

1. En el admin de VTEX, haz clic en _**VISITE LA TIENDA**_ en el panel superior.

![PrintScreen](/assets/VTEX/VTEX_16_es.png)

2. Se abre la tienda configurada para tu cuenta de VTEX. Selecciona cualquier producto y haz clic en comprar.

![PrintScreen](/assets/VTEX/VTEX_17.png)

3. En el carrito de compras, haz clic en el botón realizar pedido. 

![PrintScreen](/assets/VTEX/VTEX_18.png)

4. En la sección de pago, aparecen los medios de pago agrupados por tipo. Selecciona el que deseas probar e ingresa los datos de prueba. Encuentra [aquí]({{< ref "Test-your-solution.md#test-cards" >}}) algunos números de tarjeta de prueba e información para probar los estado.<br>Por último, haz clic en Completar compra.

![PrintScreen](/assets/VTEX/VTEX_19.png)

Una vez aprobada la compra puedes verificarla en:
* Admin de VTEX: _**Pagos**_ > _**Transacciones**_.

![PrintScreen](/assets/VTEX/VTEX_20_es.png)

* Panel de control de PaymentsOS: _**Pagos**_ > _**Buscar**_.<br><br>![PrintScreen](/assets/VTEX/VTEX_21_es.png)<br>El parámetro _**ID Externa de la Transacción**_ dentro de _**Actividad de la Transacción**_ es el OrderID de PayU.  

* Módulo PayU: en el [_**Reporte de Ventas**_]({{< ref "Sales-report.md" >}}).

![PrintScreen](/assets/VTEX/VTEX_22.png)

* [API de Consultas]({{< ref "Queries.md" >}}) utilizando el parámetro _**ID Externa de la Transacción**_ como OrderID.

### Probar flujos de dos pasos {#testing-two-step-flows} 
Cuando hayas configurado tu _**Afiliación de Gateway**_ para procesar transacciones en flujos de dos pasos, los fondos autorizados en la tarjeta de crédito no son capturados hasta que solicites la captura explícitamente. Para solicitar la captura, necesitas facturar la orden.

Para facturar una orden, localiza la transacción en el Admin de VTEX  (_**Pagos**_ > _**Transacciones**_) y haz clic en ella. Después, haz clic en el botón _**Pedido**_ en la esquina superior derecha.

![PrintScreen](/assets/VTEX/VTEX_23_es.png)

Desplázate hasta la sección Paquete y haz clic en _**Facturar paquete**_.

![PrintScreen](/assets/VTEX/VTEX_24_es.png)

Proporciona la información de la factura y haz clic en _**Enviar factura**_ al final del panel. Una vez enviada la factura al cliente, se cobra en la tarjeta del cliente el importe autorizado.

![PrintScreen](/assets/VTEX/VTEX_25_es.png)

{{% alert title="Nota" color="info"%}}
Un pedido autorizado se puede cancelar utilizando el botón _**Cancelar pedido**_ en la Información del pedido. Al cancelarlo, PayU envía una transacción _void_ la cual queda registrada tanto en el Hub como en PayU Latam.
{{% /alert %}}