---
title: "API de Pricing"
linkTitle: "API de Pricing"
date: 2025-06-29T12:38:41-05:00
description: >
    A API de Pricing permite consultar todas as opções de financiamento disponíveis e os custos associados às suas transações. Isso inclui a configuração de pricing da sua conta virtual PayU, como parcelamentos padrão, parcelamentos sem juros e outros recursos relevantes para seus clientes.
weight: 50
tags: ["subtopic"]
---

## Opções de pricing {#pricing-options}

A API de Pricing permite recuperar as opções de financiamento disponíveis para uma determinada transação, incluindo planos de parcelamento padrão e promoções sem juros. Cada opção especifica os meios de pagamento aplicáveis, os bancos elegíveis (se houver), os dias da semana em que está disponível e o período de validade de qualquer programa promocional.

A tabela abaixo mostra onde cada tipo de opção de parcelamento está disponível nos países da PayU Latam. Para mais detalhes, consulte a documentação de [Parcelamentos sem Juros](https://developers.payulatam.com/latam/pt/docs/services/promotions.html).

<table style="width: 60%; min-width: 300px; border-collapse: collapse;">
  <tr>
    <th style="width: 40%; text-align: left;">Tipo de parcelamento</th>
    <th colspan="2" style="width: 60%; text-align: left;">Países disponíveis</th> 
  </tr>
  <tr>
    <td><strong>Parcelamentos padrão</strong></td>
    <td style="width: 30%;" >
      <img src="/assets/Argentina.png" width="15px"/> &nbsp;Argentina<br>
      <img src="/assets/Brasil.png" width="15px"/> &nbsp;Brasil<br>
      <img src="/assets/Chile.png" width="15px"/> &nbsp;Chile<br>      
    </td>
    <td style="width: 70%;" >
      <img src="/assets/Colombia.png" width="15px"/> &nbsp;Colômbia<br>
      <img src="/assets/Mexico.png" width="15px"/> &nbsp;México<br>      
      <img src="/assets/Peru.png" width="15px"/> &nbsp;Peru
    </td>
  </tr>  
  <tr>
    <td><strong>Parcelamentos sem Juros Gerais (MSI)</strong></td>
    <td style="width: 30%;" >
      <img src="/assets/Argentina.png" width="15px"/> &nbsp;Argentina
    </td>  
    <td style="width: 70%;" >      
      <img src="/assets/Mexico.png" width="15px"/> &nbsp;México
    </td>
  </tr>
  <tr>
    <td><strong>Parcelamentos sem Juros Específicos</strong></td>
    <td style="width: 30%;" >
      <img src="/assets/Argentina.png" width="15px"/> &nbsp;Argentina<br>
      <img src="/assets/Colombia.png" width="15px"/> &nbsp;Colômbia
    </td>  
    <td style="width: 70%;" >    
      <img src="/assets/Mexico.png" width="15px"/> &nbsp;México<br>
      <img src="/assets/Peru.png" width="15px"/> &nbsp;Peru
    </td>
  </tr>  
</table>

{{% alert title="Nota" color="info"%}}

Para habilitar um plano de parcelamento sem juros de acordo com seus acordos com emissores locais, entre em contato com seu representante de vendas da PayU.

{{% /alert %}}

O diagrama a seguir ilustra todo o processo, desde a consulta à API de Pricing até a aprovação da transação:

{{< promotions/pricingApi_pt >}}

## Consultando as opções de pricing disponíveis {#querying-the-available-pricing-options}

Para recuperar as informações de pricing, envie uma requisição `GET` para a URL apropriada de acordo com o ambiente.

{{% alert title="Endpoints da API" color="info"%}}

* Teste: ```GET https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing```
* Produção: ```GET https://api.payulatam.com/payments-api/rest/v4.9/pricing```

{{% /alert %}}

Como este é um serviço RESTful, recomendamos fortemente que você não utilize validação rígida de esquema. Evitar a validação de esquema garante uma integração mais fluida, minimizando alterações quando forem feitas atualizações no Web Service.

### Autenticação para requisições {#authentication-for-requests}

Para autenticar as requisições da API, é necessário usar um mecanismo baseado em HMAC. Você precisa da sua `MerchantPublicKey`, que pode ser encontrada no seu Painel de Gerenciamento PayU em **_Configuração_** > **_Configuração técnica_** > **_Chave pública_**.

{{% alert title="Nota" color="info"%}}

Para testar no ambiente de sandbox, utilize as credenciais listadas na documentação [Teste sua Solução](https://developers.payulatam.com/latam/pt/docs/getting-started/test-your-solution.html).

{{% /alert %}}

![PrintScreen](/assets/Promotions/PublicKey_pt.png)

### Configuração da autenticação {#configuring-the-authentication}

Inclua os cabeçalhos `Authorization` e `Date` na sua requisição. O cabeçalho `Authorization` segue esta estrutura:

```java
"Hmac" + " " + MerchantPublicKey + ":" + Signature
```

<br>

Onde `Signature` é criada da seguinte forma:

```java
Signature = Base64(HMAC-SHA256(MerchantApiKey,ContentToSign)) 
```

<br>

E `ContentToSign` corresponde a:

```java
HTTP-Verb + "\n" + "\n" + "\n" +
Date + "\n" +
URI
```

{{% alert title="Observação" color="info"%}}

É obrigatório incluir as três quebras de linha (`\n`) depois de `HTTP-Verb`.

{{% /alert %}}

#### Exemplo: Gerando o cabeçalho de autenticação

O seguinte exemplo mostra como criar o cabeçalho de Autenticação usando os seguintes valores de teste:

**ContentToSign**:
```java
GET     

Fri, 28 Apr 2017 18:32:01 GMT
/payments-api/rest/v4.9/pricing
```

<br>

**MerchantApiKey**:
```java
4Vj8eK4rloUd272L48hsrarnUA
```

<br>

**MerchantPublicKey**:
```java
PKaC6H4cEDJD919n705L544kSU
```

<br>

Criptografe `ContentToSign` usando `MerchantApiKey` como senha. Em seguida, concatene o resultado com `MerchantPublicKey` como mostrado abaixo:

**Authorization**
```java
Hmac PKaC6H4cEDJD919n705L544kSU:sIxh54sANfKaxO0ugX6QwhPmZRS+TGy8gmdCwr3kjP0= 
```

<br>

Para evitar ataques de repetção (replay attacks), inclua o cabeçalho `Date` formatado da seguinte forma:

**Date**
```java
Mon, 11 May 2015 21:14:41 GMT
```

<br>

Se restrições do cliente REST impedirem o uso de `Date`, você pode alternativamente enviar `x-hmac-date` no mesmo formato:

**x-hmac-date**
```java
Mon, 11 May 2015 21:14:41 GMT
```

### Parâmetros para requisição e resposta {#parameters-for-request-and-response}

Esta seção descreve os parâmetros usados na requisição da API e os campos retornados na resposta.

Os parâmetros da requisição definem os valores de entrada necessários para recuperar preços, promoções e detalhes de impostos. Os parâmetros da resposta descrevem a estrutura e o significado dos dados retornados, incluindo valores da transação, tarifas por método de pagamento, detalhamento de parcelas, promoções e impostos aplicáveis.

<details>

<summary>Parâmetros da requisição</summary>

<br>

<div class="variables"></div>

| Parâmetro | Descrição | Obrigatório |
|-|-|:-:|
| `accountId` | Identificador único da sua conta. | Sim |
| `currency` | Moeda associada à sua conta. | Não |
| `amount` | Valor total da compra. Usado para calcular as tarifas mostradas na resposta. Não filtra promoções por valor. | Sim |
| `paymentMethod` | Parâmetro opcional para filtrar promoções por método de pagamento. Para mais informações sobre métodos disponíveis, consulte a documentação [Selecione seu Método de Pagamento](https://developers.payulatam.com/latam/pt/docs/getting-started/select-your-payment-method.html). | Não |
| `tax` | Valor do imposto incluído na transação. Aplicável somente na Argentina e na Colômbia. | Não |
| `taxReturnBase` | Valor base usado para calcular o imposto. Aplicável somente na Argentina e na Colômbia. | Não |

</details>

<details>

<summary>Parâmetros da resposta</summary>

<br>

<div class="variables"></div>

| Nome do campo | Tipo | Descrição |
|---------------|------|-----------|
| `amount` | Objeto | Detalhes do valor da transação. |
| `amount` > `value` | Número | Valor total da transação. |
| `amount` > `tax` | Número | Valor do imposto incluído na transação. |
| `amount` > `purchaseValue` | Número | Valor da compra antes dos impostos. |
| `amount` > `adminFeeValue` | Número | Valor da tarifa administrativa incluída na transação. |
| `amount` > `adminFeeTax` | Número | Valor do imposto aplicado à tarifa administrativa. |
| `amount` > `adminFeeTaxableBase` | Número | Base tributável usada para calcular impostos sobre a tarifa administrativa. |
| `amount` > `currency` | String | Código da moeda da transação original. |
| `amount` > `taxableBase` | Número | Valor da transação usado como base de cálculo de impostos. |
| `convertedAmount` | Objeto | Contém o valor da transação convertido para outra moeda (se aplicável). |
| `convertedAmount` > `value` | Número | Valor total convertido da transação. |
| `convertedAmount` > `tax` | Número | Valor do imposto convertido. |
| `convertedAmount` > `purchaseValue` | Número | Valor da compra convertido antes dos impostos. |
| `convertedAmount` > `adminFeeValue` | Número | Valor convertido da tarifa administrativa. |
| `convertedAmount` > `adminFeeTaxableBase` | Número | Base tributável convertida para cálculo de impostos sobre a tarifa administrativa. |
| `convertedAmount` > `currency` | String | Código da moeda do valor convertido. |
| `convertedAmount` > `taxableBase` | Número | Valor convertido usado como base de cálculo de impostos. |
| `paymentMethodFee` | Lista | Detalhamento dos custos incorridos pelo comerciante com base no método de pagamento. |
| `paymentMethodFee` > `paymentMethod` | String | Nome do método de pagamento. |
| `paymentMethodFee` > `pricingFees` | Objeto | Contém os detalhes de preços por método de pagamento e faixa de parcelas. |
| `paymentMethodFee` > `pricingFees` > `installments` | String | Número de parcelas, podendo ser um valor único (ex.: `1`) ou, em países aplicáveis, um intervalo (ex.: `1-36`). |
| `paymentMethodFee` > `pricingFees` > `pricing` | Objeto | Contém os detalhes de preços da transação. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` | Objeto | Detalhamento de juros e tarifas cobrados do pagador. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` > `commission` | Número | Valor total da comissão (incluindo impostos) cobrado do pagador. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` > `interests` | Número | Valor total de juros (incluindo impostos) cobrados do pagador. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` > `total` | Número | Valor total a ser pago pelo pagador, incluindo juros e tarifas. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` | Objeto | Detalhamento de juros e tarifas cobrados do comerciante. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` > `commission` | Número | Valor total da comissão (incluindo impostos) cobrado do comerciante. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` > `interests` | Número | Valor total de juros (incluindo impostos) cobrados do comerciante. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` > `total` | Número | Custo total incorrido pelo comerciante, incluindo juros e tarifas. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `totalValue` | Número | Valor total da transação incluindo juros e tarifas. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `totalIncomeTransaction` | Número | Receita total gerada pela transação. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `additionalInfo` | Objeto | Inclui informações financeiras como a Taxa Efetiva Anual (TEA) e o Custo Financeiro Total (CFT). Aplica-se apenas à Argentina. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `additionalInfo` > `cft` | Número | Custo Financeiro Total (CFT) aplicado à transação. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `additionalInfo` > `tea` | Número | Taxa Efetiva Anual (TEA) aplicada à transação. |
| `paymentMethodFee` > `pricingFees` > `promos` | Array | Lista de promoções disponíveis aplicáveis à configuração de preços. |
| `paymentMethodFee` > `pricingFees` > `promos` > `id` | Inteiro | ID único da promoção no sistema PayU. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` | Objeto | Contém os detalhes de preços para a promoção específica. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` | Objeto | Detalhamento de juros e tarifas do pagador sob a promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` > `commission` | Número | Comissão cobrada do pagador na promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` > `interests` | Número | Juros cobrados do pagador na promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` > `total` | Número | Valor total a ser pago pelo pagador, incluindo comissões e juros, na promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` | Objeto | Detalhamento de juros e tarifas do comerciante sob a promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` > `commission` | Número | Comissão cobrada do comerciante na promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` > `interests` | Número | Juros cobrados do comerciante na promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` > `total` | Número | Custo total do comerciante, incluindo comissões e juros, na promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `totalValue` | Número | Valor total da transação incluindo comissões e juros na promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `totalIncomeTransaction` | Número | Receita total gerada pela transação na promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `priority` | Número | Nível de prioridade da promoção dentro da configuração de preços. |
| `promotions` | Objeto | Contém detalhes sobre a promoção aplicada (se aplicável). |
| `promotions` > `id` | Inteiro | ID único da promoção no sistema PayU. |
| `promotions` > `title` | String | Título da promoção (máximo de 50 caracteres). |
| `promotions` > `termsAndConditions` | String | Termos e condições aplicáveis à promoção (máximo de 250 caracteres). |
| `promotions` > `paymentMethod` | String | Método de pagamento associado à promoção. |
| `promotions` > `subFranchise` | String | Sub-marca ou sub-franquia associada à promoção. Se `subFranchise` não for fornecido, a promoção não está vinculada a um cartão local (como Naranja), mas sim a uma bandeira internacional (ex.: Mastercard), conforme definido por `paymentMethodMain`. |
| `promotions` > `banksNames` | Lista | Lista de bancos onde a promoção se aplica. Se `banksNames` não for fornecido, a promoção se aplica a todo o método de pagamento, com `paymentMethodMain` tendo precedência. |
| `promotions` > `paymentMethodMain` | String | Método de pagamento principal associado à promoção. |
| `promotions` > `iin` | Lista | Lista de números de IIN/BIN de cartões elegíveis para a promoção. |
| `promotions` > `iins` | Lista | Lista de números de IIN/BIN de cartões elegíveis para a promoção. Se `iins` não for fornecido, a promoção está disponível para todos os cartões do método de pagamento especificado em `paymentMethodMain`. |
| `promotions` > `days` | Lista | Dias da semana em que a promoção está disponível. |
| `promotions` > `startDate` | DateTime | Data e hora de início da promoção. |
| `promotions` > `endDate` | DateTime | Data e hora de término da promoção. |
| `promotions` > `priority` | Número | Nível de prioridade da promoção. |
| `promotions` > `type` | String | Tipo de promoção. Valores possíveis:<br><br>**PRICING** – A promoção é aplicada automaticamente com base nas regras de preço configuradas. Por exemplo, no México, se as parcelas sem juros estiverem configuradas, o comerciante só precisa enviar o número de parcelas em `transaction > extraParameters > INSTALLMENTS_NUMBER`. O sistema aplicará automaticamente a condição de sem juros sem exigir um ID de promoção.<br><br>**MSI** – Exige que o comerciante envie explicitamente tanto o ID da promoção quanto o número de parcelas. Isso se aplica quando a promoção deve corresponder a uma combinação específica de método de pagamento, parcelas e ID da promoção. Para aplicar este tipo, os seguintes campos devem ser enviados:<br>- `transaction > extraParameters > INSTALLMENTS_NUMBER`<br>- `transaction > extraParameters > PROMOTION_ID`<br><br>**Nota:** Se o ID da promoção não for enviado quando exigido, a transação será processada sem a promoção, usando a configuração de preços padrão para a opção de parcelas selecionada. |
| `paymentTaxesDetails` | Objeto | Contém detalhes dos impostos aplicados (a estrutura depende da resposta do serviço de impostos). |
| `taxesServiceFailed` | Booleano | Indica se o serviço de cálculo de impostos falhou. |

</details>

### Chamada da API {#api-call}

Para recuperar as promoções disponíveis, envie uma solicitação `GET` utilizando o seguinte formato:

```JAVASCRIPT
GET
https://{env-api}.payulatam.com/payments-api/rest/v4.9/pricing?accountId={accountId}&currency={currency}&amount={amount}&paymentMethod={paymentMethod}
Accept: application/json
Content-Type: application/json
Authorization: Hmac PKaC6H4cEDJD919n705L544kSU:sIxh54sANfKaxO0ugX6QwhPmZRS+TGy8gmdCwr3kjP0=
Date: Fri, 16 May 2025 14:37:05 GMT
```

<br>

A variável `{env-api}` deve ser definida da seguinte forma:

- `sandbox.api` para testes
- `api` para produção

O parâmetro `paymentMethod` é opcional e pode ser usado para filtrar promoções por um meio de pagamento específico. Os parâmetros `tax` e `taxReturnBase` também são opcionais, mas se aplicam apenas na Argentina e na Colômbia.

**Exemplo de requisição para a Argentina:**

```JAVA
https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing?accountId=512322&currency=ARS&amount=110524.91&tax=19182.01&taxReturnBase=91342.90
```
<br>

**Exemplo de requisição para a Colômbia:**

```JAVA
https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing?accountId=512321&currency=COP&amount=11601.71&tax=1769.75&taxReturnBase=9831.96
```

<br>

**Exemplo de requisição para o México:**

```JAVA
https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing?accountId=512324&currency=MXN&amount=15662.37
```
<br>

**Exemplo de requisição para o Peru:**

```JAVA
https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing?accountId=516634&currency=PEN&amount=2897.78
```

<br>

**Exemplo de resposta:**

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
{
    "amount": {
        "value": 1000.00,
        "tax": 0,
        "purchaseValue": 1000.00,
        "currency": "ARS"
    },
    "convertedAmount": {
        "value": 1000.00,
        "tax": 0.00,
        "purchaseValue": 1000.00,
        "currency": "ARS"
    },
    "promotions": [
        {
            "id": 49,
            "title": "Promotion_ID AMEX",
            "termsAndConditions": "SI",
            "paymentMethodMain": "AMEX",
            "startDate": "2018-08-16 18:48:00",
            "endDate": "2090-08-16 18:48:00",
            "days": [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY"
            ],
            "priority": 10,
            "type": "MSI"
        },
        {
            "id": 45,
            "title": "Promotion Test - Master",
            "termsAndConditions": "Terminos y condiciones",
            "paymentMethodMain": "MASTERCARD",
            "startDate": "2018-06-26 17:06:00",
            "endDate": "2030-06-26 17:06:00",
            "days": [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY"
            ],
            "priority": 10,
            "type": "MSI"
        }
    ],
    "paymentMethodFee": [
        {
            "paymentMethod": "DINERS",
            "pricingFees": [
                {
                    "installments": "1",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 0.00,
                            "total": 0.00
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1000.00,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "0%",
                            "tea": "0%"
                        }
                    }
                },
                {
                    "installments": "3",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 171.29,
                            "total": 171.29
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1171.29,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "162%",
                            "tea": "123.28%"
                        }
                    }
                },
                {
                    "installments": "6",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 230.01,
                            "total": 230.01
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1230.01,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "107%",
                            "tea": "83.97%"
                        }
                    }
                },
                {
                    "installments": "9",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 340.05,
                            "total": 340.05
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1340.04,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "108%",
                            "tea": "85.03%"
                        }
                    }
                },
                {
                    "installments": "12",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 490.01,
                            "total": 490.01
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1490.02,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "119%",
                            "tea": "93.68%"
                        }
                    }
                },
                {
                    "installments": "18",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 641.38,
                            "total": 641.38
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1641.39,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "97%",
                            "tea": "77.91%"
                        }
                    }
                },
                {
                    "installments": "24",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 822.72,
                            "total": 822.72
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1822.72,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "90%",
                            "tea": "72.47%"
                        }
                    }
                }
            ]
        },
        {
            "paymentMethod": "AMEX",
            "pricingFees": [
                {
                    "installments": "1",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 0.00,
                            "total": 0.00
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1000.00,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "0%",
                            "tea": "0%"
                        }
                    },
                    "promos": [
                        {
                            "id": 49,
                            "pricing": {
                                "payerDetail": {
                                    "commission": 0.00,
                                    "interests": 0.00,
                                    "total": 0.00
                                },
                                "merchantDetail": {
                                    "commission": 1044.65,
                                    "interests": 0.00,
                                    "total": 1044.65
                                },
                                "totalValue": 1000.00,
                                "totalIncomeTransaction": -44.65,
                                "additionalInfo": {
                                    "cft": "0%",
                                    "tea": "0%"
                                }
                            },
                            "priority": 10
                        }
                    ]
                },
                {
                    "installments": "3",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 171.29,
                            "total": 171.29
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1171.29,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "162%",
                            "tea": "123.28%"
                        }
                    }
                },
                {
                    "installments": "6",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 230.01,
                            "total": 230.01
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1230.01,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "107%",
                            "tea": "83.97%"
                        }
                    }
                },
                {
                    "installments": "9",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 340.05,
                            "total": 340.05
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1340.04,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "108%",
                            "tea": "85.03%"
                        }
                    }
                },
                {
                    "installments": "12",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 490.01,
                            "total": 490.01
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1490.02,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "119%",
                            "tea": "93.68%"
                        }
                    }
                },
                {
                    "installments": "18",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 641.38,
                            "total": 641.38
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1641.39,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "97%",
                            "tea": "77.91%"
                        }
                    }
                },
                {
                    "installments": "24",
                    "pricing": {
                        "payerDetail": {
                            "commission": 0.00,
                            "interests": 822.72,
                            "total": 822.72
                        },
                        "merchantDetail": {
                            "commission": 44.65,
                            "interests": 0.00,
                            "total": 44.65
                        },
                        "totalValue": 1822.72,
                        "totalIncomeTransaction": 955.35,
                        "additionalInfo": {
                            "cft": "90%",
                            "tea": "72.47%"
                        }
                    }
                }
            ]
        }
    ],
    "paymentTaxesDetails": [],
    "taxesServiceFailed": true
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```XML
<consultPriceListResponse xmlns:atom="http://www.w3.org/2005/Atom" xmlns:ns3="http://wadl.dev.java.net/2009/02">
    <amount>
        <value>1000.00</value>
        <tax>0</tax>
        <purchaseValue>1000.00</purchaseValue>
        <currency>ARS</currency>
    </amount>
    <convertedAmount>
        <value>1000.00</value>
        <tax>0.00</tax>
        <purchaseValue>1000.00</purchaseValue>
        <currency>ARS</currency>
    </convertedAmount>
    <promotions>
        <promotion id="49" title="Promotion_ID AMEX">
            <priority>10</priority>
            <type>MSI</type>
            <paymentMethod>AMEX</paymentMethod>
            <termsAndConditions>SI</termsAndConditions>
            <startDate>2018-08-16 18:48:00</startDate>
            <endDate>2090-08-16 18:48:00</endDate>
            <days>
                <day>MONDAY</day>
                <day>TUESDAY</day>
                <day>WEDNESDAY</day>
                <day>THURSDAY</day>
                <day>FRIDAY</day>
                <day>SATURDAY</day>
                <day>SUNDAY</day>
            </days>
        </promotion>
        <promotion id="45" title="Promotion Test - Master">
            <priority>10</priority>
            <type>MSI</type>
            <paymentMethod>MASTERCARD</paymentMethod>
            <termsAndConditions>Terminos y condiciones</termsAndConditions>
            <startDate>2018-06-26 17:06:00</startDate>
            <endDate>2030-06-26 17:06:00</endDate>
            <days>
                <day>MONDAY</day>
                <day>TUESDAY</day>
                <day>WEDNESDAY</day>
                <day>THURSDAY</day>
                <day>FRIDAY</day>
                <day>SATURDAY</day>
                <day>SUNDAY</day>
            </days>
        </promotion>
    </promotions>
    <paymentMethodFee>
        <paymentMethodFeeDetail paymentMethod="DINERS">
            <pricingFees>
                <fee installments="1">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>0.00</interests>
                            <total>0.00</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1000.00</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>0%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>0%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="3">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>171.29</interests>
                            <total>171.29</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1171.29</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>162%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>123.28%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="6">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>230.01</interests>
                            <total>230.01</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1230.01</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>107%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>83.97%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="9">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>340.05</interests>
                            <total>340.05</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1340.04</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>108%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>85.03%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="12">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>490.01</interests>
                            <total>490.01</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1490.02</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>119%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>93.68%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="18">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>641.38</interests>
                            <total>641.38</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1641.39</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>97%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>77.91%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="24">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>822.72</interests>
                            <total>822.72</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1822.72</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>90%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>72.47%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
            </pricingFees>
        </paymentMethodFeeDetail>
        <paymentMethodFeeDetail paymentMethod="AMEX">
            <pricingFees>
                <fee installments="1">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>0.00</interests>
                            <total>0.00</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1000.00</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>0%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>0%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                    <promos>
                        <promo id="49">
                            <priority>10</priority>
                            <pricing>
                                <payerDetail>
                                    <commission>0.00</commission>
                                    <interests>0.00</interests>
                                    <total>0.00</total>
                                </payerDetail>
                                <merchantDetail>
                                    <commission>1044.65</commission>
                                    <interests>0.00</interests>
                                    <total>1044.65</total>
                                </merchantDetail>
                                <totalValue>1000.00</totalValue>
                                <totalIncomeTransaction>-44.65</totalIncomeTransaction>
                                <additionalInfo>
                                    <entry>
                                        <key>cft</key>
                                        <value>0%</value>
                                    </entry>
                                    <entry>
                                        <key>tea</key>
                                        <value>0%</value>
                                    </entry>
                                </additionalInfo>
                            </pricing>
                        </promo>
                    </promos>
                </fee>
                <fee installments="3">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>171.29</interests>
                            <total>171.29</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1171.29</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>162%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>123.28%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="6">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>230.01</interests>
                            <total>230.01</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1230.01</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>107%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>83.97%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="9">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>340.05</interests>
                            <total>340.05</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1340.04</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>108%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>85.03%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="12">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>490.01</interests>
                            <total>490.01</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1490.02</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>119%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>93.68%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="18">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>641.38</interests>
                            <total>641.38</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1641.39</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>97%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>77.91%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
                <fee installments="24">
                    <pricing>
                        <payerDetail>
                            <commission>0.00</commission>
                            <interests>822.72</interests>
                            <total>822.72</total>
                        </payerDetail>
                        <merchantDetail>
                            <commission>44.65</commission>
                            <interests>0.00</interests>
                            <total>44.65</total>
                        </merchantDetail>
                        <totalValue>1822.72</totalValue>
                        <totalIncomeTransaction>955.35</totalIncomeTransaction>
                        <additionalInfo>
                            <entry>
                                <key>cft</key>
                                <value>90%</value>
                            </entry>
                            <entry>
                                <key>tea</key>
                                <value>72.47%</value>
                            </entry>
                        </additionalInfo>
                    </pricing>
                </fee>
            </pricingFees>
        </paymentMethodFeeDetail>
    </paymentMethodFee>
    <paymentTaxesDetails/>
    <taxesServiceFailed>true</taxesServiceFailed>
</consultPriceListResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Processamento de transações com parcelamentos {#processing-transactions-with-installments}

Esta seção explica como usar e aplicar os diferentes planos de parcelamento.

{{% alert title="Nota" color="info"%}}

Considere que a API de Pricing fornece apenas informações sobre as opções de parcelamento disponíveis. Para criar e enviar transações, utilize a API de Pagamentos do país correspondente:

* [Argentina]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}}) | [Brasil]({{< ref "Payments-API-Brazil.md#submit-transactions-using-credit-cards" >}}) | [Chile]({{< ref "Payments-API-Chile.md#submit-transactions-using-credit-debit-or-prepaid-cards" >}}) | [Colômbia]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}) | [México]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}}) | [Peru]({{< ref "Payments-API-Peru.md#submit-transactions-using-credit-or-debit-cards" >}})

