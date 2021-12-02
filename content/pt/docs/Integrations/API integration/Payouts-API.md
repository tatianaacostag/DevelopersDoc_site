---
title: "API de Payouts"
linkTitle: "API de Payouts"
date: 2021-08-09T14:58:45-05:00
description: >
  Este recurso permite que você crie pagamentos múltiplos e seguros para beneficiários (usuários, vendedores, provedores, clientes, etc.) usando os fundos que você tem em sua conta PayU.
weight: 60
tags: ["subtopic"]
---

Para termos introdutórios, como solicitar este serviço e mais informações, consulte [Payouts]({{< ref "payouts.html" >}}).

## Como configurar a autenticação {#configuring-the-authentication}
Para usar os métodos de gerenciamento de Payouts ou WebHooks expostos pelo serviço de Payouts, você deve incluir os cabeçalhos `Authorization` e `PublicKey`:

* Para configurar o cabeçalho `Authorization`, use o [Método de autenticação]({{< ref "#authentication" >}}) fornecido pelo serviço de Payouts. <br>Exemplo:

```
Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYyODU0ODE2NywiaWF0IjoxNjI4NTQ4MTY3fQ.jrO3u5ramYKOvoNNb0TNfBuZkbYg1EvPmCDDYXFEO4c 
```
<br>

* Para configurar o cabeçalho `PublicKey`, use sua chave pública, que pode ser encontrada no Módulo PayU (**_Configuração_** > **_Configuração técnica_** > **_Chave pública_**).

![PrintScreen](/assets/Promotions/PublicKey_pt.png)

## Métodos disponíveis {#available-methods}
A API de Payouts inclui os seguintes métodos:

* [Autenticação]({{< ref "#authentication" >}})
* [Solicitar payout]({{< ref "#request-payout" >}})
* [Cancelar ordem de Payout]({{< ref "#cancel-payout-request" >}})
* [Criar ou atualizar um WebHook]({{< ref "#create-or-update-a-webhook" >}})
* [Excluir um WebHook]({{< ref "#delete-a-webhook" >}})
* [Consultar WebHooks]({{< ref "#query-webhooks" >}})

## Autenticação {#authentication}
A primeira etapa, seja qual for o método que você deseja solicitar, é autenticar sua conta usando as credenciais fornecidas pelo PayU.

O método _autenticação_ registra o comércio retornando o Token JWT gerado para usar os serviços expostos pelos Payouts. Este token fica disponível durante 10 minutos após sua criação.

### Chamada API {#api-call}
Para autenticar, envie a solicitação da seguinte forma:

```JAVA
POST
https://{env-api}.payulatam.com/v1.0/authenticate?accountId={accountId}&apiKey={apiKey}&apiLogin={apiLogin}
```
<br>

 O valor da variável `{env-api}` mostrado acima é `sandbox-transfers` para teste e `transfers` para o modo de produção.

| Parâmetro | Descrição  | Obrigatório |
|---|---|:-:|
| accountId | ID da conta do usuário para cada país associado ao comércio. | Sim |
| apiKey | Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |
| apiLogin | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) | Sim |

#### Exemplo resposta {#response-example}

