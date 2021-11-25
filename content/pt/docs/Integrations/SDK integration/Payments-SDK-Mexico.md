---
title: "Payments SDK - México"
linkTitle: "Payments SDK - México"
date: 2021-05-03T15:48:08-05:00
description: >
  Payments SDK Mexico permite que sua loja processe diferentes tipos de transações com vários métodos de pagamento.
weight: 50
tags: ["subtopic"]
---

To integrate with Payments SDK Mexico, target the requests to the following URLs:

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

## Métodos disponíveis {#available-methods}
Payments SDK includes the following methods:

* [Enviar transação com cartão de crédito]({{< ref "Payments-SDK-Mexico.md#submit-transaction-with-credit-card" >}})
* [Enviar transação em dinheiro]({{< ref "Payments-SDK-Mexico.md#submit-transaction-with-cash" >}})
* [Enviar transação com transferência bancária]({{< ref "Payments-SDK-Mexico.md#submit-transaction-with-bank-transfer" >}})
* [Enviar a transação com referência do banco]({{< ref "Payments-SDK-Mexico.md#submit-transaction-with-bank-reference" >}})
* [Consulta de métodos de pagamento disponíveis]({{< ref "Payments-SDK-Mexico.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-SDK-Mexico.md#ping" >}})

{{% alert title="Observação" color="info"%}}
To confirm the status of a transaction, você pode usar the [Consultas SDK]({{< ref "QueriesSDK.md" >}}).
{{% /alert %}}

## Enviar transação com cartão de crédito {#submit-transaction-with-credit-cards}
Este método permite processar os pagamentos efetuados com cartão de crédito pelos seus clientes. For Mexico, você pode executar os fluxos de duas etapas, você pode executar os fluxos de duas etapas (**Autorização**, **Captura**) e fluxos de uma etapa (**Cobrança**). Para obter mais informações, consulte [Fluxos de pagamento]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Observação" color="info"%}}
Two-step flows are only supported for Mastercard and Visa.
{{% /alert %}}

### Observações {#considerations}
* Send a valid credit card Método de pagamento in the request, [see the available Payment Methods para o México]({{< ref "select-your-payment-method.html#Mexico" >}}).
* Para pagamentos com Promoções, envie os parâmetros `INSTALLMENTS_NUMBER` e `PROMOTION_ID` com o número de parcelas selecionadas e o ID da promoção. Consultar a [API de promoções]({{< ref "Promotions.md" >}}) para obter mais informações.
* When using promotions ou apply installments, always display the phrase **"PAGOS DIFERIDOS"** during the payment process.
* When installments applied (fees assumed by the payer), display the original amount da transação, the total amount after the fees, the number of installments e the amount per installment including the extra fee.
* O recurso de promoções está disponível apenas para [fluxos de uma etapa]({{< ref "Payments.md#payment-flows" >}}).
* For payments with credit card tokens, set the parameters `TOKEN_ID` e `CREDIT_CARD_SECURITY_CODE` (se processar com código de segurança) substituindo as informações do cartão de crédito. Para obter mais informações, consulte [Tokenization SDK]({{< ref "TokenizationSDK.md" >}}).
* Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas. After this feature is enabled for you, set the parameter `PROCESS_WITHOUT_CVV2` as true and remove the parameter `CREDIT_CARD_SECURITY_CODE`.

### Autorização {#authorization}
Use este método para executar a etapa **Autorização** step of a two-step flow using Mastercard ou Visa. Nesta etapa, você autoriza o pagamento, mas o valor não é debitado até você [capturar]({{< ref "payments-sdk-mexico.md#capture" >}}) os fundos.<br>The following examples show how to call the method for this transaction type according to the programming language. 

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
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "MX");
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
// Enter the payer's birthday here
parameters.put(PayU.PARAMETERS.PAYER_BIRTH_DATE, "1994-06-21");
// Enter the payer's address here.
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
// Enter the security code of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "321");
// Enter the name of the credit card here
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

