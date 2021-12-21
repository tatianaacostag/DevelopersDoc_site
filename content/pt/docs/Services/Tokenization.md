---
title: "Tokenização"
linkTitle: "Tokenização"
date: 2021-03-26T09:34:59-05:00
description: >
  A tokenização permite armazenar com segurança os dados dos cartões de crédito de seus clientes por meio da criação de um token. Este token permite que você faça cobranças regulares ou implemente o _pagamento em 1 clique_, seguindo os padrões de segurança PCI DSS (Payment Card Industry Data Security Standard) para lidar com dados de cartão de crédito.
weight: 40
---

Para usar o recurso de tokenização, você precisa habilitá-lo em sua conta PayU. Para isso, entre em contato com seu representante de vendas:

<div style="display: flex;">
  <div style="float: left;width: 50%;">
    <ul>
      <li><img src="/assets/Argentina.png" width="25px"/> <a href="comercios.ar@payu.com">comercios.ar@payu.com</a></li>
      <li><img src="/assets/Brasil.png" width="25px"/> <a href="comercios.br@payu.com">comercios.br@payu.com</a></li>
      <li><img src="/assets/Chile.png" width="25px"/> <a href="comercios.cl@payu.com">comercios.cl@payu.com</a></li>
      <li><img src="/assets/Colombia.png" width="25px"/> <a href="comercios.co@payu.com">comercios.co@payu.com</a></li>
    </ul>
  </div>
  <div style="float: left;width: 50%;">
    <ul>
      <li><img src="/assets/Mexico.png" width="25px"/> <a href="comercios.mx@payu.com">comercios.mx@payu.com</a></li>
      <li><img src="/assets/Panama.png" width="25px"/> <a href="comercios.pa@payu.com">comercios.pa@payu.com</a></li>
      <li><img src="/assets/Peru.png" width="25px"/> <a href="comercios.pe@payu.com">comercios.pe@payu.com</a></li>
    </ul>
  </div>
</div>

## Como funciona a tokenização? {#how-does-tokenization-work} 
A tokenização inclui dois processos separados:

### Gerar token {#generate-token}
O primeiro processo permite salvar as informações de um cartão de crédito. Essas informações são transformadas em um token para que você possa usá-las mais tarde.

<img src="/assets/Tokenization/tokenizacion1-pt.png" width="50%"/>

### Realizar cobranças {#make-charges}
Com as informações de um cartão de crédito armazenadas em um token, você pode usá-las para fazer cobranças periódicas de acordo com sua necessidade, e seu cliente não precisará fornecer as informações de cartão de crédito sempre que você solicitar um pagamento.

<img src="/assets/Tokenization/tokenizacion2-pt.png" width="50%"/><br>

Além disso, o recurso de tokenização permite armazenar, remover ou cobrar vários cartões de crédito enviando um arquivo codificado em Base64.

## O que acontece agora? {#whats-next}
A integração com este recurso pode ser feita com um dos nossos tipos de integração:

* [Para integrações API, consulte este tópico]({{< ref "Tokenization-API.md" >}})
* [Para integrações SDK, consulte este tópico]({{< ref "TokenizationSDK.md" >}})
