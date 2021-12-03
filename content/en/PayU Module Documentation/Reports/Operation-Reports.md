---
title: "Operation reports"
linkTitle: "Operation reports"
date: 2021-12-03T15:23:45-05:00
type: docs
Description: >
  Learn how to download the Operation reports suggested by the **CNBV**. These reports are available for merchants in Mexico.
weight: 50
---

The Operation Reports suggested by the _National Banking and Securities Commission_ (CNBV) are monthly reports with a validity of three (3) months. That is, during the current month you can download the reports for the month immediately preceding and the two months prior to this.

{{% alert title="Note" color="info"%}}
To have access to this module, you need to have a profile with the permission _Operation reports_ > _Consult operation reports_ enabled.

Refer to [Profiles and Permissions]({{< ref"Profile-and-permissions-management.md" >}}) for more information.
{{% /alert %}}

## Download the reports
Log into your PayU account. In the left menu, expand the _**Transactions**_ menu and select _**Operation reports**_.

![PrintScreen](/assets/OperationReports/OperationReports_01.png)

Select the month of the operations and the report types you want to generate. Then, click _**Download**_.<br>As mentioned before, you can only generate reports for the three earlier months.

![PrintScreen](/assets/OperationReports/OperationReports_02.png)

As soon as the selected reports are generated, a zip folder is automatically downloaded with the reports in _.xlsx_ format.<br>The following sections explain the reports you can generated along with their columns.

{{% alert title="Note" color="info"%}}
If you don't have transactions in the selected month, the reports downloaded are standard template filled with zeros.
{{% /alert %}}

### Transaction charges
This report can be generated for a given month and it has the following fields (in Spanish):


| | Field | Description |
|:-:|---|---|
| A | Monto Facturado Total | Total value in pesos (**MXN**) of the trasnactions of the month. |
| B | Número de pagos debidamente autorizados | Number of authorized payments of the month. |
| C | Tasa de descuento (%) | The commission charged by the acquirer bank to the commerces for install Points of Sale (TPV - Terminal Punto de Venta) and provide the access to the network which enables the acceptance of payments with bank cards. Processing commission fixed and/or variable. |
| D | Monto cargado por tasa de descuento | The resultant value in pesos (**MXN**) after applying the percentage of the discount rate (_**Tasa de descuento**_). Namely, _Column A_ × _Column C_ . |
| E | Cuotas por otros conceptos o penalizaciones | Further charges in addition to the discount rate (_**Tasa de descuento**_). |
| F | Monto total por servicios de recepción de pagos con tarjeta | The result of sum the _Column D_ and _Column E_, if applies. |

### Commissions for other concepts or penalties
This a detailed report for _Column C_ (_**Cuotas por otros conceptos o penalizaciones**_) in the [Transaction Charges Report]({{< ref"#transaction-charges" >}}). This report can be generated for a given month and includes all the concepts in the month and the sum of each one.

### TPVs related charge
To download this report, unselect the checkboxes _**Transaction charges**_ and _**Commissions for other concepts or penalties**_. This report can be generated for a given month and it has the following fields (in Spanish):

| Field | Description |
|:-:|---|---|
| Uso de las terminales punto de venta | Amount in pesos (**MXN**) charged to the customer for the use of the Point of Sale (TPV - Terminal Punto de Venta). | 
| Mantenimiento de las terminales punto de venta<sup>\*</sup> | Amount charged to the client for the maintaining of the Point of Sale (TPV - Terminal Punto de Venta). |
| Uso de aplicaciones tecnológicas de recepción de Pagos con Tarjeta<sup>\*</sup> | Amount charged to the client for using the app. |
| Cuotas por incumplimiento en facturación mínima / penalizaciones<sup>\*</sup> | Amount charged to the client in case they incur in a breach or penalty for minimum invoicing |
| Total cargos relacionados a terminales punto de venta | The result of the sum of all the concepts related to the Point of Sale (TPV - Terminal Punto de Venta). |

<sup>\*</sup>Specify the periodicity: monthly, annual, etc.