---
title: "SDK de Pagamentos - Colômbia"
linkTitle: "SDK de Pagamentos - Colômbia"
date: 2021-05-03T15:48:08-05:00
description: >
  SDK de Pagamentos da Colômbia permite que sua loja processe diferentes tipos de transações com vários métodos de pagamento.
weight: 40
tags: ["subtopic"]
---

Para integrar com o SDK de Pagamentos da Colômbia, direcione sua solicitação para as seguintes URLs:

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
* [Enviar transação em dinheiro ou referência bancária]({{< ref "#submit-transaction-with-cash-or-bank-reference" >}})
* [Enviar transação com transferência bancária]({{< ref "#submit-transaction-with-bank-transfer" >}})
* [Lista de bancos - PSE]({{< ref "#bank-list---pse" >}})
* [Consulta de métodos de pagamento disponíveis]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Observação" color="info"%}}
Para confirmar o status de uma transação, você pode usar o [SDK de Consultas]({{< ref "QueriesSDK.md" >}}).
{{% /alert %}}

## Enviar transação com cartão de crédito {#submit-transaction-with-credit-cards}
Este método permite processar os pagamentos efetuados com cartão de crédito pelos seus clientes. Para a Colômbia, você pode fazer fluxos de uma etapa (**Cobrança**). Para obter mais informações, consulte [Fluxos de pagamento]({{< ref "payments.md#payment-flows" >}}).

### Observações {#considerations}
* Enviar um método de pagamento com cartão de crédito válido, [Veja os métodos de pagamento disponíveis na Colômbia]({{< ref "select-your-payment-method.html#Colombia" >}}).
* Para pagamentos com tokens de cartão de crédito, inclua os parâmetros `TOKEN_ID` e `CREDIT_CARD_SECURITY_CODE` (se processar com código de segurança) substituindo as informações do cartão de crédito. Para obter mais informações, consulte [SDK de Tokenização]({{< ref "TokenizationSDK.md" >}}).
* Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas. Depois que esse recurso for habilitado para você, envie no pedido o parâmetro `PROCESS_WITHOUT_CVV2` como true e remova o parâmetro `CREDIT_CARD_SECURITY_CODE`.
* No cartão Crédito Fácil Codensa, o número de parcelas aceitas é de 1 a 12, 18, 24, 36 e 48.
* No cartão Crédito Fácil Codensa, o pagador pode escolher qualquer um dos seguintes tipos de documentos para a variável `PAYER_DNI_TYPE`:

| ISO | Descrição                                                                             |
|:---:|---------------------------------------------------------------------------------------|
|  CC | Cartão de cidadania.                                                                  |
|  CE | Cartão de cidadão estrangeiro.                                                        |
| NIT | Número de identificação fiscal (empresas).                                            |
|  TI | Cartão de identidade.                                                                 |
|  PP | Passaporte.                                                                           |
| IDC | Client´s unique identifier, in the case of unique customer / ID de conta de serviços. |
| CEL | Quando identificado pela linha móvel.                                                 |
|  RC | Certidão de nascimento.                                                               |
|  DE | Documento de identificação de estrangeiro.                                            |

### Chamada de método {#method-call}
Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "65000";

Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da conta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512321");
// Coloque aqui o código de referência.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
// Coloque aqui a descrição.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Coloque aqui o idioma da ordem.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Valores --
// Coloque aqui o valor.
parameters.put(PayU.PARAMETERS.VALUE, ""+value);
// Coloque aqui o valor do IVA (Imposto sobre o Valor Acrescentado valido para a Colômbia) da transação,
// se nenhum IVA for enviado, o sistema aplica 19% automaticamente. Ele pode conter dois dígitos decimais.
// Exemplo 19000.00. Caso você não tenha IVA, defina 0.
parameters.put(PayU.PARAMETERS.TAX_VALUE, "10378");
// Coloque aqui o valor do valor base sobre o qual o IVA (válido apenas para a Colômbia) é calculado.
// Caso você não tenha IVA, defina 0.
parameters.put(PayU.PARAMETERS.TAX_RETURN_BASE, "54622");
// Coloque aqui a moeda.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.COP.name());

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
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CO");
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
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CO");
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
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CO.name());


// Device Session ID
parameters.put(PayU.PARAMETERS.DEVICE_SESSION_ID, "vghs6tvkcle931686k1900o6e1");
// O IP do pagador
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
// Cookie da sessão atual.
parameters.put(PayU.PARAMETERS.COOKIE, "pt1t38347bs6jc9ruv2ecpv7o2");
// User agent da sessão atual.
parameters.put(PayU.PARAMETERS.USER_AGENT, "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0");

