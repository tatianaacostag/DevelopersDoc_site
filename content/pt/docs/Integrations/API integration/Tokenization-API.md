---
title: "API de Tokenização"
linkTitle: "API de Tokenização"
date: 2021-06-24T10:31:30-05:00
description: >
  API de tokenização permite armazenar com segurança os dados dos cartões de crédito de seus clientes por meio da criação de um token. Este token permite fazer cobranças regulares ou implementar o recurso de pagamento em 1 clique, seguindo os padrões de segurança PCI DSS (Payment Card Industry Data Security Standard) para gerenciar dados de cartão de crédito.
weight: 40
tags: ["subtopic"]
---

O recurso de tokenização está disponível em acordos comerciais personalizados. Para obter mais informações, entre em contato com seu representante de vendas.

Para integrar com a API de tokenização, direcione sua solicitação para as seguintes URLs de acordo com seu ambiente.

{{% alert title="URL" color="info"%}}
* Teste: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Produção: ```https://api.payulatam.com/payments-api/4.0/service.cgi```
{{% /alert %}}

## Métodos disponíveis {#available-methods}
A API de tokenização inclui métodos para registrar, remover e consultar tokens.

* [Registro de cartão de crédito individual]({{< ref "#individual-credit-card-registration" >}})
* [Registro de cartões de crédito em massa]({{< ref "#massive-credit-card-registration" >}})
* [Remoção de token individual]({{< ref "#individual-token-removal" >}})
* [Remoção de tokens em massa]({{< ref "#massive-token-removal" >}})
* [Consulta de token]({{< ref "#query-tokens" >}})

## Registro de cartão de crédito individual {#individual-credit-card-registration}
Usando esse recurso, você pode registrar as informações do cartão de crédito de um cliente e obter um token. 

### Variáveis para pedido e resposta {#variables-for-request-and-response}

<details>
<summary>Pedido</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `CREATE_TOKEN`. | Sim |
| merchant |  |  | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| creditCardToken |  |  | Informações do cartão de crédito a ser tokenizado. | Sim |
| creditCardToken > payerId | Alfanumérico | | Identificação interna do titular do cartão de crédito. | Sim |
| creditCardToken > name | Alfanumérico | Mín:1 Máx:255 | Nome do titular exibido no cartão de crédito. | Sim |
| creditCardToken > identificationNumber | Alfanumérico | Máx:20 | Número de identificação do titular do cartão de crédito. | Sim |
| creditCardToken > paymentMethod | Alfanumérico | 32 | Selecione um método de pagamento com cartão de crédito válido. [Veja os métodos de pagamento disponíveis]({{< ref "select-your-payment-method.html" >}}). | Sim |
| creditCardToken > number | Alfanumérico | Mín:13 Máx:20 | Número do cartão de crédito. | Sim |
| creditCardToken > expirationDate | Alfanumérico | 7 | Data de validade do cartão de crédito. Formato `YYYY/MM`. | Sim |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| creditCardToken |  |  | Informações do cartão de crédito tokenizado. |
| creditCardToken > creditCardTokenId | Alfanumérico | | Token gerado com as informações do cartão de crédito. |
| creditCardToken > name | Alfanumérico | Mín:1 Máx:255 | Nome do titular exibido no cartão de crédito conforme enviado no pedido. |
| creditCardToken > payerId | Alfanumérico | | Identificação interna do titular do cartão de crédito conforme enviado no pedido. |
| creditCardToken > identificationNumber | Alfanumérico | Máx:20 | Número de identificação do titular do cartão de crédito conforme enviado no pedido. |
| creditCardToken > paymentMethod | Alfanumérico | 32 | Franquia do cartão de crédito tokenizado conforme enviado no pedido. |
| creditCardToken > maskedNumber | Alfanumérico | Mín:13 Máx:20 | Número do cartão de crédito ocultado. Quando o cartão é ocultado, são exibidos os primeiros seis dígitos e os últimos quatro dígitos do cartão de crédito. |

</details>

