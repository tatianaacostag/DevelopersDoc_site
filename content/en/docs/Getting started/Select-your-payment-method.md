---
title: "Select Your Payment Method"
linkTitle: "Select Your Payment Method"
date: 2021-04-07T16:17:14-05:00
Description: >
  In this topic, you can find the list of payment methods available from PayU.
weight: 30
---
The following section shows the payment methods supported per country and provides some considerations. Refer to the `paymentMethod parameter` column to know the value to be sent as Payment Method while using API or SDK integrations.

## <img src="/assets/Argentina.png" width="25px"/> Argentina {#Argentina}
<div class="paymentMethods"></div>

|                                                   | Payment Method   | paymentMethod parameter | Type         | Comments      |
|:-------------------------------------------------:|------------------|-------------------------|--------------|---------------|
| ![Logo](/assets/PaymentMethods/american.png)      | American Express | AMEX                    | Credit Cards |               |
| ![Logo](/assets/PaymentMethods/argencard.png)     | Argencard        | ARGENCARD               | Credit Cards |               |
| ![Logo](/assets/PaymentMethods/cabal.png)         | Cabal            | CABAL                   | Credit Cards |               |
| ![Logo](/assets/PaymentMethods/cencosud.png)      | Cencosud         | CENCOSUD                | Credit Cards |               |
| ![Logo](/assets/PaymentMethods/cobro-express.png) | Cobro Express    | COBRO_EXPRESS           | Cash         |               |
| ![Logo](/assets/PaymentMethods/diners.png)        | Diners           | DINERS                  | Credit Cards |               |
| ![Logo](/assets/PaymentMethods/master.png)        | Mastercard       | MASTERCARD              | Credit Cards | **Supported cards**: CRM Falabella, Nativa, Cordial, Cordobesa, and Nexo. |
| ![Logo](/assets/PaymentMethods/naranja.png)       | Naranja          | NARANJA                 | Credit Cards |               |
| ![Logo](/assets/PaymentMethods/pago-facil.png)    | PAGOFACIL        | PAGOFACIL               | Cash         |               |
| ![Logo](/assets/PaymentMethods/rapi-pago.png)     | RAPIPAGO         | RAPIPAGO                | Cash         |               |
| ![Logo](/assets/PaymentMethods/shopping.png)      | Shopping         | SHOPPING                | Credit Cards |               |
| ![Logo](/assets/PaymentMethods/visa.png)          | VISA             | VISA                    | Credit Cards | **Supported cards**: Shopping, Nativa, Credimas, and Nevada. |
| ![Logo](/assets/PaymentMethods/visa.png)          | VISA             | VISA_DEBIT              | Debit Cards  |               |

## <img src="/assets/Brasil.png" width="25px"/> Brazil {#Brazil}
<div class="paymentMethods"></div>

|                                                     | Payment Method   | paymentMethod parameter | Type            | Comments  |
|:---------------------------------------------------:|------------------|-------------------------|-----------------|-----------|
| ![Logo](/assets/PaymentMethods/american.png)        | American Express | AMEX                    | Credit Cards    |           |
| ![Logo](/assets/PaymentMethods/boleto-bancario.png) | Boleto Bancario  | BOLETO_BANCARIO         | Cash            | Does not conciliate at weekends or holidays |
| ![Logo](/assets/PaymentMethods/diners.png)          | Diners           | DINERS                  | Credit Cards    |           |
| ![Logo](/assets/PaymentMethods/elo.png)             | Elo              | ELO                     | Credit Cards    |           |
| ![Logo](/assets/PaymentMethods/hipercard.png)       | Hipercard        | HIPERCARD               | Credit Cards    |           |
| ![Logo](/assets/PaymentMethods/itau.png)            | TEF Itaú         | ITAU                    | Bank Transfer   | Only available for Itaú accounts. |
| ![Logo](/assets/PaymentMethods/pix.png)             | PIX              | PIX                     | Instant Payment |           |
| ![Logo](/assets/PaymentMethods/master.png)          | Mastercard       | MASTERCARD              | Credit Cards    |           |
| ![Logo](/assets/PaymentMethods/visa.png)            | VISA             | VISA                    | Credit Cards    |           |

## <img src="/assets/Chile.png" width="25px"/> Chile {#Chile}
<div class="paymentMethods"></div>

|                                                | Payment Method       | paymentMethod parameter | Type          | Comments    |
|:----------------------------------------------:|----------------------|-------------------------|---------------|-------------|
| ![Logo](/assets/PaymentMethods/american.png)   | American Express     | AMEX                    | Credit Cards  |             |
| ![Logo](/assets/PaymentMethods/diners.png)     | Diners               | DINERS                  | Credit Cards  |             |
| ![Logo](/assets/PaymentMethods/master.png)     | Mastercard           | MASTERCARD              | Credit Cards  |             |
| ![Logo](/assets/PaymentMethods/master.png)     | Mastercard           | MASTERCARD_DEBIT        | Debit Cards   |             |
| ![Logo](/assets/PaymentMethods/multicaja.png)  | Klap (FKA Multicaja) | MULTICAJA               | Cash          |             |
| ![Logo](/assets/PaymentMethods/red-compra.png) | Redcompra            | TRANSBANK_DEBIT         | Debit and Prepaid Cards |   |
| ![Logo](/assets/PaymentMethods/visa.png)       | VISA                 | VISA                    | Credit Cards  |             |
| ![Logo](/assets/PaymentMethods/visa.png)       | VISA                 | VISA_DEBIT              | Debit Cards   |             |

## <img src="/assets/Colombia.png" width="25px"/> Colombia {#Colombia}
PayU in Colombia allows you to integrate with most of the cash payments methods in Colombia. Furthermore, we support Codensa and Falabella.

