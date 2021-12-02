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

![PrintScreen](/assets/Reports/Reports_19.png)

The **_Balanço financeiro_** section is divided in three parts as follows:

### Saldo Geral {#general-balance}
A primeira parte é o saldo geral, onde você pode ver os fundos em sua conta PayU, e um botão para permitir que você solicite uma [transferênca]({{< ref "Transfers.md" >}}) para sua conta bancária.<br>O saldo geral, que é composto por:

* **Available balance**: the total funds received from your sales, after deducting the commission of PayU.
* **Frozen balance**: the funds that are part of a [dispute]({{< ref "Disputes.md" >}}) in process ou an unapproved [refund]({{< ref "Refunds.md" >}}) requested by your customers.
* **Total balance**: the money you can transfer to your bank account. It consists of the **Available balance** plus the **Frozen balance**.

![PrintScreen](/assets/Reports/Reports_20.png)

### Sales made chart
In the second part, you can understand the distribution of costs (including taxes and transaction related costs) e analyze a sales chart and a pie chart that summarizes all this information.

The charts shows the information available in the date frame selected.

![PrintScreen](/assets/Reports/Reports_21.png)

The pie chart provides the following information:

* **Sales Made**: total value of your sales before taxes and PayU fee, your income during the consulted period.
* **Taxes**: additional charges generated according to your tax regime. If your tax regime is different, contact sac@payu.com.
* **PayU Fee**: PayU processing cost, including the sales percentage plus the flat rate applied to your account.

### Report table
In the last part below the charts, you find a table with the credit and debit information of the latest operations. You can see the operation type and the value (credit ou debit) of each row.

![PrintScreen](/assets/Reports/Reports_22.png)

O relatório tem as seguintes colunas:

| Coluna              | Descrição                                                                                         |
|---------------------|-----------------------------------------------------------------------------------------------------|
| Operation           | ID and date of the operation.                                                                       |
| Tipo of Operation   | Information of the operation. Depending on its type, the information displayed varies.<br>Click <img src="/assets/Reports/Reports_23.png" width="2%"/> to expand the detailed values of the operation in the **Debit** and **Credit** columns.<br><br>![PrintScreen](/assets/Reports/Reports_24.png) |
| Credit              | Valor credited to your Account.                                                                    |
| Debit               | Valor debited from your Account.                                                                   |

{{% alert title="Observação" color="info"%}}
Click <img src="/assets/Reports/Reports_25.png" width="1.5%"/> next to _**Value**_ label to merge **debit** and **credit**; the resultant value is **debit** minus the positive value of **credit**.<br>Por exemplo, if the **debit** column value is _$3.296,63_ and the **credit** column value is _$950,00_, the resulting column value after merging is _$2.346,63_.

![PrintScreen](/assets/Reports/Reports_26.png)
{{% /alert %}}

## Filtrar o relatório {##filter-the-report}
You can use the search bar above the graph ou the calendar to set filters. You can filter by _**Tipo of Operation**_, _**Sale ou Transfer ID**_, _**Reference**_<sup>\*</sup>, ou _**Payment method type**_<sup>\*</sup>.

<sup>\*</sup> _These filters are displayed when the selected **Tipo of Operation** is **Sale**, **Reversion**, ou **Chargeback**_.

Para definir um filtro, clique no campo _**Filter your search**_ field at the top of the sales made chart.

<img src="/assets/Reports/Reports_27.png" alt="PrintScreen" width="60%"/><br>

Configure os valores para os filtros e clique em _**Search**_. Once you click it, the filter table shows the operations that meet the selected criteria.

Along with these filters, you can also set a time frame when the buyer performed the sale using the dates filter at the top right corner.

<img src="/assets/Reports/Reports_28.png" alt="PrintScreen" width="60%"/><br>

O intervalo de datas deste filtro é três (3) meses antes da data de término. Se você exceder esse intervalo, o relatório exibirá as informações de três (3) meses após a data de início.<br>Para ver as informações de uma determinada data, defina a mesma para a data de início e de término.

## Baixar o relatório {#download-the-report}
Para baixar o relatório, clique no botão _**Baixar**_ localizado na parte superior ou inferior da tabela do relatório.