{{% /alert %}}

### Tipos de parcelamento {#installment-types}

A tabela abaixo resume os tipos de parcelamento disponíveis, seus parâmetros obrigatórios e quem arca com os juros.

| Tipo de parcelamento | Países aplicáveis | Parâmetros obrigatórios | Quem arca com os juros? | Observações |
| --- | --- | --- | --- | --- |
| **Parcelamento padrão** | Argentina, Brasil, Chile, Colômbia, México, Peru | `INSTALLMENTS_NUMBER` | Pagador | Plano de parcelamento padrão com juros. |
| **Parcelamentos sem Juros Gerais (MSI)** | Argentina, México | `INSTALLMENTS_NUMBER` | Comerciante | Deve estar habilitado em sua conta PayU. Não é necessário ID de promoção. No México, o ID de promoção 9999 não é necessário. |
| **Parcelamentos sem Juros Específicos** | Argentina, Colômbia, México, Peru | `PROMOTION_ID` + `INSTALLMENTS_NUMBER` | Comerciante | Vinculado a uma promoção ou acordo específico. |

**Considerações:**

* Confirme que os planos sem juros ou MSI estão habilitados em sua conta PayU para garantir que o sistema os aplique corretamente.
* Se você enviar apenas `INSTALLMENTS_NUMBER` sem um plano ativo de Parcelamentos sem Juros Gerais, o sistema aplicará o parcelamento padrão e cobrará juros do pagador.

