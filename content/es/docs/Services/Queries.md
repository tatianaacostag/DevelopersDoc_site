---
title: "Consulta de transacciones"
linkTitle: "Consulta de transacciones"
date: 2021-03-26T09:12:41-05:00
description: >
  Utilizando la funcionalidad de consultas, puedes verificar el estado de las órdenes realizadas junto con sus transacciones. 
weight: 20
---

## Consideraciones {#considerations}
Antes de utilizar la funcionalidad de _Consultas_, ten en cuenta las siguientes consideraciones:

* Se recomienda utilizar _Consultas_ para transacciones en estado `PENDING`.
* De acuerdo con el medio de pago, el tiempo para realizar la consulta puede variar. Sin embargo, te recomendamos realizar la primera consulta siete minutos luego de que se crea la transacción.
* No reintentes consultar una transacción cuando PayU indica que no existe.
* Las transacciones de transferencias bancarias están disponibles cada diez minutos.

## Criterios de consulta {#query-criteria}
Para consultar transacciones, PayU te permite buscar por cualquiera de los siguientes criterios:

* *Order Id*: es generado por PayU. Identifica la orden en el sistema de PayU y es el principal elemento donde se registra cualquier movimiento (cobros, reintentos, reembolsos, etc)
* *Transaction Id*: PayU genera este identificador por cada movimiento asociado con una orden (Order ID).
* *Reference Number*: es generado por la tienda. Identifica la orden o la compra en tu sistema, PayU guarda este valor tal y como lo envías.

## ¿Qué sigue? {#whats-next}
La integración con esta funcionalidad puede realizarse con cualquiera de nuestros tipos de integración:

* [Para integración API, consulta este artículo]({{< ref "Queries-API.md" >}})
* [Para integración SDK, consulta este artículo]({{< ref "QueriesSDK.md" >}})