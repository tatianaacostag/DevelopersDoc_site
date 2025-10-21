---
title: "Selecciona Tu Medio de Pago"
linkTitle: "Selecciona Tu Medio de Pago"
date: 2021-04-07T16:17:14-05:00
Description: >
 En este documento encontrarás la lista de métodos de pago disponibles en PayU.
weight: 30
---

## Métodos de pago por país

Las tablas a continuación incluyen los métodos de pago habilitados por país, junto con consideraciones importantes.

Para integrar tu solución mediante API o SDK, revisa la columna **Parámetro `paymentMethod`** y usa el valor correspondiente como medio de pago.

<details id="argentina">

<summary><img src="/assets/Argentina.png" width="25px"/> &nbsp; <b>Argentina</b></summary>

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th></th>
      <th>Medio de pago</th>
      <th>Parámetro <code>paymentMethod</code></th>
      <th>Tipo</th>
      <th>Comentarios</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/american.png" width="80px" alt="American Express"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Tarjeta de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/argencard.png" width="80px" alt="Argencard"/></td>
      <td>Argencard</td>
      <td><code>ARGENCARD</code></td>
      <td>Tarjeta de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/cabal.png" width="80px" alt="Cabal"/></td>
      <td>Cabal</td>
      <td><code>CABAL</code></td>
      <td>Tarjeta de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/cencosud.png" width="80px" alt="Cencosud"/></td>
      <td>Cencosud</td>
      <td><code>CENCOSUD</code></td>
      <td>Tarjeta de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/cobro-express.png" width="80px" alt="Cobro Express"/></td>
      <td>Cobro Express</td>
      <td><code>COBRO_EXPRESS</code></td>
      <td>Efectivo</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/diners.png" width="80px" alt="Diners"/></td>
      <td>Diners</td>
      <td><code>DINERS</code></td>
      <td>Tarjeta de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Tarjeta de crédito</td>
      <td><strong>Tarjetas soportadas</strong>: CRM Falabella, Nativa, Cordial, Cordobesa y Nexo.</td>
    </tr>
    <tr>
  <td><img src="/assets/PaymentMethods/naranja.png" width="80px" alt="Naranja"/></td>
  <td>Naranja</td>
  <td><code>NARANJA</code></td>
  <td>Tarjeta de crédito</td>
  <td>
    <details>
      <summary><strong>Consideración especial</strong></summary>
      <p><strong>Consideración especial:</strong> Tarjetas de crédito Naranja X (BIN 589562)</p>
      <p>Las tarjetas de crédito Naranja X tienen un comportamiento específico en su proceso de validación del número de tarjeta (OCR):</p>
      <ul>
        <li><strong>Hasta el 17 de abril de 2023:</strong> Las tarjetas físicas se emitían utilizando el algoritmo Luhn 11 para el dígito verificador.</li>
        <li><strong>Actualmente:</strong> Todas las nuevas tarjetas se emiten utilizando el algoritmo estándar Luhn 10.</li>
      </ul>
      <p><strong>Estado actual:</strong></p>
      <ul>
        <li>Más del 80% de las tarjetas físicas activas ya utilizan Luhn 10.</li>
        <li>Un pequeño porcentaje aún opera con Luhn 11, el cual se eliminará gradualmente a medida que se renueven las tarjetas.</li>
        <li>Todas las tarjetas virtuales Naranja X dentro de la aplicación ya utilizan Luhn 10.</li>
      </ul>
      <p><strong>Recomendaciones para los integradores:</strong></p>
      <ul>        
        <li>Implementar una validación dual para el BIN 589562, admitiendo tanto los algoritmos Luhn 10 como Luhn 11.</li>
        <li>Como alternativa, omitir la validación del dígito verificador para este BIN específico y validar únicamente el número BIN.</li>
      </ul>
      <p>Estas opciones ayudan a evitar rechazos innecesarios para transacciones válidas que aún utilizan el algoritmo Luhn 11.</p>
    </details>
  </td>
