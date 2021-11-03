---
title: "Tokenization SDK"
linkTitle: "Tokenization SDK"
date: 2021-03-29T08:31:38-05:00
description: >
  Tokenization SDK allows you to safely store the data of your customers' credit cards through the creation of a token. This token lets you make regular charges or implement the 1 Click payment feature, following PCI DSS (Payment Card Industry Data Security Standard) security standards to handle credit card data.
weight: 90
tags: ["subtopic"]
---

Tokenization feature is available under customized commercial agreements. For more information, contact your sales representative.

To integrate with Tokenization SDK, target your request to the following URLs according to your environment.

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
Tokenization SDK includes methods to register and remove tokens, and methods to query tokens.

For registration a removal of tokens:
* [Individual credit card registration]({{< ref "TokenizationSDK.md#individual-credit-card-registration" >}})
* [Individual token removal]({{< ref "TokenizationSDK.md#individual-token-removal" >}})
* [Query tokens]({{< ref "TokenizationSDK.md#query-tokens" >}})


## Individual credit card registration
Using this feature, you can register the information of a customer's credit card and get a token. 

### Method call
The following examples show how to call the method for this transaction type according to the programming language.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
//-- “Create Token” operation--
Map<String, String> parameters = new HashMap<String, String>();
// Enter the payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "Mary Keller");
// Enter the payer's ID here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "10");
// Enter the payer's contact document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "32144457");
// Enter the number of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4668063527597820");
// Enter the expiration date of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2024/06");
// Enter the name of the credit card here
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
	// Enter the payer's name here.
	PayUParameters::PAYER_NAME => "Mary Keller",
	// Enter the payer's ID here.
	PayUParameters::PAYER_ID => "10",
	// Enter the payer's contact document here.
	PayUParameters::PAYER_DNI => "32144457",
	// Enter the number of the credit card here
	PayUParameters::CREDIT_CARD_NUMBER => "4668063527597820",
	// Enter the expiration date of the credit card here
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2024/10",
	// Enter the name of the credit card here
	PayUParameters::PAYMENT_METHOD => "VISA"
);
	
