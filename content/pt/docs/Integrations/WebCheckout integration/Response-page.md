---
title: "Página de resposta"
linkTitle: "Página de resposta"
date: 2021-03-29T12:15:39-05:00
description: >
  A página Resposta é uma página obrigatória e permite mostrar o resultado da transação ao pagador. Nosso sistema redireciona o pagador para esta página assim que a transação for realizada. Os dados com os resultados do pagamento são enviados ao seu sistema com o método HTTP GET.</br>Esta página é invocada para todos os estados da transação: aprovada, rejeitada, em validação, aguardando pagamento (dinheiro) etc.

weight: 20
tags: ["subtopic"]
---
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/jquery.validate.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/additional-methods.min.js"></script>
<script src="/js/signature-generator/md5.js"></script>
<script src="/js/signature-generator/sha1.js"></script>
<script src="/js/signature-generator/sha256.js"></script>
<script src="/js/signature-generator/signature-generator.js"></script>

## Observações {#considerations}
* Alguns provedores de hospedagem têm configurações que não permitem o envio de URLs como valores de parâmetro. Exemplo: `&merchant_url=http%3A%2F%2Fwww.myshop.com`
* Para contas do Brasil, não há redirecionamento para a página de resposta.
* Não dependa da página de resposta para atualizar seu banco de dados ou executar processos, pois os usuários podem não retornar a ela. Use a página de confirmação.
* Se você deseja exibir informações relacionadas à transação, sugerimos mostrar pelo menos o seguinte: status, valor de referência, moeda e data.
* Recomenda-se enviar o parâmetro `responseUrl` na forma de pagamento ou definir Módulo PayU; o que for enviado no parâmetro terá prioridade. Se o PayU não encontrar nenhum, o processo de pagamento termina no Webcheckout.

{{% alert title="Importante" color="warning"%}}
Se você deseja que o PayU sempre mostre as informações da transação, não envie nenhum valor no parâmetro `responseUrl` da forma de pagamento e deixe em branco no Módulo PayU. Nesse caso, o comprador não pode retornar ao seu site.
{{% /alert %}}

## Variáveis {#variables}
Envie as seguintes variáveis para a página de resposta.

<details>
<summary>Variáveis a serem enviadas para a página de resposta</summary>
<br>
<div class="variables"></div>

