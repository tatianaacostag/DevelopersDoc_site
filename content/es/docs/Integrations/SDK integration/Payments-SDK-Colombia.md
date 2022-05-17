---
title: "SDK de Pagos - Colombia"
linkTitle: "SDK de Pagos - Colombia"
date: 2021-05-03T15:48:08-05:00
description: >
  El SDK de Pagos de Colombia le permite a tu tienda procesar diferentes tipos de transacciones con múltiples métodos de pago.
weight: 40
tags: ["subtopic"]
---
<script src="/js/banner.js"></script>

<script>
window.onload = function() {
    var bannerText = "<ul class='fa-ul' style='--fa-li-width: 2em;margin-bottom: initial;'><li style='margin-bottom: initial;'><span class='fa-li'><i class='fas fa-exclamation-triangle'></i></span>Informamos que PayU S.A. ha sido notificado por parte de IGT - operador de la red Baloto - su decisión de terminar el contrato para el recaudo en efectivo debido a la entrada de un nuevo operador, el cual a la fecha no ha entregado información sobre la continuidad de este servicio. Por lo tanto, el servicio de pago a través de Baloto dejará de funcionar a partir del <b>25 de mayo de 2022</b>. Se recomienda deshabilitar este medio de pago al menos siete (7) días antes de esta fecha. Si necesitas asistencia adicional, contacta al equipo de soporte técnico a través de <a href='mailto:tecnico.co@payu.com'>tecnico.co@payu.com</a>.</li></ul>";

    loadBanner(bannerText);
}

window.onresize = function() {
    refreshBanner();
}
</script>

<style type="text/css" media="screen">
    div#banner { 
        z-index: 999;
        background-color: #DDEEEE; 
        width: 100%;
        margin-top: -1.3rem;
    }
    div#banner-content { 
        margin: 0 auto; 
        padding: 10px; 
    }
</style>

Para integrarte con el SDK de Pagos de Colombia, apunta tus peticiones a las siguientes URLs:

