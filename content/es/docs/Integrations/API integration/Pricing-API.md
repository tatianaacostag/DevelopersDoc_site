---
title: "API de Pricing"
linkTitle: "API de Pricing"
date: 2025-06-29T12:38:41-05:00
description: >
    La API de Pricing te permite consultar todas las opciones de financiamiento disponibles y los costos asociados para tus transacciones. Esto incluye la configuración de pricing de tu cuenta virtual de PayU, como cuotas estándar, cuotas sin interés y otras características relevantes para tus clientes.
weight: 50
tags: ["subtopic"]
---

## Opciones de pricing {#pricing-options}

La API de Pricing te permite obtener las opciones de financiamiento disponibles para una transacción determinada, incluidas las cuotas estándar y las promociones sin interés. Cada opción especifica los métodos de pago aplicables, los bancos elegibles (si corresponde), los días de la semana en los que está disponible y el período de validez de los programas promocionales.

La siguiente tabla muestra en qué países de PayU Latam está disponible cada tipo de opción de cuotas. Para más detalles, consulta la documentación de [Cuotas sin Intereses](https://developers.payulatam.com/latam/es/docs/services/promotions.html).

<table style="width: 60%; min-width: 300px; border-collapse: collapse;">
  <tr>
    <th style="width: 40%; text-align: left;">Tipo de cuota</th>
    <th colspan="2" style="width: 60%; text-align: left;">Países disponibles</th> 
  </tr>
  <tr>
    <td><strong>Cuotas estándar</strong></td>
    <td style="width: 30%;" >
      <img src="/assets/Argentina.png" width="15px"/> &nbsp;Argentina<br>
      <img src="/assets/Brasil.png" width="15px"/> &nbsp;Brasil<br>
      <img src="/assets/Chile.png" width="15px"/> &nbsp;Chile<br>      
    </td>
    <td style="width: 70%;" >
      <img src="/assets/Colombia.png" width="15px"/> &nbsp;Colombia<br>
      <img src="/assets/Mexico.png" width="15px"/> &nbsp;México<br>      
      <img src="/assets/Peru.png" width="15px"/> &nbsp;Perú
    </td>
  </tr>  
  <tr>
    <td><strong>Cuotas sin Intereses Generales (MSI)</strong></td>
    <td style="width: 30%;" >
      <img src="/assets/Argentina.png" width="15px"/> &nbsp;Argentina
    </td>  
    <td style="width: 70%;" >      
      <img src="/assets/Mexico.png" width="15px"/> &nbsp;México
    </td>
  </tr>
  <tr>
    <td><strong>Cuotas sin Intereses Específicas</strong></td>
    <td style="width: 30%;" >
      <img src="/assets/Argentina.png" width="15px"/> &nbsp;Argentina<br>
      <img src="/assets/Colombia.png" width="15px"/> &nbsp;Colombia
    </td>  
    <td style="width: 70%;" >    
      <img src="/assets/Mexico.png" width="15px"/> &nbsp;México<br>
      <img src="/assets/Peru.png" width="15px"/> &nbsp;Perú
    </td>
  </tr>  
</table>

{{% alert title="Nota" color="info"%}}

Para habilitar un plan de cuotas sin interés de acuerdo con tus acuerdos con emisores locales, contacta a tu representante de ventas de PayU.

{{% /alert %}}

El siguiente diagrama ilustra el proceso completo, desde la consulta a la API de Pricing hasta la aprobación de la transacción:

{{< promotions/pricingApi_es >}}

## Consultar las opciones de pricing disponibles {#querying-the-available-pricing-options}

Para obtener la información de precios, envía una solicitud `GET` a la URL correspondiente según el entorno.

{{% alert title="Endpoints de la API" color="info"%}}

* Pruebas: ```GET https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing```
* Producción: ```GET https://api.payulatam.com/payments-api/rest/v4.9/pricing```

{{% /alert %}}

Dado que este es un servicio RESTful, recomendamos enfáticamente no aplicar una validación estricta del esquema. Evitar la validación del esquema garantiza una integración sin inconvenientes y minimiza los cambios cuando se actualiza el servicio web.

### Autenticación para solicitudes {#authentication-for-requests}

Para autenticar las solicitudes a la API, debes utilizar un mecanismo basado en HMAC. Necesitas tu `MerchantPublicKey`, que se encuentra en tu Panel de Administración de PayU en **_Configuración_** > **_Configuración Técnica_** > **_Llave Pública_**.

{{% alert title="Note" color="info"%}}

Para realizar pruebas en el entorno sandbox, utiliza las credenciales que se encuentran en la documentación [Prueba tu solución](https://developers.payulatam.com/latam/es/docs/getting-started/test-your-solution.html).

{{% /alert %}}

![PrintScreen](/assets/Promotions/PublicKey_es.png)

#### Configurar la autenticación {#configuring-the-authentication}

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

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response}

Esta sección describe los parámetros utilizados en la solicitud de la API y los campos devueltos en la respuesta.

Los parámetros de la solicitud definen los valores de entrada requeridos para obtener información sobre precios, promociones y detalles de impuestos. Los parámetros de la respuesta detallan la estructura y el significado de los datos devueltos, incluyendo montos de la transacción, comisiones del método de pago, desglose de cuotas, promociones e impuestos aplicables.

<details>

<summary>Parámetros de la solicitud</summary>

<br>

<div class="variables"></div>

| Parámetro | Descripción | Obligatorio |
|-|-|:-:|
| `accountId` | Identificador único de tu cuenta. | Sí |
| `currency` | Moneda asociada a tu cuenta. | No |
| `amount` | Monto total de la compra. Se utiliza para calcular las comisiones mostradas en la respuesta. No filtra promociones por monto. | Sí |
| `paymentMethod` | Parámetro opcional para filtrar promociones por método de pago. Para más información sobre los métodos disponibles, consulta la documentación [Selecciona tu Método de Pago](https://developers.payulatam.com/latam/es/docs/getting-started/select-your-payment-method.html). | No |
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
| `amount` > `tax` | Número | Monto del impuesto incluido en la transacción. |
| `amount` > `purchaseValue` | Número | Valor de la compra antes de impuestos. |
| `amount` > `adminFeeValue` | Número | Monto de la tarifa administrativa incluida en la transacción. |
| `amount` > `adminFeeTax` | Número | Monto del impuesto aplicado a la tarifa administrativa. |
| `amount` > `adminFeeTaxableBase` | Número | Base gravable utilizada para calcular los impuestos sobre la tarifa administrativa. |
| `amount` > `currency` | Cadena | Código de moneda de la transacción original. |
| `amount` > `taxableBase` | Número | Valor de la transacción utilizado como base imponible. |
| `convertedAmount` | Objeto | Contiene el monto de la transacción convertido a otra moneda (si aplica). |
| `convertedAmount` > `value` | Número | Monto total convertido de la transacción. |
| `convertedAmount` > `tax` | Número | Monto del impuesto convertido. |
| `convertedAmount` > `purchaseValue` | Número | Valor convertido de la compra antes de impuestos. |
| `convertedAmount` > `adminFeeValue` | Número | Valor convertido de la tarifa administrativa. |
| `convertedAmount` > `adminFeeTaxableBase` | Número | Base gravable convertida para calcular los impuestos de la tarifa administrativa. |
| `convertedAmount` > `currency` | Cadena | Código de moneda del monto convertido. |
| `convertedAmount` > `taxableBase` | Número | Valor convertido utilizado como base imponible. |
| `paymentMethodFee` | Lista | Desglose de costos incurridos por el comercio según el método de pago. |
| `paymentMethodFee` > `paymentMethod` | Cadena | Nombre del método de pago. |
| `paymentMethodFee` > `pricingFees` | Objeto | Contiene los detalles de precios por método de pago y rango de cuotas. |
| `paymentMethodFee` > `pricingFees` > `installments` | Cadena | Número de cuotas, ya sea un valor único (ej., `1`) o, en países aplicables, un rango (ej., `1-36`). |
| `paymentMethodFee` > `pricingFees` > `pricing` | Objeto | Contiene los detalles de precios de la transacción. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` | Objeto | Desglose de intereses y comisiones cobradas al pagador. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` > `commission` | Número | Monto total de la comisión (incluyendo impuestos) cobrada al pagador. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` > `interests` | Número | Monto total de intereses (incluyendo impuestos) cobrados al pagador. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` > `total` | Número | Monto total a pagar por el pagador, incluyendo intereses y comisiones. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` | Objeto | Desglose de intereses y comisiones cobradas al comercio. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` > `commission` | Número | Monto total de la comisión (incluyendo impuestos) cobrada al comercio. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` > `interests` | Número | Monto total de intereses (incluyendo impuestos) cobrados al comercio. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` > `total` | Número | Costo total incurrido por el comercio, incluyendo intereses y comisiones. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `totalValue` | Número | Valor total de la transacción, incluyendo intereses y comisiones. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `totalIncomeTransaction` | Número | Ingreso total generado por la transacción. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `additionalInfo` | Objeto | Incluye información financiera como la Tasa Efectiva Anual (TEA) y el Costo Financiero Total (CFT). Aplica solo en Argentina. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `additionalInfo` > `cft` | Número | Costo Financiero Total (CFT) aplicado a la transacción. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `additionalInfo` > `tea` | Número | Tasa Efectiva Anual (TEA) aplicada a la transacción. |
| `paymentMethodFee` > `pricingFees` > `promos` | Arreglo | Lista de promociones disponibles aplicables a la configuración de precios. |
| `paymentMethodFee` > `pricingFees` > `promos` > `id` | Entero | ID único de la promoción en el sistema PayU. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` | Objeto | Contiene los detalles de precios de la promoción específica. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` | Objeto | Desglose de intereses y comisiones para el pagador bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` > `commission` | Número | Comisión cobrada al pagador bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` > `interests` | Número | Intereses cobrados al pagador bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` > `total` | Número | Monto total a pagar por el pagador, incluyendo comisiones e intereses, bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` | Objeto | Desglose de intereses y comisiones para el comercio bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` > `commission` | Número | Comisión cobrada al comercio bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` > `interests` | Número | Intereses cobrados al comercio bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` > `total` | Número | Costo total para el comercio, incluyendo comisiones e intereses, bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `totalValue` | Número | Valor total de la transacción, incluyendo comisiones e intereses, bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `totalIncomeTransaction` | Número | Ingreso total generado por la transacción bajo la promoción. |
| `paymentMethodFee` > `pricingFees` > `promos` > `priority` | Número | Nivel de prioridad de la promoción dentro de la configuración de precios. |
| `promotions` | Objeto | Contiene detalles sobre la promoción aplicada (si aplica). |
| `promotions` > `id` | Entero | ID único de la promoción en el sistema PayU. |
| `promotions` > `title` | Cadena | Título de la promoción (máximo 50 caracteres). |
| `promotions` > `termsAndConditions` | Cadena | Términos y condiciones aplicables a la promoción (máximo 250 caracteres). |
| `promotions` > `paymentMethod` | Cadena | Método de pago asociado a la promoción. |
| `promotions` > `subFranchise` | Cadena | Sub-marca o sub-franquicia asociada a la promoción. Si no se proporciona `subFranchise`, la promoción no está vinculada a una tarjeta local (como Naranja), sino que aplica a una marca internacional (ej., Mastercard), según lo definido por `paymentMethodMain`. |
| `promotions` > `banksNames` | Lista | Lista de bancos donde aplica la promoción. Si no se proporciona `banksNames`, la promoción aplica a todo el método de pago, teniendo prioridad `paymentMethodMain`. |
| `promotions` > `paymentMethodMain` | Cadena | Método de pago principal asociado a la promoción. |
| `promotions` > `iin` | Lista | Lista de números IIN/BIN de tarjetas elegibles para la promoción. |
| `promotions` > `iins` | Lista | Lista de números IIN/BIN de tarjetas elegibles para la promoción. Si no se proporciona `iins`, la promoción está disponible para todas las tarjetas bajo el método de pago especificado en `paymentMethodMain`. |
| `promotions` > `days` | Lista | Días de la semana en los que la promoción está disponible. |
| `promotions` > `startDate` | DateTime | Fecha y hora de inicio de la promoción. |
| `promotions` > `endDate` | DateTime | Fecha y hora de finalización de la promoción. |
| `promotions` > `priority` | Número | Nivel de prioridad de la promoción. |
| `promotions` > `type` | Cadena | Tipo de promoción. Valores posibles:<br><br>**PRICING** – La promoción se aplica automáticamente según las reglas de precios configuradas. Por ejemplo, en México, si se configuran cuotas sin interés, el comercio solo necesita enviar el número de cuotas en `transaction > extraParameters > INSTALLMENTS_NUMBER`. El sistema aplicará automáticamente la condición sin interés sin requerir un ID de promoción.<br><br>**MSI** – Requiere que el comercio envíe explícitamente tanto el ID de la promoción como el número de cuotas. Esto aplica cuando la promoción debe coincidir con una combinación específica de método de pago, cuotas e ID de promoción. Para aplicar este tipo, deben enviarse los siguientes campos:<br>- `transaction > extraParameters > INSTALLMENTS_NUMBER`<br>- `transaction > extraParameters > PROMOTION_ID`<br><br>**Nota:** Si no se envía el ID de la promoción cuando es requerido, la transacción se procesará sin la promoción, usando la configuración de precios por defecto para la opción de cuotas seleccionada. |
| `paymentTaxesDetails` | Objeto | Contiene detalles de los impuestos aplicados (la estructura depende de la respuesta del servicio de impuestos). |
| `taxesServiceFailed` | Booleano | Indica si falló el servicio de cálculo de impuestos. |

</details>

### Llamado a la API {#api-call}

Para obtener los planes de Cuotas sin Intereses disponibles, envía una solicitud `GET` con el siguiente formato:

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

## Procesamiento de transacciones con cuotas {#processing-transactions-with-installments}

Esta sección explica cómo usar y aplicar los diferentes planes de cuotas.

{{% alert title="Nota" color="info"%}}

Ten en cuenta que la API de Pricing solo proporciona información sobre las opciones de cuotas disponibles. Para crear y enviar transacciones, utiliza la API de Pagos del país correspondiente:

* [Argentina]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}}) | [Brasil]({{< ref "Payments-API-Brazil.md#submit-transactions-using-credit-cards" >}}) | [Chile]({{< ref "Payments-API-Chile.md#submit-transactions-using-credit-debit-or-prepaid-cards" >}}) | [Colombia]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}) | [México]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}}) | [Perú]({{< ref "Payments-API-Peru.md#submit-transactions-using-credit-or-debit-cards" >}})

{{% /alert %}}

### Tipos de cuotas {#installment-types}

La siguiente tabla resume los tipos de cuotas disponibles, sus parámetros requeridos y quién asume los intereses.

| Tipo de cuota | Países aplicables | Parámetros requeridos | ¿Quién asume los intereses? | Notas |
| --- | --- | --- | --- | --- |
| **Cuotas estándar** | Argentina, Brasil, Chile, Colombia, México, Perú | `INSTALLMENTS_NUMBER` | Pagador | Plan de cuotas predeterminado con intereses. |
| **Cuotas sin Intereses Generales (MSI)** | Argentina, México | `INSTALLMENTS_NUMBER` | Comercio | Deben estar habilitadas en tu cuenta PayU. No se requiere ID de promoción. En México, el ID de promoción 9999 no es necesario. |
| **Cuotas sin Intereses Específicas** | Argentina, Colombia, México, Perú | `PROMOTION_ID` + `INSTALLMENTS_NUMBER` | Comercio | Vinculadas a una promoción o convenio específico. |

**Consideraciones:**

* Confirma que los planes sin interés o MSI estén habilitados en tu cuenta PayU para garantizar que el sistema los aplique correctamente.  
* Si envías únicamente `INSTALLMENTS_NUMBER` sin un plan activo de Cuotas sin Intereses Generales, el sistema aplica cuotas estándar y los intereses se cargan al pagador.

### Mostrar las cuotas elegibles en el checkout {#displaying-eligible-installments-at-checkout}

Al mostrar las opciones de cuotas disponibles durante el checkout, valida la elegibilidad usando las siguientes reglas:

1. Compara el BIN de la tarjeta con los valores en `promotions[].iin`.  
2. Si no se especifican BINs, verifica si el banco del usuario coincide con alguno en `promotions[].banksNames`.  
3. Si no se especifican bancos, utiliza el método de pago (marca de la tarjeta) definido en `paymentMethodFee[].paymentMethod`.  

Usa los siguientes campos de la respuesta de la API de Pricing para determinar la elegibilidad y mostrar las opciones correctas de cuotas:

* `paymentMethodFee[].pricingFees[].installments` → Número de cuotas disponibles  
* `paymentMethodFee[].pricingFees[].promos[].id` → ID de la promoción asociada  
* `promotions[].id, promotions[].iin, promotions[].banksNames` → Criterios de elegibilidad de la promoción  
* `paymentMethodFee[].paymentMethod` → Marca de la tarjeta (ejemplo: Visa, Mastercard)  

Al validar esta jerarquía, aseguras que los usuarios solo vean las opciones de cuotas que aplican a su tarjeta.

#### Ejemplos de checkout {#checkout-examples}

##### Ejemplo: Cuotas estándar en Argentina

En este ejemplo, el pagador asume los intereses. Los valores en `paymentMethodFee[].pricingFees[].pricing.payerDetail` son mayores a `0`.

![PrintScreen](/assets/Promotions/promo2.png)

##### Ejemplo: Cuotas sin Intereses Generales en Argentina

En este ejemplo, el comercio asume los intereses. Los valores en `paymentMethodFee[].pricingFees[].pricing.merchantDetail` son mayores a `0`.

![PrintScreen](/assets/Promotions/promo3.png)

##### Ejemplo: Cuotas sin Intereses Específicas en Argentina

En este ejemplo, el comercio asume los intereses. Los valores en `paymentMethodFee[].pricingFees[].promos[].pricing.merchantDetail` son mayores a `0`.

![PrintScreen](/assets/Promotions/promo5.png)

#### Mostrar CFT y TEA en Argentina {#displaying-cft-and-tea-in-argentina}

De acuerdo con la Resolución E 51/2017 de la Secretaría de Comercio (Argentina), los comercios deben mostrar de manera clara la información de financiamiento al procesar transacciones con tarjetas de crédito o débito en cuotas.

Específicamente, debes:

- Diferenciar el precio de contado del costo de financiamiento tanto en cuotas con interés como sin interés.  
- Mostrar el **Costo Financiero Total (CFT)** de forma destacada junto al precio de contado.  
  - Usa un color resaltado y un tamaño de fuente al menos cinco veces mayor que el utilizado para TEA, el número de cuotas y su valor.  
  - El CFT debe incluir los intereses e impuestos aplicables (como el IVA).  
- Mostrar la **Tasa Efectiva Anual (TEA)**, que refleja la diferencia entre el precio de contado y el precio financiado.  
- Evitar el uso de la frase *“sin interés”* o similares si el costo financiero está incorporado en el precio del producto o servicio.  

Esta información está disponible en los campos de respuesta de la API:

- `paymentMethodFee[].pricingFees[].pricing.additionalInfo`  
- `paymentMethodFee[].pricingFees[].promos[].pricing.additionalInfo`  

##### Ejemplo de visualización

Al mostrar las opciones de cuotas a los clientes, incluye los siguientes elementos:

![PrintScreen](/assets/Payments/Installments_en.png)

Donde: 

| Número en la pantalla | Opción         | Descripción                                         |
|:---------------------:|----------------|-----------------------------------------------------|
|           1           | Compra total   | Monto total de la compra sin financiamiento.        |
|           2           | Pago total     | Monto total financiado de la compra.                |
|           3           | Cuotas         | Número de cuotas y el valor de cada una.            |
|           4           | TEA            | La tasa efectiva anual (TEA) aplicada.              |
|           5           | CFT            | El costo financiero total (CFT).                    |

{{% alert title="Nota" color="info"%}}

Para las cuotas sin interés, igualmente debes mostrar TEA y CFT, pero con valores de **0%**.

{{% /alert %}}

### Identificación de tipos de cuotas según la asignación de intereses

La siguiente tabla muestra cómo identificar el tipo de cuota según la forma en que el sistema asigna los intereses entre el pagador y el comercio, utilizando los campos de la respuesta de la API de Pricing.

<table style="width:100%; border-collapse:collapse;">
  <thead>
    <tr>
      <th style="text-align:left;">Tipo de cuota</th>
      <th style="text-align:center;">Interés del pagador</th>
      <th style="text-align:center;">Interés del comercio</th>
      <th style="text-align:left;">¿Quién asume el interés?</th>
      <th style="text-align:left;">Notas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Cuota estándar (Sin interés)</strong></td>
      <td style="text-align:left;">
        Valores en: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> pricing.payerDetail</code> = <code>0</code><p>
        <br>En México: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.payerDetail</code> = <code>0</code>
      </td>
      <td style="text-align:left;">
        Valores en: <br>
        <code>paymentMethodFee[].pricingFees[] <br> .pricing.merchantDetail</code> = <code>0</code><p>
        <br>En México: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.merchantDetail</code> = <code>0</code><p>
      </td>
      <td>Banco (fuera de la API de Pricing de PayU)</td>
      <td>Sin interés desde la perspectiva de PayU; cualquier cargo proviene directamente del banco.</td>
    </tr>
    <tr>
      <td><strong>Cuota estándar (Con interés)</strong></td>
      <td style="text-align:left;">
        Valores en: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> pricing.payerDetail</code> > <code>0</code><p>
        <br>En México: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.payerDetail</code> > <code>0</code><p>
      </td>
      <td style="text-align:left;">
        Valores en: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> pricing.merchantDetail</code> = <code>0</code><p>
        <br>En México: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.merchantDetail</code> = <code>0</code><p>
      </td>
      <td>Pagador</td>
      <td>El comercio no asume el interés.</td>
    </tr>
    <tr>
      <td><strong>Cuotas sin Intereses Generales</strong></td>
      <td style="text-align:left;">
        Valores en: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> pricing.payerDetail</code> = <code>0</code><p>
        <br>En México: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.payerDetail</code> = <code>0</code>
      </td>
      <td style="text-align:left;">
        Valores en: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> pricing.merchantDetail</code> > <code>0</code><p>
        <br>En México: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.merchantDetail</code> > <code>0</code><p>
      </td>
      <td>Comercio</td>
      <td>Aplica a todo el método de pago o marca de tarjeta.</td>
    </tr>
  </tbody>
</table>

### Identificación de Cuotas Sin Intereses Específicas

Cuando consultas la API de Pricing, puedes identificar una cuota promocional específica si el arreglo `promos` contiene una promoción donde:

- El **pagador** paga **0 interés**.  
- El **comerciante** asume el costo total (la comisión o el interés es mayor que `0`).  

Este tipo de promoción puede aplicar a bancos específicos o a BINs asociados a una determinada franquicia de tarjeta.

#### Validación de Cuotas sin Intereses Específicas

- Valores en `paymentMethodFee[].pricingFees[].promos[].pricing.payerDetail` = `0`  
- Valores en `paymentMethodFee[].pricingFees[].promos[].pricing.merchantDetail` > `0`  

Para comprender completamente las condiciones de una promoción, revisa el objeto `promotions[]` que coincida con el ID de la promoción proveniente de:  
- `paymentMethodFee[].pricingFees[].promos[].id`

<table style="width: 60%; min-width: 300px; border-collapse: collapse;">
  <tr>
    <th colspan="2" style="text-align: left;">Campos clave en <code>promotions[]</code> a revisar:</th>
  </tr>
  <tr>
    <td><code>promotions[].id</code></td>
    <td><code>promotions[].banksNames</code></td>
  </tr>
  <tr>
    <td><code>promotions[].title</code></td>
    <td><code>promotions[].iins</code></td>
  </tr>
  <tr>
    <td><code>promotions[].termsAndConditions</code></td>
    <td><code>promotions[].days</code></td>
  </tr>
  <tr>
    <td><code>promotions[].paymentMethod</code></td>
    <td><code>promotions[].startDate</code></td>
  </tr>
  <tr>
    <td><code>promotions[].subFranchise</code></td>
    <td><code>promotions[].endDate</code></td>
  </tr>
  <tr>
    <td><code>promotions[].priority</code></td>
    <td><code>promotions[].type</code></td>
  </tr>
</table>

{{% alert title="Importante" color="warning"%}}

Al mostrar **Cuotas sin Intereses Específicas** en el checkout, asegúrate de mostrarlas **solo si el BIN, banco o método de pago coincide con la tarjeta del usuario**.  
Si muestras una promoción no elegible y el usuario la selecciona, la transacción será rechazada porque PayU no podrá encontrar una ruta de autorización válida.

{{% /alert %}}

#### Ejemplo de respuesta para Cuotas sin Intereses Específicas

El siguiente ejemplo ilustra cómo puede lucir una respuesta cuando una promoción está ligada a condiciones específicas como **rangos de BIN, bancos, franquicias de tarjeta o días de la semana**.  

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

```JSON
"promotions": [
  {
    "id": 1218,
    "title": "ABC Bank",
    "termsAndConditions": "6-month interest-free financing for cards with BIN 828076 from ABC Bank. Promotion valid from 08/20/2025 to 08/20/2025. Applies only on weekdays: Tuesday",
    "iin": [
      "828076"
    ],
    "paymentMethodMain": "VISA",
    "startDate": "2025-08-20 00:00:00",
    "endDate": "2025-08-20 23:59:00",
    "days": [
      "TUESDAY"
    ],
    "priority": 10,
    "type": "MSI"
  }
]

```
{{< /tab >}}

{{< tab tabNum="2" >}}

```XML
<promotions>
  <promotion>
    <id>1218</id>
    <title>ABC Bank</title>
    <termsAndConditions>
      6-month interest-free financing for cards with BIN 828076 from ABC Bank. Promotion valid from 08/20/2025 to 08/20/2025. Applies only on weekdays: Tuesday
    </termsAndConditions>
    <iin>
      <value>828076</value>
    </iin>
    <paymentMethodMain>VISA</paymentMethodMain>
    <startDate>2025-08-20 00:00:00</startDate>
    <endDate>2025-08-20 23:59:00</endDate>
    <days>
      <day>TUESDAY</day>
    </days>
    <priority>10</priority>
    <type>MSI</type>
  </promotion>
</promotions>
```
{{< /tab >}}

{{< /tabs >}}

##### Mostrar los términos y condiciones en el checkout

Puedes usar el campo `termsAndConditions` para indicar los detalles de los planes de Cuotas sin Intereses Específicas. A continuación, se muestra un ejemplo de cómo presentar al pagador las condiciones en el checkout usando la respuesta obtenida anteriormente:

<img src="/assets/Promotions/promo4.png" style="display: block; margin: 0 auto; width: 550px;">

### Diferenciación entre cuotas estándar vs. Cuotas sin Intereses Específicas

Cuando utilizas la API de Pricing, necesitas saber cómo distingue el sistema entre cuotas estándar y promocionales.

Usa la siguiente estructura para identificar el tipo de cuota:

- `paymentMethodFee[].pricingFees[].pricing{}` → Cuotas estándar (sin ID de promoción)  
- `paymentMethodFee[].pricingFees[].promos[].pricing{}` → Cuotas vinculadas a un `PROMOTION_ID` específico  

**Notas clave**

- El arreglo `pricingFees[]` puede incluir entradas con o sin un objeto `pricing{}`.  
- El arreglo `pricingFees[]` puede incluir entradas con o sin un arreglo `promos[]`.  
- El arreglo `promos[]` puede contener múltiples promociones individuales.  

Dependiendo de los elementos presentes, puedes determinar el tipo de cuota:

1. **Estándar + promocional:**  
   El plan de cuotas incluye tanto un objeto `pricing{}` estándar como una o más entradas en el arreglo `promos[]`.  
   **Ejemplo:** Un plan Mastercard a 3 cuotas puede incluir una opción estándar con interés, además de dos promociones diferentes sin interés dirigidas a BINs específicos.  

2. **Solo estándar:**  
   El plan de cuotas incluye `pricing{}` pero no un arreglo `promos[]`.  
   **Ejemplo:** Un plan Visa a 6 cuotas ofrece solo precios estándar sin promociones disponibles.  

3. **Solo promocional:**  
   El plan de cuotas incluye únicamente el arreglo `promos[]` sin un objeto `pricing{}`.  
   **Ejemplo:** Un plan AMEX a 3 cuotas ofrece condiciones sin interés mediante una promoción que aplica a todas las tarjetas AMEX, sin opción de precios estándar.  

Al verificar estos elementos en la respuesta de la API, puedes decidir de manera programática qué promociones mostrar y cómo procesar cada cuota correctamente.

### Manejo de campos faltantes en promociones

En algunos casos, las promociones no incluyen ciertos campos. La ausencia de un campo define cómo aplica la promoción.

| Campo faltante | Significado |
|----------------|-------------|
| `promotions[].subFranchise` | La promoción **no** está asociada a una tarjeta local (p. ej., Naranja). En su lugar, aplica a una franquicia internacional (p. ej., Mastercard) definida por `paymentMethodMain`. |
| `promotions[].banksNames` | La promoción aplica a **todos los bancos** para el método de pago, teniendo prioridad `paymentMethodMain`. |
| `promotions[].iins` | La promoción aplica a **todas las tarjetas** bajo el método de pago especificado en `paymentMethodMain`. |

### Procesamiento de una transacción con cuotas estándar

Para procesar una transacción utilizando cuotas estándar, especifica el número de meses en el campo `extraParameters`:

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

{{% alert title="Nota" color="info"%}}

Para crear y enviar las transacciones, utiliza la API de Pagos del país correspondiente:

[Argentina]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}}) | [Brasil]({{< ref "Payments-API-Brazil.md#submit-transactions-using-credit-cards" >}}) | [Chile]({{< ref "Payments-API-Chile.md#submit-transactions-using-credit-debit-or-prepaid-cards" >}}) | [Colombia]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}) | [México]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}}) | [Perú]({{< ref "Payments-API-Peru.md#submit-transactions-using-credit-or-debit-cards" >}})

{{% /alert %}}

### Procesamiento de una transacción con Cuotas sin Intereses Generales

El plan de Cuotas sin Intereses Generales **no requiere un** `PROMOTION_ID`. Una vez que configures este plan en tu cuenta de PayU, envía la solicitud con el número de meses en el campo `extraParameters`:

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
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

{{% alert title="Nota" color="info"%}}

Para crear y enviar las transacciones, utiliza la API de Pagos del país correspondiente:

[Argentina]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}}) | [México]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}})

{{% /alert %}}

#### Meses Sin Intereses (MSI) en México

En México, las **Cuotas sin Intereses Generales** son comúnmente conocidas como **Meses Sin Intereses (MSI)**. Esta opción te permite ofrecer planes de pago fijos (3, 6, 9, 12 o 18 meses) sin interés.

Las transacciones MSI utilizan la misma estructura que las cuotas estándar especificando el número de meses en el campo `INSTALLMENTS_NUMBER` del objeto `extraParameters`. A diferencia de las cuotas promocionales, MSI no requiere un `PROMOTION_ID`. Las duraciones válidas de MSI son 3, 6, 9, 12 o 18 meses.

**Campos a verificar:**
- `paymentMethodFee[].pricingFees[].promos[9999].pricing.payerDetail` → sin interés.
- `paymentMethodFee[].pricingFees[].promos[9999].pricing.merchantDetail` → con interés.
- `promotions[9999].type` = `PRICING`

{{% alert title="Nota" color="info"%}}

Dado que esta promoción es de tipo `PRICING`, PayU no requiere incluir el ID de la promoción `9999` para crear la transacción o la autorización.

{{% /alert %}}

Una vez que configures este plan en tu cuenta de PayU, envía la solicitud con el número de meses en el campo `extraParameters`:

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
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

##### Consideraciones

* Opciones soportadas: 3, 6, 9, 12 o 18 meses.
* Montos mínimos de compra:
    - 3 meses → $300 MXN
    - 6 meses → $600 MXN
    - 9 meses → $900 MXN
    - 12 meses → $1200 MXN
    - 18 meses → $1800 MXN
* MSI está disponible con los siguientes bancos: BANAMEX, BANCO REGIONAL DE MONTERREY S.A, BANCOPPEL, BANCO AZTECA, SCOTIABANK, HSBC, INBURSA, BANCA MIFEL SA, BANCO MULTIVA, BAJIO, CI BANCO, Afirme, Banregio, Banjercito, Banorte, Famsa, Invex, Premium Card Liverpool, Santander y Bancomer.
* Al usar la promoción siempre muestre la frase **MESES SIN INTERESES** durante el proceso de pago. Para las cuotas estándar (sin cuotas promocionales), use **PAGOS DIFERIDOS**.

{{% alert title="Notas" color="info"%}}

* Para habilitar los planes MSI en su cuenta, contacte a su representante de ventas.

* Para más detalles, consulte la [API de Pagos para México]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}}).

{{% /alert %}}

#### Identificación de planes de Cuotas sin Intereses Generales vs. Específicas en México

Debido a que la API maneja las **Cuotas sin Intereses Generales** de forma diferente en México, puede confundirlas con las **Cuotas sin Intereses Específicas**. Use el campo `promotions[].type` en la respuesta de la API para diferenciarlas:

| Tipo de cuota | `promotions[].type` | Descripción | 
|:-------------:|---------------------|---------------------------------------------------|
| Cuotas sin Intereses Específicas | `MSI` | El término MSI es común en México, pero la API devuelve `MSI` para todos los países que ofrecen Cuotas sin Intereses Específicas: Argentina, Colombia, Perú y México. |
| Cuotas sin Intereses Generales **(México)** | `PRICING` | En México, la API usa `PRICING` para las Cuotas sin Intereses Generales, aunque localmente se conozcan como Meses Sin Intereses (MSI). |

### Procesar una transacción con Cuotas sin Intereses Específicas

Al usar un plan de Cuotas sin Intereses Específicas, incluya tanto el `PROMOTION_ID` como el `INSTALLMENTS_NUMBER` dentro del objeto `extraParameters` en su solicitud:

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
"extraParameters": {
    "INSTALLMENTS_NUMBER": (número de cuotas),
    "PROMOTION_ID": (Id de promoción seleccionada)
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
        <string>Id de promoción seleccionada</string>
    </entry>
</extraParameters>
```
{{< /tab >}}
{{< /tabs >}}
<br>

{{% alert title="Nota" color="info"%}}

Para crear y enviar las transacciones, use la API de Pagos del país correspondiente:

* [Argentina]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}}) | [Colombia]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}) | [México]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}})
| [Perú]({{< ref "Payments-API-Peru.md#submit-transactions-using-credit-or-debit-cards" >}})

