---
title: "API de Tokenización"
linkTitle: "API de Tokenización"
date: 2021-06-24T10:31:30-05:00
description: >
  La API de Tokenización te permite almacenar de forma segura los datos de las tarjetas de crédito de tus clientes mediante la generación de un token. Este token te permite procesar pagos recurrentes o implementar la funcionalidad de pago en un clic (1-Click) cumpliendo con los requisitos del estándar PCI DSS (Payment Card Industry Data Security Standard) para el manejo de información de tarjetas de crédito.
weight: 40
tags: ["subtopic"]
---

La funcionalidad de tokenización está disponible bajo acuerdos comerciales personalizados. Para más información, contacta a tu representante de ventas.

{{% alert title="Nota" color="info"%}}

Para integrarte con la API de Tokenización, envía tus solicitudes a las siguientes URL según tu entorno:

* Pruebas: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Producción: ```https://api.payulatam.com/payments-api/4.0/service.cgi```

{{% /alert %}}

## Métodos Disponibles {#available-methods}

La API de Tokenización incluye métodos para registrar y eliminar tokens, consultarlos y procesar pagos utilizando tarjetas de crédito tokenizadas.

* [Registro Individual de Tarjeta de Crédito]({{< ref "Tokenization-API.md#individual-credit-card-registration" >}})
* [Registro Masivo de Tarjetas de Crédito]({{< ref "Tokenization-API.md#massive-credit-card-registration" >}})
* [Eliminación Individual de Token]({{< ref "Tokenization-API.md#individual-token-removal" >}})
* [Eliminación Masiva de Tokens]({{< ref "Tokenization-API.md#massive-token-removal" >}})
* [Consulta de Tokens]({{< ref "Tokenization-API.md#query-tokens" >}})
* [Pagos Utilizando Tokenización]({{< ref "Tokenization-API.md#payments-using-tokenization" >}})

## Registro Individual de Tarjeta de Crédito {#individual-credit-card-registration}

Esta función te permite registrar la información de la tarjeta de crédito de un cliente y generar un token. 

### Parámetros para la Solicitud y la Respuesta {#parameters-for-request-and-response}

<details>

<summary>Solicitud</summary>

<br>

<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la solicitud. Esto determina el idioma de los mensajes de error. [Consulta los idiomas admitidos]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Máx:32 | Debe establecerse en `CREATE_TOKEN`. | Sí |
| merchant | Objeto |  | Objeto que contiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | PayU proporciona este nombre de usuario o login. [¿Cómo obtengo mi API Login?]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | PayU proporciona esta contraseña. [¿Cómo obtengo mi API Key?]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| creditCardToken | Objeto |  | Objeto que contiene los detalles de la tarjeta de crédito para la tokenización. | Sí |
| creditCardToken > payerId | Alfanumérico | | ID interno del titular de la tarjeta de crédito. | Sí |
| creditCardToken > name | Alfanumérico | Mín:1 Máx:255 | Nombre del titular de la tarjeta tal como aparece en la tarjeta. | Sí |
| creditCardToken > identificationNumber | Alfanumérico | Máx:20 | Número de identificación del titular de la tarjeta. | Sí |
| creditCardToken > paymentMethod | Alfanumérico | 32 | Método de pago válido para tarjeta de crédito. [Consulta los métodos de pago disponibles]({{< ref "select-your-payment-method.html" >}}). | Sí |
| creditCardToken > number | Alfanumérico | Mín:13 Máx:20 | Número de la tarjeta de crédito. | Sí |
| creditCardToken > expirationDate | Alfanumérico | 7 | Fecha de vencimiento en formato `YYYY/MM`. | Sí |

</details>

<details>

<summary>Respuesta</summary>

<br>

