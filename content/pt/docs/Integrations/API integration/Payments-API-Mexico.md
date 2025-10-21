---
title: "API de Pagamentos - México"
linkTitle: "API de Pagamentos - México"
date: 2021-05-03T15:48:08-05:00
description: >
  A API de Pagamentos para o México permite que você integre de forma eficiente as capacidades de processamento de pagamentos da PayU na sua plataforma de compras online. Por meio dessa API, as lojas podem oferecer aos seus clientes uma ampla variedade de métodos de pagamento, incluindo dinheiro, cartões de crédito, cartões de débito, transferências bancárias e referências bancárias.
weight: 20
tags: ["subtopic"]
---

<script src="/js/searchcodes.js"></script>

Este guia mostra como aproveitar esses serviços para melhorar a experiência de pagamento dos seus clientes, oferecendo opções de pagamento flexíveis e seguras adaptadas ao mercado local.

{{% alert title="Nota" color="info"%}}

Para integrar a API de Pagamentos, direcione suas solicitações para as seguintes URLs de acordo com o ambiente correspondente:
* Testes: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Produção: ```https://api.payulatam.com/payments-api/4.0/service.cgi```

{{% /alert %}}

## Funcionalidades disponíveis {#available-features}

A API de Pagamentos inclui as seguintes funcionalidades:

* [Enviar transações usando cartões de crédito ou débito]({{< ref "#submit-transactions-using-credit-or-debit-cards" >}})
* [Enviar transações usando Google Pay]({{< ref "#submit-transactions-using-google-pay" >}})
* [Enviar transações usando dinheiro]({{< ref "#submit-transactions-using-cash" >}})
* [Enviar transações usando transferência bancária]({{< ref "#submit-transactions-using-bank-transfer" >}})
* [Enviar transações usando referência bancária]({{< ref "#submit-transactions-using-bank-reference" >}})
* [Incluir informações do registro de nome de passageiro]({{< ref "#include-passenger-name-record-information-optional" >}})
* [Consulta de Métodos de pagamento disponíveis]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Nota" color="info"%}}

Para confirmar o status de uma transação, você pode usar:
* Navegue até a URL definida na variável `transaction.notifyUrl` ou na opção _**URL de confirmação**_ localizada no Módulo PayU em _**Configuração**_ > _**Configuração técnica**_.
* Use o [API ou SDK de Consultas]({{< ref "Queries.md" >}}).

{{% /alert %}}

## Enviar transações usando cartões de crédito ou débito {#submit-transactions-using-credit-or-debit-cards}

Este método permite processar os pagamentos efetuados pelos seus clientes com cartões de crédito ou débito. Para o México, você pode executar os fluxos de duas etapas (**Autorização**, **Captura**) e fluxos de uma etapa (**Cobrança**). Para obter mais informações, consulte [Fluxos de pagamento]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Nota" color="info"%}}

Os fluxos de duas etapas são compatíveis apenas com Mastercard e Visa.

{{% /alert %}}

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response}