{{% /alert %}}

### Procesar transacciones con cuotas mediante PayU Enterprise

Al integrar **PayU Enterprise** con la **API de Pricing de PayU Latam**, puede encontrar diferencias en las convenciones de nombres, estructuras y mapeo de campos.  
Para asegurar que los planes de cuotas y las promociones se muestren y apliquen correctamente, debe:

1. **Validar los separadores decimales** para garantizar un formato consistente entre las APIs.  
2. **Mapear los emisores de tarjetas** para alinear las convenciones de nombres.  
3. **Relacionar las promociones** con los detalles correctos de tarjeta o banco usando BINs, nombres de bancos o métodos de pago.  
4. **Opcionalmente:** Soportar tarjetas tokenizadas al mostrar las opciones de cuotas.  
5. **Opcionalmente:** Enviar datos en las solicitudes de cargo para el enrutamiento de transacciones en Argentina.  

Las siguientes secciones describen estos requisitos en detalle.

#### Formato de montos entre PayU Enterprise y PayU Latam

Al obtener montos desde la **API de PayU Enterprise**, asegúrate de que el formato decimal sea compatible con la **API de Pricing**. Formatee los valores de la siguiente manera:

* Use un máximo de dos decimales.  
* Elimine cualquier separador innecesario.  

**Ejemplos de formato válido en la API de Pricing:**

