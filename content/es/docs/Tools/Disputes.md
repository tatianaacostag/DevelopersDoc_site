---
title: "Disputas"
linkTitle: "Disputas"
date: 2021-04-12T08:34:58-05:00
description: >
  Utilizando esta herramienta, puedes manejar el proceso de disputas generadas a tu cuenta de PayU.
weight: 60
---

![Concepts](/assets/Disputes/Disputes_es.png)

## ¿Qué es una Disputa? {#what-is-a-dispute} 
Tus compradores pueden presentar una reclamación al banco de emisor de su tarjeta. El banco nos envía una notificación de disputa y nosotros ña creamos en nuestro sistema. La disputa congela el valor total de la venta en tu cuenta PayU.

## ¿Por qué ocurre una disputa? {#why-a-dispute-happens}
Un comprador puede reclamar al banco de emisor de su tarjeta reportando que no ha recibido el producto, el producto es deficiente o no cumple con las características esperadas. El comprador también puede desconocer la compra en el extracto de su tarjeta de crédito.<br>
Las razones para iniciar un proceso de disputa varian, algunas de ellas son:
* **Fraude**: las disputas clasificadas como fraude ocurren cuando una persona no autorizada hace una compra con una tarjeta de crédito. Este tipo de disputas puede suceder cuando se pierde la tarjeta o fue robada.
* **Desconocimiento del pago**: el tarjetahabiente no reconoce el nombre de la marca o de la tienda que aparece en el extracto de la tarjeta de crédito.
* **Producto no entregado**: el tarjetahabiente declara que no recibió el producto o servicio cubierto por el cobro realizado a su tarjeta de crédito.
* **Producto no aceptable**: el tarjetahabiente reclama que no ha recibido el producto o servicio en las condiciones esperadas.
* **Duplicado**: el tarjetahabiente indica que el cobro realizado por la compra de un producto o servicio fue aplicado más de una vez en su tarjeta de crédito.
* **Monto no corresponde**: el cobro de la tarjeta de crédito no corresponde con el valor de la compra.
* **No informado por la entidad**: el banco o la red de procesamiento inicia una disputa sin una razón específica.

{{% alert title="Atención" color="warning"%}}

* Recall that PayU acts as an intermediary to let your commerce provide evidence in the dispute process between you and the bank entity. PayU has no interference on the result of the dispute, this decision depends on the issuing bank.
* Once a transaction is part of a dispute, the associated amount becomes part of the frozen balance; therefore, you cannot transfer funds from this balance to your bank account until the dispute is resolved.

{{% /alert %}} 

## ¿Cómo funciona el proceso de disputas en PayU? {#how-does-the-disputes-process-works-in-payu}
El proceso de disputas sigue un flujo simple:

### 1. Notificación de la Disputa {#1-dispute-notification}
Cuando un banco notifica a PayU sobre una disputa, tú y tu comercio reciben un correo electrónico notificando el inicio del proceso de disputa.

También enviamos un `POST` con toda la información de la disputa a la URL que configuraste en tu [módulo PayU]({{< ref "" >}}). De esta forma, puedes automatizar el manejo del proceso de disputas para minimizar el riesgo de un posible contracargo. <!-- Technical-configuration.md#disputes -->

Puedes configurar la URL donde te notificamos en el módulo PayU. Ingresa a [PayU.com](payu.com) y haz clic en la opción para iniciar sesión que se encuentra en la parte superior de la página. O si lo prefieres, puedes ir directamente a https://merchants.payulatam.com/.

Haz clic en _**Configuración**_ y luego selecciona _**Configuración técnica**_.

![PrintScreen](/assets/IntegrationVariables_01_es.png)

En esta ventana, ve a la pestaña _**Disputas**_. Define la URL de notificación de disputas y habilita el campo de notificación en el campo _**URL de notificación automática**_.

![PrintScreen](/assets/Disputes/Disputes_01_es.png)

Una vez configures esto, automáticamente recibes un POST con toda la información del proceso de disputa iniciado. Además, puedes una notificación POST cada vez que haya una actualización en el proceso, así puedes estar al tanto del progreso y la terminación del proceso.

