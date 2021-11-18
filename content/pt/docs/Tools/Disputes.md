---
title: "Disputas"
linkTitle: "Disputas"
date: 2021-04-12T08:34:58-05:00
description: >
  Using this tool, you can manage the dispute processes generated in your PayU account.
weight: 60
---

![Concepts](/assets/Disputes/Disputes_pt.png)

## O que é uma disputa? {#what-is-a-dispute}
Seus compradores podem apresentar uma reclamação ao banco emissor do cartão. O banco nos envia uma notificação de disputa e nós criamos a disputa em nosso sistema. Esta disputa congelou o valor total da venda em sua conta PayU.

## Por que acontece uma disputa? {#why-a-dispute-happens}
Um comprador pode reclamar ao banco emissor do cartão informando que não recebeu um produto, que o produto é deficiente ou não atende às características esperadas. O comprador também pode negar a compra da fatura do cartão de crédito.<br>
Os motivos para iniciar um processo de disputa podem variar, alguns deles são:
* **Fraude**: as disputas são classificadas como fraude quando uma pessoa não autorizada faz compras com cartão de crédito. Esse tipo de disputa pode acontecer se o cartão for perdido ou roubado.
* **Não reconhecimento do pagamento**: a marca ou nome da loja que aparece no extrato do cartão de crédito não é reconhecida pelo titular do cartão.
* **Produto não entregue**: o titular do cartão afirma não ter recebido o produto ou serviço coberto pelas cobranças efetuadas no cartão de crédito.
* **Produto não aceitável**: o titular do cartão alega não ter recebido o produto ou serviço nas condições esperadas.
* **Duplicado**: o titular do cartão indica que a cobrança realizada pela compra de um produto ou serviço foi feita mais de uma vez no cartão de crédito.
* **Quantidade não corresponde**: a cobrança no cartão de crédito não coincide com o valor da compra.
* **Não reportado pela entidade**: o banco ou rede de processamento inicia um processo de disputa sem um motivo específico.


{{% alert title="Atenção" color="warning"%}}

* Lembre-se de que PayU atua como um intermediário para permitir que sua loja forneça evidências no processo de disputa entre você e a entidade bancária. O PayU não interfere no resultado da disputa, a decisão depende do banco emissor.
* Uma vez que uma transação é parte de uma disputa, o valor associado torna-se parte do saldo congelado; portanto, você não pode transferir fundos desse saldo para sua conta bancária até que a disputa seja resolvida.

{{% /alert %}} 

## Como funciona o processo de disputas no PayU? {#how-does-the-disputes-process-works-in-payu}
O processo de disputas segue um fluxo simples:

### 1. Notificação de uma disputa {#1-dispute-notification}
Quando um banco notifica o PayU sobre uma disputa, você e seu cliente recebem um e-mail notificando o início do processo de disputa.

Também enviamos um `POST` com todas as informações da disputa para a URL que você definiu em seu [Módulo PayU]({{< ref "Technical-configuration.md#disputes" >}}). Dessa forma, você pode automatizar seus processos de gerenciamento de disputas para minimizar o risco de um possível estorno.

Você pode configurar a URL onde fazemos a notificação no módulo PayU. Faça login em [PayU.com](payu.com) e clique na opção de login localizada na parte superior da página. Se preferir, você pode fazer login https://merchants.payulatam.com/.

Clique _**Configuração**_ e selecione _**Configuração técnica**_.

![PrintScreen](/assets/IntegrationVariables_01_pt.png)

Nesta janela, acesse a guia _**Disputas**_ e defina a URL de notificação de disputa. Habilite a caixa de notificação no campo _**Automatic notification URL**_.

![PrintScreen](/assets/Disputes/Disputes_01_pt.png)

Depois de configurar isso, você receberá automaticamente um POST com todas as informações do processo de disputa iniciado. Além disso, você também receberá uma notificação POST cada vez que o processo de disputa tiver uma atualização, para que possa estar ciente do andamento e da conclusão desse processo.

### 2. Consulta através do módulo PayU {#2-query-through-the-payu-module}
Você pode visualizar e gerenciar seus processos de disputa a partir de seu módulo PayU, na opção _**Disputas**_ no menu _**Transações**_.

![PrintScreen](/assets/Disputes/Disputes_02_pt.png)

### 3. Fornecer evidências {#3-provide-evidence}
É importante sempre responder a uma disputa fornecendo evidências antes do [prazo estipulado pelo banco]({{< ref"disputes.md#maximum-days-to-provide-evidence" >}}). Após a data limite, você não pode carregar as evidências correspondentes a uma disputa.

Para saber como fazer upload de evidências para resolver a disputa, consulte o [Módulo PayU]({{< ref"Disputes-MP.md" >}}).

#### What information can be useful?
* Full information of your customer (full name, identification number, e-mail, shipping address, visible credit card number, etc.)
* Proof of delivery of the product or service signed by the cardholder.
* Bill of sale of the product or service.
* Acceptance letter of the payment signed by the cardholder attaching their identification document.
* Cancellation and refund policy.
* Acceptance of terms and conditions.
* Transactional history of your customer (if any).
* Other supports that validate the purchase.

#### Maximum days to provide evidence
Recall that the maximum days to provide evidence for each country are: 

| Country   | Days to provide evidence  |
|-----------|---------------------------|
| Argentina | 5 working days            |
| Brasil    | 12 working days           |
| Chile     | 5 working days            |
| Colômbia  | 2 working days            |
| México    | 12 calendar days          |
| Panama    | 8 working days            |
| Peru      | 6 working days            |

### 4. Final decision on dispute status
Once the evidence is provided, we send the documents to the issuing bank or the network that processed the transaction, which oversees the resolution of the case. The result of dispute can be: won (without chargeback), lost (chargeback) or refunded. In the case of refunds, the shop makes the return to the buyer and the bank does not create the chargeback.

When the bank announces the dispute’s outcome, the case is automatically updated in the administrative module and PayU sends a POST to the configured URL with information of the final result.

## Dispute states
When a dispute is reported, a dispute entity for the associated transaction is created. The dispute status changes according to the step where the dispute is within the course of the process.

| State | Descrição |
|-|-|
| Notified | When the dispute process begins, you must upload the evidence for the dispute. |
| On Payment Network Review | When the shop provides evidence for a dispute through the Módulo PayU and the dispute is reviewed by the bank or network. |
| Lost | The transaction is reversed from the virtual shopping account and may incur in a chargeback management cost. |
| Won | The dispute process is resolved in favor of the shop, there are no deductions of any kind. |
| Refunded | This process occurs when the shop authorizes to reverse the operation in self-determination, this prevents the shop from having to pay a chargeback transaction and it is replaced by a refund. |
| Expired | After past 120 days without a response from the bank, the amount is set to available for the merchant. |

{{% alert title="Observação" color="info"%}}
If you have activated [Anti-fraud Guarantee]({{< ref"Antifraud-Guarantee.md" >}}), when the chargeback is subject to be covered by the guarantee, PayU assumes the values debited from your account. In this case, the status of this dispute is _Chargeback_ (Lost) _With antifraud guarantee_. 
{{% /alert %}}