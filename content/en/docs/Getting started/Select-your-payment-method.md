---
title: "Select Your Payment Method"
linkTitle: "Select Your Payment Method"
date: 2021-04-07T16:17:14-05:00
Description: >
  In this document, you will find the list of payment methods available in PayU.
weight: 30
---

## Payment Methods by Country

The tables below include the payment methods enabled by country, along with important considerations.

To integrate your solution via API or SDK, review the **`paymentMethod` parameter** column and use the corresponding value as the payment method.

<details id="argentina">

<summary><img src="/assets/Argentina.png" width="25px"/> &nbsp; <b>Argentina</b></summary>

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th></th>
      <th>Payment Method</th>
      <th><code>paymentMethod</code> Parameter</th>
      <th>Type</th>
      <th>Comments</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/american.png" width="80px" alt="American Express"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Credit card</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/argencard.png" width="80px" alt="Argencard"/></td>
      <td>Argencard</td>
      <td><code>ARGENCARD</code></td>
      <td>Credit card</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/cabal.png" width="80px" alt="Cabal"/></td>
      <td>Cabal</td>
      <td><code>CABAL</code></td>
      <td>Credit card</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/cencosud.png" width="80px" alt="Cencosud"/></td>
      <td>Cencosud</td>
      <td><code>CENCOSUD</code></td>
      <td>Credit card</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/cobro-express.png" width="80px" alt="Cobro Express"/></td>
      <td>Cobro Express</td>
      <td><code>COBRO_EXPRESS</code></td>
      <td>Cash</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/diners.png" width="80px" alt="Diners"/></td>
      <td>Diners</td>
      <td><code>DINERS</code></td>
      <td>Credit card</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Credit card</td>
      <td><strong>Supported cards</strong>: CRM Falabella, Nativa, Cordial, Cordobesa, and Nexo.</td>
    </tr>
    <tr>
  <td><img src="/assets/PaymentMethods/naranja.png" width="80px" alt="Naranja"/></td>
  <td>Naranja</td>
  <td><code>NARANJA</code></td>
  <td>Credit card</td>
  <td>
    <details>
      <summary><strong>Special consideration</strong></summary>
      <p><strong>Special consideration:</strong> Naranja X Credit Cards (BIN 589562)</p>
      <p>Naranja X Credit Cards have a specific behavior in their OCR (card number) validation process:</p>
      <ul>
        <li><strong>Until April 17, 2023:</strong> Physical cards were issued using the Luhn 11 algorithm for the check digit.</li>
        <li><strong>Currently:</strong> All new cards are issued using the standard Luhn 10 algorithm.</li>
      </ul>
      <p><strong>Current status:</strong></p>
      <ul>
        <li>More than 80% of active physical cards now use Luhn 10.</li>
        <li>A small percentage still operate with Luhn 11, which will gradually phase out as cards are renewed.</li>
        <li>All Naranja X in-app virtual cards already use Luhn 10.</li>
      </ul>
      <p><strong>Recommendations for integrators:</strong></p>
      <ul>        
        <li>Implement dual validation for BIN 589562, supporting both Luhn 10 and Luhn 11 algorithms.</li>
        <li>Alternatively, skip checksum validation for this specific BIN and validate only the BIN number.</li>
      </ul>
      <p>These options help prevent unnecessary declines for valid transactions still using the Luhn 11 algorithm.</p>
    </details>
  </td>
</tr>
    <tr>
      <td><img src="/assets/PaymentMethods/pago-facil.png" width="80px" alt="PAGOFACIL"/></td>
      <td>PAGOFACIL</td>
      <td><code>PAGOFACIL</code></td>
      <td>Cash</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/rapi-pago.png" width="80px" alt="RAPIPAGO"/></td>
      <td>RAPIPAGO</td>
      <td><code>RAPIPAGO</code></td>
      <td>Cash</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/shopping.png" width="80px" alt="Shopping"/></td>
      <td>Shopping</td>
      <td><code>SHOPPING</code></td>
      <td>Credit card</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA Credit"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Credit card</td>
      <td><strong>Supported cards</strong>: Shopping, Nativa, Credimas, and Nevada.</td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA Debit"/></td>
      <td>VISA</td>
      <td><code>VISA_DEBIT</code></td>
      <td>Debit card</td>
      <td></td>
    </tr>
  </tbody>
