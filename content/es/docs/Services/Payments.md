---
title: "Pagos"
linkTitle: "Pagos"
date: 2021-03-25T14:28:20-05:00
description: >
  La funcionalidad de Pagos le permite a tu tienda procesar diferentes tipos de transacciones con múltiples métodos de pago.
weight: 10
---

Independiente del [tipo de integración]({{< ref "integrations" >}}) que escojas, PayU provee operaciones para procesar tus transacciones. La siguiente sección explica estos métodos.

## Flujos de pago {#payment-flows}
PayU puede procesar pagos utilizando dos tipos de flujos: de dos pasos y de un paso.

![Payments](/assets/Payments/autorizacionycaptura-es.png)

* El flujo de un paso combina los pasos de _**Autorización**_ y _**Captura**_ en una sola transacción. Los fondos son trasferidos de la cuenta de tu cliente a tu cuenta de PayU cuando se haya autorizado el pago. El único paso en este flujo es:
  - _**Cobro (Autorización y Captura)**_: esta operación envía el monto de la transacción a validar (Autorización) y si se aprueba, el monto es debitado de la tarjeta inmediatamente (Captura). Este es el método más común para procesar transacciones.

* En el flujo de dos pasos, primero necesitas autorizar y reservar los fondos del cliente. Luego, completar la transacción para transferir el monto autorizado a tu cuenta de PayU. Los pasos en este flujo son:
  - _**Autorización**_: esta operación se utiliza para verificar que la tarjeta utilizada para pagar esté activa, tiene fondos suficientes, etc. El cobro no está completo hasta que se envíe una transacción de captura. </br>
Por ejemplo, cuando utilizas aplicaciones de transporte, luego de solicitar el servicio, la aplicación envía una _Autorización_ para reservar el valor del viaje y verificar que tu tarjeta es válida (activa y con fondos suficiente). Sin embargo, el cobro no se realiza todavía.
  - _**Captura**_: Esta operación termina la transacción autorizada, es decir, en este punto la cuenta hace débito a la tarjeta.</br>
De nuevo en el ejemplo de la aplicación de transporte, una vez el servicio haya finalizado, la aplicación cobra el monto total y termina la transacción.

{{% alert title="Nota" color="info"%}}

El flujo de dos pasos no está soportado para Colombia y Panamá. Para Chile, este flujo está disponible únicamente bajo solicitud, contacta a tu representante de ventas.

{{% /alert %}}

### Métodos de pago {#payment-methods}
Los métodos de pago disponibles utilizados para procesar transacciones son:

* Tarjetas de crédito.
* Pagos en efectivo o en bancos.
* Transferencias bancarias.

{{% alert title="Nota" color="info"%}}

Consulta [este artículo]({{< ref "Select-your-payment-method.md" >}}) para conocer los métodos de pago disponibles para los compradores por país.

{{% /alert %}}

## ¿Qué sigue? {#whats-next}
La integración con esta funcionalidad depende del país de tus transacciones, la operación seleccionada y el método de pago.

{{< payments/countries >}}
