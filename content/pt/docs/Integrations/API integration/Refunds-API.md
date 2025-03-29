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

## Considerações por País

Antes de usar a API de Anulações e Reembolsos, leve em conta as seguintes considerações específicas por país.

### Argentina

- Uma solicitação de anulação deve ser enviada dentro de **14 dias**; caso contrário, a transação será automaticamente anulada.
- Reembolsos podem ser solicitados **pelo menos 10 minutos após a aprovação** e até **357 dias** após a transação.
- Reembolsos com valores decimais **não são suportados**.
- Após a aprovação do reembolso, o pagador recebe os fundos **dentro de 30 dias úteis**.

### Brasil

- Uma solicitação de anulação deve ser enviada dentro de **7 dias**; caso contrário, a transação será cancelada.
- Reembolsos podem ser solicitados **pelo menos 10 minutos após a aprovação** e até:
  - **87 dias** para transações feitas com PIX.
  - **172 dias** para transações com cartão.
- **Reembolsos parciais múltiplos** são suportados para transações via PIX.
- Após a aprovação:
  - Reembolsos para **transações via PIX** são processados **imediatamente**.
  - Reembolsos para **outros métodos de pagamento** levam até **15 dias úteis**.

### Chile

- Devido a restrições da rede, uma **solicitação de anulação** só pode ser autorizada **dentro de 3 horas após a transação**. Se a anulação não for aceita ou nenhuma captura for enviada dentro de **7 dias**, a transação será automaticamente anulada.
- Reembolsos podem ser solicitados **pelo menos 10 minutos após a aprovação** e até **327 dias**.
- Reembolsos estão disponíveis para transações processadas por [WebPay Plus ou Redcompra]({{< ref "Payments-API-chile.md#submit-transactions-using-debit-and-prepaid-cards" >}}).
- Para transações com **cartões pré-pagos não processadas pelo WebPay Plus**:
  - Reembolsos solicitados **na primeira hora** podem ser **aprovados ou rejeitados** pela rede financeira.
  - Reembolsos solicitados **após a primeira hora** são **automaticamente rejeitados**.
- Se um reembolso for rejeitado, o PayU exibirá o [código de erro]({{< ref "Response-codes-and-variables.md#response-codes-for-transactions" >}}) correspondente.
- Reembolsos com valores decimais **não são suportados**.
- Após a aprovação do reembolso, o pagador recebe os fundos **dentro de 8 a 20 dias úteis**.
- **Reembolsos parciais** para transações com **parcelamento** são recebidos online, mas processados manualmente devido a restrições do adquirente.
- O valor mínimo para reembolso é **10 CLP**.

### Colômbia

- **Anulações não são suportadas**.
- Reembolsos podem ser solicitados **pelo menos 10 minutos após a aprovação** e até **357 dias**.
- O valor mínimo para reembolso é **100 COP**.
- Se uma solicitação de reembolso **não for enviada no mesmo dia** da captura da transação (**antes das 21h UTC-5**), ela será **processada manualmente** em vez de tentada online.
- Após a aprovação do reembolso, o pagador recebe os fundos **dentro de 30 dias úteis**.
- **Reembolsos parciais não estão disponíveis** para cartões de crédito internacionais.

### México

- Uma solicitação de anulação deve ser enviada **pelo menos 10 minutos após a autorização** e até:
  - **30 dias** para a maioria das transações.
  - **7 dias** para transações feitas com **American Express**.
  - Se nenhuma anulação ou captura for enviada dentro do prazo, a transação será automaticamente anulada.
- Reembolsos podem ser solicitados **pelo menos 10 minutos após a aprovação** e até:
  - **175 dias** para a maioria das transações.
  - **40 dias** se processadas pelo **Bancomer**.
- Após a aprovação do reembolso, o pagador recebe os fundos **dentro de 30 dias úteis**.
- Reembolsos com valores decimais **não são suportados**.

### Panamá

- **Anulações não são suportadas**.
- Reembolsos podem ser solicitados **pelo menos 10 minutos após a aprovação** e até **357 dias**.
- Após a aprovação do reembolso, o pagador recebe os fundos **dentro de 8 dias úteis**.

### Peru

- O prazo máximo para anular uma autorização depende da rede de pagamento:
  - **Visa**: **21 dias** → Se nenhuma anulação ou captura for enviada, a transação será **automaticamente capturada**.
  - **Mastercard**: **28 dias** → Se nenhuma anulação ou captura for enviada, a transação será **automaticamente capturada**.
  - **American Express**: **30 dias** → Se nenhuma anulação ou captura for enviada, a transação será **automaticamente anulada**.
  - **Diners**: **11 dias** → Se nenhuma anulação ou captura for enviada, a transação será **automaticamente anulada**.
- Reembolsos podem ser solicitados **pelo menos 10 minutos após a aprovação** e até **357 dias**.
- **Reembolsos parciais** são suportados para transações **sem parcelamento** (incluindo transações com uma única parcela).
- **Reembolsos parciais com a Visanet** devem ser enviados **pelo menos um dia após a transação**.
- Após a aprovação do reembolso, o pagador recebe os fundos **dentro de 15 a 25 dias úteis**.
- O valor mínimo para reembolso é **1 USD ou 1 PEN**.

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