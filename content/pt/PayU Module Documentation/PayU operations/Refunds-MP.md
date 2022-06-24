---
title: "Reembolsos"
linkTitle: "Reembolsos"
date: 2021-09-03T16:41:53-05:00
type: docs
Description: >
  Aprenda a fazer o reembolso de uma venda paga pelo módulo PayU. Um reembolso é feito quando você voluntariamente decide devolver o valor pago pelo seu cliente.
weight: 20
---

{{% alert title="Observação" color="info"%}}
Se você fizer um reembolso por este painel, ele só será atualizado no Módulo PayU. Se precisar controlar e registrar os reembolsos em seu sistema de reembolsos, você deve usar a [API de reembolsos]({{< ref "refunds.md" >}}).
{{% /alert %}}

## O que é um reembolso? {#what-is-a-refund}
Um reembolso é a ação de devolver voluntariamente o dinheiro pago por um cliente quando qualquer uma das seguintes situações acontecer:
* O produto ou serviço entregue não atendeu às expectativas do cliente e ele o devolveu.
* O produto está esgotado e o lojista não consegue entregar o produto ao cliente.

## Procedimento de reembolso {#refund-procedure}
Reembolsos estão sujeitos a análise e aprovação de nossa equipe. O procedimento para solicitar reembolsos é explicado abaixo:

1. Quando um reembolso é solicitado por seu cliente, você precisa solicitá-lo usando o módulo PayU. Você só precisa identificar a ordem e fornecer um motivo para o reembolso.

2. Depois de enviar a solicitação, PayU a analisa e ela é aprovada ou rejeitada em **1** a **3** dias úteis.

### Estados de reembolso {#refund-states}
Um reembolso pode estar em um dos três estados a seguir:

* **Em devolução**: a solicitação foi enviada a PayU para aprovação e está em aprovação.
* **Aprovada**: a solicitação foi aprovada por um agente de atendimento ao cliente do PayU.
* **Recusada**: a solicitação não atende às políticas definidas pelo PayU e foi rejeitada por um agente.

## Permissão necessária {#permission-required}
Para ter acesso a este módulo, você precisa ter um perfil com a seguinte permissão habilitada:

* _Reembolsos e chargeback_ > _Listar Reembolsos_
* _Reembolsos e chargeback_ > _Gerenciar Reembolsos_<br>Esta permissão autoriza que você faça reembolsos.	

Consulte [Perfis e permissões]({{< ref"Profile-and-permissions-management.md" >}}) para obter mais informações.

## Observações {#considerations}
* Reembolsos estão disponíveis apenas para transações pagas com cartão.
* Você pode tentar novamente a ordem de reembolso se ele foi recusado anteriormente.
* Assim que você faz a solicitação, o valor da transação passa a fazer parte do Saldo Congelado de sua conta PayU até que seja processado.
* No **Chile**:
  - Reembolsos para [transações processadas por WebPay Plus]({{< ref "Payments-API-chile.md#submit-transaction-with-debit-and-prepaid-cards" >}}) não estão disponíveis.
  - Para transações com cartões pré-pagos não processadas pelo WebPay Plus, os reembolsos solicitados na primeira hora após a cobrança podem ser aprovados ou rejeitados pela rede financeira. Após a primeira hora, todos os reembolsos de transações com cartões pré-pagos são rejeitados.
  - Se o reembolso for rejeitado, o PayU mostra o [código de erro]({{< ref "Response-codes-and-variables.md#response-codes-for-transactions" >}}) gerado pela rede.
  - Reembolsos parciais para transações parceladas são recebidos online, mas PayU os processa manualmente devido a restrições do adquirente.
* Na **Colômbia**, reembolsos parciais não estão disponíveis para cartões de crédito internacionais.
* No **Peru**, reembolsos parciais são aceitos para transações sem prestações. Lembre-se de que as transações com uma parcela são consideradas sem parcelas. Reembolsos parciais com visanet devem ser enviados após um dia.
* Se sua solicitação de reembolso for aprovada, o valor será devolvido ao titular do cartão.
* Se sua solicitação de reembolso for recusada, o valor será liberado do Saldo Congelado e retornará ao Saldo Disponível em sua conta PayU.
* Assim que o reembolso for aprovado, isso será refletido no cartão de crédito do pagador quando o banco o efetivar.
* Para verificar o status da sua solicitação de reembolso, você pode consultá-lo clicando na venda no Painel do comércio. 

