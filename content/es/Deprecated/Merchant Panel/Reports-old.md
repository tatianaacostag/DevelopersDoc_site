---
title: "Reportes"
linkTitle: "Reportes"
date: 2021-11-18T13:40:06-05:00
type: docs
Description: >
   Información de los reportes mostrados en el Módulo Administrativo.
weight: 24
---

{{% alert title="Nota" color="warning"%}}
Este artículo ha sido deprecado y no se ofrece a comercios nuevos.
{{% /alert %}}

## Reportes de órdenes
En este reporte podrás ver la información general de las ventas realizadas a través de tu cuenta PayU y conocer el estado de cada una de ellas (si están en proceso, fueron pagadas o reembolsadas). Una orden puede tener asociadas varias transacciones, PayU almacena los intentos de pago relacionados a una orden; por ejemplo si vendes unos zapatos y tu cliente intenta pagar con una tarjeta de crédito VISA que no es válida, tu cliente podrá realizar el pago nuevamente con una tarjeta de crédito MasterCard, cada intento de pago se registrará dentro de la orden como una transacción diferente.  

1. Puedes acceder desde el menú _**Reportes**_ haciendo clic sobre la opción _**Órdenes**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/ordenes1-es.jpg)
 
2. Puedes realizar un filtro de este reporte por:
* _**Rango de fechas**_: Te permite definir el rango de fechas entre los cuales deseas realizar la consulta. El límite de la consulta es de 3 meses.
* _**Estado**_: Te permite seleccionar el estado de las órdenes que deseas consultar.

<details>
<summary>Estados de la orden</summary>
<br>

* _Iniciada_: Estado inicial con el que se crea una orden, ya sea porque el pagador aún no ha seleccionado un medio de pago o porque se trata de una reserva.
* _En progreso_: Aún se espera el pago de la orden (estado común en pago con efectivo ya que requiere que el pagador consigne el dinero en la entidad financiera).
* _Capturada_: Orden que ha sido pagada.
* _Cancelada_: Orden que fue cancelada por decisión del pagador o porque el tiempo de pago expiró.
* _Declinada_: El proceso ha finalizado, ya sea por rechazo del módulo antifraude o de la entidad bancaria.
* _Reembolsada_: Se ha realizado la devolución del dinero proveniente de una venta.

</details>
<br>

* _**Tipos de transacción**_: Te permite elegir el tipo de transacción relacionada a una orden. Una orden puede tener diferentes tipos de transacciones asociadas.

<details>
<summary>Tipos de transacción</summary>
<br>

* _Autorización_: Transacción autorizada.
* _Autorización y Captura_: Transacción autorizada y pagada.
* _Captura_: Transacción de pago.
* _Cancelación_: Transacción cancelada antes de realizar el movimiento financiero.
* _Anulación_: Transacción en la que ya se realizó el movimiento financiero y se requiere una cancelación (previa a reembolso).
* _Reembolso_: Devolución del dinero.

</details>
<br>

* _**Medio de pago**_: Despliega cada una de las opciones en las que tus clientes pueden realizar un pago, ya sea por franquicias como VISA o Mastercard, o por medios de pagos en efectivo como Baloto, OXXO y BCP; o por transferencia bancaria.
* _**Formato**_: Te permite mostrar el resultado de la consulta en pantalla al elegir el formato HTML, o exportar el resultado a un archivo Excel.
 
{{% alert title="Nota" color="info"%}}
Puedes consultar datos relacionados a la orden como el identificador, la referencia de venta o e-mail del pagador en la opción de búsqueda avanzada.
{{% /alert %}}

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/ordenes2-es.jpg)

3. El resultado de la consulta es el conjunto de órdenes que cumplen las condiciones definidas en los filtros del reporte, mostrando información puntual como el Id de la orden, el número de referencia de la venta y el valor de la transacción entre otros.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/ordenes3-es.jpg)

4. En caso de que desees ampliar la información puedes hacer clic sobre una de las órdenes; el sistema mostrará una pantalla con información detallada, incluyendo las transacciones asociadas.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/ordenes4-es.jpg)

## Reporte de transacciones
A partir de este reporte podrás consultar todas las transacciones relacionadas a un proceso de pago y la orden a la que pertenecen. Obteniendo información más específica sobre intentos de pago de una orden, reversiones realizadas, datos del pagador etc.

