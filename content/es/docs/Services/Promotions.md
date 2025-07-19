---
title: "Cuotas sin Intereses"
linkTitle: "Cuotas sin Intereses"
date: 2025-06-29T14:02:05-05:00
description: >
    Con Cuotas sin Intereses y Meses sin Intereses puedes ofrecer a tus clientes la posibilidad de comprar productos en pagos diferidos con una tasa de interés reducida o nula. Sin importar la cantidad de cuotas que elija tu cliente, recibirás el valor total de la compra, menos la comisión acordada con PayU. 
weight: 40
---

Este documento ofrece una descripción general de este servicio. Para detalles técnicos y de implementación, consulta la documentación de la <a href="https://developers.payulatam.com/latam/es/docs/integrations/api-integration/promotions-api.html" target="_blank">API de Pricing</a>.

## Modalidades de Cuotas sin Intereses

PayU ofrece dos modalidades de Cuotas sin Intereses para que los comercios puedan brindar opciones de financiamiento sin intereses adicionales para el comprador. Cada modalidad se diferencia por su nivel de configuración, alcance y flexibilidad:

* **Cuotas sin Intereses (Específicas):** Se configuran mediante promociones dirigidas a BINs, emisores o adquirentes particulares. Esta modalidad permite una personalización más granular y está disponible en Argentina, Colombia, México y Perú.

* **Cuotas sin Intereses (Generales):** Conocidas como **Meses sin Intereses (MSI)** en México, se aplican de forma global a todos los emisores o franquicias de un método de pago. Esta opción ofrece una configuración más simple y está disponible únicamente en Argentina y México.

La tabla a continuación compara las principales características de ambas modalidades:

<table style="width: 75%; min-width: 300px; border-collapse: collapse;">
  <tr>
    <th style="width: 10%; text-align: left;"></th>
    <th style="width: 25%; text-align: center;">Cuotas sin Intereses<br>(Específicas)</th>
    <th style="width: 25%; text-align: center;">Cuotas sin Intereses<br>(Generales o MSI)</th>
  </tr>
  <tr>
  <td style="text-align: left;"><strong>Disponibilidad por país</strong></td>
  <td style="text-align: left;">
    <div style="padding-left: 28%;">
      <img src="/assets/Argentina.png" width="16px"/> &nbsp;Argentina<br>
      <img src="/assets/Colombia.png" width="16px"/> &nbsp;Colombia<br>
      <img src="/assets/Mexico.png" width="16px"/> &nbsp;México<br>
      <img src="/assets/Peru.png" width="16px"/> &nbsp;Perú
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
    <td style="text-align: left;"><strong>Aplicabilidad</strong></td>
    <td style="text-align: center;">Por BIN, emisor o adquirente</td>
    <td style="text-align: center;">Por método de pago o franquicia</td>
  </tr>
  <tr>
    <td style="text-align: left;"><strong>Condiciones</strong></td>
    <td style="text-align: center;">Tasa configurable por emisor</td>
    <td style="text-align: center;">Tasa única para todos los emisores</td>
  </tr>
  <tr>
    <td style="text-align: left;"><strong>Configuración</strong></td>
    <td style="text-align: center;">Por promoción</td>
    <td style="text-align: center;">Por cuenta</td>
  </tr>
  <tr>
    <td style="text-align: left;"><strong>Flexibilidad</strong></td>
    <td style="text-align: center;">Alta</td>
    <td style="text-align: center;">Baja</td>
  </tr>
  <tr>
    <td style="text-align: left;"><strong>Opciones adicionales</strong></td>
    <td style="text-align: center;">Múltiples promociones, <br>carga de bienes, carga por cuenta</td>
    <td style="text-align: center;">No aplican</td>
  </tr>
  <tr>
    <td style="text-align: left;"><strong>Ejemplo típico</strong></td>
    <td style="text-align: center;">5% de interés para tarjetas<br>Visa del Banco ABC, en 6 cuotas</td>
    <td style="text-align: center;">6 meses sin intereses<br>con todas las tarjetas</td>
  </tr>
</table>

{{% alert title="Nota" color="info"%}}

Para configurar las Cuotas sin Intereses según tus acuerdos con los bancos emisores, contacta a tu representante de ventas.

{{% /alert %}}

## ¿Qué es una Promoción?

En PayU, una **promoción** no se refiere a un descuento sobre el precio de un producto. En cambio, el término describe una configuración especial de financiamiento que permite ofrecer Cuotas sin Intereses bajo ciertas condiciones específicas.

En la API de Pricing, estas promociones se presentan dentro del objeto `promos` y corresponden a las **Cuotas sin Intereses Específicas**.

### Características de una Promoción

Las Cuotas sin Intereses Específicas, promociones o simplemente _promos_ cumplen las siguientes características:

* Aplican únicamente a ciertos emisores, BINs o bancos.
* Tienen un periodo de vigencia definido.
* Pueden requerir un monto mínimo de compra o un número mínimo de cuotas.
* Se configura en el sistema de PayU según acuerdos comerciales específicos.

### Ejemplo de una Promoción

Un comercio puede ofrecer 6 cuotas sin intereses si el cliente utiliza una tarjeta Mastercard del Banco ABC. Aunque el precio del producto no cambia, esta condición se gestiona como una **promoción** técnica en PayU.

## Cómo Funcionan las Cuotas sin Intereses en PayU

Para aplicar pagos diferidos sin intereses en tu tienda, sigue estos pasos:

1. Consulta las opciones disponibles en la API de Pricing.
2. Identifica la promoción o modalidad que se ajuste a tu modelo de negocio.
3. Al procesar el pago, incluye el ID de la promoción seleccionada y el número de cuotas.

## MSI (Meses sin Intereses)

En México, las Cuotas sin Intereses Generales se conocen comúnmente como **Meses sin Intereses (MSI)**. Esta modalidad permite ofrecer planes de pago fijos (3, 6, 9, 12 o 18 meses) sin intereses, sin necesidad de consultar el ID de una promoción.

Cada plan de MSI requiere un monto mínimo de compra:

* 3 cuotas > $300 MXN
* 6 cuotas > $600 MXN
* 9 cuotas > $900 MXN
* 12 cuotas > $1200 MXN
* 18 cuotas > $1800 MXN

{{% alert title="Nota" color="info"%}}

Para habilitar los planes MSI en tu cuenta, contacta a tu representante de ventas.

{{% /alert %}}

## Próximos Pasos

Integra esta funcionalidad utilizando la [API de Pricing]({{< ref "Promotions-API" >}}). Para más información sobre la modalidad MSI, visita esta [sección específica]({{< ref "Promotions-API#msi" >}}).
