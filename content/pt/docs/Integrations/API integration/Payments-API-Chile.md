---
title: "API de Pagamentos - Chile"
linkTitle: "API de Pagamentos - Chile"
date: 2021-05-03T15:48:08-05:00
description: >
  A API de Pagamentos para o Chile permite integrar de forma eficiente as capacidades de processamento de pagamentos da PayU à sua plataforma de compras online. Por meio dessa API, os comércios podem oferecer aos seus clientes uma ampla variedade de métodos de pagamento, como cartões de crédito, débito ou pré-pagos; transferências bancárias via Khipu; ou cartões de débito ou pré-pagos por meio do WebPay Plus.
weight: 20
tags: ["subtopic"]
---

<script src="/js/searchcodes.js"></script>

Este guia mostra como aproveitar estes serviços para melhorar a experiência de pagamento dos seus clientes, oferecendo opções de pagamento flexíveis e seguras, adaptadas ao mercado local.

{{% alert title="Nota" color="info"%}}

Para integrar a API de Pagamentos, direcione suas solicitações para as seguintes URLs de acordo com o ambiente correspondente:
* Testes: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Produção: ```https://api.payulatam.com/payments-api/4.0/service.cgi```

{{% /alert %}}

## Funcionalidades disponíveis {#available-features}

A API de Pagamentos inclui as seguintes funcionalidades:

* [Enviar transações usando cartões de crédito, débito ou pré-pago]({{< ref "#submit-transactions-using-credit-debit-or-prepaid-cards" >}}) 
* [Enviar transações usando Khipu]({{< ref "Payments-API-Chile.md#submit-transactions-using-khipu" >}})
* [Enviar transações usando cartões de débito e pré-pago através do WebPay Plus]({{< ref "#submit-transactions-using-debit-and-prepaid-cards-through-webpay-plus" >}})
* [Incluir informações do registro de nome de passageiro]({{< ref "#include-passenger-name-record-information-optional" >}})
* [Consulta de métodos de pagamento disponíveis]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Nota" color="info"%}}

Para confirmar o status de uma transação, você pode usar uma das seguintes opções:
* Monitorar a URL especificada no parâmetro `transaction.notifyUrl`.
* Verificar a **URL de confirmação** configurada no Painel de Administração da PayU, em **Configuração** > **Configuração técnica**.
* Use o [API ou SDK de consultas]({{< ref "Queries.md" >}}).

{{% /alert %}}

## Enviar transações usando cartões de crédito, débito ou pré-pago {#submit-transactions-using-credit-debit-or-prepaid-cards}

Esse método permite processar os pagamentos que seus clientes realizam com cartões de crédito, débito ou pré-pagos. Para o Chile, você pode implementar o fluxo de duas etapas (**Autorização** e **Captura**) ou fluxo de uma etapa (**Cobrança**). Para mais informações, consulte a documentação de [Fluxos de pagamento]({{< ref "payments.md#payment-flows" >}}).

{{% alert title="Nota" color="info"%}}

O fluxo de duas etapas está disponível sob solicitação. Entre em contato com seu representante de vendas para mais informações.

{{% /alert %}}

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response}

<details>

<summary>Solicitação</summary>

<label for="table1" class="showMandatory"><input type="checkbox" id="table1" name="table1" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>

<br>

<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
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
| transaction > order > additionalValues > TX_VALUE > value | Número | 12, 2 | Especifica o valor da transação. Este valor não pode incluir decimais. | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Total do Imposto sobre Valor Agregado (IVA). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Número | 12, 2 | Especifica o valor do IVA.  | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para cálculo do VAT.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais.  | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Número | 12, 2 | Especifica o valor base da transação. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > creditCardTokenId | Alfanumérico |  | Incluir este parâmetro quando a transação for feita com um cartão tokenizado, no lugar das informações do cartão de crédito. Para obter mais informações, consulte [API de tokenização]({{< ref "Tokenization-API.md" >}}) | Não |
| transaction > creditCard | Objeto |  | Informações do cartão de crédito. Este objeto e seus parâmetros são obrigatórios quando o pagamento é realizado com cartão de crédito não tokenizado. | Não |
| transaction > creditCard > number | Alfanumérico | Mín:13 Máx:20 | Número do cartão de crédito. | Não |
| transaction > creditCard > securityCode | Alfanumérico | Mín:1 Máx:4 | Código de segurança do cartão de crédito (CVC2, CVV2, CID). | Não |
| transaction > creditCard > expirationDate | Alfanumérico | 7 | Data de validade do cartão de crédito. Formato `YYYY/MM`. | Não |
| transaction > creditCard > name | Alfanumérico | Mín:1 Máx:255 | Nome do titular exibido no cartão de crédito. | Não |
| transaction > creditCard > processWithoutCvv2 | Boolean | Máx:255 | Permite processar transações sem incluir o código de segurança do cartão de crédito. Sua loja precisa da autorização do PayU antes de usar este recurso. | Não |
| transaction > debitCard | Objeto |  | Informações do cartão de débito. Este objeto e seus parâmetros são obrigatórios quando o pagamento é realizado com cartão de débito. | Não |
| transaction > debitCard > number | Alfanumérico | Mín:13 Máx:20 | Número do cartão de débito. | Não |
| transaction > debitCard > securityCode | Alfanumérico | Mín:1 Máx:4 | Código de segurança do cartão de débito (CVC2, CVV2, CID). | Não |
| transaction > debitCard > expirationDate | Alfanumérico | 7 | Data de validade do cartão de débito. Formato `YYYY/MM`. | Não |
| transaction > debitCard > name | Alfanumérico | Mín:1 Máx:255 | Nome do titular exibido no cartão de débito. | Não |
| transaction > payer | Objeto |  | Informações do pagador. | Sim |
| transaction > payer > emailAddress | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| transaction > payer > merchantPayerId | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| transaction > payer > fullName | Alfanumérico | Máx:150 | Nome do pagador, que deve corresponder ao nome enviado no parâmetro `transaction.creditCard.name` para pagamentos com cartão de crédito. | Sim |
| transaction > payer > billingAddress | Objeto |  | Endereço de cobrança. | Sim |
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
| transaction > type | Alfanumérico | 32 | Definir este valor de acordo com a transação que você quer:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` para fluxos de uma etapa.</li></ul> | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Selecione um método de pagamento com cartão de crédito ou débito válido. [Veja os métodos de pagamento disponíveis o Chile]({{< ref "select-your-payment-method.html#Chile" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Definir `CL` o Chile. | Sim |
| transaction > deviceSessionId | Alfanumérico | Máx:255 | Identificador da sessão do dispositivo onde o cliente faz a transação. Para obter mais informações, consulte [este tópico]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |
| transaction > cookie | Alfanumérico | Máx:255 | Cookie armazenado pelo dispositivo onde o cliente faz a transação. | Sim |
| transaction > userAgent | Alfanumérico | Máx:1024 | O agente do usuário do navegador onde o cliente faz a transação. | Sim |
| transaction > extraParameters | Objeto |  | Parâmetros ou dados adicionais associados a pedido. O tamanho máximo de cada nome _extraParameters_ é de 64 caracteres. <li>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}` <li>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | Não |

