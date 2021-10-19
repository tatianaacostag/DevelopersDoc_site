---
title: "Cupones de pago"
linkTitle: "Cupones de pago"
date: 2021-04-07T09:27:50-05:00
Description: >
  A través del módulo de _Cobros en efectivo_, puedes generar cupones de pago con la información necesaria para permitirle a tus clientes pagar cuantas veces lo necesiten en los puntos de pago disponibles.
weight: 70
---

Esta solución es útil para negocios que reciben pagos de forma regular como membresías, cursos, ventas por catálogo o por suscripción y más.

Puedes recibir pagos sin tener conocimientos técnicos. Solo necesitas enviar un correo electrónico donde tu cliente puede descargar el cupon y realizar el pago respectivo.

{{% alert title="Nota" color="info"%}}

Los cupones de pago están disponibles para Argentina utilizando _**RAPIPAGO**_ y _**PAGOFACIL**_, y para Colombia utilizando _**BALOTO**_ y _**EFECTY**_.

{{% /alert %}}  

## ¿Cómo funcionan los cupones de pago? {#how-payment-coupons-work}
Los cupones de pago siguen un flujo simple que le permite a tus clientes realizar pagos regulares en efectivo las veces que lo requieran:

1. **Configura el cupón de Pago a través del Módulo PayU**.<br>Solo necesitas ingresar cuántos pagos por cliente quieres recibir, decidir si el monto a pagar es fijo o si lo deciden tus clientes, decidir la fecha límite de pago y la referencia de pago.

2. **Decide el envío del cupón**<br>Decide si quieres entregar los cupones a través de correo electrónico, generando un PDF por referencias de pago o tarjetas de cobranza (Solo disponible para Argentina). 

3. **Utiliza el cupón de pago**<br>Cuando tus clientes reciban el cupón, pueden realizar pagos en cualquiera de las oficinas disponibles en su país.<br>Cada vez que un cliente paga utilizando el cupón, recibes un mensaje de confirmación y el monto del pago<sup>*</sup> es transferido a tu cuenta PayU, donde puedes transferirlo a tu cuenta bancaria.

<sup>*</sup>_El valor transferido corresponde a la cantidad pagada por tu cliente menos la tarifa de PayU._

## Crear cupones de pago {#creating-payment-coupons}
De acuerdo con tus necesidades, puedes configurar las opciones para recibir pagos utilizando cupones. Sigue este procedimiento para crear cupones de pago y entregarselos a tus clientes.

1. Ingresa a [PayU.com](payu.com) y haz clic en la opción para iniciar sesión que se encuentra en la parte superior de la página. O si lo prefieres, puedes ir directamente a https://merchants.payulatam.com/.

2. Expande la opción **Cobra con PayU** y luego, selecciona **Cobros en efectivo**.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_es.png)

3. Configura la siguiente información:

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_01_es.png)

* **¿Cuántos pagos esperas recibir por cada cliente?**: selecciona cuántas veces un cliente puede utilizar el cupón. Selecciona _Únicos_ si quieres permitir que tus clientes paguen una sola vez. Si no, selecciona _Múltiples_ para varios pagos mientras el cupón esté disponible. El valor predeterminado es _Múltiples_.

* **¿Cobrarás un monto específico?**: selecciona el monto del cupón de pago. Si seleccionas _No_, tu cliente decide el valor a pagar en la oficina de pago. El valor predeterminado es _No_.

* **¿Tiene límite de pago?**: decide si el cupón de pago expira en una fecha determinada. La fecha seleccionada es fija, no se soporta ingresar un día específico del mes u otra configuración personalizada. Si seleccionas _No_, el cupón no tendrá recha de expiración. El valor predeterminado es _No_.

* **¿Deseas definir la referencia de pago?**: si seleccionas _Sí_ necesitas ingresar la referencia de pago del cupón. Si no, PayU define y asigna una referencia automática. El valor predeterminado es _No_. 

