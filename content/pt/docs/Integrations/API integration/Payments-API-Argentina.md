---
title: "API de Pagamentos - Argentina"
linkTitle: "API de Pagamentos - Argentina"
date: 2021-05-03T15:48:08-05:00
description: >
  A API de Pagamentos para a Argentina permite que você integre de forma eficiente as capacidades de processamento de pagamentos da PayU na sua plataforma de compras online. Por meio dessa API, as lojas podem oferecer aos seus clientes uma ampla variedade de métodos de pagamento, incluindo dinheiro, cartões de crédito e cartões de débito.
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

* [Enviar transações usando cartões de crédito ou débito]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}})
* [Enviar transações usando dinheiro]({{< ref "Payments-API-Argentina.md#submit-transactions-using-cash" >}})
* [Incluir informações do registro de nome de passageiro]({{< ref "#include-passenger-name-record-information-optional" >}})
* [Consulta de métodos de pagamento disponíveis]({{< ref "Payments-API-Argentina.md#available-payment-methods-query" >}})
* [Ping]({{< ref "Payments-API-Argentina.md#ping" >}})

{{% alert title="Nota" color="info"%}}

Para confirmar o status de uma transação, você pode usar:
* Navegue até a URL definida na variável `transaction.notifyUrl` ou na opção _**URL de confirmação**_ localizada no Módulo PayU em _**Configuração**_ > _**Configuração técnica**_.
* Use o [API ou SDK de Consultas]({{< ref "Queries.md" >}}).

{{% /alert %}}

## Enviar transações usando cartões de crédito ou débito {#submit-transactions-using-credit-or-debit-cards}

Este método permite processar os pagamentos efetuados pelos seus clientes com cartões de crédito ou débito. Para a Argentina, você pode executar os fluxos de duas etapas, você pode executar os fluxos de duas etapas (**Autorização**, **Captura**) e fluxos de uma etapa (**Cobrança**). Para obter mais informações, consulte [Fluxos de pagamento]({{< ref "payments.md#payment-flows" >}}).

### Usando cartões tokenizados

A PayU suporta pagamentos com seu cartão tokenizado, permitindo que você faça pagamentos regulares com um cartão armazenado em um token. Um token de cartão de crédito substitui as informações sensíveis de um cartão de crédito, permitindo que você as armazene com segurança em conformidade com os padrões de segurança PCI DSS (Payment Card Industry Data Security Standard).

A PayU pode processar pagamentos usando os seguintes serviços:

* **Tokenização PayU**.<br>Oferecemos nosso próprio serviço para tokenizar seus cartões de crédito mediante solicitação. Este serviço permite tokenizar as informações dos cartões de crédito de seus clientes (independentemente de sua bandeira) usando nossa integração API ou SDK.<br><br>Para mais informações, consulte [Tokenização PayU]({{< ref "Tokenization.md" >}}).