// Pedido de "Autorização e captura" 
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
$value = "65000";

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
  // Coloque aqui o valor do IVA (Imposto sobre o Valor Acrescentado valido para a Colômbia) da transação,
  // se nenhum IVA for enviado, o sistema aplica 19% automaticamente. Ele pode conter dois dígitos decimais.
  // Exemplo 19000.00. Caso você não tenha IVA, defina 0.
  PayUParameters::TAX_VALUE => "10378",
  // Coloque aqui o valor do valor base sobre o qual o IVA (válido apenas para a Colômbia) é calculado.
  // Caso você não tenha IVA, defina 0.
  PayUParameters::TAX_RETURN_BASE => "54622",
	// Coloque aqui a moeda.
	PayUParameters::CURRENCY => "COP",

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
	PayUParameters::BUYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "BOGOTÁ",
	PayUParameters::BUYER_STATE => "Bogotá D.C",
	PayUParameters::BUYER_COUNTRY => "CO",
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
	PayUParameters::PAYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "BOGOTÁ",
	PayUParameters::PAYER_STATE => "Bogotá D.C",
	PayUParameters::PAYER_COUNTRY => "CO",
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
	PayUParameters::COUNTRY => PayUCountries::CO,

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

## Enviar transação em dinheiro {#submit-transaction-with-cash} ou referência bancária
Este método permite processar os pagamentos de seus clientes em dinheiro ou usando uma referência bancária. Para integrar com transações em dinheiro, você deve redirecionar o cliente para a URL encontrada na resposta do método; Seu cliente verá um recibo de pagamento como o seguinte.

#### Pagamentos em dinheiro {#payments-in-cash}
<img src="/assets/Payments/CashReceiptCO.png" alt="PrintScreen" width="75%">

#### Pagamentos com referência bancária {#payments-with-bank-reference}
<img src="/assets/Payments/BankReferenceReceiptCO.png" alt="PrintScreen" width="75%">

### Observações {#considerations-1}
* Enviar um método de pagamento válido em dinheiro, [Veja os métodos de pagamento disponíveis na Colômbia]({{< ref "select-your-payment-method.html#Colombia" >}}). O método `OTHERS_CASH` não é compatível.
* O parâmetro `EXPIRATION_DATE` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de 7 dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* Para <!--`BALOTO` e -->`EFECTY`, a confirmação do pagamento leva 15 minutos. Para `BANK_REFERENCED`, a confirmação é feita online.
* Os valores mínimo e máximo <!--para `BALOTO` e -->`EFECTY` são Mín: $20.000 COP - Máx: $6.000.000 COP.
  <!-- - `BALOTO` > Mín: $3.000 COP - Máx: $1.000.000 COP
   - `EFECTY` > Mín: $20.000 COP - Máx: $6.000.000 COP -->
* Os parâmetros extras têm os seguintes dados relacionados à transação:
   - **EXPIRATION_DATE**: prazo máximo para o pagador fazer o pagamento 
   - **REFERENCE**: referência interna de pagamento gerada pelo PayU.
   - **URL_PAYMENT_RECEIPT_HTML**: comprovante de pagamento em formato HTML. É para cá que você precisa redirecionar o pagamento quando o pagador seleciona o pagamento em dinheiro. 
   - **URL_PAYMENT_RECEIPT_PDF**: comprovante de pagamento em formato PDF.
   - **BANCO_BOGOTA_SERVICE_CODE**: código de pagamento para Banco de Bogotá. Available ao usar `BANK_REFERENCED`.
   - **BANK_REFERENCED_NAME**: Nome de referência para Bancolombia. Available ao usar `BANK_REFERENCED`.
   - **BANCOLOMBIA_SERVICE_CODE**: código de pagamento para Bancolombia. Available ao usar `BANK_REFERENCED`.

### Chamada de método {#method-call-1}
Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "65000";

Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da conta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512321");
// Coloque aqui o código de referência.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
// Coloque aqui a descrição.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Coloque aqui o idioma da ordem.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Valores --
// Coloque aqui o valor.
parameters.put(PayU.PARAMETERS.VALUE, ""+value);
// Coloque aqui o valor do IVA (Imposto sobre o Valor Acrescentado valido para a Colômbia) da transação,
// se nenhum IVA for enviado, o sistema aplica 19% automaticamente. Ele pode conter dois dígitos decimais.
// Exemplo 19000.00. Caso você não tenha IVA, defina 0.
parameters.put(PayU.PARAMETERS.TAX_VALUE, "10378");
// Coloque aqui o valor do valor base sobre o qual o IVA (válido apenas para a Colômbia) é calculado.
// Caso você não tenha IVA, defina 0.
parameters.put(PayU.PARAMETERS.TAX_RETURN_BASE, "54622");
// Coloque aqui a moeda.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.COP.name());

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
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CO");
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
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CO");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

