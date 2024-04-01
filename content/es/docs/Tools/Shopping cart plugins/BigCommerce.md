---
title: "BigCommerce"
linkTitle: "BigCommerce"
date: 2023-04-27T10:30:35-05:00
description:
  Esta guía describe los pasos para integrar PayU con tu sitio web de BigCommerce.
weight: 11
tags: ["subtopic"]
---

**Contenido**
- [Introducción](#introduction)
- [Requisitos previos](#prerequisites)
- [Instalación de la extensión](#installing-the-extension)
- [Uso de la extensión](#utilizing-the-extension)
    - [Configuración de métodos de pago](#payment-methods-configuration)
    - [Gestión de pedidos y reembolsos](#order-management-and-refunds)
- [Prueba de la integración](#testing-the-integration)
- [Soporte](#support)

## Introducción
BigCommerce es una plataforma de comercio digital que te permite crear rápidamente una tienda en línea equipada con funcionalidades listas para usar. Para más detalles, visita la [página oficial de BigCommerce](https://www.bigcommerce.com/press/).

## Requisitos previos
Para llevar a cabo la integración, necesitas:
* Una cuenta de PayU Latam
* Una cuenta de BigCommerce

## Instalación de la extensión
1. Dirígete al Marketplace de BigCommerce, haz clic en **Mis Aplicaciones**, ubica la extensión de PayU y haz clic en **Instalar**:

<img src="/assets/BigCommerce/Bigcommerce1.png" alt="PrintScreen" width="700">
<p></p>

2. Marca la casilla de verificación y haz clic en **Confirmar** para proceder con la instalación:

<img src="/assets/BigCommerce/Bigcommerce2.png" alt="PrintScreen" width="700">
<p></p>

3. Después de la instalación, la interfaz de la aplicación aparecerá de la siguiente manera:

<img src="/assets/BigCommerce/Bigcommerce3.png" alt="PrintScreen" width="700">
<br></br>

## Uso de la extensión
### Configuración de métodos de pago
Personaliza los métodos de pago mostrados en tu sitio web durante el proceso de pago. Consulta nuestros [métodos de pago disponibles]({{< ref "Select-your-payment-method.md" >}}).

1. Tras la instalación, selecciona **Habilitar PayU Latam** para integrar la aplicación con tu tienda BigCommerce.

<img src="/assets/BigCommerce/Bigcommerce4.png" alt="PrintScreen" width="700">
<p></p>

2. Personaliza el título para la opción de pago con tarjeta (por ejemplo, *Pagar con Tarjeta*). Este título quedará visible para los usuarios en la página de pago.

<img src="/assets/BigCommerce/Bigcommerce5.png" alt="PrintScreen" width="700">
<p></p>

3. Elige el formato de visualización para las opciones de pago con tarjeta disponibles durante el proceso de pago. Puedes elegir una de las siguientes opciones:

* Mostrar *Powered by PayU Latam* y logotipo en el formulario de pago.
* Mostrar logotipos de tarjetas de crédito en la página de pago.

<img src="/assets/BigCommerce/Bigcommerce6.png" alt="PrintScreen" width="700">

{{% alert title="Importante" color="warning"%}}
Para habilitar métodos de pago alternativos (efectivo y transferencias bancarias), selecciona **Activar Web Checkout (APM)**.
{{% /alert %}}

4. Agrega un proveedor para un país específico de PayU Latam, para hacerlo, haz clic en **Agregar Proveedor**. Puedes habilitar o deshabilitar cada proveedor utilizando la opción en la columna **Estado**, y puedes actualizar sus credenciales haciendo clic en el botón **Editar**.

<img src="/assets/BigCommerce/Bigcommerce7.png" alt="PrintScreen" width="700">
<p></p>

Adicionalmente, elige el modo **Prueba** o **En Producción** para cada proveedor en la **Configuración de Incorporación**.

<img src="/assets/BigCommerce/Bigcommerce8.png" alt="PrintScreen" width="700">
<p></p>

**Campos obligatorios para agregar un nuevo proveedor:**
| Parámetro | Descripción |
|---|---|
| Select Payu Latam country | Selecciona el país que deseas configurar |
| API Login | Usuario o Login que te proporciona PayU. [Cómo obtener el API Login de mi tienda](https://developers.payulatam.com/latam/es/docs/integrations.html#api-key-and-api-login) |
| API Key | Clave única del comercio. [Cómo obtener el API Key de mi tienda](https://developers.payulatam.com/latam/es/docs/integrations.html#api-key-and-api-login) |
| Public Key| Clave única del comercio. [Cómo obtener el Public Key de mi tienda](https://developers.payulatam.com/latam/es/docs/integrations.html#api-key-and-api-login) |
| Account ID |  ID de la cuenta de PayU para el país seleccionado.  |
| Merchant ID | ID de tu comercio en PayU Latam. |
<p></p>

5. Selecciona el flujo de transacción: 

* Para el flujo de un paso, selecciona **Capturar en pedido realizado**.
* Para el flujo en dos pasos, selecciona **Capturar en Envío**.

<img src="/assets/BigCommerce/Bigcommerce9.png" alt="PrintScreen" width="700">
<p></p>

Consulta el [documento de Flujo de Pagos](https://developers.payulatam.com/latam/en/docs/services/payments.html#payment-flows) para obtener más información sobre las opciones.

{{% alert title="Importante" color="warning"%}}
La opción de procesamiento en más de un paso solo se aplica a pagos con tarjeta (sujeto a [disponibilidad](https://developers.payulatam.com/latam/en/docs/services/payments.html#payment-flows) en cada país). Las transacciones con otros métodos de pago requieren autorización y captura en un solo paso.
{{% /alert %}}

{{% alert title="Nota" color="info"%}}
Las opciones multi-tienda estarán visibles debajo de la sección de opciones de pago:

<img src="/assets/BigCommerce/Bigcommerce10.png" alt="PrintScreen" width="700">
{{% /alert %}} 

### Gestión de pedidos y reembolsos

1. Para gestionar los pedidos, haz clic en el botón **Panel de Pedidos** en la esquina superior derecha.

<img src="/assets/BigCommerce/Bigcommerce11.png" alt="PrintScreen" width="700">
<p></p>

2. La tabla del panel de pedidos mostrará los estados de pago del pedido realizado.

<img src="/assets/BigCommerce/Bigcommerce12.png" alt="PrintScreen" width="500">
<p></p>

3. Para procesar un reembolso, haz clic en el botón **Reembolsar** en la columna de **Acciones**.

<img src="/assets/BigCommerce/Bigcommerce13.png" alt="PrintScreen" width="500">

{{% alert title="Importante" color="warning"%}}
* Los reembolsos solo están disponibles para transacciones con tarjeta.
* Consulta el [documento de reembolsos](https://developers.payulatam.com/latam/es/payu-module-documentation/payu-operations/refunds-mp.html) para obtener detalles para cada país.
{{% /alert %}}

## Prueba de la integración 
Antes de iniciar transacciones reales, se recomienda probar tu integración. Asegúrate de haber agregado un proveedor con credenciales de prueba en la Configuración de tu BigCommerce.

1. Inicia sesión en tu tienda, selecciona un producto para probar y procede al pago. Asegúrate de que el país de envío coincida con el destino:

<img src="/assets/BigCommerce/Bigcommerce14.png" alt="PrintScreen" width="400">
<p></p>

2. Selecciona el método de pago deseado:

* **A) Tarjeta:**  Ingresa los detalles de la tarjeta y haz clic en **Pagar con Tarjeta**.

<img src="/assets/BigCommerce/Bigcommerce15.png" alt="PrintScreen" width="400">

{{% alert title="Nota" color="info"%}}
Puedes personalizar el título de la opción de pago con tarjeta como se ve en [Configuración de métodos de pago](#payment_methods_configuration).
{{% /alert %}}

* **B) Pagar mediante Web Checkout:** Para otros métodos de pago, selecciona **Pagar mediante Web Checkout** y completa el pago.

<img src="/assets/BigCommerce/Bigcommerce16.png" alt="PrintScreen" width="400">
<p></p>

3. Tras la aprobación, verifica la compra en:

* Panel de Pedidos de BigCommerce: **PayU Latam > Panel de Pedidos**

<img src="/assets/BigCommerce/Bigcommerce11.png" alt="PrintScreen" width="700">
<p></p>

* Módulo administrativo de PayU: En el módulo de **Informe de Ventas**.

<img src="/assets/BigCommerce/Bigcommerce17.png" alt="PrintScreen" width="700">
<p></p>

## Soporte:
Para problemas técnicos o consultas sobre esta extensión, contacta a nuestro equipo de soporte en **tecnico.co@payu.com** o visita [nuestro sitio web](https://colombia.payu.com/contactanos/). Si optas por enviarnos un correo electrónico,  incluye los detalles de la extensión en el asunto y un resumen del problema en el cuerpo del mensaje.








