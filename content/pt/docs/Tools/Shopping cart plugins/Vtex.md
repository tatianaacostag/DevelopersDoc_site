---
title: "VTEX"
linkTitle: "VTEX"
date: 2021-05-25T10:30:35-05:00
description:
  Este guia explica como integrar a PayU ao seu site VTEX.
weight: 1
tags: ["subtopic"]
---

A VTEX é uma plataforma de comércio digital empresarial que permite criar rapidamente uma loja online com recursos integrados. Para mais informações, visite o <a href="https://vtex.com" target="_blank">site oficial da VTEX</a>.

## Pré-requisitos {#prerequisites}

Antes de integrar o PayU com o VTEX, certifique-se de ter o seguinte:

* Uma <a href="https://developers.payulatam.com/latam/pt/docs/getting-started/create-an-account.html" target="_blank">conta PayU Latam ativa</a>.
* Uma <a href="https://control.paymentsos.com/signup" target="_blank">conta PayU Enterprise (PaymentsOS) ativa</a> no modo de produção/ao vivo. Para mais detalhes sobre como ativá-la, consulte [Ativando sua conta PayU Enterprise](#activating-your-payu-enterprise-account-live-mode).
* Uma conta VTEX com direitos e permissões suficientes para acessar o painel administrativo da VTEX. Essa conta deve ter a autenticação de dois fatores ativada.

## Disponibilidade por País e Métodos de Pagamento {#availability-by-country-and-payment-methods}

A tabela abaixo mostra a disponibilidade da VTEX por país e os métodos de pagamento compatíveis:

| País | Cartões de Crédito | Pagamentos em Dinheiro | Outros Métodos |
|-|-|-|-|
| <img src="/assets/Argentina.png" width="20px"/> &nbsp;Argentina &nbsp; | Cartões de crédito | Pagamentos em dinheiro | - |
| <img src="/assets/Brasil.png" width="20px"/> &nbsp;Brasil | AMEX, MasterCard, Visa, Google Pay | Boleto Bancário | - |
| <img src="/assets/Colombia.png" width="20px"/> &nbsp;Colômbia &nbsp; | AMEX, Codensa, Diners, MasterCard, Visa, Google Pay | Efecty, Su Red, referência bancária | PSE, Nequi |
| <img src="/assets/Chile.png" width="20px"/> &nbsp;Chile | Cartões de crédito | Pagamentos em dinheiro | - |
| <img src="/assets/Mexico.png" width="20px"/> &nbsp;México | Cartões de crédito | Pagamentos em dinheiro | SPEI |
| <img src="/assets/Peru.png" width="20px"/> &nbsp;Peru | AMEX, MasterCard, Visa | - | Yape |

## Ativando sua Conta PayU Enterprise (Modo Ativo) {#activating-your-payu-enterprise-account-live-mode}

Por padrão, novas contas são configuradas no modo de teste. Para habilitar transações ao vivo, entre em contato com seu gerente de conta e envie uma solicitação com os seguintes detalhes:

* **Merchant ID:** Localize o Merchant ID da sua conta LATAM no <a href="https://developers.payulatam.com/latam/pt/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html#merchant-and-account-ids" target="_blank">Painel de Gerenciamento do PayU</a>.
* **Account ID:** Encontre seu Account ID no painel de controle do PayU Enterprise clicando no seu nome de usuário no canto superior direito.
<br>

![PrintScreen](/assets/VTEX/vtex01pt.png)

## Configurando sua Conta PayU Enterprise {#configuring-your-payu-enterprise-account}

Para configurar os métodos de pagamento na VTEX para processamento através do nosso gateway, siga os passos abaixo. A configuração consiste em duas etapas. Antes de prosseguir, certifique-se de ter atendido aos pré-requisitos mencionados acima.

### 1. Configuração Inicial {#1-initial-setup}

O PayU Enterprise opera através do PaymentsOS, que atua como middleware entre o PayU Latam e o VTEX. O primeiro passo é configurar os seguintes componentes dentro da sua conta PayU Enterprise:

* Configuração do provedor
* Unidade de negócios
* Webhook

Você pode configurar esses componentes utilizando um dos seguintes métodos:
* [Configurando a conta usando o Postman]({{< ref "#configuring-the-account-using-postman" >}}).
* [Configurando a conta manualmente pelo painel da PayU Enterprise]({{< ref "#configuring-the-account-manually-using-payu-enterprise-dashboard" >}}).

#### Configurando a Conta Usando o Postman {#configuring-the-account-using-postman}

Siga estas etapas para configurar sua conta usando o Postman:

1. Clique no botão abaixo para importar nossa coleção do Postman (atualize a página se o botão não funcionar).

{{< postman/postman_vtex2024 >}}
<br>

2. Após importar a coleção, defina as variáveis globais. Baixe o arquivo de variáveis globais <a href="/assets/globals/VTEX Hub.postman_globals.json" download>aqui</a>.

3. No Postman, clique em **Import** ao lado do nome do seu workspace e selecione o arquivo JSON baixado.

4. Clique em **Import** para finalizar o processo.

5. Execute os métodos da coleção na ordem exibida. Primeiro, selecione o método `POST` chamado `1. Login` e, em seguida, vá até a aba **Body**.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_01.png)

6. Insira seu e-mail e senha da sua conta PayU Enterprise e clique em **Send**. Se o login for bem-sucedido, os dados de autenticação serão definidos para o próximo método.

7. Clique no método `GET` `2. Retrieve PayU Latam ID`.

8. No canto superior direito, clique no ícone de olho para localizar o parâmetro `env`. Clique no ícone de lápis e defina-o como `test` para ambiente de teste ou `live` para produção.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_02.png)

9. Clique em **Send** para continuar.

10. Em seguida, configure o provedor, que armazena suas credenciais de processamento de pagamento. Selecione o método `POST` `3. Create Provider Configuration` e vá até a aba **Body**.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_03.png)

