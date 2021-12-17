---
title: "Pagamentos recorrentes - API"
linkTitle: "Pagamentos recorrentes - API"
date: 2021-09-28T13:40:06-05:00
type: docs
Description: >
   Os pagamentos recorrentes são cobranças automatizadas realizadas periodicamente (diário, mensal, anual), daqueles encargos por consumo de produtos ou serviços como afiliações, assinaturas, apólices ou recibos com valor fixo; que foram previamente autorizados pelo cliente.
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
      <p style="display:contents;color:white"><b>Funcionalidade descontinuada</b></p>
      <span class="close" style="color:white">&times;</span>
    </header>
    <p style="padding:20px">A funcionalidade de <b><i>Pagamentos recorrentes</i></b> foi descontinuada e, portanto, não é oferecida aos comerciantes. O artigo a seguir está disponível como uma referência para lojas que ainda o têm ativo.<br>Esta funcionalidade <b>NÃO</b> será ativada novamente.</p>
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

{{% alert title="Observação" color="warning"%}}
Os pagamentos recorrentes foram descontinuados e não são oferecidos aos comerciantes.
{{% /alert %}}

## Como funciona? 
![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/pagos-recurrentes1-pt.jpg)

{{% alert title="Considerar" color="info"%}}
Pagamentos recorrentes somente está disponível para contas do **Brasil**, **Colômbia**, **Peru** e **México**.
{{% /alert %}}

Com a finalidade de garantir o correto uso do sistema, todos os pedidos devem conter o cabeçalho HTTP de autorização com as credenciais do comércio, de maneira que possa ser identificado quem está realizando o pedido. Para esta implementação será usada autorização básica, onde se envia o nome de usuário (API Login) e senha (API Key).
 
Estes são os dados que devem ser enviados no cabeçalho do pedido: Os dados passam uma codificação base 64 com formato: `API Login : API Key`.  
Exemplo, se o API Login é `0123ABCDEF` e API Key é `A1B2C3D4E5`, então o cabeçalho de autorização seria o seguinte:

 
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

Apontando os correspondentes URLs:

{{% alert title="API" color="info"%}}
* Teste: ```https://sandbox.api.payulatam.com/payments-api/```
* Produção: ```https://api.payulatam.com/payments-api/```
{{% /alert %}}

Os métodos disponíveis para os pagamentos recorrentes são Plano, Cliente, Cartão de crédito, Assinatura e Taxa extra. A seguir, você encontrará a descrição de cada um.

## 1. Plano 
Mediante esta funcionalidade você pode registrar os dados do cartão de crédito de um cliente e assim obter um código sequencial token.  

As seguintes operações estão disponíveis:  

<div class="variables"></div>

| URL | Método | Descrição |
|---|---|---|
| /rest/v4.9/plans | `POST` | Criação de um novo plano para assinaturas associado ao comércio. |
| /rest/v4.9/plans/{planCode} | `PUT` | Atualizar a informação de um plano para assinaturas.<br>`{planCode}`: Código de identificação do plano para o comércio. |
| /rest/v4.9/plans/{planCode} | `GET` | Consultar toda a informação de um plano para assinaturas associado ao comércio.<br>`{planCode}`: Código de identificação do plano para o comércio. |
| /rest/v4.9/plans/{planCode} | `DELETE` | Apagar todo um plano para assinaturas associado ao comércio.<br>`{planCode}`: Código de identificação do plano para o comércio. |

### Criação

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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

Exemplo resposta:
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

Exemplo pedido:
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

Exemplo resposta:
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

### Atualização

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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

Exemplo resposta:
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

Exemplo pedido:
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

Exemplo resposta:
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

Exemplo pedido:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/plans/sample-plan-code-001
```
<br>

Exemplo resposta:
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

Exemplo pedido:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/plans/sample-plan-code-001
```
<br>

Exemplo resposta:
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

### Exclusão

