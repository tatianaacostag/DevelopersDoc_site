---
title: "Magento"
linkTitle: "Magento"
date: 2021-05-26T08:38:26-05:00
description:
  Este artículo te muestra el procedimiento para habilitar PayU en tu sitio web de Magento.
weight: 20
tags: ["subtopic"]
---

## Prerrequisitos {#prerequisites}
* Necesitas una cuenta activa en PayU Latam.
* Tener instalado Magento versión 1.7.x a la 1.9.x.
* Haber descargado el plugin de Magento de PayU y tenerlo guardado en una ruta accesible. Haz clic [aquí](http://developers.payulatam.com/plugins/Plugin_PayU_Magento-1.3.zip) para descargarlo.
* Tener acceso a las carpetas donde se encuentra instalado Magento.
* Tener acceso al Admin Panel de Magento.

## Consideraciones {#considerations}
* Los pagos aprobados aparecen con estado _Processing_ en el reporte de órdenes.
* Una vez el pago es recibido correctamente, Magento crea una factura con la orden asociada.

## Instalación {#installation}
Sigue este procedimiento para instalar el plugin en tu página web.

1. Ingresa a tu Admin panel de Log in to your Magento admin panel. Luego, expande el menú _**System**_ en la parte superior y haz clic en _**Cache Management**_.<br>
En la nueva ventana, haz clic en _**Flush Magento Cache**_.

![PrintScreen](/assets/Magento/Magento_01.png)

2. Descomprime el plugin. La carpeta del plugin se llama `app` y tiene la siguente estructura:

![PrintScreen](/assets/Magento/Magento_02.png)

3. Navega a ***[CarpetaPlugin]\app\code\local*** y copia la carpeta **Gfgrisales** en la carpeta ***\app\code\local*** en la ruta de instalación de Magento.<br>
Si esta estructura no existe, créala con permisos de lectura y escritura.

![PrintScreen](/assets/Magento/Magento_03.png)

4. Navega a ***[CarpetaPlugin]\app\design\frontend\base\default\template*** y copia la carpeta **payu** en la carpeta ***\app\design\frontend\base\default\template*** en la ruta de instalación de Magento.

![PrintScreen](/assets/Magento/Magento_04.png)

5. Navega a ***[CarpetaPlugin]\app\etc\modules*** y copia el archivo **Gfgrisales_Payu.xml** en la carpeta ***\app\etc\modules*** en la raíz de la ruta de instalación de Magento.

![PrintScreen](/assets/Magento/Magento_05.png)

## Configuración {#configuration}
1. Regresa al Admin panel de Magento, expande el menú _**System**_ y haz clic en _**Configuration**_. Luego, expande la sección _**Advanced**_ en el menú mostrado en el panel izquierdo y haz clic en la opción _**Advanced**_.<br>
Has clic en _**Disable Modules Output**_ y verifica que está habilitada (Enable) la extensión llamada *Gfgrisales_Payu*.

![PrintScreen](/assets/Magento/Magento_06.png)

2. En el menú _**Configuration**_ en el panel de la izquierda, expande la sección _**Sales**_ en el menú mostrado en el panel izquierdo y haz clic en la opción _**Payment methods**_.<br>
Localiza y expande el método _**PayU**_ e ingresa la siguiente información de tu cuenta PayU.

![PrintScreen](/assets/Magento/Magento_07.png)

* **Merchant ID**: Identificador de tu comercio en PayU Latam.
* **APIKey**: Llave única de tu comercio, puedes obtener esta información en tu Módulo Payu (**_Configuración_** > **_Configuración técnica_** > **_API Key_**).
* **Account ID**: Identificador de la cuenta PayU de acuerdo con el país en el que quieres vender.
* **Gateway URL**: URL de la pasarela.
  * Para pruebas, utiliza https://sandbox.gateway.payulatam.com/ppp-web-gateway
  * Para producción, utiliza https://gateway.payulatam.com/ppp-web-gateway/

{{% alert title="Nota" color="info"%}}

Para pruebas, puedes utilizar los valores de **Merchant ID**, **APIKey** y **Account ID** disponibles en [Probar tu solución]({{< ref "Test-your-solution.md" >}}).

Una vez estén en el formulario de pago con tarjeta de crédito y asegurandote de que en la parte superior de la pasarela se muestre el mensaje _Transacción en modo de prueba_, debes:

* Ingresar el texto `APPROVED` en el campo Nombre completo si quieres que la transacción sea aprobada, `REJECTED` si quieres que la transacción sea rechazada o `PENDING` si quieres que la transacción quede pendiente.
* Para el número de la tarjeta, utiliza un número válido que corresponda a la franquicia seleccionada. Puedes utilizar un generador en línea de tarjetas de crédito.
* Los demás campos pueden ser aleatorios.

{{% /alert %}}  

Una vez termines, haz clic en _**Save Config**_ para guardar los cambios.

En este punto, tus clientes pueden pagar con PayU Latam en el carrito de compras de Magento. 

