---
title: "Transferencias"
linkTitle: "Transferencias"
date: 2021-09-03T16:42:07-05:00
type: docs
Description: >
 Aprende cómo recibir el diner de tu cuenta PayU en tu cuenta bancaria. Adicionalmente, aprende cómo automatizar transferencias periodicamente o por monto.
weight: 20
---

En el módulo de _Transferencias_, puede encontrar las opciones para transferir los fondos recaudados en tu cuenta PayU virtual a tu cuenta bancaria principal registrada.

## Consideraciones {#considerations}
Ten en cuenta las siguientes consideraciones antes de transferir fondos a tu cuenta bancaria.

* Debes tener tu información bancaria actualizada y validada. Ten en cuenta que si has solicitado la actualización de tu cuenta bancaria, las transferencias que realices se envían a la cuenta bancaria anterior hasta que nuestro equipo de Riesgos la haya validado.
* Como PayU en Brasil no es una institución de pago, los fondos recaudados en tu cuenta PayU se transfieren a tu cuenta bancaria diariamente de forma gratuita. Para consultar el estado de estas transferencias, utiliza la opción _**Transferencias diarias**_ (_**Transferencias**_ > _**Transferencias diarias**_).
* Las tres primeras transferencias locales realizadas durante el primer mes son gratuitas. Desde la cuarta solicitud de transferencia, PayU cobra los siguientes valores:
  - Colombia: 6.500,00 COP + VAT (Colombia)
  - Perú: 10,00 PEN + IGV (Perú),
  - Argentina: $ 10,00 ARS+ IVA (Argentina),
  - Chile: 0,00 CLP
  - México: 0,00 MXN
* La primera transferencia demora cinco (5) días en depositarse en la cuenta bancaria. El área de Riesgo de PayU solicita un sustento de las ventas en la primera transferencia como proceso administrativo.
* La segunda y las siguientes transferencias toman un máximo de tres (3) días hábiles.
* Las transferencias se pueden programar por Monto y por Fecha

{{% alert title="Nota" color="warning"%}}
Los tiempos y montos explicados aquí aplican solo para transferencias locales (al mismo país de operación) para transferencias internacionales, comunícate con tu representante de ventas.
{{% /alert %}}

## Permisos requeridos {#permission-required}
Para tener acceso a este módulo, necesitas un perfil con los siguientes permisos activos:

* _Transferencias_ > _Consultar_
* _Transferencias_ > _Administrar_<br>Este permiso te permite realizar transferencias.	

Consulta [Perfiles y Permisos]({{< ref"Profile-and-permissions-management.md" >}}) para más información.

## Transferir fondos {#transfer-funds}
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

## Programar transferencias {#schedule-transfers}
Puedes automatizar las transferencias y solicitar el retiro dado un monto fijo o cada cierto tiempo.

{{% alert title="Nota" color="info"%}}
Al programar transferencias, debes tener fondos suficientes para el momento en que se ejecute la transferencia.
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

* **Programar transferencias por periodicidad**<br>
Esta opción te permite transferir una cantidad determinada cada cierto tiempo (días, semanas o meses). Para programar este tipo de transferencias, selecciona la opción _Periodicidad_.

* **Programar transferencias por saldo disponible**<br>
Esta opción te permite transferir una cantidad determinada cada vez que el saldo alcanza un valor específico. Para programar este tipo de transferencias, selecciona la opción _Saldo disponible_.

Ingresa las siguientes opciones.

| Opción | Descripción |
|---|---|
| Realizar mi retiro cada | Selecciona la periodicidad de las transferencias que deseas programar. Esta opción está disponible para transferencias programadas por periodicidad.<br><br>![PrintScreen](/assets/Transfers/Transfers_07_es.png) |
| Cantidad de dinero que deseas retirar | Selecciona la cantidad que deseas transferir, puedes seleccionar el saldo total disponible o un valor fijo.<br><br>![PrintScreen](/assets/Transfers/Transfers_08_es.png) |
| Ingresa el valor a retirar | Selecciona la cantidad que deseas transferir. Este campo aparece al seleccionar la opción _Configurar valor_. |
| Iniciar mis transferencias a partir de | Seleccione la fecha de inicio de la programación. En esta fecha está programada la primera transferencia.<br><br>![PrintScreen](/assets/Transfers/Transfers_09_es.png) |
| Descripción | Ingresa una descripción significativa de tu transferencia. |

4. Cuando termines, haz clic en _**Programar Transferencia**_.