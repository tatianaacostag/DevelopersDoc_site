---
title: "Validação da variável OrderId"
linkTitle: "Variável OrderId"
date: 2017-01-05
type: docs
description: > 
exclude_search: true
notopicssection: true
---
<script src="/js/countdown.js"></script>
<br>
<div id="MainCounter">
    <p class="CounterHeader">Seu sistema deve estar pronto em</p>
    <div class="CounterContent">
      <div id="DaysDiv">
        <p id="days"></p>
        <p style="color:white;text-align:center;">Dias</p>
      </div>
      <div id="HoursDiv">
        <p id="hours"></p>
        <p style="color:white;text-align:center;">Horas</p>
      </div>
      <div id="MinutesDiv">
        <p id="minutes"></p>
        <p style="color:white;text-align:center;">Minutos</p>
      </div>
      <div id="SecondsDiv">
        <p id="seconds"></p>
        <p style="color:white;text-align:center;">Segundos</p>
      </div>
    </div>  
</div>

## Introdução {#overview}
Devido ao crescimento exponencial do comércio eletrônico e dos pagamentos online, o tamanho dos tokens que retornamos do nosso processador de pagamentos aumentou.

Nossas estimativas mostram que por volta de _30 de abril de 2022_, passaremos a barreira de 10 dígitos para o parâmetro `orderId`. Isso nos faz alterar o tipo numérico atual do parâmetro para permitir um número maior de dígitos nos identificadores retornados; portanto, o tipo de dados atual não será mais suportado e essa alteração pode afetar sua integração com nossa plataforma.

Para evitar problemas devido a essa alteração, você deve verificar se o novo tipo retornado corresponde à sua integração atual. Siga as diretrizes explicadas neste artigo para verificar se sua integração requer uma atualização.

### Perguntas frequentes {#frequently-asked-questions}

* **Como posso verificar se a alteração do tipo de dados afeta minha integração?**<br>Veja a seção [_**Procedimento de validação**_]({{< ref"#validation-procedure" >}}) para saber como validar com base no tipo de integração que você tem conosco.

* **Minha integração é através de uma plataforma de comércio digital (como VTEX, Shopify, etc), preciso implementar a mudança?**<br>Não, sua plataforma de comércio digital implementará a mudança silenciosamente. No entanto, você deve verificar se possui conexões externas à plataforma para relatórios ou consultas.

* **Qual é a alteração do tipo de dados?**<br>Atualmente, o parâmetro `orderId` é retornado usando o tipo `Integer`, o novo tipo de dados para este parâmetro será `Long`.

* **Essa alteração é necessária?**<br>Se após verificar sua integração, você descobriu que o `orderId` é uma variável do tipo `Integer`, sim. Caso contrário, você não precisa alterar sua integração.

* **Essa alteração afeta apenas o fluxo de pagamento?**<br>Não, essa alteração também pode afetar seus relatórios ou consultas relacionadas a transações. Tenha cuidado ao realizar a validação.

* **O que acontece se eu não aplicar essa alteração?**<br>Se você não fizer essa alteração e isso afetar sua integração, você **não** poderá receber a confirmação do procedimento de pagamento. Além disso, você **não** poderá consultar novas transações depois que começarmos a retornar o parâmetro `orderId` com mais de 10 dígitos (aproximadamente após _30 de abril de 2022_).

* **A equipe de suporte da PayU pode fazer essa alteração para mim?**<br>Não, você decide como se integra aos nossos serviços. PayU não se responsabiliza por erros devido a integrações incorretas.

* **Essa alteração precisa ser reimplementada?**<br>Não em um futuro próximo. A alteração do tipo de dados permite-nos ter uma maior capacidade na geração de identificadores. Essa alteração nos permite gerar até _**9.223.372.036.854.775.807**_ tokens.

## Procedimento de validação {#validation-procedure}
A validação de `orderId` depende da sua integração.

### Integração API {#api-integration}
Se sua loja é integrada por meio da **API** e você usa uma linguagem **tipada** para sua integração, você deve validar como declarou a variável numérica `orderId`.

* Se a variável `orderId` for do tipo `int` ou `Integer`, você deve alterá-la para o tipo `long` ou `Long`.
* Se você estiver usando a API de Consultas e estiver mapeando a variável `orderId` para o tipo `int` ou `Integer`, você deve alterá-la para o tipo `long` ou `Long`.
* Você deve verificar com sua equipe técnica se a variável `orderId` está sendo armazenada em um banco de dados. Em caso afirmativo, valide se a coluna em seu banco de dados suporta valores do tipo `Long`.

### Integração SDK {#sdk-integration}
Se você estiver integrando com nossos serviços usando o SDK, altere o arquivo _**.jar**_ da versão atual. 

<a href="http://developers.payulatam.com/sdk/java/payu-java-sdk-1.4.0.zip" target="_blank" class="payu-btn-green">Faça download do SDK Java 1.4.0</a>

### Integração WebCheckout {#webcheckout-integration}
Se sua loja é integrada por meio do **WebCheckout** e você usa uma linguagem **tipada** para sua integração, você deve validar como declarou a variável numérica `orderId`.

* Se a variável `orderId` usada na página de confirmação estiver configurada para o tipo `int` ou `Integer`, você deve alterá-la para o tipo `long` ou `Long`.
* Se você estiver usando a Query API e estiver mapeando a variável `orderId` para o tipo `int` ou `Integer`, você deve alterá-la para o tipo `long` ou `Long`.
* Você deve verificar com sua equipe técnica se a variável `orderId` está sendo armazenada em um banco de dados. Em caso afirmativo, valide se a coluna em seu banco de dados suporta valores do tipo `Long`.

## Suporte {#support}
Para solicitar suporte ou fazer perguntas relacionadas a essa alteração, entre em contato com nossa equipe de suporte em seu país:

<div style="display: flex;">
  <div style="float: left;width: 50%;">
    <ul>
      <li><img src="/assets/Argentina.png" width="25px"/> <a href="tecnico.ar@payu.com">tecnico.ar@payu.com</a></li>
      <li><img src="/assets/Brasil.png" width="25px"/> <a href="tecnico.br@payu.com">tecnico.br@payu.com</a></li>
      <li><img src="/assets/Chile.png" width="25px"/> <a href="tecnico.cl@payu.com">tecnico.cl@payu.com</a></li>
      <li><img src="/assets/Colombia.png" width="25px"/> <a href="tecnico.co@payu.com">tecnico.co@payu.com</a></li>
    </ul>
  </div>
  <div style="float: left;width: 50%;">
    <ul>
      <li><img src="/assets/Mexico.png" width="25px"/> <a href="tecnico.mx@payu.com">tecnico.mx@payu.com</a></li>
      <li><img src="/assets/Panama.png" width="25px"/> <a href="tecnico.pa@payu.com">tecnico.pa@payu.com</a></li>
      <li><img src="/assets/Peru.png" width="25px"/> <a href="tecnico.pe@payu.com">tecnico.pe@payu.com</a></li>
    </ul>
  </div>
</div>