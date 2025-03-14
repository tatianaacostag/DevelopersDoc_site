---
title: "VirtueMart"
linkTitle: "VirtueMart"
date: 2021-05-26T08:39:05-05:00
description:
  Este artículo te muestra el procedimiento para habilitar PayU en tu sitio web de VirtueMart.
weight: 5
tags: ["subtopic"]
---

## Prerrequisitos {#prerequisites}
* Necesitas una cuenta activa en PayU Latam.
* Para VirtueMart versión 2 o superior:
  * Haber descargado el plugin de VirtueMart de PayU y tenerlo guardado en una ruta accesible. Haz clic [aquí](https://github.com/developers-payu-latam/developers-payu-latam.github.io/raw/master/plugins/plugin-joomla-virtuemart2.6.7.zip) para descargarlo.
  * Tener instalado VirtueMart versión 2 o superior.
  * Tu página web de VirtueMart website debe estar instalada en [Joomla!®](https://joomla.org/) 2.5 o superior con MySQL 5.1 o superior.
* Para VirtueMart versión 3.0.6:
  * Haber descargado el plugin de VirtueMart de PayU y tenerlo guardado en una ruta accesible. Haz clic [aquí](https://github.com/developers-payu-latam/developers-payu-latam.github.io/raw/master/plugins/plugin-joomla-virtuemart3.0.6.zip) para descargarlo. 
  * Tener instalado VirtueMart versión 3.0.6.
  * Tu página web de VirtueMart website debe estar instalada en [Joomla!®](https://joomla.org/) versions 3.3.6, 2.5.28 o 2.5.27.

## Plugin para VirtueMart 2 o superior {#plugin-for-virtuemart-2-or-higher}
Sigue este procedimiento para instalar y configurar el plugin en tu página web.

### Instalación {#installation}

1. Ingresa a la _Consola de Administrador de Joomla!®_ y selecciona la opción _**Extension Manager**_ que se encuentra en el menú _**Extension**_.

![PrintScreen](/assets/VirtueMart/VirtueMart_01.jpg)

2. En la sección _**Upload Package File**_, Haz clic en _**Browse**_ y ubica el archivo _.zip_ del plugin de Payu descargado.

![PrintScreen](/assets/VirtueMart/VirtueMart_02.jpg)

3. Una vez termine el proceso de instalación, aparece un mensaje para informar que la instalación fue exitosa.

![PrintScreen](/assets/VirtueMart/VirtueMart_03.jpg)

### Configuración {#configuration}
1. Expande la opción _**Shop**_ en el menú de _**VirtueMart**_ y selecciona _**Payment methods**_. Luego, haz clic en _**New**_ en la parte superior derecha de la pantalla.

![PrintScreen](/assets/VirtueMart/VirtueMart_04.jpg)

2. En la pestaña _**Payment Method Information**_, Ingresa _Payulatam_ como nombre (_**Payment Name**_) y selecciona `PayuLatam` en el campo _**Payment Method**_.

![PrintScreen](/assets/VirtueMart/VirtueMart_05.jpg)

3. Ve a la pestaña _**Configuration**_ e ingresa la información de tu cuenta y tu API key. 

![PrintScreen](/assets/VirtueMart/VirtueMart_06.jpg)

Además, ingresa la URL de conexión a la pasarela y las variables de configuración explicadas en la sección [Variables de Configuración]({{< ref "#configuration-variables" >}}).

Las URLs para los ambientes de pruebas y producción son:
* Pruebas: `https://sandbox.gateway.payulatam.com/ppp-web-gateway`
* Producción: `https://gateway.payulatam.com/ppp-web-gateway/`

4. Por último, Haz clic en el botón _**Save**_ o _**Save & Close**_. En este punto, tus clientes pueden pagar con PayU Latam en el carrito de compras de VirtueMart. 

## Plugin para VirtueMart 3.0.6 {#plugin-for-virtuemart-306}
Sigue este procedimiento para instalar y configurar el plugin en tu página web.

### Instalación {#installation-1}

1. Ingresa a la _Consola de Administrador de Joomla!®_ y selecciona la opción _**Extension Manager**_ que se encuentra en el menú _**Extensions**_.

![PrintScreen](/assets/VirtueMart/VirtueMart3_02.jpg)

2. En el campo _**Extension package file**_, selecciona el archivo _.zip_ previamente descargado. 

![PrintScreen](/assets/VirtueMart/VirtueMart3_03.jpg)

3. Una vez se haya cargado el archivo _.zip_ file is loaded, click _**Upload & Install**_.

![PrintScreen](/assets/VirtueMart/VirtueMart3_05.jpg)

4. Una vez termine el proceso de instalación, aparece un mensaje para informar que la instalación fue exitosa.

![PrintScreen](/assets/VirtueMart/VirtueMart3_06.jpg)

### Configuración {#configuration-1}
1. En el menú de la izquierda, haz clic en _**Manage**_. Ubica y activa el plugin `PayuLatam`.

![PrintScreen](/assets/VirtueMart/VirtueMart3_07.jpg)

Aparece un mensaje informado que has activado el plugin. Además, el ícono cambia a una marca de verificación.

![PrintScreen](/assets/VirtueMart/VirtueMart3_08.jpg)

2. Abre el menú de _**Components**_ y expande la opción _**Virtuemart**_. Luego, selecciona _**Payment Methods**_.

![PrintScreen](/assets/VirtueMart/VirtueMart3_09.jpg)

3. En la ventana que se abre, haz clic en _**New**_ para crear el método de pago utilizando el plugin `PayuLatam`.

![PrintScreen](/assets/VirtueMart/VirtueMart3_10.jpg)

4. En la pestaña _**Payment Method Information**_, Ingresa _Payulatam_ como nombre (_**Payment Name**_) y selecciona `PayuLatam` en el campo _**Payment Method**_.

![PrintScreen](/assets/VirtueMart/VirtueMart3_11.jpg)

5. Ve a la pestaña _**Configuration**_ e ingresa la información de tu cuenta y tu API key.  

![PrintScreen](/assets/VirtueMart/VirtueMart3_13.jpg)

Además, ingresa la URL de conexión a la pasarela y las variables de configuración explicadas en la sección [Variables de Configuración]({{< ref "#configuration-variables" >}}).

Las URLs para los ambientes de pruebas y producción son:
* Pruebas: `https://sandbox.gateway.payulatam.com/ppp-web-gateway`
* Producción: `https://gateway.payulatam.com/ppp-web-gateway/`

6. Por último, Haz clic en el botón _**Save**_ o _**Save & Close**_. En este punto, tus clientes pueden pagar con PayU Latam en el carrito de compras de VirtueMart. 

## Variables de Configuración {#configuration-variables}
Independiente de la versión de VirtueMart que utilices, configura las siguientes variables en tu plugin:

| Campo                                | Valor                                                                                 |
|--------------------------------------|---------------------------------------------------------------------------------------|
| Logo                                 | Logo mostrado para el método de pago **PayuLatam**.                                    |
| Test URL                             | URL de la pasarela para Pruebas: `https://sandbox.gateway.payulatam.com/ppp-web-gateway`. |
| Production URL                       | URL de la pasarela para Producción: `https://gateway.payulatam.com/ppp-web-gateway`.  |
| Test Mode                            | Selecciona **Yes** si quieres hacer transacciones en el ambiente de pruebas. Cuando activas esta opción, VirtueMart utiliza la URL configurada en la variable **Test URL**.                                        |
| Merchant ID                          | Identificador de tu comercio en PayU Latam.                                           |
| Account ID                           | Identificador de la cuenta PayU de acuerdo con el país en el que quieres vender.      |
| API Key                              | Llave única de tu comercio, puedes obtener esta información en tu Módulo PayU.        |
| Sección **ORDER STATUS PARAMS**<br><ul style="margin-bottom: initial;"><li>Approved Transactions</li><li>Pending Transactions</li><li>Declined Transactions</li></ul> | Define el estado de la orden en VirtueMart de acuerdo con el estado de la transacción retornado por PayU. Sugerimos dejar los estados predeterminados; sin embargo, puedes configurarlos de acuerdo a tu necesidades.            |
| Currency                             | Configura USD. También, puedes configurar la moneda del país de tu Account ID.        |
| Minimum Value / Maximum value        | El valor total de la orden debe estar en este rango para activar el método de pago **PayuLatam**. |
| Tax                                  | Para utilizar esta opción, configura la regla correspondiente de VirtueMart asociada al impuesto. Por ejemplo, el IVA en Colombia. |