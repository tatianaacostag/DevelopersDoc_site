---
title: "Pagos recurrentes - SDK"
linkTitle: "Pagos recurrentes - SDK"
date: 2021-09-28T13:40:06-05:00
type: docs
Description: >
   Los pagos recurrentes son cobros automatizados que se realizan periódicamente (diario, mensual, anual), de aquellos cargos por consumo de productos o servicios como membresías, suscripciones, pólizas o recibos con valor fijo; que previamente fueron autorizados por el cliente.
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
      <p style="display:contents;color:white"><b>Funcionalidad descontinuada</b></p>
      <span class="close" style="color:white">&times;</span>
    </header>
    <p style="padding:20px">La funcionalidad de <b><i>Pagos Recurrentes</i></b> ha sido descontinuada y por lo tanto, no se ofrece a los   comercios. El siguiente artículo está disponible a modo de consulta para comercios que aún la tienen activa.<br>Esta funcionalidad <b>NO</b> será activada nuevamente.</p>
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

{{% alert title="Nota" color="warning"%}}
Pagos recurrentes ha sido descontinuado y no se ofrece para comercios.
{{% /alert %}}

## ¿Cómo funciona? 
![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/pagos-recurrentes-1.jpg)

{{% alert title="Tener en cuenta" color="info"%}}
Pagos recurrentes sólo está disponible para cuentas de **Brasil**, **Colombia**, **Perú** y **México**.
{{% /alert %}}

Apuntando a las correspondientes URLs:

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

Los métodos disponibles para los pagos recurrentes son: Plan, Cliente, Tarjeta de crédito, Suscripción y Cargos adicionales. A continuación encontrarás la descripción de cada uno.

## 1. Plan
Using this feature you can register a recurring plan and thus get its identifier.  

Se encuentran disponibles las siguientes operaciones:  
<div class="variables"></div>

| URL | Método | Descripción |
|---|---|---|
| /rest/v4.9/plans | `POST` | Creación de un nuevo plan para suscripciones asociado al comercio. |
| /rest/v4.9/plans/{planCode} | `PUT` | Actualizar la información de un plan para suscripciones.<br>`{planCode}`: Código de identificación del plan para el comercio. |
| /rest/v4.9/plans/{planCode} | `GET` | Consultar toda la información de un plan para suscripciones asociado al comercio.<br>`{planCode}`: Código de identificación del plan para el comercio. |
| /rest/v4.9/plans/{planCode} | `DELETE` | Eliminar todo un plan para suscripciones asociado al comercio.<br>`{planCode}`: Código de identificación del plan para el comercio. |

### Creación

{{< tabs tabTotal="2" tabID="1" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Ingresa aquí la descripción del plan
parameters.put(PayU.PARAMETERS.PLAN_DESCRIPTION, "Basic Plan");
// Ingresa aquí el código de identificación para el plan
parameters.put(PayU.PARAMETERS.PLAN_CODE, "ASd456" + System.currentTimeMillis());
// Ingresa aquí el intervalo del plan
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL, "MONTH");
// Ingresa aquí la cantidad de intervalos
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL_COUNT, "12");
// Ingresa aquí la moneda para el plan
parameters.put(PayU.PARAMETERS.PLAN_CURRENCY, "COP");
// Ingresa aquí el valor del plan
parameters.put(PayU.PARAMETERS.PLAN_VALUE, "50000");
//(OPCIONAL) Ingresa aquí el valor del impuesto
parameters.put(PayU.PARAMETERS.PLAN_TAX, "10000");
//(OPCIONAL) Ingresa aquí la base de devolución sobre el impuesto
parameters.put(PayU.PARAMETERS.PLAN_TAX_RETURN_BASE, "40000");
// Ingresa aquí la cuenta Id del plan
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "2");
// Ingresa aquí el intervalo de reintentos
parameters.put(PayU.PARAMETERS.PLAN_ATTEMPTS_DELAY, "2");
// Ingresa aquí la cantidad de cobros que componen el plan
parameters.put(PayU.PARAMETERS.PLAN_MAX_PAYMENTS, "2");
SubscriptionPlan response = PayUPlans.create(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
Map<String, String> parameters = new HashMap<String, String>();
// Ingresa aquí la descripción del plan
parameters.put(PayU.PARAMETERS.PLAN_DESCRIPTION, "Basic Plan");
// Ingresa aquí el código de identificación para el plan
parameters.put(PayU.PARAMETERS.PLAN_CODE, "ASd456" + System.currentTimeMillis());
// Ingresa aquí el intervalo del plan
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL, "MONTH");
// Ingresa aquí la cantidad de intervalos
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL_COUNT, "12");
// Ingresa aquí la moneda para el plan
parameters.put(PayU.PARAMETERS.PLAN_CURRENCY, "COP");
// Ingresa aquí el valor del plan
parameters.put(PayU.PARAMETERS.PLAN_VALUE, "50000");
//(OPCIONAL) Ingresa aquí el valor del impuesto
parameters.put(PayU.PARAMETERS.PLAN_TAX, "10000");
//(OPCIONAL) Ingresa aquí la base de devolución sobre el impuesto
parameters.put(PayU.PARAMETERS.PLAN_TAX_RETURN_BASE, "40000");
// Ingresa aquí la cuenta Id del plan
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "2");
// Ingresa aquí el intervalo de reintentos
parameters.put(PayU.PARAMETERS.PLAN_ATTEMPTS_DELAY, "2");
// Ingresa aquí la cantidad de cobros que componen el plan
parameters.put(PayU.PARAMETERS.PLAN_MAX_PAYMENTS, "2");
SubscriptionPlan response = PayUPlans.create(parameters);
```
{{< /tab >}}
{{< /tabs >}}

### Actualización

{{< tabs tabTotal="2" tabID="2" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Ingrese aquí la nueva descripción para el plan
parameters.put(PayU.PARAMETERS.PLAN_DESCRIPTION, "New Basic Plan");
// Ingrese aquí el código del plan (Debe ser un código de plan existente)
parameters.put(PayU.PARAMETERS.PLAN_CODE, "ASd4561379351327982");
// Ingrese aquí la moneda del plan (Debe ser el mismo que fue usado cuando el plan fue creado)
parameters.put(PayU.PARAMETERS.PLAN_CURRENCY, "COP");
// Ingrese aquí el nuevo valor del plan
parameters.put(PayU.PARAMETERS.PLAN_VALUE, "100000");
//(OPCIONAL) Ingrese aquí el valor del impuesto
parameters.put(PayU.PARAMETERS.PLAN_TAX, "10000");
//(OPCIONAL) Ingrese aquí base de devolución del impuesto
parameters.put(PayU.PARAMETERS.PLAN_TAX_RETURN_BASE, "40000");
// Ingrese aquí la cantidad de reintentos
parameters.put(PayU.PARAMETERS.PLAN_ATTEMPTS_DELAY, "3");
SubscriptionPlan response;
response = PayUPlans.update(parameters);
```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	// Ingresa aquí la descripción del plan
	PayUParameters::PLAN_DESCRIPTION => "New Sample Plan 001",
	// Ingresa aquí el código de identificación para el plan
	PayUParameters::PLAN_CODE => "sample-plan-code-001",
	// Ingresa aquí la moneda para el plan
	PayUParameters::PLAN_CURRENCY => "COP",
	// Ingresa aquí el valor del plan
	PayUParameters::PLAN_VALUE => "10000",
	//(OPCIONAL) Ingresa aquí el valor del impuesto
	PayUParameters::PLAN_TAX => "0",
	//(OPCIONAL) Ingresa aquí la base de devolución sobre el impuesto
	PayUParameters::PLAN_TAX_RETURN_BASE => "0",
	// Ingresa aquí el intervalo de reintentos
	PayUParameters::PLAN_ATTEMPTS_DELAY => "1",
	// Ingresa aquí la cantidad total de reintentos para cada pago rechazado de la suscripción
	PayUParameters::PLAN_MAX_PAYMENT_ATTEMPTS => "3",
	// Ingresa aquí la cantidad máxima de pagos pendientes que puede tener una suscripción antes de ser cancelada.
	PayUParameters::PLAN_MAX_PENDING_PAYMENTS => "1",
);

