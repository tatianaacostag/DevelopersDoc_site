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

## Consideraciones por país

Antes de solicitar un reembolso, ten en cuenta las siguientes consideraciones específicas por país.

### Argentina
- Los reembolsos pueden solicitarse **al menos 10 minutos después de la aprobación** y hasta **357 días** después de la transacción.
- Los reembolsos con montos decimales **no están soportados**.
- Una vez aprobado un reembolso, el pagador recibe los fondos **dentro de 30 días hábiles**.

### Brasil

- Los reembolsos pueden solicitarse **al menos 10 minutos después de la aprobación** y hasta:
  - **87 días** para transacciones con PIX.
  - **172 días** para transacciones con tarjeta.
- Se admiten **reembolsos parciales múltiples** para transacciones con PIX.
- Una vez aprobados:
  - Los reembolsos de **transacciones con PIX** se procesan **de inmediato**.
  - Los reembolsos de **otros métodos de pago** tardan hasta **15 días hábiles**.

### Chile

- Los reembolsos pueden solicitarse **al menos 10 minutos después de la aprobación** y hasta **327 días**.
- Los reembolsos están disponibles para transacciones procesadas a través de [WebPay Plus o Redcompra]({{< ref "Payments-API-chile.md#submit-transactions-using-debit-and-prepaid-cards" >}}).
- Para **transacciones con tarjeta prepago no procesadas por WebPay Plus**:
  - Los reembolsos solicitados **dentro de la primera hora** pueden ser **aprobados o rechazados** por la red financiera.
  - Los reembolsos solicitados **después de la primera hora** son **rechazados automáticamente**.
- Si un reembolso es rechazado, PayU muestra el [código de error correspondiente]({{< ref "Response-codes-and-variables.md#response-codes-for-transactions" >}}).
- Los reembolsos con montos decimales **no están soportados**.
- Una vez aprobado un reembolso, el pagador recibe los fondos **entre 8 y 20 días hábiles**.
- Los **reembolsos parciales** en transacciones con **cuotas** se reciben en línea pero se procesan manualmente debido a restricciones del adquirente.
- El monto mínimo para realizar un reembolso depende de la red adquirente:
    - **Más de 10 CLP** para transacciones procesadas por la red **TRANSBANK**.
    - **Más de 50 CLP** para transacciones procesadas por la red **KLAP**.

### Colombia

- Los reembolsos pueden solicitarse **al menos 10 minutos después de la aprobación** y hasta **357 días**.
- El monto mínimo para un reembolso es **100 COP**.
- Si una solicitud de reembolso **no se envía el mismo día** de la captura de la transacción (**antes de las 9 PM UTC-5**), se **procesa manualmente** en lugar de intentarse en línea.
- Una vez aprobado un reembolso, el pagador recibe los fondos **dentro de 30 días hábiles**.
- **Los reembolsos parciales no están disponibles** para tarjetas de crédito internacionales.

### México

- Los reembolsos pueden solicitarse **al menos 10 minutos después de la aprobación** y hasta:
  - **175 días** para la mayoría de las transacciones.
  - **40 días** si son procesadas por **Bancomer**.
- Una vez aprobado un reembolso, el pagador recibe los fondos **dentro de 30 días hábiles**.
- Los reembolsos con montos decimales **no están soportados**.

### Panamá

- Los reembolsos pueden solicitarse **al menos 10 minutos después de la aprobación** y hasta **357 días**.
- Una vez aprobado un reembolso, el pagador recibe los fondos **dentro de 8 días hábiles**.

### Perú

- Los reembolsos pueden solicitarse **al menos 10 minutos después de la aprobación** y hasta **357 días**.
- Se admiten **reembolsos parciales** para transacciones **sin cuotas** (incluidas las de una sola cuota).
- Los **reembolsos parciales con Visanet** deben enviarse **al menos un día después de la transacción**.
- Una vez aprobado un reembolso, el pagador recibe los fondos **entre 15 y 25 días hábiles**.
- El monto mínimo para un reembolso es **1 USD o 1 PEN**.

### Tiempos de reembolso y políticas por país {#refund-timelines-and-policies-by-country}

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

## Obtener la confirmación del reembolso {#getting-the-refund-confirmation}
Cuando el reembolso haya sido aprobado, puedes generar un recibo o enviar el comprobante al pagador. Para esto, sigue las instrucciones dependiendo de la operación que quieras realizar.

### Generar el recibo del reembolso {#generate-the-refund-receipt}
Para generar el recibo del reembolso, encuentra la venta reembolsada y haz clic en el botón de impresora ubicado en la esquina superior derecha del panel de detalles de la transacción.

<img src="/assets/Refunds/Refunds_es_11.png" alt="PrintScreen" width="50%"/><br>

Se abren las opciones de impresión de tu navegador, aquí puedes imprimirlo físicamente o guardarlo en formato PDF. La siguiente imagen corresponde a las opciones de impresión de Google Chrome.

![PrintScreen](/assets/Refunds/Refunds_es_12.png)

{{% alert title="Advertencia" color="warning"%}}
La opción _Guardar como PDF_ depende de tu navegador. Si tu navegador no soporta esta opción, solo podrás imprimirlo utilizando una impresora.
{{% /alert %}}

### Enviar el comprobante del reembolso al pagador {#send-the-refund-confirmation-to-the-payer}
Junto con la funcionalidad de impresión, también puedes enviar un correo de confirmación al pagador informando el resultado del reembolso. Esta opción se encuentra en la sección _**Acciones**_ al final del panel de detalles de la transacción.

<img src="/assets/Refunds/Refunds_es_13.png" alt="PrintScreen" width="50%"/><br>

Una vez haces clic en este botón, el pagador recibe un correo electrónico con los detalles del reembolso.

<img src="/assets/Refunds/Refunds_en_14.png" alt="PrintScreen" width="50%"/><br>

{{% alert title="Nota" color="info"%}}
Puedes habilitar el envío automático de la confirmación de reembolso al pagador. Para conocer más detalles sobre esta opción, consulta a tu representante de ventas.
{{% /alert %}}