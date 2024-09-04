---
title: "Configuración Técnica"
linkTitle: "Configuración Técnica"
date: 2021-08-13T12:19:55-05:00
type: docs
Description: >
  Esta guía proporciona detalles esenciales para integrar tu sitio web utilizando cualquiera de los [métodos de integración](/es/docs/integrations.html) que ofrecemos.
weight: 20
tags: ["subtopic"]
---

## Información Técnica General {#technical-information-overview}

Independientemente del [método de integración]({{< ref "integrations" >}}) que elijas, ciertos detalles técnicos son necesarios para garantizar una integración exitosa. Este documento describe las variables clave y configuraciones que necesitas ajustar.

### Merchant ID y Account ID {#merchant-and-account-ids}

Estos identificadores son cruciales para autenticar tu cuenta de comerciante con PayU. Puedes encontrarlos en el panel izquierdo del sitio de administración después de iniciar sesión.

<img src="/assets/Merchant_Ids_es.png" alt="PrintScreen" width="60%"/>

### API Key y API Login {#api-key-and-api-login}

1. Inicia sesión en tu Panel de Administración.

2. Navega a _**Configuración**_ y selecciona _**Configuración Técnica**_.

![PrintScreen](/assets/IntegrationVariables_01_es.png)

3. En el panel derecho, encontrarás tanto la API Key como el API Login, necesarios para autenticar tus transacciones durante la integración.

![PrintScreen](/assets/IntegrationVariables_02_es.png)

{{% alert title="Advertencia" color="warning"%}}

Tu llave API y tu API Login son únicos para tu cuenta PayU. Asegúrate de mantener estas credenciales seguras, ya que su mal uso o divulgación no autorizada es tu responsabilidad. 

{{% /alert %}} 

## Configurar la Información Técnica {#configuring-technical-information}

Puedes personalizar varias configuraciones técnicas para cada cuenta activa, incluyendo:

- URLs para páginas de confirmación y de respuesta.
- Notificaciones por correo electrónico para compradores y para tu tienda.
- Notificaciones del proceso de disputas.
- Selección del modo de prueba o transacciones en producción.

Para configurar esta información, ve a _**Configuración**_ > _**Configuración Técnica**_.

![PrintScreen](/assets/IntegrationVariables_01_es.png)

En la ventana de _**Configuración Técnica**_, encontrarás dos pestañas según tus necesidades: _**Pagos**_ y _**Disputas**_.

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_01_es.png)

### Pagos {#payments}

En la pestaña _**Pagos**_, puedes configurar lo siguiente:

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_02_es.png)

<div class="variables"></div>

| Parámetro | Descripción |
|---|---|
| Tus pagos se procesan | Elige si tus transacciones se procesan _En Producción_ o _En Modo de Prueba_. Las transacciones procesadas en _Modo de Prueba_ se marcan como pruebas y no son reales. |
| URL de respuesta | La URL a la que se redirige a los compradores después de completar una transacción. Esta página muestra el estado de la transacción. |
| URL de confirmación | La URL a la que PayU envía la confirmación del pago a tu sistema. Usa esta URL para actualizar el inventario o las bases de datos cuando una transacción alcanza su estado final. Este parámetro es opcional. |
| Controlar pagos dobles / Solo para ventas aprobadas | <li><b>Controlar pagos dobles:</b> Si habilitas esta opción, la referencia solo se puede usar una vez, independientemente del resultado de la transacción (aprobada, rechazada, pendiente).</li> <li><b>Solo para ventas aprobadas:</b> Si marcas esta casilla, una referencia se puede reutilizar solo si la transacción anterior fue rechazada. Si la transacción anterior estaba pendiente o aprobada, la referencia no se puede reutilizar.</li> <li><b>Controlar pagos dobles + Solo para ventas aprobadas:</b> Si habilitas ambas funcionalidades, la referencia solo se puede usar una vez (prevalece la regla "Validar referencia única para todos los estados").</li> <li><b>Ambas casillas deshabilitadas:</b> La referencia se puede reutilizar varias veces, independientemente del resultado de la transacción. Ten en cuenta que al tener ambas opciones deshabilitadas, se puede afectar la conciliación ya que la misma referencia podría aparecer varias veces con diferentes estados.</li> <br> <b>Nota:</b><br> Tiempo de reintento: Si necesitas reenviar una referencia, espera una respuesta de PayU o al menos 60 segundos. |
| Notificaciones de pagos procesados | Habilita las notificaciones por correo electrónico que se envían al comprador o a tu tienda cuando un pago es aprobado o rechazado. |

### Disputas {#disputes}

En la pestaña _**Disputas**_, puedes configurar los ajustes relacionados con el [proceso de disputas]({{< ref "Disputes-MP.md" >}}).

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_03_es.png)

<div class="variables"></div>

| Parámetro | Descripción |
| --- | --- |
| Correos de notificaciones | Establece las direcciones de correo electrónico a las que se enviarán notificaciones cuando se inicie una disputa. |
| URL de notificación automática | Si está habilitado, configura la URL a la que PayU enviará notificaciones sobre los procesos de disputa. |

{{% alert title="Nota" color="info"%}}

Recuerda hacer clic en el botón _**Guardar cambios**_ para aplicar cualquier actualización que realices.

{{% /alert %}} 