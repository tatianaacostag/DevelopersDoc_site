---
title: "Formulario de Pago"
linkTitle: "Formulario de Pago"
date: 2021-03-29T12:15:27-05:00
description: >
  En esta sección, aprenderás a enviar datos de transacción al gateway de pagos de PayU. Este documento proporciona la información necesaria para crear un formulario HTML con los detalles de la transacción y enviarlo a nuestro sistema mediante el método HTTP POST.

weight: 10
tags: ["subtopic"]
---
<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/jquery.validate.min.js"></script>
<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/additional-methods.min.js"></script>
<script src="/js/signature-generator/md5.js"></script>
<script src="/js/signature-generator/sha1.js"></script>
<script src="/js/signature-generator/sha256.js"></script>
<script src="/js/signature-generator/signature-generator.js"></script>
<script src="/js/searchcodes.js"></script>

## Consideraciones {#considerations}

* Asegúrate de tener el `merchantId`, `accountId` y `apiKey` correctos.
* Usa un código de referencia de pago único para cada transacción.
* Evita incluir espacios en los valores de los parámetros.
* Limita los valores decimales a dos cifras.
* Excluye caracteres especiales en el parámetro `referenceCode`.

## Parameters {#parameters}

Puedes incluir los siguientes parámetros en el formulario de pago.

<details>
<summary>Parámetros en el formulario de pago</summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Mostrar solo campos obligatorios</label>
<br>
<div class="variables"></div>

