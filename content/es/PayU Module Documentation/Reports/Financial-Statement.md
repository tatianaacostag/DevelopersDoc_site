---
title: "Balance financiero"
linkTitle: "Balance financiero"
date: 2021-09-03T16:45:26-05:00
type: docs
Description: >
  Obten más información sobre los fondos acreditados en tu cuenta PayU y sus movimientos. En esta sección, también puedes conocer los datos disponibles en este reporte.
weight: 30
---

{{% alert title="Nota" color="info"%}}
Los reportes en el Módulo PayU están limitados a **20 mil** filas para visualización y descarga. Si necesitas tener reportes personalizados o mostrar más información, comunícate con tu representante de ventas.
{{% /alert %}}

## ¿Qué es el Balance financiero? {#what-is-the-financial-statement}
El Balance financiero te ayuda a identificar los movimientos (descuentos de comisiones, tarifas de transferencia, reversiones) de tu cuenta PayU. Este reporte muestra el resumen de la cuenta, con los débitos y abonos realizados durante el mes, y la información del saldo disponible.

Además, el Balance financiero ayuda al área contable a conciliar todas las operaciones comerciales de comercio electrónico.

## Permisos requeridos {#permission-required}
Para tener acceso a este módulo, necesitas un perfil con el permiso following permissions enabled

* _Movimientos_ > _Reporte de Balance_	
* _Movimientos_ > _Descargar reporte CSV_<br>Este permiso debe estar habilitado para permitirle descargar el informe..

Consulta [Perfiles y Permisos]({{< ref"Profile-and-permissions-management.md" >}}) para más información.

## Consultar el reporte {#consult-the-report}
Ingresa a tu cuenta PayU. En el menú de la izquierda, expande el menú _**Transacciones**_ y selecciona _**Balance financiero**_. De forma predeterminada, el reporte muestra la información de la operación <sup>\*</sup> de los últimos 30 días desde la más reciente a la más antigua.

<sup>*</sup>_Limitado a 20 mil registros._

![PrintScreen](/assets/Reports/Reports_19_es.png)

La sección de **_Balance financiero_** está divida en tres partes:

### Saldo General {#general-balance}
La primera parte es el saldo general donde puedes ver los fondos en tu cuenta PayU y un botón que te permite solicitar una [transferencia]({{< ref "Transfers.md" >}}) a tu cuenta bancaria.<br>El Saldo general se compone de:

* **Saldo disponible**: los fondos totales recibidos de tus ventas, luego de descontar la comisión de PayU.
* **Saldo congelado**: los fondos que hacen parte de una [disputa]({{< ref "Disputes.md" >}}) en proceso o un [reembolso]({{< ref "Refunds.md" >}}) no aprobado solicitado por tu cliente.
* **Saldo total**: el dinero que puedes transferir a tu cuenta. Consiste del **Saldo disponible** menos **Saldo congelado**.

![PrintScreen](/assets/Reports/Reports_20_es.png)

### Gráfico de ventas realizadas {#sales-made-chart}
En la segunda parte, puedes entender la distribución de costos (incluidos impuestos y costos relacionados con la transacción) y analizar los gráficos de ventas y circular que resumen toda esta información.

Los gráficos muestran la información disponible en el rango de fechas seleccionado.

![PrintScreen](/assets/Reports/Reports_21_es.png)

El gráfico circular proporciona la siguiente información:

* **Ventas realizadas**: es el valor total de tus ventas antes de impuestos y tarifa PayU, son tus ingresos durante el período consultado.
* **Impuestos**: son los cargos adicionales generados según tu régimen fiscal. Si tu régimen tributario es diferente, comunícate con sac@payu.com.
* **Tarifa PayU**: es el costo de procesamiento de PayU, incluido el porcentaje de ventas más la tarifa fija aplicada a tu cuenta.

