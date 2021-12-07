---
title: "Pagos recurrentes - API"
linkTitle: "Pagos recurrentes - API"
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
// var content = document.getElementsByClassName("td-content")[0];

// When the page loads, open the modal 
window.onload = function() {
  // content.style.backgroundImage = "url('/assets/deprecated.png')";
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

Con el fin de garantizar el correcto uso del sistema, todas las peticiones deben contener el encabezado HTTP de autorización con las credenciales del comercio, de manera que pueda identificarse quién está realizando la petición. Para esta implementación se usará autorización básica, en donde se envía el nombre de usuario (API Login) y contraseña (API Key).
 
Estos son los datos que deben ser enviados en el encabezado de la petición: Los datos pasan un cifrado base 64 con formato: `API Login : API Key`.  
Ejemplo, si el API Login es `0123ABCDEF` y API Key es `A1B2C3D4E5`, entonces el encabezado de autorización sería el siguiente:

 
Authorization: ```Basic <base64 of 0123ABCDEF:A1B2C3D4E5>```
Authorization: ```Basic MDEyM0FCQ0RFRjpBMUIyQzNENEU1   ``` 
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

Apuntando a las correspondientes URLs:

{{% alert title="API" color="info"%}}
* Test: ```https://sandbox.api.payulatam.com/payments-api/```
* Production: ```https://api.payulatam.com/payments-api/```
{{% /alert %}}

Los métodos disponibles para los pagos recurrentes son: Plan, Cliente, Tarjeta de crédito, Suscripción y Cargos adicionales. A continuación encontrarás la descripción de cada uno.

## 1. Plan

<details>
<summary>Variables usadas para la creación de un plan</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio en |
|---|---|---|---|---|
| planCode | Alfanumérico | Mín: 1 Máx: 255 | Código único que el comercio le asigna al plan para su posterior identificación. | Todos los países |
| description | Alfanumérico | Mín: 1 Máx: 255 | Descripción del plan. | Todos los países |
| accountId | Numérico |  | Identificador de la cuenta del comercio al cual se asocia el plan. | Todos los países |
| interval | Alfanumérico | Mín: 3 Máx: 5 | Intervalo que define cada cuanto se realiza el cobro de la suscripción. Los valores posibles son: `DAY`, `WEEK`, `MONTH` y `YEAR`. | Todos los países |
| intervalCount | Numérico |  | Cantidad del intervalo que define cada cuanto se realiza el cobro de la suscripción. | Todos los países |
| maxPaymentsAllowed | Numérico |  | Cantidad total de pagos de la suscripción. | Todos los países |
| maxPaymentAttempts | Numérico | Máx: 3 | Cantidad total de reintentos para cada pago rechazado de la suscripción. | No |
| paymentAttemptsDelay | Numérico |  | Cantidad de días de espera entre los reintentos de pago de la suscripción. | Todos los países |
| maxPendingPayments | Numérico |  | Cantidad máxima de pagos pendientes que puede tener una suscripción antes de ser cancelada. | No |
| trialDays | Numérico |  | Cantidad de días de prueba de la suscripción. | No |
| additionalValues.entry.name |  | 64 | Valor o monto asociado al plan. En este campo se envía un monto por entrada. | Todos los países |
| transaction.order. additionalValues.entry.string | Alfanumérico | 64 | `PLAN_VALUE`, es el monto total del plan. Puede contener dos dígitos decimales. Ej. 10000.00 ó 10000. Este valor debe ser enviado en `transaction.order.additionalValues.entry. additionalValue.value` | Colombia |
| transaction.order. additionalValues.entry.string | Alfanumérico | 64 | `PLAN_TAX_VALUE`, es el valor del IVA (Impuesto al Valor Agregado solo valido para Colombia) del plan, si se envía el IVA nulo el sistema aplicará el 19% automáticamente. Puede contener dos dígitos decimales. Ej: 19000.00. En caso de no tener IVA debe enviarse en 0. Este valor debe ser enviado en `transaction.order.additionalValues.entry. additionalValue.value` | Colombia |
| transaction.order. additionalValues.entry.string | Alfanumérico | 64 | `PLAN_TAX_RETURN_BASE`, Es el valor base sobre el cual se calcula el IVA (solo valido para Colombia). En caso de que no tenga IVA debe enviarse en 0. Este valor debe ser enviado en `transaction.order.additionalValues.entry. additionalValue.value` | Colombia |
| additionalValues.entry.value | Numérico | 19, 2 | Valor del plan, impuesto o base de retorno de acuerdo a `additionalValue.entry.name`. | Todos los países |
| additionalValues.entry.currency | Alfanumérico | 3 | El código ISO de la moneda asociada al monto. [Ver Divisas admitidas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Todos los países |

</details>
<br>

Mediante esta funcionalidad puedes registrar los datos asociados a tu plan recurrente y así obtener un identificador para el mismo.  

Se encuentran disponibles las siguientes operaciones: 

<div class="variables"></div>

| URL | Método | Descripción |
|---|---|---|
| /rest/v4.9/plans | `POST` | Creación de un nuevo plan para suscripciones asociado al comercio. |
| /rest/v4.9/plans/{planCode} | `PUT` | Actualizar la información de un plan para suscripciones.<br>`{planCode}`: Código de identificación del plan para el comercio. |
| /rest/v4.9/plans/{planCode} | `GET` | Consultar toda la información de un plan para suscripciones asociado al comercio.<br>`{planCode}`: Código de identificación del plan para el comercio. |
| /rest/v4.9/plans/{planCode} | `DELETE` | Eliminar todo un plan para suscripciones asociado al comercio.<br>`{planCode}`: Código de identificación del plan para el comercio. |

### Creación

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

Ejemplo petición:
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

Ejemplo respuesta:
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

### Actualización

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

Ejemplo petición:
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

Ejemplo respuesta:
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

### Consulta

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/plans/sample-plan-code-001
```
<br>

Ejemplo respuesta:
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

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/plans/sample-plan-code-001
```
<br>

Ejemplo respuesta:
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

### Eliminación

{{< tabs tabTotal="1" tabID="4" tabName1="JSON / XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/plans/sample-plan-code-001
```
<br>

Ejemplo respuesta:
```HTTP
HTTP STATUS: 200 OK
```

{{< /tab >}}
{{< /tabs >}}

## 2. Cliente
<details>
<summary>Variables usadas para la creación de un cliente</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio en |
|---|---|---|---|---|
| fullName | Alfanumérico | Max: 255 | Nombre completo del cliente. | Todos los países |
| email | Alfanumérico | Max: 255 | Dirección de correo electrónico del cliente. | Todos los países |

</details>
<br>

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

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```JSON
{
   "fullName": "Pedro E. Perez",
   "email": "pperez@payulatam.com"
}
```
<br>

Ejemplo respuesta:
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

Ejemplo petición:
```XML
<customer>
	<fullName>Pedro E. Perez</fullName>
	<email>pperez@payulatam.com</email>
</customer>
```
<br>

Ejemplo respuesta:
```XML
<customer>
	<id>6ahxar252</id>
	<fullName>Pedro E. Pérez</fullName>
	<email>pperez@payulatam.com</email>
</customer>
```
{{< /tab >}}
{{< /tabs >}}

### Actualización

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```JSON
{
   "fullName": "Pedro E. Perez",
   "email": "pperez@payulatam.com"
}
```
<br>

Ejemplo respuesta:
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

Ejemplo petición:
```XML
<customer>
	<fullName>Pedro E. Perez</fullName>
	<email>pperez@payulatam.com</email>
</customer>
```
<br>

Ejemplo respuesta:
```XML
<customer>
	<id>6ahxar252</id>
	<fullName>Pedro E. Pérez</fullName>
	<email>pperez@payulatam.com</email>
</customer>
```
{{< /tab >}}
{{< /tabs >}}

### Consulta

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/customers/2mkls9xekm
```
<br>

Ejemplo respuesta:
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

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/customers/2mkls9xekm
```
<br>

Ejemplo respuesta:
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

### Eliminación

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/customers/7wp1r0atl
```
<br>

Ejemplo respuesta:
```JSON
{
    "description": "El cliente [7wp1r0atl] ha sido eliminado."
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/customers/7wp1r0atl
```
<br>

Ejemplo respuesta:
```XML
<response>
   <description>El cliente [7wp1r0atl] ha sido eliminado</description>
</response>
```
{{< /tab >}}
{{< /tabs >}}

## 3. Tarjeta de crédito

<details>
<summary>Variables usadas para la creación de una tarjeta de crédito</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio en |
|---|---|---|---|---|
| number | Numérico | Mín: 13 Máx: 20 | Número de la tarjeta de crédito. | Todos los países |
| name | Alfanumérico | Mín: 1 Máx: 255 | Nombre completo del tarjeta habiente. | Todos los países |
| document | Alfanumérico | Mín: 5 Máx: 30 | Número del documento de identidad del tarjeta habiente. | Todos los países |
| expMonth | Numérico | Mín: 1 Máx: 12 | Mes de expiración de la tarjeta de crédito. | Todos los países |
| expYear | Numérico | Mín: 00 Máx: 2999 | Año de expiración de la tarjeta de crédito. Si el valor es de dos dígitos corresponde al año comprendido entre 2000 (00) y 2099 (99). Si el valor es de más de dos dígitos se toma literal, siendo el año 2000 como mínimo posible. | Todos los países |
| type | Alfanumérico |  | Corresponde a la franquicia o tipo de tarjeta de crédito. [Ver Medios de pago]({{< ref "select-your-payment-method.html" >}}). | Todos los países |
| address |  |  | Dirección de correspondencia del tarjeta habiente asociado con la tarjeta de crédito. | Todos los países |
| address.line1 | Alfanumérico | Mín: 1 Máx: 100 | Primera línea de la dirección. | Todos los países |
| address.line2 | Alfanumérico | Mín: 1 Máx: 100 | Segunda línea de la dirección o número de la dirección. | No |
| address.line3 | Alfanumérico | Mín: 1 Máx: 100 | Tercera línea de la dirección o complemento de la dirección. | No |
| address.city | Alfanumérico | Mín: 1 Máx: 50 | Nombre de la ciudad. | Todos los países |
| address.state | Alfanumérico | Mín: 1 Máx: 40 | Estado o departamento de la dirección. <sup>\*</sup>Para Brasil enviar únicamente 2 caracteres. Ejemplo: Si es Sao Paulo enviar SP. | Brasil |
| address.country | Alfanumérico | 2 | País de la dirección en formato ISO 3166 Código Alfa 2. | Todos los países |
| address.postalCode | Alfanumérico | Mín: 1 Máx: 20 | Código postal de la dirección. <sup>\*</sup>Para Brasil utilizar el formato XXXXX-XXX o XXXXXXXX ejemplo: 09210-710 o 09210710. | México, Brasil |
| address.phone | Alfanumérico | Mín: 1 Máx: 20 | Teléfono asociado a la dirección. <sup>\*</sup>Para Brasil usar el formato ddd(2)+numero(7-9) ejemplo: (11)756312633. | Todos los países |
</details>
<br>

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

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
```JSON
{
   "token": "8186ca42-2f69-417b-94a0-208bd8e089af"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
```XML
<creditCard>
   <token>8186ca42-2f69-417b-94a0-208bd8e089af</token>
</creditCard>
```
{{< /tab >}}
{{< /tabs >}}

### Actualización

{{< tabs tabTotal="2" tabID="10" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

Ejemplo petición:
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

Ejemplo respuesta:
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

### Consulta

{{< tabs tabTotal="2" tabID="11" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/customers/2mkls9xekm
```
<br>

Ejemplo respuesta:
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

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/customers/2mkls9xekm
```
<br>

Ejemplo respuesta:
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

### Eliminación

{{< tabs tabTotal="2" tabID="12" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/customers/{customerID}/creditCards/{creditCardId}
```
<br>

Ejemplo respuesta:
```JSON
{ 
  "description": "La tarjeta de crédito f17e9c5c-c414-4dc0-a145-5b0647f7dbf8 se ha eliminado exitosamente"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/customers/{customerID}/creditCards/{creditCardId}
```
<br>

Ejemplo respuesta:
```XML
<response>
	<description>La tarjeta de crédito f17e9c5c-c414-4dc0-a145-5b0647f7dbf8 se ha eliminado exitosamente</description>
</response>
```
{{< /tab >}}
{{< /tabs >}}

## 4. Suscripción

<details>
<summary>Variables usadas para la creación de un suscripción</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio en |
|---|---|---|---|---|
| quantity | Numérico |  | Cantidad de planes a adquirir con la suscripción. | No |
| installments | Numérico |  | Número de cuotas en las que se diferirá cada cobro de la suscripción. | No |
| trialDays | Numérico |  | Días de prueba que tendrá la suscripción sin generar cobros. | No |
| customer |  |  | Cliente(s) asociado(s) a la suscripción. Puedes encontrar mayor información en la sección "Cliente" de esta página. | Todos los países |
| customer.creditCards |  |  | Tarjeta de crédito asociada al cliente, sobre la cual se realizará el cobro. Puedes encontrar mayor información en la sección "Tarjeta de credito" de esta página. | Todos los países |
| plan |  |  | Plan asociado a la suscripción. Puedes encontrar mayor información en la sección "Plan" de esta página. | Todos los países |
| immediatePayment | Booleano |  | True: Ejecuta la suscripción inmediatamente como una transacción y se crea la suscripción para los siguientes pagos.<br>False: Se realiza el primer cobro al siguiente día o de acuerdo a los dias de prueba especificados. | No |
| extra1 | Alfanumérico | Mín: 0 Máx: 255 | Campo adicional para enviar información sobre la compra. Ej: Descripción de la compra. | No |
| extra2 | Alfanumérico | Mín: 0 Máx: 255 | Campo adicional para enviar información sobre la compra. Ej: Códigos internos de los productos. | No |
| deliveryAddress |  |  | Dirección de envío de los productos. | Todos los comercios con envío físico de productos |
| deliveryAddress.line1 | Alfanumérico | Mín: 0 Máx: 100 | Primera línea de la dirección. | Todos los comercios con envío físico de productos |
| deliveryAddress.line2 | Alfanumérico | Mín: 0 Máx: 100 | Segunda línea de la dirección o número de la dirección. | No |
| deliveryAddress.line3 | Alfanumérico | Mín: 0 Máx: 100 | Tercera línea de la dirección o complemento de la dirección. | No |
| deliveryAddress.city | Alfanumérico | Mín: 0 Máx: 50 | Nombre de la ciudad. | Todos los comercios con envío físico de productos |
| deliveryAddress.state | Alfanumérico | Mín: 0 Máx: 40 | Estado o departamento de la dirección. <sup>\*</sup>Para Brasil enviar únicamente 2 caracteres. Ejemplo: Si es Sao Paulo enviar SP. | Brasil (Todos los comercios con envío físico de productos) |
| deliveryAddress.country | Alfanumérico | 2 | País de la dirección en formato ISO 3166 Código Alfa 2. | Todos los comercios con envío físico de productos |
| deliveryAddress.postalCode | Alfanumérico | Mín: 0 Máx: 20 | Código postal de la dirección. <sup>\*</sup>Para Brasil utilizar el formato XXXXX-XXX o XXXXXXXX ejemplo: 09210-710 o 09210710. | México, Brasil (Todos los comercios con envío físico de productos) |
| deliveryAddress.phone | Alfanumérico | Mín: 0 Máx: 20 | Teléfono asociado a la dirección. <sup>\*</sup>Para Brasil usar el formato ddd(2)+numero(7-9) ejemplo: (11)756312633. | Todos los comercios con envío físico de productos |
| notifyUrl | Alfanumérico | Mín: 0 Máx: 2048 | La URL de notificación o confirmación de la orden. | No |
| recurringBillItems |  |  | Cobro adicional o un descuento realizado sobre el valor de uno de los pagos que conforman el plan de pagos recurrentes. Se tendrá en cuenta únicamente si el atributo "immediatePayment" tiene valor true.<br>Para obtener mayor informacion por favor visualizar la sección "Cargos adicionales" de esta página. | No |

</details>
<br>

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

{{< tabs tabTotal="2" tabID="13" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

Ejemplo petición:
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

Ejemplo respuesta:
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
<summary>Con todos los elementos existentes</summary>
<br>

{{< tabs tabTotal="2" tabID="14" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

Ejemplo petición:
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

Ejemplo respuesta:
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
<summary>Plan y cliente ya creados, y una tarjeta nueva</summary>
<br>

{{< tabs tabTotal="2" tabID="15" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

Ejemplo petición:
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

Ejemplo respuesta:
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
<summary>Cliente y tarjeta ya creados, y con plan nuevo</summary>
<br>

{{< tabs tabTotal="2" tabID="16" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

Ejemplo petición:
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

Ejemplo respuesta:
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

### Actualización (Tarjeta de crédito de una suscripción)

{{< tabs tabTotal="2" tabID="17" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```JSON
{
  "creditCardToken": "a068e980-a6d7-4a19-b549-75c04f39ec22"
}
```
<br>

Ejemplo respuesta:
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

Ejemplo petición:
```XML
<subscription>
	<creditCardToken>a068e980-a6d7-4a19-b549-75c04f39ec22</creditCardToken>
</subscription>
```
<br>

Ejemplo respuesta:
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

### Consulta
{{< tabs tabTotal="2" tabID="18" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/subscriptions/1dhb51hfuu
```
<br>

Ejemplo respuesta:
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

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/subscriptions/1dhb51hfuu
```
<br>

Ejemplo respuesta:
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

### Eliminación

{{< tabs tabTotal="2" tabID="19" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/subscriptions/3hpyu04ij
```
<br>

Ejemplo respuesta:
```JSON
{
  "description": "La suscripción [3hpyu04ij] ha sido cancelada"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/subscriptions/3hpyu04ij
```
<br>

Ejemplo respuesta:
```XML
<response>
  <description>La suscripción [3hpyu04ij] ha sido cancelada</description>
</response>
```
{{< /tab >}}
{{< /tabs >}}

## 5. Cargos adicionales
<details>
<summary>Variables usadas para la creación de un cargo adicional</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Tamaño | Descripción | Obligatorio en |
|---|---|---|---|---|
| descripcion | Alfanumérico | Mín: 1 Máx: 255 | Descripción del cargo adicional asociado al cobro. | Todos los países |
| additionalValues.entry.name |  | 64 | Valor o monto asociado al cargo adicional. En este campo se envía un monto por entrada. | Todos los países |
| transaction.order. additionalValues.entry.string | Alfanumérico | 64 | `ITEM_VALUE`, es el monto total del cargo adicional. Puede contener dos dígitos decimales. Ej. 10000.00 ó 10000. Este valor debe ser enviado en `transaction.order.additionalValues. entry.additionalValue.value` | Colombia |
| transaction.order. additionalValues.entry.string | Alfanumérico | 64 | `ITEM_TAX`, es el valor del IVA (Impuesto al Valor Agregado solo valido para Colombia) del cargo adicional, si se envía el IVA nulo el sistema aplicará el 19% automáticamente. Puede contener dos dígitos decimales. Ej: 19000.00. En caso de no tener IVA debe enviarse en 0. Este valor debe ser enviado en `transaction.order.additionalValues. entry.additionalValue.value` | Colombia |
| transaction.order. additionalValues.entry.string | Alfanumérico | 64 | `ITEM_TAX_RETURN_BASE`, Es el valor base sobre el cual se calcula el IVA (solo valido para Colombia). En caso de que no tenga IVA debe enviarse en 0. Este valor debe ser enviado en `transaction.order.additionalValues. entry.additionalValue.value` | Colombia |
| additionalValues.entry.value | Numérico | 19, 2 | Valor del cargo, impuesto o base de retorno de acuerdo a `additionalValue.entry.name`. | Todos los países |
| additionalValues.entry.currency | Alfanumérico | 3 | El código ISO de la moneda asociada al monto. [Ver Divisas admitidas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Todos los países |


</details>
<br>

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
{{< tabs tabTotal="2" tabID="20" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

Ejemplo petición:
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

Ejemplo respuesta:
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

### Actualización
{{< tabs tabTotal="2" tabID="21" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
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

Ejemplo respuesta:
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

Ejemplo petición:
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

Ejemplo respuesta:
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

### Consulta

<details>
<summary>Por id del cargo adicional</summary>
<br>

{{< tabs tabTotal="2" tabID="22" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/2uww909obl
```
<br>

Ejemplo respuesta:
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

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/2uww909obl
```
<br>

Ejemplo respuesta:
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
<summary>Por descripción del cargo adicional</summary>
<br>

{{< tabs tabTotal="2" tabID="23" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/?description=Cargo%20b
```
<br>

Ejemplo respuesta:
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

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/?description=Cargo%20b
```
<br>

Ejemplo respuesta:
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
<summary>Por suscripción</summary>
<br>

{{< tabs tabTotal="2" tabID="24" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/?subscriptionId=26gyv192a
```
<br>

Ejemplo respuesta:
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

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/?subscriptionId=26gyv192a
```
<br>

Ejemplo respuesta:
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

### Eliminación

{{< tabs tabTotal="2" tabID="25" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/ou8ru86nq
```
<br>

Ejemplo respuesta:
```JSON
{
   "description": "recurring bill item ou8ru86nq has been removed successfully"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Ejemplo petición:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/ou8ru86nq
```
<br>

Ejemplo respuesta:
```XML
<response>
	<description>recurring bill item ou8ru86nq has been removed successfully</description>
</response>

```
{{< /tab >}}
{{< /tabs >}}

## 6. Facturas
<details>
<summary>Atributos asociados a una factura</summary>
<br>
<div class="variables"></div>

| Nombre del campo | Formato | Descripción |
|---|---|---|
| recurringBill.id | Alfanumérico | Identificador de la factura recurrente en la plataforma de PayU. |
| recurringBill.orderId | Numérico | Identificador de la orden asociada a la factura recurrente en la plataforma de PayU. |
| recurringBill.subscriptionId | Alfanumérico | Identificador de la suscripción asociada a la factura recurrente en la plataforma de PayU. |
| recurringBill.state | Alfanumérico | Estado de la factura recurrente. Los estados pueden ser:<br><ul style="margin-bottom: initial;"><li>`NOT_PAID`: Pago rechazado.</li><li>`PAYMENT_IN_PROGRESS`: Cobro en progreso.</li><li>`PENDING`: Próximo cobro a realizar.</li><li>`RETRYING_PAYMENT`: Reintento de pago.</li><li>`PAID`: Pago aprobado.</li><li>`CANCELLED`: Suscripción cancelada.</li><li>`PENDING_REVIEW`: Pago en proceso de validación.</li></ul> |
| recurringBill.amount | Numérico | Valor de la factura recurrente. |
| recurringBill.currency | Alfanumérico | El código ISO de la moneda asociada al monto. [Ver Divisas admitidas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). |
| recurringBill.dateCharge | Date | Fecha de cobro de la factura recurrente. Cuando se utiliza el formato json la estructura del valor será Epoch/Unix, por lo que se debe convertir. |

</details>
<br>

Una factura es un intento de pago que se realizó sobre una suscripción, o está pendiente por ejecutarse.  

Las facturas solo tienen el método de consulta disponible:  
<div class="variables"></div>

| URL | Métodos | Descripción |
|---|---|---|
| /rest/v4.3/recurringBill | `GET` | Consulta de las facturas que están pagadas o pendientes por pagar. Se puede consultar por cliente, por suscripción o por rango de fechas:<br>```/rest/v4.3/recurringBill?customerId={customerId}```<br>```/rest/v4.3/recurringBill?subscriptionId={subscriptionId}```<br>```/rest/v4.3/recurringBill?customerId={customerId}&dateBegin;={dateBegin}&dateFinal;={dateFinal}``` |

### Consulta

<details>
<summary>Por id del cliente</summary>
<br>

{{< tabs tabTotal="2" tabID="26" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBill?customerId=6dtc2i97hw5
```
<br>

Ejemplo respuesta:
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

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBill?customerId=6dtc2i97hw5
```
<br>

Ejemplo respuesta:
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
<summary>Por id de la suscripción</summary>
<br>

{{< tabs tabTotal="2" tabID="27" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBill?subscriptionId=6dtg51j09cr
```
<br>

Ejemplo respuesta:
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

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBill?subscriptionId=6dtg51j09cr
```
<br>

Ejemplo respuesta:
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
<summary>Por id del cliente y un rango de fechas</summary>
<br>

{{< tabs tabTotal="2" tabID="28" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBill?customerId=6dtc2i97hw5&dateBegin;=2014-02-03&dateFinal;=2014-02-04
```
<br>

Ejemplo respuesta:
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

Ejemplo petición:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBill?customerId=6dtc2i97hw5&dateBegin;=2014-02-03&dateFinal;=2014-02-04
```
<br>

Ejemplo respuesta:
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