$response = PayUSubscriptionPlans::update($parameters);
if($response){
}
```
{{< /tab >}}
{{< /tabs >}}

### Consulta

{{< tabs tabTotal="2" tabID="3" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
//Ingrese aquí el código del plan
parameters.put(PayU.PARAMETERS.PLAN_CODE, "ASd4561379351327982");
SubscriptionPlan response = PayUPlans.find(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	// Ingresa aquí el código de identificación para el plan
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

### Eliminación

{{< tabs tabTotal="2" tabID="4" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Ingrese aquí el código del plan
parameters.put(PayU.PARAMETERS.PLAN_CODE, "ASd4561379351327982");
boolean response = PayUPlans.delete(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	// Ingresa aquí el código de identificación para el plan
	PayUParameters::PLAN_CODE => "sample-plan-code-001",
);

$response = PayUSubscriptionPlans::delete($parameters);
if($response) {
}
```
{{< /tab >}}
{{< /tabs >}}

## 2. Cliente
Un cliente es la unidad que identifica quien será el beneficiario de un producto o servicio prestado y que se encuentra asociado a un plan de pagos recurrentes.

Se encuentran disponibles las siguientes operaciones:  
<div class="variables"></div>

| URL | Método | Descripción |
|---|---|---|
| /rest/v4.9/customers/ | `POST` | Creación de un cliente en el sistema. |
| /rest/v4.9/customers/{customerId} | `PUT` | Actualiza la información de un cliente en el sistema.<br>`{customerId}`: Identificador del cliente que se desea actualizar. |
| /rest/v4.9/customers/{customerId} | `GET` | Consulta la información relacionada con el cliente<br>`{customerId}`: Identificador del cliente del cual se desea conocer la información asociada. |
| /rest/v4.9/customers/{customerId} | `DELETE` | Elimina un usuario del sistema.<br>`{customerId}`: Identificador del cliente que se desea eliminar. |

### Creación

