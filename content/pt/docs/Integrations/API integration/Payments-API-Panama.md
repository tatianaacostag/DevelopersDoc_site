---
title: "API de pagamentos - Panamá"
linkTitle: "API de pagamentos - Panamá"
date: 2021-05-03T15:48:08-05:00
description: >
   A API de Pagamentos para o Panamá permite que você integre de forma eficiente as capacidades de processamento de pagamentos da PayU com cartões de crédito na sua plataforma de compras online.
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

## Funcionalidades Disponíveis {#available-features}

A API de Pagamentos inclui as seguintes funcionalidades:

* [Enviar Transações Usando Cartões de Crédito]({{< ref "#submit-transactions-using-credit-cards" >}})
* [Incluir Informações do Registro de Nome de Passageiro]({{< ref "#include-passenger-name-record-information-optional" >}})
* [Consulta de Métodos de Pagamento Disponíveis]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Observação" color="info"%}}

Para confirmar o status de uma transação, você pode usar:
* Navegue até a URL definida na variável `transaction.notifyUrl` ou na opção _**URL de confirmação**_ localizada no Módulo PayU em _**Configuração**_ > _**Configuração técnica**_.
* Use o [API ou SDK de Consultas]({{< ref "Queries.md" >}}).

{{% /alert %}}

## Enviar Transações Usando Cartões de Crédito {#submit-transactions-using-credit-cards}

Este método permite processar os pagamentos efetuados com cartão de crédito pelos seus clientes. Para o Panamá, você pode fazer fluxos de uma etapa (**Cobrança**). Para obter mais informações, consulte [Fluxos de pagamento]({{< ref "payments.md#payment-flows" >}}).

### Parâmetros para Solicitação e Resposta {#parameters-for-request-and-response}

