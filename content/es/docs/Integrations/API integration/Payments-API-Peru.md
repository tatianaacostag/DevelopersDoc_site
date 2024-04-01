---
title: "API de Pagos - Perú"
linkTitle: "API de Pagos - Perú"
date: 2021-05-03T15:48:08-05:00
description: >
  La API de Pagos de Perú le permite a tu tienda procesar diferentes tipos de transacciones con múltiples métodos de pago.
weight: 20
tags: ["subtopic"]
---
<script src="/js/searchcodes.js"></script>

Para integrarte con la API de Pagos de Perú, dirige tus solicitudes a las siguientes URL según tu entorno:

{{% alert title="URL" color="info"%}}
* Pruebas: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Producción: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Métodos disponibles {#available-methods}
La API de pagos incluye los siguiente métodos:

* [Enviar transacciones utilizando tarjetas de crédito o débito]({{< ref "#submit-transactions-using-credit-or-debit-cards" >}})
* [Enviar transacciones utilizando Yape]({{< ref "#submit-transactions-using-yape" >}})
* [Enviar transacciones utilizando efectivo]({{< ref "#submit-transactions-using-cash" >}})
* [Consultar métodos de pago disponibles]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Nota" color="info"%}}
Para confirmar el estado de una transacción, puedes utilizar una de las siguientes opciones:
* Navega a la URL configurada en la variable `transaction.notifyUrl` o la opción _**URL de confirmación**_ ubicada en el Módulo PayU en _**Configuración**_ > _**Configuración técnica**_.
* Utiliza el [API o SDK de consultas]({{< ref "Queries.md" >}}).
{{% /alert %}}

## Enviar  transacciones utilizando tarjetas de crédito o débito {#submit-transactions-using-credit-or-debit-cards}
Este método te permite procesar pagos realizados por tus clientes utilizando tarjetas de crédito o débito. Para Perú, puedes realizar los flujos de dos pasos (**Autorización**, **Captura**) y el de un paso (**Cobro**). Para más información, consulta los [flujos de pago]({{< ref "payments.md#payment-flows" >}}).

### Parámetros para la solicitud y la respuesta {#parameters-for-request-and-response}

<details>
<summary>Solicitud (Request)</summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Mostrar solo campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
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
| transaction > order > additionalValues > TX_VALUE > value | Numérico | 12, 2 | Especifica el monto de la transacción, este valor puede tener dos dígitos decimales (Ej. `10000.00` o `10000`). | Sí |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Monto del impuesto a las ventas. | Sí |
| transaction > order > additionalValues > TX_TAX > value | Numérico | 12, 2 | Especifica el monto del impuesto a las ventas.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para calcular el impuesto.<br>Si el monto no tiene impuesto, envía 0.<br>Este valor puede tener dos dígitos decimales.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Numérico | 12, 2 | Especifica el monto base de la transacción. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > creditCardTokenId |  |  | Incluye este parámetro cuando la transacción se haga con una tarjeta tokenizada reemplazando la información de la tarjeta de crédito. Para más información, consulta [API de Tokenización]({{< ref "Tokenization-API.md" >}}) | No |
| transaction > creditCard | Objeto |  | Información de la tarjeta de crédito. Si procesas utilizando tarjeta débito, no envíes este parámetro.<br>Este objeto y sus parámetros son obligatorios cuando el pago se realiza utilizando una tarjeta de crédito no tokenizada. | No |
| transaction > creditCard > number | Alfanumérico | Min:13 Max:20 | Número de la tarjeta de crédito. | No |
| transaction > creditCard > securityCode | Alfanumérico | Min:1 Max:4 | Código de seguridad de la tarjeta de crédito (CVC2, CVV2, CID). | No |
| transaction > creditCard > expirationDate | Alfanumérico | 7 | Fecha de expiración de la tarjeta de crédito. Formato `YYYY/MM`. | No |
| transaction > creditCard > name | Alfanumérico | Min:1 Max:255 | Nombre del tarjetahabiente mostrado en la tarjeta de crédito. | No |
| transaction > creditCard > processWithoutCvv2 | Booleano | Max:255 | Te permite procesar transacciones sin incluir el código de seguridad de la tarjeta de crédito. Tu comercio requiere autorización de PayU antes de utilizar esta funcionalidad. | No |
| transaction > debitCard | Objeto |  | Información de la tarjeta débito. Este objeto y sus parámetros son obligatorios cuando el pago se realiza utilizando una tarjeta debito. | No |
| transaction > debitCard > number | Alfanumérico | Min:13 Max:20 | Número de la tarjeta débito. | No |
| transaction > debitCard > securityCode | Alfanumérico | Min:1 Max:4 | Código de seguridad la tarjeta débito (CVC2, CVV2, CID). | No |
| transaction > debitCard > expirationDate | Alfanumérico | 7 | Fecha de expiración de la tarjeta débito. Formato `YYYY/MM`. | No |
| transaction > debitCard > name | Alfanumérico | Min:1 Max:255 | Nombre del tarjetahabiente mostrado en la tarjeta debito. | No |
| transaction > payer | Objeto |  | Información del pagador. | No |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Correo electrónico del pagador. | No |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identificador del pagador en tu sistema. | No |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nombre del pagador que debe ser igual al enviado en el parámetro `creditCard.name` para pagos con tarjeta de crédito. | No |
| transaction > payer > billingAddress | Objeto |  | Dirección de facturación. | Sí |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Línea 1 de la dirección de facturación. | No |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Línea 2 de la dirección de facturación. | No |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección de facturación. | No |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Estado de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | No |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Código postal de la dirección de facturación. | No |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. | No |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Fecha de nacimiento del comprador. | No |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Teléfono del comprador. | No |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Número de identificación del pagador. | No |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver los tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sí |
| transaction > type | Alfanumérico | 32 | Asigna este valor de acuerdo con el tipo de transacción requerido:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` para flujos de un paso.</li></ul> | Sí |
| transaction > paymentMethod | Alfanumérico | 32 | Selecciona un método de pago de Tarjeta de crédito o débito valido. [Ver los métodos de pago disponibles para Perú]({{< ref "select-your-payment-method.html#Peru" >}}). | Sí |
| transaction > paymentCountry | Alfanumérico | 2 | Asigna `PE` para Perú. | Sí |
| transaction > deviceSessionId | Alfanumérico | Max:255 | Identificador de la sesión del dispositivo donde el cliente realiza la transacción. Para más información, consulta [este artículo]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| transaction > ipAddress | Alfanumérico | Max:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > cookie | Alfanumérico | Max:255 | Cookie almacenada por el dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > userAgent | Alfanumérico | Max:1024 | User agent del navegador donde el cliente realiza la transacción. | Sí |
| transaction > extraParameters | Objeto |  | Parámetros adicionales o datos asociados a la petición. El tamaño máximo de cada nombre de _extraParameters_ es 64 caracteres.<br>En JSON, El parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>En XML, El parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | No |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
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
* En Perú, puedes seleccionar 0 o de 2 a 36 cuotas cuando pagas con tarjeta de crédito. Si seleccionas una (1) cuota, PayU envía cero (0) como valor por defecto.

### Autorización {#authorization}
Utiliza este método para realizar el paso de **Autorización** del flujo de dos pasos. En este paso, autorizas el pago pero el monto no se debita hasta que [captures]({{< ref "payments-api-peru.md#capture" >}}) los fondos.

Los siguientes son los cuerpos de la solicitud y la respuesta para este tipo de transacción.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo de una solicitud:
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
         "accountId": "512323",
         "referenceCode": "PRODUCT_TEST_2021-06-21T16:39:10.965Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "af24b22ad0aa0b14dbe3c21a07d9558c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 100,
               "currency": "PEN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Isabel La Católica 103-La Victoria",
               "street2": "5555487",
               "city": "Lima",
               "state": "Lima y Callao",
               "country": "PE",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "5555487",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
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
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "125544",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "creditCard": {
         "number": "4097440000000004",
         "securityCode": "321",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION",
      "paymentMethod": "VISA",
      "paymentCountry": "PE",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": true
}
```
<br>

Ejemplo de una respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400443216,
        "transactionId": "eebf01c3-7531-4952-a8e8-647a9eebac95",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "000",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "77821",
        "authorizationCode": "170921",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado y completado con exito",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624275552379,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT"
        },
        "additionalInfo": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo de una solicitud:
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
         <accountId>512323</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-21T16:39:10.965Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>af24b22ad0aa0b14dbe3c21a07d9558c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>100</value>
                  <currency>PEN</currency>
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
               <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>
               <city>Lima</city>
               <state>Lima y Callao</state>
               <country>PE</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>
            <city>Lima</city>
            <state>Lima y Callao</state>
            <country>PE</country>
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
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>
            <city>Lima</city>
            <state>Lima y Callao</state>
            <country>PE</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <creditCard>
         <number>4097440000000004</number>
         <securityCode>777</securityCode>
         <expirationDate>2022/12</expirationDate>
         <name>APPROVED</name>
      </creditCard>
      <extraParameters>
         <entry>
            <string>INSTALLMENTS_NUMBER</string>
            <string>1</string>
         </entry>
      </extraParameters>
      <type>AUTHORIZATION</type>
      <paymentMethod>VISA</paymentMethod>
      <paymentCountry>PE</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>

