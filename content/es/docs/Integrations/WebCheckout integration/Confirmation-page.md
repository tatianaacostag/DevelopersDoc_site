---
title: "Página de confirmación"
date: 2021-03-29T12:15:57-05:00
description: >
  Esta página te permite obtener confirmaciones de sistema relacionadas con los resultados de la transacción. Puedes actualizar tus inventarios, órdenes o bases de datos. Está página no es visible para el cliente y su objetivo es permitir la comunicación entre sistemas. Los datos se envía a través deñ método HTTP POST. </br>Si el pagador genera reintentos de pago durante el proceso, se genera una página de confirmación por cada transacción. Esta página es invocada por transacciones aprobadas o rechazadas.
weight: 30
tags: ["subtopic"]
---
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/jquery.validate.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/additional-methods.min.js"></script>
<script src="/js/signature-generator/md5.js"></script>
<script src="/js/signature-generator/sha1.js"></script>
<script src="/js/signature-generator/sha256.js"></script>
<script src="/js/signature-generator/signature-generator.js"></script>

La página de confirmación te permite actualizar las bases de datos de tu sistema; por lo tanto, no debe incluir código HTML ya que no es visible al comprador. Esta página es opcional; cuando se completa una transacción (por ejemplo, cuando se aprueba, se rechaza o cuando se cancela) nuestra plataforma envía las variables a través del método HTTP POST.

En la página de confirmación, debes capturar los datos que desear guardar en la base de datos. Esta captura depende del lenguaje de programación qu utilizas.

## Consideraciones {#considerations}
* Si tienes restringido el sitio con _basic access authentication_ o similar, desactívalo para la URL de confirmación.
* La IP asociada con la URL de confirmación debe ser pública; no utilice URL que se accedan por intranet o localhost.
* Si utilizas HTTPS, debes tener un certificado válido.
* El formato de tu página de confirmación debe ser `x-www-form-urlencoded`.
* No utilices certificados de seguridad de curva elíptica o aquellos que cuenten con la suite de encriptación `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA` en tu página de confirmación.
* PayU asume que la página de confirmación es reportada correctamente cuando recibe el código HTTP 200; en caso contrario, PayU realiza un máximo de nueve (9) intentos de enviar la página de confirmación a tu sistema. Si luego de estos intentos no se recibe el código HTTP 200, PayU envía una alerta por correo electrónico.
* PayU reporta la página de confirmación una vez la transacción tenga un estado final, ed decir, cuando se aprueba, se rechaza o se vence. Si una transacción está en proceso (esperando pago o análisis), PayU no reporta hasta que la transacción tenga un estado final.
 
## Variables enviadas con la página de confirmación {#variables-sent-with-the-confirmation-page}

<details>
<summary>Variables en la página de confirmación</summary>
<br>
<div class="variables"></div>

