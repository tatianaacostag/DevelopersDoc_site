---
title: "API de Pagos - Colombia"
linkTitle: "API de Pagos - Colombia"
date: 2021-05-03T15:48:08-05:00
description: >
  El API de Pagos de Colombia le permite a tu tienda procesar diferentes tipos de transacciones con múltiples medios de pago.
weight: 20
tags: ["subtopic"]
---

Para integrarte con el API de Pagos de Colombia, apunta tus peticiones a las siguientes URLs de acuerdo con tu ambiente.

{{% alert title="URL" color="info"%}}
* Pruebas: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Producción: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Métodos disponibles {#available-methods}
El API de pagos incluye los siguiente métodos:

* [Enviar transacciones con tarjeta de crédito]({{< ref "#submit-transaction-with-credit-cards" >}})
* [Enviar transacciones en efectivo o referencia bancaria]({{< ref "#submit-transaction-with-cash-or-bank-reference" >}})
* [Enviar transacciones con transferencia bancaria (PSE)]({{< ref "#submit-transaction-with-bank-transfer-pse" >}})
* [Lista de Bancos - PSE]({{< ref "#bank-list---pse" >}})
* [Consultar medios de pago disponibles]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Nota" color="info"%}}
Para confirmar el estado de una transacción, puedes utilizar una de las siguientes opciones:
* Navega a la URL configurada en la variable `transaction.notifyUrl` o la opción _**URL de confirmación**_ ubicada en el Módulo PayU en _**Configuración**_ > _**Configuración técnica**_.
* Utiliza el [API o SDK de consultas]({{< ref "Queries.md" >}}).
{{% /alert %}}

## Enviar transacciones con tarjeta de crédito {#submit-transaction-with-credit-cards}
Este método te permite procesar pagos realizados por tus clientes utilizando tarjetas de crédito o débito. Para Brasil, puedes realizar los flujos de un paso (**Cobro**). Para más información, consulta los [flujos de pago]({{< ref "payments.md#payment-flows" >}}).

### Variables para la petición y la respuesta {#variables-for-request-and-response}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| merchant |  |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| transaction |  |  | Este objeto tiene los datos de la transacción. | Sí |
| transaction > order |  |  | Este objeto tiene los datos de la orden. | Sí |
| transaction > order > accountId | Numérico |  | Identificador de tu cuenta. | Sí |
| transaction > order > referenceCode | Alfanumérico | Min:1 Max:255 | Representa el identificador de la orden en tu sistema. | Sí |
| transaction > order > description | Alfanumérico | Min:1 Max:255 | Descripción de la orden. | Sí |
| transaction > order > language | Alfanumérico | 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí |
| transaction > order > notifyUrl | Alfanumérico | Max:2048 | URL de confirmación de la orden. | No |
| transaction > order > partnerId | Alfanumérico | Max:255 | ID de aliado dentro de PayUID de aliado dentro de PayU. | No |
| transaction > order > signature | Alfanumérico | Max:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| transaction > order > shippingAddress |  |  | Dirección de envío. | No |
| transaction > order > shippingAddress > street1 | Alfanumérico | Max:100 | Línea de dirección 1. | No |
| transaction > order > shippingAddress > street2 | Alfanumérico | Max:100 | Línea de dirección 2. | No |
| transaction > order > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección. | No |
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Departamento de la dirección. | No |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | País de la dirección. | No |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Código postal de la dirección. | No |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. | No |
| transaction > order > buyer |  |  | Información del comprador. | Sí |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Identificador del comprador en tu sistema. | No |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Nombre del comprador. | Sí |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | Correo electrónico del comprador. | Sí |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Número de teléfono del comprador. | Sí |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Número de identificación del comprador. | Sí |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Línea de dirección 1 del comprador. | Sí |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Departamento de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| transaction > order > buyer > shippingAddress > postalCode | Numérico | Max:20 | Código postal de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > phone | Numérico | Max:20 | Número de teléfono de la dirección del comprador. | Sí |
| transaction > order > additionalValues > |  | 64 | Monto de la orden y sus valores asociados. | Sí |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Monto de la transacción. | Sí |
| transaction > order > additionalValues > TX_VALUE > value | Numérico | 19, 2 | Especifica el monto de la transacción, este valor no puede tener decimales. | Sí |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Monto del IVA (Impuesto al Valor Agregado). | Sí |
| transaction > order > additionalValues > TX_TAX > value | Numérico | 19, 2 | Especifica el monto del IVA.<br>Si no se envía este parámetro, PayU aplica el impuesto actual (19%).<br>Si la cantidad está exenta de IVA, envía 0.<br>Este valor puede tener dos dígitos decimales  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para calcular el IVA.<br>Si la cantidad está exenta de IVA, envía 0.<br>Este valor puede tener dos dígitos decimales  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Numérico | 19, 2 | Especifica el valor base de la transacción. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > creditCardTokenId |  |  | Incluye este parámetro cuando la transacción se hace cun una tarjeta de crédito tokenizada; además, es obligatorio enviar el parámetro `transaction.creditCard.expirationDate`.<br>Para más información, consulte el [API de Tokenización]({{< ref "Tokenization-API.md" >}}). | No |
| transaction > creditCard |  |  | Información de la tarjeta de crédito. Este objeto y sus parámetros son obligatorios cuando el pago se realiza utilizando una tarjeta de crédito no tokenizada. | No |
| transaction > creditCard > number | Alfanumérico | Min:13 Max:20 | Número de la tarjeta de crédito. | No |
| transaction > creditCard > securityCode | Alfanumérico | Min:1 Max:4 | Código de seguridad de la tarjeta de crédito (CVC2, CVV2, CID). | No |
| transaction > creditCard > expirationDate | Alfanumérico | 7 | Fecha de expiración de la tarjeta de crédito. Formato `YYYY/MM`. | No |
| transaction > creditCard > name | Alfanumérico | Min:1 Max:255 | Nombre del tarjetahabiente mostrado en la tarjeta de crédito. | No |
| transaction > creditCard > processWithoutCvv2 | Booleano | Max:255 | Te permite procesar transacciones sin incluir el código de seguridad de la tarjeta de crédito. Tu comercio requiere autorización de PayU antes de utilizar esta funcionalidad. | No |
| transaction > payer |  |  | Información del pagador. | Sí |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Correo electrónico del pagador. | Sí |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identificador del pagador en tu sistema. | No |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nombre del pagador que debe ser igual al enviado en el parámetro `transaction.creditCard.name`. | Sí |
| transaction > payer > billingAddress |  |  | Dirección de facturación. | Sí |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Línea 1 de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Línea 2 de la dirección de facturación. | No |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Departamento de la dirección de facturación. | No |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | Sí |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Código postal de la dirección de facturación. | No |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. | No |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Fecha de nacimiento del pagador. | No |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Número de teléfono del pagador. | Sí |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Número de identificación del pagador. | Sí |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alfanumérico | 32 | Asigna este valor de acuerdo con el tipo de transacción. Para Colombia, asigna `AUTHORIZATION_AND_CAPTURE` | Sí |
| transaction > paymentMethod | Alfanumérico | 32 | Selecciona un medio de pago de Tarjeta de crédito valido. [Ver los medios de pago disponibles para Colombia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sí |
| transaction > paymentCountry | Alfanumérico | 2 | Asigna `CO` para Colombia. | Sí |
| transaction > deviceSessionId | Alfanumérico | Max:255 | Identificador de la sesión del dispositivo donde el cliente realiza la transacción. Para más información, consulta [este artículo]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| transaction > ipAddress | Alfanumérico | Max:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > cookie | Alfanumérico | Max:255 | Cookie almacenada por el dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > userAgent | Alfanumérico | Max:1024 | User agent del navegador donde el cliente realiza la transacción. | Sí |
| transaction > extraParameters |  |  | Parámetros adicionales o datos asociados a la petición. El tamaño máximo de cada nombre de _extraParameters_ es 64 caracteres.<br>En JSON, el parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>En XML, el parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | No |
| transaction > threeDomainSecure |  |  | Este objeto contiene la información de 3DS 2.0. | No |
| transaction > threeDomainSecure > embedded | Booleano |  | Asigna `true` si quieres utilizar un MPI embebido para el proceso de Autorización. Por defecto, este valor está asignado como `false`. | No |
| transaction > threeDomainSecure > eci | Numérico | Max:2 | Indicador de Comercio Electrónico.<br>Valor retornado por los servidores de directorio indicando el intento de autenticación.<br>Este parámetro es obligatorio cuando `transaction.threeDomainSecure.embedded` es `false` y `transaction.threeDomainSecure.xid` tiene un valor configurado. | No |
| transaction > threeDomainSecure > cavv | Alfanumérico | Max:28 | Valor de verificación de autenticación del titular de la tarjeta (Cardholder Authentication Verification Value).<br>Código del criptograma utilizado en la autenticación de la transacción codificado en Base 64.<br>Dependiendo de los códigos ECI específicos establecidos por la red, este valor puede ser opcional. | No |
| transaction > threeDomainSecure > xid | Alfanumérico | Max:28 | Identificador de la transacción enviado por el MPI codificado en Base 64.<br>Este parámetro es obligatorio cuando `transaction.threeDomainSecure.embedded` is `false` y `transaction.threeDomainSecure.eci` tiene un valor configurado. | No |
| transaction > threeDomainSecure > directoryServerTransactionId | Alfanumérico | Max:36 | Identificador de la transacción generador por el servidor de directorio durante la autenticación. | No |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| transactionResponse |  |  | Datos de la respuesta. |
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
| transactionResponse > extraParameters |  |  | Parámetros adicionales o datos asociados con la respuesta. <br>En JSON, el parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>En XML, el parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo |  |  | Información adicional de la respuesta. Este objeto tiene la misma estructura de `transactionResponse.extraParameters`. |

</details>

#### Consideraciones {#considerations}
* Para pagos con tókenes de tarjeta, incluya los parámetros `transaction.creditCardTokenId` y `transaction.creditCard.securityCode` (Si procesas con código de seguridad) reemplazando la información de la tarjeta de crédito. Para más información, consulta el [API de Tokenización]({{< ref "Tokenization-API.md" >}}).
* Por defecto, el procesamiento de tarjetas de crédito sin código de seguridad no está activo. Si lo quieres activar, contacta a tu representante de ventas. Luego de que esté activado, envía en la petición la variable `creditCard.processWithoutCvv2` con valor true y elimina la variable `creditCard.securityCode`.
* La variable `transaction.threeDomainSecure` no reemplaza la información de la tarjeta o ninguno de los campos obligatorios de la transacción. Este objeto es adicional y no es obligatorio.
* La variable `transaction.threeDomainSecure` corresponde a un escenario _Pass Through_ donde el comercio realiza la autenticación por su cuenta.
* Para la tarjeta Crédito Fácil Codensa, el número de cuotas soportadas es 1 a 12, 18, 24, 36 y 48.
* Para la tarjeta Crédito Fácil Codensa, el pagador puede escoger uno de los siguientes tipos de documento en la variable `transaction.payer.dniType`:

| ISO | Descripción                                                                                             |
|:---:|---------------------------------------------------------------------------------------------------------|
|  CC | Cédula de ciudadanía.                                                                                   |
|  CE | Cédula de extranjería.                                                                                  |
| NIT | Número de Identificación Tributaria (Empresas).                                                         |
|  TI | Tarjeta de identidad.                                                                                   |
|  PP | Pasaporte.                                                                                              |
| IDC | Identificador único de cliente, para el caso de ID’s únicos de clientes/usuarios de servicios públicos. |
| CEL | En caso de identificarse a través de la línea del móvil.                                                |
|  RC | Registro civil de nacimiento.                                                                           |
|  DE | Documento de identificación extranjero.                                                                 |

### Llamado del API {#api-call}
Los siguientes son los cuerpos de la petición y la respuesta para este medio de pago.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
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
         "accountId": "512321",
         "referenceCode": "PRODUCT_TEST_2021-06-23T19:59:43.229Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "1d6c33aed575c4974ad5c0be7c6a1c87",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 65000,
               "currency": "COP"
         },
            "TX_TAX": {
               "value": 10378,
               "currency": "COP"
         },
            "TX_TAX_RETURN_BASE": {
               "value": 54622,
               "currency": "COP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Cr 23 No. 53-50",
               "street2": "5555487",
               "city": "Bogotá",
               "state": "Bogotá D.C.",
               "country": "CO",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "5555487",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
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
            "street1": "Cr 23 No. 53-50",
            "street2": "125544",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
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
      "paymentCountry": "CO",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": true
}
```
<br>

Ejemplo respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400449660,
        "transactionId": "aa2f50b2-62a8-42de-b3be-c6fe08ec712f",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "81",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "CRED - 666039677",
        "authorizationCode": "123238",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Approved by the merchant",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624461913704,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT"
        },
        "additionalInfo": {
            "paymentNetwork": "CREDIBANCO",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": "CREDIT",
            "transactionType": "AUTHORIZATION_AND_CAPTURE"
        }
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
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <accountId>512321</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-23T19:59:43.229Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>1d6c33aed575c4974ad5c0be7c6a1c87</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>65000</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX</string>
               <additionalValue>
                  <value>10378</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX_RETURN_BASE</string>
               <additionalValue>
                  <value>54622</value>
                  <currency>COP</currency>
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
               <street1>Cr 23 No. 53-50</street1>
               <street2>5555487</street2>
               <city>Bogotá</city>
               <state>Bogotá D.C.</state>
               <country>CO</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
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
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
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
      <paymentCountry>CO</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Ejemplo respuesta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400449666</orderId>
        <transactionId>c29d0543-810d-48c4-bd3e-163e935c2173</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>79</paymentNetworkResponseCode>
        <trazabilityCode>CRED - 666116683</trazabilityCode>
        <authorizationCode>787517</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Approved administrative transaction</responseMessage>
        <operationDate>2021-06-23T10:26:28</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>CREDIBANCO</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <cardType>CREDIT</cardType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Enviar transacciones en efectivo o referencia bancaria {#submit-transaction-with-cash-or-bank-reference}
Este método te permite procesar los pagos en efectivo o por referencia bancaria de tus clientes. Para integrarte con estas transacciones, debes redirigir a tu cliente a la URL que se encuentra en la respuesta; tu cliente ve un recibo de pago como los siguientes.

#### Pagos en efectivo {#payments-in-cash}
<img src="/assets/Payments/CashReceiptCO.png" alt="PrintScreen" width="75%">

#### Pagos con Referencia bancaria {#payments-with-bank-reference}
<img src="/assets/Payments/BankReferenceReceiptCO.png" alt="PrintScreen" width="75%">

### Variables para la petición y la respuesta {#variables-for-request-and-response-1}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| merchant |  |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| transaction |  |  | Este objeto tiene los datos de la transacción. | Sí |
| transaction > order |  |  | Este objeto tiene los datos de la orden. | Sí |
| transaction > order > accountId | Numérico |  | Identificador de tu cuenta. | Sí |
| transaction > order > referenceCode | Alfanumérico | Min:1 Max:255 | Representa el identificador de la orden en tu sistema. | Sí |
| transaction > order > description | Alfanumérico | Min:1 Max:255 | Descripción de la orden. | Sí |
| transaction > order > language | Alfanumérico | 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí |
| transaction > order > notifyUrl | Alfanumérico | Max:2048 | URL de confirmación de la orden. | No |
| transaction > order > partnerId | Alfanumérico | Max:255 | ID de aliado dentro de PayUID de aliado dentro de PayU. | No |
| transaction > order > signature | Alfanumérico | Max:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| transaction > order > shippingAddress |  |  | Dirección de envío. | No |
| transaction > order > shippingAddress > street1 | Alfanumérico | Max:100 | Línea de dirección 1. | No |
| transaction > order > shippingAddress > street2 | Alfanumérico | Max:100 | Línea de dirección 2. | No |
| transaction > order > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección. | No |
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Departamento de la dirección. | No |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | País de la dirección. | No |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Código postal de la dirección. | No |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. | No |
| transaction > order > buyer |  |  | Información del comprador. | Sí |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Identificador del comprador en tu sistema. | No |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Nombre del comprador. | Sí |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | Correo electrónico del comprador. | Sí |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Número de teléfono del comprador. | Sí |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Número de identificación del comprador. | Sí |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Línea de dirección 1 del comprador. | Sí |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección del comprador. | Sí | 
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Departamento de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| transaction > order > buyer > shippingAddress > postalCode | Numérico | Max:20 | Código postal de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > phone | Numérico | Max:20 | Número de teléfono de la dirección del comprador. | Sí |
| transaction > order > additionalValues > |  | 64 | Amount of the order or its associated values. | Sí |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Monto de la transacción. | Sí |
| transaction > order > additionalValues > TX_VALUE > value | Numérico | 19, 2 | Especifica el monto de la transacción, este valor puede tener dos dígitos decimales (Ej. `10000.00` o `10000`). | Sí |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Monto del IVA (Impuesto al Valor Agregado). | Sí |
| transaction > order > additionalValues > TX_TAX > value | Numérico | 19, 2 | Especifica el monto del IVA.<br>Si no se envía este parámetro, PayU aplica el impuesto actual (19%).<br>Si la cantidad está exenta de IVA, envía 0.<br>Este valor puede tener dos dígitos decimales.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para calcular el IVA.<br>Si la cantidad está exenta de IVA, envía 0.<br>Este valor puede tener dos dígitos decimales  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Numérico | 19, 2 | Especifica el valor base de la transacción. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > payer |  |  | Información del pagador. | Sí |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Correo electrónico del pagador. | Sí |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identificador del pagador en tu sistema. | No |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nombre del pagador. | Sí |
| transaction > payer > billingAddress |  |  | Dirección de facturación. | Sí |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Línea 1 de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Línea 2 de la dirección de facturación. | No |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Departamento de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | Sí |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Código postal de la dirección de facturación. | No |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. | No |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Fecha de nacimiento del pagador. | No |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Número de teléfono del pagador. | Sí |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Número de identificación del comprador. | Sí |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alfanumérico | 32 | Como los pagos en efectivo se realizan en oficinas físicas, la única transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sí |
| transaction > paymentMethod | Alfanumérico | 32 | Seleccione un medio de pago en efectivo o de referencia bancaria válido. [Ver los medios de pago disponibles para Colombia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sí |
| transaction > paymentCountry | Alfanumérico | 2 | Asigna `CO` para Colombia. | Sí |
| transaction > expirationDate | Alfanumérico | 23 | Fecha y hora máxima en la que el cliente puede realizar el pago. Formato `YYYY-MM-DDTHH:MM:SS`, por ejemplo `2021-06-12T16:07:11.586`. | No |
| transaction > ipAddress | Alfanumérico | Max:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| transactionResponse |  |  | Datos de la respuesta. |
| transactionResponse > orderId | Numérico |  | Identificador generado o existente de la orden en PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | Identificador de la transacción en PayU. |
| transactionResponse > state | Alfanumérico | Max:32 | Estado de la transacción. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | Código de respuesta retornado por la red bancaria. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | Mensaje de error retornado por la red bancaria. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | Código de trazabilidad retornado por la red bancaria. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | Código de autorización retornado por la red bancaria. |
| transactionResponse > pendingReason | Alfanumérico | Max:21 | Código de la razón asociada con el estado, como se mencionó en  `transactionResponse > state`, la transacción está en espera del pago. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | Código de respuesta asociado con el estado. En este caso, para una transacción exitosa es `PENDING_TRANSACTION_CONFIRMATION`. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Mensaje asociado al código de respuesta. |
| transactionResponse > operationDate | Fecha |  | Fecha de creación de la respuesta en el sistema de PayU. |
| transactionResponse > extraParameters |  |  | Parámetros adicionales o datos asociados con la respuesta.<br>En JSON, el parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"REFERENCE": "74794"`<br>`}`<br><br>En XML, el parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>REFERENCE</string>`<br>&emsp;&emsp;`<int>74794</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo |  |  | Información adicional de la respuesta. Este objeto tiene la misma estructura de `transactionResponse.extraParameters`. |

</details>

#### Consideraciones {#considerations-1}
* El parámetro `transaction.expirationDate` no es obligatorio. Si no envías este parámetro, su valor por defecto es siete (7) días luego de la fecha actual.<br>Si envías una fecha posterior a dicho número de días, PayU ignorará este valor y asignará el valor por defecto.
* Para `BALOTO` y `EFECTY`, la confirmación del pago tarda 15 minutos. Para `BANK_REFERENCED` y `OTHERS_CASH` (Su Red), la confirmación es en línea.
* Los valores mínimos de máximos para pagos en `BALOTO`, `EFECTY` y `OTHERS_CASH` (Su Red) son:
   - `BALOTO` > Min: $3.000 COP - Max: $1.000.000 COP
   - `EFECTY` > Min: $20.000 COP - Max: $6.000.000 COP
   - `OTHERS_CASH` (Su Red) > Min: $1.000 COP - Max: $4.000.000 COP
* El parámetro `transactionResponse.extraParameters` tiene los siguientes parámetros relacionados con la transacción:
   - **EXPIRATION_DATE**: maximum term for the payer to perform the payment.   
   - **REFERENCE**: internal payment reference generated by PayU.
   - **URL_PAYMENT_RECEIPT_HTML**: payment receipt in HTML format. This is where you need to redirect the payment when the payer selects cash payment. 
   - **URL_PAYMENT_RECEIPT_PDF**: payment receipt in PDF format.

### Llamado del API {#api-call-1}
Los siguientes son los cuerpos de la petición y la respuesta para este medio de pago.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
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
         "accountId": "512321",
         "referenceCode": "PRODUCT_TEST_2021-06-23T19:59:43.229Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "1d6c33aed575c4974ad5c0be7c6a1c87",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 65000,
               "currency": "COP"
         },
            "TX_TAX": {
               "value": 10378,
               "currency": "COP"
         },
            "TX_TAX_RETURN_BASE": {
               "value": 54622,
               "currency": "COP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Cr 23 No. 53-50",
               "street2": "5555487",
               "city": "Bogotá",
               "state": "Bogotá D.C.",
               "country": "CO",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "5555487",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
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
            "street1": "Cr 23 No. 53-50",
            "street2": "125544",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "EFECTY",
      "expirationDate": "2021-06-24T20:58:35.804",
      "paymentCountry": "CO",
      "ipAddress": "127.0.0.1"
   },
   "test": false
}
```
<br>

Ejemplo respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400449740,
        "transactionId": "f3531b6a-3e30-4a8b-8a69-d4a5bd2a3377",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "f3531b6a-3e30-4a8b-8a69-d4a5bd2a3377",
        "authorizationCode": null,
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624463917065,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "EXPIRATION_DATE": 1624568315804,
            "REFERENCE": 1400449740,
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=1400449740Yf3531b6a3e304a8Y30f3f7b4598eb19",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app/v2?vid=1400449740Yf3531b6a3e304a8Y30f3f7b4598eb19"
        },
        "additionalInfo": {
            "paymentNetwork": "EFECTY",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": null,
            "transactionType": "AUTHORIZATION_AND_CAPTURE"
        }
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
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <accountId>512321</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-23T19:59:43.229Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>1d6c33aed575c4974ad5c0be7c6a1c87</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>65000</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX</string>
               <additionalValue>
                  <value>10378</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX_RETURN_BASE</string>
               <additionalValue>
                  <value>54622</value>
                  <currency>COP</currency>
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
               <street1>Cr 23 No. 53-50</street1>
               <street2>5555487</street2>
               <city>Bogotá</city>
               <state>Bogotá D.C.</state>
               <country>CO</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
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
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>EFECTY</paymentMethod>
      <expirationDate>2021-06-24T20:58:35.804</expirationDate>
      <paymentCountry>CO</paymentCountry>
      <ipAddress>127.0.0.1</ipAddress>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Ejemplo respuesta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400449797</orderId>
        <transactionId>0b41f4d0-4486-4acf-ab5e-d757e35d994d</transactionId>
        <state>PENDING</state>
        <trazabilityCode>0b41f4d0-4486-4acf-ab5e-d757e35d994d</trazabilityCode>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <operationDate>2021-06-23T11:20:03</operationDate>
        <extraParameters>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-30T23:59:59</date>
            </entry>
            <entry>
                <string>REFERENCE</string>
                <int>1400449797</int>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=1400449797Y0b41f4d044864acY3e5f14fc8ef00e8</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app/v2?vid=1400449797Y0b41f4d044864acY3e5f14fc8ef00e8</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>EFECTY</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Enviar transacciones con transferencia bancaria (PSE) {#submit-transaction-with-bank-transfer-pse}
Este método te permite procesar los pagos realizados por tus clientes por medio de transferencia bancaria. En Colombia, las transferencias bancarias se hacen a través de PSE, para integrarte con este medio de pago, necesitas crear un formulario de pago siguiendo estos pasos:

1. Incluye un botón PSE button haciendo evidente que tu cliente va a utilizar _Proveedor de Servicios Electrónicos PSE_.
* Puedes utilizar los siguientes nombres:
    - Débito desde cuenta corriente/ahorros
    - Debito bancario PSE
    - PSE
* No utilices ninguno de los siguientes nombres
    - Transferencia bancaria
    - Débito de cuenta
    - Tarjeta débito

2. Consulta la lista de bancos disponibles para mostrarla al pagador. Para consultar la lista de bancos, consulta [este método]({{< ref "#bank-list---pse" >}}).<br>Debes actualizar la lista de bancos en tu sistema por lo menos una vez al día.

3. Muestra la lista de bancos tal y como se muestra a continuación:

<img src="/assets/Payments/PSEBankList_ES.png" alt="PrintScreen" width="50%"><br>

Cuando el pagador seleccione un banco, debes enviar al parámetro `pseCode` seleccionado en el extra parámetro `FINANCIAL_INSTITUTION_CODE` de la petición.

4. Muestra una lista para que el pagador escoja si es una persona _Natural_ (N) o _Jurídica_ (J). Dependiendo de lo que escoja, debes enviar el valor en el extra parámetro `USER_TYPE` de la petición. La lista debe verse así:

<img src="/assets/Payments/PSEPersonList_ES.png" alt="PrintScreen" width="50%"><br>

5. Muestra una lista para que el pagador escoja su tipo de identificación. Debes enviar el código ISO del valor seleccionado en el extra parámetro `PSE_REFERENCE2` de la petición. La lista debe verse así:

<img src="/assets/Payments/PSEDocType_ES.png" alt="PrintScreen" width="50%"><br>

La lista de documentos disponibles es:

| ISO | Descripción                                                                                             |
|:---:|---------------------------------------------------------------------------------------------------------|
|  CC | Cédula de ciudadanía.                                                                                   |
|  CE | Cédula de extranjería.                                                                                  |
| NIT | Número de Identificación Tributaria (Empresas).                                                         |
|  TI | Tarjeta de identidad.                                                                                   |
|  PP | Pasaporte.                                                                                              |
| IDC | Identificador único de cliente, para el caso de ID’s únicos de clientes/usuarios de servicios públicos. |
| CEL | En caso de identificarse a través de la línea del móvil.                                                |
|  RC | Registro civil de nacimiento.                                                                           |
|  DE | Documento de identificación extranjero.                                                                 |

6. Debes enviar el número de identificación del pagador en el extra parámetro `PSE_REFERENCE3` de la petición.

### Variables para la petición y la respuesta {#variables-for-request-and-response-2}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| merchant |  |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| transaction |  |  | Este objeto tiene los datos de la transacción. | Sí |
| transaction > order |  |  | Este objeto tiene los datos de la orden. | Sí |
| transaction > order > accountId | Numérico |  | Identificador de tu cuenta. | Sí |
| transaction > order > referenceCode | Alfanumérico | Min:1 Max:255 | Representa el identificador de la orden en tu sistema. | Sí |
| transaction > order > description | Alfanumérico | Min:1 Max:255 | Descripción de la orden. | Sí |
| transaction > order > language | Alfanumérico | 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí |
| transaction > order > notifyUrl | Alfanumérico | Max:2048 | URL de confirmación de la orden. | No|
| transaction > order > partnerId | Alfanumérico | Max:255 | ID de aliado dentro de PayUID de aliado dentro de PayU. | No |
| transaction > order > signature | Alfanumérico | Max:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| transaction > order > shippingAddress |  |  | Dirección de envío. | No |
| transaction > order > shippingAddress > street1 | Alfanumérico | Max:100 | Línea de dirección 1. | No |
| transaction > order > shippingAddress > street2 | Alfanumérico | Max:100 | Línea de dirección 2. | No |
| transaction > order > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección. | No |
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Departamento de la dirección. | No |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | País de la dirección. | No |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Código postal de la dirección. | No |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. | No |
| transaction > order > buyer |  |  | Información del comprador. | Sí |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Identificador del comprador en tu sistema. | No |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Nombre del comprador. | Sí |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | Correo electrónico del comprador. | Sí |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Número de teléfono del comprador. | Sí |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Número de identificación del comprador. | Sí |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Línea de dirección 1 del comprador. | Sí |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Departamento de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| transaction > order > buyer > shippingAddress > postalCode | Numérico | Max:20 | Código postal de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > phone | Numérico | Max:20 | Número de teléfono de la dirección del comprador. | Sí |
| transaction > order > additionalValues > |  | 64 | Amount of the order or its associated values. | Sí |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Monto de la transacción. | Sí |
| transaction > order > additionalValues > TX_VALUE > value | Numérico | 19, 2 | Especifica el monto de la transacción, este valor puede tener dos dígitos decimales (Ej. `10000.00` o `10000`). | Sí |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| transaction > payer |  |  | Información del pagador. | Sí |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Correo electrónico del pagador. | Sí |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identificador del pagador en tu sistema. | No |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nombre del pagador. | Sí |
| transaction > payer > billingAddress |  |  | Dirección de facturación. | Sí |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Línea 1 de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Línea 2 de la dirección de facturación. | No |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Departamento de la dirección de facturación. | No |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | Sí |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Código postal de la dirección de facturación. | No |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. | No |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Fecha de nacimiento del pagador. | No |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Número de teléfono del pagador. | Sí |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Número de identificación del comprador. | Sí |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alfanumérico | 32 | Como estos pagos se realizan en la página web de PSE, la única transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Yes |
| transaction > paymentMethod | Alfanumérico | 32 | Selecciona un medio de pago por transferencia bancaria válido. [Ver los medios de pago disponibles para Colombia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sí |
| transaction > paymentCountry | Alfanumérico | 2 | Asigna `CO` para Colombia. | Sí |
 | transaction > deviceSessionId | Alfanumérico | Max:255 | Identificador de la sesión del dispositivo donde el cliente realiza la transacción. Para más información, consulta [este artículo]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| transaction > ipAddress | Alfanumérico | Max:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > cookie | Alfanumérico | Max:255 | Cookie almacenada por el dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > userAgent | Alfanumérico | Max:1024 | User agent del navegador donde el cliente realiza la transacción. | Sí |
| transaction > extraParameters |  |  | Parámetros adicionales o datos asociados a la petición. <br>Para pagos por transferencia bancaria, esta es la página de respuesta de tu comercio.<br>En JSON, el parámetro _extraParameters_ se asigna como: <br>`"extraParameters": {`<br>&emsp;`"PSE_REFERENCE3": "123456789"`<br>`}`<br><br>En XML, el parámetro _extraParameters_ se asigna como: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>PSE_REFERENCE3</string>`<br>&emsp;&emsp;`<string>123456789</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` | No |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| transactionResponse |  |  | Datos de la respuesta. |
| transactionResponse > orderId | Numérico |  | Identificador generado o existente de la orden en PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | Identificador de la transacción en PayU. |
| transactionResponse > state | Alfanumérico | Max:32 | Estado de la transacción. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | Código de respuesta retornado por la red bancaria. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | Mensaje de error retornado por la red bancaria. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | Código de trazabilidad retornado por la red bancaria. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | Código de autorización retornado por la red bancaria. |
| transactionResponse > pendingReason | Alfanumérico | Max:21 | Código de la razón asociada con el estado, como se mencionó en  `transactionResponse > state`, la transacción está en espera del pago. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | Código de respuesta asociado con el estado. En este caso, para una transacción exitosa es `PENDING_TRANSACTION_CONFIRMATION`. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Mensaje asociado al código de respuesta. |
| transactionResponse > operationDate | Fecha |  | Fecha de creación de la respuesta en el sistema de PayU. |
| transactionResponse > extraParameters |  |  | Parámetros adicionales o datos asociados con la respuesta.<br>En JSON, el parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"BANK_URL": "xxxx"`<br>`}`<br><br>En XML, el parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_URL</string>`<br>&emsp;&emsp;`<string>xxxx</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Considerations
* Para probar las transferencias bancarias PSE en el ambiente de Sandbox de PayU, consulta la [Guía de pruebas de PSE (PDF)](/assets/pse-test-guide-v5-es.pdf).
* Todos los valores de pago deben estar formateados en miles sin excepción (p.ej., 1,200.00 o 1,200).
* Si la solicitud de pago es exitosa, el estado de la transacción es pendiente (`PENDING`) y el responseCode es `PENDING_TRANSACTION_CONFIRMATION`; esto es debido a que el pagador es redirigido al naco seleccionado para completar el pago; debes redirigir al pagador a la URL retornada en el extra parámetro `BANK_URL`.
* La URL retornada en el extra parámetro `BANK_URL` se configura en el Modulo PayU y debe mostrar la siguiente información:<br><br>![PrintScreen](/assets/Payments/PSEresponse-es.png)<br>Los parámetros que empiezan con el símbolo $ se envían vía `GET`.
* Una vez el cliente hace clic en el botón de pago, debe desactivarse para evitar enviar una nueva solicitud sobre el mismo pago.
* No muestres la página del banco en contenedores (frames, panel, iframes, etc). El proceso de pago debe ser fluido. Además, evita abrir la página del banco en una nueva pestaña o en una nueva ventana del navegador. Si necesitas utilizar una nueva pestaña o ventana, bloquea la página de origen para evitar enviar una nueva solicitud sobre el mismo pago.
* Debes agregar a la página de respuesta las opciones para reintentar el pago, finalizar la transacción e imprimir el recibo.
* Los estados mostrados en la página de respuesta pueden ser los siguientes:

| polTransactionState | polResponseCode | Estado                                                                           |
|---------------------|-----------------|----------------------------------------------------------------------------------|
| 4                   | 1               | Transacción aprobada                                                             |
| 6                   | 5               | Transacción fallida                                                              |
| 6                   | 4               | Transacción rechazada                                                            |
| 12 o 14             | 9994 o 25       | Transacción pendiente, por favor revisar si el débito fue realizado en el banco. |

## Llamado del API {#api-call-2}
Los siguientes son los cuerpos de la petición y la respuesta para este medio de pago.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
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
         "accountId": "512321",
         "referenceCode": "PRODUCT_TEST_2021-06-23T19:59:43.229Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "1d6c33aed575c4974ad5c0be7c6a1c87",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 65000,
               "currency": "COP"
         },
            "TX_TAX": {
               "value": 10378,
               "currency": "COP"
         },
            "TX_TAX_RETURN_BASE": {
               "value": 54622,
               "currency": "COP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Cr 23 No. 53-50",
               "street2": "5555487",
               "city": "Bogotá",
               "state": "Bogotá D.C.",
               "country": "CO",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "5555487",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
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
            "street1": "Cr 23 No. 53-50",
            "street2": "125544",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "extraParameters": {
         "RESPONSE_URL": "http://www.payu.com/response",
         "PSE_REFERENCE1": "127.0.0.1",
         "FINANCIAL_INSTITUTION_CODE": "1022",
         "USER_TYPE": "N",
         "PSE_REFERENCE2": "CC",
         "PSE_REFERENCE3": "123456789"
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "PSE",
      "paymentCountry": "CO",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": false
}
```
<br>

