---
title: "API de Payouts"
linkTitle: "API de Payouts"
date: 2021-08-09T14:58:45-05:00
description: >
  Esta funcionalidad te permite crear múltiples y seguros pagos a beneficiarios (usuarios, comercios, proveedores, clientes, etc.) utilizando los fondos que tienes en tu cuenta PayU.
weight: 60
tags: ["subtopic"]
---
<script src="/js/searchcodes.js"></script>

Para términos introductorios, cómo solicitar este servicio y más información, consulta [Payouts]({{< ref "payouts.html" >}}).

## Configurar la autenticación {#configuring-the-authentication}
Para utilizar los métodos para gestionar Payouts o WebHooks expuestos por este servicio, debes incluir los encabezados `Authorization` y `PublicKey`:

* Para configurar el encabezado `Authorization`, invoca el [método de autenticación]({{< ref "#authentication" >}}) del servicio de Payouts. <br>Ejemplo:

```
Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYyODU0ODE2NywiaWF0IjoxNjI4NTQ4MTY3fQ.jrO3u5ramYKOvoNNb0TNfBuZkbYg1EvPmCDDYXFEO4c 
```
<br>

* Para configurar el encabezado `PublicKey`, utiliza tu Llave pública que puedes encontrar en el Módulo PayU (**_Configuración_** > **_Configuración técnica_** > **_Llave pública_**).

![PrintScreen](/assets/Promotions/PublicKey_es.png)

## Métodos disponibles {#available-methods}
El API de Payouts incluye los siguientes métodos:

* [Autenticación]({{< ref "#authentication" >}})
* [Solicitar payout]({{< ref "#request-payout" >}})
* [Cancelar solicitud de payout]({{< ref "#cancel-payout-request" >}})
* [Crear o actualizar un WebHook]({{< ref "#create-or-update-a-webhook" >}})
* [Eliminar un WebHook]({{< ref "#delete-a-webhook" >}})
* [Consultar WebHooks]({{< ref "#query-webhooks" >}})

## Autenticación {#authentication}
Sin importar el método que quieras invocar, el primer paso es autenticar tu cuenta utilizando las credenciales entregadas por PayU.

El método _autenticación_ inicia sesión al comercio retornando el token JWT generado para utilizar los servicios expuestos por Payouts. Este token está disponible durante 10 minutos después de su creación.

### Llamado del API {#api-call}
Para autenticar, envía la petición así:

```JAVA
POST
https://{env-api}.payulatam.com/v1.0/authenticate?accountId={accountId}&apiKey={apiKey}&apiLogin={apiLogin}
```
<br>

 El valor de la variable `{env-api}` mostrada anteriormente es `sandbox-transfers` para pruebas y `transfers` para producción.

| Parámetro     | Descripción                                                              | Obligatorio |
|---------------|--------------------------------------------------------------------------|:-----------:|
| accountId     | Identificador de tu cuenta por cada país en el sistema de PayU.          |      Sí     |
| apiKey        | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |    Sí    |
| apiLogin      | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |    Sí    |

#### Ejemplo respuesta {#response-example}

