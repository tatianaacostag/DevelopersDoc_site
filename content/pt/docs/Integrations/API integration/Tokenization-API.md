---
title: "API de Tokenização"
linkTitle: "API de Tokenização"
date: 2021-06-24T10:31:30-05:00
description: >
  A API de Tokenização permite armazenar com segurança os dados do cartão de crédito dos seus clientes gerando um token. Esse token possibilita o processamento de pagamentos recorrentes ou a implementação da funcionalidade de pagamento com 1 clique, garantindo a conformidade com os requisitos do PCI DSS (Padrão de Segurança de Dados da Indústria de Cartões de Pagamento) para o manuseio de informações de cartões de crédito.
weight: 40
tags: ["subtopic"]
---

O recurso de tokenização está disponível mediante acordos comerciais personalizados. Para mais informações, entre em contato com seu representante de vendas.

{{% alert title="Nota" color="info"%}}

Para integrar-se à API de Tokenização, envie suas solicitações para os seguintes URLs com base no seu ambiente:

* Teste: ```https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi```
* Produção: ```https://api.payulatam.com/payments-api/4.0/service.cgi```

{{% /alert %}}

## Métodos Disponíveis {#available-methods}

A API de Tokenização inclui métodos para registrar e remover tokens, consultá-los e processar pagamentos usando cartões de crédito tokenizados.

* [Registro Individual de Cartão de Crédito]({{< ref "#individual-credit-card-registration" >}})
* [Registro Massivo de Cartões de Crédito]({{< ref "#massive-credit-card-registration" >}})
* [Remoção Individual de Token]({{< ref "#individual-token-removal" >}})
* [Remoção Massiva de Tokens]({{< ref "#massive-token-removal" >}})
* [Consultar Tokens]({{< ref "#query-tokens" >}})
* [Pagamentos Usando Tokenização]({{< ref "Tokenization-API.md#payments-using-tokenization" >}})

## Registro Individual de Cartão de Crédito {#individual-credit-card-registration}

Este recurso permite registrar as informações do cartão de crédito de um cliente e gerar um token.

### Parâmetros para Solicitação e Resposta {#parameters-for-request-and-response}

<details>

<summary>Solicitação</summary>

<br>

