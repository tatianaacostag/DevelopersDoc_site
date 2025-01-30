---
title: "Formulário de Pagamento"
linkTitle: "Formulário de Pagamento"
date: 2021-03-29T12:15:27-05:00
description: >
  Nesta seção, você aprenderá como enviar dados de transação para o gateway de pagamento da PayU. Este documento fornece as informações necessárias para criar um formulário HTML com os detalhes exigidos da transação e enviá-lo para o nosso sistema usando o método HTTP POST.

weight: 10
tags: ["subtopic"]
---
<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/jquery.validate.min.js"></script>
<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/additional-methods.min.js"></script>
<script src="/js/signature-generator/md5.js"></script>
<script src="/js/signature-generator/sha1.js"></script>
<script src="/js/signature-generator/sha256.js"></script>
<script src="/js/signature-generator/signature-generator.js"></script>
<script src="/js/searchcodes.js"></script>

## Observações {#considerations}

* Verifique se você tem `merchantId`, `accountId` e `apiKey` corretos.
* Use um código de referência de pagamento único para cada transação.
* Evite incluir espaços nos valores dos parâmetros.
* Limite os valores decimais a duas casas.
* Exclua caracteres especiais do parâmetro  `referenceCode`.

## Parâmetros {#parameters}

Você pode incluir os seguintes parâmetros no formulário de pagamento.

<details>
<summary>Parâmetros no formulário de pagamento</summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
<br>
<div class="variables"></div>

