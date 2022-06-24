---
title: "Disputas"
linkTitle: "Disputas"
date: 2021-11-18T13:40:06-05:00
type: docs
Description: >
   Este módulo é uma ferramenta que pode ser encontrada no Módulo administrativo para gerenciar processos de disputa gerados com a sua conta PayU. Encontre todas as informações necessárias e os passos a serem seguidos para validar as cobranças efetuadas.
weight: 26
---

{{% alert title="Observação" color="warning"%}}
Este tópico foi descontinuado e não está sendo oferecido a novos comerciantes.
{{% /alert %}}

{{% alert title="Lembre-se" color="info"%}}
Uma vez que uma transação é parte de uma disputa, o valor associado passa a fazer parte do saldo congelado e, portanto, você não poderá realizar transferências desse saldo para a sua conta bancária até que a disputa seja resolvida.
{{% /alert %}}

## O que é uma disputa?
Uma disputa é iniciada quando um comprador desconhece perante o banco uma cobrança feita no seu cartão de crédito. Uma vez que o banco tenha sido notificado, inicia-se o processo formal para determinar a validade da compra efetuada.

## Motivos de disputas
Existem diversas razões que podem levar um comprador a desconhecer uma cobrança no seu cartão de crédito. Os motivos que levam ao início de um processo de disputa podem variar. Alguns dos motivos identificados são os seguintes:
* **Fraude**: As contestações são determinadas como fraude quando uma pessoa não autorizada fez compras com um cartão de crédito. Esse tipo de disputa pode acontecer se o cartão tiver sido roubado ou extraviado.
* **Desconhecimento de pagamento**: a marca ou o nome do estabelecimento comercial refletidos no extrato do cartão de crédito não são reconhecidos pelo titular do cartão.
* **Produto não entregue**: o titular do cartão indica que não recebeu o produto ou serviço objeto da cobrança realizada no seu cartão de crédito.
* **Produto não aceitável**: o titular do cartão alega não ter recebido o produto ou serviço nas condições esperadas.
* **Duplicado**: O titular do cartão indica que a cobrança realizada pela compra de um produto ou serviço foi aplicada mais de uma vez ao seu cartão de crédito.
* **Valor não corresponde**: A cobrança realizada no cartão de crédito não corresponde ao valor da compra.
* **Não informado pela entidade**: Em muitas ocasiões, o banco ou a rede processadora inicia um processo de disputa sem ter um motivo específico.
 
## Como funciona?

### 1. Notificação de uma disputa
Quando a PayU é notificada pelo banco que um processo de disputa foi iniciado, você automaticamente receberá um e-mail informando sobre esse processo.

<div style="display: flex;">
  <div style="float: left;width: 50%;">
    <p style="text-align: center">E-mail que você recebe quando é iniciada a disputa</p>
    <p><img src="https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/mail-notificacion-es.png" alt="PrintScreen"/></p>
  </div>
  <div style="float: left;width: 50%;">
    <p style="text-align: center">E-mail que o seu comprador recebe</p>
    <p><img src="https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/mail-notificacioncomprador-pt.png" alt="PrintScreen"/></p>
  </div>
</div>
<br>

Também enviamos um POST com toda a informação da disputa a qualquer URL que você tiver configurado a partir do seu módulo administrativo. Assim você pode automatizar seus processos de gerenciamento de contestações para minimizar o risco de um possível estorno.

Você pode configurar a URL onde será feita a notificação dentro do módulo administrativo clicando no menu _**Configuração**_ na opção _**Configuração de contas**_, definindo a URL de notificação de contestações e habilitando a caixa de notificação.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/disputas1-pt.png)

Uma vez que esse processo tenha sido realizado, você receberá automaticamente um POST com toda a informação do processo de disputa iniciado. Você também receberá um POST de notificação cada vez que o processo de disputa for atualizado, e assim acompanhará o progresso e a finalização do processo.

### 2. Consultas através do Módulo administrativo
Você pode consultar e gerenciar seus processos de disputa a partir do seu módulo administrativo. No menu _**disputas**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/disputas2-pt.png)

