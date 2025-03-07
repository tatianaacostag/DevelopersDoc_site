---
title: "BigCommerce"
linkTitle: "BigCommerce"
date: 2023-04-27T10:30:35-05:00
description:
   Esta guía ofrece instrucciones detalladas para integrar PayU con tu tienda de BigCommerce, permitiendo soluciones de pago eficientes.
weight: 11
tags: ["subtopic"]
---

BigCommerce es una plataforma de comercio electrónico robusta diseñada para ayudarte a configurar y administrar una tienda en línea rápidamente, ofreciendo una variedad de funciones listas para usar para una experiencia sin interrupciones. Para más información, visita el <a href="https://www.bigcommerce.com/press" target="_blank">sitio web oficial de BigCommerce</a>.

## Requisitos Previos {#prerequisites}

Antes de comenzar la integración, asegúrate de tener lo siguiente:
* Una cuenta de PayU Latam
* Una cuenta de BigCommerce

## Instalación de la Extensión {#installing-the-extension}

1. Ve al Marketplace de BigCommerce, selecciona **My Apps**, localiza la extensión de PayU y haz clic en **Install**.

<img src="/assets/BigCommerce/Bigcommerce1.png" alt="PrintScreen" width="700">
<p></p>

2. Marca la casilla de verificación y haz clic en **Confirm** para continuar con la instalación.

<img src="/assets/BigCommerce/Bigcommerce2.png" alt="PrintScreen" width="700">
<p></p>

3.  Después de la instalación, la interfaz de la aplicación se verá de la siguiente manera.

<img src="/assets/BigCommerce/Bigcommerce3.png" alt="PrintScreen" width="700">

## Configuración de Métodos de Pago

Configura y personaliza los métodos de pago para tu página de pago. Consulta nuestros <a href="https://developers.payulatam.com/latam/es/docs/getting-started/select-your-payment-method.html" target="_blank">métodos de pago disponibles</a>.

1. Después de la instalación, activa el interruptor **Enable PayU Latam** para integrar la aplicación con tu tienda de BigCommerce.

<img src="/assets/BigCommerce/Bigcommerce4.png" alt="PrintScreen" width="700">
<p></p>

2. Personaliza el título para la opción de pago con tarjeta (por ejemplo, *Pagar con tarjeta*). Este título será visible para los usuarios en la página de pago.

<img src="/assets/BigCommerce/Bigcommerce5.png" alt="PrintScreen" width="700">
<p></p>

3. Elige el formato de visualización para las opciones de pago con tarjeta disponibles en el checkout:

   - Mostrar *Powered by PayU Latam* y el logo en el formulario de pago.
   - Mostrar los logos de tarjetas de crédito en la página de pago.

<img src="/assets/BigCommerce/Bigcommerce6.png" alt="PrintScreen" width="700">

{{% alert title="Importante" color="warning"%}}

Para habilitar métodos de pago alternativos (efectivo y transferencias bancarias), selecciona **Enable Web Checkout (APM)**.

{{% /alert %}}

4. Agrega un proveedor para un país específico de PayU Latam haciendo clic en **Add Provider**. Activa o desactiva cada proveedor con el botón en la columna **Status** y actualiza sus credenciales con el botón **Edit**.

<img src="/assets/BigCommerce/Bigcommerce7.png" alt="PrintScreen" width="700">
<p></p>

Además, elige el modo **Test** o **Live** para cada proveedor en **Onboard Setup**.

<img src="/assets/BigCommerce/Bigcommerce8.png" alt="PrintScreen" width="700">
<p></p>

**Campos Obligatorios para Agregar un Nuevo Proveedor:**
| Parámetro | Descripción |
|---|---|
| Select Payu Latam country | Elige el país que deseas configurar. |
| API Login | Usuario o login que PayU te proporciona. <a href="https://developers.payulatam.com/latam/es/docs/integrations.html#api-key-and-api-login" target="_blank">Cómo obtener mi API Login</a>. |
| API Key | Clave única que PayU asigna a tu tienda. <a href="https://developers.payulatam.com/latam/es/docs/integrations.html#api-key-and-api-login" target="_blank">Cómo obtener mi API Key</a>. |
| Public Key| Clave única que PayU asigna a tu tienda. <a href="https://developers.payulatam.com/latam/es/docs/integrations.html#api-key-and-api-login" target="_blank">Cómo obtener mi Public Key</a>. |
| Account ID |  ID de la cuenta de PayU para el país seleccionado.  |
| Merchant ID | ID de tu comercio en PayU Latam. |
<p></p>

