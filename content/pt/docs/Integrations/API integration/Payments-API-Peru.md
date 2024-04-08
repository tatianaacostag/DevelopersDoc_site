---
title: "API de pagamentos - Peru"
linkTitle: "API de pagamentos - Peru"
date: 2021-05-03T15:48:08-05:00
description: >
  A API de pagamentos do Peru permite que sua loja processe diferentes tipos de transações com vários métodos de pagamento.
weight: 20
tags: ["subtopic"]
---
<script src="/js/searchcodes.js"></script>

Para integrar com a API de Pagamentos do Peru, direcione suas solicitações para as seguintes URLs conforme o seu ambiente:

{{% alert title="URLs" color="info"%}}
* Teste: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Produção: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Métodos disponíveis {#available-methods}
A API de pagamentos inclui os seguintes métodos:

* [Enviar transações usando cartões de crédito ou débito]({{< ref "#submit-transactions-using-credit-or-debit-cards" >}})
* [Enviar transações usando Yape]({{< ref "#submit-transactions-using-yape" >}})
* [Enviar transação usando dinheiro]({{< ref "#submit-transactions-using-cash" >}})
* [Consulta de métodos de pagamento disponíveis]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Observação" color="info"%}}
Para confirmar o status de uma transação, você pode usar:
* Navegue até a URL definida na variável `transaction.notifyUrl` ou na opção _**URL de confirmação**_ localizada no Módulo PayU em _**Configuração**_ > _**Configuração técnica**_.
* Use o [API ou SDK de Consultas]({{< ref "Queries.md" >}}).
{{% /alert %}}

## Enviar transações usando cartões de crédito ou débito
Este método permite processar os pagamentos efetuados pelos seus clientes com cartões de crédito ou débito. Para o Peru, você pode executar os fluxos de duas etapas, você pode executar os fluxos de duas etapas (**Autorização**, **Captura**) e fluxos de uma etapa (**Cobrança**). Para obter mais informações, consulte [Fluxos de pagamento]({{< ref "payments.md#payment-flows" >}}).

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
| transaction > order > additionalValues > TX_VALUE > value | Número | 12, 2 | Especifica o valor da transação. Este valor pode ter duas casas decimais (por exemplo `10000.00` ou `10000`). | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Total do Imposto sobre Valor Agregado (IVA). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Número | 12, 2 | Especifica o valor do IVA.  | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para cálculo do VAT.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais.  | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Número | 12, 2 | Especifica o valor base da transação. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > creditCardTokenId |  |  | Incluir este parâmetro quando a transação for feita com um cartão tokenizado, no lugar das informações do cartão de crédito. Para obter mais informações, consulte [API de tokenização]({{< ref "Tokenization-API.md" >}}) | Não |
| transaction > creditCard | Objeto |  | Informações do cartão de crédito. Se você processar usando cartão de débito, não envie este parâmetro.<br>Este objeto e seus parâmetros são obrigatórios quando o pagamento é realizado com cartão de crédito não tokenizado. | Não |
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
| transaction > payer | Objeto |  | Informações do pagador. | Não |
| transaction > payer > emailAddress | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Não |
| transaction > payer > merchantPayerId | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| transaction > payer > fullName | Alfanumérico | Máx:150 | Nome do pagador, que deve corresponder ao nome enviado no parâmetro `transaction.creditCard.name` para pagamentos com cartão de crédito. | Não |
| transaction > payer > billingAddress | Objeto |  | Endereço de cobrança. | Sim |
| transaction > payer > billingAddress > street1 | Alfanumérico | Máx:100 | Endereço de cobrança linha 1. | Não |
| transaction > payer > billingAddress > street2 | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Não |
| transaction > payer > billingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Sim |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Não |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| transaction > payer > birthdate | Alfanumérico | Máx:10 |  Data de nascimento do pagador. | Não |
| transaction > payer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do pagador. | Não |
| transaction > payer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do pagador. | Não |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Sim |
| transaction > type | Alfanumérico | 32 | Definir este valor de acordo com a transação que você quer:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` para fluxos de uma etapa.</li></ul> | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Selecione um método de pagamento com cartão de crédito ou débito válido. [Veja os métodos de pagamento disponíveis o Peru]({{< ref "select-your-payment-method.html#Peru" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Definir `PE` para o Peru. | Sim |
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
| transactionResponse > extraParameters | Objeto |  | Parâmetros ou dados adicionais associados à resposta. <br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Observações {#considerations}
* Para pagamentos com tokens de cartão de crédito, inclua os parâmetros `transaction.creditCardTokenId` e `transaction.creditCard.securityCode` (se processar com código de segurança) substituindo as informações do cartão de crédito. Para obter mais informações, consulte [API de tokenização]({{< ref "Tokenization-API.md" >}}).
* Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas. Depois que esse recurso for habilitado para você, envie no pedido a variável `creditCard.processWithoutCvv2` como true e remova a variável `creditCard.securityCode`.
* No Peru, você pode selecionar 0 ou 2 a 36x no pagamento com cartão de crédito. Se você selecionar uma (1) parcela, o PayU envia zero (0) como valor padrão.

### Autorização {#authorization}
Use este método para executar a etapa **Autorização** de um fluxo de duas etapas. Nesta etapa, você autoriza o pagamento, mas o valor não é debitado até você [capturar]({{< ref "#capture" >}}) the funds.

A seguir estão os corpos de pedido e resposta para este tipo de transação.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo de uma solicitação:
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
         "accountId": "512323",
         "referenceCode": "PRODUCT_TEST_2021-06-21T16:39:10.965Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "af24b22ad0aa0b14dbe3c21a07d9558c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 100,
               "currency": "PEN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Isabel La Católica 103-La Victoria",
               "street2": "5555487",
               "city": "Lima",
               "state": "Lima y Callao",
               "country": "PE",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "5555487",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
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
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "125544",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
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
      "paymentCountry": "PE",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": true
}
```
<br>

Exemplo de uma resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400443216,
        "transactionId": "eebf01c3-7531-4952-a8e8-647a9eebac95",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "000",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "77821",
        "authorizationCode": "170921",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado y completado con exito",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624275552379,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT"
        },
        "additionalInfo": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo de uma solicitação:
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
         <accountId>512323</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-21T16:39:10.965Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>af24b22ad0aa0b14dbe3c21a07d9558c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>100</value>
                  <currency>PEN</currency>
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
               <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>
               <city>Lima</city>
               <state>Lima y Callao</state>
               <country>PE</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>
            <city>Lima</city>
            <state>Lima y Callao</state>
            <country>PE</country>
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
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>
            <city>Lima</city>
            <state>Lima y Callao</state>
            <country>PE</country>
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
      <paymentCountry>PE</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>

