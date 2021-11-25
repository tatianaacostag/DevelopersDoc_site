---
title: "Payments SDK - Colombia"
linkTitle: "Payments SDK - Colombia"
date: 2021-05-03T15:48:08-05:00
description: >
  Payments SDK Colombia permite que sua loja processe diferentes tipos de transações com vários métodos de pagamento.
weight: 40
tags: ["subtopic"]
---

To integrate with Payments SDK Colombia, target the requests to the following URLs:

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

* [Enviar transação com cartão de crédito]({{< ref "Payments-SDK-Colombia.md#submit-transaction-with-credit-cards" >}})
* [Enviar transação em dinheiro ou referência bancária]({{< ref "Payments-SDK-Colombia.md#submit-transaction-with-cash-or-bank-reference" >}})
* [Enviar transação com transferência bancária]({{< ref "Payments-SDK-Colombia.md#submit-transaction-with-bank-transfer" >}})
* [Lista de bancos - PSE]({{< ref "Payments-SDK-Colombia.md#bank-list---pse" >}})
* [Consulta de métodos de pagamento disponíveis]({{< ref "Payments-SDK-Colombia.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-SDK-Colombia.md#ping" >}})

{{% alert title="Observação" color="info"%}}
To confirm the status of a transaction, você pode usar the [Consultas SDK]({{< ref "QueriesSDK.md" >}}).
{{% /alert %}}

## Enviar transação com cartão de crédito {#submit-transaction-with-credit-cards}
Este método permite processar os pagamentos efetuados com cartão de crédito pelos seus clientes. Para a Colômbia, você pode fazer fluxos de uma etapa (**Cobrança**). Para obter mais informações, consulte [Fluxos de pagamento]({{< ref "payments.md#payment-flows" >}}).

### Observações {#considerations}
* Send a valid Credit card Método de pagamento in the request, [see the available Payment Methods para a Colômbia]({{< ref "select-your-payment-method.html#Colombia" >}}).
* For payments with credit card tokens, set the parameters `TOKEN_ID` e `CREDIT_CARD_SECURITY_CODE` (se processar com código de segurança) substituindo as informações do cartão de crédito. Para obter mais informações, consulte [Tokenization SDK]({{< ref "TokenizationSDK.md" >}}).
* Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas. After this feature is enabled for you, set the parameter `PROCESS_WITHOUT_CVV2` as true and remove the parameter `CREDIT_CARD_SECURITY_CODE`.
* No cartão Crédito Fácil Codensa, o número de parcelas aceitas é de 1 a 12, 18, 24, 36 e 48.
* No cartão Crédito Fácil Codensa, o pagador pode escolher qualquer um dos seguintes tipos de documentos para a variável `PAYER_DNI_TYPE`:

| ISO | Descrição                                                                         |
|:---:|-------------------------------------------------------------------------------------|
|  CC | Cartão de cidadania.                                                                   |
|  CE | Cartão de cidadão estrangeiro.                                                           |
| NIT | Número de identificação fiscal (empresas).                                              |
|  TI | Cartão de identidade.                                                                      |
|  PP | Passaporte.                                                                           |
| IDC | Client´s unique identifier, in the case of unique customer / ID de conta de serviços. |
| CEL | Quando identificado pela linha móvel.                                                 |
|  RC | Certidão de nascimento.                                                                  |
|  DE | Documento de identificação de estrangeiro.                                                    |

### Method call
The following examples show how to call the method for this transaction type according to the programming language.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "65000";

Map<String, String> parameters = new HashMap<String, String>();

// Enter the account’s identifier here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512321");
// Enter the reference code here.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
// Enter the description here.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Enter the transaction language here.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Values --
// Enter the value here.
parameters.put(PayU.PARAMETERS.VALUE, ""+value);
// Enter the value of the IVA (Value Added Tax only valid para a Colômbia) da transação,
// if no IVA is sent, the system applies 19% automatically. Ele pode conter dois dígitos decimais.
// Exemplo 19000.00. In case you don't have IVA, set 0.
parameters.put(PayU.PARAMETERS.TAX_VALUE, "10378");
// Enter the value of the base value on which VAT (only valid para a Colômbia) is calculated.
// In case you don't have IVA, set 0.
parameters.put(PayU.PARAMETERS.TAX_RETURN_BASE, "54622");
// Enter the currency here.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.COP.name());

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
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CO");
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
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CO");
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
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CO.name());


