---
title: "Transferências"
linkTitle: "Transferências"
date: 2021-09-03T16:42:07-05:00
type: docs
Description: >
  Saiba como receber o dinheiro de sua conta PayU em sua conta bancária. Além disso, aprenda a automatizar as transferências periodicamente ou por valor.
weight: 20
---

No módulo _Transferências_, há opções para transferir os fundos arrecadados em sua conta virtual PayU para sua conta bancária principal cadastrada.

## Observações {#considerations}
Lembre-se das seguintes considerações antes de transferir fundos para sua conta bancária.

* Você deve ter suas informações bancárias atualizadas e validadas. Lembre-se que se você solicitou a atualização de sua conta bancária, as transferências que você faz são enviadas para a conta bancária anterior até que nossa equipe de Risco a tenha validado.
* Como o PayU no Brasil não é uma instituição de pagamento, os fundos arrecadados em sua conta PayU são transferidos para sua conta diariamente gratuitamente. Para verificar o status dessas transferências, use a opção de _**Relatório de transferências**_ (_**Transferências**_ > _**Para conta bancária**_).
* As três primeiras transferências locais realizadas durante o primeiro mês são gratuitas. A partir da 4ª solicitação de transferência, PayU cobra os seguintes valores:
  - Colômbia: COP 6.500,00 + IVA (Colômbia)
  - Peru: PEN 10,00 + IGV (Peru),
  - Argentina: ARS $ 10,00 + IVA (Argentina),
  - Chile: CLP 0,00
  - México: MXN 0,00
* A primeira transferência leva cinco (5) dias para ser depositada na conta bancária. A área de Risco do PayU exige um valor positivo das vendas na primeira transferência como processo administrativo.
* A segunda e as seguintes transferências levam no máximo três (3) dias úteis.
* As transferências podem ser programadas por Quantidade e por Data

{{% alert title="Note" color="warning"%}}
Os períodos e valores explicados aqui valem apenas para transferências locais (para o mesmo país de operação). Para transferências internacionais, entre em contato com seu representante de vendas.
{{% /alert %}}

## Permissão necessária {#permission-required}
Para ter acesso a este módulo, você precisa ter um perfil com a seguinte permissão habilitada:

* _Transferências_ > _Consultar_
* _Transferências_ > _Gerenciar_<br>Com esta permissão você pode executar transferências.

Consulte [Perfis e permissões]({{< ref"Profile-and-permissions-management.md" >}}) para obter mais informações.

## Transferir fundos {#transfer-funds}
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

## Agendar transferências {#schedule-transfers}
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

* **Programar transferências por frequência**<br>
Esta opção permite que você transfira uma determinada quantia a cada período determinado (dias, semanas ou meses). Para agendar este tipo de transferência, selecione a opção _Frequência_.

* **Programar transferências por saldo disponível**<br>
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