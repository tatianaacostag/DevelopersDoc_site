---
title: "Formulario de Pago"
linkTitle: "Formulario de Pago"
date: 2021-03-29T12:15:27-05:00
description: >
  En esta sección, aprenderás a enviar datos de transacciones al gateway de pagos de PayU utilizando un formulario HTML.
weight: 10
tags: ["subtopic"]
---
<script src="/js/searchcodes.js"></script>

Esta guía explica cómo construir un formulario con los campos requeridos y enviar los datos a nuestro sistema mediante el método HTTP POST.

## Consideraciones {#considerations}

* Asegúrate de tener el `merchantId`, `accountId` y `apiKey` correctos.
* Usa un código de referencia de pago único para cada transacción.
* Evita incluir espacios en los valores de los parámetros.
* Limita los valores decimales a dos cifras.
* Excluye caracteres especiales en el parámetro `referenceCode`.

## Parámetros {#parameters}

Puedes incluir los siguientes parámetros en el formulario de pago.

<details>

<summary>Parámetros</summary>

<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Mostrar solo campos obligatorios</label>

<br>

<div class="variables"></div>

| Campo | Tipo | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| `lng` | Alfanumérico | 3 | Idioma para la pasarela de pagos. <br>[Ver idiomas admitidos]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | No |
| `merchantId` | Numérico | 12 | Número de ID único asignado a tu tienda en el sistema de PayU. Puedes encontrar este número en el correo electrónico de creación de la cuenta. | Sí |
| `accountId` | Numérico | 6 | ID asociado con la cuenta de usuario en cada país. Determina los métodos de pago disponibles para el país correspondiente. | Sí |
| `algorithmSignature` | Alfanumérico | 255 | Algoritmo de hash utilizado para crear la firma digital (campo `signature`). Opciones disponibles: `MD5`, `SHA`, `SHA256` o `HMAC-SHA256`. | No |
| `signature` | Alfanumérico | 255 | Firma digital para la transacción. Consulta [Firma para el formulario de pago]({{< ref "payment-form.md#signature-for-payment-form" >}}) para obtener instrucciones. | Sí |
| `sourceUrl` | Alfanumérico | 255 | URL de origen donde se encuentra el botón de pago del comercio. | No |
| `responseUrl` | Alfanumérico | 255 | URL para la página de respuesta. | No |
| `confirmationUrl` | Alfanumérico | 255 | URL para la página de confirmación. | No |
| `expirationDate` | Alfanumérico | 19 | Fecha de expiración para pagos en efectivo en el formato `AAAA-MM-DD HH:mm:ss`. Debe estar dentro del rango permitido para pagos en efectivo (15 días para Argentina, 7 días para otros). | - |
| `paymentMethods` | Alfanumérico | 255 | Lista de métodos de pago habilitados para la transacción. <br>Esta lista debe estar separada por comas y sin espacios, por ejemplo: `VISA,MASTERCARD`.<br> Puedes incluir cuotas usando guiones, por ejemplo: `VISA-1-3,MASTERCARD-3-5-9`. <br>[Consulta los Métodos de Pago disponibles para tu país en la columna `paymentMethod parameter`]({{< ref "select-your-payment-method.html" >}}). | No |
| `selectedPaymentMethod` | Alfanumérico | 255 | Método de pago preseleccionado cuando el usuario accede al enlace de pago. | No |
| `paymentMethodsDescription` | Alfanumérico | 255 | Descripción de los métodos de pago y Bines aceptados para la transacción. | No |
| `iin` | Alfanumérico | 2048 | Lista de Bines admitidos durante el proceso de pago, separados por comas. _Solo los comercios que validan firmas pueden usar este parámetro._ | No |
| `pseBanks` | Alfanumérico | 255 | Lista de códigos de bancos habilitados para pagos a través de PSE. | No |
| `partnerId` | Alfanumérico | 255 | Campo opcional para especificar el nombre del socio (por ejemplo, ZOOZ). | No |
| `template` | Alfanumérico | 255 | Plantilla que se utilizará para la página de pago. | No |
| `extra1` | Alfanumérico | 255 | Campo adicional para enviar información extra sobre la compra. | No |
| `extra2` | Alfanumérico | 255 | Campo adicional para enviar información extra sobre la compra. | No |
| `extra3` | Alfanumérico | 255 | Campo adicional para enviar información extra sobre la compra. | No |
| `extra4` | Alfanumérico | 255 | Campo adicional para enviar información extra sobre la compra. | No |
| `displayShippingInformation` | Numérico | 1 | Establecer en `1` para solicitar información de envío, o en `0` para deshabilitarla. | No |
| `additionalDeliveryDays` | Numérico | 5 | Días adicionales para la entrega del pedido, que aparecerán en la respuesta de la consulta API como `result.payload.transactions.extraParameters.ADDITIONAL_DELIVERY_DAYS`. | No |
| `displayBuyerComments` | Numérico | 1 | Establecer en `1` para habilitar los comentarios del comprador, o en `0` para deshabilitarlos. Esto aparece en la respuesta de la API como `result.payload.transactions.extraParameters.DISPLAY_BUYER_COMMENTS`. | No |
| `buyerCommentsLabel` | Alfanumérico | 255 | Etiqueta para los comentarios del comprador, que aparece en la respuesta de la API como `result.payload.transactions.extraParameters.BUYER_COMMENTS_LABEL`. | No |
| `isCashOnDeliveryApply` | Numérico | 1 | Establecer en `1` para habilitar el pago contra entrega para la transacción, o en `0` para deshabilitarlo. | No |
| `test` | Numérico | 1 | Indica si la transacción está en modo de prueba (`1`) o en modo de producción (`0`). | No |
| `description` | Alfanumérico | 255 | Descripción de la venta. | Sí |
| `referenceCode` | Alfanumérico | 255 | Referencia única para la venta o el pedido. Debe ser única para cada transacción enviada al sistema, utilizada típicamente para el seguimiento de solicitudes. | Sí |
| `amount` | Numérico | 10 | Importe total de la transacción, que puede incluir dos dígitos decimales. Ej: 10000.00 o 10000. | Sí |
| `tax` | Numérico | 10.2 | Valor del IVA para la transacción. En Colombia, si no se proporciona el IVA, el sistema aplica el 19% automáticamente. Si el IVA está exento, establecer en `0`. | Sí |
| `taxReturnBase` | Numérico | 10.2 | Valor base utilizado para calcular el IVA. Si el producto está exento de IVA, establecer en `0`. | Sí |
| `administrativeFee` | Numérico | 10.2 | Tarifa administrativa de la transacción. | No |
| `taxAdministrativeFee` | Numérico | 10.2 | Impuesto aplicado a la tarifa administrativa. | No |
| `taxAdministrativeFeeReturnBase` | Numérico | 10.2 | Valor base para calcular el impuesto de la tarifa administrativa. | No |
| `discount` | Numérico | 10.2 | Descuento aplicado a la venta. | No |
| `currency` | Alfanumérico | 3 | Moneda utilizada para el pago. En Colombia, las conciliaciones se realizan en pesos colombianos a la tasa representativa del día. <br>[Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| `airline` | Alfanumérico | 4 | Código de aerolínea para transacciones de aerolíneas. | No |
| `additionalValue` | Numérico | 10.2 | Cualquier valor adicional agregado a la venta. | No |
| `payerFullName` | Alfanumérico | 50 | Nombre completo del pagador, utilizado para completar el formulario de la tarjeta de crédito. | Sí |
| `payerEmail` | Alfanumérico | 255 | Dirección de correo electrónico del pagador. | Sí |
| `payerOfficePhone` | Alfanumérico | Máx. 20 | Número de teléfono de la oficina del pagador. | No |
| `payerPhone` | Alfanumérico | Máx. 20 | Número de teléfono del pagador. | Sí |
| `payerMobilePhone` | Alfanumérico | Máx. 20 | Número de teléfono móvil del pagador. | No |
| `payerDocumentType` | Alfanumérico | 25 | Tipo de documento de identificación utilizado por el pagador. Ejemplos: `CC`, `DNI`. `NIT`, `Pasaporte`. | Sí |
| `payerDocument` | Alfanumérico | 25 | Número de identificación del pagador, utilizado para completar el formulario de la tarjeta de crédito. | Sí |
| `billingCountry` | Alfanumérico | 2 | Código de país ISO para la dirección de facturación. | No |
| `payerState` | Alfanumérico | N/A | Estado de facturación del pagador en código ISO 3166 (ej: SP para São Paulo, AR-C para Buenos Aires). | No |
| `billingCity` | Alfanumérico | 50 | Ciudad asociada con la dirección de facturación. | No |
| `billingAddress` | Alfanumérico | 255 | Dirección de facturación para la transacción. | No |
| `billingAddress2` | Alfanumérico | 255 | Línea de dirección secundaria para la dirección de facturación del pagador. | No |
| `billingAddress3` | Alfanumérico | 255 | Línea de dirección terciaria para la dirección de facturación del pagador. | No |
| `zipCode` | Alfanumérico | 20 | Código postal para la dirección de facturación o envío. | No |
| `buyerFullName` | Alfanumérico | 150 | Nombre completo del comprador. | Sí |
| `buyerEmail` | Alfanumérico | 255 | Dirección de correo electrónico del comprador, utilizada para las notificaciones de la transacción. | Sí |
| `buyerDocumentType` | Alfanumérico | 25 | Tipo de documento de identificación utilizado por el comprador. Ejemplos: `CC`, `DNI`. `NIT`, `Pasaporte`. | Sí |
| `buyerDocument` | Alfanumérico | 25 | Número de identificación del comprador. | Sí |
| `officeTelephone` | Alfanumérico | Máx. 20 | Número de teléfono diurno del comprador. | No |
| `telephone` | Alfanumérico | Máx. 20 | Número de teléfono de residencia del comprador. | Sí |
| `mobilePhone` | Alfanumérico | Máx. 20 | Número de teléfono móvil del comprador, utilizado para completar el formulario de la tarjeta de crédito y como teléfono de contacto. | No |
| `shippingCountry` | Alfanumérico | 2 | Código de país ISO para la dirección de envío. <br><sup>*</sup>Obligatorio si la tienda envía el producto. <br>[Ver países de procesamiento]({{< ref "response-codes-and-variables.html#processing-countries" >}}). | Sí* |
| `shippingState` | Alfanumérico | N/A | Estado de envío del comprador en código ISO 3166 (ej: SP para São Paulo, AR-C para Buenos Aires). | No |
| `shippingCity` | Alfanumérico | 50 | Ciudad a la que el comercio entregará el producto o servicio. <br><sup>*</sup>Obligatorio si la tienda envía el producto. | Sí* |
| `shippingAddress` | Alfanumérico | 255 | Dirección a la que el comercio entregará el producto o servicio. <br><sup>*</sup>Obligatorio si la tienda envía el producto. | Sí* |
| `shippingAddress2` | Alfanumérico | 255 | Línea de dirección secundaria para la dirección de envío del comprador. | No |
| `shippingAddress3` | Alfanumérico | 255 | Línea de dirección terciaria para la dirección de envío del comprador. | No |
| `payerShippingPostalCode` | Alfanumérico | N/A | Código postal de envío del comprador. | No |

</details>

### Consideraciones para los parámetros {#parameters-considerations}

* El parámetro `tax` representa el IVA, aplicable en ciertos países, mientras que `taxReturnBase`  es el monto base para calcular el IVA. Si tu producto está exento de impuestos, establece ambas variables en `0`  (`tax=0`, `taxReturnBase=0`).
* Cuando algunos productos tienen impuestos y otros no, calcula y establece los valores como se muestra en la tabla a continuación para asegurar un envío preciso a la plataforma de pagos.

#### Ejemplo de cálculo de IVA:

| Producto | `taxReturnBase`     | `tax`              | Valor   |
|----------|---------------------|--------------------|---------|
| A        | 84.033              | 15.966 (19%)       | 100.000 |
| B        | 181.818             | 18.181 (10%)       | 200.000 |
| C        | 0                   | 0 (0%)             | 150.000 |
| Total    | 268.851             | 34.147             | 450.000 |

{{% alert title="Importante" color="warning"%}}

La suma de `tax` y `taxReturnBase` no debe exceder el valor total de cada producto.

{{% /alert %}}

* Para comercios registrados en Colombia bajo el _Régimen Común_, si no envías `tax`, PayU lo calcula automáticamente utilizando el 19%. Para comercios bajo el _Régimen Simplificado_, si no envías `tax`, PayU asigna cero (0) automáticamente al valor del impuesto.

## Ejemplo de campos HTML {#html-fields-example}

A continuación, se muestra un ejemplo de los campos obligatorios para un formulario de pago en formato HTML, apuntando la solicitud al entorno sandbox (modo de prueba).

```HTML
 <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
  <input name="merchantId"      type="hidden"  value="508029"   >
  <input name="accountId"       type="hidden"  value="512321" >
  <input name="description"     type="hidden"  value="Test PAYU"  >
  <input name="referenceCode"   type="hidden"  value="TestPayU" >
  <input name="amount"          type="hidden"  value="20000"   >
  <input name="tax"             type="hidden"  value="3193"  >
  <input name="taxReturnBase"   type="hidden"  value="16806" >
  <input name="currency"        type="hidden"  value="COP" >
  <input name="signature"       type="hidden"  value="7ee7cf808ce6a39b17481c54f2c57acc"  >
  <input name="test"            type="hidden"  value="0" >
  <input name="buyerEmail"      type="hidden"  value="test@test.com" >
  <input name="responseUrl"     type="hidden"  value="http://www.test.com/response" >
  <input name="confirmationUrl" type="hidden"  value="http://www.test.com/confirmation" >
  <input name="Submit"          type="submit"  value="Enviar" >
</form>
```

<br>

Si tu tienda envía los productos, necesitas incluir los siguientes campos:

```HTML
  <input name="shippingAddress"    type="hidden"  value="calle 93 n 47 - 65"   >
  <input name="shippingCity"       type="hidden"  value="Bogotá" >
  <input name="shippingCountry"    type="hidden"  value="CO"  >
```

<br>

La URL configurada en el campo `action` depende del ambiente:

```HTML
Pruebas: https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/
Producción: https://checkout.payulatam.com/ppp-web-gateway-payu/
```

## Ejemplo de formulario de pago

Este ejemplo de formulario de pago dinámico está diseñado para realizar pruebas en nuestro entorno sandbox. Ofrece una visión de los campos y características que puedes incorporar en tus propios formularios de pago. A continuación, se presenta un resumen de sus características clave:

* **Generación de firma de transacción:** El formulario calcula una cadena de firma utilizando la clave API de PayU LATAM, el ID del comercio y varios datos ingresados por el usuario, como el método de pago y la información bancaria. Esta firma se encripta con un algoritmo especificado (MD5, SHA, SHA256 o HMAC-SHA256) para asegurar las transacciones. Para más detalles, consulta [Firma para formulario de pago]({{< ref "Payment-form.md#signature-for-payment-form" >}}).

* **Diligenciamiento dinámico del formulario:** Según el país y la cuenta seleccionados, el formulario completa automáticamente varios campos, como tipos de documentos, información de facturación (por ejemplo, ciudad, estado, código postal) e información del pagador. Esto permite que el formulario se ajuste a los requisitos específicos de cada región (por ejemplo, CPF para Brasil o CUIT para Argentina).

* **Gestión de visibilidad:** Se incluyen varias funciones para mostrar u ocultar campos dinámicamente según el tipo de cuenta seleccionado. Esto es especialmente útil para manejar casos específicos como bancos PSE en Colombia o campos adicionales para aerolíneas y agencias de viajes.

* **Gestión de información de envío:** El formulario permite que el usuario utilice la información de facturación como dirección de envío o especifique detalles de envío separados. Si el usuario no selecciona una opción de envío alternativa, se utiliza la información de facturación de forma predeterminada.

* **Listeners de eventos y envío del formulario:** La página puede utilizar listeners de eventos para actualizar campos del formulario cuando cambian ciertos valores de entrada (por ejemplo, el ID de cuenta) y asegura que el proceso de envío del formulario respete la información ingresada por el usuario, con opciones de respaldo (por ejemplo, usar la información de facturación si no se selecciona una opción de envío).

<div>
{{< paymentform/webcheckout_es >}}
</div>

<br>
<br>

## Firma para el formulario de pago {#signature-for-payment-form}

Utiliza una firma para validar cada pago y garantizar su autenticidad. La integración genera la firma al encriptar una cadena con uno de los algoritmos compatibles: `MD5`, `SHA1`, `SHA256`, `HMAC-SHA256`.

Construye la cadena en el siguiente formato:

```HTML
apiKey~merchantId~referenceCode~amount~currency
```

{{% alert title="Nota" color="info"%}}

Si tu formulario de pago incluye los parámetros `paymentMethods`, `iin` o `pseBanks`, debes concatenarlas en este orden exacto:

```HTML
apiKey~merchantId~referenceCode~amount~currency~paymentMethods~iin~pseBanks
```

{{% /alert %}}

Por ejemplo, con los siguientes datos:

```HTML
apiKey: 4Vj8eK4rloUd272L48hsrarnUA  
merchantId: 508029  
referenceCode: TestPayU  
amount: 20000  
currency: COP
```

<br>

La cadena base para encriptar la firma es:

```HTML
4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU~20000~COP
```

<p>

* Encriptada utilizando `MD5`:

    ```HTML
    7ee7cf808ce6a39b17481c54f2c57acc
    ```

<p>

* Encriptada utilizando `SHA1`:

    ```HTML
    fa890d3f94e12b5cdb62e8771453b99b78e7ccdc
    ```

<p>

* Encriptada utilizando `SHA256`:

    ```HTML
    af3899a22336b79db46006491d15813158826f944599bf3bf601e2327f898022
    ```

<p>

* Encriptada utilizando `HMAC-SHA256` (usando el `apiKey` como clave secreta):

    ```HTML
    eaf61598d5593b366086c9a00aa5746ccad1a6e9b209a1a242fce224202b2b36
    ```

<p>

* Encriptada utilizando `HMAC-SHA256` (usando una clave secreta personalizada, en este ejemplo: `secret123`):

    ```HTML
    9b269405c01c725fcc5d1667a2e1166a810fd34b5a5ac82295d0f59fddf1c472
    ```

{{% alert title="Nota" color="info"%}}

Al encriptar con HMAC-SHA256, puedes usar tu `apiKey` como clave secreta o proporcionar una clave específica. En cualquier caso, asegúrate de que el `apiKey` sea el primer valor en la cadena base utilizada para generar la firma:

```HTML
apiKey~merchantId~referenceCode~amount~currency
```

{{% /alert %}}


### Genera una firma {#generate-a-signature}

Usa este generador para crear la firma usando cualquiera de los métodos de encriptación disponibles.

<div>
{{< paymentform/signaturegenerator_es >}}
</div>
