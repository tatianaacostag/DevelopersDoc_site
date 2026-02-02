---
title: "Network Tokenization"
linkTitle: "Network Tokenization"
date: 2021-03-26T09:34:59-05:00
description: >
  Esta sección explica qué es Network Tokenization (Tokenización de Red), todos los beneficios que puede aportar a su comercio y un paso a paso sencillo para añadirlo a su negocio.
weight: 70
---

## ¿Qué es la solución PayU Network Token?

Network Tokenization procesa pagos con tarjeta reemplazando los datos de la tarjeta con un token emitido por la red; esto conduce a mayores tasas de aprobación y a una información más segura de los datos sensibles del cliente. La tokenización proporciona una capa adicional de seguridad al sustituir la información de pago sensible por un token único, reduciendo así el riesgo de brechas de datos y mejorando la experiencia del cliente.

**Ofrecemos Network Tokenization utilizando un modelo pass-through.** Esta solución está disponible para tarjetas Visa y Mastercard, específicamente en Brasil, Argentina y Colombia.

Para utilizar la función de Tokenización, es necesario habilitarla en su cuenta de PayU. Para ello, contacte a su representante de ventas o, si no tiene uno, envíe un correo electrónico a:

![](/assets/BanderasPaises/Argentina.png) comercios.ar@payu.com   

![](/assets/BanderasPaises/Brazil.png) comercios.br@payu.com

![](/assets/BanderasPaises/Colombia.jpg) comercios.co@payu.com


{{% alert title="Nota" color="info"%}}
En un modelo pass-through, el comercio debe tokenizar la tarjeta de pago en primer lugar con un proveedor externo solicitante de tokens (token requestor). Después de hacerlo, el comercio podrá transaccionar utilizando el token generado previamente, como se explica en la sección **¿Cómo funciona Network Tokenization?** de esta página.
{{% /alert %}}


### Beneficios para su negocio

* **Mejora en las tasas de aprobación:** El proceso de autorización se vuelve más eficiente ya que la información del token requerida es fácilmente accesible para las franquicias Mastercard y Visa, lo que resulta en mejores tasas de conversión.
* **Seguridad mejorada:** La tokenización añade una capa adicional de seguridad al reemplazar la información de pago sensible con un token único, reduciendo así el riesgo de filtración de datos.
* **Mejor experiencia del cliente:** Al proporcionar transacciones tokenizadas, los clientes pueden disfrutar de una experiencia de pago fluida y segura, mejorando así su confianza y satisfacción.
* **Aumento de opciones de pago:** La tokenización facilita la aceptación de múltiples métodos de pago a través del adquirente, ampliando así las opciones disponibles para los clientes.
* **Cumplimiento de los estándares de la industria:** La implementación de la tokenización se alinea con las mejores prácticas de la industria y los requisitos regulatorios, garantizando el cumplimiento de los estándares de seguridad de datos.
* **No hay cargos adicionales.**


## Cómo funciona Network Tokenization

![](/assets/NetworkTokenization/Flow.png)


## Requisitos para usar Network Tokens
PayU admite pagos con su tarjeta tokenizada para permitirle realizar pagos de forma regular con una tarjeta almacenada en un token. Un token de tarjeta de crédito sustituye la información sensible de una tarjeta de crédito y le permite almacenarla de forma segura siguiendo los estándares de seguridad PCI DSS (Payment Card Industry Data Security Standard).

PayU puede procesar pagos con los siguientes servicios:

