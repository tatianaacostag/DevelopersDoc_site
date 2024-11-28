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
| merchantId | Número | 12 | Número de identificação da sua loja no sistema PayU. Você encontrará este número no e-mail de criação de conta. | Sim | 
| referenceCode | Alfanumérico | 255 | Referência da venda ou ordem. Deve ser exclusiva para cada transação enviada ao sistema. Normalmente, é uma forma de identificar as solicitações enviadas para a plataforma de pagamento. | Sim | 
| accountId | Número | 6 | ID da conta do usuário para cada país associado à loja. Esta variável é usada para exibir os métodos de pagamento disponíveis para este país. | Sim | 
| description | Alfanumérico | 255 | Descrição da venda. | Sim | 
| currency | Alfanumérico | 3 | A respectiva moeda na qual o pagamento é feito. O processo de reconciliação é realizado em pesos na taxa representativa do dia.<br>[Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim | 
| amount | Número | 10 | Valor total da transação. Ele pode conter dois dígitos decimais. Exemplo 10000.00 ou 10000. | Sim | 
| tax | Número | 10.2 | Valor do IVA da transação.<br>Na Colômbia, se nenhum IVA for enviado, o sistema aplica 19% automaticamente. Ele pode conter dois dígitos decimais, por exemplo 19000.00.<br>Se o produto ou serviço for isento de IVA, atribua `0` a esta variável. | Sim | 
| discount | Número | 10.2 | Discount value applied to the sale. | Não | 
| taxReturnBase | Número | 10.2 | Valor base para cálculo do VAT.<br>Se o produto ou serviço for isento de IVA, atribua `0` a esta variável. | Sim | 
| additionalValue | Número | 10.2 | Valor adicional da venda. | Não | 
| signature | Alfanumérico | 255 | Assinatura digital criada para cada transação. Consultar [Assinatura para forma de pagamento]({{< ref "payment-form.md#signature-for-payment-form" >}}) para aprender como gerar. | Sim | 
| algorithmSignature | Alfanumérico | 255 | Algoritmo de criptografia da assinatura digital (campo `signature`). Os três algoritmos disponíveis são: `MD5`, `SHA` e `SHA256`. | Não | 
| test | Número | 1 | Indica se a transação está em modo de teste ou produção. Definir `1` para teste e `0`para produção. | Não | 
| lng | Alfanumérico | 3 | Idioma no qual a plataforma de pagamento deve ser exibida.<br>[Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Não | 
| extra1 | Alfanumérico | 255 | Campo adicional para envio de informações sobre a compra. | Não | 
| extra2 | Alfanumérico | 255 | Campo adicional para envio de informações sobre a compra. | Não | 
| extra3 | Alfanumérico | 255 | Campo adicional para envio de informações sobre a compra. | Não | 
| template | Alfanumérico | 255 | Modelo para a página de pagamento. | Não | 
| responseUrl | Alfanumérico | 255 | URL da página de resposta. | Não | 
| confirmationUrl | Alfanumérico | 255 | URL da página de resposta. | Não | 
| sourceUrl | Alfanumérico | 255 | URL de origem das transações do comércio. É aqui que o botão de pagamento está localizado. | Não | 
| airline | Alfanumérico | 4 | Código da companhia aérea. | Não | 
| billingAddress | Alfanumérico | 255 | Endereço de correspondência. | Não | 
| shippingAddress | Alfanumérico | 255 | O endereço de entrega da mercadoria.<br><sup>\*</sup> Obrigatório se sua loja enviar o produto. | Sim* | 
| billingCity | Alfanumérico | 50 | Cidade associada ao endereço de cobrança. | Não | 
| shippingCity | Alfanumérico | 50 | A cidade de entrega da mercadoria.<br><sup>\*</sup> Obrigatório se sua loja enviar o produto. | Sim* | 
| zipCode | Alfanumérico | 20 | Código postal. | Não | 
| billingCountry | Alfanumérico | 2 | Código ISO do país associado ao endereço de cobrança. | Não | 
| shippingCountry | Alfanumérico | 2 | O código ISO do país associado ao endereço de entrega da mercadoria.<br><sup>\*</sup> Obrigatório se sua loja enviar o produto.<br>[Veja os países de processamento]({{< ref "response-codes-and-variables.html#processing-countries" >}}). | Sim* | 
| buyerEmail | Alfanumérico | 255 | Campo que contém o e-mail do comprador para notificar o resultado da transação por e-mail. Recomenda-se validar se este campo foi fornecido no formulário. | Sim | 
| telephone | Alfanumérico | Máx. 20 | O telefone residencial do comprador. | Sim | 
| officeTelephone | Alfanumérico | Máx. 20 | O telefone do comprador em horário comercial. | Não | 
| mobilePhone | Alfanumérico | Máx. 20 | O número do celular do comprador. Este valor será usado para preencher o formulário do cartão de crédito e será o telefone de contato. | Não | 
| buyerFullName | Alfanumérico | 150 | O nome completo do comprador. | Sim | 
| paymentMethods | Alfanumérico | 255 | Lista das formas de pagamento habilitadas no processo de pagamento.<br>Esta lista deve ser separada por vírgula e sem espaços em branco. Por exemplo: `VISA,MASTERCARD`.<br>YVocê pode incluir parcelas para as formas de pagamento adicionando-as usando hifens. Exemplo: `VISA-1-3,MASTERCARD-3-5-9`.<br>[Veja os métodos de pagamento disponíveis para seu país na coluna `Parâmetro paymentMethod`]({{< ref "select-your-payment-method.html" >}}). | Não | 
| administrativeFee | Número | 10.2 | Valor da taxa administrativa. | Não | 
| taxAdministrativeFee | Número | 10.2 | Valor do imposto da taxa administrativa. | Não | 
| taxAdministrativeFeeReturnBase | Número | 10.2 | Valor base para cálculo do imposto da taxa administrativa. | Não | 
| payerEmail | Alfanumérico | 255 | E-mail do pagador. | Sim | 
| payerPhone | Alfanumérico | Máx. 20 | Número de telefone do pagador. | Sim | 
| payerOfficePhone | Alfanumérico | Máx. 20 | Número de telefone do local de trabalho do pagador. | Não | 
| payerMobilePhone | Alfanumérico | Máx. 20 | Número do celular do pagador. | Não | 
| expirationDate | Alfanumérico | 19 | Prazo de validade das transações de pagamentos da Dinheiro. Formato:  `YYYY-MM-DD HH:mm:ss`.<br>Este valor deve ser inferior ao número padrão de dias para o pagamento à vista (15 dias para a Argentina e 7 dias para os demais países). | - | 
| payerFullName | Alfanumérico | 50 | O nome do pagador. Este valor será usado para preencher o formulário do cartão de crédito. | Sim | 
| payerDocument | Alfanumérico | 25 | O número de identificação do comprador. Este valor será usado para preencher o formulário do cartão de crédito. | Sim | 
| payerDocumentType | Alfanumérico | 25 | O tipo de identificação do comprador. Este valor será usado para preencher o formulário do cartão de crédito. | Sim | 
| iin | Alfanumérico | 2048 | Lista de Bins admitidos durante o processo de pagamento (separados por vírgula).<br>_Este parâmetro só pode ser utilizado por estabelecimentos que validem assinatura._ | Não |
| paymentMethodsDescription | Alfanumérico | 255 | Descrição dos meios de pagamento e Caixas admitidas durante o processo de pagamento. | Não |
| pseBanks | Alfanumérico | 255 | Lista de códigos bancários habilitados no processo de pagamento via PSE.<br>Esta lista deve ser separada por vírgula e sem espaços em branco. | Não |
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
