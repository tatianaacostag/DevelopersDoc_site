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

Este guia mostra como aproveitar esses serviços para melhorar a experiência de pagamento dos seus clientes, proporcionando opções de pagamento flexíveis e seguras, adaptadas ao mercado colombiano.

{{% alert title="Nota" color="info"%}}

Para integrar-se com a API de Pagamentos, direcione suas solicitações para os seguintes URLs com base no ambiente correspondente:
* Teste: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Produção: ```https://api.payulatam.com/payments-api/4.0/service.cgi```

{{% /alert %}}

## Métodos Disponíveis {#available-methods}

A API de Pagamentos inclui os seguintes métodos:

* [Enviar Transações Usando Cartões de Crédito ou Débito]({{< ref "#submit-transactions-using-credit-or-debit-cards" >}})
* [Enviar Transações Usando Nequi]({{< ref "#submit-transactions-using-nequi" >}})
* [Enviar Transações Usando Dinheiro ou Referência Bancária]({{< ref "#submit-transactions-using-cash-or-bank-reference" >}})
* [Enviar Transações Usando Transferência Bancária (PSE)]({{< ref "#submit-transactions-using-bank-transfer-pse" >}})
* [Lista de Bancos - PSE]({{< ref "#banks-list---pse" >}})
* [Consulta de Métodos de Pagamento Disponíveis]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Nota" color="info"%}}

Para confirmar o status de uma transação, você pode usar uma das seguintes opções:
* Acesse a URL definida no parâmetro `transaction.notifyUrl` ou a opção _**URL de confirmação**_ localizada no Módulo PayU em _**Configuração**_ > _**Configuração técnica**_.
* Use o [API ou SDK de Consultas]({{< ref "Queries.md" >}}).

{{% /alert %}}

## Enviar Transações Usando Cartões de Crédito ou Débito {#submit-transactions-using-credit-or-debit-cards}

Este método permite processar os pagamentos efetuados com cartão de crédito ou débito pelos seus clientes. Para a Colômbia, você pode fazer fluxos de uma etapa (**Cobrança**). Para obter mais informações, consulte [Fluxos de pagamento]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Nota" color="info"%}}

O fluxo em duas etapas está disponível somente sob solicitação, entre em contato com seu representante de vendas.

{{% /alert %}}

### Parâmetros para Solicitação e Resposta {#parameters-for-request-and-response}

