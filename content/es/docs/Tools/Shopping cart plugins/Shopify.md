---
title: "Shopify"
linkTitle: "Shopify"
date: 2021-05-25T10:30:35-05:00
description:
  Esta guía detalla los pasos para habilitar PayU en tu sitio web de Shopify. 
weight: 2
tags: ["subtopic"]
---

## Requisitos previos {#prerequisites}
* Una cuenta activa en PayU Latam.
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

<img src="/assets/Shopify/Shopify01ES.png" alt="PrintScreen" width="700">
<p></p>

2. Selecciona la tienda donde quieres instalar la aplicación, serás redirigido a la página de instalación, haz clic en **Instalar**.

<img src="/assets/Shopify/Shopify02ES.png" alt="PrintScreen" width="700">
<p></p>

<img src="/assets/Shopify/Shopify03ES.png" alt="PrintScreen" width="700">
<p></p>

3. Elige el entorno deseado para la instalación de la aplicación: ya sea el Entorno de Pruebas (Test Environment) o el Entorno de Producción (Production Environment). Luego, ingresa tu Merchant ID y Account ID, y selecciona **Save** para confirmar.

<img src="/assets/Shopify/Shopify04EN.png" alt="PrintScreen" width="500">
<p></p>

{{% alert title="Nota" color="info"%}}
* Encuentra tus credenciales del entorno de producción iniciando sesión en tu módulo administrativo de PayU, donde puedes localizar el Merchant ID y el Account ID en la esquina superior izquierda del módulo.

<img src="/assets/Shopify/Shopify05ES.png" alt="PrintScreen" width="240">
<p></p>

* Encuentra las credenciales del entorno de prueba <a href="https://developers.payulatam.com/latam/es/docs/getting-started/test-your-solution.html" target="_blank">aquí</a>.
* Puedes verificar o cambiar tus credenciales en la configuración de tu cuenta de Shopify.
{{% /alert %}}

{{% alert title="Importante" color="warning"%}}
Necesitas un Account ID por tienda en Shopify.
{{% /alert %}}

4. Serás redirigido a la página de Pagos, para habilitar la aplicación, haz clic en el botón **Activar** ubicado en la esquina inferior derecha.

<img src="/assets/Shopify/Shopify06ES.png" alt="PrintScreen" width="700">
<p></p>

{{% alert title="Importante" color="warning"%}}
* A modo informativo, verás distintos medios de pago. Para avanzar, debes seleccionar por lo menos uno de ellos, esto no modificará los medios de pago que tienes disponible en el Web Checkout de PayU.  
* Modo test: Dentro de la misma sección de _Pagos_, encontrarás la opción para utilizar el modo test que te permitirá hacer pruebas en ambiente Sandbox. 
* Recomendamos que utilices el entorno de prueba de manera controlada, preferiblemente durante las horas de menor actividad, ya que las transacciones procesadas en modo de prueba no generan pagos reales y el entorno de producción permanece desactivado. 
* Para deshabilitar el modo test, desmarque la caja.

<img src="/assets/Shopify/Shopify07ES.png" alt="PrintScreen" width="700">

{{% /alert %}}

5. Ingresa a tu <a href="https://developers.payulatam.com/latam/es/payu-module-documentation/getting-started/understanding-the-payu-module.html" target="_blank">Módulo de PayU</a>, ve a la sección de **Configuración** y haz clic en **Configuración técnica**. Activa la opción llamada **Controlar pagos dobles (Validar referencia única)** para evitar problemas al momento de procesar tus pagos.

<img src="/assets/Shopify/Shopify08ES.png" alt="PrintScreen" width="700">
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

