---
title: "Reporte de ventas"
linkTitle: "Reporte de ventas"
date: 2021-09-03T16:45:07-05:00
type: docs
Description: >
  Revisa los detalles de los pagos recibidos, los métodos de pago más utilizados y clientes frecuentes.
weight: 10
---

{{% alert title="Nota" color="info"%}}
Los reportes en el Módulo PayU están limitados a **20 mil** filas para visualización y descarga. Si necesitas tener reportes personalizados o mostrar más información, comunícate con tu representante de ventas.
{{% /alert %}}

## Permisos requeridos {#permission-required}
Para tener acceso a este módulo, necesitas un perfil con el permiso _Reportes_ > _Reporte de Ventas_ activado.

Consulta [Perfiles y Permisos]({{< ref"Profile-and-permissions-management.md" >}}) para más información.

## Consultar el reporte {#consult-the-report}
Ingresa a tu cuenta PayU. En el menú de la izquierda, expande el menú _**Transacciones**_ y selecciona _**Reporte de Ventas**_.

![PrintScreen](/assets/Refunds/Refunds_es_04.png)

En el reporte, puedes ver un cuadro de filtro y la lista de tus últimas ventas. De forma predeterminada, el reporte muestra la información de ventas<sup>\*</sup> de los últimos siete días, desde el más reciente al más antiguo.

<sup>*</sup>_Limitado a 20 mil registros._

![PrintScreen](/assets/Reports/Reports_10_es.png)

El reporte tiene las siguientes columnas:

| Columna             | Descripción                                                                                           |
|---------------------|-------------------------------------------------------------------------------------------------------|
| Orden               | Esta columna muestra el identificador de la orden junto con la fecha de la venta.                     |
| Referencia          | Esta columna muestra la referencia de venta y el nombre del producto o servicio ofrecido.             |
| Comprador           | Esta columna muestra el nombre y la dirección de correo electrónico de la persona que hizo la compra. |
| Monto               | Monto de la venta.                                                                                    |
| Método de pago      | Información del método de pago utilizado por el comprador.                                            |
| Estado              | Estado actual de la orden.                                                                            |

{{% alert title="Nota" color="info"%}}
Si necesitas mostrar más información, consulta tu representante de ventas
{{% /alert %}}

Consulta los [detalles de la orden]({{< ref "#transaction-details" >}}) para conocer todo el detalle de la transacción de la venta.

## Filtrar el reporte {##filter-the-report}
Puedes utilizar la barra de búsqueda sobre el gráfico o el calendario para establecer filtros. Puedes filtrar por _**Referencia**_, _**Orden**_, _**Comprador**_, _**Monto**_, _**estado**_ o _**Método de pago**_.

Para establecer un filtro, haz clic en el campo _**Filtre su búsqueda**_ sobre la tabla del reporte.

<img src="/assets/Reports/Reports_11_es.png" alt="PrintScreen" width="60%"/><br>

Configura los valores de los filtros y haz clic en _**Buscar**_. Una vez hayas hecho clic, la tabla de filtros muestra las ventas que cumplen con los criterios seleccionados.

Junto con estos filtros, también puedes establecer un período de tiempo en el que el comprador realizó la compra utilizando el filtro de fechas en la esquina superior derecha.

<img src="/assets/Reports/Reports_12_es.png" alt="PrintScreen" width="60%"/><br>

El rango de fechas de este filtro es un (1) mes antes de la fecha final. Si excedes este rango, el reporte muestra la información de un (1) mes después de la fecha de inicio.<br>Para ver la información de una fecha específica, configúrala tanto para la fecha de inicio como para la fecha fin.

## Detalles de la transacción {#transaction-details}
Puedes revisar los detalles de la transacción en línea. Para hacer esto, haz clic en el pedido que quieras consultar en la tabla de reporte. Los detalles de la transacción aparecen en el panel derecho.

![PrintScreen](/assets/Reports/Reports_13_es.png)

El panel _**Detalles de la transacción**_ tiene las siguientes secciones:

<img src="/assets/Reports/Reports_14_es.png" alt="PrintScreen" width="50%"/><br>

