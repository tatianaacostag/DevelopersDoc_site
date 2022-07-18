---
title: "VTEX"
linkTitle: "VTEX"
date: 2021-05-25T10:30:35-05:00
description:
  Este artigo mostra o procedimento para habilitar o PayU em seu site VTEX.
weight: 5
tags: ["subtopic"]
---

A VTEX é uma plataforma de comércio digital que permite criar rapidamente uma loja online com recursos prontos para uso. Para obter mais informações, consulte o [site oficial da VTEX](https://vtex.com/).

## Pré-requisitos {#prerequisites}
* Você precisa de uma conta PayU Latam ativa.
* Você precisa de uma conta ativa do PaymentsOS. Se você não tiver uma conta, clique [aqui](https://control.paymentsos.com/signup) para criar uma.<br>Todos os comerciantes que precisam integrar PayU com VTEX **devem** ter um PaymentsOS conta.
* Você precisa de uma conta com permissões suficientes para acessar o VTEX admin. Esta conta deve ter a autenticação de dois fatores habilitada.

## Procedimento de configuração {#configuration-procedure}
O procedimento para habilitar os meios de pagamento que processamos em nossa plataforma na VTEX é dividido em duas etapas. Antes de continuar, certifique-se de atender aos pré-requisitos acima.

### 1. Configure sua conta do PaymentsOS {#1-configure-your-paymentsos-account}
A integração da PayU Latam com a VTEX é feita utilizando PaymentsOS como middleware. Como primeiro passo, você precisa configurar os seguintes objetos em sua conta do PaymentsOS.

* Uma configuração de provedor.
* Uma Unidade de Negócios.
* Um WebHook.

Você pode configurar esses objetos usando uma das seguintes opções:
* [Configurar conta usando o Postman]({{< ref "#configure-the-account-using-postman" >}}).
* [Configure a conta manualmente usando o Painel de controle do PaymentsOS]({{< ref "#configure-the-account-manually-using-paymentsos-dashboard" >}}).

#### Configurar conta usando o Postman {#configure-the-account-using-postman}
Siga estas etapas para configurar sua conta usando o Postman.

1. Clique no botão abaixo para importar nossa coleção para o Postman (pode ser necessário atualizar a página se o botão não funcionar).

{{< postman/postman_vtex >}}
<br>

2. Depois de executar a coleção, você precisa definir os globais. Baixe o arquivo global <a href="/assets/globals/VTEX Hub.postman_globals.json" download>aqui</a>.

3. Na coleção Postman, clique em _**Import**_ ao lado do nome da área de trabalho e localize o arquivo json baixado anteriormente.

4. Ao terminar, clique em _**Import**_.

5. É obrigatório executar os métodos de coleta na ordem apresentada. Primeiro, clique no método `POST` chamado `1. Login` e abra a guia _**Body**_.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_01.png)

6. Digite o e-mail (_**email**_) e a senha (_**password**_) da sua conta do PaymentsOS. Em seguida, clique em _**Send**_.

7. Se o login for bem-sucedido, os dados de autenticação são atribuídos no segundo método.<br>Clique no método `GET` chamado `2. Retrieve PayU Latam ID`.

8. No canto superior direito, clique no ícone de olho e localize o parâmetro `env`. Em seguida, clique no ícone de lápis e digite `test` se estiver processando no ambiente de teste, ou `live` caso contrário.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_02.png)

9. Uma vez configurado, clique em _**Send**_.

10. Clique no método `POST` chamado `3. Create Provider Configuration`, este método cria o _**Configuração de Provedor**_ no PaymentsOS. Em seguida, vá para a guia _**Body**_. 

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_03.png)

Insira as seguintes informações:

| Parâmetro | Descrição |
|---|---|
| name | Insira um nome para a _**Configuração do Provedor**_. |
| description | Insira uma descrição significativa para a _**Configuração de Provedor**_.<br>Este valor é opcional. |
| apiLogin | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| apiKey| Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| configuration_data.accountId | ID da conta PayU de acordo com o país em que você vai vender. |
| configuration_data.merchantId | ID do seu negócio na PayU Latam. |
| configuration_data.paymentCountry | País de processamento no formato ISO 3166 Alpha-3. |

{{% alert title="Observação" color="info"%}}
O parâmetro `provider_id` é preenchido automaticamente pela resposta do método `2. Retrieve PayU Latam ID`. Não mude esse valor.
{{% /alert %}}  