<details>
<summary>Solicitação</summary>
<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `SUBMIT_TRANSACTION`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| merchant | Objeto |  | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| transaction | Objeto |  | Este objeto contém os dados da transação. | Sim |
| transaction > order | Objeto |  | Este objeto contém os dados da ordem. | Sim |
| transaction > order > accountId | Número |  | Identificador da sua conta. | Sim |
| transaction > order > referenceCode | Alfanumérico | Mín:1 Máx:255 | Representa o identificador da ordem em seu sistema. | Sim |
| transaction > order > description | Alfanumérico | Mín:1 Máx:255 | Descrição da ordem. | Sim |
| transaction > order > language | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| transaction > order > notifyUrl | Alfanumérico | Máx:2048 | URL de confirmação da ordem. | Não |
| transaction > order > partnerId | Alfanumérico | Máx:255 | ID de parceiro no PayU. | Não |
| transaction > order > signature | Alfanumérico | Máx:255 | A assinatura associada ao formulário. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| transaction > order > shippingAddress | Objeto |  | Endereço para envio. | Não |
| transaction > order > shippingAddress > street1 | Alfanumérico | Máx:100 | Endereço: Linha 1. | Não |
| transaction > order > shippingAddress > street2 | Alfanumérico | Máx:100 | Endereço: Linha 2. | Não |
| transaction > order > shippingAddress > city | Alfanumérico | Máx:50 | Endereço: cidade. | Não |
| transaction > order > shippingAddress > state | Alfanumérico | Máx:40 | Endereço: estado. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | Endereço: país. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Máx:8 | Endereço: Código postal. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. | Não |
| transaction > order > buyer | Objeto |  | Informações do comprador. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Máx:255 | E-mail do comprador. | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do comprador. | Sim |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Endereço de envio do comprador. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País do endereço do comprador no formato ISO 3166 alpha-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Número | Máx:20 | Código postal do endereço do comprador. | Sim |
| transaction > order > buyer > shippingAddress > phone | Número | Máx:20 | Número de telefone do endereço do comprador. | Sim |
| transaction > order > additionalValues > | Objeto | 64 | Valor da ordem ou seus valores associados. | Sim |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Valor da transação. | Sim |
| transaction > order > additionalValues > TX_VALUE > value | Número | 12, 2 | Especifica o valor da transação, este valor pode ter duas casas decimais (por exemplo 10000.00 ou 10000). | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Total do Imposto sobre Valor Agregado (IVA). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Número | 12, 2 | Especifica o valor do IVA.  | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para cálculo do VAT.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais.  | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Número | 12, 2 | Especifica o valor base da transação. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > creditCardTokenId | Alfanumérico |  | Incluir este parâmetro quando a transação for feita com um cartão tokenizado, no lugar das informações do cartão de crédito. Para obter mais informações, consulte [API de tokenização]({{< ref "Tokenization-API.md" >}}) | Sim |
| transaction > creditCard | Objeto |  | Informações do cartão de crédito. Este objeto e seus parâmetros são obrigatórios quando o pagamento é realizado com cartão de crédito não tokenizado. | Não |
| transaction > creditCard > number | Alfanumérico | Mín:13 Máx:20 | Número do cartão de crédito. | Não |
| transaction > creditCard > securityCode | Alfanumérico | Mín:1 Máx:4 | Código de segurança do cartão de crédito (CVC2, CVV2, CID). | Não |
| transaction > creditCard > expirationDate | Alfanumérico | 7 | Data de validade do cartão de crédito. Formato `YYYY/MM`. | Não |
| transaction > creditCard > name | Alfanumérico | Mín:1 Máx:255 | Nome do titular exibido no cartão de crédito. | Não |
| transaction > creditCard > processWithoutCvv2 | Boolean | Máx:255 | Permite processar transações sem incluir o código de segurança do cartão de crédito. Sua loja precisa da autorização do PayU antes de usar este recurso. | Não |
| transaction > payer | Objeto |  | Informações do pagador. | Sim |
| transaction > payer > emailAddress | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| transaction > payer > merchantPayerId | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| transaction > payer > fullName | Alfanumérico | Máx:150 | Nome do pagador, que deve corresponder ao nome enviado no parâmetro `transaction.creditCard.name`. | Sim |
| transaction > payer > billingAddress | Objeto |  | Endereço de cobrança. | Sim |
| transaction > payer > billingAddress > street1 | Alfanumérico | Máx:100 | Endereço de cobrança linha 1. | Sim |
| transaction > payer > billingAddress > street2 | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Sim |
| transaction > payer > billingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Sim |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| transaction > payer > birthdate | Alfanumérico | Máx:10 |  Data de nascimento do pagador. | Não |
| transaction > payer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do pagador. | Sim |
| transaction > payer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do pagador. | Sim |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sim |
| transaction > type | Alfanumérico | 32 | Defina este valor de acordo com a transação. Para o Panamá, definir `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Selecione um método de pagamento com cartão de crédito válido. [Veja os métodos de pagamento disponíveis o Panamá]({{< ref "select-your-payment-method.html#panama" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Definir `PA` para o Panamá. | Sim |
| transaction > deviceSessionId | Alfanumérico | Máx:255 | Identificador da sessão do dispositivo onde o cliente faz a transação. Para obter mais informações, consulte [este tópico]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |
| transaction > cookie | Alfanumérico | Máx:255 | Cookie armazenado pelo dispositivo onde o cliente faz a transação. | Sim |
| transaction > userAgent | Alfanumérico | Máx:1024 | O agente do usuário do navegador onde o cliente faz a transação. | Sim |
| transaction > extraParameters | Objeto |  | Parâmetros ou dados adicionais associados a pedido. O tamanho máximo de cada nome _extraParameters_ é de 64 caracteres.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | Não |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| transactionResponse | Objeto |  | Os dados de resposta. |
| transactionResponse > orderId | Número |  | O ID de ordem gerado ou existente no PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | O identificador da transação no PayU. |
| transactionResponse > state | Alfanumérico | Máx:32 | O status da transação. |
| transactionResponse > responseCode | Alfanumérico | Máx:64 | O código de resposta associado ao status. |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Máx:255 | O código de resposta fornecido pela rede financeira. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Máx:255 | A mensagem de erro fornecida pela rede financeira. |
| transactionResponse > trazabilityCode | Alfanumérico | Máx:32 | O código de rastreamento fornecido pela rede financeira. |
| transactionResponse > authorizationCode | Alfanumérico | Máx:12 | O código de autorização fornecido pela rede financeira. |
| transactionResponse > responseMessage | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| transactionResponse > operationDate | Date |  | Data de criação da resposta no sistema PayU. |
| transactionResponse > extraParameters | Objeto |  | Parâmetros ou dados adicionais associados à resposta. <br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo | Objeto | | Informações adicionais associadas à resposta. Este objeto segue a mesma estrutura que `transactionResponse.extraParameters`. |
| transactionResponse > additionalInfo > rejectionType | Alfanumérico | Máx: 4 | Indica a categoria da recusa. Valores possíveis: `SOFT` ou `HARD`. Para mais informações, consulte [Considerações]({{< ref "Payments-API-Panama.md#considerations" >}}). |

</details>

#### Observações {#considerations}

* **Tratamento de Recusas (`rejectionType`):** Este recurso aplica-se apenas a transações de `AUTHORIZATION` e `AUTHORIZATION_AND_CAPTURE`. Quando uma transação é recusada, o campo `additionalInfo.rejectionType` ajuda a determinar a estratégia de reativação (reentrada):
    * **HARD**: Indica uma recusa permanente. De acordo com as regulamentações das bandeiras, **o lojista não deve tentar a transação novamente** usando os mesmos dados do cartão. Reclamações frequentes de recusas "Hard" podem resultar em penalidades ou multas das redes financeiras.
    * **SOFT**: Indica um problema temporário (ex: saldo insuficiente). A transação pode ser tentada novamente em um momento posterior.
* Para pagamentos com tokens de cartão de crédito, inclua os parâmetros `transaction.creditCardTokenId` e `transaction.creditCard.securityCode` (se processar com código de segurança) substituindo as informações do cartão de crédito. Para obter mais informações, consulte [API de tokenização]({{< ref "Tokenization-API.md" >}}).
* Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas. Depois que esse recurso for habilitado para você, envie no pedido a variável `creditCard.processWithoutCvv2` como true e remova a variável `creditCard.securityCode`.

### Chamada de API {#api-call}

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
         "accountId": "512326",
         "referenceCode": "PRODUCT_TEST_2021-06-21T21:28:14.962Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "782997f7981288b6ea411709188ff926",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 100,
               "currency": "USD"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Via Jose A. Arango, Juan Diaz",
               "street2": "5555487",
               "city": "Panamá",
               "state": "Panamá",
               "country": "PA",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Via Jose A. Arango, Juan Diaz",
            "street2": "5555487",
            "city": "Panamá",
            "state": "Panamá",
            "country": "PA",
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
            "street1": "Via Jose A. Arango, Juan Diaz",
            "street2": "125544",
            "city": "Panamá",
            "state": "Panamá",
            "country": "PA",
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
      "paymentCountry": "PA",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
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
        "orderId": 857804178,
        "transactionId": "299f50c4-d7d9-4f24-a4fc-1454ff26d5c4",
        "state": "APPROVED",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "00000000",
        "authorizationCode": "00000000",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624311390098,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "PAYMENT_WAY_ID": "4"
        },
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
         <accountId>512326</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-21T21:28:14.962Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>782997f7981288b6ea411709188ff926</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>100</value>
                  <currency>USD</currency>
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
               <street1>Via Jose A. Arango, Juan Diaz</street1>
               <street2>5555487</street2>
               <city>Panamá</city>
               <state>Panamá</state>
               <country>PA</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Via Jose A. Arango, Juan Diaz</street1>
            <street2>5555487</street2>
            <city>Panamá</city>
            <state>Panamá</state>
            <country>PA</country>
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
            <street1>Via Jose A. Arango, Juan Diaz</street1>
            <street2>5555487</street2>
            <city>Panamá</city>
            <state>Panamá</state>
            <country>PA</country>
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
      <paymentCountry>PA</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>true</isTest>
</request>
```
<br>

