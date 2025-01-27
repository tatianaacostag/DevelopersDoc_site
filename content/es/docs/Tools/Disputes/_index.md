---
title: "Disputas"
linkTitle: "Disputas"
date: 2021-04-12T08:34:58-05:00
description: >
  Esta sección ofrece una descripción general del mecanismo de disputas en PayU.
weight: 60
tags: ["parenttopic"]
---

* Para obtener instrucciones detalladas sobre cómo manejar disputas a través del Panel de Gestión de tu cuenta PayU, consulta la documentación del <a href="https://developers.payulatam.com/latam/es/payu-module-documentation/payu-operations/disputes-mp.html" target="_blank">Módulo de Disputas</a>.

* Para información técnica sobre el sistema de notificaciones, consulta la documentación del <a href="https://developers.payulatam.com/latam/es/docs/tools/disputes/disputes-webhook.html" target="_blank">Webhook de Disputas</a>.

## Descripción General de las Disputas

Las disputas surgen cuando los compradores presentan reclamaciones ante los bancos emisores de sus tarjetas sobre transacciones realizadas. El banco notifica a PayU sobre la disputa, y creamos un registro correspondiente en nuestro sistema. Posteriormente, te notificamos según el método de notificación que hayas configurado.

El siguiente diagrama ilustra el flujo del proceso de disputas en PayU, detallando cada paso desde la notificación hasta la resolución.
<br>

{{< disputes/disputes_flow_es >}}

### Razones Comunes para Disputas

Los compradores pueden disputar transacciones por diversas razones, incluyendo la no recepción de bienes, productos defectuosos o cargos no autorizados. Aquí están las razones típicas para una disputa:  

- **Fraude**: Transacciones realizadas sin autorización, a menudo debido a una tarjeta perdida o robada.  
- **Pago No Reconocido**: El titular de la tarjeta no reconoce el nombre del comercio en su estado de cuenta.  
- **Producto No Entregado**: El producto o servicio no fue recibido.  
- **Producto Insatisfactorio**: El producto o servicio no cumplió con las expectativas.  
- **Cargos Duplicados**: El titular de la tarjeta fue cobrado varias veces por la misma transacción.  
- **Desajuste de Monto**: El cargo no coincide con el valor de la compra.  
- **No Especificado**: Disputas iniciadas por bancos sin una razón clara.  

{{% alert title="Importante" color="warning"%}}

* Los métodos de notificación para disputas varían entre las entidades financieras, PayU no puede garantizar que siempre proporcionen razones.  
* PayU actúa únicamente como intermediario para ayudar a los comercios a presentar evidencia en disputas. La decisión final recae en el banco emisor.  
* Los montos disputados están congelados y no disponibles para transferencias hasta su resolución.  
* Los compradores pueden disputar transacciones dentro de **120 días** para tarjetas locales y **180 días** para tarjetas internacionales.

{{% /alert %}}

## Gestión de Disputas con PayU

El proceso de disputas sigue un flujo estructurado que puedes gestionar directamente a través del Panel de Gestión en tu cuenta PayU. Para más detalles, consulta el <a href="https://developers.payulatam.com/latam/es/payu-module-documentation/payu-operations/disputes-mp.html" target="_blank">Módulo de Disputas</a>.

### 1. Notificación de Disputa

PayU te notificará según el método de notificación configurado en el módulo de Disputas, donde también puedes verificar los detalles de la disputa.

### 2. Revisión de Detalles de la Disputa

Usa el Panel de Gestión para visualizar y gestionar tus disputas en curso.

### 3. Envío de Evidencia

Responde a las disputas enviando la evidencia requerida a través del módulo de Disputas antes de la fecha límite establecida por el banco o la red de procesamiento. Después de la fecha límite, no podrás cargar evidencia para esa disputa.

#### Evidencia Útil

- Detalles del cliente (nombre, ID, correo electrónico, dirección de envío, número de tarjeta, etc.).  
- Prueba de entrega firmada por el titular de la tarjeta.  
- Recibos de venta o facturas.  
- Aceptación de términos, condiciones o pagos firmada por el titular de la tarjeta.  
- Políticas de reembolso y cancelación.  
- Historial transaccional.  
- Cualquier otro documento de respaldo.  

#### Plazos para Enviar Evidencia

Los días máximos para enviar evidencia varían por país:  

| País      | Días para Enviar Evidencia |
|-----------|----------------------------|
| Argentina | 5 días hábiles             |
| Brasil    | 12 días hábiles            |
| Chile     | 5 días hábiles             |
| Colombia  | 2 días hábiles             |
| México    | 12 días calendario         |
| Panamá    | 8 días hábiles             |
| Perú      | 6 días hábiles             |

### 4. Resolución y Decisión Final

Una vez que envíes la evidencia, nuestra integración la enviará al banco o la red de procesamiento para su revisión. Los resultados pueden incluir:  
- **Ganada**: La entidad bancaria resuelve la disputa a tu favor, sin deducciones.  
- **Perdida**: La entidad bancaria emite un contracargo, y pueden aplicarse costos asociados.  
- **Reembolsada**: Reembolsas voluntariamente al comprador.

El Panel de Gestión de tu cuenta PayU actualizará el estado de la disputa según la resolución, y el sistema te notificará.

## Estados de las Disputas

Cada disputa sigue una serie de estados a lo largo del proceso:

| Estado                   | Descripción                                                                   |
|--------------------------|-------------------------------------------------------------------------------|
| **Notificada**           | Estado inicial donde debe enviarse evidencia.                                |
| **En Revisión**          | La evidencia está siendo revisada por el banco o red de procesamiento.       |
| **Sin Evidencia**        | El comercio no cumplió con el plazo para enviar evidencia.                   |
| **Perdida**              | La disputa fue resuelta a favor del comprador, resultando en un contracargo. |
| **Ganada**               | La disputa fue resuelta a favor del comercio.                                |
| **Expirada**             | Después de 120 días sin respuesta del banco, los fondos se liberan.          |
| **Reembolsada**          | El comercio autorizó un reembolso, evitando un contracargo.                  |

A continuación, se muestra un diagrama que ilustra el proceso de resolución de disputas:

<div>
{{< disputes/Disputes_ES >}}
</div>

## Consejos Antifraude

Protege tu negocio contra el fraude siguiendo estos consejos:  
1. Monitorea aumentos repentinos en los volúmenes de compra o montos transaccionales inusualmente altos.  
2. Observa múltiples compras de un mismo cliente o dirigidas a la misma dirección.  
3. Implementa procesos de verificación estrictos para transacciones grandes o inusuales.