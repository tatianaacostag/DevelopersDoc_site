---
title: "API de Cancelamentos e Reembolsos"
linkTitle: "API de Cancelamentos e Reembolsos"
date: 2021-06-25T09:24:50-05:00
description: >
  Este recurso permite solicitar o cancelamento ou o reembolso das transações autorizadas ou cobradas. Você pode criar a solicitação de reembolso usando o método Reembolso (_Refund_) ou Cancelamento (_Void_) de acordo com o status da transação.
weight: 50
tags: ["subtopic"]
---

Para integrar com a API de Cancelamentos e Reembolsos, direcione sua solicitação para as seguintes URLs de acordo com seu ambiente.

{{% alert title="URL" color="info"%}}
* Teste: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Produção: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

Se você precisar entender os conceitos e ler mais observações sobre Cancelamentos e Reembolsos, consulte [este artigo]({{< ref "Refunds.md" >}}).

## Considerações por país {#considerations-per-country}
Antes de usar a API de Cancelamentos e Reembolsos, Leve em conta as seguintes informações.

### Argentina
* O tempo máximo para enviar um cancelamento é de 14 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será cancelada automaticamente (auto-void).
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é 365 dias e 180 dias para reembolsos parciais.
* Reembolsos com casas decimais não são aceitos.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no máximo 30 dias úteis.

### Brasil
* O tempo máximo para enviar um cancelamento é de 7 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será cancelada.
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é:
   - 90 dias para transações com PIX ou processadas na Redecard .
   - 120 dias para transações processadas na  Cielo.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no máximo 15 dias úteis.

### Chile
* Devido a restrições de rede, o cancelamento pode ser autorizado nas primeiras três horas após a autorização. Se nenhum cancelamento ou reembolso for enviado após de 7 dias, a transação será cancelada automaticamente (auto-void).
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é 90 dias.
* Reembolsos para [transações processadas por WebPay Plus]({{< ref "Payments-API-chile.md#submit-transaction-with-debit-and-prepaid-cards" >}}) não estão disponíveis.
* Para transações com cartões pré-pagos não processadas pelo WebPay Plus, os reembolsos solicitados na primeira hora após a cobrança podem ser aprovados ou rejeitados pela rede financeira. Após a primeira hora, todos os reembolsos de transações com cartões pré-pagos são rejeitados.
* Se o reembolso for rejeitado, o PayU mostra o [código de erro]({{< ref "Response-codes-and-variables.md#response-codes-for-transactions" >}}) gerado pela rede.
* Reembolsos com casas decimais não são aceitos.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em 8 a 20 dias úteis.
* Reembolsos parciais para transações parceladas são recebidos online, mas PayU os processa manualmente devido a restrições do adquirente.
* O valor mínimo para enviar um reembolso é de 10 CLP.

### Colômbia
* Não há suporte para cancelamentos.
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é de dois anos.
* O valor mínimo para envio do Reembolso é de 100 COP.
* Se o reembolso não for enviado no mesmo dia em que a transação foi capturada (antes das 21h UTC-5), o reembolso vai imediatamente para um processo manual sem a tentativa online.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no máximo, 30 dias úteis.
* Reembolsos parciais não estão disponíveis para cartões de crédito internacionais.

### México
* O tempo mínimo para envio do cancelamento é de 10 minutos após a autorização e o máximo é de 30 dias. Se a transação foi feita com American Express, o prazo máximo é de 7 dias.<br>Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será cancelada automaticamente (auto-void).
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é 180 dias. Se a transação foi processada pelo Bancomer, o prazo máximo é de 45 dias.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no 30 dias úteis.
* Reembolsos com casas decimais não são aceitos.

### Panamá
* Não há suporte para cancelamentos.
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é 180 dias.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no máximo 8 dias úteis.