```
<br>

Ejemplo de una respuesta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400443244</orderId>
        <transactionId>62cb2c6a-a9d5-4438-a767-7be501f0973d</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>000</paymentNetworkResponseCode>
        <trazabilityCode>77821</trazabilityCode>
        <authorizationCode>170921</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Aprobado y completado con exito</responseMessage>
        <operationDate>2021-06-21T06:47:21</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

<!--
#### Zero Authorization
Zero Authorization allows you to validate a card without performing any charge or capture operation. Through this option, you can send an _Authorization_ request as explained before with `TX_VALUE` equals to 0 and you will receive the result of the card validation.

{{% alert title="Important" color="info"%}}
* Make sure your shop can create transactions with `TX_VALUE` equals to 0.
* This feature is not enabled by default, contact your sales representative to request it.
* _Zero Authorization_ is available for VISA and Mastercard cards only. For other franchises, send the transaction value greater than or equals to 1 PEN.
{{% /alert %}}

##### Beneficios {#benefits}
Utilizando _Zero Authorization_, tienes los siguientes beneficios:

* Free trial periods
* Increase trust and loyalty
* Increase your subscriber base
* Update credit card information
* Add several cards to an account
* Lower refunds
-->

### Captura {#capture}
Utiliza este método para realizar el paso de **Captura** del flujo de dos pasos. En este paso, capturas los fondos previamente [Autorizados]({{< ref "payments-api-peru.md#authorization" >}}) para transferirlos a tu cuenta PayU.

#### Consideraciones {#considerations-1}
Ten en cuenta las siguientes consideraciones para la captura.
* Puedes realizar capturas parciales sobre un monto autorizado. Para esto, necesitas enviar en la petición el parámetro `transaction.order.TX_VALUE` con su valor (Como se envió durante la Autorización).
* Para capturas parciales, el mínimo valor a capturar puede ser 10% menor que el valor autorizado.
* Para capturas parciales, las redes de pago liberan los valores no capturados entre 2 y 10 días para tarjetas locales y 28 días para tarjetas extranjeras.

Los siguientes son los cuerpos de la solicitud y la respuesta para este tipo de transacción.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo de una solicitud:
```JSON
{
   "language": "es",
   "command": "SUBMIT_TRANSACTION",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "transaction": {
      "order": {
         "id": "1400443216"
      },
      "type": "CAPTURE",
      "parentTransactionId": "eebf01c3-7531-4952-a8e8-647a9eebac95"
   },
   "test": false
}
```
<br>

Ejemplo de una respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400443382,
        "transactionId": "e82d47b3-72cf-42f0-ae30-3eeb42575cc7",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "10140044338210c",
        "authorizationCode": "APPROVED",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624279912864,
        "referenceQuestionnaire": null,
        "additionalInfo": null
    }
}

```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo de una solicitud:
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
         <id>1400443382</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>10ccdb41-3fa8-4961-b6c0-88d74f737d4e</parentTransactionId>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Ejemplo de una respuesta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400443382</orderId>
        <transactionId>e82d47b3-72cf-42f0-ae30-3eeb42575cc7</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>10140044338210c</trazabilityCode>
        <authorizationCode>APPROVED</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>APPROVED</responseMessage>
        <operationDate>2021-06-21T07:51:52</operationDate>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Cobro {#charge}
Utiliza este método para realizar el flujo de un paso, es decir, un cobro. En este paso, los pasos del flujo de dos pasos son combinados en una única transacción y los fondos son transferidos de la cuenta del cliente a tu cuenta PayU tan pronto sean aprobados:

Los siguientes son los cuerpos de la solicitud y la respuesta para este tipo de transacción.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo de una solicitud:
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
         "accountId": "512323",
         "referenceCode": "PRODUCT_TEST_2021-06-21T16:39:10.965Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "af24b22ad0aa0b14dbe3c21a07d9558c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 100,
               "currency": "PEN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Isabel La Católica 103-La Victoria",
               "street2": "5555487",
               "city": "Lima",
               "state": "Lima y Callao",
               "country": "PE",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "5555487",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
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
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "125544",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "creditCard": {
         "number": "4097440000000004",
         "securityCode": "321",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "VISA",
      "paymentCountry": "PE",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": true
}
```
<br>

Ejemplo de una respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400443595,
        "transactionId": "acd8a1c6-fb44-497f-8fa5-de6136be4562",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "000",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "77821",
        "authorizationCode": "170921",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado y completado con exito",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624286793995,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT"
        },
        "additionalInfo": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo de una solicitud:
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
         <accountId>512323</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-21T16:39:10.965Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>af24b22ad0aa0b14dbe3c21a07d9558c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>100</value>
                  <currency>PEN</currency>
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
               <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>
               <city>Lima</city>
               <state>Lima y Callao</state>
               <country>PE</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>
            <city>Lima</city>
            <state>Lima y Callao</state>
            <country>PE</country>
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
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>
            <city>Lima</city>
            <state>Lima y Callao</state>
            <country>PE</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <creditCard>
         <number>4097440000000004</number>
         <securityCode>777</securityCode>
         <expirationDate>2022/12</expirationDate>
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
      <paymentCountry>PE</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>


```
<br>

Ejemplo de una respuesta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400443759</orderId>
        <transactionId>d7af220a-d427-486f-b35d-c363e12430e2</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>000</paymentNetworkResponseCode>
        <trazabilityCode>77821</trazabilityCode>
        <authorizationCode>170921</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Aprobado y completado con exito</responseMessage>
        <operationDate>2021-06-21T10:49:30</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Enviar transacciones utilizando Yape {#submit-transactions-using-yape}

### Descripción
Yape es una aplicación móvil creada por el BCP (Banco de Crédito del Perú) que ofrece una billetera digital. La aplicación permite a los usuarios realizar compras en línea, pagar servicios, realizar recargas, retirar fondos, y enviar o recibir dinero de manera rápida y segura. El acceso a esta billetera digital no requiere una cuenta bancaria; solo se necesita el número de celular del pagador.

#### Características y beneficios
Facilitar pagos a través de Yape en tu negocio te otorga a ti y a tus clientes valiosos beneficios:

* **Más ventas:** Atrae nuevos clientes y aumenta las ventas gracias a la base de millones de clientes que cuentan con Yape.
* **Más conveniencia:** Los clientes pueden realizar compras rápidas y fáciles utilizando sus teléfonos móviles.
* **Más seguridad:** Garantiza transacciones seguras y confiables con el respaldo del BCP.

### Proceso de pago con Yape

#### Requisitos previos
Para realizar pagos, el usuario final necesita 2 componentes:
* Número de celular
* OTP

#### Experiencia de usuario
Una compra a través de Yape puede seguir el flujo descrito a continuación:

1. El usuario accede al sitio web o aplicación de compras y selecciona el producto que desea adquirir. El sitio web le ofrece al usuario la opción de pagar a través de Yape y le solicita su número de teléfono móvil y un código de aprobación, por ejemplo:

<img src="/assets/Payments/Yape01ES.png" alt="PrintScreen" width="250">
<p></p>

2. El usuario accede a la aplicación de Yape para obtener el código de aprobación, por ejemplo:

<img src="/assets/Payments/Yape02ES.png" alt="PrintScreen" width="250">
<p></p>

3. El usuario ingresa el código de aprobación y paga fácilmente, por ejemplo:

<img src="/assets/Payments/Yape03ES.png" alt="PrintScreen" width="500">
<p></p>

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response-1}

<details>
<summary>Solicitud (Request)</summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Mostrar solo campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la solicitud, usado para mostrar mensajes de error. | Sí |
| command | Alfanumérico | Máx:32 | Establecer SUBMIT_TRANSACTION. | Sí |
| test (JSON) isTest (XML) | Booleano | | Establecer true si la solicitud está en modo de prueba, de lo contrario, establecer false. | Sí |
| merchant | Objeto | | Datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuario o inicio de sesión proporcionado por PayU. | Sí |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Contraseña proporcionada por PayU. | Sí |
| transaction | Objeto | | Datos de la transacción. | Sí |
| transaction > order | Objeto | | Datos del pedido. | Sí |
| transaction > order > accountId | Número | | Identificador de tu cuenta. | Sí |
| transaction > order > referenceCode | Alfanumérico | Mín:1 Máx:255 | Identificador del pedido en tu sistema. | Sí |
| transaction > order > description | Alfanumérico | Mín:1 Máx:255 | Descripción del pedido. | Sí |
| transaction > order > language | Alfanumérico  | 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí |
| transaction > order > notifyUrl | Alfanumérico | Máx:2048 | URL de confirmación del pedido. | No |
| transaction > order > partnerId | Alfanumérico | Máx:255 | ID de socio en PayU. | No |
| transaction > order > signature | Alfanumérico | Máx:255 | Firma asociada al formulario. | Sí        |
| transaction > order > shippingAddress | Objeto | | Dirección de envío. | No |
| transaction > order > shippingAddress > street1 | Alfanumérico | Máx:100 | Dirección Línea 1. | No |
| transaction > order > shippingAddress > street2 | Alfanumérico | Máx:100 | Dirección Línea 2. | No |
| transaction > order > shippingAddress > city | Alfanumérico | Máx:50 | Ciudad de la dirección. | No |
| transaction > order > shippingAddress > state | Alfanumérico | Máx:40 | Estado de la dirección. | No |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | País de la dirección. | No |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Máx:8 | Código postal de la dirección. | No |
| transaction > order > shippingAddress > phone | Alfanumérico | Máx:11 | Número de teléfono asociado a la dirección. | No |
| transaction > order > buyer | Objeto | | Información sobre el comprador. | Sí |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Máx:100 | ID del comprador en tu sistema. | No |
| transaction > order > buyer > fullName | Alfanumérico | Máx:150 | Nombre completo del comprador. | Sí |
| transaction > order > buyer > emailAddress | Alfanumérico | Máx:255 | Correo electrónico del comprador. | Sí |
| transaction > order > buyer > contactPhone | Alfanumérico | Máx:20 | Número de teléfono del comprador. | Sí |
| transaction > order > buyer > dniNumber | Alfanumérico | Máx:20 | Número de identificación del comprador. | Sí |
| transaction > order > buyer > shippingAddress | Alfanumérico | | Dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Máx:150 | Línea 1 de la dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Máx:50 | Ciudad de la dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Máx:40 | Estado de la dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País de la dirección de envío del comprador en formato ISO 3166 alfa-2. | Sí |
| transaction > order > buyer > shippingAddress > postalCode | Número | Máx:20 | Código postal de la dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > phone | Número | Máx:20 | Número de teléfono de la dirección de envío del comprador. | Sí |
| transaction > order > additionalValues | Objeto | 64 | Monto del pedido y sus valores asociados. | Sí |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Monto de la transacción. | Sí |
| transaction > order > additionalValues > TX_VALUE > value | Número | 12, 2 | Especifica el monto de la transacción. | Sí |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO de la moneda. | No |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Monto del Impuesto al Valor Agregado (IVA). | Sí |
| transaction > order > additionalValues > TX_TAX > value | Número | 12, 2 | Especifica el monto del IVA. | No |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO de la moneda. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para calcular el IVA. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Número | 12, 2 | Especifica el monto base de la transacción. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO de la moneda. Consulta las monedas aceptadas. | No |
| transaction > extraParameters > OTP | Alfanumérico | 6 | Código generado en la aplicación Yape necesario para aprobar una transacción de Yape (One Time Password) | |
| transaction > payer | Información del pagador. | | Información sobre el pagador. | Sí |
| transaction > payer > emailAddress | Alfanumérico | Máx:255 | Dirección de correo electrónico del pagador. | Sí |
| transaction > payer > merchantPayerId | Alfanumérico | Máx:100 | Identificador del pagador en tu sistema. | No |
| transaction > payer > fullName | Alfanumérico | Máx:150 | Nombre del pagador. | Sí |
| transaction > payer > billingAddress | Dirección de facturación. | | Dirección de facturación del pagador. | Sí |
| transaction > payer > billingAddress > street1 | Alfanumérico | Máx:100 | Línea 1 de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > street2 | Alfanumérico | Máx:100 | Línea 2 de la dirección de facturación. | No |
| transaction > payer > billingAddress > city | Alfanumérico | Máx:50 | Ciudad de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > state | Alfanumérico | Máx:40 | Estado de la dirección de facturación. | No |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | Sí |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Máx:20 | Código postal de la dirección de facturación. | No |
| transaction > payer > billingAddress > phone | Alfanumérico | Máx:20 | Número de teléfono de la dirección de facturación. | No |
| transaction > payer > birthdate | Alfanumérico | Máx:10 | Fecha de nacimiento del pagador. | No |
| transaction > payer > contactPhone | Alfanumérico | Máx:20 | Número de teléfono del pagador. Este es el número que se utilizará para pagar en Yape. | Sí |
| transaction > payer > dniNumber | Alfanumérico | Máx:20 | Número de identificación del pagador. | Sí |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificación del pagador. Consulta los tipos de documentos. | No |
| transaction > type | Alfanumérico | 32 | Establece este valor de acuerdo con la transacción. Para Colombia, establece AUTHORIZATION_AND_CAPTURE. | Sí |
| transaction > paymentMethod | Alfanumérico | 32 | Establece YAPE para el Método de Pago de Yape. | Sí |
| transaction > paymentCountry | Alfanumérico | 2 | Establece PE para Perú. | Sí |
| transaction > deviceSessionId | Alfanumérico | Máx:255 | Identificador de sesión del dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > ipAddress | Alfanumérico | Máx:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > cookie | Alfanumérico | Máx:255 | Cookie almacenada por el dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > userAgent | Alfanumérico | Máx:1024| El agente de usuario del navegador donde el cliente realiza la transacción. | Sí |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|---|---|---|---|
| code | Alfanumérico | | El código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048  | El mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| transactionResponse | Objeto | | Los datos de respuesta. |
| transactionResponse > orderId | Número | | El ID de orden generado o existente en PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | El identificador de la transacción en PayU. |
| transactionResponse > state | Alfanumérico | Max:32 | El estado de la transacción. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | El código de respuesta asociado con el estado. |
| transactionResponse > pendingReason | Alfanumérico | Max:64 | La razón pendiente de la transacción. |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | El código de respuesta devuelto por la red financiera. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | El mensaje de error devuelto por la red financiera. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | El código de trazabilidad devuelto por la red financiera. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | El código de autorización devuelto por la red financiera. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048  | El mensaje asociado con el código de respuesta. |
| transactionResponse > operationDate | Fecha | | La fecha de creación de la respuesta en el sistema de PayU. |
| transactionResponse > extraParameters | Objeto | | Parámetros adicionales o datos asociados con la respuesta. En JSON, el parámetro extraParameters sigue esta estructura: "extraParameters": {"BANK_REFERENCED_CODE": "CREDIT"}En XML, el parámetro extraParameters sigue esta estructura: <extraParameters> <entry> <string>BANK_REFERENCED_CODE</string> <string>CREDIT</string> </entry></extraParameters> |
| transactionResponse > additionalInfo | Objeto | | Información adicional asociada con la respuesta. Este objeto sigue la misma estructura que transactionResponse.extraParameters. |

</details>

### Llamado a la API {#api-call}
Los siguientes son los cuerpos de la petición y la respuesta para este método de pago.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo de una solicitud:
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
      "accountId": "512323",
      "referenceCode": "PRODUCT_TEST_2021-06-21T16:39:10.965Z",
      "description": "Payment test description",
      "language": "es",
      "signature": "af24b22ad0aa0b14dbe3c21a07d9558c",
      "notifyUrl": "http://www.payu.com/notify",
      "additionalValues": {
        "TX_VALUE": {
          "value": 100,
          "currency": "PEN"
        }
      },
      "buyer": {
        "merchantBuyerId": "1",
        "fullName": "First name and second buyer  name",
        "emailAddress": "buyer_test@test.com",
        "contactPhone": "7563126",
        "dniNumber": "123456789",
        "shippingAddress": {
          "street1": "Av. Isabel La Católica 103-La Victoria",
          "street2": "5555487",
          "city": "Lima",
          "state": "Lima y Callao",
          "country": "PE",
          "postalCode": "000000",
          "phone": "7563126"
        }
      },
      "shippingAddress": {
        "street1": "Av. Isabel La Católica 103-La Victoria",
        "street2": "5555487",
        "city": "Lima",
        "state": "Lima y Callao",
        "country": "PE",
        "postalCode": "0000000",
        "phone": "7563126"
      }
    },
    "extraParameters": {
      "OTP": "557454"
    },    
    "payer": {
      "merchantPayerId": "1",
      "fullName": "First name and second payer name",
      "emailAddress": "payer_test@test.com",
      "contactPhone": "969929157",
      "dniNumber": "5415668464654",
      "billingAddress": {
        "street1": "Av. Isabel La Católica 103-La Victoria",
        "street2": "125544",
        "city": "Lima",
        "state": "Lima y Callao",
        "country": "PE",
        "postalCode": "000000",
        "phone": "7563126"
      }
    },
    "type": "AUTHORIZATION_AND_CAPTURE",
    "paymentMethod": "YAPE",
    "expirationDate": "2021-06-22T19:51:20.302",
    "paymentCountry": "PE",
    "ipAddress": "127.0.0.1"
  },
  "test": true
}
```
<br>

Ejemplo de una respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 2151156450,
        "transactionId": "70149315-677f-4bc0-9f59-a1de47ef4f7e",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "437",
        "authorizationCode": "160105",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado y completado con exito",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1706024870610,
        "referenceQuestionnaire": null,
        "extraParameters": null,
        "additionalInfo": null
    }
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo de una solicitud:
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
         <accountId>512323</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-21T16:39:10.965Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>af24b22ad0aa0b14dbe3c21a07d9558c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>100</value>
                  <currency>PEN</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <contactPhone>7563126</contactPhone>
            <dniNumber>123456789</dniNumber>
            <emailAddress>buyer_test@test.com</emailAddress>
            <fullName>First name and second buyer name</fullName>
            <merchantBuyerId>1</merchantBuyerId>
            <shippingAddress>
               <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>            
               <city>Lima</city>
               <state>Lima y Callao</state>               
               <country>PE</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>            
               <city>Lima</city>
               <state>Lima y Callao</state>               
               <country>PE</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <extraParameters>
         <OTP>557454</OTP>
      </extraParameters>
      <payer>
         <billingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>            
            <city>Lima</city>
            <state>Lima y Callao</state>               
            <country>PE</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
         <contactPhone>969929157</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <emailAddress>payer_test@test.com</emailAddress>
         <fullName>First name and second payer name</fullName>
         <merchantPayerId>1</merchantPayerId>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>YAPE</paymentMethod>
      <expirationDate>2021-06-16T16:07:11</expirationDate>
      <paymentCountry>PE</paymentCountry>
      <ipAddress>127.0.0.1</ipAddress>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Ejemplo de una respuesta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>2151156450</orderId>
        <transactionId>70149315-677f-4bc0-9f59-a1de47ef4f7e</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>437</trazabilityCode>
        <responseCode>APPROVED</responseCode>
        <authorizationCode>160105</authorizationCode>        
        <responseMessage>Aprobado y completado con exito</responseMessage>
        <operationDate>2024-01-19T08:17:42</operationDate>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Consideraciones
* Los pagos procesados a través de nuestra pasarela serán realizados a nombre de tu comercio por parte de PayU.
* El monto máximo que los pagadores pueden procesar con Yape es de 950 soles acumulados por día.
* Para consultar un código activo de tu transacción, utiliza la [API de consultas](https://developers.payulatam.com/latam/es/docs/integrations/api-integration/queries-api.html).
* Yape admite reversos totales, parciales y anulaciones.
* Las integraciones API que contienen espacios en el número de celular pueden ocasionar la pérdida de la transacción. A continuación, los casos que pueden ser aprobados o que pueden generar errores:
    * **Caso aprobado 1:** `51` `969929157` → El campo de indicativo y número de celular están separados.
    * **Caso aprobado 2:** `969929157` → Hay un campo único para el número de celular sin espacios.
    * **Caso error 1:** `51969929157` → El indicativo y número de celular están en un mismo campo.
    * **Caso error 2:** `51` `969` `929157` → El número de celular está separado por espacios.
    <p></p>

    Por lo anterior, para evitar errores y mejorar la experiencia del usuario, recomendamos lo siguiente:
    1. Utilizar un único campo para el número de celular que automáticamente incluya el indicativo, o mostrar dos campos separados en la interfaz: uno para el indicativo del país y otro para el número de celular.
    2. Configurar la interfaz para aceptar un máximo de 9 dígitos y mostrar un aviso al usuario informándole que el número telefónico ingresado debe constar de 9 dígitos.
    3. Configurar la interfaz para evitar espacios o eliminarlos automáticamente, o mostrar un aviso al usuario indicándole que ingrese el número sin espacios.

### Pruebas en ambiente sandbox 
Para probar las transacciones de Yape en el ambiente de Sandbox de PayU, utiliza los siguientes datos:

<table border="1"> 
<tr> 
<th colspan="2"><h5>Caso de prueba</h5></th>
<th colspan="3"><h5>Respuesta desde PayU</h5></th>  
</tr> 
 
<tr> 
<td><b>transaction > payer > contactPhone</b></td> 
<td><b>transaction > extraParameters > OTP</b></td> 
<td><b>state</b></td> 
<td><b>responseCode</b></td> 
<td><b>responseMessage</b></td> 
</tr>

<tr> 
<td>969929157</td> 
<td>557454</td> 
<td>APPROVED</td> 
<td>APPROVED</td> 
<td>Aprobado y completado con éxito.</td> 
</tr>

<tr> 
<td>969929157</td> 
<td>000000</td> 
<td>DECLINED</td> 
<td>INVALID_TRANSACTION</td> 
<td>Operación denegada. OTP incorrecto.</td> 
</tr>

<tr> 
<td>999999999</td> 
<td>284563</td> 
<td>DECLINED</td> 
<td>NOT_ACCEPTED_TRANSACTION</td> 
<td>Operación denegada. Cuenta inactiva.</td> 
</tr>

<tr> 
<td>993355231</td> 
<td>784592</td> 
<td>DECLINED</td> 
<td>PAYMENT_NETWORK_REJECTED</td> 
<td>Operación denegada. Cuenta no permitida.</td> 
</tr>

<tr> 
<td>969929157</td> 
<td>285743</td> 
<td>DECLINED</td> 
<td>EXCEEDED_AMOUNT</td> 
<td>Límite diario excedido.</td> 
</tr>

<tr> 
<td>991055199</td> 
<td>378458</td> 
<td>DECLINED</td> 
<td>INVALID_TRANSACTION</td> 
<td>Operación denegada. OTP bloqueado.</td> 
</tr>

<tr> 
<td>995555126</td> 
<td>678452</td> 
<td>DECLINED</td> 
<td>INVALID_TRANSACTION</td> 
<td>Operación denegada. Cuenta no asociada al programa.</td> 
</tr>

<tr> 
<td>969929158</td> 
<td>528475</td> 
<td>DECLINED</td> 
<td>REPEAT_TRANSACTION</td> 
<td>Error: código Yape incorrecto.</td> 
</tr>

<tr> 
<td>969929158</td> 
<td>074854</td> 
<td>DECLINED</td> 
<td>REPEAT_TRANSACTION</td> 
<td>Error: código Yape incorrecto.</td> 
</tr>

<tr> 
<td>969929158</td> 
<td>875612</td> 
<td>DECLINED</td> 
<td>NOT_ACCEPTED_TRANSACTION</td> 
<td>Error: código Yape incorrecto.</td> 
</tr>

</table>

## Enviar transacciones utilizando efectivo {#submit-transactions-using-cash}
Este método te permite procesar los pagos en efectivo de tus clientes. Para integrarte con las transacciones en efectivo, debes redirigir a tu cliente a la URL que se encuentra en la respuesta. El cliente puede ver un resumen de la compra como se muestra en el siguiente ejemplo: 

<img src="/assets/Payments/CashReceiptPE.png" alt="PrintScreen" width="400">

### Parámetros para la solicitud y la respuesta {#parameters-for-request-and-response-2}

<details>
<summary>Solicitud (Request)</summary>
<label for="table3" class="showMandatory"><input type="checkbox" id="table3" name="table3" value="true" onchange="showMandatory(this)"> Mostrar solo campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Nombre del campo | Descripción | Obligatorio |
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
| transaction > order > additionalValues > TX_VALUE > value | Numérico | 12, 2 | Especifica el monto de la transacción, este valor puede tener dos dígitos decimales (Ej. `10000.00` o `10000`). | Sí |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Monto del impuesto a las ventas. | Sí |
| transaction > order > additionalValues > TX_TAX > value | Numérico | 12, 2 | Especifica el monto del impuesto a las ventas.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para calcular el impuesto.<br>Si el monto no tiene impuesto, envía 0.<br>Este valor puede tener dos dígitos decimales.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Numérico | 12, 2 | Especifica el monto base de la transacción. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > payer | Objeto |  | Información del pagador. | Sí |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Correo electrónico del pagador. | Sí |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identificador del pagador en tu sistema. | No |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nombre del pagador. | Sí |
| transaction > payer > billingAddress | Objeto |  | Dirección de facturación. | Sí |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Línea 1 de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Línea 2 de la dirección de facturación. | No |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Estado de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | Sí |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Código postal de la dirección de facturación. | No |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. | No |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Fecha de nacimiento del pagador. | No |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Número de teléfono del pagador. | Sí |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Número de identificación del pagador. | Sí |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver los tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alfanumérico | 32 | Como los pagos en efectivo se realizan en oficinas físicas, el único tipo de transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sí |
| transaction > paymentMethod | Alfanumérico | 32 | Selecciona un método de pago en efectivo válido. [Ver los métodos de pago disponibles para Perú]({{< ref "select-your-payment-method.html#Peru" >}}). |
| transaction > paymentCountry | Alfanumérico | 2 | Asigna `PE` para Perú. | Sí |
| transaction > expirationDate | Alfanumérico | 23 | Fecha y hora máxima en la que el cliente puede realizar el pago. Formato `YYYY-MM-DDTHH:MM:SS`, por ejemplo `2021-06-12T16:07:11.586`. | No |
| transaction > ipAddress | Alfanumérico | Max:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Nombre del campo | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| transactionResponse | Objeto |  | Datos de la respuesta. |
| transactionResponse > orderId | Numérico |  | Identificador generado o existente de la orden en PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | Identificador de la transacción en PayU. |
| transactionResponse > state | Alfanumérico | Max:32 | Estado de la transacción. Como el pago se realiza de forma externa, el estado de una transacción exitosa es `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | Código de respuesta retornado por la red bancaria. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | Mensaje de error retornado por la red bancaria. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | Código de trazabilidad retornado por la red bancaria. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | Código de autorización retornado por la red bancaria. |
| transactionResponse > pendingReason | Alfanumérico | Max:21 | Código de la razón asociada con el estado, como se mencionó en `transactionResponse > state`, la transacción está en espera del pagoCódigo de la razón asociada con el estado, como se mencionó en `transactionResponse > state`, la transacción está en espera del pago. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | Código de respuesta asociado con el estado. En este caso, para una transacción exitosa es `PENDING_TRANSACTION_CONFIRMATION`. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Mensaje asociado al código de respuesta. |
| transactionResponse > operationDate | Fecha |  | Fecha de creación de la respuesta en el sistema de PayU. |
| transactionResponse > extraParameters | Objeto |  | Parámetros adicionales o datos asociados a la respuesta.<br>En JSON, El parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"REFERENCE": "74794"`<br>`}`<br><br>En XML, El parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>REFERENCE</string>`<br>&emsp;&emsp;`<int>74794</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Consideraciones {#considerations-2}
* El parámetro `transaction.expirationDate` no es obligatorio. Si no envías este parámetro, su valor por defecto es siete (7) días luego de la fecha actual.<br>Si envías una fecha posterior a dicho número de días, PayU ignorará este valor y asignará el valor por defecto.
* Para los pagos en efectivo, los siguientes parámetros son obligatorios:
   - `transaction.order.buyer.fullName`
   - `transaction.payer.fullName`
   - `transaction.payer.emailAddress` o `transaction.order.buyer.emailAddress`.
* El parámetro `transactionResponse.extraParameters` tiene los siguientes parámetros relacionados con la transacción:
   - **REFERENCE**: referencia de pago interna generada por PayU.
   - **EXPIRATION_DATE**: fecha máxima en la que el pagador puede realizar el pago.
   - **BAR_CODE**: código de barras que le permite al pagador realizar el pago. 
   - **URL_PAYMENT_RECEIPT_HTML**: recibo de pago en formato HTML. Aquí es donde debe redirigir el pago cuando el pagador selecciona un método de pago en efectivo. 
   - **URL_PAYMENT_RECEIPT_PDF**: recibo de pago en formato PDF.

### Llamado del API {#api-call}
Los siguientes son los cuerpos de la solicitud y la respuesta para este método de pago.

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo de una solicitud:
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
         "accountId": "512323",
         "referenceCode": "PRODUCT_TEST_2021-06-21T16:39:10.965Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "af24b22ad0aa0b14dbe3c21a07d9558c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 100,
               "currency": "PEN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer  name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Isabel La Católica 103-La Victoria",
               "street2": "5555487",
               "city": "Lima",
               "state": "Lima y Callao",
               "country": "PE",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "5555487",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
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
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "125544",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
	  "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "PAGOEFECTIVO",
      "expirationDate": "2021-06-22T19:51:20.302",
      "paymentCountry": "PE",
      "ipAddress": "127.0.0.1"
   },
   "test": true
}
```
<br>

