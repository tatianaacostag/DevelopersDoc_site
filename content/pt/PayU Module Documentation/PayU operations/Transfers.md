---
title: "Transferências"
linkTitle: "Transferências"
date: 2021-09-03T16:42:07-05:00
type: docs
Description: >
  Aprenda como transferir fundos da sua conta PayU para sua conta bancária. Além disso, descubra como automatizar transferências com base em cronograma ou valor.
weight: 20
---

No módulo _Transferências_, você pode transferir os fundos acumulados em sua conta virtual da PayU para sua conta bancária registrada.

## Observações {#considerations}

Antes de iniciar uma transferência, revise as seguintes considerações importantes:

* Suas informações bancárias devem estar atualizadas e validadas. Se você solicitou uma atualização da conta bancária, o sistema continuará enviando os fundos para sua conta anterior até que a equipe de Risco da PayU valide a nova conta.
* Você pode programar transferências com base em um valor específico ou definir uma data para transferências automáticas.
* No Brasil, como a PayU não é uma instituição de pagamento licenciada, o sistema transfere automaticamente seus fundos para sua conta bancária diariamente e sem custo. Para monitorar essas transferências, utilize a opção _**Relatório de transferências**_ (_**Transferências**_ > _**Para conta bancária**_).
* A cada mês, as três primeiras transferências locais são gratuitas. A partir da quarta transferência no mês, o PayU aplica uma taxa na maioria dos países. Observe que as transferências internacionais têm uma taxa desde a primeira transação. A tabela abaixo fornece uma visão geral das taxas para transferências locais e internacionais por país.

| País       | Taxa Local        | Taxa Internacional  |
|------------|-------------------|---------------------|
| Argentina  | 110,00 ARS        | 753,00 USD         |
| Brasil     | Nenhuma           | Nenhuma            |
| Chile      | 2.000,00 CLP      | 50.000,00 CLP      |
| Colômbia   | 6.500,00 COP      | 30,00 USD          |
| México     | 10,00 MXN         | 650,00 MXN         |
| Panamá     | 30,00 USD         | 44,00 USD          |
| Peru       | 15,00 PEN         | 90,00 USD          |

{{% alert title="Notas" color="info"%}}

* As taxas estão sujeitas a alterações ao longo do tempo. Para obter as informações mais atualizadas ou dúvidas específicas, entre em contato com o representante de vendas do PayU.
* As transferências internacionais também estão sujeitas a uma taxa FX de 3% (sujeita a negociação) para cobrir os custos de conversão cambial.

{{% /alert %}}

* A primeira transferência pode levar até cinco (5) dias para ser depositada em sua conta bancária. Como parte de um processo administrativo, a equipe de Risco do PayU pode solicitar documentação adicional para verificar suas vendas iniciais.

* A segunda e as transferências subsequentes levarão no máximo três (3) dias úteis para serem concluídas. Dias úteis geralmente são de segunda a sexta-feira, excluindo feriados.

{{% alert title="Nota" color="warning"%}}

Os prazos mencionados aplicam-se apenas a transferências locais. Para transferências internacionais, entre em contato com o seu representante de vendas.

{{% /alert %}}

## Permissão Necessária {#permission-required}

Para ter acesso a este módulo, você precisa ter um perfil com a seguinte permissão habilitada:

* _Transferências_ > _Consultar_
* _Transferências_ > _Gerenciar_<br>Com esta permissão você pode executar transferências.

Consulte [Perfis e permissões]({{< ref"Profile-and-permissions-management.md" >}}) para obter mais informações.

## Transferir Fundos {#transfer-funds}

You can transfer up to the total amount in your PayU account to the registered bank. Follow these steps to perform a transfer.

1. Faça login em sua conta PayU. No menu esquerdo, expanda o menu _**Transferências**_ e selecione _**Transferências**_.

![PrintScreen](/assets/Transfers/Transfers_01_pt.png)

2. Complete o valor para transferir ou selecione a opção  _**Transferir o saldo total disponível**_. No painel direito, o valor inserido será atualizado. Este painel também mostra quantas transferências gratuitas você tem até o final do mês.<br>Se você não tem transações gratuitas, este painel também exibe o valor ou a transação junto com os impostos.