### Peru
* O número máximo de dias para cancelar uma autorização é: 
    - Visa: 21 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será capturada automaticamente.
    - Mastercard: 28 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será capturada automaticamente.
    - American Express: 30 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será cancelada automaticamente (auto-void).
    - Diners: 11 dias. Se nenhum cancelamento ou reembolso for enviado após esse período, a transação será cancelada automaticamente (auto-void).
* O tempo mínimo para enviar um reembolso é de 10 minutos após a aprovação e o máximo é 180 dias.
* Reembolsos parciais são aceitos para transações sem parcelamento. Lembre-se de que as transações com uma parcela são consideradas sem parcelas.
* Reembolsos parciais com visanet devem ser enviados após um dia.
* Quando um reembolso é aprovado, o pagador recebe o dinheiro de volta em, no 15 to 25 dias úteis.
* O valor mínimo para envio do Reembolso é de 1 USD ou 1 PEN.

## Cancelamentos (Void) {#void}
O método `VOID` cancela uma transação previamente autorizada. O cancelamento é um procedimento automático. Assim que você enviar o pedido de `VOID`, não há nenhum fluxo de aprovação e a transação não é cobrada do titular do cartão.

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
| transaction > order > id | Número |  | Identificador da ordem a cancelar. | Sim |
| transaction > type | Alfanumérico | 32 | Definir `VOID` para cancelar uma transação autorizada.</li></ul> | Sim |
| transaction > reason | Alfanumérico |  | Forneça o motivo para cancelar uma transação autorizada. | Não |
| transaction > parentTransactionId | Alfanumérico | 36 | Identificador da transação a cancelar. | Sim |

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
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Máx:255 | O código de resposta fornecido pela rede financeira. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Máx:255 | A mensagem de erro fornecida pela rede financeira. |
| transactionResponse > trazabilityCode | Alfanumérico | Máx:32 | O código de rastreamento fornecido pela rede financeira. |
| transactionResponse > authorizationCode | Alfanumérico | Máx:12 | O código de autorização fornecido pela rede financeira. |
| transactionResponse > responseCode | Alfanumérico | Máx:64 | O código de resposta associado ao status. |
| transactionResponse > responseMessage | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| transactionResponse > operationDate | Date |  | Data de criação da resposta no sistema PayU. |

</details>

