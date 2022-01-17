---
title: "Recurring payments - SDK"
linkTitle: "Recurring payments - SDK"
date: 2021-09-28T13:40:06-05:00
type: docs
Description: >
   Recurring payments are automated payments that are carried out periodically (daily, monthly, annually), of those consumption charges of goods or services such as memberships, subscriptions, policies or receipts with fixed value; that were previously authorized by the customer.
weight: 10
---
<!-- Modal window start -->
<style>
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  animation: animatetop 0.4s;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.header {
  color: white;
  background-color: #ED6A5A;
  padding: 15px;
}



</style>

<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <header class="header">
      <p style="display:contents;color:white"><b>Deprecated feature</b></p>
      <span class="close" style="color:white">&times;</span>
    </header>
    <p style="padding:20px">The <b><i>Recurring Payments</i></b> feature offered by PayU has been deprecated. Therefore, we don't longer offer it to new or existing merchants. The following topic is available as a reference for merchants who still have it enabled.<br>We <b>WILL NOT</b> activate this feature again.<br><br>If you need to implement a <b><i>Recurring Payments</i></b> or <b><i>1 Click payment</i></b> solution, refer to <a href="/en/docs/services/tokenization.html">Tokenization</a>.</p>
  </div>

</div>

<script>
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var toc = document.getElementById("td-section-nav");

// When the page loads, open the modal 
window.onload = function() {
  modal.style.display = "block";
  toc.style['pointer-events'] = 'none';
  toc.style.backgroundColor = "rgba(0,0,0,-0.6)";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  toc.removeAttribute("style")
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if ((event.target == modal) || (event.target.id == "td-sidebar-menu")) {
    modal.style.display = "none";
    toc.removeAttribute("style")
  }
}
</script>

<!-- Modal window end -->

{{% alert title="Note" color="warning"%}}
Recurring payments has been deprecated and it is not offered for new commerces.
{{% /alert %}}

## How does it work? 
![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/pagos-recurrentes1-en.jpg)

{{% alert title="Consider" color="info"%}}
Recurring payments is only available for accounts in **Brazil**, **Colombia**, **Peru**, and **Mexico**.
{{% /alert %}}

Pointing to the corresponding URLs:

{{< tabs tabTotal="2" tabID="30" tabName1="Java" tabName2="PHP" >}}
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

The available methods for recurring payments are: PLAN, CUSTOMER, CREDIT CARD, SUBSCRIPTION and ADDITIONAL CHARGES. Below is a description of each.

## 1. Plan
Using this feature you can register a recurring plan and thus get its identifier.  

The following operations are available:  
<div class="variables"></div>

| URL | Method | Descripción |
|---|---|---|
| /rest/v4.3/plans | `POST` | Creating a new plan for subscriptions associated with the merchant. |
| /rest/v4.3/plans/{planCode} | `PUT` | Update information about a plan for subscriptions.<br>`{planCode}`: Plan’s identification code for the merchant. |
| /rest/v4.3/plans/{planCode} | `GET` | Check all the information of a plan for subscriptions associated with the merchant.<br>`{planCode}`: Plan’s identification code for the merchant |
| /rest/v4.3/plans/{planCode} | `DELETE` | Delete an entire subscription plan associated with the merchant.<br>`{planCode}`: Plan’s identification code for the merchant. |

### Creation

{{< tabs tabTotal="2" tabID="1" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Enter the plan‘s description here.
parameters.put(PayU.PARAMETERS.PLAN_DESCRIPTION, "Basic Plan");
// Enter the identification code of the plan here.
parameters.put(PayU.PARAMETERS.PLAN_CODE, "ASd456" + System.currentTimeMillis());
// Enter the interval of the plan here.
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL, "MONTH");
// Enter the number of intervals here.
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL_COUNT, "12");
// Enter the currency of the plan here.
parameters.put(PayU.PARAMETERS.PLAN_CURRENCY, "COP");
// Enter the value of the plan here.
parameters.put(PayU.PARAMETERS.PLAN_VALUE, "50000");
// (OPTIONAL) Enter the tax value here.
parameters.put(PayU.PARAMETERS.PLAN_TAX, "10000");
// (OPTIONAL) Enter the tax base return here.
parameters.put(PayU.PARAMETERS.PLAN_TAX_RETURN_BASE, "40000");
// Enter the account ID of the plan here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "2");
// Enter the retry interval here
parameters.put(PayU.PARAMETERS.PLAN_ATTEMPTS_DELAY, "2");
// Enter the amount of charges that make up the plan here
parameters.put(PayU.PARAMETERS.PLAN_MAX_PAYMENTS, "2");
SubscriptionPlan response = PayUPlans.create(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Enter the plan‘s description here.
	PayUParameters::PLAN_DESCRIPTION => "Sample Plan 001",
	// Enter the identification code of the plan here.
	PayUParameters::PLAN_CODE => "sample-plan-code-001",
	// Enter the interval of the plan here.
	//DAY||WEEK||MONTH||YEAR
	PayUParameters::PLAN_INTERVAL => "MONTH",
	// Enter the number of intervals here.
	PayUParameters::PLAN_INTERVAL_COUNT => "1",
	// Enter the currency of the plan here.
	PayUParameters::PLAN_CURRENCY => "COP",
	// Enter the value of the plan here.
	PayUParameters::PLAN_VALUE => "10000",
	// (OPTIONAL) Enter the tax value here.
	PayUParameters::PLAN_TAX => "1600",
	// (OPTIONAL) Enter the tax base return here.
	PayUParameters::PLAN_TAX_RETURN_BASE => "8400",
	// Enter the account ID of the plan here.
	PayUParameters::ACCOUNT_ID => "512321",
	// Enter the retry interval here
	PayUParameters::PLAN_ATTEMPTS_DELAY => "1",
	// Enter the amount of charges that make up the plan here
	PayUParameters::PLAN_MAX_PAYMENTS => "12",
	// Enter the total amount of retries here for each rejected subscription payment
	PayUParameters::PLAN_MAX_PAYMENT_ATTEMPTS => "3",
	// Enter the maximum amount of pending payments here that a subscription may have before being canceled.
	PayUParameters::PLAN_MAX_PENDING_PAYMENTS => "1",
	// Enter the amount of trial days of the subscription here.
	PayUParameters::TRIAL_DAYS => "30",
);

