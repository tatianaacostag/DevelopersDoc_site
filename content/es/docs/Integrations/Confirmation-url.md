---
title: "URL de Confirmación"
linkTitle: "URL de Confirmación"
date: 2026-01-29T12:15:57-05:00
description: >
  La URL de Confirmación es un webhook servidor a servidor que automatiza la sincronización de los resultados de las transacciones con sus sistemas internos.
weight: 50
---

PayU utiliza esta URL para enviar una petición HTTP POST asíncrona directamente a su servidor una vez que la transacción alcanza un estado final (Aprobada, Rechazada o Declinada). Dado que este proceso ocurre en segundo plano, permanece invisible para el cliente. Por lo tanto, mientras que la URL de Respuesta gestiona la experiencia de cara al usuario, la URL de Confirmación se encarga de la comunicación backend entre PayU y su servidor.

## Guías de Implementación

* **Actualizaciones Automáticas:** Utilice este mecanismo para activar flujos de trabajo automatizados, tales como la actualización de bases de datos, el ajuste de niveles de inventario y la finalización del estado de los pedidos.

* **Gestión de Reintentos:** PayU genera una confirmación única por cada intento de transacción. Si un pagador reintenta un pago, su sistema recibirá una notificación por cada resultado individual, independientemente del desenlace.

* **Requisitos de Formato:** Debido a que esta URL sirve exclusivamente para la transmisión de datos, su endpoint no debe retornar código HTML ni elementos visuales.

* **Lógica del Lado del Servidor:** Debe implementar lógica de servidor en su lenguaje de programación preferido para capturar, analizar (parse) y procesar las variables transmitidas por PayU.

{{% alert title="Nota" color="info"%}} 

Aunque la implementación de la URL de Confirmación es opcional, la recomendamos encarecidamente para garantizar que su sistema mantenga un registro preciso y en tiempo real de todos los resultados de las transacciones. 

{{% /alert %}}

## Métodos de Integración

Dependiendo de su tipo de integración, utilice los siguientes parámetros para definir su endpoint de webhook:

| Tipo de Integración | Ruta del Parámetro | Ejemplo de Implementación |
| :--- | :--- | :--- |
| **WebCheckout** | `confirmationUrl` | `<input name="confirmationUrl" type="hidden" value="https://tusitio.com/confirmar">` |
| **Integración API** | `transaction.order.notifyUrl` | `"order": { "notifyUrl": "https://tusitio.com/confirmar", ... }` |

## Consideraciones

* **Accesibilidad Pública:** La URL debe ser pública. Evite el uso de localhosts o intranets internas.

* **Deshabilitar Autenticación:** Asegúrese de que el endpoint no requiera Basic Auth ni ninguna medida de seguridad que pueda bloquear la petición POST automatizada de PayU.

* **Certificados SSL/TLS:** Si utiliza HTTPS para su URL de Confirmación, debe emplear un certificado SSL/TLS válido. No utilice certificados de seguridad de curva elíptica ni aquellos con la suite de cifrado `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA`.

* **Tipo de Contenido (Content Type):** Su servidor debe estar configurado para procesar datos en formato `x-www-form-urlencoded`.

* **Reporte de Estado Final de Transacción:** PayU solo activará la URL de Confirmación cuando una transacción alcance un estado final (ej. aprobada, rechazada o expirada). No recibirá reportes de transacciones que aún estén en proceso (esperando pago o en análisis).

* **Sin Página HTML:** Al tratarse de una llamada sistema a sistema, su script debe procesar la lógica y devolver un estado estándar HTTP 200 OK sin renderizar código HTML. 

## Lista Blanca (Whitelist) de Direcciones IP para Servidores PayU

Para asegurar que su servidor reciba las peticiones y notificaciones de PayU Latam, es necesario agregar nuestras direcciones IP a su lista blanca. Esto es especialmente importante si su servidor está protegido por un firewall. Todas las peticiones de webhook y comunicaciones de los servidores de PayU se originarán desde las direcciones IP listadas a continuación.