* Enviar **$1000** como `1000.00` o `1000`.  
* Enviar **$50.25** como `50.25`.  

Asimismo, asegúrese de mapear correctamente los campos relacionados entre las dos APIs:

- En **PayU Enterprise**:  
  - `order > tax_amount`  
  - `order > sub_total`  

<p>

- En **API de Pricing de PayU Latam**:  
  - `tax`  
  - `taxReturnBase`  

{{% alert title="Nota" color="info"%}}

Los parámetros `tax` y `taxReturnBase` solo aplican en **Argentina** y **Colombia**.

{{% /alert %}}

#### Mapeo de emisores de tarjetas

Los emisores de tarjetas pueden tener nombres diferentes en la API de Pricing y en PayU Enterprise. Para asegurar que las opciones de cuotas se muestren correctamente, es necesario mapear los valores entre los dos sistemas.

**Consideraciones:**
* La **API de Pricing** devuelve el emisor de la tarjeta en el campo `paymentMethodFee > paymentMethod`.  
* La **API de PayU Enterprise** devuelve el emisor de la tarjeta en el campo `vendor`.  

La siguiente tabla muestra el mapeo entre ambas fuentes:

| API de Pricing (`paymentMethodFee > paymentMethod`) | PayU Enterprise (`vendor`) | Notas |
| --- | --- | --- |
| `AMEX` | `AMERICAN EXPRESS` | Misma marca, convención de nombres diferente |
| `ARGENCARD` | `ARGENCARD` | Idéntico |
| `CABAL` | `CABAL` | Idéntico |
| `CENCOSUD` | `CENCOSUD CARD` | Misma marca, sufijo “CARD” en PayU Enterprise |
| `DINERS` | `DINERS CLUB INTERNATIONAL` | Misma marca, nombre completo en PayU Enterprise |
| `ELO` | `ELO` | Idéntico |
| `MASTERCARD` | `MASTERCARD` | Idéntico |
| `NARANJA` | `NARANJA CARD` | Misma marca, sufijo “CARD” en PayU Enterprise |
| `VISA` | `VISA` | Idéntico |