{{% alert title="Nota" color="info"%}}
En algunos casos los datos del comprador y del pagador pueden diferir ya que la persona que ordena la compra a través de la página web no es la misma que realiza el pago.
{{% /alert %}}
 
1. Puedes acceder desde el menú _**Reportes**_ haciendo clic sobre la opción _**Transacciones**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/transacciones1-es.jpg)
 
2. Podrás realizar la consulta filtrando por:
* _**Cuenta**_: En caso de que tengas varias cuentas, te permite seleccionar con cual deseas realizar la consulta de transacciones.
* _**Rango de fechas**_: Te permite definir el rango de fechas en los cuales deseas realizar la consulta. El límite de la consulta es de 3 meses entre las fechas ingresadas.
* _**Estado**_: Permite que selecciones el estado de las transacciones que deseas consultar.
 
<details>
<summary>Estados de la transacción</summary>
<br>

* _Aprobada_: El resultado de la transacción fue satisfactorio.
* _Declinada_: La transacción fue cancelada.
* _Error_: Error de procesamiento de la transacción.
* _Pendiente_: Pendiente por respuesta de la transacción.
* _Expirada_: El tiempo de espera de la respuesta en la transacción ha terminado.

</details>
<br>

* _**Código de respuesta**_: Despliega un listado de los posibles códigos de respuesta que puede tener una transacción y te permite filtrar la consulta por un código específico.
* _**Tipo de transacción**_: Puedes elegir el tipo de transacción relacionada a una orden.

<details>
<summary>Tipos de transacción</summary>
<br>

* _Autorización_: Transacción autorizada.
* _Autorización y Captura_: Transacción autorizada y pagada.
* _Captura_: Transacción de pago.
* _Cancelación_: Transacción cancelada antes de realizar el movimiento financiero.
* _Anulación_: Transacción en la que ya se realizó el movimiento financiero y se requiere una cancelación.(previa a reembolso)
* _Reembolso_: Devolución del dinero.

</details>
<br>

* _**País**_: Te permite consultar el país desde el cual se generó la transacción de venta.
* _**Medio de pago**_: Despliega cada una de las posibles opciones en que tus clientes pueden realizar un pago, ya sea por franquicias como VISA o Mastercard, o por medios de pagos en efectivo como como Baloto, OXXO y BCP o por transferencia bancaria.
* _**Formato**_: Permite mostrar el resultado de la consulta en pantalla al elegir el formato HTML o exportar el resultado a un archivo Excel.
 
![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/transacciones2-es.jpg)
 
3. El resultado de la consulta es el conjunto de transacciones que cumplen las condiciones definidas en los filtros del reporte, mostrando información como el ID de la orden al cual se encuentra relacionada una transacción, la fecha en que se llevó a cabo, el Id y el valor entre otros.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/transacciones3-es.jpg)

## Reporte gráfico
Esta opción te permite generar gráficos con la información de las ventas o las transacciones generadas en un periodo de tiempo específico.  

1. Puedes acceder desde el menú _**Reportes**_ haciendo clic sobre la opción _**Reporte gráfico**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/grafico1-es.jpg)

2. El reporte te permite filtrar por:
* _**Línea de tiempo**_: Te permite realizar la consulta en varios tipos de rango de tiempos, permitiéndote ver la información por días, semanas o meses.
* _**Rango de fechas**_: Te permite definir el rango de fechas en los cuales deseas realizar la consulta. El límite de la consulta es de 3 meses. ![](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/obligatorio.png)
* _**Estado**_: Puedes seleccionar el estado de las transacciones que deseas consultar.

<details>
<summary>Estados de la transacción</summary>
<br>

* _Aprobada_: El resultado de la transacción fue satisfactorio.
* _Declinada_: La transacción fue cancelada.
* _Error_: Error de procesamiento de la transacción.
* _Pendiente_: Pendiente por respuesta de la transacción.
* _Expirada_: El tiempo de espera de la respuesta en la transacción ha terminado.

</details>
<br>

* _**País**_: Te permite realizar la consulta de transacciones según el país en el cual se genera la transacción.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/grafico2-es.jpg)
 
3. El resultado de la consulta puede ser visualizado por medio de un gráfico de líneas o por un gráfico de columnas, que resumen el comportamiento de las transacciones según las condiciones definidas en el filtro.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/grafico3-es.jpg )
 
## Certificado de retenciones
Si tu comercio es Colombiano y debes presentar certificado de retenciones para la declaración de renta, el módulo administrativo te permite generar de manera automática un documento con la información necesaria.    