### Exibindo parcelamentos elegíveis no checkout {#displaying-eligible-installments-at-checkout}

Ao exibir as opções de parcelamento disponíveis durante o checkout, valide a elegibilidade usando as seguintes regras:

1. Compare o BIN do cartão com os valores em `promotions[].iin`.  
2. Se nenhum BIN estiver especificado, verifique se o banco do usuário corresponde a algum em `promotions[].banksNames`.  
3. Se nenhum banco estiver especificado, utilize o método de pagamento (bandeira do cartão) definido em `paymentMethodFee[].paymentMethod`.  

Use os seguintes campos da resposta da API de Pricing para determinar a elegibilidade e exibir as opções corretas de parcelamento:

* `paymentMethodFee[].pricingFees[].installments` → Número de parcelas disponíveis  
* `paymentMethodFee[].pricingFees[].promos[].id` → ID da promoção associada  
* `promotions[].id, promotions[].iin, promotions[].banksNames` → Critérios de elegibilidade da promoção  
* `paymentMethodFee[].paymentMethod` → Bandeira do cartão (ex.: Visa, Mastercard)  

Ao validar essa hierarquia, você garante que os usuários visualizem apenas as opções de parcelamento aplicáveis ao cartão deles.

#### Exemplos de checkout {#checkout-examples}