**Ambiente de Producción**

* 34.233.144.154
* 184.73.94.138
* 52.73.124.136

**Ambiente de Sandbox**

* 54.158.171.129

## Parámetros POST

PayU transmite una amplia gama de parámetros a su servidor.

### Consideraciones Importantes

* **Payloads Dinámicos:** PayU ajusta el payload de forma dinámica según el medio de pago utilizado. Por ejemplo, PayU envía `cc_number`, `cc_holder` y `cardType` para transacciones con tarjeta de crédito, pero los excluye en pagos en efectivo o transferencias bancarias.

* **Manejo de Errores:** Su integración debe ser capaz de gestionar llaves opcionales o ausentes para evitar errores en el script cuando ciertas variables no estén presentes en la petición POST.

* **Variables Configurables:** Puede solicitar a su representante de PayU la inclusión de parámetros adicionales en su integración, tales como `cardType`, `transaction_type`, `bank_reference_code`, `payment_method_id`, `expiration_date` y `adminFee` en la notificación.

<details>

<summary><b>Parámetros</b></summary>

<br>

<div class="variables"></div>

| Campo | Tipo | Tamaño | Descripción |
|---|---|---|---|
| `merchant_id` | Numérico | 12 | Su ID de Comercio en el sistema de PayU. Puede encontrarlo en el correo de creación de su cuenta. |
| `state_pol` | Alfanumérico | 32 | Estado de la transacción en el sistema de PayU. [Ver estados de transacción]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-url" >}}). |
| `risk` | Decimal | — | Puntaje de riesgo asociado a la transacción, entre 0 y 1. Un valor mayor indica mayor riesgo. Formato: `###.00`. |
| `response_code_pol` | Alfanumérico | 255 | Código de respuesta interno de PayU para la transacción. [Ver códigos de respuesta]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-url" >}}). |
| `reference_sale` | Alfanumérico | 255 | Su referencia única de venta o pedido. Debe ser distinta para cada transacción enviada a PayU. |
| `reference_pol` | Alfanumérico | 255 | Referencia o número de transacción único generado por PayU. |
| `sign` | Alfanumérico | 255 | Firma digital generada por PayU para esta transacción específica, utilizada para validar la integridad de los datos. |
| `extra1` | Alfanumérico | 255 | Campo personalizado para información adicional de la compra. |
| `extra2` | Alfanumérico | 255 | Campo personalizado para información adicional de la compra. |
| `payment_method` | Numérico | — | Identificador interno de PayU para el medio de pago. [Ver códigos de medios de pago]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| `payment_method_type` | Numérico | — | Tipo general de medio de pago (ej. tarjeta de crédito, transferencia bancaria). |
| `installments_number` | Numérico | — | Número de cuotas elegidas por el comprador para pagos con tarjeta de crédito. |
| `value` | Numérico | 14.2 | Monto total de la transacción, puede incluir hasta dos decimales (ej. 10000.00 o 10000). |
| `tax` | Numérico | 14.2 | Valor del IVA de la transacción. Acepta hasta dos decimales. Use 0 si no aplica IVA. <p><b>Nota:</b> Para transacciones en Colombia, si se envía 0, PayU aplicará automáticamente el IVA estándar del 19%. |
| `additional_value` | Numérico | 14.2 | Valor adicional que no forma parte del cálculo de la comisión. |
| `transaction_date` | Fecha | — | Fecha y hora en que ocurrió la transacción (YYYY-MM-DD HH:mm:ss). |
| `currency` | Alfanumérico | 3 | Código de la moneda en la que se realizó el pago. [Ver monedas aceptadas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). |
| `email_buyer` | Alfanumérico | 255 | Correo electrónico del comprador. Se recomienda validar este correo si fue capturado a través de un formulario. |
| `cus` | Alfanumérico | 64 | Código Único de Seguimiento. Referencia específica ante el banco para transacciones procesadas en Colombia. |
| `pse_bank` | Alfanumérico | 255 | Nombre del banco utilizado para pagos PSE. |
| `test` | Booleano | — | Indica si la transacción fue de prueba (true) o real (false). |
| `description` | Alfanumérico | 255 | Descripción de los artículos o servicios adquiridos. |
| `billing_address` | Alfanumérico | 255 | Dirección de facturación del comprador. |
| `shipping_address` | Alfanumérico | 50 | Dirección de entrega de la mercancía. |
| `phone` | Alfanumérico | 20 | Teléfono residencial del comprador. |
| `office_phone` | Alfanumérico | 20 | Teléfono diurno del comprador. |
| `account_number_ach` | Alfanumérico | 36 | Identificador para transacciones ACH. |
| `account_type_ach` | Alfanumérico | 36 | Tipo de cuenta utilizada para transacciones ACH. |
| `administrative_fee` | Decimal | — | Valor de la tarifa administrativa asociada a la transacción. |
| `administrative_fee_base`| Decimal | — | Valor base utilizado para calcular la tarifa administrativa. |
| `administrative_fee_tax`| Decimal | — | Valor del impuesto aplicado a la tarifa administrativa. |
| `airline_code` | Alfanumérico | 4 | Código de la aerolínea, si aplica. |
| `attempts` | Numérico | — | Número de intentos que PayU realizó para enviar la confirmación a su servidor. |
| `authorization_code` | Alfanumérico | 12 | Código de autorización proporcionado por el banco emisor. |
| `bank_id` | Alfanumérico | 255 | Identificador del banco involucrado en la transacción. |
| `billing_city` | Alfanumérico | 255 | Ciudad de facturación del comprador. |
| `billing_country` | Alfanumérico | 2 | Código ISO 3166-1 alpha-2 del país de facturación (ej. CO, US). |
| `commision_pol` | Decimal | — | Valor de la comisión cobrada por PayU. |
| `commision_pol_currency`| Alfanumérico | 3 | Código de moneda de la comisión. |
| `customer_number` | Numérico | — | Identificador del cliente, si fue proporcionado. |
| `date` | Fecha | — | Fecha y hora de la operación (YYYY-MM-DD HH:mm:ss). |
| `error_code_bank` | Alfanumérico | 255 | Código de error retornado por el banco, si existe. |
| `error_message_bank` | Alfanumérico | 255 | Mensaje de error retornado por el banco, si existe. |
| `exchange_rate` | Decimal | — | Tasa de cambio utilizada en la transacción, si aplica. |
| `ip` | Alfanumérico | 39 | Dirección IP desde la cual el comprador inició la transacción. |
| `nickname_buyer` | Alfanumérico | 150 | Apodo o identificador corto del comprador. |
| `nickname_seller` | Alfanumérico | 150 | Apodo o identificador corto del vendedor (su comercio). |
| `payment_method_id` | Numérico | — | Otro identificador del medio de pago. [Ver códigos de medios de pago]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| `payment_request_state`| Alfanumérico | 32 | Estado actual de la solicitud de pago en el sistema de PayU. |
| `pse_reference1` | Alfanumérico | 255 | Campo personalizado de referencia 1 para pagos PSE (Solo Colombia). |
| `pse_reference2` | Alfanumérico | 255 | Campo personalizado de referencia 2 para pagos PSE (Solo Colombia). |
| `pse_reference3` | Alfanumérico | 255 | Campo personalizado de referencia 3 para pagos PSE (Solo Colombia). |
| `response_message_pol`| Alfanumérico | 255 | Mensaje de respuesta de PayU legible para humanos. [Ver mensajes de respuesta]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-url" >}}). |
| `shipping_city` | Alfanumérico | 50 | Ciudad de entrega de la mercancía. |
| `shipping_country` | Alfanumérico | 2 | Código ISO 3166-1 alpha-2 del país de entrega (ej. CO, US). |
| `transaction_bank_id` | Alfanumérico | 255 | Identificador único asignado a la transacción por el banco. |
| `transaction_id` | Alfanumérico | 36 | Identificador único de PayU para este intento de transacción específico. |
| `payment_method_name` | Alfanumérico | 255 | Nombre del medio de pago (ej. VISA, MASTERCARD, PSE). |
| `cc_holder` | Alfanumérico | 150 | Nombre del tarjetahabiente como aparece en la tarjeta. |
| `cc_number` | Alfanumérico | — | Número de tarjeta enmascarado (ej. `************0004`). |
| `cardType` | Alfanumérico | — | Franquicia o tipo de tarjeta (ej. VISA, MASTERCARD). |
| `franchise` | Alfanumérico | — | Franquicia asociada a la tarjeta de crédito (ej. VISA). |

