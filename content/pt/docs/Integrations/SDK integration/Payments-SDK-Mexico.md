---
title: "SDK de Pagamentos - México"
linkTitle: "SDK de Pagamentos - México"
date: 2021-05-03T15:48:08-05:00
description: >
  SDK de Pagamentos do México permite que sua loja processe diferentes tipos de transações com vários métodos de pagamento.
weight: 50
tags: ["subtopic"]
---

Para integrar com o SDK de Pagamentos do México, direcione sua solicitação para as seguintes URLs:

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

* [Enviar transação com cartão de crédito]({{< ref "#submit-transaction-with-credit-card" >}})
* [Enviar transação em dinheiro]({{< ref "#submit-transaction-with-cash" >}})
* [Enviar transação com transferência bancária]({{< ref "#submit-transaction-with-bank-transfer" >}})
* [Enviar a transação com referência do banco]({{< ref "#submit-transaction-with-bank-reference" >}})
* [Consulta de métodos de pagamento disponíveis]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Observação" color="info"%}}
Para confirmar o status de uma transação, você pode usar o [SDK de Consultas]({{< ref "QueriesSDK.md" >}}).
{{% /alert %}}

## Enviar transação com cartão de crédito {#submit-transaction-with-credit-cards}
Este método permite processar os pagamentos efetuados com cartão de crédito pelos seus clientes. Para o México, você pode executar os fluxos de duas etapas, você pode executar os fluxos de duas etapas (**Autorização**, **Captura**) e fluxos de uma etapa (**Cobrança**). Para obter mais informações, consulte [Fluxos de pagamento]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Observação" color="info"%}}
Os fluxos de duas etapas são compatíveis apenas com Mastercard e Visa.
{{% /alert %}}

### Observações {#considerations}
* Enviar um método de pagamento com cartão de crédito válido, [Veja os métodos de pagamento disponíveis no México]({{< ref "select-your-payment-method.html#Mexico" >}}).
* Para pagamentos com Promoções, envie os parâmetros `INSTALLMENTS_NUMBER` e `PROMOTION_ID` com o número de parcelas selecionadas e o ID da promoção. Consultar a [API de promoções]({{< ref "Promotions.md" >}}) para obter mais informações.
* Ao usar MSI, promoções ou parcelamento, sempre exibir a frase **"PAGOS DIFERIDOS"** durante o processo de pagamento.
* Quando forem aplicadas parcelas (taxas assumidas pelo pagador), exibir o valor original da transação, o valor total após as taxas, a quantidade de parcelas e o valor por parcela, incluindo a taxa extra.
* O recurso de promoções está disponível apenas para [fluxos de uma etapa]({{< ref "Payments.md#payment-flows" >}}).
* Para pagamentos com tokens de cartão de crédito, inclua os parâmetros `TOKEN_ID` e `CREDIT_CARD_SECURITY_CODE` (se processar com código de segurança) substituindo as informações do cartão de crédito. Para obter mais informações, consulte [SDK de Tokenização]({{< ref "TokenizationSDK.md" >}}).
* Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas. Depois que esse recurso for habilitado para você, envie no pedido o parâmetro `PROCESS_WITHOUT_CVV2` como true e remova o parâmetro `CREDIT_CARD_SECURITY_CODE`.

### Autorização {#authorization}
Use este método para executar a etapa **Autorização** de um fluxo de duas etapas usando Mastercard ou Visa. Nesta etapa, você autoriza o pagamento, mas o valor não é debitado até você [capturar]({{< ref "#capture" >}}) os fundos.<br>Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação. 

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da conta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512324");
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
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.MXN.name());

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
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "MX");
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
// Coloque aquí a data de nascimento do pagador 
parameters.put(PayU.PARAMETERS.PAYER_BIRTH_DATE, "1994-06-21");
// Coloque aqui o endereço do pagador.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// -- Dados do cartão de crédito --
// Coloque aqui o número do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4097440000000004");
// Coloque aqui a data de vencimento do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2022/12");
// Coloque aqui o código de segurança do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "321");
// Coloque aqui o nome do cartão de crédito
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");

