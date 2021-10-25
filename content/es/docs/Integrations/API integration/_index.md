---
title: "Integración API"
linkTitle: "Integración API"
date: 2021-25-03
description: >
  La integración API de PayU le permite a tu negocio procesar transacciones desde diferentes tipos de aplicaciones (web, mobile, IVR, etc).
weight: 20
tags: ["parenttopic"]
---

Puedes contactar tu tienda en línea a la plataforma de PayU y el proceso de checkout será manejado en tu página web. Para integrar esta opción, debes tener una cuenta de PayU empresarial y habilidades de programación avanzadas.

Accede a múltiples medios de pago (varía por país) incluyendo tarjetas de crédito, transferencias bancarias y pagos en efectivo.

![API integration](/assets/api1-es.png)

## Configuraciones iniciales {#initial-settings}
PayU te permite integrarte con la pasarela de pagos transaccional, las herramientas de pago disponibles y las consultas desarrollando un cliente HTTPS para enviar la información de la transacción a través de SSL. Es muy importante que los datos sensibles de la transacción como el número de la tarjeta de crédito, la fecha de expiración de la misma y demás, no sean almacenados. Recomendamos que sigas las [mejores prácticas de PCI DSS](https://www.pcisecuritystandards.org/documents/PCI_DSS_V2.0_Best_Practices_for_Maintaining_PCI_DSS_Compliance.pdf) (Payment Card Industry Data Security Standard).  

la transmisión de las transacciones se asegurada a través de una conexión TLS (Transport Layer Security) de 256 bits desde el servidor de tu tienda hasta nuestra pasarela de pagos. El intercambio de mensajes se hace a través de cadenas JSON o XML y las operaciones se distinguen por un comando que se incluye en la petición. Observa los siguientes ejemplos JSON y XML:  

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>
POST /payments-api/4.0/service.cgi HTTP/1.1<br>
Host: sandbox.api.payulatam.com<br>
Content-Type: application/json; charset=utf-8<br>
Accept: application/json<br>
Content-Length: length

```JSON
{
   "test": false,
   "language": "es",
   "command": "GET_PAYMENT_METHODS",
   "merchant": {
      "apiLogin": "xxxxxxxxxxxxx",
      "apiKey": "xxxxxxxxxxxxx"
   }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>
POST /payments-api/4.0/service.cgi HTTP/1.1<br>
Host: sandbox.api.payulatam.com<br>
Content-Type: application/json; charset=utf-8<br>
Accept: application/xml<br>
Content-Length: length<br>

```XML
<request>
   <language>es</language>
   <command>GET_PAYMENT_METHODS</command>
   <merchant>
      <apiLogin>xxxxxxxxxxxxx</apiLogin>
      <apiKey>xxxxxxxxxxxxx</apiKey>
   </merchant>
   <isTest>false</isTest>
</request>
```

{{< /tab >}}
{{< /tabs >}}
<br>

Puedes definir en lenguaje que deseas utilizar en la petición a través de las cabeceras HTTP `Content-type` y `Accept`. Puedes utilizar todas las combinaciones posibles:

| CONTENT-TYPE       | ACCEPT             |
|--------------------|--------------------|
| `application/xml`  | `application/xml`  |
| `application/json` | `application/json` |
| `application/xml`  | `application/json` |
| `application/json` | `application/xml`  |

## Consideraciones {#considerations}
* Debes tener una cuenta activa de PayU.
* Debes instalar un certificado SSL válido en tu servidor y tu página web debe poder hacer conexiones SSL. Debido a esto, la máquina virtual debe contar con las extensiones de seguridad apropiadas.
* Temporalmente NO utilices certificados de seguridad de curva elíptica o aquellos que cuenten con la suite de cifrado `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA` en tus peticiones de pago.
* Debes tener lenguajes de servidor o CGI tales como Java, C#, VB, PHP, etc.
* Debes estar en capacidad de almacenar de forma segura tus credenciales de autenticación (API Key y API Login).
* Los mensajes deben ser codificados utilizando `UTF-8`.
* Las fechas deben utilizar el formato `yyyy-MM-ddTHH:mm:ss`, el formato de hora es 24 horas. Ejemplo: `2015-08-22T21:35:12`.
* En condiciones normales la conexión garantiza tiempos de respuesta de tres segundos en promedio. Si hay una situación anormal, el tiempo máximo de respuesta será de un minuto. Te recomendamos que configures los _timeouts_ cuando te conectes a PayU.
* Es importante validar la longitud y los números de tarjetas de crédito por franquicia junto con los códigos de seguridad.

## Funcionalidades disponibles {#available-features}