Ejemplo de una respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 857804123,
        "transactionId": "fd685f0a-f5b2-40cf-9527-dcc85febe184",
        "state": "PENDING",
        "paymentNetworkResponseCode": "Se ha Generado el CIP: 00000002592100 .",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "2592100",
        "authorizationCode": "1",
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": null,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "REFERENCE": 857804123,
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857804123Yfd685f0af5b240cYd231ed8660a7c9a",
            "EXPIRATION_DATE": 1624391480302,
            "BAR_CODE": "2592100",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857804123Yfd685f0af5b240cYd231ed8660a7c9a"
        },
        "additionalInfo": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo de una solicitud:
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
         <accountId>512323</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-21T16:39:10.965Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>af24b22ad0aa0b14dbe3c21a07d9558c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>100</value>
                  <currency>PEN</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <contactPhone>7563126</contactPhone>
            <dniNumber>123456789</dniNumber>
            <emailAddress>buyer_test@test.com</emailAddress>
            <fullName>First name and second buyer name</fullName>
            <merchantBuyerId>1</merchantBuyerId>
            <shippingAddress>
               <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>            
               <city>Lima</city>
               <state>Lima y Callao</state>               
               <country>PE</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>            
               <city>Lima</city>
               <state>Lima y Callao</state>               
               <country>PE</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <billingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>            
            <city>Lima</city>
            <state>Lima y Callao</state>               
            <country>PE</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <emailAddress>payer_test@test.com</emailAddress>
         <fullName>First name and second payer name</fullName>
         <merchantPayerId>1</merchantPayerId>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>PAGOEFECTIVO</paymentMethod>
      <expirationDate>2021-06-16T16:07:11</expirationDate>
      <paymentCountry>PE</paymentCountry>
      <ipAddress>127.0.0.1</ipAddress>
   </transaction>
   <isTest>false</isTest>
