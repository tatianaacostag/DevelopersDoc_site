---
title: "SDK de Tokenização"
linkTitle: "SDK de Tokenização"
date: 2021-03-29T08:31:38-05:00
description: >
  SDK de Tokenização permite armazenar com segurança os dados dos cartões de crédito de seus clientes por meio da criação de um token. Este token permite fazer cobranças regulares ou implementar o recurso de pagamento em 1 clique, seguindo os padrões de segurança PCI DSS (Payment Card Industry Data Security Standard) para gerenciar dados de cartão de crédito.
weight: 90
tags: ["subtopic"]
---

O recurso de tokenização está disponível em acordos comerciais personalizados. Para obter mais informações, entre em contato com seu representante de vendas.

Para integrar com o SDK de Tokenização, direcione sua solicitação para as seguintes URLs de acordo com seu ambiente.

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
O SDK de Tokenização inclui métodos para registrar, remover e consultar tokens.

* [Registro de cartão de crédito individual]({{< ref "#individual-credit-card-registration" >}})
* [Remoção de token individual]({{< ref "#individual-token-removal" >}})
* [Consulta de token]({{< ref "#query-tokens" >}})

## Registro de cartão de crédito individual {#individual-credit-card-registration}
Usando esse recurso, você pode registrar as informações do cartão de crédito de um cliente e obter um token. 

### Chamada de método {#method-call}
Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
//-- Operação "Criar Token"--
Map<String, String> parameters = new HashMap<String, String>();
// Coloque aqui o nome do pagador.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "Mary Keller");
// Coloque aqui o ID do pagador.
parameters.put(PayU.PARAMETERS.PAYER_ID, "10");
// Coloque aqui o documento de identificação do pagador
parameters.put(PayU.PARAMETERS.PAYER_DNI, "32144457");
// Coloque aqui o número do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4668063527597820");
// Coloque aqui a data de vencimento do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2024/06");
// Coloque aqui o nome do cartão de crédito
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
	// Coloque aqui o nome do pagador.
	PayUParameters::PAYER_NAME => "Mary Keller",
	// Coloque aqui o ID do pagador.
	PayUParameters::PAYER_ID => "10",
	// Coloque aqui o documento de identificação do pagador
	PayUParameters::PAYER_DNI => "32144457",
	// Coloque aqui o número do cartão de crédito
	PayUParameters::CREDIT_CARD_NUMBER => "4668063527597820",
	// Coloque aqui a data de vencimento do cartão de crédito
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2024/10",
	// Coloque aqui o nome do cartão de crédito
	PayUParameters::PAYMENT_METHOD => "VISA"
);
	
$response = PayUTokens::create($parameters);   
if($response){
	//Você pode obter o token do cartão de crédito 
	$response->creditCardToken->creditCardTokenId;
}
```
{{< /tab >}}
{{< /tabs >}}

## Remoção de token individual {#individual-token-removal}
Usando este recurso, você pode remover o token registrado anteriormente. 

### Chamada de método {#method-call-1}
Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
// -- Operação "Eliminar token"  --
Map<String, String> parameters = new HashMap<String, String>();
// Coloque aqui o identificador do pagador.
parameters.put(PayU.PARAMETERS.PAYER_ID, "10");
// Coloque aqui o identificador do token.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "ab01ecd5-7d8f-4bee-91c1-4535d9ba282e");
CreditCardToken response = PayUTokens.remove(parameters);
LoggerUtil.info("{0}", response);
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$parameters = array(
	// Coloque aqui o identificador do pagador.
	PayUParameters::PAYER_ID => "10",
	// Coloque aqui o identificador do token. 
	PayUParameters::TOKEN_ID => "3ba2c031-a8c0-4c9f-9025-7eacf8dd14e2"         
);

$response=PayUTokens::remove($parameters);

if($response){

}
```
{{< /tab >}}
{{< /tabs >}}

## Consulta de token {#query-tokens}
Usando este recurso, você pode obter as informações de cartões de crédito tokenizados e realizar a consulta pelo número do token ou por um intervalo de datas. 

### Chamada de método {#method-call-2}
Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