##### Exemplo: Parcelamento padrão na Argentina

Neste exemplo, o pagador arca com os juros. Os valores em `paymentMethodFee[].pricingFees[].pricing.payerDetail` são maiores que `0`.

![PrintScreen](/assets/Promotions/promo2.png)

##### Exemplo: Parcelamentos sem Juros Gerais na Argentina

Neste exemplo, o comerciante arca com os juros. Os valores em `paymentMethodFee[].pricingFees[].pricing.merchantDetail` são maiores que `0`.

![PrintScreen](/assets/Promotions/promo3.png)

##### Exemplo: Parcelamentos sem Juros Específicos na Argentina

Neste exemplo, o comerciante arca com os juros. Os valores em `paymentMethodFee[].pricingFees[].promos[].pricing.merchantDetail` são maiores que `0`.

![PrintScreen](/assets/Promotions/promo5.png)

#### Exibindo CFT e TEA na Argentina {#displaying-cft-and-tea-in-argentina}

De acordo com a Resolução E 51/2017 da Secretaría de Comercio (Argentina), os comerciantes devem exibir claramente as informações de financiamento ao processar transações com cartões de crédito ou débito em parcelas.

Especificamente, você deve:

- Diferenciar o preço à vista do custo do financiamento, tanto em parcelamentos com juros quanto sem juros.  
- Exibir o **Custo Financeiro Total (CFT)** de forma destacada ao lado do preço à vista.  
  - Use uma cor em destaque e um tamanho de fonte pelo menos cinco vezes maior do que o utilizado para a TEA, o número de parcelas e seus valores.  
  - O CFT deve incluir os juros e os impostos aplicáveis (como o IVA).  
