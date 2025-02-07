---
title: "Disputas"
date: 2021-09-03T16:42:19-05:00
type: docs
Description: >
  Aprende a gestionar el proceso de disputas para tus clientes, incluyendo la configuración de métodos de notificación, la revisión de disputas, la presentación de pruebas o la iniciación de reembolsos. Para más detalles sobre cómo funciona el mecanismo de disputas en PayU, consulta la documentación de <a href="https://developers.payulatam.com/latam/es/docs/tools/disputes.html" target="_blank">Disputas</a>.
weight: 40
---

El siguiente diagrama ilustra el flujo del proceso de disputas en PayU, destacando cada paso desde la notificación hasta la resolución:

{{< disputes/disputes_flow_es >}}

## Permisos Requeridos
Para acceder a este módulo, tu perfil debe tener los siguientes permisos habilitados:

- _Reportes_ > _Reembolsos y disputas_
- _Reportes_ > _Resolver disputas con compradores (gestionar contracargos)_

Consulta [Perfiles y Permisos]({{< ref "Profile-and-permissions-management.md" >}}) para más detalles.

## ¿Por Qué Es Importante Responder a una Disputa?

Responder a las disputas rápidamente es crucial para proteger tu negocio:

- Evita dañar la confianza de los clientes.
- Previene que se deduzcan fondos de tu cuenta.
- Reduce el riesgo de un aumento en los fondos de reserva impuestos por el área de riesgo.
- Preserva tu puntaje de código PayU con las redes de pago.
- Asegura que los montos en disputa no queden congelados por períodos prolongados.

Debes proporcionar pruebas antes de la fecha límite establecida por el banco. Si no cumples con el plazo, el monto puede ser debitado de tu cuenta.

Para información sobre los plazos, consulta [Plazos para Enviar Evidencia]({{< ref "disputes.md#plazos-para-enviar-evidencia" >}}).

## Recibir Notificaciones de Disputas

Puedes recibir notificaciones de disputas a través de dos métodos:

1. **Notificaciones por Correo Electrónico**: Recibe actualizaciones directamente en tu correo.
2. **Notificaciones Automáticas**: Configura una URL en la sección _**Configuración Técnica**_ del Panel de Administración para recibir actualizaciones de disputas mediante `POST`.

### Pasos para Habilitar Notificaciones

1. Inicia sesión en el Panel de Administración de PayU, navega a _**Configuración**_ y selecciona _**Configuración Técnica**_.

<img src="/assets/IntegrationVariables_01_es.png" alt="Tech config" width="80%" style="display: block; margin: auto;" />
<br>

2. En la pestaña _**Disputas**_, ingresa las direcciones de correo electrónico para recibir notificaciones o habilita la URL de notificación automática, luego especifica el dominio donde deseas que nuestra API envíe actualizaciones `POST`. Una vez habilitado uno o ambos métodos de notificación, haz clic en _**Guardar cambios**_.

<img src="/assets/Disputes/Disputes_01_es.png" alt="Dispute Details" width="80%" style="display: block; margin: auto;" />
<br>

## Resolver Disputas

Las disputas ocurren cuando los compradores impugnan cargos en sus tarjetas de crédito. El banco notifica a PayU y comienza el proceso formal para validar la transacción.

{{% alert title="Consejo" color="info"%}}
Si tienes la información de contacto del titular de la tarjeta, comunícate con él para resolver el problema. Si la disputa se debe a una confusión (por ejemplo, cargos no reconocidos), pídele al comprador que contacte a su banco y retire la reclamación. Este enfoque suele resolver disputas a tu favor.
{{% /alert %}}

### Pasos para Resolver Disputas

1. Cuando recibas una notificación de disputa, configura tu correo o URL para recibir actualizaciones. Consulta [Configuraciones Técnicas]({{< ref "technical-configuration.md#disputes" >}}).

2. Inicia sesión en tu cuenta de PayU, expande el menú _**Transacciones**_ y selecciona _**Disputas**_.

<img src="/assets/Disputes/Disputes_02_es.png" alt="Dispute Details" width="80%" style="display: block; margin: auto;" />
<br>

3. En el módulo _**Disputas**_, localiza la disputa. Usa filtros si es necesario.

<img src="/assets/Disputes/Disputes_03_es.png" alt="Dispute Details" width="80%" style="display: block; margin: auto;" />
<br>

4. Revisa los detalles de la disputa en el panel derecho y haz clic en _**Resolver Disputa**_.

<img src="/assets/Disputes/Disputes_04_es.png" alt="Detalles de Disputa" width="40%" style="display: block; margin: auto;"/>
<br>

5. En la ventana emergente, revisa el motivo de la disputa y la fecha límite para presentar pruebas. Haz clic en _**Adjuntar Archivo**_ para cargar tu evidencia.

<img src="/assets/Disputes/Disputes_05_es.png" alt="Adjuntar Evidencia" width="40%" style="display: block; margin: auto;"/>

{{% alert title="Nota" color="info"%}}
Si aceptas la disputa, puedes iniciar un [Reembolso]({{< ref "Refunds-MP.md" >}}) haciendo clic en _**O devuelva este valor**_.
{{% /alert %}}

6. Sube la evidencia (archivos PDF de hasta 10MB) y haz clic en _**Guardar Evidencia**_. Una vez guardado, haz clic en _**Enviar para Revisión**_.

<img src="/assets/Disputes/Disputes_06_es.png" alt="Guardar Evidencia" width="40%" style="display: block; margin: auto;"/>
<br>

7. Aparecerá una ventana de confirmación una vez que tu evidencia haya sido enviada.

<img src="/assets/Disputes/Disputes_07_es.png" alt="Confirmación de Envío de Evidencia" width="40%" style="display: block; margin: auto;"/>
<br>

8. PayU envía la evidencia al banco emisor o red de pagos. El resultado del caso puede ser:

   - **Ganado**: La disputa se resuelve a tu favor (sin contracargo).
   - **Perdido**: La disputa resulta en un contracargo.
   - **Reembolsado**: Has reembolsado voluntariamente al comprador, evitando un contracargo.

Consulta [Estados de las Disputas]({{< ref "Disputes.md#estados-de-las-disputas" >}}) para obtener información detallada sobre los estados de disputa.

## Consideraciones Finales

Cuando la entidad financiera comunica la resolución, el estado de la disputa se actualiza automáticamente en el Panel de Administración. Asegúrate de monitorear las notificaciones de disputa y responder con prontitud para minimizar riesgos y posibles pérdidas.
