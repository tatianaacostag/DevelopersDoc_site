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
* DNo utilices certificados de seguridad de curva elíptica o aquellos que cuenten con la suite de encriptación `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA` en tu página de confirmación.
* PayU asume que la página de confirmación es reportada correctamente cuando recibe el código HTTP 200; en caso contrario, PayU realiza un máximo de nueve (9) intentos de enviar la página de confirmación a tu sistema. Si luego de estos intentos no se recibe el código HTTP 200, PayU envía una alerta por correo electrónico.
* PayU reporta la página de confirmación una vez la transacción tenga un estado final, ed decir, cuando se aprueba, se rechaza o se vence. Si una transacción está en proceso (esperando pago o análisis), PayU no reporta hasta que la transacción tenga un estado final.
 
## Variables enviadas con la página de confirmación {#variables-sent-with-the-confirmation-page}

<details open>
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
| installments_number | Numérico | — | Number of installments in which the credit card payment was deferred. |
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
| shipping_address | Alfanumérico | 50 | The delivery address for the merchandise. |
| phone | Alfanumérico | 20 | The buyer’s residence phone. |
| office_phone | Alfanumérico | 20 | The buyer’s daytime phone. |
| account_number_ach | Alfanumérico | 36 | The transaction’s identifier. |
| account_type_ach | Alfanumérico | 36 | The transaction’s identifier. |
| administrative_fee | Decimal (#.00) | — | Value of the administrative fee |
| administrative_fee_base | Decimal (#.00) | — | Base value of the administrative fee |
| administrative_fee_tax | Decimal (#.00) | — | Tax value of the administrative fee |
| airline_code | Alfanumérico | 4 | Airline code |
| attempts | Numérico | — | Number of attempts of sending the confirmation. |
| authorization_code | Alfanumérico | 12 | Sale’s authorization code |
| bank_id | Alfanumérico | 255 | Bank identifier |
| billing_city | Alfanumérico | 255 | The billing city. |
| billing_country | Alfanumérico | 2 | The ISO code of the country associated with the billing address. |
| commision_pol | Decimal (#.00) | — | Value of the commission. |
| commision_pol_currency | Alfanumérico | 3 | Currency of the commission |
| customer_number | Numérico | — | Customer number. |
| date | Fecha (AAAA-MM-DD HH:mm:ss) | — | Fecha of the operation. |
| error_code_bank | Alfanumérico | 255 | Error code of the bank. |
| error_message_bank | Alfanumérico | 255 | Error message of the bank |
| exchange_rate | Decimal (#.00) | — | Value of the exchange rate. |
| ip | Alfanumérico | 39 | The IP address from which the transaction was made. |
| nickname_buyer | Alfanumérico | 150 | Short name of the buyer. |
| nickname_seller | Alfanumérico | 150 | Short name of the seller. |
| payment_method_id | Numérico | — | Identifier of payment methods.<br>[See the codes of the payment methods]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| payment_request_state | Alfanumérico | 32 | Status of the payment request. |
| pseReference1 | Alfanumérico | 255 | Referencia no. 1 para pagos PSE. |
| pseReference2 | Alfanumérico | 255 | Referencia no. 2 para pagos PSE. |
| pseReference3 | Alfanumérico | 255 | Referencia no. 3 para pagos PSE. |
| response_message_pol | Alfanumérico | 255 | PayU’s response message.<br>[See the response messages in the given column]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-page" >}}). |
| shipping_city | Alfanumérico | 50 | The city where the merchandise is delivered. |
| shipping_country | Alfanumérico | 2 | The ISO code associated with the country where the merchandise is delivered. |
| transaction_bank_id | Alfanumérico | 255 | ID of the transaction in the bank's system. |
| transaction_id | Alfanumérico | 36 | Transaction identifier. |
| payment_method_name | Alfa Numérico | 255 | Payment method used in the payment, for example VISA. |

</details>

## Ejemplo POST enviado a página de confirmación {#post-example-send-to-the-confirmation-page}
The following is a basic example of the variables sent to the response page via POST:

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
The signature validation allows you to check the data integrity, you must generate the signature with the information you find in the confirmation page and compare it with the information from the signature parameter.

To validate the signature in the confirmation page, you should consider:

* If the second decimal is zero, the `new_value` to generate the signature must have one decimal. Example (`150.00` -> `150.0`).
* If the second decimal is not zero, the `new_value` to generate the signature must keep the same two decimals. Example (`150.26` -> `150.26`).
* Get the parameters to generate the signature (`merchant_id`, `reference_sale`, `value`, `currency`, and `state_pol`) from the confirmation page, do not get them from your database. 
* You must store your ApiKey safely.
* Create the signature as follows:

```HTML
"ApiKey~merchant_id~reference_sale~new_value~currency~state_pol"
```
<br>

Example

**With one decimal**

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

**With two decimals**

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
        <span class="blue-text-13"><b>Algorithm: &nbsp;</b></span>
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
        <input class="form_control" type="text"  id ="signature_referenceCode_confirmation_page" name = "signature_referenceCode_confirmation_page" placeholder="Reference" maxlength="255"> ~
        <input class="form_control  number" type="text" id ="signature_amount_confirmation_page" name = "signature_amount_confirmation_page" placeholder="Amount" maxlength="14"> ~
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
            <option  value="4">4 (Approved)</option>
            <option  value="6">6 (Declined)</option>
            <option  value="5">5 (Expired)</option>
        </select>
        <span class="calc_text">)</span>
        <br>
        <br>
        <br>
        <span class="blue-text-13"><b>Result:&nbsp;</b></span><input class="form_control" id ="signature_generated_confirmation_page" name = "signature_generated_confirmation_page" value = ""  readonly />
    </table>
    <br>
    <table width="50%"  border="0" cellspacing="2" cellpadding="2">
        <input type="button" name="signature_generate_confirmation_page" id="signature_generate_confirmation_page" value="Generate signature" >
        <input type="button" name="signature_generate_again_confirmation_page" id="signature_generate_again_confirmation_page" value="Generate new signature" >
    </table>
</form>
</div>
</span>
</div>
<!-- End of signature generator - confirmation page -->

Esta calculadora te permite generar la firma utilizando alguno de los métodos de cifrado disponibles.

## Reintentos de pago {#payment-retries}
When a transaction is rejected, the payer has the option to retry the payment using the same payment method or another. Keep in mind that for each attempt, PayU makes the call to the confirmation page with the corresponding transaction status.

Each of these calls are made with the same payment reference (`reference_sale`), the same order identifier (`reference_pol`) but with different transaction identifier (`transaction_id`). Therefore, you can receive several calls to the confirmation page for the same sale.

Below, you find an example of a rejected attempt and its approved retry:

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

Note that if one of those calls to the confirmation page indicates that a payment reference (`reference_sale`) was approved, you can be certain that you will not receive any report to the same reference.