---
title: "Formulário de Pagamento"
linkTitle: "Formulário de Pagamento"
date: 2021-03-29T12:15:27-05:00
description: >
  Nesta seção, você aprenderá como enviar dados de transações para o gateway de pagamento da PayU utilizando um formulário HTML.
weight: 10
tags: ["subtopic"]
---
<script src="/js/searchcodes.js"></script>

Este guia explica como criar um formulário com os campos obrigatórios e enviar os dados para o nosso sistema através do método HTTP POST.

## Observações {#considerations}

* Verifique se você tem `merchantId`, `accountId` e `apiKey` corretos.
* Use um código de referência de pagamento único para cada transação.
* Evite incluir espaços nos valores dos parâmetros.
* Limite os valores decimais a duas casas.
* Exclua caracteres especiais do parâmetro `referenceCode`.

## Parâmetros {#parameters}

Você pode incluir os seguintes parâmetros no formulário de pagamento.

<details>

<summary>Parâmetros</summary>

<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>

<br>

<div class="variables"></div>

| Campo | Tipo | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| `lng` | Alfanumérico | 3 | Idioma da interface de pagamento. <br>[Veja os idiomas compatíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Não |
| `merchantId` | Numérico | 12 | ID exclusivo atribuído à sua loja no sistema da PayU. Você pode encontrar este número no e-mail de criação da conta. | Sim |
| `accountId` | Numérico | 6 | ID associado à conta do usuário em cada país. Determina os métodos de pagamento disponíveis no país correspondente. | Sim |
| `algorithmSignature` | Alfanumérico | 255 | Algoritmo de hash usado para gerar a assinatura digital (campo `signature`). Opções disponíveis: `MD5`, `SHA`, `SHA256` ou `HMAC-SHA256`. | Não |
| `signature` | Alfanumérico | 255 | Assinatura digital da transação. Consulte [Assinatura para o formulário de pagamento]({{< ref "payment-form.md#signature-for-payment-form" >}}) para instruções. | Sim |
| `sourceUrl` | Alfanumérico | 255 | URL de origem onde o botão de pagamento do lojista está localizado. | Não |
| `responseUrl` | Alfanumérico | 255 | URL da página de resposta. | Não |
| `confirmationUrl` | Alfanumérico | 255 | URL da página de confirmação. | Não |
| `expirationDate` | Alfanumérico | 19 | Data de vencimento para pagamentos em dinheiro no formato `YYYY-MM-DD HH:mm:ss`. Deve estar dentro do prazo permitido (15 dias na Argentina, 7 dias nos demais países). | - |
| `paymentMethods` | Alfanumérico | 255 | Lista de métodos de pagamento habilitados para a transação. <br>Separar por vírgulas sem espaços, ex: `VISA,MASTERCARD`.<br> Parcelas podem ser incluídas com hífens, ex: `VISA-1-3,MASTERCARD-3-5-9`. <br>[Veja os métodos disponíveis por país na coluna `paymentMethod parameter`]({{< ref "select-your-payment-method.html" >}}). | Não |
| `selectedPaymentMethod` | Alfanumérico | 255 | Método de pagamento pré-selecionado ao acessar o link de pagamento. | Não |
| `paymentMethodsDescription` | Alfanumérico | 255 | Descrição dos métodos de pagamento aceitos e Bins para a transação. | Não |
| `iin` | Alfanumérico | 2048 | Lista de Bins permitidos durante o processo de pagamento, separados por vírgulas. _Apenas lojistas que validam assinaturas podem usar este parâmetro._ | Não |
| `pseBanks` | Alfanumérico | 255 | Lista de códigos de bancos habilitados para pagamentos via PSE. | Não |
| `partnerId` | Alfanumérico | 255 | Campo opcional para identificar o parceiro (ex.: ZOOZ). | Não |
| `template` | Alfanumérico | 255 | Template a ser utilizado na página de pagamento. | Não |
| `extra1` | Alfanumérico | 255 | Campo adicional para enviar informações extras da compra. | Não |
| `extra2` | Alfanumérico | 255 | Campo adicional para enviar informações extras da compra. | Não |
| `extra3` | Alfanumérico | 255 | Campo adicional para enviar informações extras da compra. | Não |
| `extra4` | Alfanumérico | 255 | Campo adicional para enviar informações extras da compra. | Não |
| `displayShippingInformation` | Numérico | 1 | Defina como `1` para solicitar dados de envio ou `0` para ocultar. | Não |
| `additionalDeliveryDays` | Numérico | 5 | Dias adicionais para entrega, retornados na API como `result.payload.transactions.extraParameters.ADDITIONAL_DELIVERY_DAYS`. | Não |
| `displayBuyerComments` | Numérico | 1 | Defina como `1` para permitir comentários do comprador, ou `0` para ocultar. Aparece na resposta como `result.payload.transactions.extraParameters.DISPLAY_BUYER_COMMENTS`. | Não |
| `buyerCommentsLabel` | Alfanumérico | 255 | Rótulo para o campo de comentários do comprador, retornado como `result.payload.transactions.extraParameters.BUYER_COMMENTS_LABEL`. | Não |
| `isCashOnDeliveryApply` | Numérico | 1 | Defina como `1` para permitir pagamento na entrega, ou `0` para desativar. | Não |
| `test` | Numérico | 1 | Indica se a transação está em modo teste (`1`) ou produção (`0`). | Não |
| `description` | Alfanumérico | 255 | Descrição da venda. | Sim |
| `referenceCode` | Alfanumérico | 255 | Referência única para a venda ou pedido. Deve ser única para cada transação. | Sim |
| `amount` | Numérico | 10 | Valor total da transação. Pode conter até duas casas decimais, ex.: 10000.00 ou 10000. | Sim |
| `tax` | Numérico | 10.2 | Valor do imposto (IVA). Na Colômbia, se não informado, aplica-se 19% automaticamente. Se isento, defina como `0`. | Sim |
| `taxReturnBase` | Numérico | 10.2 | Valor base usado para calcular o IVA. Se o produto for isento, defina como `0`. | Sim |
| `administrativeFee` | Numérico | 10.2 | Taxa administrativa da transação. | Não |
| `taxAdministrativeFee` | Numérico | 10.2 | Imposto sobre a taxa administrativa. | Não |
| `taxAdministrativeFeeReturnBase` | Numérico | 10.2 | Base de cálculo para o imposto sobre a taxa administrativa. | Não |
| `discount` | Numérico | 10.2 | Desconto aplicado à venda. | Não |
| `currency` | Alfanumérico | 3 | Moeda utilizada no pagamento. Na Colômbia, a conciliação é feita em pesos colombianos pela taxa representativa do dia. <br>[Veja moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| `airline` | Alfanumérico | 4 | Código da companhia aérea para transações com passagens. | Não |
| `additionalValue` | Numérico | 10.2 | Valor adicional incluído na venda. | Não |
| `payerFullName` | Alfanumérico | 50 | Nome completo do pagador, usado no formulário do cartão. | Sim |
| `payerEmail` | Alfanumérico | 255 | E-mail do pagador. | Sim |
| `payerOfficePhone` | Alfanumérico | Máx. 20 | Telefone comercial do pagador. | Não |
| `payerPhone` | Alfanumérico | Máx. 20 | Telefone fixo do pagador. | Sim |
| `payerMobilePhone` | Alfanumérico | Máx. 20 | Celular do pagador. | Não |
| `payerDocumentType` | Alfanumérico | 25 | Tipo de documento do pagador, ex.: `CC`, `DNI`, `NIT`, `Passaporte`. | Sim |
| `payerDocument` | Alfanumérico | 25 | Documento de identidade do pagador. | Sim |
| `billingCountry` | Alfanumérico | 2 | Código do país (ISO) do endereço de cobrança. | Não |
| `payerState` | Alfanumérico | N/A | Estado do pagador no padrão ISO 3166 (ex.: SP para São Paulo). | Não |
| `billingCity` | Alfanumérico | 50 | Cidade do endereço de cobrança. | Não |
| `billingAddress` | Alfanumérico | 255 | Endereço de cobrança. | Não |
| `billingAddress2` | Alfanumérico | 255 | Segunda linha do endereço de cobrança. | Não |
| `billingAddress3` | Alfanumérico | 255 | Terceira linha do endereço de cobrança. | Não |
| `zipCode` | Alfanumérico | 20 | CEP do endereço de cobrança ou entrega. | Não |
| `buyerFullName` | Alfanumérico | 150 | Nome completo do comprador. | Sim |
| `buyerEmail` | Alfanumérico | 255 | E-mail do comprador, usado para notificações da transação. | Sim |
| `buyerDocumentType` | Alfanumérico | 25 | Tipo de documento do comprador, ex.: `CC`, `DNI`, `NIT`, `Passaporte`. | Sim |
| `buyerDocument` | Alfanumérico | 25 | Número do documento do comprador. | Sim |
| `officeTelephone` | Alfanumérico | Máx. 20 | Telefone comercial do comprador. | Não |
| `telephone` | Alfanumérico | Máx. 20 | Telefone residencial do comprador. | Sim |
| `mobilePhone` | Alfanumérico | Máx. 20 | Celular do comprador, usado no formulário do cartão e como contato. | Não |
| `shippingCountry` | Alfanumérico | 2 | Código do país (ISO) do endereço de entrega. <br><sup>*</sup>Obrigatório se houver envio de produto. <br>[Veja países com processamento]({{< ref "response-codes-and-variables.html#processing-countries" >}}). | Sim* |
| `shippingState` | Alfanumérico | N/A | Estado de entrega no padrão ISO 3166 (ex.: SP para São Paulo). | Não |
| `shippingCity` | Alfanumérico | 50 | Cidade para entrega do produto ou serviço. <br><sup>*</sup>Obrigatório se houver envio. | Sim* |
| `shippingAddress` | Alfanumérico | 255 | Endereço de entrega do produto ou serviço. <br><sup>*</sup>Obrigatório se houver envio. | Sim* |
| `shippingAddress2` | Alfanumérico | 255 | Segunda linha do endereço de entrega. | Não |
| `shippingAddress3` | Alfanumérico | 255 | Terceira linha do endereço de entrega. | Não |
| `payerShippingPostalCode` | Alfanumérico | N/A | Código postal do endereço de entrega. | Não |

</details>

### Considerações sobre os parâmetros {#parameters-considerations}

* O parâmetro `tax` representa o IVA, aplicável em certos países, enquanto `taxReturnBase` é o valor base para calcular o IVA. Se o seu produto é isento de impostos, defina ambas as variáveis como `0` (`tax=0`, `taxReturnBase=0`)
* Quando alguns produtos são tributados e outros não, calcule e defina os valores conforme mostrado na tabela abaixo para garantir o envio correto para a plataforma de pagamento.

#### Exemplo de cálculo de IVA:

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

## Exemplo de campos em HTML {#html-fields-example}

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

## Exemplo de formulário de pagamento

Este exemplo de formulário de pagamento dinâmico é projetado para testes em nosso ambiente sandbox. Ele oferece uma visão dos campos e funcionalidades que você pode incorporar em seus próprios formulários de pagamento. Abaixo está uma visão geral de suas principais funcionalidades:

* **Geração de assinatura de transação:** O formulário calcula uma string de assinatura usando a chave da API PayU LATAM, o ID do comerciante e várias entradas do usuário, como método de pagamento e informações bancárias. Esta assinatura é criptografada usando um algoritmo especificado (MD5, SHA, SHA256 ou HMAC-SHA256) para garantir transações seguras. Para mais detalhes, consulte [Assinatura para formulário de pagamento]({{< ref "Payment-form.md#signature-for-payment-form" >}}).

* **Preenchimento dinâmico do formulário:** Com base no país e na conta selecionados, o formulário preenche automaticamente vários campos, como tipos de documento, informações de cobrança (por exemplo, cidade, estado, CEP) e informações do pagador. Isso permite que o formulário se ajuste aos requisitos de dados específicos da região (por exemplo, CPF para o Brasil ou CUIT para a Argentina).

* **Gestão de visibilidade:** Várias funções são incluídas para mostrar ou ocultar campos dinamicamente, com base no tipo de conta selecionado. Isso é particularmente útil para lidar com casos específicos, como bancos PSE na Colômbia ou campos adicionais para companhias aéreas e agências de viagens.

* **Tratamento das informações de envio:** O formulário permite que o usuário use as informações de cobrança como endereço de envio ou especifique detalhes de envio separados. Se o usuário não selecionar uma opção de envio alternativa, as informações de cobrança são usadas por padrão.

* **Ouvintes de eventos e envio de formulário:** A página pode usar ouvintes de eventos para atualizar os campos do formulário quando certos valores de entrada (por exemplo, ID da conta) mudam e garante que o processo de envio do formulário respeite as entradas do usuário, com opções alternativas configuradas (por exemplo, uso das informações de cobrança se nenhuma opção de envio for selecionada).

<div>
{{< paymentform/webcheckout_en >}}
</div>

<br>
<br>

## Assinatura para formulário de pagamento {#signature-for-payment-form}

Utilize uma assinatura para validar cada pagamento e garantir sua autenticidade. A integração gera a assinatura criptografando uma string com um dos algoritmos suportados: `MD5`, `SHA1`, `SHA256`, `HMAC-SHA256`.

Construa a string no seguinte formato:

```HTML
apiKey~merchantId~referenceCode~amount~currency
```

{{% alert title="Nota" color="info"%}}

Se sua forma de pagamento inclui as variáveis `paymentMethods`,` iin` ou `pseBanks`, você deve concatená-las exatamente nesta ordem:

```HTML
apiKey~merchantId~referenceCode~amount~currency~paymentMethods~iin~pseBanks
```

{{% /alert %}}

Por exemplo, com os seguintes dados:

```HTML
apiKey: 4Vj8eK4rloUd272L48hsrarnUA
merchantId: 508029
referenceCode: TestPayU
amount: 20000
currency: COP
```

<br>

A string base para criptografar a assinatura será:

```HTML
4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU~20000~COP
```

<p>

* Criptografado com `MD5`:

    ```HTML
    7ee7cf808ce6a39b17481c54f2c57acc
    ```

<p>

* Criptografado com `SHA1`:

    ```HTML
    fa890d3f94e12b5cdb62e8771453b99b78e7ccdc
    ```

<p>

* Criptografado com `SHA256`:

    ```HTML
    af3899a22336b79db46006491d15813158826f944599bf3bf601e2327f898022
    ```

<p>

* Criptografada com `HMAC-SHA256` (utilizando o `apiKey` como chave secreta):

    ```HTML
    eaf61598d5593b366086c9a00aa5746ccad1a6e9b209a1a242fce224202b2b36
    ```

<p>

* Criptografada com `HMAC-SHA256` (utilizando uma chave secreta personalizada, neste exemplo: `secret123`):

    ```HTML
    9b269405c01c725fcc5d1667a2e1166a810fd34b5a5ac82295d0f59fddf1c472
    ```

{{% alert title="Nota" color="info"%}}

Ao criptografar com HMAC-SHA256, você pode usar o seu `apiKey` como chave secreta ou fornecer uma chave específica. Independentemente da sua escolha, certifique-se de que o `apiKey` seja o primeiro parâmetro na string base usada para gerar a assinatura:

```HTML
apiKey~merchantId~referenceCode~amount~currency
```

{{% /alert %}}

### Gerar uma assinatura {#generate-a-signature}

Use este gerador para criar uma assinatura com qualquer um dos métodos de criptografia disponíveis.

<div>
{{< paymentform/signaturegenerator_en >}}
</div>
