---
title: "Payments SDK - Mexico"
linkTitle: "Payments SDK - Mexico"
date: 2021-05-03T15:48:08-05:00
description: >
  Payments SDK Mexico lets your shop process different transaction types with multiple payment methods.
weight: 50
tags: ["subtopic"]
---

To integrate with Payments SDK Mexico, target the requests to the following URLs:

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

* [Submit transaction with credit cards]({{< ref "Payments-SDK-Mexico.md#submit-transaction-with-credit-card" >}})
* [Submit transaction with cash]({{< ref "Payments-SDK-Mexico.md#submit-transaction-with-cash" >}})
* [Submit transaction with bank transfer]({{< ref "Payments-SDK-Mexico.md#submit-transaction-with-bank-transfer" >}})
* [Submit transaction with bank reference]({{< ref "Payments-SDK-Mexico.md#submit-transaction-with-bank-reference" >}})
* [Available payment methods query]({{< ref "Payments-SDK-Mexico.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-SDK-Mexico.md#ping" >}})

{{% alert title="Note" color="info"%}}
To confirm the status of a transaction, you can use the [Queries SDK]({{< ref "QueriesSDK.md" >}}).
{{% /alert %}}

## Submit transaction with credit card
This method lets you process the payments performed by your customers using credit cards. For Mexico, you can perform the two-step flows (**Authorization**, **Capture**), and one-step flows (**Charge**). For more information, refer to [Payment flows]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Note" color="info"%}}
Two-step flows are only supported for Mastercard and Visa.
{{% /alert %}}

### Considerations
* Send a valid credit card Payment Method in the request, [see the available Payment Methods for Mexico]({{< ref "select-your-payment-method.html#img-srcassetsmexicopng-width25px-mexico" >}}).
* Two-step flows are only available for Mastercard and Visa.
* For payments with Promotions, send the parameters `INSTALLMENTS_NUMBER` and `PROMOTION_ID` with the number of installments selected and the Id of the promotion. Refer to [Promotions API]({{< ref "Promotions.md" >}}) for more information.
* When using promotions or apply installments, always display the phrase **"PAGOS DIFERIDOS"** during the payment process.
* When installments applied (fees assumed by the payer), display the original amount of the transaction, the total amount after the fees, the number of installments, and the amount per installment including the extra fee.
* Promotions feature is only available for [one-step flows]({{< ref "Payments.md#payment-flows" >}}).
* For payments with credit card tokens, include the parameters `TOKEN_ID` and `CREDIT_CARD_SECURITY_CODE` replacing the information of the credit card (if you process with security code). For more information, refer to [Tokenization SDK]({{< ref "TokenizationSDK.md" >}}).
* By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative. After this feature is enabled for you, send in the request the variable `PROCESS_WITHOUT_CVV2` as true and remove the variable `CREDIT_CARD_SECURITY_CODE`.

### Authorization
Use this method to perform the **Authorization** step of a two-step flow using Mastercard or Visa. In this step, you authorize the payment but the amount is not debited until you [capture]({{< ref "payments-sdk-mexico.md#capture" >}}) the funds.<br>TThe following examples show how to call the method for this transaction type according to the programming language. 

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Enter the account’s identifier here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512324");
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
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.MXN.name());

// -- Buyer --
//Enter the buyer Id here.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
//Enter the buyer's name here.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer  name");
//Enter the buyer's email here
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
//Enter the buyer's contact phone here.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
//Enter the buyer's contact document here.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

//Enter the buyer's address here.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "7563126");


// -- Payer --
//Enter the payer's ID here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
//Enter the payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second payer name");
//Enter the payer's email here.
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "payer_test@test.com");
//Enter the payer's contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "7563126");
//Enter the payer's contact document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "5415668464654");
// Enter the payer's birthday here
parameters.put(PayU.PARAMETERS.PAYER_BIRTH_DATE, "1994-06-21");
//Enter the payer's address here.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// -- Credit card data --
// Enter the number of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4097440000000004");
// Enter expiration date of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2022/12");
//Enter the security code of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "321");
//Enter the name of the credit card here
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");

