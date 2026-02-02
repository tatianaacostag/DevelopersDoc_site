---
title: "URL de Respuesta"
linkTitle: "URL de Respuesta"
date: 2026-01-28T12:15:39-05:00
description: >  
  Puedes utilizar una URL de Respuesta para redirigir al pagador de vuelta a tu sitio web y mostrar el resultado de la transacción. Esto mejora la experiencia del usuario al completar el flujo de pago.
weight: 40
---

La URL de Respuesta sirve como un puente para retornar al pagador a tu plataforma después de haber completado (o intentado) un pago. Aunque la integración redirige al cliente a través de una petición GET a nivel de navegador, los datos enviados te permiten mostrar resúmenes de transacción o estados personalizados, tales como *Aprobado*, *Rechazado*, *En validación* o *Pago pendiente* (para transacciones en efectivo). Ten en cuenta, sin embargo, que el pagador podría cerrar el checkout antes de llegar a la página de resultados.

## Métodos de Integración

El nombre del parámetro y su ubicación para la URL de Respuesta varían según el tipo de integración que estés utilizando.

| Tipo de Integración | Nombre del Parámetro / Ruta | Ejemplo de Implementación |
| :--- | :--- | :--- |
| **WebCheckout** | `responseUrl` | `<input name="responseUrl" type="hidden" value="http://www.mitienda.com/respuesta.php">` |
| **Integración API** | `transaction.extraParameters.RESPONSE_URL` | `"extraParameters": { "RESPONSE_URL": "http://www.payu.com/respuesta" }` |

## Consideraciones

* **No apto para lógica de Backend:** Evita depender de la URL de Respuesta para actualizar tu base de datos o procesar pedidos. Los usuarios pueden cerrar el navegador antes de que ocurra la redirección. **Utiliza siempre la URL de Confirmación (Webhook) para los procesos de backend**.

* **Restricciones de Hosting:** Asegúrate de que tu proveedor de hosting no bloquee URLs enviadas como valores de parámetros (ej. `&merchant_url=...`).

* **Recomendaciones de Visualización:** Recomendamos mostrar al cliente al menos: el estado, la referencia, el valor, la moneda y la fecha.

* **Comportamiento por Defecto:** Si no proporcionas una URL de Respuesta (ya sea en la petición o en el Panel de Gestión de PayU), el proceso finaliza en la página de checkout web de PayU.

{{% alert title="Importante" color="warning"%}}

Si dejas la URL de Respuesta en blanco, PayU mostrará la información de la transacción en su propia página, pero el comprador no tendrá la opción de regresar a tu sitio web.

{{% /alert %}}

## Parámetros enviados a la URL de Respuesta

Independientemente del método de integración, PayU envía los siguientes parámetros a tu URL a través de una petición HTTP GET.

<details>

<summary><b>Parámetros</b></summary>

<br>

<div class="variables"></div>

