---
title: "Pagamentos"
linkTitle: "Pagamentos"
date: 2021-03-25T14:28:20-05:00
description: >
  O recurso de pagamentos permite que sua loja processe diferentes tipos de transações com vários métodos de pagamento.
weight: 10
---

Seja qual for o [tipo de integração]({{< ref "integrations" >}}) que você escolher, PayU oferece operações para processar suas transações. A seção a seguir explica esses métodos.

## Fluxos de pagamento {#payment-flows}
PayU pode processar os pagamentos usando dois tipos de fluxos de pagamento: duas etapas e uma etapa.

![Payments](/assets/Payments/autorizacionycaptura-pt.png)

* No fluxo de uma etapa, combina as etapas _**Autorização**_ e _**Captura**_ em uma só transação. Os fundos são transferidos da conta do cliente para a conta PayU quando o pagamento é autorizado. A única etapa neste fluxo é:
  - _**Cobrança (Autorização e captura)**_: esta operação envia o valor da transação para validar (AutorizaçãoAutorizaçãorovada, o valor é debitado do cartão imediatamente (captura). Este é o método mais comum para processar transações.

* No fluxo de duas etapas, primeiro você precisa autorizar e reter os fundos do cliente. Em seguida, conclua a transação para transferir os fundos autorizados para sua conta PayU. As etapas neste fluxo são:
  - _**Autorização**_: esta operação serve para verificar se o cartão utilizado para o pagamento está ativo, possui fundos etc. A cobrança não se completa até que seja enviada a captura da transação. </br>
Por exemplo, quando você usa um aplicativo de transporte, depois de solicitar o serviço, o aplicativo envia uma Autorização para reservar o valor da viagem e verificar se o seu cartão é válido (ativo e com fundos suficientes). No entanto, a cobrança ainda não é realizada em seu cartão
  - _**Captura**_: esta operação conclui a uma operação previamente autorizada e a conta faz um débito no cartão.</br>
De volta ao exemplo do aplicativo de transporte, assim que o serviço for concluído, o aplicativo cobra o valor total da sua viagem e encerra a transação.

{{% alert title="Observação" color="info"%}}

* O fluxo em duas etapas não está disponível no Panamá. Na Colômbia e no Chile, este fluxo está disponível somente sob solicitação, entre em contato com seu representante de vendas.

* Na implementação do fluxo de pagamento em dois passos, é obrigatório que, após enviar uma transação do tipo **Authorization**, o comerciante conclua o processo enviando uma operação do tipo **Capture** ou **Void**. Isso garante a conclusão correta do fluxo transacional.

{{% /alert %}}

### Métodos de pagamento {#payment-methods}
Os métodos de pagamento disponíveis para processar transações são::

* Cartões de crédito.
* Pagamentos em dinheiro ou bancários.
* Transferências bancárias.

{{% alert title="Observação" color="info"%}}

Consultar [este artigo]({{< ref "Select-your-payment-method.md" >}}) para saber os métodos de pagamento disponíveis para os compradores por país.

{{% /alert %}}

## O que acontece agora? {#whats-next}
A integração com este recurso depende do país de suas transações, da operação selecionada e da forma de pagamento.

{{< payments/countries >}}