// Coloque aqui o número de parcelas.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Coloque aqui o nome do pais.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.MX.name());


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
	PayUParameters::ACCOUNT_ID => "512324",
	// Coloque aqui o código de referência.
	PayUParameters::REFERENCE_CODE => $reference,
	// Coloque aqui a descrição.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
        // Coloque aqui o valor.
	PayUParameters::VALUE => $value,
	// Coloque aqui a moeda.
	PayUParameters::CURRENCY => "MXN",

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
	PayUParameters::BUYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Cuernavaca",
	PayUParameters::BUYER_STATE => "Morelos",
	PayUParameters::BUYER_COUNTRY => "MX",
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
	// Coloque aquí a data de nascimento do pagador 
  PayUParameters::PAYER_BIRTH_DATE => "1994-06-21"),
	// Coloque aqui o endereço do pagador.
	PayUParameters::PAYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "Cuernavaca",
	PayUParameters::PAYER_STATE => "Morelos",
	PayUParameters::PAYER_COUNTRY => "MX",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// -- Dados do cartão de crédito --
        // Coloque aqui o número do cartão de crédito
	PayUParameters::CREDIT_CARD_NUMBER => "4097440000000004",
	// Coloque aqui a data de vencimento do cartão de crédito
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2022/12",
	// Coloque aqui o código de segurança do cartão de crédito
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "321",
	// Coloque aqui o nome do cartão de crédito
	PayUParameters::PAYMENT_METHOD => "VISA",

	// Coloque aqui o número de parcelas.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Coloque aqui o nome do pais.
	PayUParameters::COUNTRY => PayUCountries::MX,

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
Use este método para executar a etapa **Captura** de um fluxo de duas etapas usando Mastercard e Visa. Nesta etapa, você captura os fundos [Autorizados]({{< ref "#authorization" >}}) anteriormente para transferi-los para sua conta PayU.

#### Observações {#considerations-1}
Leve em conta as seguintes informações para captura.
* O tempo máximo para capturar uma transação aprovada é de 30 dias. Após este período, a transação é automaticamente cancelada.
* Apenas os parâmetros exibidos no corpo da solicitação são obrigatórios para invocar uma transação de Captura. Lembre-se de que os IDs da ordem e da transação devem corresponder a uma transação atualmente autorizada.

Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação. 

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da ordem.
parameters.put(PayU.PARAMETERS.ORDER_ID, "1400469033");
// Coloque aqui o identificador da transação.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "f432b9ba-a692-4350-b8c6-2348e1e21a6c");
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
	PayUParameters::ACCOUNT_ID => "512324",
	// Coloque aqui o identificador da ordem.
	PayUParameters::ORDER_ID => "1400469033",
	// Coloque aqui o identificador da transação.
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

Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da conta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512324");
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
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.MXN.name());

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
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "MX");
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
// Coloque aquí a data de nascimento do pagador 
parameters.put(PayU.PARAMETERS.PAYER_BIRTH_DATE, "1994-06-21");
// Coloque aqui o endereço do pagador.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// -- Dados do cartão de crédito --
// Coloque aqui o número do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4097440000000004");
// Coloque aqui a data de vencimento do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2022/12");
// Coloque aqui o código de segurança do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "321");
// Coloque aqui o nome do cartão de crédito
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");

// Coloque aqui o número de parcelas.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Coloque aqui o nome do pais.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.MX.name());


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
	PayUParameters::ACCOUNT_ID => "512324",
	// Coloque aqui o código de referência.
	PayUParameters::REFERENCE_CODE => $reference,
	// Coloque aqui a descrição.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
        // Coloque aqui o valor.
	PayUParameters::VALUE => $value,
	// Coloque aqui a moeda.
	PayUParameters::CURRENCY => "MXN",

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
	PayUParameters::BUYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Cuernavaca",
	PayUParameters::BUYER_STATE => "Morelos",
	PayUParameters::BUYER_COUNTRY => "MX",
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
	// Coloque aquí a data de nascimento do pagador 
  PayUParameters::PAYER_BIRTH_DATE => "1994-06-21"),
	// Coloque aqui o endereço do pagador.
	PayUParameters::PAYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "Cuernavaca",
	PayUParameters::PAYER_STATE => "Morelos",
	PayUParameters::PAYER_COUNTRY => "MX",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// -- Dados do cartão de crédito --
        // Coloque aqui o número do cartão de crédito
	PayUParameters::CREDIT_CARD_NUMBER => "4097440000000004",
	// Coloque aqui a data de vencimento do cartão de crédito
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2022/12",
	// Coloque aqui o código de segurança do cartão de crédito
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "321",
	// Coloque aqui o nome do cartão de crédito
	PayUParameters::PAYMENT_METHOD => "VISA",

	// Coloque aqui o número de parcelas.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Coloque aqui o nome do pais.
	PayUParameters::COUNTRY => PayUCountries::MX,

	// Device Session ID
	PayUParameters::DEVICE_SESSION_ID => "vghs6tvkcle931686k1900o6e1",
	// O IP do pagador
	PayUParameters::IP_ADDRESS => "127.0.0.1",
	// Cookie da sessão atual
	PayUParameters::PAYER_COOKIE=>"pt1t38347bs6jc9ruv2ecpv7o2",
	// User agent da sessão atual
	PayUParameters::USER_AGENT=>"Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
	);