- Exibir a **Taxa Efetiva Anual (TEA)**, que mostra a diferença entre o preço à vista e o preço financiado.  
- Evitar o uso da frase *“sem juros”* ou termos semelhantes, caso o custo financeiro esteja incorporado no preço do produto ou serviço.  

Essas informações estão disponíveis nos campos da resposta da API:

- `paymentMethodFee[].pricingFees[].pricing.additionalInfo`  
- `paymentMethodFee[].pricingFees[].promos[].pricing.additionalInfo`

##### Exemplo de exibição

Ao mostrar opções de parcelamento aos clientes, inclua os seguintes elementos:

![PrintScreen](/assets/Payments/Installments_en.png)

Onde: 

| Número na tela | Opção           | Descrição                                          |
|:--------------:|-----------------|----------------------------------------------------|
|       1        | Compra total    | Valor total da compra sem financiamento.           |
|       2        | Pagamento total | Valor total financiado da compra.                  |
|       3        | Parcelas        | Número de parcelas e seus valores.                 |
|       4        | TEA             | A taxa efetiva anual de juros (TEA) aplicada.      |
|       5        | CFT             | O custo financeiro total (CFT).                    |

{{% alert title="Nota" color="info"%}}

Para parcelamentos sem juros, você ainda deve exibir TEA e CFT, mas com valores definidos em **0%**.

{{% /alert %}}

### Identificando tipos de parcelamento pela alocação de juros {#identifying-installment-types-by-interest-allocation}

A tabela abaixo mostra como identificar o tipo de parcelamento com base em como o sistema aloca os juros entre o pagador e o comerciante, usando campos da resposta da API de Pricing.

<table style="width:100%; border-collapse:collapse;">
  <thead>
    <tr>
      <th style="text-align:left;">Tipo de parcelamento</th>
      <th style="text-align:center;">Juros do pagador</th>
      <th style="text-align:center;">Juros do comerciante</th>
      <th style="text-align:left;">Quem assume os juros?</th>
      <th style="text-align:left;">Observações</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Parcelamento padrão (Sem juros)</strong></td>
      <td style="text-align:left;">
        Valores em: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> pricing.payerDetail</code> = <code>0</code><p>
        <br>No México: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.payerDetail</code> = <code>0</code>
      </td>
      <td style="text-align:left;">
        Valores em: <br>
        <code>paymentMethodFee[].pricingFees[] <br> .pricing.merchantDetail</code> = <code>0</code><p>
        <br>No México: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.merchantDetail</code> = <code>0</code><p>
      </td>
      <td>Banco (fora da API de Pricing da PayU)</td>
      <td>Sem juros do ponto de vista da PayU; quaisquer taxas vêm diretamente do banco.</td>
    </tr>
    <tr>
      <td><strong>Parcelamento padrão (Com juros)</strong></td>
      <td style="text-align:left;">
        Valores em: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> pricing.payerDetail</code> > <code>0</code><p>
        <br>No México: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.payerDetail</code> > <code>0</code><p>
      </td>
      <td style="text-align:left;">
        Valores em: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> pricing.merchantDetail</code> = <code>0</code><p>
        <br>No México: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.merchantDetail</code> = <code>0</code><p>
      </td>
      <td>Pagador</td>
      <td>O comerciante não cobre os juros.</td>
    </tr>
    <tr>
      <td><strong>Parcelamentos sem Juros Gerais</strong></td>
      <td style="text-align:left;">
        Valores em: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> pricing.payerDetail</code> = <code>0</code><p>
        <br>No México: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.payerDetail</code> = <code>0</code>
      </td>
      <td style="text-align:left;">
        Valores em: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> pricing.merchantDetail</code> > <code>0</code><p>
        <br>No México: <br>
        <code>paymentMethodFee[].pricingFees[]. <br> promos[9999].pricing.merchantDetail</code> > <code>0</code><p>
      </td>
      <td>Comerciante</td>
      <td>Aplica-se a todo o método de pagamento ou bandeira do cartão.</td>
    </tr>
  </tbody>
