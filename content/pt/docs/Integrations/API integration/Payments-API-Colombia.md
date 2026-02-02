---
title: "API de Pagamentos - Colômbia"
linkTitle: "API de Pagamentos - Colômbia"
date: 2021-05-03T15:48:08-05:00
description: >
  A API de Pagamentos para a Colômbia permite a integração eficiente das capacidades de processamento de pagamentos da PayU em sua plataforma de compras online. Com esta API, as lojas podem oferecer diferentes métodos de pagamento por meio de cartões de crédito ou débito, carteiras digitais, dinheiro e transferências bancárias.
weight: 20
tags: ["subtopic"]
---
<script src="/js/searchcodes.js"></script>

Este guia mostra como aproveitar esses serviços para melhorar a experiência de pagamento dos seus clientes, proporcionando opções de pagamento flexíveis e seguras, adaptadas ao mercado local.

{{% alert title="Nota" color="info"%}}

Para integrar a API de Pagamentos, direcione suas solicitações para as seguintes URLs de acordo com o ambiente correspondente:
* Teste: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Produção: ```https://api.payulatam.com/payments-api/4.0/service.cgi```

{{% /alert %}}

## Funcionalidades disponíveis {#available-features}

A API de Pagamentos inclui as seguintes funcionalidades:

* [Enviar transações usando cartões de crédito ou débito]({{< ref "#submit-transactions-using-credit-or-debit-cards" >}})
* [Enviar transações usando Bre-B QR]({{< ref "Payments-API-Colombia.md#submit-transactions-using-bre-b-qr" >}})
* [Enviar transações usando transferência bancária (PSE)]({{< ref "#submit-transactions-using-bank-transfer-pse" >}})
* [Enviar transações usando Google Pay]({{< ref "#submit-transactions-using-google-pay" >}})
* [Enviar transações usando Nequi]({{< ref "#submit-transactions-using-nequi" >}})
* [Enviar transações usando o Botão Bancolombia]({{< ref "#submit-transactions-using-bancolombia-button" >}})
* [Enviar transações usando dinheiro ou referência bancária]({{< ref "#submit-transactions-using-cash-or-bank-reference" >}})
* [Processar pagamentos como companhia aérea ou agência de viagens]({{< ref "#process-payments-as-an-airline-or-travel-agency" >}})
* [Incluir informações do registro de nome de passageiro]({{< ref "#include-passenger-name-record-information-optional" >}})
* [Consulta de métodos de pagamento disponíveis]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Nota" color="info"%}}

Para confirmar o status de uma transação, você pode usar uma das seguintes opções:
* Acesse a URL definida no parâmetro `transaction.notifyUrl` ou a opção **URL de confirmação** localizada no Módulo PayU em **Configuração** > **Configuração técnica**.
* Use o [API ou SDK de Consultas]({{< ref "Queries.md" >}}).

{{% /alert %}}

## Enviar transações usando cartões de crédito ou débito {#submit-transactions-using-credit-or-debit-cards}

Este método permite processar os pagamentos efetuados com cartão de crédito ou débito pelos seus clientes. Para a Colômbia, você pode fazer fluxos de uma etapa (**Cobrança**). Para obter mais informações, consulte [Fluxos de pagamento]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Nota" color="info"%}}

O fluxo em duas etapas está disponível somente sob solicitação, entre em contato com seu representante de vendas.

{{% /alert %}}

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response}