// Pedido de "Autorização e captura" 
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

## Enviar transação em dinheiro {#submit-transaction-with-cash}
Este método permite processar os pagamentos de seus clientes em dinheiro. Para integrar com transações em dinheiro, você deve redirecionar o cliente para a URL encontrada na resposta do método; Seu cliente verá um recibo de pagamento como este.

<img src="/assets/Payments/CashReceiptMX.png" alt="PrintScreen" width="50%">

### Observações {#considerations-2}
* Enviar um método de pagamento válido em dinheiro, [Veja os métodos de pagamento disponíveis no México]({{< ref "select-your-payment-method.html#Mexico" >}}).
* O parâmetro `EXPIRATION_DATE` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de 7 dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* Quando o método de pagamento é `OXXO`, a confirmação do pagamento será feita um dia após o pagamento. Para outros métodos de pagamento em dinheiro, a confirmação é feita online.
* Os parâmetros extras têm os seguintes dados relacionados à transação:
   - **BANK_REFERENCED_CODE**: payment type.
   - **EXPIRATION_DATE**: prazo máximo para o pagador fazer o pagamento.
   - **BAR_CODE**: código de barras que permite ao pagador efetuar o pagamento.
   - **REFERENCE**: referência interna de pagamento gerada pelo PayU. 
   - **URL_PAYMENT_RECEIPT_HTML**: comprovante de pagamento em formato HTML. É para cá que você precisa redirecionar o pagamento quando o pagador seleciona o pagamento em dinheiro. 
   - **URL_PAYMENT_RECEIPT_PDF**: comprovante de pagamento em formato PDF.
   - **PAYMENT_WAY_ID**: network payment of the payment type.

### Chamada de método {#method-call}
Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

{{< tabs tabTotal="2" tabID="5" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da conta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512324");
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
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.MXN.name());

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
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "MX");
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
// Coloque aquí a data de nascimento do pagador 
parameters.put(PayU.PARAMETERS.PAYER_BIRTH_DATE, "1994-06-21");
// Coloque aqui o endereço do pagador.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// Coloque aqui o nome do método de pagamento em dinheiro
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "OXXO");

// Coloque aqui o nome do pais.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.MX.name());

// Coloque aqui a data de vencimento do pagamento
parameters.put(PayU.PARAMETERS.EXPIRATION_DATE, "2021-07-01T20:00:00");

// O IP do pagador
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");

// Pedido de autorização
TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);

// Você pode obter as propriedades na resposta
if(response != null){
	response.getOrderId();
  response.getTransactionId();
  response.getState();
  if(response.getState().equals(TransactionState.PENDING)){
		response.getPendingReason();
		Map extraParameters = response.getExtraParameters();

		// Obter a URL de recibo de pagamento
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
	// Coloque aqui o identificador da conta
	PayUParameters::ACCOUNT_ID => "512324",
	// Coloque aqui o código de referência.
	PayUParameters::REFERENCE_CODE => $reference,
	// Coloque aqui a descrição.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
        // Coloque aqui o valor.
	PayUParameters::VALUE => $value,
	// Coloque aqui a moeda.
	PayUParameters::CURRENCY => "MXN",

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
	PayUParameters::BUYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Cuernavaca",
	PayUParameters::BUYER_STATE => "Morelos",
	PayUParameters::BUYER_COUNTRY => "MX",
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
	// Coloque aquí a data de nascimento do pagador 
  PayUParameters::PAYER_BIRTH_DATE => "1994-06-21"),
	// Coloque aqui o endereço do pagador.
	PayUParameters::PAYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "Cuernavaca",
	PayUParameters::PAYER_STATE => "Morelos",
	PayUParameters::PAYER_COUNTRY => "MX",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// Coloque aqui o nome do método de pagamento em dinheiro
	PayUParameters::PAYMENT_METHOD => "OXXO",

	// Coloque aqui o nome do pais.
	PayUParameters::COUNTRY => PayUCountries::MX,

	// Coloque aqui a data de vencimento do pagamento
	PayUParameters::PARAMETERS.EXPIRATION_DATE => "2021-07-01T20:00:00",
  
	// O IP do pagador
	PayUParameters::IP_ADDRESS => "127.0.0.1"
	);

