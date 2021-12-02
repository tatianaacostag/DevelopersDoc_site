---
title: "SDK de Pagos - Chile"
linkTitle: "SDK de Pagos - Chile"
date: 2021-05-03T15:48:08-05:00
description: >
  El SDK de Pagos de Chile le permite a tu tienda procesar diferentes tipos de transacciones con múltiples métodos de pago.
weight: 30
tags: ["subtopic"]
---

Para integrarte con el SDK de Pagos de Chile, apunta tus peticiones a las siguientes URLs:

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
* [Consultar métodos de pago disponibles]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})
<!-- * [Enviar transacciones en efectivo]({{< ref "#submit-transaction-with-cash" >}}) -->

{{% alert title="Nota" color="info"%}}
Para confirmar el estado de una transacción, puedes utilizar el [SDK de Consultas]({{< ref "QueriesSDK.md" >}}).
{{% /alert %}}

## Enviar transacciones con tarjeta de crédito {#submit-transaction-with-credit-cards}
Este método te permite procesar pagos realizados por tus clientes utilizando tarjetas de crédito. Para Chile, puedes realizar los flujos de dos pasos (**Autorización**, **Captura**) y el de un paso (**Cobro**). Para más información, consulta los [flujos de pago]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Nota" color="info"%}}
Las transacciones con tarjeta de crédito utilizando flujos de dos pasos está disponibles bajo demanda. Contacta a tu representante de ventas para más información.
{{% /alert %}}

### Consideraciones {#considerations}
* Envía un método de pago válido de tarjeta de crédito, [mira los métodos de pago disponibles para Chile]({{< ref "select-your-payment-method.html#Chile" >}}).
* Para pagos con tókenes de tarjeta de crédito, asigna los parámetros `TOKEN_ID` y `CREDIT_CARD_SECURITY_CODE` (si procesas con código de seguridad) reemplazando la información de la tarjeta de crédito. Para más información, consulta el [SDK de Tokenización]({{< ref "TokenizationSDK.md" >}}).
* No se permiten transacciones en PESOS CHILENOS con decimales.
* Two-step flows are not supported for international credit cards.
* Las transacciones con tarjeta de crédito utilizando flujos de dos pasos está disponibles bajo demanda y para pagos en una cuota. Contacta a tu representante de ventas para más información
* Por defecto, no está activo el procesamiento de tarjetas de crédito sin código de seguridad. Si quieres activar esta funcionalidad, contacta a tu representante de ventas. Luego de que se te active esta funcionalidad, asigna el parámetro `PROCESS_WITHOUT_CVV2` con true y elimina el parámetro `CREDIT_CARD_SECURITY_CODE`.

### Autorización {#authorization}
Utiliza este método para realizar el paso de **Autorización** del flujo de dos pasos. En este paso, autorizas el pago pero el monto no se debita hasta que [captures]({{< ref "payments-sdk-chile.md#capture" >}}) los fondos.<br>Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Ingresa aquí el identificador de la cuenta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512325");
// Ingresa aquí la referencia de pago.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
// Ingresa aquí la descripción del pago.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Ingresa aquí el idioma de la transacción.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Valores --
//Ingresa aquí el valor.
parameters.put(PayU.PARAMETERS.VALUE, ""+value);
// Ingresa aquí la moneda.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.CLP.name());

// -- Comprador --
// Ingresa aquí el identificador del comprador.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
// Ingresa aquí el nombre del comprador.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer name");
// Ingresa aquí el correo electrónico del comprador
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
// Ingresa aquí el teléfono de contacto del comprador.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
// Ingresa aquí el número de identificación del comprador.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

// Ingresa aquí la dirección del comprador.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "RM");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Talagante");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CL");
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
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "RM");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Talagante");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CL");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// -- Datos de la tarjeta de crédito --
// Ingresa aquí el número de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4097440000000004");
// Ingresa aquí la fecha de expiración de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2022/12");
// Ingresa aquí el código de seguridad de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "777");
// Ingresa aquí el nombre de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");

// Ingresa aquí el número de cuotas.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Ingresa aquí el nombre del país.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CL.name());


// Device Session ID
parameters.put(PayU.PARAMETERS.DEVICE_SESSION_ID, "vghs6tvkcle931686k1900o6e1");
// IP del pagador
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
// Cookie de la sesión actual.
parameters.put(PayU.PARAMETERS.COOKIE, "pt1t38347bs6jc9ruv2ecpv7o2");
// User agent de la sesión actual.
parameters.put(PayU.PARAMETERS.USER_AGENT, "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0");