### Tabla del reporte {#report-table}
En la última parte debajo de los gráficos, se encuentra una tabla con la información de crédito y débito de las últimas operaciones. Puedes ver el tipo de operación y el valor (crédito o débito) de cada fila.

![PrintScreen](/assets/Reports/Reports_22_es.png)

El reporte tiene las siguientes columnas:

| Columna             | Descripción                                                                                        |
|---------------------|----------------------------------------------------------------------------------------------------|
| Operación           | ID y fecha de la operación.                                                                        |
| Tipo de operación   | Información de la operación. Dependiendo de su tipo, la información que se muestra varía.<br>Haz clic en <img src="/assets/Reports/Reports_23.png" width="2%"/> para expandir los valores detallados de la operación en las columnas **Débito** y **Crédito**.<br><br>![PrintScreen](/assets/Reports/Reports_24_es.png) |
| Crédito              | Monto acreditado a tu Cuenta.                                                                     |
| Débito               | Monto debitado de tu Cuenta.                                                                      |

{{% alert title="Nota" color="info"%}}
Haz clic en el ícono <img src="/assets/Reports/Reports_25.png" width="1.5%"/> junto al título _**Valor**_ para unir las columnas **débito** y **crédito**; el valor resultado es **débito** menos el valor positivo de **crédito**.<br>Por ejemplo, si el valor de la columna **débito** es _$3.296,63_ y el valor de la columna **crédito** es _$950,00_, el valor de la columna resultante luego de unirlas es _$2.346,63_.

![PrintScreen](/assets/Reports/Reports_26_es.png)
{{% /alert %}}

## Filtrar el reporte {##filter-the-report}
Puedes utilizar la barra de búsqueda sobre el gráfico o el calendario para establecer filtros. Puedes filtrar por _**Tipo de operación**_, _**Id de venta o transferencia**_, _**Referencia**_<sup>\*</sup>, o _**Método de pago**_<sup>\*</sup>.

<sup>\*</sup> _Estos filtros se muestran cuando el **Tipo de operación** seleccionado es **Venta**, **Reversión** o **Contracargada**_.

Para establecer un filtro, haz clic en el campo _**Filtre su búsqueda**_ sobre el gráfico de de ventas realizadas.

<img src="/assets/Reports/Reports_27_es.png" alt="PrintScreen" width="60%"/><br>

Configura los valores de los filtros y haz clic en _**Buscar**_. Una vez hayas hecho clic, la tabla de filtros muestra las ventas que cumplen con los criterios seleccionados

Junto con estos filtros, también puedes establecer un período de tiempo en el que el comprador realizó la compra utilizando el filtro de fechas en la esquina superior derecha.

<img src="/assets/Reports/Reports_28_es.png" alt="PrintScreen" width="60%"/><br>

El rango de fechas de este filtro es tres (3) meses antes de la fecha final. Si excedes este rango, el reporte muestra la información de tres (3) meses después de la fecha de inicio.<br>Para ver la información de una fecha específica, configúrala tanto para la fecha de inicio como para la fecha fin.

## Descargar el reporte {#download-the-report}
Para descargar el reporte, haz clic en el botón _**Descargar**_ ubicado en la parte superior o inferior de la tabla del reporte. 

![PrintScreen](/assets/Reports/Reports_29_es.png)

Aparece una ventana emergente donde puedes seleccionar las opciones para generar el reporte<sup>\*</sup>.

<img src="/assets/Reports/Reports_30_es.png" alt="PrintScreen" width="50%"/>

{{% alert title="Nota" color="info"%}}
<sup>\*</sup> Si el formato del archivo no se ajusta a tus necesidades, comunícate con tu ejecutivo de ventas para conocer más sobre la opción de enviar archivos a través de SFTP y las plantillas que tenemos para este reporte..
{{% /alert %}}