$response = PayUTokens::create($parameters);   
if($response){
	//You can obtain the credit card token 
	$response->creditCardToken->creditCardTokenId;
}
```
{{< /tab >}}
{{< /tabs >}}

## Individual token removal
Using this feature, you can remove the token previously registered. 

### Method call
The following examples show how to call the method for this transaction type according to the programming language.

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
// -- "Delete token" operation --
Map<String, String> parameters = new HashMap<String, String>();
// Enter the ID of the payer here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "10");
// Enter the ID of the token here.
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

## Query tokens
Using this feature, you can get the information of tokenized credit cards, you can perform the query by the token number or by a date range. 

### Method call
The following examples show how to call the method for this transaction type according to the programming language.

{{< tabs tabTotal="2" tabID="6" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
// -- "Query token" operation --
Map<String, String> parameters = new HashMap<String, String>();
// -- Optional parameters --
// Enter the ID of the payer here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "10");
// Enter the ID of the token here.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "ab01ecd5-7d8f-4bee-91c1-4535d9ba282e");
// Enter the start and end date to filter in a date range.
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
// -- Optional parameters --
$parameters = array(
	// Enter the ID of the payer here.
	PayUParameters::PAYER_ID => "10",
	// Enter the ID of the token here.
	PayUParameters::TOKEN_ID => "ab01ecd5-7d8f-4bee-91c1-4535d9ba282e",
	// Enter the start and end date to filter in a date range. Optional.
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

## Payments using Tokenization
For payments with credit card tokens, include the parameter `CREDIT_CARD_SECURITY_CODE` replacing the information of the credit card. The following example shows the body of the request in a high level for a one-step flow, the details of the request are not provided.

{{% alert title="Note" color="info"%}}
To process without CVV is necessary to send the parameter `PROCESS_WITHOUT_CVV2` as true in the payment request and remove the parameter `CREDIT_CARD_SECURITY_CODE`.<br>
By default, processing credit cards without security code is not enabled. If you want to enable this feature, contact your Sales representative.
{{% /alert%}}


{{< tabs tabTotal="2" tabID="7" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Enter the account’s identifier here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, accountId);
// Enter the reference code here.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, reference);
// Enter the description here.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Enter the transaction language here.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Values --
// Enter the value here.
parameters.put(PayU.PARAMETERS.VALUE, value);
// Enter the currency here.
parameters.put(PayU.PARAMETERS.CURRENCY, currency);

// -- Buyer --
// Enter the buyer information here.
//parameters.put([...], [...]);


// -- Payer --
// Enter the payer information here.
//parameters.put([...], [...]);

// -- Credit card data --
// Enter the credit card token here
parameters.put(PayU.PARAMETERS.TOKEN_ID, "ab01ecd5-7d8f-4bee-91c1-4535d9ba282e");
// Enter the security code of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "321");
// Enter the name of the credit card here
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");

// Enter the number of installments here.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Enter the name of the country here.
parameters.put(PayU.PARAMETERS.COUNTRY, CountryName);


// Device Session ID
parameters.put(PayU.PARAMETERS.DEVICE_SESSION_ID, "vghs6tvkcle931686k1900o6e1");
// Payer IP
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
// Cookie of the current session.
parameters.put(PayU.PARAMETERS.COOKIE, "pt1t38347bs6jc9ruv2ecpv7o2");
// User agent of the current session.
parameters.put(PayU.PARAMETERS.USER_AGENT, "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0");

// "Authorization and capture" request
TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$parameters = array(
	// Enter the account’s identifier here
	PayUParameters::ACCOUNT_ID => $accountId,
	// Enter the reference code here.
	PayUParameters::REFERENCE_CODE => $reference,
	// Enter the description here.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Values --
        // Enter the value here.
	PayUParameters::VALUE => $value,
	// Enter the currency here.
	PayUParameters::CURRENCY => $currency,

	// -- Buyer --
  // Enter the buyer information here.
  //PayUParameters::[...] => [...],


  // -- Payer --
  // Enter the payer information here.
  //PayUParameters::[...] => [...],

	// -- Credit card data --
  // Enter the credit card token here
  PayUParameters::TOKEN_ID => "ab01ecd5-7d8f-4bee-91c1-4535d9ba282e",
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2022/12",
	// Enter the security code of the credit card here
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "321",
	// Enter the name of the credit card here
	PayUParameters::PAYMENT_METHOD => "VISA",

	// Enter the number of installments here.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Enter the name of the country here.
	PayUParameters::COUNTRY => $country,

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
```
{{< /tab >}}
{{< /tabs >}}
<br>

For specific details about how to perform payments, refer to the respective article according to the processing country.

<div>
  <div style="float: left;width: 50%;">
      <img src="/assets/Argentina.png" width="25px"/> <a href="{{< ref "Payments-SDK-Argentina.md" >}}">Argentina</a><br>
      <img src="/assets/Brasil.png" width="25px"/> <a href="{{< ref "Payments-SDK-Brazil.md" >}}">Brazil</a><br>
      <img src="/assets/Chile.png" width="25px"/> <a href="{{< ref "Payments-SDK-Chile.md" >}}">Chile</a><br>
    </ul>
  </div>
  <div style="float: left;width: 50%;">
    <ul>
      <img src="/assets/Colombia.png" width="25px"/> <a href="{{< ref "Payments-SDK-Colombia.md" >}}">Colombia</a><br>
      <img src="/assets/Mexico.png" width="25px"/> <a href="{{< ref "Payments-SDK-Mexico.md" >}}">Mexico</a><br>
      <img src="/assets/Peru.png" width="25px"/> <a href="{{< ref "Payments-SDK-Peru.md" >}}">Peru</a><br>
    </ul>
  </div>
</div>
<br>
<br>
<br>