* **MasterCard Digital Enablement Service - MDES**.<br>Servicio de tokenización proporcionado por Mastercard. Este servicio le permite tokenizar el Número de Cuenta Principal (PAN) de las tarjetas de crédito MasterCard para utilizarlas en pagos regulares o para crear funciones de pago con un solo clic.<br>Para más información, consulte [MasterCard Digital Enablement Service (MDES)](https://developer.mastercard.com/mdes-digital-enablement/documentation/).

* **Visa Token Service - VTS**.<br>Servicio de tokenización proporcionado por Visa. Este servicio le permite almacenar la información sensible de las tarjetas de crédito Visa en un token para utilizarlas en pagos regulares o para crear funciones de pago con un solo clic.<br>Para más información, consulte [Visa Token Service (VTS)](https://usa.visa.com/products/visa-token-service.html).

#### Pagar con tokens MDES o VTS
Si está tokenizando las tarjetas de crédito de sus clientes utilizando MDES o VTS, puede configurar la información del token en el parámetro `transaction.networkToken` reemplazando la información de la tarjeta de crédito y enviar el parámetro `creditCard.processWithoutCvv2` como true.<br>Por defecto, el procesamiento de tarjetas de crédito sin código de seguridad no está habilitado; contacte a su representante de ventas para habilitarlo.

El siguiente ejemplo muestra el cuerpo de la solicitud a alto nivel para un flujo de un solo paso; no se proporcionan los detalles de la solicitud.

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
         "Information of the order":""
      },
      "payer": {
         "Information of the payer":""
      },
      "networkToken": {
          "tokenPan": "4097440000000004",
          "cryptogram": "11223344556677889900112233445566778899",
          "expiry": "2028/01"
      },
      "extraParameters": {        
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
         <!-- Information of the order -->
      </order>
      <payer>
         <!-- Information of the payer -->
      </payer>
      <networkToken>
         <tokenPan>4097440000000004</tokenPan>
         <cryptogram>11223344556677889900112233445566778899</cryptogram>
         <expiry>2028/01</expiry>
      </networkToken>
      <extraParameters>
         <!-- Extra parameters of the request -->
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

Encuentre la descripción del objeto `transaction.networkToken` y sus parámetros en la sección [Variables]({{< ref "#variables-for-request-and-response" >}}).

### Parámetros para Petición y Respuesta

<details>
<summary>Petición (Request)</summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Mostrar campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado en la petición; este idioma se usa para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| `command` | Alfanumérico | Max:32 | Definir como `SUBMIT_TRANSACTION`. | Sí |
| `test` (JSON)<hr>`isTest` (XML) | Booleano |  | Definir como `true` si la petición es en modo de prueba. De lo contrario, definir como `false`. | Sí |
| `merchant` |  |  | Este objeto contiene los datos de autenticación. | Sí |
| `merchant > apiLogin` | Alfanumérico | Min:12 Max:32 | Usuario o login proporcionado por PayU. [¿Cómo obtengo mi API Login?]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `merchant > apiKey ` | Alfanumérico | Min:6 Max:32 | Contraseña proporcionada por PayU. [¿Cómo obtengo mi API Key?]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| `transaction` |  |  | Este objeto contiene los datos de la transacción. | Sí |
| `transaction > order` |  |  | Este objeto contiene los datos del pedido (order). | Sí |
| `transaction > order > accountId` | Número |  | Identificador de su cuenta. | Sí |
| `transaction > order > referenceCode` | Alfanumérico | Min:1 Max:255 | Representa el identificador del pedido en su sistema. | Sí |
| `transaction > order > description` | Alfanumérico | Min:1 Max:255 | Descripción del pedido. | Sí |
| `transaction > order > language` | Alfanumérico | 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí |
| `transaction > order > notifyUrl` | Alfanumérico | Max:2048 | URL de confirmación del pedido. | No |
| `transaction > order > partnerId` | Alfanumérico | Max:255 | ID del socio (Partner ID) en PayU. | No |
| `transaction > order > signature` | Alfanumérico | Max:255 | La firma asociada al formulario. Para más información, consulte [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| `transaction > order > shippingAddress` |  |  | Dirección de envío. | No |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Max:100 | Línea de dirección 1. | No |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Max:100 | Línea de dirección 2. | No |
| `transaction > order > shippingAddress > city` | Alfanumérico | Max:50 | Ciudad de la dirección. | No |
| `transaction > order > shippingAddress > state` | Alfanumérico | Max:40 | Estado/Provincia de la dirección. Para Brasil, envíe solo dos caracteres (ej. `SP` para São Paulo). | No |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | País de la dirección. | No |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Max:8 | Código postal. Para Brasil, use el formato `XXXXX-XXX` o `XXXXXXXX`. Ejemplo: `09210-710` o `09210710`. | No |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. Para Brasil, use el formato `ddd(2)+número(7-9)`. Ejemplo: `(11)756312633`. | No |
| `transaction > order > buyer` |  |  | Información del comprador. | Sí |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Max:100 | ID del comprador en su sistema. | No |
| `transaction > order > buyer > fullName` | Alfanumérico | Max:150 | Nombre completo del comprador. | Sí |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Max:255 | Correo electrónico del comprador. | Sí |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Max:20 | Número de teléfono del comprador. | Sí |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Max:20 | Número de identificación del comprador. Debe usar un algoritmo para validar el CPF y enviarse con el formato `XXX.XXX.XXX-XX`. Ejemplo: `811.807.405-64`. | Sí |
| `transaction > order > buyer > cnpj` | Alfanumérico | Max:14 | Número de identificación del comprador (Persona Jurídica en Brasil). Debe usar un algoritmo para validar el CNPJ y enviarse con el formato `XXXXXXXXXXXXXX`. Ejemplo: `32593371000110`. | Sí |
| `transaction > order > buyer > shippingAddress` | Alfanumérico |  | Dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Max:150 | Línea 1 de la dirección de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Max:50 | Ciudad de envío del comprador. | Sí |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Max:40 | Estado de envío del comprador. Para Brasil, envíe solo dos caracteres (ej. `SP` para São Paulo). | Sí |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País de envío del comprador en formato ISO 3166 alpha-2. | Sí |
| `transaction > order > buyer > shippingAddress > postalCode` | Número | Max:20 | Código postal de envío del comprador. Para Brasil, use el formato `XXXXX-XXX` o `XXXXXXXX`. Ejemplo: `09210-710` o `09210710`. | Sí |
| `transaction > order > buyer > shippingAddress > phone` | Número | Max:20 | Teléfono de envío del comprador. Para Brasil, use el formato `ddd(2)+número(7-9)`. Ejemplo: `(11)756312633`. | Sí |
| `transaction > order > additionalValues` |  | 64 | Monto del pedido o sus valores asociados. | Sí |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Monto de la transacción. | Sí |
| `transaction > order > additionalValues > TX_VALUE > value` | Número | 12, 2 | Especifica el monto de la transacción; puede tener dos dígitos decimales (Ej. `10000.00` o `10000`). | Sí |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| `transaction > order > additionalValues > TX_TAX` | Alfanumérico | 64 | Monto del Impuesto al Valor Agregado (IVA). | Sí |
| `transaction > order > additionalValues > TX_TAX > value` | Número | 12, 2 | Especifica el monto del IVA.  | No |
| `transaction > order > additionalValues > TX_TAX > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alfanumérico | 64 | Valor base para calcular el IVA.<br>Si el monto no tiene IVA, envíe 0.<br>Este valor puede tener dos dígitos decimales.  | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Número | 12, 2 | Especifica el monto base de la transacción. | No |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| `transaction > order > submerchant` |  |  | Información del sub-comercio. Si no envía este parámetro, PayU configura su comercio como sub-comercio. | No |
| `transaction > order > submerchant > id` | Alfanumérico | Max:15 | ID interno del sub-comercio si utiliza uno para identificarlo. | No |
| `transaction > order > submerchant > fullName` | Alfanumérico | Max:150 | Nombre completo del sub-comercio. | No |
| `transaction > order > submerchant > address` |  |  | Dirección del sub-comercio. Los campos `state`, `country` y `postalCode` son obligatorios al enviar este objeto. | No |
| `transaction > order > submerchant > address > street1` | Alfanumérico | Max:100 | Línea de dirección 1. | No |
| `transaction > order > submerchant > address > street2` | Alfanumérico | Max:100 | Línea de dirección 2. | No |
| `transaction > order > submerchant > address > street3` | Alfanumérico | Max:100 | Línea de dirección 3. | No |
| `transaction > order > submerchant > address > city` | Alfanumérico | Max:50 | Ciudad de la dirección. | No |
| `transaction > order > submerchant > address > state` | Alfanumérico | Max:40 | Estado de la dirección. Para Brasil, envíe solo dos caracteres (ej. `SP` para São Paulo). | Sí |
| `transaction > order > submerchant > address > country` | Alfanumérico | 2 | País de la dirección. | Sí |
| `transaction > order > submerchant > address > postalCode` | Alfanumérico | Max:8 | Código postal. Para Brasil, use el formato `XXXXX-XXX` o `XXXXXXXX`. Ejemplo: `09210-710` o `09210710`. | Sí |
| `transaction > order > submerchant > address > phone` | Alfanumérico | Max:11 | Teléfono asociado a la dirección. Para Brasil, use el formato `ddd(2)+número(7-9)`. Ejemplo: `(11)756312633`. | No |
| `transaction > order > submerchant > identification` | Alfanumérico | Max:14 | Número de identificación (Persona Jurídica en Brasil). Debe usar un algoritmo para validar el CNPJ y enviarse con el formato `XXXXXXXXXXXXXX`. Ejemplo: `32593371000110`. | No |
| `transaction > order > submerchant > identificationType` | Alfanumérico | Max:4 | Tipo de identificación del sub-comercio. Los valores posibles son `cnpj` o `cpf`. | No |
| `transaction > creditCardTokenId` |  |  | Incluya este parámetro cuando la transacción se realice mediante una tarjeta tokenizada con la Tokenización de PayU; además, es obligatorio enviar el parámetro `transaction.creditCard.expirationDate`.<br>Para más información, consulte [API de Tokenización]({{< ref "Tokenization-API.md" >}}). | No |
| `transaction > creditCard` |  |  | Información de la tarjeta de crédito. Este objeto y sus parámetros son obligatorios cuando el pago se realiza con una tarjeta de crédito no tokenizada. | No |
| `transaction > creditCard > number` | Alfanumérico | Min:13 Max:20 | Número de la tarjeta de crédito. | No |
| `transaction > creditCard > securityCode` | Alfanumérico | Min:1 Max:4 | Código de seguridad de la tarjeta (CVC2, CVV2, CID). | No |
| `transaction > creditCard > expirationDate` | Alfanumérico | 7 | Fecha de expiración. Formato `YYYY/MM`. Obligatorio cuando se usa una tarjeta tokenizada. | No |
| `transaction > creditCard > name` | Alfanumérico | Min:1 Max:255 | Nombre del titular como aparece en la tarjeta. *Obligatorio solo para transacciones de Google Pay. | No* |
| `transaction > creditCard > processWithoutCvv2` | Booleano | Max:255 | Permite procesar transacciones sin incluir el código de seguridad. Requiere autorización previa de PayU. | No |
| `transaction > payer` |  |  | Información del pagador. | No |
| `transaction > payer > emailAddress` | Alfanumérico | Max:255 | Correo electrónico del pagador. | No |
| `transaction > payer > merchantPayerId` | Alfanumérico | Max:100 | Identificador del pagador en su sistema. | No |
| `transaction > payer > fullName` | Alfanumérico | Max:150 | Nombre del pagador; debe coincidir con el parámetro `transaction.creditCard.name` en pagos con tarjeta. | No |
| `transaction > payer > billingAddress` |  |  | Dirección de facturación. | No |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Max:100 | Línea 1 de la dirección de facturación. | No |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Max:100 | Línea 2 de la dirección de facturación. | No |
| `transaction > payer > billingAddress > city` | Alfanumérico | Max:50 | Ciudad de facturación. | No |
| `transaction > payer > billingAddress > state` | Alfanumérico | Max:40 | Estado de facturación. Para Brasil, envíe solo dos caracteres (ej. `SP` para São Paulo). | No |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País de facturación en formato ISO 3166 Alpha-2. | No |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Max:20 | Código postal de facturación. Para Brasil, use el formato `XXXXX-XXX` o `XXXXXXXX`. Ejemplo: `09210-710` o `09210710`. | No |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Max:20 | Teléfono de facturación. Para Brasil, use el formato `ddd(2)+número(7-9)`. Ejemplo: `(11)756312633`. | No |
| `transaction > payer > birthdate` | Alfanumérico | Max:10 | Fecha de nacimiento del pagador. | No |
| `transaction > payer > contactPhone` | Alfanumérico | Max:20 | Teléfono de contacto del pagador. Para Brasil, use el formato `ddd(2)+número(7-9)`. Ejemplo: `(11)756312633`. | No |
| `transaction > payer > dniNumber` | Alfanumérico | Max:20 | Identificación del comprador. Debe validar el CPF y usar formato `XXX.XXX.XXX-XX`. Ejemplo: `811.807.405-64`. | No |
| `transaction > payer > cnpj` | Alfanumérico | Max:14 | Identificación del comprador (Persona Jurídica en Brasil). Debe validar el CNPJ y usar formato `XXXXXXXXXXXXXX`. Ejemplo: `32593371000110`. | No |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificación. [Ver tipos de documento]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| `transaction > networkToken` |  |  | Información del token. Incluya este parámetro al transaccionar con tarjetas tokenizadas vía VTS o MDES. Para más información, consulte [Pagar con tokens MDES o VTS]({{< ref "#pay-with-mdes-or-vts-tokens" >}}). <br><sup>\*</sup>Al enviar este objeto, todos sus parámetros son obligatorios.| No |
| `transaction > networkToken > tokenPan` | Alfanumérico | Max:32 | Número del token generado por MDES o VTS. | Sí<sup>\*</sup> |
| `transaction > networkToken > cryptogram` | Alfanumérico | Max:28 | Clave única generada por MDES o VTS para desencriptar la información de la tarjeta. | Sí<sup>\*</sup> |
| `transaction > networkToken > expiry` | Alfanumérico | 7 | Fecha de expiración del token. Formato `YYYY/MM`. | Sí<sup>\*</sup> |
| `transaction > digitalWallet` |  |  | Parámetro para transacciones con Billetera Digital. *Al enviar este objeto, todos sus parámetros son obligatorios. | No |
| `transaction > digitalWallet > type` | Alfanumérico | ---- | Definir según la billetera: `GOOGLE_PAY` | Sí* |
| `transaction > digitalWallet > message` | Alfanumérico | ---- | Información del token de Google Pay devuelto por Google. Más información [aquí](#payu-definitions-for-the-api-integration-of-the-payment-method). | Sí* |
| `transaction > type` | Alfanumérico | 32 | Valor según la transacción deseada:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` para flujos de un solo paso.</li></ul> | Sí |
| `transaction > paymentMethod` | Alfanumérico | 32 | Método de pago válido. [Ver métodos disponibles para Brasil]({{< ref "select-your-payment-method.html#Brazil" >}}). | Sí |
| `transaction > paymentCountry` | Alfanumérico | 2 | Definir `BR` para Brasil. | Sí |
| `transaction > deviceSessionId` | Alfanumérico | Max:255 | Identificador de sesión del dispositivo. Ver [este tema]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| `transaction > ipAddress` | Alfanumérico | Max:39 | Dirección IP del dispositivo del cliente. | Sí |
| `transaction > cookie` | Alfanumérico | Max:255 | Cookie almacenada por el dispositivo del cliente. | Sí |
| `transaction > userAgent` | Alfanumérico | Max:1024 | User agent del navegador del cliente. | Sí |
| `transaction > extraParameters` |  |  | Parámetros adicionales. El tamaño máximo del nombre de cada parámetro es 64 caracteres.<br>En JSON: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>En XML: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | No |
| `transaction > extraParameters > CONSENT_TRANSACTION_ID` | Alfanumérico | Max: 255 | Referencia de Pago de Red. Obligatorio para pagos recurrentes posteriores. Use el valor devuelto en la respuesta de la transacción inicial. Ver [Pagos Recurrentes con Network Tokens](#recurring-payments-with-network-tokens) | No* |
| `transaction > termsAndConditionsAcepted` | Booleano | | Aceptación de términos y condiciones. *Solo obligatorio si su cuenta de PayU Brasil está asociada a una cuenta bancaria extranjera. | No* |
| `transaction > threeDomainSecure` |  |  | Objeto con información de 3DS 2.0. | No |
| `transaction > threeDomainSecure > embedded` | Booleano |  | `true` para usar MPI embebido en la autorización. Por defecto es `false`. | No |
| `transaction > threeDomainSecure > eci` | Número | Max:2 | Electronic Commerce Indicator. Valor devuelto por servidores de directorio.<br>Obligatorio si `embedded` es `false` y `xid` está definido. | No |
| `transaction > threeDomainSecure > cavv` | Alfanumérico | Max:28 | Cardholder Authentication Verification Value (Criptograma en Base64). | No |
| `transaction > threeDomainSecure > xid` | Alfanumérico | Max:28 | ID de transacción enviado por el MPI en Base64.<br>Obligatorio si `embedded` es `false` y `eci` está definido. | No |
| `transaction > threeDomainSecure > directoryServerTransactionId` | Alfanumérico | Max:36 | ID de transacción generado por el Directory Server durante la autenticación. | No |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|---|---|---|---|
| `code` | Alfanumérico |  | El código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| `error` | Alfanumérico | Max:2048 | El mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| `transactionResponse` |  |  | Los datos de la respuesta. |
| `transactionResponse > orderId` | Número |  | El ID de pedido generado o existente en PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | El identificador de la transacción en PayU. |
| `transactionResponse > state` | Alfanumérico | Max:32 | El estado de la transacción. |
| `transactionResponse > responseCode` | Alfanumérico | Max:64 | El código de respuesta asociado al estado. |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Max:255 | El código de respuesta devuelto por la red financiera. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Max:255 | El mensaje de error devuelto por la red financiera. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Max:32 | El código de trazabilidad devuelto por la red financiera. |
| `transactionResponse > authorizationCode` | Alfanumérico | Max:12 | El código de autorización devuelto por la red financiera. |
| `transactionResponse > responseMessage` | Alfanumérico | Max:2048 | Mensaje asociado al código de respuesta. |
| `transactionResponse > operationDate` | Fecha |  | Fecha de creación de la respuesta en el sistema de PayU. |
| `transactionResponse > extraParameters` |  |  | Parámetros adicionales o datos asociados a la respuesta. <br>En JSON, el parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>En XML, el parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Consideraciones
* Si su comercio no tiene una entidad local, es obligatorio enviar el CPF (parámetro `transaction.[payer|buyer].dniNumber`) o el CNPJ (parámetro `transaction.[payer|buyer].cnpj`) al utilizar [Autorización]({{< ref "payments-api-brazil.md#authorization" >}}) o [Cobro]({{< ref "payments-api-brazil.md#charge" >}}).
* Si no envía ninguna información para los sub-comercios, PayU configurará su comercio como sub-comercio.
* Para pagos con tokens de tarjeta de crédito generados por PayU, incluya los parámetros `transaction.creditCardTokenId` y `transaction.creditCard.securityCode` (si procesa con código de seguridad) reemplazando la información de la tarjeta de crédito. Para más información, consulte la [API de Tokenización]({{< ref "Tokenization-API.md" >}}).
* Para pagos con tokens de tarjeta de crédito generados mediante MDES o VTS, incluya el objeto `transaction.networkToken` y sus parámetros.
* Por defecto, el procesamiento de tarjetas de crédito sin código de seguridad no está habilitado. Si desea habilitar esta función, contacte a su representante de ventas. Una vez habilitada, envíe en la petición la variable `creditCard.processWithoutCvv2` como true y elimine la variable `creditCard.securityCode`.<br>Tener esta función habilitada es obligatorio al utilizar tokens de tarjeta de crédito generados mediante MDES o VTS.
* El parámetro adicional `CIELO_TID` identifica la transacción; este parámetro es necesario cuando desee procesar anulaciones (voids).
* La variable `transaction.threeDomainSecure` no reemplaza la información de la tarjeta ni ninguno de los campos obligatorios de la transacción. Este objeto es adicional y no obligatorio.
* La variable `transaction.threeDomainSecure` corresponde a un escenario de _Pass Through_ donde el comercio realiza la autenticación por su cuenta.

## Autorización
Utilice este método para realizar el paso de **Autorización** de un flujo de dos pasos. En este paso, usted autoriza el pago, pero el monto no se debita hasta que realice la [captura]({{< ref "payments-api-brazil.md#capture" >}}) de los fondos.<br>A continuación, se presentan los cuerpos de petición (request) y respuesta (response) para este tipo de transacción.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
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
         "accountId": "512327",
         "referenceCode": "PRODUCT_TEST_2021-06-17T19:11:57.179Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "fbc089272288edc52c332395d9566f4c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "BRL"
            }
         },
         "submerchant": {
            "fullName": "ROBSON BATISTA DE OLIVEIRA",
            "address": {
               "street1": "Rua Alsácia",
               "street2": null,
               "street3": null,
               "city": "São Paulo",
               "state": "SP",
               "country": "BR",
               "postalCode": "04630010",
               "phone": null
            },
            "identification": "17126661851",
            "identificationType": "CNPJ"
        },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "811.807.405-64",
            "cnpj": "32593371000110",
            "shippingAddress": {
               "street1": "Quadra QNP 34 Conjunto G 780",
               "street2": "5555487",
               "city": "Manaos",
               "state": "SP",
               "country": "BR",
               "postalCode": "10012545",
               "phone": "(11)756312633"
            }
         },
         "shippingAddress": {
            "street1": "Quadra QNP 34 Conjunto G 780",
            "street2": "5555487",
            "city": "Manaos",
            "state": "SP",
            "country": "BR",
            "postalCode": "10012545",
            "phone": "(11)756312633"
         }
      },
      "creditCard": {
         "number": "5253203387684619",
         "securityCode": "777",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION",
      "paymentMethod": "MASTERCARD",
      "paymentCountry": "BR",
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
   "test": false
}
```
<br>

Ejemplo de una Respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400434770,
        "transactionId": "79de715b-fe77-401e-8b18-241820afb375",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "282856",
        "authorizationCode": "MOCK-CIELO-1623957118463",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1623939118784,
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
         <accountId>512327</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-17T19:11:57.179Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>fbc089272288edc52c332395d9566f4c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>BRL</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <submerchant>
            <address>
               <city>São Paulo</city>
               <country>BR</country>
               <postalCode>04630010</postalCode>
               <state>SP</state>
               <street1>Rua Alsácia</street1>
            </address>
            <fullName>ROBSON BATISTA DE OLIVEIRA</fullName>
            <identification>17126661851</identification>
            <identificationType>cnpj</identificationType>
         </submerchant>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>811.807.405-64</dniNumber>
            <cnpj>32593371000110</cnpj>
            <shippingAddress>
               <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>
               <city>Manaos</city>
               <state>SP</state>
               <country>BR</country>
               <postalCode>10012545</postalCode>
               <phone>(11)756312633</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Quadra QNP 34 Conjunto G 780</street1>
            <street2>5555487</street2>
            <city>Manaos</city>
            <state>SP</state>
            <country>BR</country>
            <postalCode>0000000</postalCode>
            <phone>(11)756312633</phone>
         </shippingAddress>
      </order>
      <creditCard>
         <number>5253203387684619</number>
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
      <paymentMethod>MASTERCARD</paymentMethod>
      <paymentCountry>BR</paymentCountry>
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

Ejemplo de una Respuesta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400434942</orderId>
        <transactionId>1af49d5d-464a-4efb-98db-f7875e3c580b</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>282856</trazabilityCode>
        <authorizationCode>MOCK-CIELO-1623962788239</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <operationDate>2021-06-17T10:46:28</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>CIELO_TID</string>
                <string>1006993069000509C28A</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Captura
Utilice este método para realizar el paso de **Captura** de un flujo de dos pasos. En este paso, usted captura los fondos previamente [Autorizados]({{< ref "payments-api-brazil.md#authorization" >}}) para transferirlos a su cuenta de PayU.

### Consideraciones
Tenga en cuenta las siguientes consideraciones para la captura:
* El tiempo máximo para capturar una transacción aprobada es de siete (7) días. Después de este tiempo, la transacción se cancela.
* Solo los parámetros mostrados en el cuerpo de la petición son obligatorios para invocar una transacción de Captura. Recuerde que los IDs de pedido (order) y de transacción deben corresponder a una transacción actualmente autorizada.

A continuación se presentan los cuerpos de petición (request) y respuesta (response) para este tipo de transacción.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo de una Solicitud:
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
         "id": "1400434770"
      },
      "type": "CAPTURE",
      "parentTransactionId": "79de715b-fe77-401e-8b18-241820afb375"
   },
   "test": false
}
```
<br>