</tr>
    <tr>
      <td><img src="/assets/PaymentMethods/pago-facil.png" width="80px" alt="PAGOFACIL"/></td>
      <td>PAGOFACIL</td>
      <td><code>PAGOFACIL</code></td>
      <td>Efectivo</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/rapi-pago.png" width="80px" alt="RAPIPAGO"/></td>
      <td>RAPIPAGO</td>
      <td><code>RAPIPAGO</code></td>
      <td>Efectivo</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/shopping.png" width="80px" alt="Shopping"/></td>
      <td>Shopping</td>
      <td><code>SHOPPING</code></td>
      <td>Tarjeta de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA Crédito"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Tarjeta de crédito</td>
      <td><strong>Tarjetas soportadas</strong>: Shopping, Nativa, Credimas y Nevada.</td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA Débito"/></td>
      <td>VISA</td>
      <td><code>VISA_DEBIT</code></td>
      <td>Tarjeta de débito</td>
      <td></td>
    </tr>
  </tbody>
</table>

</details>

<details id="brazil">

<summary><img src="/assets/Brasil.png" width="25px"/> &nbsp; <b>Brasil</b></summary>

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th></th>
      <th>Medio de pago</th>
      <th>Parámetro <code>paymentMethod</code></th>
      <th>Tipo</th>
      <th>Comentarios</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/american.png" width="80px" alt="American Express"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Tarjeta de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/boleto-bancario.png" width="80px" alt="Boleto Bancario"/></td>
      <td>Boleto Bancario</td>
      <td><code>BOLETO_BANCARIO</code></td>
      <td>Efectivo</td>
      <td>No concilia en fines de semana ni festivos</td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/elo.png" width="80px" alt="Elo"/></td>
      <td>Elo</td>
      <td><code>ELO</code></td>
      <td>Tarjeta de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/google_pay.png" width="80px" alt="Google Pay"/></td>
      <td>Google Pay</td>
      <td><code>GOOGLE_PAY</code></td>
      <td>Servicio móvil de pagos</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/hipercard.png" width="80px" alt="Hipercard"/></td>
      <td>Hipercard</td>
      <td><code>HIPERCARD</code></td>
      <td>Tarjeta de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/itau.png" width="80px" alt="TEF Itaú"/></td>
      <td>TEF Itaú</td>
      <td><code>ITAU</code></td>
      <td>Transferencia bancaria</td>
      <td>Solo disponible para cuentas Itaú.</td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/pix.png" width="80px" alt="PIX"/></td>
      <td>PIX</td>
      <td><code>PIX</code></td>
      <td>Pago instantáneo</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Tarjeta de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Tarjeta de crédito</td>
      <td></td>
    </tr>
  </tbody>
</table>

</details>

<details id="chile">

<summary><img src="/assets/Chile.png" width="25px"/> &nbsp; <b>Chile</b></summary>

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th></th>
      <th>Medio de pago</th>
      <th>Parámetro <code>paymentMethod</code></th>
      <th>Tipo</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/american.png" width="80px" alt="American Express"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Tarjeta de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Tarjeta de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard Débito"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD_DEBIT</code></td>
      <td>Tarjeta de débito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/red-compra.png" width="80px" alt="Redcompra"/></td>
      <td>Redcompra</td>
      <td><code>TRANSBANK_DEBIT</code></td>
      <td>Tarjeta de débito / tarjeta prepagada</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA Crédito"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Tarjeta de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA Débito"/></td>
      <td>VISA</td>
      <td><code>VISA_DEBIT</code></td>
      <td>Tarjeta de débito</td>      
    </tr>
  </tbody>
</table>

</details>

<details id="colombia">

