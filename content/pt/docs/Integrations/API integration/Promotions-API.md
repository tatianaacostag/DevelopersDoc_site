---
title: "API de Promoções"
linkTitle: "API de Promoções"
date: 2021-06-29T12:38:41-05:00
description: >
    A API de Promoções permite que você consulte as promoções disponíveis, incluindo seus custos associados, características e outros detalhes relevantes para seus clientes.
weight: 50
tags: ["subtopic"]
---

A API de Promoções está disponível nos seguintes países:

<table style="width: 50%; min-width: 300px; border-collapse: collapse;">
    <tr>
        <th style="width: 40%; text-align: left;">País</th>
        <th style="width: 30%; text-align: center;">Promoções</th>
        <th style="width: 30%; text-align: center;">Meses Sem Juros (MSI)</th>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Argentina.png" width="25px"/> &nbsp;Argentina</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Colombia.png" width="25px"/> &nbsp;Colômbia</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Mexico.png" width="25px"/> &nbsp;México</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
    </tr>
    <tr>
        <td style="text-align: left;"><img src="/assets/Peru.png" width="25px"/> &nbsp;Peru</td>
        <td style="text-align: center;"><span style="color: #008000; font-size: 20px; font-weight: bold;">✓</span></td>
        <td style="text-align: center;"><span style="color: red; font-size: 16px;">❌</span></td>
    </tr>
</table>

{{% alert title="Observação" color="info"%}}

Para configurar parcelamentos e promoções com base nos seus acordos com as entidades bancárias, entre em contato com seu representante de vendas.

{{% /alert %}}

## Promoções {#promotions}

Use este recurso para consultar promoções ativas através da API e obter informações detalhadas para personalizar a experiência de compra dos seus clientes.

Cada promoção inclui os métodos de pagamento aplicáveis, os dias da semana elegíveis, uma lista dos bancos participantes e suas datas de início e término.

### Autenticação para promoções {#authentication-for-promotions}

Para autenticar as requisições da API, é necessário usar um mecanismo baseado em HMAC. Você precisa da sua `MerchantPublicKey`, que pode ser encontrada no seu Painel de Gerenciamento PayU em **_Configuração_** > **_Configuração técnica_** > **_Chave pública_**.

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

### Consulte as promoções disponíveis {#querying-available-promotions}

Para recuperar promoções, envie uma requisição `GET` para a URL apropriada com base no ambiente.

{{% alert title="Endpoints da API" color="info"%}}

* Teste: ```GET https://sandbox.api.payulatam.com/payments-api/rest/v4.9/pricing```
* Produção: ```GET https://api.payulatam.com/payments-api/rest/v4.9/pricing```

{{% /alert %}}

Como este é um serviço RESTful, recomendamos fortemente evitar a validação estrita do esquema. Evitar a validação do esquema garante uma integração mais suave, minimizando mudanças quando atualizações são feitas no Web Service.

#### Parâmetros da requisição e resposta {#parameters-for-request-and-response}

<details>

<summary>Parâmetros da requisição</summary>

<br>

<div class="variables"></div>

| Parâmetro | Descrição | Obrigatório |
|-|-|:-:|
| `accountId` | Identificador único da sua conta. | Sim |
| `currency` | Moeda associada à sua conta. | Não |
| `amount` | Valor total da compra. | Sim |
| `paymentMethod` | Parâmetro opcional para filtrar promoções por meio de pagamento. | Não |
| `tax` | Valor do imposto incluído na transação. Aplicável apenas na Argentina e na Colômbia. | Não |
| `taxReturnBase` | Valor base utilizado para calcular o imposto. Aplicável apenas na Argentina e na Colômbia. | Não |

</details>

<details>

<summary>Parâmetros de resposta</summary>

<br>

<div class="variables"></div>

