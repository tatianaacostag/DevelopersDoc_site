---
title: "Página de Respuesta"
linkTitle: "Página de Respuesta"
date: 2021-03-29T12:15:39-05:00
description: >
  La página de respuesta muestra el resultado de la transacción al pagador. Aunque es opcional en el flujo de la transacción, esta página mejora la experiencia del pagador al redirigirlo de nuevo a tu sitio y concluir el proceso de pago. Sin embargo, ten en cuenta que el pagador podría cerrar el checkout antes de visitar esta página.
weight: 20
tags: ["subtopic"]
---

La integración puede transmitir los datos del resultado del pago mediante HTTP GET, y tu plataforma puede activar la página de respuesta para todos los estados de la transacción, incluidos aprobado, rechazado, en validación y pendiente de pago (en efectivo).

## Consideraciones {#considerations}

* Algunos proveedores de hosting pueden tener configuraciones que bloqueen el envío de URLs como valores de parámetros. Por ejemplo: `&merchant_url=http%3A%2F%2Fwww.mitienda.com`.
* Evita depender de la página de respuesta para actualizar tu base de datos o ejecutar procesos, ya que los usuarios no siempre regresan a ella. Usa la página de confirmación para estas operaciones.
* Si deseas mostrar información relacionada con la transacción, te recomendamos mostrar al menos los siguientes detalles: estado, referencia, valor, moneda y fecha.
* Se recomienda incluir el parámetro `responseUrl` en el formulario de pago o configurarlo en el Módulo PayU. El valor enviado en el parámetro tiene prioridad. Si la integración no encuentra un `responseUrl`, el proceso de pago finaliza en el webcheckout.

{{% alert title="Importante" color="warning"%}}

Si deseas que PayU siempre muestre la información de la transacción, deja el parámetro `responseUrl` en blanco tanto en el formulario de pago como en el Módulo PayU. En este caso, la experiencia de pago no mostrará al comprador la opción de regresar a tu sitio web.

{{% /alert %}}

## Parámetros {#parameters}

A continuación, los parámetros enviados a la página de respuesta.

<details>

<summary>Parámetros</summary>

<br>

<div class="variables"></div>

