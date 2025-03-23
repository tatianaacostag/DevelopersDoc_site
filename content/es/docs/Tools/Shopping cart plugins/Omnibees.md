---
title: "Omnibees"
linkTitle: "Omnibees"
date: 2025-03-10T10:30:35-05:00
description:
  Esta guía explica cómo integrar PayU con Omnibees. 
weight: 3
tags: ["subtopic"]
---

Omnibees es una plataforma de distribución y gestión hotelera que proporciona tecnología para que los hoteles gestionen reservas y optimicen los ingresos a través de múltiples canales de venta. Para obtener más información, visita el <a href="https://omnibees.com" target="_blank">sitio web oficial de Omnibees</a>.

## Requisitos Previos {#prerequisites}

Antes de integrar PayU con Omnibees, asegúrate de tener lo siguiente:

* Una <a href="https://developers.payulatam.com/latam/es/docs/getting-started/create-an-account.html" target="_blank">cuenta activa de PayU Latam</a>.
* Una <a href="https://control.paymentsos.com/signup" target="_blank">cuenta activa de PayU Enterprise (PaymentsOS)</a> en modo de producción/en vivo (consulta los detalles de activación a continuación).

## Activación de Tu Cuenta de PayU Enterprise (Modo Live) {#activating-your-payu-enterprise-account-live-mode}

Por defecto, las cuentas nuevas se configuran en modo de prueba. Para habilitar las transacciones en vivo, contacta a tu gerente de cuenta y envía una solicitud con los siguientes detalles:

* **Merchant ID:** Localiza el Merchant ID de tu cuenta LATAM en el <a href="https://developers.payulatam.com/latam/es/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html#merchant-and-account-ids" target="_blank">Panel de Gestión de PayU</a>.
* **Account ID:** Encuentra tu Account ID en el panel de control de PayU Enterprise haciendo clic en tu nombre de usuario en la esquina superior derecha.
<br>

![PrintScreen](/assets/VTEX/vtex01es.png)

## Integración de PayU con Omnibees

La integración consta de dos pasos principales:

1. Configuración de tu cuenta de PayU Enterprise
2. Contactar a Omnibees para habilitar la integración

### 1. Configuración de tu Cuenta de PayU Enterprise

PayU Enterprise opera a través de PaymentsOS, que actúa como middleware entre PayU Latam y Omnibees. La configuración incluye los siguientes componentes:

* Configuración del proveedor
* Configuración de la unidad de negocio
* Creación de webhook

#### 1.1 Configuración de un Proveedor

Un _proveedor_ almacena tus credenciales de procesamiento de pagos. Sigue estos pasos para configurar uno:

1. En el panel de control de PayU Enterprise, navega a **Configurations** > **Providers**.

![PrintScreen](/assets/VTEX/vtex02.png)

2. Haz clic en el módulo correspondiente al país o división que estás configurando.

3. Completa los siguientes campos:

| Campo | Descripción |
|---|---|
| Configuration Name | Ingresa un nombre para la configuración del proveedor. |
| Description | Proporciona una descripción opcional. |
| apiLogin | Nombre de usuario o login proporcionado por PayU. [Obtener API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| apiKey | Clave única de tu comercio. [Obtener API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| accountId | ID de la cuenta de PayU basado en tu país de operación. |
| merchantId | Tu ID de comercio en PayU Latam. |
| paymentCountry | País de procesamiento en formato ISO 3166 Alpha-3. |
| multicapture | Selecciona **None**. |
| cashRedirect | Selecciona **None**. |

{{% alert title="Nota" color="info"%}}

Si estás utilizando versiones anteriores del Módulo Administrativo de PayU, encuentra la información de tu cuenta en **Configuración** > **Información técnica**.

![PrintScreen](/assets/omnibees/omnibees1es.png)

{{% /alert %}}

4. Haz clic en **Create**.

<img src="/assets/omnibees/omnibees2.png" alt="PrintScreen" style="width: 450px; height: auto;">
<br>

#### 1.2 Creación de una Unidad de Negocio

Una _unidad de negocio_ vincula la configuración del proveedor con las credenciales de la API de PayU Enterprise para procesar transacciones. Sigue estos pasos:

1. En el panel de control, ve a **Configurations** > **Business Units**.

<img src="/assets/VTEX/vtex04.png" alt="PrintScreen" style="width: 400px; height: auto;">
<br>

2. Haz clic en **Create Business Unit** e ingresa:

| Campo | Descripción |
|---|---|
| Business Unit Name | Debe estar en minúsculas y no contener espacios. **Este valor no se puede cambiar más tarde, así que asegúrate de que sea preciso.** |
| Description | Descripción opcional. |

3. En la sección **Choose a Default Provider for This Business Unit**, selecciona el proveedor creado en el paso 1.1 y luego haz clic en **Create**.

<img src="/assets/omnibees/omnibees3.png" alt="PrintScreen" style="width: 700px; height: auto;">
<br>

{{% alert title="Nota" color="info"%}}

Puedes hacer clic en la pestaña de la unidad de negocio para obtener los siguientes detalles necesarios para la integración de Omnibees: **App ID**, **Public API key** y **Private API key**.

<img src="/assets/omnibees/omnibees4.png" alt="PrintScreen" style="width: 450px; height: auto;">

{{% /alert %}}

#### 1.3 Creación de un webhook

El webhook recibe notificaciones de Omnibees cuando el estado de una transacción cambia. Sigue estos pasos:

1. En el panel de control, navega a **Configurations** > **Webhooks**.

<img src="/assets/VTEX/vtex06.png" alt="PrintScreen" style="width: 400px; height: auto;">
<br>

2. Haz clic en **Create a Webhook Endpoint** e ingresa:

   ```
   https://paymentgateways.omnibees.com/PayUWebhookService.ashx
   ```

3. Habilita **Update** y **Create** para el evento **Charge** en **Payment Event Alerts**.

4. Asigna el webhook a la unidad de negocio creada anteriormente y selecciona la versión más reciente del webhook.

5. Haz clic en **Create**.

<img src="/assets/omnibees/omnibees5.png" alt="PrintScreen" style="width: 600px; height: auto;">
<br>

## 2. Contactar a Omnibees para Habilitar la Integración

Una vez que los componentes de PayU Enterprise estén configurados, envía un correo electrónico a **servicedesk@omnibees.com** para solicitar la activación. Incluye los siguientes detalles:

* App ID
* Public API key
* Private API key
* Unidad de negocio (opcional)

## Gestión de Usuarios en PayU Enterprise

PayU Enterprise permite el acceso de usuarios basado en roles para las unidades de negocio. Para obtener detalles sobre la gestión de usuarios y permisos, consulta la <a href="https://developers.paymentsos.com/docs/features/control-center.html#user-management" target="_blank">documentación de PayU Enterprise</a>.