{{< tabs tabTotal="2" tabID="6" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
// -- Operação "Consultar token" --
Map<String, String> parameters = new HashMap<String, String>();
// -- Parâmetros opcionais --
// Coloque aqui o identificador do pagador.
parameters.put(PayU.PARAMETERS.PAYER_ID, "10");
// Coloque aqui o identificador do token.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "ab01ecd5-7d8f-4bee-91c1-4535d9ba282e");
// Coloque aqui a data inicial a partir de onde filtrar com a data final até onde filtrar.
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
// -- Parâmetros opcionais --
$parameters = array(
	// Coloque aqui o identificador do pagador.
	PayUParameters::PAYER_ID => "10",
	// Coloque aqui o identificador do token.
	PayUParameters::TOKEN_ID => "ab01ecd5-7d8f-4bee-91c1-4535d9ba282e",
	// Coloque aqui a data inicial a partir de onde filtrar com a data final até onde filtrar. Optional.
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
Para pagamentos com tokens de cartão de crédito, inclua o parâmetro `CREDIT_CARD_SECURITY_CODE` substituindo as informações do cartão de crédito. O exemplo a seguir mostra o corpo da solicitação em um nível alto para um fluxo de uma etapa. Os detalhes da solicitação não são fornecidos.

{{% alert title="Observação" color="info"%}}
Para processar sem CVV, é necessário enviar o parâmetro `PROCESS_WITHOUT_CVV2` como true na solicitação de pagamento e remover o parâmetro `CREDIT_CARD_SECURITY_CODE`.<br>
Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas.
{{% /alert%}}


{{< tabs tabTotal="2" tabID="7" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da conta.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, accountId);
// Coloque aqui o código de referência.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, reference);
// Coloque aqui a descrição.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "payment test");
// Coloque aqui o idioma da ordem.
parameters.put(PayU.PARAMETERS.LANGUAGE, "Language.es");

// -- Valores --
// Coloque aqui o valor.
parameters.put(PayU.PARAMETERS.VALUE, value);
// Coloque aqui a moeda.
parameters.put(PayU.PARAMETERS.CURRENCY, currency);

// --  Comprador --
// Coloque aqui as informações do comprador.
//parameters.put([..], [..]);


// -- Pagador --
// Coloque aqui as informações do pagador.
//parameters.put([..], [..]);

// -- Dados do cartão de crédito --
// Coloque aqui o token do cartão de crédito
parameters.put(PayU.PARAMETERS.TOKEN_ID, "ab01ecd5-7d8f-4bee-91c1-4535d9ba282e");
// Coloque aqui o código de segurança do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_SECURITY_CODE, "321");
// Coloque aqui o nome do cartão de crédito
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");

// Coloque aqui o número de parcelas.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Coloque aqui o nome do pais.
parameters.put(PayU.PARAMETERS.COUNTRY, CountryName);


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
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$parameters = array(
	// Coloque aqui o identificador da conta
	PayUParameters::ACCOUNT_ID => $accountId,
	// Coloque aqui o código de referência.
	PayUParameters::REFERENCE_CODE => $reference,
	// Coloque aqui a descrição.
	PayUParameters::DESCRIPTION => "payment test",

	// -- Valores --
        // Coloque aqui o valor.
	PayUParameters::VALUE => $value,
	// Coloque aqui a moeda.
	PayUParameters::CURRENCY => $currency,

	// --  Comprador --
  // Coloque aqui as informações do comprador.
  //PayUParameters::[..] => [..],


  // -- Pagador --
  // Coloque aqui as informações do pagador.
  //PayUParameters::[..] => [..],

	// -- Dados do cartão de crédito --
  // Coloque aqui o token do cartão de crédito
  PayUParameters::TOKEN_ID => "ab01ecd5-7d8f-4bee-91c1-4535d9ba282e",
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2022/12",
	// Coloque aqui o código de segurança do cartão de crédito
	PayUParameters::CREDIT_CARD_SECURITY_CODE=> "321",
	// Coloque aqui o nome do cartão de crédito
	PayUParameters::PAYMENT_METHOD => "VISA",

	// Coloque aqui o número de parcelas.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Coloque aqui o nome do pais.
	PayUParameters::COUNTRY => $country,

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
```
{{< /tab >}}
{{< /tabs >}}
<br>

Para obter informações específicas sobre como efetuar pagamentos, consulte o artigo respectivo ao país de processamento.

<div>
  <div style="float: left;width: 50%;">
      <img src="/assets/Argentina.png" width="25px"/> <a href="{{< ref "Payments-SDK-Argentina.md" >}}">Argentina</a><br>
      <img src="/assets/Brasil.png" width="25px"/> <a href="{{< ref "Payments-SDK-Brazil.md" >}}">Brasil</a><br>
      <img src="/assets/Chile.png" width="25px"/> <a href="{{< ref "Payments-SDK-Chile.md" >}}">Chile</a><br>
    </ul>
  </div>
  <div style="float: left;width: 50%;">
    <ul>
      <img src="/assets/Colombia.png" width="25px"/> <a href="{{< ref "Payments-SDK-Colombia.md" >}}">Colômbia</a><br>
      <img src="/assets/Mexico.png" width="25px"/> <a href="{{< ref "Payments-SDK-Mexico.md" >}}">México</a><br>
      <img src="/assets/Peru.png" width="25px"/> <a href="{{< ref "Payments-SDK-Peru.md" >}}">Peru</a><br>
    </ul>
  </div>
</div>
<br>
<br>
<br>
