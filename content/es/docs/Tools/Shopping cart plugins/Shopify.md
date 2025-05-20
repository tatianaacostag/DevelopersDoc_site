---
title: "Shopify"
linkTitle: "Shopify"
date: 2021-05-25T10:30:35-05:00
description:
  Esta guía detalla los pasos para habilitar PayU en tu sitio web de Shopify. 
weight: 2
tags: ["subtopic"]
---

Shopify es una plataforma de comercio que te permite crear y administrar fácilmente tu tienda en línea con potentes herramientas integradas. Para más información, visita el sitio web oficial de <a href="https://www.shopify.com" target="_blank">Shopify</a>.

## Requisitos previos {#prerequisites}

* Una <a href="https://developers.payulatam.com/latam/es/docs/getting-started/create-an-account.html" target="_blank">cuenta activa de PayU Latam</a>.
* Un plan válido de Shopify. Ten en cuenta que la funcionalidad de Checkout no está disponible en los planes de prueba. Puedes explorar los planes y precios de Shopify <a href="https://www.shopify.com/co/precios" target="_blank">aquí</a>.

## Gestión de órdenes en Shopify {#order-management-in-shopify}

Ten en cuenta las siguientes disposiciones al gestionar órdenes en Shopify:
* **All orders (Todas las órdenes):** Incluye órdenes con los siguientes 2 estados:
    * **Approved (Aprobadas):** Órdenes que están pagadas en su totalidad o parcialmente.
    * **Pending (Pendientes):** Órdenes en espera de completarse cuando el cliente regresa a la tienda después de procesar un pago a través de la pasarela.
* **Abandoned checkouts (Procesos de pago abandonados)**: Aplica a procesos que:
  1. Quedaron incompletos ya que el usuario no pudo completar el pago o abandonó el sitio de compras. 
  2. Están marcados como _Rechazados_.
  3. Permanecen en estado _Pendiente_ sin que el cliente regrese al sitio de compras después del procesamiento del pago a través de la pasarela, esto incluye:<br>
    <span style="color: #A6C307;font-weight: bold;">3.1.</span> Pagos en efectivo.<br>
    <span style="color: #A6C307;font-weight: bold;">3.2.</span> Pagos con tarjetas de crédito que entren en validación por las reglas de protección antifraude.

{{% alert title="Nota" color="info"%}}

* Shopify **NO** reserva inventario para ninguno de los escenarios anteriores. 
* Para los procesos considerados como _abandoned checkout_, el sistema solo genera órdenes una vez que la transacción alcanza un estado _Aprobado_.

{{% /alert %}}

## Configurar PayU como pasarela de pagos {#setting-up-payu-as-payment-gateway}

1. Inicia sesión en tu cuenta de Shopify y descarga la app de PayU Latam v2 del app store haciendo clic <a href="https://apps.shopify.com/payu-latam-v2?locale=es" target="_blank">aquí</a> y seleccionando **Instalar**.

<img src="/assets/Shopify/Shopify01ES.png" alt="PrintScreen" width="550">
<p></p>

2. Selecciona la tienda donde quieres instalar la aplicación, serás redirigido a la página de instalación, haz clic en **Instalar**.

<img src="/assets/Shopify/Shopify02ES.png" alt="PrintScreen" width="550">
<p></p>

<img src="/assets/Shopify/Shopify03ES.png" alt="PrintScreen" width="550">
<p></p>

3. Elige el entorno para la instalación de la aplicación — Pruebas o Producción — según el uso que le vayas a dar:

* Usa el **Entorno de Pruebas (Test Environment)** si vas a realizar transacciones de prueba con credenciales de sandbox.
* Usa el **Entorno de Producción (Production Environment)** solo si estás listo para procesar pagos reales con credenciales activas.

{{% alert title="Importante" color="warning"%}}

