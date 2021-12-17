---
title: "Guia do Módulo PayU"
linkTitle: "Início"
date: 2017-01-05
type: docs
description: >
  Facilitamos para os comércios a oferta de pagamentos online, eliminando o desafio da integração com vários métodos de pagamento.
menu:
  main:
    name: Guia do Módulo PayU
    weight: 40    
---

O módulo PayU é o sistema onde você pode gerenciar sua conta com segurança. Neste módulo, você pode alterar sua senha, obter relatórios de vendas, encontrar os dados necessários para integrar seu site à nossa plataforma, utilizar ferramentas para receber pagamentos e transferir dinheiro para sua conta bancária. O módulo PayU é ideal para empresas que precisam:

* Manter o controle de seus estoques e vendas realizadas através do PayU.
* Estar atualizado com as informações dos movimentos financeiros de sua conta.
* Fazer solicitações à equipe de suporte sobre problemas em sua conta.

Para acessar o módulo PayU, acesse www.payu.com, no canto superior direito, você encontra a opção de fazer login.<br>Alternativamente, você pode ir diretamente https://merchants.payulatam.com/.

![PrintScreen](/assets/Login1_pt.png)

{{% alert title="Observação" color="info"%}}

Você ainda não tem um usuário? Aprenda a criar um [aqui]({{< ref "create-an-account.md" >}}).

{{% /alert %}}

## O que você pode fazer no Módulo PayU {#what-you-can-do-using-the-payu-module}
O módulo PayU permite que você execute as seguintes operações:

* Veja os fundos disponíveis em sua conta PayU e transfira-os para sua conta bancária.
* Consulte os movimentos de suas contas, extratos e relatórios.
* Veja o status de suas vendas
* Veja as credenciais de autenticação para integrar à sua plataforma de vendas: API Key, API Login e merchant ID (Id do Comércio).
* Atualize seus dados bancários.
* Configure o logotipo da sua empresa para aparecer na web checkout (portal de pagamento).
* Defina as URLs de sua página de confirmação e página de resposta (se você tiver uma integração de API ou check-out na web).

## Conceitos do módulo PayU {#what-you-can-do-using-the-payu-module}
O Módulo PayU permite que um usuário gerencie a loja e suas contas relacionadas. A complexidade do seu módulo PayU depende do seu tamanho. Vamos explicar isso usando os seguintes conceitos.

* **Comércio (Merchant)**: o comércio é a loja que oferece produtos ou serviços. PayU define a loja como a pessoa jurídica que contrata o serviço PayU. Se sua loja for legalmente constituída em dois países (duas entidades legais), cada entidade legal deve ser criada como um comércio.<br>Por exemplo, _Loja ABC_ tem filiais no México e na Colômbia, mas a loja constituiu uma empresa em cada país. Quando Loja ABC contrata os serviços PayU, PayU cria dois comércios diferentes.

{{% alert title="Observação" color="info"%}}
Cada comércio em PayU tem um único `Merchant ID`.
{{% /alert %}}

* **Conta (Account)**: uma conta no PayU representa um país de processamento, uma linha de negócios ou um recurso PayU contratado de um determinado comércio. Se a sua loja está legalmente constituída em um país e vende produtos em muitos países, você tem um único comércio (sua loja) no qual você encontra uma conta para cada país.<br>Por exemplo, _Sistemas XYZ_ é uma empresa legalmente constituída nos Estados Unidos que oferece serviços de hospedagem web na Colômbia, no México e no Peru. Quando _Sistemas XYZ_ contrata os serviços PayU, PayU cria um comércio com três contas.<br>Além disso, uma conta também é uma das seguintes:
  - Um ramo de negócios: quando um comércio possui muitos segmentos de negócios diferentes em um determinado país. Por exemplo, uma empresa de software pode oferecer seu produto como um ramo e o treinamento como outro. Nesse caso, essa loja possui duas contas.
  - o	Um recurso: se você contratar dois recursos PayU com um esquema de preços diferente, cada recurso é representado em seu módulo PayU como uma conta. Por exemplo, uma loja tem um preço para processar com cartões de crédito e outro para pagamentos em dinheiro.
* **Usuário (User)**: um usuário é uma pessoa que possui um perfil para administrar ou consultar os dados de uma conta.<br>Um perfil é um conjunto de permissões para acessar uma conta. Um usuário pode ter um ou vários perfis, isso significa que um usuário pode acessar várias contas e vários comércios.

Os gráficos a seguir mostram a relação entre os conceitos acima.

#### Loja multi-comércio {#multi-merchant-shop}
A loja _Loja ABC_ tem filiais no México e na Colômbia, ambas legalmente constituídas como _Shop ABC México_ and _Shop ABC Colômbia_, esta é a relação entre os conceitos anteriores para este exemplo:

<img src="/assets/MerchantPanel/MerchantPanel_Concepts1_pt.png" width="50%"/><br>

* O módulo PayU para _Loja ABC_ tem dois comércios: _Loja ABC México_ e _Loja ABC Colômbia_, cada comércio tem uma conta, pois processa apenas no país onde está constituída.

* _Loja ABC_ tem quatro usuários; **Usuário 2** e **Usuário 3** podem acessar ambas as contas, entretanto **Usuário 1** só pode acessar a conta colombiana e **Usuário 4** a conta mexicana.

{{% alert title="Observação" color="info"%}}

Nesse caso, cada comércio pode ter várias contas, se necessário.

{{% /alert %}}

#### Loja de comércio único com várias contas {#single-merchant-shop-with-multiple-accounts}
_Sistemas XYZ_ é uma empresa legalmente constituída nos Estados Unidos que oferece serviços de hospedagem web na Colômbia, no México e no Peru. Além disso, _Sistemas XYZ_ possui dois ramos de negócios na Colômbia: hospedagem na web e treinamento. Esta é a relação entre os conceitos anteriores para este exemplo:

<img src="/assets/MerchantPanel/MerchantPanel_Concepts2_pt.png" width="50%"/><br>

* O módulo PayU para _Sistemas XYZ_ tem um só comércio, visto que está legalmente constituído nos Estados Unidos. Como _Sistemas XYZ_ processa pagamentos em três países, este comércio tem quatro contas; duas para a Colômbia (uma para cada linha de negócios), uma para o México e uma para o Peru.
* _Sistemas XYZ_ tem quatro usuários; **Usuário 3** pode acessar todas as contas. Enquanto isso, os outros usuários podem acessar seu país atribuído.

{{% alert title="Observação" color="info"%}}

Os comércios podem estar fora de nossos países de processamento. No entanto, eles devem ter uma conta bancária intermediária em cada país onde desejam processar.

{{% /alert %}}

#### Comércios individuais com contas únicas {#single-merchants-with-single-accounts}
Este é o caso mais comum ao usar o módulo PayU. Uma loja está legalmente constituída em um país onde oferece seus produtos ou serviços. Esta é a relação entre os conceitos anteriores para este exemplo:

<img src="/assets/MerchantPanel/MerchantPanel_Concepts3_pt.png" width="50%"/><br>

* O módulo PayU desta loja tem uma conta única e um só estabelecimento, que todos os usuários podem acessar de acordo com o perfil que têm.