// Enter the number of installments here.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Enter the name of the country here.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.MX.name());


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
	PayUParameters::ACCOUNT_ID => "512324",
	// Enter the reference code here.
	PayUParameters::REFERENCE_CODE => $reference,
	// Enter the description here.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Values --
        // Enter the value here.
	PayUParameters::VALUE => $value,
	// Enter the currency here.
	PayUParameters::CURRENCY => "MXN",

	// -- Buyer --
	//Enter the buyer Id here.
	PayUParameters::BUYER_ID => "1",
	//Enter the buyer's name here.
	PayUParameters::BUYER_NAME => "First name and second buyer name",
	//Enter the buyer's email here.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	//Enter the buyer's contact phone here.
	PayUParameters::BUYER_CONTACT_PHONE => "7563126",
	//Enter the buyer's contact document here.
	PayUParameters::BUYER_DNI => "5415668464654",
	//Enter the buyer's address here.
	PayUParameters::BUYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Cuernavaca",
	PayUParameters::BUYER_STATE => "Morelos",
	PayUParameters::BUYER_COUNTRY => "MX",
	PayUParameters::BUYER_POSTAL_CODE => "000000",
	PayUParameters::BUYER_PHONE => "7563126",


	// -- Payer --
	//Enter the payer's ID here.
	PayUParameters::PARAMETERS.PAYER_ID => "1",
        ///Enter the payer's name here
	PayUParameters::PAYER_NAME => "First name and second payer name",
	//Enter the payer's email here
	PayUParameters::PAYER_EMAIL => "payer_test@test.com",
	//Enter the payer's contact phone here.
	PayUParameters::PAYER_CONTACT_PHONE => "7563126",
	//Enter the payer's contact document here.
	PayUParameters::PAYER_DNI => "5415668464654",
	// Enter the payer's birthday here
  PayUParameters::PAYER_BIRTH_DATE => "1994-06-21"),
	//Enter the payer's address here.
	PayUParameters::PAYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "Cuernavaca",
	PayUParameters::PAYER_STATE => "Morelos",
	PayUParameters::PAYER_COUNTRY => "MX",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// -- Credit card data --
        // Enter the number of the credit card here
	PayUParameters::CREDIT_CARD_NUMBER => "4097440000000004",
	// Enter expiration date of the credit card here
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2022/12",
	//Enter the security code of the credit card here
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "321",
	//Enter the name of the credit card here
	PayUParameters::PAYMENT_METHOD => "VISA",

	// Enter the number of installments here.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Enter the name of the country here.
	PayUParameters::COUNTRY => PayUCountries::MX,

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
Use this method to perform the **Capture** step of a two-step flow for Mastercard and Visa. In this step, you capture the funds previously [Authorized]({{< ref "payments-sdk-mexico.md#authorization" >}}) to transfer them to your PayU account.

#### Considerations
Take into account the following considerations for capture.
* The maximum time to capture an approved transaction is 30 days. After this time, the transaction is auto voided.
* Only the parameters displayed in the request body are mandatory to invoke a Capture transaction. Recall that the order and transaction ids must meet with a currently authorized transaction.

The following examples show how to call the method for this transaction type according to the programming language. 

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

