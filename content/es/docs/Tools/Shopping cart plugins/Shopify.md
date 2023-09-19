---
title: "Shopify - PayU Latam v2"
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

## Gestión de órdenes en Shopify {#order-management-in-shopify}
Ten en cuenta lo siguiente cuando manejes órdenes en Shopify:
* **All orders**: son las órdenes con estado _**Aprobado**_ (con pago completo o parcial) y _**Pendiente**_ (siempre y cuando el pagador regrese a la tienda luego del procesamiento del pago en la pasarela).
* **Abandoned checkouts**: son procesos de pago que cumplen con uno de los siguientes criterios:
  1. No fueron completados.
  2. Fueron abandonados durante el proceso de pago.
  3. Transacciones con estado _**Rechazado**_.
  4. Transacciones con estado _**Pendiente**_ siempre y cuando el pagador no regrese a la tienda luego del procesamiento del pago en la pasarela:<br>
    <span style="color: #A6C307;font-weight: bold;">4.1.</span> Pagos en efectivo (siempre se obtiene el estado _**Pendiente**_).<br>
    <span style="color: #A6C307;font-weight: bold;">4.2.</span> Pagos con Tarjetas de Crédito que entren en validación por las reglas de protección antifraude.

{{% alert title="Nota" color="info"%}}
* Shopify **NO** realiza ningún tipo de reserva de inventarios para los casos anteriores.
* Shopify crea órdenes para estos casos cuando el estado final de la transacción es _**Aprobado**_.
{{% /alert %}}

## Configurar PayU como pasarela de pagos {#enable-payu-as-payment-gateway}

1. Inicia sesión en tu cuenta de Shopify y descarga la app de PayU Latam v2 del app store haciendo clic [aquí](https://apps.shopify.com/payu-latam-v2?locale=es) y seleccionando “Agregar app”.


![](/assets/ShopifyReverseIntegration/imagen1.png)




2. Selecciona la tienda en la cual quieres instalar la app de las opciones que aparecen en pantalla y serás redireccionado a otra página en donde debes hacer clic en “Install app”.


![](/assets/ShopifyReverseIntegration/imagen2.png)




3. Ingresa las credenciales de tu tienda para el ambiente de test y de producción (Merchand Id y Account Id).


![](/assets/ShopifyReverseIntegration/imagen3.png)


{{% alert title="Nota" color="info"%}}
* Puedes encontrar las credenciales para el ambiente de test [aquí](https://developers.payulatam.com/latam/es/docs/getting-started/test-your-solution.html)
* Para encontrar las credenciales para el ambiente de producción, haz clic [aquí](https://developers.payulatam.com/latam/es/docs/integrations.html#api-key-and-api-login) y sigue los pasos indicados.
* Recuerda que posteriormente puedes cambiar o consultar las credenciales que ingresaste desde tu admin de Shopify.   
{{% /alert %}}


{{% alert title="Importante" color="warning"%}}
Para cada tienda que tengas en Shopify, debes tener un account ID diferente en PayU.
{{% /alert %}}




4. Serás dirigido a la sección llamada “Payments”. Allí, selecciona “Activate PayU Latam v2” en la esquina inferior derecha.


![](/assets/ShopifyReverseIntegration/imagen4.png)


{{% alert title="Importante" color="warning"%}}
* A modo informativo, verás distintos medios de pago. Para avanzar, debes seleccionar por lo menos uno de ellos, pero recuerda que esto no modificará los medios de pago que tienes disponible en el Web Checkout de PayU.  
* La casilla “Enable test mode” indica si se usarán las credenciales del ambiente de producción o del ambiente de prueba.  
Ejemplo: Si deseas utilizar el ambiente de pruebas en vez del ambiente de producción, debes hacer clic en la casilla “Enable test mode”. 
{{% /alert %}}




5. Ingresa a tu Merchant Panel, ve a la sección de Configuración y haz clic en “Configuración técnica”. Activa la opción llamada “Controlar pagos dobles (Validar referencia única)” para evitar problemas al momento de procesar tus pagos.


![](/assets/ShopifyReverseIntegration/imagen6.png)




6. A partir de este momento, tienes a PayU instalado como procesador de pagos y puedes comenzar tus ventas. Tus clientes pueden hacer compras utilizando el Web Checkout de PayU a través de métodos de pago como efectivo, tarjetas de crédito y transferencias bancarias (dependiendo del país en el que estés vendiendo).


## Flujo de pago en Shopify {#payment-flow-in-shopify}
Cuando configuras PayU como pasarela de pago en la plataforma, tu cliente puede hacer compras de la siguiente forma:

1. Tu cliente selecciona el producto o servicio que quiere comprar y luego lo agrega a su carrito de compras.

![PrintScreen](/assets/Shopify/Shopify_08_es.png)

2. En el carrito de compras, tu cliente procede al pago.

![PrintScreen](/assets/Shopify/Shopify_09_es.png)

3. Una vez tu cliente ingresa su información, puede hacer clic en _**Finalizar el pedido**_ para ser redireccionado a PayU Latam para completar el pago.

![PrintScreen](/assets/Shopify/Shopify_10_es.png)

4. Cuando está en nuestra pasarela de pagos, puede ver la descripción de la venta y los métodos de pago disponibles para tu país.

![PrintScreen](/assets/Shopify/Shopify_11_es.png)

{{% alert title="Nota" color="info"%}}
Recuerda que si requieres realizar un reembolso total o parcial, podrás gestionarlo directamente desde el admin de tu tienda en Shopify. Para más información, haz clic [aquí](https://help.shopify.com/en/manual/orders/refund-cancel-order#refunding-an-order).
{{% /alert %}}

