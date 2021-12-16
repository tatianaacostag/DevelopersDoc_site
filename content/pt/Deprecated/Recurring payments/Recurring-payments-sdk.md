---
title: "Pagamentos recorrentes - SDK"
linkTitle: "Pagamentos recorrentes - SDK"
date: 2021-09-28T13:40:06-05:00
type: docs
Description: >
   Los pagamentos recorrentes son cobros automatizados que se realizan periódicamente (diario, mensual, anual), de aquellos cargos por consumo de productos o servicios como membresías, suscripciones, pólizas o recibos con valor fijo; que previamente fueron autorizados por el cliente.
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

{{% alert title="Tener en cuenta" color="info"%}}
Pagamentos recorrentes somente está disponível para contas do **Brasil**, **Colômbia**, **Peru** e **México**.
{{% /alert %}}

Apontando as correspondentes URLs:

{{< tabs tabTotal="2" tabID="30" tabName1="Java" tabName2="PHP" >}}
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

Os métodos disponíveis para os pagamentos recorrentes são: Plano, Cliente, Cartão de crédito, Assinatura e Taxas adicionais. A seguir você encontrará a descrição de cada um.

## 1. Plano
Mediante esta funcionalidade você pode registrar os dados do cartão de crédito de um cliente e assim obter um código sequencial token.  

As seguintes operações estão disponíveis:  
<div class="variables"></div>

| URL | Método | Descrição |
|---|---|---|
| /rest/v4.9/plans | `POST` | Criação de um novo plano para assinaturas associado ao comércio. |
| /rest/v4.9/plans/{planCode} | `PUT` | Actualizar la información de un plan para suscripciones.<br>`{planCode}`: Código de identificação do plano para o comércio. |
| /rest/v4.9/plans/{planCode} | `GET` | Consultar toda la información de un plan para suscripciones asociado al comercio.<br>`{planCode}`: Código de identificação do plano para o comércio. |
| /rest/v4.9/plans/{planCode} | `DELETE` | Eliminar todo un plan para suscripciones asociado al comercio.<br>`{planCode}`: Código de identificação do plano para o comércio. |

### Criação

{{< tabs tabTotal="2" tabID="1" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Insira aqui a descrição do plano.
parameters.put(PayU.PARAMETERS.PLAN_DESCRIPTION, "Basic Plan");
// Insira aqui o código de identificação do plano.
parameters.put(PayU.PARAMETERS.PLAN_CODE, "ASd456" + System.currentTimeMillis());
// Insira aqui o intervalo do plano.
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL, "MONTH");
// Insira aqui a quantidade de intervalos.
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL_COUNT, "12");
// Insira aqui a moeda do plano
parameters.put(PayU.PARAMETERS.PLAN_CURRENCY, "COP");
// Insira aqui o valor do plano
parameters.put(PayU.PARAMETERS.PLAN_VALUE, "50000");
//(OPCIONAL) Insira aqui o valor do imposto.
parameters.put(PayU.PARAMETERS.PLAN_TAX, "10000");
//(OPCIONAL) Insira aqui a base de devolução do imposto.
parameters.put(PayU.PARAMETERS.PLAN_TAX_RETURN_BASE, "40000");
// Insira aqui a conta ID do plano
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "2");
// Insira aqui o intervalo das novas tentativas de cobrança.
parameters.put(PayU.PARAMETERS.PLAN_ATTEMPTS_DELAY, "2");
// Insira aqui a quantidade de cobranças que compõem o plano de pagamento
parameters.put(PayU.PARAMETERS.PLAN_MAX_PAYMENTS, "2");
SubscriptionPlan response = PayUPlans.create(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	// Insira aqui a descrição do plano.
	PayUParameters::PLAN_DESCRIPTION => "Sample Plan 001",
	// Insira aqui o código de identificação do plano.
	PayUParameters::PLAN_CODE => "sample-plan-code-001",
	// Insira aqui o intervalo do plano.
	//DAY||WEEK||MONTH||YEAR
	PayUParameters::PLAN_INTERVAL => "MONTH",
	// Insira aqui a quantidade de intervalos.
	PayUParameters::PLAN_INTERVAL_COUNT => "1",
	// Insira aqui a moeda do plano
	PayUParameters::PLAN_CURRENCY => "COP",
	// Insira aqui o valor do plano
	PayUParameters::PLAN_VALUE => "10000",
	//(OPCIONAL) Insira aqui o valor do imposto.
	PayUParameters::PLAN_TAX => "1600",
	//(OPCIONAL) Insira aqui a base de devolução do imposto.
	PayUParameters::PLAN_TAX_RETURN_BASE => "8400",
	// Insira aqui a conta ID do plano
	PayUParameters::ACCOUNT_ID => "512321",
	// Insira aqui o intervalo das novas tentativas de cobrança.
	PayUParameters::PLAN_ATTEMPTS_DELAY => "1",
	// Insira aqui a quantidade de cobranças que compõem o plano de pagamento
	PayUParameters::PLAN_MAX_PAYMENTS => "12",
	// Insira aqui a quantidade total de novas tentativas quando um pagamento tem sido rejeitado.
	PayUParameters::PLAN_MAX_PAYMENT_ATTEMPTS => "3",
	// Insira aqui o número máximo de pagamentos pendentes que uma assinatura pode ter antes de ser cancelada.
	PayUParameters::PLAN_MAX_PENDING_PAYMENTS => "1",
	// Insira aqui a quantidade de dias de teste da assinatura.
	PayUParameters::TRIAL_DAYS => "30",
);

