---
title: "Payments SDK - Chile"
linkTitle: "Payments SDK - Chile"
date: 2021-05-03T15:48:08-05:00
description: >
  Payments SDK Chile permite que sua loja processe diferentes tipos de transações com vários métodos de pagamento.
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

## Métodos disponíveis {#available-methods}
Payments SDK includes the following methods:

* [Enviar transação com cartão de crédito]({{< ref "Payments-SDK-Chile.md#submit-transaction-with-credit-cards" >}})
* [Consulta de métodos de pagamento disponíveis]({{< ref "Payments-SDK-Chile.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-SDK-Chile.md#ping" >}})
<!-- * [Enviar transação em dinheiro]({{< ref "Payments-SDK-Chile.md#submit-transaction-with-cash" >}}) -->

{{% alert title="Observação" color="info"%}}
To confirm the status of a transaction, você pode usar the [Consultas SDK]({{< ref "QueriesSDK.md" >}}).
{{% /alert %}}

## Enviar transação com cartão de crédito {#submit-transaction-with-credit-cards}
Este método permite processar os pagamentos efetuados com cartão de crédito pelos seus clientes. For Chile, você pode executar os fluxos de duas etapas, você pode executar os fluxos de duas etapas (**Autorização**, **Captura**) e fluxos de uma etapa (**Cobrança**). Para obter mais informações, consulte [Fluxos de pagamento]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Observação" color="info"%}}
Transactions with credit card using two-step flows are available under demand. Contact your Sales representative para obter mais informações.
{{% /alert %}}

### Observações {#considerations}
* Send a valid Credit card Método de pagamento in the request, [see the available Payment Methods o Chile]({{< ref "select-your-payment-method.html#Chile" >}}).
* For payments with credit card tokens, set the parameters `TOKEN_ID` e `CREDIT_CARD_SECURITY_CODE` (se processar com código de segurança) substituindo as informações do cartão de crédito. Para obter mais informações, consulte [Tokenization SDK]({{< ref "TokenizationSDK.md" >}}).
* Transactions in CHILEAN PESOS with decimal amounts are not allowed.
* Two-step flows are not supported for international credit cards.
* Transactions with credit card using two-step flows are available under demand and for single installment payments. Contact your Sales representative para obter mais informações.
* Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas. After this feature is enabled for you, set the parameter `PROCESS_WITHOUT_CVV2` as true and remove the parameter `CREDIT_CARD_SECURITY_CODE`.

### Autorização {#authorization}
Use este método para executar a etapa **Autorização** de um fluxo de duas etapas. Nesta etapa, você autoriza o pagamento, mas o valor não é debitado até você [capturar]({{< ref "payments-sdk-chile.md#capture" >}}) os fundos.<br>The following examples show how to call the method for this transaction type according to the programming language.

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
Use este método para executar a etapa **Captura** de um fluxo de duas etapas. Nesta etapa, você captura os fundos [Autorizados]({{< ref "payments-sdk-chile.md#authorization" >}}) anteriormente para transferi-los para sua conta PayU.

#### Observações {#considerations}
Leve em conta as seguintes informações para captura.
* O tempo máximo para capturar uma transação aprovada é de sete (7) dias. Após este período, a transação é cancelada automaticamente (auto-void).
* Apenas os parâmetros exibidos no corpo da solicitação são obrigatórios para invocar uma transação de Captura. Lembre-se de que os IDs da ordem e da transação devem corresponder a uma transação atualmente autorizada.
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
<!--
## Enviar transação em dinheiro {#submit-transaction-with-cash}
Este método permite processar os pagamentos de seus clientes em dinheiro. Para integrar com transações em dinheiro, você deve redirecionar o cliente para a URL encontrada na resposta do método; your customer selects cash and generates the payment code.

<img src="/assets/Payments/CashReceiptCL.png" alt="PrintScreen" width="50%">

### Observações {#considerations}
* O parâmetro `EXPIRATION_DATE` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de seven dias após a data atual at 12:00 pm.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* Você deve definir uma URL de resposta no parâmetro `NETWORK_CALLBACK_URL` in the request; esta URL redireciona o usuário de volta à sua página depois de concluir o procedimento de pagamento online.
* Você deve redirecionar o pagador para a página do Klap (antigo Multicaja) para permitir que ele efetue o pagamento em dinheiro. Esta URL está no parâmetro `BANK_URL` na resposta.

### Method call
A seguir estão o corpo do pedido e da resposta deste meio de pagamento.

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


## Enviar transação com transferência bancária {#submit-transaction-with-bank-transfer}
Este método permite processar os pagamentos de seus clientes por transferência bancária. Para se integrar a essas transações, você deve redirecionar o cliente para a URL encontrada na resposta do método.

<img src="/assets/Payments/BankTransferReceiptCL.png" alt="PrintScreen" width="50%">

### Observações {#considerations}
* Se você não enviar o parâmetro `RESPONSE_URL` parameter in the extra parameters, API extrairá o valor da variável _**URL de resposta**_ em seu Módulo PayU (_**Configuração**_ > _**Configuração técnica**_).
* Ao processar os pagamentos através do WebPay plus, você deve redirecionar o cliente para a URL encontrada no parâmetro extra `URL_PAYMENT_REDIRECT` concatenado com o parâmetro extra `TRANSBANK_DIRECT_TOKEN` da seguinte forma: <br> `URL_PAYMENT_REDIRECT?token_ws=TRANSBANK_DIRECT_TOKEN`.
* Se a solicitação de pagamento for bem-sucedida, a transação tem estado `PENDING` e responseCode `PENDING_PAYMENT_IN_ENTITY`; Isso ocorre porque o pagador é redirecionado ao banco selecionado para concluir o pagamento.
* The response page must have the following variables:

| Variável          | Descrição                                                   |
|-------------------|---------------------------------------------------------------|
| transactionState  | Estado da transação.                                     |
| reference_pol     | Código de referência para identificar uma transação no PayU.             |
| TX_VALUE          | Valor da transação.                                           |
| authorizationCode | Código de autorização da transação.                        |
| processingDate    | Data da transação.                                             |
| cc_number         | Número visível do cartão utilizado na transação.           |

As variáveis acima são enviadas via GET.

### Method call
A seguir estão o corpo do pedido e da resposta deste meio de pagamento.


-->
## Consulta de métodos de pagamento disponíveis {#available-payment-methods-query}
Este método gera uma lista dos métodos de pagamento disponíveis em todos os países.

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
O método `PING` permite que você confirme a conexão com a nossa plataforma.

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