11. Clique no método `POST` chamado `4. Create Business Unit`, este método cria a _**Unidade de Negócios**_ no PaymentsOS. Em seguida, vá para a guia _**Body**_. 

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_04.png)

Insira as seguintes informações:

| Parâmetro | Descrição |
|---|---|
| id | Identificador da _**Unidade de Negócios**_. Este id deve estar em letras minúsculas e sem espaços.<br>_Certifique-se de ter inserido o valor correto para o id, pois este valor não pode ser atualizado posteriormente_. |
| description | Insira uma descrição significativa para a _**Unidade de Negócios**_.<br>Esse valor é opcional. |

{{% alert title="Observação" color="info"%}}
O parâmetro `default_processor`  preenchido automaticamente pela resposta do método `3. Create Provider Configuration`. Não mude esse valor.
{{% /alert %}}
 
12. Clique no método `POST` chamado `5. Create Webhook`, este método cria o _**WebHook**_ no PaymentsOS. Este WebHook é a URL de confirmação que receberá as notificações enviadas pela VTEX quando uma transação mudar de estado.<br>A seguir, vá para a guia _**Body**_.

![PrintScreen](/assets/VTEX/Postman/VTEX_Postman_05.png)

Defina o parâmetro `endpoint` com os seguintes valores de acordo com seu ambiente.
* Teste: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Produção: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

Deixe os outros valores com seu valor padrão.

Neste ponto, você configurou sua conta do PaymentsOS como middleware, o próximo passo é a [configuração do provedor VTEX]({{< ref "#2-configure-the-vtex-provider" >}}).

#### Configure a conta manualmente usando o Painel de controle do PaymentsOS {#configure-the-account-manually-using-paymentsos-dashboard}
Siga estas etapas para configurar sua conta usando o painel de controle do PaymentsOS.

1. Crie a Configuração de Provedor.<br>
No painel de controle do PaymentsOS, expanda o menu _**Configuração**_ e selecione _**Provedores de Pagamento**_.

![PrintScreen](/assets/VTEX/VTEX_01_pt.png)

Use o campo _**Buscar**_ na seção _**Criar uma nova configuração de Provedor**_ e digite _PayU_ para encontrar o provedor _PayU Latam_.

![PrintScreen](/assets/VTEX/VTEX_02_pt.png)

Insira as seguintes informações para a _**Configuração de Provedor**_:

| Parâmetro | Descrição |
|---|---|
| Configurar Nome | Insira um nome para a _**Configuração do Provedor**_. |
| Descrição | Insira uma descrição significativa para a _**Configuração de Provedor**_.<br>Este valor é opcional. |
| apiLogin | Usuário ou login fornecido pelo PayU. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| apiKey| Senha fornecida pelo PayU. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| accountId | ID da conta PayU de acordo com o país em que você vai vender. |
| merchantId | ID do seu negócio na PayU Latam. |
| paymentCountry | País de processamento no formato ISO 3166 Alpha-3. |

Quando terminar, clique em _**Salvar**_.

![PrintScreen](/assets/VTEX/VTEX_03_pt.png)

2. Crie a Unidade de Negócios.<br>
No painel do PaymentsOS, expanda o menu _**Configuração**_ e selecione _**Unidades de Negócios**_.

![PrintScreen](/assets/VTEX/VTEX_04_pt.png)

Clique no botão _**Criar uma Unidade de Negócios**_ e insira as seguintes informações:

| Parâmetro | Descrição |
|---|---|
| Nome da Unidade de Negócios | Nome da _**Unidade de Negócios**_. Este id deve estar em letras minúsculas e sem espaços.<br>_Certifique-se de ter inserido o valor correto para o id, pois este valor não pode ser atualizado posteriormente_. |
| Descrição | Insira uma descrição significativa para a _**Unidade de Negócios**_.<br>Esse valor é opcional. |  

Na seção _**Escolha um Provedor padrão para esta Unidade de Negócios**_, escolha a _**Configuração do Provedor**_ criada na etapa anterior.<br>Ao terminar, clique em _**Salvar**_.

![PrintScreen](/assets/VTEX/VTEX_05_pt.png)

3. Crie o webhook. Este WebHook é a URL de confirmação que receberá as notificações enviadas pela VTEX quando uma transação mudar de status.<br>

