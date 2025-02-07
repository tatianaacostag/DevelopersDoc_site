---
title: "Cuotas y Promociones"
linkTitle: "Cuotas y Promociones"
date: 2021-03-26T14:02:05-05:00
description: >
    Con Cuotas y Promociones, puedes ofrecer a tus clientes la opción de comprar productos en múltiples cuotas con una tasa de interés reducida. Independientemente del número de cuotas que elija tu cliente, recibirás el monto total de la compra menos la comisión acordada con PayU. 
weight: 40
---

Este documento ofrece una descripción general de este servicio. Para detalles técnicos y de implementación, consulta la documentación de la <a href="https://developers.payulatam.com/latam/es/docs/integrations/api-integration/promotions-api.html" target="_blank">API de Promociones </a>.

La API de Promociones está disponible en los siguientes países:

<table style="width: 50%; min-width: 300px; border-collapse: collapse;">
    <tr>
        <th style="width: 40%; text-align: left;">País</th>
        <th style="width: 30%; text-align: center;">Promociones</th>
        <th style="width: 30%; text-align: center;">MSI (Meses sin Intereses)</th>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Argentina.png" width="25px"/> &nbsp;Argentina</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Colombia.png" width="25px"/> &nbsp;Colombia</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Mexico.png" width="25px"/> &nbsp;México</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Peru.png" width="25px"/> &nbsp;Perú</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
</table>

{{% alert title="Nota" color="info"%}}

Para configurar las Cuotas y Promociones según tus acuerdos con las entidades bancarias, contacta a tu representante de ventas.

{{% /alert %}}

## Cómo Funcionan las Cuotas y Promociones en PayU

Para usar las promociones, sigue estos pasos:
1. Consulta las promociones disponibles para tu tienda.
2. Selecciona la promoción que mejor se adapte a tus necesidades.
3. Envía la solicitud de pago, incluyendo el ID de la promoción seleccionada y el número de cuotas.

El siguiente diagrama ilustra el proceso de promociones:

![Flujo de Promociones](/assets/Promotions/PromotionsFlow_es.png)

## MSI (Meses sin Intereses)

MSI en México permite a los clientes pagar en un número específico de cuotas sin intereses (3, 6, 9, 12 o 18). A diferencia del modelo estándar de promociones, MSI no requiere la consulta de un ID de promoción.

Los montos mínimos de compra requeridos para MSI dependen del plan de cuotas seleccionado:

* 3 cuotas > $300 MXN
* 6 cuotas > $600 MXN
* 9 cuotas > $900 MXN
* 12 cuotas > $1200 MXN
* 18 cuotas > $1800 MXN

{{% alert title="Nota" color="info"%}}

Para habilitar MSI, contacta a tu representante de ventas.

{{% /alert %}}

## Próximos Pasos

Puedes integrar esta función utilizando la [API de Promociones]({{< ref "Promotions-API" >}}). Para detalles sobre la integración de MSI, consulta esta [sección]({{< ref "Promotions-API#msi" >}}).