{{< tabs tabTotal="1" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
{
  "token": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYyODU0ODE2NywiaWF0IjoxNjI4NTQ4MTY3fQ.jrO3u5ramYKOvoNNb0TNfBuZkbYg1EvPmCDDYXFEO4c"
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

## Solicitar payout {#request-payout}
Este método permite que você crie uma ou várias solicitações de Payouts para beneficiários, que podem ser novas ou existentes. Assim que você cria a solicitação, ela passa pelos [estados disponíveis]({{< ref "payouts.html#payout-states" >}}) para Payouts.

{{% alert title="Observação" color="info"%}}

Você precisa incluir dois cabeçalhos para usar este método, consulte [Configurar autenticação ]({{< ref "#configuring-the-authentication" >}}) para obter mais informações. Além disso, você precisa saber seu ID de vendedor e conta, você pode obter essas informações no seu Módulo PayU.

{{% /alert %}}

### Chamada API {#api-call-1}
Para criar um pedido de Payout, use a seguinte URL:

```JAVA
POST
https://{env-api}.payulatam.com/v1.0/supplier-transfers/{merchantId}/{accountId}
```
<br>

 O valor da variável `{env-api}` mostrado acima é `sandbox-transfers` para teste e `transfers` para o modo de produção.

| Parâmetro     | Descrição                                                           | Obrigatório |
|---------------|-----------------------------------------------------------------------|:---------:|
| merchantId    | Número de identificação do comércio no sistema PayU.                                |    Sim    |
| accountId     | ID da conta do usuário para cada país associado ao comércio. |    Sim    |

Ambos os parâmetros podem ser encontrados em seu módulo PayU.

### Variáveis para pedido e resposta {#variables-for-request-and-response}

<details>
<summary>Parâmetros de pedido</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| transfers | Lista | | Lista das transferências que você deseja criar. | Sim |
| transfers[n] > value | Numérico | | Valor a ser transferido de seus fundos. A moeda deste valor é a que está configurada em sua conta PayU | Sim |
| transfers[n] > bankAccount | | | Este objeto contém as informações da conta bancária do beneficiário que receberá o pagamento.<br>O beneficiário pode ser existente ou novo. | Sim |
| transfers[n] > bankAccount > id | Alfanumérico | 36 | Identificador da conta bancária do beneficiário.<br>Envie este parâmetro quando quiser solicitar um pagamento para um beneficiário existente. | Não | 
| transfers[n] > bankAccount > supplierType | Alfanumérico | Mín:11 Máx:16 | RTipo de relacionamento entre você e o beneficiário. Você pode escolher um dos seguintes valores: <ul style="margin-bottom: initial;"><li>`SUBMERCHANT`: selecione esta relação se o beneficiário for um vendedor relacionado.</li><li>`RELATED_PROVIDER`: selecione esta relação se o beneficiário for um provedor</li><li>`RELATED_THIRD_PARTY`: selecione este tipo se o beneficiário for um cliente, um funcionário ou qualquer usuário de seus serviços.</li></ul><br>Este parâmetro é obrigatório quando você está criando uma solicitação de pagamento para um novo beneficiário. | Não |
| transfers[n] > bankAccount > accountNumber | Alfanumérico | Máx:17 | Número da conta bancária do beneficiário.<br>Este parâmetro é obrigatório quando você está criando uma solicitação de pagamento para um novo beneficiário. | Não |
| transfers[n] > bankAccount > bankCode | Numérico | Mín:3 Máx:4 | Código do banco que emitiu a conta do beneficiário. [Veja os códigos de bancos]({{< ref "response-codes-and-variables.html#banks-for-payouts" >}}). | Não |
| transfers[n] > bankAccount > accountType | Alfanumérico | 2 | Definir `CC` para conta corrente e `CA` para conta poupança ou `Nequi`<sup>\*</sup>.<br>Este parâmetro é obrigatório quando você está criando uma solicitação de pagamento para um novo beneficiário.<br><sup>\*</sup>_Nequi está disponível na Colômbia_. | Não |
| transfers[n] > bankAccount > country | Alfanumérico | 2 | País da conta bancária no formato ISO 3166 Alpha-2.<br>Este parâmetro é obrigatório quando você está criando uma solicitação de pagamento para um novo beneficiário. | Não |
| transfers[n] > bankAccount > documentNumber | Numérico | 50 | Número de identificação do beneficiário. If the `documentType` is `NIT`, the document number must have a hyphen (`-`) and the check digit. Exemplo: `830140299-6`.<br>Este parâmetro é obrigatório quando você está criando uma solicitação de pagamento para um novo beneficiário. | Não |
| transfers[n] > bankAccount > documentType | Alfanumérico | 2 | Tipo de identificação do beneficiário. [Veja os tipos de documentos]({{< ref "response-codes-and-variables.html#document-types" >}}).<br>Este parâmetro é obrigatório quando você está criando uma solicitação de pagamento para um novo beneficiário. | Não |
| transfers[n] > bankAccount > expeditionDate | Alfanumérico | 10 | Data de expedição do documento de identidade. Formato `YYYY/MM/DD`. | Não |
| transfers[n] > bankAccount > fullName | Alfanumérico |  | Nome completo do beneficiário.<br>Este parâmetro é obrigatório quando você está criando uma solicitação de pagamento para um novo beneficiário. | Não |
| transfers[n] > bankAccount > birthDate | Alfanumérico | 10 | Data de nascimento do beneficiário. Formato `YYYY/MM/DD`. | Não |
| transfers[n] > bankAccount > state| Alfanumérico |  | Estado da conta bancária. Definir `ACTIVE` quando você está criando um beneficiário. | Não |
| transfers[n] > bankAccount > merchantId | Numérico | | Identificador da sua loja no PayU. | Não |
| transfers[n] > description | Alfanumérico | | Informações adicionais sobre o pagamento. | Não |
<!--additionalData-->

</details>

<details>
<summary>Parâmetros de resposta</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| totalSuccessful | Numérico |  | Número de Payouts criados com sucesso. |
| totalFailed | Numérico |  | Número de pagamentos que não puderam ser criados. |
| successfulItems | Lista |  | Lista de itens que foram processados com sucesso. |
| successfulItems[n] > processingStatus | Alfanumérico | 7 | Status do pedido de Payout. Para transações bem-sucedidas, o valor é `SUCCESS` |
| successfulItems[n] > paymentOrderId | Alfanumérico | 36 | ID gerado para a solicitação de Payout. Use este id para atualizar ou cancelar a solicitação. |
| successfulItems[n] > value | Numérico | | Valor do pedido. |
| successfulItems[n] > bankAccount | | | Este objeto contém as informações da conta bancária que receberá o pagamento. |
| successfulItems[n] > bankAccount > processingStatus | Alfanumérico | 7 | BStatus de registro da conta bancária. Para registros bem-sucedidos, o valor é `SUCCESS`. |
| successfulItems[n] > bankAccount > id | Alfanumérico | 36 | Identifier of the registered Bank account. |
| successfulItems[n] > bankAccount > supplierType | Alfanumérico | Mín:11 Máx:16 | Relationship type selected for the payee. |
| successfulItems[n] > bankAccount > accountNumber | Alfanumérico | Máx:17 | Número da conta bancária do beneficiário. |
| successfulItems[n] > bankAccount > bankCode | Numérico | Mín:3 Máx:4 | Código do banco que emitiu a conta do beneficiário. [Veja os códigos de bancos]({{< ref "response-codes-and-variables.html#banks-for-payouts" >}}). |
| successfulItems[n] > bankAccount > bankName | Alfanumérico |  | Nome do banco do beneficiário. |
| successfulItems[n] > bankAccount > accountType | Alfanumérico | 2 | Tipo de conta do beneficiário. |
| successfulItems[n] > bankAccount > country | Alfanumérico | 2 | País da conta bancária . |
| successfulItems[n] > bankAccount > documentNumber | Numérico | 50 | Número de identificação do beneficiário. |
| successfulItems[n] > bankAccount > documentType | Alfanumérico | 2 | Tipo de identificação do beneficiário. |
| successfulItems[n] > bankAccount > expeditionDate | Alfanumérico | 10 | Data de expedição do documento de identidade. |
| successfulItems[n] > bankAccount > fullName | Alfanumérico |  | Nome completo do beneficiário. |
| successfulItems[n] > bankAccount > birthDate | Alfanumérico | 10 | Data de nascimento do beneficiário. |
| successfulItems[n] > bankAccount > state| Alfanumérico |  | Estado da conta bancária. |
| successfulItems[n] > description | Alfanumérico | | Informações adicionais sobre o pagamento. |
| failedItems | Lista |  | Lista de itens que falharam durante o processamento. |
| failedItems[n] > processingStatus | Alfanumérico | 7 | Status do pedido de Payout. Para transações com falha, o valor é `FAILED`. |
| failedItems[n] > failureMessages | Lista | | Lista de mensagens de erro que geraram a falha. |
| failedItems[n] > value | Numérico | | Valor do pedido. |
| failedItems[n] > bankAccount | | | Este objeto contém as informações da conta bancária que falhou. Este elemento possui os mesmos parâmetros do objeto `successfulItems[n].bankAccount`. |

</details>
<br>

O seguinte exemplo de pedido envia três Payouts:
* O primeiro e o segundo pagamento são solicitados para beneficiários não registrados. O segundo falha porque o parâmetro Código bancário tem um valor inválido.
* O beneficiário pagamento é para um beneficiário registrado.

{{< tabs tabTotal="1" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```JSON
{
  "transfers": [
    {
      "value": 1500000,
      "bankAccount": {
        "supplierType": "RELATED_THIRD_PARTY",
        "accountNumber": 2198922910000,
        "bankCode": "007",
        "accountType": "CC",
        "country": "CO",
        "documentNumber": 1026304116,
        "documentType": "CC",
        "expeditionDate": "1996-05-17",
        "fullName": "Santiago Romero Pineda",
        "birthDate": "1975-03-07",
        "merchantId": 510608
      },
      "description": "First Payment"
    },
    {
      "value": 2000000,
      "bankAccount": {
        "supplierType": "RELATED_PROVIDER",
        "accountNumber": 2198922910330,
        "bankCode": "8",
        "accountType": "CA",
        "country": "CO",
        "documentNumber": 102688116,
        "documentType": "CC",
        "expeditionDate": "2001-05-17",
        "fullName": "Juan Perez",
        "birthDate": "1985-04-17",
        "merchantId": 510608
      },
      "description": "Payment of supplies"
    },
    {
      "value": 4500000,
      "bankAccount": {
        "id": "e202507e-5551-4b67-be2a-a2a834bf1438"
      },
      "description": "Registered supplier payment"
    }
  ]
}
```
<br>

Exemplo resposta:
```JSON
{
    "totalSuccessful": 2,
    "totalFailed": 1,
    "successfulItems": [
        {
            "processingStatus": "SUCCESS",
            "paymentOrderId": "7202a9a7-ef51-4202-bd23-e604f9cbb25b",
            "value": 1500000.00,
            "bankAccount": {
                "processingStatus": "SUCCESS",
                "id": "e202507e-5551-4b67-be2a-a2a834bf1438",
                "supplierType": "RELATED_THIRD_PARTY",
                "accountNumber": "2198922910000",
                "bankCode": "007",
                "bankName": "BANCOLOMBIA",
                "accountType": "CC",
                "country": "CO",
                "documentNumber": "1026304116",
                "documentType": "CC",
                "expeditionDate": "1996-05-16T05:00:00.000+00:00",
                "fullName": "Santiago Romero Pineda",
                "birthDate": "1975-03-06T05:00:00.000+00:00",
                "state": "ACTIVE"
            },
            "description": "First Payment"
        },
        {
            "processingStatus": "SUCCESS",
            "paymentOrderId": "32740b81-5ecc-466c-bc09-699e6e5ceefb",
            "value": 4500000.00,
            "bankAccount": {
                "processingStatus": "SUCCESS",
                "id": "8f425a79-3f15-4e64-a1bf-2f7c087587ec",
                "supplierType": "RELATED_THIRD_PARTY",
                "accountNumber": "0200005555",
                "bankCode": "013",
                "bankName": "BBVA COLOMBIA",
                "accountType": "CA",
                "country": "CO",
                "documentNumber": "81856522",
                "documentType": "CC",
                "expeditionDate": "2002-02-17T05:00:00.000+00:00",
                "fullName": "Jorge Gutierrez",
                "birthDate": "1986-02-11T05:00:00.000+00:00",
                "state": "ACTIVE"
            },
            "description": "Registered supplier payment"
        }
    ],
    "failedItems": [
        {
            "processingStatus": "FAILED",
            "failureMessages": [
                "There is no registered bank with code: 8"
            ],
            "value": 2000000,
            "bankAccount": {
                "processingStatus": "FAILED",
                "supplierType": "RELATED_PROVIDER",
                "accountNumber": "2198922910330",
                "bankCode": "8",
                "accountType": "CA",
                "country": "CO",
                "documentNumber": "102688116",
                "documentType": "CC",
                "expeditionDate": "2001-05-17T00:00:00.000+00:00",
                "fullName": "Juan Perez",
                "birthDate": "1985-04-17T00:00:00.000+00:00"
            },
            "description": "Payment of supplies"
        }
    ]
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```XML

```
<br>

Exemplo resposta:
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

<!--## Update payout request
This method lets you request the update of the bank information of a payee on a running payout request. Por exemplo, this method is useful to change the bank account number do beneficiário.

You can only request the update of the information of a payee when the Payout status is in `IN_PAYU_PROCESS` ou earlier. Consulte [Payout states]({{< ref "payouts.html#payout-states" >}}) para obter mais informações. 

{{% alert title="Observação" color="info"%}}

Você precisa incluir dois cabeçalhos para usar este método, consulte [Configurar autenticação ]({{< ref "#configuring-the-authentication" >}}) para obter mais informações. Além disso, você precisa saber seu ID de vendedor e conta, você pode obter essas informações no seu Módulo PayU.

{{% /alert %}}

### Chamada API {#api-call}
To update a Payout request, use the following URL:

```JAVA
PUT
https://{env-api}.payulatam.com/v1.0/supplier-transfers/bank-account/{merchantId}/{accountId}/{bankAccountId}
```
<br>

O valor da variável `{env-api}` is `sandbox-transfers` para teste e `transfers` para o modo de produção.

| Parâmetro     | Descrição                                                                 | Obrigatório |
|---------------|-----------------------------------------------------------------------------|:---------:|
| merchantId    | Número de identificação do comércio no sistema PayU.                                      |    Sim    |
| accountId     | ID da conta do usuário para cada país associado ao comércio.       |    Sim    |
| bankAccountId | ID returned by the [Solicitar payout service]({{< ref "#request-payout" >}}). |    Sim    |

### Variáveis para pedido

<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| id | Alfanumérico | 36 | Identificador da conta bancária do beneficiário. | Sim |
| accountNumber | Alfanumérico | Máx:17 | Número da conta bancária do beneficiário. | Sim |-->
<!--additionalData-->

<!--A seguir estão os exemplos de pedido e resposta para este método.

{{< tabs tabTotal="1" tabID="3" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```JSON
{
  "id": "1f92a225-9559-4b7f-9739-e6bb27b8b838",
  "accountNumber": 2198922910031
}
```
<br>

Exemplo resposta:
```JSON
{
    "message": "Update received"
}
```
{{< /tab >}}
-->
<!--{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```XML

```
<br>

Exemplo resposta:
```XML

```
{{< /tab >}}-->
<!--{{< /tabs >}}-->

## Cancelar ordem de Payout {#cancel-payout-request}
Este método permite solicitar o cancelamento de uma solicitação de Payout. Você só pode solicitar o cancelamento de um Payout quando seu status for `IN_PAYU_PROCESS` ou anterior. Consulte [Payout states]({{< ref "payouts.html#payout-states" >}}) para obter mais informações. 

{{% alert title="Observação" color="info"%}}

Você precisa incluir dois cabeçalhos para usar este método, consulte [Configurar autenticação ]({{< ref "#configuring-the-authentication" >}}) para obter mais informações. Além disso, você precisa saber seu ID de vendedor e conta, você pode obter essas informações no seu Módulo PayU.

{{% /alert %}}

### Chamada API {#api-call-2}
Para cancelar um pedido de Payout, use a seguinte URL:

```JAVA
DELETE
https://{env-api}.payulatam.com/v1.0/supplier-transfers/{merchantId}/{accountId}/{paymentOrderId}
```
<br>

O valor da variável `{env-api}` is `sandbox-transfers` para teste e `transfers` para o modo de produção.

| Parâmetro | Descrição | Obrigatório |
|---|---|:-:|
| merchantId | Número de identificação do comércio no sistema PayU.  | Sim |
| accountId | ID da conta do usuário para cada país associado ao comércio. | Sim |
| paymentOrderId | ID de pagamento gerado quando o pedido foi criado pelo [serviço de Solicitar pagamento]({{< ref "#request-payout" >}}). |  Sim |

### Variáveis para pedido {#variables-for-request}

<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| comments | Alfanumérico | | Motivo para cancelar a solicitação de Payout. | Não |
| pushPaymentId | Alfanumérico | | ID de Payout da solicitação a ser cancelada. | Não |

A seguir estão os exemplos de pedido e resposta para este método.

{{< tabs tabTotal="1" tabID="4" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```JSON
{
  "comments": "Request cancellation for payout",
  "pushPaymentId": "1f92a225-9559-4b7f-9739-e6bb27b8b838"
}
```
<br>

Exemplo resposta:
```JSON
{
    "message": "Cancellation request received"
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```XML

```
<br>

Exemplo resposta:
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

## Create ou Update a WebHook {#create-or-update-a-webhook}
Este método permite criar ou atualizar um WebHook onde é possível configurar uma URL em que o PayU notifica os estados de um pagamento via `POST`.

Você pode configurar um WebHook para os seguintes eventos:
* **Criação de transferência**: envia uma notificação quando uma solicitação de payout é criada. Para habilitar estas notificações, inclua o valor `TRANSFER_CREATION` no parâmetro da lista `enabledEvents`.
* **Atualização de transferência**: envia uma notificação quando a validação da triagem de sanção rejeita o beneficiário. Para habilitar estas notificações, inclua o valor `TRANSFER_UPDATE` no parâmetro da lista `enabledEvents`.
* **Resultado de validação**: envia uma notificação quando o beneficiário aprova a validação da triagem de sanção e quando a transferência é rejeitada pelo banco. Inclui o valor `VALIDATION_RESULT` no parâmetro da lista `enabledEvents`.

[Clique aqui para conhecer as variáveis nas notificações]({{< ref "payouts.md#variables-in-the-notifications" >}}).

{{% alert title="Observação" color="info"%}}

Você precisa incluir dois cabeçalhos para usar este método, consulte [Configurar autenticação ]({{< ref "#configuring-the-authentication" >}}) para obter mais informações. Além disso, você precisa saber seu ID de vendedor e conta, você pode obter essas informações no seu Módulo PayU.

{{% /alert %}}

### Chamada API {#api-call-3}
* Para criar um WebHook, use:

```JAVA
POST
https://{env-api}.payulatam.com/v1.0/webhooks/{merchantId}/{accountId}
```
<br>

* Para atualizar um WebHook, use:

```JAVA
PUT
https://{env-api}.payulatam.com/v1.0/webhooks/{merchantId}/{accountId}
```
<br>

O valor da variável `{env-api}` is `sandbox-transfers` para teste e `transfers` para o modo de produção.

| Parâmetro      | Descrição                                                                 | Obrigatório |
|----------------|---------------------------------------------------------------------------|:-----------:|
| merchantId     | Número de identificação do comércio no sistema PayU.                      |     Sim     |
| accountId      | ID da conta do usuário para cada país associado ao comércio.              |     Sim     |

### Variáveis para pedido e resposta {#variables-for-request-and-response-1}

<details>
<summary>Parâmetros de pedido</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição | Obrigatório |
|---|---|---|---|:-:|
| id | Alfanumérico |  | Id do WebHook que você deseja atualizar. Este parâmetro é obrigatório ao atualizar um WebHook | Não |
| accountId | Numérico | | ID da conta do usuário para cada país associado ao comércio. | Sim |
| callbackUrl | Alfanumérico | | URL usada para receber as notificações de `POST` enviadas pelo PayU de acordo com os eventos selecionados. Esta URL deve ser única para cada WebHook. | Sim |
| description | Alfanumérico | | Descrição do WebHook que você deseja criar. | Sim |
| enabledEvents | Lista | Máx:3 | Lista dos eventos que gerarão uma notificação para a URL configurada quando ocorrerem. Pelo menos um evento deve ser selecionado.<br>Os valores possíveis são: `TRANSFER_UPDATE`, `TRANSFER_CREATION`, `VALIDATION_RESULT`. | Sim |

</details>

<details>
<summary>Parâmetros de resposta</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| id | Alfanumérico |  | Id do WebHook criado. |
| created | Date |  | Data de criação do WebHook. Formato `YYYY-DD-MM hh:mm:ss`. |
| accountId | Numérico | | ID da conta do usuário para cada país associado ao comércio. |
| callbackUrl | Alfanumérico | | URL usada que receberá notificações de `POST` de acordo com os eventos selecionados. |
| description | Alfanumérico | | Descrição do WebHook criado. |
| enabledEvents | Lista | Máx:3 | Lista dos eventos selecionados. |
| status | Alfanumérico | 7 | Estado do WebHook. Por padrão, o estado do novo WebHook é `ENABLED`. |
| processingStatus | Alfanumérico | 7 | Estado de criação ou atualização do WebHook. Por padrão, este estado é `SUCCESS`. |

</details>

<br>

A seguir estão os exemplos de pedido e resposta para este método.

{{< tabs tabTotal="1" tabID="5" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo pedido:
```JSON
{
  "accountId": 1,
  "callbackUrl": "https://wwww.callbackurltest.com/",
  "description": "Web Hook For Test Swagger",
  "enabledEvents": [
    "TRANSFER_UPDATE",
    "TRANSFER_CREATION",
    "VALIDATION_RESULT"
  ]
}
```
<br>

Exemplo resposta:
```JSON
{
    "processingStatus": "SUCCESS",
    "id": "256dd74e-9187-4efb-8238-fa29bf8f587a",
    "created": "2021-08-27T21:57:28.874+00:00",
    "accountId": 1,
    "callbackUrl": "https://wwww.callbackurltest.com/",
    "description": "Web Hook For Test Swagger",
    "enabledEvents": [
        "TRANSFER_UPDATE",
        "TRANSFER_CREATION",
        "VALIDATION_RESULT"
    ],
    "status": "ENABLED"
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
<br>

Exemplo pedido:
```XML

```
<br>

Exemplo resposta:
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

## Excluir um WebHook {#delete-a-webhook}
Este método permite excluir um WebHook criado anteriormente. Assim que exclui um WebHook, você para de receber notificações.

{{% alert title="Observação" color="info"%}}

Você precisa incluir dois cabeçalhos para usar este método, consulte [Configurar autenticação ]({{< ref "#configuring-the-authentication" >}}) para obter mais informações. Além disso, você precisa saber seu ID de vendedor e conta, você pode obter essas informações no seu Módulo PayU.

{{% /alert %}}

### Chamada API {#api-call-4}
Para excluir um WebHook, use a seguinte URL:

```JAVA
DELETE
https://{env-api}.payulatam.com/v1.0/webhooks/{merchantId}/{accountId}/{id}
```
<br>

O valor da variável `{env-api}` is `sandbox-transfers` para teste e `transfers` para o modo de produção.

| Parâmetro      | Descrição                                                                 | Obrigatório |
|----------------|---------------------------------------------------------------------------|:-----------:|
| merchantId     | Número de identificação do comércio no sistema PayU.                      |     Sim     |
| accountId      | ID da conta do usuário para cada país associado ao comércio.              |     Sim     |
| id             | Id do WebHook que você deseja excluir.                                    |     Sim     |

#### Exemplo resposta {#response-example-1}

<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| processingStatus | Alfanumérico | 7 | Estado de exclusão do WebHook. Por padrão, este estado é `SUCCESS`. |
| id | Alfanumérico |  | Id do WebHook excluído. |
| status | Alfanumérico | 7 | Estado do WebHook. Por padrão, o estado do WebHook excluído é `DELETED`. |

{{< tabs tabTotal="1" tabID="6" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
{
    "processingStatus": "SUCCESS",
    "id": "054e0fc5-a025-4a00-b666-95673c11dee1",
    "status": "DELETED"
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

## Consultar WebHooks {#query-webhooks}
Você pode consultar WebHooks relacionados à sua conta pelo id do WeHook ou pelo id da conta. Ambos os métodos são explicados a seguir.

{{% alert title="Observação" color="info"%}}

Você precisa incluir dois cabeçalhos para usar este método, consulte [Configurar autenticação ]({{< ref "#configuring-the-authentication" >}}) para obter mais informações. Além disso, você precisa saber seu ID de vendedor e conta, você pode obter essas informações no seu Módulo PayU.

{{% /alert %}}

### Consultar WebHooks por Id {#query-webhooks-by-id}
Este método permite consultar as informações de um determinado WebHook usando seu id. Para consultar um WebHook, use a seguinte URL:

```JAVA
GET
https://{env-api}.payulatam.com/v1.0/webhooks/{merchantId}/{accountId}/{id}
```
<br>

O valor da variável `{env-api}` is `sandbox-transfers` para teste e `transfers` para o modo de produção.

| Parâmetro      | Descrição                                                                   | Obrigatório |
|----------------|-----------------------------------------------------------------------------|:-----------:|
| merchantId     | Número de identificação do comércio no sistema PayU.                        |    Sim    |
| accountId      | ID da conta do usuário para cada país associado ao comércio.                |    Sim    |
| id             | Id do WebHook que você deseja consultar.                                    |    Sim    |

#### Exemplo resposta {#response-example-2}

<details>
<summary>Parâmetros de resposta</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| processingStatus | Alfanumérico | 7 | Estado da consulta. Por padrão, este estado é `SUCCESS`. |
| id | Alfanumérico |  | Id do WebHook. |
| created | Date |  | Data de criação do WebHook. Formato `YYYY-DD-MM hh:mm:ss`. |
| accountId | Numérico | | ID da conta do usuário para cada país associado ao comércio. |
| callbackUrl | Alfanumérico | | URL usada que receberá notificações de `POST` de acordo com os eventos selecionados. |
| description | Alfanumérico | | Descrição of the WebHook. |
| enabledEvents | Lista | Máx:3 | Lista dos eventos selecionados. |
| status | Alfanumérico | 7 | Estado do WebHook. Por padrão, o estado do novo WebHook é `ENABLED`. |

</details>
<br>

{{< tabs tabTotal="1" tabID="7" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
{
    "processingStatus": "SUCCESS",
    "id": "9628b74d-e2fb-40cc-b137-b156d1401641",
    "created": "2021-08-28T00:52:26.206+00:00",
    "accountId": 515058,
    "callbackUrl": "https://wwww.callbackurltest.com/",
    "description": "Web Hook For Test Swagger",
    "enabledEvents": [
        "TRANSFER_UPDATE",
        "TRANSFER_CREATION",
        "VALIDATION_RESULT"
    ],
    "status": "ENABLED"
}
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
```XML

```
{{< /tab >}}-->
{{< /tabs >}}

### Consultar webhooks por conta {#query-webhooks-by-account}
Este método permite que você consulte as informações de todos os WebHooks criados em sua conta. Para consultar a lista de WebHooks, use a seguinte URL:

```JAVA
GET
https://{env-api}.payulatam.com/v1.0/webhooks/account/{merchantId}/{accountId}
```
<br>

O valor da variável `{env-api}` is `sandbox-transfers` para teste e `transfers` para o modo de produção.

| Parâmetro      | Descrição                                                                 | Obrigatório |
|----------------|---------------------------------------------------------------------------|:-----------:|
| merchantId     | Número de identificação do comércio no sistema PayU.                      |     Sim     |
| accountId      | ID da conta do usuário para cada país associado ao comércio.              |     Sim     |

#### Exemplo resposta {#response-example-3}

<details>
<summary>Parâmetros de resposta</summary>
<br>
<div class="variables"></div>

| Nome do campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| processingStatus | Alfanumérico | 7 | Estado da consulta. Por padrão, este estado é `SUCCESS`. |
| id | Alfanumérico |  | Id do WebHook. |
| created | Date |  | Data de criação do WebHook. Formato `YYYY-DD-MM hh:mm:ss`. |
| accountId | Numérico | | ID da conta do usuário para cada país associado ao comércio. |
| callbackUrl | Alfanumérico | | URL usada que receberá notificações de `POST` de acordo com os eventos selecionados. |
| description | Alfanumérico | | Descrição of the WebHook. |
| enabledEvents | Lista | Máx:3 | Lista dos eventos selecionados. |
| status | Alfanumérico | 7 | Estado do WebHook. Por padrão, o estado do novo WebHook é `ENABLED`. |

</details>
<br>

{{< tabs tabTotal="1" tabID="8" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
```JSON
[
    {
        "processingStatus": "SUCCESS",
        "id": "9628b74d-e2fb-40cc-b137-b156d1401641",
        "created": "2021-08-28T00:52:26.206+00:00",
        "accountId": 515058,
        "callbackUrl": "https://wwww.callbackurltest.com.co/",
        "description": "Web Hook For Test Swagger",
        "enabledEvents": [
            "TRANSFER_UPDATE",
            "TRANSFER_CREATION",
            "VALIDATION_RESULT"
        ],
        "status": "ENABLED"
    },
    {
        "processingStatus": "SUCCESS",
        "id": "672497c2-00f8-4787-a396-4024042eaa20",
        "created": "2021-09-15T16:04:49.131+00:00",
        "accountId": 515058,
        "callbackUrl": "https://wwww.callbackurltest.com.co/",
        "description": "Web Hook For Test Swagger",
        "enabledEvents": [
            "TRANSFER_UPDATE",
            "VALIDATION_RESULT"
        ],
        "status": "ENABLED"
    }
]
```
{{< /tab >}}

<!--{{< tab tabNum="2" >}}
```XML

```
{{< /tab >}}-->
{{< /tabs >}}