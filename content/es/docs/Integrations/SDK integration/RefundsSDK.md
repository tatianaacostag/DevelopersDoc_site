---
title: "SDK de Reembolsos y Anulaciones"
linkTitle: "SDK de Reembolsos y Anulaciones"
date: 2021-03-29T11:15:44-05:00
description: >
  Esta funcionalidad te permite solicitar la cancelación o el reembolso de transacciones autorizadas o cobradas. Puedes crear la solicitud utilizando los métodos de reembolso (_Refund_) o de cancelación (_Void_) de acuerdo con el estado de la transacción.
weight: 100
tags: ["subtopic"]
---

Para integrarte con el SDK de Reembolsos y Anulaciones, apunta tus peticiones a las siguientes URLs de acuerdo con tu ambiente.

{{< tabs tabTotal="2" tabID="1" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
// URL para pruebas: https://sandbox.api.payulatam.com/payments-api/
PayU.paymentsUrl = “https://api.payulatam.com/payments-api/”;
// URL para pruebas: https://sandbox.api.payulatam.com/reports-api/
PayU.reportsUrl = “https://api.payulatam.com/reports-api/”;
```

{{< /tab >}}

{{< tab tabNum="2" >}}

```PHP
// URL para pruebas: https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi
Environment::setPaymentsCustomUrl(“https://api.payulatam.com/payments-api/4.0/service.cgi”);
// URL para pruebas: https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi
Environment::setReportsCustomUrl(“https://api.payulatam.com/reports-api/4.0/service.cgi”);
```

{{< /tab >}}
{{< /tabs >}}
<br>

Si necesitas entender los conceptos y leer más consideraciones sobre Reembolsos y Anulaciones, consulta [este artículo]({{< ref "Refunds.md" >}}).

## Consideraciones por país {#considerations-per-country}
Antes de utilizar el API de Reembolsos y Anulaciones, ten en cuenta las siguientes consideraciones.

### Argentina
* El tiempo máximo para enviar una anulación es 14 días. Si no se envía una anulación o una captura luego de este tiempo, la transacción se anula automáticamente.
* El tiempo mínimo para enviar un reembolso es 10 minutos luego de la aprobación y el máximo es 365 días y 180 días para reembolsos parciales.
* No se soportan reembolsos con decimales.
* Cuando se aprueba el reembolso, el pagador obtiene su dinero en máximo 30 días hábiles.

### Brasil {#brazil}  
* El tiempo máximo para enviar una anulación es siete (7) días. Si no se envía una anulación o una captura luego de este tiempo, la transacción se cancela.
* El tiempo mínimo para enviar un reembolso es 10 minutos luego de la aprobación y el máximo es 90 días para transacciones procesadas en Redecard y 120 para transacciones procesadas en Cielo.
* Cuando se aprueba el reembolso, el pagador obtiene su dinero en máximo 15 días hábiles.

### Chile
* Debido a restricciones de la red, se pueden autorizar anulaciones dentro de las tres primeras horas luego de la autorización. Si no se acepta la anulación o no se envía una captura luego de siete (7) días, la transacción se anula automáticamente.
* El tiempo mínimo para enviar un reembolso es 10 minutos luego de la aprobación y el máximo es 90 días.
* No se soportan reembolsos con decimales.
* Cuando se aprueba un reembolso, el pagador obtiene su dinero en 8 a 20 días hábiles.
* Los reembolsos parciales para transacciones qu utilizan cuotas se reciben en línea pero son procesados de forma manual debido a restricciones de la red adquirente.
* El valor mínimo para enviar un Reembolso es 10 CLP.

### Colombia
* Voids are not supported.
* The minimum time to send a refund is 10 minutes after the approval and the maximum is two years.
* Minimum amount to send the Refund 300 COP.
* If refund is not sent the same day in which the transaction was captured (before 9 pm UTC-5) the refund goes immediately to a manual process without sending the online attempt.
* When a refund is approved, the payer gets the money back in maximum 30 working días.
* Partial refunds are not available for international credit cards.

### México {#mexico}
* El tiempo mínimo para enviar una anulación (Void) es 10 minutos luego de la autorización y el máximo es 30 días. Si la transacción se hizo con American Express, el tiempo máximo es siete (7) días.<br>Si no se envía una anulación o una captura luego de este tiempo, la transacción se anula automáticamente.
* El tiempo mínimo para enviar un reembolso es 10 minutos luego de la aprobación y el máximo es 180 días. Si la transacción fue procesada por Bancomer, el tiempo máximo es 45 días.
* Cuando se aprueba un reembolso, el pagador obtiene su dinero en 30 días hábiles.
* No se soportan reembolsos con decimales.

### Perú {#peru}
* Los días máximos para enviar una autorización son: 
    - Visa: 21 días. Si no se envía una anulación o una captura luego de este tiempo, la transacción se captura automáticamente.
    - Mastercard: 28 días. Si no se envía una anulación o una captura luego de este tiempo, la transacción se captura automáticamente.
    - American Express: 30 días. Si no se envía una anulación o una captura luego de este tiempo, la transacción se anula automáticamente.
    - Diners: 11 días. Si no se envía una anulación o una captura luego de este tiempo, la transacción se anula automáticamente.
* El tiempo mínimo para enviar un reembolso es 10 minutos luego de la aprobación y el máximo es 180 días.
* Se soportan reembolsos parciales para transacciones sin cuotas. Ten en cuenta que las transacciones en una cuota son consideradas como sin cuotas.
* Los Reembolsos parciales con visanet deben enviarse un día después.
* Cuando se aprueba un reembolso, el pagador obtiene su dinero en 15 to 25 días hábiles.
* La cantidad mínima para enviar un Reembolso es 1 USD o 1 PEN.

## Anulación (Void) {#void}
Le método `VOID` cancela una transacción previamente autorizada. La anulación es un procedimiento automático, tan pronto envías la petición de `VOID`, no sigue ningún flujo de aprobación y la transacción no se cobra al tarjetahabiente.

### Llamado del método {#method-call}
Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Ingresa aquí el ID de la orden.
parameters.put(PayU.PARAMETERS.ORDER_ID, "40049920");

// Ingresa aquí el ID de la transacción.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "96535b36-99db-4c66-bd87-6ad5c59b25a8");

// Ingresa la razón de la anulación. Opcional
parameters.put(PayU.PARAMETERS.REASON, "Razón para solicitar la anulación de la transacción");

TransactionResponse response = PayUPayments.doVoid(parameters);

// Respuesta
if (response != null){
  response.getOrderId();
  response.getState();
  response.getPendingReason();
  response.getResponseMessage();
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$parameters = array(
	// Ingresa aquí el ID de la orden.
	PayUParameters::ORDER_ID => "40049920",

	// Ingresa aquí el ID de la transacción.
	PayUParameters::TRANSACTION_ID => "96535b36-99db-4c66-bd87-6ad5c59b25a8",

	// Ingresa la razón de la anulación. Opcional
	PayUParameters::REASON => "Razón para solicitar la anulación de la transacción",
);

$response = PayUPayments::doVoid($parameters);

if ($response) {
	$response->transactionResponse->orderId;
	$response->transactionResponse->state;
	$response->transactionResponse->pendingReason;
	$response->transactionResponse->responseMessage; 
}
```
{{< /tab >}}
{{< /tabs >}}

## Reembolsos (Refunds) {#refunds}  
Un reembolso se solicita cuando una tienda decide voluntariamente regresar el dinero al cliente debido a razones de insatisfacción o cuando la tienda no tiene suficiente inventario del producto comprado. El método `REFUND` solicita el reverso de una transacción previamente capturada.

Los reembolsos pueden ser solicitados por la cantidad total o parcial (`PARTIAL REFUND`).

### Llamado del método {#method-call-1}
Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

#### Reembolso {#refunds}

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Ingresa aquí el ID de la orden.
parameters.put(PayU.PARAMETERS.ORDER_ID, "40049920");

// Ingresa aquí el ID de la transacción.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "96535b36-99db-4c66-bd87-6ad5c59b25a8");

// Ingresa aquí la razón del reembolso
parameters.put(PayU.PARAMETERS.REASON, "Razón para solicitar el reembolso de la transacción");

TransactionResponse response = PayUPayments.doRefund(parameters);

// Respuesta
if (response != null){
  response.getOrderId();
  response.getState();
  response.getPendingReason();
  response.getResponseMessage();
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$parameters = array(
	// Ingresa aquí el ID de la orden.
	PayUParameters::ORDER_ID => "40049920",

	// Ingresa aquí el ID de la transacción.
	PayUParameters::TRANSACTION_ID => "96535b36-99db-4c66-bd87-6ad5c59b25a8",

	// Ingresa aquí la razón del reembolso
	PayUParameters::REASON => "Razón para solicitar el reembolso de la transacción",
);

$response = PayUPayments::doRefund($parameters);

if ($response) {
	$response->transactionResponse->orderId;
	$response->transactionResponse->state;
	$response->transactionResponse->pendingReason;
	$response->transactionResponse->responseMessage; 
}
```
{{< /tab >}}
{{< /tabs >}}

#### Reembolso parcial {#partial-refund}

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Ingresa aquí el ID de la orden.
parameters.put(PayU.PARAMETERS.ORDER_ID, "40049920");

// Ingresa aquí el ID de la transacción.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "96535b36-99db-4c66-bd87-6ad5c59b25a8");

// -- Valor de reembolso parcial --
// Ingresa aquí el valor del reembolso parcial.
parameters.put(PayU.PARAMETERS.VALUE, "950");
// Ingresa aquí la moneda.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.CLP.name());

// Ingresa aquí la razón del reembolso parcial
parameters.put(PayU.PARAMETERS.REASON, "Razón para solicitar el reemplazo parcial de la transacción");

TransactionResponse response = PayUPayments.doPartialRefund(parameters);

// Respuesta
if (response != null){
  response.getOrderId();
  response.getState();
  response.getPendingReason();
  response.getResponseMessage();
}

```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$parameters = array(
	// Ingresa aquí el ID de la orden.
	PayUParameters::ORDER_ID => "40049920",

	// Ingresa aquí el ID de la transacción.
	PayUParameters::TRANSACTION_ID => "96535b36-99db-4c66-bd87-6ad5c59b25a8",

  // -- Valor de reembolso parcial --
  // Ingresa el valor del reembolso parcial.
  PayUParameters::VALUE => "950",
  // Ingresa aquí la moneda.
  PayUParameters::CURRENCY => "CLP",

	// Ingresa aquí la razón del reembolso parcial
	PayUParameters::REASON => "Razón para solicitar el reemplazo parcial de la transacción",
);

$response = PayUPayments::doPartialRefund($parameters);

if ($response) {
	$response->transactionResponse->orderId;
	$response->transactionResponse->state;
	$response->transactionResponse->pendingReason;
	$response->transactionResponse->responseMessage; 
}
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
* **Solicitud no resuelta**: si la solicitud no ha sido resuelta, la orden que aparece en la consulta está en estado `CAPTURED`, el primer tipo de transacción es `AUTHORIZATION_AND_CAPTURE` y el primer estado de la transacción es `APPROVED`.
* **Aprobada**: si la solicitud de reembolso ha sido aprobada por un agente de servicio de PayU, la orden que aparece en la consulta está en estado `REFUND` y el primer estado de la transacción es `APPROVED`.
* **Declinada**: si la solicitud de reembolso ha sido declinada por un agente de servicio de PayU, la orden que aparece en la consulta está en estado `CAPTURED` , el primer tipo de transacción es `REFUND` y el primer estado de la transacción es `DECLINED`.