$response = PayUSubscriptionPlans::create($parameters);
if($response){
	$response->id;
}
```
{{< /tab >}}
{{< /tabs >}}

### Atualização

{{< tabs tabTotal="2" tabID="2" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Insira aqui a nova descrição para o plano.
parameters.put(PayU.PARAMETERS.PLAN_DESCRIPTION, "New Basic Plan");
// Insira aqui o código do plano (deve ser um código já existente)
parameters.put(PayU.PARAMETERS.PLAN_CODE, "ASd4561379351327982");
// Insira aqui a moeda do plano (deve ser a mesma do plano original)
parameters.put(PayU.PARAMETERS.PLAN_CURRENCY, "COP");
// Insira aqui o novo valor do plano.
parameters.put(PayU.PARAMETERS.PLAN_VALUE, "100000");
// (OPCIONAL) Insira aqui o valor do imposto.
parameters.put(PayU.PARAMETERS.PLAN_TAX, "10000");
// (OPCIONAL) Insira aqui a base de devolução imposto.
parameters.put(PayU.PARAMETERS.PLAN_TAX_RETURN_BASE, "40000");
// Insira aqui a quantidade de tentativas.
parameters.put(PayU.PARAMETERS.PLAN_ATTEMPTS_DELAY, "3");
SubscriptionPlan response;
response = PayUPlans.update(parameters);
```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	// Insira aqui a nova descrição para o plano.
	PayUParameters::PLAN_DESCRIPTION => "New Sample Plan 001",
	// Insira aqui o código do plano (deve ser um código já existente)
	PayUParameters::PLAN_CODE => "sample-plan-code-001",
	// Insira aqui a moeda do plano (deve ser a mesma do plano original)
	PayUParameters::PLAN_CURRENCY => "COP",
	// Insira aqui o novo valor do plano.
	PayUParameters::PLAN_VALUE => "10000",
	// (OPCIONAL) Insira aqui o valor do imposto.
	PayUParameters::PLAN_TAX => "0",
	// (OPCIONAL) Insira aqui a base de devolução imposto.
	PayUParameters::PLAN_TAX_RETURN_BASE => "0",
	// Insira aqui a quantidade de tentativas.
	PayUParameters::PLAN_ATTEMPTS_DELAY => "1",
	// Insira aqui a quantidade total de novas tentativas quando um pagamento tem sido rejeitado.
	PayUParameters::PLAN_MAX_PAYMENT_ATTEMPTS => "3",
	// Insira aqui o número máximo de pagamentos pendentes que uma assinatura pode ter antes de ser cancelada.
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

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Insira aqui o código de identificação do plano.
parameters.put(PayU.PARAMETERS.PLAN_CODE, "ASd4561379351327982");
SubscriptionPlan response = PayUPlans.find(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	// Insira aqui o código de identificação do plano.
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

### Exclusão

{{< tabs tabTotal="2" tabID="4" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Insira aqui o código de identificação do plano.
parameters.put(PayU.PARAMETERS.PLAN_CODE, "ASd4561379351327982");
boolean response = PayUPlans.delete(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	// Insira aqui o código de identificação do plano.
	PayUParameters::PLAN_CODE => "sample-plan-code-001",
);

$response = PayUSubscriptionPlans::delete($parameters);
if($response) {
}
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

{{< tabs tabTotal="2" tabID="5" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Insira o nome do cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_NAME, "Oscar");
// Insira aqui o email do cliente.
parameters.put(PayU.PARAMETERS.CUSTOMER_EMAIL, "oscar.romero@payulatam.com");
// Operação criar cliente.
Customer response = PayUCustomers.create(parameters);
```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	// Insira o nome do cliente
	PayUParameters::CUSTOMER_NAME => "Pedro Perez",
	// Insira aqui o email do cliente.
	PayUParameters::CUSTOMER_EMAIL => "pperez@payulatam.com"
);

$response = PayUCustomers::create($parameters);

if($response) {
	$response->id;
}
```
{{< /tab >}}
{{< /tabs >}}

### Atualização

{{< tabs tabTotal="2" tabID="6" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Insira o ID do cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "f543exh3zh5o");
// Insira o nome do cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_NAME, "Oscar");
// Insira aqui o email do cliente.
parameters.put(PayU.PARAMETERS.CUSTOMER_EMAIL, "oscarromero@payulatam.com");
// Operação atualizar cliente.
Customer response = PayUCustomers.update(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	// Insira o ID do cliente
	PayUParameters::CUSTOMER_ID => "24978c6l3e",
	// Insira o nome do cliente
	PayUParameters::CUSTOMER_NAME => "Pedro Perez",
	// Insira aqui o email do cliente.
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

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Insira aqui o ID do cliente.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "17ylzjz6bxz");
Customer response = PayUCustomers.find(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	// Insira o nome do cliente
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

### Exclusão

{{< tabs tabTotal="2" tabID="8" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Insira aqui o ID do cliente.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "17ylzjz6bxz");
boolean response = PayUCustomers.delete(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	// Insira aqui o ID do cliente.
	PayUParameters::CUSTOMER_ID => "24978c6l3e"
);

$response = PayUCustomers::delete($parameters);

if($response){

}
```
{{< /tab >}}
{{< /tabs >}}

## 3. Cartão de crédito
É a forma de pago com a qual um Plano se relaciona a um Pagador, é composto pelo número de cartão de crédito (o qual será tokenizado para armazenar os dados de forma segura), a data de vencimento do cartão e alguns dados adicionais de endereço.  

As seguintes operações estão disponíveis:  
<div class="variables"></div>

| URL | Método | Descrição |
|---|---|---|
| /rest/v4.9/customers/{customerID}/creditCards | `POST` | Criação de um cartão de crédito (Token) e associá-lo a um usuário.<br>{customerId} : Identificador do cliente ao qual será associado o token |
| /rest/v4.9/creditCards/{creditCardId} | `PUT` | Atualizar a informação de um token.<br>`{creditCardId}`: Identificador do token que se deseja atualizar. |
| /rest/v4.9/creditCards/{creditCardId} | `GET` | Consultar a informação de um cartão de crédito (Token) dado seu identificador.<br>`{creditCardId}`: Token do cartão de crédito que deseja consultar. |
| /rest/v4.9/customers/{customerID}/creditCards/{creditCardId} | `DELETE` | Apagar um cartão de crédito (Token) associado a um usuário.<br>{customerId} : Identificador do cliente do qual será apagado o token.<br>`{creditCardId}`: Identificador do token que se deseja apagar. |

### Criação

{{< tabs tabTotal="2" tabID="9" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Insira aqui o ID do cliente.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "180oklk4o56");
// Coloque aqui o número do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4005580000029205");
// Coloque aqui a data de vencimento do cartão de crédito.
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2015/01");
//Coloque aqui o tipo do cartão de crédito.
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");
// Coloque aqui o nome do pagador.
parameters.put(PayU.PARAMETERS.PAYER_NAME, "Nombre");
// Insira aqui o documento de identificação do pagador
parameters.put(PayU.PARAMETERS.CREDIT_CARD_DOCUMENT, "1020304050");
// -- Os seguintes parâmetros são opcionais. --
// Insira aqui a primeira parte do endereço.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Calle falsa");
// Insira aqui a segunda parte do endereço (opcional).
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "123");
// Insira aqui a terceira parte do endereço (opcional).
parameters.put(PayU.PARAMETERS.PAYER_STREET_3, "patio trasero");
// Insira aqui o nome da cidade.
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Bogotá");
// Insira aqui o nome do estado.
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Bogotá D.C.");
// Insira aqui o nome do pais.
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, PaymentCountry.CO.name());
// Insira aqui o código postal.
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "00000");
// Insira aqui o número do telefone.
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "300300300");
PaymentPlanCreditCard response = PayUCreditCard.create(parameters);
LoggerUtil.info("{0}", response);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	// Insira aqui o ID do cliente.
	PayUParameters::CUSTOMER_ID => "6eb24tzp40",
	// Insira o nome do cliente
	PayUParameters::PAYER_NAME => "Pedro Perez",
	//Coloque aqui o número do cartão de crédito.
	PayUParameters::CREDIT_CARD_NUMBER => "4242424242424242",
	//Coloque aqui a data de vencimento do cartão de crédito em formato AAAA/MM
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2018/01",
	// Insira aqui o nome da franquia do cartão de credito.
	PayUParameters::PAYMENT_METHOD => "VISA",
        // Insira aqui o documento de identificação do pagador.
        PayUParameters::CREDIT_CARD_DOCUMENT => "1020304050",
	// Insira aqui o documento de identificação do pagador. (Opcional)
	PayUParameters::PAYER_DNI => "101010123",
	// Insira aqui a primeira parte do endereço.
	PayUParameters::PAYER_STREET => "Street 93B",
	// Insira aqui a segunda parte do endereço (opcional).
	PayUParameters::PAYER_STREET_2 => "17 25",
	// Insira aqui a terceira parte do endereço (opcional).
	PayUParameters::PAYER_STREET_3 => "Office 301",
	// Insira aqui o nome da cidade.
	PayUParameters::PAYER_CITY => "Bogotá",
	// Insira aqui o nome do estado.
	PayUParameters::PAYER_STATE => "Bogotá D.C.",
	// Insira aqui o nome do pais.
	PayUParameters::PAYER_COUNTRY => "CO",
	// Insira aqui o código postal.
	PayUParameters::PAYER_POSTAL_CODE => "00000",
	// Insira aqui o número do telefone.
	PayUParameters::PAYER_PHONE => "300300300"
);

$response = PayUCreditCards::create($parameters);

if($response){
	$response->token;
}
```
{{< /tab >}}
{{< /tabs >}}

### Atualização

{{< tabs tabTotal="2" tabID="10" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Insira aqui o ID do token do cartão de credito.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "180oklk4o56");
//Coloque aqui a data de vencimento do cartão de crédito.
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2015/01");
//Coloque aqui o nome do pagador
parameters.put(PayU.PARAMETERS.PAYER_NAME, "Nombre");
// Insira aqui o documento de identificação do pagador
parameters.put(PayU.PARAMETERS.CREDIT_CARD_DOCUMENT, "1020304050");
// -- Os seguintes parâmetros são opcionais. --
// Insira aqui a primeira parte do endereço.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Calle 5476");
// Insira aqui a segunda parte do endereço (opcional).
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "123");
// Insira aqui a terceira parte do endereço (opcional).
parameters.put(PayU.PARAMETERS.PAYER_STREET_3, "patio trasero");
// Insira aqui o nome da cidade.
parameters.put(PayU.PARAMETERS.PAYER_CITY, "Bogotá");
// Insira aqui o nome do estado.
parameters.put(PayU.PARAMETERS.PAYER_STATE, "Bogotá D.C.");
// Insira aqui o nome do pais.
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, PaymentCountry.CO.name());
// Insira aqui o código postal.
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "00000");
// Insira aqui o número do telefone.
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "300300300");
PaymentPlanCreditCard response = PayUCreditCard.update(parameters);
LoggerUtil.info("{0}", response);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	// Insira aqui o ID do token do cartão de credito.
	PayUParameters::TOKEN_ID => "6f5f32d9-9c6f-4d57-97d7-68cde86f9266",
	// Insira aqui o nome do cliente.
	PayUParameters::PAYER_NAME => "Pedro Perez",
	//Coloque aqui a data de vencimento do cartão de crédito em formato AAAA/MM
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2018/01",
        // Insira aqui o documento de identificação do pagador.
        PayUParameters::CREDIT_CARD_DOCUMENT => "1020304050",
	// (OPCIONAL) Coloque aqui o documento de identificação do pagador
	PayUParameters::PAYER_DNI => "101010123",
	// (OPCIONAL) Insira aqui a primeira parte do endereço.
	PayUParameters::PAYER_STREET => "Street 93B",
	// (OPCIONAL) Insira aqui a segunda parte do endereço
	PayUParameters::PAYER_STREET_2 => "17 25",
	// (OPCIONAL) Insira aqui a terceira parte do endereço
	PayUParameters::PAYER_STREET_3 => "Office 301",
	// (OPCIONAL) Insira aqui o nome da cidade.
	PayUParameters::PAYER_CITY => "Bogotá",
	// (OPCIONAL) Insira aqui o nome do estado
	PayUParameters::PAYER_STATE => "Bogotá D.C.",
	// (OPCIONAL) Insira aqui o códig do pais.
	PayUParameters::PAYER_COUNTRY => "CO",
	// (OPCIONAL) Insira aqui o código postal
	PayUParameters::PAYER_POSTAL_CODE => "00000",
	// (OPCIONAL) Insira aqui o número do telefone.
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

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Insira aqui o ID do token do cartão de credito.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "25181bb1-b07f-4b9b-ae5d-6b13436c706d");
PaymentPlanCreditCard response = PayUCreditCard.find(parameters);
LoggerUtil.info("{0}", response);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	// Insira aqui o ID do token do cartão de credito.
	PayUParameters::TOKEN_ID => "6f5f32d9-9c6f-4d57-97d7-68cde86f9266"
);

$response = PayUCreditCards::find($parameters);

if($response){
	$response->token;
	$response->number;
	$response->type;
	$response->name;
        $responde->document;
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

### Exclusão

{{< tabs tabTotal="2" tabID="12" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Insira aqui o ID do token do cartão de credito.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "25181bb1-b07f-4b9b-ae5d-6b13436c706d");
// Ingresa aquí el Id del cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "17ylzjz6bxz");
boolean response = PayUCreditCard.delete(parameters);
LoggerUtil.info("{0}", response);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	// Insira aqui o ID do token do cartão de credito.
	PayUParameters::TOKEN_ID => "6f5f32d9-9c6f-4d57-97d7-68cde86f9266",
	// Insira aqui o ID do cliente.
	PayUParameters::CUSTOMER_ID => "6eb24tzp40"
);

$response = PayUCreditCards::delete($parameters);

if($response){

}
```
{{< /tab >}}
{{< /tabs >}}

## 4. Assinatura
Uma assinatura é a relação entre um plano de pagamentos, um pagador e um cartão de crédito e é o elemento com o qual se controla a execução das cobranças correspondentes.  

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

{{< tabs tabTotal="2" tabID="13" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
//Coloque aqui o número de parcelas.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Insira aqui a quantidade de dias de teste da assinatura
parameters.put(PayU.PARAMETERS.TRIAL_DAYS, "10");

// -- Parámetros do cliente --
// Insira o nome do cliente
parameters.put(PayU.PARAMETERS.CUSTOMER_NAME, "Pedro Perez");
// Insira aqui o email do cliente.
parameters.put(PayU.PARAMETERS.CUSTOMER_EMAIL, "pperezz@payulatam.com");

// -- Parámetros do cartão de crédito  --
//Coloque aqui o nome do pagador
parameters.put(PayU.PARAMETERS.PAYER_NAME, "Sample User Name");
//Coloque aqui o número do cartão de crédito.
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4242424242424242");
//Coloque aqui a data de vencimento do cartão de crédito em formato AAAA/MM
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2018/01");
// Insira aqui o nome da franquia do cartão de credito.
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");
// Insira aqui o documento de identificação do pagador
parameters.put(PayU.PARAMETERS.CREDIT_CARD_DOCUMENT, "1020304050");
// (OPCIONAL) Coloque aqui o documento de identificação do pagador
parameters.put(PayU.PARAMETERS.PAYER_DNI, "1020304050");
// (OPCIONAL) Insira aqui a primeira parte do endereço.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Address Name");
// (OPCIONAL) Insira aqui a segunda parte do endereço
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "17 25");
// (OPCIONAL) Insira aqui a terceira parte do endereço
parameters.put(PayU.PARAMETERS.PAYER_STREET_3, "Of 301");
// (OPCIONAL) Insira aqui o nome da cidade.
parameters.put(PayU.PARAMETERS.PAYER_CITY, "City Name");
// (OPCIONAL) Insira aqui o nome do estado.
parameters.put(PayU.PARAMETERS.PAYER_STATE, "State Name");
// (OPCIONAL) Insira aqui o código do pais.
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CO");
// (OPCIONAL) Insira aqui o código postal.
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "00000");
// (OPCIONAL) Insira aqui o número do telefone.
parameters.put(PayU.PARAMETERS.PAYER_PHONE, "300300300");

// --  Parâmetros do plano --
// Insira aqui a descrição do plano.
parameters.put(PayU.PARAMETERS.PLAN_DESCRIPTION, "Sample Plan 001");
// Insira aqui o código de identificação do plano
parameters.put(PayU.PARAMETERS.PLAN_CODE, "sample-plan-code-001");
// Insira aqui o intervalo do plano.
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL, "MONTH");
// Insira aqui a quantidade de intervalos.
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL_COUNT, "1");
// Insira aqui a moeda do plano
parameters.put(PayU.PARAMETERS.PLAN_CURRENCY, "COP");
// Insira aqui o valor do plano
parameters.put(PayU.PARAMETERS.PLAN_VALUE, "10000");
//(OPCIONAL) Insira aqui o valor do imposto
parameters.put(PayU.PARAMETERS.PLAN_TAX, "1600");
//(OPCIONAL) Insira aqui a base de devolução do imposto.
parameters.put(PayU.PARAMETERS.PLAN_TAX_RETURN_BASE, "8400");
// Insira aqui a conta ID do plano
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512321");
// Insira aqui o intervalo das novas tentativas de cobrança.
parameters.put(PayU.PARAMETERS.PLAN_ATTEMPTS_DELAY, "1");
// Insira aqui a quantidade de cobranças que compõem o plano de pagamento.
parameters.put(PayU.PARAMETERS.PLAN_MAX_PAYMENTS, "12");
// Insira aqui a quantidade total de novas tentativas quando um pagamento tem sido rejeitado.
parameters.put(PayU.PARAMETERS.PLAN_MAX_PAYMENT_ATTEMPTS, "3");
// Insira aqui o número máximo de pagamentos pendentes que uma assinatura pode ter antes de ser cancelada.
parameters.put(PayU.PARAMETERS.PLAN_MAX_PENDING_PAYMENTS, "1");
// Insira aqui a quantidade de dias de teste da assinatura.
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

Exemplo pedido:
```PHP
$parameters = array(
	// Coloque aqui o número de parcelas.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Insira aqui a quantidade de dias de teste.
	PayUParameters::TRIAL_DAYS => "10",

	// --  Parâmetros do cliente --
	// Insira o nome do cliente.
	PayUParameters::CUSTOMER_NAME => "Pedro Perez",
	// Insira aqui o email do cliente.
	PayUParameters::CUSTOMER_EMAIL => "pperezz@payulatam.com",

	// --  Parâmetros do cartão de credito --
	//Coloque aqui o nome do pagador.
	PayUParameters::PAYER_NAME => "Sample User Name",
	//Coloque aqui o número do cartão de crédito.
	PayUParameters::CREDIT_CARD_NUMBER => "4242424242424242",
	//Coloque aqui a data de vencimento do cartão de crédito em formato AAAA/MM
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2014/12",
	// Insira aqui o nome da franquia do cartão de credito.
	PayUParameters::PAYMENT_METHOD => "VISA",
        // Insira aqui o documento de identificação do pagador.
        PayUParameters::CREDIT_CARD_DOCUMENT => "1020304050",
	// (OPCIONAL) Coloque aqui o documento de identificação do pagador
	PayUParameters::PAYER_DNI => "1020304050",
	// (OPCIONAL) Insira aqui a primeira parte do endereço.
	PayUParameters::PAYER_STREET => "Address Name",
	// (OPCIONAL) Insira aqui a segunda parte do endereço
	PayUParameters::PAYER_STREET_2 => "17 25",
	// (OPCIONAL) Insira aqui a terceira parte do endereço
	PayUParameters::PAYER_STREET_3 => "Of 301",
	// (OPCIONAL) Insira aqui o nome da cidade.
	PayUParameters::PAYER_CITY => "City Name",
	// (OPCIONAL) Insira aqui o nome do estado.
	PayUParameters::PAYER_STATE => "State Name",
	// (OPCIONAL) Insira aqui o codigo do pais.
	PayUParameters::PAYER_COUNTRY => "CO",
	// (OPCIONAL) Insira aqui o documento de identificação do pagador.
	PayUParameters::PAYER_POSTAL_CODE => "00000",
	// (OPCIONAL) Insira aqui o número do telefone.
	PayUParameters::PAYER_PHONE => "300300300",

	// --  Parâmetros do plano --
	// Insira aqui a descrição do plano
	PayUParameters::PLAN_DESCRIPTION => "Sample Plan 001",
	// Insira aqui o código de identificação do plano.
	PayUParameters::PLAN_CODE => "sample-plan-code-001",
	// Insira aqui o intervalo do plano.
	PayUParameters::PLAN_INTERVAL => "MONTH",
	// Insira aqui a quantidade de intervalos.
	PayUParameters::PLAN_INTERVAL_COUNT => "1",
	// Insira aqui a moeda do plano
	PayUParameters::PLAN_CURRENCY => "COP",
	// Insira aqui o valor do plano
	PayUParameters::PLAN_VALUE => "10000",
	//(OPCIONAL) Insira aqui o valor do imposto
	PayUParameters::PLAN_TAX => "1600",
	//(OPCIONAL) Insira aqui a base de devolução do imposto.
	PayUParameters::PLAN_TAX_RETURN_BASE => "8400",
	// Insira aqui a conta ID do plano
	PayUParameters::ACCOUNT_ID => "512321",
	// Insira aqui o intervalo das novas tentativas de cobrança.
	PayUParameters::PLAN_ATTEMPTS_DELAY => "1",
	// Insira aqui a quantidade de cobranças que compõem o plano de pagamento.
	PayUParameters::PLAN_MAX_PAYMENTS => "12",
	// Insira aqui a quantidade total de novas tentativas quando um pagamento tem sido rejeitado.
	PayUParameters::PLAN_MAX_PAYMENT_ATTEMPTS => "3",
	// Insira aqui o número máximo de pagamentos pendentes que uma assinatura pode ter antes de ser cancelada.
	PayUParameters::PLAN_MAX_PENDING_PAYMENTS => "1",
	// Insira aqui a quantidade de dias de teste da assinatura.
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
<summary>Com todos os elementos existentes</summary>
<br>

{{< tabs tabTotal="2" tabID="14" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Insira o código do plano pela assinatura.
parameters.put(PayU.PARAMETERS.PLAN_CODE, "sample-plan-code-001");
// Insira aqui o ID do cliente.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "eab38z33hh2");
// Insira aqui o ID do token do cartão de credito
parameters.put(PayU.PARAMETERS.TOKEN_ID, "a068e980-a6d7-4a19-b549-75c04f39ec22");
// Insira aqui a quantidade de dias de teste da assinatura.
parameters.put(PayU.PARAMETERS.TRIAL_DAYS, "10");
//Coloque aqui o número de parcelas.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
Subscription response = PayUSubscription.create(parameters);

if(response!=null){
	response.getId();

}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	// Insira o código do plano pela assinatura.
	PayUParameters::PLAN_CODE => "sample-plan-code-001s",
	// Insira aqui o ID do pagador.
	PayUParameters::CUSTOMER_ID => "f03612gyte",
	// Insira aqui o ID do token do cartão de credito.
	PayUParameters::TOKEN_ID => "79490437-d64a-4dc6-baeb-8d52492b0a00",
	// Insira aqui a quantidade de dias de teste da assinatura.
	PayUParameters::TRIAL_DAYS => "10",
	//Coloque aqui o número de parcelas.
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
<summary>Plano e cliente já criados, e um cartão novo</summary>
<br>

{{< tabs tabTotal="2" tabID="15" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Insira aqui a quantidade de dias de teste da assinatura.
parameters.put(PayU.PARAMETERS.TRIAL_DAYS, "10");
//Coloque aqui o número de parcelas.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");

// Insira o código do plano pela assinatura.
parameters.put(PayU.PARAMETERS.PLAN_CODE, "sample-plan-code-001");
//Coloque aqui o ID do pagador.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "eab38z33hh2");

// --  Parâmetros de cartão de crédito --
//Coloque aqui o nome do pagador
parameters.put(PayU.PARAMETERS.PAYER_NAME, "Sample User Name");
//Coloque aqui o número do cartão de crédito
parameters.put(PayU.PARAMETERS.CREDIT_CARD_NUMBER, "4242424242424242");
// Coloque aqui a data de vencimento do cartão de crédito em formato AAAA/MM
parameters.put(PayU.PARAMETERS.CREDIT_CARD_EXPIRATION_DATE, "2018/01");
// Insira aqui o nome da franquia do cartão de credito.
parameters.put(PayU.PARAMETERS.PAYMENT_METHOD, "VISA");
// Insira aqui o documento de identificação do pagador
parameters.put(PayU.PARAMETERS.CREDIT_CARD_DOCUMENT, "1020304050");
// (OPCIONAL) Coloque aqui o documento de identificação do pagador
parameters.put(PayU.PARAMETERS.PAYER_DNI, "1020304050");
// (OPCIONAL) Insira aqui a primeira parte do endereço.
parameters.put(PayU.PARAMETERS.PAYER_STREET, "Address Name");
// (OPCIONAL) Insira aqui a segunda parte do endereço.
parameters.put(PayU.PARAMETERS.PAYER_STREET_2, "17 25");
// (OPCIONAL) Insira aqui a terceira parte do endereço.
parameters.put(PayU.PARAMETERS.PAYER_STREET_3, "Of 301");
// (OPCIONAL) Insira aqui o nome da cidade.
parameters.put(PayU.PARAMETERS.PAYER_CITY, "City Name");
// (OPCIONAL) Insira aqui o nome do estado.
parameters.put(PayU.PARAMETERS.PAYER_STATE, "State Name");
// (OPCIONAL) Insira o código do pais do endereço
parameters.put(PayU.PARAMETERS.PAYER_COUNTRY, "CO");
// (OPCIONAL) IInsira aqui o código postal.
parameters.put(PayU.PARAMETERS.PAYER_POSTAL_CODE, "00000");
// (OPCIONAL) Insira aqui o número do telefone.
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

Exemplo pedido:
```PHP
$parameters = array(
	//Coloque aqui o número de parcelas.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Insira aqui a quantidade de dias de teste
	PayUParameters::TRIAL_DAYS => "10",

	// --  Parâmetros do cliente --
	//Coloque aqui o ID do pagador.
	PayUParameters::CUSTOMER_ID => "f03612gyte",

	// --  Parâmetros de cartão de crédito --
	//Coloque aqui o nome do pagador.
	PayUParameters::PAYER_NAME => "Sample User Name",
	//Coloque aqui o número do cartão de crédito
	PayUParameters::CREDIT_CARD_NUMBER => "4242424242424242",
	//Coloque aqui a data de vencimento do cartão de crédito em formato AAAA/MM
	PayUParameters::CREDIT_CARD_EXPIRATION_DATE => "2014/12",
	// Insira aqui o nome da franquia do cartão de credito.
	PayUParameters::PAYMENT_METHOD => "VISA",
        // Insira aqui o documento de identificação do pagador.
        PayUParameters::CREDIT_CARD_DOCUMENT => "1020304050",
	// (OPCIONAL) Coloque aqui o documento de identificação do pagador
	PayUParameters::PAYER_DNI => "1020304050",
	// (OPCIONAL) Insira aqui a primeira parte do endereço.
	PayUParameters::PAYER_STREET => "Address Name",
	// (OPCIONAL) Insira aqui a segunda parte do endereço
	PayUParameters::PAYER_STREET_2 => "17 25",
	// (OPCIONAL) Insira aqui a terceira parte do endereço
	PayUParameters::PAYER_STREET_3 => "Of 301",
	// (OPCIONAL) Insira aqui o nome da cidade.
	PayUParameters::PAYER_CITY => "City Name",
	// (OPCIONAL) Insira aqui o nome do estado.
	PayUParameters::PAYER_STATE => "State Name",
	// (OPCIONAL) Insira aqui o nome do pais.
	PayUParameters::PAYER_COUNTRY => "CO",
	// (OPCIONAL) Insira aqui o código postal.
	PayUParameters::PAYER_POSTAL_CODE => "00000",
	// (OPCIONAL) Insira aqui o número do telefone.
	PayUParameters::PAYER_PHONE => "300300300",

	// --  Parâmetros do plano --
	// Insira o código do plano pela assinatura.
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
<summary>Cliente e cartão já criados, e com plano novo</summary>
<br>

{{< tabs tabTotal="2" tabID="16" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
//Coloque aqui o número de parcelas.
parameters.put(PayU.PARAMETERS.INSTALLMENTS_NUMBER, "1");
// Insira aqui a quantidade de dias de teste da assinatura.
parameters.put(PayU.PARAMETERS.TRIAL_DAYS, "10");

//Coloque aqui o ID do pagador.
parameters.put(PayU.PARAMETERS.CUSTOMER_ID, "eab38z33hh2");
// Insira aqui o ID do token do cartão de credito.
parameters.put(PayU.PARAMETERS.TOKEN_ID, "a068e980-a6d7-4a19-b549-75c04f39ec22");

// --  Parâmetros do plano --
// Insira aqui a descrição do plano.
parameters.put(PayU.PARAMETERS.PLAN_DESCRIPTION, "Sample Plan 001");
// Insira aqui o código de identificação do plano.
parameters.put(PayU.PARAMETERS.PLAN_CODE, "sample-plan-code-001");
// Insira aqui o intervalo do plano.
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL, "MONTH");
// Insira aqui a quantidade de intervalos.
parameters.put(PayU.PARAMETERS.PLAN_INTERVAL_COUNT, "1");
// Insira aqui a moeda do plano
parameters.put(PayU.PARAMETERS.PLAN_CURRENCY, "COP");
// Insira aqui o valor do plano
parameters.put(PayU.PARAMETERS.PLAN_VALUE, "10000");
//(OPCIONAL) Insira aqui o valor do imposto
parameters.put(PayU.PARAMETERS.PLAN_TAX, "1600");
//(OPCIONAL) Insira aqui a base de devolução do imposto.
parameters.put(PayU.PARAMETERS.PLAN_TAX_RETURN_BASE, "8400");
// Insira aqui a conta ID do plano
parameters.put(PayU.PARAMETERS.ACCOUNT_ID, "512321");
// Insira aqui o intervalo das tentativas de cobrança.
parameters.put(PayU.PARAMETERS.PLAN_ATTEMPTS_DELAY, "1");
// Insira aqui a quantidade de cobranças que compõem o plano de pagamento.
parameters.put(PayU.PARAMETERS.PLAN_MAX_PAYMENTS, "12");
// Insira aqui a quantidade total de novas tentativas quando um pagamento tem sido rejeitado.
parameters.put(PayU.PARAMETERS.PLAN_MAX_PAYMENT_ATTEMPTS, "3");
// Insira aqui o número máximo de pagamentos pendentes que uma assinatura pode ter antes de ser cancelada.
parameters.put(PayU.PARAMETERS.PLAN_MAX_PENDING_PAYMENTS, "1");
// Insira aqui a quantidade de dias de teste da assinatura.
parameters.put(PayU.PARAMETERS.TRIAL_DAYS, "30");

Subscription response = PayUSubscription.create(parameters);

if(response!=null){
	response.getId();
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	//Coloque aqui o número de parcelas.
	PayUParameters::INSTALLMENTS_NUMBER => "1",
	// Insira aqui a quantidade de dias de teste da assinatura.
	PayUParameters::TRIAL_DAYS => "10",

	// -- Parâmetros do cartão de credito --
	//Coloque aqui o ID do pagador.
	PayUParameters::CUSTOMER_ID => "5131879lzbx",
	// Insira aqui o ID do token do cartão de credito.
	PayUParameters::TOKEN_ID => "158e5bed-1e76-4bb2-83c2-97dc9bb1522d",

	// -- Parâmetros do plano --
	// Insira aqui a descrição do plano.
	PayUParameters::PLAN_DESCRIPTION => "Sample Plan 001",
	// Insira aqui o código de identificação do plano.
	PayUParameters::PLAN_CODE => "sample-plan-code-001",
	// Insira aqui o intervalo do plano.
	PayUParameters::PLAN_INTERVAL => "MONTH",
	// Insira aqui a quantidade de intervalos.
	PayUParameters::PLAN_INTERVAL_COUNT => "1",
	// Insira aqui a moeda do plano
	PayUParameters::PLAN_CURRENCY => "COP",
	// Insira aqui o valor do plano
	PayUParameters::PLAN_VALUE => "10000",
	//(OPCIONAL) Insira aqui o valor do imposto
	PayUParameters::PLAN_TAX => "1600",
	//(OPCIONAL) Insira aqui a base de devolução do imposto.
	PayUParameters::PLAN_TAX_RETURN_BASE => "8400",
	// Ingresa aquí la cuenta Id del plan
	PayUParameters::ACCOUNT_ID => "512321",
	// Insira aqui o intervalo das tentativas de cobrança.
	PayUParameters::PLAN_ATTEMPTS_DELAY => "1",
	// Insira aqui a quantidade de cobranças que compõem o plano de pagamento.
	PayUParameters::PLAN_MAX_PAYMENTS => "12",
	// Insira aqui a quantidade total de novas tentativas quando um pagamento tem sido rejeitado.
	PayUParameters::PLAN_MAX_PAYMENT_ATTEMPTS => "3",
	// Insira aqui o número máximo de pagamentos pendentes que uma assinatura pode ter antes de ser cancelada.
	PayUParameters::PLAN_MAX_PENDING_PAYMENTS => "1",
	// Insira aqui a quantidade de dias de teste da assinatura.
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

### Atualização (Cartão de credito de uma assinatura)

{{< tabs tabTotal="1" tabID="17" tabName1="SDK Java">}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();

// Insira o ID da assinatura.
parameters.put(PayU.PARAMETERS.SUBSCRIPTION_ID, "320756yk1x0");
// Insira aqui o ID do token do cartão de credito.
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

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Insira o ID da assinatura.
parameters.put(PayU.PARAMETERS.SUBSCRIPTION_ID, "320756yk1x0");

Subscription response = PayUSubscription.find(parameters);

if(response!=null){
	response.getCreditCardToken();
	response.getCustomer();
}
```

{{< /tab >}}
{{< /tabs >}}

### Exclusão

{{< tabs tabTotal="2" tabID="19" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Insira o ID da assinatura.
parameters.put(PayU.PARAMETERS.SUBSCRIPTION_ID, "123");
boolean response = PayUSubscription.cancel(parameters);
LoggerUtil.info("{0}", response);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	// Insira o ID da assinatura.
	PayUParameters::SUBSCRIPTION_ID => "03e481u9l13",
);

$response = PayUSubscriptions::cancel($parameters);

if($response){
}
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
| /rest/v4.9/recurringBillItems/ | `GET` | Consulta dos encargos extras das faturas do comércio que cumprem com os filtros estipulados. Os filtros disponíveis são mostrados a seguir e devem ser enviados como named parameters dentro do URL:<br>`{subscriptionId}`: Identificação da assinatura.<br>`{description}`: Descrição inserida no encargo extra. |

### Criação
{{< tabs tabTotal="2" tabID="20" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// Descrição da taxa extra.
parameters.put(PayU.PARAMETERS.DESCRIPTION, "Cargo extra de prueba");
// Valor da taxa extra.
parameters.put(PayU.PARAMETERS.ITEM_VALUE, "20000");
// Moeda da taxa extra.
parameters.put(PayU.PARAMETERS.CURRENCY, "COP");
// Identificador da assinatura.
parameters.put(PayU.PARAMETERS.SUBSCRIPTION_ID, "52b04sx2s6");
// Impostos – Opcional
parameters.put(PayU.PARAMETERS.ITEM_TAX, "0");
// Base de devolução – Opcional
parameters.put(PayU.PARAMETERS.ITEM_TAX_RETURN_BASE, "0");
RecurringBillItem response = PayURecurringBillItem.create(parameters);

if(response!=null){
	response.getId();
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	// Descrição da taxa extra.
	PayUParameters::DESCRIPTION => "Cargo extra de prueba",
	// Valor da taxa extra.
	PayUParameters::ITEM_VALUE => "20000",
	// Moeda da taxa extra.
	PayUParameters::CURRENCY => "COP",
	/// Identificador da assinatura.
	PayUParameters::SUBSCRIPTION_ID => "a9d01imeihk",
	// Impostos – Opcional
	PayUParameters::ITEM_TAX => "0",
	// Base de devolução – Opcional
	PayUParameters::ITEM_TAX_RETURN_BASE => "0",
);

$response = PayURecurringBillItem::create($parameters);

if($response){
	$response->id;
}
```
{{< /tab >}}
{{< /tabs >}}

### Atualização
{{< tabs tabTotal="2" tabID="21" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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

Exemplo pedido:
```PHP
$parameters = array(
	// ID da taxa extra.
	PayUParameters::RECURRING_BILL_ITEM_ID => "cbb57ywul2l",
	// Descrição da taxa extra.
	PayUParameters::DESCRIPTION => "Cargo extra de prueba",
	// Valor da taxa extra.
	PayUParameters::ITEM_VALUE => "20000",
	// Moeda da taxa extra.
	PayUParameters::CURRENCY => "COP",
	// Impostos – Opcional
	PayUParameters::ITEM_TAX => "0",
	// Base de devolução – Opcional
	PayUParameters::ITEM_TAX_RETURN_BASE => "0",
);

$response = PayURecurringBillItem::update($parameters);

if($response){
}
```
{{< /tab >}}
{{< /tabs >}}

### Consulta (Por id da taxa adicional)

{{< tabs tabTotal="2" tabID="22" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();

// ID da taxa extra.
parameters.put(PayU.PARAMETERS.RECURRING_BILL_ITEM_ID, "5e174m7lgns");

RecurringBillItem response = PayURecurringBillItem.find(parameters);

if(response!=null){

}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	//Identificador da taxa extra.
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

### Exclusão

{{< tabs tabTotal="2" tabID="25" tabName1="SDK Java" tabName2="SDK PHP" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```Java
Map<String, String> parameters = new HashMap<String, String>();
// ID da taxa extra.
parameters.put(PayU.PARAMETERS.RECURRING_BILL_ITEM_ID, "15tolsvwz7l");
boolean response = PayURecurringBillItem.delete(parameters);
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```PHP
$parameters = array(
	// ID da taxa extra.
	PayUParameters::RECURRING_BILL_ITEM_ID => "228bdp236sy",
);

$response = PayURecurringBillItem::delete($parameters);

if($response){

}
```
{{< /tab >}}
{{< /tabs >}}