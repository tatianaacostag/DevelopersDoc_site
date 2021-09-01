---
title: "Payments SDK - Brazil"
linkTitle: "Payments SDK - Brazil"
date: 2021-05-03T15:48:08-05:00
description: >
  Payments SDK Brazil lets your shop process different transaction types with multiple payment methods.
weight: 20
tags: ["subtopic"]
---

To integrate with Payments SDK Brazil, target the requests to the following URLs:

{{< tabs tabTotal="2" tabID="1" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
// URL for test: https://sandbox.api.payulatam.com/payments-api/
PayU.paymentsUrl = “https://api.payulatam.com/payments-api/”;
// URL for test: https://sandbox.api.payulatam.com/reports-api/
PayU.reportsUrl = “https://api.payulatam.com/reports-api/”;
```

{{< /tab >}}

{{< tab tabNum="2" >}}

```PHP
// URL for test: https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi
Environment::setPaymentsCustomUrl(“https://api.payulatam.com/payments-api/4.0/service.cgi”);
// URL for test: https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi
Environment::setReportsCustomUrl(“https://api.payulatam.com/reports-api/4.0/service.cgi”);
```

{{< /tab >}}
{{< /tabs >}}

## Available methods
Payments API includes the following methods:

* [Submit transaction with credit cards]({{< ref "Payments-SDK-Brazil.md#submit-transaction-with-credit-cards" >}})
* [Submit transaction with cash]({{< ref "Payments-SDK-Brazil.md#submit-transaction-with-cash" >}})
* [Available payment methods query]({{< ref "Payments-SDK-Brazil.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-SDK-Brazil.md#ping" >}})

{{% alert title="Note" color="info"%}}
To confirm the status of a transaction, you can use the [Queries SDK]({{< ref "QueriesSDK.md" >}}).
{{% /alert %}}

## Submit transaction with credit cards
This method lets you process the payments performed by your customers using credit cards. For Brazil, you can perform the two-step flows (**Authorization**, **Capture**), and one-step flows (**Charge**). For more information, refer to [Payment flows]({{< ref "payments.md#payment-flows" >}}).

### Considerations
* Send a valid Credit card Payment Method in the request, [see the available Payment Methods for Brazil]({{< ref "select-your-payment-method.html#img-srcassetsbrazilpng-width25px-brazil" >}}).
* For payments with credit card tokens, include the parameters `TOKEN_ID` and `CREDIT_CARD_SECURITY_CODE` replacing the information of the credit card (if you process with security code). For more information, refer to [Tokenization SDK]({{< ref "TokenizationSDK.md" >}}).
* By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative. After this feature is enabled for you, send in the request the parameter `PROCESS_WITHOUT_CVV2` as true and remove the parameter `CREDIT_CARD_SECURITY_CODE`.
* The extra parameter `CIELO_TID` identifies the transaction, this parameter is needed when you want to process voids.

### Authorization
Use this method to perform the **Authorization** step of a two-step flow. In this step, you authorize the payment but the amount is not debited until you [capture]({{< ref "payments-sdk-brazil.md#capture" >}}) the funds.<br>The following examples shows how to call the method for this transaction type according to the programming language.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Enter the account’s identifier here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512327");
// Enter the reference code here.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
// Enter the description here.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Enter the transaction language here.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Values --
// Enter the value here.
parameters.put(PayU.PARAMETERS.VALUE, ""+value);
// Enter the currency here.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.BRL.name());

// -- Buyer --
//Enter the buyer Id here.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
//Enter the buyer's name here.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer name");
//Enter the buyer's email here
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
//Enter the buyer's contact phone here.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "(11)756312633");
//Enter the buyer's contact document here.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "811.807.405-64");
//Enter the buyer's CNPJ.
parameters.put(PayU.PARAMETERS.BUYER_CNPJ, "32593371000110");

//Enter the buyer's address here.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Quadra QNP 34 Conjunto G 780");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Manaos");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "SP");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "BR");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "10012545");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "(11)756312633");

// -- Payer --
//Enter the payer Id here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
//Enter the Payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second buyer name");
//Enter the Payer's email here
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "buyer_test@test.com");
//Enter the Payer's contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "(11)756312633");
//Enter the Payer's contact document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "811.807.405-64");
//Enter the Payer's CNPJ.
parameters.put(PayU.PARAMETERS.PAYER_CNPJ, "32593371000110");

//Enter the Payer's address here.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Quadra QNP 34 Conjunto G 780");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Manaos");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "SP");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "BR");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "10012545");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "(11)756312633");

// -- Credit card data --
// Enter the number of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "5253203387684619");
// Enter expiration date of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2022/12");
//Enter the security code of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "777");
//Enter the name of the credit card here
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "MASTERCARD");

// Enter the number of installments here.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Enter the name of the country here.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.BR.name());


// Device Session ID
parameters.put(PayU.PARAMETERS.DEVICE_SESSION_ID, "vghs6tvkcle931686k1900o6e1");
// Payer IP
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
// Cookie of the current session.
parameters.put(PayU.PARAMETERS.COOKIE, "pt1t38347bs6jc9ruv2ecpv7o2");
// User agent of the current session.
parameters.put(PayU.PARAMETERS.USER_AGENT, "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0");

// Authorization request
TransactionResponse response = PayUPayments.doAuthorization(parameters);

// You can obtain the properties in the response
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
	//Enter the account’s identifier here
	PayUParameters::ACCOUNT_ID => "512327",
	// Enter the reference code here.
	PayUParameters::REFERENCE_CODE => $reference,
	// Enter the description here.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Values --
        // Enter the value here.
	PayUParameters::VALUE => $value,
	// Enter the currency here.
	PayUParameters::CURRENCY => "BRL",

	// -- Buyer --
	//Enter the buyer Id here.
	PayUParameters::BUYER_ID => "1",
	//Enter the buyer's name here.
	PayUParameters::BUYER_NAME => "First name and second buyer  name",
	//Enter the buyer's email here.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	//Enter the buyer's contact phone here.
	PayUParameters::BUYER_CONTACT_PHONE => "(11)756312633",
	//Enter the buyer's contact document here.
	PayUParameters::BUYER_DNI => "811.807.405-64",
  //Enter the buyer's CNPJ.
	PayUParameters::BUYER_CNPJ => "32593371000110",
	//Enter the buyer's address here.
	PayUParameters::BUYER_STREET => "Quadra QNP 34 Conjunto G 780",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Manaos",
	PayUParameters::BUYER_STATE => "SP",
	PayUParameters::BUYER_COUNTRY => "BR",
	PayUParameters::BUYER_POSTAL_CODE => "10012545",
	PayUParameters::BUYER_PHONE => "(11)756312633",

  // -- Payer --
  //Enter the payer Id here.
  PayUParameters::PAYER_ID => "1",
  //Enter the Payer's name here.
  PayUParameters::PAYER_NAME => "First name and second buyer name",
  //Enter the Payer's email here
  PayUParameters::PAYER_EMAIL => "buyer_test@test.com",
  //Enter the Payer's contact phone here.
  PayUParameters::PAYER_CONTACT_PHONE => "(11)756312633",
  //Enter the Payer's contact document here.
  PayUParameters::PAYER_DNI => "811.807.405-64",
  //Enter the Payer's CNPJ.
  PayUParameters::PAYER_CNPJ => "32593371000110",

  //Enter the Payer's address here.
  PayUParameters::PAYER_STREET => "Quadra QNP 34 Conjunto G 780",
  PayUParameters::PAYER_STREET_2 => "5555487",
  PayUParameters::PAYER_CITY => "Manaos",
  PayUParameters::PAYER_STATE => "SP",
  PayUParameters::PAYER_COUNTRY => "BR",
  PayUParameters::PAYER_POSTAL_CODE => "10012545",
  PayUParameters::PAYER_PHONE => "(11)756312633",

	// -- Credit card data --
  // Enter the number of the credit card here
	PayUParameters::CREDIT_CARD_NUMBER => "5253203387684619",
	// Enter expiration date of the credit card here
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2022/12",
	//Enter the security code of the credit card here
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "777",
	//Enter the name of the credit card here
	PayUParameters::PAYMENT_METHOD => "MASTERCARD",

	// Enter the number of installments here.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Enter the name of the country here.
	PayUParameters::COUNTRY => PayUCountries::BR,

	// Device Session ID
	PayUParameters::DEVICE_SESSION_ID => "vghs6tvkcle931686k1900o6e1",
	// Payer IP
	PayUParameters::IP_ADDRESS => "127.0.0.1",
	// Cookie of the current session
	PayUParameters::PAYER_COOKIE=>"pt1t38347bs6jc9ruv2ecpv7o2",
	// User agent of the current session
	PayUParameters::USER_AGENT=>"Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
	);

// Authorization request
$response = PayUPayments::doAuthorization($parameters);

// You can obtain the properties in the response
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

### Capture
Use this method to perform the **Capture** step of a two-step flow. In this step, you capture the funds previously [Authorized]({{< ref "payments-sdk-brazil.md#authorization" >}}) to transfer them to your PayU account.

#### Considerations
Take into account the following considerations for capture.
* The maximum time to capture an approved transaction is seven (7) days. After this time, the transaction is cancelled.
* Only the parameters displayed in the request body are mandatory to invoke a Capture transaction. Recall that the order and transaction ids must meet with a currently authorized transaction.

The following examples show how to call the method for this transaction type according to the programming language.

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

//Enter the order identifier here.
parameters.put(PayU.PARAMETERS.ORDER_ID, "1400434770");
//Enter the transaction identifier here.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "79de715b-fe77-401e-8b18-241820afb375");
// Enter the transaction language here.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

//Capture Request
TransactionResponse response = PayUPayments.doCapture(parameters);

//Response
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
	// Enter the account’s identifier here.
	PayUParameters::ACCOUNT_ID => "512327",
	//Enter the order identifier here.
	PayUParameters::ORDER_ID => "1400434770",
	//Enter the transaction identifier here.
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

### Charge
Use this method to perform a one-step flow, namely a charge. In this step, both steps of the two-step flow are combined in a single transaction and the funds are transferred from the customers account to your PayU account once they have been approved:

The following examples show how to call the method for this transaction type according to the programming language.

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Enter the account’s identifier here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512327");
// Enter the reference code here.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
// Enter the description here.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Enter the transaction language here.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Values --
// Enter the value here.
parameters.put(PayU.PARAMETERS.VALUE, ""+value);
// Enter the currency here.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.BRL.name());

// -- Buyer --
//Enter the buyer Id here.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
//Enter the buyer's name here.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer name");
//Enter the buyer's email here
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
//Enter the buyer's contact phone here.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "(11)756312633");
//Enter the buyer's contact document here.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "811.807.405-64");
//Enter the buyer's CNPJ.
parameters.put(PayU.PARAMETERS.BUYER_CNPJ, "32593371000110");

//Enter the buyer's address here.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Quadra QNP 34 Conjunto G 780");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Manaos");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "SP");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "BR");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "10012545");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "(11)756312633");

// -- Payer --
//Enter the payer Id here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
//Enter the Payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second buyer name");
//Enter the Payer's email here
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "buyer_test@test.com");
//Enter the Payer's contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "(11)756312633");
//Enter the Payer's contact document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "811.807.405-64");
//Enter the Payer's CNPJ.
parameters.put(PayU.PARAMETERS.PAYER_CNPJ, "32593371000110");

//Enter the Payer's address here.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Quadra QNP 34 Conjunto G 780");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Manaos");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "SP");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "BR");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "10012545");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "(11)756312633");

// -- Credit card data --
// Enter the number of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "5178151142107990");
// Enter expiration date of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2022/12");
//Enter the security code of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "777");
//Enter the name of the credit card here
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "MASTERCARD");

// Enter the number of installments here.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Enter the name of the country here.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.BR.name());


// Device Session ID
parameters.put(PayU.PARAMETERS.DEVICE_SESSION_ID, "vghs6tvkcle931686k1900o6e1");
// Payer IP
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
// Cookie of the current session.
parameters.put(PayU.PARAMETERS.COOKIE, "pt1t38347bs6jc9ruv2ecpv7o2");
// User agent of the current session.
parameters.put(PayU.PARAMETERS.USER_AGENT, "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0");

// Authorization request
TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);

// You can obtain the properties in the response
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
	//Enter the account’s identifier here
	PayUParameters::ACCOUNT_ID => "512327",
	// Enter the reference code here.
	PayUParameters::REFERENCE_CODE => $reference,
	// Enter the description here.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Values --
        // Enter the value here.
	PayUParameters::VALUE => $value,
	// Enter the currency here.
	PayUParameters::CURRENCY => "BRL",

	// -- Buyer --
	//Enter the buyer Id here.
	PayUParameters::BUYER_ID => "1",
	//Enter the buyer's name here.
	PayUParameters::BUYER_NAME => "First name and second buyer  name",
	//Enter the buyer's email here.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	//Enter the buyer's contact phone here.
	PayUParameters::BUYER_CONTACT_PHONE => "(11)756312633",
	//Enter the buyer's contact document here.
	PayUParameters::BUYER_DNI => "811.807.405-64",
  //Enter the buyer's CNPJ.
	PayUParameters::BUYER_CNPJ => "32593371000110",
	//Enter the buyer's address here.
	PayUParameters::BUYER_STREET => "Quadra QNP 34 Conjunto G 780",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Manaos",
	PayUParameters::BUYER_STATE => "SP",
	PayUParameters::BUYER_COUNTRY => "BR",
	PayUParameters::BUYER_POSTAL_CODE => "10012545",
	PayUParameters::BUYER_PHONE => "(11)756312633",

  // -- Payer --
  //Enter the payer Id here.
  PayUParameters::PAYER_ID => "1",
  //Enter the Payer's name here.
  PayUParameters::PAYER_NAME => "First name and second buyer name",
  //Enter the Payer's email here
  PayUParameters::PAYER_EMAIL => "buyer_test@test.com",
  //Enter the Payer's contact phone here.
  PayUParameters::PAYER_CONTACT_PHONE => "(11)756312633",
  //Enter the Payer's contact document here.
  PayUParameters::PAYER_DNI => "811.807.405-64",
  //Enter the Payer's CNPJ.
  PayUParameters::PAYER_CNPJ => "32593371000110",

  //Enter the Payer's address here.
  PayUParameters::PAYER_STREET => "Quadra QNP 34 Conjunto G 780",
  PayUParameters::PAYER_STREET_2 => "5555487",
  PayUParameters::PAYER_CITY => "Manaos",
  PayUParameters::PAYER_STATE => "SP",
  PayUParameters::PAYER_COUNTRY => "BR",
  PayUParameters::PAYER_POSTAL_CODE => "10012545",
  PayUParameters::PAYER_PHONE => "(11)756312633",

	// -- Credit card data --
        // Enter the number of the credit card here
	PayUParameters::CREDIT_CARD_NUMBER => "5178151142107990",
	// Enter expiration date of the credit card here
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2022/12",
	//Enter the security code of the credit card here
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "777",
	//Enter the name of the credit card here
	PayUParameters::PAYMENT_METHOD => "MASTERCARD",

	// Enter the number of installments here.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Enter the name of the country here.
	PayUParameters::COUNTRY => PayUCountries::BR,

	// Device Session ID
	PayUParameters::DEVICE_SESSION_ID => "vghs6tvkcle931686k1900o6e1",
	// Payer IP
	PayUParameters::IP_ADDRESS => "127.0.0.1",
	// Cookie of the current session
	PayUParameters::PAYER_COOKIE=>"pt1t38347bs6jc9ruv2ecpv7o2",
	// User agent of the current session
	PayUParameters::USER_AGENT=>"Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
	);

// Authorization request
$response = PayUPayments::doAuthorizationAndCapture($parameters);

// You can obtain the properties in the response
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

## Submit transaction with cash
This method lets you process the payments in cash of your customers. To integrate with cash transactions, you must redirect the customer to the URL found in the response of the method; your customer sees a payment receipt like this.

<img src="/assets/Payments/CashReceiptBR.png" alt="PrintScreen" width="50%">

### Considerations
* Send a valid cash Payment Method in the request, [see the available Payment Methods for Brazil]({{< ref "select-your-payment-method.html#img-srcassetsbrazilpng-width25px-brazil" >}}).
* The parameter `EXPIRATION_DATE` is not mandatory. If you don't send this parameter, its default value for is seven (7) days after the current date.<br>If you send a date later than the default number of days, PayU will ignore this value and the expiration will be set as default.
* The payment is reflected in the next business day.
* The response returns the following extra parameters related to the transaction
   - **URL_PAYMENT_RECEIPT_HTML**: payment receipt in HTML format. This is where you need to redirect the payment when the payer selects cash payment. 
   - **URL_BOLETO_BANCARIO**: payment receipt in printable format.
   - **EXPIRATION_DATE**: maximum term for the payer to perform the payment.
   - **BAR_CODE**: barcode which lets the payer perform the payment. 

### Method call
The following examples show how to call the method for this transaction type according to the programming language.

{{< tabs tabTotal="2" tabID="5" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Enter the account’s identifier here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512327");
// Enter the reference code here.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
// Enter the description here.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Enter the transaction language here.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Values --
// Enter the value here.
parameters.put(PayU.PARAMETERS.VALUE, ""+value);
// Enter the currency here.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.BRL.name());

// -- Buyer --
//Enter the buyer Id here.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
//Enter the buyer's name here.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer  name");
//Enter the buyer's email here
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
//Enter the buyer's contact phone here.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "(11)756312633");
//Enter the buyer's contact document here.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "811.807.405-64");
//Enter the buyer's CNPJ.
parameters.put(PayU.PARAMETERS.BUYER_CNPJ, "32593371000110");

//Enter the buyer's address here.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Quadra QNP 34 Conjunto G 780");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Manaos");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "SP");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "BR");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "10012545");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "(11)756312633");

// -- Payer --
//Enter the payer Id here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
//Enter the Payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second buyer name");
//Enter the Payer's email here
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "buyer_test@test.com");
//Enter the Payer's contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "(11)756312633");
//Enter the Payer's contact document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "811.807.405-64");
//Enter the Payer's CNPJ.
parameters.put(PayU.PARAMETERS.PAYER_CNPJ, "32593371000110");

//Enter the Payer's address here.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Quadra QNP 34 Conjunto G 780");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Manaos");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "SP");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "BR");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "10012545");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "(11)756312633");

//Enter the cash payment method name here.
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "BOLETO_BANCARIO");

// Enter the payment due date
parameters.put(PayU.PARAMETERS.EXPIRATION_DATE, "2021-07-01T20:00:00");

// Payer IP
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");

// Authorization request
TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);

// You can obtain the properties in the response
if(response != null){
  response.getOrderId();
  response.getTransactionId();
  response.getState();
  if(response.getState().equals(TransactionState.PENDING)){
		response.getPendingReason();
		Map extraParameters = response.getExtraParameters();

		// Obtain the payment receipt URL
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
	//Enter the account’s identifier here
	PayUParameters::ACCOUNT_ID => "512327",
	// Enter the reference code here.
	PayUParameters::REFERENCE_CODE => $reference,
	// Enter the description here.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Values --
        // Enter the value here.
	PayUParameters::VALUE => $value,
	// Enter the currency here.
	PayUParameters::CURRENCY => "BRL",

	// -- Buyer --
	//Enter the buyer Id here.
	PayUParameters::BUYER_ID => "1",
	//Enter the buyer's name here.
	PayUParameters::BUYER_NAME => "First name and second buyer  name",
	//Enter the buyer's email here.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	//Enter the buyer's contact phone here.
	PayUParameters::BUYER_CONTACT_PHONE => "(11)756312633",
	//Enter the buyer's contact document here.
	PayUParameters::BUYER_DNI => "811.807.405-64",
  //Enter the buyer's CNPJ.
	PayUParameters::BUYER_CNPJ => "32593371000110",
	//Enter the buyer's address here.
	PayUParameters::BUYER_STREET => "Quadra QNP 34 Conjunto G 780",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Manaos",
	PayUParameters::BUYER_STATE => "SP",
	PayUParameters::BUYER_COUNTRY => "BR",
	PayUParameters::BUYER_POSTAL_CODE => "10012545",
	PayUParameters::BUYER_PHONE => "(11)756312633",

  // -- Payer --
  //Enter the payer Id here.
  PayUParameters::PAYER_ID => "1",
  //Enter the Payer's name here.
  PayUParameters::PAYER_NAME => "First name and second buyer name",
  //Enter the Payer's email here
  PayUParameters::PAYER_EMAIL => "buyer_test@test.com",
  //Enter the Payer's contact phone here.
  PayUParameters::PAYER_CONTACT_PHONE => "(11)756312633",
  //Enter the Payer's contact document here.
  PayUParameters::PAYER_DNI => "811.807.405-64",
  //Enter the Payer's CNPJ.
  PayUParameters::PAYER_CNPJ => "32593371000110",

  //Enter the Payer's address here.
  PayUParameters::PAYER_STREET => "Quadra QNP 34 Conjunto G 780",
  PayUParameters::PAYER_STREET_2 => "5555487",
  PayUParameters::PAYER_CITY => "Manaos",
  PayUParameters::PAYER_STATE => "SP",
  PayUParameters::PAYER_COUNTRY => "BR",
  PayUParameters::PAYER_POSTAL_CODE => "10012545",
  PayUParameters::PAYER_PHONE => "(11)756312633",

	//Enter the cash payment method name here.
	PayUParameters::PAYMENT_METHOD => "BOLETO_BANCARIO",

  // Enter the payment due date
	PayUParameters::PARAMETERS.EXPIRATION_DATE => "2021-07-01T20:00:00",

	// Enter the name of the country here.
	PayUParameters::COUNTRY => PayUCountries::BR,

	// Payer IP
	PayUParameters::IP_ADDRESS => "127.0.0.1"
	);

// Authorization request
$response = PayUPayments::doAuthorizationAndCapture($parameters);

// You can obtain the properties in the response
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

## Available payment methods query
This method returns a list of the payment methods available in all countries.

### Method call
The following examples show how to call the method for this transaction type according to the programming language. 

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
The ```PING``` method lets you verify the connection to our platform. 

### Method call
The following examples show how to call the method for this transaction type according to the programming language.

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

