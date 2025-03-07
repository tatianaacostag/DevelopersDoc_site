---
title: "BigCommerce"
linkTitle: "BigCommerce"
date: 2023-04-27T10:30:35-05:00
description:
  Este guia oferece instruções detalhadas para integrar o PayU à sua loja BigCommerce, permitindo soluções de pagamento sem complicação. 
weight: 11
tags: ["subtopic"]
---

BigCommerce é uma plataforma robusta de e-commerce projetada para ajudar você a configurar e gerenciar uma loja online rapidamente, oferecendo uma variedade de recursos prontos para uso para uma experiência perfeita. Para mais informações, visite o <a href="https://www.bigcommerce.com/press" target="_blank">site oficial do BigCommerce</a>

## Pré-requisitos {#prerequisites}

Antes de iniciar a integração, certifique-se de ter o seguinte:
* Uma conta PayU Latam
* Uma conta BigCommerce

## Instalando a Extensão {#installing-the-extension}

1. Acesse o BigCommerce Marketplace, selecione **My Apps**, localize a extensão do PayU e clique em **Install** para iniciar a instalação.

<img src="/assets/BigCommerce/Bigcommerce1.png" alt="PrintScreen" width="700">
<p></p>

2. Marque a caixa de seleção e clique em **Confirm** para continuar com a instalação.

<img src="/assets/BigCommerce/Bigcommerce2.png" alt="PrintScreen" width="700">
<p></p>

3. Após a instalação, a interface do aplicativo aparecerá conforme abaixo.

<img src="/assets/BigCommerce/Bigcommerce3.png" alt="PrintScreen" width="700">

## Configuração de Métodos de Pagamento

Configure e personalize os métodos de pagamento para sua página de checkout. Consulte nossos <a href="https://developers.payulatam.com/latam/pt/docs/getting-started/select-your-payment-method.html" target="_blank">métodos de pagamento disponíveis</a>.

1. Após a instalação, ative a opção **Enable PayU Latam** para integrar o aplicativo à sua loja BigCommerce.

<img src="/assets/BigCommerce/Bigcommerce4.png" alt="PrintScreen" width="700">
<p></p>

2. Personalize o título para a opção de pagamento com cartão (por exemplo, *Pagar com Cartão*). Este título será visível para os usuários na página de checkout.  

<img src="/assets/BigCommerce/Bigcommerce5.png" alt="PrintScreen" width="700">
<p></p>

3. Escolha o formato de exibição das opções de pagamento com cartão disponíveis no checkout:
*	Exibir *Powered by PayU Latam* e o logotipo no formulário de pagamento.
* Exibir os logotipos dos cartões de crédito na página de checkout.

<img src="/assets/BigCommerce/Bigcommerce6.png" alt="PrintScreen" width="700">

{{% alert title="Importante" color="warning"%}}

Para habilitar métodos de pagamento alternativos (dinheiro e transferências bancárias), selecione **Enable Web Checkout (APM)**.

{{% /alert %}}

4. Adicione um provedor para um país específico do PayU Latam clicando em **Add Provider**. Ative ou desative cada provedor usando o botão na coluna **Status** e atualize suas credenciais clicando no botão **Edit**. 

<img src="/assets/BigCommerce/Bigcommerce7.png" alt="PrintScreen" width="700">
<p></p>

Além disso, escolha o modo **Test** ou **Live** para cada provedor na opção **Onboard Setup**.

<img src="/assets/BigCommerce/Bigcommerce8.png" alt="PrintScreen" width="700">
<p></p>

**Campos Obrigatórios para Adicionar um Novo Provedor:**

| Parâmetro | Descrição |
|---|---|
| Select Payu Latam country | Escolha o país que você deseja configurar. |
| API Login | Usuário ou login fornecido pela PayU. <a href="https://developers.payulatam.com/latam/pt/docs/integrations.html#api-key-and-api-login" target="_blank">Como obter meu Login da API</a>. |
| API Key | Chave exclusiva que a PayU atribuiu à sua loja. <a href="https://developers.payulatam.com/latam/pt/docs/integrations.html#api-key-and-api-login" target="_blank">Como obter minha Chave da API</a>. |
| Public Key| Chave exclusiva que a PayU atribuiu à sua loja. <a href="https://developers.payulatam.com/latam/pt/docs/integrations.html#api-key-and-api-login" target="_blank">Como obter minha Chave Pública</a>. |
| Account ID | ID da conta PayU para o país selecionado. |
| Merchant ID | ID do seu comércio na PayU Latam. |
<p></p>

