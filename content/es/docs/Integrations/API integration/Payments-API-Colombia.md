---
title: "API de Pagos - Colombia"
linkTitle: "API de Pagos - Colombia"
date: 2021-05-03T15:48:08-05:00
description: >
 La API de Pagos para Colombia permite integrar de manera eficiente las capacidades de procesamiento de pagos de PayU con tu plataforma de compras en línea. A través de esta API, los comercios pueden ofrecer a sus clientes una amplia variedad de métodos de pago, incluyendo tarjetas de crédito, tarjetas de débito, billeteras digitales, efectivo y transferencias bancarias.
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

## Funcionalidades disponibles {#available-features}

La API de Pagos incluye las siguientes funcionalidades:

* [Enviar transacciones utilizando tarjetas de crédito o débito]({{< ref "#submit-transactions-using-credit-or-debit-cards" >}})
* [Enviar transacciones utilizando QR Bre-B]({{< ref "#submit-transactions-using-bre-b-qr" >}})
* [Enviar transacciones utilizando transferencia bancaria (PSE)]({{< ref "#submit-transactions-using-bank-transfer-pse" >}})
* [Enviar transacciones utilizando Google Pay]({{< ref "#submit-transactions-using-google-pay" >}})
* [Enviar transacciones utilizando Nequi]({{< ref "#submit-transactions-using-nequi" >}})
* [Enviar transacciones utilizando Botón Bancolombia]({{< ref "#submit-transactions-using-bancolombia-button" >}})
* [Enviar transacciones utilizando efectivo o referencia bancaria]({{< ref "#submit-transactions-using-cash-or-bank-reference" >}})
* [Procesar pagos como aerolínea o agencia de viajes]({{< ref "#process-payments-as-an-airline-or-travel-agency" >}})
* [Incluir información de registro de nombre del pasajero]({{< ref "#include-passenger-name-record-information-optional" >}})
* [Consultar métodos de pago disponibles]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Nota" color="info"%}}

Para confirmar el estado de una transacción, puedes utilizar una de las siguientes opciones:
* Navega a la URL configurada en la variable `transaction.notifyUrl` o la opción **URL de confirmación** ubicada en el Módulo PayU en **Configuración** > **Configuración técnica**.
* Utiliza la [API o SDK de Consultas]({{< ref "Queries.md" >}}).

{{% /alert %}}

## Enviar transacciones utilizando tarjetas de crédito o débito {#submit-transactions-using-credit-or-debit-cards}

Este método te permite procesar los pagos que realizan tus clientes utilizando tarjetas de crédito o débito. Para Colombia, puedes realizar los flujos de un paso (**Cobro**). Para más información, consulta los [flujos de pago]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Nota" color="info"%}}

El flujo de dos pasos está disponible únicamente bajo solicitud, contacta a tu representante de ventas.

{{% /alert %}}

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response}

<details>
<summary><b>Solicitud</b></summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Mostrar solo los campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Máx:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| `test` (JSON)<hr>`isTest` (XML) | Booleano | | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| `merchant` | Objeto | | Este objeto contiene los datos de autenticación. | Sí |
| `merchant > apiLogin` | Alfanumérico | Min:12 Máx:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `merchant > apiKey` | Alfanumérico | Min:6 Máx:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `transaction` | Objeto | | Este objeto contiene los datos de la transacción. | Sí |
| `transaction > order` | Objeto | | Este objeto contiene los datos de la orden. | Sí |
| `transaction > order > accountId` | Numérico | | Identificador de tu cuenta. | Sí |
| `transaction > order > referenceCode` | Alfanumérico | Min:1 Máx:255 | Representa el identificador de la orden en tu sistema. | Sí |
| `transaction > order > description` | Alfanumérico | Min:1 Máx:255 | Descripción de la orden. | Sí |
| `transaction > order > language` | Alfanumérico | 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí |
| `transaction > order > notifyUrl` | Alfanumérico | Máx:2048 | URL de confirmación de la orden. | No |
| `transaction > order > partnerId` | Alfanumérico | Máx:255 | ID de aliado dentro de PayUID de aliado dentro de PayU. | No |
| `transaction > order > signature` | Alfanumérico | Máx:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| `transaction > order > shippingAddress` | Objeto |  | Dirección de envío. | No |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Máx:100 | Línea de dirección 1. | No |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Máx:100 | Línea de dirección 2. | No |
| `transaction > order > shippingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección. | No |
| `transaction > order > shippingAddress > state` | Alfanumérico | Máx:40 | Departamento de la dirección. | No |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | País de la dirección. | No |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Máx:8 | Código postal de la dirección. | No |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Máx:11 | Número de teléfono asociado con la dirección. | No |
| `transaction > order > buyer` | Objeto | | Información del comprador. | Sí |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Máx:100 | Identificador del comprador en tu sistema. | No |
| `transaction > order > buyer > fullName` | Alfanumérico | Máx:150 | Nombre del comprador. | Sí |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Máx:255 | Correo electrónico del comprador. | Sí |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Máx:20 | Número de teléfono del comprador. | Sí |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Máx:20 | Número de identificación del comprador. | Sí |
| `transaction > order > buyer > shippingAddress` | Objeto |  | Dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Máx:150 | Línea de dirección 1 del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Máx:40 | Departamento de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| `transaction > order > buyer > shippingAddress > postalCode` | Numérico | Máx:20 | Código postal de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > phone` | Numérico | Máx:20 | Número de teléfono de la dirección del comprador. | Sí |
| `transaction > order > additionalValues` | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Monto de la transacción. | Sí |
| `transaction > order > additionalValues > TX_VALUE > value` | Numérico | 12, 2 | Especifica el monto de la transacción, este valor no puede tener decimales. | Sí |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > order > additionalValues > TX_TAX` | Alfanumérico | 64 | Monto del IVA (Impuesto al Valor Agregado). | Sí |
| `transaction > order > additionalValues > TX_TAX > value` | Numérico | 12, 2 | Especifica el monto del IVA.<br>Si no se envía este parámetro, PayU aplica el impuesto actual (19%).<br>Si la cantidad está exenta de IVA, envía 0.<br>Este valor puede tener dos dígitos decimales  | No |
| `transaction > order > additionalValues > TX_TAX > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alfanumérico | 64 | Valor base para calcular el IVA.<br>Si la cantidad está exenta de IVA, envía 0.<br>Este valor puede tener dos dígitos decimales  | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Numérico | 12, 2 | Especifica el valor base de la transacción. | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > creditCardTokenId` | Alfanumérico | | Incluye este parámetro cuando la transacción se hace con una tarjeta de crédito tokenizada; además, es obligatorio enviar el parámetro `transaction.creditCard.expirationDate`.<br>Para más información, consulte [API de Tokenización]({{< ref "Tokenization-API.md" >}}). | No |
| `transaction > creditCard` | Objeto | | Información de la tarjeta de crédito. Este objeto y sus parámetros son obligatorios cuando el pago se realiza utilizando una tarjeta de crédito no tokenizada. | No |
| `transaction > creditCard > number` | Alfanumérico | Min:13 Máx:20 | Número de la tarjeta de crédito. | No |
| `transaction > creditCard > securityCode` | Alfanumérico | Min:1 Máx:4 | Código de seguridad de la tarjeta de crédito (CVC2, CVV2, CID). | No |
| `transaction > creditCard > expirationDate` | Alfanumérico | 7 | Fecha de expiración de la tarjeta de crédito. Formato `YYYY/MM`. | No |
| `transaction > creditCard > name` | Alfanumérico | Min:1 Máx:255 | Nombre del tarjetahabiente mostrado en la tarjeta de crédito. | No |
| `transaction > creditCard > processWithoutCvv2` | Booleano | Máx:255 | Te permite procesar transacciones sin incluir el código de seguridad de la tarjeta de crédito. Tu comercio requiere autorización de PayU antes de utilizar esta funcionalidad. | No |
| `transaction > payer` | Objeto | | Información del pagador. | Sí |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Correo electrónico del pagador. | Sí |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador del pagador en tu sistema. | No |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nombre del pagador que debe ser igual al enviado en el parámetro `transaction.creditCard.name`. | Sí |
| `transaction > payer > billingAddress` | Objeto | | Dirección de facturación. | Sí |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Línea 1 de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Línea 2 de la dirección de facturación. | No |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Departamento de la dirección de facturación. | No |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | Sí |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal de la dirección de facturación. | No |
| `ransaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Número de teléfono de la dirección de facturación. | No |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Fecha de nacimiento del pagador. | No |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Número de teléfono del pagador. | Sí |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificación del pagador. | Sí |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| `transaction > type` | Alfanumérico | 32 | Asigna este valor de acuerdo con el tipo de transacción. Para Colombia, asigna `AUTHORIZATION_AND_CAPTURE` | Sí |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecciona un método de pago de Tarjeta de crédito valido. [Ver los métodos de pago disponibles para Colombia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sí |
| `transaction > paymentCountry` | Alfanumérico | 2 | Asigna `CO` para Colombia. | Sí |
| `transaction > deviceSessionId` | Alfanumérico | Máx:255 | Identificador de la sesión del dispositivo donde el cliente realiza la transacción. Para más información, consulta [esta sección]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| `transaction > cookie` | Alfanumérico | Máx:255 | Cookie almacenada por el dispositivo donde el cliente realiza la transacción. | Sí |
| `transaction > userAgent` | Alfanumérico | Máx:1024 | User agent del navegador donde el cliente realiza la transacción. | Sí |
| `transaction > extraParameters` | Objeto | | Parámetros adicionales o datos asociados a la petición. El tamaño máximo de cada nombre de _extraParameters_ es 64 caracteres.<br>En JSON, el parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>En XML, el parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | No |
| `transaction > extraParameters > EXTRA1` | Alfanumérico | Máx:512 | Campo adicional para enviar información extra sobre la compra. | No |
| `transaction > extraParameters > EXTRA2` | Alfanumérico | Máx:512 | Campo adicional para enviar información extra sobre la compra. | No |
| `transaction > extraParameters > EXTRA3` | Alfanumérico | Máx:512 | Campo adicional para enviar información extra sobre la compra. | No |
| `transaction > threeDomainSecure` | Objeto |  | Este objeto contiene la información de 3DS 2.0. | No |
| `transaction > threeDomainSecure > embedded` | Booleano |  | Asigna `true` si quieres utilizar un MPI embebido para el proceso de Autorización. Por defecto, este valor está asignado como `false`. | No |
| `transaction > threeDomainSecure > eci` | Numérico | Máx:2 | Indicador de Comercio Electrónico.<br>Valor retornado por los servidores de directorio indicando el intento de autenticación.<br>Este parámetro es obligatorio cuando `transaction.threeDomainSecure.embedded` es `false` y `transaction.threeDomainSecure.xid` tiene un valor configurado. | No |
| `transaction > threeDomainSecure > cavv` | Alfanumérico | Máx:28 | Valor de verificación de autenticación del titular de la tarjeta (Cardholder Authentication Verification Value).<br>Código del criptograma utilizado en la autenticación de la transacción codificado en Base 64.<br>Dependiendo de los códigos ECI específicos establecidos por la red, este valor puede ser opcional. | No |
| `transaction > threeDomainSecure > xid` | Alfanumérico | Máx:28 | Identificador de la transacción enviado por el MPI codificado en Base 64.<br>Este parámetro es obligatorio cuando `transaction.threeDomainSecure.embedded` is `false` y `transaction.threeDomainSecure.eci` tiene un valor configurado. | No |
| `transaction > threeDomainSecure > directoryServerTransactionId` | Alfanumérico | Máx:36 | Identificador de la transacción generador por el servidor de directorio durante la autenticación. | No |
| `transaction > digitalWallet` | Objeto |  | Incluya este parámetro cuando la transacción se realice utilizando una billetera digital. *Al enviar este objeto, todos sus campos son obligatorios. | No |
| `transaction > digitalWallet > type` | Alfanumérico | ---- | Envía el valor con base en la billetera que se está procesando: GOOGLE_PAY | Si* |
| `transaction > digitalWallet > message` | Alfanumérico | ---- | Incluye la información del Google Pay token que Google te devolverá por cada transacción. Para más información consulta [aquí](#definiciones-de-payu-para-la-integración-api-del-medio-de-pago). | Si* |

</details>

<details>
<summary><b>Respuesta</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| `code` | Alfanumérico | | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| `transactionResponse` | Objeto | | Datos de la respuesta. |
| `transactionResponse > orderId` | Numérico | | Identificador generado o existente de la orden en PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | Identificador de la transacción en PayU. |
| `transactionResponse > state` | Alfanumérico | Máx:32 | Estado de la transacción. |
| `transactionResponse > responseCode` | Alfanumérico | Máx:64 | Código de respuesta asociado con el estado. |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx:255 | Código de respuesta retornado por la red bancaria. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx:255 | Mensaje de error retornado por la red bancaria. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx:32 | Código de trazabilidad retornado por la red bancaria. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx:12 | Código de autorización retornado por la red bancaria. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx:2048 | Mensaje asociado con el código de respuesta. |
| `transactionResponse > operationDate` | Fecha | | Fecha de creación de la respuesta en el sistema de PayU. |
| `transactionResponse > extraParameters` | Objeto | | Parámetros adicionales o datos asociados con la respuesta. <br>En JSON, el parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>En XML, el parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| `transactionResponse > additionalInfo` | Objeto | | Información adicional de la respuesta. Este objeto tiene la misma estructura de `transactionResponse.extraParameters`. |
| `transactionResponse > additionalInfo > rejectionType` | Alfanumérico | Máx: 4 | Indica la categoría del rechazo. Valores posibles: `SOFT` o `HARD`. Para más información, consulta [Consideraciones]({{< ref "Payments-API-Colombia.md#considerations" >}}). |


</details>

#### Consideraciones {#considerations}

* **Manejo de Rechazos (`rejectionType`):** Cuando se rechaza una transacción, el campo `additionalInfo.rejectionType` ayuda a determinar la estrategia de reintento:
    * **HARD**: Indica un rechazo permanente. Según las regulaciones de la red, **el comercio no debe reintentar la transacción** utilizando los mismos datos de la tarjeta. Los reintentos frecuentes de rechazos tipo "Hard" pueden resultar en penalizaciones o multas por parte de las redes financieras.
    * **SOFT**: Indica un problema temporal (por ejemplo, fondos insuficientes). La transacción puede reintentarse en un momento posterior.
* Para pagos con tókenes de tarjeta, incluya los parámetros `transaction.creditCardTokenId` y `transaction.creditCard.securityCode` (Si procesas con código de seguridad) reemplazando la información de la tarjeta de crédito. Para más información, consulta el [API de Tokenización]({{< ref "Tokenization-API.md" >}}).
* Por defecto, el procesamiento de tarjetas de crédito sin código de seguridad no está activo. Si lo quieres activar, contacta a tu representante de ventas. Luego de que esté activado, envía en la petición la variable `creditCard.processWithoutCvv2` con valor true y elimina la variable `creditCard.securityCode`.
* La variable `transaction.threeDomainSecure` no reemplaza la información de la tarjeta o ninguno de los campos obligatorios de la transacción. Este objeto es adicional y no es obligatorio.
* La variable `transaction.threeDomainSecure` corresponde a un escenario _passthrough_ donde el comercio realiza la autenticación por su cuenta.
* Para la tarjeta Crédito Fácil Codensa, el número de cuotas soportadas es 1 a 12, 18, 24, 36 y 48.
* Para la tarjeta Crédito Fácil Codensa, el pagador puede escoger uno de los siguientes tipos de documento en la variable `transaction.payer.dniType`:

| ISO | Descripción |
|:-:|-|
| `CC` | Cédula de ciudadanía. |
| `CE` | Cédula de extranjería. |
| `NIT` | Número de Identificación Tributaria (Empresas). |
| `TI` | Tarjeta de identidad. |
| `PP` | Pasaporte. |
| `IDC` | Identificador único de cliente, para el caso de ID’s únicos de clientes/usuarios de servicios públicos. |
| `CEL` | En caso de identificarse a través de la línea del móvil. |
| `RC` | Registro civil de nacimiento. |
| `DE` | Documento de identificación extranjero. |

### Llamado a la API {#api-call}

Los siguientes son los cuerpos de la petición y la respuesta para este método de pago.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una solicitud:**
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
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0",
      "threeDomainSecure": {
         "embedded": false,
         "eci": "01",
         "cavv": "AOvG5rV058/iAAWhssPUAAADFA==",
         "xid": "Nmp3VFdWMlEwZ05pWGN3SGo4TDA=",
         "directoryServerTransactionId": "00000-70000b-5cc9-0000-000000000cb"
      }
   },
   "test": true
}
```
<br>

**Ejemplo de una respuesta:**
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

**Ejemplo de una solicitud:**
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
      <threeDomainSecure>
         <embedded>false</embedded>
         <eci>01</eci>
         <cavv>AOvG5rV058/iAAWhssPUAAADFA==</cavv>
         <xid>Nmp3VFdWMlEwZ05pWGN3SGo4TDA=</xid>
         <directoryServerTransactionId>00000-70000b-5cc9-0000-000000000cb</directoryServerTransactionId>
      </threeDomainSecure>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

**Ejemplo de una respuesta:**
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

## Enviar transacciones utilizando QR Bre-B {#submit-transactions-using-bre-b-qr}

Este método te permite procesar pagos realizados por tus clientes a través de **QR Bre-B**. Para integrarte con este medio de pago, debes mostrar un código QR en tu checkout, para que el cliente pueda escanearlo con su aplicación bancaria o billetera digital y completar el pago.

Al finalizar, el cliente verá una página de pago como la siguiente:

<img src="/assets/Payments/qr01.png" alt="PrintScreen" width="70%"><br>

### ¿Cómo funciona QR Bre-B?

QR Bre-B permite realizar pagos de forma rápida y segura. Es un método de pago en línea en el que el pagador escanea un código QR dinámico de monto fijo con cualquier aplicación bancaria o billetera digital compatible, y sigue los pasos indicados por la entidad.  

Al ser un sistema interoperable, los pagadores pueden escanear el código QR con las principales entidades financieras del país, entre otras. Una vez completado el pago, recibirás el dinero de inmediato en tu cuenta virtual PayU.

### Disponibilidad

QR Bre-B está disponible en diversas modalidades de integración, lo que te permite implementarlo fácilmente según el tipo de canal o flujo de pago que utilices.

Puedes habilitarlo en cualquiera de las siguientes opciones:

*	Modelo Agregador (PSP)
*	Integración Web Checkout
*	Integración API
*	Link de Pagos (disponible desde el Merchant Panel y desde la PayU App)

### Experiencia de usuario {#user-experience}

QR Bre-B le ofrece 2 tipos de experiencias de usuario:

1.	**Experiencia PC:** El código QR se genera en un computador. El pagador lo escanea con su teléfono inteligente mediante una aplicación bancaria o billetera digital y realiza el pago.
2.	**Experiencia Móvil:** El código QR se genera directamente en el teléfono inteligente. El pagador guarda la imagen del QR en su galería y la adjunta en la aplicación bancaria o billetera digital para completar el pago.

### Consideraciones {#considerations-1}

Antes de implementar **QR Bre-B**, ten en cuenta los siguientes aspectos técnicos y de experiencia de usuario. Estas recomendaciones te ayudarán a garantizar un proceso de integración correcto y una experiencia de pago fluida para tus clientes.

* Asegúrate de tener habilitado este medio de pago en tu cuenta PayU. Si aún no lo tienes, solicítalo escribiendo a **comercios.co@payu.com**.  
* El código QR se genera como una imagen **base64**, con dimensiones de **158x158 px** y formato **PNG**.  
* El código QR **expira a los 15 minutos** de haberse generado. Incluye un cronómetro visible para indicar al pagador el tiempo restante antes de la expiración.  
* En la experiencia de usuario, incluye el **logo de Bre-B & DING** y el nombre del medio de pago **“QR Bre-B”**.  
* Asegúrate de mostrar las **instrucciones para el pagador** y los **campos del formulario**, tal como se ilustra en las siguientes imágenes.

1. Solicita los datos del pagador.

<img src="/assets/Payments/qr02.png" alt="PrintScreen" width="70%"><br>

2. Muestra los métodos de pago disponibles.

<img src="/assets/Payments/qr01.png" alt="PrintScreen" width="70%"><br>

3. Cuando el usuario selecciona **QR Bre-B**, presenta las instrucciones que debe seguir para completar el pago.

<img src="/assets/Payments/qr03.png" alt="PrintScreen" width="70%"><br>

4. Genera y muestra el **código QR** que el pagador debe escanear, junto con un **cronómetro** que indique el tiempo restante antes de que el código expire.

<img src="/assets/Payments/qr04.png" alt="PrintScreen" width="70%"><br>

5. Una vez completado el pago, muestra el **resumen de la transacción exitosa**, incluyendo los datos de facturación o cualquier otra información relevante para el pagador, según corresponda.

<img src="/assets/Payments/qr05.png" alt="PrintScreen" width="70%"><br>

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response-1}

<details>
<summary><b>Solicitud</b></summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Mostrar solo los campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Máx:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| `test` (JSON)<hr>`isTest` (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| `merchant` | Objeto |  | Este objeto tiene los datos de autenticación. | Sí |
| `merchant > apiLogin` | Alfanumérico | Min:12 Máx:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `merchant > apiKey` | Alfanumérico | Min:6 Máx:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `transaction` | Objeto | | Este objeto tiene los datos de la transacción. | Sí |
| `transaction > order` | Objeto | | Este objeto tiene los datos de la orden. | Sí |
| `transaction > order > accountId` | Numérico | | Identificador de tu cuenta. | Sí |
| `transaction > order > referenceCode` | Alfanumérico | Min:1 Máx:255 | Representa el identificador de la orden en tu sistema. | Sí |
| `transaction > order > description` | Alfanumérico | Min:1 Máx:255 | Descripción de la orden. | Sí |
| `transaction > order > language` | Alfanumérico | 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí |
| `transaction > order > notifyUrl` | Alfanumérico | Máx:2048 | URL de confirmación de la orden. | No|
| `transaction > order > partnerId` | Alfanumérico | Máx:255 | ID de aliado dentro de PayUID de aliado dentro de PayU. | No |
| `transaction > order > signature` | Alfanumérico | Máx:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| `transaction > order > shippingAddress` | Objeto | | Dirección de envío. | No |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Máx:100 | Línea de dirección 1. | No |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Máx:100 | Línea de dirección 2. | No |
| `transaction > order > shippingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección. | No |
| `transaction > order > shippingAddress > state` | Alfanumérico | Máx:40 | Departamento de la dirección. | No |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | País de la dirección. | No |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Máx:8 | Código postal de la dirección. | No |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Máx:11 | Número de teléfono asociado con la dirección. | No |
| `transaction > order > buyer` | Objeto |  | Información del comprador. | Sí |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Máx:100 | Identificador del comprador en tu sistema. | No |
| `transaction > order > buyer > fullName` | Alfanumérico | Máx:150 | Nombre del comprador. | Sí |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Máx:255 | Correo electrónico del comprador. | No |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Máx:20 | Número de teléfono del comprador. | No |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Máx:20 | Número de identificación del comprador. | No |
| `transaction > order > buyer > shippingAddress` | Objeto | | Dirección de envío del comprador. | No |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Máx:150 | Línea de dirección 1 del comprador. | No |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección del comprador. | No |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Máx:40 | Departamento de la dirección del comprador. | No |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | No |
| `transaction > order > buyer > shippingAddress > postalCode` | Numérico | Máx:20 | Código postal de la dirección del comprador. | No |
| `transaction > order > buyer > shippingAddress > phone` | Numérico | Máx:20 | Número de teléfono de la dirección del comprador. | No |
| `transaction > order > additionalValues` | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Monto de la transacción. | Sí |
| `transaction > order > additionalValues > TX_VALUE > value` | Numérico | 12, 2 | Especifica el monto de la transacción, este valor no puede tener decimales. | Sí |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| `transaction > payer` | Objeto | | Información del pagador. | Sí |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Correo electrónico del pagador. | No |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador del pagador en tu sistema. | No |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nombre del pagador. | Sí |
| `transaction > payer > billingAddress` | Objeto |  | Dirección de facturación. | No |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Línea 1 de la dirección de facturación. | No |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Línea 2 de la dirección de facturación. | No |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección de facturación. | No |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Departamento de la dirección de facturación. | No |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | No |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal de la dirección de facturación. | No |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Número de teléfono de la dirección de facturación. | No |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Fecha de nacimiento del pagador. | No |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Número de teléfono del pagador. | No |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificación del pagador. | No |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sí |
| `transaction > type` | Alfanumérico | 32 | La transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sí |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecciona un método de pago por transferencia bancaria válido. [Ver los métodos de pago disponibles para Colombia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sí |
| `transaction > paymentCountry` | Alfanumérico | 2 | Asigna `CO` para Colombia. | Sí |
| `transaction > deviceSessionId` | Alfanumérico | Máx:255 | Identificador de la sesión del dispositivo donde el cliente realiza la transacción. Para más información, consulta [este artículo]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| `transaction > cookie` | Alfanumérico | Máx:255 | Cookie almacenada por el dispositivo donde el cliente realiza la transacción. | Sí |
| `transaction > userAgent` | Alfanumérico | Máx:1024 | User agent del navegador donde el cliente realiza la transacción. | Sí |
| `transaction > extraParameters` | Objeto | | Parámetros adicionales o datos asociados a la petición. | Sí |

</details>

<details>
<summary><b>Respuesta</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| `code` | Alfanumérico | | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| `transactionResponse` | Objeto | | Datos de la respuesta. |
| `transactionResponse > orderId` | Numérico | | Identificador generado o existente de la orden en PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | Identificador de la transacción en PayU. |
| `transactionResponse > state` | Alfanumérico | Máx:32 | Estado de la transacción. Como el pago se realiza de forma externa, el estado de una transacción exitosa es `PENDING` |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx:255 | Código de respuesta retornado por la red bancaria. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx:255 | Mensaje de error retornado por la red bancaria. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx:32 | Código de trazabilidad retornado por la red bancaria. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx:12 | Código de autorización retornado por la red bancaria. |
| `transactionResponse > pendingReason` | Alfanumérico | Máx:21 | Código de la razón asociada con el estado, como se mencionó en  `transactionResponse > state`, la transacción está en espera del pago. |
| `transactionResponse > responseCode` | Alfanumérico | Máx:64 | Código de respuesta asociado con el estado. En este caso, para una transacción exitosa es `PENDING_TRANSACTION_CONFIRMATION`. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx:2048 | Mensaje asociado con el código de respuesta. |
| `transactionResponse > operationDate` | Fecha | | Fecha de creación de la respuesta en el sistema de PayU. |
| `transactionResponse > extraParameters` | Objeto | | Parámetros adicionales o datos asociados con la respuesta. |

</details>

### Llamado a la API {#api-call-1}

Los siguientes son los cuerpos de la petición y la respuesta para este método de pago.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una solicitud:**
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
      "accountId": "521245",
      "referenceCode": "Houston 123456789918",
      "description": "Houston",
      "language": "en",
      "notifyUrl": "http://www.test.com/confirmation",
      "additionalValues": {
        "TX_VALUE": {
          "value": 1000,
          "currency": "COP"
        }
      },
      "buyer": {
        "merchantBuyerId": "1",
        "fullName": "APPROVED",
        "emailAddress": "john.doe@email.com",
        "contactPhone": "7563126",
        "dniNumber": "5415668464654",
        "shippingAddress": {
          "street1": "calle 99",
          "street2": "123",
          "city": "Medellin",
          "state": "Antioquia",
          "country": "CO",
          "postalCode": "0000000",
          "phone": "7563126"
        }
      },
      "shippingAddress": {
        "street1": "calle 99",
        "street2": "123",
        "city": "Medellin",
        "state": "Antioquia",
        "country": "CO",
        "postalCode": "0000000",
        "phone": "7563126"
      }
    },
    "payer": {
      "merchantPayerId": "1",
      "fullName": "APPROVED",
      "emailAddress": "john.doe@payu.com",
      "contactPhone": "7563126",
      "dniNumber": "5415668464654",
      "billingAddress": {
        "street1": "calle 99",
        "street2": "123",
        "city": "Bogota",
        "state": "Bogota",
        "country": "CO",
        "postalCode": "0000000",
        "phone": "7563126"
      }
    },
    "type": "AUTHORIZATION_AND_CAPTURE",
    "paymentMethod": "INTEROPERABLE_QR",
    "paymentCountry": "CO"
  },
  "test": false
}