//Enter the order identifier here.
parameters.put(PayU.PARAMETERS.ORDER_ID, "1400469033");
//Enter the transaction identifier here.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "f432b9ba-a692-4350-b8c6-2348e1e21a6c");
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
	PayUParameters::ACCOUNT_ID => "512324",
	//Enter the order identifier here.
	PayUParameters::ORDER_ID => "1400469033",
	//Enter the transaction identifier here.
	PayUParameters::TRANSACTION_ID => "f432b9ba-a692-4350-b8c6-2348e1e21a6c",
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
```Java
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Enter the account’s identifier here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512324");
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
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.MXN.name());

// -- Buyer --
//Enter the buyer Id here.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
//Enter the buyer's name here.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer  name");
//Enter the buyer's email here
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
//Enter the buyer's contact phone here.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
//Enter the buyer's contact document here.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

//Enter the buyer's address here.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "7563126");


// -- Payer --
//Enter the payer's ID here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
//Enter the payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second payer name");
//Enter the payer's email here.
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "payer_test@test.com");
//Enter the payer's contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "7563126");
//Enter the payer's contact document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "5415668464654");
// Enter the payer's birthday here
parameters.put(PayU.PARAMETERS.PAYER_BIRTH_DATE, "1994-06-21");
//Enter the payer's address here.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// -- Credit card data --
// Enter the number of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4097440000000004");
// Enter expiration date of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2022/12");
//Enter the security code of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "321");
//Enter the name of the credit card here
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");

// Enter the number of installments here.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Enter the name of the country here.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.MX.name());


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
	PayUParameters::ACCOUNT_ID => "512324",
	// Enter the reference code here.
	PayUParameters::REFERENCE_CODE => $reference,
	// Enter the description here.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Values --
        // Enter the value here.
	PayUParameters::VALUE => $value,
	// Enter the currency here.
	PayUParameters::CURRENCY => "MXN",

	// -- Buyer --
	//Enter the buyer Id here.
	PayUParameters::BUYER_ID => "1",
	//Enter the buyer's name here.
	PayUParameters::BUYER_NAME => "First name and second buyer name",
	//Enter the buyer's email here.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	//Enter the buyer's contact phone here.
	PayUParameters::BUYER_CONTACT_PHONE => "7563126",
	//Enter the buyer's contact document here.
	PayUParameters::BUYER_DNI => "5415668464654",
	//Enter the buyer's address here.
	PayUParameters::BUYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Cuernavaca",
	PayUParameters::BUYER_STATE => "Morelos",
	PayUParameters::BUYER_COUNTRY => "MX",
	PayUParameters::BUYER_POSTAL_CODE => "000000",
	PayUParameters::BUYER_PHONE => "7563126",


	// -- Payer --
	//Enter the payer's ID here.
	PayUParameters::PARAMETERS.PAYER_ID => "1",
        ///Enter the payer's name here
	PayUParameters::PAYER_NAME => "First name and second payer name",
	//Enter the payer's email here
	PayUParameters::PAYER_EMAIL => "payer_test@test.com",
	//Enter the payer's contact phone here.
	PayUParameters::PAYER_CONTACT_PHONE => "7563126",
	//Enter the payer's contact document here.
	PayUParameters::PAYER_DNI => "5415668464654",
	// Enter the payer's birthday here
  PayUParameters::PAYER_BIRTH_DATE => "1994-06-21"),
	//Enter the payer's address here.
	PayUParameters::PAYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "Cuernavaca",
	PayUParameters::PAYER_STATE => "Morelos",
	PayUParameters::PAYER_COUNTRY => "MX",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// -- Credit card data --
        // Enter the number of the credit card here
	PayUParameters::CREDIT_CARD_NUMBER => "4097440000000004",
	// Enter expiration date of the credit card here
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2022/12",
	//Enter the security code of the credit card here
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "321",
	//Enter the name of the credit card here
	PayUParameters::PAYMENT_METHOD => "VISA",

	// Enter the number of installments here.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Enter the name of the country here.
	PayUParameters::COUNTRY => PayUCountries::MX,

	// Device Session ID
	PayUParameters::DEVICE_SESSION_ID => "vghs6tvkcle931686k1900o6e1",
	// Payer IP
	PayUParameters::IP_ADDRESS => "127.0.0.1",
	// Cookie of the current session
	PayUParameters::PAYER_COOKIE=>"pt1t38347bs6jc9ruv2ecpv7o2",
	// User agent of the current session
	PayUParameters::USER_AGENT=>"Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
	);

// "Authorization and Capture" request
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

<img src="/assets/Payments/CashReceiptMX.png" alt="PrintScreen" width="50%">

### Considerations
* Send a valid cash Payment Method in the request, [see the available Payment Methods for Mexico]({{< ref "select-your-payment-method.html#img-srcassetsmexicopng-width25px-mexico" >}}).
* The parameter `EXPIRATION_DATE` is not mandatory. If you don't send this parameter, its default value for is seven (7) days after the current date.
* When the payment method is `OXXO`, the confirmation of the payment will be one day after the payment. For other cash payment methods, the confirmation is online.
* The extra parameters has the following data related to the transaction:
   - **BANK_REFERENCED_CODE**: payment type.
   - **EXPIRATION_DATE**: maximum term for the payer to perform the payment.
   - **BAR_CODE**: barcode which lets the payer perform the payment.
   - **REFERENCE**: internal payment reference generated by PayU. 
   - **URL_PAYMENT_RECEIPT_HTML**: payment receipt in HTML format. This is where you need to redirect the payment when the payer selects cash payment. 
   - **URL_PAYMENT_RECEIPT_PDF**: payment receipt in PDF format.
   - **PAYMENT_WAY_ID**: network payment of the payment type.

### Method call
The following examples show how to call the method for this transaction type according to the programming language.

{{< tabs tabTotal="2" tabID="5" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Enter the account’s identifier here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512324");
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
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.MXN.name());

// -- Buyer --
//Enter the buyer Id here.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
//Enter the buyer's name here.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer name");
//Enter the buyer's email here
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
//Enter the buyer's contact phone here.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
//Enter the buyer's contact document here.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

//Enter the buyer's address here.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "7563126");


// -- Payer --
//Enter the payer's ID here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
//Enter the payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second payer name");
//Enter the payer's email here.
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "payer_test@test.com");
//Enter the payer's contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "7563126");
//Enter the payer's contact document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "5415668464654");
// Enter the payer's birthday here
parameters.put(PayU.PARAMETERS.PAYER_BIRTH_DATE, "1994-06-21");
//Enter the payer's address here.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

//Enter the name of the cash payment here
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "OXXO");

// Enter the name of the country here.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.MX.name());

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
		String bankRef = (String)extraParameters.get("BANK_REFERENCED_CODE");
    String barCode = (String)extraParameters.get("BAR_CODE");
    Date date = (Date)extraParameters.get("EXPIRATION_DATE");
    int reference = (Integer)extraParameters.get("REFERENCE");
		String pdf = (String)extraParameters.get("URL_PAYMENT_RECEIPT_PDF");
    String url = (String)extraParameters.get("URL_PAYMENT_RECEIPT_HTML");
    String paymentWay = (String)extraParameters.get("PAYMENT_WAY_ID");
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
	PayUParameters::ACCOUNT_ID => "512324",
	// Enter the reference code here.
	PayUParameters::REFERENCE_CODE => $reference,
	// Enter the description here.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Values --
        // Enter the value here.
	PayUParameters::VALUE => $value,
	// Enter the currency here.
	PayUParameters::CURRENCY => "MXN",

	// -- Buyer --
	//Enter the buyer Id here.
	PayUParameters::BUYER_ID => "1",
	//Enter the buyer's name here.
	PayUParameters::BUYER_NAME => "First name and second buyer name",
	//Enter the buyer's email here.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	//Enter the buyer's contact phone here.
	PayUParameters::BUYER_CONTACT_PHONE => "7563126",
	//Enter the buyer's contact document here.
	PayUParameters::BUYER_DNI => "5415668464654",
	//Enter the buyer's address here.
	PayUParameters::BUYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Cuernavaca",
	PayUParameters::BUYER_STATE => "Morelos",
	PayUParameters::BUYER_COUNTRY => "MX",
	PayUParameters::BUYER_POSTAL_CODE => "000000",
	PayUParameters::BUYER_PHONE => "7563126",


	// -- Payer --
	//Enter the payer's ID here.
	PayUParameters::PARAMETERS.PAYER_ID => "1",
        ///Enter the payer's name here
	PayUParameters::PAYER_NAME => "First name and second payer name",
	//Enter the payer's email here
	PayUParameters::PAYER_EMAIL => "payer_test@test.com",
	//Enter the payer's contact phone here.
	PayUParameters::PAYER_CONTACT_PHONE => "7563126",
	//Enter the payer's contact document here.
	PayUParameters::PAYER_DNI => "5415668464654",
	// Enter the payer's birthday here
  PayUParameters::PAYER_BIRTH_DATE => "1994-06-21"),
	//Enter the payer's address here.
	PayUParameters::PAYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "Cuernavaca",
	PayUParameters::PAYER_STATE => "Morelos",
	PayUParameters::PAYER_COUNTRY => "MX",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	//Enter the name of the cash payment here
	PayUParameters::PAYMENT_METHOD => "OXXO",

	// Enter the name of the country here.
	PayUParameters::COUNTRY => PayUCountries::MX,

	// Enter the payment due date
	PayUParameters::PARAMETERS.EXPIRATION_DATE => "2021-07-01T20:00:00",
  
	// Payer IP
	PayUParameters::IP_ADDRESS => "127.0.0.1"
	);

// "Authorization and Capture" request
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
		$response->transactionResponse->extraParameters->BANK_REFERENCED_CODE;
    $response->transactionResponse->extraParameters->BAR_CODE;
    $response->transactionResponse->extraParameters->EXPIRATION_DATE;
    $response->transactionResponse->extraParameters->REFERENCE;
    $response->transactionResponse->extraParameters->URL_PAYMENT_RECEIPT_PDF;
		$response->transactionResponse->extraParameters->URL_PAYMENT_RECEIPT_HTML;
    $response->transactionResponse->extraParameters->PAYMENT_WAY_ID;
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

## Submit transaction with bank transfer
This method lets you process the bank transfer payments of your customers. When using this payment method, the payer performs a bank transfer from their bank account to a PayU's CLABE account.<br>
To integrate with these transactions, you must redirect the customer to the URL found in the response of the method.

<img src="/assets/Payments/BankTransferReceiptMX.png" alt="PrintScreen" width="50%">

### Considerations
* The parameter `EXPIRATION_DATE` is not mandatory. If you don't send this parameter, its default value for is seven (7) days after the current date.
* When the payer selects this payment method, PayU creates an order in _in progress_ state and a transaction in `PENDING`state.
* To perform the payment, the payer must log in the virtual branch of their bank (The bank must appear in the list of SPEI available banks). <br>First, the payer must register the PayU CLABE account in their bank branch. Once the PayU CLABE account is enable to perform transfers, the payer must provide the reference returned by PayU in the parameter `trazabilityCode` and the amount as returned by PayU in their virtual branch.
* In the response body, you can find the needed variables to generate the payment receipt (voucher) and the URL of the receipt generated by PayU in HTML and PDF format. If you want to generate the voucher, use the following variables:
  - **trazabilityCode**: unique identifier of maximum 7 digits long; corresponds to the payment reference that the payer must provide in the virtual branch. It is mandatory to enter the same value in the reference field of the bank branch so the payment can be successful.
  - **value**: the payer must enter as transfer amount the same value informed in the request, so the payment can be successful.
  - **SPEI_CLABE_ACCOUNT_NUMBER**: is the PayU's interbank CLABE, namely, the account where the amount will be transferred. The payer must register this CLABE as beneficiary in their bank branch before performing the transfer.
  - **SPEI_BANK_NAME**: name associated with the PayU CLABE account. The beneficiary account is associated with the STP bank and it's always the same bank for PayU.

### Method call
The following examples show how to call the method for this transaction type according to the programming language.

{{< tabs tabTotal="2" tabID="6" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Enter the account’s identifier here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512324");
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
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.MXN.name());

// -- Buyer --
//Enter the buyer Id here.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
//Enter the buyer's name here.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer name");
//Enter the buyer's email here
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
//Enter the buyer's contact phone here.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
//Enter the buyer's contact document here.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

//Enter the buyer's address here.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "7563126");


// -- Payer --
//Enter the payer's ID here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
//Enter the payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second payer name");
//Enter the payer's email here.
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "payer_test@test.com");
//Enter the payer's contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "7563126");
//Enter the payer's contact document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "5415668464654");
// Enter the payer's birthday here
parameters.put(PayU.PARAMETERS.PAYER_BIRTH_DATE, "1994-06-21");
//Enter the payer's address here.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

//Enter the name of the cash payment here
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "SPEI");

// Enter the name of the country here.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.MX.name());

// Enter the payment due date
parameters.put(PayU.PARAMETERS.EXPIRATION_DATE, "2021-07-01T20:00:00");

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
  if(response.getState().equals(TransactionState.PENDING)){
		response.getPendingReason();
		Map extraParameters = response.getExtraParameters();

		// Obtain the payment receipt URL
		String bankRef = (String)extraParameters.get("BANK_REFERENCED_CODE");
		Date date = (Date)extraParameters.get("EXPIRATION_DATE");
		String speiBankName = (String)extraParameters.get("SPEI_BANK_NAME");
		String pdf = (String)extraParameters.get("URL_PAYMENT_RECEIPT_PDF");
		String speiCLABE = (String)extraParameters.get("SPEI_CLABE_ACCOUNT_NUMBER");
		String url = (String)extraParameters.get("URL_PAYMENT_RECEIPT_HTML");
		String paymentWay = (String)extraParameters.get("PAYMENT_WAY_ID");
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
	PayUParameters::ACCOUNT_ID => "512324",
	// Enter the reference code here.
	PayUParameters::REFERENCE_CODE => $reference,
	// Enter the description here.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Values --
        // Enter the value here.
	PayUParameters::VALUE => $value,
	// Enter the currency here.
	PayUParameters::CURRENCY => "MXN",

	// -- Buyer --
	//Enter the buyer Id here.
	PayUParameters::BUYER_ID => "1",
	//Enter the buyer's name here.
	PayUParameters::BUYER_NAME => "First name and second buyer name",
	//Enter the buyer's email here.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	//Enter the buyer's contact phone here.
	PayUParameters::BUYER_CONTACT_PHONE => "7563126",
	//Enter the buyer's contact document here.
	PayUParameters::BUYER_DNI => "5415668464654",
	//Enter the buyer's address here.
	PayUParameters::BUYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Cuernavaca",
	PayUParameters::BUYER_STATE => "Morelos",
	PayUParameters::BUYER_COUNTRY => "MX",
	PayUParameters::BUYER_POSTAL_CODE => "000000",
	PayUParameters::BUYER_PHONE => "7563126",


	// -- Payer --
	//Enter the payer's ID here.
	PayUParameters::PARAMETERS.PAYER_ID => "1",
        ///Enter the payer's name here
	PayUParameters::PAYER_NAME => "First name and second payer name",
	//Enter the payer's email here
	PayUParameters::PAYER_EMAIL => "payer_test@test.com",
	//Enter the payer's contact phone here.
	PayUParameters::PAYER_CONTACT_PHONE => "7563126",
	//Enter the payer's contact document here.
	PayUParameters::PAYER_DNI => "5415668464654",
	// Enter the payer's birthday here
  PayUParameters::PAYER_BIRTH_DATE => "1994-06-21"),
	//Enter the payer's address here.
	PayUParameters::PAYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "Cuernavaca",
	PayUParameters::PAYER_STATE => "Morelos",
	PayUParameters::PAYER_COUNTRY => "MX",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	//Enter the name of the cash payment here
	PayUParameters::PAYMENT_METHOD => "SPEI",

	// Enter the name of the country here.
	PayUParameters::COUNTRY => PayUCountries::MX,

	// Enter the payment due date
	PayUParameters::PARAMETERS.EXPIRATION_DATE => "2021-07-01T20:00:00",
  
	// Device Session ID
	PayUParameters::DEVICE_SESSION_ID => "vghs6tvkcle931686k1900o6e1",
	// Payer IP
	PayUParameters::IP_ADDRESS => "127.0.0.1",
	// Cookie of the current session
	PayUParameters::PAYER_COOKIE=>"pt1t38347bs6jc9ruv2ecpv7o2",
	// User agent of the current session
	PayUParameters::USER_AGENT=>"Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
	);

// "Authorization and Capture" request
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
		$response->transactionResponse->extraParameters->BANK_REFERENCED_CODE;
		$response->transactionResponse->extraParameters->EXPIRATION_DATE;
		$response->transactionResponse->extraParameters->SPEI_BANK_NAME;
		$response->transactionResponse->extraParameters->URL_PAYMENT_RECEIPT_PDF;
		$response->transactionResponse->extraParameters->SPEI_CLABE_ACCOUNT_NUMBER;
		$response->transactionResponse->extraParameters->URL_PAYMENT_RECEIPT_HTML;
		$response->transactionResponse->extraParameters->PAYMENT_WAY_ID;
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

## Submit transaction with bank reference
This method lets you process payments of your customers using bank references. To integrate with these transactions, you must redirect the customer to the URL found in the response of the method.

<img src="/assets/Payments/BankReferenceReceiptMX.png" alt="PrintScreen" width="50%">

### Considerations
* The parameter `EXPIRATION_DATE` is not mandatory. If you don't send this parameter, its default value for is seven (7) days after the current date.
* The extra parameters has the following data related to the transaction:
   - **REFERENCE**: internal payment reference generated by PayU.
   - **EXPIRATION_DATE**: maximum term for the payer to perform the payment.
   - **BAR_CODE**: barcode which lets the payer perform the payment. 
   - **URL_PAYMENT_RECEIPT_HTML**: payment receipt in HTML format. This is where you need to redirect the payment when the payer selects bank reference payment. 
   - **URL_PAYMENT_RECEIPT_PDF**: payment receipt in PDF format.

### Method call
The following are the bodies of the request and response of this payment method.

{{< tabs tabTotal="2" tabID="7" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Enter the account’s identifier here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512324");
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
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.MXN.name());

// -- Buyer --
//Enter the buyer Id here.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
//Enter the buyer's name here.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer name");
//Enter the buyer's email here
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
//Enter the buyer's contact phone here.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
//Enter the buyer's contact document here.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

//Enter the buyer's address here.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "7563126");


// -- Payer --
//Enter the payer's ID here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
//Enter the payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second payer name");
//Enter the payer's email here.
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "payer_test@test.com");
//Enter the payer's contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "7563126");
//Enter the payer's contact document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "5415668464654");
// Enter the payer's birthday here
parameters.put(PayU.PARAMETERS.PAYER_BIRTH_DATE, "1994-06-21");
//Enter the payer's address here.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

//Enter the name of the cash payment here
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "BANK_REFERENCED");

// Enter the name of the country here.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.MX.name());

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
		int reference = (Integer)extraParameters.get("REFERENCE");
    String pdf = (String)extraParameters.get("URL_PAYMENT_RECEIPT_PDF");
    Date date = (Date)extraParameters.get("EXPIRATION_DATE");
    String barCode = (String)extraParameters.get("BAR_CODE");
    String url = (String)extraParameters.get("URL_PAYMENT_RECEIPT_HTML");
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
	PayUParameters::ACCOUNT_ID => "512324",
	// Enter the reference code here.
	PayUParameters::REFERENCE_CODE => $reference,
	// Enter the description here.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Values --
        // Enter the value here.
	PayUParameters::VALUE => $value,
	// Enter the currency here.
	PayUParameters::CURRENCY => "MXN",

	// -- Buyer --
	//Enter the buyer Id here.
	PayUParameters::BUYER_ID => "1",
	//Enter the buyer's name here.
	PayUParameters::BUYER_NAME => "First name and second buyer name",
	//Enter the buyer's email here.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	//Enter the buyer's contact phone here.
	PayUParameters::BUYER_CONTACT_PHONE => "7563126",
	//Enter the buyer's contact document here.
	PayUParameters::BUYER_DNI => "5415668464654",
	//Enter the buyer's address here.
	PayUParameters::BUYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Cuernavaca",
	PayUParameters::BUYER_STATE => "Morelos",
	PayUParameters::BUYER_COUNTRY => "MX",
	PayUParameters::BUYER_POSTAL_CODE => "000000",
	PayUParameters::BUYER_PHONE => "7563126",


	// -- Payer --
	//Enter the payer's ID here.
	PayUParameters::PARAMETERS.PAYER_ID => "1",
        ///Enter the payer's name here
	PayUParameters::PAYER_NAME => "First name and second payer name",
	//Enter the payer's email here
	PayUParameters::PAYER_EMAIL => "payer_test@test.com",
	//Enter the payer's contact phone here.
	PayUParameters::PAYER_CONTACT_PHONE => "7563126",
	//Enter the payer's contact document here.
	PayUParameters::PAYER_DNI => "5415668464654",
	// Enter the payer's birthday here
  PayUParameters::PAYER_BIRTH_DATE => "1994-06-21"),
	//Enter the payer's address here.
	PayUParameters::PAYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "Cuernavaca",
	PayUParameters::PAYER_STATE => "Morelos",
	PayUParameters::PAYER_COUNTRY => "MX",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	//Enter the name of the cash payment here
	PayUParameters::PAYMENT_METHOD => "BANK_REFERENCED",

	// Enter the name of the country here.
	PayUParameters::COUNTRY => PayUCountries::MX,

	// Enter the payment due date
	PayUParameters::PARAMETERS.EXPIRATION_DATE => "2021-07-01T20:00:00",
  
	// Payer IP
	PayUParameters::IP_ADDRESS => "127.0.0.1"
	);

// "Authorization and Capture" request
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
    $response->transactionResponse->extraParameters->REFERENCE;
    $response->transactionResponse->extraParameters->URL_PAYMENT_RECEIPT_PDF;
    $response->transactionResponse->extraParameters->EXPIRATION_DATE;
    $response->transactionResponse->extraParameters->BAR_CODE;
		$response->transactionResponse->extraParameters->URL_PAYMENT_RECEIPT_HTML;
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

{{< tabs tabTotal="2" tabID="8" tabName1="Java" tabName2="PHP" >}}
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

{{< tabs tabTotal="2" tabID="9" tabName1="Java" tabName2="PHP" >}}
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