</request>

```
<br>

Ejemplo de una respuesta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>857804131</orderId>
        <transactionId>185f578b-2247-4a28-85b9-128c7b90c989</transactionId>
        <state>PENDING</state>
        <paymentNetworkResponseCode>Se ha Generado el CIP: 00000002592102 .</paymentNetworkResponseCode>
        <trazabilityCode>2592102</trazabilityCode>
        <authorizationCode>1</authorizationCode>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <extraParameters>
            <entry>
                <string>REFERENCE</string>
                <int>857804131</int>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857804131Y185f578b22474a2Y11601e067841b94</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-28T23:59:59</date>
            </entry>
            <entry>
                <string>BAR_CODE</string>
                <string>2592102</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857804131Y185f578b22474a2Y11601e067841b94</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Consultar métodos de pago disponibles {#available-payment-methods-query}
Este método retorna la lista de los métodos de pago disponibles en todos los paises.

### Parámetros para la solicitud y la respuesta {#available-payment-methods-query}

<details>
<summary>Solicitud (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Nombre del campo | Descripción |
|-|-|-|-|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). |
| command | Alfanumérico | Max:32 | Asigna `GET_PAYMENT_METHODS`. |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | 
| merchant | Objeto |  | Este objeto tiene los datos de autenticación. |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Nombre del campo | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| paymentMethods | Objeto |  | Lista de los métodos de pago. |
| paymentMethods > paymentMethodComplete | Objeto |  | Este objeto tiene la información de un método de pago. |
| paymentMethods > paymentMethodComplete > id | Numérico |  | Identificador del método de pago. |
| paymentMethods > paymentMethodComplete > description | Alfanumérico | Max:32 | Nombre del método de pago. |
| paymentMethods > paymentMethodComplete > country | Alfanumérico | 2 | Código ISO del país del método de pago. |

</details>

### Llamado del API {#api-call-1}
Los siguientes son los cuerpos de la solicitud y la respuesta para este método. Para el propósito de este ejemplo, la respuesta muestra dos métodos de pago.  

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo de una solicitud:
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

Ejemplo de una respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "paymentMethods": [
        {
            "id": "258",
            "description": "DINERS",
            "country": "PE",
            "enabled": true,
            "reason": null
        },
        {
            "id": "1067",
            "description": "VISA",
            "country": "PE",
            "enabled": true,
            "reason": null
        }
    ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo de una solicitud:
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

Ejemplo de una respuesta:
```XML
<paymentMethodsResponse>
    <code>SUCCESS</code>
    <paymentMethods>
        <paymentMethodComplete>
            <id>258</id>
            <description>DINERS</description>
            <country>PE</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>1067</id>
            <description>VISA</description>
            <country>PE</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
    </paymentMethods>
</paymentMethodsResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Ping
El método `PING` te permite verificar la conexión con nuestra plataforma.

### Parámetros para la solicitud y la respuesta {#parameters-for-request-and-response-3}

<details>
<summary>Solicitud (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Nombre del campo | Descripción |
|-|-|-|-|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). |
| command | Alfanumérico | Max:32 | Asigna `PING`. |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | 
| merchant | Objeto |  | Este objeto tiene los datos de autenticación. |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Nombre del campo | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado si ocurrió un error. |
| transactionResponse | transactionResponse | Max:2048 | La respuesta del método PING si ocurrió un error. |
</details>

### Llamado del API {#api-call-2}
Los siguientes son los cuerpos de la solicitud y la respuesta para este método.

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo de una solicitud:
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

Ejemplo de una respuesta:
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

Ejemplo de una solicitud:
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

Ejemplo de una respuesta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

