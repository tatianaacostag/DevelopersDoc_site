---
title: "API de Promociones"
linkTitle: "API de Promociones"
date: 2021-06-29T12:38:41-05:00
description: >
    La API de Promociones te permite consultar las promociones disponibles, incluyendo sus costos asociados, características y otros detalles relevantes para tus clientes.
weight: 50
tags: ["subtopic"]
---

La API de Promociones está disponible en los siguientes países:

<table style="width: 50%; min-width: 300px; border-collapse: collapse;">
    <tr>
        <th style="width: 40%; text-align: left;">País</th>
        <th style="width: 30%; text-align: center;">Promociones</th>
        <th style="width: 30%; text-align: center;">MSI (Meses sin Intereses)</th>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Argentina.png" width="25px"/> &nbsp;Argentina</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Colombia.png" width="25px"/> &nbsp;Colombia</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Mexico.png" width="25px"/> &nbsp;México</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Peru.png" width="25px"/> &nbsp;Perú</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
</table>

{{% alert title="Nota" color="info"%}}

Para configurar las cuotas y promociones según tus acuerdos con las entidades bancarias, contacta a tu representante de ventas.

{{% /alert %}}

## Promociones {#promotions}

Utiliza esta funcionalidad para consultar las promociones activas a través de la API y obtener información detallada que te permita personalizar la experiencia de compra para tus clientes.

Cada promoción incluye los medios de pago aplicables, los días de la semana en los que está disponible, una lista de bancos participantes y las fechas de inicio y finalización.

### Autenticación para promociones {#authentication-for-promotions}

Para autenticar las solicitudes a la API, debes utilizar un mecanismo basado en HMAC. Necesitas tu `MerchantPublicKey`, que se encuentra en tu Panel de Administración de PayU en **_Configuración_** > **_Configuración Técnica_** > **_Llave Pública_**.

![PrintScreen](/assets/Promotions/PublicKey_es.png)

### Configurar la autenticación {#configuring-the-authentication}

Incluye los encabezados `Authorization` y `Date`. El encabezado `Authorization` sigue esta estructura:

```java
"Hmac" + " " + MerchantPublicKey + ":" + Signature
```

<br>

Donde `Signature` se crea así:

```java
Signature = Base64(HMAC-SHA256(MerchantApiKey,ContentToSign)) 
```

<br>

Y `ContentToSign` corresponde a:

```java
HTTP-Verb + "\n" + "\n" + "\n" +
Date + "\n" +
URI
```

{{% alert title="Nota" color="info"%}}

Es obligatorio incluir tres saltos de línea (`\n`) luego de `HTTP-Verb`.

{{% /alert %}}

#### Ejemplo: Generar el encabezado de autenticación

Los siguientes ejemplos muestran cómo crear el encabezado de Autenticación utilizando los siguientes valores de prueba:

**ContentToSign**:
```java
GET 
 
Fri, 28 Apr 2017 18:32:01 GMT
/payments-api/rest/v4.9/pricing
```

<br>

**MerchantApiKey**:
```java
4Vj8eK4rloUd272L48hsrarnUA
```

<br>

**MerchantPublicKey**:
```java
PKaC6H4cEDJD919n705L544kSU
```

<br>

Encripta el `ContentToSign` utilizando `MerchantApiKey` como frase de contraseña. Luego, concatena el resultado con el `MerchantPublicKey` como se muestra a continuación:

**Authorization**
```java
Hmac PKaC6H4cEDJD919n705L544kSU:sIxh54sANfKaxO0ugX6QwhPmZRS+TGy8gmdCwr3kjP0= 
```

<br>

Para evitar ataques de repetición, envía el encabezado `Date` siguiendo este formato:

**Date**
```java
Mon, 11 May 2015 21:14:41 GMT
```

<br>

Si las restricciones del cliente REST impiden el uso de `Date`, puedes enviar alternativamente `x-hmac-date` utilizando el mismo formato:

**x-hmac-date**
```java
Mon, 11 May 2015 21:14:41 GMT
```

### Consultar las promociones disponibles {#querying-available-promotions}

Para obtener las promociones, envía una solicitud `GET` a la URL correspondiente según el entorno.

{{% alert title="Endpoints de la API" color="info"%}}

* Pruebas: ```GET https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing```
* Producción: ```GET https://api.payulatam.com/payments-api/rest/v4.9/pricing```