<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado na solicitação. Isso determina o idioma das mensagens de erro. [Veja os idiomas suportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definido como `CREATE_TOKEN`. | Sim |
| merchant | Objeto |  | Objeto contendo os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | PayU fornece este nome de usuário ou login. [Como obtenho meu API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | PayU fornece esta senha. [Como obtenho minha API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| creditCardToken | Objeto |  | Objeto contendo os detalhes do cartão de crédito para tokenização. | Sim |
| creditCardToken > payerId | Alfanumérico | | ID interno do titular do cartão de crédito. | Sim |
| creditCardToken > name | Alfanumérico | Mín:1 Máx:255 | Nome do titular do cartão conforme exibido no cartão de crédito. | Sim |
| creditCardToken > identificationNumber | Alfanumérico | Máx:20 | Número de identificação do titular do cartão. | Sim |
| creditCardToken > paymentMethod | Alfanumérico | 32 | Método de pagamento válido para cartão de crédito. [Veja os Métodos de Pagamento disponíveis]({{< ref "select-your-payment-method.html" >}}). | Sim |
| creditCardToken > number | Alfanumérico | Mín:13 Máx:20 | Número do cartão de crédito. | Sim |
| creditCardToken > expirationDate | Alfanumérico | 7 | Data de validade no formato `YYYY/MM`. | Sim |

</details>

<details>

<summary>Resposta</summary>

<br>

<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | Resposta da transação: `ERROR` ou `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | Mensagem de erro retornada quando o código da transação é `ERROR`. |
| creditCardToken | Objeto |  | Objeto contendo os detalhes do cartão de crédito tokenizado. |
| creditCardToken > creditCardTokenId | Alfanumérico | | Token gerado a partir dos detalhes do cartão de crédito. |
| creditCardToken > name | Alfanumérico | Mín:1 Máx:255 | Nome do titular do cartão conforme enviado na solicitação. |
| creditCardToken > payerId | Alfanumérico | | ID interno do titular do cartão conforme enviado na solicitação. |
| creditCardToken > identificationNumber | Alfanumérico | Máx:20 | Número de identificação do titular do cartão conforme enviado na solicitação. |
| creditCardToken > paymentMethod | Alfanumérico | 32 | Bandeira do cartão de crédito tokenizado conforme enviado na solicitação. |
| creditCardToken > maskedNumber | Alfanumérico | Mín:13 Máx:20 | Número do cartão de crédito mascarado exibindo os primeiros seis e os últimos quatro dígitos. |

</details>

### Chamada da API {#api-call}

Os exemplos a seguir mostram os corpos de solicitação e resposta.

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Exemplo de uma Solicitação:**

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

**Exemplo de uma Resposta:**

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

**Exemplo de uma Solicitação:**

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

**Exemplo de uma Resposta:**

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

## Registro Massivo de Cartões de Crédito {#massive-credit-card-registration}

Este recurso permite registrar múltiplos cartões de crédito armazenados em um arquivo .csv e gerar um token para cada cartão.

### Considerações

* Cada registro no arquivo deve seguir a estrutura e ordem especificadas, com os campos separados por vírgulas:
    - ID do pagador
    - Nome completo
    - Número do cartão de crédito
    - Data de validade
    - Bandeira
    - Número de identificação
* O arquivo não deve conter um cabeçalho.
* O arquivo deve estar codificado em UTF-8. Você precisa implementar uma função para codificar o conteúdo e enviar a string codificada no parâmetro `contentFile`.
* O arquivo não pode conter mais de 10.000 registros.

<br>

**Exemplo:**

![PrintScreen](/assets/massiveTokenization.jpeg) 

### Parâmetros para Solicitação e Resposta {#parameters-for-request-and-response-1}

<details>

<summary>Solicitação</summary>

<br>

<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado na solicitação. Isso determina o idioma das mensagens de erro. [Veja os idiomas suportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definido como `CREATE_BATCH_TOKENS`. | Sim |
| merchant | Objeto |  | Objeto contendo os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | PayU fornece este nome de usuário ou login. [Como obtenho meu API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | PayU fornece esta senha. [Como obtenho minha API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| contentFile | Alfanumérico |  | String codificada em Base64 contendo as informações dos cartões de crédito conforme descrito acima. | Sim |

</details>

<details>

<summary>Resposta</summary>

<br>

<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | Resposta da transação: `ERROR` ou `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | Mensagem de erro retornada quando o código da transação é `ERROR`. |
| id | Alfanumérico |  | Identificador do processo. |

</details>

### Chamada da API {#api-call-1}

Os exemplos a seguir mostram os corpos de solicitação e resposta.

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Exemplo de uma Solicitação:**

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

**Exemplo de uma Resposta:**

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

**Exemplo de uma Solicitação:**

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

**Exemplo de uma Resposta:**

```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>b721abbc-a9cf-44c6-99ba-91393de2b5d6</id>
</creditCardTokenBatchResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Remoção Individual de Token {#individual-token-removal}

Este recurso permite remover um token previamente registrado.

### Parâmetros para Solicitação e Resposta {#parameters-for-request-and-response-2}

<details>

<summary>Solicitação</summary>

<br>

<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado na solicitação. Isso determina o idioma das mensagens de erro. [Veja os idiomas suportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definido como `REMOVE_TOKEN`. | Sim |
| merchant | Objeto |  | Objeto contendo os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | PayU fornece este nome de usuário ou login. [Como obtenho meu API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | PayU fornece esta senha. [Como obtenho minha API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| removeCreditCardToken | Objeto |  | Informações do token a ser removido. | Sim |
| removeCreditCardToken > payerId | Alfanumérico | | ID interno do titular do cartão, conforme enviado na solicitação. | Sim |
| removeCreditCardToken > creditCardTokenId | Alfanumérico | | ID do token do cartão de crédito a ser removido. | Sim |

</details>

<details>

<summary>Resposta</summary>

<br>

<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | Resposta da transação: `ERROR` ou `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | Mensagem de erro retornada quando o código da transação é `ERROR`. |
| creditCardToken | Objeto |  | Detalhes do token removido. |
| creditCardToken > creditCardTokenId | Alfanumérico | | ID do token do cartão de crédito, conforme enviado na solicitação. |
| creditCardToken > name | Alfanumérico | Mín:1 Máx:255 | Nome do titular do cartão, conforme enviado na solicitação. |
| creditCardToken > payerId | Alfanumérico | | ID interno do titular do cartão, conforme enviado na solicitação. |
| creditCardToken > identificationNumber | Alfanumérico | Máx:20 | Número de identificação do titular do cartão, conforme enviado na solicitação. |
| creditCardToken > paymentMethod | Alfanumérico | 32 | Bandeira do cartão de crédito tokenizado, conforme enviado na solicitação. |
| creditCardToken > maskedNumber | Alfanumérico | Mín:13 Máx:20 | Número do cartão de crédito mascarado, exibindo os seis primeiros e os quatro últimos dígitos. |

</details>

### Chamada da API {#api-call-2}

Os exemplos a seguir mostram os corpos de solicitação e resposta.

{{< tabs tabTotal="2" tabID="3" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Exemplo de uma Solicitação:**

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

**Exemplo de uma Resposta:**

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

**Exemplo de uma Solicitação:**

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

**Exemplo de uma Resposta:**

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

## Remoção Massiva de Tokens {#massive-token-removal}

Este recurso permite remover tokens armazenados em um arquivo .csv.

### Considerações

* Cada registro no arquivo deve seguir esta estrutura e ordem, separados por vírgulas:
    - ID do Pagador
    - Token
* O arquivo não deve conter um cabeçalho.
* O arquivo deve estar codificado em UTF-8. É necessário implementar uma funcionalidade para codificar o conteúdo e enviar a string codificada no parâmetro `contentFile`.
* O arquivo não pode conter mais de 10.000 registros.

<br>

**Exemplo:**

![PrintScreen](/assets/massiveDeletion.png) 

### Parâmetros para Solicitação e Resposta {#parameters-for-request-and-response-3}

<details>

<summary>Solicitação</summary>

<br>

<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado na solicitação. Isso determina o idioma das mensagens de erro. [Veja os idiomas suportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definido como `REMOVE_BATCH_TOKENS`. | Sim |
| merchant | Objeto |  | Objeto contendo os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | PayU fornece este nome de usuário ou login. [Como obtenho meu API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | PayU fornece esta senha. [Como obtenho minha API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| contentFile | Alfanumérico |  | String codificada em Base64 contendo os tokens a serem removidos. | Sim |

</details>

<details>

<summary>Resposta</summary>

<br>

<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | Resposta da transação: `ERROR` ou `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | Mensagem de erro retornada quando o código da transação é `ERROR`. |
| id | Alfanumérico |  | Identificador do processo. |

</details>

### Chamada da API {#api-call-3}

Os exemplos a seguir mostram os corpos de solicitação e resposta.

{{< tabs tabTotal="2" tabID="4" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Exemplo de uma Solicitação:**

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

**Exemplo de uma Resposta:**

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

**Exemplo de uma Solicitação:**

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

**Exemplo de uma Resposta:**

```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>2562625d-9e4c-450a-b979-031feb033952</id>
</creditCardTokenBatchResponse>
```

{{< /tab >}}

{{< /tabs >}}

## Consultar Tokens {#query-tokens}

Com este recurso, você pode recuperar informações sobre cartões de crédito tokenizados. A consulta pode ser feita por:

* **ID do Token:** Recupera detalhes de um cartão de crédito tokenizado específico.
* **ID do Pagador:** Recupera todos os cartões de crédito tokenizados associados a um pagador.
* **Intervalo de datas:** Recupera todos os cartões de crédito tokenizados criados dentro de um período específico.

### Parâmetros para Solicitação e Resposta {#parameters-for-request-and-response-4}

<details>

<summary>Solicitação</summary>

<br>

<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma utilizado na solicitação. Esse idioma será usado para exibir mensagens de erro. [Veja os idiomas suportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definido como `GET_TOKENS`. | Sim |
| merchant | Objeto |  | Objeto contendo os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | PayU fornece este nome de usuário ou login. [Como obtenho meu API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | PayU fornece esta senha. [Como obtenho minha API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| creditCardTokenInformation | Objeto |  | Parâmetros da consulta. | Sim |
| creditCardTokenInformation > creditCardTokenId | Alfanumérico | | ID do Token do cartão de crédito a ser recuperado. **Obrigatório para consulta por ID do Token.** | Não |
| creditCardTokenInformation > payerId | Alfanumérico | | Identificador único do pagador. **Obrigatório para consulta por ID do Pagador.** | Não |
| creditCardTokenInformation > startDate | Alfanumérico | 23 | Data de início para consultas por intervalo de datas. **Obrigatório para consulta por intervalo de datas.** Formato: `YYYY-MM-DDTHH:MM:SS`, ex: `2021-06-12T16:07:11`. | Não |
| creditCardTokenInformation > endDate | Alfanumérico | 23 | Data de término para consultas por intervalo de datas. **Obrigatório para consulta por intervalo de datas.** Formato: `YYYY-MM-DDTHH:MM:SS`, ex: `2021-06-12T16:07:11`. | Não |

</details>

<details>

<summary>Resposta</summary>

<br>

<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | Resposta da transação: `ERROR` ou `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | Mensagem de erro retornada quando o código da transação é `ERROR`. |
| creditCardTokenList | Objeto |  | Lista de cartões de crédito tokenizados correspondentes à consulta. |
| creditCardTokenList > creditCardTokenId | Alfanumérico | | Token gerado para o cartão de crédito. |
| creditCardTokenList > name | Alfanumérico | Mín:1 Máx:255 | Nome do titular do cartão conforme fornecido na solicitação. |
| creditCardTokenList > payerId | Alfanumérico | | Identificador único do pagador. |
| creditCardTokenList > identificationNumber | Alfanumérico | Máx:20 | Número de identificação do titular do cartão de crédito. |
| creditCardTokenList > paymentMethod | Alfanumérico | 32 | Bandeira do cartão de crédito (ex.: VISA, AMEX, MASTERCARD). |
| creditCardTokenList > creationDate | Alfanumérico | 19 | Data em que o cartão de crédito foi tokenizado. |
| creditCardTokenList > maskedNumber | Alfanumérico | Mín:13 Máx:20 | Número do cartão de crédito mascarado, exibindo os seis primeiros e os quatro últimos dígitos. |

</details>

### Chamada da API {#api-call-4}

Os exemplos a seguir mostram os corpos de solicitação e resposta.

#### Consulta por ID do Token

{{< tabs tabTotal="2" tabID="5" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Exemplo de uma Solicitação:**

```JSON
{
    "language": "en",
    "command": "GET_TOKENS",
    "merchant": {
        "apiLogin": "pRRXKOl8ikMmt9u",
        "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
    },
    "creditCardTokenInformation": {
        "creditCardTokenId": "ad29f82a-31eb-43e9-8768-081c5f4cbaf0"
    }
}
```

**Exemplo de uma Resposta:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "creditCardTokenList": [
        {
            "creditCardTokenId": "ad29f82a-31eb-43e9-8768-081c5f4cbaf0",
            "name": "APPROVED",
            "payerId": "Merchant_Payer_ID_644",
            "identificationNumber": "298928707",
            "paymentMethod": "AMEX",
            "creationDate": "2025-03-14T11:10:13",
            "maskedNumber": "377813*****0001"
        }
    ]
}
```

<br>

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Exemplo de uma Solicitação:**

```XML
<request>
    <language>en</language>
    <command>GET_TOKENS</command>
    <merchant>
        <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <creditCardTokenInformation>
        <creditCardTokenId>ad29f82a-31eb-43e9-8768-081c5f4cbaf0</creditCardTokenId>
    </creditCardTokenInformation>
</request>
```
<br>

**Exemplo de uma Resposta:**

```XML
<response>
    <code>SUCCESS</code>
    <error></error>
    <creditCardTokenList>
        <creditCardToken>
            <creditCardTokenId>ad29f82a-31eb-43e9-8768-081c5f4cbaf0</creditCardTokenId>
            <name>APPROVED</name>
            <payerId>Merchant_Payer_ID_644</payerId>
            <identificationNumber>298928707</identificationNumber>
            <paymentMethod>AMEX</paymentMethod>
            <creationDate>2025-03-14T11:10:13</creationDate>
            <maskedNumber>377813*****0001</maskedNumber>
        </creditCardToken>
    </creditCardTokenList>
</response>
```

{{< /tab >}}

{{< /tabs >}}

#### Consulta por ID do Pagador

{{< tabs tabTotal="2" tabID="6" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Exemplo de uma Solicitação:**

```JSON
{
    "language": "en",
    "command": "GET_TOKENS",
    "merchant": {
        "apiLogin": "pRRXKOl8ikMmt9u",
        "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
    },
    "creditCardTokenInformation": {
        "payerId": "Merchant_Payer_ID_644"
    }
}
```

<br>

**Exemplo de uma Resposta:**

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "creditCardTokenList": [
        {
            "creditCardTokenId": "ad29f82a-31eb-43e9-8768-081c5f4cbaf0",
            "name": "APPROVED",
            "payerId": "Merchant_Payer_ID_644",
            "identificationNumber": "298928707",
            "paymentMethod": "AMEX",
            "creationDate": "2025-03-14T11:10:13",
            "maskedNumber": "377813*****0001"
        },
        {
            "creditCardTokenId": "e84d9ea2-e9df-44c3-98e4-5970e346ac11",
            "name": "APPROVED",
            "payerId": "Merchant_Payer_ID_644",
            "identificationNumber": "3401859948",
            "paymentMethod": "MASTERCARD",
            "creationDate": "2025-03-14T11:24:27",
            "maskedNumber": "547130******0003"
        }
    ]
}
```

<br>

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Exemplo de uma Solicitação:**

```XML
<request>
    <language>en</language>
    <command>GET_TOKENS</command>
    <merchant>
        <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <creditCardTokenInformation>
        <payerId>Merchant_Payer_ID_644</payerId>
    </creditCardTokenInformation>
</request>
```

<br>

**Exemplo de uma Resposta:**

```XML
<response>
    <code>SUCCESS</code>
    <error/>
    <creditCardTokenList>
        <creditCardToken>
            <creditCardTokenId>ad29f82a-31eb-43e9-8768-081c5f4cbaf0</creditCardTokenId>
            <name>APPROVED</name>
            <payerId>Merchant_Payer_ID_644</payerId>
            <identificationNumber>298928707</identificationNumber>
            <paymentMethod>AMEX</paymentMethod>
            <creationDate>2025-03-14T11:10:13</creationDate>
            <maskedNumber>377813*****0001</maskedNumber>
        </creditCardToken>
        <creditCardToken>
            <creditCardTokenId>e84d9ea2-e9df-44c3-98e4-5970e346ac11</creditCardTokenId>
            <name>APPROVED</name>
            <payerId>Merchant_Payer_ID_644</payerId>
            <identificationNumber>3401859948</identificationNumber>
            <paymentMethod>MASTERCARD</paymentMethod>
            <creationDate>2025-03-14T11:24:27</creationDate>
            <maskedNumber>547130******0003</maskedNumber>
        </creditCardToken>
    </creditCardTokenList>
</response>
```

{{< /tab >}}

{{< /tabs >}}

#### Consulta por Intervalo de Datas

{{< tabs tabTotal="2" tabID="7" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Exemplo de uma Solicitação:**

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

**Exemplo de uma Resposta:**

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

<br>

{{< /tab >}}

{{< tab tabNum="2" >}}

<br>

**Exemplo de uma Solicitação:**

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

**Exemplo de uma Resposta:**

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

## Pagamentos Usando Tokenização {#payments-using-tokenization}

Para processar pagamentos utilizando tokens de cartão de crédito, inclua o parâmetro `transaction.creditCardTokenId` em vez dos dados completos do cartão. Os exemplos abaixo apresentam uma visão geral de uma solicitação de pagamento em uma única etapa.

{{% alert title="Nota" color="info"%}}

Para processar pagamentos sem CVV, defina o parâmetro `creditCard.processWithoutCvv2` como `true` na solicitação de pagamento e omita o parâmetro `creditCard.securityCode`.<br>
Por padrão, o processamento de pagamentos sem CVV está desativado. Para ativar esse recurso, entre em contato com seu representante de vendas.

{{% /alert%}}

### Chamada da API {#api-call-5}

Os exemplos a seguir mostram os corpos da solicitação.

{{< tabs tabTotal="2" tabID="8" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Exemplo de uma Solicitação:**

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

**Exemplo de uma Solicitação:**

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

Para obter informações detalhadas sobre o processamento de pagamentos, consulte a documentação correspondente com base no país de processamento.

<div style="display: flex; justify-content: space-between; max-width: 600px;">
  <div style="width: 45%;">
      <p><img src="/assets/Argentina.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Argentina.md" >}}">Argentina</a></p>
      <p><img src="/assets/Brasil.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Brazil.md" >}}">Brasil</a></p>
      <p><img src="/assets/Chile.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Chile.md" >}}">Chile</a></p>
      <p><img src="/assets/Colombia.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Colombia.md" >}}">Colômbia</a></p>
  </div>
  <div style="width: 45%;">
      <p><img src="/assets/Mexico.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Mexico.md" >}}">México</a></p>
      <p><img src="/assets/Panama.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Panama.md" >}}">Panamá</a></p>
      <p><img src="/assets/Peru.png" width="25px" style="margin-right: 10px; vertical-align: middle;"/> 
         <a href="{{< ref "Payments-API-Peru.md" >}}">Peru</a></p>
  </div>
</div>

<br>

### Pagamentos Múltiplos com Tokenização {#multiple-payments-with-tokenization}

Este recurso permite processar múltiplos pagamentos usando tokens armazenados a partir de um arquivo .csv.

### Considerações

* Cada registro no arquivo deve seguir a estrutura e a ordem especificadas, com valores separados por vírgulas:
    - ID da Conta – O identificador da sua conta PayU.
    - Token do Cartão de Crédito
    - Código de Segurança do Cartão de Crédito
    - Número de Parcelas
    - Referência da Venda
    - Descrição da Venda
    - E-mail do Comprador
    - Código ISO da Moeda – [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}).
    - Valor Total (incluindo impostos)
    - Valor Base para Reembolso
    - Valor Adicional
    - Idioma do E-mail – Idioma utilizado nos e-mails enviados ao comprador e ao vendedor. [Veja os idiomas suportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}).
