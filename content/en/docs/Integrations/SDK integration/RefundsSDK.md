---
title: "Voids and Refunds SDK"
linkTitle: "Voids and Refunds SDK"
date: 2021-03-29T11:15:44-05:00
description: >
  This feature allows you to request the cancellation or the refund of the transactions authorized or charged. You can create the refund request using the _Refund_ or _Void_ method according to the status of the transaction. 
weight: 100
tags: ["subtopic"]
---

To integrate with Voids and Refunds SDK, target your request to the following URLs according to your environment.

{{< tabs tabTotal="2" tabID="1" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
// URL for test: https://sandbox.api.payulatam.com/payments-api/
PayU.paymentsUrl = “https://api.payulatam.com/payments-api/”;
// URL for test: https://sandbox.api.payulatam.com/reports-api/
PayU.reportsUrl = “https://api.payulatam.com/reports-api/”;
```

{{< /tab >}}

{{< tab tabNum="2" >}}

```PHP
// URL for test: https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi
Environment::setPaymentsCustomUrl(“https://api.payulatam.com/payments-api/4.0/service.cgi”);
// URL for test: https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi
Environment::setReportsCustomUrl(“https://api.payulatam.com/reports-api/4.0/service.cgi”);
```

{{< /tab >}}
{{< /tabs >}}
<br>

If you need to understand the concepts and read further considerations of Voids and Refunds, refer to [this article]({{< ref "Refunds.md" >}}).

## Considerations per country
Before using Voids and Refunds API, take into account the following considerations.

### Argentina
* The maximum time to send a void is 14 days. If no void or capture is sent after this time, the transaction is auto-voided.
* The minimum time to send a refund is 10 minutes after the approval and the maximum is 180 days.
* Refunds with decimals are not supported.
* When a refund is approved, the payer gets the money back in maximum 30 working days.

### Brazil
* The maximum time to send a void is seven (7) days. If no void or capture is sent after this time, the transaction is cancelled.
* The minimum time to send a refund is 10 minutes after the approval and the maximum is 90 days for transactions processed in Redecard and 120 for transactions processed in Cielo.
* When a refund is approved, the payer gets the money back in maximum 15 working days.

### Chile
* Due to network restrictions, void can be authorized within the first three hours after the authorization. If the void is not accepted or no capture is sent after seven (7) days, the transaction is auto-voided.
* The minimum time to send a refund is 10 minutes after the approval and the maximum is 90 days.
* Refunds with decimals are not supported.
* When a refund is approved, the payer gets the money back in 8 to 20 working days.
* Partial refunds for transactions using installments are received online but PayU processes them manually due to acquirer restrictions.
* The minimum amount to send a refund is 10 CLP.

### Colombia
* Voids are not supported.
* The minimum time to send a refund is 10 minutes after the approval and the maximum is two years.
* Minimum amount to send the Refund 300 COP.
* If refund is not sent the same day in which the transaction was captured (before 9 pm UTC-5) the refund goes immediately to a manual process without sending the online attempt.
* When a refund is approved, the payer gets the money back in maximum 30 working days.
* Partial refunds are not available for international credit cards.

### Mexico
* The minimum time to send a void is 10 minutes after the authorization and the maximum is 30 days. If the transaction was made with American Express, the maximum time is seven (7) days.<br>If no void or capture is sent after this time, the transaction is auto-voided.
* The minimum time to send a refund is 10 minutes after the approval and the maximum is 180 days. If the transaction was made processed by Bancomer, the maximum time is 45 days.
* When a refund is approved, the payer gets the money back in 30 working days.
* Refunds with decimals are not supported.

### Peru
* The maximum days to void an authorization are: 
    - Visa: 21 days. If no void or capture is sent after this time, the transaction is auto-captured.
    - Mastercard: 28 days. If no void or capture is sent after this time, the transaction is auto-captured.
    - American Express: 30 days. If no void or capture is sent after this time, the transaction is auto-voided.
    - Diners: 11 days. If no void or capture is sent after this time, the transaction is auto-voided.
* The minimum time to send a refund is 10 minutes after the approval and the maximum is 180 days.
* Partial refunds are supported for transactions without installments. Recall that transactions with one installment are considered as without installments.
* Partial refunds with visanet must be sent after one day.
* When a refund is approved, the payer gets the money back in 15 to 25 working days.
* Minimum amount to send the Refund is 1 USD or 1 PEN.

## Void
The `VOID` method cancels a previously authorized transaction. Void is automatic procedure, as soon as you send the `VOID` request, it does not follow any approval flow, and the transaction is not charged to the card holder.

### Method Call
The following are the request and response bodies for this transaction type.

{{< tabs tabTotal="2" tabID="2" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Insert the ID of the order here.
parameters.put(PayU.PARAMETERS.ORDER_ID, "40049920");

// Insert the ID of the transaction here.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "96535b36-99db-4c66-bd87-6ad5c59b25a8");

// Enter the void reason here. Optional
parameters.put(PayU.PARAMETERS.REASON, "Reason for requesting the void of the transaction");

TransactionResponse response = PayUPayments.doVoid(parameters);

//Response
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
	// Insert the ID of the order here.
	PayUParameters::ORDER_ID => "40049920",

	// Insert the ID of the transaction here.
	PayUParameters::TRANSACTION_ID => "96535b36-99db-4c66-bd87-6ad5c59b25a8",

	// Enter the void reason here. Optional
	PayUParameters::REASON => "Reason for requesting the void of the transaction",
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
A refund is requested when a shop decides to voluntarily return the money spent by the shopper due to dissatisfaction reasons or when the shop does not have enough stock of the product purchased. The `REFUND` method request the reversal of a previously captured transaction.

Refunds can be requested by the total or the partial amount (`PARTIAL REFUND`).

### Method Call
The following are the request and response bodies for this transaction type.

#### Refund

{{< tabs tabTotal="2" tabID="3" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Insert the ID of the order here.
parameters.put(PayU.PARAMETERS.ORDER_ID, "40049920");

// Insert the ID of the transaction here.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "96535b36-99db-4c66-bd87-6ad5c59b25a8");

// Enter the refund reason here
parameters.put(PayU.PARAMETERS.REASON, "Reason for requesting the refund of the transaction");

TransactionResponse response = PayUPayments.doRefund(parameters);

//Response
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
	// Insert the ID of the order here.
	PayUParameters::ORDER_ID => "40049920",

	// Insert the ID of the transaction here.
	PayUParameters::TRANSACTION_ID => "96535b36-99db-4c66-bd87-6ad5c59b25a8",

	// Enter the refund reason here
	PayUParameters::REASON => "Reason for requesting the refund of the transaction",
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

// Insert the ID of the order here.
parameters.put(PayU.PARAMETERS.ORDER_ID, "40049920");

// Insert the ID of the transaction here.
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, "96535b36-99db-4c66-bd87-6ad5c59b25a8");

// -- Partial Refund Value --
// Enter the partial refund value here.
parameters.put(PayU.PARAMETERS.VALUE, "950");
// Enter the currency here.
parameters.put(PayU.PARAMETERS.CURRENCY, ""+Currency.CLP.name());

// Enter the partial refund reason here
parameters.put(PayU.PARAMETERS.REASON, "Reason for requesting the partial refund of the transaction");

TransactionResponse response = PayUPayments.doPartialRefund(parameters);

//Response
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
	// Insert the ID of the order here.
	PayUParameters::ORDER_ID => "40049920",

	// Insert the ID of the transaction here.
	PayUParameters::TRANSACTION_ID => "96535b36-99db-4c66-bd87-6ad5c59b25a8",

  // -- Partial Refund Value --
  // Enter the partial refund value here.
  PayUParameters::VALUE => "950",
  // Enter the currency here.
  PayUParameters::CURRENCY => "CLP",

	// Enter the partial refund reason here
	PayUParameters::REASON => "Reason for requesting the partial refund of the transaction",
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
As mentioned before, refund request follows an approval in flow in which, PayU take 1 to 3 days to process the request and approves or rejects the request. If you want to know the status of the refund, you have two options:

#### Check status through the PayU Module
1. Log into you PayU module account. In the left panel, expand the _**Transactions**_ menu and select _**Sales Report**_ option.

![PrintScreen](/assets/Refunds/Refunds_en_01.png)

2. Use the _**Filter my sales**_ field to find the order using the order and the transaction id.

![PrintScreen](/assets/Refunds/Refunds_en_02.png)

3. The Status column show whether the refund has been approved or rejected; if the refund has not been approved, this column shows that the refund has been requested.

![PrintScreen](/assets/Refunds/Refunds_en_03.png)

#### Check status using queries
You can consult the state of the refund by using the [Queries SDK]({{< ref "QueriesSDK.md" >}}). In the response of the query, you need to send the order id.

When query an order, the system returns the last transaction associated with the Order.

There are three possible status in the response of your request:
* **Unresolved request**: if the request has not been resolved, the order found in the query appears in `CAPTURED` status, the first transaction type is `AUTHORIZATION_AND_CAPTURE` and the first transaction status is `APPROVED`.
* **Approved**: if the refund request is approved by a PayU’s customer service agent, the order found in the query appears in `REFUNDED` status , the first transaction type is `REFUND` and the first transaction status is `APPROVED`.
* **Declined**: if the refund request is approved by a PayU’s customer service agent, the order found in the query appears in `CAPTURED` status , the first transaction type is `REFUND` and the first transaction status is `DECLINED`.
