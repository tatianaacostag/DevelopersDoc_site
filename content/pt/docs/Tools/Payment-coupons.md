---
title: "Cupons de pagamento"
linkTitle: "Cupons de pagamento"
date: 2021-04-07T09:27:50-05:00
Description: >
  No módulo _Cobranças em dinheiro_, você pode gerar cupons de pagamento com as informações necessárias para permitir que seus clientes efetuem pagamentos à vista quantas vezes forem necessárias nos pontos de pagamento disponíveis.

weight: 70
---

Esta solução é útil para empresas que precisam receber pagamentos regularmente, como assinaturas, cursos, associações, catálogos, televendas e muito mais.

Você pode receber pagamentos sem ter nenhum conhecimento técnico. Basta enviar um e-mail onde o seu cliente poderá fazer o download do cupom e efetuar o respectivo pagamento.

{{% alert title="Observação" color="info"%}}

Cupons de pagamento estão disponíveis para a Argentina usando _**RAPIPAGO**_ e _**PAGOFACIL**_, e para a Colômbia usando <!--_**BALOTO**_ e -->_**EFECTY**_.

{{% /alert %}}  

## Como funcionam os cupons de pagamento? {#how-payment-coupons-work}
O cupom de pagamento segue um fluxo simples para permitir que seus clientes façam pagamentos regulares em dinheiro quantas vezes forem necessárias:

1. **Configure o cupom de pagamento no módulo PayU**.<br>Você só precisa informar quantos pagamentos por cliente deseja receber, decidir se o valor do pagamento é fixo ou o seu cliente decide o valor, o prazo de pagamento e a referência de pagamento.

2. **Decidir a entrega do cupom**<br>Decida se deseja entregar os cupons por e-mail, gerando PDF, por meio de referências de pagamento ou cartões de cobrança (Disponível somente para Argentina).

3. **Usar os cupons de pagamento**<br>Quando seus clientes recebem o cupom, eles podem fazer o pagamento usando qualquer um dos escritórios de pagamento em dinheiro disponíveis em seus países.<br>Cada vez que um cliente paga com o cupom, você recebe uma mensagem de confirmação e o valor da compra<sup>*</sup> é transferido para sua conta PayU, onde você pode transferi-lo para sua conta bancária.

<sup>*</sup>_O valor transferido corresponde ao valor pago pelo seu cliente, descontada a taxa PayU._

## Criação de cupons de pagamento {#creating-payment-coupons}
De acordo com as necessidades do seu negócio, você pode configurar as opções de recebimento de pagamentos por meio de cupons. Siga o próximo procedimento para criar cupons de pagamento e entregá-los aos seus clientes.

1. Faça login em [PayU.com](payu.com) e clique na opção de login localizada na parte superior da página. Se preferir, você pode fazer login https://merchants.payulatam.com/.

2. Expandir a opção **Venda com a PayU** em seguida selecione **Pagamento em dinheiro**.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_es.png)

3. Configure as seguintes informações:

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_01_es.png)

* **Quantos pagamentos você espera receber de cada cliente?**: selecione quantas vezes um cliente pode usar o cupom. Selecione _Exclusivo_ se você quiser que seu cliente pague uma vez. Caso contrário, selecione _Múltiplo_ para vários pagamentos enquanto o cupom estiver disponível. o valor padrão é _Múltiplo_.

* **Você cobrará um valor específico?**: selecione o valor de pagamento do cupom. Se você selecionar _Não_, seu cliente decide o valor a pagar no posto de pagamento. o valor padrão é _Não_.

* **Prazo de pagamento**: decida se o cupom de pagamento expira em uma determinada data. A data especificada é fixa, não há suporte para fornecer um dia específico do mês ou outra configuração personalizada. Se você selecionar _Não_, o cupom não terá uma data de vencimento. o valor padrão é _Não_.

* *** Quer definir a referência de pagamento?**: se você selecionar _Sim_ você precisa fornecer as referências de pagamento do cupom. Caso contrário, PayU define uma referência automática. o valor padrão é _Não_.

## Compartilhar o cupom de pagamento {#sharing-the-payment-coupon}
Depois de configurar os cupons de pagamento, decida como deseja entregá-los ao seu cliente.<br>Você tem as seguintes opções:

### Enviar por e-mail {#send-via-e-mail}
Esta opção permite enviar o cupom de pagamento por e-mail. Os clientes recebem o e-mail e imprimem o cupom para efetuar o pagamento à vista nos postos disponíveis.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_02_es.png)

Para adicionar os clientes um por um, forneça as seguintes informações:

* E-mail: endereço de e-mail do cliente que recebe o cupom.
* Nome do pagador: nome do cliente.
* Descrição do pagamento: descrição do pagamento.
* Valor: este campo está disponível quando você define o valor pago pelo seu cliente e assume o valor definido.
* Data de validade: este campo está disponível ao definir a data de validade do cupom.
* Referência de pagamento: este campo está disponível quando você define sua própria referência de pagamento para o cupom.

Clique no botão _**Adicionar**_ para salvar os dados do cliente e adicionar um cliente extra, se necessário.

Para adicionar vários clientes, clique em **Adicionar vários pagadores de um arquivo** e baixe o arquivo modelo clicando em **Formato de download**.

O arquivo Excel baixado é, por padrão, em espanhol e cada linha corresponde a um cliente. Forneça as informações do exemplo e faça o upload para o módulo PayU.

Seja qual for a opção selecionada, clique em **Avançar**.

Uma nova janela aparecerá mostrando o resumo dos e-mails a serem enviados.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_03_es.png)

Se você deseja editar as informações do emissor e do e-mail, clique no link Editar, exibido no canto superior direito de cada seção.

Finalmente, clique **Enviar e-mail**. Cada cliente recebe um e-mail com o cupom.