Ejemplo respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400449959,
        "transactionId": "4d49e544-e23f-474e-92b1-59357e0e85e8",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "2204682",
        "authorizationCode": null,
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624471332753,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "TRANSACTION_CYCLE": "1",
            "BANK_URL": "https://sandbox.api.payulatam.com/payments-api/pse-caller?enc=aHR0cHM6Ly9yZWdpc3Ryby5kZXNhcnJvbGxvLnBzZS5jb20uY28vUFNFVXNlclJlZ2lzdGVyL1N0YXJ0VHJhbnNhY3Rpb24uYXNweD9lbmM9dG5QY0pITUtsU25tUnBITThmQWJ1NHVWTmt6YW92Q0tWR2g0b0IxbEpkOXNEeGlSU2E5cXl1Uk5TUW5mbkxSdiMjcGF5ZXJfdGVzdEB0ZXN0LmNvbSMjMTIzNDU2Nzg5IyNDQw=="
        },
        "additionalInfo": {
            "paymentNetwork": "PSE",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": null,
            "transactionType": "AUTHORIZATION_AND_CAPTURE"
        }
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
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <accountId>512321</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-23T19:59:43.229Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>1d6c33aed575c4974ad5c0be7c6a1c87</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>65000</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX</string>
               <additionalValue>
                  <value>10378</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX_RETURN_BASE</string>
               <additionalValue>
                  <value>54622</value>
                  <currency>COP</currency>
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
               <street1>Cr 23 No. 53-50</street1>
               <street2>5555487</street2>
               <city>Bogotá</city>
               <state>Bogotá D.C.</state>
               <country>CO</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
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
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <extraParameters>
         <entry>
            <string>RESPONSE_URL</string>
            <string>http://www.payu.com/response</string>
         </entry>
         <entry>
            <string>PSE_REFERENCE1</string>
            <string>127.0.0.1</string>
         </entry>
         <entry>
            <string>FINANCIAL_INSTITUTION_CODE</string>
            <string>1022</string>
         </entry>
         <entry>
            <string>USER_TYPE</string>
            <string>N</string>
         </entry>
         <entry>
            <string>PSE_REFERENCE2</string>
            <string>CC</string>
         </entry>
         <entry>
            <string>PSE_REFERENCE3</string>
            <string>123456789</string>
         </entry>
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>PSE</paymentMethod>
      <paymentCountry>CO</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Ejemplo respuesta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400449974</orderId>
        <transactionId>6c99b11b-fe6f-4270-8c9a-dfc35b7c7e34</transactionId>
        <state>PENDING</state>
        <trazabilityCode>2204695</trazabilityCode>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <operationDate>2021-06-23T13:12:14</operationDate>
        <extraParameters>
            <entry>
                <string>TRANSACTION_CYCLE</string>
                <string>1</string>
            </entry>
            <entry>
                <string>BANK_URL</string>
                <string>https://sandbox.api.payulatam.com/payments-api/pse-caller?enc=aHR0cHM6Ly9yZWdpc3Ryby5kZXNhcnJvbGxvLnBzZS5jb20uY28vUFNFVXNlclJlZ2lzdGVyL1N0YXJ0VHJhbnNhY3Rpb24uYXNweD9lbmM9dG5QY0pITUtsU25tUnBITThmQWJ1NHVWTmt6YW92Q0tWR2g0b0IxbEpkJTJmSGhQT0oyU2t4UnRmOEdLTk5tcGNYIyNwYXllcl90ZXN0QHRlc3QuY29tIyMxMjM0NTY3ODkjI0ND</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>PSE</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Lista de Bancos - PSE {#bank-list---pse}
