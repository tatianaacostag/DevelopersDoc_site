---
title: "PrestaShop"
linkTitle: "PrestaShop"
date: 2025-03-10T10:30:35-05:00
description:
  Esta guía explica cómo integrar PayU con tu sitio web basado en PrestaShop.
weight: 9
tags: ["subtopic"]
---

PrestaShop es una plataforma de comercio electrónico de código abierto que permite a los negocios crear y personalizar tiendas en línea con total control sobre el diseño y la funcionalidad. Es autohospedada y altamente extensible a través de módulos y temas. Para más información, visita el <a href="https://prestashop.com" target="_blank">sitio web oficial de PrestaShop</a>.

## Requisitos Previos

Antes de integrar PayU con PrestaShop, asegúrate de contar con lo siguiente:

* Una <a href="https://developers.payulatam.com/latam/es/docs/getting-started/create-an-account.html" target="_blank">cuenta activa de PayU Latam</a>.
* Tu sitio web debe estar ejecutando PrestaShop en la versión 1.4 a 1.6.
* El plugin de PayU para PrestaShop, disponible para descarga <a href="https://developers.payulatam.com/latam/es/docs/tools/shopping-cart-plugins.html#plugin-files" target="_blank">aquí</a>.

{{% alert title="Importante" color="warning"%}}

Las versiones 1.7 y posteriores de PrestaShop no son compatibles con el plugin de PayU.

{{% /alert %}}

## Integración del plugin de PayU en los módulos de PrestaShop

Para utilizar los servicios de PayU en tu sitio PrestaShop, debes instalar el plugin de PayU como un módulo. Sigue estos pasos:

1. Inicia sesión en el panel de administración de PrestaShop.

2. Navega a **Modules and Services > Modules and Services**.

3. Haz clic en **Add a new module** en la esquina superior derecha.

4. Haz clic en **Choose a file**, selecciona el archivo ZIP del plugin de PayU para PrestaShop desde tu computadora y luego haz clic en **Upload this module**.

![PrintScreen](/assets/prestashop/prestashop1.png)

5. El módulo de PayU ahora aparecerá en la lista de módulos. Haz clic en **Install**.

6. En la lista de módulos, ubica el módulo de PayU y haz clic en **Configure**.

7. Completa los siguientes campos obligatorios:

| Campo | Descripción |
|---|---|
| Merchant ID | ID de comercio en PayU Latam. <a href="https://developers.payulatam.com/latam/es/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html" target="_blank">Ver mi Merchant ID</a>. |
| Account ID | ID de cuenta de PayU según tu país de operación. <a href="https://developers.payulatam.com/latam/es/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html" target="_blank">Ver mi Account ID</a>. |
| API Key | Clave única de tu comercio. <a href="https://developers.payulatam.com/latam/es/docs/integrations.html#api-key-and-api-login" target="_blank">Ver mi API Key</a>. |

{{% alert title="Nota" color="warning"%}}

Habilita el **Test Mode** para realizar transacciones con datos simulados.

{{% /alert %}}

8. Haz clic en **Save**.

Ahora, los servicios de PayU están integrados exitosamente en tu sitio PrestaShop.
