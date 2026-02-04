---
title: "API de Pagos - México"
linkTitle: "API de Pagos - México"
date: 2021-05-03T15:48:08-05:00
description: >
   La API de Pagos para México permite integrar de manera eficiente las capacidades de procesamiento de pagos de PayU con tu plataforma de compras en línea. A través de esta API, los comercios pueden ofrecer a sus clientes una amplia variedad de métodos de pago, incluyendo efectivo, tarjetas de crédito, tarjetas de débito, transferencia bancaria y referencia bancaria.
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
* [Enviar transacciones utilizando Google Pay]({{< ref "#submit-transactions-using-google-pay" >}})
* [Enviar transacciones utilizando efectivo]({{< ref "#submit-transactions-using-cash" >}})
* [Enviar transacciones utilizando transferencia bancaria]({{< ref "#submit-transactions-using-bank-transfer" >}})
* [Enviar transacciones utilizando referencia bancaria]({{< ref "#submit-transactions-using-bank-reference" >}})
* [Incluir información de registro de nombre del pasajero]({{< ref "#include-passenger-name-record-information-optional" >}})
* [Consultar métodos de pago disponibles]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Nota" color="info"%}}

Para confirmar el estado de una transacción, puedes utilizar una de las siguientes opciones:
* Navega a la URL configurada en la variable `transaction.notifyUrl` o la opción _**URL de confirmación**_ ubicada en el Módulo PayU en _**Configuración**_ > _**Configuración técnica**_.
* Utiliza el [API o SDK de consultas]({{< ref "Queries.md" >}}).

{{% /alert %}}

## Enviar transacciones utilizando tarjetas de crédito o débito {#submit-transactions-using-credit-or-debit-cards}

Este método te permite procesar pagos realizados por tus clientes utilizando tarjetas de crédito o débito. Para México, puedes realizar los flujos de dos pasos (**Autorización**, **Captura**) y el de un paso (**Cobro**). Para más información, consulta los [flujos de pago]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Nota" color="info"%}}
El flujo de dos pasos solo está soportados para Mastercard y Visa.
{{% /alert %}}

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response}

