---
title: "URL de Resposta"
linkTitle: "URL de Resposta"
date: 2021-03-29T12:15:39-05:00
description: >
  A URL de resposta é usada para exibir o resultado da transação ao pagador. Embora essa URL seja opcional no fluxo da transação, ela melhora a experiência do pagador ao redirecioná-lo de volta ao seu site e concluir a jornada de pagamento. No entanto, lembre-se de que o pagador pode fechar o checkout antes de acessar a página de resultado.
weight: 20
tags: ["subtopic"]
---

Sua integração pode enviar os dados do resultado do pagamento por meio de uma solicitação HTTP GET, e sua plataforma pode acionar a URL de resposta para todos os status da transação, incluindo aprovado, rejeitado, em validação e pendente de pagamento (para transações em dinheiro).


## Observações {#considerations}

* Alguns provedores de hospedagem podem ter configurações que bloqueiam o envio de URLs como valores de parâmetros. Por exemplo: `&merchant_url=http%3A%2F%2Fwww.minhaloja.com`.
* Evite depender da URL de resposta para atualizar seu banco de dados ou acionar processos, pois os usuários podem não retornar a ela. Use a URL de confirmação para essas operações.
* Se você quiser exibir informações relacionadas à transação, recomendamos mostrar pelo menos os seguintes dados: status, referência, valor, moeda e data.
* É recomendável incluir o parâmetro `responseUrl` no formulário de pagamento ou defini-lo no Módulo PayU. O valor enviado no parâmetro tem prioridade. Se a integração não encontrar um `responseUrl`, o processo de pagamento termina no webcheckout.

{{% alert title="Importante" color="warning"%}}

Se você quiser que a PayU exiba sempre as informações da transação, deixe o parâmetro `responseUrl` em branco tanto no formulário de pagamento quanto no Painel de Administração da PayU. Nesse caso, a experiência de pagamento não mostrará ao comprador uma opção para retornar ao seu site.

{{% /alert %}}

## Parâmetros {#parameters}

Abaixo, os parâmetros enviados para a URL de resposta.

<details>

<summary>Parâmetros</summary>

<br>

<div class="variables"></div>

