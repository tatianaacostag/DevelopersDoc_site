---
title: "SDK de Tokenización"
linkTitle: "SDK de Tokenización"
date: 2021-03-29T08:31:38-05:00
description: >
  El SDK de Tokenización te permite almacenar de forma segura, la información de las tarjetas de crédito de tus clientes a través de la creación de un token. Este token tee permite realizar pagos regulares o implementar la funcionalidad de pago a un clic, siguiendo lo estándares de seguridad de PCI DSS (Payment Card Industry Data Security Standard) para manejar los datos de las tarjetas de crédito.
weight: 90
tags: ["subtopic"]
---

La funcionalidad de Tokenización está disponible bajo acuerdos comerciales personalizados. Para más información, contacta a tu representante de ventas.

Para integrate con el SDK de Tokenización, apunta tus peticiones a las siguientes URLs de acuerdo con tu ambiente.

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
El SDK de Tokenización incluye métodos para registrar, eliminar y consultar tokens.

* [Registro individual de tarjeta de crédito]({{< ref "#individual-credit-card-registration" >}})
* [Eliminación individual de tarjeta de crédito]({{< ref "#individual-token-removal" >}})
* [Consulta de tókenes]({{< ref "#query-tokens" >}})


## Registro individual de tarjeta de crédito {#individual-credit-card-registration}
Utilizando esta funcionalidad, puedes registrar la información de la tarjeta de crédito de un cliente y obtener un token. 

### Llamado del método {#method-call}
Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
//-- Operación “Crear Token” --
Map<String, String> parameters = new HashMap<String, String>();
// Ingresa aquí el nombre del pagador.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "Mary Keller");
// Ingresa aquí el identificador del pagador.
parameters.put(PayU.PARAMETERS.PAYER_ID, "10");
// Ingresa aquí el número de identificación del pagador.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "32144457");
// Ingresa aquí el número de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4668063527597820");
// Ingresa la fecha de expiración de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2024/06");
// Ingresa aquí el nombre de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");
CreditCardToken response = PayUTokens.create(parameters);

