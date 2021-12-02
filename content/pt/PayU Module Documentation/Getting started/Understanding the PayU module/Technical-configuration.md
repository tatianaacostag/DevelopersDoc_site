---
title: "Configuração técnica"
linkTitle: "Configuração técnica"
date: 2021-08-13T12:19:55-05:00
type: docs
Description: >
  Encontre aqui todos os detalhes que o ajudam a integrar o seu site usando qualquer uma das [integrações](/pt/docs/integrations.html) que oferecemos.
weight: 20
tags: ["subtopic"]
---

## Como obter informações técnicas {#getting-technical-information}
Seja qual for a [integração]({{< ref "integrations" >}}) que você usa, são necessárias as seguintes variáveis na solicitação dos métodos.

### Merchant e account IDs {#merchant-and-account-ids}
Esses valores permitem que você autentique seu comércio e sua conta ao usar qualquer uma das integrações para acessar os serviços que fornecemos.

Quando você acessa seu módulo PayU, ambos os valores ficam acessíveis no painel esquerdo.

<img src="/assets/Merchant_Ids_pt.png" alt="PrintScreen" width="60%"/>

### API key e API Login {#api-key-and-api-login}
1. No Módulo PayU, clique em _**Configuração**_ e selecione _**Configuração técnica**_.

![PrintScreen](/assets/IntegrationVariables_01_pt.png)

2. Nesta janela, você encontra a API key e o API Login, que permite autenticar sua loja durante o procedimento de integração.

![PrintScreen](/assets/IntegrationVariables_02_pt.png)

{{% alert title="Aviso" color="warning"%}}

Ambas as chaves são exclusivas de cada loja no PayU, portanto, você deve manter essas informações protegidas. Seu uso ou divulgação são de sua responsabilidade.

{{% /alert %}} 

## Como configurar informações técnicas {#configuring-technical-information}
Nesta seção, você pode configurar as propriedades técnicas de cada conta ativa, como:
* Configurações de URL para páginas de confirmação e resposta.
* Habilite o envio de e-mails para o comprador e para sua loja quando ocorrer uma venda.
* Habilite notificações para processos de Disputas.
* Selecione se seus pagamentos são processados em modo de teste ou ao vivo.

Para configurar essas informações, clique em _**Configuração**_ e então selecione _**Configuração técnica**_.

![PrintScreen](/assets/IntegrationVariables_01_pt.png)

Na janela de _**Configuração técnica**_, você pode acessar duas guias: _**Pagamentos**_ ou _**Disputas**_.

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_01_pt.png)

### Pagamentos {#payments}
Nesta guia, você pode configurar as seguintes informações.

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_02_pt.png)

<div class="variables"></div>

| Parâmetro | Descrição |
|---|---|
| Seus pagamentos serão processados | Selecione se suas transações são processadas _Em produção_ ou em _Modo de teste_. Ao processar em _Modo de teste_, as transações feitas pelo seu site ou por solicitações de pagamento são registradas como teste e o pagamento não é real. |
| URL de resposta | A página para a qual o comprador é direcionado assim que a transação é concluída no PayU. Esta página exibe o status da transação. |
| URL de confirmação | A página para a qual PayU envia a confirmação do pagamento no seu sistema. Isso é útil quando você deseja atualizar ações e bancos de dados no estágio final da transação.<br>Este parâmetro não é obrigatórionão. |
| Controlar pagamentos duplicados | Ao habilitar esta opção, validamos que cada referência de pagamento enviada ao nosso sistema seja única. Caso contrário, você pode enviar a mesma referência para todas as suas vendas. |
| Notificações de pagamentos processados | Esta opção permite habilitar o envio de um e-mail ao pagador ou a você quando o pagamento for aprovado ou rejeitado. |

### Disputas {#disputes}
Nesta guia, você pode configurar as seguintes informações do processo de [disputa]({{< ref "Disputes-MP.md" >}}).

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_03_pt.png)

<div class="variables"></div>

| Parâmetro | Descrição |
|---|---|
| Emails de notificação | Defina os endereços de e-mail a serem notificados quando um processo de disputa for iniciado. |
| URL automatica de notificação | Se você habilitar essa opção, poderá definir a URL para a qual PayU envia a notificação de um processo de disputa. |

{{% alert title="Observação" color="info"%}}

Para confirmar as alterações que você fez, não se esqueça de clicar no botão _**Salvar alterações**_.

{{% /alert %}} 