---
title: "Interest-Free Installments"
linkTitle: "Interest-Free Installments"
date: 2025-06-29T14:02:05-05:00
description: >
    With **Specific Interest-Free Installments** (Promotions) or **General Interest-Free Installments** (MSI), you can offer your customers the option to purchase products through deferred payments with reduced or no interest rates. Regardless of the number of installments selected by the customer, you will receive the total purchase amount minus the commission agreed upon with PayU.
weight: 40
---

This document provides an overview of this service. For technical and implementation details, refer to the <a href="https://developers.payulatam.com/latam/en/docs/integrations/api-integration/pricing-api.html" target="_blank">Pricing API</a> documentation.

## Interest-Free Installment Options {#interest-free-installment-options}

PayU offers two types of Interest-Free Installments so merchants can provide financing options without additional interest for the buyer. Each type differs in terms of configuration, scope, and flexibility:

* **Specific Interest-Free Installments:** Also known as **Promotions**. Merchants can configure them using targeted plans based on specific BINs, issuers, or acquirers. This type allows more granular customization and is available in Argentina, Colombia, Mexico, and Peru.

* **General Interest-Free Installments:** Also known as **Meses sin Intereses (MSI)** in Mexico. Merchants can apply them globally to all issuers or card franchises of a payment method. This option offers simpler configuration and is only available in Argentina and Mexico.

The table below compares the main features of both options:

<table style="width: 75%; min-width: 300px; border-collapse: collapse;">
  <tr>
    <th style="width: 10%; text-align: left;"></th>
    <th style="width: 25%; text-align: center;">Specific Interest-Free Installments<br>(Promotions)</th>
    <th style="width: 25%; text-align: center;">General Interest-Free Installments<br>(MSI)</th>
  </tr>
  <tr>
  <td style="text-align: left;"><strong>Availability by country</strong></td>
  <td style="text-align: left;">
    <div style="padding-left: 28%;">
      <img src="/assets/Argentina.png" width="16px"/> &nbsp;Argentina<br>
      <img src="/assets/Colombia.png" width="16px"/> &nbsp;Colombia<br>
      <img src="/assets/Mexico.png" width="16px"/> &nbsp;Mexico<br>
      <img src="/assets/Peru.png" width="16px"/> &nbsp;Peru
    </div>
  </td>
  <td style="text-align: left;">
    <div style="padding-left: 28%;">
      <img src="/assets/Argentina.png" width="16px"/> &nbsp;Argentina<br>      
      <img src="/assets/Mexico.png" width="16px"/> &nbsp;Mexico<br>      
    </div>
  </td>
</tr>
  <tr>
    <td style="text-align: left;"><strong>Applicability</strong></td>
    <td style="text-align: center;">By BIN, issuer, or acquirer</td>
    <td style="text-align: center;">By payment method or franchise</td>
  </tr>
  <tr>
    <td style="text-align: left;"><strong>Conditions</strong></td>
    <td style="text-align: center;">Configurable rate per issuer</td>
    <td style="text-align: center;">Single rate for all issuers</td>
  </tr>
  <tr>
    <td style="text-align: left;"><strong>Configuration</strong></td>
    <td style="text-align: center;">Per promotion</td>
    <td style="text-align: center;">Per account</td>
  </tr>
  <tr>
    <td style="text-align: left;"><strong>Flexibility</strong></td>
    <td style="text-align: center;">High</td>
    <td style="text-align: center;">Low</td>
  </tr>
  <tr>
    <td style="text-align: left;"><strong>Additional options</strong></td>
    <td style="text-align: center;">Multiple promotions, <br>BIN uploads, by account, by days, time range, or amounts</td>
    <td style="text-align: center;">Not applicable</td>
  </tr>
  <tr>
    <td style="text-align: left;"><strong>Example</strong></td>
    <td style="text-align: center;">5% interest for ABC Bank<br>Visa cards, in 6 installments</td>
    <td style="text-align: center;">6 months interest-free<br>with all cards</td>
  </tr>
</table>

{{% alert title="Note" color="info"%}}

To configure Interest-Free Installments according to your agreements with issuing banks, contact your sales representative.

{{% /alert %}}

## What Is a Promotion?

At PayU, a **promotion** does not refer to a discount on the product price. Instead, the term describes a special financing configuration that allows Interest-Free Installments under specific conditions.

In the <a href="https://developers.payulatam.com/latam/en/docs/integrations/api-integration/pricing-api.html" target="_blank">Pricing API</a>, these promotions are included in the `promos` array and correspond to **Specific Interest-Free Installments**.

### Characteristics of a Promotion

Specific Interest-Free Installments, promotions, or simply _promos_ have the following characteristics:

* They apply only to certain issuers, BINs, or banks.
* They have a defined validity period.
* They may require a minimum purchase amount or a minimum number of installments.
* They are configured in the PayU system based on specific commercial agreements.

### Example of a Promotion

A merchant may offer 6 interest-free installments if the customer uses a Mastercard from ABC Bank. Even though the product price does not change, this condition is handled as a **technical promotion** in PayU.

## How Interest-Free Installments Work in PayU

To apply interest-free deferred payments in your store, follow these steps:

1. Query the available options in the Pricing API.
2. Identify the promotion or option that fits your business model and display it to your customer at checkout.
3. When processing the payment, include the selected promotion ID and number of installments.

## MSI (Meses sin Intereses)

In Mexico, General Interest-Free Installments are commonly known as **Meses sin Intereses (MSI)**. This modality allows merchants to offer fixed installment plans (3, 6, 9, 12, or 18 months) with no interest, without needing to reference a promotion ID.

Each MSI plan requires a minimum purchase amount:

* 3 installments > $300 MXN  
* 6 installments > $600 MXN  
* 9 installments > $900 MXN  
* 12 installments > $1200 MXN  
* 18 installments > $1800 MXN

{{% alert title="Note" color="info"%}}

To enable MSI plans on your account, contact your sales representative.

{{% /alert %}}

## Next Steps

Integrate this feature using the [Pricing API]({{< ref "Pricing-API" >}}). For more information on the MSI modality, visit this [specific section]({{< ref "Pricing-API#msi-interest-free-months" >}}).
