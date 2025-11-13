---
title: "Selecione Seu Meio de Pagamento"
linkTitle: "Selecione Seu Meio de Pagamento"
date: 2021-04-07T16:17:14-05:00
Description: >
  Neste documento, você encontrará a lista de meios de pagamento disponíveis no PayU.
weight: 30
---

## Meios de Pagamento por País

As tabelas abaixo incluem os meios de pagamento habilitados por país, junto com observações importantes.

Para integrar sua solução por meio de API ou SDK, consulte a coluna **parâmetro `paymentMethod`** e use o valor correspondente como meio de pagamento.

<details id="argentina">

<summary><img src="/assets/Argentina.png" width="25px"/> &nbsp; <b>Argentina</b></summary>

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th></th>
      <th>Meio de pagamento</th>
      <th>Parâmetro <code>paymentMethod</code></th>
      <th>Tipo</th>
      <th>Observações</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/amex.png" width="80px" alt="American Express"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Cartão de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/argencard.png" width="80px" alt="Argencard"/></td>
      <td>Argencard</td>
      <td><code>ARGENCARD</code></td>
      <td>Cartão de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/cabal.png" width="80px" alt="Cabal"/></td>
      <td>Cabal</td>
      <td><code>CABAL</code></td>
      <td>Cartão de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/cencosud.png" width="80px" alt="Cencosud"/></td>
      <td>Cencosud</td>
      <td><code>CENCOSUD</code></td>
      <td>Cartão de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/cobro-express.png" width="80px" alt="Cobro Express"/></td>
      <td>Cobro Express</td>
      <td><code>COBRO_EXPRESS</code></td>
      <td>Dinheiro</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/diners.png" width="80px" alt="Diners"/></td>
      <td>Diners</td>
      <td><code>DINERS</code></td>
      <td>Cartão de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Cartão de crédito</td>
      <td><strong>Cartões aceitos</strong>: CRM Falabella, Nativa, Cordial, Cordobesa e Nexo.</td>
    </tr>
<tr>
  <td><img src="/assets/PaymentMethods/naranja.png" width="80px" alt="Naranja"/></td>
  <td>Naranja</td>
  <td><code>NARANJA</code></td>
  <td>Cartão de crédito</td>
  <td>
    <details>
      <summary><strong>Consideração especial</strong></summary>
      <p><strong>Consideração especial:</strong> Cartões de crédito Naranja X (BIN 589562)</p>
      <p>Os cartões de crédito Naranja X apresentam um comportamento específico no processo de validação do número do cartão (OCR):</p>
      <ul>
        <li><strong>Até 17 de abril de 2023:</strong> Os cartões físicos eram emitidos utilizando o algoritmo Luhn 11 para o dígito verificador.</li>
        <li><strong>Atualmente:</strong> Todos os novos cartões são emitidos utilizando o algoritmo padrão Luhn 10.</li>
      </ul>
      <p><strong>Status atual:</strong></p>
      <ul>
        <li>Mais de 80% dos cartões físicos ativos já utilizam Luhn 10.</li>
        <li>Uma pequena porcentagem ainda opera com Luhn 11, que será gradualmente descontinuado à medida que os cartões forem renovados.</li>
        <li>Todos os cartões virtuais Naranja X no aplicativo já utilizam Luhn 10.</li>
      </ul>
      <p><strong>Recomendações para os integradores:</strong></p>
      <ul>        
        <li>Implementar validação dupla para o BIN 589562, aceitando os algoritmos Luhn 10 e Luhn 11.</li>
        <li>Como alternativa, ignorar a validação do dígito verificador para esse BIN específico e validar apenas o número do BIN.</li>
      </ul>
      <p>Essas opções ajudam a evitar recusas desnecessárias em transações válidas que ainda utilizam o algoritmo Luhn 11.</p>
    </details>
  </td>
