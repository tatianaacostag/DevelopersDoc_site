---
title: "osCommerce"
linkTitle: "osCommerce"
date: 2021-05-26T08:39:47-05:00
description:
  Este artigo mostra o procedimento para habilitar PayU em seu site osCommerce.
weight: 7
tags: ["subtopic"]
---

O osCommerce é uma plataforma desenvolvida em PHP que facilita a criação de uma loja online. Para permitir que seus clientes paguem com PayU de seu site, você precisa instalar o plugin para osCommerce, que integra PayU Latam como um portal de pagamento válido. Para obter mais informações sobre osCommerce, consulte o [site oficial](https://www.oscommerce.com/).

## Pré-requisitos {#prerequisites}
* Você precisa de uma conta ativa no PayU Latam.
* Ter instalado [osCommerce version 2.3](https://www.oscommerce.com/Products).
* Ter o plugin osCommerce do PayU baixado e armazenado em local acessível. Clique [aqui](https://github.com/developers-payu-latam/developers-payu-latam.github.io/raw/master/plugins/plugin-oscommerce.zip) para fazer o download.

## Instalação {#installation}
Siga o próximo procedimento para instalar o plugin em seu site.

1. Descompacte o arquivo do plugin em um local de sua escolha. A partir de agora, vamos direcionar este local para `[PLUGIN_PATH]`.<br>
Neste caminho, você encontra a pasta `oscommerce-plugin-1.0`.

![PrintScreen](/assets/oscommerce/oscommerce_01.png)

2. Usando FTP ou fazendo login como Administrador no servidor onde o osCommerce está instalado, inclua os arquivos de plug-in no servidor da seguinte maneira:

* No caminho do servidor `/[servidor]/apache/[publication_path]/oscommerce/catalog`, copie os arquivos de plugin `confirmation_payu.php` e `response_payu.php`. Esses arquivos estão localizados no caminho `[PLUGIN_PATH]\oscommerce-plugin-1.0\oscommerce-payu-latam-1.0\catalog`.

![PrintScreen](/assets/oscommerce/oscommerce_02.png)

* No caminho do servidor `/[servidor]/apache/[publication_path]/oscommerce/catalog/includes/languages/english/modules/`, copie o arquivo do plugin `‘payu_latam.php` localizado no caminho `[PLUGIN_PATH]\oscommerce-plugin-1.0\oscommerce-payu-latam-1.0\catalog\includes\languages\english\modules\payment`.<br><br>
![PrintScreen](/assets/oscommerce/oscommerce_03.png)<br>
  Repita esta etapa para espanhol e português se você os instalou em seu site osCommerce. Esses arquivos estão localizados no caminho:<br>
  - ES: `[PLUGIN_PATH]\oscommerce-plugin-1.0\oscommerce-payu-latam-1.0\catalog\includes\languages\espanol\modules\payment`
  - PT: `[PLUGIN_PATH]\oscommerce-plugin-1.0\oscommerce-payu-latam-1.0\catalog\includes\languages\portugues\modules\payment`

{{% alert title="Observação" color="info"%}}

O plugin PayU Latam para osCommerce está disponível apenas para inglês, espanhol e português.

{{% /alert %}}  

* No caminho do servidor `/[servidor]/apache/[publication_path]/oscommerce/catalog/includes/modules/payment/`, copie o arquivo do plugin `‘payu_latam.php` localizado no caminho `[PLUGIN_PATH]\oscommerce-plugin-1.0\oscommerce-payu-latam-1.0\catalog\includes\modules\payment`. Este arquivo não é o mesmo que o mencionado anteriormente.

![PrintScreen](/assets/oscommerce/oscommerce_04.png)

3. No painel de administração do osCommerce, expanda o menu _**Modules**_ no painel esquerdo e selecione a opção _**Payment**_.

![PrintScreen](/assets/oscommerce/oscommerce_05.jpg)

4. Na seção Pagamento, clique no botão _**Install Module**_ localizado no canto superior direito.

![PrintScreen](/assets/oscommerce/oscommerce_06.jpg)

5. Encontre o plugin `Payu Latam` e clique nele. Depois, clique no botão _**Install Module**_ no painel direito.

![PrintScreen](/assets/oscommerce/oscommerce_07.jpg)

6. Depois de instalar o plugin, a lista de módulos instalados do plugin `Payu Latam` aparece no painel direito.

![PrintScreen](/assets/oscommerce/oscommerce_08.jpg)

## Configuração {#configuration}
1. Na seção Payment, selecione o método de pagamento _**Payu Latam**_ e clique no botão _**Edit**_ no painel direito.

![PrintScreen](/assets/oscommerce/oscommerce_09.jpg)

2. O seguinte formulário de configuração aparece

<img src="/assets/oscommerce/oscommerce_10.jpg" width="30%" alt="PrintScreen"/>
<br>

Configure-o usando as informações de sua conta PayU da seguinte forma:

| Campo             | Valor                                                                                                 |
|-------------------|-------------------------------------------------------------------------------------------------------|
| Enable / Disable  | Selecione **True** para habilitar o portal de pagamento no osCommerce.                                |
| Merchant ID       | ID da sua loja no PayU Latam                                                                          |
| Account ID        | ID da conta PayU de acordo com o país onde você quer vender.                                          |
| API key           | Chave única do seu comércio, que você encontra no Módulo PayU.                                        |
| Gateway URL       | URL do Gateway.<br>Para teste, você pode usar https://sandbox.gateway.payulatam.com/ppp-web-gateway e para produção https://gateway.payulatam.com/ppp-web-gateway/                                                                              |
| Transaction Mode  | Selecione **Test** se você deseja processar no ambiente de teste. Caso contrário, selecione **Live**. |
| Response page     | URL da página de resposta.<br>Por padrão, a URL é http://your.domain.com/yourOscommerceFolder/catalog/response_payu.php, você deve substituir http://your.domain.com com o domínio do seu site.                                                      |
| Confirmation page | URL da página de resposta.<br>Por padrão, a URL é http://your.domain.com/yourOscommerceFolder/catalog/confirmation_payu.php, você deve substituir http://your.domain.com com o domínio do seu site.                                                 |

3. Salve as alterações usando o botão na parte inferior do painel.

4. Finalmente, expanda o menu _**Localization**_ e clique em _**Order Status**_. Verifique se o status da ordem foi criado de acordo com os idiomas instalados (inglês, espanhol e português) em seu site osCommerce.

![PrintScreen](/assets/oscommerce/oscommerce_13.jpg)

Os estados válidos são:
* Para inglês: `Approved`, `Rejected`, `Failed` e `Pending`.
* Para espanhol: `Aprobada`, `Rechazada`, `Fallida` e `Pendiente`.
* Para Portuguese: `Aprovado`, `Recusada`, `Falha` e `Pendente`.

{{% alert title="Observação" color="info"%}}

Se você não tiver nenhum dos idiomas mencionados anteriormente, os estados não aparecerão na lista. Se você deseja instalar um idioma posteriormente, pode criar esses estados manualmente usando os mesmos nomes exibidos acima.

{{% /alert %}} 

Nesta etapa seus clientes podem pagar com PayU Latam quando fizerem o checkout com o carrinho de compras do osCommerce. 