| Campo | Tipo | Tamaño | Descripción |
|-|-|-|-|
| merchant_id | Numeric | 12 | Identificador de tu tienda en el sistema de PayU, puedes encontrar este número en el correo de creación de tu cuenta. |
| state_pol | Alphanumeric | 32 | Indica el estado de la transacción en el sistema.<br>[Ver los estados de la transacción en la columna respectiva]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-page" >}}). |
| risk | Decimal (#.00) | — | Riesgo asociado con la transacción. Los posibles valores están entre 0 y 1.<br>Entre mayor sea el valor, mayor es el riesgo.<br>Formato `###.00`. |
| response_code_pol | Alfanumérico | 255 | Código de repuesta de PayU.<br>[Ver los códigos de respuesta en la columna respectiva]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-page" >}}). |
| reference_sale | Alphanumeric | 255 | Referencia de la venta o la orden. Debe ser única por cada transacción enviada al sistema. |
| reference_pol | Alphanumeric | 255 | Referencia o número de transacción generado por PayU. |
| sign | Alphanumeric | 255 | Firma digital creada por cada transacción. |
| extra1 | Alphanumeric | 255 | Campo adicional para enviar información relacionada con la compra. |
| extra2 | Alphanumeric | 255 | Campo adicional para enviar información relacionada con la compra. |
| payment_method | Numérico | — | Identificador interno utilizado por los medios de pago.<br>[Ver los códigos de los medios de pago]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| payment_method_type | Numérico | — | Medio de pago utilizado. |
| installments_number | Numérico | — | Número de cuotas en las cuales se difirió el pago con tarjeta crédito. |
| value | Numérico | 14,2 | Valor total de la transacción. Puede contener dos dígitos decimales. Por ejemplo 10000.00 o 10000.|
| tax | Numérico | 14,2 | Valor del IVA de la transacción, si no se envió IVA, el sistema aplica el 19% automáticamente. Puede contener dos dígitos decimales. Por ejemplo 19000.00. En caso de que no tenga IVA, debe enviarse 0. |
| additional_value | Numérico | 14,2 | 	Valor Adicional no comisionable. |
| transaction_date | Fecha (AAAA-MM-DD HH:mm:ss) | — | Fecha en la que se realizó la transacción. |
| currency | Alfanumérico | 3 | Moneda respectiva en la que se hace el pago.<br>[Ver las monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). |
| email_buyer | Alfanumérico | 255 | Campo que contiene el correo electrónico del comprador para notificar el resultado de la transacción. Se recomienda validarlo cuando se toma este valor del formulario. |
| cus | Alfanumérico | 64 | El CUS (Código Único de Seguimiento) es la referencia de pago dentro del banco, aplica solo para pagos con PSE. |
| pse_bank | Alfanumérico | 255 | Nombre del banco, aplica solo para pagos con PSE. |
| test | Booleano (true, false) | — | Variable para identificar si la operación fue en modo pruebas. |
| description | Alfanumérico | 255 | Descripción de al venta. |
| billing_address | Alfanumérico | 255 | Dirección de facturación. |
| shipping_address | Alfanumérico | 50 | Dirección de la mercancía. |
| phone | Alfanumérico | 20 | Teléfono de residencia del comprador. |
| office_phone | Alfanumérico | 20 | Teléfono diurno del comprador. |
| account_number_ach | Alfanumérico | 36 | Identificador de la transacción. |
| account_type_ach | Alfanumérico | 36 | Tipo de la transacción. |
| administrative_fee | Decimal (#.00) | — | Valor de la tarifa administrativa. |
| administrative_fee_base | Decimal (#.00) | — | Valor base de la tarifa administrativa. |
| administrative_fee_tax | Decimal (#.00) | — | Valor del impuesto de la tarifa administrativa. |
| airline_code | Alfanumérico | 4 | Código de la aerolínea. |
| attempts | Numérico | — | Número de intentos de enviar la confirmación. |
| authorization_code | Alfanumérico | 12 | Código de autorización de la venta. |
| bank_id | Alfanumérico | 255 | Identificador del banco. |
| billing_city | Alfanumérico | 255 | Ciudad de facturación. |
| billing_country | Alfanumérico | 2 | Código ISO del país asociado a la dirección de facturación. |
| commision_pol | Decimal (#.00) | — | Valor de la comisión. |
| commision_pol_currency | Alfanumérico | 3 | Moneda  de la comisión. |
| customer_number | Numérico | — | Número personalizado. |
| date | Fecha (AAAA-MM-DD HH:mm:ss) | — | Fecha de la operación. |
| error_code_bank | Alfanumérico | 255 | Código de error del banco. |
| error_message_bank | Alfanumérico | 255 | Mensaje de error del banco. |
| exchange_rate | Decimal (#.00) | — | Valor de la tasa de cambio. |
| ip | Alfanumérico | 39 | Dirección IP desde donde se realizó la transacción. |
| nickname_buyer | Alfanumérico | 150 | Nombre corto del comprador. |
| nickname_seller | Alfanumérico | 150 | Nombre corto del vendedor. |
| payment_method_id | Numérico | — | Identificador del medio de pago.<br>[Ver los códigos de los medios de pago]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| payment_request_state | Alfanumérico | 32 | Estado de la solicitud de pago. |
| pseReference1 | Alfanumérico | 255 | Referencia no. 1 para pagos PSE. |
| pseReference2 | Alfanumérico | 255 | Referencia no. 2 para pagos PSE. |
| pseReference3 | Alfanumérico | 255 | Referencia no. 3 para pagos PSE. |
| response_message_pol | Alfanumérico | 255 | Mensaje de respuesta de PayU.<br>[Ver los mensajes de respuesta en la columna correspondiente]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-page" >}}). |
| shipping_city | Alfanumérico | 50 | Ciudad donde se entrega la mercancía. |
| shipping_country | Alfanumérico | 2 | Código ISO del país donde se entrega la mercancía. |
| transaction_bank_id | Alfanumérico | 255 | Identificador de la transacción en el sistema del banco. |
| transaction_id | Alfanumérico | 36 | Identificador de la transacción. |
| payment_method_name | Alfa Numérico | 255 | Medio de pago utilizado, por ejemplo VISA. |

</details>

## Ejemplo POST enviado a página de confirmación {#post-example-send-to-the-confirmation-page}
El siguiente es un ejemplo básico de las variables enviadas a la página de confirmación vía POST:

```HTML
response_code_pol=5
phone=
additional_value=0.00
test=1
transaction_date=2015-05-27 13:07:35
cc_number=************0004
cc_holder=test_buyer
error_code_bank=
billing_country=CO
bank_referenced_name=
description=test_payu_01
administrative_fee_tax=0.00
value=100.00
administrative_fee=0.00
payment_method_type=2
office_phone=
email_buyer=test@payulatam.com
response_message_pol=ENTITY_DECLINED
error_message_bank=
shipping_city=
transaction_id=f5e668f1-7ecc-4b83-a4d1-0aaa68260862
sign=e1b0939bbdc99ea84387bee9b90e4f5c
tax=0.00
payment_method=10
billing_address=cll 93
payment_method_name=VISA
pse_bank=
state_pol=6
date=2015.05.27 01:07:35
nickname_buyer=
reference_pol=7069375
currency=USD
risk=1.0
shipping_address=
bank_id=10
payment_request_state=R
customer_number=
administrative_fee_base=0.00
attempts=1
merchant_id=508029
exchange_rate=2541.15
shipping_country=
installments_number=1
franchise=VISA
payment_method_id=2
extra1=
extra2=
antifraudMerchantId=
extra3=
nickname_seller=
ip=190.242.116.98
airline_code=
billing_city=Bogota
pse_reference1=
reference_sale=2015-05-27 13:04:37
pse_reference3=
pse_reference2=
```

## Validación de la firma {#signature-validation}
La validación de la firma te permite comprobar la integridad de los datos, debes generar la firma con los datos que encuentras en la página de confirmación y compararla con la información del parámetro signature.

Para validar la firma en la página de respuesta debes tener en cuenta:

* Si el segundo decimal es cero, el valor de `new_value` para generar la firma debe tener un decimal. Ejemplo (`150.00` -> `150.0`).
* Si el segundo decimal no es cero, el valor de `new_value` para generar la firma debe mantener los dos decimales. Ejemplo (`150.26` -> `150.26`).
* Obten los parámetros para generar la firma (`merchantId`, `referenceCode`, `TX_VALUE`, `currency` y `transactionState`) de la página de respuesta, no de la base de datos. 
* Debes guardar tu ApiKey de forma segura.
* Crea la firma así:

```HTML
"ApiKey~merchant_id~reference_sale~new_value~currency~state_pol"
```
<br>

Ejemplo

**Con un decimal**

```
Your apiKey: 4Vj8eK4rloUd272L48hsrarnUA 
Parámetros obtenidos de la página de confirmación
- merchant_id = 508029
- reference_sale = TestPayU04
- value = 150.00
- currency = USD
- state_pol = 6

La firma se genera de la siguiente manera:
MD5(4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU04~150.0~USD~6) = b607a2c2fa100e0947b206d41864fb86

sign = b607a2c2fa100e0947b206d41864fb86
```

**Con dos decimales**

```
Your apiKey: 4Vj8eK4rloUd272L48hsrarnUA 
Parámetros obtenidos de la página de confirmación:
- merchant_id = 508029
- reference_sale = TestPayU05
- value = 150.26
- currency = USD
- state_pol = 4

La firma se genera de la siguiente manera:
MD5(4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU05~150.26~USD~4) = 1d95778a651e11a0ab93c2169a519cd6

sign = 1d95778a651e11a0ab93c2169a519cd6 
```

### Compara tu firma {#compare-your-signature}

<!-- Signature generator - confirmation page -->
<div id="blue-box">
<span class="grey-text-13">
<div>
<form method="POST" id="signature_form_confirmation_page" >
    <table>
        <span class="blue-text-13"><b>Algoritmo: &nbsp;</b></span>
        <select id = "signature_algorithm_confirmation_page" class="calc_selector form_control">
            <option  value="md5">MD5</option>
            <option  value="sha1">SHA1</option>
            <option  value="sha256">SHA256</option>
        </select>
        <br>
        <br>
        <span class="calc_text">&nbsp;(</span>
        <input class="form_control" type="text"  id ="signature_apikey_confirmation_page" name = "signature_apikey_confirmation_page" placeholder="ApiKey" maxlength="26"> ~
        <input class="form_control number" type="text"  id ="signature_merchanId_confirmation_page" name = "signature_merchanId_confirmation_page" placeholder="MerchantId" maxlength="7"> ~
        <input class="form_control" type="text"  id ="signature_referenceCode_confirmation_page" name = "signature_referenceCode_confirmation_page" placeholder="Referencia" maxlength="255"> ~
        <input class="form_control  number" type="text" id ="signature_amount_confirmation_page" name = "signature_amount_confirmation_page" placeholder="Monto" maxlength="14"> ~
        <select id = "signature_currency_confirmation_page" class="calc_selector form_control" >
            <option  value="USD">USD</option>
            <option  value="COP">COP</option>
            <option  value="MXN">MXN</option>
            <option  value="ARS">ARS</option>
            <option  value="PEN">PEN</option>
            <option  value="BRL">BRL</option>
            <option  value="CLP">CLP</option>
        </select> ~
        <select id = "signature_state_pol_confirmation_page" class="calc_selector form_control" >
            <option  value="4">4 (Aprobada)</option>
            <option  value="6">6 (Rechazada)</option>
            <option  value="5">5 (Expirada)</option>
        </select>
        <span class="calc_text">)</span>
        <br>
        <br>
        <br>
        <span class="blue-text-13"><b>Result:&nbsp;</b></span><input class="form_control" id ="signature_generated_confirmation_page" name = "signature_generated_confirmation_page" value = ""  readonly />
    </table>
    <br>
    <table width="50%"  border="0" cellspacing="2" cellpadding="2">
        <input type="button" name="signature_generate_confirmation_page" id="signature_generate_confirmation_page" value="Generar firma" >
        <input type="button" name="signature_generate_again_confirmation_page" id="signature_generate_again_confirmation_page" value="Generar nueva firma" >
    </table>
</form>
</div>
</span>
</div>
<!-- End of signature generator - confirmation page -->

Esta calculadora te permite generar la firma utilizando alguno de los métodos de cifrado disponibles.

## Reintentos de pago {#payment-retries}
Cuando se rechaza una transacción, el pagador tiene la opción de reintentar el pago utilizando el mismo u otro medio de pago. Ten en cuenta que por cada intento, PayU hace el llamado de la página de confirmación con su estado de transacción correspondiente.

Cada uno de estos llamados se hacen con la misma referencia de pago (`reference_sale`), el mismo identificador de la orden (`reference_pol`) pero diferente identificador de transacción (`transaction_id`). Por lo tanto, puedes recibir varios llamados a la página de confirmación para la misma venta.

A continuación, encontrarás un ejemplo e un intento rechazado y su reintento aprobado:

````
reference_sale=2015-05-27 13:04:37
reference_pol=7069375
transaction_id=f5e668f1-7ecc-4b83-a4d1-0aaa68260862
state_pol=6

reference_sale=2015-05-27 13:04:37
reference_pol=7069375
transaction_id=01cfdce8-68d5-4a4c-aabf-d89370a0b92f
state_pol=4
````

Observa que si uno de los llamados a la página de confirmación indica que una referencia de pago (`reference_sale`) fue aprobada, puedes estar seguro de que no recibirás ningún reporte a la misma referencia.