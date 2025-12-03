---
title: "URL de Confirmación"
linkTitle: "URL de Confirmación"
date: 2021-03-29T12:15:57-05:00
description: >
  La URL de confirmación facilita la comunicación entre sistemas, permitiéndote recibir los resultados de las transacciones y actualizar tus inventarios, órdenes o bases de datos.
weight: 30
tags: ["subtopic"]
---

Esta URL, invisible para los clientes, recibe datos a través de HTTP POST. Es importante destacar que, si un pagador intenta realizar múltiples pagos, se genera una confirmación por cada transacción, independientemente de si fue aprobada o rechazada.

Dado que esta URL está destinada únicamente a actualizaciones del sistema y no está orientada al cliente, no debe contener ningún código HTML. Si bien su implementación es opcional, se recomienda altamente para asegurar que tu sistema refleje con precisión los resultados de las transacciones. 

Al finalizar una transacción (ya sea aprobada, rechazada o cancelada), nuestra plataforma transmite las variables correspondientes a tu URL de confirmación mediante el método HTTP POST, por lo que deberás implementar una lógica del lado del servidor para capturar y procesar estos datos según el lenguaje de programación que utilices.

## Consideraciones {#considerations}

* **Desactivar autenticación:** Si tu sitio emplea autenticación básica o medidas de seguridad similares, asegúrate de desactivarlas para la URL de confirmación, de modo que PayU pueda acceder a ella.
* **Dirección IP pública:** La dirección IP asociada a tu URL de confirmación debe ser pública. Evita usar URLs accesibles únicamente desde una intranet o localhost.
* **Certificado HTTPS válido:** Si utilizas HTTPS para tu URL de confirmación, debes contar con un certificado SSL/TLS válido.
* **Tipo de contenido:** La URL de confirmación debe estar configurada para manejar datos en formato `x-www-form-urlencoded`.
* **Evitar configuraciones de seguridad específicas:** No utilices certificados de seguridad de curva elíptica ni aquellos con el conjunto de cifrado `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA` para tu URL de confirmación.
* **Reporte del estado final de la transacción:** PayU solo activará la URL de confirmación una vez que la transacción alcance un estado final (por ejemplo, aprobada, rechazada o expirada). No recibirás reportes de transacciones que aún estén en proceso (pendientes de pago o en análisis).


## Lista blanca de direcciones IP para los servidores de PayU {#whitelist-of-ip-addresses-for-payu-servers}

Para garantizar que tu servidor reciba solicitudes y notificaciones de PayU Latam, es necesario incluir nuestras direcciones IP en la lista blanca. Esto es especialmente importante si tu servidor está protegido por un firewall. Todas las solicitudes de webhooks y la comunicación desde los servidores de PayU se originarán desde las direcciones IP que se indican a continuación.

**Entorno de producción**

* 34.233.144.154
* 184.73.94.138
* 52.73.124.136

**Entorno de pruebas (sandbox)**

* 54.158.171.129
 
## Parámetros {#parameters}

La URL de confirmación transmite los siguientes parámetros a tu servidor mediante HTTP POST:

<details>

<summary>Parámetros</summary>

<br>

<div class="variables"></div>

