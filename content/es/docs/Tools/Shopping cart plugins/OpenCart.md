---
title: "OpenCart"
linkTitle: "OpenCart"
date: 2021-05-26T08:40:11-05:00
description:
  Este artículo te muestra el procedimiento para habilitar PayU en tu sitio web de OpenCart.
weight: 70
tags: ["subtopic"]
nosidetoc: true
---

Opencart es una plataforma gratuita desarrollada en PHP para crear tiendas en línea. OpenCart proporciona una base profesional y confiable para construir una tienda en línea. Esta base utiliza a una amplia variedad de usuarios como desarrolladores web en busca de una interfaz de uso fácil o propietarios de tiendas que quieren lanzar su negocio en línea por primera vez. OpenCart tiene una gran cantidad de características te dan un amplio control sobre la personalización de tu tienda. Para más información sobre OpenCart, consulta su [página web oficial](https://www.opencart.com/).

## Prerrequisitos {#prerequisites}
El plugin de OpenCart está disponible para las versiones 1.5 y 2.0. Necesitas cumplir con os siguientes prerrequisistos:

* Necesitas una cuenta activa en PayU Latam.
* Para OpenCart versión 1.5:
  * Haber descargado el plugin de OpenCart v1.5 de PayU y tenerlo guardado en una ruta accesible. Haz clic [aquí](http://developers.payulatam.com/plugins/plugin-opencart.zip) to download it.
  * Having VirtueMart version 1.5.5.1 - 1.5.6.X installed.
* Para OpenCart versión 2.0:
  * Haber descargado el plugin de OpenCart v2.0 de PayU y tenerlo guardado en una ruta accesible. Haz clic [aquí](http://developers.payulatam.com/plugins/plugin-opencart-2.0.zip) to download it.

## Instalación y configuración {#installation-and-configuration}
El procedimiento para instalar el plugin de OpenCart es el mismo para la versión 1.5 como para la 2.0. La única diferencia es la interfaz de las versiones, la cual es resaltada a lo largo de este artículo.<br>
Sigue este procedimiento para instalar el plugin en tu página web.

1. Descomprime el archivo del plugin en una ubicación de tu elección. Luego, utilizando un cliente FTP, ve a la ruta donde descomprimiste el plugin.<br>
Luego, carga las carpetas **admin** y **catalog** a la carpeta raíz de la instalación  de OpenCart en tu servidor.

![PrintScreen](/assets/OpenCart/OpenCart_01.jpg)

Esta accion agregará los archivos del plugin a tu servidor de OpenCart en las rutas correctas. Para validar si el procedimiento fue exitoso, busca los siguientes archivos en sus rutas correspondientes.

![PrintScreen](/assets/OpenCart/OpenCart_02.jpg)

2. En la consola de administración de tu tienda OpenCart, abre el menú _**Extensions**_ y haz clic en _**Payments**_.

**OpenCart v1.5**

![PrintScreen](/assets/OpenCart/OpenCart_03.jpg)

**OpenCart v2.0**

![PrintScreen](/assets/OpenCart/OpenCart_04.jpg)

3. En la tabla _**Payment**_, localiza el medio de pago _PayuLatam_. Luego, haz clic en _**Install**_.

**OpenCart v1.5**

![PrintScreen](/assets/OpenCart/OpenCart_05.jpg)

**OpenCart v2.0**

![PrintScreen](/assets/OpenCart/OpenCart_06.jpg)

4. Cuando se haya instalado e plugin, haz clic en _**Edit**_.

**OpenCart v1.5**

![PrintScreen](/assets/OpenCart/OpenCart_07.jpg)

**OpenCart v2.0**

![PrintScreen](/assets/OpenCart/OpenCart_08.jpg)

5. Configura el medio de pago utilizando los datos de tu cuenta PayU así.

| Campo                | Valor                                                                                               |
|----------------------|-----------------------------------------------------------------------------------------------------|
| Production Url       | URL de PayU Latam en producción https://gateway.payulatam.com/ppp-web-gateway/                      |
| Test Url             | URL de PayU Latam en pruebas https://sandbox.gateway.payulatam.com/ppp-web-gateway                  |
| Test Mode?           | Selecciona **Yes** para hacer transacciones en el ambiente de prueba y **No** para producción.      |
| Merchant ID          | Identificador de tu comercio en PayU Latam.                                                         |
| Account ID           | Identificador de la cuenta PayU de acuerdo con el país en el que quieres vender.                    |
| API key              | Llave única de tu comercio, puedes obtener esta información en tu Módulo PayU.                      |
| Approved Transaction | Estado de la orden en la tienda OpenCart cuando PayU Latam aprueba la transacción.                  |
| Pending Transaction  | Estado de la orden en la tienda OpenCart cuando la transacción queda pendiente en PayU Latam.       |
| Declined Transaction | Estado de la orden en la tienda OpenCart cuando PayU Latam declina la transacción.                  |
| Status               | Selecciona _**Enable**_ para activar este medio de pago en OpenCart.                                |

6. Por último, guarda los cambios. En este punto, tus clientes pueden pagar con PayU Latam en el carrito de compras de OpenCart. 