Exemplo de uma Resposta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>857804176</orderId>
        <transactionId>69de6de1-9e18-45ae-8429-866bb3b47822</transactionId>
        <state>APPROVED</state>
        <trazabilityCode>00000000</trazabilityCode>
        <authorizationCode>00000000</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <operationDate>2021-06-21T16:35:06</operationDate>
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
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Incluir Informações do Registro de Nome de Passageiro (Opcional) {#include-passenger-name-record-information-optional}

Além dos detalhes de transação fornecidos anteriormente, a API permite a inclusão opcional de dados do Registro de Nome de Passageiro (PNR). Embora seja particularmente valioso para companhias aéreas e agências de viagens, este recurso estende sua utilidade a qualquer lojista que utilize os serviços da PayU em países da América Latina, mesmo quando não estiver processando diretamente pagamentos de voos. O principal benefício dos dados PNR é aprimorar significativamente a análise de risco de transações por meio das ferramentas antifraude da PayU, proporcionando uma visão mais abrangente da transação, além dos detalhes de pagamento.

Os parâmetros a seguir se referem aos dados PNR e são opcionais. Eles estão disponíveis em todos os países da América Latina onde a PayU opera. Esses campos não são suficientes por si só para completar uma solicitação de transação, mas são complementares para casos de uso específicos onde o conhecimento dos detalhes sobre o passageiro e seu itinerário de viagem pode auxiliar na detecção de fraudes.

<details>
<summary>Solicitação</summary>
<br>
<div class="variables"></div>

| **Campo** | **Tipo** | **Tamanho** | **Descrição** | **Exemplo** |
|-|-|-|-|-|
| transaction > pnr > id | alfanumérico | 32 | ID do Registro de Nome de Passageiro. | `PNR123456` |
| transaction > pnr > reservationAgent > id | alfanumérico | 32 | ID do agente de reserva. | `AGENT123` |
| transaction > pnr > reservationAgent > firstName | alfanumérico | 255 | Primeiro nome(s) do agente de reserva. | `John` |
| transaction > pnr > reservationAgent > lastName | alfanumérico | 255 | Sobrenome(s) do agente de reserva. | `Doe` |
| transaction > pnr > reservationAgent > email | alfanumérico | 255 | Endereço de e-mail do agente de reserva. | `agent@example.com` |
| transaction > pnr > reservationAgent > officePhoneNumber | alfanumérico | 50 | Número de telefone de escritório do agente de reserva. | `+573001234567` |
| transaction > pnr > reservationOffice > id | alfanumérico | 9 | ID do escritório de reservas. | `OFFICE123` |
| transaction > pnr > reservationOffice > country | alfanumérico | 2 | País do escritório de reservas (código ISO). | `CO` |
| transaction > pnr > saleOffice > id | alfanumérico | 9 | ID do escritório de vendas. | `SALEOFF123` |
| transaction > pnr > saleOffice > country | alfanumérico | 2 | País do escritório de vendas (código ISO). | `US` |
| transaction > pnr > passengers[] > id | alfanumérico | 32 | ID do passageiro. | `PASS12345` |
| transaction > pnr > passengers[] > country | alfanumérico | 2 | País do passageiro (código ISO). | `AR` |
| transaction > pnr > passengers[] > level | alfanumérico | 32 | Nível do passageiro. | `GOLD` |
| transaction > pnr > passengers[] > firstName | alfanumérico | 255 | Primeiro nome(s) do passageiro. | `Maria` |
| transaction > pnr > passengers[] > lastName | alfanumérico | 255 | Sobrenome(s) do passageiro. | `Gonzalez` |
| transaction > pnr > passengers[] > documentType | numérico | 2 | Tipo de documento. Os valores possíveis são:<br>`0` = Não especificado<br>`1` = Cédula de cidadania (Cédula de ciudadanía)<br>`2` = Cédula de estrangeiro (Cédula de extranjería)<br>`3` = Número de identificação tributária (Número de identificación tributaria)<br>`4` = Carteira de identidade (Tarjeta de identidad)<br>`5` = Passaporte (Pasaporte)<br>`6` = Número de seguridade social (Tarjeta de seguridad social)<br>`7` = Número de identificação estrangeiro (Sociedad extranjera sin NIT)<br>`8` = Conta escrow (Fideicomiso)<br>`9` = Certidão de nascimento (Registro civil)<br>`10` = Carteira diplomática (Carnet diplomático) | `5` |
| transaction > pnr > passengers[] > documentNumber | alfanumérico | 50 | Número do documento do passageiro. | `P12345678` |
| transaction > pnr > passengers[] > email | alfanumérico | 255 | Endereço de e-mail do passageiro. | `passenger@example.com` |
| transaction > pnr > passengers[] > officePhoneNumber | alfanumérico | 50 | Número de telefone de escritório do passageiro. | `+573008765432` |
| transaction > pnr > passengers[] > homePhoneNumber | alfanumérico | 50 | Número de telefone residencial do passageiro. | `+573002345678` |
| transaction > pnr > passengers[] > mobilePhoneNumber | alfanumérico | 50 | Número de telefone celular do passageiro. | `+573001234567` |
| transaction > pnr > passengers[] > address > country | alfanumérico | 2 | País do endereço do passageiro (código ISO). | `BR` |
| transaction > pnr > passengers[] > address > city | alfanumérico | 65 | Cidade do endereço do passageiro. | `São Paulo` |
| transaction > pnr > passengers[] > address > street | alfanumérico | 255 | Endereço da rua do passageiro. | `Rua das Flores, 123` |
| transaction > pnr > itinerary[] > departureDate | alfanumérico | 19 | Data de partida no formato UTC. | `2022-01-01T23:59:59` |
| transaction > pnr > itinerary[] > arrivalDate | alfanumérico | 19 | Data de chegada no formato UTC. | `2022-01-02T23:59:59` |
| transaction > pnr > itinerary[] > flightNumber | alfanumérico | 12 | Número do voo. | `FL1234` |
| transaction > pnr > itinerary[] > origin | alfanumérico | 8 | Origem. | `BOG` |
| transaction > pnr > itinerary[] > destination | alfanumérico | 8 | Destino. | `MIA` |
| transaction > pnr > itinerary[] > travelClass | alfanumérico | 2 | Classe do segmento de reserva. | `Y` |
| transaction > pnr > itinerary[] > ticketType | alfanumérico | 50 | Tipo de bilhete. | `E-TICKET` |

</details>

{{% alert title="Nota" color="info"%}}

Ao usar o formato XML, os parâmetros do itinerário aparecem sob `transaction > pnr > itinerary > segment` com a mesma estrutura, mas ajustados quanto à hierarquia.

{{% /alert %}}

#### Chamada da API {#api-call-9}

A seguir, exemplos da solicitação deste método.

{{< tabs tabTotal="2" tabID="11" tabName1="JSON" tabName2="XML" >}}
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

## Consulta de Métodos de Pagamento Disponíveis {#available-payment-methods-query}

Este método gera uma lista dos métodos de pagamento disponíveis em todos os países.

### Parâmetros para Solicitação e Resposta {#parameters-for-request-and-response-1}

<details>
<summary>Solicitação</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `GET_PAYMENT_METHODS`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| merchant | Objeto |  | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| paymentMethods | Objeto |  | Lista dos métodos de pagamento. |
| paymentMethods > paymentMethodComplete | Objeto |  | Este objeto contém as informações de um método de pagamento. |
| paymentMethods > paymentMethodComplete > id | Numérico |  | Identificador do método de pagamento. |
| paymentMethods > paymentMethodComplete > description | Alfanumérico | Máx:32 | Nome do método de pagamento. |
| paymentMethods > paymentMethodComplete > country | Alfanumérico | 2 | Código ISO do país do método de pagamento. |

</details>

### Chamada de API {#api-call-1}

A seguir estão os corpos do pedido e resposta deste método. Para fins de exemplo, a solicitação e a resposta aqui mostram dois métodos de pagamento. 

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
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
            "id": "450",
            "description": "VISA",
            "country": "PA",
            "enabled": true,
            "reason": null
        },
        {
            "id": "451",
            "description": "MASTERCARD",
            "country": "PA",
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
            <id>450</id>
            <description>VISA</description>
            <country>PA</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>451</id>
            <description>MASTERCARD</description>
            <country>PA</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
    </paymentMethods>
</paymentMethodsResponse>
```

{{< /tab >}}
{{< /tabs >}}

## Ping

O método `PING` permite que você confirme a conexão com a nossa plataforma.

### Parâmetros para Solicitação e Resposta {#parameters-for-request-and-response-2}

<details>
<summary>Solicitação</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `PING`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| merchant | Objeto |  | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | O código de resposta da transação. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada, caso tenha ocorrido um erro. |
| transactionResponse | Objeto | Máx:2048 | A resposta do método PING caso tenha ocorrido um erro. |
</details>

### Chamada de API {#api-call-2}

A seguir estão os corpos do pedido e resposta deste método.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
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
