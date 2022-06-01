---
title: "Validación de la variable OrderId"
linkTitle: "Variable OrderId"
date: 2017-01-05
type: docs
description: > 
exclude_search: true
notopicssection: true
---

## Introducción {#overview}
Debido al crecimiento exponencial del comercio electrónico y los pagos en línea, el tamaño de los identificadores que devolvemos desde nuestro procesador de pagos se ha incrementado.

Nuestras estimaciones muestran que sobrepasaremos la barrera de los 10 dígitos del parámetro `orderId`. Esto hace que cambiamos el tipo numérico actual del parámetro para permitir un mayor número de dígitos en los identificadores retornados; por lo tanto, el tipo de datos actual ya no será compatible y este cambio puede afectar tu integración con nuestra plataforma.

Para evitar problemas debido a este cambio, debes validar si el nuevo tipo retornado coincide con tu integración actual. Sigue las pautas explicadas en este artículo para verificar si tu integración requiere una actualización.

### Preguntas frecuentes {#frequently-asked-questions}

* **¿Cómo puedo comprobar si el cambio del tipo de datos afecta mi integración?**<br>Consulta la sección [_**Procedimiento de validación**_]({{< ref"#validation-procedure" >}}) para saber cómo validar según el tipo de integración que tengas con nosotros.

* **Mi integración es a través de una plataforma de comercio digital (como VTEX, Shopify, etc), ¿Necesito implementar el cambio?**<br>No, tu plataforma de comercio digital implementará el cambio de forma silenciosa. Sin embargo, debes verificar si tienes conexiones externas a la plataforma para reportes o consultas.

* **¿Cuál es el cambio en el tipo de datos?**<br>Actualmente, el parámetro `orderId` se retorna utilizando el tipo `Integer`, el nuevo tipo de datos para este parámetro será `Long`.

* **¿Este cambio es obligatorio?**<br>Si después de haber verificado tu integración, encontraste que el `orderId` es una variable de tipo `Integer`, sí. De lo contrario, no tienes que cambiar tu integración.

* **¿Este cambio solo afecta el flujo de Pago?**<br>No, este cambio también puede tener impacto en tus reportes o consultas relacionadas con transacciones. Ten cuidado cuando realices la validación.

* **¿Qué sucede si no aplico este cambio?**<br>Si no realizas este cambio y este afecta tu integración, **no** podrás recibir la confirmación del procedimiento de pago. Además, **no** podrás consultar nuevas transacciones a partir de que empecemos a retornar el parámetro `orderId` con más de 10 dígitos.

* **¿El equipo de Soporte de PayU puede hacer este cambio por mí?**<br>No, tú decides cómo te integras con nuestros servicios. PayU no se hace responsable por errores debido a integraciones incorrectas.

* **¿Es necesario volver a implementar este cambio?**<br>No en un futuro cercano. El cambio del tipo de dato nos permite tener una mayor capacidad en la generación de identificadores. Este cambio nos permite generar hasta _**9.223.372.036.854.775.807**_ identificadores.

## Procedimiento de validación {#validation-procedure}
La validación de `orderId` depende de tu integración.

### Integración API {#api-integración}
Si tu tienda está integrada a través de **API** y utilizas un lenguaje **tipado** para tu integración, debes validar cómo declaraste la variable numérica `orderId`.

* Si la variable `orderId` es de tipo `int` o `Integer`, debes cambiarla a tipo `long` o `Long`.
* Si usas el API de consultas y estás mapeando la variable `orderId` con el tipo `int` o `Integer`, debes cambiarlo al tipo `long` o `Long`.
* Debes validar con tu equipo técnico si la variable `orderId` está siendo almacenada en una base de Datos. Si es así, valida que la columna en tu base de datos admita valores de tipo `Long`.

### Integración SDK {#sdk-integration}
Si te estás integrando con nuestros servicios usando el SDK, cambia el archivo _**.jar**_ de la versión actual.

<a href="http://developers.payulatam.com/sdk/java/payu-java-sdk-1.4.0.zip" target="_blank" class="payu-btn-green">Descarga el SDK Java 1.4.0</a>

### Integración WebCheckout {#webcheckout-integration}
Si tu tienda está integrada a través de **WebCheckout** y utilizas un lenguaje **tipado** para tu integración, debes validar cómo declaraste la variable numérica `orderId`.

* Si la variable `orderId` utilizada en la página de confirmación está definida como tipo `int` o `Integer`, debe cambiarla al tipo `long` o `Long`.
* Si usas el API de consultas y estás mapeando la variable `orderId` con el tipo `int` o `Integer`, debes cambiarlo al tipo `long` o `Long`.
* Debes validar con tu equipo técnico si la variable `orderId` está siendo almacenada en una base de Datos. Si es así, valida que la columna en tu base de datos admita valores de tipo `Long`.

## Soporte {#support}
Para solicitar soporte o hacer preguntas relacionadas con este cambio, comunícate con nuestro equipo de soporte en tu país:

<div style="display: flex;">
  <div style="float: left;width: 50%;">
    <ul>
      <li><img src="/assets/Argentina.png" width="25px"/> <a href="tecnico.ar@payu.com">tecnico.ar@payu.com</a></li>
      <li><img src="/assets/Brasil.png" width="25px"/> <a href="tecnico.br@payu.com">tecnico.br@payu.com</a></li>
      <li><img src="/assets/Chile.png" width="25px"/> <a href="tecnico.cl@payu.com">tecnico.cl@payu.com</a></li>
      <li><img src="/assets/Colombia.png" width="25px"/> <a href="tecnico.co@payu.com">tecnico.co@payu.com</a></li>
    </ul>
  </div>
  <div style="float: left;width: 50%;">
    <ul>
      <li><img src="/assets/Mexico.png" width="25px"/> <a href="tecnico.mx@payu.com">tecnico.mx@payu.com</a></li>
      <li><img src="/assets/Panama.png" width="25px"/> <a href="tecnico.pa@payu.com">tecnico.pa@payu.com</a></li>
      <li><img src="/assets/Peru.png" width="25px"/> <a href="tecnico.pe@payu.com">tecnico.pe@payu.com</a></li>
    </ul>
  </div>
</div>