<div class="variables"></div>

|  | Nombre | Descripción |
|:---:|---|---|
| 1 | Información de la orden | Esta sección muestra el ID de la orden, su última fecha de actualización, su estado junto con la descripción del mismo y la referencia de venta. |
| 2 | Producto o servicio | Descripción del producto o servicio que brindó en la venta. |
| 3 | Método de pago | Información del Método de pago utilizado en la compra. La información que se muestra en esta sección varía según el método de pago.<br>Para pagos en efectivo pendientes, esta sección le permite ver el recibo de pago generado para el comprador. |
| 4 | Valores | Esta sección muestra los valores involucrados en esta transacción, como el _Valor a cobrar (o cobrado)_, _Valor pendiente_, _Valor reembolsado_ (para reembolsos), _Valor expirado_ (Para pagos en efectivo).  |
| 5 | Información del Comprador | Información de la persona que realizó la compra. |
| 6 | Información de envío | Información de las opciones de envío. |
| 7 | Esta compra tuvo | Transacciones asociadas e esta compra. Haz clic en el simbolo **▾** para encontrar el [histórico de las transacciones]({{< ref "#transaction-history" >}}).<br><br>![PrintScreen](/assets/Reports/Reports_15_es.png) |
| 8 | Actions | Acciones disponibles sobre la orden. |

### Histórico de la transacción {#transaction-history}
Cuando expandes la sección _**Esta compra tuvo**_, puedes ver los detalles de cada transacción asociada a una orden.

<img src="/assets/Reports/Reports_16_es.png" alt="PrintScreen" width="50%"/><br>

La información disponible incluye los valores debitados de tu cuenta, el método de pago, la información del pagador y más.

## Descargar el reporte {#download-the-report}
Para descargar el reporte, haz clic en el botón _**Descargar**_ ubicado en la parte superior o inferior de la tabla del reporte. 

![PrintScreen](/assets/Reports/Reports_17_es.png)

Aparece una ventana emergente donde puedes seleccionar las opciones para generar el reporte:
* **Reporte**: te permite generar un reporte con el estado de las órdenes y el estado final de la última transacción o intento de compra relacionado con esa orden.
* **Versión del antiguo Módulo Administrativo**: te permite generar un reporte con todas las transacciones y muestra la información del comprador y pagador (correo electrónico, nombre, número de documento)<sup>\*</sup>.

<img src="/assets/Reports/Reports_18_es.png" alt="PrintScreen" width="50%"/>

{{% alert title="Nota" color="info"%}}
<sup>\*</sup> Si el formato del archivo no se ajusta a tus necesidades, comunícate con tu ejecutivo de ventas para conocer más sobre la opción de enviar archivos a través de SFTP y las plantillas que tenemos para este reporte.
{{% /alert %}}

El reporte se descarga automáticamente en formato de Excel (_.csv_). El nombre del reporte utiliza los siguientes formatos
* Opción **Reporte**: _[FechaDescargaEnMilisegundos]\_orders\_[AccountId].csv_
* Opción **Versión del antiguo Módulo Administrativo**: _[AccountId]\_[FechaDescarga]\_transactions.csv_<sup>\*</sup>

<sup>\*</sup> _fecha de descarga en formato **dd-mm-yy-hh-mm-ss**_

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;margin: 10px;">
    <a href="/assets/SampleReports/1632771735723_orders_546703.csv">Descarga un ejemplo del archivo generado utilizando la opción <i><b>Report</b></i>.</a>
  </div>
  <div style="float: left;width: 50%;text-align: center;margin: 10px;">
    <a href="/assets/SampleReports/546703_27-09-2021-14-52-58.486_transactions.csv">Descarga un ejemplo del archivo generado utilizando la opción <i><b>Balance from previous secure</b></i>.</a>
  </div>
</div>

{{% alert title="Nota" color="info"%}}
El reporte generado es almacenado durante 90 días en la sección [Mis reportes descargados]({{< ref "Reports.md#my-downloaded-reports" >}}).
{{% /alert %}}