Este método retorna la lista de bancos disponibles para realizar [pagos utilizando PSE]({{< ref "#submit-transaction-with-bank-transfer-pse" >}}). 

### Variables para la petición y la respuesta {#variables-for-request-and-response-3}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `GET_BANKS_LIST`. | Sí |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| merchant |  |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| bankListInformation |  |  | Este objeto tiene la información de la consulta. | Sí |
| bankListInformation > paymentMethod | Alfanumérico | | Asigna `PSE`. | Sí |
| bankListInformation > paymentCountry | Alfanumérico | | Asigna `CO`. | Sí |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| banks |  |  | Lista de bancos disponibles en PSE. |
| banks > id | Numeric |  | Identificador interno del banco. |
| banks > description | Alfanumérico |  | Nombre del banco para ser mostrado en la lista. |
| banks > pseCode | Alfanumérico |  | Código para enviar en el extra parámetro `FINANCIAL_INSTITUTION_CODE` de la solicitud de pago. |

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
   "command": "GET_BANKS_LIST",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "test": false,
   "bankListInformation": {
      "paymentMethod": "PSE",
      "paymentCountry": "CO"
   }
}
```
<br>

Ejemplo respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "banks": [
        {
            "id": "34e6e912-a395-4d31-9599-9baa176c1a61",
            "description": "A continuación seleccione su banco",
            "pseCode": "0"
        },
        {
            "id": "033aec11-e068-4252-8043-237144be9233",
            "description": "BAN.CO",
            "pseCode": "1552"
        },
        {
            "id": "a720cb4c-6549-4932-83be-6d72b3eb0016",
            "description": "BANCAMIA",
            "pseCode": "1059"
        },
        {
            "id": "d9280852-47a5-4e99-94ac-3d7648ba79a3",
            "description": "BANCO AGRARIO",
            "pseCode": "1040"
        },
        {
            "id": "ff216e8a-28ba-4bf6-9935-b94dfdfd96a0",
            "description": "BANCO AGRARIO DESARROLLO",
            "pseCode": "1081"
        },
        {
            "id": "5073154e-efd4-4870-9315-abb926e87519",
            "description": "BANCO AGRARIO QA DEFECTOS",
            "pseCode": "1080"
        },
        {
            "id": "6e61a91d-58bf-46ec-aa09-1f44974dda7e",
            "description": "BANCO CAJA SOCIAL",
            "pseCode": "10322"
        },
        {
            "id": "e062711e-6bbd-4a13-819a-d60084f9c6fa",
            "description": "BANCO CAJA SOCIAL DESARROLLO",
            "pseCode": "1032"
        },
        {
            "id": "a9b5cc17-b0ae-4708-9835-586a0bef95df",
            "description": "BANCO COMERCIAL AVVILLAS S.A.",
            "pseCode": "1052"
        },
        {
            "id": "c5c97dfe-6101-453f-bcd4-691f4b329a3c",
            "description": "BANCO COOMEVA S.A. - BANCOOMEVA",
            "pseCode": "1061"
        },
        {
            "id": "7a2e8d04-e8c8-404b-8e49-d5d37c107a12",
            "description": "BANCO COOPERATIVO COOPCENTRAL",
            "pseCode": "1066"
        },
        {
            "id": "197fe0af-f658-4fe0-ad1b-952e174de549",
            "description": "BANCO CREDIFINANCIERA",
            "pseCode": "1058"
        },
        {
            "id": "b1de44f1-cede-4aca-9d3f-3313d5cc0c63",
            "description": "BANCO DAVIVIENDA",
            "pseCode": "1051"
        },
        {
            "id": "7a10219e-04a7-4c31-b747-54ded27c7f07",
            "description": "BANCO DAVIVIENDA Desarrollo",
            "pseCode": "10512"
        },
        {
            "id": "ed06f40e-a1b9-4e48-8851-bffb4cda0480",
            "description": "BANCO DE BOGOTA",
            "pseCode": "1039"
        },
        {
            "id": "4592a13b-6334-4fba-8402-9d006b599fa8",
            "description": "BANCO DE BOGOTA DESARROLLO 2013",
            "pseCode": "1001"
        },
        {
            "id": "55f59084-cd3b-47d2-a420-6442cdb9e4b1",
            "description": "BANCO DE OCCIDENTE",
            "pseCode": "1023"
        },
        {
            "id": "8e134fca-4fde-44e6-b012-55e8f2d338ca",
            "description": "BANCO FALABELLA",
            "pseCode": "1062"
        },
        {
            "id": "8eb03abf-5608-419b-8d2c-9d90b8ab6b88",
            "description": "BANCO GNB COLOMBIA (ANTES HSBC)",
            "pseCode": "1010"
        },
        {
            "id": "283e0068-749f-43f1-a2e5-340910f41af3",
            "description": "BANCO GNB SUDAMERIS",
            "pseCode": "1012"
        },
        {
            "id": "8b0bf5e7-394d-4f7e-a467-e4d21d04c9fb",
            "description": "BANCO PICHINCHA S.A.",
            "pseCode": "1060"
        },
        {
            "id": "beeb494a-4ce5-41b4-b497-0756f0b6a6d9",
            "description": "BANCO POPULAR",
            "pseCode": "1002"
        },
        {
            "id": "a5a4b740-1644-4627-ae2a-41b13ffc7c5e",
            "description": "BANCO PRODUCTOS POR SEPARADO",
            "pseCode": "1203"
        },
        {
            "id": "47e747ef-c817-4be6-9eff-b6b16f50d001",
            "description": "Banco PSE",
            "pseCode": "1101"
        },
        {
            "id": "589939d7-06d1-4933-a101-8bb29b801d76",
            "description": "BANCO SANTANDER COLOMBIA",
            "pseCode": "1065"
        },
        {
            "id": "fcdaa98e-99ce-4e76-a504-1e053a05e773",
            "description": "BANCO SERFINANZA",
            "pseCode": "1069"
        },
        {
            "id": "201608c6-81de-436f-967a-2ec7c212c100",
            "description": "BANCO TEQUENDAMA",
            "pseCode": "1035"
        },
        {
            "id": "a8f33ba3-0053-464a-afbe-9add7c63fbc3",
            "description": "Banco union Colombia Credito",
            "pseCode": "1004"
        },
        {
            "id": "5dfa1b2c-64bd-4e8c-9fad-585337cfd4ff",
            "description": "BANCO UNION COLOMBIANO",
            "pseCode": "1022"
        },
        {
            "id": "56e306ef-6011-4f41-9640-b98449d6a6be",
            "description": "BANCO UNION COLOMBIANO FD2",
            "pseCode": "1005"
        },
        {
            "id": "bc883c0d-3610-4a88-96ca-2e2baa1dd2e5",
            "description": "Banco Web Service ACH",
            "pseCode": "1055"
        },
        {
            "id": "4e97e580-fc92-47ea-af4f-7b3b3ddffff8",
            "description": "Banco Web Service ACH WSE 3.0",
            "pseCode": "1055"
        },
        {
            "id": "931f6bfb-283e-4721-bb86-4a7484bfd28e",
            "description": "BANCOLOMBIA DATAPOWER",
            "pseCode": "10072"
        },
        {
            "id": "1285de9c-8d47-49f7-b00a-e87882e2a3f9",
            "description": "BANCOLOMBIA DESARROLLO",
            "pseCode": "10071"
        },
        {
            "id": "451f0e5f-5db4-4f55-a1fc-b38e06526e04",
            "description": "BANCOLOMBIA QA",
            "pseCode": "1007"
        },
        {
            "id": "448e00ec-c479-497d-9a35-0dfbbf462f72",
            "description": "BANKA",
            "pseCode": "1077"
        },
        {
            "id": "5f3a7adb-b283-4ca3-bee9-741f1306a03d",
            "description": "BBVA COLOMBIA S.A.",
            "pseCode": "1013"
        },
        {
            "id": "cd4286fa-850a-4b34-96d1-f71d6a79f44a",
            "description": "BBVA DESARROLLO",
            "pseCode": "1513"
        },
        {
            "id": "10e9b7b6-7a5f-4d5b-8d7f-4b2020f43f93",
            "description": "CITIBANK COLOMBIA S.A.",
            "pseCode": "1009"
        },
        {
            "id": "77f0988f-cf45-4931-bbcd-984e07e0fc51",
            "description": "COLTEFINANCIERA",
            "pseCode": "1370"
        },
        {
            "id": "48c81f6a-e0f1-4c1d-ab9b-9915726e3596",
            "description": "CONFIAR COOPERATIVA FINANCIERA",
            "pseCode": "1292"
        },
        {
            "id": "8694df26-5ccd-45c0-b5b7-2b995c47f81a",
            "description": "COOPERATIVA FINANCIERA COTRAFA",
            "pseCode": "1289"
        },
        {
            "id": "1c222feb-2b58-408c-a495-ade06b6825c0",
            "description": "COOPERATIVA FINANCIERA DE ANTIOQUIA",
            "pseCode": "1283"
        },
        {
            "id": "70a18a09-38f2-4f62-aba6-9ad28c30c966",
            "description": "CREDIFIANCIERA",
            "pseCode": "1558"
        },
        {
            "id": "3f8b3126-8aa3-4438-8a6c-1d544184f2d7",
            "description": "DALE",
            "pseCode": "1097"
        },
        {
            "id": "a953078b-5e22-42ea-9301-954558e8f463",
            "description": "DAVIPLATA",
            "pseCode": "1551"
        },
        {
            "id": "2ad780ba-a1e8-4cb9-9150-670429aae092",
            "description": "GIROS Y FINANZAS COMPAÑIA DE FINANCIAMIENTO S.A",
            "pseCode": "1303"
        },
        {
            "id": "c0bfb716-a098-40f6-84b5-1972a4846506",
            "description": "IRIS",
            "pseCode": "1637"
        },
        {
            "id": "7e1efd88-4f88-4e21-a972-28b526b27da5",
            "description": "ITAU",
            "pseCode": "1006"
        },
        {
            "id": "26c9a2df-6b4f-4309-9137-3692d9bb9f82",
            "description": "MOVII S.A",
            "pseCode": "1801"
        },
        {
            "id": "d9b48a70-6068-4116-a345-154381e5d953",
            "description": "NEQUI CERTIFICACION",
            "pseCode": "1508"
        },
        {
            "id": "60199dc5-7d38-49c6-92a5-b839dc0087d2",
            "description": "prueba restriccion",
            "pseCode": "9988"
        },
        {
            "id": "be467299-d90a-407e-86d3-01e30ade1e06",
            "description": "Prueba Steve",
            "pseCode": "121212"
        },
        {
            "id": "201acc05-4c4f-49dc-9be6-3261a6ce4a3c",
            "description": "RAPPIPAY",
            "pseCode": "1151"
        },
        {
            "id": "7602e001-6199-48bc-9ee3-466f8eb2e422",
            "description": "SCOTIABANK COLPATRIA DESARROLLO",
            "pseCode": "1019"
        },
        {
            "id": "9bb638a0-4c3f-41d2-8811-f8cdd29b0db2",
            "description": "SCOTIABANK COLPATRIA UAT",
            "pseCode": "1078"
        },
        {
            "id": "086547b5-313b-42c7-acef-93d0f76b1dd5",
            "description": "SEIVY – GM FINANCIAL",
            "pseCode": "1305"
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
    <language>en</language>
    <command>GET_BANKS_LIST</command>
    <merchant>
        apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <isTest>false</isTest>
    <bankListInformation>
        <paymentMethod>PSE</paymentMethod>
        <paymentCountry>CO</paymentCountry>
    </bankListInformation>
</request>
```
<br>

