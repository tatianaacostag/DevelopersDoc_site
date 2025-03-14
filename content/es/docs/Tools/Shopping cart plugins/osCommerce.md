---
title: "osCommerce"
linkTitle: "osCommerce"
date: 2021-05-26T08:39:47-05:00
description:
  Este artículo te muestra el procedimiento para habilitar PayU en tu sitio web de osCommerce.
weight: 7
tags: ["subtopic"]
---

osCommerce es una plataforma desarrollada en PHP que facilita la creación de una tienda en línea. Para permitirle a tus **clientes** pagar con PayU desde tu página web, necesitas instalar el plugin para osCommerce, el cual integra a PayU Latam como pasarela válida de pago. Para más información sobre osCommerce, consulta su [página web oficial](https://www.oscommerce.com/).

## Prerrequisitos {#prerequisites}
* Necesitas una cuenta activa en PayU Latam.
* Tener instalado [osCommerce versión 2.3](https://www.oscommerce.com/Products).
* Haber descargado el plugin de osCommerce de PayU y tenerlo guardado en una ruta accesible. Haz clic [aquí](https://github.com/developers-payu-latam/developers-payu-latam.github.io/raw/master/plugins/plugin-oscommerce.zip) to download it.

## Instalación {#installation}
Sigue este procedimiento para instalar el plugin en tu página web.

1. Descomprime el archivo del plugin en una ruta de tu preferencia. Desde ahora, nos referiremos a dicha ruta como `[PLUGIN_PATH]`. <br>
En esta ruta, encontrarás la carpeta `oscommerce-plugin-1.0`.

![PrintScreen](/assets/oscommerce/oscommerce_01.png)

2. Por FTP o iniciando sesión como Administrador en el servidor donde está instalado osCommerce, incluye los archivos del plugin de la siguiente forma:

* En la ruta del servidor `/[servidor]/apache/[publication_path]/oscommerce/catalog`, copia los archivos `confirmation_payu.php` y `response_payu.php` del plugin. Estos archivos se encuentran en la ruta `[PLUGIN_PATH]\oscommerce-plugin-1.0\oscommerce-payu-latam-1.0\catalog`.

![PrintScreen](/assets/oscommerce/oscommerce_02.png)

* En la ruta del servidor `/[servidor]/apache/[publication_path]/oscommerce/catalog/includes/languages/english/modules/`, copia el archivo `‘payu_latam.php` del plugin que se encuentra en la ruta `[PLUGIN_PATH]\oscommerce-plugin-1.0\oscommerce-payu-latam-1.0\catalog\includes\languages\english\modules\payment`.<br><br>
![PrintScreen](/assets/oscommerce/oscommerce_03.png)<br>
  Repite este paso para español y portugués si los tienes instalados en tu página web de osCommerce. Estos archivos están en:<br>
  - ES: `[PLUGIN_PATH]\oscommerce-plugin-1.0\oscommerce-payu-latam-1.0\catalog\includes\languages\espanol\modules\payment`
  - PT: `[PLUGIN_PATH]\oscommerce-plugin-1.0\oscommerce-payu-latam-1.0\catalog\includes\languages\portugues\modules\payment`

{{% alert title="Nota" color="info"%}}

El plugin de PayU Latam para osCommerce solo está disponible para inglés, español y portugués.

{{% /alert %}}  

* En la ruta del servidor `/[servidor]/apache/[publication_path]/oscommerce/catalog/includes/modules/payment/`, copia el archivo `‘payu_latam.php` del plugin que se encuentra en la ruta `[PLUGIN_PATH]\oscommerce-plugin-1.0\oscommerce-payu-latam-1.0\catalog\includes\modules\payment`. Este archivo no es el mismo que se mencionó anteriormente.

![PrintScreen](/assets/oscommerce/oscommerce_04.png)

3. En el panel de administrador de osCommerce, expande menú _**Modules**_ en el panel izquierdo y selecciona la opción _**Payment**_.

![PrintScreen](/assets/oscommerce/oscommerce_05.jpg)

4. En la sección Payment, haz clic en el botón _**Install Module**_ ubicado en lla esquina superior derecha.

![PrintScreen](/assets/oscommerce/oscommerce_06.jpg)

5. Localiza el plugin `Payu Latam` y haz clic en él. Luego, haz clic en el botón _**Install Module**_ en el panel de la derecha.

![PrintScreen](/assets/oscommerce/oscommerce_07.jpg)

6. Luego de instalar el plugin, aparece la lista de módulos instalados del plugin de `Payu Latam`.

![PrintScreen](/assets/oscommerce/oscommerce_08.jpg)

## Configuración {#configuration}
1. En la sección Payment, selecciona el método de pago _**Payu Latam**_ y haz clic en el botón _**Edit**_ en el panel de la derecha.

![PrintScreen](/assets/oscommerce/oscommerce_09.jpg)

2. Aparece el siguiente formulario de configuración:

<img src="/assets/oscommerce/oscommerce_10.jpg" width="30%" alt="PrintScreen"/>
<br>

Configúralo utilizando la información de tu cuenta PayU así:

| Campo                     | Valor                                                                                      |
|---------------------------|--------------------------------------------------------------------------------------------|
| Habilitar / Deshabilitar  | Selecciona **True** para habilitar la pasarela en osCommerce.                               |
| Merchant ID               | Identificador de tu comercio en PayU Latam.                                                |
| Account ID                | Identificador de la cuenta PayU de acuerdo con el país en el que quieres vender.           |
| API key                   | Llave única de tu comercio, puedes obtener esta información en tu Módulo PayU.             |
| Gateway URL               | URL de la pasarela de pago.<br>Para pruebas, utiliza https://sandbox.gateway.payulatam.com/ppp-web-gateway y para producción https://gateway.payulatam.com/ppp-web-gateway/                                         |
| Modo Transacciones        | Selecciona **Test** si quieres procesar en el ambiente de pruebas. En caso contrario, selecciona **Live**. |
| Página de respuesta       | URL de la página de respuesta.<br>Por defecto, la URL es https://tu.dominio.com/yourOscommerceFolder/catalog/response_payu.php, debes reemplazar https://tu.dominio.com con el dominio de tu sitio.       |
| Página de confirmación    | URL de la página de confirmación.<br>Por defecto, la URL es https://tu.dominio.com/yourOscommerceFolder/catalog/confirmation_payu.php, debes reemplazar https://tu.dominio.com con el dominio de tu sitio.   |

3. Guarda los cambios utilizando el botón al final del panel.

4. Por último, expande el menú _**Localization**_ y haz clic en _**Order Status**_. Verifica que los estados de la orden fueron creados de acuerdo con los idiomas instalados (inglés, español y portugués) en tu página web de osCommerce.

![PrintScreen](/assets/oscommerce/oscommerce_13.jpg)

Los estados válidos son:
* Para inglés: `Approved`, `Rejected`, `Failed` y `Pending`.
* Para español: `Aprobada`, `Rechazada`, `Fallida` y `Pendiente`.
* Para portugués: `Aprovado`, `Recusada`, `Falha` y `Pendente`.

{{% alert title="Nota" color="info"%}}

Si no tienes instalado ninguno de los idiomas mencionados, los estados no aparecen en la lista. Si quieres instalar un idioma más adelante, puedes crear estos estados manualmente utilizando los nombres mostrados. 

{{% /alert %}} 

En este punto, tus clientes pueden pagar con PayU Latam en el carrito de compras de osCommerce. 