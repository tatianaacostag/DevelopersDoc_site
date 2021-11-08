---
title: "Anulaciones y Reembolsos"
linkTitle: "Anulaciones y Reembolsos"
date: 2021-03-26T15:09:39-05:00
description: >
  Esta funcionalidad te permite solicitar la cancelación o el reembolso de transacciones autorizadas o cobradas. Puedes crear la solicitud utilizando los métodos de reembolso (_Refund_) o de cancelación (_Void_) de acuerdo con el estado de la transacción.
weight: 60
---

## Entendiendo los conceptos {#understanding-concepts}
Antes de continuar, vamos a explicar los siguientes conceptos:
* *Anulación o Void*: esta operación reversa una transacción previamente autorizada.

* *Reembolso o Refund*: esta operación solicita el reembolso de transacciones previamente capturadas (cobradas). Los reembolsos se pueden solicitar por el monto total o parcial. Un comprador puede solicitar un reembolso cuando no se está satisfecho con la compra, la compra tuvo múltiples cobros o no recibió el producto o el servicio.

### Anulación o Void {#void}
El método `VOID` cancela una transacción previamente autorizada. La anulación es un procedimiento automático, tan pronto como envíe el request de `VOID`, no sigue ningún flujo de aprobación y la transacción no se cobra al tarjetahabiente.

{{% alert title="Nota" color="info"%}}
El método `VOID` no está disponible en Colombia ni en Panamá.
{{% /alert%}}

### Reembolso o Refund {#refund}
Un reembolso se solicita cuando una tienda decide voluntariamente regresar el dinero al cliente debido a razones de insatisfacción o cuando la tienda no tiene suficiente inventario del producto comprado. El método `REFUND` solicita el reverso de una transacción previamente capturada.

A diferencia del método `VOID`, este método requiere una aprobación. El proceso de reembolso se explica a continuación:

1. Cuando tu cliente solicita un reembolso, debes pedirlo utilizando el [módulo de PayU]({{< ref "Refunds-MP.md" >}}) o nuestras integraciones. La solicitud requiere el _Id de la Orden_ y una razón del reembolso.

2. Una vez envías la solicitud, PayU la recibe y decide aprobarla o rechazarla en uno o tres días hábiles.

El `REFUND` tiene tres estados:

- `UNRESOLVED`: la solicitud ha sido enviada a PayU para aprobación. En este punto, no se ha agregado ninguna transacción a la orden y cuando la consulte utilizando el [servicio de Consultas]({{< ref "queries" >}}), la respuesta solo muestra la transacción correspondiente a la aprobación del pago.
- `APPROVED`: la solicitud ha sido aprobada por un agente de servicio de PayU. En este punto la orden cambia su estado a `REFUNDED` y PayU agrega a la orden, una transacción de reembolso (`REFUND`) con estado aprobado.
- `DECLINED`: la solicitud no cumplió con las políticas definidas por PayU y fue rechazada. Cuando se rechaza el reembolso, PPayU agrega a la orden, una transacción de reembolso (`REFUND`) con estado rechazado.

Para más información sobre transacciones autorizadas y capturadas, consulta [Pagos]({{< ref "payments#payment-flows" >}}).

## Consideraciones {#considerations}
Antes de utilizar las funcionalidades de _ANULACIÓN_ o _REEMBOLSO_, ten en cuenta las siguientes consideraciones:

* Los métodos de _ANULACIÓN_ or _REEMBOLSO_ solo están disponibles para transacciones realizadas con tarjeta de crédito. Si la solicitud se realiza sobre una compra con un método de pago diferente como pago en efectivo, transferencia bancaria, etc; la solicitud es rechazada por PayU.
* PayU solo crea una aplicación por cada solicitud de reembolso, si una solicitud se repite para la misma transacción, PayU indica que ya se registró la solicitud.
* PayU solo acepta solicitudes de reembolso de transacciones capturadas.
* Puedes reintentar la solicitud de reembolso si fue rechazada previamente.
* Una vez hagas la solicitud, el monto de la transacción se convierte en parte del Saldo Congelado de tu cuenta de PayU hasta que sea procesado. 
  - Si tu solicitud de reembolso es `APROBADA`, el monto es retornado al tarjetahabiente. 
  - Si tu solicitud de reembolso es `DECLINADA`, el monto se libera del Saldo Congelado y retorna a tu cuenta de PayU.
* Una vez se apruebe el reembolso, este será reflejado en la tarjeta de crédito del pagador cuando el banco lo haga efectivo.
* Para consultar el estado de tu solicitud de reembolso, utiliza el [Servicio de consultas]({{< ref "queries" >}}) disponible.

## ¿Qué sigue? {#whats-next}
De acuerdo con el país de procesamiento, pueden aplicar ciertas condiciones especiales para ejecutar anulaciones o reembolsos. Estas condiciones se explican en el tipo de integración que escojas.

La integración con esta funcionalidad puede realizarse con cualquiera de nuestros tipos de integración:

* [Para integración API, consulta este artículo]({{< ref "Refunds-API.md" >}})
* [Para integración SDK, consulta este artículo]({{< ref "RefundsSDK.md" >}})