| Nome do Campo | Tipo | Descrição |
|---------------|------|-----------|
| `amount` | Objeto | Detalhes do valor da transação. |
| `amount` > `value` | Número | Valor total da transação. |
| `amount` > `tax` | Número | Valor do imposto incluído na transação. |
| `amount` > `purchaseValue` | Número | Valor da compra antes dos impostos. |
| `amount` > `currency` | String | Código da moeda da transação original. |
| `amount` > `taxableBase` | Número | Valor da transação usado como base para o cálculo do imposto. |
| `convertedAmount` | Objeto | Contém o valor da transação convertido em outra moeda (se aplicável). |
| `convertedAmount` > `value` | Número | Valor total convertido da transação. |
| `convertedAmount` > `tax` | Número | Valor convertido do imposto. |
| `convertedAmount` > `purchaseValue` | Número | Valor convertido da compra antes dos impostos. |
| `convertedAmount` > `currency` | String | Código da moeda do valor convertido. |
| `convertedAmount` > `taxableBase` | Número | Valor convertido usado como base para o cálculo do imposto. |
| `paymentMethodFee` | Lista | Contém o detalhamento dos custos assumidos pelo vendedor com base no meio de pagamento. |
| `paymentMethodFee` > `paymentMethod` | String | Nome do meio de pagamento. |
| `paymentMethodFee` > `pricingFees` | Objeto | Contém os detalhes de precificação por meio de pagamento e faixa de parcelas. |
| `paymentMethodFee` > `pricingFees` > `installments` | String | Número de parcelas, podendo ser um valor único (ex.: `1`) ou, para países aplicáveis, um intervalo (ex.: `1-36`). |
| `paymentMethodFee` > `pricingFees` > `pricing` | Objeto | Contém os detalhes de precificação da transação. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` | Objeto | Detalhamento de juros e taxas cobrados do pagador. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` > `commission` | Número | Valor total da taxa (incluindo impostos) cobrada do pagador. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` > `interests` | Número | Total de juros (incluindo impostos) cobrados do pagador. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `payerDetail` > `total` | Número | Valor total a ser pago pelo pagador, incluindo juros e taxas. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` | Objeto | Detalhamento de juros e taxas cobrados do vendedor. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` > `commission` | Número | Valor total da taxa (incluindo impostos) cobrada do vendedor. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` > `interests` | Número | Total de juros (incluindo impostos) cobrados do vendedor. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `merchantDetail` > `total` | Número | Custo total para o vendedor, incluindo juros e taxas. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `totalValue` | Número | Valor total da transação incluindo juros e taxas. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `totalIncomeTransaction` | Número | Receita total gerada pela transação. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `additionalInfo` | Objeto | Inclui informações financeiras como a Taxa Efetiva Anual (TEA) e o Custo Financeiro Total (CFT). Aplicável apenas à Argentina. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `additionalInfo` > `cft` | Número | Custo Financeiro Total (CFT) aplicado à transação. |
| `paymentMethodFee` > `pricingFees` > `pricing` > `additionalInfo` > `tea` | Número | Taxa Efetiva Anual (TEA) aplicada à transação. |
| `paymentMethodFee` > `pricingFees` > `promos` | Array | Lista de promoções disponíveis aplicáveis à configuração de preços. |
| `paymentMethodFee` > `pricingFees` > `promos` > `id` | Inteiro | Identificador único da promoção no sistema PayU. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` | Objeto | Contém os detalhes de precificação da promoção específica. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` | Objeto | Detalhamento de juros e taxas para o pagador sob a promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` > `commission` | Número | Valor da comissão cobrada do pagador sob a promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` > `interests` | Número | Valor dos juros cobrados do pagador sob a promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `payerDetail` > `total` | Número | Valor total a ser pago pelo pagador, incluindo juros e taxas, sob a promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` | Objeto | Detalhamento de juros e taxas para o vendedor sob a promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` > `commission` | Número | Valor da comissão cobrada do vendedor sob a promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` > `interests` | Número | Valor dos juros cobrados do vendedor sob a promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `merchantDetail` > `total` | Número | Custo total para o vendedor, incluindo juros e taxas, sob a promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `totalValue` | Número | Valor total da transação com juros e taxas sob a promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `pricing` > `totalIncomeTransaction` | Número | Receita total gerada pela transação sob a promoção. |
| `paymentMethodFee` > `pricingFees` > `promos` > `priority` | Número | Nível de prioridade da promoção dentro da configuração de preços. |
| `promotions` | Objeto | Contém os detalhes de qualquer promoção aplicada. |
| `promotions` > `id` | Inteiro | Identificador único da promoção no sistema PayU. |
| `promotions` > `title` | String | Título da promoção (máximo de 50 caracteres). |
| `promotions` > `termsAndConditions` | String | Termos e condições aplicáveis à promoção (máximo de 250 caracteres). |
| `promotions` > `paymentMethod` | String | Meio de pagamento associado à promoção. |
| `promotions` > `subFranchise` | String | Submarca ou sub-franquia associada à promoção. |
| `promotions` > `banksNames` | Lista | Lista de bancos nos quais a promoção é válida. |
| `promotions` > `iins` | Lista | Lista de números IIN/BIN dos cartões elegíveis para a promoção. |
| `promotions` > `days` | Lista | Dias da semana em que a promoção está disponível. |
| `promotions` > `startDate` | Datetime | Data e hora de início da promoção. |
| `promotions` > `endDate` | Datetime | Data e hora de término da promoção. |
| `promotions` > `priority` | Número | Nível de prioridade da promoção. |
| `promotions` > `type` | String | Tipo da promoção. Os valores possíveis são:<br><br>**PRICING** – A promoção é aplicada automaticamente com base nas regras de precificação configuradas. Por exemplo, no México, se parcelas sem juros estiverem configuradas, o vendedor só precisa enviar o número de parcelas em `transaction > extraParameters > INSTALLMENTS_NUMBER`. O sistema aplicará automaticamente as condições sem juros, sem necessidade de enviar um ID de promoção.<br><br>**MSI** – Requer que o vendedor envie explicitamente tanto o ID da promoção quanto o número de parcelas. Isso se aplica quando a promoção deve corresponder a uma combinação específica de meio de pagamento, número de parcelas e ID de promoção. Para aplicar esse tipo, os seguintes campos devem ser enviados:<br>- `transaction > extraParameters > INSTALLMENTS_NUMBER`<br>- `transaction > extraParameters > PROMOTION_ID`<br><br>**Nota:** Se o ID da promoção não for informado quando necessário, a transação será processada sem a promoção, utilizando as regras de precificação padrão disponíveis para a opção de parcelamento selecionada. |
| `paymentTaxesDetails` | Objeto | Contém os detalhes sobre os impostos aplicados (estrutura depende da resposta do serviço de impostos). |
| `taxesServiceFailed` | Booleano | Indica se houve falha no serviço de cálculo de impostos. |

</details>

#### Chamada da API {#api-call}

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
<consultPriceListaResponse xmlns:atom="http://www.w3.org/2005/Atom" xmlns:ns3="http://wadl.dev.java.net/2009/02">
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
</consultPriceListaResponse>
```
{{< /tab >}}
{{< /tabs >}}

