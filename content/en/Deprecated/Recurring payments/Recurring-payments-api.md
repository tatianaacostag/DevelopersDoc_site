---
title: "Recurring payments - API"
linkTitle: "Recurring payments - API"
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
Recurring payments has been deprecated and it is not offered for commerces.
{{% /alert %}}

## How does it work? 
![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/pagos-recurrentes1-en.jpg)

{{% alert title="Consider" color="info"%}}
Recurring payments is only available for accounts in **Brazil**, **Colombia**, **Peru**, and **Mexico**.
{{% /alert %}}

To ensure proper use of the system, all requests must contain the HTTP authorization header with the shop’s credentials, so that it can be identified who is making the request. For this implementation basic authorization will be used, where the username (API Login) and password (API Key) are sent.
 
These are the data to be sent in the header of the request: The data pass an encrypted base 64 with the format: `API Login : API Key`  
For example, if the API Login is `0123ABCDEF` and the API Key is `A1B2C3D4E5`, then the Authorization header would be:

 
Authorization: ```Basic <base64 of 0123ABCDEF:A1B2C3D4E5>```
Authorization: ```Basic MDEyM0FCQ0RFRjpBMUIyQzNENEU1```  
```HTML
POST /payments-api/4.0/service.cgi HTTP/1.1
Host: sandbox.api.payulatam.com
Content-Type: application/json; charset=utf-8
Accept: application/json
Accept-language: es
Content-Length: length
Authorization: Basic MDEyM0FCQ0RFRjpBMUIyQzNENEU1
```
<br>

Pointing to the relevant URLs:

{{% alert title="API" color="info"%}}
* Test: ```https://sandbox.api.payulatam.com/payments-api/```
* Production: ```https://api.payulatam.com/payments-api/```
{{% /alert %}}

The available methods for recurring payments are: PLAN, CUSTOMER, CREDIT CARD, SUBSCRIPTION and ADDITIONAL CHARGES. Below is a description of each.

## 1. Plan