```
<br>

Exemplo de uma resposta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400443244</orderId>
        <transactionId>62cb2c6a-a9d5-4438-a767-7be501f0973d</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>000</paymentNetworkResponseCode>
        <trazabilityCode>77821</trazabilityCode>
        <authorizationCode>170921</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Aprobado y completado con exito</responseMessage>
        <operationDate>2021-06-21T06:47:21</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

<!--
#### Zero Authorization
Zero Authorization allows you to validate a card without performing any charge or capture operation. Through this option, you can send an _Authorization_ request as explained before with `TX_VALUE` equals to 0 and you will receive the result of the card validation.

{{% alert title="Important" color="info"%}}
* Make sure your shop can create transactions with `TX_VALUE` equals to 0.
* This feature is not enabled by default, contact your sales representative to request it.
* _Zero Authorization_ is available for VISA and Mastercard cards only. For other franchises, send the transaction value greater than or equals to 1 PEN.
{{% /alert %}}

##### Beneficios {#benefits}
Utilizando _Zero Authorization_, tienes los siguientes beneficios:

* Free trial periods
* Increase trust and loyalty
* Increase your subscriber base
* Update credit card information
* Add several cards to an account
* Lower refunds
-->

### Captura {#capture}
Use este método para executar a etapa **Captura** de um fluxo de duas etapas. Nesta etapa, você captura os fundos [Autorizados]({{< ref "#authorization" >}}) anteriormente para transferi-los para sua conta PayU.

#### Observações {#considerations-1}
Leve em conta as seguintes informações para captura.
* Você pode realizar capturas parciais de um montante autorizado. Para fazer isso, você precisa enviar a solicitação do parâmetro `transaction.order.TX_VALUE` com seu valor (conforme enviado durante a Autorização).
* Para capturas parciais, o valor mínimo a capturar pode ser 10% inferior ao valor autorizado.
* Para capturas parciais, as redes de pagamento liberam o valor não capturado em 2 a 10 dias para cartões locais e 28 dias para cartões estrangeiros.

A seguir estão os corpos de pedido e resposta para este tipo de transação.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo de uma solicitação:
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
         "id": "1400443216"
      },
      "type": "CAPTURE",
      "parentTransactionId": "eebf01c3-7531-4952-a8e8-647a9eebac95"
   },
   "test": false
}
```
<br>

Exemplo de uma resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400443382,
        "transactionId": "e82d47b3-72cf-42f0-ae30-3eeb42575cc7",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "10140044338210c",
        "authorizationCode": "APPROVED",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624279912864,
        "referenceQuestionnaire": null,
        "additionalInfo": null
    }
}

