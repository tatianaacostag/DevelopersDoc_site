---
title: "API de Tokenización"
linkTitle: "API de Tokenización"
date: 2021-06-24T10:31:30-05:00
description: >
  El API de Tokenización te permite almacenar de forma segura, la información de las tarjetas de crédito de tus clientes a través de la creación de un token. Este token tee permite realizar pagos regulares o implementar la funcionalidad de pago a un clic, siguiendo lo estándares de seguridad de PCI DSS (Payment Card Industry Data Security Standard) para manejar los datos de las tarjetas de crédito.
weight: 40
tags: ["subtopic"]
---

La funcionalidad de Tokenización está disponible bajo acuerdos comerciales personalizados. Para más información, contacta a tu representante de ventas.

Para integrate con el API de Tokenización, apunta tus peticiones a las siguientes URLs de acuerdo con tu ambiente.

{{% alert title="URL" color="info"%}}
* Pruebas: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Producción: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Métodos disponibles {#available-methods}
El API de Tokenización incluye métodos para registrar, eliminar y consultar tokens.

* [Registro individual de tarjeta de crédito]({{< ref "#individual-credit-card-registration" >}})
* [Registro masivo de tarjetas de crédito]({{< ref "#massive-credit-card-registration" >}})
* [Eliminación individual de tarjeta de crédito]({{< ref "#individual-token-removal" >}})
* [Eliminación masiva de tarjetas de crédito]({{< ref "#massive-token-removal" >}})
* [Consulta de tókenes]({{< ref "#query-tokens" >}})

## Registro individual de tarjeta de crédito {#individual-credit-card-registration}
Utilizando esta funcionalidad, puedes registrar la información de la tarjeta de crédito de un cliente y obtener un token. 

### Variables para la petición y la respuesta {#variables-for-request-and-response}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `CREATE_TOKEN`. | Sí |
| merchant |  |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| creditCardToken |  |  | Información de la tarjeta de crédito que será tokenizada. | Sí |
| creditCardToken > payerId | Alfanumérico | | Identificador interno del tarjetahabiente. | Sí |
| creditCardToken > name | Alfanumérico | Min:1 Max:255 | Nombre del tarjetahabiente mostrado en la tarjeta de crédito. | Sí |
| creditCardToken > identificationNumber | Alfanumérico | Max:20 | Número de identificación del tarjetahabiente. | Sí |
| creditCardToken > paymentMethod | Alfanumérico | 32 | Selecciona un método de pago de Tarjeta de crédito valido. [Ver los métodos de pago disponibles]({{< ref "select-your-payment-method.html" >}}). | Sí |
| creditCardToken > number | Alfanumérico | Min:13 Max:20 | Número de la tarjeta de crédito. | Sí |
| creditCardToken > expirationDate | Alfanumérico | 7 | Fecha de expiración de la tarjeta de crédito. Formato `YYYY/MM`. | Sí |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| creditCardToken |  |  | Información de la tarjeta de crédito tokenizada. |
| creditCardToken > creditCardTokenId | Alfanumérico | | Token generado con la información de la tarjeta de crédito. |
| creditCardToken > name | Alfanumérico | Min:1 Max:255 | Nombre del tarjetahabiente como se envió en la petición. |
| creditCardToken > payerId | Alfanumérico | | Identificador interno de tarjetahabiente como se envió en la petición. |
| creditCardToken > identificationNumber | Alfanumérico | Max:20 | Número de identificación del tarjetahabiente como se envió en la petición. |
| creditCardToken > paymentMethod | Alfanumérico | 32 | Franquicia de la tarjeta de crédito tokenizada como se envió en la petición. |
| creditCardToken > maskedNumber | Alfanumérico | Min:13 Max:20 | Número enmascarado de la tarjeta de crédito. La máscara utilizada muestra los primeros seis dígitos y los últimos cuatro de la tarjeta de crédito. |

</details>

### Llamado del API {#api-call}
Los siguientes son los cuerpos de la petición y la respuesta para este método.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

Ejemplo petición:
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

Ejemplo respuesta:
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

## Registro masivo de tarjetas de crédito {#massive-credit-card-registration}
Utilizando esta funcionalidad, puedes registrar la información de varias tarjetas de crédito almacenadas en un archivo _**.csv**_ fy obtener un token por cada una. 

### Consideraciones {#considerations}
* Cada registro del archivo debe tener la siguiente estructura y orden separados por comas:
    - Identificador del pagador
    - Full name
    - Número de la tarjeta de crédito
    - Fecha de expiración
    - Franquicia
    - Número de identificación
* El archivo no debe tener encabezado.
* El archivo debe estar codificado utilizando UTF-8. Necesitas implementar una funcionalidad para codificar e contenido y enviar la cadena codificada en el parámetro `contentFille`.
* El archivo no puede tener más de 10.000 registros.<br><br>![PrintScreen](/assets/massiveTokenization.jpeg) 

### Variables para la petición y la respuesta {#variables-for-request-and-response-1}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `CREATE_BATCH_TOKENS`. | Sí |
| merchant |  |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| contentFile | Alfanumérico |  | Cadena de caracteres codificada en Base 64 con la información de las tarjetas de crédito como se explicó anteriormente. | Sí |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| id |  |  | Identificador del procedimiento. |

</details>

### Llamado del API {#api-call-1}
Los siguientes son los cuerpos de la petición y la respuesta para este método.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

Ejemplo petición:
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

Ejemplo respuesta:
```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>b721abbc-a9cf-44c6-99ba-91393de2b5d6</id>
</creditCardTokenBatchResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Eliminación individual de tarjeta de crédito {#individual-token-removal}
Utilizando esta funcionalidad, puedes eliminar un token previamente registrado. 

### Variables para la petición y la respuesta {#variables-for-request-and-response-2}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `REMOVE_TOKEN`. | Sí |
| merchant |  |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| removeCreditCardToken |  |  | Información del token que se va a eliminar. | Sí |
| removeCreditCardToken > payerId | Alfanumérico | | Identificador interno del tarjetahabiente. | Sí |
| removeCreditCardToken > creditCardTokenId | Alfanumérico | | Token de la tarjeta de crédito a eliminar. | Sí |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| creditCardToken |  |  | Information of the Token removed. |
| creditCardToken > creditCardTokenId | Alfanumérico | | Token de la tarjeta de crédito como se envió en la petición. |
| creditCardToken > name | Alfanumérico | Min:1 Max:255 | Nombre del tarjetahabiente mostrado en la tarjeta de crédito. |
| creditCardToken > payerId | Alfanumérico | | Identificador interno del tarjetahabiente. |
| creditCardToken > identificationNumber | Alfanumérico | Max:20 | Número de identificación del tarjetahabiente. |
| creditCardToken > paymentMethod | Alfanumérico | 32 | Franquicia de la tarjeta de crédito tokenizada. |
| creditCardToken > maskedNumber | Alfanumérico | Min:13 Max:20 | Número enmascarado de la tarjeta de crédito. La máscara utilizada muestra los primeros seis dígitos y los últimos cuatro de la tarjeta de crédito. |

</details>

### Llamado del API {#api-call-2}
Los siguientes son los cuerpos de la petición y la respuesta para este método.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

Ejemplo petición:
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

Ejemplo respuesta:
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

## Eliminación masiva de tarjetas de crédito {#massive-token-removal}
Using this feature, you can remove the tokens stored in a _**.csv**_ file. 

### Consideraciones {#considerations-1}
* Cada registro del archivo debe tener la siguiente estructura y orden separados por comas:
    - Identificador del pagador
    - Token.
* El archivo no debe tener encabezado.
* El archivo debe estar codificado utilizando UTF-8. Necesitas implementar una funcionalidad para codificar e contenido y enviar la cadena codificada en el parámetro `contentFille`.
* El archivo no puede tener más de 10.000 registros.<br><br>![PrintScreen](/assets/massiveDeletion.png) 

### Variables para la petición y la respuesta {#variables-for-request-and-response-3}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `REMOVE_BATCH_TOKENS`. | Sí |
| merchant |  |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| contentFile | Alfanumérico |  | Cadena de caracteres codificada en Base 64 con la información de los tókenes que se van a eliminar. | Sí |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| id |  |  | Identificador del procedimiento. |

</details>

### Llamado del API {#api-call-3}
Los siguientes son los cuerpos de la petición y la respuesta para este método.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

Ejemplo petición:
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

Ejemplo respuesta:
```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>2562625d-9e4c-450a-b979-031feb033952</id>
</creditCardTokenBatchResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Consulta de tókenes {#query-tokens}
Utilizando esta funcionalidad, puedes obtener la información de las tarjetas de crédito tokenizadas, puedes consultar por número de token o por rango de fechas. 
 
### Variables para la petición y la respuesta {#variables-for-request-and-response-4}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `GET_TOKENS`. | Sí |
| merchant |  |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| creditCardTokenInformation |  |  | Parámetros de la consulta. | Sí |
| creditCardTokenInformation > creditCardTokenId | Alfanumérico | | Token de la tarjeta a consultar. Este parámetro es obligatorio cuando quieres consultar por ID del Token. | No |
| creditCardTokenInformation > startDate | Alfanumérico | 23 | Fecha inicial de la consultar cuando la quieres realizar por rango de fechas. Este parámetro es obligatorio cuando quieres consultar por rango de fechas.<br>Formato `YYYY-MM-DDTHH:MM:SS`, por ejemplo `2021-06-12T16:07:11`. | No |
| creditCardTokenInformation > endDate | Alfanumérico | 23 | Fecha final de la consultar cuando la quieres realizar por rango de fechas. Este parámetro es obligatorio cuando quieres consultar por rango de fechas.<br>Formato `YYYY-MM-DDTHH:MM:SS`, por ejemplo `2021-06-12T16:07:11`. | No |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| creditCardTokenList |  |  | Information of the Tokenized credit cards. |
| creditCardTokenList > creditCardTokenId | Alfanumérico | | Token generated through the information of the credit card. |
| creditCardTokenList > name | Alfanumérico | Min:1 Max:255 | Holder's name displayed in the credit card como se envió en la petición. |
| creditCardTokenList > payerId | Alfanumérico | | Identificador interno del tarjetahabiente como se envió en la petición. |
| creditCardTokenList > identificationNumber | Alfanumérico | Max:20 | Número de identificación del tarjetahabiente como se envió en la petición. |
| creditCardTokenList > paymentMethod | Alfanumérico | 32 | Franquicia de la tarjeta de crédito tokenizada como se envió en la petición. |
| creditCardTokenList > creationDate | Alfanumérico | 19 | Fecha en la que se tokenizó la tarjeta de crédito. |
| creditCardTokenList > maskedNumber | Alfanumérico | Min:13 Max:20 | Número enmascarado de la tarjeta de crédito. La máscara utilizada muestra los primeros seis dígitos y los últimos cuatro de la tarjeta de crédito. |

</details>

### Llamado del API {#api-call-4}
Los siguientes son los cuerpos de la petición y la respuesta para este método. El siguiente ejemplo consulta las tarjetas tokenizadas por rango de fechas, si deseas consultar por el identificador el token, envía el parámetro `creditCardTokenInformation.creditCardTokenId`.

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

## Pagos utilizando tokenización {#payments-using-tokenization}
Para pagos con tókenes de tarjeta de crédito, incluye el parámetro `transaction.creditCardTokenId` reemplazando la información de la tarjeta de crédito. El siguiente ejemplo muestra el cuerpo de la petición a alto nivel de un flujo de un paso, no se muestran los detalles de la petición.

{{% alert title="Nota" color="info"%}}
Para procesar sin CVV es necesario enviar el parámetro `creditCard.processWithoutCvv2` como true en la petición del pago y quitar el parámetro `creditCard.securityCode`.<br>
Por defecto, el procesamiento de tarjetas de crédito sin código de seguridad no está activo. Si lo quieres activar, contacta a tu representante de ventas.
{{% /alert%}}

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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
         "Información de la orden":""
      },
      "payer": {
         "Información del pagador":""
      },
      "creditCardTokenId": "46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3",
      "creditCard": {
         "securityCode": "123"
      },
      "extraParameters": {
         "Extra parámetros de la petición":""
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "Franquicia de la tarjeta", 
      "paymentCountry": "País de procesamiento",
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

Ejemplo petición:
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
         <!-- Extra parámetros de la petición -->
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>{Franquicia de la tarjeta}</paymentMethod>
      <paymentCountry>{País de procesamiento}</paymentCountry>
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

Para detalles específicos sobre cómo realizar pagos, consulta el artículo correspondiente al país de procesamiento.

<div style="display: flex;">
  <div style="float: left;width: 50%;">
      <img src="/assets/Argentina.png" width="25px"/> <a href="{{< ref "Payments-API-Argentina.md" >}}">Argentina</a><br>
      <img src="/assets/Brasil.png" width="25px"/> <a href="{{< ref "Payments-API-Brazil.md" >}}">Brasil</a><br>
      <img src="/assets/Chile.png" width="25px"/> <a href="{{< ref "Payments-API-Chile.md" >}}">Chile</a><br>
      <img src="/assets/Colombia.png" width="25px"/> <a href="{{< ref "Payments-API-Colombia.md" >}}">Colombia</a>
    </ul>
  </div>
  <div style="float: left;width: 50%;">
    <ul>
      <img src="/assets/México.png" width="25px"/> <a href="{{< ref "Payments-API-Mexico.md" >}}">México</a><br>
      <img src="/assets/Panamá.png" width="25px"/> <a href="{{< ref "Payments-API-Panama.md" >}}">Panamá</a><br>
      <img src="/assets/Peru.png" width="25px"/> <a href="{{< ref "Payments-API-Peru.md" >}}">Perú</a>
    </ul>
  </div>
</div>

<br>

### Múltiples pagos con Tokenización {#multiple-payments-with-tokenization}
Utilizando esta funcionalidad, puedes realizar pagos utilizando varios tókenes almacenados en un archivo _**.csv**_. 

### Consideraciones {#considerations-2}
* Cada registro del archivo debe tener la siguiente estructura y orden separados por comas:
    - Account Id, identificador de tu cuenta PayU.
    - Token de la tarjeta de crédito
    - Código de seguridad de la tarjeta de crédito
    - Número de cuotas
    - Referencia de la venta
    - Descripción de la venta
    - Correo electrónico del comprador
    - Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}})
    - Valor total incluyendo los impuestos
    - Valor base del reembolso
    - Valor adicional
    - Idioma utilizado en los correos enviados al comprador y al vendedor. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}})
* El archivo no debe tener encabezado.
* El archivo debe estar codificado utilizando UTF-8. Necesitas implementar una funcionalidad para codificar e contenido y enviar la cadena codificada en el parámetro `contentFille`.
* El archivo no puede tener más de 10.000 registros.<br><br>![PrintScreen](/assets/massivePaymentTokenization.png) 

### Variables para la petición y la respuesta {#variables-for-request-and-response-5}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `PROCESS_BATCH_TRANSACTIONS_TOKEN`. | Sí |
| merchant |  |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| contentFile | Alfanumérico |  | Cadena de caracteres codificada en Base 64 con la información de las tarjetas de crédito como se explicó anteriormente. | Sí |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| id |  |  | Identificador del procedimiento. |

</details>

### Llamado del API {#api-call-5}
Los siguientes son los cuerpos de la petición y la respuesta para este método.

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

Ejemplo petición:
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

Ejemplo respuesta:
```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>b721abbc-a9cf-44c6-99ba-91393de2b5d6</id>
</creditCardTokenBatchResponse>
```
{{< /tab >}}
{{< /tabs >}}