</details>

## Ejemplo de Petición POST para la URL de Confirmación

El siguiente ejemplo muestra cómo nuestro sistema envía los parámetros a su URL de Confirmación mediante una petición HTTP POST:

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

## Ejemplo de Implementación (PHP)

Este script captura los datos POST enviados por PayU (compatible tanto con WebCheckout como con las notificaciones de API):

```PHP
<?php
/**
 * PayU Confirmation URL / notifyUrl Listener
 * Signature algorithm: MD5
 *
 * This endpoint receives server-to-server notifications from PayU.
 * It must be publicly accessible and return HTTP 200 on success.
 */

// -----------------------------------------------------------------------------
// 1. Configuration
// -----------------------------------------------------------------------------

// Store securely (environment variable recommended)
$apiKey = 'YOUR_API_KEY_HERE';

// -----------------------------------------------------------------------------
// 2. Capture incoming data
//    - WebCheckout sends application/x-www-form-urlencoded
//    - API notifyUrl may send application/json
// -----------------------------------------------------------------------------

$data = $_POST;

if (empty($data)) {
    $rawBody = file_get_contents('php://input');
    $decoded = json_decode($rawBody, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}

// -----------------------------------------------------------------------------
// 3. Extract required parameters (from Confirmation URL payload)
// -----------------------------------------------------------------------------

$merchantId     = $data['merchant_id']     ?? '';
$referenceSale  = $data['reference_sale']  ?? '';
$value          = $data['value']            ?? '';
$currency       = $data['currency']         ?? '';
$statePol       = $data['state_pol']        ?? '';
$receivedSign   = $data['sign']             ?? '';

// -----------------------------------------------------------------------------
// 4. Format value for signature (NO floats)
//    Rule:
//    - If second decimal is 0 → 1 decimal (150.00 → 150.0)
//    - Otherwise → 2 decimals (150.25 → 150.25)
// -----------------------------------------------------------------------------

$parts = explode('.', $value);

if (!isset($parts[1])) {
    $formattedValue = $parts[0] . '.0';
} elseif (strlen($parts[1]) > 1 && $parts[1][1] !== '0') {
    $formattedValue = $parts[0] . '.' . substr($parts[1], 0, 2);
} else {
    $formattedValue = $parts[0] . '.' . $parts[1][0];
}

// -----------------------------------------------------------------------------
// 5. Generate and validate signature (MD5)
// -----------------------------------------------------------------------------

$signatureString = implode('~', [
    $apiKey,
    $merchantId,
    $referenceSale,
    $formattedValue,
    $currency,
    $statePol
]);

$calculatedSign = md5($signatureString);

if (!hash_equals(strtolower($receivedSign), strtolower($calculatedSign))) {
    // Invalid signature — do NOT process the transaction
    http_response_code(403);
    echo 'Invalid signature';
    exit;
}

// -----------------------------------------------------------------------------
// 6. Signature valid — process transaction
// -----------------------------------------------------------------------------

switch ($statePol) {
    case '4':
        // APPROVED
        // ✔ Mark order as paid
        // ✔ Trigger fulfillment
        break;

    case '6':
        // REJECTED
        // ✔ Mark order as rejected
        break;

    case '5':
        // EXPIRED
        // ✔ Mark order as expired
        break;

    default:
        // Other states (optional handling)
        break;
}

// -----------------------------------------------------------------------------
// 7. Respond to PayU
// -----------------------------------------------------------------------------

http_response_code(200);
echo 'OK';

```