```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo de uma solicitação:
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
         <id>1400443382</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>10ccdb41-3fa8-4961-b6c0-88d74f737d4e</parentTransactionId>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Exemplo de uma resposta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400443382</orderId>
        <transactionId>e82d47b3-72cf-42f0-ae30-3eeb42575cc7</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>10140044338210c</trazabilityCode>
        <authorizationCode>APPROVED</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>APPROVED</responseMessage>
        <operationDate>2021-06-21T07:51:52</operationDate>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Cobrança {#charge}
Use este método para executar um fluxo de uma etapa, ou seja, uma cobrança. Neste momento, as duas etapas do fluxo são combinadas em uma só transação, e os fundos são transferidos da conta do cliente para sua conta PayU, uma vez que tenham sido aprovados:

A seguir estão os corpos de pedido e resposta para este tipo de transação.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo de uma solicitação:
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
         "accountId": "512323",
         "referenceCode": "PRODUCT_TEST_2021-06-21T16:39:10.965Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "af24b22ad0aa0b14dbe3c21a07d9558c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 100,
               "currency": "PEN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Isabel La Católica 103-La Victoria",
               "street2": "5555487",
               "city": "Lima",
               "state": "Lima y Callao",
               "country": "PE",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "5555487",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
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
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "125544",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
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
      "paymentCountry": "PE",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": true
}
```
<br>

Exemplo de uma resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400443595,
        "transactionId": "acd8a1c6-fb44-497f-8fa5-de6136be4562",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "000",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "77821",
        "authorizationCode": "170921",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado y completado con exito",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624286793995,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT"
        },
        "additionalInfo": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo de uma solicitação:
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
         <accountId>512323</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-21T16:39:10.965Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>af24b22ad0aa0b14dbe3c21a07d9558c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>100</value>
                  <currency>PEN</currency>
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
               <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>
               <city>Lima</city>
               <state>Lima y Callao</state>
               <country>PE</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>
            <city>Lima</city>
            <state>Lima y Callao</state>
            <country>PE</country>
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
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>
            <city>Lima</city>
            <state>Lima y Callao</state>
            <country>PE</country>
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
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>VISA</paymentMethod>
      <paymentCountry>PE</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>


