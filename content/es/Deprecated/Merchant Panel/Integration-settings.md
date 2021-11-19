---
title: "Configurar integración"
linkTitle: "Configurar integración"
date: 2021-11-18T13:40:06-05:00
type: docs
Description: >
   Obten las configuraciones de integración mostradas en el Módulo Administrativo.
weight: 28
nosidetoc: true
---

{{% alert title="Nota" color="warning"%}}
Este artículo ha sido deprecado y no se ofrece a comercios nuevos.
{{% /alert %}}

## Información técnica
En esta sección encontrarás la información necesaria para realizar la integración técnica de tu página web con nuestra plataforma transaccional.

1. Podrás ver esta información ingresando al menú _**Configuración**_, haciendo clic sobre la opción _**Información técnica**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/tecnica1-es.jpg)

Los siguientes son los datos técnicos que encontrarás:

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/tecnica2-es.jpg)

2. Podrás realizar en cambio de tu logo haciendo clic en el botón buscar imagen.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/tecnica3-es.jpg)
 
## Configuración de cuentas
En esta sección podrás configurar propiedades técnicas pertenecientes a cada cuenta activa como:
* La configuración de URLs para las páginas de Respuesta y Confirmación
* Habilitar las opciones de envío de correos al comprador y a tu comercio al momento de realizar una venta.
* Definir un número de referencia único para cada venta que realices a través de tu página web.

Podrás ver esta información ingresando al menú _**Configuración**_, haciendo clic sobre la opción _**Configuración Cuentas**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/configuracion1-es.jpg)

Encontrarás las propiedades que puedes configurar:
* _**Seleccionar la cuenta**_: Debes elegir la cuenta para hacer la respectiva configuración, al elegirla se mostrará el país correspondiente a dicha cuenta.
* _**URL respuesta**_: Es la página a la cual será direccionado el comprador una vez finaliza la transacción en PayU, en esta página se mostrará el estado de la transacción.
* _**URL confirmación**_: Es la página a la cual PayU enviará la confirmación del pago a tu sistema con el fin de actualizar inventarios y bases de datos una vez la transacción llegue a su estado final. Esta página no es obligatoria.
* _**Email al comprador**_: Al habilitar esta opción se enviará desde PayU un correo al comprador, confirmando si el pago fue aprobado o rechazado.
* _**Email al vendedor**_: Al habilitar esta opción se enviará desde PayU un correo a tu comercio, confirmando si el pago fue aprobado o rechazado.
* _**Habilitar página de confirmación**_: Al habilitar esta opción se enviará la confirmación del pago a la página de confirmación configurada una vez la transacción llegue a su estado final.
* _**Validar referencia única**_: Al habilitar esta opción PayU validará que la referencia de cada pago enviado a nuestro sistema sea única. Si la casilla se encuentra desactivada, podrás enviar una misma referencia para todas tus ventas. Esta función es útil si se desea controlar temas como facturación, inventarios o para identificar las órdenes enviadas desde tu tienda a PayU.
* _**Transacción en modo de pruebas**_: Al habilitar esta opción las transacciones que se realicen, a través de tu sitio web o por medio de solicitud de pago, se marcarán como de prueba y el pago no será real. Es necesario deshabilitar esta casilla cuando quieras empezar a recibir pagos reales.

{{% alert title="Salir del modo de pruebas" color="info"%}}
Una vez tu cuenta sea activada podrás desmarcar la opción de _**Modo de pruebas**_ en tu Módulo Administrativo, de esta forma podrás realizar transacciones reales a través de tu cuenta PayU. Ingresado en la pestaña _**Configuración**_ opción _**Configuración cuentas**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/activar8-es.jpg)
{{% /alert %}}