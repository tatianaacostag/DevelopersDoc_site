---
title: "Balance financiero"
linkTitle: "Balance financiero"
date: 2021-09-03T16:45:26-05:00
type: docs
Description: >
  Learn more about the funds credited to your PayU account y their movements. In this section, you can also know the data available in this report.
weight: 30
---

{{% alert title="Nota" color="info"%}}
The Sales Report displayed in the merchant panel are limited to **20 thousand** rows for both displaying y downloading. If you need display more rows or columns in the report, contact your sales representative.
{{% /alert %}}

## What is the Balance financiero?
The Balance financiero helps you identify the movements (Commission discounts, transfer fees, reversions) of your PayU account. This report shows the summary of the account, with debits y credits made during the month, y information of the available balance.

Furthermore, the Balance financiero helps the accounting area to reconcile all trade e-commerce operations.

## Permission required
To have access to this module, you need to have a profile with the following permissions enabled

* _Movements_ > _Statement_	
* _Movements_ > _Download CSV report_<br>This permission must be enabled to let you download the report.

Refer to [Profiles y Permissions]({{< ref"Profile-and-permissions-management.md" >}}) for more information.

## Consult the report
Log into your PayU account. In the left menu, expand the _**Transacciones**_ menu y select _**Balance financiero**_. By default, the report shows the operation information<sup>\*</sup> of the last 30 days, from the most recent to the oldest. 

<sup>*</sup>_Limited to top 20 thousand records._

![PrintScreen](/assets/Reports/Reports_19.png)

The **_Statements Balance_** section is divided in three parts as follows:

### General Balance
The first part is the general balance where you can see the funds in your PayU account y a button to let you request a [transfer]({{< ref "Transfers.md" >}}) to your bank account.<br>The general balance, which is comprised of:

* **Available balance**: the total funds received from your sales, after deducting the commission of PayU.
* **Frozen balance**: the funds that are part of a [dispute]({{< ref "Disputes.md" >}}) in process or an unapproved [refund]({{< ref "Refunds.md" >}}) requested by your customers.
* **Total balance**: the money you can transfer to your bank account. It consists of the **Available balance** minus the **Frozen balance**.

![PrintScreen](/assets/Reports/Reports_20.png)

### Sales made chart
In the second part, you can understand the distribution of costs (including taxes y transaction related costs), y analyze a sales chart y a pie chart that summarizes all this information.

The charts shows the information available in the date frame selected.

![PrintScreen](/assets/Reports/Reports_21.png)

The pie chart provides the following information:

* **Sales Made**: total value of your sales before taxes y PayU fee, your income during the consulted period.
* **Taxes**: additional charges generated according to your tax regime. If your tax regime is different, contact sac@payu.com.
* **PayU Fee**: PayU processing cost, including the sales percentage plus the flat rate applied to your account.

### Report table
In the last part below the charts, you find a table with the credit y debit information of the latest operations. You can see the operation type y the value (credit or debit) of each row.

![PrintScreen](/assets/Reports/Reports_22.png)

The report has the following columns:

| Column              | Descripción                                                                                         |
|---------------------|-----------------------------------------------------------------------------------------------------|
| Operation           | ID y date of the operation.                                                                       |
| Type of Operation   | Information of the operation. Depending on its type, the information displayed varies.<br>Click <img src="/assets/Reports/Reports_23.png" width="2%"/> to expand the detailed values of the operation in the **Debit** y **Credit** columns.<br><br>![PrintScreen](/assets/Reports/Reports_24.png) |
| Credit              | Amount credited to your Cuenta.                                                                    |
| Amount              | Amount debited from your Cuenta.                                                                   |

{{% alert title="Nota" color="info"%}}
Click <img src="/assets/Reports/Reports_25.png" width="1.5%"/> next to _**Value**_ label to merge **debit** y **credit**; the resultant value **debit** minus the positive value of **credit**.<br>Por ejemplo, if the **debit** column value is _$3.296,63_ y the **credit** column value is _$950,00_, the resulting column value after merging is _$2.346,63_.

