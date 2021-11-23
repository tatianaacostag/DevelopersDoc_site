---
title: "Integração Webcheckout"
linkTitle: "Integração Webcheckout"
date: 2021-03-29T11:52:52-05:00
description: >
  A Integração WebCheckout permite que seus clientes selecionem os itens que desejam adquirir em sua loja e realizem o pagamento em nossa plataforma de pagamento (WebCheckout).
weight: 10
tags: ["parenttopic"]
---

![WebCheckout integration](/assets/Checkout1-pt.png)

Você pode incluir o logotipo da sua empresa em nosso portal de pagamento, enviando-o via método HTTP POST.

{{% alert title="Observação" color="info"%}}
O responsável pela integração da sua loja com o nosso portal de pagamento (WebCheckout) deve ter bons conhecimentos de integração com linguagens de programação dinâmicas como PHP ou Java.
{{% /alert %}}

## Como funciona a Integração WebCheckout? {#how-does-the-webcheckout-integration-work}
O procedimento para permitir que seus clientes paguem usando os serviços PayU é simples.

1. Seu cliente navega em seu site e seleciona os produtos ou serviços que deseja adquirir. Seu sistema atualiza o valor da compra e envia para o nosso sistema o formulário de pagamento com as informações da compra.<br>Seu sistema deve enviar esta informação via `HTTP POST`.

![WebCheckout integration](/assets/paso1-pt.jpg)

2. Para o processo de pagamento, seu cliente é redirecionado para nosso Checkout, onde ele pode selecionar o método de pagamento.<br>PayU disponibiliza muitos métodos de pagamento que se adaptam às necessidades dos seus clientes de acordo com o país onde você processa a compra, [veja os métodos de pagamento disponíveis]({{< ref "select-your-payment-method.html" >}}).

![WebCheckout integration](/assets/paso2-pt.jpg)

3. PayU processa a transação e mostra o resultado em nossa página de resposta

![WebCheckout integration](/assets/paso3-pt.jpg)

4. Quando seu cliente volta para sua página após o processo de pagamento, PayU redireciona para sua página de resposta e envia os resultados da transação via `HTTP GET`. Você precisa processar a resposta e mostrar suas informações ao cliente.

![WebCheckout integration](/assets/paso4-pt.jpg)

5. Em paralelo, PayU notifica o status da transação para a página de confirmação via `HTTP POST`. Além disso, PayU notifica a você e seu cliente o resultado da transação via e-mail.

![WebCheckout integration](/assets/paso5-pt.jpg)

## Observações {#considerations}
* A programação da sua página deve ser `UTF-8`.
* A página WebCheckout não deve ser incluída em um iframe
* Não mascare a URL durante o processo de checkout
* Não use certificados de segurança de curva elíptica ou que tenham o pacote de criptografia `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA` na sua página de confirmação.

## Componentes de integração {#integration-components}
Consulte as seções a seguir para saber como fazer a Integração WebCheckout.