![PrintScreen](/assets/Reports/Reports_29.png)

A pop up window appear where you can select the options to generate the report<sup>\*</sup>.

<img src="/assets/Reports/Reports_30.png" alt="PrintScreen" width="50%"/>

{{% alert title="Observação" color="info"%}}
<sup>\*</sup> Caso o formato do arquivo não atenda às suas necessidades, entre em contato com o seu executivo de vendas para saber mais sobre a opção de envio de arquivos por SFTP e os modelos que temos para este relatório.
{{% /alert %}}

O relatório é baixado automaticamente em formato Excel (_.csv_). O nome do relatório usa os seguintes formatos:
* **CSV with what you are seeing on the screen** option: _[DataDeDownloadEmMilis]\_statement\_report\_[AccountId].csv_
* **Balance from previous secure** option: _[AccountId]\_[DataDeDownload]\_transactions.csv_<sup>\*</sup>

<sup>\*</sup> _Data de download em formato **dd-mm-yy-hh-mm-ss**_

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;margin: 10px;">
    <a href="/assets/SampleReports/1632847567058_statement_report_546703.csv">Baixe um exemplo do arquivo gerado usando a opção <i><b>CSV with what you are seeing on the screen</b></i>.</a>
  </div>
  <div style="float: left;width: 50%;text-align: center;margin: 10px;">
    <a href="/assets/SampleReports/546703_28-09-2021-11-48-07.285_transactions.xls">Baixe um exemplo do arquivo gerado usando a opção <i><b>Balance from previous secure</b></i>.</a>
  </div>
</div>
<br>

In the downloaded report, you can validate all the credits and debits of your account and also, you can reconcile the commissions of PayU that appear in the invoice received monthly.

![PrintScreen](/assets/Reports/Reports_31.png)
_PayU commissions and taxes appear in the invoice_

To reconcile the information with the [sales report]({{< ref "Sales-report.md" >}}), você pode usar o _**ReferenceCode**_ variable which appears in brackets in the transaction.

![PrintScreen](/assets/Reports/Reports_32.png)

In the generated report you find the following concepts.

| Concept                              | Descrição                                                                        |
|--------------------------------------|------------------------------------------------------------------------------------|
| **SALES**                            | Approved amount da transação.                                                |
| **POL_COMMISSION**                   | PayU commission: Fixed percentage established for trade + established fixed value. |
| **IVA_POL_COMMISSION**               | Tax commission.                                                                    |
| **IVA_RETENTION**                    | IVA retention.<sup>\*</sup>                                                        |
| **RENTA_RETENTION**                  | Retefuente retention.<sup>\*</sup>                                                 |
| **ICA_RETENTION**                    | ICA retention.<sup>\*</sup>                                                        |
| **RETENTION SALES**                  | Transaction refund.                                                                |
| **RETENTION POL_COMMISSION**         | Refund of the PayU Commission.                                                     |
| **RETENTION IVA_POL_COMMISSION**     | Refund of the PayU Commission tax.                                                 |
| **RETENTION IVA_RETENTION**          | Refund of the IVA retention.                                                       |
| **RETENTION RENTA_RETENTION**        | Refund of the Retefuente retention.                                                |
| **RETENTION ICA_RETENTION**          | Refund of the ICA retention.                                                       |
| **PAYMENT_ORDER**                    | Transfer of the available Balance to the registered bank account.                  |
| **PAYMENT_ORDER_POL_COMMISSION**     | Transfer cost.                                                                     |
| **IVA_PAYMENT_ORDER_POL_COMMISSION** | Transfer tax.                                                                      |
| **FREEZE_FUND**                      | Frozen balance (refunds ou disputes).                                              |
| **UNFREEZE_FUND**                    | Release of the frozen amounts.                                                     |
| **CHARGEBACK**                       | Chargeback ou lost dispute.                                                        |
| **DISCRETIONARY**                    | Discretionary movement ou additional credit to the account.                        |

<sup>\*</sup> _Applies only to transactions with credit card._

{{% alert title="Observação" color="info"%}}
O relatório gerado é armazenado durante 90 dias na seção [Meus relatórios baixados]({{< ref "Reports.md#my-downloaded-reports" >}}).
{{% /alert %}}