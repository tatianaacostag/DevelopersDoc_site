---
title: "Disputas"
linkTitle: "Disputas"
date: 2021-11-18T13:40:06-05:00
type: docs
Description: >
   Esta es una herramienta que puedes encontrar en el Módulo administrativo que te sirve para gestionar procesos de disputa que se generen con tu cuenta PayU. Encuentra toda la información necesaria y los pasos a seguir para validar los cobros efectuados.
weight: 26
---

{{% alert title="Nota" color="warning"%}}
Este artículo ha sido deprecado y no se ofrece a comercios nuevos.
{{% /alert %}}

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/contracargos.png)

{{% alert title="Nota" color="info"%}}
Una vez que una transacción es parte de una disputa, el monto asociado pasa a formar parte del saldo congelado, por lo tanto no podrás realizar transferencias de dicho saldo a tu cuenta bancaria hasta tanto no se resuelva la disputa.

Si deseas ver un demo de la herramienta y conocer más sobre el Módulo de disputas y cómo puede ayudarte a disminuir los contracargos te invitamos al visitar el video en nuestro canal el YouTube con las memorias del webinar sobre contracargos

[Ver webinar](https://www.youtube.com/watch?v=VK64Ma6WsyI)
{{% /alert %}}

## ¿Qué es una disputa?
Una disputa se inicia cuando un comprador desconoce ante el banco un cargo realizado a su tarjeta de crédito. Una vez notificado el banco, se inicia el proceso formal para determinar la validez de la compra efectuada.

## Motivos de disputa
Existen varias razones que pueden llevar a un comprador a desconocer un cargo en su tarjeta de crédito. Los motivos por los que se inicia un proceso de disputa pueden variar. Algunos de los que se han identificado son los siguientes:
* _**Fraude**_: Las disputas se determinan como fraude cuando una persona no autorizada realizó compras con una tarjeta de crédito. Este tipo de disputa puede suceder si la tarjeta fue robada o extraviada.
* _**Desconocimiento de pago**_**_: La marca o el nombre del comercio que se refleja en el extracto de la tarjeta de crédito no es reconocida por el tarjetahabiente.
* _*Producto no entregado**_: el tarjetahabiente indica que no ha recibido el producto o servicio objeto del cargo realizado a su tarjeta de crédito.
* _**Producto no aceptable**_: el tarjetahabiente alega no haber recibido el producto o servicio en las condiciones esperadas.
* _**Duplicado**_: el tarjetahabiente indica que el cargo realizado por la compra de un producto o servicio se aplicó más de una vez a su tarjeta de crédito.
* _**Monto no corresponde**_: El cargo realizado a la tarjeta de crédito no corresponde con el valor de la compra.
* _**No informado por la entidad**_: En muchas ocasiones el banco o la red procesadora inicia un proceso de disputa sin tener un motivo específico.
 
## ¿Cómo funciona?

### 1. Notificación de una disputa
Cuando PayU es notificado por parte del banco que se ha iniciado un proceso de disputa, automáticamente recibirás un email con la información de dicho proceso.

<div style="display: flex;">
  <div style="float: left;width: 50%;">
    <p style="text-align: center">Email que te notifica el inicio de una disputa</p>
    <p><img src="https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/mail-notificacion-es.png" alt="PrintScreen"/></p>
  </div>
  <div style="float: left;width: 50%;">
    <p style="text-align: center">Email que pueden ver tus compradores</p>
    <p><img src="https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/mail-notificacioncomprador-es.png" alt="PrintScreen"/></p>
  </div>
</div>
<br>

Igualmente enviamos un POST con toda la información de la disputa a cualquier URL que configures desde tu módulo administrativo. De esta manera puedes automatizar tus procesos de gestión de disputas para minimizar el riesgo de un posible contracargo.

Puedes configurar la URL en donde realizaremos la notificación dentro del módulo administrativo haciendo click en el menú _**configuración**_ en la opción _**configuración de cuentas**_, defines la url de notificación de disputas y habilitando la casilla de notificación.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/disputas1-es.png)

Una vez realices este proceso, recibirás automáticamente un POST con toda la información del proceso de disputa iniciado. Igualmente recibirás una notificación POST cada vez que el proceso de disputa sufra una actualización, de esta manera estarás enterado del avance y finalización de dicho proceso.

