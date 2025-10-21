---
title: "Autenticación 3DS Gestionada por PayU"
linkTitle: "Autenticación 3DS Gestionada por PayU"
date: 2024-07-01T11:32:55-05:00
description: >
  La autenticación 3DS gestionada por PayU evita la necesidad de que administres el proceso de integración 3DS. PayU se encarga de todo, desde la comunicación con el banco emisor hasta la gestión del flujo de autenticación.
weight: 21
tags: ["subtopic"]
---

Para habilitar la autenticación 3DS, contacta a tu representante de PayU o al soporte técnico. Una vez habilitada, incluye el parámetro `req3DSAuthentication` en tus solicitudes de pago utilizando la API de Pagos de PayU.

## Consideraciones

* La autenticación 3DS con PayU Latam está disponible únicamente en **Argentina**, **Brasil**, **Colombia**, **México** y **Perú**.
* Al utilizar la autenticación 3DS en integraciones por API, es **obligatorio** establecer un `RESPONSE_URL`. Si no se incluye, la transacción devolverá un error.
* Si utilizas una <a href="https://developers.payulatam.com/latam/es/docs/integrations/webcheckout-integration.html" target="_blank">integración WebCheckout</a>, contacta a tu representante de PayU o al soporte técnico para confirmar si la autenticación 3DS está disponible para tus transacciones.
* **Redes compatibles:** Visa y Mastercard.

## Parámetro `req3DSAuthentication`

Este parámetro te permite especificar si una transacción requiere autenticación 3DS. El parámetro admite los siguientes valores:

* `"true"`: Exige la autenticación 3DS para la transacción.
* `"false"`: Desactiva la autenticación 3DS para la transacción.

**Si tu solicitud no incluye `req3DSAuthentication`**, el motor de riesgos de PayU determinará si la transacción requiere autenticación 3DS en función de su evaluación de riesgos.

### Parámetros para la autenticación 3DS 

La siguiente tabla describe los parámetros clave asociados con la autenticación 3DS. Para una lista completa de los parámetros aplicables a transacciones con tarjetas de crédito o débito, consulta la <a href="https://developers.payulatam.com/latam/es/docs/integrations/api-integration.html" target="_blank">documentación de la API de Pagos</a> de tu país.

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| `transaction > req3DSAuthentication` | Booleano | 4-5 caracteres | Especifica si se exige (`true`) o no (`false`) la autenticación 3DS. Si se omite, el motor de riesgos de PayU decide si se requiere autenticación. |
| `transaction > order > notifyUrl` | Alfanumérico | Hasta 255 caracteres | URL de webhook que tu integración utiliza para recibir el estado final de la transacción (por ejemplo, aprobada o rechazada) desde PayU. Para ver una lista detallada de los posibles estados, consulta la <a href="https://developers.payulatam.com/latam/es/docs/getting-started/response-codes-and-variables.html#response-codes-sent-to-the-confirmation-page" target="_blank">documentación de códigos de respuesta</a> |
| `transaction > extraParameters > RESPONSE_URL` | Alfanumérico| Hasta 255 caracteres | URL a la que se redirige al usuario después de completar la autenticación 3DS, normalmente una página en el sitio web del comercio. **Para integraciones por API, este parámetro es obligatorio**. Si no se incluye, la transacción puede fallar porque PayU no podrá redirigir al usuario después del desafío de autenticación. Para una lista detallada de los posibles estados, consulta la <a href="https://developers.payulatam.com/latam/es/docs/getting-started/response-codes-and-variables.html#response-codes-sent-to-the-response-page" target="_blank">documentación de códigos de respuesta</a>. |

### Ejemplo de una solicitud

En el siguiente ejemplo de solicitud, el parámetro `req3DSAuthentication` se establece en `true` para requerir autenticación 3DS:

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

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
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