![PrintScreen](/assets/Transfers/Transfers_02_pt.png)

3. Clique em _**Solicitar transferência**_. Uma janela de confirmação aparece para confirmar o valor a ser transferido, o valor a ser debitado de sua conta e a conta de destino.<br>Clique em _**OK**_ para confirmar ou _**Cancelar**_ para descartar.

<img src="/assets/Transfers/Transfers_03_pt.png" alt="PrintScreen" width="50%"/><br>

4. O resultado da operação aparecerá. Observe o número de dias para que o dinheiro chegue na conta de destino.

<img src="/assets/Transfers/Transfers_04_pt.png" alt="PrintScreen" width="50%"/><br>

Assim que o pedido for enviado com sucesso, a transferência fica com status _Em processo_ e você pode vê-lo na seção _**Relatório de transferências realizadas**_ no final do módulo. Além disso, o valor solicitado será debitado de seu saldo.<br>Se as transferências não puderam ser processadas, este valor volta para sua conta e nenhuma taxa é cobrada por esta operação.

## Agendar Transferências {#schedule-transfers}

Você pode automatizar as transferências e solicitar um saque de um valor fixo ou periódico.

{{% alert title="Observação" color="info"%}}
* <img src="/assets/Brasil.png" width="20px"/> _**Programar transferência**_ não está disponível no Brasil.
* Ao programar transferências, você deve ter fundos suficientes quando a transferência for executada.
{{% /alert %}}

Para agendar uma transferência, siga estas etapas.

1. Faça login em sua conta PayU. No menu esquerdo, expanda o menu _**Transferências**_ e selecione _**Programar transferência**_.

![PrintScreen](/assets/Transfers/Transfers_05_pt.png)

2. O módulo _**Agendamento de transferências**_ abrirá, Aqui você pode ver todas as transferências agendadas que você configurou. Clique em _**Programar transferência**_ para configurar uma nova programação.

![PrintScreen](/assets/Transfers/Transfers_06_pt.png)

{{% alert title="Opções" color="info"%}}
A coluna _opções_ fornece as seguintes ações:
* Editar (<img src="/assets/Transfers/Transfers_10.png" width="2%" style="vertical-align: top;"/>): permite que você altere a configuração da programação.
* Excluir (<img src="/assets/Transfers/Transfers_11.png" width="2%" style="vertical-align: top;"/>): permite que você desative a programação. Depois que a programação é removida, nenhuma transferência automática pode ser criada.
{{% /alert %}}

3. Selecione como você deseja agendar a transferência.

* **Programar Transferências por Frequência**<br>
Esta opção permite que você transfira uma determinada quantia a cada período determinado (dias, semanas ou meses). Para agendar este tipo de transferência, selecione a opção _Frequência_.

* **Programar Transferências por Saldo Disponível**<br>
Esta opção permite que você transfira uma determinada quantia sempre que o saldo atingir um determinado valor. Para agendar este tipo de transferência, selecione a opção _Saldo disponível_.

Forneça as seguintes opções.

| Opção | Descrição |
|---|---|
| Realizar retirada de maneira | Selecione a frequência das transferências que deseja agendar. Esta opção está disponível para transferências programadas por frequência.<br><br>![PrintScreen](/assets/Transfers/Transfers_07_pt.png) |
| Selecione o valor que deseja retirar | Selecione o valor que deseja transferir, que pode ser o saldo total disponível ou um valor fixo.<br><br>![PrintScreen](/assets/Transfers/Transfers_08_pt.png) |
| Insira o valor a retirar | Selecione o valor que deseja transferir. Este campo aparece quando você seleciona a opção _Configurar valor_. |
| Iniciar minhas transferências a partir de | Selecione a data de início da programação. Nesta data, está agendada a primeira transferência.<br><br>![PrintScreen](/assets/Transfers/Transfers_09_pt.png) |
| Descrição | Forneça uma descrição significativa para sua transferência. |

4. Quando terminar, clique em _**Programar transferência**_.