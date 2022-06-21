---
title: "OpenCart"
linkTitle: "OpenCart"
date: 2021-05-26T08:40:11-05:00
description:
  Este artigo mostra o procedimento para habilitar PayU em seu site OpenCart.
weight: 70
tags: ["subtopic"]
nosidetoc: true
---

OpenCart é uma plataforma gratuita desenvolvida em PHP para a criação de lojas online. OpenCart fornece uma base profissional e confiável para construir uma loja online. Essa base usa uma ampla variedade de usuários, como desenvolvedores web que procuram uma interface acessível ou proprietários de lojas que desejam lançar seus negócios online pela primeira vez. O OpenCart tem muitos recursos que oferecem a você um grande controle sobre a personalização de sua loja. Para obter mais informações sobre o OpenCart, consulte o [site oficial](https://www.opencart.com/). 

## Pré-requisitos {#prerequisites}
O plug-in OpenCart está disponível para as versões 1.5 e 2.0 e você precisa atender aos seguintes pré-requisitos:

* Você precisa de uma conta ativa no PayU Latam.
* Para OpenCart versão 1.5:
  * Ter o plugin OpenCart v1.5 do PayU baixado e armazenado em local acessível. Clique [aqui](https://github.com/developers-payu-latam/developers-payu-latam.github.io/raw/master/plugins/plugin-opencart.zip) para fazer o download.
  * Ter OpenCart versão 1.5.5.1 - 1.5.6.X instalado.
* Para OpenCart versão 2.0:
  * Ter o plugin OpenCart v2.0 do PayU baixado e armazenado em local acessível. Clique [aqui](https://github.com/developers-payu-latam/developers-payu-latam.github.io/raw/master/plugins/plugin-opencart-2.0.zip) para fazer o download.

## Instalação {#installation} and configuration
O procedimento para instalar o plugin OpenCart é o mesmo para a versão 1.5 ou 2.0. A única diferença é a aparência das versões e isso é abordado neste artigo.<br>
Siga o próximo procedimento para instalar o plugin em seu site.

1.	Descompacte o arquivo do plugin em um local de sua escolha. Em seguida, usando um cliente FTP, vá para o local onde você descompactou o plug-in.<br>Em seguida, carregue as pastas **admin** e **catalog** na pasta raiz da instalação do OpenCart em seu servidor.

![PrintScreen](/assets/OpenCart/OpenCart_01.jpg)

Esta ação adiciona os arquivos de plugin ao seu servidor OpenCart nos locais corretos. Para validar se o procedimento estava correto, pesquise os seguintes arquivos em seus locais correspondentes.

![PrintScreen](/assets/OpenCart/OpenCart_02.jpg)

2. No console de administração de sua loja OpenCart, abra o menu _**Extensions**_ e clique em _**Payments**_.

**OpenCart v1.5**

![PrintScreen](/assets/OpenCart/OpenCart_03.jpg)

**OpenCart v2.0**

![PrintScreen](/assets/OpenCart/OpenCart_04.jpg)

3. Na tabela _**Payment**_, encontre a forma de pagamento _PayuLatam_. Depois clique em _**Install**_.

**OpenCart v1.5**

![PrintScreen](/assets/OpenCart/OpenCart_05.jpg)

**OpenCart v2.0**

![PrintScreen](/assets/OpenCart/OpenCart_06.jpg)

4. Quando o plugin for instalado, clique em _**Edit**_.

**OpenCart v1.5**

![PrintScreen](/assets/OpenCart/OpenCart_07.jpg)

**OpenCart v2.0**

![PrintScreen](/assets/OpenCart/OpenCart_08.jpg)

5. Configure a forma de pagamento usando os dados de sua conta PayU da seguinte maneira.

| Campo                | Valor                                                                                            |
|----------------------|--------------------------------------------------------------------------------------------------|
| Production Url       | URL do PayU Latam em produção https://gateway.payulatam.com/ppp-web-gateway/                     |
| Test Url             | URL do PayU Latam em teste https://sandbox.gateway.payulatam.com/ppp-web-gateway                 |
| Test Mode?           | Definir **Yes** para fazer transações no ambiente de teste e **No** para o ambiente de produção. |
| Merchant ID          | ID da sua loja no PayU Latam                                                                     |
| Account ID           | ID da conta PayU de acordo com o país onde você quer vender.                                     |
| API key              | Chave única do seu comércio, que você encontra no Módulo PayU.                                   |
| Approved Transaction | Status da ordem na loja OpenCart quando PayU Latam aprovar a transação.                          |
| Pending Transaction  | Status da ordem na loja OpenCart quando a transação está pendente no PayU Latam.                 |
| Declined Transaction | Status da ordem na loja OpenCart quando PayU Latam recusa a transação.                           |
| Status               | Selecione _**Enable**_ para ativar este método de pagamento no OpenCart.                         |

6. Finalmente, salve as alterações. Nesta etapa seus clientes podem pagar com PayU Latam quando fizerem o checkout com o carrinho de compras do OpenCart. 