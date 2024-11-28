---
title: "Aerolíneas y Agencias de Viaje - Colombia"
date: 2024-11-26T12:15:57-05:00
description: >
  Este documento explica cómo las aerolíneas y agencias de viajes en Colombia pueden usar la integración WebCheckout para un procesamiento de pagos seguro y eficiente. Si tienes una integración API, consulta la [API de Pagos para aerolíneas y agencias de viajes](https://developers.payulatam.com/latam/es/docs/integrations/api-integration/payments-api-colombia.html#process-payments-as-an-airline-or-travel-agency).
weight: 50
tags: ["subtopic"]
---

## Consideraciones:

* Disponible exclusivamente en Colombia para transacciones en moneda COP.
* Permite procesar pagos a través del modelo TSP/Gateway.
* Requiere el registro de códigos IATA con los adquirentes.
* Soporta pagos con tarjeta de crédito o débito, incluyendo Amex, Diners, Mastercard y Visa.
* Permite la dispersión de fondos, permitiendo a las agencias de viajes y aerolíneas recibir pagos dentro de la misma transacción.
* Requiere un procesamiento en un solo paso: el sistema transfiere los fondos desde la cuenta del cliente al banco adquirente en cuanto se autoriza el pago.

## Características de la Integración:

Esta integración simplifica el proceso de pago para aerolíneas y agencias de viajes en Colombia al permitir enviar información esencial en cada transacción para una identificación y distribución precisa de los fondos. Además, enviar detalles específicos de la transacción puede calificarte para la exención del impuesto 4 x 1000 (confirma con tu banco adquirente).

| **Característica** | **Aerolíneas** | **Agencias de Viajes** |
|-|-|-|
| **Inclusión de Tarifas** | Las aerolíneas pueden enviar su ID de aerolínea junto con tarifas aeroportuarias y otros impuestos asociados. | Las agencias de viajes pueden enviar sus tarifas junto con las tarifas de aerolínea, tarifas aeroportuarias, comisiones administrativas y otros cargos. |
| **Identificación** | Los adquirentes pueden identificar específicamente a la aerolínea a través del ID de aerolínea para una distribución precisa. | Permite al adquirente identificar tanto a la agencia de viajes como a la aerolínea para una correcta distribución de fondos. |
| **Elegibilidad para Exención del Impuesto 4 x 1000** | Las aerolíneas en Colombia pueden calificar si proporcionan su ID de aerolínea y la información de tarifas correspondiente. | Las agencias de viajes en Colombia pueden calificar si proporcionan detalles completos de la transacción. |

{{% alert title="Nota" color="info"%}}

Consulta con tu banco adquirente si tu negocio cumple los requisitos para la exención del impuesto 4 x 1000. La elegibilidad depende de la información proporcionada en cada transacción y las regulaciones actuales.

{{% /alert %}}

## Pasos para la Integración

1. Obtén la lista de aerolíneas disponibles.
2. Crea el formulario WebCheckout, incluyendo el código de aerolínea y las tarifas e impuestos aeroportuarios.

### 1) Obtener la Lista de Aerolíneas Disponibles

Para integrarte con PayU, tanto las aerolíneas como las agencias de viajes deben obtener la lista de códigos de aerolíneas válidos para la cobranza y enviarlos en el WebCheckout. Esto se logra consultando el sistema de PayU para obtener la lista de aerolíneas disponibles y sus códigos correspondientes. El endpoint para obtener los códigos de aerolíneas es el mismo para ambos tipos de comercios, aunque el uso específico puede variar:

- **Aerolíneas**:
  - Obtienen y envían sus propios códigos para garantizar una identificación precisa y beneficios fiscales potenciales.
  - Al proporcionar el código de aerolínea, aseguran transacciones ágiles para sus tarifas y cargos asociados.

- **Agencias de Viajes**:
  - Obtienen el código de aerolínea asociado a cada pago para garantizar una asignación correcta de tarifas e impuestos.
  - Esta integración ayuda a identificar la aerolínea involucrada en la transacción para una distribución adecuada de fondos. 

#### Pasos para Obtener la Lista

1. Usa los siguientes endpoints según tu entorno:

- **Sandbox**: `https://sandbox.api.payulatam.com/payments-api/rest/v4.3/payments/airline`
- **Producción**: `https://api.payulatam.com/payments-api/rest/v4.3/payments/airline`

2. Incluye el siguiente parámetro de consulta en tu solicitud:

| **Parámetro de Consulta** | **Descripción** |
|-|-|
| `accountID` | Identificador único que PayU Latam asignó a tu cuenta de comerciante. |

3. Incluye el siguiente parámetro de cabecera para la autenticación:

| **Parámetro de Cabecera** | **Descripción** |
|-|-|
| `Authorization` | Valor del encabezado de autenticación para realizar una solicitud `get` válida. |

**Ejemplo de código en JavaScript para generar el encabezado de autenticación:**

```javascript
var contentToSign = "pRRXKOl8ikMmt9u" + ":" + "4Vj8eK4rloUd272L48hsrarnUA";
var base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(contentToSign));
var authenticationHeader = "Basic " + base64.toString();
```

{{% alert title="Nota" color="info"%}}

Los códigos de aerolíneas suelen ser estables, pero pueden cambiar ocasionalmente. Recomendamos consultar la API periódicamente para garantizar precisión.

{{% /alert %}}

#### Ejemplo de una Respuesta:

La respuesta será un payload en JSON o XML que contiene un arreglo de aerolíneas con sus respectivos códigos y descripciones.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

```JSON
{
  "airlines": [
    {
      "code": "81",
      "description": "AVIA MARKETING LTDA NAL Nacional"
    },
    .
    .
    .
    {
      "code": "65",
      "description": "OCEANAIR LINHAS AEREAS S.A Nacional"
    }
  ]
}
```
<br>

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

```XML
<com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlinesListResponse>
 <airlines>
 <com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 <code>80</code>
 <description>AVIATUR S.A. BOG Internacional</description>
 </com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 .
 .
 .
 <com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 <code>87</code>
 <description>LAN AIRLINES Nacional</description>
 </com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 </airlines>
</com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlinesListResponse>
```

{{< /tab >}}

{{< /tabs >}}

### 2) Crear el Formulario WebCheckout 
 
Este paso consiste en redirigir a tus clientes a la página de pago segura de PayU donde pueden elegir su método de pago preferido y completar la compra. Para hacerlo, simplemente añade el código de aerolínea obtenido en el paso anterior, junto con las tarifas e impuestos aeroportuarios, como campos ocultos dentro de tu formulario de pago.

#### Formulario de Pago para Aerolíneas

Incluye los parámetros específicos para aerolíneas además de los parámetros estándar para el <a href="https://developers.payulatam.com/latam/es/docs/integrations/webcheckout-integration/payment-form.html" target="_blank">formulario de pago</a>.

| Campo | Tipo | Tamaño | Descripción | Ejemplo |
|---|---|---|---|---|
| airline | Alfanumérico | 4 | Código de aerolínea | 29 |
| amount | Número | 10.2 | Monto total de la transacción. Puede contener dos dígitos decimales. | 119000 |
| tax | Número | 10.2 | Valor del IVA de la transacción. En Colombia, si no se especifica el IVA, el sistema aplica automáticamente una tasa del 19%. Este valor puede incluir dos decimales. Si el producto o servicio está exento de IVA, asigna 0 a este valor. | 19000 |
| taxReturnBase | Número | 10.2 | Valor base para calcular el IVA. Si el producto o servicio está exento de IVA, asigna 0. | 100000 |
| additionalValue  | Número | 10.2 | Tarifas aeroportuarias y otros impuestos. | 25000 |

##### Ejemplo del Formulario WebCheckout

A continuación, un ejemplo del formulario WebCheckout:

```HTML
<form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
 <input name="merchantId" type="hidden" value="508029">
 <input name="accountId" type="hidden" value="513128">
 <input name="description" type="hidden" value="Flight 12345">
 <input name="referenceCode" type="hidden" value="PNR-123">
 <input name="airline" type="hidden" value="29" >
 <input name="amount" type="hidden" value="119000">
 <input name="tax" type="hidden" value="19000">
 <input name="taxReturnBase" type="hidden" value="100000">
 <input name="additionalValue" type="hidden" value="25000">
 <input name="currency" type="hidden" value="COP" >
 <input name="algorithmSignature" type="hidden" value="SHA256">
 <input name="signature" type="hidden" value="b94d73892255c4f53af4282e3a5b6551526a922f1fcf1412fafa6bdf8bbe32f0">
 <input name="buyerEmail" type="hidden" value="pruebas@payulatam.com">
 <input name="responseUrl" type="hidden" value="http://www.mysite.com/response-page">
 <input name="confirmationUrl" type="hidden" value="http://www.mysite.com/confirmation-page">
 <input name="test" type="hidden" value="0">
 <input name="Submit" type="submit" value="Send">
</form>
 ```

 #### Formulario de Pago para Agencias de Viajes

Incluye los parámetros específicos para agencias de viajes además de los parámetros estándar para el <a href="https://developers.payulatam.com/latam/es/docs/integrations/webcheckout-integration/payment-form.html" target="_blank">formulario de pago</a>.

| Campo | Tipo | Tamaño | Descripción | Ejemplo |
|---|---|---|---|---|
| airline | Alfanumérico | 4 | Código de aerolínea | 29 |
| amount | Número | 10.2 | Monto total de la transacción. Puede contener dos dígitos decimales. | 119000 |
| tax | Número | 10.2 | Valor del IVA de la transacción. En Colombia, si no se especifica el IVA, el sistema aplica automáticamente una tasa del 19%. Este valor puede incluir dos decimales. Si el producto o servicio está exento de IVA, asigna 0 a este valor. | 19000 |
| taxReturnBase | Número | 10.2 | Valor base para calcular el IVA. Si el producto o servicio está exento de IVA, asigna 0 a esta variable. | 100000 |
| additionalValue | Número | 10.2 | Tarifas aeroportuarias y otros impuestos. | 25000 |
| administrativeFee | Número | 10.2 | Monto de la tarifa administrativa de la agencia de viajes. | 5950 |
| taxAdministrativeFee | Número | 10.2 | Valor del impuesto sobre la tarifa administrativa de la agencia de viajes. | 950 |
| taxAdministrativeFeeReturnBase | Número | 10.2 | Valor base para calcular el impuesto sobre la tarifa administrativa. | 5000 |


##### Ejemplo del Formulario WebCheckout

A continuación, un ejemplo del formulario WebCheckout:

```HTML
<form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
 <input name="merchantId" type="hidden" value="508029">
 <input name="accountId" type="hidden" value="513128">
 <input name="description" type="hidden" value="Flight 12345">
 <input name="referenceCode" type="hidden" value="PNR-123">
 <input name="airline" type="hidden" value="29" >
 <input name="amount" type="hidden" value="119000">
 <input name="tax" type="hidden" value="19000">
 <input name="taxReturnBase" type="hidden" value="100000">
 <input name="additionalValue" type="hidden" value="25000">
 <input name="administrativeFee" type="hidden" value="5950">
 <input name="taxAdministrativeFee" type="hidden" value="950">
 <input name="taxAdministrativeFeeReturnBase" type="hidden" value="5000">
 <input name="currency" type="hidden" value="COP" >
 <input name="algorithmSignature" type="hidden" value="SHA256">
 <input name="signature" type="hidden" value="b94d73892255c4f53af4282e3a5b6551526a922f1fcf1412fafa6bdf8bbe32f0">
 <input name="buyerEmail" type="hidden" value="pruebas@payulatam.com">
 <input name="responseUrl" type="hidden" value="http://www.mysite.com/response-page">
 <input name="confirmationUrl" type="hidden" value="http://www.mysite.com/confirmation-page">
 <input name="test" type="hidden" value="0">
 <input name="Submit" type="submit" value="Send">
</form>
 ```