</table>

</details>

<details id="brazil">

<summary><img src="/assets/Brasil.png" width="25px"/> &nbsp; <b>Brazil</b></summary>

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th></th>
      <th>Payment Method</th>
      <th><code>paymentMethod</code> Parameter</th>
      <th>Type</th>
      <th>Comments</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/american.png" width="80px" alt="American Express"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Credit card</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/boleto-bancario.png" width="80px" alt="Boleto Bancario"/></td>
      <td>Boleto Bancario</td>
      <td><code>BOLETO_BANCARIO</code></td>
      <td>Cash</td>
      <td>Does not reconcile on weekends or holidays.</td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/elo.png" width="80px" alt="Elo"/></td>
      <td>Elo</td>
      <td><code>ELO</code></td>
      <td>Credit card</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/google_pay.png" width="80px" alt="Google Pay"/></td>
      <td>Google Pay</td>
      <td><code>GOOGLE_PAY</code></td>
      <td>Mobile payment service</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/hipercard.png" width="80px" alt="Hipercard"/></td>
      <td>Hipercard</td>
      <td><code>HIPERCARD</code></td>
      <td>Credit card</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/itau.png" width="80px" alt="TEF Itaú"/></td>
      <td>TEF Itaú</td>
      <td><code>ITAU</code></td>
      <td>Bank transfer</td>
      <td>Available only for Itaú accounts.</td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/pix.png" width="80px" alt="PIX"/></td>
      <td>PIX</td>
      <td><code>PIX</code></td>
      <td>Instant payment</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Credit card</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Credit card</td>
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
      <th>Payment Method</th>
      <th><code>paymentMethod</code> Parameter</th>
      <th>Type</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/american.png" width="80px" alt="American Express"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Credit card</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Credit card</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard Debit"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD_DEBIT</code></td>
      <td>Debit card</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/red-compra.png" width="80px" alt="Redcompra"/></td>
      <td>Redcompra</td>
      <td><code>TRANSBANK_DEBIT</code></td>
      <td>Debit card / prepaid card</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA Credit"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Credit card</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA Debit"/></td>
      <td>VISA</td>
      <td><code>VISA_DEBIT</code></td>
      <td>Debit card</td>      
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
      <th>Payment Method</th>
      <th><code>paymentMethod</code> Parameter</th>
      <th>Type</th>
      <th>Comments</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/american.png" width="80px"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Credit card</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/banco-de-bogota.png" width="80px"/></td>
      <td>Banco de Bogotá</td>
      <td><code>BANK_REFERENCED</code></td>
      <td>Bank reference</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/bancolombia.png" width="80px"/></td>
      <td>Bancolombia</td>
      <td><code>BANK_REFERENCED</code></td>
      <td>Bank reference</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/bancolombiabutton.png" width="80px"/></td>
      <td>Bancolombia Button</td>
      <td><code>BANCOLOMBIA_BUTTON</code></td>
      <td>Bank transfer</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/codensa.png" width="80px"/></td>
      <td>Codensa</td>
      <td><code>CODENSA</code></td>
      <td>Credit card</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/davivienda.png" width="80px"/></td>
      <td>Davivienda</td>
      <td><code>BANK_REFERENCED</code></td>
      <td>Bank reference</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/diners.png" width="80px"/></td>
      <td>Diners</td>
      <td><code>DINERS</code></td>
      <td>Credit card</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/efecty.png" width="80px"/></td>
      <td>Efecty</td>
      <td><code>EFECTY</code></td>
      <td>Cash</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/google_pay.png" width="80px"/></td>
      <td>Google Pay</td>
      <td><code>GOOGLE_PAY</code></td>
      <td>Mobile payment service</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Credit card</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Debit card</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/nequi.png" width="80px"/></td>
      <td>Nequi</td>
      <td><code>NEQUI</code></td>
      <td>Mobile payment service</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/pse_logo.png" width="80px"/></td>
      <td>PSE</td>
      <td><code>PSE</code></td>
      <td>Bank transfer</td>
      <td>PSE allows your customers to pay using Nequi and Daviplata.</td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/bre-b.png" width="80px"/></td>
      <td>QR Bre-B</td>
      <td><code>REDEBAN_INTEROPERABLE</code><br><code>_QR</code></td>
      <td>Bank transfer</td>
      <td></td>
    </tr>    
    <tr>
      <td><img src="/assets/PaymentMethods/su-red.png" width="80px"/></td>
      <td>Su Red</td>
      <td><code>OTHERS_CASH</code></td>
      <td>Cash</td>
      <td><b>Payment locations</b>: PagaTodo, Gana Gana, Gana, Acertemos, Apuestas Cúcuta 75, Su Chance, La Perla, Apuestas Unidas, JER.</td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Credit card</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px"/></td>
      <td>VISA</td>
      <td><code>VISA_DEBIT</code></td>
      <td>Debit card</td>
      <td></td>
    </tr>
  </tbody>
