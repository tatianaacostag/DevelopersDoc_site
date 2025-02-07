---
title: "Disputas"
date: 2021-09-03T16:42:19-05:00
type: docs
Description: >
  Aprenda como gerenciar o processo de disputa para seus clientes, incluindo a configuração de métodos de notificação, revisão de disputas, fornecimento de evidências ou início de reembolsos. Para obter mais detalhes sobre como o mecanismo de disputas funciona dentro da PayU, consulte a documentação de <a href="https://developers.payulatam.com/latam/pt/docs/tools/disputes.html" target="_blank">Disputas</a>.
weight: 40
---

O diagrama a seguir ilustra o fluxo do processo de disputas na PayU, destacando cada etapa, desde a notificação até a resolução:

{{< disputes/disputes_flow_pt >}}

## Permissões Necessárias
Para acessar este módulo, seu perfil deve ter as seguintes permissões habilitadas:

- _Relatórios_ > _Reembolsos e disputas_
- _Relatórios_ > _Resolver disputas com compradores (gerenciar estornos)_

Consulte [Perfis e Permissões]({{< ref "Profile-and-permissions-management.md" >}}) para obter mais detalhes.

## Por Que É Importante Responder a uma Disputa?

Responder às disputas prontamente é fundamental para proteger sua empresa:

- Evite prejudicar a confiança com os clientes.
- Evite que fundos sejam deduzidos de sua conta.
- Mitigue o risco de aumento dos fundos de reserva impostos pela área de risco.
- Preserve sua pontuação de código PayU com as redes de pagamento.
- Garanta que os valores contestados não sejam congelados por períodos prolongados.

Você deve fornecer evidências antes do prazo estabelecido pelo banco. Perder o prazo pode resultar na cobrança do valor em sua conta.

Para obter informações sobre prazos, consulte [Prazos para Envio de Evidências]({{< ref "disputes.md#prazos-para-envio-de-evid%C3%AAncias" >}}).

## Recebendo Notificações de Disputa

Você pode receber notificações de disputa por meio de dois métodos:

1. **Notificações por E-mail**: Receba atualizações diretamente por e-mail.
2. **Notificações Automáticas**: Configure um URL na seção _**Configuração Técnica**_ do Painel de Gerenciamento para receber atualizações de disputa via `POST`.

### Etapas para Habilitar Notificações

1. Faça login no Painel de Gerenciamento do PayU, navegue até _**Configuração**_ e selecione _**Configuração técnica**_.

<img src="/assets/IntegrationVariables_01_pt.png" alt="Configuração Técnica" width="80%" style="display: block; margin: auto;" />
<br>

2. Na guia _**Disputas**_, insira os endereços de e-mail para receber notificações ou habilite o URL de notificação automática e especifique o domínio para o qual deseja que nossa API envie atualizações `POST`. Depois de habilitar um ou ambos os métodos de notificação, clique em _**Salvar alterações**_.

<img src="/assets/Disputes/Disputes_01_pt.png" alt="Detalhes da Disputa" width="80%" style="display: block; margin: auto;" />
<br>

## Resolvendo Disputas

As disputas ocorrem quando os compradores contestam cobranças em seus cartões de crédito. O banco notifica o PayU e o processo formal começa a validar a transação.

{{% alert title="Dica" color="info"%}}
Se você tiver as informações de contato do titular do cartão, entre em contato para resolver o problema. Se a disputa decorrer de confusão (por exemplo, cobranças não reconhecidas), peça ao comprador que entre em contato com seu banco e retire a reclamação. Essa abordagem geralmente resolve disputas a seu favor.
{{% /alert %}}

### Etapas para Resolver Disputas

1. Quando notificado sobre uma disputa, configure seu e-mail ou URL para receber atualizações. Consulte [Configurações Técnicas]({{< ref "technical-configuration.md#disputes" >}}).

2. Faça login em sua conta PayU, expanda o menu _**Transações**_ e selecione _**Disputas**_.

<img src="/assets/Disputes/Disputes_02_pt.png" alt="Detalhes da Disputa" width="80%" style="display: block; margin: auto;" />
<br>

3. No módulo _**Disputas**_, localize a disputa. Use filtros, se necessário.

<img src="/assets/Disputes/Disputes_03_pt.png" alt="Detalhes da Disputa" width="80%" style="display: block; margin: auto;" />
<br>

4. Revise os detalhes da disputa no painel direito e clique em _**Resolver um chargeback**_.

<img src="/assets/Disputes/Disputes_04_pt.png" alt="Detalhes da Disputa" width="40%" style="display: block; margin: auto;" />
<br>

5. Na janela pop-up, revise o motivo da disputa e o prazo para envio de evidências. Clique em _**Anexar arquivo**_ para enviar suas evidências.

<img src="/assets/Disputes/Disputes_05_pt.png" alt="Detalhes da Disputa" width="40%" style="display: block; margin: auto;" />

{{% alert title="Observação" color="info"%}}
Se você aceitar a disputa, poderá iniciar um [Reembolso]({{< ref "Refunds-MP.md" >}}) clicando em _**Ou devolva o valor**_.
{{% /alert %}}

6. Envie evidências (arquivos PDF com menos de 10 MB) e clique em _**Salvar evidência**_. Depois de salvo, clique em _**Enviar para revisão**_.

<img src="/assets/Disputes/Disputes_06_pt.png" alt="Detalhes da Disputa" width="40%" style="display: block; margin: auto;" />
<br>

7. Uma janela de confirmação aparecerá assim que suas evidências forem enviadas.

<img src="/assets/Disputes/Disputes_07_pt.png" alt="Detalhes da Disputa" width="40%" style="display: block; margin: auto;" />
<br>

8. O PayU encaminha as evidências para o banco emissor ou rede. O resultado do caso pode ser:

   - **Ganho**: A disputa é resolvida a seu favor (sem estorno).
   - **Perdido**: A disputa resulta em um estorno.
   - **Reembolsado**: Você reembolsou voluntariamente o comprador, evitando um estorno.

Consulte [Estados de Disputa]({{< ref "Disputes.md#estados-da-disputa" >}}) para obter informações detalhadas sobre os статусы de disputa.

## Considerações Finais

Quando a entidade financeira comunica a resolução, o status da disputa é atualizado automaticamente no Painel de Gerenciamento. Certifique-se de monitorar as notificações de disputa e responder prontamente para minimizar riscos e perdas potenciais.