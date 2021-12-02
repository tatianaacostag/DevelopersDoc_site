---
title: "Relatório de transferências"
linkTitle: "Relatório de transferências"
date: 2021-09-03T16:46:15-05:00
type: docs
Description: >
  Consulte o estado das transferências solicitadas dos fundos recolhidos na sua conta PayU.
weight: 20
---

Além disso, se você ativou a API de Payouts, pode consultar o estado dos pagamentos solicitados por terceiros. Para obter mais informações, consulte [Payouts]({{< ref "Payouts.md" >}}).

{{% alert title="Observação" color="info"%}}
<img src="/assets/Brasil.png" width="20px"/> Para contas brasileiras, o _**Relatório de transferência**_ encontra-se na opção _**Para conta bancária**_ (_**Transferências**_ > _**Para conta bancária**_).
{{% /alert %}}

## Permissão necessária {#permission-required}
Para ter acesso a este módulo, você precisa ter um perfil com a seguinte permissão habilitada.
* Se sua conta não é brasileira: _Transferências_ > _Consultar_.
* Se sua conta é brasileira: (Relatório de transferências Brasil):
  - _Visualizar_	
  - _download.csv_

Consulte [Perfis e permissões]({{< ref"Profile-and-permissions-management.md" >}}) para obter mais informações.

## Consulte o relatório {#consult-the-report}
Faça login em sua conta PayU. No menu esquerdo, expanda o menu _**Transferências**_ e selecione _**Transferências**_ ou _**Para conta bancária**_ se sua conta for brasileira.

![PrintScreen](/assets/Reports/Reports_33.png)

Para contas não brasileiras, role para baixo até a seção _**Relatório de transferências realizadas**_ onde a tabela do relatório está localizada. Por padrão, o relatório exibe as transferências criadas nos últimos 30 dias, da mais recente para a mais antiga.

![PrintScreen](/assets/Reports/Reports_04_pt.png)

O relatório tem as seguintes colunas:

| Coluna              | Descrição                                                                  |
|---------------------|----------------------------------------------------------------------------|
| ID                  | Id da transferência solicitada.                                            |
| Data de solicitação | Data e hora em que a transferência foi criada.                             |
| Last update         | Data e hora da última ação executada na transferência.                     |
| Valor transferido   | Valor da transferência                                                     |
| Conta destino       | Conta bancária do pedido.                                                  |
| Status              | Último status do pedido. The possible states são: <ul style="margin-bottom: initial;"><li>Aprovada</li><li>Em processo</li><li>Rejeitada</li></ul>                                                               |

{{% alert title="Observação" color="info"%}}
Se você precisar exibir mais informações, entre em contato com seu representante de vendas.
{{% /alert %}}

Você pode filtrar as transferências pela data de sua criação usando o filtro de datas no canto superior direito.

<img src="/assets/Reports/Reports_07_pt.png" alt="PrintScreen" width="60%"/><br>

O intervalo de datas deste filtro é três (3) meses antes da data de término. Se você exceder esse intervalo, o relatório exibirá as informações de três (3) meses após a data de início.<br>Para ver as informações de uma determinada data, defina a mesma para a data de início e de término.

## Baixar o relatório {#download-the-report}
Para baixar o relatório, clique no botão _**Baixar**_ localizado na parte superior ou inferior da tabela do relatório.

![PrintScreen](/assets/Reports/Reports_08_pt.png)

Uma barra de progresso aparece na parte superior da tela. Assim que o processo for concluído, o relatório será baixado automaticamente em formato Excel (_.csv_). O nome do relatório usa o formato:
* Se sua conta não é brasileira: _**[DataDeDownloadEmMilis]\_payment\_orders\_[AccountId].csv**_.
* Se sua conta é brasileira: _**[DataDeDownloadEmMilis]\_daily\_payment\_order\_[AccountId].csv**_.

![PrintScreen](/assets/Reports/Reports_09.png)

{{% alert title="Observação" color="info"%}}
O relatório gerado é armazenado durante 90 dias na seção [Meus relatórios baixados]({{< ref "Reports.md#my-downloaded-reports" >}}).
{{% /alert %}}