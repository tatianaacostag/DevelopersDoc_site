---
title: "API de Pagos - Brasil"
linkTitle: "API de Pagos - Brasil"
date: 2021-05-03T15:48:08-05:00
description: >
  La API de Pagos para Brasil permite integrar de manera eficiente las capacidades de procesamiento de pagos de PayU con tu plataforma de compras en línea. A través de esta API, los comercios pueden ofrecer a sus clientes una amplia variedad de métodos de pago, incluyendo aplicaciones móviles, transferencia electrónica, efectivo, tranferencia bancaria y tarjetas de crédito.
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

* [Enviar Transacciones Utilizando Tarjeta de Crédito]({{< ref "#submit-transactions-using-credit-or-debit-cards" >}})
* [Enviar Transacciones Utilizando Google Pay™]({{< ref "#submit-transactions-using-google-pay" >}})
* [Enviar Transacciones Utilizando PIX]({{< ref "#submit-transactions-using-pix" >}})
* [Enviar Transacciones Utilizando Efectivo]({{< ref "#submit-transactions-using-cash" >}})
* [Enviar Transacciones Utilizando Transferencia Bancaria]({{< ref "#submit-transactions-using-bank-transfer" >}})
* [Consultar Métodos de Pago Disponibles]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Nota" color="info"%}}

Para confirmar el estado de una transacción, puedes utilizar una de las siguientes opciones:
* Navega a la URL configurada en la variable `transaction.notifyUrl` o la opción _**URL de confirmación**_ ubicada en el Módulo PayU en _**Configuración**_ > _**Configuración técnica**_.
* Utiliza el [API o SDK de consultas]({{< ref "Queries.md" >}}).

{{% /alert %}}

## Enviar Transacciones Utilizando Tarjetas de Crédito {#submit-transactions-using-credit-cards}

Este método te permite procesar pagos realizados por tus clientes utilizando tarjetas de crédito o débito. Para Brasil, puedes realizar los flujos de dos pasos (**Autorización**, **Captura**) y el de un paso (**Cobro**). Para más información, consulta los [flujos de pago]({{< ref "payments.md#payment-flows" >}}).

### Agregar Facilitadores de Pago {#adding-payment-facilitators}

Los comercios pueden ser considerados como Procesadores de Pago por las franquicias y por el Banco Central. Un procesador de pagos es una entidad legal que tiene el dinero de los subcomercios. En caso de quiebra mercantil y gestión fiscal, el Banco Central de Brasil quiere conocer al beneficiario del negocio.

Para incluir la información del subcomercio, necesitas agregar en la petición de los flujos de **Autorización** y de **Cobro** utilizando el objeto `submerchant`.

#### ¿Qué es un Facilitador de Pago? {#what-is-a-payment-facilitator}

Un facilitador de pago es una compañía que ofrece una alternativa a contratar con una organización de pago tradicional asumiendo la responsabilidad del flujo de fondos en una relación comprador-vendedor.

Muchos comercios escogen trabajar con facilitadores de pago ya que poseen y manejan la cuenta maestra, por lo tanto, asumen el riesgo. Los comercios también escogen un facilitador de pago debido a la simplicidad de configurar una cuenta, esto ocurre típicamente a través de una aplicación corta y una evaluación de lla suscripción.

#### ¿Qué Información Necesitas? {#what-information-is-required}

Necesitas enviar la siguiente información:

* Identificación interna del subcomercio (opcional)
* Nombre del subcomercio (opcional)
* Número de identificación del subcomercio _*Individuos o Entidades_
* Dirección del subcomercio (opcional)
* Estado del subcomercio (obligatorio)
* Código postal del subcomercio(obligatorio)
* País del subcomercio (obligatorio)

Encuentra la descripción de estos campos en la sección [Variables]({{< ref "#variables-for-request-and-response" >}}).

### Uso de Tarjetas Tokenizadas

PayU admite pagos con su tarjeta tokenizada, lo que le permite realizar pagos regulares con una tarjeta almacenada en un token. Un token de tarjeta de crédito reemplaza la información sensible de una tarjeta de crédito, permitiéndole almacenarla de manera segura de acuerdo con los estándares de seguridad PCI DSS (Payment Card Industry Data Security Standard).

PayU puede procesar pagos utilizando los siguientes servicios:

* **Tokenización de PayU**.<br>Ofrecemos nuestro propio servicio para tokenizar sus tarjetas de crédito a solicitud. Este servicio te permite tokenizar la información de las tarjetas de crédito de tus clientes (independientemente de su franquicia) utilizando nuestra integración API o SDK. <br><br>Para obtener más información, consulta [Tokenización de PayU]({{< ref "Tokenization.md" >}}).