| Campo | Tipo | Tamanho | Descrição | Aplica-se a |
|-|-|-|-|:-:|
| `merchantId` | Numérico | 12 | Número de identificação do comerciante no sistema da PayU. Você encontra esse número no e-mail de criação da conta. | — |
| `transactionState` | Numérico | 2 | Indica o status da transação no sistema.<br>[Veja os estados da transação na coluna indicada]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| `risk` | Decimal (#.00) | — | Risco associado à transação. Valores entre 0 e 1.<br>Quanto maior o valor, maior o risco.<br>Formato `###.00`. | — |
| `polResponseCode` | Alfanumérico | 64 | Código de resposta.<br>[Veja os códigos de resposta na coluna indicada]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| `polTransactionState` | Numérico | 2 | Assume o valor de `polTransactionState`.<br>[Veja os códigos de resposta na coluna indicada]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| `referenceCode` | Alfanumérico | 255 | Referência da venda ou pedido. Deve ser única para cada transação enviada ao sistema. | — |
| `reference_pol` | Alfanumérico | 255 | Referência ou número da transação gerado pela PayU. | — |
| `signature` | Alfanumérico | 255 | Assinatura digital criada para cada transação. | — |
| `polPaymentMethod` | Alfanumérico | 255 | Identificador interno do método de pagamento utilizado. | — |
| `polPaymentMethodType` | Numérico | 2 | Tipo do método de pagamento utilizado.<br>[Veja os códigos dos métodos de pagamento]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). | — |
| `installmentsNumber` | Numérico | 2 | Número de parcelas em que o pagamento com cartão de crédito foi dividido. | — |
| `TX_VALUE` | Numérico | 14.2 | Valor total da transação. Pode conter até duas casas decimais. Exemplo: 10000.00 ou 10000. | — |
| `TX_TAX` | Numérico | 14.2 | Valor do IVA da transação. Se nenhum valor for enviado, o sistema aplica automaticamente 19%.<br>Pode conter duas casas decimais. Exemplo: 19000.00.<br>Caso não haja IVA, deve-se enviar 0. | — |
| `buyerEmail` | Alfanumérico | 255 | Campo que contém o e-mail do comprador para notificação do resultado da transação. É recomendável validá-lo quando os dados forem coletados em um formulário. | — |
| `processingDate` | Data (YYYY-MM-DD HH:mm:ss) | — | Data em que a transação foi realizada. | — |
| `currency` | Alfanumérico | 3 | Moeda em que o pagamento foi realizado. O processo de conciliação é feito em pesos colombianos à taxa representativa do dia. | — |
| `cus` | Alfanumérico | 255 | O CUS, código único de rastreamento, é a referência do pagamento dentro do banco. Aplica-se somente a pagamentos com PSE. | PSE Colômbia |
| `pseBank` | Alfanumérico | 255 | Nome do banco. Aplica-se somente a pagamentos com PSE. | PSE Colômbia |
| `lng` | Alfanumérico | 2 | Idioma em que o gateway de pagamento será exibido. | — |
| `description` | Alfanumérico | 255 | Descrição da venda. | — |
| `lapResponseCode` | Alfanumérico | 64 | Código de resposta fornecido pela PayU.<br>[Veja os códigos de resposta na coluna indicada]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| `lapPaymentMethod` | Alfanumérico | 255 | Método de pagamento utilizado, por exemplo, VISA. | — |
| `lapPaymentMethodType` | Alfanumérico | 255 | Tipo de método de pagamento utilizado, por exemplo, CREDIT_CARD. | — |
| `lapTransactionState` | Alfanumérico | 32 | Status da transação.<br>[Veja os estados da transação na coluna indicada]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| `message` | Alfanumérico | 255 | Descrição do status da transação. | — |
| `extra1` | Alfanumérico | 255 | Campo adicional para envio de informações sobre a compra. | — |
| `extra2` | Alfanumérico | 255 | Campo adicional para envio de informações sobre a compra. | — |
| `extra3` | Alfanumérico | 255 | Campo adicional para envio de informações sobre a compra. | — |
| `authorizationCode` | Alfanumérico | 12 | Código de autorização da venda. | — |
| `merchant_address` | Alfanumérico | 255 | Endereço do comerciante. | — |
| `merchant_name` | Alfanumérico | 255 | Nome do comerciante. | — |
| `merchant_url` | Alfanumérico | 255 | URL do site do comerciante. | — |
| `orderLanguage` | Alfanumérico | 2 | Idioma do pedido (ISO-639-1). | — |
| `pseCycle` | Numérico | — | Identificador gerado pelo PSE. | PSE Colômbia |
| `pseReference1` | Alfanumérico | 255 | Referência nº 1 para pagamentos PSE. | PSE Colômbia |
| `pseReference2` | Alfanumérico | 255 | Referência nº 2 para pagamentos PSE. | PSE Colômbia |
| `pseReference3` | Alfanumérico | 255 | Referência nº 3 para pagamentos PSE. | PSE Colômbia |
| `telephone` | Alfanumérico | 20 | Número de telefone do comerciante. | — |
| `transactionId` | Alfanumérico | 36 | Identificador da transação. | — |
| `trazabilityCode` | Alfanumérico | 64 | Código de rastreabilidade da venda no site do comerciante. | — |
| `TX_ADMINISTRATIVE_FEE` | Decimal (#.00) | — | Valor da taxa administrativa. | — |
| `TX_TAX_ADMINISTRATIVE_FEE` | Decimal (#.00) | — | Valor do imposto sobre a taxa administrativa. | — |
| `TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE` | Decimal (#.00) | — | Valor base da taxa administrativa para reembolso de imposto. | — |
| `action_code_description` | Alfanumérico | 255 | Descrição do código de resposta do VISANET. | VISANET Peru |
| `cc_holder` | Alfanumérico | 150 | Nome do titular do cartão. | VISANET Peru |
| `cc_number` | Alfanumérico | — | Número do cartão de crédito. | VISANET Peru |
| `processing_date_time` | Data (YYYY-MM-DD) | — | Data de processamento da venda. | VISANET Peru |
| `request_number` | Alfanumérico | 9 | Número do pedido + identificador da transação. | VISANET Peru |

</details>

## Integrar a URL de resposta {#integrating-the-response-url}

A seguir está um exemplo em PHP de como você pode integrar a URL de resposta:

```PHP
<?php
$ApiKey = "4Vj8eK4rloUd272L48hsrarnUA";
$merchant_id = $_REQUEST['merchantId'];
$referenceCode = $_REQUEST['referenceCode'];
$TX_VALUE = $_REQUEST['TX_VALUE'];
$New_value = number_format($TX_VALUE, 1, '.', '');
$currency = $_REQUEST['currency'];
$transactionState = $_REQUEST['transactionState'];
$firma_cadena = "$ApiKey~$merchant_id~$referenceCode~$New_value~$currency~$transactionState";
$firmacreada = md5($firma_cadena);
$firma = $_REQUEST['signature'];
$reference_pol = $_REQUEST['reference_pol'];
$cus = $_REQUEST['cus'];
$extra1 = $_REQUEST['description'];
$pseBank = $_REQUEST['pseBank'];
$lapPaymentMethod = $_REQUEST['lapPaymentMethod'];
$transactionId = $_REQUEST['transactionId'];

if ($_REQUEST['transactionState'] == 4 ) {
	$estadoTx = "Transação aprovada";
}

else if ($_REQUEST['transactionState'] == 6 ) {
	$estadoTx = "Transação rejeitada";
}

else if ($_REQUEST['transactionState'] == 104 ) {
	$estadoTx = "Erro";
}

else if ($_REQUEST['transactionState'] == 7 ) {
	$estadoTx = "Pagamento Pendente";
}

else {
	$estadoTx=$_REQUEST['mensaje'];
}


if (strtoupper($firma) == strtoupper($firmacreada)) {
?>
	<h2>Resumo transaçãoy</h2>
	<table>
	<tr>
	<td>Status da transação</td>
	<td><?php echo $estadoTx; ?></td>
	</tr>
	<tr>
	<tr>
	<td>ID de transação</td>
	<td><?php echo $transactionId; ?></td>
	</tr>
	<tr>
	<td>Referência de Venda</td>
	<td><?php echo $reference_pol; ?></td>
	</tr>
	<tr>
	<td>Referência de transação</td>
	<td><?php echo $referenceCode; ?></td>
	</tr>
	<tr>
	<?php
	if($pseBank != null) {
	?>
		<tr>
		<td>cus </td>
		<td><?php echo $cus; ?> </td>
		</tr>
		<tr>
		<td>Banco </td>
		<td><?php echo $pseBank; ?> </td>
		</tr>
	<?php
	}
	?>
	<tr>
	<td>valor total</td>
	<td>$<?php echo number_format($TX_VALUE); ?></td>
	</tr>
	<tr>
	<td>Moeda</td>
	<td><?php echo $currency; ?></td>
	</tr>
	<tr>
	<td>Descrição</td>
	<td><?php echo ($extra1); ?></td>
	</tr>
	<tr>
	<td>Entidade:</td>
	<td><?php echo ($lapPaymentMethod); ?></td>
	</tr>
	</table>
<?php
}
else
{
?>
	<h1>Erro ao validar assinatura digital.</h1>
<?php
}
?>
```

<br>

**Exemplo de requisição GET enviada para a URL de resposta:**

```HTML
http://mytestsite.com/response.php?&merchantId=508029&merchant_name=Test+PayU+Test&merchant_address=Av+123+Calle+12&telephone=7512354&merchant_url=http%3A%2F%2Fpruebaslapv.xtrweb.com&transactionState=6&lapTransactionState=DECLINED&message=Declinada&referenceCode=2015-05-27+13%3A04%3A37&reference_pol=7069375&transactionId=f5e668f1-7ecc-4b83-a4d1-0aaa68260862&description=test_payu_01&trazabilityCode=&cus=&orderLanguage=es&extra1=&extra2=&extra3=&polTransactionState=6&signature=e1b0939bbdc99ea84387bee9b90e4f5c&polResponseCode=5&lapResponseCode=ENTITY_DECLINED&risk=1.00&polPaymentMethod=10&lapPaymentMethod=VISA&polPaymentMethodType=2&lapPaymentMethodType=CREDIT_CARD&installmentsNumber=1&TX_VALUE=100.00&TX_TAX=.00&currency=USD&lng=es&pseCycle=&buyerEmail=test%40payulatam.com&pseBank=&pseReference1=&pseReference2=&pseReference3=&authorizationCode=&TX_ADMINISTRATIVE_FEE=.00&TX_TAX_ADMINISTRATIVE_FEE=.00&TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE=.00
```

## Validação da assinatura {#signature-validation}

A validação da assinatura permite verificar a integridade dos dados. Você deve gerar uma assinatura utilizando as informações fornecidas na URL de resposta e compará-la com o valor presente no parâmetro `signature`.

### Considerações importantes

* Para calcular o novo valor `new_value`, arredonde o `TX_VALUE` para uma casa decimal usando o método _round half to even_:
  - Se o primeiro dígito decimal for par e o segundo for `5`, arredonde para baixo.
  - Se o primeiro dígito decimal for ímpar e o segundo for `5`, arredonde para cima.
  - Em todos os outros casos, arredonde normalmente para o decimal mais próximo.
* Utilize sempre os valores da URL de resposta (`merchantId`, `referenceCode`, `TX_VALUE`, `currency` e `transactionState`) para gerar a assinatura. **Não** utilize os valores do seu banco de dados.
* Armazene sua chave da API de forma segura.
* Construa a string da assinatura no seguinte formato:

<p>
    
    apiKey~merchantId~referenceCode~new_value~currency~transactionState
	
### Exemplos de assinatura

Os exemplos a seguir ilustram como gerar uma assinatura, neste caso, utilizando HMAC-SHA256.

#### Primeiro decimal é um número par e o segundo é 5

| **Item** | **Valor** |
|----------|-----------|
| Parâmetros da string | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchantId: 508029` <br> `referenceCode: PayUTest01` <br> `TX_VALUE: 150.25` <br> `currency: USD` <br> `transactionState: 6` |
| String de entrada (formatada) | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.2~USD~6` |
| Chave secreta (aplicável apenas ao HMAC-SHA256) | `test123` |
| `signature` gerada | `5ac639cc57ea3ceccef66243f7a20412ea4ae0c86b5121ca6aa67597266057d1` |

#### Primeiro decimal é um número ímpar e o segundo é 5

| **Item** | **Valor** |
|----------|-----------|
| Parâmetros da string | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchantId: 508029` <br> `referenceCode: PayUTest01` <br> `TX_VALUE: 150.35` <br> `currency: USD` <br> `transactionState: 6` |
| String de entrada (formatada) | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.4~USD~6` |
| Chave secreta (aplicável apenas ao HMAC-SHA256) | `test123` |
| `signature` gerada | `7bbb5dd21b3c668bbfec8455c4f4fd3887dff1caa9c5da3895ddd914065b4905` |

#### Outros casos

| **Item** | **Valor** |
|----------|-----------|
| Parâmetros da string | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchantId: 508029` <br> `referenceCode: PayUTest01` <br> `TX_VALUE: 150.34` <br> `currency: USD` <br> `transactionState: 6` |
| String de entrada (formatada) | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.3~USD~6` |
| Chave secreta (aplicável apenas ao HMAC-SHA256) | `test123` |
| `signature` gerada | `50c8aae35caf923fbdbd791d7842b916ab7d6597b7c4032dd92ab67b7bb43e8a` |

### Valide sua assinatura {#validate-your-signature}

Use este gerador para criar uma assinatura com qualquer um dos métodos de criptografia disponíveis. Esta funcionalidade auxilia você a verificar o valor da `signature` que a PayU envia para sua URL de resposta.

<div>
{{< responsepage/signaturegen_resp_en >}}
</div>