// Coloque aqui o nome do método de pagamento em dinheiro.
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "EFECTY");

// Coloque aqui a data de vencimento do pagamento
parameters.put(PayU.PARAMETERS.EXPIRATION_DATE, "2021-07-01T20:00:00");

// Coloque aqui o nome do pais.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CO.name());


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

// Resposta
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
	// Coloque aqui o identificador da conta
	PayUParameters::ACCOUNT_ID => "512325",
	// Coloque aqui o código de referência.
	PayUParameters::REFERENCE_CODE => $reference,
	// Coloque aqui a descrição.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
        // Coloque aqui o valor.
	PayUParameters::VALUE => $value,
  // Coloque aqui o valor do IVA (Imposto sobre o Valor Acrescentado valido para a Colômbia) da transação,
  // se nenhum IVA for enviado, o sistema aplica 19% automaticamente. Ele pode conter dois dígitos decimais.
  // Exemplo 19000.00. Caso você não tenha IVA, defina 0.
  PayUParameters::TAX_VALUE => "10378",
  // Coloque aqui o valor do valor base sobre o qual o IVA (válido apenas para a Colômbia) é calculado.
  // Caso você não tenha IVA, defina 0.
  PayUParameters::TAX_RETURN_BASE => "54622",
	// Coloque aqui a moeda.
	PayUParameters::CURRENCY => "COP",

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
	PayUParameters::BUYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "BOGOTÁ",
	PayUParameters::BUYER_STATE => "Bogotá D.C",
	PayUParameters::BUYER_COUNTRY => "CO",
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
	PayUParameters::PAYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "BOGOTÁ",
	PayUParameters::PAYER_STATE => "Bogotá D.C",
	PayUParameters::PAYER_COUNTRY => "CO",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	// Coloque aqui o nome do método de pagamento em dinheiro
	PayUParameters::PAYMENT_METHOD => "EFECTY",

  // Coloque aqui a data de vencimento do pagamento
	PayUParameters::EXPIRATION_DATE => "2021-07-01T20:00:00",

	// Coloque aqui o nome do pais.
	PayUParameters::COUNTRY => PayUCountries::CO,

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

1. Consulte a lista de bancos disponíveis para mostrá-los ao pagador. Para consultar a lista de bancos, [consulte este método]({{< ref "#bank-list---pse" >}}).

2. Apresente a lista de bancos conforme exibido abaixo:

<img src="/assets/Payments/PSEBankList_PT.png" alt="PrintScreen" width="50%"><br>

Quando o pagador seleciona um banco, você deve enviar o parâmetro `pseCode` da seleção no parâmetro extra `FINANCIAL_INSTITUTION_CODE` no pedido.

3. Apresente uma lista para permitir que o pagador escolha se é uma pessoa _Física_ ou _Jurídica_. Dependendo da escolha do pagador, deve-se enviar o valor no parâmetro `PAYER_PERSON_TYPE` no pedido. A lista deve ser exibida da seguinte forma:

<img src="/assets/Payments/PSEPersonList_PT.png" alt="PrintScreen" width="50%"><br>

O valor selecionado deve ser enviado da seguinte forma:
* Java: `PersonType.NATURAL.toString()` (N) ou `PersonType.LEGAL.toString()` (J).
* PHP: `N` ou `J`.

4. Mostre uma lista para permitir que o pagador escolha um tipo de identificação. Você deve enviar o código ISO do valor selecionado no parameter `PAYER_DOCUMENT_TYPE` no pedido. A lista deve ser exibida da seguinte forma:

<img src="/assets/Payments/PSEDocType_PT.png" alt="PrintScreen" width="50%"><br>

A lista de documentos disponíveis é:

| ISO | Descrição                                                                             |
|:---:|---------------------------------------------------------------------------------------|
|  CC | Cartão de cidadania.                                                                  |
|  CE | Cartão de cidadão estrangeiro.                                                        |
| NIT | Número de identificação fiscal (empresas).                                            |
|  TI | Cartão de identidade.                                                                 |
|  PP | Passaporte.                                                                           |
| IDC | Client´s unique identifier, in the case of unique customer / ID de conta de serviços. |
| CEL | Quando identificado pela linha móvel.                                                 |
|  RC | Certidão de nascimento.                                                               |
|  DE | Documento de identificação de estrangeiro.                                            |