<div class="paymentMethods"></div>

|                                                     | Payment Method   | paymentMethod parameter | Type           | Comments  |
|:---------------------------------------------------:|------------------|-------------------------|----------------|-----------|
| ![Logo](/assets/PaymentMethods/american.png)        | American Express | AMEX                    | Credit Cards   |           |
| ![Logo](/assets/PaymentMethods/viabaloto.png)       | Baloto           | BALOTO                  | Cash           |           |
| ![Logo](/assets/PaymentMethods/banco-de-bogota.png) | Banco de Bogotá  | BANK_REFERENCED         | Bank Reference |           |
| ![Logo](/assets/PaymentMethods/bancolombia.png)     | Bancolombia      | BANK_REFERENCED         | Bank Reference |           |
| ![Logo](/assets/PaymentMethods/codensa.png)         | Codensa          | CODENSA                 | Credit Cards   |           |
| ![Logo](/assets/PaymentMethods/davivienda.png)      | Davivienda       | BANK_REFERENCED         | Bank Reference |           |
| ![Logo](/assets/PaymentMethods/diners.png)          | Diners           | DINERS                  | Credit Cards   |           |
| ![Logo](/assets/PaymentMethods/efecty.png)          | Efecty           | EFECTY                  | Cash           |           |
| ![Logo](/assets/PaymentMethods/master.png)          | Mastercard       | MASTERCARD              | Credit Cards   |           |
| ![Logo](/assets/PaymentMethods/pse_logo.png)        | PSE              | PSE                     | Bank Transfer  | PSE lets your customers pay using Nequi and Daviplata. |
| ![Logo](/assets/PaymentMethods/su-red.png)          | Su Red           | OTHERS_CASH              | Cash           | **Payment offices**: PagaTodo, Gana Gana, Gana, Acertemos, Apuestas Cúcuta 75, Su Chance, La Perla, Apuestas Unidas, JER. |
| ![Logo](/assets/PaymentMethods/visa.png)            | VISA             | VISA                    | Credit Cards   |           |

## <img src="/assets/Mexico.png" width="25px"/> Mexico {#Mexico}
For Mexico, we support both MSI, and Installments and Promotions, refer to this [article]({{< ref "Promotions.md" >}}) for more information.

<div class="paymentMethods"></div>

|                                                  | Payment Method       | paymentMethod parameter | Type           | Comments |
|:------------------------------------------------:|----------------------|-------------------------|----------------|----------|
| ![Logo](/assets/PaymentMethods/american.png)     | American Express     | AMEX                    | Credit Cards   |          |
| ![Logo](/assets/PaymentMethods/bbva.png)         | BBVA Bancomer        | BANK_REFERENCED         | Bank Reference |          |
| ![Logo](/assets/PaymentMethods/farmaciabenavides.png) | Farmacias Benavides  | OTHERS_CASH_MX     | Cash           |          |
| ![Logo](/assets/PaymentMethods/farmaciasahorro.png) | Farmacias del Ahorro | OTHERS_CASH_MX       | Cash           |          |
| ![Logo](/assets/PaymentMethods/master.png)       | Mastercard           | MASTERCARD              | Credit Cards   |          |
| ![Logo](/assets/PaymentMethods/master.png)       | Mastercard           | MASTERCARD_DEBIT        | Debit Cards    |          |
| ![Logo](/assets/PaymentMethods/oxxo.png)         | Oxxo                 | OXXO                    | Cash           |          |
| ![Logo](/assets/PaymentMethods/7eleven.png)      | Seven Eleven         | SEVEN_ELEVEN            | Cash           |          |
| ![Logo](/assets/PaymentMethods/spei.png)         | SPEI                 | SPEI                    | Bank Transfer  |          |
| ![Logo](/assets/PaymentMethods/visa.png)         | VISA                 | VISA                    | Credit Cards   |          |
| ![Logo](/assets/PaymentMethods/visa.png)         | VISA                 | VISA_DEBIT              | Debit Cards    |          |

## <img src="/assets/Panama.png" width="25px"/> Panama {#Panama}
<div class="paymentMethods"></div>

|                                            | Payment Method   | paymentMethod parameter | Type         | Comments             |
|:------------------------------------------:|------------------|-------------------------|--------------|----------------------|
| ![Logo](/assets/PaymentMethods/master.png) | Mastercard       | MASTERCARD              | Credit Cards |                      |
| ![Logo](/assets/PaymentMethods/visa.png)   | VISA             | VISA                    | Credit Cards |                      |

## <img src="/assets/Peru.png" width="25px"/> Peru {#Peru}
<div class="paymentMethods"></div>

|                                                   | Payment Method   | paymentMethod parameter    | Type         | Comments   |
|:-------------------------------------------------:|------------------|----------------------------|--------------|------------|
| ![Logo](/assets/PaymentMethods/american.png)      | American Express | AMEX                       | Credit Cards |            |
| ![Logo](/assets/PaymentMethods/diners.png)        | Diners           | DINERS                     | Credit Cards |            |
| ![Logo](/assets/PaymentMethods/master.png)        | Mastercard       | MASTERCARD                 | Credit Cards |            |
| ![Logo](/assets/PaymentMethods/master.png)        | Mastercard       | MASTERCARD_DEBIT           | Debit Cards  |            |
| ![Logo](/assets/PaymentMethods/pago-efectivo.png) | PAGOEFECTIVO     | PAGOEFECTIVO               | Cash         |            |
| ![Logo](/assets/PaymentMethods/visa.png)          | VISA             | VISA                       | Credit Cards |            |
| ![Logo](/assets/PaymentMethods/visa.png)          | VISA             | VISA_DEBIT                 | Debit Cards  |            |