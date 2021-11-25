---
title: "Drupal"
linkTitle: "Drupal"
date: 2021-05-26T08:38:45-05:00
description:
  Este artigo mostra o procedimento para habilitar PayU em seu site Drupal.
weight: 30
tags: ["subtopic"]
---

## Pré-requisitos {#prerequisites}
* Você precisa de uma conta ativa no PayU Latam.
* Ter instalado [Drupal Commerce Kickstart 7.xx](https://www.drupal.org/project/commerce_kickstart).
* Ter o plugin Drupal do PayU baixado e armazenado em local acessível. Clique [aqui](http://developers.payulatam.com/plugins/commerce_payulatam_1.0.zip) para fazer o download.
* Ter acesso à pasta de instalação do Drupal.
* Ter acesso ao backend do Drupal.

## Instalação {#installation}
O processo de instalação do plugin no servidor Drupal exige apenas a descompactação do plugin em ***\sites\all\modules***. A pasta descompactada tem a seguinte estrutura:

![PrintScreen](/assets/Drupal/Drupal_01.png)

## Configuração {#configuration}
1. Faça login no painel de administração do Drupal. Abra o menu _**Site settings**_ e clique na opção _**Modules**_ na seção _**Advanced settings**_.

![PrintScreen](/assets/Drupal/Drupal_02.png)

2. Localize e ative o módulo _**Payment Payulatam**_. Você pode usar o filtro de busca para encontrá-lo mais facilmente.<br>
Assim que terminar, clique em _**Save configuration**_.

![PrintScreen](/assets/Drupal/Drupal_03.png)

3. Volte ao painel de administração do Drupal. Abra o menu _**Store settings**_ e clique em _**Payment methods**_.<br>
Encontrar _**Payment gateway PayuLatam**_ na lista _**Disabled payment method rules**_ e clicar em _**enable**_.

![PrintScreen](/assets/Drupal/Drupal_04.png)

Se a ativação foi bem-sucedida, o Drupal mostra a seguinte mensagem

![PrintScreen](/assets/Drupal/Drupal_05.png)

4. Agora clique no link _**edit**_ no método habilitado recentemente.<br>
Em seguida, localize a seção _**Actions**_ e clique em _**edit**_ ao lado da ação _**Enable payment method: PayuLatam**_. Aqui, configure o plugin usando sua conta PayU.

![PrintScreen](/assets/Drupal/Drupal_06.png)

* **API KEY**: Chave única da sua loja. Você pode obter esta informação no seu Módulo PayU (**_Configuração_** > **_Configuração técnica_** > **_API Key_**).
* **Merchant Id**: ID da sua loja no PayU Latam.
* **Account Id**: ID da conta PayU de acordo com o país onde você quer vender.
* **Test Enabled**: Definir `No` se você deseja processar no ambiente de produção. Caso contrário, definir `Yes`.

Deixe os outros campos com os valores pré-configurados.

{{% alert title="Observação" color="info"%}}

Para fins de teste, você pode usar o  **Merchant ID**, a **APIKey** e o **Account ID** disponíveis em [Teste sua solução]({{< ref "Test-your-solution.md" >}}).

Assim que estiver no formulário de pagamento com cartão de crédito e observar a mensagem na parte superior do gateway  _Transação em modo de teste_, você deve:

* Insira o texto `APPROVED` no campo Nome Completo se você deseja que a transação seja aprovada, `REJECTED` se você quer que seja rejeitada ou `PENDING` se você quiser que fique pendente.
* Você deve inserir um número de cartão válido no campo Número do Cartão de acordo com a franquia selecionada. Para isso, você pode usar um gerador de cartão de crédito online.
* Todos os outros campos podem ser aleatórios.

{{% /alert %}}  

Nesta etapa seus clientes podem pagar com PayU Latam quando fizerem o checkout com o carrinho de compras do Drupal. 