1. Puedes acceder desde el menú _**Reportes**_ haciendo clic sobre la opción _**Certificado de retenciones**_ y realizar el filtro de acuerdo al período de tiempo y cuenta deseada.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/retenciones1-es.jpg)
 
2. El resultado de la consulta es un documento en formato PDF que contiene toda información requerida por la legislación colombiana para tu declaración.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/retenciones2.jpg)
 
## Transferencias entre cuentas PayU
Estos reportes te permiten consultar todas las operaciones de transferencia de saldo disponible que se han llevado a cabo desde y hacia tus cuentas PayU.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/cuentaspayu1-es.jpg)
 
1. Podrás consultar aquellas transferencias que se han realizado desde tus cuentas en el módulo de _**Transferencias realizadas**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/cuentaspayu2-es.jpg)

Y de igual forma podrás consultar aquellas transferencias que se han realizado hacia tus cuentas en el módulo de _**Transferencias recibidas**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/cuentaspayu3-es.jpg)

2. En ambos reportes puedes realizar la consulta del período de tiempo en que se llevó a cabo la operación, las cuentas involucradas y el valor de la transferencia.

{{% alert title="Nota" color="info"%}}
Si quieres realizar la consulta de transferencias a cuentas que no pertenezcan a tu comercio debes tener el número _**cuenta id**_, que identifica la cuenta PayU latam que deseas consultar en nuestro sistema.
{{% /alert %}}

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/cuentaspayu4-es.jpg)

3. El resultado de la consulta será el reporte consolidado de transferencias entre cuentas PayU que cumplan con los valores solicitados.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/cuentaspayu5-es.jpg)

## Modelos de recaudo en Brasil
Si tienes una cuenta en Brasil que funcione a través del modelo de cuotas o del modelo de D+X días, en estos reportes podrás ver como las transacciones están siendo abonadas día a día, permitiéndote tener un mejor control del dinero proveniente de tus ventas en Brasil.

### Modelo D+X días
En este modelo tu comercio recibirá la totalidad del dinero de una venta una vez hayan transcurrido la cantidad de días que se definieron para tu cuenta.

**Ejemplo**: Si tú cuenta está configurada para abono de dinero a D+5 días, y tu cliente realiza una compra el día 1 de enero recibirás el abono de tu dinero el día 6 de enero.

#### Consultar tus pagos recibidos
1. Podrás consultar tus pagos recibidos en el módulo de _**Reportes**_ y haciendo clic sobre _**Pagos recibidos**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias1-es.png)
 
2. Según el modelo de acreditación y los parámetros que tengas configurados en tú cuenta el reporte te permite filtrar por:
* _**Cuenta**_: Te permite seleccionar la cuenta con la cual se deseas realizar la consulta de pagos recibidos. ![](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/obligatorio.png)
* _**Modelo de acreditación**_: Te permite seleccionar entre los dos modelos disponibles de acreditación para realizar la consulta, que en este caso es D+X días. ![](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/obligatorio.png)
* _**Rango de fechas**_: Te permite definir el rango de fechas en los cuales deseas realizar la consulta. El límite de la consulta es de 3 meses entre las fechas ingresadas. ![](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/obligatorio.png)
* _**Id de la orden**_: Te permite ingresar un número de orden específico para mirar si este ya fue acreditado a tu cuenta.
* _**Formato**_: Permite mostrar el resultado de la consulta en pantalla al elegir el formato HTML, o exportar el resultado a un archivo Excel.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias2-es.png)
 
3. El reporte mostrará la fecha en que se llevó a cabo la transacción de venta, la fecha en que fue acreditada en la cuenta, y los datos más importantes correspondientes a la transacción como lo son el ID de la orden al cual está relacionada la transacción, la referencia, el valor de la venta y el valor por concepto de intereses de la transacción.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias3-es.png)

#### Consultar tus pagos pendientes
1. Podrás consultar tus pagos en el módulo de _**Reportes**_ y haciendo clic sobre _**Pagos pendientes**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias4-es.png)
 