5. Selecciona el flujo de transacción:
* Para habilitar el flujo de un paso, selecciona **Capture on Order Placed**.
* Para habilitar el flujo en dos pasos, selecciona **Capture on Shipment**.

<img src="/assets/BigCommerce/Bigcommerce9.png" alt="PrintScreen" width="700">
<p></p>

{{% alert title="Importante" color="warning"%}}

* El flujo de dos pasos se aplica solo a los pagos con tarjeta (sujeto a disponibilidad en cada país). Otros métodos de pago requieren autorización y captura en un solo paso. Consulta la <a href="https://developers.payulatam.com/latam/es/docs/services/payments.html#payment-flows" target="_blank">documentación de flujos de pago</a> para más detalles.
* Las opciones de múltiples tiendas aparecerán debajo de la sección de opciones de pago.
<img src="/assets/BigCommerce/Bigcommerce10.png" alt="PrintScreen" width="700">

{{% /alert %}}

### Gestión de Pedidos y Reembolsos

1. Para gestionar los pedidos, haz clic en el botón **Order Dashboard** en la esquina superior derecha.

<img src="/assets/BigCommerce/Bigcommerce11.png" alt="PrintScreen" width="700">
<p></p>

2. El Order Dashboard proporciona una vista general del estado de los pagos para todos los pedidos.

<img src="/assets/BigCommerce/Bigcommerce12.png" alt="PrintScreen" width="500">
<p></p>

3. Para procesar un reembolso, haz clic en el botón **Refund** en la columna de **Actions**.

<img src="/assets/BigCommerce/Bigcommerce13.png" alt="PrintScreen" width="500">

{{% alert title="Importante" color="warning"%}}

* Los reembolsos están disponibles solo para transacciones con tarjeta.
* Consulta el <a href="https://developers.payulatam.com/latam/es/payu-module-documentation/payu-operations/refunds-mp.html" target="_blank">documento de reembolsos</a> para más detalles específicos por país.

{{% /alert %}}

## Prueba de la Integración

Prueba tu integración con credenciales de prueba antes de iniciar transacciones en producción.

1. Inicia sesión en tu tienda, selecciona un producto para probar y procede al pago. Asegúrate de que el país de envío coincida con el destino:

<img src="/assets/BigCommerce/Bigcommerce14.png" alt="PrintScreen" width="400">
<p></p>

2. Selecciona el método de pago deseado:

- **Tarjeta:** Ingresa los datos de la tarjeta y haz clic en **Pay By Card**.

<img src="/assets/BigCommerce/Bigcommerce15.png" alt="PrintScreen" width="400">

{{% alert title="Nota" color="info"%}}

Puedes personalizar el título de la opción de pago con tarjeta como se explica en [Configuración de Métodos de Pago](#configuración-de-métodos-de-pago).

{{% /alert %}}

* **Pagar mediante Web Checkout:** Para otros métodos de pago, selecciona **Pay by Web Checkout** y completa el pago.

<img src="/assets/BigCommerce/Bigcommerce16.png" alt="PrintScreen" width="400">
<p></p>

3. Una vez aprobado, verifica la compra en:

- **BigCommerce Order Dashboard:** Ve a **PayU Latam > Order Dashboard**.

<img src="/assets/BigCommerce/Bigcommerce11.png" alt="PrintScreen" width="700">
<p></p>

- **Panel de Gestión de PayU:** Consulta el **módulo de Reporte de Ventas**.

<img src="/assets/BigCommerce/Bigcommerce17.png" alt="PrintScreen" width="700">
<p></p>

## Soporte

Para problemas técnicos o consultas sobre esta extensión, contacta a nuestro equipo de soporte en **tecnico.co@payu.com** o visita <a href="https://colombia.payu.com/contactanos/" target="_blank">nuestro sitio web</a>. Al contactar con soporte, incluye los detalles de la extensión en el asunto del correo y proporciona un resumen conciso del problema en el cuerpo del mensaje.
