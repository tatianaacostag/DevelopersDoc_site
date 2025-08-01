---
title: "Probar Tu Solución"
linkTitle: "Probar Tu Solución"
date: 2021-04-06T15:34:20-05:00
description: >
  Aprovecha el entorno de pruebas de PayU para probar a fondo tu solución antes de pasar al entorno en producción, donde se realizan pagos y transacciones reales.
weight: 40
---
<script>
  function openTarget() {
    var hash = location.hash.substring(1);
    if(hash) {
      var details = document.getElementById(hash);
    } 
    if(details && details.tagName.toLowerCase() === 'details') {
      details.open = true;
      details.scrollIntoView(true);
    }
  }
  window.addEventListener('DOMContentLoaded', openTarget);
</script>

Para realizar pruebas con PayU, utiliza las credenciales proporcionadas a continuación en tus solicitudes, dependiendo del país con el que tu cuenta está asociada.  

{{< testaccounts/accounts_es >}}

{{% alert title="Notas" color="info"%}}

* Consulta la documentación de <a href="https://developers.payulatam.com/latam/es/docs/services/3dsauthentication/payu-handled-3ds-authentication.html#probar-la-autenticaci%C3%B3n-3ds" target="_blank">Autenticación 3DS Gestionada por PayU</a> para encontrar las credenciales para probar 3DS.
* El entorno de prueba no replica los datos de tu cuenta de producción.

{{% /alert %}}

## Tarjetas de Prueba {#test-cards}

A continuación, encontrarás los datos de tarjetas que puedes utilizar para simular transacciones en el entorno de pruebas de PayU.

{{% alert title="Importante" color="warning" %}}

Las tarjetas de crédito mostradas en esta sección son exclusivamente de prueba y han sido habilitadas únicamente para uso dentro de esta plataforma. No tienen validez fuera de este entorno ni permiten realizar transacciones reales. Cualquier intento de uso externo será inválido y no generará transacciones reales en comercios de PayU Latam.

{{% /alert %}}

Puedes utilizar las siguientes tarjetas de prueba, organizadas por país:

<details id="argentina">
<summary><img src="/assets/Argentina.png" width="25px"/> Argentina</summary>

| Tarjeta                           | Número                              |
|-----------------------------------|-------------------------------------|
| **Tarjeta de Crédito AMEX**       | 376414000000009                     |
| **Tarjeta de Crédito ARGENCARD**  | 5011050000000001                    |
| **Tarjeta de Crédito CABAL**      | 5896570000000008                    |
| **Tarjeta de Crédito CENCOSUD**   | 6034930000000005 - 5197670000000002 |
| **Tarjeta de Crédito DINERS**     | 36481400000006                      |
| **Tarjeta de Crédito MASTERCARD** | 5399090000000009                    |
| **Tarjeta de Crédito NARANJA**    | 5895620000000002                    |
| **Tarjeta de Crédito SHOPPING**   | 6034880000000051                    |
| **Tarjeta de Crédito VISA**       | 4850110000000000 - 4036820000000001 |
| **Tarjeta Débito VISA**           | 4517730000000000                    |

</details>
<details id="brazil">
<summary><img src="/assets/Brasil.png" width="25px"/> Brasil</summary>

| Tarjeta                   | Número                                   | Fecha de Expiración | CVV  | Tarjetahabiente |
|---------------------------|------------------------------------------|---------------------|------|---|
| **Tarjeta de Crédito AMEX**       | 371341553758128 | 2035/01 | 1234 |
| **Tarjeta de Crédito DINERS**     | 36490101441625 | 2035/01 | 123  |
| **Tarjeta de Crédito ELO**        | 4389351648020055  <br> 4389358876174389 | 2035/01 | 123  |
| **Tarjeta de Crédito HIPERCARD**  | 6062825624254001 | 2035/01 | 123  |
| **Tarjeta de Crédito MASTERCARD** | 5448280000000007 <br> 2223020000000005 <br> 2223000250000004 | 2035/01 | 123  |
| **Tarjeta de Débito MASTERCARD** | 5211588675821084 | 2035/01 | 777 o 666  | APPROVED o DECLINED |
| **Tarjeta de Crédito VISA**       | 4235647728025682 <br> 4895370010000005 | 2035/01 | 123  |
| **Tarjeta de Débito VISA** | 4245757666349685 | 2035/01 | 777 o 666  | APPROVED o DECLINED |

</details>
<details id="chile">
<summary><img src="/assets/Chile.png" width="25px"/> Chile</summary>

