---
title: "Tokenization SDK"
linkTitle: "Tokenization SDK"
date: 2021-03-29T08:31:38-05:00
description: >
  Tokenization SDK permite armazenar com segurança os dados dos cartões de crédito de seus clientes por meio da criação de um token. Este token permite fazer cobranças regulares ou implementar o recurso de pagamento em 1 clique, seguindo os padrões de segurança PCI DSS (Payment Card Industry Data Security Standard) para gerenciar dados de cartão de crédito.
weight: 90
tags: ["subtopic"]
---

O recurso de tokenização está disponível em acordos comerciais personalizados. Para obter mais informações, entre em contato com seu representante de vendas.

To integrate with Tokenization SDK, direcione sua solicitação para as seguintes URLs de acordo com seu ambiente.

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
Tokenization SDK inclui métodos para registrar, remover e consultar tokens.

For registration a removal of tokens:
* [Registro de cartão de crédito individual]({{< ref "TokenizationSDK.md#individual-credit-card-registration" >}})
* [Remoção de token individual]({{< ref "TokenizationSDK.md#individual-token-removal" >}})
* [Consulta de token]({{< ref "TokenizationSDK.md#query-tokens" >}})


## Registro de cartão de crédito individual
Usando esse recurso, você pode registrar as informações do cartão de crédito de um cliente e obter um token. 

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

## Remoção de token individual
Usando este recurso, você pode remover o token registrado anteriormente. 

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

## Consulta de token
Usando este recurso, você pode obter as informações de cartões de crédito tokenizados e realizar a consulta pelo número do token ou por um intervalo de datas. 

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
Para pagamentos com tokens de cartão de crédito, inclua o parâmetro `CREDIT_CARD_SECURITY_CODE` substituindo as informações do cartão de crédito. O exemplo a seguir mostra o corpo da solicitação em um nível alto para um fluxo de uma etapa. Os detalhes da solicitação não são fornecidos.

{{% alert title="Observação" color="info"%}}
Para processar sem CVV, é necessário enviar o parâmetro `PROCESS_WITHOUT_CVV2` como true na solicitação de pagamento e remover o parâmetro `CREDIT_CARD_SECURITY_CODE`.<br>
Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas.
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
//parameters.put([..], [..]);


// -- Payer --
// Enter the payer information here.
//parameters.put([..], [..]);

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

// "Autorização and capture" request
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
  //PayUParameters::[..] => [..],


  // -- Payer --
  // Enter the payer information here.
  //PayUParameters::[..] => [..],

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

// "Autorização and Captura" request
$response = PayUPayments::doAuthorizationAndCapture($parameters);
```
{{< /tab >}}
{{< /tabs >}}
<br>

Para obter informações específicas sobre como efetuar pagamentos, consulte o artigo respectivo ao país de processamento.

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