Ejemplo de una Respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400434770,
        "transactionId": "2e753a5e-0eba-4a4c-9778-6880b5f16605",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "6",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "282856",
        "authorizationCode": "BR-456",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624029247864,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "CIELO_TID": "1006993069000509C28A"
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
         <id>1400436982</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>2cb57976-31d1-4563-b014-8047bd1b2b2a</parentTransactionId>
   </transaction>
   <isTest>false</isTest>
</request>

```
<br>

Ejemplo de una Respuesta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400436982</orderId>
        <transactionId>78d4c328-7157-4b50-9fa9-12e019e7df58</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>6</paymentNetworkResponseCode>
        <trazabilityCode>282856</trazabilityCode>
        <authorizationCode>BR-456</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <operationDate>2021-06-18T10:19:01</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>CIELO_TID</string>
                <string>1006993069000509C28A</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Cobro (Charge)
Utilice este método para realizar un flujo de un solo paso, es decir, un cobro. En este proceso, ambos pasos del flujo de dos etapas se combinan en una sola transacción y los fondos se transfieren de la cuenta del cliente a su cuenta de PayU una vez que la transacción ha sido aprobada:

A continuación se presentan los cuerpos de petición (request) y respuesta (response) para este tipo de transacción.

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
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
         "accountId": "512327",
         "referenceCode": "PRODUCT_TEST_2021-06-17T19:11:57.179Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "fbc089272288edc52c332395d9566f4c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "BRL"
            }
         },
         "submerchant": {
            "fullName": "ROBSON BATISTA DE OLIVEIRA",
            "address": {
               "street1": "Rua Alsácia",
               "street2": null,
               "street3": null,
               "city": "São Paulo",
               "state": "SP",
               "country": "BR",
               "postalCode": "04630010",
               "phone": null
            },
            "identification": "17126661851",
            "identificationType": "CNPJ"
        },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "811.807.405-64",
            "cnpj": "32593371000110",
            "shippingAddress": {
               "street1": "Quadra QNP 34 Conjunto G 780",
               "street2": "5555487",
               "city": "Manaos",
               "state": "SP",
               "country": "BR",
               "postalCode": "10012545",
               "phone": "(11)756312633"
            }
         },
         "shippingAddress": {
            "street1": "Quadra QNP 34 Conjunto G 780",
            "street2": "5555487",
            "city": "Manaos",
            "state": "SP",
            "country": "BR",
            "postalCode": "10012545",
            "phone": "(11)756312633"
         }
      },
      "creditCard": {
         "number": "5178151142107990",
         "securityCode": "777",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "MASTERCARD",
      "paymentCountry": "BR",
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
   "test": false
}
```
<br>

