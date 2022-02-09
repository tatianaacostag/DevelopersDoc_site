---
title: "API de pagamentos - Brasil"
linkTitle: "API de pagamentos - Brasil"
date: 2021-05-03T15:48:08-05:00
description: >
  A API de pagamentos do Brasil permite que sua loja processe diferentes tipos de transações com vários métodos de pagamento.
weight: 20
tags: ["subtopic"]
---
<script>
   function hideAlert() {
      var today = new Date();
      var launchDate = new Date("2/17/22");
      var note = document.getElementsByClassName("pageinfo pageinfo-info")[0];
      if((today - launchDate) > 0) {
         note.style.display = "none";

      } else {
         note.style.display = "";
      }
   }
  
   window.onload = hideAlert;
</script>

Para integrar com a API de pagamentos do Brasil, direcione sua solicitação para as seguintes URLs de acordo com seu ambiente.

{{% alert title="URL" color="info"%}}
* Teste: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Produção: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Métodos disponíveis {#available-methods}
A API de pagamentos inclui os seguintes métodos:

* [Enviar transação com cartão de crédito]({{< ref "#submit-transaction-with-credit-cards" >}})
* [Enviar transação com PIX]({{< ref "#submit-transaction-with-pix" >}})
* [Enviar transação em dinheiro]({{< ref "#submit-transaction-with-cash" >}})
* [Enviar transação com transferência bancária]({{< ref "#submit-transaction-with-bank-transfer" >}})
* [Consulta de métodos de pagamento disponíveis]({{< ref "#available-payment-methods-query" >}})
* [Ping]({{< ref "#ping" >}})

{{% alert title="Observação" color="info"%}}
Para confirmar o status de uma transação, você pode usar one of the following options:
* Navegue até a URL definida na variável `transaction.notifyUrl` ou na opção _**URL de confirmação**_ localizada no Módulo PayU em _**Configuração**_ > _**Configuração técnica**_.
* Use o [API ou SDK de Consultas]({{< ref "Queries.md" >}}).
{{% /alert %}}

## Enviar transação com cartão de crédito {#submit-transaction-with-credit-cards}
Este método permite processar os pagamentos efetuados com cartão de crédito pelos seus clientes. Para o Brasil, você pode executar os fluxos de duas etapas, você pode executar os fluxos de duas etapas (**Autorização**, **Captura**) e fluxos de uma etapa (**Cobrança**). Para obter mais informações, consulte [Fluxos de pagamento]({{< ref "payments.md#payment-flows" >}}).

### Adicionar Facilitadores de Pagamento {#adding-payment-facilitators}
Os estabelecimentos comerciais podem ser considerados Processadores de Pagamentos pelas franquias e pelo Banco Central. Um processador de pagamentos é uma entidade legal que recebe dinheiro de sub-vendedores. No caso de falência comercial e administração tributária, o Banco Central do Brasil quer saber quem é o beneficiário do negócio.

Para incluir as informações do sub-vendedor, você precisa inseri-las na solicitação dos fluxos **Autorização** e **Cobrança** usando o objeto `submerchant`.

#### O que é um facilitador de pagamento? {#what-is-a-payment-facilitator}
Um facilitador de pagamento é uma empresa que oferece uma alternativa à contratação de uma organização de pagamento tradicional, assumindo a responsabilidade pelo fluxo de fundos em uma relação comprador-vendedor.

Muitos vendedores estão optando por trabalhar com facilitadores de pagamento porque o facilitador de pagamento possui e gerencia a conta mestra, assumindo assim um risco. Os vendedores também escolhem um facilitador de pagamento devido à simplicidade de abertura de uma conta, normalmente ocorrendo por meio de uma breve inscrição e avaliação de assinatura.

#### Quais informações são necessárias? {#what-information-is-required}
Você precisa enviar as seguintes informações:

* Identificação interna do sub-vendedor (opcional)
* Nome do sub-vendedor (opcional)
* Número de identificação do sub-vendedor (obrigatório) _*Pessoas físicas ou jurídicas_
* Endereço do sub-vendedor (opcional)
* Estado do sub-vendedor (obrigatório)
* Código postal do sub-vendedor (obrigatório)
* País do sub-vendedor (obrigatório)

A descrição desses campos está na seção [Variáveis]({{< ref "#variables-for-request-and-response" >}}).

### Usar cartões tokenizados {#using-tokenized-cards}
A PayU suporta pagamentos recorrentes usando as informações do cartão de crédito armazenadas em um token. Este token substitui as informações sensíveis do cartão de crédito e permite salvá-lo para futuros pagamentos preservando os padrões de segurança PCI DSS (Payment Card Industry Data Security Standard).

A PayU pode processar pagamentos através de: 

* **Tokenização da PayU**.<br>Na PayU temos nosso próprio serviço para gerar os tokens dos cartões de crédito mediante um request. Este serviço permite obter os tokens com as informações do cartão de crédito de seus clientes (independentemente da bandeira) usando a integração API ou SDK da PayU.<br>Para mais informações, confira a [Tokenização de PayU]({{< ref "Tokenization.md" >}}).

* **MasterCard Digital Enablement Service - MDES**.<br>MDES é o serviço de tokenização da Mastercard. Este serviço permite que você salve os tokens no número da conta primária dos cartões de crédito MasterCard, e fazer pagamentos recorrentes ou implementar funcionalidades de pagamento com um clique.<br>Para mais informações, pode consultar a documentação oficial do [MasterCard Digital Enablement Service (MDES) em inglês](https://developer.mastercard.com/mdes-digital-enablement/documentation/).

* **Visa Token Service - VTS**.<br>VTS é o serviço de tokenização da Visa. Este serviço permite salvar de forma segura as informações sensíveis do cartão de crédito Visa para fazer pagamentos recorrentes ou implementar funcionalidades de pagamento com um clique.<br>Para mais informações, você pode consultar o [Visa Token Service (VTS) em inglês](https://usa.visa.com/products/visa-token-service.html).

#### Pagamentos com tokens de PayU {#pay-with-payu-tokens#pay-with-payu-tokens}
Para pagamentos com tokens de cartão de crédito de PayU, inclua o parâmetro `transaction.creditCardTokenId` substituindo as informações do cartão de crédito. Na seguinte request temos um exemplo da solicitação de processamento em uma etapa. Os detalhes da solicitação não são mostrados. 

{{% alert title="Observação" color="info"%}}
Para processar sem CVV, é necessário enviar o parâmetro `creditCard.processWithoutCvv2` como true na solicitação de pagamento e remover o parâmetro `creditCard.securityCode`.<br>
Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas.
{{% /alert%}}

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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
         "Informação do pedido":""
      },
      "payer": {
         "Informação do pagador":""
      },
      "creditCardTokenId": "46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3",
      "creditCard": {
         "securityCode": "123"
      },
      "extraParameters": {
         "Parâmetros extras do pedido":""
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "Card franchise", 
      "paymentCountry": "País de processamento",
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

Exemplo pedido:
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
         <!-- Informação do pedido -->
      </order>
      <payer>
         <!-- Informação do pagador -->
      </payer>
      <creditCardTokenId>46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3</creditCardTokenId>
      <creditCard>
         <securityCode>321</securityCode>
      </creditCard>
      <extraParameters>
         <!-- Parâmetros extras do pedido -->
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>{Card franchise}</paymentMethod>
      <paymentCountry>{País de processamento}</paymentCountry>
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

#### Pagamentos com tokens de MDES ou VTS {#pay-with-mdes-or-vts-tokens}
Se você tiver tokens salvos nas bandeiras usando MDES ou VTS, é possível processar pagamentos diretamente na PayU. Você só precisa definir as informações do token no parâmetro `transaction.networkToken`, substituindo as informações do cartão de crédito e definindo o parâmetro  `creditCard.processWithoutCvv2` em true.<br>Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado, entre em contato com seu representante de vendas para habilitá-lo.

Na seguinte request temos um exemplo da solicitação de processamento em uma etapa. Os detalhes da solicitação não são mostrados. 

{{< tabs tabTotal="2" tabID="10" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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
         "Informação do pedido":""
      },
      "payer": {
         "Informação do pagador":""
      },
      "networkToken": {
          "tokenPan": "4097440000000004",
          "cryptogram": "11223344556677889900112233445566778899",
          "expiry": "2028/01"
      },
      "extraParameters": {
         "Parâmetros extras do pedido":""
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "Card franchise", 
      "paymentCountry": "País de processamento",
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

Exemplo pedido:
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
         <!-- Informação do pedido -->
      </order>
      <payer>
         <!-- Informação do pagador -->
      </payer>
      <networkToken>
         <tokenPan>4097440000000004</tokenPan>
         <cryptogram>11223344556677889900112233445566778899</cryptogram>
         <expiry>2028/01</expiry>
      </networkToken>
      <extraParameters>
         <!-- Parâmetros extras do pedido -->
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>{Card franchise}</paymentMethod>
      <paymentCountry>{País de processamento}</paymentCountry>
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

Encontre a descrição do objeto `transaction.networkToken` e seus parâmetros na seção [Variáveis]({{< ref "#variables-for-request-and-response" >}}) section.

### Variáveis para pedido e resposta {#variables-for-request-and-response}

<details>
<summary>Pedido</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `SUBMIT_TRANSACTION`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| merchant |  |  | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| transaction |  |  | Este objeto contém os dados da transação. | Sim |
| transaction > order |  |  | Este objeto contém os dados da ordem. | Sim |
| transaction > order > accountId | Número |  | Identificador da sua conta. | Sim |
| transaction > order > referenceCode | Alfanumérico | Mín:1 Máx:255 | Representa o identificador da ordem em seu sistema. | Sim |
| transaction > order > description | Alfanumérico | Mín:1 Máx:255 | Descrição da ordem. | Sim |
| transaction > order > language | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| transaction > order > notifyUrl | Alfanumérico | Máx:2048 | URL de confirmação da ordem. | Não |
| transaction > order > partnerId | Alfanumérico | Máx:255 | ID de parceiro no PayU. | Não |
| transaction > order > signature | Alfanumérico | Máx:255 | A assinatura associada ao formulário. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| transaction > order > shippingAddress |  |  | Endereço para envio. | Não |
| transaction > order > shippingAddress > street1 | Alfanumérico | Máx:100 | Endereço: Linha 1. | Não |
| transaction > order > shippingAddress > street2 | Alfanumérico | Máx:100 | Endereço: Linha 2. | Não |
| transaction > order > shippingAddress > city | Alfanumérico | Máx:50 | Endereço: cidade. | Não |
| transaction > order > shippingAddress > state | Alfanumérico | Máx:40 | Endereço: estado. Para o Brasil, envie apenas dois caracteres, Por exemplo, definir `SP` para São Paulo. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | Endereço: país. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Máx:8 | Endereço: CEP. Para o Brasil, use o formato `XXXXX-XXX` ou `XXXXXXXX`. Exemplo: `09210-710` ou `09210710`. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Não |
| transaction > order > buyer |  |  | Informações do comprador. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Máx:255 | E-mail do comprador. | Sim | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do comprador. Você deve usar um algoritmo para validar o CPF, que deve ser definido usando o formato `XXX.XXX.XXX-XX`. Exemplo: `811.807.405-64`. | Sim |
| transaction > order > buyer > cnpj | Alfanumérico | Máx:14 | Número de identificação do comprador (para pessoa jurídica no Brasil). Você deve usar um algoritmo para validar o CNPJ, que deve ser definido usando o formato `XXXXXXXXXXXXXX`. Exemplo: `32593371000110`. | Sim |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Endereço de envio do comprador. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. Para o Brasil, envie apenas dois caracteres, Por exemplo, definir `SP` para São Paulo. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País do endereço do comprador no formato ISO 3166 alpha-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Número | Máx:20 | CEP do endereço do comprador. Para o Brasil, use o formato `XXXXX-XXX` ou `XXXXXXXX`. Exemplo: `09210-710` ou `09210710`. | Sim |
| transaction > order > buyer > shippingAddress > phone | Número | Máx:20 | Número de telefone do endereço do comprador. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Sim |
| transaction > order > additionalValues > |  | 64 | Valor da ordem ou seus valores associados. | Sim |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Valor da transação. | Sim |
| transaction > order > additionalValues > TX_VALUE > value | Número | 12, 2 | Especifica o valor da transação. Este valor pode ter duas casas decimais (por exemplo `10000.00` ou `10000`). | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Total do Imposto sobre Valor Agregado (IVA). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Número | 12, 2 | Especifica o valor do IVA.  | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para cálculo do VAT.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais.  | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Número | 12, 2 | Especifica o valor base da transação. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > submerchant |  |  | Informações do sub-vendedor. Se você não enviar este parâmetro, o PayU configura seu estabelecimento como sub-vendedor. | Não |
| transaction > order > submerchant > id | Alfanumérico | Máx:15 | ID interno do sub-vendedor, se você usar um para identificá-lo. | Não |
| transaction > order > submerchant > fullName | Alfanumérico | Máx:150 | Nome completo do sub-vendedor. | Não |
| transaction > order > submerchant > address |  |  | Endereço do sub-vendedor. Os campos `state`, `country` e `postalCode` são obrigatórios ao enviar este objeto. | Não |
| transaction > order > submerchant > address > street1 | Alfanumérico | Máx:100 | Endereço: Linha 1. | Não |
| transaction > order > submerchant > address > street2 | Alfanumérico | Máx:100 | Endereço: Linha 2. | Não |
| transaction > order > submerchant > address > street3 | Alfanumérico | Máx:100 | Endereço: Linha 3. | Não |
| transaction > order > submerchant > address > city | Alfanumérico | Máx:50 | Endereço: cidade. | Não |
| transaction > order > submerchant > address > state | Alfanumérico | Máx:40 | Endereço: estado. Para o Brasil, envie apenas dois caracteres, Por exemplo, definir `SP` para São Paulo. | Sim |
| transaction > order > submerchant > address > country | Alfanumérico | 2 | Endereço: país. | Sim |
| transaction > order > submerchant > address > postalCode | Alfanumérico | Máx:8 | Endereço: CEP. Para o Brasil, use o formato `XXXXX-XXX` ou `XXXXXXXX`. Exemplo: `09210-710` ou `09210710`. | Sim |
| transaction > order > submerchant > address > phone | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Não |
| transaction > order > submerchant > identification | Alfanumérico | Máx:14 | Número de identificação do comprador (para pessoa jurídica no Brasil). Você deve usar um algoritmo para validar o CNPJ, que deve ser definido usando o formato `XXXXXXXXXXXXXX`. Exemplo: `32593371000110`. | Não |
| transaction > order > submerchant > identificationType | Alfanumérico | Máx:4 | Tipo de identificação of the sub-merchant. The possible values are `cnpj` ou `cpf`. | Não |
| transaction > creditCardTokenId |  |  | Inclua este parâmetro quando a transação for feita com um cartão tokenizado usando a Tokenização de PayU. Além disso, é obrigatório enviar o parâmetro `transaction.creditCard.expirationDate`.<br>Para obter mais informações, consulte [API de tokenização]({{< ref "Tokenization-API.md" >}}). | Não |
| transaction > creditCard |  |  | Informações do cartão de crédito. Este objeto e seus parâmetros são obrigatórios quando o pagamento é realizado com cartão de crédito não tokenizado. | Não |
| transaction > creditCard > number | Alfanumérico | Mín:13 Máx:20 | Número do cartão de crédito. | Não |
| transaction > creditCard > securityCode | Alfanumérico | Mín:1 Máx:4 | Código de segurança do cartão de crédito (CVC2, CVV2, CID). | Não |
| transaction > creditCard > expirationDate | Alfanumérico | 7 | Data de validade do cartão de crédito. Formato `YYYY/MM`. Este parâmetro e obrigatório quando o pagamento é realizado com cartão de crédito tokenizado. | Não |
| transaction > creditCard > name | Alfanumérico | Mín:1 Máx:255 | Nome do titular exibido no cartão de crédito. | Não |
| transaction > creditCard > processWithoutCvv2 | Boolean | Máx:255 | Permite processar transações sem incluir o código de segurança do cartão de crédito. Sua loja precisa da autorização do PayU antes de usar este recurso. | Não |
| transaction > payer |  |  | Informações do pagador. | Não |
| transaction > payer > emailAddress | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Não |
| transaction > payer > merchantPayerId | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| transaction > payer > fullName | Alfanumérico | Máx:150 | Nome do pagador, que deve corresponder ao nome enviado no parâmetro `transaction.creditCard.name` para pagamentos com cartão de crédito. | Não |
| transaction > payer > billingAddress |  |  | Endereço de cobrança. | Não |
| transaction > payer > billingAddress > street1 | Alfanumérico | Máx:100 | Endereço de cobrança linha 1. | Não |
| transaction > payer > billingAddress > street2 | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Não |
| transaction > payer > billingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de cobrança. Para o Brasil, envie apenas dois caracteres, Por exemplo, definir `SP` para São Paulo. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Não |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Máx:20 | CEP do endereço de cobrança. Para o Brasil, use o formato `XXXXX-XXX` ou ´. Exemplo: `09210-710` ou `09210710`. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Não |
| transaction > payer > birthdate | Alfanumérico | Máx:10 | Data de nascimento do pagador. | Não |
| transaction > payer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do pagador. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Não |
| transaction > payer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do pagador. Você deve usar um algoritmo para validar o CPF, que deve ser definido usando o formato `XXX.XXX.XXX-XX`. Exemplo: `811.807.405-64`. | Não |
| transaction > payer > cnpj | Alfanumérico | Máx:14 | Número de identificação do comprador (para pessoa jurídica no Brasil). Você deve usar um algoritmo para validar o CNPJ, que deve ser definido usando o formato `XXXXXXXXXXXXXX`. Exemplo: `32593371000110`. | Não |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > networkToken |  |  | Informações do token. Inclua este parâmetro quando a transação for feita usando um cartão tokenizado usando a Tokenização VTS ou MDES. Para obter mais informações, consulte [Pagamentos usando tokens de MDES ou VTS]({{< ref "#pay-with-mdes-or-vts-tokens" >}}). <br><sup>\*</sup>Ao enviar este objeto, todos os seus parâmetros são obrigatórios.| Não |
| transaction > networkToken > tokenPan | Alfanumérico | Máx:32 | Número do token gerado por MDES ou VTS. | Sim<sup>\*</sup> |
| transaction > networkToken > cryptogram | Alfanumérico | Máx:28 | Chave única gerada por MDES ou VTS para decifrar as informações do cartão de crédito. | Sim<sup>\*</sup> |
| transaction > networkToken > expiry | Alfanumérico | 7 | Data de expiração do token. Formato `YYYY/MM`. | Sim<sup>\*</sup> |
| transaction > type | Alfanumérico | 32 | Definir este valor de acordo com a transação que você quer:<br><ul style="margin-bottom: initial;"><li>`AUTHORIZATION`</li><li>`CAPTURE`</li><li>`AUTHORIZATION_AND_CAPTURE` para fluxos de uma etapa.</li></ul> | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Selecione um método de pagamento com cartão de crédito válido. [Veja os métodos de pagamento disponíveis o Brasil]({{< ref "select-your-payment-method.html#Brazil" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Definir `BR` para o Brasil. | Sim |
| transaction > deviceSessionId | Alfanumérico | Máx:255 | Identificador da sessão do dispositivo onde o cliente faz a transação. Para obter mais informações, consulte [este tópico]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |
| transaction > cookie | Alfanumérico | Máx:255 | Cookie armazenado pelo dispositivo onde o cliente faz a transação. | Sim |
| transaction > userAgent | Alfanumérico | Máx:1024 | O agente do usuário do navegador onde o cliente faz a transação. | Sim |
| transaction > extraParameters |  |  | Parâmetros ou dados adicionais associados a pedido. O tamanho máximo de cada nome _extraParameters_ é de 64 caracteres.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"INSTALLMENTS_NUMBER": 1`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>INSTALLMENTS_NUMBER</string>`<br>&emsp;&emsp;`<string>1</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`  | Não |
| transaction > termsAndConditionsAcepted | Boolean | | Termos e condições do PayU que os pagadores devem aceitar. *Este parâmetro só é obrigatório se sua conta PayU brasileira estiver associada a uma conta bancária estrangeira. | Não* |
| transaction > threeDomainSecure |  |  | Este objeto contém as informações do 3DS 2.0. | Não |
| transaction > threeDomainSecure > embedded | Boolean |  | Definir `true` se você deseja usar um MPI integrado para o processo de autorização. Por padrão, este valor é definido como `false`. | Não |
| transaction > threeDomainSecure > eci | Número | Máx:2 | Indicador de comércio eletrônico.<br>Valor fornecido pelos servidores de diretório mostrando a tentativa de autenticação.<br>Este parâmetro é obrigatório quando `transaction.threeDomainSecure.embedded` é `false` e `transaction.threeDomainSecure.xid` for definido. | Não |
| transaction > threeDomainSecure > cavv | Alfanumérico | Máx:28 | Valor de verificação de autenticação do titular do cartão.<br>Código do criptograma usado na autenticação da transação em Base64.<br>Dependendo dos códigos ECI específicos estabelecidos pela rede de processamento, este valor pode ser opcional. | Não |
| transaction > threeDomainSecure > xid | Alfanumérico | Máx:28 | Código do criptograma usado na autenticação da transação em Base64.<br>Este parâmetro é obrigatório quando `transaction.threeDomainSecure.embedded` é `false` e `transaction.threeDomainSecure.eci` for definido. | Não |
| transaction > threeDomainSecure > directoryServerTransactionId | Alfanumérico | Máx:36 | ID da transação gerada pelo Servidor de Diretório durante a autenticação. | Não |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| transactionResponse |  |  | Os dados de resposta. |
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
| transactionResponse > extraParameters |  |  | Parâmetros ou dados adicionais associados à resposta. <br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"BANK_REFERENCED_CODE": "CREDIT"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_REFERENCED_CODE</string>`<br>&emsp;&emsp;`<string>CREDIT</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Observações {#considerations}
* Caso a sua loja não tenha entidade local, também é obrigatório o envio do CPF (parâmetro  `transaction.[payer|buyer].dniNumber`) ou o CNPJ (parâmetro `transaction.[payer|buyer].cnpj`) ao usar [Autorização]({{< ref "#authorization" >}}) ou [Cobrança]({{< ref "#charge" >}}).
* Se você não enviar nenhuma informação para os sub-vendedores, o PayU configura o seu vendedor como sub-vendedor.
* Para pagamentos com tokens de cartão de crédito gerados por PayU, inclua os parâmetros `transaction.creditCardTokenId` e `transaction.creditCard.securityCode` (se processar com código de segurança) substituindo as informações do cartão de crédito. Para obter mais informações, consulte [API de tokenização]({{< ref "Tokenization-API.md" >}}).
* Para pagamentos com tokens de cartão de crédito gerados por MDES ou VTS, inclua o objeto `transaction.networkToken` e seus parâmetros.
* Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas. Depois que esse recurso for habilitado para você, envie no pedido a variável `creditCard.processWithoutCvv2` como true e remova a variável `creditCard.securityCode`.<br>Ter esse recurso habilitado é obrigatório ao usar tokens de cartão de crédito gerados usando MDES ou VTSTer esse recurso habilitado é obrigatório ao usar tokens de cartão de crédito gerados usando MDES ou VTS.
* O parâmetro extra  `CIELO_TID` identifica a transação. Este parâmetro é necessário quando você deseja processar cancelamentos.
* A variável `transaction.threeDomainSecure` não substitui as informações do cartão nem qualquer um dos campos obrigatórios da transação. Este objeto é adicional e não obrigatório.
* A variável `transaction.threeDomainSecure` corresponde a um cenário _Pass Through_ onde a loja faz a autenticação por conta própria.

### Autorização {#authorization}
Use este método para executar a etapa **Autorização** de um fluxo de duas etapas. Nesta etapa, você autoriza o pagamento, mas o valor não é debitado até você [capturar]({{< ref "#capture" >}}) os fundos.<br>A seguir estão os corpos de pedido e resposta para este tipo de transação.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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
         "accountId": "512327",
         "referenceCode": "PRODUCT_TEST_2021-06-17T19:11:57.179Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "fbc089272288edc52c332395d9566f4c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "BRL"
            }
         },
         "submerchant": {
            "fullName": "ROBSON BATISTA DE OLIVEIRA",
            "address": {
               "street1": "Rua Alsácia",
               "street2": null,
               "street3": null,
               "city": "São Paulo",
               "state": "SP",
               "country": "BR",
               "postalCode": "04630010",
               "phone": null
            },
            "identification": "17126661851",
            "identificationType": "CNPJ"
        },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "811.807.405-64",
            "cnpj": "32593371000110",
            "shippingAddress": {
               "street1": "Quadra QNP 34 Conjunto G 780",
               "street2": "5555487",
               "city": "Manaos",
               "state": "SP",
               "country": "BR",
               "postalCode": "10012545",
               "phone": "(11)756312633"
            }
         },
         "shippingAddress": {
            "street1": "Quadra QNP 34 Conjunto G 780",
            "street2": "5555487",
            "city": "Manaos",
            "state": "SP",
            "country": "BR",
            "postalCode": "10012545",
            "phone": "(11)756312633"
         }
      },
      "creditCard": {
         "number": "5253203387684619",
         "securityCode": "777",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION",
      "paymentMethod": "MASTERCARD",
      "paymentCountry": "BR",
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
   "test": false
}
```
<br>

Exemplo resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400434770,
        "transactionId": "79de715b-fe77-401e-8b18-241820afb375",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "00",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "282856",
        "authorizationCode": "MOCK-CIELO-1623957118463",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1623939118784,
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

Exemplo pedido:
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
         <accountId>512327</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-17T19:11:57.179Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>fbc089272288edc52c332395d9566f4c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>BRL</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <submerchant>
            <address>
               <city>São Paulo</city>
               <country>BR</country>
               <postalCode>04630010</postalCode>
               <state>SP</state>
               <street1>Rua Alsácia</street1>
            </address>
            <fullName>ROBSON BATISTA DE OLIVEIRA</fullName>
            <identification>17126661851</identification>
            <identificationType>cnpj</identificationType>
         </submerchant>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>811.807.405-64</dniNumber>
            <cnpj>32593371000110</cnpj>
            <shippingAddress>
               <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>
               <city>Manaos</city>
               <state>SP</state>
               <country>BR</country>
               <postalCode>10012545</postalCode>
               <phone>(11)756312633</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Quadra QNP 34 Conjunto G 780</street1>
            <street2>5555487</street2>
            <city>Manaos</city>
            <state>SP</state>
            <country>BR</country>
            <postalCode>0000000</postalCode>
            <phone>(11)756312633</phone>
         </shippingAddress>
      </order>
      <creditCard>
         <number>5253203387684619</number>
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
      <paymentMethod>MASTERCARD</paymentMethod>
      <paymentCountry>BR</paymentCountry>
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

Exemplo resposta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400434942</orderId>
        <transactionId>1af49d5d-464a-4efb-98db-f7875e3c580b</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>00</paymentNetworkResponseCode>
        <trazabilityCode>282856</trazabilityCode>
        <authorizationCode>MOCK-CIELO-1623962788239</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <operationDate>2021-06-17T10:46:28</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>CIELO_TID</string>
                <string>1006993069000509C28A</string>
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
Leve em conta as seguintes informações para captura.
* O tempo máximo para capturar uma transação aprovada é de sete (7) dias. Após este período, a transação é cancelada.
* Apenas os parâmetros exibidos no corpo da solicitação são obrigatórios para invocar uma transação de Captura. Lembre-se de que os IDs da ordem e da transação devem corresponder a uma transação atualmente autorizada.

A seguir estão os corpos de pedido e resposta para este tipo de transação.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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
         "id": "1400434770"
      },
      "type": "CAPTURE",
      "parentTransactionId": "79de715b-fe77-401e-8b18-241820afb375"
   },
   "test": false
}
```
<br>

Exemplo resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400434770,
        "transactionId": "2e753a5e-0eba-4a4c-9778-6880b5f16605",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "6",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "282856",
        "authorizationCode": "BR-456",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624029247864,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "CIELO_TID": "1006993069000509C28A"
        },
        "additionalInfo": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
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
         <id>1400436982</id>
      </order>
      <type>CAPTURE</type>
      <parentTransactionId>2cb57976-31d1-4563-b014-8047bd1b2b2a</parentTransactionId>
   </transaction>
   <isTest>false</isTest>
</request>

```
<br>

Exemplo resposta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400436982</orderId>
        <transactionId>78d4c328-7157-4b50-9fa9-12e019e7df58</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>6</paymentNetworkResponseCode>
        <trazabilityCode>282856</trazabilityCode>
        <authorizationCode>BR-456</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <operationDate>2021-06-18T10:19:01</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>CIELO_TID</string>
                <string>1006993069000509C28A</string>
            </entry>
        </extraParameters>
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

Exemplo pedido:
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
         "accountId": "512327",
         "referenceCode": "PRODUCT_TEST_2021-06-17T19:11:57.179Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "fbc089272288edc52c332395d9566f4c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "BRL"
            }
         },
         "submerchant": {
            "fullName": "ROBSON BATISTA DE OLIVEIRA",
            "address": {
               "street1": "Rua Alsácia",
               "street2": null,
               "street3": null,
               "city": "São Paulo",
               "state": "SP",
               "country": "BR",
               "postalCode": "04630010",
               "phone": null
            },
            "identification": "17126661851",
            "identificationType": "CNPJ"
        },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "811.807.405-64",
            "cnpj": "32593371000110",
            "shippingAddress": {
               "street1": "Quadra QNP 34 Conjunto G 780",
               "street2": "5555487",
               "city": "Manaos",
               "state": "SP",
               "country": "BR",
               "postalCode": "10012545",
               "phone": "(11)756312633"
            }
         },
         "shippingAddress": {
            "street1": "Quadra QNP 34 Conjunto G 780",
            "street2": "5555487",
            "city": "Manaos",
            "state": "SP",
            "country": "BR",
            "postalCode": "10012545",
            "phone": "(11)756312633"
         }
      },
      "creditCard": {
         "number": "5178151142107990",
         "securityCode": "777",
         "expirationDate": "2022/12",
         "name": "APPROVED"
      },
      "extraParameters": {
         "INSTALLMENTS_NUMBER": 1
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "MASTERCARD",
      "paymentCountry": "BR",
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
   "test": false
}
```
<br>

Exemplo resposta:
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

Exemplo pedido:
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
         <accountId>512327</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-17T19:11:57.179Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>fbc089272288edc52c332395d9566f4c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>BRL</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <submerchant>
            <address>
               <city>São Paulo</city>
               <country>BR</country>
               <postalCode>04630010</postalCode>
               <state>SP</state>
               <street1>Rua Alsácia</street1>
            </address>
            <fullName>ROBSON BATISTA DE OLIVEIRA</fullName>
            <identification>17126661851</identification>
            <identificationType>cnpj</identificationType>
         </submerchant>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>811.807.405-64</dniNumber>
            <cnpj>32593371000110</cnpj>
            <shippingAddress>
               <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>
               <city>Manaos</city>
               <state>SP</state>
               <country>BR</country>
               <postalCode>10012545</postalCode>
               <phone>(11)756312633</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Quadra QNP 34 Conjunto G 780</street1>
            <street2>5555487</street2>
            <city>Manaos</city>
            <state>SP</state>
            <country>BR</country>
            <postalCode>0000000</postalCode>
            <phone>(11)756312633</phone>
         </shippingAddress>
      </order>
      <creditCard>
         <number>5178151142107990</number>
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
      <paymentMethod>MASTERCARD</paymentMethod>
      <paymentCountry>BR</paymentCountry>
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

Exemplo resposta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1400437005</orderId>
        <transactionId>5d3cea31-c5e5-4105-9359-984edcaede37</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>6</paymentNetworkResponseCode>
        <trazabilityCode>282856</trazabilityCode>
        <authorizationCode>MOCK-CIELO-1624047952405</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <operationDate>2021-06-18T10:25:52</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>CIELO_TID</string>
                <string>1006993069000509C28A</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Enviar transação com PIX {#submit-transaction-with-pix}
Este método permite processar pagamentos usando PIX. Para fazer a integração com o PIX, você precisa incluir na página de checkout um código QR que seu cliente possa ler com o smartphone para fazer o pagamento.

Depois, seu cliente vê uma página de checkout como esta.

![PrintScreen](/assets/Payments/PixCheckout.png)

{{% pageinfo color="info" %}}
#### Observação
A integração com o PIX estará disponível a partir de 16 de fevereiro de 2022. Para mais informações, consulte seu representante de vendas.
{{% /pageinfo %}}

### Como funciona o PIX? {#how-does-pix-work}
PIX é um método de transferência online lançado em novembro de 2020 pelo Banco Central do Brasil (BACEN) que permite realizar e receber transferências com facilidade independente do banco que emitiu sua conta.

Ao contrário de outros métodos de transferência bancária e envio de dinheiro, o PIX permite que você receba transferências imediatamente, sem compartilhar o número da sua conta, a qualquer hora ou dia. Os fundos recebidos por meio deste método de pagamento aparecerão em sua conta PayU em questão de segundos.

O Pix tem duas partes:

* Chave PIX: identificador único de uma conta bancária ou de pagamento no Sistema Bancário Brasileiro. Sua chave pode ser gerada usando qualquer um dos seguintes valores:
   - CNPJ ou CPF.
   - E-mail
   - Número de telefone
   - Chave aleatória

* Código QR: este código é lido pelo seu cliente com o telefone e efetua o pagamento.

### Variáveis para pedido e resposta {#variables-for-request-and-response-1}

<details>
<summary>Pedido</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `SUBMIT_TRANSACTION`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| merchant |  |  | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| transaction |  |  | Este objeto contém os dados da transação. | Sim |
| transaction > order |  |  | Este objeto contém os dados da ordem. | Sim |
| transaction > order > accountId | Número |  | Identificador da sua conta. | Sim |
| transaction > order > referenceCode | Alfanumérico | Mín:1 Máx:255 | Representa o identificador da ordem em seu sistema. | Sim |
| transaction > order > description | Alfanumérico | Mín:1 Máx:255 | Descrição da ordem. | Sim |
| transaction > order > language | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| transaction > order > notifyUrl | Alfanumérico | Máx:2048 | URL de confirmação da ordem. | Não |
| transaction > order > partnerId | Alfanumérico | Máx:255 | ID de parceiro no PayU. | Não |
| transaction > order > signature | Alfanumérico | Máx:255 | A assinatura associada ao formulário. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| transaction > order > shippingAddress |  |  | Endereço para envio. | Não |
| transaction > order > shippingAddress > street1 | Alfanumérico | Máx:100 | Endereço: Linha 1. | Não |
| transaction > order > shippingAddress > street2 | Alfanumérico | Máx:100 | Endereço: Linha 2. | Não |
| transaction > order > shippingAddress > city | Alfanumérico | Máx:50 | Endereço: cidade. | Não |
| transaction > order > shippingAddress > state | Alfanumérico | Máx:40 | Endereço: estado. Para o Brasil, envie apenas dois caracteres, Por exemplo, definir `SP` para São Paulo. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | Endereço: país. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Máx:8 | Endereço: CEP. Para o Brasil, use o formato `XXXXX-XXX` ou `XXXXXXXX`. Exemplo: `09210-710` ou `09210710`. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Não |
| transaction > order > buyer |  |  | Informações do comprador. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Máx:255 | E-mail do comprador. | Sim | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do comprador. Você deve usar um algoritmo para validar o CPF, que deve ser definido usando o formato `XXX.XXX.XXX-XX`. Exemplo: `811.807.405-64`. | Sim |
| transaction > order > buyer > cnpj | Alfanumérico | Máx:14 | Número de identificação do comprador (para pessoa jurídica no Brasil). Você deve usar um algoritmo para validar o CNPJ, que deve ser definido usando o formato `XXXXXXXXXXXXXX`. Exemplo: `32593371000110`. | Sim |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Endereço de envio do comprador. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. Para o Brasil, envie apenas dois caracteres, Por exemplo, definir `SP` para São Paulo. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País do endereço do comprador no formato ISO 3166 alpha-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Número | Máx:20 | CEP do endereço do comprador. Para o Brasil, use o formato `XXXXX-XXX` ou `XXXXXXXX`. Exemplo: `09210-710` ou `09210710`. | Sim |
| transaction > order > buyer > shippingAddress > phone | Número | Máx:20 | Número de telefone do endereço do comprador. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Sim |
| transaction > order > additionalValues > |  | 64 | Valor da ordem ou seus valores associados. | Sim |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Valor da transação. | Sim |
| transaction > order > additionalValues > TX_VALUE > value | Número | 12, 2 | Especifica o valor da transação. Este valor pode ter duas casas decimais (por exemplo `10000.00` ou `10000`). | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Total do Imposto sobre Valor Agregado (IVA). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Número | 12, 2 | Especifica o valor do IVA.  | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para cálculo do VAT.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais.  | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Número | 12, 2 | Especifica o valor base da transação. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > payer |  |  | Informações do pagador. | Sim |
| transaction > payer > emailAddress | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Não |
| transaction > payer > merchantPayerId | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| transaction > payer > fullName | Alfanumérico | Máx:150 | Nome of the payer. | Sim |
| transaction > payer > billingAddress |  |  | Endereço de cobrança. | Não |
| transaction > payer > billingAddress > street1 | Alfanumérico | Máx:100 | Endereço de cobrança linha 1. | Não |
| transaction > payer > billingAddress > street2 | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Não |
| transaction > payer > billingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de cobrança. Para o Brasil, envie apenas dois caracteres, Por exemplo, definir `SP` para São Paulo. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Não |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Máx:20 | CEP do endereço de cobrança. Para o Brasil, use o formato `XXXXX-XXX` ou ´. Exemplo: `09210-710` ou `09210710`. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Não |
| transaction > payer > birthdate | Alfanumérico | Máx:10 | Data de nascimento do pagador. | Não |
| transaction > payer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do pagador. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Não |
| transaction > payer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do pagador. Você deve usar um algoritmo para validar o CPF, que deve ser definido usando o formato `XXX.XXX.XXX-XX`. Exemplo: `811.807.405-64`. | Não |
| transaction > payer > cnpj | Alfanumérico | Máx:14 | Número de identificação do comprador (para pessoa jurídica no Brasil). Você deve usar um algoritmo para validar o CNPJ, que deve ser definido usando o formato `XXXXXXXXXXXXXX`. Exemplo: `32593371000110`. | Não |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > type | Alfanumérico | 32 | Como os pagamentos PIX são feitos com o telefone celular do pagador, o único tipo de transação disponível é `AUTHORIZATION_AND_CAPTURE`. | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Definir `PIX` para este método de pagamento. Se você quiser ver outro método de pagamento, consulte [Métodos de pagamento para o Brasil]({{< ref "select-your-payment-method.html#Brazil" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Definir `BR` para o Brasil. | Sim |
| transaction > deviceSessionId | Alfanumérico | Máx:255 | Identificador da sessão do dispositivo onde o cliente faz a transação. Para obter mais informações, consulte [este tópico]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |
| transaction > extraParameters |  |  | Parâmetros ou dados adicionais associados a pedido. O tamanho máximo de cada nome _extraParameters_ é de 64 caracteres.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"PARAMETER_NAME": "VALUE"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>PARAMETER_NAME</string>`<br>&emsp;&emsp;`<string>VALUE</string>`<br>&emsp;`</entry>`<br>`</extraParameters>`<br>_Defina o respectivo tipo de dados_  | Não |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| transactionResponse |  |  | Os dados de resposta. |
| transactionResponse > orderId | Número |  | O ID de ordem gerado ou existente no PayU. |
| transactionResponse > transactionId | Alfanumérico | 36 | O identificador da transação no PayU. |
| transactionResponse > state | Alfanumérico | Máx:32 | O status da transação. As the payment is performed by the user in their phone, the state for a successful transaction is `PENDING` |
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Máx:255 | O código de resposta fornecido pela rede financeira. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Máx:255 | A mensagem de erro fornecida pela rede financeira. |
| transactionResponse > trazabilityCode | Alfanumérico | Máx:32 | O código de rastreamento fornecido pela rede financeira. |
| transactionResponse > authorizationCode | Alfanumérico | Máx:12 | O código de autorização fornecido pela rede financeira. |
| transactionResponse > pendingReason | Alfanumérico | Máx:21 | O código de resposta associado ao status, conforme mencionado em `transactionResponse > state`, a transação está aguardando o pagamento. |
| transactionResponse > responseCode | Alfanumérico | Máx:64 | O código de resposta associado ao status. Neste caso, para transações bem-sucedidas é `PENDING_PAYMENT_IN_ENTITY`. |
| transactionResponse > responseMessage | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| transactionResponse > operationDate | Date |  | Data de criação da resposta no sistema PayU. |
| transactionResponse > extraParameters |  |  | Parâmetros ou dados adicionais associados à resposta.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"EXPIRATION_DATE": "1627488070000"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>EXPIRATION_DATE</string>`<br>&emsp;&emsp;`<int>1627488070000</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Observações {#considerations-2}
* Os pagamentos processados através do nosso portal serão para PayU em nome do seu comércio.
* Caso a sua loja não tenha entidade local, também é obrigatório o envio do CPF (parâmetro  `transaction.[payer|buyer].dniNumber`) ou o CNPJ (parâmetro `transaction.[payer|buyer].cnpj`).
* Para configurar o tempo de expiração do código QR, entre em contato com seu representante de vendas. O tempo máximo que você pode solicitar é um dia.<br>Por padrão, o tempo de expiração é de duas (2) horas.
* O valor mínimo que você pode processar com o PIX é R$ 1,00, o valor máximo depende do seu cliente e do banco.
* O parâmetro `transaction.payer.fullName` é obrigatório para criar o pedido.
* O código QR e a chave PIX usados para receber pagamentos são gerados pelo PayU. Não é possível configurar seu próprio código QR ou chave PIX. No entanto, o total da transação, menos a taxa de comissão, é transferido para sua conta PayU.
* Para consultar um código ativo de sua transação, use a [API de Consultas]({{< ref "Queries-API.md" >}}).
* O parâmetro `transactionResponse.extraParameters` tem os seguintes parâmetros relacionados à transação:
   - **EXPIRATION_DATE**: prazo para efetuar o pagamento.
   - **QRCODE_EMV**: código a ser colado no portal do banco para fazer o pagamento. Este código é usado quando o cliente não consegue ler o código QR.
   - **QRCODE_IMAGE_BASE64**: imagem do código QR. Esta é uma string codificada em Base64.

{{% alert title="Observação" color="info"%}}
Recomenda-se exibir em seu Checkout a imagem do código QR (parâmetro `QRCODE_IMAGE_BASE64` decodificado) e a string do código (parâmetro` QRCODE_EMV`) para evitar deserções de pagamento.
{{% /alert %}}

### Chamada API {#api-call}
A seguir estão o corpo do pedido e da resposta deste meio de pagamento.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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
         "accountId": "512327",
         "referenceCode": "PRODUCT_TEST_2021-06-17T19:11:57.179Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "fbc089272288edc52c332395d9566f4c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "BRL"
            }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "811.807.405-64",
            "cnpj": "32593371000110",
            "shippingAddress": {
               "street1": "Quadra QNP 34 Conjunto G 780",
               "street2": "5555487",
               "city": "Manaos",
               "state": "SP",
               "country": "BR",
               "postalCode": "10012545",
               "phone": "(11)756312633"
            }
         },
         "shippingAddress": {
            "street1": "Quadra QNP 34 Conjunto G 780",
            "street2": "5555487",
            "city": "Manaos",
            "state": "SP",
            "country": "BR",
            "postalCode": "10012545",
            "phone": "(11)756312633"
         }
      },
      "payer": {
         "fullName":"Payer Name",
         "emailAddress": "buyer_test@test.com",
         "contactPhone": "55 12345678901",
         "dniType": "CPF",
         "dniNumber": "653.098.319-83"
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "PIX",
      "paymentCountry": "BR",
      "ipAddress": "127.0.0.1"
    },
    "test": false
}
```
<br>

Exemplo resposta:
```JSON
{
  "code": "SUCCESS",
  "error": null,
  "transactionResponse": {
    "orderId": 120000260,
    "transactionId": "e82ace4c-647b-457d-b4f5-136c921445b6",
    "state": "PENDING",
    "paymentNetworkResponseCode": null,
    "paymentNetworkResponseErrorMessage": null,
    "trazabilityCode": "9c7d3f2d-6c2c-436c-a06d-e6f99271ff3f",
    "authorizationCode": null,
    "pendingReason": "AWAITING_PAYMENT_IN_ENTITY",
    "responseCode": "PENDING_PAYMENT_IN_ENTITY",
    "errorCode": null,
    "responseMessage": null,
    "transactionDate": null,
    "transactionTime": null,
    "operationDate": 1627473671920,
    "referenceQuestionnaire": null,
    "extraParameters": {
      "EXPIRATION_DATE": 1627488070000,
      "QRCODE_EMV": "00020101021126950014BR.GOV.BCB.PIX2573spi.dev.cloud.itau.com.br/documentos/198e49c5-2330-4ad7-9d0b-967c7b5371225204000053039865802BR5923PMD Gotham NegA cios ME6009SAO PAULO62410503***50300017BR.GOV.BCB.BRCODE01051.0.063040866",
      "QRCODE_IMAGE_BASE64": "iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6AQAAAACgl2eQAAADCUlEQVR4Xu2XUW4cIRBE6YvA/W+Ro8BFIPWKsWU5kpWPbOVn8SaZhWep1F1dTNr5ef1q33e+rTdw1xu466+A2VqtXbuP3etMPY9zlrdjwPLnrNm1NceaNXtv426nAOliqw5K+1io3IBhoFyZsWuaE/UfgM1h0xpzTMqUBfRxXZB2ONylhy/Nej0wMe2fi+0Y4KUend1omcZHR7vufgigNMzLEDXFbL63Pj6bFQBkld57MS0KkEWfdhOg3sWAI0mYRUIJMkvGwq5VCJhWtwkwAWoXIcJvjRxw9WnL/YKQWxejPGKAxvZgEHWoBKlhErztmBhgafaMXCtqWKVDJQYc2oNndY5llncEspUDlOFFrXRA23QiUl9jwB7aPvhkoE5UGeQxBlyFLEaXCbrW+XT16wGe9Kcsk25JsH/oWgjw9PbGge+ysdAtgRAhwNm1iW+rXN5pV2oMuEaVTHlXL30iFaySXU+hAsBGpJulzAAclE3geEQGAIzCfcKrFv7VEVna3LAQMIcNyiue7lKSg1ppQ0OcAshPWWT4amNtarb4GgN8qcmwvlAk8qNRtC4GuEVKLn13fKlUUuxepQC+C9NWJ9ZlHRu5iLMUMPGrdhkZLKwLpvQfoXvXhoCDzsZP0beFgagefgkC0yWiVbxqFBmmn/Xh6tcDyxnGtUpskJ/Mb0dpDGBQnSJSJ7NKHYahaR+Fej3wWMSqMI/+Utmkmm6lgCewfICwmyPdHg4BGtRBkHp+m29VqbPyHCCPKL+pFzpJUiZIep9CBQAnOZ+nQwu3TP8bAybjqvJgkyI+DjLF07gQ4M5wXEibvtod5u0RGQDYKhhZFX3ca9hYuRID9GbDidql+kgt/eKCpYMpwGaVIAZGAaKObZyL1BygxTMgMUKXuOEXbQwBFEWaOt4tusQW/eKXQsDic0vE+17njA4SrjFg8n43XCwbZQsdfooCC4eSJJoXJVkRYJ/NSgHEOBIJ8wtYeAzQh0HpCjLop3GDeU4BtEU2kUpXR1YhQqlXDvhxvYG73sBd/wD4Df7+v4eqIoYgAAAAAElFTkSuQmCC"
    },
    "additionalInfo": null
  }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
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
         <accountId>512327</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-17T19:11:57.179Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>fbc089272288edc52c332395d9566f4c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>BRL</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <contactPhone>7563126</contactPhone>
            <dniNumber>811.807.405-64</dniNumber>
            <cnpj>32593371000110</cnpj>
            <emailAddress>buyer_test@test.com</emailAddress>
            <fullName>First name and second buyer name</fullName>
            <merchantBuyerId>1</merchantBuyerId>
            <shippingAddress>
               <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>            
               <city>Manaos</city>
               <state>SP</state>               
               <country>BR</country>
               <postalCode>10012545</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>            
               <city>Manaos</city>
               <state>SP</state>               
               <country>BR</country>
                <postalCode>10012545</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <payer>
         <contactPhone>55 12345678901</contactPhone>
         <dniNumber>653.098.319-83</dniNumber>
         <dniType>CPF</dniType>
         <emailAddress>buyer_test@test.com</emailAddress>
         <fullName>Payer Name</fullName>
      </payer>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>PIX</paymentMethod>
      <paymentCountry>BR</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>

```
<br>

Exemplo resposta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1181965893</orderId>
        <transactionId>8397992b-3717-49c5-92ee-345a65ff13cf</transactionId>
        <state>PENDING</state>
        <trazabilityCode>e0a52a20-6ae2-4970-9b81-47f208bbf40e</trazabilityCode>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <operationDate>2021-10-08T12:14:15</operationDate>
        <extraParameters>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-10-08T18:14:13</date>
            </entry>
            <entry>
                <string>QRCODE_EMV</string>
                <string>00020101021226770014BR.GOV.BCB.PIX2555api.itau/pix/qr/v2/8ccd84ae-0c8d-4f71-8abf-b676a666bf9f5204000053039865802BR5911PAYU BRASIL6009SAO PAULO62070503***6304E404</string>
            </entry>
            <entry>
                <string>QRCODE_IMAGE_BASE64</string>
                <string>iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6AQAAAACgl2eQAAAC0ElEQVR4Xu2XW27cMAxFpY1I+99FlyJtRO45VFIrUyDoR8z+DDEPj3QMMCTvlVOu7+NXeV15iTew4w3seAM7/g0YpdTJ92p1lTpKveY1XUwE2JyT3TnnqF6WFnd4UxowKq/R56qrldZH68uVfIDc+mqktyBb/w/A6vSMXtms0kePxUyAl79t2AVKyWYsJgIxtK/x11S/xs8CH0GOrJEh7+WmkQWMPpjW3aWYFybY8b3/iucBqtLwjn4txsWSIRs13BMB80E2zqrqoUyle08qQFV6zK0UqfpuXiYC5OQu9sXqMmGRW7wJwBykMxCuWdosb6Fcf5JMAJAMFo5e9HFHZtvaXagEYG7n4kDzHMHRi656NCsBcErJLIQLZc56+t2sDECJ+IF1TWNtI7uTfB64LEswJQR8sYV4j24+Dww9nCeLzzpFo0LHeQCIBO8aEtZYQ0KJgJ4pwsB4qpic2rGFaYC9Kj5k9Rk1o2DSIxMgIxdCL2SMlTq+425WBjCqZ5idwkb57ZeLiYBaoVlLH9lDIzcPdT8PRJkUSkiG3OJ4+9KsxwH2PE/YVi+OjeI5DpQEYDgmJQ73poThMNR1NOt5YKqZmFObxMfSQ5RPHsCkVPfYIMsisLwjE2BqL/eKeZmxvZqHeBOAuX8iGZKjT1g5rTqb9TzADu5hTvYo3ItUj2YlAGywHk3D08ltWKuzks8DeNfSwxwUL6NSX9X9PIBtqBpey+cM9snbtTzg2koZrkz/K3OM19ms5wHr08JM9fHqR+vx+J0IOKXTXTanQ4yU0dGVCAwFa5rVR4zlBb/5SAQMc3R6PelXqGee4n0cMKHl814Ixvy63j4yAdKbnufD2iiYj/M1FRjhGaGd4qMO8/qlWUlAjE1MK7BCqldEJqBfUCwa5NV0fpZMGhDNas2xwTlIUU87zDwBiMZooFZIIYsq4UTgu3gDO97Ajjew4weA30GD9ELLE47fAAAAAElFTkSuQmC</string>
            </entry>
        </extraParameters>
    </transactionResponse>
</paymentResponse>

```
{{< /tab >}}
{{< /tabs >}}

## Enviar transação em dinheiro {#submit-transaction-with-cash}
Este método permite processar os pagamentos de seus clientes em dinheiro. Para integrar com transações em dinheiro, você deve redirecionar o cliente para a URL encontrada na resposta do método; Seu cliente verá um recibo de pagamento como este.

<img src="/assets/Payments/CashReceiptBR.png" alt="PrintScreen" width="50%">

{{% alert title="Observação" color="warning"%}}
A integração com o PIX estará disponível a partir de janeiro 2022. Para mais informações, consulte com o seu executivo de vendas.
{{% /alert %}}

### Variáveis para pedido e resposta {#variables-for-request-and-response-2}

<details>
<summary>Pedido</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `SUBMIT_TRANSACTION`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| merchant |  |  | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| transaction |  |  | Este objeto contém os dados da transação. | Sim |
| transaction > order |  |  | Este objeto contém os dados da ordem. | Sim |
| transaction > order > accountId | Número |  | Identificador da sua conta. | Sim |
| transaction > order > referenceCode | Alfanumérico | Mín:1 Máx:255 | Representa o identificador da ordem em seu sistema. | Sim |
| transaction > order > description | Alfanumérico | Mín:1 Máx:255 | Descrição da ordem. | Sim |
| transaction > order > language | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| transaction > order > notifyUrl | Alfanumérico | Máx:2048 | URL de confirmação da ordem. | Sim |
| transaction > order > partnerId | Alfanumérico | Máx:255 | ID de parceiro no PayU. | Sim |
| transaction > order > signature | Alfanumérico | Máx:255 | A assinatura associada ao formulário. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| transaction > order > shippingAddress |  |  | Endereço para envio. | Não |
| transaction > order > shippingAddress > street1 | Alfanumérico | Máx:100 | Endereço: Linha 1. | Não |
| transaction > order > shippingAddress > street2 | Alfanumérico | Máx:100 | Endereço: Linha 2. | Não |
| transaction > order > shippingAddress > city | Alfanumérico | Máx:50 | Endereço: cidade. | Não |
| transaction > order > shippingAddress > state | Alfanumérico | Máx:40 | Endereço: estado. Para o Brasil, envie apenas dois caracteres, Por exemplo, definir `SP` para São Paulo. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | Endereço: país. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Máx:8 | Endereço: CEP. Para o Brasil, use o formato `XXXXX-XXX` ou `XXXXXXXX`. Exemplo: `09210-710` ou `09210710`. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Não |
| transaction > order > buyer |  |  | Informações do comprador. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Máx:255 | E-mail do comprador. | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do comprador. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do comprador. Você deve usar um algoritmo para validar o CPF, que deve ser definido usando o formato `XXX.XXX.XXX-XX`. Exemplo: `811.807.405-64`. | Sim |
| transaction > order > buyer > cnpj | Alfanumérico | Máx:14 | Número de identificação do comprador (para pessoa jurídica no Brasil). Você deve usar um algoritmo para validar o CNPJ, que deve ser definido usando o formato `XXXXXXXXXXXXXX`. Exemplo: `32593371000110`. | Sim |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Endereço de envio do comprador. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. |  Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. Para o Brasil, envie apenas dois caracteres, Por exemplo, definir `SP` para São Paulo. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País do endereço do comprador no formato ISO 3166 alpha-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Número | Máx:20 | CEP do endereço do comprador. Para o Brasil, use o formato `XXXXX-XXX` ou `XXXXXXXX`. Exemplo: `09210-710` ou `09210710`. | Sim |
| transaction > order > buyer > shippingAddress > phone | Número | Máx:20 | Número de telefone do endereço do comprador. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Sim |
| transaction > order > additionalValues > |  | 64 | Valor da ordem ou seus valores associados. | Sim |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Valor da transação. | Sim |
| transaction > order > additionalValues > TX_VALUE > value | Número | 12, 2 | Especifica o valor da transação. Este valor pode ter duas casas decimais (por exemplo `10000.00` ou `10000`). | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Total do Imposto sobre Valor Agregado (IVA). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Número | 12, 2 | Especifica o valor do IVA.  | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para cálculo do VAT.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais.  | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Número | 12, 2 | Especifica o valor base da transação. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > payer |  |  | Informações do pagador. This information is optional. | Não |
| transaction > payer > emailAddress | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Não |
| transaction > payer > merchantPayerId | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| transaction > payer > fullName | Alfanumérico | Máx:150 | Nome of the payer. | Não |
| transaction > payer > billingAddress |  |  | Endereço de cobrança. | Não |
| transaction > payer > billingAddress > street1 | Alfanumérico | Máx:100 | Endereço de cobrança linha 1. | Não |
| transaction > payer > billingAddress > street2 | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Não |
| transaction > payer > billingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de cobrança. Para o Brasil, envie apenas dois caracteres, Por exemplo, definir `SP` para São Paulo. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Não |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Máx:20 | CEP do endereço de cobrança. Para o Brasil, use o formato `XXXXX-XXX` ou ´. Exemplo: `09210-710` ou `09210710`. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Não |
| transaction > payer > birthdate | Alfanumérico | Máx:10 | Data de nascimento do pagador. | Não |
| transaction > payer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do pagador. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Não |
| transaction > payer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do pagador. Você deve usar um algoritmo para validar o CPF, que deve ser definido usando o formato `XXX.XXX.XXX-XX`. Exemplo: `811.807.405-64`. | Não |
| transaction > payer > cnpj | Alfanumérico | Máx:14 | Número de identificação do comprador (para pessoa jurídica no Brasil). Você deve usar um algoritmo para validar o CNPJ, que deve ser definido usando o formato `XXXXXXXXXXXXXX`. Exemplo: `32593371000110`. | Não |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > type | Alfanumérico | 32 | Como os pagamentos em dinheiro são feitos em escritórios físicos, o único tipo de transação disponível é `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Selecione um método de pagamento válido em dinheiro. [Veja os métodos de pagamento disponíveis o Brasil]({{< ref "select-your-payment-method.html#Brazil" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Definir `BR` para o Brasil. | Sim |
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
| transactionResponse |  |  | Os dados de resposta. |
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
| transactionResponse > extraParameters |  |  | Parâmetros ou dados adicionais associados à resposta.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"REFERENCE": "74794"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>REFERENCE</string>`<br>&emsp;&emsp;`<int>74794</int>`<br>&emsp;`</entry>`<br>`</extraParameters>` |

</details>

#### Observações {#considerations-3}
* Caso a sua loja não tenha entidade local, também é obrigatório o envio do CPF (parâmetro  `transaction.[payer|buyer].dniNumber`) ou o CNPJ (parâmetro `transaction.[payer|buyer].cnpj`).
* O parâmetro `transaction.expirationDate` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de sete (7) dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* O pagamento aparece no próximo dia útil.
* O parâmetro `transactionResponse.extraParameters` tem os seguintes parâmetros relacionados à transação:
   - **URL_PAYMENT_RECEIPT_HTML**: comprovante de pagamento em formato HTML. É para cá que você precisa redirecionar o pagamento quando o pagador seleciona o pagamento em dinheiro. 
   - **URL_BOLETO_BANCARIO**: comprovante de pagamento em formato printable format.
   - **EXPIRATION_DATE**: prazo máximo para o pagador fazer o pagamento.
   - **BAR_CODE**: código de barras que permite ao pagador efetuar o pagamento. 

### Chamada API {#api-call-1}
A seguir estão o corpo do pedido e da resposta deste meio de pagamento.

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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
         "accountId": "512327",
         "referenceCode": "PRODUCT_TEST_2021-06-17T19:11:57.179Z",
         "description": "Payment test description",
         "language": "es",
         "signature": "fbc089272288edc52c332395d9566f4c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "BRL"
            }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "811.807.405-64",
            "cnpj": "32593371000110",
            "shippingAddress": {
               "street1": "Quadra QNP 34 Conjunto G 780",
               "street2": "5555487",
               "city": "Manaos",
               "state": "SP",
               "country": "BR",
               "postalCode": "10012545",
               "phone": "(11)756312633"
            }
         },
         "shippingAddress": {
            "street1": "Quadra QNP 34 Conjunto G 780",
            "street2": "5555487",
            "city": "Manaos",
            "state": "SP",
            "country": "BR",
            "postalCode": "10012545",
            "phone": "(11)756312633"
         }
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "BOLETO_BANCARIO",
      "expirationDate": "2021-06-19T21:57:12.559",
      "paymentCountry": "BR",
      "ipAddress": "127.0.0.1"
   },
   "test": false
}
```
<br>

Exemplo resposta:
```JSON
{
  "code": "SUCCESS",
  "error": null,
  "transactionResponse": {
    "orderId": 43626780,
    "transactionId": "63091676-673d-46bf-a283-54e686ba0238",
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
    "extraParameters": {
      "URL_PAYMENT_RECEIPT_HTML": "https://gateway.payulatam.com/ppp-web-gateway/bl.zul?transactionId=63091676-673d-46bf-a283-54e686ba0238&orderId=43626780&signature=647b061ddef2a25fd19cb362860e1d21ef59e16a",
      "EXPIRATION_DATE": 1399507200000,
      "URL_BOLETO_BANCARIO": "https://gateway.payulatam.com/ppp-web-gateway/bl.zul?transactionId=63091676-673d-46bf-a283-54e686ba0238&orderId=43626780&signature=647b061ddef2a25fd19cb362860e1d21ef59e16a",
      "BAR_CODE": "34191.75389 38894.912930 81898.480009 9 60560000010000"
    }
  }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
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
         <accountId>512327</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-17T19:11:57.179Z</referenceCode>
         <description>Payment test description</description>
         <language>es</language>
         <signature>fbc089272288edc52c332395d9566f4c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>BRL</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <merchantBuyerId>1</merchantBuyerId>
            <fullName>First name and second buyer name</fullName>
            <emailAddress>buyer_test@test.com</emailAddress>
            <contactPhone>7563126</contactPhone>
            <dniNumber>811.807.405-64</dniNumber>
            <cnpj>32593371000110</cnpj>
            <shippingAddress>
               <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>
               <city>Manaos</city>
               <state>SP</state>
               <country>BR</country>
               <postalCode>10012545</postalCode>
               <phone>(11)756312633</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Quadra QNP 34 Conjunto G 780</street1>
            <street2>5555487</street2>
            <city>Manaos</city>
            <state>SP</state>
            <country>BR</country>
            <postalCode>0000000</postalCode>
            <phone>(11)756312633</phone>
         </shippingAddress>
      </order>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>BOLETO_BANCARIO</paymentMethod>
      <expirationDate>2021-06-19T21:57:12.559</expirationDate>
      <paymentCountry>BR</paymentCountry>
      <ipAddress>127.0.0.1</ipAddress>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Exemplo resposta:
```XML
<paymentResponse>
   <code>SUCCESS</code>
   <transactionResponse>
      <orderId>43625300</orderId>
      <transactionId>89ff03a7-9f86-4193-a25d-94b758c135bb</transactionId>
      <state>PENDING</state>
      <pendingReason>AWAITING_NOTIFICATION</pendingReason>
      <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
      <extraParameters>
         <entry>
            <string>URL_PAYMENT_RECEIPT_HTML</string>
            <string>https://gateway.payulatam.com/ppp-web-gateway/bl.zul?transactionId=89ff03a7-9f86-4193-a25d-94b758c135bb&orderId=43625300&signature=e9e89a2cd8d9d2d79d637eac84debae9012584de</string>
         </entry>
         <entry>
            <string>EXPIRATION_DATE</string>
            <date>2014-05-08T00:00:00</date>
         </entry>
         <entry>
            <string>URL_BOLETO_BANCARIO</string>
            <string>https://gateway.payulatam.com/ppp-web-gateway/bl.zul?transactionId=89ff03a7-9f86-4193-a25d-94b758c135bb&orderId=43625300&signature=e9e89a2cd8d9d2d79d637eac84debae9012584de</string>
         </entry>
         <entry>
            <string>BAR_CODE</string>
            <string>34191.75389 38894.752930 81898.480009 3 60570000010000</string>
         </entry>
      </extraParameters>
   </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Enviar transação com transferência bancária {#submit-transaction-with-bank-transfer}
Este método permite processar os pagamentos de seus clientes por transferência bancária. Ao usar esta forma de pagamento, o pagador faz uma transferência bancária de sua conta do ITAU.<br>
Para se integrar a essas transações, você deve redirecionar o cliente para a URL encontrada na resposta do método.

<img src="/assets/Payments/BankTransferReceiptBR.png" alt="PrintScreen" width="50%">

### Variáveis para pedido e resposta {#variables-for-request-and-response-3}

<details>
<summary>Pedido</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `SUBMIT_TRANSACTION`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| merchant |  |  | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| transaction |  |  | Este objeto contém os dados da transação. | Sim |
| transaction > order |  |  | Este objeto contém os dados da ordem. | Sim |
| transaction > order > accountId | Número |  | Identificador da sua conta. | Sim |
| transaction > order > referenceCode | Alfanumérico | Mín:1 Máx:255 | Representa o identificador da ordem em seu sistema. | Sim |
| transaction > order > description | Alfanumérico | Mín:1 Máx:255 | Descrição da ordem. | Sim |
| transaction > order > language | Alfanumérico | 2 | Idioma usado nos e-mails enviados ao comprador e ao vendedor. | Sim |
| transaction > order > notifyUrl | Alfanumérico | Máx:2048 | URL de confirmação da ordem. | Não|
| transaction > order > partnerId | Alfanumérico | Máx:255 | ID de parceiro no PayU. | Não |
| transaction > order > signature | Alfanumérico | Máx:255 | A assinatura associada ao formulário. Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}). | Sim |
| transaction > order > shippingAddress |  |  | Endereço para envio. | Não |
| transaction > order > shippingAddress > street1 | Alfanumérico | Máx:100 | Endereço: Linha 1. | Não |
| transaction > order > shippingAddress > street2 | Alfanumérico | Máx:100 | Endereço: Linha 2. | Não |
| transaction > order > shippingAddress > city | Alfanumérico | Máx:50 | Endereço: cidade. | Não |
| transaction > order > shippingAddress > state | Alfanumérico | Máx:40 | Endereço: estado. | Não |
| transaction > order > shippingAddress > country | Alfanumérico | 2 | Endereço: país. | Não |
| transaction > order > shippingAddress > postalCode | Alfanumérico | Máx:8 | Endereço: CEP. Para o Brasil, use o formato `XXXXX-XXX` ou `XXXXXXXX`. Exemplo: `09210-710` ou `09210710`. | Não |
| transaction > order > shippingAddress > phone | Alfanumérico | Máx:11 | Número de telefone associado ao endereço. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Não |
| transaction > order > buyer |  |  | Informações do comprador. | Sim |
| transaction > order > buyer > merchantBuyerId | Alfanumérico | Máx:100 | ID do comprador em seu sistema. | Não |
| transaction > order > buyer > fullName | Alfanumérico | Máx:150 | Nome completo do comprador. | Sim |
| transaction > order > buyer > emailAddress | Alfanumérico | Máx:255 | E-mail do comprador. | Sim |
| transaction > order > buyer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do comprador. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Sim |
| transaction > order > buyer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do comprador. Você deve usar um algoritmo para validar o CPF, que deve ser definido usando o formato `XXX.XXX.XXX-XX`. Exemplo: `811.807.405-64`. | Sim |
| transaction > order > buyer > cnpj | Alfanumérico | Máx:14 | Número de identificação do comprador (para pessoa jurídica no Brasil). Você deve usar um algoritmo para validar o CNPJ, que deve ser definido usando o formato `XXXXXXXXXXXXXX`. Exemplo: `32593371000110`. | Sim |
| transaction > order > buyer > shippingAddress | Alfanumérico |  | Endereço de envio do comprador. | Sim |
| transaction > order > buyer > shippingAddress > street1 | Alfanumérico | Máx:150 | Linha 1 do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de entrega do comprador. | Sim |
| transaction > order > buyer > shippingAddress > country | Alfanumérico | 2 | País do endereço do comprador no formato ISO 3166 alpha-2. | Sim |
| transaction > order > buyer > shippingAddress > postalCode | Número | Máx:20 | CEP do endereço do comprador. Para o Brasil, use o formato `XXXXX-XXX` ou `XXXXXXXX`. Exemplo: `09210-710` ou `09210710`. | Sim |
| transaction > order > buyer > shippingAddress > phone | Número | Máx:20 | Número de telefone do endereço do comprador. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Sim |
| transaction > order > additionalValues > |  | 64 | Valor da ordem ou seus valores associados. | Sim |
| transaction > order > additionalValues > TX_VALUE | Alfanumérico | 64 | Valor da transação. | Sim |
| transaction > order > additionalValues > TX_VALUE > value | Número | 12, 2 | Especifica o valor da transação. Este valor pode ter duas casas decimais (por exemplo `10000.00` ou `10000`). | Sim |
| transaction > order > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Sim |
| transaction > order > additionalValues > TX_TAX | Alfanumérico | 64 | Total do Imposto sobre Valor Agregado (IVA). | Sim |
| transaction > order > additionalValues > TX_TAX > value | Número | 12, 2 | Especifica o valor do IVA.  | Não |
| transaction > order > additionalValues > TX_TAX > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE | Alfanumérico | 64 | Valor base para cálculo do VAT.<br>Se o valor não tiver IVA, envie 0.<br>Este valor pode ter duas casas decimais.  | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > value | Número | 12, 2 | Especifica o valor base da transação. | Não |
| transaction > order > additionalValues > TX_TAX_RETURN_BASE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). | Não |
| transaction > payer |  |  | Informações do pagador. | Não |
| transaction > payer > emailAddress | Alfanumérico | Máx:255 | Endereço de e-mail do pagador. | Não |
| transaction > payer > merchantPayerId | Alfanumérico | Máx:100 | Identificador do pagador em seu sistema. | Não |
| transaction > payer > fullName | Alfanumérico | Máx:150 | Nome of the payer. | Não |
| transaction > payer > billingAddress |  |  | Endereço de cobrança. | Não |
| transaction > payer > billingAddress > street1 | Alfanumérico | Máx:100 | Endereço de cobrança linha 1. | Não |
| transaction > payer > billingAddress > street2 | Alfanumérico | Máx:100 | Endereço de cobrança linha 2. | Não |
| transaction > payer > billingAddress > city | Alfanumérico | Máx:50 | Cidade do endereço de cobrança. | Não |
| transaction > payer > billingAddress > state | Alfanumérico | Máx:40 | Estado do endereço de cobrança. | Não |
| transaction > payer > billingAddress > country | Alfanumérico | 2 | País do endereço de cobrança no formato ISO 3166 Alpha-2. | Não |
| transaction > payer > billingAddress > postalCode | Alfanumérico | Máx:20 | CEP do endereço de cobrança. Para o Brasil, use o formato `XXXXX-XXX` ou `XXXXXXXX`. Exemplo: `09210-710` ou `09210710`. | Não |
| transaction > payer > billingAddress > phone | Alfanumérico | Máx:20 | Número de telefone do endereço de cobrança. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Não |
| transaction > payer > birthdate | Alfanumérico | Máx:10 | Data de nascimento do pagador. Formato `YYYY-MM-DD`. | Não |
| transaction > payer > contactPhone | Alfanumérico | Máx:20 | Número de telefone do pagador. Para o Brasil, use o formato `ddd(2)+number(7-9)`. Exemplo: `(11)756312633`. | Não |
| transaction > payer > dniNumber | Alfanumérico | Máx:20 | Número de identificação do pagador. Você deve usar um algoritmo para validar o CPF, que deve ser definido usando o formato `XXX.XXX.XXX-XX`. Exemplo: `811.807.405-64`. | Não |
| transaction > payer > dniType | Alfanumérico | 2 | Tipo de identificação do pagador. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}). | Não |
| transaction > type | Alfanumérico | 32 | Como os pagamentos em transferência bancária são feitos no site do banco, o único tipo de transação disponível é `AUTHORIZATION_AND_CAPTURE` | Sim |
| transaction > paymentMethod | Alfanumérico | 32 | Selecione um método de pagamento válido em Transferência Bancária. [Veja os métodos de pagamento disponíveis o Brasil]({{< ref "select-your-payment-method.html#Brazil" >}}). | Sim |
| transaction > paymentCountry | Alfanumérico | 2 | Definir `BR` para o Brasil. | Sim |
| transaction > deviceSessionId | Alfanumérico | Máx:255 | Identificador da sessão do dispositivo onde o cliente faz a transação. Para obter mais informações, consulte [este tópico]({{< ref "integrations.html#_devicesessionid_-variable" >}}). | Sim |
| transaction > ipAddress | Alfanumérico | Máx:39 | Endereço IP do dispositivo onde o cliente faz a transação. | Sim |
| transaction > cookie | Alfanumérico | Máx:255 | Cookie armazenado pelo dispositivo onde o cliente faz a transação. | Sim |
| transaction > userAgent | Alfanumérico | Máx:1024 | O agente do usuário do navegador onde o cliente faz a transação. | Sim |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| transactionResponse |  |  | Os dados de resposta. |
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
| transactionResponse > operationDate | Date |  | Data de criação da resposta no sistema PayU. |
| transactionResponse > extraParameters |  |  | Parâmetros ou dados adicionais associados à resposta.<br>Em JSON, o parâmetro _extraParameters_ segue esta estrutura: <br>`"extraParameters": {`<br>&emsp;`"BANK_URL": "https://gateway.payulatam.com/ppp-web-gateway/payment-redirect.zul?prid=1181964158Ya5b4bd5e7c6e4ebY4085cd2deb967f2"`<br>`}`<br><br>Em XML, o parâmetro _extraParameters_ segue esta estrutura: <br>`<extraParameters>`<br>&emsp;`<entry>`<br>&emsp;&emsp;`<string>BANK_URL</string>`<br>&emsp;&emsp;`<string>https://gateway.payulatam.com/ppp-web-gateway/payment-redirect.zul?prid=1181964158Ya5b4bd5e7c6e4ebY4085cd2deb967f2</string>`<br>&emsp;`</entry>`<br>`</extraParameters>` |
| transactionResponse > additionalInfo |  |  | Informações adicionais associadas à resposta. Este objeto segue a mesma estrutura que `transactionResponse.extraParameters`. |

</details>

#### Observações {#considerations-4}
* Caso a sua loja não tenha entidade local, também é obrigatório o envio do CPF (parâmetro  `transaction.[payer|buyer].dniNumber`) ou o CNPJ (parâmetro `transaction.[payer|buyer].cnpj`).
* O parâmetro `transaction.expirationDate` não é obrigatórionão é obrigatório. Se você não enviar este parâmetro, seu valor padrão será de quatro (4) dias após a data atual.<br>Se você enviar uma data posterior ao número de dias padrão, PayU ignorará esse valor e o vencimento será definido como padrão.
* Quando o pagador seleciona este método de pagamento, o PayU cria uma ordem no estado _Em andamento_ e uma transação no estado `PENDING`.
* No corpo da resposta, você encontra o recibo gerado pelo PayU e a data de vencimento.

### Chamada API {#api-call-2}
A seguir estão o corpo do pedido e da resposta deste meio de pagamento.

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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
         "accountId": "512327",
         "referenceCode": "PRODUCT_TEST_2021-06-17T19:11:57.179Z",
         "description": "payment test",
         "language": "es",
         "signature": "fbc089272288edc52c332395d9566f4c",
         "notifyUrl": "http://www.payu.com/notify",
         "additionalValues": {
            "TX_VALUE": {
               "value": 1000,
               "currency": "BRL"
         }
         },
         "buyer": {
            "merchantBuyerId": "1",
            "fullName": "First name and second buyer name",
            "emailAddress": "buyer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "811.807.405-64",
            "cnpj": "32593371000110",
            "shippingAddress": {
               "street1": "Quadra QNP 34 Conjunto G 780",
               "street2": "5555487",
               "city": "Manaos",
               "state": "SP",
               "country": "BR",
               "postalCode": "10012545",
               "phone": "7563126"
            }
         },
         "shippingAddress": {
            "street1": "Quadra QNP 34 Conjunto G 780",
            "street2": "5555487",
            "city": "Manaos",
            "state": "SP",
            "country": "BR",
            "postalCode": "10012545",
            "phone": "7563126"
         }
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "ITAU",
      "expirationDate": "2021-06-23T22:30:21.231",
      "paymentCountry": "BR",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": false
}
```
<br>

Exemplo resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1181965590,
        "transactionId": "bd273cec-d2f2-4f00-a125-c705c82b5605",
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
            "BANK_URL": "https://gateway.payulatam.com/ppp-web-gateway/payment-redirect.zul?prid=1181965590Ybd273cecd2f24f0Y88337fa73366de5",
            "EXPIRATION_DATE": 1626207065416
        },
        "additionalInfo": {
            "paymentNetwork": "ITAU_SHOPLINE",
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

Exemplo pedido:
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
         <accountId>512327</accountId>
         <referenceCode>PRODUCT_TEST_2021-06-17T19:11:57.179Z</referenceCode>
         <description>payment test</description>
         <language>es</language>
         <signature>fbc089272288edc52c332395d9566f4c</signature>
         <notifyUrl>http://www.payu.com/notify</notifyUrl>
         <additionalValues>
            <entry>
               <string>TX_VALUE</string>
               <additionalValue>
                  <value>1000</value>
                  <currency>BRL</currency>
               </additionalValue>
            </entry>
         </additionalValues>
         <buyer>
            <contactPhone>7563126</contactPhone>
            <dniNumber>811.807.405-64</dniNumber>
            <cnpj>32593371000110</cnpj>
            <emailAddress>buyer_test@test.com</emailAddress>
            <fullName>First name and second buyer name</fullName>
            <merchantBuyerId>1</merchantBuyerId>
            <shippingAddress>
               <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>            
               <city>Manaos</city>
               <state>SP</state>               
               <country>BR</country>
               <postalCode>10012545</postalCode>
               <phone>7563126</phone>
            </shippingAddress>
         </buyer>
         <shippingAddress>
            <street1>Quadra QNP 34 Conjunto G 780</street1>
               <street2>5555487</street2>            
               <city>Manaos</city>
               <state>SP</state>               
               <country>BR</country>
                <postalCode>10012545</postalCode>
               <phone>7563126</phone>
         </shippingAddress>
      </order>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>ITAU</paymentMethod>
      <expirationDate>2021-06-23T22:30:21.231</expirationDate>
      <paymentCountry>BR</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Exemplo resposta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>1181965893</orderId>
        <transactionId>8397992b-3717-49c5-92ee-345a65ff13cf</transactionId>
        <state>PENDING</state>
        <pendingReason>AWAITING_NOTIFICATION</pendingReason>
        <responseCode>PENDING_TRANSACTION_CONFIRMATION</responseCode>
        <extraParameters>
            <entry>
                <string>BANK_URL</string>
                <string>https://gateway.payulatam.com/ppp-web-gateway/payment-redirect.zul?prid=1181965893Y8397992b371749cY7ad19f758dd04bc</string>
            </entry>
            <entry>
                <string>EXPIRATION_DATE</string>
                <date>2021-07-13T15:14:00</date>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>ITAU_SHOPLINE</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Consulta de métodos de pagamento disponíveis {#available-payment-methods-query}
Este método gera uma lista dos métodos de pagamento disponíveis em todos os países.

### Variáveis para pedido e resposta {#variables-for-request-and-response-4}

<details>
<summary>Pedido</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `GET_PAYMENT_METHODS`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| merchant |  |  | Este objeto contém os dados de autenticação. | Sim |
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
| paymentMethods |  |  | Lista dos métodos de pagamento. |
| paymentMethods > paymentMethodComplete |  |  | Este objeto contém as informações de um método de pagamento. |
| paymentMethods > paymentMethodComplete > id | Numérico |  | Identificador do método de pagamento. |
| paymentMethods > paymentMethodComplete > description | Alfanumérico | Máx:32 | Nome do método de pagamento. |
| paymentMethods > paymentMethodComplete > country | Alfanumérico | 2 | Código ISO do país do método de pagamento. |

</details>

### Chamada API {#api-call-3}
A seguir estão os corpos do pedido e resposta deste método. Para fins de exemplo, a solicitação e a resposta aqui mostram dois métodos de pagamento. 

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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

Exemplo resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "paymentMethods": [
        {
            "id": "177",
            "description": "VISA",
            "country": "BR",
            "enabled": true,
            "reason": null
        },
        {
            "id": "172",
            "description": "MASTERCARD",
            "country": "BR",
            "enabled": true,
            "reason": null
        }
    ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
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
            <id>177</id>
            <description>VISA</description>
            <country>BR</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
        <paymentMethodComplete>
            <id>172</id>
            <description>MASTERCARD</description>
            <country>BR</country>
            <enabled>true</enabled>
        </paymentMethodComplete>
    </paymentMethods>
</paymentMethodsResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Ping
O método `PING` permite que você confirme a conexão com a nossa plataforma.

### Variáveis para pedido e resposta {#variables-for-request-and-response-5}

<details>
<summary>Pedido</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório | 
|-|-|-|-|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `PING`. | Sim |
| test (JSON)<hr>isTest (XML) | Boolean |  | Definir `true` se o pedido estiver em modo de teste. Caso contrário, definir `false`. | Sim |
| merchant |  |  | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | O código de resposta da transação. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada, caso tenha ocorrido um erro. |
| transactionResponse | transactionResponse | Máx:2048 | A resposta do método PING caso tenha ocorrido um erro. |
</details>

### Chamada API {#api-call-4}
A seguir estão os corpos do pedido e resposta deste método.

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
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

Exemplo resposta:
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

Exemplo pedido:
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

Exemplo resposta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

