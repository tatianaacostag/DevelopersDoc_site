---
title: "API de Anulaciones y Reembolsos"
linkTitle: "API de Anulaciones y Reembolsos"
date: 2021-06-25T09:24:50-05:00
description: >
  La API de Anulaciones y Reembolsos permite cancelar o reembolsar transacciones que han sido autorizadas o cobradas. Dependiendo del estado de la transacción, puedes enviar una solicitud utilizando los métodos `VOID` o `REFUND`.
weight: 50
tags: ["subtopic"]
---

{{% alert title="URLs" color="info"%}}

Para integrarte con la API de Anulaciones y Reembolsos, dirige tus solicitudes a la URL del entorno correspondiente:

* Pruebas: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Producción: ```https://api.payulatam.com/payments-api/4.0/service.cgi```

{{% /alert %}}

Para comprender mejor las anulaciones y reembolsos, incluidos los conceptos clave y consideraciones, consulta [este documento]({{< ref "Refunds.md" >}}).

## Consideraciones por país

Antes de usar la API de Anulaciones y Reembolsos, ten en cuenta las siguientes consideraciones específicas por país.

<details id="argentina">
<summary><img src="/assets/Argentina.png" width="25px"/> &nbsp; <b>Argentina</b></summary>

| Anulaciones | Reembolsos |
|-------------|------------|
| <ul><li>Envía la solicitud dentro de **14 días**; de lo contrario, el sistema anula automáticamente la transacción.</li></ul> | <ul><li>Solicita un reembolso **al menos 10 minutos después de la aprobación** y hasta **357 días** después de la transacción.</li><li>No incluyas montos decimales en los reembolsos.</li><li>Puedes solicitar más de un reembolso parcial para pagos realizados con **AMEX, Mastercard, Naranja o Visa**.</li><li>Una vez aprobado, PayU transfiere los fondos al pagador dentro de **30 días hábiles**.</li></ul> |

</details>

<details id="brazil">
<summary><img src="/assets/Brasil.png" width="25px"/> &nbsp; <b>Brasil</b></summary>

| Anulaciones | Reembolsos |
|-------------|------------|
| <ul><li>Envía la solicitud dentro de **7 días**; de lo contrario, el sistema anula automáticamente la transacción.</li></ul> | <ul><li>Solicita un reembolso **al menos 10 minutos después de la aprobación**.</li><li>Para transacciones realizadas con **PIX**, solicita reembolsos hasta **87 días** después de la transacción.</li><li>Para transacciones con tarjeta, solicita reembolsos hasta **172 días** después de la transacción.</li><li>Puedes solicitar más de un reembolso parcial para pagos realizados con **AMEX, Elo, Mastercard, PIX o Visa**.</li><li>Una vez aprobado, los reembolsos para **transacciones PIX** se procesan **inmediatamente**.</li><li>Una vez aprobado, los reembolsos para **otros métodos de pago** tardan hasta **15 días hábiles**.</li></ul> |

</details>

<details id="chile">
<summary><img src="/assets/Chile.png" width="25px"/> &nbsp; <b>Chile</b></summary>

| Anulaciones | Reembolsos |
|-------------|------------|
| <ul><li>Envía la solicitud dentro de las **3 horas posteriores a la transacción**; de lo contrario, la red no autoriza la anulación.</li><li>Si la anulación no es aceptada o no se envía la captura dentro de **7 días**, el sistema anula automáticamente la transacción.</li></ul> | <ul><li>Solicita un reembolso **al menos 10 minutos después de la aprobación** y hasta **327 días** después de la transacción.</li><li>Los reembolsos también están disponibles para transacciones procesadas a través de [WebPay Plus o Redcompra]({{< ref "Payments-API-chile.md#submit-transactions-using-debit-and-prepaid-cards" >}}).</li><li>Para **transacciones con tarjetas prepago no procesadas por WebPay Plus**: <ul><li>Si solicitas un reembolso dentro de la **primera hora**, la red financiera puede aprobarlo o rechazarlo.</li><li>Si solicitas un reembolso **después de la primera hora**, la red financiera lo rechaza automáticamente.</li></ul></li><li>Si la red financiera rechaza un reembolso, PayU muestra el [código de error]({{< ref "Response-codes-and-variables.md#response-codes-for-transactions" >}}) correspondiente.</li><li>No incluyas montos decimales en los reembolsos.</li><li>Una vez aprobado, el pagador recibe los fondos dentro de **8 a 20 días hábiles**.</li><li>Puedes enviar reembolsos parciales para transacciones con **cuotas**; PayU los recibe en línea pero los procesa manualmente debido a restricciones del adquirente.</li><li>Sigue los montos mínimos de reembolso requeridos por la red adquirente: <ul><li>Más de **10 CLP** para transacciones procesadas por **TRANSBANK**.</li><li>Más de **50 CLP** para transacciones procesadas por **KLAP**.</li></ul></li><li>Puedes solicitar más de un reembolso parcial para pagos realizados con **AMEX, Mastercard o Visa**.</li></ul> |