## Validación de la Firma (Signature)

Para garantizar la integridad de los datos y verificar que la notificación se originó en PayU, debe generar una firma en su servidor y compararla con el parámetro `sign` enviado en la petición HTTP POST.

### Reglas de Redondeo para Webhooks

El redondeo para el campo `value` en los webhooks sigue estas reglas específicas para la cadena de firma:

* Si el segundo decimal de `value` es cero, formatee el `new_value` usando **un solo decimal** (ej., `150.00` se convierte en `150.0`).
* Si el segundo decimal **no** es cero, mantenga los dos decimales en el `new_value` (ej., `150.25` se mantiene como `150.25`).

### Formato de la Firma

Utilice siempre los valores provenientes de la URL de Confirmación (`merchant_id`, `reference_sale`, `value`, `currency` y `state_pol`) para generar la firma. **No** utilice valores de su propia base de datos.

La cadena a procesar (hash) es:
<p>

    apiKey~merchant_id~reference_sale~new_value~currency~state_pol

### Ejemplos de Firma

Los siguientes ejemplos ilustran cómo generar una firma, en este caso, utilizando HMAC-SHA256.

#### Firma con un Decimal

Use este ejemplo cuando el segundo decimal de `value` sea `0`. En este caso, formatee el valor con un solo decimal.

