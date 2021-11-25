---
title: "Payments SDK - Brasil"
linkTitle: "Payments SDK - Brasil"
date: 2021-05-03T15:48:08-05:00
description: >
  Payments SDK Brazil permite que sua loja processe diferentes tipos de transações com vários métodos de pagamento.
weight: 20
tags: ["subtopic"]
---

To integrate with Payments SDK Brazil, target the requests to the following URLs:

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

* [Enviar transação com cartão de crédito]({{< ref "Payments-SDK-Brazil.md#submit-transaction-with-credit-cards" >}})
* [Enviar transação em dinheiro]({{< ref "Payments-SDK-Brazil.md#submit-transaction-with-cash" >}})
* [Consulta de métodos de pagamento disponíveis]({{< ref "Payments-SDK-Brazil.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-SDK-Brazil.md#ping" >}})

{{% alert title="Observação" color="info"%}}
To confirm the status of a transaction, você pode usar the [Consultas SDK]({{< ref "QueriesSDK.md" >}}).
{{% /alert %}}

## Enviar transação com cartão de crédito {#submit-transaction-with-credit-cards}
Este método permite processar os pagamentos efetuados com cartão de crédito pelos seus clientes. Para o Brasil, você pode executar os fluxos de duas etapas, você pode executar os fluxos de duas etapas (**Autorização**, **Captura**) e fluxos de uma etapa (**Cobrança**). Para obter mais informações, consulte [Fluxos de pagamento]({{< ref "payments.md#payment-flows" >}}).

### Observações {#considerations}
* Send a valid Credit card Método de pagamento in the request, [see the available Payment Methods para o Brasil]({{< ref "select-your-payment-method.html#Brazil" >}}).
* For payments with credit card tokens, set the parameters `TOKEN_ID` e `CREDIT_CARD_SECURITY_CODE` (se processar com código de segurança) substituindo as informações do cartão de crédito. Para obter mais informações, consulte [Tokenization SDK]({{< ref "TokenizationSDK.md" >}}).
* Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas. After this feature is enabled for you, set the parameter `PROCESS_WITHOUT_CVV2` as true and remove the parameter `CREDIT_CARD_SECURITY_CODE`.
* O parâmetro extra  `CIELO_TID` identifica a transação. Este parâmetro é necessário quando você deseja processar cancelamentos.

### Autorização {#authorization}
Use este método para executar a etapa **Autorização** de um fluxo de duas etapas. Nesta etapa, você autoriza o pagamento, mas o valor não é debitado até você [capturar]({{< ref "payments-sdk-brazil.md#capture" >}}) os fundos.<br>The following examples shows how to call the method for this transaction type according to the programming language.

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
// Enter the buyer Id here.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
// Enter the buyer's name here.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer name");
// Enter the buyer's e-mail here
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
// Enter the buyer's contact phone here.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "(11)756312633");
// Enter the buyer's contact document here.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "811.807.405-64");
// Enter the buyer's CNPJ.
parameters.put(PayU.PARAMETERS.BUYER_CNPJ, "32593371000110");

// Enter the buyer's address here.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Quadra QNP 34 Conjunto G 780");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Manaos");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "SP");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "BR");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "10012545");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "(11)756312633");

// -- Payer --
// Enter the payer Id here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
// Enter the Payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second buyer name");
// Enter the Payer's e-mail here
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "buyer_test@test.com");
// Enter the Payer's contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "(11)756312633");
// Enter the Payer's contact document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "811.807.405-64");
// Enter the Payer's CNPJ.
parameters.put(PayU.PARAMETERS.PAYER_CNPJ, "32593371000110");

// Enter the Payer's address here.
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
// Enter the security code of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "777");
// Enter the name of the credit card here
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
	// Enter the buyer Id here.
	PayUParameters::BUYER_ID => "1",
	// Enter the buyer's name here.
	PayUParameters::BUYER_NAME => "First name and second buyer  name",
	// Enter the buyer's e-mail here.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	// Enter the buyer's contact phone here.
	PayUParameters::BUYER_CONTACT_PHONE => "(11)756312633",
	// Enter the buyer's contact document here.
	PayUParameters::BUYER_DNI => "811.807.405-64",
  // Enter the buyer's CNPJ.
	PayUParameters::BUYER_CNPJ => "32593371000110",
	// Enter the buyer's address here.
	PayUParameters::BUYER_STREET => "Quadra QNP 34 Conjunto G 780",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Manaos",
	PayUParameters::BUYER_STATE => "SP",
	PayUParameters::BUYER_COUNTRY => "BR",
	PayUParameters::BUYER_POSTAL_CODE => "10012545",
	PayUParameters::BUYER_PHONE => "(11)756312633",

  // -- Payer --
  // Enter the payer Id here.
  PayUParameters::PAYER_ID => "1",
  // Enter the Payer's name here.
  PayUParameters::PAYER_NAME => "First name and second buyer name",
  // Enter the Payer's e-mail here
  PayUParameters::PAYER_EMAIL => "buyer_test@test.com",
  // Enter the Payer's contact phone here.
  PayUParameters::PAYER_CONTACT_PHONE => "(11)756312633",
  // Enter the Payer's contact document here.
  PayUParameters::PAYER_DNI => "811.807.405-64",
  // Enter the Payer's CNPJ.
  PayUParameters::PAYER_CNPJ => "32593371000110",

  // Enter the Payer's address here.
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
	// Enter the security code of the credit card here
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "777",
	// Enter the name of the credit card here
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
Use este método para executar a etapa **Captura** de um fluxo de duas etapas. Nesta etapa, você captura os fundos [Autorizados]({{< ref "payments-sdk-brazil.md#authorization" >}}) anteriormente para transferi-los para sua conta PayU.