* O arquivo não deve incluir um cabeçalho.
* O arquivo deve estar codificado em UTF-8. Você precisa implementar uma funcionalidade para codificar o conteúdo e enviar a string codificada no parâmetro `contentFile`.
* O arquivo não pode conter mais de 10.000 registros.

<br>

**Exemplo:**

![PrintScreen](/assets/massivePaymentTokenization.png) 

### Parâmetros para Solicitação e Resposta {#parameters-for-request-and-response-5}

<details>

<summary>Solicitação</summary>

<br>

<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| language | Alfanumérico | 2 | Idioma usado na requisição. Determina o idioma das mensagens de erro. [Veja os idiomas suportados]({{< ref "response-codes-and-variables.html#supported-languages" >}}). | Sim |
| command | Alfanumérico | Máx:32 | Definir como `PROCESS_BATCH_TRANSACTIONS_TOKEN`. | Sim |
| merchant | Objeto |  | Objeto contendo os dados de autenticação. | Sim |
| merchant > apiLogin | Alfanumérico | Mín:12 Máx:32 | PayU fornece este nome de usuário ou login. [Como obter meu API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| merchant > apiKey | Alfanumérico | Mín:6 Máx:32 | PayU fornece esta senha. [Como obter minha API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| contentFile | Alfanumérico |  | String codificada em Base64 contendo as informações do cartão de crédito. | Sim |

</details>

<details>

<summary>Resposta</summary>

<br>

<div class="variables"></div>

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| code | Alfanumérico |  | Resposta da transação: `ERROR` ou `SUCCESS`. |
| error | Alfanumérico | Máx:2048 | Mensagem de erro retornada quando o código da transação for `ERROR`. |
| id | Alfanumérico |  | Identificador do processo. |

</details>

### Chamada da API {#api-call-6}

Os exemplos a seguir mostram os corpos da requisição e da resposta.

{{< tabs tabTotal="2" tabID="9" tabName1="JSON" tabName2="XML" >}}

{{< tab tabNum="1" >}}

<br>

**Exemplo de uma Solicitação:**

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

**Exemplo de uma Resposta:**

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

**Exemplo de uma Solicitação:**

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

**Exemplo de uma Resposta:**

```XML
<creditCardTokenBatchResponse>
   <code>SUCCESS</code>
   <id>b721abbc-a9cf-44c6-99ba-91393de2b5d6</id>
</creditCardTokenBatchResponse>
```

{{< /tab >}}

{{< /tabs >}}