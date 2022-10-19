---
title: "Integración SDK"
linkTitle: "Integración SDK"
date: 2017-01-05
description: >
  El SDK (Software Development Kit) de PayU provee una solución simple para integraciones complejas.
weight: 30
tags: ["parenttopic"]
---

De forma similar a cualquier integración API, puedes personalizar tu checkout de acuerdo con las necesidades de tu negocio y el cliente permanece en tu página web durante la compra y el procedimiento de pago. Para integrar esta opción, debes tener una cuenta de PayU empresarial y habilidades de programación avanzadas.

Accede a múltiples métodos de pago (varía por país) incluyendo tarjetas de crédito, transferencias bancarias y pagos en efectivo.

![API integration](/assets/api1-es.png)

## Configuraciones iniciales {#initial-settings}
PayU te permite integrarte con la pasarela de pagos transaccional, las herramientas de pago disponibles y las consultas desarrollando un cliente HTTPS para enviar la información de la transacción a través de SSL. Es muy importante que los datos sensibles de la transacción como el número de la tarjeta de crédito, la fecha de expiración de la misma y demás, no sean almacenados. Recomendamos que sigas las [mejores prácticas de PCI DSS](https://www.pcisecuritystandards.org/documents/PCI_DSS_V2.0_Best_Practices_for_Maintaining_PCI_DSS_Compliance.pdf) (Payment Card Industry Data Security Standard).

### Java
Para integrate con el API, el SDK depende de la librería de Apache `HttpClient` que a su vez depende de las librerías `HttpCore`, `CommonsLoggin` y `CommonsCodec`.

En general, necesitas las siguientes librerías en tu classpath:
* [HttpClient-4.4.1.jar](https://mvnrepository.com/artifact/org.apache.httpcomponents/httpclient/4.4.1)
* [HttpCore-4.4.4.jar](https://mvnrepository.com/artifact/org.apache.httpcomponents/httpcore/4.4.4)
* [Commons-loggin-1.1.1.jar](https://mvnrepository.com/artifact/commons-logging/commons-logging/1.1.1)
* [Commons-codec-1.6.jar](https://mvnrepository.com/artifact/commons-codec/commons-codec/1.6)
* [Commons-lang3-3.5.jar](https://mvnrepository.com/artifact/org.apache.commons/commons-lang3/3.5)

<a href="https://github.com/developers-payu-latam/developers-payu-latam.github.io/raw/master/sdk/java/payu-java-sdk-1.5.0.zip" target="_blank" class="payu-btn-green">Descargar el SDK Java 1.5.0</a>

Antes de realizar cualquier operación con el SDK, necesitas asignar algunos valores a la clase `PayU`, los cuales aplican a todas las operaciones SDK y deben ser configurados con tu información comercial. La siguiente tabla muestra los valores que necesitas configurar.

| Nombre del parámetro | Tamaño | Tipo | Obligatorio | Descripción |
|-|-|-|:-:|-|
| `language` | 2 | Language | Sí | Idioma utilizado para mensajes de error en ell sistema y correos electrónicos enviados entre el comprado y el vendedor. Actualmente se soporta en `en` (inglés), `es` (español) y `pt` (portugués). |
| `isTest` |  | boolean | Sí | Asigna `true` si es una petición de prueba, Si no, asigna `false`. Dependiendo del tipo de transacción u operación, el valor de este campo puede afectar el comportamiento. |
| `apiLogin` | Min:12 Max:32 | String | Sí | Tu API Login. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| `apiKey` | Min:6 Max:32 | String | Sí | Tu API Key. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| `merchantId` |  | String | No | Identificador del comercio, es utilizado para generar las firmas para verificar las transacciones de pago. <br>Este parámetro es obligatorio a menos que envíes la firma. |
| `paymentsUrl` | Min:1 | String | No | URL de lla página a donde vas a enviar las peticiones relacionadas a pagos. Por defecto, este parámetro toma la URL de producción. |
| `reportsUrl` | Min:1 | String | No | URL de lla página a donde vas a enviar las peticiones relacionadas a reportes. Por defecto, este parámetro toma la URL de producción. |

Ejemplo

```JAVA
PayU.apiKey = "xxxxxxxxxxxx"; // Ingresa tu API key aquí
PayU.apiLogin = "xxxxxxxxxxxx"; // Ingresa tu API login aquí
PayU.language = Language.en; // Ingresa aquí el idioma
PayU.isTest = false; // asigna true si estás en modo pruebas
LoggerUtil.setLogLevel(Level.ALL); // inclúyelo solo si quieres ver a traza del log completa. Si no, puedes removerlo.
PayU.paymentsUrl = "https://api.payulatam.com/payments-api/"; // inclúyelo si quieres probar en un servidor de pagos específico y asigna su URL.
PayU.reportsUrl = "https://api.payulatam.com/reports-api/"; // inclúyelo si quieres probar en un servidor de reportes específico y asigna su URL.
```
<br>

Para la ejecución de cada una de las operaciones provistas por el SDK de PayU, debes enviar un Mapa de parámetros al método correspondiente como argumento, este contiene toda la información de la transacción a procesar.

```JAVA
Map<String, String>  parameters = new HashMap <String, String>();
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, transactionId);
parameters.put(PayU.PARAMETERS.ORDER_ID, orderId.toString());
```
<br>

Para facilitar su uso, se proporcionan una serie de constantes en la interfaz `PayU.PARAMETERS` que contienen los nombres de los parámetros utilizados en los métodos del SDK.

{{% alert title="Nota" color="info"%}}
A partir de la versión 1.2.X, es necesario agregar el certificado del API de pagos de PayU (https://api.payulatam.com/payments-api/) en la carpeta de llaves de Java. Esta carpeta se encuentra en _**[Java-Installation-Folder]/jdk/jre/lib/security/cacerts**_.
{{% /alert %}}

### PHP
Para integrarte con el API, el SDK puede ser ejecutado en máquinas con PHP versión igual o superior a 5.2.1. Además, se necesitan las siguientes extensiones PHP en tu servidor:

* curl
* xml
* mbstring
* json

<a href="https://github.com/developers-payu-latam/developers-payu-latam.github.io/raw/master/sdk/php/payu-php-sdk-4.5.7.zip" target="_blank" class="payu-btn-green">Descargar el SDK PHP 4.5.7</a>

Para tener acceso al las funcionalidades de SDK, necesitas incluir la clase `PayU` ubicada en _**[PayU-php-sdk-Path]/lib/PayU.php**_. 

```PHP
<?php
require_once '[PayU-php-sdk-Path]/lib/PayU.php';
...
?>
```
<br>

Antes de realizar cualquier operación con el SDK, necesitas asignar algunos valores a la clase `PayU`, los cuales aplican a todas las operaciones SDK y deben ser configurados con tu información comercial. La siguiente tabla muestra los valores que necesitas configurar.

| Nombre del parámetro | Tamaño | Tipo | Obligatorio | Descripción |
|-|-|-|:-:|-|
| `PayU::$language` | 2 | Language | Sí | Idioma utilizado para mensajes de error en ell sistema y correos electrónicos enviados entre el comprado y el vendedor. Actualmente se soporta en en (inglés), es (español) and pt (portugués). |
| `PayU::$isTest` |  | boolean | Sí | Asigna `true` si es una petición de prueba, Si no, asigna `false`. Dependiendo del tipo de transacción u operación, el valor de este campo puede afectar el comportamiento. |
| `PayU::$apiLogin` | Min:12 Max:32 | String | Sí | Tu API Login. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| `PayU::$apiKey` | Min:6 Max:32 | String | Sí | Tu API Key. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| `PayU::$merchantId` |  | String | No | Identificador del comercio, es utilizado para generar las firmas para verificar las transacciones de pago. <br>Este parámetro es obligatorio a menos que envíes la firma. |

Ejemplo

```PHP
<?php
PayU::$apiKey = "xxxxxxxxxxxx"; // Ingresa tu llave API aquí
PayU::$apiLogin = "xxxxxxxxxxxx"; // Ingresa tu API login aquí
PayU::$merchantId = "1"; // Enter your Merchant Id here
PayU::$language = SupportedLanguages::ES; // Ingresa aquí el idioma
PayU::$isTest = false; // asigna true si estás en modo pruebas
...
?>
```
<br>

Además, necesitas configurar el API para redirigir tus peticiones utilizando la clase `Environment`:

```PHP
<?php
// URL de pagos
Environment::setPaymentsCustomUrl("https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi");
// URL de reportes
Environment::setReportsCustomUrl("https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi");
...
?>
```

## Consideraciones {#considerations}
* Debes tener una cuenta activa de PayU.
* Debes instalar un certificado SSL válido en tu servidor y tu página web debe poder hacer conexiones SSL. Debido a esto, la máquina virtual debe contar con las extensiones de seguridad apropiadas.
T* emporalmente NO utilices certificados de seguridad de curva elíptica o aquellos que cuenten con la suite de cifrado `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA` en tus peticiones de pago.
* Debes tener lenguajes de servidor o CGI tales como Java, C#, VB, PHP, etc.
* Debes estar en capacidad de almacenar de forma segura tus credenciales de autenticación (API Key y API Login).
* Los mensajes deben ser codificados utilizando `UTF-8`.
* Las fechas deben utilizar el formato `yyyy-MM-ddTHH:mm:ss`, el formato de hora es 24 horas. Ejemplo: `2015-08-22T21:35:12`.
* En condiciones normales la conexión garantiza tiempos de respuesta de tres segundos en promedio. Si hay una situación anormal, el tiempo máximo de respuesta será de un minuto. Te recomendamos que configures los _timeouts_ cuando te conectes a PayU.
* Es importante validar la longitud y los números de tarjetas de crédito por franquicia junto con los códigos de seguridad.

 ## Funcionalidades disponibles {#available-features}