5. Você deve enviar o número de identificação do pagador no parâmetro extra `PAYER_DNI` no pedido.

### Observações {#considerations-2}
* Se a solicitação de pagamento for bem-sucedida, a transação tem estado `PENDING` e responseCode `PENDING_TRANSACTION_CONFIRMATION`; Isso ocorre porque o pagador é redirecionado ao banco selecionado para concluir o pagamento; Você deve redirecionar o pagador para a URL retornada no parâmetro extra `BANK_URL`.
* A URL retornada no parâmetro extra `BANK_URL` está configurada no Módulo PayU e deve apresentar as seguintes informações:<br><br>![PrintScreen](/assets/Payments/PSEresponse-pt.png)<br>Os parâmetros que começam com o símbolo $ são enviados via `GET`.
* Na página de resposta, você deve adicionar as opções para tentar novamente o pagamento, finalizar a transação e imprimir o comprovante.
* O status exibido na resposta page can be any of the following:

| polTransactionState | polResponseCode | Estado                                                                |
|---------------------|-----------------|----------------------------------------------------------------------|
| 4                   | 1               | Transação aprovada                                                 |
| 6                   | 5               | Transação falhou                                                   |
| 6                   | 4               | Transação rejeitada                                                 |
| 12 ou 14            | 9994 ou 25      | Transação pendente, verifique se o débito foi feito no banco. |

### Chamada de método {#method-call-2}
Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
String reference = "payment_test_00000001";
String value= "65000";

Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da conta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512321");
// Coloque aqui o código de referência.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, ""+reference);
// Coloque aqui a descrição.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Coloque aqui o idioma da ordem.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Valores --
// Coloque aqui o valor.
parameters.put(PayU.PARAMETERS.VALUE, ""+value);
// Coloque aqui o valor do IVA (Imposto sobre o Valor Acrescentado valido para a Colômbia) da transação,
// se nenhum IVA for enviado, o sistema aplica 19% automaticamente. Ele pode conter dois dígitos decimais.
// Exemplo 19000.00. Caso você não tenha IVA, defina 0.
parameters.put(PayU.PARAMETERS.TAX_VALUE, "10378");
// Coloque aqui o valor do valor base sobre o qual o IVA (válido apenas para a Colômbia) é calculado.
// Caso você não tenha IVA, defina 0.
parameters.put(PayU.PARAMETERS.TAX_RETURN_BASE, "54622");
// Coloque aqui a moeda.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.COP.name());

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
parameters.put(PayU.PARAMETERS.BUYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.BUYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.BUYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.BUYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.BUYER_COUNTRY, "CO");
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
// Coloque aqui o endereço do pagador.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Cr 23 No. 53-50");
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "5555487");
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Bogotá");
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Bogotá D.C");
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CO");
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "000000");
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "7563126");

//-- Informação obrigatória para PSE –
// Coloque aqui o código PSE do banco.
parameters.put(PayU.PARAMETERS.PSE_FINANCIAL_INSTITUTION_CODE, "1007");
// Coloque aqui o tipo de pessoa (Física ou legal).
parameters.put(PayU.PARAMETERS.PAYER_PERSON_TYPE, PersonType.NATURAL.toString());
// ou parameters.put(PayU.PARAMETERS.PAYER_PERSON_TYPE, PersonType.LEGAL.toString());
// Coloque aqui o documento de identificação do pagador
parameters.put(PayU.PARAMETERS.PAYER_DNI, "123456789");
// Coloque aqui o tipo de documento do pagador.
parameters.put(PayU.PARAMETERS.PAYER_DOCUMENT_TYPE, DocumentType.CC.toString());

// Coloque aqui o nome do método de pagamento
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "PSE");

// Coloque aqui o nome do pais.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CO.name());


// Device Session ID
parameters.put(PayU.PARAMETERS.DEVICE_SESSION_ID, "vghs6tvkcle931686k1900o6e1");
// O IP do pagador
parameters.put(PayU.PARAMETERS.IP_ADDRESS, "127.0.0.1");
// Cookie da sessão atual.
parameters.put(PayU.PARAMETERS.COOKIE, "pt1t38347bs6jc9ruv2ecpv7o2");
// User agent da sessão atual.
parameters.put(PayU.PARAMETERS.USER_AGENT, "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0");