```
<br>

Exemplo de uma resposta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400443759</orderId>
        <transactionId>d7af220a-d427-486f-b35d-c363e12430e2</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>000</paymentNetworkResponseCode>
        <trazabilityCode>77821</trazabilityCode>
        <authorizationCode>170921</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>Aprobado y completado con exito</responseMessage>
        <operationDate>2021-06-21T10:49:30</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Enviar transações usando Yape {#submit-transactions-using-yape}

### Descrição
Yape é um aplicativo móvel criado pelo BCP (Banco de Crédito del Perú) que oferece uma carteira digital. O aplicativo permite aos usuários fazer compras online, pagar por serviços, recarregar, sacar fundos e enviar ou receber dinheiro de forma rápida e segura. O acesso a esta carteira digital não requer uma conta bancária; apenas o número de celular do pagador é necessário.

### Características e benefícios
Permitir pagamentos através do Yape em seu negócio oferece benefícios valiosos para você e seus clientes:

* **Mais vendas:** Atraia novos clientes e aumente as vendas graças aos milhões de clientes que possuem Yape.
* **Mais conveniência:** Os clientes podem fazer compras rápidas e fáceis usando seus telefones celulares.
* **Mais segurança:** Garanta transações seguras e confiáveis com o respaldo do BCP.

### Processo de pagamento com Yape

#### Pré-requisitos
Para realizar pagamentos, o usuário final precisa de 2 componentes:
* Número de telefone celular
* OTP (senha de uso único)

#### Experiência do Usuário
Uma compra através do Yape pode seguir o fluxo descrito abaixo:

1. O usuário acessa o site de compras ou aplicativo e seleciona o produto que deseja comprar. O site oferece ao usuário a opção de pagar através do Yape e solicita o número de telefone celular e um código de aprovação, por exemplo:

<img src="/assets/Payments/Yape01ES.png" alt="PrintScreen" width="250">
<p></p>

2. O usuário acessa o aplicativo Yape para obter o código de aprovação, por exemplo:

<img src="/assets/Payments/Yape02ES.png" alt="PrintScreen" width="250">
<p></p>

3. O usuário insere o código de aprovação e conclui facilmente o pagamento, por exemplo:

<img src="/assets/Payments/Yape03PT.png" alt="PrintScreen" width="500">
<p></p>

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-1}

<details>
<summary>Solicitação</summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:---:|
| language | Alfanumérico | 2 | Idioma usado na requisição, utilizado para mensagens de erro. | Sim |
| command | Alfanumérico | Máx:32 | Defina SUBMIT_TRANSACTION. | Sim |
| test (JSON) isTest (XML) | Booleano | | Defina verdadeiro se a requisição estiver em modo de teste, caso contrário, defina falso. | Sim |
| merchant | Objeto | | Dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pela PayU. | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32  | Senha fornecida pela PayU. | Sim |
| transaction | Objeto | | Dados da transação. | Sim |
| transaction > order | Objeto | | Dados do pedido. | Sim |
| transaction > order > accountId | Número | | Seu identificador de conta. | Sim |
| transaction > order > referenceCode | Alfanumérico | Mín:1 Máx:255 | Identificador do pedido em seu sistema. | Sim |
| transaction > order > description | Alfanumérico | Mín:1 Máx:255 | Descrição do pedido. | Sim |
| transaction > order > language | Alfanumérico | 2 | Idioma usado nos emails enviados para comprador e vendedor. | Sim |
| transaction > order > notifyUrl | Alfanumérico| Máx:2048 | URL de confirmação do pedido. | Não |
| transaction > order > partnerId | Alfanumérico| Máx:255 | ID do parceiro na PayU. | Não |
| transaction > order > signature | Alfanumérico| Máx:255 | Assinatura associada ao formulário. | Sim |
| transaction > order > shippingAddress | Objeto | | Endereço de entrega. | Não |
| transaction > order > shippingAddress > street1 | Alfanumérico | Máx:100 | Linha de endereço 1. | Não |
| transaction > order > shippingAddress > street2 | Alfanumérico | Máx:100 | Linha de endereço 2. | Não |
| transaction > order > shippingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço. | Não |
| transaction > order > shippingAddress > state | Alfanumérico | Máx:40 | Estado do endereço. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | País do endereço. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Máx:8 | Código postal do endereço. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. | Não |
| transaction > order > buyer | Objeto | | Informações sobre o comprador. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico| Máx:100 | ID do comprador em seu sistema. | Não |
| transaction > order > buyer > fullName | Alfanumérico| Máx:150 | Nome completo do comprador. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico| Máx:255 | Endereço de e-mail do comprador. | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico| Máx:20 | Número de telefone do comprador. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico| Máx:20 | Número de identificação do comprador. | Sim |
| transaction > order > buyer > shippingAddress | Alfanumérico| | Endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País do endereço de entrega do comprador no formato ISO 3166 alpha-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Número | Máx:20 | Código postal do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > phone | Número | Máx:20 | Número de telefone do endereço de entrega do comprador. | Sim |
| transaction > order > additionalValues | Objeto | 64 | Valor do pedido e seus valores associados. | Sim |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico| 64 | Valor da transação. | Sim |
| transaction > order > additionalValues > TX_VALUE > valor | Número | 12, 2 | Especifica o valor da transação. | Sim |
| transaction > order > additionalValues > TX_VALUE > moeda | Alfanumérico | 3 | Código ISO da moeda. | Não |
| transaction > order > additionalValues > TX_TAX | Alfanumérico| 64 | Valor do Imposto sobre Valor Agregado (IVA). | Sim |
| transaction > order > additionalValues > TX_TAX > valor | Número | 12, 2 | Especifica o valor do IVA. | Não |
| transaction > order > additionalValues > TX_TAX > moeda | Alfanumérico | 3 | Código ISO da moeda. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para cálculo do IVA. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > valor | Número | 12, 2 | Especifica o valor base da transação. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > moeda | Alfanumérico | 3 | Código ISO da moeda. Consulte as moedas aceitas. | Não |
| transaction > extraParameters > OTP | Alfanumérico| 6 | Código gerado no aplicativo Yape necessário para aprovar uma transação Yape (One Time Password). | |
| transaction > payer | Objeto | | Informações sobre o pagador. | Sim |
| transaction > payer > emailAddress | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| transaction > payer > merchantPayerId | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| transaction > payer > fullName | Alfanumérico | Máx:150 | Nome completo do pagador. | Sim |
| transaction > payer > billingAddress | Endereço de Cobrança. | | Endereço de cobrança do pagador. | Sim       |
| transaction > payer > billingAddress > street1 | Alfanumérico | Máx:100 | Linha 1 do endereço de cobrança. | Sim |
| transaction > payer > billingAddress > street2 | Alfanumérico | Máx:100 | Linha 2 do endereço de cobrança. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Sim |
| transaction > payer > billingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Sim |
| transaction > payer > billingAddress > postalCode| Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico| Máx:20 | Número de telefone do endereço de cobrança. | Não |
| transaction > payer > birthdate | Alfanumérico| Máx:10 | Data de nascimento do pagador. | Não |
| transaction > payer > contactPhone | Alfanumérico| Máx:20 | Número de telefone do pagador. Este é o número a ser usado para o pagamento Yape. | Sim |
| transaction > payer > dniNumber | Alfanumérico| Máx:20 | Número de identificação do pagador. | Sim |
| transaction > payer > dniType | Alfanumérico| 2 | Tipo de documento de identificação do pagador. Consulte tipos de documento. | Não |
| transaction > type | Alfanumérico| 32 | Defina este valor de acordo com a transação. Para a Colômbia, defina AUTORIZAÇÃO_E_CAPTURA. | Sim |
| transaction > paymentMethod | Alfanumérico| 32 | Defina YAPE para Método de Pagamento Yape. | Sim |
| transaction > paymentCountry | Alfanumérico| 2 | Defina PE para Peru. | Sim |
| transaction > deviceSessionId | Alfanumérico| Máx:255 | Identificador da sessão do dispositivo onde o cliente realiza a transação. | Sim |
| transaction > ipAddress | Alfanumérico| Máx:39 | Endereço IP do dispositivo onde o cliente realiza a transação. | Sim |
| transaction > cookie | Alfanumérico| Máx:255 | Cookie armazenado pelo dispositivo onde o cliente realiza a transação. | Sim |
| transaction > userAgent | Alfanumérico| Máx:1024| Agente do usuário do navegador onde o cliente realiza a transação. | Sim |

</details>

<details>
<summary> Resposta </summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|---|---|---|---|
| code | Alfanumérico | | O código de resposta da transação. Os valores possíveis são `ERRO` e `SUCESSO`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERRO`. |
| transactionResponse | Objeto | | Os dados da resposta. |
| transactionResponse > orderId | Número | | O ID do pedido gerado ou existente na PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | O identificador da transação na PayU. |
| transactionResponse > state | Alfanumérico| Máx:32 | O status da transação. |
| transactionResponse > responseCode | Alfanumérico| Máx:64 | O código de resposta associado ao status. |
| transactionResponse > pendingReason | Alfanumérico | Máx:64 | O motivo pendente da transação |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico| Máx:255  | O código de resposta retornado pela rede financeira. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Máx:255  | A mensagem de erro retornada pela rede financeira. |
| transactionResponse > trazabilityCode | Alfanumérico | Máx:32 | O código de rastreabilidade retornado pela rede financeira. |
| transactionResponse > authorizationCode | Alfanumérico | Máx:12 | O código de autorização retornado pela rede financeira. |
| transactionResponse > responseMessage | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| transactionResponse > operationDate | Data | | Data de criação da resposta no sistema da PayU. |
| transactionResponse > extraParameters | Objeto | | Parâmetros adicionais ou dados associados à resposta. Em JSON, o parâmetro extraParameters segue esta estrutura: "extraParameters": { "BANK_REFERENCED_CODE": "CREDIT"}No XML, o parâmetro extraParameters segue esta estrutura: <extraParameters> <entry> <string>BANK_REFERENCED_CODE</string> <string>CREDIT</string> </entry></extraParameters> |
| transactionResponse > additionalInfo | Objeto | | Informações adicionais associadas à resposta. Este objeto segue a mesma estrutura do que transactionResponse.extraParameters. |

