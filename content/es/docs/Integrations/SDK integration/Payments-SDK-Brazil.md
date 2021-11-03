---
title: "SDK de Pagos - Brasil"
linkTitle: "SDK de Pagos - Brasil"
date: 2021-05-03T15:48:08-05:00
description: >
  El SDK de Pagos de Brasil le permite a tu tienda procesar diferentes tipos de transacciones con múltiples medios de pago.
weight: 20
tags: ["subtopic"]
---

Para integrarte con el SDK de Pagos de Brasil, apunta tus peticiones a las siguientes URLs:

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
* [Enviar transacciones en efectivo]({{< ref "#submit-transaction-with-cash" >}})
* [Consultar medios de pago disponibles]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Nota" color="info"%}}
Para confirmar el estado de una transacción, puedes utilizar el [SDK de Consultas]({{< ref "QueriesSDK.md" >}}).
{{% /alert %}}

## Enviar transacciones con tarjeta de crédito {#submit-transaction-with-credit-cards}
Este método te permite procesar pagos realizados por tus clientes utilizando tarjetas de crédito. Para Brasil, puedes realizar los flujos de dos pasos (**Autorización**, **Captura**) y el de un paso (**Cobro**). Para más información, consulta los [flujos de pago]({{< ref "payments.md#payment-flows" >}}).

### Consideraciones {#considerations}
* Envía un medio de pago válido de tarjeta de crédito, [mira los medios de pago disponibles para Brasil]({{< ref "select-your-payment-method.html#Brazil" >}}).
* Para pagos con tókenes de tarjeta de crédito, asigna los parámetros `TOKEN_ID` y `CREDIT_CARD_SECURITY_CODE` (si procesas con código de seguridad) reemplazando la información de la tarjeta de crédito. Para más información, consulta el [SDK de Tokenización]({{< ref "TokenizationSDK.md" >}}).
* Por defecto, no está activo el procesamiento de tarjetas de crédito sin código de seguridad. Si quieres activar esta funcionalidad, contacta a tu representante de ventas. Luego de que se te active esta funcionalidad, asigna el parámetro `PROCESS_WITHOUT_CVV2` con true y elimina el parámetro `CREDIT_CARD_SECURITY_CODE`.
* El extra parámetro `CIELO_TID` identifica la transacción, se necesita este parámetro para procesar anulaciones (voids).

### Autorización {#authorization}
Utiliza este método para realizar el paso de **Autorización** del flujo de dos pasos. En este paso, autorizas el pago pero el monto no se debita hasta que [captures]({{< ref "payments-sdk-brazil.md#capture" >}}) los fondos.<br>Los siguientes ejempleod muestran cómo llamas el método para este tipo de transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Ingresa aquí el identificador de la cuenta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512327");
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
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.BRL.name());

// -- Comprador --
// Ingresa aquí el identificador del comprador.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
// Ingresa aquí el nombre del comprador.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer name");
// Ingresa aquí el correo electrónico del comprador
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
// Ingresa aquí el teléfono de contacto del comprador.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "(11)756312633");
// Ingresa aquí el número de identificación del comprador.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "811.807.405-64");
// Ingresa aquí el CNPJ del comprador.
parameters.put(PayU.PARAMETERS.BUYER_CNPJ, "32593371000110");

// Ingresa aquí la dirección del comprador.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Quadra QNP 34 Conjunto G 780");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Manaos");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "SP");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "BR");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "10012545");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "(11)756312633");

// -- Pagador --
// Ingresa aquí el identificador del pagador.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
// Ingresa aquí el nombre del pagador.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second buyer name");
// Ingresa aquí el correo electrónico del pagador
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "buyer_test@test.com");
// Ingresa aquí el teléfono de contacto del pagador.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "(11)756312633");
// Ingresa aquí el número de documento del pagador.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "811.807.405-64");
// Ingresa aquí el CNPJ del pagador.
parameters.put(PayU.PARAMETERS.PAYER_CNPJ, "32593371000110");

// Ingresa aquí la dirección del pagador.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Quadra QNP 34 Conjunto G 780");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Manaos");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "SP");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "BR");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "10012545");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "(11)756312633");

// -- Datos de la tarjeta de crédito --
// Ingresa aquí el número de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "5253203387684619");
// Ingresa aquí la fecha de expiración de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2022/12");
// Ingresa aquí el código de seguridad de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "777");
// Ingresa aquí el nombre de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "MASTERCARD");

