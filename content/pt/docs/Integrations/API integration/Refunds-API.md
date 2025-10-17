---
title: "API de Anulações e Reembolsos"
linkTitle: "API de Anulações e Reembolsos"
date: 2021-06-25T09:24:50-05:00
description: >
  A API de Anulações e Reembolsos permite cancelar ou reembolsar transações que foram autorizadas ou capturadas. Dependendo do status da transação, você pode enviar uma solicitação usando os métodos `Void` ou `Refund`.
weight: 50
tags: ["subtopic"]
---

{{% alert title="Nota" color="info"%}}

Para integrar a API de Anulações e Reembolsos, direcione suas solicitações para a URL do ambiente apropriado:

* Teste: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Produção: ```https://api.payulatam.com/payments-api/4.0/service.cgi```

{{% /alert %}}

Para entender melhor as anulações e reembolsos, incluindo conceitos-chave e considerações, consulte [este documento]({{< ref "Refunds.md" >}}).

## Considerações por país

Antes de usar a API de Anulações e Reembolsos, leve em conta as seguintes considerações específicas por país.

<details id="argentina">
<summary><img src="/assets/Argentina.png" width="25px"/> &nbsp; <b>Argentina</b></summary>

| Anulações | Reembolsos |
|-----------|------------|
| <ul><li>Envie a solicitação em até **14 dias**; caso contrário, o sistema anula automaticamente a transação.</li></ul> | <ul><li>Solicite um reembolso **pelo menos 10 minutos após a aprovação** e até **357 dias** após a transação.</li><li>Não inclua valores decimais nos reembolsos.</li><li>Você pode solicitar mais de um reembolso parcial para pagamentos feitos com **AMEX, Mastercard, Naranja ou Visa**.</li><li>Uma vez aprovado, a PayU transfere os fundos ao pagador em até **30 dias úteis**.</li></ul> |

</details>

<details id="brazil">
<summary><img src="/assets/Brasil.png" width="25px"/> &nbsp; <b>Brasil</b></summary>

| Anulações | Reembolsos |
|-----------|------------|
| <ul><li>Envie a solicitação em até **7 dias**; caso contrário, o sistema anula automaticamente a transação.</li></ul> | <ul><li>Solicite um reembolso **pelo menos 10 minutos após a aprovação**.</li><li>Para transações feitas com **PIX**, solicite reembolsos em até **87 dias** após a transação.</li><li>Para transações com cartão, solicite reembolsos em até **172 dias** após a transação.</li><li>Você pode solicitar mais de um reembolso parcial para pagamentos feitos com **AMEX, Elo, Mastercard, PIX ou Visa**.</li><li>Uma vez aprovado, os reembolsos de **transações PIX** são processados **imediatamente**.</li><li>Uma vez aprovado, os reembolsos de **outros métodos de pagamento** levam até **15 dias úteis**.</li></ul> |

</details>

<details id="chile">
<summary><img src="/assets/Chile.png" width="25px"/> &nbsp; <b>Chile</b></summary>

| Anulações | Reembolsos |
|-----------|------------|
| <ul><li>Envie a solicitação em até **3 horas após a transação**; caso contrário, a rede não autoriza a anulação.</li><li>Se a anulação não for aceita ou nenhuma captura for enviada em até **7 dias**, o sistema anula automaticamente a transação.</li></ul> | <ul><li>Solicite um reembolso **pelo menos 10 minutos após a aprovação** e até **327 dias** após a transação.</li><li>Os reembolsos também estão disponíveis para transações processadas através de [WebPay Plus ou Redcompra]({{< ref "Payments-API-chile.md#submit-transactions-using-debit-and-prepaid-cards" >}}).</li><li>Para **transações com cartões pré-pagos não processadas pelo WebPay Plus**: <ul><li>Se solicitar um reembolso na **primeira hora**, a rede financeira pode aprová-lo ou rejeitá-lo.</li><li>Se solicitar um reembolso **após a primeira hora**, a rede financeira o rejeita automaticamente.</li></ul></li><li>Se a rede financeira rejeitar um reembolso, a PayU exibirá o [código de erro]({{< ref "Response-codes-and-variables.md#response-codes-for-transactions" >}}) correspondente.</li><li>Não inclua valores decimais nos reembolsos.</li><li>Uma vez aprovado, o pagador recebe os fundos em até **8 a 20 dias úteis**.</li><li>Você pode enviar reembolsos parciais para transações com **parcelamento**; a PayU os recebe online, mas os processa manualmente devido a restrições do adquirente.</li><li>Siga os valores mínimos de reembolso exigidos pela rede adquirente: <ul><li>Mais de **10 CLP** para transações processadas pela **TRANSBANK**.</li><li>Mais de **50 CLP** para transações processadas pela **KLAP**.</li></ul></li><li>Você pode solicitar mais de um reembolso parcial para pagamentos feitos com **AMEX, Mastercard ou Visa**.</li></ul> |