### 2. Consultas a través del módulo administrativo
Puedes consultar y gestionar tus procesos de disputa desde tu módulo administrativo. En el menú _**disputas**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/disputas2-es.png)

### 3. Proporciona evidencias
Es importante que siempre respondas proporcionando evidencia para una disputa antes de la fecha límite estipulada por el banco. Una vez cumplida la fecha máxima no será posible cargar la evidencia correspondiente para una disputa.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/disputas3-es.png)

Para cargar evidencia que nos permita gestionar frente al banco o la red procesadora, debes hacer clic sobre una disputa, esto te llevará al detalle de la disputa. Allí encontrarás el botón _**cargar evidencia**_, selecciona el archivo que creas puede ser útil para pelear por la disputa y presiona el botón _**guardar**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/disputas4-es.png)

Para minimizar la probabilidad de generación de un contracargo puedes proporcionarnos las siguientes evidencias para una disputa:

* Comprobante de entrega del producto y/o servicio firmado por el tarjeta-habiente.
* Factura de Venta del producto o servicio.
* Carta de aceptación de pago firmada por el tarjeta-habiente anexando documento de identificación del mismo.
* Otros soportes que validen la compra.

{{% alert title="Nota" color="info"%}}
Debes fijarte que no se haya cumplido la fecha máxima de respuesta, en este caso no vas a poder cargar evidencia, las fechas máximas de respuesta por país son:

| País | Cantidad de días para enviar evidencias |
|---|---|
| Argentina | 5 días hábiles |
| Brasil | 5 días hábiles |
| Chile | 5 días hábiles |
| Colombia | 2 días hábiles |
| México | 5 días calendario |
| Perú | 2 días hábiles |
| Panamá | 8 días hábiles |

{{% /alert %}}

### 4. Decisión final sobre el estado de la disputa
Una vez proporcionada la evidencia, enviamos los documentos al banco emisor o la red que procesó la transacción, de quien depende la resolución del caso. El caso de disputa puede resultar: ganado (sin contracargo), perdido (contracargo) o reembolso. En el caso de reembolsos, el comercio es quién hace la devolución al comprador y el banco no genera el contracargo.
Cuando la entidad financiera comunica el resultado de la disputa, el caso se actualiza automáticamente en el módulo administrativo y PayU envía un POST a la URL configurada con la información del resultado final.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/mail-resultado-es.png)

## Estados según el flujo de una disputa
Cuando se notifica una disputa, se crea una entidad disputa para la transacción asociada.

El estado de la disputa cambia según el punto en que se encuentre dentro del flujo del proceso.

Estados de una disputa:

| Estado | Descripción |
|---|---|
| Notificada | Cuando se inicia un proceso de disputa, debes cargar evidencia para la disputa. |
| En revisión | Cuando el comercio proporciona evidencia para una disputa desde el módulo administrativo y la disputa entra en revisión por parte de la entidad financiera. |
| Perdida | La transacción es reversada desde la cuenta virtual del comercio y puede incurrir en un costo de gestión de contracargo. |
| Ganada: | El proceso de disputa se resuelve a favor del comercio, no hay deducciones de ningún tipo. |
| Reembolsada | Existen disputas que pueden ser reversadas ya que aún no ha sido facturado el monto en la tarjeta de crédito del tarjetahabiente. Se genera reversión de la transacción, pero no existe cobro por contracargo. Para resolver una disputa como reembolso debes solicitarlo a disputas@payulatam.com |

{{% alert title="Tips para gestionar tus disputas" color="info"%}}
* Si cuentas con los datos del tarjetahabiente, la mejor forma para gestionar un proceso de disputa es contactándolo. Si el motivo de la disputa es simplemente desconocimiento, puedes pedirle al tarjetahabiente que hable con su banco para que retire la queja y se resuelva el proceso de disputa a tu favor, igualmente debes proporcionar cualquier evidencia que creas conveniente desde tu módulo administrativo.
* Es muy importante que no se haya cumplido la fecha máxima de respuesta o no podrás cargar ninguna evidencia, si no envías las evidencias a tiempo aumentarán las posibilidades de que se generen contracargos y se debite el dinero de tu cuenta PayU.
* Los archivos a cargar en la sección de evidencias no deben tener un peso superior a 10 MB. Puedes subir archivos tipo .JPG .PNG .GIF .TIFF .PDF .DOC o .PPT.
{{% /alert %}}