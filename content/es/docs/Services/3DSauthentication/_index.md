---
title: "Autenticación 3DS"
linkTitle: "Autenticación 3DS"
date: 2024-07-01T11:32:55-05:00
description: >
  Esta sección explica la autenticación 3DS y cómo aprovecharla para mejorar la seguridad en tu procesamiento de pagos con PayU.
  <p>
  Si ya estás familiarizado con 3DS, consulta nuestros métodos de integración:
  <ul>
  <li> <a href="http://developers.payulatam.com/latam/es/docs/services/3dsauthentication/payu-handled-3ds-authentication.html" target="_blank">Autenticación 3DS gestionada por PayU: </a> Deja que PayU gestione el proceso de autenticación por ti. 
  <li><a href="http://developers.payulatam.com/latam/es/docs/services/3dsauthentication/external-3ds-authentication.html" target="_blank">Autenticación 3DS externa: </a> Integra tu servicio 3DS existente con PayU.  
  <li><a href="https://developers.paymentsos.com/docs/flows-and-operations/three-d-secure-two.html" target="_blank">Autenticación 3DS de PayU HUB: </a> Si tu integración es por medio del PayU HUB.
weight: 20
tags: ["parenttopic"]
---

## ¿Qué es 3DS?

3DS (Three-Domain Secure) es un protocolo de seguridad que añade una capa adicional de verificación durante los pagos en línea. Funciona comunicándose de forma segura con el banco emisor de la tarjeta del tarjetahabiente para confirmar su identidad antes de autorizar la transacción. Esto reduce significativamente el riesgo de uso no autorizado de tarjetas y fraude.

{{% alert title="Nota" color="info"%}}
La autenticación 3DS para PayU Latam solo está disponible para **Argentina**, **Brasil**, **Colombia** y **Perú**.
{{% /alert %}}

El siguiente diagrama describe el flujo del protocolo:

![](/assets/3DS/3DS_FLOW_ES.png)

A continuación, un ejemplo del proceso de autenticación:

{{< 3dsAuth/AuthFlow_es >}}

## Beneficios de la autenticación 3DS

* **Mayor seguridad y menos fraude:** Al verificar la identidad del tarjetahabiente, 3DS ayuda a prevenir transacciones fraudulentas. Además, en caso de un contracargo fraudulento, la responsabilidad suele recaer en el banco emisor.

* **Experiencia de usuario mejorada:** Las implementaciones modernas de 3DS garantizan un proceso de autenticación fluido con una interrupción mínima de la experiencia de compra del usuario.

* **Cumplimiento normativo:** 3DS se adhiere a los estándares y regulaciones de <a href="https://www.emvco.com/emv-technologies/3d-secure/" target="_blank">EMVCo</a> en muchos mercados, lo que garantiza el cumplimiento de los comerciantes y procesadores de pago.

## Aprovechamiento de 3DS con PayU

PayU Latam ofrece 2 opciones para integrar la autenticación 3DS en tu procesamiento de pagos:

* <a href="http://developers.payulatam.com/latam/es/docs/services/3dsauthentication/payu-handled-3ds-authentication.html" target="_blank">Autenticación 3DS gestionada por PayU:</a> Si no tienes tu propio servicio 3DS, PayU puede gestionar el proceso de autenticación por ti.

* <a href="http://developers.payulatam.com/latam/es/docs/services/3dsauthentication/external-3ds-authentication.html" target="_blank">Autenticación 3DS externa:</a> Este método te permite aprovechar tu proveedor de servicios 3DS existente. Tú te encargarás del proceso de autenticación y enviarás la respuesta directamente a PayU dentro de la solicitud de pago.

Elige la opción que mejor se adapte a tu infraestructura y preferencias existentes.