$response = PayUSubscriptionPlans::create($parameters);
if($response){
	$response->id;
}
```
{{< /tab >}}
{{< /tabs >}}

### Update

{{< tabs tabTotal="2" tabID="2" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Enter the new plan‘s description here
parameters.put(PayU.PARAMETERS.PLAN_DESCRIPTION, "New Basic Plan");
// Enter the identification code of the plan here (Must be an existing code)
parameters.put(PayU.PARAMETERS.PLAN_CODE, "ASd4561379351327982");
// Enter the currency of the plan here (Must be the same used during the creation of the plan)
parameters.put(PayU.PARAMETERS.PLAN_CURRENCY, "COP");
// Enter the new value of the plan here
parameters.put(PayU.PARAMETERS.PLAN_VALUE, "100000");
// (OPTIONAL) Enter the tax value here
parameters.put(PayU.PARAMETERS.PLAN_TAX, "10000");
// (OPTIONAL) Enter the tax base return here
parameters.put(PayU.PARAMETERS.PLAN_TAX_RETURN_BASE, "40000");
// Enter the retry interval here
parameters.put(PayU.PARAMETERS.PLAN_ATTEMPTS_DELAY, "3");
SubscriptionPlan response;
response = PayUPlans.update(parameters);
```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Enter the plan‘s description here.
	PayUParameters::PLAN_DESCRIPTION => "New Sample Plan 001",
	// Enter the identification code of the plan here.
	PayUParameters::PLAN_CODE => "sample-plan-code-001",
	// Enter the currency of the plan here.
	PayUParameters::PLAN_CURRENCY => "COP",
	// Enter the value of the plan here.
	PayUParameters::PLAN_VALUE => "10000",
	// (OPTIONAL) Enter the tax value here.
	PayUParameters::PLAN_TAX => "0",
	// (OPTIONAL) Enter the tax base return here.
	PayUParameters::PLAN_TAX_RETURN_BASE => "0",
	// Enter the retry interval here
	PayUParameters::PLAN_ATTEMPTS_DELAY => "1",
	// Enter the total amount of retries here for each rejected subscription payment
	PayUParameters::PLAN_MAX_PAYMENT_ATTEMPTS => "3",
	// Enter the maximum amount of pending payments here that a subscription may have before being canceled.
	PayUParameters::PLAN_MAX_PENDING_PAYMENTS => "1",
);

$response = PayUSubscriptionPlans::update($parameters);
if($response){
}
```
{{< /tab >}}
{{< /tabs >}}

### Query

{{< tabs tabTotal="2" tabID="3" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Enter the identification code of the plan here
parameters.put(PayU.PARAMETERS.PLAN_CODE, "ASd4561379351327982");
SubscriptionPlan response = PayUPlans.find(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Enter the identification code of the plan here.
	PayUParameters::PLAN_CODE => "sample-plan-code-001",
);

$response = PayUSubscriptionPlans::find($parameters);
if($response) {
	 $response->id;
	 $response->description;
	 $response->accountId;
	 $response->intervalCount;
	 $response->interval;
	 $response->maxPaymentsAllowed;
	 $response->maxPaymentAttempts;
	 $response->paymentAttemptsDelay;
	 $response->maxPendingPayments;
	 $response->trialDays;
}
```
{{< /tab >}}
{{< /tabs >}}

### Deletion

