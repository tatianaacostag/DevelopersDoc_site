---
title: "SDK de Consultas"
linkTitle: "SDK de Consultas"
date: 2021-04-30T08:51:22-05:00
description: >
  O SDK de consultas permite verificar o status das ordens feitas e suas transações.
weight: 80
tags: ["subtopic"]
---

Para integrar com o SDK de Consultas, direcione sua solicitação para as seguintes URLs:

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
O SDK de Consultas inclui os seguintes métodos:

* [Consulta por ID da ordem]({{< ref "#query-by-order-id" >}})
* [Consulta por ID de transação]({{< ref "#query-by-transaction-id" >}})
* [Consulta por ID de Referência]({{< ref "#query-by-reference-id" >}})
* [Ping]({{< ref "#ping" >}})

## Consulta por ID da ordem {#query-by-order-id}
*Order Id* é um valor gerado pelo PayU para identificar todas as transações geradas para uma solicitação de pagamento realizada por seu cliente. Você pode usar o comando `getOrderDetail` para consultar o status de uma ordem por seu identificador.

Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o código de referência da ordem.
parameters.put(PayU.PARAMETERS.ORDER_ID, "857817550");
Order response = PayUReports.getOrderDetail(parameters);

//  -- você pode obter as propriedades da ordem --
if(response != null){
	response.getAccountId();
	response.getStatus();
	response.getReferenceCode();
	response.getAdditionalValue("TX_VALUE").getValue();
	response.getAdditionalValue("TX_TAX").getValue();
	if(response.getBuyer() != null){
		response.getBuyer().getEmailAddress();
		response.getBuyer().getFullName();
	}
	// -- recorrer as transações que estão associadas á ordem--
	List<Transaction> transactions = response.getTransactions();
	Iterator<Transaction> transactions_iterator = transactions.iterator();

	while(transactions_iterator.hasNext()){
		Transaction transaction= (Transaction) transactions_iterator.next();
		transaction.getType();
		transaction.getTransactionResponse().getState();
		transaction.getTransactionResponse().getPaymentNetworkResponseCode();
		transaction.getTransactionResponse().getTrazabilityCode();
		transaction.getTransactionResponse().getResponseCode();
		if(transaction.getPayer() != null){
			transaction.getPayer().getFullName();
			transaction.getPayer().getEmailAddress();
		}
	}
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
// Coloque aqui o código de referência da ordem.
$parameters = array(PayUParameters::ORDER_ID => "44469220");

$order = PayUReports::getOrderDetail($parameters);

if ($order) {
	$order->accountId;
	$order->status;
	$order->referenceCode;
	$order->additionalValues->TX_VALUE->value;
	$order->additionalValues->TX_TAX->value;
	if ($order->buyer) {
		$order->buyer->emailAddress;
		$order->buyer->fullName;
	}
	$transactions=$order->transactions;
	foreach ($transactions as $transaction) {
		$transaction->type;
		$transaction->transactionResponse->state;
		$transaction->transactionResponse->paymentNetworkResponseCode;
		$transaction->transactionResponse->trazabilityCode;
		$transaction->transactionResponse->responseCode;
		if ($transaction->payer) {
			$transaction->payer->fullName;
			$transaction->payer->emailAddress;
		}
	}
}
```
{{< /tab >}}
{{< /tabs >}}

## Consulta por ID de transação {#query-by-transaction-id}
*Transaction Id* é um valor gerado por PayU para identificar uma transação gerada para uma ordem. Você pode usar o comando `getTransactionResponse` para consultar as informações de uma determinada transação.

Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o identificador da transação.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "3310ba3b-cf64-49b2-80e6-3f9196917131");

TransactionResponse response = PayUReports.getTransactionResponse(parameters);
//  --você poderá obter as propriedades da resposta --
if(response != null){
	response.getState();
	response.getTrazabilityCode();
	response.getAuthorizationCode();
	response.getResponseCode();
	response.getOperationDate();
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$parameters = array(PayUParameters::TRANSACTION_ID => "3310ba3b-cf64-49b2-80e6-3f9196917131");

$response = PayUReports::getTransactionResponse($parameters);

if ($response) {
	$response->state;
	$response->trazabilityCode;
	$response->authorizationCode;
	$response->responseCode;
	$response->operationDate;
}
```
{{< /tab >}}
{{< /tabs >}}

## Consulta por ID de Referência {#query-by-reference-id}
*Reference Id* é um valor gerado pela sua loja para identificar uma ordem.
Você pode usar `getOrderDetailByReferenceCode` para consultar o status de uma ordem por seu próprio identificador de ordem (referência).

Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

// Coloque aqui o código de referência da ordem.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, "payment_test_1625093692957");

List<Order> orders_response = PayUReports.getOrderDetailByReferenceCode(parameters);
Iterator<Order> orders_iterator= orders_response.iterator();

// -- recorrer as ordens com a referência consultada--
while(orders_iterator.hasNext()){
	Order order= (Order) orders_iterator.next();

	if(order != null){
		order.getAccountId();
		order.getStatus();
		order.getReferenceCode();
		order.getAdditionalValue("TX_VALUE").getValue();
		order.getAdditionalValue("TX_TAX").getValue();

		if(order.getBuyer() != null){
			order.getBuyer().getEmailAddress();
			order.getBuyer().getFullName();
		}

		// -- recorrer as transações associadas à ordem--
		List<Transaction> transactions=order.getTransactions();
		Iterator<Transaction> transactions_iterator=transactions.iterator();

		while(transactions_iterator.hasNext()){
			Transaction transaction= (Transaction) transactions_iterator.next();
			transaction.getType();
			transaction.getTransactionResponse().getState();
			transaction.getTransactionResponse().getPaymentNetworkResponseCode();
			transaction.getTransactionResponse().getTrazabilityCode();
			transaction.getTransactionResponse().getResponseCode();
			if(transaction.getPayer() != null){
				transaction.getPayer().getFullName();
				transaction.getPayer().getEmailAddress();
			}
		}
	}
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
// Coloque aqui o código de referência da ordem.
$parameters = array(PayUParameters::REFERENCE_CODE => "payment_test_1625093692957");

$response = PayUReports::getOrderDetailByReferenceCode($parameters);

foreach ($response as $order) {
	$order->accountId;
	$order->status;
	$order->referenceCode;
	$order->additionalValues->TX_VALUE->value;
	$order->additionalValues->TX_TAX->value;

	if ($order->buyer) {
		$order->buyer->emailAddress;
		$order->buyer->fullName;
	}

	$transactions=$order->transactions;
	foreach ($transactions as $transaction) {
		$transaction->type;
		$transaction->transactionResponse->state;
		$transaction->transactionResponse->paymentNetworkResponseCode;
		$transaction->transactionResponse->trazabilityCode;
		$transaction->transactionResponse->responseCode;
		if ($transaction->payer) {
			$transaction->payer->fullName;
			$transaction->payer->emailAddress;
		}
	}
}
```
{{< /tab >}}
{{< /tabs >}}

## Ping
O método `PING` permite que você confirme a conexão com a nossa plataforma.Os exemplos a seguir mostram como chamar o método para este tipo de transação de acordo com a linguagem de programação.

{{< tabs tabTotal="2" tabID="5" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
boolean response = PayUReports.doPing();
LoggerUtil.info("{0}", response);
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
$response = PayUReports::doPing();
$response -> code;
```
{{< /tab >}}
{{< /tabs >}}
