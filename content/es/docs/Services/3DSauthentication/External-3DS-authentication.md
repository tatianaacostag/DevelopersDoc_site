---
title: "Autenticación 3DS Externa"
linkTitle: "Autenticación 3DS Externa"
date: 2024-07-01T11:32:55-05:00
description: >
  Aprovecha tu servicio 3DS existente para mejorar la seguridad de los pagos con la integración passthrough de PayU.
weight: 22
tags: ["subtopic"]
---

## Aprovechamiento de una Autenticación 3DS Externa
Si tienes tu propio servicio de autenticación 3DS, puedes integrarlo fácilmente con PayU. Este enfoque también se conoce como **passthrough** y te permite gestionar el proceso de autenticación directamente con tu Merchant Plug-in (MPI) o servidor 3DS elegido.

{{% alert title="Notas" color="info"%}}
* La autenticación 3DS para PayU Latam solo está disponible para **Argentina**, **Brasil**, **Colombia**, **México** y **Perú**.
* Esta funcionalidad requiere una integración API y no está disponible para la integración Webcheckout.
* **Redes compatibles actualmente:** Visa y Mastercard
{{% /alert %}}

## Cómo Funciona
* **Utiliza tu servicio 3DS existente:** PayU se integra perfectamente con tu proveedor preferido para un flujo de trabajo fluido.
* **Gestiona la autenticación:** Tú manejas la comunicación entre tu plataforma y el servicio 3DS.
* **Envía la respuesta a PayU:** Incluye la respuesta de autenticación de tu servicio 3DS dentro de tu solicitud de pago a PayU.

### Consideraciones Importantes
* **Servicios independientes:** Tu servicio 3DS funciona independientemente del servicio de autorización de PayU.
* **Datos combinados necesarios:** Para un procesamiento de pago exitoso, tu solicitud de autorización de PayU debe incluir la respuesta de autenticación de tu servicio 3DS.

## Documentación Específica por País
Para obtener instrucciones detalladas sobre cómo incluir parámetros de respuesta de autenticación en tu solicitud, consulta la documentación de tu país de procesamiento:

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Argentina.md#consideraciones" >}}'><img src="/assets/Argentina.png" width="16%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Brazil.md#consideraciones" >}}'><img src="/assets/Brasil.png" width="16%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Colombia.md#consideraciones" >}}'><img src="/assets/Colombia.png" width="16%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
      <a href='{{< ref "Payments-API-Mexico.md#considerations" >}}'><img src="/assets/Mexico.png" width="16%"/></a>
    </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Peru.md#consideraciones" >}}'><img src="/assets/Peru.png" width="16%"/></a>
  </div>
</div>
<br>