{{< tabs tabTotal="2" tabID="4" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Enter the identification code of the plan here
parameters.put(PayU.PARAMETERS.PLAN_CODE, "ASd4561379351327982");
boolean response = PayUPlans.delete(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Enter the identification code of the plan here.
	PayUParameters::PLAN_CODE => "sample-plan-code-001",
);

$response = PayUSubscriptionPlans::delete($parameters);
if($response) {
}
```
{{< /tab >}}
{{< /tabs >}}

## 2. Customer
A customer is the unit that identifies who will be the beneficiary of a provided product or service and who is associated with a recurring payment plan.  

The following operations are available:  
<div class="variables"></div>

| URL | Method | Descripción |
|---|---|---|
| /rest/v4.3/customers/ | `POST` | Creation of a customer in the system. |
| /rest/v4.3/customers/{customerId} | `PUT` | Updates the customer’s information in the system.<br>`{customerId}`: Identifier of the client to be updated. |
| /rest/v4.3/customers/{customerId} | `GET` | Queries the information related to the customer.<br>`{customerId}`: Identifier of the client from which you want to find the associated information. |
| /rest/v4.3/customers/{customerId} | `DELETE` | Removes a user from the system.<br>`{customerId}`: Identifier of the client to be deleted. |

### Creation

{{< tabs tabTotal="2" tabID="5" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Enter the costumer name here.
parameters.put(PayU.PARAMETERS.CUSTOMER_NAME, "Oscar");
// Enter the costumer email here.
parameters.put(PayU.PARAMETERS.CUSTOMER_EMAIL, "oscar.romero@payulatam.com");
// Operation create costumer
Customer response = PayUCustomers.create(parameters);
```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Enter the costumer name here.
	PayUParameters::CUSTOMER_NAME => "Pedro Perez",
	// Enter the costumer email here.
	PayUParameters::CUSTOMER_EMAIL => "pperez@payulatam.com"
);

$response = PayUCustomers::create($parameters);

if($response) {
	$response->id;
}
```
{{< /tab >}}
{{< /tabs >}}

### Update

{{< tabs tabTotal="2" tabID="6" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Enter the customer ID here.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "f543exh3zh5o");
// Enter the custumer name here.
parameters.put(PayU.PARAMETERS.CUSTOMER_NAME, "Oscar");
// Enter the custumer email here.
parameters.put(PayU.PARAMETERS.CUSTOMER_EMAIL, "oscarromero@payulatam.com");
// Operation create costumer
Customer response = PayUCustomers.update(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Enter the custumer ID here.
	PayUParameters::CUSTOMER_ID => "24978c6l3e",
	// Enter the custumer name here.
	PayUParameters::CUSTOMER_NAME => "Pedro Perez",
	// Enter the custumer email here.
	PayUParameters::CUSTOMER_EMAIL => "pperez@payulatam.com"
);
$response = PayUCustomers::update($parameters);

if($response){

}
```
{{< /tab >}}
{{< /tabs >}}

### Query

{{< tabs tabTotal="2" tabID="7" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Enter the costumer ID here.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "17ylzjz6bxz");
Customer response = PayUCustomers.find(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Enter the costumer name here.
	PayUParameters::CUSTOMER_ID => "24978c6l3e",
);
$response = PayUCustomers::find($parameters);

if($response) {
	$response->fullName;
	$response->email;
	$creditCards=$response->creditCards;

	foreach ($creditCards as $creditCard) {
		$creditCard->token;
		$creditCard->number;
		$creditCard->type;
		$creditCard->name;
		$address=$creditCard->address;
		$address->line1;
		$address->line2;
		$address->line3;
		$address->city;
		$address->state;
		$address->country;
		$address->postalCode;
		$address->phone;
	}
}
```
{{< /tab >}}
{{< /tabs >}}

### Deletion

{{< tabs tabTotal="2" tabID="8" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Enter the costumer ID here.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "17ylzjz6bxz");
boolean response = PayUCustomers.delete(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Enter the costumer ID here.
	PayUParameters::CUSTOMER_ID => "24978c6l3e"
);

$response = PayUCustomers::delete($parameters);

if($response){

}
```
{{< /tab >}}
{{< /tabs >}}

## 3. Credit card
Is the payment method that relates a customer to a plan. It is composed of the credit card number (that will be tokenized to store data securely), the expiration date of the card and some additional address data.  

The following operations are available:  
<div class="variables"></div>

| URL | Method | Descripción |
|---|---|---|
| /rest/v4.3/customers/{customerID}/creditCards | `POST` | Creating a credit card (Token) and assigning it to a user.<br>`{customerId}`: Identifier of the client with whom you are going to associate the token with. |
| /rest/v4.3/creditCards/{creditCardId} | `PUT` | Update a token’s information.<br>`{creditCardId}`: Identifier of the token to be updated. |
| /rest/v4.3/creditCards/{creditCardId} | `GET` | Check the information of a credit card (Token) data identifier.<br>`{creditCardId}`: Credit Card Token you want to consult. |
| /rest/v4.3/customers/{customerID}/creditCards/{creditCardId} | `DELETE` | Delete a credit card (Token) associated with a user.<br>`{customerId}`: Identifier of the client of whom you are going to delete the token.<br>`{creditCardId}`: Identifier of the token to be deleted. |

### Creation

{{< tabs tabTotal="2" tabID="9" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
//Enter the payer's ID here.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "180oklk4o56");
//Enter the number of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4005580000029205");
//Enter the expiration date of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2015/01");
// Enter the credit card’s franchise.
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");
//Enter the payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "Nombre");
//Enter the payer's identification document related to the credit card here.
parameters.put(PayU.PARAMETERS.CREDIT_CARD_DOCUMENT, "1020304050");
// -- The following parameters are optional --
// Enter the first part of the address here
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Calle falsa");
// Enter the second part of the address here (if required).
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "123");
// Enter the third part of the address here (if required).
parameters.put(PayU.PARAMETERS.PAYER_STREET_3, "patio trasero");
// Enter the city here.
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Bogotá");
// Enter the state here.
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Bogotá D.C.");
// Enter the country here.
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, PaymentCountry.CO.name());
// Enter the postal code here.
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "00000");
// Enter the contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "300300300");
PaymentPlanCreditCard response = PayUCreditCard.create(parameters);
LoggerUtil.info("{0}", response);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Enter the costumer ID here.
	PayUParameters::CUSTOMER_ID => "6eb24tzp40",
	// Enter the costumer name here.
	PayUParameters::PAYER_NAME => "Pedro Perez",
	//Enter the number of the credit card here
	PayUParameters::CREDIT_CARD_NUMBER => "4242424242424242",
	// Enter the expiration date of the credit card here with format YYYY/MM
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2018/01",
	// Enter the credit card’s franchise
	PayUParameters::PAYMENT_METHOD => "VISA",
        //Enter the payer's identification document related to the credit card here.
        PayUParameters::CREDIT_CARD_DOCUMENT => "1020304050",
	// (OPTIONAL) Enter the payer's identification document here.
	PayUParameters::PAYER_DNI => "101010123",
	// (OPTIONAL) Enter the first part of the address here
	PayUParameters::PAYER_STREET => "Street 93B",
	// (OPTIONAL) Enter the second part of the address here
	PayUParameters::PAYER_STREET_2 => "17 25",
	// (OPTIONAL) Enter the third part of the address here
	PayUParameters::PAYER_STREET_3 => "Office 301",
	// (OPTIONAL) Enter the city of the payer here.
	PayUParameters::PAYER_CITY => "Bogotá",
	// (OPTIONAL) Enter the state of the payer here.
	PayUParameters::PAYER_STATE => "Bogotá D.C.",
	// (OPTIONAL) Enter the code of the country here.
	PayUParameters::PAYER_COUNTRY => "CO",
	// (OPTIONAL) Enter the postal code of the payer here.
	PayUParameters::PAYER_POSTAL_CODE => "00000",
	// (OPTIONAL) Enter the contact phone here.
	PayUParameters::PAYER_PHONE => "300300300"
);

$response = PayUCreditCards::create($parameters);

