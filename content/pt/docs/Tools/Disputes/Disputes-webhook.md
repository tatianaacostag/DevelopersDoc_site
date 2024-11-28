---
title: "Webhook de Disputas"
linkTitle: "Webhook de Disputas"
date: 2024-11-25T08:34:58-05:00
description: >
  Este documento explica a finalidade do webhook de disputas e a estrutura das notificações e dos dados enviados.
weight: 70
tags: ["subtopic"]
---

## O que é o Webhook de Disputas?

A PayU oferece aos comerciantes um sistema de notificações via webhook para simplificar o gerenciamento de disputas. Esse webhook atua como um canal de comunicação entre a PayU e o comerciante, enviando notificações em tempo real sempre que uma disputa é criada ou atualizada para uma transação, incluindo seu status, motivo e outros dados relevantes. Isso facilita uma resposta ágil às disputas e permite que os comerciantes gerenciem seus casos de forma eficiente.

{{% alert title="Nota" color="info" %}}

Para aprender como configurar a URL para receber notificações de disputas, visite a <a href="https://developers.payulatam.com/latam/pt/payu-module-documentation/payu-operations/disputes-mp.html" target="_blank">seção de Disputas</a>.

{{% /alert %}}

## Parâmetros do Payload do Webhook

| **Campo** | **Descrição** |
|---|---|
| **properties > state**         | Estado da disputa. Valores possíveis: `DOCUMENTS_NOT_PRESENTED`, `EXPIRED`, `LOST`, `NOTIFIED`, `ON_PAYMENT_NETWORK_REVIEW`, `ON_REVIEW`, `REFUNDED`, `WON`. Consulte [Estados de Disputa](https://developers.payulatam.com/latam/pt/docs/tools/disputes.html#dispute-states). |
| **properties > reopenDate**    | Data de reabertura da transação no formato epoch, se aplicável. |
| **properties > maxDeliveryDate** | Data máxima de entrega no formato epoch. |
| **properties > reference**     | Referência do comerciante usada para identificar o pedido. |
| **properties > creationDate**  | Data de criação da transação no formato epoch. |
| **properties > isFrozen**      | Indica se a transação está congelada. |
| **properties > comment**       | Comentários adicionais sobre a disputa. |
| **properties > origin**        | Origem da disputa. Valores possíveis: `PAP`, `BANK`. |
| **properties > deliveryDate**  | Data de entrega da disputa, se aplicável. |
| **properties > fee**           | Taxa associada à disputa. |
| **properties > currency**      | Moeda da transação. |
| **properties > reason**        | Motivo da disputa ou estado da transação. Valores possíveis: `UNFREEZE_FUNDS`, `PRODUCT_UNACCEPTABLE`, `UNRECOGNIZED_PAYMENT`, `NOT_REPORTED_BY_ENTITY`, `PRODUCT_NOT_DELIVERED`, `DUPLICATED`, `FRAUD`, `AMOUNT_DOES_NOT_CORRESPOND`. |
| **properties > buyerIpAddress** | Endereço IP do comprador. |
| **properties > isAnalyzed**    | Indica se a transação foi analisada. Valores possíveis: `true`, `false`. |
| **properties > value**         | Valor da transação na moeda da transação. |
| **properties > notificationDate** | Data da notificação da transação no formato epoch. |
| **id**                         | Identificador único da disputa. |
| **transactionId**              | Identificador único da transação de compra. |
| **orderId**                    | Identificador único do pedido. |
| **lease**                      | Data de bloqueio ou locação da disputa no formato epoch. |
| **valueInOriginalCurrency**    | Valor da transação em sua moeda original. |
| **originalCurrency**           | Moeda original da transação. |
| **fee**                        | Taxa associada à disputa. |
| **antifraudGuarantee**         | Indica se há uma garantia antifraude aplicada. |
| **reason**                     | Motivo da disputa. Mesmos valores possíveis do campo `properties > reason`. |
| **evidenceSentToNetwork**      | Indica se as evidências foram enviadas para a rede. |
| **notificationDate**           | Data da notificação da disputa no formato epoch. |
| **maxDeliveryDate**            | Data máxima de entrega no formato epoch. |
| **deliveryDate**               | Data de entrega da disputa, se aplicável. |
| **reference**                  | Referência do comerciante para identificar o pedido. |
| **creationDate**               | Data de criação da disputa no formato epoch. |
| **frozen**                     | Indica se o valor da transação está congelado no saldo disponível da PayU. Valores possíveis: `true`, `false`. |
| **wonBank**                    | Indica se o banco ganhou a disputa. Valores possíveis: `true`, `false`. |
| **analyzed**                   | Indica se a disputa foi analisada. Valores possíveis: `true`, `false`. |
| **reopenDate**                 | Data de reabertura da disputa no formato epoch, se aplicável. |
| **origin**                     | Origem da disputa. Valores possíveis: `BANK`. |
| **buyerIpAddress**             | Endereço IP do comprador. |
| **currency**                   | Moeda da disputa. |
| **comment**                    | Comentários adicionais sobre a disputa. |
| **state**                      | Estado atual da disputa. Mesmos valores possíveis do campo `properties > state`. |
| **value**                      | Valor da transação na moeda aplicável. |
| **childProperties**            | Propriedades adicionais da disputa, se aplicável. |

## Exemplos de Payload

Abaixo estão exemplos dos payloads que a PayU envia para a URL de webhook configurada pelo comerciante no Painel de Administração.

### Exemplo de Payload `NOTIFIED`

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

### Exemplo de Payload `LOST`

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

### Exemplo de Payload `WON`

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