| Campo | Tipo | Tamaño | Descripción |
|---|---|---|---|
| `merchant_id`         | Numérico      | 12     | Tu ID de comercio en el sistema de PayU. Puedes encontrarlo en el correo de creación de cuenta. |
| `state_pol`           | Alfanumérico  | 32     | Estado de la transacción en el sistema de PayU. [Consulta los estados de transacción]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-url" >}}). |
| `risk`                | Decimal       | —      | Puntaje de riesgo de la transacción, con un rango de 0 a 1. Un valor más alto indica mayor riesgo. Formato: `###.00`. |
| `response_code_pol`   | Alfanumérico  | 255    | Código interno de respuesta de PayU para la transacción. [Consulta los códigos de respuesta]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-url" >}}). |
| `reference_sale`      | Alfanumérico  | 255    | Tu referencia única para la venta o pedido. Debe ser distinta en cada transacción enviada a PayU. |
| `reference_pol`       | Alfanumérico  | 255    | Referencia única o número de transacción generado por PayU. |
| `sign`                | Alfanumérico  | 255    | Firma digital generada por PayU para esta transacción, utilizada para validar la integridad de los datos. |
| `extra1`              | Alfanumérico  | 255    | Campo adicional para enviar información complementaria sobre la compra. |
| `extra2`              | Alfanumérico  | 255    | Campo adicional para enviar información complementaria sobre la compra. |
| `payment_method`      | Numérico      | —      | Identificador interno de PayU para el método de pago utilizado. [Consulta los códigos de métodos de pago]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| `payment_method_type` | Numérico      | —      | Tipo general del método de pago utilizado (por ejemplo, tarjeta de crédito, transferencia bancaria). |
| `installments_number` | Numérico      | —      | Número de cuotas elegido por el comprador en pagos con tarjeta de crédito. |
| `value`               | Numérico      | 14.2   | Valor total de la transacción, con hasta dos decimales (por ejemplo, 10000.00 o 10000). |
| `tax`                 | Numérico      | 14.2   | Valor del IVA de la transacción. Acepta hasta dos decimales (por ejemplo, 19000.00). Usa 0 si no aplica IVA. <p><b>Nota:</b> En transacciones en Colombia, si se envía cero, PayU aplicará automáticamente el 19 % de IVA estándar. |
| `additional_value`    | Numérico      | 14.2   | Valor adicional que no hace parte del cálculo de comisión. |
| `transaction_date`    | Fecha         | —      | Fecha y hora en la que ocurrió la transacción (YYYY-MM-DD HH:mm:ss). |
| `currency`            | Alfanumérico  | 3      | Código de la moneda en la que se realizó el pago. [Consulta las monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). |
| `email_buyer`         | Alfanumérico  | 255    | Correo electrónico del comprador, utilizado para notificaciones del resultado de la transacción. Se recomienda validarlo si se obtuvo mediante un formulario. |
| `cus`                 | Alfanumérico  | 64     | Código Único de Seguimiento (CUS), referencia de pago en el banco, solo aplica para pagos PSE (transferencia electrónica en Colombia). |
| `pse_bank`            | Alfanumérico  | 255    | Nombre del banco utilizado para pagos PSE. |
| `test`                | Booleano      | —      | Indica si la transacción fue de prueba (`true`) o real (`false`). |
| `description`         | Alfanumérico  | 255    | Descripción de los artículos o servicios comprados en la venta. |
| `billing_address`     | Alfanumérico  | 255    | Dirección de facturación del comprador. |
| `shipping_address`    | Alfanumérico  | 50     | Dirección de entrega de la mercancía. |
| `phone`               | Alfanumérico  | 20     | Teléfono residencial del comprador. |
| `office_phone`        | Alfanumérico  | 20     | Teléfono de oficina o de contacto diurno del comprador. |
| `account_number_ach`  | Alfanumérico  | 36     | Identificador para transacciones ACH. |
| `account_type_ach`    | Alfanumérico  | 36     | Tipo de cuenta usada para transacciones ACH. |
| `administrative_fee`  | Decimal       | —      | Valor de la tarifa administrativa asociada a la transacción. |
| `administrative_fee_base`| Decimal   | —      | Valor base usado para calcular la tarifa administrativa. |
| `administrative_fee_tax` | Decimal   | —      | Valor del impuesto aplicado a la tarifa administrativa. |
| `airline_code`        | Alfanumérico  | 4      | Código de la aerolínea, si aplica. |
| `attempts`            | Numérico      | —      | Número de intentos de PayU para enviar la confirmación a tu servidor. |
| `authorization_code`  | Alfanumérico  | 12     | Código de autorización proporcionado por el banco emisor para la venta. |
| `bank_id`             | Alfanumérico  | 255    | Identificador del banco involucrado en la transacción. |
| `billing_city`        | Alfanumérico  | 255    | Ciudad de facturación del comprador. |
| `billing_country`     | Alfanumérico  | 2      | Código ISO 3166-1 alfa-2 del país asociado a la dirección de facturación (por ejemplo, CO, US). |
| `commision_pol`       | Decimal       | —      | Valor de la comisión cobrada por PayU. |
| `commision_pol_currency`| Alfanumérico | 3    | Código de la moneda utilizada para la comisión. |
| `customer_number`     | Numérico      | —      | Identificador del cliente, si se proporciona. |
| `date`                | Fecha         | —      | Fecha y hora de la operación (YYYY-MM-DD HH:mm:ss). |
| `error_code_bank`     | Alfanumérico  | 255    | Código de error devuelto por el banco, si aplica. |
| `error_message_bank`  | Alfanumérico  | 255    | Mensaje de error devuelto por el banco, si aplica. |
| `exchange_rate`       | Decimal       | —      | Tasa de cambio utilizada en la transacción, si aplica. |
| `ip`                  | Alfanumérico  | 39     | Dirección IP desde la cual el comprador inició la transacción. |
| `nickname_buyer`      | Alfanumérico  | 150    | Identificador corto o apodo del comprador, si está disponible. |
| `nickname_seller`     | Alfanumérico  | 150    | Identificador corto o apodo del vendedor (tu negocio), si está disponible. |
| `payment_method_id`   | Numérico      | —      | Otro identificador del método de pago utilizado. [Consulta los códigos de métodos de pago]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| `payment_request_state`| Alfanumérico | 32     | Estado actual de la solicitud de pago en el sistema de PayU. |
| `pse_reference1`      | Alfanumérico  | 255    | Información de referencia adicional para pagos PSE. |
| `pse_reference2`      | Alfanumérico  | 255    | Información de referencia adicional para pagos PSE. |
| `pse_reference3`      | Alfanumérico  | 255    | Información de referencia adicional para pagos PSE. |
| `response_message_pol`| Alfanumérico  | 255    | Mensaje legible de respuesta de PayU para la transacción. [Consulta los mensajes de respuesta]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-url" >}}). |
| `shipping_city`       | Alfanumérico  | 50     | Ciudad a la que se entregará la mercancía. |
| `shipping_country`    | Alfanumérico  | 2      | Código ISO 3166-1 alfa-2 del país al que se entregará la mercancía (por ejemplo, CO, US). |
| `transaction_bank_id` | Alfanumérico  | 255    | Identificador único asignado por el banco a la transacción. |
| `transaction_id`      | Alfanumérico  | 36     | Identificador único de PayU para esta transacción específica. |
| `payment_method_name` | Alfanumérico  | 255    | Nombre del método de pago utilizado (por ejemplo, VISA, MASTERCARD, PSE). |

