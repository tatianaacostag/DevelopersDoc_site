---
title: "Sales Report"
linkTitle: "Sales Report"
date: 2021-09-03T16:45:07-05:00
type: docs
Description: >
  Review the details of payments received, most used payment methods and frequent clients.
weight: 10
---

{{% alert title="Note" color="info"%}}
The Sales Report displayed in the merchant panel are limited to **20 thousand** rows for both displaying and downloading. If you need display more rows or columns in the report, contact your sales representative.
{{% /alert %}}

## Permission required
To have access to this module, you need to have a profile with the _Reports_ > _Sales Report_ permission enabled.

Refer to [Profiles and Permissions]({{< ref"Profile-and-permissions-management.md" >}}) for more information.

## Consult the report
Log into your PayU account. In the left menu, expand the _**Transactions**_ menu and select _**Sales Report**_.

![PrintScreen](/assets/Refunds/Refunds_en_04.png)

In the report, you can see a filter box, and the list of your latest sales. By default, the report shows the sales information<sup>\*</sup> of the last seven days, from the most recent to the oldest. 

<sup>*</sup>_Limited to top 20 thousand records._

![PrintScreen](/assets/Reports/Reports_10.png)

The report has the following columns:

| Column              | Description                                                                                         |
|---------------------|-----------------------------------------------------------------------------------------------------|
| Order               | This column shows the identifier of the order along with the date of the sale.                      |
| Reference           | This column shows the sale reference and the name of the product or service offered.                |
| Buyer               | This column shows the name and the e-mail address of the person who preform the buy.                 |
| Amount              | Amount of the sale.                                                                                 |
| Payment method      | Information of the payment method used by the buyer.                                                |
| Status              | Current status of the order.                                                                        |

{{% alert title="Note" color="info"%}}
If you need to display more information, contact your sales representative.
{{% /alert %}}

Refer to [Order details]({{< ref "#transaction-details" >}}) to know all the transaction detail of the sale.

## Filter the report
You can use the search bar above the graph or the calendar to set filters. You can filter by _**Reference**_, _**Order**_, _**Buyer**_, _**Amount**_, _**status**_, or _**Payment method**_.

To set a filter, click the _**Filter my sales**_ field at the top of the report table.

<img src="/assets/Reports/Reports_11.png" alt="PrintScreen" width="60%"/><br>

Configure the values for the filters and click _**Search**_. Once you click it, the filter table shows the sales that meet the selected criteria.

Along with these filters, you can also set a time frame when the buyer performed the sale using the dates filter at the top right corner. The date frame defined here.

<img src="/assets/Reports/Reports_12.png" alt="PrintScreen" width="60%"/><br>

The date range of this filter is one (1) month before the end date. If you exceed this range, The report displays the information of one (1) month after the start date.<br>To see the information of a given date, set it for both start and end date.

## Transaction details
You can review the transaction detail online. To do this, click the order you want to consult in the report table. The transaction details appears in the right panel.

![PrintScreen](/assets/Reports/Reports_13.png)

The _**Transaction details**_ panel has the following sections:

<img src="/assets/Reports/Reports_14.png" alt="PrintScreen" width="50%"/><br>

<div class="variables"></div>

|  | Name | Description |
|:---:|---|---|
| 1 | Order info | This section shows the Order Id, its latest update date, its status along with the status description, and the sale reference. |
| 2 | Product or service | Description of the product or service you provided in the sale. |
| 3 | Payment method | Information of the Payment method used in the purchase. The information displayed in this section varies according to the payment method.<br>For pending cash payments, this section lets you see the payment receipt generated to the buyer. |
| 4 | Values | This section shows the values involved in this transaction such as the _Value to charge (or charged)_, _Pending value_, _Refunded value_ (for refunds), _Expired value_ (for cash payments).  |
| 5 | Buyer info | Information of the person who performed the purchase. |
| 6 | Delivery info | Information of the delivery options. |
| 7 | This purchase had | Transactions associated to this purchase. Click the **▾** symbol to find [details of each transaction]({{< ref "#transaction-details" >}}).<br><br>![PrintScreen](/assets/Reports/Reports_15.png) |
| 8 | Actions | Actions available over the actions. |

### Transaction history
When you expand the _**This purchase had**_ section, you can see the details of each transaction associated to an order.

<img src="/assets/Reports/Reports_16.png" alt="PrintScreen" width="50%"/><br>

The information available includes the values debited from your account, the payment method, the payer information and more. 

## Download the report
To download the report, click the _**Download**_ button located at the top or at the bottom of the report table.

![PrintScreen](/assets/Reports/Reports_17.png)

A pop up window appear where you can select the options to generate the report:
* **Report**: lets you generate a report with the status of the orders and the final status of the last transaction or attempted purchase related to that order.
* **Balance from previous secure**: lets you generate a report with all the transactions and shows the information of the buyer and payer (e-mail, name, document number)<sup>\*</sup>.

<img src="/assets/Reports/Reports_18.png" alt="PrintScreen" width="50%"/>

{{% alert title="Note" color="info"%}}
<sup>\*</sup> If the file format does not meet the your needs, contact your sales executive to know more about the option to send files through SFTP and the templates that we have for this report.
{{% /alert %}}

The report is automatically downloaded in an Excel (_.csv_) format. The name of the report uses the following formats:
* **Report** option: _[DownloadDateInMillis]\_orders\_[AccountId].csv_
* **Balance from previous secure** option: _[AccountId]\_[DownloadDate]\_transactions.csv_<sup>\*</sup>

<sup>\*</sup> _Download date in format **dd-mm-yy-hh-mm-ss**_

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;margin: 10px;">
    <a href="/assets/SampleReports/1632771735723_orders_546703.csv">Download an example of the generated file using the <i><b>Report</b></i> option.</a>
  </div>
  <div style="float: left;width: 50%;text-align: center;margin: 10px;">
    <a href="/assets/SampleReports/546703_27-09-2021-14-52-58.486_transactions.csv">Download an example of the generated file using the <i><b>Balance from previous secure</b></i> option.</a>
  </div>
</div>

{{% alert title="Note" color="info"%}}
The generated report is stored during 90 days in the [My downloaded reports]({{< ref "Reports.md#my-downloaded-reports" >}}) section.
{{% /alert %}}