// Petición de Autorización
TransactionResponse response = PayUPayments.doAuthorization(parameters);

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
$value = "1000";

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
	// Ingresa aquí la moneda.
	PayUParameters::CURRENCY => "CLP",

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
	PayUParameters::BUYER_STREET => "Autopista Del Sol, 0 - Km.43 Costado Sur",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "RM",
	PayUParameters::BUYER_STATE => "Talagante",
	PayUParameters::BUYER_COUNTRY => "CL",
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
	PayUParameters::PAYER_STREET => "Autopista Del Sol, 0 - Km.43 Costado Sur",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "RM",
	PayUParameters::PAYER_STATE => "Talagante",
	PayUParameters::PAYER_COUNTRY => "CL",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// -- Datos de la tarjeta de crédito --
        // Ingresa aquí el número de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_NUMBER => "4097440000000004",
	// Ingresa aquí la fecha de expiración de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2022/12",
	// Ingresa aquí el código de seguridad de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "777",
	// Ingresa aquí el nombre de la tarjeta de crédito
	PayUParameters::PAYMENT_METHOD => "VISA",

	// Ingresa aquí el número de cuotas.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Ingresa aquí el nombre del país.
	PayUParameters::COUNTRY => PayUCountries::CL,

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
$response = PayUPayments::doAuthorization($parameters);

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

### Captura {#capture}
Utiliza este método para realizar el paso de **Captura** del flujo de dos pasos. En este paso, capturas los fondos previamente [Autorizados]({{< ref "payments-sdk-chile.md#authorization" >}}) para transferirlos a tu cuenta PayU.

#### Consideraciones {#considerations-1}
Ten en cuenta las siguientes consideraciones para la captura.
* El tiempo máximo para capturar una transacción aprobada es de 7 días. Despues de este tiempo, la transacción es anulada automáticamente.
* Para capturar una transacción, solo son obligatorios los parámetros mostrados en el cuerpo de la petición. Ten en cuenta que los IDs de las orden y la transacción deben corresponder a la actualmente autorizada.
* Solo se permite capturar transacciones en una cuota.

Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

// Ingresa aquí el identificador de la orden.
parameters.put(PayU.PARAMETERS.ORDER_ID, "1400468293");
// Ingresa aquí el identificador de la transacción.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "ad6940f1-cf8b-474a-a69d-00382084d16c");
// Ingresa aquí el idioma de la transacción.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// Petición de Captura
TransactionResponse response = PayUPayments.doCapture(parameters);

