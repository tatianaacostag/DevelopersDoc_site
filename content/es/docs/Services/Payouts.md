---
title: "Payouts"
linkTitle: "Payouts"
date: 2021-07-16T11:32:55-05:00
description: >
  Esta funcionalidad te permite crear múltiples pagos de forma segura a terceros (usuarios, comercios, proveedores, clientes, etc.) utilizando los fondos que tienes en tu cuenta de PayU.
weight: 70
---

{{% alert title="Importante" color="warning"%}}
PayU ofrece el servicio de Payouts como una integración via API. No está soportado registrar pagos o terceros utilizando el módulo PayU. Actualmente, Payouts está disponible en Colombia.
{{% /alert %}}

Payouts ies un servicio de integración disponible bajo demanda y su activación depende de un análisis de riesgo y seguridad. Para más información o para solicitar este servicio, comunícate con tu Representante de Ventas.

## ¿Cómo funciona Payouts? {#how-do-payouts-work}
A través de Payouts, puedes solicitar varios pagos a varios usuarios fácilmente. Solo necesitas proporcionar la cantidad a pagar junto con la información de cada tercero (como nombre, identificación, información bancaria, etc.) y PayU transfiere la cantidad solicitada luego de realizar algunas validaciones.

<img src="/assets/PushPayments/PushPayments_es.png" width="70%" style="display: block;margin-left: auto;margin-right: auto;"/>

Expliquemos Payouts a través de un ejemplo. Un comercio ofrece productos y servicios a domicilio; este comercio utiliza PayU como su plataforma de pagos y tiene una cuenta donde recauda el dinero pagado por sus clients. Este comercio tiene varios repartidores a quienes paga un monto fijo por cada domicilio que realicen.

Cada semana, el comercio paga el monto obtenido por cada repartidor. Para esto, ellos pueden utilizar Payouts para pagar directamente desde su cuenta de PayU en lugar de administrar los pagos por su cuenta, en cuyo caso, el comercio debe transferir el dinero a sus cuentas bancarias o utilizar los fondos recolectados de otras fuentes.

Para solicitar el pago, el comercio envía la lista de terceros a los que desea pagar junto con el monto de cada uno. PayU valida estos terceros y programa el pago.

El valor de cada pago más la tarifa de procesamiento es debitada de la cuenta. Contacta a tu Represente de Ventas para saber el valor de la tarifa de procesamiento para utilizar este servicio.

### Estados de los Payouts {#payout-states}
Los Payouts se ejecutan en dos pasos principales: el primer paso es cuando se solicita el pago al tercero y el segundo, es cuando la solicitud ha sido aprobada y pasa a la transferencia de los fondos.

El procedimiento transaccional de Payouts tiene los siguientes estados.

* **AWAITING SANCTION SCREENING**: este estado indica que el tercero a quien se le hará el pago es objeto de validación en listas restrictivas y demás políticas de PayU relacionadas con análisis de riesgo. Si un tercero no aprueba esta validación, el pago es rechazado automáticamente.
* **AWAITING FOR SENT**: si el tercero pasa la validación o no es sujeto a ella, este estado indica que la solicitud está lista para ser procesada. En este estado, no se ha realizado la comunicación con servicio.
* **SENT TO CREATE**: este estado indica que se ha completado la comunicación con el servicio y la solicitud de Payout está en proceso de creación.
* **CREATED**: este estado indica que se ha creado la solicitud y se ha convertido en una orden de pago. Cuando la solicitud se convierte e una orden de pago, se mueve en los estados explicados en [estados de la orden de pago]({{< ref "#payment-order-states" >}}). El siguiente estado depende del resultado del proceso de la orden.
* **REJECTED**: este estado indica que la solicitud ha sido rechazada. Una solicitud puede ser rechazada cuando:
  - Falla la validación del tercero.
  - Falla la creación del Payout.
  - Solicitaste la cancelación del Payout y dicha cancelación fue aprobada. 