// Ingresa aquí el número de cuotas.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Ingresa aquí el nombre del país.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.BR.name());


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
	PayUParameters::ACCOUNT_ID => "512327",
	// Ingresa aquí la referencia de pago.
	PayUParameters::REFERENCE_CODE => $reference,
	// Ingresa aquí la descripción del pago.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
        //Ingresa aquí el valor.
	PayUParameters::VALUE => $value,
	// Ingresa aquí la moneda.
	PayUParameters::CURRENCY => "BRL",

	// -- Comprador --
	// Ingresa aquí el identificador del comprador.
	PayUParameters::BUYER_ID => "1",
	// Ingresa aquí el nombre del comprador.
	PayUParameters::BUYER_NAME => "First name and second buyer  name",
	// Ingresa aquí el correo electrónico del comprador.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	// Ingresa aquí el teléfono de contacto del comprador.
	PayUParameters::BUYER_CONTACT_PHONE => "(11)756312633",
	// Ingresa aquí el número de identificación del comprador.
	PayUParameters::BUYER_DNI => "811.807.405-64",
  // Ingresa aquí el CNPJ del comprador.
	PayUParameters::BUYER_CNPJ => "32593371000110",
	// Ingresa aquí la dirección del comprador.
	PayUParameters::BUYER_STREET => "Quadra QNP 34 Conjunto G 780",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Manaos",
	PayUParameters::BUYER_STATE => "SP",
	PayUParameters::BUYER_COUNTRY => "BR",
	PayUParameters::BUYER_POSTAL_CODE => "10012545",
	PayUParameters::BUYER_PHONE => "(11)756312633",

  // -- Pagador --
  // Ingresa aquí el identificador del pagador.
  PayUParameters::PAYER_ID => "1",
  // Ingresa aquí el nombre del pagador.
  PayUParameters::PAYER_NAME => "First name and second buyer name",
  // Ingresa aquí el correo electrónico del pagador
  PayUParameters::PAYER_EMAIL => "buyer_test@test.com",
  // Ingresa aquí el teléfono de contacto del pagador.
  PayUParameters::PAYER_CONTACT_PHONE => "(11)756312633",
  // Ingresa aquí el número de documento del pagador.
  PayUParameters::PAYER_DNI => "811.807.405-64",
  // Ingresa aquí el CNPJ del pagador.
  PayUParameters::PAYER_CNPJ => "32593371000110",

  // Ingresa aquí la dirección del pagador.
  PayUParameters::PAYER_STREET => "Quadra QNP 34 Conjunto G 780",
  PayUParameters::PAYER_STREET_2 => "5555487",
  PayUParameters::PAYER_CITY => "Manaos",
  PayUParameters::PAYER_STATE => "SP",
  PayUParameters::PAYER_COUNTRY => "BR",
  PayUParameters::PAYER_POSTAL_CODE => "10012545",
  PayUParameters::PAYER_PHONE => "(11)756312633",

	// -- Datos de la tarjeta de crédito --
  // Ingresa aquí el número de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_NUMBER => "5253203387684619",
	// Ingresa aquí la fecha de expiración de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2022/12",
	// Ingresa aquí el código de seguridad de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "777",
	// Ingresa aquí el nombre de la tarjeta de crédito
	PayUParameters::PAYMENT_METHOD => "MASTERCARD",

	// Ingresa aquí el número de cuotas.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Ingresa aquí el nombre del país.
	PayUParameters::COUNTRY => PayUCountries::BR,

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
Utiliza este método para realizar el paso de **Captura** del flujo de dos pasos. En este paso, capturas los fondos previamente [Autorizados]({{< ref "payments-sdk-brazil.md#authorization" >}}) para transferirlos a tu cuenta PayU.

#### Consideraciones {#considerations-1}
Ten en cuenta las siguientes consideraciones para la captura.
* El tiempo máximo para capturar una transacción aprobada es de siete (7) días. Despues de este tiempo, la transacción es cancelada.
* Para capturar una transacción, solo son obligatorios los parámetros mostrados en el cuerpo de la petición. Ten en cuenta que los IDs de las orden y la transacción deben corresponder a la actualmente autorizada.

Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

