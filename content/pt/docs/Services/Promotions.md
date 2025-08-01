---
title: "Parcelamentos Sem Juros"
linkTitle: "Parcelamentos Sem Juros"
date: 2025-06-29T14:02:05-05:00
description: >
    Com os **Parcelamentos Sem Juros Específicos** (Promoções) ou os **Parcelamentos Sem Juros Gerais** (MSI), você pode oferecer aos seus clientes a opção de comprar produtos com pagamentos parcelados e com taxas de juros reduzidas ou inexistentes. Independentemente do número de parcelas escolhidas pelo cliente, você receberá o valor total da compra menos a comissão acordada com a PayU.
weight: 40
---

Este documento oferece uma visão geral deste serviço. Para detalhes técnicos e de implementação, consulte a documentação da <a href="https://developers.payulatam.com/latam/pt/docs/integrations/api-integration/pricing-api.html" target="_blank">API de Pricing</a>.

## Opções de Parcelamento Sem Juros {#interest-free-installment-options}

A PayU oferece dois tipos de Parcelamentos Sem Juros para que os lojistas possam proporcionar opções de financiamento sem juros adicionais para o comprador. Cada tipo difere em termos de configuração, abrangência e flexibilidade:

* **Parcelamentos Sem Juros Específicos:** Também conhecidos como **Promoções**. Os lojistas podem configurá-los com planos direcionados com base em BINs, emissores ou adquirentes específicos. Esse tipo permite uma personalização mais granular e está disponível na Argentina, Colômbia, México e Peru.

* **Parcelamentos Sem Juros Gerais:** Também conhecidos como **Meses Sem Juros (MSI)** no México. Os lojistas podem aplicá-los de forma global a todos os emissores ou bandeiras de um método de pagamento. Essa opção oferece configuração mais simples e está disponível apenas na Argentina e no México.

A tabela abaixo compara as principais características de ambas as opções:

<table style="width: 75%; min-width: 300px; border-collapse: collapse;">
  <tr>
    <th style="width: 10%; text-align: left;"></th>
    <th style="width: 25%; text-align: center;">Parcelamentos Sem Juros Específicos<br>(Promoções)</th>
    <th style="width: 25%; text-align: center;">Parcelamentos Sem Juros Gerais<br>(MSI)</th>
  </tr>
  <tr>
  <td style="text-align: left;"><strong>Disponibilidade por país</strong></td>
  <td style="text-align: left;">
    <div style="padding-left: 28%;">
      <img src="/assets/Argentina.png" width="16px"/> &nbsp;Argentina<br>
      <img src="/assets/Colombia.png" width="16px"/> &nbsp;Colômbia<br>
      <img src="/assets/Mexico.png" width="16px"/> &nbsp;México<br>
      <img src="/assets/Peru.png" width="16px"/> &nbsp;Peru
    </div>
  </td>
  <td style="text-align: left;">
    <div style="padding-left: 28%;">
      <img src="/assets/Argentina.png" width="16px"/> &nbsp;Argentina<br>      
      <img src="/assets/Mexico.png" width="16px"/> &nbsp;México<br>      
    </div>
  </td>
</tr>
  <tr>
    <td style="text-align: left;"><strong>Aplicabilidade</strong></td>
    <td style="text-align: center;">Por BIN, emissor ou adquirente</td>
    <td style="text-align: center;">Por método de pagamento ou bandeira</td>
  </tr>
  <tr>
    <td style="text-align: left;"><strong>Condições</strong></td>
    <td style="text-align: center;">Taxa configurável por emissor</td>
    <td style="text-align: center;">Taxa única para todos os emissores</td>
  </tr>
  <tr>
    <td style="text-align: left;"><strong>Configuração</strong></td>
    <td style="text-align: center;">Por promoção</td>
    <td style="text-align: center;">Por conta</td>
  </tr>
  <tr>
    <td style="text-align: left;"><strong>Flexibilidade</strong></td>
    <td style="text-align: center;">Alta</td>
    <td style="text-align: center;">Baixa</td>
  </tr>
  <tr>
    <td style="text-align: left;"><strong>Opções adicionais</strong></td>
    <td style="text-align: center;">Múltiplas promoções,<br>upload de BINs, por conta, por dias, faixas horárias ou valores</td>
    <td style="text-align: center;">Não aplicável</td>
  </tr>
  <tr>
    <td style="text-align: left;"><strong>Exemplo</strong></td>
    <td style="text-align: center;">5% de juros para cartões Visa<br>do Banco ABC, em 6 parcelas</td>
    <td style="text-align: center;">6 meses sem juros<br>com todos os cartões</td>
  </tr>
</table>

{{% alert title="Nota" color="info"%}}

Para configurar Parcelamentos Sem Juros conforme os seus acordos com bancos emissores, entre em contato com seu representante comercial.

{{% /alert %}}

## O que é uma Promoção?

Na PayU, uma **promoção** não se refere a um desconto no preço do produto. Em vez disso, o termo descreve uma configuração especial de financiamento que permite Parcelamentos Sem Juros sob condições específicas.

Na <a href="https://developers.payulatam.com/latam/pt/docs/integrations/api-integration/pricing-api.html" target="_blank">API de Pricing</a>, essas promoções estão incluídas no array `promos` e correspondem aos **Parcelamentos Sem Juros Específicos**.

### Características de uma Promoção

Os Parcelamentos Sem Juros Específicos, promoções ou simplesmente _promos_, têm as seguintes características:

* Aplicam-se apenas a determinados emissores, BINs ou bancos.
* Possuem um período de validade definido.
* Podem exigir um valor mínimo de compra ou número mínimo de parcelas.
* São configurados no sistema da PayU com base em acordos comerciais específicos.

### Exemplo de uma Promoção

Um lojista pode oferecer 6 parcelas sem juros se o cliente usar um cartão Mastercard do Banco ABC. Mesmo que o preço do produto não mude, essa condição é tratada como uma **promoção técnica** na PayU.

## Como Funcionam os Parcelamentos Sem Juros na PayU

Para aplicar pagamentos parcelados sem juros em sua loja, siga estes passos:

1. Consulte as opções disponíveis na API de Precificação.
2. Identifique a promoção ou opção que se encaixa no seu modelo de negócio e exiba-a ao cliente no checkout.
3. Ao processar o pagamento, inclua o ID da promoção selecionada e o número de parcelas.

## MSI (Meses Sem Juros)

No México, os Parcelamentos Sem Juros Gerais são conhecidos como **Meses Sem Juros (MSI)**. Essa modalidade permite que os lojistas ofereçam planos de parcelamento fixo (3, 6, 9, 12 ou 18 meses) sem juros, sem a necessidade de referenciar um ID de promoção.

Cada plano MSI exige um valor mínimo de compra:

* 3 parcelas > $300 MXN  
* 6 parcelas > $600 MXN  
* 9 parcelas > $900 MXN  
* 12 parcelas > $1200 MXN  
* 18 parcelas > $1800 MXN

{{% alert title="Nota" color="info"%}}

Para ativar os planos MSI em sua conta, entre em contato com seu representante comercial.

{{% /alert %}}

## Próximos Passos

Integre esse recurso usando a [API de Pricing]({{< ref "Pricing-API" >}}). Para mais informações sobre a modalidade MSI, visite esta [seção específica]({{< ref "Pricing-API#msi-interest-free-months" >}}).