</details>

## Ejemplo de solicitud POST para la URL de confirmación {#post-request-example-for-the-confirmation-url}

El siguiente ejemplo muestra cómo nuestro sistema envía parámetros a tu URL de confirmación mediante una solicitud HTTP POST:

```HTML
response_code_pol=5
phone=
additional_value=0.00
test=1
transaction_date=2015-05-27 13:07:35
cc_number=************0004
cc_holder=test_buyer
error_code_bank=
billing_country=CO
bank_referenced_name=
description=test_payu_01
administrative_fee_tax=0.00
value=100.00
administrative_fee=0.00
payment_method_type=2
office_phone=
email_buyer=test@payulatam.com
response_message_pol=ENTITY_DECLINED
error_message_bank=
shipping_city=
transaction_id=f5e668f1-7ecc-4b83-a4d1-0aaa68260862
sign=e1b0939bbdc99ea84387bee9b90e4f5c
tax=0.00
payment_method=10
billing_address=cll 93
payment_method_name=VISA
pse_bank=
state_pol=6
date=2015.05.27 01:07:35
nickname_buyer=
reference_pol=7069375
currency=USD
risk=1.0
shipping_address=
bank_id=10
payment_request_state=R
customer_number=
administrative_fee_base=0.00
attempts=1
merchant_id=508029
exchange_rate=2541.15
shipping_country=
installments_number=1
franchise=VISA
payment_method_id=2
extra1=
extra2=
antifraudMerchantId=
extra3=
nickname_seller=
ip=190.242.116.98
airline_code=
billing_city=Bogota
pse_reference1=
reference_sale=2015-05-27 13:04:37
pse_reference3=
pse_reference2=
```

## Validación de la firma {#signature-validation}