## Compartir el cupón de pago {#sharing-the-payment-coupon}
Luego de configurar los cupones de pago, decide cómo deseas enviarlos a tus clientes.<br>Tienes disponibles las siguientes opciones:

### Enviar a través de correo electrónico {#send-via-e-mail}
Esta opción te permite enviar el cupón de pago a través de correo electrónico. Los clientes reciben el cupón a través de correo electrónico para descargarlo e imprimirlo.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_02_es.png)

Para ingresar los clientes uno a uno, ingresa la siguiente información:

* Correo electrónico: dirección de correo electrónico del cliente que recibe el cupón.
* Nombre cliente: nombre del pagador.
* Descripción del pago: descripción del pago que se va a realizar.
* Valor: este campo está disponible cuando defines que la cantidad pagada por tu cliente es fija y toma dicho valor.
* Fecha expiración: este campo está disponible cuando defines una fecha de expiración del cupón.
* Referencia de pago: este campo está disponible cuando defines que quieres configurar tu propia referencia de pago en el cupón.

Haz clic en el botón _**Agregar**_ para guardar la información de tus clientes y agrear un cliente adicional si lo requieres.

Para agregar múltiples clientes, haz clic en **Agregar varios pagadores desde un archivo** y descarga el archivo de ejemplo haciendo clic en **Descargar formato**.

Cada línea del archivo corresponde a un cliente. Ingresa la información del ejemplo y cárgalo en el Módulo PayU.

Independiente de la opción seleccionada, haz clic en **Continuar**.

Aparece una nueva ventana mostrando el resumen de los correos a enviar.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_03_es.png)

Si quieres editar la información del emisor y del correo electrónico, haz clic en el enlace _**Editar**_ mostrado en la esquina superior derecha de cada sección.

Por último, haz clic en **Enviar correo electrónico**. Cada cliente recibe un correo electrónico con el cupón.

### Imprimir los cupones {#print-the-coupons}
Esta opción te permite generar los cupones en formato PDF.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_04_es.png)

Para ingresar los clientes uno a uno, ingresa la siguiente información:

* Nombre cliente: nombre del pagador.
* Descripción del pago: descripción del pago que se va a realizar.
* Valor: este campo está disponible cuando defines que la cantidad pagada por tu cliente es fija y toma dicho valor.
* Fecha expiración: este campo está disponible cuando defines una fecha de expiración del cupón.
* Referencia de pago: este campo está disponible cuando defines que quieres configurar tu propia referencia de pago en el cupón.

Haz clic en el botón _**Agregar**_ para guardar la información de tus clientes y agrear un cliente adicional si lo requieres.

Para agregar múltiples clientes, haz clic en **Agregar varios pagadores desde un archivo** y descarga el archivo de ejemplo haciendo clic en **Descargar formato**.

Cada línea del archivo corresponde a un cliente. Ingresa la información del ejemplo y cárgalo en el Módulo PayU.

Independiente de la opción seleccionada, haz clic en **Continuar**.

Aparece una nueva ventana mostrando el resumen de los PDF a generar.

<img src="/assets/PaymentCoupons/PaymentCoupons_05_es.png" alt="PrintScreen" width="60%"/><br>

Si quieres editar la información del emisor, haz clic en el enlace _**Editar**_ mostrado en la esquina superior derecha de la sección.

Por último, haz clic en **Generar copones en PDF**. Se descarga un archivo PDF, cada página tiene el cupón generado por cada cliente.

### Generar Referencias de pago {#generate-payment-references}
Esta opción le permite generar un archivo Excel con los cupones configurados.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_06_es.png)

Para ingresar los clientes uno a uno, ingresa la siguiente información:

* Nombre cliente: nombre del pagador.
* Descripción del pago: descripción del pago que se va a realizar.
* Valor: este campo está disponible cuando defines que la cantidad pagada por tu cliente es fija y toma dicho valor.
* Fecha expiración: este campo está disponible cuando defines una fecha de expiración del cupón.
* Referencia de pago: este campo está disponible cuando defines que quieres configurar tu propia referencia de pago en el cupón.

