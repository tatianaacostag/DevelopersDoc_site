---
title: "WooCommerce"
linkTitle: "WooCommerce"
date: 2021-05-26T08:40:03-05:00
description:
  Este artigo mostra o procedimento para habilitar PayU em seu site WooCommerce.
weight: 6
tags: ["subtopic"]
---

WooCommerce é um plugin para WordPress que facilita a criação de uma loja online integrada. Para permitir que seus clientes paguem com PayU de seu site, você precisa instalar o plugin para WooCommerce, que integra PayU Latam como um portal de pagamento válido. Para obter mais informações sobre WooCommerce, consulte o [site oficial](https://woocommerce.com/). 

## Pré-requisitos {#prerequisites}
* Você precisa de uma conta ativa no PayU Latam.
* Ter instalado [WordPress 3.8](https://wordpress.com/en) ou superior.
* Ter instalado WooCommerce 2.0 ou superior no site WordPress.
* Ter o plugin WooCommerce do PayU baixado e armazenado em local acessível. Clique [aqui](https://github.com/developers-payu-latam/developers-payu-latam.github.io/raw/master/plugins/woocommerce-payu-latam-2.1.zip) para fazer o download.

## Instalação {#installation}
Siga o próximo procedimento para instalar o plugin em seu site.

1. Faça login no seu site WordPress como administrador.

2. No Painel, expanda o menu _**Plugins**_ à esquerda e clique em _**Add New**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_01.jpg)

3. Acesse a opção _**Upload**_ e escolha o arquivo _.zip_ do plugin WooCommerce baixado.<br>
Depois, clique em _**Install Now**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_02.jpg)

4. Forneça os dados da conexão via FTP e clique em _**Proceed**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_03.jpg)

{{% alert title="Observação" color="info"%}}

Esta etapa depende da configuração inicial do WordPress. A instalação do plugin não é afetada se esta tela não for exibida.

{{% /alert %}}  

5. Por fim, ative o plugin que você instalou clicando no botão _**Activate Plugin**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_04.jpg)

## Configuração {#configuration}
1. De volta ao painel, expanda o menu _**WooCommerce**_ no painel esquerdo e clique em _**Settings**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_05.jpg)

2. Acesse a aba _**Checkout**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_06.jpg)

3. Role para baixo até a tabela _**Payment Gateways**_ Depois, encontre _PayU Latam_ e arraste e solte no topo da tabela.<br>
Clique no rádio da coluna _**Default**_.

![PrintScreen](/assets/WooCommerce/WooCommerce_07.jpg)

Salve as alterações. 

4. Clique no link _PayU Latam_ no topo da aba e configure os dados de sua conta PayU.

![PrintScreen](/assets/WooCommerce/WooCommerce_09.jpg)

A tabela a seguir explica os valores:

| Campo                     | Valor                                                                                      |
|---------------------------|--------------------------------------------------------------------------------------------|
| Enable / Disable          | Marque esta caixa de seleção para habilitar o portal de pagamento no WooCommerce.          |
| Title                     | Título exibido para o método de pagamento. o valor padrão é _PayU Latam_.                  |
| Merchant ID               | ID da sua loja no PayU Latam                                                               |
| Account ID                | ID da conta PayU de acordo com o país onde você quer vender.                               |
| API key                   | Chave única do seu comércio, que você encontra no Módulo PayU.                             |
| Gateway URL               | URL do Gateway.<br>Para teste, você pode usar https://sandbox.gateway.payulatam.com/ppp-web-gateway e para produção https://gateway.payulatam.com/ppp-web-gateway/                                                                  |
| Transaction in test mode  | Marque esta caixa de seleção para fazer as transações no modo de teste.                    |
| Response page             | URL da página de resposta.<br>Por padrão, a URL é https://your.domain.com/wp-content/plugins/woocommerce-payu-latam/response.php, você deve substituir https://your.domain.com com o domínio do seu site.             |
| Confirmation page         | URL da página de resposta.<br>Por padrão, a URL é https://your.domain.com/wp-content/plugins/woocommerce-payu-latam/confirmation.php, você deve substituir https://your.domain.com com o domínio do seu site.         |

5. Por fim, clique no botão _**Save changes**_. Nesta etapa seus clientes podem pagar com PayU Latam quando fizerem o checkout com o carrinho de compras do WooCommerce. 