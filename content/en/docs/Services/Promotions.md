---
title: "Installments and Promotions - Argentina and Mexico"
linkTitle: "Installments and Promotions - Argentina and Mexico"
date: 2021-03-26T14:02:05-05:00
description: >
    Promotions feature lets you consult the valid promotions, along with their associate costs, characteristics, and further relevant information available for your customers. Promotions API applies only to Argentina and Mexico.
weight: 40
---

## What are Installments and Promotions
With Installments and Promotions, you can offer to your customer the possibility to buy your products paying in a determined number of installments with a reduced interest rate. Regardless of the number of installments selected by your customer, you will receive the full amount of the purchase minus the commission free agreed with PayU.

To perform the configuration of Installments and Promotions based on the agreements you have with bank entities, contact your sales representative.

{{% alert title="Note" color="info"%}}
For Mexico, you can use [Months Without Interests (MSI - Meses sin intereses)]({{< ref"Promotions.mdl#months-without-interests-msi---meses-sin-intereses" >}})
{{% /alert %}}

## How does Installments and Promotions works in PayU
To use promotions, you need to first consult the available promotions for your shop; then, select the promotion that fits to your needs and finally, send the payment request along with the promotion Id selected and the number of installments.

The following sequence of events explains better the promotions flow.

![Promotions Flow](/assets/Promotions/PromotionsFlow.png)

## Months Without Interests (MSI - Meses sin intereses)
Months Without Interests (known in Mexico as _Meses sin intereses_) lets you offer to your customers the possibility to pay in a defined number of interest-free installments (3, 6, 9, 12, or 18). Unlike the promotions model, when using MSI you don't need to query the promotion id.

To request the usage of MSI, contact your sales representative.

{{% alert title="Note" color="info"%}}
The minimum values for MSI depends on the number of installments selected:
* 3 > $300 MXN
* 6 > $600 MXN
* 9 > $900 MXN
* 12 > $1200 MXN
* 18 > $1800 MXN
{{% /alert %}}

## What's next?
The integration with this feature can be performed using the [Promotions API]({{< ref "Promotions-API" >}}). To learn how to integrate with MSI, refer to this [section]({{< ref "Promotions-API#msi" >}}).