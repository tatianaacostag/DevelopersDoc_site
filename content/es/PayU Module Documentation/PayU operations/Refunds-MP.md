---
title: "Reembolsos"
linkTitle: "Reembolsos"
date: 2021-09-03T16:41:53-05:00
type: docs
Description: >
  Aprende cómo hacer reembolsos de transacciones desde el módulo PayU. Un reembolso se realiza cuando una tienda decide voluntariamente regresar el dinero al cliente.
weight: 20
---

{{% alert title="Nota" color="info"%}}
Si realizas un reembolso a través de este panel, este solo se actualiza en el Módulo PayU. Si necesitas controlar y registrar los reembolsos en tu sistema, debes utilizar el [API de Reembolsos]({{< ref "refunds.md" >}}).
{{% /alert %}}

## ¿Qué es un reembolso? {#what-is-a-refund}
Un reembolso es la acción para devolver voluntariamente el dinero pagado por un cliente cuando ocurre alguna de las siguientes situaciones:
* El producto o servicio entregado no cumplió con las expectativas del cliente y lo devolvió.
* El producto está agotado, y el comerciante no puede entregar el producto al cliente.

## Procedimiento de reembolso {#refund-procedure} 
Los reembolsos están sujetos a revisión y aprobación de nuestro equipo. El procedimiento para solicitar reembolsos se explica a continuación:

1. Cuando tu cliente solicita un reembolso, debes solicitarlo utilizando el módulo PayU. Solo necesitas encontrar el pedido y entregar una razón para el reembolso.

2. Una vez enviada la solicitud, PayU la revisa y esta es aprobada o rechazada en **uno** a **tres** días hábiles.

### Estados de reembolso {#refund-states}
Un reembolso puede estar en uno de los siguientes tres estados:

* **En progreso**: la solicitud ha sido enviada a PayU para su aprobación y está en proceso de aprobación.
* **Aprobado**: la solicitud ha sido aprobada por un agente de servicio al cliente de PayU.
* **Declinado**: la solicitud no cumple con las políticas definidas por PayU y fue rechazada por un agente.

## Permisos requeridos {#permission-required}
Para tener acceso a este módulo, necesitas un perfil con los siguientes permisos activos:

* _Reembolsos y Contracargos_ > _Listar Reembolsos_
* _Reembolsos y Contracargos_ > _Administrar Reembolsos_<br>Este permiso te permite realizar reembolsos.	

Consulta [Perfiles y Permisos]({{< ref"Profile-and-permissions-management.md" >}}) para más información.

## Consideraciones {#considerations}
* Los Reembolsos solo están disponibles para transacciones realizadas con tarjeta de crédito.
* Puedes reintentar la solicitud de reembolso si fue rechazada previamente.
* Una vez hagas la solicitud, el monto de la transacción se convierte en parte del Saldo Congelado de tu cuenta de PayU hasta que sea procesado.
* En **Chile**:
  - No se soportan reembolsos para [transacciones procesadas con WebPay Plus]({{< ref "Payments-API-chile.md#submit-transaction-with-debit-and-prepaid-cards" >}}).
  - Para transacciones con tarjetas prepago que no sean procesadas a través de WebPay Plus, los Reembolsos solicitados luego de la primero hora del cobro pueden ser aprobados o rechazados por la red financiera. Luego de esta hora, se rechazan todos los reembolsos para transacciones realizadas con tarjetas prepago.
  - ISi se rechaza el reembolso, PayU muestra el [código de error]({{< ref "Response-codes-and-variables.md#response-codes-for-transactions" >}}) generado por la red.
  - Los reembolsos parciales para transacciones que utilizan cuotas se reciben en línea pero son procesados de forma manual debido a restricciones de la red adquirente.
* En **Colombia**, no se soportan reembolsos parciales para tarjetas de crédito internacionales.
* En **Perú**, se soportan reembolsos parciales para transacciones sin cuotas. Ten en cuenta que las transacciones en una cuota son consideradas como sin cuotas.
* Si tu solicitud de reembolso es aprobada, el monto es retornado al tarjetahabiente.
* Si tu solicitud de reembolso es declinada, el monto se libera del Saldo Congelado y retorna a tu cuenta de PayU.
* Una vez se apruebe el reembolso, este será reflejado en la tarjeta de crédito del pagador cuando el banco lo haga efectivo.
* Para verificar el estado de tu solicitud de reembolso, puedes consultarla haciendo clic en la venta en el Módulo PayU.

## Reembolsos por país {#refunds-per-country}
Ten en cuenta las siguientes consideraciones por país antes de solicitar reembolsos.

{{< overview/refunds_es >}}
<sup>*</sup>_Depende de la red._

## ¿Cómo solicitar un reembolso? {#how-to-request-a-refund}
Para solicitar un reembolso, la transacción debe estar aprobada y sin ningún proceso de disputa pendiente. Sigue estos pasos para solicitarlo.

1. Inicia sesión en ru cuenta PayU. En el menú de la izquierda, expande el menú _**Transacciones**_ y selecciona _**Reporte de ventas**_.

![PrintScreen](/assets/Refunds/Refunds_es_04.png)

2. Se abre el [Reporte de ventas]({{< ref "Sales-report.md" >}}). Localiza la transacción que quieres reembolsar y haz clic en ella.

![PrintScreen](/assets/Refunds/Refunds_es_05.png)

3. Aparecen los detalles de la transacción a la derecha de la ventana. Haz clic en el botón _**Devolver dinero**_ al final del panel.

<img src="/assets/Refunds/Refunds_es_06.png" alt="PrintScreen" width="50%"/><br>

4. Si necesitas solicitar un reembolso parcial, marca la opción _**Devolver una parte de la compra**_ e ingresa el valor solicitado.

<img src="/assets/Refunds/Refunds_es_08.png" alt="PrintScreen" width="50%"/><br>

5. Ingresa la razón para solicitar el reembolso (parcial o total) y haz clic en _**Devolver dinero**_.

<img src="/assets/Refunds/Refunds_es_07.png" alt="PrintScreen" width="50%"/><br>

6. Aparece el resumen de la solicitud. Mientras PayU procesa el reembolso, el monto del reembolso se congela en tu cuenta. Si se aprueba la solicitud, el monto reembolsado se devuelve al cliente a través del método de pago utilizado.

<img src="/assets/Refunds/Refunds_es_09.png" alt="PrintScreen" width="50%"/><br>

7. Una vez aprobada la solicitud, el estado aparece en la venta.

<img src="/assets/Refunds/Refunds_es_10.png" alt="PrintScreen" width="50%"/><br>