#### Observações {#considerations}
Leve em conta as seguintes informações para captura.
* O tempo máximo para capturar uma transação aprovada é de sete (7) dias. Após este período, a transação é cancelada.
* Apenas os parâmetros exibidos no corpo da solicitação são obrigatórios para invocar uma transação de Captura. Lembre-se de que os IDs da ordem e da transação devem corresponder a uma transação atualmente autorizada.

The following examples show how to call the method for this transaction type according to the programming language.

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

// Enter the order identifier here.
parameters.put(PayU.PARAMETERS.ORDER_ID, "1400434770");
// Enter the transaction identifier here.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "79de715b-fe77-401e-8b18-241820afb375");
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
	PayUParameters::ORDER_ID => "1400434770",
	// Enter the transaction identifier here.
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

### Cobrança {#charge}
Use este método para executar um fluxo de uma etapa, ou seja, uma cobrança. Neste momento, as duas etapas do fluxo são combinadas em uma só transação, e os fundos são transferidos da conta do cliente para sua conta PayU, uma vez que tenham sido aprovados:

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
// Enter the buyer Id here.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
// Enter the buyer's name here.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer name");
// Enter the buyer's e-mail here
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
// Enter the buyer's contact phone here.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "(11)756312633");
// Enter the buyer's contact document here.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "811.807.405-64");
// Enter the buyer's CNPJ.
parameters.put(PayU.PARAMETERS.BUYER_CNPJ, "32593371000110");

// Enter the buyer's address here.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Quadra QNP 34 Conjunto G 780");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Manaos");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "SP");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "BR");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "10012545");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "(11)756312633");

// -- Payer --
// Enter the payer Id here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
// Enter the Payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second buyer name");
// Enter the Payer's e-mail here
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "buyer_test@test.com");
// Enter the Payer's contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "(11)756312633");
// Enter the Payer's contact document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "811.807.405-64");
// Enter the Payer's CNPJ.
parameters.put(PayU.PARAMETERS.PAYER_CNPJ, "32593371000110");

// Enter the Payer's address here.
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
// Enter the security code of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "777");
// Enter the name of the credit card here
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
	// Enter the buyer Id here.
	PayUParameters::BUYER_ID => "1",
	// Enter the buyer's name here.
	PayUParameters::BUYER_NAME => "First name and second buyer  name",
	// Enter the buyer's e-mail here.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	// Enter the buyer's contact phone here.
	PayUParameters::BUYER_CONTACT_PHONE => "(11)756312633",
	// Enter the buyer's contact document here.
	PayUParameters::BUYER_DNI => "811.807.405-64",
  // Enter the buyer's CNPJ.
	PayUParameters::BUYER_CNPJ => "32593371000110",
	// Enter the buyer's address here.
	PayUParameters::BUYER_STREET => "Quadra QNP 34 Conjunto G 780",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Manaos",
	PayUParameters::BUYER_STATE => "SP",
	PayUParameters::BUYER_COUNTRY => "BR",
	PayUParameters::BUYER_POSTAL_CODE => "10012545",
	PayUParameters::BUYER_PHONE => "(11)756312633",

  // -- Payer --
  // Enter the payer Id here.
  PayUParameters::PAYER_ID => "1",
  // Enter the Payer's name here.
  PayUParameters::PAYER_NAME => "First name and second buyer name",
  // Enter the Payer's e-mail here
  PayUParameters::PAYER_EMAIL => "buyer_test@test.com",
  // Enter the Payer's contact phone here.
  PayUParameters::PAYER_CONTACT_PHONE => "(11)756312633",
  // Enter the Payer's contact document here.
  PayUParameters::PAYER_DNI => "811.807.405-64",
  // Enter the Payer's CNPJ.
  PayUParameters::PAYER_CNPJ => "32593371000110",

  // Enter the Payer's address here.
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
	// Enter the security code of the credit card here
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "777",
	// Enter the name of the credit card here
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

// Autorização request
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

<img src="/assets/Payments/CashReceiptBR.png" alt="PrintScreen" width="50%">

