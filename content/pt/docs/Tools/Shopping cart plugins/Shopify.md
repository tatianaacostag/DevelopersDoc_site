---
title: "Shopify"
linkTitle: "Shopify"
date: 2021-05-25T10:30:35-05:00
description:
  Este artigo mostra o procedimento para habilitar PayU em seu site Shopify. 
weight: 10
tags: ["subtopic"]
---

## Pré-requisitos {#prerequisites}
* Você precisa de uma conta ativa no PayU Latam.
* •	Você precisa de um [plano](https://www.shopify.com/pricing) válido no Shopify. O check-out não está disponível em planos de teste.

## Gerenciamento de ordem no Shopify {#order-management-in-shopify}
Leve em conta o seguinte ao gerenciar ordens no Shopify:
* **All orders**: são as ordens com estado _**Aprovado**_ (total ou parcialmente pago) e _**Pendente**_ (enquanto o pagador volta à loja após processar o pagamento no portal).
* **Abandoned checkouts**: são procedimentos de pagamento que atendem a qualquer um dos seguintes critérios:
  1. Check-outs incompletos.
  2. Check-outs abandonados durante o processo de pagamento.
  3. Transações com estado _**Rejeitada**_.
  4. Transações com estado _**Pendente**_, desde que o pagador não volte à loja após processar o pagamento no portal:<br>
    <span style="color: #A6C307;font-weight: bold;">4.1.</span> Pagamentos em dinheiro (sempre em estado _**Pendente**_).<br>
    <span style="color: #A6C307;font-weight: bold;">4.2.</span> Pagamentos com cartão de crédito sujeitos a análise de fraude.

{{% alert title="Observação" color="info"%}}
* Shopify **NÃO** faz qualquer reserva de estoque ou para qualquer um desses dois casos.
* O Shopify cria a ordem para esses dois casos quando o estado final da transação é _**Aprovada**_.
{{% /alert %}}

## Enable PayU as Payment gateway
1. Entre no seu site de administração do Shopify. Clique em _**Configurações**_ e selecione _**Pagamentos**_.
 
![PrintScreen](/assets/Shopify/Shopify_01_pt.png)

2. Acesse a seção _**Provedores de pagamento**_ e clique em _**Escolher um provedor**_.

![PrintScreen](/assets/Shopify/Shopify_02_pt.png)

3. Na lista, localize e clique no Gateway do _PayU Latam_. 

![PrintScreen](/assets/Shopify/Shopify_03_pt.png)

4. Forneça as seguintes informações de sua conta PayU:

![PrintScreen](/assets/Shopify/Shopify_04_pt.png)

* **Account Id (1)**: ID da conta PayU de acordo com o país onde você quer vender.
* **Api Key (2)**: Chave única da sua loja. Você pode obter esta informação no seu Módulo PayU (**_Configuração_** > **_Configuração técnica_** > **_API Key_**).

![PrintScreen](/assets/Shopify/Shopify_05_pt.png)

5. Finalmente, clique no botão _**Ativar PayU Latam**_ na parte inferior da página.

![PrintScreen](/assets/Shopify/Shopify_06_pt.png)

6. Abra o módulo PayU e acesse as opções de _**Configuração**_ (**_Configuração_** > **_Configuração técnica_**). Em seguida, desative a validação de referência única para todos os estados, para evitar problemas no momento de processar seus pagamentos.

![PrintScreen](/assets/Shopify/Shopify_07_pt.png)

Nesta etapa, seus clientes podem fazer pagamentos por meio do PayU Checkout. Eles podem pagar usando opções de pagamento, incluindo dinheiro, cartões de crédito e transferências bancárias, dependendo do país onde você está vendendo.

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