if($response){
	$response->token;
}
```
{{< /tab >}}
{{< /tabs >}}

### Update

{{< tabs tabTotal="2" tabID="10" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Enter the credit card’s token identifier here.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "180oklk4o56");
//Enter the expiration date of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2015/01");
//Enter the payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "Nombre");
//Enter the payer's identification document related to the credit card here.
parameters.put(PayU.PARAMETERS.CREDIT_CARD_DOCUMENT, "1020304050");
// -- The following parameters are optional –
// Enter the first part of the address here.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Calle 5476");
// Enter the second part of the address here (if applies)
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "123");
// Enter the third part of the address here (if applies)
parameters.put(PayU.PARAMETERS.PAYER_STREET_3, "patio trasero");
// Enter the city here.
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Bogotá");
// Enter the state here.
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Bogotá D.C.");
// Enter the country here.
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, PaymentCountry.CO.name());
// Enter the postal code here.
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "00000");
// Enter the contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "300300300");
PaymentPlanCreditCard response = PayUCreditCard.update(parameters);
LoggerUtil.info("{0}", response);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Enter the credit card’s token identifier here.
	PayUParameters::TOKEN_ID => "6f5f32d9-9c6f-4d57-97d7-68cde86f9266",
	// Enter the costumer name here.
	PayUParameters::PAYER_NAME => "Pedro Perez",
	Enter the expiration date of the credit card here with format YYYY/MM
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2018/01",
        //Enter the payer's identification document related to the credit card here.
        PayUParameters::CREDIT_CARD_DOCUMENT => "1020304050",
	// (OPTIONAL) Enter the payer's identification document here.
	PayUParameters::PAYER_DNI => "101010123",
	// (OPTIONAL) Enter the first part of the address here
	PayUParameters::PAYER_STREET => "Street 93B",
	// (OPTIONAL) Enter the second part of the address here
	PayUParameters::PAYER_STREET_2 => "17 25",
	// (OPTIONAL) Enter the third part of the address here
	PayUParameters::PAYER_STREET_3 => "Office 301",
	// (OPTIONAL) Enter the city of the payer here.
	PayUParameters::PAYER_CITY => "Bogotá",
	// (OPTIONAL) Enter the state of the payer here.
	PayUParameters::PAYER_STATE => "Bogotá D.C.",
	// (OPTIONAL) Enter the code of the country here.
	PayUParameters::PAYER_COUNTRY => "CO",
	// (OPTIONAL) Enter the postal code of the payer here.
	PayUParameters::PAYER_POSTAL_CODE => "00000",
	// (OPTIONAL) Enter the contact phone here.
	PayUParameters::PAYER_PHONE => "300300300"
);

$response= PayUCreditCards::update($parameters);

if($response){

}
```
{{< /tab >}}
{{< /tabs >}}

### Query

{{< tabs tabTotal="2" tabID="11" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Enter the credit card’s token identifier here.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "25181bb1-b07f-4b9b-ae5d-6b13436c706d");
PaymentPlanCreditCard response = PayUCreditCard.find(parameters);
LoggerUtil.info("{0}", response);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Enter the credit card’s token identifier here.
	PayUParameters::TOKEN_ID => "6f5f32d9-9c6f-4d57-97d7-68cde86f9266"
);

$response = PayUCreditCards::find($parameters);

if($response){
	$response->token;
	$response->number;
	$response->type;
	$response->name;
        $response->document;
	$address=$response->address;
	$address->line1;
	$address->line2;
	$address->line3;
	$address->city;
	$address->state;
	$address->country;
	$address->postalCode;
	$address->phone;
}
```
{{< /tab >}}
{{< /tabs >}}

### Deletion

{{< tabs tabTotal="2" tabID="12" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Enter the credit card’s token identifier here.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "25181bb1-b07f-4b9b-ae5d-6b13436c706d");
// Enter the costumer ID here.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "17ylzjz6bxz");
boolean response = PayUCreditCard.delete(parameters);
LoggerUtil.info("{0}", response);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Enter the credit card’s token identifier here.
	PayUParameters::TOKEN_ID => "6f5f32d9-9c6f-4d57-97d7-68cde86f9266",
	// Enter the costumer ID here.
	PayUParameters::CUSTOMER_ID => "6eb24tzp40"
);

$response = PayUCreditCards::delete($parameters);

if($response){

}
```
{{< /tab >}}
{{< /tabs >}}

## 4. Subscription
A subscription is the relationship between a payment plan, a payer and a credit card. It is the element that controls the execution of the respective collections.  

The following operations are available:  
<div class="variables"></div>

| URL | Methods | Descripción |
|---|---|---|
| /rest/v4.3/subscriptions/ | `POST` | Creating a new subscription of a client to a plan. |
| /rest/v4.3/subscriptions/{subscriptionId} | `PUT` | Update information associated with the specified subscription. At the moment it is only possible to update the token of the credit card to which the charge of the subscription is made.<br>`{subscriptionId}`: Identification of the subscription. |
| /rest/v4.3/subscriptions/{subscriptionId} | `GET` | Check the basic information associated with the specified subscription.<br>`{subscriptionId}`: Identification of the subscription. |
| /rest/v4.3/subscriptions/{subscriptionId} | `DELETE` | Unsubscribe, delete the relationship of the customer with the plan.<br>`{subscriptionId}`: Identification of the subscription. |


### Creation
 
<details>
<summary>With all new items</summary>
<br>