// Device Session ID
parameters.put(PayU.PARAMETERS.DEVICE_SESSION_ID, "vghs6tvkcle931686k1900o6e1");
// Payer IP
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
// Cookie of the current session.
parameters.put(PayU.PARAMETERS.COOKIE, "pt1t38347bs6jc9ruv2ecpv7o2");
// User agent of the current session.
parameters.put(PayU.PARAMETERS.USER_AGENT, "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0");

// "Autorização and capture" request
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
$value = "65000";

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
  // Enter the value of the IVA (Value Added Tax only valid para a Colômbia) da transação,
  // if no IVA is sent, the system applies 19% automatically. Ele pode conter dois dígitos decimais.
  // Exemplo 19000.00. In case you don't have IVA, set 0.
  PayUParameters::TAX_VALUE => "10378",
  // Enter the value of the base value on which VAT (only valid para a Colômbia) is calculated.
  // In case you don't have IVA, set 0.
  PayUParameters::TAX_RETURN_BASE => "54622",
	// Enter the currency here.
	PayUParameters::CURRENCY => "COP",

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
	PayUParameters::BUYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "BOGOTÁ",
	PayUParameters::BUYER_STATE => "Bogotá D.C",
	PayUParameters::BUYER_COUNTRY => "CO",
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
	PayUParameters::PAYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "BOGOTÁ",
	PayUParameters::PAYER_STATE => "Bogotá D.C",
	PayUParameters::PAYER_COUNTRY => "CO",
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
	PayUParameters::COUNTRY => PayUCountries::CO,

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

## Enviar transação em dinheiro {#submit-transaction-with-cash} ou referência bancária
Este método permite processar os pagamentos de seus clientes em dinheiro ou usando uma referência bancária. Para integrar com transações em dinheiro, você deve redirecionar o cliente para a URL encontrada na resposta do método; Seu cliente verá um recibo de pagamento como o seguinte.

#### Pagamentos em dinheiro {#payments-in-cash}
<img src="/assets/Payments/CashReceiptCO.png" alt="PrintScreen" width="75%">

#### Pagamentos com referência bancária {#payments-with-bank-reference}
<img src="/assets/Payments/BankReferenceReceiptCO.png" alt="PrintScreen" width="75%">

### Observações {#considerations}
* Send a valid cash Método de pagamento in the request, [see the available Payment Methods para a Colômbia]({{< ref "select-your-payment-method.html#Colombia" >}}). `OTHERS_CASH` method is not supported.
* O parâmetro `EXPIRATION_DATE` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de 7 dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* Para `BALOTO` e `EFECTY`, a confirmação do pagamento leva 15 minutos. Para `BANK_REFERENCED`, a confirmação é feita online.
* Os valores mínimo e máximo para `BALOTO` e `EFECTY` são:
   - `BALOTO` > Mín: $3.000 COP - Máx: $1.000.000 COP
   - `EFECTY` > Mín: $20.000 COP - Máx: $6.000.000 COP
* The extra parameters have the following data related to the transaction:
   - **EXPIRATION_DATE**: prazo máximo para o pagador fazer o pagamento 
   - **REFERENCE**: referência interna de pagamento gerada pelo PayU.
   - **URL_PAYMENT_RECEIPT_HTML**: comprovante de pagamento em formato HTML. É para cá que você precisa redirecionar o pagamento quando o pagador seleciona o pagamento em dinheiro. 
   - **URL_PAYMENT_RECEIPT_PDF**: comprovante de pagamento em formato PDF.
   - **BANCO_BOGOTA_SERVICE_CODE**: código de pagamento para Banco de Bogotá. Available ao usar `BANK_REFERENCED`.
   - **BANK_REFERENCED_NAME**: Nome de referência para Bancolombia. Available ao usar `BANK_REFERENCED`.
   - **BANCOLOMBIA_SERVICE_CODE**: código de pagamento para Bancolombia. Available ao usar `BANK_REFERENCED`.

### Method call
The following examples show how to call the method for this transaction type according to the programming language.

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "65000";

Map<String, String> parameters = new HashMap<String, String>();