</details>

<details id="colombia">
<summary><img src="/assets/Colombia.png" width="25px"/> &nbsp; <b>Colombia</b></summary>

| Anulaciones | Reembolsos |
|-------------|------------|
| <ul><li>Las anulaciones están disponibles solo cuando el **flujo en dos pasos** está habilitado (AUTHORIZATION seguido de CAPTURE). En este caso, puedes cancelar una **autorización** antes de que sea capturada. Esta opción solo está disponible para transacciones con **Visa** y **MasterCard**.</li></ul> | <ul><li>Solicita un reembolso **al menos 10 minutos después de la aprobación** y hasta **357 días** después de la transacción.</li><li>El monto mínimo de reembolso es **100 COP**.</li><li>Si no envías la solicitud de reembolso el mismo día de la captura de la transacción (**antes de las 9 PM UTC-5**), PayU lo procesa manualmente en lugar de intentarlo en línea.</li><li>Una vez aprobado, el pagador recibe los fondos dentro de **15 días hábiles**, dependiendo del emisor de la tarjeta.</li><li>Solicita solo **un reembolso parcial por orden**. Si el cliente solicita un reembolso adicional, procésalo fuera de PayU (por ejemplo, a través de una tarjeta de regalo, descuento o transferencia bancaria). También puedes usar nuestra [API de Payouts](https://developers.payulatam.com/latam/en/docs/integrations/api-integration/payouts-api.html) para enviar el monto directamente desde tu saldo en PayU. Esta opción solo está disponible bajo el modelo agregador y requiere solicitar los datos de la cuenta bancaria del cliente cada vez. Es especialmente útil para métodos de pago alternativos como **Efecty** o **PSE**.</li><li>Los reembolsos parciales para tarjetas de crédito internacionales **no están disponibles**.</li><li>Los reembolsos parciales (solo uno por orden) están disponibles para pagos realizados con **AMEX, Codensa, Diners, Mastercard o Visa**.</li></ul> |

</details>

<details id="mexico">
<summary><img src="/assets/Mexico.png" width="25px"/> &nbsp; <b>México</b></summary>

| Anulaciones | Reembolsos |
|-------------|------------|
| <ul><li>Envía la solicitud **al menos 10 minutos después de la autorización** y hasta **7 días**.</li><li>Si no envías una anulación o captura dentro de este plazo, el sistema anula automáticamente la transacción.</li></ul> | <ul><li>Solicita un reembolso **al menos 10 minutos después de la aprobación**.</li><li>Para la mayoría de las transacciones, solicita reembolsos hasta **175 días** después de la transacción.</li><li>Para transacciones procesadas por **Bancomer**, solicita reembolsos hasta **40 días** después de la transacción.</li><li>Una vez aprobado, el pagador recibe los fondos dentro de **30 días hábiles**.</li><li>No incluyas montos decimales en los reembolsos.</li><li>Puedes solicitar más de un reembolso parcial para pagos realizados con **AMEX, Mastercard o Visa**.</li></ul> |

</details>

<details id="panama">
<summary><img src="/assets/Panama.png" width="25px"/> &nbsp; <b>Panamá</b></summary>

| Anulaciones | Reembolsos |
|-------------|------------|
| <ul><li>La integración no admite anulaciones para transacciones en Panamá.</li></ul> | <ul><li>Solicita un reembolso **al menos 10 minutos después de la aprobación** y hasta **357 días** después de la transacción.</li><li>Una vez aprobado, el pagador recibe los fondos dentro de **8 días hábiles**.</li></ul> |

</details>

<details id="peru">
<summary><img src="/assets/Peru.png" width="25px"/> &nbsp; <b>Perú</b></summary>

| Anulaciones | Reembolsos |
|-------------|------------|
| <ul><li>Sigue el plazo máximo permitido por cada red de pago:</li><ul><li>**Visa**: **21 días** → Si no envías una anulación o captura, el sistema captura automáticamente la transacción.</li><li>**Mastercard**: **28 días** → Si no envías una anulación o captura, el sistema captura automáticamente la transacción.</li><li>**American Express**: **30 días** → Si no envías una anulación o captura, el sistema anula automáticamente la transacción.</li><li>**Diners**: **11 días** → Si no envías una anulación o captura, el sistema anula automáticamente la transacción.</li></ul></ul> | <ul><li>Solicita un reembolso **al menos 10 minutos después de la aprobación** y hasta **357 días** después de la transacción.</li><li>Solicita reembolsos parciales solo para transacciones **sin cuotas** (incluyendo transacciones de una sola cuota).</li><li>Para **transacciones Visanet**, envía reembolsos parciales **al menos un día después de la transacción**.</li><li>El monto mínimo de reembolso es **1 USD o 1 PEN**.</li><li>Puedes solicitar más de un reembolso parcial para pagos realizados con **AMEX, Diners, Mastercard (crédito o débito) o Visa (crédito o débito)**.</li><li>Una vez aprobado, el pagador recibe los fondos dentro de **15 a 25 días hábiles**.</li></ul> |

</details>

## Anulación

El método `VOID` cancela una transacción previamente autorizada. Este es un **proceso automático**—tan pronto como se envía la solicitud `VOID`, no sigue un flujo de aprobación y la integración no hará cobro por la transacción al titular de la tarjeta.

### Parámetros para la solicitud y respuesta

<details>

<summary><b>Solicitud</b></summary>

<br>

<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|------------------|---------|--------|-------------|:-----------:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la solicitud. Esto determina el idioma de los mensajes de error. [Ver idiomas compatibles]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Máx: 32 | Debe establecerse en `SUBMIT_TRANSACTION`. | Sí |
| `test` (JSON)<br>`isTest` (XML) | Booleano | — | Establece `true` para modo de prueba; de lo contrario, establece `false`. | Sí |
| `merchant` | Objeto | — | Contiene los datos de autenticación. | Sí |
| `merchant > apiLogin` | Alfanumérico | Mín: 12, Máx: 32 | Usuario o login proporcionado por PayU. [Cómo obtener API Login]({{< ref "integrations.html#api-key-and-api-login" >}}). | Sí |
| `merchant > apiKey` | Alfanumérico | Mín: 6, Máx: 32 | Contraseña proporcionada por PayU. [Cómo obtener API Key]({{< ref "integrations.html#api-key-and-api-login" >}}). | Sí |
| `transaction` | Objeto | — | Contiene los datos de la transacción. | Sí |
| `transaction > order` | Objeto | — | Contiene los detalles de la orden. | Sí |
| `transaction > order > id` | Numérico | — | ID de la orden que se va a anular. | Sí |
| `transaction > type` | Alfanumérico | 32 | Establezca en `VOID` para cancelar una transacción autorizada. | Sí |
| `transaction > reason` | Alfanumérico | — | Motivo de la anulación de la transacción. | No |
| `transaction > parentTransactionId` | Alfanumérico | 36 | ID de la transacción que se va a anular. | Sí |

</details>

<details>

<summary><b>Respuesta</b></summary>

<br>

<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|------------------|---------|--------|-------------|
| `code` | Alfanumérico | — | Código de respuesta de la transacción. Valores posibles: `ERROR`, `SUCCESS`. |
| `error` | Alfanumérico | Máx: 2048 | Mensaje de error cuando el código de respuesta es `ERROR`. |
| `transactionResponse` | Objeto | — | Contiene los detalles de la respuesta. |
| `transactionResponse > orderId` | Numérico | — | ID de la orden generada o existente en PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | ID de la transacción en PayU. |
| `transactionResponse > state` | Alfanumérico | Máx: 32 | Estado de la transacción. |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx: 255 | Código de respuesta de la red financiera. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx: 255 | Mensaje de error de la red financiera. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx: 32 | Código de trazabilidad de la red financiera. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx: 12 | Código de autorización de la red financiera. |
| `transactionResponse > responseCode` | Alfanumérico | Máx: 64 | Código de respuesta relacionado con el estado de la transacción. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx: 2048 | Mensaje relacionado con el código de respuesta. |
| `transactionResponse > operationDate` | Fecha | — | Fecha en la que se generó la respuesta en el sistema de PayU. |

</details>

### Llamada a la API

Los siguientes ejemplos muestran los cuerpos de solicitud y respuesta para este tipo de transacción.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Ejemplo de una solicitud:**

```JSON
{
   "language": "es",
   "command": "SUBMIT_TRANSACTION",
   "merchant": {
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
      "apiLogin": "pRRXKOl8ikMmt9u"
   },
   "transaction": {
      "order": {
         "id": "1400462414"
      },
      "type": "VOID",
      "reason": "Razón para solicitar la anulación de la transacción",
      "parentTransactionId": "c8ec8737-7645-4756-a991-6e60a99eb4d9"
   },
   "test": false
}
```

<br>

**Ejemplo de una respuesta:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400462414,
        "transactionId": "57546e0a-8275-48e3-af11-7d3dc7420bfe",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "49263990",
        "authorizationCode": "NPS-011111",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "APROBADA - Autorizada",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624880273010,
        "referenceQuestionnaire": null,
        "extraParameters": null,
        "additionalInfo": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Ejemplo de una solicitud:**

```XML
<request>
   <language>es</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <id>1400462466</id>
      </order>
      <type>VOID</type>
      <parentTransactionId>50876ad6-46f2-4c8d-bb91-2f028b56ccb8</parentTransactionId>
   </transaction>
   <isTest>false</isTest>
</request>
```

<br>

**Ejemplo de una respuesta:**

```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400462466</orderId>
        <transactionId>5fbb1ab0-3d2e-448f-a0be-b0bcfb5501ae</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>0</paymentNetworkResponseCode>
        <trazabilityCode>49263990</trazabilityCode>
        <authorizationCode>NPS-011111</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>APROBADA - Autorizada</responseMessage>
        <operationDate>2021-06-28T06:57:44</operationDate>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Reembolsos

Un reembolso se emite cuando un comerciante devuelve voluntariamente el pago al comprador. Esto puede ocurrir debido a **insatisfacción del cliente** o cuando el producto está **agotado**. El método `REFUND` revierte una transacción previamente capturada.

Los reembolsos pueden emitirse por el **monto total** o como un **reembolso parcial** (`PARTIAL_REFUND`).

### Capacidades de reembolso por método de pago y país

Las siguientes tablas resumen el comportamiento de los reembolsos observado para los diferentes métodos de pago en Latinoamérica. Cada sección muestra si un método de pago admite reembolsos totales, parciales y múltiples reembolsos parciales, incluyendo el número máximo de reembolsos parciales identificados durante las pruebas.

<details id="argentina">
<summary><img src="/assets/Argentina.png" width="25px"/> &nbsp; <b>Argentina</b></summary>

| Método de pago | Soporta reembolsos totales | Soporta reembolsos parciales | Soporta múltiples reembolsos parciales | Máximo de reembolsos parciales | Notas |
|----------------|---------------------------|------------------------------|-------------------------------------------|-------------------------------------------|--------|
| **AMEX** | ✅ Sí | ✅ Sí | ✅ Sí | 7 | Las tarjetas AMEX nacionales e internacionales (crédito) admiten múltiples reembolsos parciales; AMEX débito admite solo un reembolso parcial. |
| **ARGENCARD** | ✅ Sí | ✅ Sí | ✅ Sí | 2 | Admite hasta 2 reembolsos parciales (transacciones nacionales). |
| **CABAL** | ✅ Sí | ✅ Sí | ✅ Sí | 3 | Admite múltiples reembolsos parciales, tanto para débito como crédito. |
| **MASTERCARD** | ✅ Sí | ✅ Sí | ✅ Sí | 14 | Admite múltiples reembolsos parciales en débito y crédito; las tarjetas prepago solo admiten un reembolso parcial. |
| **MASTERCARD_PREPAID** | ✅ Sí | ✅ Sí | ❌ No | 1 | Solo admite un reembolso parcial. |
| **NARANJA** | ✅ Sí | ✅ Sí | ✅ Sí | 3 | Admite múltiples reembolsos parciales para débito y crédito. |
| **VISA** | ✅ Sí | ✅ Sí | ✅ Sí | 22 | Permite múltiples reembolsos parciales para débito, crédito y prepago. |
| **VISA_PREPAID** | ✅ Sí | ✅ Sí | ❌ No | 1 | Solo admite un reembolso parcial. |

</details>

<details id="brazil">
<summary><img src="/assets/Brasil.png" width="25px"/> &nbsp; <b>Brasil</b></summary>

| Método de pago | Soporta reembolsos totales | Soporta reembolsos parciales | Soporta múltiples reembolsos parciales | Máximo de reembolsos parciales | Notas |
|----------------|---------------------------|------------------------------|-------------------------------------------|-------------------------------------------|--------|
| **AMEX** | ✅ Sí | ✅ Sí | ✅ Sí | 3 | Admite reembolsos parciales y múltiples reembolsos parciales para transacciones con crédito. |
| **ELO** | ✅ Sí | ✅ Sí | ✅ Sí | 5 | Admite múltiples reembolsos parciales para transacciones con crédito y débito. |
| **HIPERCARD** | ✅ Sí | ✅ Sí | ✅ Sí | 2 | Las transacciones con débito permiten hasta 2 reembolsos parciales. |
| **MASTERCARD** | ✅ Sí | ✅ Sí | ✅ Sí | 5 | Admite múltiples reembolsos parciales (transacciones nacionales). |
| **PIX** | ✅ Sí | ✅ Sí | ✅ Sí | 7 | Admite múltiples reembolsos parciales. |
| **VISA** | ✅ Sí | ✅ Sí | ✅ Sí | 11 | Admite múltiples reembolsos parciales de forma consistente en todos los tipos de tarjeta (crédito y débito). |

</details>

<details id="chile">
<summary><img src="/assets/Chile.png" width="25px"/> &nbsp; <b>Chile</b></summary>

| Método de pago | Soporta reembolsos totales | Soporta reembolsos parciales | Soporta múltiples reembolsos parciales | Máximo de reembolsos parciales | Notas |
|----------------|---------------------------|------------------------------|-------------------------------------------|-------------------------------------------|--------|
| **AMEX** | ✅ Sí | ✅ Sí | ✅ Sí | 5 | Soporte para transacciones nacionales e internacionales con crédito. |
| **MASTERCARD** | ✅ Sí | ✅ Sí | ✅ Sí | 10 | Soporte total para múltiples reembolsos parciales en todos los tipos de tarjeta. |
| **MASTERCARD_PREPAID** | ✅ Sí | ✅ Sí | ✅ Sí | 2 | Admite múltiples reembolsos parciales en transacciones con débito. |
| **VISA** | ✅ Sí | ✅ Sí | ✅ Sí | 9 | Admite múltiples reembolsos parciales en todos los tipos de tarjeta; se confirmaron transacciones nacionales e internacionales. |
| **VISA_PREPAID** | ✅ Sí | ✅ Sí | ✅ Sí | 2 | Admite múltiples reembolsos parciales en transacciones con débito. |

</details>

<details id="colombia">
<summary><img src="/assets/Colombia.png" width="25px"/> &nbsp; <b>Colombia</b></summary>

| Método de pago | Características |
|----------------|-----------------|
| **AMEX** <br> **DINERS** <br> **MASTERCARD** <br> **MASTERCARD_DEBIT** <br> **VISA** <br> **VISA_DEBIT** <br> **VISA_NFC** <br> **CODENSA** | ✅ <b>Soporta reembolsos totales:</b> Sí<br>✅ <b>Soporta reembolsos parciales:</b> Sí<br>❌ <b>Soporta múltiples reembolsos parciales:</b> No<br><b>Máximo de reembolsos parciales:</b> 1<br><b>Nota:</b> Solo se admite un reembolso parcial para todos los métodos de pago. |

</details>

<details id="mexico">
<summary><img src="/assets/Mexico.png" width="25px"/> &nbsp; <b>México</b></summary>

| Método de pago | Soporta reembolsos totales | Soporta reembolsos parciales | Soporta múltiples reembolsos parciales | Máximo de reembolsos parciales | Notas |
|----------------|---------------------------|------------------------------|-------------------------------------------|-------------------------------------------|--------|
| **AMEX** | ✅ Sí | ✅ Sí | ✅ Sí | 7 | AMEX admite múltiples reembolsos parciales tanto para tarjetas de crédito nacionales como internacionales (hasta 7). Las tarjetas de débito solo admiten un reembolso parcial. |
| **MASTERCARD** | ✅ Sí | ✅ Sí | ✅ Sí | 7 | Admite múltiples reembolsos parciales tanto para crédito como para débito. |
| **VISA** | ✅ Sí | ✅ Sí | ✅ Sí | 10 | Admite múltiples reembolsos parciales tanto para crédito como para débito. |

</details>

<details id="peru">
<summary><img src="/assets/Peru.png" width="25px"/> &nbsp; <b>Perú</b></summary>

| Método de pago | Soporta reembolsos totales | Soporta reembolsos parciales | Soporta múltiples reembolsos parciales | Máximo de reembolsos parciales | Notas |
|----------------|---------------------------|------------------------------|-------------------------------------------|-------------------------------------------|--------|
| **AMEX** | ✅ Sí | ✅ Sí | ✅ Sí | 8 | Admite múltiples reembolsos parciales. |
| **DINERS** | ✅ Sí | ✅ Sí | ✅ Sí | 7 | Las transacciones nacionales admiten múltiples reembolsos parciales; las internacionales solo permiten un reembolso parcial. |
| **MASTERCARD** | ✅ Sí | ✅ Sí | ✅ Sí | 8 | Admite múltiples reembolsos parciales. |
| **MASTERCARD_DEBIT** | ✅ Sí | ✅ Sí | ✅ Sí | 8 | Admite múltiples reembolsos parciales. |
| **VISA** | ✅ Sí | ✅ Sí | ✅ Sí | 17 | Admite múltiples reembolsos parciales. |
| **VISA_DEBIT** | ✅ Sí | ✅ Sí | ✅ Sí | 12 | Admite múltiples reembolsos parciales. |
| **YAPE** | ✅ Sí | ✅ Sí | ✅ Sí | 2 | Admite múltiples reembolsos parciales. |

</details>

### Parámetros para la solicitud y respuesta

<details>
<summary><b>Solicitud</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|------------------|---------|--------|-------------|:-----------:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la solicitud. Esto determina el idioma de los mensajes de error. [Ver idiomas compatibles]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Máx: 32 | Debe establecerse en `SUBMIT_TRANSACTION`. | Sí |
| `test` (JSON)<br>`isTest` (XML) | Booleano | — | Establece `true` para modo de prueba; de lo contrario, establece `false`. | Sí |
| `merchant` | Objeto | — | Contiene los datos de autenticación. | Sí |
| `merchant > apiLogin` | Alfanumérico | Mín: 12, Máx: 32 | Usuario o login proporcionado por PayU. [Cómo obtener API Login]({{< ref "integrations.html#api-key-and-api-login" >}}). | Sí |
| `merchant > apiKey` | Alfanumérico | Mín: 6, Máx: 32 | Contraseña proporcionada por PayU. [Cómo obtener API Key]({{< ref "integrations.html#api-key-and-api-login" >}}). | Sí |
| `transaction` | Objeto | — | Contiene los datos de la transacción. | Sí |
| `transaction > additionalValues` | Objeto | — | Especifica el monto para un reembolso parcial. **Requerido para reembolsos parciales**. | No |
| `transaction > additionalValues > TX_VALUE` | Objeto | — | Contiene los detalles del monto de la transacción. **Requerido para reembolsos parciales**. | No |
| `transaction > additionalValues > TX_VALUE > value` | Numérico | Máx: 19 | Monto a reembolsar. **Requerido para reembolsos parciales**. | No |
| `transaction > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código de moneda ISO. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). **Requerido para reembolsos parciales**. | No |
| `transaction > order` | Objeto | — | Contiene los detalles de la orden. | Sí |
| `transaction > order > id` | Numérico | — | ID de la orden a reembolsar. | Sí |
| `transaction > type` | Alfanumérico | 32 | Especifica el tipo de reembolso:<br>- `REFUND` para reembolsos totales.<br>- `PARTIAL_REFUND` para reembolsos parciales (si es compatible). | Sí |
| `transaction > reason` | Alfanumérico | — | Motivo del reembolso. | No |
| `transaction > parentTransactionId` | Alfanumérico | 36 | ID de la transacción original que se está reembolsando. | Sí |

