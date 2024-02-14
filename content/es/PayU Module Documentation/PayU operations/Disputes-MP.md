---
title: "Disputas"
date: 2021-09-03T16:42:19-05:00
type: docs
Description: >
  Aprende a gestionar el proceso de Disputas solicitado por tus clientes. Esto incluye, ver las disputas creadas, proporcionar la evidencia para resolverlas o reembolsar el monto pagado por el cliente.
weight: 40
---

![Concepts](/assets/Disputes/Disputes_es.png)

{{% alert title="Nota" color="info"%}}
Para conocer los términos introductorios sobre una disputa, consulte este [artículo]({{< ref "disputes.md" >}}).
{{% /alert %}}

## Permisos requeridos {#permission-required}
Para tener acceso a este módulo, necesitas un perfil con los siguientes permisos activos:

* _Reportes_ > _Reembolsos y disputas_
* _Reportes_ > _Resolver disputas con compradores (gestionar contracargos)_

Consulta [Perfiles y Permisos]({{< ref"Profile-and-permissions-management.md" >}}) para más información.

## ¿Por qué es importante responder a una disputa? {#why-is-it-important-to-reply-to-a-dispute}
* El comercio puede generar desconfianza ante el cliente.
* Si no resuelves las disputas, PayU toma el monto de tu cuenta.
* El fondo de reserva podría ser mayor por zona de riesgo.
* Daña la puntuación del código PayU de cara a las redes de pago.
* La cantidad en disputa se congelará hasta que se resuelva la disputa.

Es importante responder siempre a una disputa presentando evidencias antes de la fecha máxima estipulada por el banco]. Luego de la fecha máxima, no puedes cargar evidencias de una disputa y el monto podría ser debitado de tu cuenta.

Para obtener más información sobre los plazos definidos, consulta [días máximos para presentar evidencias]({{< ref "disputes.md#maximum-days-to-provide-evidence" >}}).

## ¿Cómo resolver disputas?
Una disputa comienza cuando un comprador no conoce un cargo realizado en su tarjeta de crédito. Una vez que se notifica al banco, comienza el proceso formal para determinar la validez de la compra.

{{% alert title="Consejo" color="info"%}}
Si cuentas con los datos del tarjetahabiente, la mejor forma para gestionar un proceso de disputa es contactándolo. Si el motivo de la disputa es simplemente desconocimiento (el cliente no recuerda la compra o tu comercio), puedes pedirle que hable con su banco para que retire la solicitud y se resuelva el proceso de disputa a tu favor.
{{% /alert %}}

1. Cuando el banco nos notifica que se ha iniciado un proceso de disputa, se te notifica sobre este procceso. Para configurar el correo electrónico o la URL para recibir notificaciones de disputas, consulta [Configuración técnica]({{< ref "technical-configuration.md#disputes" >}}).

2. Ingresa a tu cuenta PayU. En el menú de la izquierda, expende el menú _**Transacciones**_ y selecciona _**Disputas**_.

![PrintScreen](/assets/Disputes/Disputes_02_es.png)

3. Se abre el módulo de _**Disputas**_, desplazate hacia abajo y ubica lla disputa que tines abierta. Si lo necesitas, puedes utilizar los filtros disponibles para encontrar una disputa en particular.

![PrintScreen](/assets/Disputes/Disputes_03_es.png)

4. Aparecen los detalles de la orden a la derecha de la pantalla. Haz clic en _**Resolver disputa**_ al final del panel.

<img src="/assets/Disputes/Disputes_04_es.png" alt="PrintScreen" width="60%"/><br>

5. En la ventana emergente, puedes encontrar los detalles sobre la razón por la que tu cliente solicitó el proceso de disputas y la fecha límite para presentar evidencias para resolverla. Haz clic en el enlace _**Adjuntar archivo**_ para cargar la evidencia que tengas.

<img src="/assets/Disputes/Disputes_05_es.png" alt="PrintScreen" width="60%"/>

{{% alert title="Nota" color="info"%}}
Si aceptas que la disputa no es un error, puedes iniciar un procesos de [Reembolso]({{< ref "Refunds-MP.md" >}}) haciendo clic en _**Devolver dinero**_.
{{% /alert %}}

6. Sube los archivos de evidencia para resolver la disputa y haz clic en _**Guardar evidencia**_. Es obligatorio guardar la evidencia antes de enviarla a revisión.<br>Los archivos cargados aquí no pueden ser superiores a 10MB y deben ser archivos PDF.

<img src="/assets/Disputes/Disputes_06_es.png" alt="PrintScreen" width="60%"/><br>

Cuando termines, haz clic en _**Enviar a revisión**_.

7. Aparece una ventana de confirmación informando que se ha enviado la evidencia.

<img src="/assets/Disputes/Disputes_07_es.png" alt="PrintScreen" width="60%"/><br>

8. En este punto, enviamos los documentos al banco emisor o a la red que procesó la transacción, quienes supervisan la resolución del caso.<br><br>
El resultado de a disputa puede ser ganada (sin contracargos), perdida (contracargo) o reembolso. En el caso de reembolso, la tienda lo realiza y el banco no crea el contracargo. Consulta los [estados de las disputas]({{< ref "Disputes.md#dispute-states" >}}) para saber todos sus posibles estados.

Cuando la entidad financiera comunica el resultado de la disputa, el caso se actualiza automáticamente en el Módulo PayU.