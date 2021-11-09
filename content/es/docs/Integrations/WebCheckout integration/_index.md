---
title: "Integración WebCheckout"
linkTitle: "Integración WebCheckout"
date: 2021-03-29T11:52:52-05:00
description: >
  La Integración WebCheckout le permite a tus clientes seleccionar los ítems que desean comprar en tu tienda y realizar el pado en nuestra pasarela de pagos (WebCheckout).
weight: 10
tags: ["parenttopic"]
---

![WebCheckout integration](/assets/Checkout1-es.png)

Puedes incluir el logo de tu compañía en nuestra pasarela enviándolo a través del método HTTP POST.

{{% alert title="Nota" color="info"%}}
La persona encargada de la integración de tu tienda con nuestra pasarela de pagos (WebCheckout) debe tener conocimientos de lenguajes de programación dinámicos como PHP o Java.
{{% /alert %}}

## ¿Cómo funciona la integración con el WebCheckout? {#how-does-the-webcheckout-integration-work}
El procedimiento para permitir que tus clientes paguen utilizando los servicios de PayU es simple.

1. Tu cliente navega tu página y selecciona los productos o servicios que quiere comprar. Tu sistema actualiza el monto de la compra y envía a nuestro sistema el formulario de pago con la información de la compra.<br>Tu sistema debe enviar esta información a través de `HTTP POST`.

![WebCheckout integration](/assets/paso1-es.jpg)

2. Para el procesamiento del pago, tu cliente es redirigido a nuestro Checkout donde puede seleccionar el método de pago.<br>PayU soporta varios métodos de pago que se ajustan con las necesidades de tu cliente de acuerdo con el país en el que proceses la compra, [mira los métodos de pago disponibles]({{< ref "select-your-payment-method.html" >}}).

![WebCheckout integration](/assets/paso2-es.jpg)

3. PayU procesa la transacción y muestra el resultado en nuestra página de respuesta.

![WebCheckout integration](/assets/paso3-es.jpg)

4. Cuando el cliente regresa a tu página luego del proceso de pago, PayU lo redirige a tu Página de respuesta y envía la transacción a través de `HTTP GET`. Necesitas procesar la respuesta y mostrar su información a tu cliente.

![WebCheckout integration](/assets/paso4-es.jpg)

5. En paralelo, PayU notifica el estado de la transacción a la página de confirmación a través de `HTTP POST`. Además, PayU te notifica el resultado de la transacción a ti a través de correo electrónico.

![WebCheckout integration](/assets/paso5-es.jpg)

## Consideraciones {#considerations}
* Tu página debe estar codificada en `UTF-8`.
* La página del WebCheckout no puede ser incluida en un iframe.
* No enmascares la URL durante el proceso de checkout.
* No utilices certificados de seguridad de curva elíptica o aquellos que cuenten con la suite de encriptación `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA` en tu página de confirmación.

## Componentes de integración {#integration-components}
Consulta las siguientes secciones para aprender a integrarte utilizando la Integración WebCheckout.