<details>
<summary>Solicitação</summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `SUBMIT_TRANSACTION`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean | | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| merchant | Objeto | | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| transaction | Objeto | | Este objeto contém os dados da transação. | Sim |
| transaction > order | Objeto | | Este objeto contém os dados da ordem. | Sim |
| transaction > order > accountId | Número | | Identificador da sua conta. | Sim |
| transaction > order > referenceCode | Alfanumérico | Mín:1 Máx:255 | Representa o identificador da ordem em seu sistema. | Sim |
| transaction > order > description | Alfanumérico | Mín:1 Máx:255 | Descrição da ordem. | Sim |
| transaction > order > language | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| transaction > order > notifyUrl | Alfanumérico | Máx:2048 | URL de confirmação da ordem. | Não |
| transaction > order > partnerId | Alfanumérico | Máx:255 | ID de parceiro no PayU. | Não |
| transaction > order > signature | Alfanumérico | Máx:255 | A assinatura associada ao formulário. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| transaction > order > shippingAddress | Objeto | | Endereço para envio. | Não |
| transaction > order > shippingAddress > street1 | Alfanumérico | Máx:100 | Endereço: Linha 1. | Não |
| transaction > order > shippingAddress > street2 | Alfanumérico | Máx:100 | Endereço: Linha 2. | Não |
| transaction > order > shippingAddress > city | Alfanumérico | Máx:50 | Endereço: cidade. | Não |
| transaction > order > shippingAddress > state | Alfanumérico | Máx:40 | Endereço: estado. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | Endereço: país. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Máx:8 | Endereço: Código postal. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. | Não |
| transaction > order > buyer | Objeto | | Informações do comprador. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Máx:255 | E-mail do comprador. | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do comprador. | Sim |
| transaction > order > buyer > shippingAddress | Alfanumérico | | Endereço de envio do comprador. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País do endereço do comprador no formato ISO 3166 alpha-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Número | Máx:20 | Código postal do endereço do comprador. | Sim |
| transaction > order > buyer > shippingAddress > phone | Número | Máx:20 | Número de telefone do endereço do comprador. | Sim |
| transaction > order > additionalValues > | Objeto | 64 | Valor da ordem and seus valores associados. | Sim |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Valor da transação. | Sim |
| transaction > order > additionalValues > TX_VALUE > value | Número | 12, 2 | Especifica o valor da transação. Este valor não pode incluir decimais. | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Valor do Imposto sobre o Valor Acrescentado (IVA - Impuesto al Valor Agregado). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Número | 12, 2 | Especifica o valor do IVA.<br>Se este parâmetro não for definido, PayU aplica o valor do imposto atual (19%).<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais  | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para cálculo do IVA.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais  | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Número | 12, 2 | Especifica o valor base da transação. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > creditCardTokenId | | | Inclua este parâmetro quando a transação for feita com um cartão tokenizado. Além disso, é obrigatório enviar o parâmetro `transaction.creditCard.expirationDate`.<br>Para obter mais informações, consulte [API de tokenização]({{< ref "Tokenization-API.md" >}}). | Não |
| transaction > creditCard | Objeto | | Informações do cartão de crédito. Se você processar usando cartão de débito, não envie este parâmetro.<br>Este objeto e seus parâmetros são obrigatórios quando o pagamento é realizado com cartão de crédito não tokenizado. | Não |
| transaction > creditCard > number | Alfanumérico | Mín:13 Máx:20 | Número do cartão de crédito. | Não |
| transaction > creditCard > securityCode | Alfanumérico | Mín:1 Máx:4 | Código de segurança do cartão de crédito (CVC2, CVV2, CID). | Não |
| transaction > creditCard > expirationDate | Alfanumérico | 7 | Data de validade do cartão de crédito. Formato `YYYY/MM`. | Não |
| transaction > creditCard > name | Alfanumérico | Mín:1 Máx:255 | Nome do titular exibido no cartão de crédito. | Não |
| transaction > creditCard > processWithoutCvv2 | Boolean | Máx:255 | Permite processar transações sem incluir o código de segurança do cartão de crédito. Sua loja precisa da autorização do PayU antes de usar este recurso. | Não |
| transaction > debitCard | Objeto | | Informações do cartão de débito. Este objeto e seus parâmetros são obrigatórios quando o pagamento é realizado com cartão de débito. | Não |
| transaction > debitCard > number | Alfanumérico | Mín:13 Máx:20 | Número do cartão de débito. | Não |
| transaction > debitCard > securityCode | Alfanumérico | Mín:1 Máx:4 | Código de segurança do cartão de débito (CVC2, CVV2, CID). | Não |
| transaction > debitCard > expirationDate | Alfanumérico | 7 | Data de validade do cartão de débito. Formato `YYYY/MM`. | Não |
| transaction > debitCard > name | Alfanumérico | Mín:1 Máx:255 | Nome do titular exibido no cartão de débito. | Não |
| transaction > payer | Objeto | | Informações do pagador. | Sim |
| transaction > payer > emailAddress | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| transaction > payer > merchantPayerId | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| transaction > payer > fullName | Alfanumérico | Máx:150 | Nome do pagador, que deve corresponder ao nome enviado no parâmetro `transaction.creditCard.name`. | Sim |
| transaction > payer > billingAddress | Objeto | | Endereço de cobrança. | Sim |
| transaction > payer > billingAddress > street1 | Alfanumérico | Máx:100 | Endereço de cobrança linha 1. | Sim |
| transaction > payer > billingAddress > street2 | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Sim |
| transaction > payer > billingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Sim |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| transaction > payer > birthdate | Alfanumérico | Máx:10 | Data de nascimento do pagador. | Não |
| transaction > payer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do pagador. | Sim |
| transaction > payer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do pagador. | Sim |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > type | Alfanumérico | 32 | Defina este valor de acordo com a transação. Para a Colômbia, definir `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Selecione um método de pagamento com cartão de crédito válido. [Veja os métodos de pagamento disponíveis na Colômbia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Definir `CO` para a Colômbia. | Sim |
| transaction > deviceSessionId | Alfanumérico | Máx:255 | Identificador da sessão do dispositivo onde o cliente faz a transação. Para obter mais informações, consulte [Este tópico]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |
| transaction > cookie | Alfanumérico | Máx:255 | Cookie armazenado pelo dispositivo onde o cliente faz a transação. | Sim |
| transaction > userAgent | Alfanumérico | Máx:1024 | O agente do usuário do navegador onde o cliente faz a transação. | Sim |
| transaction > extraParameters | Objeto | | Parâmetros ou dados adicionais associados a pedido. O tamanho máximo de cada nome _extraParameters_ é de 64 caracteres.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | Não |
| transaction > threeDomainSecure | Objeto | | Este objeto contém as informações do 3DS 2.0. | Não |
| transaction > threeDomainSecure > embedded | Boolean |  | Definir `true` se você deseja usar um MPI integrado para o processo de autorização. Por padrão, este valor é definido como `false`. | Não |
| transaction > threeDomainSecure > eci | Número | Máx:2 | Indicador de comércio eletrônico.<br>Valor fornecido pelos servidores de diretório mostrando a tentativa de autenticação.<br>Este parâmetro é obrigatório quando `transaction.threeDomainSecure.embedded` is `false` e `transaction.threeDomainSecure.xid` for definido. | Não |
| transaction > threeDomainSecure > cavv | Alfanumérico | Máx:28 | Valor de verificação de autenticação do titular do cartão.<br>Código do criptograma usado na autenticação da transação em Base64.<br>Dependendo dos códigos ECI específicos estabelecidos pela rede de processamento, este valor pode ser opcional. | Não |
| transaction > threeDomainSecure > xid | Alfanumérico | Máx:28 | Código do criptograma usado na autenticação da transação em Base64.<br>Este parâmetro é obrigatório quando `transaction.threeDomainSecure.embedded` é `false` e `transaction.threeDomainSecure.eci` for definido. | Não |
| transaction > threeDomainSecure > directoryServerTransactionId | Alfanumérico | Máx:36 | ID da transação gerada pelo Servidor de Diretório durante a autenticação. | Não |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico | | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| transactionResponse | Objeto | | Os dados de resposta. |
| transactionResponse > orderId | Número | | O ID de ordem gerado ou existente no PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | O identificador da transação no PayU. |
| transactionResponse > state | Alfanumérico | Máx:32 | O status da transação. |
| transactionResponse > responseCode | Alfanumérico | Máx:64 | O código de resposta associado ao status. |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Máx:255 | O código de resposta fornecido pela rede financeira. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Máx:255 | A mensagem de erro fornecida pela rede financeira. |
| transactionResponse > trazabilityCode | Alfanumérico | Máx:32 | O código de rastreamento fornecido pela rede financeira. |
| transactionResponse > authorizationCode | Alfanumérico | Máx:12 | O código de autorização fornecido pela rede financeira. |
| transactionResponse > responseMessage | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| transactionResponse > operationDate | Data | | Data de criação da resposta no sistema PayU. |
| transactionResponse > extraParameters | Objeto | | Parâmetros ou dados adicionais associados à resposta. <br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo | Objeto | | Informações adicionais associadas à resposta. Este objeto segue a mesma estrutura que `transactionResponse.extraParameters`. |

</details>

#### Observações {#considerations}

* Para pagamentos com tokens de cartão de crédito, inclua os parâmetros `transaction.creditCardTokenId` e `transaction.creditCard.securityCode` (se processar com código de segurança) substituindo as informações do cartão de crédito. Para obter mais informações, consulte [API de tokenização]({{< ref "Tokenization-API.md" >}}).
* Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas. Depois que esse recurso for habilitado para você, envie no pedido a variável `creditCard.processWithoutCvv2` como `true` e remova a variável `creditCard.securityCode`.
* A variável `transaction.threeDomainSecure` não substitui as informações do cartão nem qualquer um dos campos obrigatórios da transação. Este objeto é adicional e não obrigatório.
* A variável `transaction.threeDomainSecure` corresponde a um cenário _passthrough_ onde a loja faz a autenticação por conta própria.
* No cartão Crédito Fácil Codensa, o número de parcelas aceitas é de 1 a 12, 18, 24, 36 e 48.
* No cartão Crédito Fácil Codensa, o pagador pode escolher qualquer um dos seguintes tipos de documentos para a variável `transaction.payer.dniType`:

| ISO | Descrição |
|:-:|-|
| CC | Cartão de cidadania. |
| CE | Cartão de cidadão estrangeiro. |
| NIT | Número de identificação fiscal (empresas). |
| TI | Cartão de identidade. |
| PP | Passaporte. |
| IDC | Identificador único do cliente, em casos com ID único de cliente/ ID de conta de serviços. |
| CEL | Quando identificado pela linha móvel. |
| RC | Certidão de nascimento.  |
| DE | Documento de identificação de estrangeiro. |

### Chamada para a API {#api-call}

A seguir estão os exemplos de pedido e resposta desta forma de pagamento.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo de uma Solicitação:
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

Exemplo de uma Resposta:
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

Exemplo de uma Solicitação:
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

Exemplo de uma Resposta:
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

## Enviar Transações Usando Nequi {#submit-transactions-using-nequi}

A Nequi é uma plataforma abrangente de serviços financeiros que funciona através de uma carteira digital disponível para milhões de utilizadores através de uma aplicação móvel. Com a Nequi, é possível efetuar pagamentos, transferências, carregamentos e levantamentos de forma rápida e segura, tudo a partir do seu dispositivo pessoal.

Para além de ser uma ferramenta conveniente para os utilizadores individuais, a Nequi é também uma solução de pagamento inovadora para as empresas. Ao aceitar pagamentos com a Nequi, a sua empresa pode beneficiar de uma série de vantagens significativas:

* **Aumento das vendas:** Ao oferecer a Nequi como opção de pagamento, a sua empresa pode atrair novos clientes que preferem transacções digitais. Isto pode traduzir-se num aumento das vendas e numa maior fidelização dos clientes.

* **Maior comodidade:** Ao permitir que os seus clientes paguem com Nequi, está a proporcionar uma experiência de compra mais versátil e rápida. Os clientes podem efetuar pagamentos instantâneos através do telemóvel, sem necessidade de dinheiro ou cartões físicos.

* **Maior segurança:** A Nequi oferece um ambiente de pagamento seguro e confiável, apoiado pelo Bancolombia, uma das maiores e mais confiáveis instituições financeiras da Colômbia. Isso proporciona tranquilidade tanto para os comerciantes quanto para os clientes, pois as transações são realizadas de forma segura e protegida.

### Processo de Pagamento com Nequi {#payment-process-with-nequi}

O fluxo de pagamento com a Nequi foi concebido para ser simples e ágil para o utilizador. O processo inclui 4 etapas:

1. **Seleção da forma de pagamento:** O cliente, no momento de efetuar a compra, escolhe a Nequi como sua forma de pagamento preferida dentre as opções disponíveis.

2. **Geração de notificação push:** Automaticamente, o sistema gera uma notificação push que é enviada para a aplicação móvel Nequi do cliente.

3. **Aceitação da notificação:** O cliente recebe a notificação na sua aplicação Nequi e aceita-a para confirmar a transação.

4. **Introdução do PIN Nequi:** Para completar a operação, o cliente introduz o seu PIN pessoal Nequi para autenticar e autorizar o pagamento.

### Experiência do Usuário {#user-experience}

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

### Parâmetros para Solicitação e Resposta {#parameters-for-request-and-response-1}

<details>
<summary>Solicitação</summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma usado na solicitação, este idioma é usado para exibir mensagens de erro geradas. [Verificar idiomas suportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definido como `SUBMIT_TRANSACTION`. | Sim |
| test (JSON)<hr>isTest (XML) | Booleano | | Definido como `true` se a solicitação estiver em modo de teste. Caso contrário, definido como `false`. | Sim |
| merchant | Objeto | | Este objeto contém dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Nome de usuário ou login fornecido pela PayU. | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pela PayU. | Sim |
| transaction | Objeto | | Este objeto contém dados da transação. | Sim |
| transaction > order | Objeto | | Este objeto contém dados do pedido. | Sim |
| transaction > order > accountId | Número | | Seu identificador de conta. | Sim |
| transaction > order > referenceCode | Alfanumérico | Mín:1 Máx:255 | Representa o identificador do pedido em seu sistema. | Sim |
| transaction > order > description | Alfanumérico | Mín:1 Máx:255 | Descrição do pedido. | Sim |
| transaction > order > language | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| transaction > order > notifyUrl | Alfanumérico | Máx:2048 | URL de confirmação do pedido. | Não |
| transaction > order > partnerId | Alfanumérico | Máx:255 | ID do parceiro PayU. | Não |
| transaction > order > signature | Alfanumérico | Máx:255 | Assinatura associada ao formulário. Para mais informações, consulte [Assinatura de Autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| transaction > order > shippingAddress | Objeto | | Endereço de envio. | Não |
| transaction > order > shippingAddress > street1 | Alfanumérico | Máx:100 | Linha de endereço 1. | Não |
| transaction > order > shippingAddress > street2 | Alfanumérico | Máx:100 | Linha de endereço 2. | Não |
| transaction > order > shippingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço. | Não |
| transaction > order > shippingAddress > state | Alfanumérico | Máx:40 | Estado do endereço. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | País do endereço. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Máx:8 | Código postal do endereço. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. | Não |
| transaction > order > buyer | Objeto | | Informações do comprador. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Máx:255 | Endereço de e-mail do comprador. | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do comprador. | Sim |
| transaction > order > buyer > shippingAddress | Objeto | | Endereço de envio do comprador. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Máx:150 | Linha 1 do endereço de envio do comprador. | Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de envio do comprador. | Sim |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de envio do comprador. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País do endereço de envio do comprador no formato alfa-2 ISO 3166. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Número | Máx:20 | Código postal do endereço de envio do comprador. | Sim |
| transaction > order > buyer > shippingAddress > phone | Número | Máx:20 | Número de telefone do endereço de envio do comprador. | Sim |
| transaction > order > additionalValues | Alfanumérico | 64 | Valor do pedido e valores associados. | Sim |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Valor da transação. | Sim |
| transaction > order > additionalValues > TX_VALUE > value | Número | 12, 2 | Especifica o valor da transação. Este valor não pode incluir decimais. | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código de moeda ISO. [Verificar moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Valor do imposto sobre valor agregado (IVA). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Número | 12, 2 | Especifica o valor do IVA. Se este parâmetro não estiver configurado, a PayU aplica o valor de imposto atual (19%). Se o valor não tiver IVA, envie 0. Este valor pode ter dois dígitos decimais. | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código de moeda ISO. [Verificar moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para calcular o IVA. Se o valor não tiver IVA, envie 0. Este valor pode ter dois dígitos decimais. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Número | 12, 2 | Especifica o valor base da transação. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código de moeda ISO. [Verificar moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > payer | Objeto | | Informações do pagador. | Sim |
| transaction > payer > emailAddress | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| transaction > payer > merchantPayerId | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| transaction > payer > fullName | Alfanumérico | Máx:150 | Nome do pagador. | Sim |
| transaction > payer > billingAddress | Objeto | | Endereço de cobrança. | Sim |
| transaction > payer > billingAddress > street1 | Alfanumérico | Máx:100 | Linha de endereço 1 da cobrança. | Sim |
| transaction > payer > billingAddress > street2 | Alfanumérico | Máx:100 | Linha de endereço 2 da cobrança. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Sim |
| transaction > payer > billingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País do endereço de cobrança no formato alfa-2 ISO 3166. | Sim |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| transaction > payer > birthdate | Alfanumérico | Máx:10 | Data de nascimento do pagador. | Não |
| transaction > payer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do pagador. Este é o número a ser usado para pagamento no Nequi. | Sim |
| transaction > payer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do pagador. | Sim |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificação do comprador. [Verificar tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > type | Alfanumérico | 32 | Atribua este valor de acordo com a transação. Para a Colômbia, atribua `AUTHORIZATION_AND_CAPTURE`. | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Defina `NEQUI` para o Método de Pagamento Nequi. | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Defina `CO` para Colômbia. | Sim |
| transaction > deviceSessionId | Alfanumérico | Máx:255 | Identificador de sessão do dispositivo onde o cliente realiza a transação. Para mais informações, consulte [esta seção]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente realiza a transação. | Sim |
| transaction > cookie | Alfanumérico | Máx:255 | Cookie armazenado pelo dispositivo onde o cliente realiza a transação. | Sim |
| transaction > userAgent | Alfanumérico | Máx:1024 | Agente do usuário do navegador onde o cliente realiza a transação. | Sim |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico | | Código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | Mensagem de erro associada quando o código de resposta é `ERROR`. |
| transactionResponse | Objeto | | Dados da resposta. |
| transactionResponse > orderId | Número | | Identificador do pedido gerado ou existente na PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | Identificador da transação na PayU. |
| transactionResponse > state | Alfanumérico | Máx:32 | Estado da transação. |
| transactionResponse > responseCode | Alfanumérico | Máx:64 | Código de resposta associado ao estado. |
| transactionResponse > pendingReason | Alfanumérico | Máx:64 | Motivo pendente da transação. |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Máx:255 | Código de resposta retornado pela rede financeira. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Máx:255 | Mensagem de erro retornada pela rede financeira. |
| transactionResponse > trazabilityCode | Alfanumérico | Máx:32 | Código de rastreabilidade retornado pela rede financeira. |
| transactionResponse > authorizationCode | Alfanumérico | Máx:12 | Código de autorização retornado pela rede financeira. |
| transactionResponse > responseMessage | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| transactionResponse > operationDate | Data | | Data de criação da resposta no sistema PayU. |
| transactionResponse > extraParameters | Objeto | | Parâmetros ou dados adicionais associados à resposta. <li>Em JSON, o parâmetro `extraParameters` segue esta estrutura: `"extraParameters": { "URL_PAYMENT_RECEIPT_HTML": "https:payu.checkout.com"}`<li>Em XML, o parâmetro `extraParameters` segue esta estrutura: `<extraParameters> <entry>  <string>URL_PAYMENT_RECEIPT_HTML</string>  <string>https:payu.checkout.com</string> </entry></extraParameters>` <br>**Nota:** Considere que você pode aproveitar este URL para redirecionar o usuário para uma página do PayU com um resumo da compra, conforme visto em [Experiência do Usuário]({{< ref "#user-experience" >}}). |
| transactionResponse > additionalInfo | Objeto | | Informações adicionais associadas à resposta. Este objeto segue a mesma estrutura que `transactionResponse.extraParameters`. |

</details>

### Chamada para a API {#api-call-1}

Os corpos de solicitação e de resposta para este método de pagamento são os seguintes:

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo de uma Solicitação:
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

Exemplo de uma Resposta:
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

Exemplo de uma Solicitação:
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

Exemplo de uma Resposta:
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

#### Formatos de Número de Telefone Suportados {#supported-phone-number-formats}
 
Ao usar integrações de API, as transações podem falhar quando o sistema recebe números de telefone de usuário que:

1. Contêm espaços em branco.
2. Não estão separados do código do país.
3. Contêm mais ou menos do que 10 dígitos (excluindo o código do país).

Atualmente, a integração não fornece um mecanismo para corrigir automaticamente o formato do número de telefone que o usuário insere. A tabela abaixo mostra exemplos de formatos de números de telefone e sua compatibilidade com a integração:

| Exemplo de Formato de Número de Telefone | Compatibilidade | Detalhes |
| - | - | - |
| 57 3007777777 | Formato compatível | O código do país (57) está separado do número de celular. |
| 3007777777 | Formato compatível | O número de celular não tem espaços e tem 10 dígitos. |
| 573007777777 | Formato incompatível | O número de celular e o código do país (57) não estão separados. |
| 57 300 7777777 | Formato incompatível | O número de celular tem espaços. |

**Recomendações**

Para evitar erros causados por formatos incompatíveis de números de telefone, recomendamos implementar as seguintes funcionalidades na experiência do usuário:

1. Implemente uma interface que crie automaticamente espaços separadores no número do celular à medida que o usuário o digita, facilitando a leitura do número e reduzindo a probabilidade de erros de entrada manual. Certifique-se de que esses espaços estejam visíveis no nível da interface e configure seu sistema para removê-los no nível do backend.

* Exemplo de interface:

![PrintScreen](/assets/Payments/Nequi05PT.png)

2. Configure as mensagens de erro a serem exibidas quando um usuário inserir um número de telefone com menos de 10 dígitos ou mais de 10 dígitos (excluindo o código do país, que é +57 para a Colômbia).

* **A)** Exemplo de uma interface que exibe espaços gerados automaticamente quando o usuário digita menos de 10 dígitos:

![PrintScreen](/assets/Payments/Nequi06PT.png)

* **B)** Exemplo de uma interface sem espaços quando o usuário digita mais de 10 dígitos:

![PrintScreen](/assets/Payments/Nequi07PT.png)

#### Teste de Ambiente de Sandbox {#sanbox-environment-testing}

Para testar transações Nequi no ambiente de Sandbox da PayU, utilize os seguintes dados:

| Número de telefone | Comportamento de autorização | Comportamento de consulta <br>(Aproximadamente 5 minutos após a autorização) |
| - | - | - |
| 3006666666 | Transaction rejected - Client not found on database | N/A |
| 3007777777 | Transaction pending | Transaction approved |
| 3007777776 | Transaction pending | Transaction declined |
| 3007777775 | Transaction pending | Transaction pending |
| 3007777774 | Transaction pending | Transaction failed |
| 3007777772 | Transaction pending | Transaction expired |

Você pode verificar o status da transação através da [API de Consultas]({{< ref "queries-api.html" >}}).

## Enviar Transações Usando Dinheiro ou Referência Bancária {#submit-transactions-using-cash-or-bank-reference}

Este método permite processar pagamentos de clientes em dinheiro ou através de uma referência bancária. Para integrar este método de pagamento, redirecione o cliente para o URL fornecido na resposta do método. Seu cliente verá então um recibo de pagamento conforme mostrado abaixo.

#### Pagamentos em Dinheiro {#payments-in-cash}

<img src="/assets/Payments/CashReceiptCO.png" alt="PrintScreen" width="75%">

#### Pagamentos com Referência Bancária {#payments-with-bank-reference}

<img src="/assets/Payments/BankReferenceReceiptCO.png" alt="PrintScreen" width="75%">

### Parâmetros para Solicitação e Resposta {#parameters-for-request-and-response-2}

<details>
<summary>Solicitação</summary>
<label for="table3" class="showMandatory"><input type="checkbox" id="table3" name="table3" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `SUBMIT_TRANSACTION`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean | | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| merchant | Objeto | | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| transaction | Objeto | | Este objeto contém os dados da transação. | Sim |
| transaction > order | Objeto | | Este objeto contém os dados da ordem. | Sim |
| transaction > order > accountId | Número | | Identificador da sua conta. | Sim |
| transaction > order > referenceCode | Alfanumérico | Mín:1 Máx:255 | Representa o identificador da ordem em seu sistema. | Sim |
| transaction > order > description | Alfanumérico | Mín:1 Máx:255 | Descrição da ordem. | Sim |
| transaction > order > language | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| transaction > order > notifyUrl | Alfanumérico | Máx:2048 | URL de confirmação da ordem. | Não |
| transaction > order > partnerId | Alfanumérico | Máx:255 | ID de parceiro no PayU. | Não |
| transaction > order > signature | Alfanumérico | Máx:255 | A assinatura associada ao formulário. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| transaction > order > shippingAddress | Objeto | | Endereço para envio. | Não |
| transaction > order > shippingAddress > street1 | Alfanumérico | Máx:100 | Endereço: Linha 1. | Não |
| transaction > order > shippingAddress > street2 | Alfanumérico | Máx:100 | Endereço: Linha 2. | Não |
| transaction > order > shippingAddress > city | Alfanumérico | Máx:50 | Endereço: cidade. | Não |
| transaction > order > shippingAddress > state | Alfanumérico | Máx:40 | Endereço: estado. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | Endereço: país. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Máx:8 | Endereço: Código postal. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. | Não |
| transaction > order > buyer | Objeto | | Informações do comprador. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Máx:255 | E-mail do comprador. | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do comprador. | Sim |
| transaction > order > buyer > shippingAddress | Alfanumérico | | Endereço de envio do comprador. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim | 
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País do endereço do comprador no formato ISO 3166 alpha-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Número | Máx:20 | Código postal do endereço do comprador. | Sim |
| transaction > order > buyer > shippingAddress > phone | Número | Máx:20 | Número de telefone do endereço do comprador. | Sim |
| transaction > order > additionalValues > | Objeto | 64 | Valor da ordem ou seus valores associados. | Sim |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Valor da transação. | Sim |
| transaction > order > additionalValues > TX_VALUE > value | Número | 12, 2 | Especifica o valor da transação. Este valor não pode incluir decimais. | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Valor do Imposto sobre o Valor Acrescentado (IVA - Impuesto al Valor Agregado). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Número | 12, 2 | Especifica o valor do IVA.<br>Se este parâmetro não for definido, PayU aplica o valor do imposto atual (19%).<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais  | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para cálculo do IVA.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais  | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Número | 12, 2 | Especifica o valor base da transação. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > payer | Objeto | | Informações do pagador. | Sim |
| transaction > payer > emailAddress | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| transaction > payer > merchantPayerId | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| transaction > payer > fullName | Alfanumérico | Máx:150 | Nome of the payer. | Sim |
| transaction > payer > billingAddress | Objeto | | Endereço de cobrança. | Sim |
| transaction > payer > billingAddress > street1 | Alfanumérico | Máx:100 | Endereço de cobrança linha 1. | Sim |
| transaction > payer > billingAddress > street2 | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Sim |
| transaction > payer > billingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Sim |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Sim |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| transaction > payer > birthdate | Alfanumérico | Máx:10 | Data de nascimento do pagador. | Não |
| transaction > payer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do pagador. | Sim |
| transaction > payer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do pagador. | Sim |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > type | Alfanumérico | 32 | Como os pagamentos em dinheiro e com referência bancária são feitos em escritórios físicos, la única transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Selecione um método de pagamento válido em dinheiro ou Referência bancária. [Veja os métodos de pagamento disponíveis na Colômbia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Definir `CO` para a Colômbia. | Sim |
| transaction > expirationDate | Alfanumérico | 23 | Data e hora máximas que o pagador tem para efetuar o pagamento. Formato `YYYY-MM-DDTHH:MM:SS`, por exemplo `2021-06-12T16:07:11.586`. | Não |
| transaction > ipAddress | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico | | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| transactionResponse | Objeto | | Os dados de resposta. |
| transactionResponse > orderId | Número | | O ID de ordem gerado ou existente no PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | O identificador da transação no PayU. |
| transactionResponse > state | Alfanumérico | Máx:32 | O status da transação. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Máx:255 | O código de resposta fornecido pela rede financeira. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Máx:255 | A mensagem de erro fornecida pela rede financeira. |
| transactionResponse > trazabilityCode | Alfanumérico | Máx:32 | O código de rastreamento fornecido pela rede financeira. |
| transactionResponse > authorizationCode | Alfanumérico | Máx:12 | O código de autorização fornecido pela rede financeira. |
| transactionResponse > pendingReason | Alfanumérico | Máx:21 | O código de resposta associado ao status, conforme mencionado em `transactionResponse > state`, a transação está aguardando o pagamento. |
| transactionResponse > responseCode | Alfanumérico | Máx:64 | O código de resposta associado ao status. Neste caso, para transações bem-sucedidas é `PENDING_TRANSACTION_CONFIRMATION`. |
| transactionResponse > responseMessage | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| transactionResponse > operationDate | Date | | Data de criação da resposta no sistema PayU. |
| transactionResponse > extraParameters | Objeto | | Parâmetros ou dados adicionais associados à resposta.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"REFERENCE": "74794"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>REFERENCE</string>`<br>&emsp;&emsp;`<int>74794</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo | Objeto | | Informações adicionais associadas à resposta. Este objeto segue a mesma estrutura que `transactionResponse.extraParameters`. |

</details>

#### Observações {#considerations-1}

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

### Chamada para a API {#api-call-2}

A seguir estão o corpo do pedido e da resposta deste meio de pagamento.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo de uma Solicitação:
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

Exemplo de uma Resposta:
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

Exemplo de uma Solicitação:
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

Exemplo de uma Resposta:
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

## Enviar Transações Usando Transferência Bancária (PSE) {#ubmit-transactions-using-bank-transfer-pse}

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

| ISO | Descrição |
|:-:|-|
| CC | Cartão de cidadania. |
| CE | Cartão de cidadão estrangeiro. |
| NIT | Número de identificação fiscal (empresas). |
| TI | Cartão de identidade. |
| PP | Passaporte. |
| RC | Certidão de nascimento. |
| DE | Documento de identificação de estrangeiro. |

6. Você deve enviar o número de identificação do pagador no parâmetro extra `PSE_REFERENCE3` do pedido.

### Parâmetros para Solicitação e Resposta {#parameters-for-request-and-response-3}

<details>
<summary>Solicitação</summary>
<label for="table4" class="showMandatory"><input type="checkbox" id="table4" name="table4" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `SUBMIT_TRANSACTION`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| merchant | Objeto | | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| transaction | Objeto | | Este objeto contém os dados da transação. | Sim |
| transaction > order | Objeto | | Este objeto contém os dados da ordem. | Sim |
| transaction > order > accountId | Número | | Identificador da sua conta. | Sim |
| transaction > order > referenceCode | Alfanumérico | Mín:1 Máx:255 | Representa o identificador da ordem em seu sistema. | Sim |
| transaction > order > description | Alfanumérico | Mín:1 Máx:255 | Descrição da ordem. | Sim |
| transaction > order > language | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| transaction > order > notifyUrl | Alfanumérico | Máx:2048 | URL de confirmação da ordem. | Não|
| transaction > order > partnerId | Alfanumérico | Máx:255 | ID de parceiro no PayU. | Não |
| transaction > order > signature | Alfanumérico | Máx:255 | A assinatura associada ao formulário. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| transaction > order > shippingAddress | Objeto | | Endereço para envio. | Não |
| transaction > order > shippingAddress > street1 | Alfanumérico | Máx:100 | Endereço: Linha 1. | Não |
| transaction > order > shippingAddress > street2 | Alfanumérico | Máx:100 | Endereço: Linha 2. | Não |
| transaction > order > shippingAddress > city | Alfanumérico | Máx:50 | Endereço: cidade. | Não |
| transaction > order > shippingAddress > state | Alfanumérico | Máx:40 | Endereço: estado. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | Endereço: país. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Máx:8 | Endereço: Código postal. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. | Não |
| transaction > order > buyer | Objeto | | Informações do comprador. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Máx:255 | E-mail do comprador. | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do comprador. | Sim |
| transaction > order > buyer > shippingAddress | Alfanumérico | | Endereço de envio do comprador. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País do endereço do comprador no formato ISO 3166 alpha-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Número | Máx:20 | Código postal do endereço do comprador. | Sim |
| transaction > order > buyer > shippingAddress > phone | Número | Máx:20 | Número de telefone do endereço do comprador. | Sim |
| transaction > order > additionalValues > | Objeto | 64 | Valor da ordem ou seus valores associados. | Sim |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Valor da transação. | Sim |
| transaction > order > additionalValues > TX_VALUE > value | Número | 12, 2 | Especifica o valor da transação. Este valor não pode incluir decimais. | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| transaction > payer | Objeto | | Informações do pagador. | Sim |
| transaction > payer > emailAddress | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| transaction > payer > merchantPayerId | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| transaction > payer > fullName | Alfanumérico | Máx:150 | Nome of the payer. | Sim |
| transaction > payer > billingAddress | Objeto | | Endereço de cobrança. | Sim |
| transaction > payer > billingAddress > street1 | Alfanumérico | Máx:100 | Endereço de cobrança linha 1. | Sim |
| transaction > payer > billingAddress > street2 | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Sim |
| transaction > payer > billingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Sim |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| transaction > payer > birthdate | Alfanumérico | Máx:10 | Data de nascimento do pagador. | Não |
| transaction > payer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do pagador. | Sim |
| transaction > payer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do pagador. | Sim |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sim |
| transaction > type | Alfanumérico | 32 | Como esses pagamentos são realizados no site PSE, la única transacción disponible es `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Selecione um método de pagamento válido em Transferência Bancária. [Veja os métodos de pagamento disponíveis na Colômbia]({{< ref "select-your-payment-method.html#colombia" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Definir `CO` para a Colômbia. | Sim |
| transaction > deviceSessionId | Alfanumérico | Máx:255 | Identificador da sessão do dispositivo onde o cliente faz a transação. Para obter mais informações, consulte [este tópico]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |
| transaction > cookie | Alfanumérico | Máx:255 | Cookie armazenado pelo dispositivo onde o cliente faz a transação. | Sim |
| transaction > userAgent | Alfanumérico | Máx:1024 | O agente do usuário do navegador onde o cliente faz a transação. | Sim |
| transaction > extraParameters | Objeto | | Parâmetros ou dados adicionais associados a pedido. <br>Para pagamentos por transferência bancária, esta é a página de resposta da sua loja.<br>Em JSON, o parâmetro _extraParameters_ é definido como: <br>`"extraParameters": {`<br>&emsp;`"PSE_REFERENCE3": "123456789"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ é definido como: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>PSE_REFERENCE3</string>`<br>&emsp;&emsp;`<string>123456789</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` | Não |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico | | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| transactionResponse | Objeto | | Os dados de resposta. |
| transactionResponse > orderId | Número | | O ID de ordem gerado ou existente no PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | O identificador da transação no PayU. |
| transactionResponse > state | Alfanumérico | Máx:32 | O status da transação. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Máx:255 | O código de resposta fornecido pela rede financeira. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Máx:255 | A mensagem de erro fornecida pela rede financeira. |
| transactionResponse > trazabilityCode | Alfanumérico | Máx:32 | O código de rastreamento fornecido pela rede financeira. |
| transactionResponse > authorizationCode | Alfanumérico | Máx:12 | O código de autorização fornecido pela rede financeira. |
| transactionResponse > pendingReason | Alfanumérico | Máx:21 | O código de resposta associado ao status, conforme mencionado em `transactionResponse > state`, a transação está aguardando o pagamento. |
| transactionResponse > responseCode | Alfanumérico | Máx:64 | O código de resposta associado ao status. Neste caso, para transações bem-sucedidas é `PENDING_TRANSACTION_CONFIRMATION`. |
| transactionResponse > responseMessage | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| transactionResponse > operationDate | Date | | Data de criação da resposta no sistema PayU. |
| transactionResponse > extraParameters | Objeto | | Parâmetros ou dados adicionais associados à resposta.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"BANK_URL": "xxxx"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_URL</string>`<br>&emsp;&emsp;`<string>xxxx</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

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
| 4 | 1 | Transação aprovada |
| 6 | 5 | Transação falhou |
| 6 | 4 | Transação rejeitada |
| 12 ou 14 | 9994 ou 25 | Transação pendente, verifique se o débito foi feito no banco. |

### Chamada para a API {#api-call-3}

A seguir estão o corpo do pedido e da resposta deste meio de pagamento.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo de uma Solicitação:
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

Exemplo de uma Resposta:
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

Exemplo de uma Solicitação:
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

Exemplo de uma Resposta:
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

## Lista de Bancos - PSE {#banks-list---pse}

Este método retorna uma lista dos bancos disponíveis para [pagamentos usando PSE]({{< ref "#submit-transactions-using-bank-transfer-pse" >}}). 

### Parâmetros para Solicitação e Resposta {#parameters-for-request-and-response-4}

<details>
<summary>Solicitação</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `GET_BANKS_LIST`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean | | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| merchant | Objeto | | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| bankListInformation | Objeto | | Este objeto contém as informações da consulta. | Sim |
| bankListInformation > paymentMethod | Alfanumérico | | Definir `PSE`. | Sim |
| bankListInformation > paymentCountry | Alfanumérico | | Definir `CO`. | Sim |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico | | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| banks | Objeto | | Lista dos bancos disponíveis no PSE. |
| banks > id | Numérico | | Identificador interno do banco. |
| banks > description | Alfanumérico | | Nome do banco a ser exibido na lista. |
| banks > pseCode | Alfanumérico | | Código para enviar no parâmetro extra `FINANCIAL_INSTITUTION_CODE` do pedido de pagamento. |

</details>

### Chamada para a API {#api-call-4}

A seguir estão os corpos do pedido e resposta deste método.

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo de uma Solicitação:
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

Exemplo de uma Resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "banks": [
        {
            "id": "34e6e912-a395-4d31-9599-9baa176c1a61",
            "description": "A continuación seleccione su banco",
            "pseCode": "0"
        },
        {
            "id": "033aec11-e068-4252-8043-237144be9233",
            "description": "BAN.CO",
            "pseCode": "1552"
        },
        {
            "id": "a720cb4c-6549-4932-83be-6d72b3eb0016",
            "description": "BANCAMIA",
            "pseCode": "1059"
        },
        {
            "id": "d9280852-47a5-4e99-94ac-3d7648ba79a3",
            "description": "BANCO AGRARIO",
            "pseCode": "1040"
        },
        {
            "id": "ff216e8a-28ba-4bf6-9935-b94dfdfd96a0",
            "description": "BANCO AGRARIO DESARROLLO",
            "pseCode": "1081"
        },
        {
            "id": "5073154e-efd4-4870-9315-abb926e87519",
            "description": "BANCO AGRARIO QA DEFECTOS",
            "pseCode": "1080"
        },
        {
            "id": "6e61a91d-58bf-46ec-aa09-1f44974dda7e",
            "description": "BANCO CAJA SOCIAL",
            "pseCode": "10322"
        },
        {
            "id": "e062711e-6bbd-4a13-819a-d60084f9c6fa",
            "description": "BANCO CAJA SOCIAL DESARROLLO",
            "pseCode": "1032"
        },
        {
            "id": "a9b5cc17-b0ae-4708-9835-586a0bef95df",
            "description": "BANCO COMERCIAL AVVILLAS S.A.",
            "pseCode": "1052"
        },
        {
            "id": "c5c97dfe-6101-453f-bcd4-691f4b329a3c",
            "description": "BANCO COOMEVA S.A. - BANCOOMEVA",
            "pseCode": "1061"
        },
        {
            "id": "7a2e8d04-e8c8-404b-8e49-d5d37c107a12",
            "description": "BANCO COOPERATIVO COOPCENTRAL",
            "pseCode": "1066"
        },
        {
            "id": "197fe0af-f658-4fe0-ad1b-952e174de549",
            "description": "BANCO CREDIFINANCIERA",
            "pseCode": "1058"
        },
        {
            "id": "b1de44f1-cede-4aca-9d3f-3313d5cc0c63",
            "description": "BANCO DAVIVIENDA",
            "pseCode": "1051"
        },
        {
            "id": "7a10219e-04a7-4c31-b747-54ded27c7f07",
            "description": "BANCO DAVIVIENDA Desarrollo",
            "pseCode": "10512"
        },
        {
            "id": "ed06f40e-a1b9-4e48-8851-bffb4cda0480",
            "description": "BANCO DE BOGOTA",
            "pseCode": "1039"
        },
        {
            "id": "4592a13b-6334-4fba-8402-9d006b599fa8",
            "description": "BANCO DE BOGOTA DESARROLLO 2013",
            "pseCode": "1001"
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
            "id": "a5a4b740-1644-4627-ae2a-41b13ffc7c5e",
            "description": "BANCO PRODUCTOS POR SEPARADO",
            "pseCode": "1203"
        },
        {
            "id": "47e747ef-c817-4be6-9eff-b6b16f50d001",
            "description": "Banco PSE",
            "pseCode": "1101"
        },
        {
            "id": "589939d7-06d1-4933-a101-8bb29b801d76",
            "description": "BANCO SANTANDER COLOMBIA",
            "pseCode": "1065"
        },
        {
            "id": "fcdaa98e-99ce-4e76-a504-1e053a05e773",
            "description": "BANCO SERFINANZA",
            "pseCode": "1069"
        },
        {
            "id": "201608c6-81de-436f-967a-2ec7c212c100",
            "description": "BANCO TEQUENDAMA",
            "pseCode": "1035"
        },
        {
            "id": "a8f33ba3-0053-464a-afbe-9add7c63fbc3",
            "description": "Banco union Colombia Credito",
            "pseCode": "1004"
        },
        {
            "id": "5dfa1b2c-64bd-4e8c-9fad-585337cfd4ff",
            "description": "BANCO UNION COLOMBIANO",
            "pseCode": "1022"
        },
        {
            "id": "56e306ef-6011-4f41-9640-b98449d6a6be",
            "description": "BANCO UNION COLOMBIANO FD2",
            "pseCode": "1005"
        },
        {
            "id": "bc883c0d-3610-4a88-96ca-2e2baa1dd2e5",
            "description": "Banco Web Service ACH",
            "pseCode": "1055"
        },
        {
            "id": "4e97e580-fc92-47ea-af4f-7b3b3ddffff8",
            "description": "Banco Web Service ACH WSE 3.0",
            "pseCode": "1055"
        },
        {
            "id": "931f6bfb-283e-4721-bb86-4a7484bfd28e",
            "description": "BANCOLOMBIA DATAPOWER",
            "pseCode": "10072"
        },
        {
            "id": "1285de9c-8d47-49f7-b00a-e87882e2a3f9",
            "description": "BANCOLOMBIA DESARROLLO",
            "pseCode": "10071"
        },
        {
            "id": "451f0e5f-5db4-4f55-a1fc-b38e06526e04",
            "description": "BANCOLOMBIA QA",
            "pseCode": "1007"
        },
        {
            "id": "448e00ec-c479-497d-9a35-0dfbbf462f72",
            "description": "BANKA",
            "pseCode": "1077"
        },
        {
            "id": "5f3a7adb-b283-4ca3-bee9-741f1306a03d",
            "description": "BBVA COLOMBIA S.A.",
            "pseCode": "1013"
        },
        {
            "id": "cd4286fa-850a-4b34-96d1-f71d6a79f44a",
            "description": "BBVA DESARROLLO",
            "pseCode": "1513"
        },
        {
            "id": "10e9b7b6-7a5f-4d5b-8d7f-4b2020f43f93",
            "description": "CITIBANK COLOMBIA S.A.",
            "pseCode": "1009"
        },
        {
            "id": "77f0988f-cf45-4931-bbcd-984e07e0fc51",
            "description": "COLTEFINANCIERA",
            "pseCode": "1370"
        },
        {
            "id": "48c81f6a-e0f1-4c1d-ab9b-9915726e3596",
            "description": "CONFIAR COOPERATIVA FINANCIERA",
            "pseCode": "1292"
        },
        {
            "id": "8694df26-5ccd-45c0-b5b7-2b995c47f81a",
            "description": "COOPERATIVA FINANCIERA COTRAFA",
            "pseCode": "1289"
        },
        {
            "id": "1c222feb-2b58-408c-a495-ade06b6825c0",
            "description": "COOPERATIVA FINANCIERA DE ANTIOQUIA",
            "pseCode": "1283"
        },
        {
            "id": "70a18a09-38f2-4f62-aba6-9ad28c30c966",
            "description": "CREDIFIANCIERA",
            "pseCode": "1558"
        },
        {
            "id": "3f8b3126-8aa3-4438-8a6c-1d544184f2d7",
            "description": "DALE",
            "pseCode": "1097"
        },
        {
            "id": "a953078b-5e22-42ea-9301-954558e8f463",
            "description": "DAVIPLATA",
            "pseCode": "1551"
        },
        {
            "id": "2ad780ba-a1e8-4cb9-9150-670429aae092",
            "description": "GIROS Y FINANZAS COMPAÑIA DE FINANCIAMIENTO S.A",
            "pseCode": "1303"
        },
        {
            "id": "c0bfb716-a098-40f6-84b5-1972a4846506",
            "description": "IRIS",
            "pseCode": "1637"
        },
        {
            "id": "7e1efd88-4f88-4e21-a972-28b526b27da5",
            "description": "ITAU",
            "pseCode": "1006"
        },
        {
            "id": "26c9a2df-6b4f-4309-9137-3692d9bb9f82",
            "description": "MOVII S.A",
            "pseCode": "1801"
        },
        {
            "id": "d9b48a70-6068-4116-a345-154381e5d953",
            "description": "NEQUI CERTIFICACION",
            "pseCode": "1508"
        },
        {
            "id": "60199dc5-7d38-49c6-92a5-b839dc0087d2",
            "description": "prueba restriccion",
            "pseCode": "9988"
        },
        {
            "id": "be467299-d90a-407e-86d3-01e30ade1e06",
            "description": "Prueba Steve",
            "pseCode": "121212"
        },
        {
            "id": "201acc05-4c4f-49dc-9be6-3261a6ce4a3c",
            "description": "RAPPIPAY",
            "pseCode": "1151"
        },
        {
            "id": "7602e001-6199-48bc-9ee3-466f8eb2e422",
            "description": "SCOTIABANK COLPATRIA DESARROLLO",
            "pseCode": "1019"
        },
        {
            "id": "9bb638a0-4c3f-41d2-8811-f8cdd29b0db2",
            "description": "SCOTIABANK COLPATRIA UAT",
            "pseCode": "1078"
        },
        {
            "id": "086547b5-313b-42c7-acef-93d0f76b1dd5",
            "description": "SEIVY – GM FINANCIAL",
            "pseCode": "1305"
        }
    ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo de uma Solicitação:
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

Exemplo de uma Resposta:
```XML
<bankListResponse>
    <code>SUCCESS</code>
    <banks>
        <bank>
            <id>34e6e912-a395-4d31-9599-9baa176c1a61</id>
            <description>A continuación seleccione su banco</description>
            <pseCode>0</pseCode>
        </bank>
        <bank>
            <id>033aec11-e068-4252-8043-237144be9233</id>
            <description>BAN.CO</description>
            <pseCode>1552</pseCode>
        </bank>
        <bank>
            <id>a720cb4c-6549-4932-83be-6d72b3eb0016</id>
            <description>BANCAMIA</description>
            <pseCode>1059</pseCode>
        </bank>
        <bank>
            <id>d9280852-47a5-4e99-94ac-3d7648ba79a3</id>
            <description>BANCO AGRARIO</description>
            <pseCode>1040</pseCode>
        </bank>
        <bank>
            <id>ff216e8a-28ba-4bf6-9935-b94dfdfd96a0</id>
            <description>BANCO AGRARIO DESARROLLO</description>
            <pseCode>1081</pseCode>
        </bank>
        <bank>
            <id>5073154e-efd4-4870-9315-abb926e87519</id>
            <description>BANCO AGRARIO QA DEFECTOS</description>
            <pseCode>1080</pseCode>
        </bank>
        <bank>
            <id>6e61a91d-58bf-46ec-aa09-1f44974dda7e</id>
            <description>BANCO CAJA SOCIAL</description>
            <pseCode>10322</pseCode>
        </bank>
        <bank>
            <id>e062711e-6bbd-4a13-819a-d60084f9c6fa</id>
            <description>BANCO CAJA SOCIAL DESARROLLO</description>
            <pseCode>1032</pseCode>
        </bank>
        <bank>
            <id>a9b5cc17-b0ae-4708-9835-586a0bef95df</id>
            <description>BANCO COMERCIAL AVVILLAS S.A.</description>
            <pseCode>1052</pseCode>
        </bank>
        <bank>
            <id>c5c97dfe-6101-453f-bcd4-691f4b329a3c</id>
            <description>BANCO COOMEVA S.A. - BANCOOMEVA</description>
            <pseCode>1061</pseCode>
        </bank>
        <bank>
            <id>7a2e8d04-e8c8-404b-8e49-d5d37c107a12</id>
            <description>BANCO COOPERATIVO COOPCENTRAL</description>
            <pseCode>1066</pseCode>
        </bank>
        <bank>
            <id>197fe0af-f658-4fe0-ad1b-952e174de549</id>
            <description>BANCO CREDIFINANCIERA</description>
            <pseCode>1058</pseCode>
        </bank>
        <bank>
            <id>b1de44f1-cede-4aca-9d3f-3313d5cc0c63</id>
            <description>BANCO DAVIVIENDA</description>
            <pseCode>1051</pseCode>
        </bank>
        <bank>
            <id>7a10219e-04a7-4c31-b747-54ded27c7f07</id>
            <description>BANCO DAVIVIENDA Desarrollo</description>
            <pseCode>10512</pseCode>
        </bank>
        <bank>
            <id>ed06f40e-a1b9-4e48-8851-bffb4cda0480</id>
            <description>BANCO DE BOGOTA</description>
            <pseCode>1039</pseCode>
        </bank>
        <bank>
            <id>4592a13b-6334-4fba-8402-9d006b599fa8</id>
            <description>BANCO DE BOGOTA DESARROLLO 2013</description>
            <pseCode>1001</pseCode>
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
            <id>a5a4b740-1644-4627-ae2a-41b13ffc7c5e</id>
            <description>BANCO PRODUCTOS POR SEPARADO</description>
            <pseCode>1203</pseCode>
        </bank>
        <bank>
            <id>47e747ef-c817-4be6-9eff-b6b16f50d001</id>
            <description>Banco PSE</description>
            <pseCode>1101</pseCode>
        </bank>
        <bank>
            <id>589939d7-06d1-4933-a101-8bb29b801d76</id>
            <description>BANCO SANTANDER COLOMBIA</description>
            <pseCode>1065</pseCode>
        </bank>
        <bank>
            <id>fcdaa98e-99ce-4e76-a504-1e053a05e773</id>
            <description>BANCO SERFINANZA</description>
            <pseCode>1069</pseCode>
        </bank>
        <bank>
            <id>201608c6-81de-436f-967a-2ec7c212c100</id>
            <description>BANCO TEQUENDAMA</description>
            <pseCode>1035</pseCode>
        </bank>
        <bank>
            <id>a8f33ba3-0053-464a-afbe-9add7c63fbc3</id>
            <description>Banco union Colombia Credito</description>
            <pseCode>1004</pseCode>
        </bank>
        <bank>
            <id>5dfa1b2c-64bd-4e8c-9fad-585337cfd4ff</id>
            <description>BANCO UNION COLOMBIANO</description>
            <pseCode>1022</pseCode>
        </bank>
        <bank>
            <id>56e306ef-6011-4f41-9640-b98449d6a6be</id>
            <description>BANCO UNION COLOMBIANO FD2</description>
            <pseCode>1005</pseCode>
        </bank>
        <bank>
            <id>bc883c0d-3610-4a88-96ca-2e2baa1dd2e5</id>
            <description>Banco Web Service ACH</description>
            <pseCode>1055</pseCode>
        </bank>
        <bank>
            <id>4e97e580-fc92-47ea-af4f-7b3b3ddffff8</id>
            <description>Banco Web Service ACH WSE 3.0</description>
            <pseCode>1055</pseCode>
        </bank>
        <bank>
            <id>931f6bfb-283e-4721-bb86-4a7484bfd28e</id>
            <description>BANCOLOMBIA DATAPOWER</description>
            <pseCode>10072</pseCode>
        </bank>
        <bank>
            <id>1285de9c-8d47-49f7-b00a-e87882e2a3f9</id>
            <description>BANCOLOMBIA DESARROLLO</description>
            <pseCode>10071</pseCode>
        </bank>
        <bank>
            <id>451f0e5f-5db4-4f55-a1fc-b38e06526e04</id>
            <description>BANCOLOMBIA QA</description>
            <pseCode>1007</pseCode>
        </bank>
        <bank>
            <id>448e00ec-c479-497d-9a35-0dfbbf462f72</id>
            <description>BANKA</description>
            <pseCode>1077</pseCode>
        </bank>
        <bank>
            <id>5f3a7adb-b283-4ca3-bee9-741f1306a03d</id>
            <description>BBVA COLOMBIA S.A.</description>
            <pseCode>1013</pseCode>
        </bank>
        <bank>
            <id>cd4286fa-850a-4b34-96d1-f71d6a79f44a</id>
            <description>BBVA DESARROLLO</description>
            <pseCode>1513</pseCode>
        </bank>
        <bank>
            <id>10e9b7b6-7a5f-4d5b-8d7f-4b2020f43f93</id>
            <description>CITIBANK COLOMBIA S.A.</description>
            <pseCode>1009</pseCode>
        </bank>
        <bank>
            <id>77f0988f-cf45-4931-bbcd-984e07e0fc51</id>
            <description>COLTEFINANCIERA</description>
            <pseCode>1370</pseCode>
        </bank>
        <bank>
            <id>48c81f6a-e0f1-4c1d-ab9b-9915726e3596</id>
            <description>CONFIAR COOPERATIVA FINANCIERA</description>
            <pseCode>1292</pseCode>
        </bank>
        <bank>
            <id>8694df26-5ccd-45c0-b5b7-2b995c47f81a</id>
            <description>COOPERATIVA FINANCIERA COTRAFA</description>
            <pseCode>1289</pseCode>
        </bank>
        <bank>
            <id>1c222feb-2b58-408c-a495-ade06b6825c0</id>
            <description>COOPERATIVA FINANCIERA DE ANTIOQUIA</description>
            <pseCode>1283</pseCode>
        </bank>
        <bank>
            <id>70a18a09-38f2-4f62-aba6-9ad28c30c966</id>
            <description>CREDIFIANCIERA</description>
            <pseCode>1558</pseCode>
        </bank>
        <bank>
            <id>3f8b3126-8aa3-4438-8a6c-1d544184f2d7</id>
            <description>DALE</description>
            <pseCode>1097</pseCode>
        </bank>
        <bank>
            <id>a953078b-5e22-42ea-9301-954558e8f463</id>
            <description>DAVIPLATA</description>
            <pseCode>1551</pseCode>
        </bank>
        <bank>
            <id>2ad780ba-a1e8-4cb9-9150-670429aae092</id>
            <description>GIROS Y FINANZAS COMPAÑIA DE FINANCIAMIENTO S.A</description>
            <pseCode>1303</pseCode>
        </bank>
        <bank>
            <id>c0bfb716-a098-40f6-84b5-1972a4846506</id>
            <description>IRIS</description>
            <pseCode>1637</pseCode>
        </bank>
        <bank>
            <id>7e1efd88-4f88-4e21-a972-28b526b27da5</id>
            <description>ITAU</description>
            <pseCode>1006</pseCode>
        </bank>
        <bank>
            <id>26c9a2df-6b4f-4309-9137-3692d9bb9f82</id>
            <description>MOVII S.A</description>
            <pseCode>1801</pseCode>
        </bank>
        <bank>
            <id>d9b48a70-6068-4116-a345-154381e5d953</id>
            <description>NEQUI CERTIFICACION</description>
            <pseCode>1508</pseCode>
        </bank>
        <bank>
            <id>60199dc5-7d38-49c6-92a5-b839dc0087d2</id>
            <description>prueba restriccion</description>
            <pseCode>9988</pseCode>
        </bank>
        <bank>
            <id>be467299-d90a-407e-86d3-01e30ade1e06</id>
            <description>Prueba Steve</description>
            <pseCode>121212</pseCode>
        </bank>
        <bank>
            <id>201acc05-4c4f-49dc-9be6-3261a6ce4a3c</id>
            <description>RAPPIPAY</description>
            <pseCode>1151</pseCode>
        </bank>
        <bank>
            <id>7602e001-6199-48bc-9ee3-466f8eb2e422</id>
            <description>SCOTIABANK COLPATRIA DESARROLLO</description>
            <pseCode>1019</pseCode>
        </bank>
        <bank>
            <id>9bb638a0-4c3f-41d2-8811-f8cdd29b0db2</id>
            <description>SCOTIABANK COLPATRIA UAT</description>
            <pseCode>1078</pseCode>
        </bank>
        <bank>
            <id>086547b5-313b-42c7-acef-93d0f76b1dd5</id>
            <description>SEIVY – GM FINANCIAL</description>
            <pseCode>1305</pseCode>
        </bank>
    </banks>
</bankListResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Consulta de Métodos de Pagamento Disponíveis {#available-payment-methods-query}

Este método gera uma lista dos métodos de pagamento disponíveis em todos os países.

### Parâmetros para Solicitação e Resposta {#parameters-for-request-and-response-5}

<details>
<summary>Solicitação</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `GET_PAYMENT_METHODS`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean | | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| merchant | Objeto | | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico | | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| paymentMethods | Objeto | | Lista dos métodos de pagamento. |
| paymentMethods > paymentMethodComplete | Objeto | | Este objeto contém as informações de um método de pagamento. |
| paymentMethods > paymentMethodComplete > id | Numérico | | Identificador do método de pagamento. |
| paymentMethods > paymentMethodComplete > description | Alfanumérico | Máx:32 | Nome do método de pagamento. |
| paymentMethods > paymentMethodComplete > country | Alfanumérico | 2 | Código ISO do país do método de pagamento. |

</details>

### Chamada para a API {#api-call-5}

A seguir estão os corpos do pedido e resposta deste método. Para fins de exemplo, a solicitação e a resposta aqui mostram dois métodos de pagamento. 

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo de uma Solicitação:
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

Exemplo de uma Resposta:
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

Exemplo de uma Solicitação:
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

Exemplo de uma Resposta:
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

### Parâmetros para Solicitação e Resposta {#parameters-for-request-and-response-6}

<details>
<summary>Solicitação</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `PING`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| merchant | Objeto | | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico | | O código de resposta da transação. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada, caso tenha ocorrido um erro. |
| transactionResponse | transactionResponse | Máx:2048 | A resposta do método PING caso tenha ocorrido um erro. |
</details>

### Chamada para a API {#api-call-6}

A seguir estão os corpos do pedido e resposta deste método.

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo de uma Solicitação:
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

Exemplo de uma Resposta:
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

Exemplo de uma Solicitação:
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

Exemplo de uma Resposta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}
