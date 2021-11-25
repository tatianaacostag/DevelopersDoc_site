---
title: "Voids and Refunds SDK"
linkTitle: "Voids and Refunds SDK"
date: 2021-03-29T11:15:44-05:00
description: >
  This feature allows you to request the cancellation ou the refund of the transactions authorized ou charged. You can create the refund request using the _Refund_ ou _Void_ method according to the status da transação. 
weight: 100
tags: ["subtopic"]
---

To integrate with Voids and Refunds SDK, direcione sua solicitação para as seguintes URLs de acordo com seu ambiente.

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
<br>

If you need to understand the concepts and read further considerations of Voids and Refunds, refer to [este artigo]({{< ref "Refunds.md" >}}).

## Observações {#considerations} per country
Before using Voids and Refunds API, Leve em conta as seguintes informações.

### Argentina
* O tempo máximo para enviar um cancelamento é de 14 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será cancelada automaticamente (auto-void).
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é 365 days and 180 days para reembolsos parciais.
* Reembolsos com casas decimais não são aceitos.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no máximo 30 dias úteis.

### Brazil
* O tempo máximo para enviar um cancelamento é de 7 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será cancelada.
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é 90 days para transações processadas na  Redecard and 120 para transações processadas na  Cielo.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no máximo 15 dias úteis.

### Chile
* Due to network restrictions, void can be authorized within the first three hours after the authorization. Se nenhum cancelamento ou reembolso for enviado após de 7 days, a transação será cancelada automaticamente (auto-void).
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é 90 dias.
* Reembolsos com casas decimais não são aceitos.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no 8 to 20 dias úteis.
* Reembolsos parciais para transações parceladas são recebidos online, mas PayU os processa manualmente devido a restrições do adquirente.
* O valor mínimo para enviar um reembolso é de 10 CLP.

### Colombia
* Não há suporte para cancelamentos.
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é de dois anos.
* O valor mínimo para envio do Reembolso é de 300 COP.
* Se o reembolso não for enviado no mesmo dia em que a transação foi capturada (antes das 21h UTC-5), o reembolso vai imediatamente para um processo manual sem a tentativa online.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no máximo 30 dias úteis.
* Reembolsos parciais não estão disponíveis para cartões de crédito internacionais.

### Mexico
* O tempo mínimo para envio do cancelamento é de 10 minutes after the authorization and the máximo is 30 dias. Se a transação foi feita com American Express, o prazo máximo é de 7 dias.<br>Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será cancelada automaticamente (auto-void).
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é 180 dias. If the transaction was made processed by Bancomer, the máximo time is 45 dias.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no 30 dias úteis.
* Reembolsos com casas decimais não são aceitos.

### Peru
* The máximo days to void an authorization são: 
    - Visa: 21 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será capturada automaticamente.
    - Mastercard: 28 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será capturada automaticamente.
    - American Express: 30 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será cancelada automaticamente (auto-void).
    - Diners: 11 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será cancelada automaticamente (auto-void).
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é 180 dias.
* Reembolsos parciais são aceitos para transações sem parcelamento. Lembre-se de que as transações com uma parcela são consideradas sem parcelas.
* Reembolsos parciais com visanet devem ser enviados após um dia.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no 15 to 25 dias úteis.
* O valor mínimo para envio do Reembolso é de 1 USD ou 1 PEN.

## Void
O método `VOID` cancela uma transação previamente autorizada. O cancelamento é um procedimento automático. Assim que você enviar o pedido de `VOID`, não há nenhum fluxo de aprovação e a transação não é cobrada do titular do cartão.

### Method Call
A seguir estão os corpos de pedido e resposta para este tipo de transação.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Insert the ID da ordem here.
parameters.put(PayU.PARAMETERS.ORDER_ID, "40049920");

// Insert the ID da transação here.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "96535b36-99db-4c66-bd87-6ad5c59b25a8");

// Enter the void reason here. Optional
parameters.put(PayU.PARAMETERS.REASON, "Reason for requesting the void da transação");

TransactionResponse response = PayUPayments.doVoid(parameters);