// Autorização request
TransactionResponse response = PayUPayments.doAuthorization(parameters);

// You can obtain the properties na resposta
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
	PayUParameters::BUYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Cuernavaca",
	PayUParameters::BUYER_STATE => "Morelos",
	PayUParameters::BUYER_COUNTRY => "MX",
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
	// Enter the payer's birthday here
  PayUParameters::PAYER_BIRTH_DATE => "1994-06-21"),
	// Enter the payer's address here.
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
	// Enter the security code of the credit card here
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "321",
	// Enter the name of the credit card here
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

// Autorização request
$response = PayUPayments::doAuthorization($parameters);

// You can obtain the properties na resposta
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
Use este método para executar a etapa **Captura** step of a two-step flow for Mastercard and Visa. Nesta etapa, você captura os fundos [Autorizados]({{< ref "payments-sdk-mexico.md#authorization" >}}) anteriormente para transferi-los para sua conta PayU.

#### Observações {#considerations}
Leve em conta as seguintes informações para captura.
* O tempo máximo para capturar uma transação aprovada é de 30 dias. Após este período, a transação é automaticamente cancelada.
* Apenas os parâmetros exibidos no corpo da solicitação são obrigatórios para invocar uma transação de Captura. Lembre-se de que os IDs da ordem e da transação devem corresponder a uma transação atualmente autorizada.

The following examples show how to call the method for this transaction type according to the programming language. 

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

// Enter the order identifier here.
parameters.put(PayU.PARAMETERS.ORDER_ID, "1400469033");
// Enter the transaction identifier here.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "f432b9ba-a692-4350-b8c6-2348e1e21a6c");
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
	PayUParameters::ACCOUNT_ID => "512324",
	// Enter the order identifier here.
	PayUParameters::ORDER_ID => "1400469033",
	// Enter the transaction identifier here.
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

### Cobrança {#charge}
Use este método para executar um fluxo de uma etapa, ou seja, uma cobrança. Neste momento, as duas etapas do fluxo são combinadas em uma só transação, e os fundos são transferidos da conta do cliente para sua conta PayU, uma vez que tenham sido aprovados:

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
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "MX");
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
// Enter the payer's birthday here
parameters.put(PayU.PARAMETERS.PAYER_BIRTH_DATE, "1994-06-21");
// Enter the payer's address here.
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
// Enter the security code of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "321");
// Enter the name of the credit card here
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

// Autorização request
TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);

// You can obtain the properties na resposta
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
	PayUParameters::BUYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Cuernavaca",
	PayUParameters::BUYER_STATE => "Morelos",
	PayUParameters::BUYER_COUNTRY => "MX",
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
	// Enter the payer's birthday here
  PayUParameters::PAYER_BIRTH_DATE => "1994-06-21"),
	// Enter the payer's address here.
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
	// Enter the security code of the credit card here
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "321",
	// Enter the name of the credit card here
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

// "Autorização and Captura" request
$response = PayUPayments::doAuthorizationAndCapture($parameters);

// You can obtain the properties na resposta
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

## Enviar transação em dinheiro {#submit-transaction-with-cash}
Este método permite processar os pagamentos de seus clientes em dinheiro. Para integrar com transações em dinheiro, você deve redirecionar o cliente para a URL encontrada na resposta do método; Seu cliente verá um recibo de pagamento como este.

<img src="/assets/Payments/CashReceiptMX.png" alt="PrintScreen" width="50%">