<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Respuesta de la transacción: `ERROR` o `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | Mensaje de error retornado cuando el código de la transacción es `ERROR`. |
| creditCardToken | Objeto |  | Objeto que contiene los detalles de la tarjeta de crédito tokenizada. |
| creditCardToken > creditCardTokenId | Alfanumérico | | Token generado a partir de los datos de la tarjeta de crédito. |
| creditCardToken > name | Alfanumérico | Mín:1 Máx:255 | Nombre del titular de la tarjeta como se envió en la solicitud. |
| creditCardToken > payerId | Alfanumérico | | ID interno del titular de la tarjeta como se envió en la solicitud. |
| creditCardToken > identificationNumber | Alfanumérico | Máx:20 | Número de identificación del titular de la tarjeta como se envió en la solicitud. |
| creditCardToken > paymentMethod | Alfanumérico | 32 | Franquicia de la tarjeta de crédito tokenizada como se envió en la solicitud. |
| creditCardToken > maskedNumber | Alfanumérico | Mín:13 Máx:20 | Número de tarjeta de crédito enmascarado que muestra los primeros seis y los últimos cuatro dígitos. |

</details>

### Llamado a la API {#api-call}

Los siguientes ejemplos muestran los cuerpos de solicitud y respuesta.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Ejemplo de una Solicitud:**

```JSON
{
   "language": "es",
   "command": "CREATE_TOKEN",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "creditCardToken": {
      "payerId": "10",
      "name": "APPROVED",
      "identificationNumber": "32144457",
      "paymentMethod": "VISA",
      "number": "4037997623271984",
      "expirationDate": "2025/01"
   }
}
```

<br>

**Ejemplo de una Respuesta:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "creditCardToken": {
        "creditCardTokenId": "05440005-9111-4d34-aa86-deeb91983d54",
        "name": "APPROVED",
        "payerId": "10",
        "identificationNumber": "32144457",
        "paymentMethod": "VISA",
        "number": null,
        "expirationDate": null,
        "creationDate": null,
        "maskedNumber": "403799******1984",
        "errorDescription": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Ejemplo de una Solicitud:**

```XML
<request>
   <language>es</language>
   <command>CREATE_TOKEN</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <creditCardToken>
      <payerId>10</payerId>
      <name>APPROVED</name>
      <identificationNumber>32144457</identificationNumber>
      <paymentMethod>VISA</paymentMethod>
      <number>4916332769997505</number>
      <expirationDate>2024/01</expirationDate>
   </creditCardToken>
</request>
```

<br>

**Ejemplo de una Respuesta:**

```XML
<creditCardTokenResponse>
    <code>SUCCESS</code>
    <creditCardToken>
        <creditCardTokenId>46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3</creditCardTokenId>
        <name>APPROVED</name>
        <payerId>10</payerId>
        <identificationNumber>32144457</identificationNumber>
        <paymentMethod>VISA</paymentMethod>
        <maskedNumber>491633******7505</maskedNumber>
    </creditCardToken>
</creditCardTokenResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Registro Masivo de Tarjetas de Crédito {#massive-credit-card-registration} 

Esta función permite registrar múltiples tarjetas de crédito almacenadas en un archivo .csv y generar un token para cada tarjeta. 

### Consideraciones

* Cada registro en el archivo debe seguir la estructura y el orden especificados, con los campos separados por comas:
    - ID del pagador
    - Nombre completo
    - Número de tarjeta de crédito
    - Fecha de expiración
    - Franquicia
    - Número de identificación
* El archivo no debe contener una cabecera.
* El archivo debe estar codificado en UTF-8. Debes implementar una función para codificar el contenido y enviar la cadena codificada en el parámetro `contentFile`.
* El archivo no puede contener más de 10.000 registros.

<br>

**Ejemplo:**

![PrintScreen](/assets/massiveTokenization.jpeg) 

### Parámetros para la Solicitud y la Respuesta {#parameters-for-request-and-response-1}

<details>

<summary>Solicitud</summary>

<br>

<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la solicitud. Esto determina el idioma de los mensajes de error. [Consulta los idiomas admitidos]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Máx:32 | Debe establecerse en `CREATE_BATCH_TOKENS`. | Sí |
| merchant | Objeto |  | Objeto que contiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | PayU proporciona este nombre de usuario o login. [¿Cómo obtengo mi API Login?]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | PayU proporciona esta contraseña. [¿Cómo obtengo mi API Key?]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| contentFile | Alfanumérico |  | Cadena en Base64 que contiene la información de las tarjetas de crédito según lo descrito anteriormente. | Sí |

</details>

<details>

<summary>Respuesta</summary>

<br>

<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Respuesta de la transacción: `ERROR` o `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | Mensaje de error retornado cuando el código de la transacción es `ERROR`. |
| id | Alfanumérico |  | Identificador del proceso. |

</details>

### Llamado a la API {#api-call-1}

Los siguientes ejemplos muestran los cuerpos de solicitud y respuesta.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Ejemplo de una Solicitud:**

```JSON
{
   "language": "es",
   "command": "CREATE_BATCH_TOKENS",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "contentFile": "MDAxLE1hcnkgS2VsbGVyLDQwMjQwMDcxMzU0MTI2ODAsMjAyNC8wMSxWSVNBLDEyMzQ1NgowMDIsTWFyayBCcm93biw1MTA0ODQyNTA1ODE2MTcwLDIwMjMvMDUsTUFTVEVSQ0FSRCw3ODkwMTI="
}
```

<br>

**Ejemplo de una Respuesta:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "id": "b721abbc-a9cf-44c6-99ba-91393de2b5d6"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Ejemplo de una Solicitud:**

```XML
<request>
   <language>es</language>
   <command>CREATE_BATCH_TOKENS</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <contentFile>MDAxLE1hcnkgS2VsbGVyLDQwMjQwMDcxMzU0MTI2ODAsMjAyNC8wMSxWSVNBLDEyMzQ1NgowMDIsTWFyayBCcm93biw1MTA0ODQyNTA1ODE2MTcwLDIwMjMvMDUsTUFTVEVSQ0FSRCw3ODkwMTI=</contentFile>
</request>
```

<br>

**Ejemplo de una Respuesta:**

```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>b721abbc-a9cf-44c6-99ba-91393de2b5d6</id>
</creditCardTokenBatchResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Eliminación Individual de Token {#individual-token-removal}

Esta función permite eliminar un token registrado previamente.

### Parámetros para la Solicitud y la Respuesta {#parameters-for-request-and-response-2}

<details>

<summary>Solicitud</summary>

<br>

<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la solicitud. Esto determina el idioma de los mensajes de error. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Máx:32 | Debe establecerse en `REMOVE_TOKEN`. | Sí |
| merchant | Objeto |  | Objeto que contiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | PayU proporciona este nombre de usuario o login. [¿Cómo obtengo mi API Login?]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | PayU proporciona esta contraseña. [¿Cómo obtengo mi API Key?]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| removeCreditCardToken | Objeto |  | Información del token a eliminar. | Sí |
| removeCreditCardToken > payerId | Alfanumérico | | ID interno del titular de la tarjeta, enviado en la solicitud. | Sí |
| removeCreditCardToken > creditCardTokenId | Alfanumérico | | ID del token de la tarjeta de crédito a eliminar. | Sí |

</details>

<details>

<summary>Respuesta</summary>

<br>

<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Respuesta de la transacción: `ERROR` o `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | Mensaje de error retornado cuando el código de la transacción es `ERROR`. |
| creditCardToken | Objeto |  | Detalles del token eliminado. |
| creditCardToken > creditCardTokenId | Alfanumérico | | ID del token de la tarjeta de crédito, enviado en la solicitud. |
| creditCardToken > name | Alfanumérico | Mín:1 Máx:255 | Nombre del titular de la tarjeta, enviado en la solicitud. |
| creditCardToken > payerId | Alfanumérico | | ID interno del titular de la tarjeta como se envió en la solicitud. |
| creditCardToken > identificationNumber | Alfanumérico | Máx:20 | Número de identificación del titular de la tarjeta como se envió en la solicitud. |
| creditCardToken > paymentMethod | Alfanumérico | 32 | Franquicia de la tarjeta de crédito tokenizada como se envió en la solicitud. |
| creditCardToken > maskedNumber | Alfanumérico | Mín:13 Máx:20 | Número de tarjeta de crédito enmascarado, mostrando los primeros seis y los últimos cuatro dígitos. |

</details>

### Llamado a la API {#api-call-2}

Los siguientes ejemplos muestran los cuerpos de solicitud y respuesta.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Ejemplo de una Solicitud:**

```JSON
{
   "language": "es",
   "command": "REMOVE_TOKEN",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "removeCreditCardToken": {
      "payerId": "10",
      "creditCardTokenId": "46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3"
   }
}
```

<br>

**Ejemplo de una Respuesta:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "creditCardToken": {
        "creditCardTokenId": "46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3",
        "name": "APPROVED",
        "payerId": "10",
        "identificationNumber": "32144457",
        "paymentMethod": "VISA",
        "number": null,
        "expirationDate": null,
        "creationDate": null,
        "maskedNumber": "491633******7505",
        "errorDescription": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Ejemplo de una Solicitud:**

```XML
<request>
   <language>es</language>
   <command>REMOVE_TOKEN</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <removeCreditCardToken>
      <payerId>10</payerId>
      <creditCardTokenId>46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3</creditCardTokenId>4
   </removeCreditCardToken>
</request>
```

<br>

**Ejemplo de una Respuesta:**

```XML
<creditCardTokenResponse>
    <code>SUCCESS</code>
    <creditCardToken>
        <creditCardTokenId>46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3</creditCardTokenId>
        <name>APPROVED</name>
        <payerId>10</payerId>
        <identificationNumber>32144457</identificationNumber>
        <paymentMethod>VISA</paymentMethod>
        <maskedNumber>491633******7505</maskedNumber>
    </creditCardToken>
</creditCardTokenResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Eliminación Masiva de Tokens {#massive-token-removal}

Esta función permite eliminar tokens almacenados en un archivo .csv. 

### Consideraciones

* Cada registro en el archivo debe seguir esta estructura y orden, separados por comas:
    - ID del Pagador
    - Token
* El archivo no debe tener un encabezado.
* El archivo debe estar codificado en UTF-8. Es necesario implementar una funcionalidad para codificar el contenido y enviar la cadena codificada en el parámetro `contentFile`.
* El archivo no puede contener más de 10.000 registros.

<br>

**Ejemplo:**

![PrintScreen](/assets/massiveDeletion.png)

### Parámetros para la Solicitud y la Respuesta {#parameters-for-request-and-response-3}

<details>

<summary>Solicitud</summary>

<br>

<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la solicitud. Esto determina el idioma de los mensajes de error. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Máx:32 | Debe establecerse en `REMOVE_BATCH_TOKENS`. | Sí |
| merchant | Objeto |  | Objeto que contiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | PayU proporciona este nombre de usuario o login. [¿Cómo obtengo mi API Login?]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | PayU proporciona esta contraseña. [¿Cómo obtengo mi API Key?]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| contentFile | Alfanumérico |  | Cadena codificada en Base64 que contiene los tokens a eliminar. | Sí |

</details>

<details>

<summary>Respuesta</summary>

<br>

<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Respuesta de la transacción: `ERROR` o `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | Mensaje de error retornado cuando el código de la transacción es `ERROR`. |
| id | Alfanumérico |  | Identificador del proceso. |

</details>

### Llamado a la API {#api-call-3}

Los siguientes ejemplos muestran los cuerpos de solicitud y respuesta.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Ejemplo de una Solicitud:**

```JSON
{
   "language": "es",
   "command": "REMOVE_BATCH_TOKENS",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "contentFile": "UGF5ZXJJZDEsYWQ4NGQ2NzEtYjZiOC00YjEyLWFkNTktZmYxZDJhNjQ0M2NhDQpQYXllcklkMiw0ZGYxNjMwYy03MDkyLTRhNjgtODE3MC0yYzI2YzZjOTUyMDg="
}
```

<br>

**Ejemplo de una Respuesta:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "id": "2562625d-9e4c-450a-b979-031feb033952"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Ejemplo de una Solicitud:**

```XML
<request>
   <language>es</language>
   <command>REMOVE_BATCH_TOKENS</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <contentFile>UGF5ZXJJZDEsYWQ4NGQ2NzEtYjZiOC00YjEyLWFkNTktZmYxZDJhNjQ0M2NhDQpQYXllcklkMiw0ZGYxNjMwYy03MDkyLTRhNjgtODE3MC0yYzI2YzZjOTUyMDg=</contentFile>
</request>
```

<br>

**Ejemplo de una Respuesta:**

```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>2562625d-9e4c-450a-b979-031feb033952</id>
</creditCardTokenBatchResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Consulta de Tokens {#query-tokens}

Con esta función, puedes obtener información sobre tarjetas de crédito tokenizadas. Puedes realizar consultas utilizando:

* **ID del Token:** Recupera los detalles de una tarjeta de crédito tokenizada específica.
* **ID del Pagador:** Recupera todas las tarjetas de crédito tokenizadas asociadas a un pagador.
* **Rango de fechas:** Recupera todas las tarjetas de crédito tokenizadas creadas dentro de un período específico.
 
### Parámetros para la Solicitud y la Respuesta {#parameters-for-request-and-response-4}

<details>

<summary>Solicitud</summary>

<br>

<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la solicitud. Esto determina el idioma de los mensajes de error. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Máx:32 | Debe establecerse en `GET_TOKENS`. | Sí |
| merchant | Objeto |  | Objeto que contiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | PayU proporciona este nombre de usuario o login. [¿Cómo obtengo mi API Login?]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | PayU proporciona esta contraseña. [¿Cómo obtengo mi API Key?]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| creditCardTokenInformation | Objeto |  | Parámetros de la consulta. | Sí |
| creditCardTokenInformation > creditCardTokenId | Alfanumérico | | ID del token de la tarjeta de crédito a recuperar. **Obligatorio al consultar por ID del Token.** | No |
| creditCardTokenInformation > payerId | Alfanumérico | | Identificador único del pagador. **Obligatorio al consultar por ID del Pagador.** | No |
| creditCardTokenInformation > startDate | Alfanumérico | 23 | Fecha de inicio para consultas por rango de fechas. **Obligatorio al consultar por rango de fechas.** Formato: `YYYY-MM-DDTHH:MM:SS`, por ejemplo, `2021-06-12T16:07:11`. | No |
| creditCardTokenInformation > endDate | Alfanumérico | 23 | Fecha de finalización para consultas por rango de fechas. **Obligatorio al consultar por rango de fechas.** Formato: `YYYY-MM-DDTHH:MM:SS`, por ejemplo, `2021-06-12T16:07:11`. | No |

</details>

<details>

<summary>Respuesta</summary>

<br>

<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Respuesta de la transacción: `ERROR` o `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | Mensaje de error retornado cuando el código de la transacción es `ERROR`. |
| creditCardTokenList | Objeto |  | Lista de tarjetas de crédito tokenizadas que coinciden con la consulta. |
| creditCardTokenList > creditCardTokenId | Alfanumérico | | Token generado para la tarjeta de crédito. |
| creditCardTokenList > name | Alfanumérico | Mín:1 Máx:255 | Nombre del titular de la tarjeta según lo proporcionado en la solicitud. |
| creditCardTokenList > payerId | Alfanumérico | | Identificador único del pagador. |
| creditCardTokenList > identificationNumber | Alfanumérico | Máx:20 | Número de identificación del titular de la tarjeta de crédito. |
| creditCardTokenList > paymentMethod | Alfanumérico | 32 | Franquicia de la tarjeta de crédito (por ejemplo, VISA, AMEX, MASTERCARD). |
| creditCardTokenList > creationDate | Alfanumérico | 19 | Fecha en la que se tokenizó la tarjeta de crédito. |
| creditCardTokenList > maskedNumber | Alfanumérico | Mín:13 Máx:20 | Número de tarjeta de crédito enmascarado, mostrando los primeros seis y los últimos cuatro dígitos. |

</details>

### Llamado a la API {#api-call-4}

Los siguientes ejemplos muestran los cuerpos de solicitud y respuesta.

#### Consulta por ID de Token

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Ejemplo de Solicitud:**

```JSON
{
    "language": "es",
    "command": "GET_TOKENS",
    "merchant": {
        "apiLogin": "pRRXKOl8ikMmt9u",
        "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
    },
    "creditCardTokenInformation": {
        "creditCardTokenId": "ad29f82a-31eb-43e9-8768-081c5f4cbaf0"
    }
}
```

<br>

**Ejemplo de Respuesta:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "creditCardTokenList": [
        {
            "creditCardTokenId": "ad29f82a-31eb-43e9-8768-081c5f4cbaf0",
            "name": "APPROVED",
            "payerId": "Merchant_Payer_ID_644",
            "identificationNumber": "298928707",
            "paymentMethod": "AMEX",
            "creationDate": "2025-03-14T11:10:13",
            "maskedNumber": "377813*****0001"
        }
    ]
}
```

<br>

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Ejemplo de Solicitud:**

```XML
<request>
    <language>es</language>
    <command>GET_TOKENS</command>
    <merchant>
        <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <creditCardTokenInformation>
        <creditCardTokenId>ad29f82a-31eb-43e9-8768-081c5f4cbaf0</creditCardTokenId>
    </creditCardTokenInformation>
</request>
```
<br>

**Ejemplo de Respuesta:**

```XML
<response>
    <code>SUCCESS</code>
    <error></error>
    <creditCardTokenList>
        <creditCardToken>
            <creditCardTokenId>ad29f82a-31eb-43e9-8768-081c5f4cbaf0</creditCardTokenId>
            <name>APPROVED</name>
            <payerId>Merchant_Payer_ID_644</payerId>
            <identificationNumber>298928707</identificationNumber>
            <paymentMethod>AMEX</paymentMethod>
            <creationDate>2025-03-14T11:10:13</creationDate>
            <maskedNumber>377813*****0001</maskedNumber>
        </creditCardToken>
    </creditCardTokenList>
</response>
```

{{< /tab >}}

{{< /tabs >}}

#### Consulta por ID de Pagador

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Ejemplo de Solicitud:**

```JSON
{
    "language": "es",
    "command": "GET_TOKENS",
    "merchant": {
        "apiLogin": "pRRXKOl8ikMmt9u",
        "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
    },
    "creditCardTokenInformation": {
        "payerId": "Merchant_Payer_ID_644"
    }
}
```

<br>

**Ejemplo de Respuesta:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "creditCardTokenList": [
        {
            "creditCardTokenId": "ad29f82a-31eb-43e9-8768-081c5f4cbaf0",
            "name": "APPROVED",
            "payerId": "Merchant_Payer_ID_644",
            "identificationNumber": "298928707",
            "paymentMethod": "AMEX",
            "creationDate": "2025-03-14T11:10:13",
            "maskedNumber": "377813*****0001"
        },
        {
            "creditCardTokenId": "e84d9ea2-e9df-44c3-98e4-5970e346ac11",
            "name": "APPROVED",
            "payerId": "Merchant_Payer_ID_644",
            "identificationNumber": "3401859948",
            "paymentMethod": "MASTERCARD",
            "creationDate": "2025-03-14T11:24:27",
            "maskedNumber": "547130******0003"
        }
    ]
}
```

<br>

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Ejemplo de Solicitud:**

```XML
<request>
    <language>es</language>
    <command>GET_TOKENS</command>
    <merchant>
        <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <creditCardTokenInformation>
        <payerId>Merchant_Payer_ID_644</payerId>
    </creditCardTokenInformation>
</request>
```
<br>

**Ejemplo de Respuesta:**

```XML
<response>
    <code>SUCCESS</code>
    <error/>
    <creditCardTokenList>
        <creditCardToken>
            <creditCardTokenId>ad29f82a-31eb-43e9-8768-081c5f4cbaf0</creditCardTokenId>
            <name>APPROVED</name>
            <payerId>Merchant_Payer_ID_644</payerId>
            <identificationNumber>298928707</identificationNumber>
            <paymentMethod>AMEX</paymentMethod>
            <creationDate>2025-03-14T11:10:13</creationDate>
            <maskedNumber>377813*****0001</maskedNumber>
        </creditCardToken>
        <creditCardToken>
            <creditCardTokenId>e84d9ea2-e9df-44c3-98e4-5970e346ac11</creditCardTokenId>
            <name>APPROVED</name>
            <payerId>Merchant_Payer_ID_644</payerId>
            <identificationNumber>3401859948</identificationNumber>
            <paymentMethod>MASTERCARD</paymentMethod>
            <creationDate>2025-03-14T11:24:27</creationDate>
            <maskedNumber>547130******0003</maskedNumber>
        </creditCardToken>
    </creditCardTokenList>
</response>
```

{{< /tab >}}

{{< /tabs >}}

#### Consulta por Rango de Fechas

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Ejemplo de una Solicitud:**

```JSON
{
   "language": "es",
   "command": "GET_TOKENS",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "creditCardTokenInformation": {
      "startDate": "2021-06-23T12:00:00",
      "endDate": "2021-06-25T12:00:00"
   }
}
```

<br>

**Ejemplo de una Respuesta:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "creditCardTokenList": [
        {
            "creditCardTokenId": "1adc6940-ee7e-48c2-bb96-7d784de74964",
            "name": "APPROVED",
            "payerId": "20263841",
            "identificationNumber": null,
            "paymentMethod": "AMEX",
            "number": null,
            "expirationDate": null,
            "creationDate": "2021-06-23T13:36:36",
            "maskedNumber": "377813*****0001",
            "errorDescription": null
        },
        {
            "creditCardTokenId": "3e5f0d77-0f93-421f-9432-99b6430e845e",
            "name": "Juan Perez",
            "payerId": "158301",
            "identificationNumber": null,
            "paymentMethod": "VISA",
            "number": null,
            "expirationDate": null,
            "creationDate": "2021-06-23T19:03:41",
            "maskedNumber": "424242******4242",
            "errorDescription": null
        },
        {
            "creditCardTokenId": "ead0a090-18dc-41ad-9431-ab342af854a2",
            "name": "LadyM",
            "payerId": "0sS01",
            "identificationNumber": "1234567890",
            "paymentMethod": "AMEX",
            "number": null,
            "expirationDate": null,
            "creationDate": "2021-06-24T11:48:21",
            "maskedNumber": "377813*****0001",
            "errorDescription": null
        }
    ]
}
```
<br>

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Ejemplo de una Solicitud:**

```XML
<request>
   <language>es</language>
   <command>GET_TOKENS</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <creditCardTokenInformation>
      <startDate>2021-06-23T12:00:00</startDate>
      <endDate>2021-06-25T12:00:00</endDate>
   </creditCardTokenInformation>
</request>
```

<br>

**Ejemplo de una Respuesta:**

```XML
<creditCardTokenListResponse>
    <code>SUCCESS</code>
    <creditCardTokenList>
        <creditCardToken>
            <creditCardTokenId>1adc6940-ee7e-48c2-bb96-7d784de74964</creditCardTokenId>
            <name>APPROVED</name>
            <payerId>20263841</payerId>
            <paymentMethod>AMEX</paymentMethod>
            <creationDate>2021-06-23T13:36:36</creationDate>
            <maskedNumber>377813*****0001</maskedNumber>
        </creditCardToken>
        <creditCardToken>
            <creditCardTokenId>3e5f0d77-0f93-421f-9432-99b6430e845e</creditCardTokenId>
            <name>Juan Perez</name>
            <payerId>158301</payerId>
            <paymentMethod>VISA</paymentMethod>
            <creationDate>2021-06-23T19:03:41</creationDate>
            <maskedNumber>424242******4242</maskedNumber>
        </creditCardToken>
        <creditCardToken>
            <creditCardTokenId>ead0a090-18dc-41ad-9431-ab342af854a2</creditCardTokenId>
            <name>LadyM</name>
            <payerId>0sS01</payerId>
            <identificationNumber>1234567890</identificationNumber>
            <paymentMethod>AMEX</paymentMethod>
            <creationDate>2021-06-24T11:48:21</creationDate>
            <maskedNumber>377813*****0001</maskedNumber>
        </creditCardToken>
    </creditCardTokenList>
</creditCardTokenListResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Pagos Utilizando Tokenización {#payments-using-tokenization}

Para procesar pagos utilizando tokens de tarjetas de crédito, incluya el parámetro `transaction.creditCardTokenId` en lugar de los datos completos de la tarjeta de crédito. Los siguientes ejemplos proporcionan una visión general de alto nivel de una solicitud de pago en un solo paso.

{{% alert title="Nota" color="info"%}}

Para procesar pagos sin un CVV, establezca el parámetro `creditCard.processWithoutCvv2` en `true` en la solicitud de pago y omita el parámetro `creditCard.securityCode`.<br>
De forma predeterminada, el procesamiento de pagos sin CVV está deshabilitado. Para habilitar esta función, comuníquese con su representante de ventas.

{{% /alert%}}

### Llamado a la API {#api-call-5}

Los ejemplos a continuación muestran los cuerpos de la solicitud.

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Ejemplo de una Solicitud:**

```JSON
{
   "language": "es",
   "command": "SUBMIT_TRANSACTION",
   "merchant": {
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
      "apiLogin": "pRRXKOl8ikMmt9u"
   },
   "transaction": {
      "order": {
         "Order information":""
      },
      "payer": {
         "Payer information":""
      },
      "creditCardTokenId": "46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3",
      "creditCard": {
         "securityCode": "123"
      },
      "extraParameters": {
         "Additional request parameters":""
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "Card franchise", 
      "paymentCountry": "Processing country",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": true
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Ejemplo de una Solicitud:**

```XML
<request>
   <language>es</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <!-- Información de la orden -->
      </order>
      <payer>
         <!-- Información del pagador -->
      </payer>
      <creditCardTokenId>46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3</creditCardTokenId>
      <creditCard>
         <securityCode>321</securityCode>
      </creditCard>
      <extraParameters>
         <!-- Parámetros adicionales de la solicitud -->
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>{Card franchise}</paymentMethod>
      <paymentCountry>{Processing country}</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>
```

{{< /tab >}}

{{< /tabs >}}

<br>

Para obtener información detallada sobre el procesamiento de pagos, consulte la documentación correspondiente según el país de procesamiento.

<div style="display: flex; justify-content: space-between; max-width: 600px;">
  <div style="width: 45%;">
      <p><img src="/assets/Argentina.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Argentina.md" >}}">Argentina</a></p>
      <p><img src="/assets/Brasil.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Brazil.md" >}}">Brasil</a></p>
      <p><img src="/assets/Chile.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Chile.md" >}}">Chile</a></p>
      <p><img src="/assets/Colombia.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Colombia.md" >}}">Colombia</a></p>
  </div>
  <div style="width: 45%;">
      <p><img src="/assets/Mexico.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Mexico.md" >}}">México</a></p>
      <p><img src="/assets/Panama.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Panama.md" >}}">Panamá</a></p>
      <p><img src="/assets/Peru.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Peru.md" >}}">Perú</a></p>
  </div>