<details>
<summary>Variables used for the creation of a plan</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|---|
| planCode | Alphanumeric | Min: 1 Max: 255 | Unique code assigned by the merchant to the plan in order to identify it. | All countries |
| description | Alphanumeric | Min: 1 Max: 255 | Plan description. | All countries |
| accountId | Numeric |  | The identifier of the account to which the plan will be associated. | All countries |
| interval | Alphanumeric | Min: 3 Max: 5 | Interval that defines how often the subscription payment is performed. The possible values are: `DAY`, `WEEK`, `MONTH`, and `YEAR`. | All countries |
| intervalCount | Numeric |  | Interval count that defines how often the subscription payment is performed. | All countries |
| maxPaymentsAllowed | Numeric |  | Total amount of payments for the subscription. | All countries |
| maxPaymentAttempts | Numeric | Max: 3 | Total amount of payment attempts performed when a subscription payment is declined. | No |
| paymentAttemptsDelay | Numeric |  | Total amount of waiting days between the payment attempts of the subscription. | All countries |
| maxPendingPayments | Numeric |  | Total amount of pending payments that a subscription can have before it is cancelled. | No |
| trialDays | Numeric |  | Total amount of trial days of the subscription. | No |
| additionalValues.entry.name | Alphanumeric | Min: 1 Max: 255 | The type of amount associated to the plan. The possible values are:<br><ul style="margin-bottom: initial;"><li>`PLAN_VALUE`: total value of the plan.</li><li>`PLAN_TAX_VALUE`: tax value associated to the value of the plan.</li><li>`PLAN_TAX_RETURN_BASE`: tax return base value associated to the value of the plan.</li></ul> | A node for each type. All countries |
| additionalValues.entry.value | Numeric | 19, 2 | Plan value, tax or tax return base according to the additionalValue.entry.name. | All countries |
| additionalValues.entry.currency | Alphanumeric | 3 | The ISO currency code associated with the amount. [See Accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | All countries |

</details>
<br>

Using this feature you can register a recurring plan and thus get its identifier.  

The following operations are available:  
<div class="variables"></div>

| URL | Method | Description |
|---|---|---|
| /rest/v4.3/plans | `POST` | Creating a new plan for subscriptions associated with the merchant. |
| /rest/v4.3/plans/{planCode} | `PUT` | Update information about a plan for subscriptions.<br>`{planCode}`: Plan’s identification code for the merchant. |
| /rest/v4.3/plans/{planCode} | `GET` | Check all the information of a plan for subscriptions associated with the merchant.<br>`{planCode}`: Plan’s identification code for the merchant |
| /rest/v4.3/plans/{planCode} | `DELETE` | Delete an entire subscription plan associated with the merchant.<br>`{planCode}`: Plan’s identification code for the merchant. |

### Creation

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
  "accountId": "512321",
  "planCode": "sample-plan-code-001",
  "description": "Sample Plan 001",
  "interval": "MONTH",
  "intervalCount": "1",
  "maxPaymentsAllowed": "12",
  "paymentAttemptsDelay": "1",
  "additionalValues": [
    {
      "name": "PLAN_VALUE",
      "value": "20000",
      "currency": "COP"
    },
    {
      "name": "PLAN_TAX",
      "value": "1600",
      "currency": "COP"
    },
    {
      "name": "PLAN_TAX_RETURN_BASE",
      "value": "8400",
      "currency": "COP"
    }
  ]
}
```
<br>

Response body:
```JSON
{
  "id": "b3d406d0-abd4-473c-a557-25aa81ff9032",
  "planCode": "sample-plan-code-001",
  "description": "Sample Plan 001",
  "accountId": "512321",
  "intervalCount": 1,
  "interval": "MONTH",
  "maxPaymentsAllowed": 12,
  "maxPaymentAttempts": 0,
  "paymentAttemptsDelay": 1,
  "maxPendingPayments": 0,
  "trialDays": 0,
  "additionalValues": [
    {
      "name": "PLAN_VALUE",
      "value": 20000,
      "currency": "COP"
    },
    {
      "name": "PLAN_TAX",
      "value": 1600,
      "currency": "COP"
    },
    {
      "name": "PLAN_TAX_RETURN_BASE",
      "value": 8400,
      "currency": "COP"
    }
  ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML
<plan>
	<planCode>sample-plan-code-001</planCode>
	<description>Sample Plan 001</description>
	<accountId>512321</accountId>
	<intervalCount>1</intervalCount>
	<interval>MONTH</interval>
	<maxPaymentsAllowed>12</maxPaymentsAllowed>
	<maxPaymentAttempts>3</maxPaymentAttempts>
	<paymentAttemptsDelay>1</paymentAttemptsDelay>
	<maxPendingPayments>0</maxPendingPayments>
	<trialDays>30</trialDays>
	<additionalValues>
		<additionalValue>
			<name>PLAN_VALUE</name>
			<value>10000</value>
			<currency>COP</currency>
		</additionalValue>
		<additionalValue>
			<name>PLAN_TAX</name>
			<value>1600</value>
			<currency>COP</currency>
		</additionalValue>
		<additionalValue>
			<name>PLAN_TAX_RETURN_BASE</name>
			<value>8400</value>
			<currency>COP</currency>
		</additionalValue>
	</additionalValues>
</plan>
```
<br>

Response body:
```XML
<plan>
	<id>0b63bd6d-9a2b-4c40-a314-a70a6bae27e3</id>
	<planCode>sample-plan-code-001</planCode>
	<description>Sample Plan 001</description>
	<accountId>512321</accountId>
	<intervalCount>1</intervalCount>
	<interval>MONTH</interval>
	<maxPaymentsAllowed>12</maxPaymentsAllowed>
	<maxPaymentAttempts>3</maxPaymentAttempts>
	<maxPendingPayments>0</maxPendingPayments>
	<paymentAttemptsDelay>1</paymentAttemptsDelay>
	<trialDays>30</trialDays>
	<additionalValues>
		<additionalValue>
			<name>PLAN_VALUE</name>
			<value>10000</value>
			<currency>COP</currency>
		</additionalValue>
		<additionalValue>
			<name>PLAN_TAX</name>
			<value>1600</value>
			<currency>COP</currency>
		</additionalValue>
		<additionalValue>
			<name>PLAN_TAX_RETURN_BASE</name>
			<value>8400</value>
			<currency>COP</currency>
		</additionalValue>
	</additionalValues>
</plan>
```
{{< /tab >}}
{{< /tabs >}}

### Update

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
  "planCode": "sample-plan-code-001",
  "description": "New Sample Plan 001",
  "paymentAttemptsDelay": "3",
  "maxPendingPayments": "1",
  "maxPaymentAttempts": "1",
  "additionalValues": [
    {
      "name": "PLAN_VALUE",
      "value": "10000",
      "currency": "COP"
    },
    {
      "name": "PLAN_TAX",
      "value": "0",
      "currency": "COP"
    },
    {
      "name": "PLAN_TAX_RETURN_BASE",
      "value": "0",
      "currency": "COP"
    }
  ]
}
```
<br>

Response body:
```JSON
{
  "id": "6b104e86-d6ca-41b5-ae39-834a55ed1565",
  "planCode": "sample-plan-code-001",
  "description": "New Sample Plan 001",
  "accountId": "512321",
  "intervalCount": 1,
  "interval": "MONTH",
  "maxPaymentsAllowed": 12,
  "maxPaymentAttempts": 1,
  "paymentAttemptsDelay": 3,
  "maxPendingPayments": 1,
  "trialDays": 0,
  "additionalValues": [
    {
      "name": "PLAN_VALUE",
      "value": 10000,
      "currency": "COP"
    },
    {
      "name": "PLAN_TAX",
      "value": 0,
      "currency": "COP"
    },
    {
      "name": "PLAN_TAX_RETURN_BASE",
      "value": 0,
      "currency": "COP"
    }
  ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML
<plan>
	<description>New Sample Plan 001</description>
	<maxPaymentAttempts>3</maxPaymentAttempts>
	<paymentAttemptsDelay>1</paymentAttemptsDelay>
	<maxPendingPayments>1</maxPendingPayments>
	<additionalValues>
		<additionalValue>
			<name>PLAN_VALUE</name>
			<value>10000</value>
			<currency>COP</currency>
		</additionalValue>
		<additionalValue>
			<name>PLAN_TAX</name>
			<value>0</value>
			<currency>COP</currency>
		</additionalValue>
		<additionalValue>
			<name>PLAN_TAX_RETURN_BASE</name>
			<value>0</value>
			<currency>COP</currency>
		</additionalValue>
	</additionalValues>
</plan>
```
<br>

Response body:
```XML
<plan>
   <id>6b104e86-d6ca-41b5-ae39-834a55ed1565</id>
   <planCode>sample-plan-code-001</planCode>
   <description>New Sample Plan 001</description>
   <accountId>512321</accountId>
   <intervalCount>1</intervalCount>
   <interval>MONTH</interval>
   <maxPaymentsAllowed>12</maxPaymentsAllowed>
   <maxPaymentAttempts>3</maxPaymentAttempts>
   <maxPendingPayments>1</maxPendingPayments>
   <paymentAttemptsDelay>1</paymentAttemptsDelay>
   <trialDays>0</trialDays>
   <additionalValues>
      <additionalValue>
         <name>PLAN_VALUE</name>
         <value>10000</value>
         <currency>COP</currency>
      </additionalValue>
      <additionalValue>
         <name>PLAN_TAX</name>
         <value>0</value>
         <currency>COP</currency>
      </additionalValue>
      <additionalValue>
         <name>PLAN_TAX_RETURN_BASE</name>
         <value>0</value>
         <currency>COP</currency>
      </additionalValue>
   </additionalValues>
</plan>
```
{{< /tab >}}
{{< /tabs >}}

### Query

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/plans/sample-plan-code-001
```
<br>

Response body:
```JSON
{
  "id": "2a852bf2-ce67-4920-b9a6-66af2c68b4ae",
  "planCode": "sample-plan-code-001",
  "description": "Sample Plan 001",
  "accountId": 1,
  "intervalCount": 1,
  "interval": "MONTH",
  "maxPaymentsAllowed": 12,
  "maxPaymentAttempts": 3,
  "paymentAttemptsDelay": 1,
  "maxPendingPayments": 0,
  "trialDays": 30,
  "additionalValues": [
    {
      "name": "PLAN_TAX",
      "value": 1600,
      "currency": "COP"
    },
    {
      "name": "PLAN_VALUE",
      "value": 20000,
      "currency": "COP"
    }
  ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/plans/sample-plan-code-001
```
<br>

Response body:
```XML
<plan>
	<id>2a852bf2-ce67-4920-b9a6-66af2c68b4ae</id>
	<planCode>sample-plan-code-001</planCode>
	<description>Sample Plan 001</description>
	<accountId>1</accountId>
	<intervalCount>1</intervalCount>
	<interval>MONTH</interval>
	<maxPaymentsAllowed>12</maxPaymentsAllowed>
	<maxPaymentAttempts>3</maxPaymentAttempts>
	<maxPendingPayments>0</maxPendingPayments>
	<paymentAttemptsDelay>1</paymentAttemptsDelay>
	<trialDays>30</trialDays>
	<additionalValues>
		<additionalValue>
			<name>PLAN_VALUE</name>
			<value>20000</value>
			<currency>COP</currency>
		</additionalValue>
	</additionalValues>
</plan>

```
{{< /tab >}}
{{< /tabs >}}

### Deletion

{{< tabs tabTotal="1" tabID="4" tabName1="JSON / XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/plans/sample-plan-code-001
```
<br>

Response body:
```HTTP
HTTP STATUS: 200 OK
```

{{< /tab >}}
{{< /tabs >}}

## 2. Customer
<details>
<summary>Variables used for the creation of a customer</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|---|
| fullName | Alphanumeric | Max: 255 | Customer's complete name. | All countries |
| email | Alphanumeric | Max: 255 | Customer's email address. | All countries |

</details>
<br>

A customer is the unit that identifies who will be the beneficiary of a provided product or service and who is associated with a recurring payment plan.  

The following operations are available:  
<div class="variables"></div>

| URL | Method | Description |
|---|---|---|
| /rest/v4.3/customers/ | `POST` | Creation of a customer in the system. |
| /rest/v4.3/customers/{customerId} | `PUT` | Updates the customer’s information in the system.<br>`{customerId}`: Identifier of the client to be updated. |
| /rest/v4.3/customers/{customerId} | `GET` | Queries the information related to the customer.<br>`{customerId}`: Identifier of the client from which you want to find the associated information. |
| /rest/v4.3/customers/{customerId} | `DELETE` | Removes a user from the system.<br>`{customerId}`: Identifier of the client to be deleted. |

### Creation

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
   "fullName": "Pedro E. Perez",
   "email": "pperez@payulatam.com"
}
```
<br>

Response body:
```JSON
{
   "id": "6ahxar252",
   "fullName": "Pedro E. Perez",
   "email": "pperez@payulatam.com"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML
<customer>
	<fullName>Pedro E. Perez</fullName>
	<email>pperez@payulatam.com</email>
</customer>
```
<br>

Response body:
```XML
<customer>
	<id>6ahxar252</id>
	<fullName>Pedro E. Pérez</fullName>
	<email>pperez@payulatam.com</email>
</customer>
```
{{< /tab >}}
{{< /tabs >}}

### Update

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
   "fullName": "Pedro E. Perez",
   "email": "pperez@payulatam.com"
}
```
<br>

Response body:
```JSON
{
   "id": "6ahxar252",
   "fullName": "Pedro E. Perez",
   "email": "pperez@payulatam.com"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML
<customer>
	<fullName>Pedro E. Perez</fullName>
	<email>pperez@payulatam.com</email>
</customer>
```
<br>

Response body:
```XML
<customer>
	<id>6ahxar252</id>
	<fullName>Pedro E. Pérez</fullName>
	<email>pperez@payulatam.com</email>
</customer>
```
{{< /tab >}}
{{< /tabs >}}

### Query

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/customers/2mkls9xekm
```
<br>

Response body:
```JSON
{
  "id": "2mkls9xekm",
  "fullName": "Pedro Perez",
  "email": "pperez@payulatam.com",
  "creditCards": [
    {
      "token": "da2224a9-58b7-482a-9866-199de911c23f",
      "customerId": "2mkls9xekm",
      "number": "************4242",
      "name": "Usuario Prueba",
      "type": "VISA",
      "address": {
        "line1": "Street 93B",
        "line2": "17 25",
        "line3": "Office 301",
        "city": "Bogota",
        "country": "CO",
        "postalCode": "00000",
        "phone": "300300300"
      }
    }
  ],
  "subscriptions": [
    {
      "id": "2mlhk3qxji",
      "quantity": "1",
      "installments": "1",
      "currentPeriodStart": "2013-08-30T10:46:41.477-05:00",
      "currentPeriodEnd": "2013-09-29T10:46:41.477-05:00",
      "plan": {
        "id": "414215a2-c990-4525-ba84-072181988d09",
        "planCode": "PLAN-REST-16",
        "description": "Plan rest test",
        "accountId": "1",
        "intervalCount": "1",
        "interval": "MONTH",
        "additionalValues": [
          {
            "name": "PLAN_VALUE",
            "value": "20000",
            "currency": "COP"
          }
        ]
      }
    }
  ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/customers/2mkls9xekm
```
<br>

Response body:
```XML
<customer>
	<id>2mkls9xekm</id>
	<fullName>Pedro Perez</fullName>
	<email>pperez@payulatam.com</email>
	<creditCards>
		<creditCard>
			<token>da2224a9-58b7-482a-9866-199de911c23f</token>
			<customerId>2mkls9xekm</customerId>
			<number>************4242</number>
			<name>Usuario Prueba</name>
			<type>VISA</type>
			<address>
				<line1>Calle 93B</line1>
				<line2>17 25</line2>
				<line3>Oficina 301</line3>
				<city>Bogota</city>
				<country>CO</country>
				<postalCode>00000</postalCode>
				<phone>300300300</phone>
			</address>
		</creditCard>
	</creditCards>
	<subscriptions>
		<subscription>
			<id>2mlhk3qxji</id>
			<quantity>1</quantity>
			<installments>1</installments>
			<currentPeriodStart>2013-08-30T10:46:41.477-05:00</currentPeriodStart>
			<currentPeriodEnd>2013-09-29T10:46:41.477-05:00</currentPeriodEnd>
			<plan>
				<id>414215a2-c990-4525-ba84-072181988d09</id>
				<planCode>PLAN-REST-16</planCode>
				<description>Plan rest test</description>
				<accountId>1</accountId>
				<intervalCount>1</intervalCount>
				<interval>MONTH</interval>
				<additionalValues>
					<additionalValue>
						<name>PLAN_VALUE</name>
						<value>20000</value>
						<currency>COP</currency>
					</additionalValue>
				</additionalValues>
			</plan>
		</subscription>
	</subscriptions>
</customer>
```
{{< /tab >}}
{{< /tabs >}}

### Deletion

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/customers/7wp1r0atl
```
<br>

Response body:
```JSON
{
    "description": "El cliente [7wp1r0atl] ha sido eliminado."
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/customers/7wp1r0atl
```
<br>

Response body:
```XML
<response>
   <description>El cliente [7wp1r0atl] ha sido eliminado</description>
</response>
```
{{< /tab >}}
{{< /tabs >}}

## 3. Credit card

<details>
<summary>Variables used for the creation of a credit card</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|---|
| number | Numeric | Min: 13 Max: 20 | Credit card number. | All countries |
| name | Alphanumeric | Min: 1 Max: 255 | Full name of the credit card holder as shown in the credit card. | All countries |
| document | Alphanumeric | Min: 5 Max: 30 | Identification number of the credit card holder. | All countries |
| expMonth | Numeric | Min: 1 Max: 12 | Credit card’s expiration month. | All countries |
| expYear | Numeric | Min: 00 Max: 2999 | Credit card’s expiration year. If it is a two digit value, it represents the years between 2000 (00) and 2099 (99). It the value has more than two digits it is used literally, being 2000 the minimum value. | All countries |
| type | Alphanumeric |  | The franchise or credit card type. See [Payment method]({{< ref "select-your-payment-method.html" >}}). | All countries |
| address |  |  | Credit card holder's billing address, associated to the credit card. | All countries |
| address.line1 | Alphanumeric | Min: 1 Max: 100 | First line of the address. | All countries |
| address.line2 | Alphanumeric | Min: 1 Max: 100 | Second line of the address or street number. | No |
| address.line3 | Alphanumeric | Min: 1 Max: 100 | Third line of the address. | No |
| address.city | Alphanumeric | Min: 1 Max: 50 | City. | All countries |
| address.state | Alphanumeric | Min: 1 Max: 40 | State or department. <sup>\*</sup>For Brazil send only 2 characters. Example: For Sao Paulo, send SP. | Brazil |
| address.country | Alphanumeric | 2 | Country of the address in format ISO 3166 Alfa 2 code. | All countries |
| address.postalCode | Alphanumeric | Min: 1 Max: 20 | Postal code of the address. <sup>\*</sup>For Brazil use the format XXXXX-XXX or XXXXXXXX, for example: 09210-710 o 09210710. | Mexico, Brazil |
| address.phone | Alphanumeric | Min: 1 Max: 20 | Phone associated to the address. <sup>\*</sup>For Brazil use the format ddd(2)+number(7-9), for example: (11)756312633. | All countries |
</details>
<br>

It is the payment method that relates a customer to a plan. It is composed of the credit card number (that will be tokenized to store data securely), the expiration date of the card and some additional address data.  

The following operations are available:  
<div class="variables"></div>

| URL | Method | Description |
|---|---|---|
| /rest/v4.3/customers/{customerID}/creditCards | `POST` | Creating a credit card (Token) and assigning it to a user.<br>`{customerId}`: Identifier of the client with whom you are going to associate the token with. |
| /rest/v4.3/creditCards/{creditCardId} | `PUT` | Update a token’s information.<br>`{creditCardId}`: Identifier of the token to be updated. |
| /rest/v4.3/creditCards/{creditCardId} | `GET` | Check the information of a credit card (Token) data identifier.<br>`{creditCardId}`: Credit Card Token you want to consult. |
| /rest/v4.3/customers/{customerID}/creditCards/{creditCardId} | `DELETE` | Delete a credit card (Token) associated with a user.<br>`{customerId}`: Identifier of the client of whom you are going to delete the token.<br>`{creditCardId}`: Identifier of the token to be deleted. |

### Creation

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
  "name": "Sample User Name",
  "document": "1020304050",
  "number": "4242424242424242",
  "expMonth": "01",
  "expYear": "2018",
  "type": "VISA",
  "address": {
    "line1": "Address Name",
    "line2": "17 25",
    "line3": "Of 301",
    "postalCode": "00000",
    "city": "City Name",
    "state": "State Name",
    "country": "CO",
    "phone": "300300300"
  }
}
```
<br>

Response body:
```JSON
{
   "token": "8186ca42-2f69-417b-94a0-208bd8e089af"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML
<creditCard>
   <name>Sample User Name</name>
   <document>1020304050</document>
   <number>4242424242424242</number>
   <expMonth>01</expMonth>
   <expYear>2018</expYear>
   <type>VISA</type>
   <address>
      <line1>Address Name</line1>
      <line2>17 25</line2>
      <line3>Of 301</line3>
      <postalCode>00000</postalCode>
      <city>City Name</city>
      <state>State Name</state>
      <country>CO</country>
      <phone>300300300</phone>
   </address>
</creditCard>
```
<br>

Response body:
```XML
<creditCard>
   <token>8186ca42-2f69-417b-94a0-208bd8e089af</token>
</creditCard>
```
{{< /tab >}}
{{< /tabs >}}

### Update

{{< tabs tabTotal="2" tabID="10" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
  "expMonth": "12",
  "expYear": "2016",
  "name": "Sample user name",
  "document": "65858645",
  "address": {
     "line1": "Sample Address",
     "line2": "Cll 93 B",
     "line3": "Ofic. 301",
     "postalCode": "00000",
    "city": "city",
    "country": "CO",
    "state": "state",
    "phone": "2266758"
  }
}
```
<br>

Response body:
```JSON
{
  "token": "a068e980-a6d7-4a19-b549-75c04f39ec22",
  "customerId": "eab38z33hh2",
  "number": "424242******4242",
  "type": "VISA",
  "name": "Sample user name",
  "document": "65858645",
  "address": {
    "line1": "Sample Address",
    "line2": "Cll 93 B",
    "line3": "Ofic. 301",
    "city": "city",
    "state": "state",
    "country": "CO",
    "postalCode": "00000",
    "phone": "2266758"
  }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML
<creditCard>
   <expMonth>12</expMonth>
   <expYear>2016</expYear>
   <name>Sample user name</name>
   <document>65858645</document>
   <address>
      <line1>Sample Address</line1>
      <line2>Cll 93 B</line2>
      <line3>Ofic. 301</line3>
      <postalCode>00000</postalCode>
      <city>city</city>
      <country>CO</country>
      <state>state</state>
      <phone>2266758</phone>
   </address>
</creditCard>
```
<br>

Response body:
```XML
<creditCard>
  <token>a068e980-a6d7-4a19-b549-75c04f39ec22</token>
  <customerId>eab38z33hh2</customerId>
  <number>424242******4242</number>
  <name>Sample user names</name>
  <document>65858645</document>
  <type>VISA</type>
  <address>
    <line1>Sample Addresss</line1>
    <line2>Cll 93 B</line2>
    <line3>Ofic. 301</line3>
    <city>city</city>
    <state>state</state>
    <country>CO</country>
    <postalCode>00000</postalCode>
    <phone>2266758</phone>
  </address>
</creditCard>
```
{{< /tab >}}
{{< /tabs >}}

### Query

{{< tabs tabTotal="2" tabID="11" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/customers/2mkls9xekm
```
<br>

Response body:
```JSON
{
  "token": "256f8e39-e37c-4ff3-9b5f-63937ee5c69c",
  "customerId": "5whjhimjtpn",
  "number": "424242******4242",
  "type": "VISA",
  "name": "Sample User Name",
  "document": "1020304050",
  "address": {
    "line1": "Address Name",
    "line2": "17 25",
    "line3": "Of 301",
    "city": "City Name",
    "state": "State Name",
    "country": "CO",
    "postalCode": "00000",
    "phone": "300300300"
  }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/customers/2mkls9xekm
```
<br>

Response body:
```XML
<creditCard>
	<token>8186ca42-2f69-417b-94a0-208bd8e089af</token>
	<customerId>11sgnt8s19</customerId>
	<number>************4242</number>
	<name>Sample User Name</name>
	<type>VISA</type>
	<address>
		<line1>Address Name</line1>
		<line2>17 25</line2>
		<line3>Of 301</line3>
		<city>City Name</city>
		<state>State Name</state>
		<country>CO</country>
		<postalCode>00000</postalCode>
		<phone>300300300</phone>
	</address>
</creditCard>
```
{{< /tab >}}
{{< /tabs >}}

### Deletion

{{< tabs tabTotal="2" tabID="12" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/customers/{customerID}/creditCards/{creditCardId}
```
<br>

Response body:
```JSON
{ 
  "description": "La tarjeta de crédito f17e9c5c-c414-4dc0-a145-5b0647f7dbf8 se ha eliminado exitosamente"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/customers/{customerID}/creditCards/{creditCardId}
```
<br>

Response body:
```XML
<response>
	<description>La tarjeta de crédito f17e9c5c-c414-4dc0-a145-5b0647f7dbf8 se ha eliminado exitosamente</description>
</response>
```
{{< /tab >}}
{{< /tabs >}}

## 4. Subscription

<details>
<summary>Variables used for the creation of a subscription</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|---|
| quantity | Numeric |  | Total amount of plans that will be acquired with the subscription. | No |
| installments | Numeric |  | Total amount of installments to defer the payment. | No |
| trialDays | Numeric |  | Total amount of trial days of the subscription. This variable has preference over the plan's trial days. | No |
| customer |  |  | Customer that will be associated to the subscription. You can find more information in the "Customer" section of this page. | All countries |
| customer.creditCards |  |  | Customer's credit card that is selected to make the payment. You can find more information in the "Credit card" section of this page. | All countries |
| plan |  |  | Plan that will be associated to the subscription. You can find more information in the "Plan" section of this page. | All countries |

</details>
<br>

A subscription is the relationship between a payment plan, a payer and a credit card. It is the element that controls the execution of the respective collections.  

The following operations are available:  
<div class="variables"></div>

| URL | Methods | Description |
|---|---|---|
| /rest/v4.3/subscriptions/ | `POST` | Creating a new subscription of a client to a plan. |
| /rest/v4.3/subscriptions/{subscriptionId} | `PUT` | Update information associated with the specified subscription. At the moment it is only possible to update the token of the credit card to which the charge of the subscription is made.<br>`{subscriptionId}`: Identification of the subscription. |
| /rest/v4.3/subscriptions/{subscriptionId} | `GET` | Check the basic information associated with the specified subscription.<br>`{subscriptionId}`: Identification of the subscription. |
| /rest/v4.3/subscriptions/{subscriptionId} | `DELETE` | Unsubscribe, delete the relationship of the customer with the plan.<br>`{subscriptionId}`: Identification of the subscription. |


### Creation
 
<details>
<summary>With all new items</summary>
<br>

{{< tabs tabTotal="2" tabID="13" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
  "quantity": "1",
  "installments": "1",
  "trialDays": "15",
  "customer": {
    "fullName": "Pedro Perez",
    "email": "pperez@payulatam.com",
    "creditCards": [
      {
        "name": "Pedro Perez",
        "document": "101010123",
        "number": "4242424242424242",
        "expMonth": "01",
        "expYear": "2018",
        "type": "VISA",
        "address": {
          "line1": "Address Name",
          "line2": "17 25",
          "line3": "Of 301",
          "postalCode": "00000",
          "city": "City Name",
          "state": "State Name",
          "country": "CO",
          "phone": "300300300"
        }
      }
    ]
  },
  "plan": {
    "planCode": "sample-plan-code-001",
    "description": "Sample Plan 001",
    "accountId": "512321",
    "intervalCount": "1",
    "interval": "MONTH",
    "maxPaymentsAllowed": "12",
    "maxPaymentAttempts": "3",
    "paymentAttemptsDelay": "1",
    "maxPendingPayments": "1",
    "trialDays": "30",
    "additionalValues": [
      {
        "name": "PLAN_TAX",
        "value": 1600,
        "currency": "COP"
      },
      {
        "name": "PLAN_VALUE",
        "value": 10000,
        "currency": "COP"
      },
      {
        "name": "PLAN_TAX_RETURN_BASE",
        "value": 8400,
        "currency": "COP"
      }
    ]
  }
}
```
<br>

Response body:
```JSON
{
  "id": "563cbd0o54z",
  "plan": {
    "id": "145ad747-adeb-43db-80c0-447c8f7ad8b4",
    "planCode": "sample-plan-code-001",
    "description": "Sample Plan 001",
    "accountId": "512321",
    "intervalCount": 1,
    "interval": "MONTH",
    "additionalValues": [
      {
        "name": "PLAN_VALUE",
        "value": 10000,
        "currency": "COP"
      },
      {
        "name": "PLAN_TAX",
        "value": 1600,
        "currency": "COP"
      },
      {
        "name": "PLAN_TAX_RETURN_BASE",
        "value": 8400,
        "currency": "COP"
      }
    ]
  },
  "customer": {
    "id": "a39e3zvsru6",
    "fullName": "Pedro Perez",
    "email": "pperez@payulatam.com",
    "creditCards": [
      {
        "token": "7b6d637a-6252-47ee-8d3b-ed91807b3146"
      }
    ]
  },
  "quantity": "1",
  "installments": "1",
  "currentPeriodStart": 1402203600000,
  "currentPeriodEnd": 1404795599000
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML
<subscription>
	<trialDays>30</trialDays>
	<installments>1</installments>
	<customer>
		<fullName>Pedro Perez</fullName>
		<email>pperezz@payulatam.com</email>
		<creditCards>
			<creditCard>
				<number>4242424242424242</number>
				<name>Sample User Name</name>
				<expMonth>1</expMonth>
				<expYear>2018</expYear>
				<type>VISA</type>
				<address>
					<line1>Address Name</line1>
					<line2>17 25</line2>
					<line3>Of 301</line3>
					<city>City Name</city>
					<state>State Name</state>
					<country>CO</country>
					<postalCode>00000</postalCode>
					<phone>300300300</phone>
				</address>
			</creditCard>
		</creditCards>
	</customer>
	<plan>
		<planCode>sample-plan-code-001</planCode>
		<description>Sample Plan 001</description>
		<accountId>512321</accountId>
		<intervalCount>1</intervalCount>
		<interval>MONTH</interval>
		<maxPaymentsAllowed>12</maxPaymentsAllowed>
		<maxPaymentAttempts>3</maxPaymentAttempts>
		<maxPendingPayments>1</maxPendingPayments>
		<paymentAttemptsDelay>1</paymentAttemptsDelay>
		<additionalValues>
			<additionalValue>
				<name>PLAN_VALUE</name>
				<value>10000</value>
				<currency>COP</currency>
			</additionalValue>
			<additionalValue>
				<name>PLAN_TAX</name>
				<value>1600</value>
				<currency>COP</currency>
			</additionalValue>
			<additionalValue>
				<name>PLAN_TAX_RETURN_BASE</name>
				<value>8400</value>
				<currency>COP</currency>
			</additionalValue>
		</additionalValues>
	</plan>
</subscription>
```
<br>

Response body:
```XML
<subscription>
	<id>26fb7yxfej0</id>
	<quantity>1</quantity>
	<installments>1</installments>
	<currentPeriodStart>2014-06-23T00:00:00-05:00</currentPeriodStart>
	<currentPeriodEnd>2014-07-22T23:59:59-05:00</currentPeriodEnd>
	<customer>
		<id>047dbnhsnx9</id>
		<fullName>Pedro Perez</fullName>
		<email>pperezz@payulatam.com</email>
		<creditCards>
			<creditCard>
				<token>daedc017-bd7d-4887-87b4-13913650c952</token>
			</creditCard>
		</creditCards>
	</customer>
	<plan>
		<id>77e57940-e149-4f77-a190-271caa7ccb7b</id>
		<planCode>sample-plan-code-001</planCode>
		<description>Sample Plan 001</description>
		<accountId>512321</accountId>
		<intervalCount>1</intervalCount>
		<interval>MONTH</interval>
		<additionalValues>
			<additionalValue>
				<name>PLAN_TAX</name>
				<value>1600</value>
				<currency>COP</currency>
			</additionalValue>
			<additionalValue>
				<name>PLAN_VALUE</name>
				<value>10000</value>
				<currency>COP</currency>
			</additionalValue>
			<additionalValue>
				<name>PLAN_TAX_RETURN_BASE</name>
				<value>8400</value>
				<currency>COP</currency>
			</additionalValue>
		</additionalValues>
	</plan>
</subscription>
```
{{< /tab >}}
{{< /tabs >}}

</details>
<details>
<summary>With all existing elements</summary>
<br>

{{< tabs tabTotal="2" tabID="14" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
  "quantity": "1",
  "installments": "1",
  "trialDays": "10",
  "customer": {
    "id": "eab38z33hh2",
    "creditCards": [
      {
        "token": "a068e980-a6d7-4a19-b549-75c04f39ec22"
      }
    ]
  },
  "plan": {
    "planCode": "sample-plan-code-001"
  }
}
```
<br>

Response body:
```JSON
{
  "id": "fb6d0m9nqb8",
  "plan": {
    "id": "6b104e86-d6ca-41b5-ae39-834a55ed1565",
    "planCode": "sample-plan-code-001",
    "description": "New Sample Plan 001",
    "accountId": 512321,
    "intervalCount": 1,
    "interval": "MONTH",
    "additionalValues": [
      {
        "name": "PLAN_VALUE",
        "value": 10000,
        "currency": "COP"
      },
      {
        "name": "PLAN_TAX_RETURN_BASE",
        "value": 0,
        "currency": "COP"
      },
      {
        "name": "PLAN_TAX",
        "value": 0,
        "currency": "COP"
      }
    ]
  },
  "customer": {
    "id": "eab38z33hh2",
    "fullName": "Pedro Perez",
    "email": "pperez@payulatam.com",
    "creditCards": [
      {
        "token": "a068e980-a6d7-4a19-b549-75c04f39ec22"
      }
    ]
  },
  "quantity": 1,
  "installments": 1,
  "trialDays": "30",
  "currentPeriodStart": 1397192400000,
  "currentPeriodEnd": 1428728399000
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML
<subscription>
	<quantity>1</quantity>
	<installments>1</installments>
	<trialDays>10</trialDays>
	<customer>
		<id>eab38z33hh2</id>
		<creditCards>
			<creditCard>
				<token>a068e980-a6d7-4a19-b549-75c04f39ec22</token>
			</creditCard>
		</creditCards>
	</customer>
	<plan>
		<planCode>sample-plan-code-001</planCode>
	</plan>
</subscription>
```
<br>

Response body:
```XML
<subscription>
	<id>fb6d0m9nqb8</id>
	<quantity>1</quantity>
	<installments>1</installments>
	<currentPeriodStart>2014-06-03T00:00:00-05:00</currentPeriodStart>
	<currentPeriodEnd>2014-07-02T23:59:59-05:00</currentPeriodEnd>
	<customer>
		<id>eab38z33hh2</id>
		<fullName>Pedro Perez</fullName>
		<email>pperezz@payulatam.com</email>
		<creditCards>
			<creditCard>
				<token>a068e980-a6d7-4a19-b549-75c04f39ec22</token>
			</creditCard>
		</creditCards>
	</customer>
	<plan>
		<id>6b104e86-d6ca-41b5-ae39-834a55ed1565</id>
		<planCode>sample-plan-code-001</planCode>
		<description>New Sample Plan 001</description>
		<accountId>512321</accountId>
		<intervalCount>1</intervalCount>
		<interval>MONTH</interval>
		<additionalValues>
			<additionalValue>
				<name>PLAN_VALUE</name>
				<value>10000</value>
				<currency>COP</currency>
			</additionalValue>
			<additionalValue>
				<name>PLAN_TAX</name>
				<value>0</value>
				<currency>COP</currency>
			</additionalValue>
			<additionalValue>
				<name>PLAN_TAX_RETURN_BASE</name>
				<value>0</value>
				<currency>COP</currency>
			</additionalValue>
		</additionalValues>
	</plan>
</subscription>
```
{{< /tab >}}
{{< /tabs >}}

</details>
<details>
<summary>With plan and client already created, and a new card</summary>
<br>

{{< tabs tabTotal="2" tabID="15" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
  "quantity": "1",
  "installments": "1",
  "trialDays": "10",
  "customer": {
    "id": "eab38z33hh2",
    "creditCards": [
      {
        "name": "Sample User Name",
        "document": "101010123",
        "number": "4242424242424242",
        "expMonth": "01",
        "expYear": "2018",
        "type": "VISA",
        "address": {
          "line1": "Address Name",
          "line2": "17 25",
          "line3": "Of 301",
          "postalCode": "00000",
          "city": "City Name",
          "state": "State Name",
          "country": "CO",
          "phone": "300300300"
        }
      }
    ]
  },
  "plan": {
    "planCode": "sample-plan-code-001"
  }
}
```
<br>

Response body:
```JSON
{
  "id": "c50d94ge25d",
  "plan": {
    "id": "6b104e86-d6ca-41b5-ae39-834a55ed1565",
    "planCode": "sample-plan-code-001",
    "description": "New Sample Plan 001",
    "accountId": "512321",
    "intervalCount": 1,
    "interval": "MONTH",
    "additionalValues": [
      {
        "name": "PLAN_VALUE",
        "value": 10000,
        "currency": "COP"
      },
      {
        "name": "PLAN_TAX",
        "value": 0,
        "currency": "COP"
      },
      {
        "name": "PLAN_TAX_RETURN_BASE",
        "value": 0,
        "currency": "COP"
      }
    ]
  },
  "customer": {
    "id": "eab38z33hh2",
    "fullName": "Pedro Perez",
    "email": "pperezz@payulatam.com",
    "creditCards": [
      {
        "token": "508a715f-2feb-46ba-8945-c948821f080e"
      }
    ]
  },
  "quantity": "1",
  "installments": "1",
  "currentPeriodStart": 1401771600000,
  "currentPeriodEnd": 1404363599000
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML
<subscription>
	<trialDays>10</trialDays>
	<installments>1</installments>
	<customer>
		<id>eab38z33hh2</id>
		<creditCards>
			<creditCard>
				<number>4242424242424242</number>
				<name>Sample User Name</name>
				<expMonth>1</expMonth>
				<expYear>2018</expYear>
				<type>VISA</type>
				<address>
					<line1>Address Name</line1>
					<line2>17 25</line2>
					<line3>Of 301</line3>
					<city>City Name</city>
					<state>State Name</state>
					<country>CO</country>
					<postalCode>00000</postalCode>
					<phone>300300300</phone>
				</address>
			</creditCard>
		</creditCards>
	</customer>
	<plan>
		<planCode>sample-plan-code-001</planCode>
	</plan>
</subscription>
```
<br>

Response body:
```XML
<subscription>
	<id>40adcwryufe</id>
	<quantity>1</quantity>
	<installments>1</installments>
	<currentPeriodStart>2014-06-03T00:00:00-05:00</currentPeriodStart>
	<currentPeriodEnd>2014-07-02T23:59:59-05:00</currentPeriodEnd>
	<customer>
		<id>eab38z33hh2</id>
		<fullName>Pedro Perez</fullName>
		<email>pperezz@payulatam.com</email>
		<creditCards>
			<creditCard>
				<token>508a715f-2feb-46ba-8945-c948821f080e</token>
			</creditCard>
		</creditCards>
	</customer>
	<plan>
		<id>6b104e86-d6ca-41b5-ae39-834a55ed1565</id>
		<planCode>sample-plan-code-001</planCode>
		<description>New Sample Plan 001</description>
		<accountId>512321</accountId>
		<intervalCount>1</intervalCount>
		<interval>MONTH</interval>
		<additionalValues>
			<additionalValue>
				<name>PLAN_VALUE</name>
				<value>10000</value>
				<currency>COP</currency>
			</additionalValue>
			<additionalValue>
				<name>PLAN_TAX</name>
				<value>0</value>
				<currency>COP</currency>
			</additionalValue>
			<additionalValue>
				<name>PLAN_TAX_RETURN_BASE</name>
				<value>0</value>
				<currency>COP</currency>
			</additionalValue>
		</additionalValues>
	</plan>
</subscription>
```
{{< /tab >}}
{{< /tabs >}}

</details>
<details>
<summary>Customer and card already created, and with a new plan</summary>
<br>

{{< tabs tabTotal="2" tabID="16" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
  "installments": "1",
  "trialDays": "30",
  "customer": {
    "id": "eab38z33hh2",
    "creditCards": [
      {
        "token": "a068e980-a6d7-4a19-b549-75c04f39ec22"
      }
    ]
  },
  "plan": {
    "planCode": "sample-plan-code-001",
    "description": "Sample Plan 001",
    "accountId": "512321",
    "intervalCount": "1",
    "interval": "MONTH",
    "maxPaymentsAllowed": "12",
    "maxPaymentAttempts": "3",
    "paymentAttemptsDelay": "1",
    "maxPendingPayments": "1",
    "trialDays": "30",
    "additionalValues": [
      {
        "name": "PLAN_TAX",
        "value": 1600,
        "currency": "COP"
      },
      {
        "name": "PLAN_VALUE",
        "value": 10000,
        "currency": "COP"
      },
      {
        "name": "PLAN_TAX_RETURN_BASE",
        "value": 8400,
        "currency": "COP"
      }
    ]
  }
}
```
<br>

Response body:
```JSON
{
  "id": "320756yk1x0",
  "plan": {
    "id": "68ee02fa-8d1e-4bc3-88fb-b6e66586df3b",
    "planCode": "sample-plan-code-001",
    "description": "Sample Plan 001",
    "accountId": "512321",
    "intervalCount": 1,
    "interval": "MONTH",
    "additionalValues": [
      {
        "name": "PLAN_VALUE",
        "value": 10000,
        "currency": "COP"
      },
      {
        "name": "PLAN_TAX",
        "value": 1600,
        "currency": "COP"
      },
      {
        "name": "PLAN_TAX_RETURN_BASE",
        "value": 8400,
        "currency": "COP"
      }
    ]
  },
  "customer": {
    "id": "eab38z33hh2",
    "fullName": "Pedro Perez",
    "email": "pperezz@payulatam.com",
    "creditCards": [
      {
        "token": "a068e980-a6d7-4a19-b549-75c04f39ec22"
      }
    ]
  },
  "quantity": "1",
  "installments": "1",
  "currentPeriodStart": 1403499600000,
  "currentPeriodEnd": 1406091599000
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML
<subscription>
	<trialDays>30</trialDays>
	<installments>1</installments>
	<customer>
		<id>eab38z33hh2</id>
		<creditCards>
			<creditCard>
				<token>a068e980-a6d7-4a19-b549-75c04f39ec22</token>
			</creditCard>
		</creditCards>
	</customer>
	<plan>
		<planCode>sample-plan-code-001</planCode>
		<description>Sample Plan 001</description>
		<accountId>512321</accountId>
		<intervalCount>1</intervalCount>
		<interval>MONTH</interval>
		<maxPaymentsAllowed>12</maxPaymentsAllowed>
		<maxPaymentAttempts>3</maxPaymentAttempts>
		<maxPendingPayments>1</maxPendingPayments>
		<paymentAttemptsDelay>1</paymentAttemptsDelay>
		<additionalValues>
			<additionalValue>
				<name>PLAN_VALUE</name>
				<value>10000</value>
				<currency>COP</currency>
			</additionalValue>
			<additionalValue>
				<name>PLAN_TAX</name>
				<value>1600</value>
				<currency>COP</currency>
			</additionalValue>
			<additionalValue>
				<name>PLAN_TAX_RETURN_BASE</name>
				<value>8400</value>
				<currency>COP</currency>
			</additionalValue>
		</additionalValues>
	</plan>
</subscription>
```
<br>

Response body:
```XML
<subscription>
	<id>17d11h3b2xs</id>
	<quantity>1</quantity>
	<installments>1</installments>
	<currentPeriodStart>2014-06-23T00:00:00-05:00</currentPeriodStart>
	<currentPeriodEnd>2014-07-22T23:59:59-05:00</currentPeriodEnd>
	<customer>
		<id>eab38z33hh2</id>
		<fullName>Pedro Perez</fullName>
		<email>pperezz@payulatam.com</email>
		<creditCards>
			<creditCard>
				<token>a068e980-a6d7-4a19-b549-75c04f39ec22</token>
			</creditCard>
		</creditCards>
	</customer>
	<plan>
		<id>c653e0ba-e0cb-49d9-9294-1d5617be8f6c</id>
		<planCode>sample-plan-code-001</planCode>
		<description>Sample Plan 001</description>
		<accountId>512321</accountId>
		<intervalCount>1</intervalCount>
		<interval>MONTH</interval>
		<additionalValues>
			<additionalValue>
				<name>PLAN_TAX</name>
				<value>1600</value>
				<currency>COP</currency>
			</additionalValue>
			<additionalValue>
				<name>PLAN_VALUE</name>
				<value>10000</value>
				<currency>COP</currency>
			</additionalValue>
			<additionalValue>
				<name>PLAN_TAX_RETURN_BASE</name>
				<value>8400</value>
				<currency>COP</currency>
			</additionalValue>
		</additionalValues>
	</plan>
</subscription>
```
{{< /tab >}}
{{< /tabs >}}

</details>

### Update (Credit card of a subscription)

{{< tabs tabTotal="2" tabID="17" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
  "creditCardToken": "a068e980-a6d7-4a19-b549-75c04f39ec22"
}
```
<br>

Response body:
```JSON
{
  "id": "320756yk1x0",
  "plan": {
    "id": "68ee02fa-8d1e-4bc3-88fb-b6e66586df3b"
  },
  "customer": {
    "id": "eab38z33hh2"
  },
  "trialDays": "30",
  "quantity": "1",
  "installments": "1",
  "currentPeriodStart": 1403499600000,
  "currentPeriodEnd": 1406091599000,
  "creditCardToken": "a068e980-a6d7-4a19-b549-75c04f39ec22"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML
<subscription>
	<creditCardToken>a068e980-a6d7-4a19-b549-75c04f39ec22</creditCardToken>
</subscription>
```
<br>

Response body:
```XML
<subscription>
	<id>320756yk1x0</id>
	<trialDays>30</trialDays>
	<quantity>1</quantity>
	<installments>1</installments>
	<currentPeriodStart>2014-06-23T00:00:00-05:00</currentPeriodStart>
	<currentPeriodEnd>2014-07-22T23:59:59-05:00</currentPeriodEnd>
	<customer>
		<id>eab38z33hh2</id>
	</customer>
	<plan>
		<id>68ee02fa-8d1e-4bc3-88fb-b6e66586df3b</id>
	</plan>
	<creditCardToken>a068e980-a6d7-4a19-b549-75c04f39ec22</creditCardToken>
</subscription>
```
{{< /tab >}}
{{< /tabs >}}

### Query
{{< tabs tabTotal="2" tabID="18" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/subscriptions/1dhb51hfuu
```
<br>

Response body:
```JSON
{
  "id": "320756yk1x0",
  "plan": {
    "id": "68ee02fa-8d1e-4bc3-88fb-b6e66586df3b"
  },
  "customer": {
    "id": "eab38z33hh2"
  },
  "trialDays": "30",
  "quantity": "1",
  "installments": "1",
  "currentPeriodStart": 1403499600000,
  "currentPeriodEnd": 1406091599000,
  "creditCardToken": "a068e980-a6d7-4a19-b549-75c04f39ec22"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/subscriptions/1dhb51hfuu
```
<br>

Response body:
```XML
<subscription>
	<id>320756yk1x0</id>
	<trialDays>30</trialDays>
	<quantity>1</quantity>
	<installments>1</installments>
	<currentPeriodStart>2014-06-23T00:00:00-05:00</currentPeriodStart>
	<currentPeriodEnd>2014-07-22T23:59:59-05:00</currentPeriodEnd>
	<customer>
		<id>eab38z33hh2</id>
	</customer>
	<plan>
		<id>68ee02fa-8d1e-4bc3-88fb-b6e66586df3b</id>
	</plan>
	<creditCardToken>a068e980-a6d7-4a19-b549-75c04f39ec22</creditCardToken>
</subscription>
```
{{< /tab >}}
{{< /tabs >}}

### Deletion

{{< tabs tabTotal="2" tabID="19" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/subscriptions/3hpyu04ij
```
<br>

Response body:
```JSON
{
  "description": "La suscripción [3hpyu04ij] ha sido cancelada"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/subscriptions/3hpyu04ij
```
<br>

Response body:
```XML
<response>
  <description>La suscripción [3hpyu04ij] ha sido cancelada</description>
</response>
```
{{< /tab >}}
{{< /tabs >}}

## 5. Additional charges
<details>
<summary>Variables used for the creation of an additional charge</summary>
<br>
<div class="variables"></div>

| Field name | Format | Size | Description | Mandatory |
|---|---|---|---|---|
| descripcion | Alphanumeric | Min: 1 Max: 255 | Description of the additional charge associated to the payment. | All countries |
| additionalValues.entry.name | Alphanumeric | Min: 1 Max: 255 | The type of amount associated to the additional charge. The possible values are:<br><ul style="margin-bottom: initial;"><li>`ITEM_VALUE`: total value of the additional charge.</li><li>`ITEM_TAX`: tax value associated to the value of the additional charge.</li><li>`ITEM_TAX_RETURN_BASE`: tax return base value associated to the value of the additional charge.</li></ul> | A node for each type. All countries |
| additionalValues.entry.value | Numeric | 19, 2 | Charge value, tax or tax return base according to the `additionalValue.entry.name`. | All countries |
| additionalValues.entry.currency | Alphanumeric | 3 | The ISO currency code associated to the amount. [See Accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | All countries |

</details>
<br>

A charge may be an additional charge or a discount realized on the value of one of the payments that comprise the recurring payment plan. These only affect the next pending item and run once.  

The following operations are available:   
<div class="variables"></div>

| URL | Methods | Description |
|---|---|---|
| /rest/v4.3/subscriptions/{subscriptionId}/recurringBillItems | `POST` | Adds extra charges to the respective invoice for the current period.<br>`{subscriptionId}`: Identification of the subscription |
| /rest/v4.3/recurringBillItems/{recurringBillItemId} | `PUT` | Updates the information from an additional charge in an invoice<br>`{recurringBillItemId}`: Identifier of the additional charge. |
| /rest/v4.3/recurringBillItems/{recurringBillItemId} | `GET` | Query extra charge information of an invoice from its identifier.<br>`{recurringBillItemId}`: Identifier of the additional charge |
| /rest/v4.3/recurringBillItems/{recurringBillItemId} | `DELETE` | Remove an extra charge from an invoice.<br>`{recurringBillItemId}`: Identifier of the additional charge. |
| /rest/v4.3/recurringBillItems/ | GET | Query extra charges of shop’s invoices that meet the stipulated filters. The available filters are shown below and should be sent as named parameters in the URL:<br>`{subscriptionId}`: Identification of the subscription.<br>`{description}`: Description entered in the extra charge. |

### Creation
{{< tabs tabTotal="2" tabID="20" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
   "description": "Cargo extra de prueba",
   "additionalValues": [
      {
         "name": "ITEM_VALUE",
         "value": "20000",
         "currency": "COP"
      },
      {
         "name": "ITEM_TAX",
         "value": "0",
         "currency": "COP"
      },
      {
         "name": "ITEM_TAX_RETURN_BASE",
         "value": "0",
         "currency": "COP"
      }
   ]
}
```
<br>

Response body:
```JSON
{
   "id": "522023su5xg",
   "description": "Cargo extra de prueba",
   "additionalValues": [
      {
         "name": "ITEM_VALUE",
         "value": 20000,
         "currency": "COP"
      },
      {
         "name": "ITEM_TAX",
         "value": 0,
         "currency": "COP"
      },
      {
         "name": "ITEM_TAX_RETURN_BASE",
         "value": 0,
         "currency": "COP"
      }
   ],
   "subscriptionId": "52b04sx2s6"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML
<recurringBillItem>
   <description>Cargo extra de prueba</description>
   <additionalValues>
      <additionalValue>
         <name>ITEM_VALUE</name>
         <value>20000</value>
         <currency>COP</currency>
      </additionalValue>
      <additionalValue>
         <name>ITEM_TAX</name>
         <value>0</value>
         <currency>COP</currency>
      </additionalValue>
      <additionalValue>
         <name>ITEM_TAX_RETURN_BASE</name>
         <value>0</value>
         <currency>COP</currency>
      </additionalValue>
   </additionalValues>
</recurringBillItem>
```
<br>

Response body:
```XML
<recurringBillItem>
   <id>5e174m7lgns</id>
   <description>Cargo extra de prueba</description>
   <additionalValues>
      <additionalValue>
         <name>ITEM_VALUE</name>
         <value>20000</value>
         <currency>COP</currency>
      </additionalValue>
      <additionalValue>
         <name>ITEM_TAX</name>
         <value>0</value>
         <currency>COP</currency>
      </additionalValue>
      <additionalValue>
         <name>ITEM_TAX_RETURN_BASE</name>
         <value>0</value>
         <currency>COP</currency>
      </additionalValue>
   </additionalValues>
   <subscriptionId>52b04sx2s6</subscriptionId>
</recurringBillItem>  
```
{{< /tab >}}
{{< /tabs >}}

### Update
{{< tabs tabTotal="2" tabID="21" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```JSON
{
   "description": "Cargo extra de prueba",
   "additionalValues": [
      {
         "name": "ITEM_VALUE",
         "value": "20000",
         "currency": "COP"
      },
      {
         "name": "ITEM_TAX",
         "value": "0",
         "currency": "COP"
      },
      {
         "name": "ITEM_TAX_RETURN_BASE",
         "value": "0",
         "currency": "COP"
      }
   ]
}
```
<br>

Response body:
```JSON
{
   "id": "5e174m7lgns",
   "description": "Cargo extra de prueba",
   "additionalValues": [
      {
         "name": "ITEM_VALUE",
         "value": 20000,
         "currency": "COP"
      },
      {
         "name": "ITEM_TAX",
         "value": 0,
         "currency": "COP"
      },
      {
         "name": "ITEM_TAX_RETURN_BASE",
         "value": 0,
         "currency": "COP"
      }
   ],
   "subscriptionId": "52b04sx2s6"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```XML
<recurringBillItem>
   <isTest>false</isTest>
   <id>5e174m7lgns</id>
   <description>Cargo extra de prueba</description>
   <additionalValues>
      <additionalValue>
         <name>ITEM_VALUE</name>
         <value>20000</value>
         <currency>COP</currency>
      </additionalValue>
      <additionalValue>
         <name>ITEM_TAX</name>
         <value>0</value>
         <currency>COP</currency>
      </additionalValue>
      <additionalValue>
         <name>ITEM_TAX_RETURN_BASE</name>
         <value>0</value>
         <currency>COP</currency>
      </additionalValue>
   </additionalValues>
</recurringBillItem>
```
<br>

Response body:
```XML
<recurringBillItem>
   <id>5e174m7lgns</id>
   <description>Cargo extra de prueba</description>
   <additionalValues>
      <additionalValue>
         <name>ITEM_VALUE</name>
         <value>20000</value>
         <currency>COP</currency>
      </additionalValue>
      <additionalValue>
         <name>ITEM_TAX</name>
         <value>0</value>
         <currency>COP</currency>
      </additionalValue>
      <additionalValue>
         <name>ITEM_TAX_RETURN_BASE</name>
         <value>0</value>
         <currency>COP</currency>
      </additionalValue>
   </additionalValues>
   <subscriptionId>52b04sx2s6</subscriptionId>
</recurringBillItem>
```
{{< /tab >}}
{{< /tabs >}}

### Query

<details>
<summary>By id of extra charge</summary>
<br>

{{< tabs tabTotal="2" tabID="22" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/2uww909obl
```
<br>

Response body:
```JSON
{
   "id": "5wm1pxmpiwq",
   "description": "Cargo extra de prueba",
   "additionalValues": [
      {
         "name": "ITEM_TAX_RETURN_BASE",
         "value": 0,
         "currency": "COP"
      },
      {
         "name": "ITEM_TAX",
         "value": 0,
         "currency": "COP"
      },
      {
         "name": "ITEM_VALUE",
         "value": 20000,
         "currency": "COP"
      }
   ],
   "subscriptionId": "5wjxrja8mz9"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/2uww909obl
```
<br>

Response body:
```XML
<recurringBillItem>
   <id>2uww909obl</id>
   <description>Cargo extra de prueba</description>
   <additionalValues>
      <additionalValue>
         <name>ITEM_VALUE</name>
         <value>20000</value>
         <currency>COP</currency>
      </additionalValue>
      <additionalValue>
         <name>ITEM_TAX_VALUE</name>
         <value>0</value>
         <currency>COP</currency>
      </additionalValue>
      <additionalValue>
         <name>ITEM_TAX_RETURN_BASE</name>
         <value>0</value>
         <currency>COP</currency>
      </additionalValue>
   </additionalValues>
</recurringBillItem>
```
{{< /tab >}}
{{< /tabs >}}

</details>
<details>
<summary>By description of the extra charge</summary>
<br>

{{< tabs tabTotal="2" tabID="23" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/?description=Cargo%20b
```
<br>

Response body:
```JSON
{
   "recurringBillItemList": [
      {
         "id": "5vsags0qsdo",
         "description": "Cargo extra de prueba",
         "additionalValues": [
            {
               "name": "ITEM_VALUE",
               "value": 20000,
               "currency": "COP"
            }
         ],
         "subscriptionId": "5vsa272tek7"
      },
      {
         "id": "5wm1pxmpiwq",
         "description": "Cargo extra de prueba",
         "additionalValues": [
            {
               "name": "ITEM_VALUE",
               "value": 20000,
               "currency": "COP"
            },
            {
               "name": "ITEM_TAX",
               "value": 0,
               "currency": "COP"
            },
            {
               "name": "ITEM_TAX_RETURN_BASE",
               "value": 0,
               "currency": "COP"
            }
         ],
         "subscriptionId": "5wjxrja8mz9"
      }
   ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/?description=Cargo%20b
```
<br>

Response body:
```XML
<recurringBillItemResponse>
   <recurringBillItems>
      <recurringBillItem>
         <id>2waez3h9ac</id>
         <description>Cargo básico</description>
         <additionalValues>
            <additionalValue>
               <name>PLAN_VALUE</name>
               <value>15000</value>
               <currency>COP</currency>
            </additionalValue>
         </additionalValues>
      </recurringBillItem>
      <recurringBillItem>
         <id>24e207ivi</id>
         <description>Cargo básico</description>
         <additionalValues>
            <additionalValue>
               <name>PLAN_VALUE</name>
               <value>10000.49</value>
               <currency>COP</currency>
            </additionalValue>
         </additionalValues>
      </recurringBillItem>
      <recurringBillItem>
         <id>26gzctvub</id>
         <description>Cargo básico</description>
         <additionalValues>
            <additionalValue>
               <name>PLAN_VALUE</name>
               <value>10000.49</value>
               <currency>COP</currency>
            </additionalValue>
         </additionalValues>
      </recurringBillItem>
      <recurringBillItem>
         <id>2uxvargit1</id>
         <description>Cargo básico</description>
         <additionalValues>
            <additionalValue>
               <name>PLAN_VALUE</name>
               <value>10000.49</value>
               <currency>COP</currency>
            </additionalValue>
         </additionalValues>
      </recurringBillItem>
      <recurringBillItem>
         <id>2uy01uio7o</id>
         <description>Cargo básico</description>
         <additionalValues>
            <additionalValue>
               <name>PLAN_VALUE</name>
               <value>10000.49</value>
               <currency>COP</currency>
            </additionalValue>
         </additionalValues>
      </recurringBillItem>
      <recurringBillItem>
         <id>2ve0qtsjzz</id>
         <description>Cargo básico</description>
         <additionalValues>
            <additionalValue>
               <name>PLAN_VALUE</name>
               <value>15000</value>
               <currency>COP</currency>
            </additionalValue>
         </additionalValues>
      </recurringBillItem>
      <recurringBillItem>
         <id>2w16yddd98</id>
         <description>Cargo básico</description>
         <additionalValues>
            <additionalValue>
               <name>PLAN_VALUE</name>
               <value>15000</value>
               <currency>COP</currency>
            </additionalValue>
         </additionalValues>
      </recurringBillItem>
   </recurringBillItems>
</recurringBillItemResponse>
```
{{< /tab >}}
{{< /tabs >}}

</details>
<details>
<summary>By subscription</summary>
<br>

{{< tabs tabTotal="2" tabID="24" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/?subscriptionId=26gyv192a
```
<br>

Response body:
```JSON
{
   "recurringBillItemList": [
      {
         "id": "5wjxrkgk7rc",
         "description": "Custo do plano",
         "additionalValues": [
            {
               "name": "PLAN_TAX",
               "value": 1600,
               "currency": "COP"
            },
            {
               "name": "PLAN_VALUE",
               "value": 20000,
               "currency": "COP"
            }
         ],
         "subscriptionId": "5wjxrja8mz9"
      },
      {
         "id": "5wm1pxmpiwq",
         "description": "Cargo extra de prueba",
         "additionalValues": [
            {
               "name": "ITEM_VALUE",
               "value": 20000,
               "currency": "COP"
            },
            {
               "name": "ITEM_TAX",
               "value": 0,
               "currency": "COP"
            },
            {
               "name": "ITEM_TAX_RETURN_BASE",
               "value": 0,
               "currency": "COP"
            }
         ],
         "subscriptionId": "5wjxrja8mz9"
      }
   ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/?subscriptionId=26gyv192a
```
<br>

Response body:
```XML
<recurringBillItemResponse>
   <recurringBillItems>
      <recurringBillItem>
         <id>2waez3h9ac</id>
         <description>Cargo básico</description>
         <additionalValues>
            <additionalValue>
               <name>PLAN_VALUE</name>
               <value>15000</value>
               <currency>COP</currency>
            </additionalValue>
         </additionalValues>
      </recurringBillItem>
      <recurringBillItem>
         <id>2uww909obl</id>
         <description>Cargo extra de prueba</description>
         <additionalValues>
            <additionalValue>
               <name>ITEM_VALUE</name>
               <value>20000</value>
               <currency>COP</currency>
            </additionalValue>
         </additionalValues>
      </recurringBillItem>
   </recurringBillItems>
</recurringBillItemResponse>
```
{{< /tab >}}
{{< /tabs >}}

</details>

### Deletion

{{< tabs tabTotal="2" tabID="25" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/ou8ru86nq
```
<br>

Response body:
```JSON
{
   "description": "recurring bill item ou8ru86nq has been removed successfully"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/ou8ru86nq
```
<br>

Response body:
```XML
<response>
	<description>recurring bill item ou8ru86nq has been removed successfully</description>
</response>

```
{{< /tab >}}
{{< /tabs >}}

## 6. Billing
<details>
<summary>Associated attributes to the bills</summary>
<br>
<div class="variables"></div>

| Field name | Format | Description |
|---|---|---|
| recurringBill.id | Alphanumeric | Bill id in the PayU platform. |
| recurringBill.orderId | Numeric | Id of the order that is associated to the bill in the PayU platform. |
| recurringBill.subscriptionId | Alphanumeric | Id of the subscription that is associated to the bill in the PayU platform. |
| recurringBill.state | Alphanumeric | State of the payment. The possible values are:<br><ul style="margin-bottom: initial;"><li>`NOT_PAID`: Declined payment.</li><li>`PAYMENT_IN_PROGRESS`: Payment in progress of charge.</li><li>`PENDING`: The next payment to charge.</li><li>`RETRYING_PAYMENT`: Retrying payment.</li><li>`PAID`: Approved payment.</li><li>`CANCELLED`: Cancelled subscription.</li><li>`PENDING_REVIEW`: Payment in process of validation.</li></ul> |
| recurringBill.amount | Numeric | Total amount of the payment. |
| recurringBill.currency | Alphanumeric | The ISO currency code associated to the amount. [See Accepted currencies]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). |
| recurringBill.dateCharge | Date | Date of the payment. When the json format is used the value structure is Epoch/Unix, therefore it is necessary to convert it. |

</details>
<br>

A bill is a payment attempt performed over a subscription, or its execution is pending.

Billing only has the following query method available:
<div class="variables"></div>

| URL | Methods | Description |
|---|---|---|
| /rest/v4.3/recurringBill | `GET` | Query the pill paid or pending. You can query by client, subscription, or date range:<br>```/rest/v4.3/recurringBill?customerId={customerId}```<br>```/rest/v4.3/recurringBill?subscriptionId={subscriptionId}```<br>```/rest/v4.3/recurringBill?customerId={customerId}&dateBegin;={dateBegin}&dateFinal;={dateFinal}``` |

### Query

<details>
<summary>By id of the client</summary>
<br>

{{< tabs tabTotal="2" tabID="26" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBill?customerId=6dtc2i97hw5
```
<br>

Response body:
```JSON
{
  "recurringBillList": [
    {
      "id": "cc522b0e-af0b-4ece-978d-f5c5632caa52",
      "orderId": 71516840,
      "subscriptionId": "6dtg51j09cr",
      "state": "PAID",
      "amount": 10000,
      "currency": "COP",
      "dateCharge": 1391490000000
    },
    {
      "id": "56f0f5ca-cf29-437e-8920-7bc35578a39f",
      "subscriptionId": "6dtf4q8v451",
      "state": "CANCELLED",
      "amount": 10000,
      "currency": "COP",
      "dateCharge": 1392786000000
    }
  ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBill?customerId=6dtc2i97hw5
```
<br>

Response body:
```XML
<recurringBillListResponse>
	<recurringBills>
		<recurringBill>
			<id>cc522b0e-af0b-4ece-978d-f5c5632caa52</id>
			<orderId>71516840</orderId>
			<subscriptionId>6dtg51j09cr</subscriptionId>
			<state>PAID</state>
			<amount>10000</amount>
			<currency>COP</currency>
			<dateCharge>2014-02-04T00:00:00-05:00</dateCharge>
		</recurringBill>
		<recurringBill>
			<id>56f0f5ca-cf29-437e-8920-7bc35578a39f</id>
			<subscriptionId>6dtf4q8v451</subscriptionId>
			<state>CANCELLED</state>
			<amount>10000</amount>
			<currency>COP</currency>
			<dateCharge>2014-02-19T00:00:00-05:00</dateCharge>
		</recurringBill>
	</recurringBills>
</recurringBillListResponse>
```
{{< /tab >}}
{{< /tabs >}}

</details>
<details>
<summary>By id of the subscription</summary>
<br>

{{< tabs tabTotal="2" tabID="27" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBill?subscriptionId=6dtg51j09cr
```
<br>

Response body:
```JSON
{
  "recurringBillList": [
    {
      "id": "cc522b0e-af0b-4ece-978d-f5c5632caa52",
      "orderId": 71516840,
      "subscriptionId": "6dtg51j09cr",
      "state": "PAID",
      "amount": 10000,
      "currency": "COP",
      "dateCharge": 1391490000000
    },
    {
      "id": "528a91a5-19bf-4db5-9a4a-4ecd2f07056b",
      "orderId": 71651340,
      "subscriptionId": "6dtg51j09cr",
      "state": "PAID",
      "amount": 10000,
      "currency": "COP",
      "dateCharge": 1391576400000
    }
  ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBill?subscriptionId=6dtg51j09cr
```
<br>

Response body:
```XML
<recurringBillListResponse>
	<recurringBills>
		<recurringBill>
			<id>cc522b0e-af0b-4ece-978d-f5c5632caa52</id>
			<orderId>71516840</orderId>
			<subscriptionId>6dtg51j09cr</subscriptionId>
			<state>PAID</state>
			<amount>10000</amount>
			<currency>COP</currency>
			<dateCharge>2014-02-04T00:00:00-05:00</dateCharge>
		</recurringBill>
		<recurringBill>
			<id>56f0f5ca-cf29-437e-8920-7bc35578a39f</id>
			<orderId>71651340</orderId>
			<subscriptionId>6dtg51j09cr</subscriptionId>
			<state>PAID</state>
			<amount>10000</amount>
			<currency>COP</currency>
			<dateCharge>2014-02-19T00:00:00-05:00</dateCharge>
		</recurringBill>
	</recurringBills>
</recurringBillListResponse>
```
{{< /tab >}}
{{< /tabs >}}

</details>
<details>
<summary>By id of the client and a date range</summary>
<br>

{{< tabs tabTotal="2" tabID="28" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBill?customerId=6dtc2i97hw5&dateBegin;=2014-02-03&dateFinal;=2014-02-04
```
<br>

Response body:
```JSON
{
  "recurringBillList": [
    {
      "id": "cc522b0e-af0b-4ece-978d-f5c5632caa52",
      "orderId": 71516840,
      "subscriptionId": "6dtg51j09cr",
      "state": "PAID",
      "amount": 10000,
      "currency": "COP",
      "dateCharge": 1391490000000
    }
  ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request body:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBill?customerId=6dtc2i97hw5&dateBegin;=2014-02-03&dateFinal;=2014-02-04
```
<br>

Response body:
```XML
<recurringBillListResponse>
	<recurringBills>
		<recurringBill>
			<id>cc522b0e-af0b-4ece-978d-f5c5632caa52</id>
			<orderId>71516840</orderId>
			<subscriptionId>6dtg51j09cr</subscriptionId>
			<state>PAID</state>
			<amount>10000</amount>
			<currency>COP</currency>
			<dateCharge>2014-02-04T00:00:00-05:00</dateCharge>
		</recurringBill>
	</recurringBills>
</recurringBillListResponse>
```
{{< /tab >}}
{{< /tabs >}}

</details>