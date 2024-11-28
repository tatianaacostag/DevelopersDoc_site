---
title: "Companhias Aéreas e Agências de Viagem - Colômbia"
date: 2024-11-26T12:15:57-05:00
description: >
  Este documento explica como companhias aéreas e agências de viagem na Colômbia podem usar a integração WebCheckout para processar pagamentos de forma segura e eficiente. Caso você tenha uma integração via API, consulte [API de Pagamentos para companhias aéreas e agências de viagem](https://developers.payulatam.com/latam/en/docs/integrations/api-integration/payments-api-colombia.html#process-payments-as-an-airline-or-travel-agency).
weight: 50
tags: ["subtopic"]
---

## Considerações:

* Disponível exclusivamente na Colômbia para transações em moeda COP.
* Permite o processamento de pagamentos por meio do modelo TSP/Gateway.
* Requer o registro de códigos IATA junto aos adquirentes.
* Suporta pagamentos com cartões de crédito ou débito, incluindo Amex, Diners, Mastercard e Visa.
* Permite dispersão de fundos, possibilitando que agências de viagem e companhias aéreas recebam seus pagamentos na mesma transação.
* Requer processamento em uma única etapa: o sistema transfere os fundos da conta do cliente para o banco adquirente assim que o pagamento é autorizado.

## Funcionalidades da Integração:

Essa integração simplifica o processo de pagamento para companhias aéreas e agências de viagem na Colômbia, permitindo que elas enviem informações essenciais com cada transação para identificação precisa e distribuição de fundos. Além disso, o envio de detalhes específicos da transação pode qualificá-lo para isenção do imposto de 4 x 1000 (confirme com o banco adquirente).

| **Funcionalidade** | **Companhias Aéreas** | **Agências de Viagem** |
|-|-|-|
| **Inclusão de Taxas** | As companhias aéreas podem enviar seu ID, junto com tarifas aeroportuárias e outros impostos associados. | As agências podem incluir suas taxas de transação, taxas aéreas, tarifas aeroportuárias, administrativas e outros encargos. |
| **Identificação** | Os adquirentes podem identificar a companhia aérea especificamente através do ID para distribuição direcionada. | Permite que o adquirente identifique tanto a agência de viagem quanto a companhia aérea para uma distribuição precisa de fundos. |
| **Elegibilidade para Isenção do Imposto de 4 x 1000** | Companhias aéreas na Colômbia podem se qualificar se fornecerem seu ID e as informações relevantes sobre as taxas. | Agências de viagem na Colômbia podem se qualificar se fornecerem detalhes abrangentes da transação. |

{{% alert title="Nota" color="info"%}}

Verifique com seu banco adquirente se sua empresa atende aos requisitos para a isenção do imposto de 4 x 1000. A elegibilidade depende das informações fornecidas em cada transação e das regulamentações vigentes.

{{% /alert %}}

## Etapas de Integração

1. Obtenha a lista de companhias aéreas disponíveis.
2. Crie o formulário WebCheckout, incluindo o código da companhia aérea e tarifas e impostos aeroportuários.

### 1) Obtenha a Lista de Companhias Aéreas Disponíveis

Para integrar-se à PayU, companhias aéreas e agências de viagem precisam obter a lista de códigos válidos de companhias aéreas para cobrança e incluí-los no WebCheckout. Isso pode ser feito consultando o sistema da PayU para obter uma lista das companhias aéreas disponíveis e seus códigos correspondentes. O endpoint para recuperação dos códigos é o mesmo para ambos os tipos de comerciantes, embora o uso possa variar:
  
- **Companhias Aéreas**:
  - Obtêm e enviam seus próprios códigos para habilitar identificação precisa e possíveis benefícios fiscais.
  - Fornecendo o código, garantem transações otimizadas para suas taxas e encargos associados.

- **Agências de Viagem**:
  - Obtêm o código da companhia aérea associado a cada pagamento para garantir a alocação correta de taxas e impostos.
  - Essa integração ajuda a identificar a companhia aérea envolvida na transação para distribuição adequada dos fundos.

#### Etapas para Obter a Lista

1. Utilize os seguintes endpoints conforme o ambiente:

- **Sandbox**: `https://sandbox.api.payulatam.com/payments-api/rest/v4.3/payments/airline`
- **Produção**: `https://api.payulatam.com/payments-api/rest/v4.3/payments/airline`

2. Inclua o seguinte parâmetro de consulta na solicitação:

| **Parâmetro de Consulta** | **Descrição** |
|-|-|
| `accountID` | O identificador único atribuído pela PayU Latam à sua conta de comerciante. |

3. Inclua o seguinte cabeçalho para autenticação:

| **Parâmetro de Cabeçalho** | **Descrição** |
|-|-|
| `Authorization` | Valor do cabeçalho de autenticação para realizar uma solicitação `get` válida. |

**Exemplo de código em JavaScript para gerar o cabeçalho de autenticação:**

```javascript
var contentToSign = "pRRXKOl8ikMmt9u" + ":" + "4Vj8eK4rloUd272L48hsrarnUA";
var base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(contentToSign));
var authenticationHeader = "Basic " + base64.toString();
```

{{% alert title="Nota" color="info"%}} 

Os códigos de companhias aéreas são geralmente estáveis, mas podem mudar ocasionalmente. Recomendamos consultar a API periodicamente para garantir precisão. 

{{% /alert %}}

#### Exemplo de uma Resposta:

A resposta será um payload JSON ou XML contendo um array de companhias aéreas com seus respectivos códigos e descrições.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

```JSON
{
  "airlines": [
    {
      "code": "81",
      "description": "AVIA MARKETING LTDA NAL Nacional"
    },
    .
    .
    .
    {
      "code": "65",
      "description": "OCEANAIR LINHAS AEREAS S.A Nacional"
    }
  ]
}
```
<br>

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

```XML
<com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlinesListResponse>
 <airlines>
 <com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 <code>80</code>
 <description>AVIATUR S.A. BOG Internacional</description>
 </com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 .
 .
 .
 <com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 <code>87</code>
 <description>LAN AIRLINES Nacional</description>
 </com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlines>
 </airlines>
</com.pagosonline.ppp4.web.payments.api.v4.model.ApiAirlinesListResponse>
```

{{< /tab >}}

{{< /tabs >}}

### 2) Crie o Formulário WebCheckout
 
Esta etapa envolve redirecionar seus clientes para a página de pagamento segura da PayU, onde eles podem escolher o método de pagamento preferido e concluir a compra. Para isso, basta adicionar o código da companhia aérea obtido na etapa anterior, juntamente com taxas aeroportuárias e impostos, como campos ocultos no formulário de pagamento.

#### Formulário de Pagamento para Companhias Aéreas

Inclua os parâmetros específicos para companhias aéreas, além dos parâmetros padrão para o <a href="https://developers.payulatam.com/latam/pt/docs/integrations/webcheckout-integration/payment-form.html" target="_blank">formulário de pagamento</a>.

| Campo | Tipo | Tamanho | Descrição | Exemplo  |
|---|---|---|---|---|
| airline | Alfanumérico | 4 | Código da companhia aérea | 29 |
| amount | Numérico | 10.2 | Valor total da transação. Pode conter duas casas decimais. Exemplo: 10000.00 ou 10000. | 119000 |
| tax | Numérico | 10.2 | Valor do IVA da transação. Na Colômbia, se o IVA não for especificado, o sistema aplica 19%. Este valor pode incluir duas casas decimais, como 19000.00. Se o produto ou serviço for isento de IVA, atribua 0 a esta variável. | 19000 |
| taxReturnBase | Numérico | 10.2 | Valor base para calcular o IVA. Se o produto ou serviço for isento de IVA, atribua 0 a esta variável. | 100000 |
| additionalValue | Numérico | 10.2 | Taxas aeroportuárias e outros impostos. | 25000 |


##### Exemplo de Formulário WebCheckout

Abaixo, um exemplo do formulário WebCheckout:

```HTML
<form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
 <input name="merchantId" type="hidden" value="508029">
 <input name="accountId" type="hidden" value="513128">
 <input name="description" type="hidden" value="Flight 12345">
 <input name="referenceCode" type="hidden" value="PNR-123">
 <input name="airline" type="hidden" value="29" >
 <input name="amount" type="hidden" value="119000">
 <input name="tax" type="hidden" value="19000">
 <input name="taxReturnBase" type="hidden" value="100000">
 <input name="additionalValue" type="hidden" value="25000">
 <input name="currency" type="hidden" value="COP" >
 <input name="algorithmSignature" type="hidden" value="SHA256">
 <input name="signature" type="hidden" value="b94d73892255c4f53af4282e3a5b6551526a922f1fcf1412fafa6bdf8bbe32f0">
 <input name="buyerEmail" type="hidden" value="pruebas@payulatam.com">
 <input name="responseUrl" type="hidden" value="http://www.mysite.com/response-page">
 <input name="confirmationUrl" type="hidden" value="http://www.mysite.com/confirmation-page">
 <input name="test" type="hidden" value="0">
 <input name="Submit" type="submit" value="Send">
</form>
 ```

 #### Formulário de Pagamento para Agências de Viagens

Inclua os parâmetros específicos para agências de viagens, além dos parâmetros padrão para o <a href="https://developers.payulatam.com/latam/pt/docs/integrations/webcheckout-integration/payment-form.html" target="_blank">formulário de pagamento</a>.

| Campo | Tipo | Tamanho | Descrição | Exemplo  |
|---|---|---|---|---|
| airline | Alfanumérico | 4 | Código da companhia aérea | 29 |
| amount | Numérico | 10.2 | Valor total da transação. Pode conter duas casas decimais. | 119000 |
| tax | Numérico | 10.2 | Valor do IVA da transação. Na Colômbia, se o IVA não for especificado, o sistema aplica 19%. Este valor pode incluir duas casas decimais, como 19000.00. Se o produto ou serviço for isento de IVA, atribua 0 a esta variável. | 19000 |
| taxReturnBase | Numérico | 10.2 | Valor base para calcular o IVA. Se o produto ou serviço for isento de IVA, atribua 0 a esta variável. | 100000 |
| additionalValue | Numérico | 10.2 | Taxas aeroportuárias e outros impostos da companhia aérea. | 25000 |
| administrativeFee | Numérico | 10.2 | Valor da taxa administrativa da agência de viagens. | 5950     |
| taxAdministrativeFee | Numérico | 10.2 | Valor do imposto sobre a taxa administrativa da agência de viagens. | 950 |
| taxAdministrativeFeeReturnBase | Numérico | 10.2 | Valor base para calcular o imposto da taxa administrativa. | 5000 |


##### Exemplo de Formulário WebCheckout

Abaixo, um exemplo do formulário WebCheckout:

```HTML
<form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
 <input name="merchantId" type="hidden" value="508029">
 <input name="accountId" type="hidden" value="513128">
 <input name="description" type="hidden" value="Flight 12345">
 <input name="referenceCode" type="hidden" value="PNR-123">
 <input name="airline" type="hidden" value="29" >
 <input name="amount" type="hidden" value="119000">
 <input name="tax" type="hidden" value="19000">
 <input name="taxReturnBase" type="hidden" value="100000">
 <input name="additionalValue" type="hidden" value="25000">
 <input name="administrativeFee" type="hidden" value="5950">
 <input name="taxAdministrativeFee" type="hidden" value="950">
 <input name="taxAdministrativeFeeReturnBase" type="hidden" value="5000">
 <input name="currency" type="hidden" value="COP" >
 <input name="algorithmSignature" type="hidden" value="SHA256">
 <input name="signature" type="hidden" value="b94d73892255c4f53af4282e3a5b6551526a922f1fcf1412fafa6bdf8bbe32f0">
 <input name="buyerEmail" type="hidden" value="pruebas@payulatam.com">
 <input name="responseUrl" type="hidden" value="http://www.mysite.com/response-page">
 <input name="confirmationUrl" type="hidden" value="http://www.mysite.com/confirmation-page">
 <input name="test" type="hidden" value="0">
 <input name="Submit" type="submit" value="Send">
</form>
 ```