Ejemplo de una Respuesta:
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
         <accountId>512327</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-17T19:11:57.179Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>fbc089272288edc52c332395d9566f4c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>BRL</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <submerchant>
            <address>
               <city>São Paulo</city>
               <country>BR</country>
               <postalCode>04630010</postalCode>
               <state>SP</state>
               <street1>Rua Alsácia</street1>
            </address>
            <fullName>ROBSON BATISTA DE OLIVEIRA</fullName>
            <identification>17126661851</identification>
            <identificationType>cnpj</identificationType>
         </submerchant>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>811.807.405-64</dniNumber>
            <cnpj>32593371000110</cnpj>
            <shippingAddress>
               <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>
               <city>Manaos</city>
               <state>SP</state>
               <country>BR</country>
               <postalCode>10012545</postalCode>
               <phone>(11)756312633</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Quadra QNP 34 Conjunto G 780</street1>
            <street2>5555487</street2>
            <city>Manaos</city>
            <state>SP</state>
            <country>BR</country>
            <postalCode>0000000</postalCode>
            <phone>(11)756312633</phone>
         </shippingAddress>
      </order>
      <creditCard>
         <number>5178151142107990</number>
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
      <paymentMethod>MASTERCARD</paymentMethod>
      <paymentCountry>BR</paymentCountry>
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