### Observações {#considerations}
* Send a valid cash Método de pagamento in the request, [see the available Payment Methods para o México]({{< ref "select-your-payment-method.html#Mexico" >}}).
* O parâmetro `EXPIRATION_DATE` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de 7 dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* Quando o método de pagamento é `OXXO`, a confirmação do pagamento será feita um dia após o pagamento. Para outros métodos de pagamento em dinheiro, a confirmação é feita online.
* The extra parameters has the following data related to the transaction:
   - **BANK_REFERENCED_CODE**: payment type.
   - **EXPIRATION_DATE**: prazo máximo para o pagador fazer o pagamento.
   - **BAR_CODE**: código de barras que permite ao pagador efetuar o pagamento.
   - **REFERENCE**: referência interna de pagamento gerada pelo PayU. 
   - **URL_PAYMENT_RECEIPT_HTML**: comprovante de pagamento em formato HTML. É para cá que você precisa redirecionar o pagamento quando o pagador seleciona o pagamento em dinheiro. 
   - **URL_PAYMENT_RECEIPT_PDF**: comprovante de pagamento em formato PDF.
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
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "MX");
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
// Enter the payer's birthday here
parameters.put(PayU.PARAMETERS.PAYER_BIRTH_DATE, "1994-06-21");
// Enter the payer's address here.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// Enter the name of the cash payment here
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "OXXO");

// Enter the name of the country here.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.MX.name());

// Enter the payment due date
parameters.put(PayU.PARAMETERS.EXPIRATION_DATE, "2021-07-01T20:00:00");

// Payer IP
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");

// Autorização request
TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);

// You can obtain the properties na resposta
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
	// Enter the account’s identifier here
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
	PayUParameters::BUYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Cuernavaca",
	PayUParameters::BUYER_STATE => "Morelos",
	PayUParameters::BUYER_COUNTRY => "MX",
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
	// Enter the payer's birthday here
  PayUParameters::PAYER_BIRTH_DATE => "1994-06-21"),
	// Enter the payer's address here.
	PayUParameters::PAYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "Cuernavaca",
	PayUParameters::PAYER_STATE => "Morelos",
	PayUParameters::PAYER_COUNTRY => "MX",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// Enter the name of the cash payment here
	PayUParameters::PAYMENT_METHOD => "OXXO",

	// Enter the name of the country here.
	PayUParameters::COUNTRY => PayUCountries::MX,

	// Enter the payment due date
	PayUParameters::PARAMETERS.EXPIRATION_DATE => "2021-07-01T20:00:00",
  
	// Payer IP
	PayUParameters::IP_ADDRESS => "127.0.0.1"
	);

// "Autorização and Captura" request
$response = PayUPayments::doAuthorizationAndCapture($parameters);

// You can obtain the properties na resposta
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

## Enviar transação com transferência bancária {#submit-transaction-with-bank-transfer}
Este método permite processar os pagamentos de seus clientes por transferência bancária. Ao usar esta forma de pagamento, o pagador faz uma transferência bancária de sua conta to a PayU's CLABE account.<br>
Para se integrar a essas transações, você deve redirecionar o cliente para a URL encontrada na resposta do método.

<img src="/assets/Payments/BankTransferReceiptMX.png" alt="PrintScreen" width="50%">

### Observações {#considerations}
* O parâmetro `EXPIRATION_DATE` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de 7 dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* Quando o pagador seleciona este método de pagamento, o PayU cria uma ordem no estado _Em andamento_ e uma transação no estado `PENDING`.
* Para efetuar o pagamento, o pagador deve se cadastrar na agência virtual de seu banco (O banco deve constar na lista de bancos disponíveis no SPEI). <br>First, the payer must register the PayU CLABE account in their bank branch. Once the PayU CLABE account is enable to perform transfers, the payer must provide the reference returned by PayU in the parameter `trazabilityCode` and the amount as returned by PayU in their virtual branch.
* No corpo da resposta, você encontra as variáveis necessárias para gerar o comprovante de pagamento (voucher) e a URL do comprovante gerado pelo PayU em formato HTML e PDF. Se você deseja gerar o voucher, use as seguintes variáveis:
  - **trazabilityCode**: unique identifier of máximo 7 digits long; corresponds to the payment reference that the payer must provide in the virtual branch. It is mandatory to enter the same value in the reference field of the bank branch so the payment can be successful.
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
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "MX");
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
// Enter the payer's birthday here
parameters.put(PayU.PARAMETERS.PAYER_BIRTH_DATE, "1994-06-21");
// Enter the payer's address here.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// Enter the name of the cash payment here
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

