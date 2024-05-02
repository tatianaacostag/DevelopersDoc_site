---
title: "BigCommerce"
linkTitle: "BigCommerce"
date: 2023-04-27T10:30:35-05:00
description:
  Este guia descreve os passos para integrar o PayU com o seu site BigCommerce. 
weight: 11
tags: ["subtopic"]
---

## Introdução {#introduction}
O BigCommerce é uma plataforma de comércio digital que permite estabelecer rapidamente uma loja online equipada com funcionalidades prontas para uso. Para mais detalhes, confira a <a href="https://www.bigcommerce.com/press" target="_blank">página oficial do BigCommerce</a>.

## Pré-requisitos {#prerequisites}
Para realizar a integração, você precisa de:
* Uma conta PayU Latam
* Uma conta BigCommerce

## Instalando a extensão {#installing-the-extension}
1. Acesse o Marketplace do BigCommerce, clique em **Meus Apps**, encontre a extensão PayU e clique em **Instalar**:

<img src="/assets/BigCommerce/Bigcommerce1.png" alt="PrintScreen" width="700">
<p></p>

2. Marque a caixa de seleção e clique em **Confirmar** para prosseguir com a instalação:

<img src="/assets/BigCommerce/Bigcommerce2.png" alt="PrintScreen" width="700">
<p></p>

3. Após a instalação, a interface do aplicativo aparecerá da seguinte forma:

<img src="/assets/BigCommerce/Bigcommerce3.png" alt="PrintScreen" width="700">

## Utilizando a extensão {#utilizing-the-extension}
### Configuração de métodos de pagamento
Personalize os métodos de pagamento exibidos em seu site durante o checkout. Consulte nossos <a href="https://developers.payulatam.com/latam/pt/docs/getting-started/select-your-payment-method.html" target="_blank">métodos de pagamento disponíveis</a>.

1. Após a instalação, selecione **Ativar PayU Latam** para integrar o aplicativo à sua loja BigCommerce.

<img src="/assets/BigCommerce/Bigcommerce4.png" alt="PrintScreen" width="700">
<p></p>

2. Personalize o título para a opção de pagamento com cartão (por exemplo, *Pagar com Cartão*). Este título será visível para os usuários na página de checkout.  

<img src="/assets/BigCommerce/Bigcommerce5.png" alt="PrintScreen" width="700">
<p></p>

3. Escolha o formato de exibição para as opções de pagamento com cartão disponíveis durante o checkout. Você pode escolher uma das seguintes opções:  

*	Exibindo *Powered by PayU Latam* e o logotipo no formulário de pagamento.
* Exibindo logotipos de cartão de crédito na página de checkout.

<img src="/assets/BigCommerce/Bigcommerce6.png" alt="PrintScreen" width="700">

{{% alert title="Importante" color="warning"%}}
Para habilitar métodos de pagamento alternativos (dinheiro e transferências bancárias), selecione **Ativar Checkout Web (APM)**.
{{% /alert %}}

4. Adicione um provedor para um país específico da PayU Latam, para fazer isso, clique em **Adicionar Provedor**. Você pode habilitar ou desabilitar cada provedor usando a opção na coluna **Status**, e pode atualizar suas credenciais clicando no botão **Editar**. 

<img src="/assets/BigCommerce/Bigcommerce7.png" alt="PrintScreen" width="700">
<p></p>

Além disso, escolha o modo **Teste** ou **Produção** para cada provedor na **Configuração do Onboarding**.

<img src="/assets/BigCommerce/Bigcommerce8.png" alt="PrintScreen" width="700">
<p></p>

**Campos obrigatórios para adicionar um novo provedor:**
| Parâmetro | Descrição |
|---|---|
| Select Payu Latam country | Escolha o país que você deseja configurar. |
| API Login | Usuário ou login fornecido pela PayU. <a href="https://developers.payulatam.com/latam/pt/docs/integrations.html#api-key-and-api-login" target="_blank">Como obter meu Login da API</a>. |
| API Key | Chave única do seu comércio. <a href="https://developers.payulatam.com/latam/pt/docs/integrations.html#api-key-and-api-login" target="_blank">Como obter minha Chave da API</a>. |
| Public Key| Chave única do seu comércio. <a href="https://developers.payulatam.com/latam/pt/docs/integrations.html#api-key-and-api-login" target="_blank">Como obter minha Chave Pública</a>. |
| Account ID | ID da conta PayU para o país selecionado. |
| Merchant ID | ID do seu comércio na PayU Latam. |
<p></p>

