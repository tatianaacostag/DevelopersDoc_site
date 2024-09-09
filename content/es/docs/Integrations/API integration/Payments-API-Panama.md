---
title: "API de Pagos - Panamá"
linkTitle: "API de Pagos - Panamá"
date: 2021-05-03T15:48:08-05:00
description: >
  La API de Pagos para Panamá permite integrar de manera eficiente las capacidades de procesamiento de pagos de PayU para tarjetas de crédito con tu plataforma de compras en línea.
weight: 20
tags: ["subtopic"]
---

<script src="/js/searchcodes.js"></script>

Esta guía muestra cómo aprovechar estos servicios para mejorar la experiencia de pago de tus clientes proporcionando opciones de pago flexibles y seguras adaptadas al mercado local.

{{% alert title="Nota" color="info"%}}

Para integrar la API de Pagos, dirige tus solicitudes a las siguientes URL según el entorno correspondiente:
* Pruebas: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Producción: ```https://api.payulatam.com/payments-api/4.0/service.cgi```

{{% /alert %}}

## Métodos Disponibles {#available-methods}

La API de Pagos incluye los siguiente métodos:

* [Enviar Transacciones con Tarjeta de Crédito]({{< ref "#submit-transactions-using-credit-cards" >}})
* [Consultar Métodos de Pago Disponibles]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Nota" color="info"%}}

Para confirmar el estado de una transacción, puedes utilizar una de las siguientes opciones:
* Navega a la URL configurada en la variable `transaction.notifyUrl` o la opción _**URL de confirmación**_ ubicada en el Módulo PayU en _**Configuración**_ > _**Configuración técnica**_.
* Utiliza el [API o SDK de consultas]({{< ref "Queries.md" >}}).

{{% /alert %}}

## Enviar Transacciones Utilizando Tarjetas de Crédito {#submit-transactions-using-credit-cards}

Este método te permite procesar pagos realizados por tus clientes utilizando tarjetas de crédito . Para Panamá, puedes realizar los flujos de un paso (**Cobro**). Para más información, consulta los [flujos de pago]({{< ref "payments.md#payment-flows" >}}).

### Parámetros para la Solicitud y la Respuesta {#parameters-for-request-and-response}

