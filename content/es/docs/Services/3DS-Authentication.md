---
title: "Autenticación 3DS"
date: 2021-12-07T10:25:17-05:00
description: >
  3DS (en inglés **Three-Domain Secure**) te permite realizar un proceso de autenticación intuitivo y amigable con el cliente. 3DS agrega capas de seguridad adicionales para reducir el fraude evitando el uso no autorizado de tarjetas de crédito. 
weight: 20
---

## ¿Qué es 3DS? {#what-is-3ds}
3DS (en inglés **Three-Domain Secure**) es un protocolo de mensajería que permite a los emisores autenticar a sus tarjetahabientes durante las compras en línea. Esta autenticación se realiza antes de autorizar la transacción y sigue éste flujo.

![](/assets/3DS/3DS_whatis_es.png)

La siguiente infografía explica el flujo de autenticación de 3DS.

{{< 3dsAuth/AuthFlow_es >}}

## Beneficios de 3DS {#3ds-benefits}
3DS (en inglés **Three-Domain Secure**) agrega capas de seguridad adicionales para reducir el fraude evitando el uso no autorizado de tarjetas de crédito, protegiéndote de contracargos por fraude. 

Utilizando 3DS, puedes tener:

* **Más aprobación, menos fraude.**<br>
El intercambio de datos entre comercios y emisores ayuda a una mejor toma de decisiones de autorización y detección de fraudes. En caso de contracargos por fraude el emisor es quien tiene la responsabilidad ante el comprador.

* **Mejor experiencia de usuario.**<br>
3DS permite una mejor integración del proceso de autenticación en la experiencia de compra del usuario final. Disminuye la fricción con el usuario en un mayor porcentaje de las transacciones.

* **Cumple con las regulaciones y estándares de [EMVCo](https://www.emvco.com/emv-technologies/3d-secure/).**<br>
Admite una sólida autenticación de clientes para emisores, adquirentes, y servicios de pago en mercados regulados. 

## Solución de Autenticación 3DS {#3ds-authentication-solution}
La Autenticación 3DS, disponible para Brasil y Colombia, se ofrece vía API bajo dos modalidades:

* _**Pass Through**_: si tienes tu propio servicio de Autenticación 3DS, puedes enviarnos la respuesta de la autenticación en la petición de pago. Bajo esta modalidad, tú eres responsable de la integración con un _**MPI**_ o un _**3DS Server**_.<br>El _**Pass Through**_ está dirigido a comercios integrados vía API a la plataforma de **PayU Latam**. Para más información, contacta a tu representante de ventas.

* _**Flujo de dos llamados**_: si deseas autenticar la transacción utilizando PayU, puedes integrarte a través del **PayU Hub**<sup>\*</sup> utilizando el [Servicio de Autenticación](https://developers.paymentsos.com/docs/threed-d-secure-authentication-service.html) que opera en un flujo de dos llamados; uno para la autenticación y otro para la autorización.
  - Para la _autenticación_, debes conectarte al PayU Hub, donde vas a obtener la respuesta de la autenticación.
  - Para la _autorización_, puedes escoger utilizar **PayU Latam** o **PayU Hub**.

  <br>El _**Flujo de dos llamados**_ está dirigido a comercios con las siguientes características:
    - Comercios integrados vía API a la plataforma de **PayU Latam** (directamente, no a través de partners).
    - Comercios integrados al **PayU Hub** que procesen en países de LATAM. <img src="/assets/Brasil.png" width="2%"/><img src="/assets/Colombia.png" width="2%"/>
    - Comercios grandes que quieren controlar su flujo de autenticación y quieren decir cuáles transacciones van a autenticar.
    - Comercios con grandes recursos tecnológicos para hacer la integración API.

<sup>\*</sup>El **PayU Hub**, es la solución de pagos sin fronteras globales. Con única integración API , procesa pagos locales con medios de pago relevantes en 18 mercados.

{{% alert title="Note" color="info"%}}
La Autenticación 3DS está soportada para Visa y MasterCard.
{{% /alert %}}

Ten en cuenta lo siguiente cuando utilices la Autenticación 3DS:

* El Servicio de Autenticación es independiente del Servicio de Autorización.
* La Autorización debe incluir la respuesta de la Autenticación.

### Beneficios de nuestra solución {#benefits-of-our-solution}
Cuando utilices el Servicio de Autenticación ofrecido por el **PayU Hub** (Flujo de dos llamados), tienes los siguientes beneficios.

* PayU está conectado a un servidor 3DS (MPI), no es necesario que lo hagas por tu cuenta. ¡Menos proveedores y contratos!
* Tú controlas y decides cuándo autenticar una transacción.
* Sin costos adicionales<sup>\*</sup>. ¡La autenticación es un servicio gratuito que ofrece PayU!.
* Si migras al HUB, puedes tener beneficios adicionales de nuestra solución global.

<sup>\*</sup> _Los adquirentes pueden cobrar un costo de autenticación, de ser así, este costo se te transferirá._

### ¿Cómo integrar 3DS? {#how-to-integrate-3ds}
La Autenticación 3DS es un servicio disponible bajo demanda, contacta a tu Key Account Manager para firmar los Términos y Condiciones para activarlo.<br>Dependiendo del escenario que escojas para utilizar la Autenticación 3DS, el procedimiento de integración varia.

#### Pass Through
Cuando estás integrado con un _**MPI**_ o un _**3DS Server**_, solo necesitas enviarnos la respuesta de la autenticación en la petición de pago. Consulta tu país de procesamiento para ver un ejemplo de cómo enviamos los parámetros retornados en la respuesta:

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Brazil.md#considerations" >}}'><img src="/assets/Brasil.png" width="10%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Colombia.md#considerations" >}}'><img src="/assets/Colombia.png" width="10%"/></a>
  </div>
</div>
<br>

#### Flujo de dos llamados {#flujo-de-dos-llamados}
Sigue estos pasos para integrate con nuestro servicio de Autenticación:

1. Para empezar, abre una cuenta en el **PayU Hub**.<br>Haz clic [aquí](https://control.paymentsos.com/signup) para crear una.

2. Actualiza tu integración. Solicita a tu equipo de desarrollo la actualización de la integración para ahora se conecte al API del **PayU Hub**.

3. Todo lo que queda ahora son algunas pruebas, ¡y listo! realiza el paso producción. 

¡Todo lo demás permanece igual!

* Tu oferta actual se mantiene. Puedes seguir ofreciendo tus medios de pago actuales a través de **PayU Latam** o del **PayU Hub**.
* ¿Nuevo proceso de Onboarding? ¡Claro que no! Ya estás con nosotros, así que no necesitamos nada más.
* Los pagos aún son manejados por las plataformas locales, por lo que nos aseguraremos de que los mismos datos estén disponibles para ti.