### Print the coupons {#print-the-coupons}
Esta opção permite gerar cupons no formato PDF.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_04_es.png)

Para adicionar os clientes um por um, forneça as seguintes informações:

* Nome do pagador: nome do cliente.
* Descrição do pagamento: descrição do pagamento.
* Valor: este campo está disponível quando você define o valor pago pelo seu cliente e assume o valor definido.
* Data de validade: este campo está disponível ao definir a data de validade do cupom.
* Referência de pagamento: este campo está disponível quando você define sua própria referência de pagamento para o cupom.

Clique no botão _**Adicionar**_ para salvar os dados do cliente e adicionar um cliente extra, se necessário.

Para adicionar vários clientes, clique em **Adicionar vários pagadores de um arquivo** e baixe o arquivo modelo clicando em **Formato de download**.

O arquivo Excel baixado é, por padrão, em espanhol e cada linha corresponde a um cliente. Forneça as informações do exemplo e faça o upload para o módulo PayU.

Seja qual for a opção selecionada, clique em **Avançar**.

Uma nova janela aparece mostrando o resumo do PDF a ser gerado.

<img src="/assets/PaymentCoupons/PaymentCoupons_05_es.png" alt="PrintScreen" width="60%"/><br>

Se você deseja editar as informações do emissor, clique no link Editar exibido no canto superior direito da seção do emissor.

Por fim, clique em **Gerar cupons em PDF**. Um arquivo PDF é baixado, cada página contém o cupom gerado para cada cliente.

### Gerar referências de pagamento {#generate-payment-references}
Esta opção permite gerar um arquivo Excel com os cupons solicitados.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_06_es.png)

Para adicionar os clientes um por um, forneça as seguintes informações:

* Nome do pagador: nome do cliente.
* Descrição do pagamento: descrição do pagamento.
* Valor: este campo está disponível quando você define o valor pago pelo seu cliente e assume o valor definido.
* Data de validade: este campo está disponível ao definir a data de validade do cupom.
* Referência de pagamento: este campo está disponível quando você define sua própria referência de pagamento para o cupom.

Clique no botão _**Adicionar**_ para salvar os dados do cliente e adicionar um cliente extra, se necessário.

Para adicionar vários clientes, clique em **Adicionar vários pagadores de um arquivo** e baixe o arquivo modelo clicando em **Formato de download**.

O arquivo Excel baixado é, por padrão, em espanhol e cada linha corresponde a um cliente. Forneça as informações do exemplo e faça o upload para o módulo PayU.

Seja qual for a opção selecionada, clique em **Gerar referências no Excel**.

O download começa imediatamente. Além disso, uma nova janela aparece mostrando o número de referências geradas. Nesta janela, você também pode enviar o arquivo Excel para quem precisar.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_07_es.png)

### Crie cartões de cobrança {#create-collection-cards}
Esta opção permite gerar cartões com as informações necessárias para que seus clientes possam fazer pagamentos em dinheiro nos pontos de pagamento disponíveis sempre que necessário.

Esta opção está disponível quando você não define um valor fixo nem um prazo de pagamento.

{{% alert title="Observação" color="info"%}}

<img src="/assets/Argentina.png" width="25px"/> **Disponível apenas para Argentina.**

{{% /alert %}}  

Os cartões de cobrança são cartões de plástico associados à sua conta PayU. Eles têm um código de barras e você pode incluir um código de referência impresso.

Uma vez gerados os cartões, entregue-os aos seus clientes e eles poderão pagar o valor em dinheiro que desejarem, sem prazo de validade. 

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_08_es.png)

Para solicitar os cartões, você precisa fornecer as seguintes informações:

* Design de seus cartões de cobrança: escolha um design predefinido ou personalizado para seus cartões. Cartões personalizados estão disponíveis a partir de 1000 unidades.
* Quantos cartões deseja solicitar?: selecione o número de cartões que deseja gerar de acordo com o design escolhido.
* Endereço de entrega: Clique _**Editar**_ no canto superior direito deste painel para fornecer o endereço onde você deseja receber os cartões.
* Resumo do pagamento: calculamos o custo do seu ordem em função da quantidade de cartões solicitados e do design que você escolher.

{{% alert title="Note" color="warning"%}}

Esta ordem será debitada de sua conta PayU, e você deve ter saldo disponível.

{{% /alert %}} 

Clique _**Solicitar cartões**_ para continuar. Uma janela de confirmação aparece para permitir que você valide as informações de sua solicitação.

<img src="/assets/PaymentCoupons/PaymentCoupons_09_es.png" alt="PrintScreen" width="60%"/>

## Consultar os cupons criados {#consult-the-created-coupons}
Depois de criar cupons ou cartões de cobrança, você pode consultar suas informações para ver os pagamentos recebidos, habilitar, desabilitar ou baixar o cupom ou cartão.

1. No Módulo PayU, expanda a opção **Venda com a Payu** e selecione **Ver os links criados**.

<img src="/assets/PaymentCoupons/PaymentCoupons_10_es.png" alt="PrintScreen" width="60%"/><br>

2. Selecione _**Link de Cobrança**_ ou _**Cobrança em dinheiro**_  cobrança de acordo com suas necessidades.

3. Você pode usar a opção de filtro Avançado para encontrar uma série específica de cupons.

<img src="/assets/PaymentCoupons/PaymentCoupons_11_es.png" alt="PrintScreen" width="60%"/><br>

4. Cada cupom tem opções para ativar/desativar ou baixar o cupom. Depois que o cupom é desativado, ele não pode receber mais pagamentos.<br>
Encontre essas opções no menu de três pontos no _**status**_ coluna.

![PrintScreen](/assets/PaymentCoupons/PaymentCoupons_12_es.png)