### Executando uma transação com promoções {#executing-a-transaction-with-promotions}

Depois de selecionar uma promoção, inclua `PROMOTION_ID` e `INSTALLMENTS_NUMBER` como parâmetros extras na sua requisição:

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
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

Para mais detalhes sobre a inclusão desses parâmetros extras, consulte a documentação correspondente da API de Pagamentos para o seu país:

* [Argentina]({{< ref "Payments-API-Argentina.md#submit-transactions-using-credit-or-debit-cards" >}}) 
* [Colômbia]({{< ref "Payments-API-Colombia.md#submit-transactions-using-credit-or-debit-cards" >}}) 
* [México]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}})
* [Peru]({{< ref "Payments-API-Peru.md#submit-transactions-using-credit-or-debit-cards" >}}) 

{{% /alert %}}

## Meses sem Juros (MSI - Meses Sin Intereses){#msi}

Para contas no México, você pode oferecer aos clientes a opção de pagar em um número determinado de parcelas sem juros. Para ativar essa funcionalidade, entre em contato com seu representante de vendas.

### Considerações {#considerations}

* Opções de parcelamento disponíveis: 3, 6, 9, 12 ou 18 meses.
* Valores mínimos de compra exigidos para MSI:
    - 3 meses → $300 MXN
    - 6 meses → $600 MXN
    - 9 meses → $900 MXN
    - 12 meses → $1200 MXN
    - 18 meses → $1800 MXN
* MSI está disponível com os seguintes bancos: BANAMEX, BANCO REGIONAL DE MONTERREY S.A, BANCOPPEL, BANCO AZTECA, SCOTIABANK, HSBC, INBURSA, BANCA MIFEL SA, BANCO MULTIVA, BAJIO, CI BANCO, Afirme, Banregio, Banjercito, Banorte, Famsa, Invex, Premium Card Liverpool, Santander e Bancomer.
* Ao usar MSI, sempre exiba a frase **"PAGOS DIFERIDOS"** durante o processo de pagamento.


### Parâmetros da requisição para MSI {#msi-request-parameters} 

Para aplicar MSI, inclua o número de meses no campo `extraParameters`:

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

Para mais detalhes sobre o uso de MSI, consulte a [API de Pagamentos para o México]({{< ref "Payments-API-Mexico.md#submit-transactions-using-credit-or-debit-cards" >}}).