---
title: "Parcelas e promoções - Argentina e México"
linkTitle: "Parcelas e promoções - Argentina e México"
date: 2021-03-26T14:02:05-05:00
description: >
    O recurso de promoções permite que você consulte as promoções válidas, seus custos associados, características e outras informações relevantes disponíveis para seus clientes. A API de promoções está disponível somente na Argentina e no México.
weight: 50
---

## O que são Parcelas e Promoções {#what-are-installments-and-promotions}
Com Parcelas e Promoções, você pode oferecer ao seu cliente a possibilidade de adquirir seus produtos pagando um determinado número de parcelas com uma taxa de juros reduzida. Seja qual for a quantidade de parcelas selecionadas pelo seu cliente, você receberá o valor total da compra, descontada a comissão determinada com o PayU.

Para configurar Parcelas e Promoções com base nos contratos que você possui com entidades bancárias, entre em contato com seu representante de vendas.

{{% alert title="Observação" color="info"%}}
No México, você pode usar [Meses sem juros (MSI - Meses sin intereses)]({{< ref"Promotions.mdl#months-without-interests-msi---meses-sin-intereses" >}})
{{% /alert %}}

## Como funciona Parcelas e Promoções no PayU {#how-does-installments-and-promotions-works-in-payu}
Para usar as promoções, é necessário primeiro consultar as promoções disponíveis para a sua loja. Em seguida, selecione a promoção que mais se adapta às suas necessidades. Por fim, envie a solicitação de pagamento juntamente com o ID da promoção selecionada e o número de parcelas.

A sequência de eventos a seguir explica melhor o fluxo de promoções.

![Promotions Flow](/assets/Promotions/PromotionsFlow_pt.png)

## Meses sem juros (MSI - Meses sin intereses) {#months-without-interests-msi---meses-sin-intereses}
Meses sem juros (conhecido no México como _Meses sin intereses_) permite oferecer aos seus clientes a possibilidade de pagar em um determinado número de parcelas sem juros (3, 6, 9, 12 ou 18). Ao contrário do modelo de promoções, ao usar o MSI não é necessário consultar o ID da promoção.

Para solicitar o MSI, entre em contato com seu representante de vendas.

{{% alert title="Observação" color="info"%}}
Os valores mínimos para MSI dependem do número de parcelas selecionadas:
* 3 > $300 MXN
* 6 > $600 MXN
* 9 > $900 MXN
* 12 > $1200 MXN
* 18 > $1800 MXN
{{% /alert %}}

## O que acontece agora? {#whats-next}
A integração com este recurso pode ser realizada usando o [API de promoções]({{< ref "Promotions-API" >}}). Para saber como se integrar com o MSI, consulte esta [seção]({{< ref "Promotions-API#msi" >}}).