<details>
<summary>Solicitud</summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Mostrar solo campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| merchant | Objeto |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| transaction | Objeto |  | Este objeto tiene los datos de la transacción. | Sí |
| transaction > order | Objeto |  | Este objeto tiene los datos de la orden. | Sí |
| transaction > order > accountId | Numérico |  | Identificador de tu cuenta. | Sí |
| transaction > order > referenceCode | Alfanumérico | Min:1 Max:255 | Representa el identificador de la orden en tu sistema. | Sí |
| transaction > order > description | Alfanumérico | Min:1 Max:255 | Descripción de la orden. | Sí |
| transaction > order > language | Alfanumérico | 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí |
| transaction > order > notifyUrl | Alfanumérico | Max:2048 | URL de confirmación de la orden. | No |
| transaction > order > partnerId | Alfanumérico | Max:255 | ID de aliado dentro de PayU. | No |
| transaction > order > signature | Alfanumérico | Max:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| transaction > order > shippingAddress | Objeto |  | Dirección de envío. | No |
| transaction > order > shippingAddress > street1 | Alfanumérico | Max:100 | Línea de dirección 1. | No |
| transaction > order > shippingAddress > street2 | Alfanumérico | Max:100 | Línea de dirección 2. | No |
| transaction > order > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección. | No |
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Estado de la dirección. | No |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | País de la dirección. | No |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Código postal de la dirección. | No |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. | No |
| transaction > order > buyer | Objeto |  | Información del comprador. | Sí |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Identificador del comprador en tu sistema. | No |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Nombre del comprador. | Sí |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | Correo electrónico del comprador. | Sí |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Teléfono del comprador. | Sí |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Número de identificación del comprador. | Sí |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Línea de dirección 1 del comprador. | Sí |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Estado de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| transaction > order > buyer > shippingAddress > postalCode | Numérico | Max:20 | Código postal de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > phone | Numérico | Max:20 | Número de teléfono asociado a la dirección del comprador. | Sí |
| transaction > order > additionalValues > | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Monto de la transacción. | Sí |
| transaction > order > additionalValues > TX_VALUE > value | Numérico | 12, 2 | Especifica el monto de la transacción, este valor puede tener dos dígitos decimales (Ej. 10000.00 o 10000). | Sí |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Monto del impuesto a las ventas. | Sí |
| transaction > order > additionalValues > TX_TAX > value | Numérico | 12, 2 | Especifica el monto del impuesto a las ventas.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para calcular el impuesto.<br>Si el monto no tiene impuesto, envía 0.<br>Este valor puede tener dos dígitos decimales.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Numérico | 12, 2 | Especifica el monto base de la transacción. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > creditCardTokenId | Alfanumérico |  | Incluye este parámetro cuando la transacción se haga con una tarjeta tokenizada reemplazando la información de la tarjeta de crédito. Para más información, consulta [API de Tokenización]({{< ref "Tokenization-API.md" >}}) | Sí |
| transaction > creditCard | Objeto |  | Información de la tarjeta de crédito. Este objeto y sus parámetros son obligatorios cuando el pago se realiza utilizando una tarjeta de crédito no tokenizada. | No |
| transaction > creditCard > number | Alfanumérico | Min:13 Max:20 | Número de la tarjeta de crédito. | No |
| transaction > creditCard > securityCode | Alfanumérico | Min:1 Max:4 | Código de seguridad de la tarjeta de crédito (CVC2, CVV2, CID). | No |
| transaction > creditCard > expirationDate | Alfanumérico | 7 | Fecha de expiración de la tarjeta de crédito. Formato `YYYY/MM`. | No |
| transaction > creditCard > name | Alfanumérico | Min:1 Max:255 | Nombre del tarjetahabiente mostrado en la tarjeta de crédito. | No |
| transaction > creditCard > processWithoutCvv2 | Booleano | Max:255 | Te permite procesar transacciones sin incluir el código de seguridad de la tarjeta de crédito. Tu comercio requiere autorización de PayU antes de utilizar esta funcionalidad. | No |
| transaction > payer | Objeto |  | Información del pagador. | Sí |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Correo electrónico del pagador. | Sí |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identificador del pagador en tu sistema. | No |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nombre del pagador que debe concordar con el parámetro `transaction.creditCard.name`. | Sí |
| transaction > payer > billingAddress | Objeto |  | Dirección de facturación. | Sí |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Línea 1 de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Línea 2 de la dirección de facturación. | No |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Estado de la dirección de facturación. | No |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | Sí |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Código postal de la dirección de facturación. | No |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. | No |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Fecha de nacimiento del comprador. | No |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Teléfono del comprador. | Sí |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Número de identificación del pagador. | Sí |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver los tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sí |
| transaction > type | Alfanumérico | 32 | Set this value according to the transaction. Para Panamá, set `AUTHORIZATION_AND_CAPTURE` | Sí |
| transaction > paymentMethod | Alfanumérico | 32 | Selecciona un método de pago de Tarjeta de crédito valido. [Ver los métodos de pago disponibles para Panamá]({{< ref "select-your-payment-method.html#panama" >}}). | Sí |
| transaction > paymentCountry | Alfanumérico | 2 | Asigna `PA` para Panamá. | Sí |
| transaction > deviceSessionId | Alfanumérico | Max:255 | Identificador de la sesión del dispositivo donde el cliente realiza la transacción. Para más información, consulta [este artículo]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| transaction > ipAddress | Alfanumérico | Max:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > cookie | Alfanumérico | Max:255 | Cookie almacenada por el dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > userAgent | Alfanumérico | Max:1024 | User agent del navegador donde el cliente realiza la transacción. | Sí |
| transaction > extraParameters | Objeto |  | Parámetros adicionales o datos asociados a la petición. El tamaño máximo de cada nombre de _extraParameters_ es 64 caracteres.<br>En JSON, El parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>En XML, El parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | No |

</details>

