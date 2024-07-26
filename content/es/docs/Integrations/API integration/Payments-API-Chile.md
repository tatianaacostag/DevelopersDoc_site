---
title: "API de Pagos - Chile"
linkTitle: "API de Pagos - Chile"
date: 2021-05-03T15:48:08-05:00
description: >
  La API de Pagos de Chile le permite a tu tienda procesar diferentes tipos de transacciones con múltiples métodos de pago.
weight: 20
tags: ["subtopic"]
---
<script src="/js/searchcodes.js"></script>

Para integrarte con la API de Pagos de Chile, apunta tus peticiones a las siguientes URLs de acuerdo con tu ambiente.

{{% alert title="URLs" color="info"%}}
* Pruebas: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Producción: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Métodos disponibles {#available-methods}
La API de pagos incluye los siguiente métodos:

* [Enviar transacciones utilizando tarjeta de crédito, débito o prepago]({{< ref "#submit-transactions-using-credit-debit-or-prepaid-cards" >}}) <!-- * [Enviar transacciones utilizando Khipu]({{< ref "#submit-transactions-using-khipu" >}}) -->
* [Enviar transacciones utilizando efectivo]({{< ref "#submit-transactions-using-cash" >}})
* [Enviar transacciones utilizando tarjeta débito o prepago a través de WebPay Plus]({{< ref "#submit-transactions-using-debit-and-prepaid-cards" >}})
* [Consultar métodos de pago disponibles]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Nota" color="info"%}}
Para confirmar el estado de una transacción, puedes utilizar una de las siguientes opciones:
* Navega a la URL configurada en el parámetro `transaction.notifyUrl` o la opción _**URL de confirmación**_ ubicada en el Módulo PayU en _**Configuración**_ > _**Configuración técnica**_.
* Utiliza el [API o SDK de consultas]({{< ref "Queries.md" >}}).
{{% /alert %}}

## Enviar transacciones utilizando tarjeta de crédito, débito o prepago {#submit-transactions-using-credit-debit-or-prepaid-cards}
Este método te permite procesar pagos realizados por tus clientes utilizando tarjetas de crédito, débito o prepago. Para Chile, puedes realizar los flujos de dos pasos (**Autorización**, **Captura**) y el de un paso (**Cobro**). Para más información, consulta los [flujos de pago]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Nota" color="info"%}}
Las transacciones utilizando flujos de dos pasos están disponibles bajo demanda. Contacta a tu representante de ventas para más información.
{{% /alert %}}

### Parámetros para la petición y la respuesta {#parameters-for-request-and-response}

<details>
<summary>Petición</summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Mostrar solo campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` Si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
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
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Región de la dirección. | No |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | País de la dirección. | No |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Código postal de la dirección. | No |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. | No |
| transaction > order > buyer | Objeto |  | Información del comprador. | Sí |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Identificador del comprador en tu sistema. | No |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Nombre del comprador. | Sí |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | Correo electrónico de comprador. | Sí |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Teléfono del comprador. | Sí |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Número de identificación del comprador. | Sí |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Línea de dirección 1 del comprador. | Sí |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Región de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| transaction > order > buyer > shippingAddress > postalCode | Numérico | Max:20 | Código postal de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > phone | Numérico | Max:20 | Número de teléfono asociado a la dirección del comprador. | Sí |
| transaction > order > additionalValues > | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Monto de la transacción. | Sí |
| transaction > order > additionalValues > TX_VALUE > value | Numérico | 12, 2 | Especifica el monto de la transacción. Este valor no puede incluir decimales. | Sí |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Monto del impuesto a las ventas. | Sí |
| transaction > order > additionalValues > TX_TAX > value | Numérico | 12, 2 | Especifica el monto del impuesto.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para calcular el impuesto.<br>Si el monto no tiene impuesto, envía 0.<br>Este valor puede tener dos dígitos decimales.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Numérico | 12, 2 | Especifica el monto base de la transacción. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > creditCardTokenId |  |  | Incluye este parámetro cuando la transacción se haga con una tarjeta tokenizada reemplazando la información de la tarjeta de crédito. Para más información, consulta [API de Tokenización]({{< ref "Tokenization-API.md" >}}) | No |
| transaction > creditCard | Objeto |  | Información de la tarjeta de crédito. Este objeto y sus parámetros son obligatorios cuando el pago se realiza utilizando una tarjeta de crédito no tokenizada. | No |
| transaction > creditCard > number | Alfanumérico | Min:13 Max:20 | Número de la tarjeta débito. | No |
| transaction > creditCard > securityCode | Alfanumérico | Min:1 Max:4 | Código de seguridad de la tarjeta de crédito (CVC2, CVV2, CID). | No |
| transaction > creditCard > expirationDate | Alfanumérico | 7 | Fecha de expiración de la tarjeta de crédito. Formato `YYYY/MM`. | No |
| transaction > creditCard > name | Alfanumérico | Min:1 Max:255 | Nombre del tarjetahabiente mostrado en la tarjeta de crédito. | No |
| transaction > creditCard > processWithoutCvv2 | Booleano | Max:255 | Te permite procesar transacciones sin incluir el código de seguridad de la tarjeta de crédito. Tu comercio requiere autorización de PayU antes de utilizar esta funcionalidad. | No |
| transaction > debitCard | Objeto |  | Información de la tarjeta débito. Este objeto y sus parámetros son obligatorios cuando el pago se realiza utilizando una tarjeta debito. | No |
| transaction > debitCard > number | Alfanumérico | Min:13 Max:20 | Número de la tarjeta débito. | No |
| transaction > debitCard > securityCode | Alfanumérico | Min:1 Max:4 | Código de seguridad la tarjeta débito (CVC2, CVV2, CID). | No |
| transaction > debitCard > expirationDate | Alfanumérico | 7 | Fecha de expiración de la tarjeta débito. Formato `YYYY/MM`. | No |
| transaction > debitCard > name | Alfanumérico | Min:1 Max:255 | Nombre del tarjetahabiente mostrado en la tarjeta debito. | No |
| transaction > payer | Objeto |  | Información del pagador. | Sí |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Correo electrónico del pagador. | Sí |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identificador del pagador en tu sistema. | No |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nombre del pagador que debe ser igual al enviado en el parámetro `creditCard.name` para pagos con tarjeta de crédito. | Sí |
| transaction > payer > billingAddress | Objeto |  | Dirección de facturación. | Sí |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Línea 1 de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Línea 2 de la dirección de facturación. | No |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Región de la dirección de facturación. | No |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | Sí |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Código postal de la dirección de facturación. | No |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. | No |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Fecha de nacimiento del pagador. | No |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Número de teléfono del pagador. | Sí |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Número de identificación del pagador. | Sí |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver los tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alfanumérico | 32 | Asigna este valor de acuerdo con el tipo de transacción requerido:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` para flujos de un paso.</li></ul> | Sí |
| transaction > paymentMethod | Alfanumérico | 32 | Selecciona un método de pago de Tarjeta de crédito o débito valido. [Ver los métodos de pago disponibles para Chile]({{< ref "select-your-payment-method.html#Chile" >}}). | Sí |
| transaction > paymentCountry | Alfanumérico | 2 | Asigna `CL` para Chile. | Sí |
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

#### Consideraciones

* **Tokens de tarjetas de crédito:** Al utilizar tokens de tarjetas de crédito para pagos, incluye los siguientes parámetros:
    * `transaction.creditCardTokenId`: Identifica el token de la tarjeta de crédito almacenada.
    * `transaction.creditCard.securityCode` (Opcional): El código de seguridad de la tarjeta (CVV) si es requerido para su procesamiento. Para obtener más información sobre cómo crear y usar tokens, consulta la [API de Tokenización]({{< ref "Tokenization-API.md" >}}).
* **Moneda:** Las transacciones deben enviarse en Pesos Chilenos (CLP) con números enteros solamente. **No se permiten decimales**.
* **Flujos de dos pasos (Autorización y Captura):**
    * Actualmente disponible solo para pagos de una cuota. La integración rechazará automáticamente transacciones con múltiples cuotas.
    * La funcionalidad de flujo de dos pasos requiere activación previa. Contacta a tu representante de ventas de PayU para obtener más información y activación.
* **Código de seguridad (CVV):**
    * De forma predeterminada, el procesamiento de tarjetas de crédito sin el código de seguridad (CVV) no está habilitado.
    * Para habilitar el procesamiento sin CVV, comunícate con tu representante de ventas de PayU. Una vez habilitado, incluye el parámetro `creditCard.processWithoutCvv2` establecido en `true` en las solicitudes y omite el parámetro `creditCard.securityCode`.

### Autorización {#authorization}
Utiliza este método para realizar el paso de **Autorización** del flujo de dos pasos. En este paso, autorizas el pago pero el monto no se debita hasta que [captures]({{< ref "#capture" >}}) los fondos.<br>Los siguientes son los cuerpos de la petición y la respuesta para este tipo de transacción.

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
         "accountId": "512325",
         "referenceCode": "PRODUCT_TEST_2021-06-25T16:33:48.512Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "77d72fb91eb43f9b15fb300d5f173da3",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 10000,
               "currency": "CLP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
               "street2": "5555487",
               "city": "RM",
               "state": "Talagante",
               "country": "CL",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "5555487",
            "city": "RM",
            "state": "Talagante",
            "country": "CL",
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
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "125544",
            "city": "RM",
            "state": "Talagante",
            "country": "CL",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "creditCard": {
         "number": "4097440000000004",
         "securityCode": "777",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION",
      "paymentMethod": "VISA",
      "paymentCountry": "CL",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
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
        "orderId": 1400455722,
        "transactionId": "49cb24d9-eda6-43de-aad9-a17ffa9e5fb8",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "195569",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "49cb24d9-eda6-43de-aad9-a17ffa9e5fb8",
        "authorizationCode": "195569",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Approved transaction",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624616739664,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "TRANSBANK_DIRECT_TOKEN": "01ab3984007f3010d2adb6c02d104f85b8268ccf4b95da4b56f3abdb339e1c52"
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
         <accountId>512325</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-25T16:33:48.512ZZ</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>77d72fb91eb43f9b15fb300d5f173da3</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>10000</value>
                  <currency>CLP</currency>
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
               <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
               <street2>5555487</street2>
               <city>RM</city>
               <state>Talagante</state>
               <country>CL</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
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
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
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
      <paymentCountry>CL</paymentCountry>
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
        <orderId>1400455931</orderId>
        <transactionId>56f77e02-447a-4c98-a04b-9a8f3f92f3e7</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>363838</paymentNetworkResponseCode>
        <trazabilityCode>56f77e02-447a-4c98-a04b-9a8f3f92f3e7</trazabilityCode>
        <authorizationCode>363838</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Approved transaction</responseMessage>
        <operationDate>2021-06-25T06:33:55</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>TRANSBANK_DIRECT_TOKEN</string>
                <string>01ab79a6030063a6b4039a64a8cf7de471d7ad02390c118fbd7d66cfd1af9864</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Captura {#capture}
Utiliza este método para realizar el paso de **Captura** del flujo de dos pasos. En este paso, capturas los fondos previamente [Autorizados]({{< ref "#authorization" >}}) para transferirlos a tu cuenta PayU.

#### Consideraciones {#considerations-1}
Ten en cuenta las siguientes consideraciones para la captura:
* El tiempo máximo para capturar una transacción aprobada es de 7 días. Después de este tiempo, el sistema anula la transacción automáticamente.
* Para capturar una transacción, solo son obligatorios los parámetros mostrados en el cuerpo de la petición. Ten en cuenta que los IDs de las orden y la transacción deben corresponder a la actualmente autorizada.
* Solo puedes realizar una captura parcial sobre un monto autorizado. Para esto, necesitas enviar en la petición el parámetro `transaction.order.TX_VALUE` con su valor (Como se envió durante la Autorización).<br>El monto mínimo es 50 CLP.
* No está permitido capturar un monto mayor al previamente autorizado. 
* Solo se permite capturar transacciones en una cuota.

Los siguientes son los cuerpos de la petición y la respuesta para este tipo de transacción.

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
         "id": "1400421560"
      },
      "type": "CAPTURE",
      "parentTransactionId": "db9d9d7f-b62c-4ed2-a3b9-d146d33bdaf5"
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
        "orderId": 1400455931,
        "transactionId": "da91c0ec-632b-44e3-883d-b85821390519",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "da91c0ec-632b-44e3-883d-b85821390519",
        "authorizationCode": "169018",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Approved transaction",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624629865424,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "TRANSBANK_DIRECT_TOKEN": "01ab5a10f3c1bdd401ac86d7c21e4347a7b848171fad7830157abcaac0373c7e"
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
         <id>1400456250</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>ead41073-a03a-45aa-9e83-23d4b03197f0</parentTransactionId>
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
        <orderId>1400456250</orderId>
        <transactionId>9c4d12c4-277d-4936-9d15-735e21dd5a19</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>0</paymentNetworkResponseCode>
        <trazabilityCode>9c4d12c4-277d-4936-9d15-735e21dd5a19</trazabilityCode>
        <authorizationCode>698999</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Approved transaction</responseMessage>
        <operationDate>2021-06-25T09:08:16</operationDate>
        <extraParameters>
            <entry>
                <string>TRANSBANK_DIRECT_TOKEN</string>
                <string>01ab6ddef1f9350f7b970d33b9766db9b0d52c6b9cb353618ddc8cd58d076b59</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Cobro {#charge}
Utiliza este método para realizar el flujo de un paso, es decir, un cobro. En este paso, los pasos del flujo de dos pasos son combinados en una única transacción y los fondos son transferidos de la cuenta del cliente a tu cuenta PayU tan pronto sean aprobados.

Los siguientes son los cuerpos de la petición y la respuesta para este tipo de transacción.

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
         "accountId": "512325",
         "referenceCode": "PRODUCT_TEST_2021-06-15T20:35:48.975Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "75ae7a887dfd759894c57eb1bc5a4288",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 10000,
               "currency": "CLP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
               "street2": "5555487",
               "city": "RM",
               "state": "Talagante",
               "country": "CL",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "5555487",
            "city": "RM",
            "state": "Talagante",
            "country": "CL",
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
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "125544",
            "city": "RM",
            "state": "Talagante",
            "country": "CL",
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
      "paymentCountry": "CL",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
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
        "orderId": 1400431556,
        "transactionId": "14aed0cc-95cb-4b04-b4dd-0c7f8c3296e8",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "456505",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "14aed0cc-95cb-4b04-b4dd-0c7f8c3296e8",
        "authorizationCode": "456505",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Approved transaction",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1623834912248,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "TRANSBANK_DIRECT_TOKEN": "01ab306b62cd0ce17d462501b121ed6cac3794375054b80a51c01bad4ec51550"
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
         <accountId>512325</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-15T20:35:48.975Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>75ae7a887dfd759894c57eb1bc5a4288</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>10000</value>
                  <currency>CLP</currency>
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
               <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
               <street2>5555487</street2>
               <city>RM</city>
               <state>Talagante</state>
               <country>CL</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
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
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
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
      <paymentCountry>CL</paymentCountry>
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
        <orderId>1400431549</orderId>
        <transactionId>937ed9fe-72d3-44e2-b1b8-e38e9f8e08a4</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>185495</paymentNetworkResponseCode>
        <trazabilityCode>937ed9fe-72d3-44e2-b1b8-e38e9f8e08a4</trazabilityCode>
        <authorizationCode>185495</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Approved transaction</responseMessage>
        <operationDate>2021-06-16T04:13:51</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>TRANSBANK_DIRECT_TOKEN</string>
                <string>01abc29e7b32bbf011cdd2a1e9961c5d6bd068220f4b506b06c66e15de1acfd2</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Enviar transacciones utilizando Khipu {#submit-transactions-using-khipu}

Khipu es una solución de pago que permite a los comercios de Chile aceptar pagos directamente desde las cuentas bancarias de sus clientes, sin necesidad de tarjetas de crédito o débito.

**Beneficios para tu negocio:**

* **Aumenta tus ventas:** Khipu ofrece una experiencia de pago fluida y sencilla, lo que se traduce en una mayor tasa de conversión y más ventas.
* **Expande tu alcance:** Llega a un público más amplio al aceptar pagos de todos los bancos de Chile, incluyendo clientes que no cuentan con tarjeta de crédito o débito.
* **Mejora la seguridad:** Khipu emplea tecnologías de cifrado y autenticación para proteger la información de tus clientes y promover transacciones seguras.

<!--
### Proceso de pago con Khipu

Para integrar Khipu en tu plataforma de comercio electrónico, puedes crear un formulario de pago y generar una experiencia de usuario siguiendo el flujo a continuación:

1. **Selección de pago:** El cliente elige Khipu como método de pago en tu checkout:

<img src="/assets/Payments/KHIPU_ES_01.png" alt="PrintScreen" width="250">
<p></p>

2. **Selección de banco:** El cliente selecciona su banco de preferencia.

<img src="/assets/Payments/KHIPU_ES_02.png" alt="PrintScreen" width="250">
<p></p>

3. **Autenticación segura:** El cliente ingresa sus credenciales bancarias en la plataforma segura de Khipu.

<img src="/assets/Payments/KHIPU_ES_03.png" alt="PrintScreen" width="500">
<p></p>

4. **Confirmación de pago:** El cliente recibe una confirmación inmediata de la transacción.

<img src="/assets/Payments/KHIPU_ES_04.png" alt="PrintScreen" width="250">
<p></p>

5. **Soporte y recibo:** El sistema envía un recibo detallado al correo electrónico del cliente.

<img src="/assets/Payments/KHIPU_ES_05.png" alt="PrintScreen" width="250">
<p></p>

### Parámetros para la solicitud y respuesta {#parameters-for-request-and-response-1}

<details>
<summary>Solicitud</summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Mostrar solo campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|---|
| language | Alfanumérico | 2 | Idioma utilizado en la solicitud, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico| Máx:32 | Establecer `SUBMIT_TRANSACTION`. | Sí |
| merchant | Objeto | | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico| Mín:12 Máx:32| Usuario o inicio de sesión proporcionado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico| Mín:6 Máx:32| Contraseña proporcionada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| transaction | Objeto | | Este objeto tiene los datos de la transacción. | Sí |
| transaction > order | Objeto | | Este objeto tiene los datos del pedido. | Sí |
| transaction > order > accountId | Número | | Identificador de tu cuenta. | Sí |
| transaction > order > referenceCode| Alfanumérico| Mín:1 Máx:255| Representa el identificador del pedido en tu sistema. | Sí |
| transaction > order > description| Alfanumérico| Mín:1 Máx:255| Descripción del pedido. | Sí |
| transaction > order > language  | Alfanumérico| 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí | 
| transaction > order > notifyUrl| Alfanumérico| Máx:2048 | URL de confirmación del pedido. | No |
| transaction > order > partnerId| Alfanumérico| Máx:255 | ID de socio en PayU. | No |
| transaction > order > signature| Alfanumérico| Máx:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| transaction > order > additionalValues| Objeto | 64 | Monto del pedido o sus valores asociados. | Sí |
| transaction > order > additionalValues > TX_VALUE| Alfanumérico| 64 | Monto de la transacción. | Sí |
| transaction > order > additionalValues > TX_VALUE > value | Número| 12, 2 | Especifica el monto de la transacción. Este monto no puede incluir decimales. | Sí |
| transaction > order > additionalValues > TX_VALUE > currency| Alfanumérico| 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| transaction > order > buyer | Objeto | | Información del comprador. | Sí |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Máx:100 | ID del comprador en tu sistema. | No |
| transaction > order > buyer > fullName | Alfanumérico | Máx:150 | Nombre completo del comprador. | Sí |
| transaction > order > buyer > emailAddress | Alfanumérico | Máx:255 | Correo electrónico del comprador. | Sí |
| transaction > order > buyer > contactPhone | Alfanumérico | Máx:20 | Número de teléfono del comprador. | Sí |
| transaction > order > buyer > dniNumber | Alfanumérico | Máx:20 | Número de identificación del comprador. | Sí |
| transaction > order > buyer > shippingAddress | Objeto | | Dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > street1| Alfanumérico | Máx:150 | Línea 1 de la dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Máx:50 | Ciudad de la dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Máx:40 | Estado de la dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > country| Alfanumérico | 2 | País de la dirección de envío del comprador en formato ISO 3166 alfa-2. | Sí |
| transaction > order > buyer > shippingAddress > postalCode| Número | Máx:20 | Código postal de la dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > phone | Número | Máx:20 | Número de teléfono de la dirección de envío del comprador. | Sí |
| transaction > order > shippingAddress | Objeto | | Dirección de envío. | No |
| transaction > order > shippingAddress > street1 | Alfanumérico | Máx:100 | Línea 1 de la dirección. | No |
| transaction > order > shippingAddress > street2 | Alfanumérico | Máx:100 | Línea 2 de la dirección. | No |
| transaction > order > shippingAddress > city | Alfanumérico | Máx:50 | Ciudad de la dirección. | No |
| transaction > order > shippingAddress > state | Alfanumérico | Máx:40 | Estado de la dirección. | No |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | País de la dirección. | No |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Máx:8 | Código postal de la dirección. | No |
| transaction > order > shippingAddress > phone | Alfanumérico | Máx:11 | Número de teléfono asociado a la dirección. | No |
| transaction > payer | Objeto | | Información del pagador. | Sí |
| transaction > payer > emailAddress | Alfanumérico | 255 | Dirección de correo electrónico del pagador. | Sí |
| transaction > payer > merchantPayerId | Alfanumérico | 100 | Identificador del pagador en tu sistema. | No |
| transaction > payer > fullName | Alfanumérico | 150 | Nombre del pagador. | Sí |
| transaction > payer > billingAddress | Objeto | | Dirección de facturación. | Sí |
| transaction > payer > billingAddress > street1 | Alfanumérico | 100 | Línea 1 de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > street2 | Alfanumérico | 100 | Línea 2 de la dirección de facturación. | No |
| transaction > payer > billingAddress > city | Alfanumérico | 50 | Ciudad de la dirección de facturación. | Sí |
| transaction > payer > billingAddress > state | Alfanumérico | 40 | Estado de la dirección de facturación. | No |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | Sí |
| transaction > payer > billingAddress > postalCode | Alfanumérico | 20 | Código postal de la dirección de facturación. | No |
| transaction > payer > billingAddress > phone | Alfanumérico | 20 | Número de teléfono de la dirección de facturación. | No |
| transaction > payer > birthdate | Alfanumérico | 10 | Fecha de nacimiento del pagador. | No |
| transaction > payer > contactPhone | Alfanumérico | 20 | Número de teléfono del pagador. | Sí |
| transaction > payer > dniNumber | Alfanumérico | 20 | Número de identificación del comprador. | Sí |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificación del comprador. [Ver los tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sí |
| transaction > extraParameters | Objeto | | Parámetros o datos adicionales asociados con la solicitud. Para pagos por transferencia bancaria Khipu, esto contiene: La página de respuesta de tu comercio (requerido), el código del banco (requerido) y el nombre del banco (opcional). <ul> En JSON, el parámetro `extraParameters` se establece como: `"extraParameters": {"RESPONSE_URL": "http://www.payu.com/response", "FINANCIAL_INSTITUTION_CODE": "Bawdf", "FINANCIAL_INSTITUTION_NAME": "DemoBank" }` </ul> <ul> En XML, el parámetro `extraParameters` se establece como: `<extraParameters> <entry> <string>RESPONSE_URL</string> <string>http://www.payu.com/response</string> </entry> <entry> <string>FINANCIAL_INSTITUTION_CODE</string> <string>Bawdf</string> </entry> <entry> <string>FINANCIAL_INSTITUTION_NAME</string> <string>DemoBank</string> </entry> </extraParameters>` | Sí |
| transaction > type | Alfanumérico | 32 | Como estos pagos se realizan en la página web de PSE, la única transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sí |
| transaction > paymentMethod | Alfanumérico | 32 | Selecciona un método de pago válido en transferencia bancaria. [Ver métodos de pago disponibles para Chile]({{< ref "payments-api-chile.html#available-payment-methods-query" >}}). | Sí |
| transaction > paymentCountry | Alfanumérico | 2 | Establecer `CL` para Chile. | Sí |
| transaction > deviceSessionId | Alfanumérico | 255 | Identificador de sesión del dispositivo donde el cliente realiza la transacción. Para más información, consulte [este tema]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| transaction > ipAddress | Alfanumérico | 39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > cookie | Alfanumérico | 255 | Cookie almacenada por el dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > userAgent | Alfanumérico | 1024 | El agente de usuario del navegador donde el cliente realiza la transacción. | Sí |
| test (JSON) <hr>isTest (XML) | Booleano | | Establecer `true` si la solicitud está en modo de prueba. De lo contrario, establecer `false`. | Sí |

</details>

<details>
<summary>Respuesta</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|---|---|---|---|
| code | Alfanumérico | | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Máx: 2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| transactionResponse | Objeto | | Datos de la respuesta. |
| transactionResponse > orderId | Número | | Id de pedido generado o existente en PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | Identificador de la transacción en PayU. |
| transactionResponse > state | Alfanumérico | Máx: 32 | Estado de la transacción. Ya que el usuario realiza el pago en una oficina física, el estado para una transacción exitosa es `PENDING`. |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Máx: 255 | Código de respuesta devuelto por la red financiera. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Máx: 255 | Mensaje de error devuelto por la red financiera. |
| transactionResponse > trazabilityCode | Alfanumérico | Máx: 32 | Código de trazabilidad devuelto por la red financiera. |
| transactionResponse > authorizationCode | Alfanumérico | Máx: 12 | Código de autorización devuelto por la red financiera. |
| transactionResponse > pendingReason | Alfanumérico | Máx: 21 | Código de razón asociado con el estado. Como se menciona en `transactionResponse > state`, la transacción está esperando el pago. |
| transactionResponse > responseCode | Alfanumérico | Máx: 64 | Código de respuesta asociado con el estado. En este caso, para transacciones exitosas es `PENDING_TRANSACTION_CONFIRMATION`.|
| transactionResponse > responseMessage | Alfanumérico | Máx: 2048 | Mensaje asociado con el código de respuesta. |
| transactionResponse > operationDate | Fecha | | Fecha de creación de la respuesta en el sistema de PayU. |
| transactionResponse > extraParameters | Objeto | | Parámetros adicionales o datos asociados con la respuesta. La `BANK_URL` es la URL que debes usar para redirigir a tu pagador a Khipu. En JSON, el parámetro `extraParameters` sigue esta estructura: `"extraParameters": { "BANK_URL": "xxxx" }` En XML, el parámetro `extraParameters` sigue esta estructura: `<extraParameters> <entry> <string>BANK_URL</string> <string>xxxx</string> </entry> </extraParameters>` |

</details>

#### Ejemplos de solicitud y respuesta

A continuación, los ejemplos de solicitud y respuesta en formatos JSON y XML.

{{% alert title="Nota" color="info"%}}
Para realizar pruebas, puedes utilizar:
* `"FINANCIAL_INSTITUTION_CODE": "Bawdf"`
* `"FINANCIAL_INSTITUTION_NAME": "DemoBank"`
{{% /alert %}}

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
            "accountId": "512325",
            "referenceCode": "PRODUCT_TEST_2024-03-13T19:59:43.229Z",
            "description": "Payment test description",
            "language": "es",
            "signature": "1d6c33aed575c4974ad5c0be7c6a1c87",
            "notifyUrl": "http://www.payu.com/notify",
            "additionalValues": {
                "TX_VALUE": {
                    "value": 10000,
                    "currency": "CLP"
                }
            },
            "buyer": {
                "merchantBuyerId": "1",
                "fullName": "First name and second buyer name",
                "emailAddress": "buyer_test@test.com",
                "contactPhone": "7563126",
                "dniNumber": "123456789",
                "shippingAddress": {
                   "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
                   "street2": "5555487",
                   "city": "RM",
                   "state": "Talagante",
                   "country": "CL",
                   "postalCode": "000000",
                   "phone": "7563126"
                }
             },
             "shippingAddress": {
                "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
                "street2": "5555487",
                "city": "RM",
                "state": "Talagante",
                "country": "CL",
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
                "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
                "street2": "125544",
                "city": "RM",
                "state": "Talagante",
                "country": "CL",
                "postalCode": "000000",
                "phone": "7563126"
            }
        },
        "extraParameters": {
            "FINANCIAL_INSTITUTION_CODE": "Bawdf",
            "FINANCIAL_INSTITUTION_NAME": "DemoBank",
            "RESPONSE_URL": "http://www.payu.com/response"
        },
        "type": "AUTHORIZATION_AND_CAPTURE",
        "paymentMethod": "KHIPU",
        "paymentCountry": "CL",
        "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
        "ipAddress": "127.0.0.1",
        "cookie": "cookie_52278879710130",
        "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
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
        "orderId": 1400021721,
        "transactionId": "b5c1ef12-7f6b-4f00-9c43-6e801bf525ad",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "gsizttwrygpd",
        "authorizationCode": null,
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1710329617633,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_URL": "https://app.khipu.com/payment/simplified/gsizttwrygpd"
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
			<accountId>512325</accountId>
			<referenceCode>PRODUCT_TEST_2024-03-13T19:59:43.229Z</referenceCode>
			<description>Payment test description</description>
			<language>es</language>
			<signature>1d6c33aed575c4974ad5c0be7c6a1c87</signature>
			<notifyUrl>http://www.payu.com/notify</notifyUrl>
			<additionalValues>
                <string>TX_VALUE</string>
				<additionalValue>
					<value>10000</value>
					<currency>CLP</currency>
				</additionalValue>
			</additionalValues>
			<buyer>
				<merchantBuyerId>1</merchantBuyerId>
				<fullName>First name and second buyer name</fullName>
				<emailAddress>buyer_test@test.com</emailAddress>
				<contactPhone>7563126</contactPhone>
				<dniNumber>123456789</dniNumber>
				<shippingAddress>
					<street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
					<street2>5555487</street2>
					<city>RM</city>
					<state>Talagante</state>
					<country>CL</country>
					<postalCode>000000</postalCode>
					<phone>7563126</phone>
				</shippingAddress>
			</buyer>
			<shippingAddress>
				<street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
				<street2>5555487</street2>
				<city>RM</city>
				<state>Talagante</state>
				<country>CL</country>
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
				<street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
				<street2>125544</street2>
				<city>RM</city>
				<state>Talagante</state>
				<country>CL</country>
				<postalCode>000000</postalCode>
				<phone>7563126</phone>
			</billingAddress>
		</payer>
		<extraParameters>
            <entry>
                <string>FINANCIAL_INSTITUTION_CODE</string>
                <string>Bawdf</string>
            </entry>
            <entry>
                <string>FINANCIAL_INSTITUTION_NAME</string>
                <string>DemoBank</string>
            </entry>
            <entry>
                <string>RESPONSE_URL</string>
                <string>http://www.payu.com/response</string>
            </entry>
		</extraParameters>
		<type>AUTHORIZATION_AND_CAPTURE</type>
		<paymentMethod>KHIPU</paymentMethod>
		<paymentCountry>CL</paymentCountry>
		<deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
		<ipAddress>127.0.0.1</ipAddress>
		<cookie>cookie_52278879710130</cookie>
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
	<error />
	<transactionResponse>
		<orderId>1400021721</orderId>
		<transactionId>b5c1ef12-7f6b-4f00-9c43-6e801bf525ad</transactionId>
		<state>PENDING</state>
		<trazabilityCode>gsizttwrygpd</trazabilityCode>
		<authorizationCode />
		<pendingReason>AWAITING_NOTIFICATION</pendingReason>
		<responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
		<operationDate>1710329617633</operationDate>
		<referenceQuestionnaire />
		<extraParameters>
			<entry>
				<string>BANK_URL</string>
				<string>https://app.khipu.com/payment/simplified/gsizttwrygpd</string>
			</entry>
		</extraParameters>
	</transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Lista de bancos disponibles con Khipu

Opcionalmente, con este método puedes consultar la lista de bancos disponibles para realizar pagos utilizando Khipu:

<details>
<summary>Solicitud</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|---|
| language | Alfanumérico | 2 | Idioma utilizado en la solicitud, este idioma se usa para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Máx: 32 | Establecer `GET_BANKS_LIST`. | Sí |
| test (JSON) <hr> isTest (XML) | Booleano | | Establecer `true` si la solicitud está en modo de prueba. De lo contrario, establecer `false`. | Sí |
| merchant | Objeto | | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Mín: 12 Máx: 32 | Usuario o login proporcionado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Mín: 6 Máx: 32 | Contraseña proporcionada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| bankListInformation | Objeto | | Este objeto tiene la información de la consulta. | Sí |
| bankListInformation > paymentMethod | Alfanumérico | | Establecer `KHIPU`. | Sí |
| bankListInformation > paymentCountry | Alfanumérico | | Establecer `CL`. | Sí |

</details>

<details>
<summary>Respuesta</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción |
|---|---|---|---|
| code | Alfanumérico | | Código de respuesta de la transacción. Los valores posibles son `ERROR` y `SUCCESS`. |
| error | Alfanumérico | Máx: 2048 | Mensaje de error asociado cuando el código de respuesta es `ERROR`. |
| banks | Objeto | | Lista de los bancos disponibles en Khipu. |
| banks > id | Alfanumérico | | Código para enviar en el parámetro extra `FINANCIAL_INSTITUTION_CODE` de la solicitud de pago. |
| banks > name | Alfanumérico | | Nombre del banco para mostrar en la lista. |
| banks > message | Alfanumérico | | Mensaje con particularidades del banco. |
| banks > minAmount | Numérico | | Monto mínimo que soporta el banco. |
| banks > type | Alfanumérico | | Tipo de banco. |
| banks > parent | Alfanumérico | | Identificador del banco principal, si un banco tiene sección de Persona y Empresa, la sección Persona será el principal de la empresa. |

</details>

#### Llamado a la API {#api-call}

A continuación, los ejemplos de solicitud y respuesta en formatos JSON y XML.

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo de una solicitud:
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
      "paymentMethod": "KHIPU",
      "paymentCountry": "CL"
   }
}

```
<br>

Ejemplo de una respuesta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "banks": [
        {
            "bankId": "Bawdf",
            "name": "DemoBank",
            "message": "Este es un banco de pruebas. Las transacciones no son reales.",
            "minAmount": 200.0000,
            "type": "Persona",
            "parent": ""
        },
        {
            "bankId": "Qwert",
            "name": "DemoBank2",
            "message": "Este es un banco de pruebas. Las transacciones no son reales.",
            "minAmount": 100.0000,
            "type": "Persona",
            "parent": ""
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
    <command>GET_BANKS_LIST</command>
    <merchant>
        <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <isTest>false</isTest>
    <bankListInformation>
        <paymentMethod>KHIPU</paymentMethod>
        <paymentCountry>CL</paymentCountry>
    </bankListInformation>
</request>

```
<br>

Ejemplo de una respuesta:
```XML
<bankListResponse>
    <code>SUCCESS</code>
    <banks>
        <bank>
            <bankId>Bawdf</bankId>
            <name>DemoBank</name>
            <message>Este es un banco de pruebas. Las transacciones no son reales.</message>
            <minAmount>200.0000</minAmount>
            <type>Persona</type>
            <parent></parent>
        </bank>
        <bank>
            <bankId>Qwert</bankId>
            <name>DemoBank2</name>
            <message>Este es un banco de pruebas. Las transacciones no son reales.</message>
            <minAmount>100.0000</minAmount>
            <type>Persona</type>
            <parent></parent>
        </bank>
    </banks>
</bankListResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Consideraciones adicionales para la integración de Khipu

**Transparencia en los pagos:** Los pagos procesados a través de la pasarela de Khipu se reflejarán en el estado de cuenta del pagador bajo el nombre de _PayU Chile SA_.

**Limitaciones de montos:** Es importante tener en cuenta que los bancos asociados a Khipu pueden establecer límites de monto mínimo o máximo por transacción. Estos límites varían según cada institución financiera.

**Políticas de reversos:** De acuerdo con las políticas de Khipu, no se permiten reversos totales, parciales o anulaciones de pagos una vez que la transacción ha sido confirmada y procesada.

**Disponibilidad del método de pago:** Ten en cuenta que el método de pago Khipu solo está disponible para el modelo agregador. Si tu negocio requiere un modelo de pago distinto, consulta con tu asesor de PayU para explorar otras soluciones disponibles.

### Recursos Adicionales:

* [Logos oficiales de Khipu:](https://docs.khipu.com/portal/en/payment-logos/)

-->

## Enviar transacciones utilizando efectivo {#submit-transactions-using-cash}
Este método te permite procesar los pagos en efectivo de tus clientes. Para integrarte con las transacciones en efectivo, debes redirigir a tu cliente a la URL que se encuentra en la respuesta; tu cliente selecciona efectivo y genera el código de pago.

<img src="/assets/Payments/CashReceiptCL.png" alt="PrintScreen" width="50%">

{{% alert title="Nota" color="info"%}}
Klap se conocía anteriormente como MULTICAJA. Aún puede que veas elementos o configuraciones relacionadas con MULTICAJA.
{{% /alert %}}

### Parámetros para la petición y la respuesta {#parameters-for-request-and-response-2}

<details>
<summary>Petición (Request)</summary>
<label for="table3" class="showMandatory"><input type="checkbox" id="table3" name="table3" value="true" onchange="showMandatory(this)"> Mostrar solo campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` Si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
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
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Región de la dirección. | No |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | País de la dirección. | No |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Código postal de la dirección. | No |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. | No |
| transaction > order > buyer | Objeto |  | Información del comprador. | Sí |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Identificador del comprador en tu sistema. | No |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Nombre del comprador. | Sí |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | Correo electrónico de comprador. | Sí |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Teléfono del comprador. | Sí |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Número de identificación del comprador. | Sí |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Línea de dirección 1 del comprador. | Sí |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Región de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| transaction > order > buyer > shippingAddress > postalCode | Numérico | Max:20 | Código postal de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > phone | Numérico | Max:20 | Número de teléfono asociado a la dirección del comprador. | Sí |
| transaction > order > additionalValues > | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Monto de la transacción. | Sí |
| transaction > order > additionalValues > TX_VALUE > value | Numérico | 12, 2 | Especifica el monto de la transacción. Este valor no puede incluir decimales. | Sí |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Monto del impuesto a las ventas. | Sí |
| transaction > order > additionalValues > TX_TAX > value | Numérico | 12, 2 | Especifica el monto del impuesto.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para calcular el impuesto.<br>Si el monto no tiene impuesto, envía 0.<br>Este valor puede tener dos dígitos decimales. | No |
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
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Región de la dirección de facturación. | No |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | Sí |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Código postal de la dirección de facturación. | No |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. | No |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Fecha de nacimiento del pagador. | No |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Número de teléfono del pagador. | Sí |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Número de identificación del pagador. | Sí |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver los tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alfanumérico | 32 | Como los pagos en efectivo se realizan en oficinas físicas, el único tipo de transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sí |
| transaction > paymentMethod | Alfanumérico | 32 | Seleccione un método de pago en efectivo válido. [Ver los métodos de pago disponibles para Chile]({{< ref "select-your-payment-method.html#Chile" >}}). | Sí |
| transaction > paymentCountry | Alfanumérico | 2 | Asigna `CL` para Chile. | Sí |
| transaction > expirationDate | Alfanumérico | 23 | Fecha y hora máxima en la que el cliente puede realizar el pago. Formato `YYYY-MM-DDTHH:MM:SS`, por ejemplo `2021-06-12T16:07:11.586`. | No |
| transaction > ipAddress | Alfanumérico | Max:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > extraParameters | Objeto |  | Parámetros adicionales o datos asociados a la petición. Para pagos en efectivo, necesitas incluir la URL de respuesta para redirigir a tus clientes de vuelta a tu página web cuando completen su pago.<br>En JSON, El parámetro _extraParameters_ se configura así: <br>`"extraParameters": {`<br>&emsp;`"NETWORK_CALLBACK_URL": "http://www.test.com/response"`<br>`}`<br><br>En XML, El parámetro _extraParameters_ se configura así: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>NETWORK_CALLBACK_URL</string>`<br>&emsp;&emsp;`<string>http://www.test.com/response</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` | No |

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
| transactionResponse > state | Alfanumérico | Max:32 | Estado de la transacción. Como el pago se realiza en una oficina física, el estado de una transacción exitosa es `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | Código de respuesta retornado por la red bancaria. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | Mensaje de error retornado por la red bancaria. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | Código de trazabilidad retornado por la red bancaria. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | Código de autorización retornado por la red bancaria. |
| transactionResponse > pendingReason | Alfanumérico | Max:21 | Código de la razón asociada con el estado, como se mencionó en `transactionResponse > state`, la transacción está en espera del pago. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | Código de respuesta asociado con el estado. En este caso, para una transacción exitosa es `PENDING_TRANSACTION_CONFIRMATION`. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Mensaje asociado al código de respuesta. |
| transactionResponse > operationDate | Fecha |  | Fecha de creación de la respuesta en el sistema de PayU. |
| transactionResponse > extraParameters | Objeto |  | Para pagos en efectivo, `extraParameters` tiene un solo elemento con la URL a donde debes redirigir a tu cliente.<br>En JSON, el parámetro _extraParameters_ es: <br>`"extraParameters": {`<br>&emsp;`"BANK_URL": "https://www.multicaja.cl/bdp/order.xhtml?id=123456789012345"`<br>`}`<br><br>En XML, el parámetro _extraParameters_ es: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_URL</string>`<br>&emsp;&emsp;`<string>https://www.multicaja.cl/bdp/order.xhtml?id=123456789012345</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Consideraciones {#considerations-2}
* El parámetro `transaction.expirationDate` no es obligatorio. Si no envías este parámetro, su valor por defecto es siete días luego de la fecha actual a las 12:00 pm.<br>Si envías una fecha posterior a dicho número de días, PayU ignorará este valor y asignará el valor por defecto.
* Debes configurar una URL de respuesta en el parámetro `NETWORK_CALLBACK_URL` dentro de `transaction.extraParameters`; esta URL regresa al usuario a tu página luego de completar el proceso de pago en línea.
* Debes redirigir al pagador a la página web de Klap webpage (antes Multicaja) para permitirle hacer el pago en efectivo. Esta URL se encuentra en el parámetro `BANK_URL` en la respuesta.

### Llamado a la API {#api-call-1}
Los siguientes son los cuerpos de la petición y la respuesta para este método de pago.

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
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
         "accountId": "512325",
         "referenceCode": "PRODUCT_TEST_2021-06-15T20:35:48.975Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "75ae7a887dfd759894c57eb1bc5a4288",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 10000,
               "currency": "CLP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer  name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "5415668464654",
            "shippingAddress": {
               "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
               "street2": "5555487",
               "city": "RM",
               "state": "Talagante",
               "country": "CL",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "5555487",
            "city": "RM",
            "state": "Talagante",
            "country": "CL",
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
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "125544",
            "city": "RM",
            "state": "Talagante",   
            "country": "CL",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
       "extraParameters": {
         "NETWORK_CALLBACK_URL": "http://domain.com/backup_cart/response.php"
      },
	  "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "MULTICAJA",
      "expirationDate": "2021-06-18T20:00:03.105",
      "paymentCountry": "CL",
      "ipAddress": "127.0.0.1"
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
        "orderId": 857794995,
        "transactionId": "f468aa69-82e0-410e-9cc2-3cabba0f970d",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "462623325642199",
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
            "BANK_URL": "https://apidev.mcdesaqa.cl/bdp/order.xhtml?id=462623325642199"
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
         <accountId>512325</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-15T20:35:48.975Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>75ae7a887dfd759894c57eb1bc5a4288</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>10000</value>
                  <currency>CLP</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>5415668464654</dniNumber>
            <shippingAddress>
               <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
               <street2>5555487</street2>
               <city>RM</city>
               <state>Talagante</state>
               <country>CL</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
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
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <extraParameters>
         <entry>
            <string>NETWORK_CALLBACK_URL</string>
            <string>http://domain.com/backup_cart/response.php</string>
         </entry>
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>MULTICAJA</paymentMethod>
      <paymentCountry>CL</paymentCountry>
      <expirationDate>2021-06-18T20:00:03.105</expirationDate>
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
        <orderId>1400432986</orderId>
        <transactionId>71a72319-f143-4359-8cb9-bc44a21d2b25</transactionId>
        <state>PENDING</state>
        <trazabilityCode>a0d9d7d6-000a-4777-af78-e33917a30fd8</trazabilityCode>
        <pendingReason>AWAITING_PAYMENT_IN_ENTITY</pendingReason>
        <responseCode>PENDING_PAYMENT_IN_ENTITY</responseCode>
        <operationDate>2021-06-16T12:22:28</operationDate>
        <extraParameters>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-16T17:42:53</date>
            </entry>
            <entry>
                <string>URL_PAYMENT_REDIRECT</string>
                <string>https://webpay3gint.transbank.cl/webpayserver/initTransaction</string>
            </entry>
            <entry>
                <string>TRANSBANK_DIRECT_TOKEN</string>
                <string>01abbca6da54f4e4ef9eb37fb9cacf72fdcc52797f6a9ca20377bc59eb0d2706</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Enviar transacciones utilizando tarjeta débito o prepago utilizando WebPay Plus {#submit-transactions-using-debit-and-prepaid-cards}
Este método te permite procesar los pagos con tarjetas débito o prepago de tus clientes. Para integrarte con estas transacciones, debes redirigir a tu cliente a la URL que se encuentra en la respuesta; tu cliente ve un de pago como el siguiente.

<img src="/assets/Payments/BankTransferReceiptCL.png" alt="PrintScreen" width="50%">

### Parámetros para la petición y la respuesta {#parameters-for-request-and-response-3}

<details>
<summary>Solicitud</summary>
<label for="table4" class="showMandatory"><input type="checkbox" id="table4" name="table4" value="true" onchange="showMandatory(this)">Mostrar solo campos obligatorios</label>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `SUBMIT_TRANSACTION`. | Sí |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` Si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| merchant | Objeto |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| transaction | Objeto |  | Este objeto tiene los datos de la transacción. | Sí |
| transaction > order | Objeto |  | Este objeto tiene los datos de la orden. | Sí |
| transaction > order > accountId | Numérico |  | Identificador de tu cuenta. | Sí |
| transaction > order > referenceCode | Alfanumérico | Min:1 Max:255 | Representa el identificador de la orden en tu sistema. | Sí |
| transaction > order > description | Alfanumérico | Min:1 Max:255 | Descripción de la orden. | Sí |
| transaction > order > language | Alfanumérico | 2 | Idioma utilizado en los correos electrónicos enviados al comprador y al vendedor. | Sí |
| transaction > order > notifyUrl | Alfanumérico | Max:2048 | URL de confirmación de la orden. | No|
| transaction > order > partnerId | Alfanumérico | Max:255 | ID de aliado dentro de PayU. | No |
| transaction > order > signature | Alfanumérico | Max:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| transaction > order > shippingAddress | Objeto |  | Dirección de envío. | No |
| transaction > order > shippingAddress > street1 | Alfanumérico | Max:100 | Línea de dirección 1. | No |
| transaction > order > shippingAddress > street2 | Alfanumérico | Max:100 | Línea de dirección 2. | No |
| transaction > order > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección. | No |
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Región de la dirección. | No |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | País de la dirección. | No |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Código postal de la dirección. | No |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. | No |
| transaction > order > buyer | Objeto |  | Información del comprador. | Sí |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Identificador del comprador en tu sistema. | No |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Nombre del comprador. | Sí |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | Correo electrónico de comprador. | Sí |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Teléfono del comprador. | Sí |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Número de identificación del comprador. | Sí |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Línea de dirección 1 del comprador. | Sí |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Región de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| transaction > order > buyer > shippingAddress > postalCode | Numérico | Max:20 | Código postal de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > phone | Numérico | Max:20 | Número de teléfono asociado a la dirección del comprador. | Sí |
| transaction > order > additionalValues > | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Monto de la transacción. | Sí |
| transaction > order > additionalValues > TX_VALUE > value | Numérico | 12, 2 | Especifica el monto de la transacción. Este valor no puede incluir decimales. | Sí |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Monto del impuesto a las ventas. | Sí |
| transaction > order > additionalValues > TX_TAX > value | Numérico | 12, 2 | Especifica el monto del impuesto.  | No |
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
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Región de la dirección de facturación. | No |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | Sí |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Código postal de la dirección de facturación. | No |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. | No |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Fecha de nacimiento del pagador. | No |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Número de teléfono del pagador. | Sí |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Número de identificación del pagador. | Sí |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver los tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alfanumérico | 32 | Como los pagos se realizan en la página de WebPay plus, el único tipo de transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sí |
| transaction > paymentMethod | Alfanumérico | 32 | Seleccione un método de pago válido para Tarjetas Débito y prepago. [Ver los métodos de pago disponibles para Chile]({{< ref "select-your-payment-method.html#Chile" >}}). | Sí |
| transaction > paymentCountry | Alfanumérico | 2 | Asigna `CL` para Chile. | Sí |
| transaction > deviceSessionId | Alfanumérico | Max:255 | Identificador de la sesión del dispositivo donde el cliente realiza la transacción. Para más información, consulta [este artículo]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| transaction > ipAddress | Alfanumérico | Max:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > cookie | Alfanumérico | Max:255 | Cookie almacenada por el dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > userAgent | Alfanumérico | Max:1024 | User agent del navegador donde el cliente realiza la transacción. | Sí |
| transaction > extraParameters | Objeto |  | Parámetros adicionales o datos asociados a la petición. Para los pagos a través de WebPay plus, esta es la página de respuesta de tu comercio.<br>En JSON, El parámetro _extraParameters_ se configura así: <br>`"extraParameters": {`<br>&emsp;`"RESPONSE_URL": "http://www.test.com/response"`<br>`}`<br><br>En XML, El parámetro _extraParameters_ se configura así: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>RESPONSE_URL</string>`<br>&emsp;&emsp;`http://www.test.com/response`<br>&emsp;`</entry>`<br>`</extraParameters>` | No |

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
| transactionResponse > state | Alfanumérico | Max:32 | Estado de la transacción. Como el pago se realiza de forma externa, el estado de una transacción exitosa es `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | Código de respuesta retornado por la red bancaria. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | Mensaje de error retornado por la red bancaria. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | Código de trazabilidad retornado por la red bancaria. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | Código de autorización retornado por la red bancaria. |
| transactionResponse > pendingReason | Alfanumérico | Max:21 | Código de la razón asociada con el estado, como se mencionó en `transactionResponse > state`, la transacción está en espera del pago. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | Código de respuesta asociado con el estado. En este caso, para una transacción exitosa es `PENDING_PAYMENT_IN_ENTITY`. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Mensaje asociado al código de respuesta. |
| transactionResponse > operationDate | Fecha |  | Fecha de creación de la respuesta en el sistema de PayU. |
| transactionResponse > extraParameters | Objeto |  | Parámetros adicionales o datos asociados a la respuesta.<br>En JSON, El parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"URL_PAYMENT_REDIRECT": "xxxx"`<br>`}`<br><br>En XML, El parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>URL_PAYMENT_REDIRECT</string>`<br>&emsp;&emsp;`<string>xxxx</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Consideraciones {#considerations-4}
* Si no envías el parámetro `RESPONSE_URL` en `transaction.extraParameters`, el API toma el valor de la variable _**URL de respuesta**_ en tu Módulo PayU (_**Configuración**_ > _**Configuración técnica**_).
* Cuando procesas pagos a través de WebPay plus, debes redirigir a tu cliente a la URL que encuentras en el extra parámetro `URL_PAYMENT_REDIRECT` concatenado con el extra parámetro `TRANSBANK_DIRECT_TOKEN` así: <br> `URL_PAYMENT_REDIRECT?token_ws=TRANSBANK_DIRECT_TOKEN`.
* Si la solicitud de pago es exitosa, la transacción queda con estado `PENDING` y responseCode `PENDING_PAYMENT_IN_ENTITY`; esto es debido a que el pagador es redirigido al banco seleccionado para completar el pago.
* La página de respuesta debe tener las siguientes variables:

| Variable          | Descripción                                                      |
|-------------------|------------------------------------------------------------------|
| transactionState  | Estado de la transacción.                                        |
| reference_pol     | Código de la referencia para identificar la transacción en PayU. |
| TX_VALUE          | Monto de la transacción.                                         |
| authorizationCode | Código de autorización de la transacción.                        |
| processingDate    | Fecha de la transacción.                                         |
| cc_number         | Número visible de la tarjeta utilizada en la transacción.        |

Los parámetros anteriores se envían a través del método GET.

### Llamado a la API {#api-call-2}
Los siguientes son los cuerpos de la petición y la respuesta para este método de pago.

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
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
         "accountId": "512325",
         "referenceCode": "PRODUCT_TEST_2021-06-15T20:35:48.975Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "75ae7a887dfd759894c57eb1bc5a4288",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 10000,
               "currency": "CLP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer  name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "5415668464654",
            "shippingAddress": {
               "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
               "street2": "5555487",
               "city": "RM",
               "state": "Talagante",
               "country": "CL",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "5555487",
            "city": "RM",
            "state": "Talagante",
            "country": "CL",
            "postalCode": "000000",
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
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
               "street2": "5555487",
               "city": "RM",
               "state": "Talagante",
               "country": "CL",
               "postalCode": "000000",
               "phone": "7563126"
         }
      },
      "extraParameters": {
         "RESPONSE_URL": "http://www.test.com/response"
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "TRANSBANK_DEBIT",
      "paymentCountry": "CL",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
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
        "orderId": 1400432466,
        "transactionId": "e2609a58-97d6-4a65-8638-1b03da03cc7a",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "5f0cac61-c023-4fa3-bf27-ff888fa36c3c",
        "authorizationCode": null,
        "pendingReason": "AWAITING_PAYMENT_IN_ENTITY",
        "responseCode": "PENDING_PAYMENT_IN_ENTITY",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1623856942412,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "EXPIRATION_DATE": 1623875847781,
            "URL_PAYMENT_REDIRECT": "https://webpay3gint.transbank.cl/webpayserver/initTransaction",
            "TRANSBANK_DIRECT_TOKEN": "01ab155164939156988ee462d09ed5613b7efd297fe97b099c684ec8599c5cc5"
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
         <accountId>512325</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-15T20:35:48.975Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>75ae7a887dfd759894c57eb1bc5a4288</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>10000</value>
                  <currency>CLP</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>5415668464654</dniNumber>
            <shippingAddress>
               <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
               <street2>5555487</street2>
               <city>RM</city>
               <state>Talagante</state>
               <country>CL</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
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
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <extraParameters>
         <entry>
            <string>RESPONSE_URL</string>
            <string>http://www.test.com/response</string>
         </entry>
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>TRANSBANK_DEBIT</paymentMethod>
      <paymentCountry>CL</paymentCountry>
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
        <orderId>1400432986</orderId>
        <transactionId>71a72319-f143-4359-8cb9-bc44a21d2b25</transactionId>
        <state>PENDING</state>
        <trazabilityCode>a0d9d7d6-000a-4777-af78-e33917a30fd8</trazabilityCode>
        <pendingReason>AWAITING_PAYMENT_IN_ENTITY</pendingReason>
        <responseCode>PENDING_PAYMENT_IN_ENTITY</responseCode>
        <operationDate>2021-06-16T12:22:28</operationDate>
        <extraParameters>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-16T17:42:53</date>
            </entry>
            <entry>
                <string>URL_PAYMENT_REDIRECT</string>
                <string>https://webpay3gint.transbank.cl/webpayserver/initTransaction</string>
            </entry>
            <entry>
                <string>TRANSBANK_DIRECT_TOKEN</string>
                <string>01abbca6da54f4e4ef9eb37fb9cacf72fdcc52797f6a9ca20377bc59eb0d2706</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Consultar métodos de pago disponibles {#available-payment-methods-query}
Este método retorna la lista de los métodos de pago disponibles en todos los paises.

### Parámetros para la petición y la respuesta {#parameters-for-request-and-response-4}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `GET_PAYMENT_METHODS`. | Sí |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` Si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| merchant | Objeto |  | Este objeto tiene los datos de autenticación. | Sí |
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
| paymentMethods | Objeto |  | Lista de métodos de pago. | Sí |
| paymentMethods > paymentMethodComplete | Objeto |  | Este objeto tiene la información de un método de pago. | Sí |
| paymentMethods > paymentMethodComplete > id | Numérico |  | Identificador del método de pago. | Sí |
| paymentMethods > paymentMethodComplete > description | Alfanumérico | Max:32 | Nombre del método de pago. | Sí |
| paymentMethods > paymentMethodComplete > country | Alfanumérico | 2 | Código ISO del país del método de pago. | Sí |

</details>

### Llamado a la API {#api-call-3}
Los siguientes son los cuerpos de la petición y la respuesta para este método. Para el propósito de este ejemplo, la respuesta muestra dos métodos de pago. 

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}
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
            "id": "716",
            "description": "VISA",
            "country": "CL",
            "enabled": true,
            "reason": null
        },
        {
            "id": "712",
            "description": "DINERS",
            "country": "CL",
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
            <id>716</id>
            <description>VISA</description>
            <country>CL</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>712</id>
            <description>DINERS</description>
            <country>CL</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
    </paymentMethods>
</paymentMethodsResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Ping
El método `PING` te permite verificar la conexión con nuestra plataforma. 

### Parámetros para la petición y la respuesta {#parameters-for-request-and-response-5}

<details>
<summary>Petición (Request)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma utilizado en la petición, este idioma se utiliza para mostrar los mensajes de error generados. [Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sí |
| command | Alfanumérico | Max:32 | Asigna `PING`. | Sí |
| test (JSON)<hr>isTest (XML) | Booleano |  | Asigna `true` Si la petición es en modo pruebas. Si no, asigna `false`. | Sí |
| merchant | Objeto |  | Este objeto tiene los datos de autenticación. | Sí |
| merchant > apiLogin | Alfanumérico | Min:12 Max:32 | Usuario o login entregado por PayU. [Cómo obtengo mi API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |
| merchant > apiKey | Alfanumérico | Min:6 Max:32 | Contraseña entregada por PayU. [Cómo obtengo mi API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sí |

</details>

<details>
<summary>Respuesta (Response)</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| code | Alfanumérico |  | Código de respuesta de la transacción. |
| error | Alfanumérico | Max:2048 | Mensaje de error asociado si ocurrió un error. |
| transactionResponse |  | Max:2048 | La respuesta del método PING si ocurrió un error. |
</details>

### Llamado a la API {#api-call-4}
Los siguientes son los cuerpos de la petición y la respuesta para este método.

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}
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