Haz clic en el botón _**Agregar**_ para guardar la información de tus clientes y agrear un cliente adicional si lo requieres.

Para agregar múltiples clientes, haz clic en **Agregar varios pagadores desde un archivo** y descarga el archivo de ejemplo haciendo clic en **Descargar formato**.

Cada línea del archivo corresponde a un cliente. Ingresa la información del ejemplo y cárgalo en el Módulo PayU.

Independiente de la opción seleccionada, haz clic en **Generar referencias en Excel**.

La descarga inicia inmediatamente. Además, se muestra una ventana con e número de referencias generadas. En esta ventana, también puedes enviar el archivo Excel por correo electrónico a quien lo necesite .

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_07_es.png)

### Crear tarjetas de cobranza {#create-collection-cards}
Esta opción te permite generar tarjetas con la información información necesaria para que tus clientes realicen pagos en efectivo cuantas veces lo necesiten en los puntos de pago disponibles.

Esta opción está disponible cuando no se configura un monto fijo de pago ni una fecha de expiración.

{{% alert title="Nota" color="info"%}}

<img src="/assets/Argentina.png" width="25px"/> **Disponible solo en Argentina.**

{{% /alert %}}  

Las tarjetas de cobranza son tarjetas plásticas asociadas a tu cuenta PayU; tienen impreso un código de barras y puedes incluir una referencia de pago.

Una vez se hayan generado tus tarjetas, entregalas a tus clientes para que puedan pagar la cantidad que deseen en efectivo sin fecha de expiración.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_08_es.png)

Para solicitar las tarjetas, necesitas la siguiente información:

* Diseño de tus tarjetas de cobranza: selecciona un diseño predefinido o personalizado para tus tarjetas. Las tarjetas personalizadas están disponibles a partir de 1000 tarjetas.
* ¿Cuántas tarjetas deseas solicitar?: selecciona el número de tarjetas que deseas generar de acuerdo con el diseño que escogiste.
* Dirección de entrega: haz clic en el enlace _**Editar**_ en la esquina superior derecha de este panel para ingresar la dirección donde quieres recibir las tarjetas.
* Resumen del pago: calculamos el costo de tu orden a partir de la cantidad solicitada y el diseño escogido.

{{% alert title="Nota" color="warning"%}}

El valor de la orden será descontado de tu cuenta PayU y debes tener saldo disponible.

{{% /alert %}} 

Haz clic en _**Solicitar tarjetas**_ para continuar. Aparece una ventana de confirmación para que valides la información de tu solicitud.

<img src="/assets/PaymentCoupons/PaymentCoupons_09_es.png" alt="PrintScreen" width="60%"/>

## Consultar los cupones creados {#consult-the-created-coupons}
Cuando creas cupones o tarjetas de cobranza, puedes consultar su información para ver los pagos recibidos, activar, desactivar o descargar el cupón o la tarjeta.

1. En el Módulo PayU, expande la opción **Cobra con PayU** y luego, selecciona **Mis herramientas**.

<img src="/assets/PaymentCoupons/PaymentCoupons_10_es.png" alt="PrintScreen" width="60%"/><br>

2. Selecciona la pestaña _**Cobros en efectivo**_ o _**Tarjetas de recaudo**_ (cobranza) según tus necesidades.

3. Puedes utilizar la opción de Búsqueda avanzada para encontrar un conjunto específico de cupones.

<img src="/assets/PaymentCoupons/PaymentCoupons_11_es.png" alt="PrintScreen" width="60%"/><br>

4. Cada cupon presenta las opciones para desactivar/activar o descargar el cupon. Una vez se desactiva el cupón, no puede recibir más pagos.<br>Encuentra estas opciones en el menú de los tres puntos de la columna _**estado**_.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_12_es.png)