<details>
<summary><b>Solicitação</b></summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx:32 | Definir `SUBMIT_TRANSACTION`. | Sim |
| `test` (JSON)<hr>`isTest` (XML) | Boolean | | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| `merchant` | Objeto | | Este objeto contém os dados de autenticação. | Sim |
| `merchant > apiLogin` | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `merchant > apiKey` | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `transaction` | Objeto | | Este objeto contém os dados da transação. | Sim |
| `transaction > order` | Objeto | | Este objeto contém os dados da ordem. | Sim |
| `transaction > order > accountId` | Número | | Identificador da sua conta. | Sim |
| `transaction > order > referenceCode` | Alfanumérico | Mín:1 Máx:255 | Representa o identificador da ordem em seu sistema. | Sim |
| `transaction > order > description` | Alfanumérico | Mín:1 Máx:255 | Descrição da ordem. | Sim |
| `transaction > order > language` | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| `transaction > order > notifyUrl` | Alfanumérico | Máx:2048 | URL de confirmação da ordem. | Não |
| `transaction > order > partnerId` | Alfanumérico | Máx:255 | ID de parceiro no PayU. | Não |
| `transaction > order > signature` | Alfanumérico | Máx:255 | A assinatura associada ao formulário. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| `transaction > order > shippingAddress` | Objeto | | Endereço para envio. | Não |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Máx:100 | Endereço: Linha 1. | Não |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Máx:100 | Endereço: Linha 2. | Não |
| `transaction > order > shippingAddress > city` | Alfanumérico | Máx:50 | Endereço: cidade. | Não |
| `transaction > order > shippingAddress > state` | Alfanumérico | Máx:40 | Endereço: estado. | Não |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | Endereço: país. | Não |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Máx:8 | Endereço: Código postal. | Não |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. | Não |
| `transaction > order > buyer` | Objeto | | Informações do comprador. | Sim |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| `transaction > order > buyer > fullName` | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Máx:255 | E-mail do comprador. | Sim |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do comprador. | Sim |
| `transaction > order > buyer > shippingAddress` | Alfanumérico | | Endereço de envio do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País do endereço do comprador no formato ISO 3166 alpha-2. | Sim |
| `transaction > order > buyer > shippingAddress > postalCode` | Número | Máx:20 | Código postal do endereço do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > phone` | Número | Máx:20 | Número de telefone do endereço do comprador. | Sim |
| `transaction > order > additionalValues` | Objeto | 64 | Valor da ordem and seus valores associados. | Sim |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Valor da transação. | Sim |
| `transaction > order > additionalValues > TX_VALUE > value` | Número | 12, 2 | Especifica o valor da transação. Este valor não pode incluir decimais. | Sim |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > order > additionalValues > TX_TAX` | Alfanumérico | 64 | Valor do Imposto sobre o Valor Acrescentado (IVA - Impuesto al Valor Agregado). | Sim |
| `transaction > order > additionalValues > TX_TAX > value` | Número | 12, 2 | Especifica o valor do IVA.<br>Se este parâmetro não for definido, PayU aplica o valor do imposto atual (19%).<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais  | Não |
| `transaction > order > additionalValues > TX_TAX > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alfanumérico | 64 | Valor base para cálculo do IVA.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais  | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Número | 12, 2 | Especifica o valor base da transação. | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > creditCardTokenId` | Alfanumérico | | Inclua este parâmetro quando a transação for feita com um cartão tokenizado. Além disso, é obrigatório enviar o parâmetro `transaction.creditCard.expirationDate`.<br>Para obter mais informações, consulte [API de tokenização]({{< ref "Tokenization-API.md" >}}). | Não |
| `transaction > creditCard` | Objeto | | Informações do cartão de crédito. Se você processar usando cartão de débito, não envie este parâmetro.<br>Este objeto e seus parâmetros são obrigatórios quando o pagamento é realizado com cartão de crédito não tokenizado. | Não |
| `transaction > creditCard > number` | Alfanumérico | Mín:13 Máx:20 | Número do cartão de crédito. | Não |
| `transaction > creditCard > securityCode` | Alfanumérico | Mín:1 Máx:4 | Código de segurança do cartão de crédito (CVC2, CVV2, CID). | Não |
| `transaction > creditCard > expirationDate` | Alfanumérico | 7 | Data de validade do cartão de crédito. Formato `YYYY/MM`. | Não |
| `transaction > creditCard > name` | Alfanumérico | Mín:1 Máx:255 | Nome do titular exibido no cartão de crédito. | Não |
| `transaction > creditCard > processWithoutCvv2` | Boolean | Máx:255 | Permite processar transações sem incluir o código de segurança do cartão de crédito. Sua loja precisa da autorização do PayU antes de usar este recurso. | Não |
| `transaction > debitCard` | Objeto | | Informações do cartão de débito. Este objeto e seus parâmetros são obrigatórios quando o pagamento é realizado com cartão de débito. | Não |
| `transaction > debitCard > number` | Alfanumérico | Mín:13 Máx:20 | Número do cartão de débito. | Não |
| `transaction > debitCard > securityCode` | Alfanumérico | Mín:1 Máx:4 | Código de segurança do cartão de débito (CVC2, CVV2, CID). | Não |
| `transaction > debitCard > expirationDate` | Alfanumérico | 7 | Data de validade do cartão de débito. Formato `YYYY/MM`. | Não |
| `transaction > debitCard > name` | Alfanumérico | Mín:1 Máx:255 | Nome do titular exibido no cartão de débito. | Não |
| `transaction > payer` | Objeto | | Informações do pagador. | Sim |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nome do pagador, que deve corresponder ao nome enviado no parâmetro `transaction.creditCard.name`. | Sim |
| `transaction > payer > billingAddress` | Objeto | | Endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Endereço de cobrança linha 1. | Sim |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Sim |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Data de nascimento do pagador. | Não |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do pagador. | Sim |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do pagador. | Sim |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| `transaction > type` | Alfanumérico | 32 | Defina este valor de acordo com a transação. Para a Colômbia, definir `AUTHORIZATION_AND_CAPTURE` | Sim |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecione um método de pagamento com cartão de crédito válido. [Veja os métodos de pagamento disponíveis na Colômbia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sim |
| `transaction > paymentCountry` | Alfanumérico | 2 | Definir `CO` para a Colômbia. | Sim |
| `transaction > deviceSessionId` | Alfanumérico | Máx:255 | Identificador da sessão do dispositivo onde o cliente faz a transação. Para obter mais informações, consulte [Este tópico]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |
| `transaction > cookie` | Alfanumérico | Máx:255 | Cookie armazenado pelo dispositivo onde o cliente faz a transação. | Sim |
| `transaction > userAgent` | Alfanumérico | Máx:1024 | O agente do usuário do navegador onde o cliente faz a transação. | Sim |
| `transaction > extraParameters` | Objeto | | Parâmetros ou dados adicionais associados a pedido. O tamanho máximo de cada nome _extraParameters_ é de 64 caracteres.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | Não |
| `transaction > extraParameters > EXTRA1` | Alfanumérico | Máx:512 | Campo adicional para enviar informações extras sobre a compra. | Não |
| `transaction > extraParameters > EXTRA2` | Alfanumérico | Máx:512 | Campo adicional para enviar informações extras sobre a compra. | Não |
| `transaction > extraParameters > EXTRA3` | Alfanumérico | Máx:512 | Campo adicional para enviar informações extras sobre a compra. | Não |
| `transaction > threeDomainSecure` | Objeto | | Este objeto contém as informações do 3DS 2.0. | Não |
| `transaction > threeDomainSecure > embedded` | Boolean |  | Definir `true` se você deseja usar um MPI integrado para o processo de autorização. Por padrão, este valor é definido como `false`. | Não |
| `transaction > threeDomainSecure > eci` | Número | Máx:2 | Indicador de comércio eletrônico.<br>Valor fornecido pelos servidores de diretório mostrando a tentativa de autenticação.<br>Este parâmetro é obrigatório quando `transaction.threeDomainSecure.embedded` is `false` e `transaction.threeDomainSecure.xid` for definido. | Não |
| `transaction > threeDomainSecure > cavv` | Alfanumérico | Máx:28 | Valor de verificação de autenticação do titular do cartão.<br>Código do criptograma usado na autenticação da transação em Base64.<br>Dependendo dos códigos ECI específicos estabelecidos pela rede de processamento, este valor pode ser opcional. | Não |
| `transaction > threeDomainSecure > xid` | Alfanumérico | Máx:28 | Código do criptograma usado na autenticação da transação em Base64.<br>Este parâmetro é obrigatório quando `transaction.threeDomainSecure.embedded` é `false` e `transaction.threeDomainSecure.eci` for definido. | Não |
| `transaction > threeDomainSecure > directoryServerTransactionId` | Alfanumérico | Máx:36 | ID da transação gerada pelo Servidor de Diretório durante a autenticação. | Não |
| `transaction > digitalWallet` | Objeto |  | Incluir este parâmetro quando a transação for efectuada através de uma Carteira Digital. *Ao submeter este objeto, todos os seus campos são obrigatórios. | Não |
| `transaction > digitalWallet > type` | Alfanumérico | ---- | Envia o valor com base na carteira que está a ser processada: GOOGLE_PAY | Sim* |
| `transaction > digitalWallet > message` | Alfanumérico | ---- | Inclui as informações do token de pagamento do Google que o Google lhe devolverá para cada transação. Para mais informações, clique [aqui](#definições-payu-para-integração-api-do-meio-de-pagamento). | Sim* |

</details>

<details>
<summary><b>Resposta</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| `code` | Alfanumérico | | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| `transactionResponse` | Objeto | | Os dados de resposta. |
| `transactionResponse > orderId` | Número | | O ID de ordem gerado ou existente no PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | O identificador da transação no PayU. |
| `transactionResponse > state` | Alfanumérico | Máx:32 | O status da transação. |
| `transactionResponse > responseCode` | Alfanumérico | Máx:64 | O código de resposta associado ao status. |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx:255 | O código de resposta fornecido pela rede financeira. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx:255 | A mensagem de erro fornecida pela rede financeira. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx:32 | O código de rastreamento fornecido pela rede financeira. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx:12 | O código de autorização fornecido pela rede financeira. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| `transactionResponse > operationDate` | Data | | Data de criação da resposta no sistema PayU. |
| `transactionResponse > extraParameters` | Objeto | | Parâmetros ou dados adicionais associados à resposta. <br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| `transactionResponse > additionalInfo` | Objeto | | Informações adicionais associadas à resposta. Este objeto segue a mesma estrutura que `transactionResponse.extraParameters`. |
| `transactionResponse > additionalInfo > rejectionType` | Alfanumérico | Máx: 4 | Indica a categoria da recusa. Valores possíveis: `SOFT` ou `HARD`. Para mais informações, consulte [Considerações]({{< ref "Payments-API-Colombia.md#considerations" >}}). |

</details>

#### Observações {#considerations}

* **Tratamento de Recusas (`rejectionType`):** Quando uma transação é recusada, o campo `additionalInfo.rejectionType` ajuda a determinar a estratégia de reativação (reentrada):
    * **HARD**: Indica uma recusa permanente. De acordo com as regulamentações das bandeiras, **o lojista não deve tentar a transação novamente** usando os mesmos dados do cartão. Reclamações frequentes de recusas "Hard" podem resultar em penalidades ou multas das redes financeiras.
    * **SOFT**: Indica um problema temporário (ex: saldo insuficiente). A transação pode ser tentada novamente em um momento posterior.
* Para pagamentos com tokens de cartão de crédito, inclua os parâmetros `transaction.creditCardTokenId` e `transaction.creditCard.securityCode` (se processar com código de segurança) substituindo as informações do cartão de crédito. Para obter mais informações, consulte [API de tokenização]({{< ref "Tokenization-API.md" >}}).
* Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas. Depois que esse recurso for habilitado para você, envie no pedido a variável `creditCard.processWithoutCvv2` como `true` e remova a variável `creditCard.securityCode`.
* A variável `transaction.threeDomainSecure` não substitui as informações do cartão nem qualquer um dos campos obrigatórios da transação. Este objeto é adicional e não obrigatório.
* A variável `transaction.threeDomainSecure` corresponde a um cenário _passthrough_ onde a loja faz a autenticação por conta própria.
* No cartão Crédito Fácil Codensa, o número de parcelas aceitas é de 1 a 12, 18, 24, 36 e 48.
* No cartão Crédito Fácil Codensa, o pagador pode escolher qualquer um dos seguintes tipos de documentos para a variável `transaction.payer.dniType`:

| ISO | Descrição |
|:-:|-|
| `CC` | Cartão de cidadania. |
| `CE` | Cartão de cidadão estrangeiro. |
| `NIT` | Número de identificação fiscal (empresas). |
| `TI` | Cartão de identidade. |
| `PP` | Passaporte. |
| `IDC` | Identificador único do cliente, em casos com ID único de cliente/ ID de conta de serviços. |
| `CEL` | Quando identificado pela linha móvel. |
| `RC` | Certidão de nascimento.  |
| `DE` | Documento de identificação de estrangeiro. |

### Chamada da API {#api-call}

A seguir estão os exemplos de pedido e resposta desta forma de pagamento.

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
         "accountId": "512321",
         "referenceCode": "PRODUCT_TEST_2021-06-23T19:59:43.229Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "1d6c33aed575c4974ad5c0be7c6a1c87",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 65000,
               "currency": "COP"
         },
            "TX_TAX": {
               "value": 10378,
               "currency": "COP"
         },
            "TX_TAX_RETURN_BASE": {
               "value": 54622,
               "currency": "COP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Cr 23 No. 53-50",
               "street2": "5555487",
               "city": "Bogotá",
               "state": "Bogotá D.C.",
               "country": "CO",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "5555487",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
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
         "billingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "125544",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "creditCard": {
         "number": "4037997623271984",
         "securityCode": "321",
         "expirationDate": "2030/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "VISA",
      "paymentCountry": "CO",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0",
      "threeDomainSecure": {
         "embedded": false,
         "eci": "01",
         "cavv": "AOvG5rV058/iAAWhssPUAAADFA==",
         "xid": "Nmp3VFdWMlEwZ05pWGN3SGo4TDA=",
         "directoryServerTransactionId": "00000-70000b-5cc9-0000-000000000cb"
      }
   },
   "test": true
}
```
<br>

**Exemplo de uma resposta:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400449660,
        "transactionId": "aa2f50b2-62a8-42de-b3be-c6fe08ec712f",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "81",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "CRED - 666039677",
        "authorizationCode": "123238",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Approved by the merchant",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624461913704,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT"
        },
        "additionalInfo": {
            "paymentNetwork": "CREDIBANCO",
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
         <accountId>512321</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-23T19:59:43.229Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>1d6c33aed575c4974ad5c0be7c6a1c87</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>65000</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX</string>
               <additionalValue>
                  <value>10378</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX_RETURN_BASE</string>
               <additionalValue>
                  <value>54622</value>
                  <currency>COP</currency>
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
               <street1>Cr 23 No. 53-50</street1>
               <street2>5555487</street2>
               <city>Bogotá</city>
               <state>Bogotá D.C.</state>
               <country>CO</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
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
         <billingAddress>
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <creditCard>
         <number>4037997623271984</number>
         <securityCode>321</securityCode>
         <expirationDate>2030/12</expirationDate>
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
      <paymentCountry>CO</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
      <threeDomainSecure>
         <embedded>false</embedded>
         <eci>01</eci>
         <cavv>AOvG5rV058/iAAWhssPUAAADFA==</cavv>
         <xid>Nmp3VFdWMlEwZ05pWGN3SGo4TDA=</xid>
         <directoryServerTransactionId>00000-70000b-5cc9-0000-000000000cb</directoryServerTransactionId>
      </threeDomainSecure>
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
        <orderId>1400449666</orderId>
        <transactionId>c29d0543-810d-48c4-bd3e-163e935c2173</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>79</paymentNetworkResponseCode>
        <trazabilityCode>CRED - 666116683</trazabilityCode>
        <authorizationCode>787517</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Approved administrative transaction</responseMessage>
        <operationDate>2021-06-23T10:26:28</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>CREDIBANCO</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <cardType>CREDIT</cardType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Enviar transações usando Bre-B QR {#submit-transactions-using-bre-b-qr}

Este método permite processar pagamentos realizados por seus clientes através do **Bre-B QR**. Para integrar este método de pagamento, você deve exibir um código QR na página de checkout para que o cliente possa escaneá-lo usando seu aplicativo bancário ou carteira digital e concluir o pagamento.

Ao final do processo, o cliente verá uma página de pagamento como a mostrada abaixo:

<img src="/assets/Payments/qr01.png" alt="PrintScreen" width="70%"><br>

### Como funciona o Bre-B QR?

O Bre-B QR permite pagamentos rápidos e seguros. É um método de pagamento online no qual o pagador escaneia um código QR dinâmico com um valor fixo usando qualquer aplicativo bancário compatível ou carteira digital e segue as etapas indicadas por sua instituição financeira.  

Como um sistema interoperável, os pagadores podem escanear o código QR usando as principais instituições financeiras do país, entre outras. Assim que o pagamento for concluído, você receberá os fundos imediatamente em sua conta virtual PayU.

### Disponibilidade

O Bre-B QR está disponível em diferentes modelos de integração, permitindo que você o implemente facilmente de acordo com seu canal ou fluxo de pagamento.

Você pode habilitá-lo em qualquer uma das seguintes opções:

*	Modelo Agregador (PSP)
*	Integração via Web Checkout
*	Integração via API
*	Link de Pagamento (disponível no Painel do Comerciante e no App PayU)

### Experiência do usuário {#user-experience}

O Bre-B QR oferece dois tipos de experiência do usuário:

1.	**Experiência em PC:** O código QR é gerado em um computador. O pagador o escaneia com seu smartphone usando um aplicativo bancário ou carteira digital para concluir o pagamento.  
2.	**Experiência em dispositivo móvel:** O código QR é gerado diretamente no smartphone. O pagador salva a imagem do QR em sua galeria e a envia em seu aplicativo bancário ou carteira digital para concluir o pagamento.

### Observações {#considerations-1}

Antes de implementar o **Bre-B QR**, considere os seguintes aspectos técnicos e de experiência do usuário. Essas recomendações o ajudarão a garantir um processo de integração adequado e uma experiência de pagamento fluida para seus clientes.

* Verifique se este método de pagamento está habilitado em sua conta PayU. Caso ainda não esteja ativo, solicite sua ativação enviando um e-mail para **comercios.co@payu.com**.  
* O código QR é gerado como uma imagem **base64**, com dimensões de **158x158 px** e formato **PNG**.  
* O código QR **expira 15 minutos** após ser gerado. Inclua um cronômetro visível para indicar o tempo restante antes da expiração.  
* Na experiência do usuário, inclua o **logotipo Bre-B & DING** e o nome do método de pagamento **“Bre-B QR”**.  
* Certifique-se de exibir as **instruções para o pagador** e os **campos do formulário** conforme mostrado nas imagens a seguir.

1. Solicite os dados do pagador.

<img src="/assets/Payments/qr02.png" alt="PrintScreen" width="70%"><br>

2. Exiba os métodos de pagamento disponíveis.

<img src="/assets/Payments/qr01.png" alt="PrintScreen" width="70%"><br>

3. Quando o usuário selecionar **Bre-B QR**, exiba as instruções que ele deve seguir para concluir o pagamento.

<img src="/assets/Payments/qr03.png" alt="PrintScreen" width="70%"><br>

4. Gere e exiba o **código QR** que o pagador deve escanear, juntamente com um **cronômetro** indicando o tempo restante antes da expiração do código.

<img src="/assets/Payments/qr04.png" alt="PrintScreen" width="70%"><br>

5. Após a conclusão do pagamento, exiba o **resumo da transação bem-sucedida**, incluindo detalhes de faturamento ou qualquer outra informação relevante para o pagador, conforme aplicável.

<img src="/assets/Payments/qr05.png" alt="PrintScreen" width="70%"><br>

### Parâmetros de solicitação e resposta {#parameters-for-request-and-response-1}

<details>
<summary><b>Solicitação</b></summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório | 
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma utilizado na solicitação. Este idioma determina as mensagens de erro exibidas. [Veja os idiomas suportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx:32 | Atribua `SUBMIT_TRANSACTION`. | Sim |
| `test` (JSON)<hr>`isTest` (XML) | Booleano |  | Atribua `true` se a solicitação estiver em modo de teste. Caso contrário, atribua `false`. | Sim |
| `merchant` | Objeto |  | Este objeto contém os dados de autenticação. | Sim |
| `merchant > apiLogin` | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pela PayU. [Como obter meu API Login]({{< ref "integrations.html#api-key-and-api-login" >}}). | Sim |
| `merchant > apiKey` | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pela PayU. [Como obter minha API Key]({{< ref "integrations.html#api-key-and-api-login" >}}). | Sim |
| `transaction` | Objeto | | Este objeto contém os dados da transação. | Sim |
| `transaction > order` | Objeto | | Este objeto contém os dados do pedido. | Sim |
| `transaction > order > accountId` | Numérico | | Identificador da sua conta. | Sim |
| `transaction > order > referenceCode` | Alfanumérico | Mín:1 Máx:255 | Representa o identificador do pedido no seu sistema. | Sim |
| `transaction > order > description` | Alfanumérico | Mín:1 Máx:255 | Descrição do pedido. | Sim |
| `transaction > order > language` | Alfanumérico | 2 | Idioma utilizado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| `transaction > order > notifyUrl` | Alfanumérico | Máx:2048 | URL de confirmação do pedido. | Não |
| `transaction > order > partnerId` | Alfanumérico | Máx:255 | ID do parceiro dentro da PayU. | Não |
| `transaction > order > signature` | Alfanumérico | Máx:255 | Assinatura associada ao formulário. Para mais informações, veja [Assinatura de Autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| `transaction > order > shippingAddress` | Objeto | | Endereço de entrega. | Não |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Máx:100 | Linha 1 do endereço. | Não |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Máx:100 | Linha 2 do endereço. | Não |
| `transaction > order > shippingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço. | Não |
| `transaction > order > shippingAddress > state` | Alfanumérico | Máx:40 | Estado ou departamento do endereço. | Não |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | País do endereço. | Não |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Máx:8 | Código postal do endereço. | Não |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. | Não |
| `transaction > order > buyer` | Objeto |  | Informações do comprador. | Sim |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Máx:100 | Identificador do comprador no seu sistema. | Não |
| `transaction > order > buyer > fullName` | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Máx:255 | Endereço de e-mail do comprador. | Não |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Máx:20 | Telefone do comprador. | Não |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do comprador. | Não |
| `transaction > order > buyer > shippingAddress` | Objeto | | Endereço de entrega do comprador. | Não |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Máx:150 | Linha 1 do endereço do comprador. | Não |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Máx:50 | Cidade do comprador. | Não |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Máx:40 | Estado ou departamento do comprador. | Não |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País do comprador no formato ISO 3166 alpha-2. | Não |
| `transaction > order > buyer > shippingAddress > postalCode` | Numérico | Máx:20 | Código postal do comprador. | Não |
| `transaction > order > buyer > shippingAddress > phone` | Numérico | Máx:20 | Telefone do endereço do comprador. | Não |
| `transaction > order > additionalValues` | Objeto | 64 | Valor do pedido e valores associados. | Sim |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Valor da transação. | Sim |
| `transaction > order > additionalValues > TX_VALUE > value` | Numérico | 12, 2 | Especifica o valor da transação. Este valor não pode incluir decimais. | Sim |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código da moeda em formato ISO. [Veja moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| `transaction > payer` | Objeto | | Informações do pagador. | Sim |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Não |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador do pagador no seu sistema. | Não |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nome completo do pagador. | Sim |
| `transaction > payer > billingAddress` | Objeto |  | Endereço de cobrança. | Não |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Linha 1 do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Linha 2 do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Estado ou departamento do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Não |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Telefone do endereço de cobrança. | Não |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Data de nascimento do pagador. | Não |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Telefone do pagador. | Não |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do pagador. | Não |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sim |
| `transaction > type` | Alfanumérico | 32 | O tipo de transação disponível é `AUTHORIZATION_AND_CAPTURE`. | Sim |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecione um método de pagamento por transferência bancária válido. [Veja métodos de pagamento disponíveis para a Colômbia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sim |
| `transaction > paymentCountry` | Alfanumérico | 2 | Atribua `CO` para Colômbia. | Sim |
| `transaction > deviceSessionId` | Alfanumérico | Máx:255 | Identificador da sessão do dispositivo onde o cliente realiza a transação. Para mais informações, veja [este artigo]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente realiza a transação. | Sim |
| `transaction > cookie` | Alfanumérico | Máx:255 | Cookie armazenado pelo dispositivo onde o cliente realiza a transação. | Sim |
| `transaction > userAgent` | Alfanumérico | Máx:1024 | User agent do navegador onde o cliente realiza a transação. | Sim |
| `transaction > extraParameters` | Objeto | | Parâmetros ou dados adicionais associados à solicitação. | Sim |

</details>

<details>
<summary><b>Resposta</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| `code` | Alfanumérico | | Código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | Mensagem de erro associada quando o código de resposta é `ERROR`. |
| `transactionResponse` | Objeto | | Dados da resposta. |
| `transactionResponse > orderId` | Numérico | | Identificador do pedido gerado ou existente no PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | Identificador da transação no PayU. |
| `transactionResponse > state` | Alfanumérico | Máx:32 | Status da transação. Como o pagamento é processado externamente, o status de uma transação bem-sucedida é `PENDING`. |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx:255 | Código de resposta retornado pela rede bancária. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx:255 | Mensagem de erro retornada pela rede bancária. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx:32 | Código de rastreabilidade retornado pela rede bancária. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx:12 | Código de autorização retornado pela rede bancária. |
| `transactionResponse > pendingReason` | Alfanumérico | Máx:21 | Código de motivo associado ao status da transação. Conforme mencionado em `transactionResponse > state`, a transação está pendente de pagamento. |
| `transactionResponse > responseCode` | Alfanumérico | Máx:64 | Código de resposta associado ao status da transação. Neste caso, para uma transação bem-sucedida, o valor é `PENDING_TRANSACTION_CONFIRMATION`. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| `transactionResponse > operationDate` | Data | | Data em que a resposta foi criada no sistema PayU. |
| `transactionResponse > extraParameters` | Objeto | | Parâmetros ou dados adicionais associados à resposta. |

</details>

### Chamada da API {#api-call-1}

The following are the request and response bodies for this payment method.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
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
      "accountId": "521245",
      "referenceCode": "Houston 123456789918",
      "description": "Houston",
      "language": "en",
      "notifyUrl": "http://www.test.com/confirmation",
      "additionalValues": {
        "TX_VALUE": {
          "value": 1000,
          "currency": "COP"
        }
      },
      "buyer": {
        "merchantBuyerId": "1",
        "fullName": "APPROVED",
        "emailAddress": "john.doe@email.com",
        "contactPhone": "7563126",
        "dniNumber": "5415668464654",
        "shippingAddress": {
          "street1": "calle 99",
          "street2": "123",
          "city": "Medellin",
          "state": "Antioquia",
          "country": "CO",
          "postalCode": "0000000",
          "phone": "7563126"
        }
      },
      "shippingAddress": {
        "street1": "calle 99",
        "street2": "123",
        "city": "Medellin",
        "state": "Antioquia",
        "country": "CO",
        "postalCode": "0000000",
        "phone": "7563126"
      }
    },
    "payer": {
      "merchantPayerId": "1",
      "fullName": "APPROVED",
      "emailAddress": "john.doe@payu.com",
      "contactPhone": "7563126",
      "dniNumber": "5415668464654",
      "billingAddress": {
        "street1": "calle 99",
        "street2": "123",
        "city": "Bogota",
        "state": "Bogota",
        "country": "CO",
        "postalCode": "0000000",
        "phone": "7563126"
      }
    },
    "type": "AUTHORIZATION_AND_CAPTURE",
    "paymentMethod": "INTEROPERABLE_QR",
    "paymentCountry": "CO"
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
    "orderId": 1438936173,
    "transactionId": "bccc494c-97bf-4b7b-84ec-a7e9dac15449",
    "state": "PENDING",
    "paymentNetworkResponseCode": null,
    "paymentNetworkResponseErrorMessage": null,
    "trazabilityCode": "a7463eca-3197-4a7f-8928-fbc7ca6017ea",
    "authorizationCode": null,
    "pendingReason": "AWAITING_NOTIFICATION",
    "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
    "errorCode": null,
    "responseMessage": null,
    "transactionDate": null,
    "transactionTime": null,
    "operationDate": 1741780199019,
    "referenceQuestionnaire": null,
    "extraParameters": {
      "EXPIRATION_DATE": 1742490236444,
      "URL_PAYMENT_RECEIPT_PDF": "http://ppp-web-gateway-payu.transactional.payu.preprod/ppp-web-gateway-payu/receipt?vid=1438936173Ybccc494c97bf4b7Y5f4bcef70c4d7b6",
      "QRCODE_IMAGE_BASE64": "iVBORw0KGgoAAAANSUhEUgAAAJ4AAACeAQAAAADr/o7WAAAEG0lEQVR4Xn2XQYqjOwyEDd4KdBWDtwZfXaCtQFcxaCvQlPN2M/5faJLuD5K2paqS0urfR7a/SV0oLY96rhjU19nF2egNPb3x6LHdTsywYWVvaFQ1/JzJyZSHwuQT4gNGrDMikj34f2BsCunhkq0NSvqCntqnuk5eI2fFyN85H1Ca/fX43f0Bq06P4xa6WlaU/1fPBxTiIbO1tYPa9mwx1xtqHedR1ktOtVFl/gWT8Owtxt7cVWnKB7Teh5xjnc/IDGdxe0NfGw1xJllyNseZa71hTvyJS8bWUBqdU+gNqznXVp62Bxp3htL6gKH7GI/w1shPpfoHjDaXoNAsVglFtH7L94JV5CqxdPcTrtQW38a94Nni0Qf7WIfkTG3rA3aRLZEoXSTku+Ke8wUdqm6zZspV1gmOmW8IPy0V2/AMT1Y6Bv08oeY6Nd2moW8Dr9vpDYNnP1C1MhrDzUoh2yesRmvjiWIeOBfa5NujF3Q96a6+kzIVvdN8QydtcD6UsNLG0XVF+4TBEqPYqpakT2OWD+jCzK3xlN7a8Witf8BgNGOWoiYOMVDF/oBqshAsNfoqfIZDtPmGsttahbN36oqwQlTaG1ZjhBWc7yuLEZR8FfKCoSVm3jsjKgnZ9jvnC6Yd/B9Cw9bMrrZSPqD5gaA69I9A48A10eInrBOQt993zWLP0fVq/gF1qt2DByoYKB3cS2+IfsH7MadOZBAarTjSE4rXhrbPcrjm3oJvVD7h6ilw38HBahykqn9AWN944u0bHJbB2egNT1vJrQTF3koIP0KLn9A2xL2vo2++QuWR9oZHRrakWDLQN5lcPd/Qe66tQn0LKW868wuqMNUQDtk4nflunT6gSx+JJ1kr1+DtuMATJgbYPmS09PwKTD8tPSBcrQMjsoQwnw16uC5+wcBEhFXaYDmt3/Sjm8kPiAOd5ja41u4chnFCb2hDjBtCVW5o+ZSwLxiLcLvMmxg07sD6gIrJgD1GF4Y+ftcGQ3xAbAZatqbi4dPXtFvPBxRL3GBIbkwURJDfIfWESIcDnS4==",
      "URL_PAYMENT_RECEIPT_HTML": "http://ppp-web-gateway-payu.transactional.payu.preprod/ppp-web-gateway-payu/app/v2?vid=1438936173Ybccc494c97bf4b7Y5f4bcef70c4d7b6"
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
  <language>es</language>
  <command>SUBMIT_TRANSACTION</command>
  <merchant>
    <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
  </merchant>
  <transaction>
    <order>
      <accountId>521245</accountId>
      <referenceCode>Houston 123456789918</referenceCode>
      <description>Houston</description>
      <language>en</language>
      <notifyUrl>http://www.test.com/confirmation</notifyUrl>
      <additionalValues>
        <TX_VALUE>
          <value>1000</value>
          <currency>COP</currency>
        </TX_VALUE>
      </additionalValues>
      <buyer>
        <merchantBuyerId>1</merchantBuyerId>
        <fullName>APPROVED</fullName>
        <emailAddress>john.doe@payu.com</emailAddress>
        <contactPhone>7563126</contactPhone>
        <dniNumber>5415668464654</dniNumber>
        <shippingAddress>
          <street1>calle 99</street1>
          <street2>123</street2>
          <city>Medellin</city>
          <state>Antioquia</state>
          <country>CO</country>
          <postalCode>0000000</postalCode>
          <phone>7563126</phone>
        </shippingAddress>
      </buyer>
      <shippingAddress>
        <street1>calle 99</street1>
        <street2>123</street2>
        <city>Medellin</city>
        <state>Antioquia</state>
        <country>CO</country>
        <postalCode>0000000</postalCode>
        <phone>7563126</phone>
      </shippingAddress>
    </order>
    <payer>
      <merchantPayerId>1</merchantPayerId>
      <fullName>APPROVED</fullName>
      <emailAddress>john.doe@payu.com</emailAddress>
      <contactPhone>7563126</contactPhone>
      <dniNumber>5415668464654</dniNumber>
      <billingAddress>
        <street1>calle 99</street1>
        <street2>123</street2>
        <city>Bogota</city>
        <state>Bogota</state>
        <country>CO</country>
        <postalCode>0000000</postalCode>
        <phone>7563126</phone>
      </billingAddress>
    </payer>
    <type>AUTHORIZATION_AND_CAPTURE</type>
    <paymentMethod>INTEROPERABLE_QR</paymentMethod>
    <paymentCountry>CO</paymentCountry>
  </transaction>
  <isTest>false</isTest>
</request>
```
<br>

**Exemplo de uma resposta:**
```XML
<response>
  <code>SUCCESS</code>
  <error xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
  <transactionResponse>
    <orderId>1438936173</orderId>
    <transactionId>bccc494c-97bf-4b7b-84ec-a7e9dac15449</transactionId>
    <state>PENDING</state>
    <paymentNetworkResponseCode xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
    <paymentNetworkResponseErrorMessage xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
    <trazabilityCode>a7463eca-3197-4a7f-8928-fbc7ca6017ea</trazabilityCode>
    <authorizationCode xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
    <pendingReason>AWAITING_NOTIFICATION</pendingReason>
    <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
    <errorCode xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
    <responseMessage xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
    <transactionDate xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
    <transactionTime xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
    <operationDate>1741780199019</operationDate>
    <referenceQuestionnaire xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
    <extraParameters>
      <EXPIRATION_DATE>1742490236444</EXPIRATION_DATE>
      <URL_PAYMENT_RECEIPT_PDF>http://ppp-web-gateway-payu.transactional.payu.preprod/ppp-web-gateway-payu/receipt?vid=1438936173Ybccc494c97bf4b7Y5f4bcef70c4d7b6</URL_PAYMENT_RECEIPT_PDF>
      <QRCODE_IMAGE_BASE64>iVBORw0KGgoAAAANSUhEUgAAAJ4AAACeAQAAAADr/o7WAAAEG0lEQVR4Xn2XQYqjOwyEDd4KdBWDtwZfXaCtQFcxaCvQlPN2M/5faJLuD5K2paqS0urfR7a/SV0oLY96rhjU19nF2egNPb3x6LHdTsywYWVvaFQ1/JzJyZSHwuQT4gNGrDMikj34f2BsCunhkq0NSvqCntqnuk5eI2fFyN85H1Ca/fX43f0Bq06P4xa6WlaU/1fPBxTiIbO1tYPa9mwx1xtqHedR1ktOtVFl/gWT8Owtxt7cVWnKB7Teh5xjnc/IDGdxe0NfGw1xJllyNseZa71hTvyJS8bWUBqdU+gNqznXVp62Bxp3htL6gKH7GI/w1shPpfoHjDaXoNAsVglFtH7L94JV5CqxdPcTrtQW38a94Nni0Qf7WIfkTG3rA3aRLZEoXSTku+Ke8wUdqm6zZspV1gmOmW8IPy0V2/AMT1Y6Bv08oeY6Nd2moW8Dr9vpDYNnP1C1MhrDzUoh2yesRmvjiWIeOBfa5NujF3Q96a6+kzIVvdN8QydtcD6UsNLG0XVF+4TBEqPYqpakT2OWD+jCzK3xlN7a8Witf8BgNGOWoiYOMVDF/oBqshAsNfoqfIZDtPmGsttahbN36oqwQlTaG1ZjhBWc7yuLEZR8FfKCoSVm3jsjKgnZ9jvnC6Yd/B9Cw9bMrrZSPqD5gaA69I9A48A10eInrBOQt993zWLP0fVq/gF1qt2DByoYKB3cS2+IfsH7MadOZBAarTjSE4rXhrbPcrjm3oJvVD7h6ilw38HBahykqn9AWN944u0bHJbB2egNT1vJrQTF3koIP0KLn9A2xL2vo2++QuWR9oZHRrakWDLQN5lcPd/Qe66tQn0LKW868wuqMNUQDtk4nflunT6gSx+JJ1kr1+DtuMATJgbYPmS09PwKTD8tPSBcrQMjsoQwnw16uC5+wcBEhFXaYDmt3/Sjm8kPiAOd5ja41u4chnFCb2hDjBtCVW5o+ZSwLxiLcLvMmxg07sD6gIrJgD1GF4Y+ftcGQ3xAbAZatqbi4dPXtFvPBxRL3GBIbkwURJDfIfWESIcDnS4==</QRCODE_IMAGE_BASE64>
      <URL_PAYMENT_RECEIPT_HTML>http://ppp-web-gateway-payu.transactional.payu.preprod/ppp-web-gateway-payu/app/v2?vid=1438936173Ybccc494c97bf4b7Y5f4bcef70c4d7b6</URL_PAYMENT_RECEIPT_HTML>
    </extraParameters>
    <additionalInfo xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
  </transactionResponse>
</response>
```

{{< /tab >}}

{{< /tabs >}}

## Enviar transações usando transferência bancária (PSE) {#submit-transactions-using-bank-transfer-pse}

Este método permite processar os pagamentos de seus clientes por transferência bancária. Na Colômbia, as transferências bancárias são feitas com o PSE, Para fazer uma integração com esta forma de pagamento, é necessário criar um formulário de pagamento seguindo estas etapas:

1. Inclua um botão PSE deixando claro que seu cliente usará _Proveedor de Servicios Electrónicos PSE_.
* Você pode usar os seguintes nomes em espanhol:
    - Débito desde cuenta corriente/ahorros
    - Débito bancario PSE
    - PSE
* Não use nenhum dos seguintes nomes:
    - Transferencia bancaria
    - Débito de cuenta
    - Tarjeta débito

2. Consulte a lista de bancos disponíveis para mostrá-los ao pagador. Para consultar a lista de bancos, [consulte este método]({{< ref "#banks-list---pse" >}}).<br>Você deve atualizar a lista de bancos em seu sistema uma vez por dia.

3. Apresente a lista de bancos conforme exibido abaixo:

<img src="/assets/Payments/PSEBankList_PT.png" alt="PrintScreen" width="50%"><br>

Quando o pagador seleciona um banco, você deve enviar o parâmetro `pseCode` da seleção no parâmetro extra `FINANCIAL_INSTITUTION_CODE` no pedido.

4. Apresente uma lista para permitir que o pagador escolha se é uma pessoa _Física_ (N) ou _Jurídica_ (J). Dependendo da escolha do pagador, deve-se enviar o valor no parâmetro extra `USER_TYPE` no pedido. A lista deve ser exibida da seguinte forma:

<img src="/assets/Payments/PSEPersonList_PT.png" alt="PrintScreen" width="50%"><br>

{{% alert title="Nota" color="info"%}}

Este campo não é obrigatório para o _PSE Avanza_.

{{% /alert %}}

5. Mostre uma lista para permitir que o pagador escolha um tipo de identificação. Você deve enviar o código ISO do valor selecionado no parâmetro extra `PSE_REFERENCE2` do pedido. A lista deve ser exibida da seguinte forma:

<img src="/assets/Payments/PSEDocType_PT.png" alt="PrintScreen" width="50%"><br>

A lista de documentos disponíveis é:

| `ISO` | Descrição |
|:-:|-|
| `CC` | Cartão de cidadania. |
| `CE` | Cartão de cidadão estrangeiro. |
| `NIT` | Número de identificação fiscal (empresas). |
| `TI` | Cartão de identidade. |
| `PP` | Passaporte. |
| `RC` | Certidão de nascimento. |
| `DE` | Documento de identificação de estrangeiro. |

6. Você deve enviar o número de identificação do pagador no parâmetro extra `PSE_REFERENCE3` do pedido.

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-1}

<details>
<summary><b>Solicitação</b></summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx:32 | Definir `SUBMIT_TRANSACTION`. | Sim |
| `test` (JSON)<hr>`isTest` (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| `merchant` | Objeto | | Este objeto contém os dados de autenticação. | Sim |
| `merchant > apiLogin` | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `merchant > apiKey` | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `transaction` | Objeto | | Este objeto contém os dados da transação. | Sim |
| `transaction > order` | Objeto | | Este objeto contém os dados da ordem. | Sim |
| `transaction > order > accountId` | Número | | Identificador da sua conta. | Sim |
| `transaction > order > referenceCode` | Alfanumérico | Mín:1 Máx:255 | Representa o identificador da ordem em seu sistema. | Sim |
| `transaction > order > description` | Alfanumérico | Mín:1 Máx:255 | Descrição da ordem. | Sim |
| `transaction > order > language` | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| `transaction > order > notifyUrl` | Alfanumérico | Máx:2048 | URL de confirmação da ordem. | Não|
| `transaction > order > partnerId` | Alfanumérico | Máx:255 | ID de parceiro no PayU. | Não |
| `transaction > order > signature` | Alfanumérico | Máx:255 | A assinatura associada ao formulário. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| `transaction > order > shippingAddress` | Objeto | | Endereço para envio. | Não |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Máx:100 | Endereço: Linha 1. | Não |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Máx:100 | Endereço: Linha 2. | Não |
| `transaction > order > shippingAddress > city` | Alfanumérico | Máx:50 | Endereço: cidade. | Não |
| `transaction > order > shippingAddress > state` | Alfanumérico | Máx:40 | Endereço: estado. | Não |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | Endereço: país. | Não |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Máx:8 | Endereço: Código postal. | Não |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. | Não |
| `transaction > order > buyer` | Objeto | | Informações do comprador. | Sim |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| `transaction > order > buyer > fullName` | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Máx:255 | E-mail do comprador. | Sim |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do comprador. | Sim |
| `transaction > order > buyer > shippingAddress` | Alfanumérico | | Endereço de envio do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País do endereço do comprador no formato ISO 3166 alpha-2. | Sim |
| `transaction > order > buyer > shippingAddress > postalCode` | Número | Máx:20 | Código postal do endereço do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > phone` | Número | Máx:20 | Número de telefone do endereço do comprador. | Sim |
| `transaction > order > additionalValues` | Objeto | 64 | Valor da ordem ou seus valores associados. | Sim |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Valor da transação. | Sim |
| `transaction > order > additionalValues > TX_VALUE > value` | Número | 12, 2 | Especifica o valor da transação. Este valor não pode incluir decimais. | Sim |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| `transaction > payer` | Objeto | | Informações do pagador. | Sim |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nome of the payer. | Sim |
| `transaction > payer > billingAddress` | Objeto | | Endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Endereço de cobrança linha 1. | Sim |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Sim |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Data de nascimento do pagador. | Não |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do pagador. | Sim |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do pagador. | Sim |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sim |
| `transaction > type` | Alfanumérico | 32 | Como esses pagamentos são realizados no site PSE, la única transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sim |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecione um método de pagamento válido em Transferência Bancária. [Veja os métodos de pagamento disponíveis na Colômbia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sim |
| `transaction > paymentCountry` | Alfanumérico | 2 | Definir `CO` para a Colômbia. | Sim |
| `transaction > deviceSessionId` | Alfanumérico | Máx:255 | Identificador da sessão do dispositivo onde o cliente faz a transação. Para obter mais informações, consulte [este tópico]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |
| `transaction > cookie` | Alfanumérico | Máx:255 | Cookie armazenado pelo dispositivo onde o cliente faz a transação. | Sim |
| `transaction > userAgent` | Alfanumérico | Máx:1024 | O agente do usuário do navegador onde o cliente faz a transação. | Sim |
| `transaction > extraParameters` | Objeto | | Parâmetros adicionais ou dados associados à requisição. <br>Para pagamentos por transferência bancária, esta é a página de resposta do seu comércio.<br>Em JSON, o parâmetro _extraParameters_ é atribuído como: <br>`"extraParameters": {`<br>&emsp;`"RESPONSE_URL": "http://www....",`<br>&emsp;`"PSE_REFERENCE1": "example_value"`,<br>&emsp;`"FINANCIAL_INSTITUTION_CODE": "XXXX"`,<br>&emsp;`"USER_TYPE": "N"`,<br>&emsp;`"PSE_REFERENCE2": "example_value"`,<br>&emsp;`"PSE_REFERENCE3": "123456789"`<br>`}`<br><br><span style="color: #A6C307;">Nota:</span> Tenha em mente que para o campo `"USER_TYPE"`, os valores permitidos são: <li> `"N"` para **pessoa física** <li> `"J"` para **pessoa jurídica**.<br><br>Em XML, o parâmetro _extraParameters_ é atribuído como: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>  `<string>RESPONSE_URL</string>`<br>  `<string>http://www....</string>`<br>&emsp;`</entry>`<br>&emsp;`<entry>`<br>  `<string>PSE_REFERENCE1</string>`<br>  `<string>example_value</string>`<br>&emsp;`</entry>`<br>&emsp;`<entry>` `<string>FINANCIAL_INSTITUTION_CODE</string>`<br>  `<string>XXXX</string>`<br>&emsp;`</entry>`<br>&emsp;`<entry>`<br>  `<string>USER_TYPE</string>`<br>  `<string>N</string>`<br>&emsp;`</entry>`<br>&emsp;`<entry>`<br>  `<string>PSE_REFERENCE2</string>`<br>  `<string>example_value</string>`<br>&emsp;`</entry>`<br>&emsp;`<entry>`<br>  `<string>PSE_REFERENCE3</string>`<br>  `<string>123456789</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`<br><br><span style="color: #A6C307;">Nota:</span> Tenha em mente que para o campo `<string>USER_TYPE</string>`, os valores permitidos são: <li> `<string>N</string>`: para **pessoa física**. <li> `<string>J</string>`: para **pessoa jurídica**. | Sim |

</details>

<details>
<summary><b>Resposta</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| `code` | Alfanumérico | | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| `transactionResponse` | Objeto | | Os dados de resposta. |
| `transactionResponse > orderId` | Número | | O ID de ordem gerado ou existente no PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | O identificador da transação no PayU. |
| `transactionResponse > state` | Alfanumérico | Máx:32 | O status da transação. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx:255 | O código de resposta fornecido pela rede financeira. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx:255 | A mensagem de erro fornecida pela rede financeira. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx:32 | O código de rastreamento fornecido pela rede financeira. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx:12 | O código de autorização fornecido pela rede financeira. |
| `transactionResponse > pendingReason` | Alfanumérico | Máx:21 | O código de resposta associado ao status, conforme mencionado em `transactionResponse > state`, a transação está aguardando o pagamento. |
| `transactionResponse > responseCode` | Alfanumérico | Máx:64 | O código de resposta associado ao status. Neste caso, para transações bem-sucedidas é `PENDING_TRANSACTION_CONFIRMATION`. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| `transactionResponse > operationDate` | Date | | Data de criação da resposta no sistema PayU. |
| `transactionResponse > extraParameters` | Objeto | | Parâmetros ou dados adicionais associados à resposta.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"BANK_URL": "xxxx"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_URL</string>`<br>&emsp;&emsp;`<string>xxxx</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Observações {#considerations-2}

* Para testar as transferências bancárias PSE no ambiente PayU Sandbox, consulte o [Guia de teste PSE (PDF - em espanhol)](/assets/pse-test-guide-v5-es.pdf).
* Todos os valores do processo de pagamento devem ser formatados em milhares (ou seja, 1.200,00 ou 1.200) sem exceção.
* Se a solicitação de pagamento for bem-sucedida, a transação tem estado `PENDING` e responseCode `PENDING_TRANSACTION_CONFIRMATION`; Isso ocorre porque o pagador é redirecionado ao banco selecionado para concluir o pagamento; Você deve redirecionar o pagador para a URL retornada no parâmetro extra `BANK_URL`.
* A URL retornada no parâmetro extra `BANK_URL` está configurada no Módulo PayU e deve apresentar as seguintes informações:<br><br>![PrintScreen](/assets/Payments/PSEresponse-pt.png)<br>Os parâmetros que começam com o símbolo $ são enviados via `GET`.
* Assim que o cliente clicar no botão Pagar, este deve ser desabilitado para evitar o envio de uma nova solicitação do mesmo pagamento.
* Recomenda-se exibir uma mensagem de espera enquanto seu cliente é redirecionado.
* Não mostrar o site do banco em containers (molduras, paineis, iframes etc). O processo de pagamento deve ser fluido. Além disso, evite abrir o site do banco em uma nova aba ou janela do navegador. Se precisar usar uma nova aba ou janela, bloqueie a página de origem para evitar o envio de uma nova solicitação do mesmo pagamento.
* Na página de resposta, você deve adicionar as opções para tentar novamente o pagamento, finalizar a transação e imprimir o comprovante.
* O status exibido na página de resposta pode ser qualquer um dos seguintes:


| polTransactionState | polResponseCode | Estado |
|-|-|-|
| `4` | `1` | Transação aprovada |
| `6` | `5` | Transação falhou |
| `6` | `4` | Transação rejeitada |
| `12` ou `14` | `9994` ou `25` | Transação pendente, verifique se o débito foi feito no banco. |

### Chamada da API {#api-call-2}

A seguir estão o corpo do pedido e da resposta deste meio de pagamento.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
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
         "accountId": "512321",
         "referenceCode": "PRODUCT_TEST_2021-06-23T19:59:43.229Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "1d6c33aed575c4974ad5c0be7c6a1c87",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 65000,
               "currency": "COP"
         },
            "TX_TAX": {
               "value": 10378,
               "currency": "COP"
         },
            "TX_TAX_RETURN_BASE": {
               "value": 54622,
               "currency": "COP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Cr 23 No. 53-50",
               "street2": "5555487",
               "city": "Bogotá",
               "state": "Bogotá D.C.",
               "country": "CO",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "5555487",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
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
         "billingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "125544",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "extraParameters": {
         "RESPONSE_URL": "http://www.payu.com/response",
         "PSE_REFERENCE1": "127.0.0.1",
         "FINANCIAL_INSTITUTION_CODE": "1022",
         "USER_TYPE": "N",
         "PSE_REFERENCE2": "CC",
         "PSE_REFERENCE3": "123456789"
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "PSE",
      "paymentCountry": "CO",
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
        "orderId": 1400449959,
        "transactionId": "4d49e544-e23f-474e-92b1-59357e0e85e8",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "2204682",
        "authorizationCode": null,
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624471332753,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "TRANSACTION_CYCLE": "1",
            "BANK_URL": "https://sandbox.api.payulatam.com/payments-api/pse-caller?enc=aHR0cHM6Ly9yZWdpc3Ryby5kZXNhcnJvbGxvLnBzZS5jb20uY28vUFNFVXNlclJlZ2lzdGVyL1N0YXJ0VHJhbnNhY3Rpb24uYXNweD9lbmM9dG5QY0pITUtsU25tUnBITThmQWJ1NHVWTmt6YW92Q0tWR2g0b0IxbEpkOXNEeGlSU2E5cXl1Uk5TUW5mbkxSdiMjcGF5ZXJfdGVzdEB0ZXN0LmNvbSMjMTIzNDU2Nzg5IyNDQw=="
        },
        "additionalInfo": {
            "paymentNetwork": "PSE",
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
         <accountId>512321</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-23T19:59:43.229Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>1d6c33aed575c4974ad5c0be7c6a1c87</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>65000</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX</string>
               <additionalValue>
                  <value>10378</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX_RETURN_BASE</string>
               <additionalValue>
                  <value>54622</value>
                  <currency>COP</currency>
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
               <street1>Cr 23 No. 53-50</street1>
               <street2>5555487</street2>
               <city>Bogotá</city>
               <state>Bogotá D.C.</state>
               <country>CO</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
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
         <billingAddress>
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <extraParameters>
         <entry>
            <string>RESPONSE_URL</string>
            <string>http://www.payu.com/response</string>
         </entry>
         <entry>
            <string>PSE_REFERENCE1</string>
            <string>127.0.0.1</string>
         </entry>
         <entry>
            <string>FINANCIAL_INSTITUTION_CODE</string>
            <string>1022</string>
         </entry>
         <entry>
            <string>USER_TYPE</string>
            <string>N</string>
         </entry>
         <entry>
            <string>PSE_REFERENCE2</string>
            <string>CC</string>
         </entry>
         <entry>
            <string>PSE_REFERENCE3</string>
            <string>123456789</string>
         </entry>
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>PSE</paymentMethod>
      <paymentCountry>CO</paymentCountry>
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
        <orderId>1400449974</orderId>
        <transactionId>6c99b11b-fe6f-4270-8c9a-dfc35b7c7e34</transactionId>
        <state>PENDING</state>
        <trazabilityCode>2204695</trazabilityCode>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <operationDate>2021-06-23T13:12:14</operationDate>
        <extraParameters>
            <entry>
                <string>TRANSACTION_CYCLE</string>
                <string>1</string>
            </entry>
            <entry>
                <string>BANK_URL</string>
                <string>https://sandbox.api.payulatam.com/payments-api/pse-caller?enc=aHR0cHM6Ly9yZWdpc3Ryby5kZXNhcnJvbGxvLnBzZS5jb20uY28vUFNFVXNlclJlZ2lzdGVyL1N0YXJ0VHJhbnNhY3Rpb24uYXNweD9lbmM9dG5QY0pITUtsU25tUnBITThmQWJ1NHVWTmt6YW92Q0tWR2g0b0IxbEpkJTJmSGhQT0oyU2t4UnRmOEdLTk5tcGNYIyNwYXllcl90ZXN0QHRlc3QuY29tIyMxMjM0NTY3ODkjI0ND</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>PSE</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

### Lista de bancos para PSE {#banks-list-for-pse}

Este método retorna uma lista dos bancos disponíveis para [pagamentos usando PSE]({{< ref "#submit-transactions-using-bank-transfer-pse" >}}). 

#### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-2}

<details>
<summary><b>Solicitação</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx:32 | Definir `GET_BANKS_LIST`. | Sim |
| `test` (JSON)<hr>`isTest` (XML) | Boolean | | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| `merchant` | Objeto | | Este objeto contém os dados de autenticação. | Sim |
| `merchant` > apiLogin` | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `merchant > apiKey` | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `bankListInformation` | Objeto | | Este objeto contém as informações da consulta. | Sim |
| `bankListInformation > paymentMethod` | Alfanumérico | | Definir `PSE`. | Sim |
| `bankListInformation > paymentCountry` | Alfanumérico | | Definir `CO`. | Sim |

</details>

<details>
<summary><b>Resposta</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| `code` | Alfanumérico | | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| `banks` | Objeto | | Lista dos bancos disponíveis no PSE. |
| `banks > id` | Numérico | | Identificador interno do banco. |
| `banks > description` | Alfanumérico | | Nome do banco a ser exibido na lista. |
| `banks > pseCode` | Alfanumérico | | Código para enviar no parâmetro extra `FINANCIAL_INSTITUTION_CODE` do pedido de pagamento. |

</details>

### Chamada da API {#api-call-3}

A seguir estão os corpos do pedido e resposta deste método.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Exemplo de uma solicitação:**
```JSON
{
   "language": "es",
   "command": "GET_BANKS_LIST",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "test": false,
   "bankListInformation": {
      "paymentMethod": "PSE",
      "paymentCountry": "CO"
   }
}
```
<br>

**Exemplo de uma resposta:**
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "banks": [       
        {
            "id": "d9280852-47a5-4e99-94ac-3d7648ba79a3",
            "description": "BANCO AGRARIO",
            "pseCode": "1040"
        },        
        {
            "id": "6e61a91d-58bf-46ec-aa09-1f44974dda7e",
            "description": "BANCO CAJA SOCIAL",
            "pseCode": "10322"
        },        
        {
            "id": "b1de44f1-cede-4aca-9d3f-3313d5cc0c63",
            "description": "BANCO DAVIVIENDA",
            "pseCode": "1051"
        },        
        {
            "id": "ed06f40e-a1b9-4e48-8851-bffb4cda0480",
            "description": "BANCO DE BOGOTA",
            "pseCode": "1039"
        },        
        {
            "id": "55f59084-cd3b-47d2-a420-6442cdb9e4b1",
            "description": "BANCO DE OCCIDENTE",
            "pseCode": "1023"
        },
        {
            "id": "8e134fca-4fde-44e6-b012-55e8f2d338ca",
            "description": "BANCO FALABELLA",
            "pseCode": "1062"
        },
        {
            "id": "8eb03abf-5608-419b-8d2c-9d90b8ab6b88",
            "description": "BANCO GNB COLOMBIA (ANTES HSBC)",
            "pseCode": "1010"
        },
        {
            "id": "283e0068-749f-43f1-a2e5-340910f41af3",
            "description": "BANCO GNB SUDAMERIS",
            "pseCode": "1012"
        },
        {
            "id": "8b0bf5e7-394d-4f7e-a467-e4d21d04c9fb",
            "description": "BANCO PICHINCHA S.A.",
            "pseCode": "1060"
        },
        {
            "id": "beeb494a-4ce5-41b4-b497-0756f0b6a6d9",
            "description": "BANCO POPULAR",
            "pseCode": "1002"
        },        
        {
            "id": "201acc05-4c4f-49dc-9be6-3261a6ce4a3c",
            "description": "RAPPIPAY",
            "pseCode": "1151"
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
    <command>GET_BANKS_LIST</command>
    <merchant>
        apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <isTest>false</isTest>
    <bankListInformation>
        <paymentMethod>PSE</paymentMethod>
        <paymentCountry>CO</paymentCountry>
    </bankListInformation>
</request>
```
<br>

**Exemplo de uma resposta:**
```XML
<bankListResponse>
    <code>SUCCESS</code>
    <banks>
        <bank>
            <id>d9280852-47a5-4e99-94ac-3d7648ba79a3</id>
            <description>BANCO AGRARIO</description>
            <pseCode>1040</pseCode>
        </bank>
        <bank>
            <id>6e61a91d-58bf-46ec-aa09-1f44974dda7e</id>
            <description>BANCO CAJA SOCIAL</description>
            <pseCode>10322</pseCode>
        </bank>
        <bank>
            <id>b1de44f1-cede-4aca-9d3f-3313d5cc0c63</id>
            <description>BANCO DAVIVIENDA</description>
            <pseCode>1051</pseCode>
        </bank>
        <bank>
            <id>ed06f40e-a1b9-4e48-8851-bffb4cda0480</id>
            <description>BANCO DE BOGOTA</description>
            <pseCode>1039</pseCode>
        </bank>
        <bank>
            <id>55f59084-cd3b-47d2-a420-6442cdb9e4b1</id>
            <description>BANCO DE OCCIDENTE</description>
            <pseCode>1023</pseCode>
        </bank>
        <bank>
            <id>8e134fca-4fde-44e6-b012-55e8f2d338ca</id>
            <description>BANCO FALABELLA</description>
            <pseCode>1062</pseCode>
        </bank>
        <bank>
            <id>8eb03abf-5608-419b-8d2c-9d90b8ab6b88</id>
            <description>BANCO GNB COLOMBIA (ANTES HSBC)</description>
            <pseCode>1010</pseCode>
        </bank>
        <bank>
            <id>283e0068-749f-43f1-a2e5-340910f41af3</id>
            <description>BANCO GNB SUDAMERIS</description>
            <pseCode>1012</pseCode>
        </bank>
        <bank>
            <id>8b0bf5e7-394d-4f7e-a467-e4d21d04c9fb</id>
            <description>BANCO PICHINCHA S.A.</description>
            <pseCode>1060</pseCode>
        </bank>
        <bank>
            <id>beeb494a-4ce5-41b4-b497-0756f0b6a6d9</id>
            <description>BANCO POPULAR</description>
            <pseCode>1002</pseCode>
        </bank>
        <bank>
            <id>201acc05-4c4f-49dc-9be6-3261a6ce4a3c</id>
            <description>RAPPIPAY</description>
            <pseCode>1151</pseCode>
        </bank>        
    </banks>
</bankListResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Enviar transações usando Google Pay {#submit-transactions-using-google-pay}

Google Pay é uma carteira digital que lhe permite efetuar pagamentos com cartão de forma fácil e rápida, sem ter de introduzir os dados do seu cartão para cada pagamento. Os dados do cartão são guardados de forma segura pelo Google. Este método de pagamento está disponível para todos os dispositivos (smartphones e computadores), independentemente do Sistema Operacional e em quase todos os navegadores Web.

Se utilizarem o Google Pay, os comerciantes devem aderir à [Política de Utilização](https://payments.developers.google.com/terms/aup) da API do Google Pay e concordar com os termos que definem os [Termos de serviço da API do Google Pay](https://payments.developers.google.com/terms/sellertos).

{{% alert title="Observação" color="info"%}}

A descrição abaixo aplica-se à prestação deste serviço diretamente através da apresentação do pop-up do Google Pay no site do beneficiário (loja virtual).

{{% /alert %}}

Se você deseja oferecer esse método via web-checkout da PayU, não é necessário nenhum esforço adicional de integração. Entre em contato com o gerente da sua conta para fazer a solicitação de ativação. Se desejar testar o método de pagamento antes da ativação, pode seguir as instruções [aqui](#testes-para-estabelecimentos-com-integração-web-checkout).

Um tema muito importante é que se a sua integração com a PayU for API, você deve efetuar as definições descritas nesta seção para processar as transações com o Google Pay: 

* [Efetuar a integração API do meio de pagamento](#integração-api-do-meio-de-pagamento)
* [Testar o meio de pagamento](#testar-o-meio-de-pagamento)

 ### Integração API do meio de pagamento 

Para integrar o seu site com a carteira Google Pay, proceda de acordo com as instruções apresentadas no link abaixo:
* [Documentação da API](https://developers.google.com/pay/api/web)
* [Lista de verificação da integração da API](https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist)
* [Directrizes da marca](https://developers.google.com/pay/api/web/guides/brand-guidelines)

##### Definições PayU para integração API do meio de pagamento

Abaixo encontrará as informações relevantes que deverá seguir durante a integração do meio de pagamento para que os seus pagamentos sejam processados pela PayU:

* ###### Solicitar um payment token para a PayU

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

* ###### Meios de pagamento suportados

PayU processa pagamentos Google Pay para cartões Mastercard e Visa. Para configurar seu script Google, use estas configurações:

```
const allowedCardNetworks = ["MASTERCARD", "VISA", "ELECTRON", "MAESTRO"];
const allowedCardAuthMethods = ["PAN_ONLY"];
```

{{% alert title="Observação" color="info"%}}

A disponibilidade dos métodos de pagamento depende das suas configurações no PayU.

{{% /alert %}}

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

 ### Processar transacções do Google Pay com PayU

 A principal função do Google Pay como carteira digital é armazenar cartões de crédito para facilitar o processamento de pagamentos, com isso em mente, para processar transações do Google Pay na PayU a lógica a ser aplicada será a mesma que para cartões de crédito, exceto para as seguintes particularidades:

* Se estiver processando transações para os seus clientes com o Google Pay, é preciso configurar as informações da carteira digital no parâmetro ```transaction.digitalWallet```.
* No parâmetro ```transaction.digitalWallet```, utilize ```GOOGLE_PAY``` para o campo ```transaction.digitalWallet.type```  e envie o Google Pay token no campo ```transaction.digitalWallet.message```. 
* Tenha em mente que o parâmetro ```transaction.creditcard``` para transações do Google Pay, deve enviar sempre um valor válido para o campo ```transaction.creditcard.name```. Os outros campos deste parâmetro não são necessários, uma vez que o Google Pay os fornece no token do Google Pay.
* Por predefinição, o processamento de cartões de crédito sem código de segurança não está ativa. Contate o seu Gestor de Conta da PayU para efetuar as activações necessárias para processar sem cvv, uma vez que este método de pagamento o exige.

### Testar o meio de pagamento

Esta secção foi concebida para guiar os utilizadores através do processo de teste e familiarização com o método de pagamento Google Pay na PayU.

**Pré-requisitos (aplicar para integração API e Web Checkout):**
* Certifique-se de que tem sessão iniciada no seu navegador com a conta Gmail que vai testar.
* Junte-se ao grupo do Google onde estarão disponíveis os cartões de teste para PayU. O grupo pode ser encontrado na seguinte [documentação do Google](https://developers.google.com/pay/api/android/guides/resources/test-card-suite).

#### Testes para estabelecimentos com integração API:

1.	Depois de ter efectuado as alterações indicadas nas secções anteriores, utilize o ficheiro de simulação de token para simular uma transação e obter um exemplo de token do Google Pay. O simulador pode ser visualizado <a href="https://developers.payulatam.com/latam/pt/docs/integrations/api-integration/simulator.html" target="_blank">aqui</a>. 

{{% alert title="Observação" color="info"%}}

Para garantir um processamento correto, ao selecionar os cartões para pagamento, utilize cartões cujo nome não comece por "Test".

{{% /alert %}}

2. Utilize as informações da amostra do token do Google Pay para completar o pedido da PayU. Envie-o para o PayU e poderá obter prova de uma transação aprovada. Se tiver algum resultado não aprovado, reveja a documentação das etapas acima.

<video width="630" height="300" controls>
    <source src="/assets/GooglePay/API.mp4" type="video/mp4">    
</video>

#### Testes para estabelecimentos com integração Web Checkout:

Utilize o checkout PayU no [ambiente de teste](https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/test/prueba_pago.jsp) para simular uma transação. 

{{% alert title="Observação" color="info"%}}

* Para garantir um processamento correto, ao selecionar os cartões para pagamento, utilize cartões cujo nome não comece por "Test".
* Utilize as credenciais de teste da Colômbia para este teste. Ver credenciais [aqui](https://developers.payulatam.com/latam/pt/docs/getting-started/test-your-solution.html).

{{% /alert %}}

<video width="630" height="300" controls>
    <source src="/assets/GooglePay/Colombia_WebCheckout.mp4" type="video/mp4">    
</video>

#### Chamada da API {#api-call-4}

A seguir estão o corpo do pedido e da resposta deste meio de pagamento.

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Exemplo de uma solicitação:**
```JSON
{
    "language": "es",
    "command": "SUBMIT_TRANSACTION",
    "merchant": {
        "apiKey": "012345678901",
        "apiLogin": "012345678901"
    },
    "transaction": {
        "order": {
            "accountId": "9",
            "language": "es",
            "description" : "test",
            "signature": "{{payu_signature}}",
            "referenceCode": "{{payu_ref_code}}",
            "additionalValues": {
                "TX_VALUE": {
                    "value": 100,
                    "currency": "ARS"
                }
            }
        },
        "payer": {
            "merchantPayerId": "1",
            "fullName": "First name and second payer name",
            "emailAddress": "payer.name@payu.com",
            "contactPhone": "7563126",
            "dniNumber": "5415668464654",
            "dniType": null
        },
        "creditCard": {
            "name": "Kevin Pelaez"
        },
        "digitalWallet": {
            "type" : "GOOGLE_PAY",
            "message" : "{\"signature\":\"MEUCIQCSsfd63AcUEjNRnpgqEm/B6cm8Fna1ty+HatD4Hqp/bgIgHCtrwKhvO1e5K3vDfE6FxqSaRkP9PHuY63aQ35gV5lk\\u003d\",\"intermediateSigningKey\":{\"signedKey\":\"{\\\"keyValue\\\":\\\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAExtzNORa//EJphgvdpUTsDElAg26mYXxNqs8/UX7DDSDCojJ/2+GCf8CVmClyRM+bukNsYM82pwkjZqOe5AOxUg\\\\u003d\\\\u003d\\\",\\\"keyExpiration\\\":\\\"1695147545256\\\"}\",\"signatures\":[\"MEQCIAxxj2BnQzTyTXLzjJ08JG+s1qdmX1XlOxzFmq1THTJ4AiAe7anOO7l+KZ1nkbGBufXBuQGInFMGR70+I33EyCL5GQ\\u003d\\u003d\"]},\"protocolVersion\":\"ECv2\",\"signedMessage\":\"{\\\"encryptedMessage\\\":\\\"GNKqqZ7bx6btPTkZPjpvi1IHKS79JrdtOI3bRZA6G5936ofXqD/m3f/YpuF4mlADkHIhmBYVq6hzyA0B4M1cjht7BFsQhE5fqA+6PgbPY6eAqaH4PPQGt/3VM9uVxmtcJK6k2JL8N7CCF85vx6s+LASH4wwO3Sk2NIlPB0B2QHdfdrOpwo5r6T3xYJAq6wHqFNrdOLq5NTodDqEaXP3y/MwpMufTWEBm2rsk6HqTh1Qz+d72aph3U3bRQVhFj3ZE2ZsIXIc7dwCLGV\\\",\\\"ephemeralPublicKey\\\":\\\"BNgz4XETGJgixJYrYHLXjQrRaZ9i2q2Z2uGTOFNuVY5ZiCFiSJeiP0l+dt+Y0r8I29l5F2Lwd+e8torE3vSMm9g\\\\u003d\\\",\\\"tag\\\":\\\"NUJPbcTwbfWBC3ByHzcwQz/bEsbt80vh1ahXoRY4xAQ\\\\u003d\\\"}\"}"
        },
        "extraParameters": {
            "INSTALLMENTS_NUMBER": 1
        },
        "type": "AUTHORIZATION_AND_CAPTURE",
        "paymentMethod": "MASTERCARD",
        "paymentCountry": "BR"
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
        <language>es</language>
     <command>SUBMIT_TRANSACTION</command>
     <merchant>
         <apiKey>012345678901</apiKey>
         <apiLogin>012345678901</apiLogin>
     </merchant>
     <transaction>
         <order>
             <accountId>9</accountId>
             <language>es</language>
             <description>test</description>
             <signature>{{payu_signature}}</signature>
             <referenceCode>{{payu_ref_code}}</referenceCode>
             <additionalValues>
                 <TX_VALUE>
                     <value>100</value>
                     <currency>ARS</currency>
                 </TX_VALUE>
             </additionalValues>
         </order>
         <payer>
             <merchantPayerId>1</merchantPayerId>
             <fullName>First name and second payer name</fullName>
             <emailAddress>payer.name@payu.com</emailAddress>
             <contactPhone>7563126</contactPhone>
             <dniNumber>5415668464654</dniNumber>
             <dniType></dniType>
         </payer>
         <creditCard>
             <name>Kevin Pelaez</name>
         </creditCard>
         <digitalWallet>
             <type>GOOGLE_PAY</type>
             <message>{"signature":"MEUCIQCSsfd63AcUEjNRnpgqEm/B6cm8Fna1ty+HatD4Hqp/bgIgHCtrwKhvO1e5K3vDfE6FxqSaRkP9PHuY63aQ35gV5lk\u003d","intermediateSigningKey":{"signedKey":"{\"keyValue\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAExtzNORa//EJphgvdpUTsDElAg26mYXxNqs8/UX7DDSDCojJ/2+GCf8CVmClyRM+bukNsYM82pwkjZqOe5AOxUg\\u003d\\u003d\",\"keyExpiration\":\"1695147545256\"}","signatures":["MEQCIAxxj2BnQzTyTXLzjJ08JG+s1qdmX1XlOxzFmq1THTJ4AiAe7anOO7l+KZ1nkbGBufXBuQGInFMGR70+I33EyCL5GQ\u003d\u003d"]},"protocolVersion":"ECv2","signedMessage":"{\"encryptedMessage\":\"GNKqqZ7bx6btPTkZPjpvi1IHKS79JrdtOI3bRZA6G5936ofXqD/m3f/YpuF4mlADkHIhmBYVq6hzyA0B4M1cjht7BFsQhE5fqA+6PgbPY6eAqaH4PPQGt/3VM9uVxmtcJK6k2JL8N7CCF85vx6s+LASH4wwO3Sk2NIlPB0B2QHdfdrOpwo5r6T3xYJAq6wHqFNrdOLq5NTodDqEaXP3y/MwpMufTWEBm2rsk6HqTh1Qz+d72aph3U3bRQVhFj3ZE2ZsIXIc7dwCLGV\",\"ephemeralPublicKey\":\"BNgz4XETGJgixJYrYHLXjQrRaZ9i2q2Z2uGTOFNuVY5ZiCFiSJeiP0l+dt+Y0r8I29l5F2Lwd+e8torE3vSMm9g\\u003d\",\"tag\":\"NUJPbcTwbfWBC3ByHzcwQz/bEsbt80vh1ahXoRY4xAQ\\u003d\"}"}</message>
         </digitalWallet>
         <extraParameters>
             <INSTALLMENTS_NUMBER>1</INSTALLMENTS_NUMBER>
         </extraParameters>
         <type>AUTHORIZATION_AND_CAPTURE</type>
         <paymentMethod>MASTERCARD</paymentMethod>
         <paymentCountry>BR</paymentCountry>
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

<br>

Você encontrará a descrição do objeto `transaction.digitalWallet` e dos seus campos na seção [Parâmetros](https://developers.payulatam.com/latam/pt/docs/integrations/api-integration/payments-api-colombia.html#parameters-for-request-and-response).

## Enviar transações usando Nequi {#submit-transactions-using-nequi}

A Nequi é uma plataforma abrangente de serviços financeiros que funciona através de uma carteira digital disponível para milhões de utilizadores através de uma aplicação móvel. Com a Nequi, é possível efetuar pagamentos, transferências, carregamentos e levantamentos de forma rápida e segura, tudo a partir do seu dispositivo pessoal.

Para além de ser uma ferramenta conveniente para os utilizadores individuais, a Nequi é também uma solução de pagamento inovadora para as empresas. Ao aceitar pagamentos com a Nequi, a sua empresa pode beneficiar de uma série de vantagens significativas:

* **Aumento das vendas:** Ao oferecer a Nequi como opção de pagamento, a sua empresa pode atrair novos clientes que preferem transacções digitais. Isto pode traduzir-se num aumento das vendas e numa maior fidelização dos clientes.

* **Maior comodidade:** Ao permitir que os seus clientes paguem com Nequi, está a proporcionar uma experiência de compra mais versátil e rápida. Os clientes podem efetuar pagamentos instantâneos através do telemóvel, sem necessidade de dinheiro ou cartões físicos.

* **Maior segurança:** A Nequi oferece um ambiente de pagamento seguro e confiável, apoiado pelo Bancolombia, uma das maiores e mais confiáveis instituições financeiras da Colômbia. Isso proporciona tranquilidade tanto para os comerciantes quanto para os clientes, pois as transações são realizadas de forma segura e protegida.

### Processo de pagamento com Nequi {#payment-process-with-nequi}

O fluxo de pagamento com a Nequi foi concebido para ser simples e ágil para o utilizador. O processo inclui 4 etapas:

1. **Seleção da forma de pagamento:** O cliente, no momento de efetuar a compra, escolhe a Nequi como sua forma de pagamento preferida dentre as opções disponíveis.

2. **Geração de notificação push:** Automaticamente, o sistema gera uma notificação push que é enviada para a aplicação móvel Nequi do cliente.

3. **Aceitação da notificação:** O cliente recebe a notificação na sua aplicação Nequi e aceita-a para confirmar a transação.

4. **Introdução do PIN Nequi:** Para completar a operação, o cliente introduz o seu PIN pessoal Nequi para autenticar e autorizar o pagamento.

### Experiência do usuário {#user-experience-1}

Esta seção descreve os elementos necessários para uma experiência de usuário ideal ao usar o Nequi como método de pagamento:

1. Solicite o nome e o endereço de e-mail do comprador, por exemplo:

<img src="/assets/Payments/NEQUI_PT_01.png" alt="PrintScreen" width="420">
<p></p>

2. Apresente o Nequi como método de pagamento e solicite o número de telefone associado à conta Nequi, por exemplo:

<img src="/assets/Payments/NEQUI_PT_02.png" alt="PrintScreen" width="420">
<p></p>

3. Forneça um resumo detalhado do pagamento.

{{% alert title="Nota" color="info"%}}

A imagem abaixo é um exemplo da página de resumo do PayU, você pode aproveitar esta página redirecionando os usuários para o URL fornecido no campo `URL_PAYMENT_RECEIPT_HTML` da resposta da API, ou você pode criar seu próprio recibo obtendo os dados dos campos de resposta correspondentes. Para mais informações, consulte a seção [Parâmetros para Solicitação e Resposta]({{< ref "#parameters-for-request-and-response-1" >}}).

{{% /alert %}}

<img src="/assets/Payments/NEQUI_PT_03.png" alt="PrintScreen" width="500">
<p></p>

4. Descreva as etapas a seguir para facilitar o processo de pagamento para o comprador. A página de resumo do PayU já inclui estas instruções, mas se você estiver criando uma página personalizada, recomendamos exibir as etapas para completar o processo através do Nequi. Por exemplo:

<img src="/assets/Payments/NEQUI_PT_04.png" alt="PrintScreen" width="420">
<p></p>

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-3}

<details>
<summary><b>Solicitação</b></summary>
<label for="table3" class="showMandatory"><input type="checkbox" id="table3" name="table3" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma usado na solicitação, este idioma é usado para exibir mensagens de erro geradas. [Verificar idiomas suportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx:32 | Definido como `SUBMIT_TRANSACTION`. | Sim |
| `test` (JSON)<hr>`isTest` (XML) | Booleano | | Definido como `true` se a solicitação estiver em modo de teste. Caso contrário, definido como `false`. | Sim |
| `merchant` | Objeto | | Este objeto contém dados de autenticação. | Sim |
| `merchant > apiLogin` | Alfanumérico | Mín:12 Máx:32 | Nome de usuário ou login fornecido pela PayU. | Sim |
| `merchant > apiKey` | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pela PayU. | Sim |
| `transaction` | Objeto | | Este objeto contém dados da transação. | Sim |
| `transaction > order` | Objeto | | Este objeto contém dados do pedido. | Sim |
| `transaction > order > accountId` | Número | | Seu identificador de conta. | Sim |
| `transaction > order > referenceCode` | Alfanumérico | Mín:1 Máx:255 | Representa o identificador do pedido em seu sistema. | Sim |
| `transaction > order > description` | Alfanumérico | Mín:1 Máx:255 | Descrição do pedido. | Sim |
| `transaction > order > language` | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| `transaction > order > notifyUrl` | Alfanumérico | Máx:2048 | URL de confirmação do pedido. | Não |
| `transaction > order > partnerId` | Alfanumérico | Máx:255 | ID do parceiro PayU. | Não |
| `transaction > order > signature` | Alfanumérico | Máx:255 | Assinatura associada ao formulário. Para mais informações, consulte [Assinatura de Autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| `transaction > order > shippingAddress` | Objeto | | Endereço de envio. | Não |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Máx:100 | Linha de endereço 1. | Não |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Máx:100 | Linha de endereço 2. | Não |
| `transaction > order > shippingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço. | Não |
| `transaction > order > shippingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço. | Não |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | País do endereço. | Não |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Máx:8 | Código postal do endereço. | Não |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. | Não |
| `transaction > order > buyer` | Objeto | | Informações do comprador. | Sim |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| `transaction > order > buyer > fullName` | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Máx:255 | Endereço de e-mail do comprador. | Sim |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do comprador. | Sim |
| `transaction > order > buyer > shippingAddress` | Objeto | | Endereço de envio do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Máx:150 | Linha 1 do endereço de envio do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de envio do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de envio do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País do endereço de envio do comprador no formato alfa-2 ISO 3166. | Sim |
| `transaction > order > buyer > shippingAddress > postalCode` | Número | Máx:20 | Código postal do endereço de envio do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > phone` | Número | Máx:20 | Número de telefone do endereço de envio do comprador. | Sim |
| `transaction > order > additionalValues` | Alfanumérico | 64 | Valor do pedido e valores associados. | Sim |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Valor da transação. | Sim |
| `transaction > order > additionalValues > TX_VALUE > value` | Número | 12, 2 | Especifica o valor da transação. Este valor não pode incluir decimais. | Sim |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código de moeda ISO. [Verificar moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > order > additionalValues > TX_TAX` | Alfanumérico | 64 | Valor do imposto sobre valor agregado (IVA). | Sim |
| `transaction > order > additionalValues > TX_TAX > value` | Número | 12, 2 | Especifica o valor do IVA. Se este parâmetro não estiver configurado, a PayU aplica o valor de imposto atual (19%). Se o valor não tiver IVA, envie 0. Este valor pode ter dois dígitos decimais. | Não |
| `transaction > order > additionalValues > TX_TAX > currency` | Alfanumérico | 3 | Código de moeda ISO. [Verificar moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alfanumérico | 64 | Valor base para calcular o IVA. Se o valor não tiver IVA, envie 0. Este valor pode ter dois dígitos decimais. | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Número | 12, 2 | Especifica o valor base da transação. | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alfanumérico | 3 | Código de moeda ISO. [Verificar moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > payer` | Objeto | | Informações do pagador. | Sim |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nome do pagador. | Sim |
| `transaction > payer > billingAddress` | Objeto | | Endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Linha de endereço 1 da cobrança. | Sim |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Linha de endereço 2 da cobrança. | Não |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País do endereço de cobrança no formato alfa-2 ISO 3166. | Sim |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Data de nascimento do pagador. | Não |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do pagador. Este é o número a ser usado para pagamento no Nequi. | Sim |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do pagador. | Sim |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificação do comprador. [Verificar tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| `transaction > type` | Alfanumérico | 32 | Atribua este valor de acordo com a transação. Para a Colômbia, atribua `AUTHORIZATION_AND_CAPTURE`. | Sim |
| `transaction > paymentMethod` | Alfanumérico | 32 | Defina `NEQUI` para o Método de Pagamento Nequi. | Sim |
| `transaction > paymentCountry` | Alfanumérico | 2 | Defina `CO` para Colômbia. | Sim |
| `transaction > deviceSessionId` | Alfanumérico | Máx:255 | Identificador de sessão do dispositivo onde o cliente realiza a transação. Para mais informações, consulte [esta seção]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente realiza a transação. | Sim |
| `transaction > cookie` | Alfanumérico | Máx:255 | Cookie armazenado pelo dispositivo onde o cliente realiza a transação. | Sim |
| `transaction > userAgent` | Alfanumérico | Máx:1024 | Agente do usuário do navegador onde o cliente realiza a transação. | Sim |

</details>

<details>
<summary><b>Resposta</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| `code` | Alfanumérico | | Código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | Mensagem de erro associada quando o código de resposta é `ERROR`. |
| `transactionResponse` | Objeto | | Dados da resposta. |
| `transactionResponse > orderId` | Número | | Identificador do pedido gerado ou existente na PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | Identificador da transação na PayU. |
| `transactionResponse > state` | Alfanumérico | Máx:32 | Estado da transação. |
| `transactionResponse > responseCode` | Alfanumérico | Máx:64 | Código de resposta associado ao estado. |
| `transactionResponse > pendingReason` | Alfanumérico | Máx:64 | Motivo pendente da transação. |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx:255 | Código de resposta retornado pela rede financeira. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx:255 | Mensagem de erro retornada pela rede financeira. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx:32 | Código de rastreabilidade retornado pela rede financeira. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx:12 | Código de autorização retornado pela rede financeira. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| `transactionResponse > operationDate` | Data | | Data de criação da resposta no sistema PayU. |
| `transactionResponse > extraParameters` | Objeto | | Parâmetros ou dados adicionais associados à resposta. <li>Em JSON, o parâmetro `extraParameters` segue esta estrutura: `"extraParameters": { "URL_PAYMENT_RECEIPT_HTML": "https:payu.checkout.com"}`<li>Em XML, o parâmetro `extraParameters` segue esta estrutura: `<extraParameters> <entry>  <string>URL_PAYMENT_RECEIPT_HTML</string>  <string>https:payu.checkout.com</string> </entry></extraParameters>` <br>**Nota:** Considere que você pode aproveitar este URL para redirecionar o usuário para uma página do PayU com um resumo da compra, conforme visto em [Experiência do Usuário]({{< ref "#user-experience" >}}). |
| `transactionResponse > additionalInfo` | Objeto | | Informações adicionais associadas à resposta. Este objeto segue a mesma estrutura que `transactionResponse.extraParameters`. |

</details>

### Chamada da API {#api-call-5}

Os corpos de solicitação e de resposta para este método de pagamento são os seguintes:

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
         "accountId": "512321",
         "referenceCode": "PRODUCT_TEST_2024-01-18T19:59:43.229Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "1d6c33aed575c4974ad5c0be7c6a1c87",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 65000,
               "currency": "COP"
            },
            "TX_TAX": {
               "value": 10378,
               "currency": "COP"
            },
            "TX_TAX_RETURN_BASE": {
               "value": 54622,
               "currency": "COP"
            }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "57 3007777777",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Cr 23 No. 53-50",
               "street2": "5555487",
               "city": "Bogotá",
               "state": "Bogotá D.C.",
               "country": "CO",
               "postalCode": "000000",
               "phone": "57 3007777777"
            }
         },
         "shippingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "5555487",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
            "postalCode": "0000000",
            "phone": "7563126"
         }
      },
      "payer": {
         "merchantPayerId": "1",
         "fullName": "First name and second payer name",
         "emailAddress": "payer_test@test.com",
         "contactPhone": "57 3007777777",
         "dniNumber": "5415668464654",
         "billingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "125544",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
            "postalCode": "000000",
            "phone": "57 3007777777"
         }
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "NEQUI",
      "paymentCountry": "CO",
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
        "orderId": 2151135729,
        "transactionId": "fe667b48-e685-40b3-8863-9a0cd8257860",
        "state": "PENDING",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "3ba38ac9-3d68-48ef-bf86-b6c121404162",
        "authorizationCode": null,
        "pendingReason": "AWAITING_PAYMENT_IN_ENTITY",
        "responseCode": "PENDING_PAYMENT_IN_ENTITY",
        "errorCode": null,
        "responseMessage": "SUCCESS",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1705670262058,
        "referenceQuestionnaire": null,
        "extraParameters": null,
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
  <language>es</language>
  <command>SUBMIT_TRANSACTION</command>
  <merchant>
    <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
  </merchant>
  <transaction>
    <order>
      <accountId>512321</accountId>
      <referenceCode>PRODUCT_TEST_2024-01-18T19:59:43.229Z</referenceCode>
      <description>Payment test description</description>
      <language>es</language>
      <signature>1d6c33aed575c4974ad5c0be7c6a1c87</signature>
      <notifyUrl>http://www.payu.com/notify</notifyUrl>
      <additionalValues>
        <entry>
          <string>TX_VALUE</string>
          <additionalValue>
            <value>65000</value>
            <currency>COP</currency>
          </additionalValue>
          <string>TX_TAX</string>
          <additionalValue>
            <value>10378</value>
            <currency>COP</currency>
          </additionalValue>
          <string>TX_TAX_RETURN_BASE</string>
          <additionalValue>
            <value>54622</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
      </additionalValues>
      <buyer>
        <merchantBuyerId>1</merchantBuyerId>
        <fullName>First name and second buyer name</fullName>
        <emailAddress>buyer_test@test.com</emailAddress>
        <contactPhone>57 3007777777</contactPhone>
        <dniNumber>123456789</dniNumber>
        <shippingAddress>
          <street1>Cr 23 No. 53-50</street1>
          <street2>5555487</street2>
          <city>Bogotá</city>
          <state>Bogotá D.C.</state>
          <country>CO</country>
          <postalCode>000000</postalCode>
          <phone>57 3007777777</phone>
        </shippingAddress>
      </buyer>
      <shippingAddress>
        <street1>Cr 23 No. 53-50</street1>
        <street2>5555487</street2>
        <city>Bogot√°</city>
        <state>Bogot√° D.C.</state>
        <country>CO</country>
        <postalCode>0000000</postalCode>
        <phone>7563126</phone>
      </shippingAddress>
    </order>
    <payer>
      <merchantPayerId>1</merchantPayerId>
      <fullName>First name and second payer name</fullName>
      <emailAddress>payer_test@test.com</emailAddress>
      <contactPhone>57 3007777777</contactPhone>
      <dniNumber>5415668464654</dniNumber>
      <billingAddress>
        <street1>Cr 23 No. 53-50</street1>
        <street2>125544</street2>
        <city>Bogotá</city>
        <state>Bogotá D.C.</state>
        <country>CO</country>
        <postalCode>000000</postalCode>
        <phone>57 3007777777</phone>
      </billingAddress>
    </payer>
    <type>AUTHORIZATION_AND_CAPTURE</type>
    <paymentMethod>NEQUI</paymentMethod>
    <paymentCountry>CO</paymentCountry>
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
        <orderId>2151135729</orderId>
        <transactionId>fe667b48-e685-40b3-8863-9a0cd8257860</transactionId>
        <state>PENDING</state>
        <paymentNetworkResponseCode>0</paymentNetworkResponseCode>
        <trazabilityCode>3ba38ac9-3d68-48ef-bf86-b6c121404162</trazabilityCode>
        <pendingReason>AWAITING_PAYMENT_IN_ENTITY</pendingReason>
        <responseCode>PENDING_PAYMENT_IN_ENTITY</responseCode>
        <responseMessage>SUCCESS</responseMessage>
        <operationDate>2024-01-19T08:17:42</operationDate>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

#### Formatos de número de telefone suportados {#supported-phone-number-formats}
 
Ao usar integrações de API, as transações podem falhar quando o sistema recebe números de telefone de usuário que:

1. Contêm espaços em branco.
2. Não estão separados do código do país.
3. Contêm mais ou menos do que 10 dígitos (excluindo o código do país).

Atualmente, a integração não fornece um mecanismo para corrigir automaticamente o formato do número de telefone que o usuário insere. A tabela abaixo mostra exemplos de formatos de números de telefone e sua compatibilidade com a integração:

| Exemplo de Formato de Número de Telefone | Compatibilidade | Detalhes |
| - | - | - |
| `57 3007777777` | Formato compatível | O código do país (57) está separado do número de celular. |
| `3007777777` | Formato compatível | O número de celular não tem espaços e tem 10 dígitos. |
| `573007777777` | Formato incompatível | O número de celular e o código do país (57) não estão separados. |
| `57 300 7777777` | Formato incompatível | O número de celular tem espaços. |

**Recomendações**

Para evitar erros causados por formatos incompatíveis de números de telefone, recomendamos implementar as seguintes funcionalidades na experiência do usuário:

1. Implemente uma interface que crie automaticamente espaços separadores no número do celular à medida que o usuário o digita, facilitando a leitura do número e reduzindo a probabilidade de erros de entrada manual. Certifique-se de que esses espaços estejam visíveis no nível da interface e configure seu sistema para removê-los no nível do backend.

* Exemplo de interface:

<img src="/assets/Payments/Nequi05PT.png" alt="PrintScreen" width="600">
<p></p>

2. Configure as mensagens de erro a serem exibidas quando um usuário inserir um número de telefone com menos de 10 dígitos ou mais de 10 dígitos (excluindo o código do país, que é +57 para a Colômbia).

* **A)** Exemplo de uma interface que exibe espaços gerados automaticamente quando o usuário digita menos de 10 dígitos:

<img src="/assets/Payments/Nequi06PT.png" alt="PrintScreen" width="600">
<p></p>

* **B)** Exemplo de uma interface sem espaços quando o usuário digita mais de 10 dígitos:

<img src="/assets/Payments/Nequi07PT.png" alt="PrintScreen" width="600">

#### Teste de ambiente de sandbox {#sanbox-environment-testing}

Para testar transações Nequi no ambiente de Sandbox da PayU, utilize os seguintes dados:

| Número de telefone | Comportamento de autorização | Comportamento de consulta <br>(Aproximadamente 5 minutos após a autorização) |
| - | - | - |
| `3006666666` | Transaction rejected - Client not found on database | N/A |
| `3007777777` | Transaction pending | Transaction approved |
| `3007777776` | Transaction pending | Transaction declined |
| `3007777775` | Transaction pending | Transaction pending |
| `3007777774` | Transaction pending | Transaction failed |
| `3007777772` | Transaction pending | Transaction expired |

Você pode verificar o status da transação através da [API de Consultas]({{< ref "queries-api.html" >}}).

## Enviar transações usando o Botão Bancolombia {#submit-transactions-using-bancolombia-button}

O Botão de Pagamentos Bancolombia é uma solução de pagamento online que permite aos usuários realizar transações de forma rápida e segura através de suas contas Bancolombia. Essa ferramenta está disponível para milhões de usuários e permite que os pagamentos sejam concluídos diretamente no site do comerciante, redirecionando o usuário para uma plataforma segura fornecida pelo banco.

### Benefícios do Botão Bancolombia

Além de ser uma opção conveniente para os usuários, o Botão de Pagamentos Bancolombia representa uma alternativa inovadora para os comerciantes. Ao integrar essa opção à sua plataforma de pagamento por meio do PayU, o seu negócio pode obter os seguintes benefícios:

* **Aumento nas vendas:** Alcance mais clientes que preferem métodos de pagamento digitais suportados pelo Bancolombia, contribuindo para um maior número de transações concluídas e maior retenção de clientes.

* **Maior conveniência:** Ofereça uma experiência de pagamento rápida e versátil, permitindo que os usuários realizem pagamentos diretamente de suas contas bancárias, sem a necessidade de cartões físicos ou dinheiro.

* **Segurança aprimorada:** Habilite transações protegidas pelos avançados sistemas de segurança do Bancolombia, uma das instituições financeiras mais confiáveis da Colômbia.

A integração do Botão de Pagamentos Bancolombia não apenas melhora a experiência de compra dos seus clientes, mas também fortalece o seu negócio com um método de pagamento alinhado às preferências do mercado local.

### Processo de pagamento com o Botão Bancolombia

O processo de pagamento é projetado para ser simples e seguro. Siga estas etapas para concluir uma transação:

1. Selecione o método de pagamento no checkout.

<img src="/assets/Payments/pt_botonbancolombia_1.png" alt="PrintScreen" width="650">
<p></p>

2. Aceite os termos e condições e clique em **_Pagar_**.

<img src="/assets/Payments/pt_botonbancolombia_2.png" alt="PrintScreen" width="650">
<p></p>

3. A integração redirecionará você para o site transacional do Bancolombia para concluir o pagamento.

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-4}

<details>
<summary><b>Solicitação</b></summary>
<label for="table4" class="showMandatory"><input type="checkbox" id="table4" name="table4" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma usado na solicitação, este idioma é usado para exibir as mensagens de erro geradas. [Veja os idiomas suportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx:32 | Defina `SUBMIT_TRANSACTION`. | Sim |
| `test` (JSON)<hr>`isTest` (XML) | Booleano | | Defina `true` se a solicitação estiver em modo de teste. Caso contrário, defina `false`. | Sim |
| `merchant` | Objeto | | Este objeto contém os dados de autenticação. | Sim |
| `merchant > apiLogin` | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como obter meu API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `merchant > apiKey` | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como obter minha API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `transaction` | Objeto | | Este objeto contém os dados da transação. | Sim |
| `transaction > order` | Objeto | | Este objeto contém os dados do pedido. | Sim |
| `transaction > order > accountId` | Número | | Identificador da sua conta. | Sim |
| `transaction > order > referenceCode` | Alfanumérico | Mín:1 Máx:255 | Representa o identificador do pedido no seu sistema. | Sim |
| `transaction > order > description` | Alfanumérico | Mín:1 Máx:255 | Descrição do pedido. | Sim |
| `transaction > order > language` | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| `transaction > order > notifyUrl` | Alfanumérico | Máx:2048 | URL de confirmação do pedido. | Não |
| `transaction > order > partnerId` | Alfanumérico | Máx:255 | ID do parceiro no PayU. | Não |
| `transaction > order > signature` | Alfanumérico | Máx:255 | A assinatura associada ao formulário. Para mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| `transaction > order > shippingAddress` | Objeto | | Endereço de entrega. | Não |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Máx:100 | Linha 1 do endereço. | Não |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Máx:100 | Linha 2 do endereço. | Não |
| `transaction > order > shippingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço. | Não |
| `transaction > order > shippingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço. | Não |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | País do endereço. | Não |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Máx:8 | CEP do endereço. | Não |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Máx:11 | Telefone associado ao endereço. | Não |
| `transaction > order > buyer` | Objeto | | Informações do comprador. | Sim |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Máx:100 | ID do comprador no seu sistema. | Não |
| `transaction > order > buyer > fullName` | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Máx:255 | E-mail do comprador. | Sim |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Máx:20 | Telefone do comprador. | Sim |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do comprador. | Sim |
| `transaction > order > buyer > shippingAddress` | Alfanumérico | | Endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País do endereço de entrega do comprador no formato ISO 3166 alpha-2. | Sim |
| `transaction > order > buyer > shippingAddress > postalCode` | Numérico | Máx:20 | CEP do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > phone` | Numérico | Máx:20 | Telefone do endereço de entrega do comprador. | Sim |
| `transaction > order > additionalValues` | Objeto | 64 | Valor do pedido e seus valores associados. | Sim |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Valor da transação. | Sim |
| `transaction > order > additionalValues > TX_VALUE > value` | Numérico | 12, 2 | Especifica o valor da transação. Este valor não pode incluir decimais. | Sim |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > payer` | Objeto | | Informações do pagador. | Sim |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador do pagador no seu sistema. | Não |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nome do pagador, que deve coincidir com o nome enviado no parâmetro `transaction.creditCard.name`. | Sim |
| `transaction > payer > billingAddress` | Objeto | | Endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Linha 1 do endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Linha 2 do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Sim |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | CEP do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Telefone do endereço de cobrança. | Não |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Data de nascimento do pagador. | Não |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Telefone do pagador. | Sim |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do comprador. | Sim |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificação do comprador. [Veja os tipos de documento]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| `transaction > type` | Alfanumérico | 32 | Defina este valor de acordo com a transação. Para a Colômbia, defina `AUTHORIZATION_AND_CAPTURE` | Sim |
| `transaction > paymentMethod` | Alfanumérico | 32 | Defina `BANCOLOMBIA_BUTTON`. [Veja os métodos de pagamento disponíveis para a Colômbia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sim |
| `transaction > paymentCountry` | Alfanumérico | 2 | Defina `CO` para a Colômbia. | Sim |
| `transaction > deviceSessionId` | Alfanumérico | Máx:255 | Identificador da sessão do dispositivo onde o cliente realiza a transação. Para mais informações, consulte [este tópico]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente realiza a transação. | Sim |
| `transaction > cookie` | Alfanumérico | Máx:255 | Cookie armazenado pelo dispositivo onde o cliente realiza a transação. | Sim |
| `transaction > userAgent` | Alfanumérico | Máx:1024 | O User Agent do navegador onde o cliente realiza a transação. | Sim |
| `transaction > extraParameters` | Objeto | | Parâmetros ou dados adicionais associados à solicitação. O tamanho máximo de cada nome de _extraParameters_ é 64 caracteres.<br>No JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>No XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` | Não |

</details>

<details>
<summary><b>Resposta</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| `code` | Alfanumérico | | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | A mensagem de erro retornada quando o código de resposta é `ERROR`. |
| `transactionResponse` | Objeto | | O objeto principal contendo os dados da resposta. |
| `transactionResponse > orderId` | Numérico | | O identificador de pedido gerado ou existente no PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | O identificador da transação no PayU. |
| `transactionResponse > state` | Alfanumérico | Máx:32 | O status da transação. Para pagamentos realizados em escritórios físicos, o status de uma transação bem-sucedida é `PENDING`. |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx:255 | O código de resposta retornado pela rede financeira. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx:255 | A mensagem de erro retornada pela rede financeira. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx:32 | O código de rastreabilidade retornado pela rede financeira. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx:12 | O código de autorização fornecido pela rede financeira. |
| `transactionResponse > pendingReason` | Alfanumérico | Máx:21 | O código de motivo associado ao status. Para transações com status `PENDING`, indica que a transação está aguardando pagamento. |
| `transactionResponse > responseCode` | Alfanumérico | Máx:64 | O código de resposta associado ao status da transação. Para transações bem-sucedidas, o valor será `PENDING_TRANSACTION_CONFIRMATION`. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx:2048 | Uma mensagem associada ao código de resposta. |
| `transactionResponse > operationDate` | Data | | A data de criação da resposta no sistema PayU. |
| `transactionResponse > extraParameters` | Objeto | | Parâmetros adicionais ou dados relacionados à resposta. <br><b>Nota:</b> O campo `BANK_URL` dentro de `extraParameters` fornece a URL para redirecionar o pagador ao Bancolombia. |

</details>

### Chamada da API {#api-call-6}

Os corpos de solicitação e de resposta para este método de pagamento são os seguintes:

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
         "accountId": "512321",
         "referenceCode": "{{reference_code}}",
         "description": "Bancolombia Button Test",
         "language": "es",
         "signature": "{{signature}}",
         "notifyUrl": "http://confirmation-page.com",
         "additionalValues": {
            "TX_VALUE": {
               "value": 10000,
               "currency": "COP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer  name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "5415668464654",
            "shippingAddress": {
               "street1": "calle 100",
               "street2": "5555487",
               "city": "Medellin",
               "state": "Antioquia",
               "country": "CO",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "calle 100",
            "street2": "5555487",
            "city": "Medellin",
            "state": "Antioquia",
            "country": "CO",
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
         "billingAddress": {
            "street1": "calle 93",
            "street2": "125544",
            "city": "Bogota",
            "state": "Bogota DC",
            "country": "CO",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "BANCOLOMBIA_BUTTON",
      "paymentCountry": "CO",
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
    "transactionResponse": {
        "orderId": 2153602509,
        "transactionId": "32c884cd-7d33-4922-a834-b6e1fa1863ba",
        "state": "PENDING",
        "trazabilityCode": "_016oemmSIw",
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "operationDate": 1736339747784,
        "extraParameters": {
            "BANK_URL": "https://sandbox-boton-ou-dev.apps.ambientesbc.com/web/transfer-gateway/checkout/_016oemmSIw"
        },
        "additionalInfo": {
            "paymentNetwork": "BANCOLOMBIA_BUTTON",
            "rejectionType": "NONE",
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
         <accountId>512321</accountId>
         <referenceCode>{{reference_code}}</referenceCode>
         <description>Bancolombia Button Test</description>
         <language>es</language>
         <signature>{{signature}}</signature>
         <notifyUrl>http://confirmation-page.com</notifyUrl>
         <additionalValues>
            <TX_VALUE>
               <value>10000</value>
               <currency>COP</currency>
            </TX_VALUE>
         </additionalValues>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>5415668464654</dniNumber>
            <shippingAddress>
               <street1>calle 100</street1>
               <street2>5555487</street2>
               <city>Medellin</city>
               <state>Antioquia</state>
               <country>CO</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>calle 100</street1>
            <street2>5555487</street2>
            <city>Medellin</city>
            <state>Antioquia</state>
            <country>CO</country>
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
         <billingAddress>
            <street1>calle 93</street1>
            <street2>125544</street2>
            <city>Bogota</city>
            <state>Bogota DC</state>
            <country>CO</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>BANCOLOMBIA_BUTTON</paymentMethod>
      <paymentCountry>CO</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <test>false</test>
</request>
```
<br>

**Exemplo de uma resposta:**
```XML
<response>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>2153602509</orderId>
        <transactionId>32c884cd-7d33-4922-a834-b6e1fa1863ba</transactionId>
        <state>PENDING</state>
        <trazabilityCode>_016oemmSIw</trazabilityCode>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <operationDate>1736339747784</operationDate>
        <extraParameters>
            <BANK_URL>https://sandbox-boton-ou-dev.apps.ambientesbc.com/web/transfer-gateway/checkout/_016oemmSIw</BANK_URL>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>BANCOLOMBIA_BUTTON</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</response>
```

{{< /tab >}}

{{< /tabs >}}

#### Observações {#considerations-3}

- Para testar sua integração no ambiente sandbox, você pode usar qualquer número como credenciais do Bancolombia.  
- Se a solicitação de pagamento for bem-sucedida, o status da transação será `PENDING` e o `responseCode` será `PENDING_TRANSACTION_CONFIRMATION`. Isso ocorre porque o pagador é redirecionado para a plataforma do banco para concluir o pagamento. Você deve redirecionar o pagador para a URL fornecida no parâmetro adicional `BANK_URL`.  
- O pagador tem vinte (20) minutos para concluir a transação no site do Bancolombia. Caso não seja concluída nesse período, a transação será recusada, e o código de resposta será `EXPIRED`.  


## Enviar transações usando dinheiro ou referência bancária {#submit-transactions-using-cash-or-bank-reference}

Este método permite processar pagamentos de clientes em dinheiro ou através de uma referência bancária. Para integrar este método de pagamento, redirecione o cliente para o URL fornecido na resposta do método. Seu cliente verá então um recibo de pagamento conforme mostrado abaixo.

#### Pagamentos em dinheiro {#payments-in-cash}

<img src="/assets/Payments/CashReceiptCO.png" alt="PrintScreen" width="75%">

#### Pagamentos com referência bancária {#payments-with-bank-reference}

<img src="/assets/Payments/BankReferenceReceiptCO.png" alt="PrintScreen" width="75%">

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-5}

<details>
<summary><b>Solicitação</b></summary>
<label for="table5" class="showMandatory"><input type="checkbox" id="table5" name="table5" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx:32 | Definir `SUBMIT_TRANSACTION`. | Sim |
| `test` (JSON)<hr>`isTest` (XML) | Boolean | | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| `merchant` | Objeto | | Este objeto contém os dados de autenticação. | Sim |
| `merchant > apiLogin` | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `merchant > apiKey` | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `transaction` | Objeto | | Este objeto contém os dados da transação. | Sim |
| `transaction > order` | Objeto | | Este objeto contém os dados da ordem. | Sim |
| `transaction > order > accountId` | Número | | Identificador da sua conta. | Sim |
| `transaction > order > referenceCode` | Alfanumérico | Mín:1 Máx:255 | Representa o identificador da ordem em seu sistema. | Sim |
| `transaction > order > description` | Alfanumérico | Mín:1 Máx:255 | Descrição da ordem. | Sim |
| `transaction > order > language` | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| `transaction > order > notifyUrl` | Alfanumérico | Máx:2048 | URL de confirmação da ordem. | Não |
| `transaction > order > partnerId` | Alfanumérico | Máx:255 | ID de parceiro no PayU. | Não |
| `transaction > order > signature` | Alfanumérico | Máx:255 | A assinatura associada ao formulário. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| `transaction > order > shippingAddress` | Objeto | | Endereço para envio. | Não |
| `transaction > order > shippingAddress > street1` | Alfanumérico | Máx:100 | Endereço: Linha 1. | Não |
| `transaction > order > shippingAddress > street2` | Alfanumérico | Máx:100 | Endereço: Linha 2. | Não |
| `transaction > order > shippingAddress > city` | Alfanumérico | Máx:50 | Endereço: cidade. | Não |
| `transaction > order > shippingAddress > state` | Alfanumérico | Máx:40 | Endereço: estado. | Não |
| `transaction > order > shippingAddress > country` | Alfanumérico | 2 | Endereço: país. | Não |
| `transaction > order > shippingAddress > postalCode` | Alfanumérico | Máx:8 | Endereço: Código postal. | Não |
| `transaction > order > shippingAddress > phone` | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. | Não |
| `transaction > order > buyer` | Objeto | | Informações do comprador. | Sim |
| `transaction > order > buyer > merchantBuyerId` | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| `transaction > order > buyer > fullName` | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| `transaction > order > buyer > emailAddress` | Alfanumérico | Máx:255 | E-mail do comprador. | Sim |
| `transaction > order > buyer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| `transaction > order > buyer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do comprador. | Sim |
| `transaction > order > buyer > shippingAddress` | Alfanumérico | | Endereço de envio do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > street1` | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim | 
| `transaction > order > buyer > shippingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > country` | Alfanumérico | 2 | País do endereço do comprador no formato ISO 3166 alpha-2. | Sim |
| `transaction > order > buyer > shippingAddress > postalCode` | Número | Máx:20 | Código postal do endereço do comprador. | Sim |
| `transaction > order > buyer > shippingAddress > phone` | Número | Máx:20 | Número de telefone do endereço do comprador. | Sim |
| `transaction > order > additionalValues` | Objeto | 64 | Valor da ordem ou seus valores associados. | Sim |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Valor da transação. | Sim |
| `transaction > order > additionalValues > TX_VALUE > value` | Número | 12, 2 | Especifica o valor da transação. Este valor não pode incluir decimais. | Sim |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| `transaction > order > additionalValues > TX_TAX` | Alfanumérico | 64 | Valor do Imposto sobre o Valor Acrescentado (IVA - Impuesto al Valor Agregado). | Sim |
| `transaction > order > additionalValues > TX_TAX > value` | Número | 12, 2 | Especifica o valor do IVA.<br>Se este parâmetro não for definido, PayU aplica o valor do imposto atual (19%).<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais  | Não |
| `transaction > order > additionalValues > TX_TAX > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alfanumérico | 64 | Valor base para cálculo do IVA.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais  | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Número | 12, 2 | Especifica o valor base da transação. | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > payer` | Objeto | | Informações do pagador. | Sim |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nome of the payer. | Sim |
| `transaction > payer > billingAddress` | Objeto | | Endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Endereço de cobrança linha 1. | Sim |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Sim |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Sim |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Data de nascimento do pagador. | Não |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do pagador. | Sim |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do pagador. | Sim |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| `transaction > type` | Alfanumérico | 32 | Como os pagamentos em dinheiro e com referência bancária são feitos em escritórios físicos, la única transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sim |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecione um método de pagamento válido em dinheiro ou Referência bancária. [Veja os métodos de pagamento disponíveis na Colômbia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sim |
| `transaction > paymentCountry` | Alfanumérico | 2 | Definir `CO` para a Colômbia. | Sim |
| `transaction > expirationDate` | Alfanumérico | 23 | Data e hora máximas que o pagador tem para efetuar o pagamento. Formato `YYYY-MM-DDTHH:MM:SS`, por exemplo `2021-06-12T16:07:11.586`. | Não |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |

</details>

<details>
<summary><b>Resposta</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| `code` | Alfanumérico | | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| `transactionResponse` | Objeto | | Os dados de resposta. |
| `transactionResponse > orderId` | Número | | O ID de ordem gerado ou existente no PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | O identificador da transação no PayU. |
| `transactionResponse > state` | Alfanumérico | Máx:32 | O status da transação. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx:255 | O código de resposta fornecido pela rede financeira. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx:255 | A mensagem de erro fornecida pela rede financeira. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx:32 | O código de rastreamento fornecido pela rede financeira. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx:12 | O código de autorização fornecido pela rede financeira. |
| `transactionResponse > pendingReason` | Alfanumérico | Máx:21 | O código de resposta associado ao status, conforme mencionado em `transactionResponse > state`, a transação está aguardando o pagamento. |
| `transactionResponse > responseCode` | Alfanumérico | Máx:64 | O código de resposta associado ao status. Neste caso, para transações bem-sucedidas é `PENDING_TRANSACTION_CONFIRMATION`. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| `transactionResponse > operationDate` | Date | | Data de criação da resposta no sistema PayU. |
| `transactionResponse > extraParameters` | Objeto | | Parâmetros ou dados adicionais associados à resposta.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"REFERENCE": "74794"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>REFERENCE</string>`<br>&emsp;&emsp;`<int>74794</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| `transactionResponse > additionalInfo` | Objeto | | Informações adicionais associadas à resposta. Este objeto segue a mesma estrutura que `transactionResponse.extraParameters`. |

</details>

#### Observações {#considerations-4}

* O parâmetro `transaction.expirationDate` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de 7 dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* Para <!--`BALOTO` e -->`EFECTY`, a confirmação do pagamento leva 15 minutos. Para `BANK_REFERENCED` e `OTHERS_CASH` (Su Red), a confirmação é feita online.
* Os valores mínimo e máximo para <!--`BALOTO`, -->`EFECTY` e `OTHERS_CASH` (Su Red) são:
   - `EFECTY` > Mín: $20.000 COP - Máx: $6.000.000 COP
   - `OTHERS_CASH` (Su Red) > Mín: $1.000 COP - Máx: $4.000.000 COP
   <!-- - `BALOTO` > Mín: $3.000 COP - Máx: $1.000.000 COP-->
* O parâmetro `transactionResponse.extraParameters` tem os seguintes parâmetros relacionados à transação:
   - **EXPIRATION_DATE**: prazo máximo para o pagador fazer o pagamento.   
   - **REFERENCE**: referência interna de pagamento gerada pelo PayU.
   - **URL_PAYMENT_RECEIPT_HTML**: comprovante de pagamento em formato HTML. É para cá que você precisa redirecionar o pagamento quando o pagador seleciona o pagamento em dinheiro. 
   - **URL_PAYMENT_RECEIPT_PDF**: comprovante de pagamento em formato PDF.
   - **BANCO_BOGOTA_SERVICE_CODE**: código de pagamento para Banco de Bogotá. Available ao usar `BANK_REFERENCED`.
   - **BANK_REFERENCED_NAME**: Nome de referência para Bancolombia. Available ao usar `BANK_REFERENCED`.
   - **BANCOLOMBIA_SERVICE_CODE**: código de pagamento para Bancolombia. Available ao usar `BANK_REFERENCED`.

### Chamada da API {#api-call-7}

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
         "accountId": "512321",
         "referenceCode": "PRODUCT_TEST_2021-06-23T19:59:43.229Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "1d6c33aed575c4974ad5c0be7c6a1c87",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 65000,
               "currency": "COP"
         },
            "TX_TAX": {
               "value": 10378,
               "currency": "COP"
         },
            "TX_TAX_RETURN_BASE": {
               "value": 54622,
               "currency": "COP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Cr 23 No. 53-50",
               "street2": "5555487",
               "city": "Bogotá",
               "state": "Bogotá D.C.",
               "country": "CO",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "5555487",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
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
         "billingAddress": {
            "street1": "Cr 23 No. 53-50",
            "street2": "125544",
            "city": "Bogotá",
            "state": "Bogotá D.C.",
            "country": "CO",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "EFECTY",
      "expirationDate": "2021-06-24T20:58:35.804",
      "paymentCountry": "CO",
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
        "orderId": 1400449740,
        "transactionId": "f3531b6a-3e30-4a8b-8a69-d4a5bd2a3377",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "f3531b6a-3e30-4a8b-8a69-d4a5bd2a3377",
        "authorizationCode": null,
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624463917065,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "EXPIRATION_DATE": 1624568315804,
            "REFERENCE": 1400449740,
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=1400449740Yf3531b6a3e304a8Y30f3f7b4598eb19",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app/v2?vid=1400449740Yf3531b6a3e304a8Y30f3f7b4598eb19"
        },
        "additionalInfo": {
            "paymentNetwork": "EFECTY",
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
         <accountId>512321</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-23T19:59:43.229Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>1d6c33aed575c4974ad5c0be7c6a1c87</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>65000</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX</string>
               <additionalValue>
                  <value>10378</value>
                  <currency>COP</currency>
               </additionalValue>
               <string>TX_TAX_RETURN_BASE</string>
               <additionalValue>
                  <value>54622</value>
                  <currency>COP</currency>
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
               <street1>Cr 23 No. 53-50</street1>
               <street2>5555487</street2>
               <city>Bogotá</city>
               <state>Bogotá D.C.</state>
               <country>CO</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
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
         <billingAddress>
            <street1>Cr 23 No. 53-50</street1>
            <street2>5555487</street2>
            <city>Bogotá</city>
            <state>Bogotá D.C.</state>
            <country>CO</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>EFECTY</paymentMethod>
      <expirationDate>2021-06-24T20:58:35.804</expirationDate>
      <paymentCountry>CO</paymentCountry>
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
        <orderId>1400449797</orderId>
        <transactionId>0b41f4d0-4486-4acf-ab5e-d757e35d994d</transactionId>
        <state>PENDING</state>
        <trazabilityCode>0b41f4d0-4486-4acf-ab5e-d757e35d994d</trazabilityCode>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <operationDate>2021-06-23T11:20:03</operationDate>
        <extraParameters>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-30T23:59:59</date>
            </entry>
            <entry>
                <string>REFERENCE</string>
                <int>1400449797</int>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=1400449797Y0b41f4d044864acY3e5f14fc8ef00e8</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app/v2?vid=1400449797Y0b41f4d044864acY3e5f14fc8ef00e8</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>EFECTY</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Processar pagamentos como companhia aérea ou agência de viagens {#process-payments-as-an-airline-or-travel-agency}

Esta seção foi criada para facilitar a integração dos serviços PayU, especificamente adaptados às necessidades de companhias aéreas e agências de viagens na Colômbia.

### Observações {#considerations-5}

* Disponível exclusivamente na Colômbia para transações em moeda COP.
* Permite o processamento de pagamentos através do modelo TSP/Gateway.
* Requer registro de códigos IATA junto aos adquirentes.
* Suporta pagamentos com cartões de crédito ou débito, incluindo AMEX, DINERS, MASTERCARD e VISA.
* Permite a dispersão de fundos, possibilitando que agências de viagens e companhias aéreas recebam seus pagamentos na mesma transação.
* Requer processamento em uma única etapa: o sistema transfere os fundos da conta do cliente para o banco adquirente assim que o pagamento é autorizado.

### Considerações de integração:
Esta integração permite que companhias aéreas e agências de viagens na Colômbia otimizem os processos de pagamento, fornecendo informações essenciais em cada transação para apoiar a identificação e a distribuição precisa de fundos. Além disso, ao enviar detalhes específicos da transação, é possível que elas se qualifiquem para isenção do imposto 4 x 1000 (confirme com seu banco adquirente).

**Passos para integração:** 

1. Recupere a lista de companhias aéreas disponíveis.
2. Envie a transação pela API de Pagamentos PayU.
3. Inclua informações do Registro de Nome de Passageiro (PNR) (opcional).

| **Funcionalidade** | **Companhias aéreas** | **Agências de viagens** |
|-|-|-|
| **Inclusão de taxas** | As companhias aéreas podem enviar seu ID de companhia aérea, junto com taxas aeroportuárias e outros impostos associados. | As agências de viagens podem enviar suas taxas de transação junto com as taxas das companhias aéreas, taxas aeroportuárias, taxas administrativas e outros encargos. |
| **Identificação** | Os adquirentes podem identificar a companhia aérea especificamente através do ID da companhia aérea para uma distribuição direcionada. | Permite que o adquirente identifique tanto a agência de viagens quanto a companhia aérea para distribuição precisa de fundos. |
| **Elegibilidade para isenção do imposto 4 x 1000** | Companhias aéreas colombianas podem se qualificar se fornecerem seu ID de companhia aérea e informações relevantes sobre taxas. | Agências de viagens colombianas podem se qualificar se fornecerem detalhes abrangentes da transação. |

{{% alert title="Nota" color="info"%}}

Consulte o seu banco adquirente para verificar se o seu negócio atende aos requisitos para a isenção do imposto 4 x 1000. A elegibilidade depende das informações fornecidas em cada transação e das regulamentações vigentes.

{{% /alert %}}

### Recuperar a lista de companhias aéreas disponíveis

Para integrar-se ao PayU, tanto agências de viagens quanto companhias aéreas precisam recuperar os códigos das companhias aéreas elegíveis para a coleta de pagamentos e enviá-los através da API de Pagamentos. Isso pode ser feito consultando o sistema PayU para obter a lista de companhias aéreas disponíveis e seus respectivos códigos. O endpoint para recuperar códigos de companhias aéreas é o mesmo para ambos os tipos de comerciantes, embora o uso específico possa variar:
  
- **Companhias aéreas**:
  - As companhias aéreas recuperam e enviam seus próprios códigos para possibilitar identificação precisa e benefícios fiscais potenciais.
  - Ao fornecer o código da companhia aérea, garantem transações simplificadas para suas taxas e encargos associados.

- **Agências de viagens**:
  - As agências recuperam o código da companhia aérea associado a cada pagamento para garantir a alocação correta de taxas e impostos.
  - Essa integração ajuda a identificar a companhia aérea envolvida na transação para uma distribuição adequada dos fundos.

Para recuperar a lista, use os seguintes endpoints com base no seu ambiente:

- **Sandbox**: `https://sandbox.api.payulatam.com/payments-api/rest/v4.3/payments/airline`
- **Produção**: `https://api.payulatam.com/payments-api/rest/v4.3/payments/airline`

| **Parâmetro de consulta** | **Descrição** |
|-|-|
| `accountID` | Código de identificação que a PayU Latam atribuiu à conta. |

| **Parâmetro de cabeçalho** | **Descrição** |
|-|-|
| `Authorization` | Valor do cabeçalho de autenticação para realizar uma solicitação válida. |

Exemplo de código em JavaScript para gerar o cabeçalho de autenticação:

```javascript
var contentToSign = "pRRXKOl8ikMmt9u" + ":" + "4Vj8eK4rloUd272L48hsrarnUA";
var base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(contentToSign));
var authenticationHeader = "Basic " + base64.toString();
```

{{% alert title="Nota" color="info"%}}

Embora seja improvável que os códigos de companhias aéreas mudem, ainda existe essa possibilidade. Recomendamos usar a consulta para armazenar o código da companhia aérea e utilizá-lo nos pagamentos com nossa API de Pagamentos.

{{% /alert %}}

| Parâmetro de consulta | Descrição |
|-|-|
| `airlines` | Array de companhias aéreas. |
| `airlines > code` | Código da companhia aérea. |
| `airlines > description` | Descrição da companhia aérea. |

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>


**Exemplo de uma resposta:**
```JSON
{
  "airlines": [
    {
      "code": "81",
      "description": "AVIA MARKETING LTDA NAL Nacional"
    },
    .
    .
    .
    {
      "code": "65",
      "description": "OCEANAIR LINHAS AEREAS S.A Nacional"
    }
  ]
}
```
<br>

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Exemplo de uma resposta:**
```XML
<com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlinesListResponse>
 <airlines>
 <com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 <code>80</code>
 <description>AVIATUR S.A. BOG Internacional</description>
 </com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 .
 .
 .
 <com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 <code>87</code>
 <description>LAN AIRLINES Nacional</description>
 </com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 </airlines>
</com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlinesListResponse>
```

{{< /tab >}}

{{< /tabs >}}

### Enviar transações como uma companhia aérea

Para concluir uma solicitação de transação com sucesso, é necessário incluir os parâmetros específicos para companhias aéreas, além dos parâmetros padrão para [pagamentos com cartão de crédito]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}). Opcionalmente, você também pode incluir [dados PNR]({{< ref "Payments-API-Colombia.md#include-passenger-name-record-information-optional" >}}). Utilize o código da companhia aérea recuperado do endpoint anterior e inclua quaisquer taxas e impostos aeroportuários aplicáveis.

<details>
<summary><b>Solicitação</b></summary>
<br>
<div class="variables"></div>

| **Campo** | **Tipo** | **Tamanho** | **Descrição** | **Exemplo** |
|-|-|-|-|-|
| `transaction > order > additionalValues > TX_VALUE > value` | Numérico | 12,2 | Valor total da transação. Pode conter até duas casas decimais. | 119000 |
| `transaction > order > additionalValues > TX_TAX > value` | Numérico | 12,2 | Valor do IVA. Se não especificado, o sistema aplica uma taxa padrão de 19% na Colômbia. Use 0 para itens isentos de IVA. | 19000 |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Numérico | 12,2 | Valor base para cálculo do IVA. Defina como 0 se o produto ou serviço for isento de IVA. | 100000 |
| `transaction > order > additionalValues > TX_ADDITIONAL_VALUE > value` | Numérico | 12,2 | Tarifas aeroportuárias e outros impostos aplicáveis. | 25000 |

</details>

#### Chamada da API {#api-call-8}

A seguir, exemplos de solicitação deste método.

{{< tabs tabTotal="2" tabID="10" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Exemplo de uma solicitação:**
```JSON
{
  ...
  "transaction": {
    "order": {
      ...      
      "additionalValues": {
        "TX_VALUE": {
          "value": 119000,
          "currency": "COP"
        },
        "TX_TAX": {
          "value": 19000,
          "currency": "COP"
        },
        "TX_TAX_RETURN_BASE": {
          "value": 100000,
          "currency": "COP"
        },
        "TX_ADDITIONAL_VALUE": {
          "value": 25000,
          "currency": "COP"
        }
      }
    },
    "creditCard": {
      ...
    },
    "extraParameters": {
      ...
    },
    "pnr": {
      ...
    }
  }
}
```
<br>

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Exemplo de uma solicitação:**
```XML
<request>
  ...
  <transaction>
    <order>
      ...      
      <additionalValues>
        <entry>
          <string>TX_VALUE</string>
          <additionalValue>
            <value>119000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX</string>
          <additionalValue>
            <value>19000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX_RETURN_BASE</string>
          <additionalValue>
            <value>100000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_ADDITIONAL_VALUE</string>
          <additionalValue>
            <value>25000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
      </additionalValues>
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
    ...
    <pnr>
      ...
    </pnr>
  </transaction>
</request>
```

{{< /tab >}}

{{< /tabs >}}

### Enviar transações como uma agência de viagens

Para concluir uma solicitação de transação com sucesso, é necessário incluir os parâmetros específicos para agências de viagens, além dos parâmetros padrão para [pagamentos com cartão de crédito]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}). Opcionalmente, você também pode incluir [dados PNR]({{< ref "Payments-API-Colombia.md#include-passenger-name-record-information-optional" >}}). Utilize o código da companhia aérea recuperado do endpoint anterior e inclua quaisquer taxas e impostos aeroportuários aplicáveis.

<details>
<summary><b>Solicitação</b></summary>
<br>
<div class="variables"></div>

| **Campo** | **Tipo** | **Tamanho** | **Descrição** | **Exemplo** |
|-|-|-|-|-|
| `transaction > order > airlineCode` | Alfanumérico | 4 | Código da companhia aérea. | 29 |
| `transaction > order > additionalValues > TX_VALUE > value` | Numérico | 12,2 | Valor total da transação. Pode conter até duas casas decimais (ex.: 10000.00 ou 10000). | 119000 |
| `transaction > order > additionalValues > TX_TAX > value` | Numérico | 12,2 | Valor do IVA da transação. Se não especificado, o sistema aplica automaticamente uma taxa de 19% na Colômbia. Se isento de IVA, defina como 0. | 19000 |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Numérico | 12,2 | Valor base para cálculo do IVA. Se isento de IVA, atribua 0 a esta variável. | 100000 |
| `transaction > order > additionalValues > TX_ADDITIONAL_VALUE > value` | Numérico | 12,2 | Tarifas aeroportuárias e outros impostos. | 25000 |
| `transaction > order > additionalValues > TX_ADMINISTRATIVE_FEE > value` | Numérico | 12,2 | Valor da taxa administrativa da agência de viagens. | 5950 |
| `transaction > order > additionalValues > TX_TAX_ADMINISTRATIVE_FEE > value` | Numérico | 12,2 | Valor do imposto sobre a taxa administrativa da agência de viagens. | 950 |
| `transaction > order > additionalValues > TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE > value` | Numérico | 12,2 | Valor base para cálculo do imposto sobre a taxa administrativa da agência de viagens. | 5000 |

</details>

#### Chamada da API {#api-call-9}

A seguir, exemplos de solicitação deste método.

{{< tabs tabTotal="2" tabID="11" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

**Exemplo de uma solicitação:**
```JSON
{
  ...
  "transaction": {
    "order": {
      ...
      "airlineCode": "29",
      "additionalValues": {
        "TX_VALUE": {
          "value": 119000,
          "currency": "COP"
        },
        "TX_TAX": {
          "value": 19000,
          "currency": "COP"
        },
        "TX_TAX_RETURN_BASE": {
          "value": 100000,
          "currency": "COP"
        },
        "TX_ADDITIONAL_VALUE": {
          "value": 25000,
          "currency": "COP"
        },
        "TX_ADMINISTRATIVE_FEE": {
          "value": 5950,
          "currency": "COP"
        },
        "TX_TAX_ADMINISTRATIVE_FEE": {
          "value": 950,
          "currency": "COP"
        },
        "TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE": {
          "value": 5000,
          "currency": "COP"
        }
      }
    },
    "creditCard": {
      ...
    },
    "extraParameters": {
      ...
    },
    "pnr": {
      ...
    }
  }
}
```
<br>

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Exemplo de uma solicitação:**
```XML
<request>
  ...
  <transaction>
    <order>
      ...
      <airlineCode>29</airlineCode>
      <additionalValues>
        <entry>
          <string>TX_VALUE</string>
          <additionalValue>
            <value>119000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX</string>
          <additionalValue>
            <value>19000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX_RETURN_BASE</string>
          <additionalValue>
            <value>100000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_ADDITIONAL_VALUE</string>
          <additionalValue>
            <value>25000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_ADMINISTRATIVE_FEE</string>
          <additionalValue>
            <value>5950</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX_ADMINISTRATIVE_FEE</string>
          <additionalValue>
            <value>950</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
        <entry>
          <string>TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE</string>
          <additionalValue>
            <value>5000</value>
            <currency>COP</currency>
          </additionalValue>
        </entry>
      </additionalValues>
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
    ...
    <pnr>
      ...
    </pnr>
  </transaction>
</request>
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
| `transaction > pnr > id` | alfanumérico | 32 | ID do Registro de Nome de Passageiro. | `PNR123456` |
| `transaction > pnr > reservationAgent > id` | alfanumérico | 32 | ID do agente de reserva. | `AGENT123` |
| `transaction > pnr > reservationAgent > firstName` | alfanumérico | 255 | Primeiro nome(s) do agente de reserva. | `John` |
| `transaction > pnr > reservationAgent > lastName` | alfanumérico | 255 | Sobrenome(s) do agente de reserva. | `Doe` |
| `transaction > pnr > reservationAgent > email` | alfanumérico | 255 | Endereço de e-mail do agente de reserva. | `agent@example.com` |
| `transaction > pnr > reservationAgent > officePhoneNumber` | alfanumérico | 50 | Número de telefone de escritório do agente de reserva. | `+573001234567` |
| `transaction > pnr > reservationOffice > id` | alfanumérico | 9 | ID do escritório de reservas. | `OFFICE123` |
| `transaction > pnr > reservationOffice > country` | alfanumérico | 2 | País do escritório de reservas (código ISO). | `CO` |
| `transaction > pnr > saleOffice > id` | alfanumérico | 9 | ID do escritório de vendas. | `SALEOFF123` |
| `transaction > pnr > saleOffice > country` | alfanumérico | 2 | País do escritório de vendas (código ISO). | `US` |
| `transaction > pnr > passengers[] > id` | alfanumérico | 32 | ID do passageiro. | `PASS12345` |
| `transaction > pnr > passengers[] > country` | alfanumérico | 2 | País do passageiro (código ISO). | `AR` |
| `transaction > pnr > passengers[] > level` | alfanumérico | 32 | Nível do passageiro. | `GOLD` |
| `transaction > pnr > passengers[] > firstName` | alfanumérico | 255 | Primeiro nome(s) do passageiro. | `Maria` |
| `transaction > pnr > passengers[] > lastName` | alfanumérico | 255 | Sobrenome(s) do passageiro. | `Gonzalez` |
| `transaction > pnr > passengers[] > documentType` | numérico | 2 | Tipo de documento. Os valores possíveis são:<br>`0` = Não especificado<br>`1` = Cédula de cidadania (Cédula de ciudadanía)<br>`2` = Cédula de estrangeiro (Cédula de extranjería)<br>`3` = Número de identificação tributária (Número de identificación tributaria)<br>`4` = Carteira de identidade (Tarjeta de identidad)<br>`5` = Passaporte (Pasaporte)<br>`6` = Número de seguridade social (Tarjeta de seguridad social)<br>`7` = Número de identificação estrangeiro (Sociedad extranjera sin NIT)<br>`8` = Conta escrow (Fideicomiso)<br>`9` = Certidão de nascimento (Registro civil)<br>`10` = Carteira diplomática (Carnet diplomático) | `5` |
| `transaction > pnr > passengers[] > documentNumber` | alfanumérico | 50 | Número do documento do passageiro. | `P12345678` |
| `transaction > pnr > passengers[] > email` | alfanumérico | 255 | Endereço de e-mail do passageiro. | `passenger@example.com` |
| `transaction > pnr > passengers[] > officePhoneNumber` | alfanumérico | 50 | Número de telefone de escritório do passageiro. | `+573008765432` |
| `transaction > pnr > passengers[] > homePhoneNumber` | alfanumérico | 50 | Número de telefone residencial do passageiro. | `+573002345678` |
| `transaction > pnr > passengers[] > mobilePhoneNumber` | alfanumérico | 50 | Número de telefone celular do passageiro. | `+573001234567` |
| `transaction > pnr > passengers[] > address > country` | alfanumérico | 2 | País do endereço do passageiro (código ISO). | `BR` |
| `transaction > pnr > passengers[] > address > city` | alfanumérico | 65 | Cidade do endereço do passageiro. | `São Paulo` |
| `transaction > pnr > passengers[] > address > street` | alfanumérico | 255 | Endereço da rua do passageiro. | `Rua das Flores, 123` |
| `transaction > pnr > itinerary[] > departureDate` | alfanumérico | 19 | Data de partida no formato UTC. | `2022-01-01T23:59:59` |
| `transaction > pnr > itinerary[] > arrivalDate` | alfanumérico | 19 | Data de chegada no formato UTC. | `2022-01-02T23:59:59` |
| `transaction > pnr > itinerary[] > flightNumber` | alfanumérico | 12 | Número do voo. | `FL1234` |
| `transaction > pnr > itinerary[] > origin` | alfanumérico | 8 | Origem. | `BOG` |
| `transaction > pnr > itinerary[] > destination` | alfanumérico | 8 | Destino. | `MIA` |
| `transaction > pnr > itinerary[] > travelClass` | alfanumérico | 2 | Classe do segmento de reserva. | `Y` |
| `transaction > pnr > itinerary[] > ticketType` | alfanumérico | 50 | Tipo de bilhete. | `E-TICKET` |

</details>

{{% alert title="Nota" color="info"%}}

Ao usar o formato XML, os parâmetros do itinerário aparecem sob `transaction > pnr > itinerary > segment` com a mesma estrutura, mas ajustados quanto à hierarquia.

{{% /alert %}}

#### Chamada da API {#api-call-10}

A seguir, exemplos da solicitação deste método.

{{< tabs tabTotal="2" tabID="12" tabName1="JSON" tabName2="XML" >}}
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

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-6}

<details>
<summary><b>Solicitação</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx:32 | Definir `GET_PAYMENT_METHODS`. | Sim |
| `test` (JSON)<hr>`isTest` (XML) | Boolean | | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| `merchant` | Objeto | | Este objeto contém os dados de autenticação. | Sim |
| `merchant > apiLogin` | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `merchant > apiKey` | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |

</details>

<details>
<summary><b>Resposta</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| `code` | Alfanumérico | | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| `paymentMethods` | Objeto | | Lista dos métodos de pagamento. |
| `paymentMethods > paymentMethodComplete` | Objeto | | Este objeto contém as informações de um método de pagamento. |
| `paymentMethods > paymentMethodComplete > id` | Numérico | | Identificador do método de pagamento. |
| `paymentMethods > paymentMethodComplete > description` | Alfanumérico | Máx:32 | Nome do método de pagamento. |
| `paymentMethods > paymentMethodComplete > country` | Alfanumérico | 2 | Código ISO do país do método de pagamento. |

</details>

### Chamada da API {#api-call-11}

A seguir estão os corpos do pedido e resposta deste método. Para fins de exemplo, a solicitação e a resposta aqui mostram dois métodos de pagamento. 

{{< tabs tabTotal="2" tabID="13" tabName1="JSON" tabName2="XML" >}}
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
            "id": "36",
            "description": "EFECTY",
            "country": "CO",
            "enabled": true,
            "reason": null
        },
        {
            "id": "10",
            "description": "MASTERCARD",
            "country": "co",
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
            <id>36</id>
            <description>EFECTY</description>
            <country>CO</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>10</id>
            <description>MASTERCARD</description>
            <country>CO</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
    </paymentMethods>
</paymentMethodsResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Ping

O método `PING` permite que você confirme a conexão com a nossa plataforma.

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-7}

<details>
<summary><b>Solicitação</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| `language` | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx:32 | Definir `PING`. | Sim |
| `test` (JSON)<hr>`isTest` (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| `merchant` | Objeto | | Este objeto contém os dados de autenticação. | Sim |
| `merchant > apiLogin` | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| `merchant > apiKey` | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |

</details>

<details>
<summary><b>Resposta</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| `code` | Alfanumérico | | O código de resposta da transação. |
| `error` | Alfanumérico | Máx:2048 | A mensagem de erro associada, caso tenha ocorrido um erro. |
| `transactionResponse` | Objeto | Máx:2048 | A resposta do método PING caso tenha ocorrido um erro. |
</details>

### Chamada da API {#api-call-12}

A seguir estão os corpos do pedido e resposta deste método.

{{< tabs tabTotal="2" tabID="14" tabName1="JSON" tabName2="XML" >}}
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
