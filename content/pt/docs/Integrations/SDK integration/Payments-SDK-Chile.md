---
title: "SDK de Pagamentos - Chile"
linkTitle: "SDK de Pagamentos - Chile"
date: 2021-05-03T15:48:08-05:00
description: >
  SDK de Pagamentos do Chile permite que sua loja processe diferentes tipos de transações com vários métodos de pagamento.
weight: 30
tags: ["subtopic"]
---

Para integrar com o SDK de Pagamentos do Chile, direcione sua solicitação para as seguintes URLs:

{{< tabs tabTotal="2" tabID="1" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
// URL para teste: https://sandbox.api.payulatam.com/payments-api/
PayU.paymentsUrl = “https://api.payulatam.com/payments-api/”;
// URL para teste: https://sandbox.api.payulatam.com/reports-api/
PayU.reportsUrl = “https://api.payulatam.com/reports-api/”;
```

{{< /tab >}}

{{< tab tabNum="2" >}}

```PHP
// URL para teste: https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi
Environment::setPaymentsCustomUrl(“https://api.payulatam.com/payments-api/4.0/service.cgi”);
// URL para teste: https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi
Environment::setReportsCustomUrl(“https://api.payulatam.com/reports-api/4.0/service.cgi”);
```

{{< /tab >}}
{{< /tabs >}}

## Métodos disponíveis {#available-methods}
O SDK de pagamentos inclui os seguintes métodos

* [Enviar transação com cartão de crédito]({{< ref "#submit-transaction-with-credit-cards" >}})
* [Consulta de métodos de pagamento disponíveis]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})
<!-- * [Enviar transação em dinheiro]({{< ref "#submit-transaction-with-cash" >}}) -->

{{% alert title="Observação" color="info"%}}
Para confirmar o status de uma transação, você pode usar o [SDK de Consultas]({{< ref "QueriesSDK.md" >}}).
{{% /alert %}}

## Enviar transação com cartão de crédito {#submit-transaction-with-credit-cards}
Este método permite processar os pagamentos efetuados com cartão de crédito pelos seus clientes. Para o Chile, você pode executar os fluxos de duas etapas, você pode executar os fluxos de duas etapas (**Autorização**, **Captura**) e fluxos de uma etapa (**Cobrança**). Para obter mais informações, consulte [Fluxos de pagamento]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Observação" color="info"%}}
Transações com cartão de crédito usando fluxos de duas etapas estão disponíveis sob demanda. Contate seu representante de vendas para obter mais informações.
{{% /alert %}}

### Observações {#considerations}
* Enviar um método de pagamento com cartão de crédito válido, [see the available Payment Methods o Chile]({{< ref "select-your-payment-method.html#Chile" >}}).
* Para pagamentos com tokens de cartão de crédito, inclua os parâmetros `TOKEN_ID` e `CREDIT_CARD_SECURITY_CODE` (se processar com código de segurança) substituindo as informações do cartão de crédito. Para obter mais informações, consulte [SDK de Tokenização]({{< ref "TokenizationSDK.md" >}}).
* Não são permitidas transações em PESOS CHILENOS com valores decimais.
* Os fluxos de duas etapas não são compatíveis com cartões de crédito internacionais.
* As transações com cartão de crédito usando fluxos de duas etapas estão disponíveis para pagamento em parcela única. Contate seu representante de vendas para obter mais informações.
* Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas. Depois que esse recurso for habilitado para você, envie no pedido o parâmetro `PROCESS_WITHOUT_CVV2` como true e remova o parâmetro `CREDIT_CARD_SECURITY_CODE`.

### Autorização {#authorization}
Use este método para executar a etapa **Autorização** de um fluxo de duas etapas. Nesta etapa, você autoriza o pagamento, mas o valor não é debitado até você [capturar]({{< ref "#capture" >}}) os fundos.<br>Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da conta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512325");
// Coloque aqui o código de referência.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
// Coloque aqui a descrição.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Coloque aqui o idioma da ordem.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Valores --
// Coloque aqui o valor.
parameters.put(PayU.PARAMETERS.VALUE, ""+value);
// Coloque aqui a moeda.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.CLP.name());

// --  Comprador --
// Coloque aqui o ID do comprador.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
// Coloque aqui o nome do comprador.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer name");
// Coloque aqui o email do comprador
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
// Coloque aqui o telefone de contato do comprador.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
// Coloque aqui o documento de identificação do comprador.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

// Coloque aqui o endereço do comprador.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "RM");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Talagante");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CL");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "7563126");


// -- Pagador --
// Coloque aqui o ID do pagador.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
// Coloque aqui o nome do pagador.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second payer name");
// Coloque aqui o email do pagador.
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "payer_test@test.com");
// Coloque aqui o telefone de contato do pagador.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "7563126");
// Coloque aqui o documento de identificação do pagador
parameters.put(PayU.PARAMETERS.PAYER_DNI, "5415668464654");
// Coloque aqui o endereço do pagador.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "RM");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Talagante");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CL");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// -- Dados do cartão de crédito --
// Coloque aqui o número do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4097440000000004");
// Coloque aqui a data de vencimento do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2022/12");
// Coloque aqui o código de segurança do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "777");
// Coloque aqui o nome do cartão de crédito
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");

// Coloque aqui o número de parcelas.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Coloque aqui o nome do pais.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CL.name());


// Device Session ID
parameters.put(PayU.PARAMETERS.DEVICE_SESSION_ID, "vghs6tvkcle931686k1900o6e1");
// O IP do pagador
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
// Cookie da sessão atual.
parameters.put(PayU.PARAMETERS.COOKIE, "pt1t38347bs6jc9ruv2ecpv7o2");
// User agent da sessão atual.
parameters.put(PayU.PARAMETERS.USER_AGENT, "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0");

// Pedido de autorização
TransactionResponse response = PayUPayments.doAuthorization(parameters);

// Você pode obter as propriedades na resposta
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
	// Coloque aqui o identificador da conta
	PayUParameters::ACCOUNT_ID => "512325",
	// Coloque aqui o código de referência.
	PayUParameters::REFERENCE_CODE => $reference,
	// Coloque aqui a descrição.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
    // Coloque aqui o valor.
	PayUParameters::VALUE => $value,
	// Coloque aqui a moeda.
	PayUParameters::CURRENCY => "CLP",

	// --  Comprador --
	// Coloque aqui o ID do comprador.
	PayUParameters::BUYER_ID => "1",
	// Coloque aqui o nome do comprador.
	PayUParameters::BUYER_NAME => "First name and second buyer name",
	// Coloque aqui o email do comprador.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	// Coloque aqui o telefone de contato do comprador.
	PayUParameters::BUYER_CONTACT_PHONE => "7563126",
	// Coloque aqui o documento de identificação do comprador.
	PayUParameters::BUYER_DNI => "5415668464654",
	// Coloque aqui o endereço do comprador.
	PayUParameters::BUYER_STREET => "Autopista Del Sol, 0 - Km.43 Costado Sur",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "RM",
	PayUParameters::BUYER_STATE => "Talagante",
	PayUParameters::BUYER_COUNTRY => "CL",
	PayUParameters::BUYER_POSTAL_CODE => "000000",
	PayUParameters::BUYER_PHONE => "7563126",


	// -- Pagador --
	// Coloque aqui o ID do pagador.
	PayUParameters::PARAMETERS.PAYER_ID => "1",
    /// Coloque aqui o nome do pagador
	PayUParameters::PAYER_NAME => "First name and second payer name",
	// Coloque aqui o e-mail do pagador
	PayUParameters::PAYER_EMAIL => "payer_test@test.com",
	// Coloque aqui o telefone de contato do pagador.
	PayUParameters::PAYER_CONTACT_PHONE => "7563126",
	// Coloque aqui o documento de identificação do pagador
	PayUParameters::PAYER_DNI => "5415668464654",
	// Coloque aqui o endereço do pagador.
	PayUParameters::PAYER_STREET => "Autopista Del Sol, 0 - Km.43 Costado Sur",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "RM",
	PayUParameters::PAYER_STATE => "Talagante",
	PayUParameters::PAYER_COUNTRY => "CL",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// -- Dados do cartão de crédito --
    // Coloque aqui o número do cartão de crédito
	PayUParameters::CREDIT_CARD_NUMBER => "4097440000000004",
	// Coloque aqui a data de vencimento do cartão de crédito
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2022/12",
	// Coloque aqui o código de segurança do cartão de crédito
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "777",
	// Coloque aqui o nome do cartão de crédito
	PayUParameters::PAYMENT_METHOD => "VISA",

	// Coloque aqui o número de parcelas.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Coloque aqui o nome do pais.
	PayUParameters::COUNTRY => PayUCountries::CL,

	// Device Session ID
	PayUParameters::DEVICE_SESSION_ID => "vghs6tvkcle931686k1900o6e1",
	// O IP do pagador
	PayUParameters::IP_ADDRESS => "127.0.0.1",
	// Cookie da sessão atual
	PayUParameters::PAYER_COOKIE=>"pt1t38347bs6jc9ruv2ecpv7o2",
	// User agent da sessão atual
	PayUParameters::USER_AGENT=>"Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
	);

// Pedido de autorização
$response = PayUPayments::doAuthorization($parameters);

// Você pode obter as propriedades na resposta
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
Use este método para executar a etapa **Captura** de um fluxo de duas etapas. Nesta etapa, você captura os fundos [Autorizados]({{< ref "#authorization" >}}) anteriormente para transferi-los para sua conta PayU.

#### Observações {#considerations-1}
Leve em conta as seguintes informações para captura.
* O tempo máximo para capturar uma transação aprovada é de sete (7) dias. Após este período, a transação é cancelada automaticamente (auto-void).
* Apenas os parâmetros exibidos no corpo da solicitação são obrigatórios para invocar uma transação de Captura. Lembre-se de que os IDs da ordem e da transação devem corresponder a uma transação atualmente autorizada.
* As capturas são permitidas apenas para transações em uma parcela.

Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da ordem.
parameters.put(PayU.PARAMETERS.ORDER_ID, "1400468293");
// Coloque aqui o identificador da transação.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "ad6940f1-cf8b-474a-a69d-00382084d16c");
// Coloque aqui o idioma da ordem.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// Pedido de captura
TransactionResponse response = PayUPayments.doCapture(parameters);

// Resposta
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
	// Coloque aqui o identificador da conta.
	PayUParameters::ACCOUNT_ID => "512327",
	// Coloque aqui o identificador da ordem.
	PayUParameters::ORDER_ID => "1400468293",
	// Coloque aqui o identificador da transação.
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

Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da conta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512325");
// Coloque aqui o código de referência.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
// Coloque aqui a descrição.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Coloque aqui o idioma da ordem.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Valores --
// Coloque aqui o valor.
parameters.put(PayU.PARAMETERS.VALUE, ""+value);
// Coloque aqui a moeda.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.CLP.name());

// --  Comprador --
// Coloque aqui o ID do comprador.
parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
// Coloque aqui o nome do comprador.
parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer name");
// Coloque aqui o email do comprador
parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
// Coloque aqui o telefone de contato do comprador.
parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
// Coloque aqui o documento de identificação do comprador.
parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

// Coloque aqui o endereço do comprador.
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "RM");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Talagante");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CL");
parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.BUYER_PHONE, "7563126");


// -- Pagador --
// Coloque aqui o ID do pagador.
parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
// Coloque aqui o nome do pagador.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second payer name");
// Coloque aqui o email do pagador.
parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "payer_test@test.com");
// Coloque aqui o telefone de contato do pagador.
parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "7563126");
// Coloque aqui o documento de identificação do pagador
parameters.put(PayU.PARAMETERS.PAYER_DNI, "5415668464654");
// Coloque aqui o endereço do pagador.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "RM");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Talagante");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CL");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// -- Dados do cartão de crédito --
// Coloque aqui o número do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4037997623271984");
// Coloque aqui a data de vencimento do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2030/12");
// Coloque aqui o código de segurança do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "321");
// Coloque aqui o nome do cartão de crédito
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");

// Coloque aqui o número de parcelas.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Coloque aqui o nome do pais.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CL.name());


// Device Session ID
parameters.put(PayU.PARAMETERS.DEVICE_SESSION_ID, "vghs6tvkcle931686k1900o6e1");
// O IP do pagador
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
// Cookie da sessão atual.
parameters.put(PayU.PARAMETERS.COOKIE, "pt1t38347bs6jc9ruv2ecpv7o2");
// User agent da sessão atual.
parameters.put(PayU.PARAMETERS.USER_AGENT, "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0");

// Pedido de autorização
TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);

// Você pode obter as propriedades na resposta
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
	// Coloque aqui o identificador da conta
	PayUParameters::ACCOUNT_ID => "512325",
	// Coloque aqui o código de referência.
	PayUParameters::REFERENCE_CODE => $reference,
	// Coloque aqui a descrição.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
        // Coloque aqui o valor.
	PayUParameters::VALUE => $value,
	// Coloque aqui a moeda.
	PayUParameters::CURRENCY => "CLP",

	// --  Comprador --
	// Coloque aqui o ID do comprador.
	PayUParameters::BUYER_ID => "1",
	// Coloque aqui o nome do comprador.
	PayUParameters::BUYER_NAME => "First name and second buyer name",
	// Coloque aqui o email do comprador.
	PayUParameters::BUYER_EMAIL => "buyer_test@test.com",
	// Coloque aqui o telefone de contato do comprador.
	PayUParameters::BUYER_CONTACT_PHONE => "7563126",
	// Coloque aqui o documento de identificação do comprador.
	PayUParameters::BUYER_DNI => "5415668464654",
	// Coloque aqui o endereço do comprador.
	PayUParameters::BUYER_STREET => "Autopista Del Sol, 0 - Km.43 Costado Sur",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "RM",
	PayUParameters::BUYER_STATE => "Talagante",
	PayUParameters::BUYER_COUNTRY => "CL",
	PayUParameters::BUYER_POSTAL_CODE => "000000",
	PayUParameters::BUYER_PHONE => "7563126",


	// -- Pagador --
	// Coloque aqui o ID do pagador.
	PayUParameters::PARAMETERS.PAYER_ID => "1",
    /// Coloque aqui o nome do pagador
	PayUParameters::PAYER_NAME => "First name and second payer name",
	// Coloque aqui o e-mail do pagador
	PayUParameters::PAYER_EMAIL => "payer_test@test.com",
	// Coloque aqui o telefone de contato do pagador.
	PayUParameters::PAYER_CONTACT_PHONE => "7563126",
	// Coloque aqui o documento de identificação do pagador
	PayUParameters::PAYER_DNI => "5415668464654",
	// Coloque aqui o endereço do pagador.
	PayUParameters::PAYER_STREET => "Autopista Del Sol, 0 - Km.43 Costado Sur",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "RM",
	PayUParameters::PAYER_STATE => "Talagante",
	PayUParameters::PAYER_COUNTRY => "CL",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// -- Dados do cartão de crédito --
        // Coloque aqui o número do cartão de crédito
	PayUParameters::CREDIT_CARD_NUMBER => "4037997623271984",
	// Coloque aqui a data de vencimento do cartão de crédito
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2030/12",
	// Coloque aqui o código de segurança do cartão de crédito
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "321",
	// Coloque aqui o nome do cartão de crédito
	PayUParameters::PAYMENT_METHOD => "VISA",

	// Coloque aqui o número de parcelas.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Coloque aqui o nome do pais.
	PayUParameters::COUNTRY => PayUCountries::CL,

	// Device Session ID
	PayUParameters::DEVICE_SESSION_ID => "vghs6tvkcle931686k1900o6e1",
	// O IP do pagador
	PayUParameters::IP_ADDRESS => "127.0.0.1",
	// Cookie da sessão atual
	PayUParameters::PAYER_COOKIE=>"pt1t38347bs6jc9ruv2ecpv7o2",
	// User agent da sessão atual
	PayUParameters::USER_AGENT=>"Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
	);

// Pedido de autorização
$response = PayUPayments::doAuthorizationAndCapture($parameters);

// Você pode obter as propriedades na resposta
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

### Chamada de método {#method-call}
A seguir estão o corpo do pedido e da resposta deste meio de pagamento.

Map<String, String> parameters = new HashMap<String, String>();

        // Coloque aqui o identificador da conta.
        parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512325");
        // Coloque aqui o código de referência.
        parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
        // Coloque aqui a descrição.
        parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
        // Coloque aqui o idioma da ordem.
        parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

        // -- Valores --
        // Coloque aqui o valor.
        parameters.put(PayU.PARAMETERS.VALUE, ""+value);
        // Coloque aqui a moeda.
        parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.CLP.name());

        // --  Comprador --
        // Coloque aqui o ID do comprador.
        parameters.put(PayU.PARAMETERS.BUYER_ID, "1");
        // Coloque aqui o nome do comprador.
        parameters.put(PayU.PARAMETERS.BUYER_NAME, "First name and second buyer  name");
        // Coloque aqui o email do comprador
        parameters.put(PayU.PARAMETERS.BUYER_EMAIL, "buyer_test@test.com");
        // Coloque aqui o telefone de contato do comprador.
        parameters.put(PayU.PARAMETERS.BUYER_CONTACT_PHONE, "7563126");
        // Coloque aqui o documento de identificação do comprador.
        parameters.put(PayU.PARAMETERS.BUYER_DNI, "123456789");

        // Coloque aqui o endereço do comprador.
        parameters.put(PayU.PARAMETERS.BUYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
        parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
        parameters.put(PayU.PARAMETERS.BUYER_CITY, "RM");
        parameters.put(PayU.PARAMETERS.BUYER_STATE, "Talagante");
        parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CL");
        parameters.put(PayU.PARAMETERS.BUYER_POSTAL_CODE, "000000");
        parameters.put(PayU.PARAMETERS.BUYER_PHONE, "7563126");


        // -- Pagador --
        // Coloque aqui o ID do pagador.
        parameters.put(PayU.PARAMETERS.PAYER_ID, "1");
        // Coloque aqui o nome do pagador.
        parameters.put(PayU.PARAMETERS.PAYER_NAME, "First name and second payer name");
        // Coloque aqui o email do pagador.
        parameters.put(PayU.PARAMETERS.PAYER_EMAIL, "payer_test@test.com");
        // Coloque aqui o telefone de contato do pagador.
        parameters.put(PayU.PARAMETERS.PAYER_CONTACT_PHONE, "7563126");
        // Coloque aqui o documento de identificação do pagador
        parameters.put(PayU.PARAMETERS.PAYER_DNI, "5415668464654");
        // Coloque aqui o endereço do pagador.
        parameters.put(PayU.PARAMETERS.PAYER_STREET, "Autopista Del Sol, 0 - Km.43 Costado Sur");
        parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
        parameters.put(PayU.PARAMETERS.PAYER_CITY, "RM");
        parameters.put(PayU.PARAMETERS.PAYER_STATE, "Talagante");
        parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CL");
        parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
        parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

        // Enter the network callback URL here.
        parameters.put(PayU.PARAMETERS.NETWORK_CALLBACK_URL, "1");
        // Coloque aqui o nome do pais.
        parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CL.name());

        // Coloque aqui o nome do método de pagamento em dinheiro.
        parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "MULTICAJA");

        // Coloque aqui a data de vencimento do pagamento
        parameters.put(PayU.PARAMETERS.EXPIRATION_DATE, "2021-07-01T20:00:00");
        
        // O IP do pagador
        parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
        
        // Pedido de autorização
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

### Chamada de método {#method-call}
A seguir estão o corpo do pedido e da resposta deste meio de pagamento.


-->
## Consulta de métodos de pagamento disponíveis {#available-payment-methods-query}
Este método gera uma lista dos métodos de pagamento disponíveis em todos os países.

### Chamada de método {#method-call}
Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

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

### Chamada de método {#method-call-1}
Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

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