</details>

<details>
<summary><b>Respuesta</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|------------------|---------|--------|-------------|
| `code` | Alfanumérico | — | Código de respuesta de la transacción. Valores posibles: `ERROR`, `SUCCESS`. |
| `error` | Alfanumérico | Máx: 2048 | Mensaje de error cuando el código de respuesta es `ERROR`. |
| `transactionResponse` | Objeto | — | Contiene los detalles de la respuesta. |
| `transactionResponse > orderId` | Numérico | — | ID de la orden generada o existente en PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | ID de la transacción en PayU. |
| `transactionResponse > state` | Alfanumérico | Máx: 32 | Estado de la transacción. |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx: 255 | Código de respuesta de la red financiera. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx: 255 | Mensaje de error de la red financiera. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx: 32 | Código de trazabilidad de la red financiera. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx: 12 | Código de autorización de la red financiera. |
| `transactionResponse > responseCode` | Alfanumérico | Máx: 64 | Código de respuesta asociado con el estado de la transacción. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx: 2048 | Mensaje asociado con el código de respuesta. |
| `transactionResponse > operationDate` | Fecha | — | Fecha en la que se generó la respuesta en el sistema de PayU. |

</details>

### Llamada a la API

Los siguientes ejemplos muestran los cuerpos de solicitud y respuesta para este tipo de transacción.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Ejemplo de una solicitud de reembolso:**