// Enter the account’s identifier here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512321");
// Enter the reference code here.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
// Enter the description here.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Enter the transaction language here.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Values --
// Enter the value here.
parameters.put(PayU.PARAMETERS.VALUE, ""+value);
// Enter the value of the IVA (Value Added Tax only valid para a Colômbia) da transação,
// if no IVA is sent, the system applies 19% automatically. Ele pode conter dois dígitos decimais.
// Exemplo 19000.00. In case you don't have IVA, set 0.
parameters.put(PayU.PARAMETERS.TAX_VALUE, "10378");
// Enter the value of the base value on which VAT (only valid para a Colômbia) is calculated.
// In case you don't have IVA, set 0.
parameters.put(PayU.PARAMETERS.TAX_RETURN_BASE, "54622");
// Enter the currency here.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.COP.name());

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
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CO");
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
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CO");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// Enter the cash payment method name here.
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "EFECTY");

// Enter the payment due date
parameters.put(PayU.PARAMETERS.EXPIRATION_DATE, "2021-07-01T20:00:00");

// Enter the name of the country here.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CO.name());


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

// Response
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
    String url = (String)extraParameters.get("URL_PAYMENT_RECEIPT_HTML");
		Date date = (Date)extraParameters.get("EXPIRATION_DATE");
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
$value = "65000";

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
  // Enter the value of the IVA (Value Added Tax only valid para a Colômbia) da transação,
  // if no IVA is sent, the system applies 19% automatically. Ele pode conter dois dígitos decimais.
  // Exemplo 19000.00. In case you don't have IVA, set 0.
  PayUParameters::TAX_VALUE => "10378",
  // Enter the value of the base value on which VAT (only valid para a Colômbia) is calculated.
  // In case you don't have IVA, set 0.
  PayUParameters::TAX_RETURN_BASE => "54622",
	// Enter the currency here.
	PayUParameters::CURRENCY => "COP",

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
	PayUParameters::BUYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "BOGOTÁ",
	PayUParameters::BUYER_STATE => "Bogotá D.C",
	PayUParameters::BUYER_COUNTRY => "CO",
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
	PayUParameters::PAYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "BOGOTÁ",
	PayUParameters::PAYER_STATE => "Bogotá D.C",
	PayUParameters::PAYER_COUNTRY => "CO",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// Enter the cash payment method name here
	PayUParameters::PAYMENT_METHOD => "EFECTY",

  // Enter the payment due date
	PayUParameters::EXPIRATION_DATE => "2021-07-01T20:00:00",

	// Enter the name of the country here.
	PayUParameters::COUNTRY => PayUCountries::CO,

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
	if($response->transactionResponse->state=="PENDING"){
		$response->transactionResponse->pendingReason;
		$response->transactionResponse->trazabilityCode;
		$response->transactionResponse->authorizationCode;
		$response->transactionResponse->extraParameters->REFERENCE;
		$response->transactionResponse->extraParameters->EXPIRATION_DATE;
		$response->transactionResponse->extraParameters->URL_PAYMENT_RECEIPT_HTML;
		$response->transactionResponse->extraParameters->URL_PAYMENT_RECEIPT_PDF;
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
Este método permite processar os pagamentos de seus clientes por transferência bancária. Na Colômbia, as transferências bancárias são feitas com o PSE, to perform an integration with this payment method, you need to follow these steps:

1. Consulte a lista de bancos disponíveis para mostrá-los ao pagador. Para consultar a lista de bancos, [consulte este método]({{< ref "Payments-SDK-Colombia.md#bank-list---pse" >}}).

2. Apresente a lista de bancos conforme exibido abaixo:

<img src="/assets/Payments/PSEBankList_EN.png" alt="PrintScreen" width="50%"><br>

When the payer selects a bank, you must send the parameter `pseCode` of the selection in the parameter `PSE_FINANCIAL_INSTITUTION_CODE` in the request.

3. Apresente uma lista para permitir que o pagador escolha se é uma pessoa _Física_ ou _Jurídica_. Depending on what the payer choose, you must send the value in the parameter `PAYER_PERSON_TYPE` in the request. A lista deve ser exibida da seguinte forma:

<img src="/assets/Payments/PSEPersonList_EN.png" alt="PrintScreen" width="50%"><br>

The selected value must be sent as follows:
* Java: `PersonType.NATURAL.toString()` (N) ou `PersonType.LEGAL.toString()` (J).
* PHP: `N` ou `J`.

4. 5.	Mostre uma lista para permitir que o pagador escolha um tipo de identificação. Você deve enviar o código ISO do valor selecionado no parameter `PAYER_DOCUMENT_TYPE` in the request. A lista deve ser exibida da seguinte forma:

<img src="/assets/Payments/PSEDocType_EN.png" alt="PrintScreen" width="50%"><br>

A lista de documentos disponíveis é:

| ISO | Descrição                                                                         |
|:---:|-------------------------------------------------------------------------------------|
|  CC | Cartão de cidadania.                                                                   |
|  CE | Cartão de cidadão estrangeiro.                                                           |
| NIT | Número de identificação fiscal (empresas).                                              |
|  TI | Cartão de identidade.                                                                      |
|  PP | Passaporte.                                                                           |
| IDC | Client´s unique identifier, in the case of unique customer / ID de conta de serviços. |
| CEL | Quando identificado pela linha móvel.                                                 |
|  RC | Certidão de nascimento.                                                                  |
|  DE | Documento de identificação de estrangeiro.                                                    |

5. You must send the payer identification number in the extra parameter `PAYER_DNI` in the request.

### Observações {#considerations}
* Se a solicitação de pagamento for bem-sucedida, a transação tem estado `PENDING` e responseCode `PENDING_TRANSACTION_CONFIRMATION`; Isso ocorre porque o pagador é redirecionado ao banco selecionado para concluir o pagamento; Você deve redirecionar o pagador para a URL retornada no parâmetro extra `BANK_URL`.
* A URL retornada no parâmetro extra `BANK_URL` está configurada no Módulo PayU e deve apresentar as seguintes informações:<br><br>![PrintScreen](/assets/Payments/PSEresponse-en.png)<br>Os parâmetros que começam com o símbolo $ são enviados via `GET`.
* You must add na resposta page the options to retry the payment, finish the transaction and print the receipt.
* The status displayed na resposta page can be any of the following:

| polTransactionState | polResponseCode | Estado                                                                |
|---------------------|-----------------|----------------------------------------------------------------------|
| 4                   | 1               | Transação aprovada                                                 |
| 6                   | 5               | Transação falhou                                                   |
| 6                   | 4               | Transação rejeitada                                                 |
| 12 ou 14            | 9994 ou 25      | Transação pendente, verifique se o débito foi feito no banco. |

### Method call
The following examples show how to call the method for this transaction type according to the programming language.

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "65000";

Map<String, String> parameters = new HashMap<String, String>();

// Enter the account’s identifier here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512321");
// Enter the reference code here.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
// Enter the description here.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Enter the transaction language here.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Values --
// Enter the value here.
parameters.put(PayU.PARAMETERS.VALUE, ""+value);
// Enter the value of the IVA (Value Added Tax only valid para a Colômbia) da transação,
// if no IVA is sent, the system applies 19% automatically. Ele pode conter dois dígitos decimais.
// Exemplo 19000.00. In case you don't have IVA, set 0.
parameters.put(PayU.PARAMETERS.TAX_VALUE, "10378");
// Enter the value of the base value on which VAT (only valid para a Colômbia) is calculated.
// In case you don't have IVA, set 0.
parameters.put(PayU.PARAMETERS.TAX_RETURN_BASE, "54622");
// Enter the currency here.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.COP.name());

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
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CO");
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
// Enter the payer's address here.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CO");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

//-- Obrigatório information for PSE –
// Enter the bank PSE code here.
parameters.put(PayU.PARAMETERS.PSE_FINANCIAL_INSTITUTION_CODE, "1007");
// Enter the person type here (Natural ou legal).
parameters.put(PayU.PARAMETERS.PAYER_PERSON_TYPE, PersonType.NATURAL.toString());
// ou parameters.put(PayU.PARAMETERS.PAYER_PERSON_TYPE, PersonType.LEGAL.toString());
// Enter the payer's contact document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "123456789");
// Enter the payer’s document type here.
parameters.put(PayU.PARAMETERS.PAYER_DOCUMENT_TYPE, DocumentType.CC.toString());

// Enter the payment method name here.
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "PSE");