### Observações {#considerations}
* Send a valid cash Método de pagamento in the request, [see the available Payment Methods para o Brasil]({{< ref "select-your-payment-method.html#Brazil" >}}).
* O parâmetro `EXPIRATION_DATE` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de 7 dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* O pagamento aparece no próximo dia útil.
* The response returns the following extra parameters related to the transaction
   - **URL_PAYMENT_RECEIPT_HTML**: comprovante de pagamento em formato HTML. É para cá que você precisa redirecionar o pagamento quando o pagador seleciona o pagamento em dinheiro. 
   - **URL_BOLETO_BANCARIO**: comprovante de pagamento em formato printable format.
   - **EXPIRATION_DATE**: prazo máximo para o pagador fazer o pagamento.
   - **BAR_CODE**: código de barras que permite ao pagador efetuar o pagamento. 

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
// Enter the buyer Id here.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
// Enter the buyer's name here.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer  name");
// Enter the buyer's e-mail here
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
// Enter the buyer's contact phone here.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "(11)756312633");
// Enter the buyer's contact document here.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "811.807.405-64");
// Enter the buyer's CNPJ.
parameters.put(PayU.PARAMETERS.BUYER_CNPJ, "32593371000110");

// Enter the buyer's address here.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Quadra QNP 34 Conjunto G 780");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Manaos");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "SP");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "BR");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "10012545");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "(11)756312633");

// -- Payer --
// Enter the payer Id here.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
// Enter the Payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second buyer name");
// Enter the Payer's e-mail here
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "buyer_test@test.com");
// Enter the Payer's contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "(11)756312633");
// Enter the Payer's contact document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "811.807.405-64");
// Enter the Payer's CNPJ.
parameters.put(PayU.PARAMETERS.PAYER_CNPJ, "32593371000110");

// Enter the Payer's address here.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Quadra QNP 34 Conjunto G 780");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Manaos");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "SP");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "BR");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "10012545");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "(11)756312633");

// Enter the cash payment method name here.
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "BOLETO_BANCARIO");

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
	// Enter the account’s identifier here
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
	// Enter the buyer Id here.
	PayUParameters::BUYER_ID => "1",
	// Enter the buyer's name here.
	PayUParameters::BUYER_NAME => "First name and second buyer  name",
	// Enter the buyer's e-mail here.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	// Enter the buyer's contact phone here.
	PayUParameters::BUYER_CONTACT_PHONE => "(11)756312633",
	// Enter the buyer's contact document here.
	PayUParameters::BUYER_DNI => "811.807.405-64",
  // Enter the buyer's CNPJ.
	PayUParameters::BUYER_CNPJ => "32593371000110",
	// Enter the buyer's address here.
	PayUParameters::BUYER_STREET => "Quadra QNP 34 Conjunto G 780",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Manaos",
	PayUParameters::BUYER_STATE => "SP",
	PayUParameters::BUYER_COUNTRY => "BR",
	PayUParameters::BUYER_POSTAL_CODE => "10012545",
	PayUParameters::BUYER_PHONE => "(11)756312633",

  // -- Payer --
  // Enter the payer Id here.
  PayUParameters::PAYER_ID => "1",
  // Enter the Payer's name here.
  PayUParameters::PAYER_NAME => "First name and second buyer name",
  // Enter the Payer's e-mail here
  PayUParameters::PAYER_EMAIL => "buyer_test@test.com",
  // Enter the Payer's contact phone here.
  PayUParameters::PAYER_CONTACT_PHONE => "(11)756312633",
  // Enter the Payer's contact document here.
  PayUParameters::PAYER_DNI => "811.807.405-64",
  // Enter the Payer's CNPJ.
  PayUParameters::PAYER_CNPJ => "32593371000110",

  // Enter the Payer's address here.
  PayUParameters::PAYER_STREET => "Quadra QNP 34 Conjunto G 780",
  PayUParameters::PAYER_STREET_2 => "5555487",
  PayUParameters::PAYER_CITY => "Manaos",
  PayUParameters::PAYER_STATE => "SP",
  PayUParameters::PAYER_COUNTRY => "BR",
  PayUParameters::PAYER_POSTAL_CODE => "10012545",
  PayUParameters::PAYER_PHONE => "(11)756312633",

	// Enter the cash payment method name here.
	PayUParameters::PAYMENT_METHOD => "BOLETO_BANCARIO",

  // Enter the payment due date
	PayUParameters::PARAMETERS.EXPIRATION_DATE => "2021-07-01T20:00:00",

	// Enter the name of the country here.
	PayUParameters::COUNTRY => PayUCountries::BR,

	// Payer IP
	PayUParameters::IP_ADDRESS => "127.0.0.1"
	);

// Autorização request
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

## Consulta de métodos de pagamento disponíveis {#available-payment-methods-query}
Este método gera uma lista dos métodos de pagamento disponíveis em todos os países.

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
O método `PING` permite que você confirme a conexão com a nossa plataforma.

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

