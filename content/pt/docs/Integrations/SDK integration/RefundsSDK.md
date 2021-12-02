---
title: "SDK de Cancelamentos e Reembolsos"
linkTitle: "SDK de Cancelamentos e Reembolsos"
date: 2021-03-29T11:15:44-05:00
description: >
  This feature allows you to request the cancellation ou the refund of the transactions authorized ou charged. You can create the refund request using the _Refund_ ou _Void_ method according to the status da transação. 
weight: 100
tags: ["subtopic"]
---

Para integrar com o SDK de Cancelamentos e Reembolsos, direcione sua solicitação para as seguintes URLs de acordo com seu ambiente.

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
<br>

Se você precisar entender os conceitos e ler mais observações sobre Cancelamentos e Reembolsos, consulte [este artigo]({{< ref "Refunds.md" >}}).

## Considerações por país {#considerations-per-country}
Antes de usar a API de Cancelamentos e Reembolsos, Leve em conta as seguintes informações.

### Argentina
* O tempo máximo para enviar um cancelamento é de 14 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será cancelada automaticamente (auto-void).
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é 365 days and 180 days para reembolsos parciais.
* Reembolsos com casas decimais não são aceitos.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no máximo 30 dias úteis.

### Brasil {#brazil}
* O tempo máximo para enviar um cancelamento é de 7 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será cancelada.
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é 90 days para transações processadas na Redecard and 120 para transações processadas na Cielo.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no máximo 15 dias úteis.

### Chile
* Due to network restrictions, void can be authorized within the first three hours after the authorization. Se nenhum cancelamento ou reembolso for enviado após de 7 days, a transação será cancelada automaticamente (auto-void).
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é 90 dias.
* Reembolsos com casas decimais não são aceitos.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no 8 to 20 dias úteis.
* Reembolsos parciais para transações parceladas são recebidos online, mas PayU os processa manualmente devido a restrições do adquirente.
* O valor mínimo para enviar um reembolso é de 10 CLP.

### Colômbia {#colombia}
* Não há suporte para cancelamentos.
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é de dois anos.
* O valor mínimo para envio do Reembolso é de 300 COP.
* Se o reembolso não for enviado no mesmo dia em que a transação foi capturada (antes das 21h UTC-5), o reembolso vai imediatamente para um processo manual sem a tentativa online.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no máximo 30 dias úteis.
* Reembolsos parciais não estão disponíveis para cartões de crédito internacionais.

### México {#mexico}
* O tempo mínimo para envio do cancelamento é de 10 minutes after the authorization and the máximo is 30 dias. Se a transação foi feita com American Express, o prazo máximo é de 7 dias.<br>Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será cancelada automaticamente (auto-void).
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é 180 dias. If the transaction was made processed by Bancomer, the máximo time is 45 dias.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no 30 dias úteis.
* Reembolsos com casas decimais não são aceitos.

### Peru
* O número máximo de dias para cancelar uma autorização é: 
    - Visa: 21 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será capturada automaticamente.
    - Mastercard: 28 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será capturada automaticamente.
    - American Express: 30 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será cancelada automaticamente (auto-void).
    - Diners: 11 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será cancelada automaticamente (auto-void).
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é 180 dias.
* Reembolsos parciais são aceitos para transações sem parcelamento. Lembre-se de que as transações com uma parcela são consideradas sem parcelas.
* Reembolsos parciais com visanet devem ser enviados após um dia.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no 15 to 25 dias úteis.
* O valor mínimo para envio do Reembolso é de 1 USD ou 1 PEN.

## Cancelamentos (Void) {#void}
O método `VOID` cancela uma transação previamente autorizada. O cancelamento é um procedimento automático. Assim que você enviar o pedido de `VOID`, não há nenhum fluxo de aprovação e a transação não é cobrada do titular do cartão.

### Method Call {#method-call}
A seguir estão os corpos de pedido e resposta para este tipo de transação.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da ordem.
parameters.put(PayU.PARAMETERS.ORDER_ID, "40049920");

// Coloque aqui o identificador da transação.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "96535b36-99db-4c66-bd87-6ad5c59b25a8");

// Coloque aqui o motivo do cancelamento. Opcional
parameters.put(PayU.PARAMETERS.REASON, "Motivo do pedido de cancelamento da transação");

TransactionResponse response = PayUPayments.doVoid(parameters);

// Resposta
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
	// Coloque aqui o identificador da ordem.
	PayUParameters::ORDER_ID => "40049920",

	// Coloque aqui o identificador da transação.
	PayUParameters::TRANSACTION_ID => "96535b36-99db-4c66-bd87-6ad5c59b25a8",

	// Coloque aqui o motivo do cancelamento. Opcional
	PayUParameters::REASON => "Motivo do pedido de cancelamento da transação",
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