#### Relacionar una promoción con la tarjeta del usuario

El nombre del emisor del token que devuelve PayU Enterprise puede no coincidir exactamente con el nombre del banco listado en el arreglo `promotions[]` de la API de Pricing.

Para garantizar una coincidencia precisa, se recomienda validar las promociones utilizando el BIN (IIN) definido en la promoción.

Al mostrar opciones de cuotas en el checkout para promociones basadas en cuotas, siga la secuencia de validación que se indica a continuación:

| Paso | Condición | Regla de validación | Campos de la API a verificar |
| --- | --- | --- | --- |
| **1** | `promotions[].iin` está presente | Hacer coincidir el BIN (IIN) del usuario con uno de los valores en `promotions[].iin`.   | `promotions[].iin`                  |
| **2** | No se especifican BINs       | Hacer coincidir el banco del usuario con uno de los valores en `promotions[].banksNames`. | `promotions[].banksNames`           |
| **3** | No se especifican bancos     | Hacer coincidir el emisor de la tarjeta con el método de pago en la promoción.            | `paymentMethodFee[].paymentMethod`  |

#### Opcional: Tarjetas tokenizadas y opciones de cuotas

Al utilizar la tokenización de tarjetas, puede mostrar opciones de cuotas siguiendo este flujo:

1. Solicitar los datos de la tarjeta al usuario  
2. Tokenizar la tarjeta  
3. Consultar la API de Pricing  
4. Mostrar las opciones de cuotas disponibles  