| Campo | Tipo | Tamaño | Descripción |
|:---|:---|:---|:---|
| `merchantId` | Numérico | 12 | Número de identificación único del comercio en el sistema de PayU, proporcionado en el correo de creación de la cuenta. |
| `transactionState` | Numérico | 2 | Estado de la transacción. [Ver Estados de Transacción]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). |
| `risk` | Decimal | — | Puntaje de riesgo asociado a la transacción (valores entre 0 y 1). Un valor mayor indica un riesgo más alto. Formato: `###.00`. |
| `polResponseCode` | Alfanumérico | 64 | Código de respuesta interno de PayU. [Ver Códigos de Respuesta]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). |
| `polTransactionState` | Numérico | 2 | Estado de la transacción interno de PayU. [Ver Códigos de Respuesta]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). |
| `referenceCode` | Alfanumérico | 255 | Código de referencia único de la venta o pedido. Debe ser único para cada transacción enviada al sistema. |
| `reference_pol` | Alfanumérico | 255 | Número de transacción único generado por PayU. |
| `signature` | Alfanumérico | 255 | Firma digital utilizada para validar la integridad de los datos de cada transacción. |
| `polPaymentMethod` | Alfanumérico | 255 | Identificador interno del medio de pago utilizado. |
| `polPaymentMethodType` | Numérico | 2 | Tipo de medio de pago utilizado. [Ver Códigos de Métodos de Pago]({{< ref "response-codes-and-variables.html#payment-methods-codes" >}}). |
| `installmentsNumber` | Numérico | 2 | Número de cuotas solicitadas para pagos con tarjeta de crédito. |
| `TX_VALUE` | Numérico | 14.2 | El monto total de la transacción. Soporta hasta dos decimales (ej., `100.00` o `100`). |
| `TX_TAX` | Numérico | 14.2 | Valor del IVA. Soporta hasta dos decimales. Si no aplica IVA, enviar `0`. <br>**Nota:** Para Colombia, si este campo se omite, se aplica automáticamente un IVA del 19%. |
| `buyerEmail` | Alfanumérico | 255 | Correo electrónico del comprador utilizado para las notificaciones de la transacción. Recomendamos validar este campo en el punto de entrada de datos. |
| `processingDate` | Fecha | — | Fecha y hora en que se procesó la transacción. Formato: `YYYY-MM-DD HH:mm:ss`. |
| `currency` | Alfanumérico | 3 | Código de moneda ISO para el pago. Las transacciones en Colombia se concilian en COP a la tasa representativa del mercado diaria. |
| `cus` | Alfanumérico | 255 | Código Único de Seguimiento. La referencia de pago específica utilizada por los bancos para transacciones PSE en Colombia. |
| `pseBank` | Alfanumérico | 255 | Nombre del banco utilizado para pagos PSE (solo Colombia). |
| `lng` | Alfanumérico | 2 | Código de idioma utilizado para mostrar la pasarela de pago. |
| `description` | Alfanumérico | 255 | Descripción breve de la venta. |
| `lapResponseCode` | Alfanumérico | 64 | Código de respuesta entregado por PayU. [Ver Códigos de Respuesta]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). |
| `lapPaymentMethod` | Alfanumérico | 255 | Medio de pago específico utilizado (ej., `VISA`). |
| `lapPaymentMethodType` | Alfanumérico | 255 | Categoría del medio de pago (ej., `CREDIT_CARD`). |
| `lapTransactionState` | Alfanumérico | 32 | Estado de la transacción de alto nivel. [Ver Estado de Transacción]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). |
| `message` | Alfanumérico | 255 | Mensaje descriptivo que explica el estado de la transacción. |
| `extra1` | Alfanumérico | 255 | Campo personalizado para información adicional de la compra. |
| `extra2` | Alfanumérico | 255 | Campo personalizado para información adicional de la compra. |
| `extra3` | Alfanumérico | 255 | Campo personalizado para información adicional de la compra. |
| `authorizationCode` | Alfanumérico | 12 | Código de autorización proporcionado por la institución financiera para la venta. |
| `merchant_address` | Alfanumérico | 255 | Dirección registrada del comercio. |
| `merchant_name` | Alfanumérico | 255 | Nombre registrado del comercio. |
| `merchant_url` | Alfanumérico | 255 | URL del sitio web del comercio. |
| `orderLanguage` | Alfanumérico | 2 | Idioma del pedido. Formato: `ISO-639-1`. |
| `pseCycle` | Numérico | — | Identificador del ciclo de transacción generado por PSE (solo Colombia). |
| `pseReference1` | Alfanumérico | 255 | Campo de referencia personalizado 1 para pagos PSE (solo Colombia). |
| `pseReference2` | Alfanumérico | 255 | Campo de referencia personalizado 2 para pagos PSE (solo Colombia). |
| `pseReference3` | Alfanumérico | 255 | Campo de referencia personalizado 3 para pagos PSE (solo Colombia). |
| `telephone` | Alfanumérico | 20 | Número de teléfono de contacto del comercio. |
| `transactionId` | Alfanumérico | 36 | Identificador interno único para la transacción. |
| `trazabilityCode` | Alfanumérico | 64 | Código de trazabilidad de la venta según consta en el sitio del comercio. |
| `TX_ADMINISTRATIVE_FEE` | Decimal | — | Valor de la tarifa administrativa aplicada. |
| `TX_TAX_ADMINISTRATIVE_FEE` | Decimal | — | Monto del impuesto aplicado a la tarifa administrativa. |
| `TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE` | Decimal | — | Valor base de la tarifa administrativa utilizado para devoluciones de impuestos. |
| `action_code_description` | Alfanumérico | 255 | Descripción del código de acción de respuesta (Específico para ciertos adquirentes como VISANET Perú). |
| `cc_holder` | Alfanumérico | 150 | Nombre del titular de la tarjeta tal como aparece en la tarjeta de crédito. |
| `cc_number` | Alfanumérico | — | Número de tarjeta de crédito enmascarado utilizado para la transacción (ej., `************0004`). |
| `processing_date_time` | Fecha | — | Fecha de procesamiento de la venta. Formato: `YYYY-MM-DD`. |
| `request_number` | Alfanumérico | 9 | Combinación del Número de Pedido y el identificador de la transacción. |

</details>

## Ejemplo de Implementación (PHP)

La lógica es esencialmente la misma para ambas integraciones una vez que el sistema redirige al usuario a tu script:

```PHP
<?php
$apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
$merchant_id = $_GET['merchantId'];
$referenceCode = $_GET['referenceCode'];
$TX_VALUE = (float) $_GET['TX_VALUE'];
$currency = $_GET['currency'];
$transactionState = $_GET['transactionState'];

// Apply rounding for signature validation
$new_value = round($TX_VALUE, 1, PHP_ROUND_HALF_EVEN);

$signature_string = "$apiKey~$merchant_id~$referenceCode~$new_value~$currency~$transactionState";
$calculated_signature = md5($signature_string);
$received_signature = $_GET['signature'];

if (hash_equals(strtolower($received_signature), strtolower($calculated_signature))) {
    echo "<h2>Transaction Verified Successfully</h2>";
    // Display summary to user
} else {
    echo "<h2>Invalid Signature - Data Integrity Compromised</h2>";
}
?>
```

<br>

**Ejemplo de Petición GET:**

El siguiente es un ejemplo de la cadena de consulta (query string) que PayU añade a tu URL de Respuesta. Puedes usarlo para probar la capacidad de tu script para capturar variables y validar la firma.

```HTML
http://mytestsite.com/response.php?merchantId=508029&transactionState=6&referenceCode=2015-05-27+13%3A04%3A37&reference_pol=7069375&transactionId=f5e668f1-7ecc-4b83-a4d1-0aaa68260862&signature=e1b0939bbdc99ea84387bee9b90e4f5c&TX_VALUE=100.00&currency=USD&buyerEmail=test%40payulatam.com&lapPaymentMethod=VISA&lapTransactionState=DECLINED&message=Declined
```

## Validación de la Firma

Para garantizar que los datos recibidos en la URL de Respuesta no hayan sido alterados, debes regenerar la firma y compararla con el parámetro `signature`.

### Regla de Redondeo para la URL de Respuesta

* Para calcular el `new_value` de la firma, redondea el `TX_VALUE` a **un decimal** utilizando el método de **redondeo al par más cercano** (*round half to even*):
  - Si el primer decimal es par y el segundo es `5` → redondea hacia abajo (ej., `150.25` se convierte en `150.2`).
  - Si el primer decimal es impar y el segundo es `5` → redondea hacia arriba (ej., `150.35` se convierte en `150.4`).
  - De lo contrario, redondea normalmente al decimal más cercano.

### Formato de la Firma

Utiliza siempre los valores provenientes de la URL de Respuesta (`merchantId`, `referenceCode`, `TX_VALUE`, `currency` y `transactionState`) para generar la firma. **No** utilices los valores de tu base de datos. 

La cadena a cifrar es:
<p>

    apiKey~merchantId~referenceCode~new_value~currency~transactionState

### Ejemplos de Firma

Los siguientes ejemplos ilustran cómo generar una firma, en este caso, utilizando HMAC-SHA256.

#### El primer decimal es un número par y el segundo es 5

| **Ítem** | **Valor** |
|----------|-----------|
| Parámetros de la cadena | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchantId: 508029` <br> `referenceCode: PayUTest01` <br> `TX_VALUE: 150.25` <br> `currency: USD` <br> `transactionState: 6` |
| Cadena de entrada (formateada)   | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.2~USD~6` |
| Clave secreta (solo aplica para HMAC-SHA256)   | `test123` |
| `signature` generada | `5ac639cc57ea3ceccef66243f7a20412ea4ae0c86b5121ca6aa67597266057d1` |

#### El primer decimal es un número impar y el segundo es 5

| **Ítem** | **Valor** |
|----------|-----------|
| Parámetros de la cadena | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchantId: 508029` <br> `referenceCode: PayUTest01` <br> `TX_VALUE: 150.35` <br> `currency: USD` <br> `transactionState: 6` |
| Cadena de entrada (formateada)   | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.4~USD~6` |
| Clave secreta (solo aplica para HMAC-SHA256)   | `test123` |
| `signature` generada | `7bbb5dd21b3c668bbfec8455c4f4fd3887dff1caa9c5da3895ddd914065b4905` |

#### Otros casos

| **Ítem** | **Valor** |
|----------|-----------|
| Parámetros de la cadena | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchantId: 508029` <br> `referenceCode: PayUTest01` <br> `TX_VALUE: 150.34` <br> `currency: USD` <br> `transactionState: 6` |
| Cadena de entrada (formateada)   | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.3~USD~6` |
| Clave secreta (solo aplica para HMAC-SHA256)   | `test123` |
| `signature` generada | `50c8aae35caf923fbdbd791d7842b916ab7d6597b7c4032dd92ab67b7bb43e8a` |

### Valida tu Firma

Utiliza este generador para crear una firma con cualquiera de los métodos de cifrado disponibles. Esta funcionalidad te ayuda a verificar el valor de la `signature` que PayU envía a tu URL de Respuesta.

<div>
{{< responsepage/signaturegen_resp_es >}}
</div>