// Enter the name of the country here.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CO.name());


// Device Session ID
parameters.put(PayU.PARAMETERS.DEVICE_SESSION_ID, "vghs6tvkcle931686k1900o6e1");
// Payer IP
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
// Cookie of the current session.
parameters.put(PayU.PARAMETERS.COOKIE, "pt1t38347bs6jc9ruv2ecpv7o2");
// User agent of the current session.
parameters.put(PayU.PARAMETERS.USER_AGENT, "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0");

// Response page to which the payer will be redirected.
parameters.put(PayU.PARAMETERS.RESPONSE_URL, "http://www.test.com/response");

// "Autorização and capture" request
TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);

// Response
if(response != null){
	response.getOrderId();
	response.getTransactionId();
	response.getState();
	if(response.getState().equals(TransactionState.PENDING)){
		response.getPendingReason();
		Map extraParameters = response.getExtraParameters();

		// Obtain the bank URL
		String url = (String)extraParameters.get("BANK_URL");
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
$value = "65000";

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
  // Enter the value of the IVA (Value Added Tax only valid para a Colômbia) da transação,
  // if no IVA is sent, the system applies 19% automatically. Ele pode conter dois dígitos decimais.
  // Exemplo 19000.00. In case you don't have IVA, set 0.
  PayUParameters::TAX_VALUE => "10378",
  // Enter the value of the base value on which VAT (only valid para a Colômbia) is calculated.
  // In case you don't have IVA, set 0.
  PayUParameters::TAX_RETURN_BASE => "54622",
	// Enter the currency here.
	PayUParameters::CURRENCY => "COP",

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
	PayUParameters::BUYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "BOGOTÁ",
	PayUParameters::BUYER_STATE => "Bogotá D.C",
	PayUParameters::BUYER_COUNTRY => "CO",
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
	PayUParameters::PAYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "BOGOTÁ",
	PayUParameters::PAYER_STATE => "Bogotá D.C",
	PayUParameters::PAYER_COUNTRY => "CO",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	//-- Obrigatório information for PSE –
  // Enter the bank PSE code here.
	PayUParameters::PSE_FINANCIAL_INSTITUTION_CODE => "1007",
  // Enter the person type here (Natural ou legal).
	PayUParameters::PAYER_PERSON_TYPE => "N",
  // ou PayUParameters::PAYER_PERSON_TYPE => "J"
  // Enter the payer's contact document here.
	PayUParameters::PAYER_DNI => "123456789",
  // Enter the payer’s document type here.
	PayUParameters::PAYER_DOCUMENT_TYPE => "CC",

  // Enter the payment method name here.
	PayUParameters::PAYMENT_METHOD => "PSE",

	// Enter the name of the country here.
	PayUParameters::COUNTRY => PayUCountries::CO,

	// Device Session ID
	PayUParameters::DEVICE_SESSION_ID => "vghs6tvkcle931686k1900o6e1",
	// Payer IP
	PayUParameters::IP_ADDRESS => "127.0.0.1",
	// Cookie of the current session
	PayUParameters::PAYER_COOKIE => "pt1t38347bs6jc9ruv2ecpv7o2",
	// User agent of the current session
	PayUParameters::USER_AGENT => "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0",

  // Response page to which the payer will be redirected.
	PayUParameters::PARAMETERS.RESPONSE_URL => "http://www.test.com/response"
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
		$response->transactionResponse->extraParameters->BANK_URL;
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

## Lista de bancos - PSE
This method returns a list of the banks available for [payments using PSE]({{< ref "Payments-SDK-Colombia.md#submit-transaction-with-bank-transfer" >}}). 

### Method call
A seguir estão os corpos do pedido e resposta deste método.

{{< tabs tabTotal="2" tabID="5" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

// Enter the payment method name here
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "PSE");

// Enter the name of the country here.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CO.name());

//Obtain the bank list
List banks = PayUPayments.getPSEBanks(parameters);
Iterator banks_iterator=banks.iterator();

while(banks_iterator.hasNext()){
    Bank bank = (Bank) banks_iterator.next();
    bank.getPseCode();
    bank.getDescription();    
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
// Enter the payment method name here
$parameters = array(
	// Insert the payment method here.
	PayUParameters::PAYMENT_METHOD => "PSE",
	// Enter the name of the country here.
	PayUParameters::COUNTRY => PayUCountries::CO,
);
$array=PayUPayments::getPSEBanks($parameters);
$banks=$array->banks;

foreach ($banks as $bank) {
	$bank->description;
	$bank->pseCode;
}
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
