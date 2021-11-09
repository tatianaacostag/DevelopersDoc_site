---
title: "Formulario de pago"
linkTitle: "Formulario de pago"
date: 2021-03-29T12:15:27-05:00
description: >
  Con este formulario HTML, puedes enviar los datos de la transacción a nuestra pasarela de pago junto con la información de la compra. Envía los datos utilizando el método HTTP POST.

weight: 10
tags: ["subtopic"]
---
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/jquery.validate.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/additional-methods.min.js"></script>
<script src="/js/signature-generator/md5.js"></script>
<script src="/js/signature-generator/sha1.js"></script>
<script src="/js/signature-generator/sha256.js"></script>
<script src="/js/signature-generator/signature-generator.js"></script>

En este artículo, encuentras cómo enviar la información de una transacción a la pasarela de pagos de PayU. Para esto, debes generar un formulario HTML con los datos de la transacción utilizando el método HTTP POST y apuntando a nuestro sistema.

## Consideraciones {#considerations}
* Asegúrate de tener los valores correctos de las variables `merchantId`, `accountId` y `apiKey`.
* Utiliza diferentes referencias de pago por cada pago.
* No incluyas espacios en los valores de los parámetros.
* No incluyas valores con más de dos cifras decimales.
* No incluyas caracteres especiales en el parámetro `referenceCode`.

## Variables
Puedes incluir las siguientes variables en el Formulario de pago.

<details>
<summary>Variables en el Formulario de pago</summary>
<br>
<div class="variables"></div>