<summary><img src="/assets/Colombia.png" width="25px"/> &nbsp; <b>Colombia</b></summary>

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th></th>
      <th>Medio de pago</th>
      <th>Parámetro <code>paymentMethod</code></th>
      <th>Tipo</th>
      <th>Comentarios</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/american.png" width="80px"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Tarjeta de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/banco-de-bogota.png" width="80px"/></td>
      <td>Banco de Bogotá</td>
      <td><code>BANK_REFERENCED</code></td>
      <td>Referencia bancaria</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/bancolombia.png" width="80px"/></td>
      <td>Bancolombia</td>
      <td><code>BANK_REFERENCED</code></td>
      <td>Referencia bancaria</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/bancolombiabutton.png" width="80px"/></td>
      <td>Botón Bancolombia</td>
      <td><code>BANCOLOMBIA_BUTTON</code></td>
      <td>Transferencia bancaria</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/codensa.png" width="80px"/></td>
      <td>Codensa</td>
      <td><code>CODENSA</code></td>
      <td>Tarjeta de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/davivienda.png" width="80px"/></td>
      <td>Davivienda</td>
      <td><code>BANK_REFERENCED</code></td>
      <td>Referencia bancaria</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/diners.png" width="80px"/></td>
      <td>Diners</td>
      <td><code>DINERS</code></td>
      <td>Tarjeta de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/efecty.png" width="80px"/></td>
      <td>Efecty</td>
      <td><code>EFECTY</code></td>
      <td>Efectivo</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/google_pay.png" width="80px"/></td>
      <td>Google Pay</td>
      <td><code>GOOGLE_PAY</code></td>
      <td>Servicio móvil de pagos</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Tarjeta de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Tarjeta de débito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/nequi.png" width="80px"/></td>
      <td>Nequi</td>
      <td><code>NEQUI</code></td>
      <td>Servicio móvil de pagos</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/pse_logo.png" width="80px"/></td>
      <td>PSE</td>
      <td><code>PSE</code></td>
      <td>Transferencia bancaria</td>
      <td>PSE le permite a tus clientes pagar utilizando Nequi y Daviplata.</td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/bre-b.png" width="80px"/></td>
      <td>QR Bre-B</td>
      <td><code>REDEBAN_INTEROPERABLE</code><br><code>_QR</code></td>
      <td>Transferencia bancaria</td>
      <td></td>
    </tr>    
    <tr>
      <td><img src="/assets/PaymentMethods/su-red.png" width="80px"/></td>
      <td>Su Red</td>
      <td><code>OTHERS_CASH</code></td>
      <td>Efectivo</td>
      <td><b>Oficinas de pago</b>: PagaTodo, Gana Gana, Gana, Acertemos, Apuestas Cúcuta 75, Su Chance, La Perla, Apuestas Unidas, JER.</td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Tarjeta de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px"/></td>
      <td>VISA</td>
      <td><code>VISA_DEBIT</code></td>
      <td>Tarjeta de débito</td>
      <td></td>
    </tr>
  </tbody>
</table>

</details>

<details id="mexico">

<summary><img src="/assets/Mexico.png" width="25px"/> &nbsp; <b>México</b></summary>

<div class="paymentMethods"></div>

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th></th>
      <th>Medio de pago</th>
      <th>Parámetro <code>paymentMethod</code></th>
      <th>Tipo</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/american.png" width="80px" alt="American Express"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Tarjeta de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/bbva.png" width="80px" alt="BBVA Bancomer"/></td>
      <td>BBVA Bancomer</td>
      <td><code>BANK_REFERENCED</code></td>
      <td>Referencia bancaria</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/farmaciabenavides.png" width="80px" alt="Farmacias Benavides"/></td>
      <td>Farmacias Benavides</td>
      <td><code>OTHERS_CASH_MX</code></td>
      <td>Efectivo</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/farmaciasahorro.png" width="80px" alt="Farmacias del Ahorro"/></td>
      <td>Farmacias del Ahorro</td>
      <td><code>OTHERS_CASH_MX</code></td>
      <td>Efectivo</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/google_pay.png" width="80px" alt="Google Pay"/></td>
      <td>Google Pay</td>
      <td><code>GOOGLE_PAY</code></td>
      <td>Servicio móvil de pagos</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Tarjeta de crédito / Tarjeta de débito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/oxxo.png" width="80px" alt="Oxxo"/></td>
      <td>Oxxo</td>
      <td><code>OXXO</code></td>
      <td>Efectivo</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/7eleven.png" width="80px" alt="Seven Eleven"/></td>
      <td>Seven Eleven</td>
      <td><code>SEVEN_ELEVEN</code></td>
      <td>Efectivo</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/spei.png" width="80px" alt="SPEI"/></td>
      <td>SPEI</td>
      <td><code>SPEI</code></td>
      <td>Transferencia bancaria</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Tarjeta de crédito / Tarjeta de débito</td>      
    </tr>
  </tbody>