```JSON
{
   "language": "es",
   "command": "SUBMIT_TRANSACTION",
   "merchant": {
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
      "apiLogin": "pRRXKOl8ikMmt9u"
   },
   "transaction": {
      "order": {
         "id": "1400462687"
      },
      "type": "REFUND",
      "reason": "Razón para solicitar el reembolso de la transacción",
      "parentTransactionId": "60e2080d-08b1-4db2-a54f-8bcbe8271662"
   },
   "test": false
}
```

<br>

**Ejemplo de una solicitud de reembolso parcial:**

```JSON
{  
   "command":"SUBMIT_TRANSACTION",
   "language":"es",
   "merchant":{  
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
      "apiLogin": "pRRXKOl8ikMmt9u"
   },
   "transaction":{  
      "additionalValues":{  
         "TX_VALUE":{  
            "value":"950",
            "currency":"ARS"
         }
      },
      "order":{  
         "id":"1400462690"
      },
      "parentTransactionId":"0486359b-a048-4b6b-9b72-af584e710e64",
      "reason":"Razón para solicitar el reembolso de la transacción",
      "type":"PARTIAL_REFUND"
   }
}
```

<br>

**Ejemplo de una respuesta:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400462690,
        "transactionId": null,
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": null,
        "authorizationCode": null,
        "pendingReason": "PENDING_REVIEW",
        "responseCode": null,
        "errorCode": null,
        "responseMessage": "1400462690",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": null,
        "referenceQuestionnaire": null,
        "extraParameters": null,
        "additionalInfo": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Ejemplo de una solicitud de reembolso:**

