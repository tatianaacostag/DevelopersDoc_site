---
title: "Cancelamentos e Reembolsos"
linkTitle: "Cancelamentos e Reembolsos"
date: 2021-03-26T15:09:39-05:00
description: >
  Este recurso permite solicitar o cancelamento ou o reembolso das transações autorizadas ou cobradas. Você pode criar a solicitação de reembolso usando o método Reembolso (_Refund_) ou Cancelamento (_Void_) de acordo com o status da transação.
weight: 60
---

## Conceitos {#understanding-concepts}  
Antes de prosseguir, vamos explicar os seguintes conceitos:
* *Cancelamento ou Void*: esta operação reverte uma transação previamente autorizada.

* *Reembolso ou Refund*: esta operação solicita o estorno de uma transação capturada anteriormente. Reembolsos podem ser solicitados pelo valor total ou parcial. Um comprador pode solicitar um reembolso quando não estiver satisfeito com a compra, a compra tiver várias cobranças ou o comprador não receber o produto ou serviço.

### Cancelamento ou Void {#void}
O método `VOID` cancela uma transação previamente autorizada. O cancelamento é um procedimento automático. Assim que você enviar o pedido de  `VOID`, não há nenhum fluxo de aprovação e a transação não é cobrada do titular do cartão.

{{% alert title="Observação" color="info"%}}
`VOID` não estão disponíveis na Colômbia e no Panamá.
{{% /alert%}}

### Reembolso ou Refund {#refund}
Reembolsos são solicitados quando uma loja decide devolver voluntariamente o dinheiro gasto pelo comprador por motivos de insatisfação ou quando a loja não possui estoque suficiente do produto adquirido. O método `REFUND` solicita a reversão de uma transação capturada anteriormente.

Ao contrário do método `VOID`, este método precisa de uma aprovação. O procedimento de reembolso é explicado abaixo:

1. Quando um reembolso é solicitado por seu cliente, você precisa solicitá-lo com o [Módulo PayU]({{< ref "Refunds-MP.md">}}) ou nossas integrações. São necessários o _ID da ordem_ e um motivo de reembolso.

2. Depois que você enviar a solicitação, PayU analisa a solicitação e aprova ou rejeita em 1 - 3 dias úteis.

Os `REFUND` têm três estados:

- `UNRESOLVED`: a solicitação foi enviada ao PayU para aprovação. Nesta etapa, nenhuma transação foi adicionada ao ordem e quando você o consulta usando o [Serviço de consultas]({{< ref "queries" >}} "Query Service"), a resposta mostra apenas a transação de aprovação do pagamento.
- `APPROVED`: a solicitação foi aprovada por um agente de atendimento ao cliente PayU. Nesta etapa, a ordem mudou de estado para `REFUNDED` e o PayU adiciona uma transação aprovada de reembolso (`REFUND`) à ordem.
- `DECLINED`: a solicitação não atende às políticas definidas pelo PayU e foi rejeitada. Quando o reembolso é recusado, PayU adiciona um uma transação recusada de reembolso (`REFUND`) à ordem.

Para obter mais informações sobre transações autorizadas e capturadas, consulte [Pagamentos]({{< ref "payments#payment-flows" >}}).

## Observações {#considerations}
Antes de usar qualquer recurso de CANCELAMENTO ou REEMBOLSO, leve em conta as seguintes observações:

* _Reembolso_ ou _Cancelamento_ estão disponíveis apenas para transações feitas com cartão de crédito. Se a solicitação se referir a um meio de pagamento diferente, como pagamento em dinheiro ou transferência bancária; a solicitação é recusada por PayU.
* PayU cria apenas um aplicativo para cada solicitação de reembolso. Se uma solicitação for postada repetidamente para a mesma transação, PayU indica que a solicitação já está registrada.
* PayU só aceita solicitações de reembolso de transações capturadas.
* Você pode tentar novamente a ordem de reembolso se ele foi recusado anteriormente.
* Assim que você faz a solicitação, o valor da transação passa a fazer parte do Saldo Congelado de sua conta PayU até que seja processado. 
  - Se a sua ordem de reembolso for  `APPROVED`, o valor será devolvido ao titular do cartão. 
  - Se a sua ordem de reembolso for  `DECLINED`, o valor é liberado do Saldo Congelado e retorna ao Saldo disponível de sua conta PayU.
* Assim que o reembolso for aprovado, isso será refletido no cartão de crédito do pagador quando o banco o efetivar.
* Para verificar o status de sua solicitação de reembolso, use o [Serviço de consultas]({{< ref "queries" >}} "Query Service") disponíveis para esse fim.

## O que acontece agora? {#whats-next}
De acordo com o país de processamento, algumas condições especiais podem ser necessárias para a execução de cancelamentos ou reembolsos. Essas condições são explicadas no tipo de integração selecionado.

A integração com este recurso pode ser feita com um dos nossos tipos de integração:

* [Para integrações API, consulte este tópico]({{< ref "Refunds-API.md" >}})
* [Para integrações SDK, consulte este tópico]({{< ref "RefundsSDK.md" >}})