</table>

</details>

<details id="panama">

<summary><img src="/assets/Panama.png" width="25px"/> &nbsp; <b>Panamá</b></summary>

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th></th>
      <th>Medio de pago</th>
      <th>Parámetro <code>paymentMethod</code></th>
      <th>Tipo</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Tarjeta de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Tarjeta de crédito</td>      
    </tr>
  </tbody>
</table>

</details>

<details id="peru">

<summary><img src="/assets/Peru.png" width="25px"/> &nbsp; <b>Perú</b></summary>

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th></th>
      <th>Medio de pago</th>
      <th>Parámetro <code>paymentMethod</code></th>
      <th>Tipo</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/american.png" width="80px" alt="American Express"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Tarjeta de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/diners.png" width="80px" alt="Diners"/></td>
      <td>Diners</td>
      <td><code>DINERS</code></td>
      <td>Tarjeta de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Tarjeta de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard Débito"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD_DEBIT</code></td>
      <td>Tarjeta de débito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/pago-efectivo.png" width="80px" alt="PAGOEFECTIVO"/></td>
      <td>PAGOEFECTIVO</td>
      <td><code>PAGOEFECTIVO</code></td>
      <td>Efectivo</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Tarjeta de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA Débito"/></td>
      <td>VISA</td>
      <td><code>VISA_DEBIT</code></td>
      <td>Tarjeta de débito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/yape.png" width="80px" alt="Yape"/></td>
      <td>Yape</td>
      <td><code>YAPE</code></td>
      <td>Servicio móvil de pagos</td>      
    </tr>
  </tbody>
</table>

</details>

## Banners de los medios de pago en Colombia para la página web de tu comercio {#Banners-de-los-medios-de-pago-para-la-página-web-de-tu-comercio}

A continuación se encuentran los banners con todos los medios de pago disponibles en PayU Colombia para que los cuelgues en tu página web y se los ofrezcas a tus clientes. 

### Banners de color blanco con verde oscuro {#Banners-de-color-blanco-con-verde-oscuro}

**120 X 600 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/BlancoVerde/Medios_Pago_Blanco_Verde_120x60.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="120" height="600"/>

Código:
```Blanco con verde oscuro 120 x 600 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/BlancoVerde/Medios_Pago_Blanco_Verde_120x60.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="120" height="600"/>
```
<br>

**120 X 240 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/BlancoVerde/Medios_Pago_Blanco_Verde_120x240.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="120" height="240"/>

Código:
```Blanco con verde oscuro 120 x 240 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/BlancoVerde/Medios_Pago_Blanco_Verde_120x240.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="120" height="240"/>
```
<br>

**785 X 40 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/BlancoVerde/Medios_Pago_Blanco_Verde_785x40.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="785" height="40"/>

Código:
```Blanco con verde oscuro 785 x 40 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/BlancoVerde/Medios_Pago_Blanco_Verde_785x40.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="785" height="40"/>
```
<br>

**575 X 40 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/BlancoVerde/Medios_Pago_Blanco_Verde_575x40.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="575" height="40"/>

Código:
```Blanco con verde oscuro 575 x 40 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/BlancoVerde/Medios_Pago_Blanco_Verde_575x40.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="575" height="40"/>
```
<br>

**468 X 60 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/BlancoVerde/Medios_Pago_Blanco_Verde_468x60.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="468" height="60"/>

