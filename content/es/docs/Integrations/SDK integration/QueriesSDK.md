---
title: "SDK de Consultas"
linkTitle: "SDK de Consultas"
date: 2021-04-30T08:51:22-05:00
description: >
  El SDK de Consultas te permite validar el estado de las órdenes generadas junto con sus transacciones.
weight: 80
tags: ["subtopic"]
---

Para integrate con el SDK de Consultas, apunta tus peticiones a las siguientes URLs:

{{< tabs tabTotal="2" tabID="1" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}

```Java
// URL para pruebas: https://sandbox.api.payulatam.com/payments-api/
PayU.paymentsUrl = “https://api.payulatam.com/payments-api/”;
// URL para pruebas: https://sandbox.api.payulatam.com/reports-api/
PayU.reportsUrl = “https://api.payulatam.com/reports-api/”;
```

{{< /tab >}}

{{< tab tabNum="2" >}}

```PHP
// URL para pruebas: https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi
Environment::setPaymentsCustomUrl(“https://api.payulatam.com/payments-api/4.0/service.cgi”);
// URL para pruebas: https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi
Environment::setReportsCustomUrl(“https://api.payulatam.com/reports-api/4.0/service.cgi”);
```

{{< /tab >}}
{{< /tabs >}}

## Métodos disponibles {#available-methods}
El SDK de Consultas incluye los siguientes métodos:

* [Consultar por Identificador de la orden]({{< ref "#query-by-order-id" >}})
* [Consultar por Identificador de la transacción]({{< ref "#query-by-transaction-id" >}})
* [Consultar por Identificador de la referencia]({{< ref "#query-by-reference-id" >}})
* [Ping]({{< ref "#ping" >}})

## Consultar por Identificador de la orden {#query-by-order-id}
*Order Id* es un valor generado por PayU para identificar todas las transacciones generadas en una solicitud de pago realizada por tu cliente. Puedes utilizar el comando `getOrderDetail` para consultar el estado de una orden por su identificador.

Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

// Incluye aquí la referencia de la orden.
parameters.put(PayU.PARAMETERS.ORDER_ID, "857817550");
Order response = PayUReports.getOrderDetail(parameters);

//  -- obten las propiedades de la orden --
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
	// -- navega a través de las transacciones que están asociadas a la orden--
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
// Incluye aquí la referencia de la orden.
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

## Consultar por Identificador de la transacción {#query-by-transaction-id}
*Transaction Id* es un valor generado por PayU para identificar una transaccion generada para una orden. 
Puedes utilizar el comando `getTransactionResponse` para consultar la información de una transacción.

Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

// Ingresa aquí el identificador de la transacción.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "3310ba3b-cf64-49b2-80e6-3f9196917131");

TransactionResponse response = PayUReports.getTransactionResponse(parameters);
//  --puedes obtener las propiedades de la respuesta --
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

## Consultar por Identificador de la referencia {#query-by-reference-id}
*Reference Id* es un valor generado por tu comercio para identificar una orden. 
Puedes utilizar el comando `getOrderDetailByReferenceCode` para consultar el estado de una order por tu propio identificador (Referencia).

Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

{{< tabs tabTotal="2" tabID="4" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```JAVA
Map<String, String> parameters = new HashMap<String, String>();

// Incluye aquí la referencia de la orden.
parameters.put(PayU.PARAMETERS.REFERENCE_CODE, "payment_test_1625093692957");

List<Order> orders_response = PayUReports.getOrderDetailByReferenceCode(parameters);
Iterator<Order> orders_iterator= orders_response.iterator();

// -- navega a través de la órdenes con la referencia seleccionada--
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

		// -- go through the transactions associated to the order--
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
// Incluye aquí la referencia de la orden.
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
El método `PING` te permite verificar la conexión con nuestra plataforma. Los siguientes ejemplos muestra cómo llamar los métodos para esta transacción de acuerdo con el lenguaje de programación.

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