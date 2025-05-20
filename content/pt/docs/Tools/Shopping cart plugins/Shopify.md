---
title: "Shopify"
linkTitle: "Shopify"
date: 2021-05-25T10:30:35-05:00
description:
  Este guia descreve os passos para habilitar o PayU em seu site Shopify. 
weight: 2
tags: ["subtopic"]
---

Shopify é uma plataforma de comércio que permite criar e gerenciar facilmente sua loja online com poderosas ferramentas integradas. Para mais informações, visite o site oficial da <a href="https://www.shopify.com" target="_blank">Shopify</a>.

## Pré-requisitos {#prerequisites}

* Uma <a href="https://developers.payulatam.com/latam/pt/docs/getting-started/create-an-account.html" target="_blank">conta PayU Latam ativa</a>.
* Um plano válido do Shopify. Note que a funcionalidade de Checkout não está disponível nos planos de teste. Você pode explorar os planos e preços do Shopify <a href="https://www.shopify.com/br/precos" target="_blank">aqui</a>.

## Gestão de pedidos no Shopify {#order-management-in-shopify}

Tenha em mente as seguintes disposições ao gerenciar pedidos no Shopify:
* **All orders (Todos os pedidos):** Inclui pedidos com os seguintes 2 estados:
    * **Approved (Aprovado):** Pedidos que estão pagos integralmente ou parcialmente.
    * **Pending (Pendente):** Pedidos aguardando conclusão quando o cliente retorna à loja após processar um pagamento pelo gateway.
* **Abandoned checkouts (Pagamentos abandonados)**: Aplica-se a processos que:
  1. Permaneceram incompletos porque o usuário não pôde completar o pagamento ou abandonou o site de compras.
  2. Estão marcados como _Rejeitados_.
  3. Permanecem em estado _Pendente_ sem que o cliente retorne ao site de compras após o processamento do pagamento pelo gateway, isso inclui:<br>
    <span style="color: #A6C307;font-weight: bold;">3.1.</span> Pagamentos em dinheiro.<br>
    <span style="color: #A6C307;font-weight: bold;">3.2.</span> Pagamentos com cartão de crédito que passam por validação devido às regras de proteção contra fraude.

{{% alert title="Nota" color="info"%}}

* O Shopify **NÃO** reserva inventário para nenhum dos cenários acima.
* Para os processos considerados como _pagamento abandonado_, o sistema só gera pedidos uma vez que a transação atinja o estado _Aprovado_.

{{% /alert %}}

## Configurando o PayU como gateway de pagamento {#setting-up-payu-as-payment-gateway}

1. Faça login em sua conta do Shopify e baixe o aplicativo PayU Latam v2 na loja de aplicativos clicando <a href="https://apps.shopify.com/payu-latam-v2?locale=pt-BR" target="_blank">aqui</a> e selecionando **Instalar**.

<img src="/assets/Shopify/Shopify01PT.png" alt="PrintScreen" width="550">
<p></p>

2. Selecione a loja onde deseja instalar o aplicativo. Você será redirecionado para a página de instalação. Clique em **Instalar**.

<img src="/assets/Shopify/Shopify02PT.png" alt="PrintScreen" width="550">
<p></p>

<img src="/assets/Shopify/Shopify03PT.png" alt="PrintScreen" width="550">
<p></p>

3. Escolha o ambiente para a instalação do aplicativo — Teste ou Produção — com base no uso desejado:

* Use o **Ambiente de Teste** se estiver realizando transações de teste com credenciais sandbox.
* Use o **Ambiente de Produção** apenas se estiver pronto para processar pagamentos reais com credenciais ativas.

{{% alert title="Importante" color="warning"%}}