{{< tabs tabTotal="2" tabID="13" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
//Enter the number of installments here.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Enter the amount of trial days here.
parameters.put(PayU.PARAMETERS.TRIAL_DAYS, "10");

// -- Client parameters --
// Enter the costumer name here.
parameters.put(PayU.PARAMETERS.CUSTOMER_NAME, "Pedro Perez");
// Enter the costumer email here.
parameters.put(PayU.PARAMETERS.CUSTOMER_EMAIL, "pperezz@payulatam.com");

//-- Credit card parameters --
// Enter the payer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "Sample User Name");
//Enter the number of the credit card here.
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4242424242424242");
Enter the expiration date of the credit card here with format YYYY/MM
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2018/01");
// Enter the credit card’s franchise
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");
//Enter the payer's identification document related to the credit card here.
parameters.put(PayU.PARAMETERS.CREDIT_CARD_DOCUMENT, "1020304050");
// (OPTIONAL) Enter the payer's identification document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "1020304050");
// (OPTIONAL) Enter the first part of the address here
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Address Name");
// (OPTIONAL) Enter the second part of the address here
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "17 25");
// (OPTIONAL) Enter the third part of the address here
parameters.put(PayU.PARAMETERS.PAYER_STREET_3, "Of 301");
// (OPTIONAL) Enter the city of the payer here.
parameters.put(PayU.PARAMETERS.PAYER_CITY, "City Name");
// (OPTIONAL) Enter the state of the payer here.
parameters.put(PayU.PARAMETERS.PAYER_STATE, "State Name");
// (OPTIONAL) Enter the code of the country here.
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CO");
// (OPTIONAL) Enter the postal code of the payer here.
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "00000");
// (OPTIONAL) Enter the contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "300300300");

// -- Plan parameters --
// Enter the plan‘s description here.
parameters.put(PayU.PARAMETERS.PLAN_DESCRIPTION, "Sample Plan 001");
// Enter the identification code of the plan here.
parameters.put(PayU.PARAMETERS.PLAN_CODE, "sample-plan-code-001");
// Enter the interval of the plan here.
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL, "MONTH");
// Enter the number of intervals here.
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL_COUNT, "1");
// Enter the currency of the plan here.
parameters.put(PayU.PARAMETERS.PLAN_CURRENCY, "COP");
// Enter the value of the plan here.
parameters.put(PayU.PARAMETERS.PLAN_VALUE, "10000");
// (OPTIONAL) Enter the tax value here.
parameters.put(PayU.PARAMETERS.PLAN_TAX, "1600");
// (OPTIONAL) Enter the tax base return here.
parameters.put(PayU.PARAMETERS.PLAN_TAX_RETURN_BASE, "8400");
// Enter the account ID of the plan here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512321");
// Enter the retry interval here
parameters.put(PayU.PARAMETERS.PLAN_ATTEMPTS_DELAY, "1");
// Enter the amount of charges that make up the plan here
parameters.put(PayU.PARAMETERS.PLAN_MAX_PAYMENTS, "12");
// Enter the total amount of retries here for each rejected subscription payment
parameters.put(PayU.PARAMETERS.PLAN_MAX_PAYMENT_ATTEMPTS, "3");
// Enter the maximum amount of pending payments here that a subscription may have before being canceled.
parameters.put(PayU.PARAMETERS.PLAN_MAX_PENDING_PAYMENTS, "1");
// Enter the amount of trial days of the subscription here.
parameters.put(PayU.PARAMETERS.TRIAL_DAYS, "30");

Subscription response = PayUSubscription.create(parameters);

if(response!=null){
	response.getId();
	response.getCustomer().getId();
	response.getCreditCardToken();

}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	//Enter the number of installments here.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Enter the amount of trial days here.
	PayUParameters::TRIAL_DAYS => "10",

	// -- Client parameters --
	// Enter the costumer name here.
	PayUParameters::CUSTOMER_NAME => "Pedro Perez",
	// Enter the costumer email here.
	PayUParameters::CUSTOMER_EMAIL => "pperezz@payulatam.com",

	//-- Credit card parameters --
	// Enter the payer's name here.
	PayUParameters::PAYER_NAME => "Sample User Name",
	// Enter the number of the credit card here
	PayUParameters::CREDIT_CARD_NUMBER => "4242424242424242",
	// Enter the expiration date of the credit card here with format YYYY/MM
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2014/12",
	// Enter the credit card’s franchise
	PayUParameters::PAYMENT_METHOD => "VISA",
        //Enter the payer's identification document related to the credit card here.
        PayUParameters::CREDIT_CARD_DOCUMENT => "1020304050",
	// (OPTIONAL) Enter the payer's identification document here.
	PayUParameters::PAYER_DNI => "1020304050",
	// (OPTIONAL) Enter the first part of the address here
	PayUParameters::PAYER_STREET => "Address Name",
	// (OPTIONAL) Enter the second part of the address here
	PayUParameters::PAYER_STREET_2 => "17 25",
	// (OPTIONAL) Enter the third part of the address here
	PayUParameters::PAYER_STREET_3 => "Of 301",
	// (OPTIONAL) Enter the city of the payer here.
	PayUParameters::PAYER_CITY => "City Name",
	// (OPTIONAL) Enter the state of the payer here.
	PayUParameters::PAYER_STATE => "State Name",
	// (OPTIONAL) Enter the code of the country here.
	PayUParameters::PAYER_COUNTRY => "CO",
	// (OPTIONAL) Enter the postal code of the payer here.
	PayUParameters::PAYER_POSTAL_CODE => "00000",
	// (OPTIONAL) Enter the contact phone here.
	PayUParameters::PAYER_PHONE => "300300300",

	// -- Plan parameters --
	// Enter the plan‘s description here.
	PayUParameters::PLAN_DESCRIPTION => "Sample Plan 001",
	// Enter the identification code of the plan here.
	PayUParameters::PLAN_CODE => "sample-plan-code-001",
	// Enter the interval of the plan here.
	PayUParameters::PLAN_INTERVAL => "MONTH",
	// Enter the number of intervals here.
	PayUParameters::PLAN_INTERVAL_COUNT => "1",
	// Enter the currency of the plan here.
	PayUParameters::PLAN_CURRENCY => "COP",
	// Enter the value of the plan here.
	PayUParameters::PLAN_VALUE => "10000",
	// (OPTIONAL) Enter the tax value here.
	PayUParameters::PLAN_TAX => "1600",
	// (OPTIONAL) Enter the tax base return here.
	PayUParameters::PLAN_TAX_RETURN_BASE => "8400",
	// Enter the account ID of the plan here.
	PayUParameters::ACCOUNT_ID => "512321",
	// Enter the retry interval here
	PayUParameters::PLAN_ATTEMPTS_DELAY => "1",
	// Enter the amount of charges that make up the plan here
	PayUParameters::PLAN_MAX_PAYMENTS => "12",
	// Enter the total amount of retries here for each rejected subscription payment
	PayUParameters::PLAN_MAX_PAYMENT_ATTEMPTS => "3",
	// Enter the maximum amount of pending payments here that a subscription may have before being canceled.
	PayUParameters::PLAN_MAX_PENDING_PAYMENTS => "1",
	// Enter the amount of trial days of the subscription here.
	PayUParameters::TRIAL_DAYS => "30",
);

