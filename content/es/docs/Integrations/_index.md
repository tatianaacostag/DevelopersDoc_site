---
title: "Integraciones"
linkTitle: "Integraciones"
date: 2021-04-07T10:01:55-05:00
Description: >
  De acuerdo con las necesidades de tu negocio, selecciona cómo quieres integrar tu tienda con los servicios y herramientas de PayU.
weight: 40
---

Implementa PayU con el modelo agregador o gateway, utilizando los acuerdos financieros de PayU o los tuyos. Selecciona la integración que mejor se acople a tus necesidades:

{{< overview/navblocks_es >}}

## Cómo obtener las variables para la integración {#how-to-get-variables-for-integration}
Independiente de la integración que escojas, puedes requerir alguna de las siguientes variables en la invocación de los métodos.

### API key y API Login {#api-key-and-api-login}
1. Ingresa a [PayU.com](payu.com) y haz clic en la opción de log in en a parte superior de la página. O si lo prefieres, puedes ingresar a https://merchants.payulatam.com/.

2. Haz clic en _**Configuración**_ y luego selecciona _**Configuración técnica**_.

![PrintScreen](/assets/IntegrationVariables_01_es.png)

3. En esta ventana, encontrarás tanto el API key como el API Login que permiten autenticar a tu comercio durante el proceso de integración.

![PrintScreen](/assets/IntegrationVariables_02_es.png)

{{% alert title="Advertencia" color="warning"%}}

Ambas llaves con únicas por comercio en PayU, por lo tanto, debes mantener esta información asegurada y su uso o distribución se hace bajo tu responsabilidad. 

{{% /alert %}}  

### Firma de autenticación {#authentication-signature}
La variable `signature` es utilizada para validar los pago realizados a través de la plataforma, asegurando su autenticidad. Esta variable es un valor tipo string encriptado utilizando el algoritmo MD5 o el SHA y tiene la siguiente estructura.

```
ApiKey~merchantId~referenceCode~tx_value~currency
```

Construyamos la variable `signature` utilizando los siguientes valores de prueba:

* **ApiKey**: `4Vj8eK4rloUd272L48hsrarnUA`
* **merchantId**: `508029`
* **referenceCode**: `TestPayU`
* **tx_value**: `3`
* **currency**: `USD`

La cadena es la concatenación de estos valores con el caracter virgulilla (~):

```
4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU~3~USD
```

Luego de aplicar el algoritmo MD5, el valor de la variable `signature` es:

```
ba9ffa71559580175585e45ce70b6c37
```

### variable _deviceSessionId_ {#_devicesessionid_-variable}
La variable _deviceSessionId_ es un código con la información del dispositivo donde se genera la transacción y provee un identificador único para el mismo. Esta variable no permite identificar atacantes.

1. Para hace integración API o SDK, necesitas incluir el siguiente script en tu formulario de pago:

```` HTML
<script type="text/javascript" src="https://maf.pagosonline.net/ws/fp/tags.js?id=${deviceSessionId}80200"></script>
<noscript>
   <iframe style="width: 100px; height: 100px; border: 0; position: absolute; top: -5000px;" src="https://maf.pagosonline.net/ws/fp/tags.js?id=${deviceSessionId}80200"></iframe>
</noscript>
````
<br>

2. Es importante generar el `deviceSessionId` por cada transacción. Para generar el `deviceSessionId` obten el `session_id` de la cookie y concaténalo junto con la fecha y hora actual en milisegundos Then, encrypt the result using MD5.

Ejemplo en PHP

```` PHP
$deviceSessionId = md5(session_id().microtime())
````
<br>

Por ejemplo, si el `$deviceSessionId` es `d66f949f19b33e88c202b579cfc549b3`, el script es:

```` HTML
<script type="text/javascript" src="https://maf.pagosonline.net/ws/fp/tags.js?id=d66f949f19b33e88c202b579cfc549b380200"></script>
<noscript>
	<iframe style="width: 100px; height: 100px; border: 0; position: absolute; top: -5000px;" src="https://maf.pagosonline.net/ws/fp/tags.js?id=d66f949f19b33e88c202b579cfc549b380200"></iframe>
</noscript>
````
<br>

3. Por último, debes enviar el `$deviceSessionId` en la variable correspondiente a tu integración:

* Para **API**: `transaction.deviceSessionId`
* Para **SDK JAVA**: `PayU.PARAMETERS.DEVICE_SESSION_ID`
* Para **SDK PHP**: `PayUParameters::DEVICE_SESSION_ID`