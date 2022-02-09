---
title: "Selecione seu método de pagamento"
linkTitle: "Selecione seu método de pagamento"
date: 2021-04-07T16:17:14-05:00
Description: >
    Neste tópico, você encontra a lista de formas de pagamento disponíveis no PayU.
weight: 30
---
<script>
   function hideAlert() {
      var today = new Date();
      var launchDate = new Date("2/17/22");
      var note = document.getElementsByClassName("pageinfo pageinfo-info")[0];
      if((today - launchDate) > 0) {
         note.style.display = "none";

      } else {
         note.style.display = "";
      }
   }
  
   window.onload = hideAlert;
</script>

A seção a seguir mostra os métodos de pagamento disponíveis por país e fornece algumas informações. Consulte a coluna do `parâmetro paymentMethod` para saber o valor a ser enviado como método de pagamento ao usar integrações API ou SDK.

## <img src="/assets/Argentina.png" width="25px"/> Argentina {#Argentina}
<div class="paymentMethods"></div>

| | Método de pagamento | Parâmetro paymentMethod | Tipo | Comentários |
|:-:|---|---|---|---|
| ![Logo](/assets/PaymentMethods/american.png)| American Express | AMEX | Cartões de crédito | |
| ![Logo](/assets/PaymentMethods/argencard.png) | Argencard| ARGENCARD | Cartões de crédito | |
| ![Logo](/assets/PaymentMethods/cabal.png) | Cabal| CABAL | Cartões de crédito | |
| ![Logo](/assets/PaymentMethods/cencosud.png)| Cencosud | CENCOSUD| Cartões de crédito | |
| ![Logo](/assets/PaymentMethods/cobro-express.png) | Cobro Express| COBRO_EXPRESS | Dinheiro | |
| ![Logo](/assets/PaymentMethods/diners.png)| Diners | DINERS | Cartões de crédito | |
| ![Logo](/assets/PaymentMethods/master.png)| Mastercard | MASTERCARD | Cartões de crédito | **Cartões autorizados**: CRM Falabella, Nativa, Cordial, Cordobesa e Nexo. |
| ![Logo](/assets/PaymentMethods/naranja.png) | Naranja| NARANJA | Cartões de crédito | |
| ![Logo](/assets/PaymentMethods/pago-facil.png)| PAGOFACIL| PAGOFACIL | Dinheiro | |
| ![Logo](/assets/PaymentMethods/rapi-pago.png) | RAPIPAGO | RAPIPAGO| Dinheiro | |
| ![Logo](/assets/PaymentMethods/shopping.png)| Shopping | SHOPPING| Cartões de crédito | |
| ![Logo](/assets/PaymentMethods/visa.png)| VISA | VISA | Cartões de crédito | **Cartões autorizados**: Shopping, Nativa, Credimas e Nevada. |
| ![Logo](/assets/PaymentMethods/visa.png)| VISA | VISA_DEBIT | Cartões de débito| |

## <img src="/assets/Brasil.png" width="25px"/> Brasil {#Brazil}
<div class="paymentMethods"></div>

| | Método de pagamento | Parâmetro paymentMethod | Tipo | Comentários |
|:-:|---|---|---|---|
| ![Logo](/assets/PaymentMethods/american.png)| American Express | AMEX | Cartões de crédito| |
| ![Logo](/assets/PaymentMethods/boleto-bancario.png) | Boleto Bancario| BOLETO_BANCARIO | Dinheiro | Não concilia em fins de semana e feriados |
| ![Logo](/assets/PaymentMethods/diners.png)| Diners | DINERS | Cartões de crédito| |
| ![Logo](/assets/PaymentMethods/elo.png) | Elo| ELO | Cartões de crédito| |
| ![Logo](/assets/PaymentMethods/hipercard.png) | Hipercard | HIPERCARD | Cartões de crédito| |
| ![Logo](/assets/PaymentMethods/itau.png)| TEF Itaú | ITAU | Transferência bancária | Disponível apenas para contas Itaú. |
| ![Logo](/assets/PaymentMethods/pix.png) | PIX | PIX | Pagamento Instantâneo | |
| ![Logo](/assets/PaymentMethods/master.png)| Mastercard | MASTERCARD | Cartões de crédito| |
| ![Logo](/assets/PaymentMethods/visa.png)| VISA | VISA | Cartões de crédito| |

{{% pageinfo color="info" %}}
#### Observação
A integração com o PIX estará disponível a partir de 16 de fevereiro de 2022. Para mais informações, consulte seu representante de vendas.
{{% /pageinfo %}}

## <img src="/assets/Chile.png" width="25px"/> Chile {#Chile}
<div class="paymentMethods"></div>

|  | Método de pagamento | Parâmetro paymentMethod | Tipo | Comentários |
|:---:|---|---|---|---|
| ![Logo](/assets/PaymentMethods/american.png) | American Express | AMEX | Cartões de crédito| |
| ![Logo](/assets/PaymentMethods/diners.png) | Diners | DINERS | Cartões de crédito| |
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard | MASTERCARD | Cartões de crédito| |
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard | MASTERCARD_DEBIT | Cartões de débito | |
| ![Logo](/assets/PaymentMethods/multicaja.png)| Klap (FKA Multicaja) | MULTICAJA | Dinheiro | |
| ![Logo](/assets/PaymentMethods/red-compra.png) | Redcompra | TRANSBANK_DEBIT | Debit and Prepaid Cards | |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA | Cartões de crédito| |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA_DEBIT | Cartões de débito | |