</tr>
    <tr>
      <td><img src="/assets/PaymentMethods/pago-facil.png" width="80px" alt="PAGOFACIL"/></td>
      <td>PAGOFACIL</td>
      <td><code>PAGOFACIL</code></td>
      <td>Dinheiro</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/rapi-pago.png" width="80px" alt="RAPIPAGO"/></td>
      <td>RAPIPAGO</td>
      <td><code>RAPIPAGO</code></td>
      <td>Dinheiro</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/shopping.png" width="80px" alt="Shopping"/></td>
      <td>Shopping</td>
      <td><code>SHOPPING</code></td>
      <td>Cartão de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA Crédito"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Cartão de crédito</td>
      <td><strong>Cartões aceitos</strong>: Shopping, Nativa, Credimas e Nevada.</td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA Débito"/></td>
      <td>VISA</td>
      <td><code>VISA_DEBIT</code></td>
      <td>Cartão de débito</td>
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
      <th>Meio de pagamento</th>
      <th>Parâmetro <code>paymentMethod</code></th>
      <th>Tipo</th>
      <th>Observações</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/amex.png" width="80px" alt="American Express"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Cartão de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/boleto-bancario.png" width="80px" alt="Boleto Bancário"/></td>
      <td>Boleto Bancário</td>
      <td><code>BOLETO_BANCARIO</code></td>
      <td>Dinheiro</td>
      <td>Não compensa em finais de semana ou feriados.</td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/elo.png" width="80px" alt="Elo"/></td>
      <td>Elo</td>
      <td><code>ELO</code></td>
      <td>Cartão de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/google_pay.png" width="80px" alt="Google Pay"/></td>
      <td>Google Pay</td>
      <td><code>GOOGLE_PAY</code></td>
      <td>Serviço de pagamento móvel</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/hipercard.png" width="80px" alt="Hipercard"/></td>
      <td>Hipercard</td>
      <td><code>HIPERCARD</code></td>
      <td>Cartão de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/itau.png" width="80px" alt="TEF Itaú"/></td>
      <td>TEF Itaú</td>
      <td><code>ITAU</code></td>
      <td>Transferência bancária</td>
      <td>Disponível apenas para contas Itaú.</td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/pix.png" width="80px" alt="PIX"/></td>
      <td>PIX</td>
      <td><code>PIX</code></td>
      <td>Pagamento instantâneo</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Cartão de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Cartão de crédito</td>
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
      <th>Método de pagamento</th>
      <th>Parâmetro <code>paymentMethod</code></th>
      <th>Tipo</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/amex.png" width="80px" alt="American Express"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Cartão de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/khipu.png" width="80px" alt="Khipu"/></td>
      <td>Khipu</td>
      <td><code>KHIPU</code></td>
      <td>Transferência bancária</td>      
    </tr>      
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Cartão de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard Débito"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD_DEBIT</code></td>
      <td>Cartão de débito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/red-compra.png" width="80px" alt="Redcompra"/></td>
      <td>Redcompra</td>
      <td><code>TRANSBANK_DEBIT</code></td>
      <td>Cartão de débito / cartão pré-pago</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA Crédito"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Cartão de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA Débito"/></td>
      <td>VISA</td>
      <td><code>VISA_DEBIT</code></td>
      <td>Cartão de débito</td>      
    </tr>
  </tbody>
</table>

</details>

<details id="colombia">

