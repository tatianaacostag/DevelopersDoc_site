---
title: "Página de Respuesta"
linkTitle: "Página de Respuesta"
date: 2021-03-29T12:15:39-05:00
description: >
  La página de respuesta te permite mostrar el resultado de la transacción al pagador una vez que se haya completado. Aunque esta página no es obligatoria para el flujo transaccional, mejora la experiencia del pagador al redirigirlo de vuelta a tu sitio. Esta página ayuda a completar la experiencia de pago, pero ten en cuenta que el pagador puede cerrar el checkout sin visitarla.
  
  La integración puede enviar los datos del resultado del pago mediante el método HTTP GET, y tu plataforma puede invocar la página de respuesta para todos los estados de la transacción, incluyendo aprobado, rechazado, en validación y en espera de pago (para pagos en efectivo).

weight: 20
tags: ["subtopic"]
---
<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/jquery.validate.min.js"></script>
<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/additional-methods.min.js"></script>
<script src="/js/signature-generator/md5.js"></script>
<script src="/js/signature-generator/sha1.js"></script>
<script src="/js/signature-generator/sha256.js"></script>
<script src="/js/signature-generator/signature-generator.js"></script>

## Consideraciones {#considerations}
* Algunos proveedores de hosting pueden tener configuraciones que bloqueen el envío de URLs como valores de parámetros. Por ejemplo: `&merchant_url=http%3A%2F%2Fwww.mitienda.com`.
* Evita depender de la página de respuesta para actualizar tu base de datos o ejecutar procesos, ya que los usuarios no siempre regresan a ella. Usa la página de confirmación para estas operaciones.
* Si deseas mostrar información relacionada con la transacción, te recomendamos mostrar al menos los siguientes detalles: estado, referencia, valor, moneda y fecha.
* Se recomienda incluir el parámetro `responseUrl` en el formulario de pago o configurarlo en el Módulo PayU. El valor enviado en el parámetro tiene prioridad. Si la integración no encuentra un `responseUrl`, el proceso de pago finaliza en el webcheckout.

{{% alert title="Importante" color="warning"%}}
Si deseas que PayU siempre muestre la información de la transacción, deja el parámetro `responseUrl` en blanco tanto en el formulario de pago como en el Módulo PayU. En este caso, la experiencia de pago no mostrará al comprador la opción de regresar a tu sitio web.
{{% /alert %}}

## Parámetros
A continuación, los parámetros enviados a la página de respuesta.

<details>
<summary>Parámetros enviados a la página de respuesta</summary>
<br>
<div class="variables"></div>

