---
title: "Configuración técnica"
linkTitle: "Configuración técnica"
date: 2021-08-13T12:19:55-05:00
type: docs
Description: >
  Encuentra aquí todos los detalles que te ayudarán a integrar tu página web usando cualquiera de nuestras [integraciones](/es/docs/integrations.html).
weight: 20
tags: ["subtopic"]
---

## Obtener la información técnica {#getting-technical-information}
Independiente de la [integración]({{< ref "integrations" >}}) que utilices, necesitas las siguientes variables en la petición de los métodos o en sus parámetros.

### Merchant y account IDs {#merchant-and-account-ids}
Estos valores te permiten autenticar tanto a tu comercio (Merchant ID) como a su cuenta (Account ID) cuando utilizas cualquiera de las integraciones para utilizar los servicios que brindamos.

Cuando inicias sesión en tu módulo PayU, encuentras ambos valores en el panel izquierdo.

<img src="/assets/Merchant_Ids_es.png" alt="PrintScreen" width="60%"/>

### API key y API Login {#api-key-and-api-login}
1. En el módulo PayU, haz clic en _**Configuración**_ y luego selecciona _**Configuración técnica**_.

![PrintScreen](/assets/IntegrationVariables_01_es.png)

2. En esta ventana, encontrarás tanto el API key como el API Login que permiten autenticar a tu comercio durante el proceso de integración.

![PrintScreen](/assets/IntegrationVariables_02_es.png)

{{% alert title="Advertencia" color="warning"%}}

Ambas llaves con únicas por comercio en PayU, por lo tanto, debes mantener esta información asegurada y su uso o distribución se hace bajo tu responsabilidad. 

{{% /alert %}} 

## Configurar la información técnica {#configuring-technical-information} 
En esta sección podrás configurar propiedades técnicas pertenecientes a cada cuenta activa como:
* La configuración de URLs para las páginas de Respuesta y Confirmación
* Habilitar las opciones de envío de correos al comprador y a tu comercio al momento de realizar una venta.
* Habilitar las notificaciones para el proceso de Disputas.
* Seleccionar si tus pagos se procesan en modo pruebas o en producción

Para configurar esta información, haz clic en _**Configuración**_ y luego selecciona _**Configuración técnica**_.

![PrintScreen](/assets/IntegrationVariables_01_es.png)

En la ventana _**Configuración técnica**_, encuentras dos pestañas de acuerdo a tus necesidades: _**Pagos**_ o _**Disputas**_.

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_01_es.png)

### Pagos {#payments}
En esta pestaña puedes configurar la siguiente información.

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_02_es.png)

<div class="variables"></div>

| Parámetro | Descripción |
|---|---|
| Tus pagos se procesan | Selecciona si tus transacciones son procesadas _En Producción_ o en _Modo prueba_. Cuando procesas en _Modo prueba_, las transacciones realizadas a través de tu página web o a través de solicitudes de pago son marcadas como de prueba y el pago no es real. |
| URL de respuesta | Es la página a la cual se redirecciona el comprador una vez finaliza la transacción en PayU, en esta página se muestra el estado de la transacción. |
| URL de confirmación | Es la página a la cual PayU envía la confirmación del pago a tu sistema. Esto es útil para actualizar inventarios y bases de datos una vez la transacción llegue a su estado final.<br>Esta página no es obligatoria. |
| Controlar pagos dobles | Al habilitar esta opción, validamos que la referencia de cada pago enviado a nuestro sistema sea única. En caso contrario, podrás enviar una misma referencia para todas tus ventas. |
| Notificaciones de pagos procesados | Esta opción te permite enviar un correo electrónico al pagador o a ti cuando el pago sea aprobado o rechazado. |

### Disputas {#disputes}
En esta pestaña puedes configurar la siguiente información del proceso de [disputas]({{< ref "Disputes-MP.md" >}}).

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_03_es.png)

<div class="variables"></div>

| Parámetro | Descripción |
| --- | --- |
| Correos de notificaciones | Configura las direcciones de correo electrónico para recibir notificaciones cuando se inicie un proceso de disputa. |
| URL de notificación automática | Si habilitas esta opción, puedes establecer la URL a la que PayU envía la notificación de un proceso de disputa. |

{{% alert title="Nota" color="info"%}}

No olvides hacer clic en _**Guardar cambios**_ al final de la sección para aplicar los cambios.

{{% /alert %}} 