| Campo | Tipo | Tamaño | Descripción | Obligatorio |
|-|-|-|-|:-:|
| amount | Numérico | 14 | Valor total de la transacción. Puede tener dos cifras decimales. Ejemplo 10000.00 o 10000. | ✓ |
| merchantId | Numérico | 12 | Identificador de tu tienda en el sistema de PayU, puedes encontrar este número en el correo de creación de tu cuenta. | ✓ |
| referenceCode | Alfanumérico | 255 | Referencia de la venta o la orden. Debe ser única por cada transacción enviada al sistema. Usualmente, esta es una forma de identificar las peticiones enviadas a la pasarela de pagos. | ✓ |
| accountId | Numérico | 6 | Identificador de la cuenta de usuario de cada país asociado con la tienda. Esta variable se utiliza para mostrar los métodos disponibles del país. | ✓ |
| description | Alfanumérico | 255 | Descripción de la venta. | ✓ |
| tax | Numérico | 14,2 | Valor del impuesto al valor agregado de la transacción.<br>En Colombia, si no se envía el IVA. el sistema aplica automáticamente el 19%. Puede tener dos dígitos decimales, por ejemplo 19000.00.<br>Si el producto o servicio es exento de impuesto al valor agregado, asigne `0` a esta variable. | ✓ |
| signature | Alfanumérico | 255 | Firma digital creada por cada transacción. Consulta [Firma para el formulario de pago]({{< ref "payment-form.md#signature-for-payment-form" >}}) para aprender a generarla. | ✓ |
| currency | Alfanumérico | 3 | Moneda respectiva en la que se hace el pago. El proceso de conciliación se realiza en pesos colombianos a la tasa representativa del día.<br>[Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | ✓ |
| buyerEmail | Alfanumérico | 255 | Campo que contiene el correo electrónico del comprador para notificar el resultado de la transacción por medio de correo electrónico. Se recomienda validar que se haya ingresado este campo en el formulario. | ✓ |
| telephone | Alfanumérico | 50 | Teléfono de residencia del comprador. | ✓ |
| buyerFullName | Alfanumérico | 150 | Nombre completo del comprador. | ✓ |
| test | Numérico | 1 | Indica si la transacción es en modo pruebas o en producción. Asigna `1` para pruebas y `0` para producción. | — |
| lng | Alfanumérico | 3 | Idioma en el que se quiere mostrar la pasarela de pagos.<br>[Ver idiomas soportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | — |
| shippingCity | Alfanumérico | 50 | Ciudad de entrega de la mercancía<br><sup>\*</sup> Obligatorio si tu tienda envía el producto. | ✓* |
| shippingCountry | Alfanumérico | 2 | Código ISO del país de entrega de lla mercancía.<br><sup>\*</sup> Obligatorio si tu tienda envía el producto.<br>[Ver los paises de pago]({{< ref "response-codes-and-variables.html#processing-countries" >}}). | ✓* |
| shippingAddress | Alfanumérico | 255 | Dirección de entrega de la mercancía.<br><sup>\*</sup> Obligatorio si tu tienda envía el producto. | ✓* |
| extra1 | Alfanumérico | 255 | Campo adicional para enviar información relacionada con la compra. | — |
| extra2 | Alfanumérico | 255 | Campo adicional para enviar información relacionada con la compra. | — |
| extra3 | Alfanumérico | 255 | Campo adicional para enviar información relacionada con la compra. | — |
| responseUrl | Alfanumérico | 255 | URL de la página de respuesta. | — |
| confirmationUrl | Alfanumérico | 255 | URL de la página de confirmación. | — |
| payerFullName | Alfanumérico | 50 | Nombre del pagador. Este valor será utilizado para diligenciar el formulario de la tarjeta de crédito. | — |
| payerDocument | Alfanumérico | 25 | Número de identificación del pagador. Este valor será utilizado para diligenciar el formulario de la tarjeta de crédito. | — |
| mobilePhone | Alfanumérico | 50 | Número del móvil del comprador. Este valor será utilizado para diligenciar el formulario de la tarjeta de crédito y será el número de teléfono de contacto. | — |
| billingAddress | Alfanumérico | 255 | Dirección de facturación. | — |
| officeTelephone | Alfanumérico | 50 | Teléfono diurno del comprador. | — |
| algorithmSignature | Alfanumérico | 255 | Algoritmo de encriptación de la firma digital (campo `signature`). Los tres algoritmos disponibles son: `MD5`, `SHA` y `SHA256`. | — |
| billingCity | Alfanumérico | 50 | Ciudad asociada con la dirección de facturación. | — |
| zipCode | Alfanumérico | 20 | Postal code. | — |
| billingCountry | Alfanumérico | 2 | Código ISO del país asociado con la dirección de facturación. | — |
| payerEmail | Alfanumérico | 255 | Dirección de correo electrónico del pagador. | — |
| payerPhone | Alfanumérico | 20 | Número de teléfono del pagador. | — |
| payerOfficePhone | Alfanumérico | 20 | Número de teléfono de oficina del pagador. | — |
| payerMobilePhone | Alfanumérico | 20 | Número de teléfono móvil del pagador. | — |

</details>

### Consideraciones en las variables {#considerations-in-variables}
* El campo `tax` es el valor de impuesto al valor agregado y el campo `taxReturnBase` es el valor base para calcular el impuesto. Si tu producto es exento de impuesto, asigna `0` a ambas variables (`tax=0`, `taxReturnBase=0`).
* Si algunos elementos tiene impuesto y en otros no aplica, debes realizar el siguiente cálculo para saber cómo enviar los valores a la plataforma de pagos.

| Producto | Campo taxReturnBase | Campo tax          | Valor   |
|----------|---------------------|--------------------|---------|
| A        | 84.033              | 15.966 (19%)       | 100.000 |
| B        | 181.818             | 18.181 (10%)       | 200.000 |
| C        | 0                   | 0 (0%)             | 150.000 |
| Total    | 268.851             | 34.147             | 450.000 |

{{% alert title="Importante" color="warning"%}}
La sumatoria de los campos Tax y taxReturnBase no puede ser mayor que el valor total de cada producto.
{{% /alert %}}

* Para comercios registrados en Colombia que pertenezcan al _Régimen común_, si no envías el impuesto, PayU lo calcula automáticamente utilizando el 19%. Para comercios que pertenecen al _Régimen simplificado_, si no envías el impuesto, PayU asigna cero (0) automáticamente al valor del impuesto.

## Ejemplo del formulario {#form-example}
El siguiente es un ejemplo de un formulario de pago básico utilizando únicamente los campos obligatorios y apuntando el request al ambiente de sandbox (modo pruebas).

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

## Firma para el formulario de pago {#signature-for-payment-form}
La firma es un método para validar los pagos realizados a través de la plataforma asegurando su autenticidad. Consiste en un string encriptado utilizando  `MD5`, `SHA1` o `SHA256`. El string creado es así:

```HTML
"ApiKey~merchantId~referenceCode~amount~currency".
```
<br>

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

### Compara tu firma {#compare-your-signature}

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

Esta calculadora te permite generar la firma utilizando alguno de los métodos de cifrado disponibles.