<summary><img src="/assets/Colombia.png" width="25px"/> &nbsp; <b>Colômbia</b></summary>

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th></th>
      <th>Método de pagamento</th>
      <th>Parâmetro <code>paymentMethod</code></th>
      <th>Tipo</th>
      <th>Observações</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/amex.png" width="80px"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Cartão de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/banco-de-bogota.png" width="80px"/></td>
      <td>Banco de Bogotá</td>
      <td><code>BANK_REFERENCED</code></td>
      <td>Referência bancária</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/bancolombia.png" width="80px"/></td>
      <td>Bancolombia</td>
      <td><code>BANK_REFERENCED</code></td>
      <td>Referência bancária</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/bancolombiabutton.png" width="80px"/></td>
      <td>Botão Bancolombia</td>
      <td><code>BANCOLOMBIA_BUTTON</code></td>
      <td>Transferência bancária</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/codensa.png" width="80px"/></td>
      <td>Codensa</td>
      <td><code>CODENSA</code></td>
      <td>Cartão de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/davivienda.png" width="80px"/></td>
      <td>Davivienda</td>
      <td><code>BANK_REFERENCED</code></td>
      <td>Referência bancária</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/diners.png" width="80px"/></td>
      <td>Diners</td>
      <td><code>DINERS</code></td>
      <td>Cartão de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/efecty.png" width="80px"/></td>
      <td>Efecty</td>
      <td><code>EFECTY</code></td>
      <td>Dinheiro</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/google_pay.png" width="80px"/></td>
      <td>Google Pay</td>
      <td><code>GOOGLE_PAY</code></td>
      <td>Serviço de pagamento móvel</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Cartão de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Cartão de débito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/nequi.png" width="80px"/></td>
      <td>Nequi</td>
      <td><code>NEQUI</code></td>
      <td>Serviço de pagamento móvel</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/pse_logo.png" width="80px"/></td>
      <td>PSE</td>
      <td><code>PSE</code></td>
      <td>Transferência bancária</td>
      <td>O PSE permite que seus clientes paguem usando Nequi e Daviplata.</td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/bre-b.png" width="80px"/></td>
      <td>QR Bre-B</td>
      <td><code>REDEBAN_INTEROPERABLE</code><br><code>_QR</code></td>
      <td>Transferência bancária</td>
      <td></td>
    </tr>    
    <tr>
      <td><img src="/assets/PaymentMethods/su-red.png" width="80px"/></td>
      <td>Su Red</td>
      <td><code>OTHERS_CASH</code></td>
      <td>Dinheiro</td>
      <td><b>Pontos de pagamento</b>: PagaTodo, Gana Gana, Gana, Acertemos, Apuestas Cúcuta 75, Su Chance, La Perla, Apuestas Unidas, JER.</td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Cartão de crédito</td>
      <td></td>
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px"/></td>
      <td>VISA</td>
      <td><code>VISA_DEBIT</code></td>
      <td>Cartão de débito</td>
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
      <th>Método de pagamento</th>
      <th>Parâmetro <code>paymentMethod</code></th>
      <th>Tipo</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/amex.png" width="80px" alt="American Express"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Cartão de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/bbva.png" width="80px" alt="BBVA Bancomer"/></td>
      <td>BBVA Bancomer</td>
      <td><code>BANK_REFERENCED</code></td>
      <td>Referência bancária</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/farmaciabenavides.png" width="80px" alt="Farmacias Benavides"/></td>
      <td>Farmacias Benavides</td>
      <td><code>OTHERS_CASH_MX</code></td>
      <td>Dinheiro</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/farmaciasahorro.png" width="80px" alt="Farmacias del Ahorro"/></td>
      <td>Farmacias del Ahorro</td>
      <td><code>OTHERS_CASH_MX</code></td>
      <td>Dinheiro</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/google_pay.png" width="80px" alt="Google Pay"/></td>
      <td>Google Pay</td>
      <td><code>GOOGLE_PAY</code></td>
      <td>Serviço de pagamento móvel</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Cartão de crédito / Cartão de débito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/oxxo.png" width="80px" alt="Oxxo"/></td>
      <td>Oxxo</td>
      <td><code>OXXO</code></td>
      <td>Dinheiro</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/7eleven.png" width="80px" alt="Seven Eleven"/></td>
      <td>Seven Eleven</td>
      <td><code>SEVEN_ELEVEN</code></td>
      <td>Dinheiro</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/spei.png" width="80px" alt="SPEI"/></td>
      <td>SPEI</td>
      <td><code>SPEI</code></td>
      <td>Transferência bancária</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Cartão de crédito / Cartão de débito</td>      
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
      <th>Método de pagamento</th>
      <th>Parâmetro <code>paymentMethod</code></th>
      <th>Tipo</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Cartão de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Cartão de crédito</td>      
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
      <th>Método de pagamento</th>
      <th>Parâmetro <code>paymentMethod</code></th>
      <th>Tipo</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/PaymentMethods/amex.png" width="80px" alt="American Express"/></td>
      <td>American Express</td>
      <td><code>AMEX</code></td>
      <td>Cartão de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/diners.png" width="80px" alt="Diners"/></td>
      <td>Diners</td>
      <td><code>DINERS</code></td>
      <td>Cartão de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD</code></td>
      <td>Cartão de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/master.png" width="80px" alt="Mastercard Debit"/></td>
      <td>Mastercard</td>
      <td><code>MASTERCARD_DEBIT</code></td>
      <td>Cartão de débito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/pago-efectivo.png" width="80px" alt="PAGOEFECTIVO"/></td>
      <td>PAGOEFECTIVO</td>
      <td><code>PAGOEFECTIVO</code></td>
      <td>Dinheiro</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA"/></td>
      <td>VISA</td>
      <td><code>VISA</code></td>
      <td>Cartão de crédito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/visa.png" width="80px" alt="VISA Debit"/></td>
      <td>VISA</td>
      <td><code>VISA_DEBIT</code></td>
      <td>Cartão de débito</td>      
    </tr>
    <tr>
      <td><img src="/assets/PaymentMethods/yape.png" width="80px" alt="Yape"/></td>
      <td>Yape</td>
      <td><code>YAPE</code></td>
      <td>Serviço de pagamento móvel</td>      
    </tr>
  </tbody>
</table>

</details>