</details>

<details>

<summary>Resposta</summary>

<br>

<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
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
| transactionResponse > extraParameters | Objeto |  | Parâmetros ou dados adicionais associados à resposta. <li>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<li>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Considerações {#considerations}

* **Tokens de cartão de crédito:** Ao usar tokens de cartões de crédito para pagamentos, inclua os seguintes parâmetros:
  * `transaction.creditCardTokenId:` Identificador do token do cartão de crédito armazenado.
  * `transaction.creditCard.securityCode` (Opcional): Código de segurança do cartão (CVV), se for exigido conforme sua configuração de processamento. Para mais informações sobre a criação e uso de tokens, consulte a [API de Tokenização]({{< ref "Tokenization-API.md" >}}).
* **Moeda:** As transações devem ser enviadas em Pesos Chilenos (CLP), utilizando apenas números inteiros. **Valores decimais não são aceitos**.
* **Fluxo de duas etapas (Autorização e Captura):**
  * Para habilitar essa funcionalidade, entre em contato com seu representante de vendas da PayU.
  * Atualmente disponível apenas para pagamentos em uma única parcela. A integração rejeitará automaticamente transações com múltiplas parcelas.
* **Código de segurança (CVV):**
  * Por padrão, o processamento de cartões de crédito sem o CVV não está habilitado.
  * Para habilitar o processamento sem CVV, entre em contato com seu representante de vendas da PayU. Uma vez habilitado, você deve incluir o parâmetro `creditCard.processWithoutCvv2` com o valor `true` e omitir o parâmetro `creditCard.securityCode` na sua solicitação.

### Autorização {#authorization}

Use este método para realizar a etapa de **Autorização** do fluxo de duas etapas. Nesta etapa, o pagamento é autorizado, mas o valor não é debitado até que você [capture]({{< ref "#capture" >}}) os fundos.

#### Exemplos de solicitação e resposta {#request-and-response-examples}

A seguir, apresentamos exemplos de corpos de solicitação e resposta nos formatos JSON e XML.

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
         "accountId": "512325",
         "referenceCode": "PRODUCT_TEST_2021-06-25T16:33:48.512Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "77d72fb91eb43f9b15fb300d5f173da3",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 10000,
               "currency": "CLP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
               "street2": "5555487",
               "city": "RM",
               "state": "Talagante",
               "country": "CL",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "5555487",
            "city": "RM",
            "state": "Talagante",
            "country": "CL",
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
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "125544",
            "city": "RM",
            "state": "Talagante",
            "country": "CL",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "creditCard": {
         "number": "4097440000000004",
         "securityCode": "777",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION",
      "paymentMethod": "VISA",
      "paymentCountry": "CL",
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
        "orderId": 1400455722,
        "transactionId": "49cb24d9-eda6-43de-aad9-a17ffa9e5fb8",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "195569",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "49cb24d9-eda6-43de-aad9-a17ffa9e5fb8",
        "authorizationCode": "195569",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Approved transaction",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624616739664,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "TRANSBANK_DIRECT_TOKEN": "01ab3984007f3010d2adb6c02d104f85b8268ccf4b95da4b56f3abdb339e1c52"
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
         <accountId>512325</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-25T16:33:48.512ZZ</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>77d72fb91eb43f9b15fb300d5f173da3</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>10000</value>
                  <currency>CLP</currency>
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
               <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
               <street2>5555487</street2>
               <city>RM</city>
               <state>Talagante</state>
               <country>CL</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
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
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
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
      <paymentCountry>CL</paymentCountry>
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
        <orderId>1400455931</orderId>
        <transactionId>56f77e02-447a-4c98-a04b-9a8f3f92f3e7</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>363838</paymentNetworkResponseCode>
        <trazabilityCode>56f77e02-447a-4c98-a04b-9a8f3f92f3e7</trazabilityCode>
        <authorizationCode>363838</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Approved transaction</responseMessage>
        <operationDate>2021-06-25T06:33:55</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>TRANSBANK_DIRECT_TOKEN</string>
                <string>01ab79a6030063a6b4039a64a8cf7de471d7ad02390c118fbd7d66cfd1af9864</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

### Captura {#capture}

Use este método para executar a etapa **Captura** de um fluxo de duas etapas. Nesta etapa, você captura os fundos [autorizados]({{< ref "#authorization" >}}) anteriormente para transferi-los para sua conta PayU.

#### Considerações {#considerations-1}

Considere o seguinte ao utilizar o método de Captura:
* Os comerciantes devem capturar as transações aprovadas dentro de 7 dias. Após esse período, o sistema anulará automaticamente a transação.
* Somente os parâmetros exibidos no corpo da solicitação são necessários para iniciar uma Captura. Certifique-se de que o ID do pedido e o ID da transação correspondam a uma autorização ativa.
* A integração suporta capturas parciais. Para mais informações, consulte a seção de [Captura parcial]({{< ref "#partial-capture" >}}).
* Os comerciantes não podem capturar um valor superior ao que foi originalmente autorizado.
* As capturas só são permitidas para transações com uma única parcela.

#### Exemplos de solicitação e resposta {#request-and-response-examples-1}

A seguir, apresentamos exemplos de corpos de solicitação e resposta nos formatos JSON e XML.

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
         "id": "1400421560"
      },
      "type": "CAPTURE",
      "parentTransactionId": "db9d9d7f-b62c-4ed2-a3b9-d146d33bdaf5"
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
        "orderId": 1400455931,
        "transactionId": "da91c0ec-632b-44e3-883d-b85821390519",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "da91c0ec-632b-44e3-883d-b85821390519",
        "authorizationCode": "169018",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Approved transaction",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624629865424,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "TRANSBANK_DIRECT_TOKEN": "01ab5a10f3c1bdd401ac86d7c21e4347a7b848171fad7830157abcaac0373c7e"
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
         <id>1400456250</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>ead41073-a03a-45aa-9e83-23d4b03197f0</parentTransactionId>
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
        <orderId>1400456250</orderId>
        <transactionId>9c4d12c4-277d-4936-9d15-735e21dd5a19</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>0</paymentNetworkResponseCode>
        <trazabilityCode>9c4d12c4-277d-4936-9d15-735e21dd5a19</trazabilityCode>
        <authorizationCode>698999</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Approved transaction</responseMessage>
        <operationDate>2021-06-25T09:08:16</operationDate>
        <extraParameters>
            <entry>
                <string>TRANSBANK_DIRECT_TOKEN</string>
                <string>01ab6ddef1f9350f7b970d33b9766db9b0d52c6b9cb353618ddc8cd58d076b59</string>
            </entry>
        </extraParameters>
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
* O valor mínimo para uma captura parcial é de 50 CLP.

#### Exemplos de solicitação e resposta {#request-and-response-examples-2}

A seguir, apresentamos exemplos de corpos de solicitação e resposta nos formatos JSON e XML.

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
                "value": 50,
                "currency": "CLP"
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
        <value>50</value>
        <currency>CLP</currency>
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

#### Exemplos de solicitação e resposta {#request-and-response-examples-3}

A seguir, apresentamos exemplos de corpos de solicitação e resposta nos formatos JSON e XML.

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
         "accountId": "512325",
         "referenceCode": "PRODUCT_TEST_2021-06-15T20:35:48.975Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "75ae7a887dfd759894c57eb1bc5a4288",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 10000,
               "currency": "CLP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
               "street2": "5555487",
               "city": "RM",
               "state": "Talagante",
               "country": "CL",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "5555487",
            "city": "RM",
            "state": "Talagante",
            "country": "CL",
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
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "125544",
            "city": "RM",
            "state": "Talagante",
            "country": "CL",
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
      "paymentCountry": "CL",
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
        "orderId": 1400431556,
        "transactionId": "14aed0cc-95cb-4b04-b4dd-0c7f8c3296e8",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "456505",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "14aed0cc-95cb-4b04-b4dd-0c7f8c3296e8",
        "authorizationCode": "456505",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Approved transaction",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1623834912248,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "TRANSBANK_DIRECT_TOKEN": "01ab306b62cd0ce17d462501b121ed6cac3794375054b80a51c01bad4ec51550"
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
         <accountId>512325</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-15T20:35:48.975Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>75ae7a887dfd759894c57eb1bc5a4288</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>10000</value>
                  <currency>CLP</currency>
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
               <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
               <street2>5555487</street2>
               <city>RM</city>
               <state>Talagante</state>
               <country>CL</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
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
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
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
      <paymentCountry>CL</paymentCountry>
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
        <orderId>1400431549</orderId>
        <transactionId>937ed9fe-72d3-44e2-b1b8-e38e9f8e08a4</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>185495</paymentNetworkResponseCode>
        <trazabilityCode>937ed9fe-72d3-44e2-b1b8-e38e9f8e08a4</trazabilityCode>
        <authorizationCode>185495</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Approved transaction</responseMessage>
        <operationDate>2021-06-16T04:13:51</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>TRANSBANK_DIRECT_TOKEN</string>
                <string>01abc29e7b32bbf011cdd2a1e9961c5d6bd068220f4b506b06c66e15de1acfd2</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Enviar transações usando Khipu {#submit-transactions-using-khipu}

Khipu é uma solução de pagamento que permite que empresas no Chile aceitem pagamentos diretamente das contas bancárias de seus clientes, sem a necessidade de cartões de crédito ou débito.

**Benefícios para o seu negócio:**

* **Aumente suas vendas:** Khipu oferece uma experiência de pagamento simples e fluida, o que se traduz em uma maior taxa de conversão e mais vendas.
* **Expanda seu alcance:** Alcance um público mais amplo aceitando pagamentos de todos os bancos no Chile, incluindo clientes que não possuem cartão de crédito ou débito.
* **Melhore a segurança:** Khipu emprega tecnologias de criptografia e autenticação para proteger as informações de seus clientes e promover transações seguras.

### Processo de pagamento Khipu {#khipu-payment-process}

Para integrar o Khipu à sua plataforma de e-commerce, você pode criar um formulário de pagamento e gerar uma experiência do usuário seguindo o fluxo abaixo:

1. **Seleção de pagamento:** O cliente escolhe Khipu como método de pagamento em seu checkout:

<img src="/assets/Payments/KHIPU_PT_01.png" alt="PrintScreen" width="250">

<p></p>

2. **Seleção do banco:** O cliente seleciona seu banco preferido.

<img src="/assets/Payments/KHIPU_PT_02.png" alt="PrintScreen" width="250">

<p></p>

3. **Autenticação segura:** O cliente insere suas credenciais bancárias na plataforma segura do Khipu.

<img src="/assets/Payments/KHIPU_PT_03.png" alt="PrintScreen" width="500">

<p></p>

4. **Confirmação de pagamento:** O cliente recebe uma confirmação imediata da transação.

<img src="/assets/Payments/KHIPU_PT_04.png" alt="PrintScreen" width="250">

<p></p>

5. **Suporte e recibo:** O sistema envia um recibo detalhado para o endereço de e-mail do cliente.

<img src="/assets/Payments/KHIPU_PT_05.png" alt="PrintScreen" width="250">

<p></p>

{{% alert title="Nota" color="info"%}}

Para realizar testes no ambiente bancário da Khipu, você pode utilizar as seguintes credenciais:
* **RUT:** `6238038-1`
* **Senha:** `1234`

{{% /alert %}}

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-1}

<details>

<summary>Solicitação</summary>

<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>

<br>

<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|---|
| language | Alfanumérico | 2 | Idioma usado na solicitação, este idioma é usado para exibir as mensagens de erro geradas. [Veja idiomas suportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `SUBMIT_TRANSACTION`. | Sim |
| merchant | Objeto |  | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como obter meu API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como obter minha API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| transaction | Objeto | | Este objeto contém os dados da transação. | Sim |
| transaction > order | Objeto | | Este objeto contém os dados do pedido. | Sim |
| transaction > order > accountId | Numérico | | Identificador da sua conta. | Sim |
| transaction > order > referenceCode | Alfanumérico | Mín:1 Máx:255 | Representa o identificador do pedido no seu sistema. | Sim |
| transaction > order > description | Alfanumérico | Mín:1 Máx:255 | Descrição do pedido. | Sim |
| transaction > order > language | Alfanumérico | 2 | Idioma usado nos e-mails do comprador e vendedor. | Sim |
| transaction > order > notifyUrl | Alfanumérico | Máx:2048 | URL de confirmação do pedido. | Não |
| transaction > order > partnerId | Alfanumérico | Máx:255 | ID do parceiro no PayU. | Não |
| transaction > order > signature | Alfanumérico | Máx:255 | Assinatura associada ao formulário. Para mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| transaction > order > additionalValues | Objeto | 64 | Valor do pedido ou seus valores associados. | Sim |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Valor da transação. | Sim |
| transaction > order > additionalValues > TX_VALUE > value | Numérico | 12,2 | Especifica o valor da transação. Este valor não pode incluir decimais. | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| transaction > order > buyer | Objeto | | Informações do comprador. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Máx:100 | ID do comprador no seu sistema. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Máx:255 | Endereço de e-mail do comprador. | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do comprador. | Sim |
| transaction > order > buyer > shippingAddress | Objeto | | Endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País do endereço de entrega do comprador no formato ISO 3166 alfa-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Numérico | Máx:20 | Código postal do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > phone | Numérico | Máx:20 | Número de telefone do endereço de entrega do comprador. | Sim |
| transaction > order > shippingAddress | Objeto | | Endereço de entrega. | Não |
| transaction > order > shippingAddress > street1 | Alfanumérico | Máx:100 | Linha 1 do endereço. | Não |
| transaction > order > shippingAddress > street2 | Alfanumérico | Máx:100 | Linha 2 do endereço. | Não |
| transaction > order > shippingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço. | Não |
| transaction > order > shippingAddress > state | Alfanumérico | Máx:40 | Estado do endereço. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | País do endereço. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Máx:8 | Código postal do endereço. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. | Não |
| transaction > payer | Objeto | | Informações do pagador. | Sim |
| transaction > payer > emailAddress | Alfanumérico | 255 | Endereço de e-mail do pagador. | Sim |
| transaction > payer > merchantPayerId | Alfanumérico | 100 | Identificador do pagador no seu sistema. | Não |
| transaction > payer > fullName | Alfanumérico | 150 | Nome completo do pagador. | Sim |
| transaction > payer > billingAddress | Objeto | | Endereço de cobrança. | Sim |
| transaction > payer > billingAddress > street1 | Alfanumérico | 100 | Linha 1 do endereço de cobrança. | Sim |
| transaction > payer > billingAddress > street2 | Alfanumérico | 100 | Linha 2 do endereço de cobrança. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | 50 | Cidade do endereço de cobrança. | Sim |
| transaction > payer > billingAddress > state | Alfanumérico | 40 | Estado do endereço de cobrança. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 alfa-2. | Sim |
| transaction > payer > billingAddress > postalCode | Alfanumérico | 20 | Código postal do endereço de cobrança. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | 20 | Número de telefone do endereço de cobrança. | Não |
| transaction > payer > birthdate | Alfanumérico | 10 | Data de nascimento do pagador. | Não |
| transaction > payer > contactPhone | Alfanumérico | 20 | Número de telefone do pagador. | Sim |
| transaction > payer > dniNumber | Alfanumérico | 20 | Número de identificação do pagador. | Sim |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja tipos de documento]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sim |
| transaction > extraParameters | Objeto | | Parâmetros adicionais ou dados associados à solicitação. Para pagamentos por transferência bancária Khipu, isso inclui: a página de resposta do seu comércio (obrigatório), o código do banco (obrigatório) e o nome do banco (opcional). <li> Em JSON, o parâmetro `extraParameters` é definido como: `"extraParameters": {"RESPONSE_URL": "http://www.payu.com/response", "FINANCIAL_INSTITUTION_CODE": "Bawdf", "FINANCIAL_INSTITUTION_NAME": "DemoBank" }` <li> Em XML, o parâmetro `extraParameters` é definido como: `<extraParameters> <entry> <string>RESPONSE_URL</string> <string>http://www.payu.com/response</string> </entry> <entry> <string>FINANCIAL_INSTITUTION_CODE</string> <string>Bawdf</string> </entry> <entry> <string>FINANCIAL_INSTITUTION_NAME</string> <string>DemoBank</string> </entry> </extraParameters>` | Sim |
| transaction > type | Alfanumérico | 32 | Como esses pagamentos são feitos no site do Khipu, a única transação disponível é `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Selecione um método de pagamento válido para transferência bancária. [Veja métodos de pagamento disponíveis para o Chile]({{< ref "payments-api-chile.html#available-payment-methods-query" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Definir como `CL` para Chile. | Sim |
| transaction > deviceSessionId | Alfanumérico | 255 | Identificador da sessão do dispositivo onde o cliente realiza a transação. Para mais informações, consulte [este tópico]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | 39 | Endereço IP do dispositivo onde o cliente realiza a transação. | Sim |
| transaction > cookie | Alfanumérico | 255 | Cookie armazenado pelo dispositivo onde o cliente realiza a transação. | Sim |
| transaction > userAgent | Alfanumérico | 1024 | O user agent do navegador onde o cliente realiza a transação. | Sim |
| test (JSON) <hr>isTest (XML) | Booleano | | Defina como `true` se a solicitação estiver em modo de teste. Caso contrário, defina como `false`. | Sim |

</details>

<details>

<summary>Resposta</summary>

<br>

<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|---|---|---|---|
| code | Alfanumérico | | Código de resposta da transação. Valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx: 2048 | Mensagem de erro associada quando o código de resposta é `ERROR`. |
| transactionResponse | Objeto | | Dados da resposta. |
| transactionResponse > orderId | Numérico | | ID do pedido gerado ou existente no PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | Identificador da transação no PayU. |
| transactionResponse > state | Alfanumérico | Máx: 32 | Estado da transação. Como o usuário realiza o pagamento em um escritório físico, o estado para uma transação bem-sucedida é `PENDING`. |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Máx: 255 | Código de resposta retornado pela rede financeira. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Máx: 255 | Mensagem de erro retornada pela rede financeira. |
| transactionResponse > trazabilityCode | Alfanumérico | Máx: 32 | Código de rastreabilidade retornado pela rede financeira. |
| transactionResponse > authorizationCode | Alfanumérico | Máx: 12 | Código de autorização retornado pela rede financeira. |
| transactionResponse > pendingReason | Alfanumérico | Máx: 21 | Código de motivo associado ao estado. Como mencionado em `transactionResponse > state`, a transação está aguardando pagamento. |
| transactionResponse > responseCode | Alfanumérico | Máx: 64 | Código de resposta associado ao estado. Neste caso, para transações bem-sucedidas, é `PENDING_TRANSACTION_CONFIRMATION`. |
| transactionResponse > responseMessage | Alfanumérico | Máx: 2048 | Mensagem associada ao código de resposta. |
| transactionResponse > operationDate | Data | | Data em que a resposta foi criada no sistema PayU. |
| transactionResponse > extraParameters | Objeto | | Parâmetros adicionais ou dados associados à resposta. O `BANK_URL` é a URL que você deve usar para redirecionar seu pagador ao Khipu. <li>Em JSON, o parâmetro `extraParameters` segue esta estrutura: `"extraParameters": { "BANK_URL": "xxxx" }` <li>Em XML, o parâmetro `extraParameters` segue esta estrutura: `<extraParameters> <entry> <string>BANK_URL</string> <string>xxxx</string> </entry> </extraParameters>` |

</details>

{{% alert title="Nota" color="info"%}}

Para simular resultados de teste específicos (`OK`, `ERROR`, `WARNING`, `CONTINUE`), consulte a [Documentação de Casos de Teste do Khipu](https://docs.khipu.com/en/payment-solutions/instant-payments/khipu-client-test-cases).

{{% /alert %}}

#### Exemplos de solicitação e resposta {#request-and-response-examples-4}

A seguir, apresentamos exemplos de corpos de solicitação e resposta nos formatos JSON e XML.

{{% alert title="Nota" color="info"%}}

Para testes, você pode usar:

* `"FINANCIAL_INSTITUTION_CODE": "Bawdf"`
* `"FINANCIAL_INSTITUTION_NAME": "DemoBank"`

{{% /alert %}}

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}

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
            "accountId": "512325",
            "referenceCode": "PRODUCT_TEST_2024-03-13T19:59:43.229Z",
            "description": "Payment test description",
            "language": "es",
            "signature": "1d6c33aed575c4974ad5c0be7c6a1c87",
            "notifyUrl": "http://www.payu.com/notify",
            "additionalValues": {
                "TX_VALUE": {
                    "value": 10000,
                    "currency": "CLP"
                }
            },
            "buyer": {
                "merchantBuyerId": "1",
                "fullName": "First name and second buyer name",
                "emailAddress": "buyer_test@test.com",
                "contactPhone": "7563126",
                "dniNumber": "123456789",
                "shippingAddress": {
                   "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
                   "street2": "5555487",
                   "city": "RM",
                   "state": "Talagante",
                   "country": "CL",
                   "postalCode": "000000",
                   "phone": "7563126"
                }
             },
             "shippingAddress": {
                "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
                "street2": "5555487",
                "city": "RM",
                "state": "Talagante",
                "country": "CL",
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
                "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
                "street2": "125544",
                "city": "RM",
                "state": "Talagante",
                "country": "CL",
                "postalCode": "000000",
                "phone": "7563126"
            }
        },
        "extraParameters": {
            "FINANCIAL_INSTITUTION_CODE": "Bawdf",
            "FINANCIAL_INSTITUTION_NAME": "DemoBank",
            "RESPONSE_URL": "http://www.payu.com/response"
        },
        "type": "AUTHORIZATION_AND_CAPTURE",
        "paymentMethod": "KHIPU",
        "paymentCountry": "CL",
        "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
        "ipAddress": "127.0.0.1",
        "cookie": "cookie_52278879710130",
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
        "orderId": 1400021721,
        "transactionId": "b5c1ef12-7f6b-4f00-9c43-6e801bf525ad",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "gsizttwrygpd",
        "authorizationCode": null,
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1710329617633,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_URL": "https://app.khipu.com/payment/simplified/gsizttwrygpd"
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
			<accountId>512325</accountId>
			<referenceCode>PRODUCT_TEST_2024-03-13T19:59:43.229Z</referenceCode>
			<description>Payment test description</description>
			<language>es</language>
			<signature>1d6c33aed575c4974ad5c0be7c6a1c87</signature>
			<notifyUrl>http://www.payu.com/notify</notifyUrl>
			<additionalValues>
                <string>TX_VALUE</string>
				<additionalValue>
					<value>10000</value>
					<currency>CLP</currency>
				</additionalValue>
			</additionalValues>
			<buyer>
				<merchantBuyerId>1</merchantBuyerId>
				<fullName>First name and second buyer name</fullName>
				<emailAddress>buyer_test@test.com</emailAddress>
				<contactPhone>7563126</contactPhone>
				<dniNumber>123456789</dniNumber>
				<shippingAddress>
					<street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
					<street2>5555487</street2>
					<city>RM</city>
					<state>Talagante</state>
					<country>CL</country>
					<postalCode>000000</postalCode>
					<phone>7563126</phone>
				</shippingAddress>
			</buyer>
			<shippingAddress>
				<street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
				<street2>5555487</street2>
				<city>RM</city>
				<state>Talagante</state>
				<country>CL</country>
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
				<street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
				<street2>125544</street2>
				<city>RM</city>
				<state>Talagante</state>
				<country>CL</country>
				<postalCode>000000</postalCode>
				<phone>7563126</phone>
			</billingAddress>
		</payer>
		<extraParameters>
            <entry>
                <string>FINANCIAL_INSTITUTION_CODE</string>
                <string>Bawdf</string>
            </entry>
            <entry>
                <string>FINANCIAL_INSTITUTION_NAME</string>
                <string>DemoBank</string>
            </entry>
            <entry>
                <string>RESPONSE_URL</string>
                <string>http://www.payu.com/response</string>
            </entry>
		</extraParameters>
		<type>AUTHORIZATION_AND_CAPTURE</type>
		<paymentMethod>KHIPU</paymentMethod>
		<paymentCountry>CL</paymentCountry>
		<deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
		<ipAddress>127.0.0.1</ipAddress>
		<cookie>cookie_52278879710130</cookie>
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
	<error />
	<transactionResponse>
		<orderId>1400021721</orderId>
		<transactionId>b5c1ef12-7f6b-4f00-9c43-6e801bf525ad</transactionId>
		<state>PENDING</state>
		<trazabilityCode>gsizttwrygpd</trazabilityCode>
		<authorizationCode />
		<pendingReason>AWAITING_NOTIFICATION</pendingReason>
		<responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
		<operationDate>1710329617633</operationDate>
		<referenceQuestionnaire />
		<extraParameters>
			<entry>
				<string>BANK_URL</string>
				<string>https://app.khipu.com/payment/simplified/gsizttwrygpd</string>
			</entry>
		</extraParameters>
	</transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

### Lista de bancos disponíveis com Khipu {#list-of-available-banks-with-khipu}

Opcionalmente, com este método, você pode obter a lista de bancos disponíveis para realizar pagamentos usando Khipu:

<details>

<summary>Solicitação</summary>

<br>

<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|---|
| language | Alfanumérico | 2 | Idioma usado na solicitação. Este idioma é usado para exibir as mensagens de erro geradas. [Veja idiomas suportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx: 32 | Defina como `GET_BANKS_LIST`. | Sim |
| test (JSON) <hr> isTest (XML) | Booleano | | Defina como `true` se a solicitação estiver em modo de teste. Caso contrário, defina como `false`. | Sim |
| merchant | Objeto | | Este objeto contém dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín: 12 Máx: 32 | Usuário ou login fornecido pelo PayU. [Como obter meu API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín: 6 Máx: 32 | Senha fornecida pelo PayU. [Como obter minha API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| bankListInformation | Objeto | | Este objeto contém as informações da consulta. | Sim |
| bankListInformation > paymentMethod | Alfanumérico | | Defina como `KHIPU`. | Sim |
| bankListInformation > paymentCountry | Alfanumérico | | Defina como `CL`. | Sim |

</details>

<details>

<summary>Resposta</summary>

<br>

<div class="variables"></div>

| Nome do Campo         | Formato        | Descrição |
|-----------------------|---------------|-------------|
| code | Alfanumérico | Código de status da resposta da transação. Os valores possíveis são `SUCCESS` (sucesso) ou `ERROR` (erro). |
| error | Alfanumérico | Mensagem de erro descritiva retornada quando o `code` da resposta é `ERROR`. Este campo suporta um máximo de 2048 caracteres. |
| banks | Objeto | Lista de bancos disponíveis para processar pagamentos via Khipu. |
| banks > id | Alfanumérico | Identificador único do banco. Este valor deve ser enviado no parâmetro extra `FINANCIAL_INSTITUTION_CODE` na solicitação de pagamento. |
| banks > description | Alfanumérico | Nome ou rótulo legível do banco. |
| banks > bankCode    | Alfanumérico | Código interno único atribuído ao banco pelo Khipu. |
| banks > message     | Alfanumérico | Mensagem informativa ou nota relacionada ao banco, como uso ou limitações. |
| banks > minAmount   | Numérico | Valor mínimo de transação (na moeda local) suportado pelo banco. |
| banks > type | Alfanumérico | Tipo de entidade bancária. Os valores possíveis podem incluir `Person` (Pessoa) ou `Company` (Empresa), dependendo da integração. |
| banks > parent      | Alfanumérico | Identificador do banco pai ou primário. Se um banco oferece seções para Pessoas Físicas e Jurídicas, a seção de Pessoas Físicas é considerada a pai da Jurídica. |

</details>

#### Exemplos de solicitação e resposta {#request-and-response-examples-5}

A seguir, apresentamos exemplos de corpos de solicitação e resposta nos formatos JSON e XML.

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}

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
      "paymentMethod": "KHIPU",
      "paymentCountry": "CL"
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
            "id": "0096yf-1080-4bce-2b2b-hj90904fte2f2",
            "description": "DemoBank",
            "bankCode": "Bawdf",
            "message": "Este é um banco de testes. As transações não são reais.",
            "minAmount": "200.0",
            "type": "Pessoa",
            "parentId": ""
        },
        {
            "id": "6796tf-5220-tvc4-4b2f-hx33904fte1v8",
            "description": "ABCBank",
            "bankCode": "Qertf",
            "message": "Este é um banco de testes. As transações não são reais.",
            "minAmount": "460.0",
            "type": "Pessoa",
            "parentId": ""
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
        <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <isTest>false</isTest>
    <bankListInformation>
        <paymentMethod>KHIPU</paymentMethod>
        <paymentCountry>CL</paymentCountry>
    </bankListInformation>
</request>
```
<br>

**Exemplo de uma resposta:**

```XML
<bankListResponse>
    <code>SUCCESS</code>
    <error></error>
    <banks>
        <bank>
            <id>0096yf-1080-4bce-2b2b-hj90904fte2f2</id>
            <description>DemoBank</description>
            <bankCode>Bawdf</bankCode>
            <message>Este é um banco de testes. As transações não são reais.</message>
            <minAmount>200.0</minAmount>
            <type>Pessoa</type>
            <parentId></parentId>
        </bank>
        <bank>
            <id>6796tf-5220-tvc4-4b2f-hx33904fte1v8</id>
            <description>ABCBank</description>
            <bankCode>Qertf</bankCode>
            <message>Este é um banco de testes. As transações não são reais.</message>
            <minAmount>460.0</minAmount>
            <type>Pessoa</type>
            <parentId></parentId>
        </bank>
    </banks>
</bankListResponse>
```

{{< /tab >}}

{{< /tabs >}}

### Considerações adicionais para integração com Khipu {#additional-considerations-for-khipu-integration}

**Transparência nos pagamentos:** Pagamentos processados através do gateway Khipu aparecerão no extrato bancário do pagador com o nome _PayU Chile SA_.

**Limitações de valores:** É importante notar que os bancos associados ao Khipu podem definir limites mínimos ou máximos de valor por transação. Esses limites variam de acordo com cada instituição financeira.

**Políticas de reembolso:** De acordo com as políticas do Khipu, cancelamentos totais, parciais ou de pagamentos não são permitidos uma vez que a transação foi confirmada e processada.

**Disponibilidade do método de pagamento:** Note que o método de pagamento Khipu está disponível apenas para o modelo agregador. Se o seu negócio requer um modelo de pagamento diferente, consulte seu consultor da PayU para explorar outras soluções disponíveis.

### Recursos adicionais {#additional-resources}

* [Logos oficiais do Khipu:](https://docs.khipu.com/portal/en/payment-logos/)

## Enviar transações usando cartões de débito e pré-pagos através do WebPay Plus {#submit-transactions-using-debit-and-prepaid-cards-through-webpay-plus}

Esse método permite que você processe pagamentos com cartões de débito ou pré-pagos dos seus clientes. Para integrar essas transações, você deve redirecionar seu cliente para a URL incluída na resposta; lá, o cliente verá uma página de pagamento como a seguinte.

<img src="/assets/Payments/BankTransferReceiptCL.png" alt="PrintScreen" width="50%">

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-2}

<details>

<summary>Solicitação</summary>

<label for="table3" class="showMandatory"><input type="checkbox" id="table3" name="table3" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>

<br>

<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
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
| transaction > order > notifyUrl | Alfanumérico | Máx:2048 | URL de confirmação da ordem. | Não|
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
| transaction > order > additionalValues > TX_VALUE > value | Número | 12, 2 | Especifica o valor da transação. Este valor não pode incluir decimais. | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Total do Imposto sobre Valor Agregado (IVA). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Número | 12, 2 | Especifica o valor do IVA.  | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para cálculo do VAT.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais.  | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Número | 12, 2 | Especifica o valor base da transação. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > payer | Objeto |  | Informações do pagador. | Sim |
| transaction > payer > emailAddress | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| transaction > payer > merchantPayerId | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| transaction > payer > fullName | Alfanumérico | Máx:150 | Nome of the payer. | Sim |
| transaction > payer > billingAddress | Objeto |  | Endereço de cobrança. | Sim |
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
| transaction > type | Alfanumérico | 32 | Como os pagamentos são feitos na página WebPay plus, o único tipo de transação disponível é `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Selecione um método de pagamento válido para cartões de débito e pré-pagos. [Veja os métodos de pagamento disponíveis o Chile]({{< ref "select-your-payment-method.html#Chile" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Definir `CL` o Chile. | Sim |
| transaction > deviceSessionId | Alfanumérico | Máx:255 | Identificador da sessão do dispositivo onde o cliente faz a transação. Para obter mais informações, consulte [este tópico]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |
| transaction > cookie | Alfanumérico | Máx:255 | Cookie armazenado pelo dispositivo onde o cliente faz a transação. | Sim |
| transaction > userAgent | Alfanumérico | Máx:1024 | O agente do usuário do navegador onde o cliente faz a transação. | Sim |
| transaction > extraParameters | Objeto |  | Parâmetros ou dados adicionais associados a pedido. Para pagamentos através do WebPay plus, esta é a página de resposta da sua loja. <li>Em JSON, o parâmetro _extraParameters_ é definido como: <br>`"extraParameters": {`<br>&emsp;`"RESPONSE_URL": "http://www.test.com/response"`<br>`}` <li>Em XML, o parâmetro _extraParameters_ é definido como: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>RESPONSE_URL</string>`<br>&emsp;&emsp;`http://www.test.com/response`<br>&emsp;`</entry>`<br>`</extraParameters>` | Não |

</details>

<details>

<summary>Resposta</summary>

<br>

<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| transactionResponse | Objeto |  | Os dados de resposta. |
| transactionResponse > orderId | Número |  | O ID de ordem gerado ou existente no PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | O identificador da transação no PayU. |
| transactionResponse > state | Alfanumérico | Máx:32 | O status da transação. As the payment is performed by the user in a physical office, the state for a successful transaction is `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Máx:255 | O código de resposta fornecido pela rede financeira. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Máx:255 | A mensagem de erro fornecida pela rede financeira. |
| transactionResponse > trazabilityCode | Alfanumérico | Máx:32 | O código de rastreamento fornecido pela rede financeira. |
| transactionResponse > authorizationCode | Alfanumérico | Máx:12 | O código de autorização fornecido pela rede financeira. |
| transactionResponse > pendingReason | Alfanumérico | Máx:21 | O código de resposta associado ao status, conforme mencionado em `transactionResponse > state`, a transação está aguardando o pagamento. |
| transactionResponse > responseCode | Alfanumérico | Máx:64 | O código de resposta associado ao status. Neste caso, para transações bem-sucedidas é `PENDING_PAYMENT_IN_ENTITY`. |
| transactionResponse > responseMessage | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| transactionResponse > operationDate | Data |  | Data de criação da resposta no sistema PayU. |
| transactionResponse > extraParameters | Objeto |  | Parâmetros ou dados adicionais associados à resposta. <li>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"URL_PAYMENT_REDIRECT": "xxxx"`<br>`}` <li>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>URL_PAYMENT_REDIRECT</string>`<br>&emsp;&emsp;`<string>xxxx</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Considerações {#considerations-3}

* Se você não incluir o parâmetro `RESPONSE_URL` dentro de `transaction.extraParameters`, a API utilizará o valor da variável **Response URL** configurada no seu Painel de Administração PayU, em **Configurações** > **Configurações técnicas**.
* Ao processar pagamentos via WebPay Plus, você deve redirecionar o cliente para a URL obtida concatenando o parâmetro extra `URL_PAYMENT_REDIRECT` com o parâmetro extra `TRANSBANK_DIRECT_TOKEN`, da seguinte forma: `<br> URL_PAYMENT_REDIRECT?token_ws=TRANSBANK_DIRECT_TOKEN`.
* Se a solicitação de pagamento for bem-sucedida, a transação terá o estado `PENDING` e o `responseCode` será `PENDING_PAYMENT_IN_ENTITY`. Isso ocorre porque a integração redireciona o pagador para o banco selecionado para concluir o pagamento.
* A página de resposta deve conter as seguintes variáveis, transmitidas via método `GET`:

    | Variável            | Descrição                                   |
    | :------------------ | :----------------------------------------- |
    | `transactionState`  | Estado atual da transação. |
    | `reference_pol`     | Código de referência único para identificar a transação dentro da PayU. |
    | `TX_VALUE`          | Valor total da transação. |
    | `authorizationCode` | Código de autorização fornecido para a transação. |
    | `processingDate`    | Data em que a integração processou a transação. |
    | `cc_number`         | Dígitos visíveis do cartão de crédito utilizado na transação.  |

### Exemplos de solicitação e resposta {#request-and-response-examples-6}

A seguir, apresentamos exemplos de corpos de solicitação e resposta nos formatos JSON e XML.

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
         "accountId": "512325",
         "referenceCode": "PRODUCT_TEST_2021-06-15T20:35:48.975Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "75ae7a887dfd759894c57eb1bc5a4288",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 10000,
               "currency": "CLP"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer  name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "5415668464654",
            "shippingAddress": {
               "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
               "street2": "5555487",
               "city": "RM",
               "state": "Talagante",
               "country": "CL",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
            "street2": "5555487",
            "city": "RM",
            "state": "Talagante",
            "country": "CL",
            "postalCode": "000000",
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
            "street1": "Autopista Del Sol, 0 - Km.43 Costado Sur",
               "street2": "5555487",
               "city": "RM",
               "state": "Talagante",
               "country": "CL",
               "postalCode": "000000",
               "phone": "7563126"
         }
      },
      "extraParameters": {
         "RESPONSE_URL": "http://www.test.com/response"
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "TRANSBANK_DEBIT",
      "paymentCountry": "CL",
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
        "orderId": 1400432466,
        "transactionId": "e2609a58-97d6-4a65-8638-1b03da03cc7a",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "5f0cac61-c023-4fa3-bf27-ff888fa36c3c",
        "authorizationCode": null,
        "pendingReason": "AWAITING_PAYMENT_IN_ENTITY",
        "responseCode": "PENDING_PAYMENT_IN_ENTITY",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1623856942412,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "EXPIRATION_DATE": 1623875847781,
            "URL_PAYMENT_REDIRECT": "https://webpay3gint.transbank.cl/webpayserver/initTransaction",
            "TRANSBANK_DIRECT_TOKEN": "01ab155164939156988ee462d09ed5613b7efd297fe97b099c684ec8599c5cc5"
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
         <accountId>512325</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-15T20:35:48.975Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>75ae7a887dfd759894c57eb1bc5a4288</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>10000</value>
                  <currency>CLP</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>5415668464654</dniNumber>
            <shippingAddress>
               <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
               <street2>5555487</street2>
               <city>RM</city>
               <state>Talagante</state>
               <country>CL</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
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
            <street1>Autopista Del Sol, 0 - Km.43 Costado Sur</street1>
            <street2>5555487</street2>
            <city>RM</city>
            <state>Talagante</state>
            <country>CL</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
      </payer>
      <extraParameters>
         <entry>
            <string>RESPONSE_URL</string>
            <string>http://www.test.com/response</string>
         </entry>
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>TRANSBANK_DEBIT</paymentMethod>
      <paymentCountry>CL</paymentCountry>
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
        <orderId>1400432986</orderId>
        <transactionId>71a72319-f143-4359-8cb9-bc44a21d2b25</transactionId>
        <state>PENDING</state>
        <trazabilityCode>a0d9d7d6-000a-4777-af78-e33917a30fd8</trazabilityCode>
        <pendingReason>AWAITING_PAYMENT_IN_ENTITY</pendingReason>
        <responseCode>PENDING_PAYMENT_IN_ENTITY</responseCode>
        <operationDate>2021-06-16T12:22:28</operationDate>
        <extraParameters>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-16T17:42:53</date>
            </entry>
            <entry>
                <string>URL_PAYMENT_REDIRECT</string>
                <string>https://webpay3gint.transbank.cl/webpayserver/initTransaction</string>
            </entry>
            <entry>
                <string>TRANSBANK_DIRECT_TOKEN</string>
                <string>01abbca6da54f4e4ef9eb37fb9cacf72fdcc52797f6a9ca20377bc59eb0d2706</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Incluir informações do registro de nome de passageiro (Opcional) {#include-passenger-name-record-information-optional}

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

## Consulta de métodos de pagamento disponíveis {#available-payment-methods-query}

Este método gera uma lista dos métodos de pagamento disponíveis em todos os países.

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-3}

<details>

<summary>Solicitação</summary>

<br>

<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
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

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| paymentMethods | Objeto |  | Lista dos métodos de pagamento. |
| paymentMethods > paymentMethodComplete | Objeto |  | Este objeto contém as informações de um método de pagamento. |
| paymentMethods > paymentMethodComplete > id | Numérico |  | Identificador do método de pagamento. |
| paymentMethods > paymentMethodComplete > description | Alfanumérico | Máx:32 | Nome do método de pagamento. |
| paymentMethods > paymentMethodComplete > country | Alfanumérico | 2 | Código ISO do país do método de pagamento. |

</details>

### Exemplos de solicitação e resposta {#request-and-response-examples-7}

A seguir, apresentamos exemplos de corpos de solicitação e resposta nos formatos JSON e XML. Para fins deste exemplo, a resposta apresenta dois métodos de pagamento.

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}

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
            "id": "716",
            "description": "VISA",
            "country": "CL",
            "enabled": true,
            "reason": null
        },
        {
            "id": "712",
            "description": "DINERS",
            "country": "CL",
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
            <id>716</id>
            <description>VISA</description>
            <country>CL</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>712</id>
            <description>DINERS</description>
            <country>CL</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
    </paymentMethods>
</paymentMethodsResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Ping

O método `PING` permite que você confirme a conexão com a nossa plataforma.

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-4}

<details>

<summary>Solicitação</summary>

<br>

<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
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

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| code | Alfanumérico |  | O código de resposta da transação. | Sim |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada, caso tenha ocorrido um erro. | Sim |
| transactionResponse | Objeto | Máx:2048 | A resposta do método PING caso tenha ocorrido um erro. | Sim |

</details>

### Exemplos de solicitação e resposta {#request-and-response-examples-8}

A seguir, apresentamos exemplos de corpos de solicitação e resposta nos formatos JSON e XML.

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}

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