// Ingresa aquí el identificador de la orden.
parameters.put(PayU.PARAMETERS.ORDER_ID, "1400434770");
// Ingresa aquí el identificador de la transacción.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "79de715b-fe77-401e-8b18-241820afb375");
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
	PayUParameters::ORDER_ID => "1400434770",
	// Ingresa aquí el identificador de la transacción.
	PayUParameters::TRANSACTION_ID => "79de715b-fe77-401e-8b18-241820afb375",
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
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512327");
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
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.BRL.name());

// -- Comprador --
// Ingresa aquí el identificador del comprador.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
// Ingresa aquí el nombre del comprador.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer name");
// Ingresa aquí el correo electrónico del comprador
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
// Ingresa aquí el teléfono de contacto del comprador.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "(11)756312633");
// Ingresa aquí el número de identificación del comprador.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "811.807.405-64");
// Ingresa aquí el CNPJ del comprador.
parameters.put(PayU.PARAMETERS.BUYER_CNPJ, "32593371000110");

// Ingresa aquí la dirección del comprador.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Quadra QNP 34 Conjunto G 780");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Manaos");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "SP");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "BR");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "10012545");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "(11)756312633");

// -- Pagador --
// Ingresa aquí el identificador del pagador.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
// Ingresa aquí el nombre del pagador.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second buyer name");
// Ingresa aquí el correo electrónico del pagador
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "buyer_test@test.com");
// Ingresa aquí el teléfono de contacto del pagador.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "(11)756312633");
// Ingresa aquí el número de documento del pagador.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "811.807.405-64");
// Ingresa aquí el CNPJ del pagador.
parameters.put(PayU.PARAMETERS.PAYER_CNPJ, "32593371000110");

// Ingresa aquí la dirección del pagador.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Quadra QNP 34 Conjunto G 780");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Manaos");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "SP");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "BR");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "10012545");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "(11)756312633");

// -- Datos de la tarjeta de crédito --
// Ingresa aquí el número de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "5178151142107990");
// Ingresa aquí la fecha de expiración de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2022/12");
// Ingresa aquí el código de seguridad de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "777");
// Ingresa aquí el nombre de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "MASTERCARD");

// Ingresa aquí el número de cuotas.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Ingresa aquí el nombre del país.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.BR.name());


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
	PayUParameters::ACCOUNT_ID => "512327",
	// Ingresa aquí la referencia de pago.
	PayUParameters::REFERENCE_CODE => $reference,
	// Ingresa aquí la descripción del pago.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
        //Ingresa aquí el valor.
	PayUParameters::VALUE => $value,
	// Ingresa aquí la moneda.
	PayUParameters::CURRENCY => "BRL",

	// -- Comprador --
	// Ingresa aquí el identificador del comprador.
	PayUParameters::BUYER_ID => "1",
	// Ingresa aquí el nombre del comprador.
	PayUParameters::BUYER_NAME => "First name and second buyer  name",
	// Ingresa aquí el correo electrónico del comprador.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	// Ingresa aquí el teléfono de contacto del comprador.
	PayUParameters::BUYER_CONTACT_PHONE => "(11)756312633",
	// Ingresa aquí el número de identificación del comprador.
	PayUParameters::BUYER_DNI => "811.807.405-64",
  // Ingresa aquí el CNPJ del comprador.
	PayUParameters::BUYER_CNPJ => "32593371000110",
	// Ingresa aquí la dirección del comprador.
	PayUParameters::BUYER_STREET => "Quadra QNP 34 Conjunto G 780",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Manaos",
	PayUParameters::BUYER_STATE => "SP",
	PayUParameters::BUYER_COUNTRY => "BR",
	PayUParameters::BUYER_POSTAL_CODE => "10012545",
	PayUParameters::BUYER_PHONE => "(11)756312633",

  // -- Pagador --
  // Ingresa aquí el identificador del pagador.
  PayUParameters::PAYER_ID => "1",
  // Ingresa aquí el nombre del pagador.
  PayUParameters::PAYER_NAME => "First name and second buyer name",
  // Ingresa aquí el correo electrónico del pagador
  PayUParameters::PAYER_EMAIL => "buyer_test@test.com",
  // Ingresa aquí el teléfono de contacto del pagador.
  PayUParameters::PAYER_CONTACT_PHONE => "(11)756312633",
  // Ingresa aquí el número de documento del pagador.
  PayUParameters::PAYER_DNI => "811.807.405-64",
  // Ingresa aquí el CNPJ del pagador.
  PayUParameters::PAYER_CNPJ => "32593371000110",

  // Ingresa aquí la dirección del pagador.
  PayUParameters::PAYER_STREET => "Quadra QNP 34 Conjunto G 780",
  PayUParameters::PAYER_STREET_2 => "5555487",
  PayUParameters::PAYER_CITY => "Manaos",
  PayUParameters::PAYER_STATE => "SP",
  PayUParameters::PAYER_COUNTRY => "BR",
  PayUParameters::PAYER_POSTAL_CODE => "10012545",
  PayUParameters::PAYER_PHONE => "(11)756312633",

	// -- Datos de la tarjeta de crédito --
        // Ingresa aquí el número de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_NUMBER => "5178151142107990",
	// Ingresa aquí la fecha de expiración de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2022/12",
	// Ingresa aquí el código de seguridad de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "777",
	// Ingresa aquí el nombre de la tarjeta de crédito
	PayUParameters::PAYMENT_METHOD => "MASTERCARD",

	// Ingresa aquí el número de cuotas.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Ingresa aquí el nombre del país.
	PayUParameters::COUNTRY => PayUCountries::BR,

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