</div>

<br>

### Pagos Múltiples con Tokenización {#multiple-payments-with-tokenization}

Esta función permite procesar múltiples pagos utilizando tokens almacenados desde un archivo .csv. 

### Consideraciones

* Cada registro en el archivo debe seguir la estructura y el orden especificados, con valores separados por comas:
    - ID de Cuenta – El identificador de tu cuenta en PayU.
    - Token de Tarjeta de Crédito
    - Código de Seguridad de la Tarjeta de Crédito
    - Número de Cuotas
    - Referencia de Venta
    - Descripción de la Venta
    - Correo Electrónico del Comprador
    - Código ISO de la Moneda – [Consulta las monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}).
    - Monto Total (incluidos impuestos)
    - Valor Base para Reembolso
    - Valor Adicional
    - Idioma del Correo Electrónico – Idioma utilizado en los correos enviados al comprador y al vendedor. [Consulta los idiomas compatibles]({{< ref "response-codes-and-variables.html#supported-languages" >}}).
* El archivo no debe incluir un encabezado.
* El archivo debe estar codificado en UTF-8. Debes implementar una funcionalidad para codificar el contenido y enviar la cadena codificada en el parámetro `contentFile`.
* El archivo no puede contener más de 10.000 registros. 

<br>

**Example:**

