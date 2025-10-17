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

## Considerações por país

Antes de solicitar um reembolso, leve em conta as seguintes considerações específicas por país.

### Argentina
- Os reembolsos podem ser solicitados **pelo menos 10 minutos após a aprovação** e até **357 dias** após a transação.
- Reembolsos com valores decimais **não são suportados**.
- Uma vez aprovado o reembolso, o pagador recebe os fundos **dentro de 30 dias úteis**.

### Brasil
- Os reembolsos podem ser solicitados **pelo menos 10 minutos após a aprovação** e até:
  - **87 dias** para transações realizadas com PIX.
  - **172 dias** para transações com cartão.
- Múltiplos **reembolsos parciais** são suportados para transações com PIX.
- Uma vez aprovado:
  - Reembolsos para **transações PIX** são processados **imediatamente**.
  - Reembolsos para **outros meios de pagamento** podem levar até **15 dias úteis**.

### Chile
- Os reembolsos podem ser solicitados **pelo menos 10 minutos após a aprovação** e até **327 dias**.
- Reembolsos estão disponíveis para transações processadas por [WebPay Plus ou Redcompra]({{< ref "Payments-API-chile.md#submit-transactions-using-debit-and-prepaid-cards" >}}).
- Para **transações com cartão pré-pago não processadas pelo WebPay Plus**:
  - Reembolsos solicitados **na primeira hora** podem ser **aprovados ou rejeitados** pela rede financeira.
  - Reembolsos solicitados **após a primeira hora** são **automaticamente rejeitados**.
- Se um reembolso for rejeitado, a PayU exibirá o [código de erro]({{< ref "Response-codes-and-variables.md#response-codes-for-transactions" >}}) correspondente.
- Reembolsos com valores decimais **não são suportados**.
- Uma vez aprovado o reembolso, o pagador recebe os fundos **dentro de 8 a 20 dias úteis**.
- **Reembolsos parciais** para transações com **parcelamento** são recebidos online, mas processados manualmente devido a restrições do adquirente.
- O valor mínimo para realizar um reembolso depende da rede adquirente:
    - **Mais de 10 CLP** para transações processadas pela rede **TRANSBANK**.
    - **Mais de 50 CLP** para transações processadas pela rede **KLAP**.

### Colômbia
- Os reembolsos podem ser solicitados **pelo menos 10 minutos após a aprovação** e até **357 dias**.
- O valor mínimo para reembolso é **100 COP**.
- Se um pedido de reembolso **não for enviado no mesmo dia** da captura da transação (**antes das 21h UTC-5**), ele será **processado manualmente**, em vez de ser tentado online.
- Uma vez aprovado, o pagador recebe os fundos em até **15 dias úteis**, dependendo da emissora do cartão.
- **Reembolsos parciais não estão disponíveis** para cartões de crédito internacionais.

### México
- Os reembolsos podem ser solicitados **pelo menos 10 minutos após a aprovação** e até:
  - **175 dias** para a maioria das transações.
  - **40 dias** se processadas pelo **Bancomer**.
- Uma vez aprovado o reembolso, o pagador recebe os fundos **dentro de 30 dias úteis**.
- Reembolsos com valores decimais **não são suportados**.

### Panamá
- Os reembolsos podem ser solicitados **pelo menos 10 minutos após a aprovação** e até **357 dias**.
- Uma vez aprovado o reembolso, o pagador recebe os fundos **dentro de 8 dias úteis**.

### Peru
- Os reembolsos podem ser solicitados **pelo menos 10 minutos após a aprovação** e até **357 dias**.
- **Reembolsos parciais** são suportados para transações **sem parcelamento** (incluindo transações com uma única parcela).
- **Reembolsos parciais com Visanet** devem ser enviados **pelo menos um dia após a transação**.
- Uma vez aprovado o reembolso, o pagador recebe os fundos **dentro de 15 a 25 dias úteis**.
- O valor mínimo para reembolso é **1 USD ou 1 PEN**.

### Prazos de reembolso e políticas por país

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