</details>

<details id="colombia">
<summary><img src="/assets/Colombia.png" width="25px"/> &nbsp; <b>Colômbia</b></summary>

| Anulações | Reembolsos |
|-----------|------------|
| <ul><li>As anulações estão disponíveis apenas quando o **fluxo em duas etapas** está habilitado (AUTHORIZATION seguido de CAPTURE). Nesse caso, você pode cancelar uma **autorização** antes que ela seja capturada. Essa opção está disponível somente para transações com **Visa** e **MasterCard**.</li></ul> | <ul><li>Solicite um reembolso **pelo menos 10 minutos após a aprovação** e até **357 dias** após a transação.</li><li>O valor mínimo de reembolso é de **100 COP**.</li><li>Se você não enviar a solicitação de reembolso no mesmo dia da captura da transação (**antes das 21h UTC-5**), a PayU o processará manualmente em vez de tentar online.</li><li>Uma vez aprovado, o pagador recebe os fundos em até **15 dias úteis**, dependendo da emissora do cartão.</li><li>Solicite apenas **um reembolso parcial por pedido**. Se o cliente solicitar um reembolso adicional, processe-o fora da PayU (por exemplo, por meio de cartão-presente, desconto ou transferência bancária). Você também pode usar nossa [API de Payouts](https://developers.payulatam.com/latam/en/docs/integrations/api-integration/payouts-api.html) para enviar o valor diretamente do seu saldo na PayU. Essa opção está disponível apenas sob o modelo agregador e exige solicitar os dados da conta bancária do cliente a cada vez. Isso é especialmente útil para meios de pagamento alternativos como **Efecty** ou **PSE**.</li><li>Reembolsos parciais para cartões de crédito internacionais **não estão disponíveis**.</li><li>Reembolsos parciais (apenas um por pedido) estão disponíveis para pagamentos feitos com **AMEX, Codensa, Diners, Mastercard ou Visa**.</li></ul> |

</details>

<details id="mexico">
<summary><img src="/assets/Mexico.png" width="25px"/> &nbsp; <b>México</b></summary>

| Anulações | Reembolsos |
|-----------|------------|
| <ul><li>Envie a solicitação **pelo menos 10 minutos após a autorização** e em até **7 dias**.</li><li>Se você não enviar uma anulação ou captura dentro desse prazo, o sistema anula automaticamente a transação.</li></ul> | <ul><li>Solicite um reembolso **pelo menos 10 minutos após a aprovação**.</li><li>Para a maioria das transações, solicite reembolsos em até **175 dias** após a transação.</li><li>Para transações processadas pelo **Bancomer**, solicite reembolsos em até **40 dias** após a transação.</li><li>Uma vez aprovado, o pagador recebe os fundos em até **30 dias úteis**.</li><li>Não inclua valores decimais nos reembolsos.</li><li>Você pode solicitar mais de um reembolso parcial para pagamentos feitos com **AMEX, Mastercard ou Visa**.</li></ul> |

</details>

<details id="panama">
<summary><img src="/assets/Panama.png" width="25px"/> &nbsp; <b>Panamá</b></summary>

| Anulações | Reembolsos |
|-----------|------------|
| <ul><li>A integração não suporta anulações para transações no Panamá.</li></ul> | <ul><li>Solicite um reembolso **pelo menos 10 minutos após a aprovação** e até **357 dias** após a transação.</li><li>Uma vez aprovado, o pagador recebe os fundos em até **8 dias úteis**.</li></ul> |

</details>

<details id="peru">
<summary><img src="/assets/Peru.png" width="25px"/> &nbsp; <b>Peru</b></summary>

| Anulações | Reembolsos |
|-----------|------------|
| <ul><li>Siga o prazo máximo permitido por cada rede de pagamento:</li><ul><li>**Visa**: **21 dias** → Se você não enviar uma anulação ou captura, o sistema captura automaticamente a transação.</li><li>**Mastercard**: **28 dias** → Se você não enviar uma anulação ou captura, o sistema captura automaticamente a transação.</li><li>**American Express**: **30 dias** → Se você não enviar uma anulação ou captura, o sistema anula automaticamente a transação.</li><li>**Diners**: **11 dias** → Se você não enviar uma anulação ou captura, o sistema anula automaticamente a transação.</li></ul></ul> | <ul><li>Solicite um reembolso **pelo menos 10 minutos após a aprovação** e até **357 dias** após a transação.</li><li>Solicite reembolsos parciais apenas para transações **sem parcelamento** (incluindo transações de parcela única).</li><li>Para **transações Visanet**, envie reembolsos parciais **pelo menos um dia após a transação**.</li><li>O valor mínimo de reembolso é **1 USD ou 1 PEN**.</li><li>Você pode solicitar mais de um reembolso parcial para pagamentos feitos com **AMEX, Diners, Mastercard (crédito ou débito) ou Visa (crédito ou débito)**.</li><li>Uma vez aprovado, o pagador recebe os fundos em até **15 a 25 dias úteis**.</li></ul> |

</details>

## Anulação (Void)

O método `VOID` cancela uma transação previamente autorizada. Este é um **processo automático**—assim que a solicitação `VOID` é enviada, não segue nenhum fluxo de aprovação, e a transação **não é cobrada** do portador do cartão.

### Parâmetros para Solicitação e Resposta

<details>

<summary>Solicitação</summary>

<br>

<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|--------------|---------|---------|-------------|:-------------:|
| `language` | Alfanumérico | 2 | Idioma utilizado na requisição. Define o idioma das mensagens de erro. [Veja idiomas suportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx: 32 | Definir como `SUBMIT_TRANSACTION`. | Sim |
| `test` (JSON)<br>`isTest` (XML) | Booleano | — | Definir como `true` para modo de teste; caso contrário, `false`. | Sim |
| `merchant` | Objeto | — | Contém os dados de autenticação. | Sim |
| `merchant > apiLogin` | Alfanumérico | Mín: 12, Máx: 32 | Usuário ou login fornecido pela PayU. [Como obter API Login]({{< ref "integrations.html#api-key-and-api-login" >}}). | Sim |
| `merchant > apiKey` | Alfanumérico | Mín: 6, Máx: 32 | Senha fornecida pela PayU. [Como obter API Key]({{< ref "integrations.html#api-key-and-api-login" >}}). | Sim |
| `transaction` | Objeto | — | Contém os dados da transação. | Sim |
| `transaction > order` | Objeto | — | Contém os detalhes do pedido. | Sim |
| `transaction > order > id` | Numérico | — | ID do pedido a ser anulado. | Sim |
| `transaction > type` | Alfanumérico | 32 | Definir como `VOID` para cancelar uma transação autorizada. | Sim |
| `transaction > reason` | Alfanumérico | — | Motivo da anulação da transação. | Não |
| `transaction > parentTransactionId` | Alfanumérico | 36 | ID da transação a ser anulada. | Sim |

</details>

<details>

<summary>Resposta</summary>

<br>

<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|--------------|---------|---------|-------------|
| `code` | Alfanumérico | — | Código de resposta da transação. Valores possíveis: `ERROR`, `SUCCESS`. |
| `error` | Alfanumérico | Máx: 2048 | Mensagem de erro quando o código de resposta é `ERROR`. |
| `transactionResponse` | Objeto | — | Contém os detalhes da resposta. |
| `transactionResponse > orderId` | Numérico | — | O ID do pedido gerado ou existente na PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | ID da transação na PayU. |
| `transactionResponse > state` | Alfanumérico | Máx: 32 | Status da transação. |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx: 255 | Código de resposta da rede financeira. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx: 255 | Mensagem de erro da rede financeira. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx: 32 | Código de rastreabilidade da rede financeira. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx: 12 | Código de autorização da rede financeira. |
| `transactionResponse > responseCode` | Alfanumérico | Máx: 64 | Código de resposta relacionado ao status da transação. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx: 2048 | Mensagem relacionada ao código de resposta. |
| `transactionResponse > operationDate` | Data | — | Data em que a resposta foi gerada no sistema da PayU. |

</details>

### Chamada da API

Os exemplos a seguir mostram os corpos de requisição e resposta para este tipo de transação.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Exemplo de uma Solicitação:**

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
      "reason": "Motivo do pedido de cancelamento da transação",
      "parentTransactionId": "c8ec8737-7645-4756-a991-6e60a99eb4d9"
   },
   "test": false
}
```

<br>

**Exemplo de uma Resposta:**

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

**Exemplo de uma Solicitação:**

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

**Exemplo de uma Resposta:**

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

## Reembolsos

Um reembolso é emitido quando o comerciante devolve voluntariamente o pagamento ao comprador. Isso pode ocorrer devido à **insatisfação do cliente** ou quando o produto está **fora de estoque**. O método `REFUND` reverte uma transação que já foi capturada.

Os reembolsos podem ser emitidos para o **valor total** ou como um **reembolso parcial** (`PARTIAL_REFUND`).

### Parâmetros para Solicitação e Resposta

<details>
<summary>Solicitação</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|--------------|---------|---------|-------------|:-----------:|
| `language` | Alfanumérico | 2 | Idioma usado na requisição. Isso determina o idioma das mensagens de erro. [Veja os idiomas suportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| `command` | Alfanumérico | Máx: 32 | Defina como `SUBMIT_TRANSACTION`. | Sim |
| `test` (JSON)<br>`isTest` (XML) | Booleano | — | Defina como `true` para o modo de teste; caso contrário, `false`. | Sim |
| `merchant` | Objeto | — | Contém os dados de autenticação. | Sim |
| `merchant > apiLogin` | Alfanumérico | Mín: 12, Máx: 32 | Usuário ou login fornecido pela PayU. [Como obter o API Login]({{< ref "integrations.html#api-key-and-api-login" >}}). | Sim |
| `merchant > apiKey` | Alfanumérico | Mín: 6, Máx: 32 | Senha fornecida pela PayU. [Como obter o API Key]({{< ref "integrations.html#api-key-and-api-login" >}}). | Sim |
| `transaction` | Objeto | — | Contém os dados da transação. | Sim |
| `transaction > additionalValues` | Objeto | — | Especifica o valor para um reembolso parcial. **Obrigatório para reembolsos parciais**. | Não |
| `transaction > additionalValues > TX_VALUE` | Objeto | — | Contém os detalhes do valor da transação. **Obrigatório para reembolsos parciais**. | Não |
| `transaction > additionalValues > TX_VALUE > value` | Número | Máx: 19 | Valor a ser reembolsado. **Obrigatório para reembolsos parciais**. | Não |
| `transaction > additionalValues > TX_VALUE > currency` | Alfanumérico | 3 | Código da moeda em formato ISO. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). **Obrigatório para reembolsos parciais**. | Não |
| `transaction > order` | Objeto | — | Contém os detalhes do pedido. | Sim |
| `transaction > order > id` | Número | — | ID do pedido a ser reembolsado. | Sim |
| `transaction > type` | Alfanumérico | 32 | Especifica o tipo de reembolso:<br>- `REFUND` para reembolsos totais.<br>- `PARTIAL_REFUND` para reembolsos parciais (se suportado). | Sim |
| `transaction > reason` | Alfanumérico | — | Motivo do reembolso. | Não |
| `transaction > parentTransactionId` | Alfanumérico | 36 | ID da transação original que está sendo reembolsada. | Sim |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|--------------|---------|---------|-------------|
| `code` | Alfanumérico | — | Código de resposta da transação. Valores possíveis: `ERROR`, `SUCCESS`. |
| `error` | Alfanumérico | Máx: 2048 | Mensagem de erro quando o código de resposta é `ERROR`. |
| `transactionResponse` | Objeto | — | Contém os detalhes da resposta. |
| `transactionResponse > orderId` | Número | — | O ID do pedido gerado ou existente na PayU. |
| `transactionResponse > transactionId` | Alfanumérico | 36 | ID da transação na PayU. |
| `transactionResponse > state` | Alfanumérico | Máx: 32 | Status da transação. |
| `transactionResponse > paymentNetworkResponseCode` | Alfanumérico | Máx: 255 | Código de resposta da rede financeira. |
| `transactionResponse > paymentNetworkResponseErrorMessage` | Alfanumérico | Máx: 255 | Mensagem de erro da rede financeira. |
| `transactionResponse > trazabilityCode` | Alfanumérico | Máx: 32 | Código de rastreabilidade da rede financeira. |
| `transactionResponse > authorizationCode` | Alfanumérico | Máx: 12 | Código de autorização da rede financeira. |
| `transactionResponse > responseCode` | Alfanumérico | Máx: 64 | Código de resposta associado ao status da transação. |
| `transactionResponse > responseMessage` | Alfanumérico | Máx: 2048 | Mensagem associada ao código de resposta. |
| `transactionResponse > operationDate` | Data | — | Data em que a resposta foi gerada no sistema da PayU. |

</details>

### Chamada da API

Os exemplos a seguir mostram os corpos de requisição e resposta para esse tipo de transação.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Exemplo de uma Solicitação de Reembolso:**

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
      "reason": "Motivo do pedido de reembolso da transação",
      "parentTransactionId": "60e2080d-08b1-4db2-a54f-8bcbe8271662"
   },
   "test": false
}
```