| Campo | Tipo | Tamanho | Descrição | Applies to |
|-|-|-|-|:-:|
| merchantId | Numérico | 12 | O número de identificação do vendedor no sistema PayU, você encontra este número no e-mail de criação de conta. | — |
| transactionState | Numérico | 2 | Indica o status da transação no sistema.<br>[Veja os estados da transação na coluna fornecida.]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| risk | Decimal (#.00) | — | Risco associado à transação. Valores entre 0 e 1.<br>Quanto maior o valor, maior o risco.<br>Formato `###.00`. | — |
| polResponseCode | Alfanumérico | 64 | Código de resposta.<br>[Veja os códigos de resposta na coluna fornecida]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| referenceCode | Alfanumérico | 255 | Referência da venda ou ordem. Deve ser exclusivo para cada transação enviada ao sistema. | — |
| reference_pol | Alfanumérico | 255 | Número de referência ou transação gerado pelo PayU. | — |
| signature | Alfanumérico | 255 | Assinatura digital criada para cada uma das transações. | — |
| polPaymentMethod | Alfanumérico | 255 | Identificador interno dos métodos de pagamento usados. | — |
| polPaymentMethodType | Numérico | 2 | O tipo de método de pagamento usado para o pagamento.<br>[Veja os códigos dos métodos de pagamento]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). | — |
| installmentsNumber | Numérico | 2 | Quantidade de parcelas em que o pagamento com cartão de crédito foi programado. | — |
| TX_VALUE | Numérico | 14,2 | Valor total da transação. Ele pode conter dois dígitos decimais. Por exemplo 10000.00 ou 10000 | — |
| TX_TAX | Numérico | 14,2 | Valor do IVA da transação, se o IVA não for enviado, o sistema aplica 19% automaticamente.<br>Ele pode conter dois dígitos decimais, por exemplo 19000.00.<br>Caso você não tenha IVA, deve preencher 0. | — |
| buyerEmail | Alfanumérico | 255 | Campo que contém o e-mail do comprador para notificar o resultado da transação. Recomenda-se validá-lo quando os dados forem extraídos de um formulário | — |
| processingDate | Date (YYYY-MM-DD HH:mm:ss) | — | A data em que a transação foi feita. | — |
| currency | Alfanumérico | 3 | A respectiva moeda na qual o pagamento é feito. O processo de reconciliação é realizado em pesos na taxa representativa do dia. | — |
| cus | Alfanumérico | 255 | O CUS (código de rastreamento único) é a referência de pagamento no Banco, válido apenas para pagamentos com PSE. | PSE Colômbia. |
| pseBank | Alfanumérico | 255 | O nome do banco, válido apenas para pagamentos com PSE. | PSE Colômbia. |
| lng | Alfanumérico | 2 | Idioma no qual exibir o portal de pagamento. | — |
| description | Alfanumérico | 255 | Descrição of sale. | — |
| lapResponseCode | Alfanumérico | 64 | Código de resposta that PayU delivers.<br>[Veja os códigos de respostas na coluna fornecida]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| lapPaymentMethod | Alfanumérico | 255 | Método de pagamento utilizado, por exemplo VISA. | — |
| lapPaymentMethodType | Alfanumérico | 255 | Tipo de método de pagamento usado, por exemplo CREDIT_CARD. | — |
| lapTransactionState | Alfanumérico | 32 | Status da transação.<br>[Veja o status da transação na coluna fornecida]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). | — |
| message | Alfanumérico | 255 | Descrição do status da transação. | — |
| extra1 | Alfanumérico | 255 | Campo adicional para envio de informações sobre a compra. | — |
| extra2 | Alfanumérico | 255 | Campo adicional para envio de informações sobre a compra. | — |
| extra3 | Alfanumérico | 255 | Campo adicional para envio de informações sobre a compra. | — |
| authorizationCode | Alfanumérico | 12 | Autorização Code of the sale. | — |
| merchant_address | Alfanumérico | 255 | Merchant’s address. | — |
| merchant_name | Alfanumérico | 255 | Nome do vendedor | — |
| merchant_url | Alfanumérico | 255 | URL do site do vendedor. | — |
| orderLanguage | Alfanumérico | 2 | Idioma da ordem (ISO-639-1). | — |
| pseCycle | Numérico | — | Identificador gerado pelo PSE. | PSE Colômbia |
| pseReference1 | Alfanumérico | 255 | Nº de referência 1 para pagamentos PSE. | PSE Colômbia |
| pseReference2 | Alfanumérico | 255 | Nº de referência 2 para pagamentos PSE. | PSE Colômbia |
| pseReference3 | Alfanumérico | 255 | Nº de referência 3 para pagamentos PSE. | PSE Colômbia |
| telephone | Alfanumérico | 20 | Número de telefone do vendedor. | — |
| transactionId | Alfanumérico | 36 | Identificador da transação. | — |
| trazabilityCode | Alfanumérico | 64 | Código de rastreamento da venda no site da loja. | — |
| TX_ADMINISTRATIVE_FEE | Decimal (#.00) | — | Valor da taxa administrativa. | — |
| TX_TAX_ADMINISTRATIVE_FEE | Decimal (#.00) | — | Valor do imposto da taxa administrativa. | — |
| TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE | Decimal (#.00) | — | Valor base da taxa administrativa para a restituição do imposto. | — |
| action_code_description | Alfanumérico | 255 | Descrição do código de resposta da VISANET. | VISANET Peru |
| cc_holder | Alfanumérico | 150 | Nome do titular do cartão. | VISANET Peru |
| cc_number | Alfanumérico | — | Número do cartão de crédito. | VISANET Peru |
| processing_date_time | Date (YYYY-MM-DD) | — | Date of the sale’s processing. | VISANET Peru |
| request_number | Alfanumérico | 9 | Número da ordem + identificador de transação | VISANET Peru |

</details>

## Integrar a página de resposta {#integrate-the-response-page}
A seguir está um exemplo em PHP de como você pode integrar a página de resposta:

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

Exemplo GET enviado para a página de resposta.

```HTML
http://mytestsite.com/response.php?&merchantId=508029&merchant_name=Test+PayU+Test&merchant_address=Av+123+Calle+12&telephone=7512354&merchant_url=http%3A%2F%2Fpruebaslapv.xtrweb.com&transactionState=6&lapTransactionState=DECLINED&message=Declinada&referenceCode=2015-05-27+13%3A04%3A37&reference_pol=7069375&transactionId=f5e668f1-7ecc-4b83-a4d1-0aaa68260862&description=test_payu_01&trazabilityCode=&cus=&orderLanguage=es&extra1=&extra2=&extra3=&polTransactionState=6&signature=e1b0939bbdc99ea84387bee9b90e4f5c&polResponseCode=5&lapResponseCode=ENTITY_DECLINED&risk=1.00&polPaymentMethod=10&lapPaymentMethod=VISA&polPaymentMethodType=2&lapPaymentMethodType=CREDIT_CARD&installmentsNumber=1&TX_VALUE=100.00&TX_TAX=.00&currency=USD&lng=es&pseCycle=&buyerEmail=test%40payulatam.com&pseBank=&pseReference1=&pseReference2=&pseReference3=&authorizationCode=&TX_ADMINISTRATIVE_FEE=.00&TX_TAX_ADMINISTRATIVE_FEE=.00&TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE=.00
```

## Validação de assinatura {#signature-validation}
A validação da assinatura permite que você verifique a integridade dos dados. Você deve gerar a assinatura com as informações que encontrar na página de resposta e compará-la com as informações do parâmetro de assinatura.

Para validar a assinatura na página de resposta, você deve considerar:

* Para obter o novo valor `new_value`, aproxime o `TX_VALUE` usando o método de _Round half to even_:
  - Se a primeira casa decimal for par e a segunda for `5`, arredonde para o valor mais baixo.
  - Se a primeira casa decimal for ímpar e a segunda for `5`, arredonde para o valor mais alto.
  - Caso contrário, você deve arredondar para a casa decimal mais próxima.
* Obtenha os parâmetros para gerar a assinatura (`merchantId`, `referenceCode`, `TX_VALUE`, `currency` e `transactionState`) da página de resposta, e não de seu banco de dados. 
* Você deve armazenar sua ApiKey com segurança.
* Crie a assinatura da seguinte forma:

```HTML
"ApiKey~merchantId~referenceCode~new_value~currency~transactionState"
```
<br>

Exemplos:

**A primeira casa decimal é um número par e a segunda é 5**

```
Sua apiKey: 4Vj8eK4rloUd272L48hsrarnUA
Parâmetros obtidos na página de resposta:
- merchantId = 508029
- referenceCode = TestPayU04
- TX_VALUE = 150.25
- currency = USD
- transactionState = 6

A assinatura é gerada da seguinte forma:
MD5(4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU04~150.2~USD~6) = 00286dc735bd9eaa8ae3a3a4cbb40688

signature = 00286dc735bd9eaa8ae3a3a4cbb40688
```

**A primeira casa decimal é um número ímpar e a segunda é 5**

```
Sua apiKey: 4Vj8eK4rloUd272L48hsrarnUA 
Parâmetros obtidos na página de resposta: 
- merchantId = 508029
- referenceCode = TestPayU04
- TX_VALUE = 150.35
- currency = USD
- transactionState = 6

A assinatura é gerada da seguinte forma:
MD5(4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU04~150.4~USD~6) = 9df2bb60e2838170009040982967923f

signature = 9df2bb60e2838170009040982967923f 
```

**Outros casos**
```
Sua apiKey: 4Vj8eK4rloUd272L48hsrarnUA 
Parâmetros obtidos na página de resposta: 
- merchantId = 508029
- referenceCode = TestPayU04
- TX_VALUE = 150.34
- currency = USD
- transactionState = 6

A assinatura é gerada da seguinte forma:
MD5(4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU04~150.3~USD~6) = 779f163be9347a691bcdb25064644795

signature = 779f163be9347a691bcdb25064644795 
```

### Compare a sua assinatura {#compare-your-signature}

<!-- Signatue generator - response page -->
<div id="blue-box">
<span class="grey-text-13">
<div>
<form method="POST" id="signature_form_response_page" >
    <table>
        <span class="blue-text-13"><b>Algoritmo: &nbsp;</b></span>
        <select id = "signature_algorithm_response_page" class="calc_selector form_control">
            <option  value="md5">MD5</option>
            <option  value="sha1">SHA1</option>
            <option  value="sha256">SHA256</option>
        </select>
        <br>
        <br>
        <span class="calc_text">&nbsp;(</span>
        <input class="form_control" type="text"  id ="signature_apikey_response_page" name = "signature_apikey_response_page" placeholder="ApiKey" maxlength="26"> ~
        <input class="form_control number" type="text"  id ="signature_merchanId_response_page" name = "signature_merchanId_response_page" placeholder="MerchantId" maxlength="7"> ~
        <input class="form_control" type="text"  id ="signature_referenceCode_response_page" name = "signature_referenceCode_response_page" placeholder="Referência" maxlength="255"> ~
        <input class="form_control  number" type="text" id ="signature_amount_response_page" name = "signature_amount_response_page" placeholder="Valor" maxlength="14"> ~
        <select id = "signature_currency_response_page" class="calc_selector form_control" >
            <option  value="USD">USD</option>
            <option  value="COP">COP</option>
            <option  value="MXN">MXN</option>
            <option  value="ARS">ARS</option>
            <option  value="PEN">PEN</option>
            <option  value="BRL">BRL</option>
            <option  value="CLP">CLP</option>
        </select> ~
        <select id = "signature_transaction_state_response_page" class="calc_selector form_control" >
            <option  value="4">4 (Aprovada)</option>
            <option  value="6">6 (Rejeitada)</option>
            <option  value="104">104 (Erro)</option>
            <option  value="5">5 (Expirada)</option>
            <option  value="7">7 (Pendente)</option>
        </select>
        <span class="calc_text">)</span>
        <br>
        <br>
        <br>
        <span class="blue-text-13"><b>Resultado:&nbsp;</b></span><input class="form_control" id ="signature_generated_response_page" name = "signature_generated_response_page" value = ""  readonly />
    </table>
    <br>
    <table width="50%"  border="0" cellspacing="2" cellpadding="2">
        <input type="button" name="signature_generate_response_page" id="signature_generate_response_page" value="Gerar assinatura" >
        <input type="button" name="signature_generate_again_response_page" id="signature_generate_again_response_page" value="Gerar nova assinatura" >
    </table>
</form>
</div>
</span>
</div>
<!-- End of signature generator - response page -->

Esta calculadora permite gerar a assinatura usando qualquer um dos métodos de criptografia disponíveis.