// Response
if (response != null){
  response.getOrderId();
  response.getState();
  response.getPendingReason();
  response.getResponseMessage();
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$parameters = array(
	// Insert the ID da ordem here.
	PayUParameters::ORDER_ID => "40049920",

	// Insert the ID da transação here.
	PayUParameters::TRANSACTION_ID => "96535b36-99db-4c66-bd87-6ad5c59b25a8",

	// Enter the void reason here. Optional
	PayUParameters::REASON => "Reason for requesting the void da transação",
);

$response = PayUPayments::doVoid($parameters);

if ($response) {
	$response->transactionResponse->orderId;
	$response->transactionResponse->state;
	$response->transactionResponse->pendingReason;
	$response->transactionResponse->responseMessage; 
}
```
{{< /tab >}}
{{< /tabs >}}

## Refunds
Reembolsos são solicitados quando uma loja decide devolver voluntariamente o dinheiro gasto pelo comprador por motivos de insatisfação ou quando a loja não possui estoque suficiente do produto adquirido. O método `REFUND` solicita a reversão de uma transação capturada anteriormente.

Reembolsos podem ser solicitados pelo valor total ou parcial (`PARTIAL REFUND`).

### Method Call
A seguir estão os corpos de pedido e resposta para este tipo de transação.

#### Refund

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Insert the ID da ordem here.
parameters.put(PayU.PARAMETERS.ORDER_ID, "40049920");

// Insert the ID da transação here.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "96535b36-99db-4c66-bd87-6ad5c59b25a8");

// Enter the refund reason here
parameters.put(PayU.PARAMETERS.REASON, "Reason for requesting the refund da transação");

TransactionResponse response = PayUPayments.doRefund(parameters);

// Response
if (response != null){
  response.getOrderId();
  response.getState();
  response.getPendingReason();
  response.getResponseMessage();
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$parameters = array(
	// Insert the ID da ordem here.
	PayUParameters::ORDER_ID => "40049920",

	// Insert the ID da transação here.
	PayUParameters::TRANSACTION_ID => "96535b36-99db-4c66-bd87-6ad5c59b25a8",

	// Enter the refund reason here
	PayUParameters::REASON => "Reason for requesting the refund da transação",
);

$response = PayUPayments::doRefund($parameters);

if ($response) {
	$response->transactionResponse->orderId;
	$response->transactionResponse->state;
	$response->transactionResponse->pendingReason;
	$response->transactionResponse->responseMessage; 
}
```
{{< /tab >}}
{{< /tabs >}}

#### Partial Refund

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Insert the ID da ordem here.
parameters.put(PayU.PARAMETERS.ORDER_ID, "40049920");

// Insert the ID da transação here.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "96535b36-99db-4c66-bd87-6ad5c59b25a8");

// -- Partial Refund Value --
// Enter the partial refund value here.
parameters.put(PayU.PARAMETERS.VALUE, "950");
// Enter the currency here.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.CLP.name());

// Enter the partial refund reason here
parameters.put(PayU.PARAMETERS.REASON, "Reason for requesting the partial refund da transação");

TransactionResponse response = PayUPayments.doPartialRefund(parameters);

// Response
if (response != null){
  response.getOrderId();
  response.getState();
  response.getPendingReason();
  response.getResponseMessage();
}

```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$parameters = array(
	// Insert the ID da ordem here.
	PayUParameters::ORDER_ID => "40049920",

	// Insert the ID da transação here.
	PayUParameters::TRANSACTION_ID => "96535b36-99db-4c66-bd87-6ad5c59b25a8",

  // -- Partial Refund Value --
  // Enter the partial refund value here.
  PayUParameters::VALUE => "950",
  // Enter the currency here.
  PayUParameters::CURRENCY => "CLP",

	// Enter the partial refund reason here
	PayUParameters::REASON => "Reason for requesting the partial refund da transação",
);

$response = PayUPayments::doPartialRefund($parameters);

if ($response) {
	$response->transactionResponse->orderId;
	$response->transactionResponse->state;
	$response->transactionResponse->pendingReason;
	$response->transactionResponse->responseMessage; 
}
```
{{< /tab >}}
{{< /tabs >}}

### Query the refund status
As mentioned before, refund request follows an approval in flow in which, PayU take 1 to 3 days to process the request and approves ou rejects the request. If you want to know the status of the refund, you have two options:

#### Verifique o status através do Módulo PayU
1. Faça login em sua conta do módulo PayU. No painel esquerdo, expanda o menu _**Transações**_ menu and select _**Relatório de Vendas**_ option.

![PrintScreen](/assets/Refunds/Refunds_en_01.png)

2. Use o campo _**Filtrar minhas vendas**_ field to find the order using the order and the transaction id.

![PrintScreen](/assets/Refunds/Refunds_en_02.png)

3. The Status column show whether the refund has been approved ou rejected; if the refund has not been approved, this column shows that the refund has been requested.

![PrintScreen](/assets/Refunds/Refunds_en_03.png)

#### Check status using queries
Você pode consultar o estado do reembolso usando o [Consultas SDK]({{< ref "QueriesSDK.md" >}}). In the response of the query, you need to send the order id.

Ao consultar uma ordem, o sistema exibe a última transação associada à ordem.

Existem três status possíveis na resposta à seu pedido:
* **Solicitação não resolvida**: se o pedido não foi resolvido, a ordem encontrada na consulta aparece com status `CAPTURED` status, the first transaction type is `AUTHORIZATION_AND_CAPTURE` and the first transaction status is `APPROVED`.
* **Aprovada**: se o pedido de reembolso for aprovado por um agente de atendimento ao cliente do PayU, a ordem encontrada na consulta aparecerá com status `REFUNDED` status, the first transaction type is `REFUND` and the first transaction status is `APPROVED`.
* **Recusada**: se o pedido de reembolso for recusada por um agente de atendimento ao cliente do PayU, a ordem encontrada na consulta aparecerá com status `CAPTURED` status, the first transaction type is `REFUND` and the first transaction status is `DECLINED`.