{{% /alert %}}

Dado que este es un servicio RESTful, recomendamos enfáticamente no aplicar una validación estricta del esquema. Evitar la validación del esquema garantiza una integración sin inconvenientes y minimiza los cambios cuando se actualiza el servicio web.

#### Parámetros para la solicitud y respuesta {parameters-for-request-and-response}

<details>

<summary>Parámetros de la solicitud</summary>

<br>

<div class="variables"></div>

| Parámetro | Descripción | Obligatorio |
|-|-|:-:|
| `accountId` | Identificador único de tu cuenta. | Sí |
| `currency` | Moneda asociada a tu cuenta. | No |
| `amount` | Monto total de la compra. | Sí |
| `paymentMethod` | Parámetro opcional para filtrar promociones por método de pago. | No |
| `tax` | Monto del impuesto incluido en la transacción. Aplica solo en Argentina y Colombia. | No |
| `taxReturnBase` | Valor base utilizado para calcular el impuesto. Aplica solo en Argentina y Colombia. | No |

</details>

<details>

<summary>Parámetros de la respuesta</summary>

<br>

<div class="variables"></div>

| Nombre del Campo | Tipo | Descripción |
|------------------|------|-------------|
| `amount` | Objeto | Detalles del monto de la transacción. |
| `amount` > `value` | Número | Valor total de la transacción. |
| `amount` > `tax` | Número | Monto de impuestos incluido en la transacción. |
| `amount` > `purchaseValue` | Número | Valor de la compra antes de impuestos. |
| `amount` > `currency` | String | Código de moneda de la transacción original. |
| `amount` > `taxableBase` | Número | Valor de la transacción utilizado como base para el cálculo de impuestos. |
| `convertedAmount` | Objeto | Contiene el monto de la transacción convertido a otra moneda (si aplica). |
| `convertedAmount` > `value` | Número | Valor total convertido de la transacción. |
| `convertedAmount` > `tax` | Número | Monto de impuestos convertido. |
| `convertedAmount` > `purchaseValue` | Número | Valor de compra convertido antes de impuestos. |
| `convertedAmount` > `currency` | String | Código de moneda del monto convertido. |
| `convertedAmount` > `taxableBase` | Número | Valor convertido utilizado como base para el cálculo de impuestos. |
| `paymentMethodFee` | Lista | Contiene el desglose de costos asumidos por el comercio según el medio de pago. |
| `paymentMethodFee` > `paymentMethod` | String | Nombre del medio de pago. |
| `paymentMethodFee` > `pricingFees` | Objeto | Contiene los detalles de precios por medio de pago y rango de cuotas. |
| `paymentMethodFee` > `pricingFees` > `installments` | String | Número de cuotas, ya sea un único valor (por ejemplo, `1`) o, en países aplicables, un rango (por ejemplo, `1-36`). |
| `paymentMethodFee` > `pricingFees` > `pricing` | Objeto | Contiene los detalles de precios para la transacción. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` | Objeto | Desglose de intereses y comisiones cobradas al pagador. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` > `commission` | Número | Monto total de comisiones (incluyendo impuestos) cobradas al pagador. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` > `interests` | Número | Monto total de intereses (incluyendo impuestos) cobrados al pagador. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` > `total` | Número | Monto total a pagar por el pagador, incluyendo intereses y comisiones. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` | Objeto | Desglose de intereses y comisiones cobradas al comercio. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` > `commission` | Número | Monto total de comisiones (incluyendo impuestos) cobradas al comercio. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` > `interests` | Número | Monto total de intereses (incluyendo impuestos) cobrados al comercio. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` > `total` | Número | Costo total asumido por el comercio, incluyendo intereses y comisiones. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `totalValue` | Número | Valor total de la transacción incluyendo intereses y comisiones. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `totalIncomeTransaction` | Número | Ingreso total generado por la transacción. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `additionalInfo` | Objeto | Incluye información financiera como la Tasa Efectiva Anual (TEA) y el Costo Financiero Total (CFT). Aplica solo para Argentina. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `additionalInfo` > `cft` | Número | Costo Financiero Total (CFT) aplicado a la transacción. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `additionalInfo` > `tea` | Número | Tasa Efectiva Anual (TEA) aplicada a la transacción. |
| `paymentMethodFee` > `pricingFees` > `promos` | Array | Lista de promociones disponibles aplicables a la configuración de precios. |
| `paymentMethodFee` > `pricingFees` > `promos` > `id` | Entero | Identificador único de la promoción en el sistema PayU. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` | Objeto | Contiene los detalles de precios para la promoción específica. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` | Objeto | Desglose de intereses y comisiones para el pagador bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` > `commission` | Número | Monto de comisión cobrado al pagador bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` > `interests` | Número | Monto de intereses cobrado al pagador bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` > `total` | Número | Monto total a pagar por el pagador, incluyendo comisiones e intereses, bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` | Objeto | Desglose de intereses y comisiones para el comercio bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` > `commission` | Número | Monto de comisión cobrado al comercio bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` > `interests` | Número | Monto de intereses cobrado al comercio bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` > `total` | Número | Costo total para el comercio, incluyendo comisiones e intereses, bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `totalValue` | Número | Valor total de la transacción con comisiones e intereses bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `totalIncomeTransaction` | Número | Ingreso total generado por la transacción bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `priority` | Número | Nivel de prioridad de la promoción dentro de la configuración de precios. |
| `promotions` | Objeto | Contiene detalles sobre la promoción aplicada (si corresponde). |
| `promotions` > `id` | Entero | Identificador único de la promoción en el sistema PayU. |
| `promotions` > `title` | String | Título de la promoción (máximo 50 caracteres). |
| `promotions` > `termsAndConditions` | String | Términos y condiciones aplicables a la promoción (máximo 250 caracteres). |
| `promotions` > `paymentMethod` | String | Medio de pago asociado a la promoción. |
| `promotions` > `subFranchise` | String | Submarca o sub-franquicia asociada a la promoción. |
| `promotions` > `banksNames` | Lista | Lista de bancos donde aplica la promoción. |
| `promotions` > `iins` | Lista | Lista de números IIN/BIN de tarjetas elegibles para la promoción. |
| `promotions` > `days` | Lista | Días de la semana en los que está disponible la promoción. |
| `promotions` > `startDate` | Fecha y hora | Fecha y hora de inicio de la promoción. |
| `promotions` > `endDate` | Fecha y hora | Fecha y hora de finalización de la promoción. |
| `promotions` > `priority` | Número | Nivel de prioridad de la promoción. |
| `promotions` > `type` | String | Tipo de promoción. Los valores posibles son:<br><br>**PRICING** – La promoción se aplica automáticamente según las reglas de precios configuradas. Por ejemplo, en México, si se configuran cuotas sin interés, el comercio solo debe enviar el número de cuotas en `transaction > extraParameters > INSTALLMENTS_NUMBER`. El sistema aplicará automáticamente la condición sin interés sin requerir un ID de promoción.<br><br>**MSI** – Requiere que el comercio envíe explícitamente tanto el ID de la promoción como el número de cuotas. Esto aplica cuando la promoción debe coincidir con una combinación específica de medio de pago, cuotas e ID de promoción. Para aplicar este tipo, deben enviarse los siguientes campos:<br>- `transaction > extraParameters > INSTALLMENTS_NUMBER`<br>- `transaction > extraParameters > PROMOTION_ID`<br><br>**Nota:** Si no se envía el ID de promoción cuando es requerido, la transacción se procesará sin la promoción, utilizando la configuración de precios predeterminada disponible para la opción de cuotas seleccionada. |
| `paymentTaxesDetails` | Objeto | Contiene los detalles de los impuestos aplicados (estructura depende de la respuesta del servicio de impuestos). |
| `taxesServiceFailed` | Booleano | Indica si falló el servicio de cálculo de impuestos. |

</details>

#### Llamado a la API {#api-call}

Para obtener las promociones disponibles, envía una solicitud `GET` con el siguiente formato:

```JAVASCRIPT
GET
https://{env-api}.payulatam.com/payments-api/rest/v4.9/pricing?accountId={accountId}&currency={currency}&amount={amount}&paymentMethod={paymentMethod}
Accept: application/json
Content-Type: application/json
Authorization: Hmac PKaC6H4cEDJD919n705L544kSU:sIxh54sANfKaxO0ugX6QwhPmZRS+TGy8gmdCwr3kjP0=
Date: Fri, 16 May 2025 14:37:05 GMT
```

<br>

 La variable `{env-api}` debe configurarse de la siguiente manera:
 - `sandbox.api` para pruebas 
 - `api` para producción
 
 El parámetro `paymentMethod` es opcional y puede utilizarse para filtrar promociones por un método de pago específico. Los parámetros `tax` y `taxReturnBase` también son opcionales, pero solo aplican en Argentina y Colombia.
 
**Ejemplo de solicitud para Argentina:**

```JAVA
https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing?accountId=512322&currency=ARS&amount=110524.91&tax=19182.01&taxReturnBase=91342.90
```
<br>

**Ejemplo de solicitud para Colombia:**

```JAVA
https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing?accountId=512321&currency=COP&amount=11601.71&tax=1769.75&taxReturnBase=9831.96
```
<br>

**Ejemplo de solicitud para México:**

```JAVA
https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing?accountId=512324&currency=MXN&amount=15662.37
```
<br>

**Ejemplo de solicitud para Perú:**

```JAVA
https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing?accountId=516634&currency=PEN&amount=2897.78
```

<br>

**Ejemplo de una respuesta:**

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
{
    "amount": {
        "value": 1000.00,
        "tax": 0,
        "purchaseValue": 1000.00,
        "currency": "ARS"
    },
    "convertedAmount": {
        "value": 1000.00,
        "tax": 0.00,
        "purchaseValue": 1000.00,
        "currency": "ARS"
    },
    "promotions": [
        {
            "id": 49,
            "title": "Promotion_ID AMEX",
            "termsAndConditions": "SI",
            "paymentMethodMain": "AMEX",
            "startDate": "2018-08-16 18:48:00",
            "endDate": "2090-08-16 18:48:00",
            "days": [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY"
            ],
            "priority": 10,
            "type": "MSI"
        },
        {
            "id": 45,
            "title": "Promotion Test - Master",
            "termsAndConditions": "Terminos y condiciones",
            "paymentMethodMain": "MASTERCARD",
            "startDate": "2018-06-26 17:06:00",
            "endDate": "2030-06-26 17:06:00",
            "days": [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY"
            ],
            "priority": 10,
            "type": "MSI"
        }
    ],
    "paymentMethodFee": [
        {
            "paymentMethod": "DINERS",
            "pricingFees": [
                {
                    "installments": "1",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 0.00,
                            "total": 0.00
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1000.00,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "0%",
                            "tea": "0%"
                        }
                    }
                },
                {
                    "installments": "3",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 171.29,
                            "total": 171.29
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1171.29,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "162%",
                            "tea": "123.28%"
                        }
                    }
                },
                {
                    "installments": "6",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 230.01,
                            "total": 230.01
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1230.01,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "107%",
                            "tea": "83.97%"
                        }
                    }
                },
                {
                    "installments": "9",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 340.05,
                            "total": 340.05
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1340.04,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "108%",
                            "tea": "85.03%"
                        }
                    }
                },
                {
                    "installments": "12",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 490.01,
                            "total": 490.01
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1490.02,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "119%",
                            "tea": "93.68%"
                        }
                    }
                },
                {
                    "installments": "18",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 641.38,
                            "total": 641.38
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1641.39,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "97%",
                            "tea": "77.91%"
                        }
                    }
                },
                {
                    "installments": "24",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 822.72,
                            "total": 822.72
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1822.72,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "90%",
                            "tea": "72.47%"
                        }
                    }
                }
            ]
        },
        {
            "paymentMethod": "AMEX",
            "pricingFees": [
                {
                    "installments": "1",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 0.00,
                            "total": 0.00
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1000.00,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "0%",
                            "tea": "0%"
                        }
                    },
                    "promos": [
                        {
                            "id": 49,
                            "pricing": {
                                "payerDetail": {
                                    "commission": 0.00,
                                    "interests": 0.00,
                                    "total": 0.00
                                },
                                "merchantDetail": {
                                    "commission": 1044.65,
                                    "interests": 0.00,
                                    "total": 1044.65
                                },
                                "totalValue": 1000.00,
                                "totalIncomeTransaction": -44.65,
                                "additionalInfo": {
                                    "cft": "0%",
                                    "tea": "0%"
                                }
                            },
                            "priority": 10
                        }
                    ]
                },
                {
                    "installments": "3",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 171.29,
                            "total": 171.29
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1171.29,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "162%",
                            "tea": "123.28%"
                        }
                    }
                },
                {
                    "installments": "6",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 230.01,
                            "total": 230.01
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1230.01,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "107%",
                            "tea": "83.97%"
                        }
                    }
                },
                {
                    "installments": "9",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 340.05,
                            "total": 340.05
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1340.04,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "108%",
                            "tea": "85.03%"
                        }
                    }
                },
                {
                    "installments": "12",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 490.01,
                            "total": 490.01
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1490.02,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "119%",
                            "tea": "93.68%"
                        }
                    }
                },
                {
                    "installments": "18",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 641.38,
                            "total": 641.38
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1641.39,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "97%",
                            "tea": "77.91%"
                        }
                    }
                },
                {
                    "installments": "24",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 822.72,
                            "total": 822.72
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1822.72,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "90%",
                            "tea": "72.47%"
                        }
                    }
                }
            ]
        }
    ],
    "paymentTaxesDetails": [],
    "taxesServiceFailed": true
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```XML
<consultPriceListResponse xmlns:atom="http://www.w3.org/2005/Atom" xmlns:ns3="http://wadl.dev.java.net/2009/02">
    <amount>
        <value>1000.00</value>
        <tax>0</tax>
        <purchaseValue>1000.00</purchaseValue>
        <currency>ARS</currency>
    </amount>
    <convertedAmount>
        <value>1000.00</value>
        <tax>0.00</tax>
        <purchaseValue>1000.00</purchaseValue>
        <currency>ARS</currency>
    </convertedAmount>
    <promotions>
        <promotion id="49" title="Promotion_ID AMEX">
            <priority>10</priority>
            <type>MSI</type>
            <paymentMethod>AMEX</paymentMethod>
            <termsAndConditions>SI</termsAndConditions>
            <startDate>2018-08-16 18:48:00</startDate>
            <endDate>2090-08-16 18:48:00</endDate>
            <days>
                <day>MONDAY</day>
                <day>TUESDAY</day>
                <day>WEDNESDAY</day>
                <day>THURSDAY</day>
                <day>FRIDAY</day>
                <day>SATURDAY</day>
                <day>SUNDAY</day>
            </days>
        </promotion>
        <promotion id="45" title="Promotion Test - Master">
            <priority>10</priority>
            <type>MSI</type>
            <paymentMethod>MASTERCARD</paymentMethod>
            <termsAndConditions>Terminos y condiciones</termsAndConditions>
            <startDate>2018-06-26 17:06:00</startDate>
            <endDate>2030-06-26 17:06:00</endDate>
            <days>
                <day>MONDAY</day>
                <day>TUESDAY</day>
                <day>WEDNESDAY</day>
                <day>THURSDAY</day>
                <day>FRIDAY</day>
                <day>SATURDAY</day>
                <day>SUNDAY</day>
            </days>
        </promotion>
    </promotions>
    <paymentMethodFee>
        <paymentMethodFeeDetail paymentMethod="DINERS">
            <pricingFees>
                <fee installments="1">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>0.00</interests>
                            <total>0.00</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1000.00</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>0%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>0%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="3">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>171.29</interests>
                            <total>171.29</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1171.29</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>162%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>123.28%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="6">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>230.01</interests>
                            <total>230.01</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1230.01</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>107%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>83.97%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="9">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>340.05</interests>
                            <total>340.05</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1340.04</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>108%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>85.03%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="12">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>490.01</interests>
                            <total>490.01</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1490.02</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>119%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>93.68%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="18">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>641.38</interests>
                            <total>641.38</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1641.39</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>97%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>77.91%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="24">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>822.72</interests>
                            <total>822.72</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1822.72</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>90%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>72.47%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
            </pricingFees>
        </paymentMethodFeeDetail>
        <paymentMethodFeeDetail paymentMethod="AMEX">
            <pricingFees>
                <fee installments="1">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>0.00</interests>
                            <total>0.00</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1000.00</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>0%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>0%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                    <promos>
                        <promo id="49">
                            <priority>10</priority>
                            <pricing>
                                <payerDetail>
                                    <commission>0.00</commission>
                                    <interests>0.00</interests>
                                    <total>0.00</total>
                                </payerDetail>
                                <merchantDetail>
                                    <commission>1044.65</commission>
                                    <interests>0.00</interests>
                                    <total>1044.65</total>
                                </merchantDetail>
                                <totalValue>1000.00</totalValue>
                                <totalIncomeTransaction>-44.65</totalIncomeTransaction>
                                <additionalInfo>
                                    <entry>
                                        <key>cft</key>
                                        <value>0%</value>
                                    </entry>
                                    <entry>
                                        <key>tea</key>
                                        <value>0%</value>
                                    </entry>
                                </additionalInfo>
                            </pricing>
                        </promo>
                    </promos>
                </fee>
                <fee installments="3">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>171.29</interests>
                            <total>171.29</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1171.29</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>162%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>123.28%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="6">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>230.01</interests>
                            <total>230.01</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1230.01</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>107%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>83.97%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="9">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>340.05</interests>
                            <total>340.05</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1340.04</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>108%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>85.03%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="12">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>490.01</interests>
                            <total>490.01</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1490.02</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>119%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>93.68%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="18">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>641.38</interests>
                            <total>641.38</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1641.39</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>97%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>77.91%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="24">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>822.72</interests>
                            <total>822.72</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1822.72</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>90%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>72.47%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
            </pricingFees>
        </paymentMethodFeeDetail>
    </paymentMethodFee>
    <paymentTaxesDetails/>
    <taxesServiceFailed>true</taxesServiceFailed>
</consultPriceListResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Realizar una transacción con promociones {#execute-a-transaction-with-promotions}

Una vez que hayas seleccionado una promoción, incluye el `PROMOTION_ID` y el `INSTALLMENTS_NUMBER` como parámetros adicionales en tu solicitud:

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
"extraParameters": {
    "INSTALLMENTS_NUMBER": (número de cuotas),
    "PROMOTION_ID": (ID de la promoción seleccionada)
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
```XML
<extraParameters>
    <entry>
        <string>INSTALLMENTS_NUMBER</string>
        <string>Número de cuotas</string>
    </entry>
    <entry>
        <string>PROMOTION_ID</string>
        <string>ID de la promoción seleccionada</string>
    </entry>
</extraParameters>
```
{{< /tab >}}
{{< /tabs >}}
<br>

{{% alert title="Nota" color="info"%}}

Para más detalles sobre la inclusión de estos parámetros adicionales, consulta la documentación correspondiente de la API de Pagos para tu país:

* [Argentina]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}})  
* [Colombia]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}})  
* [México]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}})  
* [Perú]({{< ref "Payments-API-Peru.md#submit-transactions-using-credit-or-debit-cards" >}})  

{{% /alert %}}

## MSI - Meses Sin Intereses {#msi}

Para cuentas en México, puedes ofrecer a los clientes la opción de pagar en un número fijo de cuotas sin interés. Para habilitar esta función, contacta a tu representante de ventas.

