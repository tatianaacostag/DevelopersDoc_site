---
title: "Disputas"
date: 2021-09-03T16:42:19-05:00
type: docs
Description: >
  Aprenda a gerenciar o processo de disputa iniciados por seus clientes. Isso inclui ver as disputas gerados, fornecer as evidências para resolver uma disputa ou reembolsar o valor pago pelo cliente.
weight: 40
---

![Concepts](/assets/Disputes/Disputes_pt.png)

{{% alert title="Observação" color="info"%}}
Para termos introdutórios sobre uma disputa, consulte este [artigo]({{< ref "disputes.md" >}}).
{{% /alert %}}

## Permissão necessária {#permission-required}
Para ter acesso a este módulo, você precisa ter um perfil com a seguinte permissão habilitada:

* _Relatórios_ > _Reembolsos e disputas_
* _Relatórios_ > _Resolver disputas com compradores (gerenciar chargeback)_

Consulte [Perfis e permissões]({{< ref"Profile-and-permissions-management.md" >}}) para obter mais informações.

## Por que é importante responder a uma disputa? {#why-is-it-important-to-reply-to-a-dispute}
* O comércio pode gerar desconfiança ao cliente.
* Se você não resolver as disputas, PayU retirará o valor de sua conta.
* O fundo de reserva pode ser maior pela área de risco.
* Isso prejudica a pontuação do código PayU perante as redes de pagamento.
* O valor em disputa ficará congelado até que ele seja resolvido.

É importante responder a uma disputa fornecendo provas antes do prazo estipulado pelo banco. Após o prazo, não é possível fazer o upload das provas correspondentes a uma disputa.

Para obter mais informações sobre os prazos definidos, consulte [dias máximos para fornecer evidências]({{< ref "disputes.md#maximum-days-to-provide-evidence" >}}).

## Como resolver disputas? {#how-to-resolve-disputes}
Uma disputa é iniciada quando um comprador desconhece uma cobrança feita em seu cartão de crédito. Assim que o banco é notificado, começa o processo formal para determinar a validade da compra.

{{% alert title="Dica" color="info"%}}
Se você tem os dados do titular do cartão, a melhor forma de gerenciar um processo de disputa é entrando em contato com ele. Se o motivo da disputa é simplesmente desconhecimento, você pode pedir ao titular do cartão que fale com seu banco para retirar a queixa e para que o processo de disputa se resolva a seu favor.
{{% /alert %}}

1. Quando somos notificados pelo banco de que um processo de disputa foi iniciado, você é notificado sobre esse processo. TPara configurar o e-mail ou URL para receber notificações de disputa, consulte [Configurações técnicas]({{< ref "technical-configuration.md#disputes" >}}).

2. Faça login em sua conta PayU. No menu esquerdo, expanda o menu _**Transações**_ e selecione _**Disputas**_.

![PrintScreen](/assets/Disputes/Disputes_02_pt.png)

3. O módulo _**Disputas**_ será aberto. Role a página para baixo e localize a disputa que você abriu. Se necessário, você pode usar os filtros disponíveis para localizar sua disputa.

![PrintScreen](/assets/Disputes/Disputes_03_pt.png)

4. Os detalhes da ordem aparecem à direita da tela. Clique _**Resolve um chargeback**_ no final do painel.

<img src="/assets/Disputes/Disputes_04_pt.png" alt="PrintScreen" width="60%"/><br>

5. Na janela pop-up, você encontrará os detalhes sobre o motivo pelo qual seu cliente solicitou o processo de disputa e o prazo para fornecer evidências para solucioná-lo. Clique no link _**Anexar arquivo**_ para fazer o upload de todas as evidências que você tem.

<img src="/assets/Disputes/Disputes_05_pt.png" alt="PrintScreen" width="60%"/>

{{% alert title="Observação" color="info"%}}
Se você aceitar que a disputa não é um erro, você pode iniciar um processo de [Reembolso]({{< ref "Refunds-MP.md" >}}) clicando em _**Ou devolva o valor**_.
{{% /alert %}}

6. Faça upload dos arquivos de evidências para resolver a disputa e clique em _**Salvar evidência**_. É obrigatório salvar a evidência antes de enviá-la para revisão.<br>Os arquivos a serem carregados na seção de evidências não devem ter tamanho superior a 10 MB e devem ser arquivos PDF.

<img src="/assets/Disputes/Disputes_06_pt.png" alt="PrintScreen" width="60%"/><br>

Quando terminar, clique em _**Enviar para revisão**_.

7. Uma janela de confirmação aparecerá informando que a evidência foi enviada.

<img src="/assets/Disputes/Disputes_07_pt.png" alt="PrintScreen" width="60%"/><br>

8. Nesse momento, enviamos os documentos ao banco emissor ou à rede que processou a transação, de quem depende a resolução do caso.<br><br>
O caso de disputa pode resultar em ganho (sem estorno), perda (estorno) ou reembolso. No caso de devoluções, a loja é que faz a devolução ao comprador e o banco não gera o estorno. Consulte [estados de disputa]({{< ref "Disputes.md#dispute-states" >}}) para conhecer todos os estados de uma disputa.

{{% alert title="Observação" color="info"%}}
Se você ativou [Garantia Antifraude]({{< ref"Antifraud-Guarantee.md" >}}), quando o estorno estiver sujeito à cobertura da garantia, o PayU assume os valores debitados de sua conta. Neste caso, o status desta disputa é _Contracargada_ (Perda) _Com garantia antifraude_. 
{{% /alert %}}

Quando a entidade financeira comunica o resultado da disputa, o caso é atualizado automaticamente no Módulo PayU.