<details>
<summary><b>Solicitação</b></summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| `language` | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx:32 | Definir `SUBMIT_TRANSACTION`. | Sim |
| `test` (JSON)<hr>`isTest` (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| `merchant` | Objeto |  | Este objeto contém os dados de autenticação. | Sim |
| `merchant > apiLogin` | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `merchant > apiKey` | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `transaction` | Objeto |  | Este objeto contém os dados da transação. | Sim |
| `transaction > order` | Objeto |  | Este objeto contém os dados da ordem. | Sim |
| `transaction > order > accountId` | Número |  | Identificador da sua conta. | Sim |
| `transaction > order > referenceCode` | Alfanumérico | Mín:1 Máx:255 | Representa o identificador da ordem em seu sistema. | Sim |
| `transaction > order > description` | Alfanumérico | Mín:1 Máx:255 | Descrição da ordem. | Sim |
| `transaction > order > language` | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| `transaction > order > notifyUrl` | Alfanumérico | Máx:2048 | URL de confirmação da ordem. | Não |
| `transaction > order > partnerId` | Alfanumérico | Máx:255 | ID de parceiro no PayU. | Não |
| `transaction > order > signature` | Alfanumérico | Máx:255 | A assinatura associada ao formulário. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| `transaction > order > shippingAddress` | Objeto |  | Endereço para envio. | Não |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Máx:100 | Endereço: Linha 1. | Não |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Máx:100 | Endereço: Linha 2. | Não |
| `transaction > order > shippingAddress > city` | Alfanumérico | Máx:50 | Endereço: cidade. | Não |
| `transaction > order > shippingAddress > state` | Alfanumérico | Máx:40 | Endereço: estado. | Não |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | Endereço: país. | Não |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Máx:8 | Endereço: Código postal. | Não |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. | Não |
| `transaction > order > buyer` | Objeto |  | Informações do comprador. | Sim |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| `transaction > order > buyer > fullName` | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Máx:255 | E-mail do comprador. | Sim |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do comprador. | Sim |
| `transaction > order > buyer > shippingAddress` | Alfanumérico |  | Endereço de envio do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País do endereço do comprador no formato ISO 3166 alpha-2. | Sim |
| `transaction > order > buyer > shippingAddress > postalCode` | Número | Máx:20 | Código postal do endereço do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > phone` | Número | Máx:20 | Número de telefone do endereço do comprador. | Sim |
| `transaction > order > additionalValues >` | Objeto | 64 | Valor da ordem ou seus valores associados. | Sim |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Valor da transação. | Sim |
| `transaction > order > additionalValues > TX_VALUE > value` | Número | 12, 2 | Especifica o valor da transação. Este valor pode ter duas casas decimais (por exemplo `10000.00` ou `10000`). | Sim |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| `transaction > order > additionalValues > TX_TAX` | Alfanumérico | 64 | Total do Imposto sobre Valor Agregado (IVA). | Sim |
| `transaction > order > additionalValues > TX_TAX > value` | Número | 12, 2 | Especifica o valor do IVA.  | Não |
| `transaction > order > additionalValues > TX_TAX > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alfanumérico | 64 | Valor base para cálculo do VAT.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais.  | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Número | 12, 2 | Especifica o valor base da transação. | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > creditCardTokenId` | Alfanumérico |  | Incluir este parâmetro quando a transação for feita com um cartão tokenizado, no lugar das informações do cartão de crédito. Para obter mais informações, consulte [API de tokenização]({{< ref "Tokenization-API.md" >}}) | Não |
| `transaction > creditCard` | Objeto |  | Informações do cartão de crédito. Este objeto e seus parâmetros são obrigatórios quando o pagamento é realizado com cartão de crédito não tokenizado. | Não |
| `transaction > creditCard > number` | Alfanumérico | Mín:13 Máx:20 | Número do cartão de crédito. | Não |
| `transaction > creditCard > securityCode` | Alfanumérico | Mín:1 Máx:4 | Código de segurança do cartão de crédito (CVC2, CVV2, CID). | Não |
| `transaction > creditCard > expirationDate` | Alfanumérico | 7 | Data de validade do cartão de crédito. Formato `YYYY/MM`. | Não |
| `transaction > creditCard > name` | Alfanumérico | Mín:1 Máx:255 | Nome do titular exibido no cartão de crédito. | Não |
| `transaction > creditCard > processWithoutCvv2` | Boolean | Máx:255 | Permite processar transações sem incluir o código de segurança do cartão de crédito. Sua loja precisa da autorização do PayU antes de usar este recurso. | Não |
| `transaction > debitCard` | Objeto |  | Informações do cartão de débito. Este objeto e seus parâmetros são obrigatórios quando o pagamento é realizado com cartão de débito. | Não |
| `transaction > debitCard > number` | Alfanumérico | Mín:13 Máx:20 | Número do cartão de débito. | Não |
| `transaction > debitCard > securityCode` | Alfanumérico | Mín:1 Máx:4 | Código de segurança do cartão de débito (CVC2, CVV2, CID). | Não |
| `transaction > debitCard > expirationDate` | Alfanumérico | 7 | Data de validade do cartão de débito. Formato `YYYY/MM`. | Não |
| `transaction > debitCard > name` | Alfanumérico | Mín:1 Máx:255 | Nome do titular exibido no cartão de débito. | Não |
| `transaction > payer` | Objeto |  | Informações do pagador. Devido à regulamentação tributária, é obrigatório o envio dos parâmetros `payer.billingAddress.postalCode` e `payer.birthdate`. | Sim |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Não |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nome do pagador, que deve corresponder ao nome enviado no parâmetro `transaction.creditCard.name` para pagamentos com cartão de crédito. | Não |
| `transaction > payer > billingAddress` | Objeto |  | Endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Endereço de cobrança linha 1. | Não |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Não |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Data de nascimento do pagador. Formato `YYYY-MM-DD`. | Sim |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do pagador. | Não |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do pagador. | Não |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sim |
| `transaction > type` | Alfanumérico | 32 | Definir este valor de acordo com a transação que você quer:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` para fluxos de uma etapa.</li></ul> | Sim |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecione um método de pagamento com cartão de crédito ou débito válido. [Veja os métodos de pagamento disponíveis no México]({{< ref "select-your-payment-method.html#mexico" >}}). | Sim |
| `transaction > paymentCountry` | Alfanumérico | 2 | Definir `MX` para o México. | Sim |
| `transaction > deviceSessionId` | Alfanumérico | Máx:255 | Identificador da sessão do dispositivo onde o cliente faz a transação. Para obter mais informações, consulte [este tópico]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |
| `transaction > cookie` | Alfanumérico | Máx:255 | Cookie armazenado pelo dispositivo onde o cliente faz a transação. | Sim |
| `transaction > userAgent` | Alfanumérico | Máx:1024 | O agente do usuário do navegador onde o cliente faz a transação. | Sim |
| `transaction > extraParameters` | Objeto |  | Parâmetros ou dados adicionais associados a pedido. O tamanho máximo de cada nome _extraParameters_ é de 64 caracteres.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | Não |
| `transaction > extraParameters > EXTRA1` | Alfanumérico | Máx:255 | Campo adicional para enviar informações extras sobre a compra. | Não |
| `transaction > extraParameters > EXTRA2` | Alfanumérico | Máx:255 | Campo adicional para enviar informações extras sobre a compra. | Não |
| `transaction > extraParameters > EXTRA3` | Alfanumérico | Máx:255 | Campo adicional para enviar informações extras sobre a compra. | Não |
| `transaction > threeDomainSecure` | Objeto | | Este objeto contém as informações do 3DS 2.0. | Não |
| `transaction > threeDomainSecure > embedded` | Boolean |  | Definir `true` se você deseja usar um MPI integrado para o processo de autorização. Por padrão, este valor é definido como `false`. | Não |
| `transaction > threeDomainSecure > eci` | Número | Máx:2 | Indicador de comércio eletrônico.<br>Valor fornecido pelos servidores de diretório mostrando a tentativa de autenticação.<br>Este parâmetro é obrigatório quando `transaction.threeDomainSecure.embedded` is `false` e `transaction.threeDomainSecure.xid` for definido. | Não |
| `transaction > threeDomainSecure > cavv` | Alfanumérico | Máx:28 | Valor de verificação de autenticação do titular do cartão.<br>Código do criptograma usado na autenticação da transação em Base64.<br>Dependendo dos códigos ECI específicos estabelecidos pela rede de processamento, este valor pode ser opcional. | Não |
| `transaction > threeDomainSecure > xid` | Alfanumérico | Máx:28 | Código do criptograma usado na autenticação da transação em Base64.<br>Este parâmetro é obrigatório quando `transaction.threeDomainSecure.embedded` é `false` e `transaction.threeDomainSecure.eci` for definido. | Não |
| `transaction > threeDomainSecure > directoryServerTransactionId` | Alfanumérico | Máx:36 | ID da transação gerada pelo Servidor de Diretório durante a autenticação. | Não |
<!--| transaction > monthsWithoutInterest |  |  | Information when paying the purchase using Months Without Interests.<br>Este parâmetro é obrigatório quando you want to use [Months Without Interests (Meses Sin Intereses - MSI) feature]({{< ref "Promotions.md#months-without-interest-msi---meses-sin-intereses" >}}). | Não |
| transaction > monthsWithoutInterest > months | Número | Máx:2 | Número of Months Without Interests for the purchase. The available values are 3, 6, 9, ou 12.<br>Este parâmetro é obrigatório quando you want to use [Months Without Interests (Meses Sin Intereses - MSI) feature]({{< ref "Promotions.md#months-without-interest-msi---meses-sin-intereses" >}}). | Não |
| transaction > monthsWithoutInterest > bank` | Alfanumérico | Máx:255 | Issuing bank of the credit card used to pay the purchase using Months Without Interests.<br>Este parâmetro é obrigatório quando you want to use [Months Without Interests (Meses Sin Intereses - MSI) feature]({{< ref "Promotions.md#months-without-interest-msi---meses-sin-intereses" >}}). | Não |-->

</details>

<details>
<summary><b>Resposta</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| `code` | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| `transactionResponse` | Objeto |  | Os dados de resposta. |
| `transactionResponse > orderId` | Número |  | O ID de ordem gerado ou existente no PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | O identificador da transação no PayU. |
| `transactionResponse > state` | Alfanumérico | Máx:32 | O status da transação. |
| `transactionResponse > responseCode` | Alfanumérico | Máx:64 | O código de resposta associado ao status. |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx:255 | O código de resposta fornecido pela rede financeira. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx:255 | A mensagem de erro fornecida pela rede financeira. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx:32 | O código de rastreamento fornecido pela rede financeira. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx:12 | O código de autorização fornecido pela rede financeira. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| `transactionResponse > operationDate` | Date |  | Data de criação da resposta no sistema PayU. |
| `transactionResponse > extraParameters` | Objeto |  | Parâmetros ou dados adicionais associados à resposta. <br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| `transactionResponse > additionalInfo` | Objeto |  | Informações adicionais associadas à resposta. Este objeto segue a mesma estrutura que `transactionResponse.extraParameters`. |

</details>

#### Observações {#considerations}

* Os fluxos de duas etapas estão disponíveis apenas para Mastercard e Visa.
* Para pagamentos com Promoções, envie os parâmetros extras  `INSTALLMENTS_NUMBER` e `PROMOTION_ID` com o número de parcelas selecionadas e o ID da promoção. Consultar a [API de promoções]({{< ref "Promotions.md" >}}) para obter mais informações.
* Para pagamentos com Meses sem juros  (Meses Sin Intereses - MSI), envie o parâmetro extra `INSTALLMENTS_NUMBER` com o número de meses. Consulte [MSI]({{< ref "Promotions.md#months-without-interests-msi---meses-sin-intereses" >}}) para obter mais informações.
* Os bancos disponíveis para MSI são: BANAMEX, BANCO REGIONAL DE MONTERREY S.A, BANCOPPEL, BANCO AZTECA, SCOTIABANK, HSBC, INBURSA, BANCA MIFEL SA, BANCO MULTIVA, BAJIO, CI BANCO, Afirme, Banregio, Banjercito, Banorte, Famsa, Invex, Premium Card Liverpool, Santander e Bancomer.
* Ao usar MSI, promoções ou parcelamento, sempre exibir a frase **“PAGOS DIFERIDOS”** durante o processo de pagamento.
* Quando forem aplicadas parcelas (taxas assumidas pelo pagador), exibir o valor original da transação, o valor total após as taxas, a quantidade de parcelas e o valor por parcela, incluindo a taxa extra.
* O recurso de promoções está disponível apenas para [fluxos de uma etapa]({{< ref "Payments.md#payment-flows" >}}).
* Para pagamentos com tokens de cartão de crédito, inclua os parâmetros `transaction.creditCardTokenId` e `transaction.creditCard.securityCode` (se processar com código de segurança) substituindo as informações do cartão de crédito. Para obter mais informações, consulte [API de tokenização]({{< ref "Tokenization-API.md" >}}).
* Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas. Depois que esse recurso for habilitado para você, envie no pedido a variável `creditCard.processWithoutCvv2` como true e remova a variável `creditCard.securityCode`.
* A variável `transaction.threeDomainSecure` não substitui as informações do cartão nem qualquer um dos campos obrigatórios da transação. Este objeto é adicional e não obrigatório.
* A variável `transaction.threeDomainSecure` corresponde a um cenário _passthrough_ onde a loja faz a autenticação por conta própria.

### Autorização {#authorization}

Use este método para executar a etapa **Autorização** de um fluxo de duas etapas usando Mastercard ou Visa. Nesta etapa, você autoriza o pagamento, mas o valor não é debitado até você [capturar]({{< ref "#capture" >}}) os fundos.<br>A seguir estão os corpos de pedido e resposta para este tipo de transação.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Exemplo de uma solicitação:**
```JSON
{
   "language": "es",
   "command": "SUBMIT_TRANSACTION",
   "merchant": {
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
      "apiLogin": "pRRXKOl8ikMmt9u"
   },
   "transaction": {
      "order": {
         "accountId": "512324",
         "referenceCode": "PRODUCT_TEST_2021-06-22T17:33:42.775Z",
         "description": "payment test",
         "language": "es",
         "signature": "6fd48e7150c652833866799a3fbf87bb",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "MXN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Domingo Diez 1589",
               "street2": "5555487",
               "city": "Cuernavaca",
               "state": "Morelos",
               "country": "MX",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "5555487",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "0000000",
            "phone": "7563126"
         }
      },
      "payer": {
         "merchantPayerId": "1",
         "fullName": "First name and second payer name",
         "emailAddress": "payer_test@test.com",
         "contactPhone": "7563126",
         "dniNumber": "5415668464654",
         "birthdate": "1994-06-21",
         "billingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "125544",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "creditCard": {
         "number": "4097440000000004",
         "securityCode": "321",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION",
      "paymentMethod": "VISA",
      "paymentCountry": "MX",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": false
}
```
<br>

**Exemplo de uma resposta:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400446409,
        "transactionId": "596ccd26-41a3-40b0-a241-262b3331aedc",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "458250371149",
        "authorizationCode": "MOCK-BTE-1624383236617",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624365236861,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "EXPIRATION_DATE": 1624987980000,
            "PAYMENT_WAY_ID": "4"
        },
        "additionalInfo": {
            "paymentNetwork": "BANORTE",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": "CREDIT",
            "transactionType": "AUTHORIZATION"
        }
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Exemplo de uma solicitação:**
```XML
<request>
   <language>es</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <accountId>512324</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-22T17:33:42.775Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>6fd48e7150c652833866799a3fbf87bb</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>MXN</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>123456789</dniNumber>
            <shippingAddress>
               <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>
               <city>Cuernavaca</city>
               <state>Morelos</state>
               <country>MX</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>
            <city>Cuernavaca</city>
            <state>Morelos</state>
            <country>MX</country>
            <postalCode>0000000</postalCode>
            <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <merchantPayerId>1</merchantPayerId>
         <fullName>First name and second payer name</fullName>
         <emailAddress>payer_test@test.com</emailAddress>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <birthdate>1994-06-21</birthdate>
         <billingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>
            <city>Cuernavaca</city>
            <state>Morelos</state>
            <country>MX</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <creditCard>
         <number>4097440000000004</number>
         <securityCode>777</securityCode>
         <expirationDate>2022/12</expirationDate>
         <name>APPROVED</name>
      </creditCard>
      <extraParameters>
         <entry>
            <string>INSTALLMENTS_NUMBER</string>
            <string>1</string>
         </entry>
      </extraParameters>
      <type>AUTHORIZATION</type>
      <paymentMethod>VISA</paymentMethod>
      <paymentCountry>MX</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

**Exemplo de uma resposta:**
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400446580</orderId>
        <transactionId>f03be7ef-e82a-41e3-9a3c-5451c4d8ab99</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>458250371149</trazabilityCode>
        <authorizationCode>MOCK-BTE-1624389497244</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Aprobado</responseMessage>
        <operationDate>2021-06-22T09:18:17</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-29T14:18:00</date>
            </entry>
            <entry>
                <string>PAYMENT_WAY_ID</string>
                <string>4</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>BANORTE</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <cardType>CREDIT</cardType>
            <transactionType>AUTHORIZATION</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Captura {#capture}

Use este método para executar a etapa **Captura** de um fluxo de duas etapas usando Mastercard e Visa. Nesta etapa, você captura os fundos [Autorizados]({{< ref "#authorization" >}}) anteriormente para transferi-los para sua conta PayU.

#### Observações {#considerations-1}

Leve em conta as seguintes informações para captura.
* O tempo máximo para capturar uma transação aprovada é de 30 dias. Após este período, a transação é automaticamente cancelada.
* Apenas os parâmetros exibidos no corpo da solicitação são obrigatórios para invocar uma transação de Captura. Lembre-se de que os IDs da ordem e da transação devem corresponder a uma transação atualmente autorizada.
* You can perform partial captures on an authorized amount. For more information, see the [Partial Capture]({{< ref "#partial-capture" >}}) section.

A seguir estão os corpos de pedido e resposta para este tipo de transação.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Exemplo de uma solicitação:**
```JSON
{
   "language": "es",
   "command": "SUBMIT_TRANSACTION",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "transaction": {
      "order": {
         "id": "1400446409"
      },
      "type": "CAPTURE",
      "parentTransactionId": "596ccd26-41a3-40b0-a241-262b3331aedc"
   },
   "test": false
}
```
<br>

**Exemplo de uma resposta:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400446409,
        "transactionId": "434312fd-90c6-48e0-9c73-dd3c2bb40d27",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "458250371149",
        "authorizationCode": "MOCK-BTE-1624389983478",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624371983901,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "PAYMENT_WAY_ID": "4"
        },
        "additionalInfo": {
            "paymentNetwork": "BANORTE",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": null,
            "transactionType": "CAPTURE"
        }
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Exemplo de uma solicitação:**
```XML
<request>
   <language>es</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <id>1400446409</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>596ccd26-41a3-40b0-a241-262b3331aedc</parentTransactionId>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

**Exemplo de uma resposta:**
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400446580</orderId>
        <transactionId>febf383f-add7-4986-82a2-941f0f4e9b45</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>458250371149</trazabilityCode>
        <authorizationCode>MOCK-BTE-1624390154273</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Aprobado</responseMessage>
        <operationDate>2021-06-22T09:29:14</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>PAYMENT_WAY_ID</string>
                <string>4</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>BANORTE</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Captura parcial {#partial-capture}

Uma captura parcial é uma operação que permite solicitar o desembolso de um valor menor do que o previamente autorizado em uma transação.

Isso significa que, se sua integração inicialmente autorizou um pagamento de $100, você pode realizar uma captura parcial de $60 e liberar os $40 restantes, que a integração não poderá capturar posteriormente.

#### Considerações {#considerations-2}

* O valor total capturado não pode exceder o valor originalmente autorizado.
* Cada processador de pagamento e cada país podem ter regras ou restrições em relação ao valor que você pode capturar parcialmente.
* Você deve especificar o valor que deseja capturar parcialmente no campo `value`, dentro do parâmetro `TX_VALUE`, como mostrado no exemplo abaixo.

A seguir estão exemplos dos corpos de solicitação e resposta para este tipo de transação.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Exemplo de uma solicitação:**
```JSON
{
    "language": "es",
    "command": "SUBMIT_TRANSACTION",
    "merchant": {
        "apiLogin": "pRRXKOl8ikMmt9u",
        "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
    },
    "transaction": {
        "order": {
            "id": "2152525133"
        },
        "additionalValues": {
            "TX_VALUE": {
                "value": 1000,
                "currency": "MXN"
            }
        },
        "type": "CAPTURE",
        "parentTransactionId": "4b6adba7-e43b-45f8-88a6-d290755d6c04"
    },
    "test": false
}
```
<br>

**Exemplo de uma resposta:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 2152543423,
        "transactionId": "6f523681-1587-4a2d-8a15-605d27f89c26",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "6f523681-1587-4a2d-8a15-605d27f89c26",
        "authorizationCode": "NPS-011111",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "APROBADA - Autorizada",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1723724052207,
        "referenceQuestionnaire": null,
        "extraParameters": null,
        "additionalInfo": {
            "paymentNetwork": "NPS_AR",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": null,
            "transactionType": "CAPTURE"
        }
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Exemplo de uma solicitação:**
```XML
<request>
  <language>es</language>
  <command>SUBMIT_TRANSACTION</command>
  <merchant>
    <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
    <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
  </merchant>
  <transaction>
    <order>
      <id>2152525133</id>
    </order>
    <additionalValues>
      <TX_VALUE>
        <value>1000</value>
        <currency>MXN</currency>
      </TX_VALUE>
    </additionalValues>
    <type>CAPTURE</type>
    <parentTransactionId>4b6adba7-e43b-45f8-88a6-d290755d6c04</parentTransactionId>
  </transaction>
  <test>false</test>
</request>

```
<br>

**Exemplo de uma resposta:**
```XML
<response>
  <code>SUCCESS</code>
  <error />
  <transactionResponse>
    <orderId>2152543423</orderId>
    <transactionId>6f523681-1587-4a2d-8a15-605d27f89c26</transactionId>
    <state>APPROVED</state>
    <paymentNetworkResponseCode>0</paymentNetworkResponseCode>
    <paymentNetworkResponseErrorMessage />
    <trazabilityCode>6f523681-1587-4a2d-8a15-605d27f89c26</trazabilityCode>
    <authorizationCode>NPS-011111</authorizationCode>
    <pendingReason />
    <responseCode>APPROVED</responseCode>
    <errorCode />
    <responseMessage>APROBADA - Autorizada</responseMessage>
    <transactionDate />
    <transactionTime />
    <operationDate>1723724052207</operationDate>
    <referenceQuestionnaire />
    <extraParameters />
    <additionalInfo>
      <paymentNetwork>NPS_AR</paymentNetwork>
      <rejectionType>NONE</rejectionType>
      <responseNetworkMessage />
      <travelAgencyAuthorizationCode />
      <cardType />
      <transactionType>CAPTURE</transactionType>
    </additionalInfo>
  </transactionResponse>
</response>

```

{{< /tab >}}
{{< /tabs >}}

### Cobrança {#charge}

Use este método para executar um fluxo de uma etapa, ou seja, uma cobrança. Neste momento, as duas etapas do fluxo são combinadas em uma só transação, e os fundos são transferidos da conta do cliente para sua conta PayU, uma vez que tenham sido aprovados:

A seguir estão os corpos de pedido e resposta para este tipo de transação.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Exemplo de uma solicitação:**
```JSON
{
   "language": "es",
   "command": "SUBMIT_TRANSACTION",
   "merchant": {
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
      "apiLogin": "pRRXKOl8ikMmt9u"
   },
   "transaction": {
      "order": {
         "accountId": "512324",
         "referenceCode": "PRODUCT_TEST_2021-06-22T17:33:42.775Z",
         "description": "payment test",
         "language": "es",
         "signature": "6fd48e7150c652833866799a3fbf87bb",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "MXN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Domingo Diez 1589",
               "street2": "5555487",
               "city": "Cuernavaca",
               "state": "Morelos",
               "country": "MX",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "5555487",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "0000000",
            "phone": "7563126"
         }
      },
      "payer": {
         "merchantPayerId": "1",
         "fullName": "First name and second payer name",
         "emailAddress": "payer_test@test.com",
         "contactPhone": "7563126",
         "dniNumber": "5415668464654",
         "birthdate": "1994-06-21",
         "billingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "125544",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "creditCard": {
         "number": "4097440000000004",
         "securityCode": "321",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "VISA",
      "paymentCountry": "MX",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": false
}
```
<br>

**Exemplo de uma resposta:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400446667,
        "transactionId": "868e169b-1857-4c52-a80d-e4b6d228a74f",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "458250371149",
        "authorizationCode": "MOCK-BTE-1624391396880",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624373397257,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "PAYMENT_WAY_ID": "4"
        },
        "additionalInfo": {
            "paymentNetwork": "BANORTE",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": "CREDIT",
            "transactionType": "AUTHORIZATION_AND_CAPTURE"
        }
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Exemplo de uma solicitação:**
```XML
<request>
   <language>es</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <accountId>512324</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-22T17:33:42.775Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>6fd48e7150c652833866799a3fbf87bb</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>MXN</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>123456789</dniNumber>
            <shippingAddress>
               <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>
               <city>Cuernavaca</city>
               <state>Morelos</state>
               <country>MX</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>
            <city>Cuernavaca</city>
            <state>Morelos</state>
            <country>MX</country>
            <postalCode>0000000</postalCode>
            <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <merchantPayerId>1</merchantPayerId>
         <fullName>First name and second payer name</fullName>
         <emailAddress>payer_test@test.com</emailAddress>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <birthdate>1994-06-21</birthdate>
         <billingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>
            <city>Cuernavaca</city>
            <state>Morelos</state>
            <country>MX</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <creditCard>
         <number>4850110000000000</number>
         <securityCode>777</securityCode>
         <expirationDate>2022/12</expirationDate>
         <name>APPROVED</name>
      </creditCard>
      <extraParameters>
         <entry>
            <string>INSTALLMENTS_NUMBER</string>
            <string>1</string>
         </entry>
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>VISA</paymentMethod>
      <paymentCountry>MX</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

**Exemplo de uma resposta:**
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400446670</orderId>
        <transactionId>a32da7ad-fb55-41ff-863d-ee49361334cb</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>458250371149</trazabilityCode>
        <authorizationCode>MOCK-BTE-1624391456868</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Aprobado</responseMessage>
        <operationDate>2021-06-22T09:50:57</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>PAYMENT_WAY_ID</string>
                <string>4</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>BANORTE</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <cardType>CREDIT</cardType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Enviar transações usando Google Pay {#submit-transactions-using-google-pay}

Google Pay é uma carteira digital que lhe permite efetuar pagamentos com cartão de forma fácil e rápida, sem ter de introduzir os dados do seu cartão para cada pagamento. Os dados do cartão são guardados de forma segura pelo Google. Este método de pagamento está disponível para todos os dispositivos (smartphones e computadores), independentemente do Sistema Operacional e em quase todos os navegadores Web.

Se utilizarem o Google Pay, os comerciantes devem aderir à [Política de Utilização](https://payments.developers.google.com/terms/aup) da API do Google Pay e concordar com os termos que definem os [Termos de serviço da API do Google Pay](https://payments.developers.google.com/terms/sellertos).

{{% alert title="Observação" color="info"%}}

A descrição abaixo aplica-se à prestação deste serviço diretamente através da apresentação do pop-up do Google Pay no site do beneficiário (loja virtual).

{{% /alert %}}

Para os comerciantes da PayU que processam no México, observe que o Google Pay está disponível atualmente apenas para integrações via API. Para processar transações com o Google Pay, você deve concluir as seguintes etapas:

* Integrar o método de pagamento usando a API.
* Adaptar sua integração existente com a API da PayU para oferecer suporte ao Google Pay.

### Integração API do meio de pagamento {#api-integration-of-the-payment-method} 

Para integrar o seu site com a carteira Google Pay, proceda de acordo com as instruções apresentadas no link abaixo:
* [Documentação da API](https://developers.google.com/pay/api/web)
* [Lista de verificação da integração da API](https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist)
* [Directrizes da marca](https://developers.google.com/pay/api/web/guides/brand-guidelines)

#### Definições PayU para integração API do meio de pagamento {#payu-definitions-for-the-api-integration-of-the-payment-method}

Abaixo encontrará as informações relevantes que deverá seguir durante a integração do meio de pagamento para que os seus pagamentos sejam processados pela PayU.

##### Solicitar um Payment Token para a PayU {#request-a-payment-token-for-payu}

Google encripta as informações do cartão informado pelo pagador para o processamento seguro por um fornecedor de pagamento. O parâmetro ```gateway``` no script deve ter o valor constante de ```payulatam```, e o ```gatewayMerchantId``` deve incluir o número da sua conta PayU. Aqui está um exemplo:

```
const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    'gateway': 'payulatam',
    'gatewayMerchantId': 'YOUR_ACCOUNT_ID '
  }
};
```

##### Meios de pagamento suportados {#supported-payment-networks}

PayU processa pagamentos Google Pay para cartões Mastercard e Visa. Para configurar seu script Google, use estas configurações:

```
const allowedCardNetworks = ["MASTERCARD", "VISA", "ELECTRON", "MAESTRO"];
const allowedCardAuthMethods = ["PAN_ONLY"];
```

O Google retornará um objeto `PaymentData` e o campo `paymentMethodData.tokenizationData.token` conterá um token do Google Pay criptografado de forma segura (uma string).

Abaixo encontra-se um exemplo de um Google Pay Token:

```
{
  "protocolVersion":"ECv2",
  "signature":"MEUCIG39tbaQPwJe28U+UMsJmxUBUWSkwlOv9Ibohacer+CoAiEA8Wuq3lLUCwLQ06D2kErxaMg3b/oLDFbd2gcFze1zDqU\u003d",
  "intermediateSigningKey":{
    "signedKey": "{\"keyExpiration\":\"1542394027316\",\"keyValue\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE/1+3HBVSbdv+j7NaArdgMyoSAM43yRydzqdg1TxodSzA96Dj4Mc1EiKroxxunavVIvdxGnJeFViTzFvzFRxyCw\\u003d\\u003d\"}",
    "signatures": ["MEYCIQDcXCoB4fYJF3EolxrE2zB+7THZCfKA7cWxSztKceXTCgIhAN/d5eBgx/1A6qKBdH0IS7/aQ7dO4MuEt26OrLCUxZnl"]
  },
  "signedMessage":"{\"tag\":\"TjkIKzIOvCrFvjf7/aeeL8/FZJ3tigaNnerag68hIaw\\u003d\",\"ephemeralPublicKey\":\"BLJoTmxP2z7M2N6JmaN786aJcT/L/OJfuJKQdIXcceuBBZ00sf5nm2+snxAJxeJ4HYFTdNH4MOJrH58GNDJ9lJw\\u003d\",\"encryptedMessage\":\"mleAf23XkKjj\"}"
}
```

### Processar transacções do Google Pay com PayU {#process-google-pay-transactions-in-payu}

 A principal função do Google Pay como carteira digital é armazenar cartões de crédito para facilitar o processamento de pagamentos, com isso em mente, para processar transações do Google Pay na PayU a lógica a ser aplicada será a mesma que para cartões de crédito, exceto para as seguintes particularidades:

* Se estiver processando transações para os seus clientes com o Google Pay, é preciso configurar as informações da carteira digital no parâmetro ```transaction.digitalWallet```.
* No parâmetro ```transaction.digitalWallet```, utilize ```GOOGLE_PAY``` para o campo ```transaction.digitalWallet.type```  e envie o Google Pay token no campo ```transaction.digitalWallet.message```. 
* Tenha em mente que o parâmetro ```transaction.creditcard``` para transações do Google Pay, deve enviar sempre um valor válido para o campo ```transaction.creditcard.name```. Os outros campos deste parâmetro não são necessários, uma vez que o Google Pay os fornece no token do Google Pay.
* Por predefinição, o processamento de cartões de crédito sem código de segurança não está ativa. Contate o seu Gestor de Conta da PayU para efetuar as activações necessárias para processar sem cvv, uma vez que este método de pagamento o exige.

#### Chamada da API {#api-call}

A seguir estão o corpo do pedido e da resposta deste meio de pagamento.

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Exemplo de uma solicitação:**
```JSON
{
"language": "en",
    "command": "SUBMIT_TRANSACTION",
    "merchant": {
        "apiLogin": "pRRXKOl8ikMmt9u",
        "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
    },
    "transaction": {
        "type": "AUTHORIZATION_AND_CAPTURE",
        "paymentMethod": "MASTERCARD",
        "paymentCountry": "MX",
        "ipAddress": "147.203.165.186",
        "userAgent": "Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 6.2; Trident/6.0)",
        "cookie": "l5jc08ez9lqy1exxkbruh0o7k",
        "deviceSessionId": "2c7aa39a700862da9ca06bd39b52e302",
        "req3DSAuthentication": "true",
        "order": {
            "language": "en",
            "signature": "3fdb76cc2dc3b1adb37430658705985b105294a20aa128f5bc309f3d76bd9067",
            "accountId": "516687",
            "description": "PayULatam|Test|MX|MXN|GooglePay",
            "referenceCode": "Postman|UniqueReference|9/18/2025, 11:33:18 AM",
            "notifyUrl": "https://5bb9f92041d902192de31554e65bafe4.m.pipedream.net",
            "buyer": {
                "merchantBuyerId": "MB_MX_1001",
                "fullName": "John Doea",
                "emailAddress": "john.doe@email.com",
                "dniType": "CURP",
                "dniNumber": "LOGM900412MDFRPR08",
                "shippingAddress": {
                    "country": "MX",
                    "state": "CDMX",
                    "city": "Ciudad de Mexico",
                    "postalCode": "06700",
                    "street1": "Av. Alvaro Obregonn 123",
                    "street2": "Depto. 4, Col. Roma Norte",
                    "phone": "5512345678"
                }
            },
            "shippingAddress": {
                "country": "MX",
                "state": "CDMX",
                "city": "Ciudad de Mexico",
                "postalCode": "06700",
                "street1": "Av. Alvaro Obregonn 123",
                "street2": "Depto. 4, Col. Roma Norte",
                "phone": "5512345678"
            },
            "additionalValues": {
                "TX_VALUE": {
                    "value": 596,
                    "currency": "MXN"
                },
                "TX_TAX": {
                    "value": 82,
                    "currency": "MXN"
                },
                "TX_TAX_RETURN_BASE": {
                    "value": 514,
                    "currency": "MXN"
                }
            }
        },
        "payer": {
            "merchantPayerId": "MP_MX_2002",
            "fullName": "Jane Smith",
            "emailAddress": "j.smith@example.com",
            "contactPhone": "5598765432",
            "dniType": "CURP",
            "dniNumber": "MARA850715HDFRZS03",
            "billingAddress": {
                "country": "MX",
                "state": "CDMX",
                "city": "Ciudad de Mexico",
                "postalCode": "04100",
                "street1": "Calle Francisco Sosa 45",
                "street2": "Col. Coyoa",
                "phone": "5598765432"
            }
        },
        "creditCard": {
            "name": "APPROVED"
        },
        "digitalWallet": {
            "type": "GOOGLE_PAY",
            "message": "{\"signature\":\"MEYCIQCuxXTYshCrEQbW8OaGT/Nieb8opDRweEPorFc1yWNrIwIhAMJUZWJeeukveo1bEghbIuWUjwt07WPHQ5cPPp/VjSFc\",\"intermediateSigningKey\":{\"signedKey\":\"{\\\"keyValue\\\":\\\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEs4ndUn/BYwZ5v3i4PoEfnYfeRLPoSaqoi6hiO4WWXVnAAeU8NzH8QB76CkpwwStEnsrwkSocPzraa8EwHY4Kdw\\\\u003d\\\\u003d\\\",\\\"keyExpiration\\\":\\\"1758884919146\\\"}\",\"signatures\":[\"MEQCIDiiEVR495hVrLgLppqn6o+GJzwNNOvYYu/TsI4giUibAiA6pwsXyKSu2yWSye0zE/PcDKIXWp7TFG7ISOcOyZSkAQ\\u003d\\u003d\"]},\"protocolVersion\":\"ECv2\",\"signedMessage\":\"{\\\"encryptedMessage\\\":\\\"jz75BshPqkgDY6Oz/iY+FUSJk8OC7duVvVRhN9kMFgeqogoQLJI48frjIK3m6m7rmNkfhlkxxwC2nHtWszZBUXeiHTDPyG5sJLKwYKuuZ2hKx4Ho32o16WyggBWYt1AlBqmIOv22PPEf2bDJ/Bsfmfo2KXHG99/+2YM1/5usKE+6xIwwvBbTGRkT7dZRNDnJHgm4o/weMgY3Gdc7LKtgR0u/xvJAeTD8tE25i6PWSQpMuqlXCNJ13+mtfjaO8KxylHyQrq5WRrGgSbmhhCVIdwjfDtWZKZF+bhJvqaYY1pLjRgoNFP6SZRzzkcMbRY8TV0Ea3LA4UyrxlRjnDNY4a7zYCckP+qk/5qDUqzEQGTB4a1PEiISwAY2eHxoMokE30BCVcbseEGrSpaoIifThJd2vIjqRL6nvtX1DNq5wUkURsxK4joUjBtdBZWrX+uOSmNfayi0rPqxeTTRTldEUjC/Dc97tCsSfAZjCOM+ZNvail9bi7ezdGgxsFr2mEoDOrOuDAXtr+zsO8My6J2t4WArYxDk/uGBNgAbS\\\",\\\"ephemeralPublicKey\\\":\\\"BAPcb2ul2X77oDEejSTZYADpF3vRPLvmtB7BZ4jAJ9M/LmpLD39FsY9ozs5x2FEWdtmQ9IBi65w2vcfjHUELpMU\\\\u003d\\\",\\\"tag\\\":\\\"R/jvDyn4BlEF84hKZgyutuHCrgaRHWZMo0i3PIHn/HU\\\\u003d\\\"}\"}"
        },
        "extraParameters": {
            "INSTALLMENTS_NUMBER": 1,
            "RESPONSE_URL": "https://urlonline.com/#https://yoursite.com/payment_result"
        }
    },
    "test": false
}
```
<br>

**Exemplo de uma resposta:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400437001,
        "transactionId": "f0f8c441-43e8-490a-b4f2-c14d2c403175",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "6",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "282856",
        "authorizationCode": "MOCK-CIELO-1624047897817",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624029898077,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "CIELO_TID": "1006993069000509C28A"
        },
        "additionalInfo": null
    }
} 
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Exemplo de uma solicitação:**
```XML
<request>
  <language>en</language>
  <command>SUBMIT_TRANSACTION</command>
  <merchant>
    <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
    <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
  </merchant>
  <transaction>
    <type>AUTHORIZATION_AND_CAPTURE</type>
    <paymentMethod>MASTERCARD</paymentMethod>
    <paymentCountry>MX</paymentCountry>
    <ipAddress>147.203.165.186</ipAddress>
    <userAgent>Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 6.2; Trident/6.0)</userAgent>
    <cookie>l5jc08ez9lqy1exxkbruh0o7k</cookie>
    <deviceSessionId>2c7aa39a700862da9ca06bd39b52e302</deviceSessionId>
    <req3DSAuthentication>true</req3DSAuthentication>
    <order>
      <language>en</language>
      <signature>3fdb76cc2dc3b1adb37430658705985b105294a20aa128f5bc309f3d76bd9067</signature>
      <accountId>516687</accountId>
      <description>PayULatam|Test|MX|MXN|GooglePay</description>
      <referenceCode>Postman|UniqueReference|9/18/2025, 11:33:18 AM</referenceCode>
      <notifyUrl>https://5bb9f92041d902192de31554e65bafe4.m.pipedream.net</notifyUrl>
      <buyer>
        <merchantBuyerId>MB_MX_1001</merchantBuyerId>
        <fullName>John Doea</fullName>
        <emailAddress>john.doe@email.com</emailAddress>
        <dniType>CURP</dniType>
        <dniNumber>LOGM900412MDFRPR08</dniNumber>
        <shippingAddress>
          <country>MX</country>
          <state>CDMX</state>
          <city>Ciudad de Mexico</city>
          <postalCode>06700</postalCode>
          <street1>Av. Alvaro Obregonn 123</street1>
          <street2>Depto. 4, Col. Roma Norte</street2>
          <phone>5512345678</phone>
        </shippingAddress>
      </buyer>
      <shippingAddress>
        <country>MX</country>
        <state>CDMX</state>
        <city>Ciudad de Mexico</city>
        <postalCode>06700</postalCode>
        <street1>Av. Alvaro Obregonn 123</street1>
        <street2>Depto. 4, Col. Roma Norte</street2>
        <phone>5512345678</phone>
      </shippingAddress>
      <additionalValues>
        <TX_VALUE>
          <value>596</value>
          <currency>MXN</currency>
        </TX_VALUE>
        <TX_TAX>
          <value>82</value>
          <currency>MXN</currency>
        </TX_TAX>
        <TX_TAX_RETURN_BASE>
          <value>514</value>
          <currency>MXN</currency>
        </TX_TAX_RETURN_BASE>
      </additionalValues>
    </order>
    <payer>
      <merchantPayerId>MP_MX_2002</merchantPayerId>
      <fullName>Jane Smith</fullName>
      <emailAddress>j.smith@example.com</emailAddress>
      <contactPhone>5598765432</contactPhone>
      <dniType>CURP</dniType>
      <dniNumber>MARA850715HDFRZS03</dniNumber>
      <billingAddress>
        <country>MX</country>
        <state>CDMX</state>
        <city>Ciudad de Mexico</city>
        <postalCode>04100</postalCode>
        <street1>Calle Francisco Sosa 45</street1>
        <street2>Col. Coyoa</street2>
        <phone>5598765432</phone>
      </billingAddress>
    </payer>
    <creditCard>
      <name>APPROVED</name>
    </creditCard>
    <digitalWallet>
      <type>GOOGLE_PAY</type>
      <message>
        {"signature":"MEYCIQCuxXTYshCrEQbW8OaGT/Nieb8opDRweEPorFc1yWNrIwIhAMJUZWJeeukveo1bEghbIuWUjwt07WPHQ5cPPp/VjSFc","intermediateSigningKey":{"signedKey":"{\"keyValue\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEs4ndUn/BYwZ5v3i4PoEfnYfeRLPoSaqoi6hiO4WWXVnAAeU8NzH8QB76CkpwwStEnsrwkSocPzraa8EwHY4Kdw\\u003d\\u003d\",\"keyExpiration\":\"1758884919146\"}","signatures":["MEQCIDiiEVR495hVrLgLppqn6o+GJzwNNOvYYu/TsI4giUibAiA6pwsXyKSu2yWSye0zE/PcDKIXWp7TFG7ISOcOyZSkAQ\\u003d\\u003d"]},"protocolVersion":"ECv2","signedMessage":"{\"encryptedMessage\":\"jz75BshPqkgDY6Oz/iY+FUSJk8OC7duVvVRhN9kMFgeqogoQLJI48frjIK3m6m7rmNkfhlkxxwC2nHtWszZBUXeiHTDPyG5sJLKwYKuuZ2hKx4Ho32o16WyggBWYt1AlBqmIOv22PPEf2bDJ/Bsfmfo2KXHG99/+2YM1/5usKE+6xIwwvBbTGRkT7dZRNDnJHgm4o/weMgY3Gdc7LKtgR0u/xvJAeTD8tE25i6PWSQpMuqlXCNJ13+mtfjaO8KxylHyQrq5WRrGgSbmhhCVIdwjfDtWZKZF+bhJvqaYY1pLjRgoNFP6SZRzzkcMbRY8TV0Ea3LA4UyrxlRjnDNY4a7zYCckP+qk/5qDUqzEQGTB4a1PEiISwAY2eHxoMokE30BCVcbseEGrSpaoIifThJd2vIjqRL6nvtX1DNq5wUkURsxK4joUjBtdBZWrX+uOSmNfayi0rPqxeTTRTldEUjC/Dc97tCsSfAZjCOM+ZNvail9bi7ezdGgxsFr2mEoDOrOuDAXtr+zsO8My6J2t4WArYxDk/uGBNgAbS\",\"ephemeralPublicKey\":\"BAPcb2ul2X77oDEejSTZYADpF3vRPLvmtB7BZ4jAJ9M/LmpLD39FsY9ozs5x2FEWdtmQ9IBi65w2vcfjHUELpMU\\u003d\",\"tag\":\"R/jvDyn4BlEF84hKZgyutuHCrgaRHWZMo0i3PIHn/HU\\u003d\"}"}
      </message>
    </digitalWallet>
    <extraParameters>
      <INSTALLMENTS_NUMBER>1</INSTALLMENTS_NUMBER>
      <RESPONSE_URL>https://urlonline.com/#https://yoursite.com/payment_result</RESPONSE_URL>
    </extraParameters>
  </transaction>
  <test>false</test>
</request>
```
<br>

**Exemplo de uma resposta:**
```XML
<paymentResponse>
         <code>SUCCESS</code>
     <error></error>
     <transactionResponse>
         <orderId>1400437001</orderId>
         <transactionId>f0f8c441-43e8-490a-b4f2-c14d2c403175</transactionId>
         <state>APPROVED</state>
         <paymentNetworkResponseCode>6</paymentNetworkResponseCode>
         <paymentNetworkResponseErrorMessage></paymentNetworkResponseErrorMessage>
         <trazabilityCode>282856</trazabilityCode>
         <authorizationCode>MOCK-CIELO-1624047897817</authorizationCode>
         <pendingReason></pendingReason>
         <responseCode>APPROVED</responseCode>
         <errorCode></errorCode>
         <responseMessage></responseMessage>
         <transactionDate></transactionDate>
         <transactionTime></transactionTime>
         <operationDate>1624029898077</operationDate>
         <referenceQuestionnaire></referenceQuestionnaire>
         <extraParameters>
             <BANK_REFERENCED_CODE>CREDIT</BANK_REFERENCED_CODE>
             <CIELO_TID>1006993069000509C28A</CIELO_TID>
         </extraParameters>
         <additionalInfo></additionalInfo>
     </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Enviar transações usando dinheiro {#submit-transactions-using-cash}

Este método permite processar os pagamentos de seus clientes em dinheiro. Para integrar com transações em dinheiro, você deve redirecionar o cliente para a URL encontrada na resposta do método; Seu cliente verá um recibo de pagamento como este.

<img src="/assets/Payments/CashReceiptMX.png" alt="PrintScreen" width="50%">

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-1}

<details>
<summary><b>Solicitação</b></summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| `language` | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx:32 | Definir `SUBMIT_TRANSACTION`. | Sim |
| `test` (JSON)<hr>`isTest` (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| `merchant` | Objeto |  | Este objeto contém os dados de autenticação. | Sim |
| `merchant > apiLogin` | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `merchant > apiKey` | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `transaction` | Objeto |  | Este objeto contém os dados da transação. | Sim |
| `transaction > order` | Objeto |  | Este objeto contém os dados da ordem. | Sim |
| `transaction > order > accountId` | Número |  | Identificador da sua conta. | Sim |
| `transaction > order > referenceCode` | Alfanumérico | Mín:1 Máx:255 | Representa o identificador da ordem em seu sistema. | Sim |
| `transaction > order > description` | Alfanumérico | Mín:1 Máx:255 | Descrição da ordem. | Sim |
| `transaction > order > language` | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| `transaction > order > notifyUrl` | Alfanumérico | Máx:2048 | URL de confirmação da ordem. | Não |
| `transaction > order > partnerId` | Alfanumérico | Máx:255 | ID de parceiro no PayU. | Não |
| `transaction > order > signature` | Alfanumérico | Máx:255 | A assinatura associada ao formulário. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| `transaction > order > shippingAddress` | Objeto |  | Endereço para envio. | Não |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Máx:100 | Endereço: Linha 1. | Não |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Máx:100 | Endereço: Linha 2. | Não |
| `transaction > order > shippingAddress > city` | Alfanumérico | Máx:50 | Endereço: cidade. | Não |
| `transaction > order > shippingAddress > state` | Alfanumérico | Máx:40 | Endereço: estado. | Não |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | Endereço: país. | Não |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Máx:8 | Endereço: Código postal. | Não |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. | Não |
| `transaction > order > buyer` | Objeto |  | Informações do comprador. | Sim |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| `transaction > order > buyer > fullName` | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Máx:255 | E-mail do comprador. | Sim |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do comprador. | Sim |
| `transaction > order > buyer > shippingAddress` | Alfanumérico |  | Endereço de envio do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim | 
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País do endereço do comprador no formato ISO 3166 alpha-2. | Sim |
| `transaction > order > buyer > shippingAddress > postalCode` | Número | Máx:20 | Código postal do endereço do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > phone` | Número | Máx:20 | Número de telefone do endereço do comprador. | Sim |
| `transaction > order > additionalValues >` | Objeto | 64 | Valor da ordem ou seus valores associados. | Sim |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Valor da transação. | Sim |
| `transaction > order > additionalValues > TX_VALUE > value` | Número | 12, 2 | Especifica o valor da transação. Este valor pode ter duas casas decimais (por exemplo `10000.00` ou `10000`). | Sim |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| `transaction > order > additionalValues > TX_TAX` | Alfanumérico | 64 | Total do Imposto sobre Valor Agregado (IVA). | Sim |
| `transaction > order > additionalValues > TX_TAX > value` | Número | 12, 2 | Especifica o valor do IVA.  | Não |
| `transaction > order > additionalValues > TX_TAX > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alfanumérico | 64 | Valor base para cálculo do VAT.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais.  | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Número | 12, 2 | Especifica o valor base da transação. | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > payer` | Objeto |  | Informações do pagador. | Sim |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nome of the payer. | Sim |
| `transaction > payer > billingAddress` | Objeto |  | Endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Endereço de cobrança linha 1. | Sim |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Sim |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Data de nascimento do pagador. Formato `YYYY-MM-DD`. | Sim |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do pagador. | Sim |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do pagador. | Sim |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| `transaction > type` | Alfanumérico | 32 | Como os pagamentos em dinheiro são feitos em escritórios físicos, o único tipo de transação disponível é `AUTHORIZATION_AND_CAPTURE` | Sim |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecione um método de pagamento válido em dinheiro. [Veja os métodos de pagamento disponíveis no México]({{< ref "select-your-payment-method.html#mexico" >}}). | Sim |
| `transaction > paymentCountry` | Alfanumérico | 2 | Definir `MX` para o México. | Sim |
| `transaction > expirationDate` | Alfanumérico | 23 | Data e hora máximas que o pagador tem para efetuar o pagamento. Formato `YYYY-MM-DDTHH:MM:SS`, por exemplo `2021-06-12T16:07:11.586`. | Não |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |

</details>

<details>
<summary><b>Resposta</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| `code` | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| `transactionResponse` | Objeto |  | Os dados de resposta. |
| `transactionResponse > orderId` | Número |  | O ID de ordem gerado ou existente no PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | O identificador da transação no PayU. |
| `transactionResponse > state` | Alfanumérico | Máx:32 | O status da transação. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx:255 | O código de resposta fornecido pela rede financeira. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx:255 | A mensagem de erro fornecida pela rede financeira. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx:32 | O código de rastreamento fornecido pela rede financeira. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx:12 | O código de autorização fornecido pela rede financeira. |
| `transactionResponse > pendingReason` | Alfanumérico | Máx:21 | O código de resposta associado ao status, conforme mencionado em `transactionResponse > state`, a transação está aguardando o pagamento. |
| `transactionResponse > responseCode` | Alfanumérico | Máx:64 | O código de resposta associado ao status. Neste caso, para transações bem-sucedidas é `PENDING_TRANSACTION_CONFIRMATION`. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| `transactionResponse > operationDate` | Date |  | Data de criação da resposta no sistema PayU. |
| `transactionResponse > extraParameters` | Objeto |  | Parâmetros ou dados adicionais associados à resposta.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"REFERENCE": "74794"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>REFERENCE</string>`<br>&emsp;&emsp;`<int>74794</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| `transactionResponse > additionalInfo` | Objeto |  | Informações adicionais associadas à resposta. Este objeto segue a mesma estrutura que `transactionResponse.extraParameters`. |

</details>

#### Observações {#considerations-3}

* O parâmetro `transaction.expirationDate` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de 7 dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* Quando o método de pagamento é `OXXO`, a confirmação do pagamento será feita um dia após o pagamento. Para outros métodos de pagamento em dinheiro, a confirmação é feita online.
* O parâmetro `transactionResponse.extraParameters` tem os seguintes parâmetros relacionados à transação:
   - **BANK_REFERENCED_CODE**: payment type.
   - **EXPIRATION_DATE**: prazo máximo para o pagador fazer o pagamento.
   - **BAR_CODE**: código de barras que permite ao pagador efetuar o pagamento.
   - **REFERENCE**: referência interna de pagamento gerada pelo PayU. 
   - **URL_PAYMENT_RECEIPT_HTML**: comprovante de pagamento em formato HTML. É para cá que você precisa redirecionar o pagamento quando o pagador seleciona o pagamento em dinheiro. 
   - **URL_PAYMENT_RECEIPT_PDF**: comprovante de pagamento em formato PDF.
   - **PAYMENT_WAY_ID**: rede do tipo de pagamento.

### Chamada da API {#api-call-1}

A seguir estão o corpo do pedido e da resposta deste meio de pagamento.

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Exemplo de uma solicitação:**
```JSON
{
   "language": "es",
   "command": "SUBMIT_TRANSACTION",
   "merchant": {
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
      "apiLogin": "pRRXKOl8ikMmt9u"
   },
   "transaction": {
      "order": {
         "accountId": "512324",
         "referenceCode": "PRODUCT_TEST_2021-06-22T17:33:42.775Z",
         "description": "payment test",
         "language": "es",
         "signature": "6fd48e7150c652833866799a3fbf87bb",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "MXN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Domingo Diez 1589",
               "street2": "5555487",
               "city": "Cuernavaca",
               "state": "Morelos",
               "country": "MX",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "5555487",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "0000000",
            "phone": "7563126"
         }
      },
      "payer": {
         "merchantPayerId": "1",
         "fullName": "First name and second payer name",
         "emailAddress": "payer_test@test.com",
         "contactPhone": "7563126",
         "dniNumber": "5415668464654",
         "birthdate": "1994-06-21",
         "billingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "125544",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
	  "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "SEVEN_ELEVEN",
      "expirationDate": "2021-06-23T21:02:14.593",
      "paymentCountry": "MX",
      "ipAddress": "127.0.0.1"
   },
   "test": false
}
```
<br>

**Exemplo de uma resposta:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 857806658,
        "transactionId": "c7b15feb-e8e6-4330-a04b-2a4c0cc2b776",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": null,
        "authorizationCode": null,
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": null,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CASH",
            "EXPIRATION_DATE": 1624482134593,
            "BAR_CODE": "00012345678900008578066580000000100000202106238",
            "REFERENCE": 857806658,
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857806658Yc7b15febe8e6433Y2568534adcdf6da",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857806658Yc7b15febe8e6433Y2568534adcdf6da",
            "PAYMENT_WAY_ID": "1"
        },
        "additionalInfo": {
            "paymentNetwork": "SEVEN_ELEVEN",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": null,
            "transactionType": "AUTHORIZATION_AND_CAPTURE"
        }
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Exemplo de uma solicitação:**
```XML
<request>
   <language>es</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <accountId>512324</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-22T17:33:42.775Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>6fd48e7150c652833866799a3fbf87bb</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>MXN</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <contactPhone>7563126</contactPhone>
            <dniNumber>123456789</dniNumber>
            <emailAddress>buyer_test@test.com</emailAddress>
            <fullName>First name and second buyer name</fullName>
            <merchantBuyerId>1</merchantBuyerId>
            <shippingAddress>
               <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <billingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>            
            <city>Cuernavaca</city>
            <state>Morelos</state>               
            <country>MX</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
         <birthdate>1994-06-21</birthdate>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <emailAddress>payer_test@test.com</emailAddress>
         <fullName>First name and second payer name</fullName>
         <merchantPayerId>1</merchantPayerId>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>SEVEN_ELEVEN</paymentMethod>
      <expirationDate>2021-06-23T21:02:14.593</expirationDate>
      <paymentCountry>MX</paymentCountry>
      <ipAddress>127.0.0.1</ipAddress>
   </transaction>
   <isTest>false</isTest>
</request>

```
<br>

**Exemplo de uma resposta:**
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>857806714</orderId>
        <transactionId>194e0320-2711-49d6-9d58-493dd0a59694</transactionId>
        <state>PENDING</state>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CASH</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-23T16:23:05</date>
            </entry>
            <entry>
                <string>BAR_CODE</string>
                <string>00012345678900008578067140000000100000202106230</string>
            </entry>
            <entry>
                <string>REFERENCE</string>
                <int>857806714</int>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857806714Y194e0320271149dY36e0ad0392e7f5f</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857806714Y194e0320271149dY36e0ad0392e7f5f</string>
            </entry>
            <entry>
                <string>PAYMENT_WAY_ID</string>
                <string>1</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>SEVEN_ELEVEN</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Enviar transações usando transferência bancária {#submit-transactions-using-bank-transfer}

Este método permite processar os pagamentos de seus clientes por transferência bancária. Ao usar este método de pagamento, o pagador realiza uma transferência bancária de sua conta bancária para uma conta CLABE do PayU.<br>
Para se integrar a essas transações, você deve redirecionar o cliente para a URL encontrada na resposta do método.

<img src="/assets/Payments/BankTransferReceiptMX.png" alt="PrintScreen" width="50%">

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-2}

<details>
<summary><b>Solicitação</b></summary>
<label for="table3" class="showMandatory"><input type="checkbox" id="table3" name="table3" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| `language` | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx:32 | Definir `SUBMIT_TRANSACTION`. | Sim |
| `test` (JSON)<hr>`isTest` (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| `merchant` | Objeto |  | Este objeto contém os dados de autenticação. | Sim |
| `merchant > apiLogin` | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `merchant > apiKey` | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `transaction` | Objeto |  | Este objeto contém os dados da transação. | Sim |
| `transaction > order` | Objeto |  | Este objeto contém os dados da ordem. | Sim |
| `transaction > order > accountId` | Número |  | Identificador da sua conta. | Sim |
| `transaction > order > referenceCode` | Alfanumérico | Mín:1 Máx:255 | Representa o identificador da ordem em seu sistema. | Sim |
| `transaction > order > description` | Alfanumérico | Mín:1 Máx:255 | Descrição da ordem. | Sim |
| `transaction > order > language` | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| `transaction > order > notifyUrl` | Alfanumérico | Máx:2048 | URL de confirmação da ordem. | Não|
| `transaction > order > partnerId` | Alfanumérico | Máx:255 | ID de parceiro no PayU. | Não |
| `transaction > order > signature` | Alfanumérico | Máx:255 | A assinatura associada ao formulário. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| `transaction > order > shippingAddress` | Objeto |  | Endereço para envio. | Não |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Máx:100 | Endereço: Linha 1. | Não |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Máx:100 | Endereço: Linha 2. | Não |
| `transaction > order > shippingAddress > city` | Alfanumérico | Máx:50 | Endereço: cidade. | Não |
| `transaction > order > shippingAddress > state` | Alfanumérico | Máx:40 | Endereço: estado. | Não |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | Endereço: país. | Não |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Máx:8 | Endereço: Código postal. | Não |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. | Não |
| `transaction > order > buyer` | Objeto |  | Informações do comprador. | Sim |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| `transaction > order > buyer > fullName` | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Máx:255 | E-mail do comprador. | Sim |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do comprador. | Sim |
| `transaction > order > buyer > shippingAddress` | Alfanumérico |  | Endereço de envio do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País do endereço do comprador no formato ISO 3166 alpha-2. | Sim |
| `transaction > order > buyer > shippingAddress > postalCode` | Número | Máx:20 | Código postal do endereço do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > phone` | Número | Máx:20 | Número de telefone do endereço do comprador. | Sim |
| `transaction > order > additionalValues` |  | 64 | Valor da ordem ou seus valores associados. | Sim |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Valor da transação. | Sim |
| `transaction > order > additionalValues > TX_VALUE > value` | Número | 12, 2 | Especifica o valor da transação. Este valor pode ter duas casas decimais (por exemplo `10000.00` ou `10000`). | Sim |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| `transaction > order > additionalValues > TX_TAX` | Alfanumérico | 64 | Total do Imposto sobre Valor Agregado (IVA). | Sim |
| `transaction > order > additionalValues > TX_TAX > value` | Número | 12, 2 | Especifica o valor do IVA.  | Não |
| `transaction > order > additionalValues > TX_TAX > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alfanumérico | 64 | Valor base para cálculo do VAT.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais.  | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Número | 12, 2 | Especifica o valor base da transação. | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > payer` | Objeto |  | Informações do pagador. | Sim |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nome of the payer. | Sim |
| `transaction > payer > billingAddress` | Objeto |  | Endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Endereço de cobrança linha 1. | Sim |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Sim |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Data de nascimento do pagador. Formato `YYYY-MM-DD`. | Sim |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do pagador. | Sim |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do pagador. | Sim |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| `transaction > type` | Alfanumérico | 32 | Como os pagamentos em dinheiro são feitos em escritórios físicos, o único tipo de transação disponível é `AUTHORIZATION_AND_CAPTURE` | Sim |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecione um método de pagamento válido em Transferência Bancária. [Veja os métodos de pagamento disponíveis no México]({{< ref "select-your-payment-method.html#mexico" >}}). | Sim |
| `transaction > paymentCountry` | Alfanumérico | 2 | Definir `MX` para o México. | Sim |
| `transaction > deviceSessionId` | Alfanumérico | Máx:255 | Identificador da sessão do dispositivo onde o cliente faz a transação. Para obter mais informações, consulte [este tópico]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |
| `transaction > cookie` | Alfanumérico | Máx:255 | Cookie armazenado pelo dispositivo onde o cliente faz a transação. | Sim |
| `transaction > userAgent` | Alfanumérico | Máx:1024 | O agente do usuário do navegador onde o cliente faz a transação. | Sim |

</details>

<details>
<summary><b>Resposta</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| `code` | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| `transactionResponse` | Objeto |  | Os dados de resposta. |
| `transactionResponse > orderId` | Número |  | O ID de ordem gerado ou existente no PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | O identificador da transação no PayU. |
| `transactionResponse > state` | Alfanumérico | Máx:32 | O status da transação. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx:255 | O código de resposta fornecido pela rede financeira. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx:255 | A mensagem de erro fornecida pela rede financeira. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx:32 | O código de rastreamento fornecido pela rede financeira. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx:12 | O código de autorização fornecido pela rede financeira. |
| `transactionResponse > pendingReason` | Alfanumérico | Máx:21 | O código de resposta associado ao status, conforme mencionado em `transactionResponse > state`, a transação está aguardando o pagamento. |
| `transactionResponse > responseCode` | Alfanumérico | Máx:64 | O código de resposta associado ao status. Neste caso, para transações bem-sucedidas é `PENDING_PAYMENT_IN_ENTITY`. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| `transactionResponse > operationDate` | Date |  | Data de criação da resposta no sistema PayU. |
| `transactionResponse > extraParameters` | Objeto |  | Parâmetros ou dados adicionais associados à resposta.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"SPEI_CLABE_ACCOUNT_NUMBER": "646180132800000009"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>SPEI_CLABE_ACCOUNT_NUMBER</string>`<br>&emsp;&emsp;`<string>646180132800000009</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| `transactionResponse > additionalInfo` | Objeto |  | Informações adicionais associadas à resposta. Este objeto segue a mesma estrutura que `transactionResponse.extraParameters`. |

</details>

#### Observações {#considerations-4}

* O parâmetro `transaction.expirationDate` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de 7 dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* Quando o pagador seleciona este método de pagamento, o PayU cria uma ordem no estado _Em andamento_ e uma transação no estado `PENDING`.
* Para efetuar o pagamento, o pagador deve se cadastrar na agência virtual de seu banco (O banco deve constar na lista de bancos disponíveis no SPEI). <br>Primeiro, o pagador deve registrar a conta PayU CLABE em sua agência bancária. Assim que a conta PayU CLABE estiver habilitada para realizar transferências, o pagador deve fornecer a referência retornada pelo PayU no parâmetro `trazabilityCode` e o valor devolvido pela PayU em sua agência virtual.
* No corpo da resposta, você encontra as variáveis necessárias para gerar o comprovante de pagamento (voucher) e a URL do comprovante gerado pelo PayU em formato HTML e PDF. Se você deseja gerar o voucher, use as seguintes variáveis:
  - **trazabilityCode**: identificador único com no máximo 7 dígitos; corresponde à referência de pagamento que o pagador deve fornecer na agência virtual. É obrigatório inserir o mesmo valor no campo de referência da agência bancária para que o pagamento seja efetuado com sucesso.
  - **value**: o pagador deve inserir como valor da transferência o mesmo valor informado na solicitação para que o pagamento seja efetuado com sucesso.
  - **SPEI_CLABE_ACCOUNT_NUMBER**: é a CLABE interbancária do PayU, ou seja, a conta para onde o valor será transferido. O pagador deve cadastrar este CLABE como beneficiário em sua agência bancária antes de realizar a transferência.
  - **SPEI_BANK_NAME**: nome associado à conta PayU CLABE. A conta do beneficiário está associada ao banco STP, que é sempre o mesmo banco para o PayU.


### Chamada da API {#api-call-2}

A seguir estão o corpo do pedido e da resposta deste meio de pagamento.

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Exemplo de uma solicitação:**
```JSON
{
   "language": "es",
   "command": "SUBMIT_TRANSACTION",
   "merchant": {
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
      "apiLogin": "pRRXKOl8ikMmt9u"
   },
   "transaction": {
      "order": {
         "accountId": "512324",
         "referenceCode": "PRODUCT_TEST_2021-06-22T17:33:42.775Z",
         "description": "payment test",
         "language": "es",
         "signature": "6fd48e7150c652833866799a3fbf87bb",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "MXN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Domingo Diez 1589",
               "street2": "5555487",
               "city": "Cuernavaca",
               "state": "Morelos",
               "country": "MX",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "5555487",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "0000000",
            "phone": "7563126"
         }
      },
      "payer": {
         "merchantPayerId": "1",
         "fullName": "First name and second payer name",
         "emailAddress": "payer_test@test.com",
         "contactPhone": "7563126",
         "dniNumber": "5415668464654",
         "birthdate": "1994-06-21",
         "billingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "125544",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "SPEI",
      "expirationDate": "2021-06-23T22:30:21.231",
      "paymentCountry": "MX",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": false
}
```
<br>

**Exemplo de uma resposta:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400447116,
        "transactionId": "16d49526-8d29-4bec-8c56-478491ddb327",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "25914",
        "authorizationCode": null,
        "pendingReason": "AWAITING_PAYMENT_IN_ENTITY",
        "responseCode": "PENDING_PAYMENT_IN_ENTITY",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624383022721,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "ELECTRONIC_PAYMENT",
            "EXPIRATION_DATE": "2021-06-23 23:59:59",
            "SPEI_BANK_NAME": "STP",
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=1400447116Y16d495268d294beY2063d953fc5dab2",
            "SPEI_CLABE_ACCOUNT_NUMBER": "646180132800000009",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app/V2?vid=1400447116Y16d495268d294beY2063d953fc5dab2",
            "PAYMENT_WAY_ID": "3"
        },
        "additionalInfo": {
            "paymentNetwork": "STP",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": null,
            "transactionType": "AUTHORIZATION_AND_CAPTURE"
        }
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Exemplo de uma solicitação:**
```XML
<request>
   <language>es</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <accountId>512324</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-22T17:33:42.775Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>6fd48e7150c652833866799a3fbf87bb</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>MXN</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <contactPhone>7563126</contactPhone>
            <dniNumber>123456789</dniNumber>
            <emailAddress>buyer_test@test.com</emailAddress>
            <fullName>First name and second buyer name</fullName>
            <merchantBuyerId>1</merchantBuyerId>
            <shippingAddress>
               <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <billingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>            
            <city>Cuernavaca</city>
            <state>Morelos</state>               
            <country>MX</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
         <birthdate>1994-06-21</birthdate>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <emailAddress>payer_test@test.com</emailAddress>
         <fullName>First name and second payer name</fullName>
         <merchantPayerId>1</merchantPayerId>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>SPEI</paymentMethod>
      <expirationDate>2021-06-23T22:30:21.231</expirationDate>
      <paymentCountry>MX</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

**Exemplo de uma resposta:**
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400447132</orderId>
        <transactionId>62a8e1e4-3787-494b-93ca-a8ddb658a754</transactionId>
        <state>PENDING</state>
        <trazabilityCode>25915</trazabilityCode>
        <pendingReason>AWAITING_PAYMENT_IN_ENTITY</pendingReason>
        <responseCode>PENDING_PAYMENT_IN_ENTITY</responseCode>
        <operationDate>2021-06-22T12:39:50</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>ELECTRONIC_PAYMENT</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <string>2021-06-23 23:59:59</string>
            </entry>
            <entry>
                <string>SPEI_BANK_NAME</string>
                <string>STP</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=1400447132Y62a8e1e43787494Yef7e6cd39d91243</string>
            </entry>
            <entry>
                <string>SPEI_CLABE_ACCOUNT_NUMBER</string>
                <string>646180132800000009</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app/V2?vid=1400447132Y62a8e1e43787494Yef7e6cd39d91243</string>
            </entry>
            <entry>
                <string>PAYMENT_WAY_ID</string>
                <string>3</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>STP</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Enviar transações usando referência bancária {#submit-transactions-using-bank-reference}

Este método permite processar pagamentos de seus clientes usando referências do banco. Para se integrar a essas transações, você deve redirecionar o cliente para a URL encontrada na resposta do método.

<img src="/assets/Payments/BankReferenceReceiptMX.png" alt="PrintScreen" width="50%">

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-3}

<details>
<summary>Solicitação</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| `language` | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx:32 | Definir `SUBMIT_TRANSACTION`. | Sim |
| `test` (JSON)<hr>`isTest` (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| `merchant` | Objeto |  | Este objeto contém os dados de autenticação. | Sim |
| `merchant > apiLogin` | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `merchant > apiKey` | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `transaction` | Objeto |  | Este objeto contém os dados da transação. | Sim |
| `transaction > order` | Objeto |  | Este objeto contém os dados da ordem. | Sim |
| `transaction > order > accountId` | Número |  | Identificador da sua conta. | Sim |
| `transaction > order > referenceCode` | Alfanumérico | Mín:1 Máx:255 | Representa o identificador da ordem em seu sistema. | Sim |
| `transaction > order > description` | Alfanumérico | Mín:1 Máx:255 | Descrição da ordem. | Sim |
| `transaction > order > language` | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| `transaction > order > notifyUrl` | Alfanumérico | Máx:2048 | URL de confirmação da ordem. | Não|
| `transaction > order > partnerId` | Alfanumérico | Máx:255 | ID de parceiro no PayU. | Não |
| `transaction > order > signature` | Alfanumérico | Máx:255 | A assinatura associada ao formulário. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| `transaction > order > shippingAddress` | Objeto |  | Endereço para envio. | Não |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Máx:100 | Endereço: Linha 1. | Não |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Máx:100 | Endereço: Linha 2. | Não |
| `transaction > order > shippingAddress > city` | Alfanumérico | Máx:50 | Endereço: cidade. | Não |
| `transaction > order > shippingAddress > state` | Alfanumérico | Máx:40 | Endereço: estado. | Não |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | Endereço: país. | Não |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Máx:8 | Endereço: Código postal. | Não |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. | Não |
| `transaction > order > buyer` | Objeto |  | Informações do comprador. | Sim |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| `transaction > order > buyer > fullName` | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Máx:255 | E-mail do comprador. | Sim |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do comprador. | Sim |
| `transaction > order > buyer > shippingAddress` | Alfanumérico |  | Endereço de envio do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País do endereço do comprador no formato ISO 3166 alpha-2. | Sim |
| `transaction > order > buyer > shippingAddress > postalCode` | Número | Máx:20 | Código postal do endereço do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > phone` | Número | Máx:20 | Número de telefone do endereço do comprador. | Sim |
| `transaction > order > additionalValues` |  | 64 | Valor da ordem ou seus valores associados. | Sim |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Valor da transação. | Sim |
| `transaction > order > additionalValues > TX_VALUE > value` | Número | 12, 2 | Especifica o valor da transação. Este valor pode ter duas casas decimais (por exemplo `10000.00` ou `10000`). | Sim |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| `transaction > order > additionalValues > TX_TAX` | Alfanumérico | 64 | Total do Imposto sobre Valor Agregado (IVA). | Sim |
| `transaction > order > additionalValues > TX_TAX > value` | Número | 12, 2 | Especifica o valor do IVA.  | Não |
| `transaction > order > additionalValues > TX_TAX > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alfanumérico | 64 | Valor base para cálculo do VAT.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais.  | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Número | 12, 2 | Especifica o valor base da transação. | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > payer` | Objeto |  | Informações do pagador. | Sim |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nome of the payer. | Sim |
| `transaction > payer > billingAddress` | Objeto |  | Endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Endereço de cobrança linha 1. | Sim |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Sim |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Data de nascimento do pagador. Formato `YYYY-MM-DD`. | Sim |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do pagador. | Sim |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do pagador. | Sim |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| `transaction > type` | Alfanumérico | 32 | Como os pagamentos com referência do banco são realizados em escritórios físicos, o único tipo de transação disponível é `AUTHORIZATION_AND_CAPTURE` | Sim |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecione um método de pagamento do referência de banco válido. [Veja os métodos de pagamento disponíveis no México]({{< ref "select-your-payment-method.html#mexico" >}}). | Sim |
| `transaction > paymentCountry` | Alfanumérico | 2 | Definir `MX` para o México. | Sim |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |
</details>

<details>
<summary><b>Resposta</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| `code` | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| `transactionResponse` | Objeto |  | Os dados de resposta. |
| `transactionResponse > orderId` | Número |  | O ID de ordem gerado ou existente no PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | O identificador da transação no PayU. |
| `transactionResponse > state` | Alfanumérico | Máx:32 | O status da transação. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx:255 | O código de resposta fornecido pela rede financeira. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx:255 | A mensagem de erro fornecida pela rede financeira. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx:32 | O código de rastreamento fornecido pela rede financeira. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx:12 | O código de autorização fornecido pela rede financeira. |
| `transactionResponse > pendingReason` | Alfanumérico | Máx:21 | O código de resposta associado ao status, conforme mencionado em `transactionResponse > state`, a transação está aguardando o pagamento. |
| `transactionResponse > responseCode` | Alfanumérico | Máx:64 | O código de resposta associado ao status. Neste caso, para transações bem-sucedidas é `PENDING_PAYMENT_IN_ENTITY`. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| `transactionResponse > operationDate` | Date |  | Data de criação da resposta no sistema PayU. |
| `transactionResponse > extraParameters` | Objeto |  | Parâmetros ou dados adicionais associados à resposta.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"SPEI_CLABE_ACCOUNT_NUMBER": "646180132800000009"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>SPEI_CLABE_ACCOUNT_NUMBER</string>`<br>&emsp;&emsp;`<string>646180132800000009</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| `transactionResponse > additionalInfo` | Objeto |  | Informações adicionais associadas à resposta. Este objeto segue a mesma estrutura que `transactionResponse.extraParameters`. |

</details>

#### Observações {#considerations-5}

* O parâmetro `transaction.expirationDate` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de 7 dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* O parâmetro `transactionResponse.extraParameters` tem os seguintes parâmetros relacionados à transação:
   - **REFERENCE**: referência interna de pagamento gerada pelo PayU.
   - **EXPIRATION_DATE**: prazo máximo para o pagador fazer o pagamento.
   - **BAR_CODE**: código de barras que permite ao pagador efetuar o pagamento. 
   - **URL_PAYMENT_RECEIPT_HTML**: comprovante de pagamento em formato HTML. É aqui que você precisa redirecionar o pagamento quando o pagador seleciona o pagamento de referência do banco. 
   - **URL_PAYMENT_RECEIPT_PDF**: comprovante de pagamento em formato PDF.

### Chamada da API {#api-call-3}

A seguir estão o corpo do pedido e da resposta deste meio de pagamento.

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Exemplo de uma solicitação:**
```JSON
{
   "language": "es",
   "command": "SUBMIT_TRANSACTION",
   "merchant": {
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
      "apiLogin": "pRRXKOl8ikMmt9u"
   },
   "transaction": {
      "order": {
         "accountId": "512324",
         "referenceCode": "PRODUCT_TEST_2021-06-22T17:33:42.775Z",
         "description": "payment test",
         "language": "es",
         "signature": "6fd48e7150c652833866799a3fbf87bb",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "MXN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Domingo Diez 1589",
               "street2": "5555487",
               "city": "Cuernavaca",
               "state": "Morelos",
               "country": "MX",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "5555487",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "0000000",
            "phone": "7563126"
         }
      },
      "payer": {
         "merchantPayerId": "1",
         "fullName": "First name and second payer name",
         "emailAddress": "payer_test@test.com",
         "contactPhone": "7563126",
         "dniNumber": "5415668464654",
         "birthdate": "1994-06-21",
         "billingAddress": {
            "street1": "Av. Domingo Diez 1589",
            "street2": "125544",
            "city": "Cuernavaca",
            "state": "Morelos",
            "country": "MX",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
	  "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "BANK_REFERENCED",
      "expirationDate": "2021-06-23T22:46:20.551",
      "paymentCountry": "MX",
      "ipAddress": "127.0.0.1"
   },
   "test": false
}
```
<br>

**Exemplo de uma resposta:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 857807112,
        "transactionId": "6f8b46f4-9c4c-4523-9d80-ab51c684a44d",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": null,
        "authorizationCode": null,
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": null,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "REFERENCE": 857807112,
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857807112Y6f8b46f49c4c452Y6a8c3d9204ae7c3",
            "EXPIRATION_DATE": 1624488380551,
            "BAR_CODE": "85780711227811246",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857807112Y6f8b46f49c4c452Y6a8c3d9204ae7c3"
        },
        "additionalInfo": {
            "paymentNetwork": "BANCOMER",
            "rejectionType": "NONE",
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": null,
            "transactionType": "AUTHORIZATION_AND_CAPTURE"
        }
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Exemplo de uma solicitação:**
```XML
<request>
   <language>es</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <accountId>512324</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-22T17:33:42.775Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>6fd48e7150c652833866799a3fbf87bb</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>MXN</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <contactPhone>7563126</contactPhone>
            <dniNumber>123456789</dniNumber>
            <emailAddress>buyer_test@test.com</emailAddress>
            <fullName>First name and second buyer name</fullName>
            <merchantBuyerId>1</merchantBuyerId>
            <shippingAddress>
               <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Domingo Diez 1589</street1>
               <street2>5555487</street2>            
               <city>Cuernavaca</city>
               <state>Morelos</state>               
               <country>MX</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <billingAddress>
            <street1>Av. Domingo Diez 1589</street1>
            <street2>5555487</street2>            
            <city>Cuernavaca</city>
            <state>Morelos</state>               
            <country>MX</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
         <birthdate>1994-06-21</birthdate>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <emailAddress>payer_test@test.com</emailAddress>
         <fullName>First name and second payer name</fullName>
         <merchantPayerId>1</merchantPayerId>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>BANK_REFERENCED</paymentMethod>
      <expirationDate>2021-06-23T22:46:20.551</expirationDate>
      <paymentCountry>MX</paymentCountry>
      <ipAddress>127.0.0.1</ipAddress>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

**Exemplo de uma resposta:**
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>857807162</orderId>
        <transactionId>2b7547fd-a6e8-4bcc-8f82-883775d85380</transactionId>
        <state>PENDING</state>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <extraParameters>
            <entry>
                <string>REFERENCE</string>
                <int>857807162</int>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857807162Y2b7547fda6e84bcYa83c5dd72117110</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-23T17:54:58</date>
            </entry>
            <entry>
                <string>BAR_CODE</string>
                <string>85780716227811234</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857807162Y2b7547fda6e84bcYa83c5dd72117110</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>BANCOMER</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Incluir informações do registro de nome de passageiro (opcional) {#include-passenger-name-record-information-optional}

Além dos detalhes de transação fornecidos anteriormente, a API permite a inclusão opcional de dados do Registro de Nome de Passageiro (PNR). Embora seja particularmente valioso para companhias aéreas e agências de viagens, este recurso estende sua utilidade a qualquer lojista que utilize os serviços da PayU em países da América Latina, mesmo quando não estiver processando diretamente pagamentos de voos. O principal benefício dos dados PNR é aprimorar significativamente a análise de risco de transações por meio das ferramentas antifraude da PayU, proporcionando uma visão mais abrangente da transação, além dos detalhes de pagamento.

Os parâmetros a seguir se referem aos dados PNR e são opcionais. Eles estão disponíveis em todos os países da América Latina onde a PayU opera. Esses campos não são suficientes por si só para completar uma solicitação de transação, mas são complementares para casos de uso específicos onde o conhecimento dos detalhes sobre o passageiro e seu itinerário de viagem pode auxiliar na detecção de fraudes.

<details>
<summary><b>Solicitação</b></summary>
<br>
<div class="variables"></div>

| **Campo** | **Tipo** | **Tamanho** | **Descrição** | **Exemplo** |
|-|-|-|-|-|
| `transaction > pnr > id` | Alfanumérico | 32 | ID do Registro de Nome de Passageiro. | `PNR123456` |
| `transaction > pnr > reservationAgent > id` | Alfanumérico | 32 | ID do agente de reserva. | `AGENT123` |
| `transaction > pnr > reservationAgent > firstName` | Alfanumérico | 255 | Primeiro nome(s) do agente de reserva. | `John` |
| `transaction > pnr > reservationAgent > lastName` | Alfanumérico | 255 | Sobrenome(s) do agente de reserva. | `Doe` |
| `transaction > pnr > reservationAgent > email` | Alfanumérico | 255 | Endereço de e-mail do agente de reserva. | `agent@example.com` |
| `transaction > pnr > reservationAgent > officePhoneNumber` | Alfanumérico | 50 | Número de telefone de escritório do agente de reserva. | `+573001234567` |
| `transaction > pnr > reservationOffice > id` | Alfanumérico | 9 | ID do escritório de reservas. | `OFFICE123` |
| `transaction > pnr > reservationOffice > country` | Alfanumérico | 2 | País do escritório de reservas (código ISO). | `CO` |
| `transaction > pnr > saleOffice > id` | Alfanumérico | 9 | ID do escritório de vendas. | `SALEOFF123` |
| `transaction > pnr > saleOffice > country` | Alfanumérico | 2 | País do escritório de vendas (código ISO). | `US` |
| `transaction > pnr > passengers[] > id` | Alfanumérico | 32 | ID do passageiro. | `PASS12345` |
| `transaction > pnr > passengers[] > country` | Alfanumérico | 2 | País do passageiro (código ISO). | `AR` |
| `transaction > pnr > passengers[] > level` | Alfanumérico | 32 | Nível do passageiro. | `GOLD` |
| `transaction > pnr > passengers[] > firstName` | Alfanumérico | 255 | Primeiro nome(s) do passageiro. | `Maria` |
| `transaction > pnr > passengers[] > lastName` | Alfanumérico | 255 | Sobrenome(s) do passageiro. | `Gonzalez` |
| `transaction > pnr > passengers[] > documentType` | Numérico | 2 | Tipo de documento. Os valores possíveis são:<br>`0` = Não especificado<br>`1` = Cédula de cidadania (Cédula de ciudadanía)<br>`2` = Cédula de estrangeiro (Cédula de extranjería)<br>`3` = Número de identificação tributária (Número de identificación tributaria)<br>`4` = Carteira de identidade (Tarjeta de identidad)<br>`5` = Passaporte (Pasaporte)<br>`6` = Número de seguridade social (Tarjeta de seguridad social)<br>`7` = Número de identificação estrangeiro (Sociedad extranjera sin NIT)<br>`8` = Conta escrow (Fideicomiso)<br>`9` = Certidão de nascimento (Registro civil)<br>`10` = Carteira diplomática (Carnet diplomático) | `5` |
| `transaction > pnr > passengers[] > documentNumber` | Alfanumérico | 50 | Número do documento do passageiro. | `P12345678` |
| `transaction > pnr > passengers[] > email` | Alfanumérico | 255 | Endereço de e-mail do passageiro. | `passenger@example.com` |
| `transaction > pnr > passengers[] > officePhoneNumber` | Alfanumérico | 50 | Número de telefone de escritório do passageiro. | `+573008765432` |
| `transaction > pnr > passengers[] > homePhoneNumber` | Alfanumérico | 50 | Número de telefone residencial do passageiro. | `+573002345678` |
| `transaction > pnr > passengers[] > mobilePhoneNumber` | Alfanumérico | 50 | Número de telefone celular do passageiro. | `+573001234567` |
| `transaction > pnr > passengers[] > address > country` | Alfanumérico | 2 | País do endereço do passageiro (código ISO). | `BR` |
| `transaction > pnr > passengers[] > address > city` | Alfanumérico | 65 | Cidade do endereço do passageiro. | `São Paulo` |
| `transaction > pnr > passengers[] > address > street` | Alfanumérico | 255 | Endereço da rua do passageiro. | `Rua das Flores, 123` |
| `transaction > pnr > itinerary[] > departureDate` | Alfanumérico | 19 | Data de partida no formato UTC. | `2022-01-01T23:59:59` |
| `transaction > pnr > itinerary[] > arrivalDate` | Alfanumérico | 19 | Data de chegada no formato UTC. | `2022-01-02T23:59:59` |
| `transaction > pnr > itinerary[] > flightNumber` | Alfanumérico | 12 | Número do voo. | `FL1234` |
| `transaction > pnr > itinerary[] > origin` | Alfanumérico | 8 | Origem. | `BOG` |
| `transaction > pnr > itinerary[] > destination` | Alfanumérico | 8 | Destino. | `MIA` |
| `transaction > pnr > itinerary[] > travelClass` | Alfanumérico | 2 | Classe do segmento de reserva. | `Y` |
| `transaction > pnr > itinerary[] > ticketType` | Alfanumérico | 50 | Tipo de bilhete. | `E-TICKET` |

</details>

{{% alert title="Nota" color="info"%}}

Ao usar o formato XML, os parâmetros do itinerário aparecem sob `transaction > pnr > itinerary > segment` com a mesma estrutura, mas ajustados quanto à hierarquia.

{{% /alert %}}

#### Chamada da API {#api-call-4}

A seguir, exemplos da solicitação deste método.

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Request Example:
```JSON
{
  "transaction": {
    "order": {
      ...
    },
    "creditCard": {
      ...
    },
    "extraParameters": {
      ...
    },
    "pnr": {
      "id": "abc123",
      "reservationAgent": {
        "id": "def456",
        "firstName": "CO",
        "lastName": "CO",
        "email": "first.last@example.org",
        "officePhoneNumber": "123456789"
      },
      "reservationOffice": {
        "id": "ghi789",
        "country": "CO"
      },
      "saleOffice": {
        "id": "jkl012",
        "country": "CO"
      },
      "passengers": [
        {
          "id": "mno345",
          "country": "CO",
          "level": "1",
          "firstName": "Firts Name",
          "lastName": "Last Name",
          "documentType": 0,
          "documentNumber": "987654321",
          "email": "first.last@example.com",
          "officePhoneNumber": "234567891",
          "homePhoneNumber": "345678912",
          "mobilePhoneNumber": "456789123",
          "address": {
            "country": "CO",
            "city": "Bogota D.C.",
            "street": "Calle 1 # 2 - 3"
          }
        },
        {
          "id": "mno346",
          "country": "CO",
          "level": "1",
          "firstName": "Firts Name",
          "lastName": "Last Name",
          "documentType": 0,
          "documentNumber": "55545151515",
          "email": "first.last@example.com",
          "officePhoneNumber": "336259",
          "homePhoneNumber": "2156668",
          "mobilePhoneNumber": "3001234123",
          "address": {
            "country": "CO",
            "city": "Bogota D.C.",
            "street": "Calle 3 # 2 - 1"
          }
        }
      ],
      "itinerary": [
        {
          "departureDate": "2022-01-01T23:59:59",
          "arrivalDate": "2025-01-01T23:59:59",
          "flightNumber": "PQR345",
          "origin": "BOGOTA",
          "destination": "MADRID",
          "travelClass": "BU",
          "ticketType": "RT"
        },
        {
          "departureDate": "2022-01-01T23:59:59",
          "arrivalDate": "2025-01-01T23:59:59",
          "flightNumber": "ARF2525",
          "origin": "MADRID",
          "destination": "LONDRES",
          "travelClass": "EC",
          "ticketType": "RT"
        }
      ]
    }
  }
}


```
<br>

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Request Example:
```XML
<request>
  ...
  <transaction>
    <order>
      ...
    </order>
    <payer>
      ...
    </payer>
    <creditCard>
      ...
    </creditCard>
    <extraParameters>
      ...
    </extraParameters>
    <pnr>
      <id>abc123</id>
      <reservationAgent>
        <id>def456</id>
        <firstName>First Name</firstName>
        <lastName>Last Name</lastName>
        <email>first.last@example.org</email>
        <officePhoneNumber>123456789</officePhoneNumber>
      </reservationAgent>
      <reservationOffice>
        <id>ghi789</id>
        <country>CO</country>
      </reservationOffice>
      <saleOffice>
        <id>jkl012</id>
        <country>CO</country>
      </saleOffice>
      <passengers>
        <!-- Passenger 1 -->
        <passenger>
          <id>mno345</id>
          <country>CO</country>
          <level>1</level>
          <firstName>First Name</firstName>
          <lastName>Last Name</lastName>
          <documentType>0</documentType>
          <documentNumber>987654321</documentNumber>
          <email>first.last@example.com</email>
          <officePhoneNumber>234567891</officePhoneNumber>
          <homePhoneNumber>345678912</homePhoneNumber>
          <mobilePhoneNumber>456789123</mobilePhoneNumber>
          <address>
            <country>CO</country>
            <city>Bogota D.C.</city>
            <street>Calle 1 # 2 - 3</street>
          </address>
        </passenger>
        <!-- Passenger 2 -->
        <passenger>
          <id>mno346</id>
          <country>CO</country>
          <level>1</level>
          <firstName>First Name</firstName>
          <lastName>Last Name</lastName>
          <documentType>0</documentType>
          <documentNumber>55545151515</documentNumber>
          <email>first.last@example.com</email>
          <officePhoneNumber>336259</officePhoneNumber>
          <homePhoneNumber>2156668</homePhoneNumber>
          <mobilePhoneNumber>3001234123</mobilePhoneNumber>
          <address>
            <country>CO</country>
            <city>Bogota D.C.</city>
            <street>Calle 3 # 2 - 1</street>
          </address>
        </passenger>
      </passengers>
      <itinerary>
        <!-- Flight Journey 1 -->
        <segment>
          <departureDate>2022-01-01T23:59:59</departureDate>
          <arrivalDate>2025-01-01T23:59:59</arrivalDate>
          <flightNumber>PQR345</flightNumber>
          <origin>BOGOTA</origin>
          <destination>MADRID</destination>
          <travelClass>U</travelClass>
        </segment>
        <!-- Flight Journey 2 -->
        <segment>
          <departureDate>2022-01-01T23:59:59</departureDate>
          <arrivalDate>2025-01-01T23:59:59</arrivalDate>
          <flightNumber>ARF2525</flightNumber>
          <origin>MADRID</origin>
          <destination>LONDRES</destination>
          <travelClass>EC</travelClass>
        </segment>
      </itinerary>
    </pnr>
    <isTest>false</isTest>
  </transaction>
</request>

```

{{< /tab >}}

{{< /tabs >}}

## Consulta de métodos de pagamento disponíveis {#available-payment-methods-query}

Este método gera uma lista dos métodos de pagamento disponíveis em todos os países.

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-4}

<details>
<summary><b>Solicitação</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório | 
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx:32 | Definir `GET_PAYMENT_METHODS`. | Sim |
| `test` (JSON)<hr>`isTest` (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| `merchant` | Objeto |  | Este objeto contém os dados de autenticação. | Sim |
| `merchant > apiLogin` | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `merchant > apiKey` | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |

</details>

<details>
<summary><b>Resposta</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| `code` | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. | Sim |
| `error` | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. | Sim |
| `paymentMethods` | Objeto |  | Lista dos métodos de pagamento. | Sim |
| `paymentMethods > paymentMethodComplete` | Objeto |  | Este objeto contém as informações de um método de pagamento. | Sim |
| `paymentMethods > paymentMethodComplete > id` | Numérico |  | Identificador do método de pagamento. | Sim |
| `paymentMethods > paymentMethodComplete > description` | Alfanumérico | Máx:32 | Nome do método de pagamento. | Sim |
| `paymentMethods > paymentMethodComplete > country` | Alfanumérico | 2 | Código ISO do país do método de pagamento. | Sim |

</details>

### Chamada da API {#api-call-5}

A seguir estão os corpos do pedido e resposta deste método. Para fins de exemplo, a solicitação e a resposta aqui mostram dois métodos de pagamento. 

{{< tabs tabTotal="2" tabID="10" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Exemplo de uma solicitação:**
```JSON
{
   "test": false,
   "language": "en",
   "command": "GET_PAYMENT_METHODS",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   }
}
```
<br>

**Exemplo de uma resposta:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "paymentMethods": [
        {
            "id": "299",
            "description": "OTHERS_CASH_MX",
            "country": "MX",
            "enabled": true,
            "reason": null
        },
        {
            "id": "139",
            "description": "AMEX",
            "country": "MX",
            "enabled": true,
            "reason": null
        }
    ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Exemplo de uma solicitação:**
```XML
<request>
   <language>en</language>
   <command>GET_PAYMENT_METHODS</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <isTest>false</isTest>
</request>
```
<br>

**Exemplo de uma resposta:**
```XML
<paymentMethodsResponse>
    <code>SUCCESS</code>
    <paymentMethods>
        <paymentMethodComplete>
            <id>299</id>
            <description>OTHERS_CASH_MX</description>
            <country>MX</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>139</id>
            <description>AMEX</description>
            <country>MX</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
    </paymentMethods>
</paymentMethodsResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Ping

O método `PING` permite que você confirme a conexão com a nossa plataforma.

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-5}

<details>
<summary><b>Solicitação</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx:32 | Definir `PING`. | Sim |
| `test` (JSON)<hr>`isTest` (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| `merchant` | Objeto |  | Este objeto contém os dados de autenticação. | Sim |
| `merchant > apiLogin` | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `merchant > apiKey` | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |

</details>

<details>
<summary><b>Resposta</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| `code` | Alfanumérico |  | O código de resposta da transação. |
| `error` | Alfanumérico | Máx:2048 | A mensagem de erro associada, caso tenha ocorrido um erro. |
| `transactionResponse` | Objeto | Máx:2048 | A resposta do método PING caso tenha ocorrido um erro. |
</details>

### Chamada da API {#api-call-6}

A seguir estão os corpos do pedido e resposta deste método.

{{< tabs tabTotal="2" tabID="11" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Exemplo de uma solicitação:**
```JSON
{
   "test": false,
   "language": "en",
   "command": "PING",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   }
}
```
<br>

**Exemplo de uma resposta:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": null
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Exemplo de uma solicitação:**
```XML
<request>
   <language>en</language>
   <command>PING</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <isTest>false</isTest>
</request>
```
<br>

**Exemplo de uma resposta:**
```XML
<paymentResponse>
    <code>SUCCESS</code>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}