De volta ao painel do PaymentsOS, expanda o menu _**Configuração**_ e selecione _**Webhooks**_.

![PrintScreen](/assets/VTEX/VTEX_06_pt.png)

Clique no botão _**Criar Endpoint para Webhook**_ e insira a URL de acordo com seu ambiente:
* Teste: ```https://sandbox.api.payulatam.com/vtex-payments-integration/paymentsos/webhook```
* Produção: ```https://api.payulatam.com/vtex-payments-integration/paymentsos/webhook```

Na tabela _**Payment Events Alert**_, acione o evento _**Update**_ para _**Authorization**_ e _**Charge**_. Além disso, selecione no combo _**Unidades de Negócios Associadas**_ a _**Unidade de Negócios**_ criada na etapa anterior.<br>Ao terminar, clique em _**Criar**_.

![PrintScreen](/assets/VTEX/VTEX_07_pt.png)

Neste ponto, você configurou sua conta do PaymentsOS como middleware, o próximo passo é a [Configuração do provedor VTEX]({{< ref "#2-configure-the-vtex-provider" >}}).

### 2. Configuração do provedor VTEX {#2-configure-the-vtex-provider}
Depois de configurar sua conta PaymentsOS, o próximo passo é a configuração do provedor VTEX para cada forma de pagamento. Para esta etapa, é obrigatório que você tenha um usuário válido para acessar o VTEX admin.