* Certifique-se de não usar credenciais de teste no ambiente de produção, ou vice-versa. Isso pode resultar em erros ou falhas nas transações.
* Encontre suas credenciais do ambiente de produção acessando o <a href="https://developers.payulatam.com/latam/pt/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html#merchant-and-account-ids" target="_blank">Painel de Gestão da PayU</a>, onde você pode localizar o **Merchant ID** e o **Account ID**.  
* Encontre as credenciais do ambiente de teste <a href="https://developers.payulatam.com/latam/pt/docs/getting-started/test-your-solution.html" target="_blank">aqui</a>.  
* Você também pode verificar ou alterar suas credenciais nas configurações da sua conta Shopify.  
* Você precisa de um Account ID por loja no Shopify.

{{% /alert %}}

Após selecionar o ambiente correto, insira seu **Merchant ID** e **Account ID**, e clique em **Salvar** para confirmar.

<img src="/assets/Shopify/Shopify04EN.png" alt="PrintScreen" width="450">
<p></p>

4. Você será redirecionado para a página de Pagamentos. Para ativar o aplicativo, clique no botão **Ativar** localizado no canto inferior direito.

<img src="/assets/Shopify/Shopify06PT.png" alt="PrintScreen" width="600">
<p></p>

{{% alert title="Importante" color="warning"%}}
* Para sua informação, você verá vários métodos de pagamento. Para prosseguir, você deve selecionar pelo menos um deles. Isso não alterará os métodos de pagamento disponíveis no Checkout Web da PayU.
* Modo de teste: dentro da mesma seção _Pagamentos_, você encontrará a opção para usar o modo de teste, permitindo que você conduza testes no ambiente Sandbox.
* Recomendamos que você utilize o ambiente de teste de forma controlada, preferencialmente durante os horários de menor movimento, já que as transações processadas em modo de teste não resultam em pagamentos reais e o ambiente de produção permanece desativado.
* Para desativar o modo de teste, desmarque a caixa:

<img src="/assets/Shopify/Shopify07PT.png" alt="PrintScreen" width="600">

{{% /alert %}}

5. Acesse seu <a href="https://developers.payulatam.com/latam/pt/payu-module-documentation/getting-started/understanding-the-payu-module.html" target="_blank">Painel de Gestão da PayU</a>, vá para a seção **Configurações** e clique em **Configurações Técnicas**. Ative a opção chamada **Controlar pagamentos duplicados (Validar referência única)** para evitar problemas durante o processamento do pagamento.

<img src="/assets/Shopify/Shopify08PT.png" alt="PrintScreen" width="600">
<p></p>

6. A partir de agora, o PayU está configurado como seu processador de pagamento, permitindo que você inicie suas vendas. Com o Checkout Web da PayU, seus clientes podem fazer compras usando vários métodos de pagamento, incluindo dinheiro, cartões de crédito e transferências bancárias, adaptados ao país onde você está realizando negócios.

## Fluxo de pagamento no Shopify {#payment-flow-in-shopify}
Ao configurar o PayU como portal de pagamento na plataforma, seu cliente pode pagar conforme explicado a seguir.

1. Seu cliente seleciona o produto ou serviço que deseja comprar e o adiciona ao carrinho de compras.

![PrintScreen](/assets/Shopify/Shopify_08_pt.png)

2. No carrinho de compras, seu cliente segue para a finalização da compra.

![PrintScreen](/assets/Shopify/Shopify_09_pt.png)

3. Depois que seu cliente fornece suas informações, ele pode clicar em _**Finalizar a compra**_ e ser redirecionado para PayU Latam para concluir o pagamento.

![PrintScreen](/assets/Shopify/Shopify_10_pt.png)

4. Quando está em nosso portal de pagamento, ele pode ver a descrição da venda e os métodos de pagamento disponíveis para o seu país.

![PrintScreen](/assets/Shopify/Shopify_11_pt.png)

{{% alert title="Nota" color="info"%}}
Se precisar emitir um reembolso total ou parcial, você pode gerenciá-lo diretamente no administrador da loja Shopify. Para obter mais informações, clique <a href="https://help.shopify.com/pt-BR/manual/orders/cancel-delete-order" target="_blank">aqui</a>.
{{% /alert %}}
