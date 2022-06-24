---
title: "Implementar na produção"
linkTitle: "Implementar na produção"
date: 2021-04-07T08:24:15-05:00
Description: >
 Depois de realizar todos os testes do sistema e verificar se tudo está funcionando corretamente, você pode mudar para o servidor de produção, onde as transações reais são processadas.
weight: 50
---

Para passar para a produção de acordo com a integração que você usa, você precisa criar as formas de pagamento com alguns parâmetros de sua conta e direcionadas para a URL de produção.

## Passe para a produção usando a integração WebCheckout {#step-over-to-production-using-webcheckout-integration}
Inclua os seguintes parâmetros em seus formulários de pagamento:

| Parâmetro     | Descrição                                                                                                    |
|---------------|--------------------------------------------------------------------------------------------------------------|
| merchantId    | ID da sua loja no PayU Latam.                                                                                |
| ApiKey        | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| referenceCode | Referência de venda única para cada transação. Este valor é gerado por você.                                 |
| accountId     | ID da conta PayU de acordo com o país onde você quer vender.                                                 |
| description   | Descrição da venda que você está realizando.                                                                 |
| amount        | Valor total da venda que você está realizando.                                                               |
| tax           | Valor do imposto da venda que você está realizando.                                                          |
| taxReturnBase | Base da declaração de imposto de renda da venda que você está realizando.                                    |
| currency      | Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). |
| signature     | A assinatura é uma forma única de validar os pagamentos efetuados na plataforma, garantindo sua autenticidade. <br>Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}).       |
| test          | Definir `0` para transações processadas no ambiente de Produção.                                             |
| buyerEmail    | Endereço de e-mail do comprador.                                                                             |

Direcione sua solicitação para a seguinte URL:

```HTML
https://checkout.payulatam.com/ppp-web-gateway-payu
```

## Passe para a produção usando a integração API {#step-over-to-production-using-api-integration}
Inclua os seguintes parâmetros em seus formulários de pagamento:

| Parâmetro     | Descrição                                                                                                   |
|---------------|-------------------------------------------------------------------------------------------------------------|
| merchantId    | ID da sua loja no PayU Latam.                                                                               |
| ApiKey        | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| ApiLogin      | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| accountId     | ID da conta PayU de acordo com o país onde você quer vender.                                                |
| signature     | A assinatura é uma forma única de validar os pagamentos efetuados na plataforma, garantindo sua autenticidade.<br>Para obter mais informações, consulte [Assinatura de autenticação]({{< ref "integrations.html#authentication-signature" >}}).            |
| test          | Definir `false` para transações processadas no ambiente de Produção.                                        |

Direcione sua solicitação para a seguinte URL:

```HTML
Consultas: https://api.payulatam.com/reports-api/4.0/service.cgi
Payments: https://api.payulatam.com/payments-api/4.0/service.cgi
```

## Passe para a produção usando a integração SDK {#step-over-to-production-using-sdk-integration}
Inclua os seguintes parâmetros em seus formulários de pagamento:

| Parâmetro     | Descrição                                                                                                 |
|---------------|-------------------------------------------------------------------------------------------------------------|
| merchantId    | ID da sua loja no PayU Latam.                                                                          |
| ApiKey        | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| ApiLogin      | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| accountId     | ID da conta PayU de acordo com o país onde você quer vender.                                     |
| test          | Definir `false` para transações processadas no ambiente de Produção.                                        |

Direcione sua solicitação para a seguinte URL:

{{< tabs tabTotal="2" tabID="1" tabName1="Java" tabName2="PHP" >}}
{{< tab tabNum="1" >}}
```Java
PayU.paymentsUrl = “https://api.payulatam.com/payments-api/”;
PayU.reportsUrl = “https://api.payulatam.com/reports-api/”;
```
{{< /tab >}}

{{< tab tabNum="2" >}}
```PHP
Environment::setPaymentsCustomUrl(“https://api.payulatam.com/payments-api/4.0/service.cgi”);
Environment::setReportsCustomUrl(“https://api.payulatam.com/reports-api/4.0/service.cgi”);
```
{{< /tab >}}
{{< /tabs >}}
