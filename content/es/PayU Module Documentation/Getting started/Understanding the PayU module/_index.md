---
title: "Conociendo el Módulo PayU"
linkTitle: "Conociendo el Módulo PayU"
date: 2021-08-17T14:47:21-05:00
type: docs
Description: > 
  Tan pronto inicies sesión, puedes utilizar todas las opciones disponibles para manejar tu cuenta, conocer e estado de tus ventas, controlar tus finanzas, transferir dinero desde tu cuenta PayU y más.
weight: 30
tags: ["parenttopic"]
---

## Prerrequisitos {#prerequisites}
Antes de empezar a explicar cómo está organizado el modulo PayU, necesitas lo siguiente:
* Tener un usuario en el módulo PayU. Aprende a crear uno [aquí]({{< ref "create-an-account.md" >}}).
* Haber leído y entendido los [conceptos detrás del Módulo PayU](/es/payu-module-documentation.html#payu-module-concepts).

## Aplicación web del Módulo PayU {#payu-module-web-application}
El módulo PayU está dividido en cuatro grupos principales:

1. [Opciones de cuenta]({{< ref"#1-account-options" >}}).
2. [Configuraciones y opciones de usuario]({{< ref"#2-settings-and-user-options" >}}).
3. [Panel principal]({{< ref"#3-main-panel" >}}).
4. [Pie de página]({{< ref"#4-footer" >}}).

![PrintScreen](/assets/MerchantPanel/MerchantPanel_01_es.png)

{{% alert title="Nota" color="info"%}}
Las opciones mostradas en este artículo dependen del perfil que tengas para acceder a cada cuenta.
{{% /alert %}}

### 1. Opciones de cuenta {#1-account-options}
Este panel tiene las opciones requeridas para manejar las cuentas asociadas al comercio actual. En este panel encuentras las siguientes opciones:

<div class="variables"></div>

| Opción | Subopción | Disponible en | Descripción |
|---|---|:---:|---|
| Merchant ID |  | <img src="/assets/World.png" width="20px"/> | Número de identificación de tu comercio en el sistema de PayU. Este identificador es requerido cuando utilizas [Integraciones]({{< ref "integrations" >}}).  |
| Cuenta | Información de la cuenta | <img src="/assets/World.png" width="20px"/> | Muestra en nombre e identificador de la cuenta seleccionada.<br>Esta opción también le permite cambiar la cuenta y realizar operaciones relacionadas. Haz clic en el simbolo **▾** para encontrar estas opciones o cambiar la cuenta.<br><br><img src="/assets/MerchantPanel/MerchantPanel_02_es.png" alt="PrintScreen" width="40%"/> |
|  | Datos de mi negocio | <img src="/assets/World.png" width="20px"/> | Muestra la ubicación y la información de contacto principal de su negocio. Además, esta opción muestra las personas asociadas con su negocio. |
|  | Datos de ventas | <img src="/assets/World.png" width="20px"/> | Muestra la información de cómo realizas tus ventas, qué vendes, el logo de tu tienda, información de entrega, cómo ofreces tus productos o servicios y cómo tus clientes pueden contactarte. |
|  | Datos bancarios | <img src="/assets/World.png" width="20px"/> | Muestra la cuenta bancaria y el banco intermediario donde desea transferir los fondos recaudados para esta cuenta. |
|  | Cuentas creadas | <img src="/assets/World.png" width="20px"/> | Muestra la lista de cuentas disponibles en su comercio. |
| Saldo disponible | | <img src="/assets/World.png" width="20px"/> | Muestra el saldo disponible en la cuenta seleccionada. |
| Inicio | | <img src="/assets/World.png" width="20px"/> | Muestra la página de bienvenida del módulo PayU. Para más información, consulta la página de [Inicio]({{< ref "#home-page" >}}). |
| Transacciones | Reporte de ventas | <img src="/assets/World.png" width="20px"/> | Revisa el detalle de los pagos recibidos, incluyendo métodos de pago más utilizados y clientes frecuentes. Para más información, consulta [Reporte de ventas]({{< ref "Sales-report.md" >}}). |
| | Disputas | <img src="/assets/World.png" width="20px"/> | Gestiona el proceso de disputas generadas en tu cuenta PayU. Para más información, consulta [Disputas]({{< ref "Disputes-MP.md" >}}). |
| | Balance financiero | <img src="/assets/World.png" width="20px"/> | Te permite entender el flujo de dinero de tu cuenta, los cargos aplicados, las tarifas relacionadas y los impuestos. Para más información, consulta [Balance financiero]({{< ref "Financial-Statement.md" >}}). |
| | Certificado de Retenciones | <img src="/assets/Colombia.png" width="20px"/> | Descarga tu Certificado de Retenciones de acuerdo con el periodo de tiempo seleccionado. Para más información, consulta [Certificado de Retenciones]({{< ref "Withholding-Certificate.md" >}}). |
| Transferencias | Transferencias | <img src="/assets/Argentina.png" width="20px"/><img src="/assets/Chile.png" width="20px"/><img src="/assets/Colombia.png" width="20px"/><br><img src="/assets/Mexico.png" width="20px"/><img src="/assets/Panama.png" width="20px"/><img src="/assets/Peru.png" width="20px"/> | Te permite transferir los fondos recolectados en tu cuenta PayU a tu cuenta bancaria. Para más información, consulta [Transferencias]({{< ref"Transfers.md" >}}). |
| | Programar transferencia | <img src="/assets/Argentina.png" width="20px"/><img src="/assets/Chile.png" width="20px"/><img src="/assets/Colombia.png" width="20px"/><br><img src="/assets/Mexico.png" width="20px"/><img src="/assets/Panama.png" width="20px"/><img src="/assets/Peru.png" width="20px"/> | Te permite crear transferencias diarias, semanales o mensuales. Además, puedes configurar transferencias personalizadas. Para más información, consulta [Programar transferencias]({{< ref"Transfers.md#schedule-transfers" >}}). |
| | Transferencias diarias| <img src="/assets/Brasil.png" width="20px"/> | Como PayU en Brasil no es una institución de pago, los fondos recaudados en tu cuenta PayU se transfieren a tu cuenta bancaria diariamente. A través de este reporte, puedes conocer el estado de las transferencias diarias.<br>Este reporte solo está disponible para cuentas en Brasil y tiene las mismas columnas y opciones que el [reporte Transferencias]({{< ref"transfer-report.md" >}}). |
| | Editar datos bancarios | <img src="/assets/World.png" width="20px"/> | Te permite solicitar el cambio de tu cuenta bancaria y el banco intermediario donde vas a transferir los fondos recolectados en esta cuenta. Para más información, consulta [Actualizar mi información]({{< ref"Update-my-information.md#request-the-change-of-your-bank-account" >}}) |
| Cobra con PayU | Cobra en internet | <img src="/assets/World.png" width="20px"/> | Te permite crear solicitudes de pago para que puedas cobrarle a tus clientes sin tener una página Web. Para más información, consulta [Solicitud de pago]({{< ref"Payment-request.md" >}})  |
| | Cobros en efectivo | <img src="/assets/Argentina.png" width="20px"/><img src="/assets/Colombia.png" width="20px"/> | Te permite generar cupones de pago o tarjetas de cobranza<sup>\*</sup> con la información necesaria para permitirle a tus clientes hacer pagos en efecto las veces que lo requieran en los puntos de pago disponibles. Para más información, consulta [Cupones de pago]({{< ref"Payment-coupons.md" >}}).<br><sup>\*</sup>_Las tarjetas de cobranza solo están disponibles en Argentina_. |
| | Mis herramientas | <img src="/assets/World.png" width="20px"/> | Te permite encontrar y administrar la información de los _Links de pago_ (Solicitud de pago) y _Cupones de pagoCupones de pago_<sup>\*</sup> que hayas creado en tu cuenta.<br><sup>\*</sup>_Cupones de pago solo están disponibles en Argentina y Colombia_. |

### 2. Configuraciones y opciones de usuario {#2-settings-and-user-options}
Este panel tiene las opciones requeridas para administrar tu comercio y tu usuario.

<img src="/assets/MerchantPanel/MerchantPanel_03_es.png" alt="PrintScreen" width="50%"/>

#### Configuraciones del comercio {#merchant-settings}
Esta opción te permite administrar usuarios, permisos, perfiles y la configuración de tu comercio. Al hacer clic en el botón _**Configuración**_, encuentras las siguientes opciones:

<div class="variables"></div>

| Opción | Disponible en | Descripción |
|---|:---:|---|
| Gestión de usuarios | <img src="/assets/World.png" width="20px"/> | Te permite otorgar acceso a los miembros de tu equipo para que puedan solicitar pagos en línea o validar información de los pagos. Para más información, consulta [Gestión de usuarios]({{< ref"User-management.md" >}}). |
| Perfiles y permisos | <img src="/assets/World.png" width="20px"/> | Te permite create custom profiles with specific permissions.<br>En esta sección, puedes consultar los permisos predeterminados incluidos en el Módulo PayU. Para más información, consulta [Gestión de perfiles y permisos]({{< ref"Profile-and-permissions-management.md" >}}). |
| Configuración técnica | <img src="/assets/World.png" width="20px"/> | En esta opción, puedes encontrar las variables requeridas para integrar PayU con tu página Web. Además, puedes configurar notificaciones de pagos procesados y Disputas. Para más información, consulta [Configuración técnica]({{< ref"Technical-configuration.md" >}}). |

#### Configuraciones del usuario {#user-settings}
Esta opción te permite administrar tu perfil. En la vista principal de esta opción, encuentras tu correo electrónico, tu perfil actual en el módulo PayU (para la cuenta actual), y el account Id; haz clic en el símbolo **▾** para mostrar las configuraciones de usuario disponibles.

<div class="variables"></div>

| Opción           | Descripción                                                                             |
|------------------|-----------------------------------------------------------------------------------------|
| Cambiar comercio | Esta opción está disponible cuando tu usuario está enrolado a más de un comercio.       |
| Mi perfil        | En esta opción, puedes configurar tus preferencias y actualizar tu contraseña.          | 
| Cerrar Sesión    | Esta opción cierra la sesión del usuario activo.                                        |

### 3. Panel principal {#3-main-panel}
Este panel panel carga la opción seleccionada en el panel de la izquierda o en la opción de la parte superior. La página _**Inicio**_ está seleccionada por defecto, por lo que se carga tan pronto inicias sesión en el módulo PayU.

Para configurar una opción para que see muestre por defecto, haz clic en el menú de los tres puntos en la esquina superior derecha y selecciona _**Definir como página principal**_.

<img src="/assets/MerchantPanel/MerchantPanel_04_es.png" alt="PrintScreen" width="40%"/>

#### Página de Inicio {#home-page}
La página de inicio es el punto de partida del Módulo PayU. Muestra los atajos para realizar ventas en línea, saber el estado de tud ventas, controlar tus finanzas, transferir fondos, aprender sobre comercio electrónico y dejarnos comentarios.

![PrintScreen](/assets/MerchantPanel/MerchantPanel_05_es.png)

En esta página, puedes también tomar un tour utilizando el botón de _**Tour Virtual**_. Este botón te lleva a través de las opciones principales para administrar tu cuenta.

{{% alert title="Nota" color="info"%}}
Lagunas opciones del tour están atadas a los permisos configurados a tu usuario.
{{% /alert %}}

### 4. Pie de página {#4-footer}
El pie de página muestra el número de teléfono para contactarnos y el enlace para leer los _**terminos y condiciones**_ de acuerdo con el país de procesamiento.

Los siguientes son los números y hora de contacto:

* <img src="/assets/Argentina.png" width="25px"/> (+5411) 598 42132 > Lun - Vie 09:00 - 22:00 (UTC -3:00)
* <img src="/assets/Brasil.png" width="25px"/> (+5511) 4130 5311 > Lun - Vie 09h a 18h / Sab 09h a 15h - Zona horaria de Brasilia (UTC -3:00)
* <img src="/assets/Chile.png" width="25px"/> (+562) 258-13949 > Lun - Vie 8:00 - 21:00 Hora chilena
* <img src="/assets/Colombia.png" width="25px"/> (+57) 601 654 0721 > Lun - Vie 7:00 - 20:00 Hora colombiana (UTC -5:00)
* <img src="/assets/Mexico.png" width="25px"/> (+5255) 474 11439 > Lun - Vie 7:00 - 20:00 Hora CDMX
* <img src="/assets/Panama.png" width="25px"/> (+507) 836 5577 > Lun - Vie 7:00 - 20:00 Hora colombiana (UTC -5:00)
* <img src="/assets/Peru.png" width="25px"/> (+511) 708 5381 > Lun - Vie 7:00 - 20:00 Hora peruana (UTC -5:00)