![PrintScreen](/assets/massivePaymentTokenization.png)

### Parámetros para la Solicitud y Respuesta {#parameters-for-request-and-response-5}

<details>
<summary>Solicitud</summary>
<br>
<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la solicitud. Esto determina el idioma de los mensajes de error. [Consulta los idiomas compatibles]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Máx: 32 | Debe establecerse en `PROCESS_BATCH_TRANSACTIONS_TOKEN`. | Sí |
| merchant | Objeto |  | Objeto que contiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Mín: 12 Máx: 32 | PayU proporciona este nombre de usuario o login. [¿Cómo obtengo mi API Login?]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Mín: 6 Máx: 32 | PayU proporciona esta contraseña. [¿Cómo obtengo mi API Key?]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| contentFile | Alfanumérico |  | Cadena codificada en Base64 que contiene la información de la tarjeta de crédito. | Sí |

</details>

<details>
<summary>Respuesta</summary>
<br>
<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Respuesta de la transacción: `ERROR` o `SUCCESS`. |
| error | Alfanumérico | Máx: 2048 | Mensaje de error retornado cuando el código de la transacción es `ERROR`. |
| id | Alfanumérico |  | Identificador del proceso. |

</details>

### Llamado a la API {#api-call-6}

Los siguientes ejemplos muestran los cuerpos de solicitud y respuesta.

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Ejemplo de una Solicitud:**