</table>

### Identificando Parcelamentos sem Juros Específicos

Ao consultar a Pricing API, você pode identificar um parcelamento promocional específico se o array `promos` contiver uma promoção onde:

- O **pagador** paga **0 de juros**.  
- O **comerciante** cobre todo o custo (a comissão ou juros é maior que `0`).  

Esse tipo de promoção pode se aplicar a bancos ou BINs específicos vinculados a uma determinada bandeira de cartão.

#### Validando Parcelamentos sem Juros Específicos

- Valores em `paymentMethodFee[].pricingFees[].promos[].pricing.payerDetail` = `0`  
- Valores em `paymentMethodFee[].pricingFees[].promos[].pricing.merchantDetail` > `0`  

Para entender completamente as condições de uma promoção, verifique o objeto `promotions[]` que corresponde ao ID da promoção em:  
- `paymentMethodFee[].pricingFees[].promos[].id`  

<table style="width: 60%; min-width: 300px; border-collapse: collapse;">
  <tr>
    <th colspan="2" style="text-align: left;">Campos-chave em <code>promotions[]</code> para revisar:</th>
  </tr>
  <tr>
    <td><code>promotions[].id</code></td>
    <td><code>promotions[].banksNames</code></td>
  </tr>
  <tr>
    <td><code>promotions[].title</code></td>
    <td><code>promotions[].iins</code></td>
  </tr>
  <tr>
    <td><code>promotions[].termsAndConditions</code></td>
    <td><code>promotions[].days</code></td>
  </tr>
  <tr>
    <td><code>promotions[].paymentMethod</code></td>
    <td><code>promotions[].startDate</code></td>
  </tr>
  <tr>
    <td><code>promotions[].subFranchise</code></td>
    <td><code>promotions[].endDate</code></td>
  </tr>
  <tr>
    <td><code>promotions[].priority</code></td>
    <td><code>promotions[].type</code></td>
  </tr>
</table>

{{% alert title="Importante" color="warning"%}}

Ao exibir **Parcelamentos sem Juros Específicos** no checkout, certifique-se de mostrá-los **apenas se o BIN, banco ou método de pagamento corresponder ao cartão do usuário**.  
Se você exibir uma promoção inelegível e o usuário selecioná-la, a transação será recusada porque o PayU não conseguirá encontrar uma rota de autorização válida.

{{% /alert %}}

#### Exemplo de resposta para Parcelamentos sem Juros Específicos

O exemplo a seguir ilustra como pode ser uma resposta quando uma promoção está vinculada a condições específicas como **faixas de BIN, bancos, bandeiras de cartão ou dias da semana**.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

```JSON
"promotions": [
  {
    "id": 1218,
    "title": "ABC Bank",
    "termsAndConditions": "6-month interest-free financing for cards with BIN 828076 from ABC Bank. Promotion valid from 08/20/2025 to 08/20/2025. Applies only on weekdays: Tuesday",
    "iin": [
      "828076"
    ],
    "paymentMethodMain": "VISA",
    "startDate": "2025-08-20 00:00:00",
    "endDate": "2025-08-20 23:59:00",
    "days": [
      "TUESDAY"
    ],
    "priority": 10,
    "type": "MSI"
  }
]

```
{{< /tab >}}

{{< tab tabNum="2" >}}

```XML
<promotions>
  <promotion>
    <id>1218</id>
    <title>ABC Bank</title>
    <termsAndConditions>
      6-month interest-free financing for cards with BIN 828076 from ABC Bank. Promotion valid from 08/20/2025 to 08/20/2025. Applies only on weekdays: Tuesday
    </termsAndConditions>
    <iin>
      <value>828076</value>
    </iin>
    <paymentMethodMain>VISA</paymentMethodMain>
    <startDate>2025-08-20 00:00:00</startDate>
    <endDate>2025-08-20 23:59:00</endDate>
    <days>
      <day>TUESDAY</day>
    </days>
    <priority>10</priority>
    <type>MSI</type>
  </promotion>
</promotions>
```
{{< /tab >}}

{{< /tabs >}}

##### Exibindo os termos e condições no checkout

Você pode usar o campo `termsAndConditions` para informar os detalhes dos planos de Parcelamentos sem Juros Específicos. Abaixo está um exemplo de como mostrar ao pagador as condições no checkout usando a resposta recuperada acima:

<img src="/assets/Promotions/promo4.png" style="display: block; margin: 0 auto; width: 550px;">

### Diferenciando parcelamentos padrão vs. Parcelamentos sem Juros Específicos

Ao utilizar a Pricing API, é necessário entender como o sistema diferencia parcelamentos padrão de promocionais.

Use a seguinte estrutura para identificar o tipo de parcelamento:

- `paymentMethodFee[].pricingFees[].pricing{}` → Parcelamentos padrão (sem ID de promoção)  
- `paymentMethodFee[].pricingFees[].promos[].pricing{}` → Parcelamentos vinculados a um `PROMOTION_ID` específico  

**Observações importantes**

- O array `pricingFees[]` pode incluir entradas com ou sem o objeto `pricing{}`.  
- O array `pricingFees[]` pode incluir entradas com ou sem o array `promos[]`.  
- O array `promos[]` pode conter múltiplas promoções individuais.  

Dependendo de quais elementos estão presentes, é possível determinar o tipo de parcelamento:

1. **Padrão + promocional:**  
   O plano de parcelamento inclui tanto um objeto `pricing{}` padrão quanto uma ou mais entradas no array `promos[]`.  
   **Exemplo:** Um plano de 3 parcelas Mastercard pode incluir uma opção padrão com juros, além de duas promoções diferentes sem juros direcionadas a BINs específicos.

2. **Apenas padrão:**  
   O plano de parcelamento inclui `pricing{}`, mas não contém o array `promos[]`.  
   **Exemplo:** Um plano de 6 parcelas Visa oferece apenas o preço padrão, sem promoções disponíveis.

3. **Apenas promocional:**  
   O plano de parcelamento inclui apenas o array `promos[]`, sem o objeto `pricing{}`.  
   **Exemplo:** Um plano de 3 parcelas AMEX oferece condições sem juros por meio de uma promoção que se aplica a todos os cartões AMEX, sem opção de preço padrão.

Ao verificar esses elementos na resposta da API, você pode decidir programaticamente quais promoções exibir e como processar corretamente cada parcelamento.

### Lidando com campos ausentes em promoções

Em alguns casos, promoções não incluem determinados campos. A ausência de um campo define como a promoção se aplica.

