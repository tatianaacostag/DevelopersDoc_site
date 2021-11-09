---
title: "Probar tu solución"
linkTitle: "Probar tu solución"
date: 2021-04-06T15:34:20-05:00
description: >
  PayU tiene un ambiente de sandbox en el cual, puedes probar tu solución antes de moverte al ambiente en vivo, donde puedes recibir pagos reales y transacciones.
weight: 40
---

Si deseas hace pruebas con PayU, necesitas utilizar las siguientes credenciales en el request, dependiendo del país de tu cuenta:  

{{< testaccounts/accounts_es >}}

El ambiente de pruebas no replica los datos de tu cuenta de producción.

## Tarjetas de prueba {#test-cards}
Puedes utilizar las siguientes tarjetas de prueba:

<details>
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
<details>
<summary><img src="/assets/Brasil.png" width="25px"/> Brasil</summary>

| Tarjeta                           | Número                              |
|-----------------------------------|-------------------------------------|
| **Tarjeta de Crédito AMEX**       | 376611000000000                     |
| **Tarjeta de Crédito DINERS**     | 36213800000009                      |
| **Tarjeta de Crédito ELO**        | 5067310000000002                    |
| **Tarjeta de Crédito HIPERCARD**  | 6062825624254001                    |
| **Tarjeta de Crédito MASTERCARD** | 5123740000000002                    |
| **Tarjeta de Crédito VISA**       | 4422120000000008 - 4984460000000008 |

</details>
<details>
<summary><img src="/assets/Chile.png" width="25px"/> Chile</summary>

| Tarjeta                           | Número                               |
|-----------------------------------|--------------------------------------|
| **Tarjeta de Crédito AMEX**       | 377825000000005                      |
| **Tarjeta de Crédito DINERS**     | 36525200000002                       |
| **Tarjeta de Crédito MASTERCARD** | 5435630000000008                     |
| **Tarjeta de Crédito VISA**       | 4051885600446623 - 4938590000000017  |

</details>
<details>
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
<details>
<summary><img src="/assets/Mexico.png" width="25px"/> México</summary>

| Tarjeta                           | Número                               |
|-----------------------------------|--------------------------------------|
| **Tarjeta de Crédito AMEX**       | 376675000000005                      |
| **Tarjeta de Crédito MASTERCARD** | 5579070000000003                     |
| **Tarjeta Débito MASTERCARD**     | 5256780000000007                     |
| **Tarjeta de Crédito VISA**       | 4268070000000002                     |
| **Tarjeta Débito VISA**           | 4415490000000004                     |

</details>
<details>
<summary><img src="/assets/Panama.png" width="25px"/> Panamá</summary>

| Tarjeta                           | Número                               |
|-----------------------------------|--------------------------------------|
| **Tarjeta de Crédito MASTERCARD** | 5455040000000005                     |
| **Tarjeta de Crédito VISA**       | 4723030000000005                     |

</details>
<details>
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

### Probar estados {#testing-status}
Cuando pruebas los Pagos, debes enviar en el request:
* El parámetro `test` como `true`.
* Asigna **777** en el CVV de la tarjeta (para AMEX, utilice **7777**).
* Envía el nombre del estado de la transacción en el nombre del tarjetahabiente.
    - Para transacciones aprobadas, envía el valor **APPROVED**.
    - Para transacciones rechazadas, envía el valor **REJECTED**.
    - Para transacciones en estado pendiente, envía el valor **PENDING**.
* Para el número de la tarjeta, utiliza un número válido que corresponda a la franquicia enviada en el request. Puedes utilizar un generador en línea de tarjetas de crédito o una de las  correspondientes a tu país mencionadas anteriormente.
* Para probar transferencias bancarias por PSE (Disponible en Colombia) en el ambiente de Sandbox de PayU, consulta la [Guía de pruebas PSE (PDF)](/assets/pse-test-guide-v5-es.pdf).

## Importar la colección {#importing-the-collection}
Haz clic en el siguiente botón para importar nuestra colección en Postman (puede que necesites refrescar la página si el botón no funciona). Ten en cuenta que creamos un ambiente cada vez que importas la colección.

{{< postman/postman_flow_collection >}}
<br>

Luego de ejecutar la colección, necesitas configurar las variables de ambiente y los globales.

### Configurar sus variables de ambiente {#setting-your-environment-variables}
Nuestra colección tiene un ambiente llamado `PayU API Sandbox`. Recomendamos que invoques el request del API de la colección únicamente en el ambiente de Sandbox.

Si quieres cambiar las cuentas de prueba de PayU, configura las variables `api_key`, `api_login`, `merchant_id` y `account-[country]`. Puedes dejar las demás variables con sus valores por defecto.

### Importar los globals {#importing-globals}
Los globales (Globals) son las variables que se necesitan para procesar las transacciones en nuestra pasarela de pagos como moneda (_currency_), valor de la transacción (_transaction amount_), página de confirmación (_confirmation page_), página de respuesta (_response pages_) y más.

Importa los globales de la colección para configurar las valores enviados en el requests. 

1. Descarga el archivo de globales <a href="/assets/globals/PayU%20Latam.postman_globals.json" download>aquí</a>.

2. En la colección de Postman, haz clic en _**Import**_ junto al nombre de tu workspace y busca el archivo json descargado recientemente.

3. Cuando termines, haz clic en _**Import**_.

Para cambiar el monto de la transacción, actualiza el valor de `tx_value_[País]` dependiendo del país donde quieras probar.

## Ejecuta la colección en el orden correcto {#running-the-requests-in-the-correct-order}
Ten en cuenta que el orden en el que ejecutes los requests es importante, debido a que algunos de los datos retornados por el request pueden ser utilizados en la siguiente invocación. 