$response = PayUSubscriptions::createSubscription($parameters);

if($response){
	$response->id;
	$response->plan->id;
	$response->customer->id;
}
```
{{< /tab >}}
{{< /tabs >}}

</details>
<details>
<summary>With all existing elements</summary>
<br>

{{< tabs tabTotal="2" tabID="14" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Enter the plan code to subscribe
parameters.put(PayU.PARAMETERS.PLAN_CODE, "sample-plan-code-001");
//Enter the payer's ID here.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "eab38z33hh2");
// Enter the credit card’s token identifier here.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "a068e980-a6d7-4a19-b549-75c04f39ec22");
// Enter the amount of trial days of the subscription here.
parameters.put(PayU.PARAMETERS.TRIAL_DAYS, "10");
//Enter the number of installments here.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
Subscription response = PayUSubscription.create(parameters);

if(response!=null){
	response.getId();

}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Enter the plan code to subscribe
	PayUParameters::PLAN_CODE => "sample-plan-code-001s",
	//Enter the payer's ID here.
	PayUParameters::CUSTOMER_ID => "f03612gyte",
	/// Enter the credit card’s token identifier here.
	PayUParameters::TOKEN_ID => "79490437-d64a-4dc6-baeb-8d52492b0a00",
	// Enter the amount of trial days of the subscription here.
	PayUParameters::TRIAL_DAYS => "10",
	//Enter the number of installments here.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
);

$response = PayUSubscriptions::createSubscription($parameters);

if($response){
	$response->id;
}
```
{{< /tab >}}
{{< /tabs >}}

</details>
<details>
<summary>With plan and client already created, and a new card</summary>
<br>

{{< tabs tabTotal="2" tabID="15" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Enter the amount of trial days of the subscription here.
parameters.put(PayU.PARAMETERS.TRIAL_DAYS, "10");
//Enter the number of installments here.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");

// Enter the plan code to subscribe
parameters.put(PayU.PARAMETERS.PLAN_CODE, "sample-plan-code-001");
//Enter the payer's ID here.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "eab38z33hh2");

//-- Credit card parameters --
//Enter the buyer's name here.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "Sample User Name");
//Enter the number of the credit card here
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4242424242424242");
//Enter the expiration date of the credit card here with format YYYY/MM
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2018/01");
// Enter the credit card’s franchise
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");
//Enter the payer's identification document related to the credit card here.
parameters.put(PayU.PARAMETERS.CREDIT_CARD_DOCUMENT, "1020304050");
// (OPTIONAL) Enter the payer's identification document here.
parameters.put(PayU.PARAMETERS.PAYER_DNI, "1020304050");
// (OPTIONAL) Enter the first part of the address here
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Address Name");
// (OPTIONAL) Enter the second part of the address here
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "17 25");
// (OPTIONAL) Enter the third part of the address here
parameters.put(PayU.PARAMETERS.PAYER_STREET_3, "Of 301");
// (OPTIONAL) Enter the city of the payer here.
parameters.put(PayU.PARAMETERS.PAYER_CITY, "City Name");
// (OPTIONAL) Enter the state of the payer here.
parameters.put(PayU.PARAMETERS.PAYER_STATE, "State Name");
// (OPTIONAL) Enter the code of the country here.
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CO");
// (OPTIONAL) Enter the postal code of the payer here.
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "00000");
// (OPTIONAL) Enter the contact phone here.
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "300300300");

Subscription response = PayUSubscription.create(parameters);

if(response!=null){
	response.getId();
	response.getCreditCardToken();

}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	//Enter the number of installments here.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Enter the amount of trial days here.
	PayUParameters::TRIAL_DAYS => "10",

	// -- Client parameters --
	//Enter the payer's ID here.
	PayUParameters::CUSTOMER_ID => "f03612gyte",

	//-- Credit card parameters --
	//Enter the buyer's name here.
	PayUParameters::PAYER_NAME => "Sample User Name",
	//Enter the number of the credit card here
	PayUParameters::CREDIT_CARD_NUMBER => "4242424242424242",
	// Enter the expiration date of the credit card here with format YYYY/MM
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2014/12",
	// Enter the credit card’s franchise
	PayUParameters::PAYMENT_METHOD => "VISA",
        //Enter the payer's identification document related to the credit card here.
        PayUParameters::CREDIT_CARD_DOCUMENT => "1020304050",
	// (OPTIONAL) Enter the payer's identification document here.
	PayUParameters::PAYER_DNI => "1020304050",
	// (OPTIONAL) Enter the first part of the address here
	PayUParameters::PAYER_STREET => "Address Name",
	// (OPTIONAL) Enter the second part of the address here
	PayUParameters::PAYER_STREET_2 => "17 25",
	// (OPTIONAL) Enter the third part of the address here
	PayUParameters::PAYER_STREET_3 => "Of 301",
	// (OPTIONAL) Enter the city of the payer here.
	PayUParameters::PAYER_CITY => "City Name",
	// (OPTIONAL) Enter the state of the payer here.
	PayUParameters::PAYER_STATE => "State Name",
	// (OPTIONAL) Enter the code of the country here.
	PayUParameters::PAYER_COUNTRY => "CO",
	// (OPTIONAL) Enter the postal code of the payer here.
	PayUParameters::PAYER_POSTAL_CODE => "00000",
	// (OPTIONAL) Enter the contact phone here.
	PayUParameters::PAYER_PHONE => "300300300",

	// -- Plan parameters --
	// Enter the plan code to subscribe
	PayUParameters::PLAN_CODE => "sample-plan-code-001",
 );