{{< tabs tabTotal="1" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
{
  "token": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYyODU0ODE2NywiaWF0IjoxNjI4NTQ4MTY3fQ.jrO3u5ramYKOvoNNb0TNfBuZkbYg1EvPmCDDYXFEO4c"
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

## Solicitar payout {#request-payout}
Este método te permite crear uno o multiples solicitudes de Payouts para beneficiarios nuevos o existentes. Tan pronto creas la solicitud, esta se mueve en los [estados disponibles]({{< ref "payouts.html#payout-states" >}}) de Payouts.

{{% alert title="Nota" color="info"%}}

Necesitas incluir dos encabezados para utilizar este método, consulta [Configurar a autenticación]({{< ref "#configuring-the-authentication" >}}) para más información. Además, necesitas saber tu Merchant ID y tu Account ID, puedes obtener esta información en tu Módulo PayU.

{{% /alert %}}

### Llamado del API {#api-call-1}
Para crear un Payout, utiliza la siguiente URL:

```JAVA
POST
https://{env-api}.payulatam.com/v1.0/supplier-transfers/{merchantId}/{accountId}
```
<br>

 El valor de la variable `{env-api}` mostrada anteriormente es `sandbox-transfers` para pruebas y `transfers` para producción.

| Parámetro     | Descripción                                                           | Obligatorio |
|---------------|-----------------------------------------------------------------------|:-----------:|
| merchantId    | Identificador del comercio en el sistema de PayU.                     |      Sí     |
| accountId     | Identificador de la cuenta para cada país asociada al comercio.       |      Sí     |

Ambos parámetros se pueden encontrar el tu Módulo PayU.

### Variables para la petición y la respuesta {#variables-for-request-and-response}

<details>
<summary>Petición (Request)</summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Mostrar solo campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo  | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| transfers | Lista | | Lista de las transferencias que quieres crear. | Sí |
| transfers[n] > value | Numérico | | Valor a transferir de tus fondos. La moneda de la que está configurada en tu cuenta PayU. | Sí |
| transfers[n] > bankAccount | | | Este objeto tiene a información de a cuenta bancaria del beneficiario que recibirá el pago.<br>El beneficiario puede ser nuevo o existente. | Sí |
| transfers[n] > bankAccount > id | Alfanumérico | 36 | Identificador de la cuenta bancaria del beneficiario.<br>Envía este parámetro cuando quieras solicitar un Payout para un beneficiario existente. | No | 
| transfers[n] > bankAccount > supplierType | Alfanumérico | Min:11 Max:16 | Tipo de relación entre ti y tu beneficiario. Puedes escoger uno de los siguientes valores: <ul style="margin-bottom: initial;"><li>`SUBMERCHANT`: selecciona esta relación si el beneficiario es un comercio relacionado.</li><li>`RELATED_PROVIDER`: selecciona esta relación si el beneficiario es un proveedor</li><li>`RELATED_THIRD_PARTY`: selecciona este tipo si el beneficiario es un cliente, un empleado o cualquier usuario de tus servicios.</li></ul><br>Este parámetro es obligatorio cuando estás creando una solicitud de Payout para un nuevo beneficiario. | No |
| transfers[n] > bankAccount > accountNumber | Alfanumérico | Max:17 | Número de cuenta bancaria del beneficiario.<br>Este parámetro es obligatorio cuando estás creando una solicitud de Payout para un nuevo beneficiario. | No |
| transfers[n] > bankAccount > bankCode | Numérico | Min:3 Max:4 | Código del banco emisor de la cuenta del beneficiario. [Ver códigos de bancos]({{< ref "response-codes-and-variables.html#banks-for-payouts" >}}). | No |
| transfers[n] > bankAccount > accountType | Alfanumérico | 2 | Asigna `CC` para cuenta corriente y `CA` para cuenta de ahorros o `Nequi`<sup>\*</sup>.<br>Este parámetro es obligatorio cuando estás creando una solicitud de Payout para un nuevo beneficiario.<br><sup>\*</sup>_Nequi está disponible en Colombia_. | No |
| transfers[n] > bankAccount > country | Alfanumérico | 2 | País de la cuenta bancaria en formato ISO 3166 Alpha-2.<br>Este parámetro es obligatorio cuando estás creando una solicitud de Payout para un nuevo beneficiario. | No |
| transfers[n] > bankAccount > documentNumber | Numérico | 50 | Número de identificación del beneficiario. Si el valor de `documentType` es `NIT`, el número de documento debe contener un guion (`-`) y el dígito de verificación. Ejemplo: `830140299-6`.<br>Este parámetro es obligatorio cuando estás creando una solicitud de Payout para un nuevo beneficiario. | No |
| transfers[n] > bankAccount > documentType | Alfanumérico | 2 | Tipo de identificación del beneficiario. [Ver tipos de documento]({{< ref "response-codes-and-variables.html#document-types" >}}).<br>Este parámetro es obligatorio cuando estás creando una solicitud de Payout para un nuevo beneficiario. | No |
| transfers[n] > bankAccount > expeditionDate | Alfanumérico | 10 | Fecha de expedición del documento del beneficiario. Formato `YYYY/MM/DD`. | No |
| transfers[n] > bankAccount > fullName | Alfanumérico |  | Nombre del beneficiario.<br>Este parámetro es obligatorio cuando estás creando una solicitud de Payout para un nuevo beneficiario. | No |
| transfers[n] > bankAccount > birthDate | Alfanumérico | 10 | Fecha de nacimiento del beneficiario. Formato `YYYY/MM/DD`. | No |
| transfers[n] > bankAccount > state| Alfanumérico |  | Estado de la cuenta bancaria. Asigna `ACTIVE` cuando estés creando un nuevo beneficiario. | No |
| transfers[n] > bankAccount > merchantId | Numérico | | Identificador de tu comercio en PayU. | No |
| transfers[n] > description | Alfanumérico | | Información adiciona del payout. | No |
<!--additionalData-->

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo  | Formato | Tamaño | Descripción |
|-|-|-|-|
| totalSuccessful | Numérico |  | Número de payouts creados exitosamente. |
| totalFailed | Numérico |  | Número de payments que no pudieron ser creados. |
| successfulItems | Lista |  | Lista de items que fueron procesados con éxito. |
| successfulItems[n] > processingStatus | Alfanumérico | 7 | Estado de la solicitud del Payout. Para transacciones exitosas, el valor es `SUCCESS` |
| successfulItems[n] > paymentOrderId | Alfanumérico | 36 | Identificador generado por la solicitud de pago. Utiliza este ID ya sea para editar o cancelar la solicitud. |
| successfulItems[n] > value | Numérico | | Monto de la solicitud. |
| successfulItems[n] > bankAccount | | | Este objeto tiene la información de la cuenta bancaria que recibirá el pago. |
| successfulItems[n] > bankAccount > processingStatus | Alfanumérico | 7 | Estado del registro de la cuenta bancaria. Para registros exitosos, el valor es `SUCCESS`. |
| successfulItems[n] > bankAccount > id | Alfanumérico | 36 | Identificador de la cuenta bancaria registrada. |
| successfulItems[n] > bankAccount > supplierType | Alfanumérico | Min:11 Max:16 | Tipo de relación seleccionado para el beneficiario. |
| successfulItems[n] > bankAccount > accountNumber | Alfanumérico | Max:17 | Número de cuenta bancaria del beneficiario. |
| successfulItems[n] > bankAccount > bankCode | Numérico | Min:3 Max:4 | Código del banco emisor de la cuenta del beneficiario. [Ver códigos de bancos]({{< ref "response-codes-and-variables.html#banks-for-payouts" >}}). |
| successfulItems[n] > bankAccount > bankName | Alfanumérico |  | Nombre del banco del beneficiario. |
| successfulItems[n] > bankAccount > accountType | Alfanumérico | 2 | Tipo de cuenta del beneficiario. |
| successfulItems[n] > bankAccount > country | Alfanumérico | 2 | País de la cuenta bancaria. |
| successfulItems[n] > bankAccount > documentNumber | Numérico | 50 | Número de identificación del beneficiario. |
| successfulItems[n] > bankAccount > documentType | Alfanumérico | 2 | Tipo de identificación del beneficiario. |
| successfulItems[n] > bankAccount > expeditionDate | Alfanumérico | 10 | Fecha de expedición del documento de identidad del beneficiario. |
| successfulItems[n] > bankAccount > fullName | Alfanumérico |  | Nombre del beneficiario. |
| successfulItems[n] > bankAccount > birthDate | Alfanumérico | 10 | Fecha de nacimiento del beneficiario. |
| successfulItems[n] > bankAccount > state| Alfanumérico |  | Estado de la cuenta bancaria. |
| successfulItems[n] > description | Alfanumérico | | Información adiciona del payout. |
| failedItems | Lista |  | Lista of items that failed during processing. |
| failedItems[n] > processingStatus | Alfanumérico | 7 | Estado de la solicitud del Payout. Para transacciones fallidas, el valor es `FAILED`. |
| failedItems[n] > failureMessages | Lista | | Lista de mensajes de error que generaron la falla. |
| failedItems[n] > value | Numérico | | Monto de la solicitud. |
| failedItems[n] > bankAccount | | | Este objeto tiene la información de la cuenta bancaria que falló. Este elemento tiene los mismo parámetros que el objeto `successfulItems[n].bankAccount`. |

</details>
<br>

El siguiente ejemplo de petición envía tres payouts: 
* El primer y segundo payout son solicitados para beneficiarios no registrados. El segundo falla debido a que el parámetro `bankCode` tiene un valor inválido.
* El tercer payout es para un beneficiario registrado.

{{< tabs tabTotal="1" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```JSON
{
  "transfers": [
    {
      "value": 1500000,
      "bankAccount": {
        "supplierType": "RELATED_THIRD_PARTY",
        "accountNumber": 2198922910000,
        "bankCode": "007",
        "accountType": "CC",
        "country": "CO",
        "documentNumber": 1026304116,
        "documentType": "CC",
        "expeditionDate": "1996-05-17",
        "fullName": "Santiago Romero Pineda",
        "birthDate": "1975-03-07",
        "merchantId": 510608
      },
      "description": "Primer pago"
    },
    {
      "value": 2000000,
      "bankAccount": {
        "supplierType": "RELATED_PROVIDER",
        "accountNumber": 2198922910330,
        "bankCode": "8",
        "accountType": "CA",
        "country": "CO",
        "documentNumber": 102688116,
        "documentType": "CC",
        "expeditionDate": "2001-05-17",
        "fullName": "Juan Perez",
        "birthDate": "1985-04-17",
        "merchantId": 510608
      },
      "description": "Pago de suministros"
    },
    {
      "value": 4500000,
      "bankAccount": {
        "id": "e202507e-5551-4b67-be2a-a2a834bf1438"
      },
      "description": "Pago a proveedor registrado"
    }
  ]
}
```
<br>

Ejemplo respuesta:
```JSON
{
    "totalSuccessful": 2,
    "totalFailed": 1,
    "successfulItems": [
        {
            "processingStatus": "SUCCESS",
            "paymentOrderId": "7202a9a7-ef51-4202-bd23-e604f9cbb25b",
            "value": 1500000.00,
            "bankAccount": {
                "processingStatus": "SUCCESS",
                "id": "e202507e-5551-4b67-be2a-a2a834bf1438",
                "supplierType": "RELATED_THIRD_PARTY",
                "accountNumber": "2198922910000",
                "bankCode": "007",
                "bankName": "BANCOLOMBIA",
                "accountType": "CC",
                "country": "CO",
                "documentNumber": "1026304116",
                "documentType": "CC",
                "expeditionDate": "1996-05-16T05:00:00.000+00:00",
                "fullName": "Santiago Romero Pineda",
                "birthDate": "1975-03-06T05:00:00.000+00:00",
                "state": "ACTIVE"
            },
            "description": "Primer pago"
        },
        {
            "processingStatus": "SUCCESS",
            "paymentOrderId": "32740b81-5ecc-466c-bc09-699e6e5ceefb",
            "value": 4500000.00,
            "bankAccount": {
                "processingStatus": "SUCCESS",
                "id": "8f425a79-3f15-4e64-a1bf-2f7c087587ec",
                "supplierType": "RELATED_THIRD_PARTY",
                "accountNumber": "0200005555",
                "bankCode": "013",
                "bankName": "BBVA COLOMBIA",
                "accountType": "CA",
                "country": "CO",
                "documentNumber": "81856522",
                "documentType": "CC",
                "expeditionDate": "2002-02-17T05:00:00.000+00:00",
                "fullName": "Jorge Gutierrez",
                "birthDate": "1986-02-11T05:00:00.000+00:00",
                "state": "ACTIVE"
            },
            "description": "Pago a proveedor registrado"
        }
    ],
    "failedItems": [
        {
            "processingStatus": "FAILED",
            "failureMessages": [
                "There is no registered bank with code: 8"
            ],
            "value": 2000000,
            "bankAccount": {
                "processingStatus": "FAILED",
                "supplierType": "RELATED_PROVIDER",
                "accountNumber": "2198922910330",
                "bankCode": "8",
                "accountType": "CA",
                "country": "CO",
                "documentNumber": "102688116",
                "documentType": "CC",
                "expeditionDate": "2001-05-17T00:00:00.000+00:00",
                "fullName": "Juan Perez",
                "birthDate": "1985-04-17T00:00:00.000+00:00"
            },
            "description": "Pago de suministros"
        }
    ]
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```XML

```
<br>

Ejemplo respuesta:
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

<!--## Actualizar solicitud de payout {#update-payout-request}
Este método te permite actualizar la información del banco de un pagador en una solicitud de payout en curso. Por ejemplo, este método es util para cambiar el número de cuenta del beneficiario.

Solo puedes solicitar la actualización del beneficiario cuando el estado de Payout esté en `IN_PAYU_PROCESS` o antes. Consulta [estados de los Payout]({{< ref "payouts.html#payout-states" >}}) para más información. 

{{% alert title="Nota" color="info"%}}

Necesitas incluir dos encabezados para utilizar este método, consulta [Configurar a autenticación]({{< ref "#configuring-the-authentication" >}}) para más información. Además, necesitas saber tu Merchant ID y tu Account ID, puedes obtener esta información en tu Módulo PayU.

{{% /alert %}}

### Llamado del API {#api-call-2}
Para actualizar una solicitud de Payout, utiliza la siguiente URL:

```JAVA
PUT
https://{env-api}.payulatam.com/v1.0/supplier-transfers/bank-account/{merchantId}/{accountId}/{bankAccountId}
```
<br>

El valor de la variable `{env-api}` is `sandbox-transfers` para pruebas y `transfers` para producción.

| Parámetro     | Descripción                                                                                   | Obligatorio |
|---------------|-----------------------------------------------------------------------------------------------|:-----------:|
| merchantId    | Identificador del comercio en el sistema de PayU.                                             |      Sí     |
| accountId     | Identificador de la cuenta para cada país asociada al comercio.                               |      Sí     |
| bankAccountId | Identificador retronado por el [Servicio de solicitar payout]({{< ref "#request-payout" >}}). |      Sí     |

### Variables para la solicitud {#variables-for-request}

<div class="variables"></div>

| Nombre del campo  | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| id | Alfanumérico | 36 | Identificador de la cuenta bancaria del beneficiario. | Sí |
| accountNumber | Alfanumérico | Max:17 | Número de cuenta bancaria del beneficiario. | Sí |-->
<!--additionalData-->
<!--
Los siguientes son los cuerpos de la petición y la respuesta para este método.

{{< tabs tabTotal="1" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```JSON
{
  "id": "1f92a225-9559-4b7f-9739-e6bb27b8b838",
  "accountNumber": 2198922910031
}
```
<br>

Ejemplo respuesta:
```JSON
{
    "message": "Update received"
}
```
{{< /tab >}}
-->
<!--{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```XML

```
<br>

Ejemplo respuesta:
```XML

```
{{< /tab >}}-->
<!--{{< /tabs >}}-->

## Cancelar solicitud de payout {#cancel-payout-request}
Este método te permite cancelar la solicitud de payout. Solo puedes solicitar la cancelación de un Payout cuando está en estado `IN_PAYU_PROCESS` o antes. Consulta [estados del Payout]({{< ref "payouts.html#payout-states" >}}) para más información. 

{{% alert title="Nota" color="info"%}}

Necesitas incluir dos encabezados para utilizar este método, consulta [Configurar a autenticación]({{< ref "#configuring-the-authentication" >}}) para más información. Además, necesitas saber tu Merchant ID y tu Account ID, puedes obtener esta información en tu Módulo PayU.

{{% /alert %}}

### Llamado del API {#api-call-2}
Para cancelar una solicitud de Payout, utiliza la siguiente URL:

```JAVA
DELETE
https://{env-api}.payulatam.com/v1.0/supplier-transfers/{merchantId}/{accountId}/{paymentOrderId}
```
<br>

El valor de la variable `{env-api}` is `sandbox-transfers` para pruebas y `transfers` para producción.

| Parámetro      | Descripción                                                                 | Obligatorio |
|----------------|-----------------------------------------------------------------------------|:-----------:|
| merchantId     | Identificador del comercio en el sistema de PayU.                           |     Sí      |
| accountId      | Identificador de la cuenta para cada país asociada al comercio.             |     Sí      |
| paymentOrderId | Identificador del Payout generado cuando el [servicio de solicitar payout]({{< ref "#request-payout" >}}) creó la orden. |    Sí    |

### Variables para la solicitud {#variables-for-request}

<div class="variables"></div>

| Nombre del campo  | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| comments | Alfanumérico | | Razón para cancelar la solicitud de Payout. | No |
| pushPaymentId | Alfanumérico | | Identificador del Payout que se va a cancelar. | No |

Los siguientes son los cuerpos de la petición y la respuesta para este método.

{{< tabs tabTotal="1" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```JSON
{
  "comments": "Solicitud de cancelación del Payout",
  "pushPaymentId": "1f92a225-9559-4b7f-9739-e6bb27b8b838"
}
```
<br>

Ejemplo respuesta:
```JSON
{
    "message": "Cancellation request received"
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```XML

```
<br>

Ejemplo respuesta:
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

## Crear o actualizar un WebHook {#create-or-update-a-webhook}
Este método te permite crea o actualizar un WebHook el cual te permitee configurar una URL donde PayU notifica los cambios de estado de los Payout vía `POST`.

Puedes configurar un WebHook para los siguiente eventos:
* **Creación de la transferencia**: envía una notificación cuando se crea un payout. Para activar estas notificaciones, incluye el valor `TRANSFER_CREATION` en el parámetro `enabledEvents`.
* **Actualización de la transferencia**: envía una notificación cuando la validación de Sanction Screening rechaza el beneficiario. Para activar estas notificaciones, incluye el valor `TRANSFER_UPDATE` en el parámetro `enabledEvents`.
* **Resultado de la validación**: envía una notificación cuando el beneficiario aprobó la validación de pSanction Screening y cuando la transferencia ha sido rechazada por el banco. Para activar estas notificaciones, incluye el valor `VALIDATION_RESULT` en el parámetro `enabledEvents`.

[Haz clic acá para conocer las variables en la notificaciones]({{< ref "payouts.md#variables-in-the-notifications" >}}).

{{% alert title="Nota" color="info"%}}

Necesitas incluir dos encabezados para utilizar este método, consulta [Configurar a autenticación]({{< ref "#configuring-the-authentication" >}}) para más información. Además, necesitas saber tu Merchant ID y tu Account ID, puedes obtener esta información en tu Módulo PayU.

{{% /alert %}}

### Llamado del API {#api-call-3}
* Para crear un WebHook, utiliza:

```JAVA
POST
https://{env-api}.payulatam.com/v1.0/webhooks/{merchantId}/{accountId}
```
<br>

* Para actualizar un WebHook, utiliza:

```JAVA
PUT
https://{env-api}.payulatam.com/v1.0/webhooks/{merchantId}/{accountId}
```
<br>

El valor de la variable `{env-api}` is `sandbox-transfers` para pruebas y `transfers` para producción.

| Parámetro      | Descripción                                                                 | Obligatorio |
|----------------|-----------------------------------------------------------------------------|:-----------:|
| merchantId     | Identificador del comercio en el sistema de PayU.                           |      Sí     |
| accountId      | Identificador de la cuenta para cada país asociada al comercio.             |      Sí     |

### Variables para la petición y la respuesta {#variables-for-request-and-response-1}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo  | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| id | Alfanumérico |  | Identificador del WebHook que desear actualizar. Este parámetro es obligatorio cuando actualices un WebHook | No |
| accountId | Numérico | | Identificador de la cuenta para cada país asociada al comercio. | Sí |
| callbackUrl | Alfanumérico | | URL utilizada para recibir las notificaciones `POST` enviadas por PayU de acuerdo con los eventos seleccionados. Esta URL debe ser única por WebHook. | Sí |
| description | Alfanumérico | | Descripción del WebHook que deseas crear. | Sí |
| enabledEvents | Lista | Max:3 | Lista de eventos que lanzarán una notificación a la URL configurada cuando ocurran. Se debe selecciona al menos un evento.<br>Los posibles valores son: `TRANSFER_UPDATE`, `TRANSFER_CREATION`, `VALIDATION_RESULT`. | Sí |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo  | Formato | Tamaño | Descripción |
|-|-|-|-|
| id | Alfanumérico |  | Identificador del WebHook creado. |
| created | Fecha |  | Fecha de creación del WebHook. Formato `YYYY-DD-MM hh:mm:ss`. |
| accountId | Numérico | | Identificador de la cuenta para cada país asociada al comercio. |
| callbackUrl | Alfanumérico | | URL utilizada para recibir las notificaciones `POST` de acuerdo con los eventos seleccionados. |
| description | Alfanumérico | | Descripción del WebHook creado. |
| enabledEvents | Lista | Max:3 | Lista de los eventos seleccionados. |
| status | Alfanumérico | 7 | Estado del WebHook. Por defecto, el estado de un WebHook nuevo es `ENABLED`. |
| processingStatus | Alfanumérico | 7 | Estado de la creación o actualización del WebHook. Por defecto, este estado es `SUCCESS`. |

</details>

<br>

Los siguientes son los cuerpos de la petición y la respuesta para este método.

{{< tabs tabTotal="1" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```JSON
{
  "accountId": 1,
  "callbackUrl": "https://wwww.callbackurltest.com/",
  "description": "Web Hook For Test Swagger",
  "enabledEvents": [
    "TRANSFER_UPDATE",
    "TRANSFER_CREATION",
    "VALIDATION_RESULT"
  ]
}
```
<br>

Ejemplo respuesta:
```JSON
{
    "processingStatus": "SUCCESS",
    "id": "256dd74e-9187-4efb-8238-fa29bf8f587a",
    "created": "2021-08-27T21:57:28.874+00:00",
    "accountId": 1,
    "callbackUrl": "https://wwww.callbackurltest.com/",
    "description": "Web Hook For Test Swagger",
    "enabledEvents": [
        "TRANSFER_UPDATE",
        "TRANSFER_CREATION",
        "VALIDATION_RESULT"
    ],
    "status": "ENABLED"
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```XML

```
<br>

Ejemplo respuesta:
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

## Eliminar un WebHook {#delete-a-webhook}
Este método te permite borrar un WebHook previamente creado. Tan pronto borras un WebHook, dejas de recibir notificaciones.

{{% alert title="Nota" color="info"%}}

Necesitas incluir dos encabezados para utilizar este método, consulta [Configurar a autenticación]({{< ref "#configuring-the-authentication" >}}) para más información. Además, necesitas saber tu Merchant ID y tu Account ID, puedes obtener esta información en tu Módulo PayU.

{{% /alert %}}

### Llamado del API {#api-call-4}
Para borrar un WebHook, utiliza la siguiente URL:

```JAVA
DELETE
https://{env-api}.payulatam.com/v1.0/webhooks/{merchantId}/{accountId}/{id}
```
<br>

El valor de la variable `{env-api}` is `sandbox-transfers` para pruebas y `transfers` para producción.

| Parámetro      | Descripción                                                                 | Obligatorio |
|----------------|-----------------------------------------------------------------------------|:-----------:|
| merchantId     | Identificador del comercio en el sistema de PayU.                           |      Sí     |
| accountId      | Identificador de la cuenta para cada país asociada al comercio.             |      Sí     |
| id             | Identificador del WebHook que deseas eliminar.                              |      Sí     |

#### Ejemplo respuesta {#response-example-1}

<div class="variables"></div>

| Nombre del campo  | Formato | Tamaño | Descripción |
|-|-|-|-|
| processingStatus | Alfanumérico | 7 | Estado del borrado del WebHook. Por defecto, este estado es `SUCCESS`. |
| id | Alfanumérico |  | Identificador del WebHook borrado. |
| status | Alfanumérico | 7 | Estado del WebHook. Por defecto, el estado de un WebHook borrado es `DELETED`. |

{{< tabs tabTotal="1" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
{
    "processingStatus": "SUCCESS",
    "id": "054e0fc5-a025-4a00-b666-95673c11dee1",
    "status": "DELETED"
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

## Consultar WebHooks {#query-webhooks}
Puedes consular los WebHooks relacionados a tu cuenta ya sea por su identificador o por el identificador de tu cuenta. Explicamos ambos métodos a continuación. 

{{% alert title="Nota" color="info"%}}

Necesitas incluir dos encabezados para utilizar este método, consulta [Configurar a autenticación]({{< ref "#configuring-the-authentication" >}}) para más información. Además, necesitas saber tu Merchant ID y tu Account ID, puedes obtener esta información en tu Módulo PayU.

{{% /alert %}}

### Consultar WebHooks por ID {#query-webhooks-by-id}
Este método te permite consultar la información de un WebHook específico a través de su ID. Para consultar un WebHook, utiliza la siguiente URL:

```JAVA
GET
https://{env-api}.payulatam.com/v1.0/webhooks/{merchantId}/{accountId}/{id}
```
<br>

El valor de la variable `{env-api}` is `sandbox-transfers` para pruebas y `transfers` para producción.

| Parámetro      | Descripción                                                                 | Obligatorio |
|----------------|-----------------------------------------------------------------------------|:---------:|
| merchantId     | Identificador del comercio en el sistema de PayU.                           |    Sí    |
| accountId      | Identificador de la cuenta para cada país asociada al comercio.             |    Sí    |
| id             | Identificador del WebHook que quieres consultar.                            |    Sí    |

#### Ejemplo respuesta {#response-example-2}

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo  | Formato | Tamaño | Descripción |
|-|-|-|-|
| processingStatus | Alfanumérico | 7 | Estado de la consulta. Por defecto, este estado es `SUCCESS`. |
| id | Alfanumérico |  | Identificador del WebHook. |
| created | Fecha |  | Fecha de creación del WebHook. Formato `YYYY-DD-MM hh:mm:ss`. |
| accountId | Numérico | | Identificador de la cuenta para cada país asociada al comercio. |
| callbackUrl | Alfanumérico | | URL utilizada para recibir las notificaciones `POST` de acuerdo con los eventos seleccionados. |
| description | Alfanumérico | | Descripción del WebHook. |
| enabledEvents | Lista | Max:3 | Lista de los eventos seleccionados. |
| status | Alfanumérico | 7 | Estado del WebHook. Por defecto, el estado de un WebHook nuevo es `ENABLED`. |

</details>
<br>

{{< tabs tabTotal="1" tabID="7" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
{
    "processingStatus": "SUCCESS",
    "id": "9628b74d-e2fb-40cc-b137-b156d1401641",
    "created": "2021-08-28T00:52:26.206+00:00",
    "accountId": 515058,
    "callbackUrl": "https://wwww.callbackurltest.com/",
    "description": "Web Hook For Test Swagger",
    "enabledEvents": [
        "TRANSFER_UPDATE",
        "TRANSFER_CREATION",
        "VALIDATION_RESULT"
    ],
    "status": "ENABLED"
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

### Consultar webhooks por cuenta {#query-webhooks-by-account}
Este método te permite consultar la información de todos los WebHooks creados en tu cuenta. Para consultar la lista de WebHooks, utiliza la siguiente URL:

```JAVA
GET
https://{env-api}.payulatam.com/v1.0/webhooks/account/{merchantId}/{accountId}
```
<br>

El valor de la variable `{env-api}` is `sandbox-transfers` para pruebas y `transfers` para producción.

| Parámetro      | Descripción                                                                 | Obligatorio |
|----------------|-----------------------------------------------------------------------------|:---------:|
| merchantId     | Identificador del comercio en el sistema de PayU.                           |    Sí    |
| accountId      | Identificador de la cuenta para cada país asociada al comercio.             |    Sí    |

#### Ejemplo respuesta {#response-example-3}

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo  | Formato | Tamaño | Descripción |
|-|-|-|-|
| processingStatus | Alfanumérico | 7 | Estado de la consulta. Por defecto, este estado es `SUCCESS`. |
| id | Alfanumérico |  | Identificador del WebHook. |
| created | Fecha |  | Fecha de creación del WebHook. Formato `YYYY-DD-MM hh:mm:ss`. |
| accountId | Numérico | | Identificador de la cuenta para cada país asociada al comercio. |
| callbackUrl | Alfanumérico | | URL utilizada para recibir las notificaciones `POST` de acuerdo con los eventos seleccionados. |
| description | Alfanumérico | | Descripción del WebHook created. |
| enabledEvents | Lista | Max:3 | Lista de los eventos seleccionados. |
| status | Alfanumérico | 7 | Estado del WebHook. Por defecto, el estado de un WebHook nuevo es `ENABLED`. |

</details>
<br>

{{< tabs tabTotal="1" tabID="8" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
[
    {
        "processingStatus": "SUCCESS",
        "id": "9628b74d-e2fb-40cc-b137-b156d1401641",
        "created": "2021-08-28T00:52:26.206+00:00",
        "accountId": 515058,
        "callbackUrl": "https://wwww.callbackurltest.com.co/",
        "description": "Web Hook For Test Swagger",
        "enabledEvents": [
            "TRANSFER_UPDATE",
            "TRANSFER_CREATION",
            "VALIDATION_RESULT"
        ],
        "status": "ENABLED"
    },
    {
        "processingStatus": "SUCCESS",
        "id": "672497c2-00f8-4787-a396-4024042eaa20",
        "created": "2021-09-15T16:04:49.131+00:00",
        "accountId": 515058,
        "callbackUrl": "https://wwww.callbackurltest.com.co/",
        "description": "Web Hook For Test Swagger",
        "enabledEvents": [
            "TRANSFER_UPDATE",
            "VALIDATION_RESULT"
        ],
        "status": "ENABLED"
    }
]
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
```XML

```
{{< /tab >}}-->
{{< /tabs >}}