### 3. Forneça evidências
É importante que você sempre responda fornecendo evidência para uma disputa antes da data limite estipulada pelo banco. Uma vez que a data limite tenha sido atingida, não será possível enviar a evidência correspondente para uma disputa.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/disputas3-pt.png)

Para enviar evidência que nos permita gerenciar o caso perante o banco ou à rede processadora, você deve clicar na disputa, onde verá todos os detalhes do processo. Lá você encontrará o botão _**Enviar evidência**_, onde poderá selecionar os arquivos que acredita serem úteis para questionar a disputa e depois apertar o botão _**Salvar**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/disputas4-pt.png)

Para diminuir a probabilidade de um estorno, você pode fornecer-nos as seguintes evidências para uma disputa:

* Comprovante de entrega do produto e/ou serviço assinado pelo titular do cartão.
* Nota Fiscal da Venda do produto ou serviço.
* Carta de aceitação de pagamento assinada pelo titular do cartão, anexando o documento de identidade do mesmo.
* Outros suportes que validem a compra.

{{% alert title="Observação" color="info"%}}
Você deve garantir que a data limite de resposta não tenha passado, caso em que a evidência já não poderá ser carregada.

| País      | Quantidade de dias para enviar evidências |
|-----------|-------------------------------------------|
| Argentina | 5 dias úteis                              |
| Brasil    | 5 dias úteis                              |
| Chile     | 5 dias úteis                              |
| Colômbia  | 2 dias úteis                              |
| México    | 5 dias calendario                         |
| Peru      | 2 dias úteis                              |
| Panamá    | 8 dias úteis                              |

{{% /alert %}}

### 4. Decisão final sobre o estado da disputa
Uma vez fornecida a evidência, enviamos os documentos ao banco emissor ou à rede que processou a transação, de quem depende a resolução do caso. O caso de disputa pode terminar em: ganho (sem estorno), perda (estorno) ou reembolso. No caso dos reembolsos, o comércio é quem faz a devolução ao comprador e o banco não gera o estorno. Quando a entidade financeira comunica o resultado da disputa, o caso é atualizado automaticamente no módulo administrativo e a PayU envia um POST à URL configurada com a informação do resultado final.

## Estados según el flujo de una disputa
Quando uma disputa é notificada, cria-se uma entidade disputa para a transação associada.

O estado da disputa muda dependendo do ponto em que ele estiver dentro do fluxo do processo.

Estados de uma disputa:

| Estado      | Descripción                                                                                                             |
|-------------|-------------------------------------------------------------------------------------------------------------------------|
| Notificada | Quando um processo de disputa é iniciado, você deve enviar evidência para a disputa.                                     |
| Em revisão | Quando o comércio fornece evidência para uma disputa a partir do módulo administrativo e a disputa entra em revisão por parte da entidade financeira. |
| Perda | A transação é revertida a partir da conta virtual do comércio e pode implicar um custo de gerenciamento do estorno.           |
| Ganho | O processo de disputa é resolvido a favor do comércio, não há nenhum tipo de dedução.                                         |
| Reembolso | Esse processo se dá quando é o comércio que, por determinação própria, autoriza reverter a operação, o que impede que seja gerada uma transação de estorno ao comércio, que é substituída por uma de reembolso. Para resolver uma disputa como reembolso você deve enviar uma solicitação a disputas@payulatam.com |

{{% alert title="Dicas para gerenciar as suas contestações" color="info"%}}

* Se você tem os dados do titular do cartão, a melhor forma de gerenciar um processo de disputa é entrando em contato com ele. Se o motivo da disputa é simplesmente desconhecimento, você pode pedir ao titular do cartão que fale com seu banco para retirar a queixa e para que o processo de disputa se resolva a seu favor. Você também deve fornecer qualquer evidência que acreditar ser conveniente a partir do seu módulo administrativo.
* É muito importante que a data máxima de resposta não tenha passado, ou você não poderá enviar nenhuma evidência. Se as evidências não forem enviadas a tempo, aumentarão as possibilidades de que sejam gerados estornos e o dinheiro seja debitado da sua conta PayU.
* Os arquivos a serem carregados na seção de evidências não devem ter tamanho superior a 10 MB. Você pode carregar arquivos tipo .JPG .PNG .GIF .TIFF .PDF .DOC ou .PPT.
{{% /alert %}}