```XML
<request>
   <language>es</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <id>1400462689</id>
      </order>
      <type>REFUND</type>
      <reason>Razón para solicitar el reembolso de la transacción.</reason>
      <parentTransactionId>1d31ea44-0d8f-4e65-93ac-6be4347e5b40</parentTransactionId>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

**Ejemplo de una solicitud de reembolso parcial:**

```XML
<request>
   <command>SUBMIT_TRANSACTION</command>
   <language>es</language>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <additionalValues>
         <entry>
            <string>TX_VALUE</string>
            <additionalValue>
               <value>950</value>
               <currency>ARS</currency>
            </additionalValue>
         </entry>
      </additionalValues>
      <order>
         <id>1400462690</id>
      </order>
      <parentTransactionId>0486359b-a048-4b6b-9b72-af584e710e64</parentTransactionId>
      <reason>Reason for requesting the refund or cancellation of the transaction</reason>
      <type>PARTIAL_REFUND</type>
   </transaction>
</request>
```

<br>

**Ejemplo de una respuesta:**

```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400462691</orderId>
        <transactionId>6cef020a-8006-4744-b7f9-d9a343807297</transactionId>
        <state>PENDING</state>
        <pendingReason>PENDING_REVIEW</pendingReason>
        <responseMessage>1400462690</responseMessage>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