</table>

</details>

<details id="mexico">

<summary><img src="/assets/Mexico.png" width="25px"/> &nbsp; <b>Mexico</b></summary>

<div class="paymentMethods"></div>

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th></th>
      <th>Payment Method</th>
      <th><code>paymentMethod</code> Parameter</th>
      <th>Type</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/american.png" width="80px" alt="American Express"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Credit card</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/bbva.png" width="80px" alt="BBVA Bancomer"/></td>
      <td>BBVA Bancomer</td>
      <td><code>BANK_REFERENCED</code></td>
      <td>Bank reference</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/farmaciabenavides.png" width="80px" alt="Farmacias Benavides"/></td>
      <td>Farmacias Benavides</td>
      <td><code>OTHERS_CASH_MX</code></td>
      <td>Cash</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/farmaciasahorro.png" width="80px" alt="Farmacias del Ahorro"/></td>
      <td>Farmacias del Ahorro</td>
      <td><code>OTHERS_CASH_MX</code></td>
      <td>Cash</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Credit card / Debit card</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/oxxo.png" width="80px" alt="Oxxo"/></td>
      <td>Oxxo</td>
      <td><code>OXXO</code></td>
      <td>Cash</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/7eleven.png" width="80px" alt="Seven Eleven"/></td>
      <td>Seven Eleven</td>
      <td><code>SEVEN_ELEVEN</code></td>
      <td>Cash</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/spei.png" width="80px" alt="SPEI"/></td>
      <td>SPEI</td>
      <td><code>SPEI</code></td>
      <td>Bank transfer</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Credit card / Debit card</td>      
    </tr>
  </tbody>
</table>

</details>

<details id="panama">

<summary><img src="/assets/Panama.png" width="25px"/> &nbsp; <b>Panama</b></summary>

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th></th>
      <th>Payment Method</th>
      <th><code>paymentMethod</code> Parameter</th>
      <th>Type</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Credit card</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Credit card</td>      
    </tr>
  </tbody>
</table>

</details>

<details id="peru">

<summary><img src="/assets/Peru.png" width="25px"/> &nbsp; <b>Peru</b></summary>

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th></th>
      <th>Payment Method</th>
      <th><code>paymentMethod</code> Parameter</th>
      <th>Type</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/american.png" width="80px" alt="American Express"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Credit card</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/diners.png" width="80px" alt="Diners"/></td>
      <td>Diners</td>
      <td><code>DINERS</code></td>
      <td>Credit card</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Credit card</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard Debit"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD_DEBIT</code></td>
      <td>Debit card</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/pago-efectivo.png" width="80px" alt="PAGOEFECTIVO"/></td>
      <td>PAGOEFECTIVO</td>
      <td><code>PAGOEFECTIVO</code></td>
      <td>Cash</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Credit card</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA Debit"/></td>
      <td>VISA</td>
      <td><code>VISA_DEBIT</code></td>
      <td>Debit card</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/yape.png" width="80px" alt="Yape"/></td>
      <td>Yape</td>
      <td><code>YAPE</code></td>
      <td>Mobile payment service</td>      
    </tr>
  </tbody>
</table>

</details>