Preencha os seguintes detalhes:

| Parâmetro | Descrição |
|---|---|
| name | Insira um nome para a configuração do provedor. |
| description | Forneça uma descrição opcional. |
| configuration_data.apiLogin | Nome de usuário ou login fornecido pela PayU. [Como obter meu API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| configuration_data.apiKey | Chave única do seu comércio. [Como obter minha API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| configuration_data.accountId | ID da conta PayU com base no seu país de operação. |
| configuration_data.merchantId | Seu ID de comércio no PayU Latam. |
| configuration_data.paymentCountry | País de processamento no formato ISO 3166 Alpha-3. |
| configuration_data.partnerID | Identificador da PayU. Insira `ZOOZ_VTEX_V2`. |
| configuration_data.cashRedirect | Defina como `true` para garantir o fluxo adequado de pedidos com pagamentos em dinheiro na VTEX. |

{{% alert title="Nota" color="info"%}}

O parâmetro `provider_id` é atribuído automaticamente pela resposta do método `2. Retrieve PayU Latam ID`. Não modifique esse valor.

{{% /alert %}}  

11. Configure a _unidade de negócios_, que vincula a configuração do provedor com as credenciais da API PayU Enterprise para processar transações. Selecione o método `POST` `4. Create Business Unit` e, em seguida, navegue até a aba **Body**. 

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_04.png)

Preencha os seguintes detalhes:

| Parâmetro | Descrição |
|---|---|
| id | Identificador da unidade de negócios (minúsculas, sem espaços). **Este valor não pode ser alterado posteriormente, portanto, garanta a precisão.** |
| description | Descrição opcional. |

{{% alert title="Nota" color="info"%}}

O parâmetro `default_processor` é atribuído automaticamente pela resposta do método `3. Create Provider Configuration`. Não modifique esse valor.

{{% /alert %}}  
 
12. Crie o webhook, que recebe notificações da VTEX quando o status de uma transação muda. Selecione o método `POST` `5. Create Webhook` e, em seguida, navegue até a aba **Body**.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_05.png)

Defina o parâmetro `endpoint` com base no seu ambiente:
* Teste: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Produção: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

Mantenha todos os outros parâmetros com seus valores padrão.

Neste ponto, sua conta PayU Enterprise usando PaymentsOS está configurada. O próximo passo é [Configurar o Provedor VTEX]({{< ref "#2-configuring-the-vtex-provider" >}}).

#### Configurando a Conta Usando o Painel PayU Enterprise {#configuring-the-account-using-payu-enterprise-dashboard}

Siga estas etapas para configurar sua conta usando o painel PayU Enterprise.

1. **Criar a Configuração do Provedor**

Um _provedor_ armazena suas credenciais de processamento de pagamento. Siga estas etapas para configurar um:

<span style="color: #A6C307; font-weight: bold;">1.1</span> No painel do PayU Enterprise, navegue até **Configurations** > **Providers**.

![PrintScreen](/assets/VTEX/vtex02.png)

<span style="color: #A6C307; font-weight: bold;">1.2</span> Clique no módulo correspondente ao país ou divisão que você está configurando.

<span style="color: #A6C307; font-weight: bold;">1.3</span> Preencha os seguintes campos:

