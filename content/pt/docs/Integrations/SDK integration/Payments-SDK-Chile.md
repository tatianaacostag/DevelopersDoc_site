---
title: "Payments SDK - Chile"
linkTitle: "Payments SDK - Chile"
date: 2021-05-03T15:48:08-05:00
description: >
  Payments SDK Chile lets your shop process different transaction types with multiple payment methods.
weight: 30
tags: ["subtopic"]
---

To integrate with Payments SDK Chile, target the requests to the following URLs:

{{< tabs tabTotal="2" tabID="1" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
// URL for teste: https://sandbox.api.payulatam.com/payments-api/
PayU.paymentsUrl = “https://api.payulatam.com/payments-api/”;
// URL for teste: https://sandbox.api.payulatam.com/reports-api/
PayU.reportsUrl = “https://api.payulatam.com/reports-api/”;
```

{{< /tab >}}

{{< tab tabNum="2" >}}

```PHP
// URL for teste: https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi
Environment::setPaymentsCustomUrl(“https://api.payulatam.com/payments-api/4.0/service.cgi”);
// URL for teste: https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi
Environment::setReportsCustomUrl(“https://api.payulatam.com/reports-api/4.0/service.cgi”);
```

{{< /tab >}}
{{< /tabs >}}

## Available methods
Payments SDK includes the following methods:

* [Submit transaction with credit cards]({{< ref "Payments-SDK-Chile.md#submit-transaction-with-credit-cards" >}})
* [Available payment methods query]({{< ref "Payments-SDK-Chile.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-SDK-Chile.md#ping" >}})
<!-- * [Submit transaction with cash]({{< ref "Payments-SDK-Chile.md#submit-transaction-with-cash" >}}) -->

{{% alert title="Observação" color="info"%}}
To confirm the status of a transaction, você pode usar the [Consultas SDK]({{< ref "QueriesSDK.md" >}}).
{{% /alert %}}

## Submit transaction with credit cards
This method lets you process the payments performed by your customers using credit cards. For Chile, you can perform the two-step flows (**Autorização**, **Captura**), and one-step flows (**Cobrança**). For more information, refer to [Payment flows]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Observação" color="info"%}}
Transactions with credit card using two-step flows are available under demand. Contact your Sales representative para obter mais informações.
{{% /alert %}}

### Observações {#considerations}
* Send a valid Credit card Método de pagamento in the request, [see the available Payment Methods for Chile]({{< ref "select-your-payment-method.html#Chile" >}}).
* For payments with credit card tokens, set the parameters `TOKEN_ID` e `CREDIT_CARD_SECURITY_CODE` (if you process with security code) replacing the information of the credit card. For more information, refer to [Tokenization SDK]({{< ref "TokenizationSDK.md" >}}).
* Transactions in CHILEAN PESOS with decimal amounts are not allowed.
* Two-step flows are not supported for international credit cards.
* Transactions with credit card using two-step flows are available under demand and for single installment payments. Contact your Sales representative para obter mais informações.
* By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative. After this feature is enabled for you, set the parameter `PROCESS_WITHOUT_CVV2` as true and remove the parameter `CREDIT_CARD_SECURITY_CODE`.

### Autorização
Use this method to perform the **Autorização** step of a two-step flow. In this step, you authorize the payment but the amount is not debited until you [capture]({{< ref "payments-sdk-chile.md#capture" >}}) the funds.<br>The following examples show how to call the method for this transaction type according to the programming language.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Enter the account’s identifier here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512325");
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
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.CLP.name());

// -- Buyer --
// Enter the buyer Id here.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
// Enter the buyer's name here.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer name");
// Enter the buyer's e-mail here
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
// Enter the buyer's contact phone here.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
// Enter the buyer's contact document here.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

// Enter the buyer's address here.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "RM");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Talagante");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CL");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "7563126");


// -- Payer --
// Enter the payer's ID here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
// Enter the payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second payer name");
// Enter the payer's e-mail here.
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "payer_test@test.com");
// Enter the payer's contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "7563126");
// Enter the payer's contact document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "5415668464654");
// Enter the payer's address here.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "RM");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Talagante");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CL");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// -- Credit card data --
// Enter the number of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4097440000000004");
// Enter expiration date of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2022/12");
// Enter the security code of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "777");
// Enter the name of the credit card here
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");

// Enter the number of installments here.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Enter the name of the country here.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CL.name());


// Device Session ID
parameters.put(PayU.PARAMETERS.DEVICE_SESSION_ID, "vghs6tvkcle931686k1900o6e1");
// Payer IP
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
// Cookie of the current session.
parameters.put(PayU.PARAMETERS.COOKIE, "pt1t38347bs6jc9ruv2ecpv7o2");
// User agent of the current session.
parameters.put(PayU.PARAMETERS.USER_AGENT, "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0");

// Autorização request
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
	// Enter the account’s identifier here
	PayUParameters::ACCOUNT_ID => "512325",
	// Enter the reference code here.
	PayUParameters::REFERENCE_CODE => $reference,
	// Enter the description here.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Values --
        // Enter the value here.
	PayUParameters::VALUE => $value,
	// Enter the currency here.
	PayUParameters::CURRENCY => "CLP",

	// -- Buyer --
	// Enter the buyer Id here.
	PayUParameters::BUYER_ID => "1",
	// Enter the buyer's name here.
	PayUParameters::BUYER_NAME => "First name and second buyer name",
	// Enter the buyer's e-mail here.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	// Enter the buyer's contact phone here.
	PayUParameters::BUYER_CONTACT_PHONE => "7563126",
	// Enter the buyer's contact document here.
	PayUParameters::BUYER_DNI => "5415668464654",
	// Enter the buyer's address here.
	PayUParameters::BUYER_STREET => "Autopista Del Sol, 0 - Km.43 Costado Sur",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "RM",
	PayUParameters::BUYER_STATE => "Talagante",
	PayUParameters::BUYER_COUNTRY => "CL",
	PayUParameters::BUYER_POSTAL_CODE => "000000",
	PayUParameters::BUYER_PHONE => "7563126",


	// -- Payer --
	// Enter the payer's ID here.
	PayUParameters::PARAMETERS.PAYER_ID => "1",
        /// Enter the payer's name here
	PayUParameters::PAYER_NAME => "First name and second payer name",
	// Enter the payer's e-mail here
	PayUParameters::PAYER_EMAIL => "payer_test@test.com",
	// Enter the payer's contact phone here.
	PayUParameters::PAYER_CONTACT_PHONE => "7563126",
	// Enter the payer's contact document here.
	PayUParameters::PAYER_DNI => "5415668464654",
	// Enter the payer's address here.
	PayUParameters::PAYER_STREET => "Autopista Del Sol, 0 - Km.43 Costado Sur",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "RM",
	PayUParameters::PAYER_STATE => "Talagante",
	PayUParameters::PAYER_COUNTRY => "CL",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// -- Credit card data --
        // Enter the number of the credit card here
	PayUParameters::CREDIT_CARD_NUMBER => "4097440000000004",
	// Enter expiration date of the credit card here
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2022/12",
	// Enter the security code of the credit card here
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "777",
	// Enter the name of the credit card here
	PayUParameters::PAYMENT_METHOD => "VISA",

	// Enter the number of installments here.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Enter the name of the country here.
	PayUParameters::COUNTRY => PayUCountries::CL,

	// Device Session ID
	PayUParameters::DEVICE_SESSION_ID => "vghs6tvkcle931686k1900o6e1",
	// Payer IP
	PayUParameters::IP_ADDRESS => "127.0.0.1",
	// Cookie of the current session
	PayUParameters::PAYER_COOKIE=>"pt1t38347bs6jc9ruv2ecpv7o2",
	// User agent of the current session
	PayUParameters::USER_AGENT=>"Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
	);

// Autorização request
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

### Captura
Use this method to perform the **Captura** step of a two-step flow. In this step, you capture the funds previously [Authorized]({{< ref "payments-sdk-chile.md#authorization" >}}) to transfer them to your PayU account.

#### Observações {#considerations}
Leve em conta as seguintes informações for capture.
* The maximum time to capture an approved transaction is 7 days. After this time, the transaction is auto-voided.
* Only the parameters displayed in the request body are mandatory to invoke a Captura transaction. Recall that the order and transaction ids must meet with a currently authorized transaction.
* Captures are only allowed for transactions in one installment.

The following examples show how to call the method for this transaction type according to the programming language.

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

// Enter the order identifier here.
parameters.put(PayU.PARAMETERS.ORDER_ID, "1400468293");
// Enter the transaction identifier here.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "ad6940f1-cf8b-474a-a69d-00382084d16c");
// Enter the transaction language here.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// Captura Request
TransactionResponse response = PayUPayments.doCapture(parameters);

// Response
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
	// Enter the order identifier here.
	PayUParameters::ORDER_ID => "1400468293",
	// Enter the transaction identifier here.
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

### Cobrança
Use this method to perform a one-step flow, namely a charge. In this step, both steps of the two-step flow are combined in a single transaction and the funds are transferred from the customers account to your PayU account once they have been approved:

The following examples show how to call the method for this transaction type according to the programming language.

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Enter the account’s identifier here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512325");
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
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.CLP.name());

// -- Buyer --
// Enter the buyer Id here.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
// Enter the buyer's name here.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer name");
// Enter the buyer's e-mail here
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
// Enter the buyer's contact phone here.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
// Enter the buyer's contact document here.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

// Enter the buyer's address here.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "RM");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Talagante");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CL");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "7563126");


// -- Payer --
// Enter the payer's ID here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
// Enter the payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second payer name");
// Enter the payer's e-mail here.
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "payer_test@test.com");
// Enter the payer's contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "7563126");
// Enter the payer's contact document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "5415668464654");
// Enter the payer's address here.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "RM");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Talagante");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CL");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// -- Credit card data --
// Enter the number of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4037997623271984");
// Enter expiration date of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2030/12");
// Enter the security code of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "321");
// Enter the name of the credit card here
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");

// Enter the number of installments here.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Enter the name of the country here.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CL.name());


// Device Session ID
parameters.put(PayU.PARAMETERS.DEVICE_SESSION_ID, "vghs6tvkcle931686k1900o6e1");
// Payer IP
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
// Cookie of the current session.
parameters.put(PayU.PARAMETERS.COOKIE, "pt1t38347bs6jc9ruv2ecpv7o2");
// User agent of the current session.
parameters.put(PayU.PARAMETERS.USER_AGENT, "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0");

// Autorização request
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
	// Enter the account’s identifier here
	PayUParameters::ACCOUNT_ID => "512325",
	// Enter the reference code here.
	PayUParameters::REFERENCE_CODE => $reference,
	// Enter the description here.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Values --
        // Enter the value here.
	PayUParameters::VALUE => $value,
	// Enter the currency here.
	PayUParameters::CURRENCY => "CLP",

	// -- Buyer --
	// Enter the buyer Id here.
	PayUParameters::BUYER_ID => "1",
	// Enter the buyer's name here.
	PayUParameters::BUYER_NAME => "First name and second buyer name",
	// Enter the buyer's e-mail here.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	// Enter the buyer's contact phone here.
	PayUParameters::BUYER_CONTACT_PHONE => "7563126",
	// Enter the buyer's contact document here.
	PayUParameters::BUYER_DNI => "5415668464654",
	// Enter the buyer's address here.
	PayUParameters::BUYER_STREET => "Autopista Del Sol, 0 - Km.43 Costado Sur",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "RM",
	PayUParameters::BUYER_STATE => "Talagante",
	PayUParameters::BUYER_COUNTRY => "CL",
	PayUParameters::BUYER_POSTAL_CODE => "000000",
	PayUParameters::BUYER_PHONE => "7563126",


	// -- Payer --
	// Enter the payer's ID here.
	PayUParameters::PARAMETERS.PAYER_ID => "1",
        /// Enter the payer's name here
	PayUParameters::PAYER_NAME => "First name and second payer name",
	// Enter the payer's e-mail here
	PayUParameters::PAYER_EMAIL => "payer_test@test.com",
	// Enter the payer's contact phone here.
	PayUParameters::PAYER_CONTACT_PHONE => "7563126",
	// Enter the payer's contact document here.
	PayUParameters::PAYER_DNI => "5415668464654",
	// Enter the payer's address here.
	PayUParameters::PAYER_STREET => "Autopista Del Sol, 0 - Km.43 Costado Sur",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "RM",
	PayUParameters::PAYER_STATE => "Talagante",
	PayUParameters::PAYER_COUNTRY => "CL",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// -- Credit card data --
        // Enter the number of the credit card here
	PayUParameters::CREDIT_CARD_NUMBER => "4037997623271984",
	// Enter expiration date of the credit card here
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2030/12",
	// Enter the security code of the credit card here
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "321",
	// Enter the name of the credit card here
	PayUParameters::PAYMENT_METHOD => "VISA",

	// Enter the number of installments here.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Enter the name of the country here.
	PayUParameters::COUNTRY => PayUCountries::CL,

	// Device Session ID
	PayUParameters::DEVICE_SESSION_ID => "vghs6tvkcle931686k1900o6e1",
	// Payer IP
	PayUParameters::IP_ADDRESS => "127.0.0.1",
	// Cookie of the current session
	PayUParameters::PAYER_COOKIE=>"pt1t38347bs6jc9ruv2ecpv7o2",
	// User agent of the current session
	PayUParameters::USER_AGENT=>"Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
	);

// Autorização request
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
<!--
## Submit transaction with cash
This method lets you process the payments in cash of your customers. To integrate with cash transactions, you must redirect the customer to the URL found in the response of the method; your customer selects cash and generates the payment code.

<img src="/assets/Payments/CashReceiptCL.png" alt="PrintScreen" width="50%">

### Observações {#considerations}
* The parameter `EXPIRATION_DATE` is not mandatory. If you don't send this parameter, its default value for is seven days after the current date at 12:00 pm.<br>If you send a date later than the default number of days, PayU will ignore this value and the expiration will be set as default.
* You must set a response URL in the parameter `NETWORK_CALLBACK_URL` in the request; this URL redirects the user back to your page after they finish the online payment procedure.
* You must redirect the payer to the Klap webpage (fka as Multicaja) to let them perform the cash payment. This URL is found in the `BANK_URL` parameter in the response.

### Method call
The following are the bodies of the request and response of this payment method.

Map<String, String> parameters = new HashMap<String, String>();

        // Enter the account’s identifier here.
        parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512325");
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
        parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.CLP.name());

        // -- Buyer --
        // Enter the buyer Id here.
        parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
        // Enter the buyer's name here.
        parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer  name");
        // Enter the buyer's e-mail here
        parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
        // Enter the buyer's contact phone here.
        parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
        // Enter the buyer's contact document here.
        parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

        // Enter the buyer's address here.
        parameters.put(PayU.PARAMETERS.BUYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
        parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
        parameters.put(PayU.PARAMETERS.BUYER_CITY, "RM");
        parameters.put(PayU.PARAMETERS.BUYER_STATE, "Talagante");
        parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CL");
        parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "000000");
        parameters.put(PayU.PARAMETERS.BUYER_PHONE, "7563126");


        // -- Payer --
        // Enter the payer's ID here.
        parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
        // Enter the payer's name here.
        parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second payer name");
        // Enter the payer's e-mail here.
        parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "payer_test@test.com");
        // Enter the payer's contact phone here.
        parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "7563126");
        // Enter the payer's contact document here.
        parameters.put(PayU.PARAMETERS.PAYER_DNI, "5415668464654");
        // Enter the payer's address here.
        parameters.put(PayU.PARAMETERS.PAYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
        parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
        parameters.put(PayU.PARAMETERS.PAYER_CITY, "RM");
        parameters.put(PayU.PARAMETERS.PAYER_STATE, "Talagante");
        parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CL");
        parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
        parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

        // Enter the network callback URL here.
        parameters.put(PayU.PARAMETERS.NETWORK_CALLBACK_URL, "1");
        // Enter the name of the country here.
        parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CL.name());

        // Enter the cash payment method name here.
        parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "MULTICAJA");

        // Enter the payment due date
        parameters.put(PayU.PARAMETERS.EXPIRATION_DATE, "2021-07-01T20:00:00");
        
        // Payer IP
        parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
        
        // Autorização request
        TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);


## Submit transaction with bank transfer
This method lets you process the bank transfer payments of your customers. To integrate with these transactions, you must redirect the customer to the URL found in the response of the method.

<img src="/assets/Payments/BankTransferReceiptCL.png" alt="PrintScreen" width="50%">

### Observações {#considerations}
* If you don't send the `RESPONSE_URL` parameter in the extra parameters, the API took the value from the _**Response URL**_ variable in your Módulo PayU (_**Settings**_ > _**Technical configuration**_).
* When you process bank transfer payment, you must redirect the customer to the URL found in the `URL_PAYMENT_REDIRECT` extra parameter concatenated with the `TRANSBANK_DIRECT_TOKEN` extra parameter as follows: <br> `URL_PAYMENT_REDIRECT?token_ws=TRANSBANK_DIRECT_TOKEN`.
* If the payment request is successful, the transaction has state `PENDING` and responseCode `PENDING_PAYMENT_IN_ENTITY`; this is because the payer is redirected to the selected bank to complete the payment.
* The response page must have the following variables:

| Variável          | Descrição                                                   |
|-------------------|---------------------------------------------------------------|
| transactionState  | Estado of the transaction.                                     |
| reference_pol     | Reference code to identify a transaction in PayU.             |
| TX_VALUE          | Transaction amount.                                           |
| authorizationCode | Autorização code of the transaction.                        |
| processingDate    | Transaction date.                                             |
| cc_number         | Visible number of the card used in the transaction.           |

The variables above are sent via GET.

### Method call
The following are the bodies of the request and response of this payment method.


-->
## Available payment methods query
This method returns a list of the payment methods available in all countries.

### Method call
The following examples show how to call the method for this transaction type according to the programming language.

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
The ```PING``` method lets you verify the connection to our platform. 

### Method call
The following examples show how to call the method for this transaction type according to the programming language.

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