* **PROCESSING COMPLETED**: este estado indica que se ha completado el proceso del Payout.
* **AWAITING TO CANCEL**: este estado indica que has solicitado la cancelación de una solicitud de Payout. Ten en cuenta que puedes solicitar la cancelación de una solicitud de Payout cuando no está en proceso bancario.<br>En este estado, no se ha realizado la comunicación con servicio.
* **SENT FOR CANCELLATION**: este estado indica que se ha completado la comunicación con el servicio y la solicitud de Payout está en proceso de cancelación.
* **CANCELLATION FAILED**: este estado indica que la solicitud de cancelación no pudo ser ejecutada debido a políticas de PayU o porque no está siendo procesada por PayU.

El siguiente diagrama ilustra el cambio de estados:

<img src="/assets/PushPayments/PushPaymentsStates_es.png" width="80%" style="display: block;margin-left: auto;margin-right: auto;"/>

### Estados de la orden de pago {#payment-order-states}
Una vez el Payout ha sido aprobado, es transformado en una orden de pago. Los siguientes son los estados de una orden de pago.

* **REQUEST_BY_THE_MERCHANT**: este es el estado inicial de la transacción, una vez envías la lista de terceros a pagar y son aprobados, la orden toma este estado.
* **IN_VALIDATION**: debido a políticas de PayU, cada pago puede estar sujeto a una validación. Este estado indica que tu solicitud debe ser revisada bajo nuestras políticas internas. Si la validación falla, el pago que no cumplió con las políticas es rechazado.
* **IN_PAYU_PROCESS**: este estado indica que PayU ha iniciado el proceso del pago.
* **AWAITING_BANK_SENT**: este estado indica que PayU ha iniciado la transferencia del monto al tercero.
* **IN_BANKING_PROCESS**: este estado indica que el pago está siendo procesado por la cuenta bancaria del tercero. En este punto, no puedes solicitar su cancelación ni actualizarla.
* **CONFIRMED_BY_THE_BANK**: este estado indica que el tercero ha recibido el monto de la transferencia.
* **REJECTED**: este estado indica que la transacción ha sido rechazada por PayU (debido a incumplimiento de políticas) o por el Banco (debido a errores en la información bancaria).

El siguiente diagrama ilustra el cambio de estados:

<img src="/assets/PushPayments/PushPaymentsSteps_es.png" width="60%" style="display: block;margin-left: auto;margin-right: auto;"/>

### Validación de la transacción {#transaction-validation}
Cada solicitud de Payout es validada para verificar que la persona que recibirá el dinero no está incluida en listas restrictivas. Esta validación puede tomar hasta 24 horas, lo que podría demorar el pago

Cuando una persona debe ser verificada, PayU verifica primero en el caché de la validación de tal forma que solo sea consultada una vez durante la franja del caché.

Si una persona no aprueba la validación, el Pago no se realiza y se te envía una notificación si tienes configuradas las notificaciones del resultado de la validación.

## Consideraciones {#considerations}
Ten en cuentas las siguientes consideraciones:

* Payouts no es un servicio incluido de forma predeterminada. Debes solicitarlo y firmar un anexo al contrato para acordar el valor de la tarifa de procesamiento y demás condiciones. Contacta a tu Key Account Manager para contratar este servicio.
* Los comercios son los responsables de la integridad y la veracidad de la información de los terceros. PayU no valida que la información entregada sea completa y correcta. Además, la actualización de la información debe ser solicitada por los comercios.<br>PayU no es responsable por transacciones no exitosas debido a información incorrecta.
* Payouts solo permite pagos locales. El comercio puede ser internacional (bajo análisis de seguridad y riesgo) pero solo pueden solicitar Payouts utilizando los fondos obtenidos en el país de procesamiento.<br>Por ejemplo, si el comercio _ABC_ procesa en Colombia y Perú, puede solicitar payouts a terceros en Colombia utilizando los fondos recaudados en Colombia; no pueden solicitar pagos a terceros en Perú utilizando los fondos recaudados en Colombia.
* Una vez se ha creado el Payout, toma el flujo regular en PayU. Esto significa que puedes ver el payout creado en el módulo PayU. 
* El comercio debe probar la relación entre él y sus terceros para garantizar que la transacción es legítima.
<!-- * Para comercios de apuestas, no se puede utilizar Payouts parra hacer reembolsos. Por lo tanto es necesario garantizar que el comercio está pagando un premio. -->