**Ejemplo de visualización 1**

El usuario ingresa los datos de la tarjeta y el checkout muestra las opciones de cuotas disponibles:

![PrintScreen](/assets/Promotions/promo6.png)

**Ejemplo de visualización 2**

El checkout incluye dos botones: uno para pagar de contado y otro para pagar en cuotas.

![PrintScreen](/assets/Promotions/promo7.png)

{{% alert title="Nota" color="info"%}}

Asegúrese de cumplir con las regulaciones locales en el país donde opera. Su checkout debe mostrar toda la información requerida por las autoridades.

{{% /alert %}}

#### Opcional: Envío de datos en solicitudes de cobro para enrutamiento de transacciones (Argentina)

Al procesar transacciones en **Argentina**, incluya campos específicos en la solicitud de **Cobro** para garantizar un enrutamiento correcto mediante el motor de decisión de PayU. Al enviar estos datos, el sistema puede dirigir la transacción a la cuenta correcta, en particular al manejar promociones con cuotas sin interés.  

##### Campos requeridos

- **Account ID**: El ID de la cuenta desde la cual recuperó la promoción utilizando la **API de Pricing**.  
- **Installments**: La opción de cuotas que el usuario seleccionó durante el checkout.  
- **Promotion ID**: El ID de la promoción asociada con la opción de cuotas seleccionada.  

##### Configuración de enrutamiento

Para enrutar las transacciones correctamente:  
1. Configure un nuevo proveedor usando la cuenta que ofrece **cuotas sin interés** (esta cuenta sigue un modelo de liquidación diferente al de la cuenta estándar).  
2. Cree una regla de enrutamiento en el motor de decisión, como se muestra en la imagen de ejemplo.  

<img src="/assets/Promotions/promo8.png" style="display: block; margin: 0 auto; width: 550px;">

{{% alert title="Nota" color="info"%}}

PayU puede asistirlo en la configuración de la regla de enrutamiento.

{{% /alert %}}

##### Rutas de campos de la API

Use las siguientes rutas de la API al enviar datos en la solicitud de **Cobro** o **Autorización**:  

- Cuotas (selección del usuario):  
  `installments.number_of_installments`  
- Cuotas (enrutamiento del motor de decisión):  
  `additional_details.number_of_installments`  
- Promotion ID (específico del proveedor):  
  `provider_specific_data.payu_latam.additional_details.promotion_id`  
- Promotion ID (enrutamiento del motor de decisión):  
  `additional_details.promotion_id`  
- Account ID (enrutamiento por cuenta de Latam):  
  `additional_details.account_id`  