Ejemplo de una Respuesta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400437005</orderId>
        <transactionId>5d3cea31-c5e5-4105-9359-984edcaede37</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>6</paymentNetworkResponseCode>
        <trazabilityCode>282856</trazabilityCode>
        <authorizationCode>MOCK-CIELO-1624047952405</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <operationDate>2021-06-18T10:25:52</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>CIELO_TID</string>
                <string>1006993069000509C28A</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Pagos Recurrentes con Network Tokens (Argentina)

PayU admite modelos de facturación recurrente (suscripciones o recargas automáticas) utilizando Network Tokens. Este proceso vincula una secuencia de transacciones a través de una referencia de red única, lo que garantiza mayores tasas de aprobación para cargos automáticos y reduce la necesidad de criptogramas de seguridad repetidos tras la configuración inicial.

{{% alert title="Importante" color="warning"%}}

Los pagos recurrentes con Network Tokens solo están disponibles en Argentina.

{{% /alert %}}

### 1. Autorización Inicial (Inicio de la Recurrencia)

Para iniciar un ciclo recurrente, debe procesar una transacción inicial utilizando el Network Token y su criptograma correspondiente (TAVV/CAVV).

* **Solicitud (Request):** Incluya `networkToken.tokenPan`, `networkToken.cryptogram` y `networkToken.expiry`.