// Respuesta
if(response != null){
	response.getOrderId();
	response.getTransactionId();
	response.getState();
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
$parameters = array(
	// Ingresa aquí el identificador de la cuenta.
	PayUParameters::ACCOUNT_ID => "512327",
	// Ingresa aquí el identificador de la orden.
	PayUParameters::ORDER_ID => "1400468293",
	// Ingresa aquí el identificador de la transacción.
	PayUParameters::TRANSACTION_ID => "ad6940f1-cf8b-474a-a69d-00382084d16c",
	);

$response = PayUPayments::doCapture($parameters);

if ($response) {
	$response->transactionResponse->orderId;
	$response->transactionResponse->transactionId;
	$response->transactionResponse->state;
	$response->transactionResponse->paymentNetworkResponseCode;
	$response->transactionResponse->paymentNetworkResponseErrorMessage;
	$response->transactionResponse->trazabilityCode;
	$response->transactionResponse->responseCode;
	$response->transactionResponse->responseMessage;
}
```
{{< /tab >}}
{{< /tabs >}}

### Cobro {#charge}
Utiliza este método para realizar el flujo de un paso, es decir, un cobro. En este paso, los pasos del flujo de dos pasos son combinados en una única transacción y los fondos son transferidos de la cuenta del cliente a tu cuenta PayU tan pronto sean aprobados:

Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Ingresa aquí el identificador de la cuenta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512325");
// Ingresa aquí la referencia de pago.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
// Ingresa aquí la descripción del pago.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Ingresa aquí el idioma de la transacción.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Valores --
//Ingresa aquí el valor.
parameters.put(PayU.PARAMETERS.VALUE, ""+value);
// Ingresa aquí la moneda.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.CLP.name());

// -- Comprador --
// Ingresa aquí el identificador del comprador.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
// Ingresa aquí el nombre del comprador.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer name");
// Ingresa aquí el correo electrónico del comprador
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
// Ingresa aquí el teléfono de contacto del comprador.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
// Ingresa aquí el número de identificación del comprador.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

// Ingresa aquí la dirección del comprador.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "RM");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Talagante");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CL");
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
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "RM");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Talagante");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CL");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// -- Datos de la tarjeta de crédito --
// Ingresa aquí el número de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4037997623271984");
// Ingresa aquí la fecha de expiración de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2030/12");
// Ingresa aquí el código de seguridad de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "321");
// Ingresa aquí el nombre de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");

// Ingresa aquí el número de cuotas.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Ingresa aquí el nombre del país.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CL.name());


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
$value = "1000";

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
	// Ingresa aquí la moneda.
	PayUParameters::CURRENCY => "CLP",

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
	PayUParameters::BUYER_STREET => "Autopista Del Sol, 0 - Km.43 Costado Sur",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "RM",
	PayUParameters::BUYER_STATE => "Talagante",
	PayUParameters::BUYER_COUNTRY => "CL",
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
	PayUParameters::PAYER_STREET => "Autopista Del Sol, 0 - Km.43 Costado Sur",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "RM",
	PayUParameters::PAYER_STATE => "Talagante",
	PayUParameters::PAYER_COUNTRY => "CL",
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
	PayUParameters::COUNTRY => PayUCountries::CL,

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
<!--
## Enviar transacciones en efectivo {#submit-transaction-with-cash}
This method lets you process the payments in cash of your customers. To integrate with cash transactions, you must redirect the customer to the URL found in the response of the method; your customer selects cash and generates the payment code.

<img src="/assets/Payments/CashReceiptCL.png" alt="PrintScreen" width="50%">

### Consideraciones
* El parámetro `EXPIRATION_DATE` no es obligatorio. Si no envías este parámetro, su valor por defecto es siete días after the current date at 12:00 pm.<br>If you send a date later than the default number of días, PayU will ignore this value and the expiration will be set as default.
* You must set a response URL in the parameter `NETWORK_CALLBACK_URL` in the request; this URL redirects the user back to your page after they finish the online payment procedure.
* You must redirect the payer to the Klap webpage (fka as Multicaja) to let them perform the cash payment. This URL is found in the `BANK_URL` parameter in the response.

### Llamado del método
Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

Map<String, String> parameters = new HashMap<String, String>();

        // Ingresa aquí el identificador de la cuenta.
        parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512325");
        // Ingresa aquí la referencia de pago.
        parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
        // Ingresa aquí la descripción del pago.
        parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
        // Ingresa aquí el idioma de la transacción.
        parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

        // -- Valores --
        //Ingresa aquí el valor.
        parameters.put(PayU.PARAMETERS.VALUE, ""+value);
        // Ingresa aquí la moneda.
        parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.CLP.name());

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
        parameters.put(PayU.PARAMETERS.BUYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
        parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
        parameters.put(PayU.PARAMETERS.BUYER_CITY, "RM");
        parameters.put(PayU.PARAMETERS.BUYER_STATE, "Talagante");
        parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CL");
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
        parameters.put(PayU.PARAMETERS.PAYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
        parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
        parameters.put(PayU.PARAMETERS.PAYER_CITY, "RM");
        parameters.put(PayU.PARAMETERS.PAYER_STATE, "Talagante");
        parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CL");
        parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
        parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

        // Enter the network callback URL here.
        parameters.put(PayU.PARAMETERS.NETWORK_CALLBACK_URL, "1");
        // Ingresa aquí el nombre del país.
        parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CL.name());

        // Ingresa aquí el nombre del método de pago en efectivo.
        parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "MULTICAJA");

        // Ingresa aquí la fecha de vencimiento del pago
        parameters.put(PayU.PARAMETERS.EXPIRATION_DATE, "2021-07-01T20:00:00");
        
        // IP del pagador
        parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
        
        // Petición de Autorización
        TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);


## Enviar transacciones con transferencia bancaria {#submit-transaction-with-bank-transfer}
This method lets you process the bank transfer payments of your customers. To integrate with these transactions, you must redirect the customer to the URL found in the response of the method.

<img src="/assets/Payments/BankTransferReceiptCL.png" alt="PrintScreen" width="50%">

### Consideraciones
* If you don't send the `RESPONSE_URL` parameter in the extra parameters, the API took the value from the _**Response URL**_ variable in your PayU Module (_**Settings**_ > _**Technical configuration**_).
* When you process bank transfer payment, you must redirect the customer to the URL found in the `URL_PAYMENT_REDIRECT` extra parameter concatenated with the `TRANSBANK_DIRECT_TOKEN` extra parameter as follows: <br> `URL_PAYMENT_REDIRECT?token_ws=TRANSBANK_DIRECT_TOKEN`.
* If the payment request is successful, the transaction has state `PENDING` and responseCode `PENDING_PAYMENT_IN_ENTITY`; this is because the payer is redirected to the selected bank to complete the payment.
* The response page must have the following variables:

| Variable          | Descripción                                                   |
|-------------------|---------------------------------------------------------------|
| transactionState  | State of the transaction.                                     |
| reference_pol     | Reference code to identify a transaction in PayU.             |
| TX_VALUE          | Transaction amount.                                           |
| authorizationCode | Autorización code of the transaction.                        |
| processingDate    | Transaction date.                                             |
| cc_number         | Visible number of the card used in the transaction.           |

The variables above are sent via GET.

### Llamado del método
Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.


-->
## Consultar métodos de pago disponibles {#available-payment-methods-query}
Este método retorna la lista de los métodos de pago disponibles en todos los paises.

### Llamado del método {#method-call}
Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="5" tabName1="Java" tabName2="PHP" >}}
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

### Llamado del método {#method-call-1}
Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="6" tabName1="Java" tabName2="PHP" >}}
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