### Chamada API {#api-call} 
A seguir estão os corpos de pedido e resposta para este tipo de transação.

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
         "id": "1400462414"
      },
      "type": "VOID",
      "reason": "Reason for requesting the void da transação",
      "parentTransactionId": "c8ec8737-7645-4756-a991-6e60a99eb4d9"
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
        "orderId": 1400462414,
        "transactionId": "57546e0a-8275-48e3-af11-7d3dc7420bfe",
        "state": "APPROVED",
        "paymentNetworkResponseCode": "0",
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": "49263990",
        "authorizationCode": "NPS-011111",
        "pendingReason": null,
        "responseCode": "APPROVED",
        "errorCode": null,
        "responseMessage": "APROBADA - Autorizada",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1624880273010,
        "referenceQuestionnaire": null,
        "extraParameters": null,
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
         <id>1400462466</id>
      </order>
      <type>VOID</type>
      <parentTransactionId>50876ad6-46f2-4c8d-bb91-2f028b56ccb8</parentTransactionId>
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
        <orderId>1400462466</orderId>
        <transactionId>5fbb1ab0-3d2e-448f-a0be-b0bcfb5501ae</transactionId>
        <state>APPROVED</state>
        <paymentNetworkResponseCode>0</paymentNetworkResponseCode>
        <trazabilityCode>49263990</trazabilityCode>
        <authorizationCode>NPS-011111</authorizationCode>
        <responseCode>APPROVED</responseCode>
        <responseMessage>APROBADA - Autorizada</responseMessage>
        <operationDate>2021-06-28T06:57:44</operationDate>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Reembolsos (Refunds) {#refunds}
Reembolsos são solicitados quando uma loja decide devolver voluntariamente o dinheiro gasto pelo comprador por motivos de insatisfação ou quando a loja não possui estoque suficiente do produto adquirido. O método `REFUND` solicita a reversão de uma transação capturada anteriormente.

Reembolsos podem ser solicitados pelo valor total ou parcial (`PARTIAL REFUND`).

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
| transaction > additionalValues > |  | 64 | Valor do reembolso parcial. Este parâmetro e seus valores são obrigatórios para realizar um reembolso parcial | Não |
| transaction > additionalValues > TX_VALUE | Alfanumérico | 64 | Valor da transação. Obrigatório para reembolsos parciais | Não |
| transaction > additionalValues > TX_VALUE > value | Número | 19 | Especifica o valor da transação. Obrigatório para reembolsos parciais | Não |
| transaction > additionalValues > TX_VALUE > currency | Alfanumérico | 3 | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). Obrigatório para reembolsos parciais | Não |
| transaction > order |  |  | Este objeto contém os dados da ordem. | Sim |
| transaction > order > id | Número |  | Identifier da ordem a ser reembolsada. | Sim |
| transaction > type | Alfanumérico | 32 | Definir este valor de acordo com a transação que você quer:<br><ul style="margin-bottom: initial;"><li>`REFUND`</li><li>`PARTIAL_REFUND` para reembolsos parciais (se disponível).</li></ul> | Sim |
| transaction > reason | Alfanumérico |  | Forneça o motivo para reembolsar uma transação autorizada. | Não |
| transaction > parentTransactionId | Alfanumérico | 36 | Identifier da transação a ser reembolsada. | Sim |

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
| transactionResponse > paymentNetworkResponseCode | Alfanumérico | Máx:255 | O código de resposta fornecido pela rede financeira. |
| transactionResponse > paymentNetworkResponseErrorMessage | Alfanumérico | Máx:255 | A mensagem de erro fornecida pela rede financeira. |
| transactionResponse > trazabilityCode | Alfanumérico | Máx:32 | O código de rastreamento fornecido pela rede financeira. |
| transactionResponse > authorizationCode | Alfanumérico | Máx:12 | O código de autorização fornecido pela rede financeira. |
| transactionResponse > responseCode | Alfanumérico | Máx:64 | O código de resposta associado ao status. |
| transactionResponse > responseMessage | Alfanumérico | Máx:2048 | Mensagem associada ao código de resposta. |
| transactionResponse > operationDate | Date |  | Data de criação da resposta no sistema PayU. |

</details>

### Chamada API {#api-call-1}
A seguir estão os corpos de pedido e resposta para este tipo de transação.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido (Refund):
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
         "id": "1400462687"
      },
      "type": "REFUND",
      "reason": "Reason for requesting the refund da transação",
      "parentTransactionId": "60e2080d-08b1-4db2-a54f-8bcbe8271662"
   },
   "test": false
}
```
<br>

Exemplo pedido (Partial refund):
```JSON
{  
   "command":"SUBMIT_TRANSACTION",
   "language":"es",
   "merchant":{  
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
      "apiLogin": "pRRXKOl8ikMmt9u"
   },
   "transaction":{  
      "additionalValues":{  
         "TX_VALUE":{  
            "value":"950",
            "currency":"ARS"
         }
      },
      "order":{  
         "id":"1400462690"
      },
      "parentTransactionId":"0486359b-a048-4b6b-9b72-af584e710e64",
      "reason":"Reason for requesting the refund ou cancellation da transação",
      "type":"PARTIAL_REFUND"
   }
}
```
<br>

Exemplo resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1400462690,
        "transactionId": null,
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": null,
        "authorizationCode": null,
        "pendingReason": "PENDING_REVIEW",
        "responseCode": null,
        "errorCode": null,
        "responseMessage": "1400462690",
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": null,
        "referenceQuestionnaire": null,
        "extraParameters": null,
        "additionalInfo": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido (Refund):
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
         <id>1400462689</id>
      </order>
      <type>REFUND</type>
      <reason>Reason for requesting the refund da transação.</reason>
      <parentTransactionId>1d31ea44-0d8f-4e65-93ac-6be4347e5b40</parentTransactionId>
   </transaction>
   <isTest>false</isTest>
</request>
```
<br>