| Campo ausente | Significado |
|---------------|-------------|
| `promotions[].subFranchise` | A promoção **não** está vinculada a um cartão local (por exemplo, Naranja). Em vez disso, aplica-se a uma bandeira internacional (por exemplo, Mastercard) conforme definido em `paymentMethodMain`. |
| `promotions[].banksNames` | A promoção se aplica a **todos os bancos** para o método de pagamento, com `paymentMethodMain` tendo prioridade. |
| `promotions[].iins` | A promoção se aplica a **todos os cartões** sob o método de pagamento especificado em `paymentMethodMain`. |

### Processando uma transação com parcelamento padrão

Para processar uma transação utilizando parcelamento padrão, especifique o número de meses no campo `extraParameters`:

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON 
"extraParameters": {
    "INSTALLMENTS_NUMBER": (número de meses)
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
```XML 
<extraParameters>
    <entry>
        <string>INSTALLMENTS_NUMBER</string>
        <string>Número de meses</string>
    </entry>
</extraParameters>
```

{{< /tab >}}

{{< /tabs >}}

<br>

{{% alert title="Nota" color="info"%}}

Para criar e enviar as transações, utilize a API de Pagamentos do respectivo país:

* [Argentina]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}}) | [Brasil]({{< ref "Payments-API-Brazil.md#submit-transactions-using-credit-cards" >}}) | [Chile]({{< ref "Payments-API-Chile.md#submit-transactions-using-credit-debit-or-prepaid-cards" >}}) | [Colômbia]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}) | [México]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}})  
| [Peru]({{< ref "Payments-API-Peru.md#submit-transactions-using-credit-or-debit-cards" >}})

{{% /alert %}}

### Processando uma transação com Parcelamentos sem Juros Gerais

O plano de Parcelamentos sem Juros Gerais **não requer um** `PROMOTION_ID`. Após configurar este plano na sua conta PayU, envie a requisição com o número de meses no campo `extraParameters`:

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON 
"extraParameters": {
    "INSTALLMENTS_NUMBER": (número de meses)
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
```XML 
<extraParameters>
    <entry>
        <string>INSTALLMENTS_NUMBER</string>
        <string>Número de meses</string>
    </entry>
</extraParameters>
```

{{< /tab >}}

{{< /tabs >}}
<br>

{{% alert title="Nota" color="info"%}}

Para criar e enviar as transações, utilize a API de Pagamentos do respectivo país:

* [Argentina]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}}) | [México]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}})

{{% /alert %}}

#### Meses Sem Juros (MSI) no México

No México, o **Parcelamentos sem Juros Gerais** é comumente conhecido como **Meses Sem Juros** (Meses sin Intereses ou MSI). Essa opção permite oferecer planos de pagamento fixos (3, 6, 9, 12 ou 18 meses) sem juros.

As transações MSI utilizam a mesma estrutura de parcelamento padrão, especificando o número de meses no campo `INSTALLMENTS_NUMBER` do objeto `extraParameters`. Diferente dos parcelamentos promocionais, o MSI não requer um `PROMOTION_ID`. As durações válidas de MSI são 3, 6, 9, 12 ou 18 meses.

**Campos a verificar:**
- `paymentMethodFee[].pricingFees[].promos[9999].pricing.payerDetail` → sem juros.
- `paymentMethodFee[].pricingFees[].promos[9999].pricing.merchantDetail` → com juros.
- `promotions[9999].type` = `PRICING`

{{% alert title="Nota" color="info"%}}

Como essa promoção é do tipo `PRICING`, a PayU não exige incluir o ID da promoção `9999` para criar a transação ou autorização.

{{% /alert %}}

Após configurar este plano na sua conta PayU, envie a requisição com o número de meses no campo `extraParameters`:

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON 
"extraParameters": {
    "INSTALLMENTS_NUMBER": (número de meses)
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
```XML 
<extraParameters>
    <entry>
        <string>INSTALLMENTS_NUMBER</string>
        <string>Número de meses</string>
    </entry>
</extraParameters>
```

{{< /tab >}}
{{< /tabs >}}
<br>

##### Considerações

* Opções suportadas: 3, 6, 9, 12 ou 18 meses.
* Valores mínimos de compra:
    - 3 meses → $300 MXN
    - 6 meses → $600 MXN
    - 9 meses → $900 MXN
    - 12 meses → $1200 MXN
    - 18 meses → $1800 MXN
* O MSI está disponível nos seguintes bancos: BANAMEX, BANCO REGIONAL DE MONTERREY S.A, BANCOPPEL, BANCO AZTECA, SCOTIABANK, HSBC, INBURSA, BANCA MIFEL SA, BANCO MULTIVA, BAJIO, CI BANCO, Afirme, Banregio, Banjercito, Banorte, Famsa, Invex, Premium Card Liverpool, Santander e Bancomer.
* Ao usar a promoção, sempre exiba a frase **MESES SIN INTERESES** durante o processo de pagamento. Para parcelamentos padrão (sem promoções), utilize **PAGOS DIFERIDOS**.

{{% alert title="Notas" color="info"%}}

* Para habilitar planos MSI na sua conta, entre em contato com o seu representante de vendas.

* Para mais detalhes, consulte a [API de Pagamentos para México]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}}).

{{% /alert %}}

#### Identificando planos de Parcelamento sem Juros Gerais vs. Específicos no México

Como a API trata **Parcelamentos sem Juros Gerais** de forma diferente no México, você pode confundi-los com **Parcelamentos sem Juros Específicos**. Use o campo `promotions[].type` na resposta da API para diferenciá-los:

| Tipo de parcelamento | `promotions[].type` | Descrição | 
|:--------------------:|---------------------|---------------------------------------------------|
| Parcelamentos sem Juros Específicos | `MSI` | O termo MSI é comum no México, mas a API retorna `MSI` para todos os países que oferecem Parcelamentos sem Juros Específicos: Argentina, Colômbia, Peru e México. |
| Parcelamentos sem Juros Gerais **(México)** | `PRICING` | No México, a API usa `PRICING` para Parcelamentos sem Juros Gerais, mesmo que sejam conhecidos localmente como Meses Sem Juros (MSI). |

### Processando uma transação com Parcelamentos sem Juros Específicos

Ao usar um plano de Parcelamentos sem Juros Específicos, inclua tanto o `PROMOTION_ID` quanto o `INSTALLMENTS_NUMBER` dentro do objeto `extraParameters` na sua requisição:

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON  
"extraParameters": {
    "INSTALLMENTS_NUMBER": (número de parcelas),
    "PROMOTION_ID": (ID da promoção selecionada)
}
```  

{{< /tab >}}

{{< tab tabNum="2" >}}
```XML  
<extraParameters>
    <entry>
        <string>INSTALLMENTS_NUMBER</string>
        <string>Número de parcelas</string>
    </entry>
    <entry>
        <string>PROMOTION_ID</string>
        <string>ID da promoção selecionada</string>
    </entry>