* **Respuesta (Response):** PayU devolverá un `CONSENT_TRANSACTION_ID` dentro del objeto `extraParameters`. **Debe almacenar este valor** en su base de datos, ya que sirve como la Referencia de Pago de Red para todos los cargos futuros en esta suscripción.

### 2. Autorizaciones Posteriores (Cargos Recurrentes)

Para todos los pagos futuros en el mismo ciclo de suscripción, no es necesario generar un nuevo criptograma.

* **Solicitud (Request):** Incluya `networkToken.tokenPan` y `networkToken.expiry`. **No envíe el parámetro del criptograma**.

* **Parámetro Adicional:** Debe incluir el `CONSENT_TRANSACTION_ID` dentro del objeto `extraParameters`, utilizando el valor almacenado de la transacción inicial. Asegúrese de que `creditCard.processWithoutCvv2` esté configurado como `true` en su petición (esto requiere activación previa a través de su representante de ventas).

### Ejemplos de Solicitud para Pagos Recurrentes

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Solicitud Inicial Request (Incluye `cryptogram`):
```JSON
"networkToken": {
    "tokenPan": "4097440000000004",
    "cryptogram": "11223344556677889900112233445566778899",
    "expiry": "2028/01"
}
```
<br>

Solicitud Posterior (Incluye `CONSENT_TRANSACTION_ID`)
```JSON
"transaction": {
    "networkToken": {
        "tokenPan": "4097440000000004",
        "expiry": "2028/01"
    },
    "extraParameters": {
        "CONSENT_TRANSACTION_ID": "1006993069000509C28A"
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Solicitud Inicial (Incluye `cryptogram`):
```XML
<networkToken>
    <tokenPan>4097440000000004</tokenPan>
    <cryptogram>11223344556677889900112233445566778899</cryptogram>
    <expiry>2028/01</expiry>
</networkToken>
```
<br>

Solicitud Posterior (Incluye `CONSENT_TRANSACTION_ID`)
```XML
<transaction>
   ...
   <networkToken>
       <tokenPan>4097440000000004</tokenPan>
       <expiry>2028/01</expiry>
       </networkToken>
   <extraParameters>
       <entry>
           <string>CONSENT_TRANSACTION_ID</string>
           <string>1006993069000509C28A</string>
       </entry>
   </extraParameters>
   ...
</transaction>
```
{{< /tab >}}
{{< /tabs >}}

## ¿Qué sigue?

1. Contacte a su representante de ventas.
2. Actualice su código de integración. Tenga en cuenta que esta funcionalidad solo es compatible a través de la **integración vía API**.
3. Pruebe la funcionalidad y pase a producción.

¡Todo lo demás permanece igual!