## Procesamiento de transacciones {#transaction-processing}
Payouts utiliza transferencias ACH (**A**utomated **C**learing **H**ouse) para enviar los pagos a los beneficiarios, esto significa que las transacciones son procesadas por lotes durante el día. El tiempo en el que se procesará la transacción se explica en la siguiente tabla:

| Hora del estado *IN_BANKING_PROCESS* | Hora del proceso de ACH | Hora estimada de respuesta           |
|:------------------------------------:|:-----------------------:|:------------------------------------:|
| 05:31 p.m. - 07:20 a.m.              | 9:00 a.m.               | 7:55 p.m.                            |
| 07:21 a.m. - 09:45 a.m.              | 11:30 a.m.              | 10:40 a.m.<br>*Siguiente día hábil*. |
| 09:46 a.m. - 12:30 p.m.              | 2:00 p.m.               | 1:45 p.m.<br>*Siguiente día hábil*.  |
| 12:31 p.m. - 02:50 p.m.              | 4:00 p.m.               | 4:40 p.m.<br>*Siguiente día hábil*.  |
| 02:59 p.m. - 04:20 p.m.              | 6:00 p.m.               | 6:20 p.m.<br>*Siguiente día hábil*.  |

*Las transacciones que llegue al estado **IN_BANKING_PROCESS** después de las 4:20 p.m. serán procesadas el siguiente día hábil.*

{{% alert title="Nota" color="info"%}}

Puede que las solicitudes de Payouts no queden en el estado **IN_BANKING_PROCESS** luego de enviarlas y, dependiendo de la validación de beneficiario, esto puede tomar hasta *24* horas.

{{% /alert %}}

## Notificaciones {#notifications}
Cuando utilizas Payouts, puedes crear un WebHook para configurar notificaciones en los cambios de estado. Se recomienda configurar el WebHook antes de enviar la solicitud de Payout cuando quieras configurar notificaciones.

Puedes configurar un WebHook por uno o varios de los siguientes eventos:
* **Creación de la transferencia**: envía una notificación cuando se crea la solicitud de payout.
* **Actualización de la transferencia**: envía una notificación cuando la validación de Sanction Screening rechaza al tercero.
* **Resultado de la validación**: envía una notificación cuando el tercero ha aprobado la validación y cuando la transferencia ha sido rechazada por el banco.

Consulta [este artículo]({{< ref "" >}}) para aprender a crear WebHooks. <!-- payouts-api.md#create-or-update-a-webhook -->

### Variables en las notificaciones {#variables-in-the-notifications}
Cuando ocurre un evento de los mencionados anterior mente, se envían al WebHook las siguientes variables.

| Variable                  | Formato      | Descripción                                                               |
|---------------------------|--------------|---------------------------------------------------------------------------|
| `pushPaymentId`           | Alfanumérico | Identificador del Payout creado.                                          |
| `creationDate`            | Numérico     | Fecha de creación de Payout.<br>Esta fecha está en milisegundos.          |
| `value`                   | Numérico     | Cantidad solicitada para ser transferida al tercero.                      |
| `currency`                | Alfanumérico | Moneda de la cantidad solicitada.                                         |
| `state`                   | Alfanumérico | [Estado del Payout]({{< ref"#payout-states" >}}) actual.                  |
| `status`                  | Alfanumérico | [Estado de la orden de pago]({{< ref"#payment-order-states" >}}) actual.  | 
| `errorCode`               | Alfanumérico | Error generado luego de la validación de sanction screening.              |
| `errorMessage`            | Alfanumérico | Mensaje del error generado luego de la validación de sanction screening.  |
| `supplierBankAccountId`   | Alfanumérico | Id de la cuenta bancaria del tercero generado por la solicitud de payout. |
| `fullName`                | Alfanumérico | Nombre del tercero beneficiario del Payout.                               |
| `documentNumber`          | Numérico     | Número de documento del tercero beneficiario del Payout.                  |
| `country`                 | Alfanumérico | País del tercero beneficiario del Payout.                                 |
| `validationState`         | Alfanumérico | Resultado de la validación realizada por PayU.                            |
| `dateOfTheNextValidation` | Numérico     | Fecha en la que eel tercero será validado por sanction screening.<br>Esta fecha está en milisegundos. |

## ¿Qué sigue? {#whats-next}
La integración con esta funcionalidad se realiza utilizando el [API de integraciones]({{< ref "" >}}).