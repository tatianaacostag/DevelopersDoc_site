---
title: "Omnibees"
linkTitle: "Omnibees"
date: 2025-03-10T10:30:35-05:00
description:
  Este guia explica como integrar o PayU com o Omnibees. 
weight: 3
tags: ["subtopic"]
---

O Omnibees é uma plataforma de distribuição e gerenciamento de hotéis que fornece tecnologia para que os hotéis gerenciem reservas e otimizem a receita em vários canais de vendas. Para mais informações, visite o <a href="https://omnibees.com" target="_blank">site oficial do Omnibees</a>.

## Pré-requisitos

Antes de integrar o PayU com o Omnibees, certifique-se de ter o seguinte:

* Uma <a href="https://developers.payulatam.com/latam/pt/docs/getting-started/create-an-account.html" target="_blank">conta PayU Latam ativa</a>.
* Uma <a href="https://control.paymentsos.com/signup" target="_blank">conta PayU Enterprise (PaymentsOS) ativa</a> no modo de produção/ao vivo (veja os detalhes de ativação abaixo).

## Ativando sua Conta PayU Enterprise (Modo ao vivo)

Por padrão, novas contas são configuradas no modo de teste. Para habilitar transações ao vivo, entre em contato com seu gerente de conta e envie uma solicitação com os seguintes detalhes:

* **Merchant ID:** Localize o Merchant ID da sua conta LATAM no <a href="https://developers.payulatam.com/latam/pt/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html#merchant-and-account-ids" target="_blank">Painel de Gerenciamento do PayU</a>.
* **Account ID:** Encontre seu Account ID no painel de controle do PayU Enterprise clicando no seu nome de usuário no canto superior direito.
<br>

![PrintScreen](/assets/VTEX/vtex01pt.png)

## Integrando o PayU com o Omnibees

A integração consiste em duas etapas principais:

1. Configurando sua conta PayU Enterprise
2. Entrando em contato com o Omnibees para habilitar a integração

### 1. Configurando sua Conta PayU Enterprise

O PayU Enterprise opera através do PaymentsOS, que atua como middleware entre o PayU Latam e o Omnibees. A configuração inclui os seguintes componentes:

* Configuração do provedor
* Configuração da unidade de negócios
* Criação de webhook

#### 1.1 Configurando um Provedor

Um _provedor_ armazena suas credenciais de processamento de pagamento. Siga estas etapas para configurar um:

1. No painel do PayU Enterprise, navegue até **Configurations** > **Providers**.

![PrintScreen](/assets/VTEX/vtex02.png)

2. Clique no módulo correspondente ao país ou divisão que você está configurando.

3. Preencha os seguintes campos:

| Campo | Descrição |
|---|---|
| Configuration Name | Insira um nome para a configuração do provedor. |
| Description | Forneça uma descrição opcional. |
| apiLogin | Usuário ou login fornecido pelo PayU. [Obter API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| apiKey | Chave exclusiva do seu comércio. [Obter API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| accountId | Account ID do PayU com base no seu país de operação. |
| merchantId | Seu ID de comércio no PayU Latam. |
| paymentCountry | País de processamento no formato ISO 3166 Alpha-3. |
| multicapture | Selecione **None**. |
| cashRedirect | Selecione **None**. |

{{% alert title="Nota" color="info"%}}

Se você estiver usando versões mais antigas do Módulo Administrativo do PayU, encontre as informações da sua conta em **Configurations** > **Technical Information**.

![PrintScreen](/assets/omnibees/omnibees1.png)

{{% /alert %}}

4. Clique em **Create**.

<img src="/assets/omnibees/omnibees2.png" alt="PrintScreen" style="width: 450px; height: auto;">
<br>

#### 1.2 Criando uma Unidade de Negócios

Uma _unidade de negócios_ vincula a configuração do provedor com as credenciais da API do PayU Enterprise para processar transações. Siga estas etapas:

1. No painel, vá para **Configurations** > **Business Units**.

<img src="/assets/VTEX/vtex04.png" alt="PrintScreen" style="width: 400px; height: auto;">
<br>

2. Clique em **Create Business Unit** e insira:

| Campo | Descrição |
|---|---|
| Business Unit Name | Deve estar em minúsculas e não conter espaços. **Este valor não pode ser alterado posteriormente, portanto, garanta a precisão.** |
| Description | Descrição opcional. |

3. Na seção **Choose a Default Provider for This Business Unit**, selecione o provedor criado na Etapa 1.1 e clique em **Create**.

<img src="/assets/omnibees/omnibees3.png" alt="PrintScreen" style="width: 700px; height: auto;">
<br>

{{% alert title="Nota" color="info"%}}

Você pode clicar na guia da unidade de negócios para recuperar os seguintes detalhes necessários para a integração do Omnibees: **App ID**, **Public API key** e **Private API key**.

<img src="/assets/omnibees/omnibees4.png" alt="PrintScreen" style="width: 450px; height: auto;">

{{% /alert %}}

#### 1.3 Criando um Webhook

O webhook recebe notificações do Omnibees quando o status de uma transação muda. Siga estas etapas:

1. No painel, navegue até **Configurations** > **Webhooks**.

<img src="/assets/VTEX/vtex06.png" alt="PrintScreen" style="width: 400px; height: auto;">
<br>

2. Clique em **Create a Webhook Endpoint** e insira:

   ```
   https://paymentgateways.omnibees.com/PayUWebhookService.ashx
   ```

3. Habilite **Update** e **Create** para o evento **Charge** em **Payment Event Alerts**.

4. Atribua o webhook à unidade de negócios criada anteriormente e selecione a versão mais recente do webhook.

5. Clique em **Create**.

<img src="/assets/omnibees/omnibees5.png" alt="PrintScreen" style="width: 600px; height: auto;">
<br>

## 2. Entrando em Contato com o Omnibees para Habilitar a Integração

Depois que os componentes do PayU Enterprise estiverem configurados, envie um e-mail para **servicedesk@omnibees.com** para solicitar a ativação. Inclua os seguintes detalhes:

* App ID
* Public API key
* Private API key
* Unidade de negócios (opcional)

## Gerenciamento de Usuários no PayU Enterprise

O PayU Enterprise permite acesso de usuário baseado em função para unidades de negócios. Para obter detalhes sobre o gerenciamento de usuários e permissões, consulte a <a href="https://developers.paymentsos.com/docs/features/control-center.html#user-management" target="_blank">documentação do PayU Enterprise</a>.
