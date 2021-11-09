---
title: "Reporte de transferencias"
linkTitle: "Reporte de transferencias"
date: 2021-09-03T16:46:15-05:00
type: docs
Description: >
  Conoce el estado de las transferencias que has solicitado de los fondos recaudados en tu cuenta PayU.
weight: 20
---

Además, si tienes habilitado el API de Payouts, puedes consultar el estado de los pagos a terceros solicitados. Para más información, consulta [Payouts]({{< ref "Payouts.md" >}}).

{{% alert title="Note" color="info"%}}
<img src="/assets/Brasil.png" width="20px"/> El _**Reporte de transferencias**_ tiene las misma columnas y funcionalidades disponibles para el reporte de _**Transferencias diarias**_ (_**Transferencias**_ > _**Transferencias diarias**_).
{{% /alert %}}

## Permisos requeridos {#permission-required}
Para tener acceso a este módulo, necesitas un perfil con el permiso _Transferencias_ > _Consultar_ activado.

Consulta [Perfiles y Permisos]({{< ref"Profile-and-permissions-management.md" >}}) para más información.

## Consult the report
Ingresa a tu cuenta PayU. En el menú de la izquierda, expande el menú _**Transferencias**_ y selecciona _**Transferencias**_.

![PrintScreen](/assets/Transfers/Transfers_01_es.png)

Desplázate hacia abajo hasta la sección _**Reporte de transferencias realizadas**_ donde se encuentra la tabla del reporte. De forma predeterminada, el reporte muestra las transferencias creadas en los últimos 30 días desde la más reciente a la más antigua.

![PrintScreen](/assets/Reports/Reports_04_es.png)

El reporte tiene las siguientes columnas:

| Columna             | Descripción                                                                                         |
|---------------------|-----------------------------------------------------------------------------------------------------|
| ID                  | Id de la transferencia solicitada.                                                                  |
| Fecha de solicitud  | Fecha y hora en que se creó la transferencia.                                                       |
| Última gestión      | Fecha y hora de la última acción ejecutada en la transferencia.                                     |
| Valor debitado      | Monto de la transferencia junto con sus costos asociados.<br>Para saber estos costos, haz clic en el ícono <img src="/assets/Reports/Reports_05.png" width="2%" style="vertical-align: baseline;"/>.<br><br>![PrintScreen](/assets/Reports/Reports_06_es.png)               |
| Cuenta destino      | Cuenta bancaria de la transferencia.                                                                |
| Estado              | Último estado de la solicitud. Los posibles estados son: <ul style="margin-bottom: initial;"><li>Aprobada</li><li>En progreso</li><li>Rechazada</li></ul>                                                               |

{{% alert title="Nota" color="info"%}}
Si necesitas mostrar más información, consulta tu representante de ventas
{{% /alert %}}

Puedes filtrar las transferencias por la fecha de su creación utilizando el filtro de fechas en la esquina superior derecha.

<img src="/assets/Reports/Reports_07_es.png" alt="PrintScreen" width="60%"/><br>

El intervalo de fechas de este filtro es tres (3) meses antes de la fecha de fin. Si excedes este rango, el informe muestra la información de tres (3) meses después de la fecha de inicio.<br>Para ver la información de una fecha determinada, configúrala tanto para la fecha de inicio como para la fecha de fin.

## Descargar el reporte {#download-the-report}
Para descargar el reporte, haz clic en el botón _**Descargar**_ ubicado en la parte superior o inferior de la tabla del reporte. 

![PrintScreen](/assets/Reports/Reports_08_es.png)

Aparece una barra de progreso en la parte superior de la pantalla. Una vez finalizado el proceso, el reporte se descarga automáticamente en formato Excel (_.csv_). El nombre del reporte usa el formato _**[FechaDescargaEnMilisegundos]\_payment\_orders\_[AccountId].csv**_.

![PrintScreen](/assets/Reports/Reports_09.png)

{{% alert title="Nota" color="info"%}}
El reporte generado es almacenado durante 90 días en la sección [Mis reportes descargados]({{< ref "Reports.md#my-downloaded-reports" >}}).
{{% /alert %}}