Ejemplo respuesta:
```XML
<bankListResponse>
    <code>SUCCESS</code>
    <banks>
        <bank>
            <id>34e6e912-a395-4d31-9599-9baa176c1a61</id>
            <description>A continuación seleccione su banco</description>
            <pseCode>0</pseCode>
        </bank>
        <bank>
            <id>033aec11-e068-4252-8043-237144be9233</id>
            <description>BAN.CO</description>
            <pseCode>1552</pseCode>
        </bank>
        <bank>
            <id>a720cb4c-6549-4932-83be-6d72b3eb0016</id>
            <description>BANCAMIA</description>
            <pseCode>1059</pseCode>
        </bank>
        <bank>
            <id>d9280852-47a5-4e99-94ac-3d7648ba79a3</id>
            <description>BANCO AGRARIO</description>
            <pseCode>1040</pseCode>
        </bank>
        <bank>
            <id>ff216e8a-28ba-4bf6-9935-b94dfdfd96a0</id>
            <description>BANCO AGRARIO DESARROLLO</description>
            <pseCode>1081</pseCode>
        </bank>
        <bank>
            <id>5073154e-efd4-4870-9315-abb926e87519</id>
            <description>BANCO AGRARIO QA DEFECTOS</description>
            <pseCode>1080</pseCode>
        </bank>
        <bank>
            <id>6e61a91d-58bf-46ec-aa09-1f44974dda7e</id>
            <description>BANCO CAJA SOCIAL</description>
            <pseCode>10322</pseCode>
        </bank>
        <bank>
            <id>e062711e-6bbd-4a13-819a-d60084f9c6fa</id>
            <description>BANCO CAJA SOCIAL DESARROLLO</description>
            <pseCode>1032</pseCode>
        </bank>
        <bank>
            <id>a9b5cc17-b0ae-4708-9835-586a0bef95df</id>
            <description>BANCO COMERCIAL AVVILLAS S.A.</description>
            <pseCode>1052</pseCode>
        </bank>
        <bank>
            <id>c5c97dfe-6101-453f-bcd4-691f4b329a3c</id>
            <description>BANCO COOMEVA S.A. - BANCOOMEVA</description>
            <pseCode>1061</pseCode>
        </bank>
        <bank>
            <id>7a2e8d04-e8c8-404b-8e49-d5d37c107a12</id>
            <description>BANCO COOPERATIVO COOPCENTRAL</description>
            <pseCode>1066</pseCode>
        </bank>
        <bank>
            <id>197fe0af-f658-4fe0-ad1b-952e174de549</id>
            <description>BANCO CREDIFINANCIERA</description>
            <pseCode>1058</pseCode>
        </bank>
        <bank>
            <id>b1de44f1-cede-4aca-9d3f-3313d5cc0c63</id>
            <description>BANCO DAVIVIENDA</description>
            <pseCode>1051</pseCode>
        </bank>
        <bank>
            <id>7a10219e-04a7-4c31-b747-54ded27c7f07</id>
            <description>BANCO DAVIVIENDA Desarrollo</description>
            <pseCode>10512</pseCode>
        </bank>
        <bank>
            <id>ed06f40e-a1b9-4e48-8851-bffb4cda0480</id>
            <description>BANCO DE BOGOTA</description>
            <pseCode>1039</pseCode>
        </bank>
        <bank>
            <id>4592a13b-6334-4fba-8402-9d006b599fa8</id>
            <description>BANCO DE BOGOTA DESARROLLO 2013</description>
            <pseCode>1001</pseCode>
        </bank>
        <bank>
            <id>55f59084-cd3b-47d2-a420-6442cdb9e4b1</id>
            <description>BANCO DE OCCIDENTE</description>
            <pseCode>1023</pseCode>
        </bank>
        <bank>
            <id>8e134fca-4fde-44e6-b012-55e8f2d338ca</id>
            <description>BANCO FALABELLA</description>
            <pseCode>1062</pseCode>
        </bank>
        <bank>
            <id>8eb03abf-5608-419b-8d2c-9d90b8ab6b88</id>
            <description>BANCO GNB COLOMBIA (ANTES HSBC)</description>
            <pseCode>1010</pseCode>
        </bank>
        <bank>
            <id>283e0068-749f-43f1-a2e5-340910f41af3</id>
            <description>BANCO GNB SUDAMERIS</description>
            <pseCode>1012</pseCode>
        </bank>
        <bank>
            <id>8b0bf5e7-394d-4f7e-a467-e4d21d04c9fb</id>
            <description>BANCO PICHINCHA S.A.</description>
            <pseCode>1060</pseCode>
        </bank>
        <bank>
            <id>beeb494a-4ce5-41b4-b497-0756f0b6a6d9</id>
            <description>BANCO POPULAR</description>
            <pseCode>1002</pseCode>
        </bank>
        <bank>
            <id>a5a4b740-1644-4627-ae2a-41b13ffc7c5e</id>
            <description>BANCO PRODUCTOS POR SEPARADO</description>
            <pseCode>1203</pseCode>
        </bank>
        <bank>
            <id>47e747ef-c817-4be6-9eff-b6b16f50d001</id>
            <description>Banco PSE</description>
            <pseCode>1101</pseCode>
        </bank>
        <bank>
            <id>589939d7-06d1-4933-a101-8bb29b801d76</id>
            <description>BANCO SANTANDER COLOMBIA</description>
            <pseCode>1065</pseCode>
        </bank>
        <bank>
            <id>fcdaa98e-99ce-4e76-a504-1e053a05e773</id>
            <description>BANCO SERFINANZA</description>
            <pseCode>1069</pseCode>
        </bank>
        <bank>
            <id>201608c6-81de-436f-967a-2ec7c212c100</id>
            <description>BANCO TEQUENDAMA</description>
            <pseCode>1035</pseCode>
        </bank>
        <bank>
            <id>a8f33ba3-0053-464a-afbe-9add7c63fbc3</id>
            <description>Banco union Colombia Credito</description>
            <pseCode>1004</pseCode>
        </bank>
        <bank>
            <id>5dfa1b2c-64bd-4e8c-9fad-585337cfd4ff</id>
            <description>BANCO UNION COLOMBIANO</description>
            <pseCode>1022</pseCode>
        </bank>
        <bank>
            <id>56e306ef-6011-4f41-9640-b98449d6a6be</id>
            <description>BANCO UNION COLOMBIANO FD2</description>
            <pseCode>1005</pseCode>
        </bank>
        <bank>
            <id>bc883c0d-3610-4a88-96ca-2e2baa1dd2e5</id>
            <description>Banco Web Service ACH</description>
            <pseCode>1055</pseCode>
        </bank>
        <bank>
            <id>4e97e580-fc92-47ea-af4f-7b3b3ddffff8</id>
            <description>Banco Web Service ACH WSE 3.0</description>
            <pseCode>1055</pseCode>
        </bank>
        <bank>
            <id>931f6bfb-283e-4721-bb86-4a7484bfd28e</id>
            <description>BANCOLOMBIA DATAPOWER</description>
            <pseCode>10072</pseCode>
        </bank>
        <bank>
            <id>1285de9c-8d47-49f7-b00a-e87882e2a3f9</id>
            <description>BANCOLOMBIA DESARROLLO</description>
            <pseCode>10071</pseCode>
        </bank>
        <bank>
            <id>451f0e5f-5db4-4f55-a1fc-b38e06526e04</id>
            <description>BANCOLOMBIA QA</description>
            <pseCode>1007</pseCode>
        </bank>
        <bank>
            <id>448e00ec-c479-497d-9a35-0dfbbf462f72</id>
            <description>BANKA</description>
            <pseCode>1077</pseCode>
        </bank>
        <bank>
            <id>5f3a7adb-b283-4ca3-bee9-741f1306a03d</id>
            <description>BBVA COLOMBIA S.A.</description>
            <pseCode>1013</pseCode>
        </bank>
        <bank>
            <id>cd4286fa-850a-4b34-96d1-f71d6a79f44a</id>
            <description>BBVA DESARROLLO</description>
            <pseCode>1513</pseCode>
        </bank>
        <bank>
            <id>10e9b7b6-7a5f-4d5b-8d7f-4b2020f43f93</id>
            <description>CITIBANK COLOMBIA S.A.</description>
            <pseCode>1009</pseCode>
        </bank>
        <bank>
            <id>77f0988f-cf45-4931-bbcd-984e07e0fc51</id>
            <description>COLTEFINANCIERA</description>
            <pseCode>1370</pseCode>
        </bank>
        <bank>
            <id>48c81f6a-e0f1-4c1d-ab9b-9915726e3596</id>
            <description>CONFIAR COOPERATIVA FINANCIERA</description>
            <pseCode>1292</pseCode>
        </bank>
        <bank>
            <id>8694df26-5ccd-45c0-b5b7-2b995c47f81a</id>
            <description>COOPERATIVA FINANCIERA COTRAFA</description>
            <pseCode>1289</pseCode>
        </bank>
        <bank>
            <id>1c222feb-2b58-408c-a495-ade06b6825c0</id>
            <description>COOPERATIVA FINANCIERA DE ANTIOQUIA</description>
            <pseCode>1283</pseCode>
        </bank>
        <bank>
            <id>70a18a09-38f2-4f62-aba6-9ad28c30c966</id>
            <description>CREDIFIANCIERA</description>
            <pseCode>1558</pseCode>
        </bank>
        <bank>
            <id>3f8b3126-8aa3-4438-8a6c-1d544184f2d7</id>
            <description>DALE</description>
            <pseCode>1097</pseCode>
        </bank>
        <bank>
            <id>a953078b-5e22-42ea-9301-954558e8f463</id>
            <description>DAVIPLATA</description>
            <pseCode>1551</pseCode>
        </bank>
        <bank>
            <id>2ad780ba-a1e8-4cb9-9150-670429aae092</id>
            <description>GIROS Y FINANZAS COMPAÑIA DE FINANCIAMIENTO S.A</description>
            <pseCode>1303</pseCode>
        </bank>
        <bank>
            <id>c0bfb716-a098-40f6-84b5-1972a4846506</id>
            <description>IRIS</description>
            <pseCode>1637</pseCode>
        </bank>
        <bank>
            <id>7e1efd88-4f88-4e21-a972-28b526b27da5</id>
            <description>ITAU</description>
            <pseCode>1006</pseCode>
        </bank>
        <bank>
            <id>26c9a2df-6b4f-4309-9137-3692d9bb9f82</id>
            <description>MOVII S.A</description>
            <pseCode>1801</pseCode>
        </bank>
        <bank>
            <id>d9b48a70-6068-4116-a345-154381e5d953</id>
            <description>NEQUI CERTIFICACION</description>
            <pseCode>1508</pseCode>
        </bank>
        <bank>
            <id>60199dc5-7d38-49c6-92a5-b839dc0087d2</id>
            <description>prueba restriccion</description>
            <pseCode>9988</pseCode>
        </bank>
        <bank>
            <id>be467299-d90a-407e-86d3-01e30ade1e06</id>
            <description>Prueba Steve</description>
            <pseCode>121212</pseCode>
        </bank>
        <bank>
            <id>201acc05-4c4f-49dc-9be6-3261a6ce4a3c</id>
            <description>RAPPIPAY</description>
            <pseCode>1151</pseCode>
        </bank>
        <bank>
            <id>7602e001-6199-48bc-9ee3-466f8eb2e422</id>
            <description>SCOTIABANK COLPATRIA DESARROLLO</description>
            <pseCode>1019</pseCode>
        </bank>
        <bank>
            <id>9bb638a0-4c3f-41d2-8811-f8cdd29b0db2</id>
            <description>SCOTIABANK COLPATRIA UAT</description>
            <pseCode>1078</pseCode>
        </bank>
        <bank>
            <id>086547b5-313b-42c7-acef-93d0f76b1dd5</id>
            <description>SEIVY – GM FINANCIAL</description>
            <pseCode>1305</pseCode>
        </bank>
    </banks>
</bankListResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Consultar medios de pago disponibles {#available-payment-methods-query}
Este método retorna la lista de los medios de pago disponibles en todos los paises.

### Variables para la petición y la respuesta {#variables-for-request-and-response-4}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `GET_PAYMENT_METHODS`. | Sí |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| merchant |  |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| paymentMethods |  |  | Lista de medios de pago. | Sí |
| paymentMethods > paymentMethodComplete |  |  | Este objeto tiene la información de un medio de pago. | Sí |
| paymentMethods > paymentMethodComplete > id | Numérico |  | Identificador del medio de pago. | Sí |
| paymentMethods > paymentMethodComplete > description | Alfanumérico | Max:32 | Nombre del medio de pago. | Sí |
| paymentMethods > paymentMethodComplete > country | Alfanumérico | 2 | Código ISO del país del medio de pago. | Sí |

</details>

### Llamado del API {#api-call-4}
Los siguientes son los cuerpos de la petición y la respuesta para este método. Para el propósito de este ejemplo, la respuesta muestra dos medios de pago. 

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "paymentMethods": [
        {
            "id": "35",
            "description": "BALOTO",
            "country": "CO",
            "enabled": true,
            "reason": null
        },
        {
            "id": "10",
            "description": "MASTERCARD",
            "country": "co",
            "enabled": true,
            "reason": null
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

Ejemplo respuesta:
```XML
<paymentMethodsResponse>
    <code>SUCCESS</code>
    <paymentMethods>
        <paymentMethodComplete>
            <id>35</id>
            <description>BALOTO</description>
            <country>CO</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>10</id>
            <description>MASTERCARD</description>
            <country>CO</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
    </paymentMethods>
</paymentMethodsResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Ping
El método `PING` te permite verificar la conexión con nuestra plataforma. 

### Variables for request and response {#variables-for-request-and-response-5}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `PING`. | Sí |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| merchant |  |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| code | Alfanumérico |  | Código de respuesta de la transacción. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado si ocurrió un error. |
| transactionResponse | transactionResponse | Max:2048 | La respuesta del método PING si ocurrió un error. |
</details>

### Llamado del API {#api-call-5}
Los siguientes son los cuerpos de la petición y la respuesta para este método.

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

Ejemplo petición:
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

Ejemplo respuesta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

