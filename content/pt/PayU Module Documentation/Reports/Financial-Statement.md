---
title: "Extrato"
linkTitle: "Extrato"
date: 2021-09-03T16:45:26-05:00
type: docs
Description: >
  Saiba mais sobre os fundos creditados em sua conta PayU e seus movimentos. Nesta seção, você também pode consultar os dados disponíveis neste relatório.
weight: 30
---

{{% alert title="Observação" color="info"%}}
Os relatórios no painel do comércio são limitado a 20 mil linhas para exibição e download. Se você precisar exibir mais linhas ou colunas no relatório, entre em contato com seu representante de vendas.
{{% /alert %}}

## O que é o Extrato? {#what-is-the-financial-statement}
O Extrato ajuda a identificar os movimentos (descontos de comissão, taxas de transferência, reembolsos) de sua conta PayU. Este relatório mostra o resumo da conta, com débitos e créditos realizados no mês, e informações do saldo disponível.

Além disso, o the Extrato ajuda a área contábil a conciliar todas as operações de comércio eletrônico.

## Permissão necessária {#permission-required}
Para ter acesso a este módulo, você precisa ter um perfil com as seguintes permissões habilitadas

* _Declarações_ > _Relatório de Balanço_	
* _Declarações_ > _Baixar o relatório CSV_<br>Essa permissão deve ser habilitada para que você baixe o relatório.

Consulte [Perfis e permissões]({{< ref"Profile-and-permissions-management.md" >}}) para obter mais informações.

## Consulte o relatório {#consult-the-report}
Faça login em sua conta PayU. No menu esquerdo, expanda o menu _**Transações**_ e selecione _**Extrato**_. Por padrão, o relatório mostra as informações de operação<sup>\*</sup> dos últimos 30 dias, do mais recente ao mais antigo. 

<sup>*</sup>_Limitado aos 20 mil registros principais._

![PrintScreen](/assets/Reports/Reports_19_pt.png)

A seção **_Balanço financeiro_** é dividida em três partes da seguinte forma:

### Saldo Geral {#general-balance}
A primeira parte é o saldo geral, onde você pode ver os fundos em sua conta PayU, e um botão para permitir que você solicite uma [transferênca]({{< ref "Transfers.md" >}}) para sua conta bancária.<br>O saldo geral, que é composto por:

* **Saldo disponível**: saldo disponível em conta, após desconto de tarifa PayU e outros encargos
* **Saldo congelado**: os fundos que fazem parte de uma [disputa]({{< ref "Disputes.md" >}}) em andamento ou ordem de [reembolso]({{< ref "Refunds.md" >}}) não aprovado solicitado por seus clientes.
* **Total balance**: o total de fundos recebidos em sua conta PayU. It consists of the **Saldo disponível** mais o **Saldo congelado**.

![PrintScreen](/assets/Reports/Reports_20_pt.png)

### Gráfico de vendas realizadas {#sales-made-chart}
Na segunda parte, você pode entender a distribuição dos custos (incluindo impostos e custos relacionados à transação) e analisar um gráfico de vendas e um gráfico de pizza que resumem todas essas informações.

Os gráficos mostram as informações disponíveis no período selecionado.

![PrintScreen](/assets/Reports/Reports_21_pt.png)

O gráfico de pizza fornece as seguintes informações:

* **Vendas realizadas**: valor total das suas vendas antes de impostos e taxa PayU, seus rendimentos durante o período consultado.
* **Impostos**: encargos adicionais gerados de acordo com seu regime tributário. Se o seu regime tributário for diferente, entre em contato sac@payu.com.
* **Tarifa PayU**: Custo de processamento PayU, incluindo a porcentagem de vendas mais a taxa fixa aplicada à sua conta.

### Report table {#report-table}
Na última parte abaixo dos gráficos, você encontra uma tabela com os dados de crédito e débito das últimas operações. Você pode ver o tipo de operação e o valor (crédito ou débito) de cada linha.

![PrintScreen](/assets/Reports/Reports_22_pt.png)

O relatório tem as seguintes colunas:

| Operação           | Descrição                                                                                    |
|--------------------|----------------------------------------------------------------------------------------------|
| Operation          | ID e data da operação.                                                                       |
| Tipo de operação   | Informações da operação. Dependendo do tipo, as informações exibidas variam.<br>Clique <img src="/assets/Reports/Reports_23.png" width="2%"/> para expandir os valores detalhados da operação nas colunas **Débito** e **Crédito**.<br><br>![PrintScreen](/assets/Reports/Reports_24_pt.png) |
| Crédito            | Valor creditado na sua conta.                                                                |
| Débito             | Valor debitado da sua conta.                                                                 |

{{% alert title="Observação" color="info"%}}
Clique em <img src="/assets/Reports/Reports_25.png" width="1.5%"/> ao lado da etiqueta _**Valor**_ para mesclar **débito** e **crédito**; o valor resultante é o **débito** menos o valor positivo de **crédito**.<br>Por exemplo, se o o valor da coluna **débito** é _$3.296,63_ e o valor da coluna **crédito** é _$950,00_, o valor da coluna resultante após mesclar é _$2.346,63_.

![PrintScreen](/assets/Reports/Reports_26_pt.png)
{{% /alert %}}

## Filtrar o relatório {##filter-the-report}
Você pode usar a barra de pesquisa acima do gráfico ou o calendário para definir filtros. Você pode filtrar por _**Tipo de operação**_, _**ID venda ou saque**_, _**Referência**_<sup>\*</sup>, ou _**Tipo de meio de pagamento**_<sup>\*</sup>.

