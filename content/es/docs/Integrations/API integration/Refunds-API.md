---
title: "API de Reembolsos y Anulaciones"
linkTitle: "API de Reembolsos y Anulaciones"
date: 2021-06-25T09:24:50-05:00
description: >
  Esta funcionalidad te permite solicitar la cancelación o el reembolso de transacciones autorizadas o cobradas. Puedes crear la solicitud utilizando los métodos de reembolso (_Refund_) o de cancelación (_Void_) de acuerdo con el estado de la transacción.
 
weight: 50
tags: ["subtopic"]
---

Para integrarte con el API de Reembolsos y Anulaciones, apunta tus peticiones a las siguientes URLs de acuerdo con tu ambiente.

{{% alert title="URL" color="info"%}}
* Pruebas: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Producción: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

Si necesitas entender los conceptos y leer más consideraciones sobre Reembolsos y Anulaciones, consulta [este artículo]({{< ref "Refunds.md" >}}).

## Consideraciones por país {#considerations-per-country}
Antes de utilizar el API de Reembolsos y Anulaciones, ten en cuenta las siguientes consideraciones.

### Argentina
* El tiempo máximo para enviar una anulación es 14 días. Si no se envía una anulación o una captura luego de este tiempo, la transacción se anula automáticamente.
* El tiempo mínimo para enviar un reembolso es 10 minutos luego de la aprobación y el máximo es 357 días.
* No se soportan reembolsos con decimales.
* Cuando se aprueba el reembolso, el pagador obtiene su dinero en máximo 30 días hábiles.

### Brasil {#brazil}  
* El tiempo máximo para enviar una anulación es siete (7) días. Si no se envía una anulación o una captura luego de este tiempo, la transacción se cancela.
* El tiempo mínimo para enviar un reembolso es 10 minutos luego de la aprobación y el máximo es:
   - 87 días para transacciones con PIX o procesadas en Redecard.
   - 172 días para transacciones con tarjeta.
* La integración admite múltiples reembolsos parciales para PIX.
* Cuando se aprueba un reembolso por transacciones con PIX, el pagador recibe el dinero de inmediato. De lo contrario, lo recuperan en un máximo de 15 días hábiles.

### Chile
* Debido a restricciones de la red, se pueden autorizar anulaciones dentro de las tres primeras horas luego de la autorización. Si no se acepta la anulación o no se envía una captura luego de siete (7) días, la transacción se anula automáticamente.
* El tiempo mínimo para enviar un reembolso es 10 minutos luego de la aprobación y el máximo es 327 días. Si la transacción fue procesada con KLAP, el tiempo máximo es 172 días.
* Los reembolsos están disponibles para transacciones procesadas a través de [WebPay Plus o Redcompra]({{< ref "Payments-API-chile.md#submit-transactions-using-debit-and-prepaid-cards" >}}).
* Para transacciones con tarjetas prepago que no sean procesadas a través de WebPay Plus, los Reembolsos solicitados luego de la primero hora del cobro pueden ser aprobados o rechazados por la red financiera. Luego de esta hora, se rechazan todos los reembolsos para transacciones realizadas con tarjetas prepago.
* Si se rechaza el reembolso, PayU muestra el [código de error]({{< ref "Response-codes-and-variables.md#response-codes-for-transactions" >}}) generado por la red.
* No se soportan reembolsos con decimales.
* Cuando se aprueba un reembolso, el pagador obtiene su dinero en 8 a 20 días hábiles.
* Los reembolsos parciales para transacciones que utilizan cuotas se reciben en línea pero son procesados de forma manual debido a restricciones de la red adquirente.
* El valor mínimo para enviar un Reembolso es 10 CLP.

### Colombia
* No se soportan Anulaciones (voids).
* El tiempo mínimo para enviar un reembolso es 10 minutos luego de la aprobación y el máximo es 357 días.
* El valor mínimo para enviar un reembolso es 100 COP.
* Si no se envía el reembolso el mismo día en el que la transacción fue capturada (antes de las 9 pm UTC-5) el reembolso va inmediatamente  un proceso manual sin enviar un intento en línea.
* Cuando se aprueba el reembolso, el pagador obtiene su dinero en máximo 30 días hábiles.
* No se soportan reembolsos parciales para tarjetas de crédito internacionales.

### México {#mexico}
* El tiempo mínimo para enviar una anulación (Void) es 10 minutos luego de la autorización y el máximo es 30 días. Si la transacción se hizo con American Express, el tiempo máximo es siete (7) días. Si no se envía una anulación o una captura luego de este tiempo, la transacción se anula automáticamente.
* El tiempo mínimo para enviar un reembolso es 10 minutos luego de la aprobación y el máximo es 175 días. Si la transacción fue procesada por Bancomer, el tiempo máximo es 40 días.
* Cuando se aprueba un reembolso, el pagador obtiene su dinero en 30 días hábiles.
* No se soportan reembolsos con decimales.

