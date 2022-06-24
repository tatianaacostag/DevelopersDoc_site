---
title: "Reporte de operaciones"
linkTitle: "Reporte de operaciones"
date: 2021-12-03T15:23:45-05:00
type: docs
Description: >
  Aprende a descargar los reportes sugeridos por la **CNBV**. Estos reportes están disponibles para comercios en México.
weight: 50
---
Los reportes de operaciones sugeridos por la _Comisión Nacional Bancaria y de Valores_ (CNBV) son reportes mensuales con una vigencia de tres (3) meses. Es decir, durante el mes en curso se podrá descargar los reportes del mes inmediatamente anterior y los dos meses anteriores a este.

{{% alert title="Nota" color="info"%}}
Para tener acceso a este módulo, necesitas un perfil con el permiso _Operation reports_ > _Consult operation reports_ activado.

Consulta [Perfiles y Permisos]({{< ref"Profile-and-permissions-management.md" >}}) para más información.
{{% /alert %}}

## Descargar los reportes {#download-the-reports}
Ingresa a tu cuenta PayU. En el menú de la izquierda, expande el menú _**Transacciones**_ y selecciona _**Reporte de operaciones**_.

![PrintScreen](/assets/OperationReports/OperationReports_01_es.png)

Selecciona el mes de las operaciones y los tipos de reportes que deseas generar y luego, haz clic en _**Descargar**_.<br>Como se mencionó anteriormente, solo puedes generar reportes para los tres meses anteriores.

![PrintScreen](/assets/OperationReports/OperationReports_02_es.png)

Tan pronto como se generan los reportes seleccionados, se descarga automáticamente una carpeta comprimida con los reportes en formato _.xlsx_.<br>Las siguientes secciones explican los reportes que puedes generar junto con sus columnas.

{{% alert title="Note" color="info"%}}
Si no tienes transacciones en el mes seleccionado, los reportes descargados corresponden a una plantilla estándar con valores en cero.
{{% /alert %}}

### Cargos por transacciones {#transaction-charges}
Este reporte se puede generar para un mes determinado y tiene los siguientes campos:

| | Campo | Descripción |
|:-:|---|---|
| A | Monto Facturado Total | Valor total en pesos (**MXN**) de las transacciones del mes. |
| B | Número de pagos debidamente autorizados | Número de pagos autorizados del mes. |
| C | Tasa de descuento (%) | La comisión que cobra el banco adquirente a los comercios por instalar Puntos de Venta (TPV) y brindar el acceso a la red que permite la aceptación de pagos con tarjetas bancarias. Comisión de tramitación fija y/o variable. |
| D | Monto cargado por tasa de descuento | El valor resultante en pesos (**MXN**) después de aplicar el porcentaje de la _**Tasa de descuento**_. Es decir, _Columna A_ × _Columna C_. |
| E | Cuotas por otros conceptos o penalizaciones | Cargos adicionales además de la _**Tasa de descuento**_. |
| F | Monto total por servicios de recepción de pagos con tarjeta | El resultado de sumar la _Columna D_ y la _Columna E_, si aplica. |

### Comisiones por otros conceptos o penalizaciones {#commissions-for-other-concepts-or-penalties}
Este es un reporte detallado de la _Columna C_ (_**Cuotas por otros conceptos o penalizaciones**_) en el [Reporte de Cargos por transacciones]({{< ref"#transaction-charges" >}}). Este reporte se puede generar para un mes determinado e incluye todos los conceptos del mes y la suma de cada uno.

### Cargos relacionados a las TPVs {#tpvs-related-charge}
Para descargar este reporte, desmarca las casillas _**Cargos por transacciones**_ y _**Comisiones por otros conceptos o penalizaciones**_. Este reporte se puede generar para un mes determinado y tiene los siguientes campos:

| Campo | Descripción |
|:-:|---|---|
| Uso de las terminales punto de venta | Importe en pesos (**MXN**) cobrado al cliente por el uso del Terminal Punto de Venta (TPV). |
| Mantenimiento de las terminales punto de venta <sup>\*</sup> | Importe cobrado al cliente por el mantenimiento del Terminal Punto de Venta (TPV). |
| Uso de aplicaciones tecnológicas de recepción de Pagos con Tarjeta <sup>\*</sup> | Importe cobrado al cliente por usar la aplicación tecnológica. |
| Cuotas por incumplimiento en facturación mínima / penalizaciones <sup>\*</sup> | Importe que se cobra al cliente en caso de que incurra en algún incumplimiento o penalización por facturación mínima. |
| Total cargos relacionados a terminales punto de venta | El resultado de la suma de todos los conceptos relacionados con el Terminal Punto de Venta (TPV). |

<sup>\*</sup>Especifica la periodicidad: mensual, anual, etc.