### Chamada API {#api-call}
A seguir estão os corpos do pedido e resposta deste método.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```JSON
{
   "language": "es",
   "command": "CREATE_TOKEN",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "creditCardToken": {
      "payerId": "10",
      "name": "APPROVED",
      "identificationNumber": "32144457",
      "paymentMethod": "VISA",
      "number": "4037997623271984",
      "expirationDate": "2025/01"
   }
}
```
<br>

Exemplo resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "creditCardToken": {
        "creditCardTokenId": "05440005-9111-4d34-aa86-deeb91983d54",
        "name": "APPROVED",
        "payerId": "10",
        "identificationNumber": "32144457",
        "paymentMethod": "VISA",
        "number": null,
        "expirationDate": null,
        "creationDate": null,
        "maskedNumber": "403799******1984",
        "errorDescription": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```XML
<request>
   <language>es</language>
   <command>CREATE_TOKEN</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <creditCardToken>
      <payerId>10</payerId>
      <name>APPROVED</name>
      <identificationNumber>32144457</identificationNumber>
      <paymentMethod>VISA</paymentMethod>
      <number>4916332769997505</number>
      <expirationDate>2024/01</expirationDate>
   </creditCardToken>
</request>
```
<br>

Exemplo resposta:
```XML
<creditCardTokenResponse>
    <code>SUCCESS</code>
    <creditCardToken>
        <creditCardTokenId>46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3</creditCardTokenId>
        <name>APPROVED</name>
        <payerId>10</payerId>
        <identificationNumber>32144457</identificationNumber>
        <paymentMethod>VISA</paymentMethod>
        <maskedNumber>491633******7505</maskedNumber>
    </creditCardToken>
</creditCardTokenResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Registro de cartões de crédito em massa {#massive-credit-card-registration}
Usando este recurso, você pode registrar as informações de vários cartões de crédito armazenados em um arquivo _**.csv**_ e obtenha um token para cada cartão.

### Observações {#considerations}
* Cada registro do arquivo deve ter a seguinte estrutura e ordem separadas por vírgulas:
    - ID de pagador
    - Nome completo
    - Número do cartão de crédito
    - Data de validade
    - Franquia
    - Número de identificação
* O arquivo não deve ter cabeçalho.
* O arquivo deve ser codificado em UTF-8. Você precisa implementar uma funcionalidade para codificar o conteúdo e enviar a string codificada no parâmetro `contentFile`.
* O arquivo não pode ter mais de 10.000 registros.<br><br>![PrintScreen](/assets/massiveTokenization.jpeg) 

### Variáveis para pedido e resposta {#variables-for-request-and-response-1}

<details>
<summary>Pedido</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `CREATE_BATCH_TOKENS`. | Sim |
| merchant |  |  | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| contentFile | Alfanumérico |  | String codificada em Base64 com as informações dos cartões de crédito, conforme explicado anteriormente. | Sim |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| id |  |  | Identificação do procedimento. |

</details>

### Chamada API {#api-call-1}
A seguir estão os corpos do pedido e resposta deste método.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```JSON
{
   "language": "es",
   "command": "CREATE_BATCH_TOKENS",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "contentFile": "MDAxLE1hcnkgS2VsbGVyLDQwMjQwMDcxMzU0MTI2ODAsMjAyNC8wMSxWSVNBLDEyMzQ1NgowMDIsTWFyayBCcm93biw1MTA0ODQyNTA1ODE2MTcwLDIwMjMvMDUsTUFTVEVSQ0FSRCw3ODkwMTI="
}
```
<br>

Exemplo resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "id": "b721abbc-a9cf-44c6-99ba-91393de2b5d6"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```XML
<request>
   <language>es</language>
   <command>CREATE_BATCH_TOKENS</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <contentFile>MDAxLE1hcnkgS2VsbGVyLDQwMjQwMDcxMzU0MTI2ODAsMjAyNC8wMSxWSVNBLDEyMzQ1NgowMDIsTWFyayBCcm93biw1MTA0ODQyNTA1ODE2MTcwLDIwMjMvMDUsTUFTVEVSQ0FSRCw3ODkwMTI=</contentFile>
</request>
```
<br>

Exemplo resposta:
```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>b721abbc-a9cf-44c6-99ba-91393de2b5d6</id>
</creditCardTokenBatchResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Remoção de token individual {#individual-token-removal}
Usando este recurso, você pode remover o token registrado anteriormente. 

### Variáveis para pedido e resposta {#variables-for-request-and-response-2}

<details>
<summary>Pedido</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `REMOVE_TOKEN`. | Sim |
| merchant |  |  | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| removeCreditCardToken |  |  | Informação do token a ser removido. | Sim |
| removeCreditCardToken > payerId | Alfanumérico | | Identificação interna do titular do cartão de crédito. | Sim |
| removeCreditCardToken > creditCardTokenId | Alfanumérico | | Token do cartão de crédito a ser removido. | Sim |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| creditCardToken |  |  | Informações do token removidas. |
| creditCardToken > creditCardTokenId | Alfanumérico | | Token do cartão de crédito conforme enviado no pedido. |
| creditCardToken > name | Alfanumérico | Mín:1 Máx:255 | Nome do titular exibido no cartão de crédito. |
| creditCardToken > payerId | Alfanumérico | | Identificação interna do titular do cartão de crédito. |
| creditCardToken > identificationNumber | Alfanumérico | Máx:20 | Número de identificação do titular do cartão de crédito. |
| creditCardToken > paymentMethod | Alfanumérico | 32 | Franquia do cartão de crédito tokenizado. |
| creditCardToken > maskedNumber | Alfanumérico | Mín:13 Máx:20 | Número do cartão de crédito ocultado. Quando o cartão é ocultado, são exibidos os primeiros seis dígitos e os últimos quatro dígitos do cartão de crédito. |

</details>

### Chamada API {#api-call-2}
A seguir estão os corpos do pedido e resposta deste método.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```JSON
{
   "language": "es",
   "command": "REMOVE_TOKEN",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "removeCreditCardToken": {
      "payerId": "10",
      "creditCardTokenId": "46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3"
   }
}
```
<br>

Exemplo resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "creditCardToken": {
        "creditCardTokenId": "46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3",
        "name": "APPROVED",
        "payerId": "10",
        "identificationNumber": "32144457",
        "paymentMethod": "VISA",
        "number": null,
        "expirationDate": null,
        "creationDate": null,
        "maskedNumber": "491633******7505",
        "errorDescription": null
    }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```XML
<request>
   <language>es</language>
   <command>REMOVE_TOKEN</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <removeCreditCardToken>
      <payerId>10</payerId>
      <creditCardTokenId>46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3</creditCardTokenId>4
   </removeCreditCardToken>
</request>

```
<br>

Exemplo resposta:
```XML
<creditCardTokenResponse>
    <code>SUCCESS</code>
    <creditCardToken>
        <creditCardTokenId>46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3</creditCardTokenId>
        <name>APPROVED</name>
        <payerId>10</payerId>
        <identificationNumber>32144457</identificationNumber>
        <paymentMethod>VISA</paymentMethod>
        <maskedNumber>491633******7505</maskedNumber>
    </creditCardToken>
</creditCardTokenResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Remoção de tokens em massa {#massive-token-removal}
Usando este recurso, você pode remover os tokens armazenados em um arquivo _**.csv**_.

### Observações {#considerations-1}
* Cada registro do arquivo deve ter a seguinte estrutura e ordem separadas por vírgulas:
    - ID de pagador
    - Token.
* O arquivo não deve ter cabeçalho.
* O arquivo deve ser codificado em UTF-8. Você precisa implementar uma funcionalidade para codificar o conteúdo e enviar a string codificada no parâmetro `contentFile`.
* O arquivo não pode ter mais de 10.000 registros.<br><br>![PrintScreen](/assets/massiveDeletion.png) 

### Variáveis para pedido e resposta {#variables-for-request-and-response-3}

<details>
<summary>Pedido</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `REMOVE_BATCH_TOKENS`. | Sim |
| merchant |  |  | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| contentFile | Alfanumérico |  | String codificada em Base64 com as informações dos tokens a serem removidos. | Sim |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| id |  |  | Identificação do procedimento. |

</details>

### Chamada API {#api-call-3}
A seguir estão os corpos do pedido e resposta deste método.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```JSON
{
   "language": "es",
   "command": "REMOVE_BATCH_TOKENS",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "contentFile": "UGF5ZXJJZDEsYWQ4NGQ2NzEtYjZiOC00YjEyLWFkNTktZmYxZDJhNjQ0M2NhDQpQYXllcklkMiw0ZGYxNjMwYy03MDkyLTRhNjgtODE3MC0yYzI2YzZjOTUyMDg="
}
```
<br>

Exemplo resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "id": "2562625d-9e4c-450a-b979-031feb033952"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```XML
<request>
   <language>es</language>
   <command>REMOVE_BATCH_TOKENS</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <contentFile>UGF5ZXJJZDEsYWQ4NGQ2NzEtYjZiOC00YjEyLWFkNTktZmYxZDJhNjQ0M2NhDQpQYXllcklkMiw0ZGYxNjMwYy03MDkyLTRhNjgtODE3MC0yYzI2YzZjOTUyMDg=</contentFile>
</request>
```
<br>

Exemplo resposta:
```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>2562625d-9e4c-450a-b979-031feb033952</id>
</creditCardTokenBatchResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Consulta de token {#query-tokens}
Usando este recurso, você pode obter as informações de cartões de crédito tokenizados e realizar a consulta pelo número do token ou por um intervalo de datas. 

### Variáveis para pedido e resposta {#variables-for-request-and-response-4}

<details>
<summary>Pedido</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `GET_TOKENS`. | Sim |
| merchant |  |  | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| creditCardTokenInformation |  |  | Parâmetros da consulta. | Sim |
| creditCardTokenInformation > creditCardTokenId | Alfanumérico | | Token of the card to consult. Este parâmetro é obrigatório quando você deseja consultar por ID de Token. | Não |
| creditCardTokenInformation > startDate | Alfanumérico | 23 | Data de início da consulta, quando quiser consultar por intervalo de datas. Este parâmetro é obrigatório quando você deseja consultar por intervalo de datas.<br>Formato `YYYY-MM-DDTHH:MM:SS`, por exemplo `2021-06-12T16:07:11`. | Não |
| creditCardTokenInformation > endDate | Alfanumérico | 23 | Data de término da consulta, quando quiser consultar por intervalo de datas. Este parâmetro é obrigatório quando você deseja consultar por intervalo de datas.<br>Formato `YYYY-MM-DDTHH:MM:SS`, por exemplo `2021-06-12T16:07:11`. | Não |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| creditCardTokenList |  |  | Informações dos cartões de crédito tokenizados. |
| creditCardTokenList > creditCardTokenId | Alfanumérico | | Token gerado com as informações do cartão de crédito. |
| creditCardTokenList > name | Alfanumérico | Mín:1 Máx:255 | Nome do titular exibido no cartão de crédito conforme enviado no pedido. |
| creditCardTokenList > payerId | Alfanumérico | | Identificação interna do titular do cartão de crédito conforme enviado no pedido. |
| creditCardTokenList > identificationNumber | Alfanumérico | Máx:20 | Número de identificação do titular do cartão de crédito conforme enviado no pedido. |
| creditCardTokenList > paymentMethod | Alfanumérico | 32 | Franquia do cartão de crédito tokenizado conforme enviado no pedido. |
| creditCardTokenList > creationDate | Alfanumérico | 19 | Data em que o cartão de crédito foi tokenizado. |
| creditCardTokenList > maskedNumber | Alfanumérico | Mín:13 Máx:20 | Número do cartão de crédito ocultado. Quando o cartão é ocultado, são exibidos os primeiros seis dígitos e os últimos quatro dígitos do cartão de crédito. |

</details>

### Chamada API {#api-call-4}
A seguir estão os corpos do pedido e resposta deste método. O exemplo a seguir consulta os cartões tokenizados por intervalo de datas. Se você quiser consultar usando o ID do token, basta enviar o parâmetro `creditCardTokenInformation.creditCardTokenId`.

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```JSON
{
   "language": "es",
   "command": "GET_TOKENS",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "creditCardTokenInformation": {
      "startDate": "2021-06-23T12:00:00",
      "endDate": "2021-06-25T12:00:00"
   }
}
```
<br>

Exemplo resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "creditCardTokenList": [
        {
            "creditCardTokenId": "1adc6940-ee7e-48c2-bb96-7d784de74964",
            "name": "APPROVED",
            "payerId": "20263841",
            "identificationNumber": null,
            "paymentMethod": "AMEX",
            "number": null,
            "expirationDate": null,
            "creationDate": "2021-06-23T13:36:36",
            "maskedNumber": "377813*****0001",
            "errorDescription": null
        },
        {
            "creditCardTokenId": "3e5f0d77-0f93-421f-9432-99b6430e845e",
            "name": "Juan Perez",
            "payerId": "158301",
            "identificationNumber": null,
            "paymentMethod": "VISA",
            "number": null,
            "expirationDate": null,
            "creationDate": "2021-06-23T19:03:41",
            "maskedNumber": "424242******4242",
            "errorDescription": null
        },
        {
            "creditCardTokenId": "ead0a090-18dc-41ad-9431-ab342af854a2",
            "name": "LadyM",
            "payerId": "0sS01",
            "identificationNumber": "1234567890",
            "paymentMethod": "AMEX",
            "number": null,
            "expirationDate": null,
            "creationDate": "2021-06-24T11:48:21",
            "maskedNumber": "377813*****0001",
            "errorDescription": null
        }
    ]
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```XML
<request>
   <language>es</language>
   <command>GET_TOKENS</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
   </merchant>
   <creditCardTokenInformation>
      <startDate>2021-06-23T12:00:00</startDate>
      <endDate>2021-06-25T12:00:00</endDate>
   </creditCardTokenInformation>
</request>
```
<br>

Exemplo resposta:
```XML
<creditCardTokenListResponse>
    <code>SUCCESS</code>
    <creditCardTokenList>
        <creditCardToken>
            <creditCardTokenId>1adc6940-ee7e-48c2-bb96-7d784de74964</creditCardTokenId>
            <name>APPROVED</name>
            <payerId>20263841</payerId>
            <paymentMethod>AMEX</paymentMethod>
            <creationDate>2021-06-23T13:36:36</creationDate>
            <maskedNumber>377813*****0001</maskedNumber>
        </creditCardToken>
        <creditCardToken>
            <creditCardTokenId>3e5f0d77-0f93-421f-9432-99b6430e845e</creditCardTokenId>
            <name>Juan Perez</name>
            <payerId>158301</payerId>
            <paymentMethod>VISA</paymentMethod>
            <creationDate>2021-06-23T19:03:41</creationDate>
            <maskedNumber>424242******4242</maskedNumber>
        </creditCardToken>
        <creditCardToken>
            <creditCardTokenId>ead0a090-18dc-41ad-9431-ab342af854a2</creditCardTokenId>
            <name>LadyM</name>
            <payerId>0sS01</payerId>
            <identificationNumber>1234567890</identificationNumber>
            <paymentMethod>AMEX</paymentMethod>
            <creationDate>2021-06-24T11:48:21</creationDate>
            <maskedNumber>377813*****0001</maskedNumber>
        </creditCardToken>
    </creditCardTokenList>
</creditCardTokenListResponse>
```
{{< /tab >}}
{{< /tabs >}}

## Pagamentos usando tokenização {#payments-using-tokenization}
Para pagamentos com tokens de cartão de crédito, inclua o parâmetro `transaction.creditCardTokenId` substituindo as informações do cartão de crédito. O exemplo a seguir mostra o corpo da solicitação em um nível alto para um fluxo de uma etapa. Os detalhes da solicitação não são fornecidos.

{{% alert title="Observação" color="info"%}}
Para processar sem CVV, é necessário enviar o parâmetro `creditCard.processWithoutCvv2` como true na solicitação de pagamento e remover o parâmetro `creditCard.securityCode`.<br>
Por padrão, o processamento de cartões de crédito sem código de segurança não está habilitado. Se você deseja habilitar este recurso, entre em contato com seu representante de vendas.
{{% /alert%}}

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```JSON
{
   "language": "es",
   "command": "SUBMIT_TRANSACTION",
   "merchant": {
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
      "apiLogin": "pRRXKOl8ikMmt9u"
   },
   "transaction": {
      "order": {
         "Informação do pedido":""
      },
      "payer": {
         "Informação do pagador":""
      },
      "creditCardTokenId": "46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3",
      "creditCard": {
         "securityCode": "123"
      },
      "extraParameters": {
         "Parâmetros extras do pedido":""
      },
      "type": "AUTHORIZATION_AND_CAPTURE",
      "paymentMethod": "Card franchise", 
      "paymentCountry": "País de processamento",
      "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
      "ipAddress": "127.0.0.1",
      "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
      "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   "test": true
}
```
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```XML
<request>
   <language>es</language>
   <command>SUBMIT_TRANSACTION</command>
   <merchant>
      <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
   </merchant>
   <transaction>
      <order>
         <!-- Informação do pedido -->
      </order>
      <payer>
         <!-- Informação do pagador -->
      </payer>
      <creditCardTokenId>46b7f03e-1b3b-4ce8-ad90-fe1a482f76c3</creditCardTokenId>
      <creditCard>
         <securityCode>321</securityCode>
      </creditCard>
      <extraParameters>
         <!-- Parâmetros extras do pedido -->
      </extraParameters>
      <type>AUTHORIZATION_AND_CAPTURE</type>
      <paymentMethod>{Card franchise}</paymentMethod>
      <paymentCountry>{País de processamento}</paymentCountry>
      <deviceSessionId>vghs6tvkcle931686k1900o6e1</deviceSessionId>
      <ipAddress>127.0.0.1</ipAddress>
      <cookie>pt1t38347bs6jc9ruv2ecpv7o2</cookie>
      <userAgent>Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0</userAgent>
   </transaction>
   <isTest>false</isTest>
</request>

```
{{< /tab >}}
{{< /tabs >}}
<br>

Para obter informações específicas sobre como efetuar pagamentos, consulte o artigo respectivo ao país de processamento.

<div style="display: flex;">
  <div style="float: left;width: 50%;">
      <img src="/assets/Argentina.png" width="25px"/> <a href="{{< ref "Payments-API-Argentina.md" >}}">Argentina</a><br>
      <img src="/assets/Brasil.png" width="25px"/> <a href="{{< ref "Payments-API-Brazil.md" >}}">Brasil</a><br>
      <img src="/assets/Chile.png" width="25px"/> <a href="{{< ref "Payments-API-Chile.md" >}}">Chile</a><br>
      <img src="/assets/Colombia.png" width="25px"/> <a href="{{< ref "Payments-API-Colombia.md" >}}">Colômbia</a>
    </ul>
  </div>
  <div style="float: left;width: 50%;">
    <ul>
      <img src="/assets/Mexico.png" width="25px"/> <a href="{{< ref "Payments-API-Mexico.md" >}}">México</a><br>
      <img src="/assets/Panama.png" width="25px"/> <a href="{{< ref "Payments-API-Panama.md" >}}">Panamá</a><br>
      <img src="/assets/Peru.png" width="25px"/> <a href="{{< ref "Payments-API-Peru.md" >}}">Peru</a>
    </ul>
  </div>
</div>

<br>

### Pagamentos múltiplos com tokenização {#multiple-payments-with-tokenization}
Usando este recurso, você pode realizar pagamentos usando vários tokens armazenados em um arquivo _**.csv**_ e obter um token para cada cartão.

### Observações {#considerations-2}
* Cada registro do arquivo deve ter a seguinte estrutura e ordem separadas por vírgulas:
    - ID da conta, identificador da sua conta PayU.
    - Token de cartão de crédito
    - Código de segurança do cartão de crédito
    - Quantidade de parcelas
    - Referência de venda
    - Descrição de venda
    - E-mail do comprador
    - Código ISO da moeda. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}})
    - Valor total incluindo impostos
    - Valor base de reembolso
    - Valor adicional
    - Idioma usado nos e-mails enviados ao comprador e ao vendedor. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}})