| Campo | Tipo | Tamaño | Descripción | Aplica a |
|-|-|-|-|:-:|
| `merchantId` | Numérico | 12 | Número de identificación del comercio en el sistema de PayU. Puedes encontrar este número en el correo de creación de cuenta. | — |
| `transactionState` | Numérico | 2 | Indica el estado de la transacción en el sistema.<br>[Consulta los estados de la transacción en la columna indicada]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| `risk` | Decimal (#.00) | — | Riesgo asociado a la transacción. Valores entre 0 y 1.<br>Cuanto mayor sea el valor, mayor es el riesgo.<br>Formato `###.00`. | — |
| `polResponseCode` | Alfanumérico | 64 | Código de respuesta.<br>[Consulta los códigos de respuesta en la columna indicada]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| `polTransactionState` | Numérico | 2 | Toma el valor del `pol Transaction State`.<br>[Consulta los códigos de respuesta en la columna indicada]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| `referenceCode` | Alfanumérico | 255 | Referencia de la venta o pedido. Debe ser única para cada transacción enviada al sistema. | — |
| `reference_pol` | Alfanumérico | 255 | Referencia o número de transacción generado por PayU. | — |
| `signature` | Alfanumérico | 255 | Firma digital creada para cada una de las transacciones. | — |
| `polPaymentMethod` | Alfanumérico | 255 | Identificador interno del método de pago utilizado. | — |
| `polPaymentMethodType` | Numérico | 2 | Tipo de método de pago utilizado.<br>[Consulta los códigos de los métodos de pago]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). | — |
| `installmentsNumber` | Numérico | 2 | Número de cuotas en que se difirió el pago con tarjeta de crédito. | — |
| `TX_VALUE` | Numérico | 14.2 | Valor total de la transacción. Puede contener dos decimales. Ejemplo: 10000.00 o 10000. | — |
| `TX_TAX` | Numérico | 14.2 | Valor del IVA de la transacción. Si no se envía, el sistema aplica 19% automáticamente.<br>Puede contener dos decimales. Ejemplo: 19000.00.<br>Si no hay IVA, debe enviarse 0. | — |
| `buyerEmail` | Alfanumérico | 255 | Correo electrónico del comprador para notificar el resultado de la transacción. Se recomienda validarlo al capturarlo en un formulario. | — |
| `processingDate` | Fecha (YYYY-MM-DD HH:mm:ss) | — | Fecha en la que se realizó la transacción. | — |
| `currency` | Alfanumérico | 3 | Moneda en la que se realiza el pago. El proceso de conciliación se hace en pesos colombianos a la tasa representativa del día. | — |
| `cus` | Alfanumérico | 255 | El CUS, código único de seguimiento, es la referencia del pago dentro del banco. Aplica solo para pagos con PSE. | PSE Colombia |
| `pseBank` | Alfanumérico | 255 | Nombre del banco. Aplica solo para pagos con PSE. | PSE Colombia |
| `lng` | Alfanumérico | 2 | Idioma en el que se muestra la pasarela de pagos. | — |
| `description` | Alfanumérico | 255 | Descripción de la venta. | — |
| `lapResponseCode` | Alfanumérico | 64 | Código de respuesta entregado por PayU.<br>[Consulta los códigos de respuesta en la columna indicada]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| `lapPaymentMethod` | Alfanumérico | 255 | Método de pago utilizado, por ejemplo VISA. | — |
| `lapPaymentMethodType` | Alfanumérico | 255 | Tipo de método de pago utilizado, por ejemplo CREDIT_CARD. | — |
| `lapTransactionState` | Alfanumérico | 32 | Estado de la transacción.<br>[Consulta el estado de la transacción en la columna indicada]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| `message` | Alfanumérico | 255 | Descripción del estado de la transacción. | — |
| `extra1` | Alfanumérico | 255 | Campo adicional para enviar información sobre la compra. | — |
| `extra2` | Alfanumérico | 255 | Campo adicional para enviar información sobre la compra. | — |
| `extra3` | Alfanumérico | 255 | Campo adicional para enviar información sobre la compra. | — |
| `authorizationCode` | Alfanumérico | 12 | Código de autorización de la venta. | — |
| `merchant_address` | Alfanumérico | 255 | Dirección del comercio. | — |
| `merchant_name` | Alfanumérico | 255 | Nombre del comercio. | — |
| `merchant_url` | Alfanumérico | 255 | URL del sitio web del comercio. | — |
| `orderLanguage` | Alfanumérico | 2 | Idioma del pedido (ISO-639-1). | — |
| `pseCycle` | Numérico | — | Identificador generado por PSE. | PSE Colombia |
| `pseReference1` | Alfanumérico | 255 | Referencia n.º 1 para pagos con PSE. | PSE Colombia |
| `pseReference2` | Alfanumérico | 255 | Referencia n.º 2 para pagos con PSE. | PSE Colombia |
| `pseReference3` | Alfanumérico | 255 | Referencia n.º 3 para pagos con PSE. | PSE Colombia |
| `telephone` | Alfanumérico | 20 | Teléfono del comercio. | — |
| `transactionId` | Alfanumérico | 36 | Identificador de la transacción. | — |
| `trazabilityCode` | Alfanumérico | 64 | Código de trazabilidad de la venta en el sitio del comercio. | — |
| `TX_ADMINISTRATIVE_FEE` | Decimal (#.00) | — | Valor de la comisión administrativa. | — |
| `TX_TAX_ADMINISTRATIVE_FEE` | Decimal (#.00) | — | Valor del impuesto de la comisión administrativa. | — |
| `TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE` | Decimal (#.00) | — | Valor base de la comisión administrativa para devolución de impuestos. | — |
| `action_code_description` | Alfanumérico | 255 | Descripción del código de respuesta de VISANET. | VISANET Perú |
| `cc_holder` | Alfanumérico | 150 | Nombre del titular de la tarjeta. | VISANET Perú |
| `cc_number` | Alfanumérico | — | Número de la tarjeta de crédito. | VISANET Perú |
| `processing_date_time` | Fecha (YYYY-MM-DD) | — | Fecha de procesamiento de la venta. | VISANET Perú |
| `request_number` | Alfanumérico | 9 | Número de pedido + identificador de transacción. | VISANET Perú |

</details>

## Integrar la página de respuesta {#integrating-the-response-page}

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

**Ejemplo de una solicitud GET enviada a la página de respuesta:**

```HTML
http://mypaginadeprueba.com/response.php?&merchantId=508029&merchant_name=Test+PayU+Test&merchant_address=Av+123+Calle+12&telephone=7512354&merchant_url=http%3A%2F%2Fpruebaslapv.xtrweb.com&transactionState=6&lapTransactionState=DECLINED&message=Declinada&referenceCode=2015-05-27+13%3A04%3A37&reference_pol=7069375&transactionId=f5e668f1-7ecc-4b83-a4d1-0aaa68260862&description=test_payu_01&trazabilityCode=&cus=&orderLanguage=es&extra1=&extra2=&extra3=&polTransactionState=6&signature=e1b0939bbdc99ea84387bee9b90e4f5c&polResponseCode=5&lapResponseCode=ENTITY_DECLINED&risk=1.00&polPaymentMethod=10&lapPaymentMethod=VISA&polPaymentMethodType=2&lapPaymentMethodType=CREDIT_CARD&installmentsNumber=1&TX_VALUE=100.00&TX_TAX=.00&currency=USD&lng=es&pseCycle=&buyerEmail=test%40payulatam.com&pseBank=&pseReference1=&pseReference2=&pseReference3=&authorizationCode=&TX_ADMINISTRATIVE_FEE=.00&TX_TAX_ADMINISTRATIVE_FEE=.00&TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE=.00
```

## Validación de la firma {#signature-validation}

La validación de la firma permite verificar la integridad de los datos. Debes generar una firma utilizando la información proporcionada en la página de respuesta y compararla con el valor del parámetro `signature`.

### Consideraciones importantes

* Para calcular el nuevo valor `new_value`, redondea el `TX_VALUE` a un decimal utilizando el método _redondeo al par más cercano_:
  - Si el primer dígito decimal es par y el segundo es `5`, redondea hacia abajo.
  - Si el primer dígito decimal es impar y el segundo es `5`, redondea hacia arriba.
  - En todos los demás casos, redondea normalmente al decimal más cercano.
* Siempre utiliza los valores de la página de respuesta (`merchantId`, `referenceCode`, `TX_VALUE`, `currency` y `transactionState`) para generar la firma. **No** uses los valores de tu base de datos.
* Almacena tu clave API de forma segura.
* Construye la cadena de firma en el siguiente formato:

<p>
    
    apiKey~merchantId~referenceCode~new_value~currency~transactionState
	
### Ejemplos de firma

Los siguientes ejemplos ilustran cómo generar una firma, en este caso, utilizando HMAC-SHA256.

#### El primer decimal es un número par y el segundo es 5

| **Elemento** | **Valor** |
|--------------|-----------|
| Parámetros de la cadena | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchantId: 508029` <br> `referenceCode: PayUTest01` <br> `TX_VALUE: 150.25` <br> `currency: USD` <br> `transactionState: 6` |
| Cadena de entrada (formateada) | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.2~USD~6` |
| Clave secreta (solo para HMAC-SHA256) | `test123` |
| `signature` generada | `5ac639cc57ea3ceccef66243f7a20412ea4ae0c86b5121ca6aa67597266057d1` |

#### El primer decimal es un número impar y el segundo es 5

| **Elemento** | **Valor** |
|--------------|-----------|
| Parámetros de la cadena | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchantId: 508029` <br> `referenceCode: PayUTest01` <br> `TX_VALUE: 150.35` <br> `currency: USD` <br> `transactionState: 6` |
| Cadena de entrada (formateada) | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.4~USD~6` |
| Clave secreta (solo para HMAC-SHA256) | `test123` |
| `signature` generada | `7bbb5dd21b3c668bbfec8455c4f4fd3887dff1caa9c5da3895ddd914065b4905` |

#### Otros casos

| **Elemento** | **Valor** |
|--------------|-----------|
| Parámetros de la cadena | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchantId: 508029` <br> `referenceCode: PayUTest01` <br> `TX_VALUE: 150.34` <br> `currency: USD` <br> `transactionState: 6` |
| Cadena de entrada (formato) | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.3~USD~6` |
| Clave secreta (solo para HMAC-SHA256) | `test123` |
| `signature` generada | `50c8aae35caf923fbdbd791d7842b916ab7d6597b7c4032dd92ab67b7bb43e8a` |

### Valida tu firma {#validate-your-signature}

Utiliza este generador para crear una firma con cualquiera de los métodos de cifrado disponibles. Esta funcionalidad te ayuda a verificar el valor de `signature` que PayU envía a tu página de respuesta.

<div>
{{< responsepage/signaturegen_resp_es >}}
</div>