<table>
<thead>
  <tr>
    <th>Tarjeta</th>
    <th>Número</th>
    <th>Tarjetahabiente</th>
    <th>CVV</th>
    <th>Fecha de expiración</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><b>Tarjeta de crédito AMEX</b></td>
    <td>377825000000005</td>
    <td colspan="3" rowspan="2" style="vertical-align:middle"><a href="#testing-status">Utiliza los valores de prueba de acuerdo con el resultado esperado.</a></td>
  </tr>
  <tr>
    <td><b>Tarjeta de crédito DINERS</b></td>
    <td>36525200000002</td>
  </tr>
  <tr>
    <td><b>Tarjeta de crédito MASTERCARD</b></td>
    <td>5457210001000019</td>
    <td>BKN_DMC_001</td>
    <td>300</td>
    <td>12/25</td>
  </tr>
  <tr>
    <td><b>Tarjeta débito MASTERCARD</b></td>
    <td>5204730000001003</td>
    <td>BKN_MCS_001</td>
    <td>100</td>
    <td>12/25</td>
  </tr>
  <tr>
    <td><b>Tarjeta prepago MASTERCARD</b></td>
    <td>5185540320000012</td>
    <td>BKN_DMC_001</td>
    <td>001</td>
    <td>12/25</td>
  </tr>
  <tr>
    <td><b>Tarjeta de crédito VISA</b></td>
    <td>4761340000000035</td>
    <td>VISA_GLOBAL_3</td>
    <td>846</td>
    <td>12/27</td>
  </tr>
  <tr>
    <td><b>Tarjeta Internacional VISA</b></td>
    <td>4005520000000129</td>
    <td>VISA_ECOMMERCE_03</td>
    <td>921</td>
    <td>12/27</td>
  </tr>
  <tr>
    <td><b>Tarjeta débito VISA</b></td>
    <td>4761340000000050</td>
    <td>VISA_GLOBAL_5</td>
    <td>846</td>
    <td>12/27</td>
  </tr>
</tbody>
</table>

</details>
<details id="colombia">
<summary><img src="/assets/Colombia.png" width="25px"/> Colombia</summary>

| Tarjeta                           | Número                                                                |
|-----------------------------------|-----------------------------------------------------------------------|
| **Tarjeta de Crédito AMEX**       | 377813000000001 - 377847626810864 - 376402004977124 - 376414000000009 |
| **Tarjeta de Crédito CODENSA**    | 5907120000000009                                                      |
| **Tarjeta de Crédito CRM**        | 5282096712463427                                                      |
| **Tarjeta de Crédito DAVIVIENDA** | 5247081012761500                                                      |
| **Tarjeta de Crédito DINERS**     | 36032400000007 - 36032404150519 - 36032440201896                      |
| **Tarjeta de Crédito MASTERCARD** | 5471300000000003 - 5120697176068275                                   |
| **Tarjeta de Crédito NEQUI**      | 4093551018099251                                                      |
| **Tarjeta de Crédito VISA**       | 4097440000000004 - 4037997623271984 - 4111111111111111                |
| **Tarjeta Débito VISA**           | 4509420000000008                                                      |

</details>
<details id="mexico">
<summary><img src="/assets/Mexico.png" width="25px"/> México</summary>

| Tarjeta                           | Número                               |
|-----------------------------------|--------------------------------------|
| **Tarjeta de Crédito AMEX**       | 376675000000005                      |
| **Tarjeta de Crédito MASTERCARD** | 5491380000000001 - 5204740000002745  |
| **Tarjeta Débito MASTERCARD**     | 5256780000000007 - 5579220000000012  |
| **Tarjeta de Crédito VISA**       | 4268070000000002 - 4931580001642617 - 4147463011110059 - 4147463011110083 - 4265880000000007 |
| **Tarjeta Débito VISA**           | 4415490000000004                     |

</details>
<details id="panama">
<summary><img src="/assets/Panama.png" width="25px"/> Panamá</summary>

| Tarjeta                           | Número                               |
|-----------------------------------|--------------------------------------|
| **Tarjeta de Crédito MASTERCARD** | 5455040000000005                     |
| **Tarjeta de Crédito VISA**       | 4723030000000005                     |

</details>
<details id="peru">
<summary><img src="/assets/Peru.png" width="25px"/> Perú</summary>

| Tarjeta                           | Número                               |
|-----------------------------------|--------------------------------------|
| **Tarjeta de Crédito AMEX**       | 377753000000009                      |
| **Tarjeta de Crédito DINERS**     | 36239200000000                       |
| **Tarjeta de Crédito MASTERCARD** | 5491610000000001                     |
| **Tarjeta Débito MASTERCARD**     | 5236930000000003                     |
| **Tarjeta de Crédito VISA**       | 4907840000000005 - 4634010000000005  |
| **Tarjeta Débito VISA**           | 4557880000000004                     |

</details>

### Probar Estados {#testing-statuses}

Al probar pagos, utiliza los siguientes valores en tu solicitud según el estado que desees simular:

* **Para simular transacciones _aprobadas_**:
  - Incluye `APPROVED` en el nombre del titular de la tarjeta.
  - Usa **777** como el CVV de la tarjeta (para tarjetas AMEX, usa **7777**).
  - El parámetro `test` y la descripción de la transacción también pueden influir en el resultado. Si no funciona con `test` en _false_, intenta configurarlo en _true_.
  - Para la fecha de vencimiento de la tarjeta, usa un mes **menor que** `6` y un año posterior al actual (por ejemplo, `05/202_`).

