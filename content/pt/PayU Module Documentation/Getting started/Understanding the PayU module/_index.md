---
title: "Conheça o Módulo PayU"
linkTitle: "Conheça o Módulo PayU"
date: 2021-08-17T14:47:21-05:00
type: docs
Description: > 
  Depois de entrar no módulo PayU, você pode ver as opções disponíveis para gerenciar sua conta, consultar o status das vendas, controlar suas finanças, transferir dinheiro de sua conta PayU e muito mais.
weight: 30
tags: ["parenttopic"]
---

## Pré-requisitos {#prerequisites}
Antes de explicar como o módulo PayU é organizado, você precisa do seguinte:
* Ter um usuário no módulo PayU. Aprenda a criar um [aqui]({{< ref "create-an-account.md" >}}).
* Ter lido e entendido os [conceitos do Módulo PayU](/en/payu-module-documentation.html#payu-module-concepts).

## Módulo PayU web application {#payu-module-web-application}
O módulo PayU é dividido em quatro grupos principais:

1. [Opções de conta]({{< ref"#1-account-options" >}}).
2. [Configurações e opções do usuário]({{< ref"#2-settings-and-user-options" >}}).
3. [Painel principal]({{< ref"#3-main-panel" >}}).
4. [Rodapé]({{< ref"#4-rodapé" >}}).

![PrintScreen](/assets/MerchantPanel/MerchantPanel_01_pt.png)

{{% alert title="Observação" color="info"%}}
As opções apresentadas neste artigo dependem do perfil que você tem para acessar cada conta.
{{% /alert %}}

### 1. Opções de conta {#1-account-options}
Este painel contém as opções necessárias para gerenciar as contas associadas ao comércio atual. Neste painel, você encontra as seguintes opções:

<div class="variables"></div>

| Opção | Sub-opção | Disponível em | Descrição |
|---|---|:---:|---|
| Merchant ID |  | <img src="/assets/World.png" width="20px"/> | Número de identificação da sua loja no sistema PayU. Este ID é necessário quando você deseja usar [Integrações]({{< ref "integrations" >}}).  |
| Conta | Informação da conta | <img src="/assets/World.png" width="20px"/> | Exibe o nome e o ID da conta selecionada.<br>Essa opção também permite que você altere a conta e execute operações relacionadas a ela. Clique no símbolo **▾** para encontrar essas opções ou trocar de conta.<br><br><img src="/assets/MerchantPanel/MerchantPanel_02_pt.png" alt="PrintScreen" width="40%"/> |
|  | Dados do meu negócio | <img src="/assets/World.png" width="20px"/> | Mostra a localização e os principais dados de contato da sua empresa. Além disso, esta opção mostra as pessoas associadas à sua empresa. |
|  | Dados da suas vendas | <img src="/assets/World.png" width="20px"/> | Mostra as informações de como você vende, o que vende, o logotipo da sua loja, informações de entrega, como você oferece seus produtos ou serviços e como seus clientes podem entrar em contato com você. |
|  | Dados bancários | <img src="/assets/World.png" width="20px"/> | Mostra a conta bancária e o banco intermediário para onde você deseja transferir os fundos arrecadados para esta conta. |
|  | Contas criadas | <img src="/assets/World.png" width="20px"/> | Mostra a lista de contas disponíveis em sua loja. |
| Saldo disponível| | <img src="/assets/World.png" width="20px"/> | Exibe o saldo disponível na conta selecionada. |
| Home | | <img src="/assets/World.png" width="20px"/> | Exibe a página de boas-vindas do módulo PayU. Para obter mais informações, consulte a página [Home]({{< ref "#home-page" >}}). |
| Transações | Relatório de Vendas | <img src="/assets/World.png" width="20px"/> | Revise os detalhes dos pagamentos recebidos, incluindo os métodos de pagamento mais usados e clientes frequentes. Para obter mais informações, consulte [Relatório de Vendas]({{< ref "Sales-report.md" >}}). |
| | Disputas | <img src="/assets/World.png" width="20px"/> | Gerencie os processos de disputas gerados em sua conta PayU. Para obter mais informações, consulte [Disputas]({{< ref "Disputes-MP.md" >}}). |
| | Extrato | <img src="/assets/World.png" width="20px"/> | Permite que você entenda o fluxo de dinheiro em sua conta, as cobranças aplicadas e as taxas e impostos relacionados. Para obter mais informações, consulte [Extrato]({{< ref "Financial-Statement.md" >}}). |
| | Certificado de retenção | <img src="/assets/Colombia.png" width="20px"/> | Baixe seu Certificado de Retenção de acordo com o período de solicitado. Para obter mais informações, consulte [Certificado de retenção]({{< ref "Withholding-Certificate.md" >}}). |
| Transferências | Transferências | <img src="/assets/Argentina.png" width="20px"/><img src="/assets/Chile.png" width="20px"/><img src="/assets/Colombia.png" width="20px"/><br><img src="/assets/Mexico.png" width="20px"/><img src="/assets/Panama.png" width="20px"/><img src="/assets/Peru.png" width="20px"/> | Permite que você envie os fundos coletados em sua conta PayU para sua conta bancária. Para obter mais informações, consulte [Transferências]({{< ref"Transfers.md" >}}). |
| | Programar transferência | <img src="/assets/Argentina.png" width="20px"/><img src="/assets/Chile.png" width="20px"/><img src="/assets/Colombia.png" width="20px"/><br><img src="/assets/Mexico.png" width="20px"/><img src="/assets/Panama.png" width="20px"/><img src="/assets/Peru.png" width="20px"/> | Permite criar transferências em frequência diária, semanal e mensal. Além disso, você pode configurar transferências personalizadas conforme necessário. Para obter mais informações, consulte [Programar transferência]({{< ref"Transfers.md#schedule-transfers" >}}). |
| | Para conta bancária | <img src="/assets/Brasil.png" width="20px"/> | Como o PayU no Brasil não é uma instituição de pagamento, os fundos arrecadados em sua conta são transferidos para sua conta diariamente. Por meio desse relatório, é possível saber o status das transferências diárias.<br>Este relatório está disponível apenas para contas do Brasil e possui as mesmas colunas e opções do [Relatório de transferências]({{< ref"transfer-report.md" >}}). |
| | Editar dados bancários | <img src="/assets/World.png" width="20px"/> | Permite solicitar a alteração da conta bancária e do banco intermediário para onde deseja transferir os fundos arrecadados para esta conta. Para obter mais informações, consulte [Atualizar minhas informações]({{< ref"Update-my-information.md#request-the-change-of-your-bank-account" >}}) |
| Venda com a PayU | Venda na internet | <img src="/assets/World.png" width="20px"/> | Permite criar solicitações de pagamento para que você possa cobrar de seus clientes sem ter um site. Para obter mais informações, consulte [Solicitação de pagamento]({{< ref"Payment-request.md" >}})  |
| | Cobranças em dinheiro | <img src="/assets/Argentina.png" width="20px"/><img src="/assets/Colombia.png" width="20px"/> | Permite que você gere cupons de pagamento ou cartões de cobrança<sup>\*</sup> com as informações necessárias para permitir que seus clientes efetuem pagamentos em dinheiro quantas vezes forem necessárias nos pontos de pagamento disponíveis. Para obter mais informações, consulte [Cupons de pagamento]({{< ref"Payment-coupons.md" >}}).<br><sup>\*</sup>_Os cartões de cobrança estão disponíveis apenas na Argentina_. |
| | Ver os links criados | <img src="/assets/World.png" width="20px"/> | Permite que você encontre e gerencie as informações de _link de cobrança_ (Solicitação de pagamento) e _Cupons de pagamento_<sup>\*</sup> que você criou em sua conta.<br><sup>\*</sup>_Cupons de pagamento estão disponíveis apenas na Argentina e na Colômbia_. |

### 2. Configurações e opções do usuário {#2-settings-and-user-options}
Este painel contém as opções necessárias para gerenciar seu comércio e seu usuário.

<img src="/assets/MerchantPanel/MerchantPanel_03_pt.png" alt="PrintScreen" width="50%"/>

#### Configurações do comércio {#merchant-settings}
Esta opção permite gerenciar usuários, permissões, perfis e a configuração técnica de sua loja. Ao clicar no botão _**Configuração**_, você pode acessar as seguintes opções:

<div class="variables"></div>

| Opção | Available in | Descrição |
|---|:---:|---|
| Gestão de usuários | <img src="/assets/World.png" width="20px"/> | Permite que você conceda acesso aos membros de sua equipe para que eles possam receber pagamentos online ou verificar informações sobre seus pagamentos. Para obter mais informações, consulte [Gestão de usuários]({{< ref"User-management.md" >}}). |
| Perfis e permissões | <img src="/assets/World.png" width="20px"/> | Permite criar perfis personalizados com permissões específicas.<br>Nesta seção, você também pode consultar a permissão padrão incluída no Módulo PayU. Para obter mais informações, consulte [Gerenciamento de perfis e permissões]({{< ref"Profile-and-permissions-management.md" >}}). |
| Configuração técnica | <img src="/assets/World.png" width="20px"/> | Nesta opção, você encontra as variáveis necessárias para integrar o PayU ao seu site. Além disso, você pode configurar as notificações de pagamentos processados e os Disputas. Para obter mais informações, consulte [Configuração técnica]({{< ref"Technical-configuration.md" >}}). |

#### Configurações do Usuário {#user-settings}
Esta opção permite que você gerencie seu perfil. Na visualização principal desta opção, você encontra o seu e-mail, o seu perfil atual no módulo PayU (para a conta atual) e o Id da conta; clique no símbolo **▾** para exibir as configurações de usuário disponíveis.

<div class="variables"></div>

| Opção           | Descrição                                                                               |
|-----------------|-----------------------------------------------------------------------------------------|
| Mudar comércio  | Esta opção está disponível quando seu usuário está inscrito em mais de um comércio.     |
| Meu perfil      | Nesta opção, você pode configurar suas preferências e atualizar sua senha.              | 
| Encerrar sessão | Esta opção fecha a sessão do usuário ativo.                                             |

### 3. Painel principal {#3-main-panel}
Este painel carrega a opção selecionada no painel esquerdo ou na opção no topo. A página _**Home**_ é selecionada por padrão, por isso carrega assim que você faz login no módulo PayU.

Para definir uma opção conforme exibida por padrão, clique no menu de três pontos no canto superior esquerdo do painel e selecione _**Definir como página inicial**_.

<img src="/assets/MerchantPanel/MerchantPanel_04_pt.png" alt="PrintScreen" width="40%"/>

#### Página Home {#home-page}
A página Homo é o ponto de partida do painel do Vendedor. Ela mostra os atalhos para fazer vendas online, controlar suas finanças, transferir fundos, aprender sobre e-commerce e deixar comentários.

![PrintScreen](/assets/MerchantPanel/MerchantPanel_05_pt.png)

Nesta página, você também pode fazer um tour com o botão _**Tour virtual**_. Este botão mostra as principais opções de gerenciamento de sua conta.

{{% alert title="Observação" color="info"%}}
Algumas opções estão conectadas às permissões configuradas para seu usuário.
{{% /alert %}}

### 4. Rodapé {#4-footer}
O rodapé apresenta o número de telefone para contato e o link para os _**Termos e Condições**_ de acordo com o país de processamento.

A seguir estão os números de telefone e horários de contato:

* <img src="/assets/Argentina.png" width="25px"/> (+5411) 598 42132> Seg - Sex 09:00 - 22:00 (UTC -3: 00)
* <img src="/assets/Brasil.png" width="25px"/> (+5511) 4130 5311> Seg - Sex 9h às 18h / Sáb 9h às 15h - Fuso Horário de Brasília (UTC -3: 00)
* <img src="/assets/Chile.png" width="25px"/> (+562) 258-13949> Seg - Sex 8:00 - 21:00 hora chilena
* <img src="/assets/Colombia.png" width="25px"/> (+57) 601 654 0721> Seg - Sex 7:00 - 20:00 hora colombiana (UTC -5: 00)
* <img src="/assets/Mexico.png" width="25px"/> (+5255) 474 11439> Seg - Sex, 7:00 - 20:00, hora CDMX
* <img src="/assets/Panama.png" width="25px"/> (+507) 836 5577> Seg - Sex, 7:00 - 20:00, hora colombiana (UTC -5: 00)
* <img src="/assets/Peru.png" width="25px"/> (+511) 708 5381> Seg - Sex 7:00 - 20:00 hora peruana (UTC -5: 00)