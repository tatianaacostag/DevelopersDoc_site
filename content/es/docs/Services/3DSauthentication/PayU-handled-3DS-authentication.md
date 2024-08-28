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
    "language": "en",
    "command": "SUBMIT_TRANSACTION",
    "merchant": {
        "apiLogin": "pRRXKOl8ikMmt9u",
        "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
    },
    "transaction": {
        "order": {
            "language": "en",
            "signature": "8b9abb9dcae76d331e4493a559e8a76a0a9296e6944d460303d5639d9230c485",
            "accountId": "512321",
            "description": "PayULatamAPI|Test|CO|COL",
            "referenceCode": "REFERENCIA_PRUEBA_12345",
            "notifyUrl": "https://merchant-mywebhook.com",
            "buyer": {
                "merchantBuyerId": "Merchant_Buyer_ID_123",
                "fullName": "John Doe",
                "emailAddress": "john.doe@email.com",
                "contactPhone": "3155555555",
                "dniType": "CC",
                "dniNumber": "123456789",
                "shippingAddress": {
                    "country": "CO",
                    "state": "DC",
                    "city": "Bogotá",
                    "postalCode": "110111",
                    "street1": "Calle 100",
                    "street2": "Cra 9",
                    "phone": "6011234567"
                }
            },
            "shippingAddress": {
                "country": "CO",
                "state": "DC",
                "city": "Bogotá",
                "postalCode": "110111",
                "street1": "Calle 100",
                "street2": "Cra 9",
                "phone": "6011234567"
            },
            "additionalValues": {
                "TX_VALUE": {
                    "value": "100",
                    "currency": "COP"
                },
                "TX_TAX": {
                    "value": "0",
                    "currency": "COP"
                },
                "TX_TAX_RETURN_BASE": {
                    "value": "0",
                    "currency": "COP"
                }
            }
        },
        "payer": {
            "merchantPayerId": "Merchant_Payer_ID_123",
            "fullName": "John Doe",
            "emailAddress": "john.doe@email.com",
            "contactPhone": "3155555555",
            "dniType": "CC",
            "dniNumber": "123456789",
            "billingAddress": {
                "country": "CO",
                "state": "DC",
                "city": "Bogotá",
                "postalCode": "110111",
                "street1": "Calle 100",
                "street2": "Cra 9",
                "phone": "6011234567"
            }
        },
        "creditCard": {
            "name": "APPROVED",
            "number": "5570898637920584",
            "expirationDate": "2025/12",
            "securityCode": "777",
            "processWithoutCvv2": false
        },
        "extraParameters": {
            "INSTALLMENTS_NUMBER": 1,
            "RESPONSE_URL": "https://merchant.shoppingresult.com"
        },
        "type": "AUTHORIZATION_AND_CAPTURE",
        "paymentMethod": "MASTERCARD",
        "paymentCountry": "CO",
        "ipAddress": "45.6.10.241",
        "userAgent": "Mozilla/5.0 (Windows; U; Windows NT 6.0) AppleWebKit/531.2.0 (KHTML, like Gecko) Chrome/21.0.885.0 Safari/531.2.0",
        "cookie": "sefejihsxeai037qhkwa3jex9",
        "deviceSessionId": "cb066830a3dcbdaf7234fd230d1959b0c6b3ae3ad5265490d55802a61738b537",
        "integrationMethod": "POST_API_v4_0",
        "req3DSAuthentication": "true",
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
        "orderId": 3344440141,
        "transactionId": "968d3f37-25aa-4fc2-86bf-0a2eee091713",
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
        "operationDate": 1723749925205,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "THREEDS_AUTH_REDIRECT_URL": "https://secure.payu.com/front/threeds/?authenticationId=a27e4aa7-1a24-48d1-a9a6-03f463e048e4"
        },
        "additionalInfo": {
            "paymentNetwork": "CREDIBANCO_V2",
            "rejectionType": "NONE",
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