<details>
<summary>Respuesta</summary>
<br>
<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| transactionResponse | Objeto |  | Datos de la respuesta. |
| transactionResponse > orderId | Numérico |  | Identificador generado o existente de la orden en PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | Identificador de la transacción en PayU. |
| transactionResponse > state | Alfanumérico | Max:32 | Estado de la transacción. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | Código de respuesta asociado con el estado. |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | Código de respuesta retornado por la red bancaria. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | Mensaje de error retornado por la red bancaria. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | Código de trazabilidad retornado por la red bancaria. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | Código de autorización retornado por la red bancaria. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Mensaje asociado al código de respuesta. |
| transactionResponse > operationDate | Fecha |  | Fecha de creación de la respuesta en el sistema de PayU. |
| transactionResponse > extraParameters | Objeto |  | Parámetros adicionales o datos asociados a la respuesta. <br>En JSON, El parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>En XML, El parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Consideraciones {#considerations}

* Para pagos con tókenes de tarjetas de crédito, incluye los parámetros `transaction.creditCardTokenId` y `transaction.creditCard.securityCode` (Si procesas con código de seguridad) reemplazando la información de la tarjeta de crédito . Para más información, consulta el [API de Tokenización]({{< ref "Tokenization-API.md" >}}).
* Por defecto, el procesamiento de tarjetas de crédito sin código de seguridad no está activo. Si lo quieres activar, contacta a tu representante de ventas. Luego de que esté activado, envía en la petición la variable `creditCard.processWithoutCvv2` con valor true y elimina la variable `creditCard.securityCode`.

### Llamado a la API {#api-call}

Los siguientes son los cuerpos de la petición y la respuesta para este método de pago.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo de una Solicitud:
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
         "accountId": "512326",
         "referenceCode": "PRODUCT_TEST_2021-06-21T21:28:14.962Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "782997f7981288b6ea411709188ff926",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 100,
               "currency": "USD"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Via Jose A. Arango, Juan Diaz",
               "street2": "5555487",
               "city": "Panamá",
               "state": "Panamá",
               "country": "PA",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Via Jose A. Arango, Juan Diaz",
            "street2": "5555487",
            "city": "Panamá",
            "state": "Panamá",
            "country": "PA",
            "postalCode": "0000000",
            "phone": "7563126"
         }
      },
      "payer": {
         "merchantPayerId": "1",
         "fullName": "First name and second payer name",
         "emailAddress": "payer_test@test.com",
         "contactPhone": "7563126",
         "dniNumber": "5415668464654",
         "billingAddress": {
            "street1": "Via Jose A. Arango, Juan Diaz",
            "street2": "125544",
            "city": "Panamá",
            "state": "Panamá",
            "country": "PA",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "creditCard": {
         "number": "4037997623271984",
         "securityCode": "321",
         "expirationDate": "2030/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "VISA",
      "paymentCountry": "PA",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": true
}
```
<br>

Ejemplo de una Respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 857804178,
        "transactionId": "299f50c4-d7d9-4f24-a4fc-1454ff26d5c4",
        "state": "APPROVED",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "00000000",
        "authorizationCode": "00000000",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624311390098,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "PAYMENT_WAY_ID": "4"
        },
        "additionalInfo": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo de una Solicitud:
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
         <accountId>512326</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-21T21:28:14.962Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>782997f7981288b6ea411709188ff926</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>100</value>
                  <currency>USD</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>123456789</dniNumber>
            <shippingAddress>
               <street1>Via Jose A. Arango, Juan Diaz</street1>
               <street2>5555487</street2>
               <city>Panamá</city>
               <state>Panamá</state>
               <country>PA</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Via Jose A. Arango, Juan Diaz</street1>
            <street2>5555487</street2>
            <city>Panamá</city>
            <state>Panamá</state>
            <country>PA</country>
            <postalCode>0000000</postalCode>
            <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <merchantPayerId>1</merchantPayerId>
         <fullName>First name and second payer name</fullName>
         <emailAddress>payer_test@test.com</emailAddress>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <billingAddress>
            <street1>Via Jose A. Arango, Juan Diaz</street1>
            <street2>5555487</street2>
            <city>Panamá</city>
            <state>Panamá</state>
            <country>PA</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <creditCard>
         <number>4037997623271984</number>
         <securityCode>321</securityCode>
         <expirationDate>2030/12</expirationDate>
         <name>APPROVED</name>
      </creditCard>
      <extraParameters>
         <entry>
            <string>INSTALLMENTS_NUMBER</string>
            <string>1</string>
         </entry>
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>VISA</paymentMethod>
      <paymentCountry>PA</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>true</isTest>
</request>
```
<br>

Ejemplo de una Respuesta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>857804176</orderId>
        <transactionId>69de6de1-9e18-45ae-8429-866bb3b47822</transactionId>
        <state>APPROVED</state>
        <trazabilityCode>00000000</trazabilityCode>
        <authorizationCode>00000000</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <operationDate>2021-06-21T16:35:06</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>PAYMENT_WAY_ID</string>
                <string>4</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Consultar Métodos de Pago Disponibles {#available-payment-methods-query}

Este método retorna la lista de los métodos de pago disponibles en todos los países.

### Parámetros para la Solicitud y la Respuesta {#parameters-for-request-and-response-1}

<details>
<summary>Solicitud</summary>
<br>
<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `GET_PAYMENT_METHODS`. | Sí |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| merchant | Objeto |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |

</details>

<details>
<summary>Respuesta</summary>
<br>
<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| paymentMethods | Objeto |  | Lista de los métodos de pago. |
| paymentMethods > paymentMethodComplete | Objeto |  | Este objeto tiene la información de un método de pago. |
| paymentMethods > paymentMethodComplete > id | Numérico |  | Identificador del método de pago. |
| paymentMethods > paymentMethodComplete > description | Alfanumérico | Max:32 | Nombre del método de pago. |
| paymentMethods > paymentMethodComplete > country | Alfanumérico | 2 | Código ISO del país del método de pago. |

</details>

### Llamado a la API {#api-call-1}

Los siguientes son los cuerpos de la petición y la respuesta para este método. Para el propósito de este ejemplo, la respuesta muestra dos métodos de pago. 

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo de una Solicitud:
```JSON
{
   "test": false,
   "language": "en",
   "command": "GET_PAYMENT_METHODS",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   }
}
```
<br>

Ejemplo de una Respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "paymentMethods": [
        {
            "id": "450",
            "description": "VISA",
            "country": "PA",
            "enabled": true,
            "reason": null
        },
        {
            "id": "451",
            "description": "MASTERCARD",
            "country": "PA",
            "enabled": true,
            "reason": null
        }
    ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo de una Solicitud:
```XML
<request>
   <language>en</language>
   <command>GET_PAYMENT_METHODS</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <isTest>false</isTest>
</request>
```
<br>

Ejemplo de una Respuesta:
```XML
<paymentMethodsResponse>
    <code>SUCCESS</code>
    <paymentMethods>
        <paymentMethodComplete>
            <id>450</id>
            <description>VISA</description>
            <country>PA</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>451</id>
            <description>MASTERCARD</description>
            <country>PA</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
    </paymentMethods>
</paymentMethodsResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Ping

El método `PING` te permite verificar la conexión con nuestra plataforma.

### Parámetros para la Solicitud y la Respuesta {#parameters-for-request-and-response-2}

<details>
<summary>Solicitud</summary>
<br>
<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `PING`. | Sí |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| merchant | Objeto |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |

</details>

<details>
<summary>Respuesta</summary>
<br>
<div class="variables"></div>

| Nombre del Campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado si ocurrió un error. |
| transactionResponse | Objeto | Max:2048 | La respuesta del método PING si ocurrió un error. |
</details>

### Llamado a la API {#api-call-2}

Los siguientes son los cuerpos de la petición y la respuesta para este método.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo de una Solicitud:
```JSON
{
   "test": false,
   "language": "en",
   "command": "PING",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   }
}
```
<br>

Ejemplo de una Respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": null
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo de una Solicitud:
```XML
<request>
   <language>en</language>
   <command>PING</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <isTest>false</isTest>
</request>
```
<br>

Ejemplo de una Respuesta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}
