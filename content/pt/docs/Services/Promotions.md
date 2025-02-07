---
title: "Parcelamentos e Promoções"
linkTitle: "Parcelamentos e Promoções"
date: 2021-03-26T14:02:05-05:00
description: >
    Com Parcelamentos e Promoções, você pode oferecer aos seus clientes a opção de comprar produtos em várias parcelas com uma taxa de juros reduzida. Independentemente do número de parcelas escolhido pelo seu cliente, você receberá o valor total da compra, menos a taxa de comissão acordada com a PayU.
weight: 40
---

Este documento fornece uma visão geral deste serviço. Para detalhes técnicos e de implementação, consulte a documentação da <a href="https://developers.payulatam.com/latam/en/docs/integrations/api-integration/promotions-api.html" target="_blank">API de Promoções</a>.

A API de Promoções está disponível nos seguintes países:

<table style="width: 50%; min-width: 300px; border-collapse: collapse;">
    <tr>
        <th style="width: 40%; text-align: left;">País</th>
        <th style="width: 30%; text-align: center;">Promoções</th>
        <th style="width: 30%; text-align: center;">Meses Sem Juros (MSI)</th>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Argentina.png" width="25px"/> &nbsp;Argentina</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Colombia.png" width="25px"/> &nbsp;Colômbia</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Mexico.png" width="25px"/> &nbsp;México</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Peru.png" width="25px"/> &nbsp;Peru</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
</table>

{{% alert title="Observação" color="info"%}}

Para configurar Parcelamentos e Promoções com base nos seus acordos com as entidades bancárias, entre em contato com seu representante de vendas.

{{% /alert %}}

## Como Funcionam os Parcelamentos e Promoções na PayU

Para usar as promoções, siga estes passos:
1. Consulte as promoções disponíveis para sua loja.
2. Selecione a promoção que melhor se adapta às suas necessidades.
3. Envie a solicitação de pagamento, incluindo o ID da promoção selecionada e o número de parcelas.

O diagrama a seguir ilustra o processo de promoções:

![Fluxo de Promoções](/assets/Promotions/PromotionsFlow_pt.png)

## Meses Sem Juros (MSI - Meses sin Intereses)

O MSI no México permite que os clientes paguem em um número específico de parcelas sem juros (3, 6, 9, 12 ou 18). Ao contrário do modelo de promoções padrão, o MSI não exige a consulta de um ID de promoção.

Os valores mínimos de compra exigidos para o MSI dependem do plano de parcelamento selecionado:

* 3 parcelas > $300 MXN
* 6 parcelas > $600 MXN
* 9 parcelas > $900 MXN
* 12 parcelas > $1200 MXN
* 18 parcelas > $1800 MXN

{{% alert title="Observação" color="info"%}}

Para habilitar o MSI, entre em contato com seu representante de vendas.

{{% /alert %}}

## Próximos Passos

Integre este recurso usando a [API de Promoções]({{< ref "Promotions-API" >}}). Para detalhes de integração do MSI, consulte esta [seção]({{< ref "Promotions-API#msi" >}}).