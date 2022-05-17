---
title: "Seleccionar tu medio de Pago"
linkTitle: "Seleccionar tu medio de Pago"
date: 2021-04-07T16:17:14-05:00
Description: >
 En este artículo, encontrarás la lista de métodos de pago disponibles en PayU.
weight: 30
---
<script src="/js/banner.js"></script>

<script>
window.onload = function() {
    var bannerText = "<ul class='fa-ul' style='--fa-li-width: 2em;margin-bottom: initial;'><li style='margin-bottom: initial;'><span class='fa-li'><i class='fas fa-exclamation-triangle'></i></span>Informamos que PayU S.A. ha sido notificado por parte de IGT - operador de la red Baloto - su decisión de terminar el contrato para el recaudo en efectivo debido a la entrada de un nuevo operador, el cual a la fecha no ha entregado información sobre la continuidad de este servicio. Por lo tanto, el servicio de pago a través de Baloto dejará de funcionar a partir del <b>25 de mayo de 2022</b>. Se recomienda deshabilitar este medio de pago al menos siete (7) días antes de esta fecha. Si necesitas asistencia adicional, contacta al equipo de soporte técnico a través de <a href='mailto:tecnico.co@payu.com'>tecnico.co@payu.com</a>.</li></ul>";

    loadBanner(bannerText);
}

window.onresize = function() {
    refreshBanner();
}
</script>

<style type="text/css" media="screen">
    div#banner { 
        z-index: 999;
        background-color: #DDEEEE; 
        width: 100%;
        margin-top: -1.3rem;
    }
    div#banner-content { 
        margin: 0 auto; 
        padding: 10px; 
    }
</style>

La siguiente sección muestra los métodos de pago disponibles por país y brinda algunas consideraciones. Consulta la columna `Parámetro paymentMethod` para saber el valor que se enviar como Medio de Pago cuando utilices la integración API o SDK.

## <img src="/assets/Argentina.png" width="25px"/> Argentina {#Argentina}
<div class="paymentMethods"></div>

|  | Medio de Pago | Parámetro paymentMethod | Tipo | Comentarios |
|:-:|---|---|---|---|
| ![Logo](/assets/PaymentMethods/american.png) | American Express | AMEX | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/argencard.png) | Argencard | ARGENCARD | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/cabal.png) | Cabal | CABAL | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/cencosud.png) | Cencosud | CENCOSUD | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/cobro-express.png) | Cobro Express | COBRO_EXPRESS | Efectivo | |
| ![Logo](/assets/PaymentMethods/diners.png) | Diners | DINERS | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard | MASTERCARD | Tarjetas de Crédito | **Tarjetas soportadas**: CRM Falabella, Nativa, Cordial, Cordobesa y Nexo. |
| ![Logo](/assets/PaymentMethods/naranja.png) | Naranja | NARANJA | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/pago-facil.png) | PAGOFACIL | PAGOFACIL | Efectivo | |
| ![Logo](/assets/PaymentMethods/rapi-pago.png) | RAPIPAGO | RAPIPAGO | Efectivo | |
| ![Logo](/assets/PaymentMethods/shopping.png) | Shopping | SHOPPING | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA | Tarjetas de Crédito | **Tarjetas soportadas**: Shopping, Nativa, Credimas y Nevada. |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA_DEBIT | Tarjetas Débito| |

## <img src="/assets/Brasil.png" width="25px"/> Brasil {#Brazil}
<div class="paymentMethods"></div>

|  | Medio de Pago | Parámetro paymentMethod | Tipo | Comentarios |
|:-:|---|---|---|---|
| ![Logo](/assets/PaymentMethods/american.png) | American Express | AMEX | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/boleto-bancario.png) | Boleto Bancario | BOLETO_BANCARIO | Efectivo | No concilia en fines de semana ni festivos |
| ![Logo](/assets/PaymentMethods/diners.png) | Diners | DINERS | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/elo.png) | Elo | ELO | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/hipercard.png) | Hipercard | HIPERCARD | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/itau.png) | TEF Itaú | ITAU | Transferencia Bancaria | Solo disponible para cuentas Itaú. |
| ![Logo](/assets/PaymentMethods/pix.png) | PIX | PIX | Pago Instantaneo | |
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard | MASTERCARD | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA | Tarjetas de Crédito | |

## <img src="/assets/Chile.png" width="25px"/> Chile {#Chile}
<div class="paymentMethods"></div>

|  | Medio de Pago | Parámetro paymentMethod | Tipo | Comentarios |
|:-:|---|---|---|---|
| ![Logo](/assets/PaymentMethods/american.png) | American Express | AMEX | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/diners.png) | Diners | DINERS | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard | MASTERCARD | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard | MASTERCARD_DEBIT | Tarjetas Débito| |
| ![Logo](/assets/PaymentMethods/multicaja.png) | Klap (Antes Multicaja) | MULTICAJA | Efectivo | |
| ![Logo](/assets/PaymentMethods/red-compra.png) | Redcompra | TRANSBANK_DEBIT | Tarjetas Débito y prepago | |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA_DEBIT | Tarjetas Débito| |