// Pedido de "Autorização e captura" 
$response = PayUPayments::doAuthorizationAndCapture($parameters);

// Você pode obter as propriedades na resposta
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

### Observações {#considerations-3}
* O parâmetro `EXPIRATION_DATE` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de 7 dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* Quando o pagador seleciona este método de pagamento, o PayU cria uma ordem no estado _Em andamento_ e uma transação no estado `PENDING`.
* Para efetuar o pagamento, o pagador deve se cadastrar na agência virtual de seu banco (O banco deve constar na lista de bancos disponíveis no SPEI). <br>Primeiro, o pagador deve registrar a conta PayU CLABE em sua agência bancária. Assim que a conta PayU CLABE estiver habilitada para realizar transferências, o pagador deve fornecer a referência retornada pelo PayU no parâmetro `trazabilityCode` e o valor devolvido pela PayU em sua agência virtual.
* No corpo da resposta, você encontra as variáveis necessárias para gerar o comprovante de pagamento (voucher) e a URL do comprovante gerado pelo PayU em formato HTML e PDF. Se você deseja gerar o voucher, use as seguintes variáveis:
  - **trazabilityCode**: identificador único com no máximo 7 dígitos; corresponde à referência de pagamento que o pagador deve fornecer na agência virtual. É obrigatório inserir o mesmo valor no campo de referência da agência bancária para que o pagamento seja efetuado com sucesso.
  - **value**: o pagador deve inserir como valor da transferência o mesmo valor informado na solicitação para que o pagamento seja efetuado com sucesso.
  - **SPEI_CLABE_ACCOUNT_NUMBER**: é a CLABE interbancária do PayU, ou seja, a conta para onde o valor será transferido. O pagador deve cadastrar este CLABE como beneficiário em sua agência bancária antes de realizar a transferência.
  - **SPEI_BANK_NAME**: nome associado à conta PayU CLABE. A conta do beneficiário está associada ao banco STP, que é sempre o mesmo banco para o PayU.

### Chamada de método {#method-call-1}
Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

{{< tabs tabTotal="2" tabID="6" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da conta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512324");
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
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.MXN.name());

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
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "MX");
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
// Coloque aquí a data de nascimento do pagador 
parameters.put(PayU.PARAMETERS.PAYER_BIRTH_DATE, "1994-06-21");
// Coloque aqui o endereço do pagador.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// Coloque aqui o nome do método de pagamento em dinheiro
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "SPEI");

// Coloque aqui o nome do pais.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.MX.name());

// Coloque aqui a data de vencimento do pagamento
parameters.put(PayU.PARAMETERS.EXPIRATION_DATE, "2021-07-01T20:00:00");

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
  if(response.getState().equals(TransactionState.PENDING)){
		response.getPendingReason();
		Map extraParameters = response.getExtraParameters();

		// Obter a URL de recibo de pagamento
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
	// Coloque aqui o identificador da conta
	PayUParameters::ACCOUNT_ID => "512324",
	// Coloque aqui o código de referência.
	PayUParameters::REFERENCE_CODE => $reference,
	// Coloque aqui a descrição.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
        // Coloque aqui o valor.
	PayUParameters::VALUE => $value,
	// Coloque aqui a moeda.
	PayUParameters::CURRENCY => "MXN",

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
	PayUParameters::BUYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Cuernavaca",
	PayUParameters::BUYER_STATE => "Morelos",
	PayUParameters::BUYER_COUNTRY => "MX",
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
	// Coloque aquí a data de nascimento do pagador 
  PayUParameters::PAYER_BIRTH_DATE => "1994-06-21"),
	// Coloque aqui o endereço do pagador.
	PayUParameters::PAYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "Cuernavaca",
	PayUParameters::PAYER_STATE => "Morelos",
	PayUParameters::PAYER_COUNTRY => "MX",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// Coloque aqui o nome do método de pagamento em dinheiro
	PayUParameters::PAYMENT_METHOD => "SPEI",

	// Coloque aqui o nome do pais.
	PayUParameters::COUNTRY => PayUCountries::MX,

	// Coloque aqui a data de vencimento do pagamento
	PayUParameters::PARAMETERS.EXPIRATION_DATE => "2021-07-01T20:00:00",
  
	// Device Session ID
	PayUParameters::DEVICE_SESSION_ID => "vghs6tvkcle931686k1900o6e1",
	// O IP do pagador
	PayUParameters::IP_ADDRESS => "127.0.0.1",
	// Cookie da sessão atual
	PayUParameters::PAYER_COOKIE=>"pt1t38347bs6jc9ruv2ecpv7o2",
	// User agent da sessão atual
	PayUParameters::USER_AGENT=>"Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
	);