Exemplo pedido (Partial refund):
```XML
<request>
   <language>es</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <additionalValues>
         <entry>
            <string>TX_VALUE</string>
            <additionalValue>
               <value>100</value>
               <currency>ARS</currency>
            </additionalValue>
         </entry>
      </additionalValues>
      <order>
         <id>1400462691</id>
      </order>
      <type>REFUND</type>
      <reason>Reason for requesting the refund da transação.</reason>
      <parentTransactionId>976d0411-8d0f-46e7-b5fe-515dad9a41ee</parentTransactionId>
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
        <orderId>1400462691</orderId>
        <transactionId>6cef020a-8006-4744-b7f9-d9a343807297</transactionId>
        <state>PENDING</state>
        <pendingReason>PENDING_REVIEW</pendingReason>
        <responseMessage>1400462690</responseMessage>
    </transactionResponse>
</paymentResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Consultar o status do reembolso {#query-the-refund-status}
Conforme mencionado anteriormente, a solicitação de reembolso segue um fluxo de aprovação em que o PayU leva de 1 a 3 dias para processar a solicitação e aprova ou rejeita a solicitação. Se quiser saber o status do reembolso, você tem duas opções:

#### Verifique o status através do Módulo PayU {#check-status-through-the-payu-module}
1. Faça login em sua conta do módulo PayU. No painel esquerdo, expanda o menu _**Transações**_ e selecione a opção _**Relatório de Vendas**_.

![PrintScreen](/assets/Refunds/Refunds_en_01.png)

2. Use o campo _**Filtrar minhas vendas**_ para encontrar a ordem usando o ID da transação e da ordem.

<img src="/assets/Refunds/Refunds_en_02.png" alt="PrintScreen" width="50%"/><br>

3. A coluna Estado mostra se o reembolso foi aprovado ou rejeitado; se o reembolso não foi aprovado, esta coluna mostra que o reembolso foi solicitado..

![PrintScreen](/assets/Refunds/Refunds_en_03.png)

#### Verifique o status usando consultas {#check-status-using-queries}
Você pode consultar o estado do reembolso usando o [API de Consultas]({{< ref "Queries-API.md" >}}). No pedido à consulta, você precisa enviar o id da ordem.

Ao consultar uma ordem, o sistema exibe a última transação associada à ordem.

Existem três status possíveis na resposta a seu pedido:
* **Solicitação não resolvida**: se o pedido não foi resolvido, a ordem encontrada na consulta aparece com status `CAPTURED` (parâmetro`result.payload.status` na resposta). O primeiro tipo de transação é `AUTHORIZATION_AND_CAPTURE` (parâmetro `result.transactions.type` na resposta) e o primeiro status da transação é `APPROVED` (primeiro parâmetro `result.transactions.transactionResponse.state` na resposta).
* **Aprovada**: se o pedido de reembolso for aprovado por um agente de atendimento ao cliente do PayU, a ordem encontrada na consulta aparecerá com status `REFUNDED` (parâmetro`result.payload.status` na resposta). O primeiro tipo de transação é `REFUND` (parâmetro `result.transactions.type` na resposta) e o primeiro status da transação é `APPROVED` (primeiro parâmetro `result.transactions.transactionResponse.state` na resposta).
* **Recusada**: se o pedido de reembolso for recusada por um agente de atendimento ao cliente do PayU, a ordem encontrada na consulta aparecerá com status `CAPTURED` (parâmetro`result.payload.status` na resposta). O primeiro tipo de transação é `REFUND` (parâmetro `result.transactions.type` na resposta) e o primeiro status da transação é `DECLINED` (primeiro parâmetro `result.transactions.transactionResponse.state` na resposta).