### Panamá {#panama}
* No se soportan Anulaciones (voids).
* El tiempo mínimo para enviar un reembolso es 10 minutos luego de la aprobación y el máximo es 357 días.
* Cuando se aprueba el reembolso, el pagador obtiene su dinero en máximo 8 días hábiles.

### Perú {#peru}
* Los días máximos para enviar una autorización son: 
    - Visa: 21 días. Si no se envía una anulación o una captura luego de este tiempo, la transacción se captura automáticamente.
    - Mastercard: 28 días. Si no se envía una anulación o una captura luego de este tiempo, la transacción se captura automáticamente.
    - American Express: 30 días. Si no se envía una anulación o una captura luego de este tiempo, la transacción se anula automáticamente.
    - Diners: 11 días. Si no se envía una anulación o una captura luego de este tiempo, la transacción se anula automáticamente.
* El tiempo mínimo para enviar un reembolso es 10 minutos luego de la aprobación y el máximo es 357 días.
* Se soportan reembolsos parciales para transacciones sin cuotas. Ten en cuenta que las transacciones en una cuota son consideradas como sin cuotas.
* Los Reembolsos parciales con visanet deben enviarse un día después.
* Cuando se aprueba un reembolso, el pagador obtiene su dinero en 15 to 25 días hábiles.
* La cantidad mínima para enviar un Reembolso es 1 USD o 1 PEN.

## Anulación (Void) {#void}
Le método `VOID` cancela una transacción previamente autorizada. La anulación es un procedimiento automático, tan pronto envías la petición de `VOID`, no sigue ningún flujo de aprobación y la transacción no se cobra al tarjetahabiente.

### Variables para la petición y la respuesta {#variables-for-request-and-response}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| merchant |  |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-y-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-y-api-login" >}}) | Sí |
| transaction |  |  | Este objeto tiene los datos de la transacción. | Sí |
| transaction > order |  |  | Este objeto tiene los datos de la orden. | Sí |
| transaction > order > id | Numérico |  | Identificador de la orden a ser anulada. | Sí |
| transaction > type | Alfanumérico | 32 | Asigna `VOID` para realizar una anulación de una transacción autorizada. | Sí |
| transaction > reason | Alfanumérico |  | Entrega la razón para anular una transacción autorizada. | No |
| transaction > parentTransactionId | Alfanumérico | 36 | Identificador de la transacción a anular. | Sí |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| transactionResponse |  |  | Datos de la respuesta. |
| transactionResponse > orderId | Numérico |  | Identificador de la orden generado o existente en PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | Identificador de la transacción en PayU. |
| transactionResponse > state | Alfanumérico | Max:32 | Estado de la transacción. |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | Código de respuesta retornado por la red bancaria. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | Mensaje de error retornado por la red bancaria. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | Código de trazabilidad retornado por la red bancaria. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | Código de autorización retornado por la red bancaria. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | Código de respuesta asociado al estado. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Mensaje asociado al código de respuesta. |
| transactionResponse > operationDate | Fecha |  | Fecha de creación en el sistema de PayU. |

</details>

### Llamado del API {#api-call}
Los siguientes son los cuerpos de la petición y la respuesta para este tipo de transacción.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

Ejemplo petición:
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

Ejemplo respuesta:
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

## Reembolsos (Refunds) {#refunds}  
Un reembolso se solicita cuando una tienda decide voluntariamente regresar el dinero al cliente debido a razones de insatisfacción o cuando la tienda no tiene suficiente inventario del producto comprado. El método `REFUND` solicita el reverso de una transacción previamente capturada.

Los reembolsos pueden ser solicitados por la cantidad total o parcial (`PARTIAL REFUND`).