### Consultar el estado del reembolso

Como se mencionó anteriormente, las solicitudes de reembolso pasan por un proceso de aprobación en el que PayU tarda entre 1 y 3 días en procesarlas y aprobarlas o rechazarlas. Puedes verificar el estado de un reembolso utilizando uno de los siguientes métodos:

#### Consultar el estado a través del Panel de Administración de PayU

1. Inicia sesión en tu cuenta del módulo de PayU. En el panel izquierdo, expande el menú **Transacciones** y selecciona **Reporte de Ventas**.

   ![PrintScreen](/assets/Refunds/Refunds_es_01.png)

2. Usa el campo **Filtrar mis ventas** para buscar la orden utilizando el ID de la orden o el ID de la transacción.

   <img src="/assets/Refunds/Refunds_es_02.png" alt="PrintScreen" width="50%"/><br>

3. La columna **Estado** indica si el reembolso ha sido aprobado, rechazado o si está pendiente.

   ![PrintScreen](/assets/Refunds/Refunds_es_03.png)

#### Consultar el estado a través de la API de Consultas

También puedes verificar el estado del reembolso utilizando la [API de Consultas]({{< ref "Queries-API.md" >}}). Para hacerlo, envía una solicitud que contenga el **ID de la orden**.

Al consultar una orden, el sistema devuelve la última transacción asociada con ella.

