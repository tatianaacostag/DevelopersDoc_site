---
title: "Payments SDK - Panama"
linkTitle: "Payments SDK - Panama"
date: 2021-05-03T15:48:08-05:00
description: >
  Payments SDK Panama lets your shop process different transaction types with multiple payment methods.
weight: 60
tags: ["subtopic"]
draft: true
---

To integrate with Payments SDK Panama, target the requests to the following URLs:

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

* [Submit transaction with credit card]({{< ref "Payments-SDK-Panama.md#submit-transaction-with-credit-cards" >}})
* [Available payment methods query]({{< ref "Payments-SDK-Panama.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-SDK-Panama.md#ping" >}})

{{% alert title="Note" color="info"%}}
To confirm the status of a transaction, you can use the [Queries SDK]({{< ref "QueriesSDK.md" >}}).
{{% /alert %}}

### Considerations
* Payments SDK Panama is only available for Mastercard.
* For payments with credit card tokens, include the parameters `TOKEN_ID` and `CREDIT_CARD_SECURITY_CODE` replacing the information of the credit card (if you process with security code). For more information, refer to [Tokenization API]({{< ref "Tokenization-API.md" >}}).
* By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative. After this feature is enabled for you, send in the request the variable `PROCESS_WITHOUT_CVV2` as true and remove the variable `CREDIT_CARD_SECURITY_CODE`.

### Method call
The following examples show how to call the method for this transaction type according to the programming language. 

{{< tabs tabTotal="2" tabID="1" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "100";

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
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.USD.name());

// -- Buyer --
//Enter the buyer Id here.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
//Enter the buyer's name here.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer name");
//Enter the buyer's e-mail here
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
//Enter the buyer's contact phone here.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
//Enter the buyer's contact document here.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

//Enter the buyer's address here.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "RM");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Talagante");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CL");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "7563126");


// -- Payer --
//Enter the payer's ID here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
//Enter the payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second payer name");
//Enter the payer's e-mail here.
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "payer_test@test.com");
//Enter the payer's contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "7563126");
//Enter the payer's contact document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "5415668464654");
//Enter the payer's address here.
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
//Enter the security code of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "321");
//Enter the name of the credit card here
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

```
{{< /tab >}}
{{< /tabs >}}

## Available payment methods query
This method returns a list of the payment methods available in all countries.

### Method call
The following examples show how to call the method for this transaction type according to the programming language. 

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
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

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
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