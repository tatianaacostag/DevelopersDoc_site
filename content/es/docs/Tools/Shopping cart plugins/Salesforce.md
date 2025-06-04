---
title: "Salesforce Commerce Cloud"
linkTitle: "Salesforce Commerce Cloud"
date: 2025-05-25T10:30:35-05:00
description:
  Esta guía explica la instalación y configuración del cartridge de pagos de PayU para tu tienda basada en Salesforce Commerce Cloud.
weight: 2
tags: ["subtopic"]
---

Salesforce Commerce Cloud (SFCC) es una plataforma de comercio digital empresarial basada en la nube que permite a las marcas ofrecer experiencias de compra personalizadas y escalables. Para más información, visita el <a href="https://www.salesforce.com/products/commerce-cloud/overview" target="_blank">sitio web oficial de Salesforce Commerce Cloud</a>.

## Beneficios {#benefits}

Al integrar el cartridge de PayU, puedes obtener los siguientes beneficios:

* **Integración rápida:** Componentes preconfigurados que aceleran el desarrollo.
* **Esfuerzo técnico mínimo:** No se requiere codificación compleja.
* **Mantenimiento continuo:** PayU gestiona actualizaciones y mejoras.
* **Cumplimiento PCI-DSS:** Garantiza seguridad y cumplimiento normativo.
* **Funcionalidad completa:** Soporte para pagos con tarjeta, efectivo, 3DS, reembolsos y más.
* **Basado en SFRA:** Totalmente alineado con la arquitectura recomendada por Salesforce.
* **Configuración personalizable:** Selecciona los métodos de pago y reglas de negocio que mejor se adapten a tus necesidades.
* **Información integrada:** Acceso directo a los datos transaccionales dentro de Salesforce.

## Requisitos previos {#prerequisites}

Antes de comenzar la integración, asegúrate de contar con lo siguiente:

* Una <a href="https://developers.payulatam.com/latam/es/docs/getting-started/create-an-account.html" target="_blank">cuenta activa de PayU Latam</a>.
* Una <a href="https://control.paymentsos.com/signup" target="_blank">cuenta activa de PayU Enterprise (PaymentsOS)</a> en modo producción/live. Para obtener detalles sobre cómo habilitar el modo live, consulta [Activar tu cuenta de PayU Enterprise](#activating-your-payu-enterprise-account).
* Una instancia de Salesforce Commerce Cloud (Business Manager) con acceso de administrador.
* Acceso al entorno de desarrollo de tu tienda SFCC, incluyendo permisos para instalar y configurar catridges.
* Acceso al repositorio del cartridge de PayU.

## Compatibilidad con SFCC {#sfcc-compatibility}

* El cartridge es compatible con SFRA versión 7.0.1 o superior.
* Debe estar instalada la versión 8.9.4 o superior de Node.js en tu entorno de desarrollo.

{{% alert title="Nota" color="info"%}}

Antes de continuar, asegúrate de que tu entorno de Salesforce esté correctamente configurado. Para obtener ayuda, consulta la <a href="https://developer.salesforce.com/docs/commerce" target="_blank">documentación oficial de Salesforce</a>.

{{% /alert %}}

## Funcionalidades de PayU Latam compatibles {#supported-payu-latam-feature}

La siguiente tabla muestra la disponibilidad del cartridge de PayU por país, junto con los métodos de pago compatibles:

<table>
  <thead>
    <tr>
      <th>País</th>
      <th>Tipo de método de pago</th>
      <th>Nombre del método de pago en SFCC</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2" style="text-align: center;">
        <b>Argentina<br>
        <img src="/assets/Argentina.png" width="20px"/>
      </td>
      <td>Tarjeta</td>
      <td>American Express, Argencard, Cabal, Cencosud, DINERS, Master Card, Naranja, Visa</td>
    </tr>
    <tr style="background-color: #F2F2F2;">
      <td>Efectivo</td>
      <td>COBRO_EXPRESS, PAGOFACIL, RAPIPAGO</td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td rowspan="2" style="text-align: center;">
        <b>Brasil<br>
        <img src="/assets/Brasil.png" width="20px"/>
      </td>
      <td>Tarjeta</td>
      <td>American Express, Master Card, Visa</td>
    </tr>
    <tr>
      <td>Efectivo</td>
      <td>BOLETO BANCARIO</td>
    </tr>
    <tr>
      <td style="text-align: center;">
        <b>Chile<br>
        <img src="/assets/Chile.png" width="20px"/>
      </td>
      <td>Tarjeta</td>
      <td>American Express, Master Card, Visa</td>
    </tr>
    <tr>
      <td rowspan="2" style="text-align: center;">
        <b>Colombia<br>
        <img src="/assets/Colombia.png" width="20px"/>
      </td>
      <td>Tarjeta</td>
      <td>American Express, DINERS, Master Card, Visa</td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td>Efectivo</td>
      <td>BANK REFERENCED, EFECTY, OTHERS CASH</td>
    </tr>
    <tr style="background-color: #F2F2F2;">
      <td rowspan="3" style="text-align: center;">
        <b>México<br>
        <img src="/assets/Mexico.png" width="20px"/>
      </td>
      <td>Tarjeta</td>
      <td>American Express, Master Card, Visa</td>
    </tr>
    <tr>
      <td>Efectivo</td>
      <td>BANK REFERENCED, OXXO, OTHERS CASH MX, SEVEN ELEVEN</td>
    </tr>
    <tr style="background-color: #F2F2F2;">
      <td>Transferencia bancaria</td>
      <td>SPEI</td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td style="text-align: center;">
        <b>Panamá<br>
        <img src="/assets/Panama.png" width="20px"/>
      </td>
      <td>Tarjeta</td>
      <td>Master Card, Visa</td>
    </tr>
    <tr style="background-color: #F2F2F2;">
      <td rowspan="3" style="text-align: center;">
        <b>Perú<br>
        <img src="/assets/Peru.png" width="20px"/>
      </td>
      <td>Tarjeta</td>
      <td>American Express, Master Card, Visa</td>
    </tr>
    <tr>
      <td>Efectivo</td>
      <td>PAGOEFECTIVO</td>
    </tr>
    <tr style="background-color: #F2F2F2;">
      <td>Billetera digital</td>
      <td>Yape</td>
    </tr>
  </tbody>
</table>

### Consideraciones {#considerations}

- Todos los países admiten procesamiento de pagos en un solo paso o en dos pasos: autorización y captura en una sola solicitud, o autorización y captura en pasos separados. En Colombia, el flujo de dos pasos solo es compatible con MasterCard y Visa.
- Se admiten las siguientes operaciones financieras: Cargo, Autorización, Captura, Anulación y Reembolso.
- Todos los países admiten análisis de fraude y los procesos de validación manual de PayU.
- Argentina, Brasil, Colombia, México y Perú admiten 3D Secure para MasterCard y Visa.
- Las promociones basadas en cuotas —también conocidas como meses sin intereses— son compatibles mediante condiciones de enrutamiento definidas en el motor de decisiones de PayU Enterprise.

## Configuración inicial, instalación y configuración {#initial-setup-installation-and-configuration}

Esta sección describe los pasos necesarios para instalar y configurar correctamente el cartridge de PayU en tu sitio SFCC.

### Activación de tu cuenta PayU Enterprise {#activating-your-payu-enterprise-account}

Para comenzar, regístrate en el <a href="https://control.paymentsos.com/signup" target="_blank">sitio web oficial de PayU Enterprise (PaymentsOS)</a>. Proporciona tu nombre, el nombre y sitio web de tu empresa, y la dirección de correo electrónico del usuario administrador. Una vez que completes el registro, recibirás un correo electrónico para establecer tu contraseña. Después de eso, podrás acceder al Centro de Control de PayU Enterprise.

De forma predeterminada, las cuentas nuevas están configuradas en modo de prueba. Para habilitar las transacciones en vivo, contacta a tu gerente de cuenta y envía una solicitud con los siguientes datos:

* **Merchant ID:** Localiza el Merchant ID de tu cuenta LATAM en el <a href="https://developers.payulatam.com/latam/es/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html#merchant-and-account-ids" target="_blank">Panel de Administración de PayU</a>.
* **Account ID:** Encuentra tu Account ID en el panel de control de PayU Enterprise haciendo clic en tu nombre de usuario en la esquina superior derecha.
<p>

<img src="/assets/VTEX/vtex01es.png" alt="PrintScreen" style="width: 800px; height: auto;">
<br>

### Configuración de tu cuenta PayU Enterprise {#setting-up-your-payu-enterprise-account}

PayU Enterprise (PaymentsOS) conecta tu cuenta de PayU Latam con tu tienda de Salesforce Commerce Cloud (SFCC).  
Para comenzar, debes configurar lo siguiente en tu cuenta de PayU Enterprise:

- El proveedor de pagos de PayU Latam  
- Tu unidad de negocio  
- El webhook para recibir notificaciones en tu sitio SFCC  

{{% alert title="Nota" color="info"%}}

Repite los pasos de las secciones [Configuración del proveedor de pagos](#payment-provider-configuration), [Configuración de la unidad de negocio](#business-unit-configuration) y [Configuración del webhook](#webhook-configuration) para cada uno de tus sitios y cuentas de PayU Latam.

{{% /alert %}}

#### Configuración del proveedor de pagos {#payment-provider-configuration}

Una instancia de proveedor de pagos en PayU Enterprise almacena tus credenciales de procesamiento de pagos de PayU Latam. Sigue estos pasos para configurarla:

1. En el <a href="https://control.paymentsos.com/login" target="_blank">Panel de Control de PayU Enterprise</a>, selecciona el entorno **TEST** o **LIVE** en la parte superior. Luego, navega a **Configuraciones > Servicios**, busca y selecciona el proveedor **PayULatam**.

<img src="/assets/Salesforce/salesforce01_es.png" alt="PrintScreen" style="width: 800px; height: auto;">

<br>

2. Completa los siguientes datos para crear la instancia del proveedor de pagos:

| Campo                    | Descripción |
|--------------------------|-------------|
| **Nombre de configuración** | Ingresa un nombre para la configuración del proveedor. Ejemplo: “PayU Argentina”. |
| **Descripción (Opcional)** | Descripción opcional para el proveedor de pagos. Ejemplo: “Mi proveedor de pagos en Argentina.” |
| **apiLogin**             | Tu nombre de usuario de PayU Latam para la conexión. |
| **apiKey**               | Tu clave única de comercio de PayU Latam para la conexión. |
| **accountId**            | Tu ID de cuenta de PayU Latam, según tu país de operación. |
| **merchantId**           | Tu ID de comercio de PayU Latam. |
| **partnerId**            | Identificador obligatorio para SFCC. Utiliza: `ZOOZ-SALESFORCE`. |
| **paymentCountry**       | País de procesamiento en formato ISO 3166 Alpha-3. Ejemplo: ARG, BRA, CHL, COL, MEX, PAN o PER. |
| **multiCapture**         | Deja este campo con su configuración predeterminada. No lo modifiques. |
| **cashRedirect**         | Deja este campo con su configuración predeterminada. No lo modifiques. |

Los campos **apiLogin**, **apiKey**, **accountId** y **merchantId** son diferentes para cada entorno seleccionado en la parte superior del panel de control.

- Para el entorno **TEST**, utiliza las credenciales provistas en <a href="https://developers.payulatam.com/latam/es/docs/getting-started/test-your-solution.html" target="_blank">Prueba tu solución</a>. Si usas 3DSecure, consulta las credenciales en <a href="https://developers.payulatam.com/latam/es/docs/services/3dsauthentication/payu-handled-3ds-authentication.html#probar-la-autenticaci%C3%B3n-3ds" target="_blank">Pruebas de autenticación 3DS</a>.
- Para el entorno **LIVE**, debes obtener tus credenciales desde el <a href="https://merchants.payulatam.com/login/auth" target="_blank">Panel de Control de PayU Latam</a>. Para más información, consulta <a href="https://developers.payulatam.com/latam/es/docs/integrations.html#how-to-get-variables-for-integration" target="_blank">Cómo obtener las variables de integración</a>.

3. Una vez completado el formulario, haz clic en **Crear** para finalizar.

#### Configuración de la unidad de negocio {#business-unit-configuration}

Una unidad de negocio vincula la configuración del proveedor creada en la sección anterior con tus credenciales de API de PayU Enterprise, permitiendo el procesamiento de transacciones en tu sitio Salesforce Commerce Cloud (SFCC). Sigue estos pasos:

1. En el <a href="https://control.paymentsos.com/login" target="_blank">Panel de Control de PayU Enterprise</a>, selecciona el entorno **TEST** o **LIVE** en la parte superior. Luego ve a **Configuraciones > Unidades de Negocio** y haz clic en **Crear una Unidad de Negocio**.

2. Completa la siguiente información para crear la unidad de negocio:

| Campo                         | Descripción |
|-------------------------------|-------------|
| **Nombre de la Unidad de Negocio**        | Debe estar en minúsculas y sin espacios. Una vez creada, **no se puede cambiar el nombre**, así que asegúrate de que sea correcto. |
| **Descripción (Opcional)**    | Descripción opcional para tu unidad de negocio. |

En la opción para seleccionar un **proveedor por defecto** para la unidad de negocio, elige la configuración del proveedor que creaste en la sección anterior. Luego haz clic en **Crear**.

<img src="/assets/Salesforce/salesforce02_es.png" alt="PrintScreen" style="width: 800px; height: auto;">

<p>

3. Una vez creada la unidad de negocio, el sistema generará un **Application ID**, una **Public API Key** y una **Private API Key**. Estas credenciales son necesarias para habilitar el procesamiento de pagos en tu sitio web SFCC. Asegúrate de **guardarlas**, ya que las necesitarás en el paso de [Gestión de preferencias personalizadas del sitio](#managing-custom-site-preferences).

<img src="/assets/Salesforce/salesforce03_es.png" alt="PrintScreen" style="width: 800px; height: auto;">

#### Configuración del webhook {#webhook-configuration}

El webhook permite que tu sitio reciba notificaciones automáticas de PayU cada vez que cambia el estado de una transacción. Esto es útil para actualizar pagos pendientes en tiempo real, como por ejemplo:

- Pagos en efectivo que se confirman después de ser completados.  
- Verificaciones de fraude antes de autorizar el pago.  
- Autenticaciones 3D Secure que requieren un desafío por parte del banco.  
- Reembolsos que quedan pendientes y luego son aprobados o rechazados.  
- Cualquier otra actualización relevante.

Para habilitar el webhook, sigue estos pasos:

1. En el <a href="https://control.paymentsos.com/login" target="_blank">Panel de Control de PayU Enterprise</a>, selecciona el entorno **TEST** o **LIVE** en la parte superior. Luego ve a **Configuraciones > Webhooks** y haz clic en **Crear URL de confirmación**.

2. En el campo **URL de confirmación**, ingresa una URL con el siguiente formato: `<TuURLdelSitio>/PayU-Webhook`.

3. En la tabla de eventos, habilita los eventos **Create** y **Update** para las siguientes operaciones financieras: **Authorization**, **Capture**, **Charge**, **Refund** y **Void**.

<img src="/assets/Salesforce/salesforce04_es.png" alt="PrintScreen" style="width: 800px; height: auto;">

<p>

4. En **Unidades de Negocio Asociadas**, selecciona la unidad de negocio que creaste en la sección anterior.

5. Finalmente, haz clic en **Crear** para guardar tu webhook.

## Instalación del cartridge de PayU en tu sitio {#installing-the-payu-cartridge-on-your-site}

Para habilitar el procesamiento de pagos con PayU en tu sitio de Salesforce Commerce Cloud (SFCC), debes instalar y configurar el cartridge de PayU. Esta sección guía a los desarrolladores a través de los pasos necesarios para integrar el cartridge en el código base del storefront.

{{% alert title="Nota" color="info"%}}

Este procedimiento debe ser realizado por un desarrollador con experiencia en Salesforce Commerce Cloud (SFCC).

{{% /alert %}}

1. Clona el repositorio `PayU-Cartridges` (reemplaza con `link_payu`) e intégralo en la base de código de tu proyecto.

2. Dentro de la carpeta `PayU-Cartridges`, localiza el archivo `package.json` y asegúrate de que la propiedad `paths` apunte correctamente a `app_storefront_base`:

```json
"paths": {
  "base": "../storefront-reference-architecture/cartridges/app_storefront_base"
}
```

<p>

&nbsp;&nbsp;&nbsp;&nbsp;Para hacer esto, deberás descargar el repositorio oficial de Salesforce Commerce Cloud desde GitHub. Esto requiere:

<style>
  .custom-bullet {
    padding-left: 2em;
  }

  .custom-bullet li::marker {
    color: #BCD245;
  }
</style>

<ul class="custom-bullet">
  <li>Tener habilitada la autenticación en dos pasos (2FA) en tu cuenta de GitHub.</li>
  <li>Iniciar sesión con tus credenciales de SFCC.</li>
  <li>Seguir las instrucciones de acceso proporcionadas en la <a href="https://developer.salesforce.com/docs/commerce/sfra/guide/sfra-overview.html" target="_blank">Guía SFRA</a> y la documentación de acceso al repositorio de SFCC.</li>
</ul>

3. Asegúrate de tener instalada la versión 8.9.4 o superior de Node.js en tu equipo.

4. Abre una terminal y navega a la raíz del repositorio. Ejecuta los siguientes comandos:

* `npm install`

* `npm run compile:js`

* `npm run compile:scss`

5. En el mismo directorio donde se descargó el código fuente, crea un archivo llamado dw.json con la siguiente estructura:

```json
{
  "hostname": "your-sandbox-hostname",
  "username": "your-username",
  "password": "your-password",
  "code-version": "version_to_upload"
}
```

## Activación del cartridge en Business Manager {#activating-the-cartridge-in-business-manager}

Debes agregar el cartridge de PayU a la ruta de cartridges de tu sitio en Business Manager antes de continuar con la configuración.

1. Inicia sesión en **Business Manager**.

2. Navega a **Administration > Sites > Manage Sites**.

3. Haz clic en el nombre de tu sitio.

4. Abre la pestaña **Settings**.

5. En el campo **Cartridges**, agrega el nombre del cartridge de PayU al inicio de la ruta: `int_payu:app_storefront_base`

6. Haz clic en **Apply**.

<img src="/assets/Salesforce/salesforce05.png" alt="PrintScreen" style="width: 800px; height: auto;">

{{% alert title="Nota" color="info"%}}

Repite los pasos 3 al 6 para cada sitio en el que desees utilizar el cartridge de PayU.

{{% /alert %}}

## Configuración del cartridge {#configuración-del-cartridge}

Esta sección describe el proceso para integrar PayU con tu sitio SFRA (Storefront Reference Architecture) en Salesforce Commerce Cloud.

### Importación de metadatos con una importación de sitio único {#importing-metadata-with-a-single-site-import}

Todos los archivos de metadatos se encuentran en la carpeta `metadata` del paquete de instalación del cartridge.

{{% alert title="Nota" color="info"%}}

El paquete del cartridge es el archivo descargado desde GitHub. La ruta relativa es: `link-payu-master/metadata`.

{{% /alert %}}

1. Abre la carpeta `metadata` desde el repositorio.

2. Abre el archivo `jobs.xml`.

3. Actualiza el valor de `site-id` en cada job con el ID de tu sitio. Puedes encontrar el ID de tu sitio navegando a: **Business Manager > Administration > Sites > Manage Sites**.

<img src="/assets/Salesforce/salesforce06.png" alt="PrintScreen" style="width: 600px; height: auto;">

<br>

&nbsp;&nbsp;&nbsp;&nbsp;Asegúrate de actualizar el ID en todos los jobs. Aquí tienes un ejemplo como referencia:

```xml
<job job-id="PAYU_CAPTURE_PAYMENT">
  <description />
  <parameters />
  <flow>
    <context site-id="payu-argentina" />
```

<br>

4. Dentro de la carpeta `metadata/sites`, cambia el nombre del subdirectorio `payu-country` para que coincida con el ID de tu sitio.

5. Comprime la carpeta `metadata` en un archivo `.zip`.

6. Inicia sesión en **Business Manager** y ve a **Administration > Site Development > Site Import & Export**.

7. Selecciona el archivo `.zip` que acabas de crear, haz clic en **Upload** y sube el archivo.

<img src="/assets/Salesforce/salesforce07.png" alt="PrintScreen" style="width: 600px; height: auto;">

<br>

8. Una vez subido, selecciona el archivo y haz clic en **Import**.

<img src="/assets/Salesforce/salesforce08.png" alt="PrintScreen" style="width: 600px; height: auto;">

<br>

&nbsp;&nbsp;&nbsp;&nbsp;Después de una importación exitosa, todas las configuraciones de PayU estarán disponibles de acuerdo con tu cuenta.

9. Para verificar, ve a **Site > Ordering > Order**. Abre cualquier pedido, cambia a la pestaña **Attributes** y confirma que los datos se hayan importado correctamente.

### Gestión de preferencias personalizadas del sitio {#managing-custom-site-preferences}

Para administrar las preferencias personalizadas del sitio para PayU:

1. Inicia sesión en **Business Manager** y navega a **Site > Merchant Tools > Site Preferences > Custom Preferences**.

2. Haz clic en el grupo de preferencias con el ID `payu`.

<img src="/assets/Salesforce/salesforce09.png" alt="PrintScreen" style="width: 600px; height: auto;">

<br>

&nbsp;&nbsp;&nbsp;&nbsp;Necesitarás las **credenciales de PayU Enterprise** generadas en la sección [Configuración de la Unidad de Negocio](#business-unit-configuration).

<img src="/assets/Salesforce/salesforce10.png" alt="PrintScreen" style="width: 550px; height: auto;">

<br>

3. Edita los atributos según la configuración de tu cuenta de PayU.

| Preferencia | Descripción | Valor por defecto |
| --- | --- | --- |
| `payUPublicKey` | Clave pública de la unidad de negocio creada en PayU Enterprise. | – |
| `payUPrivateKey` | Clave privada de la unidad de negocio creada en PayU Enterprise. | – |
| `payUAppId` | ID de la aplicación de la unidad de negocio creada en PayU Enterprise. | – |
| `payUProvider` | Proveedor configurado en tu cuenta de PayU Enterprise. | `PayULatam` |
| `payUApiVersion` | Versión de la API de PayU. | `1.3.0` |
| `payUCountry` | País de procesamiento: `ARG`, `BRA`, `CHL`, `COL`, `MEX`, `PAN` o `PER`. | Específico del país |
| `payULanguage` | Idioma usado en los correos enviados por PayU al comprador y al vendedor. Opciones: `English`, `Spanish`, `Portuguese`. Habilitar esta función en PayU Latam es opcional. | `English` |
| `payUEnvironment` | Define el entorno de PayU (por ejemplo, `Test` o `Live`). | `Test` |
| `payUPaymentFlowType` | Tipo de flujo de pago a utilizar:<br>• `One Step (Charge)`<br>• `Two Step (Authorization & Capture)` | `One Step (Charge)` |
| `enableImmediateCapture` | Controla si el pago se captura inmediatamente después de la autorización (aplica solo para el flujo de dos pasos). | `Yes` |
| `payUVoidAllowed` | Habilita o deshabilita la opción de anular pagos. | `No` |
| `payUSupportedDocumentTypes` | Documentos soportados para el checkout en formato JSON.<br><b>Ejemplo:</b><br><code>{  "ARG": [{ "type": "DNI", "description": "Documento Nacional de Identidad", "value": "DNI", "enabled": true }, { "type": "CI", "description": "Cédula de Identidad", "value": "CI", "enabled": true }, { "type": "CUIL", "description": "Código Único de Identificación Laboral", "value": "CUIL", "enabled": true }, { "type": "CUIT", "description": "Código Único de Identificación Tributaria", "value": "CUIT", "enabled": true }, { "type": "OTHER", "description": "Otro", "value": "", "enabled": true }, { "type": "DNIE", "description": "Documento Nacional de Identidad - Electrónico", "value": "DNIE", "enabled": false }, { "type": "LC", "description": "Libreta Cívica", "value": "LC", "enabled": false }, { "type": "LE", "description": "Libreta de Enrolamiento", "value": "LE", "enabled": false }]}</code><br><b>Nota:</b> Asegúrate de que el valor sea un JSON válido. | Específico del país |
| `payUEnableInstallments` | Habilita o deshabilita el pago en cuotas en el checkout. Si se habilita, debes configurar `payUInstallments`. | `No` |
| `payUCardWiseInstallments` | Cuotas permitidas por tipo de tarjeta en formato JSON.<br><b>Ejemplo:</b><br><code>{  "ARG": { "Amex": [1,3,6,9,12,18], "Argencard": [1,3,6,9,12,18], "Cabal": [1,3,6,9,12,18], "Cencosud": [1,3,6,9,12,18], "Diners": [1,3,6,9,12,18], "Master Card": [1,6,12,18], "Naranja": [1,6,12], "Visa": [1,3,6,9,12,18] }}</code><br><b>Nota:</b> Asegúrate de que el valor sea un JSON válido. | Específico del país |
| `payUInstallments` | Configura la cantidad de cuotas permitidas para pagos con tarjeta de crédito a nivel general del sitio. | Específico del país |
| `payu3DSConfiguration` | Define el tipo de autenticación 3DS a utilizar. | `DISABLED` |
| `payUCashExpiryDays` | Número de días de expiración para métodos de pago en efectivo. | `7` |

### Verifición de tus procesadores de pago {#verifying-your-payment-processors}

Una vez que hayas cargado el archivo de metadatos, los detalles del procesador de pagos se actualizan automáticamente. A continuación, verifica que los procesadores estén configurados correctamente:

1. En **Business Manager**, selecciona el sitio que deseas configurar.  
2. Ve a **Merchant Tools > Ordering > Payment Processors**.  
3. Confirma que los procesadores de PayU aparezcan en la lista.

<img src="/assets/Salesforce/salesforce11.png" alt="PrintScreen" style="width: 600px; height: auto;">

### Métodos de pago {#payment-methods}

El paquete de integración incluye una definición de métodos de pago en el archivo `payment-methods.xml`, ubicado en la carpeta `metadata` que importaste anteriormente. Para habilitarlos:

1. Ve a **Merchant Tools > Ordering > Payment Methods**.  
2. Habilita los métodos de pago que deseas ofrecer.

<img src="/assets/Salesforce/salesforce12.png" alt="PrintScreen" style="width: 700px; height: auto;">

<p>

&nbsp;&nbsp;&nbsp;&nbsp;En la ventana **Manage Credit/Debit Cards**, puedes habilitar las franquicias de tarjetas que deseas aceptar.

<img src="/assets/Salesforce/salesforce13.png" alt="PrintScreen" style="width: 700px; height: auto;">

<p>

&nbsp;&nbsp;&nbsp;&nbsp;Todos los campos relacionados con tarjetas en esta pantalla se utilizan para configurar validaciones específicas.

| Atributo de la Tarjeta       | Descripción |
|------------------------------|-------------|
| Longitud del Código de Seguridad | Longitud máxima del código de seguridad, según el tipo de tarjeta. |
| Verificación del Número de Tarjeta | Números BIN o rangos utilizados para validar la tarjeta. Ejemplo: `622126–622925` o `5018, 5020, 5038`. |
| Longitud del Número de Tarjeta | Longitud permitida del número de tarjeta (generalmente entre 13 y 16 dígitos). |
| Verificación de Dígito de Control | Indica si se aplica una validación de dígito de control. Valores posibles: `Yes` o `No`. <br>**Nota:** En Argentina, desactiva la validación para la tarjeta Naranja. |

&nbsp;&nbsp;&nbsp;&nbsp;También puedes configurar los montos mínimos y máximos por método de pago.

&nbsp;&nbsp;&nbsp;&nbsp;Consulta los siguientes límites para pagos en efectivo:

<table>
  <thead>
    <tr>
      <th>País</th>
      <th>Método de pago alternativo</th>
      <th>Monto mínimo</th>
      <th>Monto máximo</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #FFFFFF;">
      <td rowspan="3" style="text-align: center;">
        <b>Argentina</b><br>
        <img src="/assets/Argentina.png" width="20px"/>
      </td>
      <td>COBRO_EXPRESS</td>
      <td>$5 ARS</td>
      <td>$60,000 ARS</td>
    </tr>
    <tr>
      <td>PAGOFACIL</td>
      <td>$5 ARS</td>
      <td>$200,000 ARS</td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td>RAPIPAGO</td>
      <td>$5 ARS</td>
      <td>$500,000 ARS</td>
    </tr>
    <tr style="background-color: #F2F2F2;">
      <td style="text-align: center;">
        <b>Brasil</b><br>
        <img src="/assets/Brasil.png" width="20px"/>
      </td>
      <td>BOLETO BANCARIO</td>
      <td>$1.00 BRL</td>
      <td>$10,000.00 BRL</td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td rowspan="3" style="text-align: center;">
        <b>Colombia</b><br>
        <img src="/assets/Colombia.png" width="20px"/>
      </td>
      <td>BANK REFERENCED</td>
      <td>$1.00 COP</td>
      <td>–</td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td>EFECTY</td>
      <td>$20,000.00 COP</td>
      <td>$6,000,000.00 COP</td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td>OTHERS CASH</td>
      <td>$1,000.00 COP</td>
      <td>$4,000,000.00 COP</td>
    </tr>
    <tr style="background-color: #F2F2F2;">
      <td rowspan="4" style="text-align: center;">
        <b>México</b><br>
        <img src="/assets/Mexico.png" width="20px"/>
      </td>
      <td>BANK REFERENCED</td>
      <td>$1.00 MXN</td>
      <td>–</td>
    </tr>
    <tr style="background-color: #F2F2F2;">
      <td>OXXO</td>
      <td>$1.00 MXN</td>
      <td>$10,000.00 MXN</td>
    </tr>
    <tr style="background-color: #F2F2F2;">
      <td>OTHERS CASH MX</td>
      <td>$1.00 MXN</td>
      <td>$10,000.00 MXN</td>
    </tr>
    <tr style="background-color: #F2F2F2;">
      <td>SEVEN ELEVEN</td>
      <td>$1.00 MXN</td>
      <td>$10,000.00 MXN</td>
    </tr>
  </tbody>
</table>

### Configuración del webhook – Preferencias del sitio (Órdenes)

Antes de continuar con esta configuración, asegúrate de haber completado la sección [Configuración del Webhook]{#configuración-del-webhook} de PayU Enterprise.

Verifica que el controlador del webhook tenga acceso al objeto de orden. Para hacerlo:

1. Ve a **Merchant Tools > Site Preferences > Order**.  
2. Establece el campo **Limit Storefront Order Access** en **Allow List**.  
3. En el campo de texto, ingresa: `PayU-Webhook`.

<img src="/assets/Salesforce/salesforce14.png" alt="PrintScreen" style="width: 600px; height: auto;">

#### Consideraciones importantes

- Si esta configuración no se aplica correctamente, las solicitudes de webhook de PayU llegarán al controlador pero no tendrán permiso para actualizar las órdenes. Esto puede causar errores críticos al actualizar los estados de las órdenes y procesar pagos.
- Después de completar la configuración, realiza un pago de prueba para confirmar que las notificaciones del webhook se están recibiendo correctamente. Este paso es esencial para garantizar que la integración funcione como se espera.
- Si tu configuración incluye múltiples tiendas para diferentes países, asegúrate de validar esta configuración para cada sitio individualmente, utilizando la URL correspondiente para cada uno.

### Configuración del servicio

Para verificar que el servicio HTTP de PayU (`https.payment.payu`) esté correctamente configurado en Business Manager, navega a **Administration > Operations > Services**.

<img src="/assets/Salesforce/salesforce15.png" alt="PrintScreen" style="width: 600px; height: auto;">

### Jobs disponibles

PayU proporciona varios jobs para automatizar tareas clave relacionadas con el procesamiento de pagos. El archivo `jobs.xml` incluido en el cartridge define los jobs disponibles.

Para gestionar los jobs, ve a **Business Manager > Administration > Operations > Jobs**.

A continuación, se muestra un resumen de los jobs disponibles. Para información detallada sobre cada uno, consulta la guía técnica de Salesforce.

| Nombre del job            | Descripción |
|-------------------------------|-------------|
| **PAYU_CAPTURE_PAYMENT**      | Captura el pago cuando la preferencia `enableImmediateCapture` está deshabilitada y el sitio utiliza un flujo de pago en dos pasos (autorización y captura). |
| **PAYU_PARTIAL_REFUND**       | Procesa reembolsos parciales de pagos. |
| **PAYU_REFUND**               | Procesa un reembolso total para una orden específica. El ID de la orden debe establecerse en el paso del job. |
| **PAYU_VOID (ORDER_SPECIFIC)**| Anula el pago de una orden específica. El ID de la orden debe establecerse en el paso del job. |

#### Asignación de jobs a sitios

Asegúrate de asignar los jobs a cada uno de tus sitios. Para hacerlo:

1. En **Business Manager**, ve a **Administration > Operations > Jobs**.  
2. Verifica que todos los jobs estén correctamente configurados y listados.

<img src="/assets/Salesforce/salesforce16.png" alt="PrintScreen" style="width: 700px; height: auto;">

<br>

&nbsp;&nbsp;&nbsp;&nbsp;Desde esta pantalla puedes:

<ul class="custom-bullet">
  <li>Verificar si los jobs están habilitados.</li>
  <li>Consultar la última ejecución, su estado, prioridad y alcance.</li>
  <li>Eliminar jobs si es necesario.</li>
</ul>

Para habilitar o deshabilitar un job, cambiar su programación o modificar otras configuraciones, haz clic en el job específico.  
**Ejemplo:**

<img src="/assets/Salesforce/salesforce17.png" alt="PrintScreen" style="width: 600px; height: auto;">

#### Job de PAYU_CAPTURE_PAYMENT

Este job captura pagos previamente autorizados cuando el sitio utiliza un flujo de pago en dos pasos (Autorización y Captura como pasos separados).  
Para usar este job, asegúrate de que tus preferencias para `payUPaymentFlowType` y `enableImmediateCapture` estén configuradas de la siguiente manera:

<img src="/assets/Salesforce/salesforce18.png" alt="PrintScreen" style="width: 550px; height: auto;">

<br>

Este job escanea todas las órdenes con estado de pago **"Authorized"** e intenta capturarlas. Los resultados de cada ejecución se registran en los logs del job.

### Parámetro requerido
- **ID:** `custom.payUPaymentCapture`

### Pasos de ejecución

1. Ve a **Administration > Operations > Jobs**.  
2. Selecciona **PAYU_CAPTURE_PAYMENT** de la lista de jobs.  
3. Ajusta los parámetros según tus necesidades.  
4. Define la frecuencia de ejecución (por ejemplo, cada hora).  
5. Habilita o deshabilita el job según sea necesario.

<img src="/assets/Salesforce/salesforce19.png" alt="PrintScreen" style="width: 700px; height: auto;">

#### Job de PAYU_PARTIAL_REFUND

Este job te permite emitir reembolsos parciales de forma manual, especificando el monto a devolver.

##### Parámetros requeridos

- **ID:** `custom.payUPartialRefund`  
- **orderId:** ID de la orden a reembolsar.  
- **refundAmount:** Monto a reembolsar.  
- **refundReason** *(opcional)*: Motivo del reembolso.

##### Consideraciones importantes

- El estado del pago debe ser **"Captured"**.  
- El monto reembolsado no debe exceder el monto total capturado de la orden.

##### Pasos de ejecución

1. Ve a **Administration > Operations > Jobs**.  
2. Selecciona **PAYU_PARTIAL_REFUND** de la lista de jobs.  
3. Haz clic en **Job Steps** y selecciona `custom.payUPartialRefund`.  
4. Ingresa los parámetros requeridos.

<img src="/assets/Salesforce/salesforce20.png" alt="PrintScreen" style="width: 700px; height: auto;">

<br>

5. Haz clic en **Assign** y ejecuta el job.

<img src="/assets/Salesforce/salesforce21.png" alt="PrintScreen" style="width: 700px; height: auto;">

#### Job de PAYU_REFUND

Este job reembolsa el monto total del pago de una orden específica.

##### Parámetros requeridos

- **ID:** `custom.payURefund`  
- **orderId:** ID de la orden a reembolsar.  
- **refundReason** *(opcional)*: Motivo del reembolso (útil para auditoría).

##### Consideraciones importantes

- Este job solo es aplicable si el estado del pago es **"Captured"**.  
- El reembolso será por el **100% del monto pagado**.

### Pasos de ejecución

1. Ve a **Administration > Operations > Jobs**.  
2. Selecciona **PAYU_REFUND** de la lista de jobs.  
3. Haz clic en **Job Steps** y selecciona `custom.payURefund`.  
4. Ingresa los parámetros requeridos.

<img src="/assets/Salesforce/salesforce22.png" alt="PrintScreen" style="width: 700px; height: auto;">

<br>

5. Haz clic en **Assign** y ejecuta el job.

<img src="/assets/Salesforce/salesforce23.png" alt="PrintScreen" style="width: 700px; height: auto;">

#### Job de PAYU_VOID (ORDER_SPECIFIC)

Este job se utiliza para anular un pago autorizado antes de que haya sido capturado.

##### Parámetros requeridos

- **ID:** `custom.payUPaymentVoid`  
- **orderId:** ID de la orden con el pago autorizado.

##### Consideraciones importantes

- Este job solo puede ejecutarse si el estado del pago es **"Authorized"**.  
- Los pagos que ya han sido capturados **no pueden anularse**.  
- El sitio debe estar configurado para usar el **flujo de pago en dos pasos** (Autorización y Captura por separado).  
  - Para usar este job, los campos `payUPaymentFlowType`, `enableImmediateCapture` y `payUVoidAllowed` deben estar configurados de la siguiente forma:

<img src="/assets/Salesforce/salesforce24.png" alt="PrintScreen" style="width: 700px; height: auto;">

##### Pasos de ejecución

1. Ve a **Administration > Operations > Jobs**.  
2. Selecciona **PAYU_VOID (ORDER_SPECIFIC)**.  
3. Haz clic en **Job Steps** y selecciona `custom.payUPaymentVoid`.  
4. Ingresa los parámetros requeridos.

<img src="/assets/Salesforce/salesforce25.png" alt="PrintScreen" style="width: 700px; height: auto;">

<br>

5. Haz clic en **Assign** y ejecuta el job.

<img src="/assets/Salesforce/salesforce26.png" alt="PrintScreen" style="width: 700px; height: auto;">

## Habilitar o deshabilitar la integración con PayU

Puedes deshabilitar temporalmente o volver a habilitar la integración de pagos con PayU según las necesidades de tu negocio. Los pasos a continuación te guiarán para actualizar las configuraciones del método de pago en Business Manager y desactivar o reactivar a PayU como procesador de pagos.

**Deshabilitar la integración con PayU:**

1. Ve a **Merchant Tools > Ordering > Payment Methods**.  
2. Deshabilita todos los métodos de pago asociados con PayU.  
3. Verifica cada método de pago para identificar qué procesador utiliza:  
   - Haz clic en un método de pago (por ejemplo, `CREDIT_CARD`) y revisa el procesador asignado.  
   - Si el procesador está configurado como `PAY_U`, reemplázalo por otro, como `BASIC_CREDIT`.  
4. Habilita los métodos de pago que deseas utilizar con el nuevo procesador.

**Volver a habilitar PayU:**

Cambia nuevamente los procesadores a `PAY_U` para los métodos de pago correspondientes.

## Probar la integración

Una vez que hayas completado los pasos iniciales de configuración, instalación y ajustes, te recomendamos enfáticamente que pruebes la integración antes de procesar transacciones reales.

### Requisitos previos

- Asegúrate de que la preferencia `payUEnvironment` esté configurada en modo **Test** y ajusta las preferencias de acuerdo con el flujo de pago y los métodos de pago que deseas probar.  
- Utiliza las credenciales adecuadas para el entorno de prueba: `payUPublicKey`, `payUPrivateKey` y `payUAppId`. Estas se encuentran en la sección [Configuración de Unidad de Negocio](#business-unit-configuration).  
- Una vez finalizadas las pruebas, actualiza las preferencias con las credenciales de producción.

### Ejecutar una transacción de prueba

1. Inicia sesión en **Business Manager** en Salesforce Commerce Cloud y selecciona tu sitio desde el menú desplegable.

<img src="/assets/Salesforce/salesforce27.png" alt="PrintScreen" style="width: 700px; height: auto;">

<br>

2. Selecciona tu **Storefront**.

<img src="/assets/Salesforce/salesforce28.png" alt="PrintScreen" style="width: 700px; height: auto;">

<br>

3. Se abrirá el Storefront configurado. Elige cualquier producto y procede al checkout.

<img src="/assets/Salesforce/salesforce29.png" alt="PrintScreen" style="width: 700px; height: auto;">

<br>

4. En la página de pago, se mostrarán los métodos de pago disponibles. Selecciona el que deseas probar e ingresa los datos de prueba. Puedes encontrar los números de tarjetas de prueba y otra información relevante en la documentación de <a href="https://developers.payulatam.com/latam/es/docs/getting-started/test-your-solution.html#test-cards" target="_blank">Tarjetas de Prueba</a>. Completa el pedido y el pago.

<img src="/assets/Salesforce/salesforce30.png" alt="PrintScreen" style="width: 700px; height: auto;">

### Verificación de la transacción

Una vez que la compra sea aprobada, puedes verificar la transacción en los siguientes lugares:

- En SFCC, ve a **Business Manager > Merchant Tools > Ordering > Orders** y busca la orden que acabas de realizar.

<img src="/assets/Salesforce/salesforce31.png" alt="PrintScreen" style="width: 700px; height: auto;">

<br>

&nbsp;&nbsp;&nbsp;&nbsp;Puedes revisar los detalles de la orden.

<img src="/assets/Salesforce/salesforce32.png" alt="PrintScreen" style="width: 700px; height: auto;">

<br>

- En PayU Enterprise, ve a **Pagos > Buscar** y busca la transacción.

<img src="/assets/Salesforce/salesforce33.png" alt="PrintScreen" style="width: 700px; height: auto;">

### Depuración del checkout con PayU

Si recibes una transacción rechazada durante las pruebas, puedes identificar la razón de la siguiente manera:

#### Revisar los registros en Business Manager

- Ve a **Request Log** (esquina superior izquierda).  
- Busca la solicitud relacionada con el intento de pago.  
- Desplázate hasta el final del registro para ver el mensaje de error o la razón del rechazo devuelto por PayU.

<img src="/assets/Salesforce/salesforce34.png" alt="PrintScreen" style="width: 700px; height: auto;">

#### Verificar los Atributos de la Orden

- Abre la orden desde **Merchant Tools > Orders > Search**.  
- En la pestaña **Attributes**, revisa la respuesta de la API de PayU.

<img src="/assets/Salesforce/salesforce35.png" alt="PrintScreen" style="width: 700px; height: auto;">

#### Resumen del pago

Dentro de la orden, accede a la pestaña **Payment** para ver un resumen del intento de pago, incluyendo el estado y los mensajes clave.

<img src="/assets/Salesforce/salesforce36.png" alt="PrintScreen" style="width: 700px; height: auto;">

### Jobs

Si recibes un estado de error al ejecutar un job de PayU, puedes obtener más información siguiendo estos pasos:

1. Navega a **Business Manager > Administration > Operations > Jobs**.  
2. Selecciona el job con fallo de la lista (por ejemplo, `PAYU_REFUND`).  
3. Haz clic en la pestaña **History**.  
4. Selecciona la ejecución con error.  
5. Haz clic en el icono **Log File** para descargar el archivo de registro.

<img src="/assets/Salesforce/salesforce37.png" alt="PrintScreen" style="width: 800px; height: auto;">

<br>

6. Dentro del registro, busca la respuesta de PayU o el mensaje de error devuelto.

Esta información puede ayudarte a identificar si el problema está relacionado con:

- Credenciales incorrectas  
- Operación inválida para la orden  
- Estado inválido de la orden  
- Monto incorrecto  
- Falla de conexión  

## Habilitar promociones con cuotas

A través de esta integración, puedes ofrecer cuotas promocionales o meses sin intereses (MSI) a tus clientes finales, con base en reglas definidas en el motor de decisiones de PayU Enterprise.

### Requisitos previos

- **Cuenta espejo habilitada**:  
  Debes solicitar a PayU Latam la creación de una cuenta espejo adicional para tu comercio. Esta cuenta solo debe tener habilitados los métodos de pago aplicables para MSI o cuotas promocionales.

- **Proveedor configurado en el panel de control de PayU Enterprise para la cuenta espejo**:  
  Debes registrar un proveedor adicional en el panel de control de PayU Enterprise, usando las credenciales de tu cuenta espejo. Sigue los mismos pasos utilizados para configurar el proveedor de tu cuenta principal en [Configuración del Proveedor de Pagos](#payment-provider-configuration).

### Configuración del motor de decisiones

Define las reglas que se aplicarán para enrutar las transacciones a tu cuenta principal o a la cuenta espejo habilitada para meses sin intereses o cuotas promocionales, siguiendo estos pasos:

1. Abre el <a href="https://control.paymentsos.com" target="_blank">panel de control de PayU Enterprise</a>.  
2. En el menú lateral, selecciona **Motor de Decisión**.  
3. Elige la **Unidad de Negocio** asociada al sitio donde actualmente procesas pagos y deseas ofrecer promociones.

<img src="/assets/Salesforce/salesforce38.png" alt="PrintScreen" style="width: 800px; height: auto;">

<br>

4. Desde la sección **Optimiza tu flujo de pagos**, selecciona **Enrutamiento de pagos**.

<img src="/assets/Salesforce/salesforce39.png" alt="PrintScreen" style="width: 800px; height: auto;">

{{% alert title="Nota" color="info"%}}

En la parte inferior de esta sección, bajo **Proveedor por defecto**, deberías ver la configuración del proveedor asociada a tu cuenta principal de PayU Latam.

{{% /alert %}}

5. Agrega una nueva regla de enrutamiento.  
   Necesitarás ingresar:
   - Un nombre para la regla de enrutamiento.  
   - Las condiciones que permitirán a PayU enrutar las transacciones a la cuenta de PayU Latam habilitada para procesar promociones o MSI.

   Una condición requerida es la siguiente:

   **Detalles Adicionales de la Transacción**  
   - **Clave**: `number_of_installments`  
   - **Tipo de valor**: `String`  
   - **Igual a**: Ingresa el número deseado de cuotas

Puedes agregar condiciones adicionales si es necesario, como la marca de la tarjeta, el país emisor, el tipo de tarjeta, el emisor, el BIN, la moneda o el monto de la transacción. Estas ayudan a identificar y procesar correctamente la transacción financiera.

La decisión de enrutamiento se activará cuando una transacción cumpla con los criterios definidos para la promoción, según lo acordado con tu ejecutivo de cuenta de PayU Latam.

La regla de enrutamiento puede verse así:

<img src="/assets/Salesforce/salesforce40.png" alt="PrintScreen" style="width: 800px; height: auto;">

<br>

{{% alert title="Importante" color="warning"%}}

Asegúrate de que las preferencias `payUInstallments` y `payUCardWiseInstallments` estén alineadas con las opciones de cuotas que deseas ofrecer, como se define en [Gestión de Preferencias Personalizadas del Sitio](#managing-custom-site-preferences). Estas preferencias deben estar configuradas correctamente tanto para las transacciones de tu cuenta principal como para las cuotas promocionales o sin intereses.

{{% /alert %}}

<img src="/assets/Salesforce/salesforce41.png" alt="PrintScreen" style="width: 800px; height: auto;">