La validación de la firma garantiza la integridad de los datos recibidos en tu URL de confirmación. Debes generar la firma utilizando los parámetros que te proporcionó PayU y compararla con el parámetro `sign` enviado en la solicitud HTTP POST.

### Consideraciones importantes {#important-considerations}

* Si el segundo decimal del valor (`value`) es cero, debes formatear el `new_value` con **un solo decimal** (por ejemplo, `150.00` → `150.0`).
* Si el segundo decimal **no** es cero, conserva los dos decimales en el `new_value` (por ejemplo, `150.25` → `150.25`).
* Siempre utiliza los valores enviados en la URL de confirmación (`merchant_id`, `reference_sale`, `value`, `currency` y `state_pol`) para generar la firma. **No** uses valores provenientes de tu propia base de datos.
* Almacena tu clave API de forma segura.
* Construye la cadena para la firma con el siguiente formato:

<p>

    apiKey~merchant_id~reference_sale~new_value~currency~state_pol

### Ejemplos de firma

Los siguientes ejemplos ilustran cómo generar una firma, en este caso, utilizando HMAC-SHA256.

#### Firma con un decimal

Usa este ejemplo cuando el segundo decimal del valor (`value`) sea `0`. En este caso, formatea el valor con solo un decimal.

| **Elemento** | **Valor** |
|--------|-----------------|
| Parámetros de la cadena | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchant_id: 508029` <br> `reference_sale: PayUTest01` <br> `value: 150.00` <br> `currency: USD` <br> `state_pol: 4` |
| Cadena de entrada (formateada)   | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.0~USD~4` |
| Clave secreta (solo aplica para HMAC-SHA256)      | `test123` |
| `sign` generado | `65fb2b3452572784e23e7d6480359fd2507c54dd285ca3c4dceffb8764cfb66f` |

#### Firma con dos decimales

Usa el siguiente ejemplo cuando el segundo decimal del valor (`value`) **no sea** `0`. Formatea el valor con dos decimales.

| **Elemento** | **Valor** |
|--------------|-----------|
| Parámetros de la cadena | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchant_id: 508029` <br> `reference_sale: PayUTest01` <br> `value: 150.25` <br> `currency: USD` <br> `state_pol: 4` |
| Cadena de entrada (formateada) | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.25~USD~4` |
| Clave secreta (solo aplica para HMAC-SHA256) | `test123` |
| `sign` generado | `7770a7933b90570a078fcacce1790eb13079cdf8f8a6e900b79f4f5eb96b8024` |

### Valida tu firma {#validate-your-signature}

Usa este generador para crear una firma con cualquiera de los métodos de cifrado disponibles. Esta funcionalidad te ayuda a verificar el valor del `sign` que PayU envía a tu URL de confirmación.

<div>
{{< confirmationpage/signaturegen_conf_es >}}
</div>

## Reintentos de pago {#payment-retries}

Cuando una transacción es rechazada, el pagador tiene la opción de reintentar el pago utilizando el mismo u otro método de pago. Ten en cuenta que para cada intento, PayU envía una solicitud a la URL de confirmación con el estado correspondiente de la transacción.

Cada una de estas solicitudes utiliza la misma referencia de pago (`reference_sale`) y el mismo identificador de pedido (`reference_pol`), pero incluye un identificador de transacción diferente (`transaction_id`). Como resultado, puedes recibir múltiples llamadas a la URL de confirmación para la misma venta.

A continuación, se muestra un ejemplo que ilustra un intento rechazado seguido por un reintento aprobado:

````
reference_sale=2015-05-27 13:04:37
reference_pol=7069375
transaction_id=f5e668f1-7ecc-4b83-a4d1-0aaa68260862
state_pol=6

reference_sale=2015-05-27 13:04:37
reference_pol=7069375
transaction_id=01cfdce8-68d5-4a4c-aabf-d89370a0b92f
state_pol=4
````

{{% alert title="Nota" color="info" %}}

Si alguna de las solicitudes a la URL de confirmación indica que una referencia de pago (`reference_sale`) ha sido aprobada, puedes tener la certeza de que no se enviarán más reportes para esa misma referencia.

{{% /alert %}}
