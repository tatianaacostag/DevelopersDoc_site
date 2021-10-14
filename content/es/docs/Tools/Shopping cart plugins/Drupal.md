---
title: "Drupal"
linkTitle: "Drupal"
date: 2021-05-26T08:38:45-05:00
description:
  Este artículo te muestra el procedimiento para habilitar PayU en tu sitio web de Drupal.
weight: 30
tags: ["subtopic"]
---

## Prerrequisitos {#prerequisites}
* Necesitas una cuenta activa en PayU Latam.
* Tener instalado [Drupal Commerce Kickstart 7.xx](https://www.drupal.org/project/commerce_kickstart).
* Haber descargado el plugin de Drupal de PayU y tenerlo guardado en una ruta accesible. Haz clic [aquí](http://developers.payulatam.com/plugins/commerce_payulatam_1.0.zip) para descargarlo.
* Tener acceso a la carpeta de instalación de Drupal.
* Tener acceso al backend de Drupal.

## Instalación {#installation}
El proceso de instalación para instalar el plugin en el servidor de Drupa solo requiere descomprimir el plugin en la ruta ***\sites\all\modules***. La carpeta descomprimida tiene la siguiente estructura:

![PrintScreen](/assets/Drupal/Drupal_01.png)

## Configuración {#configuration}
1. Ingresa al panel de administración de Drupal. Abre el menú _**Site settings**_ y haz clic en la opción _**Modules**_ dentro de la sección _**Advanced settings**_.

![PrintScreen](/assets/Drupal/Drupal_02.png)

2. Localiza y activa el módulo _**Payment Payulatam**_. Puedes utilizar la búsqueda para encontrarlo más fácil.<br>
Cuando termines, haz clic en _**Save configuration**_.

![PrintScreen](/assets/Drupal/Drupal_03.png)

3. De vuelta en el panel de administración de Drupal. Abre el menú _**Store settings**_ y haz clic en _**Payment methods**_.<br>
Busca _**Payment gateway PayuLatam**_ en la lista _**Disabled payment method rules**_ y haz clic en _**enable**_.

![PrintScreen](/assets/Drupal/Drupal_04.png)

Si la activación fue exitosa, Drupal muestra el siguiente mensaje

![PrintScreen](/assets/Drupal/Drupal_05.png)

4. Ahora, haz clic en el enlace _**edit**_ en el método recientemente activado.<br>
Luego, localiza la sección _**Actions**_ y haz clic en _**edit**_ junto a la acción _**Enable payment method: PayuLatam**_. Aquí, configura el plugin utilizando tu cuenta de PayU.

![PrintScreen](/assets/Drupal/Drupal_06.png)

* **API KEY**: Llave única de tu comercio, puedes obtener esta información en tu Módulo PayU (**_Configuración_** > **_Configuración técnica_** > **_API Key_**).
* **Merchant Id**: Identificador de tu comercio en PayU Latam.
* **Account Id**: Identificador de la cuenta PayU de acuerdo con el país en el que quieres vender.
* **Test Enabled**: Asigna `No` si quieres procesar el el ambiente de producción. Si no, asigna `Yes`.

Deja los demás campos con su valor predeterminado.

{{% alert title="Nota" color="info"%}}

Para pruebas, puedes utilizar los valores de **Merchant ID**, **APIKey** y **Account ID** disponibles en [Probar tu solución]({{< ref "Test-your-solution.md" >}}).

Una vez estén en el formulario de pago con tarjeta de crédito y asegurandote de que en la parte superior de la pasarela se muestre el mensaje _Transacción en modo de prueba_, debes:

* Ingresar el texto `APPROVED` en el campo Nombre completo si quieres que la transacción sea aprobada, `REJECTED` si quieres que la transacción sea rechazada o `PENDING` si quieres que la transacción quede pendiente.
* Para el número de la tarjeta, utiliza un número válido que corresponda a la franquicia seleccionada. Puedes utilizar un generador en línea de tarjetas de crédito.
* Los demás campos pueden ser aleatorios.

{{% /alert %}}  

En este punto, tus clientes pueden pagar con PayU Latam en el carrito de compras de Drupal. 