// Autorização request
TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);

// You can obtain the properties na resposta
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
	// Enter the account’s identifier here
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
	PayUParameters::BUYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Cuernavaca",
	PayUParameters::BUYER_STATE => "Morelos",
	PayUParameters::BUYER_COUNTRY => "MX",
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
	// Enter the payer's birthday here
  PayUParameters::PAYER_BIRTH_DATE => "1994-06-21"),
	// Enter the payer's address here.
	PayUParameters::PAYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "Cuernavaca",
	PayUParameters::PAYER_STATE => "Morelos",
	PayUParameters::PAYER_COUNTRY => "MX",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// Enter the name of the cash payment here
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

// "Autorização and Captura" request
$response = PayUPayments::doAuthorizationAndCapture($parameters);

// You can obtain the properties na resposta
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

## Enviar a transação com referência do banco
Este método permite processar pagamentos de seus clientes usando referências do banco. Para se integrar a essas transações, você deve redirecionar o cliente para a URL encontrada na resposta do método.

<img src="/assets/Payments/BankReferenceReceiptMX.png" alt="PrintScreen" width="50%">

### Observações {#considerations}
* O parâmetro `EXPIRATION_DATE` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de 7 dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* The extra parameters has the following data related to the transaction:
   - **REFERENCE**: referência interna de pagamento gerada pelo PayU.
   - **EXPIRATION_DATE**: prazo máximo para o pagador fazer o pagamento.
   - **BAR_CODE**: código de barras que permite ao pagador efetuar o pagamento. 
   - **URL_PAYMENT_RECEIPT_HTML**: comprovante de pagamento em formato HTML. This is where you need to redirect the payment when the payer selects bank reference payment. 
   - **URL_PAYMENT_RECEIPT_PDF**: comprovante de pagamento em formato PDF.

### Method call
A seguir estão o corpo do pedido e da resposta deste meio de pagamento.

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
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "MX");
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
// Enter the payer's birthday here
parameters.put(PayU.PARAMETERS.PAYER_BIRTH_DATE, "1994-06-21");
// Enter the payer's address here.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// Enter the name of the cash payment here
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "BANK_REFERENCED");

// Enter the name of the country here.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.MX.name());

// Enter the payment due date
parameters.put(PayU.PARAMETERS.EXPIRATION_DATE, "2021-07-01T20:00:00");

// Payer IP
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");

// Autorização request
TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);

// You can obtain the properties na resposta
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
	// Enter the account’s identifier here
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
	PayUParameters::BUYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Cuernavaca",
	PayUParameters::BUYER_STATE => "Morelos",
	PayUParameters::BUYER_COUNTRY => "MX",
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
	// Enter the payer's birthday here
  PayUParameters::PAYER_BIRTH_DATE => "1994-06-21"),
	// Enter the payer's address here.
	PayUParameters::PAYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "Cuernavaca",
	PayUParameters::PAYER_STATE => "Morelos",
	PayUParameters::PAYER_COUNTRY => "MX",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// Enter the name of the cash payment here
	PayUParameters::PAYMENT_METHOD => "BANK_REFERENCED",

	// Enter the name of the country here.
	PayUParameters::COUNTRY => PayUCountries::MX,

	// Enter the payment due date
	PayUParameters::PARAMETERS.EXPIRATION_DATE => "2021-07-01T20:00:00",
  
	// Payer IP
	PayUParameters::IP_ADDRESS => "127.0.0.1"
	);

// "Autorização and Captura" request
$response = PayUPayments::doAuthorizationAndCapture($parameters);

// You can obtain the properties na resposta
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

## Consulta de métodos de pagamento disponíveis {#available-payment-methods-query}
Este método gera uma lista dos métodos de pagamento disponíveis em todos os países.

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
O método `PING` permite que você confirme a conexão com a nossa plataforma.

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