## <img src="/assets/Colombia.png" width="25px"/> Colômbia {#Colombia}
PayU na Colômbia permite a integração com a maioria dos métodos de pagamento em dinheiro do país. Além disso, trabalhamos com Codensa e Falabella

<div class="paymentMethods"></div>

| | Método de pagamento | Parâmetro paymentMethod | Tipo | Comentários |
|:-:|---|---|----|---|
| ![Logo](/assets/PaymentMethods/american.png)| American Express | AMEX | Cartões de crédito | |
| ![Logo](/assets/PaymentMethods/viabaloto.png) | Baloto | BALOTO | Dinheiro | |
| ![Logo](/assets/PaymentMethods/banco-de-bogota.png) | Banco de Bogotá| BANK_REFERENCED | Referência bancária | |
| ![Logo](/assets/PaymentMethods/bancolombia.png) | Bancolombia | BANK_REFERENCED | Referência bancária | |
| ![Logo](/assets/PaymentMethods/codensa.png) | Codensa | CODENSA | Cartões de crédito | |
| ![Logo](/assets/PaymentMethods/davivienda.png)| Davivienda | BANK_REFERENCED | Referência bancária | |
| ![Logo](/assets/PaymentMethods/diners.png)| Diners | DINERS | Cartões de crédito | |
| ![Logo](/assets/PaymentMethods/efecty.png)| Efecty | EFECTY | Dinheiro | |
| ![Logo](/assets/PaymentMethods/master.png)| Mastercard | MASTERCARD | Cartões de crédito | |
| ![Logo](/assets/PaymentMethods/pse_logo.png)| PSE | PSE | Transferência bancária | O PSE permite que seus clientes paguem usando Nequi e Daviplata. |
| ![Logo](/assets/PaymentMethods/su-red.png)| Su Red | OTHERS_CASH| Dinheiro | **Escritórios de pagamento**: PagaTodo, Gana Gana, Gana, Acertemos, Apuestas Cúcuta 75, Su Chance, La Perla, Apuestas Unidas, JER. |
| ![Logo](/assets/PaymentMethods/visa.png)| VISA | VISA | Cartões de crédito | |

## <img src="/assets/Mexico.png" width="25px"/> México {#Mexico}
Para o México, oferecemos suporte tanto para MSI quanto para parcelas e promoções. Consulte este [artigo]({{< ref "Promotions.md" >}}) para obter mais informações.

<div class="paymentMethods"></div>

|  | Método de pagamento | Parâmetro paymentMethod | Tipo | Comentários |
|:---:|---|---|----|---|
| ![Logo](/assets/PaymentMethods/american.png) | American Express | AMEX | Cartões de crédito |  |
| ![Logo](/assets/PaymentMethods/bbva.png) | BBVA Bancomer| BANK_REFERENCED | Referência bancária |  |
| ![Logo](/assets/PaymentMethods/farmaciabenavides.png) | Farmacias Benavides | OTHERS_CASH_MX | Dinheiro |  |
| ![Logo](/assets/PaymentMethods/farmaciasahorro.png) | Farmacias del Ahorro | OTHERS_CASH_MX | Dinheiro |  |
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard | MASTERCARD | Cartões de crédito |  |
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard | MASTERCARD_DEBIT | Cartões de débito|  |
| ![Logo](/assets/PaymentMethods/oxxo.png) | Oxxo | OXXO | Dinheiro |  |
| ![Logo](/assets/PaymentMethods/7eleven.png)| Seven Eleven | SEVEN_ELEVEN| Dinheiro |  |
| ![Logo](/assets/PaymentMethods/spei.png) | SPEI | SPEI | Transferência bancária|  |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA | Cartões de crédito |  |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA_DEBIT | Cartões de débito|  |

## <img src="/assets/Panama.png" width="25px"/> Panamá {#Panama}
<div class="paymentMethods"></div>

|  | Método de pagamento | Parâmetro paymentMethod | Tipo | Comentários |
|:---:|---|---|---|---|
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard | MASTERCARD | Cartões de crédito |  |
| ![Logo](/assets/PaymentMethods/visa.png) | VISA | VISA | Cartões de crédito |  |

## <img src="/assets/Peru.png" width="25px"/> Peru {#Peru}
<div class="paymentMethods"></div>

| | Método de pagamento | Parâmetro paymentMethod| Tipo | Comentários |
|:-:|---|---|---|----|
| ![Logo](/assets/PaymentMethods/american.png)| American Express | AMEX | Cartões de crédito |  |
| ![Logo](/assets/PaymentMethods/diners.png)| Diners | DINERS | Cartões de crédito |  |
| ![Logo](/assets/PaymentMethods/master.png)| Mastercard | MASTERCARD | Cartões de crédito |  |
| ![Logo](/assets/PaymentMethods/master.png)| Mastercard | MASTERCARD_DEBIT | Cartões de débito|  |
| ![Logo](/assets/PaymentMethods/pago-efectivo.png) | PAGOEFECTIVO | PAGOEFECTIVO | Dinheiro |  |
| ![Logo](/assets/PaymentMethods/visa.png)| VISA | VISA | Cartões de crédito |  |
| ![Logo](/assets/PaymentMethods/visa.png)| VISA | VISA_DEBIT | Cartões de débito|  |