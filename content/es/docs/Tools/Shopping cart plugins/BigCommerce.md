---
title: "BigCommerce"
linkTitle: "BigCommerce"
date: 2023-04-27T10:30:35-05:00
description:
  Este artículo te muestra el procedimiento para habilitar PayU en tu sitio web BigCommerce.
weight: 11
tags: ["subtopic"]
---

BigCommerce es una plataforma de comercio digital que te permite crear rápidamente una tienda en línea con funcionalidades listas para usar. Para más información, echa un vistazo a la página oficial de BigCommerce: [Página oficial de BigCommerce](https://www.bigcommerce.com/press/).

## Requisitos previos
* Necesitas una cuenta activa en PayU Latam.
* Necesitas una cuenta con BigCommerce.



## Cómo instalar esta extensión
1. Instala la aplicación desde BigCommerce Marketplace haciendo clic en el botón de instalación.


![](/assets/BigCommerce/Imagen1.png)







2. Haz clic en la casilla de verificación y en el botón "Confirmar" para finalizar la instalación.


![](/assets/BigCommerce/Imagen2.png)







3. Una vez tengas la app instalada, verás la interfaz de la aplicación de la siguiente manera:


![](/assets/BigCommerce/Imagen3.png)







## Cómo usar esta extensión
### Configura los métodos de pago
Esta sección te explicará cómo configurar los métodos de pago que se mostrarán en el sitio web para el pago. [Consulta nuestros métodos de pago disponibles]({{< ref "Select-your-payment-method.md" >}}).



1. Después de instalar la aplicación selecciona **Habilitar PayU Latam** para permitir la app en la tienda BigCommerce.


![](/assets/BigCommerce/Imagen4.png)





![](/assets/BigCommerce/Imagen4B.png)







2. Selecciona un título personalizado para la opción de pago con tarjeta (por ejemplo, Pagar con tarjeta). Este título será visible en la página de pago para tus clientes.


![](/assets/BigCommerce/Imagen5.png)







3. Elige la forma en que deseas que se muestren las opciones de pago con tarjeta disponibles. Puedes elegir una de las siguientes opciones:

* Mostrar Powered by PayU Latam y logo en el formulario de pago
* Mostrar el logo de la tarjeta de crédito en la página de pago



![](/assets/BigCommerce/Imagen7.png)



{{% alert title="Important" color="warning"%}}
Si el comercio desea permitir métodos de pago alternativos (efectivo y transferencias bancarias), seleccione la opción "Activar Web Checkout (APM)".
{{% /alert %}}









4. Utiliza el botón "Add provider" para añadir la cuenta de procesamiento de un país específico de PayU Latam. Cada configuración puede ser habilitada/deshabilitada desde la interfaz de la app usando el botón de “Status” respectivo. También puedes hacer clic en "Editar" para actualizar las credenciales, y recuerda que en la configuración de tus cuentas podrás elegir si quieres usarlas en modo prueba o en ambiente productivo.


![](/assets/BigCommerce/Imagen8.png)


![](/assets/BigCommerce/Imagen9.png)









Para agregar una nueva configuración, especifica los siguientes campos obligatorios:
| Parámetro | Descripción |
|---|---|
| Selecciona el país de tu cuenta | Selecciona el país que deseas configurar |
| API Login | Usuario o Login que te provee PayU. [Cómo obtener el API Login de mi tienda](https://developers.payulatam.com/latam/en/docs/integrations.html#api-key-and-api-login) |
| API Key | Llave única del comercio. [Cómo obtener el API Key de mi tienda](https://developers.payulatam.com/latam/en/docs/integrations.html#api-key-and-api-login) |
| Public Key| Llave única del comercio. [Cómo obtener el Public Key de mi tienda](https://developers.payulatam.com/latam/en/docs/integrations.html#api-key-and-api-login) |
| Account ID | ID de la cuenta de PayU asociada al país que seleccionaste anteriormente.  |
| Merchant ID | ID de tu comercio en PayU Latam. |














5. Elige si tus transacciones de pago se ejecutarán en un flujo de uno o dos pasos: 

* Para un flujo de un paso, selecciona **Capture on order placed**.

* Para el flujo en dos pasos, selecciona **Capture on Shipment**.

![](/assets/BigCommerce/Imagen10.png)

Consulte el siguiente [enlace](https://developers.payulatam.com/latam/en/docs/services/payments.html#payment-flows) para obtener más información sobre los flujos de pago.


{{% alert title="Important" color="warning"%}}
La opción de procesar en más de un paso sólo se aplica a pagos con tarjeta (sujeto a [disponibilidad](https://developers.payulatam.com/latam/en/docs/services/payments.html#payment-flows) en cada país). Las transacciones con otros métodos de pago realizarán la autorización y la captura en un solo paso.
{{% /alert %}}

{{% alert title="Note" color="info"%}}
Las opciones multi-tienda estarán visibles debajo de la sección de opciones de pago.
![](/assets/BigCommerce/Imagen10B.png)
{{% /alert %}} 







### Gestiona tus pedidos

1. Para acceder al panel de pedidos, haz clic en el botón ‘Order Dashboard’.

![](/assets/BigCommerce/Imagen11.png)







2. La tabla del panel de pedidos mostrará los estados de pago del pedido realizado.

![](/assets/BigCommerce/Imagen12.png)







3. Para procesar un reembolso, haz clic en el botón ‘Refund’ en la tabla del panel de pedidos.

![](/assets/BigCommerce/Imagen13.png)

{{% alert title="Important" color="warning"%}}
* Los reembolsos sólo están disponibles para transacciones pagadas con tarjeta.
* Para saber más sobre las particularidades de los reembolsos en cada país donde PayU opera, haz clic [aquí](https://developers.payulatam.com/latam/en/payu-module-documentation/payu-operations/refunds-mp.html).
{{% /alert %}}







## Cómo probar la integración 
Cuando hayas terminado de configurar la app y lo descrito anteriormente, se recomienda probar la integración antes de empezar a recibir transacciones reales. Como requisito previo, asegúrate de añadir un proveedor con credenciales de prueba en la Configuración de BigCommerce.

1. Inicia sesión en tu tienda y selecciona el producto que deseas comprar para probarlo. En el momento de finalizar la compra, introduce los datos y ten en cuenta que el país seleccionado debe ser el país a donde se enviará el producto. Por ejemplo, si el envío es a Argentina, selecciona Argentina en el desplegable de opciones de país.


![](/assets/BigCommerce/Imagen14.png)







2. A continuación, podrás seleccionar el método de pago deseado.

**Selección de pago:**

*	**Tarjeta:** Especifica los datos de la tarjeta y, a continuación, haz clic en la opción ‘Pagar con tarjeta’.

![](/assets/BigCommerce/Imagen15.png)

{{% alert title="Note" color="info"%}}
Recuerda que puedes seleccionar un título personalizado para la opción de pago con tarjeta durante la configuración de PayU Latam en tu cuenta de BigCommerce (por ejemplo, puedes cambiar "Pay by card" por "Pagar").
{{% /alert %}} 

* **Pay by Web Checkout:** Para otros métodos de pago, selecciona el botón ‘Pay by Web Checkout’. Introduce los datos y confirma el pago.


![](/assets/BigCommerce/Imagen16.png)

![](/assets/BigCommerce/Imagen17.png)

![](/assets/BigCommerce/Imagen18.png)






3. Cuando la compra sea aprobada, puedes registrarla en:

* Order Dashboard de BigCommerce: **_PayU Latam > Order Dashboard_**

![](/assets/BigCommerce/Imagen6.png)

* Módulo administrativo de PayU: En el módulo de **_Reporte de Ventas_**.

![](/assets/BigCommerce/Imagen19.png)







## Opciones de soporte:
Si experimentas un problema técnico o tienes alguna pregunta sobre esta extensión, contacta a nuestro equipo de asistencia **tecnico.co@payu.com** o visita nuestro sitio web **https://colombia.payu.com/contactanos/**. Si optas por enviarnos un correo electrónico, facilítanos los detalles de la extensión que estás utilizando en el campo del asunto y un resumen del problema que estás experimentando en el cuerpo del mensaje.








