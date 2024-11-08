---
title: "Transferencias"
linkTitle: "Transferencias"
date: 2021-09-03T16:42:07-05:00
type: docs
Description: >
 Aprende cómo transferir fondos desde tu cuenta de PayU a tu cuenta bancaria. Además, descubre cómo automatizar las transferencias según un cronograma o monto específico.
weight: 20
---

En el módulo de _Transferencias_, puedes transferir los fondos recaudados en tu cuenta virtual de PayU a tu cuenta bancaria registrada.

## Consideraciones {#considerations}

Antes de iniciar una transferencia, revisa las siguientes consideraciones importantes:

* Tu información bancaria debe estar actualizada y validada. Si has solicitado una actualización de tu cuenta bancaria, el sistema seguirá enviando los fondos a tu cuenta anterior hasta que el equipo de Riesgo de PayU haya validado la nueva cuenta.
* Puedes programar transferencias según un monto específico o establecer una fecha para realizar transferencias automáticas.
* Cada mes, las primeras tres transferencias locales son gratuitas. A partir de la cuarta transferencia en un mes, PayU aplica una tarifa en la mayoría de los países. Ten en cuenta que las transferencias internacionales tienen una tarifa desde la primera transacción. La siguiente tabla ofrece una descripción general de las tarifas para transferencias locales e internacionales por país:

| País       | Tarifa Local      | Tarifa Internacional |
|------------|-------------------|----------------------|
| Argentina  | 110,00 ARS        | 753,00 USD          |
| Brasil     | Ninguna           | Ninguna             |
| Chile      | 2.000,00 CLP      | 50.000,00 CLP       |
| Colombia   | 6.500,00 COP      | 30,00 USD           |
| México     | 10,00 MXN         | 650,00 MXN          |
| Panamá     | 30,00 USD         | 44,00 USD           |
| Perú       | 15,00 PEN         | 90,00 USD           |

{{% alert title="Notas" color="info"%}}

  * Las tarifas están sujetas a cambios con el tiempo. Para obtener la información más actualizada o aclarar dudas específicas, por favor contacta a tu representante de ventas de PayU.
  * Las transferencias internacionales también están sujetas a una tarifa FX del 3% (sujeta a negociación) para cubrir los costos de cambio de divisas.
  * En Brasil, dado que PayU no es una institución de pagos, el sistema transfiere automáticamente tus fondos a tu cuenta bancaria diariamente y sin costo. Para monitorear estas transferencias, usa la opción _**Transferencias diarias**_ (_**Transferencias**_ > _**Transferencias diarias**_).

{{% /alert %}}

* La primera transferencia puede tardar hasta cinco (5) días en depositarse en tu cuenta bancaria. Como parte de un proceso administrativo, el equipo de Riesgo de PayU puede solicitar documentación adicional para verificar tus primeras ventas.
* La segunda transferencia y las siguientes tomarán un máximo de tres (3) días hábiles para completarse. Los días hábiles son habitualmente de lunes a viernes, excluyendo los días festivos.

{{% alert title="Nota" color="warning"%}}
Los tiempos mencionados aplican solo para transferencias locales. Para transferencias internacionales, por favor contacta a tu representante de ventas.
{{% /alert %}}

## Permisos Requeridos {#permission-required}

Para tener acceso a este módulo, necesitas un perfil con los siguientes permisos activos:

* _Transferencias_ > _Consultar_
* _Transferencias_ > _Administrar_<br>Este permiso te permite realizar transferencias.	

Consulta [Perfiles y Permisos]({{< ref"Profile-and-permissions-management.md" >}}) para más información.

## Transferir Fondos {#transfer-funds}

Puedes transferir hasta el monto total en tu cuenta PayU al banco registrado. Sigue estos pasos para realizar una transferencia.

1. Inicia sesión en tu cuenta PayU. En el menú de la izquierda, expande el menú _**Transferencias**_ y selecciona _**Transferencias**_.

![PrintScreen](/assets/Transfers/Transfers_01_es.png)

2. Completa el valor para transferir o seleccione la opción _**Transferir el saldo total disponible**_. En el panel derecho, se actualiza el valor ingresado; Además, este panel muestra cuántas transferencias gratuitas tienes hasta el final del mes.<br>Si no tienes transacciones gratuitas, este panel también muestra el valor de la transacción junto con los impuestos.