</details>

### Chamada para a API {#api-call}
Os corpos de solicitação e de resposta para este método de pagamento são os seguintes:

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo de uma solicitação:
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
      "accountId": "512323",
      "referenceCode": "PRODUCT_TEST_2021-06-21T16:39:10.965Z",
      "description": "Payment test description",
      "language": "es",
      "signature": "af24b22ad0aa0b14dbe3c21a07d9558c",
      "notifyUrl": "http://www.payu.com/notify",
      "additionalValues": {
        "TX_VALUE": {
          "value": 100,
          "currency": "PEN"
        }
      },
      "buyer": {
        "merchantBuyerId": "1",
        "fullName": "First name and second buyer  name",
        "emailAddress": "buyer_test@test.com",
        "contactPhone": "7563126",
        "dniNumber": "123456789",
        "shippingAddress": {
          "street1": "Av. Isabel La Católica 103-La Victoria",
          "street2": "5555487",
          "city": "Lima",
          "state": "Lima y Callao",
          "country": "PE",
          "postalCode": "000000",
          "phone": "7563126"
        }
      },
      "shippingAddress": {
        "street1": "Av. Isabel La Católica 103-La Victoria",
        "street2": "5555487",
        "city": "Lima",
        "state": "Lima y Callao",
        "country": "PE",
        "postalCode": "0000000",
        "phone": "7563126"
      }
    },
    "extraParameters": {
      "OTP": "557454"
    },    
    "payer": {
      "merchantPayerId": "1",
      "fullName": "First name and second payer name",
      "emailAddress": "payer_test@test.com",
      "contactPhone": "969929157",
      "dniNumber": "5415668464654",
      "billingAddress": {
        "street1": "Av. Isabel La Católica 103-La Victoria",
        "street2": "125544",
        "city": "Lima",
        "state": "Lima y Callao",
        "country": "PE",
        "postalCode": "000000",
        "phone": "7563126"
      }
    },
    "type": "AUTHORIZATION_AND_CAPTURE",
    "paymentMethod": "YAPE",
    "expirationDate": "2021-06-22T19:51:20.302",
    "paymentCountry": "PE",
    "ipAddress": "127.0.0.1"
  },
  "test": true
}
```
<br>

Exemplo de uma resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 2151156450,
        "transactionId": "70149315-677f-4bc0-9f59-a1de47ef4f7e",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "437",
        "authorizationCode": "160105",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "Aprobado y completado con exito",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1706024870610,
        "referenceQuestionnaire": null,
        "extraParameters": null,
        "additionalInfo": null
    }
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo de uma solicitação:
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
         <accountId>512323</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-21T16:39:10.965Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>af24b22ad0aa0b14dbe3c21a07d9558c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>100</value>
                  <currency>PEN</currency>
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
               <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>            
               <city>Lima</city>
               <state>Lima y Callao</state>               
               <country>PE</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>            
               <city>Lima</city>
               <state>Lima y Callao</state>               
               <country>PE</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <extraParameters>
         <OTP>557454</OTP>
      </extraParameters>
      <payer>
         <billingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>            
            <city>Lima</city>
            <state>Lima y Callao</state>               
            <country>PE</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
         <contactPhone>969929157</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <emailAddress>payer_test@test.com</emailAddress>
         <fullName>First name and second payer name</fullName>
         <merchantPayerId>1</merchantPayerId>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>YAPE</paymentMethod>
      <expirationDate>2021-06-16T16:07:11</expirationDate>
      <paymentCountry>PE</paymentCountry>
      <ipAddress>127.0.0.1</ipAddress>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Exemplo de uma resposta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>2151156450</orderId>
        <transactionId>70149315-677f-4bc0-9f59-a1de47ef4f7e</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>437</trazabilityCode>
        <responseCode>APPROVED</responseCode>
        <authorizationCode>160105</authorizationCode>        
        <responseMessage>Aprobado y completado con exito</responseMessage>
        <operationDate>2024-01-19T08:17:42</operationDate>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Considerações
* Os pagamentos processados através do nosso gateway serão feitos em nome do seu negócio pela PayU.
* O valor máximo que os pagadores podem processar com o Yape é de 950 sóis acumulados por dia.
* Para verificar um código ativo para a sua transação, utilize a [API de Consultas](https://developers.payulatam.com/latam/pt/docs/integrations/api-integration/queries-api.html).
* O Yape suporta reembolsos totais, reembolsos parciais e cancelamentos.
* Integrações de API contendo espaços no número de telefone podem resultar em perda de transação. Abaixo estão os casos que podem ser aprovados ou podem gerar erros:
    * **Caso aprovado 1:** `51` `969929157` → O código do país e o número de telefone estão separados.
    * **Caso aprovado 2:** `969929157` → Há um único campo para o número de telefone sem espaços.
    * **Caso de erro 1:** `51969929157` → O código do país e o número de telefone estão no mesmo campo.
    * **Caso de erro 2:** `51` `969` `929157` → O número de telefone é separado por espaços.
    <p></p>

    Portanto, para evitar erros e melhorar a experiência do usuário, recomendamos o seguinte:
    1. Utilize um único campo para o número de telefone que inclua automaticamente o código do país, ou exiba dois campos separados na interface: um para o código do país e outro para o número de telefone.
    2. Configure a interface para aceitar um máximo de 9 dígitos e exibir uma mensagem ao usuário informando que o número de telefone digitado deve consistir em 9 dígitos.
    3. Configure a interface para evitar espaços ou removê-los automaticamente, ou exiba uma mensagem ao usuário instruindo-o a inserir o número sem espaços.

### Testando no ambiente de sandbox 
Para testar transações com Yape no ambiente de Sandbox da PayU, utilize os seguintes dados:

<table border="1"> 
<tr> 
<th colspan="2"><h5>Casos de teste</h5></th>
<th colspan="3"><h5>Resposta da PayU</h5></th>  
</tr> 
 
<tr> 
<td><b>transaction > payer > contactPhone</b></td> 
<td><b>transaction > extraParameters > OTP</b></td> 
<td><b>state</b></td> 
<td><b>responseCode</b></td> 
<td><b>responseMessage</b></td> 
</tr>

<tr> 
<td>969929157</td> 
<td>557454</td> 
<td>APPROVED</td> 
<td>APPROVED</td> 
<td>Aprovado e concluído com sucesso.</td> 
</tr>

<tr> 
<td>969929157</td> 
<td>000000</td> 
<td>DECLINED</td> 
<td>INVALID_TRANSACTION</td> 
<td>Operação negada. OTP incorreto.</td> 
</tr>

<tr> 
<td>999999999</td> 
<td>284563</td> 
<td>DECLINED</td> 
<td>NOT_ACCEPTED_TRANSACTION</td> 
<td>Operação negada. Conta inativa.</td> 
</tr>

<tr> 
<td>993355231</td> 
<td>784592</td> 
<td>DECLINED</td> 
<td>PAYMENT_NETWORK_REJECTED</td> 
<td>Operação negada. Conta não permitida.</td> 
</tr>

<tr> 
<td>969929157</td> 
<td>285743</td> 
<td>DECLINED</td> 
<td>EXCEEDED_AMOUNT</td> 
<td>Limite diário excedido.</td> 
</tr>

<tr> 
<td>991055199</td> 
<td>378458</td> 
<td>DECLINED</td> 
<td>INVALID_TRANSACTION</td> 
<td>Operação negada. OTP bloqueado.</td> 
</tr>

<tr> 
<td>995555126</td> 
<td>678452</td> 
<td>DECLINED</td> 
<td>INVALID_TRANSACTION</td> 
<td>Operação negada. Conta não associada ao programa.</td> 
</tr>

<tr> 
<td>969929158</td> 
<td>528475</td> 
<td>DECLINED</td> 
<td>REPEAT_TRANSACTION</td> 
<td>Erro: código Yape incorreto.</td> 
</tr>

<tr> 
<td>969929158</td> 
<td>074854</td> 
<td>DECLINED</td> 
<td>REPEAT_TRANSACTION</td> 
<td>Erro: código Yape incorreto.</td> 
</tr>

<tr> 
<td>969929158</td> 
<td>875612</td> 
<td>DECLINED</td> 
<td>NOT_ACCEPTED_TRANSACTION</td> 
<td>Erro: código Yape incorreto.</td> 
</tr>

</table>

## Enviar transação em dinheiro {#submit-transactions-using-cash}
Este método permite processar os pagamentos de seus clientes em dinheiro. Para integrar com transações em dinheiro, você deve redirecionar o cliente para a URL encontrada na resposta do método; Seu cliente verá um recibo de pagamento como este.

<img src="/assets/Payments/CashReceiptPE.png" alt="PrintScreen" width="400">

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
| transaction > order > additionalValues > TX_VALUE > value | Número | 12, 2 | Especifica o valor da transação. Este valor pode ter duas casas decimais (por exemplo `10000.00` ou `10000`). | Sim |
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
| transaction > payer > billingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Sim |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Sim |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| transaction > payer > birthdate | Alfanumérico | Máx:10 | Data de nascimento do pagador. | Não |
| transaction > payer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do pagador. | Sim |
| transaction > payer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do pagador. | Sim |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > type | Alfanumérico | 32 | Como os pagamentos em dinheiro são feitos em escritórios físicos, o único tipo de transação disponível é `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Selecione um método de pagamento válido em dinheiro. [Veja os métodos de pagamento disponíveis o Peru]({{< ref "select-your-payment-method.html#Peru" >}}). |
| transaction > paymentCountry | Alfanumérico | 2 | Definir `PE` para o Peru. | Sim |
| transaction > expirationDate | Alfanumérico | 23 | Data e hora máximas que o pagador tem para efetuar o pagamento. Formato `YYYY-MM-DDTHH:MM:SS`, por exemplo `2021-06-12T16:07:11.586`. | Não |
| transaction > ipAddress | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |

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
| transactionResponse > responseCode | Alfanumérico | Máx:64 | O código de resposta associado ao status. Neste caso, para transações bem-sucedidas é `PENDING_TRANSACTION_CONFIRMATION`. |
| transactionResponse > responseMessage | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| transactionResponse > operationDate | Date |  | Data de criação da resposta no sistema PayU. |
| transactionResponse > extraParameters | Objeto |  | Parâmetros ou dados adicionais associados à resposta.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"REFERENCE": "74794"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>REFERENCE</string>`<br>&emsp;&emsp;`<int>74794</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Observações {#considerations-2}
* O parâmetro `transaction.expirationDate` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de 7 dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* Em pagamentos em dinheiro, os seguintes parâmetros são obrigatórios:
   - `transaction.order.buyer.fullName`
   - `transaction.payer.fullName`
   - `transaction.payer.emailAddress` ou `transaction.order.buyer.emailAddress`.
* O parâmetro `transactionResponse.extraParameters` tem os seguintes parâmetros relacionados à transação:
   - **REFERENCE**: referência interna de pagamento gerada pelo PayU.
   - **EXPIRATION_DATE**: prazo máximo para o pagador fazer o pagamento.
   - **BAR_CODE**: código de barras que permite ao pagador efetuar o pagamento. 
   - **URL_PAYMENT_RECEIPT_HTML**: comprovante de pagamento em formato HTML. É para cá que você precisa redirecionar o pagamento quando o pagador seleciona o pagamento em dinheiro. 
   - **URL_PAYMENT_RECEIPT_PDF**: comprovante de pagamento em formato PDF.

### Chamada para a API {#api-call-1}
A seguir estão o corpo do pedido e da resposta deste meio de pagamento.

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo de uma solicitação:
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
         "accountId": "512323",
         "referenceCode": "PRODUCT_TEST_2021-06-21T16:39:10.965Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "af24b22ad0aa0b14dbe3c21a07d9558c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 100,
               "currency": "PEN"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer  name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av. Isabel La Católica 103-La Victoria",
               "street2": "5555487",
               "city": "Lima",
               "state": "Lima y Callao",
               "country": "PE",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "5555487",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
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
            "street1": "Av. Isabel La Católica 103-La Victoria",
            "street2": "125544",
            "city": "Lima",
            "state": "Lima y Callao",
            "country": "PE",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
	  "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "PAGOEFECTIVO",
      "expirationDate": "2021-06-22T19:51:20.302",
      "paymentCountry": "PE",
      "ipAddress": "127.0.0.1"
   },
   "test": true
}
```
<br>

Exemplo de uma resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 857804123,
        "transactionId": "fd685f0a-f5b2-40cf-9527-dcc85febe184",
        "state": "PENDING",
        "paymentNetworkResponseCode": "Se ha Generado el CIP: 00000002592100 .",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "2592100",
        "authorizationCode": "1",
        "pendingReason": "AWAITING_NOTIFICATION",
        "responseCode": "PENDING_TRANSACTION_CONFIRMATION",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": null,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "REFERENCE": 857804123,
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857804123Yfd685f0af5b240cYd231ed8660a7c9a",
            "EXPIRATION_DATE": 1624391480302,
            "BAR_CODE": "2592100",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857804123Yfd685f0af5b240cYd231ed8660a7c9a"
        },
        "additionalInfo": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo de uma solicitação:
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
         <accountId>512323</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-21T16:39:10.965Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>af24b22ad0aa0b14dbe3c21a07d9558c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>100</value>
                  <currency>PEN</currency>
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
               <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>            
               <city>Lima</city>
               <state>Lima y Callao</state>               
               <country>PE</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
               <street2>5555487</street2>            
               <city>Lima</city>
               <state>Lima y Callao</state>               
               <country>PE</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <billingAddress>
            <street1>Av. Isabel La Católica 103-La Victoria</street1>
            <street2>5555487</street2>            
            <city>Lima</city>
            <state>Lima y Callao</state>               
            <country>PE</country>
            <postalCode>000000</postalCode>
            <phone>7563126</phone>
         </billingAddress>
         <contactPhone>7563126</contactPhone>
         <dniNumber>5415668464654</dniNumber>
         <emailAddress>payer_test@test.com</emailAddress>
         <fullName>First name and second payer name</fullName>
         <merchantPayerId>1</merchantPayerId>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>PAGOEFECTIVO</paymentMethod>
      <expirationDate>2021-06-16T16:07:11</expirationDate>
      <paymentCountry>PE</paymentCountry>
      <ipAddress>127.0.0.1</ipAddress>
   </transaction>
   <isTest>false</isTest>
</request>

```
<br>