* O arquivo não deve ter cabeçalho.
* O arquivo deve ser codificado em UTF-8. Você precisa implementar uma funcionalidade para codificar o conteúdo e enviar a string codificada no parâmetro `contentFile`.
* O arquivo não pode ter mais de 10.000 registros.<br><br>![PrintScreen](/assets/massivePaymentTokenization.png) 

### Variáveis para pedido e resposta {#variables-for-request-and-response-5}

<details>
<summary>Pedido</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma usado no pedido, usado para exibir as mensagens de erro geradas. [Veja os idiomas disponíveis]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir `PROCESS_BATCH_TRANSACTIONS_TOKEN`. | Sim |
| merchant |  |  | Este objeto contém os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| contentFile | Alfanumérico |  | String codificada em Base64 com as informações dos cartões de crédito, conforme explicado anteriormente. | Sim |

</details>

<details>
<summary>Resposta</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | O código de resposta da transação. Os valores possíveis são `ERROR` e `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | A mensagem de erro associada quando o código de resposta é `ERROR`. |
| id |  |  | Identificação do procedimento. |

</details>

### Chamada API {#api-call-5}
A seguir estão os corpos do pedido e resposta deste método.

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```JSON
{
   "language": "es",
   "command": "PROCESS_BATCH_TRANSACTIONS_TOKEN",
   "merchant": {
      "apiLogin": "pRRXKOl8ikMmt9u",
      "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
   },
   "contentFile": "NTAwNTM4LGVhMDIwZTU5LWQ5NWEtNDk1ZC04OTAzLTM0ZTg0M2ZkN2ZlYywxMzIsMSxTYWxlLTA0LFN1YnNjcmlwdGlvbiBmZWUsdXNlcjFAbWFpbC5jb20sQ09QLDEwMDAwLDAsMCwwLGVzCjUwMDUzOCxlYWQwYTA5MC0xOGRjLTQxYWQtOTQzMS1hYjM0MmFmODU0YTIsMTM1LDEsU2FsZS0wNSxTdWJzY3JpcHRpb24gZmVlLHVzZXIyQG1haWwuY29tLENPUCwxMTAwMCwwLDAsMCxlcw=="
}
```
<br>

Exemplo resposta:
```JSON
{
    "code": "SUCCESS",
    "error": null,
    "id": "51c72d88-f707-45ca-ad59-4508140833a7"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```XML
<request>
   <language>es</language>
   <command>PROCESS_BATCH_TRANSACTIONS_TOKEN</command>
   <merchant>
      <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
      <apiKey>51c72d88-f707-45ca-ad59-4508140833a7</apiKey>
   </merchant>
   <contentFile>NTAwNTM4LGVhMDIwZTU5LWQ5NWEtNDk1ZC04OTAzLTM0ZTg0M2ZkN2ZlYywxMzIsMSxTYWxlLTA0LFN1YnNjcmlwdGlvbiBmZWUsdXNlcjFAbWFpbC5jb20sQ09QLDEwMDAwLDAsMCwwLGVzCjUwMDUzOCxlYWQwYTA5MC0xOGRjLTQxYWQtOTQzMS1hYjM0MmFmODU0YTIsMTM1LDEsU2FsZS0wNSxTdWJzY3JpcHRpb24gZmVlLHVzZXIyQG1haWwuY29tLENPUCwxMTAwMCwwLDAsMCxlcw=</contentFile>
</request>
```
<br>

Exemplo resposta:
```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>b721abbc-a9cf-44c6-99ba-91393de2b5d6</id>
</creditCardTokenBatchResponse>
```
{{< /tab >}}
{{< /tabs >}}