// Resposta page to which the payer will be redirected.
parameters.put(PayU.PARAMETERS.RESPONSE_URL, "http://www.test.com/response");

// Pedido de "Autorização e captura" 
TransactionResponse response = PayUPayments.doAuthorizationAndCapture(parameters);

// Resposta
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
	// Coloque aqui o identificador da conta
	PayUParameters::ACCOUNT_ID => "512325",
	// Coloque aqui o código de referência.
	PayUParameters::REFERENCE_CODE => $reference,
	// Coloque aqui a descrição.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
        // Coloque aqui o valor.
	PayUParameters::VALUE => $value,
  // Coloque aqui o valor do IVA (Imposto sobre o Valor Acrescentado valido para a Colômbia) da transação,
  // se nenhum IVA for enviado, o sistema aplica 19% automaticamente. Ele pode conter dois dígitos decimais.
  // Exemplo 19000.00. Caso você não tenha IVA, defina 0.
  PayUParameters::TAX_VALUE => "10378",
  // Coloque aqui o valor do valor base sobre o qual o IVA (válido apenas para a Colômbia) é calculado.
  // Caso você não tenha IVA, defina 0.
  PayUParameters::TAX_RETURN_BASE => "54622",
	// Coloque aqui a moeda.
	PayUParameters::CURRENCY => "COP",

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
	PayUParameters::BUYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::BUYER_STREET_2 => "5555487",
	PayUParameters::BUYER_CITY => "BOGOTÁ",
	PayUParameters::BUYER_STATE => "Bogotá D.C",
	PayUParameters::BUYER_COUNTRY => "CO",
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
	PayUParameters::PAYER_STREET => "Cr 23 No. 53-50",
	PayUParameters::PAYER_STREET_2 => "5555487",
	PayUParameters::PAYER_CITY => "BOGOTÁ",
	PayUParameters::PAYER_STATE => "Bogotá D.C",
	PayUParameters::PAYER_COUNTRY => "CO",
	PayUParameters::PAYER_POSTAL_CODE => "000000",
	PayUParameters::PAYER_PHONE => "7563126",

	//-- Informação obrigatória para PSE –
  // Coloque aqui o código PSE do banco.
	PayUParameters::PSE_FINANCIAL_INSTITUTION_CODE => "1007",
  // Coloque aqui o tipo de pessoa (Natural ou legal).
	PayUParameters::PAYER_PERSON_TYPE => "N",
  // ou PayUParameters::PAYER_PERSON_TYPE => "J"
  // Coloque aqui o documento de identificação do pagador
	PayUParameters::PAYER_DNI => "123456789",
  // Coloque aqui o tipo de documento do pagador.
	PayUParameters::PAYER_DOCUMENT_TYPE => "CC",

  // Coloque aqui o nome do método de pagamento
	PayUParameters::PAYMENT_METHOD => "PSE",

	// Coloque aqui o nome do pais.
	PayUParameters::COUNTRY => PayUCountries::CO,

	// Device Session ID
	PayUParameters::DEVICE_SESSION_ID => "vghs6tvkcle931686k1900o6e1",
	// O IP do pagador
	PayUParameters::IP_ADDRESS => "127.0.0.1",
	// Cookie da sessão atual
	PayUParameters::PAYER_COOKIE => "pt1t38347bs6jc9ruv2ecpv7o2",
	// User agent da sessão atual
	PayUParameters::USER_AGENT => "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0",

  // Resposta page to which the payer will be redirected.
	PayUParameters::PARAMETERS.RESPONSE_URL => "http://www.test.com/response"
	);

// Pedido de autorização
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

## Lista de bancos - PSE {#bank-list---pse}
Este método retorna uma lista dos bancos disponíveis para [pagamentos usando PSE]({{< ref "#submit-transaction-with-bank-transfer" >}}). 

### Chamada de método {#method-call-3}
A seguir estão os corpos do pedido e resposta deste método.

{{< tabs tabTotal="2" tabID="5" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o nome do método de pagamento
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "PSE");

// Coloque aqui o nome do pais.
parameters.put(PayU.PARAMETERS.COUNTRY, PaymentCountry.CO.name());

//Obtener el listado de bancos disponibles
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
// Coloque aqui o nome do método de pagamento
$parameters = array(
	// Coloque aqui o nome do método de pagamento.
	PayUParameters::PAYMENT_METHOD => "PSE",
	// Coloque aqui o nome do pais.
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

### Chamada de método {#method-call-4}
Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

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

### Chamada de método {#method-call-5}
Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

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
