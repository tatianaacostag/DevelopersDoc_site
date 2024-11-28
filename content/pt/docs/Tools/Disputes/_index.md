---
title: "Disputas"
linkTitle: "Disputas"
date: 2021-04-12T08:34:58-05:00
description: >
  Encontre todas as informações sobre o módulo de disputas. Esta ferramenta, disponível no seu Módulo PayU, permite gerir os processos de disputa gerados na sua conta PayU.
weight: 60
tags: ["parenttopic"]
---

## O que é uma disputa? {#what-is-a-dispute}
Seus compradores podem apresentar uma reclamação ao banco emissor do cartão. O banco nos envia uma notificação de disputa para determinar a validade da compra e nós criamos a disputa em nosso sistema. Após a criação, notificamos você através do Módulo PayU.

Esta disputa congelou o valor total da venda em sua conta PayU.

![Concepts](/assets/Disputes/Disputes_pt.png)

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

Nem todas as entidades financeiras usam os mesmos mecanismos para notificar uma disputa; portanto, PayU não pode garantir que você sempre saberá os motivos da disputa.

{{% alert title="Atenção" color="warning"%}}

* Lembre-se de que PayU atua como um intermediário para permitir que sua loja forneça evidências no processo de disputa entre você e a entidade bancária. O PayU não interfere no resultado da disputa, a decisão depende do banco emissor.
* Uma vez que uma transação é parte de uma disputa, o valor associado torna-se parte do saldo congelado; portanto, você não pode transferir fundos desse saldo para sua conta bancária até que a disputa seja resolvida.
* Seus clientes podem reclamar uma transação até **120 dias** após a data da transação para cartões locais e **180 dias** para cartões internacionais. Essas datas são definidas pelas franquias de cartões.

{{% /alert %}} 

## Como funciona o processo de disputas no PayU? {#how-does-the-disputes-process-works-in-payu}
O processo de disputas segue um fluxo simples:

### 1. Notificação de uma disputa {#1-dispute-notification}
Quando um banco ou uma rede de processamento notifica o PayU sobre uma disputa, você pode consultar todas as informações relacionadas a ele no [Módulo Disputas]({{< ref"Disputes-MP.md" >}}) do Módulo PayU.

Se configurou os e-mails de notificação no seu [Módulo PayU]({{< ref "Technical-configuration.md#disputes" >}}), também receberá a informação da disputa através do e-mail. Além disso, quando você habilita o URL de notificação automática, também enviamos uma notificação `POST`. Dessa forma, você pode automatizar seus processos de gerenciamento de disputas para minimizar o risco de um possível estorno.

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

#### Que informações podem ser úteis? {#what-information-can-be-useful}
* Informações completas do seu cliente (nome completo, número de identificação, e-mail, endereço de entrega, número de cartão de crédito visível etc.)
* Comprovante de entrega do produto ou serviço assinado pelo titular do cartão.
* Nota fiscal de venda do produto ou serviço.
* Carta de aceitação do pagamento assinada pelo titular do cartão, anexando o documento de identificação.
* Política de cancelamento e reembolso.
* Aceitação dos termos e condições.
* Histórico de transações de seu cliente (se houver).
* Outros suportes que validam a compra.

#### Maximum days to provide evidence {#maximum-days-to-provide-evidence}
Recall that the máximo days to provide evidence for each country são: 

| País      | Dias para fornecer evidências  |
|-----------|--------------------------------|
| Argentina | 5 dias úteis                   |
| Brasil    | 12 dias úteis                  |
| Chile     | 5 dias úteis                   |
| Colômbia  | 2 dias úteis                   |
| México    | 12 dias corridos               |
| Panama    | 8 dias úteis                   |
| Peru      | 6 dias úteis                   |

### 4. Decisão final sobre o status da disputa {#4-final-decision-on-dispute-status}
Uma vez apresentada a prova, enviamos os documentos ao banco emissor ou à rede que processou a transação, que supervisiona a resolução do caso. O resultado da disputa pode ser: ganho (sem estorno), perdido (estorno) ou reembolsado. No caso de devolução, a loja faz a devolução ao comprador e o banco não efetua o estorno.

Quando o banco anuncia o resultado da disputa, o caso é atualizado automaticamente no módulo administrativo e o PayU envia um POST para a URL configurada com a informação do resultado.

## Estados de disputa {#dispute-states}
Quando uma disputa é relatada, é criada uma entidade de disputa para a transação associada. O status da disputa muda de acordo com a etapa em que a disputa está no decorrer do processo.

| Estado | Descrição |
|---|---|
| Notificada | Quando o processo de disputa começar, você deve carregar as evidências da disputa. |
| Na avaliação da rede de pagamentos | Quando a loja fornece evidências de uma disputa por meio do módulo PayU, a disputa é analisada pelo banco ou rede. |
| Documentos não apresentados | Quando o prazo para apresentação de documentos expira e o comércio não fornece nenhuma evidência. |
| Perda | A transação é revertida da conta de compras virtual e pode incorrer em um custo de gerenciamento de estorno. |
| Ganho | O processo de disputa é resolvido a favor da loja, não havendo deduções de qualquer espécie. |
| Expirada | Após 120 dias sem resposta do banco, o valor é definido como disponível para o vendedor. |
| Devolvida | Este processo ocorre quando a loja autoriza a reversão da operação, evitando que a loja tenha que pagar uma transação de estorno, que é substituída por um reembolso. |

Abaixo está um diagrama ilustrando o fluxo para o tratamento de disputas de pagamento:

<div>
{{< disputes/Disputes_PT >}}
</div>

## Dicas antifraude para o seu negócio {#anti-fraud-tips-for-your-business}
Combater a fraude digital é nosso dever! Lembre-se das seguintes dicas:
1. Cuidado com um aumento nas compras ou solicitações de serviço maior do que o esperado, dada a natureza do seu negócio.
2. Desconfie de compras feitas com valores superiores à média que você recebe em sua loja.
3. Verifique se você recebe um volume maior de compras de um único cliente ou solicitadas no mesmo endereço.