* **Para simular transacciones _rechazadas_**:
  - Incluye `REJECTED` en el nombre del titular de la tarjeta.
  - Usa **666** como el CVV de la tarjeta (para tarjetas AMEX, usa **666**).
  - El parámetro `test` y la descripción de la transacción también pueden influir en el resultado. Si no funciona con `test` en _false_, intenta configurarlo en _true_.
  - Para la fecha de vencimiento de la tarjeta, usa un mes **mayor que** `6` y un año posterior al actual (por ejemplo, `07/202_`).

* **Para simular transacciones _pendientes_**:
  - Incluye `PENDING` en el nombre del titular de la tarjeta.
  - Usa **777** como el CVV de la tarjeta (para tarjetas AMEX, usa **7777**).
  - Configura el parámetro `test` en _true_.
  - En la información del comprador y del pagador, utiliza la dirección de correo electrónico `manual-review-hub@email.com`.

* **Para el número de la tarjeta**, utiliza uno válido que corresponda a la franquicia enviada en el request. Puedes usar un generador en línea de tarjetas de crédito o seleccionar una de las tarjetas correspondientes a tu país mencionadas anteriormente.

* **Para probar transferencias bancarias por PSE** (disponible en Colombia) en el ambiente Sandbox de PayU, consulta la [Guía de pruebas PSE (PDF)](/assets/pse-test-guide-v5-es.pdf).

* **Para probar tarjetas en Chile**, utiliza los valores de nombre del tarjetahabiente, CVV y fecha de expiración indicados en las <a href="#chile" id="linkcl" onclick="document.getElementById('chile').open = true;">tarjetas de ejemplo</a>.

### Probar Escenarios con el Módulo Antifraude {#testing-scenarios-with-the-antifraud-module}

Para probar diferentes escenarios utilizando nuestro módulo antifraude, utiliza una de las siguientes direcciones de correo electrónico junto con los datos de tarjetas de prueba apropiados. El sistema antifraude asignará un estado específico a la transacción según el correo que utilices:

- `approved@payu.com` → El sistema determina que la transacción puede continuar.
- `rejected@payu.com` → El sistema identifica la transacción como riesgosa y, por motivos de prevención antifraude, le asigna el estado **REJECTED**.
- `pending_approved@payu.com` → El sistema antifraude asigna inicialmente el estado **PENDING**. Después de 5 minutos, determina que la transacción puede continuar.
- `pending_rejected@payu.com` → El sistema antifraude asigna inicialmente el estado **PENDING**. Pasados 5 minutos, cambia el estado a **REJECTED** por motivos de prevención de fraude.

{{% alert title="Nota" color="info"%}}

Ten en cuenta que aunque el sistema antifraude determine que la transacción puede proceder, no garantiza la aprobación final de la transacción. El resultado también depende de la tarjeta utilizada y de otros valores indicados en la documentación que son necesarios para simular una autorización bancaria exitosa o fallida.

{{% /alert %}}

## Importar la Colección {#importing-the-collection}

Haz clic en el siguiente botón para importar nuestra colección en Postman (puede que necesites refrescar la página si el botón no funciona). Ten en cuenta que creamos un ambiente cada vez que importas la colección.

{{< postman/postman_flow_collection >}}
<br>

Luego de ejecutar la colección, necesitas configurar las variables de ambiente y los globales.

### Configurar Tus Variables de Ambiente {#setting-your-environment-variables}

Nuestra colección tiene un ambiente llamado `PayU API Sandbox`. Recomendamos que invoques el request del API de la colección únicamente en el ambiente de Sandbox.

Si quieres cambiar las cuentas de prueba de PayU, configura las variables `api_key`, `api_login`, `merchant_id` y `account-[country]`. Puedes dejar las demás variables con sus valores por defecto.

### Importar los Globals {#importing-globals}

Los globales (Globals) son las variables que se necesitan para procesar las transacciones en nuestra pasarela de pagos como moneda (_currency_), valor de la transacción (_transaction amount_), página de confirmación (_confirmation page_), página de respuesta (_response pages_) y más.

Importa los globales de la colección para configurar las valores enviados en el requests. 

1. Descarga el archivo de globales <a href="/assets/globals/PayU%20Latam.postman_globals.json" download>aquí</a>.

2. En la colección de Postman, haz clic en _**Import**_ junto al nombre de tu workspace y busca el archivo json descargado recientemente.

3. Cuando termines, haz clic en _**Import**_.

Para cambiar el monto de la transacción, actualiza el valor de `tx_value_[País]` dependiendo del país donde quieras probar.

## Ejecuta la Colección en el Orden Correcto {#running-the-requests-in-the-correct-order}

Ten en cuenta que el orden en el que ejecutes los requests es importante, debido a que algunos de los datos retornados por el request pueden ser utilizados en la siguiente invocación. 