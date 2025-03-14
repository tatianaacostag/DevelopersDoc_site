---
title: "VirtueMart"
linkTitle: "VirtueMart"
date: 2021-05-26T08:39:05-05:00
description:
  Este artigo mostra o procedimento para habilitar PayU em seu site VirtueMart.
weight: 5
tags: ["subtopic"]
---

## Pré-requisitos {#prerequisites}
* Você precisa de uma conta ativa no PayU Latam.
* Para VirtueMart versão 2 ou superior:
  * Ter o plugin VirtueMart do PayU baixado e armazenado em local acessível. Clique [aqui](https://github.com/developers-payu-latam/developers-payu-latam.github.io/raw/master/plugins/plugin-joomla-virtuemart2.6.7.zip) para fazer o download.
  * Ter o VirtueMart versão 2 ou superior instalado.
  * Seu site VirtueMart deve ser instalado em [Joomla!®](https://joomla.org/) 2.5 ou superior com MySQL 5.1 ou superior.
* Para VirtueMart versão 3.0.6:
  * Ter o plugin VirtueMart do PayU baixado e armazenado em local acessível. Clique [aqui](https://github.com/developers-payu-latam/developers-payu-latam.github.io/raw/master/plugins/plugin-joomla-virtuemart3.0.6.zip) para fazer o download. 
  * Ter o VirtueMart versão 3.0.6 installed.
  * Seu site VirtueMart deve ser instalado em [Joomla!®](https://joomla.org/) versions 3.3.6, 2.5.28 ou 2.5.27.

## Plugin para VirtueMart 2 ou superior {#plugin-for-virtuemart-2-or-higher}
Siga o próximo procedimento para instalar e configurar o plugin em seu site.

### Instalação {#installation}

1. Abra o _Console do Administrador Joomla!®_ e selecione a opção _**Extension Manager**_ localizada no menu _**Extension**_.

![PrintScreen](/assets/VirtueMart/VirtueMart_01.jpg)

2. Na seção _**Upload Package File**_, clique em _**Browse**_ e localize o arquivo _.zip_ do plugin PayU baixado.

![PrintScreen](/assets/VirtueMart/VirtueMart_02.jpg)

3. Assim que o procedimento de instalação for concluído, uma mensagem aparecerá para informar que a instalação foi bem-sucedida.

![PrintScreen](/assets/VirtueMart/VirtueMart_03.jpg)

### Configuração {#configuration}
1. Expanda a opção _**Shop**_ no menu _**VirtueMart**_ e selecione _**Payment methods**_. Depois, clique em _**New**_ no canto superior direito da tela.

![PrintScreen](/assets/VirtueMart/VirtueMart_04.jpg)

2. Na guia _**Payment Method Information**_, definir _Payulatam_ como _**Payment Name**_ e selecionar `PayuLatam` no campo _**Payment Method**_.

![PrintScreen](/assets/VirtueMart/VirtueMart_05.jpg)

3. Acesse a guia _**Configuration**_ e forneça as informações de sua conta e sua API key. 

![PrintScreen](/assets/VirtueMart/VirtueMart_06.jpg)

Depois, forneça a URL de conexão para o portal e as variáveis de configuração explicadas na seção [Variáveis de configuração]({{< ref "#configuration-variables" >}}).

As URLs para ambientes de teste e produção são:
* Teste: `https://sandbox.gateway.payulatam.com/ppp-web-gateway`
* Produção: `https://gateway.payulatam.com/ppp-web-gateway/`

4. Finalmente, clique no botão _**Save**_ ou _**Save & Close**_. Nesta etapa, seus clientes podem pagar com PayU Latam usando o carrinho de compras VirtueMart. 

## Plugin para VirtueMart 3.0.6 {#plugin-for-virtuemart-306}
Siga o próximo procedimento para instalar e configurar o plugin em seu site.

### Instalação {#installation}

1. Abra o _Console do Administrador Joomla!®_ e selecione a opção _**Extension Manager**_ dentro do menu _**Extensions**_.

![PrintScreen](/assets/VirtueMart/VirtueMart3_02.jpg)

2. No campo _**Extension package file**_, escolha o arquivo _.zip_ baixado anteriormente.

![PrintScreen](/assets/VirtueMart/VirtueMart3_03.jpg)

3. Depois de carregar o arquivo _.zip_, clique em _**Upload & Install**_.

![PrintScreen](/assets/VirtueMart/VirtueMart3_05.jpg)

4. Assim que o procedimento de instalação for concluído, aparecerá uma mensagem para informar que a instalação foi bem-sucedida.

![PrintScreen](/assets/VirtueMart/VirtueMart3_06.jpg)

### Configuração {#configuration}
1. No menu esquerdo, clique em _**Manage**_. Encontre e habilite o plugin `PayuLatam`.

![PrintScreen](/assets/VirtueMart/VirtueMart3_07.jpg)

Aparecerá uma mensagem informando que você habilitou o plugin. Além disso, o ícone muda para uma marca de verificação.

![PrintScreen](/assets/VirtueMart/VirtueMart3_08.jpg)

2. Abra o menu _**Components**_ e expanda a opção _**Virtuemart**_. Depois, selecione _**Payment Methods**_.

![PrintScreen](/assets/VirtueMart/VirtueMart3_09.jpg)

3. Na janela aberta, clique em _**New**_ para criar um método de pagamento usando o `PayuLatam`.

![PrintScreen](/assets/VirtueMart/VirtueMart3_10.jpg)

4. Na guia _**Payment Method Information**_, definir _Payulatam_ como _**Payment Name**_ e selecionar `PayuLatam` no campo _**Payment Method**_.

![PrintScreen](/assets/VirtueMart/VirtueMart3_11.jpg)

5. Acesse a guia _**Configuration**_ e forneça as informações de sua conta e sua API key.

![PrintScreen](/assets/VirtueMart/VirtueMart3_13.jpg)

Depois, forneça a URL de conexão para o portal e as variáveis de configuração explicadas na seção [Variáveis de configuração]({{< ref "#configuration-variables" >}}).

As URLs para ambientes de teste e produção são:
* Teste: `https://sandbox.gateway.payulatam.com/ppp-web-gateway`
* Produção: `https://gateway.payulatam.com/ppp-web-gateway/`

6. Finalmente, clique no botão _**Save**_ ou _**Save & Close**_. Nesta etapa, seus clientes podem pagar com PayU Latam usando o carrinho de compras VirtueMart. 

## Configuração variables {#configuration-variables}
Regardless of the VirtueMart version you use, set and configure the following variables in your plugin:

| Campo                                | Valor                                                                                 |
|--------------------------------------|---------------------------------------------------------------------------------------|
| Logo                                 | Logo exibido para o método de pagamento **PayuLatam**.                                |
| Test URL                             | URL do Gateway para teste: `https://sandbox.gateway.payulatam.com/ppp-web-gateway`.   |
| Production URL                       | URL do Gateway para produção: `https://gateway.payulatam.com/ppp-web-gateway`.        |
| Test Mode                            | Selecione **Yes** se você deseja fazer transações no ambiente de teste. Quando você ativa esta opção, o VirtueMart usa a URL configurada na variável da **Test URL**.                                                                |
| Merchant ID                          | ID da sua loja no PayU Latam.                                                         |
| Account ID                           | ID da conta PayU de acordo com o país onde você quer vender.                          |
| API Key                              | Chave única do seu comércio, que você encontra no Módulo PayU.                        |
| Seção **ORDER STATUS PARAMS**<br><ul style="margin-bottom: initial;"><li>Transações aprovadas</li><li>Transações Pendentes</li><li>Transações recusadas</li></ul>  | Define o estado da ordem no VirtueMart de acordo com o estado da transação fornecido por PayU. Sugerimos manter os estados padrão. No entanto, você pode configurá-los de acordo com as necessidades dos seus negócios.       |
| Currency                             | Defina USD. Além disso, você pode configurar a moeda do país do ID da conta.          |
| Minimum Value / Maximum value        | O valor total de uma ordem deve estar dentro deste limite para ativar a forma de pagamento PayuLatam. |
| Tax                                  | Para usar esta opção, configure a regra VirtueMart correspondente ao imposto associado. Por exemplo, IVA para a Colômbia. |