## Reembolsos (Refunds) {#refunds}
Reembolsos são solicitados quando uma loja decide devolver voluntariamente o dinheiro gasto pelo comprador por motivos de insatisfação ou quando a loja não possui estoque suficiente do produto adquirido. O método `REFUND` solicita a reversão de uma transação capturada anteriormente.

Reembolsos podem ser solicitados pelo valor total ou parcial (`PARTIAL REFUND`).

### Method Call {#method-call-1}
A seguir estão os corpos de pedido e resposta para este tipo de transação.

#### Reembolso {#refund}

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da ordem.
parameters.put(PayU.PARAMETERS.ORDER_ID, "40049920");

// Coloque aqui o identificador da transação.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "96535b36-99db-4c66-bd87-6ad5c59b25a8");

// Coloque aqui o motivo do reembolso.
parameters.put(PayU.PARAMETERS.REASON, "Motivo do pedido de reembolso da transação");

TransactionResponse response = PayUPayments.doRefund(parameters);

// Resposta
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
	// Coloque aqui o identificador da ordem.
	PayUParameters::ORDER_ID => "40049920",

	// Coloque aqui o identificador da transação.
	PayUParameters::TRANSACTION_ID => "96535b36-99db-4c66-bd87-6ad5c59b25a8",

	// Coloque aqui o motivo do reembolso. Opcional
	PayUParameters::REASON => "Motivo do pedido de reembolso da transação",
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

#### Reembolso Parcial {#partial-refund}

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da ordem.
parameters.put(PayU.PARAMETERS.ORDER_ID, "40049920");

// Coloque aqui o identificador da transação.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "96535b36-99db-4c66-bd87-6ad5c59b25a8");

// -- Valor de reembolso parcial --
// Coloque aqui o valor de reembolso parcial.
parameters.put(PayU.PARAMETERS.VALUE, "950");
// Coloque aqui a moeda.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.CLP.name());

// Coloque o motivo do reembolso parcial
parameters.put(PayU.PARAMETERS.REASON, "Reason for requesting the partial refund da transação");

TransactionResponse response = PayUPayments.doPartialRefund(parameters);

// Resposta
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
	// Coloque aqui o identificador da ordem.
	PayUParameters::ORDER_ID => "40049920",

	// Coloque aqui o identificador da transação.
	PayUParameters::TRANSACTION_ID => "96535b36-99db-4c66-bd87-6ad5c59b25a8",

  // -- Valor de reembolso parcial --
  // Coloque aqui o valor de reembolso parcial.
  PayUParameters::VALUE => "950",
  // Coloque aqui a moeda.
  PayUParameters::CURRENCY => "CLP",

	// Coloque o motivo do reembolso parcial
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

### Consultar o status do reembolso {#query-the-refund-status}
Conforme mencionado anteriormente, a solicitação de reembolso segue um fluxo de aprovação em que o PayU leva de 1 a 3 dias para processar a solicitação e aprova ou rejeita a solicitação. Se quiser saber o status do reembolso, você tem duas opções:

#### Verifique o status através do Módulo PayU {#check-status-through-the-payu-module}
1. Faça login em sua conta do módulo PayU. No painel esquerdo, expanda o menu _**Transações**_ e selecione a opção _**Relatório de Vendas**_.

![PrintScreen](/assets/Refunds/Refunds_pt_01.png)

2. Use o campo _**Filtrar minhas vendas**_ para encontrar a ordem usando o ID da transação e da ordem.

<img src="/assets/Refunds/Refunds_pt_02.png" alt="PrintScreen" width="50%"/><br>

3. A coluna Estado mostra se o reembolso foi aprovado ou rejeitado; se o reembolso não foi aprovado, esta coluna mostra que o reembolso foi solicitado.

![PrintScreen](/assets/Refunds/Refunds_pt_03.png)

#### Verifique o status usando consultas {#check-status-using-queries}
Você pode consultar o estado do reembolso usando o [API de Consultas]({{< ref "Queries-API.md" >}}). No pedido à consulta, você precisa enviar o id da ordem.

Ao consultar uma ordem, o sistema exibe a última transação associada à ordem.

Existem três status possíveis na resposta a seu pedido:
* **Solicitação não resolvida**: se o pedido não foi resolvido, a ordem encontrada na consulta aparece com status `CAPTURED`. O primeiro tipo de transação é `AUTHORIZATION_AND_CAPTURE` e o primeiro status da transação é `APPROVED`.
* **Aprovada**: se o pedido de reembolso for aprovado por um agente de atendimento ao cliente do PayU, a ordem encontrada na consulta aparecerá com status `REFUNDED`. O primeiro tipo de transação é `REFUND` e o primeiro status da transação é `APPROVED`.
* **Recusada**: se o pedido de reembolso for recusada por um agente de atendimento ao cliente do PayU, a ordem encontrada na consulta aparecerá com status `CAPTURED`. O primeiro tipo de transação é `REFUND` e o primeiro status da transação é `DECLINED`.