### Variables para la petición y la respuesta {#variables-for-request-and-response-1}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| merchant |  |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-y-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-y-api-login" >}}) | Sí |
| transaction |  |  | Este objeto tiene los datos de la transacción. | Sí |
| transaction > additionalValues > |  | 64 | Monto del reembolso parcial. Este parámetro y sus valores son obligatorios cuando se realiza un reembolso parcial. | No |
| transaction > additionalValues > TX_VALUE | Alfanumérico | 64 | Monto de la transacción. Obligatorio para reembolsos parciales | No |
| transaction > additionalValues > TX_VALUE > value | Numérico | 19 | Especifica el monto de la transacción. Obligatorio para reembolsos parciales | No |
| transaction > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). Obligatorio para reembolsos parciales | No |
| transaction > order |  |  | Este objeto tiene los datos de la orden. | Sí |
| transaction > order > id | Numérico |  | Identificador de la orden que será reembolsada. | Sí |
| transaction > type | Alfanumérico | 32 | Asigna este valor de acuerdo con el tipo de transacción requerido:<br><ul style="margin-bottom: initial;"><li>`REFUND`</li><li>`PARTIAL_REFUND` para reembolsos parciales (si se soportan).</li></ul> | Sí |
| transaction > reason | Alfanumérico |  | Entrega la razón para reembolsar una transacción autorizada. | No |
| transaction > parentTransactionId | Alfanumérico | 36 | Identificador de la transacción a reembolsar. | Sí |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| transactionResponse |  |  | Datos de la respuesta. |
| transactionResponse > orderId | Numérico |  | Identificador de la orden generado o existente en PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | Identificador de la transacción en PayU. |
| transactionResponse > state | Alfanumérico | Max:32 | Estado de la transacción. |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | Código de respuesta retornado por la red bancaria. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | Mensaje de error retornado por la red bancaria. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | Código de trazabilidad retornado por la red bancaria. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | Código de autorización retornado por la red bancaria. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | Código de respuesta asociado al estado. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Mensaje asociado al código de respuesta. |
| transactionResponse > operationDate | Fecha |  | Fecha de creación en el sistema de PayU. |

</details>

### Llamado del API {#api-call-1}
Los siguientes son los cuerpos de la petición y la respuesta para este tipo de transacción.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición (Refund):
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

Ejemplo petición (Partial Refund):
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

Ejemplo respuesta:
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

Ejemplo petición (Refund):
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

Ejemplo petición (Partial refund):
```XML
<request>
   <language>es</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <additionalValues>
         <entry>
            <string>TX_VALUE</string>
            <additionalValue>
               <value>100</value>
               <currency>ARS</currency>
            </additionalValue>
         </entry>
      </additionalValues>
      <order>
         <id>1400462691</id>
      </order>
      <type>REFUND</type>
      <reason>Razón para solicitar el reembolso de la transacción.</reason>
      <parentTransactionId>976d0411-8d0f-46e7-b5fe-515dad9a41ee</parentTransactionId>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Ejemplo respuesta:
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

### Consultar los estados de los Reembolsos {#query-the-refund-status} 
Como mencionamos anteriormente, la solicitud de reembolso tarda entre 1 y 3 días en ser procesada y aprobada o rechazada. Si deseas saber el estado de un reembolso, tienes dos opciones:

#### Verificar el estado en el Módulo PayU {#check-status-through-the-payu-module}
1. Ingresa a tu cuenta PayU. En el panel izquierdo, expande el menú _**Transacciones**_ y selecciona la opción _**Reporte de ventas**_.

![PrintScreen](/assets/Refunds/Refunds_es_01.png)

2. Utiliza el campo _**Filtrar mis ventas**_ para encontrar la orden utilizando su ID y el ID de la transacción.

<img src="/assets/Refunds/Refunds_es_02.png" alt="PrintScreen" width="50%"/><br>

3. La columna estado muestra si el reembolso a sido aprobado o rechazado; si no ha sido aprobado, esta columna muestra que se ha solicitado un reembolso.

![PrintScreen](/assets/Refunds/Refunds_es_03.png)

#### Verificar el estado utilizando consultas {#check-status-using-queries}
Puedes consultar el estado de un reembolso utilizando el [API de consultas]({{< ref "Queries-API.md" >}}). En la petición de la consulta, necesitas enviar el id de la orden.

Cuando consultas una orden, el sistema retorna su última transacción.

Hay tres posibles estados en la respuesta de tu solicitud:
* **Solicitud no resuelta**: si la solicitud no ha sido resuelta, la orden que aparece en la consulta está en estado `CAPTURED` (parámetro `result.payload.status` en la respuesta), el primer tipo de transacción es `AUTHORIZATION_AND_CAPTURE` (parámetro `result.transactions.type` en la respuesta) y el primer estado de la transacción es `APPROVED` (primer parámetro `result.transactions.transactionResponse.state` en la respuesta).
* **Aprobada**: si la solicitud de reembolso ha sido aprobada por un agente de servicio de PayU, la orden que aparece en la consulta está en estado `REFUNDED` (parámetro `result.payload.status` en la respuesta), el primer tipo de transacción es `REFUND` (parámetro `result.transactions.type` en la respuesta) y el primer estado de la transacción es `APPROVED` (primer parámetro `result.transactions.transactionResponse.state` en la respuesta).
* **Declinada**: si la solicitud de reembolso ha sido declinada por un agente de servicio de PayU, la orden que aparece en la consulta está en estado `CAPTURED` (parámetro `result.payload.status` en la respuesta), el primer tipo de transacción es `REFUND` (parámetro `result.transactions.type` en la respuesta) y el primer estado de la transacción es `DECLINED` (primer parámetro `result.transactions.transactionResponse.state` en la respuesta).