| Campo | Tipo | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| merchantId | Numérico | 12 | Identificador de tu tienda en el sistema de PayU, puedes encontrar este número en el correo de creación de tu cuenta. | Sí |
| referenceCode | Alfanumérico | 255 | Referencia de la venta o la orden. Debe ser única por cada transacción enviada al sistema. Usualmente, esta es una forma de identificar las peticiones enviadas a la pasarela de pagos. | Sí |
| accountId | Numérico | 6 | Identificador de la cuenta de usuario de cada país asociado con la tienda. Esta variable se utiliza para mostrar los métodos disponibles del país. | Sí |
| description | Alfanumérico | 255 | Descripción de la venta. | Sí |
| currency | Alfanumérico | 3 | Moneda respectiva en la que se hace el pago. El proceso de conciliación se realiza en pesos colombianos a la tasa representativa del día.<br>[Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sí |
| amount | Numérico | 10 | Valor total de la transacción. Puede tener dos cifras decimales. Ejemplo 10000.00 o 10000. | Sí |
| tax | Numérico | 10,2 | Valor del impuesto al valor agregado de la transacción.<br>En Colombia, si no se envía el IVA. el sistema aplica automáticamente el 19%. Puede tener dos dígitos decimales, por ejemplo 19000.00.<br>Si el producto o servicio es exento de impuesto al valor agregado, asigne `0` a esta variable. | Sí |
| discount | Numérico| 10,2 | Valor del descuento sobre la venta. | No |
| taxReturnBase | Numérico | 10,2 | Valor base para la devolución de impuestos.<br>Si el producto o servicio es exento de impuesto al valor agregado, asigne `0` a esta variable. | Sí |
| additionalValue | Numérico | 10,2 | Valor adicional no comisionable de la venta. | No |
| signature | Alfanumérico | 255 | Firma digital creada por cada transacción. Consulta [Firma para el formulario de pago]({{< ref "payment-form.md#signature-for-payment-form" >}}) para aprender a generarla. | Sí |
| algorithmSignature | Alfanumérico | 255 | Algoritmo de encriptación de la firma digital (campo `signature`). Los tres algoritmos disponibles son: `MD5`, `SHA` y `SHA256`. | No |
| test | Numérico | 1 | Indica si la transacción es en modo pruebas o en producción. Asigna `1` para pruebas y `0` para producción. | No |
| lng | Alfanumérico | 3 | Idioma en el que se quiere mostrar la pasarela de pagos.<br>[Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | No |
| extra1 | Alfanumérico | 255 | Campo adicional para enviar información relacionada con la compra. | No |
| extra2 | Alfanumérico | 255 | Campo adicional para enviar información relacionada con la compra. | No |
| extra3 | Alfanumérico | 255 | Campo adicional para enviar información relacionada con la compra. | No |
| template | Alfanumérico | 255 | Plantilla para la página de pagos.| No |
| responseUrl | Alfanumérico | 255 | URL de la página de respuesta. | No |
| confirmationUrl | Alfanumérico | 255 | URL de la página de confirmación. | No |
| sourceUrl | Alfanumérico| 255 | URL de origen de las transacciones del comercio. Aquí es donde se encuentra ubicado el botón de pago. | No |
| airline | Alfanumérico | 4 | Código de la aerolínea. | No |
| billingAddress | Alfanumérico | 255 | Dirección de facturación. | No |
| shippingAddress | Alfanumérico | 255 | Dirección de entrega de la mercancía.<br><sup>\*</sup> Obligatorio si tu tienda envía el producto. | Sí* |
| billingCity | Alfanumérico | 50 | Ciudad asociada con la dirección de facturación. | No |
| shippingCity | Alfanumérico | 50 | Ciudad de entrega de la mercancía<br><sup>\*</sup> Obligatorio si tu tienda envía el producto. | Sí* |
| zipCode | Alfanumérico | 20 | Postal code. | No |
| billingCountry | Alfanumérico | 2 | Código ISO del país asociado con la dirección de facturación. | No |
| shippingCountry | Alfanumérico | 2 | Código ISO del país de entrega de lla mercancía.<br><sup>\*</sup> Obligatorio si tu tienda envía el producto.<br>[Ver los paises de pago]({{< ref "response-codes-and-variables.html#processing-countries" >}}). | Sí* |
| buyerEmail | Alfanumérico | 255 | Campo que contiene el correo electrónico del comprador para notificar el resultado de la transacción por medio de correo electrónico. Se recomienda validar que se haya ingresado este campo en el formulario. | Sí |
| telephone | Alfanumérico | Máx. 20 | Teléfono de residencia del comprador. | Sí |
| officeTelephone | Alfanumérico | Máx. 20 | Teléfono diurno del comprador. | No |
| mobilePhone | Alfanumérico | Máx. 20 | Número del móvil del comprador. Este valor será utilizado para diligenciar el formulario de la tarjeta de crédito y será el número de teléfono de contacto. | No |
| buyerFullName | Alfanumérico | 150 | Nombre completo del comprador. | Sí |
| paymentMethods | Alfanumérico | 255 | Lista de métodos de pago habilitados en el proceso de pago.<br>Esta lista debe estar separada por comas y sin espacios en blanco. Por ejemplo: `VISA,MASTERCARD`.<br>Puedes incluir cuotas para los métodos de pago añadiéndolas mediante guiones. Ejemplo: `VISA-1-3,MASTERCARD-3-5-9`.<br>[Consulta los métodos de pago disponibles para tu país en la columna` parámetro de método de pago`]({{< ref "select-your-payment-method.html" >}}). | No | 
| administrativeFee | Numérico | 10,2 | Valor de la tarifa administrativa. | - |
| taxAdministrativeFee | Numérico | 10,2 | Valor del impuesto de la tarifa administrativa. | - |
| taxAdministrativeFeeReturnBase | Numérico | 10,2 | Valor base para calcular el impuesto de la tarifa administrativa. | - |
| payerEmail | Alfanumérico | 255 | Dirección de correo electrónico del pagador. | Sí |
| payerPhone | Alfanumérico | Máx. 20 | Número de teléfono del pagador. | Sí |
| payerOfficePhone | Alfanumérico | Máx. 20 | Número de teléfono de oficina del pagador. | No |
| payerMobilePhone | Alfanumérico | Máx. 20 | Número de teléfono móvil del pagador. | No |
| expirationDate | #N/A | 19 | Fecha de vencimiento de las transacciones para pagos en efectivo. Formato: `YYYY-MM-DD HH:mm:ss`.<br>Este valor debe ser menor que el número de días predeterminado para el pago en efectivo (15 días para Argentina y 7 días para el resto de países). | - |
| payerFullName | Alfanumérico | 50 | Nombre del pagador. Este valor será utilizado para diligenciar el formulario de la tarjeta de crédito. | Sí |
| payerDocument | Alfanumérico | 25 | Número de identificación del pagador. Este valor será utilizado para diligenciar el formulario de la tarjeta de crédito. | Sí |
| payerDocumentType | Alfanumérico | 25 | El número de identificación del comprador. Este valor se tomará para completar el formulario de la tarjeta de crédito. | Sí |
| iin | Alfanumérico | 2048 | Lista de Bins admitidos durante el proceso de pago (separados por coma).<br>_Este parámetro solo lo pueden utilizar los comercios que validan la firma._ | No |
| PaymentMethodsDescription | Alfanumérico | 255 | Descripción de los métodos de pago y Bins admitidos durante el proceso de pago. | No |
| pseBanks | Alfanumérico | 255 | Listado de códigos bancarios habilitados en el proceso de pago a través de PSE.<br>Este listado debe estar separado por coma y sin espacios en blanco. | No |

</details>

### Consideraciones para los Parámetros {#parameters-considerations}

* El parámetro `tax` representa el IVA, aplicable en ciertos países, mientras que `taxReturnBase`  es el monto base para calcular el IVA. Si tu producto está exento de impuestos, establece ambas variables en `0`  (`tax=0`, `taxReturnBase=0`).
* Cuando algunos productos tienen impuestos y otros no, calcula y establece los valores como se muestra en la tabla a continuación para asegurar un envío preciso a la plataforma de pagos.

#### Ejemplo de Cálculo de IVA:

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

## Ejemplo de Campos HTML {#html-fields-example}

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

## Ejemplo de Formulario de Pago

Este ejemplo de formulario de pago dinámico está diseñado para realizar pruebas en nuestro entorno sandbox. Ofrece una visión de los campos y características que puedes incorporar en tus propios formularios de pago. A continuación, se presenta un resumen de sus características clave:

* **Generación de Firma de Transacción:** El formulario calcula una cadena de firma utilizando la clave API de PayU LATAM, el ID del comercio y varios datos ingresados por el usuario, como el método de pago y la información bancaria. Esta firma se encripta con un algoritmo especificado (MD5, SHA o SHA256) para asegurar las transacciones. Para más detalles, consulta [Firma para Formulario de Pago]({{< ref "Payment-form.md#signature-for-payment-form" >}}).

* **Diligenciamiento Dinámico del Formulario:** Según el país y la cuenta seleccionados, el formulario completa automáticamente varios campos, como tipos de documentos, información de facturación (por ejemplo, ciudad, estado, código postal) e información del pagador. Esto permite que el formulario se ajuste a los requisitos específicos de cada región (por ejemplo, CPF para Brasil o CUIT para Argentina).

* **Gestión de Visibilidad:** Se incluyen varias funciones para mostrar u ocultar campos dinámicamente según el tipo de cuenta seleccionado. Esto es especialmente útil para manejar casos específicos como bancos PSE en Colombia o campos adicionales para aerolíneas y agencias de viajes.

* **Gestión de Información de Envío:** El formulario permite que el usuario utilice la información de facturación como dirección de envío o especifique detalles de envío separados. Si el usuario no selecciona una opción de envío alternativa, se utiliza la información de facturación de forma predeterminada.

* **Listeners de Eventos y Envío del Formulario:** La página puede utilizar listeners de eventos para actualizar campos del formulario cuando cambian ciertos valores de entrada (por ejemplo, el ID de cuenta) y asegura que el proceso de envío del formulario respete la información ingresada por el usuario, con opciones de respaldo (por ejemplo, usar la información de facturación si no se selecciona una opción de envío).

<div>
{{< paymentform/webcheckout_es >}}
</div>

<br>
<br>

## Firma para el Formulario de Pago {#signature-for-payment-form}

La firma es un método para validar los pagos realizados a través de la plataforma asegurando su autenticidad. Consiste en un string encriptado utilizando  `MD5`, `SHA1` o `SHA256`. El string creado es así:

```HTML
"ApiKey~merchantId~referenceCode~amount~currency".
```

{{% alert title="Nota" color="info"%}}
Si tu formulario de pago incluye las variables `paymentMethods`, `iin` o `pseBanks`, debes concatenarlas en dicho orden:

```HTML
"ApiKey~merchantId~referenceCode~amount~currency~paymentMethods~iin~pseBanks"
```
{{% /alert %}}

Por ejemplo, con los siguientes datos:

```HTML
merchantId: 508029
ApiKey: 4Vj8eK4rloUd272L48hsrarnUA
referenceCode: TestPayU
amount: 20000
currency: COP
accountId: 512326
buyerEmail: test@test.com
```
<br>

La firma es:

```HTML
"4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU~20000~COP"
```
<br>

Encriptada utilizando `MD5`:

```HTML
"7ee7cf808ce6a39b17481c54f2c57acc"
```
<br>

Encriptada utilizando `SHA1`:

```HTML
"fa890d3f94e12b5cdb62e8771453b99b78e7ccdc"
```
<br>

Encriptada utilizando `SHA256`:

```HTML
"af3899a22336b79db46006491d15813158826f944599bf3bf601e2327f898022"
```

<br>

### Genera una Firma {#generate-a-signature}

Esta calculadora te permite generar la firma utilizando alguno de los métodos de cifrado disponibles.

<!-- Generador de firmas pagina de respuesta -->
<div id="blue-box">
<span class="grey-text-13">
<div id = "div_generador" >

<form method="POST" id="signature_form" >
    <table>
        <span class="blue-text-13"><b>Algoritmo: &nbsp;</b></span>
        <select id = "signature_algorithm" class="calc_selector form_control">
            <option  value="md5">MD5</option>
            <option  value="sha1">SHA1</option>
            <option  value="sha256">SHA256</option>
        </select>
        <br>
        <br>
        <span class="calc_text">&nbsp;(</span>
        <input class="form_control" type="text"  id ="signature_apikey" name = "signature_apikey" placeholder="ApiKey" maxlength="26"> ~
        <input class="form_control number" type="text"  id ="signature_merchanId" name = "signature_merchanId" placeholder="MerchantId" maxlength="7"> ~
        <input class="form_control" type="text"  id ="signature_referenceCode" name = "signature_referenceCode" placeholder="Referencia" maxlength="255"> ~
        <input class="form_control  number" type="text" id ="signature_amount" name = "signature_amount" placeholder="Monto" maxlength="14"> ~
        <select id = "signature_currency" class="calc_selector form_control" >
            <option  value="USD">USD</option>
            <option  value="COP">COP</option>
            <option  value="MXN">MXN</option>
            <option  value="ARS">ARS</option>
            <option  value="PEN">PEN</option>
            <option  value="BRL">BRL</option>
            <option  value="CLP">CLP</option>
        </select>
        <span class="calc_text">)</span>
        <br>
        <br>
        <br>
        <span class="blue-text-13"><b>Resultado:&nbsp;</b></span><input class="form_control" id ="signature_generated" name = "signature_generated" value = ""  readonly />
    </table>
    <br>
    <table width="50%"  border="0" cellspacing="2" cellpadding="2">
        <input type="button" name="signature_generate" id="signature_generate" value="Generar firma" >
        <input type="button" name="signature_generate_again" id="signature_generate_again" value="Generar nueva firma" >
    </table>
</form>
</div>
</span>
</div>
<!-- Fin del generador de firmas pagina de respuesta-->
