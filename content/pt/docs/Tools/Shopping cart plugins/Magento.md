---
title: "Magento"
linkTitle: "Magento"
date: 2021-05-26T08:38:26-05:00
description:
  Este artigo mostra o procedimento para habilitar PayU em seu site Magento.
weight: 20
tags: ["subtopic"]
---

## Pré-requisitos {#prerequisites}
* Você precisa de uma conta ativa no PayU Latam.
* Magento versão 1.7.x a 1.9.x instalado.
* Ter o plugin Magento do PayU baixado e armazenado em local acessível. Clique [aqui](https://github.com/developers-payu-latam/developers-payu-latam.github.io/raw/master/plugins/Plugin_PayU_Magento-1.3.zip) para fazer o download.
* Você precisa ter acesso às pastas onde o Magento está instalado.
* Você precisa ter acesso ao painel de administração do Magento.

{{% alert title="Observação" color="info"%}}
Para Magento versão 2.0, siga o guia assistido oferecido por **élOOm** para instalar e configurar PayU em seu site Magento. Clique [aqui](https://docs.eloom.tech/pt/payment/payu-latam) para mais informações ou entre em contato com suporte@eloom.com.br para atendimento personalizado.
{{% /alert %}}  

## Observações {#considerations}
* Pagamentos aprovados aparecem com status _Processing_ no relatório de ordens.
* Assim que o pagamento for recebido corretamente, o Magento cria uma fatura com a ordem associada.

## Instalação {#installation}
Siga o próximo procedimento para instalar o plugin em seu site.

1. Faça login no painel de administração do Magento. Em seguida, expanda o menu _**System**_ no topo e clique em _**Cache Management**_.<br>
Na nova janela, clique em _**Flush Magento Cache**_.

![PrintScreen](/assets/Magento/Magento_01.png)

2. Descompacte o plugin. A pasta do plugin é chamada `app` e tem a seguinte estrutura:

![PrintScreen](/assets/Magento/Magento_02.png)

3. Navegue até ***[PastaDePlugin]\app\code\local*** e copie a pasta **Gfgrisales** na pasta ***\app\code\local*** na raiz da pasta de instalação do Magento.<br>
Se esta estrutura não existir em sua instalação, crie-a com permissões de leitura e gravação.

![PrintScreen](/assets/Magento/Magento_03.png)

4. Navegue até ***[PastaDePlugin]\app\design\frontend\base\default\template*** e copie a pasta **payu** na pasta ***\app\design\frontend\base\default\template*** na raiz da pasta de instalação do Magento.

![PrintScreen](/assets/Magento/Magento_04.png)

5. Navegue até ***[PastaDePlugin]\app\etc\modules*** e copie o arquivo **Gfgrisales_Payu.xml** na pasta ***\app\etc\modules*** na raiz da pasta de instalação do Magento.

![PrintScreen](/assets/Magento/Magento_05.png)

## Configuração {#configuration}
1. De volta ao painel de administração do Magento, expanda o menu _**System**_ e clique em _**Configuration**_. Em seguida, expanda a seção _**Advanced**_ Avançado no menu exibido no painel esquerdo e clique na opção _**Advanced**_.<br>
Clique em _**Disable Modules Output**_ e verifique se a extensão PayU chamada *Gfgrisales_Payu* está ativada.

![PrintScreen](/assets/Magento/Magento_06.png)

2. No menu _**Configuration**_ no painel esquerdo, expanda a seção _**Sales**_ no menu exibido no painel esquerdo e clique na opção _**Payment methods**_.<br>
Encontre e expanda o método _**PayU**_ e forneça as informações de sua conta PayU.

![PrintScreen](/assets/Magento/Magento_07.png)

* **Merchant ID**: ID da sua loja no PayU Latam.
* **APIKey**: Chave única da sua loja. Você pode obter esta informação no seu Módulo PayU (**_Configuração_** > **_Configuração técnica_** > **_API Key_**).
* **Account ID**: ID da conta PayU de acordo com o país onde você quer vender.
* **Gateway URL**: URL do Gateway.
  * Para teste, use https://sandbox.gateway.payulatam.com/ppp-web-gateway
  * Para produção, use https://gateway.payulatam.com/ppp-web-gateway/

{{% alert title="Observação" color="info"%}}

Para fins de teste, você pode usar o **Merchant ID**, a **APIKey**, e o **Account ID** disponíveis em [Teste sua solução]({{< ref "Test-your-solution.md" >}}).

Assim que estiver no formulário de pagamento com cartão de crédito e observar a mensagem na parte superior do gateway  _Transação em modo de teste_, você deve:

* Insira o texto `APPROVED` no campo Nome Completo se você deseja que a transação seja aprovada, `REJECTED` se você quer que seja rejeitada ou `PENDING` se você quiser que fique pendente.
* Você deve inserir um número de cartão válido no campo Número do Cartão de acordo com a franquia selecionada. Para isso, você pode usar um gerador de cartão de crédito online.
* Todos os outros campos podem ser aleatórios.

{{% /alert %}}  

Assim que terminar, clique em _**Save Config**_ para implementar as alterações.

Nesta etapa seus clientes podem pagar com PayU Latam quando fizerem o checkout com o carrinho de compras do Magento. 