* Asegúrate de no usar credenciales de prueba en el entorno de producción, ni viceversa. Esto puede causar errores o transacciones fallidas.  
* Encuentra tus credenciales del entorno de producción iniciando sesión en el <a href="https://developers.payulatam.com/latam/es/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html#merchant-and-account-ids" target="_blank">Panel de Gestión de PayU</a>, donde podrás encontrar el **Merchant ID** y el **Account ID**.  
* Encuentra las credenciales del entorno de prueba <a href="https://developers.payulatam.com/latam/es/docs/getting-started/test-your-solution.html" target="_blank">aquí</a>.  
* También puedes revisar o cambiar tus credenciales en la configuración de tu cuenta de Shopify.  
* Necesitas un Account ID por cada tienda en Shopify.

{{% /alert %}}

Después de seleccionar el entorno correcto, ingresa tu **Merchant ID** y **Account ID**, y haz clic en **Guardar** para confirmar.

<img src="/assets/Shopify/Shopify04EN.png" alt="PrintScreen" width="450">
<p></p>

4. Serás redirigido a la página de Pagos, para habilitar la aplicación, haz clic en el botón **Activar** ubicado en la esquina inferior derecha.

<img src="/assets/Shopify/Shopify06ES.png" alt="PrintScreen" width="600">
<p></p>

{{% alert title="Importante" color="warning"%}}
* A modo informativo, verás distintos medios de pago. Para avanzar, debes seleccionar por lo menos uno de ellos, esto no modificará los medios de pago que tienes disponible en el Web Checkout de PayU.  
* Modo test: Dentro de la misma sección de _Pagos_, encontrarás la opción para utilizar el modo test que te permitirá hacer pruebas en ambiente Sandbox. 
* Recomendamos que utilices el entorno de prueba de manera controlada, preferiblemente durante las horas de menor actividad, ya que las transacciones procesadas en modo de prueba no generan pagos reales y el entorno de producción permanece desactivado. 
* Para deshabilitar el modo test, desmarque la caja.

<img src="/assets/Shopify/Shopify07ES.png" alt="PrintScreen" width="600">

{{% /alert %}}

5. Ingresa a tu <a href="https://developers.payulatam.com/latam/es/payu-module-documentation/getting-started/understanding-the-payu-module.html" target="_blank">Panel de Gestión de PayU</a>, ve a la sección de **Configuración** y haz clic en **Configuración técnica**. Activa la opción llamada **Controlar pagos dobles (Validar referencia única)** para evitar problemas al momento de procesar tus pagos.

<img src="/assets/Shopify/Shopify08ES.png" alt="PrintScreen" width="600">
<p></p>

6. A partir de ahora, PayU está configurado como tu procesador de pagos, lo que te permite iniciar tus ventas. Con el Web Checkout de PayU, tus clientes pueden realizar compras utilizando diversos métodos de pago, como efectivo, tarjetas de crédito y transferencias bancarias, adaptados al país en el que realizas negocios.

## Flujo de pago en Shopify {#payment-flow-in-shopify}
Cuando configuras PayU como pasarela de pago en la plataforma, tu cliente puede hacer compras de la siguiente forma:

1. Tu cliente selecciona el producto o servicio que quiere comprar y luego lo agrega a su carrito de compras.

![PrintScreen](/assets/Shopify/Shopify_08_es.png)

2. En el carrito de compras, tu cliente procede al pago.

![PrintScreen](/assets/Shopify/Shopify_09_es.png)

3. Después de proporcionar su información, tu cliente hace clic en _**Finalizar el pedido**_ para ser redirigido a PayU Latam para completar el pago.

![PrintScreen](/assets/Shopify/Shopify_10_es.png)

4. Cuando esté en nuestra pasarela de pagos, tu cliente puede ver la descripción de la venta y los métodos de pago disponibles para tu país.

![PrintScreen](/assets/Shopify/Shopify_11_es.png)

{{% alert title="Nota" color="info"%}}
Recuerda que si requieres realizar un reembolso total o parcial, podrás gestionarlo directamente desde el admin de tu tienda en Shopify. Para más información, haz clic <a href="https://help.shopify.com/es/manual/orders/cancel-delete-order" target="_blank">aquí</a>.
{{% /alert %}}
