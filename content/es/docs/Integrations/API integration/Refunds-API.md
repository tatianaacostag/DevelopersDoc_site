---
title: "API de Anulaciones y Reembolsos"
linkTitle: "API de Anulaciones y Reembolsos"
date: 2021-06-25T09:24:50-05:00
description: >
  La API de Anulaciones y Reembolsos permite cancelar o reembolsar transacciones que han sido autorizadas o cobradas. Dependiendo del estado de la transacción, puedes enviar una solicitud utilizando los métodos `Void` o `Refund`.
weight: 50
tags: ["subtopic"]
---

{{% alert title="Nota" color="info"%}}

Para integrarte con la API de Anulaciones y Reembolsos, dirige tus solicitudes a la URL del entorno correspondiente:

* Pruebas: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Producción: ```https://api.payulatam.com/payments-api/4.0/service.cgi```

{{% /alert %}}

Para comprender mejor las anulaciones y reembolsos, incluidos los conceptos clave y consideraciones, consulta [este documento]({{< ref "Refunds.md" >}}).

## Consideraciones por País

Antes de usar la API de Anulaciones y Reembolsos, ten en cuenta las siguientes consideraciones específicas por país.

### Argentina

- Una solicitud de anulación debe enviarse dentro de los **14 días**; de lo contrario, la transacción se anula automáticamente.
- Los reembolsos pueden solicitarse **al menos 10 minutos después de la aprobación** y hasta **357 días** después de la transacción.
- Los reembolsos con montos decimales **no están soportados**.
- Una vez aprobado un reembolso, el pagador recibe los fondos **dentro de 30 días hábiles**.

### Brasil

- Una solicitud de anulación debe enviarse dentro de **7 días**; de lo contrario, la transacción se cancela.
- Los reembolsos pueden solicitarse **al menos 10 minutos después de la aprobación** y hasta:
  - **87 días** para transacciones con PIX.
  - **172 días** para transacciones con tarjeta.
- Se admiten **reembolsos parciales múltiples** para transacciones con PIX.
- Una vez aprobados:
  - Los reembolsos de **transacciones con PIX** se procesan **de inmediato**.
  - Los reembolsos de **otros métodos de pago** tardan hasta **15 días hábiles**.

### Chile

- Debido a restricciones de la red, una **solicitud de anulación** solo puede autorizarse **dentro de las 3 horas posteriores a la transacción**. Si la anulación no es aceptada o no se envía la captura dentro de **7 días**, la transacción se anula automáticamente.
- Los reembolsos pueden solicitarse **al menos 10 minutos después de la aprobación** y hasta **327 días**.
- Los reembolsos están disponibles para transacciones procesadas a través de [WebPay Plus o Redcompra]({{< ref "Payments-API-chile.md#submit-transactions-using-debit-and-prepaid-cards" >}}).
- Para **transacciones con tarjeta prepago no procesadas por WebPay Plus**:
  - Los reembolsos solicitados **dentro de la primera hora** pueden ser **aprobados o rechazados** por la red financiera.
  - Los reembolsos solicitados **después de la primera hora** son **rechazados automáticamente**.
- Si un reembolso es rechazado, PayU muestra el [código de error correspondiente]({{< ref "Response-codes-and-variables.md#response-codes-for-transactions" >}}).
- Los reembolsos con montos decimales **no están soportados**.
- Una vez aprobado un reembolso, el pagador recibe los fondos **entre 8 y 20 días hábiles**.
- Los **reembolsos parciales** en transacciones con **cuotas** se reciben en línea pero se procesan manualmente debido a restricciones del adquirente.
- El monto mínimo para un reembolso es **10 CLP**.

### Colombia

- **Las anulaciones no están soportadas**.
- Los reembolsos pueden solicitarse **al menos 10 minutos después de la aprobación** y hasta **357 días**.
- El monto mínimo para un reembolso es **100 COP**.
- Si una solicitud de reembolso **no se envía el mismo día** de la captura de la transacción (**antes de las 9 PM UTC-5**), se **procesa manualmente** en lugar de intentarse en línea.
- Una vez aprobado un reembolso, el pagador recibe los fondos **dentro de 30 días hábiles**.
- **Los reembolsos parciales no están disponibles** para tarjetas de crédito internacionales.

### México

- Una solicitud de anulación debe enviarse **al menos 10 minutos después de la autorización** y hasta:
  - **30 días** para la mayoría de las transacciones.
  - **7 días** para transacciones con **American Express**.
  - Si no se envía una anulación o captura dentro del período establecido, la transacción se anula automáticamente.
- Los reembolsos pueden solicitarse **al menos 10 minutos después de la aprobación** y hasta:
  - **175 días** para la mayoría de las transacciones.
  - **40 días** si son procesadas por **Bancomer**.
