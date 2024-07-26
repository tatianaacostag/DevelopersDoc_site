---
title: "Desplegar a Producción"
linkTitle: "Desplegar a Producción"
date: 2021-04-07T08:24:15-05:00
Description: >
  Luego de ejecutar las pruebas de sistema y que hayas verificado que todo funciona como se espera, puedes cambiar al servidor de producción; donde se ejecutan todas las transacciones reales.
weight: 50
---

Para pasar a producción de acuerdo con la integración que utilices, necesitas crear el formulario de pago con ciertos parámetros de tu cuenta apuntado a la URL de producción.

## Pasar a producción utilizando la integración WebCheckout {#step-over-to-production-using-webcheckout-integration}
Incluye los siguientes parámetros en tus formularios de pago:

| Parámetro | Descripción |
|---|---|
| merchantId | ID de tu comercio en PayU Latam. |
| ApiKey | Contraseña entregada por PayU. [¿Cómo obtengo mi API Key?]({{< ref "integrations.html#api-key-and-api-login" >}}). |
| referenceCode | Referencia única de la venta por cada transacción. Tú generas este valor. |
| accountId | ID de la cuenta PayU del país donde quieres vender. |
| description | Descripción de lo que estás vendiendo. |
| amount | Valor total de lo que estás vendiendo. |
| tax | Valor de los impuestos de lo que estás vendiendo. |
| taxReturnBase | Base de retorno de impuestos de lo que estás vendiendo. |
| currency | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). |
| signature | La firma es la forma única de validar los pagos hechos a través de la plataforma para asegurar su autenticidad.<br>Para más información, consulte [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). |
| test | Configura `0` para transacciones procesadas en el ambiente de Producción. |
| buyerEmail | Dirección de correo electrónico del comprador. |

Dirige tus requests a la siguiente URL:

```HTML
https://checkout.payulatam.com/ppp-web-gateway-payu
```

## Pasar a producción utilizando la integración API {#step-over-to-production-using-api-integration}
Incluye los siguientes parámetros en tus formularios de pago:

| Parámetro | Descripción |
|---|---|
| merchantId | ID de tu comercio en PayU Latam. |
| ApiKey | Contraseña entregada por PayU. [¿Cómo obtengo mi API Key?]({{< ref "integrations.html#api-key-and-api-login" >}}). |
| ApiLogin | Usuario o login entregado por PayU. [¿Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| accountId | ID de la cuenta PayU del país donde quieres vender. |
| signature | La firma es la forma única de validar los pagos hechos a través de la plataforma para asegurar su autenticidad.<br>Para más información, consulte [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). |
| test | Configura `false` para transacciones procesadas en el ambiente de Producción. |

Dirige tus requests a las siguiente URLs:

```HTML
Consultas (Queries): https://api.payulatam.com/reports-api/4.0/service.cgi
Pagos (Payments): https://api.payulatam.com/payments-api/4.0/service.cgi
```

## Pasar a producción utilizando la integración SDK {#step-over-to-production-using-sdk-integration}
Incluye los siguientes parámetros en tus formularios de pago:

| Parámetro | Descripción |
|---|---|
| merchantId | ID of your commerce in PayU Latam. |
| ApiKey | Contraseña entregada por PayU. [¿Cómo obtengo mi API Key?]({{< ref "integrations.html#api-key-and-api-login" >}}). |
| ApiLogin | Usuario o login entregado por PayU. [¿Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| accountId | ID de la cuenta PayU del país donde quieres vender. |
| test | Configura `false` para transacciones procesadas en el ambiente de Producción. |

Dirige tus requests a las siguientes URLs:

{{< tabs tabTotal="2" tabID="1" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
PayU.paymentsUrl = “https://api.payulatam.com/payments-api/”;
PayU.reportsUrl = “https://api.payulatam.com/reports-api/”;
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
Environment::setPaymentsCustomUrl(“https://api.payulatam.com/payments-api/4.0/service.cgi”);
Environment::setReportsCustomUrl(“https://api.payulatam.com/reports-api/4.0/service.cgi”);
```
{{< /tab >}}
{{< /tabs >}}
