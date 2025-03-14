---
title: "PrestaShop"
linkTitle: "PrestaShop"
date: 2025-03-10T10:30:35-05:00
description:
  Este guia explica como integrar o PayU ao seu site baseado no PrestaShop.
weight: 9
tags: ["subtopic"]
---

PrestaShop é uma plataforma de e-commerce de código aberto que permite que empresas criem e personalizem lojas online com total controle sobre design e funcionalidade. É autohospedada e altamente extensível por meio de módulos e temas. Para mais informações, visite o <a href="https://prestashop.com" target="_blank">site oficial do PrestaShop</a>.

## Pré-requisitos

Antes de integrar o PayU ao PrestaShop, certifique-se de ter o seguinte:

* Uma <a href="https://developers.payulatam.com/latam/pt/docs/getting-started/create-an-account.html" target="_blank">conta ativa do PayU Latam</a>.
* Seu site deve estar rodando o PrestaShop na versão 1.4 a 1.6.
* O plugin do PayU para PrestaShop, disponível para download <a href="https://developers.payulatam.com/latam/pt/docs/tools/shopping-cart-plugins.html#plugin-files" target="_blank">aqui</a>.

{{% alert title="Importante" color="warning"%}}

As versões 1.7 e superiores do PrestaShop não são compatíveis com o plugin do PayU.

{{% /alert %}}

## Integração do Plugin do PayU nos Módulos do PrestaShop

Para usar os serviços do PayU no seu site PrestaShop, é necessário instalar o plugin do PayU como um módulo. Siga os passos abaixo:

1. Acesse o painel de administração do PrestaShop.

2. Navegue até **Modules and Services > Modules and Services**.

3. Clique em **Add a new module** no canto superior direito.

4. Clique em **Choose a file**, selecione o arquivo ZIP do plugin do PayU para PrestaShop no seu computador e depois clique em **Upload this module**.

![PrintScreen](/assets/prestashop/prestashop1.png)

5. O módulo do PayU agora aparecerá na lista de módulos. Clique em **Install**.

6. Na lista de módulos, localize o módulo do PayU e clique em **Configure**.

7. Preencha os seguintes campos obrigatórios:

| Campo | Descrição |
|---|---|
| Merchant ID | ID do seu comércio no PayU Latam. <a href="https://developers.payulatam.com/latam/pt/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html" target="_blank">Ver meu Merchant ID</a>. |
| Account ID | ID da conta do PayU baseado no seu país de operação. <a href="https://developers.payulatam.com/latam/pt/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html" target="_blank">Ver meu Account ID</a>. |
| API Key | Chave única do seu comércio. <a href="https://developers.payulatam.com/latam/pt/docs/integrations.html#api-key-and-api-login" target="_blank">Ver minha API Key</a>. |

{{% alert title="Nota" color="warning"%}}

Ative o **Test Mode** para realizar transações com dados simulados.

{{% /alert %}}

8. Clique em **Save**.

Agora, os serviços do PayU estão integrados com sucesso ao seu site PrestaShop.