* **MasterCard Digital Enablement Service - MDES**.<br>Um serviço de tokenização fornecido pela Mastercard. Este serviço permite tokenizar o Número da Conta Principal dos cartões de crédito MasterCard, permitindo que você os use para pagamentos regulares ou para criar recursos de pagamento com um clique.<br><br>Para mais informações, consulte [MasterCard Digital Enablement Service (MDES)](https://developer.mastercard.com/mdes-digital-enablement/documentation/).

* **Visa Token Service - VTS**.<br>Um serviço de tokenização fornecido pela Visa. Este serviço permite armazenar as informações sensíveis dos cartões de crédito Visa em um token, permitindo que você os use para pagamentos regulares ou para criar recursos de pagamento com um clique.<br><br>Para mais informações, consulte [Visa Token Service (VTS)](https://usa.visa.com/products/visa-token-service.html).

#### Pagar com tokens da PayU

Para fazer pagamentos usando tokens de cartões de crédito da PayU, inclua o parâmetro `transaction.creditCardTokenId` no lugar das informações do cartão de crédito.

O exemplo a seguir mostra o corpo da solicitação em um nível alto para um fluxo de um passo. Não inclui os parâmetros da solicitação.

{{% alert title="Nota" color="info"%}}

Para processar um pagamento sem o CVV, você deve definir o parâmetro `creditCard.processWithoutCvv2` como `true` na solicitação de pagamento e omitir o parâmetro `creditCard.securityCode`.<br>
Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Para habilitar esse recurso, entre em contato com seu representante de vendas.

{{% /alert %}}

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
         "Information of the order":""
      },
      "payer": {
         "Information of the payer":""
      },
      "creditCardTokenId": "46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3",
      "creditCard": {
         "securityCode": "123"
      },
      "extraParameters": {
         "Extra parameters of the request":""
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "Card franchise", 
      "paymentCountry": "Processing country",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": true
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
         <!-- Information of the order -->
      </order>
      <payer>
         <!-- Information of the payer -->
      </payer>
      <creditCardTokenId>46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3</creditCardTokenId>
      <creditCard>
         <securityCode>321</securityCode>
      </creditCard>
      <extraParameters>
         <!-- Extra parameters of the request -->
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>{Card franchise}</paymentMethod>
      <paymentCountry>{Processing country}</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>

```

{{< /tab >}}
{{< /tabs >}}

#### Pagar com Tokens MDES ou VTS

Se você estiver tokenizando os cartões de crédito de seus clientes usando MDES ou VTS, pode configurar as informações do token no parâmetro `transaction.networkToken`, substituindo as informações do cartão de crédito, e definir o parâmetro `creditCard.processWithoutCvv2` como `true`.

Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Entre em contato com seu representante de vendas para habilitar esse recurso.

O exemplo a seguir demonstra o corpo da solicitação em um nível alto para um fluxo de um passo. Não inclui os parâmetros da solicitação.

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
         "Information of the order":""
      },
      "payer": {
         "Information of the payer":""
      },
      "networkToken": {
          "tokenPan": "4097440000000004",
          "cryptogram": "11223344556677889900112233445566778899",
          "expiry": "2028/01"
      },
      "extraParameters": {
         "Extra parameters of the request":""
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "Card franchise", 
      "paymentCountry": "Processing country",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": true
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
         <!-- Information of the order -->
      </order>
      <payer>
         <!-- Information of the payer -->
      </payer>
      <networkToken>
         <tokenPan>4097440000000004</tokenPan>
         <cryptogram>11223344556677889900112233445566778899</cryptogram>
         <expiry>2028/01</expiry>
      </networkToken>
      <extraParameters>
         <!-- Extra parameters of the request -->
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>{Card franchise}</paymentMethod>
      <paymentCountry>{Processing country}</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>

```

{{< /tab >}}
{{< /tabs >}}
<br>

Encontre a descrição do objeto `transaction.networkToken` e seus parâmetros na seção [Parâmetros]({{< ref "#parameters-for-request-and-response" >}}).

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
| `transaction > order > additionalValues` | Objeto | 64 | Valor da ordem ou seus valores associados. | Sim |
| `transaction > order > additionalValues > TX_VALUE` | Alfanumérico | 64 | Valor da transação. | Sim |
| `transaction > order > additionalValues > TX_VALUE > value` | Número | 12, 2 | Especifica o valor da transação. Este valor pode ter duas casas decimais (por exemplo `10000.00` ou `10000`). | Sim |
| `transaction > order > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| `transaction > order > additionalValues > TX_TAX` | Alfanumérico | 64 | Total do Imposto sobre Valor Agregado (IVA). | Sim |
| `transaction > order > additionalValues > TX_TAX > value` | Número | 12, 2 | Especifica o valor do IVA.  | Não |
| `transaction > order > additionalValues > TX_TAX > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE` | Alfanumérico | 64 | Valor base para cálculo do IVA.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais.  | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > value` | Número | 12, 2 | Especifica o valor base da transação. | Não |
| `transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency` | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| `transaction > creditCardTokenId` | Alfanumérico |  | Incluir este parâmetro quando a transação for feita com um cartão tokenizado, no lugar das informações do cartão de crédito. Para obter mais informações, consulte [API de tokenização]({{< ref "Tokenization-API.md" >}}) | Não |
| `transaction > creditCard` | Objeto |  | Informações do cartão de crédito. Se você processar usando cartão de débito, não envie este parâmetro.<br>Este objeto e seus parâmetros são obrigatórios quando o pagamento é realizado com cartão de crédito não tokenizado. | Não |
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
| `transaction > payer` | Objeto |  | Informações do pagador. Na Argentina, para cumprir com as regulamentações fiscais e garantir o cálculo correto dos impostos, você deve enviar o endereço de cobrança do pagador (`transaction.payer.billingAddress`), o tipo de documento (`transaction.payer.dniType`) e o número do documento (`transaction.payer.dniNumber`). A ausência dessas informações pode impedir a aplicação correta dos impostos. | Sim |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Não |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 |Nome do pagador que deve corresponder ao nome enviado no parâmetro `creditCard.name` para pagamentos com cartão de crédito| Sim |
| `transaction > payer > billingAddress` | Objeto |  | Na Argentina, o envio do endereço de cobrança completo é obrigatório para cumprir com as regulamentações fiscais locais. | Sim |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Linha 1 do endereço de cobrança. Obrigatório na Argentina para cumprir com as regulamentações fiscais. | Sim |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. Obrigatório na Argentina para cumprir com as regulamentações fiscais. | Sim |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Província do endereço de cobrança. Formato [ISO 3166-2 ARG oficial](https://www.iso.org/obp/ui/#iso:code:3166:AR). Na Argentina, este campo é obrigatório para o cálculo de impostos. | Sim |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Sim |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Data de nascimento do pagador. | Não |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do pagador. | Não |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do pagador. Na Argentina, este campo é obrigatório para o cálculo de impostos. O número deve ser válido para o país (exemplo: `CUIT`: 27-28033514-8, `CUIL`: 20-12345678-9, `DNI`: 45678901). | Sim |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificação do pagador. [Ver tipos de documento]({{< ref "response-codes-and-variables.html#document-types" >}}). Na Argentina, este campo é obrigatório para o cálculo de impostos. Use `CUIT` ou `CUIL` como tipo de documento (outros tipos são aceitos, mas não são recomendados para fins fiscais). | Sim |
| `transaction > type` | Alfanumérico | 32 | Definir este valor de acordo com a transação que você quer:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` para fluxos de uma etapa.</li></ul> | Sim |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecione um método de pagamento com cartão de crédito ou débito válido. [Veja os métodos de pagamento disponíveis na Argentina]({{< ref "select-your-payment-method.html#Argentina" >}}). | Sim |
| `transaction > paymentCountry` | Alfanumérico | 2 | Definir `AR` para a Argentina. | Sim |
| `transaction > deviceSessionId` | Alfanumérico | Máx:255 | Identificador da sessão do dispositivo onde o cliente faz a transação. Para obter mais informações, consulte [este tópico]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| `transaction > ipAddress` | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |
| `transaction > cookie` | Alfanumérico | Máx:255 | Cookie armazenado pelo dispositivo onde o cliente faz a transação. | Sim |
| `transaction > userAgent` | Alfanumérico | Máx:1024 | O agente do usuário do navegador onde o cliente faz a transação. | Sim |
| `transaction > extraParameters` | Objeto |  | Parâmetros ou dados adicionais associados a pedido. O tamanho máximo de cada nome _extraParameters_ é de 64 caracteres.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | Não |
| `transaction > threeDomainSecure` | Objeto |  | Este objeto contém as informações do 3DS 2.0. | Não |
| `transaction > threeDomainSecure > embedded` | Boolean |  | Definir `true` se você deseja usar um MPI integrado para o processo de autorização. Por padrão, este valor é definido como `false`. | Não |
| `transaction > threeDomainSecure > eci` | Número | Máx:2 | Indicador de comércio eletrônico.<br>Valor fornecido pelos servidores de diretório mostrando a tentativa de autenticação.<br>Este parâmetro é obrigatório quando `transaction.threeDomainSecure.embedded` is `false` e `transaction.threeDomainSecure.xid` for definido. | Não |
| `transaction > threeDomainSecure > cavv` | Alfanumérico | Máx:28 | Valor de verificação de autenticação do titular do cartão.<br>Código do criptograma usado na autenticação da transação em Base64.<br>Dependendo dos códigos ECI específicos estabelecidos pela rede de processamento, este valor pode ser opcional. | Não |
| `transaction > threeDomainSecure > xid` | Alfanumérico | Máx:28 | Código do criptograma usado na autenticação da transação em Base64.<br>Este parâmetro é obrigatório quando `transaction.threeDomainSecure.embedded` é `false` e `transaction.threeDomainSecure.eci` for definido. | Não |
| `transaction > threeDomainSecure > directoryServerTransactionId` | Alfanumérico | Máx:36 | ID da transação gerada pelo Servidor de Diretório durante a autenticação. | Não |

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
| `transactionResponse > additionalInfo` | Objeto | | Informações adicionais associadas à resposta. Este objeto segue a mesma estrutura que `transactionResponse.extraParameters`. |
| `transactionResponse > additionalInfo > rejectionType` | Alfanumérico | Máx: 4 | Indica a categoria da recusa. Valores possíveis: `SOFT` ou `HARD`. Para mais informações, consulte [Considerações]({{< ref "Payments-API-Argentina.md#considerations" >}}). |

</details>

#### Observações {#considerations}

* **Tratamento de Recusas (`rejectionType`):** Este recurso aplica-se apenas a transações de `AUTHORIZATION` e `AUTHORIZATION_AND_CAPTURE`. Quando uma transação é recusada, o campo `additionalInfo.rejectionType` ajuda a determinar a estratégia de reativação (reentrada):
    * **HARD**: Indica uma recusa permanente. De acordo com as regulamentações das bandeiras, **o lojista não deve tentar a transação novamente** usando os mesmos dados do cartão. Reclamações frequentes de recusas "Hard" podem resultar em penalidades ou multas das redes financeiras.
    * **SOFT**: Indica um problema temporário (ex: saldo insuficiente). A transação pode ser tentada novamente em um momento posterior.
* Para pagamentos com Promoções, envie os parâmetros `INSTALLMENTS_NUMBER` e `PROMOTION_ID` com o número de parcelas selecionadas e o ID da promoção. Consultar a [API de promoções]({{< ref "Promotions.md" >}}) para obter mais informações.
* O recurso de promoções está disponível apenas para [fluxos de uma etapa]({{< ref "Payments.md#payment-flows" >}}).
* Para pagamentos com tokens de cartão de crédito, inclua os parâmetros `transaction.creditCardTokenId` e `transaction.creditCard.securityCode` (se processar com código de segurança) substituindo as informações do cartão de crédito. Para obter mais informações, consulte [API de tokenização]({{< ref "Tokenization-API.md" >}}).
* Para pagamentos com tokens de cartão de crédito gerados utilizando MDES ou VTS, inclua o objeto `transaction.networkToken` e seus parâmetros.
* Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas. Depois que esse recurso for habilitado para você, envie no pedido a variável `creditCard.processWithoutCvv2` como true e remova a variável `creditCard.securityCode`.
* Ao usar cartões de crédito, leve em conta as considerações devidas às regulamentações argentinas para a página de check-out.
* Devido à regulamentação tributária, é obrigatório o envio dos parâmetros `payer.billingAddress.state` usando formato [ISO 3166-2 ARG oficial](https://www.iso.org/obp/ui/#iso:code:3166:AR) e `payer.dnitype`.
* A variável `transaction.threeDomainSecure` não substitui as informações do cartão nem qualquer um dos campos obrigatórios da transação. Este objeto é adicional e não obrigatório.
* A variável `transaction.threeDomainSecure` corresponde a um cenário _passthrough_ onde a loja faz a autenticação por conta própria.

<details>
      <summary><strong>Consideração especial sobre regulamentações fiscais</strong></summary>      
      <p>Para cumprir com as regulamentações da autoridade fiscal da Argentina e garantir o cálculo correto dos impostos, é obrigatório incluir os seguintes campos na solicitação:</p>
      <ul>
        <li><strong>Endereço de cobrança:</strong> (<code>transaction.payer.billingAddress</code>).</li>
        <ul>
        <li><strong>Província:</strong> (<code>transaction.payer.billingAddress.state</code>). Deve seguir o formato <a href="https://www.iso.org/obp/ui/#iso:code:3166:AR" target="_blank" rel="noopener noreferrer">ISO 3166-2 ARG oficial</a>.</li>
        </ul>      
      <li><strong>Tipo de documento:</strong> (<code>transaction.payer.dniType</code>). Use <code>CUIT</code> ou <code>CUIL</code> como tipos preferenciais (outros tipos são aceitos, mas não são recomendados para fins fiscais).</li>      
      <li><strong>Número do documento:</strong> (<code>transaction.payer.dniNumber</code>). Deve ser um número de identificação válido para a Argentina (exemplos: <code>CUIT</code> <code>27-28033514-8</code>, <code>CUIL</code> <code>20-12345678-9</code>, <code>DNI</code> <code>45678901</code>).</li>
      </ul>     
</details>

<details>
      <summary><strong>Consideração especial para cartões Naranja</strong></summary>
      <p><strong>Consideração especial:</strong> Cartões de crédito Naranja X (BIN 589562)</p>
      <p>Os cartões de crédito Naranja X apresentam um comportamento específico no processo de validação do número do cartão (OCR):</p>
      <ul>
        <li><strong>Até 17 de abril de 2023:</strong> Os cartões físicos eram emitidos utilizando o algoritmo Luhn 11 para o dígito verificador.</li>
        <li><strong>Atualmente:</strong> Todos os novos cartões são emitidos utilizando o algoritmo padrão Luhn 10.</li>
      </ul>
      <p><strong>Status atual:</strong></p>
      <ul>
        <li>Mais de 80% dos cartões físicos ativos já utilizam Luhn 10.</li>
        <li>Uma pequena porcentagem ainda opera com Luhn 11, que será gradualmente descontinuado à medida que os cartões forem renovados.</li>
        <li>Todos os cartões virtuais Naranja X no aplicativo já utilizam Luhn 10.</li>
      </ul>
      <p><strong>Recomendações para os integradores:</strong></p>
      <ul>        
        <li>Implementar validação dupla para o BIN 589562, aceitando os algoritmos Luhn 10 e Luhn 11.</li>
        <li>Como alternativa, ignorar a validação do dígito verificador para esse BIN específico e validar apenas o número do BIN.</li>
      </ul>
      <p>Essas opções ajudam a evitar recusas desnecessárias em transações válidas que ainda utilizam o algoritmo Luhn 11.</p>
    </details>

### Autorização {#authorization}

Use este método para executar a etapa **Autorização** de um fluxo de duas etapas. Nesta etapa, você autoriza o pagamento, mas o valor não é debitado até você [capturar]({{< ref "#capture" >}}) os fundos.<br>A seguir estão os corpos de pedido e resposta para este tipo de transação.

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
         "accountId": "512322",
         "referenceCode": "PRODUCT_TEST_2021-06-10T20:25:15.868Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "1ffceb14a71948fdeaba5aef81b8e511",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "ARS"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av Centenario 837",
               "street2": "5555487",
               "city": "San Isidro",
               "state": "AR-B",
               "country": "AR",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av Centenario 837",
            "street2": "5555487",
            "city": "San Isidro",
            "state": "AR-B",
            "country": "AR",
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
            "street1": "Av Centenario 837",
            "street2": "125544",
            "city": "San Isidro",
            "state": "AR-B",
            "country": "AR",
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
      "paymentCountry": "AR",
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
        "orderId": 1400421560,
        "transactionId": "db9d9d7f-b62c-4ed2-a3b9-d146d33bdaf5",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "db9d9d7f-b62c-4ed2-a3b9-d146d33bdaf5",
        "authorizationCode": "NPS-011111",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "APROBADA - Autorizada",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1623338717949,
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
         <accountId>512322</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-10T20:48:38.620Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>52b975674c6b1435c81dde6b8e039730</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>ARS</currency>
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
               <street1>Av Centenario 837</street1>
               <street2>5555487</street2>
               <city>San Isidro</city>
               <state>AR-B</state>
               <country>AR</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av Centenario 837</street1>
            <street2>5555487</street2>
            <city>San Isidro</city>
            <state>AR-B</state>
            <country>AR</country>
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
            <street1>Av Centenario 837</street1>
            <street2>5555487</street2>
            <city>San Isidro</city>
            <state>AR-B</state>
            <country>AR</country>
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
      <paymentCountry>AR</paymentCountry>
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
        <orderId>1400421621</orderId>
        <transactionId>dd76e186-e4f1-487c-826b-df4e9b125bfa</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>0</paymentNetworkResponseCode>
        <trazabilityCode>dd76e186-e4f1-487c-826b-df4e9b125bfa</trazabilityCode>
        <authorizationCode>NPS-011111</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>APROBADA - Autorizada</responseMessage>
        <operationDate>2021-06-10T10:48:40</operationDate>
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

### Captura {#capture}

Use este método para executar a etapa **Captura** de um fluxo de duas etapas. Nesta etapa, você captura os fundos [Autorizados]({{< ref "#authorization" >}}) anteriormente para transferi-los para sua conta PayU.

#### Observações {#considerations-1}

Leve em conta as seguintes informações para captura:
* O tempo máximo para capturar uma transação aprovada é de 14 dias. Após este período, a transação é automaticamente cancelada.
* Apenas os parâmetros exibidos no corpo da solicitação são obrigatórios para invocar uma transação de Captura. Lembre-se de que os IDs da ordem e da transação devem corresponder a uma transação atualmente autorizada.
* Você pode realizar capturas parciais sobre um valor autorizado. Para mais informações, consulte a seção [Captura Parcial]({{< ref "#partial-capture" >}}).

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
        "orderId": 1400421560,
        "transactionId": "84ace270-d52d-4e85-b4cf-bbe8710db0d5",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "84ace270-d52d-4e85-b4cf-bbe8710db0d5",
        "authorizationCode": "NPS-011111",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "APROBADA - Autorizada",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1623339599368,
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
         <id>1400421560</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>db9d9d7f-b62c-4ed2-a3b9-d146d33bdaf5</parentTransactionId>
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
        <orderId>1400421560</orderId>
        <transactionId>4522f4ac-4ff2-4e91-aa6c-7f2c2bf18d9d</transactionId>
        <state>DECLINED</state>
        <paymentNetworkResponseErrorMessage>El saldo disponible no es suficiente para procesar la transacción.</paymentNetworkResponseErrorMessage>
        <responseCode>INVALID_TRANSACTION</responseCode>
        <operationDate>2021-06-10T10:55:46</operationDate>
    </transactionResponse>
</paymentResponse>

```

{{< /tab >}}
{{< /tabs >}}

### Captura parcial {#partial-capture}

Uma captura parcial é uma operação que permite solicitar o desembolso de um valor menor do que o previamente autorizado em uma transação.

Isso significa que, se sua integração inicialmente autorizou um pagamento de $100, você pode realizar uma captura parcial de $60 e liberar os $40 restantes, que a integração não poderá capturar posteriormente.

#### Observações {#considerations-2}

* O valor total capturado não pode exceder o valor originalmente autorizado.
* Cada processador de pagamento e cada país podem ter regras ou restrições em relação ao valor que você pode capturar parcialmente.
* Você deve especificar o valor que deseja capturar parcialmente no campo `value`, dentro do parâmetro `TX_VALUE`, como mostrado no exemplo abaixo.

A seguir estão exemplos dos corpos de solicitação e resposta para este tipo de transação.

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
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
                "value": 25,
                "currency": "ARS"
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
        <value>25</value>
        <currency>ARS</currency>
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

Use este método para executar um fluxo de uma etapa, ou seja, uma cobrança. Neste momento, as duas etapas do fluxo são combinadas em uma só transação, e os fundos são transferidos da conta do cliente para sua conta PayU, uma vez que tenham sido aprovados.

A seguir estão os corpos de pedido e resposta para este tipo de transação.

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
         "accountId": "512322",
         "referenceCode": "PRODUCT_TEST_2021-06-10T22:29:35.451Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "70f33e263fbcdf18103101dfc86671ab",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "ARS"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "123456789",
            "shippingAddress": {
               "street1": "Av Centenario 837",
               "street2": "5555487",
               "city": "San Isidro",
               "state": "AR-B",
               "country": "AR",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av Centenario 837",
            "street2": "5555487",
            "city": "San Isidro",
            "state": "AR-B",
            "country": "AR",
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
            "street1": "Av Centenario 837",
            "street2": "5555487",
            "city": "San Isidro",
            "state": "AR-B",
            "country": "AR",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
      "creditCard": {
         "number": "4850110000000000",
         "securityCode": "777",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "VISA",
      "paymentCountry": "AR",
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
        "orderId": 1400421870,
        "transactionId": "fc7e5dce-0b69-4865-b7c3-acb0170c1729",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "fc7e5dce-0b69-4865-b7c3-acb0170c1729",
        "authorizationCode": "NPS-011111",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "APROBADA - Autorizada",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1623346177300,
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
         <accountId>512322</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-10T20:48:38.620Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>52b975674c6b1435c81dde6b8e039730</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>ARS</currency>
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
               <street1>Av Centenario 837</street1>
               <street2>5555487</street2>
               <city>San Isidro</city>
               <state>AR-B</state>
               <country>AR</country>
               <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av Centenario 837</street1>
            <street2>5555487</street2>
            <city>San Isidro</city>
            <state>AR-B</state>
            <country>AR</country>
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
            <street1>Av Centenario 837</street1>
            <street2>5555487</street2>
            <city>San Isidro</city>
            <state>AR-B</state>
            <country>AR</country>
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
      <paymentCountry>AR</paymentCountry>
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
        <orderId>1400421894</orderId>
        <transactionId>fc588a85-3122-4e4e-b958-a03d48b7438f</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>0</paymentNetworkResponseCode>
        <trazabilityCode>fc588a85-3122-4e4e-b958-a03d48b7438f</trazabilityCode>
        <authorizationCode>NPS-011111</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>APROBADA - Autorizada</responseMessage>
        <operationDate>2021-06-10T12:41:15</operationDate>
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

### Parcelas {#installments}

Ao processar transações com cartões de crédito, você precisa mostrar os seguintes aspectos ao seu cliente quando programar as parcelas:

![PrintScreen](/assets/Payments/Installments_pt.png)

Onde:

| Número na tela       | Opção               | Descrição                                     |
|:--------------------:|---------------------|-----------------------------------------------|
|           1          | Total da compra (1) | Valor total da compra sem financiamento.      |
|           2          | Total da compra (2) | Valor total financiado da compra.             |
|           3          | Parcelas            | Quantidade de parcelas e valor.               |
|           4          | TEA                 | A Taxa de Juros Efetiva Anual (TEA) aplicada. |
|           5          | CFT                 | O Custo Financeiro Total (CFT).               |

A informação do custo financeiro total (CFT) deve obedecer às seguintes orientações:

1. Deve estar localizado ao lado das variáveis reportadas.

2. Deve ser colorida, em destaque, com a mesma fonte e tamanho, pelo menos cinco vezes maior que a utilizada para informar a Taxa de Juros Efetiva Anual (TEA), o número de parcelas e seu valor.

De acordo com os regulamentos em vigor, não é permitido usar a frase “sem juros” (em espanhol, “sin interés”) ou qualquer outra frase semelhante, quando o custo financeiro do produto ou serviço é transferido para o preço de venda do cliente.

## Enviar transações usando dinheiro {#submit-transactions-using-cash}

Este método permite processar os pagamentos de seus clientes em dinheiro. Para integrar com transações em dinheiro, você deve redirecionar o cliente para a URL encontrada na resposta do método; Seu cliente verá um recibo de pagamento como este.

<img src="/assets/Payments/CashReceiptAR.png" alt="PrintScreen" width="50%">

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-1}

<details>
<summary><b>Solicitação</b></summary>
<label for="table2" class="showMandatory"><input type="checkbox" id="table2" name="table2s" value="true" onchange="showMandatory(this)"> Mostrar apenas campos obrigatórios</label>
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
| `transaction > payer` | Objeto |  | Informações do pagador. Na Argentina, para cumprir com as regulamentações fiscais e garantir o cálculo correto dos impostos, você deve enviar o endereço de cobrança do pagador (`transaction.payer.billingAddress`), o tipo de documento (`transaction.payer.dniType`) e o número do documento (`transaction.payer.dniNumber`). A ausência dessas informações pode impedir a aplicação correta dos impostos. | Sim |
| `transaction > payer > emailAddress` | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Sim |
| `transaction > payer > merchantPayerId` | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| `transaction > payer > fullName` | Alfanumérico | Máx:150 | Nome do pagador. | Sim |
| `transaction > payer > billingAddress` | Objeto |  | Na Argentina, o envio do endereço de cobrança completo é obrigatório para cumprir com as regulamentações fiscais locais. | Sim |
| `transaction > payer > billingAddress > street1` | Alfanumérico | Máx:100 | Linha 1 do endereço de cobrança. Obrigatório na Argentina para cumprir com as regulamentações fiscais. | Sim |
| `transaction > payer > billingAddress > street2` | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| `transaction > payer > billingAddress > city` | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. Obrigatório na Argentina para cumprir com as regulamentações fiscais. | Sim |
| `transaction > payer > billingAddress > state` | Alfanumérico | Máx:40 | Província do endereço de cobrança. Formato [ISO 3166-2 ARG oficial](https://www.iso.org/obp/ui/#iso:code:3166:AR). Na Argentina, este campo é obrigatório para o cálculo de impostos. | Sim |
| `transaction > payer > billingAddress > country` | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Sim |
| `transaction > payer > billingAddress > postalCode` | Alfanumérico | Máx:20 | Código postal do endereço de cobrança. | Não |
| `transaction > payer > billingAddress > phone` | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. | Não |
| `transaction > payer > birthdate` | Alfanumérico | Máx:10 | Data de nascimento do pagador. | Não |
| `transaction > payer > contactPhone` | Alfanumérico | Máx:20 | Número de telefone do pagador. | Sim |
| `transaction > payer > dniNumber` | Alfanumérico | Máx:20 | Número de identificação do pagador. Na Argentina, este campo é obrigatório para o cálculo de impostos. O número deve ser válido para o país (exemplo: `CUIT`: 27-28033514-8, `CUIL`: 20-12345678-9, `DNI`: 45678901). | Sim |
| `transaction > payer > dniType` | Alfanumérico | 2 | Tipo de identificação do pagador. [Ver tipos de documento]({{< ref "response-codes-and-variables.html#document-types" >}}). Na Argentina, este campo é obrigatório para o cálculo de impostos. Use `CUIT` ou `CUIL` como tipo de documento (outros tipos são aceitos, mas não são recomendados para fins fiscais). | Sim |
| `transaction > type` | Alfanumérico | 32 | Como os pagamentos em dinheiro são feitos em escritórios físicos, o único tipo de transação disponível é `AUTHORIZATION_AND_CAPTURE` | Sim |
| `transaction > paymentMethod` | Alfanumérico | 32 | Selecione um método de pagamento válido em dinheiro. [Veja os métodos de pagamento disponíveis na Argentina]({{< ref "select-your-payment-method.html#Argentina" >}}). | Sim |
| `transaction > paymentCountry` | Alfanumérico | 2 | Definir `AR` para a Argentina. | Sim |
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

</details>

#### Observações {#considerations-3}

* O parâmetro `transaction.expirationDate` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de 15 dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* O parâmetro `transactionResponse.extraParameters` tem os seguintes parâmetros relacionados à transação:
   - **REFERENCE**: referência interna de pagamento gerada pelo PayU.
   - **EXPIRATION_DATE**: prazo máximo para o pagador fazer o pagamento.
   - **BAR_CODE**: código de barras que permite ao pagador efetuar o pagamento. 
   - **URL_PAYMENT_RECEIPT_HTML**: comprovante de pagamento em formato HTML. É para cá que você precisa redirecionar o pagamento quando o pagador seleciona o pagamento em dinheiro. 
   - **URL_PAYMENT_RECEIPT_PDF**: comprovante de pagamento em formato PDF.

<details>
      <summary><strong>Consideração especial sobre regulamentações fiscais</strong></summary>      
      <p>Para cumprir com as regulamentações da autoridade fiscal da Argentina e garantir o cálculo correto dos impostos, é obrigatório incluir os seguintes campos na solicitação:</p>
      <ul>
        <li><strong>Endereço de cobrança:</strong> (<code>transaction.payer.billingAddress</code>).</li>
        <ul>
        <li><strong>Província:</strong> (<code>transaction.payer.billingAddress.state</code>). Deve seguir o formato <a href="https://www.iso.org/obp/ui/#iso:code:3166:AR" target="_blank" rel="noopener noreferrer">ISO 3166-2 ARG oficial</a>.</li>
        </ul>      
      <li><strong>Tipo de documento:</strong> (<code>transaction.payer.dniType</code>). Use <code>CUIT</code> ou <code>CUIL</code> como tipos preferenciais (outros tipos são aceitos, mas não são recomendados para fins fiscais).</li>      
      <li><strong>Número do documento:</strong> (<code>transaction.payer.dniNumber</code>). Deve ser um número de identificação válido para a Argentina (exemplos: <code>CUIT</code> <code>27-28033514-8</code>, <code>CUIL</code> <code>20-12345678-9</code>, <code>DNI</code> <code>45678901</code>).</li>
      </ul>     
</details>

### Chamada da API {#api-call}
 
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
         "accountId": "512322",
         "referenceCode": "PRODUCT_TEST_2021-06-10T20:25:15.868Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "1ffceb14a71948fdeaba5aef81b8e511",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "ARS"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "5415668464654",
            "shippingAddress": {
               "street1": "Av Centenario 837",
               "street2": "5555487",
               "city": "San Isidro",
               "state": "AR-B",
               "country": "AR",
               "postalCode": "000000",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Av Centenario 837",
            "street2": "5555487",
            "city": "San Isidro",
            "state": "AR-B",
            "country": "AR",
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
            "street1": "Av Centenario 837",
            "street2": "125544",
            "city": "San Isidro",
            "state": "AR-B",
            "country": "AR",
            "postalCode": "000000",
            "phone": "7563126"
         }
      },
	  "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "PAGOFACIL",
      "expirationDate": "2021-06-12T16:07:11",
      "paymentCountry": "AR",
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
        "orderId": 857787128,
        "transactionId": "702ee8a1-d99c-43cc-a097-167db0d7ff1a",
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
            "REFERENCE": 74794,
            "URL_PAYMENT_RECEIPT_PDF": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857787128Y702ee8a1d99c43cY5769b4d7b64fa1e",
            "EXPIRATION_DATE": 1623514031586,
            "BAR_CODE": "99580010000074794000000000000000000001206211107000010000083",
            "URL_PAYMENT_RECEIPT_HTML": "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857787128Y702ee8a1d99c43cY5769b4d7b64fa1e"
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
         <accountId>512322</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-15T14:40:25.549Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>1ffceb14a71948fdeaba5aef81b8e511</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>ARS</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <contactPhone>7563126</contactPhone>
            <dniNumber>5415668464654</dniNumber>
            <emailAddress>buyer_test@test.com</emailAddress>
            <fullName>First name and second buyer name</fullName>
            <merchantBuyerId>1</merchantBuyerId>
            <shippingAddress>
               <street1>Av Centenario 837</street1>
               <street2>5555487</street2>            
               <city>San Isidro</city>
               <state>AR-B</state>               
               <country>AR</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Av Centenario 837</street1>
               <street2>5555487</street2>            
               <city>San Isidro</city>
               <state>AR-B</state>               
               <country>AR</country>
                <postalCode>000000</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <billingAddress>
            <street1>Av Centenario 837</street1>
            <street2>5555487</street2>            
            <city>San Isidro</city>
            <state>AR-B</state>               
            <country>AR</country>
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
      <paymentMethod>PAGOFACIL</paymentMethod>
      <expirationDate>2021-06-16T16:07:11</expirationDate>
      <paymentCountry>AR</paymentCountry>
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
        <orderId>857792249</orderId>
        <transactionId>96a2e817-e26a-456b-85d4-28df8c3a584e</transactionId>
        <state>PENDING</state>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <extraParameters>
            <entry>
                <string>REFERENCE</string>
                <int>75017</int>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_PDF</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/receipt?vid=857792249Y96a2e817e26a456Y47e0b9cb12503f6</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-06-16T11:07:11</date>
            </entry>
            <entry>
                <string>BAR_CODE</string>
                <string>99580010000075017000000000000000000001606211107000010000082</string>
            </entry>
            <entry>
                <string>URL_PAYMENT_RECEIPT_HTML</string>
                <string>https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/app?vid=857792249Y96a2e817e26a456Y47e0b9cb12503f6</string>
            </entry>
        </extraParameters>
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

#### Chamada da API {#api-call-1}

A seguir, exemplos da solicitação deste método.

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}
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

### Parâmetros para solicitação e resposta {#parameters-for-request-and-response-2}

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

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|:-:|
| `code` | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| `error` | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| `paymentMethods` | Objeto |  | Lista dos métodos de pagamento. | 
| `paymentMethods > paymentMethodComplete` | Objeto |  | Este objeto contém as informações de um método de pagamento. |
| `paymentMethods > paymentMethodComplete > id` | Numérico |  | Identificador do método de pagamento. |
| `paymentMethods > paymentMethodComplete > description` | Alfanumérico | Máx:32 | Nome do método de pagamento. |
| `paymentMethods > paymentMethodComplete > country` | Alfanumérico | 2 | Código ISO do país do método de pagamento. |

</details>

### Chamada da API {#api-call-2}

A seguir estão os corpos do pedido e resposta deste método. Para fins de exemplo, a solicitação e a resposta aqui mostram dois métodos de pagamento. 

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}
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
            "id": "201",
            "description": "ARGENCARD",
            "country": "AR",
            "enabled": true,
            "reason": null
        },
        {
            "id": "212",
            "description": "MASTERCARD",
            "country": "AR",
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
            <id>201</id>
            <description>ARGENCARD</description>
            <country>AR</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>212</id>
            <description>MASTERCARD</description>
            <country>AR</country>
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

### Chamada da API {#api-call-3}

A seguir estão os corpos do pedido e resposta deste método.

{{< tabs tabTotal="2" tabID="10" tabName1="JSON" tabName2="XML" >}}
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