$response = PayUSubscriptions::createSubscription($parameters);

if($response){
	$response->id;
}
```
{{< /tab >}}
{{< /tabs >}}

</details>
<details>
<summary>Customer and card already created, and with a new plan</summary>
<br>

{{< tabs tabTotal="2" tabID="16" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
//Enter the number of installments here.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Enter the amount of trial days here.
parameters.put(PayU.PARAMETERS.TRIAL_DAYS, "10");

//Enter the payer's ID here.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "eab38z33hh2");
// Enter the credit card’s token identifier here.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "a068e980-a6d7-4a19-b549-75c04f39ec22");

// -- Plan parameters --
// Enter the plan‘s description here.
parameters.put(PayU.PARAMETERS.PLAN_DESCRIPTION, "Sample Plan 001");
// Enter the identification code of the plan here.
parameters.put(PayU.PARAMETERS.PLAN_CODE, "sample-plan-code-001");
// Enter the interval of the plan here.
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL, "MONTH");
// Enter the number of intervals here.
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL_COUNT, "1");
// Enter the currency of the plan here.
parameters.put(PayU.PARAMETERS.PLAN_CURRENCY, "COP");
// Enter the value of the plan here.
parameters.put(PayU.PARAMETERS.PLAN_VALUE, "10000");
// (OPTIONAL) Enter the tax value here.
parameters.put(PayU.PARAMETERS.PLAN_TAX, "1600");
// (OPTIONAL) Enter the tax base return here.
parameters.put(PayU.PARAMETERS.PLAN_TAX_RETURN_BASE, "8400");
// Enter the account ID of the plan here.
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512321");
// Enter the retry interval here
parameters.put(PayU.PARAMETERS.PLAN_ATTEMPTS_DELAY, "1");
// Enter the amount of charges that make up the plan here
parameters.put(PayU.PARAMETERS.PLAN_MAX_PAYMENTS, "12");
// Enter the total amount of retries here for each rejected subscription payment
parameters.put(PayU.PARAMETERS.PLAN_MAX_PAYMENT_ATTEMPTS, "3");
// Enter the maximum amount of pending payments here that a subscription may have before being canceled.
parameters.put(PayU.PARAMETERS.PLAN_MAX_PENDING_PAYMENTS, "1");
// Enter the amount of trial days here.
parameters.put(PayU.PARAMETERS.TRIAL_DAYS, "30");

Subscription response = PayUSubscription.create(parameters);

if(response!=null){
	response.getId();
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	//Enter the number of installments here.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Enter the amount of trial days here.
	PayUParameters::TRIAL_DAYS => "10",

	//-- Credit card parameters --
	//Enter the payer's ID here.
	PayUParameters::CUSTOMER_ID => "5131879lzbx",
	// Enter the credit card’s token identifier here.
	PayUParameters::TOKEN_ID => "158e5bed-1e76-4bb2-83c2-97dc9bb1522d",

	// -- Plan parameters --
	// Enter the plan‘s description here.
	PayUParameters::PLAN_DESCRIPTION => "Sample Plan 001",
	// Enter the identification code of the plan here.
	PayUParameters::PLAN_CODE => "sample-plan-code-001",
	// Enter the interval of the plan here.
	PayUParameters::PLAN_INTERVAL => "MONTH",
	// Enter the number of intervals here.
	PayUParameters::PLAN_INTERVAL_COUNT => "1",
	// Enter the currency of the plan here.
	PayUParameters::PLAN_CURRENCY => "COP",
	// Enter the value of the plan here.
	PayUParameters::PLAN_VALUE => "10000",
	// (OPTIONAL) Enter the tax value here.
	PayUParameters::PLAN_TAX => "1600",
	// (OPTIONAL) Enter the tax base return here.
	PayUParameters::PLAN_TAX_RETURN_BASE => "8400",
	// Enter the account ID of the plan here.
	PayUParameters::ACCOUNT_ID => "512321",
	// Enter the retry interval here
	PayUParameters::PLAN_ATTEMPTS_DELAY => "1",
	// Enter the amount of charges that make up the plan here
	PayUParameters::PLAN_MAX_PAYMENTS => "12",
	// Enter the total amount of retries here for each rejected subscription payment
	PayUParameters::PLAN_MAX_PAYMENT_ATTEMPTS => "3",
	// Enter the maximum amount of pending payments here that a subscription may have before being canceled.
	PayUParameters::PLAN_MAX_PENDING_PAYMENTS => "1",
	// Enter the amount of trial days of the subscription here.
	PayUParameters::TRIAL_DAYS => "30",
);

$response = PayUSubscriptions::createSubscription($parameters);

if($response){
	$response->id;
	$response->plan->id;
}
```
{{< /tab >}}
{{< /tabs >}}

</details>

### Update (Credit card of a subscription)