Código:
```Blanco con verde oscuro 468 x 60 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/BlancoVerde/Medios_Pago_Blanco_Verde_468x60.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="468" height="60"/>
```
<br>

**125 X 125 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/BlancoVerde/Medios_Pago_Blanco_Verde_125x125.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="125" height="125"/>

Código:
```Blanco con verde oscuro 125 x 125 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/BlancoVerde/Medios_Pago_Blanco_Verde_125x125.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="125" height="125"/>
```
<br>

### Banners de color verde claro {#Banners-de-color-verde-claro}

**120 X 600 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeClaro/Medios_Pago_Verde_Claro_120x60.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="120" height="600"/>

Código:
```Verde claro 120 x 600 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeClaro/Medios_Pago_Verde_Claro_120x60.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="120" height="600"/>
```
<br>

**120 X 240 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeClaro/Medios_Pago_Verde_Claro_120x240.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="120" height="240"/>

Código:
```Verde claro 120 x 240 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeClaro/Medios_Pago_Verde_Claro_120x240.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="120" height="240"/>
```
<br>

**785 X 40 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeClaro/Medios_Pago_Verde_Claro_785x40.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="785" height="40"/>

Código:
```Verde claro 785 x 40 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeClaro/Medios_Pago_Verde_Claro_785x40.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="785" height="40"/>
```
<br>

**575 X 40 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeClaro/Medios_Pago_Verde_Claro_575x40.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="575" height="40"/>

Código:
```Verde claro 575 x 40 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeClaro/Medios_Pago_Verde_Claro_575x40.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="575" height="40"/>
```
<br>

**468 X 60 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeClaro/Medios_Pago_Verde_Claro_468x60.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="468" height="60"/>

Código:
```Verde claro 468 x 60 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeClaro/Medios_Pago_Verde_Claro_468x60.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="468" height="60"/>
```
<br>

**125 X 125 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeClaro/Medios_Pago_Verde_Claro_125x125.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="125" height="125"/>

Código:
```Verde claro 125 x 125 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeClaro/Medios_Pago_Verde_Claro_125x125.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="125" height="125"/>
```
<br>

### Banners de color verde oscuro {#Banners-de-color-verde-oscuro}

**120 X 600 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeOscuro/Medios_Pago_Verde_Oscuro_120x60.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="120" height="600"/>

Código:
```Verde oscuro 120 x 600 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeOscuro/Medios_Pago_Verde_Oscuro_120x60.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="120" height="600"/>
```
<br>

**120 X 240 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeOscuro/Medios_Pago_Verde_Oscuro_120x240.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="120" height="240"/>

Código:
```Verde oscuro 120 x 240 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeOscuro/Medios_Pago_Verde_Oscuro_120x240.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="120" height="240"/>
```
<br>

**785 X 40 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeOscuro/Medios_Pago_Verde_Oscuro_785x40.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="785" height="40"/>

Código:
```Verde oscuro 785 x 40 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeOscuro/Medios_Pago_Verde_Oscuro_785x40.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="785" height="40"/>
```
<br>

**575 X 40 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeOscuro/Medios_Pago_Verde_Oscuro_575x40.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="575" height="40"/>

Código:
```Verde oscuro 575 x 40 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeOscuro/Medios_Pago_Verde_Oscuro_575x40.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="575" height="40"/>
```
<br>

**468 X 60 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeOscuro/Medios_Pago_Verde_Oscuro_468x60.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="468" height="60"/>

Código:
```Verde oscuro 468 x 60 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeOscuro/Medios_Pago_Verde_Oscuro_468x60.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="468" height="60"/>
```
<br>

**125 X 125 px**

Vista previa:

<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeOscuro/Medios_Pago_Verde_Oscuro_125x125.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="125" height="125"/>

Código:
```Verde oscuro 125 x 125 px
<img src="https://prod-developers.s3.amazonaws.com/latam/images/VerdeOscuro/Medios_Pago_Verde_Oscuro_125x125.jpg" 
title="PayU - Medios de pago" alt="PayU - Medios de pago" 
width="125" height="125"/>
```
<br>