## <img src="/assets/Colombia.png" width="25px"/> Colombia {#Colombia}
PayU en Colombia te permite integrar con la mayoría de los métodos de pago en efectivo del país. Además, soportamos Codensa y Falabella.

{{% alert title="" color="warning"%}}
<ul class='fa-ul' style='--fa-li-width: 2em;margin-bottom: initial;'><li style='margin-bottom: initial;'><span class='fa-li'><i class='fas fa-exclamation-triangle'></i></span>Informamos que PayU S.A. ha sido notificado por parte de IGT - operador de la red Baloto - su decisión de terminar el contrato para el recaudo en efectivo debido a la entrada de un nuevo operador, el cual a la fecha no ha entregado información sobre la continuidad de este servicio. Por lo tanto, el servicio de pago a través de Baloto dejará de funcionar a partir del <b>25 de mayo de 2022</b>. Se recomienda deshabilitar este medio de pago al menos siete (7) días antes de esta fecha. Si necesitas asistencia adicional, contacta al equipo de soporte técnico a través de <a href='mailto:tecnico.co@payu.com'>tecnico.co@payu.com</a>.</li></ul>
{{% /alert %}}

<div class="paymentMethods"></div>

|  | Medio de Pago | Parámetro paymentMethod | Tipo | Comentarios |
|:-:|---|---|---|---|
| ![Logo](/assets/PaymentMethods/american.png) | American Express | AMEX | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/viabaloto.png) | Baloto | BALOTO | Efectivo | |
| ![Logo](/assets/PaymentMethods/banco-de-bogota.png) | Banco de Bogotá | BANK_REFERENCED | Referencia Bancaria | |
| ![Logo](/assets/PaymentMethods/bancolombia.png) | Bancolombia | BANK_REFERENCED | Referencia Bancaria | |
| ![Logo](/assets/PaymentMethods/codensa.png) | Codensa | CODENSA | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/davivienda.png) | Davivienda | BANK_REFERENCED | Referencia Bancaria | |
| ![Logo](/assets/PaymentMethods/diners.png) | Diners | DINERS | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/efecty.png) | Efecty | EFECTY | Efectivo | |
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard | MASTERCARD | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard | MASTERCARD_DEBIT | Tarjetas Débito| |
| ![Logo](/assets/PaymentMethods/pse_logo.png) | PSE | PSE | Transferencia Bancaria | PSE le permite a tus clientes pagar utilizando Nequi y Daviplata. |
| ![Logo](/assets/PaymentMethods/su-red.png) | Su Red | OTHERS_CASH | Efectivo | **Oficinas de pago**: PagaTodo, Gana Gana, Gana, Acertemos, Apuestas Cúcuta 75, Su Chance, La Perla, Apuestas Unidas, JER. |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA_DEBIT | Tarjetas Débito| |

## <img src="/assets/Mexico.png" width="25px"/> México {#Mexico}
En México, soportamos tanto Meses sin Intereses y Promociones, consulte este [artículo]({{< ref "Promotions.md" >}}) para más información.

<div class="paymentMethods"></div>

|  | Medio de Pago | Parámetro paymentMethod | Tipo | Comentarios |
|:-:|---|---|---|---|
| ![Logo](/assets/PaymentMethods/american.png) | American Express | AMEX | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/bbva.png) | BBVA Bancomer | BANK_REFERENCED | Referencia Bancaria | |
| ![Logo](/assets/PaymentMethods/farmaciabenavides.png) | Farmacias Benavides | OTHERS_CASH_MX | Efectivo | |
| ![Logo](/assets/PaymentMethods/farmaciasahorro.png) | Farmacias del Ahorro | OTHERS_CASH_MX | Efectivo | |
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard | MASTERCARD | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard | MASTERCARD_DEBIT | Tarjetas Débito| |
| ![Logo](/assets/PaymentMethods/oxxo.png) | Oxxo | OXXO | Efectivo | |
| ![Logo](/assets/PaymentMethods/7eleven.png) | Seven Eleven | SEVEN_ELEVEN | Efectivo | |
| ![Logo](/assets/PaymentMethods/spei.png) | SPEI | SPEI | Transferencia Bancaria | |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA_DEBIT | Tarjetas Débito| |

## <img src="/assets/Panama.png" width="25px"/> Panamá {#Panama}
<div class="paymentMethods"></div>

|  | Medio de Pago | Parámetro paymentMethod | Tipo | Comentarios |
|:-:|---|---|---|---|
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard | MASTERCARD | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA | Tarjetas de Crédito | |

## <img src="/assets/Peru.png" width="25px"/> Perú {#Peru}
<div class="paymentMethods"></div>

|  | Medio de Pago | Parámetro paymentMethod | Tipo | Comentarios |
|:-:|---|---|---|---|
| ![Logo](/assets/PaymentMethods/american.png) | American Express | AMEX | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/diners.png) | Diners | DINERS | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard | MASTERCARD | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard | MASTERCARD_DEBIT | Tarjetas Débito| |
| ![Logo](/assets/PaymentMethods/pago-efectivo.png) | PAGOEFECTIVO | PAGOEFECTIVO | Efectivo | |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA | Tarjetas de Crédito | |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA_DEBIT | Tarjetas Débito| |