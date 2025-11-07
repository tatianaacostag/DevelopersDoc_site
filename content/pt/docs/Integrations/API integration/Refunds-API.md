---
title: "API de Anulações e Reembolsos"
linkTitle: "API de Anulações e Reembolsos"
date: 2021-06-25T09:24:50-05:00
description: >
  A API de Anulações e Reembolsos permite cancelar ou reembolsar transações que foram autorizadas ou capturadas. Dependendo do status da transação, você pode enviar uma solicitação usando os métodos `VOID` ou `REFUND`.
weight: 50
tags: ["subtopic"]
---

{{% alert title="URLs" color="info"%}}

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

O método `VOID` cancela uma transação previamente autorizada. Este é um **processo automático** — assim que o sistema envia uma solicitação `VOID`, ela não segue nenhum fluxo de aprovação, e a integração não cobrará a transação do portador do cartão.

### Parâmetros para solicitação e resposta

<details>

<summary><b>Solicitação</b></summary>

<br>

<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
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

<summary><b>Resposta</b></summary>

<br>

<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
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

**Exemplo de uma resposta:**

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
         <id>1400462466</id>
      </order>
      <type>VOID</type>
      <parentTransactionId>50876ad6-46f2-4c8d-bb91-2f028b56ccb8</parentTransactionId>
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

### Capacidades de reembolso por método de pagamento e país

As tabelas a seguir resumem o comportamento de reembolso observado para diferentes métodos de pagamento na América Latina. Cada seção mostra se um método de pagamento oferece suporte a reembolsos totais, reembolsos parciais e múltiplos reembolsos parciais, incluindo o número máximo de reembolsos parciais identificados durante os testes.

<details id="argentina">
<summary><img src="/assets/Argentina.png" width="25px"/> &nbsp; <b>Argentina</b></summary>

| Método de pagamento | Reembolso total suportado | Reembolso parcial suportado | Múltiplos reembolsos parciais suportados | Máximo de reembolsos parciais | Observações |
|----------------|-----------------------------|-----------------------------|------------------------------------------|-------------------------------|-------------|
| **AMEX** | ✅ Sim | ✅ Sim | ✅ Sim | 7 | Tanto AMEX nacional quanto internacional (crédito) suportam múltiplos reembolsos parciais; AMEX débito suporta apenas um reembolso parcial. |
| **ARGENCARD** | ✅ Sim | ✅ Sim | ✅ Sim | 2 | Suporta até 2 reembolsos parciais (transações nacionais). |
| **CABAL** | ✅ Sim | ✅ Sim | ✅ Sim | 3 | Suporte para múltiplos reembolsos parciais, tanto para débito quanto crédito. |
| **MASTERCARD** | ✅ Sim | ✅ Sim | ✅ Sim | 14 | Suporte para múltiplos reembolsos parciais em débito e crédito; pré-pago suporta apenas um reembolso parcial. |
| **MASTERCARD_PREPAID** | ✅ Sim | ✅ Sim | ❌ Não | 1 | Suporta apenas um reembolso parcial. |
| **NARANJA** | ✅ Sim | ✅ Sim | ✅ Sim | 3 | Múltiplos reembolsos parciais suportados para débito e crédito. |
| **VISA** | ✅ Sim | ✅ Sim | ✅ Sim | 22 | Múltiplos reembolsos parciais permitidos para débito, crédito e pré-pago. |
| **VISA_PREPAID** | ✅ Sim | ✅ Sim | ❌ Não | 1 | Suporta apenas um reembolso parcial. |

</details>

<details id="brazil">
<summary><img src="/assets/Brasil.png" width="25px"/> &nbsp; <b>Brasil</b></summary>