2. El reporte permite filtrar por:
* _**Cuenta**_: Permite seleccionar la cuenta con la cual deseas realizar la consulta de pagos pendientes. ![](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/obligatorio.png)
* _**Modelo de acreditación**_: Permite seleccionar entre los dos modelos disponibles de acreditación para realizar la consulta, en este caso D+X días. ![](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/obligatorio.png)
* _**Rango de fechas**_: Te permite definir el rango de fechas en los cuales deseas realizar la consulta. El límite de la consulta es de 3 meses entre las fechas ingresadas. ![](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/obligatorio.png)
* _**Formato**_: Permite mostrar el resultado de la consulta en pantalla al elegir el formato HTML, o exportar el resultado a un archivo Excel.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias5-es.png)
 
3. El reporte mostrará la fecha en que se llevó a cabo la transacción de venta, la fecha en que será acreditada la venta, la cantidad de días faltantes, y los datos más importantes correspondientes a la transacción. Como el ID de la orden al cual está relacionada la transacción, la referencia, el valor de la venta y el valor por concepto de intereses de la transacción.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias6-es.png)

### Modelo a cuotas
Tu comercio recibirá el dinero de las ventas realizadas mes a mes de acuerdo a la cantidad de cuotas definidas por tu cliente al momento de la compra.

**Ejemplo**: Si tu cliente realiza una compra el 1 de enero diferida a 6 meses, a partir del día de la compra mes a mes será abonada la cantidad de dinero correspondiente a la cuota durante 6 meses.

#### Consultar tus pagos recibidos
1. Podrás consultar tus pagos recibidos en el módulo de _**Reportes**_ y haciendo clic sobre _**Pagos recibidos**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias1-es.png)
 
2. Según el modelo de acreditación y los parámetros que tengas configurados en tú cuenta el reporte te permite filtrar por:
* _**Cuenta**Ç_: Te permite seleccionar la cuenta con la cual se deseas realizar la consulta de pagos recibidos. ![](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/obligatorio.png)
* _**Modelo de acreditación**_: Te permite seleccionar entre los dos modelos disponibles de acreditación para realizar la consulta, que en este caso es D+X días. ![](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/obligatorio.png)
* _**Rango de fechas**_: Te permite definir el rango de fechas en los cuales deseas realizar la consulta. El límite de la consulta es de 3 meses entre las fechas ingresadas. ![](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/obligatorio.png)
* _**Id de la orden**_: Te permite ingresar un número de orden específico para mirar si este ya fue acreditado a tu cuenta.
* _**Formato**_: Permite mostrar el resultado de la consulta en pantalla al elegir el formato HTML, o exportar el resultado a un archivo Excel.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias8-es.png)
 
3. El reporte mostrará la fecha en que se llevó a cabo la transacción, la fecha en que la última cuota fue acreditada a la cuenta, y la fecha en que la próxima cuota será acreditada, la cantidad de cuotas a la que fue diferida la compra y la cantidad de cuotas que ya han sido pagadas, además de los datos más importantes correspondientes a la transacción como lo son el ID de la orden al cual está relacionada la transacción, como lo son la referencia, el valor de la venta y el valor por concepto de intereses de la transacción.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias3-es.png)

#### Consultar tus pagos pendientes
1. Podrás consultar tus pagos en el módulo de _**Reportes**_ y haciendo clic sobre _**Pagos pendientes**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias4-es.png)
 
2. El reporte permite filtrar por:
* _**Cuenta**_: Permite seleccionar la cuenta con la cual deseas realizar la consulta de pagos pendientes ![](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/obligatorio.png)
* _**Modelo de acreditación**_: Permite seleccionar entre los dos modelos disponibles de acreditación para realizar la consulta, en este caso D+X días. ![](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/obligatorio.png)
* _**Rango de fechas**_: Te permite definir el rango de fechas en los cuales deseas realizar la consulta. El límite de la consulta es de 3 meses entre las fechas ingresadas. ![](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/obligatorio.png)
* _**Formato**_: Permite mostrar el resultado de la consulta en pantalla al elegir el formato HTML, o exportar el resultado a un archivo Excel.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias7-es.png)
 
3. El reporte mostrará la fecha en que se llevó a cabo la transacción de venta, la fecha en que será acreditada en la cuenta, la cantidad de días faltantes, y los datos más importantes correspondientes a la transacción. Como el ID de la orden al cual está relacionada la transacción, la referencia, el valor de la venta y el valor por concepto de intereses de la transacción.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias6-es.png)

{{% alert title="Nota" color="info"%}}
Si tu cuenta tiene fondo de reserva, el porcentaje de este será retenido durante el abono a tu cuenta PayU.
{{% /alert %}}