## Enviar transacciones en efectivo {#submit-transaction-with-cash}
Este método te permite procesar los pagos en efectivo de tus clientes. Para integrarte con las transacciones en efectivo, debes redirigir a tu cliente a la URL que se encuentra en la respuesta; tu cliente ve un de pago como el siguiente.

<img src="/assets/Payments/CashReceiptBR.png" alt="PrintScreen" width="50%">

### Consideraciones {#considerations-2}
* Envía un método de pago válido en efectivo, [mira los medios de pago disponibles para Brasil]({{< ref "select-your-payment-method.html#Brazil" >}}).
* El parámetro `EXPIRATION_DATE` no es obligatorio. Si no envías este parámetro, su valor por defecto es siete (7) días luego de la fecha actual.<br>Si envías una fecha posterior a dicho número de días, PayU ignorará este valor y asignará el valor por defecto
* El pago se ve reflejado el siguiente día hábil.
* La respuesta retorna los siguientes extra parámetros relacionados con la transacción
   - **URL_PAYMENT_RECEIPT_HTML**: recibo de pago en formato HTML. Aquí es donde debe redirigir el pago cuando el pagador selecciona un medio de pago en efectivo. 
   - **URL_BOLETO_BANCARIO**: recibo de pago en formato printable.
   - **EXPIRATION_DATE**: fecha máxima en la que el pagador puede realizar el pago.
   - **BAR_CODE**: código de barras que le permite al pagador realizar el pago. 

### Llamado del método {#method-call}
Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="5" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Ingresa aquí el identificador de la cuenta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512327");
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
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.BRL.name());

// -- Comprador --
// Ingresa aquí el identificador del comprador.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
// Ingresa aquí el nombre del comprador.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer  name");
// Ingresa aquí el correo electrónico del comprador
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
// Ingresa aquí el teléfono de contacto del comprador.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "(11)756312633");
// Ingresa aquí el número de identificación del comprador.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "811.807.405-64");
// Ingresa aquí el CNPJ del comprador.
parameters.put(PayU.PARAMETERS.BUYER_CNPJ, "32593371000110");

// Ingresa aquí la dirección del comprador.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Quadra QNP 34 Conjunto G 780");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Manaos");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "SP");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "BR");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "10012545");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "(11)756312633");

// -- Pagador --
// Ingresa aquí el identificador del pagador.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
// Ingresa aquí el nombre del pagador.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second buyer name");
// Ingresa aquí el correo electrónico del pagador
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "buyer_test@test.com");
// Ingresa aquí el teléfono de contacto del pagador.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "(11)756312633");
// Ingresa aquí el número de documento del pagador.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "811.807.405-64");
// Ingresa aquí el CNPJ del pagador.
parameters.put(PayU.PARAMETERS.PAYER_CNPJ, "32593371000110");

// Ingresa aquí la dirección del pagador.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Quadra QNP 34 Conjunto G 780");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Manaos");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "SP");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "BR");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "10012545");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "(11)756312633");

// Ingresa aquí el nombre del método de pago en efectivo.
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "BOLETO_BANCARIO");

// Ingresa aquí la fecha de vencimiento del pago
parameters.put(PayU.PARAMETERS.EXPIRATION_DATE, "2021-07-01T20:00:00");

// IP del pagador
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");

// Petición de Autorización
TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);

