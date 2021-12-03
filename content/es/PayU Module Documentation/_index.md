---
title: "Módulo PayU"
linkTitle: "Inicio"
date: 2017-01-05
type: docs
description: >
  Hacemos que sea fácil para los comercios ofrecer pagos en línea mientras eliminamos la carga de la integración con múltiples métodos de pago.
menu:
  main:
    name: Módulo PayU
    weight: 40    
---

El módulo PayU es el sistema donde puedes manejar tu cuenta de forma segura. En este módulo, puedes cambiar tu contraseña, obtener reportes de ventas, encontrar la información necesaria para integrar tu página web con nuestra plataforma, utilizar herramientas pra recibir pagos y transferir dinero a tu cuenta bancaria.
El módulo PayU es ideal para negocios que necesitan:

* Tener control de su inventario y conocer las ventas aprobadas a través de PayU.
* Tener la información más actualizada sobre los movimientos financieros en su cuenta.
* Realizar cualquier solicitud de soporte o ayuda sobre su cuenta..

Para acceder al módulo PayU, ingresa a www.payu.com, at la esquina superior derecha, encontrarás la opción para iniciar sesión. Para comercios en Colombia, esta opción se llama _PayU Login_.<br>O si lo prefieres, puedes ir directamente a https://merchants.payulatam.com/.

![PrintScreen](/assets/Login1_es.png)

{{% alert title="Nota" color="info"%}}

¿Aún no tienes usuario? Aprende a crear uno [aquí]({{< ref "create-an-account.md" >}}).

{{% /alert %}}

## ¿Qué puedes hacer utilizando el Módulo PayU? {#what-you-can-do-using-the-payu-module}
El Módulo PayU te permite realizar las siguientes operaciones:

* Ver el dinero disponible en tu cuenta PayU y realizar la transferencia a tu cuenta bancaria.
* Consultar los movimientos de tus cuentas, generar extractos y reportes.
* Consultar el estado de las ventas realizadas.
* Encontrar las credenciales de autenticación para realizar las integraciones: API Key, API Login y merchant ID (Id del Comercio).
* Actualizar tus datos bancarios.
* Configurar el logo de tu empresa para que aparezca en el Web Checkout (pasarela de pagos).
* Configurar las URLs de tu página de confirmación y página de respuesta (si tienes una integración por API o Web Checkout).

## Conceptos del Módulo PayU {#payu-module-concepts}
El Módulo PayU le permite a un usuario administrar el comercio y sus cuentas relacionadas. La complejidad de tu Módulo PayU depende de tu tamaño. Vamos a explicar esto utilizando los siguientes conceptos.

* **Comercio (Merchant)**: el comercio es la tienda que ofrece productos o servicios. PayU define el comercio como la persona legal que contrata los servicios de PayU. Si tu tienda está legalmente constituida en dos paises (dos entidades legales), cada entidad debe ser creada como un comercio.<br>Por ejemplo, _Tienda ABC_ tiene sucursales en México y Colombia, pero la tienda ha constituido una compañía en cada país, cuando _Tienda ABC_ contrata los servicios de PayU, PayU crea dos comercios diferentes.

{{% alert title="Nota" color="info"%}}
Cada comercio en PayU tiene un único `Merchant ID`.
{{% /alert %}}

* **Cuenta (Cuenta)**: una cuenta en PayU representa un país de procesamiento, una línea de negocio o una funcionalidad contratada de un comercio dado. Si tu tienda está legalmente constituida en un país y vende productos en varios, tienes un único comercio een el cual encuentras una cuenta por cada país.<br>Por ejemplo, _XYZ sistemas_ es una compañía legalmente constituida en los Estado Unidos que ofrece servicios de hosting en Colombia, México y Perú. Cuando _XYZ sistemas_ contrata los servicios de PayU, PayU crea un comercio con tres cuentas.<br>Adicionalmente, una cuenta puede ser una de las siguientes:
  - Una línea de negocio: cuando un comercio ofrece varias líneas de negocio en un país específico. Por ejemplo, una compañía puede ofrecer su producto como una línea de negocio y la capacitación como otra. En este caso, este comercio tiene dos cuentas.
  - Una funcionalidad: si contratas dos funcionalidades de PayU con diferente esquema de precios, cada funcionalidad es representada en tu Módulo PayU como una cuenta. Por ejemplo, una tienda tiene un precio por procesar con tarjetas de crédito y otro diferente para pagos en efectivo.
* **Usuario (User)**: un usuario es la persona que tiene un perfil para administrar o consultar la información de una cuenta.<br>Un perfil es un conjunto de permisos para acceder a una cuenta. Un usuario puede tener uno o más perfiles, esto significa que un usuario puede acceder a múltiples cuentas y múltiples comercios.

Las siguientes gráficas muestran la relación entre estos conceptos.

#### Tienda multicomercio {#multi-merchant-shop}
La tienda _Tienda ABC_ tiene sucursales en México y Colombia, ambas legalmente constituidas como _Tienda ABC México_ y _Tienda ABC Colombia_, esta es la relación entre los conceptos anteriores para este ejemplo:

<img src="/assets/MerchantPanel/MerchantPanel_Concepts1_es.png" width="50%"/><br>

* El módulo PayU de _Tienda ABC_ tiene dos comercios: _Tienda ABC México_ y _Tienda ABC Colombia_, cada comercio tiene una cuenta ya que procesan únicamente en l país donde están constituidos.

* _Tienda ABC_ tiene cuatro usuarios; **Usuario 2** y **Usuario 3** pueden acceder a ambas cuentas, mientras que **Usuario 1** puede acceder a la cuenta colombiana y **Usuario 4** a la cuenta mexicana. 

{{% alert title="Nota" color="info"%}}

En este caso, cada comercio puede tener múltiples cuentas si lo requiere.

{{% /alert %}}

#### Tienda de comercio único con múltiples cuentas {#single-merchant-shop-with-multiple-accounts}
_XYZ sistemas_ es una compañía legalmente constituida en Estados Unidos que ofrece servicios de hosting web en Colombia, México y Perú; adicionalmente, _XYZ sistemas_ tiene dos líneas de negocio en Colombia: hosting web y entrenamiento. Esta es la relación entre los conceptos anteriores para este ejemplo:

<img src="/assets/MerchantPanel/MerchantPanel_Concepts2_es.png" width="50%"/><br>

* El módulo PayU para _XYZ sistemas_ tiene un único comercio ya que están constituidos legalmente en Estados Unidos. Como _XYZ sistemas_ procesa en tres paises, este comercio cuenta con cuatro cuentas; dos para Colombia (una por cada línea de negocio), una para México y una para Perú.

* _XYZ sistemas_ tiene cuatro usuarios; **Usuario 3** puede acceder a todas las cuentas, mientras que los demás usuarios pueden acceder a su país asignado.

{{% alert title="Nota" color="info"%}}

Los comercios pueden estar fuera de nuestros paises de procesamiento. Sin embargo, requieren tener una cuenta bancaria intermediaria en cada país donde quiera procesar.

{{% /alert %}}

#### Comercios únicos con cuenta única {#single-merchants-with-single-accounts}
Este es el caso más común cuando utilizas el módulo PayU. Una tienda está legalmente constituida en un país donde ofrece sus productos o servicios, esta es la relación entre los conceptos anteriores para este ejemplo:

<img src="/assets/MerchantPanel/MerchantPanel_Concepts3_es.png" width="50%"/><br>

* El módulo PayU para esta tienda tiene una única cuenta y un único comercio, donde todos sus usuarios pueden acceder de acuerdo con el perfil que tengan.