```XML
<request>
    <language>en</language>
    <command>SUBMIT_TRANSACTION</command>
    <merchant>
        <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <transaction>
        <order>
            <language>en</language>
            <signature>8b9abb9dcae76d331e4493a559e8a76a0a9296e6944d460303d5639d9230c485</signature>
            <accountId>512321</accountId>
            <description>PayULatamAPI|Test|CO|COL</description>
            <referenceCode>REFERENCIA_PRUEBA_12345</referenceCode>
            <notifyUrl>https://merchant-mywebhook.com</notifyUrl>
            <buyer>
                <merchantBuyerId>Merchant_Buyer_ID_123</merchantBuyerId>
                <fullName>John Doe</fullName>
                <emailAddress>john.doe@email.com</emailAddress>
                <contactPhone>3155555555</contactPhone>
                <dniType>CC</dniType>
                <dniNumber>123456789</dniNumber>
                <shippingAddress>
                    <country>CO</country>
                    <state>DC</state>
                    <city>Bogotá</city>
                    <postalCode>110111</postalCode>
                    <street1>Calle 100</street1>
                    <street2>Cra 9</street2>
                    <phone>6011234567</phone>
                </shippingAddress>
            </buyer>
            <shippingAddress>
                <country>CO</country>
                <state>DC</state>
                <city>Bogotá</city>
                <postalCode>110111</postalCode>
                <street1>Calle 100</street1>
                <street2>Cra 9</street2>
                <phone>6011234567</phone>
            </shippingAddress>
            <additionalValues>
                <TX_VALUE>
                    <value>100</value>
                    <currency>COP</currency>
                </TX_VALUE>
                <TX_TAX>
                    <value>0</value>
                    <currency>COP</currency>
                </TX_TAX>
                <TX_TAX_RETURN_BASE>
                    <value>0</value>
                    <currency>COP</currency>
                </TX_TAX_RETURN_BASE>
            </additionalValues>
        </order>
        <payer>
            <merchantPayerId>Merchant_Payer_ID_123</merchantPayerId>
            <fullName>John Doe</fullName>
            <emailAddress>john.doe@email.com</emailAddress>
            <contactPhone>3155555555</contactPhone>
            <dniType>CC</dniType>
            <dniNumber>123456789</dniNumber>
            <billingAddress>
                <country>CO</country>
                <state>DC</state>
                <city>Bogotá</city>
                <postalCode>110111</postalCode>
                <street1>Calle 100</street1>
                <street2>Cra 9</street2>
                <phone>6011234567</phone>
            </billingAddress>
        </payer>
        <creditCard>
            <name>APPROVED</name>
            <number>5570898637920584</number>
            <expirationDate>2025/12</expirationDate>
            <securityCode>777</securityCode>
            <processWithoutCvv2>false</processWithoutCvv2>
        </creditCard>
        <extraParameters>
            <INSTALLMENTS_NUMBER>1</INSTALLMENTS_NUMBER>
            <RESPONSE_URL>https://merchant.shoppingresult.com</RESPONSE_URL>
        </extraParameters>
        <type>AUTHORIZATION_AND_CAPTURE</type>
        <paymentMethod>MASTERCARD</paymentMethod>
        <paymentCountry>CO</paymentCountry>
        <ipAddress>45.6.10.241</ipAddress>
        <userAgent>Mozilla/5.0 (Windows; U; Windows NT 6.0) AppleWebKit/531.2.0 (KHTML, like Gecko) Chrome/21.0.885.0 Safari/531.2.0</userAgent>
        <cookie>sefejihsxeai037qhkwa3jex9</cookie>
        <deviceSessionId>cb066830a3dcbdaf7234fd230d1959b0c6b3ae3ad5265490d55802a61738b537</deviceSessionId>
        <integrationMethod>POST_API_v4_0</integrationMethod>
        <req3DSAuthentication>true</req3DSAuthentication>
        <source>WEB</source>
    </transaction>
    <test>false</test>
</request>

```

{{< /tab >}}
{{< /tabs >}}

## Probar la autenticación 3DS

Para probar el proceso de autenticación 3DS, utiliza los valores ficticios proporcionados en la tabla a continuación. Estos valores son aplicables a los diferentes métodos de pago disponibles en cada país:

<table>
  <tr>
    <th></th>
    <th style="text-align: center;">Argentina<br/><img src="/assets/Argentina.png" width="25px"/></th>
    <th style="text-align: center;">Brasil<br/><img src="/assets/Brasil.png" width="25px"/></th>
    <th style="text-align: center;">Colombia<br/><img src="/assets/Colombia.png" width="25px"/></th>
    <th style="text-align: center;">México<br/><img src="/assets/Mexico.png" width="25px"/></th>
    <th style="text-align: center;">Perú<br/><img src="/assets/Peru.png" width="25px"/></th>
  </tr>
  <tr>
    <th>Account ID</th>
    <td style="text-align: center;">516684</td>
    <td style="text-align: center;">516685</td>
    <td style="text-align: center;">516686</td>
    <td style="text-align: center;">516687</td>
    <td style="text-align: center;">516688</td>
  </tr>
  <tr>
    <th>Merchant ID</th>
    <td colspan="5" style="text-align: center;">508029</td>
  </tr>
  <tr>
    <th>API Login</th>
    <td colspan="5" style="text-align: center;">pRRXKOl8ikMmt9u</td>
  </tr>
  <tr>
    <th>API Key</th>
    <td colspan="5" style="text-align: center;">4Vj8eK4rloUd272L48hsrarnUA</td>
  </tr>
  <tr>
    <th>Public Key</th>
    <td colspan="5" style="text-align: center;">PKaC6H4cEDJD919n705L544kSU</td>
  </tr>