```JSON
{
   "language": "es",
   "command": "PROCESS_BATCH_TRANSACTIONS_TOKEN",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "contentFile": "NTAwNTM4LGVhMDIwZTU5LWQ5NWEtNDk1ZC04OTAzLTM0ZTg0M2ZkN2ZlYywxMzIsMSxTYWxlLTA0LFN1YnNjcmlwdGlvbiBmZWUsdXNlcjFAbWFpbC5jb20sQ09QLDEwMDAwLDAsMCwwLGVzCjUwMDUzOCxlYWQwYTA5MC0xOGRjLTQxYWQtOTQzMS1hYjM0MmFmODU0YTIsMTM1LDEsU2FsZS0wNSxTdWJzY3JpcHRpb24gZmVlLHVzZXIyQG1haWwuY29tLENPUCwxMTAwMCwwLDAsMCxlcw=="
}
```

<br>

**Ejemplo de una Respuesta:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "id": "51c72d88-f707-45ca-ad59-4508140833a7"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Ejemplo de una Solicitud:**

```XML
<request>
   <language>es</language>
   <command>PROCESS_BATCH_TRANSACTIONS_TOKEN</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>51c72d88-f707-45ca-ad59-4508140833a7</apiKey>
   </merchant>
   <contentFile>NTAwNTM4LGVhMDIwZTU5LWQ5NWEtNDk1ZC04OTAzLTM0ZTg0M2ZkN2ZlYywxMzIsMSxTYWxlLTA0LFN1YnNjcmlwdGlvbiBmZWUsdXNlcjFAbWFpbC5jb20sQ09QLDEwMDAwLDAsMCwwLGVzCjUwMDUzOCxlYWQwYTA5MC0xOGRjLTQxYWQtOTQzMS1hYjM0MmFmODU0YTIsMTM1LDEsU2FsZS0wNSxTdWJzY3JpcHRpb24gZmVlLHVzZXIyQG1haWwuY29tLENPUCwxMTAwMCwwLDAsMCxlcw=</contentFile>
</request>
```

<br>

**Ejemplo de una Respuesta:**

```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>b721abbc-a9cf-44c6-99ba-91393de2b5d6</id>
</creditCardTokenBatchResponse>
```

{{< /tab >}}

{{< /tabs >}}