{{< tabs tabTotal="2" tabID="1" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
// URL para pruebas: https://sandbox.api.payulatam.com/payments-api/
PayU.paymentsUrl = “https://api.payulatam.com/payments-api/”;
// URL para pruebas: https://sandbox.api.payulatam.com/reports-api/
PayU.reportsUrl = “https://api.payulatam.com/reports-api/”;
```

{{< /tab >}}

{{< tab tabNum="2" >}}

```PHP
// URL para pruebas: https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi
Environment::setPaymentsCustomUrl(“https://api.payulatam.com/payments-api/4.0/service.cgi”);
// URL para pruebas: https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi
Environment::setReportsCustomUrl(“https://api.payulatam.com/reports-api/4.0/service.cgi”);
```

{{< /tab >}}
{{< /tabs >}}

## Métodos disponibles {#available-methods}
El SDK de pagos incluye los siguientes métodos:

* [Enviar transacciones con tarjeta de crédito]({{< ref "#submit-transaction-with-credit-cards" >}})
* [Enviar transacciones en efectivo o Referencia bancaria]({{< ref "#submit-transaction-with-cash-or-bank-reference" >}})
* [Enviar transacciones con transferencia bancaria]({{< ref "#submit-transaction-with-bank-transfer" >}})
* [Lista de bancos - PSE]({{< ref "#bank-list---pse" >}})
* [Consultar métodos de pago disponibles]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Nota" color="info"%}}
Para confirmar el estado de una transacción, puedes utilizar el [SDK de Consultas]({{< ref "QueriesSDK.md" >}}).
{{% /alert %}}

## Enviar transacciones con tarjeta de crédito {#submit-transaction-with-credit-cards}
Este método te permite procesar pagos realizados por tus clientes utilizando tarjetas de crédito. Para Colombia, puedes realizar flujos de un paso (**Cobro**). Para más información, consulta los [flujos de pago]({{< ref "payments.md#payment-flows" >}}).

### Consideraciones {#considerations}
* Envía un método de pago válido de tarjeta de crédito, [mira los métodos de pago disponibles para Colombia]({{< ref "select-your-payment-method.html#Colombia" >}}).
* Para pagos con tókenes de tarjeta de crédito, asigna los parámetros `TOKEN_ID` y `CREDIT_CARD_SECURITY_CODE` (si procesas con código de seguridad) reemplazando la información de la tarjeta de crédito. Para más información, consulta el [SDK de Tokenización]({{< ref "TokenizationSDK.md" >}}).
* Por defecto, no está activo el procesamiento de tarjetas de crédito sin código de seguridad. Si quieres activar esta funcionalidad, contacta a tu representante de ventas. Luego de que se te active esta funcionalidad, asigna el parámetro `PROCESS_WITHOUT_CVV2` con true y elimina el parámetro `CREDIT_CARD_SECURITY_CODE`.
* Para la tarjeta Crédito Fácil Codensa, el número de cuotas soportadas es 1 a 12, 18, 24, 36 y 48.
* Para la tarjeta Crédito Fácil Codensa, el pagador puede escoger uno de los siguientes tipos de documento en la variable `PAYER_DNI_TYPE`:

| ISO | Descripción                                                                                             |
|:---:|---------------------------------------------------------------------------------------------------------|
|  CC | Cédula de ciudadanía.                                                                                   |
|  CE | Cédula de extranjería.                                                                                  |
| NIT | Número de Identificación Tributaria (Empresas).                                                         |
|  TI | Tarjeta de identidad.                                                                                   |
|  PP | Pasaporte.                                                                                              |
| IDC | Identificador único de cliente, para el caso de ID’s únicos de clientes/usuarios de servicios públicos. |
| CEL | En caso de identificarse a través de la línea del móvil.                                                |
|  RC | Registro civil de nacimiento.                                                                           |
|  DE | Documento de identificación extranjero.                                                                 |

### Llamado del método {#method-call}
Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "65000";

Map<String, String> parameters = new HashMap<String, String>();

// Ingresa aquí el identificador de la cuenta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512321");
// Ingresa aquí la referencia de pago.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
// Ingresa aquí la descripción del pago.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Ingresa aquí el idioma de la transacción.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Valores --
//Ingresa aquí el valor.
parameters.put(PayU.PARAMETERS.VALUE, ""+value);
// Ingresa el valor del IVA (Impuesto al valor agregado válido únicamente en Colombia) de la transacción,
// Si no se envía IVA, ell sistema aplica el 19% automáticamente. Puede contener dos dígitos decimales
// Ejemplo 19000.00. En caso de ser exento de IVA, asigna 0.
parameters.put(PayU.PARAMETERS.TAX_VALUE, "10378");
// Ingresa el valor base sobre el que se calcula el IVA (válido únicamente en Colombia).
// En caso de ser exento de IVA, asigna 0.
parameters.put(PayU.PARAMETERS.TAX_RETURN_BASE, "54622");
// Ingresa aquí la moneda.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.COP.name());

// -- Comprador --
// Ingresa aquí el identificador del comprador.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
// Ingresa aquí el nombre del comprador.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer  name");
// Ingresa aquí el correo electrónico del comprador
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
// Ingresa aquí el teléfono de contacto del comprador.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
// Ingresa aquí el número de identificación del comprador.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

// Ingresa aquí la dirección del comprador.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CO");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "7563126");


// -- Pagador --
// Ingresa aquí el identificador del pagador.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
// Ingresa aquí el nombre del pagador.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second payer name");
// Ingresa aquí el correo electrónico del pagador.
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "payer_test@test.com");
// Ingresa aquí el número de teléfono del pagador.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "7563126");
// Ingresa aquí el número de identificación del pagador.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "5415668464654");
// Ingresa aquí la dirección del pagador.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CO");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// -- Datos de la tarjeta de crédito --
// Ingresa aquí el número de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4097440000000004");
// Ingresa aquí la fecha de expiración de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2022/12");
// Ingresa aquí el código de seguridad de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "321");
// Ingresa aquí el nombre de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");

// Ingresa aquí el número de cuotas.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Ingresa aquí el nombre del país.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CO.name());


// Device Session ID
parameters.put(PayU.PARAMETERS.DEVICE_SESSION_ID, "vghs6tvkcle931686k1900o6e1");
// IP del pagador
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
// Cookie de la sesión actual.
parameters.put(PayU.PARAMETERS.COOKIE, "pt1t38347bs6jc9ruv2ecpv7o2");
// User agent de la sesión actual.
parameters.put(PayU.PARAMETERS.USER_AGENT, "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0");

// Petición de "Autorización y captura"
TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);

// Puedes obtener las propiedades en la respuesta
if(response != null){
	response.getOrderId();
    response.getTransactionId();
    response.getState();
    if(response.getState().toString().equalsIgnoreCase("PENDING")){
    	response.getPendingReason();
    }
    response.getPaymentNetworkResponseCode();
    response.getPaymentNetworkResponseErrorMessage();
    response.getTrazabilityCode();
    response.getResponseCode();
    response.getResponseMessage();
}

```
{{< /tab >}}

{{< tab tabNum="2" >}}

```PHP
$reference = "payment_test_00000001";
$value = "65000";

$parameters = array(
	//Ingresa aquí el identificador de la cuenta
	PayUParameters::ACCOUNT_ID => "512325",
	// Ingresa aquí la referencia de pago.
	PayUParameters::REFERENCE_CODE => $reference,
	// Ingresa aquí la descripción del pago.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
        //Ingresa aquí el valor.
	PayUParameters::VALUE => $value,
  // Ingresa el valor del IVA (Impuesto al valor agregado válido únicamente en Colombia) de la transacción,
  // Si no se envía IVA, ell sistema aplica el 19% automáticamente. Puede contener dos dígitos decimales
  // Ejemplo 19000.00. En caso de ser exento de IVA, asigna 0.
  PayUParameters::TAX_VALUE => "10378",
  // Ingresa el valor base sobre el que se calcula el IVA (válido únicamente en Colombia).
  // En caso de ser exento de IVA, asigna 0.
  PayUParameters::TAX_RETURN_BASE => "54622",
	// Ingresa aquí la moneda.
	PayUParameters::CURRENCY => "COP",

	// -- Comprador --
	// Ingresa aquí el identificador del comprador.
	PayUParameters::BUYER_ID => "1",
	// Ingresa aquí el nombre del comprador.
	PayUParameters::BUYER_NAME => "First name and second buyer name",
	// Ingresa aquí el correo electrónico del comprador.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	// Ingresa aquí el teléfono de contacto del comprador.
	PayUParameters::BUYER_CONTACT_PHONE => "7563126",
	// Ingresa aquí el número de identificación del comprador.
	PayUParameters::BUYER_DNI => "5415668464654",
	// Ingresa aquí la dirección del comprador.
	PayUParameters::BUYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "BOGOTÁ",
	PayUParameters::BUYER_STATE => "Bogotá D.C",
	PayUParameters::BUYER_COUNTRY => "CO",
	PayUParameters::BUYER_POSTAL_CODE => "000000",
	PayUParameters::BUYER_PHONE => "7563126",


	// -- Pagador --
	// Ingresa aquí el identificador del pagador.
	PayUParameters::PARAMETERS.PAYER_ID => "1",
        /// Ingresa aquí el nombre del pagador
	PayUParameters::PAYER_NAME => "First name and second payer name",
	// Ingresa aquí el correo electrónico del pagador
	PayUParameters::PAYER_EMAIL => "payer_test@test.com",
	// Ingresa aquí el número de teléfono del pagador.
	PayUParameters::PAYER_CONTACT_PHONE => "7563126",
	// Ingresa aquí el número de identificación del pagador.
	PayUParameters::PAYER_DNI => "5415668464654",
	// Ingresa aquí la dirección del pagador.
	PayUParameters::PAYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "BOGOTÁ",
	PayUParameters::PAYER_STATE => "Bogotá D.C",
	PayUParameters::PAYER_COUNTRY => "CO",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// -- Datos de la tarjeta de crédito --
        // Ingresa aquí el número de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_NUMBER => "4037997623271984",
	// Ingresa aquí la fecha de expiración de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2030/12",
	// Ingresa aquí el código de seguridad de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "321",
	// Ingresa aquí el nombre de la tarjeta de crédito
	PayUParameters::PAYMENT_METHOD => "VISA",

	// Ingresa aquí el número de cuotas.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Ingresa aquí el nombre del país.
	PayUParameters::COUNTRY => PayUCountries::CO,

	// Device Session ID
	PayUParameters::DEVICE_SESSION_ID => "vghs6tvkcle931686k1900o6e1",
	// IP del pagador
	PayUParameters::IP_ADDRESS => "127.0.0.1",
	// Cookie de la sesión actual
	PayUParameters::PAYER_COOKIE=>"pt1t38347bs6jc9ruv2ecpv7o2",
	// User agent de la sesión actual
	PayUParameters::USER_AGENT=>"Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
	);

// Petición de Autorización
$response = PayUPayments::doAuthorizationAndCapture($parameters);

// Puedes obtener las propiedades en la respuesta
if ($response) {
	$response->transactionResponse->orderId;
	$response->transactionResponse->transactionId;
	$response->transactionResponse->state;
	if ($response->transactionResponse->state=="PENDING"){
		$response->transactionResponse->pendingReason;
	}
	$response->transactionResponse->paymentNetworkResponseCode;
	$response->transactionResponse->paymentNetworkResponseErrorMessage;
	$response->transactionResponse->trazabilityCode;
	$response->transactionResponse->responseCode;
	$response->transactionResponse->responseMessage;

}

```
{{< /tab >}}
{{< /tabs >}}

## Enviar transacciones en efectivo o referencia bancaria {#submit-transaction-with-cash-or-bank-reference}
Este método te permite procesar los pagos en efectivo o por referencia bancaria de tus clientes. Para integrarte con estas transacciones, debes redirigir a tu cliente a la URL que se encuentra en la respuesta; tu cliente ve un recibo de pago como los siguientes.

#### Pagos en efectivo {#payments-in-cash}
<img src="/assets/Payments/CashReceiptCO.png" alt="PrintScreen" width="75%">

#### Pagos con Referencia bancaria {#payments-with-bank-reference}
<img src="/assets/Payments/BankReferenceReceiptCO.png" alt="PrintScreen" width="75%">

### Consideraciones {#considerations-1}
* Envía un método de pago válido en efectivo o por referencia bancaria, [mira los métodos de pago disponibles para Colombia]({{< ref "select-your-payment-method.html#Colombia" >}}). No está soportado el método `OTHERS_CASH`.
* El parámetro `EXPIRATION_DATE` no es obligatorio. Si no envías este parámetro, su valor por defecto es siete (7) días luego de la fecha actual.<br>Si envías una fecha posterior a dicho número de días, PayU ignorará este valor y asignará el valor por defecto
* Para `BALOTO` y `EFECTY`, la confirmación de pago toma 15 minutos. Para `BANK_REFERENCED`, la confirmación es en línea.
* Los valores mínimos de máximos para pagos en `BALOTO` y `EFECTY` son:
   - `BALOTO` > Min: $3.000 COP - Max: $1.000.000 COP
   - `EFECTY` > Min: $20.000 COP - Max: $6.000.000 COP
* Los extra parámetros tienen los siguientes parámetros relacionados con la transacción:
   - **EXPIRATION_DATE**: fecha máxima en la que el pagador puede realizar el pago 
   - **REFERENCE**: referencia de pago interna generada por PayU.
   - **URL_PAYMENT_RECEIPT_HTML**: recibo de pago en formato HTML. Aquí es donde debe redirigir el pago cuando el pagador selecciona un método de pago en efectivo. 
   - **URL_PAYMENT_RECEIPT_PDF**: recibo de pago en formato PDF.
   - **BANCO_BOGOTA_SERVICE_CODE**: código de pago para Banco de Bogotá. Disponible cuando utilices `BANK_REFERENCED`.
   - **BANK_REFERENCED_NAME**: nombre de la referencia para Bancolombia. Disponible cuando utilices `BANK_REFERENCED`.
   - **BANCOLOMBIA_SERVICE_CODE**: código de pago para Bancolombia. Disponible cuando utilices `BANK_REFERENCED`.

### Llamado del método {#method-call-1}
Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "65000";

Map<String, String> parameters = new HashMap<String, String>();

// Ingresa aquí el identificador de la cuenta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512321");
// Ingresa aquí la referencia de pago.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
// Ingresa aquí la descripción del pago.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Ingresa aquí el idioma de la transacción.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Valores --
//Ingresa aquí el valor.
parameters.put(PayU.PARAMETERS.VALUE, ""+value);
// Ingresa el valor del IVA (Impuesto al valor agregado válido únicamente en Colombia) de la transacción,
// Si no se envía IVA, ell sistema aplica el 19% automáticamente. Puede contener dos dígitos decimales
// Ejemplo 19000.00. En caso de ser exento de IVA, asigna 0.
parameters.put(PayU.PARAMETERS.TAX_VALUE, "10378");
// Ingresa el valor base sobre el que se calcula el IVA (válido únicamente en Colombia).
// En caso de ser exento de IVA, asigna 0.
parameters.put(PayU.PARAMETERS.TAX_RETURN_BASE, "54622");
// Ingresa aquí la moneda.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.COP.name());

// -- Comprador --
// Ingresa aquí el identificador del comprador.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
// Ingresa aquí el nombre del comprador.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer  name");
// Ingresa aquí el correo electrónico del comprador
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
// Ingresa aquí el teléfono de contacto del comprador.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
// Ingresa aquí el número de identificación del comprador.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

// Ingresa aquí la dirección del comprador.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CO");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "7563126");


// -- Pagador --
// Ingresa aquí el identificador del pagador.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
// Ingresa aquí el nombre del pagador.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second payer name");
// Ingresa aquí el correo electrónico del pagador.
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "payer_test@test.com");
// Ingresa aquí el número de teléfono del pagador.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "7563126");
// Ingresa aquí el número de identificación del pagador.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "5415668464654");
// Ingresa aquí la dirección del pagador.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CO");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// Ingresa aquí el nombre del método de pago en efectivo.
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "EFECTY");

// Ingresa aquí la fecha de vencimiento del pago
parameters.put(PayU.PARAMETERS.EXPIRATION_DATE, "2021-07-01T20:00:00");

// Ingresa aquí el nombre del país.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CO.name());


// Device Session ID
parameters.put(PayU.PARAMETERS.DEVICE_SESSION_ID, "vghs6tvkcle931686k1900o6e1");
// IP del pagador
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
// Cookie de la sesión actual.
parameters.put(PayU.PARAMETERS.COOKIE, "pt1t38347bs6jc9ruv2ecpv7o2");
// User agent de la sesión actual.
parameters.put(PayU.PARAMETERS.USER_AGENT, "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0");

// Petición de Autorización
TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);

// Respuesta
if(response != null){
	response.getOrderId();
	response.getTransactionId();
	response.getState();
	if(response.getState().equals(TransactionState.PENDING)){
		response.getPendingReason();
		Map extraParameters = response.getExtraParameters();

		// Obten la URL del recibo de pago
		int reference = (Integer)extraParameters.get("REFERENCE");
    String pdf = (String)extraParameters.get("URL_PAYMENT_RECEIPT_PDF");
    String url = (String)extraParameters.get("URL_PAYMENT_RECEIPT_HTML");
		Date date = (Date)extraParameters.get("EXPIRATION_DATE");
	}
	response.getPaymentNetworkResponseCode();
	response.getPaymentNetworkResponseErrorMessage();
	response.getTrazabilityCode();
	response.getResponseCode();
	response.getResponseMessage();
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$reference = "payment_test_00000001";
$value = "65000";

$parameters = array(
	//Ingresa aquí el identificador de la cuenta
	PayUParameters::ACCOUNT_ID => "512325",
	// Ingresa aquí la referencia de pago.
	PayUParameters::REFERENCE_CODE => $reference,
	// Ingresa aquí la descripción del pago.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
        //Ingresa aquí el valor.
	PayUParameters::VALUE => $value,
  // Ingresa el valor del IVA (Impuesto al valor agregado válido únicamente en Colombia) de la transacción,
  // Si no se envía IVA, ell sistema aplica el 19% automáticamente. Puede contener dos dígitos decimales
  // Ejemplo 19000.00. En caso de ser exento de IVA, asigna 0.
  PayUParameters::TAX_VALUE => "10378",
  // Ingresa el valor base sobre el que se calcula el IVA (válido únicamente en Colombia).
  // En caso de ser exento de IVA, asigna 0.
  PayUParameters::TAX_RETURN_BASE => "54622",
	// Ingresa aquí la moneda.
	PayUParameters::CURRENCY => "COP",

	// -- Comprador --
	// Ingresa aquí el identificador del comprador.
	PayUParameters::BUYER_ID => "1",
	// Ingresa aquí el nombre del comprador.
	PayUParameters::BUYER_NAME => "First name and second buyer name",
	// Ingresa aquí el correo electrónico del comprador.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	// Ingresa aquí el teléfono de contacto del comprador.
	PayUParameters::BUYER_CONTACT_PHONE => "7563126",
	// Ingresa aquí el número de identificación del comprador.
	PayUParameters::BUYER_DNI => "5415668464654",
	// Ingresa aquí la dirección del comprador.
	PayUParameters::BUYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "BOGOTÁ",
	PayUParameters::BUYER_STATE => "Bogotá D.C",
	PayUParameters::BUYER_COUNTRY => "CO",
	PayUParameters::BUYER_POSTAL_CODE => "000000",
	PayUParameters::BUYER_PHONE => "7563126",


	// -- Pagador --
	// Ingresa aquí el identificador del pagador.
	PayUParameters::PARAMETERS.PAYER_ID => "1",
        /// Ingresa aquí el nombre del pagador
	PayUParameters::PAYER_NAME => "First name and second payer name",
	// Ingresa aquí el correo electrónico del pagador
	PayUParameters::PAYER_EMAIL => "payer_test@test.com",
	// Ingresa aquí el número de teléfono del pagador.
	PayUParameters::PAYER_CONTACT_PHONE => "7563126",
	// Ingresa aquí el número de identificación del pagador.
	PayUParameters::PAYER_DNI => "5415668464654",
	// Ingresa aquí la dirección del pagador.
	PayUParameters::PAYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "BOGOTÁ",
	PayUParameters::PAYER_STATE => "Bogotá D.C",
	PayUParameters::PAYER_COUNTRY => "CO",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// Ingresa aquí el nombre del método de pago en efectivo
	PayUParameters::PAYMENT_METHOD => "EFECTY",

  // Ingresa aquí la fecha de vencimiento del pago
	PayUParameters::EXPIRATION_DATE => "2021-07-01T20:00:00",

	// Ingresa aquí el nombre del país.
	PayUParameters::COUNTRY => PayUCountries::CO,

	// Device Session ID
	PayUParameters::DEVICE_SESSION_ID => "vghs6tvkcle931686k1900o6e1",
	// IP del pagador
	PayUParameters::IP_ADDRESS => "127.0.0.1",
	// Cookie de la sesión actual
	PayUParameters::PAYER_COOKIE=>"pt1t38347bs6jc9ruv2ecpv7o2",
	// User agent de la sesión actual
	PayUParameters::USER_AGENT=>"Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
	);

// Petición de Autorización
$response = PayUPayments::doAuthorizationAndCapture($parameters);

// Puedes obtener las propiedades en la respuesta
if ($response) {
	$response->transactionResponse->orderId;
	$response->transactionResponse->transactionId;
	$response->transactionResponse->state;
	if($response->transactionResponse->state=="PENDING"){
		$response->transactionResponse->pendingReason;
		$response->transactionResponse->trazabilityCode;
		$response->transactionResponse->authorizationCode;
		$response->transactionResponse->extraParameters->REFERENCE;
		$response->transactionResponse->extraParameters->EXPIRATION_DATE;
		$response->transactionResponse->extraParameters->URL_PAYMENT_RECEIPT_HTML;
		$response->transactionResponse->extraParameters->URL_PAYMENT_RECEIPT_PDF;
	}
	$response->transactionResponse->paymentNetworkResponseCode;
	$response->transactionResponse->paymentNetworkResponseErrorMessage;
	$response->transactionResponse->trazabilityCode;
	$response->transactionResponse->responseCode;
	$response->transactionResponse->responseMessage;

}
```
{{< /tab >}}
{{< /tabs >}}

## Enviar transacciones con transferencia bancaria {#submit-transaction-with-bank-transfer}
Este método te permite procesar los pagos realizados por tus clientes por medio de transferencia bancaria. En Colombia, las transferencias bancarias se hacen a través de PSE, para integrarte con este método de pago, necesitas crear un formulario de pago siguiendo estos pasos:

1. Consulta la lista de bancos disponibles para mostrarla al pagador. Para consultar la lista de bancos, consulta [este método]({{< ref "#bank-list---pse" >}}).

2. Muestra la lista de bancos tal y como se muestra a continuación:

<img src="/assets/Payments/PSEBankList_ES.png" alt="PrintScreen" width="50%"><br>

Cuando el pagador seleccione un banco, debes enviar al parámetro `pseCode` seleccionado en el parámetro `PSE_FINANCIAL_INSTITUTION_CODE` de la petición.

3. Muestra una lista para que el pagador escoja si es una persona _Natural_ (N) o _Jurídica_ (J). Dependiendo de lo que escoja, debes enviar el valor en el parámetro `PAYER_PERSON_TYPE` de la petición. La lista debe verse así:

<img src="/assets/Payments/PSEPersonList_ES.png" alt="PrintScreen" width="50%"><br>

El valor seleccionado debe enviarse así:
* Java: `PersonType.NATURAL.toString()` (N) o `PersonType.LEGAL.toString()` (J).
* PHP: `N` o `J`.

4. Muestra una lista para que el pagador escoja su tipo de identificación. Debes enviar el código ISO del valor seleccionado en el extra parámetro `PAYER_DOCUMENT_TYPE` de la petición. La lista debe verse así:

<img src="/assets/Payments/PSEDocType_ES.png" alt="PrintScreen" width="50%"><br>

The list of available documents is:

La lista de documentos disponibles es:

| ISO | Descripción                                                                                             |
|:---:|---------------------------------------------------------------------------------------------------------|
|  CC | Cédula de ciudadanía.                                                                                   |
|  CE | Cédula de extranjería.                                                                                  |
| NIT | Número de Identificación Tributaria (Empresas).                                                         |
|  TI | Tarjeta de identidad.                                                                                   |
|  PP | Pasaporte.                                                                                              |
| IDC | Identificador único de cliente, para el caso de ID’s únicos de clientes/usuarios de servicios públicos. |
| CEL | En caso de identificarse a través de la línea del móvil.                                                |
|  RC | Registro civil de nacimiento.                                                                           |
|  DE | Documento de identificación extranjero.                                                                 |

5. Debes enviar el número de identificación del pagador en el parámetro `PAYER_DNI` de la petición.

### Consideraciones {#considerations-2}
* Si la solicitud de pago es exitosa, el estado de la transacción es pendiente (`PENDING`) y el responseCode es `PENDING_TRANSACTION_CONFIRMATION`; esto es debido a que el pagador es redirigido al naco seleccionado para completar el pago; debes redirigir al pagador a la URL retornada en el extra parámetro `BANK_URL`.
* La URL retornada en el extra parámetro `BANK_URL` se configura en el Modulo PayU y debe mostrar la siguiente información:<br><br>![PrintScreen](/assets/Payments/PSEresponse-es.png)<br>Los parámetros que empiezan con el símbolo $ se envían vía `GET`.
* Debes agregar a la página de respuesta las opciones para reintentar el pago, finalizar la transacción e imprimir el recibo.
* Los estados mostrados en la página de respuesta pueden ser los siguientes:

| polTransactionState | polResponseCode | Estado                                                                           |
|---------------------|-----------------|----------------------------------------------------------------------------------|
| 4                   | 1               | Transacción aprobada                                                             |
| 6                   | 5               | Transacción fallida                                                              |
| 6                   | 4               | Transacción rechazada                                                            |
| 12 o 14             | 9994 o 25       | Transacción pendiente, por favor revisar si el débito fue realizado en el banco. |

### Llamado del método {#method-call-2}
Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "65000";

Map<String, String> parameters = new HashMap<String, String>();

// Ingresa aquí el identificador de la cuenta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512321");
// Ingresa aquí la referencia de pago.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
// Ingresa aquí la descripción del pago.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Ingresa aquí el idioma de la transacción.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Valores --
//Ingresa aquí el valor.
parameters.put(PayU.PARAMETERS.VALUE, ""+value);
// Ingresa el valor del IVA (Impuesto al valor agregado válido únicamente en Colombia) de la transacción,
// Si no se envía IVA, ell sistema aplica el 19% automáticamente. Puede contener dos dígitos decimales
// Ejemplo 19000.00. En caso de ser exento de IVA, asigna 0.
parameters.put(PayU.PARAMETERS.TAX_VALUE, "10378");
// Ingresa el valor base sobre el que se calcula el IVA (válido únicamente en Colombia).
// En caso de ser exento de IVA, asigna 0.
parameters.put(PayU.PARAMETERS.TAX_RETURN_BASE, "54622");
// Ingresa aquí la moneda.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.COP.name());

// -- Comprador --
// Ingresa aquí el identificador del comprador.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
// Ingresa aquí el nombre del comprador.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer  name");
// Ingresa aquí el correo electrónico del comprador
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
// Ingresa aquí el teléfono de contacto del comprador.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
// Ingresa aquí el número de identificación del comprador.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

// Ingresa aquí la dirección del comprador.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CO");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "7563126");


// -- Pagador --
// Ingresa aquí el identificador del pagador.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
// Ingresa aquí el nombre del pagador.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second payer name");
// Ingresa aquí el correo electrónico del pagador.
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "payer_test@test.com");
// Ingresa aquí el número de teléfono del pagador.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "7563126");
// Ingresa aquí la dirección del pagador.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CO");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

//-- Información obligatoria para PSE –
// Ingresa aquí el código PSE del banco.
parameters.put(PayU.PARAMETERS.PSE_FINANCIAL_INSTITUTION_CODE, "1007");
// Ingresa aquí el tipo de persona (Natural o Jurídica).
parameters.put(PayU.PARAMETERS.PAYER_PERSON_TYPE, PersonType.NATURAL.toString());
// o parameters.put(PayU.PARAMETERS.PAYER_PERSON_TYPE, PersonType.LEGAL.toString());
// Ingresa aquí el número de identificación del pagador.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "123456789");
// Ingresa aquí el tipo de documento del pagador.
parameters.put(PayU.PARAMETERS.PAYER_DOCUMENT_TYPE, DocumentType.CC.toString());

// Ingresa aquí el nombre del método de pago
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "PSE");

// Ingresa aquí el nombre del país.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CO.name());


// Device Session ID
parameters.put(PayU.PARAMETERS.DEVICE_SESSION_ID, "vghs6tvkcle931686k1900o6e1");
// IP del pagador
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
// Cookie de la sesión actual.
parameters.put(PayU.PARAMETERS.COOKIE, "pt1t38347bs6jc9ruv2ecpv7o2");
// User agent de la sesión actual.
parameters.put(PayU.PARAMETERS.USER_AGENT, "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0");

// Página de respuesta a donde será redireccionado el pagador.
parameters.put(PayU.PARAMETERS.RESPONSE_URL, "http://www.test.com/response");

// Petición de "Autorización y captura"
TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);

// Respuesta
if(response != null){
	response.getOrderId();
	response.getTransactionId();
	response.getState();
	if(response.getState().equals(TransactionState.PENDING)){
		response.getPendingReason();
		Map extraParameters = response.getExtraParameters();

		// Obten la URL del banco
		String url = (String)extraParameters.get("BANK_URL");
	}
	response.getPaymentNetworkResponseCode();
	response.getPaymentNetworkResponseErrorMessage();
	response.getTrazabilityCode();
	response.getResponseCode();
	response.getResponseMessage();
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$reference = "payment_test_00000001";
$value = "65000";

$parameters = array(
	//Ingresa aquí el identificador de la cuenta
	PayUParameters::ACCOUNT_ID => "512325",
	// Ingresa aquí la referencia de pago.
	PayUParameters::REFERENCE_CODE => $reference,
	// Ingresa aquí la descripción del pago.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
        //Ingresa aquí el valor.
	PayUParameters::VALUE => $value,
  // Ingresa el valor del IVA (Impuesto al valor agregado válido únicamente en Colombia) de la transacción,
  // Si no se envía IVA, ell sistema aplica el 19% automáticamente. Puede contener dos dígitos decimales
  // Ejemplo 19000.00. En caso de ser exento de IVA, asigna 0.
  PayUParameters::TAX_VALUE => "10378",
  // Ingresa el valor base sobre el que se calcula el IVA (válido únicamente en Colombia).
  // En caso de ser exento de IVA, asigna 0.
  PayUParameters::TAX_RETURN_BASE => "54622",
	// Ingresa aquí la moneda.
	PayUParameters::CURRENCY => "COP",

	// -- Comprador --
	// Ingresa aquí el identificador del comprador.
	PayUParameters::BUYER_ID => "1",
	// Ingresa aquí el nombre del comprador.
	PayUParameters::BUYER_NAME => "First name and second buyer name",
	// Ingresa aquí el correo electrónico del comprador.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	// Ingresa aquí el teléfono de contacto del comprador.
	PayUParameters::BUYER_CONTACT_PHONE => "7563126",
	// Ingresa aquí el número de identificación del comprador.
	PayUParameters::BUYER_DNI => "5415668464654",
	// Ingresa aquí la dirección del comprador.
	PayUParameters::BUYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "BOGOTÁ",
	PayUParameters::BUYER_STATE => "Bogotá D.C",
	PayUParameters::BUYER_COUNTRY => "CO",
	PayUParameters::BUYER_POSTAL_CODE => "000000",
	PayUParameters::BUYER_PHONE => "7563126",


	// -- Pagador --
	// Ingresa aquí el identificador del pagador.
	PayUParameters::PARAMETERS.PAYER_ID => "1",
        /// Ingresa aquí el nombre del pagador
	PayUParameters::PAYER_NAME => "First name and second payer name",
	// Ingresa aquí el correo electrónico del pagador
	PayUParameters::PAYER_EMAIL => "payer_test@test.com",
	// Ingresa aquí el número de teléfono del pagador.
	PayUParameters::PAYER_CONTACT_PHONE => "7563126",
	// Ingresa aquí el número de identificación del pagador.
	PayUParameters::PAYER_DNI => "5415668464654",
	// Ingresa aquí la dirección del pagador.
	PayUParameters::PAYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "BOGOTÁ",
	PayUParameters::PAYER_STATE => "Bogotá D.C",
	PayUParameters::PAYER_COUNTRY => "CO",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	//-- Información obligatoria para PSE –
  // Ingresa aquí el código PSE del banco.
	PayUParameters::PSE_FINANCIAL_INSTITUTION_CODE => "1007",
  // Ingresa aquí el tipo de persona (Natural o Jurídica).
	PayUParameters::PAYER_PERSON_TYPE => "N",
  // or PayUParameters::PAYER_PERSON_TYPE => "J"
  // Ingresa aquí el número de identificación del pagador.
	PayUParameters::PAYER_DNI => "123456789",
  // Ingresa aquí el tipo de documento del pagador.
	PayUParameters::PAYER_DOCUMENT_TYPE => "CC",

  // Ingresa aquí el nombre del método de pago
	PayUParameters::PAYMENT_METHOD => "PSE",

	// Ingresa aquí el nombre del país.
	PayUParameters::COUNTRY => PayUCountries::CO,

	// Device Session ID
	PayUParameters::DEVICE_SESSION_ID => "vghs6tvkcle931686k1900o6e1",
	// IP del pagador
	PayUParameters::IP_ADDRESS => "127.0.0.1",
	// Cookie de la sesión actual
	PayUParameters::PAYER_COOKIE => "pt1t38347bs6jc9ruv2ecpv7o2",
	// User agent de la sesión actual
	PayUParameters::USER_AGENT => "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0",

  // Página de respuesta a donde será redireccionado el pagador.
	PayUParameters::PARAMETERS.RESPONSE_URL => "http://www.test.com/response"
	);

// Petición de Autorización
$response = PayUPayments::doAuthorizationAndCapture($parameters);

// Puedes obtener las propiedades en la respuesta
if ($response) {
	$response->transactionResponse->orderId;
	$response->transactionResponse->transactionId;
	$response->transactionResponse->state;
	if($response->transactionResponse->state=="PENDING"){
		$response->transactionResponse->pendingReason;
		$response->transactionResponse->trazabilityCode;
		$response->transactionResponse->authorizationCode;
		$response->transactionResponse->extraParameters->BANK_URL;
	}
	$response->transactionResponse->paymentNetworkResponseCode;
	$response->transactionResponse->paymentNetworkResponseErrorMessage;
	$response->transactionResponse->trazabilityCode;
	$response->transactionResponse->responseCode;
	$response->transactionResponse->responseMessage;

}
```
{{< /tab >}}
{{< /tabs >}}

## Lista de bancos - PSE {#bank-list---pse}
Este método retorna la lista de bancos disponibles para realizar [pagos utilizando PSE]({{< ref "#submit-transaction-with-bank-transfer" >}}). 

### Llamado del método {#method-call-3}
Los siguientes son los ejemplos de la petición y la respuesta para este método.

{{< tabs tabTotal="2" tabID="5" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

// Ingresa aquí el nombre del método de pago
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "PSE");

// Ingresa aquí el nombre del país.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CO.name());

// Obten la lista de los bancos
List banks = PayUPayments.getPSEBanks(parameters);
Iterator banks_iterator=banks.iterator();

while(banks_iterator.hasNext()){
    Bank bank = (Bank) banks_iterator.next();
    bank.getPseCode();
    bank.getDescription();    
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
// Ingresa aquí el nombre del método de pago
$parameters = array(
	// Ingresa aquí el nombre del método de pago.
	PayUParameters::PAYMENT_METHOD => "PSE",
	// Ingresa aquí el nombre del país.
	PayUParameters::COUNTRY => PayUCountries::CO,
);
$array=PayUPayments::getPSEBanks($parameters);
$banks=$array->banks;

foreach ($banks as $bank) {
	$bank->description;
	$bank->pseCode;
}
}
```
{{< /tab >}}
{{< /tabs >}}

## Consultar métodos de pago disponibles {#available-payment-methods-query}
Este método retorna la lista de los métodos de pago disponibles en todos los paises.

### Llamado del método {#method-call-4}
Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="6" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
List<PaymentMethodComplete> response = PayUPayments.getPaymentMethods();
LoggerUtil.info("{0}", response);
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$array=PayUPayments::getPaymentMethods();
$payment_methods=$array->paymentMethods;
foreach ($payment_methods as $payment_method){
	$payment_method->country;
	$payment_method->description;
	$payment_method->id;
}
```
{{< /tab >}}
{{< /tabs >}}

## Ping
El método `PING` te permite verificar la conexión con nuestra plataforma. 

### Llamado del método {#method-call-5}
Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="7" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
boolean response = PayUPayments.doPing();
LoggerUtil.info("{0}", response);
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$response = PayUPayments::doPing();
$response->code;
```
{{< /tab >}}
{{< /tabs >}}