El reporte se descarga automáticamente en formato de Excel (_.csv_). El nombre del reporte utiliza los siguientes formatos
* Opción **CSV con lo que estás viendo en pantalla**: _[FechaDescargaEnMilisegundos]\_statement\_report\_[AccountId].csv_
* Opción **Versión del antiguo Módulo Administrativo**: _[AccountId]\_[FechaDescarga]\_transactions.csv_<sup>\*</sup>

<sup>\*</sup> _fecha de descarga en formato **dd-mm-yy-hh-mm-ss**_

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;margin: 10px;">
    <a href="/assets/SampleReports/1632847567058_statement_report_546703.csv">Descarga un ejemplo del archivo generado utilizando la opción <i><b>CSV con lo que estás viendo en pantalla</b></i>.</a>
  </div>
  <div style="float: left;width: 50%;text-align: center;margin: 10px;">
    <a href="/assets/SampleReports/546703_28-09-2021-11-48-07.285_transactions.xls">Descarga un ejemplo del archivo generado utilizando la opción <i><b>Versión del antiguo Módulo Administrativo</b></i>.</a>
  </div>
</div>
<br>

En el reporte descargado, puedes validar todos los créditos y débitos de tu cuenta y además, puedes conciliar las comisiones de PayU que aparecen en la factura recibida mensualmente.

![PrintScreen](/assets/Reports/Reports_31.png)
_Las comisiones e impuestos de PayU aparecen en la factura_

Para conciliar la información con el [reporte de ventas] ({{< ref "Sales-report.md" >}}), puedes usar la variable _**ReferenceCode**_ que aparece entre paréntesis en la transacción.

![PrintScreen](/assets/Reports/Reports_32.png)

En el reporte generado encontrarás los siguientes conceptos.

| Concepto                             | Descripción                                                                           |
|--------------------------------------|---------------------------------------------------------------------------------------|
| **SALES**                            | Monto aprobado de la transacción.                                                     |
| **POL_COMMISSION**                   | Comisión PayU: Porcentaje fijo establecido para el comercio + valor fijo establecido. |
| **IVA_POL_COMMISSION**               | Comisión de impuestos.                                                                |
| **IVA_RETENTION**                    | Retención de IVA.<sup>\*</sup>                                                        |
| **RENTA_RETENTION**                  | Retención de Retefuente.<sup>\*</sup>                                                 |
| **ICA_RETENTION**                    | Retención de ICA.<sup>\*</sup>                                                        |
| **RETENTION SALES**                  | Reembolso de transacción.                                                             |
| **RETENTION POL_COMMISSION**         | Reembolso de la Comisión de PayU.                                                     |
| **RETENTION IVA_POL_COMMISSION**     | Reembolso del impuesto de la Comisión de PayU.                                        |
| **RETENTION IVA_RETENTION**          | Reembolso de la retención del IVA.                                                    |
| **RETENTION RENTA_RETENTION**        | Reembolso de la retención de la Retefuente.                                           |
| **RETENTION ICA_RETENTION**          | Reembolso de la retención de ICA.                                                     |
| **PAYMENT_ORDER**                    | Transferencia del Saldo disponible a la cuenta bancaria registrada.                   |
| **PAYMENT_ORDER_POL_COMMISSION**     | Costo de transferencia.                                                               |
| **IVA_PAYMENT_ORDER_POL_COMMISSION** | Impuesto de transferencia.                                                            |
| **FREEZE_FUND**                      | Saldo congelado (reembolsos o disputas).                                              |
| **UNFREEZE_FUND**                    | Liberación de las cantidades congeladas.                                              |
| **CHARGEBACK**                       | Contracargo o disputa perdida.                                                        |
| **DISCRETIONARY**                    | Movimiento discrecional o crédito adicional a la cuenta.                              |

<sup>\*</sup> _Aplica solo a transacciones con tarjeta de crédito._

{{% alert title="Nota" color="info"%}}
El reporte generado es almacenado durante 90 días en la sección [Mis reportes descargados]({{< ref "Reports.md#my-downloaded-reports" >}}).
{{% /alert %}}