### Consideraciones {#considerations}

* Opciones de cuotas disponibles: 3, 6, 9, 12 o 18 meses.  
* Montos mínimos de compra requeridos para MSI:  
    - 3 meses → $300 MXN  
    - 6 meses → $600 MXN  
    - 9 meses → $900 MXN  
    - 12 meses → $1200 MXN  
    - 18 meses → $1800 MXN  
* MSI está disponible con los siguientes bancos: BANAMEX, BANCO REGIONAL DE MONTERREY S.A, BANCOPPEL, BANCO AZTECA, SCOTIABANK, HSBC, INBURSA, BANCA MIFEL SA, BANCO MULTIVA, BAJÍO, CI BANCO, Afirme, Banregio, Banjercito, Banorte, Famsa, Invex, Premium Card Liverpool, Santander y Bancomer.  
* Al utilizar MSI, siempre muestra la frase **"PAGOS DIFERIDOS"** durante el proceso de pago.

### Parámetros de solicitud para MSI 

Para aplicar MSI, incluye el número de meses en el campo `extraParameters`:

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
"extraParameters": {
    "INSTALLMENTS_NUMBER": (número de meses)
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
```XML
<extraParameters>
    <entry>
        <string>INSTALLMENTS_NUMBER</string>
        <string>Número de meses</string>
    </entry>
</extraParameters>
```
{{< /tab >}}
{{< /tabs >}}
<br>

Para más detalles sobre el uso de MSI, consulta la [API de Pagos de México]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-card" >}}).