{{< tabs tabTotal="2" tabID="5" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
//Ingresa aquí el Nombre del cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_NAME, "Oscar");
//Ingresa aquí el E-mail del Cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_EMAIL, "oscar.romero@payulatam.com");
//Operación crear el cliente
Customer response = PayUCustomers.create(parameters);
```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	// Ingresa aquí el nombre del cliente
	PayUParameters::CUSTOMER_NAME => "Pedro Perez",
	// Ingresa aquí el correo del cliente
	PayUParameters::CUSTOMER_EMAIL => "pperez@payulatam.com"
);

$response = PayUCustomers::create($parameters);

if($response) {
	$response->id;
}
```
{{< /tab >}}
{{< /tabs >}}

### Actualización

{{< tabs tabTotal="2" tabID="6" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
//Ingresa aquí el ID del Cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "f543exh3zh5o");
//Ingresa aquí el Nombre del Cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_NAME, "Oscar Romero");
//Ingresa aquí el E-mail del Cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_EMAIL, "oscarromero@payulatam.com");
//Operación Actualizar el cliente
Customer response = PayUCustomers.update(parameters);Map<String, String> parameters = new HashMap<String, String>();
//Ingresa aquí el ID del Cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "f543exh3zh5o");
//Ingresa aquí el Nombre del Cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_NAME, "Oscar Romero");
//Ingresa aquí el E-mail del Cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_EMAIL, "oscarromero@payulatam.com");
//Operación Actualizar el cliente
Customer response = PayUCustomers.update(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	// Ingresa aquí el identificador del cliente,
	PayUParameters::CUSTOMER_ID => "24978c6l3e",
	// Ingresa aquí el nombre del cliente
	PayUParameters::CUSTOMER_NAME => "Pedro Perez",
	// Ingresa aquí el correo del cliente
	PayUParameters::CUSTOMER_EMAIL => "pperez@payulatam.com"
);
$response = PayUCustomers::update($parameters);

if($response){

}
```
{{< /tab >}}
{{< /tabs >}}

### Consulta

{{< tabs tabTotal="2" tabID="7" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
//Ingresa aquí el Id del Cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "17ylzjz6bxz");
Customer response = PayUCustomers.find(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	// Ingresa aquí el nombre del cliente
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

### Eliminación

{{< tabs tabTotal="2" tabID="8" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Ingresa aquí el Id del cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "17ylzjz6bxz");
boolean response = PayUCustomers.delete(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	// Ingresa aquí el identificador del cliente,
	PayUParameters::CUSTOMER_ID => "24978c6l3e"
);

$response = PayUCustomers::delete($parameters);

if($response){

}
```
{{< /tab >}}
{{< /tabs >}}

## 3. Tarjeta de crédito
Es el medio de pago con el cual se relaciona un Plan y un Pagador, se encuentra compuesto por el número de tarjeta de crédito (el cual será tokenizado para almacenar los datos de forma segura), la fecha de vencimiento de la tarjeta y algunos datos adicionales de dirección.

Se encuentran disponibles las siguientes operaciones:  
<div class="variables"></div>

| URL | Método | Descripción |
|---|---|---|
| /rest/v4.9/customers/{customerID}/creditCards | `POST` | Creación de una tarjeta de crédito (Token) y asociarla a un usuario.<br>{customerId} : Identificador del cliente al cual se le va a asociar el token |
| /rest/v4.9/creditCards/{creditCardId} | `PUT` | Actualizar la información de un token.<br>`{creditCardId}`: Identificador del token que se desea actualizar. |
| /rest/v4.9/creditCards/{creditCardId} | `GET` | Consultar la información de una tarjeta de crédito (Token) dato su identificador.<br>`{creditCardId}`: Token de la tarjeta de crédito que desea consultarse |
| /rest/v4.9/customers/{customerID}/creditCards/{creditCardId} | `DELETE` | Eliminar una tarjeta de crédito (Token) asociado a un usuario.<br>{customerId} : Identificador del cliente al cual se le va a eliminar el token<br>`{creditCardId}`: Identificador del token que se desea eliminar |

### Creación

{{< tabs tabTotal="2" tabID="9" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Ingresa aquí el identificador del pagador.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "180oklk4o56");
// Ingresa aquí el número de la tarjera.
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4005580000029205");
// Ingresa aquí la fecha de expiración de la tarjeta.
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2015/01");
// Ingresa aquí el tipo de la tarjeta.
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");
// Ingresa aquí el nombre del pagador.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "Nombre");
// Ingresa aquí el documento de identificación asociado a la tarjeta.
parameters.put(PayU.PARAMETERS.CREDIT_CARD_DOCUMENT, "1020304050");
// -- Todos los parámetros que siguen son opcionales. --
// Ingresa aquí la primera parte de la dirección.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Calle falsa");
// Ingresa aquí la segunda parte de la dirección (si aplica).
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "123");
// Ingresa aquí la tercera parte de la dirección (si aplica).
parameters.put(PayU.PARAMETERS.PAYER_STREET_3, "patio trasero");
// Ingresa aquí el departamento.
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Bogotá");
// Ingresa aquí la ciudad.
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Bogotá D.C.");
// Ingresa aquí el país.
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, PaymentCountry.CO.name());
// Ingresa aquí el código postal.
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "00000");
// Ingresa aquí el teléfono.
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "300300300");
PaymentPlanCreditCard response = PayUCreditCard.create(parameters);
LoggerUtil.info("{0}", response);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	// Ingresa aquí el identificador del cliente,
	PayUParameters::CUSTOMER_ID => "6eb24tzp40",
	// Ingresa aquí el nombre del cliente
	PayUParameters::PAYER_NAME => "Pedro Perez",
	// Ingresa aquí el número de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_NUMBER => "4242424242424242",
	// Ingresa aquí la fecha de expiración de la tarjeta de crédito en formato AAAA/MM
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2018/01",
	// Ingresa aquí el nombre de la franquicia de la tarjeta de crédito
	PayUParameters::PAYMENT_METHOD => "VISA",
        // Ingresa aquí el documento de identificación asociado a la tarjeta
	PayUParameters::CREDIT_CARD_DOCUMENT => "1020304050",
	// (OPCIONAL) Ingresa aquí el documento de identificación del pagador
	PayUParameters::PAYER_DNI => "101010123",
	// (OPCIONAL) Ingresa aquí la primera línea de la dirección del pagador
	PayUParameters::PAYER_STREET => "Street 93B",
	// (OPCIONAL) Ingresa aquí la segunda línea de la dirección del pagador
	PayUParameters::PAYER_STREET_2 => "17 25",
	// (OPCIONAL) Ingresa aquí la tercera línea de la dirección del pagador
	PayUParameters::PAYER_STREET_3 => "Office 301",
	// (OPCIONAL) Ingresa aquí la ciudad de la dirección del pagador
	PayUParameters::PAYER_CITY => "Bogotá",
	// (OPCIONAL) Ingresa aquí el estado o departamento de la dirección del pagador
	PayUParameters::PAYER_STATE => "Bogotá D.C.",
	// (OPCIONAL) Ingresa aquí el código del país de la dirección del pagador
	PayUParameters::PAYER_COUNTRY => "CO",
	// (OPCIONAL) Ingresa aquí el código postal de la dirección del pagador
	PayUParameters::PAYER_POSTAL_CODE => "00000",
	// (OPCIONAL) Ingresa aquí el número telefónico del pagador
	PayUParameters::PAYER_PHONE => "300300300"
);

$response = PayUCreditCards::create($parameters);