La respuesta puede indicar uno de los tres posibles estados:

- **Solicitud No Resuelta**: Si la solicitud de reembolso aún está en revisión, la orden aparece con el estado `CAPTURED` (`result.payload.status` en la respuesta).  
  - El primer tipo de transacción es `AUTHORIZATION_AND_CAPTURE` (`result.transactions.type` en la respuesta).  
  - El primer estado de la transacción es `APPROVED` (`result.transactions.transactionResponse.state` en la respuesta).

- **Aprobado**: Si la solicitud de reembolso es aprobada por un agente de servicio al cliente de PayU, la orden aparece con el estado `REFUNDED` (`result.payload.status` en la respuesta).  
  - El primer tipo de transacción es `REFUND` (`result.transactions.type` en la respuesta).  
  - El primer estado de la transacción es `APPROVED` (`result.transactions.transactionResponse.state` en la respuesta).

- **Rechazado**: Si la solicitud de reembolso es rechazada por un agente de servicio al cliente de PayU, la orden aparece con el estado `CAPTURED` (`result.payload.status` en la respuesta).  
  - El primer tipo de transacción es `REFUND` (`result.transactions.type` en la respuesta).  
  - El primer estado de la transacción es `DECLINED` (`result.transactions.transactionResponse.state` en la respuesta).

### Manejo de reembolsos pendientes con el Módulo de Cancelaciones de PayU

Esta sección te guiará sobre cómo rastrear el estado final de un reembolso iniciado a través del Módulo de Cancelaciones de PayU, especialmente cuando dependes de la API de Consultas para recibir actualizaciones.

#### Módulo de Cancelaciones manual y actualización de reembolsos pendientes

Cuando solicitas un reembolso mediante la API de Voids and Refunds, PayU envía la solicitud a la red de pagos. Si la red rechaza el reembolso, PayU inicialmente devuelve el estado `PENDING` en el campo `paymentResponse.transactionResponse.state`.

En este escenario, PayU activa automáticamente el **Módulo de Cancelaciones** para volver a intentar el reembolso. Este proceso puede implicar múltiples intentos, cada uno generando un nuevo ID de reembolso, hasta alcanzar un estado final. Este mecanismo mejora las tasas de éxito de los reembolsos y reduce la necesidad de que los comercios realicen múltiples intentos manuales.

Para confirmar si la solicitud de reembolso enviada mediante el API de Voids and Refunds alcanzó un estado final (`APPROVED` o `DECLINED`), debes:

- Consultar su estado utilizando el [API de Consultas](https://developers.payulatam.com/latam/es/docs/integrations/api-integration/queries-api.html) (por ID de orden), o  
- Esperar una notificación a través del webhook configurado (`notifyUrl` para integraciones por API o la [Página de Confirmación](https://developers.payulatam.com/latam/es/docs/integrations/webcheckout-integration/confirmation-page.html) para WebCheckout).

{{% alert title="Notas" color="info"%}}

* Si no deseas que PayU gestione tus reembolsos mediante el Módulo de Cancelaciones, contacta a tu gerente de cuenta para desactivar este servicio. En ese caso, siempre recibirás la respuesta directa de la red sin reintentos de PayU.  
* En muchos países, hasta el **99%** de los reembolsos procesados a través del Módulo de Cancelaciones son aprobados. Para reembolsos parciales, la tasa de aprobación puede alcanzar el **97%**.

{{% /alert %}}

#### Identificación del estado final del reembolso en la API de Consultas

Para diferenciar entre tu solicitud de reembolso inicial y los intentos generados por el Módulo de Cancelaciones de PayU, utiliza el **ID de Orden** o el **Código de Referencia** en la **API de Consultas** y revisa los siguientes campos:

- `result > payload > status` – Estado general de la orden (`REFUNDED` si se reembolsó el monto total; `CAPTURED` puede indicar reembolsos parciales).  
- `result > payload > transactions[] > id` – ID de la transacción de reembolso.  
- `result > payload > transactions[] > type` – Tipo de transacción (`REFUND` o `PARTIAL_REFUND`).  
- `result > payload > transactions[] > source` – Fuente (`EMPTY` = reembolsos en línea, `CANCELLATIONS_MODULE` = reintentos a través del Módulo de Cancelaciones de PayU).  
- `result > payload > transactions[] > transactionResponse > state` – Estado del reembolso (`PENDING`, `APPROVED`, `DECLINED`).  
- `result > payload > transactions[] > transactionResponse > operationDate` – Fecha y hora en que se generó el reembolso.  
- `result > payload > transactions[] > additionalValues > TX_VALUE > value` – Monto del reembolso.  
- `result > payload > transactions[] > extraParameters > MANUAL_REFUND` – Indica cómo se procesó el reembolso (ausente, `TRUE` o `FALSE`).  

##### Reglas para actualizar el estado del reembolso

Sigue estas reglas al actualizar tu sistema:

| `MANUAL_REFUND` | Estado del reembolso | Significado | Acción recomendada |
|---|---|---|---|
| Ausente | `PENDING` | Reembolso inicial en proceso | No actualizar |
| Ausente | `DECLINED` | Solicitud inicial rechazada; Módulo de Cancelaciones activado | No actualizar |
| `FALSE` | `APPROVED` | Reembolso procesado automáticamente por el Módulo de Cancelaciones | Actualizar estado |
| `FALSE` | `DECLINED` | Intento de reembolso fallido a través del Módulo de Cancelaciones | No actualizar |
| `TRUE` | `APPROVED` o `DECLINED` | Reembolso finalizado a través del Módulo de Cancelaciones | Actualizar estado |

##### Consideraciones adicionales

- Si el estado final es `DECLINED` después de la operación del Módulo de Cancelaciones, puedes enviar una nueva solicitud de reembolso a través de la **Refunds API**. Al hacerlo, evita actualizar basándote en intentos de transacción previos: usa los campos `operationDate` y `TX_VALUE` para rastrear el intento de reembolso correcto.  
- Registra **un solo registro de reembolso por solicitud API** en tu sistema, incluso si el Módulo de Cancelaciones creó múltiples transacciones.  
- Actualiza tu registro de reembolso **solo cuando se alcance un estado final**, siguiendo las reglas anteriores.

#### Identificación del estado final del reembolso mediante webhook

PayU también te notifica el estado final del reembolso a través del **webhook** configurado (`notifyUrl` para integraciones API o [Página de Confirmación](https://developers.payulatam.com/latam/en/docs/integrations/webcheckout-integration/confirmation-page.html) para WebCheckout).

##### Lógica del webhook

- Si el estado de la solicitud de reembolso es `APPROVED` o `DECLINED`, PayU envía inmediatamente una notificación por webhook.  
- Si el estado del reembolso es inicialmente `PENDING`, no se envía ningún webhook hasta que se alcance un estado final (`APPROVED` o `DECLINED`).  

##### Reglas de actualización del webhook

- Si el estado inicial es `PENDING`, **no actualices** el reembolso hasta recibir el webhook.  
- Una vez que llegue el webhook, actualiza el estado del reembolso según corresponda (`APPROVED` o `DECLINED`).  
- Usa al menos los siguientes campos del payload para identificar correctamente el reembolso:  
  - `transaction_type` – Tipo de transacción  
  - `value` – Monto del reembolso  
  - `response_message_pol` – Mensaje de respuesta  
  - `transaction_date` – Fecha y hora de la transacción  

##### Consideraciones del webhook

A diferencia de la Queries API, el webhook solo notifica cuando el reembolso alcanza un **estado final**. No se envían notificaciones para intentos intermedios (`PENDING`) o reintentos dentro del Módulo de Cancelaciones.

Por esta razón, recomendamos implementar el webhook si aún no lo has hecho. Esto te permite actualizar los estados de los reembolsos de forma automática, sin aplicar las reglas de validación manual requeridas para el Queries API.

Este comportamiento aplica cuando se activan las siguientes configuraciones de cuenta:
- **Permitir transacciones de reversa con estado pendiente:** Desactivado  
- **Activar respuesta pendiente para anulaciones y reembolsos:** Activado