if(response != null){
	response.getTokenId();
	response.getMaskedNumber();
	response.getPayerId();
	response.getIdentificationNumber();
	response.getPaymentMethod();
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$parameters = array(
	// Ingresa aquí el nombre del pagador.
	PayUParameters::PAYER_NAME => "Mary Keller",
	// Ingresa aquí el identificador del pagador.
	PayUParameters::PAYER_ID => "10",
	// Ingresa aquí el número de identificación del pagador.
	PayUParameters::PAYER_DNI => "32144457",
	// Ingresa aquí el número de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_NUMBER => "4668063527597820",
	// Ingresa la fecha de expiración de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2024/10",
	// Ingresa aquí el nombre de la tarjeta de crédito
	PayUParameters::PAYMENT_METHOD => "VISA"
);
	
$response = PayUTokens::create($parameters);   
if($response){
	//Puedes obtener el token de la tarjeta de crédito 
	$response->creditCardToken->creditCardTokenId;
}
```
{{< /tab >}}
{{< /tabs >}}

## Eliminación individual de tarjeta de crédito {#individual-token-removal}
Utilizando esta funcionalidad, puedes eliminar un token previamente registrado. 

### Llamado del método {#method-call-1}
Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
// -- Operación "Eliminar token" --
Map<String, String> parameters = new HashMap<String, String>();
// Ingresa aquí el identificador del pagador.
parameters.put(PayU.PARAMETERS.PAYER_ID, "10");
// Ingresa aquí identificador el token.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "ab01ecd5-7d8f-4bee-91c1-4535d9ba282e");
CreditCardToken response = PayUTokens.remove(parameters);
LoggerUtil.info("{0}", response);
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP

```
{{< /tab >}}
{{< /tabs >}}

## Consulta de tókenes {#query-tokens}
Utilizando esta funcionalidad, puedes obtener la información de las tarjetas de crédito tokenizadas, puedes consultar por número de token o por rango de fechas. 

### Llamado del método
Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="6" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
// -- Operación "consultar token" --
Map<String, String> parameters = new HashMap<String, String>();
// -- Parámetros opcionales --
// Ingresa aquí el identificador del pagador.
parameters.put(PayU.PARAMETERS.PAYER_ID, "10");
// Ingresa aquí identificador el token.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "ab01ecd5-7d8f-4bee-91c1-4535d9ba282e");
// Ingresa la fecha de inicio y fin para filtrar por rango de fechas.
parameters.put(PayU.PARAMETERS.START_DATE, "2021-06-29T12:00:00");
parameters.put(PayU.PARAMETERS.END_DATE, "2021-07-01T12:00:00");

List<CreditCardToken> response = PayUTokens.find(parameters);
Iterator<CreditCardToken> tokens_iterator=response.iterator();

while(tokens_iterator.hasNext()){
	CreditCardToken token= (CreditCardToken) tokens_iterator.next();

	token.getTokenId();
	token.getMaskedNumber();
	token.getPayerId();
	token.getIdentificationNumber();
	token.getPaymentMethod();

}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
// -- Parámetros opcionales --
$parameters = array(
	// Ingresa aquí el identificador del pagador.
	PayUParameters::PAYER_ID => "10",
	// Ingresa aquí identificador el token.
	PayUParameters::TOKEN_ID => "ab01ecd5-7d8f-4bee-91c1-4535d9ba282e",
	// Ingresa la fecha de inicio y fin para filtrar por rango de fechas. Optional.
	PayUParameters::START_DATE=> "2021-06-29T12:00:00",
	PayUParameters::END_DATE=> "2021-07-01T12:00:00"
);

$response=PayUTokens::find($parameters);
   
if($response) {
	$credit_cards = $response->creditCardTokenList;
	foreach ($credit_cards as $credit_card) { 
		$credit_card->creditCardTokenId;
		$credit_card->maskedNumber;
		$credit_card->payerId;
		$credit_card->identificationNumber;
		$credit_card->paymentMethod;
	}         
} 
```
{{< /tab >}}
{{< /tabs >}}

## Pagos utilizando tokenización {#payments-using-tokenization}
Para pagos con tókenes de tarjeta de crédito, incluye el parámetro `CREDIT_CARD_SECURITY_CODE` reemplazando la información de la tarjeta de crédito. El siguiente ejemplo muestra el cuerpo de la petición a alto nivel de un flujo de un paso, no se muestran los detalles de la petición.

{{% alert title="Nota" color="info"%}}
Para procesar sin CVV es necesario enviar el parámetro `PROCESS_WITHOUT_CVV2` omo true en la petición del pago y quitar el parámetro `CREDIT_CARD_SECURITY_CODE`.<br>
Por defecto, no está activo el procesamiento de tarjetas de crédito sin código de seguridad. Si quieres activar esta funcionalidad, contacta a tu representante de ventas.
{{% /alert%}}


{{< tabs tabTotal="2" tabID="7" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Ingresa aquí el identificador de la cuenta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, accountId);
// Ingresa aquí la referencia de pago.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, reference);
// Ingresa aquí la descripción del pago.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Ingresa aquí el idioma de la transacción.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Valores --
//Ingresa aquí el valor.
parameters.put(PayU.PARAMETERS.VALUE, value);
// Ingresa aquí la moneda.
parameters.put(PayU.PARAMETERS.CURRENCY, currency);

// -- Comprador --
// Ingresa aquí la información del comprador.
//parameters.put([...], [...]);


// -- Pagador --
// Ingresa aquí la información del pagador.
//parameters.put([...], [...]);

// -- Datos de la tarjeta de crédito --
// Ingresa aquí el token de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.TOKEN_ID, "ab01ecd5-7d8f-4bee-91c1-4535d9ba282e");
// Ingresa aquí el código de seguridad de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "321");
// Ingresa aquí el nombre de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");

// Ingresa aquí el número de cuotas.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Ingresa aquí el nombre del país.
parameters.put(PayU.PARAMETERS.COUNTRY, CountryName);


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
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$parameters = array(
	//Ingresa aquí el identificador de la cuenta
	PayUParameters::ACCOUNT_ID => $accountId,
	// Ingresa aquí la referencia de pago.
	PayUParameters::REFERENCE_CODE => $reference,
	// Ingresa aquí la descripción del pago.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
        //Ingresa aquí el valor.
	PayUParameters::VALUE => $value,
	// Ingresa aquí la moneda.
	PayUParameters::CURRENCY => $currency,

	// -- Comprador --
  // Ingresa aquí la información del comprador.
  //PayUParameters::[...] => [...],


  // -- Pagador --
  // Ingresa aquí la información del pagador.
  //PayUParameters::[...] => [...],

	// -- Datos de la tarjeta de crédito --
  // Ingresa aquí el token de la tarjeta de crédito
  PayUParameters::TOKEN_ID => "ab01ecd5-7d8f-4bee-91c1-4535d9ba282e",
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2022/12",
	// Ingresa aquí el código de seguridad de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "321",
	// Ingresa aquí el nombre de la tarjeta de crédito
	PayUParameters::PAYMENT_METHOD => "VISA",

	// Ingresa aquí el número de cuotas.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Ingresa aquí el nombre del país.
	PayUParameters::COUNTRY => $country,

	// Device Session ID
	PayUParameters::DEVICE_SESSION_ID => "vghs6tvkcle931686k1900o6e1",
	// IP del pagador
	PayUParameters::IP_ADDRESS => "127.0.0.1",
	// Cookie de la sesión actual
	PayUParameters::PAYER_COOKIE=>"pt1t38347bs6jc9ruv2ecpv7o2",
	// User agent de la sesión actual
	PayUParameters::USER_AGENT=>"Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
	);

// Petición de "Autorización y captura"
$response = PayUPayments::doAuthorizationAndCapture($parameters);
```
{{< /tab >}}
{{< /tabs >}}
<br>

Para detalles específicos sobre cómo realizar pagos, consulta el artículo correspondiente al país de procesamiento.

<div>
  <div style="float: left;width: 50%;">
      <img src="/assets/Argentina.png" width="25px"/> <a href="{{< ref "Payments-SDK-Argentina.md" >}}">Argentina</a><br>
      <img src="/assets/Brasil.png" width="25px"/> <a href="{{< ref "Payments-SDK-Brazil.md" >}}">Brasil</a><br>
      <img src="/assets/Chile.png" width="25px"/> <a href="{{< ref "Payments-SDK-Chile.md" >}}">Chile</a><br>
    </ul>
  </div>
  <div style="float: left;width: 50%;">
    <ul>
      <img src="/assets/Colombia.png" width="25px"/> <a href="{{< ref "Payments-SDK-Colombia.md" >}}">Colombia</a><br>
      <img src="/assets/Mexico.png" width="25px"/> <a href="{{< ref "Payments-SDK-Mexico.md" >}}">México</a><br>
      <img src="/assets/Peru.png" width="25px"/> <a href="{{< ref "Payments-SDK-Peru.md" >}}">Perú</a><br>
    </ul>
  </div>
</div>
<br>
<br>
<br>