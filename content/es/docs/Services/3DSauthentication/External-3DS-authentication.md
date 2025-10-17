---
title: "Autenticación 3DS Externa"
linkTitle: "Autenticación 3DS Externa"
date: 2024-07-01T11:32:55-05:00
description: >
  Aprovecha tu servicio 3DS existente para mejorar la seguridad de los pagos con la integración passthrough de PayU.
weight: 22
tags: ["subtopic"]
---

## Emplear una autenticación 3DS externa

Si tienes tu propio servicio de autenticación 3DS, puedes integrarlo fácilmente con PayU. Este método también se conoce como **passthrough** y te permite gestionar el proceso de autenticación directamente con tu Merchant Plug-in (MPI) o servidor 3DS elegido.

### Consideraciones

* La autenticación 3DS para PayU Latam solo está disponible para **Argentina**, **Brasil**, **Colombia**, **México** y **Perú**.
* Esta funcionalidad requiere una integración API y no está disponible para la integración Webcheckout.
* **Redes compatibles actualmente:** Visa y Mastercard

## Cómo funciona

* **Utiliza tu servicio 3DS existente:** PayU se integra perfectamente con tu proveedor preferido para un flujo de trabajo fluido.
* **Gestiona la autenticación:** Tú manejas la comunicación entre tu plataforma y el servicio 3DS.
* **Envía la respuesta a PayU:** Incluye la respuesta de autenticación de tu servicio 3DS dentro de tu solicitud de pago a PayU.

### Consideraciones

* **Servicios independientes:** Tu servicio 3DS funciona independientemente del servicio de autorización de PayU.
* **Datos combinados necesarios:** Para un procesamiento de pago exitoso, tu solicitud de autorización de PayU debe incluir la respuesta de autenticación de tu servicio 3DS.

## Parámetros de la API para la autenticación 3DS

Cuando uses tu propio servicio 3DS con el método de passthrough, incluye los siguientes campos en tu solicitud de pago a PayU:

| Campo | Tipo | Longitud | Descripción |
|-------|------|----------|-------------|
| `transaction > threeDomainSecure` | Objeto |  | Proporciona la información para la autenticación 3DS 2.0. |
| `transaction > threeDomainSecure > embedded` | Booleano |  | Establece este valor en `true` para usar un MPI embebido en el proceso de Autorización. El valor predeterminado es `false`. |
| `transaction > threeDomainSecure > eci` | Numérico | Máx: 2 | Representa el Indicador de Comercio Electrónico (ECI).<br>El servidor de directorio devuelve este valor para indicar el intento de autenticación.<br>Este parámetro se vuelve obligatorio cuando configuras `transaction.threeDomainSecure.embedded` en `false` e incluyes `transaction.threeDomainSecure.xid`. |
| `transaction > threeDomainSecure > cavv` | Alfanumérico | Máx: 28 | Proporciona el Valor de Verificación de Autenticación del Tarjetahabiente (CAVV).<br>Este código criptográfico en Base64 autentica la transacción.<br>Dependiendo de los códigos ECI definidos por la red procesadora, este valor puede ser opcional. |
| `transaction > threeDomainSecure > xid` | Alfanumérico | Máx: 28 | Identifica la transacción mediante el ID que devuelve el MPI en Base64.<br>Este parámetro se vuelve obligatorio cuando configuras `transaction.threeDomainSecure.embedded` en `false` e incluyes `transaction.threeDomainSecure.eci`. |
| `transaction > threeDomainSecure > directoryServerTransactionId` | Alfanumérico | Máx: 36 | Identifica la transacción mediante el ID que genera el servidor de directorio durante la autenticación. |

## Ejemplo de una solicitud

El siguiente ejemplo en formato JSON muestra cómo estructurar una solicitud de pago que incluye los datos de autenticación 3DS externa utilizando el método de passthrough:

```json
{
    "language": "en",
    "command": "SUBMIT_TRANSACTION",
    "merchant": {
        "apiLogin": "pRRXKOl8ikMmt9u",
        "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
    },
    "transaction": {
        "type": "AUTHORIZATION_AND_CAPTURE or AUTHORIZATION",
        "paymentMethod": "VISA",
        "paymentCountry": "AR, BR, CO, MX or PE",
        "ipAddress": "170.198.69.98",
        "userAgent": "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:5.3) Gecko/20100101 Firefox/5.3.5",
        "cookie": "9btoljd0qgr6ymppx0iker0o72",
        "deviceSessionId": "867451dba1eda5984f2f67b36b93be3",
        "extraParameters": {
            "INSTALLMENTS_NUMBER": 1
        },
        "creditCard": {
            "name": "APPROVED",
            "number": "5150030090050182",
            "expirationDate": "2028/01",
            "securityCode": "777"
        },
        "threeDomainSecure": {
            "embedded": false,
            "eci": "05",
            "cavv": "MTIzNDU2Nzg5MDA5ODc2XTQzMjE=",
            "xid": "Nmp3VFdWMlEwZ05pWXN3SGo4TDA=",
            "directoryServerTransactionId": "f25084f0-5b16-4c0a-ae5d-b24808a95e9b"
        },
        "payer": {
            ...
            "billingAddress": {...}
        },
        "order": {
            "accountId": "512322",
            ...
            "buyer": {
                ...
                "shippingAddress": {...}
            },
            "shippingAddress": {...},
            "additionalValues": {
                "TX_VALUE": {
                    "value": "10000",
                    "currency": "ARS, BRL, COP, MXN or PEN"
                },
                "TX_TAX": {...},
                "TX_TAX_RETURN_BASE": {...}
            }
        }
    },
    "test": false
}
```

## Datos del adquirente para pruebas 3DS

Utiliza los siguientes datos del adquirente para realizar transacciones de prueba 3DS.

| País | ID de comercio del adquirente | BIN Mastercard | BIN Visa |
|------|-------------------------------|----------------|-----------|
| **Argentina** | 5921041903 | 541109 | 435017 |
| **Brasil** | 65145705 | 548087 | 483044 |
| **Colombia** | 0010881563 | 271699 | 450724 |
| **México** | 9508014 | 272087 | 441567 |
| **Perú** | 100070253 | 271542 | 491955 |

## Documentación específica por país

Para obtener instrucciones detalladas sobre cómo incluir parámetros de respuesta de autenticación en tu solicitud, consulta la documentación de tu país de procesamiento:

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Argentina.md#parameters-for-request-and-response" >}}'><img src="/assets/Argentina.png" width="16%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Brazil.md#parameters-for-request-and-response" >}}'><img src="/assets/Brasil.png" width="16%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Colombia.md#parameters-for-request-and-response" >}}'><img src="/assets/Colombia.png" width="16%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
      <a href='{{< ref "Payments-API-Mexico.md#parameters-for-request-and-response" >}}'><img src="/assets/Mexico.png" width="16%"/></a>
    </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Peru.md#parameters-for-request-and-response" >}}'><img src="/assets/Peru.png" width="16%"/></a>
  </div>
</div>
<br>
