---
title: "Autenticación 3DS Gestionada por PayU"
linkTitle: "Autenticación 3DS Gestionada por PayU"
date: 2024-07-01T11:32:55-05:00
description: >
  La autenticación 3DS gestionada por PayU elimina la necesidad de que administres el proceso de integración 3DS. PayU se encarga de todo, desde la comunicación con el banco emisor hasta la gestión del flujo de autenticación.
weight: 21
tags: ["subtopic"]
---

## Usar la Autenticación 3DS de PayU
Para utilizar la autenticación 3DS, los comercios deben estar registrados en este servicio con PayU. Una vez registrado, puedes incluir un nuevo parámetro llamado `req3DSAuthentication` en tus solicitudes de pago a través de la API de Pagos de PayU.

{{% alert title="Nota" color="info"%}}
La autenticación 3DS para PayU Latam solo está disponible para **Argentina**, **Brasil**, **Colombia** y **Perú**.
{{% /alert %}}

### Parámetro `req3DSAuthentication`

Este parámetro te permite controlar si la autenticación 3DS es necesaria para cada transacción. Acepta dos valores:

* `"true"`: Obliga a la autenticación 3DS para la transacción.
* `"false"`: Deshabilita la autenticación 3DS para la transacción.

**Si no se incluye `req3DSAuthentication`,** PayU decidirá si realiza la autenticación 3DS en función de su propia evaluación de riesgos.

**Ejemplo de una solicitud:**

En el siguiente ejemplo de solicitud, `req3DSAuthentication` se establece en `true`:

```JSON
{
    "language": "es",
    "command": "SUBMIT_TRANSACTION",
    "merchant": {
        "apiLogin": "X",
        "apiKey": "X"
    },
    "transaction": {
        "order": {
            "accountId": "1",
            "referenceCode": "payment_test_00000001",
            "description": "prueba de pago",
            "language": "es",
            "notifyUrl": "[invalid URL removed]",
            "additionalValues": {
                "TX_VALUE": {
                    "value": 20000,
                    "currency": "COP"
                }
            },
            "buyer": {
                "merchantBuyerId": "1",
                "fullName": "Prueba",
                "emailAddress": "buyer_test@test.com",
                "contactPhone": "(11)756312633",
                "dniNumber": "X",
                "cnpj": "X",
                "shippingAddress": {
                    "street1": "calle 100",
                    "street2": "5555487",
                    "city": "Sao Paulo",
                    "state": "SP",
                    "country": "CO",
                    "postalCode": "01019-030",
                    "phone": "(11)756312633"
                }
            }
        },
        "payer": {
            "merchantPayerId": "1",
            "fullName": "Nombre y apellido del pagador",
            "emailAddress": "payer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "5415668464654",
            "billingAddress": {
                "street1": "Av. Isabel La Católica 103-La Victoria",
                "street2": "125544",
                "city": "Lima",
                "state": "Lima y Callao",
                "country": "PE",
                "postalCode": "000000",
                "phone": "7563126"
            }
        },
        "creditCard": {
            "number": "X",
            "securityCode": "X",
            "expirationDate": "X",
            "name": "APPROVED"
        },
        "extraParameters": {
            "INSTALLMENTS_NUMBER": 1
        },
        "req3DSAuthentication": "true",
        "type": "AUTHORIZATION_AND_CAPTURE",
        "paymentMethod": "VISA",
        "ipAddress": "127.0.0.1",
        "integrationMethod": "STANDARD_HTML_v4_0",
        "source": "WEB"
    },
    "test": false
}
```

## Respuesta de la Transacción y Flujo de Autenticación
Una vez que envíes una solicitud de pago, recibirás una respuesta con un estado `"PENDING"` para la transacción. Esta respuesta también incluirá un campo dentro de `extraParameters` llamado `THREEDS_AUTH_REDIRECT_URL`.

* **`THREEDS_AUTH_REDIRECT_URL`:** Esta URL se debe utilizar para redirigir al pagador para que complete el proceso de autenticación 3DS. El proceso de autenticación puede incluir desafíos como ingresar una contraseña de uso único (OTP) recibida en su teléfono.

**Ejemplo de una respuesta**

En el siguiente ejemplo de respuesta, el comercio redirecciona al pagador a `https://merch-prod.payu.com`:

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1427471957,
        "transactionId": "53dc40a4-ef00-4637-9578-941421f6fd7e",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": null,
        "authorizationCode": null,
        "pendingReason": "AWAITING_THREEDS_CALLBACK",
        "responseCode": "PENDING_THREEDS_CALLBACK",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1712909903010,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "THREEDS_AUTH_REDIRECT_URL": "https://merch-prod.payu.com/threeds/?authenticationId=6c38fbd4-e643-49e6-be75-1okhfe02a71"
        },
        "additionalInfo": {
            "paymentNetwork": "CREDIBANCO_V2",
            "rejectionType": null,
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": "CREDIT",
            "transactionType": "AUTHORIZATION_AND_CAPTURE"
        }
    }
}
```

## Después de la Autenticación
Una vez que el pagador complete la autenticación 3DS (si es necesario), PayU recibirá una notificación. La transacción entonces será:
* **Completada:** Si la autenticación es exitosa.
* **Rechazada:** Si la autenticación falla.

### Redireccionamiento Después de la Autenticación

Siguiendo la redirección del pagador desde la `THREEDS_AUTH_REDIRECT_URL`, se le dirigirá a:

* **Página de estado de la transacción de PayU Checkout:** De forma predeterminada, este es el comportamiento si el comercio no ha especificado una URL de retorno personalizada.
* **URL de retorno personalizada del comercio:** Si se proporciona, el pagador será redirigido a la página designada por el comercio después de la autenticación.

