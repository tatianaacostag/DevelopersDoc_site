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

* Uma conta ativa na PayU Latam.
* Uma conta ativa na PayU Enterprise (PaymentsOS). Se você não tem uma conta, clique <a href="https://control.paymentsos.com/signup" target="_blank">aqui</a> para criar uma. A conta deve estar configurada no modo de produção/ativo. Para mais detalhes sobre como ativá-la, consulte [Ativando sua conta PayU Enterprise](#activating-your-payu-enterprise-account-live-mode).
* Uma conta VTEX com direitos e permissões suficientes para acessar o painel administrativo da VTEX. Essa conta deve ter a autenticação de dois fatores ativada.

## Disponibilidade por País e Métodos de Pagamento {#availability-by-country-and-payment-methods}

A tabela abaixo mostra a disponibilidade da VTEX por país e os métodos de pagamento compatíveis:

| País | Cartões de Crédito | Pagamentos em Dinheiro | Outros Métodos |
|-|-|-|-|
| <img src="/assets/Argentina.png" width="20px"/> &nbsp;Argentina &nbsp; | Cartões de crédito | Pagamentos em dinheiro | - |
| <img src="/assets/Brasil.png" width="20px"/> &nbsp;Brasil | AMEX, MasterCard, Visa | Boleto Bancário | - |
| <img src="/assets/Colombia.png" width="20px"/> &nbsp;Colômbia &nbsp; | AMEX, Codensa, Diners, MasterCard, Visa | Efecty, Su Red, referência bancária | PSE |
| <img src="/assets/Chile.png" width="20px"/> &nbsp;Chile | Cartões de crédito | Pagamentos em dinheiro | - |
| <img src="/assets/Mexico.png" width="20px"/> &nbsp;México | Cartões de crédito | Pagamentos em dinheiro | SPEI |
| <img src="/assets/Peru.png" width="20px"/> &nbsp;Peru | AMEX, MasterCard, Visa | - | - |

## Ativando sua Conta PayU Enterprise (Modo Ativo) {#activating-your-payu-enterprise-account-live-mode}

Por padrão, as contas recém-criadas são configuradas no modo de teste. Para ativar sua conta para transações ao vivo, entre em contato com seu gerente de conta e solicite a ativação.

**Sua solicitação deve incluir as seguintes informações:**

* **Merchant ID:** Localize o Merchant ID da sua conta LATAM. Para mais detalhes sobre como encontrá-lo, consulte a <a href="https://developers.payulatam.com/latam/pt/payu-module-documentation/getting-started/understanding-the-payu-module/technical-configuration.html#merchant-and-account-ids" target="_blank">documentação do Painel de Gestão da PayU</a>.
* **Account ID:** Você pode encontrar seu Account ID no painel de controle da PayU Enterprise, conforme mostrado na imagem abaixo:
<br>

![PrintScreen](/assets/VTEX/vtex01pt.png)

## Configurando sua Conta PayU Enterprise {#configuring-your-payu-enterprise-account}

Para configurar os métodos de pagamento na VTEX para processamento através do nosso gateway, siga os passos abaixo. A configuração consiste em duas etapas. Antes de prosseguir, certifique-se de ter atendido aos pré-requisitos mencionados acima.

### 1. Configuração Inicial {#1-initial-setup}

A integração da PayU Latam com a VTEX é realizada por meio do PaymentsOS como middleware. O primeiro passo é configurar os seguintes componentes dentro da sua conta PayU Enterprise:

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

3. No Postman, clique em _**Importar**_ ao lado do nome do seu workspace e selecione o arquivo JSON baixado.

4. Clique em _**Importar**_ para finalizar o processo.

5. Execute os métodos da coleção na ordem exibida. Primeiro, selecione o método `POST` chamado `1. Login` e, em seguida, vá até a aba _**Body**_.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_01.png)

6. Insira seu **e-mail** e **senha** da sua conta PayU Enterprise e clique em _**Enviar**_. Se o login for bem-sucedido, os dados de autenticação serão definidos para o próximo método.

