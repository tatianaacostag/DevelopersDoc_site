---
title: "Shopify"
linkTitle: "Shopify"
date: 2021-05-25T10:30:35-05:00
description:
  Este artículo te muestra el procedimiento para habilitar PayU en tu sitio web de Shopify. 
weight: 10
tags: ["subtopic"]
---

## Prerrequisitos {#prerequisites}
* Necesitas una cuenta activa en PayU Latam.
* Necesitas un [plan](https://es.shopify.com/precios) válido en Shopify. El Checkout no está disponible para cuentas Trial.

## Gestión de ordenes en Shopify {#order-management-in-shopify}
Ten en cuenta lo siguiente cuando manejes órdenes en Shopify:
* **All orders**: son las ordenes con estado _**Aprobado**_ (con pago completo o parcial) y _**Pendiente**_ (siempre y cuando el pagador regrese a la tienda luego del procesamiento del pago en la pasarela).
* **Abandoned checkouts**: son procesos de pago que cumplen con uno de los siguientes criterios:
  1. No fueron completados.
  2. Fueron abandonados durante el proceso de pago.
  3. Transacciones con estado _**Rechazado**_.
  4. Transacciones con estado _**Pendiente**_ siempre y cuando el pagador no regrese a la tienda luego del procesamiento del pago en la pasarela:<br>
    <span style="color: #A6C307;font-weight: bold;">4.1.</span> Pagos en efectivo (siempre se obtiene el estado _**Pendiente**_ state).<br>
    <span style="color: #A6C307;font-weight: bold;">4.2.</span> Pagos con Tarjetas de Crédito que entren en validación por las reglas de protección antifraude.

{{% alert title="Nota" color="info"%}}
* Shopify **NO** realiza ningún tipo de reserva de inventarios para los casos anteriores.
* Shopify crea ordenes para estos casos cuando el estado final de la transacción es _**Aprobado**_.
{{% /alert %}}

## Configurar PayU como pasarela de pagos {#enable-payu-as-payment-gateway}
1. Ingresa a tu panel de control de _Shopify_. Haz clic en _**Configuración**_ y luego, selecciona _**Pagos**_.
 
![PrintScreen](/assets/Shopify/Shopify_01_es.png)

2. Ve a la sección _**Proveedores de pago**_ y haz clic en _**Seleccionar un proveedor**_.

![PrintScreen](/assets/Shopify/Shopify_02_es.png)

3. En la lista, localiza y haz clic en la pasarela de _PayU Latam_. 

![PrintScreen](/assets/Shopify/Shopify_03_es.png)

4. Ingresa la siguiente información de tu cuenta PayU:

![PrintScreen](/assets/Shopify/Shopify_04_es.png)

* **Account Id (1)**: Identificador de la cuenta PayU de acuerdo con el país en el que quieres vender.
* **Api Key (2)**: Llave única de tu comercio, puedes obtener esta información en tu Módulo PayU (**_Configuración_** > **_Configuración técnica_** > **_API Key_**).

![PrintScreen](/assets/Shopify/Shopify_05_es.png)

5. Por último, haz clic en el botón _**Activar PayU Latam**_ al final de la página.

![PrintScreen](/assets/Shopify/Shopify_06_es.png)

6. Abre el Módulo PayU module y vé a las opciones de _**Configuración**_ (**_Configuración_** > **_Configuración técnica_**). Luego, desactiva la validación de referencias únicas para todos los estados para evitar problemas al momento de procesar tus pagos.

![PrintScreen](/assets/Shopify/Shopify_07_es.png)

En este punto, tus clientes pueden hacer pagos utilizando el Checkout de PayU y podrán pagar utilizando medios de pago como efectivo, tarjetas de crédito y transferencias bancarias, dependiendo del país en el que estés vendiendo.

## Flujo de pago en Shopify {#payment-flow-in-shopify}
Cuando configuras PayU como pasarela de pago en la plataforma, tu cliente puede pagar de la siguiente forma.

1. Tu cliente selecciona el producto o servicio que quiere comprar y luego lo agrega a su carrito de compras.

![PrintScreen](/assets/Shopify/Shopify_08_es.png)

2. En el carrito de compras, tu cliente procede al pago.

![PrintScreen](/assets/Shopify/Shopify_09_es.png)

3. Una vez tu cliente ingresa su información, puede hacer clic en _**Finalizar el pedido**_ para ser redireccionado a PayU Latam para completar el pago.

![PrintScreen](/assets/Shopify/Shopify_10_es.png)

4. Cuando está en nuestra pasarela de pagos, puede ver la descripción de la venta y los medios de pago disponibles para tu país.

![PrintScreen](/assets/Shopify/Shopify_11_es.png)