{{< tabs tabTotal="1" tabID="4" tabName1="JSON / XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/plans/sample-plan-code-001
```
<br>

Exemplo resposta:
```HTTP
HTTP STATUS: 200 OK
```

{{< /tab >}}
{{< /tabs >}}

## 2. Cliente
Um cliente é a unidade que identifica quem será o beneficiário de um produto ou serviço prestado e que se encontra associado a um plano de pagamentos recorrentes.

As seguintes operações estão disponíveis:  
<div class="variables"></div>

| URL | Método | Descrição |
|---|---|---|
| /rest/v4.9/customers/ | `POST` | Criação de um cliente no sistema. |
| /rest/v4.9/customers/{customerId} | `PUT` | Atualiza a informação de um cliente no sistema.<br>`{customerId}`: Identificador do cliente que se deseja atualizar. |
| /rest/v4.9/customers/{customerId} | `GET` | Consulta a informação relacionada com o cliente.<br>`{customerId}`: Identificador do cliente do qual se deseja conhecer a informação associada. |
| /rest/v4.9/customers/{customerId} | `DELETE` | Apaga um usuário do sistema.<br>`{customerId}`: Identificador do cliente que se deseja apagar. |

### Criação

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```JSON
{
   "fullName": "Pedro E. Perez",
   "email": "pperez@payulatam.com"
}
```
<br>

Exemplo resposta:
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

Exemplo pedido:
```XML
<customer>
	<fullName>Pedro E. Perez</fullName>
	<email>pperez@payulatam.com</email>
</customer>
```
<br>

Exemplo resposta:
```XML
<customer>
	<id>6ahxar252</id>
	<fullName>Pedro E. Pérez</fullName>
	<email>pperez@payulatam.com</email>
</customer>
```
{{< /tab >}}
{{< /tabs >}}

### Atualização

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```JSON
{
   "fullName": "Pedro E. Perez",
   "email": "pperez@payulatam.com"
}
```
<br>

Exemplo resposta:
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

Exemplo pedido:
```XML
<customer>
	<fullName>Pedro E. Perez</fullName>
	<email>pperez@payulatam.com</email>
</customer>
```
<br>

Exemplo resposta:
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

Exemplo pedido:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/customers/2mkls9xekm
```
<br>

Exemplo resposta:
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

Exemplo pedido:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/customers/2mkls9xekm
```
<br>

Exemplo resposta:
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

### Exclusão

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/customers/7wp1r0atl
```
<br>

Exemplo resposta:
```JSON
{
    "description": "O cliente [7wp1r0atl] foi removido."
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/customers/7wp1r0atl
```
<br>

Exemplo resposta:
```XML
<response>
   <description>O cliente [7wp1r0atl] foi removido</description>
</response>
```
{{< /tab >}}
{{< /tabs >}}

## 3. Cartão de crédito
É a forma de pagamento com a qual um Plano se relaciona a um Pagador, é composto pelo número de cartão de crédito (o qual será tokenizado para armazenar os dados de forma segura), a data de vencimento do cartão e alguns dados adicionais de endereço. 

As seguintes operações estão disponíveis:  
<div class="variables"></div>

| URL | Método | Descrição |
|---|---|---|
| /rest/v4.9/customers/{customerID}/creditCards | `POST` | Criação de um cartão de crédito (Token) e associá-lo a um usuário.<br>{customerId} : Identificador do cliente ao qual será associado o token |
| /rest/v4.9/creditCards/{creditCardId} | `PUT` | Atualizar a informação de um token.<br>`{creditCardId}`: Identificador do token que se deseja atualizar. |
| /rest/v4.9/creditCards/{creditCardId} | `GET` | Consultar a informação de um cartão de crédito (Token) dado seu identificador.<br>`{creditCardId}`: Token do cartão de crédito que deseja consultar. |
| /rest/v4.9/customers/{customerID}/creditCards/{creditCardId} | `DELETE` | Apagar um cartão de crédito (Token) associado a um usuário.<br>{customerId} : Identificador do cliente do qual será apagado o token.<br>`{creditCardId}`: Identificador do token que se deseja apagar. |


### Criação

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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

Exemplo resposta:
```JSON
{
   "token": "8186ca42-2f69-417b-94a0-208bd8e089af"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
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

Exemplo resposta:
```XML
<creditCard>
   <token>8186ca42-2f69-417b-94a0-208bd8e089af</token>
</creditCard>
```
{{< /tab >}}
{{< /tabs >}}

### Atualização

{{< tabs tabTotal="2" tabID="10" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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

Exemplo resposta:
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

Exemplo pedido:
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

Exemplo resposta:
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

Exemplo pedido:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/customers/2mkls9xekm
```
<br>

Exemplo resposta:
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

Exemplo pedido:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/customers/2mkls9xekm
```
<br>

Exemplo resposta:
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

### Exclusão

{{< tabs tabTotal="2" tabID="12" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/customers/{customerID}/creditCards/{creditCardId}
```
<br>

Exemplo resposta:
```JSON
{ 
  "description": "O cartão de crédito f17e9c5c-c414-4dc0-a145-5b0647f7dbf8 foi removido com sucesso"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/customers/{customerID}/creditCards/{creditCardId}
```
<br>

Exemplo resposta:
```XML
<response>
	<description>O cartão de crédito f17e9c5c-c414-4dc0-a145-5b0647f7dbf8 foi removido com sucesso</description>
</response>
```
{{< /tab >}}
{{< /tabs >}}

## 4. Assinatura
Uma assinatura é a relação entre um plano de pagamentos, um pagador e um cartão de crédito e é o elemento com o qual se controla a execução das cobranças competentes.  

As seguintes operações estão disponíveis:  
<div class="variables"></div>

| URL | Métodos | Descrição |
|---|---|---|
| /rest/v4.9/subscriptions/ | POST | Criação de uma nova assinatura de um cliente para um plano. |
| /rest/v4.9/subscriptions/{subscriptionId} | PUT | Atualizar a informação associada à assinatura indicada. Neste momento somente é possível atualizar o token do cartão de crédito ao qual se realiza o encargo da assinatura.<br>`{subscriptionId}`: Identificação da assinatura. |
| /rest/v4.9/subscriptions/{subscriptionId} | GET | Consultar a informação básica associada à assinatura indicada.<br>`{subscriptionId}`: Identificação da assinatura. |
| /rest/v4.9/subscriptions/{subscriptionId} | DELETE | Apagar a assinatura, ou seja, a relação do cliente ao plano.<br>`{subscriptionId}`: Identificação da assinatura. |


### Criação
 
<details>
<summary>Com todos os elementos novos</summary>
<br>

{{< tabs tabTotal="2" tabID="13" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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

Exemplo resposta:
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

Exemplo pedido:
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

Exemplo resposta:
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
<summary>Com todos os elementos existentes</summary>
<br>

{{< tabs tabTotal="2" tabID="14" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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

Exemplo resposta:
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

Exemplo pedido:
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

Exemplo resposta:
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
<summary>Plano e cliente já criados, e um cartão novo</summary>
<br>

{{< tabs tabTotal="2" tabID="15" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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

Exemplo resposta:
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

Exemplo pedido:
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

Exemplo resposta:
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
<summary>Cliente e cartão já criados, e com plano novo</summary>
<br>

{{< tabs tabTotal="2" tabID="16" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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

Exemplo resposta:
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

Exemplo pedido:
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

Exemplo resposta:
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

### Atualização (Cartão de credito de uma assinatura)

{{< tabs tabTotal="2" tabID="17" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```JSON
{
  "creditCardToken": "a068e980-a6d7-4a19-b549-75c04f39ec22"
}
```
<br>

Exemplo resposta:
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

Exemplo pedido:
```XML
<subscription>
	<creditCardToken>a068e980-a6d7-4a19-b549-75c04f39ec22</creditCardToken>
</subscription>
```
<br>

Exemplo resposta:
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

Exemplo pedido:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/subscriptions/1dhb51hfuu
```
<br>

Exemplo resposta:
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

Exemplo pedido:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/subscriptions/1dhb51hfuu
```
<br>

Exemplo resposta:
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

### Exclusão

{{< tabs tabTotal="2" tabID="19" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/subscriptions/3hpyu04ij
```
<br>

Exemplo resposta:
```JSON
{
  "description": "A assinatura [3hpyu04ij] foi cancelada"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/subscriptions/3hpyu04ij
```
<br>

Exemplo resposta:
```XML
<response>
  <description>A assinatura [3hpyu04ij] foi cancelada</description>
</response>
```
{{< /tab >}}
{{< /tabs >}}

## 5. Taxas extras
Um encargo pode ser uma cobrança adicional ou um desconto realizado sobre o valor de um dos pagamentos que conformam o plano de pagamentos recorrentes. Estes somente afetam a próxima cobrança pendente e são executados uma única vez.  

As seguintes operações estão disponíveis:   
<div class="variables"></div>

| URL | Métodos | Descrição |
|---|---|---|
| /rest/v4.9/subscriptions/{subscriptionId}/recurringBillItems | `POST` | Adiciona taxas extras na fatura correspondente ao período atual.<br>`{subscriptionId}`: Identificação da assinatura. |
| /rest/v4.9/recurringBillItems/{recurringBillItemId} | `PUT` | Atualiza a informação da taxa extra de uma fatura.<br>`{recurringBillItemId}`: Identificador da taxa extra. |
| /rest/v4.9/recurringBillItems/{recurringBillItemId} | `GET` | Consulta a informação da taxa extra de uma fatura a partir de seu identificador.<br>`{recurringBillItemId}`: Identificador da taxa extra. |
| /rest/v4.9/recurringBillItems/{recurringBillItemId} | `DELETE` | Apagar uma taxa extra de uma fatura.<br>`{recurringBillItemId}`: Identificador da taxa extra. |
| /rest/v4.9/recurringBillItems/ | `GET` | Consulta dos encargos extras das faturas do comércio que cumprem com os filtros estipulados. Os filtros disponíveis são mostrados a seguir e devem ser enviados como named parameters dentro do URL:<br>`{subscriptionId}`: Identificação da assinatura.<br>`{description}`: Descrição ingresada en el cargo extra |


### Criação
{{< tabs tabTotal="2" tabID="20" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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

Exemplo resposta:
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

Exemplo pedido:
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

Exemplo resposta:
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

### Atualização
{{< tabs tabTotal="2" tabID="21" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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

Exemplo resposta:
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

Exemplo pedido:
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

Exemplo resposta:
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
<summary>Por id da taxa adicional</summary>
<br>

{{< tabs tabTotal="2" tabID="22" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/2uww909obl
```
<br>

Exemplo resposta:
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

Exemplo pedido:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/2uww909obl
```
<br>

Exemplo resposta:
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
<summary>Por descrição da taxa adicional</summary>
<br>

{{< tabs tabTotal="2" tabID="23" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/?description=Cargo%20b
```
<br>

Exemplo resposta:
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

Exemplo pedido:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/?description=Cargo%20b
```
<br>

Exemplo resposta:
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
<summary>Por assinatura</summary>
<br>

{{< tabs tabTotal="2" tabID="24" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/?subscriptionId=26gyv192a
```
<br>

Exemplo resposta:
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

Exemplo pedido:
```HTTP
GET https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/?subscriptionId=26gyv192a
```
<br>

Exemplo resposta:
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

### Exclusão

{{< tabs tabTotal="2" tabID="25" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/ou8ru86nq
```
<br>

Exemplo resposta:
```JSON
{
   "description": "recurring bill item ou8ru86nq has been removed successfully"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```HTTP
DELETE https://api.payulatam.com/payments-api/rest/v4.3/recurringBillItems/ou8ru86nq
```
<br>

Exemplo resposta:
```XML
<response>
	<description>recurring bill item ou8ru86nq has been removed successfully</description>
</response>

```
{{< /tab >}}
{{< /tabs >}}