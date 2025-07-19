---
title: "WooCommerce"
linkTitle: "WooCommerce"
date: 2021-05-26T08:40:03-05:00
description:
  Este artículo te muestra el procedimiento para habilitar PayU en tu sitio web de WooCommerce.
weight: 6
tags: ["subtopic"]
---

WooCommerce es uin plugin de WordPress que facilita la creación de una tienda en línea integrada. Para permitirle a tus **clientes** pagar con PayU desde tu página web, necesitas instalar el plugin para WooCommerce, el cual integra a PayU Latam como pasarela válida de pago. Para más información sobre WooCommerce, consulta su [página web oficial](https://woocommerce.com/). 

## Prerrequisitos {#prerequisites}
* Necesitas una cuenta activa en PayU Latam.
* Tener instalado [WordPress 3.8](https://wordpress.com/es) o superior.
* Tener instalado WooCommerce 2.0 o superior in the WordPress website.
* Haber descargado el plugin de WooCommerce de PayU y tenerlo guardado en una ruta accesible. Haz clic [aquí](https://github.com/developers-payu-latam/developers-payu-latam.github.io/raw/master/plugins/woocommerce-payu-latam-2.1.zip) para descargarlo.

## Instalación {#installation}
Sigue este procedimiento para instalar el plugin en tu página web.

1. Ingresa a tu sitio WordPress como administrador.

2. En el escritorio de administrador, expande el menú _**Plugins**_ en el panel izquierdo y haz clic en _**Añadir nuevo**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_01.jpg)

3. Ve a la opción _**Subir**_ y selecciona el archivo _.zip_ del plugin de WooCommerce descargado.<br>
Luego, haz clic en _**Instalar ahora**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_02.jpg)

4. Ingresa los datos de la conexión via FTP y haz clic en _**Ejecutar**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_03.jpg)

{{% alert title="Nota" color="info"%}}

La ejecución de este paso depende de la configuración Inicial de WordPress. La instalación del plugin no se afecta si no ves esta pantalla.

{{% /alert %}}  

5. Por último, activa el plugin que instalaste haciendo clic en el enlace _**Activar Plugin**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_04.jpg)

## Configuración {#configuration}
1. De vuelta en el escritorio de administrador, expande el menú _**WooCommerce**_ en el panel de la derecha y selecciona _**Ajustes**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_05.jpg)

2. Ingresa a la pestaña _**Checkout**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_06.jpg)

3. Desplázate hacia la tabla _**Pasarelas de Pago**_. Luego, localiza _PayU Latam_ y arrástrala a la parte superior de la tabla.<br>
Haz clic en el radio de la columna _**Predeterminado**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_07.jpg)

Guarda los cambios. 

4. Haz clic en el enlace _PayU Latam_ en la parte superior de la pestaña y configura los datos de tu cuenta PayU.

![PrintScreen](/assets/WooCommerce/WooCommerce_09.jpg)

La siguiente tabla explica los valores:

| Campo | Valor |
|---|---|
| Habilitar / Deshabilitar | Marca esta casilla para activar la pasarela de pago en WooCommerce. |
| Título | Titulo mostrado para el Medio de Pago. El valor por defecto es _PayU Latam_. |
| Merchant ID | Identificador de tu comercio en PayU Latam. |
| Account ID | Identificador de la cuenta PayU de acuerdo con el país en el que quieres vender. |
| API key | Llave única de tu comercio, puedes obtener esta información en tu Módulo PayU. |
| Gateway URL | URL de la pasarela de pago.<br>Para pruebas, utiliza https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu y para producción https://checkout.payulatam.com/ppp-web-gateway-payu |
| Transacciones en modo de prueba  | Marca esta casilla para hacer transacciones de prueba. |
| Página de respuesta | URL de la página de respuesta.<br>Por defecto, la URL es https://tu.dominio.com/wp-content/plugins/woocommerce-payu-latam/response.php, debes reemplazar https://tu.dominio.com con el dominio de tu sitio. |
| Página de confirmación | URL de la página de confirmación.<br>Por defecto, la URL es https://tu.dominio.com/wp-content/plugins/woocommerce-payu-latam/confirmation.php, debes reemplazar https://tu.dominio.com con el dominio de tu sitio. |

5. Por último, haz clic en el botón _**Guardar cambios**_. En este punto, tus clientes pueden pagar con PayU Latam en el carrito de compras de WooCommerce. 