* **MasterCard Digital Enablement Service - MDES**.<br>Un servicio de tokenización proporcionado por Mastercard. Este servicio te permite tokenizar el Número de Cuenta Principal de las tarjetas de crédito Mastercard, permitiéndote usarlas para pagos regulares o para crear funciones de pago con un clic.<br><br>Para obtener más información, consulta [MasterCard Digital Enablement Service (MDES)](https://developer.mastercard.com/mdes-digital-enablement/documentation/).

* **Visa Token Service - VTS**.<br>Un servicio de tokenización proporcionado por Visa. Este servicio le permite almacenar la información sensible de las tarjetas de crédito Visa en un token, permitiéndole usarlas para pagos regulares o para crear funciones de pago con un clic.<br><br>Para obtener más información, consulta [Visa Token Service (VTS)](https://usa.visa.com/products/visa-token-service.html).

#### Pagar con Tokens de PayU

Para realizar pagos utilizando tokens de tarjetas de crédito de PayU, incluye el parámetro `transaction.creditCardTokenId` en lugar de la información de la tarjeta de crédito. 

El siguiente ejemplo muestra el cuerpo de la solicitud a un alto nivel para un flujo de un solo paso. No incluye parámetros detallados de la solicitud.

{{% alert title="Nota" color="info"%}}
Para procesar un pago sin el CVV, debes establecer el parámetro `creditCard.processWithoutCvv2` en `true` en la solicitud de pago y omitir el parámetro `creditCard.securityCode`.<br>
Por defecto, el procesamiento de tarjetas de crédito sin código de seguridad no está habilitado. Para habilitar esta función, por favor contacta a su representante de ventas.

{{% /alert %}}

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
         "Extra parámetros de la solicitud":""
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
         <!-- Información de la orden -->
      </order>
      <payer>
         <!-- IInformación del pagador -->
      </payer>
      <creditCardTokenId>46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3</creditCardTokenId>
      <creditCard>
         <securityCode>321</securityCode>
      </creditCard>
      <extraParameters>
         <!-- Extra parámetros de la solicitud -->
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

#### Pagar con Tokens de MDES o VTS

Si estás tokenizando las tarjetas de crédito de tus clientes utilizando MDES o VTS, puedes configurar la información del token en el parámetro `transaction.networkToken`, reemplazando la información de la tarjeta de crédito, y establecer el parámetro `creditCard.processWithoutCvv2` en `true`.

Por defecto, no está habilitado el procesamiento de tarjetas de crédito sin código de seguridad. Por favor, contacta a tu representante de ventas para habilitar esta función.

El siguiente ejemplo muestra el cuerpo de la solicitud a un alto nivel para un flujo de un solo paso. No incluye parámetros detallados de la solicitud.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
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
         "Información de la orden":""
      },
      "payer": {
         "Información del pagador":""
      },
      "networkToken": {
          "tokenPan": "4097440000000004",
          "cryptogram": "11223344556677889900112233445566778899",
          "expiry": "2028/01"
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
         <!-- Información de la orden -->
      </order>
      <payer>
         <!-- Información del pagador -->
      </payer>
      <networkToken>
         <tokenPan>4097440000000004</tokenPan>
         <cryptogram>11223344556677889900112233445566778899</cryptogram>
         <expiry>2028/01</expiry>
      </networkToken>
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

Encuentra la descripción del objeto `transaction.networkToken` y sus parámetros en la sección de [Parámetros]({{< ref "#parameters-for-request-and-response" >}}).

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
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Estado de la dirección. Para Brasil, solo debes enviar dos caracteres, por ejemplo, asigna `SP` para São Paulo. | No |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | País de la dirección. | No |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Código postal de la dirección. Para Brasil, utiliza el formato `XXXXX-XXX` o `XXXXXXXX`. Ejemplo: `09210-710` o `09210710`. | No |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | No |
| transaction > order > buyer | Objeto |  | Información del comprador. | Sí |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Identificador del comprador en tu sistema. | No |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Nombre del comprador. | Sí |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | Correo electrónico de comprador. | Sí | Sí |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Teléfono del comprador. | Sí |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Número de identificación del comprador. Debes utilizar un algoritmo para validar el CPF y debe tener el siguiente formato `XXX.XXX.XXX-XX`. Ejemplo: `811.807.405-64`. | Sí |
| transaction > order > buyer > cnpj | Alfanumérico | Max:14 | Número de identificación del comprador (Para persona jurídica en Brasil). Debes utilizar un algoritmo para validar el CNPJ y debe tener el siguiente formato `XXXXXXXXXXXXXX`. Ejemplo: `32593371000110`. | Sí |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Línea de dirección 1 del comprador. | Sí |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Estado de la dirección del comprador. Para Brasil, solo debes enviar dos caracteres, por ejemplo, asigna `SP` para São Paulo. | Sí |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| transaction > order > buyer > shippingAddress > postalCode | Numérico | Max:20 | Código postal de la dirección del comprador. Para Brasil, utiliza el formato `XXXXX-XXX` o `XXXXXXXX`. Ejemplo: `09210-710` o `09210710`. | Sí |
| transaction > order > buyer > shippingAddress > phone | Numérico | Max:20 | Teléfono asociado a la dirección del comprador. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | Sí |
| transaction > order > additionalValues > | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Monto de la transacción. | Sí |
| transaction > order > additionalValues > TX_VALUE > value | Numérico | 12, 2 | Especifica el monto de la transacción, este valor puede tener dos dígitos decimales (Ej. `10000.00` o `10000`). | Sí |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Monto del impuesto a las ventas. | Sí |
| transaction > order > additionalValues > TX_TAX > value | Numérico | 12, 2 | Especifica el monto del impuesto.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para calcular el impuesto.<br>Si el monto no tiene impuesto, envía 0.<br>Este valor puede tener dos dígitos decimales.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Numérico | 12, 2 | Especifica el monto base de la transacción. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > submerchant | Objeto |  | Información del subcomercio. Si no envías este parámetro, PayU configura tu comercio como subcomercio. | No |
| transaction > order > submerchant > id | Alfanumérico | Max:15 | Identificador interno del subcomercio si utilizas uno para identificarlo. | No |
| transaction > order > submerchant > fullName | Alfanumérico | Max:150 | Nombre del subcomercio. | No |
| transaction > order > submerchant > address | Objeto |  | Dirección del subcomercio. los campos `state`, `country` y `postalCode` son obligatorios cuando se envía este objeto. | No |
| transaction > order > submerchant > address > street1 | Alfanumérico | Max:100 | Línea de dirección 1. | No |
| transaction > order > submerchant > address > street2 | Alfanumérico | Max:100 | Línea de dirección 2. | No |
| transaction > order > submerchant > address > street3 | Alfanumérico | Max:100 | Línea de dirección 3. | No |
| transaction > order > submerchant > address > city | Alfanumérico | Max:50 | Ciudad de la dirección. | No |
| transaction > order > submerchant > address > state | Alfanumérico | Max:40 | Estado de la dirección. Para Brasil, solo debes enviar dos caracteres, por ejemplo, asigna `SP` para São Paulo. | Sí |
| transaction > order > submerchant > address > country | Alfanumérico | 2 | País de la dirección. | Sí |
| transaction > order > submerchant > address > postalCode | Alfanumérico | Max:8 | Código postal de la dirección. Para Brasil, utiliza el formato `XXXXX-XXX` o `XXXXXXXX`. Ejemplo: `09210-710` o `09210710`. | Sí |
| transaction > order > submerchant > address > phone | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | No |
| transaction > order > submerchant > identification | Alfanumérico | Max:14 | Número de identificación del comprador (Para persona jurídica en Brasil). Debes utilizar un algoritmo para validar el CNPJ y debe tener el siguiente formato `XXXXXXXXXXXXXX`. Ejemplo: `32593371000110`. | No |
| transaction > order > submerchant > identificationType | Alfanumérico | Max:4 | Tipo de identificación of the sub-merchant. The possible values are `cnpj` o `cpf`. | No |
| transaction > creditCardTokenId | Alfanumérico |  | Incluye este parámetro cuando la transacción se haga con una tarjeta tokenizada utilizando la tokenización de PayU reemplazando la información de tu tarjeta de crédito; además, es obligatorio enviar el parámetro `transaction.creditCard.expirationDate`. Para más información, consulta [API de Tokenización]({{< ref "Tokenization-API.md" >}}). | No |
| transaction > creditCard | Objeto |  | Información de la tarjeta de crédito. Este objeto y sus parámetros son obligatorios cuando el pago se realiza utilizando una tarjeta de crédito no tokenizada. | No |
| transaction > creditCard > number | Alfanumérico | Min:13 Max:20 | Número de la tarjeta de crédito. | No |
| transaction > creditCard > securityCode | Alfanumérico | Min:1 Max:4 | Código de seguridad de la tarjeta de crédito (CVC2, CVV2, CID). | No |
| transaction > creditCard > expirationDate | Alfanumérico | 7 | Fecha de expiración de la tarjeta de crédito. Formato `YYYY/MM`. | No |
| transaction > creditCard > name | Alfanumérico | Min:1 Max:255 | Nombre del tarjetahabiente mostrado en la tarjeta de crédito. *Obligatorio sólo para transacciones de Google Pay. | No* |
| transaction > creditCard > processWithoutCvv2 | Booleano | Max:255 | Te permite procesar transacciones sin incluir el código de seguridad de la tarjeta de crédito. Tu comercio requiere autorización de PayU antes de utilizar esta funcionalidad. | No |
| transaction > payer | Objeto |  | Información del pagador. | No |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Correo electrónico del pagador. | No |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identificador del pagador en tu sistema. | No |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nombre del pagador. | No |
| transaction > payer > billingAddress | Objeto |  | Dirección de facturación. | No |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Línea 1 de la dirección de facturación. | No |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Línea 2 de la dirección de facturación. | No |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección de facturación. | No |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Estado de la dirección de facturación. Para Brasil, solo debes enviar dos caracteres, por ejemplo, asigna `SP` para São Paulo. | No |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | No |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Código postal de la dirección de facturación. Para Brasil, utiliza el formato `XXXXX-XXX` or ´. Ejemplo: `09210-710` o `09210710`. | No |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | No |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Fecha de nacimiento del pagador. | No |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Número de teléfono del pagador. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | No |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Número de identificación del pagador. Debes utilizar un algoritmo para validar el CPF y debe tener el siguiente formato `XXX.XXX.XXX-XX`. Ejemplo: `811.807.405-64`. | No |
| transaction > payer > cnpj | Alfanumérico | Max:14 | Número de identificación del pagador (Para persona jurídica en Brasil). Debes utilizar un algoritmo para validar el CNPJ y debe tener el siguiente formato `XXXXXXXXXXXXXX`. Ejemplo: `32593371000110`. | No |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificación del pagador. [Ver tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > networkToken | Objeto |  | Información del token. Incluye este parámetro cuando la transacción se realice con una tarjeta tokenizada utilizando la tokenización de VTS o MDES. Para más información, consulta [Pagar con tókenes de MDES o VTS]({{< ref "#pay-with-mdes-or-vts-tokens" >}}). <br><sup>\*</sup>Cuando envíes este objeto, todos sus parámetros son obligatorios.| No |
| transaction > networkToken > tokenPan | Alfanumérico | Max:32 | Número del token generado por MDES o VTS. | Sí<sup>\*</sup> |
| transaction > networkToken > cryptogram | Alfanumérico | Max:28 | Llave única generada por MDES o VTS para descifrar la información de la tarjeta de crédito. | Sí<sup>\*</sup> |
| transaction > networkToken > expiry | Alfanumérico | 7 | Fecha de expiración del token. Formato `YYYY/MM`. | Sí<sup>\*</sup> |
| transaction > digitalWallet | Objeto |  | Incluya este parámetro cuando la transacción se realice utilizando una billetera digital. *Al enviar este objeto, todos sus campos son obligatorios. | No |
| transaction > digitalWallet > type | Alfanumérico | ---- | Envía el valor con base en la billetera que se está procesando: GOOGLE_PAY | Si* |
| transaction > digitalWallet > message | Alfanumérico | ---- | Incluye la información del Google Pay token que Google te devolverá por cada transacción. Para más información consulta [aquí](#definiciones-de-payu-para-la-integración-api-del-medio-de-pago). | Si* |
| transaction > type | Alfanumérico | 32 | Asigna este valor de acuerdo con el tipo de transacción requerido:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` para flujos de un paso.</li></ul> | Sí |
| transaction > paymentMethod | Alfanumérico | 32 | Selecciona un método de pago de Tarjeta de crédito valido. [Ver los métodos de pago disponibles para Brasil]({{< ref "select-your-payment-method.html#Brazil" >}}). | Sí |
| transaction > paymentCountry | Alfanumérico | 2 | Asigna `BR` para Brasil. | Sí |
| transaction > deviceSessionId | Alfanumérico | Max:255 | Identificador de la sesión del dispositivo donde el cliente realiza la transacción. Para más información, consulta [este artículo]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| transaction > ipAddress | Alfanumérico | Max:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > cookie | Alfanumérico | Max:255 | Cookie almacenada por el dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > userAgent | Alfanumérico | Max:1024 | User agent del navegador donde el cliente realiza la transacción. | Sí |
| transaction > extraParameters | Objeto |  | Parámetros adicionales o datos asociados a la petición. El tamaño máximo de cada nombre de _extraParameters_ es 64 caracteres.<br>En JSON, El parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>En XML, El parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | No |
| transaction > termsAndConditionsAcepted | Booleano | | Términos y condiciones de PayU que deben aceptar los pagadores. *Este parámetros es obligatorio únicamente si tu cuenta PayU brasilera está asociada a una cuenta bancaria extranjera. | No* |
| transaction > threeDomainSecure | Objeto |  | Este objeto contiene la información de 3DS 2.0. | No |
| transaction > threeDomainSecure > embedded | Booleano |  | Asigna `true` si quieres utilizar un MPI embebido para el proceso de Autorización. Por defecto, este valor está asignado como `false`. | No |
| transaction > threeDomainSecure > eci | Numérico | Max:2 | Indicador de Comercio Electrónico.<br>Valor retornado por los servidores de directorio indicando el intento de autenticación.<br>Este parámetro es obligatorio cuando `transaction.threeDomainSecure.embedded` es `false` y `transaction.threeDomainSecure.xid` tiene un valor configurado. | No |
| transaction > threeDomainSecure > cavv | Alfanumérico | Max:28 | Valor de verificación de autenticación del titular de la tarjeta (Cardholder Authentication Verification Value).<br>Código del criptograma utilizado en la autenticación de la transacción codificado en Base 64.<br>Dependiendo de los códigos ECI específicos establecidos por la red, este valor puede ser opcional. | No |
| transaction > threeDomainSecure > xid | Alfanumérico | Max:28 | Identificador de la transacción enviado por el MPI codificado en Base 64.<br>Este parámetro es obligatorio cuando `transaction.threeDomainSecure.embedded` is `false` y `transaction.threeDomainSecure.eci` tiene un valor configurado. | No |
| transaction > threeDomainSecure > directoryServerTransactionId | Alfanumérico | Max:36 | Identificador de la transacción generador por el servidor de directorio durante la autenticación. | No |

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
| transactionResponse > extraParameters | Objeto  |  | Parámetros adicionales o datos asociados con la respuesta. <br>En JSON, El parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>En XML, El parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Consideraciones {#considerations}

* Si tu comercio no tiene una entidad local, es obligatorio enviar tanto el CPF (parámetro `transaction.[payer|buyer].dniNumber`) o el CNPJ (parámetro `transaction.[payer|buyer].cnpj`) cuando utilices [Autorización]({{< ref "#authorization" >}}) o [Cobro]({{< ref "#charge" >}}).
* Si no envías información del subcomercio. PayU configura a tu comercio como subcomercio.
* Para pagos con tókenes de tarjetas de crédito generador por PayU, incluye los parámetros `transaction.creditCardTokenId` y `transaction.creditCard.securityCode` (Si procesas con código de seguridad) reemplazando la información de la tarjeta de crédito. Para más información, consulta el [API de Tokenización]({{< ref "Tokenization-API.md" >}}).
* Para pagos con tókenes de tarjetas de crédito generador por MDES o VTS, incluye el objeto `transaction.networkToken` y sus parámetros.
* Por defecto, el procesamiento de tarjetas de crédito sin código de seguridad no está activo. Si lo quieres activar, contacta a tu representante de ventas. Luego de que esté activado, envía en la petición la variable `creditCard.processWithoutCvv2` con valor true y elimina la variable `creditCard.securityCode`.<br>Es obligatorio tener activa esta funcionalidad cuando utilices tókenes de tarjetas de crédito generados utilizando MDES o VTS.
* El extra parámetro `CIELO_TID` identifica la transacción, se necesita este parámetro para procesar anulaciones (voids).
* La variable `transaction.threeDomainSecure` no reemplaza la información de la tarjeta o ninguno de los campos obligatorios de la transacción. Este objeto es adicional y no es obligatorio.
* La variable `transaction.threeDomainSecure` corresponde a un escenario _passthrough_ donde el comercio realiza la autenticación por su cuenta.

### Autorización {#authorization}

Utiliza este método para realizar el paso de **Autorización** del flujo de dos pasos. En este paso, autorizas el pago pero el monto no se debita hasta que [captures]({{< ref "#capture" >}}) los fondos.<br>Los siguientes son los cuerpos de la petición y la respuesta para este tipo de transacción.

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

### Captura {#capture}

Utiliza este método para realizar el paso de **Captura** del flujo de dos pasos. En este paso, capturas los fondos previamente [Autorizados]({{< ref "#authorization" >}}) para transferirlos a tu cuenta PayU.

#### Consideraciones {#considerations-1}

Ten en cuenta las siguientes consideraciones para la captura:
* El tiempo máximo para capturar una transacción aprobada es de 7 días. Después de este tiempo, la transacción es cancelada.
* Para capturar una transacción, solo son obligatorios los parámetros mostrados en el cuerpo de la petición. Ten en cuenta que los IDs de las orden y la transacción deben corresponder a la actualmente autorizada.
* Puedes realizar capturas parciales sobre un monto autorizado. Para más información, consulta la sección [Captura Parcial]({{< ref "#partial-capture" >}}).

Los siguientes son los cuerpos de la petición y la respuesta para este tipo de transacción.

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

### Captura Parcial {#partial-capture}

Una captura parcial es una operación que permite solicitar el desembolso de un monto menor al autorizado previamente en una transacción.

Esto significa que si inicialmente tu integración autorizó un pago de $100, puedes realizar una captura parcial por un valor de $60, y liberar el monto restante de $40, el cual la integración no podrá capturar posteriormente.

#### Consideraciones {#considerations-2}

* El monto total capturado no puede exceder el monto autorizado originalmente.
* Cada procesador de pagos y cada país pueden tener reglas o restricciones en cuanto al monto que puedes capturar parcialmente.
* Debes especificar el valor que deseas capturar parcialmente en el campo `value`, dentro del parámetro `TX_VALUE`, como se muestra en el ejemplo a continuación.

Los siguientes son ejemplos de los cuerpos de la solicitud y la respuesta para este tipo de transacción.


{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
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
            "id": "2152525133"
        },
        "additionalValues": {
            "TX_VALUE": {
                "value": 60,
                "currency": "BRL"
            }
        },
        "type": "CAPTURE",
        "parentTransactionId": "4b6adba7-e43b-45f8-88a6-d290755d6c04"
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

Ejemplo de una Solicitud:
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
        <value>60</value>
        <currency>BRL</currency>
      </TX_VALUE>
    </additionalValues>
    <type>CAPTURE</type>
    <parentTransactionId>4b6adba7-e43b-45f8-88a6-d290755d6c04</parentTransactionId>
  </transaction>
  <test>false</test>
</request>

```
<br>

Ejemplo de una Respuesta:
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

Utiliza este método para realizar el flujo de un paso, es decir, un cobro. En este paso, los pasos del flujo de dos pasos son combinados en una única transacción y los fondos son transferidos de la cuenta del cliente a tu cuenta PayU tan pronto sean aprobados.

Los siguientes son los cuerpos de la petición y la respuesta para este tipo de transacción.

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
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


## Enviar Transacciones Utilizando Google Pay™ {#submit-transactions-using-google-pay}

Google Pay es una billetera digital que permite realizar pagos con tarjeta de forma sencilla y rápida, sin necesidad de introducir los datos de la tarjeta en cada pago. Los datos de la tarjeta son almacenados de forma segura por Google. Este método de pago está disponible para todos los dispositivos (teléfonos móviles y ordenadores), independientemente del sistema operativo y en casi todos los navegadores web.

En caso de utilizar Google Pay, los comercios deben adherirse a la [Política de uso aceptable](https://payments.developers.google.com/terms/aup) de las API de Google Pay y aceptar los términos que definen las [Condiciones de servicio de las API de Google Pay](https://payments.developers.google.com/terms/sellertos).

{{% alert title="Nota" color="info"%}}

La descripción que figura a continuación se aplica a la prestación de este servicio directamente mostrando la ventana emergente de Google Pay en el sitio web del receptor del pago (e-commerce).

{{% /alert %}}

Si deseas ofrecer este método de pago a través de PayU Web-Checkout, no se requiere ningún esfuerzo de integración adicional. Contacta a tu gerente de cuenta para realizar la solicitud de activación. Si deseas probar el método de pago antes de la activación, puedes seguir las instrucciones [aquí](#pruebas-para-comercios-con-integración-web-checkout).

Ten en cuenta que si tu integración con PayU es API, debes realizar los ajustes que se describen en esta sección para procesar transacciones de Google Pay: 

* [Realizar la integración API del medio de pago](#integración-api-del-medio-de-pago)
* [Realizar la adaptación de la integración API con PayU](#procesar-transacciones-google-pay-en-payu)
* [Probar el método de pago](#probar-el-método-de-pago) 

 ### Integración API del Medio de Pago

Para integrar el sitio web con el monedero Google Pay, procede según las instrucciones que figuran en este sitio web:
* [Documentación de la API](https://developers.google.com/pay/api/web)
* [Lista de chequeo de integración de API](https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist)
* [Directrices de la marca](https://developers.google.com/pay/api/web/guides/brand-guidelines)

##### Definiciones de PayU para la Integración API del Medio de Pago

A continuación encontrarás información relevante que debes considerar durante la integración del medio de pago para que tus pagos sean procesados por PayU:

* ###### Solicitar un Payment Token para PayU

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

* ###### Medios de Pago Soportados

Ten en cuenta que PayU como procesador de pagos de Google Pay permite el manejo de todo tipo de tarjetas de pago emitidas por las organizaciones Visa y Mastercard. Esto implica la siguiente configuración del script de Google:

```
const allowedCardNetworks = ["MASTERCARD", "VISA", “ELECTRON”, “MAESTRO];
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];
```

Como respuesta, Google devolverá el elemento ```PaymentData```, y el campo ```paymentMethodData.tokenizationData.token``` contendrá un Google Pay Token cifrado de forma segura (una cadena de caracteres).

A continuación un ejemplo de Google Pay Token:

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

 ### Procesar Transacciones de Google Pay en PayU

 La función principal de Google Pay como billetera digital es almacenar tarjetas de crédito para facilitar el procesamiento de pagos. Con eso en mente, para el procesamiento de transacciones de Google Pay en PayU, la lógica a aplicar será la misma que para tarjetas de crédito, excepto por las siguientes particularidades:

* Si estás procesando transacciones de tus clientes con Google Pay, debes configurar la información de la billetera digital en el parámetro ```transaction.digitalWallet```.
* Dentro del parámetro ```transaction.digitalWallet``` utiliza ```GOOGLE_PAY``` para el campo ```transaction.digitalWallet.type``` y envía el Google Pay token en el campo ```transaction.digitalWallet.message```. 
* Ten en cuenta que dentro del parámetro ```transaction.creditcard```, para las transacciones de Google Pay, siempre debes enviar un valor válido para el campo ```transaction.creditcard.name```. Otros campos de este parámetro no son necesarios ya que Google Pay los entrega dentro del Google Pay token.
* Contacta a tu gerente de cuenta para realizar las activaciones necesarias para procesar sin cvv ya que este medio de pago lo requiere.

### Probar el Método de Pago

Esta sección está diseñada para guiar a los usuarios sobre el proceso de prueba y familiarización con el método de pago Google Pay en PayU. 

**Requisitos previos (aplica para la integración API y Web Checkout):**
* Asegúrate de haber iniciado sesión en el explorador con la cuenta de Gmail con la que vas a realizar la prueba.
* Únete al grupo de Google en el que estarán disponibles las tarjetas de prueba para PayU. El grupo se encuentra en la siguiente [documentación de Google](https://developers.google.com/pay/api/android/guides/resources/test-card-suite).

#### Pruebas para Comercios con Integración API:

1.	Una vez realizados los cambios indicados en los apartados anteriores, utiliza el Archivo Simulador de Token para simular una transacción y obtener un token de Google Pay de muestra. El simulador puede visualizarse <a href="https://developers.payulatam.com/latam/es/docs/integrations/api-integration/simulator.html" target="_blank">aquí</a>.

{{% alert title="Nota" color="info"%}}
Para garantizar un procesamiento correcto, al momento de seleccionar las tarjetas para el pago,   utiliza tarjetas cuyo nombre no empiecen por "Test". 
{{% /alert %}}

2. Utiliza la información del token de Google Pay de muestra para completar el request de PayU. Envíala a PayU para obtener prueba de una transacción aprobada. Si tienes algún resultado no aprobado, revisa la documentación de los pasos anteriores.

<video width="630" height="300" controls>
	<source src="/assets/GooglePay/API.mp4" type="video/mp4">
 	Your browser does not support the video tag.
</video>

#### Pruebas para Comercios con Integración Web Checkout:

Utiliza el Web Checkout en [ambiente de prueba](https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/test/prueba_pago.jsp) para simular una transacción. 

{{% alert title="Nota" color="info"%}}

* Para garantizar un procesamiento correcto, al momento de seleccionar las tarjetas para el pago, utiliza tarjetas cuyo nombre no empiecen por "Test". 
* Usa las credenciales de prueba de Brasil para esta prueba. Consulta las credenciales [aquí](https://developers.payulatam.com/latam/es/docs/getting-started/test-your-solution.html).

{{% /alert %}}

<video width="630" height="300" controls>
	<source src="/assets/GooglePay/WebCheckout.mp4" type="video/mp4">
 	Your browser does not support the video tag.
</video>

#### Llamado a la API

Los siguientes son ejemplos de los cuerpos de la petición y la respuesta de este método de pago.


{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo de una Solicitud:
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
            "message" : "{\"signature\":\"MEUCIQCSsfd63AcUEjNRnpgqEm/B6cm8Fna1ty+HatD4Hqp/bgIgHCtrwKhvO1e5K3vDfE6FxqSaRkP9PHuY63aQ35gV5lk\\u003d\",\"intermediateSigningKey\":{\"signedKey\":\"{\\\"keyValue\\\":\\\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAExtzNORa//EJphgvdpUTsDElAg26mYXxNqs8/UX7DDSDCojJ/2+GCf8CVmClyRM+bukNsYM82pwkjZqOe5AOxUg\\\\u003d\\\\u003d\\\",\\\"keyExpiration\\\":\\\"1695147545256\\\"}\",\"signatures\":[\"MEQCIAxxj2BnQzTyTXLzjJ08JG+s1qdmX1XlOxzFmq1THTJ4AiAe7anOO7l+KZ1nkbGBufXBuQGInFMGR70+I33EyCL5GQ\\u003d\\u003d\"]},\"protocolVersion\":\"ECv2\",\"signedMessage\":\"{\\\"encryptedMessage\\\":\\\"GNKqqZ7bx6btPTkZPjpvi1IHKS79JrdtOI3bRZA6G5936ofXqD/m3f/YpuF4mlADkHIhmBYVq6hzyA0B4M1cjht7BFsQhE5fqA+6PgbPY6eAqaH4PPQGt/3VM9uVxmtcJK6k2JL8N7CCF85vx6s+LASH4wwO3Sk2NIlPB0B2QHdfdrOpwo5r6T3xYJAq6wHqFNrdOLq5NTodDqEaXP3y/kB1eIMrwcz5cPGJAPSmL2RebBofsl5QFJdVUmeXXSS7nQ4aeQpuqCcoI/NqLb5r3bEaq33pbglfv2YyyHK1ERlET3TsTR+rGBcJXv9JLh2ZhdoUJYDkDqP+f+65Fn3/xRppfXbwNCrCnO+DvVsgZTFp7cj69WA6uWBeYM4HejKa1BUpt8TfP132FjaUSnwSlykkJhHK5svQFxf2rpJGFdmz4d06iLREy/N+27pyE9eJeJohO2JJXaVTQgICmVNvGefR4KaNELpxeNAzuhKQsTZBYQY179zveNg4EQqai3CxKIr09G/MwpMufTWEBm2rsk6HqTh1Qz+d72aph3U3bRQVhFj3ZE2ZsIXIc7dwCLGV\\\",\\\"ephemeralPublicKey\\\":\\\"BNgz4XETGJgixJYrYHLXjQrRaZ9i2q2Z2uGTOFNuVY5ZiCFiSJeiP0l+dt+Y0r8I29l5F2Lwd+e8torE3vSMm9g\\\\u003d\\\",\\\"tag\\\":\\\"NUJPbcTwbfWBC3ByHzcwQz/bEsbt80vh1ahXoRY4xAQ\\\\u003d\\\"}\"}"
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
             <message>{"signature":"MEUCIQCSsfd63AcUEjNRnpgqEm/B6cm8Fna1ty+HatD4Hqp/bgIgHCtrwKhvO1e5K3vDfE6FxqSaRkP9PHuY63aQ35gV5lk\u003d","intermediateSigningKey":{"signedKey":"{\"keyValue\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAExtzNORa//EJphgvdpUTsDElAg26mYXxNqs8/UX7DDSDCojJ/2+GCf8CVmClyRM+bukNsYM82pwkjZqOe5AOxUg\\u003d\\u003d\",\"keyExpiration\":\"1695147545256\"}","signatures":["MEQCIAxxj2BnQzTyTXLzjJ08JG+s1qdmX1XlOxzFmq1THTJ4AiAe7anOO7l+KZ1nkbGBufXBuQGInFMGR70+I33EyCL5GQ\u003d\u003d"]},"protocolVersion":"ECv2","signedMessage":"{\"encryptedMessage\":\"GNKqqZ7bx6btPTkZPjpvi1IHKS79JrdtOI3bRZA6G5936ofXqD/m3f/YpuF4mlADkHIhmBYVq6hzyA0B4M1cjht7BFsQhE5fqA+6PgbPY6eAqaH4PPQGt/3VM9uVxmtcJK6k2JL8N7CCF85vx6s+LASH4wwO3Sk2NIlPB0B2QHdfdrOpwo5r6T3xYJAq6wHqFNrdOLq5NTodDqEaXP3y/kB1eIMrwcz5cPGJAPSmL2RebBofsl5QFJdVUmeXXSS7nQ4aeQpuqCcoI/NqLb5r3bEaq33pbglfv2YyyHK1ERlET3TsTR+rGBcJXv9JLh2ZhdoUJYDkDqP+f+65Fn3/xRppfXbwNCrCnO+DvVsgZTFp7cj69WA6uWBeYM4HejKa1BUpt8TfP132FjaUSnwSlykkJhHK5svQFxf2rpJGFdmz4d06iLREy/N+27pyE9eJeJohO2JJXaVTQgICmVNvGefR4KaNELpxeNAzuhKQsTZBYQY179zveNg4EQqai3CxKIr09G/MwpMufTWEBm2rsk6HqTh1Qz+d72aph3U3bRQVhFj3ZE2ZsIXIc7dwCLGV\",\"ephemeralPublicKey\":\"BNgz4XETGJgixJYrYHLXjQrRaZ9i2q2Z2uGTOFNuVY5ZiCFiSJeiP0l+dt+Y0r8I29l5F2Lwd+e8torE3vSMm9g\\u003d\",\"tag\":\"NUJPbcTwbfWBC3ByHzcwQz/bEsbt80vh1ahXoRY4xAQ\\u003d\"}"}</message>
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

Ejemplo de una Respuesta:
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


Encuentra la descripción del objeto transaction.digitalWallet y sus campos en la sección de [Parámetros](https://developers.payulatam.com/latam/es/docs/integrations/api-integration/payments-api-brazil.html#parameters-for-request-and-response).


## Enviar Transacciones Utilizando PIX {#submit-transactions-using-pix}

Este método te permite procesar pagos utilizando PIX. Para integrarte con PIX necesitas mostrar un código QR en tu checkout para que tu cliente lo pueda leer con su teléfono inteligente y realizar el pago.

Al final, tu cliente ve una página de checkout como esta.

![PrintScreen](/assets/Payments/PixCheckout.png)

### ¿Cómo Funciona PIX? {#how-does-pix-work}

PIX es un método de pago de transferencia en línea lanzado en noviembre del 2020 por el Banco Central Brasilero (_Banco Central do Brasil_ - BACEN) que te permite hacer y recibir transferencias sin importar el banco emisor de tu cuenta.

A diferencia de otros métodos en efectivo o de transferencia, PIX te permite recibir el dinero inmediatamente sin compartir tu número de cuenta; en cualquier hora y en cualquier día. Los fondos recibidos utilizando este método de pago aparecerán en tu cuenta PayU en cuestión de segundos. 

Pix tiene dos partes:

* Llave PIX: identificador único de una cuenta bancaria o de pago en el Sistema Bancario Brasilero. Tu llave puede ser generada utilizando cualquiera de los siguientes valores:
   - Identificador tributario (CPF o CNPJ).
   - Correo electrónico
   - Número de teléfono
   - Llave aleatoria

* Código QR: este código lo lee tu cliente utilizando su teléfono y realiza el pago.

### Parámetros para la Solicitud y la Respuesta {#parameters-for-request-and-response-1}

<details>
<summary>Solicitud</summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Mostrar solo campos obligatorios</label>
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
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Estado de la dirección. Para Brasil, solo debes enviar dos caracteres, por ejemplo, asigna `SP` para São Paulo. | No |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | País de la dirección. | No |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Código postal de la dirección. Para Brasil, utiliza el formato `XXXXX-XXX` o `XXXXXXXX`. Ejemplo: `09210-710` o `09210710`. | No |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | No |
| transaction > order > buyer | Objeto |  | Información del comprador. | Sí |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Identificador del comprador en tu sistema. | No |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Nombre del comprador. | No |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | Correo electrónico de comprador. | Sí |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Teléfono del comprador. | Sí |
| transaction > order > buyer > dniType | Alfanumérico | 2 | Tipo de identificación del comprador. [Ver tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sí |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Número de identificación del comprador. Debes utilizar un algoritmo para validar el CPF y debe tener el siguiente formato `XXX.XXX.XXX-XX`. Ejemplo: `811.807.405-64`. | Sí |
| transaction > order > buyer > cnpj | Alfanumérico | Max:14 | Número de identificación del comprador (Para persona jurídica en Brasil). Debes utilizar un algoritmo para validar el CNPJ y debe tener el siguiente formato `XXXXXXXXXXXXXX`. Ejemplo: `32593371000110`. | Sí |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Dirección de envío del comprador. | No |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Línea de dirección 1 del comprador. | No |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección del comprador. | No |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Estado de la dirección del comprador. Para Brasil, solo debes enviar dos caracteres, por ejemplo, asigna `SP` para São Paulo. | No |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | No |
| transaction > order > buyer > shippingAddress > postalCode | Numérico | Max:20 | Código postal de la dirección del comprador. Para Brasil, utiliza el formato `XXXXX-XXX` o `XXXXXXXX`. Ejemplo: `09210-710` o `09210710`. | No |
| transaction > order > buyer > shippingAddress > phone | Numérico | Max:20 | Teléfono asociado a la dirección del comprador. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | No |
| transaction > order > additionalValues > | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Monto de la transacción. | Sí |
| transaction > order > additionalValues > TX_VALUE > value | Numérico | 12, 2 | Especifica el monto de la transacción, este valor puede tener dos dígitos decimales (Ej. `10000.00` o `10000`). | Sí |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Monto del impuesto a las ventas. | No |
| transaction > order > additionalValues > TX_TAX > value | Numérico | 12, 2 | Especifica el monto del impuesto.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para calcular el impuesto.<br>Si el monto no tiene impuesto, envía 0.<br>Este valor puede tener dos dígitos decimales.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Numérico | 12, 2 | Especifica el monto base de la transacción. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > payer | Objeto |  | Información del pagador. | Sí |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Correo electrónico del pagador. | No |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identificador del pagador en tu sistema. | No |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nombre del pagador. | Sí |
| transaction > payer > billingAddress | Objeto |  | Dirección de facturación. | No |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Línea 1 de la dirección de facturación. | No |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Línea 2 de la dirección de facturación. | No |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección de facturación. | No |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Estado de la dirección de facturación. Para Brasil, solo debes enviar dos caracteres, por ejemplo, asigna `SP` para São Paulo. | No |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | No |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Código postal de la dirección de facturación. Para Brasil, utiliza el formato `XXXXX-XXX` or ´. Ejemplo: `09210-710` o `09210710`. | No |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | No |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Fecha de nacimiento del pagador. | No |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Número de teléfono del pagador. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | No |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Número de identificación del pagador. Debes utilizar un algoritmo para validar el CPF y debe tener el siguiente formato `XXX.XXX.XXX-XX`. Ejemplo: `811.807.405-64`. | No |
| transaction > payer > cnpj | Alfanumérico | Max:14 | Número de identificación del comprador (Para persona jurídica en Brasil). Debes utilizar un algoritmo para validar el CNPJ y debe tener el siguiente formato `XXXXXXXXXXXXXX`. Ejemplo: `32593371000110`. | No |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificación del comprador. [Ver tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alfanumérico | 32 | Como los pagos con PIX se realizan utilizando el teléfono móvil del pagador, la única transacción disponible es `AUTHORIZATION_AND_CAPTURE`. | Sí |
| transaction > paymentMethod | Alfanumérico | 32 | Asigna `PIX` para este método de pago. Si quieres ver otros métodos de pago, consulta [Métodos de pago para Brasil]({{< ref "select-your-payment-method.html#Brazil" >}}). | Sí |
| transaction > paymentCountry | Alfanumérico | 2 | Asigna `BR` para Brasil. | Sí |
| transaction > deviceSessionId | Alfanumérico | Max:255 | Identificador de la sesión del dispositivo donde el cliente realiza la transacción. Para más información, consulta [este artículo]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| transaction > ipAddress | Alfanumérico | Max:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > extraParameters | Objeto |  | Parámetros adicionales o datos asociados a la petición. El tamaño máximo de cada nombre de _extraParameters_ es 64 caracteres.<br>En JSON, El parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"PARAMETER_NAME": "VALUE"`<br>`}`<br><br>En XML, El parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>PARAMETER_NAME</string>`<br>&emsp;&emsp;`<string>VALUE</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`<br>_Envía el tipo de datos respectivo_  | No |

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
| transactionResponse > state | Alfanumérico | Max:32 | Estado de la transacción. Como el pago es realizado por el usuario en su teléfono móvil, el estado de una transacción exitosa es `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | Código de respuesta retornado por la red bancaria. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | Mensaje de error retornado por la red bancaria. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | Código de trazabilidad retornado por la red bancaria. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | Código de autorización retornado por la red bancaria. |
| transactionResponse > pendingReason | Alfanumérico | Max:21 | Código de la razón asociada con el estado, como se mencionó en  `transactionResponse > state`, la transacción está en espera del pago. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | Código de respuesta asociado con el estado. En este caso, para una transacción exitosa es `PENDING_PAYMENT_IN_ENTITY`. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Mensaje asociado al código de respuesta. |
| transactionResponse > operationDate | Fecha |  | Fecha de creación de la respuesta en el sistema de PayU. |
| transactionResponse > extraParameters | Objeto |  | Parámetros adicionales o datos asociados con la respuesta.<br>En JSON, El parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"EXPIRATION_DATE": "1627488070000"`<br>`}`<br><br>En XML, El parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>EXPIRATION_DATE</string>`<br>&emsp;&emsp;`<int>1627488070000</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Consideraciones {#considerations-3}

* Los pagos procesados a través de nuestra pasarela serán para PayU en nombre de tu comercio.
* Si tu comercio no tiene una entidad local, es obligatorio enviar tanto el CPF (parámetro `transaction.[payer|buyer].dniNumber`) o el CNPJ (parámetro `transaction.[payer|buyer].cnpj`).
* Para configurar el tiempo de vencimiento del código QR, comunícate con tu representante de ventas. El tiempo máximo que puede solicitar es de un día.<br>De forma predeterminada, el tiempo de vencimiento es de dos (2) horas.
* El monto mínimo que puedes procesar con PIX es de R$1.00, el monto máximo depende de tu cliente y de su banco.
* El parámetro `transaction.payer.fullName` es obligatorio para crear la petición.
* El código QR y la llave PIX key utilizada para recibir pago es generada por PayU, no se soporta configurar tu propio código QR ni tu llave PIX. Sin embargo, el monto total de la transacción menos la tarifa de procesamiento es transferida a tu cuenta de PayU.
* Para consultar un código activo de tu transacción, utiliza el [API de consultas]({{< ref "Queries-API.md" >}}).
* El parámetro `transactionResponse.extraParameters` Tiene los siguientes parámetros relacionados con la transacción:
   - **EXPIRATION_DATE**: fecha de expiración del pago.
   - **QRCODE_EMV**: código que se debe pegar en el portal del banco para realizar el pago. Este código es utilizado cuando el cliente no puede leer el código QR.
   - **QRCODE_IMAGE_BASE64**: imagen dl código QR. Este campo es una cadena de caracteres codificada en Base 64.

{{% alert title="Nota" color="info"%}}

Se recomienda mostrar en tu Checkout tanto la imagen del código QR (parámetro `QRCODE_IMAGE_BASE64` decodificado) como la cadena del código (parámetro` QRCODE_EMV`) para evitar deserciones de pago.

{{% /alert %}}

### Llamado a la API {#api-call}

Los siguientes son los cuerpos de la petición y la respuesta para este método de pago.

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo de una Solicitud:
```JSON
{
   "language": "pt",
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
         "language": "pt",
         "signature": "fbc089272288edc52c332395d9566f4c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "BRL"
            }
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
      "payer": {
         "fullName":"Payer Name",
         "emailAddress": "buyer_test@test.com",
         "contactPhone": "55 12345678901",
         "dniType": "CPF",
         "dniNumber": "653.098.319-83"
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "PIX",
      "paymentCountry": "BR",
      "ipAddress": "127.0.0.1"
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
    "orderId": 120000260,
    "transactionId": "e82ace4c-647b-457d-b4f5-136c921445b6",
    "state": "PENDING",
    "paymentNetworkResponseCode": null,
    "paymentNetworkResponseErrorMessage": null,
    "trazabilityCode": "9c7d3f2d-6c2c-436c-a06d-e6f99271ff3f",
    "authorizationCode": null,
    "pendingReason": "AWAITING_PAYMENT_IN_ENTITY",
    "responseCode": "PENDING_PAYMENT_IN_ENTITY",
    "errorCode": null,
    "responseMessage": null,
    "transactionDate": null,
    "transactionTime": null,
    "operationDate": 1627473671920,
    "referenceQuestionnaire": null,
    "extraParameters": {
      "EXPIRATION_DATE": 1627488070000,
      "QRCODE_EMV": "00020101021126950014BR.GOV.BCB.PIX2573spi.dev.cloud.itau.com.br/documentos/198e49c5-2330-4ad7-9d0b-967c7b5371225204000053039865802BR5923PMD Gotham NegA cios ME6009SAO PAULO62410503***50300017BR.GOV.BCB.BRCODE01051.0.063040866",
      "QRCODE_IMAGE_BASE64": "iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6AQAAAACgl2eQAAADCUlEQVR4Xu2XUW4cIRBE6YvA/W+Ro8BFIPWKsWU5kpWPbOVn8SaZhWep1F1dTNr5ef1q33e+rTdw1xu466+A2VqtXbuP3etMPY9zlrdjwPLnrNm1NceaNXtv426nAOliqw5K+1io3IBhoFyZsWuaE/UfgM1h0xpzTMqUBfRxXZB2ONylhy/Nej0wMe2fi+0Y4KUend1omcZHR7vufgigNMzLEDXFbL63Pj6bFQBkld57MS0KkEWfdhOg3sWAI0mYRUIJMkvGwq5VCJhWtwkwAWoXIcJvjRxw9WnL/YKQWxejPGKAxvZgEHWoBKlhErztmBhgafaMXCtqWKVDJQYc2oNndY5llncEspUDlOFFrXRA23QiUl9jwB7aPvhkoE5UGeQxBlyFLEaXCbrW+XT16wGe9Kcsk25JsH/oWgjw9PbGge+ysdAtgRAhwNm1iW+rXN5pV2oMuEaVTHlXL30iFaySXU+hAsBGpJulzAAclE3geEQGAIzCfcKrFv7VEVna3LAQMIcNyiue7lKSg1ppQ0OcAshPWWT4amNtarb4GgN8qcmwvlAk8qNRtC4GuEVKLn13fKlUUuxepQC+C9NWJ9ZlHRu5iLMUMPGrdhkZLKwLpvQfoXvXhoCDzsZP0beFgagefgkC0yWiVbxqFBmmn/Xh6tcDyxnGtUpskJ/Mb0dpDGBQnSJSJ7NKHYahaR+Fej3wWMSqMI/+Utmkmm6lgCewfICwmyPdHg4BGtRBkHp+m29VqbPyHCCPKL+pFzpJUiZIep9CBQAnOZ+nQwu3TP8bAybjqvJgkyI+DjLF07gQ4M5wXEibvtod5u0RGQDYKhhZFX3ca9hYuRID9GbDidql+kgt/eKCpYMpwGaVIAZGAaKObZyL1BygxTMgMUKXuOEXbQwBFEWaOt4tusQW/eKXQsDic0vE+17njA4SrjFg8n43XCwbZQsdfooCC4eSJJoXJVkRYJ/NSgHEOBIJ8wtYeAzQh0HpCjLop3GDeU4BtEU2kUpXR1YhQqlXDvhxvYG73sBd/wD4Df7+v4eqIoYgAAAAAElFTkSuQmCC"
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
   <language>pt</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <accountId>512327</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-17T19:11:57.179Z</referenceCode>
         <description>payment test</description>
         <language>pt</language>
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
         <buyer>
            <contactPhone>7563126</contactPhone>
            <dniNumber>811.807.405-64</dniNumber>
            <cnpj>32593371000110</cnpj>
            <emailAddress>buyer_test@test.com</emailAddress>
            <fullName>First name and second buyer name</fullName>
            <merchantBuyerId>1</merchantBuyerId>
            <shippingAddress>
               <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>            
               <city>Manaos</city>
               <state>SP</state>               
               <country>BR</country>
               <postalCode>10012545</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>            
               <city>Manaos</city>
               <state>SP</state>               
               <country>BR</country>
                <postalCode>10012545</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <contactPhone>55 12345678901</contactPhone>
         <dniNumber>653.098.319-83</dniNumber>
         <dniType>CPF</dniType>
         <emailAddress>buyer_test@test.com</emailAddress>
         <fullName>Payer Name</fullName>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>PIX</paymentMethod>
      <paymentCountry>BR</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
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
        <orderId>1181965893</orderId>
        <transactionId>8397992b-3717-49c5-92ee-345a65ff13cf</transactionId>
        <state>PENDING</state>
        <trazabilityCode>e0a52a20-6ae2-4970-9b81-47f208bbf40e</trazabilityCode>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <operationDate>2021-10-08T12:14:15</operationDate>
        <extraParameters>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-10-08T18:14:13</date>
            </entry>
            <entry>
                <string>QRCODE_EMV</string>
                <string>00020101021226770014BR.GOV.BCB.PIX2555api.itau/pix/qr/v2/8ccd84ae-0c8d-4f71-8abf-b676a666bf9f5204000053039865802BR5911PAYU BRASIL6009SAO PAULO62070503***6304E404</string>
            </entry>
            <entry>
                <string>QRCODE_IMAGE_BASE64</string>
                <string>iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6AQAAAACgl2eQAAAC0ElEQVR4Xu2XW27cMAxFpY1I+99FlyJtRO45VFIrUyDoR8z+DDEPj3QMMCTvlVOu7+NXeV15iTew4w3seAM7/g0YpdTJ92p1lTpKveY1XUwE2JyT3TnnqF6WFnd4UxowKq/R56qrldZH68uVfIDc+mqktyBb/w/A6vSMXtms0kePxUyAl79t2AVKyWYsJgIxtK/x11S/xs8CH0GOrJEh7+WmkQWMPpjW3aWYFybY8b3/iucBqtLwjn4txsWSIRs13BMB80E2zqrqoUyle08qQFV6zK0UqfpuXiYC5OQu9sXqMmGRW7wJwBykMxCuWdosb6Fcf5JMAJAMFo5e9HFHZtvaXagEYG7n4kDzHMHRi656NCsBcErJLIQLZc56+t2sDECJ+IF1TWNtI7uTfB64LEswJQR8sYV4j24+Dww9nCeLzzpFo0LHeQCIBO8aEtZYQ0KJgJ4pwsB4qpic2rGFaYC9Kj5k9Rk1o2DSIxMgIxdCL2SMlTq+425WBjCqZ5idwkb57ZeLiYBaoVlLH9lDIzcPdT8PRJkUSkiG3OJ4+9KsxwH2PE/YVi+OjeI5DpQEYDgmJQ73poThMNR1NOt5YKqZmFObxMfSQ5RPHsCkVPfYIMsisLwjE2BqL/eKeZmxvZqHeBOAuX8iGZKjT1g5rTqb9TzADu5hTvYo3ItUj2YlAGywHk3D08ltWKuzks8DeNfSwxwUL6NSX9X9PIBtqBpey+cM9snbtTzg2koZrkz/K3OM19ms5wHr08JM9fHqR+vx+J0IOKXTXTanQ4yU0dGVCAwFa5rVR4zlBb/5SAQMc3R6PelXqGee4n0cMKHl814Ixvy63j4yAdKbnufD2iiYj/M1FRjhGaGd4qMO8/qlWUlAjE1MK7BCqldEJqBfUCwa5NV0fpZMGhDNas2xwTlIUU87zDwBiMZooFZIIYsq4UTgu3gDO97Ajjew4weA30GD9ELLE47fAAAAAElFTkSuQmC</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>

```

{{< /tab >}}
{{< /tabs >}}

## Enviar Transacciones Utilizando Efectivo {#submit-transactions-using-cash}

Este método te permite procesar los pagos en efectivo de tus clientes. Para integrarte con las transacciones en efectivo, debes redirigir a tu cliente a la URL que se encuentra en la respuesta; tu cliente ve un recibo de pago como el siguiente.

<img src="/assets/Payments/CashReceiptBR.png" alt="PrintScreen" width="50%">

### Parámetros para la Solicitud y la Respuesta {#parameters-for-request-and-response-2}

<details>
<summary>Solicitud</summary>
<label for="table3" class="showMandatory"><input type="checkbox" id="table3" name="table3" value="true" onchange="showMandatory(this)"> Mostrar solo campos obligatorios</label>
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
| transaction > order > notifyUrl | Alfanumérico | Max:2048 | URL de confirmación de la orden. | Sí |
| transaction > order > partnerId | Alfanumérico | Max:255 | ID de aliado dentro de PayU. | Sí |
| transaction > order > signature | Alfanumérico | Max:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| transaction > order > shippingAddress | Objeto |  | Dirección de envío. | No |
| transaction > order > shippingAddress > street1 | Alfanumérico | Max:100 | Línea de dirección 1. | No |
| transaction > order > shippingAddress > street2 | Alfanumérico | Max:100 | Línea de dirección 2. | No |
| transaction > order > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección. | No |
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Estado de la dirección. Para Brasil, solo debes enviar dos caracteres, por ejemplo, asigna `SP` para São Paulo. | No |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | País de la dirección. | No |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Código postal de la dirección. Para Brasil, utiliza el formato `XXXXX-XXX` o `XXXXXXXX`. Ejemplo: `09210-710` o `09210710`. | No |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | No |
| transaction > order > buyer | Objeto |  | Información del comprador. | Sí |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Identificador del comprador en tu sistema. | No |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Nombre del comprador. | Sí |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | Correo electrónico de comprador. | Sí |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Teléfono del comprador. | Sí |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Número de identificación del comprador. Debes utilizar un algoritmo para validar el CPF y debe tener el siguiente formato `XXX.XXX.XXX-XX`. Ejemplo: `811.807.405-64`. | Sí |
| transaction > order > buyer > cnpj | Alfanumérico | Max:14 | Número de identificación del comprador (Para persona jurídica en Brasil). Debes utilizar un algoritmo para validar el CNPJ y debe tener el siguiente formato `XXXXXXXXXXXXXX`. Ejemplo: `32593371000110`. | Sí |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Línea de dirección 1 del comprador. |  Sí |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Estado de la dirección del comprador. Para Brasil, solo debes enviar dos caracteres, por ejemplo, asigna `SP` para São Paulo. | Sí |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| transaction > order > buyer > shippingAddress > postalCode | Numérico | Max:20 | Código postal de la dirección del comprador. Para Brasil, utiliza el formato `XXXXX-XXX` o `XXXXXXXX`. Ejemplo: `09210-710` o `09210710`. | Sí |
| transaction > order > buyer > shippingAddress > phone | Numérico | Max:20 | Teléfono asociado a la dirección del comprador. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | Sí |
| transaction > order > additionalValues > | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Monto de la transacción. | Sí |
| transaction > order > additionalValues > TX_VALUE > value | Numérico | 12, 2 | Especifica el monto de la transacción, este valor puede tener dos dígitos decimales (Ej. `10000.00` o `10000`). | Sí |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Monto del impuesto a las ventas. | Sí |
| transaction > order > additionalValues > TX_TAX > value | Numérico | 12, 2 | Especifica el monto del impuesto.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para calcular el impuesto.<br>Si el monto no tiene impuesto, envía 0.<br>Este valor puede tener dos dígitos decimales.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Numérico | 12, 2 | Especifica el monto base de la transacción. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > payer | Objeto |  | Información del pagador. Esta información es opcional. | No |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Correo electrónico del pagador. | No |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identificador del pagador en tu sistema. | No |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nombre del pagador. | No |
| transaction > payer > billingAddress | Objeto |  | Dirección de facturación. | No |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Línea 1 de la dirección de facturación. | No |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Línea 2 de la dirección de facturación. | No |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección de facturación. | No |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Estado de la dirección de facturación. Para Brasil, solo debes enviar dos caracteres, por ejemplo, asigna `SP` para São Paulo. | No |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | No |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Código postal de la dirección de facturación. Para Brasil, utiliza el formato `XXXXX-XXX` or ´. Ejemplo: `09210-710` o `09210710`. | No |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | No |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Fecha de nacimiento del pagador. | No |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Número de teléfono del pagador. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | No |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Número de identificación del pagador. Debes utilizar un algoritmo para validar el CPF y debe tener el siguiente formato `XXX.XXX.XXX-XX`. Ejemplo: `811.807.405-64`. | No |
| transaction > payer > cnpj | Alfanumérico | Max:14 | Número de identificación del comprador (Para persona jurídica en Brasil). Debes utilizar un algoritmo para validar el CNPJ y debe tener el siguiente formato `XXXXXXXXXXXXXX`. Ejemplo: `32593371000110`. | No |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificación del comprador. [Ver tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alfanumérico | 32 | Como los pagos en efectivo se realizan en oficinas físicas, La única transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sí |
| transaction > paymentMethod | Alfanumérico | 32 | Seleccione un método de pago en efectivo válido. [Ver los métodos de pago disponibles para Brasil]({{< ref "select-your-payment-method.html#Brazil" >}}). | Sí |
| transaction > paymentCountry | Alfanumérico | 2 | Asigna `BR` para Brasil. | Sí |
| transaction > expirationDate | Alfanumérico | 23 | Fecha y hora máxima en la que el cliente puede realizar el pago. Formato `YYYY-MM-DDTHH:MM:SS`, por ejemplo `2021-06-12T16:07:11.586`. | No |
| transaction > ipAddress | Alfanumérico | Max:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |

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
| transactionResponse > state | Alfanumérico | Max:32 | Estado de la transacción. Como el pago es realizado por el usuario en una oficia física, el estado de una transacción exitosa es `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | Código de respuesta retornado por la red bancaria. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | Mensaje de error retornado por la red bancaria. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | Código de trazabilidad retornado por la red bancaria. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | Código de autorización retornado por la red bancaria. |
| transactionResponse > pendingReason | Alfanumérico | Max:21 | Código de la razón asociada con el estado, como se mencionó en  `transactionResponse > state`, la transacción está en espera del pago. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | Código de respuesta asociado con el estado. En este caso, para una transacción exitosa es `PENDING_TRANSACTION_CONFIRMATION`. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Mensaje asociado al código de respuesta. |
| transactionResponse > operationDate | Fecha |  | Fecha de creación de la respuesta en el sistema de PayU. |
| transactionResponse > extraParameters | Objeto |  | Parámetros adicionales o datos asociados con la respuesta.<br>En JSON, El parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"REFERENCE": "74794"`<br>`}`<br><br>En XML, El parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>REFERENCE</string>`<br>&emsp;&emsp;`<int>74794</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Consideraciones {#considerations-4}

* Si tu comercio no tiene una entidad local, es obligatorio enviar tanto el CPF (parámetro `transaction.[payer|buyer].dniNumber`) o el CNPJ (parameter `transaction.[payer|buyer].cnpj`).
* El parámetro `transaction.expirationDate` no es obligatorio. Si no envías este parámetro, su valor por defecto es siete (7) días luego de la fecha actual.<br>Si envías una fecha posterior a dicho número de días, PayU ignorará este valor y asignará el valor por defecto.
* El paso se ve reflejado al siguiente día hábil.
* El parámetro `transactionResponse.extraParameters` Tiene los siguientes parámetros relacionados con la transacción:
   - **URL_PAYMENT_RECEIPT_HTML**: recibo de pago en formato HTML. TAquí es donde debe redirigir el pago cuando el pagador selecciona un método de pago en efectivo. 
   - **URL_BOLETO_BANCARIO**: recibo de pago en formato de impresión.
   - **EXPIRATION_DATE**: fecha máxima en la que el pagador puede realizar el pago.
   - **BAR_CODE**: Código de barras que le permite al pagador realizar el pago. 

### Llamado a la API {#api-call-1}

Los siguientes son los cuerpos de la petición y la respuesta para este método de pago.

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}
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
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "BOLETO_BANCARIO",
      "expirationDate": "2021-06-19T21:57:12.559",
      "paymentCountry": "BR",
      "ipAddress": "127.0.0.1"
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
    "orderId": 43626780,
    "transactionId": "63091676-673d-46bf-a283-54e686ba0238",
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
    "extraParameters": {
      "URL_PAYMENT_RECEIPT_HTML": "https://gateway.payulatam.com/ppp-web-gateway/bl.zul?transactionId=63091676-673d-46bf-a283-54e686ba0238&orderId=43626780&signature=647b061ddef2a25fd19cb362860e1d21ef59e16a",
      "EXPIRATION_DATE": 1399507200000,
      "URL_BOLETO_BANCARIO": "https://gateway.payulatam.com/ppp-web-gateway/bl.zul?transactionId=63091676-673d-46bf-a283-54e686ba0238&orderId=43626780&signature=647b061ddef2a25fd19cb362860e1d21ef59e16a",
      "BAR_CODE": "34191.75389 38894.912930 81898.480009 9 60560000010000"
    }
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
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>BOLETO_BANCARIO</paymentMethod>
      <expirationDate>2021-06-19T21:57:12.559</expirationDate>
      <paymentCountry>BR</paymentCountry>
      <ipAddress>127.0.0.1</ipAddress>
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
      <orderId>43625300</orderId>
      <transactionId>89ff03a7-9f86-4193-a25d-94b758c135bb</transactionId>
      <state>PENDING</state>
      <pendingReason>AWAITING_NOTIFICATION</pendingReason>
      <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
      <extraParameters>
         <entry>
            <string>URL_PAYMENT_RECEIPT_HTML</string>
            <string>https://gateway.payulatam.com/ppp-web-gateway/bl.zul?transactionId=89ff03a7-9f86-4193-a25d-94b758c135bb&orderId=43625300&signature=e9e89a2cd8d9d2d79d637eac84debae9012584de</string>
         </entry>
         <entry>
            <string>EXPIRATION_DATE</string>
            <date>2014-05-08T00:00:00</date>
         </entry>
         <entry>
            <string>URL_BOLETO_BANCARIO</string>
            <string>https://gateway.payulatam.com/ppp-web-gateway/bl.zul?transactionId=89ff03a7-9f86-4193-a25d-94b758c135bb&orderId=43625300&signature=e9e89a2cd8d9d2d79d637eac84debae9012584de</string>
         </entry>
         <entry>
            <string>BAR_CODE</string>
            <string>34191.75389 38894.752930 81898.480009 3 60570000010000</string>
         </entry>
      </extraParameters>
   </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Enviar Transacciones Utilizando Transferencia Bancaria {#submit-transactions-using-bank-transfer}

Este método te permite procesar los pagos realizados por tus clientes por medio de transferencia bancaria. Cuando utilices este método de pago, el pagador realiza una transferencia desde su cuenta bancaria emitida por ITAU.<br>
Para integrarte con estas transacciones, debes redirigir a tu cliente a la URL que se encuentra en la respuesta del método.

<img src="/assets/Payments/BankTransferReceiptBR.png" alt="PrintScreen" width="50%">

### Parámetros para la Solicitud y la Respuesta {#parameters-for-request-and-response-3}

<details>
<summary>Solicitud</summary>
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
| transaction > order > notifyUrl | Alfanumérico | Max:2048 | URL de confirmación de la orden. | No|
| transaction > order > partnerId | Alfanumérico | Max:255 | ID de aliado dentro de PayU. | No |
| transaction > order > signature | Alfanumérico | Max:255 | Firma asociada al formulario. Para más información, consulta [Firma de autenticación]({{< ref "integrations.html#authentication-signature" >}}). | Sí |
| transaction > order > shippingAddress | Objeto |  | Dirección de envío. | No |
| transaction > order > shippingAddress > street1 | Alfanumérico | Max:100 | Línea de dirección 1. | No |
| transaction > order > shippingAddress > street2 | Alfanumérico | Max:100 | Línea de dirección 2. | No |
| transaction > order > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección. | No |
| transaction > order > shippingAddress > state | Alfanumérico | Max:40 | Estado de la dirección. | No |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | País de la dirección. | No |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Max:8 | Código postal de la dirección. Para Brasil, utiliza el formato `XXXXX-XXX` o `XXXXXXXX`. Ejemplo: `09210-710` o `09210710`. | No |
| transaction > order > shippingAddress > phone | Alfanumérico | Max:11 | Número de teléfono asociado a la dirección. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | No |
| transaction > order > buyer | Objeto |  | Información del comprador. | Sí |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Max:100 | Identificador del comprador en tu sistema. | No |
| transaction > order > buyer > fullName | Alfanumérico | Max:150 | Nombre del comprador. | Sí |
| transaction > order > buyer > emailAddress | Alfanumérico | Max:255 | Correo electrónico de comprador. | Sí |
| transaction > order > buyer > contactPhone | Alfanumérico | Max:20 | Teléfono del comprador. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | Sí |
| transaction > order > buyer > dniNumber | Alfanumérico | Max:20 | Número de identificación del comprador. Debes utilizar un algoritmo para validar el CPF y debe tener el siguiente formato `XXX.XXX.XXX-XX`. Ejemplo: `811.807.405-64`. | Sí |
| transaction > order > buyer > cnpj | Alfanumérico | Max:14 | Número de identificación del comprador (Para persona jurídica en Brasil). Debes utilizar un algoritmo para validar el CNPJ y debe tener el siguiente formato `XXXXXXXXXXXXXX`. Ejemplo: `32593371000110`. | Sí |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Dirección de envío del comprador. | Sí |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Max:150 | Línea de dirección 1 del comprador. | Sí |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Max:40 | Estado de la dirección del comprador. | Sí |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País de la dirección del comprador en formato ISO 3166 alpha-2. | Sí |
| transaction > order > buyer > shippingAddress > postalCode | Numérico | Max:20 | Código postal de la dirección del comprador. Para Brasil, utiliza el formato `XXXXX-XXX` o `XXXXXXXX`. Ejemplo: `09210-710` o `09210710`. | Sí |
| transaction > order > buyer > shippingAddress > phone | Numérico | Max:20 | Teléfono asociado a la dirección del comprador. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | Sí |
| transaction > order > additionalValues > | Objeto | 64 | Monto de la orden y sus valores asociados. | Sí |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Monto de la transacción. | Sí |
| transaction > order > additionalValues > TX_VALUE > value | Numérico | 12, 2 | Especifica el monto de la transacción, este valor puede tener dos dígitos decimales (Ej. `10000.00` o `10000`). | Sí |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Monto del impuesto a las ventas. | Sí |
| transaction > order > additionalValues > TX_TAX > value | Numérico | 12, 2 | Especifica el monto del impuesto.  | No |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para calcular el impuesto.<br>Si el monto no tiene impuesto, envía 0.<br>Este valor puede tener dos dígitos decimales.  | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Numérico | 12, 2 | Especifica el monto base de la transacción. | No |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO de la moneda. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | No |
| transaction > payer | Objeto |  | Información del pagador. | No |
| transaction > payer > emailAddress | Alfanumérico | Max:255 | Correo electrónico del pagador. | No |
| transaction > payer > merchantPayerId | Alfanumérico | Max:100 | Identificador del pagador en tu sistema. | No |
| transaction > payer > fullName | Alfanumérico | Max:150 | Nombre del pagador. | No |
| transaction > payer > billingAddress | Objeto |  | Dirección de facturación. | No |
| transaction > payer > billingAddress > street1 | Alfanumérico | Max:100 | Línea 1 de la dirección de facturación. | No |
| transaction > payer > billingAddress > street2 | Alfanumérico | Max:100 | Línea 2 de la dirección de facturación. | No |
| transaction > payer > billingAddress > city | Alfanumérico | Max:50 | Ciudad de la dirección de facturación. | No |
| transaction > payer > billingAddress > state | Alfanumérico | Max:40 | Estado de la dirección de facturación. | No |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País de la dirección de facturación en formato ISO 3166 Alpha-2. | No |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Max:20 | Código postal de la dirección de facturación. Para Brasil, utiliza el formato `XXXXX-XXX` o `XXXXXXXX`. Ejemplo: `09210-710` o `09210710`. | No |
| transaction > payer > billingAddress > phone | Alfanumérico | Max:20 | Número de teléfono de la dirección de facturación. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | No |
| transaction > payer > birthdate | Alfanumérico | Max:10 | Fecha de nacimiento del pagador. Formato `YYYY-MM-DD`. | No |
| transaction > payer > contactPhone | Alfanumérico | Max:20 | Número de teléfono del pagador. Para Brasil, utiliza el formato `ddd(2)+number(7-9)`. Ejemplo: `(11)756312633`. | No |
| transaction > payer > dniNumber | Alfanumérico | Max:20 | Número de identificación del pagador. Debes utilizar un algoritmo para validar el CPF y debe tener el siguiente formato `XXX.XXX.XXX-XX`. Ejemplo: `811.807.405-64`. | No |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificación del comprador. [Ver tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | No |
| transaction > type | Alfanumérico | 32 | Como los pagos por transferencia bancaria se realizan en oficinas físicas, La única transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sí |
| transaction > paymentMethod | Alfanumérico | 32 | Selecciona un método de pago por transferencia bancaria válido. [Ver los métodos de pago disponibles para Brasil]({{< ref "select-your-payment-method.html#Brazil" >}}). | Sí |
| transaction > paymentCountry | Alfanumérico | 2 | Asigna `BR` para Brasil. | Sí |
| transaction > deviceSessionId | Alfanumérico | Max:255 | Identificador de la sesión del dispositivo donde el cliente realiza la transacción. Para más información, consulta [este artículo]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sí |
| transaction > ipAddress | Alfanumérico | Max:39 | Dirección IP del dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > cookie | Alfanumérico | Max:255 | Cookie almacenada por el dispositivo donde el cliente realiza la transacción. | Sí |
| transaction > userAgent | Alfanumérico | Max:1024 | User agent del navegador donde el cliente realiza la transacción. | Sí |

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
| transactionResponse > state | Alfanumérico | Max:32 | Estado de la transacción. Como el pago es realizado por el usuario en una oficia física, el estado de una transacción exitosa es `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Max:255 | Código de respuesta retornado por la red bancaria. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Max:255 | Mensaje de error retornado por la red bancaria. |
| transactionResponse > trazabilityCode | Alfanumérico | Max:32 | Código de trazabilidad retornado por la red bancaria. |
| transactionResponse > authorizationCode | Alfanumérico | Max:12 | Código de autorización retornado por la red bancaria. |
| transactionResponse > pendingReason | Alfanumérico | Max:21 | Código de la razón asociada con el estado, como se mencionó en  `transactionResponse > state`, la transacción está en espera del pago. |
| transactionResponse > responseCode | Alfanumérico | Max:64 | Código de respuesta asociado con el estado. En este caso, para una transacción exitosa es `PENDING_PAYMENT_IN_ENTITY`. |
| transactionResponse > responseMessage | Alfanumérico | Max:2048 | Mensaje asociado al código de respuesta. |
| transactionResponse > operationDate | Fecha |  | Fecha de creación de la respuesta en el sistema de PayU. |
| transactionResponse > extraParameters | Objeto |  | Parámetros adicionales o datos asociados con la respuesta.<br>En JSON, El parámetro _extraParameters_ sigue esta estructura: <br>`"extraParameters": {`<br>&emsp;`"BANK_URL": "https://gateway.payulatam.com/ppp-web-gateway/payment-redirect.zul?prid=1181964158Ya5b4bd5e7c6e4ebY4085cd2deb967f2"`<br>`}`<br><br>En XML, El parámetro _extraParameters_ sigue esta estructura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_URL</string>`<br>&emsp;&emsp;`<string>https://gateway.payulatam.com/ppp-web-gateway/payment-redirect.zul?prid=1181964158Ya5b4bd5e7c6e4ebY4085cd2deb967f2</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo | Objeto |  | Información adicional de la respuesta. Este objeto tiene la misma estructura de `transactionResponse.extraParameters`. |

</details>

#### Consideraciones {#considerations-5}

* Si tu comercio no tiene una entidad local, es obligatorio enviar tanto el CPF (parámetro `transaction.[payer|buyer].dniNumber`) o el CNPJ (parameter `transaction.[payer|buyer].cnpj`).
* El parámetro `transaction.expirationDate` is not obligatorio. Si no envías este parámetro, su valor por defecto es cuatro (4) días después de la fecha actual.<br>Si envías una fecha posterior a dicho número de días, PayU ignorará este valor y asignará el valor por defecto.
* Cuando el pagador selecciona este método de pago, PayU crea una orden en estado _in progress_ y una transacción en estado `PENDING`.
* En el cuerpo de la respuesta, puedes encontrar el recibo generador por PayU y su fecha de expiración.

### Llamado a la API {#api-call-2}

Los siguientes son los cuerpos de la petición y la respuesta para este método de pago.

{{< tabs tabTotal="2" tabID="10" tabName1="JSON" tabName2="XML" >}}
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
         "description": "payment test",
         "language": "es",
         "signature": "fbc089272288edc52c332395d9566f4c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "BRL"
         }
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
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Quadra QNP 34 Conjunto G 780",
            "street2": "5555487",
            "city": "Manaos",
            "state": "SP",
            "country": "BR",
            "postalCode": "10012545",
            "phone": "7563126"
         }
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "ITAU",
      "expirationDate": "2021-06-23T22:30:21.231",
      "paymentCountry": "BR",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
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
        "orderId": 1181965590,
        "transactionId": "bd273cec-d2f2-4f00-a125-c705c82b5605",
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
            "BANK_URL": "https://gateway.payulatam.com/ppp-web-gateway/payment-redirect.zul?prid=1181965590Ybd273cecd2f24f0Y88337fa73366de5",
            "EXPIRATION_DATE": 1626207065416
        },
        "additionalInfo": {
            "paymentNetwork": "ITAU_SHOPLINE",
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
         <description>payment test</description>
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
         <buyer>
            <contactPhone>7563126</contactPhone>
            <dniNumber>811.807.405-64</dniNumber>
            <cnpj>32593371000110</cnpj>
            <emailAddress>buyer_test@test.com</emailAddress>
            <fullName>First name and second buyer name</fullName>
            <merchantBuyerId>1</merchantBuyerId>
            <shippingAddress>
               <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>            
               <city>Manaos</city>
               <state>SP</state>               
               <country>BR</country>
               <postalCode>10012545</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>            
               <city>Manaos</city>
               <state>SP</state>               
               <country>BR</country>
                <postalCode>10012545</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>ITAU</paymentMethod>
      <expirationDate>2021-06-23T22:30:21.231</expirationDate>
      <paymentCountry>BR</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
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
        <orderId>1181965893</orderId>
        <transactionId>8397992b-3717-49c5-92ee-345a65ff13cf</transactionId>
        <state>PENDING</state>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <extraParameters>
            <entry>
                <string>BANK_URL</string>
                <string>https://gateway.payulatam.com/ppp-web-gateway/payment-redirect.zul?prid=1181965893Y8397992b371749cY7ad19f758dd04bc</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-07-13T15:14:00</date>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>ITAU_SHOPLINE</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Consultar Métodos de Pago Disponibles {#available-payment-methods-query}

Este método retorna la lista de los métodos de pago disponibles en todos los países.

### Parámetros para la Solicitud y la Respuesta {#parameters-for-request-and-response-4}

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
| paymentMethods | Objeto |  | Lista de métodos de pago. | Sí |
| paymentMethods > paymentMethodComplete | Objeto |  | Este objeto tiene la información de un método de pago. | Sí |
| paymentMethods > paymentMethodComplete > id | Numérico |  | Identificador del método de pago. | Sí |
| paymentMethods > paymentMethodComplete > description | Alfanumérico | Max:32 | Nombre del método de pago. | Sí |
| paymentMethods > paymentMethodComplete > country | Alfanumérico | 2 | Código ISO del país del método de pago. | Sí |

</details>

### Llamado a la API {#api-call-3}

Los siguientes son los cuerpos de la petición y la respuesta para este método. Para el propósito de este ejemplo, la respuesta muestra dos métodos de pago. 

{{< tabs tabTotal="2" tabID="11" tabName1="JSON" tabName2="XML" >}}
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
            "id": "177",
            "description": "VISA",
            "country": "BR",
            "enabled": true,
            "reason": null
        },
        {
            "id": "172",
            "description": "MASTERCARD",
            "country": "BR",
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
            <id>177</id>
            <description>VISA</description>
            <country>BR</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>172</id>
            <description>MASTERCARD</description>
            <country>BR</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
    </paymentMethods>
</paymentMethodsResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Ping

El método `PING` te permite verificar la conexión con nuestra plataforma. 

### Parámetros para la Solicitud y la Respuesta {#parameters-for-request-and-response-5}

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

### Llamado a la API {#api-call-4}

Los siguientes son los cuerpos de la petición y la respuesta para este método.

{{< tabs tabTotal="2" tabID="12" tabName1="JSON" tabName2="XML" >}}
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