</extraParameters>
```  

{{< /tab >}}
{{< /tabs >}}
<br>

{{% alert title="Nota" color="info"%}}

Para criar e enviar as transações, use a API de Pagamentos do país correspondente:

* [Argentina]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}}) | [Colômbia]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}) | [México]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}})
| [Peru]({{< ref "Payments-API-Peru.md#submit-transactions-using-credit-or-debit-cards" >}})

{{% /alert %}}

### Processando transações com parcelamentos via PayU Enterprise

Ao integrar o **PayU Enterprise** com a **API de Pricing do PayU Latam**, você pode encontrar diferenças em convenções de nomenclatura, estruturas e mapeamento de campos.  
Para garantir que os planos de parcelamento e promoções sejam exibidos e aplicados corretamente, você precisa:

1. **Validar separadores decimais** para manter consistência no formato entre as APIs.  
2. **Mapear bandeiras de cartão** para alinhar convenções de nomenclatura.  
3. **Relacionar promoções** com os dados corretos do cartão ou banco usando BINs, nomes de bancos ou métodos de pagamento.  
4. **Opcional:** Suportar cartões tokenizados exibindo as opções de parcelamento.  
5. **Opcional:** Enviar dados em requisições de cobrança para roteamento de transações na Argentina.  

As seções a seguir descrevem esses requisitos em detalhe.

#### Formatando Valores Entre PayU Enterprise e PayU Latam

Ao recuperar valores da **API do PayU Enterprise**, assegure-se de que a formatação decimal seja compatível com a **API de Pricing**. Formate os valores da seguinte forma:

* Use no máximo duas casas decimais.  
* Remova quaisquer separadores desnecessários.  

**Exemplos de formatação válida na API de Pricing:**

* Enviar **$1000** como `1000.00` ou `1000`.  
* Enviar **$50.25** como `50.25`.  

Além disso, garanta o mapeamento correto ao trabalhar com campos relacionados entre as duas APIs:

- No **PayU Enterprise**:  
  - `order > tax_amount`  
  - `order > sub_total`  

<p>

- Na **API de Pricing do PayU Latam**:  
  - `tax`  
  - `taxReturnBase`  

{{% alert title="Nota" color="info"%}}

Os parâmetros `tax` e `taxReturnBase` só são aplicáveis na **Argentina** e na **Colômbia**.

{{% /alert %}}

#### Mapeando bandeiras de cartão

As bandeiras de cartão podem ter nomes diferentes na API de Pricing e no PayU Enterprise. Para que as opções de parcelamento sejam exibidas corretamente, faça o mapeamento dos valores entre os dois sistemas.

**Considerações:**
* A **API de Pricing** retorna a bandeira do cartão no campo `paymentMethodFee > paymentMethod`.  
* A **API do PayU Enterprise** retorna a bandeira do cartão no campo `vendor`.  

A tabela abaixo mostra o mapeamento entre as duas fontes:

| API de Pricing (`paymentMethodFee > paymentMethod`) | PayU Enterprise (`vendor`) | Observações |
| --- | --- | --- |
| `AMEX` | `AMERICAN EXPRESS` | Mesma bandeira, nomenclatura diferente |
| `ARGENCARD` | `ARGENCARD` | Idêntico |
| `CABAL` | `CABAL` | Idêntico |
| `CENCOSUD` | `CENCOSUD CARD` | Mesma bandeira, sufixo “CARD” no PayU Enterprise |
| `DINERS` | `DINERS CLUB INTERNATIONAL` | Mesma bandeira, nome completo no PayU Enterprise |
| `ELO` | `ELO` | Idêntico |
| `MASTERCARD` | `MASTERCARD` | Idêntico |
| `NARANJA` | `NARANJA CARD` | Mesma bandeira, sufixo “CARD” no PayU Enterprise |
| `VISA` | `VISA` | Idêntico |

#### Relacionando uma promoção com o cartão do usuário

O nome do emissor do token retornado pelo PayU Enterprise pode não coincidir exatamente com o nome do banco listado no array `promotions[]` da API de Pricing.

Para garantir uma correspondência precisa, recomenda-se validar promoções usando o BIN (IIN) definido na promoção.  

Ao exibir opções de parcelamento no checkout para promoções baseadas em parcelamento, siga a sequência de validação abaixo:

| Etapa | Condição | Regra de validação | Campos da API a verificar |
| --- | --- | --- | --- |
| **1** | `promotions[].iin` presente | Corresponder o BIN (IIN) do usuário a um dos valores em `promotions[].iin`. | `promotions[].iin` |
| **2** | Nenhum BIN especificado | Corresponder o banco do usuário a um dos valores em `promotions[].banksNames`. | `promotions[].banksNames` |
| **3** | Nenhum banco especificado | Corresponder a bandeira do cartão ao método de pagamento da promoção. | `paymentMethodFee[].paymentMethod` |

#### Opcional: Cartões tokenizados e opções de parcelamento

Ao usar tokenização de cartão, você pode exibir as opções de parcelamento seguindo este fluxo:

1. Solicitar os dados do cartão ao usuário  
2. Tokenizar o cartão  
3. Consultar a API de Pricing  
4. Exibir as opções de parcelamento disponíveis  

**Exemplo de exibição 1**

O usuário informa os dados do cartão e o checkout exibe as opções de parcelamento disponíveis:

![PrintScreen](/assets/Promotions/promo6.png)

**Exemplo de exibição 2**

O checkout inclui dois botões: um para pagar à vista e outro para pagar parcelado.

![PrintScreen](/assets/Promotions/promo7.png)

{{% alert title="Nota" color="info"%}}

Assegure-se de cumprir com as regulamentações locais no país onde você opera. Seu checkout deve exibir todas as informações exigidas pelas autoridades.

{{% /alert %}}

#### Opcional: Envio de dados em requisições de cobrança para roteamento de transações (Argentina)

Ao processar transações na **Argentina**, inclua campos específicos na requisição de **Cobrança** para garantir o roteamento correto através do motor de decisão da PayU. Ao enviar esses dados, o sistema pode direcionar a transação para a conta correta, especialmente em promoções com parcelamento sem juros.  

##### Campos obrigatórios

- **Account ID**: O ID da conta da qual você recuperou a promoção usando a **API de Pricing**.  
- **Parcelas**: A opção de parcelamento que o usuário selecionou no checkout.  
- **Promotion ID**: O ID da promoção associada à opção de parcelamento selecionada.  

##### Configuração de roteamento

Para rotear transações corretamente:  
1. Configure um novo provedor usando a conta que oferece **parcelamentos sem juros** (essa conta segue um modelo de liquidação diferente da conta padrão).  
2. Crie uma regra de roteamento no motor de decisão, conforme mostrado na imagem de exemplo.  

<img src="/assets/Promotions/promo8.png" style="display: block; margin: 0 auto; width: 550px;">

{{% alert title="Nota" color="info"%}}

A PayU pode ajudá-lo na configuração da regra de roteamento.

{{% /alert %}}

##### Caminhos de campos da API

Use os seguintes caminhos da API ao enviar dados em uma requisição de **Cobrança** ou **Autorização**:

- Parcelas (seleção do usuário):  
  `installments.number_of_installments`
- Parcelas (roteamento no motor de decisão):  
  `additional_details.number_of_installments`
- Promotion ID (específico do provedor):  
  `provider_specific_data.payu_latam.additional_details.promotion_id`
- Promotion ID (roteamento no motor de decisão):  
  `additional_details.promotion_id`
- Account ID (roteamento por conta Latam):  
  `additional_details.account_id`