7. Clique no método `GET` `2. Retrieve PayU Latam ID`.

8. No canto superior direito, clique no ícone de olho para localizar o parâmetro `env`. Clique no ícone de lápis e defina-o como `test` para ambiente de teste ou `live` para produção.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_02.png)

9. Clique em _**Enviar**_ para continuar.

10. Em seguida, configure o provedor. Selecione o método `POST` `3. Create Provider Configuration` e vá até a aba _**Body**_.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_03.png)

Preencha os seguintes detalhes:

| Parâmetro | Descrição |
|---|---|
| name | Nome da _**Configuração do Provedor**_. |
| description | Descrição relevante (opcional). |
| configuration_data.apiLogin | Nome de usuário ou login fornecido pela PayU. [Como obter meu API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| configuration_data.apiKey | Chave única do seu comércio. [Como obter minha API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| configuration_data.accountId | ID da conta PayU para o país de destino. |
| configuration_data.merchantId | Merchant ID na PayU Latam. |
| configuration_data.paymentCountry | País de processamento no formato ISO 3166 Alpha-3. |
| configuration_data.partnerID | Identificador da PayU. Insira `ZOOZ_VTEX_V2`. |
| configuration_data.cashRedirect | Defina como `true` para garantir o fluxo adequado de pedidos com pagamentos em dinheiro na VTEX. |

{{% alert title="Nota" color="info"%}}

O parâmetro `provider_id` é atribuído automaticamente pela resposta do método `2. Retrieve PayU Latam ID`. Não modifique esse valor.

{{% /alert %}}  

11. Configure a Unidade de Negócios selecionando o método `POST` `4. Create Business Unit` e navegando até a aba _**Body**_. 

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_04.png)

Preencha os seguintes detalhes:

| Parâmetro | Descrição |
|---|---|
| id | Identificador da Unidade de Negócios (minúsculas, sem espaços). Esse valor não pode ser alterado posteriormente. |
| description | Descrição relevante (opcional). |

{{% alert title="Nota" color="info"%}}

O parâmetro `default_processor` é atribuído automaticamente pela resposta do método `3. Create Provider Configuration`. Não modifique esse valor.

{{% /alert %}}  
 
12. Crie o Webhook selecionando o método `POST` `5. Create Webhook` e navegando até a aba _**Body**_.

{{% alert title="Nota" color="info"%}}

O webhook funciona como a URL de confirmação que recebe notificações da VTEX quando uma transação muda de status.

{{% /alert %}}

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_05.png)

Defina o parâmetro `endpoint` com base no seu ambiente:
* Teste: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Produção: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

Mantenha todos os outros parâmetros com seus valores padrão.

Neste ponto, sua conta PayU Enterprise usando PaymentsOS está configurada. O próximo passo é [Configurar o Provedor VTEX]({{< ref "#2-configuring-the-vtex-provider" >}}).

#### Configurando a Conta Manualmente Usando o Painel PayU Enterprise {#configuring-the-account-manually-using-payu-enterprise-dashboard}

Siga estas etapas para configurar sua conta usando o painel PayU Enterprise.

1. **Criar a Configuração do Provedor**

<span style="color: #A6C307; font-weight: bold;">1.1</span> No painel PayU Enterprise, expanda o menu _**Configurações**_ e selecione _**Provedores**_.

![PrintScreen](/assets/VTEX/vtex02.png)

<span style="color: #A6C307; font-weight: bold;">1.2</span> Clique no módulo correspondente ao país ou divisão para o qual deseja configurar o provedor.

Preencha os seguintes campos para a _**Configuração do Provedor**_:

| Campo | Descrição |
|---|---|
| Nome da Configuração | Insira um nome para a _**Configuração do Provedor**_. |
| Descrição | Forneça uma descrição relevante (opcional). |
| apiLogin | O usuário ou login fornecido pela PayU. [Como obter meu API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| apiKey | A chave única do seu comércio. [Como obter minha API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| accountId | O ID da conta PayU baseado no país onde você opera. |
| merchantId | O ID do seu comércio na PayU Latam. |
| paymentCountry | O país de processamento no formato ISO 3166 Alpha-3. |
| cashRedirect | Selecione `true` para garantir o fluxo correto de pedidos com pagamentos em dinheiro na VTEX.<br> **Nota:** Essa configuração é essencial para comerciantes que processam pagamentos em dinheiro na VTEX. |

<span style="color: #A6C307; font-weight: bold;">1.3</span> Clique em _**Criar**_.

<img src="/assets/VTEX/vtex03.png" alt="PrintScreen" style="width: 450px; height: auto;">
<br>

2. **Criar a Unidade de Negócios**

<span style="color: #A6C307; font-weight: bold;">2.1</span> De volta ao painel, expanda o menu _**Configurações**_ e selecione _**Unidades de Negócios**_.

<img src="/assets/VTEX/vtex04.png" alt="PrintScreen" style="width: 400px; height: auto;">
<br>

<span style="color: #A6C307; font-weight: bold;">2.2</span> Clique em _**Criar Unidade de Negócios**_ e preencha os seguintes campos:
<br>

| Campo | Descrição |
|---|---|
| Nome da Unidade de Negócios | O nome da _**Unidade de Negócios**_. Deve estar em minúsculas e não conter espaços.<br> _Esse valor não pode ser alterado posteriormente, portanto, certifique-se de que está correto._ |
| Descrição | Forneça uma descrição relevante (opcional). |

<span style="color: #A6C307; font-weight: bold;">2.3</span> Na seção _**Escolher um Provedor Padrão para Esta Unidade de Negócios**_, selecione a _**Configuração do Provedor**_ criada na Etapa 1. Depois, clique em _**Criar**_.

<img src="/assets/VTEX/vtex05.png" alt="PrintScreen" style="width: 700px; height: auto;">
<br>

3. **Criar o Webhook**

{{% alert title="Nota" color="info"%}}

O webhook funciona como a URL de confirmação que recebe notificações da VTEX quando uma transação muda de status.

{{% /alert %}}

<span style="color: #A6C307; font-weight: bold;">3.1</span> De volta ao painel, expanda o menu _**Configurações**_ e selecione _**Webhooks**_.

<img src="/assets/VTEX/vtex06.png" alt="PrintScreen" style="width: 400px; height: auto;">
<br>

<span style="color: #A6C307; font-weight: bold;">3.2</span> Clique em _**Criar um Endpoint de Webhook**_ e insira a URL apropriada com base no seu ambiente:

* Teste: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Produção: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

<span style="color: #A6C307; font-weight: bold;">3.3</span> Na tabela _**Alertas de Eventos de Pagamento**_, ative o controle deslizante _**Atualizar**_ para _**Autorização**_ e _**Cobrança**_. Em seguida, no campo _**Unidades de Negócios Associadas**_, insira a _**Unidade de Negócios**_ criada na etapa anterior. Por fim, clique em _**Criar**_.

<img src="/assets/VTEX/vtex07.png" alt="PrintScreen" style="width: 600px; height: auto;">
<br>

Neste ponto, sua conta PayU Enterprise usando PaymentsOS está totalmente configurada. O próximo passo é [configurar o provedor VTEX]({{< ref "#2-configuring-the-vtex-provider" >}}).

### 2. Configurando o Provedor VTEX {#2-configuring-the-vtex-provider}

Depois de configurar sua conta PayU Enterprise, o próximo passo é configurar o provedor VTEX para cada método de pagamento. Para prosseguir, você deve ter uma conta de usuário válida para acessar o admin da VTEX.

#### Criando um Novo Provedor

{{% alert title="Nota" color="info"%}}

Antes de criar o novo provedor, certifique-se de ter configurado o fingerprint para a PayU. Para isso, consulte este [guia](https://help.vtex.com/en/tutorial/configurar-fingerprint-para-payu).

{{% /alert %}}

1. No painel esquerdo, selecione _**Configurações da Loja > Provedores > Novo Provedor**_:

![PrintScreen](/assets/VTEX/vtex08pt.png)

2. Localize _PayU_ e selecione _**PayUv2**_:

![PrintScreen](/assets/VTEX/vtex09pt.png)

{{% alert title="Importante" color="warning"%}}

Certifique-se de selecionar o conector _**PayUv2**_, pois este guia se aplica especificamente a essa versão.

{{% /alert %}}  

3. Na configuração do conector, instale-o clicando no botão _**Instalar aplicativo**_. Em seguida, preencha os seguintes campos:

![PrintScreen](/assets/VTEX/vtex10.png)

{{% alert title="Nota" color="info"%}}

As informações do conector podem ser obtidas por meio de:

* **Coleção do Postman:** Execute o método **Retrieve Authentication Keys**, configurando o parâmetro global `env` como `test` ou `live`, dependendo do ambiente de processamento.
* **Painel PayU Enterprise:** Navegue até _**Conta**_ > _**Unidades de Negócio**_ e selecione a Unidade de Negócio criada em [Configurando sua Conta PayU Enterprise]({{< ref "#configuring-your-payu-enterprise-account" >}}). Use o seletor no topo para escolher o ambiente de processamento.<br>Alguns valores estão ocultos por padrão; clique no ícone de olho para revelá-los.

{{% /alert %}} 

| Campo | Descrição |
|---|---|
| Nome da afiliação | Nome usado para identificar a _**afiliação do Gateway**_. |
| Seletor de ambiente | Selecione o ambiente para processar transações.<br>Certifique-se de que todos os parâmetros correspondam ao ambiente selecionado na PayU Enterprise. |
| Application Key | App ID da _**Unidade de Negócio**_. |
| Application Token | Chave privada da API da _**Unidade de Negócio**_. |
| Captura de pagamento | Escolha como liquidar (capturar) os pagamentos:<br><ul style="margin-bottom: initial;"><li>Para um fluxo de uma etapa, selecione `Captura automática imediatamente após a autorização do pagamento`.</li><li>Para um fluxo de duas etapas, selecione `Desativado: Não capturado automaticamente` para liquidar os pagamentos na fatura.</li><li>Para agendar a captura automática, selecione `Agendado: Agendar a captura automática` e defina um período de captura em horas.</li></ul><br>Para mais detalhes, consulte [Recurso de Captura Automática Personalizada](https://developers.vtex.com/vtex-rest-api/docs/custom-auto-capture-feature).<br>O período padrão de captura automática é de sete (7) dias após a aprovação. |
| Período agendado em horas para captura automática | Disponível quando `Agendado: Agendar a captura automática` estiver selecionado. Defina o período de captura automática (somente valores inteiros; não são permitidos decimais). |
| Tipo Autorizacion | Escolha entre fluxos de pagamento de uma etapa e duas etapas:<br><ul style="margin-bottom: initial;"><li>Para um fluxo de uma etapa, selecione `Autorización y Captura`.</li><li>Para um fluxo de duas etapas, selecione `Pre-Autorización`.</li></ul><br>Consulte [Fluxos de Pagamento]({{< ref "payments.md#payment-flows" >}}) para mais informações. |
| Public Key | Chave pública da API da _**Unidade de Negócio**_. |
| Idioma | Selecione o idioma para emissão de pedidos. Idiomas suportados:<br><ul style="margin-bottom: initial;"><li>Espanhol</li><li>Inglês</li><li>Português</li></ul> |
| Expiração do pagamento (dias) | Define o período de validade para pagamentos em dinheiro.<br>**Importante:** Esse valor deve corresponder ao campo _**Validade da nota promissória**_ na seção [Configurar métodos de pagamento em dinheiro]({{< ref "#configuring-cash-payment-methods" >}}). |
| Ativar divisão de pagamento e enviar destinatários do pagamento? | Selecione `Não`. |

4. Clique em _**Salvar**_ para concluir a configuração.

#### Configurando Métodos de Pagamento {#configuring-payment-methods}

Configure os métodos de pagamento que serão exibidos no site durante o checkout. [Veja os métodos de pagamento disponíveis]({{< ref "Select-your-payment-method.md" >}}).

{{% alert title="Importante" color="warning"%}}

* O PIX não está disponível para o Brasil ao usar a VTEX.
* As alterações nas condições de pagamento podem levar até 10 minutos para serem refletidas no fluxo de checkout.

{{% /alert %}}

##### Configurando Cartões de Crédito ou Débito {#configuring-credit-or-debit-cards}

Dependendo do seu [país de processamento]({{< ref "Select-your-payment-method.md" >}}), você pode configurar a afiliação criada para usar cartões de crédito ou débito<sup>*</sup>. Siga as etapas abaixo para adicionar esse método de pagamento à sua loja VTEX.

<sup>*</sup> _A disponibilidade de cartões de débito depende do seu país de processamento._

{{% alert title="Importante" color="warning"%}}

Clique [aqui](#configuring-co-branded-or-private-label-cards) para saber como configurar cartões Co-branded ou Private Label.

{{% /alert %}}

1. No painel esquerdo, selecione _**Transações**_ > _**Pagamentos**_ > _**Configurações**_. Selecione a guia _**Condições de Pagamento**_ e clique no ícone de adição.

![PrintScreen](/assets/VTEX/vtex11pt.png)

2. Selecione o método de pagamento que deseja adicionar. Os métodos de pagamento são agrupados por tipo.<br>Para este exemplo, selecionamos _**American Express**_ na seção de Cartão de Crédito.

![PrintScreen](/assets/VTEX/vtex12pt.png)

3. Forneça os seguintes detalhes:
* **Nome da Regra (para identificação rápida)**: Insira um nome descritivo para a condição de pagamento.
* **Status**: Defina o status da condição de pagamento. Você pode ter **apenas uma** condição de pagamento ativa por método de pagamento.
* **Processar com afiliação**: Selecione a afiliação do gateway configurada anteriormente.
* **Pagamento à vista ou parcelado?**: Selecione _**À vista**_.

![PrintScreen](/assets/VTEX/vtex13pt.png)

4. Clique em _**Salvar**_. A nova condição de pagamento agora será listada na guia _**Condições de Pagamento**_.

![PrintScreen](/assets/VTEX/vtex14pt.png)

##### Configurando Cartões Co-Branded ou Private Label {#configuring-co-branded-or-private-label-cards}

Os cartões co-branded e private label são cartões de crédito emitidos por uma loja ou marca, às vezes em parceria com redes como AMEX, VISA ou MasterCard. Siga estas etapas para adicionar esse método de pagamento à sua loja VTEX.

1. No painel esquerdo, selecione _**Transações**_ > _**Pagamentos**_ > _**Configurações**_. Selecione a guia _**Pagamentos customizados**_.

![PrintScreen](/assets/VTEX/vtex15pt.png)

2. A guia _Pagamentos customizados_ fornece cinco (5) espaços para configurar cartões co-branded e private label. Neste exemplo, configuramos o cartão colombiano Codensa, que é um cartão private label.<br>Clique em qualquer caixa disponível na seção _**Cartões da Loja (Bandeira Própria)**_.

![PrintScreen](/assets/VTEX/vtex16pt.png)

3. Insira os seguintes detalhes do cartão, mantendo o formato exato:

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

4. Clique em _**Salvar**_. Após criar o pagamento personalizado, você será redirecionado para a opção de criar uma _**Condição de Pagamento**_. Siga as instruções na seção [Configurando Cartões de Crédito ou Débito](#configuring-credit-or-debit-cards) para concluir esta etapa.

##### Configurando Métodos de Pagamento em Dinheiro {#configuring-cash-payment-methods}

Como os pagamentos em dinheiro exigem que os clientes efetuem o pagamento em locais físicos, você pode configurar esse método de pagamento na VTEX como notas promissórias (_Notes Payables_). 

{{% alert title="Nota" color="info"%}}

Para _Boleto Bancário_ no Brasil, este procedimento não é necessário. Basta localizar e configurar esse método de pagamento como uma condição de pagamento.

{{% /alert %}}

Ao configurar um método de pagamento em dinheiro, os clientes são redirecionados para o checkout da PayU, onde podem baixar o comprovante de pagamento e pagá-lo no local físico correspondente. Siga as instruções abaixo para adicionar esse método de pagamento à sua loja VTEX.

1. No painel esquerdo, selecione _**Transações**_ > _**Pagamentos**_ > _**Configurações**_. Selecione a guia _**Pagamentos customizados**_.

![PrintScreen](/assets/VTEX/vtex15pt.png)

2. Nesta guia, há cinco (5) espaços disponíveis para configurar métodos de pagamento em dinheiro. Neste exemplo, configuraremos o OXXO, um método de pagamento em dinheiro do México.<br>Clique em qualquer caixa disponível na seção _**Promissórias**_.

![PrintScreen](/assets/VTEX/vtex18pt.png)

3. Forneça as seguintes informações:

* **Nome**: Use o valor listado [aqui]({{< ref "select-your-payment-method.html" >}}) na coluna `parâmetro paymentMethod`. Para este exemplo, insira `OXXO`.
   * **Descrição**: Insira uma descrição para exibição quando o cliente selecionar esse método de pagamento (opcional).
   * **Data de Expiração da Nota Promissória**: Especifique o número de dias antes do vencimento do pagamento em dinheiro. O padrão é 7 dias. Certifique-se de que esse valor corresponde à configuração _**Expiração do Pagamento (dias)**_ configurada na afiliação da VTEX para evitar problemas de processamento.

Deixe os demais campos com seus valores padrão. 

4. Clique em _**Salvar**_. Depois que o pagamento personalizado for criado, você será redirecionado para configurar uma nova _**Condição de Pagamento**_. Siga as instruções na seção [Configurando Cartões de Crédito ou Débito](#configuring-credit-or-debit-cards).

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

1. Para configurar o PSE, acesse o painel de administração da VTEX e vá até **Configurações da Loja > Pagamentos > Configurações > Condições de Pagamento**. Em seguida, siga estas etapas:

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.1</span> Clique no botão _+_.

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.2</span> Na categoria _Outros_, localize _PSE_.

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.3</span> Preencha os seguintes campos:

&nbsp;&nbsp;&nbsp; <span style="color: #A6C307; font-weight: bold;">•</span> **Nome da Regra**: Insira um nome descritivo para identificar este método de pagamento. <br>
&nbsp;&nbsp;&nbsp; <span style="color: #A6C307; font-weight: bold;">•</span> **Processar com Afiliação**: Selecione a afiliação do gateway configurada para processar pagamentos com PayUV2. <br>
&nbsp;&nbsp;&nbsp; <span style="color: #A6C307; font-weight: bold;">•</span> **Status**: Ative a condição de pagamento.

&nbsp; <span style="color: #A6C307; font-weight: bold;">1.4</span> Clique em _**Salvar**_ para aplicar as configurações.

   <video width="630" height="300" controls>
      <source src="/assets/VTEX/Videos/Video01.mp4" type="video/mp4">  
   </video>

<p>

2. Configure o aplicativo Bancos para PSE com suas credenciais da PayU seguindo estas etapas:

&nbsp; <span style="color: #A6C307; font-weight: bold;">2.1</span> Faça login no painel de administração da VTEX e vá até **Apps > Aplicativos Instalados > Banks for PSE**.

&nbsp; <span style="color: #A6C307; font-weight: bold;">2.2</span> Preencha o formulário e clique em _**Salvar**_.

| Campo | Descrição |
|---|---|
| **Conector Utilizado para Processar o PSE** | Selecione _PayUv2_ na lista suspensa. |
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
* Verifique se o _**Seletor de Ambiente**_ em sua _**Afiliação ao Gateway VTEX**_ está definido como `TEST`.
* Utilize as credenciais de teste apropriadas ao configurar a _**Afiliação ao Gateway VTEX**_. Você pode encontrar as credenciais de teste [aqui](https://developers.payulatam.com/latam/pt/docs/getting-started/test-your-solution.html).
* Após concluir seus testes, atualize a configuração com as informações de produção, incluindo sua conta PayU Enterprise, o seletor de ambiente na afiliação VTEX e as credenciais.

### Passos para Realizar uma Transação de Teste

1. No painel administrativo da VTEX, clique em _**VISITAR LOJA**_ no menu superior.

   ![PrintScreen](/assets/VTEX/vtex20.png)

2. A loja configurada para sua conta VTEX será aberta. Selecione qualquer produto e prossiga com a compra.

   ![PrintScreen](/assets/VTEX/vtex21.png)

3. No carrinho de compras, clique no botão _**Fechar Pedido**_.

   ![PrintScreen](/assets/VTEX/vtex22.png)

4. Na seção de pagamento, os métodos de pagamento disponíveis aparecem agrupados por tipo. Selecione o método que deseja testar e insira os dados de teste. Você pode encontrar números de cartões de teste e informações relevantes [aqui]({{< ref "Test-your-solution.md#test-cards" >}}).  
   Por fim, clique em _**Finalizar Compra**_.

   ![PrintScreen](/assets/VTEX/vtex23.png)

### Verificando a Transação

Depois que a compra for aprovada, você pode verificar a transação nos seguintes locais:

* **Admin VTEX**: Navegue até _**Pagamentos**_ > _**Transações**_.

   ![PrintScreen](/assets/VTEX/vtex24pt.png)

* **Painel PayU Enterprise**: Vá para _**Pagamentos**_ > _**Buscar**_.

   ![PrintScreen](/assets/VTEX/vtex25pt.png)  
   
   {{% alert title="Nota" color="info"%}}

   O parâmetro _**ID da Transação Externa**_ dentro da _**Atividade da Transação**_ corresponde ao ID do Pedido na PayU.

   {{%/ alert %}}

* **Painel de Gestão PayU**: Verifique a transação no módulo [_**Relatório de Vendas**_]({{< ref "Sales-report.md" >}}).

   ![PrintScreen](/assets/VTEX/vtex26.png)

* **[API de Consultas]({{< ref "Queries.md" >}})**: Use o _**ID da Transação Externa**_ como parâmetro `OrderID`.

## Testando Fluxos de Duas Etapas

Se sua _**Afiliação ao Gateway**_ estiver configurada para processar transações usando um fluxo de duas etapas, os fundos autorizados no cartão de crédito não serão liquidados até que você solicite explicitamente a liquidação. Para concluir a liquidação, você deve faturar o pedido.

### Passos para Faturar um Pedido

1. Localize a transação no **Admin VTEX**, em _**Pagamentos**_ > _**Transações**_, e clique nela.  
   Em seguida, clique no botão _**Pedido**_ no canto superior direito.

   ![PrintScreen](/assets/VTEX/vtex27.png)

2. Role até a seção _**Pacote**_ e clique em _**Faturar Pacote**_.

   ![PrintScreen](/assets/VTEX/vtex28.png)

3. Insira os detalhes da fatura e clique em _**Enviar Fatura**_.  
   Assim que a fatura for enviada ao cliente, o valor autorizado será cobrado do cartão do cliente.

   ![PrintScreen](/assets/VTEX/vtex29.png)

{{% alert title="Nota" color="info"%}}

Um pedido autorizado pode ser cancelado usando o botão _**Cancelar Pedido**_ nos detalhes do pedido.  
Quando um pedido é cancelado, a PayU envia uma transação de _estorno_, que é registrada tanto no Hub quanto na PayU Latam.

{{% /alert %}}