| **Ítem** | **Valor** |
|-----------|----------|
| Parámetros de la cadena | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchant_id: 508029` <br> `reference_sale: PayUTest01` <br> `value: 150.00` <br> `currency: USD` <br> `state_pol: 4` |
| Cadena de entrada (formateada) | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.0~USD~4` |
| Clave secreta (solo para HMAC-SHA256)   | `test123` |
| `sign` generado | `65fb2b3452572784e23e7d6480359fd2507c54dd285ca3c4dceffb8764cfb66f` |

#### Firma con dos Decimales

Use el siguiente ejemplo cuando el segundo decimal de `value` **no sea** `0`. Formatee el valor con dos decimales.

| **Ítem** | **Valor** |
|----------|-----------|
| Parámetros de la cadena | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchant_id: 508029` <br> `reference_sale: PayUTest01` <br> `value: 150.25` <br> `currency: USD` <br> `state_pol: 4` |
| Cadena de entrada (formateada)   | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.25~USD~4` |
| Clave secreta (solo para HMAC-SHA256)   | `test123` |
| `sign` generado | `7770a7933b90570a078fcacce1790eb13079cdf8f8a6e900b79f4f5eb96b8024` |

### Valide su Firma

Utilice este generador para crear una firma con cualquiera de los métodos de cifrado disponibles. Esta funcionalidad le ayuda a verificar el valor `sign` que PayU envía a su URL de Confirmación.

<div>
{{< confirmationpage/signaturegen_conf_en >}}
</div>

## Reintentos de Pago

Si una transacción es rechazada, el pagador puede reintentar utilizando un método diferente. PayU envía una confirmación por cada intento.

* Cada intento comparte la misma referencia de pago (`reference_sale`) e identificador de orden (`reference_pol`).
* Cada intento posee un identificador de transacción único (`transaction_id`).

{{% alert title="Nota" color="info"%}} 

Si recibe un estado de Aprobado (state_pol = 4) para una referencia de venta (`reference_sale`) específica, su sistema puede ignorar con seguridad cualquier reporte posterior para esa misma referencia para evitar duplicidad en la entrega del producto o servicio.

{{% /alert %}}

A continuación se muestra un ejemplo de un intento rechazado seguido de un reintento aprobado:

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