#### Configurar la afiliación de Gateway {#configure-the-gateway-affiliation}
Antes de configurar a _**Afiliação de Gateway**_, certifique-se de ter configurado o FingerPrint para PayU. Para isso, veja este [artigo](https://help.vtex.com/pt/tutorial/configure-fingerprint-for-payu).

1. No VTEX admin, expanda o menu _**Pagamentos**_ dentro do grupo _**Transações**_. Em seguida, selecione _**Configurações**_.

![PrintScreen](/assets/VTEX/VTEX_08_pt.png)

2. Antes de prosseguir com as Condições de pagamento, você deve criar uma afiliação ao nosso gateway. No painel superior, clique em _**Afiliações de Gateways**_.

![PrintScreen](/assets/VTEX/VTEX_09_pt.png)

3. Clique no ícone de adição. Desça até a seção _**OUTROS**_ e localize o conector _**PayUv2**_.

![PrintScreen](/assets/VTEX/VTEX_10_pt.png)

{{% alert title="Importante" color="warning"%}}
Certifique-se de selecionar o conector _**PayUv2**_, o procedimento explicado neste guia se aplica especificamente a este conector.
{{% /alert %}}  

4. Nas configurações do conector, você precisa instalá-lo clicando no botão _**Instalar app**_. Em seguida, insira as seguintes informações.

![PrintScreen](/assets/VTEX/VTEX_11_pt.png)

{{% alert title="Observação" color="info"%}}
As informações do conector podem ser obtidas através do seguinte:
* Usando a coleção Postman.<br>Execute o método **Retrieve Authentication Keys** configurando o parâmetro global `env` para `test` ou `live` de acordo com seu ambiente de processamento.
* Usando o Painel de Controle do PaymentsOS.<br>Vá para _**Configuração**_ > _**Unidades de Negócios**_ ye selecione a unidade de negócios que você criou na etapa [acima]({{< ref "#1-configure-your-paymentsos-account" >}}). Lembre-se que você deve usar o seletor na parte superior para escolher o ambiente de renderização.<br>Alguns valores estão ocultos por padrão, clique no ícone de olho para mostrá-los.
{{% /alert %}} 

| Campo | Descrição |
|---|---|
| Nome da afiliação | Nome que você deseja atribuir para identificar a _**Afiliação de Gateway**_. |
| Seletor de Ambiente | Selecione o ambiente onde deseja criar as transações.<br>De acordo com a seleção que fizer aqui, você deve inserir outros parâmetros selecionando o mesmo ambiente no PaymentsOS. |
| Application Key | ID do aplicativo da _**Unidade de Negócios**_. |
| Application Token | Chave de API privada da _**Unidade de Negócios**_. |
| Captura automática de pagamento | Selecione como deseja fazer a captura (pagamento) em sua afiliação.<br><ul style="margin-bottom: initial;"><li>Para fluxos de uma etapa, selecione `Inmediatamente: captura automática al autorizar el pago`.</li><li>Para fluxos de duas etapas, selecione `Desactivado: no capturado automáticamente` para executar a captura assim que você faturar o pedido.</li><li>Selecione `Agendada: Defina quando a captura automática será realizada` para definir um tempo em horas para capturar automaticamente o pedido.</li></ul><br>Para obter mais informações, consulte [Recurso de captura automática personalizada](https://developers.vtex.com/vtex-rest-api/docs/custom-auto-capture-feature) na documentação do desenvolvedor.<br>O valor padrão de esta opção é de sete (7) dias após a aprovação. |
| Prazo agendado em horas para a captura automática | Este campo aparece quando você seleciona `Agendada: Defina quando a captura automática será realizada` como forma de captura de pagamento; selecione o período programado que deseja configurar de acordo com suas configurações. Este valor deve ser um número inteiro, portanto, decimais não são permitidos.|
| Tipo Autorizacion | Selecione se suas transações de pagamento são executadas em fluxos de uma ou duas etapas.<br><ul style="margin-bottom: initial;"><li>Para fluxos de uma etapa, selecione `Autorizacion y Captura`.</li><li>Para fluxos de duas etapas, selecione `Pre-Autorizacion`.</li></ul><br>Consulte o seguinte [link]({{< ref "payments.md#payment-flows" >}}) para saber mais sobre fluxos de pagamento. |
| Public Key | Chave de API pública da _**Unidade de negócios**_. |
| Ativar split e enviar recebedores? | Selecione `Não` neste campo. |

Quando terminar, clique em _**Salvar**_.

#### Configurar métodos de pagamento {#configure-payment-methods}
Defina os métodos de pagamento a serem exibidos no site para pagamento. [Veja nossos métodos de pagamento disponíveis]({{< ref "Select-your-payment-method.md" >}}).

{{% alert title="Importante" color="warning"%}}
* PSE (método colombiano de transferência bancária) não é suportado nesta versão do conector. Se você precisar configurar este método de pagamento, consulte o [Procedimento para instalar o conector versão 1](https://help.vtex.com/pt/tutorial/setting-up-payu-gateway--36zWOAFHmwIAoWIEU2Y08q).
* PIX não está disponível no Brasil usando VTEX.
* As alterações nas condições de pagamento podem levar até 10 minutos para serem aplicadas ao fluxo de pagamento.
{{% /alert %}}

##### Configurar cartões de débito ou crédito {#configure-credit-or-debit-cards}
De acordo com seu [país de processamento]({{< ref "Select-your-payment-method.md" >}}), você pode configurar a afiliação que criou para usar cartões de crédito ou débito<sup>*</sup> . Siga estas instruções para adicionar esta forma de pagamento à sua loja VTEX.

<sup>*</sup> _O uso de cartões de débito depende do seu país de processamento._

{{% alert title="Importante" color="warning"%}}
Clique [aqui](#configure-co-branded-or-private-labels-cards) se quiser saber como configurar cartões co-branded ou bandeira própria 
{{% /alert %}}

1. Na opção Configuração (_**Transações**_ > _**Pagamentos**_ > _**Configurações**_), selecione a guia _**Condições de pagamento**_ e clique no ícone de adição.

![PrintScreen](/assets/VTEX/VTEX_12_pt.png)

2. Selecione o método de pagamento que deseja incluir. Os métodos de pagamento são agrupados por tipo.<br>Para nosso exemplo, selecionamos _**American Express**_ na seção Cartão de crédito.

![PrintScreen](/assets/VTEX/VTEX_13_pt.png)

3. Insira as seguintes informações.
* **Nome da Regra (para fácil identificação)**: insira um nome significativo para a condição de pagamento ao lado do método de pagamento selecionada.
* **Status**: selecione o status da condição de pagamento. Você só pode ter **uma** condição de pagamento ativa por método de pagamento.
* **Processar com a afiliação**: selecione a afiliação do gateway configurada anteriormente.
* **À vista ou parcelado?**: selecione _**À vista**_<sup>\*</sup>.

<sup>\*</sup>_O processamento de parcelas não é suportado_.

![PrintScreen](/assets/VTEX/VTEX_14_pt.png)

4. Clique em _**Salvar**_. Quando você cria a condição de pagamento, ela é listada na guia _**Condições de pagamento**_.

![PrintScreen](/assets/VTEX/VTEX_15_pt.png)

##### Configurar cartões co-branded ou bandeira própria {#configure-co-branded-or-private-labels-cards}  
Os cartões co-branded ou bandeira própria são cartões emitidos por uma loja ou marca em associação com uma rede como AMEX, VISA, MasterCard, etc. Siga estas instruções para adicionar esta forma de pagamento à sua loja VTEX.

1. Na opção Configuração (_**Transações**_ > _**Pagamentos**_ > _**Configurações**_), selecione a guia _**Pagamentos customizados**_.

![PrintScreen](/assets/VTEX/VTEX_26_pt.png)

2. Nesta guia, você tem cinco (5) slots disponíveis para configurar cartões co-branded e bandeira própria. Neste exemplo, vamos configurar o cartão Colombian Codensa que é um cartão bandeira própria.<br>Clique em qualquer uma das caixas disponíveis na seção _**CCartões da Loja (Bandeira Própria)**_.

![PrintScreen](/assets/VTEX/VTEX_27_pt.png)

3. Insira as seguintes informações usando as letras maiúsculas e minúsculas mostradas.

* **Nome**: `Codensa`.
* **Descrição**: `Codensa`
* **Faixas de Bin**: `590712-590712`
* **Código de pagamento do adquirente**: `codensa`

{{% alert title="Observação" color="info"%}}
Para cartões _co-branded_, você deve selecionar a marca do mesmo.
{{% /alert %}}

<img src="/assets/VTEX/VTEX_28_pt.png" alt="PrintScreen" width="60%"/><br>

Os valores restantes podem ser deixados como padrão. Use os seguintes valores para configurar cartões de marca compartilhada e de marca privada.

| País | Nome | Descrição | Faixas de Bin | Código de pagamento do adquirente |
|:-:|---|---|---|---|
| <img src="/assets/Argentina.png" width="25px"/> | Argencard | Argencard | `501105-532362` | argencard |
| <img src="/assets/Argentina.png" width="25px"/> | Cabal | Cabal | `60423,60400,589657` | cabal |
| <img src="/assets/Argentina.png" width="25px"/> | Cencosud | Cencosud | `603493-603493` | cencosud |
| <img src="/assets/Argentina.png" width="25px"/> | Naranja | Naranja | `589562` | naranja |
| <img src="/assets/Argentina.png" width="25px"/> | Shopping | Shopping | `603488` | shopping |
| <img src="/assets/Colombia.png" width="25px"/> | Codensa | Codensa | `590712-590712` | codensa |

Para mais informações sobre como configurar [co-branded](https://help.vtex.com/pt/tutorial/configurar-pagamentos-com-cartoes-de-loja-cobranded--jrkLK41IjuquUmyKUi86Q) e [bandeira própria](https://help.vtex.com/pt/tutorial/configurar-pagamentos-com-cartoes-de-loja-bandeira-propria--428FgVdSGQUeAOoogkaIw4), consulte a central de ajuda da VTEX.

4. Clique em _**Salvar**_. Assim que o pagamento customizado for criado, você será redirecionado para a opção de criar um novo _**Condições de pagamento**_. Esta condição de pagamento é criada conforme explicado na seção [Configurar cartões de crédito ou débito](#configure-credit-or-debit-cards).

##### Configurar métodos de pagamento em dinheiro {#configure-cash-payment-methods}
Como as formas de pagamento à vista exigem que o cliente pague em escritórios físicos, você pode configurar essa forma de pagamento na VTEX como Notas Promissórias.

{{% alert title="Observação" color="info"%}}
Este procedimento não é obrigatório para _Boleto Bancário_ no Brasil, basta configurar esta forma de pagamento como condição de pagamento.
{{% /alert %}}

Ao configurar uma forma de pagamento em dinheiro, seus clientes são redirecionados para o checkout PayU para baixar o comprovante de pagamento e pagar no respectivo escritório físico. Siga as instruções abaixo para adicionar esta forma de pagamento à sua loja VTEX.

1. Na opção Configuração (_**Transações**_ > _**Pagamentos**_ > _**Configurações**_), selecione a guia _**Pagamentos customizados**_.

![PrintScreen](/assets/VTEX/VTEX_26_pt.png)

2. Nesta guia, você tem cinco (5) slots disponíveis para configurar pagamentos em dinheiro. Neste exemplo, vamos configurar o `OXXO`, um método mexicano de pagamento em dinheiro.<br>Clique em qualquer uma das caixas disponíveis na seção _**Promissórias**_.

![PrintScreen](/assets/VTEX/VTEX_29_pt.png)

3. Insira as seguintes informações para o método de pagamento em dinheiro.

* **Nome**: neste parâmetro, você precisa usar o valor mostrado [aqui]({{< ref "select-your-payment-method.html" >}}) na coluna `Parâmetro paymentMethod`. Para este exemplo, definimos `OXXO`.
* **Descrição**: Insira a descrição que deseja exibir quando o cliente selecionar esta forma de pagamento. Este parâmetro é opcional.
* **Validade da promissória**: Informe o número de dias antes do vencimento do pagamento em dinheiro. Por padrão, esse valor é atribuído a sete dias.

Você deixa os outros parâmetros com seus valores padrão

4. Clique em _**Salvar**_. Assim que o pagamento customizado for criado, você será redirecionado para a opção de criar um novo _**Condições de pagamento**_. Esta condição de pagamento é criada conforme explicado na seção [Configurar cartões de crédito ou débito](#configure-credit-or-debit-cards).

## Teste a integração {#testing-the-integration}
Depois de configurar as Condições de pagamento para seus métodos de pagamento, é recomendável testar a integração antes de começar a receber transações reais. Como pré-requisito, verifique se sua conta do PaymentsOS está no modo `TESTE`, bem como o _**Seletor de ambiente**_ em sua _**Afiliação do Gateway**_.

1. No VTEX admin, clique em _**VISIT A LOJA**_ no painel superior.

![PrintScreen](/assets/VTEX/VTEX_16_es.png)

2. A loja configurada para sua conta VTEX é aberta. Selecione qualquer produto e clique em comprar.

![PrintScreen](/assets/VTEX/VTEX_17.png)

3. No carrinho de compras, clique no botão fechar pedido.  

![PrintScreen](/assets/VTEX/VTEX_18.png)

4. Na seção de pagamento, aparecem os meios de pagamento agrupados por tipo. Selecione aquele que você deseja testar e insira os dados do teste. Encontre [aqui]({{< ref "Test-your-solution.md#test-cards" >}}) alguns números de cartões de teste e informações para testar os status. <br>Finalmente, clique em Finalizar .

![PrintScreen](/assets/VTEX/VTEX_19.png)

Assim que a compra for aprovada, você poderá verificá-la em:
* VTEX admin: _**Pagamentos**_ > _**Transações**_.

![PrintScreen](/assets/VTEX/VTEX_20_pt.png)

* Painel de controle de PaymentsOS: _**Pagamentos**_ > _**Buscar**_.<br><br>![PrintScreen](/assets/VTEX/VTEX_21_pt.png)<br>O parâmetro _**ID de Transação Externa**_ dentro de _**Atividade de Transação**_ é o OrderID da PayU.

* Módulo PayU: no [_**Relatório de Vendas**_]({{< ref "Sales-report.md" >}}).

![PrintScreen](/assets/VTEX/VTEX_22.png)

* [Query API]({{< ref "Queries.md" >}}) usando o parâmetro _**ID de Transação Externa**_ como OrderID.

### Probar flujos de dos pasos {#testing-two-step-flows} 
Quando você configura sua _**Afiliação do Gatewa**_ para processar transações em fluxos de duas etapas, os fundos autorizados do cartão de crédito não são capturados até que você solicite explicitamente a captura. Para solicitar a captura, você precisa faturar o pedido.

Para faturar um pedido, localize a transação no VTEX Admin (_**Pagamentos**_ > _**Transações**_) e clique sobre ela. Em seguida, clique no botão _**Pedido**_ no canto superior direito.

![PrintScreen](/assets/VTEX/VTEX_23_pt.png)

Role para baixo até a seção Pacote e clique em _**Faturar pacote**_.

![PrintScreen](/assets/VTEX/VTEX_24_pt.png)

Forneça as informações da sua fatura e clique em _**Enviar Nota**_ na parte inferior do painel. Após o envio da fatura ao cliente, o valor autorizado é debitado no cartão do cliente.

![PrintScreen](/assets/VTEX/VTEX_25_pt.png)

{{% alert title="Observação" color="info"%}}
Um pedido autorizado pode ser cancelado usando o botão _**Cancelar pedido**_ nas Informações do pedido. Ao cancelá-lo, a PayU envia uma transação _void_ que é registrada tanto no Hub quanto na PayU Latam.  
{{% /alert %}}