if($response){
	$response->token;
}
```
{{< /tab >}}
{{< /tabs >}}

### Actualización

{{< tabs tabTotal="2" tabID="10" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Ingresa aquí el identificador del token de la tarjeta.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "180oklk4o56");
// Ingresa aquí la fecha de expiración de la tarjeta.
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2015/01");
// Ingresa aquí el nombre del pagador.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "Nombre");
// Ingresa aquí el documento de identificación asociado a la tarjeta.
parameters.put(PayU.PARAMETERS.CREDIT_CARD_DOCUMENT, "1020304050");
// -- Todos los parámetros que siguen son opcionales. --
// Ingresa aquí la primera parte de la dirección.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Calle 5476");
// Ingresa aquí la segunda parte de la dirección (si aplica).
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "123");
// Ingresa aquí la tercera parte de la dirección (si aplica).
parameters.put(PayU.PARAMETERS.PAYER_STREET_3, "patio trasero");
// Ingresa aquí el departamento.
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Bogotá");
// Ingresa aquí la ciudad.
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Bogotá D.C.");
// Ingresa aquí el país.
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, PaymentCountry.CO.name());
// Ingresa aquí el código postal.
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "00000");
// Ingresa aquí el teléfono.
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "300300300");
PaymentPlanCreditCard response = PayUCreditCard.update(parameters);
LoggerUtil.info("{0}", response);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	// Ingresa aquí el identificador del token de la tarjeta.
	PayUParameters::TOKEN_ID => "6f5f32d9-9c6f-4d57-97d7-68cde86f9266",
	// Ingresa aquí el nombre del cliente
	PayUParameters::PAYER_NAME => "Pedro Perez",
	// Ingresa aquí la fecha de expiración de la tarjeta de crédito en formato AAAA/MM
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2018/01",
        // Ingresa aquí el documento de identificación asociado a la tarjeta
	PayUParameters::CREDIT_CARD_DOCUMENT => "1020304050",
	// (OPCIONAL) Ingresa aquí el documento de identificación del pagador
	PayUParameters::PAYER_DNI => "101010123",
	// (OPCIONAL) Ingresa aquí la primera línea de la dirección del pagador
	PayUParameters::PAYER_STREET => "Street 93B",
	// (OPCIONAL) Ingresa aquí la segunda línea de la dirección del pagador
	PayUParameters::PAYER_STREET_2 => "17 25",
	// (OPCIONAL) Ingresa aquí la tercera línea de la dirección del pagador
	PayUParameters::PAYER_STREET_3 => "Office 301",
	// (OPCIONAL) Ingresa aquí la ciudad de la dirección del pagador
	PayUParameters::PAYER_CITY => "Bogotá",
	// (OPCIONAL) Ingresa aquí el estado o departamento de la dirección del pagador
	PayUParameters::PAYER_STATE => "Bogotá D.C.",
	// (OPCIONAL) Ingresa aquí el código del país de la dirección del pagador
	PayUParameters::PAYER_COUNTRY => "CO",
	// (OPCIONAL) Ingresa aquí el código postal de la dirección del pagador
	PayUParameters::PAYER_POSTAL_CODE => "00000",
	// (OPCIONAL) Ingresa aquí el número telefónico del pagador
	PayUParameters::PAYER_PHONE => "300300300"
);

$response= PayUCreditCards::update($parameters);

if($response){

}
```
{{< /tab >}}
{{< /tabs >}}

### Consulta