<details>
<summary><b>Solicitud</b></summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Mostrar solo campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Max:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| `test` (JSON)<hr>`isTest` (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| `merchant` | Objeto |  | Este objeto tiene los datos de autenticación. | Sí |
| `merchant > apiLogin` | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `merchant > apiKey` | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `transaction` | Objeto |  | Este objeto tiene los datos de la transacción. | Sí |
| `transaction > order` | Objeto |  | Este objeto tiene los datos de la orden. | Sí |
| `transaction > order > accountId` | Numérico |  | Identificador de tu cuenta. | Sí |
| `transaction > order > referenceCode` | Alfanumérico | Min:1 Max:255 | Representa el identificador de la orden en tu sistema. | Sí |
| `transaction > order > description` | Alfanumérico | Min:1 Max:255 | Descripción de la orden. | Sí |
| `transaction > order > language` | Alfanumérico | 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí |
| `transaction > order > notifyUrl` | Alfanumérico | Max:2048 | URL de confirmación de la orden. | No |
| `transaction > order > partnerId` | Alfanumérico | Max:255 | ID de aliado dentro de PayU. | No |
| `transaction > order > signature` | Alfanumérico | Max:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| `transaction > order > shippingAddress` | Objeto |  | Dirección de envío. | No |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Max:100 | Línea de dirección 1. | No |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Max:100 | Línea de dirección 2. | No |
| `transaction > order > shippingAddress > city` | Alfanumérico | Max:50 | Ciudad de la dirección. | No |
| `transaction > order > shippingAddress > state` | Alfanumérico | Max:40 | Estado de la dirección. | No |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | País de la dirección. | No |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Max:8 | Código postal de la dirección. | No |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. | No |
| `transaction > order > buyer` | Objeto |  | Información del comprador. | Sí |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Max:100 | Identificador del comprador en tu sistema. | No |
| `transaction > order > buyer > fullName` | Alfanumérico | Max:150 | Nombre del comprador. | Sí |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Max:255 | Correo electrónico del comprador. | Sí |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Max:20 | Teléfono del comprador. | Sí |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Max:20 | Número de identificación del comprador. | Sí |
| `transaction > order > buyer > shippingAddress` | Alfanumérico |  | Dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Max:150 | Línea de dirección 1 del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Max:50 | Ciudad de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Max:40 | Estado de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| `transaction > order > buyer > shippingAddress > postalCode` | Numérico | Max:20 | Código postal de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > phone` | Numérico | Max:20 | Número de teléfono asociado a la dirección del comprador. | Sí |
| `transaction > order > additionalValues >` | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Monto de la transacción. | Sí |
| `transaction > order > additionalValues > TX_VALUE > value` | Numérico | 12, 2 | Especifica el monto de la transacción, este valor puede tener dos dígitos decimales (Ej. `10000.00` o `10000`). | Sí |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| `transaction > order > additionalValues > TX_TAX` | Alfanumérico | 64 | Monto del impuesto a las ventas. | Sí |
| `transaction > order > additionalValues > TX_TAX > value` | Numérico | 12, 2 | Especifica el monto del impuesto a las ventas.  | No |
| `transaction > order > additionalValues > TX_TAX > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alfanumérico | 64 | Valor base para calcular el impuesto.<br>Si el monto no tiene impuesto, envía 0.<br>Este valor puede tener dos dígitos decimales.  | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Numérico | 12, 2 | Especifica el monto base de la transacción. | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > creditCardTokenId` | Alfanumérico |  | Incluye este parámetro cuando la transacción se haga con una tarjeta tokenizada reemplazando la información de la tarjeta de crédito. Para más información, consulta [API de Tokenización]({{< ref "Tokenization-API.md" >}}) | No |
| `transaction > creditCard` | Objeto |  | Información de la tarjeta de crédito. Este objeto y sus parámetros son obligatorios cuando el pago se realiza utilizando una tarjeta de crédito no tokenizada. | No |
| `transaction > creditCard > number` | Alfanumérico | Min:13 Max:20 | Número de la tarjeta de crédito. | No |
| `transaction > creditCard > securityCode` | Alfanumérico | Min:1 Max:4 | Código de seguridad de la tarjeta de crédito (CVC2, CVV2, CID). | No |
| `transaction > creditCard > expirationDate` | Alfanumérico | 7 | Fecha de expiración de la tarjeta de crédito. Formato `YYYY/MM`. | No |
| `transaction > creditCard > name` | Alfanumérico | Min:1 Max:255 | Nombre del tarjetahabiente mostrado en la tarjeta de crédito. | No |
| `transaction > creditCard > processWithoutCvv2` | Booleano | Max:255 | Te permite procesar transacciones sin incluir el código de seguridad de la tarjeta de crédito. Tu comercio requiere autorización de PayU antes de utilizar esta funcionalidad. | No |
| `transaction > debitCard` | Objeto |  | Información de la tarjeta débito. Este objeto y sus parámetros son obligatorios cuando el pago se realiza utilizando una tarjeta debito. | No |
| `transaction > debitCard > number` | Alfanumérico | Min:13 Max:20 | Número de la tarjeta débito. | No |
| `transaction > debitCard > securityCode` | Alfanumérico | Min:1 Max:4 | Código de seguridad la tarjeta débito (CVC2, CVV2, CID). | No |
| `transaction > debitCard > expirationDate` | Alfanumérico | 7 | Fecha de expiración de la tarjeta débito. Formato `YYYY/MM`. | No |
| `transaction > debitCard > name` | Alfanumérico | Min:1 Max:255 | Nombre del tarjetahabiente mostrado en la tarjeta debito. | No |
| `transaction > payer` | Objeto |  | Información del pagador. Debido a regulaciones de impuestos, es obligatorio enviar los parámetro `payer.billingAddress.postalCode` y `payer.birthdate`. | Sí |
| `transaction > payer > emailAddress` | Alfanumérico | Max:255 | Correo electrónico del pagador. | No |
| `transaction > payer > merchantPayerId` | Alfanumérico | Max:100 | Identificador del pagador en tu sistema. | No |
| `transaction > payer > fullName` | Alfanumérico | Max:150 | Nombre del pagador que debe ser igual al enviado en el parámetro `creditCard.name` para pagos con tarjeta de crédito. | No |
| `transaction > payer > billingAddress` | Objeto |  | Dirección de facturación. | Sí |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Max:100 | Línea 1 de la dirección de facturación. | No |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Max:100 | Línea 2 de la dirección de facturación. | No |
| `transaction > payer > billingAddress > city` | Alfanumérico | Max:50 | Ciudad de la dirección de facturación. | No |
| `transaction > payer > billingAddress > state` | Alfanumérico | Max:40 | Estado de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | No| 
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Max:20 | Código postal de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. | No |
| `transaction > payer > birthdate` | Alfanumérico | Max:10 | Fecha de nacimiento del pagador. Formato `YYYY-MM-DD`. | Sí |
| `transaction > payer > contactPhone` | Alfanumérico | Max:20 | Número de teléfono del pagador. | No |
| `transaction > payer > dniNumber` | Alfanumérico | Max:20 | Número de identificación del pagador. | No |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver los tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sí |
| `transaction > type` | Alfanumérico | 32 | Asigna este valor de acuerdo con el tipo de transacción requerido:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` para flujos de un paso.</li></ul> | Sí |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecciona un método de pago de Tarjeta de crédito o débito valido. [Ver los métodos de pago disponibles para México]({{< ref "select-your-payment-method.html#mexico" >}}). | Sí |
| `transaction > paymentCountry` | Alfanumérico | 2 | Asigna `MX` para México. | Sí |
| `transaction > deviceSessionId` | Alfanumérico | Max:255 | Identificador de la sesión del dispositivo donde el cliente realiza la transacción. Para más información, consulta [este artículo]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| `transaction > ipAddress` | Alfanumérico | Max:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| `transaction > cookie` | Alfanumérico | Max:255 | Cookie almacenada por el dispositivo donde el cliente realiza la transacción. | Sí |
| `transaction > userAgent` | Alfanumérico | Max:1024 | User agent del navegador donde el cliente realiza la transacción. | Sí |
| `transaction > extraParameters` | Objeto |  | Parámetros adicionales o datos asociados a la petición. El tamaño máximo de cada nombre de _extraParameters_ es 64 caracteres.<br>En JSON, El parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>En XML, El parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | No |
| `transaction > extraParameters > EXTRA1` | Alfanumérico | Máx:255 | Campo adicional para enviar información extra sobre la compra. | No |
| `transaction > extraParameters > EXTRA2` | Alfanumérico | Máx:255 | Campo adicional para enviar información extra sobre la compra. | No |
| `transaction > extraParameters > EXTRA3` | Alfanumérico | Máx:255 | Campo adicional para enviar información extra sobre la compra. | No |
| `transaction > threeDomainSecure` | Objeto |  | Este objeto contiene la información de 3DS 2.0. | No |
| `transaction > threeDomainSecure > embedded` | Booleano |  | Asigna `true` si quieres utilizar un MPI embebido para el proceso de Autorización. Por defecto, este valor está asignado como `false`. | No |
| `transaction > threeDomainSecure > eci` | Numérico | Máx:2 | Indicador de Comercio Electrónico.<br>Valor retornado por los servidores de directorio indicando el intento de autenticación.<br>Este parámetro es obligatorio cuando `transaction.threeDomainSecure.embedded` es `false` y `transaction.threeDomainSecure.xid` tiene un valor configurado. | No |
| `transaction > threeDomainSecure > cavv` | Alfanumérico | Máx:28 | Valor de verificación de autenticación del titular de la tarjeta (Cardholder Authentication Verification Value).<br>Código del criptograma utilizado en la autenticación de la transacción codificado en Base 64.<br>Dependiendo de los códigos ECI específicos establecidos por la red, este valor puede ser opcional. | No |
| `transaction > threeDomainSecure > xid` | Alfanumérico | Máx:28 | Identificador de la transacción enviado por el MPI codificado en Base 64.<br>Este parámetro es obligatorio cuando `transaction.threeDomainSecure.embedded` is `false` y `transaction.threeDomainSecure.eci` tiene un valor configurado. | No |
| `transaction > threeDomainSecure > directoryServerTransactionId` | Alfanumérico | Máx:36 | Identificador de la transacción generador por el servidor de directorio durante la autenticación. | No |
<!--| transaction > monthsWithoutInterest |  |  | Information when paying the purchase using Months Without Interests.<br>This parameter is mandatory when you want to use [Months Without Interests (Meses Sin Intereses - MSI) feature]({{< ref "Promotions.md#months-without-interest-msi---meses-sin-intereses" >}}). | No |
| transaction > monthsWithoutInterest > months` | Numérico | Max:2` | Numérico of Months Without Interests for the purchase. The available values are 3, 6, 9, or 12.<br>This parameter is mandatory when you want to use [Months Without Interests (Meses Sin Intereses - MSI) feature]({{< ref "Promotions.md#months-without-interest-msi---meses-sin-intereses" >}}). | No |
| transaction > monthsWithoutInterest > bank` | Alfanumérico | Max:255 | Issuing bank of the credit card used to pay the purchase using Months Without Interests.<br>This parameter is mandatory when you want to use [Months Without Interests (Meses Sin Intereses - MSI) feature]({{< ref "Promotions.md#months-without-interest-msi---meses-sin-intereses" >}}). | No |-->

</details>

<details>
<summary><b>Respuesta</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| `code` | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| `error` | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| `transactionResponse` | Objeto |  | Datos de la respuesta. |
| `transactionResponse > orderId` | Numérico |  | Identificador generado o existente de la orden en PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | Identificador de la transacción en PayU. |
| `transactionResponse > state` | Alfanumérico | Max:32 | Estado de la transacción. |
| `transactionResponse > responseCode` | Alfanumérico | Max:64 | Código de respuesta asociado con el estado. |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Max:255 | Código de respuesta retornado por la red bancaria. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Max:255 | Mensaje de error retornado por la red bancaria. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Max:32 | Código de trazabilidad retornado por la red bancaria. |
| `transactionResponse > authorizationCode` | Alfanumérico | Max:12 | Código de autorización retornado por la red bancaria. |
| `transactionResponse > responseMessage` | Alfanumérico | Max:2048 | Mensaje asociado al código de respuesta. |
| `transactionResponse > operationDate` | Fecha |  | Fecha de creación de la respuesta en el sistema de PayU. |
| `transactionResponse > extraParameters` | Objeto |  | Parámetros adicionales o datos asociados a la respuesta. <br>En JSON, El parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>En XML, El parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| `transactionResponse > additionalInfo` | Objeto |  | Información adicional de la respuesta. Este objeto tiene la misma estructura de `transactionResponse.extraParameters`. |
| `transactionResponse > additionalInfo > rejectionType` | Alfanumérico | Máx: 4 | Indica la categoría del rechazo. Valores posibles: `SOFT` o `HARD`. Para más información, consulta [Consideraciones]({{< ref "Payments-API-Mexico.md#considerations" >}}). |

</details>

#### Consideraciones {#considerations}

* **Manejo de Rechazos (`rejectionType`):** Esta funcionalidad solo aplica a transacciones de tipo `AUTHORIZATION` y `AUTHORIZATION_AND_CAPTURE`. Cuando se rechaza una transacción, el campo `additionalInfo.rejectionType` ayuda a determinar la estrategia de reintento:
    * **HARD**: Indica un rechazo permanente. Según las regulaciones de la red, **el comercio no debe reintentar la transacción** utilizando los mismos datos de la tarjeta. Los reintentos frecuentes de rechazos tipo "Hard" pueden resultar en penalizaciones o multas por parte de las redes financieras.
    * **SOFT**: Indica un problema temporal (por ejemplo, fondos insuficientes). La transacción puede reintentarse en un momento posterior.
* El flujo de dos pasos solo está soportados para Mastercard y Visa.
* Para pagos con Promociones, envía los parámetros `INSTALLMENTS_NUMBER` y `PROMOTION_ID` con el número de cuotas seleccionado y el ID de la promoción. Consulta el [API de Promociones]({{< ref "Promotions.md" >}}) para más información.
* Para pagos con Meses Sin Intereses - MSI, envía el extra parámetro `INSTALLMENTS_NUMBER` con el número de meses. Consulta [MSI]({{< ref "Promotions.md#months-without-interests-msi---meses-sin-intereses" >}}) para más información.
* Los bancos disponibles para MSI son: BANAMEX, BANCO REGIONAL DE MONTERREY S.A, BANCOPPEL, BANCO AZTECA, SCOTIABANK, HSBC, INBURSA, BANCA MIFEL SA, BANCO MULTIVA, BAJIO, CI BANCO, Afirme, Banregio, Banjercito, Banorte, Famsa, Invex, Premium Card Liverpool, Santander y Bancomer.
* Cuando utilices MSI, promociones o apliques cuotas, debes mostrar siempre la frase **"PAGOS DIFERIDOS"** durante el proceso de pago.
* Cuando se apliquen cuotas (cargos asumidos por el pagador), muestra el monto original de la transacción, el monto luego de las cuotas, el número de cuotas y el monto por cuota incluyendo el valor adicional.
* La funcionalidad de Promociones solo está disponible para [flujos de un paso]({{< ref "Payments.md#payment-flows" >}}).
* Para pagos con tókenes de tarjetas de crédito, incluye los parámetros `transaction.creditCardTokenId` y `transaction.creditCard.securityCode` (Si procesas con código de seguridad) reemplazando la información de la tarjeta de crédito . Para más información, consulta el [API de Tokenización]({{< ref "Tokenization-API.md" >}}).
* Por defecto, el procesamiento de tarjetas de crédito sin código de seguridad no está activo. Si lo quieres activar, contacta a tu representante de ventas. Luego de que esté activado, envía en la petición la variable `creditCard.processWithoutCvv2` con valor true y elimina la variable `creditCard.securityCode`.
* La variable `transaction.threeDomainSecure` no reemplaza la información de la tarjeta o ninguno de los campos obligatorios de la transacción. Este objeto es adicional y no es obligatorio.
* La variable `transaction.threeDomainSecure` corresponde a un escenario _passthrough_ donde el comercio realiza la autenticación por su cuenta.
* Para la tarjeta Crédito Fácil Codensa, el número de cuotas soportadas es 1 a 12, 18, 24, 36 y 48.

### Autorización {#authorization}

Utiliza este método para realizar el paso de **Autorización** del flujo de dos pasos utilizando Mastercard o Visa. En este paso, autorizas el pago pero el monto no se debita hasta que [captures]({{< ref "payments-api-mexico.md#capture" >}}) los fondos.<br>Los siguientes son los cuerpos de la petición y la respuesta para este tipo de transacción.

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
         "accountId": "512324",
         "referenceCode": "PRODUCT_TEST_2021-06-22T17:33:42.775Z",
         "description": "payment test",
         "language": "es",
         "signature": "6fd48e7150c652833866799a3fbf87bb",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "MXN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Domingo Diez 1589",
               "street2": "5555487",
               "city": "Cuernavaca",
               "state": "Morelos",
               "country": "MX",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "5555487",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
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
         "birthdate": "1994-06-21",
         "billingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "125544",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
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
      "paymentCountry": "MX",
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
        "orderId": 1400446409,
        "transactionId": "596ccd26-41a3-40b0-a241-262b3331aedc",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "458250371149",
        "authorizationCode": "MOCK-BTE-1624383236617",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624365236861,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "EXPIRATION_DATE": 1624987980000,
            "PAYMENT_WAY_ID": "4"
        },
        "additionalInfo": {
            "paymentNetwork": "BANORTE",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": "CREDIT",
            "transactionType": "AUTHORIZATION"
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
         <accountId>512324</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-22T17:33:42.775Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>6fd48e7150c652833866799a3fbf87bb</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>MXN</currency>
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
               <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>
               <city>Cuernavaca</city>
               <state>Morelos</state>
               <country>MX</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>
            <city>Cuernavaca</city>
            <state>Morelos</state>
            <country>MX</country>
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
         <birthdate>1994-06-21</birthdate>
         <billingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>
            <city>Cuernavaca</city>
            <state>Morelos</state>
            <country>MX</country>
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
      <paymentCountry>MX</paymentCountry>
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
        <orderId>1400446580</orderId>
        <transactionId>f03be7ef-e82a-41e3-9a3c-5451c4d8ab99</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>458250371149</trazabilityCode>
        <authorizationCode>MOCK-BTE-1624389497244</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Aprobado</responseMessage>
        <operationDate>2021-06-22T09:18:17</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-29T14:18:00</date>
            </entry>
            <entry>
                <string>PAYMENT_WAY_ID</string>
                <string>4</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>BANORTE</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <cardType>CREDIT</cardType>
            <transactionType>AUTHORIZATION</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Captura {#capture}

Utiliza este método para realizar el paso de **Captura** del flujo de dos pasos para Mastercard y Visa. En este paso, capturas los fondos previamente [Autorizados]({{< ref "payments-api-mexico.md#authorization" >}}) para transferirlos a tu cuenta PayU.

#### Consideraciones {#considerations-1}

Ten en cuenta las siguientes consideraciones para la captura.
* El tiempo máximo para capturar una transacción aprobada es de 30 días. Después de este tiempo, la transacción es anulada automáticamente.
* Para capturar una transacción, solo son obligatorios los parámetros mostrados en el cuerpo de la petición. Ten en cuenta que los IDs de las orden y la transacción deben corresponder a la actualmente autorizada.
* Puedes realizar capturas parciales sobre un monto autorizado. Para más información, consulta la sección [Captura Parcial]({{< ref "#partial-capture" >}}).

Los siguientes son los cuerpos de la petición y la respuesta para este tipo de transacción.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una solicitud:**
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
         "id": "1400446409"
      },
      "type": "CAPTURE",
      "parentTransactionId": "596ccd26-41a3-40b0-a241-262b3331aedc"
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
        "orderId": 1400446409,
        "transactionId": "434312fd-90c6-48e0-9c73-dd3c2bb40d27",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "458250371149",
        "authorizationCode": "MOCK-BTE-1624389983478",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624371983901,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "PAYMENT_WAY_ID": "4"
        },
        "additionalInfo": {
            "paymentNetwork": "BANORTE",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": null,
            "transactionType": "CAPTURE"
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
         <id>1400446409</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>596ccd26-41a3-40b0-a241-262b3331aedc</parentTransactionId>
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
        <orderId>1400446580</orderId>
        <transactionId>febf383f-add7-4986-82a2-941f0f4e9b45</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>458250371149</trazabilityCode>
        <authorizationCode>MOCK-BTE-1624390154273</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Aprobado</responseMessage>
        <operationDate>2021-06-22T09:29:14</operationDate>
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
        <additionalInfo>
            <paymentNetwork>BANORTE</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Captura parcial {#partial-capture}

Una captura parcial es una operación que permite solicitar el desembolso de un monto menor al autorizado previamente en una transacción.

Esto significa que si inicialmente tu integración autorizó un pago de $100, puedes realizar una captura parcial por un valor de $60, y liberar el monto restante de $40, el cual la integración no podrá capturar posteriormente.

#### Consideraciones {#considerations-2}

* El monto total capturado no puede exceder el monto autorizado originalmente.
* Cada procesador de pagos y cada país pueden tener reglas o restricciones en cuanto al monto que puedes capturar parcialmente.
* Debes especificar el valor que deseas capturar parcialmente en el campo `value`, dentro del parámetro `TX_VALUE`, como se muestra en el ejemplo a continuación.

Los siguientes son ejemplos de los cuerpos de la solicitud y la respuesta para este tipo de transacción.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una solicitud:**
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
            "id": "2152525133"
        },
        "additionalValues": {
            "TX_VALUE": {
                "value": 1000,
                "currency": "MXN"
            }
        },
        "type": "CAPTURE",
        "parentTransactionId": "4b6adba7-e43b-45f8-88a6-d290755d6c04"
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
        "orderId": 2152543423,
        "transactionId": "6f523681-1587-4a2d-8a15-605d27f89c26",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "6f523681-1587-4a2d-8a15-605d27f89c26",
        "authorizationCode": "NPS-011111",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "APROBADA - Autorizada",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1723724052207,
        "referenceQuestionnaire": null,
        "extraParameters": null,
        "additionalInfo": {
            "paymentNetwork": "NPS_AR",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": null,
            "transactionType": "CAPTURE"
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
    <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
    <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
  </merchant>
  <transaction>
    <order>
      <id>2152525133</id>
    </order>
    <additionalValues>
      <TX_VALUE>
        <value>1000</value>
        <currency>MXN</currency>
      </TX_VALUE>
    </additionalValues>
    <type>CAPTURE</type>
    <parentTransactionId>4b6adba7-e43b-45f8-88a6-d290755d6c04</parentTransactionId>
  </transaction>
  <test>false</test>
</request>

```
<br>

**Ejemplo de una respuesta:**
```XML
<response>
  <code>SUCCESS</code>
  <error />
  <transactionResponse>
    <orderId>2152543423</orderId>
    <transactionId>6f523681-1587-4a2d-8a15-605d27f89c26</transactionId>
    <state>APPROVED</state>
    <paymentNetworkResponseCode>0</paymentNetworkResponseCode>
    <paymentNetworkResponseErrorMessage />
    <trazabilityCode>6f523681-1587-4a2d-8a15-605d27f89c26</trazabilityCode>
    <authorizationCode>NPS-011111</authorizationCode>
    <pendingReason />
    <responseCode>APPROVED</responseCode>
    <errorCode />
    <responseMessage>APROBADA - Autorizada</responseMessage>
    <transactionDate />
    <transactionTime />
    <operationDate>1723724052207</operationDate>
    <referenceQuestionnaire />
    <extraParameters />
    <additionalInfo>
      <paymentNetwork>NPS_AR</paymentNetwork>
      <rejectionType>NONE</rejectionType>
      <responseNetworkMessage />
      <travelAgencyAuthorizationCode />
      <cardType />
      <transactionType>CAPTURE</transactionType>
    </additionalInfo>
  </transactionResponse>
</response>

```

{{< /tab >}}
{{< /tabs >}}

### Cobro {#charge}

Utiliza este método para realizar el flujo de un paso, es decir, un cobro. En este paso, los pasos del flujo de dos pasos son combinados en una única transacción y los fondos son transferidos de la cuenta del cliente a tu cuenta PayU tan pronto sean aprobados:

Los siguientes son los cuerpos de la petición y la respuesta para este tipo de transacción.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
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
         "accountId": "512324",
         "referenceCode": "PRODUCT_TEST_2021-06-22T17:33:42.775Z",
         "description": "payment test",
         "language": "es",
         "signature": "6fd48e7150c652833866799a3fbf87bb",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "MXN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Domingo Diez 1589",
               "street2": "5555487",
               "city": "Cuernavaca",
               "state": "Morelos",
               "country": "MX",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "5555487",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
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
         "birthdate": "1994-06-21",
         "billingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "125544",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
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
      "paymentCountry": "MX",
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
        "orderId": 1400446667,
        "transactionId": "868e169b-1857-4c52-a80d-e4b6d228a74f",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "458250371149",
        "authorizationCode": "MOCK-BTE-1624391396880",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624373397257,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "PAYMENT_WAY_ID": "4"
        },
        "additionalInfo": {
            "paymentNetwork": "BANORTE",
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
         <accountId>512324</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-22T17:33:42.775Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>6fd48e7150c652833866799a3fbf87bb</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>MXN</currency>
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
               <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>
               <city>Cuernavaca</city>
               <state>Morelos</state>
               <country>MX</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>
            <city>Cuernavaca</city>
            <state>Morelos</state>
            <country>MX</country>
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
         <birthdate>1994-06-21</birthdate>
         <billingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>
            <city>Cuernavaca</city>
            <state>Morelos</state>
            <country>MX</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <creditCard>
         <number>4850110000000000</number>
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
      <paymentCountry>MX</paymentCountry>
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
        <orderId>1400446670</orderId>
        <transactionId>a32da7ad-fb55-41ff-863d-ee49361334cb</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>458250371149</trazabilityCode>
        <authorizationCode>MOCK-BTE-1624391456868</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Aprobado</responseMessage>
        <operationDate>2021-06-22T09:50:57</operationDate>
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
        <additionalInfo>
            <paymentNetwork>BANORTE</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <cardType>CREDIT</cardType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Enviar transacciones utilizando Google Pay {#submit-transactions-using-google-pay}

Google Pay es una billetera digital que permite realizar pagos con tarjeta de forma sencilla y rápida, sin necesidad de introducir los datos de la tarjeta en cada pago. Los datos de la tarjeta son almacenados de forma segura por Google. Este método de pago está disponible para todos los dispositivos (teléfonos móviles y ordenadores), independientemente del sistema operativo y en casi todos los navegadores web.

En caso de utilizar Google Pay, los comercios deben adherirse a la [Política de uso aceptable](https://payments.developers.google.com/terms/aup) de las API de Google Pay y aceptar los términos que definen las [Condiciones de servicio de las API de Google Pay](https://payments.developers.google.com/terms/sellertos).

{{% alert title="Nota" color="info"%}}

La descripción que figura a continuación se aplica a la prestación de este servicio directamente mostrando la ventana emergente de Google Pay en el sitio web del receptor del pago (e-commerce).

{{% /alert %}}

Para los comercios de PayU que procesan en México, ten en cuenta que Google Pay está disponible actualmente solo para integraciones por API. Para procesar transacciones con Google Pay, debes completar los siguientes pasos:

* Integrar el método de pago mediante la API.
* Adaptar tu integración existente con la API de PayU para que sea compatible con Google Pay.

### Integración API del medio de pago {#api-integration-of-the-payment-method}

Para integrar el sitio web con el monedero Google Pay, procede según las instrucciones que figuran en este sitio web:
* [Documentación de la API](https://developers.google.com/pay/api/web)
* [Lista de chequeo de integración de API](https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist)
* [Directrices de la marca](https://developers.google.com/pay/api/web/guides/brand-guidelines)

#### Definiciones de PayU para la integración API del medio de pago {#payu-definitions-for-the-api-integration-of-the-payment-method}

A continuación encontrarás información relevante que debes considerar durante la integración del medio de pago para que tus pagos sean procesados por PayU.

##### Solicitar un payment token para PayU {#request-a-payment-token-for-payu}

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

##### Medios de pago soportados {#supported-payment-networks}

PayU procesa pagos de Google Pay para tarjetas Mastercard y Visa. Para configurar tu script de Google, utiliza estos ajustes:

```
const allowedCardNetworks = ["MASTERCARD", "VISA", "ELECTRON", "MAESTRO"];
const allowedCardAuthMethods = ["PAN_ONLY"];
```

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

### Procesar transacciones de Google Pay en PayU {#process-google-pay-transactions-in-payu}

 La función principal de Google Pay como billetera digital es almacenar tarjetas de crédito para facilitar el procesamiento de pagos. Con eso en mente, para el procesamiento de transacciones de Google Pay en PayU, la lógica a aplicar será la misma que para tarjetas de crédito, excepto por las siguientes particularidades:

* Si estás procesando transacciones de tus clientes con Google Pay, debes configurar la información de la billetera digital en el parámetro ```transaction.digitalWallet```.
* Dentro del parámetro ```transaction.digitalWallet``` utiliza ```GOOGLE_PAY``` para el campo ```transaction.digitalWallet.type``` y envía el Google Pay token en el campo ```transaction.digitalWallet.message```. 
* Ten en cuenta que dentro del parámetro ```transaction.creditcard```, para las transacciones de Google Pay, siempre debes enviar un valor válido para el campo ```transaction.creditcard.name```. Otros campos de este parámetro no son necesarios ya que Google Pay los entrega dentro del Google Pay token.
* Contacta a tu gerente de cuenta para realizar las activaciones necesarias para procesar sin cvv ya que este medio de pago lo requiere.

### Llamado a la API {#api-call}

Los siguientes son ejemplos de los cuerpos de la petición y la respuesta de este método de pago.


{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Ejemplo de una solicitud:**
```JSON
{
"language": "en",
    "command": "SUBMIT_TRANSACTION",
    "merchant": {
        "apiLogin": "pRRXKOl8ikMmt9u",
        "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
    },
    "transaction": {
        "type": "AUTHORIZATION_AND_CAPTURE",
        "paymentMethod": "MASTERCARD",
        "paymentCountry": "MX",
        "ipAddress": "147.203.165.186",
        "userAgent": "Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 6.2; Trident/6.0)",
        "cookie": "l5jc08ez9lqy1exxkbruh0o7k",
        "deviceSessionId": "2c7aa39a700862da9ca06bd39b52e302",
        "req3DSAuthentication": "true",
        "order": {
            "language": "en",
            "signature": "3fdb76cc2dc3b1adb37430658705985b105294a20aa128f5bc309f3d76bd9067",
            "accountId": "516687",
            "description": "PayULatam|Test|MX|MXN|GooglePay",
            "referenceCode": "Postman|UniqueReference|9/18/2025, 11:33:18 AM",
            "notifyUrl": "https://5bb9f92041d902192de31554e65bafe4.m.pipedream.net",
            "buyer": {
                "merchantBuyerId": "MB_MX_1001",
                "fullName": "John Doea",
                "emailAddress": "john.doe@email.com",
                "dniType": "CURP",
                "dniNumber": "LOGM900412MDFRPR08",
                "shippingAddress": {
                    "country": "MX",
                    "state": "CDMX",
                    "city": "Ciudad de Mexico",
                    "postalCode": "06700",
                    "street1": "Av. Alvaro Obregonn 123",
                    "street2": "Depto. 4, Col. Roma Norte",
                    "phone": "5512345678"
                }
            },
            "shippingAddress": {
                "country": "MX",
                "state": "CDMX",
                "city": "Ciudad de Mexico",
                "postalCode": "06700",
                "street1": "Av. Alvaro Obregonn 123",
                "street2": "Depto. 4, Col. Roma Norte",
                "phone": "5512345678"
            },
            "additionalValues": {
                "TX_VALUE": {
                    "value": 596,
                    "currency": "MXN"
                },
                "TX_TAX": {
                    "value": 82,
                    "currency": "MXN"
                },
                "TX_TAX_RETURN_BASE": {
                    "value": 514,
                    "currency": "MXN"
                }
            }
        },
        "payer": {
            "merchantPayerId": "MP_MX_2002",
            "fullName": "Jane Smith",
            "emailAddress": "j.smith@example.com",
            "contactPhone": "5598765432",
            "dniType": "CURP",
            "dniNumber": "MARA850715HDFRZS03",
            "billingAddress": {
                "country": "MX",
                "state": "CDMX",
                "city": "Ciudad de Mexico",
                "postalCode": "04100",
                "street1": "Calle Francisco Sosa 45",
                "street2": "Col. Coyoa",
                "phone": "5598765432"
            }
        },
        "creditCard": {
            "name": "APPROVED"
        },
        "digitalWallet": {
            "type": "GOOGLE_PAY",
            "message": "{\"signature\":\"MEYCIQCuxXTYshCrEQbW8OaGT/Nieb8opDRweEPorFc1yWNrIwIhAMJUZWJeeukveo1bEghbIuWUjwt07WPHQ5cPPp/VjSFc\",\"intermediateSigningKey\":{\"signedKey\":\"{\\\"keyValue\\\":\\\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEs4ndUn/BYwZ5v3i4PoEfnYfeRLPoSaqoi6hiO4WWXVnAAeU8NzH8QB76CkpwwStEnsrwkSocPzraa8EwHY4Kdw\\\\u003d\\\\u003d\\\",\\\"keyExpiration\\\":\\\"1758884919146\\\"}\",\"signatures\":[\"MEQCIDiiEVR495hVrLgLppqn6o+GJzwNNOvYYu/TsI4giUibAiA6pwsXyKSu2yWSye0zE/PcDKIXWp7TFG7ISOcOyZSkAQ\\u003d\\u003d\"]},\"protocolVersion\":\"ECv2\",\"signedMessage\":\"{\\\"encryptedMessage\\\":\\\"jz75BshPqkgDY6Oz/iY+FUSJk8OC7duVvVRhN9kMFgeqogoQLJI48frjIK3m6m7rmNkfhlkxxwC2nHtWszZBUXeiHTDPyG5sJLKwYKuuZ2hKx4Ho32o16WyggBWYt1AlBqmIOv22PPEf2bDJ/Bsfmfo2KXHG99/+2YM1/5usKE+6xIwwvBbTGRkT7dZRNDnJHgm4o/weMgY3Gdc7LKtgR0u/xvJAeTD8tE25i6PWSQpMuqlXCNJ13+mtfjaO8KxylHyQrq5WRrGgSbmhhCVIdwjfDtWZKZF+bhJvqaYY1pLjRgoNFP6SZRzzkcMbRY8TV0Ea3LA4UyrxlRjnDNY4a7zYCckP+qk/5qDUqzEQGTB4a1PEiISwAY2eHxoMokE30BCVcbseEGrSpaoIifThJd2vIjqRL6nvtX1DNq5wUkURsxK4joUjBtdBZWrX+uOSmNfayi0rPqxeTTRTldEUjC/Dc97tCsSfAZjCOM+ZNvail9bi7ezdGgxsFr2mEoDOrOuDAXtr+zsO8My6J2t4WArYxDk/uGBNgAbS\\\",\\\"ephemeralPublicKey\\\":\\\"BAPcb2ul2X77oDEejSTZYADpF3vRPLvmtB7BZ4jAJ9M/LmpLD39FsY9ozs5x2FEWdtmQ9IBi65w2vcfjHUELpMU\\\\u003d\\\",\\\"tag\\\":\\\"R/jvDyn4BlEF84hKZgyutuHCrgaRHWZMo0i3PIHn/HU\\\\u003d\\\"}\"}"
        },
        "extraParameters": {
            "INSTALLMENTS_NUMBER": 1,
            "RESPONSE_URL": "https://urlonline.com/#https://yoursite.com/payment_result"
        }
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
  <language>en</language>
  <command>SUBMIT_TRANSACTION</command>
  <merchant>
    <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
    <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
  </merchant>
  <transaction>
    <type>AUTHORIZATION_AND_CAPTURE</type>
    <paymentMethod>MASTERCARD</paymentMethod>
    <paymentCountry>MX</paymentCountry>
    <ipAddress>147.203.165.186</ipAddress>
    <userAgent>Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 6.2; Trident/6.0)</userAgent>
    <cookie>l5jc08ez9lqy1exxkbruh0o7k</cookie>
    <deviceSessionId>2c7aa39a700862da9ca06bd39b52e302</deviceSessionId>
    <req3DSAuthentication>true</req3DSAuthentication>
    <order>
      <language>en</language>
      <signature>3fdb76cc2dc3b1adb37430658705985b105294a20aa128f5bc309f3d76bd9067</signature>
      <accountId>516687</accountId>
      <description>PayULatam|Test|MX|MXN|GooglePay</description>
      <referenceCode>Postman|UniqueReference|9/18/2025, 11:33:18 AM</referenceCode>
      <notifyUrl>https://5bb9f92041d902192de31554e65bafe4.m.pipedream.net</notifyUrl>
      <buyer>
        <merchantBuyerId>MB_MX_1001</merchantBuyerId>
        <fullName>John Doea</fullName>
        <emailAddress>john.doe@email.com</emailAddress>
        <dniType>CURP</dniType>
        <dniNumber>LOGM900412MDFRPR08</dniNumber>
        <shippingAddress>
          <country>MX</country>
          <state>CDMX</state>
          <city>Ciudad de Mexico</city>
          <postalCode>06700</postalCode>
          <street1>Av. Alvaro Obregonn 123</street1>
          <street2>Depto. 4, Col. Roma Norte</street2>
          <phone>5512345678</phone>
        </shippingAddress>
      </buyer>
      <shippingAddress>
        <country>MX</country>
        <state>CDMX</state>
        <city>Ciudad de Mexico</city>
        <postalCode>06700</postalCode>
        <street1>Av. Alvaro Obregonn 123</street1>
        <street2>Depto. 4, Col. Roma Norte</street2>
        <phone>5512345678</phone>
      </shippingAddress>
      <additionalValues>
        <TX_VALUE>
          <value>596</value>
          <currency>MXN</currency>
        </TX_VALUE>
        <TX_TAX>
          <value>82</value>
          <currency>MXN</currency>
        </TX_TAX>
        <TX_TAX_RETURN_BASE>
          <value>514</value>
          <currency>MXN</currency>
        </TX_TAX_RETURN_BASE>
      </additionalValues>
    </order>
    <payer>
      <merchantPayerId>MP_MX_2002</merchantPayerId>
      <fullName>Jane Smith</fullName>
      <emailAddress>j.smith@example.com</emailAddress>
      <contactPhone>5598765432</contactPhone>
      <dniType>CURP</dniType>
      <dniNumber>MARA850715HDFRZS03</dniNumber>
      <billingAddress>
        <country>MX</country>
        <state>CDMX</state>
        <city>Ciudad de Mexico</city>
        <postalCode>04100</postalCode>
        <street1>Calle Francisco Sosa 45</street1>
        <street2>Col. Coyoa</street2>
        <phone>5598765432</phone>
      </billingAddress>
    </payer>
    <creditCard>
      <name>APPROVED</name>
    </creditCard>
    <digitalWallet>
      <type>GOOGLE_PAY</type>
      <message>
        {"signature":"MEYCIQCuxXTYshCrEQbW8OaGT/Nieb8opDRweEPorFc1yWNrIwIhAMJUZWJeeukveo1bEghbIuWUjwt07WPHQ5cPPp/VjSFc","intermediateSigningKey":{"signedKey":"{\"keyValue\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEs4ndUn/BYwZ5v3i4PoEfnYfeRLPoSaqoi6hiO4WWXVnAAeU8NzH8QB76CkpwwStEnsrwkSocPzraa8EwHY4Kdw\\u003d\\u003d\",\"keyExpiration\":\"1758884919146\"}","signatures":["MEQCIDiiEVR495hVrLgLppqn6o+GJzwNNOvYYu/TsI4giUibAiA6pwsXyKSu2yWSye0zE/PcDKIXWp7TFG7ISOcOyZSkAQ\\u003d\\u003d"]},"protocolVersion":"ECv2","signedMessage":"{\"encryptedMessage\":\"jz75BshPqkgDY6Oz/iY+FUSJk8OC7duVvVRhN9kMFgeqogoQLJI48frjIK3m6m7rmNkfhlkxxwC2nHtWszZBUXeiHTDPyG5sJLKwYKuuZ2hKx4Ho32o16WyggBWYt1AlBqmIOv22PPEf2bDJ/Bsfmfo2KXHG99/+2YM1/5usKE+6xIwwvBbTGRkT7dZRNDnJHgm4o/weMgY3Gdc7LKtgR0u/xvJAeTD8tE25i6PWSQpMuqlXCNJ13+mtfjaO8KxylHyQrq5WRrGgSbmhhCVIdwjfDtWZKZF+bhJvqaYY1pLjRgoNFP6SZRzzkcMbRY8TV0Ea3LA4UyrxlRjnDNY4a7zYCckP+qk/5qDUqzEQGTB4a1PEiISwAY2eHxoMokE30BCVcbseEGrSpaoIifThJd2vIjqRL6nvtX1DNq5wUkURsxK4joUjBtdBZWrX+uOSmNfayi0rPqxeTTRTldEUjC/Dc97tCsSfAZjCOM+ZNvail9bi7ezdGgxsFr2mEoDOrOuDAXtr+zsO8My6J2t4WArYxDk/uGBNgAbS\",\"ephemeralPublicKey\":\"BAPcb2ul2X77oDEejSTZYADpF3vRPLvmtB7BZ4jAJ9M/LmpLD39FsY9ozs5x2FEWdtmQ9IBi65w2vcfjHUELpMU\\u003d\",\"tag\":\"R/jvDyn4BlEF84hKZgyutuHCrgaRHWZMo0i3PIHn/HU\\u003d\"}"}
      </message>
    </digitalWallet>
    <extraParameters>
      <INSTALLMENTS_NUMBER>1</INSTALLMENTS_NUMBER>
      <RESPONSE_URL>https://urlonline.com/#https://yoursite.com/payment_result</RESPONSE_URL>
    </extraParameters>
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

## Enviar transacciones utilizando efectivo {#submit-transactions-using-cash}

Este método te permite procesar los pagos en efectivo de tus clientes. Para integrarte con las transacciones en efectivo, debes redirigir a tu cliente a la URL que se encuentra en la respuesta; tu cliente ve un de pago como el siguiente.

<img src="/assets/Payments/CashReceiptMX.png" alt="PrintScreen" width="50%">

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response-1}

<details>
<summary><b>Solicitud</b></summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Mostrar solo campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Max:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| `test` (JSON)<hr>`isTest` (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| `merchant` | Objeto |  | Este objeto tiene los datos de autenticación. | Sí |
| `merchant > apiLogin` | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `merchant > apiKey` | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `transaction` | Objeto |  | Este objeto tiene los datos de la transacción. | Sí |
| `transaction > order` | Objeto |  | Este objeto tiene los datos de la orden. | Sí |
| `transaction > order > accountId` | Numérico |  | Identificador de tu cuenta. | Sí |
| `transaction > order > referenceCode` | Alfanumérico | Min:1 Max:255 | Representa el identificador de la orden en tu sistema. | Sí |
| `transaction > order > description` | Alfanumérico | Min:1 Max:255 | Descripción de la orden. | Sí |
| `transaction > order > language` | Alfanumérico | 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí |
| `transaction > order > notifyUrl` | Alfanumérico | Max:2048 | URL de confirmación de la orden. | No |
| `transaction > order > partnerId` | Alfanumérico | Max:255 | ID de aliado dentro de PayU. | No |
| `transaction > order > signature` | Alfanumérico | Max:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| `transaction > order > shippingAddress` | Objeto |  | Dirección de envío. | No |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Max:100 | Línea de dirección 1. | No |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Max:100 | Línea de dirección 2. | No |
| `transaction > order > shippingAddress > city` | Alfanumérico | Max:50 | Ciudad de la dirección. | No |
| `transaction > order > shippingAddress > state` | Alfanumérico | Max:40 | Estado de la dirección. | No |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | País de la dirección. | No |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Max:8 | Código postal de la dirección. | No |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. | No |
| `transaction > order > buyer` | Objeto |  | Información del comprador. | Sí |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Max:100 | Identificador del comprador en tu sistema. | No |
| `transaction > order > buyer > fullName` | Alfanumérico | Max:150 | Nombre del comprador. | Sí |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Max:255 | Correo electrónico del comprador. | Sí |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Max:20 | Teléfono del comprador. | Sí |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Max:20 | Número de identificación del comprador. | Sí |
| `transaction > order > buyer > shippingAddress` | Alfanumérico |  | Dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Max:150 | Línea de dirección 1 del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Max:50 | Ciudad de la dirección del comprador. | Sí | 
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Max:40 | Estado de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| `transaction > order > buyer > shippingAddress > postalCode` | Numérico | Max:20 | Código postal de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > phone` | Numérico | Max:20 | Número de teléfono asociado a la dirección del comprador. | Sí |
| `transaction > order > additionalValues >` | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Monto de la transacción. | Sí |
| `transaction > order > additionalValues > TX_VALUE > value` | Numérico | 12, 2 | Especifica el monto de la transacción, este valor puede tener dos dígitos decimales (Ej. `10000.00` o `10000`). | Sí |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| `transaction > order > additionalValues > TX_TAX` | Alfanumérico | 64 | Monto del impuesto a las ventas. | Sí |
| `transaction > order > additionalValues > TX_TAX > value` | Numérico | 12, 2 | Especifica el monto del impuesto a las ventas.  | No |
| `transaction > order > additionalValues > TX_TAX > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alfanumérico | 64 | Valor base para calcular el impuesto.<br>Si el monto no tiene impuesto, envía 0.<br>Este valor puede tener dos dígitos decimales.  | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Numérico | 12, 2 | Especifica el monto base de la transacción. | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > payer` | Objeto |  | Información del pagador. | Sí |
| `transaction > payer > emailAddress` | Alfanumérico | Max:255 | Correo electrónico del pagador. | Sí |
| `transaction > payer > merchantPayerId` | Alfanumérico | Max:100 | Identificador del pagador en tu sistema. | No |
| `transaction > payer > fullName` | Alfanumérico | Max:150 | Nombre del pagador. | Sí |
| `transaction > payer > billingAddress` | Objeto |  | Dirección de facturación. | Sí |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Max:100 | Línea 1 de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Max:100 | Línea 2 de la dirección de facturación. | No |
| `transaction > payer > billingAddress > city` | Alfanumérico | Max:50 | Ciudad de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > state` | Alfanumérico | Max:40 | Estado de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | Sí |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Max:20 | Código postal de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. | No |
| `transaction > payer > birthdate` | Alfanumérico | Max:10 | Fecha de nacimiento del pagador. Formato `YYYY-MM-DD`. | Sí |
| `transaction > payer > contactPhone` | Alfanumérico | Max:20 | Número de teléfono del pagador. | Sí |
| `transaction > payer > dniNumber` | Alfanumérico | Max:20 | Número de identificación del pagador. | Sí |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver los tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| `transaction > type` | Alfanumérico | 32 | Como los pagos en efectivo se realizan en oficinas físicas, el único tipo de transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sí |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecciona un método de pago en efectivo válido. [Ver los métodos de pago disponibles para México]({{< ref "select-your-payment-method.html#mexico" >}}). | Sí |
| `transaction > paymentCountry` | Alfanumérico | 2 | Asigna `MX` para México. | Sí |
| `transaction > expirationDate` | Alfanumérico | 23 | Fecha y hora máxima en la que el cliente puede realizar el pago. Formato `YYYY-MM-DDTHH:MM:SS`, por ejemplo `2021-06-12T16:07:11.586`. | No |
| `transaction > ipAddress` | Alfanumérico | Max:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |

</details>

<details>
<summary><b>Respuesta</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| `code` | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| `error` | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| `transactionResponse` | Objeto |  | Datos de la respuesta. |
| `transactionResponse > orderId` | Numérico |  | Identificador generado o existente de la orden en PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | Identificador de la transacción en PayU. |
| `transactionResponse > state` | Alfanumérico | Max:32 | Estado de la transacción. Como el pago se realiza de forma externa, el estado de una transacción exitosa es `PENDING` |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Max:255 | Código de respuesta retornado por la red bancaria. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Max:255 | Mensaje de error retornado por la red bancaria. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Max:32 | Código de trazabilidad retornado por la red bancaria. |
| `transactionResponse > authorizationCode` | Alfanumérico | Max:12 | Código de autorización retornado por la red bancaria. |
| `transactionResponse > pendingReason` | Alfanumérico | Max:21 | Código de la razón asociada con el estado, como se mencionó en `transactionResponse > state`, la transacción está en espera del pagoCódigo de la razón asociada con el estado, como se mencionó en `transactionResponse > state`, la transacción está en espera del pago. |
| `transactionResponse > responseCode` | Alfanumérico | Max:64 | Código de respuesta asociado con el estado. En este caso, para una transacción exitosa es `PENDING_TRANSACTION_CONFIRMATION`. |
| `transactionResponse > responseMessage` | Alfanumérico | Max:2048 | Mensaje asociado al código de respuesta. |
| `transactionResponse > operationDate` | Fecha |  | Fecha de creación de la respuesta en el sistema de PayU. |
| `transactionResponse > extraParameters` | Objeto |  | Parámetros adicionales o datos asociados a la respuesta.<br>En JSON, El parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"REFERENCE": "74794"`<br>`}`<br><br>En XML, El parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>REFERENCE</string>`<br>&emsp;&emsp;`<int>74794</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| `transactionResponse > additionalInfo` | Objeto |  | Información adicional de la respuesta. Este objeto tiene la misma estructura de `transactionResponse.extraParameters`. |

</details>

#### Consideraciones {#considerations-3}

* El parámetro `transaction.expirationDate` no es obligatorio. Si no envías este parámetro, su valor por defecto es siete (7) días luego de la fecha actual.<br>Si envías una fecha posterior a dicho número de días, PayU ignorará este valor y asignará el valor por defecto.
* Cuando el método de pago es `OXXO`, la confirmación del pago será un día después del mismo. Para otros métodos de pago en efectivo, la confirmación es en línea.
* El parámetro `transactionResponse.extraParameters` tiene los siguientes parámetros relacionados con la transacción:
   - **BANK_REFERENCED_CODE**: tipo de pago.
   - **EXPIRATION_DATE**: término máximo que tine el pagador para realizar el pago.
   - **BAR_CODE**: código de barras que le permite al pagador realizar el pago.
   - **REFERENCE**: referencia interna de pago generada por PayU. 
   - **URL_PAYMENT_RECEIPT_HTML**: recibo de pago en formato HTML. Aquí es donde debe redirigir el pago cuando el pagador selecciona un método de pago en efectivo. 
   - **URL_PAYMENT_RECEIPT_PDF**: recibo de pago en formato PDF.
   - **PAYMENT_WAY_ID**: red financiera del tipo de pago.

### Llamado del API {#api-call-1}

Los siguientes son los cuerpos de la petición y la respuesta para este método de pago.

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
         "accountId": "512324",
         "referenceCode": "PRODUCT_TEST_2021-06-22T17:33:42.775Z",
         "description": "payment test",
         "language": "es",
         "signature": "6fd48e7150c652833866799a3fbf87bb",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "MXN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Domingo Diez 1589",
               "street2": "5555487",
               "city": "Cuernavaca",
               "state": "Morelos",
               "country": "MX",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "5555487",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
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
         "birthdate": "1994-06-21",
         "billingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "125544",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
	  "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "SEVEN_ELEVEN",
      "expirationDate": "2021-06-23T21:02:14.593",
      "paymentCountry": "MX",
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
        "orderId": 857806658,
        "transactionId": "c7b15feb-e8e6-4330-a04b-2a4c0cc2b776",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": null,
        "authorizationCode": null,
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": null,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CASH",
            "EXPIRATION_DATE": 1624482134593,
            "BAR_CODE": "00012345678900008578066580000000100000202106238",
            "REFERENCE": 857806658,
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857806658Yc7b15febe8e6433Y2568534adcdf6da",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857806658Yc7b15febe8e6433Y2568534adcdf6da",
            "PAYMENT_WAY_ID": "1"
        },
        "additionalInfo": {
            "paymentNetwork": "SEVEN_ELEVEN",
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
         <accountId>512324</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-22T17:33:42.775Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>6fd48e7150c652833866799a3fbf87bb</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>MXN</currency>
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
               <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <billingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>            
            <city>Cuernavaca</city>
            <state>Morelos</state>               
            <country>MX</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
         <birthdate>1994-06-21</birthdate>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <emailAddress>payer_test@test.com</emailAddress>
         <fullName>First name and second payer name</fullName>
         <merchantPayerId>1</merchantPayerId>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>SEVEN_ELEVEN</paymentMethod>
      <expirationDate>2021-06-23T21:02:14.593</expirationDate>
      <paymentCountry>MX</paymentCountry>
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
        <orderId>857806714</orderId>
        <transactionId>194e0320-2711-49d6-9d58-493dd0a59694</transactionId>
        <state>PENDING</state>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CASH</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-23T16:23:05</date>
            </entry>
            <entry>
                <string>BAR_CODE</string>
                <string>00012345678900008578067140000000100000202106230</string>
            </entry>
            <entry>
                <string>REFERENCE</string>
                <int>857806714</int>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857806714Y194e0320271149dY36e0ad0392e7f5f</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857806714Y194e0320271149dY36e0ad0392e7f5f</string>
            </entry>
            <entry>
                <string>PAYMENT_WAY_ID</string>
                <string>1</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>SEVEN_ELEVEN</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Enviar transacciones utilizando transferencia bancaria {#submit-transactions-using-bank-transfer}

Este método te permite procesar los pagos realizados por tus clientes por medio de transferencia bancaria. Cuando utilices este método de pago, el pagador realiza una transferencia bancaria desde su cuenta a una cuenta CLABE de PayU.<br>
Para integrarte con las transacciones en efectivo, debes redirigir a tu cliente a la URL que se encuentra en la respuesta.

<img src="/assets/Payments/BankTransferReceiptMX.png" alt="PrintScreen" width="50%">

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response-2}

<details>
<summary><b>Solicitud</b></summary>
<label for="table3" class="showMandatory"><input type="checkbox" id="table3" name="table3" value="true" onchange="showMandatory(this)"> Mostrar solo campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Max:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| `test` (JSON)<hr>`isTest` (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| `merchant` | Objeto |  | Este objeto tiene los datos de autenticación. | Sí |
| `merchant > apiLogin` | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `merchant > apiKey` | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `transaction` | Objeto |  | Este objeto tiene los datos de la transacción. | Sí |
| `transaction > order` | Objeto |  | Este objeto tiene los datos de la orden. | Sí |
| `transaction > order > accountId` | Numérico |  | Identificador de tu cuenta. | Sí |
| `transaction > order > referenceCode` | Alfanumérico | Min:1 Max:255 | Representa el identificador de la orden en tu sistema. | Sí |
| `transaction > order > description` | Alfanumérico | Min:1 Max:255 | Descripción de la orden. | Sí |
| `transaction > order > language` | Alfanumérico | 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí |
| `transaction > order > notifyUrl` | Alfanumérico | Max:2048 | URL de confirmación de la orden. | No|
| `transaction > order > partnerId` | Alfanumérico | Max:255 | ID de aliado dentro de PayU. | No |
| `transaction > order > signature` | Alfanumérico | Max:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| `transaction > order > shippingAddress` | Objeto |  | Dirección de envío. | No |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Max:100 | Línea de dirección 1. | No |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Max:100 | Línea de dirección 2. | No |
| `transaction > order > shippingAddress > city` | Alfanumérico | Max:50 | Ciudad de la dirección. | No |
| `transaction > order > shippingAddress > state` | Alfanumérico | Max:40 | Estado de la dirección. | No |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | País de la dirección. | No |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Max:8 | Código postal de la dirección. | No |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. | No |
| `transaction > order > buyer` | Objeto |  | Información del comprador. | Sí |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Max:100 | Identificador del comprador en tu sistema. | No |
| `transaction > order > buyer > fullName` | Alfanumérico | Max:150 | Nombre del comprador. | Sí |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Max:255 | Correo electrónico del comprador. | Sí |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Max:20 | Teléfono del comprador. | Sí |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Max:20 | Número de identificación del comprador. | Sí |
| `transaction > order > buyer > shippingAddress` | Alfanumérico |  | Dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Max:150 | Línea de dirección 1 del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Max:50 | Ciudad de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Max:40 | Estado de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| `transaction > order > buyer > shippingAddress > postalCode` | Numérico | Max:20 | Código postal de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > phone` | Numérico | Max:20 | Número de teléfono asociado a la dirección del comprador. | Sí |
| `transaction > order > additionalValues >` | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Monto de la transacción. | Sí |
| `transaction > order > additionalValues > TX_VALUE > value` | Numérico | 12, 2 | Especifica el monto de la transacción, este valor puede tener dos dígitos decimales (Ej. `10000.00` o `10000`). | Sí |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| `transaction > order > additionalValues > TX_TAX` | Alfanumérico | 64 | Monto del impuesto a las ventas. | Sí |
| `transaction > order > additionalValues > TX_TAX > value` | Numérico | 12, 2 | Especifica el monto del impuesto a las ventas.  | No |
| `transaction > order > additionalValues > TX_TAX > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alfanumérico | 64 | Valor base para calcular el impuesto.<br>Si el monto no tiene impuesto, envía 0.<br>Este valor puede tener dos dígitos decimales.  | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Numérico | 12, 2 | Especifica el monto base de la transacción. | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > payer` | Objeto |  | Información del pagador. | Sí |
| `transaction > payer > emailAddress` | Alfanumérico | Max:255 | Correo electrónico del pagador. | Sí |
| `transaction > payer > merchantPayerId` | Alfanumérico | Max:100 | Identificador del pagador en tu sistema. | No |
| `transaction > payer > fullName` | Alfanumérico | Max:150 | Nombre del pagador. | Sí |
| `transaction > payer > billingAddress` | Objeto |  | Dirección de facturación. | Sí |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Max:100 | Línea 1 de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Max:100 | Línea 2 de la dirección de facturación. | No |
| `transaction > payer > billingAddress > city` | Alfanumérico | Max:50 | Ciudad de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > state` | Alfanumérico | Max:40 | Estado de la dirección de facturación. | No |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | Sí |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Max:20 | Código postal de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. | No |
| `transaction > payer > birthdate` | Alfanumérico | Max:10 | Fecha de nacimiento del pagador. Formato `YYYY-MM-DD`. | Sí |
| `transaction > payer > contactPhone` | Alfanumérico | Max:20 | Número de teléfono del pagador. | Sí |
| `transaction > payer > dniNumber` | Alfanumérico | Max:20 | Número de identificación del pagador. | Sí |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver los tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| `transaction > type` | Alfanumérico | 32 | Como los pagos con transferencia bancaria se realizan en la página web de SPEI, el único tipo de transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sí |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecciona un método de pago por transferencia bancaria válido. [Ver los métodos de pago disponibles para México]({{< ref "select-your-payment-method.html#mexico" >}}). | Sí |
| `transaction > paymentCountry` | Alfanumérico | 2 | Asigna `MX` para México. | Sí |
| `transaction > deviceSessionId` | Alfanumérico | Max:255 | Identificador de la sesión del dispositivo donde el cliente realiza la transacción. Para más información, consulta [este artículo]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| `transaction > ipAddress` | Alfanumérico | Max:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| `transaction > cookie` | Alfanumérico | Max:255 | Cookie almacenada por el dispositivo donde el cliente realiza la transacción. | Sí |
| `transaction > userAgent` | Alfanumérico | Max:1024 | User agent del navegador donde el cliente realiza la transacción. | Sí |

</details>

<details>
<summary><b>Respuesta</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| `code` | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| `error` | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| `transactionResponse` | Objeto |  | Datos de la respuesta. |
| `transactionResponse > orderId` | Numérico |  | Identificador generado o existente de la orden en PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | Identificador de la transacción en PayU. |
| `transactionResponse > state` | Alfanumérico | Max:32 | Estado de la transacción. Como el pago se realiza de forma externa, el estado de una transacción exitosa es `PENDING` |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Max:255 | Código de respuesta retornado por la red bancaria. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Max:255 | Mensaje de error retornado por la red bancaria. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Max:32 | Código de trazabilidad retornado por la red bancaria. |
| `transactionResponse > authorizationCode` | Alfanumérico | Max:12 | Código de autorización retornado por la red bancaria. |
| `transactionResponse > pendingReason` | Alfanumérico | Max:21 | Código de la razón asociada con el estado, como se mencionó en `transactionResponse > state`, la transacción está en espera del pagoCódigo de la razón asociada con el estado, como se mencionó en `transactionResponse > state`, la transacción está en espera del pago. |
| `transactionResponse > responseCode` | Alfanumérico | Max:64 | Código de respuesta asociado con el estado. En este caso, para una transacción exitosa es `PENDING_PAYMENT_IN_ENTITY`. |
| `transactionResponse > responseMessage` | Alfanumérico | Max:2048 | Mensaje asociado al código de respuesta. |
| `transactionResponse > operationDate` | Fecha |  | Fecha de creación de la respuesta en el sistema de PayU. |
| `transactionResponse > extraParameters` | Objeto |  | Parámetros adicionales o datos asociados a la respuesta.<br>En JSON, El parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"SPEI_CLABE_ACCOUNT_NUMBER": "646180132800000009"`<br>`}`<br><br>En XML, El parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>SPEI_CLABE_ACCOUNT_NUMBER</string>`<br>&emsp;&emsp;`<string>646180132800000009</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| `transactionResponse > additionalInfo` | Objeto |  | Información adicional de la respuesta. Este objeto tiene la misma estructura de `transactionResponse.extraParameters`. |

</details>

#### Consideraciones {#considerations-4}

* El parámetro `transaction.expirationDate` no es obligatorio. Si no envías este parámetro, su valor por defecto es siete (7) días luego de la fecha actual.<br>Si envías una fecha posterior a dicho número de días, PayU ignorará este valor y asignará el valor por defecto.
* Cuando el pagador selecciona este método de pago, PayU crea una orden en estado _in progress_ y una transacción en estado pendiente (`PENDING`).
* Para realizar el pago, el pagador debe iniciar sesión en la sucursal virtual de su banco (el banco debe aparecer en la lista de bancos disponibles de SPEI).<br>Primero, el pagador debe registrar la cuenta CLABE de PayU en la sucursal de su banco. Una vez la cuenta CLABE esté activa para realizar transferencias, el pagador debe ingresar en su sucursal virtual, la referencia retornada por PayU en el parámetro `trazabilityCode` y el monto tal y como PayU lo retornó.
* En el cuerpo de la respuesta, puedes encontrar las variables para generar el recibo de pago (voucher) y la URL del mismo generado en formato HTML y PDF. Si quieres generar el voucher, utiliza las siguientes variables:
  - **trazabilityCode**: identificador único de máximo 7 dígitos; corresponde a la referencia de pago que debe ingresar el pagador en la sucursal virtual. Es obligatorio ingresar el mismo valor en el campo referencia de la sucursal virtual para que el pago sea exitoso.
  - **value**: el pagador debe ingresar como monto de la transferencia el mismo valor informado en la solicitud, para que el pago sea exitoso.
  - **SPEI_CLABE_ACCOUNT_NUMBER**: es la CLABE interbancaria de PayU, es decir, la cuenta donde se transfiere el monto. El pagador debe registrar esta CLABE como beneficiario en la sucursal de su banco antes de realizar la transferencia.
  - **SPEI_BANK_NAME**: nombre del banco asociado a la cuenta CLABE de PayU. La cuenta beneficiaria está asociada al banco STP y para PayU siempre es el mismo banco.

### Llamado a la API {#api-call-2}

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
         "accountId": "512324",
         "referenceCode": "PRODUCT_TEST_2021-06-22T17:33:42.775Z",
         "description": "payment test",
         "language": "es",
         "signature": "6fd48e7150c652833866799a3fbf87bb",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "MXN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Domingo Diez 1589",
               "street2": "5555487",
               "city": "Cuernavaca",
               "state": "Morelos",
               "country": "MX",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "5555487",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
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
         "birthdate": "1994-06-21",
         "billingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "125544",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "SPEI",
      "expirationDate": "2021-06-23T22:30:21.231",
      "paymentCountry": "MX",
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
        "orderId": 1400447116,
        "transactionId": "16d49526-8d29-4bec-8c56-478491ddb327",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "25914",
        "authorizationCode": null,
        "pendingReason": "AWAITING_PAYMENT_IN_ENTITY",
        "responseCode": "PENDING_PAYMENT_IN_ENTITY",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624383022721,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "ELECTRONIC_PAYMENT",
            "EXPIRATION_DATE": "2021-06-23 23:59:59",
            "SPEI_BANK_NAME": "STP",
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=1400447116Y16d495268d294beY2063d953fc5dab2",
            "SPEI_CLABE_ACCOUNT_NUMBER": "646180132800000009",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app/V2?vid=1400447116Y16d495268d294beY2063d953fc5dab2",
            "PAYMENT_WAY_ID": "3"
        },
        "additionalInfo": {
            "paymentNetwork": "STP",
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
         <accountId>512324</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-22T17:33:42.775Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>6fd48e7150c652833866799a3fbf87bb</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>MXN</currency>
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
               <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <billingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>            
            <city>Cuernavaca</city>
            <state>Morelos</state>               
            <country>MX</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
         <birthdate>1994-06-21</birthdate>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <emailAddress>payer_test@test.com</emailAddress>
         <fullName>First name and second payer name</fullName>
         <merchantPayerId>1</merchantPayerId>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>SPEI</paymentMethod>
      <expirationDate>2021-06-23T22:30:21.231</expirationDate>
      <paymentCountry>MX</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e</deviceSessionId>
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
        <orderId>1400447132</orderId>
        <transactionId>62a8e1e4-3787-494b-93ca-a8ddb658a754</transactionId>
        <state>PENDING</state>
        <trazabilityCode>25915</trazabilityCode>
        <pendingReason>AWAITING_PAYMENT_IN_ENTITY</pendingReason>
        <responseCode>PENDING_PAYMENT_IN_ENTITY</responseCode>
        <operationDate>2021-06-22T12:39:50</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>ELECTRONIC_PAYMENT</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <string>2021-06-23 23:59:59</string>
            </entry>
            <entry>
                <string>SPEI_BANK_NAME</string>
                <string>STP</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=1400447132Y62a8e1e43787494Yef7e6cd39d91243</string>
            </entry>
            <entry>
                <string>SPEI_CLABE_ACCOUNT_NUMBER</string>
                <string>646180132800000009</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app/V2?vid=1400447132Y62a8e1e43787494Yef7e6cd39d91243</string>
            </entry>
            <entry>
                <string>PAYMENT_WAY_ID</string>
                <string>3</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>STP</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Enviar transacciones utilizando referencia bancaria {#submit-transactions-using-bank-reference}

Este método te permite procesar los pagos realizados por tus clientes por medio de referencia bancaria. Para integrarte con las transacciones con referencia bancaria, debes redirigir a tu cliente a la URL que se encuentra en la respuesta.

<img src="/assets/Payments/BankReferenceReceiptMX.png" alt="PrintScreen" width="50%">

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response-3}

<details>
<summary><b>Solicitud</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Max:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| `test` (JSON)<hr>`isTest` (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| `merchant` | Objeto |  | Este objeto tiene los datos de autenticación. | Sí |
| `merchant > apiLogin` | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `merchant > apiKey` | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `transaction` | Objeto |  | Este objeto tiene los datos de la transacción. | Sí |
| `transaction > order` | Objeto |  | Este objeto tiene los datos de la orden. | Sí |
| `transaction > order > accountId` | Numérico |  | Identificador de tu cuenta. | Sí |
| `transaction > order > referenceCode` | Alfanumérico | Min:1 Max:255 | Representa el identificador de la orden en tu sistema. | Sí |
| `transaction > order > description` | Alfanumérico | Min:1 Max:255 | Descripción de la orden. | Sí |
| `transaction > order > language` | Alfanumérico | 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí |
| `transaction > order > notifyUrl` | Alfanumérico | Max:2048 | URL de confirmación de la orden. | No|
| `transaction > order > partnerId` | Alfanumérico | Max:255 | ID de aliado dentro de PayU. | No |
| `transaction > order > signature` | Alfanumérico | Max:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| `transaction > order > shippingAddress` | Objeto |  | Dirección de envío. | No |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Max:100 | Línea de dirección 1. | No |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Max:100 | Línea de dirección 2. | No |
| `transaction > order > shippingAddress > city` | Alfanumérico | Max:50 | Ciudad de la dirección. | No |
| `transaction > order > shippingAddress > state` | Alfanumérico | Max:40 | Estado de la dirección. | No |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | País de la dirección. | No |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Max:8 | Código postal de la dirección. | No |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. | No |
| `transaction > order > buyer` | Objeto |  | Información del comprador. | Sí |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Max:100 | Identificador del comprador en tu sistema. | No |
| `transaction > order > buyer > fullName` | Alfanumérico | Max:150 | Nombre del comprador. | Sí |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Max:255 | Correo electrónico del comprador. | Sí |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Max:20 | Teléfono del comprador. | Sí |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Max:20 | Número de identificación del comprador. | Sí |
| `transaction > order > buyer > shippingAddress` | Alfanumérico |  | Dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Max:150 | Línea de dirección 1 del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Max:50 | Ciudad de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Max:40 | Estado de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| `transaction > order > buyer > shippingAddress > postalCode` | Numérico | Max:20 | Código postal de la dirección del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > phone` | Numérico | Max:20 | Número de teléfono asociado a la dirección del comprador. | Sí |
| `transaction > order > additionalValues >` | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Monto de la transacción. | Sí |
| `transaction > order > additionalValues > TX_VALUE > value` | Numérico | 12, 2 | Especifica el monto de la transacción, este valor puede tener dos dígitos decimales (Ej. `10000.00` o `10000`). | Sí |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| `transaction > order > additionalValues > TX_TAX` | Alfanumérico | 64 | Monto del impuesto a las ventas. | Sí |
| `transaction > order > additionalValues > TX_TAX > value` | Numérico | 12, 2 | Especifica el monto del impuesto a las ventas.  | No |
| `transaction > order > additionalValues > TX_TAX > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alfanumérico | 64 | Valor base para calcular el impuesto.<br>Si el monto no tiene impuesto, envía 0.<br>Este valor puede tener dos dígitos decimales.  | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Numérico | 12, 2 | Especifica el monto base de la transacción. | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > payer` | Objeto |  | Información del pagador. | Sí |
| `transaction > payer > emailAddress` | Alfanumérico | Max:255 | Correo electrónico del pagador. | Sí |
| `transaction > payer > merchantPayerId` | Alfanumérico | Max:100 | Identificador del pagador en tu sistema. | No |
| `transaction > payer > fullName` | Alfanumérico | Max:150 | Nombre del pagador. | Sí |
| `transaction > payer > billingAddress` | Objeto |  | Dirección de facturación. | Sí |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Max:100 | Línea 1 de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Max:100 | Línea 2 de la dirección de facturación. | No |
| `transaction > payer > billingAddress > city` | Alfanumérico | Max:50 | Ciudad de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > state` | Alfanumérico | Max:40 | Estado de la dirección de facturación. | No |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | Sí |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Max:20 | Código postal de la dirección de facturación. | Sí |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. | No |
| `transaction > payer > birthdate` | Alfanumérico | Max:10 | Fecha de nacimiento del pagador. Formato `YYYY-MM-DD`. | Sí |
| `transaction > payer > contactPhone` | Alfanumérico | Max:20 | Número de teléfono del pagador. | Sí |
| `transaction > payer > dniNumber` | Alfanumérico | Max:20 | Número de identificación del pagador. | Sí |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver los tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| `transaction > type` | Alfanumérico | 32 | Como los pagos con referencia bancaria se realizan en oficinas físicas, el único tipo de transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sí |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecciona un método de pago por Referencia bancaria válido. [Ver los métodos de pago disponibles para México]({{< ref "select-your-payment-method.html#mexico" >}}). | Sí |
| `transaction > paymentCountry` | Alfanumérico | 2 | Asigna `MX` para México. | Sí |
| `transaction > ipAddress` | Alfanumérico | Max:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
</details>

<details>
<summary><b>Respuesta</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| `code` | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| `error` | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| `transactionResponse` | Objeto |  | Datos de la respuesta. |
| `transactionResponse > orderId` | Numérico |  | Identificador generado o existente de la orden en PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | Identificador de la transacción en PayU. |
| `transactionResponse > state` | Alfanumérico | Max:32 | Estado de la transacción. Como el pago se realiza de forma externa, el estado de una transacción exitosa es `PENDING` |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Max:255 | Código de respuesta retornado por la red bancaria. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Max:255 | Mensaje de error retornado por la red bancaria. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Max:32 | Código de trazabilidad retornado por la red bancaria. |
| `transactionResponse > authorizationCode` | Alfanumérico | Max:12 | Código de autorización retornado por la red bancaria. |
| `transactionResponse > pendingReason` | Alfanumérico | Max:21 | Código de la razón asociada con el estado, como se mencionó en `transactionResponse > state`, la transacción está en espera del pagoCódigo de la razón asociada con el estado, como se mencionó en `transactionResponse > state`, la transacción está en espera del pago. |
| `transactionResponse > responseCode` | Alfanumérico | Max:64 | Código de respuesta asociado con el estado. En este caso, para una transacción exitosa es `PENDING_PAYMENT_IN_ENTITY`. |
| `transactionResponse > responseMessage` | Alfanumérico | Max:2048 | Mensaje asociado al código de respuesta. |
| `transactionResponse > operationDate` | Fecha |  | Fecha de creación de la respuesta en el sistema de PayU. |
| `transactionResponse > extraParameters` | Objeto |  | Parámetros adicionales o datos asociados a la respuesta.<br>En JSON, El parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"SPEI_CLABE_ACCOUNT_NUMBER": "646180132800000009"`<br>`}`<br><br>En XML, El parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>SPEI_CLABE_ACCOUNT_NUMBER</string>`<br>&emsp;&emsp;`<string>646180132800000009</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| `transactionResponse > additionalInfo` | Objeto |  | Información adicional de la respuesta. Este objeto tiene la misma estructura de `transactionResponse.extraParameters`. |

</details>

#### Consideraciones {#considerations-5}

* El parámetro `transaction.expirationDate` no es obligatorio. Si no envías este parámetro, su valor por defecto es siete (7) días luego de la fecha actual.<br>Si envías una fecha posterior a dicho número de días, PayU ignorará este valor y asignará el valor por defecto.
* El parámetro `transactionResponse.extraParameters` tiene los siguientes parámetros relacionados con la transacción:
   - **REFERENCE**: referencia de pago interna generada por PayU.
   - **EXPIRATION_DATE**: fecha máxima en la que el pagador puede realizar el pago.
   - **BAR_CODE**: código de barras que le permite al pagador realizar el pago. 
   - **URL_PAYMENT_RECEIPT_HTML**: recibo de pago en formato HTML. Aquí es donde debe redirigir el pago cuando el pagador selecciona un método de pago con referencia bancaria.
   - **URL_PAYMENT_RECEIPT_PDF**: recibo de pago en formato PDF.

### Llamado a la API {#api-call-3}

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
         "accountId": "512324",
         "referenceCode": "PRODUCT_TEST_2021-06-22T17:33:42.775Z",
         "description": "payment test",
         "language": "es",
         "signature": "6fd48e7150c652833866799a3fbf87bb",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "MXN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Domingo Diez 1589",
               "street2": "5555487",
               "city": "Cuernavaca",
               "state": "Morelos",
               "country": "MX",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "5555487",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
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
         "birthdate": "1994-06-21",
         "billingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "125544",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
	  "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "BANK_REFERENCED",
      "expirationDate": "2021-06-23T22:46:20.551",
      "paymentCountry": "MX",
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
        "orderId": 857807112,
        "transactionId": "6f8b46f4-9c4c-4523-9d80-ab51c684a44d",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": null,
        "authorizationCode": null,
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": null,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "REFERENCE": 857807112,
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857807112Y6f8b46f49c4c452Y6a8c3d9204ae7c3",
            "EXPIRATION_DATE": 1624488380551,
            "BAR_CODE": "85780711227811246",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857807112Y6f8b46f49c4c452Y6a8c3d9204ae7c3"
        },
        "additionalInfo": {
            "paymentNetwork": "BANCOMER",
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
         <accountId>512324</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-22T17:33:42.775Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>6fd48e7150c652833866799a3fbf87bb</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>MXN</currency>
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
               <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <billingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>            
            <city>Cuernavaca</city>
            <state>Morelos</state>               
            <country>MX</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
         <birthdate>1994-06-21</birthdate>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <emailAddress>payer_test@test.com</emailAddress>
         <fullName>First name and second payer name</fullName>
         <merchantPayerId>1</merchantPayerId>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>BANK_REFERENCED</paymentMethod>
      <expirationDate>2021-06-23T22:46:20.551</expirationDate>
      <paymentCountry>MX</paymentCountry>
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
        <orderId>857807162</orderId>
        <transactionId>2b7547fd-a6e8-4bcc-8f82-883775d85380</transactionId>
        <state>PENDING</state>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <extraParameters>
            <entry>
                <string>REFERENCE</string>
                <int>857807162</int>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857807162Y2b7547fda6e84bcYa83c5dd72117110</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-23T17:54:58</date>
            </entry>
            <entry>
                <string>BAR_CODE</string>
                <string>85780716227811234</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857807162Y2b7547fda6e84bcYa83c5dd72117110</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>BANCOMER</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
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
| `transaction > pnr > id` | Alfanumérico | 32 | ID del registro de nombre del pasajero (PNR). | `PNR123456` |
| `transaction > pnr > reservationAgent > id` | Alfanumérico | 32 | ID del agente de reservas. | `AGENT123` |
| `transaction > pnr > reservationAgent > firstName` | Alfanumérico | 255 | Nombre(s) del agente de reservas. | `John` |
| `transaction > pnr > reservationAgent > lastName` | Alfanumérico | 255 | Apellido(s) del agente de reservas. | `Doe` |
| `transaction > pnr > reservationAgent > email` | Alfanumérico | 255 | Correo electrónico del agente de reservas. | `agent@example.com` |
| `transaction > pnr > reservationAgent > officePhoneNumber` | Alfanumérico | 50 | Teléfono de oficina del agente de reservas.| `+573001234567` |
| `transaction > pnr > reservationOffice > id` | Alfanumérico | 9 | ID de la oficina de reservas.| `OFFICE123`|
| `transaction > pnr > reservationOffice > country` | Alfanumérico | 2 | País de la oficina de reservas (Código ISO). | `CO` |
| `transaction > pnr > saleOffice > id` | Alfanumérico | 9 | ID de la oficina de ventas. | `SALEOFF123`                |
| `transaction > pnr > saleOffice > country` | Alfanumérico | 2 | País de la oficina de ventas (Código ISO). | `US` |
| `transaction > pnr > passengers[] > id` | Alfanumérico | 32 | ID del pasajero. | `PASS12345` |
| `transaction > pnr > passengers[] > country` | Alfanumérico | 2 | País del pasajero (Código ISO). | `AR`                        |
| `transaction > pnr > passengers[] > level` | Alfanumérico | 32 | Nivel del pasajero. | `GOLD`                      |
| `transaction > pnr > passengers[] > firstName` | Alfanumérico | 255 | Nombre(s) del pasajero. | `Maria`                     |
| `transaction > pnr > passengers[] > lastName` | Alfanumérico | 255 | Apellido(s) del pasajero. | `Gonzalez` |
| `transaction > pnr > passengers[] > documentType` | Numérico | 2 | Tipo de documento. Los valores posibles son:<br>`0` = No especificado<br>`1` = Cédula de ciudadanía<br>`2` = Cédula de extranjería<br>`3` = Número de identificación tributaria<br>`4` = Tarjeta de identidad<br>`5` = Pasaporte<br>`6` = Tarjeta de seguridad social<br>`7` = Sociedad extranjera sin NIT<br>`8` = Fideicomiso<br>`9` = Registro civil<br>`10` = Carnet diplomático | `5` |
| `transaction > pnr > passengers[] > documentNumber` | Alfanumérico | 50 | Número de documento del pasajero. | `P12345678` |
| `transaction > pnr > passengers[] > email` | Alfanumérico | 255 | Dirección de correo electrónico del pasajero. | `passenger@example.com` |
| `transaction > pnr > passengers[] > officePhoneNumber` | Alfanumérico | 50 | Teléfono de oficina del pasajero. | `+573008765432`             |
| `transaction > pnr > passengers[] > homePhoneNumber` | Alfanumérico | 50 | Teléfono de casa del pasajero. | `+573002345678`             |
| `transaction > pnr > passengers[] > mobilePhoneNumber` | Alfanumérico | 50 | Teléfono móvil del pasajero. | `+573001234567` |
| `transaction > pnr > passengers[] > address > country` | Alfanumérico | 2 | País de la dirección del pasajero (Código ISO). | `BR` |
| `transaction > pnr > passengers[] > address > city` | Alfanumérico | 65 | Ciudad de la dirección del pasajero. | `São Paulo` |
| `transaction > pnr > passengers[] > address > street` | Alfanumérico | 255 | Dirección (calle) del pasajero. | `Rua das Flores, 123` |
| `transaction > pnr > itinerary[] > departureDate` | Alfanumérico | 19 | Fecha de salida en formato UTC. | `2022-01-01T23:59:59` |
| `transaction > pnr > itinerary[] > arrivalDate` | Alfanumérico | 19 | Fecha de llegada en formato UTC. | `2022-01-02T23:59:59` |
| `transaction > pnr > itinerary[] > flightNumber` | Alfanumérico | 12 | Número de vuelo. | `FL1234` |
| `transaction > pnr > itinerary[] > origin` | Alfanumérico | 8 | Origen. | `BOG` |
| `transaction > pnr > itinerary[] > destination` | Alfanumérico | 8 | Destino. | `MIA` |
| `transaction > pnr > itinerary[] > travelClass` | Alfanumérico | 2 | Clase de viaje en el segmento de reserva. | `Y` |
| `transaction > pnr > itinerary[] > ticketType` | Alfanumérico | 50 | Tipo de boleto. | `E-TICKET` |

</details>

{{% alert title="Nota" color="info"%}}

Al usar el formato XML, los parámetros del itinerario aparecen bajo `transaction > pnr > itinerary > segment` con la misma estructura pero ajustados en anidamiento.

{{% /alert %}}

#### Llamado a la API {#api-call-4}

A continuación, se presentan ejemplos de una solicitud para este método.

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}
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

Este método retorna la lista de los métodos de pago disponibles en todos los países.

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response-4}

<details>
<summary><b>Solicitud</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio | 
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Max:32 | Asigna `GET_PAYMENT_METHODS`. | Sí |
| `test` (JSON)<hr>`isTest` (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| `merchant` | Objeto |  | Este objeto tiene los datos de autenticación. | Sí |
| `merchant > apiLogin` | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `merchant > apiKey` | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |

</details>

<details>
<summary><b>Respuesta</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| `code` | Alfanumérico |  | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. | Sí |
| `error` | Alfanumérico | Max:2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. | Sí |
| `paymentMethods` | Objeto |  | Lista de los métodos de pago. | Sí |
| `paymentMethods > paymentMethodComplete` | Objeto |  | Este objeto tiene la información de un método de pago. | Sí |
| `paymentMethods > paymentMethodComplete > id` | Numérico |  | Identificador del método de pago. | Sí |
| `paymentMethods > paymentMethodComplete > description` | Alfanumérico | Max:32 | Nombre del método de pago. | Sí |
| `paymentMethods > paymentMethodComplete > country` | Alfanumérico | 2 | Código ISO del país del método de pago. | Sí |

</details>

### Llamado a la API {#api-call-5}

Los siguientes son los cuerpos de la petición y la respuesta para este método. Para el propósito de este ejemplo, la respuesta muestra dos métodos de pago.  

{{< tabs tabTotal="2" tabID="10" tabName1="JSON" tabName2="XML" >}}
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
            "id": "299",
            "description": "OTHERS_CASH_MX",
            "country": "MX",
            "enabled": true,
            "reason": null
        },
        {
            "id": "139",
            "description": "AMEX",
            "country": "MX",
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
            <id>299</id>
            <description>OTHERS_CASH_MX</description>
            <country>MX</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>139</id>
            <description>AMEX</description>
            <country>MX</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
    </paymentMethods>
</paymentMethodsResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Ping

El método `PING` te permite verificar la conexión con nuestra plataforma.

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response-5}

<details>
<summary><b>Solicitud</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Max:32 | Asigna `PING`. | Sí |
| `test` (JSON)<hr>`isTest` (XML) | Booleano |  | Asigna `true` si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| `merchant` | Objeto |  | Este objeto tiene los datos de autenticación. | Sí |
| `merchant > apiLogin` | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `merchant > apiKey` | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |

</details>

<details>
<summary><b>Respuesta</b></summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|-|-|-|-|
| `code` | Alfanumérico |  | Código de respuesta de la transacción. |
| `error` | Alfanumérico | Max:2048 | Mensaje de error asociado si ocurrió un error. |
| `transactionResponse` | Objeto | Max:2048 | La respuesta del método PING si ocurrió un error. |
</details>

### Llamado a la API {#api-call-6}

Los siguientes son los cuerpos de la petición y la respuesta para este método.

{{< tabs tabTotal="2" tabID="11" tabName1="JSON" tabName2="XML" >}}
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