![PrintScreen](/assets/Reports/Reports_26.png)
{{% /alert %}}

## Filter the report
You can use the search bar above the graph or the calendar to set filters. You can filter by _**Type of Operation**_, _**Sale or Transfer ID**_, _**Reference**_<sup>\*</sup>, or _**Payment method type**_<sup>\*</sup>.

<sup>\*</sup> _These filters are displayed when the selected **Type of Operation** is **Sale**, **Reversion**, or **Chargeback**_.

To set a filter, click the _**Filter your search**_ field at the top of the sales made chart.

<img src="/assets/Reports/Reports_27.png" alt="PrintScreen" width="60%"/><br>

Configure the values for the filters y click _**Search**_. Once you click it, the filter table shows the operations that meet the selected criteria.

Along with these filters, you can also set a time frame when the buyer performed the sale using the dates filter at the top right corner. The date frame defined here

<img src="/assets/Reports/Reports_28.png" alt="PrintScreen" width="60%"/><br>

The date range of this filter is three (3) months before the end date. If you exceed this range, The report displays the information of three (3) months after the start date.<br>To see the information of a given date, set it for both start y end date.

## Download the report
To download the report, click the _**Download**_ button located at the top or at the bottom of the report table.

![PrintScreen](/assets/Reports/Reports_29.png)

A pop up window appear where you can select the options to generate the report<sup>\*</sup>.

<img src="/assets/Reports/Reports_30.png" alt="PrintScreen" width="50%"/>

{{% alert title="Nota" color="info"%}}
<sup>\*</sup> If the file format does not meet the your needs, contact your sales executive to know more about the option to send files through SFTP y the templates that we have for this report.
{{% /alert %}}

The report is automatically downloaded in an Excel (_.csv_) format. The name of the report uses the following formats:
* **CSV with what you are seeing on the screen** option: _[DownloadDateInMillis]\_statement\_report\_[AccountId].csv_
* **Balance from previous secure** option: _[AccountId]\_[DownloadDate]\_transactions.csv_<sup>\*</sup>

<sup>\*</sup> _Download date in format **dd-mm-yy-hh-mm-ss**_

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;margin: 10px;">
    <a href="/assets/SampleReports/1632847567058_statement_report_546703.csv">Download an example of the generated file using the <i><b>CSV with what you are seeing on the screen</b></i> option.</a>
  </div>
  <div style="float: left;width: 50%;text-align: center;margin: 10px;">
    <a href="/assets/SampleReports/546703_28-09-2021-11-48-07.285_transactions.xls">Download an example of the generated file using the <i><b>Balance from previous secure</b></i> option.</a>
  </div>
</div>
<br>

In the downloaded report, you can validate all the credits y debits of your account y also, you can reconcile the commissions of PayU that appear in the invoice received monthly.

![PrintScreen](/assets/Reports/Reports_31.png)
_PayU commissions y taxes appear in the invoice_

To reconcile the information with the [sales report]({{< ref "Sales-report.md" >}}), you can use the _**ReferenceCode**_ variable which appears in brackets in the transaction.

![PrintScreen](/assets/Reports/Reports_32.png)

In the generated report you find the following concepts.

| Concept                              | Descripción                                                                        |
|--------------------------------------|------------------------------------------------------------------------------------|
| **SALES**                            | Approved amount of the transaction.                                                |
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
| **FREEZE_FUND**                      | Frozen balance (refunds or disputes).                                              |
| **UNFREEZE_FUND**                    | Release of the frozen amounts.                                                     |
| **CHARGEBACK**                       | Chargeback or lost dispute.                                                        |
| **DISCRETIONARY**                    | Discretionary movement or additional credit to the account.                        |
<sup>\*</sup> _Applies only to transactions with credit card._

{{% alert title="Nota" color="info"%}}
The generated report is stored during 90 days in the [My downloaded reports]({{< ref "Reports.md#my-downloaded-reports" >}}) section.
{{% /alert %}}