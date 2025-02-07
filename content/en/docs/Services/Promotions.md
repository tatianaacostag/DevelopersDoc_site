---
title: "Installments and Promotions"
linkTitle: "Installments and Promotions"
date: 2021-03-26T14:02:05-05:00
description: >
    With Installments and Promotions, you can offer your customers the option to purchase products in multiple installments with a reduced interest rate. Regardless of the number of installments chosen by your customer, you will receive the full purchase amount minus the commission fee agreed upon with PayU. 
weight: 40
---

This document provides an overview of this service. For technical and implementation details, refer to the <a href="https://developers.payulatam.com/latam/en/docs/integrations/api-integration/promotions-api.html" target="_blank">Promotions API </a>documentation.

The Promotions API is available in the following countries:

<table style="width: 50%; min-width: 300px; border-collapse: collapse;">
    <tr>
        <th style="width: 40%; text-align: left;">Country</th>
        <th style="width: 30%; text-align: center;">Promotions</th>
        <th style="width: 30%; text-align: center;">Interest-Free Months (MSI)</th>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Argentina.png" width="25px"/> &nbsp;Argentina</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Colombia.png" width="25px"/> &nbsp;Colombia</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Mexico.png" width="25px"/> &nbsp;Mexico</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Peru.png" width="25px"/> &nbsp;Peru</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
</table>

{{% alert title="Note" color="info"%}}

To configure Installments and Promotions based on your agreements with banking entities, contact your sales representative.

{{% /alert %}}

## How Installments and Promotions Work in PayU

To use promotions, follow these steps:
1. Query the available promotions for your shop.
2. Select the promotion that best suits your needs.
3. Submit the payment request, including the selected promotion ID and the number of installments.

The following diagram illustrates the promotions process:

![Promotions Flow](/assets/Promotions/PromotionsFlow.png)

## Months Without Interest (MSI - Meses sin Intereses)

MSI in Mexico allows customers to pay in a specified number of interest-free installments (3, 6, 9, 12, or 18). Unlike the standard promotions model, MSI does not require querying a promotion ID.

The minimum purchase amounts required for MSI depend on the selected installment plan:

* 3 installments > $300 MXN
* 6 installments > $600 MXN
* 9 installments > $900 MXN
* 12 installments > $1200 MXN
* 18 installments > $1800 MXN

{{% alert title="Note" color="info"%}}

To enable MSI, contact your sales representative.

{{% /alert %}}

## Next Steps

Integrate this feature using the [Promotions API]({{< ref "Promotions-API" >}}). For MSI integration details, refer to this [section]({{< ref "Promotions-API#msi" >}}).