| Campo | Tipo | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| lng | Alfanumérico | 3 | O idioma para o gateway de pagamento. <br>[Ver idiomas suportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Não |
| merchantId | Numérico | 12 | O número de ID exclusivo atribuído à sua loja no sistema da PayU. Você pode encontrar este número no e-mail de criação da conta. | Sim |
| accountId | Numérico | 6 | O ID associado à conta de usuário em cada país. Determina os métodos de pagamento disponíveis para o país correspondente. | Sim |
| algorithmSignature | Alfanumérico | 255 | O algoritmo de criptografia usado para a assinatura digital (campo `signature`). As opções disponíveis são: `MD5`, `SHA` ou `SHA256`. | Não |
| signature | Alfanumérico | 255 | Uma assinatura digital para a transação. Consulte [Assinatura para o Formulário de Pagamento]({{< ref "payment-form.md#signature-for-payment-form" >}}) para obter instruções. | Sim |
| sourceUrl | Alfanumérico | 255 | O URL de origem onde o botão de pagamento do comerciante está localizado. | Não |
| responseUrl | Alfanumérico | 255 | O URL para a página de resposta. | Não |
| confirmationUrl | Alfanumérico | 255 | O URL para a página de confirmação. | Não |
| expirationDate | Alfanumérico | 19 | A data de expiração para pagamentos em dinheiro no formato `AAAA-MM-DD HH:mm:ss`. Deve estar dentro do intervalo permitido para pagamentos em dinheiro (15 dias para a Argentina, 7 dias para outros). | - |
| paymentMethods | Alfanumérico | 255 | A lista de métodos de pagamento habilitados para a transação. <br>Esta lista deve ser separada por vírgula e sem espaços em branco, por exemplo: `VISA,MASTERCARD`.<br> Você pode incluir parcelas usando hífens, por exemplo: `VISA-1-3,MASTERCARD-3-5-9`. <br>[Consulte os Métodos de Pagamento disponíveis para o seu país na coluna `paymentMethod parameter`]({{< ref "select-your-payment-method.html" >}}). | Não |
| selectedPaymentMethod | Alfanumérico | 255 | Um método de pagamento pré-selecionado quando o usuário acessa o link de pagamento. | Não |
| paymentMethodsDescription | Alfanumérico | 255 | Uma descrição dos métodos de pagamento e Bins aceitos para a transação. | Não |
| iin | Alfanumérico | 2048 | Uma lista de Bins admitidos durante o processo de pagamento, separados por vírgulas. _Somente comerciantes que validam assinaturas podem usar este parâmetro._ | Não |
| pseBanks | Alfanumérico | 255 | Uma lista de códigos de bancos habilitados para pagamentos através do PSE. | Não |
| partnerId | Alfanumérico | 255 | Um campo opcional para especificar o nome do parceiro (por exemplo, ZOOZ). | Não |
| template | Alfanumérico | 255 | O modelo a ser usado para a página de pagamento. | Não |
| extra1 | Alfanumérico | 255 | Campo adicional para enviar informações extras sobre a compra. | Não |
| extra2 | Alfanumérico | 255 | Campo adicional para enviar informações extras sobre a compra. | Não |
| extra3 | Alfanumérico | 255 | Campo adicional para enviar informações extras sobre a compra. | Não |
| extra4 | Alfanumérico | 255 | Campo adicional para enviar informações extras sobre a compra. | Não |
| displayShippingInformation | Numérico | 1 | Definir como `1` para solicitar informações de envio ou `0` para desativá-lo. | Não |
| additionalDeliveryDays | Numérico | 5 | Dias adicionais para a entrega do pedido, que aparecerão na resposta da consulta da API como `result.payload.transactions.extraParameters.ADDITIONAL_DELIVERY_DAYS`. | Não |
| displayBuyerComments | Numérico | 1 | Definir como `1` para habilitar os comentários do comprador ou `0` para desativá-lo. Isso aparece na resposta da API como `result.payload.transactions.extraParameters.DISPLAY_BUYER_COMMENTS`. | Não |
| buyerCommentsLabel | Alfanumérico | 255 | O rótulo para os comentários do comprador, que aparece na resposta da API como `result.payload.transactions.extraParameters.BUYER_COMMENTS_LABEL`. | Não |
| isCashOnDeliveryApply | Numérico | 1 | Definir como `1` para habilitar o pagamento contra entrega para a transação ou `0` para desativá-lo. | Não |
| test | Numérico | 1 | Indica se a transação está em modo de teste (`1`) ou modo de produção (`0`). | Não |
| description | Alfanumérico | 255 | Uma descrição da venda. | Sim |
| referenceCode | Alfanumérico | 255 | Uma referência única para a venda ou pedido. Deve ser única para cada transação enviada ao sistema, normalmente usada para rastreamento de solicitações. | Sim |
| amount | Numérico | 10 | O valor total da transação, que pode incluir dois dígitos decimais. Ex: 10000,00 ou 10000. | Sim |
| tax | Numérico | 10.2 | O valor do IVA para a transação. Na Colômbia, se nenhum IVA for fornecido, o sistema aplica 19% automaticamente. Se o IVA for isento, defina como `0`. | Sim |
| taxReturnBase | Numérico | 10.2 | O valor base usado para calcular o IVA. Se o produto for isento de IVA, defina como `0`. | Sim |
| administrativeFee | Numérico | 10.2 | A taxa administrativa para a transação. | Não |
| taxAdministrativeFee | Numérico | 10.2 | O imposto aplicado à taxa administrativa. | Não |
| taxAdministrativeFeeReturnBase | Numérico | 10.2 | O valor base para calcular o imposto da taxa administrativa. | Não |
| discount | Numérico | 10.2 | O desconto aplicado à venda. | Não |
| currency | Alfanumérico | 3 | A moeda usada para o pagamento. Na Colômbia, as reconciliações são feitas em pesos colombianos à taxa representativa do dia. <br>[Ver moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| airline | Alfanumérico | 4 | O código da companhia aérea para transações aéreas. | Não |
| additionalValue | Numérico | 10.2 | Qualquer valor adicional adicionado à venda. | Não |
| payerFullName | Alfanumérico | 50 | O nome completo do pagador, usado para preencher o formulário do cartão de crédito. | Sim |
| payerEmail | Alfanumérico | 255 | O endereço de e-mail do pagador. | Sim |
| payerOfficePhone | Alfanumérico | Máx. 20 | O número de telefone do local de trabalho do pagador. | Não |
| payerPhone | Alfanumérico | Máx. 20 | O número de telefone do pagador. | Sim |
| payerMobilePhone | Alfanumérico | Máx. 20 | O número de telefone celular do pagador. | Não |
| payerDocumentType | Alfanumérico | 25 | O tipo de documento de identificação usado pelo pagador. Exemplos: `CC`, `DNI`. `NIT`, `Passaporte`. | Sim |
| payerDocument | Alfanumérico | 25 | O número de identificação do pagador, usado para preencher o formulário do cartão de crédito. | Sim |
| billingCountry | Alfanumérico | 2 | O código do país ISO para o endereço de cobrança. | Não |
| payerState | Alfanumérico | N/A | O estado de cobrança do pagador no código ISO 3166 (por exemplo, SP para São Paulo, AR-C para Buenos Aires). | Não |
| billingCity | Alfanumérico | 50 | A cidade associada ao endereço de cobrança. | Não |
| billingAddress | Alfanumérico | 255 | O endereço de cobrança para a transação. | Não |
| billingAddress2 | Alfanumérico | 255 | A linha de endereço secundária para o endereço de cobrança do pagador. | Não |
| billingAddress3 | Alfanumérico | 255 | A linha de endereço terciária para o endereço de cobrança do pagador. | Não |
| zipCode | Alfanumérico | 20 | O código postal para o endereço de cobrança ou envio. | Não |
| buyerFullName | Alfanumérico | 150 | O nome completo do comprador. | Sim |
| buyerEmail | Alfanumérico | 255 | O endereço de e-mail do comprador, usado para as notificações da transação. | Sim |
| buyerDocumentType | Alfanumérico | 25 | O tipo de documento de identificação usado pelo comprador. Exemplos: `CC`, `DNI`. `NIT`, `Passaporte`. | Sim |
| buyerDocument | Alfanumérico | 25 | O número de identificação do comprador. | Sim |
| officeTelephone | Alfanumérico | Máx. 20 | O número de telefone comercial do comprador. | Não |
| telephone | Alfanumérico | Máx. 20 | O número de telefone residencial do comprador. | Sim |
| mobilePhone | Alfanumérico | Máx. 20 | O número de telefone celular do comprador, usado para preencher o formulário do cartão de crédito e como telefone de contato. | Não |
| shippingCountry | Alfanumérico | 2 | O código do país ISO para o endereço de envio. <br><sup>*</sup>Obrigatório se a loja enviar o produto. <br>[Ver países de processamento]({{< ref "response-codes-and-variables.html#processing-countries" >}}). | Sim* |
| shippingState | Alfanumérico | N/A | O estado de envio do comprador no código ISO 3166 (por exemplo, SP para São Paulo, AR-C para Buenos Aires). | Não |
| shippingCity | Alfanumérico | 50 | A cidade para a qual o comerciante entregará o produto ou serviço. <br><sup>*</sup>Obrigatório se a loja enviar o produto. | Sim* |
| shippingAddress | Alfanumérico | 255 | O endereço para o qual o comerciante entregará o produto ou serviço. <br><sup>*</sup>Obrigatório se a loja enviar o produto. | Sim* |
| shippingAddress2 | Alfanumérico | 255 | A linha de endereço secundária para o endereço de envio do comprador. | Não |
| shippingAddress3 | Alfanumérico | 255 | A linha de endereço terciária para o endereço de envio do comprador. | Não |
| payerShippingPostalCode | Alfanumérico | N/A | O código postal de envio do comprador. | Não |

</details>

### Considerações sobre os Parâmetros {#parameters-considerations}

* O parâmetro `tax` representa o IVA, aplicável em certos países, enquanto `taxReturnBase` é o valor base para calcular o IVA. Se o seu produto é isento de impostos, defina ambas as variáveis como `0` (`tax=0`, `taxReturnBase=0`)
* Quando alguns produtos são tributados e outros não, calcule e defina os valores conforme mostrado na tabela abaixo para garantir o envio correto para a plataforma de pagamento.

#### Exemplo de Cálculo de IVA:

| Produto | `taxReturnBase` | `tax`    | Valor  |
|---------|---------------------|--------------|---------|
| A       | 84.033              | 15.966 (19%) | 100.000 |
| B       | 181.818             | 18.181 (10%) | 200.000 |
| C       | 0                   | 0 (0%)       | 150.000 |
| Total   | 268.851             | 34.147       | 450.000 |

{{% alert title="Importante" color="warning"%}}
A soma de `tax` + `taxReturnBase` não deve exceder o valor total de cada produto.
{{% /alert %}}

* Para empresas na Colômbia registradas sob o _Régimen Común_, se o `tax` não for informado, a PayU o calcula automaticamente em 19%. Para empresas sob o _Régimen Simplificado_, se o `tax`, não for especificado, a PayU atribui um valor de zero (0).

## Exemplo de Campos em HTML {#html-fields-example}

A seguir, um exemplo dos campos obrigatórios para um formulário de pagamento no formato HTML, apontando a solicitação para o ambiente sandbox (modo de teste).

```HTML
 <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
  <input name="merchantId"      type="hidden"  value="508029"   >
  <input name="accountId"       type="hidden"  value="512321" >
  <input name="description"     type="hidden"  value="Test PAYU"  >
  <input name="referenceCode"   type="hidden"  value="TestPayU" >
  <input name="amount"          type="hidden"  value="20000"   >
  <input name="tax"             type="hidden"  value="3193"  >
  <input name="taxReturnBase"   type="hidden"  value="16806" >
  <input name="currency"        type="hidden"  value="COP" >
  <input name="signature"       type="hidden"  value="7ee7cf808ce6a39b17481c54f2c57acc"  >
  <input name="test"            type="hidden"  value="0" >
  <input name="buyerEmail"      type="hidden"  value="test@test.com" >
  <input name="responseUrl"     type="hidden"  value="http://www.test.com/response" >
  <input name="confirmationUrl" type="hidden"  value="http://www.test.com/confirmation" >
  <input name="Submit"          type="submit"  value="Enviar" >
</form>
```
<br>

Se a sua loja faz o envio dos produtos, você deve incluir os seguintes valores:

```HTML
  <input name="shippingAddress"    type="hidden"  value="calle 93 n 47 - 65"   >
  <input name="shippingCity"       type="hidden"  value="Bogotá" >
  <input name="shippingCountry"    type="hidden"  value="CO"  >
```
<br>

A URL configurada em `action` depende do ambiente:

```HTML
Teste: https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/
Produção: https://checkout.payulatam.com/ppp-web-gateway-payu/
```

## Exemplo de Formulário de Pagamento

Este exemplo de formulário de pagamento dinâmico é projetado para testes em nosso ambiente sandbox. Ele oferece uma visão dos campos e funcionalidades que você pode incorporar em seus próprios formulários de pagamento. Abaixo está uma visão geral de suas principais funcionalidades:

* **Geração de Assinatura de Transação:** O formulário calcula uma string de assinatura usando a chave da API PayU LATAM, o ID do comerciante e várias entradas do usuário, como método de pagamento e informações bancárias. Esta assinatura é criptografada usando um algoritmo especificado (MD5, SHA ou SHA256) para garantir transações seguras. Para mais detalhes, consulte [Assinatura para Formulário de Pagamento]({{< ref "Payment-form.md#signature-for-payment-form" >}}).

* **Preenchimento Dinâmico do Formulário:** Com base no país e na conta selecionados, o formulário preenche automaticamente vários campos, como tipos de documento, informações de cobrança (por exemplo, cidade, estado, CEP) e informações do pagador. Isso permite que o formulário se ajuste aos requisitos de dados específicos da região (por exemplo, CPF para o Brasil ou CUIT para a Argentina).

* **Gestão de Visibilidade:** Várias funções são incluídas para mostrar ou ocultar campos dinamicamente, com base no tipo de conta selecionado. Isso é particularmente útil para lidar com casos específicos, como bancos PSE na Colômbia ou campos adicionais para companhias aéreas e agências de viagens.

* **Tratamento das Informações de Envio:** O formulário permite que o usuário use as informações de cobrança como endereço de envio ou especifique detalhes de envio separados. Se o usuário não selecionar uma opção de envio alternativa, as informações de cobrança são usadas por padrão.

* **Ouvintes de Eventos e Envio de Formulário:** A página pode usar ouvintes de eventos para atualizar os campos do formulário quando certos valores de entrada (por exemplo, ID da conta) mudam e garante que o processo de envio do formulário respeite as entradas do usuário, com opções alternativas configuradas (por exemplo, uso das informações de cobrança se nenhuma opção de envio for selecionada).

<div>
{{< paymentform/webcheckout_en >}}
</div>

<br>
<br>

## Assinatura para Formulário de Pagamento {#signature-for-payment-form}

A assinatura é uma forma de validar os pagamentos efetuados na plataforma e garantir a sua autenticidade. Consiste em uma string criptografada usando `MD5`, `SHA1` ou `SHA256`. A string é criada da seguinte maneira:

```HTML
"ApiKey~merchantId~referenceCode~amount~currency"
```

{{% alert title="Observação" color="info"%}}
Se sua forma de pagamento inclui as variáveis `paymentMethods`,` iin` ou `pseBanks`, você deve concatená-las nesta ordem:

```HTML
"ApiKey~merchantId~referenceCode~amount~currency~paymentMethods~iin~pseBanks"
```
{{% /alert %}}

Por exemplo, com os seguintes dados:

```HTML
merchantId: 508029
ApiKey: 4Vj8eK4rloUd272L48hsrarnUA
referenceCode: TestPayU
amount: 20000
currency: COP
accountId: 512326
buyerEmail: test@test.com
```
<br>

A assinatura é:

```HTML
"4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU~20000~COP"
```
<br>

Criptografado usando `MD5`:

```HTML
"7ee7cf808ce6a39b17481c54f2c57acc"
```
<br>

Criptografado usando `SHA1`:

```HTML
"fa890d3f94e12b5cdb62e8771453b99b78e7ccdc"
```
<br>

Criptografado usando `SHA256`:

```HTML
"af3899a22336b79db46006491d15813158826f944599bf3bf601e2327f898022"
```

<br>

### Gerar uma Assinatura {#generate-a-signature}

Este calculador permite que você gere a assinatura usando qualquer um dos métodos de criptografia disponíveis.

<!-- Signature generator -->
<div id="blue-box">
<span class="grey-text-13">
<div id = "div_generador" >

<form method="POST" id="signature_form" >
    <table>
        <span class="blue-text-13"><b>Algoritmo: &nbsp;</b></span>
        <select id = "signature_algorithm" class="calc_selector form_control">
            <option  value="md5">MD5</option>
            <option  value="sha1">SHA1</option>
            <option  value="sha256">SHA256</option>
        </select>
        <br>
        <br>
        <span class="calc_text">&nbsp;(</span>
        <input class="form_control" type="text"  id ="signature_apikey" name = "signature_apikey" placeholder="ApiKey" maxlength="26"> ~
        <input class="form_control number" type="text"  id ="signature_merchanId" name = "signature_merchanId" placeholder="MerchantId" maxlength="7"> ~
        <input class="form_control" type="text"  id ="signature_referenceCode" name = "signature_referenceCode" placeholder="Referência" maxlength="255"> ~
        <input class="form_control  number" type="text" id ="signature_amount" name = "signature_amount" placeholder="Valor" maxlength="14"> ~
        <select id = "signature_currency" class="calc_selector form_control" >
            <option  value="USD">USD</option>
            <option  value="COP">COP</option>
            <option  value="MXN">MXN</option>
            <option  value="ARS">ARS</option>
            <option  value="PEN">PEN</option>
            <option  value="BRL">BRL</option>
            <option  value="CLP">CLP</option>
        </select>
        <span class="calc_text">)</span>
        <br>
        <br>
        <br>
        <span class="blue-text-13"><b>Resultado:&nbsp;</b></span><input class="form_control" id ="signature_generated" name = "signature_generated" value = ""  readonly />
    </table>
    <br>
    <table width="50%"  border="0" cellspacing="2" cellpadding="2">
        <input type="button" name="signature_generate" id="signature_generate" value="Gerar assinatura" >
        <input type="button" name="signature_generate_again" id="signature_generate_again" value="Gerar nova assinatura" >
    </table>
</form>
</div>
</span>
</div>
<!-- End of signature generator -->
