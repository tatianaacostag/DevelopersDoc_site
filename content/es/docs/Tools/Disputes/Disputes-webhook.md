---
title: "Webhook de Disputas"
linkTitle: "Webhook de Disputas"
date: 2024-11-25T08:34:58-05:00
description: >
  Este documento explica el propósito del webhook de disputas y la estructura de las notificaciones y datos enviados.
weight: 70
tags: ["subtopic"]
---

## ¿Qué es el Webhook de Disputas?

PayU ofrece a los comerciantes un sistema de notificaciones mediante webhook para simplificar la gestión de disputas. Este webhook actúa como un canal de comunicación entre PayU y el comercio, enviando notificaciones en tiempo real cada vez que se genera o actualiza una disputa para una transacción, incluyendo su estado, motivo y otros datos relevantes. Esto permite una respuesta oportuna a las disputas y ayuda a los comercios a gestionar sus casos de manera eficiente.

{{% alert title="Nota" color="info" %}}

Para aprender cómo configurar la URL para recibir notificaciones de disputas, visita la <a href="https://developers.payulatam.com/latam/es/payu-module-documentation/payu-operations/disputes-mp.html" target="_blank">sección de Disputas</a>.

{{% /alert %}}

## Parámetros del Payload del Webhook

| **Campo** | **Descripción** |
|---|---|
| **properties > state**         | Estado de la disputa. Valores posibles: `DOCUMENTS_NOT_PRESENTED`, `EXPIRED`, `LOST`, `NOTIFIED`, `ON_PAYMENT_NETWORK_REVIEW`, `ON_REVIEW`, `REFUNDED`, `WON`. Consulta [Estados de Disputas](https://developers.payulatam.com/latam/en/docs/tools/disputes.html#dispute-states). |
| **properties > reopenDate**    | Fecha de reapertura de la transacción en formato epoch, si aplica. |
| **properties > maxDeliveryDate** | Fecha máxima de entrega en formato epoch. |
| **properties > reference**     | Referencia del comerciante utilizada para identificar la orden. |
| **properties > creationDate**  | Fecha de creación de la transacción en formato epoch. |
| **properties > isFrozen**      | Indica si la transacción está congelada. |
| **properties > comment**       | Comentarios adicionales sobre la disputa. |
| **properties > origin**        | Origen de la disputa. Valores posibles: `PAP`, `BANK`. |
| **properties > deliveryDate**  | Fecha de entrega de la disputa, si aplica. |
| **properties > fee**           | Tarifa asociada con la disputa. |
| **properties > currency**      | Moneda de la transacción. |
| **properties > reason**        | Motivo de la disputa o estado de la transacción. Valores posibles: `UNFREEZE_FUNDS`, `PRODUCT_UNACCEPTABLE`, `UNRECOGNIZED_PAYMENT`, `NOT_REPORTED_BY_ENTITY`, `PRODUCT_NOT_DELIVERED`, `DUPLICATED`, `FRAUD`, `AMOUNT_DOES_NOT_CORRESPOND`. |
| **properties > buyerIpAddress** | Dirección IP del comprador. |
| **properties > isAnalyzed**    | Indica si la transacción ha sido analizada. Valores posibles: `true`, `false`. |
| **properties > value**         | Valor de la transacción en la moneda de la transacción. |
| **properties > notificationDate** | Fecha de notificación de la transacción en formato epoch. |
| **id**                         | Identificador único de la disputa. |
| **transactionId**              | Identificador único de la transacción de compra. |
| **orderId**                    | Identificador único de la orden. |
| **lease**                      | Fecha de bloqueo de la disputa en formato epoch. |
| **valueInOriginalCurrency**    | Valor de la transacción en su moneda original. |
| **originalCurrency**           | Moneda original de la transacción. |
| **fee**                        | Tarifa asociada con la disputa. |
| **antifraudGuarantee**         | Indica si se aplica una garantía antifraude. |
| **reason**                     | Motivo de la disputa. Mismos valores posibles que el campo `properties > reason`. |
| **evidenceSentToNetwork**      | Indica si se han enviado evidencias a la red. |
| **notificationDate**           | Fecha de notificación de la disputa en formato epoch. |
| **maxDeliveryDate**            | Fecha máxima de entrega en formato epoch. |
| **deliveryDate**               | Fecha de entrega de la disputa, si aplica. |
| **reference**                  | Referencia del comerciante para identificar la orden. |
| **creationDate**               | Fecha de creación de la disputa en formato epoch. |
| **frozen**                     | Indica si el monto de la transacción está congelado en el balance disponible de PayU. Valores posibles: `true`, `false`. |
| **wonBank**                    | Indica si el banco ganó la disputa. Valores posibles: `true`, `false`. |
| **analyzed**                   | Indica si la disputa ha sido analizada. Valores posibles: `true`, `false`. |
| **reopenDate**                 | Fecha de reapertura de la disputa en formato epoch, si aplica. |
| **origin**                     | Origen de la disputa. Valores posibles: `BANK`. |
| **buyerIpAddress**             | Dirección IP del comprador. |
| **currency**                   | Moneda de la disputa. |
| **comment**                    | Comentarios adicionales sobre la disputa. |
| **state**                      | Estado actual de la disputa. Mismos valores posibles que el campo `properties > state`. |
| **value**                      | Valor de la transacción en la moneda aplicable. |
| **childProperties**            | Propiedades adicionales de la disputa, si aplica. |

## Ejemplos de Payload

A continuación, se presentan ejemplos de los payloads que PayU envía a la URL del webhook configurada por el comercio en el Panel de Administración.

### Ejemplo de Payload `NOTIFIED`

```JSON
{
  "properties": {
    "state": "NOTIFIED",
    "reopenDate": null,
    "maxDeliveryDate": 1645564263486,
    "reference": "Test PayU: CO Lady 2022-2-8 16:10:8",
    "creationDate": 1644354663461,
    "isFrozen": true,
    "comment": "",
    "origin": "BANK",
    "deliveryDate": null,
    "fee": 0,
    "currency": "COP",
    "reason": "FRAUD",
    "buyerIpAddress": null,
    "isAnalyzed": false,
    "value": 2000,
    "notificationDate": 1644354663461
  },
  "id": "8fc5faf9-9fcf-4bf1-878a-bf7691187909",
  "transactionId": "4387b27f-8970-4418-9b74-6515ec89febd",
  "orderId": 1403033521,
  "lease": 1644355263920,
  "valueInOriginalCurrency": 2000,
  "originalCurrency": "COP",
  "antifraudGuarantee": null,
  "reason": "FRAUD",
  "evidenceSentToNetwork": null,
  "notificationDate": 1644354663461,
  "maxDeliveryDate": 1645564263486,
  "deliveryDate": null,
  "fee": 0,
  "frozen": true,
  "creationDate": 1644354663461,
  "reference": "Test PayU: CO Lady 2022-2-8 16:10:8",
  "origin": "BANK",
  "reopenDate": null,
  "analyzed": false,
  "wonBank": null,
  "buyerIpAddress": null,
  "currency": "COP",
  "comment": "",
  "state": "NOTIFIED",
  "value": 2000,
  "childProperties": null
}
```

### Ejemplo de Payload `LOST` 

```JSON
{
  "properties": {
    "state": "LOST",
    "reopenDate": null,
    "maxDeliveryDate": 1631735892386,
    "reference": "PayU_Auth_Capt_undefined_2021-9-1T14:57:27",
    "creationDate": 1630526292368,
    "isFrozen": false,
    "comment": null,
    "origin": "BANK",
    "deliveryDate": null,
    "fee": 0,
    "currency": "COP",
    "reason": "AMOUNT_DOES_NOT_CORRESPOND",
    "buyerIpAddress": "127.0.0.1",
    "isAnalyzed": false,
    "value": 30000,
    "notificationDate": 1630526292368
  },
  "id": "64d13669-bd0e-4655-be91-25d44979f467",
  "transactionId": "1420d700-1586-43a8-88a5-76a339c97ec0",
  "orderId": 1400887092,
  "lease": 1630526892469,
  "valueInOriginalCurrency": 30000,
  "originalCurrency": "COP",
  "fee": 0,
  "antifraudGuarantee": null,
  "reason": "AMOUNT_DOES_NOT_CORRESPOND",
  "evidenceSentToNetwork": null,
  "notificationDate": 1630526292368,
  "maxDeliveryDate": 1631735892386,
  "deliveryDate": null,
  "reference": "PayU_Auth_Capt_undefined_2021-9-1T14:57:27",
  "creationDate": 1630526292368,
  "frozen": false,
  "wonBank": null,
  "analyzed": false,
  "reopenDate": null,
  "origin": "BANK",
  "buyerIpAddress": "127.0.0.1",
  "currency": "COP",
  "comment": null,
  "state": "LOST",
  "value": 30000,
  "childProperties": null
}
```

### Ejemplo de Payload `WON`

```JSON
{
  "properties": {
    "state": "WON",
    "reopenDate": null,
    "maxDeliveryDate": 1645564263486,
    "reference": "Test PayU: CO Lady 2022-2-8 16:10:8",
    "isWonByBank": true,
    "creationDate": 1644354663461,
    "isFrozen": false,
    "comment": "",
    "origin": "BANK",
    "deliveryDate": null,
    "fee": 0,
    "currency": "COP",
    "reason": "FRAUD",
    "buyerIpAddress": null,
    "isAnalyzed": false,
    "value": 2000,
    "notificationDate": 1644354663461
  },
  "id": "8fc5faf9-9fcf-4bf1-878a-bf7691187909",
  "transactionId": "4387b27f-8970-4418-9b74-6515ec89febd",
  "orderId": 1403033521,
  "lease": 1644355483727,
  "valueInOriginalCurrency": 2000,
  "originalCurrency": "COP",
  "antifraudGuarantee": null,
  "reason": "FRAUD",
  "evidenceSentToNetwork": null,
  "notificationDate": 1644354663461,
  "maxDeliveryDate": 1645564263486,
  "deliveryDate": null,
  "fee": 0,
  "frozen": false,
  "creationDate": 1644354663461,
  "reference": "Test PayU: CO Lady 2022-2-8 16:10:8",
  "origin": "BANK",
  "reopenDate": null,
  "analyzed": false,
  "wonBank": true,
  "buyerIpAddress": null,
  "currency": "COP",
  "comment": "",
  "state": "WON",
  "value": 2000,
  "childProperties": null
}
```