| Campo | Descrição |
|---|---|
| Nome da Configuração | Insira um nome para a configuração do provedor. |
| Descrição | Forneça uma descrição opcional. |
| apiLogin | Nome de usuário ou login fornecido pelo PayU. [Como obter meu API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| apiKey | Chave única do seu comércio. [Como obter minha API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| accountId | ID da conta PayU com base no seu país de operação. |
| merchantId | Seu ID de comércio no PayU Latam. |
| paymentCountry | País de processamento no formato ISO 3166 Alpha-3. |
| cashRedirect | Selecione `true` para garantir o fluxo correto de pedidos com pagamentos em dinheiro na VTEX.<br> **Nota:** Essa configuração é essencial para comerciantes que processam pagamentos em dinheiro na VTEX. |

<span style="color: #A6C307; font-weight: bold;">1.4</span> Clique em **Create**.

<img src="/assets/VTEX/vtex03.png" alt="PrintScreen" style="width: 450px; height: auto;">
<br>

2. **Criar a Unidade de Negócios**

Uma _unidade de negócios_ vincula a configuração do provedor com as credenciais da API do PayU Enterprise para processar transações. Siga estas etapas:

<span style="color: #A6C307; font-weight: bold;">2.1</span> No painel, vá para **Configurations** > **Business Units**.

<img src="/assets/VTEX/vtex04.png" alt="PrintScreen" style="width: 400px; height: auto;">
<br>

<span style="color: #A6C307; font-weight: bold;">2.2</span> Clique em **Create Business Unit** e insira:
<br>

| Campo | Descrição |
|---|---|
| Business Unit Name | Deve estar em minúsculas e não conter espaços. **Este valor não pode ser alterado posteriormente, portanto, garanta a precisão.** |
| Description | Descrição opcional. |

<span style="color: #A6C307; font-weight: bold;">2.3</span> Na seção **Choose a Default Provider for This Business Unit**, selecione a **Provider Configuration** criada na Etapa 1. Depois, clique em **Create**.

<img src="/assets/VTEX/vtex05.png" alt="PrintScreen" style="width: 700px; height: auto;">
<br>

3. **Criar o Webhook**

O webhook recebe notificações do VTEX quando o status de uma transação muda. Siga estas etapas:

<span style="color: #A6C307; font-weight: bold;">3.1</span> No painel, navegue até **Configurations** > **Webhooks**.

<img src="/assets/VTEX/vtex06.png" alt="PrintScreen" style="width: 400px; height: auto;">
<br>

<span style="color: #A6C307; font-weight: bold;">3.2</span> Clique em **Create a Webhook Endpoint** e insira a URL apropriada com base no seu ambiente:

* Teste: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Produção: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

<span style="color: #A6C307; font-weight: bold;">3.3</span> Na tabela **Payment Event Alerts**, ative o controle deslizante **Update** para **Authorization** e **Charge**. Em seguida, no campo **Associated Business Units**, insira a **Business Unit** criada na etapa anterior. Por fim, clique em **Create**.

<img src="/assets/VTEX/vtex07.png" alt="PrintScreen" style="width: 600px; height: auto;">
<br>

Neste ponto, sua conta PayU Enterprise usando PaymentsOS está totalmente configurada. O próximo passo é [configurar o provedor VTEX]({{< ref "#2-configuring-the-vtex-provider" >}}).

### 2. Configurando o Provedor VTEX {#2-configuring-the-vtex-provider}

Depois de configurar sua conta PayU Enterprise, o próximo passo é configurar o provedor VTEX para cada método de pagamento. Para prosseguir, você deve ter uma conta de usuário válida para acessar o admin da VTEX.

#### Criando um Novo Provedor

{{% alert title="Nota" color="info"%}}

Antes de criar o novo provedor, certifique-se de ter configurado o fingerprint para a PayU. Para isso, consulte este [guia](https://help.vtex.com/en/tutorial/configurar-fingerprint-para-payu).

{{% /alert %}}

1. Faça login no painel de administração VTEX e vá para **Configurações da Loja > Provedores > Novo Provedor**:

![PrintScreen](/assets/VTEX/vtex08pt.png)

2. Localize **PayU** e selecione **PayUv2**:

![PrintScreen](/assets/VTEX/vtex09pt.png)

{{% alert title="Importante" color="warning"%}}

Certifique-se de selecionar **PayUv2**, pois este guia se aplica especificamente a essa versão.

{{% /alert %}}  

3. Preencha o seguinte formulário:

![PrintScreen](/assets/VTEX/vtex10.png)

{{% alert title="Nota" color="info"%}}

As informações do provedor podem ser obtidas a partir de:
* **Coleção do Postman:** Execute o método **Retrieve Authentication Keys**, configurando o parâmetro global `env` como `test` ou `live`, dependendo do ambiente de processamento.
* **Painel PayU Enterprise:** Navegue até **Account > Business Units** e selecione a Unidade de Negócio criada em [Configurando sua Conta PayU Enterprise]({{< ref "#configuring-your-payu-enterprise-account" >}}). Use o seletor no topo para escolher o ambiente de processamento.<br>Alguns valores estão ocultos por padrão; clique no ícone de olho para revelá-los.

{{% /alert %}} 

| Campo | Descrição |
|---|---|
| App key | ID do aplicativo da **Unidade de Negócio**. |
| App token | Chave API privada da **Unidade de Negócio**. |
| Name | Nome usado para identificar a **afiliação ao Gateway**. |
| Enable test mode | Marque esta opção para realizar transações de teste. |
| Automatic settlement | Escolha como capturar (cobrar) os pagamentos:<br><ul style="margin-bottom: initial;"><li>Para um fluxo de uma etapa, selecione `Captura automática imediatamente após a autorização do pagamento`.</li><li>Para um fluxo de duas etapas, selecione `Desativado: Não capturado automaticamente` para capturar os pagamentos no momento da fatura.</li><li>Para programar a captura automática, selecione `Programado: Agenda a captura automática` e defina um prazo em horas.</li></ul><br>Para mais detalhes, consulte [Funcionalidade de Captura Automática Personalizada](https://developers.vtex.com/vtex-rest-api/docs/custom-auto-capture-feature).<br>O prazo padrão para captura automática é de sete (7) dias após a aprovação. |
| Enable payout split and send payment recipients? | Selecione `No`. |
| Tipo Autorizacion | Escolha entre fluxos de pagamento de uma ou duas etapas:<br><ul style="margin-bottom: initial;"><li>Para um fluxo de uma etapa, selecione `Autorización y Captura`.</li><li>Para um fluxo de duas etapas, selecione `Pre-Autorización`.</li></ul><br>Consulte [Fluxos de pagamento]({{< ref "payments.md#payment-flows" >}}) para mais informações. |
| Tipo de devolución | Determina como o reembolso é processado quando uma devolução é iniciada a partir do VTEX:<br><ul style="margin-bottom: initial;"><li>Selecione `Automático siempre que sea posible` para solicitar o reembolso automaticamente via PayU, processado pela operadora do cartão. Esta opção se aplica apenas a pagamentos com cartão.</li><li>Selecione `Manual a cargo del comercio` para realizar o reembolso manualmente por meio de métodos alternativos (por exemplo, dinheiro, crédito na loja ou trocas de produto).</li></ul><br> |
| Public Key | Chave API pública da **Unidade de Negócio**. |
| Idioma | Selecione o idioma para a emissão do pedido. Idiomas compatíveis:<br><ul style="margin-bottom: initial;"><li>Espanhol</li><li>Inglês</li><li>Português</li></ul> |
| Expiración pago (días) | Define o período de validade para pagamentos em dinheiro.<br>**Importante:** Este valor deve coincidir com o campo **Validade do pagaré** na seção [Configuração de métodos de pagamento em dinheiro]({{< ref "#configuring-cash-payment-methods" >}}). |

4. Clique em **Salvar** para concluir a configuração.

#### Configurando Capturas em um Fluxo de Duas Etapas

Esta seção explica como capturar pedidos autorizados no VTEX V2 usando um fluxo de pagamento em duas etapas (autorização seguida de captura). Inclui um guia passo a passo para capturar o valor total ou parcial de um pedido.

##### Pré-requisitos

Antes de capturar pedidos, certifique-se de que as seguintes configurações estejam corretas:

* **Configuração da Conta PayU:** Sua conta PayU deve estar habilitada para [processamento em duas etapas]({{< ref "payments.md#payment-flows" >}}). Para mais informações sobre como ativar esse fluxo de pagamento, entre em contato com seu representante de vendas da PayU.
* **Afiliação de Pagamento na VTEX (PayUv2):** A afiliação do provedor PayUv2 na VTEX deve estar configurada para o processamento em duas etapas, que envolve **autorização** seguida de **liquidação** (captura).
    * **Liquidação automática:** Definida como `Desativado`.
    * **Tipo de autorização:** Definido como `Pré-autorização`.

<p>

<img src="/assets/VTEX/vtex30.png" alt="PrintScreen" style="width: 500px;">

<p>

{{% alert title="Observação" color="info"%}}

Se você não pretende capturar valores menores ou maiores do que o valor originalmente autorizado, pode ativar a **Liquidação automática** para capturar o pedido imediatamente após a autorização ou agendar a captura definindo um intervalo de tempo em horas.

{{% /alert %}}

* **Condição de Pagamento:** Verifique se a condição de pagamento relevante está habilitada com a afiliação PayUv2.

<img src="/assets/VTEX/vtex31.png" alt="PrintScreen" style="width: 400px;">

##### Iniciando uma Captura

Quando um pedido tiver uma **autorização aprovada**, siga estes passos no seu painel da VTEX:

1.  **Acesse o Pedido:** Abra o painel administrativo da VTEX e selecione o pedido autorizado.
2.  **Atualize o Status do Pedido:**
    * Se o status do pedido estiver como "Janela de cancelamento", clique no botão "**Pronto para manuseio**" para atualizá-lo.
    * Em seguida, atualize o pedido usando a opção "**Iniciar manuseio**".

Após completar essas etapas, o status do pedido mudará para "**Em manuseio**", indicando que está pronto para ser capturado. Você poderá então capturar o valor total ou um valor modificado (menor ou maior).

##### Capturando o Valor Total

Para capturar o **valor total autorizado**:

1.  Selecione a opção **Nota fiscal** no pedido.

<img src="/assets/VTEX/vtex32.png" alt="PrintScreen" style="width: 650px;">

<br>

2.  Escolha **Enviar nota fiscal única**.
3.  Insira o **número da nota fiscal** na seção de detalhes.
4.  Clique em **Salvar nota fiscal**.

Ao concluir, o processo de liquidação será finalizado e o valor total autorizado do pedido será capturado.

##### Capturando um Valor Menor ou Maior

A VTEX oferece duas maneiras de capturar um valor diferente da autorização original:

**A) Alterando os Itens do Pedido**

Esse método permite ajustar os itens do pedido para refletir o valor desejado para captura.

1.  Acesse a seção **faturamento pendente** dentro do pedido.

<img src="/assets/VTEX/vtex33.png" alt="PrintScreen" style="width: 500px;">

<br>

2.  Selecione a opção **Alterar itens**.
3.  **Ajuste os Itens:**
    * Para capturar um **valor menor**, reduza a quantidade de itens existentes ou remova-os.
    * Para capturar um **valor maior**, aumente a quantidade de itens ou adicione novos.
4.  **Finalize a Captura:**
    * Após modificar os itens, selecione a opção **Nota fiscal** no pedido.
    * Escolha **Enviar nota fiscal única**.
    * Insira o **número da nota fiscal** nos detalhes.
    * Clique em **Salvar nota fiscal**.

Essa ação completará a liquidação e a integração capturará o valor modificado.

**B) Alterando o Valor Final do Pedido**

Esse método permite ajustar diretamente o valor total do pedido.

1.  Acesse o pedido e selecione a opção **Alterar valor final**.

<img src="/assets/VTEX/vtex34.png" alt="PrintScreen" style="width: 350px;">

<br>

2.  **Ajuste o Valor:**
    * Para capturar um **valor menor**, insira o valor que deseja descontar do total.
    * Para capturar um **valor maior**, insira o valor pelo qual deseja aumentar o pedido.
3.  **Finalize a Captura:**
    * Após modificar o valor, selecione a opção **Nota fiscal** no pedido.
    * Escolha **Enviar nota fiscal única**.
    * Insira o **número da nota fiscal** nos detalhes.
    * Clique em **Salvar nota fiscal**.

Isso concluirá a liquidação na VTEX.

##### Entendendo as Transações da PayU após a Captura

Veja como as transações aparecerão na PayU com base nas suas ações de captura:

* **Captura do Valor Total (Sem Ajuste):** Se você não ajustou o valor do pedido, verá duas transações na PayU: uma **autorização** e uma **captura** do valor total.
* **Captura de Valor Menor:** Se você ajustou o pedido para capturar um valor menor, verá duas transações na PayU: uma **autorização** e uma **captura parcial**.
* **Captura de Valor Maior:** Se o valor capturado for maior, verá quatro transações: a **autorização inicial** e sua **captura**, além de uma **autorização adicional** para o valor excedente e sua respectiva **captura**.

#### Configurando Métodos de Pagamento {#configuring-payment-methods}

Configure os métodos de pagamento que serão exibidos no site durante o checkout. [Veja os métodos de pagamento disponíveis]({{< ref "Select-your-payment-method.md" >}}).

{{% alert title="Importante" color="warning"%}}

* As alterações nas condições de pagamento podem levar até 10 minutos para serem refletidas no fluxo de checkout.
* O PIX não está disponível para o Brasil ao usar a VTEX.

{{% /alert %}}

##### Configurando Cartões de Crédito ou Débito {#configuring-credit-or-debit-cards}

Dependendo do seu [país de processamento]({{< ref "Select-your-payment-method.md" >}}), você pode configurar a afiliação criada para usar cartões de crédito ou débito<sup>*</sup>. Siga as etapas abaixo para adicionar esse método de pagamento à sua loja VTEX.

<sup>*</sup> _A disponibilidade de cartões de débito depende do seu país de processamento._

{{% alert title="Importante" color="warning"%}}

Clique [aqui](#configuring-co-branded-or-private-label-cards) para saber como configurar cartões Co-branded ou Private Label.

{{% /alert %}}

1. Faça login no painel de administração VTEX e vá para **Transações > Pagamentos > Configurações**. 

2. Selecione a guia **Condições de Pagamento** e clique no ícone de adição.

![PrintScreen](/assets/VTEX/vtex11pt.png)

3. Selecione o método de pagamento que deseja adicionar. Os métodos de pagamento são agrupados por tipo.<br>Para este exemplo, selecionamos **American Express** na seção de **Cartão de Crédito**.

![PrintScreen](/assets/VTEX/vtex12pt.png)

4. Forneça os seguintes detalhes:
* **Nome da Regra (para identificação rápida)**: Insira um nome descritivo para a condição de pagamento.
* **Status**: Defina o status da condição de pagamento. Você pode ter **apenas uma** condição de pagamento ativa por método de pagamento.
* **Processar com afiliação**: Selecione a afiliação do gateway configurada anteriormente.
* **Pagamento à vista ou parcelado?**: Selecione **À vista**.

![PrintScreen](/assets/VTEX/vtex13pt.png)

5. Clique em **Salvar**. A nova condição de pagamento agora será listada na guia **Condições de Pagamento**.

![PrintScreen](/assets/VTEX/vtex14pt.png)

##### Configurando Cartões Co-Branded ou Private Label {#configuring-co-branded-or-private-label-cards}

Os cartões co-branded e private label são cartões de crédito emitidos por uma loja ou marca, às vezes em parceria com redes como AMEX, VISA ou MasterCard. Siga estas etapas para adicionar esse método de pagamento à sua loja VTEX.

1. Faça login no painel de administração VTEX e vá para **Transações > Pagamentos > Configurações**.

2. Selecione a guia **Pagamentos customizados**.

![PrintScreen](/assets/VTEX/vtex15pt.png)

3. A guia **Pagamentos customizados** fornece cinco (5) espaços para configurar cartões co-branded e private label. Neste exemplo, configuramos o cartão colombiano Codensa, que é um cartão private label.<br>Clique em qualquer caixa disponível na seção **Cartões da Loja (Bandeira Própria)**.

![PrintScreen](/assets/VTEX/vtex16pt.png)

4. Insira os seguintes detalhes do cartão, mantendo o formato exato:

* **Nome**: `Codensa`.
* **Descrição**: `Codensa`
* **Intervalos de BIN**: `590712-590712`
* **Código de pagamento do adquirente**: `codensa`

{{% alert title="Nota" color="info"%}}

Para cartões _co-branded_, você também deve selecionar a bandeira do cartão.

{{% /alert %}}

<img src="/assets/VTEX/vtex17pt.png" alt="PrintScreen" width="700px"/><br>

Use a tabela abaixo para configurar cartões co-branded e private label. Você pode deixar os valores restantes com suas entradas padrão.

| País | Nome | Descrição | Intervalos de BIN | Código de pagamento do adquirente |
|:-:|---|---|---|---|
| <img src="/assets/Argentina.png" width="25px"/> | Argencard | Argencard | `501105-532362` | argencard |
| <img src="/assets/Argentina.png" width="25px"/> | Cabal | Cabal | `60423,60400,589657` | cabal |
| <img src="/assets/Argentina.png" width="25px"/> | Cencosud | Cencosud | `603493-603493` | cencosud |
| <img src="/assets/Argentina.png" width="25px"/> | Naranja | Naranja | `589562` | naranja |
| <img src="/assets/Argentina.png" width="25px"/> | Shopping | Shopping | `603488` | shopping |
| <img src="/assets/Colombia.png" width="25px"/> | Codensa | Codensa | `590712-590712` | codensa |

Para mais detalhes sobre a configuração de cartões [co-branded](https://help.vtex.com/en/tutorial/configurar-pagamentos-com-cartoes-de-loja-cobranded--jrkLK41IjuquUmyKUi86Q) e [private label](https://help.vtex.com/en/tutorial/configurar-pagamentos-com-cartoes-de-loja-bandeira-propria--428FgVdSGQUeAOoogkaIw4), visite o VTEX Help Center.

5. Clique em **Salvar**. Após criar o pagamento personalizado, você será redirecionado para a opção de criar uma **Condição de Pagamento**. Siga as instruções na seção [Configurando Cartões de Crédito ou Débito](#configuring-credit-or-debit-cards) para concluir esta etapa.

##### Configurando o Google Pay

O Google Pay é uma carteira digital que permite que os clientes realizem transações de forma rápida e segura utilizando os cartões salvos em suas contas do Google. Integrar o Google Pay à sua loja VTEX por meio da PayU ajuda a melhorar a experiência de compra, reduzir a fricção no checkout e aumentar as taxas de conversão.

{{% alert title="Nota" color="info"%}}

Quando os clientes pagam com Google Pay, a PayU processa a transação como um pagamento padrão com cartão de crédito ou débito, dependendo do tipo de cartão. Nenhuma taxa adicional será aplicada além das já acordadas.

{{% /alert %}}

**Pré-requisitos:**

* Verifique se o Google Pay está ativo na sua conta PayU. Se tiver dúvidas sobre este requisito, entre em contato com o seu executivo de contas da PayU ou envie um e-mail para [tecnico.co@payu.com](mailto:tecnico.co@payu.com), informando que você é um lojista VTEX solicitando a ativação do Google Pay.
* Os pagamentos com cartão devem estar habilitados na configuração da sua loja VTEX.
* A PayU deve estar configurada como o provedor de pagamento para as transações com cartão de crédito na sua loja VTEX.

**Passo a passo:**

1. Faça login no painel de administração VTEX e vá para **Configurações da Loja > Carteiras Digitais**.

2. Encontre a opção do Google Pay e ative a chave deslizante.

3. Quando solicitado, confirme a ativação clicando em **Ativar**.

<video width="640" height="480" controls>

<source src="/assets/VTEX/Videos/video02pt.mp4" >  

</video>

<p>

Após a ativação, o Google Pay estará disponível como uma opção de pagamento no checkout da sua loja. Pode levar até 10 minutos para o método aparecer.

Para mais informações e boas práticas, consulte o guia oficial da VTEX sobre como ativar carteiras digitais no <a href="https://help.vtex.com/en/tracks/digital-wallet-e-wallet" target="_blank">Centro de Ajuda da VTEX</a>.

##### Configurando Métodos de Pagamento em Dinheiro {#configuring-cash-payment-methods}

Como os pagamentos em dinheiro exigem que os clientes efetuem o pagamento em locais físicos, você pode configurar esse método de pagamento na VTEX como notas promissórias (_Notes Payables_). 

Ao configurar um método de pagamento em dinheiro, os clientes são redirecionados para o checkout da PayU, onde podem baixar o comprovante de pagamento e pagá-lo no local físico correspondente. Siga as instruções abaixo para adicionar esse método de pagamento à sua loja VTEX.

**Considerações:**

* Certifique-se de que todos os meios de pagamento que você pretende configurar estejam habilitados na sua conta PayU, e que **os nomes correspondam exatamente aos registrados na PayU**. Métodos inativos ou com nomes incorretos podem causar falhas nas transações. Se precisar de ajuda para habilitar meios de pagamento ou carteiras específicas, <a href="https://colombia.support.payu.com/s/?language=pt_BR" target="_blank" rel="noopener noreferrer">entre em contato conosco</a>.
* Para o **Boleto Bancário** no Brasil, este procedimento não é necessário. Basta localizar e configurar este meio de pagamento como uma condição de pagamento.  

**Passo a Passo:**

1. Faça login no painel de administração VTEX e vá para **Transações > Pagamentos > Configurações**.

2. Selecione a guia **Pagamentos customizados**.

![PrintScreen](/assets/VTEX/vtex15pt.png)

3. Nesta guia, há cinco (5) espaços disponíveis para configurar métodos de pagamento em dinheiro. Neste exemplo, configuraremos o OXXO, um método de pagamento em dinheiro do México.<br>Clique em qualquer caixa disponível na seção **Promissórias**.

![PrintScreen](/assets/VTEX/vtex18pt.png)

4. Forneça as seguintes informações:

* **Nome**: Use o valor listado [aqui]({{< ref "select-your-payment-method.html" >}}) na coluna `parâmetro paymentMethod`. Para este exemplo, insira `OXXO`.
   * **Descrição**: Insira uma descrição para exibição quando o cliente selecionar esse método de pagamento (opcional).
   * **Data de Expiração da Nota Promissória**: Especifique o número de dias antes do vencimento do pagamento em dinheiro. O padrão é 7 dias. Certifique-se de que esse valor corresponde à configuração **Expiração do Pagamento (dias)** configurada na afiliação da VTEX para evitar problemas de processamento.

Deixe os demais campos com seus valores padrão. 

5. Clique em **Salvar**. Depois que o pagamento personalizado for criado, você será redirecionado para configurar uma nova **Condição de Pagamento**. Siga as instruções na seção [Configurando Cartões de Crédito ou Débito](#configuring-credit-or-debit-cards).

##### Configuração do Nequi {#configuring-nequi}

Adicionar Nequi como método de pagamento permite que sua empresa alcance milhões de usuários que preferem carteiras digitais, oferecendo uma forma de pagamento mais rápida, segura e conveniente. Isso pode ajudar a aumentar as vendas, fortalecer a fidelidade dos clientes e garantir transações seguras.  

Antes de começar, certifique-se de que o Nequi esteja habilitado em sua conta PayU e que **o nome do método de pagamento corresponda exatamente ao registrado na PayU**. Qualquer divergência ou status inativo resultará em erros de transação. Se precisar de ajuda para habilitar o Nequi, por favor <a href="https://colombia.support.payu.com/s/?language=pt_BR" target="_blank" rel="noopener noreferrer">entre em contato conosco</a>.  

**Passo a passo:**

1. Acesse o painel de administração da VTEX e vá até **Transações > Pagamentos > Configurações**.  

2. Selecione a aba **Condições de Pagamento** e clique no ícone de **mais**.  

   ![PrintScreen](/assets/VTEX/vtex11pt.png)  

3. Procure por **NequiPayu** usando a barra de pesquisa e selecione-o para abrir a interface de configuração.  

   ![PrintScreen](/assets/VTEX/vtex35.png)

4. Na interface de configuração:
   - Defina **NEQUI** como o nome da condição
   - Escolha o provedor
   - Habilite o método de pagamento

![PrintScreen](/assets/VTEX/vtex36pt.png)  

5. Clique em **Salvar**. Confirme que o Nequi aparece na aba **Condições de Pagamento**.  

   ![PrintScreen](/assets/VTEX/vtex37pt.png)  

6. Uma vez configurado, o Nequi estará disponível como opção de pagamento no checkout da VTEX. Observe que pode levar até **10 minutos** para que a opção fique visível.

###### Testes em Sandbox

Para obter informações sobre como simular transações do Nequi no ambiente Sandbox, consulte a <a href="https://developers.payulatam.com/latam/pt/docs/integrations/api-integration/payments-api-colombia.html#sanbox-environment-testing" target="_blank" rel="noopener noreferrer">documentação da API de Pagamentos</a>.

##### Configuração do Yape {#configuring-yape}

Adicionar Yape como método de pagamento permite que sua empresa se conecte a milhões de usuários no Peru que preferem carteiras digitais. Com o Yape, os clientes podem pagar de forma fácil e segura usando apenas o número de telefone — ajudando você a aumentar as vendas, atrair novos clientes e garantir transações confiáveis respaldadas pelo BCP (Banco de Crédito do Perú).

**Considerações:**  

* Certifique-se de que o Yape esteja habilitado em sua conta PayU e que **o nome do método de pagamento corresponda exatamente ao registrado na PayU**. Qualquer divergência ou status inativo resultará em erros de transação. Se precisar de ajuda para habilitar o Yape, por favor <a href="https://colombia.support.payu.com/s/?language=pt_BR" target="_blank" rel="noopener noreferrer">entre em contato conosco</a>.  
* Verifique se sua loja VTEX foi criada com **VTEX IO** ou **FastStore**. Em seguida, instale o aplicativo **Pop-up for Online Payment with Yape** acessando a URL de configuração. Substitua `{vtexaccount}` na URL abaixo pelo nome da sua conta VTEX (isto é, o subdomínio que você usa para acessar o painel de administração da VTEX):
    `https://{vtexaccount}.myvtex.com/admin/apps/payulatam.yape-payment-app-payuv2@1.3.0/setup`
    <br>**Exemplo:**
    <br>Se sua conta VTEX for `payulatam`, a URL será:
    <br>`https://payulatam.myvtex.com/admin/apps/payulatam.yape-payment-app-payuv2@1.3.0/setup`

**Passo a passo:**  

1. Acesse o painel de administração da VTEX e vá até **Transações > Pagamentos > Configurações**.  

2. Selecione a aba **Condições de Pagamento** e clique no ícone de **mais**.  

   ![PrintScreen](/assets/VTEX/vtex11pt.png)  

3. Procure por **YapePayu** usando a barra de pesquisa e selecione-o para abrir a interface de configuração.  

   ![PrintScreen](/assets/VTEX/vtex38.png)  

4. Na interface de configuração:
   - Defina **YAPE** como o nome da condição
   - Escolha o provedor
   - Habilite o método de pagamento

![PrintScreen](/assets/VTEX/vtex39pt.png)  

5. Clique em **Salvar**. Confirme que o Yape aparece na aba **Condições de Pagamento**.  

   ![PrintScreen](/assets/VTEX/vtex40pt.png)  

6. Uma vez configurado, o Yape estará disponível como opção de pagamento no checkout da VTEX. Observe que pode levar até **10 minutos** para que a opção fique visível.  

###### Testes em Sandbox

Para obter informações sobre como simular transações do Yape no ambiente Sandbox, consulte a <a href="https://developers.payulatam.com/latam/pt/docs/integrations/api-integration/payments-api-peru.html#testando-no-ambiente-de-sandbox" target="_blank" rel="noopener noreferrer">documentação da API de Pagamentos</a>.

##### Configurando PSE {#configuring-pse}

**Pré-requisitos:**
* Este método de pagamento está disponível apenas para lojistas que processam pagamentos na Colômbia.
* Para oferecer PSE como método de pagamento, você deve instalar o **Aplicativo PSE desenvolvido pela VTEX**. Se ainda não o fez, acesse **Configurações da Conta > Aplicações > App Store** e procure por **Bancos para PSE**. <br>Se o aplicativo não estiver disponível na loja, você pode solicitar sua instalação à equipe da VTEX enviando um ticket para o [Suporte VTEX](https://help.vtex.com/en/support).
* Se você estiver utilizando uma integração VTEX Legacy, a VTEX precisará realizar uma configuração adicional antes que você possa configurar este método de pagamento. Entre em contato com seu representante VTEX ou solicite assistência via [Suporte VTEX](https://help.vtex.com/en/support).

{{% alert title="Nota" color="info"%}} 

Para mais informações, consulte os seguintes recursos da VTEX:
- [Informações gerais sobre PSE](https://help.vtex.com/en/announcements/pse-medio-de-pago-para-clientes-en-colombia--4T22CHOcEV3Nb2RtkJZOFB)
- [Configurando pagamentos com PSE na VTEX](https://help.vtex.com/en/tutorial/configurar-pago-con-pse--7dRChubn7TqdEyWrHQEQp6)
- [Aplicativo Bancos para PSE](https://apps.vtex.com/vtexlatam-banks-for-pse/p)  

{{% /alert %}}

**Passo a Passo:**

1. Faça login no painel de administração VTEX e vá para **Configurações da Loja > Pagamentos > Configurações > Condições de Pagamento**. Em seguida, siga estas etapas:

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.1</span> Clique no botão **+**.

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.2</span> Na categoria **Outros**, localize **PSE**.

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.3</span> Preencha os seguintes campos:

&nbsp;&nbsp;&nbsp; <span style="color: #A6C307; font-weight: bold;">•</span> **Nome da Regra**: Insira um nome descritivo para identificar este método de pagamento. <br>
&nbsp;&nbsp;&nbsp; <span style="color: #A6C307; font-weight: bold;">•</span> **Processar com Afiliação**: Selecione a afiliação do gateway configurada para processar pagamentos com PayUV2. <br>
&nbsp;&nbsp;&nbsp; <span style="color: #A6C307; font-weight: bold;">•</span> **Status**: Ative a condição de pagamento.

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.4</span> Clique em **Salvar** para aplicar as configurações.

   <video width="630" height="300" controls>
      <source src="/assets/VTEX/Videos/Video01.mp4" type="video/mp4">  
   </video>

<p>

2. Configure o aplicativo Bancos para PSE com suas credenciais da PayU seguindo estas etapas:

&nbsp; <span style="color: #A6C307; font-weight: bold;">2.1</span> Faça login no painel de administração da VTEX e vá para **Apps > Aplicativos Instalados > Banks for PSE**.

&nbsp; <span style="color: #A6C307; font-weight: bold;">2.2</span> Preencha o formulário e clique em **Salvar**.

| Campo | Descrição |
|---|---|
| **Conector Utilizado para Processar o PSE** | Selecione **PayUv2** na lista suspensa. |
| **Código da Aplicação** | Insira a chave privada da **Unidade de Negócios**. Esta informação está disponível no Painel de Controle PayU Enterprise, conforme explicado [aqui](https://developers.payulatam.com/latam/en/docs/tools/shopping-cart-plugins/vtex.html#configure-the-gateway-affiliation). <br> **Nota:** Este campo corresponde ao _Token de Aplicação_ da afiliação VTEX. |
| **Chave da Aplicação** | Insira o ID da **Aplicação da Unidade de Negócios**. Esta informação está disponível no Painel de Controle PayU Enterprise, conforme explicado [aqui](https://developers.payulatam.com/latam/en/docs/tools/shopping-cart-plugins/vtex.html#configure-the-gateway-affiliation). <br> **Nota:** Este campo corresponde à _Chave da Aplicação_ da afiliação VTEX. |

<img src="/assets/VTEX/vtex19.png" alt="PrintScreen" width="500px"/><br>

* Após concluir a configuração, você poderá processar transações em ambiente de produção com PSE.

{{% alert title="Importante" color="warning"%}}

Para testar o PSE em um ambiente sandbox, certifique-se de que sua afiliação VTEX está no modo de teste e que você possui uma configuração adicional específica para o PSE. Para mais orientações, entre em contato com sua agência de implementação ou com o [Suporte VTEX](https://help.vtex.com/en/support). 

{{% /alert %}}

## Testando a Integração {#testing-the-integration}

Depois de configurar as condições de pagamento para seus métodos de pagamento, é altamente recomendável testar sua integração antes de processar transações reais.

### Pré-requisitos para Testes Bem-sucedidos:

* Certifique-se de que sua conta PayU Enterprise está no modo `TEST`.
* Verifique se o **Seletor de Ambiente** em sua **Afiliação ao Gateway VTEX** está definido como `TEST`.
* Utilize as credenciais de teste apropriadas ao configurar a **Afiliação ao Gateway VTEX**. Você pode encontrar as credenciais de teste [aqui](https://developers.payulatam.com/latam/pt/docs/getting-started/test-your-solution.html).
* Após concluir seus testes, atualize a configuração com as informações de produção, incluindo sua conta PayU Enterprise, o seletor de ambiente na afiliação VTEX e as credenciais.

### Passos para Realizar uma Transação de Teste

1. Faça login no painel de administração VTEX e vá para **VISITAR LOJA** no menu superior.

   ![PrintScreen](/assets/VTEX/vtex20.png)

2. A loja configurada para sua conta VTEX será aberta. Selecione qualquer produto e prossiga com a compra.

   ![PrintScreen](/assets/VTEX/vtex21.png)

3. No carrinho de compras, clique no botão **Fechar Pedido**.

   ![PrintScreen](/assets/VTEX/vtex22.png)

4. Na seção de pagamento, os métodos de pagamento disponíveis aparecem agrupados por tipo. Selecione o método que deseja testar e insira os dados de teste. Você pode encontrar números de cartões de teste e informações relevantes [aqui]({{< ref "Test-your-solution.md#test-cards" >}}).  
   Por fim, clique em **Finalizar Compra**.

   ![PrintScreen](/assets/VTEX/vtex23.png)

### Verificando a Transação

Depois que a compra for aprovada, você pode verificar a transação nos seguintes locais:

* **Admin VTEX**: Navegue até **Pagamentos > Transações**.

   ![PrintScreen](/assets/VTEX/vtex24pt.png)

* **Painel PayU Enterprise**: Vá para **Pagamentos > Buscar**.

   ![PrintScreen](/assets/VTEX/vtex25pt.png)  
   
   {{% alert title="Nota" color="info"%}}

   O parâmetro **ID da Transação Externa** dentro da **Atividade da Transação** corresponde ao ID do Pedido na PayU.

   {{%/ alert %}}

* **Painel de Gestão PayU**: Verifique a transação no módulo [**Relatório de Vendas**]({{< ref "Sales-report.md" >}}).

   ![PrintScreen](/assets/VTEX/vtex26.png)

* **[API de Consultas]({{< ref "Queries.md" >}})**: Use o **ID da Transação Externa** como parâmetro `OrderID`.

## Testando Fluxos de Duas Etapas

Se sua **Afiliação ao Gateway** estiver configurada para processar transações usando um fluxo de duas etapas, os fundos autorizados no cartão de crédito não serão liquidados até que você solicite explicitamente a liquidação. Para concluir a liquidação, você deve faturar o pedido.

### Passos para Faturar um Pedido

1. Localize a transação no **Admin VTEX**, em **Pagamentos > Transações**, e clique nela.  
   Em seguida, clique no botão **Pedido** no canto superior direito.

   ![PrintScreen](/assets/VTEX/vtex27.png)

2. Role até a seção **Pacote** e clique em **Faturar Pacote**.

   ![PrintScreen](/assets/VTEX/vtex28.png)

3. Insira os detalhes da fatura e clique em **Enviar Fatura**.  
   Assim que a fatura for enviada ao cliente, o valor autorizado será cobrado do cartão do cliente.

   ![PrintScreen](/assets/VTEX/vtex29.png)

{{% alert title="Nota" color="info"%}}

Um pedido autorizado pode ser cancelado usando o botão **Cancelar Pedido** nos detalhes do pedido.  
Quando um pedido é cancelado, a PayU envia uma transação de _void_, que é registrada tanto no PayU Enterprise quanto na PayU Latam.

{{% /alert %}}