### 2. Consulta desde el Módulo PayU {#2-query-through-the-payu-module}
Puedes ver y administrar el proceso de disputas desde el módulo PayU en la opción _**Dispute**_ option inside the _**Transacciones**_ menu.

![PrintScreen](/assets/Disputes/Disputes_02_es.png)

### 3. Presenta evidencias {#3-provide-evidence}
Es importante responder siempre a una disputa presentando evidencias antes de la [fecha máxima estipulada por el banco]({{< ref"disputes.md#maximum-days-to-provide-evidence" >}}). Luego de la fecha máxima, no puedes cargar evidencias de una disputa.

Para aprender a cargar evidencia para resolver la disputa, consulta el [Módulo PayU]({{< ref"" >}}).<!-- ref"Disputes-MP.md" -->

#### ¿Qué información puede ser útil? {#what-information-can-be-useful}
* Información completa de tu cliente (nombre completo, número de identificación, correo electrónico, dirección de envío, número visible de su tarjeta de crédito, etc.)
* Prueba de entrega del producto o servicio firmada por el tarjetahabiente.
* Factura de venta del producto o servicio.
* Carta de aceptación del pago firmada por el tarjetahabiente adjuntando su documento de identidad.
* Política de cancelación y reembolso.
* Prueba de aceptación de los términos y condiciones.
* Histórico de transacciones de tu cliente (si existen).
* Otros soportes que validen la compra.

#### Días máximos para presentar evidencias {#maximum-days-to-provide-evidence}
Ten en cuenta que el número máximo de días para presentar evidencias por cada país es: 

| País      | Días para proporcionar evidencias |
|-----------|-----------------------------------|
| Argentina | 5 días hábiles                    |
| Brasil    | 12 días hábiles                   |
| Chile     | 5 días hábiles                    |
| Colombia  | 2 días hábiles                    |
| México    | 12 días calendario                |
| Panamá    | 8 días hábiles                    |
| Perú      | 6 días hábiles                    |

### 4. Decisión final del estado de la disputa {#4-final-decision-on-dispute-status}
Una vez presentes la evidencia, enviamos los documentos al banco emisor o a la red que procesó la transacción, quienes supervisan la resolución del caso. El resultado de a disputa puede ser ganada (sin contracargos), perdida (contracargo) o reembolso. En el caso de reembolso, la tienda lo realiza y el banco no crea el contracargo.

Cuando el banco notifica el resultado de la disputa, se actualiza el caso automáticamente en el modulo PayU y enviamos un POST a la URL configurada con la información del resultado final.

## Estados de las disputas {#dispute-states} 
Cuando se notifica una disputa, se crea una entidad disputa para la transacción asociada. El estado de la disputa cambia según el punto en que se encuentre dentro del flujo del proceso.

| Estado | Descripción |
|-|-|
| Notificada | Cuando inicia el proceso de disputas, debes cargar la evidencia para la misma. |
| En revisión de la red | Cuando la tienda presenta la evidencia a través del Módulo PayU y la disputa entra en revisión por el banco o la red. |
| Perdida | La transacción es reversada desde la cuenta virtual del comercio y puede incurrir en costos de gestión de contracargos. |
| Ganada | El proceso de disputas ha sido resulto en favor de la tienda, no hay deducciones de ningún tipo. |
| Reembolsada | Este procesos ocurre cuando el comercio autoriza reversar la operación bajo su propia voluntad, esto previene que la tienda tenga que pagar un contracargo y se reemplace por un reembolso. |
| Expirada | Luego de pasados 120 días sin respuesta del banco, el monto de la disputa queda disponible para el comercio. |

{{% alert title="Nota" color="info"%}}
Si tienes activada la [Garantía antifraude]({{< ref"" >}})<!-- ref"Antifraud-Guarantee.md" -->, cuando el contracargo es sujeto a cobertura, PayU asume los valores debitados de tu cuenta. En este caso, el estado de la disputa es _Contracargada_ (Perdida) _Aplica garantía antifraude_. 
{{% /alert %}}