| Método de pagamento | Reembolso total suportado | Reembolso parcial suportado | Múltiplos reembolsos parciais suportados | Máximo de reembolsos parciais | Observações |
|----------------|-----------------------------|-----------------------------|------------------------------------------|-------------------------------|-------------|
| **AMEX** | ✅ Sim | ✅ Sim | ✅ Sim | 3 | Suporte para reembolsos parciais e múltiplos reembolsos parciais em transações de crédito. |
| **ELO** | ✅ Sim | ✅ Sim | ✅ Sim | 5 | Múltiplos reembolsos parciais suportados para transações de crédito e débito. |
| **HIPERCARD** | ✅ Sim | ✅ Sim | ✅ Sim | 2 | Transações de débito permitem até 2 reembolsos parciais. |
| **MASTERCARD** | ✅ Sim | ✅ Sim | ✅ Sim | 5 | Múltiplos reembolsos parciais suportados (transações nacionais). |
| **PIX** | ✅ Sim | ✅ Sim | ✅ Sim | 7 | Suporte para múltiplos reembolsos parciais. |
| **VISA** | ✅ Sim | ✅ Sim | ✅ Sim | 11 | Suporte consistente para múltiplos reembolsos parciais em todos os tipos de cartão (crédito e débito). |

</details>

<details id="chile">
<summary><img src="/assets/Chile.png" width="25px"/> &nbsp; <b>Chile</b></summary>

| Método de pagamento | Reembolso total suportado | Reembolso parcial suportado | Múltiplos reembolsos parciais suportados | Máximo de reembolsos parciais | Observações |
|----------------|-----------------------------|-----------------------------|------------------------------------------|-------------------------------|-------------|
| **AMEX** | ✅ Sim | ✅ Sim | ✅ Sim | 5 | Suporte para transações de crédito nacionais e internacionais. |
| **MASTERCARD** | ✅ Sim | ✅ Sim | ✅ Sim | 10 | Suporte completo para múltiplos reembolsos parciais em todos os tipos de cartão. |
| **MASTERCARD_PREPAID** | ✅ Sim | ✅ Sim | ✅ Sim | 2 | Múltiplos reembolsos parciais suportados para transações de débito. |
| **VISA** | ✅ Sim | ✅ Sim | ✅ Sim | 9 | Múltiplos reembolsos parciais suportados em todos os tipos de cartão; transações nacionais e internacionais confirmadas. |
| **VISA_PREPAID** | ✅ Sim | ✅ Sim | ✅ Sim | 2 | Múltiplos reembolsos parciais suportados para transações de débito. |

</details>

<details id="colombia">
<summary><img src="/assets/Colombia.png" width="25px"/> &nbsp; <b>Colômbia</b></summary>

| Método de pagamento | Recursos |
|----------------|-----------|
| **AMEX** <br> **DINERS** <br> **MASTERCARD** <br> **MASTERCARD_DEBIT** <br> **VISA** <br> **VISA_DEBIT** <br> **VISA_NFC** <br> **CODENSA** | ✅ <b>Reembolso total suportado:</b> Sim<br>✅ <b>Reembolso parcial suportado:</b> Sim<br>❌ <b>Múltiplos reembolsos parciais suportados:</b> Não<br><b>Máximo de Reembolsos Parciais:</b> 1<br><b>Observação:</b> Apenas um reembolso parcial é suportado para todos os métodos de pagamento. |

</details>

<details id="mexico">
<summary><img src="/assets/Mexico.png" width="25px"/> &nbsp; <b>México</b></summary>

| Método de pagamento | Reembolso total suportado | Reembolso parcial suportado | Múltiplos reembolsos parciais suportados | Máximo de reembolsos parciais | Observações |
|----------------|-----------------------------|-----------------------------|------------------------------------------|-------------------------------|-------------|
| **AMEX** | ✅ Sim | ✅ Sim | ✅ Sim | 7 | AMEX suporta múltiplos reembolsos parciais para cartões de crédito nacionais e internacionais (até 7). Cartões de débito suportam apenas um reembolso parcial. |
| **MASTERCARD** | ✅ Sim | ✅ Sim | ✅ Sim | 7 | Suporte para múltiplos reembolsos parciais em cartões de crédito e débito. |
| **VISA** | ✅ Sim | ✅ Sim | ✅ Sim | 10 | Suporte para múltiplos reembolsos parciais em cartões de crédito e débito. |

