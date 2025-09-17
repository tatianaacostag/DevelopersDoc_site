---
title: "Smart Check – Reverificación Automática"
linkTitle: "Smart Check – Reverificación Automática"
date: 2025-03-26T15:09:39-05:00
description: >
  Smart Check es la solución de reverificación automática de comercios que PayU LATAM implementa para optimizar los procesos de cumplimiento (KYC/AML).
weight: 60
---

Con esta funcionalidad, los comercios actualizan su información directamente desde el <a href="https://merchants.payulatam.com/login/auth" target="_blank">Merchant Panel</a>, mientras el sistema ejecuta de forma automática validaciones y screenings, reduciendo el trabajo manual de los equipos de riesgo y cumplimiento.

## ¿Cómo funciona Smart Check?

El flujo de reverificación consta de los siguientes pasos:

### 1. Creación del caso

La reverificación comienza con la generación de un caso, de la siguiente forma:

* **Automática:** según la periodicidad definida en la sección AML de la cuenta del comercio.  
* **Manual:** en situaciones específicas, como procesos de reactivación.  
* Los casos se asignan inicialmente al usuario **Automatic Reverification**.

### 2. Formulario digital

El comercio recibe un formulario en el **Merchant Panel** y tiene hasta **80 días configurables** para completarlo.

### 3. Validaciones automáticas

El sistema ejecuta los siguientes procesos:

* **Web Scraper:** valida la actividad económica contra la página web declarada.
* **Adverse Media:** busca noticias negativas, sanciones o relaciones con PEPs.
* **Identity Validation & OCR:** verifica documentos y representantes legales.
* **Matriz de riesgo:** se completa y ejecuta automáticamente con base en datos declarados y subcuentas activas.

### 4. Resultado

Al finalizar las validaciones, el sistema determina el desenlace del caso de acuerdo con los hallazgos encontrados.

* **Aprobación automática:** el caso se cierra si no hay alertas.
* **Validación manual:** si se detecta algún hallazgo (ej. MCC prohibido, inconsistencia documental, CRP con sanciones).

## Beneficios principales

La implementación de Smart Check aporta ventajas clave tanto para los comercios como para los equipos de riesgo y cumplimiento, optimizando la gestión de los procesos de reverificación.

* Reducción del esfuerzo manual en procesos de KYC/AML.
* Aprobación automática de casos de bajo riesgo.
* Mayor trazabilidad y seguridad en la información declarada.
* Flexibilidad en tiempos y reglas de gestión.

## Estados de un caso

En Salesforce, los casos avanzan a través de los siguientes estados:

* `Created:` Caso creado, formulario pendiente.
* `Waiting:` Formulario disponible para el comercio.
* `Filled:` Formulario completado y enviado.
* `Form Expired:` El comercio no respondió en el plazo.
* `Working:` Validaciones en proceso.
* `Close Approved:` Caso aprobado automáticamente.
* `Manual Review:` Caso asignado a analistas por alerta o inconsistencia.

### Consideraciones adicionales

Al implementar Smart Check es importante tener en cuenta ciertos aspectos operativos y limitaciones que pueden influir en la gestión de los casos:

* En la **Fase 1**, la información aprobada se actualiza únicamente en Salesforce. La integración con Admin está prevista para la **Fase 2**.
* En casos de operación en varios países, la creación de casos puede requerir gestión manual.
* Algunos escenarios pueden forzar una validación manual (por ejemplo, cuando Complif no confirma los representantes legales en Cámara de Comercio).