Exemplo de uma resposta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>857804131</orderId>
        <transactionId>185f578b-2247-4a28-85b9-128c7b90c989</transactionId>
        <state>PENDING</state>
        <paymentNetworkResponseCode>Se ha Generado el CIP: 00000002592102 .</paymentNetworkResponseCode>
        <trazabilityCode>2592102</trazabilityCode>
        <authorizationCode>1</authorizationCode>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <extraParameters>
            <entry>
                <string>REFERENCE</string>
                <int>857804131</int>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857804131Y185f578b22474a2Y11601e067841b94</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-28T23:59:59</date>
            </entry>
            <entry>
                <string>BAR_CODE</string>
                <string>2592102</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857804131Y185f578b22474a2Y11601e067841b94</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Consulta de métodos de pagamento disponíveis {#available-payment-methods-query}
Este método gera uma lista dos métodos de pagamento disponíveis em todos os países.

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-2}

<details>
<summary>Solicitação</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). |
| command | Alfanumérico | Máx:32 | Definir `GET_PAYMENT_METHODS`. |
| test (JSON)<hr>isTest (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | 
| merchant | Objeto |  | Este objeto contém os dados de autenticação. |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) |

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

### Chamada para a API {#api-call-2}
A seguir estão os corpos do pedido e resposta deste método. Para fins de exemplo, a solicitação e a resposta aqui mostram dois métodos de pagamento. 

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo de uma solicitação:
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