</details>

<details id="peru">
<summary><img src="/assets/Peru.png" width="25px"/> &nbsp; <b>Peru</b></summary>

| Método de pagamento | Reembolso total suportado | Reembolso parcial suportado | Múltiplos reembolsos parciais suportados | Máximo de reembolsos parciais | Observações |
|----------------|-----------------------------|-----------------------------|------------------------------------------|-------------------------------|-------------|
| **AMEX** | ✅ Sim | ✅ Sim | ✅ Sim | 8 | Múltiplos reembolsos parciais suportados. |
| **DINERS** | ✅ Sim | ✅ Sim | ✅ Sim | 7 | Transações nacionais suportam múltiplos reembolsos parciais; internacionais permitem apenas um reembolso parcial. |
| **MASTERCARD** | ✅ Sim | ✅ Sim | ✅ Sim | 8 | Múltiplos reembolsos parciais suportados. |
| **MASTERCARD_DEBIT** | ✅ Sim | ✅ Sim | ✅ Sim | 8 | Múltiplos reembolsos parciais suportados. |
| **VISA** | ✅ Sim | ✅ Sim | ✅ Sim | 17 | Múltiplos reembolsos parciais suportados. |
| **VISA_DEBIT** | ✅ Sim | ✅ Sim | ✅ Sim | 12 | Múltiplos reembolsos parciais suportados. |
| **YAPE** | ✅ Sim | ✅ Sim | ✅ Sim | 2 | Múltiplos reembolsos parciais suportados. |

</details>

### Parâmetros para solicitação e resposta

<details>
<summary><b>Solicitação</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
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
<summary><b>Resposta</b></summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
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

**Exemplo de uma solicitação de reembolso:**

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

**Exemplo de uma solicitação de reembolso parcial:**

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
      "reason":"Reason for requesting the refund of the transaction",
      "type":"PARTIAL_REFUND"
   }
}
```

<br>

**Exemplo de uma resposta:**

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

**Exemplo de uma solicitação de reembolso:**

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

**Exemplo de uma solicitação de reembolso parcial:**

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
      <reason>Reason for requesting the refund of the transaction</reason>
      <type>PARTIAL_REFUND</type>
   </transaction>
</request>
```

<br>

**Exemplo de uma resposta:**

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

### Consultando o status do reembolso

Conforme mencionado anteriormente, os pedidos de reembolso passam por um processo de aprovação no qual a PayU leva de 1 a 3 dias para processar e aprovar ou rejeitar a solicitação. Você pode verificar o status de um reembolso usando um dos seguintes métodos:

#### Verificando o status pelo Painel de Gestão da PayU

1. Acesse sua conta no módulo da PayU. No painel esquerdo, expanda o menu **Transações** e selecione **Relatório de Vendas**.

   ![PrintScreen](/assets/Refunds/Refunds_en_01.png)

2. Utilize o campo **Filtrar minhas vendas** para buscar o pedido usando o ID do pedido ou o ID da transação.

   <img src="/assets/Refunds/Refunds_en_02.png" alt="PrintScreen" width="50%"/><br>

3. A coluna **Status** indica se o reembolso foi aprovado, rejeitado ou se está pendente.

   ![PrintScreen](/assets/Refunds/Refunds_en_03.png)

#### Verificando o status pela API de Consultas

Você também pode verificar o status do reembolso usando a [API de Consultas]({{< ref "Queries-API.md" >}}). Para isso, envie uma requisição contendo o **ID do pedido**. Ao consultar um pedido, o sistema retorna a última transação associada a ele.

A resposta pode indicar um dos três possíveis status:

- **Solicitação Não Resolvida**: Se a solicitação de reembolso ainda estiver em análise, o pedido aparecerá com o status `CAPTURED` (`result.payload.status` na resposta).  
  - Haverá uma transação do tipo `AUTHORIZATION_AND_CAPTURE` (`result.transactions.type` na resposta), e o status da transação será `APPROVED` (`result.transactions.transactionResponse.state` na resposta).  
  - Se o lojista utilizar um fluxo em duas etapas, haverá uma transação do tipo `AUTHORIZATION` e outra do tipo `CAPTURE`, ambas com o status `APPROVED`.

- **Aprovado**: Se a solicitação de reembolso for aprovada, o pedido aparecerá com o status `REFUNDED` (`result.payload.status` na resposta).  
  - Haverá uma transação do tipo `REFUND` (`result.transactions.type` na resposta).  
  - O status da transação será `APPROVED` (`result.transactions.transactionResponse.state` na resposta).  
  > **Nota:** Se houver capturas parciais que não cubram o valor total do pedido, o status do pedido continuará aparecendo como `CAPTURED`.

- **Recusado**: Se a solicitação de reembolso for recusada, o pedido aparecerá com o status `CAPTURED` (`result.payload.status` na resposta).  
  - Haverá uma transação do tipo `REFUND` (`result.transactions.type` na resposta).  
  - O status da transação será `DECLINED` (`result.transactions.transactionResponse.state` na resposta).

### Gerenciando reembolsos pendentes com o Módulo de Cancelamentos da PayU

Esta seção orienta como acompanhar o status final de um reembolso iniciado por meio do Módulo de Cancelamentos da PayU, especialmente quando você utiliza a API de Consultas para obter atualizações.

#### Módulo de Cancelamentos Manuais e atualizações de reembolsos pendentes

Quando você solicita um reembolso por meio da API de Anulações e Reembolsos, a PayU envia a solicitação à rede de pagamentos. Se a rede rejeitar o reembolso, a PayU inicialmente retorna o status `PENDING` no campo `paymentResponse.transactionResponse.state`.

Nesse cenário, a PayU ativa automaticamente o **Módulo de Cancelamentos** para tentar novamente o reembolso. Esse processo pode envolver várias tentativas, cada uma gerando um novo ID de reembolso, até que um status final seja alcançado. Esse mecanismo melhora as taxas de sucesso dos reembolsos e reduz a necessidade de o lojista realizar múltiplas tentativas manuais.

Para confirmar se a solicitação de reembolso enviada pela API de Anulações e Reembolsos atingiu um status final (`APPROVED` ou `DECLINED`), você deve:

- Consultar o status usando a [API de Consultas](https://developers.payulatam.com/latam/pt/docs/integrations/api-integration/queries-api.html) (por ID do pedido), ou  
- Aguardar uma notificação por meio do seu webhook configurado (`notifyUrl` para integrações via API ou a [Página de Confirmação](https://developers.payulatam.com/latam/en/docs/integrations/webcheckout-integration/confirmation-page.html) para o WebCheckout).

{{% alert title="Notas" color="info"%}}

* Se você não quiser que a PayU gerencie seus reembolsos por meio do Módulo de Cancelamentos, entre em contato com o seu gerente de conta para desativar este serviço. Nesse caso, você sempre receberá a resposta direta da rede, sem tentativas adicionais da PayU.  
* Em muitos países, até **99%** dos reembolsos processados pelo Módulo de Cancelamentos são aprovados. Para reembolsos parciais, a taxa de aprovação pode chegar a **97%**.

{{% /alert %}}

#### Identificando o status final do reembolso na API de Consultas

Para diferenciar entre a sua solicitação inicial de reembolso e as tentativas geradas pelo Módulo de Cancelamentos da PayU, use o **Order ID** ou o **Reference Code** na API de Consultas e verifique os seguintes campos:

- `result > payload > status` – Status geral do pedido (`REFUNDED` se o valor total foi reembolsado; `CAPTURED` pode indicar reembolsos parciais).  
- `result > payload > transactions[] > id` – ID da transação de reembolso.  
- `result > payload > transactions[] > type` – Tipo de transação (`REFUND` ou `PARTIAL_REFUND`).  
- `result > payload > transactions[] > source` – Origem (`EMPTY` = reembolsos online, `CANCELLATIONS_MODULE` = tentativas via Módulo de Cancelamentos da PayU).  
- `result > payload > transactions[] > transactionResponse > state` – Status do reembolso (`PENDING`, `APPROVED`, `DECLINED`).  
- `result > payload > transactions[] > transactionResponse > operationDate` – Data e hora em que o reembolso foi gerado.  
- `result > payload > transactions[] > additionalValues > TX_VALUE > value` – Valor do reembolso.  
- `result > payload > transactions[] > extraParameters > MANUAL_REFUND` – Indica como o reembolso foi processado (ausente, `TRUE` ou `FALSE`).  

##### Regras para atualizar o status do reembolso

Siga estas regras ao atualizar o seu sistema:

| `MANUAL_REFUND` | Status do reembolso | Significado | Ação recomendada |
|---|---|---|---|
| Ausente | `PENDING` | Reembolso inicial em processamento | Não atualizar |
| Ausente | `DECLINED` | Solicitação inicial rejeitada; Módulo de Cancelamentos ativado | Não atualizar |
| `FALSE` | `APPROVED` | Reembolso processado automaticamente pelo Módulo de Cancelamentos | Atualizar status |
| `FALSE` | `DECLINED` | Tentativa de reembolso falhou via Módulo de Cancelamentos | Não atualizar |
| `TRUE` | `APPROVED` ou `DECLINED` | Reembolso finalizado via Módulo de Cancelamentos | Atualizar status |

##### Considerações adicionais

- Se o status final for `DECLINED` após a operação do Módulo de Cancelamentos, você pode enviar uma nova solicitação de reembolso por meio da API de Reembolsos. Ao fazer isso, evite atualizar com base em tentativas anteriores — use `operationDate` e `TX_VALUE` para rastrear a tentativa correta.  
- Sempre registre **um registro de reembolso por solicitação de API** em seu sistema, mesmo que o Módulo de Cancelamentos tenha criado múltiplas transações.  
- Atualize o registro do reembolso **somente quando um status final for atingido**, seguindo as regras acima.  

#### Identificando o status final do reembolso via webhook

A PayU também notifica o status final do reembolso por meio do seu **webhook** configurado (`notifyUrl` para integrações via API ou a [Página de Confirmação](https://developers.payulatam.com/latam/en/docs/integrations/webcheckout-integration/confirmation-page.html) para o WebCheckout).

##### Lógica do webhook

- Se o status da solicitação de reembolso for `APPROVED` ou `DECLINED`, a PayU envia imediatamente uma notificação de webhook.  
- Se o status inicial for `PENDING`, nenhum webhook será enviado até que um status final (`APPROVED` ou `DECLINED`) seja alcançado.  

##### Regras de atualização via webhook

- Se o status inicial for `PENDING`, **não atualize** o reembolso até receber o webhook.  
- Assim que o webhook for recebido, atualize o status do reembolso conforme indicado (`APPROVED` ou `DECLINED`).  
- Use ao menos os seguintes campos do payload para identificar corretamente o reembolso:  
  - `transaction_type` – Tipo de transação  
  - `value` – Valor do reembolso  
  - `response_message_pol` – Mensagem de resposta  
  - `transaction_date` – Data e hora da transação  

##### Considerações sobre o webhook

Diferente da API de Consultas, o webhook só notifica quando o reembolso atinge um **status final**. Nenhuma notificação é enviada para tentativas intermediárias (`PENDING`) ou novas tentativas dentro do Módulo de Cancelamentos.

Por esse motivo, recomendamos implementar o webhook, caso ainda não o tenha feito.  
Ele permite atualizar automaticamente os status de reembolso sem aplicar as regras manuais de validação exigidas pela API de Consultas.

Esse comportamento se aplica quando as seguintes configurações de conta estão ativadas:  
- **Allow reversal transactions with pending state:** Desativado  
- **Activate pending response for voids and refunds:** Ativado