</table>


{{% alert title="Nota" color="info"%}} 

Estos IDs de cuenta son solo para fines de prueba; no los utilices en entornos de producción. 

{{% /alert %}}

### Tarjetas de prueba 

Puedes utilizar las siguientes tarjetas de prueba para replicar diferentes escenarios 3DS en el entorno de prueba. **No** utilices estas tarjetas en producción.

| Marca       | Número de tarjeta   | Escenario 3DS                                   |
|-------------|---------------------|-------------------------------------------------|
| Mastercard  | `5521455186577727`  | La tarjeta no está registrada en 3DS        |
| Mastercard  | `5436062405627681`  | Se requiere desafío 3DS     |
| Mastercard  | `5150030090350186`  | 3DS exitoso sin fricción (no requiere desafío) |
| Mastercard  | `5150030090050182`  | 3DS exitoso sin fricción (no requiere desafío) |
| Visa        | `4012001037141120`  | Se requiere desafío 3DS  |
| Visa        | `4245757666349685`  | Se requiere desafío 3DS  |

#### Datos de prueba para autorizaciones aprobadas

Usa los siguientes parámetros para simular transacciones aprobadas en el entorno de pruebas:

* Incluye **`APPROVED`** en el nombre del titular de la tarjeta (ej. `APPROVED`).
* Usa **`777`** como CVV.
* Fecha de vencimiento: un mes menor o igual a `05` (es decir, mes < 6) y un año posterior al actual (por ejemplo `05/202_` — reemplaza `_` por el dígito correspondiente en pruebas).

#### Datos de prueba para autorizaciones rechazadas

Usa los siguientes parámetros para simular transacciones rechazadas en el entorno de pruebas:

* Incluye **`REJECTED`** en el nombre del titular de la tarjeta (ej. `REJECTED`).
* Usa **`666`** como CVV.
* Fecha de vencimiento: un mes mayor o igual a `07` (es decir, mes > 6) y un año posterior al actual (por ejemplo `07/202_` — reemplaza `_` por el dígito correspondiente en pruebas).

{{% alert title="Nota" color="info"%}}

Estos números y convenciones son solo para pruebas en sandbox. Asegúrate de usar las `Account ID`, `API Key` y `API Login` de prueba provistos más arriba cuando ejecutes las transacciones.

{{% /alert %}}

## Respuesta de la transacción

Una vez que envíes una solicitud de pago, recibirás una respuesta con un estado `"PENDING"` para la transacción. Esta respuesta también incluirá un campo dentro de `extraParameters` llamado `THREEDS_AUTH_REDIRECT_URL`.

* **`THREEDS_AUTH_REDIRECT_URL`:** Esta URL se debe utilizar para redirigir al pagador para que complete el proceso de autenticación 3DS. El proceso de autenticación puede incluir desafíos como ingresar una contraseña de uso único (OTP) recibida en su teléfono.

### Ejemplo de una respuesta

En el siguiente ejemplo de respuesta, el comercio redirecciona al pagador a `https://merch-prod.payu.com`:

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

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
            "THREEDS_AUTH_REDIRECT_URL": "https://merch-prod.payu.com"
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
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>2153050798</orderId>
        <transactionId>722480e5-276e-409d-ae9e-376b801ed725</transactionId>
        <state>PENDING</state>
        <pendingReason>AWAITING_THREEDS_CALLBACK</pendingReason>
        <responseCode>PENDING_THREEDS_CALLBACK</responseCode>
        <operationDate>2024-10-24T09:09:10</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>THREEDS_AUTH_REDIRECT_URL</string>
                <string>https://merch-prod.payu.com</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>REDEBAN</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <cardType>CREDIT</cardType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>

```

{{< /tab >}}
{{< /tabs >}}

## Flujo de la autenticación

El siguiente diagrama ilustra el proceso completo de una transacción utilizando la autenticación 3DS de PayU, destacando pasos clave como el envío de la solicitud, la autenticación y la gestión de la respuesta.

{{< 3dsAuth/3dsflow_es >}}

<br>

Como se muestra en el diagrama, una vez que el pagador complete la autenticación 3DS (si es necesario), PayU recibirá una notificación. La transacción entonces será:

* **Completada:** Si la autenticación es exitosa.
* **Rechazada:** Si la autenticación falla.