## Reembolsos por país {#refunds-per-country}
Observe as seguintes considerações por país antes de solicitar reembolsos.

{{< overview/refunds_pt >}}
<sup>*</sup>_Depende da rede._

## Como solicitar um reembolso? {#how-to-request-a-refund}
Para solicitar um reembolso, a transação deve ser aprovada e sem nenhum processo de disputa pendente. Siga as próximas etapas para solicitar.

1. Faça login em sua conta PayU. No menu esquerdo, expanda o menu _**Transações**_ e selecione _**Relatório de Vendas**_.

![PrintScreen](/assets/Refunds/Refunds_pt_04.png)

2. O [Relatório de Vendas]({{< ref "Sales-report.md" >}}) abrirá. Localize a transação que deseja reembolsar e clique nela.

![PrintScreen](/assets/Refunds/Refunds_pt_05.png)

3. Os detalhes da transação aparecem à direita da tela. Clique no botão _**Reembolsar pagamento**_ no final do painel.

<img src="/assets/Refunds/Refunds_pt_06.png" alt="PrintScreen" width="50%"/><br>

4. Se você precisar solicitar um reembolso parcial, marque a opção _**Reembolsar um parte do dinheiro**_ e forneça o valor solicitado.

<img src="/assets/Refunds/Refunds_pt_08.png" alt="PrintScreen" width="50%"/><br>

5. Forneça o motivo para solicitar o reembolso (parcial ou total) e clique em _**Reembolso**_.

<img src="/assets/Refunds/Refunds_pt_07.png" alt="PrintScreen" width="50%"/><br>

6. O resumo da solicitação aparecerá. Enquanto PayU processa o reembolso, o valor do reembolso fica congelado em sua conta. Se a solicitação for aprovada, o valor reembolsado será devolvido ao cliente pelo meio de pagamento utilizado.

<img src="/assets/Refunds/Refunds_pt_09.png" alt="PrintScreen" width="50%"/><br>

7. Assim que a solicitação for aprovada, o status aparecerá na venda.

<img src="/assets/Refunds/Refunds_pt_10.png" alt="PrintScreen" width="50%"/><br>

## Obtenha a confirmação do reembolso {#getting-the-refund-confirmation}
Quando o reembolso for aprovado, você poderá gerar um recibo ou enviar o recibo ao pagador. Para isso, siga as instruções dependendo da operação que deseja realizar.

### Gere o recibo de reembolso {#generate-the-refund-recipt}
Para gerar o recibo de reembolso, localize a venda reembolsada e clique no botão de impressão localizado no canto superior direito do painel de detalhes da transação.

<img src="/assets/Refunds/Refunds_pt_11.png" alt="PrintScreen" width="50%"/><br>

As opções de impressão do seu navegador são abertas, aqui você pode imprimir fisicamente ou salvá-lo em formato PDF. A imagem a seguir corresponde às opções de impressão do Google Chrome.

![PrintScreen](/assets/Refunds/Refunds_pt_12.png)

{{% alert title="Advertencia" color="warning"%}}
A opção _Salvar como PDF_ depende do seu navegador. Se o seu navegador não suportar esta opção, você só poderá imprimi-la usando uma impressora.
{{% /alert %}}

### Envie o recibo de reembolso para o pagador {#send-the-refund-confirmation-to-the-payer}
Junto com a funcionalidade de impressão, você também pode enviar um e-mail de confirmação ao pagador informando o resultado do reembolso. Essa opção está localizada na seção _**Ações**_ na parte inferior do painel de detalhes da transação.

<img src="/assets/Refunds/Refunds_es_13.png" alt="PrintScreen" width="50%"/><br>

Depois de clicar neste botão, o pagador recebe um e-mail com os detalhes do reembolso.

<img src="/assets/Refunds/Refunds_en_14.png" alt="PrintScreen" width="50%"/><br>

{{% alert title="Observação" color="info"%}}
Você pode habilitar o envio automático da confirmação de reembolso ao pagador. Para obter mais detalhes sobre esta opção, consulte seu representante de vendas.
{{% /alert %}}