```
<br>

**Ejemplo de una respuesta:**
```JSON
{
  "code": "SUCCESS",
  "error": null,
  "transactionResponse": {
    "orderId": 1438936173,
    "transactionId": "bccc494c-97bf-4b7b-84ec-a7e9dac15449",
    "state": "PENDING",
    "paymentNetworkResponseCode": null,
    "paymentNetworkResponseErrorMessage": null,
    "trazabilityCode": "a7463eca-3197-4a7f-8928-fbc7ca6017ea",
    "authorizationCode": null,
    "pendingReason": "AWAITING_NOTIFICATION",
    "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
    "errorCode": null,
    "responseMessage": null,
    "transactionDate": null,
    "transactionTime": null,
    "operationDate": 1741780199019,
    "referenceQuestionnaire": null,
    "extraParameters": {
      "EXPIRATION_DATE": 1742490236444,
      "URL_PAYMENT_RECEIPT_PDF": "http://ppp-web-gateway-payu.transactional.payu.preprod/ppp-web-gateway-payu/receipt?vid=1438936173Ybccc494c97bf4b7Y5f4bcef70c4d7b6",
      "QRCODE_IMAGE_BASE64": "iVBORw0KGgoAAAANSUhEUgAAAJ4AAACeAQAAAADr/o7WAAAEG0lEQVR4Xn2XQYqjOwyEDd4KdBWDtwZfXaCtQFcxaCvQlPN2M/5faJLuD5K2paqS0urfR7a/SV0oLY96rhjU19nF2egNPb3x6LHdTsywYWVvaFQ1/JzJyZSHwuQT4gNGrDMikj34f2BsCunhkq0NSvqCntqnuk5eI2fFyN85H1Ca/fX43f0Bq06P4xa6WlaU/1fPBxTiIbO1tYPa9mwx1xtqHedR1ktOtVFl/gWT8Owtxt7cVWnKB7Teh5xjnc/IDGdxe0NfGw1xJllyNseZa71hTvyJS8bWUBqdU+gNqznXVp62Bxp3htL6gKH7GI/w1shPpfoHjDaXoNAsVglFtH7L94JV5CqxdPcTrtQW38a94Nni0Qf7WIfkTG3rA3aRLZEoXSTku+Ke8wUdqm6zZspV1gmOmW8IPy0V2/AMT1Y6Bv08oeY6Nd2moW8Dr9vpDYNnP1C1MhrDzUoh2yesRmvjiWIeOBfa5NujF3Q96a6+kzIVvdN8QydtcD6UsNLG0XVF+4TBEqPYqpakT2OWD+jCzK3xlN7a8Witf8BgNGOWoiYOMVDF/oBqshAsNfoqfIZDtPmGsttahbN36oqwQlTaG1ZjhBWc7yuLEZR8FfKCoSVm3jsjKgnZ9jvnC6Yd/B9Cw9bMrrZSPqD5gaA69I9A48A10eInrBOQt993zWLP0fVq/gF1qt2DByoYKB3cS2+IfsH7MadOZBAarTjSE4rXhrbPcrjm3oJvVD7h6ilw38HBahykqn9AWN944u0bHJbB2egNT1vJrQTF3koIP0KLn9A2xL2vo2++QuWR9oZHRrakWDLQN5lcPd/Qe66tQn0LKW868wuqMNUQDtk4nflunT6gSx+JJ1kr1+DtuMATJgbYPmS09PwKTD8tPSBcrQMjsoQwnw16uC5+wcBEhFXaYDmt3/Sjm8kPiAOd5ja41u4chnFCb2hDjBtCVW5o+ZSwLxiLcLvMmxg07sD6gIrJgD1GF4Y+ftcGQ3xAbAZatqbi4dPXtFvPBxRL3GBIbkwURJDfIfWESIcDnS4==",
      "URL_PAYMENT_RECEIPT_HTML": "http://ppp-web-gateway-payu.transactional.payu.preprod/ppp-web-gateway-payu/app/v2?vid=1438936173Ybccc494c97bf4b7Y5f4bcef70c4d7b6"
    },
    "additionalInfo": null
  }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Ejemplo de una solicitud:**
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
      <accountId>521245</accountId>
      <referenceCode>Houston 123456789918</referenceCode>
      <description>Houston</description>
      <language>en</language>
      <notifyUrl>http://www.test.com/confirmation</notifyUrl>
      <additionalValues>
        <TX_VALUE>
          <value>1000</value>
          <currency>COP</currency>
        </TX_VALUE>
      </additionalValues>
      <buyer>
        <merchantBuyerId>1</merchantBuyerId>
        <fullName>APPROVED</fullName>
        <emailAddress>john.doe@payu.com</emailAddress>
        <contactPhone>7563126</contactPhone>
        <dniNumber>5415668464654</dniNumber>
        <shippingAddress>
          <street1>calle 99</street1>
          <street2>123</street2>
          <city>Medellin</city>
          <state>Antioquia</state>
          <country>CO</country>
          <postalCode>0000000</postalCode>
          <phone>7563126</phone>
        </shippingAddress>
      </buyer>
      <shippingAddress>
        <street1>calle 99</street1>
        <street2>123</street2>
        <city>Medellin</city>
        <state>Antioquia</state>
        <country>CO</country>
        <postalCode>0000000</postalCode>
        <phone>7563126</phone>
      </shippingAddress>
    </order>
    <payer>
      <merchantPayerId>1</merchantPayerId>
      <fullName>APPROVED</fullName>
      <emailAddress>john.doe@payu.com</emailAddress>
      <contactPhone>7563126</contactPhone>
      <dniNumber>5415668464654</dniNumber>
      <billingAddress>
        <street1>calle 99</street1>
        <street2>123</street2>
        <city>Bogota</city>
        <state>Bogota</state>
        <country>CO</country>
        <postalCode>0000000</postalCode>
        <phone>7563126</phone>
      </billingAddress>
    </payer>
    <type>AUTHORIZATION_AND_CAPTURE</type>
    <paymentMethod>INTEROPERABLE_QR</paymentMethod>
    <paymentCountry>CO</paymentCountry>
  </transaction>
  <isTest>false</isTest>
</request>
```
<br>

**Ejemplo de una respuesta:**
```XML
<response>
  <code>SUCCESS</code>
  <error xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
  <transactionResponse>
    <orderId>1438936173</orderId>
    <transactionId>bccc494c-97bf-4b7b-84ec-a7e9dac15449</transactionId>
    <state>PENDING</state>
    <paymentNetworkResponseCode xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
    <paymentNetworkResponseErrorMessage xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
    <trazabilityCode>a7463eca-3197-4a7f-8928-fbc7ca6017ea</trazabilityCode>
    <authorizationCode xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
    <pendingReason>AWAITING_NOTIFICATION</pendingReason>
    <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
    <errorCode xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
    <responseMessage xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
    <transactionDate xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
    <transactionTime xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
    <operationDate>1741780199019</operationDate>
    <referenceQuestionnaire xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
    <extraParameters>
      <EXPIRATION_DATE>1742490236444</EXPIRATION_DATE>
      <URL_PAYMENT_RECEIPT_PDF>http://ppp-web-gateway-payu.transactional.payu.preprod/ppp-web-gateway-payu/receipt?vid=1438936173Ybccc494c97bf4b7Y5f4bcef70c4d7b6</URL_PAYMENT_RECEIPT_PDF>
      <QRCODE_IMAGE_BASE64>iVBORw0KGgoAAAANSUhEUgAAAJ4AAACeAQAAAADr/o7WAAAEG0lEQVR4Xn2XQYqjOwyEDd4KdBWDtwZfXaCtQFcxaCvQlPN2M/5faJLuD5K2paqS0urfR7a/SV0oLY96rhjU19nF2egNPb3x6LHdTsywYWVvaFQ1/JzJyZSHwuQT4gNGrDMikj34f2BsCunhkq0NSvqCntqnuk5eI2fFyN85H1Ca/fX43f0Bq06P4xa6WlaU/1fPBxTiIbO1tYPa9mwx1xtqHedR1ktOtVFl/gWT8Owtxt7cVWnKB7Teh5xjnc/IDGdxe0NfGw1xJllyNseZa71hTvyJS8bWUBqdU+gNqznXVp62Bxp3htL6gKH7GI/w1shPpfoHjDaXoNAsVglFtH7L94JV5CqxdPcTrtQW38a94Nni0Qf7WIfkTG3rA3aRLZEoXSTku+Ke8wUdqm6zZspV1gmOmW8IPy0V2/AMT1Y6Bv08oeY6Nd2moW8Dr9vpDYNnP1C1MhrDzUoh2yesRmvjiWIeOBfa5NujF3Q96a6+kzIVvdN8QydtcD6UsNLG0XVF+4TBEqPYqpakT2OWD+jCzK3xlN7a8Witf8BgNGOWoiYOMVDF/oBqshAsNfoqfIZDtPmGsttahbN36oqwQlTaG1ZjhBWc7yuLEZR8FfKCoSVm3jsjKgnZ9jvnC6Yd/B9Cw9bMrrZSPqD5gaA69I9A48A10eInrBOQt993zWLP0fVq/gF1qt2DByoYKB3cS2+IfsH7MadOZBAarTjSE4rXhrbPcrjm3oJvVD7h6ilw38HBahykqn9AWN944u0bHJbB2egNT1vJrQTF3koIP0KLn9A2xL2vo2++QuWR9oZHRrakWDLQN5lcPd/Qe66tQn0LKW868wuqMNUQDtk4nflunT6gSx+JJ1kr1+DtuMATJgbYPmS09PwKTD8tPSBcrQMjsoQwnw16uC5+wcBEhFXaYDmt3/Sjm8kPiAOd5ja41u4chnFCb2hDjBtCVW5o+ZSwLxiLcLvMmxg07sD6gIrJgD1GF4Y+ftcGQ3xAbAZatqbi4dPXtFvPBxRL3GBIbkwURJDfIfWESIcDnS4==</QRCODE_IMAGE_BASE64>
      <URL_PAYMENT_RECEIPT_HTML>http://ppp-web-gateway-payu.transactional.payu.preprod/ppp-web-gateway-payu/app/v2?vid=1438936173Ybccc494c97bf4b7Y5f4bcef70c4d7b6</URL_PAYMENT_RECEIPT_HTML>
    </extraParameters>
    <additionalInfo xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
  </transactionResponse>
</response>
```

{{< /tab >}}

{{< /tabs >}}

## Enviar transacciones utilizando transferencia bancaria (PSE) {#submit-transactions-using-bank-transfer-pse}

Este método te permite procesar los pagos realizados por tus clientes por medio de transferencia bancaria. En Colombia, las transferencias bancarias se hacen a través de PSE, para integrarte con este método de pago, necesitas crear un formulario de pago siguiendo estos pasos:

1. Incluye un botón PSE button haciendo evidente que tu cliente va a utilizar _Proveedor de Servicios Electrónicos PSE_.
* Puedes utilizar los siguientes nombres:
    - Débito desde cuenta corriente/ahorros
    - Debito bancario PSE
    - PSE
* No utilices ninguno de los siguientes nombres:
    - Transferencia bancaria
    - Débito de cuenta
    - Tarjeta débito

2. Consulta la lista de bancos disponibles para mostrarla al pagador. Para consultar la lista de bancos, consulta [este método]({{< ref "#banks-list-for-pse" >}}).<br>Debes actualizar la lista de bancos en tu sistema por lo menos una vez al día.

3. Muestra la lista de bancos tal y como se muestra a continuación:

<img src="/assets/Payments/PSEBankList_ES.png" alt="PrintScreen" width="50%"><br>

Cuando el pagador seleccione un banco, debes enviar al parámetro `pseCode` seleccionado en el extra parámetro `FINANCIAL_INSTITUTION_CODE` de la petición.

4. Muestra una lista para que el pagador escoja si es una persona _Natural_ (N) o _Jurídica_ (J). Dependiendo de lo que escoja, debes enviar el valor en el extra parámetro `USER_TYPE` de la petición. La lista debe verse así:

<img src="/assets/Payments/PSEPersonList_ES.png" alt="PrintScreen" width="50%"><br>

{{% alert title="Nota" color="info"%}}

Este campo no es obligatorio para _PSE Avanza_.

{{% /alert %}}

5. Muestra una lista para que el pagador escoja su tipo de identificación. Debes enviar el código ISO del valor seleccionado en el extra parámetro `PSE_REFERENCE2` de la petición. La lista debe verse así:

<img src="/assets/Payments/PSEDocType_ES.png" alt="PrintScreen" width="50%"><br>

La lista de documentos disponibles es:

| ISO | Descripción |
|:-:|-|
| `CC` | Cédula de ciudadanía. |
| `CE` | Cédula de extranjería. |
| `NIT` | Número de Identificación Tributaria (Empresas). |
| `TI` | Tarjeta de identidad. |
| `PP` | Pasaporte. |
| `RC` | Registro civil de nacimiento. |
| `DE` | Documento de identificación extranjero. |

6. Debes enviar el número de identificación del pagador en el extra parámetro `PSE_REFERENCE3` de la petición.

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response-2}

<details>
<summary><b>Solicitud</b></summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Mostrar solo los campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Máx:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| `test` (JSON)<hr>`isTest` (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| `merchant` | Objeto |  | Este objeto tiene los datos de autenticación. | Sí |
| `merchant` > apiLogin | Alfanumérico | Min:12 Máx:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `merchant > apiKey` | Alfanumérico | Min:6 Máx:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `transaction` | Objeto | | Este objeto tiene los datos de la transacción. | Sí |
| `transaction > order` | Objeto | | Este objeto tiene los datos de la orden. | Sí |
| `transaction > order > accountId` | Numérico | | Identificador de tu cuenta. | Sí |
| `transaction > order > referenceCode` | Alfanumérico | Min:1 Máx:255 | Representa el identificador de la orden en tu sistema. | Sí |
| `transaction > order > description` | Alfanumérico | Min:1 Máx:255 | Descripción de la orden. | Sí |
| `transaction > order > language` | Alfanumérico | 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí |
| `transaction > order > notifyUrl` | Alfanumérico | Máx:2048 | URL de confirmación de la orden. | No|
| `transaction > order > partnerId` | Alfanumérico | Máx:255 | ID de aliado dentro de PayUID de aliado dentro de PayU. | No |
| `transaction > order > signature` | Alfanumérico | Máx:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| `transaction > order > shippingAddress` | Objeto | | Dirección de envío. | No |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Máx:100 | Línea de dirección 1. | No |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Máx:100 | Línea de dirección 2. | No |
| `transaction > order > shippingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección. | No |
| `transaction > order > shippingAddress > state` | Alfanumérico | Máx:40 | Departamento de la dirección. | No |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | País de la dirección. | No |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Máx:8 | Código postal de la dirección. | No |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Máx:11 | Número de teléfono asociado con la dirección. | No |
| `transaction > order > buyer` | Objeto |  | Información del comprador. | Sí |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Máx:100 | Identificador del comprador en tu sistema. | No |
| `transaction > order > buyer > fullName` | Alfanumérico | Máx:150 | Nombre del comprador. | Sí |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Máx:255 | Correo electrónico del comprador. | Sí |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Máx:20 | Número de teléfono del comprador. | Sí |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Máx:20 | Número de identificación del comprador. | Sí |
| `transaction > order > buyer > shippingAddress` | Objeto | | Dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Máx:150 | Línea de dirección 1 del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Máx:40 | Departamento de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| `transaction > order > buyer > shippingAddress > postalCode` | Numérico | Máx:20 | Código postal de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > phone` | Numérico | Máx:20 | Número de teléfono de la dirección del comprador. | Sí |
| `transaction > order > additionalValues` | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Monto de la transacción. | Sí |
| `transaction > order > additionalValues > TX_VALUE > value` | Numérico | 12, 2 | Especifica el monto de la transacción, este valor no puede tener decimales. | Sí |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| `transaction > payer` | Objeto | | Información del pagador. | Sí |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Correo electrónico del pagador. | Sí |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador del pagador en tu sistema. | No |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nombre del pagador. | Sí |
| `transaction > payer > billingAddress` | Objeto |  | Dirección de facturación. | Sí |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Línea 1 de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Línea 2 de la dirección de facturación. | No |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Departamento de la dirección de facturación. | No |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | Sí |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal de la dirección de facturación. | No |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Número de teléfono de la dirección de facturación. | No |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Fecha de nacimiento del pagador. | No |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Número de teléfono del pagador. | Sí |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificación del pagador. | Sí |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sí |
| `transaction > type` | Alfanumérico | 32 | Como estos pagos se realizan en la página web de PSE, la única transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sí |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecciona un método de pago por transferencia bancaria válido. [Ver los métodos de pago disponibles para Colombia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sí |
| `transaction > paymentCountry` | Alfanumérico | 2 | Asigna `CO` para Colombia. | Sí |
| `transaction > deviceSessionId` | Alfanumérico | Máx:255 | Identificador de la sesión del dispositivo donde el cliente realiza la transacción. Para más información, consulta [este artículo]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| `transaction > cookie` | Alfanumérico | Máx:255 | Cookie almacenada por el dispositivo donde el cliente realiza la transacción. | Sí |
| `transaction > userAgent` | Alfanumérico | Máx:1024 | User agent del navegador donde el cliente realiza la transacción. | Sí |
| `transaction > extraParameters` | Objeto | | Parámetros adicionales o datos asociados a la petición. <br>Para pagos por transferencia bancaria, esta es la página de respuesta de tu comercio.<br>En JSON, el parámetro _extraParameters_ se asigna como: <br>`"extraParameters": {`<br>&emsp;`"RESPONSE_URL": "http://www....",`<br>&emsp;`"PSE_REFERENCE1": "example_value"`,<br>&emsp;`"FINANCIAL_INSTITUTION_CODE": "XXXX"`,<br>&emsp;`"USER_TYPE": "N"`,<br>&emsp;`"PSE_REFERENCE2": "example_value"`,<br>&emsp;`"PSE_REFERENCE3": "123456789"`<br>`}`<br><br><span style="color: #A6C307;">Nota:</span> Ten en cuenta que en el campo `"USER_TYPE"`, los valores permitidos son: <li> `"N"` para **persona natural** <li> `"J"` para **persona legal**.<br><br>En XML, el parámetro _extraParameters_ se asigna como: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>  `<string>RESPONSE_URL</string>`<br>  `<string>http://www....</string>`<br>&emsp;`</entry>`<br>&emsp;`<entry>`<br>  `<string>PSE_REFERENCE1</string>`<br>  `<string>example_value</string>`<br>&emsp;`</entry>`<br>&emsp;`<entry>` `<string>FINANCIAL_INSTITUTION_CODE</string>`<br>  `<string>XXXX</string>`<br>&emsp;`</entry>`<br>&emsp;`<entry>`<br>  `<string>USER_TYPE</string>`<br>  `<string>N</string>`<br>&emsp;`</entry>`<br>&emsp;`<entry>`<br>  `<string>PSE_REFERENCE2</string>`<br>  `<string>example_value</string>`<br>&emsp;`</entry>`<br>&emsp;`<entry>`<br>  `<string>PSE_REFERENCE3</string>`<br>  `<string>123456789</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`<br><br><span style="color: #A6C307;">Nota:</span> Ten en cuenta que en el campo `<string>USER_TYPE</string>`, los valores permitidos son: <li> `<string>N</string>`: para **persona natural**. <li> `<string>J</string>`: para **persona legal**. | Sí |

</details>

<details>
<summary><b>Respuesta</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| `code` | Alfanumérico | | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| `transactionResponse` | Objeto | | Datos de la respuesta. |
| `transactionResponse > orderId` | Numérico | | Identificador generado o existente de la orden en PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | Identificador de la transacción en PayU. |
| `transactionResponse > state` | Alfanumérico | Máx:32 | Estado de la transacción. Como el pago se realiza de forma externa, el estado de una transacción exitosa es `PENDING` |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx:255 | Código de respuesta retornado por la red bancaria. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx:255 | Mensaje de error retornado por la red bancaria. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx:32 | Código de trazabilidad retornado por la red bancaria. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx:12 | Código de autorización retornado por la red bancaria. |
| `transactionResponse > pendingReason` | Alfanumérico | Máx:21 | Código de la razón asociada con el estado, como se mencionó en  `transactionResponse > state`, la transacción está en espera del pago. |
| `transactionResponse > responseCode` | Alfanumérico | Máx:64 | Código de respuesta asociado con el estado. En este caso, para una transacción exitosa es `PENDING_TRANSACTION_CONFIRMATION`. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx:2048 | Mensaje asociado con el código de respuesta. |
| `transactionResponse > operationDate` | Fecha | | Fecha de creación de la respuesta en el sistema de PayU. |
| `transactionResponse > extraParameters` | Objeto | | Parámetros adicionales o datos asociados con la respuesta.<br>En JSON, el parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"BANK_URL": "xxxx"`<br>`}`<br><br>En XML, el parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_URL</string>`<br>&emsp;&emsp;`<string>xxxx</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Consideraciones {#considerations-2}

* Para probar las transferencias bancarias PSE en el ambiente de Sandbox de PayU, consulta la [Guía de pruebas de PSE (PDF)](/assets/pse-test-guide-v5-es.pdf).
* Todos los valores de pago deben estar formateados en miles sin excepción (p.ej., 1,200.00 o 1,200).
* Si la solicitud de pago es exitosa, el estado de la transacción es pendiente (`PENDING`) y el `responseCode` es `PENDING_TRANSACTION_CONFIRMATION`; esto es debido a que el pagador es redirigido al banco seleccionado para completar el pago; debes redirigir al pagador a la URL retornada en el extra parámetro `BANK_URL`.
* La URL retornada en el extra parámetro `BANK_URL` se configura en el Modulo PayU y debe mostrar la siguiente información:<br><br>![PrintScreen](/assets/Payments/PSEresponse-es.png)<br>Los parámetros que empiezan con el símbolo $ se envían vía `GET`.
* Una vez el cliente hace clic en el botón de pago, debe desactivarse para evitar enviar una nueva solicitud sobre el mismo pago.
* No muestres la página del banco en contenedores (frames, panel, iframes, etc). El proceso de pago debe ser fluido. Además, evita abrir la página del banco en una nueva pestaña o en una nueva ventana del navegador. Si necesitas utilizar una nueva pestaña o ventana, bloquea la página de origen para evitar enviar una nueva solicitud sobre el mismo pago.
* Debes agregar a la página de respuesta las opciones para reintentar el pago, finalizar la transacción e imprimir el recibo.
* Los estados mostrados en la página de respuesta pueden ser los siguientes:

| polTransactionState | polResponseCode | Estado |
|-|-|-|
| `4` | `1` | Transacción aprobada |
| `6` | `5` | Transacción fallida |
| `6` | `4` | Transacción rechazada |
| `12` o `14` | `9994` o `25` | Transacción pendiente, por favor revisar si el débito fue realizado en el banco. |

### Llamado a la API {#api-call-2}

Los siguientes son los cuerpos de la petición y la respuesta para este método de pago.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una solicitud:**
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

**Ejemplo de una respuesta:**
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

**Ejemplo de una solicitud:**
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

**Ejemplo de una respuesta:**
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

### Lista de bancos para PSE {#banks-list-for-pse}

Este método retorna la lista de bancos disponibles para realizar [pagos utilizando PSE]({{< ref "#submit-transactions-using-bank-transfer-pse" >}}). 

#### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response-3}

<details>
<summary><b>Solicitud</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Máx:32 | Asigna `GET_BANKS_LIST`. | Sí |
| `test` (JSON)<hr>`isTest` (XML) | Booleano | | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| `merchant` | Objeto | | Este objeto tiene los datos de autenticación. | Sí |
| `merchant > apiLogin` | Alfanumérico | Min:12 Máx:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `merchant > apiKey` | Alfanumérico | Min:6 Máx:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `bankListInformation` | Objeto | | Este objeto tiene la información de la consulta. | Sí |
| `bankListInformation > paymentMethod` | Alfanumérico | | Asigna `PSE`. | Sí |
| `bankListInformation > paymentCountry` | Alfanumérico | | Asigna `CO`. | Sí |

</details>

<details>
<summary><b>Respuesta</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| `code` | Alfanumérico | | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| `banks` | Objeto | | Lista de bancos disponibles en PSE. |
| `banks > id` | Numérico | | Identificador interno del banco. |
| `banks > description` | Alfanumérico | | Nombre del banco para ser mostrado en la lista. |
| `banks > pseCode` | Alfanumérico | | Código para enviar en el extra parámetro `FINANCIAL_INSTITUTION_CODE` de la solicitud de pago. |

</details>

#### Llamado a la API {#api-call-3}

Los siguientes son los cuerpos de la petición y la respuesta para este método.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una solicitud:**
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

**Ejemplo de una respuesta:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "banks": [        
        {
            "id": "d9280852-47a5-4e99-94ac-3d7648ba79a3",
            "description": "BANCO AGRARIO",
            "pseCode": "1040"
        },        
        {
            "id": "6e61a91d-58bf-46ec-aa09-1f44974dda7e",
            "description": "BANCO CAJA SOCIAL",
            "pseCode": "10322"
        },        
        {
            "id": "b1de44f1-cede-4aca-9d3f-3313d5cc0c63",
            "description": "BANCO DAVIVIENDA",
            "pseCode": "1051"
        },        
        {
            "id": "ed06f40e-a1b9-4e48-8851-bffb4cda0480",
            "description": "BANCO DE BOGOTA",
            "pseCode": "1039"
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
            "id": "201acc05-4c4f-49dc-9be6-3261a6ce4a3c",
            "description": "RAPPIPAY",
            "pseCode": "1151"
        }
    ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Ejemplo de una solicitud:**
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

**Ejemplo de una respuesta:**
```XML
<bankListResponse>
    <code>SUCCESS</code>
    <banks>
        <bank>
            <id>d9280852-47a5-4e99-94ac-3d7648ba79a3</id>
            <description>BANCO AGRARIO</description>
            <pseCode>1040</pseCode>
        </bank>
        <bank>
            <id>6e61a91d-58bf-46ec-aa09-1f44974dda7e</id>
            <description>BANCO CAJA SOCIAL</description>
            <pseCode>10322</pseCode>
        </bank>
        <bank>
            <id>b1de44f1-cede-4aca-9d3f-3313d5cc0c63</id>
            <description>BANCO DAVIVIENDA</description>
            <pseCode>1051</pseCode>
        </bank>
        <bank>
            <id>ed06f40e-a1b9-4e48-8851-bffb4cda0480</id>
            <description>BANCO DE BOGOTA</description>
            <pseCode>1039</pseCode>
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
            <id>201acc05-4c4f-49dc-9be6-3261a6ce4a3c</id>
            <description>RAPPIPAY</description>
            <pseCode>1151</pseCode>
        </bank>        
    </banks>
</bankListResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Enviar transacciones utilizando Google Pay {#submit-transactions-using-google-pay}

Google Pay es una billetera digital que permite realizar pagos con tarjeta de forma sencilla y rápida, sin necesidad de introducir los datos de la tarjeta en cada pago. Los datos de la tarjeta son almacenados de forma segura por Google. Este método de pago está disponible para todos los dispositivos (teléfonos móviles y ordenadores), independientemente del sistema operativo y en casi todos los navegadores web.

En caso de utilizar Google Pay, los comercios deben adherirse a la [Política de uso aceptable](https://payments.developers.google.com/terms/aup) de las API de Google Pay y aceptar los términos que definen las [Condiciones de servicio de las API de Google Pay](https://payments.developers.google.com/terms/sellertos).

{{% alert title="Nota" color="info"%}}

La descripción que figura a continuación se aplica a la prestación de este servicio directamente mostrando la ventana emergente de Google Pay en el sitio web del receptor del pago (e-commerce).

{{% /alert %}}

Si deseas ofrecer este método de pago a través de PayU Web-Checkout, no se requiere ningún esfuerzo de integración adicional. Contacta a tu gerente de cuenta para realizar la solicitud de activación. Si deseas probar el método de pago antes de la activación, puedes seguir las instrucciones [aquí](#pruebas-para-comercios-con-integración-web-checkout).

Ten en cuenta que si tu integración con PayU es API, debes realizar los ajustes que se describen en esta sección para procesar transacciones de Google Pay: 

* [Realizar la integración API del medio de pago](#integración-api-del-medio-de-pago)
* [Probar el método de pago](#probar-el-método-de-pago) 

### Integración API del medio de pago

Para integrar el sitio web con el monedero Google Pay, procede según las instrucciones que figuran en este sitio web:
* [Documentación de la API](https://developers.google.com/pay/api/web)
* [Lista de chequeo de integración de API](https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist)
* [Directrices de la marca](https://developers.google.com/pay/api/web/guides/brand-guidelines)

##### Definiciones de PayU para la integración API del medio de pago

A continuación encontrarás información relevante que debes considerar durante la integración del medio de pago para que tus pagos sean procesados por PayU:

* ###### Solicitar un payment token para PayU

Google encripta la información de la tarjeta seleccionada por el pagador para su procesamiento seguro, esto es realizado por un proveedor de pagos. El parámetro ```gateway``` en el script debe tener el valor constante de ```payulatam```, y el ```gatewayMerchantId``` debe incluir tu número de cuenta PayU. A continuación un ejemplo:

```
const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    'gateway': 'payulatam',
    'gatewayMerchantId': 'YOUR_ACCOUNT_ID '
  }
};
```

* ###### Medios de pago soportados

PayU procesa pagos de Google Pay para tarjetas Mastercard y Visa. Para configurar tu script de Google, utiliza estos ajustes:

```
const allowedCardNetworks = ["MASTERCARD", "VISA", "ELECTRON", "MAESTRO"];
const allowedCardAuthMethods = ["PAN_ONLY"];
```

{{% alert title="Nota" color="info"%}}

La disponibilidad de los métodos de pago depende de tu configuración en PayU.

{{% /alert %}}

Google devolverá un objeto `PaymentData`, y el campo `paymentMethodData.tokenizationData.token` contendrá un token de Google Pay encriptado de forma segura (una cadena de caracteres).

A continuación, un ejemplo de un token de Google Pay:

```
{
  "protocolVersion":"ECv2",
  "signature":"MEUCIG39tbaQPwJe28U+UMsJmxUBUWSkwlOv9Ibohacer+CoAiEA8Wuq3lLUCwLQ06D2kErxaMg3b/oLDFbd2gcFze1zDqU\u003d",
  "intermediateSigningKey":{
    "signedKey": "{\"keyExpiration\":\"1542394027316\",\"keyValue\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE/1+3HBVSbdv+j7NaArdgMyoSAM43yRydzqdg1TxodSzA96Dj4Mc1EiKroxxunavVIvdxGnJeFViTzFvzFRxyCw\\u003d\\u003d\"}",
    "signatures": ["MEYCIQDcXCoB4fYJF3EolxrE2zB+7THZCfKA7cWxSztKceXTCgIhAN/d5eBgx/1A6qKBdH0IS7/aQ7dO4MuEt26OrLCUxZnl"]
  },
  "signedMessage":"{\"tag\":\"TjkIKzIOvCrFvjf7/aeeL8/FZJ3tigaNnerag68hIaw\\u003d\",\"ephemeralPublicKey\":\"BLJoTmxP2z7M2N6JmaN786aJcT/L/OJfuJKQdIXcceuBBZ00sf5nm2+snxAJxeJ4HYFTdNH4MOJrH58GNDJ9lJw\\u003d\",\"encryptedMessage\":\"mleAf23XkKjj\"}"
}
```

 ### Procesar transacciones de Google Pay en PayU

 La función principal de Google Pay como billetera digital es almacenar tarjetas de crédito para facilitar el procesamiento de pagos. Con eso en mente, para el procesamiento de transacciones de Google Pay en PayU, la lógica a aplicar será la misma que para tarjetas de crédito, excepto por las siguientes particularidades:

* Si estás procesando transacciones de tus clientes con Google Pay, debes configurar la información de la billetera digital en el parámetro ```transaction.digitalWallet```.
* Dentro del parámetro ```transaction.digitalWallet``` utiliza ```GOOGLE_PAY``` para el campo ```transaction.digitalWallet.type``` y envía el Google Pay token en el campo ```transaction.digitalWallet.message```. 
* Ten en cuenta que dentro del parámetro ```transaction.creditcard```, para las transacciones de Google Pay, siempre debes enviar un valor válido para el campo ```transaction.creditcard.name```. Otros campos de este parámetro no son necesarios ya que Google Pay los entrega dentro del Google Pay token.
* Contacta a tu gerente de cuenta para realizar las activaciones necesarias para procesar sin cvv ya que este medio de pago lo requiere.

### Probar el método de pago

Esta sección está diseñada para guiar a los usuarios sobre el proceso de prueba y familiarización con el método de pago Google Pay en PayU. 

**Requisitos previos (aplica para la integración API y Web Checkout):**
* Asegúrate de haber iniciado sesión en el explorador con la cuenta de Gmail con la que vas a realizar la prueba.
* Únete al grupo de Google en el que estarán disponibles las tarjetas de prueba para PayU. El grupo se encuentra en la siguiente [documentación de Google](https://developers.google.com/pay/api/android/guides/resources/test-card-suite).

#### Pruebas para comercios con integración API:

1.	Una vez realizados los cambios indicados en los apartados anteriores, utiliza el Archivo Simulador de Token para simular una transacción y obtener un token de Google Pay de muestra. El simulador puede visualizarse <a href="https://developers.payulatam.com/latam/es/docs/integrations/api-integration/simulator.html" target="_blank">aquí</a>.

{{% alert title="Nota" color="info"%}}

Para garantizar un procesamiento correcto, al momento de seleccionar las tarjetas para el pago,   utiliza tarjetas cuyo nombre no empiecen por "Test". 

{{% /alert %}}

2. Utiliza la información del token de Google Pay de muestra para completar el request de PayU. Envíala a PayU para obtener prueba de una transacción aprobada. Si tienes algún resultado no aprobado, revisa la documentación de los pasos anteriores.

<video width="630" height="300" controls>
    <source src="/assets/GooglePay/API.mp4" type="video/mp4">
</video>

#### Pruebas para comercios con integración Web Checkout:

Utiliza el Web Checkout en [ambiente de prueba](https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/test/prueba_pago.jsp) para simular una transacción. 

{{% alert title="Nota" color="info"%}}

* Para garantizar un procesamiento correcto, al momento de seleccionar las tarjetas para el pago, utiliza tarjetas cuyo nombre no empiecen por "Test". 
* Usa las credenciales de prueba de Colombia para esta prueba. Consulta las credenciales [aquí](https://developers.payulatam.com/latam/es/docs/getting-started/test-your-solution.html).

{{% /alert %}}

<video width="630" height="300" controls>
    <source src="/assets/GooglePay/Colombia_WebCheckout.mp4" type="video/mp4">    
</video>

### Llamado a la API {#api-call-4}

Los siguientes son ejemplos de los cuerpos de la petición y la respuesta de este método de pago.


{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una solicitud:**
```JSON
{
    "language": "es",
    "command": "SUBMIT_TRANSACTION",
    "merchant": {
        "apiKey": "012345678901",
        "apiLogin": "012345678901"
    },
    "transaction": {
        "order": {
            "accountId": "9",
            "language": "es",
            "description" : "test",
            "signature": "{{payu_signature}}",
            "referenceCode": "{{payu_ref_code}}",
            "additionalValues": {
                "TX_VALUE": {
                    "value": 100,
                    "currency": "ARS"
                }
            }
        },
        "payer": {
            "merchantPayerId": "1",
            "fullName": "First name and second payer name",
            "emailAddress": "payer.name@payu.com",
            "contactPhone": "7563126",
            "dniNumber": "5415668464654",
            "dniType": null
        },
        "creditCard": {
            "name": "Kevin Pelaez"
        },
        "digitalWallet": {
            "type" : "GOOGLE_PAY",
            "message" : "{\"signature\":\"MEUCIQCSsfd63AcUEjNRnpgqEm/B6cm8Fna1ty+HatD4Hqp/bgIgHCtrwKhvO1e5K3vDfE6FxqSaRkP9PHuY63aQ35gV5lk\\u003d\",\"intermediateSigningKey\":{\"signedKey\":\"{\\\"keyValue\\\":\\\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAExtzNORa//EJphgvdpUTsDElAg26mYXxNqs8/UX7DDSDCojJ/2+GCf8CVmClyRM+bukNsYM82pwkjZqOe5AOxUg\\\\u003d\\\\u003d\\\",\\\"keyExpiration\\\":\\\"1695147545256\\\"}\",\"signatures\":[\"MEQCIAxxj2BnQzTyTXLzjJ08JG+s1qdmX1XlOxzFmq1THTJ4AiAe7anOO7l+KZ1nkbGBufXBuQGInFMGR70+I33EyCL5GQ\\u003d\\u003d\"]},\"protocolVersion\":\"ECv2\",\"signedMessage\":\"{\\\"encryptedMessage\\\":\\\"GNKqqZ7bx6btPTkZPjpvi1IHKS79JrdtOI3bRZA6G5936ofXqD/m3f/YpuF4mlADkHIhmBYVq6hzyA0B4M1cjht7BFsQhE5fqA+6PgbPY6eAqaH4PPQGt/3VM9uVxmtcJK6k2JL8N7CCF85vx6s+LASH4wwO3Sk2NIlPB0B2QHdfdrOpwo5r6T3xYJAq6wHqFNrdOLq5NTodDqEaXP3y/MwpMufTWEBm2rsk6HqTh1Qz+d72aph3U3bRQVhFj3ZE2ZsIXIc7dwCLGV\\\",\\\"ephemeralPublicKey\\\":\\\"BNgz4XETGJgixJYrYHLXjQrRaZ9i2q2Z2uGTOFNuVY5ZiCFiSJeiP0l+dt+Y0r8I29l5F2Lwd+e8torE3vSMm9g\\\\u003d\\\",\\\"tag\\\":\\\"NUJPbcTwbfWBC3ByHzcwQz/bEsbt80vh1ahXoRY4xAQ\\\\u003d\\\"}\"}"
        },
        "extraParameters": {
            "INSTALLMENTS_NUMBER": 1
        },
        "type": "AUTHORIZATION_AND_CAPTURE",
        "paymentMethod": "MASTERCARD",
        "paymentCountry": "BR"
    },
    "test": false
}
```
<br>

**Ejemplo de una respuesta:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400437001,
        "transactionId": "f0f8c441-43e8-490a-b4f2-c14d2c403175",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "6",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "282856",
        "authorizationCode": "MOCK-CIELO-1624047897817",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624029898077,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "CIELO_TID": "1006993069000509C28A"
        },
        "additionalInfo": null
    }
} 
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Ejemplo de una solicitud:**
```XML
<request>
        <language>es</language>
     <command>SUBMIT_TRANSACTION</command>
     <merchant>
         <apiKey>012345678901</apiKey>
         <apiLogin>012345678901</apiLogin>
     </merchant>
     <transaction>
         <order>
             <accountId>9</accountId>
             <language>es</language>
             <description>test</description>
             <signature>{{payu_signature}}</signature>
             <referenceCode>{{payu_ref_code}}</referenceCode>
             <additionalValues>
                 <TX_VALUE>
                     <value>100</value>
                     <currency>ARS</currency>
                 </TX_VALUE>
             </additionalValues>
         </order>
         <payer>
             <merchantPayerId>1</merchantPayerId>
             <fullName>First name and second payer name</fullName>
             <emailAddress>payer.name@payu.com</emailAddress>
             <contactPhone>7563126</contactPhone>
             <dniNumber>5415668464654</dniNumber>
             <dniType></dniType>
         </payer>
         <creditCard>
             <name>Kevin Pelaez</name>
         </creditCard>
         <digitalWallet>
             <type>GOOGLE_PAY</type>
             <message>{"signature":"MEUCIQCSsfd63AcUEjNRnpgqEm/B6cm8Fna1ty+HatD4Hqp/bgIgHCtrwKhvO1e5K3vDfE6FxqSaRkP9PHuY63aQ35gV5lk\u003d","intermediateSigningKey":{"signedKey":"{\"keyValue\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAExtzNORa//EJphgvdpUTsDElAg26mYXxNqs8/UX7DDSDCojJ/2+GCf8CVmClyRM+bukNsYM82pwkjZqOe5AOxUg\\u003d\\u003d\",\"keyExpiration\":\"1695147545256\"}","signatures":["MEQCIAxxj2BnQzTyTXLzjJ08JG+s1qdmX1XlOxzFmq1THTJ4AiAe7anOO7l+KZ1nkbGBufXBuQGInFMGR70+I33EyCL5GQ\u003d\u003d"]},"protocolVersion":"ECv2","signedMessage":"{\"encryptedMessage\":\"GNKqqZ7bx6btPTkZPjpvi1IHKS79JrdtOI3bRZA6G5936ofXqD/m3f/YpuF4mlADkHIhmBYVq6hzyA0B4M1cjht7BFsQhE5fqA+6PgbPY6eAqaH4PPQGt/3VM9uVxmtcJK6k2JL8N7CCF85vx6s+LASH4wwO3Sk2NIlPB0B2QHdfdrOpwo5r6T3xYJAq6wHqFNrdOLq5NTodDqEaXP3y/MwpMufTWEBm2rsk6HqTh1Qz+d72aph3U3bRQVhFj3ZE2ZsIXIc7dwCLGV\",\"ephemeralPublicKey\":\"BNgz4XETGJgixJYrYHLXjQrRaZ9i2q2Z2uGTOFNuVY5ZiCFiSJeiP0l+dt+Y0r8I29l5F2Lwd+e8torE3vSMm9g\\u003d\",\"tag\":\"NUJPbcTwbfWBC3ByHzcwQz/bEsbt80vh1ahXoRY4xAQ\\u003d\"}"}</message>
         </digitalWallet>
         <extraParameters>
             <INSTALLMENTS_NUMBER>1</INSTALLMENTS_NUMBER>
         </extraParameters>
         <type>AUTHORIZATION_AND_CAPTURE</type>
         <paymentMethod>MASTERCARD</paymentMethod>
         <paymentCountry>BR</paymentCountry>
     </transaction>
     <test>false</test>
</request>
```
<br>

**Ejemplo de una respuesta:**
```XML
<paymentResponse>
         <code>SUCCESS</code>
     <error></error>
     <transactionResponse>
         <orderId>1400437001</orderId>
         <transactionId>f0f8c441-43e8-490a-b4f2-c14d2c403175</transactionId>
         <state>APPROVED</state>
         <paymentNetworkResponseCode>6</paymentNetworkResponseCode>
         <paymentNetworkResponseErrorMessage></paymentNetworkResponseErrorMessage>
         <trazabilityCode>282856</trazabilityCode>
         <authorizationCode>MOCK-CIELO-1624047897817</authorizationCode>
         <pendingReason></pendingReason>
         <responseCode>APPROVED</responseCode>
         <errorCode></errorCode>
         <responseMessage></responseMessage>
         <transactionDate></transactionDate>
         <transactionTime></transactionTime>
         <operationDate>1624029898077</operationDate>
         <referenceQuestionnaire></referenceQuestionnaire>
         <extraParameters>
             <BANK_REFERENCED_CODE>CREDIT</BANK_REFERENCED_CODE>
             <CIELO_TID>1006993069000509C28A</CIELO_TID>
         </extraParameters>
         <additionalInfo></additionalInfo>
     </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

<br>

Encuentra la descripción del objeto `transaction.digitalWallet` y sus campos en la sección de [Parámetros](https://developers.payulatam.com/latam/es/docs/integrations/api-integration/payments-api-colombia.html#parameters-for-request-and-response).

## Enviar transacciones utilizando Nequi {#submit-transactions-using-nequi}

Nequi es una plataforma integral de servicios financieros que funciona por medio de una billetera digital disponible para millones de usuarios a través de una aplicación móvil. Con Nequi, puedes realizar pagos, transferencias, recargas y retiros de dinero de manera rápida y segura, todo desde tu dispositivo personal.

Además de ser una herramienta conveniente para usuarios individuales, Nequi también es una solución de pagos innovadora para comercios. Al aceptar pagos con Nequi, tu negocio puede disfrutar de una serie de ventajas significativas:

* **Aumento de las ventas:** Al ofrecer Nequi como opción de pago, tu negocio puede atraer a nuevos clientes que prefieren realizar transacciones digitales. Esto puede traducirse en un aumento de las ventas y una mayor fidelización de clientes.

* **Mayor conveniencia:** Al permitir que tus clientes paguen con Nequi, estás proporcionando una experiencia de compra más versátil y rápida. Los clientes pueden realizar sus pagos de forma instantánea utilizando sus teléfonos móviles, sin necesidad de efectivo o tarjetas físicas.

* **Mayor seguridad:** Nequi ofrece un entorno de pago seguro y confiable, respaldado por Bancolombia, una de las instituciones financieras más grandes y confiables de Colombia. Esto brinda tranquilidad tanto a los comercios como a los clientes, ya que las transacciones se realizan de manera segura y protegida.

### Proceso de pago con Nequi {#payment-process-with-nequi}

El flujo de pago con Nequi está diseñado para ser sencillo y ágil para el usuario. El proceso incluye 4 pasos:

1. **Selección del medio de pago:** El cliente, al momento de efectuar la compra, elige Nequi como su medio de pago preferido entre las opciones disponibles.

2. **Generación de notificación push:** Automáticamente, el sistema genera una notificación push que se envía a la aplicación móvil de Nequi del cliente.

3. **Aceptación de la notificación:** El cliente recibe la notificación en su aplicación Nequi y procede a aceptarla para confirmar la transacción.

4. **Ingreso del PIN de Nequi:** Para finalizar la operación, el cliente ingresa su PIN personal de Nequi para autenticar y autorizar el pago.

### Experiencia de usuario {#user-experience-1}

Esta sección describe los elementos necesarios para una experiencia óptima del usuario al usar Nequi como método de pago:

1. Solicita el nombre y correo electrónico del comprador, por ejemplo:

<img src="/assets/Payments/NEQUI_ES_01.png" alt="PrintScreen" width="420">
<p></p>

2. Presenta Nequi como método de pago y solicita el número de teléfono asociado con la cuenta de Nequi, por ejemplo:

<img src="/assets/Payments/NEQUI_ES_02.png" alt="PrintScreen" width="420">
<p></p>

3. Proporciona un resumen detallado del pago. 

{{% alert title="Nota" color="info"%}}

La imagen a continuación es un ejemplo de la página de resumen de PayU, puedes aprovechar esta página redirigiendo a los usuarios a la URL proporcionada en el campo `URL_PAYMENT_RECEIPT_HTML` de la respuesta de la API, o puedes diseñar tu propio recibo extrayendo los datos de los campos correspondientes de la respuesta. Para más información, consulta la sección de [Parámetros para Solicitud y Respuesta]({{< ref "#parameters-for-request-and-response-1" >}}).

{{% /alert %}}

<img src="/assets/Payments/NEQUI_ES_03.png" alt="PrintScreen" width="500">
<p></p>

4. Describe los pasos a seguir para facilitar el proceso de pago para el comprador. La página de resumen de PayU ya incluye estas instrucciones, pero si estás creando una página personalizada, recomendamos mostrar los pasos para completar el proceso a través de Nequi. Por ejemplo:

<img src="/assets/Payments/NEQUI_ES_04.png" alt="PrintScreen" width="420">
<p></p>

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response-4}

<details>
<summary><b>Solicitud</b></summary>
<label for="table3" class="showMandatory"><input type="checkbox" id="table3" name="table3" value="true" onchange="showMandatory(this)"> Mostrar solo los campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la solicitud, este idioma se utiliza para mostrar los mensajes de error generados. [Consulta los idiomas admitidos]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Máx:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| `test` (JSON)<hr>`isTest` (XML) | Booleano | | Asigna `true` si la solicitud está en modo de prueba. De lo contrario, asigna `false`. | Sí |
| `merchant` | Objeto | | Este objeto contiene los datos de autenticación.  | Sí  |
| `merchant > apiLogin` | Alfanumérico | Min:12 Máx:32 | Nombre de usuario o login proporcionado por PayU. | Sí |
| `merchant > apiKey` | Alfanumérico | Min:6 Máx:32 | Contraseña proporcionada por PayU. | Sí |
| `transaction` | Objeto | | Este objeto contiene los datos de la transacción. | Sí |
| `transaction > order` | Objeto | | Este objeto contiene los datos de la orden. | Sí |
| `transaction > order > accountId` | Número | | Identificador de tu cuenta. | Sí |
| `transaction > order > referenceCode` | Alfanumérico | Min:1 Máx:255 | Representa el identificador de la orden en tu sistema. | Sí |
| `transaction > order > description` | Alfanumérico | Min:1 Máx:255 | Descripción de la orden. | Sí |
| `transaction > order > language` | Alfanumérico | 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí |
| `transaction > order > notifyUrl` | Alfanumérico | Máx:2048 | URL de confirmación de la orden. | No |
| `transaction > order > partnerId` | Alfanumérico | Máx:255 | ID de socio en PayU. | No |
| `transaction > order > signature` | Alfanumérico | Máx:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| `transaction > order > shippingAddress` | Objeto | | Dirección de envío. | No |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Máx:100 | Línea de dirección 1. | No |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Máx:100 | Línea de dirección 2. | No |
| `transaction > order > shippingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección. | No |
| `transaction > order > shippingAddress > state` | Alfanumérico | Máx:40 | Departamento de la dirección. | No |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | País de la dirección. | No |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Máx:8 | Código postal de la dirección. | No |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Máx:11 | Número de teléfono asociado con la dirección. | No |
| `transaction > order > buyer` | Objeto | | Información del comprador. | Sí |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Máx:100 | ID del comprador en tu sistema. | No |
| `transaction > order > buyer > fullName` | Alfanumérico | Máx:150 | Nombre completo del comprador. | Sí |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Máx:255 | Correo electrónico del comprador. | Sí |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Máx:20 | Número de teléfono del comprador. | Sí |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Máx:20 | Número de identificación del comprador. | Sí |
| `transaction > order > buyer > shippingAddress` | Objeto | | Dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Máx:150 | Línea 1 de la dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Máx:40 | Departamento de la dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País de la dirección de envío del comprador en formato ISO 3166 alfa-2. | Sí |
| `transaction > order > buyer > shippingAddress > postalCode` | Número | Máx:20 | Código postal de la dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > phone` | Número | Máx:20 | Número de teléfono de la dirección de envío del comprador. | Sí |
| `transaction > order > additionalValues` | Alfanumérico | 64 | Monto de la orden y sus valores asociados. | Sí |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Monto de la transacción. | Sí |
| `transaction > order > additionalValues > TX_VALUE > value` | Número | 12, 2 | Especifica el monto de la transacción. Este monto no puede incluir decimales. | Sí |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Consulta las monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > order > additionalValues > TX_TAX` | Alfanumérico | 64 | Monto del Impuesto al Valor Agregado (IVA). | Sí |
| `transaction > order > additionalValues > TX_TAX > value` | Número | 12, 2 | Especifica el monto del IVA. Si este parámetro no está configurado, PayU aplica el valor de impuesto actual (19%). Si el monto no tiene IVA, envía 0. Este valor puede tener dos dígitos decimales. | No |
| `transaction > order > additionalValues > TX_TAX > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Consulta las monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alfanumérico | 64 | Valor base para calcular el IVA. Si el monto no tiene IVA, envía 0. Este valor puede tener dos dígitos decimales. | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Número | 12, 2 | Especifica el monto base de la transacción. | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Consulta las monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > payer` | Objeto | | Información del pagador. | Sí |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Correo electrónico del pagador. | Sí |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador del pagador en tu sistema. | No |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nombre del pagador. | Sí |
| `transaction > payer > billingAddress` | Objeto | | Dirección de facturación. | Sí |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Línea 1 de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Línea 2 de la dirección de facturación. | No |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Departamento de la dirección de facturación. | No |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 alfa-2. | Sí |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal de la dirección de facturación. | No |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Número de teléfono de la dirección de facturación. | No |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Fecha de nacimiento del pagador. | No |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Número de teléfono del pagador. Este es el número que se utilizará para pagar en Nequi. | Sí |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificación del comprador. | Sí |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificación del comprador. [Consulta los tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}).. | No |
| `transaction > type` | Alfanumérico | 32 | Asigna este valor de acuerdo con la transacción. Para Colombia, asigna `AUTHORIZATION_AND_CAPTURE`. | Sí |
| `transaction > paymentMethod` | Alfanumérico | 32 | Asigna `NEQUI` para el Método de Pago Nequi. | Sí |
| `transaction > paymentCountry` | Alfanumérico | 2 | Asigna `CO` para Colombia. | Sí  |
| `transaction > deviceSessionId` | Alfanumérico | Máx:255 | Identificador de sesión del dispositivo donde el cliente realiza la transacción. Para más información, consulta [esta sección]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| `transaction > cookie` | Alfanumérico | Máx:255 | Cookie almacenada por el dispositivo donde el cliente realiza la transacción. | Sí |
| `transaction > userAgent` | Alfanumérico | Máx:1024 | El agente de usuario del navegador donde el cliente realiza la transacción. | Sí |

</details>

<details>
<summary><b>Respuesta</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| `code` | Alfanumérico | | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| `transactionResponse` | Objeto | | Datos de la respuesta. |
| `transactionResponse > orderId` | Número | | Identificador de orden generado o existente en PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | Identificador de la transacción en PayU. |
| `transactionResponse > state` | Alfanumérico | Máx:32 | Estado de la transacción. |
| `transactionResponse > responseCode` | Alfanumérico | Máx:64 | Código de respuesta asociado con el estado. |
| `transactionResponse > pendingReason` | Alfanumérico | Máx:64 | Razón pendiente de la transacción. |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx:255 | Código de respuesta devuelto por la red financiera. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx:255  | Mensaje de error devuelto por la red financiera. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx:32 | Código de trazabilidad devuelto por la red financiera. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx:12 | Código de autorización devuelto por la red financiera. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx:2048 | Mensaje asociado con el código de respuesta. |
| `transactionResponse > operationDate` | Fecha | | Fecha de creación de la respuesta en el sistema de PayU. |
| `transactionResponse > extraParameters` | Objeto | | Parámetros adicionales o datos asociados con la respuesta. <li>En JSON, el parámetro `extraParameters` sigue esta estructura: `"extraParameters": { "URL_PAYMENT_RECEIPT_HTML": "https:payu.checkout.com"}`<li>En XML, el parámetro `extraParameters` sigue esta estructura: `<extraParameters> <entry>  <string>URL_PAYMENT_RECEIPT_HTML</string>  <string>https:payu.checkout.com</string> </entry></extraParameters>` <br>**Nota:** Considera que puedes aprovechar esta URL para redirigir al usuario a una página de PayU con un resumen de la compra, como se muestra en [Experiencia de Usuario]({{< ref "#user-experience" >}}). |
| `transactionResponse > additionalInfo` | Objeto | | Información adicional asociada con la respuesta. Este objeto sigue la misma estructura que `transactionResponse.extraParameters`. |

</details>

### Llamado a la API {#api-call-5}

Los siguientes son los cuerpos de la petición y la respuesta para este método de pago:

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una solicitud:**
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
         "referenceCode": "PRODUCT_TEST_2024-01-18T19:59:43.229Z",
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
            "contactPhone": "57 3007777777",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Cr 23 No. 53-50",
               "street2": "5555487",
               "city": "Bogotá",
               "state": "Bogotá D.C.",
               "country": "CO",
               "postalCode": "000000",
               "phone": "57 3007777777"
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
         "contactPhone": "57 3007777777",
         "dniNumber": "5415668464654",
         "billingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "125544",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
            "postalCode": "000000",
            "phone": "57 3007777777"
         }
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "NEQUI",
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

**Ejemplo de una respuesta:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 2151135729,
        "transactionId": "fe667b48-e685-40b3-8863-9a0cd8257860",
        "state": "PENDING",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "3ba38ac9-3d68-48ef-bf86-b6c121404162",
        "authorizationCode": null,
        "pendingReason": "AWAITING_PAYMENT_IN_ENTITY",
        "responseCode": "PENDING_PAYMENT_IN_ENTITY",
        "errorCode": null,
        "responseMessage": "SUCCESS",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1705670262058,
        "referenceQuestionnaire": null,
        "extraParameters": null,
        "additionalInfo": null
    }
}

```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Ejemplo de una solicitud:**
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
      <referenceCode>PRODUCT_TEST_2024-01-18T19:59:43.229Z</referenceCode>
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
        <contactPhone>57 3007777777</contactPhone>
        <dniNumber>123456789</dniNumber>
        <shippingAddress>
          <street1>Cr 23 No. 53-50</street1>
          <street2>5555487</street2>
          <city>Bogotá</city>
          <state>Bogotá D.C.</state>
          <country>CO</country>
          <postalCode>000000</postalCode>
          <phone>57 3007777777</phone>
        </shippingAddress>
      </buyer>
      <shippingAddress>
        <street1>Cr 23 No. 53-50</street1>
        <street2>5555487</street2>
        <city>Bogot√°</city>
        <state>Bogot√° D.C.</state>
        <country>CO</country>
        <postalCode>0000000</postalCode>
        <phone>7563126</phone>
      </shippingAddress>
    </order>
    <payer>
      <merchantPayerId>1</merchantPayerId>
      <fullName>First name and second payer name</fullName>
      <emailAddress>payer_test@test.com</emailAddress>
      <contactPhone>57 3007777777</contactPhone>
      <dniNumber>5415668464654</dniNumber>
      <billingAddress>
        <street1>Cr 23 No. 53-50</street1>
        <street2>125544</street2>
        <city>Bogotá</city>
        <state>Bogotá D.C.</state>
        <country>CO</country>
        <postalCode>000000</postalCode>
        <phone>57 3007777777</phone>
      </billingAddress>
    </payer>
    <type>AUTHORIZATION_AND_CAPTURE</type>
    <paymentMethod>NEQUI</paymentMethod>
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

**Ejemplo de una respuesta:**
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>2151135729</orderId>
        <transactionId>fe667b48-e685-40b3-8863-9a0cd8257860</transactionId>
        <state>PENDING</state>
        <paymentNetworkResponseCode>0</paymentNetworkResponseCode>
        <trazabilityCode>3ba38ac9-3d68-48ef-bf86-b6c121404162</trazabilityCode>
        <pendingReason>AWAITING_PAYMENT_IN_ENTITY</pendingReason>
        <responseCode>PENDING_PAYMENT_IN_ENTITY</responseCode>
        <responseMessage>SUCCESS</responseMessage>
        <operationDate>2024-01-19T08:17:42</operationDate>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

#### Formatos de números de teléfono admitidos {#supported-phone-number-formats}

Al utilizar integraciones API, las transacciones pueden fallar cuando el sistema recibe números de teléfono de usuario que:

1. Contienen espacios en blanco.
2. No están separados del código del país.
3. Contienen más o menos de 10 dígitos (sin contar el código del país).

Actualmente, la integración no proporciona un mecanismo para corregir automáticamente el formato del número de teléfono que el usuario ingresa. La tabla a continuación muestra ejemplos de formatos de números de teléfono y su compatibilidad con la integración:

| Ejemplo de Formato de Número de Teléfono | Compatibilidad | Detalles |
| - | - | - |
| `57 3007777777` | Formato compatible | El código de país (57) está separado del número telefónico. |
| `3007777777` | Formato compatible | El número telefónico no tiene espacios y tiene 10 dígitos. |
| `573007777777` | Formato incompatible | El número telefónico y el código de país (57) no están separados. |
| `57 300 7777777` | Formato incompatible | El número telefónico tiene espacios. |

**Recomendaciones**

Para prevenir errores causados por formatos de números telefónicos incompatibles, te recomendamos implementar las siguientes características en la experiencia de usuario:

1. Implementa una interfaz que automáticamente cree espacios separadores en el número de teléfono móvil mientras el usuario lo ingresa, haciendo que el número sea más fácil de leer y reduciendo la probabilidad de errores de entrada manual. Asegúrate de que estos espacios sean visibles a nivel de la interfaz mientras configuras tu sistema para eliminarlos a nivel de backend.

* Ejemplo de la interfaz:

<img src="/assets/Payments/Nequi05ES.png" alt="PrintScreen" width="600">
<p></p>

2. Configura mensajes de error para que se muestren cuando un usuario ingrese un número de teléfono con menos de 10 dígitos o más de 10 dígitos (excluyendo el código de país, que es +57 para Colombia).

* **A)** Ejemplo de una interfaz con espacios generados automáticamente donde el usuario no ha ingresado 10 dígitos:

<img src="/assets/Payments/Nequi06ES.png" alt="PrintScreen" width="600">
<p></p>

* **B)** Ejemplo de una interfaz sin espacios donde el usuario ha ingresado más de 10 dígitos:

<img src="/assets/Payments/Nequi07ES.png" alt="PrintScreen" width="600">
 
#### Pruebas en ambiente sandbox {#sanbox-environment-testing}

Para probar las transacciones de Nequi en el ambiente Sandbox de PayU, utiliza los siguientes datos:

| Número de teléfono | Comportamiento de la autorización | Comportamiento de la consulta <br>(Aprox. 5 minutos después de la autorización) |
|-|-|-|
| `3006666666` | Transaction rejected - Client not found on database | N/A |
| `3007777777` | Transaction pending | Transaction approved |
| `3007777776` | Transaction pending | Transaction declined |
| `3007777775` | Transaction pending | Transaction pending |
| `3007777774` | Transaction pending | Transaction failed |
| `3007777772` | Transaction pending | Transaction expired |

Puedes consultar el estado de la transacción a través de la [API de Consultas]({{< ref "queries-api.html" >}}). 

## Enviar transacciones utilizando Botón Bancolombia {#submit-transactions-using-bancolombia-button}

El Botón de Pagos Bancolombia es una solución de pagos en línea que facilita a los usuarios realizar transacciones de forma rápida y segura a través de su cuenta en Bancolombia. Esta herramienta está disponible para millones de usuarios y permite completar pagos directamente desde el sitio web del comercio, redirigiendo al usuario a una plataforma segura proporcionada por el banco.

### Beneficios del Botón Bancolombia

Además de ser una opción cómoda para los usuarios, el Botón de Pagos Bancolombia representa una alternativa innovadora para los comercios. Al integrar esta opción en tu plataforma de pagos a través de PayU, tu negocio puede obtener los siguientes beneficios: 

* **Incremento en las ventas:** Alcanza más clientes que prefieren métodos de pago digitales respaldados por Bancolombia, lo que contribuye a un mayor número de transacciones completadas y una mejor retención de clientes.

* **Mayor comodidad:** Ofrece una experiencia de pago ágil y versátil, permitiendo a los usuarios efectuar pagos directamente desde su cuenta bancaria sin necesidad de tarjetas físicas o efectivo. 

* **Seguridad reforzada:** Facilita transacciones protegidas por los sistemas de seguridad avanzados de Bancolombia, una de las instituciones financieras más confiables de Colombia. 

Al integrar el Botón de Pagos Bancolombia, no solo mejoras la experiencia de compra para tus clientes, sino que también fortaleces tu negocio con un método de pago alineado a las preferencias del mercado local.

### Proceso de pago con el Botón Bancolombia

El proceso de pago está diseñado para ser simple y seguro. Sigue estos pasos para completar una transacción:

1. Selecciona el método de pago en el checkout.

<img src="/assets/Payments/es_botonbancolombia_1.png" alt="PrintScreen" width="650">
<p></p>

2. Acepta los términos y condiciones y haz clic en **_Pagar_**.

<img src="/assets/Payments/es_botonbancolombia_2.png" alt="PrintScreen" width="650">
<p></p>

3. La integración te redirigirá al sitio transaccional de Bancolombia para completar el pago.

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response-5}

<details>
<summary><b>Solicitud</b></summary>
<label for="table4" class="showMandatory"><input type="checkbox" id="table4" name="table4" value="true" onchange="showMandatory(this)"> Mostrar solo los campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la solicitud. Este idioma se usa para mostrar los mensajes de error generados. [Ver idiomas compatibles]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Máx:32 | Establece `SUBMIT_TRANSACTION`. | Sí |
| `test` (JSON)<hr>`isTest` (XML) | Booleano | | Establece `true` si la solicitud está en modo de prueba. De lo contrario, establece `false`. | Sí |
| `merchant` | Objeto | | Este objeto contiene los datos de autenticación. | Sí |
| `merchant > apiLogin` | Alfanumérico | Mín:12 Máx:32 | Usuario o login proporcionado por PayU. [¿Cómo obtengo mi API Login?]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `merchant > apiKey` | Alfanumérico | Mín:6 Máx:32 | Contraseña proporcionada por PayU. [¿Cómo obtengo mi API Key?]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `transaction` | Objeto | | Este objeto contiene los datos de la transacción. | Sí |
| `transaction > order` | Objeto | | Este objeto contiene los datos de la orden. | Sí |
| `transaction > order > accountId` | Numérico | | Identificador de tu cuenta. | Sí |
| `transaction > order > referenceCode` | Alfanumérico | Mín:1 Máx:255 | Representa el identificador de la orden en tu sistema. | Sí |
| `transaction > order > description` | Alfanumérico | Mín:1 Máx:255 | Descripción de la orden. | Sí |
| `transaction > order > language` | Alfanumérico | 2 | Idioma utilizado en los correos enviados al comprador y al vendedor. | Sí |
| `transaction > order > notifyUrl` | Alfanumérico | Máx:2048 | URL de confirmación de la orden. | No |
| `transaction > order > partnerId` | Alfanumérico | Máx:255 | ID del socio en PayU. | No |
| `transaction > order > signature` | Alfanumérico | Máx:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| `transaction > order > shippingAddress` | Objeto | | Dirección de envío. | No |
| `transaction > order > shippingAddress` > street1 | Alfanumérico | Máx:100 | Dirección Línea 1. | No |
| `transaction > order > shippingAddress` > street2 | Alfanumérico | Máx:100 | Dirección Línea 2. | No |
| `transaction > order > shippingAddress` > city | Alfanumérico | Máx:50 | Ciudad de la dirección. | No |
| `transaction > order > shippingAddress` > state | Alfanumérico | Máx:40 | Estado de la dirección. | No |
| `transaction > order > shippingAddress` > country | Alfanumérico | 2 | País de la dirección. | No |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Máx:8 | Código postal de la dirección. | No |
| `transaction > order > shippingAddress` > phone | Alfanumérico | Máx:11 | Número de teléfono asociado a la dirección. | No |
| `transaction > order > buyer` | Objeto | | Información del comprador. | Sí |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Máx:100 | ID del comprador en tu sistema. | No |
| `transaction > order > buyer > fullName` | Alfanumérico | Máx:150 | Nombre completo del comprador. | Sí |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Máx:255 | Correo electrónico del comprador. | Sí |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Máx:20 | Número de teléfono del comprador. | Sí |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Máx:20 | Número de identificación del comprador. | Sí |
| `transaction > order > buyer > shippingAddress` | Alfanumérico | | Dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Máx:150 | Dirección de envío Línea 1 del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Máx:40 | Estado de la dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País de la dirección de envío del comprador en formato ISO 3166 alfa-2. | Sí |
| `transaction > order > buyer > shippingAddress > postalCode` | Numérico | Máx:20 | Código postal de la dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > phone` | Numérico | Máx:20 | Número de teléfono de la dirección de envío del comprador. | Sí |
| `transaction > order > additionalValues` | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Monto de la transacción. | Sí |
| `transaction > order > additionalValues > TX_VALUE > value` | Numérico | 12, 2 | Especifica el monto de la transacción. Este monto no puede incluir decimales. | Sí |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > payer` | Objeto | | Información del pagador. | Sí |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Correo electrónico del pagador. | Sí |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador del pagador en tu sistema. | No |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nombre del pagador, que debe coincidir con el nombre enviado en el parámetro `transaction.creditCard.name`. | Sí |
| `transaction > payer > billingAddress` | Objeto | | Dirección de facturación. | Sí |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Dirección de facturación Línea 1. | Sí |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Dirección de facturación Línea 2. | No |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Estado de la dirección de facturación. | No |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 alfa-2. | Sí |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal de la dirección de facturación. | No |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Número de teléfono de la dirección de facturación. | No |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Fecha de nacimiento del pagador. | No |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Número de teléfono del pagador. | Sí |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificación del pagador. | Sí |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver tipos de documento]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| `transaction > type` | Alfanumérico | 32 | Establece este valor según la transacción. Para Colombia, establece `AUTHORIZATION_AND_CAPTURE`. | Sí |
| `transaction > paymentMethod` | Alfanumérico | 32 | Establece `BANCOLOMBIA_BUTTON`. [Ver los métodos de pago disponibles para Colombia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sí |
| `transaction > paymentCountry` | Alfanumérico | 2 | Establece `CO` para Colombia. | Sí |
| `transaction > deviceSessionId` | Alfanumérico | Máx:255 | Identificador de la sesión del dispositivo donde el cliente realiza la transacción. Para más información, consulta [este tema]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| `transaction > cookie` | Alfanumérico | Máx:255 | Cookie almacenada por el dispositivo donde el cliente realiza la transacción. | Sí |
| `transaction > userAgent` | Alfanumérico | Máx:1024 | User agent del navegador donde el cliente realiza la transacción. | Sí |
| `transaction > extraParameters` | Objeto | | Parámetros adicionales o datos asociados con la solicitud. El tamaño máximo de cada nombre en _extraParameters_ es de 64 caracteres.<br>En JSON, el parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>En XML, el parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` | No |

</details>

<details>
<summary><b>Respuesta</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| `code` | Alfanumérico | | El código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | El mensaje de error devuelto cuando el código de respuesta es `ERROR`. |
| `transactionResponse` | Objeto | | El objeto principal que contiene los datos de la respuesta. |
| `transactionResponse > orderId` | Numérico | | El identificador de pedido generado o existente en PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | El identificador de la transacción en PayU. |
| `transactionResponse > state` | Alfanumérico | Máx:32 | El estado de la transacción. Para pagos realizados en oficinas físicas, el estado de una transacción exitosa es `PENDING`. |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx:255 | El código de respuesta devuelto por la red financiera. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx:255 | El mensaje de error devuelto por la red financiera. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx:32 | El código de trazabilidad devuelto por la red financiera. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx:12 | El código de autorización proporcionado por la red financiera. |
| `transactionResponse > pendingReason` | Alfanumérico | Máx:21 | El código de motivo asociado al estado. Para transacciones con estado `PENDING`, esto indica que la transacción está pendiente de pago. |
| `transactionResponse > responseCode` | Alfanumérico | Máx:64 | El código de respuesta asociado al estado de la transacción. Para transacciones exitosas, este es `PENDING_TRANSACTION_CONFIRMATION`. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx:2048 | Un mensaje asociado al código de respuesta. |
| `transactionResponse > operationDate` | Fecha | | La fecha de creación de la respuesta dentro del sistema de PayU. |
| `transactionResponse > extraParameters` | Objeto | | Parámetros o datos adicionales relacionados con la respuesta. <br><b>Nota:</b> El campo `BANK_URL` dentro de `extraParameters` proporciona la URL para redirigir a su pagador a Bancolombia. |

</details>

### Llamado a la API {#api-call-6}

Los siguientes son los cuerpos de la petición y la respuesta para este método de pago.

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una solicitud:**
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
         "referenceCode": "{{reference_code}}",
         "description": "Bancolombia Button Test",
         "language": "es",
         "signature": "{{signature}}",
         "notifyUrl": "http://confirmation-page.com",
         "additionalValues": {
            "TX_VALUE": {
               "value": 10000,
               "currency": "COP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer  name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "5415668464654",
            "shippingAddress": {
               "street1": "calle 100",
               "street2": "5555487",
               "city": "Medellin",
               "state": "Antioquia",
               "country": "CO",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "calle 100",
            "street2": "5555487",
            "city": "Medellin",
            "state": "Antioquia",
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
            "street1": "calle 93",
            "street2": "125544",
            "city": "Bogota",
            "state": "Bogota DC",
            "country": "CO",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "BANCOLOMBIA_BUTTON",
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

**Ejemplo de una respuesta:**
```JSON
{
    "code": "SUCCESS",
    "transactionResponse": {
        "orderId": 2153602509,
        "transactionId": "32c884cd-7d33-4922-a834-b6e1fa1863ba",
        "state": "PENDING",
        "trazabilityCode": "_016oemmSIw",
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "operationDate": 1736339747784,
        "extraParameters": {
            "BANK_URL": "https://sandbox-boton-ou-dev.apps.ambientesbc.com/web/transfer-gateway/checkout/_016oemmSIw"
        },
        "additionalInfo": {
            "paymentNetwork": "BANCOLOMBIA_BUTTON",
            "rejectionType": "NONE",
            "transactionType": "AUTHORIZATION_AND_CAPTURE"
        }
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Ejemplo de una solicitud:**
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
         <referenceCode>{{reference_code}}</referenceCode>
         <description>Bancolombia Button Test</description>
         <language>es</language>
         <signature>{{signature}}</signature>
         <notifyUrl>http://confirmation-page.com</notifyUrl>
         <additionalValues>
            <TX_VALUE>
               <value>10000</value>
               <currency>COP</currency>
            </TX_VALUE>
         </additionalValues>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>5415668464654</dniNumber>
            <shippingAddress>
               <street1>calle 100</street1>
               <street2>5555487</street2>
               <city>Medellin</city>
               <state>Antioquia</state>
               <country>CO</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>calle 100</street1>
            <street2>5555487</street2>
            <city>Medellin</city>
            <state>Antioquia</state>
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
            <street1>calle 93</street1>
            <street2>125544</street2>
            <city>Bogota</city>
            <state>Bogota DC</state>
            <country>CO</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>BANCOLOMBIA_BUTTON</paymentMethod>
      <paymentCountry>CO</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <test>false</test>
</request>
```
<br>

**Ejemplo de una respuesta:**
```XML
<response>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>2153602509</orderId>
        <transactionId>32c884cd-7d33-4922-a834-b6e1fa1863ba</transactionId>
        <state>PENDING</state>
        <trazabilityCode>_016oemmSIw</trazabilityCode>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <operationDate>1736339747784</operationDate>
        <extraParameters>
            <BANK_URL>https://sandbox-boton-ou-dev.apps.ambientesbc.com/web/transfer-gateway/checkout/_016oemmSIw</BANK_URL>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>BANCOLOMBIA_BUTTON</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</response>
```

{{< /tab >}}

{{< /tabs >}}

#### Consideraciones {#considerations-3}

- Para probar tu integración en el ambiente de sandbox, puedes usar cualquier número para las credenciales de Bancolombia.  
- Si la solicitud de pago es exitosa, el estado de la transacción será `PENDING` y el `responseCode` será `PENDING_TRANSACTION_CONFIRMATION`. Esto ocurre porque el pagador es redirigido a la plataforma del banco para completar el pago. Debes redirigir al pagador a la URL proporcionada en el parámetro adicional `BANK_URL`.  
- El pagador tiene veinte (20) minutos para completar la transacción en el sitio de Bancolombia. Si no se completa dentro de este tiempo, la transacción será rechazada, y el código de respuesta será `EXPIRED`.  

## Enviar transacciones utilizando efectivo o referencia bancaria {#submit-transactions-using-cash-or-bank-reference}

Este método te permite procesar pagos de los clientes en efectivo o a través de una referencia bancaria. Para integrar este método de pago, redirige al cliente a la URL proporcionada en la respuesta del método. Tu cliente verá entonces un recibo de pago como se muestra a continuación.

#### Pagos en efectivo {#payments-in-cash}

<img src="/assets/Payments/CashReceiptCO.png" alt="PrintScreen" width="75%">

#### Pagos con referencia bancaria {#payments-with-bank-reference}

<img src="/assets/Payments/BankReferenceReceiptCO.png" alt="PrintScreen" width="75%">

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response-6}

<details>
<summary><b>Solicitud</b></summary>
<label for="table5" class="showMandatory"><input type="checkbox" id="table5" name="table5" value="true" onchange="showMandatory(this)"> Mostrar solo los campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Máx:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| `test` (JSON)<hr>`isTest` (XML) | Booleano | | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| `merchant` | Objeto | | Este objeto tiene los datos de autenticación. | Sí |
| `merchant > apiLogin` | Alfanumérico | Min:12 Máx:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `merchant > apiKey` | Alfanumérico | Min:6 Máx:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `transaction` | Objeto | | Este objeto tiene los datos de la transacción. | Sí |
| `transaction > order` | Objeto | | Este objeto tiene los datos de la orden. | Sí |
| `transaction > order > accountId` | Numérico |  | Identificador de tu cuenta. | Sí |
| `transaction > order > referenceCode` | Alfanumérico | Min:1 Máx:255 | Representa el identificador de la orden en tu sistema. | Sí |
| `transaction > order > description` | Alfanumérico | Min:1 Máx:255 | Descripción de la orden. | Sí |
| `transaction > order > language` | Alfanumérico | 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí |
| `transaction > order > notifyUrl` | Alfanumérico | Máx:2048 | URL de confirmación de la orden. | No |
| `transaction > order > partnerId` | Alfanumérico | Máx:255 | ID de aliado dentro de PayUID de aliado dentro de PayU. | No |
| `transaction > order > signature` | Alfanumérico | Máx:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| `transaction > order > shippingAddress` | Objeto | | Dirección de envío. | No |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Máx:100 | Línea de dirección 1. | No |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Máx:100 | Línea de dirección 2. | No |
| `transaction > order > shippingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección. | No |
| `transaction > order > shippingAddress > state` | Alfanumérico | Máx:40 | Departamento de la dirección. | No |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | País de la dirección. | No |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Máx:8 | Código postal de la dirección. | No |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Máx:11 | Número de teléfono asociado con la dirección. | No |
| `transaction > order > buyer` | Objeto | | Información del comprador. | Sí |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Máx:100 | Identificador del comprador en tu sistema. | No |
| `transaction > order > buyer > fullName` | Alfanumérico | Máx:150 | Nombre del comprador. | Sí |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Máx:255 | Correo electrónico del comprador. | Sí |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Máx:20 | Número de teléfono del comprador. | Sí |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Máx:20 | Número de identificación del comprador. | Sí |
| `transaction > order > buyer > shippingAddress` | Objeto |  | Dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Máx:150 | Línea de dirección 1 del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección del comprador. | Sí | 
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Máx:40 | Departamento de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| `transaction > order > buyer > shippingAddress > postalCode` | Numérico | Máx:20 | Código postal de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > phone` | Numérico | Máx:20 | Número de teléfono de la dirección del comprador. | Sí |
| `transaction > order > additionalValues` | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Monto de la transacción. | Sí |
| `transaction > order > additionalValues > TX_VALUE > value` | Numérico | 12, 2 | Especifica el monto de la transacción, este valor no puede tener decimales. | Sí |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| `transaction > order > additionalValues > TX_TAX` | Alfanumérico | 64 | Monto del IVA (Impuesto al Valor Agregado). | Sí |
| `transaction > order > additionalValues > TX_TAX > value` | Numérico | 12, 2 | Especifica el monto del IVA.<br>Si no se envía este parámetro, PayU aplica el impuesto actual (19%).<br>Si la cantidad está exenta de IVA, envía 0.<br>Este valor puede tener dos dígitos decimales.  | No |
| `transaction > order > additionalValues > TX_TAX > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alfanumérico | 64 | Valor base para calcular el IVA.<br>Si la cantidad está exenta de IVA, envía 0.<br>Este valor puede tener dos dígitos decimales  | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Numérico | 12, 2 | Especifica el valor base de la transacción. | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > payer` | Objeto |  | Información del pagador. | Sí |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Correo electrónico del pagador. | Sí |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador del pagador en tu sistema. | No |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nombre del pagador. | Sí |
| `transaction > payer > billingAddress` | Objeto | | Dirección de facturación. | Sí |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Línea 1 de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Línea 2 de la dirección de facturación. | No |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Ciudad de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Departamento de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | Sí |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal de la dirección de facturación. | No |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Número de teléfono de la dirección de facturación. | No |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Fecha de nacimiento del pagador. | No |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Número de teléfono del pagador. | Sí |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificación del pagador. | Sí |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| `transaction > type` | Alfanumérico | 32 | Como los pagos en efectivo se realizan en oficinas físicas, la única transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sí |
| `transaction > paymentMethod` | Alfanumérico | 32 | Seleccione un método de pago en efectivo o de referencia bancaria válido. [Ver los métodos de pago disponibles para Colombia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sí |
| `transaction > paymentCountry` | Alfanumérico | 2 | Asigna `CO` para Colombia. | Sí |
| `transaction > expirationDate` | Alfanumérico | 23 | Fecha y hora máxima en la que el cliente puede realizar el pago. Formato `YYYY-MM-DDTHH:MM:SS`, por ejemplo `2021-06-12T16:07:11.586`. | No |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |

</details>

<details>
<summary><b>Respuesta</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| `code` | Alfanumérico | | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| `transactionResponse` | Objeto | | Datos de la respuesta. |
| `transactionResponse > orderId` | Numérico | | Identificador generado o existente de la orden en PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | Identificador de la transacción en PayU. |
| `transactionResponse > state` | Alfanumérico | Máx:32 | Estado de la transacción. Como el pago se realiza de forma externa, el estado de una transacción exitosa es `PENDING` |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx:255 | Código de respuesta retornado por la red bancaria. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx:255 | Mensaje de error retornado por la red bancaria. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx:32 | Código de trazabilidad retornado por la red bancaria. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx:12 | Código de autorización retornado por la red bancaria. |
| `transactionResponse > pendingReason` | Alfanumérico | Máx:21 | Código de la razón asociada con el estado, como se mencionó en  `transactionResponse > state`, la transacción está en espera del pago. |
| transactionResponse > responseCode | Alfanumérico | Máx:64 | Código de respuesta asociado con el estado. En este caso, para una transacción exitosa es `PENDING_TRANSACTION_CONFIRMATION`. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx:2048 | Mensaje asociado con el código de respuesta. |
| `transactionResponse > operationDate` | Fecha | | Fecha de creación de la respuesta en el sistema de PayU. |
| `transactionResponse > extraParameters` | Objeto | | Parámetros adicionales o datos asociados con la respuesta.<br>En JSON, el parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"REFERENCE": "74794"`<br>`}`<br><br>En XML, el parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>REFERENCE</string>`<br>&emsp;&emsp;`<int>74794</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| `transactionResponse > additionalInfo` | Objeto | | Información adicional de la respuesta. Este objeto tiene la misma estructura de `transactionResponse.extraParameters`. |

</details>

#### Consideraciones {#considerations-4}

* El parámetro `transaction.expirationDate` no es obligatorio. Si no envías este parámetro, su valor por defecto es siete (7) días luego de la fecha actual.<br>Si envías una fecha posterior a dicho número de días, PayU ignorará este valor y asignará el valor por defecto.
* Para <!--`BALOTO` y -->`EFECTY`, la confirmación del pago tarda 15 minutos. Para `BANK_REFERENCED` y `OTHERS_CASH` (Su Red), la confirmación es en línea.
* Los valores mínimos de máximos para pagos en <!--`BALOTO`, -->`EFECTY` y `OTHERS_CASH` (Su Red) son:
   <!-- - `BALOTO` > Min: $3.000 COP - Max: $1.000.000 COP-->
   - `EFECTY` > Min: $20.000 COP - Máx: $6.000.000 COP
   - `OTHERS_CASH` (Su Red) > Min: $1.000 COP - Máx: $4.000.000 COP
* El parámetro `transactionResponse.extraParameters` tiene los siguientes parámetros relacionados con la transacción:
   - **EXPIRATION_DATE**: fecha máxima en la que el pagador puede realizar el pago.   
   - **REFERENCE**: referencia de pago interna generada por PayU.
   - **URL_PAYMENT_RECEIPT_HTML**: recibo de pago en formato HTML. Aquí es donde debe redirigir el pago cuando el pagador selecciona un método de pago en efectivo. 
   - **URL_PAYMENT_RECEIPT_PDF**: recibo de pago en formato PDF.
   - **BANCO_BOGOTA_SERVICE_CODE**: código de pago para Banco de Bogotá. Disponible cuando utilices `BANK_REFERENCED`.
   - **BANK_REFERENCED_NAME**: nombre de la referencia para Bancolombia. Disponible cuando utilices `BANK_REFERENCED`.
   - **BANCOLOMBIA_SERVICE_CODE**: código de pago para Bancolombia. Disponible cuando utilices `BANK_REFERENCED`.

### Llamado a la API {#api-call-7}

Los siguientes son los cuerpos de la petición y la respuesta para este método de pago.

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una solicitud:**
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

**Ejemplo de una respuesta:**
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

**Ejemplo de una solicitud:**
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

**Ejemplo de una respuesta:**
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

## Procesar pagos como aerolínea o agencia de viajes {#process-payments-as-an-airline-or-travel-agency}

Esta sección está diseñada para facilitar la integración de los servicios de PayU, específicamente adaptados a las necesidades de aerolíneas y agencias de viajes en Colombia.

### Consideraciones {#considerations-5}

* Disponible exclusivamente en Colombia para transacciones en moneda COP.
* Permite el procesamiento de pagos mediante el modelo TSP/Gateway.
* Requiere el registro de códigos IATA con los adquirentes.
* Soporta pagos con tarjeta de crédito o débito, incluyendo AMEX, DINERS, MASTERCARD y VISA.
* Admite la dispersión de fondos, permitiendo que las agencias de viajes y aerolíneas reciban sus pagos dentro de la misma transacción.
* Requiere un procesamiento en un solo paso: el sistema transfiere los fondos de la cuenta del cliente a tu banco adquirente tan pronto como se autoriza el pago.

### Consideraciones para la integración:

Esta integración permite a las aerolíneas y agencias de viajes en Colombia optimizar los procesos de pago, proporcionando información esencial con cada transacción para apoyar la identificación y distribución precisa de los fondos. Además, el envío de detalles específicos de la transacción puede calificarlos para la exención del impuesto 4 x 1000 (confirma con tu banco adquirente).

**Pasos para la integración:** 

1. Obtén la lista de aerolíneas disponibles.
2. Envía la transacción a través de la API de Pagos de PayU.
3. Incluye la información del Passenger Name Record (PNR) (opcional).

| **Funcionalidad** | **Aerolíneas** | **Agencias de viajes** |
|-|-|-|
| **Inclusión de tarifas** | Las aerolíneas pueden enviar su ID de aerolínea, junto con tarifas aeroportuarias y otros impuestos asociados. | Las agencias de viajes pueden enviar sus tarifas de transacción junto con tarifas de aerolíneas, tarifas aeroportuarias, tarifas administrativas y otros cargos. |
| **Identificación** | Los adquirentes pueden identificar específicamente la aerolínea mediante el ID de aerolínea para una distribución dirigida. | Permite al adquirente identificar tanto a la agencia de viajes como a la aerolínea para una distribución precisa de fondos. |
| **Elegibilidad para la exención del impuesto 4 x 1000** | Las aerolíneas colombianas pueden calificar si proporcionan su ID de aerolínea e información de tarifas relevante. | Las agencias de viajes colombianas pueden calificar si proporcionan detalles completos de la transacción. |

{{% alert title="Nota" color="info"%}}

Verifica con tu banco adquirente si tu negocio cumple con los requisitos para la exención del impuesto 4 x 1000. La elegibilidad depende de la información proporcionada en cada transacción y de la normativa vigente.

{{% /alert %}}

### Obtener la lista de aerolíneas disponibles

Para integrarse con PayU, tanto las agencias de viajes como las aerolíneas necesitan obtener los códigos de aerolíneas elegibles para la recolección de pagos y enviarlos a través de la API de Pagos. Esto se puede hacer consultando el sistema de PayU para obtener la lista de aerolíneas disponibles y sus respectivos códigos. El endpoint para obtener los códigos de aerolíneas es el mismo para ambos tipos de comerciantes, aunque el uso específico puede diferir:

- **Aerolíneas**:
  - Las aerolíneas obtienen y envían sus propios códigos para habilitar una identificación precisa y posibles beneficios fiscales.
  - Al proporcionar el código de aerolínea, aseguran transacciones optimizadas para sus tarifas y cargos asociados.

- **Agencias de viajes**:
  - Las agencias obtienen el código de aerolínea asociado con cada pago para garantizar la correcta asignación de tarifas e impuestos.
  - Esta integración ayuda a identificar la aerolínea involucrada en la transacción para una distribución adecuada de fondos.

Para obtener la lista, utiliza los siguientes endpoints según tu entorno:

- **Sandbox**: `https://sandbox.api.payulatam.com/payments-api/rest/v4.3/payments/airline`
- **Producción**: `https://api.payulatam.com/payments-api/rest/v4.3/payments/airline`

| **Parámetro de consulta** | **Descripción** |
|-|-|
| `accountID` | Código de identificación asignado por PayU Latam a la cuenta. |

| **Parámetro de cabecera** | **Descripción** |
|-|-|
| `Authorization` | Valor del encabezado de autenticación para realizar una solicitud válida. |

Ejemplo de código en JavaScript para generar el encabezado de autenticación:

```javascript
var contentToSign = "pRRXKOl8ikMmt9u" + ":" + "4Vj8eK4rloUd272L48hsrarnUA";
var base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(contentToSign));
var authenticationHeader = "Basic " + base64.toString();
```

{{% alert title="Nota" color="info"%}}

Aunque es poco probable que cambien los códigos de aerolíneas, existe una posibilidad. Recomendamos usar la consulta para almacenar tu código de aerolínea y utilizarlo en pagos con nuestra API de Pagos.

{{% /alert %}}

| Parámetro de consulta | Descripción |
|-|-|
| `airlines` | Array de aerolíneas. | 
| `airlines > code` | Código de la aerolínea. |
| `airlines > description` | Descripción de la aerolínea. |

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una respuesta:**
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

**Ejemplo de una respuesta:**
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

### Enviar transacciones como una aerolínea

Para completar una solicitud de transacción exitosa, debes incluir los parámetros específicos para aerolíneas, además de los parámetros estándar para [pagos con tarjeta de crédito]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}). Opcionalmente, también puedes incluir [datos del PNR]({{< ref "Payments-API-Colombia.md#include-passenger-name-record-information-optional" >}}). Usa el código de aerolínea obtenido del endpoint anterior e incluye las tarifas aeroportuarias y los impuestos que aplican.

<details>
<summary><b>Solicitud</b></summary>
<br>
<div class="variables"></div>

| **Campo** | **Tipo** | **Tamaño** | **Descripción** | **Ejemplo** |
|-|-|-|-|-|
| `transaction > order > additionalValues > TX_VALUE > value` | Numérico | 12,2 | Monto total de la transacción. Puede contener hasta dos decimales. | 119000 |
| `transaction > order > additionalValues > TX_TAX > value` | Numérico | 12,2 | Valor del IVA. Si no se especifica, el sistema aplica una tasa del 19% por defecto en Colombia. Usa 0 para artículos exentos de IVA. | 19000 |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Numérico | 12,2 | Valor base para el cálculo del IVA. Configura en 0 si el producto o servicio está exento de IVA. | 100000 |
| `transaction > order > additionalValues > TX_ADDITIONAL_VALUE > value` | Numérico | 12,2 | Tarifas aeroportuarias y otros impuestos aplicables. | 25000 |

</details>

#### Llamado a la API {#api-call-8}

A continuación, se presentan ejemplos de una solicitud para este método.

{{< tabs tabTotal="2" tabID="10" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una solicitud:**
```JSON
{
  ...
  "transaction": {
    "order": {
      ...      
      "additionalValues": {
        "TX_VALUE": {
          "value": 119000,
          "currency": "COP"
        },
        "TX_TAX": {
          "value": 19000,
          "currency": "COP"
        },
        "TX_TAX_RETURN_BASE": {
          "value": 100000,
          "currency": "COP"
        },
        "TX_ADDITIONAL_VALUE": {
          "value": 25000,
          "currency": "COP"
        }
      }
    },
    "creditCard": {
      ...
    },
    "extraParameters": {
      ...
    },
    "pnr": {
      ...
    }
  }
}
```
<br>

{{< /tab >}}

{{< tab tabNum="2" >}} 
<br>

**Ejemplo de una solicitud:**
```XML
<request>
  ...
  <transaction>
    <order>
      ...      
      <additionalValues>
        <entry>
          <string>TX_VALUE</string>
          <additionalValue>
            <value>119000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX</string>
          <additionalValue>
            <value>19000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX_RETURN_BASE</string>
          <additionalValue>
            <value>100000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_ADDITIONAL_VALUE</string>
          <additionalValue>
            <value>25000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
      </additionalValues>
    </order>
    <payer>
      ...
    </payer>
    <creditCard>
      ...
    </creditCard>
    <extraParameters>
      ...
    </extraParameters>
    ...
    <pnr>
      ...
    </pnr>
  </transaction>
</request>
```

{{< /tab >}}

{{< /tabs >}}

### Enviar Transacciones como una agencia de viajes

Para completar una solicitud de transacción exitosa, debes incluir los parámetros específicos para agencias de viajes, además de los parámetros estándar para [pagos con tarjeta de crédito]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}). Opcionalmente, también puedes incluir [datos del PNR]({{< ref "Payments-API-Colombia.md#include-passenger-name-record-information-optional" >}}). Usa el código de aerolínea obtenido del endpoint anterior e incluye las tarifas aeroportuarias y los impuestos que aplican.

<details>
<summary><b>Solicitud</b></summary>
<br>
<div class="variables"></div>

| **Campo** | **Tipo** | **Tamaño** | **Descripción** | **Ejemplo** |
|-|-|-|-|-|
| `transaction > order > airlineCode` | Alfanumérico | 4 | Código de la aerolínea. | 29 |
| `transaction > order > additionalValues > TX_VALUE > value` | Numérico | 12,2 | Monto total de la transacción. Puede contener dos decimales (por ejemplo, 10000.00 o 10000). | 119000 |
| `transaction > order > additionalValues > TX_TAX > value` | Numérico | 12,2 | Valor del IVA de la transacción. Si no se especifica, el sistema aplica automáticamente una tasa del 19% en Colombia. Si está exento de IVA, configura en 0. | 19000 |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Numérico | 12,2 | Valor base para calcular el IVA. Si está exento de IVA, asigna 0 a esta variable. | 100000 |
| `transaction > order > additionalValues > TX_ADDITIONAL_VALUE > value` | Numérico | 12,2 | Tarifas aeroportuarias y otros impuestos. | 25000 |
| `transaction > order > additionalValues > TX_ADMINISTRATIVE_FEE > value` | Numérico | 12,2 | Monto de la tarifa administrativa de la agencia de viajes. | 5950 |
| `transaction > order > additionalValues > TX_TAX_ADMINISTRATIVE_FEE > value` | Numérico | 12,2 | Impuesto de la tarifa administrativa de la agencia de viajes. | 950 |
| `transaction > order > additionalValues > TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE > value` | Numérico | 12,2 | Valor base para calcular el impuesto de la tarifa administrativa de la agencia de viajes. | 5000 |

</details>

#### Llamado a la API {#api-call-9}

A continuación, se presentan ejemplos de una solicitud para este método.

{{< tabs tabTotal="2" tabID="11" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una solicitud:**
```JSON
{
  ...
  "transaction": {
    "order": {
      ...
      "airlineCode": "29",
      "additionalValues": {
        "TX_VALUE": {
          "value": 119000,
          "currency": "COP"
        },
        "TX_TAX": {
          "value": 19000,
          "currency": "COP"
        },
        "TX_TAX_RETURN_BASE": {
          "value": 100000,
          "currency": "COP"
        },
        "TX_ADDITIONAL_VALUE": {
          "value": 25000,
          "currency": "COP"
        },
        "TX_ADMINISTRATIVE_FEE": {
          "value": 5950,
          "currency": "COP"
        },
        "TX_TAX_ADMINISTRATIVE_FEE": {
          "value": 950,
          "currency": "COP"
        },
        "TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE": {
          "value": 5000,
          "currency": "COP"
        }
      }
    },
    "creditCard": {
      ...
    },
    "extraParameters": {
      ...
    },
    "pnr": {
      ...
    }
  }
}
```
<br>

{{< /tab >}}

{{< tab tabNum="2" >}} 
<br>

**Ejemplo de una solicitud:**
```XML
<request>
  ...
  <transaction>
    <order>
      ...
      <airlineCode>29</airlineCode>
      <additionalValues>
        <entry>
          <string>TX_VALUE</string>
          <additionalValue>
            <value>119000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX</string>
          <additionalValue>
            <value>19000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX_RETURN_BASE</string>
          <additionalValue>
            <value>100000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_ADDITIONAL_VALUE</string>
          <additionalValue>
            <value>25000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_ADMINISTRATIVE_FEE</string>
          <additionalValue>
            <value>5950</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX_ADMINISTRATIVE_FEE</string>
          <additionalValue>
            <value>950</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE</string>
          <additionalValue>
            <value>5000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
      </additionalValues>
    </order>
    <payer>
      ...
    </payer>
    <creditCard>
      ...
    </creditCard>
    <extraParameters>
      ...
    </extraParameters>
    ...
    <pnr>
      ...
    </pnr>
  </transaction>
</request>
```

{{< /tab >}}

{{< /tabs >}}

## Incluir información de registro de nombre del pasajero (opcional) {#include-passenger-name-record-information-optional}

Además de los detalles de transacción previamente suministrados, la API permite la inclusión opcional de datos de Registro de Nombre de Pasajero (PNR). Aunque es particularmente valiosa para aerolíneas y agencias de viajes, esta función extiende su utilidad a cualquier comercio que utilice los servicios de PayU en toda América Latina, incluso cuando no procese directamente pagos de vuelos. El beneficio principal de los datos PNR es mejorar significativamente el análisis de riesgo de las transacciones a través de las herramientas antifraude de PayU, proporcionando una visión más completa de la transacción más allá de los simples detalles de pago.

Los siguientes parámetros se refieren a los datos PNR y son opcionales. Están disponibles en todos los países de América Latina donde opera PayU. Estos campos no son suficientes por sí solos para completar una solicitud de transacción, pero son complementarios para casos de uso específicos donde conocer los detalles sobre el pasajero y su itinerario de viaje puede ayudar en la detección de fraude.

<details>
<summary><b>Solicitud</b></summary>
<br>
<div class="variables"></div>

| **Campo** | **Tipo** | **Tamaño** | **Descripción** | **Ejemplo** |
|-|-|-|-|-|
| `transaction > pnr > id` | alfanumérico | 32 | ID del registro de nombre del pasajero (PNR). | `PNR123456` |
| `transaction > pnr > reservationAgent > id` | alfanumérico | 32 | ID del agente de reservas. | `AGENT123` |
| `transaction > pnr > reservationAgent > firstName` | alfanumérico | 255 | Nombre(s) del agente de reservas. | `John` |
| `transaction > pnr > reservationAgent > lastName` | alfanumérico | 255 | Apellido(s) del agente de reservas. | `Doe` |
| `transaction > pnr > reservationAgent > email` | alfanumérico | 255 | Correo electrónico del agente de reservas. | `agent@example.com` |
| `transaction > pnr > reservationAgent > officePhoneNumber` | alfanumérico | 50 | Teléfono de oficina del agente de reservas.| `+573001234567` |
| `transaction > pnr > reservationOffice > id` | alfanumérico | 9 | ID de la oficina de reservas.| `OFFICE123`|
| `transaction > pnr > reservationOffice > country` | alfanumérico | 2 | País de la oficina de reservas (Código ISO). | `CO` |
| `transaction > pnr > saleOffice > id` | alfanumérico | 9 | ID de la oficina de ventas. | `SALEOFF123`                |
| `transaction > pnr > saleOffice > country` | alfanumérico | 2 | País de la oficina de ventas (Código ISO). | `US` |
| `transaction > pnr > passengers[] > id` | alfanumérico | 32 | ID del pasajero. | `PASS12345` |
| `transaction > pnr > passengers[] > country` | alfanumérico | 2 | País del pasajero (Código ISO). | `AR`                        |
| `transaction > pnr > passengers[] > level` | alfanumérico | 32 | Nivel del pasajero. | `GOLD`                      |
| `transaction > pnr > passengers[] > firstName` | alfanumérico | 255 | Nombre(s) del pasajero. | `Maria`                     |
| `transaction > pnr > passengers[] > lastName` | alfanumérico | 255 | Apellido(s) del pasajero. | `Gonzalez` |
| `transaction > pnr > passengers[] > documentType` | numérico | 2 | Tipo de documento. Los valores posibles son:<br>`0` = No especificado<br>`1` = Cédula de ciudadanía<br>`2` = Cédula de extranjería<br>`3` = Número de identificación tributaria<br>`4` = Tarjeta de identidad<br>`5` = Pasaporte<br>`6` = Tarjeta de seguridad social<br>`7` = Sociedad extranjera sin NIT<br>`8` = Fideicomiso<br>`9` = Registro civil<br>`10` = Carnet diplomático | `5` |
| `transaction > pnr > passengers[] > documentNumber` | alfanumérico | 50 | Número de documento del pasajero. | `P12345678` |
| `transaction > pnr > passengers[] > email` | alfanumérico | 255 | Dirección de correo electrónico del pasajero. | `passenger@example.com` |
| `transaction > pnr > passengers[] > officePhoneNumber` | alfanumérico | 50 | Teléfono de oficina del pasajero. | `+573008765432`             |
| `transaction > pnr > passengers[] > homePhoneNumber` | alfanumérico | 50 | Teléfono de casa del pasajero. | `+573002345678`             |
| `transaction > pnr > passengers[] > mobilePhoneNumber` | alfanumérico | 50 | Teléfono móvil del pasajero. | `+573001234567` |
| `transaction > pnr > passengers[] > address > country` | alfanumérico | 2 | País de la dirección del pasajero (Código ISO). | `BR` |
| `transaction > pnr > passengers[] > address > city` | alfanumérico | 65 | Ciudad de la dirección del pasajero. | `São Paulo` |
| `transaction > pnr > passengers[] > address > street` | alfanumérico | 255 | Dirección (calle) del pasajero. | `Rua das Flores, 123` |
| `transaction > pnr > itinerary[] > departureDate` | alfanumérico | 19 | Fecha de salida en formato UTC. | `2022-01-01T23:59:59` |
| `transaction > pnr > itinerary[] > arrivalDate` | alfanumérico | 19 | Fecha de llegada en formato UTC. | `2022-01-02T23:59:59` |
| `transaction > pnr > itinerary[] > flightNumber` | alfanumérico | 12 | Número de vuelo. | `FL1234` |
| `transaction > pnr > itinerary[] > origin` | alfanumérico | 8 | Origen. | `BOG` |
| `transaction > pnr > itinerary[] > destination` | alfanumérico | 8 | Destino. | `MIA` |
| `transaction > pnr > itinerary[] > travelClass` | alfanumérico | 2 | Clase de viaje en el segmento de reserva. | `Y` |
| `transaction > pnr > itinerary[] > ticketType` | alfanumérico | 50 | Tipo de boleto. | `E-TICKET` |

</details>

{{% alert title="Nota" color="info"%}}

Al usar el formato XML, los parámetros del itinerario aparecen bajo `transaction > pnr > itinerary > segment` con la misma estructura pero ajustados en anidamiento.

{{% /alert %}}

#### Llamado a la API {#api-call-10}

A continuación, se presentan ejemplos de una solicitud para este método.

{{< tabs tabTotal="2" tabID="12" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una solicitud:**
```JSON
{
  "transaction": {
    "order": {
      ...
    },
    "creditCard": {
      ...
    },
    "extraParameters": {
      ...
    },
    "pnr": {
      "id": "abc123",
      "reservationAgent": {
        "id": "def456",
        "firstName": "CO",
        "lastName": "CO",
        "email": "first.last@example.org",
        "officePhoneNumber": "123456789"
      },
      "reservationOffice": {
        "id": "ghi789",
        "country": "CO"
      },
      "saleOffice": {
        "id": "jkl012",
        "country": "CO"
      },
      "passengers": [
        {
          "id": "mno345",
          "country": "CO",
          "level": "1",
          "firstName": "Firts Name",
          "lastName": "Last Name",
          "documentType": 0,
          "documentNumber": "987654321",
          "email": "first.last@example.com",
          "officePhoneNumber": "234567891",
          "homePhoneNumber": "345678912",
          "mobilePhoneNumber": "456789123",
          "address": {
            "country": "CO",
            "city": "Bogota D.C.",
            "street": "Calle 1 # 2 - 3"
          }
        },
        {
          "id": "mno346",
          "country": "CO",
          "level": "1",
          "firstName": "Firts Name",
          "lastName": "Last Name",
          "documentType": 0,
          "documentNumber": "55545151515",
          "email": "first.last@example.com",
          "officePhoneNumber": "336259",
          "homePhoneNumber": "2156668",
          "mobilePhoneNumber": "3001234123",
          "address": {
            "country": "CO",
            "city": "Bogota D.C.",
            "street": "Calle 3 # 2 - 1"
          }
        }
      ],
      "itinerary": [
        {
          "departureDate": "2022-01-01T23:59:59",
          "arrivalDate": "2025-01-01T23:59:59",
          "flightNumber": "PQR345",
          "origin": "BOGOTA",
          "destination": "MADRID",
          "travelClass": "BU",
          "ticketType": "RT"
        },
        {
          "departureDate": "2022-01-01T23:59:59",
          "arrivalDate": "2025-01-01T23:59:59",
          "flightNumber": "ARF2525",
          "origin": "MADRID",
          "destination": "LONDRES",
          "travelClass": "EC",
          "ticketType": "RT"
        }
      ]
    }
  }
}


```
<br>

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Ejemplo de una solicitud:**
```XML
<request>
  ...
  <transaction>
    <order>
      ...
    </order>
    <payer>
      ...
    </payer>
    <creditCard>
      ...
    </creditCard>
    <extraParameters>
      ...
    </extraParameters>
    <pnr>
      <id>abc123</id>
      <reservationAgent>
        <id>def456</id>
        <firstName>First Name</firstName>
        <lastName>Last Name</lastName>
        <email>first.last@example.org</email>
        <officePhoneNumber>123456789</officePhoneNumber>
      </reservationAgent>
      <reservationOffice>
        <id>ghi789</id>
        <country>CO</country>
      </reservationOffice>
      <saleOffice>
        <id>jkl012</id>
        <country>CO</country>
      </saleOffice>
      <passengers>
        <!-- Passenger 1 -->
        <passenger>
          <id>mno345</id>
          <country>CO</country>
          <level>1</level>
          <firstName>First Name</firstName>
          <lastName>Last Name</lastName>
          <documentType>0</documentType>
          <documentNumber>987654321</documentNumber>
          <email>first.last@example.com</email>
          <officePhoneNumber>234567891</officePhoneNumber>
          <homePhoneNumber>345678912</homePhoneNumber>
          <mobilePhoneNumber>456789123</mobilePhoneNumber>
          <address>
            <country>CO</country>
            <city>Bogota D.C.</city>
            <street>Calle 1 # 2 - 3</street>
          </address>
        </passenger>
        <!-- Passenger 2 -->
        <passenger>
          <id>mno346</id>
          <country>CO</country>
          <level>1</level>
          <firstName>First Name</firstName>
          <lastName>Last Name</lastName>
          <documentType>0</documentType>
          <documentNumber>55545151515</documentNumber>
          <email>first.last@example.com</email>
          <officePhoneNumber>336259</officePhoneNumber>
          <homePhoneNumber>2156668</homePhoneNumber>
          <mobilePhoneNumber>3001234123</mobilePhoneNumber>
          <address>
            <country>CO</country>
            <city>Bogota D.C.</city>
            <street>Calle 3 # 2 - 1</street>
          </address>
        </passenger>
      </passengers>
      <itinerary>
        <!-- Flight Journey 1 -->
        <segment>
          <departureDate>2022-01-01T23:59:59</departureDate>
          <arrivalDate>2025-01-01T23:59:59</arrivalDate>
          <flightNumber>PQR345</flightNumber>
          <origin>BOGOTA</origin>
          <destination>MADRID</destination>
          <travelClass>U</travelClass>
        </segment>
        <!-- Flight Journey 2 -->
        <segment>
          <departureDate>2022-01-01T23:59:59</departureDate>
          <arrivalDate>2025-01-01T23:59:59</arrivalDate>
          <flightNumber>ARF2525</flightNumber>
          <origin>MADRID</origin>
          <destination>LONDRES</destination>
          <travelClass>EC</travelClass>
        </segment>
      </itinerary>
    </pnr>
    <isTest>false</isTest>
  </transaction>
</request>

```

{{< /tab >}}

{{< /tabs >}}

## Consultar métodos de pago disponibles {#available-payment-methods-query}

Este método retorna la lista de los métodos de pago disponibles en todos los paises.

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response-7}

<details>
<summary><b>Solicitud</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Máx:32 | Asigna `GET_PAYMENT_METHODS`. | Sí |
| `test` (JSON)<hr>`isTest` (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| `merchant` | Objeto | | Este objeto tiene los datos de autenticación. | Sí |
| `merchant > apiLogin` | Alfanumérico | Min:12 Máx:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `merchant > apiKey` | Alfanumérico | Min:6 Máx:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |

</details>

<details>
<summary><b>Respuesta</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| `code` | Alfanumérico | | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| `paymentMethods` | Objeto | | Lista de métodos de pago. | Sí |
| `paymentMethods > paymentMethodComplete` | Objeto | | Este objeto tiene la información de un método de pago. | Sí |
| `paymentMethods > paymentMethodComplete > id` | Numérico | | Identificador del método de pago. | Sí |
| `paymentMethods > paymentMethodComplete > description` | Alfanumérico | Máx:32 | Nombre del método de pago. | Sí |
| `paymentMethods > paymentMethodComplete > country` | Alfanumérico | 2 | Código ISO del país del método de pago. | Sí |

</details>

### Llamado a la API {#api-call-11}

Los siguientes son los cuerpos de la petición y la respuesta para este método. Para el propósito de este ejemplo, la respuesta muestra dos métodos de pago. 

{{< tabs tabTotal="2" tabID="13" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una solicitud:**
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

**Ejemplo de una respuesta:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "paymentMethods": [
        {
            "id": "36",
            "description": "EFECTY",
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

**Ejemplo de una solicitud:**
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

**Ejemplo de una respuesta:**
```XML
<paymentMethodsResponse>
    <code>SUCCESS</code>
    <paymentMethods>
        <paymentMethodComplete>
            <id>36</id>
            <description>EFECTY</description>
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

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response-8}

<details>
<summary><b>Solicitud</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Máx:32 | Asigna `PING`. | Sí |
| `test` (JSON)<hr>`isTest` (XML) | Booleano | | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| `merchant` | Objeto | | Este objeto tiene los datos de autenticación. | Sí |
| `merchant > apiLogin` | Alfanumérico | Min:12 Máx:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `merchant > apiKey` | Alfanumérico | Min:6 Máx:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |

</details>

<details>
<summary><b>Respuesta</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| `code` | Alfanumérico | | Código de respuesta de la transacción. |
| `error` | Alfanumérico | Máx:2048 | Mensaje de error asociado si ocurrió un error. |
| `transactionResponse` | Objeto | Máx:2048 | La respuesta del método PING si ocurrió un error. |
</details>

### Llamado a la API {#api-call-12}

Los siguientes son los cuerpos de la petición y la respuesta para este método.

{{< tabs tabTotal="2" tabID="14" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una solicitud:**
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

**Ejemplo de una respuesta:**
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

**Ejemplo de una solicitud:**
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

**Ejemplo de una respuesta:**
```XML
<paymentResponse>
    <code>SUCCESS</code>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}