Exemplo de uma resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "paymentMethods": [
        {
            "id": "258",
            "description": "DINERS",
            "country": "PE",
            "enabled": true,
            "reason": null
        },
        {
            "id": "1067",
            "description": "VISA",
            "country": "PE",
            "enabled": true,
            "reason": null
        }
    ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo de uma solicitação:
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

Exemplo resposta:
```XML
<paymentMethodsResponse>
    <code>SUCCESS</code>
    <paymentMethods>
        <paymentMethodComplete>
            <id>258</id>
            <description>DINERS</description>
            <country>PE</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>1067</id>
            <description>VISA</description>
            <country>PE</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
    </paymentMethods>
</paymentMethodsResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Ping
O método `PING` permite que você confirme a conexão com a nossa plataforma.

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-3}

<details>
<summary>Solicitação</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). |
| command | Alfanumérico | Máx:32 | Definir `PING`. |
| test (JSON)<hr>isTest (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | 
| merchant | Objeto |  | Este objeto contém os dados de autenticação. |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | O código de resposta da transação. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada, caso tenha ocorrido um erro. |
| transactionResponse |  | Máx:2048 | A resposta do método PING caso tenha ocorrido um erro. |
</details>

### Chamada para a API {#api-call-3}
A seguir estão os corpos do pedido e resposta deste método.

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo de uma solicitação:
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

Exemplo de uma resposta:
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

Exemplo de uma solicitação:
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

Exemplo de uma resposta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}
