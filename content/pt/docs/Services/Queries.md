---
title: "Consultas para transações"
linkTitle: "Consultas para transações"
date: 2021-03-26T09:12:41-05:00
description: >
  Usando o recurso Consultas, você pode verificar o status das ordens feitas e suas transações. 
weight: 30
---

## Observações {#considerations}
Antes de usar o recurso _Consultas_, leve em conta o seguinte:

* Recomenda-se usar _Consultas_ para transações em estado `PENDING`.
* O tempo para realizar a consulta pode variar de acordo com a forma de pagamento. No entanto, é recomendável realizar a primeira consulta 7 minutos após a criação da transação.
* Não tente novamente uma consulta de uma transação quando PayU indicar que a transação não existe.
* As transações de transferência bancária estão disponíveis apenas a cada 10 minutos.

## Critérios da consulta {#query-criteria}
To query transactions, PayU allows you to search by any of the following criteria:

* *Order Id*: gerado pelo PayU. Identifica a ordem no sistema PayU e é o principal elemento onde qualquer movimentação é registrada (cobranças, novas tentativas, reembolsos etc.)
* *Transaction Id*: PayU gera este identificador para cada movimento associado a uma ordem (Order ID).
* *Reference Número*: gerado pela loja. Identifica a ordem ou compra em seu sistema, o PayU salva este valor conforme você o envia.

## O que acontece agora? {#whats-next}
A integração com este recurso pode ser feita com um dos nossos tipos de integração:

* [Para integrações API, consulte este tópico]({{< ref "Queries-API.md" >}})
* [Para integrações SDK, consulte este tópico]({{< ref "QueriesSDK.md" >}})