{{< tabs tabTotal="1" tabID="17" tabName1="SDK Java">}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Enter the subscription ID here.
parameters.put(PayU.PARAMETERS.SUBSCRIPTION_ID, "320756yk1x0");
// Enter the credit card’s token identifier here.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "a068e980-a6d7-4a19-b549-75c04f39ec22");

Subscription response = PayUSubscription.update(parameters);

if(response!=null){

}
```
{{< /tab >}}
{{< /tabs >}}

### Query
{{< tabs tabTotal="1" tabID="18" tabName1="SDK Java" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Enter the subscription ID here.
parameters.put(PayU.PARAMETERS.SUBSCRIPTION_ID, "320756yk1x0");

Subscription response = PayUSubscription.find(parameters);

if(response!=null){
	response.getCreditCardToken();
	response.getCustomer();
}
```

{{< /tab >}}
{{< /tabs >}}

### Deletion

{{< tabs tabTotal="2" tabID="19" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Ingresa aquí el identifcador de la subscripción.
parameters.put(PayU.PARAMETERS.SUBSCRIPTION_ID, "123");
boolean response = PayUSubscription.cancel(parameters);
LoggerUtil.info("{0}", response);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Enter the subscription ID here.
	PayUParameters::SUBSCRIPTION_ID => "03e481u9l13",
);

$response = PayUSubscriptions::cancel($parameters);

if($response){
}
```
{{< /tab >}}
{{< /tabs >}}

## 5. Additional charges
A charge may be an additional charge or a discount realized on the value of one of the payments that comprise the recurring payment plan. These only affect the next pending item and run once.  

The following operations are available:   
<div class="variables"></div>

| URL | Methods | Descripción |
|---|---|---|
| /rest/v4.3/subscriptions/{subscriptionId}/recurringBillItems | `POST` | Adds extra charges to the respective invoice for the current period.<br>`{subscriptionId}`: Identification of the subscription |
| /rest/v4.3/recurringBillItems/{recurringBillItemId} | `PUT` | Updates the information from an additional charge in an invoice<br>`{recurringBillItemId}`: Identifier of the additional charge. |
| /rest/v4.3/recurringBillItems/{recurringBillItemId} | `GET` | Query extra charge information of an invoice from its identifier.<br>`{recurringBillItemId}`: Identifier of the additional charge |
| /rest/v4.3/recurringBillItems/{recurringBillItemId} | `DELETE` | Remove an extra charge from an invoice.<br>`{recurringBillItemId}`: Identifier of the additional charge. |
| /rest/v4.3/recurringBillItems/ | GET | Query extra charges of shop’s invoices that meet the stipulated filters. The available filters are shown below and should be sent as named parameters in the URL:<br>`{subscriptionId}`: Identification of the subscription.<br>`{description}`: Description entered in the extra charge. |

### Creation
{{< tabs tabTotal="2" tabID="20" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Additional charge description
parameters.put(PayU.PARAMETERS.DESCRIPTION, "Cargo extra de prueba");
// Value of the additional charge
parameters.put(PayU.PARAMETERS.ITEM_VALUE, "20000");
// Currency
parameters.put(PayU.PARAMETERS.CURRENCY, "COP");
// Enter the subscription ID here.
parameters.put(PayU.PARAMETERS.SUBSCRIPTION_ID, "52b04sx2s6");
// Enter the taxes here (optional)
parameters.put(PayU.PARAMETERS.ITEM_TAX, "0");
// Devolution base of the taxes (optional)
parameters.put(PayU.PARAMETERS.ITEM_TAX_RETURN_BASE, "0");
RecurringBillItem response = PayURecurringBillItem.create(parameters);

if(response!=null){
	response.getId();
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Additional charge description
	PayUParameters::DESCRIPTION => "Cargo extra de prueba",
	// Value of the additional charge
	PayUParameters::ITEM_VALUE => "20000",
	// Currency
	PayUParameters::CURRENCY => "COP",
	// Enter the subscription ID here.
	PayUParameters::SUBSCRIPTION_ID => "a9d01imeihk",
	// Enter the taxes here (optional)
	PayUParameters::ITEM_TAX => "0",
	// Devolution base of the taxes (optional)
	PayUParameters::ITEM_TAX_RETURN_BASE => "0",
);

$response = PayURecurringBillItem::create($parameters);

if($response){
	$response->id;
}
```
{{< /tab >}}
{{< /tabs >}}

### Update
{{< tabs tabTotal="2" tabID="21" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Enter the additional charge ID here.
parameters.put(PayU.PARAMETERS.RECURRING_BILL_ITEM_ID, "15tolsvwz7l");
//(OPTIONAL) New description of the additional charge
parameters.put(PayU.PARAMETERS.DESCRIPTION, "Test Item New");
//(OPTIONAL) New value of the additional charge
parameters.put(PayU.PARAMETERS.ITEM_VALUE, "200.5");
//(OPTIONAL) New currency of the additional charge
parameters.put(PayU.PARAMETERS.CURRENCY, "COP");
//(OPTIONAL) New tax value of the additional charge
parameters.put(PayU.PARAMETERS.ITEM_TAX, "15");
//(OPTIONAL) New devolution base of the taxes for the additional charge
parameters.put(PayU.PARAMETERS.ITEM_TAX_RETURN_BASE, "185.5");
RecurringBillItem response = PayURecurringBillItem.update(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Additional charge ID
	PayUParameters::RECURRING_BILL_ITEM_ID => "cbb57ywul2l",
	// Additional charge description
	PayUParameters::DESCRIPTION => "Cargo extra de prueba",
	// Value of the additional charge
	PayUParameters::ITEM_VALUE => "20000",
	// Currency
	PayUParameters::CURRENCY => "COP",
	// Enter the taxes here (optional)
	PayUParameters::ITEM_TAX => "0",
	// Devolution base of the taxes (optional)
	PayUParameters::ITEM_TAX_RETURN_BASE => "0",
);

$response = PayURecurringBillItem::update($parameters);

if($response){
}
```
{{< /tab >}}
{{< /tabs >}}

### Query (by id of extra charge)

{{< tabs tabTotal="2" tabID="22" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Additional charge ID
parameters.put(PayU.PARAMETERS.RECURRING_BILL_ITEM_ID, "5e174m7lgns");

RecurringBillItem response = PayURecurringBillItem.find(parameters);

if(response!=null){

}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Additional charge ID
	PayUParameters::RECURRING_BILL_ITEM_ID => "cbb57ywul2l",
);

$response = PayURecurringBillItem::find($parameters);

if($response){
	$response->description;
	$response->subscriptionId;
	$response->recurringBillId;
}
```
{{< /tab >}}
{{< /tabs >}}

### Deletion

{{< tabs tabTotal="2" tabID="25" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Example request:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Additional charge ID
parameters.put(PayU.PARAMETERS.RECURRING_BILL_ITEM_ID, "15tolsvwz7l");
boolean response = PayURecurringBillItem.delete(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Example request:
```PHP
$parameters = array(
	// Additional charge ID
	PayUParameters::RECURRING_BILL_ITEM_ID => "228bdp236sy",
);

$response = PayURecurringBillItem::delete($parameters);

if($response){

}
```
{{< /tab >}}
{{< /tabs >}}