| Campo | Tipo | Tamaño | Descripción | Aplica para |
|-|-|-|-|:-:|
| merchantId |  Numérico | 12 | Identificador de tu tienda en el sistema de PayU, puedes encontrar este número en el correo de creación de tu cuenta. | — |
| transactionState |  Numérico | 2 | Indica el estado de la transacción en el sistema.<br>[Ver los estados de la transacción en la columna respectiva]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| risk | Decimal (#.00) | — | Riesgo asociado con la transacción. Los posibles valores están entre 0 y 1.<br>Entre mayor sea el valor, mayor es el riesgo.<br>Formato `###.00`. | — |
| polResponseCode |  Alfanumérico | 64 | Código de respuesta.<br>[Ver los códigos de respuesta en la columna respectiva]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| polTransactionState | Numérico | 2 | Toma el valor del `pol Transaction State`.<br>[Ver los códigos de respuesta en la columna respectiva]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| referenceCode |  Alfanumérico | 255 | Referencia de la venta o la orden. Debe ser única por cada transacción enviada al sistema. | — |
| reference_pol |  Alfanumérico | 255 | Referencia o número de transacción generado por PayU. | — |
| signature |  Alfanumérico | 255 | Firma digital creada por cada transacción. | — |
| polPaymentMethod |  Alfanumérico | 255 | Identificador interno utilizado por los métodos de pago. | — |
| polPaymentMethodType |  Numérico | 2 | Método de pago utilizado.<br>[Ver los códigos de los métodos de pago]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). | — |
| installmentsNumber |  Numérico | 2 | Número de cuotas en las cuales se difirió el pago con tarjeta crédito. | — |
| TX_VALUE |  Numérico | 14.2 | Valor total de la transacción. Puede contener dos dígitos decimales. Por ejemplo 10000.00 o 10000. | — |
| TX_TAX |  Numérico | 14.2 | Valor del IVA de la transacción, si no se envió IVA, el sistema aplica el 19% automáticamente.<br>Puede contener dos dígitos decimales. Por ejemplo 19000.00.<br>En caso de que no tenga IVA, debe enviarse 0. | — |
| buyerEmail |  Alfanumérico | 255 | Campo que contiene el correo electrónico del comprador para notificar el resultado de la transacción. Se recomienda validarlo cuando se toma este valor del formulario. | — |
| processingDate |  Fecha (AAAA-MM-DD HH:mm:ss) | — | Fecha en la que se realizó la transacción. | — |
| currency |  Alfanumérico | 3 | Moneda respectiva en la que se hace el pago. El proceso de conciliación se realiza en pesos colombianos a la tasa representativa del día. | — |
| cus |  Alfanumérico | 255 | El CUS, Código Único de Seguimiento, es la referencia de pago dentro del banco, aplica solo para pagos con PSE. | PSE Colombia. |
| pseBank |  Alfanumérico | 255 | Nombre del banco, aplica solo para pagos con PSE. | PSE Colombia. |
| lng |  Alfanumérico | 2 | Idioma en el que se quiere mostrar la pasarela de pagos. | — |
| description |  Alfanumérico | 255 | Descripción de la venta. | — |
| lapResponseCode | Alfanumérico | 64 | Código de Respuesta entregado por PayU.<br>[Ver los códigos de respuesta en la columna respectiva]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| lapPaymentMethod |  Alfanumérico | 255 | Método de pago utilizado, por ejemplo VISA. | — |
| lapPaymentMethodType |  Alfanumérico | 255 | Tipo del método de pago utilizado, por ejemplo CREDIT_CARD. | — |
| lapTransactionState |  Alfanumérico | 32 | Estado de la transacción.<br>[Ver los estados de la transacción en la columna respectiva]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| message |  Alfanumérico | 255 | Descripción del estado de la transacción. | — |
| extra1 |  Alfanumérico | 255 | Campo adicional para enviar información relacionada con la compra. | — |
| extra2 |  Alfanumérico | 255 | Campo adicional para enviar información relacionada con la compra. | — |
| extra3 |  Alfanumérico | 255 | Campo adicional para enviar información relacionada con la compra. | — |
| authorizationCode |  Alfanumérico | 12 | Código de autorización de la venta. | — |
| merchant_address |  Alfanumérico | 255 | Dirección del comercio. | — |
| merchant_name |  Alfanumérico | 255 | Nombre del comercio. | — |
| merchant_url |  Alfanumérico | 255 | URL de la página web del comercio. | — |
| orderLanguage |  Alfanumérico | 2 | Idioma de la orden (ISO-639-1). | — |
| pseCycle |  Numérico | — | Identificador generado por PSE. | PSE Colombia |
| pseReference1 |  Alfanumérico | 255 | Referencia no. 1 por PSE payments. | PSE Colombia |
| pseReference2 |  Alfanumérico | 255 | Referencia no. 2 por PSE payments. | PSE Colombia |
| pseReference3 |  Alfanumérico | 255 | Referencia no. 3 por PSE payments. | PSE Colombia |
| telephone |  Alfanumérico | 20 | Teléfono del comercio. | — |
| transactionId |  Alfanumérico | 36 | Identificador del comercio. | — |
| trazabilityCode |  Alfanumérico | 64 | Código de trazabilidad de la venta en la página web del comercio. | — |
| TX_ADMINISTRATIVE_FEE | Decimal (#.00) | — | Valor de la tarifa administrativa. | — |
| TX_TAX_ADMINISTRATIVE _FEE | Decimal (#.00) | — | Valor del impuesto de la tarifa administrativa. | — |
| TX_TAX_ADMINISTRATIVE _FEE_RETURN_BASE | Decimal (#.00) | — | Valor base de la tarifa administrativa para reintegro de impuestos. | — |
| action_code_description |  Alfanumérico | 255 | Descripción del código de respuesta de VISANET. | VISANET Perú |
| cc_holder |  Alfanumérico | 150 | Nombre del tarjetahabiente. | VISANET Perú |
| cc_number |  Alfanumérico | — | Número de la tarjeta de crédito. | VISANET Perú |
| processing_date_time |  Fecha (AAAA-MM-DD) | — |  Fecha de procesamiento de la venta. | VISANET Perú |
| request_number |  Alfanumérico | 9 | Número de Orden + identificador de la transacción. | VISANET Perú |

</details>

## Integrar la página de respuesta {#integrate-the-response-page}
El siguiente es un ejemplo en PHP de cómo integrar la página de respuesta:

```PHP
<?php
$ApiKey = "4Vj8eK4rloUd272L48hsrarnUA";
$merchant_id = $_REQUEST['merchantId'];
$referenceCode = $_REQUEST['referenceCode'];
$TX_VALUE = $_REQUEST['TX_VALUE'];
$New_value = number_format($TX_VALUE, 1, '.', '');
$currency = $_REQUEST['currency'];
$transactionState = $_REQUEST['transactionState'];
$firma_cadena = "$ApiKey~$merchant_id~$referenceCode~$New_value~$currency~$transactionState";
$firmacreada = md5($firma_cadena);
$firma = $_REQUEST['signature'];
$reference_pol = $_REQUEST['reference_pol'];
$cus = $_REQUEST['cus'];
$extra1 = $_REQUEST['description'];
$pseBank = $_REQUEST['pseBank'];
$lapPaymentMethod = $_REQUEST['lapPaymentMethod'];
$transactionId = $_REQUEST['transactionId'];

if ($_REQUEST['transactionState'] == 4 ) {
	$estadoTx = "Transacción aprobada";
}

else if ($_REQUEST['transactionState'] == 6 ) {
	$estadoTx = "Transacción rechazada";
}

else if ($_REQUEST['transactionState'] == 104 ) {
	$estadoTx = "Error";
}

else if ($_REQUEST['transactionState'] == 7 ) {
	$estadoTx = "Pago pendiente";
}

else {
	$estadoTx=$_REQUEST['mensaje'];
}


if (strtoupper($firma) == strtoupper($firmacreada)) {
?>
	<h2>Resumen de la transacción</h2>
	<table>
	<tr>
	<td>Estado de la transacción</td>
	<td><?php echo $estadoTx; ?></td>
	</tr>
	<tr>
	<tr>
	<td>ID de la transacción</td>
	<td><?php echo $transactionId; ?></td>
	</tr>
	<tr>
	<td>Referencia de venta</td>
	<td><?php echo $reference_pol; ?></td>
	</tr>
	<tr>
	<td>Referencia de la transacción</td>
	<td><?php echo $referenceCode; ?></td>
	</tr>
	<tr>
	<?php
	if($pseBank != null) {
	?>
		<tr>
		<td>cus </td>
		<td><?php echo $cus; ?> </td>
		</tr>
		<tr>
		<td>Banco </td>
		<td><?php echo $pseBank; ?> </td>
		</tr>
	<?php
	}
	?>
	<tr>
	<td>Valor total</td>
	<td>$<?php echo number_format($TX_VALUE); ?></td>
	</tr>
	<tr>
	<td>Moneda</td>
	<td><?php echo $currency; ?></td>
	</tr>
	<tr>
	<td>Descripción</td>
	<td><?php echo ($extra1); ?></td>
	</tr>
	<tr>
	<td>Entidad:</td>
	<td><?php echo ($lapPaymentMethod); ?></td>
	</tr>
	</table>
<?php
}
else
{
?>
	<h1>Error validando la firma digital.</h1>
<?php
}
?>
```
<br>

Ejemplo GET enviado a la página de respuesta.

```HTML
http://mypaginadeprueba.com/response.php?&merchantId=508029&merchant_name=Test+PayU+Test&merchant_address=Av+123+Calle+12&telephone=7512354&merchant_url=http%3A%2F%2Fpruebaslapv.xtrweb.com&transactionState=6&lapTransactionState=DECLINED&message=Declinada&referenceCode=2015-05-27+13%3A04%3A37&reference_pol=7069375&transactionId=f5e668f1-7ecc-4b83-a4d1-0aaa68260862&description=test_payu_01&trazabilityCode=&cus=&orderLanguage=es&extra1=&extra2=&extra3=&polTransactionState=6&signature=e1b0939bbdc99ea84387bee9b90e4f5c&polResponseCode=5&lapResponseCode=ENTITY_DECLINED&risk=1.00&polPaymentMethod=10&lapPaymentMethod=VISA&polPaymentMethodType=2&lapPaymentMethodType=CREDIT_CARD&installmentsNumber=1&TX_VALUE=100.00&TX_TAX=.00&currency=USD&lng=es&pseCycle=&buyerEmail=test%40payulatam.com&pseBank=&pseReference1=&pseReference2=&pseReference3=&authorizationCode=&TX_ADMINISTRATIVE_FEE=.00&TX_TAX_ADMINISTRATIVE_FEE=.00&TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE=.00
```

## Validación de la firma {#signature-validation}
La validación de la firma te permite comprobar la integridad de los datos, debes generar la firma con los datos que encuentras en la página de respuesta y compararla con la información del parámetro signature.

Para validar la firma en la página de respuesta debes tener en cuenta:

* Para obtener el nuevo valor `new_value` se debe aproximar `TX_VALUE` siempre a un decimal con el método de redondeo _Round half to even_:
  - Si el primer decimal es par y el segundo es `5`, redondéalo hacia el menor valor.
  - Si el primer decimal es impar y el segundo es `5`, redondéalo hacia el mayor valor.
  - Si no, debes redondearlo al decimal más cercano.
* Obten los parámetros para generar la firma (`merchantId`, `referenceCode`, `TX_VALUE`, `currency` y `transactionState`) de la página de respuesta, no de la base de datos. 
* Debes guardar tu ApiKey de forma segura.
* Crea la firma así:

```HTML
"ApiKey~merchantId~referenceCode~new_value~currency~transactionState"
```
<br>

Ejemplos:

**Primer decimal es par y el segundo es 5**

```
Your apiKey: 4Vj8eK4rloUd272L48hsrarnUA
Parámetros obtenidos de la página de respuesta:
- merchantId = 508029
- referenceCode = TestPayU04
- TX_VALUE = 150.25
- currency = USD
- transactionState = 6

La firma se genera así:
MD5(4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU04~150.2~USD~6) = 00286dc735bd9eaa8ae3a3a4cbb40688

signature = 00286dc735bd9eaa8ae3a3a4cbb40688
```

**Primer decimal es impar y el segundo es 5**

```
Your apiKey: 4Vj8eK4rloUd272L48hsrarnUA 
Parámetros obtenidos de la página de respuesta:
- merchantId = 508029
- referenceCode = TestPayU04
- TX_VALUE = 150.35
- currency = USD
- transactionState = 6

La firma se genera así:
MD5(4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU04~150.4~USD~6) = 9df2bb60e2838170009040982967923f

signature = 9df2bb60e2838170009040982967923f 
```

**Otros casos**
```
Your apiKey: 4Vj8eK4rloUd272L48hsrarnUA 
Parámetros obtenidos de la página de respuesta:
- merchantId = 508029
- referenceCode = TestPayU04
- TX_VALUE = 150.34
- currency = USD
- transactionState = 6

La firma se genera así:
MD5(4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU04~150.3~USD~6) = 779f163be9347a691bcdb25064644795

signature = 779f163be9347a691bcdb25064644795 
```

### Compara tu firma {#compare-your-signature}

<!-- Generador de firmas pagina de respuesta -->
<div id="blue-box">
<span class="grey-text-13">
<div>
<form method="POST" id="signature_form_response_page" >
    <table>
        <span class="blue-text-13"><b>Algoritmo: &nbsp;</b></span>
        <select id = "signature_algorithm_response_page" class="calc_selector form_control">
            <option  value="md5">MD5</option>
            <option  value="sha1">SHA1</option>
            <option  value="sha256">SHA256</option>
        </select>
        <br>
        <br>
        <span class="calc_text">&nbsp;(</span>
        <input class="form_control" type="text"  id ="signature_apikey_response_page" name = "signature_apikey_response_page" placeholder="ApiKey" maxlength="26"> ~
        <input class="form_control number" type="text"  id ="signature_merchanId_response_page" name = "signature_merchanId_response_page" placeholder="MerchantId" maxlength="7"> ~
        <input class="form_control" type="text"  id ="signature_referenceCode_response_page" name = "signature_referenceCode_response_page" placeholder="Referencia" maxlength="255"> ~
        <input class="form_control  number" type="text" id ="signature_amount_response_page" name = "signature_amount_response_page" placeholder="Valor" maxlength="14"> ~
        <select id = "signature_currency_response_page" class="calc_selector form_control" >
            <option  value="USD">USD</option>
            <option  value="COP">COP</option>
            <option  value="MXN">MXN</option>
            <option  value="ARS">ARS</option>
            <option  value="PEN">PEN</option>
            <option  value="BRL">BRL</option>
            <option  value="CLP">CLP</option>
        </select> ~
        <select id = "signature_transaction_state_response_page" class="calc_selector form_control" >
            <option  value="4">4 (Aprobada)</option>
            <option  value="6">6 (Rechazada)</option>
            <option  value="104">104 (Error)</option>
            <option  value="5">5 (Expirada)</option>
            <option  value="7">7 (Pendiente)</option>
        </select>
        <span class="calc_text">)</span>
        <br>
        <br>
        <br>
        <span class="blue-text-13"><b>Resultado:&nbsp;</b></span><input class="form_control" id ="signature_generated_response_page" name = "signature_generated_response_page" value = ""  readonly />
    </table>
    <br>
    <table width="50%"  border="0" cellspacing="2" cellpadding="2">
        <input type="button" name="signature_generate_response_page" id="signature_generate_response_page" value="Generar firma" >
        <input type="button" name="signature_generate_again_response_page" id="signature_generate_again_response_page" value="Generar nueva firma" >
    </table>
</form>
</div>
</span>
</div>
<!-- Fin del generador de firmas pagina de respuesta-->

Esta calculadora te permite generar la firma utilizando alguno de los métodos de cifrado disponibles.