5. Selecione o fluxo de transação:
* Para habilitar um fluxo de uma etapa, selecione **Capture on Order Placed**.
* Para habilitar um fluxo de duas etapas, selecione **Capture on Shipment**.

<img src="/assets/BigCommerce/Bigcommerce9.png" alt="PrintScreen" width="700">
<p></p>

{{% alert title="Importante" color="warning"%}}

* O fluxo de duas etapas se aplica apenas a pagamentos com cartão (sujeito à disponibilidade em cada país); outros métodos de pagamento exigem autorização e captura em uma única etapa. Consulte a <a href="https://developers.payulatam.com/latam/pt/docs/services/payments.html#payment-flows" target="_blank">documentação sobre fluxo de pagamentos</a> para mais detalhes.
* As opções de múltiplas lojas aparecerão abaixo da seção de opções de pagamento.
<img src="/assets/BigCommerce/Bigcommerce10.png" alt="PrintScreen" width="700">

{{% /alert %}}

## Gerenciamento de Pedidos e Reembolsos

1. Para gerenciar os pedidos, clique no botão **Order Dashboard** no canto superior direito.

<img src="/assets/BigCommerce/Bigcommerce11.png" alt="PrintScreen" width="700">
<p></p>

2. O **Order Dashboard** fornece uma visão geral dos status de pagamento de todos os pedidos.

<img src="/assets/BigCommerce/Bigcommerce12.png" alt="PrintScreen" width="500">
<p></p>

3. Para processar um reembolso, clique no botão **Refund** na coluna **Actions**.

<img src="/assets/BigCommerce/Bigcommerce13.png" alt="PrintScreen" width="500">

{{% alert title="Importante" color="warning"%}}

* Os reembolsos estão disponíveis apenas para transações com cartão.
* Consulte o <a href="https://developers.payulatam.com/latam/pt/payu-module-documentation/payu-operations/refunds-mp.html" target="_blank">documento de reembolsos</a> para obter detalhes específicos por país.

{{% /alert %}}

## Testando a Integração

Teste sua integração com credenciais de teste antes de iniciar transações ao vivo.

1. Faça login na sua loja, selecione um produto para teste e prossiga para o checkout. Certifique-se de que o país de envio corresponde ao destino.

<img src="/assets/BigCommerce/Bigcommerce14.png" alt="PrintScreen" width="400">
<p></p>

2. Selecione o método de pagamento desejado.

- **Cartão:** Insira os detalhes do cartão e clique em **Pay By Card**.

<img src="/assets/BigCommerce/Bigcommerce15.png" alt="PrintScreen" width="400">

{{% alert title="Nota" color="info"%}}

Você pode personalizar o título da opção de pagamento com cartão, conforme explicado em [Configuração dos Métodos de Pagamento](#configuração-de-métodos-de-pagamento). 

{{% /alert %}}

- **Pagar via Web Checkout:** Para outros métodos, selecione **Pay by Web Checkout** e conclua o pagamento.

<img src="/assets/BigCommerce/Bigcommerce16.png" alt="PrintScreen" width="400">
<p></p>

3. Após a aprovação, verifique a compra em:

- **BigCommerce Order Dashboard:** Acesse **PayU Latam > Order Dashboard**.

<img src="/assets/BigCommerce/Bigcommerce11.png" alt="PrintScreen" width="700">
<p></p>

- **Painel de Gerenciamento PayU:** Verifique no **módulo de Relatório de Vendas**.

<img src="/assets/BigCommerce/Bigcommerce17.png" alt="PrintScreen" width="700">
<p></p>

## Suporte

Para problemas técnicos ou dúvidas sobre esta extensão, entre em contato com nossa equipe de suporte pelo e-mail **tecnico.co@payu.com** ou visite <a href="https://colombia.payu.com/pt/contact-us//" target="_blank">nosso site</a>. Ao entrar em contato com o suporte, inclua os detalhes da extensão no assunto do e-mail e forneça um resumo conciso do problema no corpo da mensagem.