![PrintScreen](/assets/Transfers/Transfers_02_es.png)

3. Haz clic en _**Solicitar transferencia**_. Aparece una ventana de confirmación para confirmar el monto a transferir, el valor a debitar de tu cuenta y la cuenta de destino.<br>Haz clic en _**Aceptar**_ para confirmar o en _**Rechazar**_ para descartar la operación.

<img src="/assets/Transfers/Transfers_03_es.png" alt="PrintScreen" width="50%"/><br>

4. Aparece el resultado de la operación. Ten en cuenta la cantidad de días para reflejar el dinero en la cuenta objetivo.

<img src="/assets/Transfers/Transfers_04_es.png" alt="PrintScreen" width="50%"/><br>

Tan pronto como la solicitud ha sido enviada con éxito, la transferencia está en estado _En proceso_ y puedes verla en la sección _**Reporte de transferencias realizadas**_ al final del módulo; Además, la cantidad solicitada se debita de tu saldo.<br>Si las transferencias no pudieron ser procesadas, esta cantidad se regresa a tu cuenta y no se cobra ninguna tarifa por esta operación.

## Programar Transferencias {#schedule-transfers}

Puedes automatizar las transferencias y solicitar el retiro dado un monto fijo o cada cierto tiempo.

{{% alert title="Nota" color="info"%}}
* <img src="/assets/Brasil.png" width="20px"/> _**Programar transferencia**_ no está disponible para Brasil.
* Al programar transferencias, debes tener fondos suficientes para el momento en que se ejecute la transferencia.
{{% /alert %}}

Para programar una transferencia, sigue estos pasos.

1. Inicia sesión en tu cuenta PayU. En el menú de la izquierda, expande el menú _**Transferencias**_ y selecciona _**Programar transferencia**_.

![PrintScreen](/assets/Transfers/Transfers_05_es.png)

2. Se abre el módulo de _**Programación de transferencias**_, aquí puedes ver todas las transferencias programadas que tienes configuradas. Haz clic en _**Programar transferencia**_ para configurar una nueva.

![PrintScreen](/assets/Transfers/Transfers_06_es.png)

{{% alert title="Opciones" color="info"%}}
La columna _opciones_ tiene las siguientes acciones:
* Editar (<img src="/assets/Transfers/Transfers_10.png" width="2%" style="vertical-align: top;"/>): te permite cambiar la configuración de la programación.
* Eliminar (<img src="/assets/Transfers/Transfers_11.png" width="2%" style="vertical-align: top;"/>): le permite desactivar la programación. Una vez que se elimina, no se pueden crear transferencias automáticas.
{{% /alert %}}

3. Selecciona cómo deseas programar la transferencia.

* **Programar Transferencias por Periodicidad**<br>
Esta opción te permite transferir una cantidad determinada cada cierto tiempo (días, semanas o meses). Para programar este tipo de transferencias, selecciona la opción _Periodicidad_.

* **Programar Transferencias por Saldo Disponible**<br>
Esta opción te permite transferir una cantidad determinada cada vez que el saldo alcanza un valor específico. Para programar este tipo de transferencias, selecciona la opción _Saldo disponible_.

Ingresa las siguientes opciones.

| Opción | Descripción |
|-|-|
| Realizar mi retiro cada | Selecciona la periodicidad de las transferencias que deseas programar. Esta opción está disponible para transferencias programadas por periodicidad.<br><br>![PrintScreen](/assets/Transfers/Transfers_07_es.png) |
| Cantidad de dinero que deseas retirar | Selecciona la cantidad que deseas transferir, puedes seleccionar el saldo total disponible o un valor fijo.<br><br>![PrintScreen](/assets/Transfers/Transfers_08_es.png) |
| Ingresa el valor a retirar | Selecciona la cantidad que deseas transferir. Este campo aparece al seleccionar la opción _Configurar valor_. |
| Iniciar mis transferencias a partir de | Seleccione la fecha de inicio de la programación. En esta fecha está programada la primera transferencia.<br><br>![PrintScreen](/assets/Transfers/Transfers_09_es.png) |
| Descripción | Ingresa una descripción significativa de tu transferencia. |

4. Cuando termines, haz clic en _**Programar Transferencia**_.