5. Selecione o fluxo de transação:
* Para fluxo de uma etapa, selecione **Capturar ao fazer o pedido**.
* Para fluxo de duas etapas, selecione **Capturar no Envio**.

<img src="/assets/BigCommerce/Bigcommerce9.png" alt="PrintScreen" width="700">
<p></p>

Consulte o documento <a href="https://developers.payulatam.com/latam/pt/docs/services/payments.html#payment-flows" target="_blank">Fluxo de Pagamentos</a> para saber mais sobre as opções.

{{% alert title="Importante" color="warning"%}}
A opção de processamento em mais de uma etapa se aplica apenas a pagamentos com cartão (sujeito a <a href="https://developers.payulatam.com/latam/pt/docs/services/payments.html#payment-flows" target="_blank">disponibilidade</a> em cada país). Transações com outros métodos de pagamento requerem autorização e captura em uma única etapa.
{{% /alert %}}

{{% alert title="Note" color="info"%}}
As opções de multi-loja serão visíveis abaixo da seção de opções de pagamento:

<img src="/assets/BigCommerce/Bigcommerce10.png" alt="PrintScreen" width="700">
{{% /alert %}} 

### Gerenciamento de pedidos e reembolsos

1. Para gerenciar os pedidos, clique no botão **Painel de Pedidos** no canto superior direito.

<img src="/assets/BigCommerce/Bigcommerce11.png" alt="PrintScreen" width="700">
<p></p>

2. A grade do Painel de Pedidos exibe os status de pagamento para cada pedido:

<img src="/assets/BigCommerce/Bigcommerce12.png" alt="PrintScreen" width="500">
<p></p>

3. Para processar um reembolso, clique no botão **Reembolso** na coluna **Ações**.

<img src="/assets/BigCommerce/Bigcommerce13.png" alt="PrintScreen" width="500">

{{% alert title="Importante" color="warning"%}}
* Os reembolsos estão disponíveis apenas para transações com cartão.
* Consulte o <a href="https://developers.payulatam.com/latam/pt/payu-module-documentation/payu-operations/refunds-mp.html" target="_blank">documento de reembolsos</a> para detalhes por país.
{{% /alert %}}

## Testando a integração
Antes de iniciar transações reais, é recomendável testar sua integração. Certifique-se de ter adicionado um provedor com credenciais de teste na Configuração do seu BigCommerce.

1. Faça login em sua loja, selecione um produto para teste e prossiga para o checkout. Certifique-se de que o país de entrega corresponda ao destino:

<img src="/assets/BigCommerce/Bigcommerce14.png" alt="PrintScreen" width="400">
<p></p>

2. Selecione o método de pagamento desejado:

* **A) Cartão:** Insira os detalhes do cartão e clique em **Pagar com Cartão**.

<img src="/assets/BigCommerce/Bigcommerce15.png" alt="PrintScreen" width="400">

{{% alert title="Nota" color="info"%}}
Você pode personalizar o título da opção de pagamento com cartão conforme visto em [Configuração dos métodos de pagamento](#payment_methods_configuration).
{{% /alert %}} 

* **B) Pagar com Checkout Web:** Para outros métodos, selecione **Pagar com Checkout Web** e conclua o pagamento.

<img src="/assets/BigCommerce/Bigcommerce16.png" alt="PrintScreen" width="400">
<p></p>

3. Após a aprovação, verifique a compra em:

* Painel de Pedidos do BigCommerce: **PayU Latam > Painel de Pedidos**

<img src="/assets/BigCommerce/Bigcommerce11.png" alt="PrintScreen" width="700">
<p></p>

* Módulo PayU: **Módulo de Relatório de Vendas**.

<img src="/assets/BigCommerce/Bigcommerce17.png" alt="PrintScreen" width="700">
<p></p>

## Suporte:
Para problemas técnicos ou dúvidas sobre esta extensão, entre em contato com nossa equipe de suporte em **tecnico.co@payu.com** ou visite <a href="https://brazil.payu.com/contato/" target="_blank">nosso site</a>. Ao enviar um e-mail, inclua os detalhes da extensão no assunto e um resumo do problema no corpo.