{{< tabs tabTotal="2" tabID="11" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Ingresa aquí el identificador del token de la tarjeta.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "25181bb1-b07f-4b9b-ae5d-6b13436c706d");
PaymentPlanCreditCard response = PayUCreditCard.find(parameters);
LoggerUtil.info("{0}", response);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	// Ingresa aquí el identificador del token de la tarjeta.
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

### Eliminación

{{< tabs tabTotal="2" tabID="12" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Ingresa aquí el identificador del token de la tarjeta.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "25181bb1-b07f-4b9b-ae5d-6b13436c706d");
// Ingresa aquí el Id del cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "17ylzjz6bxz");
boolean response = PayUCreditCard.delete(parameters);
LoggerUtil.info("{0}", response);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	// Ingresa aquí el identificador del token de la tarjeta.
	PayUParameters::TOKEN_ID => "6f5f32d9-9c6f-4d57-97d7-68cde86f9266",
	// Ingresa aquí el identificador del cliente,
	PayUParameters::CUSTOMER_ID => "6eb24tzp40"
);

$response = PayUCreditCards::delete($parameters);

if($response){

}
```
{{< /tab >}}
{{< /tabs >}}

## 4. Suscripción
Una suscripción es la relación entre un plan de pagos, un pagador y una tarjeta de crédito y es el elemento con el que se controla la ejecución de los cobros correspondientes.  

Se encuentran disponibles las siguientes operaciones:  
<div class="variables"></div>

| URL | Métodos | Descripción |
|---|---|---|
| /rest/v4.9/subscriptions/ | POST | Creación de una nueva suscripción de un cliente a un plan. |
| /rest/v4.9/subscriptions/{subscriptionId} | PUT | Actualizar la información asociada a la suscripción indicada. En este momento sólo es posible actualizar el token de la tarjeta de crédito a la cual se realiza el cargo de la suscripción.<br>`{subscriptionId}`: Identificación de la suscripción |
| /rest/v4.9/subscriptions/{subscriptionId} | GET | Consultar la información básica asociada a la suscripción indicada.<br>`{subscriptionId}`: Identificación de la suscripción |
| /rest/v4.9/subscriptions/{subscriptionId} | DELETE | Eliminar la suscripción, es decir la relación del cliente al plan.<br>`{subscriptionId}`: Identificación de la suscripción |


### Creación
 
<details>
<summary>Con todos los elementos nuevos</summary>
<br>

{{< tabs tabTotal="2" tabID="13" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Ingresa aquí el número de cuotas a pagar.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Ingresa aquí la cantidad de días de prueba
parameters.put(PayU.PARAMETERS.TRIAL_DAYS, "10");

// -- Parámetros del cliente --
// Ingresa aquí el nombre del cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_NAME, "Pedro Perez");
// Ingresa aquí el email del cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_EMAIL, "pperezz@payulatam.com");

// -- Parámetros de la tarjeta de crédito --
// Ingresa aquí el nombre del pagador.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "Sample User Name");
// Ingresa aquí el número de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4242424242424242");
// Ingresa aquí la fecha de expiración de la tarjeta de crédito en formato AAAA/MM
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2018/01");
// Ingresa aquí el nombre de la franquicia de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");
// Ingresa aquí el documento de identificación asociado a la tarjeta.
parameters.put(PayU.PARAMETERS.CREDIT_CARD_DOCUMENT, "1020304050");
// (OPCIONAL) Ingresa aquí el documento de identificación del pagador
parameters.put(PayU.PARAMETERS.PAYER_DNI, "1020304050");
// (OPCIONAL) Ingresa aquí la primera línea de la dirección del pagador
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Address Name");
// (OPCIONAL) Ingresa aquí la segunda línea de la dirección del pagador
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "17 25");
// (OPCIONAL) Ingresa aquí la tercera línea de la dirección del pagador
parameters.put(PayU.PARAMETERS.PAYER_STREET_3, "Of 301");
// (OPCIONAL) Ingresa aquí la ciudad de la dirección del pagador
parameters.put(PayU.PARAMETERS.PAYER_CITY, "City Name");
// (OPCIONAL) Ingresa aquí el estado o departamento de la dirección del pagador
parameters.put(PayU.PARAMETERS.PAYER_STATE, "State Name");
// (OPCIONAL) Ingresa aquí el código del país de la dirección del pagador
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CO");
// (OPCIONAL) Ingresa aquí el código postal de la dirección del pagador
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "00000");
// (OPCIONAL) Ingresa aquí el número telefónico del pagador
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "300300300");

// -- Parámetros del plan --
// Ingresa aquí la descripción del plan
parameters.put(PayU.PARAMETERS.PLAN_DESCRIPTION, "Sample Plan 001");
// Ingresa aquí el código de identificación para el plan
parameters.put(PayU.PARAMETERS.PLAN_CODE, "sample-plan-code-001");
// Ingresa aquí el intervalo del plan
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL, "MONTH");
// Ingresa aquí la cantidad de intervalos
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL_COUNT, "1");
// Ingresa aquí la moneda para el plan
parameters.put(PayU.PARAMETERS.PLAN_CURRENCY, "COP");
// Ingresa aquí el valor del plan
parameters.put(PayU.PARAMETERS.PLAN_VALUE, "10000");
//(OPCIONAL) Ingresa aquí el valor del impuesto
parameters.put(PayU.PARAMETERS.PLAN_TAX, "1600");
//(OPCIONAL) Ingresa aquí la base de devolución sobre el impuesto
parameters.put(PayU.PARAMETERS.PLAN_TAX_RETURN_BASE, "8400");
// Ingresa aquí la cuenta Id del plan
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512321");
// Ingresa aquí el intervalo de reintentos
parameters.put(PayU.PARAMETERS.PLAN_ATTEMPTS_DELAY, "1");
// Ingresa aquí la cantidad de cobros que componen el plan
parameters.put(PayU.PARAMETERS.PLAN_MAX_PAYMENTS, "12");
// Ingresa aquí la cantidad total de reintentos para cada pago rechazado de la suscripción
parameters.put(PayU.PARAMETERS.PLAN_MAX_PAYMENT_ATTEMPTS, "3");
// Ingresa aquí la cantidad máxima de pagos pendientes que puede tener una suscripción antes de ser cancelada.
parameters.put(PayU.PARAMETERS.PLAN_MAX_PENDING_PAYMENTS, "1");
// Ingresa aquí la cantidad de días de prueba de la suscripción.
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

Ejemplo petición:
```PHP
$parameters = array(
	// Ingresa aquí el número de cuotas a pagar.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Ingresa aquí la cantidad de días de prueba
	PayUParameters::TRIAL_DAYS => "10",

	// -- Parámetros del cliente --
	// Ingresa aquí el nombre del cliente
	PayUParameters::CUSTOMER_NAME => "Pedro Perez",
	// Ingresa aquí el email del cliente
	PayUParameters::CUSTOMER_EMAIL => "pperezz@payulatam.com",

	// -- Parámetros de la tarjeta de crédito --
	// Ingresa aquí el nombre del pagador.
	PayUParameters::PAYER_NAME => "Sample User Name",
	// Ingresa aquí el número de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_NUMBER => "4242424242424242",
	// Ingresa aquí la fecha de expiración de la tarjeta de crédito en formato AAAA/MM
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2014/12",
	// Ingresa aquí el nombre de la franquicia de la tarjeta de crédito
	PayUParameters::PAYMENT_METHOD => "VISA",
        // Ingresa aquí el documento de identificación asociado a la tarjeta
        PayUParameters::CREDIT_CARD_DOCUMENT => "1020304050",
	// (OPCIONAL) Ingresa aquí el documento de identificación del pagador
	PayUParameters::PAYER_DNI => "1020304050",
	// (OPCIONAL) Ingresa aquí la primera línea de la dirección del pagador
	PayUParameters::PAYER_STREET => "Address Name",
	// (OPCIONAL) Ingresa aquí la segunda línea de la dirección del pagador
	PayUParameters::PAYER_STREET_2 => "17 25",
	// (OPCIONAL) Ingresa aquí la tercera línea de la dirección del pagador
	PayUParameters::PAYER_STREET_3 => "Of 301",
	// (OPCIONAL) Ingresa aquí la ciudad de la dirección del pagador
	PayUParameters::PAYER_CITY => "City Name",
	// (OPCIONAL) Ingresa aquí el estado o departamento de la dirección del pagador
	PayUParameters::PAYER_STATE => "State Name",
	// (OPCIONAL) Ingresa aquí el código del país de la dirección del pagador
	PayUParameters::PAYER_COUNTRY => "CO",
	// (OPCIONAL) Ingresa aquí el código postal de la dirección del pagador
	PayUParameters::PAYER_POSTAL_CODE => "00000",
	// (OPCIONAL) Ingresa aquí el número telefónico del pagador
	PayUParameters::PAYER_PHONE => "300300300",

	// -- Parámetros del plan --
	// Ingresa aquí la descripción del plan
	PayUParameters::PLAN_DESCRIPTION => "Sample Plan 001",
	// Ingresa aquí el código de identificación para el plan
	PayUParameters::PLAN_CODE => "sample-plan-code-001",
	// Ingresa aquí el intervalo del plan
	PayUParameters::PLAN_INTERVAL => "MONTH",
	// Ingresa aquí la cantidad de intervalos
	PayUParameters::PLAN_INTERVAL_COUNT => "1",
	// Ingresa aquí la moneda para el plan
	PayUParameters::PLAN_CURRENCY => "COP",
	// Ingresa aquí el valor del plan
	PayUParameters::PLAN_VALUE => "10000",
	//(OPCIONAL) Ingresa aquí el valor del impuesto
	PayUParameters::PLAN_TAX => "1600",
	//(OPCIONAL) Ingresa aquí la base de devolución sobre el impuesto
	PayUParameters::PLAN_TAX_RETURN_BASE => "8400",
	// Ingresa aquí la cuenta Id del plan
	PayUParameters::ACCOUNT_ID => "512321",
	// Ingresa aquí el intervalo de reintentos
	PayUParameters::PLAN_ATTEMPTS_DELAY => "1",
	// Ingresa aquí la cantidad de cobros que componen el plan
	PayUParameters::PLAN_MAX_PAYMENTS => "12",
	// Ingresa aquí la cantidad total de reintentos para cada pago rechazado de la suscripción
	PayUParameters::PLAN_MAX_PAYMENT_ATTEMPTS => "3",
	// Ingresa aquí la cantidad máxima de pagos pendientes que puede tener una suscripción antes de ser cancelada.
	PayUParameters::PLAN_MAX_PENDING_PAYMENTS => "1",
	// Ingresa aquí la cantidad de días de prueba de la suscripción.
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
<summary>Con todos los elementos existentes</summary>
<br>

{{< tabs tabTotal="2" tabID="14" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Ingresa aquí el código del plan a suscribirse.
parameters.put(PayU.PARAMETERS.PLAN_CODE, "sample-plan-code-001");
// Ingresa aquí el identificador del pagador.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "eab38z33hh2");
// Ingresa aquí el identificador del token de la tarjeta.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "a068e980-a6d7-4a19-b549-75c04f39ec22");
// Ingresa aquí la cantidad de días de prueba de la suscripción.
parameters.put(PayU.PARAMETERS.TRIAL_DAYS, "10");
// Ingresa aquí el número de cuotas a pagar.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
Subscription response = PayUSubscription.create(parameters);

if(response!=null){
	response.getId();

}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	// Ingresa aquí el código del plan a suscribirse.
	PayUParameters::PLAN_CODE => "sample-plan-code-001s",
	// Ingresa aquí el identificador del pagador.
	PayUParameters::CUSTOMER_ID => "f03612gyte",
	// Ingresa aquí el identificador del token de la tarjeta.
	PayUParameters::TOKEN_ID => "79490437-d64a-4dc6-baeb-8d52492b0a00",
	// Ingresa aquí la cantidad de días de prueba de la suscripción.
	PayUParameters::TRIAL_DAYS => "10",
	// Ingresa aquí el número de cuotas a pagar.
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
<summary>Plan y cliente ya creados, y una tarjeta nueva</summary>
<br>

{{< tabs tabTotal="2" tabID="15" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Ingresa aquí la cantidad de días de prueba de la suscripción.
parameters.put(PayU.PARAMETERS.TRIAL_DAYS, "10");
// Ingresa aquí el número de cuotas a pagar.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");

// Ingresa aquí el código del plan a suscribirse.
parameters.put(PayU.PARAMETERS.PLAN_CODE, "sample-plan-code-001");
// Ingresa aquí el identificador del pagador.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "eab38z33hh2");

// -- Parámetros de la tarjeta de crédito --
// Ingresa aquí el nombre del pagador.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "Sample User Name");
// Ingresa aquí el número de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4242424242424242");
// Ingresa aquí la fecha de expiración de la tarjeta de crédito en formato AAAA/MM
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2018/01");
// Ingresa aquí el nombre de la franquicia de la tarjeta de crédito
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");
// Ingresa aquí el documento de identificación asociado a la tarjeta.
parameters.put(PayU.PARAMETERS.CREDIT_CARD_DOCUMENT, "1020304050");
// (OPCIONAL) Ingresa aquí el documento de identificación del pagador
parameters.put(PayU.PARAMETERS.PAYER_DNI, "1020304050");
// (OPCIONAL) Ingresa aquí la primera línea de la dirección del pagador
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Address Name");
// (OPCIONAL) Ingresa aquí la segunda línea de la dirección del pagador
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "17 25");
// (OPCIONAL) Ingresa aquí la tercera línea de la dirección del pagador
parameters.put(PayU.PARAMETERS.PAYER_STREET_3, "Of 301");
// (OPCIONAL) Ingresa aquí la ciudad de la dirección del pagador
parameters.put(PayU.PARAMETERS.PAYER_CITY, "City Name");
// (OPCIONAL) Ingresa aquí el estado o departamento de la dirección del pagador
parameters.put(PayU.PARAMETERS.PAYER_STATE, "State Name");
// (OPCIONAL) Ingresa aquí el código del país de la dirección del pagador
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CO");
// (OPCIONAL) Ingresa aquí el código postal de la dirección del pagador
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "00000");
// (OPCIONAL) Ingresa aquí el número telefónico del pagador
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

Ejemplo petición:
```PHP
$parameters = array(
	// Ingresa aquí el número de cuotas a pagar.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Ingresa aquí la cantidad de días de prueba
	PayUParameters::TRIAL_DAYS => "10",

	// -- Parámetros del cliente --
	// Ingresa aquí el identificador del pagador.
	PayUParameters::CUSTOMER_ID => "f03612gyte",

	// -- Parámetros de la tarjeta de crédito --
	// Ingresa aquí el nombre del pagador.
	PayUParameters::PAYER_NAME => "Sample User Name",
	// Ingresa aquí el número de la tarjeta de crédito
	PayUParameters::CREDIT_CARD_NUMBER => "4242424242424242",
	// Ingresa aquí la fecha de expiración de la tarjeta de crédito en formato AAAA/MM
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2014/12",
	// Ingresa aquí el nombre de la franquicia de la tarjeta de crédito
	PayUParameters::PAYMENT_METHOD => "VISA",
        // Ingresa aquí el documento de identificación asociado a la tarjeta
        PayUParameters::CREDIT_CARD_DOCUMENT => "1020304050",
	// (OPCIONAL) Ingresa aquí el documento de identificación del pagador
	PayUParameters::PAYER_DNI => "1020304050",
	// (OPCIONAL) Ingresa aquí la primera línea de la dirección del pagador
	PayUParameters::PAYER_STREET => "Address Name",
	// (OPCIONAL) Ingresa aquí la segunda línea de la dirección del pagador
	PayUParameters::PAYER_STREET_2 => "17 25",
	// (OPCIONAL) Ingresa aquí la tercera línea de la dirección del pagador
	PayUParameters::PAYER_STREET_3 => "Of 301",
	// (OPCIONAL) Ingresa aquí la ciudad de la dirección del pagador
	PayUParameters::PAYER_CITY => "City Name",
	// (OPCIONAL) Ingresa aquí el estado o departamento de la dirección del pagador
	PayUParameters::PAYER_STATE => "State Name",
	// (OPCIONAL) Ingresa aquí el código del país de la dirección del pagador
	PayUParameters::PAYER_COUNTRY => "CO",
	// (OPCIONAL) Ingresa aquí el código postal de la dirección del pagador
	PayUParameters::PAYER_POSTAL_CODE => "00000",
	// (OPCIONAL) Ingresa aquí el número telefónico del pagador
	PayUParameters::PAYER_PHONE => "300300300",

	// -- Parámetros del plan --
	// Ingresa aquí el código del plan a suscribirse.
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
<summary>Cliente y tarjeta ya creados, y con plan nuevo</summary>
<br>

{{< tabs tabTotal="2" tabID="16" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Ingresa aquí el número de cuotas a pagar.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Ingresa aquí la cantidad de días de prueba
parameters.put(PayU.PARAMETERS.TRIAL_DAYS, "10");

// Ingresa aquí el identificador del pagador.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "eab38z33hh2");
// Ingresa aquí el identificador del token de la tarjeta.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "a068e980-a6d7-4a19-b549-75c04f39ec22");

// -- Parámetros del plan --
// Ingresa aquí la descripción del plan
parameters.put(PayU.PARAMETERS.PLAN_DESCRIPTION, "Sample Plan 001");
// Ingresa aquí el código de identificación para el plan
parameters.put(PayU.PARAMETERS.PLAN_CODE, "sample-plan-code-001");
// Ingresa aquí el intervalo del plan
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL, "MONTH");
// Ingresa aquí la cantidad de intervalos
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL_COUNT, "1");
// Ingresa aquí la moneda para el plan
parameters.put(PayU.PARAMETERS.PLAN_CURRENCY, "COP");
// Ingresa aquí el valor del plan
parameters.put(PayU.PARAMETERS.PLAN_VALUE, "10000");
//(OPCIONAL) Ingresa aquí el valor del impuesto
parameters.put(PayU.PARAMETERS.PLAN_TAX, "1600");
//(OPCIONAL) Ingresa aquí la base de devolución sobre el impuesto
parameters.put(PayU.PARAMETERS.PLAN_TAX_RETURN_BASE, "8400");
// Ingresa aquí la cuenta Id del plan
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512321");
// Ingresa aquí el intervalo de reintentos
parameters.put(PayU.PARAMETERS.PLAN_ATTEMPTS_DELAY, "1");
// Ingresa aquí la cantidad de cobros que componen el plan
parameters.put(PayU.PARAMETERS.PLAN_MAX_PAYMENTS, "12");
// Ingresa aquí la cantidad total de reintentos para cada pago rechazado de la suscripción
parameters.put(PayU.PARAMETERS.PLAN_MAX_PAYMENT_ATTEMPTS, "3");
// Ingresa aquí la cantidad máxima de pagos pendientes que puede tener una suscripción antes de ser cancelada.
parameters.put(PayU.PARAMETERS.PLAN_MAX_PENDING_PAYMENTS, "1");
// Ingresa aquí la cantidad de días de prueba de la suscripción.
parameters.put(PayU.PARAMETERS.TRIAL_DAYS, "30");

Subscription response = PayUSubscription.create(parameters);

if(response!=null){
	response.getId();
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	// Ingresa aquí el número de cuotas a pagar.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Ingresa aquí la cantidad de días de prueba
	PayUParameters::TRIAL_DAYS => "10",

	// -- Parámetros de la tarjeta de crédito --
	// Ingresa aquí el identificador del pagador.
	PayUParameters::CUSTOMER_ID => "5131879lzbx",
	// Ingresa aquí el identificador del token de la tarjeta.
	PayUParameters::TOKEN_ID => "158e5bed-1e76-4bb2-83c2-97dc9bb1522d",

	// -- Parámetros del plan --
	// Ingresa aquí la descripción del plan
	PayUParameters::PLAN_DESCRIPTION => "Sample Plan 001",
	// Ingresa aquí el código de identificación para el plan
	PayUParameters::PLAN_CODE => "sample-plan-code-001",
	// Ingresa aquí el intervalo del plan
	PayUParameters::PLAN_INTERVAL => "MONTH",
	// Ingresa aquí la cantidad de intervalos
	PayUParameters::PLAN_INTERVAL_COUNT => "1",
	// Ingresa aquí la moneda para el plan
	PayUParameters::PLAN_CURRENCY => "COP",
	// Ingresa aquí el valor del plan
	PayUParameters::PLAN_VALUE => "10000",
	//(OPCIONAL) Ingresa aquí el valor del impuesto
	PayUParameters::PLAN_TAX => "1600",
	//(OPCIONAL) Ingresa aquí la base de devolución sobre el impuesto
	PayUParameters::PLAN_TAX_RETURN_BASE => "8400",
	// Ingresa aquí la cuenta Id del plan
	PayUParameters::ACCOUNT_ID => "512321",
	// Ingresa aquí el intervalo de reintentos
	PayUParameters::PLAN_ATTEMPTS_DELAY => "1",
	// Ingresa aquí la cantidad de cobros que componen el plan
	PayUParameters::PLAN_MAX_PAYMENTS => "12",
	// Ingresa aquí la cantidad total de reintentos para cada pago rechazado de la suscripción
	PayUParameters::PLAN_MAX_PAYMENT_ATTEMPTS => "3",
	// Ingresa aquí la cantidad máxima de pagos pendientes que puede tener una suscripción antes de ser cancelada.
	PayUParameters::PLAN_MAX_PENDING_PAYMENTS => "1",
	// Ingresa aquí la cantidad de días de prueba de la suscripción.
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

### Actualización (Tarjeta de crédito de una suscripción)

{{< tabs tabTotal="1" tabID="17" tabName1="SDK Java">}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Ingresa aquí el ID de la suscripción.
parameters.put(PayU.PARAMETERS.SUBSCRIPTION_ID, "320756yk1x0");
// Ingresa aquí el identificador del token de la tarjeta.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "a068e980-a6d7-4a19-b549-75c04f39ec22");

Subscription response = PayUSubscription.update(parameters);

if(response!=null){

}
```
{{< /tab >}}
{{< /tabs >}}

### Consulta
{{< tabs tabTotal="1" tabID="18" tabName1="SDK Java" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Ingresa aquí el ID de la suscripción.
parameters.put(PayU.PARAMETERS.SUBSCRIPTION_ID, "320756yk1x0");

Subscription response = PayUSubscription.find(parameters);

if(response!=null){
	response.getCreditCardToken();
	response.getCustomer();
}
```

{{< /tab >}}
{{< /tabs >}}

### Eliminación

{{< tabs tabTotal="2" tabID="19" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo petición:
```PHP
$parameters = array(
	// Ingresa aquí el ID de la suscripción.
	PayUParameters::SUBSCRIPTION_ID => "03e481u9l13",
);

$response = PayUSubscriptions::cancel($parameters);

if($response){
}
```
{{< /tab >}}
{{< /tabs >}}

## 5. Cargos adicionales
Un cargo puede ser un cobro adicional o un descuento realizado sobre el valor de uno de los pagos que conforman el plan de pagos recurrentes. Estos solo afectan el siguiente cobro pendiente y se ejecutan una única vez.  

Se encuentran disponibles las siguientes operaciones:   
<div class="variables"></div>

| URL | Métodos | Descripción |
|---|---|---|
| /rest/v4.9/subscriptions/{subscriptionId}/recurringBillItems | `POST` | Adiciona cargos extras a la factura correspondiente al periodo actual.<br>`{subscriptionId}`: Identificación de la suscripción |
| /rest/v4.9/recurringBillItems/{recurringBillItemId} | `PUT` | Actualiza la información del cargo extra de una factura<br>`{recurringBillItemId}`: Identificador del cargo extra |
| /rest/v4.9/recurringBillItems/{recurringBillItemId} | `GET` | Consulta la información del cargo extra de una factura a partir de su identificador.<br>`{recurringBillItemId}`: Identificador del cargo extra |
| /rest/v4.9/recurringBillItems/{recurringBillItemId} | `DELETE` | Eliminar un cargo extra de una factura<br>`{recurringBillItemId}`: Identificador del cargo extra |
| /rest/v4.9/recurringBillItems/ | `GET` | Consulta de los cargos extras de las facturas del comercio que cumplen con los filtros estipulados. Los filtros disponibles se muestra a continuación y deben ser enviados como named parameters dentro de la URL:<br>`{subscriptionId}`: Identificación de la suscripción<br>`{description}`: Descripción ingresada en el cargo extra |

### Creación
{{< tabs tabTotal="2" tabID="20" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
//Descripción del item
parameters.put(PayU.PARAMETERS.DESCRIPTION, "Cargo extra de prueba");
//Valor del item
parameters.put(PayU.PARAMETERS.ITEM_VALUE, "20000");
//Moneda
parameters.put(PayU.PARAMETERS.CURRENCY, "COP");
//Identificador de la subscripción
parameters.put(PayU.PARAMETERS.SUBSCRIPTION_ID, "52b04sx2s6");
//Impuestos - opcional
parameters.put(PayU.PARAMETERS.ITEM_TAX, "0");
//Base de devolución - opcional
parameters.put(PayU.PARAMETERS.ITEM_TAX_RETURN_BASE, "0");
RecurringBillItem response = PayURecurringBillItem.create(parameters);

if(response!=null){
	response.getId();
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	//Descripción del item
	PayUParameters::DESCRIPTION => "Cargo extra de prueba",
	//Valor del item
	PayUParameters::ITEM_VALUE => "20000",
	//Moneda
	PayUParameters::CURRENCY => "COP",
	//Identificador de la subscripción
	PayUParameters::SUBSCRIPTION_ID => "a9d01imeihk",
	//Impuestos - opcional
	PayUParameters::ITEM_TAX => "0",
	//Base de devolución - opcional
	PayUParameters::ITEM_TAX_RETURN_BASE => "0",
);

$response = PayURecurringBillItem::create($parameters);

if($response){
	$response->id;
}
```
{{< /tab >}}
{{< /tabs >}}

### Actualización
{{< tabs tabTotal="2" tabID="21" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
//Identificador del item existente
parameters.put(PayU.PARAMETERS.RECURRING_BILL_ITEM_ID, "15tolsvwz7l");
//(OPCIONAL)Nuevo valor para la descripción del item existente
parameters.put(PayU.PARAMETERS.DESCRIPTION, "Test Item New");
//(OPCIONAL)Nuevo valor para el valor del item existente
parameters.put(PayU.PARAMETERS.ITEM_VALUE, "200.5");
//(OPCIONAL)Nuevo valor para la moneda del item existente
parameters.put(PayU.PARAMETERS.CURRENCY, "COP");
//(OPCIONAL)Nuevo valor para el impuesto del item existente
parameters.put(PayU.PARAMETERS.ITEM_TAX, "15");
//(OPCIONAL)Nuevo valor para la base de retorno de impuesto del item existente
parameters.put(PayU.PARAMETERS.ITEM_TAX_RETURN_BASE, "185.5");
RecurringBillItem response = PayURecurringBillItem.update(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	//Identificador del cargo extra
	PayUParameters::RECURRING_BILL_ITEM_ID => "cbb57ywul2l",
	//Descripción del item
	PayUParameters::DESCRIPTION => "Cargo extra de prueba",
	//Valor del item
	PayUParameters::ITEM_VALUE => "20000",
	//Moneda
	PayUParameters::CURRENCY => "COP",
	//Impuestos - opcional
	PayUParameters::ITEM_TAX => "0",
	//Base de devolución - opcional
	PayUParameters::ITEM_TAX_RETURN_BASE => "0",
);

$response = PayURecurringBillItem::update($parameters);

if($response){
}
```
{{< /tab >}}
{{< /tabs >}}

### Consulta (Por id del cargo adicional)

{{< tabs tabTotal="2" tabID="22" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();

//Identificador del cargo extra
parameters.put(PayU.PARAMETERS.RECURRING_BILL_ITEM_ID, "5e174m7lgns");

RecurringBillItem response = PayURecurringBillItem.find(parameters);

if(response!=null){

}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	//Identificador del cargo extra
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

### Eliminación

{{< tabs tabTotal="2" tabID="25" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```Java
Map<String, String> parameters = new HashMap<String, String>();
//Identificador del item existente
parameters.put(PayU.PARAMETERS.RECURRING_BILL_ITEM_ID, "15tolsvwz7l");
boolean response = PayURecurringBillItem.delete(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```PHP
$parameters = array(
	//Identificador del cargo extra
	PayUParameters::RECURRING_BILL_ITEM_ID => "228bdp236sy",
);

$response = PayURecurringBillItem::delete($parameters);

if($response){

}
```
{{< /tab >}}
{{< /tabs >}}