// Pedido de "Autorização e captura" 
$response = PayUPayments::doAuthorizationAndCapture($parameters);

// Você pode obter as propriedades na resposta
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

## Enviar a transação com referência do banco {#submit-transaction-with-bank-reference}
Este método permite processar pagamentos de seus clientes usando referências do banco. Para se integrar a essas transações, você deve redirecionar o cliente para a URL encontrada na resposta do método.

<img src="/assets/Payments/BankReferenceReceiptMX.png" alt="PrintScreen" width="50%">

### Observações {#considerations-4}
* O parâmetro `EXPIRATION_DATE` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de 7 dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* Os parâmetros extras têm os seguintes dados relacionados à transação:
   - **REFERENCE**: referência interna de pagamento gerada pelo PayU.
   - **EXPIRATION_DATE**: prazo máximo para o pagador fazer o pagamento.
   - **BAR_CODE**: código de barras que permite ao pagador efetuar o pagamento. 
   - **URL_PAYMENT_RECEIPT_HTML**: comprovante de pagamento em formato HTML. É aqui que você precisa redirecionar o pagamento quando o pagador seleciona o pagamento de referência do banco. 
   - **URL_PAYMENT_RECEIPT_PDF**: comprovante de pagamento em formato PDF.

### Chamada de método {#method-call-2}
A seguir estão o corpo do pedido e da resposta deste meio de pagamento.

{{< tabs tabTotal="2" tabID="7" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
String reference = "payment_test_00000001";
String value= "1000";

Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da conta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512324");
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
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.MXN.name());

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
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "MX");
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
// Coloque aquí a data de nascimento do pagador 
parameters.put(PayU.PARAMETERS.PAYER_BIRTH_DATE, "1994-06-21");
// Coloque aqui o endereço do pagador.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Av. Domingo Diez 1589");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Cuernavaca");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Morelos");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "MX");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// Coloque aqui o nome do método de pagamento em dinheiro
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "BANK_REFERENCED");

// Coloque aqui o nome do pais.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.MX.name());

// Coloque aqui a data de vencimento do pagamento
parameters.put(PayU.PARAMETERS.EXPIRATION_DATE, "2021-07-01T20:00:00");

// O IP do pagador
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");

// Pedido de autorização
TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);

// Você pode obter as propriedades na resposta
if(response != null){
	response.getOrderId();
  response.getTransactionId();
  response.getState();
  if(response.getState().equals(TransactionState.PENDING)){
		response.getPendingReason();
		Map extraParameters = response.getExtraParameters();

		// Obter a URL de recibo de pagamento
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
	// Coloque aqui o identificador da conta
	PayUParameters::ACCOUNT_ID => "512324",
	// Coloque aqui o código de referência.
	PayUParameters::REFERENCE_CODE => $reference,
	// Coloque aqui a descrição.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
        // Coloque aqui o valor.
	PayUParameters::VALUE => $value,
	// Coloque aqui a moeda.
	PayUParameters::CURRENCY => "MXN",

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
	PayUParameters::BUYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "Cuernavaca",
	PayUParameters::BUYER_STATE => "Morelos",
	PayUParameters::BUYER_COUNTRY => "MX",
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
	// Coloque aquí a data de nascimento do pagador 
  PayUParameters::PAYER_BIRTH_DATE => "1994-06-21"),
	// Coloque aqui o endereço do pagador.
	PayUParameters::PAYER_STREET => "Av. Domingo Diez 1589",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "Cuernavaca",
	PayUParameters::PAYER_STATE => "Morelos",
	PayUParameters::PAYER_COUNTRY => "MX",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// Coloque aqui o nome do método de pagamento em dinheiro
	PayUParameters::PAYMENT_METHOD => "BANK_REFERENCED",

	// Coloque aqui o nome do pais.
	PayUParameters::COUNTRY => PayUCountries::MX,

	// Coloque aqui a data de vencimento do pagamento
	PayUParameters::PARAMETERS.EXPIRATION_DATE => "2021-07-01T20:00:00",
  
	// O IP do pagador
	PayUParameters::IP_ADDRESS => "127.0.0.1"
	);

// Pedido de "Autorização e captura" 
$response = PayUPayments::doAuthorizationAndCapture($parameters);

// Você pode obter as propriedades na resposta
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

### Chamada de método {#method-call-3}
Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação. 

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

### Chamada de método {#method-call-4}
Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

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