- Una vez aprobado un reembolso, el pagador recibe los fondos **dentro de 30 días hábiles**.
- Los reembolsos con montos decimales **no están soportados**.

### Panamá

- **Las anulaciones no están soportadas**.
- Los reembolsos pueden solicitarse **al menos 10 minutos después de la aprobación** y hasta **357 días**.
- Una vez aprobado un reembolso, el pagador recibe los fondos **dentro de 8 días hábiles**.

### Perú

- El tiempo máximo para anular una autorización depende de la red de pagos:
  - **Visa**: **21 días** → Si no se envía una anulación o captura, la transacción se **auto-captura**.
  - **Mastercard**: **28 días** → Si no se envía una anulación o captura, la transacción se **auto-captura**.
  - **American Express**: **30 días** → Si no se envía una anulación o captura, la transacción se **auto-anula**.
  - **Diners**: **11 días** → Si no se envía una anulación o captura, la transacción se **auto-anula**.
- Los reembolsos pueden solicitarse **al menos 10 minutos después de la aprobación** y hasta **357 días**.
- Se admiten **reembolsos parciales** para transacciones **sin cuotas** (incluidas las de una sola cuota).
- Los **reembolsos parciales con Visanet** deben enviarse **al menos un día después de la transacción**.
- Una vez aprobado un reembolso, el pagador recibe los fondos **entre 15 y 25 días hábiles**.
- El monto mínimo para un reembolso es **1 USD o 1 PEN**.

## Anulación

El método `VOID` cancela una transacción previamente autorizada. Este es un **proceso automático**—tan pronto como se envía la solicitud `VOID`, no sigue un flujo de aprobación y la transacción **no se carga** al titular de la tarjeta.

### Parámetros para la Solicitud y Respuesta

<details>

<summary>Solicitud</summary>

<br>

<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción | Obligatorio |
|------------------|---------|--------|-------------|:-----------:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la solicitud. Esto determina el idioma de los mensajes de error. [Ver idiomas compatibles]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Máx: 32 | Debe establecerse en `SUBMIT_TRANSACTION`. | Sí |
| `test` (JSON)<br>`isTest` (XML) | Booleano | — | Establezca en `true` para modo de prueba; de lo contrario, `false`. | Sí |
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

<summary>Respuesta</summary>

<br>

<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción |
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

**Ejemplo de una Solicitud:**

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

**Ejemplo de una Respuesta:**

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

**Ejemplo de una Solicitud:**

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

**Ejemplo de una Respuesta:**

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

### Parámetros para la Solicitud y Respuesta

<details>
<summary>Solicitud</summary>
<br>
<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción | Obligatorio |
|------------------|---------|--------|-------------|:-----------:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la solicitud. Esto determina el idioma de los mensajes de error. [Ver idiomas compatibles]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Máx: 32 | Debe establecerse en `SUBMIT_TRANSACTION`. | Sí |
| `test` (JSON)<br>`isTest` (XML) | Booleano | — | Establezca en `true` para modo de prueba; de lo contrario, `false`. | Sí |
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
<summary>Respuesta</summary>
<br>
<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción |
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

**Ejemplo de una Solicitud de Reembolso:**

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

**Ejemplo de una Solicitud de Reembolso Parcial:**

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

**Ejemplo de una Respuesta:**

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

**Ejemplo de una Solicitud de Reembolso:**

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

**Ejemplo de una Solicitud de Reembolso Parcial:**

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

**Ejemplo de una Respuesta:**

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

### Consultar el Estado del Reembolso

Como se mencionó anteriormente, las solicitudes de reembolso pasan por un proceso de aprobación en el que PayU tarda entre 1 y 3 días en procesarlas y aprobarlas o rechazarlas. Puedes verificar el estado de un reembolso utilizando uno de los siguientes métodos:

#### Consultar el Estado a través del Panel de Administración de PayU

1. Inicia sesión en tu cuenta del módulo de PayU. En el panel izquierdo, expande el menú **Transacciones** y selecciona **Reporte de Ventas**.

   ![PrintScreen](/assets/Refunds/Refunds_es_01.png)

2. Usa el campo **Filtrar mis ventas** para buscar la orden utilizando el ID de la orden o el ID de la transacción.

   <img src="/assets/Refunds/Refunds_es_02.png" alt="PrintScreen" width="50%"/><br>

3. La columna **Estado** indica si el reembolso ha sido aprobado, rechazado o si está pendiente.

   ![PrintScreen](/assets/Refunds/Refunds_es_03.png)

#### Consultar el Estado a través de la API de Consultas

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