// Puedes obtener las propiedades en la respuesta
if(response != null){
  response.getOrderId();
  response.getTransactionId();
  response.getState();
  if(response.getState().equals(TransactionState.PENDING)){
		response.getPendingReason();
		Map extraParameters = response.getExtraParameters();

		// Obten la URL del recibo de pago
		String url = (String)extraParameters.get("URL_PAYMENT_RECEIPT_HTML");
    String boletoBancario = (String)extraParameters.get("URL_BOLETO_BANCARIO");
		Date date = (Date)extraParameters.get("EXPIRATION_DATE");
		String barCode = (String)extraParameters.get("BAR_CODE");
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
	PayUParameters::ACCOUNT_ID => "512327",
	// Ingresa aquí la referencia de pago.
	PayUParameters::REFERENCE_CODE => $reference,
	// Ingresa aquí la descripción del pago.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
        //Ingresa aquí el valor.
	PayUParameters::VALUE => $value,
	// Ingresa aquí la moneda.
	PayUParameters::CURRENCY => "BRL",

	// -- Comprador --
	// Ingresa aquí el identificador del comprador.
	PayUParameters::BUYER_ID => "1",
	// Ingresa aquí el nombre del comprador.
	PayUParameters::BUYER_NAME => "First name and second buyer  name",
	// Ingresa aquí el correo electrónico del comprador.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	// Ingresa aquí el teléfono de contacto del comprador.
	PayUParameters::BUYER_CONTACT_PHONE => "(11)756312633",
	// Ingresa aquí el número de identificación del comprador.
	PayUParameters::BUYER_DNI => "811.807.405-64",
  // Ingresa aquí el CNPJ del comprador.
	PayUParameters::BUYER_CNPJ => "32593371000110",
	// Ingresa aquí la dirección del comprador.
	PayUParameters::BUYER_STREET => "Quadra QNP 34 Conjunto G 780",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Manaos",
	PayUParameters::BUYER_STATE => "SP",
	PayUParameters::BUYER_COUNTRY => "BR",
	PayUParameters::BUYER_POSTAL_CODE => "10012545",
	PayUParameters::BUYER_PHONE => "(11)756312633",

  // -- Pagador --
  // Ingresa aquí el identificador del pagador.
  PayUParameters::PAYER_ID => "1",
  // Ingresa aquí el nombre del pagador.
  PayUParameters::PAYER_NAME => "First name and second buyer name",
  // Ingresa aquí el correo electrónico del pagador
  PayUParameters::PAYER_EMAIL => "buyer_test@test.com",
  // Ingresa aquí el teléfono de contacto del pagador.
  PayUParameters::PAYER_CONTACT_PHONE => "(11)756312633",
  // Ingresa aquí el número de documento del pagador.
  PayUParameters::PAYER_DNI => "811.807.405-64",
  // Ingresa aquí el CNPJ del pagador.
  PayUParameters::PAYER_CNPJ => "32593371000110",

  // Ingresa aquí la dirección del pagador.
  PayUParameters::PAYER_STREET => "Quadra QNP 34 Conjunto G 780",
  PayUParameters::PAYER_STREET_2 => "5555487",
  PayUParameters::PAYER_CITY => "Manaos",
  PayUParameters::PAYER_STATE => "SP",
  PayUParameters::PAYER_COUNTRY => "BR",
  PayUParameters::PAYER_POSTAL_CODE => "10012545",
  PayUParameters::PAYER_PHONE => "(11)756312633",

	// Ingresa aquí el nombre del método de pago en efectivo.
	PayUParameters::PAYMENT_METHOD => "BOLETO_BANCARIO",

  // Ingresa aquí la fecha de vencimiento del pago
	PayUParameters::PARAMETERS.EXPIRATION_DATE => "2021-07-01T20:00:00",

	// Ingresa aquí el nombre del país.
	PayUParameters::COUNTRY => PayUCountries::BR,

	// IP del pagador
	PayUParameters::IP_ADDRESS => "127.0.0.1"
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
		$response->transactionResponse->extraParameters->URL_PAYMENT_RECEIPT_HTML;
		$response->transactionResponse->extraParameters->URL_BOLETO_BANCARIO;
		$response->transactionResponse->extraParameters->EXPIRATION_DATE;
		$response->transactionResponse->extraParameters->BAR_CODE;
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

## Consultar medios de pago disponibles {#available-payment-methods-query}
Este método retorna la lista de los medios de pago disponibles en todos los paises.

### Llamado del método {#method-call-1}
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

### Llamado del método {#method-call-2}
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