<sup>\*</sup> _Esses filtros são exibidos quando o **Tipo de operação** é **Venda**, **Reversão**, ou **Chargeback**_.

Para definir um filtro, clique no campo _**Filtre sua busca**_ na parte superior do gráfico de vendas realizadas.

<img src="/assets/Reports/Reports_27_pt.png" alt="PrintScreen" width="60%"/><br>

Configure os valores para os filtros e clique em _**Buscar**_. Depois de clicar, a tabela do filtro mostra as operações que atendem aos critérios selecionados.

Além desses filtros, você pode definir um período em que o comprador realizou a venda usando o filtro de datas no canto superior direito. O período é definido aqui

<img src="/assets/Reports/Reports_28_pt.png" alt="PrintScreen" width="60%"/><br>

O intervalo de datas deste filtro é três (3) meses antes da data de término. Se você exceder esse intervalo, o relatório exibirá as informações de três (3) meses após a data de início.<br>Para ver as informações de uma determinada data, defina a mesma para a data de início e de término.

## Baixar o relatório {#download-the-report}
Para baixar o relatório, clique no botão _**Baixar**_ localizado na parte superior ou inferior da tabela do relatório.

![PrintScreen](/assets/Reports/Reports_29_pt.png)

Uma janela pop-up aparecerá onde você pode selecionar as opções para gerar o relatório<sup>\*</sup>.

<img src="/assets/Reports/Reports_30_pt.png" alt="PrintScreen" width="50%"/>

{{% alert title="Observação" color="info"%}}
<sup>\*</sup> Caso o formato do arquivo não atenda às suas necessidades, entre em contato com o seu executivo de vendas para saber mais sobre a opção de envio de arquivos por SFTP e os modelos que temos para este relatório.
{{% /alert %}}

O relatório é baixado automaticamente em formato Excel (_.csv_). O nome do relatório usa os seguintes formatos:
* **CSV com o que você está vendo na tela** option: _[DataDeDownloadEmMilis]\_statement\_report\_[AccountId].csv_
* **Versão do antigo Módulo Administrativo** option: _[AccountId]\_[DataDeDownload]\_transactions.csv_<sup>\*</sup>

<sup>\*</sup> _Data de download em formato **dd-mm-yy-hh-mm-ss**_

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;margin: 10px;">
    <a href="/assets/SampleReports/1632847567058_statement_report_546703.csv">Baixe um exemplo do arquivo gerado usando a opção <i><b>CSV com o que você está vendo na tela</b></i>.</a>
  </div>
  <div style="float: left;width: 50%;text-align: center;margin: 10px;">
    <a href="/assets/SampleReports/546703_28-09-2021-11-48-07.285_transactions.xls">Baixe um exemplo do arquivo gerado usando a opção <i><b>Versão do antigo Módulo Administrativo</b></i>.</a>
  </div>
</div>
<br>

No relatório baixado, você pode validar todos os créditos e débitos da sua conta, bem como conciliar as comissões do PayU que constam na fatura recebida mensalmente.

![PrintScreen](/assets/Reports/Reports_31.png)
_Comissões e impostos PayU aparecem na fatura_

Para reconciliar as informações com o [relatório de vendas]({{< ref "Sales-report.md" >}}), você pode usar a variável _**ReferenceCode**_ que aparece entre colchetes na transação.

![PrintScreen](/assets/Reports/Reports_32.png)

No relatório gerado, você encontra os seguintes conceitos.

| Conceito                             | Descrição                                                                                    |
|--------------------------------------|----------------------------------------------------------------------------------------------|
| **SALES**                            | Valor aprovado da transação.                                                                 |
| **POL_COMMISSION**                   | Comissão PayU: Percentual fixo estabelecido para negociação, mais o valor fixo estabelecido. |
| **IVA_POL_COMMISSION**               | Comissão tributária.                                                                         |
| **IVA_RETENTION**                    | Retenção de IVA.<sup>\*</sup>                                                                |
| **RENTA_RETENTION**                  | Retenção retefuente.<sup>\*</sup>                                                            |
| **ICA_RETENTION**                    | Retenção de ICA.<sup>\*</sup>                                                                |
| **RETENTION SALES**                  | Reembolso da transação.                                                                      |
| **RETENTION POL_COMMISSION**         | Reembolso da Comissão PayU.                                                                  |
| **RETENTION IVA_POL_COMMISSION**     | Reembolso do imposto de comissão PayU.                                                       |
| **RETENTION IVA_RETENTION**          | Reembolso da retenção do IVA.                                                                |
| **RETENTION RENTA_RETENTION**        | Reembolso da retenção Retefuente.                                                            |
| **RETENTION ICA_RETENTION**          | Reembolso da retenção do ICA.                                                                |
| **PAYMENT_ORDER**                    | Transferência do saldo disponível para a conta bancária cadastrada.                          |
| **PAYMENT_ORDER_POL_COMMISSION**     | Custo de transferência.                                                                      |
| **IVA_PAYMENT_ORDER_POL_COMMISSION** | Imposto de transferência.                                                                    |
| **FREEZE_FUND**                      | Saldo congelado (reembolsos ou disputas).                                                    |
| **UNFREEZE_FUND**                    | Liberação dos valores congelados.                                                            |
| **CHARGEBACK**                       | Estorno ou disputa perdida.                                                                  |
| **DISCRETIONARY**                    | Movimento sujeito a critério ou crédito adicional à conta.                                   |

<sup>\*</sup> _Válido apenas a transações com cartão de crédito._

{{% alert title="Observação" color="info"%}}
O relatório gerado é armazenado durante 90 dias na seção [Meus relatórios baixados]({{< ref "Reports.md#my-downloaded-reports" >}}).
{{% /alert %}}