<br>

**Exemplo de uma Solicitação de Reembolso Parcial:**

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

**Exemplo de uma Resposta:**

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

**Exemplo de uma Solicitação de Reembolso:**

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
      <reason>Motivo do pedido de reembolso da transação.</reason>
      <parentTransactionId>1d31ea44-0d8f-4e65-93ac-6be4347e5b40</parentTransactionId>
   </transaction>
   <isTest>false</isTest>
</request>
```

<br>

**Exemplo de uma Solicitação de Reembolso Parcial:**

```XML
<request>
   <command>SUBMIT_TRANSACTION</command>
   <language>es</language>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <additionalValues>
         <entry>
            <string>TX_VALUE</string>
            <additionalValue>
               <value>950</value>
               <currency>ARS</currency>
            </additionalValue>
         </entry>
      </additionalValues>
      <order>
         <id>1400462690</id>
      </order>
      <parentTransactionId>0486359b-a048-4b6b-9b72-af584e710e64</parentTransactionId>
      <reason>Reason for requesting the refund or cancellation of the transaction</reason>
      <type>PARTIAL_REFUND</type>
   </transaction>
</request>
```

<br>

**Exemplo de uma Resposta:**

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

### Consultando o Status do Reembolso

Conforme mencionado anteriormente, os pedidos de reembolso passam por um processo de aprovação no qual a PayU leva de 1 a 3 dias para processar e aprovar ou rejeitar a solicitação. Você pode verificar o status de um reembolso usando um dos seguintes métodos:

#### Verificando o Status pelo Painel de Gestão da PayU

1. Acesse sua conta no módulo da PayU. No painel esquerdo, expanda o menu **Transações** e selecione **Relatório de Vendas**.

   ![PrintScreen](/assets/Refunds/Refunds_en_01.png)

2. Utilize o campo **Filtrar minhas vendas** para buscar o pedido usando o ID do pedido ou o ID da transação.

   <img src="/assets/Refunds/Refunds_en_02.png" alt="PrintScreen" width="50%"/><br>

3. A coluna **Status** indica se o reembolso foi aprovado, rejeitado ou se está pendente.

   ![PrintScreen](/assets/Refunds/Refunds_en_03.png)

#### Verificando o Status pela API de Consultas

Você também pode verificar o status do reembolso usando a [API de Consultas]({{< ref "Queries-API.md" >}}). Para isso, envie uma requisição contendo o **ID do pedido**.

Ao consultar um pedido, o sistema retorna a última transação associada a ele.

A resposta pode indicar um dos três possíveis status:

- **Solicitação Pendente**: Se o pedido de reembolso ainda estiver em análise, o pedido aparecerá com status `CAPTURED` (`result.payload.status` na resposta).  
  - O primeiro tipo de transação será `AUTHORIZATION_AND_CAPTURE` (`result.transactions.type` na resposta).  
  - O primeiro status da transação será `APPROVED` (`result.transactions.transactionResponse.state` na resposta).

- **Aprovado**: Se o pedido de reembolso for aprovado por um agente de atendimento da PayU, o pedido aparecerá com status `REFUNDED` (`result.payload.status` na resposta).  
  - O primeiro tipo de transação será `REFUND` (`result.transactions.type` na resposta).  
  - O primeiro status da transação será `APPROVED` (`result.transactions.transactionResponse.state` na resposta).

- **Recusado**: Se o pedido de reembolso for rejeitado por um agente de atendimento da PayU, o pedido aparecerá com status `CAPTURED` (`result.payload.status` na resposta).  
  - O primeiro tipo de transação será `REFUND` (`result.transactions.type` na resposta).  
  - O primeiro status da transação será `DECLINED` (`result.transactions.transactionResponse.state` na resposta).